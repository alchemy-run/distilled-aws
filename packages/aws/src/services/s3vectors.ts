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
  sdkId: "S3Vectors",
  serviceShapeName: "S3Vectors",
});
const auth = T.AwsAuthSigv4({ name: "s3vectors" });
const ver = T.ServiceVersion("2025-07-15");
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
            `https://s3vectors-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://s3vectors.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class KmsDisabledException
  extends /*@__PURE__*/ S.TaggedError<KmsDisabledException>()(
    "KmsDisabledException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class KmsInvalidKeyUsageException
  extends /*@__PURE__*/ S.TaggedError<KmsInvalidKeyUsageException>()(
    "KmsInvalidKeyUsageException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class KmsInvalidStateException
  extends /*@__PURE__*/ S.TaggedError<KmsInvalidStateException>()(
    "KmsInvalidStateException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class KmsNotFoundException
  extends /*@__PURE__*/ S.TaggedError<KmsNotFoundException>()(
    "KmsNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(503), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export type VectorBucketName = string;
export type VectorBucketArn = string;
export type IndexName = string;
export type DataType = "float32" | (string & {});
export const DataType = S.String;

export type Dimension = number;
export type DistanceMetric = "euclidean" | "cosine" | (string & {});
export const DistanceMetric = S.String;

export type MetadataKey = string;
export type NonFilterableMetadataKeys = string[];
export const NonFilterableMetadataKeys = /*@__PURE__*/ S.Array(S.String);
export interface MetadataConfiguration {
  nonFilterableMetadataKeys: string[];
}
export const MetadataConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nonFilterableMetadataKeys: NonFilterableMetadataKeys }),
).annotate({
  identifier: "MetadataConfiguration",
}) as any as S.Schema<MetadataConfiguration>;
export type SseType = "AES256" | "aws:kms" | (string & {});
export const SseType = S.String;

export type KmsKeyArn = string;
export interface EncryptionConfiguration {
  sseType?: SseType;
  kmsKeyArn?: string;
}
export const EncryptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sseType: S.optional(SseType), kmsKeyArn: S.optional(S.String) }),
).annotate({
  identifier: "EncryptionConfiguration",
}) as any as S.Schema<EncryptionConfiguration>;
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export const TagsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateIndexInput {
  vectorBucketName?: string;
  vectorBucketArn?: string;
  indexName: string;
  dataType: DataType;
  dimension: number;
  distanceMetric: DistanceMetric;
  metadataConfiguration?: MetadataConfiguration;
  encryptionConfiguration?: EncryptionConfiguration;
  tags?: { [key: string]: string | undefined };
}
export const CreateIndexInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vectorBucketName: S.optional(S.String),
    vectorBucketArn: S.optional(S.String),
    indexName: S.String,
    dataType: DataType,
    dimension: S.Number,
    distanceMetric: DistanceMetric,
    metadataConfiguration: S.optional(MetadataConfiguration),
    encryptionConfiguration: S.optional(EncryptionConfiguration),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateIndex" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateIndexInput",
}) as any as S.Schema<CreateIndexInput>;
export type IndexArn = string;
export interface CreateIndexOutput {
  indexArn: string;
}
export const CreateIndexOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ indexArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateIndexOutput",
}) as any as S.Schema<CreateIndexOutput>;
export interface CreateVectorBucketInput {
  vectorBucketName: string;
  encryptionConfiguration?: EncryptionConfiguration;
  tags?: { [key: string]: string | undefined };
}
export const CreateVectorBucketInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vectorBucketName: S.String,
    encryptionConfiguration: S.optional(EncryptionConfiguration),
    tags: S.optional(TagsMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateVectorBucket" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVectorBucketInput",
}) as any as S.Schema<CreateVectorBucketInput>;
export interface CreateVectorBucketOutput {
  vectorBucketArn: string;
}
export const CreateVectorBucketOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vectorBucketArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateVectorBucketOutput",
}) as any as S.Schema<CreateVectorBucketOutput>;
export interface DeleteIndexInput {
  vectorBucketName?: string;
  indexName?: string;
  indexArn?: string;
}
export const DeleteIndexInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vectorBucketName: S.optional(S.String),
    indexName: S.optional(S.String),
    indexArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteIndex" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIndexInput",
}) as any as S.Schema<DeleteIndexInput>;
export interface DeleteIndexOutput {}
export const DeleteIndexOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteIndexOutput",
}) as any as S.Schema<DeleteIndexOutput>;
export interface DeleteVectorBucketInput {
  vectorBucketName?: string;
  vectorBucketArn?: string;
}
export const DeleteVectorBucketInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vectorBucketName: S.optional(S.String),
    vectorBucketArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteVectorBucket" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVectorBucketInput",
}) as any as S.Schema<DeleteVectorBucketInput>;
export interface DeleteVectorBucketOutput {}
export const DeleteVectorBucketOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteVectorBucketOutput",
}) as any as S.Schema<DeleteVectorBucketOutput>;
export interface DeleteVectorBucketPolicyInput {
  vectorBucketName?: string;
  vectorBucketArn?: string;
}
export const DeleteVectorBucketPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vectorBucketName: S.optional(S.String),
    vectorBucketArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteVectorBucketPolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVectorBucketPolicyInput",
}) as any as S.Schema<DeleteVectorBucketPolicyInput>;
export interface DeleteVectorBucketPolicyOutput {}
export const DeleteVectorBucketPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteVectorBucketPolicyOutput",
}) as any as S.Schema<DeleteVectorBucketPolicyOutput>;
export type VectorKey = string;
export type DeleteVectorsInputList = string[];
export const DeleteVectorsInputList = /*@__PURE__*/ S.Array(S.String);
export interface DeleteVectorsInput {
  vectorBucketName?: string;
  indexName?: string;
  indexArn?: string;
  keys: string[];
}
export const DeleteVectorsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vectorBucketName: S.optional(S.String),
    indexName: S.optional(S.String),
    indexArn: S.optional(S.String),
    keys: DeleteVectorsInputList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteVectors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVectorsInput",
}) as any as S.Schema<DeleteVectorsInput>;
export interface DeleteVectorsOutput {}
export const DeleteVectorsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteVectorsOutput",
}) as any as S.Schema<DeleteVectorsOutput>;
export interface GetIndexInput {
  vectorBucketName?: string;
  indexName?: string;
  indexArn?: string;
}
export const GetIndexInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vectorBucketName: S.optional(S.String),
    indexName: S.optional(S.String),
    indexArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetIndex" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetIndexInput" }) as any as S.Schema<GetIndexInput>;
export interface Index {
  vectorBucketName: string;
  indexName: string;
  indexArn: string;
  creationTime: Date;
  dataType: DataType;
  dimension: number;
  distanceMetric: DistanceMetric;
  metadataConfiguration?: MetadataConfiguration;
  encryptionConfiguration?: EncryptionConfiguration;
}
export const Index = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vectorBucketName: S.String,
    indexName: S.String,
    indexArn: S.String,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    dataType: DataType,
    dimension: S.Number,
    distanceMetric: DistanceMetric,
    metadataConfiguration: S.optional(MetadataConfiguration),
    encryptionConfiguration: S.optional(EncryptionConfiguration),
  }),
).annotate({ identifier: "Index" }) as any as S.Schema<Index>;
export interface GetIndexOutput {
  index: Index;
}
export const GetIndexOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ index: Index }),
).annotate({ identifier: "GetIndexOutput" }) as any as S.Schema<GetIndexOutput>;
export interface GetVectorBucketInput {
  vectorBucketName?: string;
  vectorBucketArn?: string;
}
export const GetVectorBucketInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vectorBucketName: S.optional(S.String),
    vectorBucketArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetVectorBucket" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVectorBucketInput",
}) as any as S.Schema<GetVectorBucketInput>;
export interface VectorBucket {
  vectorBucketName: string;
  vectorBucketArn: string;
  creationTime: Date;
  encryptionConfiguration?: EncryptionConfiguration;
}
export const VectorBucket = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vectorBucketName: S.String,
    vectorBucketArn: S.String,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    encryptionConfiguration: S.optional(EncryptionConfiguration),
  }),
).annotate({ identifier: "VectorBucket" }) as any as S.Schema<VectorBucket>;
export interface GetVectorBucketOutput {
  vectorBucket: VectorBucket;
}
export const GetVectorBucketOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vectorBucket: VectorBucket }),
).annotate({
  identifier: "GetVectorBucketOutput",
}) as any as S.Schema<GetVectorBucketOutput>;
export interface GetVectorBucketPolicyInput {
  vectorBucketName?: string;
  vectorBucketArn?: string;
}
export const GetVectorBucketPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vectorBucketName: S.optional(S.String),
    vectorBucketArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetVectorBucketPolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVectorBucketPolicyInput",
}) as any as S.Schema<GetVectorBucketPolicyInput>;
export type VectorBucketPolicy = string;
export interface GetVectorBucketPolicyOutput {
  policy?: string;
}
export const GetVectorBucketPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policy: S.optional(S.String) }),
).annotate({
  identifier: "GetVectorBucketPolicyOutput",
}) as any as S.Schema<GetVectorBucketPolicyOutput>;
export type GetVectorsInputList = string[];
export const GetVectorsInputList = /*@__PURE__*/ S.Array(S.String);
export interface GetVectorsInput {
  vectorBucketName?: string;
  indexName?: string;
  indexArn?: string;
  keys: string[];
  returnData?: boolean;
  returnMetadata?: boolean;
}
export const GetVectorsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vectorBucketName: S.optional(S.String),
    indexName: S.optional(S.String),
    indexArn: S.optional(S.String),
    keys: GetVectorsInputList,
    returnData: S.optional(S.Boolean),
    returnMetadata: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetVectors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVectorsInput",
}) as any as S.Schema<GetVectorsInput>;
export type Float32VectorData = number[];
export const Float32VectorData = /*@__PURE__*/ S.Array(S.Number);
export type VectorData = { float32: number[] };
export const VectorData = /*@__PURE__*/ S.Union([
  S.Struct({ float32: Float32VectorData }),
]);
export type VectorMetadata = unknown;
export interface GetOutputVector {
  key: string;
  data?: VectorData;
  metadata?: any;
}
export const GetOutputVector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    key: S.String,
    data: S.optional(VectorData),
    metadata: S.optional(S.Any),
  }),
).annotate({
  identifier: "GetOutputVector",
}) as any as S.Schema<GetOutputVector>;
export type GetVectorsOutputList = GetOutputVector[];
export const GetVectorsOutputList = /*@__PURE__*/ S.Array(GetOutputVector);
export interface GetVectorsOutput {
  vectors: GetOutputVector[];
}
export const GetVectorsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vectors: GetVectorsOutputList }),
).annotate({
  identifier: "GetVectorsOutput",
}) as any as S.Schema<GetVectorsOutput>;
export type ListIndexesMaxResults = number;
export type ListIndexesNextToken = string;
export type ListIndexesPrefix = string;
export interface ListIndexesInput {
  vectorBucketName?: string;
  vectorBucketArn?: string;
  maxResults?: number;
  nextToken?: string;
  prefix?: string;
}
export const ListIndexesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vectorBucketName: S.optional(S.String),
    vectorBucketArn: S.optional(S.String),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    prefix: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListIndexes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIndexesInput",
}) as any as S.Schema<ListIndexesInput>;
export interface IndexSummary {
  vectorBucketName: string;
  indexName: string;
  indexArn: string;
  creationTime: Date;
}
export const IndexSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vectorBucketName: S.String,
    indexName: S.String,
    indexArn: S.String,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "IndexSummary" }) as any as S.Schema<IndexSummary>;
export type ListIndexesOutputList = IndexSummary[];
export const ListIndexesOutputList = /*@__PURE__*/ S.Array(IndexSummary);
export interface ListIndexesOutput {
  nextToken?: string;
  indexes: IndexSummary[];
}
export const ListIndexesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), indexes: ListIndexesOutputList }),
).annotate({
  identifier: "ListIndexesOutput",
}) as any as S.Schema<ListIndexesOutput>;
export type ResourceARN = string;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  tags: { [key: string]: string | undefined };
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: TagsMap }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export type ListVectorBucketsMaxResults = number;
export type ListVectorBucketsNextToken = string;
export type ListVectorBucketsPrefix = string;
export interface ListVectorBucketsInput {
  maxResults?: number;
  nextToken?: string;
  prefix?: string;
}
export const ListVectorBucketsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    prefix: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListVectorBuckets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVectorBucketsInput",
}) as any as S.Schema<ListVectorBucketsInput>;
export interface VectorBucketSummary {
  vectorBucketName: string;
  vectorBucketArn: string;
  creationTime: Date;
}
export const VectorBucketSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vectorBucketName: S.String,
    vectorBucketArn: S.String,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "VectorBucketSummary",
}) as any as S.Schema<VectorBucketSummary>;
export type ListVectorBucketsOutputList = VectorBucketSummary[];
export const ListVectorBucketsOutputList =
  /*@__PURE__*/ S.Array(VectorBucketSummary);
export interface ListVectorBucketsOutput {
  nextToken?: string;
  vectorBuckets: VectorBucketSummary[];
}
export const ListVectorBucketsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    vectorBuckets: ListVectorBucketsOutputList,
  }),
).annotate({
  identifier: "ListVectorBucketsOutput",
}) as any as S.Schema<ListVectorBucketsOutput>;
export type ListVectorsMaxResults = number;
export type ListVectorsNextToken = string;
export type ListVectorsSegmentCount = number;
export type ListVectorsSegmentIndex = number;
export interface ListVectorsInput {
  vectorBucketName?: string;
  indexName?: string;
  indexArn?: string;
  maxResults?: number;
  nextToken?: string;
  segmentCount?: number;
  segmentIndex?: number;
  returnData?: boolean;
  returnMetadata?: boolean;
}
export const ListVectorsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vectorBucketName: S.optional(S.String),
    indexName: S.optional(S.String),
    indexArn: S.optional(S.String),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    segmentCount: S.optional(S.Number),
    segmentIndex: S.optional(S.Number),
    returnData: S.optional(S.Boolean),
    returnMetadata: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListVectors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVectorsInput",
}) as any as S.Schema<ListVectorsInput>;
export interface ListOutputVector {
  key: string;
  data?: VectorData;
  metadata?: any;
}
export const ListOutputVector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    key: S.String,
    data: S.optional(VectorData),
    metadata: S.optional(S.Any),
  }),
).annotate({
  identifier: "ListOutputVector",
}) as any as S.Schema<ListOutputVector>;
export type ListVectorsOutputList = ListOutputVector[];
export const ListVectorsOutputList = /*@__PURE__*/ S.Array(ListOutputVector);
export interface ListVectorsOutput {
  nextToken?: string;
  vectors: ListOutputVector[];
}
export const ListVectorsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), vectors: ListVectorsOutputList }),
).annotate({
  identifier: "ListVectorsOutput",
}) as any as S.Schema<ListVectorsOutput>;
export interface PutVectorBucketPolicyInput {
  vectorBucketName?: string;
  vectorBucketArn?: string;
  policy: string;
}
export const PutVectorBucketPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vectorBucketName: S.optional(S.String),
    vectorBucketArn: S.optional(S.String),
    policy: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/PutVectorBucketPolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutVectorBucketPolicyInput",
}) as any as S.Schema<PutVectorBucketPolicyInput>;
export interface PutVectorBucketPolicyOutput {}
export const PutVectorBucketPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutVectorBucketPolicyOutput",
}) as any as S.Schema<PutVectorBucketPolicyOutput>;
export interface PutInputVector {
  key: string;
  data: VectorData;
  metadata?: any;
}
export const PutInputVector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, data: VectorData, metadata: S.optional(S.Any) }),
).annotate({ identifier: "PutInputVector" }) as any as S.Schema<PutInputVector>;
export type PutVectorsInputList = PutInputVector[];
export const PutVectorsInputList = /*@__PURE__*/ S.Array(PutInputVector);
export interface PutVectorsInput {
  vectorBucketName?: string;
  indexName?: string;
  indexArn?: string;
  vectors: PutInputVector[];
}
export const PutVectorsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vectorBucketName: S.optional(S.String),
    indexName: S.optional(S.String),
    indexArn: S.optional(S.String),
    vectors: PutVectorsInputList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/PutVectors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutVectorsInput",
}) as any as S.Schema<PutVectorsInput>;
export interface PutVectorsOutput {}
export const PutVectorsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutVectorsOutput",
}) as any as S.Schema<PutVectorsOutput>;
export type TopK = number;
export type QueryVectorsNextToken = string;
export interface QueryVectorsInput {
  vectorBucketName?: string;
  indexName?: string;
  indexArn?: string;
  topK: number;
  queryVector: VectorData;
  filter?: any;
  returnMetadata?: boolean;
  returnDistance?: boolean;
  nextToken?: string;
}
export const QueryVectorsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vectorBucketName: S.optional(S.String),
    indexName: S.optional(S.String),
    indexArn: S.optional(S.String),
    topK: S.Number,
    queryVector: VectorData,
    filter: S.optional(S.Any),
    returnMetadata: S.optional(S.Boolean),
    returnDistance: S.optional(S.Boolean),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/QueryVectors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "QueryVectorsInput",
}) as any as S.Schema<QueryVectorsInput>;
export interface QueryOutputVector {
  distance?: number;
  key: string;
  metadata?: any;
}
export const QueryOutputVector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    distance: S.optional(S.Number),
    key: S.String,
    metadata: S.optional(S.Any),
  }),
).annotate({
  identifier: "QueryOutputVector",
}) as any as S.Schema<QueryOutputVector>;
export type QueryVectorsOutputList = QueryOutputVector[];
export const QueryVectorsOutputList = /*@__PURE__*/ S.Array(QueryOutputVector);
export interface QueryVectorsOutput {
  vectors: QueryOutputVector[];
  distanceMetric: DistanceMetric;
  nextToken?: string;
}
export const QueryVectorsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vectors: QueryVectorsOutputList,
    distanceMetric: S.optional(DistanceMetric),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "QueryVectorsOutput",
}) as any as S.Schema<QueryVectorsOutput>;
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagsMap,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {}
export const TagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export type ExceptionMessage = string;
export type CreateIndexError =
  | ConflictException
  | NotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a vector index within a vector bucket. To specify the vector bucket, you must use either the vector bucket name or the vector bucket Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:CreateIndex` permission to use this operation.
 *
 * You must have the `s3vectors:TagResource` permission in addition to `s3vectors:CreateIndex` permission to create a vector index with tags.
 */
export const createIndex: API.OperationMethod<
  CreateIndexInput,
  CreateIndexOutput,
  CreateIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIndexInput,
  output: CreateIndexOutput,
  errors: [
    ConflictException,
    NotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIndex",
}));

export type CreateVectorBucketError =
  | ConflictException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a vector bucket in the Amazon Web Services Region that you want your bucket to be in.
 *
 * ### Permissions
 *
 * You must have the `s3vectors:CreateVectorBucket` permission to use this operation.
 *
 * You must have the `s3vectors:TagResource` permission in addition to `s3vectors:CreateVectorBucket` permission to create a vector bucket with tags.
 */
export const createVectorBucket: API.OperationMethod<
  CreateVectorBucketInput,
  CreateVectorBucketOutput,
  CreateVectorBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVectorBucketInput,
  output: CreateVectorBucketOutput,
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVectorBucket",
}));

export type DeleteIndexError =
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes a vector index. To specify the vector index, you can either use both the vector bucket name and vector index name, or use the vector index Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:DeleteIndex` permission to use this operation.
 */
export const deleteIndex: API.OperationMethod<
  DeleteIndexInput,
  DeleteIndexOutput,
  DeleteIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIndexInput,
  output: DeleteIndexOutput,
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIndex",
}));

export type DeleteVectorBucketError =
  | ConflictException
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes a vector bucket. All vector indexes in the vector bucket must be deleted before the vector bucket can be deleted. To perform this operation, you must use either the vector bucket name or the vector bucket Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:DeleteVectorBucket` permission to use this operation.
 */
export const deleteVectorBucket: API.OperationMethod<
  DeleteVectorBucketInput,
  DeleteVectorBucketOutput,
  DeleteVectorBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVectorBucketInput,
  output: DeleteVectorBucketOutput,
  errors: [ConflictException, NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVectorBucket",
}));

export type DeleteVectorBucketPolicyError =
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes a vector bucket policy. To specify the bucket, you must use either the vector bucket name or the vector bucket Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:DeleteVectorBucketPolicy` permission to use this operation.
 */
export const deleteVectorBucketPolicy: API.OperationMethod<
  DeleteVectorBucketPolicyInput,
  DeleteVectorBucketPolicyOutput,
  DeleteVectorBucketPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVectorBucketPolicyInput,
  output: DeleteVectorBucketPolicyOutput,
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVectorBucketPolicy",
}));

export type DeleteVectorsError =
  | AccessDeniedException
  | KmsDisabledException
  | KmsInvalidKeyUsageException
  | KmsInvalidStateException
  | KmsNotFoundException
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Deletes one or more vectors in a vector index. To specify the vector index, you can either use both the vector bucket name and vector index name, or use the vector index Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:DeleteVectors` permission to use this operation.
 */
export const deleteVectors: API.OperationMethod<
  DeleteVectorsInput,
  DeleteVectorsOutput,
  DeleteVectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVectorsInput,
  output: DeleteVectorsOutput,
  errors: [
    AccessDeniedException,
    KmsDisabledException,
    KmsInvalidKeyUsageException,
    KmsInvalidStateException,
    KmsNotFoundException,
    NotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVectors",
}));

export type GetIndexError =
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns vector index attributes. To specify the vector index, you can either use both the vector bucket name and the vector index name, or use the vector index Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:GetIndex` permission to use this operation.
 */
export const getIndex: API.OperationMethod<
  GetIndexInput,
  GetIndexOutput,
  GetIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIndexInput,
  output: GetIndexOutput,
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIndex",
}));

export type GetVectorBucketError =
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns vector bucket attributes. To specify the bucket, you must use either the vector bucket name or the vector bucket Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:GetVectorBucket` permission to use this operation.
 */
export const getVectorBucket: API.OperationMethod<
  GetVectorBucketInput,
  GetVectorBucketOutput,
  GetVectorBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetVectorBucketInput,
  output: GetVectorBucketOutput,
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVectorBucket",
}));

export type GetVectorBucketPolicyError =
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Gets details about a vector bucket policy. To specify the bucket, you must use either the vector bucket name or the vector bucket Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:GetVectorBucketPolicy` permission to use this operation.
 */
export const getVectorBucketPolicy: API.OperationMethod<
  GetVectorBucketPolicyInput,
  GetVectorBucketPolicyOutput,
  GetVectorBucketPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetVectorBucketPolicyInput,
  output: GetVectorBucketPolicyOutput,
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVectorBucketPolicy",
}));

export type GetVectorsError =
  | KmsDisabledException
  | KmsInvalidKeyUsageException
  | KmsInvalidStateException
  | KmsNotFoundException
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns vector attributes. To specify the vector index, you can either use both the vector bucket name and the vector index name, or use the vector index Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:GetVectors` permission to use this operation.
 */
export const getVectors: API.OperationMethod<
  GetVectorsInput,
  GetVectorsOutput,
  GetVectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetVectorsInput,
  output: GetVectorsOutput,
  errors: [
    KmsDisabledException,
    KmsInvalidKeyUsageException,
    KmsInvalidStateException,
    KmsNotFoundException,
    NotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVectors",
}));

export type ListIndexesError =
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Returns a list of all the vector indexes within the specified vector bucket. To specify the bucket, you must use either the vector bucket name or the vector bucket Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:ListIndexes` permission to use this operation.
 */
export const listIndexes: API.PaginatedOperationMethod<
  ListIndexesInput,
  ListIndexesOutput,
  ListIndexesError,
  Credentials | HttpClient.HttpClient,
  IndexSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIndexesInput,
  output: ListIndexesOutput,
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIndexes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "indexes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists all of the tags applied to a specified Amazon S3 Vectors resource. Each tag is a label consisting of a key and value pair. Tags can help you organize, track costs for, and control access to resources.
 *
 * For a list of S3 resources that support tagging, see Managing tags for Amazon S3 resources.
 *
 * ### Permissions
 *
 * For vector buckets and vector indexes, you must have the `s3vectors:ListTagsForResource` permission to use this operation.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListVectorBucketsError = ServiceUnavailableException | CommonErrors;
/**
 * Returns a list of all the vector buckets that are owned by the authenticated sender of the request.
 *
 * ### Permissions
 *
 * You must have the `s3vectors:ListVectorBuckets` permission to use this operation.
 */
export const listVectorBuckets: API.PaginatedOperationMethod<
  ListVectorBucketsInput,
  ListVectorBucketsOutput,
  ListVectorBucketsError,
  Credentials | HttpClient.HttpClient,
  VectorBucketSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVectorBucketsInput,
  output: ListVectorBucketsOutput,
  errors: [ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVectorBuckets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "vectorBuckets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListVectorsError =
  | AccessDeniedException
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * List vectors in the specified vector index. To specify the vector index, you can either use both the vector bucket name and the vector index name, or use the vector index Amazon Resource Name (ARN).
 *
 * `ListVectors` operations proceed sequentially; however, for faster performance on a large number of vectors in a vector index, applications can request a parallel `ListVectors` operation by providing the `segmentCount` and `segmentIndex` parameters.
 *
 * ### Permissions
 *
 * You must have the `s3vectors:ListVectors` permission to use this operation. Additional permissions are required based on the request parameters you specify:
 *
 * - With only `s3vectors:ListVectors` permission, you can list vector keys when `returnData` and `returnMetadata` are both set to false or not specified..
 *
 * - If you set `returnData` or `returnMetadata` to true, you must have both `s3vectors:ListVectors` and `s3vectors:GetVectors` permissions. The request fails with a `403 Forbidden` error if you request vector data or metadata without the `s3vectors:GetVectors` permission.
 */
export const listVectors: API.PaginatedOperationMethod<
  ListVectorsInput,
  ListVectorsOutput,
  ListVectorsError,
  Credentials | HttpClient.HttpClient,
  ListOutputVector
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVectorsInput,
  output: ListVectorsOutput,
  errors: [
    AccessDeniedException,
    NotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVectors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "vectors",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutVectorBucketPolicyError =
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a bucket policy for a vector bucket. To specify the bucket, you must use either the vector bucket name or the vector bucket Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:PutVectorBucketPolicy` permission to use this operation.
 */
export const putVectorBucketPolicy: API.OperationMethod<
  PutVectorBucketPolicyInput,
  PutVectorBucketPolicyOutput,
  PutVectorBucketPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutVectorBucketPolicyInput,
  output: PutVectorBucketPolicyOutput,
  errors: [NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutVectorBucketPolicy",
}));

export type PutVectorsError =
  | AccessDeniedException
  | KmsDisabledException
  | KmsInvalidKeyUsageException
  | KmsInvalidStateException
  | KmsNotFoundException
  | NotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Adds one or more vectors to a vector index. To specify the vector index, you can either use both the vector bucket name and the vector index name, or use the vector index Amazon Resource Name (ARN).
 *
 * For more information about limits, see Limitations and restrictions in the *Amazon S3 User Guide*.
 *
 * When inserting vector data into your vector index, you must provide the vector data as `float32` (32-bit floating point) values. If you pass higher-precision values to an Amazon Web Services SDK, S3 Vectors converts the values to 32-bit floating point before storing them, and `GetVectors`, `ListVectors`, and `QueryVectors` operations return the float32 values. Different Amazon Web Services SDKs may have different default numeric types, so ensure your vectors are properly formatted as `float32` values regardless of which SDK you're using. For example, in Python, use `numpy.float32` or explicitly cast your values.
 *
 * ### Permissions
 *
 * You must have the `s3vectors:PutVectors` permission to use this operation.
 */
export const putVectors: API.OperationMethod<
  PutVectorsInput,
  PutVectorsOutput,
  PutVectorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutVectorsInput,
  output: PutVectorsOutput,
  errors: [
    AccessDeniedException,
    KmsDisabledException,
    KmsInvalidKeyUsageException,
    KmsInvalidStateException,
    KmsNotFoundException,
    NotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutVectors",
}));

export type QueryVectorsError =
  | KmsDisabledException
  | KmsInvalidKeyUsageException
  | KmsInvalidStateException
  | KmsNotFoundException
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Performs an approximate nearest neighbor search query in a vector index using a query vector. By default, it returns the keys of approximate nearest neighbors. You can optionally include the computed distance (between the query vector and each vector in the response) and metadata of each vector in the response.
 *
 * To specify the vector index, you can either use both the vector bucket name and the vector index name, or use the vector index Amazon Resource Name (ARN).
 *
 * ### Permissions
 *
 * You must have the `s3vectors:QueryVectors` permission to use this operation. Additional permissions are required based on the request parameters you specify:
 *
 * - With only `s3vectors:QueryVectors` permission, you can retrieve vector keys of approximate nearest neighbors and computed distances between these vectors. This permission is sufficient only when you don't set any metadata filters and don't request metadata (by keeping the `returnMetadata` parameter set to `false` or not specified).
 *
 * - If you specify a metadata filter or set `returnMetadata` to true, you must have both `s3vectors:QueryVectors` and `s3vectors:GetVectors` permissions. The request fails with a `403 Forbidden error` if you request metadata filtering or metadata without the `s3vectors:GetVectors` permission.
 */
export const queryVectors: API.PaginatedOperationMethod<
  QueryVectorsInput,
  QueryVectorsOutput,
  QueryVectorsError,
  Credentials | HttpClient.HttpClient,
  QueryOutputVector
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: QueryVectorsInput,
  output: QueryVectorsOutput,
  errors: [
    KmsDisabledException,
    KmsInvalidKeyUsageException,
    KmsInvalidStateException,
    KmsNotFoundException,
    NotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "QueryVectors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "vectors",
  } as const,
})) as any;

export type TagResourceError =
  | ConflictException
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Applies one or more user-defined tags to an Amazon S3 Vectors resource or updates existing tags. Each tag is a label consisting of a key and value pair. Tags can help you organize, track costs for, and control access to your resources. You can add up to 50 tags for each resource.
 *
 * For a list of S3 resources that support tagging, see Managing tags for Amazon S3 resources.
 *
 * ### Permissions
 *
 * For vector buckets and vector indexes, you must have the `s3vectors:TagResource` permission to use this operation.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
  errors: [ConflictException, NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ConflictException
  | NotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Removes the specified user-defined tags from an Amazon S3 Vectors resource. You can pass one or more tag keys.
 *
 * For a list of S3 resources that support tagging, see Managing tags for Amazon S3 resources.
 *
 * ### Permissions
 *
 * For vector buckets and vector indexes, you must have the `s3vectors:UntagResource` permission to use this operation.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [ConflictException, NotFoundException, ServiceUnavailableException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));
