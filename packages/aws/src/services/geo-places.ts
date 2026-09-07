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
  sdkId: "Geo Places",
  serviceShapeName: "PlacesService",
});
const auth = T.AwsAuthSigv4({ name: "geo-places" });
const ver = T.ServiceVersion("2020-11-19");
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
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            `https://places.geo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === true &&
          UseDualStack === true
        ) {
          return e(
            `https://places.geo-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === true &&
          UseDualStack === false
        ) {
          return e(
            `https://places.geo-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://places.geo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            `https://places.geo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === true &&
          UseDualStack === true
        ) {
          return e(
            `https://places.geo-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === true &&
          UseDualStack === false
        ) {
          return e(
            `https://places.geo-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://places.geo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://geo-places-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://geo-places-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://geo-places.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://geo-places.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      Reason: S.String,
      FieldList: S.suspend(() => ValidationExceptionFieldList).annotate({
        identifier: "ValidationExceptionFieldList",
      }),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type SensitiveString = string | redacted.Redacted<string>;
export type Position = number[];
export const Position = /*@__PURE__*/ S.Array(S.Number);
export type BoundingBox = number[];
export const BoundingBox = /*@__PURE__*/ S.Array(S.Number);
export type DistanceMeters = number;
export interface FilterCircle {
  Center: number[];
  Radius: number;
}
export const FilterCircle = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Center: Position, Radius: S.Number }),
).annotate({ identifier: "FilterCircle" }) as any as S.Schema<FilterCircle>;
export type CountryCode = string | redacted.Redacted<string>;
export type CountryCodeList = (string | redacted.Redacted<string>)[];
export const CountryCodeList = /*@__PURE__*/ S.Array(SensitiveString);
export type AutocompleteFilterPlaceType = string;
export type AutocompleteFilterPlaceTypeList = string[];
export const AutocompleteFilterPlaceTypeList = /*@__PURE__*/ S.Array(S.String);
export interface AutocompleteFilter {
  BoundingBox?: number[];
  Circle?: FilterCircle;
  IncludeCountries?: (string | redacted.Redacted<string>)[];
  IncludePlaceTypes?: string[];
}
export const AutocompleteFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BoundingBox: S.optional(BoundingBox),
    Circle: S.optional(FilterCircle),
    IncludeCountries: S.optional(CountryCodeList),
    IncludePlaceTypes: S.optional(AutocompleteFilterPlaceTypeList),
  }),
).annotate({
  identifier: "AutocompleteFilter",
}) as any as S.Schema<AutocompleteFilter>;
export type PostalCodeMode = string;
export type AutocompleteAdditionalFeature = string;
export type AutocompleteAdditionalFeatureList = string[];
export const AutocompleteAdditionalFeatureList = /*@__PURE__*/ S.Array(
  S.String,
);
export type LanguageTag = string;
export type AutocompleteIntendedUse = string;
export type ApiKey = string | redacted.Redacted<string>;
export interface AutocompleteRequest {
  QueryText: string | redacted.Redacted<string>;
  MaxResults?: number;
  BiasPosition?: number[];
  Filter?: AutocompleteFilter;
  PostalCodeMode?: string;
  AdditionalFeatures?: string[];
  Language?: string;
  PoliticalView?: string | redacted.Redacted<string>;
  IntendedUse?: string;
  Key?: string | redacted.Redacted<string>;
}
export const AutocompleteRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryText: SensitiveString,
    MaxResults: S.optional(S.Number),
    BiasPosition: S.optional(Position),
    Filter: S.optional(AutocompleteFilter),
    PostalCodeMode: S.optional(S.String),
    AdditionalFeatures: S.optional(AutocompleteAdditionalFeatureList),
    Language: S.optional(S.String),
    PoliticalView: S.optional(SensitiveString),
    IntendedUse: S.optional(S.String),
    Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/autocomplete" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AutocompleteRequest",
}) as any as S.Schema<AutocompleteRequest>;
export type PlaceType = string | redacted.Redacted<string>;
export type CountryCode2 = string | redacted.Redacted<string>;
export type CountryCode3 = string | redacted.Redacted<string>;
export interface Country {
  Code2?: string | redacted.Redacted<string>;
  Code3?: string | redacted.Redacted<string>;
  Name?: string | redacted.Redacted<string>;
}
export const Country = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code2: S.optional(SensitiveString),
    Code3: S.optional(SensitiveString),
    Name: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Country" }) as any as S.Schema<Country>;
export interface Region {
  Code?: string | redacted.Redacted<string>;
  Name?: string | redacted.Redacted<string>;
}
export const Region = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(SensitiveString),
    Name: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Region" }) as any as S.Schema<Region>;
export interface SubRegion {
  Code?: string | redacted.Redacted<string>;
  Name?: string | redacted.Redacted<string>;
}
export const SubRegion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(SensitiveString),
    Name: S.optional(SensitiveString),
  }),
).annotate({ identifier: "SubRegion" }) as any as S.Schema<SubRegion>;
export type IntersectionStreet = string;
export type IntersectionStreetList = string[];
export const IntersectionStreetList = /*@__PURE__*/ S.Array(S.String);
export type TypePlacement = string;
export type TypeSeparator = string;
export interface StreetComponents {
  BaseName?: string | redacted.Redacted<string>;
  Type?: string | redacted.Redacted<string>;
  TypePlacement?: string;
  TypeSeparator?: string;
  Prefix?: string | redacted.Redacted<string>;
  Suffix?: string | redacted.Redacted<string>;
  Direction?: string | redacted.Redacted<string>;
  Language?: string;
}
export const StreetComponents = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BaseName: S.optional(SensitiveString),
    Type: S.optional(SensitiveString),
    TypePlacement: S.optional(S.String),
    TypeSeparator: S.optional(S.String),
    Prefix: S.optional(SensitiveString),
    Suffix: S.optional(SensitiveString),
    Direction: S.optional(SensitiveString),
    Language: S.optional(S.String),
  }),
).annotate({
  identifier: "StreetComponents",
}) as any as S.Schema<StreetComponents>;
export type StreetComponentsList = StreetComponents[];
export const StreetComponentsList = /*@__PURE__*/ S.Array(StreetComponents);
export interface SecondaryAddressComponent {
  Number: string | redacted.Redacted<string>;
  Designator?: string | redacted.Redacted<string>;
}
export const SecondaryAddressComponent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Number: SensitiveString,
    Designator: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "SecondaryAddressComponent",
}) as any as S.Schema<SecondaryAddressComponent>;
export type SecondaryAddressComponentList = SecondaryAddressComponent[];
export const SecondaryAddressComponentList = /*@__PURE__*/ S.Array(
  SecondaryAddressComponent,
);
export interface Address {
  Label?: string | redacted.Redacted<string>;
  Country?: Country;
  Region?: Region;
  SubRegion?: SubRegion;
  Locality?: string | redacted.Redacted<string>;
  District?: string | redacted.Redacted<string>;
  SubDistrict?: string | redacted.Redacted<string>;
  PostalCode?: string | redacted.Redacted<string>;
  Block?: string | redacted.Redacted<string>;
  SubBlock?: string | redacted.Redacted<string>;
  Intersection?: string[];
  Street?: string | redacted.Redacted<string>;
  StreetComponents?: StreetComponents[];
  AddressNumber?: string | redacted.Redacted<string>;
  Building?: string | redacted.Redacted<string>;
  SecondaryAddressComponents?: SecondaryAddressComponent[];
}
export const Address = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Label: S.optional(SensitiveString),
    Country: S.optional(Country),
    Region: S.optional(Region),
    SubRegion: S.optional(SubRegion),
    Locality: S.optional(SensitiveString),
    District: S.optional(SensitiveString),
    SubDistrict: S.optional(SensitiveString),
    PostalCode: S.optional(SensitiveString),
    Block: S.optional(SensitiveString),
    SubBlock: S.optional(SensitiveString),
    Intersection: S.optional(IntersectionStreetList),
    Street: S.optional(SensitiveString),
    StreetComponents: S.optional(StreetComponentsList),
    AddressNumber: S.optional(SensitiveString),
    Building: S.optional(SensitiveString),
    SecondaryAddressComponents: S.optional(SecondaryAddressComponentList),
  }),
).annotate({ identifier: "Address" }) as any as S.Schema<Address>;
export interface Highlight {
  StartIndex?: number;
  EndIndex?: number;
  Value?: string | redacted.Redacted<string>;
}
export const Highlight = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartIndex: S.optional(S.Number),
    EndIndex: S.optional(S.Number),
    Value: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Highlight" }) as any as S.Schema<Highlight>;
export type HighlightList = Highlight[];
export const HighlightList = /*@__PURE__*/ S.Array(Highlight);
export interface CountryHighlights {
  Code?: Highlight[];
  Name?: Highlight[];
}
export const CountryHighlights = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(HighlightList),
    Name: S.optional(HighlightList),
  }),
).annotate({
  identifier: "CountryHighlights",
}) as any as S.Schema<CountryHighlights>;
export interface RegionHighlights {
  Code?: Highlight[];
  Name?: Highlight[];
}
export const RegionHighlights = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(HighlightList),
    Name: S.optional(HighlightList),
  }),
).annotate({
  identifier: "RegionHighlights",
}) as any as S.Schema<RegionHighlights>;
export interface SubRegionHighlights {
  Code?: Highlight[];
  Name?: Highlight[];
}
export const SubRegionHighlights = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(HighlightList),
    Name: S.optional(HighlightList),
  }),
).annotate({
  identifier: "SubRegionHighlights",
}) as any as S.Schema<SubRegionHighlights>;
export type IntersectionHighlightsList = Highlight[][];
export const IntersectionHighlightsList = /*@__PURE__*/ S.Array(HighlightList);
export interface AutocompleteAddressHighlights {
  Label?: Highlight[];
  Country?: CountryHighlights;
  Region?: RegionHighlights;
  SubRegion?: SubRegionHighlights;
  Locality?: Highlight[];
  District?: Highlight[];
  SubDistrict?: Highlight[];
  Street?: Highlight[];
  Block?: Highlight[];
  SubBlock?: Highlight[];
  Intersection?: Highlight[][];
  PostalCode?: Highlight[];
  AddressNumber?: Highlight[];
  Building?: Highlight[];
}
export const AutocompleteAddressHighlights = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Label: S.optional(HighlightList),
    Country: S.optional(CountryHighlights),
    Region: S.optional(RegionHighlights),
    SubRegion: S.optional(SubRegionHighlights),
    Locality: S.optional(HighlightList),
    District: S.optional(HighlightList),
    SubDistrict: S.optional(HighlightList),
    Street: S.optional(HighlightList),
    Block: S.optional(HighlightList),
    SubBlock: S.optional(HighlightList),
    Intersection: S.optional(IntersectionHighlightsList),
    PostalCode: S.optional(HighlightList),
    AddressNumber: S.optional(HighlightList),
    Building: S.optional(HighlightList),
  }),
).annotate({
  identifier: "AutocompleteAddressHighlights",
}) as any as S.Schema<AutocompleteAddressHighlights>;
export interface AutocompleteHighlights {
  Title?: Highlight[];
  Address?: AutocompleteAddressHighlights;
}
export const AutocompleteHighlights = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Title: S.optional(HighlightList),
    Address: S.optional(AutocompleteAddressHighlights),
  }),
).annotate({
  identifier: "AutocompleteHighlights",
}) as any as S.Schema<AutocompleteHighlights>;
export interface AutocompleteResultItem {
  PlaceId: string | redacted.Redacted<string>;
  PlaceType: string | redacted.Redacted<string>;
  Title: string | redacted.Redacted<string>;
  Address?: Address;
  Distance?: number;
  Language?: string;
  PoliticalView?: string | redacted.Redacted<string>;
  Highlights?: AutocompleteHighlights;
}
export const AutocompleteResultItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlaceId: SensitiveString,
    PlaceType: SensitiveString,
    Title: SensitiveString,
    Address: S.optional(Address),
    Distance: S.optional(S.Number),
    Language: S.optional(S.String),
    PoliticalView: S.optional(SensitiveString),
    Highlights: S.optional(AutocompleteHighlights),
  }),
).annotate({
  identifier: "AutocompleteResultItem",
}) as any as S.Schema<AutocompleteResultItem>;
export type AutocompleteResultItemList = AutocompleteResultItem[];
export const AutocompleteResultItemList = /*@__PURE__*/ S.Array(
  AutocompleteResultItem,
);
export interface AutocompleteResponse {
  PricingBucket: string;
  ResultItems?: AutocompleteResultItem[];
}
export const AutocompleteResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
    ResultItems: S.optional(AutocompleteResultItemList),
  }),
).annotate({
  identifier: "AutocompleteResponse",
}) as any as S.Schema<AutocompleteResponse>;
export interface GeocodeQueryComponents {
  Country?: string | redacted.Redacted<string>;
  Region?: string | redacted.Redacted<string>;
  SubRegion?: string | redacted.Redacted<string>;
  Locality?: string | redacted.Redacted<string>;
  District?: string | redacted.Redacted<string>;
  Street?: string | redacted.Redacted<string>;
  AddressNumber?: string | redacted.Redacted<string>;
  PostalCode?: string | redacted.Redacted<string>;
}
export const GeocodeQueryComponents = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Country: S.optional(SensitiveString),
    Region: S.optional(SensitiveString),
    SubRegion: S.optional(SensitiveString),
    Locality: S.optional(SensitiveString),
    District: S.optional(SensitiveString),
    Street: S.optional(SensitiveString),
    AddressNumber: S.optional(SensitiveString),
    PostalCode: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "GeocodeQueryComponents",
}) as any as S.Schema<GeocodeQueryComponents>;
export type GeocodeFilterPlaceType = string | redacted.Redacted<string>;
export type GeocodeFilterPlaceTypeList = (string | redacted.Redacted<string>)[];
export const GeocodeFilterPlaceTypeList =
  /*@__PURE__*/ S.Array(SensitiveString);
export interface GeocodeFilter {
  IncludeCountries?: (string | redacted.Redacted<string>)[];
  IncludePlaceTypes?: (string | redacted.Redacted<string>)[];
}
export const GeocodeFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IncludeCountries: S.optional(CountryCodeList),
    IncludePlaceTypes: S.optional(GeocodeFilterPlaceTypeList),
  }),
).annotate({ identifier: "GeocodeFilter" }) as any as S.Schema<GeocodeFilter>;
export type GeocodeAdditionalFeature = string;
export type GeocodeAdditionalFeatureList = string[];
export const GeocodeAdditionalFeatureList = /*@__PURE__*/ S.Array(S.String);
export type GeocodeIntendedUse = string;
export interface GeocodeRequest {
  QueryText?: string | redacted.Redacted<string>;
  QueryComponents?: GeocodeQueryComponents;
  MaxResults?: number;
  BiasPosition?: number[];
  Filter?: GeocodeFilter;
  AdditionalFeatures?: string[];
  Language?: string;
  PoliticalView?: string | redacted.Redacted<string>;
  IntendedUse?: string;
  Key?: string | redacted.Redacted<string>;
}
export const GeocodeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryText: S.optional(SensitiveString),
    QueryComponents: S.optional(GeocodeQueryComponents),
    MaxResults: S.optional(S.Number),
    BiasPosition: S.optional(Position),
    Filter: S.optional(GeocodeFilter),
    AdditionalFeatures: S.optional(GeocodeAdditionalFeatureList),
    Language: S.optional(S.String),
    PoliticalView: S.optional(SensitiveString),
    IntendedUse: S.optional(S.String),
    Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/geocode" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GeocodeRequest" }) as any as S.Schema<GeocodeRequest>;
export type SensitiveBoolean = boolean;
export type PostalAuthority = string | redacted.Redacted<string>;
export type PostalCodeType = string | redacted.Redacted<string>;
export type ZipClassificationCode = string | redacted.Redacted<string>;
export interface UspsZip {
  ZipClassificationCode?: string | redacted.Redacted<string>;
}
export const UspsZip = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ZipClassificationCode: S.optional(SensitiveString) }),
).annotate({ identifier: "UspsZip" }) as any as S.Schema<UspsZip>;
export type RecordTypeCode = string | redacted.Redacted<string>;
export interface UspsZipPlus4 {
  RecordTypeCode?: string | redacted.Redacted<string>;
}
export const UspsZipPlus4 = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RecordTypeCode: S.optional(SensitiveString) }),
).annotate({ identifier: "UspsZipPlus4" }) as any as S.Schema<UspsZipPlus4>;
export interface PostalCodeDetails {
  PostalCode?: string | redacted.Redacted<string>;
  PostalAuthority?: string | redacted.Redacted<string>;
  PostalCodeType?: string | redacted.Redacted<string>;
  UspsZip?: UspsZip;
  UspsZipPlus4?: UspsZipPlus4;
}
export const PostalCodeDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PostalCode: S.optional(SensitiveString),
    PostalAuthority: S.optional(SensitiveString),
    PostalCodeType: S.optional(SensitiveString),
    UspsZip: S.optional(UspsZip),
    UspsZipPlus4: S.optional(UspsZipPlus4),
  }),
).annotate({
  identifier: "PostalCodeDetails",
}) as any as S.Schema<PostalCodeDetails>;
export type PostalCodeDetailsList = PostalCodeDetails[];
export const PostalCodeDetailsList = /*@__PURE__*/ S.Array(PostalCodeDetails);
export interface Category {
  Id: string | redacted.Redacted<string>;
  Name: string | redacted.Redacted<string>;
  LocalizedName?: string | redacted.Redacted<string>;
  Primary?: boolean;
}
export const Category = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: SensitiveString,
    Name: SensitiveString,
    LocalizedName: S.optional(SensitiveString),
    Primary: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Category" }) as any as S.Schema<Category>;
export type CategoryList = Category[];
export const CategoryList = /*@__PURE__*/ S.Array(Category);
export interface FoodType {
  LocalizedName: string | redacted.Redacted<string>;
  Id?: string | redacted.Redacted<string>;
  Primary?: boolean;
}
export const FoodType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LocalizedName: SensitiveString,
    Id: S.optional(SensitiveString),
    Primary: S.optional(S.Boolean),
  }),
).annotate({ identifier: "FoodType" }) as any as S.Schema<FoodType>;
export type FoodTypeList = FoodType[];
export const FoodTypeList = /*@__PURE__*/ S.Array(FoodType);
export interface AccessPoint {
  Position?: number[];
}
export const AccessPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Position: S.optional(Position) }),
).annotate({ identifier: "AccessPoint" }) as any as S.Schema<AccessPoint>;
export type AccessPointList = AccessPoint[];
export const AccessPointList = /*@__PURE__*/ S.Array(AccessPoint);
export type DurationSeconds = number;
export interface TimeZone {
  Name: string | redacted.Redacted<string>;
  Offset?: string | redacted.Redacted<string>;
  OffsetSeconds?: number;
}
export const TimeZone = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: SensitiveString,
    Offset: S.optional(SensitiveString),
    OffsetSeconds: S.optional(S.Number),
  }),
).annotate({ identifier: "TimeZone" }) as any as S.Schema<TimeZone>;
export type MatchScore = number;
export type MatchScoreList = number[];
export const MatchScoreList = /*@__PURE__*/ S.Array(S.Number);
export interface SecondaryAddressComponentMatchScore {
  Number?: number;
}
export const SecondaryAddressComponentMatchScore = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Number: S.optional(S.Number) }),
).annotate({
  identifier: "SecondaryAddressComponentMatchScore",
}) as any as S.Schema<SecondaryAddressComponentMatchScore>;
export type SecondaryAddressComponentMatchScoreList =
  SecondaryAddressComponentMatchScore[];
export const SecondaryAddressComponentMatchScoreList = /*@__PURE__*/ S.Array(
  SecondaryAddressComponentMatchScore,
);
export interface AddressComponentMatchScores {
  Country?: number;
  Region?: number;
  SubRegion?: number;
  Locality?: number;
  District?: number;
  SubDistrict?: number;
  PostalCode?: number;
  Block?: number;
  SubBlock?: number;
  Intersection?: number[];
  AddressNumber?: number;
  Building?: number;
  SecondaryAddressComponents?: SecondaryAddressComponentMatchScore[];
}
export const AddressComponentMatchScores = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Country: S.optional(S.Number),
    Region: S.optional(S.Number),
    SubRegion: S.optional(S.Number),
    Locality: S.optional(S.Number),
    District: S.optional(S.Number),
    SubDistrict: S.optional(S.Number),
    PostalCode: S.optional(S.Number),
    Block: S.optional(S.Number),
    SubBlock: S.optional(S.Number),
    Intersection: S.optional(MatchScoreList),
    AddressNumber: S.optional(S.Number),
    Building: S.optional(S.Number),
    SecondaryAddressComponents: S.optional(
      SecondaryAddressComponentMatchScoreList,
    ),
  }),
).annotate({
  identifier: "AddressComponentMatchScores",
}) as any as S.Schema<AddressComponentMatchScores>;
export interface ComponentMatchScores {
  Title?: number;
  Address?: AddressComponentMatchScores;
}
export const ComponentMatchScores = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Title: S.optional(S.Number),
    Address: S.optional(AddressComponentMatchScores),
  }),
).annotate({
  identifier: "ComponentMatchScores",
}) as any as S.Schema<ComponentMatchScores>;
export interface MatchScoreDetails {
  Overall?: number;
  Components?: ComponentMatchScores;
}
export const MatchScoreDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Overall: S.optional(S.Number),
    Components: S.optional(ComponentMatchScores),
  }),
).annotate({
  identifier: "MatchScoreDetails",
}) as any as S.Schema<MatchScoreDetails>;
export interface ParsedQueryComponent {
  StartIndex?: number;
  EndIndex?: number;
  Value?: string | redacted.Redacted<string>;
  QueryComponent?: string | redacted.Redacted<string>;
}
export const ParsedQueryComponent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartIndex: S.optional(S.Number),
    EndIndex: S.optional(S.Number),
    Value: S.optional(SensitiveString),
    QueryComponent: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ParsedQueryComponent",
}) as any as S.Schema<ParsedQueryComponent>;
export type ParsedQueryComponentList = ParsedQueryComponent[];
export const ParsedQueryComponentList =
  /*@__PURE__*/ S.Array(ParsedQueryComponent);
export interface ParsedQuerySecondaryAddressComponent {
  StartIndex: number;
  EndIndex: number;
  Value: string | redacted.Redacted<string>;
  Number: string | redacted.Redacted<string>;
  Designator: string | redacted.Redacted<string>;
}
export const ParsedQuerySecondaryAddressComponent = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StartIndex: S.Number,
      EndIndex: S.Number,
      Value: SensitiveString,
      Number: SensitiveString,
      Designator: SensitiveString,
    }),
).annotate({
  identifier: "ParsedQuerySecondaryAddressComponent",
}) as any as S.Schema<ParsedQuerySecondaryAddressComponent>;
export type ParsedQuerySecondaryAddressComponentList =
  ParsedQuerySecondaryAddressComponent[];
export const ParsedQuerySecondaryAddressComponentList = /*@__PURE__*/ S.Array(
  ParsedQuerySecondaryAddressComponent,
);
export interface GeocodeParsedQueryAddressComponents {
  Country?: ParsedQueryComponent[];
  Region?: ParsedQueryComponent[];
  SubRegion?: ParsedQueryComponent[];
  Locality?: ParsedQueryComponent[];
  District?: ParsedQueryComponent[];
  SubDistrict?: ParsedQueryComponent[];
  PostalCode?: ParsedQueryComponent[];
  Block?: ParsedQueryComponent[];
  SubBlock?: ParsedQueryComponent[];
  Street?: ParsedQueryComponent[];
  AddressNumber?: ParsedQueryComponent[];
  Building?: ParsedQueryComponent[];
  SecondaryAddressComponents?: ParsedQuerySecondaryAddressComponent[];
}
export const GeocodeParsedQueryAddressComponents = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Country: S.optional(ParsedQueryComponentList),
    Region: S.optional(ParsedQueryComponentList),
    SubRegion: S.optional(ParsedQueryComponentList),
    Locality: S.optional(ParsedQueryComponentList),
    District: S.optional(ParsedQueryComponentList),
    SubDistrict: S.optional(ParsedQueryComponentList),
    PostalCode: S.optional(ParsedQueryComponentList),
    Block: S.optional(ParsedQueryComponentList),
    SubBlock: S.optional(ParsedQueryComponentList),
    Street: S.optional(ParsedQueryComponentList),
    AddressNumber: S.optional(ParsedQueryComponentList),
    Building: S.optional(ParsedQueryComponentList),
    SecondaryAddressComponents: S.optional(
      ParsedQuerySecondaryAddressComponentList,
    ),
  }),
).annotate({
  identifier: "GeocodeParsedQueryAddressComponents",
}) as any as S.Schema<GeocodeParsedQueryAddressComponents>;
export interface GeocodeParsedQuery {
  Title?: ParsedQueryComponent[];
  Address?: GeocodeParsedQueryAddressComponents;
}
export const GeocodeParsedQuery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Title: S.optional(ParsedQueryComponentList),
    Address: S.optional(GeocodeParsedQueryAddressComponents),
  }),
).annotate({
  identifier: "GeocodeParsedQuery",
}) as any as S.Schema<GeocodeParsedQuery>;
export interface Intersection {
  PlaceId: string | redacted.Redacted<string>;
  Title: string | redacted.Redacted<string>;
  Address?: Address;
  Position?: number[];
  Distance?: number;
  RouteDistance?: number;
  MapView?: number[];
  AccessPoints?: AccessPoint[];
}
export const Intersection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlaceId: SensitiveString,
    Title: SensitiveString,
    Address: S.optional(Address),
    Position: S.optional(Position),
    Distance: S.optional(S.Number),
    RouteDistance: S.optional(S.Number),
    MapView: S.optional(BoundingBox),
    AccessPoints: S.optional(AccessPointList),
  }),
).annotate({ identifier: "Intersection" }) as any as S.Schema<Intersection>;
export type IntersectionList = Intersection[];
export const IntersectionList = /*@__PURE__*/ S.Array(Intersection);
export interface RelatedPlace {
  PlaceId: string | redacted.Redacted<string>;
  PlaceType: string | redacted.Redacted<string>;
  Title: string | redacted.Redacted<string>;
  Address?: Address;
  Position?: number[];
  AccessPoints?: AccessPoint[];
}
export const RelatedPlace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlaceId: SensitiveString,
    PlaceType: SensitiveString,
    Title: SensitiveString,
    Address: S.optional(Address),
    Position: S.optional(Position),
    AccessPoints: S.optional(AccessPointList),
  }),
).annotate({ identifier: "RelatedPlace" }) as any as S.Schema<RelatedPlace>;
export type RelatedPlaceList = RelatedPlace[];
export const RelatedPlaceList = /*@__PURE__*/ S.Array(RelatedPlace);
export interface GeocodeResultItem {
  PlaceId: string | redacted.Redacted<string>;
  PlaceType: string | redacted.Redacted<string>;
  Title: string | redacted.Redacted<string>;
  Address?: Address;
  AddressNumberCorrected?: boolean;
  PostalCodeDetails?: PostalCodeDetails[];
  Position?: number[];
  Distance?: number;
  MapView?: number[];
  Categories?: Category[];
  FoodTypes?: FoodType[];
  AccessPoints?: AccessPoint[];
  TimeZone?: TimeZone;
  PoliticalView?: string | redacted.Redacted<string>;
  MatchScores?: MatchScoreDetails;
  ParsedQuery?: GeocodeParsedQuery;
  Intersections?: Intersection[];
  MainAddress?: RelatedPlace;
  SecondaryAddresses?: RelatedPlace[];
}
export const GeocodeResultItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlaceId: SensitiveString,
    PlaceType: SensitiveString,
    Title: SensitiveString,
    Address: S.optional(Address),
    AddressNumberCorrected: S.optional(S.Boolean),
    PostalCodeDetails: S.optional(PostalCodeDetailsList),
    Position: S.optional(Position),
    Distance: S.optional(S.Number),
    MapView: S.optional(BoundingBox),
    Categories: S.optional(CategoryList),
    FoodTypes: S.optional(FoodTypeList),
    AccessPoints: S.optional(AccessPointList),
    TimeZone: S.optional(TimeZone),
    PoliticalView: S.optional(SensitiveString),
    MatchScores: S.optional(MatchScoreDetails),
    ParsedQuery: S.optional(GeocodeParsedQuery),
    Intersections: S.optional(IntersectionList),
    MainAddress: S.optional(RelatedPlace),
    SecondaryAddresses: S.optional(RelatedPlaceList),
  }),
).annotate({
  identifier: "GeocodeResultItem",
}) as any as S.Schema<GeocodeResultItem>;
export type GeocodeResultItemList = GeocodeResultItem[];
export const GeocodeResultItemList = /*@__PURE__*/ S.Array(GeocodeResultItem);
export interface GeocodeResponse {
  PricingBucket: string;
  ResultItems?: GeocodeResultItem[];
}
export const GeocodeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
    ResultItems: S.optional(GeocodeResultItemList),
  }),
).annotate({
  identifier: "GeocodeResponse",
}) as any as S.Schema<GeocodeResponse>;
export type GetPlaceAdditionalFeature = string;
export type GetPlaceAdditionalFeatureList = string[];
export const GetPlaceAdditionalFeatureList = /*@__PURE__*/ S.Array(S.String);
export type GetPlaceIntendedUse = string;
export interface GetPlaceRequest {
  PlaceId: string | redacted.Redacted<string>;
  AdditionalFeatures?: string[];
  Language?: string;
  PoliticalView?: string | redacted.Redacted<string>;
  IntendedUse?: string;
  Key?: string | redacted.Redacted<string>;
}
export const GetPlaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlaceId: SensitiveString.pipe(T.HttpLabel("PlaceId")),
    AdditionalFeatures: S.optional(GetPlaceAdditionalFeatureList).pipe(
      T.HttpQuery("additional-features"),
    ),
    Language: S.optional(S.String).pipe(T.HttpQuery("language")),
    PoliticalView: S.optional(SensitiveString).pipe(
      T.HttpQuery("political-view"),
    ),
    IntendedUse: S.optional(S.String).pipe(T.HttpQuery("intended-use")),
    Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/place/{PlaceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPlaceRequest",
}) as any as S.Schema<GetPlaceRequest>;
export interface BusinessChain {
  Name?: string | redacted.Redacted<string>;
  Id?: string | redacted.Redacted<string>;
}
export const BusinessChain = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(SensitiveString),
    Id: S.optional(SensitiveString),
  }),
).annotate({ identifier: "BusinessChain" }) as any as S.Schema<BusinessChain>;
export type BusinessChainList = BusinessChain[];
export const BusinessChainList = /*@__PURE__*/ S.Array(BusinessChain);
export interface ContactDetails {
  Label?: string | redacted.Redacted<string>;
  Value?: string | redacted.Redacted<string>;
  Categories?: Category[];
}
export const ContactDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Label: S.optional(SensitiveString),
    Value: S.optional(SensitiveString),
    Categories: S.optional(CategoryList),
  }),
).annotate({ identifier: "ContactDetails" }) as any as S.Schema<ContactDetails>;
export type ContactDetailsList = ContactDetails[];
export const ContactDetailsList = /*@__PURE__*/ S.Array(ContactDetails);
export interface Contacts {
  Phones?: ContactDetails[];
  Faxes?: ContactDetails[];
  Websites?: ContactDetails[];
  Emails?: ContactDetails[];
}
export const Contacts = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Phones: S.optional(ContactDetailsList),
    Faxes: S.optional(ContactDetailsList),
    Websites: S.optional(ContactDetailsList),
    Emails: S.optional(ContactDetailsList),
  }),
).annotate({ identifier: "Contacts" }) as any as S.Schema<Contacts>;
export type OpeningHoursDisplay = string | redacted.Redacted<string>;
export type OpeningHoursDisplayList = (string | redacted.Redacted<string>)[];
export const OpeningHoursDisplayList = /*@__PURE__*/ S.Array(SensitiveString);
export interface OpeningHoursComponents {
  OpenTime?: string | redacted.Redacted<string>;
  OpenDuration?: string | redacted.Redacted<string>;
  Recurrence?: string | redacted.Redacted<string>;
}
export const OpeningHoursComponents = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OpenTime: S.optional(SensitiveString),
    OpenDuration: S.optional(SensitiveString),
    Recurrence: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "OpeningHoursComponents",
}) as any as S.Schema<OpeningHoursComponents>;
export type OpeningHoursComponentsList = OpeningHoursComponents[];
export const OpeningHoursComponentsList = /*@__PURE__*/ S.Array(
  OpeningHoursComponents,
);
export interface OpeningHours {
  Display?: (string | redacted.Redacted<string>)[];
  OpenNow?: boolean;
  Components?: OpeningHoursComponents[];
  Categories?: Category[];
}
export const OpeningHours = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Display: S.optional(OpeningHoursDisplayList),
    OpenNow: S.optional(S.Boolean),
    Components: S.optional(OpeningHoursComponentsList),
    Categories: S.optional(CategoryList),
  }),
).annotate({ identifier: "OpeningHours" }) as any as S.Schema<OpeningHours>;
export type OpeningHoursList = OpeningHours[];
export const OpeningHoursList = /*@__PURE__*/ S.Array(OpeningHours);
export interface AccessRestriction {
  Restricted?: boolean;
  Categories?: Category[];
}
export const AccessRestriction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Restricted: S.optional(S.Boolean),
    Categories: S.optional(CategoryList),
  }),
).annotate({
  identifier: "AccessRestriction",
}) as any as S.Schema<AccessRestriction>;
export type AccessRestrictionList = AccessRestriction[];
export const AccessRestrictionList = /*@__PURE__*/ S.Array(AccessRestriction);
export interface PhonemeTranscription {
  Value?: string | redacted.Redacted<string>;
  Language?: string;
  Preferred?: boolean;
}
export const PhonemeTranscription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.optional(SensitiveString),
    Language: S.optional(S.String),
    Preferred: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "PhonemeTranscription",
}) as any as S.Schema<PhonemeTranscription>;
export type PhonemeTranscriptionList = PhonemeTranscription[];
export const PhonemeTranscriptionList =
  /*@__PURE__*/ S.Array(PhonemeTranscription);
export interface AddressComponentPhonemes {
  Country?: PhonemeTranscription[];
  Region?: PhonemeTranscription[];
  SubRegion?: PhonemeTranscription[];
  Locality?: PhonemeTranscription[];
  District?: PhonemeTranscription[];
  SubDistrict?: PhonemeTranscription[];
  Block?: PhonemeTranscription[];
  SubBlock?: PhonemeTranscription[];
  Street?: PhonemeTranscription[];
}
export const AddressComponentPhonemes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Country: S.optional(PhonemeTranscriptionList),
    Region: S.optional(PhonemeTranscriptionList),
    SubRegion: S.optional(PhonemeTranscriptionList),
    Locality: S.optional(PhonemeTranscriptionList),
    District: S.optional(PhonemeTranscriptionList),
    SubDistrict: S.optional(PhonemeTranscriptionList),
    Block: S.optional(PhonemeTranscriptionList),
    SubBlock: S.optional(PhonemeTranscriptionList),
    Street: S.optional(PhonemeTranscriptionList),
  }),
).annotate({
  identifier: "AddressComponentPhonemes",
}) as any as S.Schema<AddressComponentPhonemes>;
export interface PhonemeDetails {
  Title?: PhonemeTranscription[];
  Address?: AddressComponentPhonemes;
}
export const PhonemeDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Title: S.optional(PhonemeTranscriptionList),
    Address: S.optional(AddressComponentPhonemes),
  }),
).annotate({ identifier: "PhonemeDetails" }) as any as S.Schema<PhonemeDetails>;
export interface GetPlaceResponse {
  PlaceId: string | redacted.Redacted<string>;
  PlaceType: string | redacted.Redacted<string>;
  Title: string | redacted.Redacted<string>;
  PricingBucket: string;
  Address?: Address;
  AddressNumberCorrected?: boolean;
  PostalCodeDetails?: PostalCodeDetails[];
  Position?: number[];
  MapView?: number[];
  Categories?: Category[];
  FoodTypes?: FoodType[];
  BusinessChains?: BusinessChain[];
  Contacts?: Contacts;
  OpeningHours?: OpeningHours[];
  AccessPoints?: AccessPoint[];
  AccessRestrictions?: AccessRestriction[];
  TimeZone?: TimeZone;
  PoliticalView?: string | redacted.Redacted<string>;
  Phonemes?: PhonemeDetails;
  MainAddress?: RelatedPlace;
  SecondaryAddresses?: RelatedPlace[];
}
export const GetPlaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlaceId: SensitiveString,
    PlaceType: SensitiveString,
    Title: SensitiveString,
    PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
    Address: S.optional(Address),
    AddressNumberCorrected: S.optional(S.Boolean),
    PostalCodeDetails: S.optional(PostalCodeDetailsList),
    Position: S.optional(Position),
    MapView: S.optional(BoundingBox),
    Categories: S.optional(CategoryList),
    FoodTypes: S.optional(FoodTypeList),
    BusinessChains: S.optional(BusinessChainList),
    Contacts: S.optional(Contacts),
    OpeningHours: S.optional(OpeningHoursList),
    AccessPoints: S.optional(AccessPointList),
    AccessRestrictions: S.optional(AccessRestrictionList),
    TimeZone: S.optional(TimeZone),
    PoliticalView: S.optional(SensitiveString),
    Phonemes: S.optional(PhonemeDetails),
    MainAddress: S.optional(RelatedPlace),
    SecondaryAddresses: S.optional(RelatedPlaceList),
  }),
).annotate({
  identifier: "GetPlaceResponse",
}) as any as S.Schema<GetPlaceResponse>;
export type ReverseGeocodeFilterPlaceType = string;
export type ReverseGeocodeFilterPlaceTypeList = string[];
export const ReverseGeocodeFilterPlaceTypeList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface ReverseGeocodeFilter {
  IncludePlaceTypes?: string[];
}
export const ReverseGeocodeFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IncludePlaceTypes: S.optional(ReverseGeocodeFilterPlaceTypeList),
  }),
).annotate({
  identifier: "ReverseGeocodeFilter",
}) as any as S.Schema<ReverseGeocodeFilter>;
export type ReverseGeocodeAdditionalFeature = string;
export type ReverseGeocodeAdditionalFeatureList = string[];
export const ReverseGeocodeAdditionalFeatureList = /*@__PURE__*/ S.Array(
  S.String,
);
export type ReverseGeocodeIntendedUse = string;
export type Heading = number;
export interface ReverseGeocodeRequest {
  QueryPosition: number[];
  QueryRadius?: number;
  MaxResults?: number;
  Filter?: ReverseGeocodeFilter;
  AdditionalFeatures?: string[];
  Language?: string;
  PoliticalView?: string | redacted.Redacted<string>;
  IntendedUse?: string;
  Key?: string | redacted.Redacted<string>;
  Heading?: number;
}
export const ReverseGeocodeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryPosition: Position,
    QueryRadius: S.optional(S.Number),
    MaxResults: S.optional(S.Number),
    Filter: S.optional(ReverseGeocodeFilter),
    AdditionalFeatures: S.optional(ReverseGeocodeAdditionalFeatureList),
    Language: S.optional(S.String),
    PoliticalView: S.optional(SensitiveString),
    IntendedUse: S.optional(S.String),
    Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
    Heading: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/reverse-geocode" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ReverseGeocodeRequest",
}) as any as S.Schema<ReverseGeocodeRequest>;
export interface ReverseGeocodeResultItem {
  PlaceId: string | redacted.Redacted<string>;
  PlaceType: string | redacted.Redacted<string>;
  Title: string | redacted.Redacted<string>;
  Address?: Address;
  AddressNumberCorrected?: boolean;
  PostalCodeDetails?: PostalCodeDetails[];
  Position?: number[];
  Distance?: number;
  MapView?: number[];
  Categories?: Category[];
  FoodTypes?: FoodType[];
  AccessPoints?: AccessPoint[];
  TimeZone?: TimeZone;
  PoliticalView?: string | redacted.Redacted<string>;
  Intersections?: Intersection[];
}
export const ReverseGeocodeResultItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlaceId: SensitiveString,
    PlaceType: SensitiveString,
    Title: SensitiveString,
    Address: S.optional(Address),
    AddressNumberCorrected: S.optional(S.Boolean),
    PostalCodeDetails: S.optional(PostalCodeDetailsList),
    Position: S.optional(Position),
    Distance: S.optional(S.Number),
    MapView: S.optional(BoundingBox),
    Categories: S.optional(CategoryList),
    FoodTypes: S.optional(FoodTypeList),
    AccessPoints: S.optional(AccessPointList),
    TimeZone: S.optional(TimeZone),
    PoliticalView: S.optional(SensitiveString),
    Intersections: S.optional(IntersectionList),
  }),
).annotate({
  identifier: "ReverseGeocodeResultItem",
}) as any as S.Schema<ReverseGeocodeResultItem>;
export type ReverseGeocodeResultItemList = ReverseGeocodeResultItem[];
export const ReverseGeocodeResultItemList = /*@__PURE__*/ S.Array(
  ReverseGeocodeResultItem,
);
export interface ReverseGeocodeResponse {
  PricingBucket: string;
  ResultItems?: ReverseGeocodeResultItem[];
}
export const ReverseGeocodeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
    ResultItems: S.optional(ReverseGeocodeResultItemList),
  }),
).annotate({
  identifier: "ReverseGeocodeResponse",
}) as any as S.Schema<ReverseGeocodeResponse>;
export type FilterCategoryList = (string | redacted.Redacted<string>)[];
export const FilterCategoryList = /*@__PURE__*/ S.Array(SensitiveString);
export type FilterBusinessChainList = (string | redacted.Redacted<string>)[];
export const FilterBusinessChainList = /*@__PURE__*/ S.Array(SensitiveString);
export type FilterFoodTypeList = (string | redacted.Redacted<string>)[];
export const FilterFoodTypeList = /*@__PURE__*/ S.Array(SensitiveString);
export interface SearchNearbyFilter {
  BoundingBox?: number[];
  IncludeCountries?: (string | redacted.Redacted<string>)[];
  IncludeCategories?: (string | redacted.Redacted<string>)[];
  ExcludeCategories?: (string | redacted.Redacted<string>)[];
  IncludeBusinessChains?: (string | redacted.Redacted<string>)[];
  ExcludeBusinessChains?: (string | redacted.Redacted<string>)[];
  IncludeFoodTypes?: (string | redacted.Redacted<string>)[];
  ExcludeFoodTypes?: (string | redacted.Redacted<string>)[];
}
export const SearchNearbyFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BoundingBox: S.optional(BoundingBox),
    IncludeCountries: S.optional(CountryCodeList),
    IncludeCategories: S.optional(FilterCategoryList),
    ExcludeCategories: S.optional(FilterCategoryList),
    IncludeBusinessChains: S.optional(FilterBusinessChainList),
    ExcludeBusinessChains: S.optional(FilterBusinessChainList),
    IncludeFoodTypes: S.optional(FilterFoodTypeList),
    ExcludeFoodTypes: S.optional(FilterFoodTypeList),
  }),
).annotate({
  identifier: "SearchNearbyFilter",
}) as any as S.Schema<SearchNearbyFilter>;
export type SearchNearbyAdditionalFeature = string;
export type SearchNearbyAdditionalFeatureList = string[];
export const SearchNearbyAdditionalFeatureList = /*@__PURE__*/ S.Array(
  S.String,
);
export type SearchNearbyIntendedUse = string;
export type Token = string;
export interface SearchNearbyRequest {
  QueryPosition: number[];
  QueryRadius?: number;
  MaxResults?: number;
  Filter?: SearchNearbyFilter;
  AdditionalFeatures?: string[];
  Language?: string;
  PoliticalView?: string | redacted.Redacted<string>;
  IntendedUse?: string;
  NextToken?: string;
  Key?: string | redacted.Redacted<string>;
}
export const SearchNearbyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryPosition: Position,
    QueryRadius: S.optional(S.Number),
    MaxResults: S.optional(S.Number),
    Filter: S.optional(SearchNearbyFilter),
    AdditionalFeatures: S.optional(SearchNearbyAdditionalFeatureList),
    Language: S.optional(S.String),
    PoliticalView: S.optional(SensitiveString),
    IntendedUse: S.optional(S.String),
    NextToken: S.optional(S.String),
    Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/search-nearby" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchNearbyRequest",
}) as any as S.Schema<SearchNearbyRequest>;
export interface SearchNearbyResultItem {
  PlaceId: string | redacted.Redacted<string>;
  PlaceType: string | redacted.Redacted<string>;
  Title: string | redacted.Redacted<string>;
  Address?: Address;
  AddressNumberCorrected?: boolean;
  Position?: number[];
  Distance?: number;
  MapView?: number[];
  Categories?: Category[];
  FoodTypes?: FoodType[];
  BusinessChains?: BusinessChain[];
  Contacts?: Contacts;
  OpeningHours?: OpeningHours[];
  AccessPoints?: AccessPoint[];
  AccessRestrictions?: AccessRestriction[];
  TimeZone?: TimeZone;
  PoliticalView?: string | redacted.Redacted<string>;
  Phonemes?: PhonemeDetails;
}
export const SearchNearbyResultItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlaceId: SensitiveString,
    PlaceType: SensitiveString,
    Title: SensitiveString,
    Address: S.optional(Address),
    AddressNumberCorrected: S.optional(S.Boolean),
    Position: S.optional(Position),
    Distance: S.optional(S.Number),
    MapView: S.optional(BoundingBox),
    Categories: S.optional(CategoryList),
    FoodTypes: S.optional(FoodTypeList),
    BusinessChains: S.optional(BusinessChainList),
    Contacts: S.optional(Contacts),
    OpeningHours: S.optional(OpeningHoursList),
    AccessPoints: S.optional(AccessPointList),
    AccessRestrictions: S.optional(AccessRestrictionList),
    TimeZone: S.optional(TimeZone),
    PoliticalView: S.optional(SensitiveString),
    Phonemes: S.optional(PhonemeDetails),
  }),
).annotate({
  identifier: "SearchNearbyResultItem",
}) as any as S.Schema<SearchNearbyResultItem>;
export type SearchNearbyResultItemList = SearchNearbyResultItem[];
export const SearchNearbyResultItemList = /*@__PURE__*/ S.Array(
  SearchNearbyResultItem,
);
export interface SearchNearbyResponse {
  PricingBucket: string;
  ResultItems?: SearchNearbyResultItem[];
  NextToken?: string;
}
export const SearchNearbyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
    ResultItems: S.optional(SearchNearbyResultItemList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchNearbyResponse",
}) as any as S.Schema<SearchNearbyResponse>;
export interface SearchTextFilter {
  BoundingBox?: number[];
  Circle?: FilterCircle;
  IncludeCountries?: (string | redacted.Redacted<string>)[];
}
export const SearchTextFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BoundingBox: S.optional(BoundingBox),
    Circle: S.optional(FilterCircle),
    IncludeCountries: S.optional(CountryCodeList),
  }),
).annotate({
  identifier: "SearchTextFilter",
}) as any as S.Schema<SearchTextFilter>;
export type SearchTextAdditionalFeature = string;
export type SearchTextAdditionalFeatureList = string[];
export const SearchTextAdditionalFeatureList = /*@__PURE__*/ S.Array(S.String);
export type SearchTextIntendedUse = string;
export interface SearchTextRequest {
  QueryText?: string | redacted.Redacted<string>;
  QueryId?: string | redacted.Redacted<string>;
  MaxResults?: number;
  BiasPosition?: number[];
  Filter?: SearchTextFilter;
  AdditionalFeatures?: string[];
  Language?: string;
  PoliticalView?: string | redacted.Redacted<string>;
  IntendedUse?: string;
  NextToken?: string;
  Key?: string | redacted.Redacted<string>;
}
export const SearchTextRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryText: S.optional(SensitiveString),
    QueryId: S.optional(SensitiveString),
    MaxResults: S.optional(S.Number),
    BiasPosition: S.optional(Position),
    Filter: S.optional(SearchTextFilter),
    AdditionalFeatures: S.optional(SearchTextAdditionalFeatureList),
    Language: S.optional(S.String),
    PoliticalView: S.optional(SensitiveString),
    IntendedUse: S.optional(S.String),
    NextToken: S.optional(S.String),
    Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/search-text" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchTextRequest",
}) as any as S.Schema<SearchTextRequest>;
export interface SearchTextResultItem {
  PlaceId: string | redacted.Redacted<string>;
  PlaceType: string | redacted.Redacted<string>;
  Title: string | redacted.Redacted<string>;
  Address?: Address;
  AddressNumberCorrected?: boolean;
  Position?: number[];
  Distance?: number;
  MapView?: number[];
  Categories?: Category[];
  FoodTypes?: FoodType[];
  BusinessChains?: BusinessChain[];
  Contacts?: Contacts;
  OpeningHours?: OpeningHours[];
  AccessPoints?: AccessPoint[];
  AccessRestrictions?: AccessRestriction[];
  TimeZone?: TimeZone;
  PoliticalView?: string | redacted.Redacted<string>;
  Phonemes?: PhonemeDetails;
}
export const SearchTextResultItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlaceId: SensitiveString,
    PlaceType: SensitiveString,
    Title: SensitiveString,
    Address: S.optional(Address),
    AddressNumberCorrected: S.optional(S.Boolean),
    Position: S.optional(Position),
    Distance: S.optional(S.Number),
    MapView: S.optional(BoundingBox),
    Categories: S.optional(CategoryList),
    FoodTypes: S.optional(FoodTypeList),
    BusinessChains: S.optional(BusinessChainList),
    Contacts: S.optional(Contacts),
    OpeningHours: S.optional(OpeningHoursList),
    AccessPoints: S.optional(AccessPointList),
    AccessRestrictions: S.optional(AccessRestrictionList),
    TimeZone: S.optional(TimeZone),
    PoliticalView: S.optional(SensitiveString),
    Phonemes: S.optional(PhonemeDetails),
  }),
).annotate({
  identifier: "SearchTextResultItem",
}) as any as S.Schema<SearchTextResultItem>;
export type SearchTextResultItemList = SearchTextResultItem[];
export const SearchTextResultItemList =
  /*@__PURE__*/ S.Array(SearchTextResultItem);
export interface SearchTextResponse {
  PricingBucket: string;
  ResultItems?: SearchTextResultItem[];
  NextToken?: string;
}
export const SearchTextResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
    ResultItems: S.optional(SearchTextResultItemList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchTextResponse",
}) as any as S.Schema<SearchTextResponse>;
export interface SuggestFilter {
  BoundingBox?: number[];
  Circle?: FilterCircle;
  IncludeCountries?: (string | redacted.Redacted<string>)[];
}
export const SuggestFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BoundingBox: S.optional(BoundingBox),
    Circle: S.optional(FilterCircle),
    IncludeCountries: S.optional(CountryCodeList),
  }),
).annotate({ identifier: "SuggestFilter" }) as any as S.Schema<SuggestFilter>;
export type SuggestAdditionalFeature = string;
export type SuggestAdditionalFeatureList = string[];
export const SuggestAdditionalFeatureList = /*@__PURE__*/ S.Array(S.String);
export type SuggestIntendedUse = string;
export interface SuggestRequest {
  QueryText: string | redacted.Redacted<string>;
  MaxResults?: number;
  MaxQueryRefinements?: number;
  BiasPosition?: number[];
  Filter?: SuggestFilter;
  AdditionalFeatures?: string[];
  Language?: string;
  PoliticalView?: string | redacted.Redacted<string>;
  IntendedUse?: string;
  Key?: string | redacted.Redacted<string>;
}
export const SuggestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryText: SensitiveString,
    MaxResults: S.optional(S.Number),
    MaxQueryRefinements: S.optional(S.Number),
    BiasPosition: S.optional(Position),
    Filter: S.optional(SuggestFilter),
    AdditionalFeatures: S.optional(SuggestAdditionalFeatureList),
    Language: S.optional(S.String),
    PoliticalView: S.optional(SensitiveString),
    IntendedUse: S.optional(S.String),
    Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/suggest" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "SuggestRequest" }) as any as S.Schema<SuggestRequest>;
export type SuggestResultItemType = string;
export interface SuggestPlaceResult {
  PlaceId?: string | redacted.Redacted<string>;
  PlaceType?: string | redacted.Redacted<string>;
  Address?: Address;
  Position?: number[];
  Distance?: number;
  MapView?: number[];
  Categories?: Category[];
  FoodTypes?: FoodType[];
  BusinessChains?: BusinessChain[];
  AccessPoints?: AccessPoint[];
  AccessRestrictions?: AccessRestriction[];
  TimeZone?: TimeZone;
  PoliticalView?: string | redacted.Redacted<string>;
  Phonemes?: PhonemeDetails;
}
export const SuggestPlaceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlaceId: S.optional(SensitiveString),
    PlaceType: S.optional(SensitiveString),
    Address: S.optional(Address),
    Position: S.optional(Position),
    Distance: S.optional(S.Number),
    MapView: S.optional(BoundingBox),
    Categories: S.optional(CategoryList),
    FoodTypes: S.optional(FoodTypeList),
    BusinessChains: S.optional(BusinessChainList),
    AccessPoints: S.optional(AccessPointList),
    AccessRestrictions: S.optional(AccessRestrictionList),
    TimeZone: S.optional(TimeZone),
    PoliticalView: S.optional(SensitiveString),
    Phonemes: S.optional(PhonemeDetails),
  }),
).annotate({
  identifier: "SuggestPlaceResult",
}) as any as S.Schema<SuggestPlaceResult>;
export type QueryType = string;
export interface SuggestQueryResult {
  QueryId?: string | redacted.Redacted<string>;
  QueryType?: string;
}
export const SuggestQueryResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryId: S.optional(SensitiveString),
    QueryType: S.optional(S.String),
  }),
).annotate({
  identifier: "SuggestQueryResult",
}) as any as S.Schema<SuggestQueryResult>;
export interface SuggestAddressHighlights {
  Label?: Highlight[];
}
export const SuggestAddressHighlights = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Label: S.optional(HighlightList) }),
).annotate({
  identifier: "SuggestAddressHighlights",
}) as any as S.Schema<SuggestAddressHighlights>;
export interface SuggestHighlights {
  Title?: Highlight[];
  Address?: SuggestAddressHighlights;
}
export const SuggestHighlights = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Title: S.optional(HighlightList),
    Address: S.optional(SuggestAddressHighlights),
  }),
).annotate({
  identifier: "SuggestHighlights",
}) as any as S.Schema<SuggestHighlights>;
export interface SuggestResultItem {
  Title: string | redacted.Redacted<string>;
  SuggestResultItemType: string;
  Place?: SuggestPlaceResult;
  Query?: SuggestQueryResult;
  Highlights?: SuggestHighlights;
}
export const SuggestResultItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Title: SensitiveString,
    SuggestResultItemType: S.String,
    Place: S.optional(SuggestPlaceResult),
    Query: S.optional(SuggestQueryResult),
    Highlights: S.optional(SuggestHighlights),
  }),
).annotate({
  identifier: "SuggestResultItem",
}) as any as S.Schema<SuggestResultItem>;
export type SuggestResultItemList = SuggestResultItem[];
export const SuggestResultItemList = /*@__PURE__*/ S.Array(SuggestResultItem);
export interface QueryRefinement {
  RefinedTerm: string | redacted.Redacted<string>;
  OriginalTerm: string | redacted.Redacted<string>;
  StartIndex: number;
  EndIndex: number;
}
export const QueryRefinement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RefinedTerm: SensitiveString,
    OriginalTerm: SensitiveString,
    StartIndex: S.Number,
    EndIndex: S.Number,
  }),
).annotate({
  identifier: "QueryRefinement",
}) as any as S.Schema<QueryRefinement>;
export type QueryRefinementList = QueryRefinement[];
export const QueryRefinementList = /*@__PURE__*/ S.Array(QueryRefinement);
export interface SuggestResponse {
  PricingBucket: string;
  ResultItems?: SuggestResultItem[];
  QueryRefinements?: QueryRefinement[];
}
export const SuggestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
    ResultItems: S.optional(SuggestResultItemList),
    QueryRefinements: S.optional(QueryRefinementList),
  }),
).annotate({
  identifier: "SuggestResponse",
}) as any as S.Schema<SuggestResponse>;
export type ValidationExceptionReason = string;
export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Message: S.String }).pipe(
    S.encodeKeys({ Name: "name", Message: "message" }),
  ),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type AutocompleteError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `Autocomplete` completes potential places and addresses as the user types, based on the partial input. The API enhances the efficiency and accuracy of address by completing query based on a few entered keystrokes. It helps you by completing partial queries with valid address completion. Also, the API supports the filtering of results based on geographic location, country, or specific place types, and can be tailored using optional parameters like language and political views.
 *
 * For more information, see Autocomplete in the *Amazon Location Service Developer Guide*.
 */
export const autocomplete: API.OperationMethod<
  AutocompleteRequest,
  AutocompleteResponse,
  AutocompleteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AutocompleteRequest,
  output: AutocompleteResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Autocomplete",
}));

export type GeocodeError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `Geocode` converts a textual address or place into geographic coordinates. You can obtain geographic coordinates, address component, and other related information. It supports flexible queries, including free-form text or structured queries with components like street names, postal codes, and regions. The Geocode API can also provide additional features such as time zone information and the inclusion of political views.
 *
 * For more information, see Geocode in the *Amazon Location Service Developer Guide*.
 */
export const geocode: API.OperationMethod<
  GeocodeRequest,
  GeocodeResponse,
  GeocodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GeocodeRequest,
  output: GeocodeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Geocode",
}));

export type GetPlaceError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `GetPlace` finds a place by its unique ID. A `PlaceId` is returned by other place operations.
 *
 * For more information, see GetPlace in the *Amazon Location Service Developer Guide*.
 */
export const getPlace: API.OperationMethod<
  GetPlaceRequest,
  GetPlaceResponse,
  GetPlaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPlaceRequest,
  output: GetPlaceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlace",
}));

export type ReverseGeocodeError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `ReverseGeocode` converts geographic coordinates into a human-readable address or place. You can obtain address component, and other related information such as place type, category, street information. The Reverse Geocode API supports filtering to on place type so that you can refine result based on your need. Also, The Reverse Geocode API can also provide additional features such as time zone information and the inclusion of political views.
 *
 * For more information, see Reverse Geocode in the *Amazon Location Service Developer Guide*.
 */
export const reverseGeocode: API.OperationMethod<
  ReverseGeocodeRequest,
  ReverseGeocodeResponse,
  ReverseGeocodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ReverseGeocodeRequest,
  output: ReverseGeocodeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReverseGeocode",
}));

export type SearchNearbyError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `SearchNearby` queries for points of interest within a radius from a central coordinates, returning place results with optional filters such as categories, business chains, food types and more. The API returns details such as a place name, address, phone, category, food type, contact, opening hours. Also, the API can return phonemes, time zones and more based on requested parameters.
 *
 * For more information, see Search Nearby in the *Amazon Location Service Developer Guide*.
 */
export const searchNearby: API.OperationMethod<
  SearchNearbyRequest,
  SearchNearbyResponse,
  SearchNearbyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SearchNearbyRequest,
  output: SearchNearbyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchNearby",
}));

export type SearchTextError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `SearchText` searches for geocode and place information. You can then complete a follow-up query suggested from the `Suggest` API via a query id.
 *
 * For more information, see Search Text in the *Amazon Location Service Developer Guide*.
 */
export const searchText: API.OperationMethod<
  SearchTextRequest,
  SearchTextResponse,
  SearchTextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SearchTextRequest,
  output: SearchTextResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchText",
}));

export type SuggestError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `Suggest` provides intelligent predictions or recommendations based on the user's input or context, such as relevant places, points of interest, query terms or search category. It is designed to help users find places or point of interests candidates or identify a follow on query based on incomplete or misspelled queries. It returns a list of possible matches or refinements that can be used to formulate a more accurate query. Users can select the most appropriate suggestion and use it for further searching. The API provides options for filtering results by location and other attributes, and allows for additional features like phonemes and timezones. The response includes refined query terms and detailed place information.
 *
 * For more information, see Suggest in the *Amazon Location Service Developer Guide*.
 */
export const suggest: API.OperationMethod<
  SuggestRequest,
  SuggestResponse,
  SuggestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SuggestRequest,
  output: SuggestResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Suggest",
}));
