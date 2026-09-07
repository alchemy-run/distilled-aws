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
  sdkId: "Marketplace Discovery",
  serviceShapeName: "AWSMarketplaceDiscovery",
});
const auth = T.AwsAuthSigv4({ name: "aws-marketplace" });
const ver = T.ServiceVersion("2026-02-05");
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
            `https://discovery-marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://discovery-marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export type ListingId = string;
export interface GetListingInput {
  listingId: string;
}
export const GetListingInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ listingId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2026-02-05/getListing" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetListingInput",
}) as any as S.Schema<GetListingInput>;
export type ProductId = string;
export type NonEmptyString = string;
export type SellerProfileId = string;
export interface SellerInformation {
  sellerProfileId: string;
  displayName: string;
}
export const SellerInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sellerProfileId: S.String, displayName: S.String }),
).annotate({
  identifier: "SellerInformation",
}) as any as S.Schema<SellerInformation>;
export interface ProductInformation {
  productId: string;
  productName: string;
  manufacturer: SellerInformation;
}
export const ProductInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    productId: S.String,
    productName: S.String,
    manufacturer: SellerInformation,
  }),
).annotate({
  identifier: "ProductInformation",
}) as any as S.Schema<ProductInformation>;
export type OfferId = string;
export type NullableString = string;
export interface OfferInformation {
  offerId: string;
  offerName?: string;
  sellerOfRecord: SellerInformation;
}
export const OfferInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    offerId: S.String,
    offerName: S.optional(S.String),
    sellerOfRecord: SellerInformation,
  }),
).annotate({
  identifier: "OfferInformation",
}) as any as S.Schema<OfferInformation>;
export interface ListingAssociatedEntity {
  product?: ProductInformation;
  offer?: OfferInformation;
}
export const ListingAssociatedEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    product: S.optional(ProductInformation),
    offer: S.optional(OfferInformation),
  }),
).annotate({
  identifier: "ListingAssociatedEntity",
}) as any as S.Schema<ListingAssociatedEntity>;
export type ListingAssociatedEntityList = ListingAssociatedEntity[];
export const ListingAssociatedEntityList = /*@__PURE__*/ S.Array(
  ListingAssociatedEntity,
);
export type ListingBadgeType =
  | "AWS_FREE_TIER"
  | "FREE_TRIAL"
  | "DEPLOYED_ON_AWS"
  | "QUICK_LAUNCH"
  | "MULTI_PRODUCT"
  | (string & {});
export const ListingBadgeType = /*@__PURE__*/ S.String;

export interface ListingBadge {
  displayName: string;
  badgeType: ListingBadgeType;
}
export const ListingBadge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ displayName: S.String, badgeType: ListingBadgeType }),
).annotate({ identifier: "ListingBadge" }) as any as S.Schema<ListingBadge>;
export type ListingBadgeList = ListingBadge[];
export const ListingBadgeList = /*@__PURE__*/ S.Array(ListingBadge);
export type Catalog = string;
export interface Category {
  categoryId: string;
  displayName: string;
}
export const Category = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ categoryId: S.String, displayName: S.String }),
).annotate({ identifier: "Category" }) as any as S.Schema<Category>;
export type CategoryList = Category[];
export const CategoryList = /*@__PURE__*/ S.Array(Category);
export type FulfillmentOptionType =
  | "AMAZON_MACHINE_IMAGE"
  | "API"
  | "CLOUDFORMATION_TEMPLATE"
  | "CONTAINER"
  | "HELM"
  | "EKS_ADD_ON"
  | "EC2_IMAGE_BUILDER_COMPONENT"
  | "DATA_EXCHANGE"
  | "PROFESSIONAL_SERVICES"
  | "SAAS"
  | "SAGEMAKER_ALGORITHM"
  | "SAGEMAKER_MODEL"
  | (string & {});
export const FulfillmentOptionType = /*@__PURE__*/ S.String;

export interface FulfillmentOptionSummary {
  fulfillmentOptionType: FulfillmentOptionType;
  displayName: string;
}
export const FulfillmentOptionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fulfillmentOptionType: FulfillmentOptionType,
    displayName: S.String,
  }),
).annotate({
  identifier: "FulfillmentOptionSummary",
}) as any as S.Schema<FulfillmentOptionSummary>;
export type FulfillmentOptionSummaryList = FulfillmentOptionSummary[];
export const FulfillmentOptionSummaryList = /*@__PURE__*/ S.Array(
  FulfillmentOptionSummary,
);
export type HighlightList = string[];
export const HighlightList = /*@__PURE__*/ S.Array(S.String);
export type URL = string;
export type PricingModelType =
  | "USAGE"
  | "CONTRACT"
  | "BYOL"
  | "FREE"
  | (string & {});
export const PricingModelType = /*@__PURE__*/ S.String;

export interface PricingModel {
  pricingModelType: PricingModelType;
  displayName: string;
}
export const PricingModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pricingModelType: PricingModelType, displayName: S.String }),
).annotate({ identifier: "PricingModel" }) as any as S.Schema<PricingModel>;
export type PricingModelList = PricingModel[];
export const PricingModelList = /*@__PURE__*/ S.Array(PricingModel);
export type PricingUnitType =
  | "USERS"
  | "HOSTS"
  | "BANDWIDTH"
  | "DATA"
  | "TIERS"
  | "REQUESTS"
  | "UNITS"
  | (string & {});
export const PricingUnitType = /*@__PURE__*/ S.String;

export interface PricingUnit {
  pricingUnitType: PricingUnitType;
  displayName: string;
}
export const PricingUnit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pricingUnitType: PricingUnitType, displayName: S.String }),
).annotate({ identifier: "PricingUnit" }) as any as S.Schema<PricingUnit>;
export type PricingUnitList = PricingUnit[];
export const PricingUnitList = /*@__PURE__*/ S.Array(PricingUnit);
export interface PromotionalEmbeddedImage {
  title: string;
  url: string;
  description?: string;
}
export const PromotionalEmbeddedImage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.String,
    url: S.String,
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "PromotionalEmbeddedImage",
}) as any as S.Schema<PromotionalEmbeddedImage>;
export interface PromotionalEmbeddedVideo {
  title: string;
  url: string;
  preview: string;
  thumbnail: string;
  description?: string;
}
export const PromotionalEmbeddedVideo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.String,
    url: S.String,
    preview: S.String,
    thumbnail: S.String,
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "PromotionalEmbeddedVideo",
}) as any as S.Schema<PromotionalEmbeddedVideo>;
export type PromotionalMedia =
  | { embeddedImage: PromotionalEmbeddedImage; embeddedVideo?: never }
  | { embeddedImage?: never; embeddedVideo: PromotionalEmbeddedVideo };
export const PromotionalMedia = /*@__PURE__*/ S.Union([
  S.Struct({ embeddedImage: PromotionalEmbeddedImage }),
  S.Struct({ embeddedVideo: PromotionalEmbeddedVideo }),
]);
export type PromotionalMediaList = PromotionalMedia[];
export const PromotionalMediaList = /*@__PURE__*/ S.Array(PromotionalMedia);
export type ResourceType =
  | "MANUFACTURER_SUPPORT"
  | "MANUFACTURER_INSTRUCTIONS"
  | (string & {});
export const ResourceType = /*@__PURE__*/ S.String;

export type ResourceContentType =
  | "EMAIL"
  | "PHONE_NUMBER"
  | "LINK"
  | "OTHER"
  | (string & {});
export const ResourceContentType = /*@__PURE__*/ S.String;

export interface Resource {
  resourceType: ResourceType;
  contentType: ResourceContentType;
  value: string;
  displayName?: string;
}
export const Resource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: ResourceType,
    contentType: ResourceContentType,
    value: S.String,
    displayName: S.optional(S.String),
  }),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export type ResourceList = Resource[];
export const ResourceList = /*@__PURE__*/ S.Array(Resource);
export type ReviewSourceId = "AWS_MARKETPLACE" | (string & {});
export const ReviewSourceId = /*@__PURE__*/ S.String;

export type NonNegativeCount = number;
export interface ReviewSourceSummary {
  sourceName: string;
  sourceId: ReviewSourceId;
  sourceUrl?: string;
  averageRating: string;
  totalReviews: number;
}
export const ReviewSourceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceName: S.String,
    sourceId: ReviewSourceId,
    sourceUrl: S.optional(S.String),
    averageRating: S.String,
    totalReviews: S.Number,
  }),
).annotate({
  identifier: "ReviewSourceSummary",
}) as any as S.Schema<ReviewSourceSummary>;
export type ReviewSourceSummaryList = ReviewSourceSummary[];
export const ReviewSourceSummaryList =
  /*@__PURE__*/ S.Array(ReviewSourceSummary);
export interface ReviewSummary {
  reviewSourceSummaries: ReviewSourceSummary[];
}
export const ReviewSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reviewSourceSummaries: ReviewSourceSummaryList }),
).annotate({ identifier: "ReviewSummary" }) as any as S.Schema<ReviewSummary>;
export type SellerEngagementType =
  | "REQUEST_FOR_PRIVATE_OFFER"
  | "REQUEST_FOR_DEMO"
  | (string & {});
export const SellerEngagementType = /*@__PURE__*/ S.String;

export type SellerEngagementContentType = "LINK" | (string & {});
export const SellerEngagementContentType = /*@__PURE__*/ S.String;

export interface SellerEngagement {
  engagementType: SellerEngagementType;
  contentType: SellerEngagementContentType;
  value: string;
}
export const SellerEngagement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    engagementType: SellerEngagementType,
    contentType: SellerEngagementContentType,
    value: S.String,
  }),
).annotate({
  identifier: "SellerEngagement",
}) as any as S.Schema<SellerEngagement>;
export type SellerEngagementList = SellerEngagement[];
export const SellerEngagementList = /*@__PURE__*/ S.Array(SellerEngagement);
export interface UseCase {
  description: string;
  displayName: string;
  value: string;
}
export const UseCase = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ description: S.String, displayName: S.String, value: S.String }),
).annotate({ identifier: "UseCase" }) as any as S.Schema<UseCase>;
export interface UseCaseEntry {
  useCase: UseCase;
}
export const UseCaseEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ useCase: UseCase }),
).annotate({ identifier: "UseCaseEntry" }) as any as S.Schema<UseCaseEntry>;
export type UseCaseList = UseCaseEntry[];
export const UseCaseList = /*@__PURE__*/ S.Array(UseCaseEntry);
export interface GetListingOutput {
  associatedEntities: ListingAssociatedEntity[];
  badges: ListingBadge[];
  catalog: string;
  categories: Category[];
  fulfillmentOptionSummaries: FulfillmentOptionSummary[];
  highlights: string[];
  integrationGuide?: string;
  listingId: string;
  listingName: string;
  logoThumbnailUrl: string;
  longDescription: string;
  pricingModels: PricingModel[];
  pricingUnits: PricingUnit[];
  promotionalMedia: PromotionalMedia[];
  publisher: SellerInformation;
  resources: Resource[];
  reviewSummary?: ReviewSummary;
  sellerEngagements: SellerEngagement[];
  shortDescription: string;
  useCases: UseCaseEntry[];
}
export const GetListingOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    associatedEntities: ListingAssociatedEntityList,
    badges: ListingBadgeList,
    catalog: S.String,
    categories: CategoryList,
    fulfillmentOptionSummaries: FulfillmentOptionSummaryList,
    highlights: HighlightList,
    integrationGuide: S.optional(S.String),
    listingId: S.String,
    listingName: S.String,
    logoThumbnailUrl: S.String,
    longDescription: S.String,
    pricingModels: PricingModelList,
    pricingUnits: PricingUnitList,
    promotionalMedia: PromotionalMediaList,
    publisher: SellerInformation,
    resources: ResourceList,
    reviewSummary: S.optional(ReviewSummary),
    sellerEngagements: SellerEngagementList,
    shortDescription: S.String,
    useCases: UseCaseList,
  }),
).annotate({
  identifier: "GetListingOutput",
}) as any as S.Schema<GetListingOutput>;
export interface GetOfferInput {
  offerId: string;
}
export const GetOfferInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ offerId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2026-02-05/getOffer" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetOfferInput" }) as any as S.Schema<GetOfferInput>;
export type AgreementResourceId = string;
export type PurchaseOptionBadgeType =
  | "PRIVATE_PRICING"
  | "FUTURE_DATED"
  | "REPLACEMENT_OFFER"
  | (string & {});
export const PurchaseOptionBadgeType = /*@__PURE__*/ S.String;

export interface PurchaseOptionBadge {
  displayName: string;
  badgeType: PurchaseOptionBadgeType;
}
export const PurchaseOptionBadge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ displayName: S.String, badgeType: PurchaseOptionBadgeType }),
).annotate({
  identifier: "PurchaseOptionBadge",
}) as any as S.Schema<PurchaseOptionBadge>;
export type PurchaseOptionBadgeList = PurchaseOptionBadge[];
export const PurchaseOptionBadgeList =
  /*@__PURE__*/ S.Array(PurchaseOptionBadge);
export type OfferSetId = string;
export interface OfferSetInformation {
  offerSetId: string;
  sellerOfRecord: SellerInformation;
}
export const OfferSetInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ offerSetId: S.String, sellerOfRecord: SellerInformation }),
).annotate({
  identifier: "OfferSetInformation",
}) as any as S.Schema<OfferSetInformation>;
export interface OfferAssociatedEntity {
  product: ProductInformation;
  offerSet?: OfferSetInformation;
}
export const OfferAssociatedEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    product: ProductInformation,
    offerSet: S.optional(OfferSetInformation),
  }),
).annotate({
  identifier: "OfferAssociatedEntity",
}) as any as S.Schema<OfferAssociatedEntity>;
export type OfferAssociatedEntityList = OfferAssociatedEntity[];
export const OfferAssociatedEntityList = /*@__PURE__*/ S.Array(
  OfferAssociatedEntity,
);
export interface GetOfferOutput {
  offerId: string;
  catalog: string;
  offerName?: string;
  agreementProposalId: string;
  expirationTime?: Date;
  availableFromTime?: Date;
  sellerOfRecord: SellerInformation;
  replacementAgreementId?: string;
  pricingModel: PricingModel;
  badges: PurchaseOptionBadge[];
  associatedEntities: OfferAssociatedEntity[];
}
export const GetOfferOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    offerId: S.String,
    catalog: S.String,
    offerName: S.optional(S.String),
    agreementProposalId: S.String,
    expirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    availableFromTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    sellerOfRecord: SellerInformation,
    replacementAgreementId: S.optional(S.String),
    pricingModel: PricingModel,
    badges: PurchaseOptionBadgeList,
    associatedEntities: OfferAssociatedEntityList,
  }),
).annotate({ identifier: "GetOfferOutput" }) as any as S.Schema<GetOfferOutput>;
export interface GetOfferSetInput {
  offerSetId: string;
}
export const GetOfferSetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ offerSetId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2026-02-05/getOfferSet" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOfferSetInput",
}) as any as S.Schema<GetOfferSetInput>;
export interface OfferSetAssociatedEntity {
  product: ProductInformation;
  offer: OfferInformation;
}
export const OfferSetAssociatedEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ product: ProductInformation, offer: OfferInformation }),
).annotate({
  identifier: "OfferSetAssociatedEntity",
}) as any as S.Schema<OfferSetAssociatedEntity>;
export type OfferSetAssociatedEntityList = OfferSetAssociatedEntity[];
export const OfferSetAssociatedEntityList = /*@__PURE__*/ S.Array(
  OfferSetAssociatedEntity,
);
export interface GetOfferSetOutput {
  offerSetId: string;
  catalog: string;
  offerSetName?: string;
  availableFromTime?: Date;
  expirationTime?: Date;
  buyerNotes?: string;
  sellerOfRecord: SellerInformation;
  badges: PurchaseOptionBadge[];
  associatedEntities: OfferSetAssociatedEntity[];
}
export const GetOfferSetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    offerSetId: S.String,
    catalog: S.String,
    offerSetName: S.optional(S.String),
    availableFromTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    expirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    buyerNotes: S.optional(S.String),
    sellerOfRecord: SellerInformation,
    badges: PurchaseOptionBadgeList,
    associatedEntities: OfferSetAssociatedEntityList,
  }),
).annotate({
  identifier: "GetOfferSetOutput",
}) as any as S.Schema<GetOfferSetOutput>;
export type NextToken = string;
export interface GetOfferTermsInput {
  offerId: string;
  maxResults?: number;
  nextToken?: string;
}
export const GetOfferTermsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    offerId: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2026-02-05/getOfferTerms" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOfferTermsInput",
}) as any as S.Schema<GetOfferTermsInput>;
export type TermId = string;
export type TermType =
  | "ByolPricingTerm"
  | "ConfigurableUpfrontPricingTerm"
  | "FixedUpfrontPricingTerm"
  | "UsageBasedPricingTerm"
  | "FreeTrialPricingTerm"
  | "LegalTerm"
  | "PaymentScheduleTerm"
  | "RecurringPaymentTerm"
  | "RenewalTerm"
  | "SupportTerm"
  | "ValidityTerm"
  | "VariablePaymentTerm"
  | (string & {});
export const TermType = /*@__PURE__*/ S.String;

export interface ByolPricingTerm {
  id: string;
  type: TermType;
}
export const ByolPricingTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, type: TermType }),
).annotate({
  identifier: "ByolPricingTerm",
}) as any as S.Schema<ByolPricingTerm>;
export type CurrencyCode = string;
export type SelectorType = "Duration" | (string & {});
export const SelectorType = /*@__PURE__*/ S.String;

export type BoundedString = string;
export interface Selector {
  type: SelectorType;
  value: string;
}
export const Selector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: SelectorType, value: S.String }),
).annotate({ identifier: "Selector" }) as any as S.Schema<Selector>;
export type RateCardConstraintType = "Allowed" | "Disallowed" | (string & {});
export const RateCardConstraintType = /*@__PURE__*/ S.String;

export interface Constraints {
  multipleDimensionSelection: RateCardConstraintType;
  quantityConfiguration: RateCardConstraintType;
}
export const Constraints = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    multipleDimensionSelection: RateCardConstraintType,
    quantityConfiguration: RateCardConstraintType,
  }),
).annotate({ identifier: "Constraints" }) as any as S.Schema<Constraints>;
export type DimensionLabelType = "Region" | "SagemakerOption" | (string & {});
export const DimensionLabelType = /*@__PURE__*/ S.String;

export interface DimensionLabel {
  labelType: DimensionLabelType;
  labelValue: string;
  displayName?: string;
}
export const DimensionLabel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    labelType: DimensionLabelType,
    labelValue: S.String,
    displayName: S.optional(S.String),
  }),
).annotate({ identifier: "DimensionLabel" }) as any as S.Schema<DimensionLabel>;
export type DimensionLabelList = DimensionLabel[];
export const DimensionLabelList = /*@__PURE__*/ S.Array(DimensionLabel);
export interface RateCardItem {
  dimensionKey: string;
  displayName: string;
  description?: string;
  dimensionLabels?: DimensionLabel[];
  unit: string;
  price: string;
}
export const RateCardItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dimensionKey: S.String,
    displayName: S.String,
    description: S.optional(S.String),
    dimensionLabels: S.optional(DimensionLabelList),
    unit: S.String,
    price: S.String,
  }),
).annotate({ identifier: "RateCardItem" }) as any as S.Schema<RateCardItem>;
export type RateCardList = RateCardItem[];
export const RateCardList = /*@__PURE__*/ S.Array(RateCardItem);
export interface ConfigurableUpfrontRateCardItem {
  selector: Selector;
  constraints: Constraints;
  rateCard: RateCardItem[];
}
export const ConfigurableUpfrontRateCardItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    selector: Selector,
    constraints: Constraints,
    rateCard: RateCardList,
  }),
).annotate({
  identifier: "ConfigurableUpfrontRateCardItem",
}) as any as S.Schema<ConfigurableUpfrontRateCardItem>;
export type ConfigurableUpfrontRateCardList = ConfigurableUpfrontRateCardItem[];
export const ConfigurableUpfrontRateCardList = /*@__PURE__*/ S.Array(
  ConfigurableUpfrontRateCardItem,
);
export interface ConfigurableUpfrontPricingTerm {
  id: string;
  type: TermType;
  currencyCode: string;
  rateCards?: ConfigurableUpfrontRateCardItem[];
}
export const ConfigurableUpfrontPricingTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    type: TermType,
    currencyCode: S.String,
    rateCards: S.optional(ConfigurableUpfrontRateCardList),
  }),
).annotate({
  identifier: "ConfigurableUpfrontPricingTerm",
}) as any as S.Schema<ConfigurableUpfrontPricingTerm>;
export interface GrantItem {
  dimensionKey: string;
  displayName: string;
  description?: string;
  dimensionLabels?: DimensionLabel[];
  unit: string;
  maxQuantity?: number;
}
export const GrantItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dimensionKey: S.String,
    displayName: S.String,
    description: S.optional(S.String),
    dimensionLabels: S.optional(DimensionLabelList),
    unit: S.String,
    maxQuantity: S.optional(S.Number),
  }),
).annotate({ identifier: "GrantItem" }) as any as S.Schema<GrantItem>;
export type GrantList = GrantItem[];
export const GrantList = /*@__PURE__*/ S.Array(GrantItem);
export interface FixedUpfrontPricingTerm {
  id: string;
  type: TermType;
  currencyCode: string;
  duration?: string;
  price: string;
  grants: GrantItem[];
}
export const FixedUpfrontPricingTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    type: TermType,
    currencyCode: S.String,
    duration: S.optional(S.String),
    price: S.String,
    grants: GrantList,
  }),
).annotate({
  identifier: "FixedUpfrontPricingTerm",
}) as any as S.Schema<FixedUpfrontPricingTerm>;
export interface FreeTrialPricingTerm {
  id: string;
  type: TermType;
  duration?: string;
  grants: GrantItem[];
}
export const FreeTrialPricingTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    type: TermType,
    duration: S.optional(S.String),
    grants: GrantList,
  }),
).annotate({
  identifier: "FreeTrialPricingTerm",
}) as any as S.Schema<FreeTrialPricingTerm>;
export type LegalDocumentType =
  | "CustomEula"
  | "CustomDsa"
  | "EnterpriseEula"
  | "StandardEula"
  | "StandardDsa"
  | (string & {});
export const LegalDocumentType = /*@__PURE__*/ S.String;

export interface DocumentItem {
  type: LegalDocumentType;
  url: string;
  version?: string;
}
export const DocumentItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: LegalDocumentType,
    url: S.String,
    version: S.optional(S.String),
  }),
).annotate({ identifier: "DocumentItem" }) as any as S.Schema<DocumentItem>;
export type DocumentList = DocumentItem[];
export const DocumentList = /*@__PURE__*/ S.Array(DocumentItem);
export interface LegalTerm {
  id: string;
  type: TermType;
  documents: DocumentItem[];
}
export const LegalTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, type: TermType, documents: DocumentList }),
).annotate({ identifier: "LegalTerm" }) as any as S.Schema<LegalTerm>;
export interface ScheduleItem {
  chargeDate: Date;
  chargeAmount: string;
}
export const ScheduleItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    chargeDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    chargeAmount: S.String,
  }),
).annotate({ identifier: "ScheduleItem" }) as any as S.Schema<ScheduleItem>;
export type ScheduleList = ScheduleItem[];
export const ScheduleList = /*@__PURE__*/ S.Array(ScheduleItem);
export interface PaymentScheduleTerm {
  id: string;
  type: TermType;
  currencyCode: string;
  schedule: ScheduleItem[];
}
export const PaymentScheduleTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    type: TermType,
    currencyCode: S.String,
    schedule: ScheduleList,
  }),
).annotate({
  identifier: "PaymentScheduleTerm",
}) as any as S.Schema<PaymentScheduleTerm>;
export type BillingPeriodType = "Monthly" | (string & {});
export const BillingPeriodType = /*@__PURE__*/ S.String;

export interface RecurringPaymentTerm {
  id: string;
  type: TermType;
  currencyCode: string;
  billingPeriod: BillingPeriodType;
  price: string;
}
export const RecurringPaymentTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    type: TermType,
    currencyCode: S.String,
    billingPeriod: BillingPeriodType,
    price: S.String,
  }),
).annotate({
  identifier: "RecurringPaymentTerm",
}) as any as S.Schema<RecurringPaymentTerm>;
export interface RenewalTerm {
  id: string;
  type: TermType;
}
export const RenewalTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, type: TermType }),
).annotate({ identifier: "RenewalTerm" }) as any as S.Schema<RenewalTerm>;
export interface SupportTerm {
  id: string;
  type: TermType;
  refundPolicy: string;
}
export const SupportTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, type: TermType, refundPolicy: S.String }),
).annotate({ identifier: "SupportTerm" }) as any as S.Schema<SupportTerm>;
export interface UsageBasedRateCardItem {
  rateCard: RateCardItem[];
}
export const UsageBasedRateCardItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ rateCard: RateCardList }),
).annotate({
  identifier: "UsageBasedRateCardItem",
}) as any as S.Schema<UsageBasedRateCardItem>;
export type UsageBasedRateCardList = UsageBasedRateCardItem[];
export const UsageBasedRateCardList = /*@__PURE__*/ S.Array(
  UsageBasedRateCardItem,
);
export interface UsageBasedPricingTerm {
  id: string;
  type: TermType;
  currencyCode: string;
  rateCards: UsageBasedRateCardItem[];
}
export const UsageBasedPricingTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    type: TermType,
    currencyCode: S.String,
    rateCards: UsageBasedRateCardList,
  }),
).annotate({
  identifier: "UsageBasedPricingTerm",
}) as any as S.Schema<UsageBasedPricingTerm>;
export interface ValidityTerm {
  id: string;
  type: TermType;
  agreementDuration?: string;
  agreementEndDate?: Date;
  agreementStartDate?: Date;
}
export const ValidityTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    type: TermType,
    agreementDuration: S.optional(S.String),
    agreementEndDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    agreementStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "ValidityTerm" }) as any as S.Schema<ValidityTerm>;
export interface VariablePaymentTerm {
  id: string;
  type: TermType;
  currencyCode: string;
  maxTotalChargeAmount: string;
}
export const VariablePaymentTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    type: TermType,
    currencyCode: S.String,
    maxTotalChargeAmount: S.String,
  }),
).annotate({
  identifier: "VariablePaymentTerm",
}) as any as S.Schema<VariablePaymentTerm>;
export type OfferTerm =
  | {
      byolPricingTerm: ByolPricingTerm;
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm?: never;
      legalTerm?: never;
      paymentScheduleTerm?: never;
      recurringPaymentTerm?: never;
      renewalTerm?: never;
      supportTerm?: never;
      usageBasedPricingTerm?: never;
      validityTerm?: never;
      variablePaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm: ConfigurableUpfrontPricingTerm;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm?: never;
      legalTerm?: never;
      paymentScheduleTerm?: never;
      recurringPaymentTerm?: never;
      renewalTerm?: never;
      supportTerm?: never;
      usageBasedPricingTerm?: never;
      validityTerm?: never;
      variablePaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm: FixedUpfrontPricingTerm;
      freeTrialPricingTerm?: never;
      legalTerm?: never;
      paymentScheduleTerm?: never;
      recurringPaymentTerm?: never;
      renewalTerm?: never;
      supportTerm?: never;
      usageBasedPricingTerm?: never;
      validityTerm?: never;
      variablePaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm: FreeTrialPricingTerm;
      legalTerm?: never;
      paymentScheduleTerm?: never;
      recurringPaymentTerm?: never;
      renewalTerm?: never;
      supportTerm?: never;
      usageBasedPricingTerm?: never;
      validityTerm?: never;
      variablePaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm?: never;
      legalTerm: LegalTerm;
      paymentScheduleTerm?: never;
      recurringPaymentTerm?: never;
      renewalTerm?: never;
      supportTerm?: never;
      usageBasedPricingTerm?: never;
      validityTerm?: never;
      variablePaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm?: never;
      legalTerm?: never;
      paymentScheduleTerm: PaymentScheduleTerm;
      recurringPaymentTerm?: never;
      renewalTerm?: never;
      supportTerm?: never;
      usageBasedPricingTerm?: never;
      validityTerm?: never;
      variablePaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm?: never;
      legalTerm?: never;
      paymentScheduleTerm?: never;
      recurringPaymentTerm: RecurringPaymentTerm;
      renewalTerm?: never;
      supportTerm?: never;
      usageBasedPricingTerm?: never;
      validityTerm?: never;
      variablePaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm?: never;
      legalTerm?: never;
      paymentScheduleTerm?: never;
      recurringPaymentTerm?: never;
      renewalTerm: RenewalTerm;
      supportTerm?: never;
      usageBasedPricingTerm?: never;
      validityTerm?: never;
      variablePaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm?: never;
      legalTerm?: never;
      paymentScheduleTerm?: never;
      recurringPaymentTerm?: never;
      renewalTerm?: never;
      supportTerm: SupportTerm;
      usageBasedPricingTerm?: never;
      validityTerm?: never;
      variablePaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm?: never;
      legalTerm?: never;
      paymentScheduleTerm?: never;
      recurringPaymentTerm?: never;
      renewalTerm?: never;
      supportTerm?: never;
      usageBasedPricingTerm: UsageBasedPricingTerm;
      validityTerm?: never;
      variablePaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm?: never;
      legalTerm?: never;
      paymentScheduleTerm?: never;
      recurringPaymentTerm?: never;
      renewalTerm?: never;
      supportTerm?: never;
      usageBasedPricingTerm?: never;
      validityTerm: ValidityTerm;
      variablePaymentTerm?: never;
    }
  | {
      byolPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      freeTrialPricingTerm?: never;
      legalTerm?: never;
      paymentScheduleTerm?: never;
      recurringPaymentTerm?: never;
      renewalTerm?: never;
      supportTerm?: never;
      usageBasedPricingTerm?: never;
      validityTerm?: never;
      variablePaymentTerm: VariablePaymentTerm;
    };
export const OfferTerm = /*@__PURE__*/ S.Union([
  S.Struct({ byolPricingTerm: ByolPricingTerm }),
  S.Struct({ configurableUpfrontPricingTerm: ConfigurableUpfrontPricingTerm }),
  S.Struct({ fixedUpfrontPricingTerm: FixedUpfrontPricingTerm }),
  S.Struct({ freeTrialPricingTerm: FreeTrialPricingTerm }),
  S.Struct({ legalTerm: LegalTerm }),
  S.Struct({ paymentScheduleTerm: PaymentScheduleTerm }),
  S.Struct({ recurringPaymentTerm: RecurringPaymentTerm }),
  S.Struct({ renewalTerm: RenewalTerm }),
  S.Struct({ supportTerm: SupportTerm }),
  S.Struct({ usageBasedPricingTerm: UsageBasedPricingTerm }),
  S.Struct({ validityTerm: ValidityTerm }),
  S.Struct({ variablePaymentTerm: VariablePaymentTerm }),
]);
export type OfferTermsList = OfferTerm[];
export const OfferTermsList = /*@__PURE__*/ S.Array(OfferTerm);
export interface GetOfferTermsOutput {
  offerTerms: OfferTerm[];
  nextToken?: string;
}
export const GetOfferTermsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ offerTerms: OfferTermsList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "GetOfferTermsOutput",
}) as any as S.Schema<GetOfferTermsOutput>;
export interface GetProductInput {
  productId: string;
}
export const GetProductInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ productId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2026-02-05/getProduct" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetProductInput",
}) as any as S.Schema<GetProductInput>;
export type DeployedOnAwsStatus =
  | "DEPLOYED"
  | "NOT_DEPLOYED"
  | "NOT_APPLICABLE"
  | (string & {});
export const DeployedOnAwsStatus = /*@__PURE__*/ S.String;

export interface GetProductOutput {
  productId: string;
  catalog: string;
  productName: string;
  deployedOnAws: DeployedOnAwsStatus;
  shortDescription: string;
  longDescription: string;
  manufacturer: SellerInformation;
  logoThumbnailUrl: string;
  fulfillmentOptionSummaries: FulfillmentOptionSummary[];
  categories: Category[];
  highlights: string[];
  promotionalMedia: PromotionalMedia[];
  resources: Resource[];
  sellerEngagements: SellerEngagement[];
}
export const GetProductOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    productId: S.String,
    catalog: S.String,
    productName: S.String,
    deployedOnAws: DeployedOnAwsStatus,
    shortDescription: S.String,
    longDescription: S.String,
    manufacturer: SellerInformation,
    logoThumbnailUrl: S.String,
    fulfillmentOptionSummaries: FulfillmentOptionSummaryList,
    categories: CategoryList,
    highlights: HighlightList,
    promotionalMedia: PromotionalMediaList,
    resources: ResourceList,
    sellerEngagements: SellerEngagementList,
  }),
).annotate({
  identifier: "GetProductOutput",
}) as any as S.Schema<GetProductOutput>;
export interface ListFulfillmentOptionsInput {
  productId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListFulfillmentOptionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    productId: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2026-02-05/listFulfillmentOptions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFulfillmentOptionsInput",
}) as any as S.Schema<ListFulfillmentOptionsInput>;
export interface AmazonMachineImageOperatingSystem {
  operatingSystemFamilyName: string;
  operatingSystemName: string;
  operatingSystemVersion?: string;
}
export const AmazonMachineImageOperatingSystem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    operatingSystemFamilyName: S.String,
    operatingSystemName: S.String,
    operatingSystemVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "AmazonMachineImageOperatingSystem",
}) as any as S.Schema<AmazonMachineImageOperatingSystem>;
export type AmazonMachineImageOperatingSystemList =
  AmazonMachineImageOperatingSystem[];
export const AmazonMachineImageOperatingSystemList = /*@__PURE__*/ S.Array(
  AmazonMachineImageOperatingSystem,
);
export interface AmazonMachineImageRecommendation {
  instanceType: string;
}
export const AmazonMachineImageRecommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceType: S.String }),
).annotate({
  identifier: "AmazonMachineImageRecommendation",
}) as any as S.Schema<AmazonMachineImageRecommendation>;
export interface AmazonMachineImageFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionName: string;
  fulfillmentOptionVersion?: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  operatingSystems: AmazonMachineImageOperatingSystem[];
  recommendation?: AmazonMachineImageRecommendation;
  releaseNotes?: string;
  usageInstructions?: string;
}
export const AmazonMachineImageFulfillmentOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fulfillmentOptionId: S.String,
    fulfillmentOptionName: S.String,
    fulfillmentOptionVersion: S.optional(S.String),
    fulfillmentOptionType: FulfillmentOptionType,
    fulfillmentOptionDisplayName: S.String,
    operatingSystems: AmazonMachineImageOperatingSystemList,
    recommendation: S.optional(AmazonMachineImageRecommendation),
    releaseNotes: S.optional(S.String),
    usageInstructions: S.optional(S.String),
  }),
).annotate({
  identifier: "AmazonMachineImageFulfillmentOption",
}) as any as S.Schema<AmazonMachineImageFulfillmentOption>;
export interface AwsSupportedService {
  supportedServiceType: string;
  displayName: string;
  description: string;
}
export const AwsSupportedService = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    supportedServiceType: S.String,
    displayName: S.String,
    description: S.String,
  }),
).annotate({
  identifier: "AwsSupportedService",
}) as any as S.Schema<AwsSupportedService>;
export type AwsSupportedServiceList = AwsSupportedService[];
export const AwsSupportedServiceList =
  /*@__PURE__*/ S.Array(AwsSupportedService);
export interface ApiFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  usageInstructions?: string;
  awsSupportedServices: AwsSupportedService[];
}
export const ApiFulfillmentOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fulfillmentOptionId: S.String,
    fulfillmentOptionType: FulfillmentOptionType,
    fulfillmentOptionDisplayName: S.String,
    usageInstructions: S.optional(S.String),
    awsSupportedServices: AwsSupportedServiceList,
  }),
).annotate({
  identifier: "ApiFulfillmentOption",
}) as any as S.Schema<ApiFulfillmentOption>;
export interface CloudFormationFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionName: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  fulfillmentOptionVersion?: string;
  releaseNotes?: string;
  usageInstructions?: string;
}
export const CloudFormationFulfillmentOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fulfillmentOptionId: S.String,
    fulfillmentOptionName: S.String,
    fulfillmentOptionType: FulfillmentOptionType,
    fulfillmentOptionDisplayName: S.String,
    fulfillmentOptionVersion: S.optional(S.String),
    releaseNotes: S.optional(S.String),
    usageInstructions: S.optional(S.String),
  }),
).annotate({
  identifier: "CloudFormationFulfillmentOption",
}) as any as S.Schema<CloudFormationFulfillmentOption>;
export interface ContainerOperatingSystem {
  operatingSystemFamilyName: string;
  operatingSystemName: string;
}
export const ContainerOperatingSystem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    operatingSystemFamilyName: S.String,
    operatingSystemName: S.String,
  }),
).annotate({
  identifier: "ContainerOperatingSystem",
}) as any as S.Schema<ContainerOperatingSystem>;
export type ContainerOperatingSystemList = ContainerOperatingSystem[];
export const ContainerOperatingSystemList = /*@__PURE__*/ S.Array(
  ContainerOperatingSystem,
);
export interface ContainerFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionName: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  fulfillmentOptionVersion?: string;
  operatingSystems?: ContainerOperatingSystem[];
  awsSupportedServices?: AwsSupportedService[];
  releaseNotes?: string;
  usageInstructions?: string;
}
export const ContainerFulfillmentOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fulfillmentOptionId: S.String,
    fulfillmentOptionName: S.String,
    fulfillmentOptionType: FulfillmentOptionType,
    fulfillmentOptionDisplayName: S.String,
    fulfillmentOptionVersion: S.optional(S.String),
    operatingSystems: S.optional(ContainerOperatingSystemList),
    awsSupportedServices: S.optional(AwsSupportedServiceList),
    releaseNotes: S.optional(S.String),
    usageInstructions: S.optional(S.String),
  }),
).annotate({
  identifier: "ContainerFulfillmentOption",
}) as any as S.Schema<ContainerFulfillmentOption>;
export interface HelmOperatingSystem {
  operatingSystemFamilyName: string;
  operatingSystemName: string;
}
export const HelmOperatingSystem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    operatingSystemFamilyName: S.String,
    operatingSystemName: S.String,
  }),
).annotate({
  identifier: "HelmOperatingSystem",
}) as any as S.Schema<HelmOperatingSystem>;
export type HelmOperatingSystemList = HelmOperatingSystem[];
export const HelmOperatingSystemList =
  /*@__PURE__*/ S.Array(HelmOperatingSystem);
export interface HelmFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionName: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  fulfillmentOptionVersion?: string;
  operatingSystems?: HelmOperatingSystem[];
  releaseNotes?: string;
  awsSupportedServices?: AwsSupportedService[];
  usageInstructions?: string;
}
export const HelmFulfillmentOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fulfillmentOptionId: S.String,
    fulfillmentOptionName: S.String,
    fulfillmentOptionType: FulfillmentOptionType,
    fulfillmentOptionDisplayName: S.String,
    fulfillmentOptionVersion: S.optional(S.String),
    operatingSystems: S.optional(HelmOperatingSystemList),
    releaseNotes: S.optional(S.String),
    awsSupportedServices: S.optional(AwsSupportedServiceList),
    usageInstructions: S.optional(S.String),
  }),
).annotate({
  identifier: "HelmFulfillmentOption",
}) as any as S.Schema<HelmFulfillmentOption>;
export interface EksAddOnOperatingSystem {
  operatingSystemFamilyName: string;
  operatingSystemName: string;
}
export const EksAddOnOperatingSystem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    operatingSystemFamilyName: S.String,
    operatingSystemName: S.String,
  }),
).annotate({
  identifier: "EksAddOnOperatingSystem",
}) as any as S.Schema<EksAddOnOperatingSystem>;
export type EksAddOnOperatingSystemList = EksAddOnOperatingSystem[];
export const EksAddOnOperatingSystemList = /*@__PURE__*/ S.Array(
  EksAddOnOperatingSystem,
);
export interface EksAddOnFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionName: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  fulfillmentOptionVersion?: string;
  operatingSystems?: EksAddOnOperatingSystem[];
  releaseNotes?: string;
  usageInstructions?: string;
  awsSupportedServices?: AwsSupportedService[];
}
export const EksAddOnFulfillmentOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fulfillmentOptionId: S.String,
    fulfillmentOptionName: S.String,
    fulfillmentOptionType: FulfillmentOptionType,
    fulfillmentOptionDisplayName: S.String,
    fulfillmentOptionVersion: S.optional(S.String),
    operatingSystems: S.optional(EksAddOnOperatingSystemList),
    releaseNotes: S.optional(S.String),
    usageInstructions: S.optional(S.String),
    awsSupportedServices: S.optional(AwsSupportedServiceList),
  }),
).annotate({
  identifier: "EksAddOnFulfillmentOption",
}) as any as S.Schema<EksAddOnFulfillmentOption>;
export interface Ec2ImageBuilderComponentFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionName: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  fulfillmentOptionVersion?: string;
  operatingSystems?: ContainerOperatingSystem[];
  awsSupportedServices?: AwsSupportedService[];
  releaseNotes?: string;
  usageInstructions?: string;
}
export const Ec2ImageBuilderComponentFulfillmentOption =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      fulfillmentOptionId: S.String,
      fulfillmentOptionName: S.String,
      fulfillmentOptionType: FulfillmentOptionType,
      fulfillmentOptionDisplayName: S.String,
      fulfillmentOptionVersion: S.optional(S.String),
      operatingSystems: S.optional(ContainerOperatingSystemList),
      awsSupportedServices: S.optional(AwsSupportedServiceList),
      releaseNotes: S.optional(S.String),
      usageInstructions: S.optional(S.String),
    }),
  ).annotate({
    identifier: "Ec2ImageBuilderComponentFulfillmentOption",
  }) as any as S.Schema<Ec2ImageBuilderComponentFulfillmentOption>;
export interface DataArtifact {
  description?: string;
  resourceArn?: string;
  resourceType: string;
  dataClassification: string;
}
export const DataArtifact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    resourceArn: S.optional(S.String),
    resourceType: S.String,
    dataClassification: S.String,
  }),
).annotate({ identifier: "DataArtifact" }) as any as S.Schema<DataArtifact>;
export type DataArtifactList = DataArtifact[];
export const DataArtifactList = /*@__PURE__*/ S.Array(DataArtifact);
export interface DataExchangeFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  dataArtifacts?: DataArtifact[];
}
export const DataExchangeFulfillmentOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fulfillmentOptionId: S.String,
    fulfillmentOptionType: FulfillmentOptionType,
    fulfillmentOptionDisplayName: S.String,
    dataArtifacts: S.optional(DataArtifactList),
  }),
).annotate({
  identifier: "DataExchangeFulfillmentOption",
}) as any as S.Schema<DataExchangeFulfillmentOption>;
export interface ProfessionalServicesFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
}
export const ProfessionalServicesFulfillmentOption = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      fulfillmentOptionId: S.String,
      fulfillmentOptionType: FulfillmentOptionType,
      fulfillmentOptionDisplayName: S.String,
    }),
).annotate({
  identifier: "ProfessionalServicesFulfillmentOption",
}) as any as S.Schema<ProfessionalServicesFulfillmentOption>;
export interface SaasFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  fulfillmentUrl?: string;
  usageInstructions?: string;
}
export const SaasFulfillmentOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fulfillmentOptionId: S.String,
    fulfillmentOptionType: FulfillmentOptionType,
    fulfillmentOptionDisplayName: S.String,
    fulfillmentUrl: S.optional(S.String),
    usageInstructions: S.optional(S.String),
  }),
).annotate({
  identifier: "SaasFulfillmentOption",
}) as any as S.Schema<SaasFulfillmentOption>;
export interface SageMakerAlgorithmRecommendation {
  recommendedBatchTransformInstanceType: string;
  recommendedRealtimeInferenceInstanceType?: string;
  recommendedTrainingInstanceType: string;
}
export const SageMakerAlgorithmRecommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendedBatchTransformInstanceType: S.String,
    recommendedRealtimeInferenceInstanceType: S.optional(S.String),
    recommendedTrainingInstanceType: S.String,
  }),
).annotate({
  identifier: "SageMakerAlgorithmRecommendation",
}) as any as S.Schema<SageMakerAlgorithmRecommendation>;
export interface SageMakerAlgorithmFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  fulfillmentOptionVersion?: string;
  releaseNotes?: string;
  usageInstructions?: string;
  recommendation?: SageMakerAlgorithmRecommendation;
}
export const SageMakerAlgorithmFulfillmentOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fulfillmentOptionId: S.String,
    fulfillmentOptionType: FulfillmentOptionType,
    fulfillmentOptionDisplayName: S.String,
    fulfillmentOptionVersion: S.optional(S.String),
    releaseNotes: S.optional(S.String),
    usageInstructions: S.optional(S.String),
    recommendation: S.optional(SageMakerAlgorithmRecommendation),
  }),
).annotate({
  identifier: "SageMakerAlgorithmFulfillmentOption",
}) as any as S.Schema<SageMakerAlgorithmFulfillmentOption>;
export interface SageMakerModelRecommendation {
  recommendedBatchTransformInstanceType: string;
  recommendedRealtimeInferenceInstanceType?: string;
}
export const SageMakerModelRecommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendedBatchTransformInstanceType: S.String,
    recommendedRealtimeInferenceInstanceType: S.optional(S.String),
  }),
).annotate({
  identifier: "SageMakerModelRecommendation",
}) as any as S.Schema<SageMakerModelRecommendation>;
export interface SageMakerModelFulfillmentOption {
  fulfillmentOptionId: string;
  fulfillmentOptionType: FulfillmentOptionType;
  fulfillmentOptionDisplayName: string;
  fulfillmentOptionVersion?: string;
  releaseNotes?: string;
  usageInstructions?: string;
  recommendation?: SageMakerModelRecommendation;
}
export const SageMakerModelFulfillmentOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fulfillmentOptionId: S.String,
    fulfillmentOptionType: FulfillmentOptionType,
    fulfillmentOptionDisplayName: S.String,
    fulfillmentOptionVersion: S.optional(S.String),
    releaseNotes: S.optional(S.String),
    usageInstructions: S.optional(S.String),
    recommendation: S.optional(SageMakerModelRecommendation),
  }),
).annotate({
  identifier: "SageMakerModelFulfillmentOption",
}) as any as S.Schema<SageMakerModelFulfillmentOption>;
export type FulfillmentOption =
  | {
      amazonMachineImageFulfillmentOption: AmazonMachineImageFulfillmentOption;
      apiFulfillmentOption?: never;
      cloudFormationFulfillmentOption?: never;
      containerFulfillmentOption?: never;
      helmFulfillmentOption?: never;
      eksAddOnFulfillmentOption?: never;
      ec2ImageBuilderComponentFulfillmentOption?: never;
      dataExchangeFulfillmentOption?: never;
      professionalServicesFulfillmentOption?: never;
      saasFulfillmentOption?: never;
      sageMakerAlgorithmFulfillmentOption?: never;
      sageMakerModelFulfillmentOption?: never;
    }
  | {
      amazonMachineImageFulfillmentOption?: never;
      apiFulfillmentOption: ApiFulfillmentOption;
      cloudFormationFulfillmentOption?: never;
      containerFulfillmentOption?: never;
      helmFulfillmentOption?: never;
      eksAddOnFulfillmentOption?: never;
      ec2ImageBuilderComponentFulfillmentOption?: never;
      dataExchangeFulfillmentOption?: never;
      professionalServicesFulfillmentOption?: never;
      saasFulfillmentOption?: never;
      sageMakerAlgorithmFulfillmentOption?: never;
      sageMakerModelFulfillmentOption?: never;
    }
  | {
      amazonMachineImageFulfillmentOption?: never;
      apiFulfillmentOption?: never;
      cloudFormationFulfillmentOption: CloudFormationFulfillmentOption;
      containerFulfillmentOption?: never;
      helmFulfillmentOption?: never;
      eksAddOnFulfillmentOption?: never;
      ec2ImageBuilderComponentFulfillmentOption?: never;
      dataExchangeFulfillmentOption?: never;
      professionalServicesFulfillmentOption?: never;
      saasFulfillmentOption?: never;
      sageMakerAlgorithmFulfillmentOption?: never;
      sageMakerModelFulfillmentOption?: never;
    }
  | {
      amazonMachineImageFulfillmentOption?: never;
      apiFulfillmentOption?: never;
      cloudFormationFulfillmentOption?: never;
      containerFulfillmentOption: ContainerFulfillmentOption;
      helmFulfillmentOption?: never;
      eksAddOnFulfillmentOption?: never;
      ec2ImageBuilderComponentFulfillmentOption?: never;
      dataExchangeFulfillmentOption?: never;
      professionalServicesFulfillmentOption?: never;
      saasFulfillmentOption?: never;
      sageMakerAlgorithmFulfillmentOption?: never;
      sageMakerModelFulfillmentOption?: never;
    }
  | {
      amazonMachineImageFulfillmentOption?: never;
      apiFulfillmentOption?: never;
      cloudFormationFulfillmentOption?: never;
      containerFulfillmentOption?: never;
      helmFulfillmentOption: HelmFulfillmentOption;
      eksAddOnFulfillmentOption?: never;
      ec2ImageBuilderComponentFulfillmentOption?: never;
      dataExchangeFulfillmentOption?: never;
      professionalServicesFulfillmentOption?: never;
      saasFulfillmentOption?: never;
      sageMakerAlgorithmFulfillmentOption?: never;
      sageMakerModelFulfillmentOption?: never;
    }
  | {
      amazonMachineImageFulfillmentOption?: never;
      apiFulfillmentOption?: never;
      cloudFormationFulfillmentOption?: never;
      containerFulfillmentOption?: never;
      helmFulfillmentOption?: never;
      eksAddOnFulfillmentOption: EksAddOnFulfillmentOption;
      ec2ImageBuilderComponentFulfillmentOption?: never;
      dataExchangeFulfillmentOption?: never;
      professionalServicesFulfillmentOption?: never;
      saasFulfillmentOption?: never;
      sageMakerAlgorithmFulfillmentOption?: never;
      sageMakerModelFulfillmentOption?: never;
    }
  | {
      amazonMachineImageFulfillmentOption?: never;
      apiFulfillmentOption?: never;
      cloudFormationFulfillmentOption?: never;
      containerFulfillmentOption?: never;
      helmFulfillmentOption?: never;
      eksAddOnFulfillmentOption?: never;
      ec2ImageBuilderComponentFulfillmentOption: Ec2ImageBuilderComponentFulfillmentOption;
      dataExchangeFulfillmentOption?: never;
      professionalServicesFulfillmentOption?: never;
      saasFulfillmentOption?: never;
      sageMakerAlgorithmFulfillmentOption?: never;
      sageMakerModelFulfillmentOption?: never;
    }
  | {
      amazonMachineImageFulfillmentOption?: never;
      apiFulfillmentOption?: never;
      cloudFormationFulfillmentOption?: never;
      containerFulfillmentOption?: never;
      helmFulfillmentOption?: never;
      eksAddOnFulfillmentOption?: never;
      ec2ImageBuilderComponentFulfillmentOption?: never;
      dataExchangeFulfillmentOption: DataExchangeFulfillmentOption;
      professionalServicesFulfillmentOption?: never;
      saasFulfillmentOption?: never;
      sageMakerAlgorithmFulfillmentOption?: never;
      sageMakerModelFulfillmentOption?: never;
    }
  | {
      amazonMachineImageFulfillmentOption?: never;
      apiFulfillmentOption?: never;
      cloudFormationFulfillmentOption?: never;
      containerFulfillmentOption?: never;
      helmFulfillmentOption?: never;
      eksAddOnFulfillmentOption?: never;
      ec2ImageBuilderComponentFulfillmentOption?: never;
      dataExchangeFulfillmentOption?: never;
      professionalServicesFulfillmentOption: ProfessionalServicesFulfillmentOption;
      saasFulfillmentOption?: never;
      sageMakerAlgorithmFulfillmentOption?: never;
      sageMakerModelFulfillmentOption?: never;
    }
  | {
      amazonMachineImageFulfillmentOption?: never;
      apiFulfillmentOption?: never;
      cloudFormationFulfillmentOption?: never;
      containerFulfillmentOption?: never;
      helmFulfillmentOption?: never;
      eksAddOnFulfillmentOption?: never;
      ec2ImageBuilderComponentFulfillmentOption?: never;
      dataExchangeFulfillmentOption?: never;
      professionalServicesFulfillmentOption?: never;
      saasFulfillmentOption: SaasFulfillmentOption;
      sageMakerAlgorithmFulfillmentOption?: never;
      sageMakerModelFulfillmentOption?: never;
    }
  | {
      amazonMachineImageFulfillmentOption?: never;
      apiFulfillmentOption?: never;
      cloudFormationFulfillmentOption?: never;
      containerFulfillmentOption?: never;
      helmFulfillmentOption?: never;
      eksAddOnFulfillmentOption?: never;
      ec2ImageBuilderComponentFulfillmentOption?: never;
      dataExchangeFulfillmentOption?: never;
      professionalServicesFulfillmentOption?: never;
      saasFulfillmentOption?: never;
      sageMakerAlgorithmFulfillmentOption: SageMakerAlgorithmFulfillmentOption;
      sageMakerModelFulfillmentOption?: never;
    }
  | {
      amazonMachineImageFulfillmentOption?: never;
      apiFulfillmentOption?: never;
      cloudFormationFulfillmentOption?: never;
      containerFulfillmentOption?: never;
      helmFulfillmentOption?: never;
      eksAddOnFulfillmentOption?: never;
      ec2ImageBuilderComponentFulfillmentOption?: never;
      dataExchangeFulfillmentOption?: never;
      professionalServicesFulfillmentOption?: never;
      saasFulfillmentOption?: never;
      sageMakerAlgorithmFulfillmentOption?: never;
      sageMakerModelFulfillmentOption: SageMakerModelFulfillmentOption;
    };
export const FulfillmentOption = /*@__PURE__*/ S.Union([
  S.Struct({
    amazonMachineImageFulfillmentOption: AmazonMachineImageFulfillmentOption,
  }),
  S.Struct({ apiFulfillmentOption: ApiFulfillmentOption }),
  S.Struct({
    cloudFormationFulfillmentOption: CloudFormationFulfillmentOption,
  }),
  S.Struct({ containerFulfillmentOption: ContainerFulfillmentOption }),
  S.Struct({ helmFulfillmentOption: HelmFulfillmentOption }),
  S.Struct({ eksAddOnFulfillmentOption: EksAddOnFulfillmentOption }),
  S.Struct({
    ec2ImageBuilderComponentFulfillmentOption:
      Ec2ImageBuilderComponentFulfillmentOption,
  }),
  S.Struct({ dataExchangeFulfillmentOption: DataExchangeFulfillmentOption }),
  S.Struct({
    professionalServicesFulfillmentOption:
      ProfessionalServicesFulfillmentOption,
  }),
  S.Struct({ saasFulfillmentOption: SaasFulfillmentOption }),
  S.Struct({
    sageMakerAlgorithmFulfillmentOption: SageMakerAlgorithmFulfillmentOption,
  }),
  S.Struct({
    sageMakerModelFulfillmentOption: SageMakerModelFulfillmentOption,
  }),
]);
export type FulfillmentOptionsList = FulfillmentOption[];
export const FulfillmentOptionsList = /*@__PURE__*/ S.Array(FulfillmentOption);
export interface ListFulfillmentOptionsOutput {
  fulfillmentOptions: FulfillmentOption[];
  nextToken?: string;
}
export const ListFulfillmentOptionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fulfillmentOptions: FulfillmentOptionsList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFulfillmentOptionsOutput",
}) as any as S.Schema<ListFulfillmentOptionsOutput>;
export type PurchaseOptionFilterType =
  | "PRODUCT_ID"
  | "SELLER_OF_RECORD_PROFILE_ID"
  | "PURCHASE_OPTION_TYPE"
  | "VISIBILITY_SCOPE"
  | "AVAILABILITY_STATUS"
  | (string & {});
export const PurchaseOptionFilterType = /*@__PURE__*/ S.String;

export type PurchaseOptionFilterValue = string;
export type PurchaseOptionFilterValueList = string[];
export const PurchaseOptionFilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface PurchaseOptionFilter {
  filterType: PurchaseOptionFilterType;
  filterValues: string[];
}
export const PurchaseOptionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filterType: PurchaseOptionFilterType,
    filterValues: PurchaseOptionFilterValueList,
  }),
).annotate({
  identifier: "PurchaseOptionFilter",
}) as any as S.Schema<PurchaseOptionFilter>;
export type PurchaseOptionFilterList = PurchaseOptionFilter[];
export const PurchaseOptionFilterList =
  /*@__PURE__*/ S.Array(PurchaseOptionFilter);
export type MaxResults = number;
export interface ListPurchaseOptionsInput {
  filters?: PurchaseOptionFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListPurchaseOptionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(PurchaseOptionFilterList),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2026-02-05/listPurchaseOptions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPurchaseOptionsInput",
}) as any as S.Schema<ListPurchaseOptionsInput>;
export type PurchaseOptionType = "OFFER" | "OFFERSET" | (string & {});
export const PurchaseOptionType = /*@__PURE__*/ S.String;

export interface PurchaseOptionAssociatedEntity {
  product: ProductInformation;
  offer: OfferInformation;
  offerSet?: OfferSetInformation;
}
export const PurchaseOptionAssociatedEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    product: ProductInformation,
    offer: OfferInformation,
    offerSet: S.optional(OfferSetInformation),
  }),
).annotate({
  identifier: "PurchaseOptionAssociatedEntity",
}) as any as S.Schema<PurchaseOptionAssociatedEntity>;
export type PurchaseOptionAssociatedEntityList =
  PurchaseOptionAssociatedEntity[];
export const PurchaseOptionAssociatedEntityList = /*@__PURE__*/ S.Array(
  PurchaseOptionAssociatedEntity,
);
export interface PurchaseOptionSummary {
  purchaseOptionId: string;
  catalog: string;
  purchaseOptionType: PurchaseOptionType;
  purchaseOptionName?: string;
  availableFromTime?: Date;
  expirationTime?: Date;
  sellerOfRecord: SellerInformation;
  badges?: PurchaseOptionBadge[];
  associatedEntities: PurchaseOptionAssociatedEntity[];
}
export const PurchaseOptionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    purchaseOptionId: S.String,
    catalog: S.String,
    purchaseOptionType: PurchaseOptionType,
    purchaseOptionName: S.optional(S.String),
    availableFromTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    expirationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    sellerOfRecord: SellerInformation,
    badges: S.optional(PurchaseOptionBadgeList),
    associatedEntities: PurchaseOptionAssociatedEntityList,
  }),
).annotate({
  identifier: "PurchaseOptionSummary",
}) as any as S.Schema<PurchaseOptionSummary>;
export type PurchaseOptionSummaryList = PurchaseOptionSummary[];
export const PurchaseOptionSummaryList = /*@__PURE__*/ S.Array(
  PurchaseOptionSummary,
);
export interface ListPurchaseOptionsOutput {
  purchaseOptions?: PurchaseOptionSummary[];
  nextToken?: string;
}
export const ListPurchaseOptionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    purchaseOptions: S.optional(PurchaseOptionSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPurchaseOptionsOutput",
}) as any as S.Schema<ListPurchaseOptionsOutput>;
export type SearchText = string;
export type SearchFilterType =
  | "MIN_AVERAGE_CUSTOMER_RATING"
  | "MAX_AVERAGE_CUSTOMER_RATING"
  | "CATEGORY"
  | "PUBLISHER"
  | "FULFILLMENT_OPTION_TYPE"
  | "PRICING_MODEL"
  | "PRICING_UNIT"
  | "DEPLOYED_ON_AWS"
  | "NUMBER_OF_PRODUCTS"
  | (string & {});
export const SearchFilterType = /*@__PURE__*/ S.String;

export type SearchFilterValue = string;
export type SearchFilterValueList = string[];
export const SearchFilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface SearchFilter {
  filterType: SearchFilterType;
  filterValues: string[];
}
export const SearchFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filterType: SearchFilterType,
    filterValues: SearchFilterValueList,
  }),
).annotate({ identifier: "SearchFilter" }) as any as S.Schema<SearchFilter>;
export type SearchFilterList = SearchFilter[];
export const SearchFilterList = /*@__PURE__*/ S.Array(SearchFilter);
export type SearchFacetType =
  | "AVERAGE_CUSTOMER_RATING"
  | "CATEGORY"
  | "PUBLISHER"
  | "FULFILLMENT_OPTION_TYPE"
  | "PRICING_MODEL"
  | "PRICING_UNIT"
  | "DEPLOYED_ON_AWS"
  | "NUMBER_OF_PRODUCTS"
  | (string & {});
export const SearchFacetType = /*@__PURE__*/ S.String;

export type FacetTypeList = SearchFacetType[];
export const FacetTypeList = /*@__PURE__*/ S.Array(SearchFacetType);
export interface SearchFacetsInput {
  searchText?: string;
  filters?: SearchFilter[];
  facetTypes?: SearchFacetType[];
  nextToken?: string;
}
export const SearchFacetsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    searchText: S.optional(S.String),
    filters: S.optional(SearchFilterList),
    facetTypes: S.optional(FacetTypeList),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2026-02-05/searchFacets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchFacetsInput",
}) as any as S.Schema<SearchFacetsInput>;
export interface ListingFacet {
  value: string;
  displayName: string;
  parent?: string;
  count: number;
}
export const ListingFacet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    value: S.String,
    displayName: S.String,
    parent: S.optional(S.String),
    count: S.Number,
  }),
).annotate({ identifier: "ListingFacet" }) as any as S.Schema<ListingFacet>;
export type ListingFacetList = ListingFacet[];
export const ListingFacetList = /*@__PURE__*/ S.Array(ListingFacet);
export type TypeToFacetMap = { [key in SearchFacetType]?: ListingFacet[] };
export const TypeToFacetMap = /*@__PURE__*/ S.Record(
  SearchFacetType,
  ListingFacetList.pipe(S.optional),
);
export interface SearchFacetsOutput {
  totalResults: number;
  listingFacets: { [key: string]: ListingFacet[] | undefined };
  nextToken?: string;
}
export const SearchFacetsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    totalResults: S.Number,
    listingFacets: TypeToFacetMap,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchFacetsOutput",
}) as any as S.Schema<SearchFacetsOutput>;
export type SearchListingsSortBy =
  | "RELEVANCE"
  | "AVERAGE_CUSTOMER_RATING"
  | (string & {});
export const SearchListingsSortBy = /*@__PURE__*/ S.String;

export type SearchListingsSortOrder =
  | "DESCENDING"
  | "ASCENDING"
  | (string & {});
export const SearchListingsSortOrder = /*@__PURE__*/ S.String;

export interface SearchListingsInput {
  searchText?: string;
  filters?: SearchFilter[];
  maxResults?: number;
  sortBy?: SearchListingsSortBy;
  sortOrder?: SearchListingsSortOrder;
  nextToken?: string;
}
export const SearchListingsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    searchText: S.optional(S.String),
    filters: S.optional(SearchFilterList),
    maxResults: S.optional(S.Number),
    sortBy: S.optional(SearchListingsSortBy),
    sortOrder: S.optional(SearchListingsSortOrder),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2026-02-05/searchListings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchListingsInput",
}) as any as S.Schema<SearchListingsInput>;
export interface ListingSummaryAssociatedEntity {
  product?: ProductInformation;
}
export const ListingSummaryAssociatedEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ product: S.optional(ProductInformation) }),
).annotate({
  identifier: "ListingSummaryAssociatedEntity",
}) as any as S.Schema<ListingSummaryAssociatedEntity>;
export type ListingSummaryAssociatedEntityList =
  ListingSummaryAssociatedEntity[];
export const ListingSummaryAssociatedEntityList = /*@__PURE__*/ S.Array(
  ListingSummaryAssociatedEntity,
);
export interface ListingSummary {
  listingId: string;
  listingName: string;
  publisher: SellerInformation;
  catalog: string;
  shortDescription: string;
  logoThumbnailUrl: string;
  categories: Category[];
  fulfillmentOptionSummaries: FulfillmentOptionSummary[];
  badges: ListingBadge[];
  reviewSummary: ReviewSummary;
  pricingModels: PricingModel[];
  pricingUnits: PricingUnit[];
  associatedEntities: ListingSummaryAssociatedEntity[];
}
export const ListingSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    listingId: S.String,
    listingName: S.String,
    publisher: SellerInformation,
    catalog: S.String,
    shortDescription: S.String,
    logoThumbnailUrl: S.String,
    categories: CategoryList,
    fulfillmentOptionSummaries: FulfillmentOptionSummaryList,
    badges: ListingBadgeList,
    reviewSummary: ReviewSummary,
    pricingModels: PricingModelList,
    pricingUnits: PricingUnitList,
    associatedEntities: ListingSummaryAssociatedEntityList,
  }),
).annotate({ identifier: "ListingSummary" }) as any as S.Schema<ListingSummary>;
export type ListingSummaryList = ListingSummary[];
export const ListingSummaryList = /*@__PURE__*/ S.Array(ListingSummary);
export interface SearchListingsOutput {
  totalResults: number;
  listingSummaries: ListingSummary[];
  nextToken?: string;
}
export const SearchListingsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    totalResults: S.Number,
    listingSummaries: ListingSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchListingsOutput",
}) as any as S.Schema<SearchListingsOutput>;
export type ExceptionMessage = string;
export type GetListingError = ResourceNotFoundException | CommonErrors;
/**
 * Provides details about a listing, such as descriptions, badges, categories, pricing model summaries, reviews, and associated products and offers.
 */
export const getListing: API.OperationMethod<
  GetListingInput,
  GetListingOutput,
  GetListingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetListingInput,
  output: GetListingOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetListing",
}));

export type GetOfferError = ResourceNotFoundException | CommonErrors;
/**
 * Provides details about an offer, such as the pricing model, seller of record, availability dates, badges, and associated products.
 */
export const getOffer: API.OperationMethod<
  GetOfferInput,
  GetOfferOutput,
  GetOfferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOfferInput,
  output: GetOfferOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOffer",
}));

export type GetOfferSetError = ResourceNotFoundException | CommonErrors;
/**
 * Provides details about an offer set, which is a bundle of offers across multiple products. Includes the seller, availability dates, buyer notes, and associated product-offer pairs.
 */
export const getOfferSet: API.OperationMethod<
  GetOfferSetInput,
  GetOfferSetOutput,
  GetOfferSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOfferSetInput,
  output: GetOfferSetOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOfferSet",
}));

export type GetOfferTermsError = ResourceNotFoundException | CommonErrors;
/**
 * Returns the terms attached to an offer, such as pricing terms (usage-based, contract, BYOL, free trial), legal terms, payment schedules, validity terms, support terms, and renewal terms.
 */
export const getOfferTerms: API.PaginatedOperationMethod<
  GetOfferTermsInput,
  GetOfferTermsOutput,
  GetOfferTermsError,
  Credentials | HttpClient.HttpClient,
  OfferTerm
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetOfferTermsInput,
  output: GetOfferTermsOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOfferTerms",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "offerTerms",
  } as const,
})) as any;

export type GetProductError = ResourceNotFoundException | CommonErrors;
/**
 * Provides details about a product, such as descriptions, highlights, categories, fulfillment option summaries, promotional media, and seller engagement options.
 */
export const getProduct: API.OperationMethod<
  GetProductInput,
  GetProductOutput,
  GetProductError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProductInput,
  output: GetProductOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProduct",
}));

export type ListFulfillmentOptionsError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the fulfillment options available for a product, including deployment details such as version information, operating systems, usage instructions, and release notes.
 */
export const listFulfillmentOptions: API.PaginatedOperationMethod<
  ListFulfillmentOptionsInput,
  ListFulfillmentOptionsOutput,
  ListFulfillmentOptionsError,
  Credentials | HttpClient.HttpClient,
  FulfillmentOption
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFulfillmentOptionsInput,
  output: ListFulfillmentOptionsOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFulfillmentOptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "fulfillmentOptions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPurchaseOptionsError = CommonErrors;
/**
 * Returns the purchase options (offers and offer sets) available to the buyer. You can filter results by product, seller, purchase option type, visibility scope, and availability status.
 *
 * You must include at least one of the following filters in the request: a `PRODUCT_ID` filter to specify the product for which to retrieve purchase options, or a `VISIBILITY_SCOPE` filter to retrieve purchase options by visibility.
 */
export const listPurchaseOptions: API.PaginatedOperationMethod<
  ListPurchaseOptionsInput,
  ListPurchaseOptionsOutput,
  ListPurchaseOptionsError,
  Credentials | HttpClient.HttpClient,
  PurchaseOptionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPurchaseOptionsInput,
  output: ListPurchaseOptionsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPurchaseOptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "purchaseOptions",
  } as const,
})) as any;

export type SearchFacetsError = CommonErrors;
/**
 * Returns available facet values for filtering listings, such as categories, pricing models, fulfillment option types, publishers, and customer ratings. Each facet value includes a count of matching listings.
 */
export const searchFacets: API.PaginatedOperationMethod<
  SearchFacetsInput,
  SearchFacetsOutput,
  SearchFacetsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchFacetsInput,
  output: SearchFacetsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchFacets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "listingFacets",
  } as const,
})) as any;

export type SearchListingsError = CommonErrors;
/**
 * Returns a list of product listings based on search criteria and filters. You can search by keyword, filter by category, pricing model, fulfillment type, and other attributes, and sort results by relevance or customer rating.
 */
export const searchListings: API.PaginatedOperationMethod<
  SearchListingsInput,
  SearchListingsOutput,
  SearchListingsError,
  Credentials | HttpClient.HttpClient,
  ListingSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchListingsInput,
  output: SearchListingsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchListings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "listingSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;
