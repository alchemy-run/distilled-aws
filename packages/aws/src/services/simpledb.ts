import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace("http://sdb.amazonaws.com/doc/2009-04-15/");
const svc = T.AwsApiService({
  sdkId: "SimpleDB",
  serviceShapeName: "AmazonSimpleDB",
});
const auth = T.AwsAuthSigv2({ name: "sdb" });
const ver = T.ServiceVersion("2009-04-15");
const proto = T.AwsProtocolsAwsQuery();
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
    if (Region === "us-east-1") {
      return e("https://sdb.amazonaws.com");
    }
    return e(`https://sdb.${Region}.amazonaws.com`);
  }
  return err("Invalid Configuration: Missing Region");
});

export class AttributeDoesNotExist
  extends /*@__PURE__*/ S.TaggedError<AttributeDoesNotExist>()(
    "AttributeDoesNotExist",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      BoxUsage: S.optional(S.String),
    },
  ).pipe(C.withNotFoundError) {}
export class DuplicateItemName
  extends /*@__PURE__*/ S.TaggedError<DuplicateItemName>()(
    "DuplicateItemName",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      BoxUsage: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidNextToken
  extends /*@__PURE__*/ S.TaggedError<InvalidNextToken>()(
    "InvalidNextToken",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      BoxUsage: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidNumberPredicates
  extends /*@__PURE__*/ S.TaggedError<InvalidNumberPredicates>()(
    "InvalidNumberPredicates",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      BoxUsage: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidNumberValueTests
  extends /*@__PURE__*/ S.TaggedError<InvalidNumberValueTests>()(
    "InvalidNumberValueTests",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      BoxUsage: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterValue
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValue>()(
    "InvalidParameterValue",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      BoxUsage: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidQueryExpression
  extends /*@__PURE__*/ S.TaggedError<InvalidQueryExpression>()(
    "InvalidQueryExpression",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      BoxUsage: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MissingParameter
  extends /*@__PURE__*/ S.TaggedError<MissingParameter>()(
    "MissingParameter",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      BoxUsage: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NoSuchDomain
  extends /*@__PURE__*/ S.TaggedError<NoSuchDomain>()(
    "NoSuchDomain",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      BoxUsage: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withNotFoundError) {}
export class NumberDomainAttributesExceeded
  extends /*@__PURE__*/ S.TaggedError<NumberDomainAttributesExceeded>()(
    "NumberDomainAttributesExceeded",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      BoxUsage: S.optional(S.String),
    },
  ).pipe(C.withQuotaError) {}
export class NumberDomainBytesExceeded
  extends /*@__PURE__*/ S.TaggedError<NumberDomainBytesExceeded>()(
    "NumberDomainBytesExceeded",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      BoxUsage: S.optional(S.String),
    },
  ).pipe(C.withQuotaError) {}
export class NumberDomainsExceeded
  extends /*@__PURE__*/ S.TaggedError<NumberDomainsExceeded>()(
    "NumberDomainsExceeded",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      BoxUsage: S.optional(S.String),
    },
  ).pipe(C.withQuotaError) {}
export class NumberItemAttributesExceeded
  extends /*@__PURE__*/ S.TaggedError<NumberItemAttributesExceeded>()(
    "NumberItemAttributesExceeded",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      BoxUsage: S.optional(S.String),
    },
  ).pipe(C.withQuotaError) {}
export class NumberSubmittedAttributesExceeded
  extends /*@__PURE__*/ S.TaggedError<NumberSubmittedAttributesExceeded>()(
    "NumberSubmittedAttributesExceeded",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      BoxUsage: S.optional(S.String),
    },
  ).pipe(C.withQuotaError) {}
export class NumberSubmittedItemsExceeded
  extends /*@__PURE__*/ S.TaggedError<NumberSubmittedItemsExceeded>()(
    "NumberSubmittedItemsExceeded",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      BoxUsage: S.optional(S.String),
    },
  ).pipe(C.withQuotaError) {}
export class RequestTimeout
  extends /*@__PURE__*/ S.TaggedError<RequestTimeout>()(
    "RequestTimeout",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      BoxUsage: S.optional(S.String),
    },
    T.HttpError(408),
  ).pipe(C.withTimeoutError) {}
export class TooManyRequestedAttributes
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestedAttributes>()(
    "TooManyRequestedAttributes",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      BoxUsage: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DomainName = string;
export interface DeletableAttribute {
  Name: string;
  Value?: string;
}
export const DeletableAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Value: S.optional(S.String) }),
).annotate({
  identifier: "DeletableAttribute",
}) as any as S.Schema<DeletableAttribute>;
export type DeletableAttributeList = DeletableAttribute[];
export const DeletableAttributeList = /*@__PURE__*/ S.Array(DeletableAttribute);
export interface DeletableItem {
  ItemName: string;
  Attributes?: DeletableAttribute[];
}
export const DeletableItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ItemName: S.String,
    Attributes: S.optional(DeletableAttributeList).pipe(
      T.XmlName("Attribute"),
      T.XmlFlattened(),
    ),
  }),
).annotate({ identifier: "DeletableItem" }) as any as S.Schema<DeletableItem>;
export type DeletableItemList = DeletableItem[];
export const DeletableItemList = /*@__PURE__*/ S.Array(DeletableItem);
export interface BatchDeleteAttributesRequest {
  DomainName: string;
  Items: DeletableItem[];
}
export const BatchDeleteAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    Items: DeletableItemList.pipe(T.XmlName("Item"), T.XmlFlattened()),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDeleteAttributesRequest",
}) as any as S.Schema<BatchDeleteAttributesRequest>;
export interface BatchDeleteAttributesResponse {}
export const BatchDeleteAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "BatchDeleteAttributesResponse",
}) as any as S.Schema<BatchDeleteAttributesResponse>;
export interface ReplaceableAttribute {
  Name: string;
  Value: string;
  Replace?: boolean;
}
export const ReplaceableAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Value: S.String, Replace: S.optional(S.Boolean) }),
).annotate({
  identifier: "ReplaceableAttribute",
}) as any as S.Schema<ReplaceableAttribute>;
export type ReplaceableAttributeList = ReplaceableAttribute[];
export const ReplaceableAttributeList =
  /*@__PURE__*/ S.Array(ReplaceableAttribute);
export interface ReplaceableItem {
  ItemName: string;
  Attributes: ReplaceableAttribute[];
}
export const ReplaceableItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ItemName: S.String,
    Attributes: ReplaceableAttributeList.pipe(
      T.XmlName("Attribute"),
      T.XmlFlattened(),
    ),
  }),
).annotate({
  identifier: "ReplaceableItem",
}) as any as S.Schema<ReplaceableItem>;
export type ReplaceableItemList = ReplaceableItem[];
export const ReplaceableItemList = /*@__PURE__*/ S.Array(ReplaceableItem);
export interface BatchPutAttributesRequest {
  DomainName: string;
  Items: ReplaceableItem[];
}
export const BatchPutAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    Items: ReplaceableItemList.pipe(T.XmlName("Item"), T.XmlFlattened()),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchPutAttributesRequest",
}) as any as S.Schema<BatchPutAttributesRequest>;
export interface BatchPutAttributesResponse {}
export const BatchPutAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "BatchPutAttributesResponse",
}) as any as S.Schema<BatchPutAttributesResponse>;
export interface CreateDomainRequest {
  DomainName: string;
}
export const CreateDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDomainRequest",
}) as any as S.Schema<CreateDomainRequest>;
export interface CreateDomainResponse {}
export const CreateDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateDomainResponse",
}) as any as S.Schema<CreateDomainResponse>;
export interface UpdateCondition {
  Name?: string;
  Value?: string;
  Exists?: boolean;
}
export const UpdateCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Value: S.optional(S.String),
    Exists: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "UpdateCondition",
}) as any as S.Schema<UpdateCondition>;
export interface DeleteAttributesRequest {
  DomainName: string;
  ItemName: string;
  Attributes?: DeletableAttribute[];
  Expected?: UpdateCondition;
}
export const DeleteAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    ItemName: S.String,
    Attributes: S.optional(DeletableAttributeList).pipe(
      T.XmlName("Attribute"),
      T.XmlFlattened(),
    ),
    Expected: S.optional(UpdateCondition),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAttributesRequest",
}) as any as S.Schema<DeleteAttributesRequest>;
export interface DeleteAttributesResponse {}
export const DeleteAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteAttributesResponse",
}) as any as S.Schema<DeleteAttributesResponse>;
export interface DeleteDomainRequest {
  DomainName: string;
}
export const DeleteDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDomainRequest",
}) as any as S.Schema<DeleteDomainRequest>;
export interface DeleteDomainResponse {}
export const DeleteDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteDomainResponse",
}) as any as S.Schema<DeleteDomainResponse>;
export interface DomainMetadataRequest {
  DomainName: string;
}
export const DomainMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DomainMetadataRequest",
}) as any as S.Schema<DomainMetadataRequest>;
export interface DomainMetadataResponse {
  ItemCount?: number;
  ItemNamesSizeBytes?: number;
  AttributeNameCount?: number;
  AttributeNamesSizeBytes?: number;
  AttributeValueCount?: number;
  AttributeValuesSizeBytes?: number;
  Timestamp?: number;
}
export const DomainMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ItemCount: S.optional(S.Number),
    ItemNamesSizeBytes: S.optional(S.Number),
    AttributeNameCount: S.optional(S.Number),
    AttributeNamesSizeBytes: S.optional(S.Number),
    AttributeValueCount: S.optional(S.Number),
    AttributeValuesSizeBytes: S.optional(S.Number),
    Timestamp: S.optional(S.Number),
  }).pipe(ns),
).annotate({
  identifier: "DomainMetadataResponse",
}) as any as S.Schema<DomainMetadataResponse>;
export type AttributeNameList = string[];
export const AttributeNameList = /*@__PURE__*/ S.Array(S.String);
export interface GetAttributesRequest {
  DomainName: string;
  ItemName: string;
  AttributeNames?: string[];
  ConsistentRead?: boolean;
}
export const GetAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    ItemName: S.String,
    AttributeNames: S.optional(AttributeNameList).pipe(
      T.XmlName("AttributeName"),
      T.XmlFlattened(),
    ),
    ConsistentRead: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAttributesRequest",
}) as any as S.Schema<GetAttributesRequest>;
export interface Attribute {
  Name: string;
  AlternateNameEncoding?: string;
  Value: string;
  AlternateValueEncoding?: string;
}
export const Attribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    AlternateNameEncoding: S.optional(S.String),
    Value: S.String,
    AlternateValueEncoding: S.optional(S.String),
  }),
).annotate({ identifier: "Attribute" }) as any as S.Schema<Attribute>;
export type AttributeList = Attribute[];
export const AttributeList = /*@__PURE__*/ S.Array(Attribute);
export interface GetAttributesResponse {
  Attributes?: Attribute[];
}
export const GetAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attributes: S.optional(AttributeList).pipe(
      T.XmlName("Attribute"),
      T.XmlFlattened(),
    ),
  }).pipe(ns),
).annotate({
  identifier: "GetAttributesResponse",
}) as any as S.Schema<GetAttributesResponse>;
export interface ListDomainsRequest {
  MaxNumberOfDomains?: number;
  NextToken?: string;
}
export const ListDomainsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxNumberOfDomains: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDomainsRequest",
}) as any as S.Schema<ListDomainsRequest>;
export type DomainNameList = string[];
export const DomainNameList = /*@__PURE__*/ S.Array(S.String);
export interface ListDomainsResponse {
  DomainNames?: string[];
  NextToken?: string;
}
export const ListDomainsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainNames: S.optional(DomainNameList).pipe(
      T.XmlName("DomainName"),
      T.XmlFlattened(),
    ),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDomainsResponse",
}) as any as S.Schema<ListDomainsResponse>;
export interface PutAttributesRequest {
  DomainName: string;
  ItemName: string;
  Attributes: ReplaceableAttribute[];
  Expected?: UpdateCondition;
}
export const PutAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    ItemName: S.String,
    Attributes: ReplaceableAttributeList.pipe(
      T.XmlName("Attribute"),
      T.XmlFlattened(),
    ),
    Expected: S.optional(UpdateCondition),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAttributesRequest",
}) as any as S.Schema<PutAttributesRequest>;
export interface PutAttributesResponse {}
export const PutAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutAttributesResponse",
}) as any as S.Schema<PutAttributesResponse>;
export interface SelectRequest {
  SelectExpression: string;
  NextToken?: string;
  ConsistentRead?: boolean;
}
export const SelectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SelectExpression: S.String,
    NextToken: S.optional(S.String),
    ConsistentRead: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "SelectRequest" }) as any as S.Schema<SelectRequest>;
export interface Item {
  Name: string;
  AlternateNameEncoding?: string;
  Attributes?: Attribute[];
}
export const Item = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    AlternateNameEncoding: S.optional(S.String),
    Attributes: S.optional(AttributeList).pipe(
      T.XmlName("Attribute"),
      T.XmlFlattened(),
    ),
  }),
).annotate({ identifier: "Item" }) as any as S.Schema<Item>;
export type ItemList = Item[];
export const ItemList = /*@__PURE__*/ S.Array(Item);
export interface SelectResponse {
  Items?: Item[];
  NextToken?: string;
}
export const SelectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(ItemList).pipe(T.XmlName("Item"), T.XmlFlattened()),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({ identifier: "SelectResponse" }) as any as S.Schema<SelectResponse>;
export type BatchDeleteAttributesError = CommonErrors;
/**
 * Deletes attributes (or whole items) on up to 25 items in a single call. Idempotent — missing items/attributes are not an error.
 */
export const batchDeleteAttributes: API.OperationMethod<
  BatchDeleteAttributesRequest,
  BatchDeleteAttributesResponse,
  BatchDeleteAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteAttributesRequest,
  output: BatchDeleteAttributesResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteAttributes",
}));

export type BatchPutAttributesError =
  | DuplicateItemName
  | InvalidParameterValue
  | MissingParameter
  | NoSuchDomain
  | NumberDomainAttributesExceeded
  | NumberDomainBytesExceeded
  | NumberItemAttributesExceeded
  | NumberSubmittedAttributesExceeded
  | NumberSubmittedItemsExceeded
  | CommonErrors;
/**
 * Puts attributes on up to 25 items in a single call.
 */
export const batchPutAttributes: API.OperationMethod<
  BatchPutAttributesRequest,
  BatchPutAttributesResponse,
  BatchPutAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchPutAttributesRequest,
  output: BatchPutAttributesResponse,
  errors: [
    DuplicateItemName,
    InvalidParameterValue,
    MissingParameter,
    NoSuchDomain,
    NumberDomainAttributesExceeded,
    NumberDomainBytesExceeded,
    NumberItemAttributesExceeded,
    NumberSubmittedAttributesExceeded,
    NumberSubmittedItemsExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchPutAttributes",
}));

export type CreateDomainError =
  | InvalidParameterValue
  | MissingParameter
  | NumberDomainsExceeded
  | CommonErrors;
/**
 * Creates a new SimpleDB domain. Idempotent — creating an existing domain succeeds without error.
 */
export const createDomain: API.OperationMethod<
  CreateDomainRequest,
  CreateDomainResponse,
  CreateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDomainRequest,
  output: CreateDomainResponse,
  errors: [InvalidParameterValue, MissingParameter, NumberDomainsExceeded],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomain",
}));

export type DeleteAttributesError =
  | AttributeDoesNotExist
  | InvalidParameterValue
  | MissingParameter
  | NoSuchDomain
  | CommonErrors;
/**
 * Deletes one or more attributes of a SimpleDB item — or the whole item when no attributes are named. Idempotent: deleting a missing attribute/item succeeds.
 */
export const deleteAttributes: API.OperationMethod<
  DeleteAttributesRequest,
  DeleteAttributesResponse,
  DeleteAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAttributesRequest,
  output: DeleteAttributesResponse,
  errors: [
    AttributeDoesNotExist,
    InvalidParameterValue,
    MissingParameter,
    NoSuchDomain,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAttributes",
}));

export type DeleteDomainError = MissingParameter | CommonErrors;
/**
 * Deletes a SimpleDB domain and all of its items. Idempotent — deleting a missing domain succeeds without error.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainRequest,
  DeleteDomainResponse,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDomainRequest,
  output: DeleteDomainResponse,
  errors: [MissingParameter],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomain",
}));

export type DomainMetadataError =
  | MissingParameter
  | NoSuchDomain
  | CommonErrors;
/**
 * Returns information about a SimpleDB domain (item count, sizes, timestamp).
 */
export const domainMetadata: API.OperationMethod<
  DomainMetadataRequest,
  DomainMetadataResponse,
  DomainMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DomainMetadataRequest,
  output: DomainMetadataResponse,
  errors: [MissingParameter, NoSuchDomain],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DomainMetadata",
}));

export type GetAttributesError =
  | InvalidParameterValue
  | MissingParameter
  | NoSuchDomain
  | CommonErrors;
/**
 * Returns all (or the requested subset of) attributes of a SimpleDB item. Reads are eventually consistent unless `ConsistentRead` is set.
 */
export const getAttributes: API.OperationMethod<
  GetAttributesRequest,
  GetAttributesResponse,
  GetAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAttributesRequest,
  output: GetAttributesResponse,
  errors: [InvalidParameterValue, MissingParameter, NoSuchDomain],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAttributes",
}));

export type ListDomainsError =
  | InvalidNextToken
  | InvalidParameterValue
  | CommonErrors;
/**
 * Lists all SimpleDB domains in the account/region. Paginated.
 */
export const listDomains: API.PaginatedOperationMethod<
  ListDomainsRequest,
  ListDomainsResponse,
  ListDomainsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDomainsRequest,
  output: ListDomainsResponse,
  errors: [InvalidNextToken, InvalidParameterValue],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomains",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DomainNames",
    pageSize: "MaxNumberOfDomains",
  } as const,
})) as any;

export type PutAttributesError =
  | AttributeDoesNotExist
  | InvalidParameterValue
  | MissingParameter
  | NoSuchDomain
  | NumberDomainAttributesExceeded
  | NumberDomainBytesExceeded
  | NumberItemAttributesExceeded
  | CommonErrors;
/**
 * Creates or replaces attributes of a SimpleDB item. With `Replace: true` an attribute's existing values are overwritten; otherwise values accumulate.
 */
export const putAttributes: API.OperationMethod<
  PutAttributesRequest,
  PutAttributesResponse,
  PutAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAttributesRequest,
  output: PutAttributesResponse,
  errors: [
    AttributeDoesNotExist,
    InvalidParameterValue,
    MissingParameter,
    NoSuchDomain,
    NumberDomainAttributesExceeded,
    NumberDomainBytesExceeded,
    NumberItemAttributesExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAttributes",
}));

export type SelectError =
  | InvalidNextToken
  | InvalidNumberPredicates
  | InvalidNumberValueTests
  | InvalidParameterValue
  | InvalidQueryExpression
  | MissingParameter
  | NoSuchDomain
  | RequestTimeout
  | TooManyRequestedAttributes
  | CommonErrors;
/**
 * Runs a SimpleDB select expression (`select output_list from domain [where ...]`). Paginated via `NextToken`.
 */
export const select: API.PaginatedOperationMethod<
  SelectRequest,
  SelectResponse,
  SelectError,
  Credentials | HttpClient.HttpClient,
  Item
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SelectRequest,
  output: SelectResponse,
  errors: [
    InvalidNextToken,
    InvalidNumberPredicates,
    InvalidNumberValueTests,
    InvalidParameterValue,
    InvalidQueryExpression,
    MissingParameter,
    NoSuchDomain,
    RequestTimeout,
    TooManyRequestedAttributes,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Select",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
  } as const,
})) as any;
