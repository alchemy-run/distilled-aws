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
  sdkId: "Outposts",
  serviceShapeName: "OutpostsOlafService",
});
const auth = T.AwsAuthSigv4({ name: "outposts" });
const ver = T.ServiceVersion("2019-12-03");
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
              `https://outposts-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://outposts.${Region}.amazonaws.com`);
            }
            return e(
              `https://outposts-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://outposts.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://outposts.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceId: S.optional(S.String),
      ResourceType: S.optional(
        S.suspend(() => ResourceType).annotate({ identifier: "ResourceType" }),
      ),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type CapacityTaskId = string;
export type OutpostIdentifier = string;
export interface CancelCapacityTaskInput {
  CapacityTaskId: string;
  OutpostIdentifier: string;
}
export const CancelCapacityTaskInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CapacityTaskId: S.String.pipe(T.HttpLabel("CapacityTaskId")),
    OutpostIdentifier: S.String.pipe(T.HttpLabel("OutpostIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/outposts/{OutpostIdentifier}/capacity/{CapacityTaskId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelCapacityTaskInput",
}) as any as S.Schema<CancelCapacityTaskInput>;
export interface CancelCapacityTaskOutput {}
export const CancelCapacityTaskOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelCapacityTaskOutput",
}) as any as S.Schema<CancelCapacityTaskOutput>;
export type OrderId = string;
export interface CancelOrderInput {
  OrderId: string;
}
export const CancelOrderInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrderId: S.String.pipe(T.HttpLabel("OrderId")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/orders/{OrderId}/cancel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelOrderInput",
}) as any as S.Schema<CancelOrderInput>;
export interface CancelOrderOutput {}
export const CancelOrderOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelOrderOutput",
}) as any as S.Schema<CancelOrderOutput>;
export type QuoteIdentifier = string;
export type QuoteOptionIdentifier = string;
export type SkuCode = string;
export type LineItemQuantity = number;
export interface LineItemRequest {
  CatalogItemId?: string;
  Quantity?: number;
}
export const LineItemRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogItemId: S.optional(S.String),
    Quantity: S.optional(S.Number),
  }),
).annotate({
  identifier: "LineItemRequest",
}) as any as S.Schema<LineItemRequest>;
export type LineItemRequestListDefinition = LineItemRequest[];
export const LineItemRequestListDefinition =
  /*@__PURE__*/ S.Array(LineItemRequest);
export type PaymentOption =
  | "ALL_UPFRONT"
  | "NO_UPFRONT"
  | "PARTIAL_UPFRONT"
  | (string & {});
export const PaymentOption = /*@__PURE__*/ S.String;

export type PaymentTerm =
  | "THREE_YEARS"
  | "ONE_YEAR"
  | "FIVE_YEARS"
  | (string & {});
export const PaymentTerm = /*@__PURE__*/ S.String;

export interface CreateOrderInput {
  OutpostIdentifier: string;
  QuoteIdentifier?: string;
  QuoteOptionIdentifier?: string;
  LineItems?: LineItemRequest[];
  PaymentOption: PaymentOption;
  PaymentTerm?: PaymentTerm;
}
export const CreateOrderInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutpostIdentifier: S.String,
    QuoteIdentifier: S.optional(S.String),
    QuoteOptionIdentifier: S.optional(S.String),
    LineItems: S.optional(LineItemRequestListDefinition),
    PaymentOption: PaymentOption,
    PaymentTerm: S.optional(PaymentTerm),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/orders" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateOrderInput",
}) as any as S.Schema<CreateOrderInput>;
export type OutpostIdOnly = string;
export type OrderStatus =
  | "RECEIVED"
  | "PENDING"
  | "PROCESSING"
  | "INSTALLING"
  | "FULFILLED"
  | "CANCELLED"
  | "PREPARING"
  | "IN_PROGRESS"
  | "DELIVERED"
  | "COMPLETED"
  | "ERROR"
  | (string & {});
export const OrderStatus = /*@__PURE__*/ S.String;

export type LineItemId = string;
export type LineItemStatus =
  | "PREPARING"
  | "BUILDING"
  | "SHIPPED"
  | "DELIVERED"
  | "INSTALLING"
  | "INSTALLED"
  | "ERROR"
  | "CANCELLED"
  | "REPLACED"
  | (string & {});
export const LineItemStatus = /*@__PURE__*/ S.String;

export type TrackingId = string;
export type ShipmentCarrier =
  | "DHL"
  | "DBS"
  | "FEDEX"
  | "UPS"
  | "EXPEDITORS"
  | (string & {});
export const ShipmentCarrier = /*@__PURE__*/ S.String;

export interface ShipmentInformation {
  ShipmentTrackingNumber?: string;
  ShipmentCarrier?: ShipmentCarrier;
}
export const ShipmentInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ShipmentTrackingNumber: S.optional(S.String),
    ShipmentCarrier: S.optional(ShipmentCarrier),
  }),
).annotate({
  identifier: "ShipmentInformation",
}) as any as S.Schema<ShipmentInformation>;
export type AssetId = string;
export type MacAddress = string;
export type MacAddressList = string[];
export const MacAddressList = /*@__PURE__*/ S.Array(S.String);
export interface LineItemAssetInformation {
  AssetId?: string;
  MacAddressList?: string[];
}
export const LineItemAssetInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetId: S.optional(S.String),
    MacAddressList: S.optional(MacAddressList),
  }),
).annotate({
  identifier: "LineItemAssetInformation",
}) as any as S.Schema<LineItemAssetInformation>;
export type LineItemAssetInformationList = LineItemAssetInformation[];
export const LineItemAssetInformationList = /*@__PURE__*/ S.Array(
  LineItemAssetInformation,
);
export interface LineItem {
  CatalogItemId?: string;
  LineItemId?: string;
  Quantity?: number;
  Status?: LineItemStatus;
  ShipmentInformation?: ShipmentInformation;
  AssetInformationList?: LineItemAssetInformation[];
  PreviousLineItemId?: string;
  PreviousOrderId?: string;
}
export const LineItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogItemId: S.optional(S.String),
    LineItemId: S.optional(S.String),
    Quantity: S.optional(S.Number),
    Status: S.optional(LineItemStatus),
    ShipmentInformation: S.optional(ShipmentInformation),
    AssetInformationList: S.optional(LineItemAssetInformationList),
    PreviousLineItemId: S.optional(S.String),
    PreviousOrderId: S.optional(S.String),
  }),
).annotate({ identifier: "LineItem" }) as any as S.Schema<LineItem>;
export type LineItemListDefinition = LineItem[];
export const LineItemListDefinition = /*@__PURE__*/ S.Array(LineItem);
export type ISO8601Timestamp = Date;
export type OrderType = "OUTPOST" | "REPLACEMENT" | (string & {});
export const OrderType = /*@__PURE__*/ S.String;

export interface Order {
  OutpostId?: string;
  QuoteIdentifier?: string;
  QuoteOptionIdentifier?: string;
  OrderId?: string;
  Status?: OrderStatus;
  LineItems?: LineItem[];
  PaymentOption?: PaymentOption;
  OrderSubmissionDate?: Date;
  OrderFulfilledDate?: Date;
  PaymentTerm?: PaymentTerm;
  OrderType?: OrderType;
}
export const Order = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutpostId: S.optional(S.String),
    QuoteIdentifier: S.optional(S.String),
    QuoteOptionIdentifier: S.optional(S.String),
    OrderId: S.optional(S.String),
    Status: S.optional(OrderStatus),
    LineItems: S.optional(LineItemListDefinition),
    PaymentOption: S.optional(PaymentOption),
    OrderSubmissionDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    OrderFulfilledDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    PaymentTerm: S.optional(PaymentTerm),
    OrderType: S.optional(OrderType),
  }),
).annotate({ identifier: "Order" }) as any as S.Schema<Order>;
export interface CreateOrderOutput {
  Order?: Order;
}
export const CreateOrderOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Order: S.optional(Order) }),
).annotate({
  identifier: "CreateOrderOutput",
}) as any as S.Schema<CreateOrderOutput>;
export type OutpostName = string;
export type OutpostDescription = string;
export type SiteId = string;
export type AvailabilityZone = string;
export type AvailabilityZoneId = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type SupportedHardwareType = "RACK" | "SERVER" | (string & {});
export const SupportedHardwareType = /*@__PURE__*/ S.String;

export interface CreateOutpostInput {
  Name: string;
  Description?: string;
  SiteId: string;
  AvailabilityZone?: string;
  AvailabilityZoneId?: string;
  Tags?: { [key: string]: string | undefined };
  SupportedHardwareType?: SupportedHardwareType;
}
export const CreateOutpostInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    SiteId: S.String,
    AvailabilityZone: S.optional(S.String),
    AvailabilityZoneId: S.optional(S.String),
    Tags: S.optional(TagMap),
    SupportedHardwareType: S.optional(SupportedHardwareType),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/outposts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateOutpostInput",
}) as any as S.Schema<CreateOutpostInput>;
export type OutpostId = string;
export type OwnerId = string;
export type OutpostArn = string;
export type LifeCycleStatus = string;
export type SiteArn = string;
export interface Outpost {
  OutpostId?: string;
  OwnerId?: string;
  OutpostArn?: string;
  SiteId?: string;
  Name?: string;
  Description?: string;
  LifeCycleStatus?: string;
  AvailabilityZone?: string;
  AvailabilityZoneId?: string;
  Tags?: { [key: string]: string | undefined };
  SiteArn?: string;
  SupportedHardwareType?: SupportedHardwareType;
}
export const Outpost = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutpostId: S.optional(S.String),
    OwnerId: S.optional(S.String),
    OutpostArn: S.optional(S.String),
    SiteId: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    LifeCycleStatus: S.optional(S.String),
    AvailabilityZone: S.optional(S.String),
    AvailabilityZoneId: S.optional(S.String),
    Tags: S.optional(TagMap),
    SiteArn: S.optional(S.String),
    SupportedHardwareType: S.optional(SupportedHardwareType),
  }),
).annotate({ identifier: "Outpost" }) as any as S.Schema<Outpost>;
export interface CreateOutpostOutput {
  Outpost?: Outpost;
}
export const CreateOutpostOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Outpost: S.optional(Outpost) }),
).annotate({
  identifier: "CreateOutpostOutput",
}) as any as S.Schema<CreateOutpostOutput>;
export type CountryCode = string;
export type QuoteCapacityType = "EC2" | "EBS" | "S3" | (string & {});
export const QuoteCapacityType = /*@__PURE__*/ S.String;

export interface QuoteCapacity {
  QuoteCapacityType?: QuoteCapacityType;
  Unit?: string;
  Quantity?: number;
}
export const QuoteCapacity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuoteCapacityType: S.optional(QuoteCapacityType),
    Unit: S.optional(S.String),
    Quantity: S.optional(S.Number),
  }),
).annotate({ identifier: "QuoteCapacity" }) as any as S.Schema<QuoteCapacity>;
export type QuoteCapacityList = QuoteCapacity[];
export const QuoteCapacityList = /*@__PURE__*/ S.Array(QuoteCapacity);
export type QuoteConstraintType =
  | "RACK_MAXIMUM"
  | "RACK_MAX_POWER_KVA"
  | "RACK_MAX_WEIGHT_LBS"
  | (string & {});
export const QuoteConstraintType = /*@__PURE__*/ S.String;

export type ConstraintValue = string;
export interface QuoteConstraint {
  QuoteConstraintType?: QuoteConstraintType;
  Value?: string;
}
export const QuoteConstraint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuoteConstraintType: S.optional(QuoteConstraintType),
    Value: S.optional(S.String),
  }),
).annotate({
  identifier: "QuoteConstraint",
}) as any as S.Schema<QuoteConstraint>;
export type QuoteConstraintList = QuoteConstraint[];
export const QuoteConstraintList = /*@__PURE__*/ S.Array(QuoteConstraint);
export type PaymentOptionList = PaymentOption[];
export const PaymentOptionList = /*@__PURE__*/ S.Array(PaymentOption);
export type PaymentTermList = PaymentTerm[];
export const PaymentTermList = /*@__PURE__*/ S.Array(PaymentTerm);
export type QuoteDescription = string | redacted.Redacted<string>;
export interface CreateQuoteInput {
  OutpostIdentifier?: string;
  CountryCode: string;
  RequestedCapacities: QuoteCapacity[];
  RequestedConstraints?: QuoteConstraint[];
  RequestedPaymentOptions?: PaymentOption[];
  RequestedPaymentTerms?: PaymentTerm[];
  Description?: string | redacted.Redacted<string>;
}
export const CreateQuoteInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutpostIdentifier: S.optional(S.String),
    CountryCode: S.String,
    RequestedCapacities: QuoteCapacityList,
    RequestedConstraints: S.optional(QuoteConstraintList),
    RequestedPaymentOptions: S.optional(PaymentOptionList),
    RequestedPaymentTerms: S.optional(PaymentTermList),
    Description: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/quotes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateQuoteInput",
}) as any as S.Schema<CreateQuoteInput>;
export type QuoteId = string;
export type AccountId = string;
export type QuoteStatus =
  | "CREATED"
  | "ORDER_SUBMITTED"
  | "EXPIRED"
  | (string & {});
export const QuoteStatus = /*@__PURE__*/ S.String;

export type StatusMessage = string;
export interface CapacitySummary {
  ExistingCapacities?: QuoteCapacity[];
  FinalCapacities?: QuoteCapacity[];
  CapacityChange?: QuoteCapacity[];
}
export const CapacitySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExistingCapacities: S.optional(QuoteCapacityList),
    FinalCapacities: S.optional(QuoteCapacityList),
    CapacityChange: S.optional(QuoteCapacityList),
  }),
).annotate({
  identifier: "CapacitySummary",
}) as any as S.Schema<CapacitySummary>;
export type QuoteSpecificationType =
  | "UPDATED_RACK"
  | "NEW_RACK"
  | "EXISTING_RACK"
  | "SERVER"
  | (string & {});
export const QuoteSpecificationType = /*@__PURE__*/ S.String;

export type RackId = string;
export type QuoteRackUseType = "NETWORKING" | "COMPUTE" | (string & {});
export const QuoteRackUseType = /*@__PURE__*/ S.String;

export type RackUnitHeight =
  | "HEIGHT_42U"
  | "HEIGHT_2U"
  | "HEIGHT_1U"
  | (string & {});
export const RackUnitHeight = /*@__PURE__*/ S.String;

export type Family = string;
export type MaxSize = string;
export type Quantity = string;
export interface EC2Capacity {
  Family?: string;
  MaxSize?: string;
  Quantity?: string;
}
export const EC2Capacity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Family: S.optional(S.String),
    MaxSize: S.optional(S.String),
    Quantity: S.optional(S.String),
  }),
).annotate({ identifier: "EC2Capacity" }) as any as S.Schema<EC2Capacity>;
export type EC2CapacityListDefinition = EC2Capacity[];
export const EC2CapacityListDefinition = /*@__PURE__*/ S.Array(EC2Capacity);
export interface RackSpecificationDetails {
  RackId?: string;
  RackUse?: QuoteRackUseType;
  RackPowerDrawKva?: number;
  RackWeightLbs?: number;
  RackHeightInches?: number;
  RackWidthInches?: number;
  RackDepthInches?: number;
  RackUnitHeight?: RackUnitHeight;
  EC2Capacities?: EC2Capacity[];
}
export const RackSpecificationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RackId: S.optional(S.String),
    RackUse: S.optional(QuoteRackUseType),
    RackPowerDrawKva: S.optional(S.Number),
    RackWeightLbs: S.optional(S.Number),
    RackHeightInches: S.optional(S.Number),
    RackWidthInches: S.optional(S.Number),
    RackDepthInches: S.optional(S.Number),
    RackUnitHeight: S.optional(RackUnitHeight),
    EC2Capacities: S.optional(EC2CapacityListDefinition),
  }),
).annotate({
  identifier: "RackSpecificationDetails",
}) as any as S.Schema<RackSpecificationDetails>;
export interface ServerSpecificationDetails {
  ServerPowerDrawKva?: number;
  ServerWeightLbs?: number;
  ServerHeightInches?: number;
  ServerWidthInches?: number;
  ServerDepthInches?: number;
  RackUnitHeight?: RackUnitHeight;
  EC2Capacities?: EC2Capacity[];
}
export const ServerSpecificationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServerPowerDrawKva: S.optional(S.Number),
    ServerWeightLbs: S.optional(S.Number),
    ServerHeightInches: S.optional(S.Number),
    ServerWidthInches: S.optional(S.Number),
    ServerDepthInches: S.optional(S.Number),
    RackUnitHeight: S.optional(RackUnitHeight),
    EC2Capacities: S.optional(EC2CapacityListDefinition),
  }),
).annotate({
  identifier: "ServerSpecificationDetails",
}) as any as S.Schema<ServerSpecificationDetails>;
export interface QuoteSpecification {
  QuoteSpecificationType?: QuoteSpecificationType;
  ExistingRackSpecificationDetails?: RackSpecificationDetails;
  FinalRackSpecificationDetails?: RackSpecificationDetails;
  ServerSpecificationDetails?: ServerSpecificationDetails;
}
export const QuoteSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuoteSpecificationType: S.optional(QuoteSpecificationType),
    ExistingRackSpecificationDetails: S.optional(RackSpecificationDetails),
    FinalRackSpecificationDetails: S.optional(RackSpecificationDetails),
    ServerSpecificationDetails: S.optional(ServerSpecificationDetails),
  }),
).annotate({
  identifier: "QuoteSpecification",
}) as any as S.Schema<QuoteSpecification>;
export type QuoteSpecificationList = QuoteSpecification[];
export const QuoteSpecificationList = /*@__PURE__*/ S.Array(QuoteSpecification);
export type QuotePricingType = "SUBSCRIPTION" | (string & {});
export const QuotePricingType = /*@__PURE__*/ S.String;

export type CurrencyCode = "USD" | (string & {});
export const CurrencyCode = /*@__PURE__*/ S.String;

export interface SubscriptionPricingDetails {
  PaymentOption?: PaymentOption;
  PaymentTerm?: PaymentTerm;
  UpfrontPrice?: number;
  MonthlyRecurringPrice?: number;
  Currency?: CurrencyCode;
}
export const SubscriptionPricingDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PaymentOption: S.optional(PaymentOption),
    PaymentTerm: S.optional(PaymentTerm),
    UpfrontPrice: S.optional(S.Number),
    MonthlyRecurringPrice: S.optional(S.Number),
    Currency: S.optional(CurrencyCode),
  }),
).annotate({
  identifier: "SubscriptionPricingDetails",
}) as any as S.Schema<SubscriptionPricingDetails>;
export interface PricingOption {
  PricingType?: QuotePricingType;
  SubscriptionPricingDetails?: SubscriptionPricingDetails;
}
export const PricingOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PricingType: S.optional(QuotePricingType),
    SubscriptionPricingDetails: S.optional(SubscriptionPricingDetails),
  }),
).annotate({ identifier: "PricingOption" }) as any as S.Schema<PricingOption>;
export type PricingOptionList = PricingOption[];
export const PricingOptionList = /*@__PURE__*/ S.Array(PricingOption);
export interface QuoteOption {
  QuoteOptionIdentifier?: string;
  Capacities?: QuoteCapacity[];
  CapacitySummary?: CapacitySummary;
  Specifications?: QuoteSpecification[];
  PricingOptions?: PricingOption[];
}
export const QuoteOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuoteOptionIdentifier: S.optional(S.String),
    Capacities: S.optional(QuoteCapacityList),
    CapacitySummary: S.optional(CapacitySummary),
    Specifications: S.optional(QuoteSpecificationList),
    PricingOptions: S.optional(PricingOptionList),
  }),
).annotate({ identifier: "QuoteOption" }) as any as S.Schema<QuoteOption>;
export type QuoteOptionList = QuoteOption[];
export const QuoteOptionList = /*@__PURE__*/ S.Array(QuoteOption);
export type OrderingRequirementType =
  | "OUTPOST_ACTIVE_CHECK_ERROR"
  | "MAXIMUM_ALLOWED_ORDERS_CHECK_ERROR"
  | "VALID_ZIP_CODE_CHECK_ERROR"
  | "RACK_PHYSICAL_PROPERTIES_CHECK_ERROR"
  | "OPERATING_ADDRESS_EXISTENCE_CHECK_ERROR"
  | "SHIPPING_ADDRESS_EXISTENCE_CHECK_ERROR"
  | "COUNTRY_CODE_MISMATCH_CHECK_ERROR"
  | "OUTPOST_GENERATION_MISMATCH_ERROR"
  | "UNSUPPORTED"
  | "OUTPOST_ID_MISSING_ON_QUOTE_ERROR"
  | "ENTERPRISE_SUPPORT_ERROR"
  | "SHIPPING_ADDRESS_MISSING_CONTACT_NAME_ERROR"
  | "SHIPPING_ADDRESS_MISSING_CONTACT_NUMBER_ERROR"
  | "SHIPPING_ADDRESS_MISSING_CONTACT_INFO_ERROR"
  | "OUTPOST_STATE_CHANGED_ERROR"
  | "OUTPOST_NOT_FOUND_ERROR"
  | "OUTPOST_RENEWAL_REQUIRED_ERROR"
  | (string & {});
export const OrderingRequirementType = /*@__PURE__*/ S.String;

export type OrderingRequirementStatus =
  | "PASS"
  | "FAIL"
  | "EXEMPT"
  | (string & {});
export const OrderingRequirementStatus = /*@__PURE__*/ S.String;

export interface OrderingRequirement {
  StatusMessage?: string;
  OrderingRequirementType?: OrderingRequirementType;
  Status?: OrderingRequirementStatus;
}
export const OrderingRequirement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatusMessage: S.optional(S.String),
    OrderingRequirementType: S.optional(OrderingRequirementType),
    Status: S.optional(OrderingRequirementStatus),
  }),
).annotate({
  identifier: "OrderingRequirement",
}) as any as S.Schema<OrderingRequirement>;
export type OrderingRequirementList = OrderingRequirement[];
export const OrderingRequirementList =
  /*@__PURE__*/ S.Array(OrderingRequirement);
export type OrderIdentifier = string;
export interface Quote {
  QuoteId?: string;
  AccountId?: string;
  QuoteStatus?: QuoteStatus;
  StatusMessage?: string;
  OutpostArn?: string;
  CountryCode?: string;
  RequestedCapacities?: QuoteCapacity[];
  RequestedConstraints?: QuoteConstraint[];
  RequestedPaymentOptions?: PaymentOption[];
  RequestedPaymentTerms?: PaymentTerm[];
  QuoteOptions?: QuoteOption[];
  OrderingRequirements?: OrderingRequirement[];
  SubmittedOrderId?: string;
  CreatedDate?: Date;
  ExpirationDate?: Date;
  Description?: string | redacted.Redacted<string>;
}
export const Quote = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuoteId: S.optional(S.String),
    AccountId: S.optional(S.String),
    QuoteStatus: S.optional(QuoteStatus),
    StatusMessage: S.optional(S.String),
    OutpostArn: S.optional(S.String),
    CountryCode: S.optional(S.String),
    RequestedCapacities: S.optional(QuoteCapacityList),
    RequestedConstraints: S.optional(QuoteConstraintList),
    RequestedPaymentOptions: S.optional(PaymentOptionList),
    RequestedPaymentTerms: S.optional(PaymentTermList),
    QuoteOptions: S.optional(QuoteOptionList),
    OrderingRequirements: S.optional(OrderingRequirementList),
    SubmittedOrderId: S.optional(S.String),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ExpirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Description: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Quote" }) as any as S.Schema<Quote>;
export interface CreateQuoteOutput {
  Quote?: Quote;
}
export const CreateQuoteOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Quote: S.optional(Quote) }),
).annotate({
  identifier: "CreateQuoteOutput",
}) as any as S.Schema<CreateQuoteOutput>;
export type AutoFillIdempotencyToken = string;
export interface CreateRenewalInput {
  PaymentOption: PaymentOption;
  PaymentTerm: PaymentTerm;
  OutpostIdentifier: string;
  ClientToken?: string;
}
export const CreateRenewalInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PaymentOption: PaymentOption,
    PaymentTerm: PaymentTerm,
    OutpostIdentifier: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/renewals" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRenewalInput",
}) as any as S.Schema<CreateRenewalInput>;
export interface CreateRenewalOutput {
  PaymentOption?: PaymentOption;
  PaymentTerm?: PaymentTerm;
  OutpostId?: string;
  UpfrontPrice?: number;
  MonthlyRecurringPrice?: number;
  Currency?: CurrencyCode;
}
export const CreateRenewalOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PaymentOption: S.optional(PaymentOption),
    PaymentTerm: S.optional(PaymentTerm),
    OutpostId: S.optional(S.String),
    UpfrontPrice: S.optional(S.Number),
    MonthlyRecurringPrice: S.optional(S.Number),
    Currency: S.optional(CurrencyCode),
  }),
).annotate({
  identifier: "CreateRenewalOutput",
}) as any as S.Schema<CreateRenewalOutput>;
export type SiteName = string;
export type SiteDescription = string;
export type SiteNotes = string;
export type ContactName = string;
export type ContactPhoneNumber = string;
export type AddressLine1 = string;
export type AddressLine2 = string;
export type AddressLine3 = string;
export type City = string;
export type StateOrRegion = string;
export type DistrictOrCounty = string;
export type PostalCode = string;
export type Municipality = string;
export interface Address {
  ContactName: string;
  ContactPhoneNumber: string;
  AddressLine1: string;
  AddressLine2?: string;
  AddressLine3?: string;
  City: string;
  StateOrRegion: string;
  DistrictOrCounty?: string;
  PostalCode: string;
  CountryCode: string;
  Municipality?: string;
}
export const Address = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactName: S.String,
    ContactPhoneNumber: S.String,
    AddressLine1: S.String,
    AddressLine2: S.optional(S.String),
    AddressLine3: S.optional(S.String),
    City: S.String,
    StateOrRegion: S.String,
    DistrictOrCounty: S.optional(S.String),
    PostalCode: S.String,
    CountryCode: S.String,
    Municipality: S.optional(S.String),
  }),
).annotate({ identifier: "Address" }) as any as S.Schema<Address>;
export type PowerDrawKva =
  | "POWER_5_KVA"
  | "POWER_10_KVA"
  | "POWER_15_KVA"
  | "POWER_30_KVA"
  | (string & {});
export const PowerDrawKva = /*@__PURE__*/ S.String;

export type PowerPhase = "SINGLE_PHASE" | "THREE_PHASE" | (string & {});
export const PowerPhase = /*@__PURE__*/ S.String;

export type PowerConnector =
  | "L6_30P"
  | "IEC309"
  | "AH530P7W"
  | "AH532P6W"
  | "CS8365C"
  | (string & {});
export const PowerConnector = /*@__PURE__*/ S.String;

export type PowerFeedDrop = "ABOVE_RACK" | "BELOW_RACK" | (string & {});
export const PowerFeedDrop = /*@__PURE__*/ S.String;

export type UplinkGbps =
  | "UPLINK_1G"
  | "UPLINK_10G"
  | "UPLINK_40G"
  | "UPLINK_100G"
  | (string & {});
export const UplinkGbps = /*@__PURE__*/ S.String;

export type UplinkCount =
  | "UPLINK_COUNT_1"
  | "UPLINK_COUNT_2"
  | "UPLINK_COUNT_3"
  | "UPLINK_COUNT_4"
  | "UPLINK_COUNT_5"
  | "UPLINK_COUNT_6"
  | "UPLINK_COUNT_7"
  | "UPLINK_COUNT_8"
  | "UPLINK_COUNT_12"
  | "UPLINK_COUNT_16"
  | (string & {});
export const UplinkCount = /*@__PURE__*/ S.String;

export type FiberOpticCableType = "SINGLE_MODE" | "MULTI_MODE" | (string & {});
export const FiberOpticCableType = /*@__PURE__*/ S.String;

export type OpticalStandard =
  | "OPTIC_10GBASE_SR"
  | "OPTIC_10GBASE_IR"
  | "OPTIC_10GBASE_LR"
  | "OPTIC_40GBASE_SR"
  | "OPTIC_40GBASE_ESR"
  | "OPTIC_40GBASE_IR4_LR4L"
  | "OPTIC_40GBASE_LR4"
  | "OPTIC_100GBASE_SR4"
  | "OPTIC_100GBASE_CWDM4"
  | "OPTIC_100GBASE_LR4"
  | "OPTIC_100G_PSM4_MSA"
  | "OPTIC_1000BASE_LX"
  | "OPTIC_1000BASE_SX"
  | (string & {});
export const OpticalStandard = /*@__PURE__*/ S.String;

export type MaximumSupportedWeightLbs =
  | "NO_LIMIT"
  | "MAX_1400_LBS"
  | "MAX_1600_LBS"
  | "MAX_1800_LBS"
  | "MAX_2000_LBS"
  | (string & {});
export const MaximumSupportedWeightLbs = /*@__PURE__*/ S.String;

export interface RackPhysicalProperties {
  PowerDrawKva?: PowerDrawKva;
  PowerPhase?: PowerPhase;
  PowerConnector?: PowerConnector;
  PowerFeedDrop?: PowerFeedDrop;
  UplinkGbps?: UplinkGbps;
  UplinkCount?: UplinkCount;
  FiberOpticCableType?: FiberOpticCableType;
  OpticalStandard?: OpticalStandard;
  MaximumSupportedWeightLbs?: MaximumSupportedWeightLbs;
}
export const RackPhysicalProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PowerDrawKva: S.optional(PowerDrawKva),
    PowerPhase: S.optional(PowerPhase),
    PowerConnector: S.optional(PowerConnector),
    PowerFeedDrop: S.optional(PowerFeedDrop),
    UplinkGbps: S.optional(UplinkGbps),
    UplinkCount: S.optional(UplinkCount),
    FiberOpticCableType: S.optional(FiberOpticCableType),
    OpticalStandard: S.optional(OpticalStandard),
    MaximumSupportedWeightLbs: S.optional(MaximumSupportedWeightLbs),
  }),
).annotate({
  identifier: "RackPhysicalProperties",
}) as any as S.Schema<RackPhysicalProperties>;
export interface CreateSiteInput {
  Name: string;
  Description?: string;
  Notes?: string;
  Tags?: { [key: string]: string | undefined };
  OperatingAddress?: Address;
  ShippingAddress?: Address;
  RackPhysicalProperties?: RackPhysicalProperties;
}
export const CreateSiteInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    Notes: S.optional(S.String),
    Tags: S.optional(TagMap),
    OperatingAddress: S.optional(Address),
    ShippingAddress: S.optional(Address),
    RackPhysicalProperties: S.optional(RackPhysicalProperties),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/sites" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSiteInput",
}) as any as S.Schema<CreateSiteInput>;
export interface Site {
  SiteId?: string;
  AccountId?: string;
  Name?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
  SiteArn?: string;
  Notes?: string;
  OperatingAddressCountryCode?: string;
  OperatingAddressStateOrRegion?: string;
  OperatingAddressCity?: string;
  RackPhysicalProperties?: RackPhysicalProperties;
}
export const Site = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SiteId: S.optional(S.String),
    AccountId: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Tags: S.optional(TagMap),
    SiteArn: S.optional(S.String),
    Notes: S.optional(S.String),
    OperatingAddressCountryCode: S.optional(S.String),
    OperatingAddressStateOrRegion: S.optional(S.String),
    OperatingAddressCity: S.optional(S.String),
    RackPhysicalProperties: S.optional(RackPhysicalProperties),
  }),
).annotate({ identifier: "Site" }) as any as S.Schema<Site>;
export interface CreateSiteOutput {
  Site?: Site;
}
export const CreateSiteOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Site: S.optional(Site) }),
).annotate({
  identifier: "CreateSiteOutput",
}) as any as S.Schema<CreateSiteOutput>;
export interface DeleteOutpostInput {
  OutpostId: string;
}
export const DeleteOutpostInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OutpostId: S.String.pipe(T.HttpLabel("OutpostId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/outposts/{OutpostId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteOutpostInput",
}) as any as S.Schema<DeleteOutpostInput>;
export interface DeleteOutpostOutput {}
export const DeleteOutpostOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteOutpostOutput",
}) as any as S.Schema<DeleteOutpostOutput>;
export interface DeleteQuoteInput {
  QuoteIdentifier: string;
}
export const DeleteQuoteInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuoteIdentifier: S.String.pipe(T.HttpLabel("QuoteIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/quotes/{QuoteIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteQuoteInput",
}) as any as S.Schema<DeleteQuoteInput>;
export interface DeleteQuoteOutput {}
export const DeleteQuoteOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteQuoteOutput",
}) as any as S.Schema<DeleteQuoteOutput>;
export interface DeleteSiteInput {
  SiteId: string;
}
export const DeleteSiteInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SiteId: S.String.pipe(T.HttpLabel("SiteId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/sites/{SiteId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSiteInput",
}) as any as S.Schema<DeleteSiteInput>;
export interface DeleteSiteOutput {}
export const DeleteSiteOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSiteOutput",
}) as any as S.Schema<DeleteSiteOutput>;
export interface GetCapacityTaskInput {
  CapacityTaskId: string;
  OutpostIdentifier: string;
}
export const GetCapacityTaskInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CapacityTaskId: S.String.pipe(T.HttpLabel("CapacityTaskId")),
    OutpostIdentifier: S.String.pipe(T.HttpLabel("OutpostIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/outposts/{OutpostIdentifier}/capacity/{CapacityTaskId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCapacityTaskInput",
}) as any as S.Schema<GetCapacityTaskInput>;
export type InstanceTypeName = string;
export type InstanceTypeCount = number;
export interface InstanceTypeCapacity {
  InstanceType: string;
  Count: number;
}
export const InstanceTypeCapacity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstanceType: S.String, Count: S.Number }),
).annotate({
  identifier: "InstanceTypeCapacity",
}) as any as S.Schema<InstanceTypeCapacity>;
export type RequestedInstancePools = InstanceTypeCapacity[];
export const RequestedInstancePools =
  /*@__PURE__*/ S.Array(InstanceTypeCapacity);
export type InstanceId = string;
export type InstanceIdList = string[];
export const InstanceIdList = /*@__PURE__*/ S.Array(S.String);
export type AccountIdList = string[];
export const AccountIdList = /*@__PURE__*/ S.Array(S.String);
export type AWSServiceName =
  | "AWS"
  | "EC2"
  | "ELASTICACHE"
  | "ELB"
  | "RDS"
  | "ROUTE53"
  | (string & {});
export const AWSServiceName = /*@__PURE__*/ S.String;

export type AWSServiceNameList = AWSServiceName[];
export const AWSServiceNameList = /*@__PURE__*/ S.Array(AWSServiceName);
export interface InstancesToExclude {
  Instances?: string[];
  AccountIds?: string[];
  Services?: AWSServiceName[];
}
export const InstancesToExclude = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Instances: S.optional(InstanceIdList),
    AccountIds: S.optional(AccountIdList),
    Services: S.optional(AWSServiceNameList),
  }),
).annotate({
  identifier: "InstancesToExclude",
}) as any as S.Schema<InstancesToExclude>;
export type DryRun = boolean;
export type CapacityTaskStatus =
  | "REQUESTED"
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | "WAITING_FOR_EVACUATION"
  | "CANCELLATION_IN_PROGRESS"
  | "CANCELLED"
  | (string & {});
export const CapacityTaskStatus = /*@__PURE__*/ S.String;

export type CapacityTaskStatusReason = string;
export type CapacityTaskFailureType =
  | "UNSUPPORTED_CAPACITY_CONFIGURATION"
  | "UNEXPECTED_ASSET_STATE"
  | "BLOCKING_INSTANCES_NOT_EVACUATED"
  | "INTERNAL_SERVER_ERROR"
  | "RESOURCE_NOT_FOUND"
  | (string & {});
export const CapacityTaskFailureType = /*@__PURE__*/ S.String;

export interface CapacityTaskFailure {
  Reason: string;
  Type?: CapacityTaskFailureType;
}
export const CapacityTaskFailure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Reason: S.String, Type: S.optional(CapacityTaskFailureType) }),
).annotate({
  identifier: "CapacityTaskFailure",
}) as any as S.Schema<CapacityTaskFailure>;
export type TaskActionOnBlockingInstances =
  | "WAIT_FOR_EVACUATION"
  | "FAIL_TASK"
  | (string & {});
export const TaskActionOnBlockingInstances = /*@__PURE__*/ S.String;

export interface GetCapacityTaskOutput {
  CapacityTaskId?: string;
  OutpostId?: string;
  OrderId?: string;
  AssetId?: string;
  RequestedInstancePools?: InstanceTypeCapacity[];
  InstancesToExclude?: InstancesToExclude;
  DryRun?: boolean;
  CapacityTaskStatus?: CapacityTaskStatus;
  Failed?: CapacityTaskFailure;
  CreationDate?: Date;
  CompletionDate?: Date;
  LastModifiedDate?: Date;
  TaskActionOnBlockingInstances?: TaskActionOnBlockingInstances;
}
export const GetCapacityTaskOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CapacityTaskId: S.optional(S.String),
    OutpostId: S.optional(S.String),
    OrderId: S.optional(S.String),
    AssetId: S.optional(S.String),
    RequestedInstancePools: S.optional(RequestedInstancePools),
    InstancesToExclude: S.optional(InstancesToExclude),
    DryRun: S.optional(S.Boolean),
    CapacityTaskStatus: S.optional(CapacityTaskStatus),
    Failed: S.optional(CapacityTaskFailure),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TaskActionOnBlockingInstances: S.optional(TaskActionOnBlockingInstances),
  }),
).annotate({
  identifier: "GetCapacityTaskOutput",
}) as any as S.Schema<GetCapacityTaskOutput>;
export interface GetCatalogItemInput {
  CatalogItemId: string;
}
export const GetCatalogItemInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CatalogItemId: S.String.pipe(T.HttpLabel("CatalogItemId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/catalog/item/{CatalogItemId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCatalogItemInput",
}) as any as S.Schema<GetCatalogItemInput>;
export type CatalogItemStatus = "AVAILABLE" | "DISCONTINUED" | (string & {});
export const CatalogItemStatus = /*@__PURE__*/ S.String;

export type CatalogItemPowerKva = number;
export type CatalogItemWeightLbs = number;
export type SupportedUplinkGbps = number;
export type SupportedUplinkGbpsListDefinition = number[];
export const SupportedUplinkGbpsListDefinition = /*@__PURE__*/ S.Array(
  S.Number,
);
export type SupportedStorageEnum = "EBS" | "S3" | (string & {});
export const SupportedStorageEnum = /*@__PURE__*/ S.String;

export type SupportedStorageList = SupportedStorageEnum[];
export const SupportedStorageList = /*@__PURE__*/ S.Array(SupportedStorageEnum);
export interface CatalogItem {
  CatalogItemId?: string;
  ItemStatus?: CatalogItemStatus;
  EC2Capacities?: EC2Capacity[];
  PowerKva?: number;
  WeightLbs?: number;
  SupportedUplinkGbps?: number[];
  SupportedStorage?: SupportedStorageEnum[];
}
export const CatalogItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogItemId: S.optional(S.String),
    ItemStatus: S.optional(CatalogItemStatus),
    EC2Capacities: S.optional(EC2CapacityListDefinition),
    PowerKva: S.optional(S.Number),
    WeightLbs: S.optional(S.Number),
    SupportedUplinkGbps: S.optional(SupportedUplinkGbpsListDefinition),
    SupportedStorage: S.optional(SupportedStorageList),
  }),
).annotate({ identifier: "CatalogItem" }) as any as S.Schema<CatalogItem>;
export interface GetCatalogItemOutput {
  CatalogItem?: CatalogItem;
}
export const GetCatalogItemOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CatalogItem: S.optional(CatalogItem) }),
).annotate({
  identifier: "GetCatalogItemOutput",
}) as any as S.Schema<GetCatalogItemOutput>;
export type ConnectionId = string;
export interface GetConnectionRequest {
  ConnectionId: string;
}
export const GetConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectionId: S.String.pipe(T.HttpLabel("ConnectionId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/connections/{ConnectionId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConnectionRequest",
}) as any as S.Schema<GetConnectionRequest>;
export type WireGuardPublicKey = string;
export type ServerEndpoint = string;
export type CIDR = string;
export type CIDRList = string[];
export const CIDRList = /*@__PURE__*/ S.Array(S.String);
export interface ConnectionDetails {
  ClientPublicKey?: string;
  ServerPublicKey?: string;
  ServerEndpoint?: string;
  ClientTunnelAddress?: string;
  ServerTunnelAddress?: string;
  AllowedIps?: string[];
}
export const ConnectionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientPublicKey: S.optional(S.String),
    ServerPublicKey: S.optional(S.String),
    ServerEndpoint: S.optional(S.String),
    ClientTunnelAddress: S.optional(S.String),
    ServerTunnelAddress: S.optional(S.String),
    AllowedIps: S.optional(CIDRList),
  }),
).annotate({
  identifier: "ConnectionDetails",
}) as any as S.Schema<ConnectionDetails>;
export interface GetConnectionResponse {
  ConnectionId?: string;
  ConnectionDetails?: ConnectionDetails;
}
export const GetConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionId: S.optional(S.String),
    ConnectionDetails: S.optional(ConnectionDetails),
  }),
).annotate({
  identifier: "GetConnectionResponse",
}) as any as S.Schema<GetConnectionResponse>;
export interface GetOrderInput {
  OrderId: string;
}
export const GetOrderInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrderId: S.String.pipe(T.HttpLabel("OrderId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/orders/{OrderId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetOrderInput" }) as any as S.Schema<GetOrderInput>;
export interface GetOrderOutput {
  Order?: Order;
}
export const GetOrderOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Order: S.optional(Order) }),
).annotate({ identifier: "GetOrderOutput" }) as any as S.Schema<GetOrderOutput>;
export interface GetOutpostInput {
  OutpostId: string;
}
export const GetOutpostInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OutpostId: S.String.pipe(T.HttpLabel("OutpostId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/outposts/{OutpostId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOutpostInput",
}) as any as S.Schema<GetOutpostInput>;
export interface GetOutpostOutput {
  Outpost?: Outpost;
}
export const GetOutpostOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Outpost: S.optional(Outpost) }),
).annotate({
  identifier: "GetOutpostOutput",
}) as any as S.Schema<GetOutpostOutput>;
export type Token = string;
export type MaxResults1000 = number;
export interface GetOutpostBillingInformationInput {
  NextToken?: string;
  MaxResults?: number;
  OutpostIdentifier: string;
}
export const GetOutpostBillingInformationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    OutpostIdentifier: S.String.pipe(T.HttpLabel("OutpostIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/outpost/{OutpostIdentifier}/billing-information",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOutpostBillingInformationInput",
}) as any as S.Schema<GetOutpostBillingInformationInput>;
export type SubscriptionType =
  | "ORIGINAL"
  | "RENEWAL"
  | "CAPACITY_INCREASE"
  | (string & {});
export const SubscriptionType = /*@__PURE__*/ S.String;

export type SubscriptionStatus =
  | "ACTIVE"
  | "PENDING"
  | "INACTIVE"
  | "CANCELLED"
  | (string & {});
export const SubscriptionStatus = /*@__PURE__*/ S.String;

export type OrderIdList = string[];
export const OrderIdList = /*@__PURE__*/ S.Array(S.String);
export interface Subscription {
  SubscriptionId?: string;
  SubscriptionType?: SubscriptionType;
  SubscriptionStatus?: SubscriptionStatus;
  OrderIds?: string[];
  BeginDate?: Date;
  EndDate?: Date;
  Currency?: CurrencyCode;
  MonthlyRecurringPrice?: number;
  UpfrontPrice?: number;
}
export const Subscription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubscriptionId: S.optional(S.String),
    SubscriptionType: S.optional(SubscriptionType),
    SubscriptionStatus: S.optional(SubscriptionStatus),
    OrderIds: S.optional(OrderIdList),
    BeginDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Currency: S.optional(CurrencyCode),
    MonthlyRecurringPrice: S.optional(S.Number),
    UpfrontPrice: S.optional(S.Number),
  }),
).annotate({ identifier: "Subscription" }) as any as S.Schema<Subscription>;
export type SubscriptionList = Subscription[];
export const SubscriptionList = /*@__PURE__*/ S.Array(Subscription);
export interface GetOutpostBillingInformationOutput {
  NextToken?: string;
  Subscriptions?: Subscription[];
  ContractEndDate?: string;
  PaymentTerm?: PaymentTerm;
  PaymentOption?: PaymentOption;
}
export const GetOutpostBillingInformationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Subscriptions: S.optional(SubscriptionList),
    ContractEndDate: S.optional(S.String),
    PaymentTerm: S.optional(PaymentTerm),
    PaymentOption: S.optional(PaymentOption),
  }),
).annotate({
  identifier: "GetOutpostBillingInformationOutput",
}) as any as S.Schema<GetOutpostBillingInformationOutput>;
export interface GetOutpostInstanceTypesInput {
  OutpostId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const GetOutpostInstanceTypesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutpostId: S.String.pipe(T.HttpLabel("OutpostId")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/outposts/{OutpostId}/instanceTypes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOutpostInstanceTypesInput",
}) as any as S.Schema<GetOutpostInstanceTypesInput>;
export type InstanceType = string;
export type VCPUCount = number;
export interface InstanceTypeItem {
  InstanceType?: string;
  VCPUs?: number;
}
export const InstanceTypeItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstanceType: S.optional(S.String), VCPUs: S.optional(S.Number) }),
).annotate({
  identifier: "InstanceTypeItem",
}) as any as S.Schema<InstanceTypeItem>;
export type InstanceTypeListDefinition = InstanceTypeItem[];
export const InstanceTypeListDefinition =
  /*@__PURE__*/ S.Array(InstanceTypeItem);
export interface GetOutpostInstanceTypesOutput {
  InstanceTypes?: InstanceTypeItem[];
  NextToken?: string;
  OutpostId?: string;
  OutpostArn?: string;
}
export const GetOutpostInstanceTypesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceTypes: S.optional(InstanceTypeListDefinition),
    NextToken: S.optional(S.String),
    OutpostId: S.optional(S.String),
    OutpostArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GetOutpostInstanceTypesOutput",
}) as any as S.Schema<GetOutpostInstanceTypesOutput>;
export type AssetIdInput = string;
export interface GetOutpostSupportedInstanceTypesInput {
  OutpostIdentifier: string;
  OrderId?: string;
  AssetId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const GetOutpostSupportedInstanceTypesInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      OutpostIdentifier: S.String.pipe(T.HttpLabel("OutpostIdentifier")),
      OrderId: S.optional(S.String).pipe(T.HttpQuery("OrderId")),
      AssetId: S.optional(S.String).pipe(T.HttpQuery("AssetId")),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/outposts/{OutpostIdentifier}/supportedInstanceTypes",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetOutpostSupportedInstanceTypesInput",
}) as any as S.Schema<GetOutpostSupportedInstanceTypesInput>;
export interface GetOutpostSupportedInstanceTypesOutput {
  InstanceTypes?: InstanceTypeItem[];
  NextToken?: string;
}
export const GetOutpostSupportedInstanceTypesOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      InstanceTypes: S.optional(InstanceTypeListDefinition),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "GetOutpostSupportedInstanceTypesOutput",
}) as any as S.Schema<GetOutpostSupportedInstanceTypesOutput>;
export interface GetQuoteInput {
  QuoteIdentifier: string;
}
export const GetQuoteInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuoteIdentifier: S.String.pipe(T.HttpLabel("QuoteIdentifier")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/quotes/{QuoteIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetQuoteInput" }) as any as S.Schema<GetQuoteInput>;
export interface GetQuoteOutput {
  Quote?: Quote;
}
export const GetQuoteOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Quote: S.optional(Quote) }),
).annotate({ identifier: "GetQuoteOutput" }) as any as S.Schema<GetQuoteOutput>;
export interface GetRenewalPricingInput {
  OutpostIdentifier: string;
}
export const GetRenewalPricingInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutpostIdentifier: S.String.pipe(T.HttpLabel("OutpostIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/outpost/{OutpostIdentifier}/renewal-pricing",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRenewalPricingInput",
}) as any as S.Schema<GetRenewalPricingInput>;
export type PricingResult = "PRICED" | "UNABLE_TO_PRICE" | (string & {});
export const PricingResult = /*@__PURE__*/ S.String;

export interface GetRenewalPricingOutput {
  PricingResult?: PricingResult;
  PricingOptions?: PricingOption[];
}
export const GetRenewalPricingOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PricingResult: S.optional(PricingResult),
    PricingOptions: S.optional(PricingOptionList),
  }),
).annotate({
  identifier: "GetRenewalPricingOutput",
}) as any as S.Schema<GetRenewalPricingOutput>;
export interface GetSiteInput {
  SiteId: string;
}
export const GetSiteInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SiteId: S.String.pipe(T.HttpLabel("SiteId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sites/{SiteId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetSiteInput" }) as any as S.Schema<GetSiteInput>;
export interface GetSiteOutput {
  Site?: Site;
}
export const GetSiteOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Site: S.optional(Site) }),
).annotate({ identifier: "GetSiteOutput" }) as any as S.Schema<GetSiteOutput>;
export type AddressType =
  | "SHIPPING_ADDRESS"
  | "OPERATING_ADDRESS"
  | (string & {});
export const AddressType = /*@__PURE__*/ S.String;

export interface GetSiteAddressInput {
  SiteId: string;
  AddressType: AddressType;
}
export const GetSiteAddressInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SiteId: S.String.pipe(T.HttpLabel("SiteId")),
    AddressType: AddressType.pipe(T.HttpQuery("AddressType")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sites/{SiteId}/address" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSiteAddressInput",
}) as any as S.Schema<GetSiteAddressInput>;
export interface GetSiteAddressOutput {
  SiteId?: string;
  AddressType?: AddressType;
  Address?: Address;
}
export const GetSiteAddressOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SiteId: S.optional(S.String),
    AddressType: S.optional(AddressType),
    Address: S.optional(Address),
  }),
).annotate({
  identifier: "GetSiteAddressOutput",
}) as any as S.Schema<GetSiteAddressOutput>;
export type AssetIdList = string[];
export const AssetIdList = /*@__PURE__*/ S.Array(S.String);
export type OutpostInstanceType = string;
export type OutpostInstanceTypeList = string[];
export const OutpostInstanceTypeList = /*@__PURE__*/ S.Array(S.String);
export interface ListAssetInstancesInput {
  OutpostIdentifier: string;
  AssetIdFilter?: string[];
  InstanceTypeFilter?: string[];
  AccountIdFilter?: string[];
  AwsServiceFilter?: AWSServiceName[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListAssetInstancesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutpostIdentifier: S.String.pipe(T.HttpLabel("OutpostIdentifier")),
    AssetIdFilter: S.optional(AssetIdList).pipe(T.HttpQuery("AssetIdFilter")),
    InstanceTypeFilter: S.optional(OutpostInstanceTypeList).pipe(
      T.HttpQuery("InstanceTypeFilter"),
    ),
    AccountIdFilter: S.optional(AccountIdList).pipe(
      T.HttpQuery("AccountIdFilter"),
    ),
    AwsServiceFilter: S.optional(AWSServiceNameList).pipe(
      T.HttpQuery("AwsServiceFilter"),
    ),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/outposts/{OutpostIdentifier}/assetInstances",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssetInstancesInput",
}) as any as S.Schema<ListAssetInstancesInput>;
export interface AssetInstance {
  InstanceId?: string;
  InstanceType?: string;
  AssetId?: string;
  AccountId?: string;
  AwsServiceName?: AWSServiceName;
}
export const AssetInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceId: S.optional(S.String),
    InstanceType: S.optional(S.String),
    AssetId: S.optional(S.String),
    AccountId: S.optional(S.String),
    AwsServiceName: S.optional(AWSServiceName),
  }),
).annotate({ identifier: "AssetInstance" }) as any as S.Schema<AssetInstance>;
export type AssetInstanceList = AssetInstance[];
export const AssetInstanceList = /*@__PURE__*/ S.Array(AssetInstance);
export interface ListAssetInstancesOutput {
  AssetInstances?: AssetInstance[];
  NextToken?: string;
}
export const ListAssetInstancesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetInstances: S.optional(AssetInstanceList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssetInstancesOutput",
}) as any as S.Schema<ListAssetInstancesOutput>;
export type HostId = string;
export type HostIdList = string[];
export const HostIdList = /*@__PURE__*/ S.Array(S.String);
export type AssetState =
  | "ACTIVE"
  | "RETIRING"
  | "ISOLATED"
  | "INSTALLING"
  | (string & {});
export const AssetState = /*@__PURE__*/ S.String;

export type StatusList = AssetState[];
export const StatusList = /*@__PURE__*/ S.Array(AssetState);
export type AssetType =
  | "COMPUTE"
  | "STORAGE"
  | "POWERSHELF"
  | "SWITCH"
  | "NETWORKING"
  | (string & {});
export const AssetType = /*@__PURE__*/ S.String;

export type AssetTypeList = AssetType[];
export const AssetTypeList = /*@__PURE__*/ S.Array(AssetType);
export interface ListAssetsInput {
  OutpostIdentifier: string;
  HostIdFilter?: string[];
  MaxResults?: number;
  NextToken?: string;
  StatusFilter?: AssetState[];
  AssetTypeFilter?: AssetType[];
}
export const ListAssetsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutpostIdentifier: S.String.pipe(T.HttpLabel("OutpostIdentifier")),
    HostIdFilter: S.optional(HostIdList).pipe(T.HttpQuery("HostIdFilter")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    StatusFilter: S.optional(StatusList).pipe(T.HttpQuery("StatusFilter")),
    AssetTypeFilter: S.optional(AssetTypeList).pipe(
      T.HttpQuery("AssetTypeFilter"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/outposts/{OutpostIdentifier}/assets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssetsInput",
}) as any as S.Schema<ListAssetsInput>;
export type ComputeAssetState =
  | "ACTIVE"
  | "ISOLATED"
  | "RETIRING"
  | "INSTALLING"
  | (string & {});
export const ComputeAssetState = /*@__PURE__*/ S.String;

export type InstanceFamilyName = string;
export type InstanceFamilies = string[];
export const InstanceFamilies = /*@__PURE__*/ S.Array(S.String);
export interface AssetInstanceTypeCapacity {
  InstanceType: string;
  Count: number;
}
export const AssetInstanceTypeCapacity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstanceType: S.String, Count: S.Number }),
).annotate({
  identifier: "AssetInstanceTypeCapacity",
}) as any as S.Schema<AssetInstanceTypeCapacity>;
export type AssetInstanceCapacityList = AssetInstanceTypeCapacity[];
export const AssetInstanceCapacityList = /*@__PURE__*/ S.Array(
  AssetInstanceTypeCapacity,
);
export interface ComputeAttributes {
  HostId?: string;
  State?: ComputeAssetState;
  InstanceFamilies?: string[];
  InstanceTypeCapacities?: AssetInstanceTypeCapacity[];
  MaxVcpus?: number;
}
export const ComputeAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HostId: S.optional(S.String),
    State: S.optional(ComputeAssetState),
    InstanceFamilies: S.optional(InstanceFamilies),
    InstanceTypeCapacities: S.optional(AssetInstanceCapacityList),
    MaxVcpus: S.optional(S.Number),
  }),
).annotate({
  identifier: "ComputeAttributes",
}) as any as S.Schema<ComputeAttributes>;
export type RackElevation = number;
export interface AssetLocation {
  RackElevation?: number;
}
export const AssetLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RackElevation: S.optional(S.Number) }),
).annotate({ identifier: "AssetLocation" }) as any as S.Schema<AssetLocation>;
export interface AssetInfo {
  AssetId?: string;
  RackId?: string;
  AssetType?: AssetType;
  ComputeAttributes?: ComputeAttributes;
  AssetLocation?: AssetLocation;
}
export const AssetInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetId: S.optional(S.String),
    RackId: S.optional(S.String),
    AssetType: S.optional(AssetType),
    ComputeAttributes: S.optional(ComputeAttributes),
    AssetLocation: S.optional(AssetLocation),
  }),
).annotate({ identifier: "AssetInfo" }) as any as S.Schema<AssetInfo>;
export type AssetListDefinition = AssetInfo[];
export const AssetListDefinition = /*@__PURE__*/ S.Array(AssetInfo);
export interface ListAssetsOutput {
  Assets?: AssetInfo[];
  NextToken?: string;
}
export const ListAssetsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Assets: S.optional(AssetListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssetsOutput",
}) as any as S.Schema<ListAssetsOutput>;
export interface ListBlockingInstancesForCapacityTaskInput {
  OutpostIdentifier: string;
  CapacityTaskId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListBlockingInstancesForCapacityTaskInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      OutpostIdentifier: S.String.pipe(T.HttpLabel("OutpostIdentifier")),
      CapacityTaskId: S.String.pipe(T.HttpLabel("CapacityTaskId")),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/outposts/{OutpostIdentifier}/capacity/{CapacityTaskId}/blockingInstances",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListBlockingInstancesForCapacityTaskInput",
  }) as any as S.Schema<ListBlockingInstancesForCapacityTaskInput>;
export interface BlockingInstance {
  InstanceId?: string;
  AccountId?: string;
  AwsServiceName?: AWSServiceName;
}
export const BlockingInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceId: S.optional(S.String),
    AccountId: S.optional(S.String),
    AwsServiceName: S.optional(AWSServiceName),
  }),
).annotate({
  identifier: "BlockingInstance",
}) as any as S.Schema<BlockingInstance>;
export type BlockingInstancesList = BlockingInstance[];
export const BlockingInstancesList = /*@__PURE__*/ S.Array(BlockingInstance);
export interface ListBlockingInstancesForCapacityTaskOutput {
  BlockingInstances?: BlockingInstance[];
  NextToken?: string;
}
export const ListBlockingInstancesForCapacityTaskOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      BlockingInstances: S.optional(BlockingInstancesList),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListBlockingInstancesForCapacityTaskOutput",
  }) as any as S.Schema<ListBlockingInstancesForCapacityTaskOutput>;
export type CapacityTaskStatusList = CapacityTaskStatus[];
export const CapacityTaskStatusList = /*@__PURE__*/ S.Array(CapacityTaskStatus);
export interface ListCapacityTasksInput {
  OutpostIdentifierFilter?: string;
  MaxResults?: number;
  NextToken?: string;
  CapacityTaskStatusFilter?: CapacityTaskStatus[];
}
export const ListCapacityTasksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutpostIdentifierFilter: S.optional(S.String).pipe(
      T.HttpQuery("OutpostIdentifierFilter"),
    ),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    CapacityTaskStatusFilter: S.optional(CapacityTaskStatusList).pipe(
      T.HttpQuery("CapacityTaskStatusFilter"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/capacity/tasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCapacityTasksInput",
}) as any as S.Schema<ListCapacityTasksInput>;
export interface CapacityTaskSummary {
  CapacityTaskId?: string;
  OutpostId?: string;
  OrderId?: string;
  AssetId?: string;
  CapacityTaskStatus?: CapacityTaskStatus;
  CreationDate?: Date;
  CompletionDate?: Date;
  LastModifiedDate?: Date;
}
export const CapacityTaskSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CapacityTaskId: S.optional(S.String),
    OutpostId: S.optional(S.String),
    OrderId: S.optional(S.String),
    AssetId: S.optional(S.String),
    CapacityTaskStatus: S.optional(CapacityTaskStatus),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "CapacityTaskSummary",
}) as any as S.Schema<CapacityTaskSummary>;
export type CapacityTaskList = CapacityTaskSummary[];
export const CapacityTaskList = /*@__PURE__*/ S.Array(CapacityTaskSummary);
export interface ListCapacityTasksOutput {
  CapacityTasks?: CapacityTaskSummary[];
  NextToken?: string;
}
export const ListCapacityTasksOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CapacityTasks: S.optional(CapacityTaskList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCapacityTasksOutput",
}) as any as S.Schema<ListCapacityTasksOutput>;
export type CatalogItemClass = "RACK" | "SERVER" | (string & {});
export const CatalogItemClass = /*@__PURE__*/ S.String;

export type CatalogItemClassList = CatalogItemClass[];
export const CatalogItemClassList = /*@__PURE__*/ S.Array(CatalogItemClass);
export type EC2FamilyList = string[];
export const EC2FamilyList = /*@__PURE__*/ S.Array(S.String);
export interface ListCatalogItemsInput {
  NextToken?: string;
  MaxResults?: number;
  ItemClassFilter?: CatalogItemClass[];
  SupportedStorageFilter?: SupportedStorageEnum[];
  EC2FamilyFilter?: string[];
}
export const ListCatalogItemsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    ItemClassFilter: S.optional(CatalogItemClassList).pipe(
      T.HttpQuery("ItemClassFilter"),
    ),
    SupportedStorageFilter: S.optional(SupportedStorageList).pipe(
      T.HttpQuery("SupportedStorageFilter"),
    ),
    EC2FamilyFilter: S.optional(EC2FamilyList).pipe(
      T.HttpQuery("EC2FamilyFilter"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/catalog/items" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCatalogItemsInput",
}) as any as S.Schema<ListCatalogItemsInput>;
export type CatalogItemListDefinition = CatalogItem[];
export const CatalogItemListDefinition = /*@__PURE__*/ S.Array(CatalogItem);
export interface ListCatalogItemsOutput {
  CatalogItems?: CatalogItem[];
  NextToken?: string;
}
export const ListCatalogItemsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogItems: S.optional(CatalogItemListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCatalogItemsOutput",
}) as any as S.Schema<ListCatalogItemsOutput>;
export type OutpostGeneration = "GENERATION_2" | "GENERATION_1" | (string & {});
export const OutpostGeneration = /*@__PURE__*/ S.String;

export interface ListOrderableInstanceTypesInput {
  OutpostGenerationFilter?: OutpostGeneration;
  MaxResults?: number;
  NextToken?: string;
}
export const ListOrderableInstanceTypesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutpostGenerationFilter: S.optional(OutpostGeneration).pipe(
      T.HttpQuery("OutpostGenerationFilter"),
    ),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/instanceTypes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOrderableInstanceTypesInput",
}) as any as S.Schema<ListOrderableInstanceTypesInput>;
export type MemoryInMib = number;
export type NetworkPerformance = string;
export type FormFactor = "RACK" | "SERVER" | (string & {});
export const FormFactor = /*@__PURE__*/ S.String;

export interface FormFactorConfig {
  FormFactor?: FormFactor;
  OutpostGeneration?: OutpostGeneration;
}
export const FormFactorConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FormFactor: S.optional(FormFactor),
    OutpostGeneration: S.optional(OutpostGeneration),
  }),
).annotate({
  identifier: "FormFactorConfig",
}) as any as S.Schema<FormFactorConfig>;
export type FormFactorConfigList = FormFactorConfig[];
export const FormFactorConfigList = /*@__PURE__*/ S.Array(FormFactorConfig);
export interface DetailedInstanceTypeItem {
  InstanceType?: string;
  VCPUs?: number;
  MemoryInMib?: number;
  NetworkPerformance?: string;
  FormFactorConfigs?: FormFactorConfig[];
}
export const DetailedInstanceTypeItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceType: S.optional(S.String),
    VCPUs: S.optional(S.Number),
    MemoryInMib: S.optional(S.Number),
    NetworkPerformance: S.optional(S.String),
    FormFactorConfigs: S.optional(FormFactorConfigList),
  }),
).annotate({
  identifier: "DetailedInstanceTypeItem",
}) as any as S.Schema<DetailedInstanceTypeItem>;
export type DetailedInstanceTypeListDefinition = DetailedInstanceTypeItem[];
export const DetailedInstanceTypeListDefinition = /*@__PURE__*/ S.Array(
  DetailedInstanceTypeItem,
);
export interface ListOrderableInstanceTypesOutput {
  InstanceTypes?: DetailedInstanceTypeItem[];
  NextToken?: string;
}
export const ListOrderableInstanceTypesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceTypes: S.optional(DetailedInstanceTypeListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListOrderableInstanceTypesOutput",
}) as any as S.Schema<ListOrderableInstanceTypesOutput>;
export interface ListOrdersInput {
  OutpostIdentifierFilter?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListOrdersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutpostIdentifierFilter: S.optional(S.String).pipe(
      T.HttpQuery("OutpostIdentifierFilter"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/list-orders" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOrdersInput",
}) as any as S.Schema<ListOrdersInput>;
export type LineItemStatusCounts = { [key in LineItemStatus]?: number };
export const LineItemStatusCounts = /*@__PURE__*/ S.Record(
  LineItemStatus,
  S.Number.pipe(S.optional),
);
export interface OrderSummary {
  OutpostId?: string;
  OrderId?: string;
  OrderType?: OrderType;
  Status?: OrderStatus;
  LineItemCountsByStatus?: { [key: string]: number | undefined };
  OrderSubmissionDate?: Date;
  OrderFulfilledDate?: Date;
}
export const OrderSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutpostId: S.optional(S.String),
    OrderId: S.optional(S.String),
    OrderType: S.optional(OrderType),
    Status: S.optional(OrderStatus),
    LineItemCountsByStatus: S.optional(LineItemStatusCounts),
    OrderSubmissionDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    OrderFulfilledDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "OrderSummary" }) as any as S.Schema<OrderSummary>;
export type OrderSummaryListDefinition = OrderSummary[];
export const OrderSummaryListDefinition = /*@__PURE__*/ S.Array(OrderSummary);
export interface ListOrdersOutput {
  Orders?: OrderSummary[];
  NextToken?: string;
}
export const ListOrdersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Orders: S.optional(OrderSummaryListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListOrdersOutput",
}) as any as S.Schema<ListOrdersOutput>;
export type LifeCycleStatusList = string[];
export const LifeCycleStatusList = /*@__PURE__*/ S.Array(S.String);
export type AvailabilityZoneList = string[];
export const AvailabilityZoneList = /*@__PURE__*/ S.Array(S.String);
export type AvailabilityZoneIdList = string[];
export const AvailabilityZoneIdList = /*@__PURE__*/ S.Array(S.String);
export interface ListOutpostsInput {
  NextToken?: string;
  MaxResults?: number;
  LifeCycleStatusFilter?: string[];
  AvailabilityZoneFilter?: string[];
  AvailabilityZoneIdFilter?: string[];
}
export const ListOutpostsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    LifeCycleStatusFilter: S.optional(LifeCycleStatusList).pipe(
      T.HttpQuery("LifeCycleStatusFilter"),
    ),
    AvailabilityZoneFilter: S.optional(AvailabilityZoneList).pipe(
      T.HttpQuery("AvailabilityZoneFilter"),
    ),
    AvailabilityZoneIdFilter: S.optional(AvailabilityZoneIdList).pipe(
      T.HttpQuery("AvailabilityZoneIdFilter"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/outposts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOutpostsInput",
}) as any as S.Schema<ListOutpostsInput>;
export type OutpostListDefinition = Outpost[];
export const OutpostListDefinition = /*@__PURE__*/ S.Array(Outpost);
export interface ListOutpostsOutput {
  Outposts?: Outpost[];
  NextToken?: string;
}
export const ListOutpostsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Outposts: S.optional(OutpostListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListOutpostsOutput",
}) as any as S.Schema<ListOutpostsOutput>;
export interface ListQuotesInput {
  NextToken?: string;
  MaxResults?: number;
}
export const ListQuotesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/quotes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListQuotesInput",
}) as any as S.Schema<ListQuotesInput>;
export interface QuoteSummary {
  QuoteId?: string;
  AccountId?: string;
  QuoteStatus?: QuoteStatus;
  StatusMessage?: string;
  OutpostArn?: string;
  CountryCode?: string;
  RequestedCapacities?: QuoteCapacity[];
  RequestedConstraints?: QuoteConstraint[];
  RequestedPaymentOptions?: PaymentOption[];
  RequestedPaymentTerms?: PaymentTerm[];
  QuoteOptions?: QuoteOption[];
  SubmittedOrderId?: string;
  CreatedDate?: Date;
  ExpirationDate?: Date;
  Description?: string | redacted.Redacted<string>;
}
export const QuoteSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuoteId: S.optional(S.String),
    AccountId: S.optional(S.String),
    QuoteStatus: S.optional(QuoteStatus),
    StatusMessage: S.optional(S.String),
    OutpostArn: S.optional(S.String),
    CountryCode: S.optional(S.String),
    RequestedCapacities: S.optional(QuoteCapacityList),
    RequestedConstraints: S.optional(QuoteConstraintList),
    RequestedPaymentOptions: S.optional(PaymentOptionList),
    RequestedPaymentTerms: S.optional(PaymentTermList),
    QuoteOptions: S.optional(QuoteOptionList),
    SubmittedOrderId: S.optional(S.String),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ExpirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Description: S.optional(SensitiveString),
  }),
).annotate({ identifier: "QuoteSummary" }) as any as S.Schema<QuoteSummary>;
export type QuoteSummaryListDefinition = QuoteSummary[];
export const QuoteSummaryListDefinition = /*@__PURE__*/ S.Array(QuoteSummary);
export interface ListQuotesOutput {
  Quotes?: QuoteSummary[];
  NextToken?: string;
}
export const ListQuotesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Quotes: S.optional(QuoteSummaryListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListQuotesOutput",
}) as any as S.Schema<ListQuotesOutput>;
export type CountryCodeList = string[];
export const CountryCodeList = /*@__PURE__*/ S.Array(S.String);
export type StateOrRegionList = string[];
export const StateOrRegionList = /*@__PURE__*/ S.Array(S.String);
export type CityList = string[];
export const CityList = /*@__PURE__*/ S.Array(S.String);
export interface ListSitesInput {
  NextToken?: string;
  MaxResults?: number;
  OperatingAddressCountryCodeFilter?: string[];
  OperatingAddressStateOrRegionFilter?: string[];
  OperatingAddressCityFilter?: string[];
}
export const ListSitesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    OperatingAddressCountryCodeFilter: S.optional(CountryCodeList).pipe(
      T.HttpQuery("OperatingAddressCountryCodeFilter"),
    ),
    OperatingAddressStateOrRegionFilter: S.optional(StateOrRegionList).pipe(
      T.HttpQuery("OperatingAddressStateOrRegionFilter"),
    ),
    OperatingAddressCityFilter: S.optional(CityList).pipe(
      T.HttpQuery("OperatingAddressCityFilter"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sites" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "ListSitesInput" }) as any as S.Schema<ListSitesInput>;
export type SiteListDefinition = Site[];
export const SiteListDefinition = /*@__PURE__*/ S.Array(Site);
export interface ListSitesOutput {
  Sites?: Site[];
  NextToken?: string;
}
export const ListSitesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Sites: S.optional(SiteListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSitesOutput",
}) as any as S.Schema<ListSitesOutput>;
export type Arn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
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
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface StartCapacityTaskInput {
  OutpostIdentifier: string;
  OrderId?: string;
  AssetId?: string;
  InstancePools: InstanceTypeCapacity[];
  InstancesToExclude?: InstancesToExclude;
  DryRun?: boolean;
  TaskActionOnBlockingInstances?: TaskActionOnBlockingInstances;
}
export const StartCapacityTaskInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutpostIdentifier: S.String.pipe(T.HttpLabel("OutpostIdentifier")),
    OrderId: S.optional(S.String),
    AssetId: S.optional(S.String),
    InstancePools: RequestedInstancePools,
    InstancesToExclude: S.optional(InstancesToExclude),
    DryRun: S.optional(S.Boolean),
    TaskActionOnBlockingInstances: S.optional(TaskActionOnBlockingInstances),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/outposts/{OutpostIdentifier}/capacity" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartCapacityTaskInput",
}) as any as S.Schema<StartCapacityTaskInput>;
export interface StartCapacityTaskOutput {
  CapacityTaskId?: string;
  OutpostId?: string;
  OrderId?: string;
  AssetId?: string;
  RequestedInstancePools?: InstanceTypeCapacity[];
  InstancesToExclude?: InstancesToExclude;
  DryRun?: boolean;
  CapacityTaskStatus?: CapacityTaskStatus;
  Failed?: CapacityTaskFailure;
  CreationDate?: Date;
  CompletionDate?: Date;
  LastModifiedDate?: Date;
  TaskActionOnBlockingInstances?: TaskActionOnBlockingInstances;
}
export const StartCapacityTaskOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CapacityTaskId: S.optional(S.String),
    OutpostId: S.optional(S.String),
    OrderId: S.optional(S.String),
    AssetId: S.optional(S.String),
    RequestedInstancePools: S.optional(RequestedInstancePools),
    InstancesToExclude: S.optional(InstancesToExclude),
    DryRun: S.optional(S.Boolean),
    CapacityTaskStatus: S.optional(CapacityTaskStatus),
    Failed: S.optional(CapacityTaskFailure),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TaskActionOnBlockingInstances: S.optional(TaskActionOnBlockingInstances),
  }),
).annotate({
  identifier: "StartCapacityTaskOutput",
}) as any as S.Schema<StartCapacityTaskOutput>;
export type DeviceSerialNumber = string;
export type NetworkInterfaceDeviceIndex = number;
export interface StartConnectionRequest {
  DeviceSerialNumber?: string;
  AssetId: string;
  ClientPublicKey: string;
  NetworkInterfaceDeviceIndex: number;
}
export const StartConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceSerialNumber: S.optional(S.String),
    AssetId: S.String,
    ClientPublicKey: S.String,
    NetworkInterfaceDeviceIndex: S.Number,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/connections" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartConnectionRequest",
}) as any as S.Schema<StartConnectionRequest>;
export type UnderlayIpAddress = string;
export interface StartConnectionResponse {
  ConnectionId?: string;
  UnderlayIpAddress?: string;
}
export const StartConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionId: S.optional(S.String),
    UnderlayIpAddress: S.optional(S.String),
  }),
).annotate({
  identifier: "StartConnectionResponse",
}) as any as S.Schema<StartConnectionResponse>;
export type ValidateOnly = boolean;
export interface StartOutpostDecommissionInput {
  OutpostIdentifier: string;
  ValidateOnly?: boolean;
}
export const StartOutpostDecommissionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutpostIdentifier: S.String.pipe(T.HttpLabel("OutpostIdentifier")),
    ValidateOnly: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/outposts/{OutpostIdentifier}/decommission",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartOutpostDecommissionInput",
}) as any as S.Schema<StartOutpostDecommissionInput>;
export type DecommissionRequestStatus =
  | "SKIPPED"
  | "BLOCKED"
  | "REQUESTED"
  | (string & {});
export const DecommissionRequestStatus = /*@__PURE__*/ S.String;

export type BlockingResourceType =
  | "EC2_INSTANCE"
  | "OUTPOST_RAM_SHARE"
  | "LGW_ROUTING_DOMAIN"
  | "LGW_ROUTE_TABLE"
  | "LGW_VIRTUAL_INTERFACE_GROUP"
  | "OUTPOST_ORDER_CANCELLABLE"
  | "OUTPOST_ORDER_INTERVENTION_REQUIRED"
  | (string & {});
export const BlockingResourceType = /*@__PURE__*/ S.String;

export type BlockingResourceTypeList = BlockingResourceType[];
export const BlockingResourceTypeList =
  /*@__PURE__*/ S.Array(BlockingResourceType);
export interface StartOutpostDecommissionOutput {
  Status?: DecommissionRequestStatus;
  BlockingResourceTypes?: BlockingResourceType[];
}
export const StartOutpostDecommissionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(DecommissionRequestStatus),
    BlockingResourceTypes: S.optional(BlockingResourceTypeList),
  }),
).annotate({
  identifier: "StartOutpostDecommissionOutput",
}) as any as S.Schema<StartOutpostDecommissionOutput>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: TagMap,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
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
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
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
export interface UpdateOutpostInput {
  OutpostId: string;
  Name?: string;
  Description?: string;
  SupportedHardwareType?: SupportedHardwareType;
}
export const UpdateOutpostInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutpostId: S.String.pipe(T.HttpLabel("OutpostId")),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    SupportedHardwareType: S.optional(SupportedHardwareType),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/outposts/{OutpostId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateOutpostInput",
}) as any as S.Schema<UpdateOutpostInput>;
export interface UpdateOutpostOutput {
  Outpost?: Outpost;
}
export const UpdateOutpostOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Outpost: S.optional(Outpost) }),
).annotate({
  identifier: "UpdateOutpostOutput",
}) as any as S.Schema<UpdateOutpostOutput>;
export type OutpostIdentifierOrEmpty = string;
export interface UpdateQuoteInput {
  QuoteIdentifier: string;
  OutpostIdentifier?: string;
  CountryCode?: string;
  RequestedCapacities?: QuoteCapacity[];
  RequestedConstraints?: QuoteConstraint[];
  RequestedPaymentOptions?: PaymentOption[];
  RequestedPaymentTerms?: PaymentTerm[];
  Description?: string | redacted.Redacted<string>;
}
export const UpdateQuoteInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuoteIdentifier: S.String.pipe(T.HttpLabel("QuoteIdentifier")),
    OutpostIdentifier: S.optional(S.String),
    CountryCode: S.optional(S.String),
    RequestedCapacities: S.optional(QuoteCapacityList),
    RequestedConstraints: S.optional(QuoteConstraintList),
    RequestedPaymentOptions: S.optional(PaymentOptionList),
    RequestedPaymentTerms: S.optional(PaymentTermList),
    Description: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/quotes/{QuoteIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateQuoteInput",
}) as any as S.Schema<UpdateQuoteInput>;
export interface UpdateQuoteOutput {
  Quote?: Quote;
}
export const UpdateQuoteOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Quote: S.optional(Quote) }),
).annotate({
  identifier: "UpdateQuoteOutput",
}) as any as S.Schema<UpdateQuoteOutput>;
export interface UpdateSiteInput {
  SiteId: string;
  Name?: string;
  Description?: string;
  Notes?: string;
}
export const UpdateSiteInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SiteId: S.String.pipe(T.HttpLabel("SiteId")),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Notes: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/sites/{SiteId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSiteInput",
}) as any as S.Schema<UpdateSiteInput>;
export interface UpdateSiteOutput {
  Site?: Site;
}
export const UpdateSiteOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Site: S.optional(Site) }),
).annotate({
  identifier: "UpdateSiteOutput",
}) as any as S.Schema<UpdateSiteOutput>;
export interface UpdateSiteAddressInput {
  SiteId: string;
  AddressType: AddressType;
  Address: Address;
}
export const UpdateSiteAddressInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SiteId: S.String.pipe(T.HttpLabel("SiteId")),
    AddressType: AddressType,
    Address: Address,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/sites/{SiteId}/address" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSiteAddressInput",
}) as any as S.Schema<UpdateSiteAddressInput>;
export interface UpdateSiteAddressOutput {
  AddressType?: AddressType;
  Address?: Address;
}
export const UpdateSiteAddressOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AddressType: S.optional(AddressType),
    Address: S.optional(Address),
  }),
).annotate({
  identifier: "UpdateSiteAddressOutput",
}) as any as S.Schema<UpdateSiteAddressOutput>;
export interface UpdateSiteRackPhysicalPropertiesInput {
  SiteId: string;
  PowerDrawKva?: PowerDrawKva;
  PowerPhase?: PowerPhase;
  PowerConnector?: PowerConnector;
  PowerFeedDrop?: PowerFeedDrop;
  UplinkGbps?: UplinkGbps;
  UplinkCount?: UplinkCount;
  FiberOpticCableType?: FiberOpticCableType;
  OpticalStandard?: OpticalStandard;
  MaximumSupportedWeightLbs?: MaximumSupportedWeightLbs;
}
export const UpdateSiteRackPhysicalPropertiesInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SiteId: S.String.pipe(T.HttpLabel("SiteId")),
      PowerDrawKva: S.optional(PowerDrawKva),
      PowerPhase: S.optional(PowerPhase),
      PowerConnector: S.optional(PowerConnector),
      PowerFeedDrop: S.optional(PowerFeedDrop),
      UplinkGbps: S.optional(UplinkGbps),
      UplinkCount: S.optional(UplinkCount),
      FiberOpticCableType: S.optional(FiberOpticCableType),
      OpticalStandard: S.optional(OpticalStandard),
      MaximumSupportedWeightLbs: S.optional(MaximumSupportedWeightLbs),
    }).pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/sites/{SiteId}/rackPhysicalProperties",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateSiteRackPhysicalPropertiesInput",
}) as any as S.Schema<UpdateSiteRackPhysicalPropertiesInput>;
export interface UpdateSiteRackPhysicalPropertiesOutput {
  Site?: Site;
}
export const UpdateSiteRackPhysicalPropertiesOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Site: S.optional(Site) }),
).annotate({
  identifier: "UpdateSiteRackPhysicalPropertiesOutput",
}) as any as S.Schema<UpdateSiteRackPhysicalPropertiesOutput>;
export type ErrorMessage = string;
export type ResourceType = "OUTPOST" | "ORDER" | (string & {});
export const ResourceType = /*@__PURE__*/ S.String;

export type CancelCapacityTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Cancels the capacity task.
 */
export const cancelCapacityTask: API.OperationMethod<
  CancelCapacityTaskInput,
  CancelCapacityTaskOutput,
  CancelCapacityTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelCapacityTaskInput,
  output: CancelCapacityTaskOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelCapacityTask",
}));

export type CancelOrderError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Cancels the specified order for an Outpost.
 */
export const cancelOrder: API.OperationMethod<
  CancelOrderInput,
  CancelOrderOutput,
  CancelOrderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelOrderInput,
  output: CancelOrderOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelOrder",
}));

export type CreateOrderError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an order for an Outpost.
 */
export const createOrder: API.OperationMethod<
  CreateOrderInput,
  CreateOrderOutput,
  CreateOrderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateOrderInput,
  output: CreateOrderOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOrder",
}));

export type CreateOutpostError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Outpost.
 *
 * You can specify either an Availability one or an AZ ID.
 */
export const createOutpost: API.OperationMethod<
  CreateOutpostInput,
  CreateOutpostOutput,
  CreateOutpostError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateOutpostInput,
  output: CreateOutpostOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOutpost",
}));

export type CreateQuoteError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a quote for an Outpost. A quote provides pricing and configuration options based
 * on the requested capacity. You can optionally associate the quote with an existing Outpost or
 * create a standalone quote by specifying only the country code and requested capacities.
 */
export const createQuote: API.OperationMethod<
  CreateQuoteInput,
  CreateQuoteOutput,
  CreateQuoteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateQuoteInput,
  output: CreateQuoteOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQuote",
}));

export type CreateRenewalError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a renewal contract for the specified Outpost.
 */
export const createRenewal: API.OperationMethod<
  CreateRenewalInput,
  CreateRenewalOutput,
  CreateRenewalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRenewalInput,
  output: CreateRenewalOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRenewal",
}));

export type CreateSiteError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a site for an Outpost.
 */
export const createSite: API.OperationMethod<
  CreateSiteInput,
  CreateSiteOutput,
  CreateSiteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSiteInput,
  output: CreateSiteOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSite",
}));

export type DeleteOutpostError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified Outpost.
 */
export const deleteOutpost: API.OperationMethod<
  DeleteOutpostInput,
  DeleteOutpostOutput,
  DeleteOutpostError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteOutpostInput,
  output: DeleteOutpostOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOutpost",
}));

export type DeleteQuoteError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified quote.
 */
export const deleteQuote: API.OperationMethod<
  DeleteQuoteInput,
  DeleteQuoteOutput,
  DeleteQuoteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteQuoteInput,
  output: DeleteQuoteOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQuote",
}));

export type DeleteSiteError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified site.
 */
export const deleteSite: API.OperationMethod<
  DeleteSiteInput,
  DeleteSiteOutput,
  DeleteSiteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSiteInput,
  output: DeleteSiteOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSite",
}));

export type GetCapacityTaskError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets details of the specified capacity task.
 */
export const getCapacityTask: API.OperationMethod<
  GetCapacityTaskInput,
  GetCapacityTaskOutput,
  GetCapacityTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCapacityTaskInput,
  output: GetCapacityTaskOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCapacityTask",
}));

export type GetCatalogItemError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified catalog item.
 */
export const getCatalogItem: API.OperationMethod<
  GetCatalogItemInput,
  GetCatalogItemOutput,
  GetCatalogItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCatalogItemInput,
  output: GetCatalogItemOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCatalogItem",
}));

export type GetConnectionError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services uses this action to install Outpost servers.
 *
 * Gets information about the specified connection.
 *
 * Use CloudTrail to monitor this action or Amazon Web Services managed policy for Amazon Web Services Outposts to secure it. For
 * more information, see
 * Amazon Web Services managed policies for Amazon Web Services Outposts and
 * Logging Amazon Web Services Outposts API calls with Amazon Web Services CloudTrail in the *Amazon Web Services Outposts User Guide*.
 */
export const getConnection: API.OperationMethod<
  GetConnectionRequest,
  GetConnectionResponse,
  GetConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConnectionRequest,
  output: GetConnectionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnection",
}));

export type GetOrderError =
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified order.
 */
export const getOrder: API.OperationMethod<
  GetOrderInput,
  GetOrderOutput,
  GetOrderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOrderInput,
  output: GetOrderOutput,
  errors: [InternalServerException, NotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOrder",
}));

export type GetOutpostError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified Outpost.
 */
export const getOutpost: API.OperationMethod<
  GetOutpostInput,
  GetOutpostOutput,
  GetOutpostError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOutpostInput,
  output: GetOutpostOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOutpost",
}));

export type GetOutpostBillingInformationError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | CommonErrors;
/**
 * Gets current and historical billing information about the specified Outpost.
 */
export const getOutpostBillingInformation: API.PaginatedOperationMethod<
  GetOutpostBillingInformationInput,
  GetOutpostBillingInformationOutput,
  GetOutpostBillingInformationError,
  Credentials | HttpClient.HttpClient,
  Subscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetOutpostBillingInformationInput,
  output: GetOutpostBillingInformationOutput,
  errors: [AccessDeniedException, InternalServerException, NotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOutpostBillingInformation",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Subscriptions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetOutpostInstanceTypesError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the instance types for the specified Outpost.
 */
export const getOutpostInstanceTypes: API.PaginatedOperationMethod<
  GetOutpostInstanceTypesInput,
  GetOutpostInstanceTypesOutput,
  GetOutpostInstanceTypesError,
  Credentials | HttpClient.HttpClient,
  InstanceTypeItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetOutpostInstanceTypesInput,
  output: GetOutpostInstanceTypesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOutpostInstanceTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstanceTypes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetOutpostSupportedInstanceTypesError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the instance types that an Outpost can support in `InstanceTypeCapacity`.
 * This will generally include instance types that are not currently configured and therefore
 * cannot be launched with the current Outpost capacity configuration.
 */
export const getOutpostSupportedInstanceTypes: API.PaginatedOperationMethod<
  GetOutpostSupportedInstanceTypesInput,
  GetOutpostSupportedInstanceTypesOutput,
  GetOutpostSupportedInstanceTypesError,
  Credentials | HttpClient.HttpClient,
  InstanceTypeItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetOutpostSupportedInstanceTypesInput,
  output: GetOutpostSupportedInstanceTypesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOutpostSupportedInstanceTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstanceTypes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetQuoteError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified quote.
 */
export const getQuote: API.OperationMethod<
  GetQuoteInput,
  GetQuoteOutput,
  GetQuoteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQuoteInput,
  output: GetQuoteOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQuote",
}));

export type GetRenewalPricingError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets all available renewal pricing options for the specified Outpost.
 */
export const getRenewalPricing: API.OperationMethod<
  GetRenewalPricingInput,
  GetRenewalPricingOutput,
  GetRenewalPricingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRenewalPricingInput,
  output: GetRenewalPricingOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRenewalPricing",
}));

export type GetSiteError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified Outpost site.
 */
export const getSite: API.OperationMethod<
  GetSiteInput,
  GetSiteOutput,
  GetSiteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSiteInput,
  output: GetSiteOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSite",
}));

export type GetSiteAddressError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets the site address of the specified site.
 */
export const getSiteAddress: API.OperationMethod<
  GetSiteAddressInput,
  GetSiteAddressOutput,
  GetSiteAddressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSiteAddressInput,
  output: GetSiteAddressOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSiteAddress",
}));

export type ListAssetInstancesError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * A list of Amazon EC2 instances, belonging to all accounts, running on the specified Outpost.
 * Does not include Amazon EBS or Amazon S3 instances.
 */
export const listAssetInstances: API.PaginatedOperationMethod<
  ListAssetInstancesInput,
  ListAssetInstancesOutput,
  ListAssetInstancesError,
  Credentials | HttpClient.HttpClient,
  AssetInstance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssetInstancesInput,
  output: ListAssetInstancesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AssetInstances",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAssetsError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the hardware assets for the specified Outpost.
 *
 * Use filters to return specific results. If you specify multiple filters, the results include only the resources that match
 * all of the specified filters. For a filter where you can specify multiple values, the results include
 * items that match any of the values that you specify for the filter.
 */
export const listAssets: API.PaginatedOperationMethod<
  ListAssetsInput,
  ListAssetsOutput,
  ListAssetsError,
  Credentials | HttpClient.HttpClient,
  AssetInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssetsInput,
  output: ListAssetsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Assets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBlockingInstancesForCapacityTaskError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * A list of Amazon EC2 instances running on the Outpost and belonging to the account that
 * initiated the capacity task. Use this list to specify the instances you cannot stop to free up
 * capacity to run the capacity task.
 */
export const listBlockingInstancesForCapacityTask: API.PaginatedOperationMethod<
  ListBlockingInstancesForCapacityTaskInput,
  ListBlockingInstancesForCapacityTaskOutput,
  ListBlockingInstancesForCapacityTaskError,
  Credentials | HttpClient.HttpClient,
  BlockingInstance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBlockingInstancesForCapacityTaskInput,
  output: ListBlockingInstancesForCapacityTaskOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBlockingInstancesForCapacityTask",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BlockingInstances",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCapacityTasksError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the capacity tasks for your Amazon Web Services account.
 *
 * Use filters to return specific results. If you specify multiple filters, the results include only the resources that match
 * all of the specified filters. For a filter where you can specify multiple values, the results include
 * items that match any of the values that you specify for the filter.
 */
export const listCapacityTasks: API.PaginatedOperationMethod<
  ListCapacityTasksInput,
  ListCapacityTasksOutput,
  ListCapacityTasksError,
  Credentials | HttpClient.HttpClient,
  CapacityTaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCapacityTasksInput,
  output: ListCapacityTasksOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCapacityTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CapacityTasks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCatalogItemsError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the items in the catalog.
 *
 * Use filters to return specific results. If you specify multiple filters, the results include only the resources that match
 * all of the specified filters. For a filter where you can specify multiple values, the results include
 * items that match any of the values that you specify for the filter.
 */
export const listCatalogItems: API.PaginatedOperationMethod<
  ListCatalogItemsInput,
  ListCatalogItemsOutput,
  ListCatalogItemsError,
  Credentials | HttpClient.HttpClient,
  CatalogItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCatalogItemsInput,
  output: ListCatalogItemsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCatalogItems",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CatalogItems",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOrderableInstanceTypesError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the instance types that can be ordered for an Outpost. You can filter the results
 * by Outpost generation.
 */
export const listOrderableInstanceTypes: API.PaginatedOperationMethod<
  ListOrderableInstanceTypesInput,
  ListOrderableInstanceTypesOutput,
  ListOrderableInstanceTypesError,
  Credentials | HttpClient.HttpClient,
  DetailedInstanceTypeItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOrderableInstanceTypesInput,
  output: ListOrderableInstanceTypesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrderableInstanceTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstanceTypes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOrdersError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Outpost orders for your Amazon Web Services account.
 */
export const listOrders: API.PaginatedOperationMethod<
  ListOrdersInput,
  ListOrdersOutput,
  ListOrdersError,
  Credentials | HttpClient.HttpClient,
  OrderSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOrdersInput,
  output: ListOrdersOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrders",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Orders",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOutpostsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Outposts for your Amazon Web Services account.
 *
 * Use filters to return specific results. If you specify multiple filters, the results include only the resources that match
 * all of the specified filters. For a filter where you can specify multiple values, the results include
 * items that match any of the values that you specify for the filter.
 */
export const listOutposts: API.PaginatedOperationMethod<
  ListOutpostsInput,
  ListOutpostsOutput,
  ListOutpostsError,
  Credentials | HttpClient.HttpClient,
  Outpost
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOutpostsInput,
  output: ListOutpostsOutput,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOutposts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Outposts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListQuotesError =
  | AccessDeniedException
  | InternalServerException
  | CommonErrors;
/**
 * Lists the quotes for your Amazon Web Services account.
 */
export const listQuotes: API.PaginatedOperationMethod<
  ListQuotesInput,
  ListQuotesOutput,
  ListQuotesError,
  Credentials | HttpClient.HttpClient,
  QuoteSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListQuotesInput,
  output: ListQuotesOutput,
  errors: [AccessDeniedException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQuotes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Quotes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSitesError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Outpost sites for your Amazon Web Services account. Use filters to return specific
 * results.
 *
 * Use filters to return specific results. If you specify multiple filters, the results include only the resources that match
 * all of the specified filters. For a filter where you can specify multiple values, the results include
 * items that match any of the values that you specify for the filter.
 */
export const listSites: API.PaginatedOperationMethod<
  ListSitesInput,
  ListSitesOutput,
  ListSitesError,
  Credentials | HttpClient.HttpClient,
  Site
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSitesInput,
  output: ListSitesOutput,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSites",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Sites",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | NotFoundException
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
  errors: [InternalServerException, NotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartCapacityTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Starts the specified capacity task. You can have one active capacity task for each order
 * and each Outpost.
 */
export const startCapacityTask: API.OperationMethod<
  StartCapacityTaskInput,
  StartCapacityTaskOutput,
  StartCapacityTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartCapacityTaskInput,
  output: StartCapacityTaskOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCapacityTask",
}));

export type StartConnectionError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Web Services uses this action to install Outpost servers.
 *
 * Starts the connection required for Outpost server installation.
 *
 * Use CloudTrail to monitor this action or Amazon Web Services managed policy for Amazon Web Services Outposts to secure it. For
 * more information, see
 * Amazon Web Services managed policies for Amazon Web Services Outposts and
 * Logging Amazon Web Services Outposts API calls with Amazon Web Services CloudTrail in the *Amazon Web Services Outposts User Guide*.
 */
export const startConnection: API.OperationMethod<
  StartConnectionRequest,
  StartConnectionResponse,
  StartConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartConnectionRequest,
  output: StartConnectionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartConnection",
}));

export type StartOutpostDecommissionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Starts the decommission process to return the Outposts racks or servers.
 */
export const startOutpostDecommission: API.OperationMethod<
  StartOutpostDecommissionInput,
  StartOutpostDecommissionOutput,
  StartOutpostDecommissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartOutpostDecommissionInput,
  output: StartOutpostDecommissionOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartOutpostDecommission",
}));

export type TagResourceError =
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds tags to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [InternalServerException, NotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [InternalServerException, NotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateOutpostError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an Outpost.
 */
export const updateOutpost: API.OperationMethod<
  UpdateOutpostInput,
  UpdateOutpostOutput,
  UpdateOutpostError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateOutpostInput,
  output: UpdateOutpostOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOutpost",
}));

export type UpdateQuoteError =
  | AccessDeniedException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified quote. You can modify the requested capacities, constraints,
 * payment options, payment terms, or Outpost association.
 */
export const updateQuote: API.OperationMethod<
  UpdateQuoteInput,
  UpdateQuoteOutput,
  UpdateQuoteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateQuoteInput,
  output: UpdateQuoteOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQuote",
}));

export type UpdateSiteError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified site.
 */
export const updateSite: API.OperationMethod<
  UpdateSiteInput,
  UpdateSiteOutput,
  UpdateSiteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSiteInput,
  output: UpdateSiteOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSite",
}));

export type UpdateSiteAddressError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the address of the specified site.
 *
 * You can't update a site address if there is an order in progress. You must wait for the
 * order to complete or cancel the order.
 *
 * You can update the operating address before you place an order at the site, or after all
 * Outposts that belong to the site have been deactivated.
 */
export const updateSiteAddress: API.OperationMethod<
  UpdateSiteAddressInput,
  UpdateSiteAddressOutput,
  UpdateSiteAddressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSiteAddressInput,
  output: UpdateSiteAddressOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSiteAddress",
}));

export type UpdateSiteRackPhysicalPropertiesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | NotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Update the physical and logistical details for a rack at a site. For more information
 * about hardware requirements for racks, see Network
 * readiness checklist in the Amazon Web Services Outposts User Guide.
 *
 * To update a rack at a site with an order of `IN_PROGRESS`, you must wait for
 * the order to complete or cancel the order.
 */
export const updateSiteRackPhysicalProperties: API.OperationMethod<
  UpdateSiteRackPhysicalPropertiesInput,
  UpdateSiteRackPhysicalPropertiesOutput,
  UpdateSiteRackPhysicalPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSiteRackPhysicalPropertiesInput,
  output: UpdateSiteRackPhysicalPropertiesOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    NotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSiteRackPhysicalProperties",
}));
