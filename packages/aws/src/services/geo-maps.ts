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
  sdkId: "Geo Maps",
  serviceShapeName: "MapsService",
});
const auth = T.AwsAuthSigv4({ name: "geo-maps" });
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
            `https://maps.geo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}/v2`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === true &&
          UseDualStack === true
        ) {
          return e(
            `https://maps.geo-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}/v2`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === true &&
          UseDualStack === false
        ) {
          return e(
            `https://maps.geo-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}/v2`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://maps.geo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}/v2`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            `https://maps.geo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}/v2`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === true &&
          UseDualStack === true
        ) {
          return e(
            `https://maps.geo-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}/v2`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === true &&
          UseDualStack === false
        ) {
          return e(
            `https://maps.geo-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}/v2`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://maps.geo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}/v2`,
          );
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://geo-maps-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://geo-maps-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://geo-maps.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://geo-maps.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
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
export interface GetGlyphsRequest {
  FontStack: string;
  FontUnicodeRange: string;
}
export const GetGlyphsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FontStack: S.String.pipe(T.HttpLabel("FontStack")),
    FontUnicodeRange: S.String.pipe(T.HttpLabel("FontUnicodeRange")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/glyphs/{FontStack}/{FontUnicodeRange}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGlyphsRequest",
}) as any as S.Schema<GetGlyphsRequest>;
export interface GetGlyphsResponse {
  Blob?: Uint8Array;
  ContentType?: string;
  CacheControl?: string;
  ETag?: string;
}
export const GetGlyphsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Blob: S.optional(T.Blob).pipe(T.HttpPayload()),
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    CacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
    ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
  }),
).annotate({
  identifier: "GetGlyphsResponse",
}) as any as S.Schema<GetGlyphsResponse>;
export type MapStyle = string;
export type ColorScheme = string;
export type Variant = string;
export interface GetSpritesRequest {
  FileName: string;
  Style: string;
  ColorScheme: string;
  Variant: string;
}
export const GetSpritesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileName: S.String.pipe(T.HttpLabel("FileName")),
    Style: S.String.pipe(T.HttpLabel("Style")),
    ColorScheme: S.String.pipe(T.HttpLabel("ColorScheme")),
    Variant: S.String.pipe(T.HttpLabel("Variant")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/styles/{Style}/{ColorScheme}/{Variant}/sprites/{FileName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSpritesRequest",
}) as any as S.Schema<GetSpritesRequest>;
export interface GetSpritesResponse {
  Blob?: Uint8Array;
  ContentType?: string;
  CacheControl?: string;
  ETag?: string;
}
export const GetSpritesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Blob: S.optional(T.Blob).pipe(T.HttpPayload()),
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    CacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
    ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
  }),
).annotate({
  identifier: "GetSpritesResponse",
}) as any as S.Schema<GetSpritesResponse>;
export type PositionListString = string | redacted.Redacted<string>;
export type PositionString = string | redacted.Redacted<string>;
export type CompactOverlay = string | redacted.Redacted<string>;
export type GeoJsonOverlay = string | redacted.Redacted<string>;
export type SensitiveInteger = number;
export type ApiKey = string | redacted.Redacted<string>;
export type LabelSize = string;
export type LanguageTag = string;
export type CountryCode = string | redacted.Redacted<string>;
export type MapFeatureMode = string;
export type DistanceMeters = number;
export type ScaleBarUnit = string;
export type StaticMapStyle = string;
export type SensitiveFloat = number;
export interface GetStaticMapRequest {
  BoundingBox?: string | redacted.Redacted<string>;
  BoundedPositions?: string | redacted.Redacted<string>;
  Center?: string | redacted.Redacted<string>;
  ColorScheme?: string;
  CompactOverlay?: string | redacted.Redacted<string>;
  CropLabels?: boolean;
  GeoJsonOverlay?: string | redacted.Redacted<string>;
  Height: number;
  Key?: string | redacted.Redacted<string>;
  LabelSize?: string;
  Language?: string;
  Padding?: number;
  PoliticalView?: string | redacted.Redacted<string>;
  PointsOfInterests?: string;
  Radius?: number;
  FileName: string;
  ScaleBarUnit?: string;
  Style?: string;
  Width: number;
  Zoom?: number;
}
export const GetStaticMapRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BoundingBox: S.optional(SensitiveString).pipe(T.HttpQuery("bounding-box")),
    BoundedPositions: S.optional(SensitiveString).pipe(
      T.HttpQuery("bounded-positions"),
    ),
    Center: S.optional(SensitiveString).pipe(T.HttpQuery("center")),
    ColorScheme: S.optional(S.String).pipe(T.HttpQuery("color-scheme")),
    CompactOverlay: S.optional(SensitiveString).pipe(
      T.HttpQuery("compact-overlay"),
    ),
    CropLabels: S.optional(S.Boolean).pipe(T.HttpQuery("crop-labels")),
    GeoJsonOverlay: S.optional(SensitiveString).pipe(
      T.HttpQuery("geojson-overlay"),
    ),
    Height: S.Number.pipe(T.HttpQuery("height")),
    Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
    LabelSize: S.optional(S.String).pipe(T.HttpQuery("label-size")),
    Language: S.optional(S.String).pipe(T.HttpQuery("lang")),
    Padding: S.optional(S.Number).pipe(T.HttpQuery("padding")),
    PoliticalView: S.optional(SensitiveString).pipe(
      T.HttpQuery("political-view"),
    ),
    PointsOfInterests: S.optional(S.String).pipe(T.HttpQuery("pois")),
    Radius: S.optional(S.Number).pipe(T.HttpQuery("radius")),
    FileName: S.String.pipe(T.HttpLabel("FileName")),
    ScaleBarUnit: S.optional(S.String).pipe(T.HttpQuery("scale-unit")),
    Style: S.optional(S.String).pipe(T.HttpQuery("style")),
    Width: S.Number.pipe(T.HttpQuery("width")),
    Zoom: S.optional(S.Number).pipe(T.HttpQuery("zoom")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/static/{FileName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetStaticMapRequest",
}) as any as S.Schema<GetStaticMapRequest>;
export interface GetStaticMapResponse {
  Blob?: Uint8Array;
  ContentType?: string;
  CacheControl?: string;
  ETag?: string;
  PricingBucket: string;
}
export const GetStaticMapResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Blob: S.optional(T.Blob).pipe(T.HttpPayload()),
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    CacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
    ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
    PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
  }),
).annotate({
  identifier: "GetStaticMapResponse",
}) as any as S.Schema<GetStaticMapResponse>;
export type Terrain = string;
export type ContourDensity = string;
export type Traffic = string;
export type TravelMode = string;
export type TravelModeList = string[];
export const TravelModeList = /*@__PURE__*/ S.Array(S.String);
export type Buildings = string;
export interface GetStyleDescriptorRequest {
  Style: string;
  ColorScheme?: string;
  PoliticalView?: string | redacted.Redacted<string>;
  Terrain?: string;
  ContourDensity?: string;
  Traffic?: string;
  TravelModes?: string[];
  Buildings?: string;
  Key?: string | redacted.Redacted<string>;
}
export const GetStyleDescriptorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Style: S.String.pipe(T.HttpLabel("Style")),
    ColorScheme: S.optional(S.String).pipe(T.HttpQuery("color-scheme")),
    PoliticalView: S.optional(SensitiveString).pipe(
      T.HttpQuery("political-view"),
    ),
    Terrain: S.optional(S.String).pipe(T.HttpQuery("terrain")),
    ContourDensity: S.optional(S.String).pipe(T.HttpQuery("contour-density")),
    Traffic: S.optional(S.String).pipe(T.HttpQuery("traffic")),
    TravelModes: S.optional(TravelModeList).pipe(T.HttpQuery("travel-modes")),
    Buildings: S.optional(S.String).pipe(T.HttpQuery("buildings")),
    Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/styles/{Style}/descriptor" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetStyleDescriptorRequest",
}) as any as S.Schema<GetStyleDescriptorRequest>;
export interface GetStyleDescriptorResponse {
  Blob?: Uint8Array;
  ContentType?: string;
  CacheControl?: string;
  ETag?: string;
}
export const GetStyleDescriptorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Blob: S.optional(T.Blob).pipe(T.HttpPayload()),
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    CacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
    ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
  }),
).annotate({
  identifier: "GetStyleDescriptorResponse",
}) as any as S.Schema<GetStyleDescriptorResponse>;
export type TileAdditionalFeature = string;
export type TileAdditionalFeatureList = string[];
export const TileAdditionalFeatureList = /*@__PURE__*/ S.Array(S.String);
export type Tileset = string;
export type SensitiveString = string | redacted.Redacted<string>;
export interface GetTileRequest {
  AdditionalFeatures?: string[];
  Tileset: string;
  Z: string | redacted.Redacted<string>;
  X: string | redacted.Redacted<string>;
  Y: string | redacted.Redacted<string>;
  Key?: string | redacted.Redacted<string>;
}
export const GetTileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdditionalFeatures: S.optional(TileAdditionalFeatureList).pipe(
      T.HttpQuery("additional-features"),
    ),
    Tileset: S.String.pipe(T.HttpLabel("Tileset")),
    Z: SensitiveString.pipe(T.HttpLabel("Z")),
    X: SensitiveString.pipe(T.HttpLabel("X")),
    Y: SensitiveString.pipe(T.HttpLabel("Y")),
    Key: S.optional(SensitiveString).pipe(T.HttpQuery("key")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tiles/{Tileset}/{Z}/{X}/{Y}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetTileRequest" }) as any as S.Schema<GetTileRequest>;
export interface GetTileResponse {
  Blob?: Uint8Array;
  ContentType?: string;
  CacheControl?: string;
  ETag?: string;
  PricingBucket: string;
}
export const GetTileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Blob: S.optional(T.Blob).pipe(T.HttpPayload()),
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    CacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
    ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
    PricingBucket: S.String.pipe(T.HttpHeader("x-amz-geo-pricing-bucket")),
  }),
).annotate({
  identifier: "GetTileResponse",
}) as any as S.Schema<GetTileResponse>;
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
export type GetGlyphsError = CommonErrors;
/**
 * `GetGlyphs` returns the map's glyphs.
 *
 * For more information, see Style labels with glyphs in the *Amazon Location Service Developer Guide*.
 */
export const getGlyphs: API.OperationMethod<
  GetGlyphsRequest,
  GetGlyphsResponse,
  GetGlyphsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGlyphsRequest,
  output: GetGlyphsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGlyphs",
}));

export type GetSpritesError = CommonErrors;
/**
 * `GetSprites` returns the map's sprites.
 *
 * For more information, see Style iconography with sprites in the *Amazon Location Service Developer Guide*.
 */
export const getSprites: API.OperationMethod<
  GetSpritesRequest,
  GetSpritesResponse,
  GetSpritesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSpritesRequest,
  output: GetSpritesResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSprites",
}));

export type GetStaticMapError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation is not supported in `ap-southeast-1` and `ap-southeast-5` regions for GrabMaps customers.
 *
 * `GetStaticMap` provides high-quality static map images with customizable options. You can modify the map's appearance and overlay additional information. It's an ideal solution for applications requiring tailored static map snapshots.
 *
 * For more information, see the following topics in the *Amazon Location Service Developer Guide*:
 *
 * - Static maps
 *
 * - Customize static maps
 *
 * - Overlay on the static map
 */
export const getStaticMap: API.OperationMethod<
  GetStaticMapRequest,
  GetStaticMapResponse,
  GetStaticMapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStaticMapRequest,
  output: GetStaticMapResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStaticMap",
}));

export type GetStyleDescriptorError = CommonErrors;
/**
 * `GetStyleDescriptor` returns information about the style.
 *
 * For more information, see Style dynamic maps in the *Amazon Location Service Developer Guide*.
 */
export const getStyleDescriptor: API.OperationMethod<
  GetStyleDescriptorRequest,
  GetStyleDescriptorResponse,
  GetStyleDescriptorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStyleDescriptorRequest,
  output: GetStyleDescriptorResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStyleDescriptor",
}));

export type GetTileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * `GetTile` returns a tile. Map tiles are used by clients to render a map. They're addressed using a grid arrangement with an X coordinate, Y coordinate, and Z (zoom) level.
 *
 * For more information, see Tiles in the *Amazon Location Service Developer Guide*.
 */
export const getTile: API.OperationMethod<
  GetTileRequest,
  GetTileResponse,
  GetTileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTileRequest,
  output: GetTileResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTile",
}));
