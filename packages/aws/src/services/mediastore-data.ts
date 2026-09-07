import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace(
  "https://object.mediastore.amazonaws.com/doc/2017-09-01",
);
const svc = T.AwsApiService({
  sdkId: "MediaStore Data",
  serviceShapeName: "MediaStoreObject_20170901",
});
const auth = T.AwsAuthSigv4({ name: "mediastore" });
const ver = T.ServiceVersion("2017-09-01");
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
              `https://data.mediastore-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://data.mediastore-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://data.mediastore.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://data.mediastore.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ContainerNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ContainerNotFoundException>()(
    "ContainerNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()(
    "InternalServerError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ObjectNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ObjectNotFoundException>()(
    "ObjectNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class RequestedRangeNotSatisfiableException
  extends /*@__PURE__*/ S.TaggedError<RequestedRangeNotSatisfiableException>()(
    "RequestedRangeNotSatisfiableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(416),
  ) {}
export type PathNaming = string;
export interface DeleteObjectRequest {
  Path: string;
}
export const DeleteObjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Path: S.String.pipe(T.HttpLabel("Path")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/{Path+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteObjectRequest",
}) as any as S.Schema<DeleteObjectRequest>;
export interface DeleteObjectResponse {}
export const DeleteObjectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteObjectResponse",
}) as any as S.Schema<DeleteObjectResponse>;
export interface DescribeObjectRequest {
  Path: string;
}
export const DescribeObjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Path: S.String.pipe(T.HttpLabel("Path")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "HEAD", uri: "/{Path+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeObjectRequest",
}) as any as S.Schema<DescribeObjectRequest>;
export type ETag = string;
export type ContentType = string;
export type NonNegativeLong = number;
export type StringPrimitive = string;
export interface DescribeObjectResponse {
  ETag?: string;
  ContentType?: string;
  ContentLength?: number;
  CacheControl?: string;
  LastModified?: Date;
}
export const DescribeObjectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    ContentLength: S.optional(S.Number).pipe(T.HttpHeader("Content-Length")),
    CacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
    LastModified: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
      T.HttpHeader("Last-Modified"),
    ),
  }).pipe(ns),
).annotate({
  identifier: "DescribeObjectResponse",
}) as any as S.Schema<DescribeObjectResponse>;
export type RangePattern = string;
export interface GetObjectRequest {
  Path: string;
  Range?: string;
}
export const GetObjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Path: S.String.pipe(T.HttpLabel("Path")),
    Range: S.optional(S.String).pipe(T.HttpHeader("Range")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/{Path+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetObjectRequest",
}) as any as S.Schema<GetObjectRequest>;
export type ContentRangePattern = string;
export type StatusCode = number;
export interface GetObjectResponse {
  Body?: T.StreamingOutputBody;
  CacheControl?: string;
  ContentRange?: string;
  ContentLength?: number;
  ContentType?: string;
  ETag?: string;
  LastModified?: Date;
  StatusCode: number;
}
export const GetObjectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Body: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
    CacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
    ContentRange: S.optional(S.String).pipe(T.HttpHeader("Content-Range")),
    ContentLength: S.optional(S.Number).pipe(T.HttpHeader("Content-Length")),
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
    LastModified: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
      T.HttpHeader("Last-Modified"),
    ),
    StatusCode: S.Number.pipe(T.HttpResponseCode()),
  }).pipe(ns),
).annotate({
  identifier: "GetObjectResponse",
}) as any as S.Schema<GetObjectResponse>;
export type ListPathNaming = string;
export type ListLimit = number;
export type PaginationToken = string;
export interface ListItemsRequest {
  Path?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListItemsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Path: S.optional(S.String).pipe(T.HttpQuery("Path")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListItemsRequest",
}) as any as S.Schema<ListItemsRequest>;
export type ItemName = string;
export type ItemType = "OBJECT" | "FOLDER" | (string & {});
export const ItemType = S.String;

export interface Item {
  Name?: string;
  Type?: ItemType;
  ETag?: string;
  LastModified?: Date;
  ContentType?: string;
  ContentLength?: number;
}
export const Item = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Type: S.optional(ItemType),
    ETag: S.optional(S.String),
    LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ContentType: S.optional(S.String),
    ContentLength: S.optional(S.Number),
  }),
).annotate({ identifier: "Item" }) as any as S.Schema<Item>;
export type ItemList = Item[];
export const ItemList = /*@__PURE__*/ S.Array(Item);
export interface ListItemsResponse {
  Items?: Item[];
  NextToken?: string;
}
export const ListItemsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(ItemList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListItemsResponse",
}) as any as S.Schema<ListItemsResponse>;
export type StorageClass = "TEMPORAL" | (string & {});
export const StorageClass = S.String;

export type UploadAvailability = "STANDARD" | "STREAMING" | (string & {});
export const UploadAvailability = S.String;

export interface PutObjectRequest {
  Body: T.StreamingInputBody;
  Path: string;
  ContentType?: string;
  CacheControl?: string;
  StorageClass?: StorageClass;
  UploadAvailability?: UploadAvailability;
}
export const PutObjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Body: T.StreamingInput.pipe(T.HttpPayload()),
    Path: S.String.pipe(T.HttpLabel("Path")),
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    CacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
    StorageClass: S.optional(StorageClass).pipe(
      T.HttpHeader("x-amz-storage-class"),
    ),
    UploadAvailability: S.optional(UploadAvailability).pipe(
      T.HttpHeader("x-amz-upload-availability"),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PUT", uri: "/{Path+}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutObjectRequest",
}) as any as S.Schema<PutObjectRequest>;
export type SHA256Hash = string;
export interface PutObjectResponse {
  ContentSHA256?: string;
  ETag?: string;
  StorageClass?: StorageClass;
}
export const PutObjectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContentSHA256: S.optional(S.String),
    ETag: S.optional(S.String),
    StorageClass: S.optional(StorageClass),
  }).pipe(ns),
).annotate({
  identifier: "PutObjectResponse",
}) as any as S.Schema<PutObjectResponse>;
export type ErrorMessage = string;
export type DeleteObjectError =
  | ContainerNotFoundException
  | InternalServerError
  | ObjectNotFoundException
  | CommonErrors;
/**
 * Deletes an object at the specified path.
 */
export const deleteObject: API.OperationMethod<
  DeleteObjectRequest,
  DeleteObjectResponse,
  DeleteObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteObjectRequest,
  output: DeleteObjectResponse,
  errors: [
    ContainerNotFoundException,
    InternalServerError,
    ObjectNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteObject",
}));

export type DescribeObjectError =
  | ContainerNotFoundException
  | InternalServerError
  | ObjectNotFoundException
  | CommonErrors;
/**
 * Gets the headers for an object at the specified path.
 */
export const describeObject: API.OperationMethod<
  DescribeObjectRequest,
  DescribeObjectResponse,
  DescribeObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeObjectRequest,
  output: DescribeObjectResponse,
  errors: [
    ContainerNotFoundException,
    InternalServerError,
    ObjectNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeObject",
}));

export type GetObjectError =
  | ContainerNotFoundException
  | InternalServerError
  | ObjectNotFoundException
  | RequestedRangeNotSatisfiableException
  | CommonErrors;
/**
 * Downloads the object at the specified path. If the object’s upload availability is set to `streaming`, AWS Elemental MediaStore downloads the object even if it’s still uploading the object.
 */
export const getObject: API.OperationMethod<
  GetObjectRequest,
  GetObjectResponse,
  GetObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetObjectRequest,
  output: GetObjectResponse,
  errors: [
    ContainerNotFoundException,
    InternalServerError,
    ObjectNotFoundException,
    RequestedRangeNotSatisfiableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetObject",
}));

export type ListItemsError =
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Provides a list of metadata entries about folders and objects in the specified
 * folder.
 */
export const listItems: API.PaginatedOperationMethod<
  ListItemsRequest,
  ListItemsResponse,
  ListItemsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListItemsRequest,
  output: ListItemsResponse,
  errors: [ContainerNotFoundException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListItems",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutObjectError =
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Uploads an object to the specified path. Object sizes are limited to 25 MB for standard upload availability and 10 MB for streaming upload availability.
 */
export const putObject: API.OperationMethod<
  PutObjectRequest,
  PutObjectResponse,
  PutObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutObjectRequest,
  output: PutObjectResponse,
  errors: [ContainerNotFoundException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutObject",
}));
