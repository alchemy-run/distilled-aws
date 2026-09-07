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
const svc = T.AwsApiService({ sdkId: "EBS", serviceShapeName: "Ebs" });
const auth = T.AwsAuthSigv4({ name: "ebs" });
const ver = T.ServiceVersion("2019-11-02");
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
              `https://ebs-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://ebs-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://ebs.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://ebs.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.suspend(() => AccessDeniedExceptionReason).annotate({
        identifier: "AccessDeniedExceptionReason",
      }),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConcurrentLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentLimitExceededException>()(
    "ConcurrentLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export class InvalidSignatureException
  extends /*@__PURE__*/ S.TaggedError<InvalidSignatureException>()(
    "InvalidSignatureException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RequestThrottledException
  extends /*@__PURE__*/ S.TaggedError<RequestThrottledException>()(
    "RequestThrottledException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => RequestThrottledExceptionReason).annotate({
          identifier: "RequestThrottledExceptionReason",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => ResourceNotFoundExceptionReason).annotate({
          identifier: "ResourceNotFoundExceptionReason",
        }),
      ),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => ServiceQuotaExceededExceptionReason).annotate({
          identifier: "ServiceQuotaExceededExceptionReason",
        }),
      ),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => ValidationExceptionReason).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type SnapshotId = string;
export type ChangedBlocksCount = number;
export type Checksum = string;
export type ChecksumAlgorithm = "SHA256" | (string & {});
export const ChecksumAlgorithm = S.String;

export type ChecksumAggregationMethod = "LINEAR" | (string & {});
export const ChecksumAggregationMethod = S.String;

export interface CompleteSnapshotRequest {
  SnapshotId: string;
  ChangedBlocksCount: number;
  Checksum?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  ChecksumAggregationMethod?: ChecksumAggregationMethod;
}
export const CompleteSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnapshotId: S.String.pipe(T.HttpLabel("SnapshotId")),
    ChangedBlocksCount: S.Number.pipe(T.HttpHeader("x-amz-ChangedBlocksCount")),
    Checksum: S.optional(S.String).pipe(T.HttpHeader("x-amz-Checksum")),
    ChecksumAlgorithm: S.optional(ChecksumAlgorithm).pipe(
      T.HttpHeader("x-amz-Checksum-Algorithm"),
    ),
    ChecksumAggregationMethod: S.optional(ChecksumAggregationMethod).pipe(
      T.HttpHeader("x-amz-Checksum-Aggregation-Method"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/snapshots/completion/{SnapshotId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CompleteSnapshotRequest",
}) as any as S.Schema<CompleteSnapshotRequest>;
export type Status = "completed" | "pending" | "error" | (string & {});
export const Status = S.String;

export interface CompleteSnapshotResponse {
  Status?: Status;
}
export const CompleteSnapshotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(Status) }),
).annotate({
  identifier: "CompleteSnapshotResponse",
}) as any as S.Schema<CompleteSnapshotResponse>;
export type BlockIndex = number;
export type BlockToken = string;
export interface GetSnapshotBlockRequest {
  SnapshotId: string;
  BlockIndex: number;
  BlockToken: string;
}
export const GetSnapshotBlockRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnapshotId: S.String.pipe(T.HttpLabel("SnapshotId")),
    BlockIndex: S.Number.pipe(T.HttpLabel("BlockIndex")),
    BlockToken: S.String.pipe(T.HttpQuery("blockToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/snapshots/{SnapshotId}/blocks/{BlockIndex}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSnapshotBlockRequest",
}) as any as S.Schema<GetSnapshotBlockRequest>;
export type DataLength = number;
export interface GetSnapshotBlockResponse {
  DataLength?: number;
  BlockData?: T.StreamingOutputBody;
  Checksum?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
}
export const GetSnapshotBlockResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataLength: S.optional(S.Number).pipe(T.HttpHeader("x-amz-Data-Length")),
    BlockData: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
    Checksum: S.optional(S.String).pipe(T.HttpHeader("x-amz-Checksum")),
    ChecksumAlgorithm: S.optional(ChecksumAlgorithm).pipe(
      T.HttpHeader("x-amz-Checksum-Algorithm"),
    ),
  }),
).annotate({
  identifier: "GetSnapshotBlockResponse",
}) as any as S.Schema<GetSnapshotBlockResponse>;
export type PageToken = string;
export type MaxResults = number;
export interface ListChangedBlocksRequest {
  FirstSnapshotId?: string;
  SecondSnapshotId: string;
  NextToken?: string;
  MaxResults?: number;
  StartingBlockIndex?: number;
}
export const ListChangedBlocksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FirstSnapshotId: S.optional(S.String).pipe(T.HttpQuery("firstSnapshotId")),
    SecondSnapshotId: S.String.pipe(T.HttpLabel("SecondSnapshotId")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("pageToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    StartingBlockIndex: S.optional(S.Number).pipe(
      T.HttpQuery("startingBlockIndex"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/snapshots/{SecondSnapshotId}/changedblocks",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListChangedBlocksRequest",
}) as any as S.Schema<ListChangedBlocksRequest>;
export interface ChangedBlock {
  BlockIndex?: number;
  FirstBlockToken?: string;
  SecondBlockToken?: string;
}
export const ChangedBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BlockIndex: S.optional(S.Number),
    FirstBlockToken: S.optional(S.String),
    SecondBlockToken: S.optional(S.String),
  }),
).annotate({ identifier: "ChangedBlock" }) as any as S.Schema<ChangedBlock>;
export type ChangedBlocks = ChangedBlock[];
export const ChangedBlocks = /*@__PURE__*/ S.Array(ChangedBlock);
export type VolumeSize = number;
export type BlockSize = number;
export interface ListChangedBlocksResponse {
  ChangedBlocks?: ChangedBlock[];
  ExpiryTime?: Date;
  VolumeSize?: number;
  BlockSize?: number;
  NextToken?: string;
}
export const ListChangedBlocksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChangedBlocks: S.optional(ChangedBlocks),
    ExpiryTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    VolumeSize: S.optional(S.Number),
    BlockSize: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListChangedBlocksResponse",
}) as any as S.Schema<ListChangedBlocksResponse>;
export interface ListSnapshotBlocksRequest {
  SnapshotId: string;
  NextToken?: string;
  MaxResults?: number;
  StartingBlockIndex?: number;
}
export const ListSnapshotBlocksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnapshotId: S.String.pipe(T.HttpLabel("SnapshotId")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("pageToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    StartingBlockIndex: S.optional(S.Number).pipe(
      T.HttpQuery("startingBlockIndex"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/snapshots/{SnapshotId}/blocks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSnapshotBlocksRequest",
}) as any as S.Schema<ListSnapshotBlocksRequest>;
export interface Block {
  BlockIndex?: number;
  BlockToken?: string;
}
export const Block = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BlockIndex: S.optional(S.Number),
    BlockToken: S.optional(S.String),
  }),
).annotate({ identifier: "Block" }) as any as S.Schema<Block>;
export type Blocks = Block[];
export const Blocks = /*@__PURE__*/ S.Array(Block);
export interface ListSnapshotBlocksResponse {
  Blocks?: Block[];
  ExpiryTime?: Date;
  VolumeSize?: number;
  BlockSize?: number;
  NextToken?: string;
}
export const ListSnapshotBlocksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Blocks: S.optional(Blocks),
    ExpiryTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    VolumeSize: S.optional(S.Number),
    BlockSize: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSnapshotBlocksResponse",
}) as any as S.Schema<ListSnapshotBlocksResponse>;
export type Progress = number;
export interface PutSnapshotBlockRequest {
  SnapshotId: string;
  BlockIndex: number;
  BlockData: T.StreamingInputBody;
  DataLength: number;
  Progress?: number;
  Checksum: string;
  ChecksumAlgorithm: ChecksumAlgorithm;
}
export const PutSnapshotBlockRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnapshotId: S.String.pipe(T.HttpLabel("SnapshotId")),
    BlockIndex: S.Number.pipe(T.HttpLabel("BlockIndex")),
    BlockData: T.StreamingInput.pipe(T.HttpPayload()),
    DataLength: S.Number.pipe(T.HttpHeader("x-amz-Data-Length")),
    Progress: S.optional(S.Number).pipe(T.HttpHeader("x-amz-Progress")),
    Checksum: S.String.pipe(T.HttpHeader("x-amz-Checksum")),
    ChecksumAlgorithm: ChecksumAlgorithm.pipe(
      T.HttpHeader("x-amz-Checksum-Algorithm"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/snapshots/{SnapshotId}/blocks/{BlockIndex}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutSnapshotBlockRequest",
}) as any as S.Schema<PutSnapshotBlockRequest>;
export interface PutSnapshotBlockResponse {
  Checksum?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
}
export const PutSnapshotBlockResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Checksum: S.optional(S.String).pipe(T.HttpHeader("x-amz-Checksum")),
    ChecksumAlgorithm: S.optional(ChecksumAlgorithm).pipe(
      T.HttpHeader("x-amz-Checksum-Algorithm"),
    ),
  }),
).annotate({
  identifier: "PutSnapshotBlockResponse",
}) as any as S.Schema<PutSnapshotBlockResponse>;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type Tags = Tag[];
export const Tags = /*@__PURE__*/ S.Array(Tag);
export type Description = string;
export type IdempotencyToken = string;
export type KmsKeyArn = string | redacted.Redacted<string>;
export type Timeout = number;
export interface StartSnapshotRequest {
  VolumeSize: number;
  ParentSnapshotId?: string;
  Tags?: Tag[];
  Description?: string;
  ClientToken?: string;
  Encrypted?: boolean;
  KmsKeyArn?: string | redacted.Redacted<string>;
  Timeout?: number;
}
export const StartSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VolumeSize: S.Number,
    ParentSnapshotId: S.optional(S.String),
    Tags: S.optional(Tags),
    Description: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Encrypted: S.optional(S.Boolean),
    KmsKeyArn: S.optional(SensitiveString),
    Timeout: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/snapshots" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartSnapshotRequest",
}) as any as S.Schema<StartSnapshotRequest>;
export type OwnerId = string;
export type SSEType = "sse-ebs" | "sse-kms" | "none" | (string & {});
export const SSEType = S.String;

export interface StartSnapshotResponse {
  Description?: string;
  SnapshotId?: string;
  OwnerId?: string;
  Status?: Status;
  StartTime?: Date;
  VolumeSize?: number;
  BlockSize?: number;
  Tags?: Tag[];
  ParentSnapshotId?: string;
  KmsKeyArn?: string | redacted.Redacted<string>;
  SseType?: SSEType;
}
export const StartSnapshotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    SnapshotId: S.optional(S.String),
    OwnerId: S.optional(S.String),
    Status: S.optional(Status),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    VolumeSize: S.optional(S.Number),
    BlockSize: S.optional(S.Number),
    Tags: S.optional(Tags),
    ParentSnapshotId: S.optional(S.String),
    KmsKeyArn: S.optional(SensitiveString),
    SseType: S.optional(SSEType),
  }),
).annotate({
  identifier: "StartSnapshotResponse",
}) as any as S.Schema<StartSnapshotResponse>;
export type ErrorMessage = string;
export type AccessDeniedExceptionReason =
  | "UNAUTHORIZED_ACCOUNT"
  | "DEPENDENCY_ACCESS_DENIED"
  | (string & {});
export const AccessDeniedExceptionReason = S.String;

export type RequestThrottledExceptionReason =
  | "ACCOUNT_THROTTLED"
  | "DEPENDENCY_REQUEST_THROTTLED"
  | "RESOURCE_LEVEL_THROTTLE"
  | (string & {});
export const RequestThrottledExceptionReason = S.String;

export type ResourceNotFoundExceptionReason =
  | "SNAPSHOT_NOT_FOUND"
  | "GRANT_NOT_FOUND"
  | "DEPENDENCY_RESOURCE_NOT_FOUND"
  | "IMAGE_NOT_FOUND"
  | (string & {});
export const ResourceNotFoundExceptionReason = S.String;

export type ServiceQuotaExceededExceptionReason =
  | "DEPENDENCY_SERVICE_QUOTA_EXCEEDED"
  | (string & {});
export const ServiceQuotaExceededExceptionReason = S.String;

export type ValidationExceptionReason =
  | "INVALID_CUSTOMER_KEY"
  | "INVALID_PAGE_TOKEN"
  | "INVALID_BLOCK_TOKEN"
  | "INVALID_GRANT_TOKEN"
  | "INVALID_SNAPSHOT_ID"
  | "UNRELATED_SNAPSHOTS"
  | "INVALID_BLOCK"
  | "INVALID_CONTENT_ENCODING"
  | "INVALID_TAG"
  | "INVALID_DEPENDENCY_REQUEST"
  | "INVALID_PARAMETER_VALUE"
  | "INVALID_VOLUME_SIZE"
  | "CONFLICTING_BLOCK_UPDATE"
  | "INVALID_IMAGE_ID"
  | "WRITE_REQUEST_TIMEOUT"
  | (string & {});
export const ValidationExceptionReason = S.String;

export type CompleteSnapshotError =
  | AccessDeniedException
  | InternalServerException
  | RequestThrottledException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | InvalidSignatureException
  | CommonErrors;
/**
 * Seals and completes the snapshot after all of the required blocks of data have been
 * written to it. Completing the snapshot changes the status to `completed`. You
 * cannot write new blocks to a snapshot after it has been completed.
 *
 * You should always retry requests that receive server (`5xx`)
 * error responses, and `ThrottlingException` and `RequestThrottledException`
 * client error responses. For more information see Error retries in the
 * *Amazon Elastic Compute Cloud User Guide*.
 */
export const completeSnapshot: API.OperationMethod<
  CompleteSnapshotRequest,
  CompleteSnapshotResponse,
  CompleteSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CompleteSnapshotRequest,
  output: CompleteSnapshotResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestThrottledException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    InvalidSignatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteSnapshot",
}));

export type GetSnapshotBlockError =
  | AccessDeniedException
  | InternalServerException
  | RequestThrottledException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Returns the data in a block in an Amazon Elastic Block Store snapshot.
 *
 * You should always retry requests that receive server (`5xx`)
 * error responses, and `ThrottlingException` and `RequestThrottledException`
 * client error responses. For more information see Error retries in the
 * *Amazon Elastic Compute Cloud User Guide*.
 */
export const getSnapshotBlock: API.OperationMethod<
  GetSnapshotBlockRequest,
  GetSnapshotBlockResponse,
  GetSnapshotBlockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSnapshotBlockRequest,
  output: GetSnapshotBlockResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestThrottledException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSnapshotBlock",
}));

export type ListChangedBlocksError =
  | AccessDeniedException
  | InternalServerException
  | RequestThrottledException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the blocks that are different between two
 * Amazon Elastic Block Store snapshots of the same volume/snapshot lineage.
 *
 * You should always retry requests that receive server (`5xx`)
 * error responses, and `ThrottlingException` and `RequestThrottledException`
 * client error responses. For more information see Error retries in the
 * *Amazon Elastic Compute Cloud User Guide*.
 */
export const listChangedBlocks: API.PaginatedOperationMethod<
  ListChangedBlocksRequest,
  ListChangedBlocksResponse,
  ListChangedBlocksError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListChangedBlocksRequest,
  output: ListChangedBlocksResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestThrottledException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChangedBlocks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSnapshotBlocksError =
  | AccessDeniedException
  | InternalServerException
  | RequestThrottledException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the blocks in an Amazon Elastic Block Store snapshot.
 *
 * You should always retry requests that receive server (`5xx`)
 * error responses, and `ThrottlingException` and `RequestThrottledException`
 * client error responses. For more information see Error retries in the
 * *Amazon Elastic Compute Cloud User Guide*.
 */
export const listSnapshotBlocks: API.PaginatedOperationMethod<
  ListSnapshotBlocksRequest,
  ListSnapshotBlocksResponse,
  ListSnapshotBlocksError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSnapshotBlocksRequest,
  output: ListSnapshotBlocksResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestThrottledException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSnapshotBlocks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutSnapshotBlockError =
  | AccessDeniedException
  | InternalServerException
  | RequestThrottledException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | InvalidSignatureException
  | CommonErrors;
/**
 * Writes a block of data to a snapshot. If the specified block contains
 * data, the existing data is overwritten. The target snapshot must be in the
 * `pending` state.
 *
 * Data written to a snapshot must be aligned with 512-KiB sectors.
 *
 * You should always retry requests that receive server (`5xx`)
 * error responses, and `ThrottlingException` and `RequestThrottledException`
 * client error responses. For more information see Error retries in the
 * *Amazon Elastic Compute Cloud User Guide*.
 */
export const putSnapshotBlock: API.OperationMethod<
  PutSnapshotBlockRequest,
  PutSnapshotBlockResponse,
  PutSnapshotBlockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutSnapshotBlockRequest,
  output: PutSnapshotBlockResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    RequestThrottledException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    InvalidSignatureException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSnapshotBlock",
}));

export type StartSnapshotError =
  | AccessDeniedException
  | ConcurrentLimitExceededException
  | ConflictException
  | InternalServerException
  | RequestThrottledException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Amazon EBS snapshot. The new snapshot enters the `pending` state
 * after the request completes.
 *
 * After creating the snapshot, use PutSnapshotBlock to
 * write blocks of data to the snapshot.
 *
 * You should always retry requests that receive server (`5xx`)
 * error responses, and `ThrottlingException` and `RequestThrottledException`
 * client error responses. For more information see Error retries in the
 * *Amazon Elastic Compute Cloud User Guide*.
 */
export const startSnapshot: API.OperationMethod<
  StartSnapshotRequest,
  StartSnapshotResponse,
  StartSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartSnapshotRequest,
  output: StartSnapshotResponse,
  errors: [
    AccessDeniedException,
    ConcurrentLimitExceededException,
    ConflictException,
    InternalServerException,
    RequestThrottledException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSnapshot",
}));
