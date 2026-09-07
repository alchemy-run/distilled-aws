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
  sdkId: "Pricing",
  serviceShapeName: "AWSPriceListService",
});
const auth = T.AwsAuthSigv4({ name: "pricing" });
const ver = T.ServiceVersion("2017-10-15");
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
              `https://api.pricing-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://api.pricing-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://api.pricing.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        if ("aws" === _.getAttr(PartitionResult, "name")) {
          return e(`https://api.pricing.${Region}.amazonaws.com`);
        }
        return e(
          `https://api.pricing.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class ExpiredNextTokenException
  extends /*@__PURE__*/ S.TaggedError<ExpiredNextTokenException>()(
    "ExpiredNextTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalErrorException>()(
    "InternalErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export type FormatVersion = string;
export type DescribeServicesMaxResults = number;
export interface DescribeServicesRequest {
  ServiceCode?: string;
  FormatVersion?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeServicesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceCode: S.optional(S.String),
    FormatVersion: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeServicesRequest",
}) as any as S.Schema<DescribeServicesRequest>;
export type AttributeNameList = string[];
export const AttributeNameList = /*@__PURE__*/ S.Array(S.String);
export interface Service {
  ServiceCode: string;
  AttributeNames?: string[];
}
export const Service = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceCode: S.String,
    AttributeNames: S.optional(AttributeNameList),
  }),
).annotate({ identifier: "Service" }) as any as S.Schema<Service>;
export type ServiceList = Service[];
export const ServiceList = /*@__PURE__*/ S.Array(Service);
export interface DescribeServicesResponse {
  Services?: Service[];
  FormatVersion?: string;
  NextToken?: string;
}
export const DescribeServicesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Services: S.optional(ServiceList),
    FormatVersion: S.optional(S.String),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeServicesResponse",
}) as any as S.Schema<DescribeServicesResponse>;
export type GetAttributeValuesMaxResults = number;
export interface GetAttributeValuesRequest {
  ServiceCode: string;
  AttributeName: string;
  NextToken?: string;
  MaxResults?: number;
}
export const GetAttributeValuesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceCode: S.String,
    AttributeName: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAttributeValuesRequest",
}) as any as S.Schema<GetAttributeValuesRequest>;
export interface AttributeValue {
  Value?: string;
}
export const AttributeValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.optional(S.String) }),
).annotate({ identifier: "AttributeValue" }) as any as S.Schema<AttributeValue>;
export type AttributeValueList = AttributeValue[];
export const AttributeValueList = /*@__PURE__*/ S.Array(AttributeValue);
export interface GetAttributeValuesResponse {
  AttributeValues?: AttributeValue[];
  NextToken?: string;
}
export const GetAttributeValuesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributeValues: S.optional(AttributeValueList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetAttributeValuesResponse",
}) as any as S.Schema<GetAttributeValuesResponse>;
export type PriceListArn = string;
export type FileFormat = string;
export interface GetPriceListFileUrlRequest {
  PriceListArn: string;
  FileFormat: string;
}
export const GetPriceListFileUrlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PriceListArn: S.String, FileFormat: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetPriceListFileUrlRequest",
}) as any as S.Schema<GetPriceListFileUrlRequest>;
export interface GetPriceListFileUrlResponse {
  Url?: string;
}
export const GetPriceListFileUrlResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Url: S.optional(S.String) }),
).annotate({
  identifier: "GetPriceListFileUrlResponse",
}) as any as S.Schema<GetPriceListFileUrlResponse>;
export type FilterType =
  | "TERM_MATCH"
  | "EQUALS"
  | "CONTAINS"
  | "ANY_OF"
  | "NONE_OF"
  | (string & {});
export const FilterType = /*@__PURE__*/ S.String;

export type Field = string;
export type Value = string;
export interface Filter {
  Type: FilterType;
  Field: string;
  Value: string;
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: FilterType, Field: S.String, Value: S.String }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type Filters = Filter[];
export const Filters = /*@__PURE__*/ S.Array(Filter);
export type GetProductsMaxResults = number;
export interface GetProductsRequest {
  ServiceCode: string;
  Filters?: Filter[];
  FormatVersion?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const GetProductsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceCode: S.String,
    Filters: S.optional(Filters),
    FormatVersion: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetProductsRequest",
}) as any as S.Schema<GetProductsRequest>;
export type SynthesizedJsonPriceListJsonItem = string;
export type PriceListJsonItems = string[];
export const PriceListJsonItems = /*@__PURE__*/ S.Array(S.String);
export interface GetProductsResponse {
  FormatVersion?: string;
  PriceList?: string[];
  NextToken?: string;
}
export const GetProductsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FormatVersion: S.optional(S.String),
    PriceList: S.optional(PriceListJsonItems),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetProductsResponse",
}) as any as S.Schema<GetProductsResponse>;
export type ServiceCode = string;
export type EffectiveDate = Date;
export type RegionCode = string;
export type CurrencyCode = string;
export type MaxResults = number;
export interface ListPriceListsRequest {
  ServiceCode: string;
  EffectiveDate: Date;
  RegionCode?: string;
  CurrencyCode: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListPriceListsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceCode: S.String,
    EffectiveDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    RegionCode: S.optional(S.String),
    CurrencyCode: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPriceListsRequest",
}) as any as S.Schema<ListPriceListsRequest>;
export type FileFormats = string[];
export const FileFormats = /*@__PURE__*/ S.Array(S.String);
export interface PriceList {
  PriceListArn?: string;
  RegionCode?: string;
  CurrencyCode?: string;
  FileFormats?: string[];
}
export const PriceList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PriceListArn: S.optional(S.String),
    RegionCode: S.optional(S.String),
    CurrencyCode: S.optional(S.String),
    FileFormats: S.optional(FileFormats),
  }),
).annotate({ identifier: "PriceList" }) as any as S.Schema<PriceList>;
export type PriceLists = PriceList[];
export const PriceLists = /*@__PURE__*/ S.Array(PriceList);
export interface ListPriceListsResponse {
  PriceLists?: PriceList[];
  NextToken?: string;
}
export const ListPriceListsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PriceLists: S.optional(PriceLists),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPriceListsResponse",
}) as any as S.Schema<ListPriceListsResponse>;
export type ErrorMessage = string;
export type DescribeServicesError =
  | AccessDeniedException
  | ExpiredNextTokenException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the metadata for one service or a list of the metadata for all services. Use this without a service code to get the service codes for all services. Use it with a service code, such as `AmazonEC2`, to get information specific to that service, such as the attribute names available for that service. For example, some of the attribute names available for EC2 are `volumeType`, `maxIopsVolume`, `operation`, `locationType`, and `instanceCapacity10xlarge`.
 */
export const describeServices: API.PaginatedOperationMethod<
  DescribeServicesRequest,
  DescribeServicesResponse,
  DescribeServicesError,
  Credentials | HttpClient.HttpClient,
  Service
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeServicesRequest,
  output: DescribeServicesResponse,
  errors: [
    AccessDeniedException,
    ExpiredNextTokenException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Services",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetAttributeValuesError =
  | AccessDeniedException
  | ExpiredNextTokenException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of attribute values. Attributes are similar to the details in a Price List API offer file. For a list of available attributes, see Offer File Definitions in the Billing and Cost Management User Guide.
 */
export const getAttributeValues: API.PaginatedOperationMethod<
  GetAttributeValuesRequest,
  GetAttributeValuesResponse,
  GetAttributeValuesError,
  Credentials | HttpClient.HttpClient,
  AttributeValue
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetAttributeValuesRequest,
  output: GetAttributeValuesResponse,
  errors: [
    AccessDeniedException,
    ExpiredNextTokenException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAttributeValues",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AttributeValues",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetPriceListFileUrlError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * * **This feature is in preview release and is subject to change. Your use of Amazon Web Services Price List API is subject to the Beta Service Participation terms of the Amazon Web Services Service Terms (Section 1.10).** *
 *
 * This returns the URL that you can retrieve your Price List file from. This URL is based on the `PriceListArn` and `FileFormat` that you retrieve from the ListPriceLists response.
 */
export const getPriceListFileUrl: API.OperationMethod<
  GetPriceListFileUrlRequest,
  GetPriceListFileUrlResponse,
  GetPriceListFileUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPriceListFileUrlRequest,
  output: GetPriceListFileUrlResponse,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPriceListFileUrl",
}));

export type GetProductsError =
  | AccessDeniedException
  | ExpiredNextTokenException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of all products that match the filter criteria.
 */
export const getProducts: API.PaginatedOperationMethod<
  GetProductsRequest,
  GetProductsResponse,
  GetProductsError,
  Credentials | HttpClient.HttpClient,
  SynthesizedJsonPriceListJsonItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetProductsRequest,
  output: GetProductsResponse,
  errors: [
    AccessDeniedException,
    ExpiredNextTokenException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProducts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PriceList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPriceListsError =
  | AccessDeniedException
  | ExpiredNextTokenException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | NotFoundException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * * **This feature is in preview release and is subject to change. Your use of Amazon Web Services Price List API is subject to the Beta Service Participation terms of the Amazon Web Services Service Terms (Section 1.10).** *
 *
 * This returns a list of Price List references that the requester if authorized to view, given a `ServiceCode`, `CurrencyCode`, and an `EffectiveDate`. Use without a `RegionCode` filter to list Price List references from all available Amazon Web Services Regions. Use with a `RegionCode` filter to get the Price List reference that's specific to a specific Amazon Web Services Region. You can use the `PriceListArn` from the response to get your preferred Price List files through the GetPriceListFileUrl API.
 */
export const listPriceLists: API.PaginatedOperationMethod<
  ListPriceListsRequest,
  ListPriceListsResponse,
  ListPriceListsError,
  Credentials | HttpClient.HttpClient,
  PriceList
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPriceListsRequest,
  output: ListPriceListsResponse,
  errors: [
    AccessDeniedException,
    ExpiredNextTokenException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    NotFoundException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPriceLists",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PriceLists",
    pageSize: "MaxResults",
  } as const,
})) as any;
