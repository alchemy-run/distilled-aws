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
  sdkId: "savingsplans",
  serviceShapeName: "AWSSavingsPlan",
});
const auth = T.AwsAuthSigv4({ name: "savingsplans" });
const ver = T.ServiceVersion("2019-06-28");
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
  const _p0 = () => ({
    authSchemes: [
      {
        name: "sigv4",
        signingName: "savingsplans",
        signingRegion: "us-east-1",
      },
    ],
  });
  if (!(Endpoint != null) && UseFIPS === false && UseDualStack === true) {
    {
      const PartitionResult = _.partition(Region);
      if (
        Region != null &&
        PartitionResult != null &&
        PartitionResult !== false
      ) {
        if (_.getAttr(PartitionResult, "name") === "aws") {
          return e("https://savingsplans.global.api.aws", _p0(), {});
        }
        if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
          return e(
            `https://savingsplans.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return err(
          "DualStack is enabled but this partition does not support DualStack",
        );
      }
    }
    if (!(Region != null)) {
      return e("https://savingsplans.global.api.aws", _p0(), {});
    }
  }
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
          UseDualStack === false
        ) {
          return e("https://savingsplans.amazonaws.com", _p0(), {});
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://savingsplans-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://savingsplans-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://savingsplans.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://savingsplans.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InternalServerException",
        httpResponseCode: 500,
      }),
      T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ResourceNotFoundException",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ServiceQuotaExceededException",
        httpResponseCode: 402,
      }),
      T.HttpError(402),
    ),
  ).pipe(C.withQuotaError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ValidationException", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type SavingsPlanOfferingId = string;
export type Amount = string;
export type ClientToken = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateSavingsPlanRequest {
  savingsPlanOfferingId: string;
  commitment: string;
  upfrontPaymentAmount?: string;
  purchaseTime?: Date;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateSavingsPlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    savingsPlanOfferingId: S.String,
    commitment: S.String,
    upfrontPaymentAmount: S.optional(S.String),
    purchaseTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateSavingsPlan" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSavingsPlanRequest",
}) as any as S.Schema<CreateSavingsPlanRequest>;
export type SavingsPlanId = string;
export interface CreateSavingsPlanResponse {
  savingsPlanId?: string;
}
export const CreateSavingsPlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ savingsPlanId: S.optional(S.String) }),
).annotate({
  identifier: "CreateSavingsPlanResponse",
}) as any as S.Schema<CreateSavingsPlanResponse>;
export interface DeleteQueuedSavingsPlanRequest {
  savingsPlanId: string;
}
export const DeleteQueuedSavingsPlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ savingsPlanId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteQueuedSavingsPlan" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteQueuedSavingsPlanRequest",
}) as any as S.Schema<DeleteQueuedSavingsPlanRequest>;
export interface DeleteQueuedSavingsPlanResponse {}
export const DeleteQueuedSavingsPlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteQueuedSavingsPlanResponse",
}) as any as S.Schema<DeleteQueuedSavingsPlanResponse>;
export type SavingsPlanRateFilterName =
  | "region"
  | "instanceType"
  | "productDescription"
  | "tenancy"
  | "productType"
  | "serviceCode"
  | "usageType"
  | "operation"
  | (string & {});
export const SavingsPlanRateFilterName = S.String;

export type ListOfStrings = string[];
export const ListOfStrings = /*@__PURE__*/ S.Array(S.String);
export interface SavingsPlanRateFilter {
  name?: SavingsPlanRateFilterName;
  values?: string[];
}
export const SavingsPlanRateFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(SavingsPlanRateFilterName),
    values: S.optional(ListOfStrings),
  }),
).annotate({
  identifier: "SavingsPlanRateFilter",
}) as any as S.Schema<SavingsPlanRateFilter>;
export type SavingsPlanRateFilterList = SavingsPlanRateFilter[];
export const SavingsPlanRateFilterList = /*@__PURE__*/ S.Array(
  SavingsPlanRateFilter,
);
export type PaginationToken = string;
export type MaxResults = number;
export interface DescribeSavingsPlanRatesRequest {
  savingsPlanId: string;
  filters?: SavingsPlanRateFilter[];
  nextToken?: string;
  maxResults?: number;
}
export const DescribeSavingsPlanRatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    savingsPlanId: S.String,
    filters: S.optional(SavingsPlanRateFilterList),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DescribeSavingsPlanRates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSavingsPlanRatesRequest",
}) as any as S.Schema<DescribeSavingsPlanRatesRequest>;
export type CurrencyCode = "CNY" | "USD" | "EUR" | (string & {});
export const CurrencyCode = S.String;

export type SavingsPlanRateUnit =
  | "Hrs"
  | "Lambda-GB-Second"
  | "Request"
  | "ACU-Hr"
  | "ReadRequestUnits"
  | "WriteRequestUnits"
  | "ReadCapacityUnit-Hrs"
  | "WriteCapacityUnit-Hrs"
  | "ReplicatedWriteRequestUnits"
  | "ReplicatedWriteCapacityUnit-Hrs"
  | "GB-Hours"
  | "DPU"
  | "ElastiCacheProcessingUnit"
  | "DCU-Hr"
  | "NCU-hr"
  | "OCU-hours"
  | "Jobs"
  | (string & {});
export const SavingsPlanRateUnit = S.String;

export type SavingsPlanProductType =
  | "EC2"
  | "Fargate"
  | "Lambda"
  | "SageMaker"
  | "RDS"
  | "DSQL"
  | "DynamoDB"
  | "ElastiCache"
  | "DocDB"
  | "Neptune"
  | "Timestream"
  | "Keyspaces"
  | "DMS"
  | "OpenSearch"
  | (string & {});
export const SavingsPlanProductType = S.String;

export type SavingsPlanRateServiceCode =
  | "AmazonEC2"
  | "AmazonECS"
  | "AmazonEKS"
  | "AWSLambda"
  | "AmazonSageMaker"
  | "AmazonRDS"
  | "AuroraDSQL"
  | "AmazonDynamoDB"
  | "AmazonElastiCache"
  | "AmazonDocDB"
  | "AmazonNeptune"
  | "AmazonTimestream"
  | "AmazonMCS"
  | "AWSDatabaseMigrationSvc"
  | "AmazonES"
  | (string & {});
export const SavingsPlanRateServiceCode = S.String;

export type SavingsPlanRateUsageType = string;
export type SavingsPlanRateOperation = string;
export type SavingsPlanRatePropertyKey =
  | "region"
  | "instanceType"
  | "instanceFamily"
  | "productDescription"
  | "tenancy"
  | (string & {});
export const SavingsPlanRatePropertyKey = S.String;

export type JsonSafeFilterValueString = string;
export interface SavingsPlanRateProperty {
  name?: SavingsPlanRatePropertyKey;
  value?: string;
}
export const SavingsPlanRateProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(SavingsPlanRatePropertyKey),
    value: S.optional(S.String),
  }),
).annotate({
  identifier: "SavingsPlanRateProperty",
}) as any as S.Schema<SavingsPlanRateProperty>;
export type SavingsPlanRatePropertyList = SavingsPlanRateProperty[];
export const SavingsPlanRatePropertyList = /*@__PURE__*/ S.Array(
  SavingsPlanRateProperty,
);
export interface SavingsPlanRate {
  rate?: string;
  currency?: CurrencyCode;
  unit?: SavingsPlanRateUnit;
  productType?: SavingsPlanProductType;
  serviceCode?: SavingsPlanRateServiceCode;
  usageType?: string;
  operation?: string;
  properties?: SavingsPlanRateProperty[];
}
export const SavingsPlanRate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rate: S.optional(S.String),
    currency: S.optional(CurrencyCode),
    unit: S.optional(SavingsPlanRateUnit),
    productType: S.optional(SavingsPlanProductType),
    serviceCode: S.optional(SavingsPlanRateServiceCode),
    usageType: S.optional(S.String),
    operation: S.optional(S.String),
    properties: S.optional(SavingsPlanRatePropertyList),
  }),
).annotate({
  identifier: "SavingsPlanRate",
}) as any as S.Schema<SavingsPlanRate>;
export type SavingsPlanRateList = SavingsPlanRate[];
export const SavingsPlanRateList = /*@__PURE__*/ S.Array(SavingsPlanRate);
export interface DescribeSavingsPlanRatesResponse {
  savingsPlanId?: string;
  searchResults?: SavingsPlanRate[];
  nextToken?: string;
}
export const DescribeSavingsPlanRatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    savingsPlanId: S.optional(S.String),
    searchResults: S.optional(SavingsPlanRateList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeSavingsPlanRatesResponse",
}) as any as S.Schema<DescribeSavingsPlanRatesResponse>;
export type SavingsPlanArn = string;
export type SavingsPlanArnList = string[];
export const SavingsPlanArnList = /*@__PURE__*/ S.Array(S.String);
export type SavingsPlanIdList = string[];
export const SavingsPlanIdList = /*@__PURE__*/ S.Array(S.String);
export type SavingsPlanState =
  | "payment-pending"
  | "payment-failed"
  | "active"
  | "retired"
  | "queued"
  | "queued-deleted"
  | "pending-return"
  | "returned"
  | (string & {});
export const SavingsPlanState = S.String;

export type SavingsPlanStateList = SavingsPlanState[];
export const SavingsPlanStateList = /*@__PURE__*/ S.Array(SavingsPlanState);
export type SavingsPlansFilterName =
  | "region"
  | "ec2-instance-family"
  | "commitment"
  | "upfront"
  | "term"
  | "savings-plan-type"
  | "payment-option"
  | "start"
  | "end"
  | "instance-family"
  | (string & {});
export const SavingsPlansFilterName = S.String;

export interface SavingsPlanFilter {
  name?: SavingsPlansFilterName;
  values?: string[];
}
export const SavingsPlanFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(SavingsPlansFilterName),
    values: S.optional(ListOfStrings),
  }),
).annotate({
  identifier: "SavingsPlanFilter",
}) as any as S.Schema<SavingsPlanFilter>;
export type SavingsPlanFilterList = SavingsPlanFilter[];
export const SavingsPlanFilterList = /*@__PURE__*/ S.Array(SavingsPlanFilter);
export interface DescribeSavingsPlansRequest {
  savingsPlanArns?: string[];
  savingsPlanIds?: string[];
  nextToken?: string;
  maxResults?: number;
  states?: SavingsPlanState[];
  filters?: SavingsPlanFilter[];
}
export const DescribeSavingsPlansRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    savingsPlanArns: S.optional(SavingsPlanArnList),
    savingsPlanIds: S.optional(SavingsPlanIdList),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    states: S.optional(SavingsPlanStateList),
    filters: S.optional(SavingsPlanFilterList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DescribeSavingsPlans" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSavingsPlansRequest",
}) as any as S.Schema<DescribeSavingsPlansRequest>;
export type Region = string;
export type EC2InstanceFamily = string;
export type SavingsPlanType =
  | "Compute"
  | "EC2Instance"
  | "SageMaker"
  | "Database"
  | (string & {});
export const SavingsPlanType = S.String;

export type SavingsPlanPaymentOption =
  | "All Upfront"
  | "Partial Upfront"
  | "No Upfront"
  | (string & {});
export const SavingsPlanPaymentOption = S.String;

export type SavingsPlanProductTypeList = SavingsPlanProductType[];
export const SavingsPlanProductTypeList = /*@__PURE__*/ S.Array(
  SavingsPlanProductType,
);
export type TermDurationInSeconds = number;
export interface SavingsPlan {
  offeringId?: string;
  savingsPlanId?: string;
  savingsPlanArn?: string;
  description?: string;
  start?: string;
  end?: string;
  state?: SavingsPlanState;
  region?: string;
  ec2InstanceFamily?: string;
  savingsPlanType?: SavingsPlanType;
  paymentOption?: SavingsPlanPaymentOption;
  productTypes?: SavingsPlanProductType[];
  currency?: CurrencyCode;
  commitment?: string;
  upfrontPaymentAmount?: string;
  recurringPaymentAmount?: string;
  termDurationInSeconds?: number;
  tags?: { [key: string]: string | undefined };
  returnableUntil?: string;
}
export const SavingsPlan = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    offeringId: S.optional(S.String),
    savingsPlanId: S.optional(S.String),
    savingsPlanArn: S.optional(S.String),
    description: S.optional(S.String),
    start: S.optional(S.String),
    end: S.optional(S.String),
    state: S.optional(SavingsPlanState),
    region: S.optional(S.String),
    ec2InstanceFamily: S.optional(S.String),
    savingsPlanType: S.optional(SavingsPlanType),
    paymentOption: S.optional(SavingsPlanPaymentOption),
    productTypes: S.optional(SavingsPlanProductTypeList),
    currency: S.optional(CurrencyCode),
    commitment: S.optional(S.String),
    upfrontPaymentAmount: S.optional(S.String),
    recurringPaymentAmount: S.optional(S.String),
    termDurationInSeconds: S.optional(S.Number),
    tags: S.optional(TagMap),
    returnableUntil: S.optional(S.String),
  }),
).annotate({ identifier: "SavingsPlan" }) as any as S.Schema<SavingsPlan>;
export type SavingsPlanList = SavingsPlan[];
export const SavingsPlanList = /*@__PURE__*/ S.Array(SavingsPlan);
export interface DescribeSavingsPlansResponse {
  savingsPlans?: SavingsPlan[];
  nextToken?: string;
}
export const DescribeSavingsPlansResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    savingsPlans: S.optional(SavingsPlanList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeSavingsPlansResponse",
}) as any as S.Schema<DescribeSavingsPlansResponse>;
export type UUID = string;
export type UUIDs = string[];
export const UUIDs = /*@__PURE__*/ S.Array(S.String);
export type SavingsPlanPaymentOptionList = SavingsPlanPaymentOption[];
export const SavingsPlanPaymentOptionList = /*@__PURE__*/ S.Array(
  SavingsPlanPaymentOption,
);
export type SavingsPlanTypeList = SavingsPlanType[];
export const SavingsPlanTypeList = /*@__PURE__*/ S.Array(SavingsPlanType);
export type SavingsPlanRateServiceCodeList = SavingsPlanRateServiceCode[];
export const SavingsPlanRateServiceCodeList = /*@__PURE__*/ S.Array(
  SavingsPlanRateServiceCode,
);
export type SavingsPlanRateUsageTypeList = string[];
export const SavingsPlanRateUsageTypeList = /*@__PURE__*/ S.Array(S.String);
export type SavingsPlanRateOperationList = string[];
export const SavingsPlanRateOperationList = /*@__PURE__*/ S.Array(S.String);
export type SavingsPlanRateFilterAttribute =
  | "region"
  | "instanceFamily"
  | "instanceType"
  | "productDescription"
  | "tenancy"
  | "productId"
  | (string & {});
export const SavingsPlanRateFilterAttribute = S.String;

export type FilterValuesList = string[];
export const FilterValuesList = /*@__PURE__*/ S.Array(S.String);
export interface SavingsPlanOfferingRateFilterElement {
  name?: SavingsPlanRateFilterAttribute;
  values?: string[];
}
export const SavingsPlanOfferingRateFilterElement = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      name: S.optional(SavingsPlanRateFilterAttribute),
      values: S.optional(FilterValuesList),
    }),
).annotate({
  identifier: "SavingsPlanOfferingRateFilterElement",
}) as any as S.Schema<SavingsPlanOfferingRateFilterElement>;
export type SavingsPlanOfferingRateFiltersList =
  SavingsPlanOfferingRateFilterElement[];
export const SavingsPlanOfferingRateFiltersList = /*@__PURE__*/ S.Array(
  SavingsPlanOfferingRateFilterElement,
);
export type PageSize = number;
export interface DescribeSavingsPlansOfferingRatesRequest {
  savingsPlanOfferingIds?: string[];
  savingsPlanPaymentOptions?: SavingsPlanPaymentOption[];
  savingsPlanTypes?: SavingsPlanType[];
  products?: SavingsPlanProductType[];
  serviceCodes?: SavingsPlanRateServiceCode[];
  usageTypes?: string[];
  operations?: string[];
  filters?: SavingsPlanOfferingRateFilterElement[];
  nextToken?: string;
  maxResults?: number;
}
export const DescribeSavingsPlansOfferingRatesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      savingsPlanOfferingIds: S.optional(UUIDs),
      savingsPlanPaymentOptions: S.optional(SavingsPlanPaymentOptionList),
      savingsPlanTypes: S.optional(SavingsPlanTypeList),
      products: S.optional(SavingsPlanProductTypeList),
      serviceCodes: S.optional(SavingsPlanRateServiceCodeList),
      usageTypes: S.optional(SavingsPlanRateUsageTypeList),
      operations: S.optional(SavingsPlanRateOperationList),
      filters: S.optional(SavingsPlanOfferingRateFiltersList),
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/DescribeSavingsPlansOfferingRates" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeSavingsPlansOfferingRatesRequest",
}) as any as S.Schema<DescribeSavingsPlansOfferingRatesRequest>;
export type SavingsPlansDuration = number;
export type SavingsPlanDescription = string;
export interface ParentSavingsPlanOffering {
  offeringId?: string;
  paymentOption?: SavingsPlanPaymentOption;
  planType?: SavingsPlanType;
  durationSeconds?: number;
  currency?: CurrencyCode;
  planDescription?: string;
}
export const ParentSavingsPlanOffering = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    offeringId: S.optional(S.String),
    paymentOption: S.optional(SavingsPlanPaymentOption),
    planType: S.optional(SavingsPlanType),
    durationSeconds: S.optional(S.Number),
    currency: S.optional(CurrencyCode),
    planDescription: S.optional(S.String),
  }),
).annotate({
  identifier: "ParentSavingsPlanOffering",
}) as any as S.Schema<ParentSavingsPlanOffering>;
export type SavingsPlanRatePricePerUnit = string;
export interface SavingsPlanOfferingRateProperty {
  name?: string;
  value?: string;
}
export const SavingsPlanOfferingRateProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), value: S.optional(S.String) }),
).annotate({
  identifier: "SavingsPlanOfferingRateProperty",
}) as any as S.Schema<SavingsPlanOfferingRateProperty>;
export type SavingsPlanOfferingRatePropertyList =
  SavingsPlanOfferingRateProperty[];
export const SavingsPlanOfferingRatePropertyList = /*@__PURE__*/ S.Array(
  SavingsPlanOfferingRateProperty,
);
export interface SavingsPlanOfferingRate {
  savingsPlanOffering?: ParentSavingsPlanOffering;
  rate?: string;
  unit?: SavingsPlanRateUnit;
  productType?: SavingsPlanProductType;
  serviceCode?: SavingsPlanRateServiceCode;
  usageType?: string;
  operation?: string;
  properties?: SavingsPlanOfferingRateProperty[];
}
export const SavingsPlanOfferingRate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    savingsPlanOffering: S.optional(ParentSavingsPlanOffering),
    rate: S.optional(S.String),
    unit: S.optional(SavingsPlanRateUnit),
    productType: S.optional(SavingsPlanProductType),
    serviceCode: S.optional(SavingsPlanRateServiceCode),
    usageType: S.optional(S.String),
    operation: S.optional(S.String),
    properties: S.optional(SavingsPlanOfferingRatePropertyList),
  }),
).annotate({
  identifier: "SavingsPlanOfferingRate",
}) as any as S.Schema<SavingsPlanOfferingRate>;
export type SavingsPlanOfferingRatesList = SavingsPlanOfferingRate[];
export const SavingsPlanOfferingRatesList = /*@__PURE__*/ S.Array(
  SavingsPlanOfferingRate,
);
export interface DescribeSavingsPlansOfferingRatesResponse {
  searchResults?: SavingsPlanOfferingRate[];
  nextToken?: string;
}
export const DescribeSavingsPlansOfferingRatesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      searchResults: S.optional(SavingsPlanOfferingRatesList),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DescribeSavingsPlansOfferingRatesResponse",
  }) as any as S.Schema<DescribeSavingsPlansOfferingRatesResponse>;
export type DurationsList = number[];
export const DurationsList = /*@__PURE__*/ S.Array(S.Number);
export type CurrencyList = CurrencyCode[];
export const CurrencyList = /*@__PURE__*/ S.Array(CurrencyCode);
export type SavingsPlanDescriptionsList = string[];
export const SavingsPlanDescriptionsList = /*@__PURE__*/ S.Array(S.String);
export type SavingsPlanServiceCode = string;
export type SavingsPlanServiceCodeList = string[];
export const SavingsPlanServiceCodeList = /*@__PURE__*/ S.Array(S.String);
export type SavingsPlanUsageType = string;
export type SavingsPlanUsageTypeList = string[];
export const SavingsPlanUsageTypeList = /*@__PURE__*/ S.Array(S.String);
export type SavingsPlanOperation = string;
export type SavingsPlanOperationList = string[];
export const SavingsPlanOperationList = /*@__PURE__*/ S.Array(S.String);
export type SavingsPlanOfferingFilterAttribute =
  | "region"
  | "instanceFamily"
  | (string & {});
export const SavingsPlanOfferingFilterAttribute = S.String;

export interface SavingsPlanOfferingFilterElement {
  name?: SavingsPlanOfferingFilterAttribute;
  values?: string[];
}
export const SavingsPlanOfferingFilterElement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(SavingsPlanOfferingFilterAttribute),
    values: S.optional(FilterValuesList),
  }),
).annotate({
  identifier: "SavingsPlanOfferingFilterElement",
}) as any as S.Schema<SavingsPlanOfferingFilterElement>;
export type SavingsPlanOfferingFiltersList = SavingsPlanOfferingFilterElement[];
export const SavingsPlanOfferingFiltersList = /*@__PURE__*/ S.Array(
  SavingsPlanOfferingFilterElement,
);
export interface DescribeSavingsPlansOfferingsRequest {
  offeringIds?: string[];
  paymentOptions?: SavingsPlanPaymentOption[];
  productType?: SavingsPlanProductType;
  planTypes?: SavingsPlanType[];
  durations?: number[];
  currencies?: CurrencyCode[];
  descriptions?: string[];
  serviceCodes?: string[];
  usageTypes?: string[];
  operations?: string[];
  filters?: SavingsPlanOfferingFilterElement[];
  nextToken?: string;
  maxResults?: number;
}
export const DescribeSavingsPlansOfferingsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      offeringIds: S.optional(UUIDs),
      paymentOptions: S.optional(SavingsPlanPaymentOptionList),
      productType: S.optional(SavingsPlanProductType),
      planTypes: S.optional(SavingsPlanTypeList),
      durations: S.optional(DurationsList),
      currencies: S.optional(CurrencyList),
      descriptions: S.optional(SavingsPlanDescriptionsList),
      serviceCodes: S.optional(SavingsPlanServiceCodeList),
      usageTypes: S.optional(SavingsPlanUsageTypeList),
      operations: S.optional(SavingsPlanOperationList),
      filters: S.optional(SavingsPlanOfferingFiltersList),
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/DescribeSavingsPlansOfferings" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeSavingsPlansOfferingsRequest",
}) as any as S.Schema<DescribeSavingsPlansOfferingsRequest>;
export type SavingsPlanOfferingPropertyKey =
  | "region"
  | "instanceFamily"
  | (string & {});
export const SavingsPlanOfferingPropertyKey = S.String;

export interface SavingsPlanOfferingProperty {
  name?: SavingsPlanOfferingPropertyKey;
  value?: string;
}
export const SavingsPlanOfferingProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(SavingsPlanOfferingPropertyKey),
    value: S.optional(S.String),
  }),
).annotate({
  identifier: "SavingsPlanOfferingProperty",
}) as any as S.Schema<SavingsPlanOfferingProperty>;
export type SavingsPlanOfferingPropertyList = SavingsPlanOfferingProperty[];
export const SavingsPlanOfferingPropertyList = /*@__PURE__*/ S.Array(
  SavingsPlanOfferingProperty,
);
export interface SavingsPlanOffering {
  offeringId?: string;
  productTypes?: SavingsPlanProductType[];
  planType?: SavingsPlanType;
  description?: string;
  paymentOption?: SavingsPlanPaymentOption;
  durationSeconds?: number;
  currency?: CurrencyCode;
  serviceCode?: string;
  usageType?: string;
  operation?: string;
  properties?: SavingsPlanOfferingProperty[];
}
export const SavingsPlanOffering = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    offeringId: S.optional(S.String),
    productTypes: S.optional(SavingsPlanProductTypeList),
    planType: S.optional(SavingsPlanType),
    description: S.optional(S.String),
    paymentOption: S.optional(SavingsPlanPaymentOption),
    durationSeconds: S.optional(S.Number),
    currency: S.optional(CurrencyCode),
    serviceCode: S.optional(S.String),
    usageType: S.optional(S.String),
    operation: S.optional(S.String),
    properties: S.optional(SavingsPlanOfferingPropertyList),
  }),
).annotate({
  identifier: "SavingsPlanOffering",
}) as any as S.Schema<SavingsPlanOffering>;
export type SavingsPlanOfferingsList = SavingsPlanOffering[];
export const SavingsPlanOfferingsList =
  /*@__PURE__*/ S.Array(SavingsPlanOffering);
export interface DescribeSavingsPlansOfferingsResponse {
  searchResults?: SavingsPlanOffering[];
  nextToken?: string;
}
export const DescribeSavingsPlansOfferingsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      searchResults: S.optional(SavingsPlanOfferingsList),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "DescribeSavingsPlansOfferingsResponse",
}) as any as S.Schema<DescribeSavingsPlansOfferingsResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListTagsForResource" }),
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
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ReturnSavingsPlanRequest {
  savingsPlanId: string;
  clientToken?: string;
}
export const ReturnSavingsPlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    savingsPlanId: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ReturnSavingsPlan" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ReturnSavingsPlanRequest",
}) as any as S.Schema<ReturnSavingsPlanRequest>;
export interface ReturnSavingsPlanResponse {
  savingsPlanId?: string;
}
export const ReturnSavingsPlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ savingsPlanId: S.optional(S.String) }),
).annotate({
  identifier: "ReturnSavingsPlanResponse",
}) as any as S.Schema<ReturnSavingsPlanResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: TagMap }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/TagResource" }),
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
  S.Struct({ resourceArn: S.String, tagKeys: TagKeyList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UntagResource" }),
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
export type CreateSavingsPlanError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Savings Plan.
 */
export const createSavingsPlan: API.OperationMethod<
  CreateSavingsPlanRequest,
  CreateSavingsPlanResponse,
  CreateSavingsPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSavingsPlanRequest,
  output: CreateSavingsPlanResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSavingsPlan",
}));

export type DeleteQueuedSavingsPlanError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the queued purchase for the specified Savings Plan.
 */
export const deleteQueuedSavingsPlan: API.OperationMethod<
  DeleteQueuedSavingsPlanRequest,
  DeleteQueuedSavingsPlanResponse,
  DeleteQueuedSavingsPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteQueuedSavingsPlanRequest,
  output: DeleteQueuedSavingsPlanResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQueuedSavingsPlan",
}));

export type DescribeSavingsPlanRatesError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the rates for a specific, existing Savings Plan.
 */
export const describeSavingsPlanRates: API.OperationMethod<
  DescribeSavingsPlanRatesRequest,
  DescribeSavingsPlanRatesResponse,
  DescribeSavingsPlanRatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSavingsPlanRatesRequest,
  output: DescribeSavingsPlanRatesResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSavingsPlanRates",
}));

export type DescribeSavingsPlansError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified Savings Plans.
 */
export const describeSavingsPlans: API.OperationMethod<
  DescribeSavingsPlansRequest,
  DescribeSavingsPlansResponse,
  DescribeSavingsPlansError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSavingsPlansRequest,
  output: DescribeSavingsPlansResponse,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSavingsPlans",
}));

export type DescribeSavingsPlansOfferingRatesError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Describes the offering rates for Savings Plans you might want to purchase.
 */
export const describeSavingsPlansOfferingRates: API.OperationMethod<
  DescribeSavingsPlansOfferingRatesRequest,
  DescribeSavingsPlansOfferingRatesResponse,
  DescribeSavingsPlansOfferingRatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSavingsPlansOfferingRatesRequest,
  output: DescribeSavingsPlansOfferingRatesResponse,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSavingsPlansOfferingRates",
}));

export type DescribeSavingsPlansOfferingsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Describes the offerings for the specified Savings Plans.
 */
export const describeSavingsPlansOfferings: API.OperationMethod<
  DescribeSavingsPlansOfferingsRequest,
  DescribeSavingsPlansOfferingsResponse,
  DescribeSavingsPlansOfferingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSavingsPlansOfferingsRequest,
  output: DescribeSavingsPlansOfferingsResponse,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSavingsPlansOfferings",
}));

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags for the specified resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ReturnSavingsPlanError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Returns the specified Savings Plan.
 */
export const returnSavingsPlan: API.OperationMethod<
  ReturnSavingsPlanRequest,
  ReturnSavingsPlanResponse,
  ReturnSavingsPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ReturnSavingsPlanRequest,
  output: ReturnSavingsPlanResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReturnSavingsPlan",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Adds the specified tags to the specified resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified tags from the specified resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));
