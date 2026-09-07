import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc = T.AwsApiService({ sdkId: "DSQL", serviceShapeName: "DSQL" });
const auth = T.AwsAuthSigv4({ name: "dsql" });
const ver = T.ServiceVersion("2018-05-10");
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
            `https://dsql-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://dsql.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.suspend(() => ValidationExceptionReason).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DeletionProtectionEnabled = boolean;
export type KmsEncryptionKey = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ClientToken = string;
export type Region = string;
export type ClusterArn = string;
export type ClusterArnList = string[];
export const ClusterArnList = /*@__PURE__*/ S.Array(S.String);
export interface MultiRegionProperties {
  witnessRegion?: string;
  clusters?: string[];
}
export const MultiRegionProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    witnessRegion: S.optional(S.String),
    clusters: S.optional(ClusterArnList),
  }),
).annotate({
  identifier: "MultiRegionProperties",
}) as any as S.Schema<MultiRegionProperties>;
export type PolicyDocument = string;
export type BypassPolicyLockoutSafetyCheck = boolean;
export interface CreateClusterInput {
  deletionProtectionEnabled?: boolean;
  kmsEncryptionKey?: string;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
  multiRegionProperties?: MultiRegionProperties;
  policy?: string;
  bypassPolicyLockoutSafetyCheck?: boolean;
}
export const CreateClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deletionProtectionEnabled: S.optional(S.Boolean),
    kmsEncryptionKey: S.optional(S.String),
    tags: S.optional(TagMap),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    multiRegionProperties: S.optional(MultiRegionProperties),
    policy: S.optional(S.String),
    bypassPolicyLockoutSafetyCheck: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/cluster" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateClusterInput",
}) as any as S.Schema<CreateClusterInput>;
export type ClusterId = string;
export type ClusterStatus =
  | "CREATING"
  | "ACTIVE"
  | "IDLE"
  | "INACTIVE"
  | "UPDATING"
  | "DELETING"
  | "DELETED"
  | "FAILED"
  | "PENDING_SETUP"
  | "PENDING_DELETE"
  | (string & {});
export const ClusterStatus = /*@__PURE__*/ S.String;

export type ClusterCreationTime = Date;
export type EncryptionType =
  | "AWS_OWNED_KMS_KEY"
  | "CUSTOMER_MANAGED_KMS_KEY"
  | (string & {});
export const EncryptionType = /*@__PURE__*/ S.String;

export type KmsKeyArn = string;
export type EncryptionStatus =
  | "ENABLED"
  | "UPDATING"
  | "KMS_KEY_INACCESSIBLE"
  | "ENABLING"
  | (string & {});
export const EncryptionStatus = /*@__PURE__*/ S.String;

export interface EncryptionDetails {
  encryptionType: EncryptionType;
  kmsKeyArn?: string;
  encryptionStatus: EncryptionStatus;
}
export const EncryptionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    encryptionType: EncryptionType,
    kmsKeyArn: S.optional(S.String),
    encryptionStatus: EncryptionStatus,
  }),
).annotate({
  identifier: "EncryptionDetails",
}) as any as S.Schema<EncryptionDetails>;
export type Endpoint = string;
export interface CreateClusterOutput {
  identifier: string;
  arn: string;
  status: ClusterStatus;
  creationTime: Date;
  multiRegionProperties?: MultiRegionProperties;
  encryptionDetails?: EncryptionDetails;
  deletionProtectionEnabled: boolean;
  endpoint?: string;
}
export const CreateClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String,
    arn: S.String,
    status: ClusterStatus,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    multiRegionProperties: S.optional(MultiRegionProperties),
    encryptionDetails: S.optional(EncryptionDetails),
    deletionProtectionEnabled: S.Boolean,
    endpoint: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateClusterOutput",
}) as any as S.Schema<CreateClusterOutput>;
export type KinesisStreamArn = string;
export type RoleArn = string;
export interface KinesisTargetDefinition {
  streamArn: string;
  roleArn: string;
}
export const KinesisTargetDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ streamArn: S.String, roleArn: S.String }),
).annotate({
  identifier: "KinesisTargetDefinition",
}) as any as S.Schema<KinesisTargetDefinition>;
export type TargetDefinition = { kinesis: KinesisTargetDefinition };
export const TargetDefinition = /*@__PURE__*/ S.Union([
  S.Struct({ kinesis: KinesisTargetDefinition }),
]);
export type StreamOrdering = "UNORDERED" | (string & {});
export const StreamOrdering = /*@__PURE__*/ S.String;

export type StreamFormat = "JSON" | (string & {});
export const StreamFormat = /*@__PURE__*/ S.String;

export interface CreateStreamInput {
  clusterIdentifier: string;
  targetDefinition: TargetDefinition;
  ordering: StreamOrdering;
  format: StreamFormat;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export const CreateStreamInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterIdentifier: S.String.pipe(T.HttpLabel("clusterIdentifier")),
    targetDefinition: TargetDefinition,
    ordering: StreamOrdering,
    format: StreamFormat,
    tags: S.optional(TagMap),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/stream/{clusterIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateStreamInput",
}) as any as S.Schema<CreateStreamInput>;
export type StreamId = string;
export type StreamArn = string;
export type StreamStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "DELETED"
  | "FAILED"
  | "IMPAIRED"
  | (string & {});
export const StreamStatus = /*@__PURE__*/ S.String;

export type StreamCreationTime = Date;
export interface CreateStreamOutput {
  clusterIdentifier: string;
  streamIdentifier: string;
  arn: string;
  status: StreamStatus;
  creationTime: Date;
  ordering: StreamOrdering;
  format: StreamFormat;
}
export const CreateStreamOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterIdentifier: S.String,
    streamIdentifier: S.String,
    arn: S.String,
    status: StreamStatus,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ordering: StreamOrdering,
    format: StreamFormat,
  }),
).annotate({
  identifier: "CreateStreamOutput",
}) as any as S.Schema<CreateStreamOutput>;
export interface DeleteClusterInput {
  identifier: string;
  clientToken?: string;
}
export const DeleteClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("client-token"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/cluster/{identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteClusterInput",
}) as any as S.Schema<DeleteClusterInput>;
export interface DeleteClusterOutput {
  identifier: string;
  arn: string;
  status: ClusterStatus;
  creationTime: Date;
}
export const DeleteClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String,
    arn: S.String,
    status: ClusterStatus,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "DeleteClusterOutput",
}) as any as S.Schema<DeleteClusterOutput>;
export type PolicyVersion = string;
export interface DeleteClusterPolicyInput {
  identifier: string;
  expectedPolicyVersion?: string;
  clientToken?: string;
}
export const DeleteClusterPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    expectedPolicyVersion: S.optional(S.String).pipe(
      T.HttpQuery("expected-policy-version"),
    ),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("client-token"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/cluster/{identifier}/policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteClusterPolicyInput",
}) as any as S.Schema<DeleteClusterPolicyInput>;
export interface DeleteClusterPolicyOutput {
  policyVersion: string;
}
export const DeleteClusterPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyVersion: S.String }),
).annotate({
  identifier: "DeleteClusterPolicyOutput",
}) as any as S.Schema<DeleteClusterPolicyOutput>;
export interface DeleteStreamInput {
  clusterIdentifier: string;
  streamIdentifier: string;
  clientToken?: string;
}
export const DeleteStreamInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterIdentifier: S.String.pipe(T.HttpLabel("clusterIdentifier")),
    streamIdentifier: S.String.pipe(T.HttpLabel("streamIdentifier")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("client-token"),
      T.IdempotencyToken(),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/stream/{clusterIdentifier}/{streamIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteStreamInput",
}) as any as S.Schema<DeleteStreamInput>;
export interface DeleteStreamOutput {
  clusterIdentifier: string;
  streamIdentifier: string;
  arn: string;
  status: StreamStatus;
  creationTime: Date;
}
export const DeleteStreamOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterIdentifier: S.String,
    streamIdentifier: S.String,
    arn: S.String,
    status: StreamStatus,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "DeleteStreamOutput",
}) as any as S.Schema<DeleteStreamOutput>;
export interface GetClusterInput {
  identifier: string;
}
export const GetClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.String.pipe(T.HttpLabel("identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/cluster/{identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetClusterInput",
}) as any as S.Schema<GetClusterInput>;
export interface GetClusterOutput {
  identifier: string;
  arn: string;
  status: ClusterStatus;
  creationTime: Date;
  deletionProtectionEnabled: boolean;
  multiRegionProperties?: MultiRegionProperties;
  tags?: { [key: string]: string | undefined };
  encryptionDetails?: EncryptionDetails;
  endpoint?: string;
}
export const GetClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String,
    arn: S.String,
    status: ClusterStatus,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    deletionProtectionEnabled: S.Boolean,
    multiRegionProperties: S.optional(MultiRegionProperties),
    tags: S.optional(TagMap),
    encryptionDetails: S.optional(EncryptionDetails),
    endpoint: S.optional(S.String),
  }),
).annotate({
  identifier: "GetClusterOutput",
}) as any as S.Schema<GetClusterOutput>;
export interface GetClusterPolicyInput {
  identifier: string;
}
export const GetClusterPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.String.pipe(T.HttpLabel("identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/cluster/{identifier}/policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetClusterPolicyInput",
}) as any as S.Schema<GetClusterPolicyInput>;
export interface GetClusterPolicyOutput {
  policy: string;
  policyVersion: string;
}
export const GetClusterPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policy: S.String, policyVersion: S.String }),
).annotate({
  identifier: "GetClusterPolicyOutput",
}) as any as S.Schema<GetClusterPolicyOutput>;
export interface GetStreamInput {
  clusterIdentifier: string;
  streamIdentifier: string;
}
export const GetStreamInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterIdentifier: S.String.pipe(T.HttpLabel("clusterIdentifier")),
    streamIdentifier: S.String.pipe(T.HttpLabel("streamIdentifier")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/stream/{clusterIdentifier}/{streamIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetStreamInput" }) as any as S.Schema<GetStreamInput>;
export type StreamFailureErrorCode =
  | "KINESIS_THROUGHPUT_EXCEEDED"
  | "KINESIS_STREAM_NOT_FOUND"
  | "ROLE_ACCESS_DENIED"
  | "KINESIS_ACCESS_DENIED"
  | "KINESIS_KMS_ACCESS_DENIED"
  | "KINESIS_OVERSIZE_RECORD"
  | "CLUSTER_CMK_INACCESSIBLE"
  | "INTERNAL_ERROR"
  | (string & {});
export const StreamFailureErrorCode = /*@__PURE__*/ S.String;

export interface StatusReason {
  error: StreamFailureErrorCode;
  updatedAt: Date;
}
export const StatusReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    error: StreamFailureErrorCode,
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "StatusReason" }) as any as S.Schema<StatusReason>;
export interface GetStreamOutput {
  clusterIdentifier: string;
  streamIdentifier: string;
  arn: string;
  status: StreamStatus;
  creationTime: Date;
  ordering: StreamOrdering;
  format: StreamFormat;
  targetDefinition?: TargetDefinition;
  statusReason?: StatusReason;
  tags?: { [key: string]: string | undefined };
}
export const GetStreamOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterIdentifier: S.String,
    streamIdentifier: S.String,
    arn: S.String,
    status: StreamStatus,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ordering: StreamOrdering,
    format: StreamFormat,
    targetDefinition: S.optional(TargetDefinition),
    statusReason: S.optional(StatusReason),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetStreamOutput",
}) as any as S.Schema<GetStreamOutput>;
export interface GetVpcEndpointServiceNameInput {
  identifier: string;
}
export const GetVpcEndpointServiceNameInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.String.pipe(T.HttpLabel("identifier")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/clusters/{identifier}/vpc-endpoint-service-name",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVpcEndpointServiceNameInput",
}) as any as S.Schema<GetVpcEndpointServiceNameInput>;
export type ServiceName = string;
export type ClusterVpcEndpoint = string;
export interface GetVpcEndpointServiceNameOutput {
  serviceName: string;
  clusterVpcEndpoint?: string;
}
export const GetVpcEndpointServiceNameOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ serviceName: S.String, clusterVpcEndpoint: S.optional(S.String) }),
).annotate({
  identifier: "GetVpcEndpointServiceNameOutput",
}) as any as S.Schema<GetVpcEndpointServiceNameOutput>;
export type MaxResults = number;
export type NextToken = string;
export interface ListClustersInput {
  maxResults?: number;
  nextToken?: string;
}
export const ListClustersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/cluster" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListClustersInput",
}) as any as S.Schema<ListClustersInput>;
export interface ClusterSummary {
  identifier: string;
  arn: string;
}
export const ClusterSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.String, arn: S.String }),
).annotate({ identifier: "ClusterSummary" }) as any as S.Schema<ClusterSummary>;
export type ClusterList = ClusterSummary[];
export const ClusterList = /*@__PURE__*/ S.Array(ClusterSummary);
export interface ListClustersOutput {
  nextToken?: string;
  clusters: ClusterSummary[];
}
export const ListClustersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), clusters: ClusterList }),
).annotate({
  identifier: "ListClustersOutput",
}) as any as S.Schema<ListClustersOutput>;
export interface ListStreamsInput {
  clusterIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListStreamsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterIdentifier: S.String.pipe(T.HttpLabel("clusterIdentifier")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/stream/{clusterIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListStreamsInput",
}) as any as S.Schema<ListStreamsInput>;
export interface StreamSummary {
  clusterIdentifier: string;
  streamIdentifier: string;
  arn: string;
  creationTime: Date;
  status: StreamStatus;
}
export const StreamSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clusterIdentifier: S.String,
    streamIdentifier: S.String,
    arn: S.String,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: StreamStatus,
  }),
).annotate({ identifier: "StreamSummary" }) as any as S.Schema<StreamSummary>;
export type StreamList = StreamSummary[];
export const StreamList = /*@__PURE__*/ S.Array(StreamSummary);
export interface ListStreamsOutput {
  nextToken?: string;
  streams: StreamSummary[];
}
export const ListStreamsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), streams: StreamList }),
).annotate({
  identifier: "ListStreamsOutput",
}) as any as S.Schema<ListStreamsOutput>;
export type Arn = string;
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
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface PutClusterPolicyInput {
  identifier: string;
  policy: string;
  bypassPolicyLockoutSafetyCheck?: boolean;
  expectedPolicyVersion?: string;
  clientToken?: string;
}
export const PutClusterPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    policy: S.String,
    bypassPolicyLockoutSafetyCheck: S.optional(S.Boolean),
    expectedPolicyVersion: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/cluster/{identifier}/policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutClusterPolicyInput",
}) as any as S.Schema<PutClusterPolicyInput>;
export interface PutClusterPolicyOutput {
  policyVersion: string;
}
export const PutClusterPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyVersion: S.String }),
).annotate({
  identifier: "PutClusterPolicyOutput",
}) as any as S.Schema<PutClusterPolicyOutput>;
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagMap,
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
export interface TagResourceResponse {}
export const TagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
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
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateClusterInput {
  identifier: string;
  deletionProtectionEnabled?: boolean;
  kmsEncryptionKey?: string;
  clientToken?: string;
  multiRegionProperties?: MultiRegionProperties;
}
export const UpdateClusterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String.pipe(T.HttpLabel("identifier")),
    deletionProtectionEnabled: S.optional(S.Boolean),
    kmsEncryptionKey: S.optional(S.String),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    multiRegionProperties: S.optional(MultiRegionProperties),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/cluster/{identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateClusterInput",
}) as any as S.Schema<UpdateClusterInput>;
export interface UpdateClusterOutput {
  identifier: string;
  arn: string;
  status: ClusterStatus;
  creationTime: Date;
}
export const UpdateClusterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: S.String,
    arn: S.String,
    status: ClusterStatus,
    creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "UpdateClusterOutput",
}) as any as S.Schema<UpdateClusterOutput>;
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "deletionProtectionEnabled"
  | "other"
  | (string & {});
export const ValidationExceptionReason = /*@__PURE__*/ S.String;

export interface ValidationExceptionField {
  name: string;
  message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type CreateClusterError =
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * The CreateCluster API allows you to create both single-Region clusters and multi-Region clusters. With the addition of the *multiRegionProperties* parameter, you can create a cluster with witness Region support and establish peer relationships with clusters in other Regions during creation.
 *
 * Creating multi-Region clusters requires additional IAM permissions beyond those needed for single-Region clusters, as detailed in the **Required permissions** section below.
 *
 * **Required permissions**
 *
 * ### dsql:CreateCluster
 *
 * Required to create a cluster.
 *
 * Resources: `arn:aws:dsql:region:account-id:cluster/*`
 *
 * ### dsql:TagResource
 *
 * Permission to add tags to a resource.
 *
 * Resources: `arn:aws:dsql:region:account-id:cluster/*`
 *
 * ### dsql:PutMultiRegionProperties
 *
 * Permission to configure multi-Region properties for a cluster.
 *
 * Resources: `arn:aws:dsql:region:account-id:cluster/*`
 *
 * ### dsql:AddPeerCluster
 *
 * When specifying `multiRegionProperties.clusters`, permission to add peer clusters.
 *
 * Resources:
 *
 * - Local cluster: `arn:aws:dsql:region:account-id:cluster/*`
 *
 * - Each peer cluster: exact ARN of each specified peer cluster
 *
 * ### dsql:PutWitnessRegion
 *
 * When specifying `multiRegionProperties.witnessRegion`, permission to set a witness Region. This permission is checked both in the cluster Region and in the witness Region.
 *
 * Resources: `arn:aws:dsql:region:account-id:cluster/*`
 *
 * Condition Keys: `dsql:WitnessRegion` (matching the specified witness region)
 *
 * - The witness Region specified in `multiRegionProperties.witnessRegion` cannot be the same as the cluster's Region.
 */
export const createCluster: API.OperationMethod<
  CreateClusterInput,
  CreateClusterOutput,
  CreateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateClusterInput,
  output: CreateClusterOutput,
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
}));

export type CreateStreamError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new change data capture (CDC) stream for a cluster. The stream captures database changes and delivers them to the specified target destination.
 *
 * **Required permissions**
 *
 * ### dsql:CreateStream
 *
 * Permission to create a new stream.
 *
 * Resources: `arn:aws:dsql:region:account-id:cluster/cluster-id`
 *
 * ### iam:PassRole
 *
 * Permission to pass the IAM role specified in the target definition to the service.
 *
 * Resources: ARN of the IAM role specified in `targetDefinition.kinesis.roleArn`
 *
 * ### kms:Decrypt
 *
 * Required when the cluster uses a customer managed KMS key (CMK). Permission to decrypt data using the cluster's CMK.
 *
 * Resources: ARN of the KMS key used by the cluster
 */
export const createStream: API.OperationMethod<
  CreateStreamInput,
  CreateStreamOutput,
  CreateStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStreamInput,
  output: CreateStreamOutput,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStream",
}));

export type DeleteClusterError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a cluster in Amazon Aurora DSQL.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterInput,
  DeleteClusterOutput,
  DeleteClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteClusterInput,
  output: DeleteClusterOutput,
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCluster",
}));

export type DeleteClusterPolicyError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the resource-based policy attached to a cluster. This removes all access permissions defined by the policy, reverting to default access controls.
 */
export const deleteClusterPolicy: API.OperationMethod<
  DeleteClusterPolicyInput,
  DeleteClusterPolicyOutput,
  DeleteClusterPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteClusterPolicyInput,
  output: DeleteClusterPolicyOutput,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClusterPolicy",
}));

export type DeleteStreamError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a stream from a cluster.
 */
export const deleteStream: API.OperationMethod<
  DeleteStreamInput,
  DeleteStreamOutput,
  DeleteStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStreamInput,
  output: DeleteStreamOutput,
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStream",
}));

export type GetClusterError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves information about a cluster.
 */
export const getCluster: API.OperationMethod<
  GetClusterInput,
  GetClusterOutput,
  GetClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetClusterInput,
  output: GetClusterOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCluster",
}));

export type GetClusterPolicyError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the resource-based policy document attached to a cluster. This policy defines the access permissions and conditions for the cluster.
 */
export const getClusterPolicy: API.OperationMethod<
  GetClusterPolicyInput,
  GetClusterPolicyOutput,
  GetClusterPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetClusterPolicyInput,
  output: GetClusterPolicyOutput,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClusterPolicy",
}));

export type GetStreamError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves information about a stream.
 */
export const getStream: API.OperationMethod<
  GetStreamInput,
  GetStreamOutput,
  GetStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStreamInput,
  output: GetStreamOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStream",
}));

export type GetVpcEndpointServiceNameError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the VPC endpoint service name.
 */
export const getVpcEndpointServiceName: API.OperationMethod<
  GetVpcEndpointServiceNameInput,
  GetVpcEndpointServiceNameOutput,
  GetVpcEndpointServiceNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetVpcEndpointServiceNameInput,
  output: GetVpcEndpointServiceNameOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVpcEndpointServiceName",
}));

export type ListClustersError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves information about a list of clusters.
 */
export const listClusters: API.PaginatedOperationMethod<
  ListClustersInput,
  ListClustersOutput,
  ListClustersError,
  Credentials | HttpClient.HttpClient,
  ClusterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListClustersInput,
  output: ListClustersOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "clusters",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStreamsError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves information about a list of streams for a cluster.
 */
export const listStreams: API.PaginatedOperationMethod<
  ListStreamsInput,
  ListStreamsOutput,
  ListStreamsError,
  Credentials | HttpClient.HttpClient,
  StreamSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStreamsInput,
  output: ListStreamsOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreams",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "streams",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Lists all of the tags for a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutClusterPolicyError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Attaches a resource-based policy to a cluster. This policy defines access permissions and conditions for the cluster, allowing you to control which principals can perform actions on the cluster.
 */
export const putClusterPolicy: API.OperationMethod<
  PutClusterPolicyInput,
  PutClusterPolicyOutput,
  PutClusterPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutClusterPolicyInput,
  output: PutClusterPolicyOutput,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutClusterPolicy",
}));

export type TagResourceError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Tags a resource with a map of key and value pairs.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceResponse,
  errors: [ResourceNotFoundException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Removes a tag from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceResponse,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateClusterError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * The *UpdateCluster* API allows you to modify both single-Region and multi-Region cluster configurations. With the *multiRegionProperties* parameter, you can add or modify witness Region support and manage peer relationships with clusters in other Regions.
 *
 * Note that updating multi-Region clusters requires additional IAM permissions beyond those needed for standard cluster updates, as detailed in the Permissions section.
 *
 * **Required permissions**
 *
 * ### dsql:UpdateCluster
 *
 * Permission to update a DSQL cluster.
 *
 * Resources: `arn:aws:dsql:*region*:*account-id*:cluster/*cluster-id* `
 *
 * ### dsql:PutMultiRegionProperties
 *
 * Permission to configure multi-Region properties for a cluster.
 *
 * Resources: `arn:aws:dsql:*region*:*account-id*:cluster/*cluster-id* `
 *
 * ### dsql:GetCluster
 *
 * Permission to retrieve cluster information.
 *
 * Resources: `arn:aws:dsql:*region*:*account-id*:cluster/*cluster-id* `
 *
 * ### dsql:AddPeerCluster
 *
 * Permission to add peer clusters.
 *
 * Resources:
 *
 * - Local cluster: `arn:aws:dsql:*region*:*account-id*:cluster/*cluster-id* `
 *
 * - Each peer cluster: exact ARN of each specified peer cluster
 *
 * ### dsql:RemovePeerCluster
 *
 * Permission to remove peer clusters. The *dsql:RemovePeerCluster* permission uses a wildcard ARN pattern to simplify permission management during updates.
 *
 * Resources: `arn:aws:dsql:*:*account-id*:cluster/*`
 *
 * ### dsql:PutWitnessRegion
 *
 * Permission to set a witness Region.
 *
 * Resources: `arn:aws:dsql:*region*:*account-id*:cluster/*cluster-id* `
 *
 * Condition Keys: dsql:WitnessRegion (matching the specified witness Region)
 *
 * **This permission is checked both in the cluster Region and in the witness Region.**
 *
 * - The witness region specified in `multiRegionProperties.witnessRegion` cannot be the same as the cluster's Region.
 *
 * - When updating clusters with peer relationships, permissions are checked for both adding and removing peers.
 *
 * - The `dsql:RemovePeerCluster` permission uses a wildcard ARN pattern to simplify permission management during updates.
 */
export const updateCluster: API.OperationMethod<
  UpdateClusterInput,
  UpdateClusterOutput,
  UpdateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateClusterInput,
  output: UpdateClusterOutput,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCluster",
}));
