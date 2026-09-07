import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace("https://mediastore.amazonaws.com/doc/2017-09-01");
const svc = T.AwsApiService({
  sdkId: "MediaStore",
  serviceShapeName: "MediaStore_20170901",
});
const auth = T.AwsAuthSigv4({ name: "mediastore" });
const ver = T.ServiceVersion("2017-09-01");
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
              `https://mediastore-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://mediastore-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://mediastore.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://mediastore.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ContainerInUseException
  extends /*@__PURE__*/ S.TaggedError<ContainerInUseException>()(
    "ContainerInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ContainerNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ContainerNotFoundException>()(
    "ContainerNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CorsPolicyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<CorsPolicyNotFoundException>()(
    "CorsPolicyNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()(
    "InternalServerError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class PolicyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<PolicyNotFoundException>()(
    "PolicyNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type ContainerName = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface CreateContainerInput {
  ContainerName: string;
  Tags?: Tag[];
}
export const CreateContainerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContainerName: S.String, Tags: S.optional(TagList) }).pipe(
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
  identifier: "CreateContainerInput",
}) as any as S.Schema<CreateContainerInput>;
export type Endpoint = string;
export type ContainerARN = string;
export type ContainerStatus =
  | "ACTIVE"
  | "CREATING"
  | "DELETING"
  | (string & {});
export const ContainerStatus = /*@__PURE__*/ S.String;

export type ContainerAccessLoggingEnabled = boolean;
export interface Container {
  Endpoint?: string;
  CreationTime?: Date;
  ARN?: string;
  Name?: string;
  Status?: ContainerStatus;
  AccessLoggingEnabled?: boolean;
}
export const Container = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Endpoint: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ARN: S.optional(S.String),
    Name: S.optional(S.String),
    Status: S.optional(ContainerStatus),
    AccessLoggingEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Container" }) as any as S.Schema<Container>;
export interface CreateContainerOutput {
  Container: Container;
}
export const CreateContainerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Container: Container }).pipe(ns),
).annotate({
  identifier: "CreateContainerOutput",
}) as any as S.Schema<CreateContainerOutput>;
export interface DeleteContainerInput {
  ContainerName: string;
}
export const DeleteContainerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContainerName: S.String }).pipe(
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
  identifier: "DeleteContainerInput",
}) as any as S.Schema<DeleteContainerInput>;
export interface DeleteContainerOutput {}
export const DeleteContainerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteContainerOutput",
}) as any as S.Schema<DeleteContainerOutput>;
export interface DeleteContainerPolicyInput {
  ContainerName: string;
}
export const DeleteContainerPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContainerName: S.String }).pipe(
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
  identifier: "DeleteContainerPolicyInput",
}) as any as S.Schema<DeleteContainerPolicyInput>;
export interface DeleteContainerPolicyOutput {}
export const DeleteContainerPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteContainerPolicyOutput",
}) as any as S.Schema<DeleteContainerPolicyOutput>;
export interface DeleteCorsPolicyInput {
  ContainerName: string;
}
export const DeleteCorsPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContainerName: S.String }).pipe(
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
  identifier: "DeleteCorsPolicyInput",
}) as any as S.Schema<DeleteCorsPolicyInput>;
export interface DeleteCorsPolicyOutput {}
export const DeleteCorsPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteCorsPolicyOutput",
}) as any as S.Schema<DeleteCorsPolicyOutput>;
export interface DeleteLifecyclePolicyInput {
  ContainerName: string;
}
export const DeleteLifecyclePolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContainerName: S.String }).pipe(
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
  identifier: "DeleteLifecyclePolicyInput",
}) as any as S.Schema<DeleteLifecyclePolicyInput>;
export interface DeleteLifecyclePolicyOutput {}
export const DeleteLifecyclePolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteLifecyclePolicyOutput",
}) as any as S.Schema<DeleteLifecyclePolicyOutput>;
export interface DeleteMetricPolicyInput {
  ContainerName: string;
}
export const DeleteMetricPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContainerName: S.String }).pipe(
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
  identifier: "DeleteMetricPolicyInput",
}) as any as S.Schema<DeleteMetricPolicyInput>;
export interface DeleteMetricPolicyOutput {}
export const DeleteMetricPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteMetricPolicyOutput",
}) as any as S.Schema<DeleteMetricPolicyOutput>;
export interface DescribeContainerInput {
  ContainerName?: string;
}
export const DescribeContainerInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContainerName: S.optional(S.String) }).pipe(
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
  identifier: "DescribeContainerInput",
}) as any as S.Schema<DescribeContainerInput>;
export interface DescribeContainerOutput {
  Container?: Container;
}
export const DescribeContainerOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Container: S.optional(Container) }).pipe(ns),
).annotate({
  identifier: "DescribeContainerOutput",
}) as any as S.Schema<DescribeContainerOutput>;
export interface GetContainerPolicyInput {
  ContainerName: string;
}
export const GetContainerPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContainerName: S.String }).pipe(
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
  identifier: "GetContainerPolicyInput",
}) as any as S.Schema<GetContainerPolicyInput>;
export type ContainerPolicy = string;
export interface GetContainerPolicyOutput {
  Policy: string;
}
export const GetContainerPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.String }).pipe(ns),
).annotate({
  identifier: "GetContainerPolicyOutput",
}) as any as S.Schema<GetContainerPolicyOutput>;
export interface GetCorsPolicyInput {
  ContainerName: string;
}
export const GetCorsPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContainerName: S.String }).pipe(
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
  identifier: "GetCorsPolicyInput",
}) as any as S.Schema<GetCorsPolicyInput>;
export type Origin = string;
export type AllowedOrigins = string[];
export const AllowedOrigins = /*@__PURE__*/ S.Array(S.String);
export type MethodName = "PUT" | "GET" | "DELETE" | "HEAD" | (string & {});
export const MethodName = /*@__PURE__*/ S.String;

export type AllowedMethods = MethodName[];
export const AllowedMethods = /*@__PURE__*/ S.Array(MethodName);
export type Header = string;
export type AllowedHeaders = string[];
export const AllowedHeaders = /*@__PURE__*/ S.Array(S.String);
export type MaxAgeSeconds = number;
export type ExposeHeaders = string[];
export const ExposeHeaders = /*@__PURE__*/ S.Array(S.String);
export interface CorsRule {
  AllowedOrigins: string[];
  AllowedMethods?: MethodName[];
  AllowedHeaders: string[];
  MaxAgeSeconds?: number;
  ExposeHeaders?: string[];
}
export const CorsRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AllowedOrigins: AllowedOrigins,
    AllowedMethods: S.optional(AllowedMethods),
    AllowedHeaders: AllowedHeaders,
    MaxAgeSeconds: S.optional(S.Number),
    ExposeHeaders: S.optional(ExposeHeaders),
  }),
).annotate({ identifier: "CorsRule" }) as any as S.Schema<CorsRule>;
export type CorsPolicy = CorsRule[];
export const CorsPolicy = /*@__PURE__*/ S.Array(CorsRule);
export interface GetCorsPolicyOutput {
  CorsPolicy: CorsRule[];
}
export const GetCorsPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CorsPolicy: CorsPolicy }).pipe(ns),
).annotate({
  identifier: "GetCorsPolicyOutput",
}) as any as S.Schema<GetCorsPolicyOutput>;
export interface GetLifecyclePolicyInput {
  ContainerName: string;
}
export const GetLifecyclePolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContainerName: S.String }).pipe(
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
  identifier: "GetLifecyclePolicyInput",
}) as any as S.Schema<GetLifecyclePolicyInput>;
export type LifecyclePolicy = string;
export interface GetLifecyclePolicyOutput {
  LifecyclePolicy: string;
}
export const GetLifecyclePolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LifecyclePolicy: S.String }).pipe(ns),
).annotate({
  identifier: "GetLifecyclePolicyOutput",
}) as any as S.Schema<GetLifecyclePolicyOutput>;
export interface GetMetricPolicyInput {
  ContainerName: string;
}
export const GetMetricPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContainerName: S.String }).pipe(
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
  identifier: "GetMetricPolicyInput",
}) as any as S.Schema<GetMetricPolicyInput>;
export type ContainerLevelMetrics = "ENABLED" | "DISABLED" | (string & {});
export const ContainerLevelMetrics = /*@__PURE__*/ S.String;

export type ObjectGroup = string;
export type ObjectGroupName = string;
export interface MetricPolicyRule {
  ObjectGroup: string;
  ObjectGroupName: string;
}
export const MetricPolicyRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ObjectGroup: S.String, ObjectGroupName: S.String }),
).annotate({
  identifier: "MetricPolicyRule",
}) as any as S.Schema<MetricPolicyRule>;
export type MetricPolicyRules = MetricPolicyRule[];
export const MetricPolicyRules = /*@__PURE__*/ S.Array(MetricPolicyRule);
export interface MetricPolicy {
  ContainerLevelMetrics: ContainerLevelMetrics;
  MetricPolicyRules?: MetricPolicyRule[];
}
export const MetricPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerLevelMetrics: ContainerLevelMetrics,
    MetricPolicyRules: S.optional(MetricPolicyRules),
  }),
).annotate({ identifier: "MetricPolicy" }) as any as S.Schema<MetricPolicy>;
export interface GetMetricPolicyOutput {
  MetricPolicy: MetricPolicy;
}
export const GetMetricPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MetricPolicy: MetricPolicy }).pipe(ns),
).annotate({
  identifier: "GetMetricPolicyOutput",
}) as any as S.Schema<GetMetricPolicyOutput>;
export type PaginationToken = string;
export type ContainerListLimit = number;
export interface ListContainersInput {
  NextToken?: string;
  MaxResults?: number;
}
export const ListContainersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
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
  identifier: "ListContainersInput",
}) as any as S.Schema<ListContainersInput>;
export type ContainerList = Container[];
export const ContainerList = /*@__PURE__*/ S.Array(Container);
export interface ListContainersOutput {
  Containers: Container[];
  NextToken?: string;
}
export const ListContainersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Containers: ContainerList, NextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ListContainersOutput",
}) as any as S.Schema<ListContainersOutput>;
export interface ListTagsForResourceInput {
  Resource: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Resource: S.String }).pipe(
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
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  Tags?: Tag[];
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface PutContainerPolicyInput {
  ContainerName: string;
  Policy: string;
}
export const PutContainerPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContainerName: S.String, Policy: S.String }).pipe(
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
  identifier: "PutContainerPolicyInput",
}) as any as S.Schema<PutContainerPolicyInput>;
export interface PutContainerPolicyOutput {}
export const PutContainerPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutContainerPolicyOutput",
}) as any as S.Schema<PutContainerPolicyOutput>;
export interface PutCorsPolicyInput {
  ContainerName: string;
  CorsPolicy: CorsRule[];
}
export const PutCorsPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContainerName: S.String, CorsPolicy: CorsPolicy }).pipe(
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
  identifier: "PutCorsPolicyInput",
}) as any as S.Schema<PutCorsPolicyInput>;
export interface PutCorsPolicyOutput {}
export const PutCorsPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutCorsPolicyOutput",
}) as any as S.Schema<PutCorsPolicyOutput>;
export interface PutLifecyclePolicyInput {
  ContainerName: string;
  LifecyclePolicy: string;
}
export const PutLifecyclePolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContainerName: S.String, LifecyclePolicy: S.String }).pipe(
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
  identifier: "PutLifecyclePolicyInput",
}) as any as S.Schema<PutLifecyclePolicyInput>;
export interface PutLifecyclePolicyOutput {}
export const PutLifecyclePolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutLifecyclePolicyOutput",
}) as any as S.Schema<PutLifecyclePolicyOutput>;
export interface PutMetricPolicyInput {
  ContainerName: string;
  MetricPolicy: MetricPolicy;
}
export const PutMetricPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContainerName: S.String, MetricPolicy: MetricPolicy }).pipe(
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
  identifier: "PutMetricPolicyInput",
}) as any as S.Schema<PutMetricPolicyInput>;
export interface PutMetricPolicyOutput {}
export const PutMetricPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutMetricPolicyOutput",
}) as any as S.Schema<PutMetricPolicyOutput>;
export interface StartAccessLoggingInput {
  ContainerName: string;
}
export const StartAccessLoggingInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContainerName: S.String }).pipe(
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
  identifier: "StartAccessLoggingInput",
}) as any as S.Schema<StartAccessLoggingInput>;
export interface StartAccessLoggingOutput {}
export const StartAccessLoggingOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "StartAccessLoggingOutput",
}) as any as S.Schema<StartAccessLoggingOutput>;
export interface StopAccessLoggingInput {
  ContainerName: string;
}
export const StopAccessLoggingInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContainerName: S.String }).pipe(
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
  identifier: "StopAccessLoggingInput",
}) as any as S.Schema<StopAccessLoggingInput>;
export interface StopAccessLoggingOutput {}
export const StopAccessLoggingOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "StopAccessLoggingOutput",
}) as any as S.Schema<StopAccessLoggingOutput>;
export interface TagResourceInput {
  Resource: string;
  Tags: Tag[];
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Resource: S.String, Tags: TagList }).pipe(
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
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {}
export const TagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  Resource: string;
  TagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Resource: S.String, TagKeys: TagKeyList }).pipe(
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
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export type ErrorMessage = string;
export type CreateContainerError =
  | ContainerInUseException
  | InternalServerError
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a storage container to hold objects. A container is similar to a bucket in
 * the Amazon S3 service.
 */
export const createContainer: API.OperationMethod<
  CreateContainerInput,
  CreateContainerOutput,
  CreateContainerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateContainerInput,
  output: CreateContainerOutput,
  errors: [
    ContainerInUseException,
    InternalServerError,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContainer",
}));

export type DeleteContainerError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Deletes the specified container. Before you make a `DeleteContainer`
 * request, delete any objects in the container or in any folders in the container. You can
 * delete only empty containers.
 */
export const deleteContainer: API.OperationMethod<
  DeleteContainerInput,
  DeleteContainerOutput,
  DeleteContainerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteContainerInput,
  output: DeleteContainerOutput,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContainer",
}));

export type DeleteContainerPolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | PolicyNotFoundException
  | CommonErrors;
/**
 * Deletes the access policy that is associated with the specified container.
 */
export const deleteContainerPolicy: API.OperationMethod<
  DeleteContainerPolicyInput,
  DeleteContainerPolicyOutput,
  DeleteContainerPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteContainerPolicyInput,
  output: DeleteContainerPolicyOutput,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
    PolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContainerPolicy",
}));

export type DeleteCorsPolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | CorsPolicyNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Deletes the cross-origin resource sharing (CORS) configuration information that is
 * set for the container.
 *
 * To use this operation, you must have permission to perform the
 * `MediaStore:DeleteCorsPolicy` action. The container owner has this permission
 * by default and can grant this permission to others.
 */
export const deleteCorsPolicy: API.OperationMethod<
  DeleteCorsPolicyInput,
  DeleteCorsPolicyOutput,
  DeleteCorsPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCorsPolicyInput,
  output: DeleteCorsPolicyOutput,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    CorsPolicyNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCorsPolicy",
}));

export type DeleteLifecyclePolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | PolicyNotFoundException
  | CommonErrors;
/**
 * Removes an object lifecycle policy from a container. It takes up to 20 minutes for the change to take effect.
 */
export const deleteLifecyclePolicy: API.OperationMethod<
  DeleteLifecyclePolicyInput,
  DeleteLifecyclePolicyOutput,
  DeleteLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLifecyclePolicyInput,
  output: DeleteLifecyclePolicyOutput,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
    PolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLifecyclePolicy",
}));

export type DeleteMetricPolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | PolicyNotFoundException
  | CommonErrors;
/**
 * Deletes the metric policy that is associated with the specified container. If there is no metric policy associated with the container, MediaStore doesn't send metrics to CloudWatch.
 */
export const deleteMetricPolicy: API.OperationMethod<
  DeleteMetricPolicyInput,
  DeleteMetricPolicyOutput,
  DeleteMetricPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMetricPolicyInput,
  output: DeleteMetricPolicyOutput,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
    PolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMetricPolicy",
}));

export type DescribeContainerError =
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves the properties of the requested container. This request is commonly used to
 * retrieve the endpoint of a container. An endpoint is a value assigned by the service when a
 * new container is created. A container's endpoint does not change after it has been
 * assigned. The `DescribeContainer` request returns a single
 * `Container` object based on `ContainerName`. To return all
 * `Container` objects that are associated with a specified AWS account, use
 * ListContainers.
 */
export const describeContainer: API.OperationMethod<
  DescribeContainerInput,
  DescribeContainerOutput,
  DescribeContainerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeContainerInput,
  output: DescribeContainerOutput,
  errors: [ContainerNotFoundException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContainer",
}));

export type GetContainerPolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | PolicyNotFoundException
  | CommonErrors;
/**
 * Retrieves the access policy for the specified container. For information about the
 * data that is included in an access policy, see the AWS Identity and Access Management User
 * Guide.
 */
export const getContainerPolicy: API.OperationMethod<
  GetContainerPolicyInput,
  GetContainerPolicyOutput,
  GetContainerPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetContainerPolicyInput,
  output: GetContainerPolicyOutput,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
    PolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContainerPolicy",
}));

export type GetCorsPolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | CorsPolicyNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Returns the cross-origin resource sharing (CORS) configuration information that is
 * set for the container.
 *
 * To use this operation, you must have permission to perform the
 * `MediaStore:GetCorsPolicy` action. By default, the container owner has this
 * permission and can grant it to others.
 */
export const getCorsPolicy: API.OperationMethod<
  GetCorsPolicyInput,
  GetCorsPolicyOutput,
  GetCorsPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCorsPolicyInput,
  output: GetCorsPolicyOutput,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    CorsPolicyNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCorsPolicy",
}));

export type GetLifecyclePolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | PolicyNotFoundException
  | CommonErrors;
/**
 * Retrieves the object lifecycle policy that is assigned to a container.
 */
export const getLifecyclePolicy: API.OperationMethod<
  GetLifecyclePolicyInput,
  GetLifecyclePolicyOutput,
  GetLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLifecyclePolicyInput,
  output: GetLifecyclePolicyOutput,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
    PolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLifecyclePolicy",
}));

export type GetMetricPolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | PolicyNotFoundException
  | CommonErrors;
/**
 * Returns the metric policy for the specified container.
 */
export const getMetricPolicy: API.OperationMethod<
  GetMetricPolicyInput,
  GetMetricPolicyOutput,
  GetMetricPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMetricPolicyInput,
  output: GetMetricPolicyOutput,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
    PolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetricPolicy",
}));

export type ListContainersError = InternalServerError | CommonErrors;
/**
 * Lists the properties of all containers in AWS Elemental MediaStore.
 *
 * You can query to receive all the containers in one response. Or you can include the
 * `MaxResults` parameter to receive a limited number of containers in each
 * response. In this case, the response includes a token. To get the next set of containers,
 * send the command again, this time with the `NextToken` parameter (with the
 * returned token as its value). The next set of responses appears, with a token if there are
 * still more containers to receive.
 *
 * See also DescribeContainer, which gets the properties of one
 * container.
 */
export const listContainers: API.PaginatedOperationMethod<
  ListContainersInput,
  ListContainersOutput,
  ListContainersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListContainersInput,
  output: ListContainersOutput,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContainers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Returns a list of the tags assigned to the specified container.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutContainerPolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Creates an access policy for the specified container to restrict the users and
 * clients that can access it. For information about the data that is included in an access
 * policy, see the AWS Identity and
 * Access Management User Guide.
 *
 * For this release of the REST API, you can create only one policy for a container. If
 * you enter `PutContainerPolicy` twice, the second command modifies the existing
 * policy.
 */
export const putContainerPolicy: API.OperationMethod<
  PutContainerPolicyInput,
  PutContainerPolicyOutput,
  PutContainerPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutContainerPolicyInput,
  output: PutContainerPolicyOutput,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutContainerPolicy",
}));

export type PutCorsPolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Sets the cross-origin resource sharing (CORS) configuration on a container so that
 * the container can service cross-origin requests. For example, you might want to enable a
 * request whose origin is http://www.example.com to access your AWS Elemental MediaStore
 * container at my.example.container.com by using the browser's XMLHttpRequest
 * capability.
 *
 * To enable CORS on a container, you attach a CORS policy to the container. In the CORS
 * policy, you configure rules that identify origins and the HTTP methods that can be executed
 * on your container. The policy can contain up to 398,000 characters. You can add up to 100
 * rules to a CORS policy. If more than one rule applies, the service uses the first
 * applicable rule listed.
 *
 * To learn more about CORS, see Cross-Origin Resource Sharing (CORS) in AWS Elemental MediaStore.
 */
export const putCorsPolicy: API.OperationMethod<
  PutCorsPolicyInput,
  PutCorsPolicyOutput,
  PutCorsPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutCorsPolicyInput,
  output: PutCorsPolicyOutput,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutCorsPolicy",
}));

export type PutLifecyclePolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Writes an object lifecycle policy to a container. If the container already has an object lifecycle policy, the service replaces the existing policy with the new policy. It takes up to 20 minutes for the change to take effect.
 *
 * For information about how to construct an object lifecycle policy, see Components of an Object Lifecycle Policy.
 */
export const putLifecyclePolicy: API.OperationMethod<
  PutLifecyclePolicyInput,
  PutLifecyclePolicyOutput,
  PutLifecyclePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutLifecyclePolicyInput,
  output: PutLifecyclePolicyOutput,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLifecyclePolicy",
}));

export type PutMetricPolicyError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * The metric policy that you want to add to the container. A metric policy allows AWS Elemental MediaStore to send metrics to Amazon CloudWatch. It takes up to 20 minutes for the new policy to take effect.
 */
export const putMetricPolicy: API.OperationMethod<
  PutMetricPolicyInput,
  PutMetricPolicyOutput,
  PutMetricPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutMetricPolicyInput,
  output: PutMetricPolicyOutput,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMetricPolicy",
}));

export type StartAccessLoggingError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Starts access logging on the specified container. When you enable access logging on a container, MediaStore delivers access logs for objects stored in that container to Amazon CloudWatch Logs.
 */
export const startAccessLogging: API.OperationMethod<
  StartAccessLoggingInput,
  StartAccessLoggingOutput,
  StartAccessLoggingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartAccessLoggingInput,
  output: StartAccessLoggingOutput,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAccessLogging",
}));

export type StopAccessLoggingError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Stops access logging on the specified container. When you stop access logging on a container, MediaStore stops sending access logs to Amazon CloudWatch Logs. These access logs are not saved and are not retrievable.
 */
export const stopAccessLogging: API.OperationMethod<
  StopAccessLoggingInput,
  StopAccessLoggingOutput,
  StopAccessLoggingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopAccessLoggingInput,
  output: StopAccessLoggingOutput,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopAccessLogging",
}));

export type TagResourceError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Adds tags to the specified AWS Elemental MediaStore container. Tags are key:value pairs that you can associate with AWS resources. For example, the
 * tag key might be "customer" and the tag value might be "companyA." You can specify one or more tags to add to each container. You can add up to 50
 * tags to each container. For more information about tagging, including naming and usage conventions, see Tagging Resources in MediaStore.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ContainerInUseException
  | ContainerNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Removes tags from the specified container. You can specify one or more tags to remove.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [
    ContainerInUseException,
    ContainerNotFoundException,
    InternalServerError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));
