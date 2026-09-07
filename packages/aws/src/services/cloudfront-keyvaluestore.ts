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
  sdkId: "CloudFront KeyValueStore",
  serviceShapeName: "CloudFrontKeyValueStore",
});
const auth = T.AwsAuthSigv4({ name: "cloudfront-keyvaluestore" });
const ver = T.ServiceVersion("2022-07-26");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { KvsARN, Region, UseFIPS = false, Endpoint } = p;
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
        name: "sigv4a",
        signingName: "cloudfront-keyvaluestore",
        signingRegionSet: ["*"],
      },
    ],
  });
  if (UseFIPS === false) {
    if (KvsARN != null) {
      {
        const parsedArn = _.parseArn(KvsARN);
        if (parsedArn != null && parsedArn !== false) {
          if (_.getAttr(parsedArn, "service") === "cloudfront") {
            if (_.getAttr(parsedArn, "region") === "") {
              {
                const arnType = _.getAttr(parsedArn, "resourceId[0]");
                if (arnType != null && arnType !== false) {
                  if (!(arnType === "")) {
                    if (arnType === "key-value-store") {
                      if (_.getAttr(parsedArn, "partition") === "aws") {
                        if (Region != null) {
                          {
                            const partitionResult = _.partition(Region);
                            if (
                              partitionResult != null &&
                              partitionResult !== false
                            ) {
                              if (
                                _.getAttr(partitionResult, "name") ===
                                `${_.getAttr(parsedArn, "partition")}`
                              ) {
                                if (Endpoint != null) {
                                  {
                                    const url = _.parseURL(Endpoint);
                                    if (url != null && url !== false) {
                                      return e(
                                        `${_.getAttr(url, "scheme")}://${_.getAttr(parsedArn, "accountId")}.${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                                        _p0(),
                                        {},
                                      );
                                    }
                                  }
                                  return err(
                                    "Provided endpoint is not a valid URL",
                                  );
                                }
                                return e(
                                  `https://${_.getAttr(parsedArn, "accountId")}.cloudfront-kvs.global.api.aws`,
                                  _p0(),
                                  {},
                                );
                              }
                              return err(
                                `Client was configured for partition \`${_.getAttr(partitionResult, "name")}\` but Kvs ARN has \`${_.getAttr(parsedArn, "partition")}\``,
                              );
                            }
                          }
                        }
                        if (Endpoint != null) {
                          {
                            const url = _.parseURL(Endpoint);
                            if (url != null && url !== false) {
                              return e(
                                `${_.getAttr(url, "scheme")}://${_.getAttr(parsedArn, "accountId")}.${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                                _p0(),
                                {},
                              );
                            }
                          }
                          return err("Provided endpoint is not a valid URL");
                        }
                        return e(
                          `https://${_.getAttr(parsedArn, "accountId")}.cloudfront-kvs.global.api.aws`,
                          _p0(),
                          {},
                        );
                      }
                      return err(
                        `CloudFront-KeyValueStore is not supported in partition \`${_.getAttr(parsedArn, "partition")}\``,
                      );
                    }
                    return err(
                      `ARN resource type is invalid. Expected \`key-value-store\`, found: \`${arnType}\``,
                    );
                  }
                  return err(
                    "No resource type found in the KVS ARN. Resource type must be `key-value-store`.",
                  );
                }
              }
              return err(
                "No resource type found in the KVS ARN. Resource type must be `key-value-store`.",
              );
            }
            return err(
              `Provided ARN must be a global resource ARN. Found: \`${_.getAttr(parsedArn, "region")}\``,
            );
          }
          return err(
            `Provided ARN is not a valid CloudFront Service ARN. Found: \`${_.getAttr(parsedArn, "service")}\``,
          );
        }
      }
      return err("KVS ARN must be a valid ARN");
    }
    return err("KVS ARN must be provided to use this service");
  }
  return err(
    "Invalid Configuration: FIPS is not supported with CloudFront-KeyValueStore.",
  );
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
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
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
export type KvsARN = string;
export type Key = string;
export type Etag = string;
export interface DeleteKeyRequest {
  KvsARN: string;
  Key: string;
  IfMatch: string;
}
export const DeleteKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KvsARN: S.String.pipe(T.HttpLabel("KvsARN"), T.ContextParam("KvsARN")),
    Key: S.String.pipe(T.HttpLabel("Key")),
    IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/key-value-stores/{KvsARN}/keys/{Key}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteKeyRequest",
}) as any as S.Schema<DeleteKeyRequest>;
export interface DeleteKeyResponse {
  ItemCount: number;
  TotalSizeInBytes: number;
  ETag: string;
}
export const DeleteKeyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ItemCount: S.Number,
    TotalSizeInBytes: S.Number,
    ETag: S.String.pipe(T.HttpHeader("ETag")),
  }),
).annotate({
  identifier: "DeleteKeyResponse",
}) as any as S.Schema<DeleteKeyResponse>;
export interface DescribeKeyValueStoreRequest {
  KvsARN: string;
}
export const DescribeKeyValueStoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KvsARN: S.String.pipe(T.HttpLabel("KvsARN"), T.ContextParam("KvsARN")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/key-value-stores/{KvsARN}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeKeyValueStoreRequest",
}) as any as S.Schema<DescribeKeyValueStoreRequest>;
export interface DescribeKeyValueStoreResponse {
  ItemCount: number;
  TotalSizeInBytes: number;
  KvsARN: string;
  Created: Date;
  ETag: string;
  LastModified?: Date;
  Status?: string;
  FailureReason?: string;
}
export const DescribeKeyValueStoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ItemCount: S.Number,
    TotalSizeInBytes: S.Number,
    KvsARN: S.String,
    Created: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ETag: S.String.pipe(T.HttpHeader("ETag")),
    LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(S.String),
    FailureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeKeyValueStoreResponse",
}) as any as S.Schema<DescribeKeyValueStoreResponse>;
export interface GetKeyRequest {
  KvsARN: string;
  Key: string;
}
export const GetKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KvsARN: S.String.pipe(T.HttpLabel("KvsARN"), T.ContextParam("KvsARN")),
    Key: S.String.pipe(T.HttpLabel("Key")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/key-value-stores/{KvsARN}/keys/{Key}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetKeyRequest" }) as any as S.Schema<GetKeyRequest>;
export type Value = string | redacted.Redacted<string>;
export interface GetKeyResponse {
  Key: string;
  Value: string | redacted.Redacted<string>;
  ItemCount: number;
  TotalSizeInBytes: number;
}
export const GetKeyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.String,
    Value: SensitiveString,
    ItemCount: S.Number,
    TotalSizeInBytes: S.Number,
  }),
).annotate({ identifier: "GetKeyResponse" }) as any as S.Schema<GetKeyResponse>;
export interface ListKeysRequest {
  KvsARN: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListKeysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KvsARN: S.String.pipe(T.HttpLabel("KvsARN"), T.ContextParam("KvsARN")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/key-value-stores/{KvsARN}/keys" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListKeysRequest",
}) as any as S.Schema<ListKeysRequest>;
export interface ListKeysResponseListItem {
  Key: string;
  Value: string | redacted.Redacted<string>;
}
export const ListKeysResponseListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: SensitiveString }),
).annotate({
  identifier: "ListKeysResponseListItem",
}) as any as S.Schema<ListKeysResponseListItem>;
export type ListKeysResponseList = ListKeysResponseListItem[];
export const ListKeysResponseList = /*@__PURE__*/ S.Array(
  ListKeysResponseListItem,
);
export interface ListKeysResponse {
  NextToken?: string;
  Items?: ListKeysResponseListItem[];
}
export const ListKeysResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Items: S.optional(ListKeysResponseList),
  }),
).annotate({
  identifier: "ListKeysResponse",
}) as any as S.Schema<ListKeysResponse>;
export interface PutKeyRequest {
  Key: string;
  Value: string | redacted.Redacted<string>;
  KvsARN: string;
  IfMatch: string;
}
export const PutKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.String.pipe(T.HttpLabel("Key")),
    Value: SensitiveString,
    KvsARN: S.String.pipe(T.HttpLabel("KvsARN"), T.ContextParam("KvsARN")),
    IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/key-value-stores/{KvsARN}/keys/{Key}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "PutKeyRequest" }) as any as S.Schema<PutKeyRequest>;
export interface PutKeyResponse {
  ItemCount: number;
  TotalSizeInBytes: number;
  ETag: string;
}
export const PutKeyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ItemCount: S.Number,
    TotalSizeInBytes: S.Number,
    ETag: S.String.pipe(T.HttpHeader("ETag")),
  }),
).annotate({ identifier: "PutKeyResponse" }) as any as S.Schema<PutKeyResponse>;
export interface PutKeyRequestListItem {
  Key: string;
  Value: string | redacted.Redacted<string>;
}
export const PutKeyRequestListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: SensitiveString }),
).annotate({
  identifier: "PutKeyRequestListItem",
}) as any as S.Schema<PutKeyRequestListItem>;
export type PutKeyRequestsList = PutKeyRequestListItem[];
export const PutKeyRequestsList = /*@__PURE__*/ S.Array(PutKeyRequestListItem);
export interface DeleteKeyRequestListItem {
  Key: string;
}
export const DeleteKeyRequestListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String }),
).annotate({
  identifier: "DeleteKeyRequestListItem",
}) as any as S.Schema<DeleteKeyRequestListItem>;
export type DeleteKeyRequestsList = DeleteKeyRequestListItem[];
export const DeleteKeyRequestsList = /*@__PURE__*/ S.Array(
  DeleteKeyRequestListItem,
);
export interface UpdateKeysRequest {
  KvsARN: string;
  IfMatch: string;
  Puts?: PutKeyRequestListItem[];
  Deletes?: DeleteKeyRequestListItem[];
}
export const UpdateKeysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KvsARN: S.String.pipe(T.HttpLabel("KvsARN"), T.ContextParam("KvsARN")),
    IfMatch: S.String.pipe(T.HttpHeader("If-Match")),
    Puts: S.optional(PutKeyRequestsList),
    Deletes: S.optional(DeleteKeyRequestsList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/key-value-stores/{KvsARN}/keys" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateKeysRequest",
}) as any as S.Schema<UpdateKeysRequest>;
export interface UpdateKeysResponse {
  ItemCount: number;
  TotalSizeInBytes: number;
  ETag: string;
}
export const UpdateKeysResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ItemCount: S.Number,
    TotalSizeInBytes: S.Number,
    ETag: S.String.pipe(T.HttpHeader("ETag")),
  }),
).annotate({
  identifier: "UpdateKeysResponse",
}) as any as S.Schema<UpdateKeysResponse>;
export type DeleteKeyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the key value pair specified by the key.
 */
export const deleteKey: API.OperationMethod<
  DeleteKeyRequest,
  DeleteKeyResponse,
  DeleteKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteKeyRequest,
  output: DeleteKeyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKey",
}));

export type DescribeKeyValueStoreError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns metadata information about Key Value Store.
 */
export const describeKeyValueStore: API.OperationMethod<
  DescribeKeyValueStoreRequest,
  DescribeKeyValueStoreResponse,
  DescribeKeyValueStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeKeyValueStoreRequest,
  output: DescribeKeyValueStoreResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeKeyValueStore",
}));

export type GetKeyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a key value pair.
 */
export const getKey: API.OperationMethod<
  GetKeyRequest,
  GetKeyResponse,
  GetKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetKeyRequest,
  output: GetKeyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKey",
}));

export type ListKeysError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of key value pairs.
 */
export const listKeys: API.PaginatedOperationMethod<
  ListKeysRequest,
  ListKeysResponse,
  ListKeysError,
  Credentials | HttpClient.HttpClient,
  ListKeysResponseListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListKeysRequest,
  output: ListKeysResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKeys",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutKeyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new key value pair or replaces the value of an existing key.
 */
export const putKey: API.OperationMethod<
  PutKeyRequest,
  PutKeyResponse,
  PutKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutKeyRequest,
  output: PutKeyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutKey",
}));

export type UpdateKeysError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Puts or Deletes multiple key value pairs in a single, all-or-nothing operation.
 */
export const updateKeys: API.OperationMethod<
  UpdateKeysRequest,
  UpdateKeysResponse,
  UpdateKeysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateKeysRequest,
  output: UpdateKeysResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKeys",
}));
