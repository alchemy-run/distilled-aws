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
const ns = T.XmlNamespace("http://ecr-public.amazonaws.com/doc/2020-12-02/");
const svc = T.AwsApiService({
  sdkId: "ECR PUBLIC",
  serviceShapeName: "SpencerFrontendService",
});
const auth = T.AwsAuthSigv4({ name: "ecr-public" });
const ver = T.ServiceVersion("2020-10-30");
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
              `https://api.ecr-public-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://api.ecr-public-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            if ("aws" === _.getAttr(PartitionResult, "name")) {
              return e(`https://ecr-public.${Region}.api.aws`);
            }
            return e(
              `https://api.ecr-public.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://api.ecr-public.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class EmptyUploadException
  extends /*@__PURE__*/ S.TaggedError<EmptyUploadException>()(
    "EmptyUploadException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ImageAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ImageAlreadyExistsException>()(
    "ImageAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class ImageDigestDoesNotMatchException
  extends /*@__PURE__*/ S.TaggedError<ImageDigestDoesNotMatchException>()(
    "ImageDigestDoesNotMatchException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ImageNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ImageNotFoundException>()(
    "ImageNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ImageTagAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ImageTagAlreadyExistsException>()(
    "ImageTagAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class InvalidLayerException
  extends /*@__PURE__*/ S.TaggedError<InvalidLayerException>()(
    "InvalidLayerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidLayerPartException
  extends /*@__PURE__*/ S.TaggedError<InvalidLayerPartException>()(
    "InvalidLayerPartException",
    {
      registryId: S.optional(S.String),
      repositoryName: S.optional(S.String),
      uploadId: S.optional(S.String),
      lastValidByteReceived: S.optional(S.Number),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
  ) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidTagParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagParameterException>()(
    "InvalidTagParameterException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class LayerAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<LayerAlreadyExistsException>()(
    "LayerAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class LayerPartTooSmallException
  extends /*@__PURE__*/ S.TaggedError<LayerPartTooSmallException>()(
    "LayerPartTooSmallException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class LayersNotFoundException
  extends /*@__PURE__*/ S.TaggedError<LayersNotFoundException>()(
    "LayersNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ReferencedImagesNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ReferencedImagesNotFoundException>()(
    "ReferencedImagesNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RegistryNotFoundException
  extends /*@__PURE__*/ S.TaggedError<RegistryNotFoundException>()(
    "RegistryNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RepositoryAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<RepositoryAlreadyExistsException>()(
    "RepositoryAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class RepositoryCatalogDataNotFoundException
  extends /*@__PURE__*/ S.TaggedError<RepositoryCatalogDataNotFoundException>()(
    "RepositoryCatalogDataNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RepositoryNotEmptyException
  extends /*@__PURE__*/ S.TaggedError<RepositoryNotEmptyException>()(
    "RepositoryNotEmptyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RepositoryNotFoundException
  extends /*@__PURE__*/ S.TaggedError<RepositoryNotFoundException>()(
    "RepositoryNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RepositoryPolicyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<RepositoryPolicyNotFoundException>()(
    "RepositoryPolicyNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ServerException
  extends /*@__PURE__*/ S.TaggedError<ServerException>()("ServerException", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class UnsupportedCommandException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedCommandException>()(
    "UnsupportedCommandException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class UploadNotFoundException
  extends /*@__PURE__*/ S.TaggedError<UploadNotFoundException>()(
    "UploadNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type RegistryIdOrAlias = string;
export type RepositoryName = string;
export type BatchedOperationLayerDigest = string;
export type BatchedOperationLayerDigestList = string[];
export const BatchedOperationLayerDigestList = /*@__PURE__*/ S.Array(S.String);
export interface BatchCheckLayerAvailabilityRequest {
  registryId?: string;
  repositoryName: string;
  layerDigests: string[];
}
export const BatchCheckLayerAvailabilityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.optional(S.String),
    repositoryName: S.String,
    layerDigests: BatchedOperationLayerDigestList,
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
  identifier: "BatchCheckLayerAvailabilityRequest",
}) as any as S.Schema<BatchCheckLayerAvailabilityRequest>;
export type LayerDigest = string;
export type LayerAvailability = "AVAILABLE" | "UNAVAILABLE" | (string & {});
export const LayerAvailability = /*@__PURE__*/ S.String;

export type LayerSizeInBytes = number;
export type MediaType = string;
export interface Layer {
  layerDigest?: string;
  layerAvailability?: LayerAvailability;
  layerSize?: number;
  mediaType?: string;
}
export const Layer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    layerDigest: S.optional(S.String),
    layerAvailability: S.optional(LayerAvailability),
    layerSize: S.optional(S.Number),
    mediaType: S.optional(S.String),
  }),
).annotate({ identifier: "Layer" }) as any as S.Schema<Layer>;
export type LayerList = Layer[];
export const LayerList = /*@__PURE__*/ S.Array(Layer);
export type LayerFailureCode =
  | "InvalidLayerDigest"
  | "MissingLayerDigest"
  | (string & {});
export const LayerFailureCode = /*@__PURE__*/ S.String;

export type LayerFailureReason = string;
export interface LayerFailure {
  layerDigest?: string;
  failureCode?: LayerFailureCode;
  failureReason?: string;
}
export const LayerFailure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    layerDigest: S.optional(S.String),
    failureCode: S.optional(LayerFailureCode),
    failureReason: S.optional(S.String),
  }),
).annotate({ identifier: "LayerFailure" }) as any as S.Schema<LayerFailure>;
export type LayerFailureList = LayerFailure[];
export const LayerFailureList = /*@__PURE__*/ S.Array(LayerFailure);
export interface BatchCheckLayerAvailabilityResponse {
  layers?: Layer[];
  failures?: LayerFailure[];
}
export const BatchCheckLayerAvailabilityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    layers: S.optional(LayerList),
    failures: S.optional(LayerFailureList),
  }).pipe(ns),
).annotate({
  identifier: "BatchCheckLayerAvailabilityResponse",
}) as any as S.Schema<BatchCheckLayerAvailabilityResponse>;
export type ImageDigest = string;
export type ImageTag = string;
export interface ImageIdentifier {
  imageDigest?: string;
  imageTag?: string;
}
export const ImageIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageDigest: S.optional(S.String),
    imageTag: S.optional(S.String),
  }),
).annotate({
  identifier: "ImageIdentifier",
}) as any as S.Schema<ImageIdentifier>;
export type ImageIdentifierList = ImageIdentifier[];
export const ImageIdentifierList = /*@__PURE__*/ S.Array(ImageIdentifier);
export interface BatchDeleteImageRequest {
  registryId?: string;
  repositoryName: string;
  imageIds: ImageIdentifier[];
}
export const BatchDeleteImageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.optional(S.String),
    repositoryName: S.String,
    imageIds: ImageIdentifierList,
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
  identifier: "BatchDeleteImageRequest",
}) as any as S.Schema<BatchDeleteImageRequest>;
export type ImageFailureCode =
  | "InvalidImageDigest"
  | "InvalidImageTag"
  | "ImageTagDoesNotMatchDigest"
  | "ImageNotFound"
  | "MissingDigestAndTag"
  | "ImageReferencedByManifestList"
  | "KmsError"
  | (string & {});
export const ImageFailureCode = /*@__PURE__*/ S.String;

export type ImageFailureReason = string;
export interface ImageFailure {
  imageId?: ImageIdentifier;
  failureCode?: ImageFailureCode;
  failureReason?: string;
}
export const ImageFailure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageId: S.optional(ImageIdentifier),
    failureCode: S.optional(ImageFailureCode),
    failureReason: S.optional(S.String),
  }),
).annotate({ identifier: "ImageFailure" }) as any as S.Schema<ImageFailure>;
export type ImageFailureList = ImageFailure[];
export const ImageFailureList = /*@__PURE__*/ S.Array(ImageFailure);
export interface BatchDeleteImageResponse {
  imageIds?: ImageIdentifier[];
  failures?: ImageFailure[];
}
export const BatchDeleteImageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageIds: S.optional(ImageIdentifierList),
    failures: S.optional(ImageFailureList),
  }).pipe(ns),
).annotate({
  identifier: "BatchDeleteImageResponse",
}) as any as S.Schema<BatchDeleteImageResponse>;
export type UploadId = string;
export type LayerDigestList = string[];
export const LayerDigestList = /*@__PURE__*/ S.Array(S.String);
export interface CompleteLayerUploadRequest {
  registryId?: string;
  repositoryName: string;
  uploadId: string;
  layerDigests: string[];
}
export const CompleteLayerUploadRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.optional(S.String),
    repositoryName: S.String,
    uploadId: S.String,
    layerDigests: LayerDigestList,
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
  identifier: "CompleteLayerUploadRequest",
}) as any as S.Schema<CompleteLayerUploadRequest>;
export type RegistryId = string;
export interface CompleteLayerUploadResponse {
  registryId?: string;
  repositoryName?: string;
  uploadId?: string;
  layerDigest?: string;
}
export const CompleteLayerUploadResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.optional(S.String),
    repositoryName: S.optional(S.String),
    uploadId: S.optional(S.String),
    layerDigest: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CompleteLayerUploadResponse",
}) as any as S.Schema<CompleteLayerUploadResponse>;
export type RepositoryDescription = string;
export type Architecture = string;
export type ArchitectureList = string[];
export const ArchitectureList = /*@__PURE__*/ S.Array(S.String);
export type OperatingSystem = string;
export type OperatingSystemList = string[];
export const OperatingSystemList = /*@__PURE__*/ S.Array(S.String);
export type LogoImageBlob = Uint8Array;
export type AboutText = string;
export type UsageText = string;
export interface RepositoryCatalogDataInput {
  description?: string;
  architectures?: string[];
  operatingSystems?: string[];
  logoImageBlob?: Uint8Array;
  aboutText?: string;
  usageText?: string;
}
export const RepositoryCatalogDataInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    architectures: S.optional(ArchitectureList),
    operatingSystems: S.optional(OperatingSystemList),
    logoImageBlob: S.optional(T.Blob),
    aboutText: S.optional(S.String),
    usageText: S.optional(S.String),
  }),
).annotate({
  identifier: "RepositoryCatalogDataInput",
}) as any as S.Schema<RepositoryCatalogDataInput>;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface CreateRepositoryRequest {
  repositoryName: string;
  catalogData?: RepositoryCatalogDataInput;
  tags?: Tag[];
}
export const CreateRepositoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    catalogData: S.optional(RepositoryCatalogDataInput),
    tags: S.optional(TagList),
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
  identifier: "CreateRepositoryRequest",
}) as any as S.Schema<CreateRepositoryRequest>;
export type Arn = string;
export type Url = string;
export type CreationTimestamp = Date;
export interface Repository {
  repositoryArn?: string;
  registryId?: string;
  repositoryName?: string;
  repositoryUri?: string;
  createdAt?: Date;
}
export const Repository = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryArn: S.optional(S.String),
    registryId: S.optional(S.String),
    repositoryName: S.optional(S.String),
    repositoryUri: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Repository" }) as any as S.Schema<Repository>;
export type ResourceUrl = string;
export type MarketplaceCertified = boolean;
export interface RepositoryCatalogData {
  description?: string;
  architectures?: string[];
  operatingSystems?: string[];
  logoUrl?: string;
  aboutText?: string;
  usageText?: string;
  marketplaceCertified?: boolean;
}
export const RepositoryCatalogData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    architectures: S.optional(ArchitectureList),
    operatingSystems: S.optional(OperatingSystemList),
    logoUrl: S.optional(S.String),
    aboutText: S.optional(S.String),
    usageText: S.optional(S.String),
    marketplaceCertified: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "RepositoryCatalogData",
}) as any as S.Schema<RepositoryCatalogData>;
export interface CreateRepositoryResponse {
  repository?: Repository;
  catalogData?: RepositoryCatalogData;
}
export const CreateRepositoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repository: S.optional(Repository),
    catalogData: S.optional(RepositoryCatalogData),
  }).pipe(ns),
).annotate({
  identifier: "CreateRepositoryResponse",
}) as any as S.Schema<CreateRepositoryResponse>;
export type ForceFlag = boolean;
export interface DeleteRepositoryRequest {
  registryId?: string;
  repositoryName: string;
  force?: boolean;
}
export const DeleteRepositoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.optional(S.String),
    repositoryName: S.String,
    force: S.optional(S.Boolean),
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
  identifier: "DeleteRepositoryRequest",
}) as any as S.Schema<DeleteRepositoryRequest>;
export interface DeleteRepositoryResponse {
  repository?: Repository;
}
export const DeleteRepositoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repository: S.optional(Repository) }).pipe(ns),
).annotate({
  identifier: "DeleteRepositoryResponse",
}) as any as S.Schema<DeleteRepositoryResponse>;
export interface DeleteRepositoryPolicyRequest {
  registryId?: string;
  repositoryName: string;
}
export const DeleteRepositoryPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ registryId: S.optional(S.String), repositoryName: S.String }).pipe(
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
  identifier: "DeleteRepositoryPolicyRequest",
}) as any as S.Schema<DeleteRepositoryPolicyRequest>;
export type RepositoryPolicyText = string;
export interface DeleteRepositoryPolicyResponse {
  registryId?: string;
  repositoryName?: string;
  policyText?: string;
}
export const DeleteRepositoryPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.optional(S.String),
    repositoryName: S.optional(S.String),
    policyText: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DeleteRepositoryPolicyResponse",
}) as any as S.Schema<DeleteRepositoryPolicyResponse>;
export type NextToken = string;
export type MaxResults = number;
export interface DescribeImagesRequest {
  registryId?: string;
  repositoryName: string;
  imageIds?: ImageIdentifier[];
  nextToken?: string;
  maxResults?: number;
}
export const DescribeImagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.optional(S.String),
    repositoryName: S.String,
    imageIds: S.optional(ImageIdentifierList),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "DescribeImagesRequest",
}) as any as S.Schema<DescribeImagesRequest>;
export type ImageTagList = string[];
export const ImageTagList = /*@__PURE__*/ S.Array(S.String);
export type ImageSizeInBytes = number;
export type PushTimestamp = Date;
export interface ImageDetail {
  registryId?: string;
  repositoryName?: string;
  imageDigest?: string;
  imageTags?: string[];
  imageSizeInBytes?: number;
  imagePushedAt?: Date;
  imageManifestMediaType?: string;
  artifactMediaType?: string;
}
export const ImageDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.optional(S.String),
    repositoryName: S.optional(S.String),
    imageDigest: S.optional(S.String),
    imageTags: S.optional(ImageTagList),
    imageSizeInBytes: S.optional(S.Number),
    imagePushedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    imageManifestMediaType: S.optional(S.String),
    artifactMediaType: S.optional(S.String),
  }),
).annotate({ identifier: "ImageDetail" }) as any as S.Schema<ImageDetail>;
export type ImageDetailList = ImageDetail[];
export const ImageDetailList = /*@__PURE__*/ S.Array(ImageDetail);
export interface DescribeImagesResponse {
  imageDetails?: ImageDetail[];
  nextToken?: string;
}
export const DescribeImagesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageDetails: S.optional(ImageDetailList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeImagesResponse",
}) as any as S.Schema<DescribeImagesResponse>;
export interface DescribeImageTagsRequest {
  registryId?: string;
  repositoryName: string;
  nextToken?: string;
  maxResults?: number;
}
export const DescribeImageTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.optional(S.String),
    repositoryName: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "DescribeImageTagsRequest",
}) as any as S.Schema<DescribeImageTagsRequest>;
export interface ReferencedImageDetail {
  imageDigest?: string;
  imageSizeInBytes?: number;
  imagePushedAt?: Date;
  imageManifestMediaType?: string;
  artifactMediaType?: string;
}
export const ReferencedImageDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageDigest: S.optional(S.String),
    imageSizeInBytes: S.optional(S.Number),
    imagePushedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    imageManifestMediaType: S.optional(S.String),
    artifactMediaType: S.optional(S.String),
  }),
).annotate({
  identifier: "ReferencedImageDetail",
}) as any as S.Schema<ReferencedImageDetail>;
export interface ImageTagDetail {
  imageTag?: string;
  createdAt?: Date;
  imageDetail?: ReferencedImageDetail;
}
export const ImageTagDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageTag: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    imageDetail: S.optional(ReferencedImageDetail),
  }),
).annotate({ identifier: "ImageTagDetail" }) as any as S.Schema<ImageTagDetail>;
export type ImageTagDetailList = ImageTagDetail[];
export const ImageTagDetailList = /*@__PURE__*/ S.Array(ImageTagDetail);
export interface DescribeImageTagsResponse {
  imageTagDetails?: ImageTagDetail[];
  nextToken?: string;
}
export const DescribeImageTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    imageTagDetails: S.optional(ImageTagDetailList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeImageTagsResponse",
}) as any as S.Schema<DescribeImageTagsResponse>;
export interface DescribeRegistriesRequest {
  nextToken?: string;
  maxResults?: number;
}
export const DescribeRegistriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "DescribeRegistriesRequest",
}) as any as S.Schema<DescribeRegistriesRequest>;
export type RegistryVerified = boolean;
export type RegistryAliasName = string;
export type RegistryAliasStatus =
  | "ACTIVE"
  | "PENDING"
  | "REJECTED"
  | (string & {});
export const RegistryAliasStatus = /*@__PURE__*/ S.String;

export type PrimaryRegistryAliasFlag = boolean;
export type DefaultRegistryAliasFlag = boolean;
export interface RegistryAlias {
  name: string;
  status: RegistryAliasStatus;
  primaryRegistryAlias: boolean;
  defaultRegistryAlias: boolean;
}
export const RegistryAlias = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    status: RegistryAliasStatus,
    primaryRegistryAlias: S.Boolean,
    defaultRegistryAlias: S.Boolean,
  }),
).annotate({ identifier: "RegistryAlias" }) as any as S.Schema<RegistryAlias>;
export type RegistryAliasList = RegistryAlias[];
export const RegistryAliasList = /*@__PURE__*/ S.Array(RegistryAlias);
export interface Registry {
  registryId: string;
  registryArn: string;
  registryUri: string;
  verified: boolean;
  aliases: RegistryAlias[];
}
export const Registry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.String,
    registryArn: S.String,
    registryUri: S.String,
    verified: S.Boolean,
    aliases: RegistryAliasList,
  }),
).annotate({ identifier: "Registry" }) as any as S.Schema<Registry>;
export type RegistryList = Registry[];
export const RegistryList = /*@__PURE__*/ S.Array(Registry);
export interface DescribeRegistriesResponse {
  registries: Registry[];
  nextToken?: string;
}
export const DescribeRegistriesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ registries: RegistryList, nextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "DescribeRegistriesResponse",
}) as any as S.Schema<DescribeRegistriesResponse>;
export type RepositoryNameList = string[];
export const RepositoryNameList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeRepositoriesRequest {
  registryId?: string;
  repositoryNames?: string[];
  nextToken?: string;
  maxResults?: number;
}
export const DescribeRepositoriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.optional(S.String),
    repositoryNames: S.optional(RepositoryNameList),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "DescribeRepositoriesRequest",
}) as any as S.Schema<DescribeRepositoriesRequest>;
export type RepositoryList = Repository[];
export const RepositoryList = /*@__PURE__*/ S.Array(Repository);
export interface DescribeRepositoriesResponse {
  repositories?: Repository[];
  nextToken?: string;
}
export const DescribeRepositoriesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositories: S.optional(RepositoryList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeRepositoriesResponse",
}) as any as S.Schema<DescribeRepositoriesResponse>;
export interface GetAuthorizationTokenRequest {}
export const GetAuthorizationTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
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
  identifier: "GetAuthorizationTokenRequest",
}) as any as S.Schema<GetAuthorizationTokenRequest>;
export type Base64 = string;
export type ExpirationTimestamp = Date;
export interface AuthorizationData {
  authorizationToken?: string | redacted.Redacted<string>;
  expiresAt?: Date;
}
export const AuthorizationData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authorizationToken: S.optional(SensitiveString),
    expiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "AuthorizationData",
}) as any as S.Schema<AuthorizationData>;
export interface GetAuthorizationTokenResponse {
  authorizationData?: AuthorizationData;
}
export const GetAuthorizationTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ authorizationData: S.optional(AuthorizationData) }).pipe(ns),
).annotate({
  identifier: "GetAuthorizationTokenResponse",
}) as any as S.Schema<GetAuthorizationTokenResponse>;
export interface GetRegistryCatalogDataRequest {}
export const GetRegistryCatalogDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
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
  identifier: "GetRegistryCatalogDataRequest",
}) as any as S.Schema<GetRegistryCatalogDataRequest>;
export type RegistryDisplayName = string;
export interface RegistryCatalogData {
  displayName?: string;
}
export const RegistryCatalogData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ displayName: S.optional(S.String) }),
).annotate({
  identifier: "RegistryCatalogData",
}) as any as S.Schema<RegistryCatalogData>;
export interface GetRegistryCatalogDataResponse {
  registryCatalogData: RegistryCatalogData;
}
export const GetRegistryCatalogDataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ registryCatalogData: RegistryCatalogData }).pipe(ns),
).annotate({
  identifier: "GetRegistryCatalogDataResponse",
}) as any as S.Schema<GetRegistryCatalogDataResponse>;
export interface GetRepositoryCatalogDataRequest {
  registryId?: string;
  repositoryName: string;
}
export const GetRepositoryCatalogDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ registryId: S.optional(S.String), repositoryName: S.String }).pipe(
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
  identifier: "GetRepositoryCatalogDataRequest",
}) as any as S.Schema<GetRepositoryCatalogDataRequest>;
export interface GetRepositoryCatalogDataResponse {
  catalogData?: RepositoryCatalogData;
}
export const GetRepositoryCatalogDataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ catalogData: S.optional(RepositoryCatalogData) }).pipe(ns),
).annotate({
  identifier: "GetRepositoryCatalogDataResponse",
}) as any as S.Schema<GetRepositoryCatalogDataResponse>;
export interface GetRepositoryPolicyRequest {
  registryId?: string;
  repositoryName: string;
}
export const GetRepositoryPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ registryId: S.optional(S.String), repositoryName: S.String }).pipe(
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
  identifier: "GetRepositoryPolicyRequest",
}) as any as S.Schema<GetRepositoryPolicyRequest>;
export interface GetRepositoryPolicyResponse {
  registryId?: string;
  repositoryName?: string;
  policyText?: string;
}
export const GetRepositoryPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.optional(S.String),
    repositoryName: S.optional(S.String),
    policyText: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetRepositoryPolicyResponse",
}) as any as S.Schema<GetRepositoryPolicyResponse>;
export interface InitiateLayerUploadRequest {
  registryId?: string;
  repositoryName: string;
}
export const InitiateLayerUploadRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ registryId: S.optional(S.String), repositoryName: S.String }).pipe(
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
  identifier: "InitiateLayerUploadRequest",
}) as any as S.Schema<InitiateLayerUploadRequest>;
export type PartSize = number;
export interface InitiateLayerUploadResponse {
  uploadId?: string;
  partSize?: number;
}
export const InitiateLayerUploadResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    uploadId: S.optional(S.String),
    partSize: S.optional(S.Number),
  }).pipe(ns),
).annotate({
  identifier: "InitiateLayerUploadResponse",
}) as any as S.Schema<InitiateLayerUploadResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String }).pipe(
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
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type ImageManifest = string;
export interface PutImageRequest {
  registryId?: string;
  repositoryName: string;
  imageManifest: string;
  imageManifestMediaType?: string;
  imageTag?: string;
  imageDigest?: string;
}
export const PutImageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.optional(S.String),
    repositoryName: S.String,
    imageManifest: S.String,
    imageManifestMediaType: S.optional(S.String),
    imageTag: S.optional(S.String),
    imageDigest: S.optional(S.String),
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
  identifier: "PutImageRequest",
}) as any as S.Schema<PutImageRequest>;
export interface Image {
  registryId?: string;
  repositoryName?: string;
  imageId?: ImageIdentifier;
  imageManifest?: string;
  imageManifestMediaType?: string;
}
export const Image = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.optional(S.String),
    repositoryName: S.optional(S.String),
    imageId: S.optional(ImageIdentifier),
    imageManifest: S.optional(S.String),
    imageManifestMediaType: S.optional(S.String),
  }),
).annotate({ identifier: "Image" }) as any as S.Schema<Image>;
export interface PutImageResponse {
  image?: Image;
}
export const PutImageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ image: S.optional(Image) }).pipe(ns),
).annotate({
  identifier: "PutImageResponse",
}) as any as S.Schema<PutImageResponse>;
export interface PutRegistryCatalogDataRequest {
  displayName?: string;
}
export const PutRegistryCatalogDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ displayName: S.optional(S.String) }).pipe(
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
  identifier: "PutRegistryCatalogDataRequest",
}) as any as S.Schema<PutRegistryCatalogDataRequest>;
export interface PutRegistryCatalogDataResponse {
  registryCatalogData: RegistryCatalogData;
}
export const PutRegistryCatalogDataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ registryCatalogData: RegistryCatalogData }).pipe(ns),
).annotate({
  identifier: "PutRegistryCatalogDataResponse",
}) as any as S.Schema<PutRegistryCatalogDataResponse>;
export interface PutRepositoryCatalogDataRequest {
  registryId?: string;
  repositoryName: string;
  catalogData: RepositoryCatalogDataInput;
}
export const PutRepositoryCatalogDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.optional(S.String),
    repositoryName: S.String,
    catalogData: RepositoryCatalogDataInput,
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
  identifier: "PutRepositoryCatalogDataRequest",
}) as any as S.Schema<PutRepositoryCatalogDataRequest>;
export interface PutRepositoryCatalogDataResponse {
  catalogData?: RepositoryCatalogData;
}
export const PutRepositoryCatalogDataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ catalogData: S.optional(RepositoryCatalogData) }).pipe(ns),
).annotate({
  identifier: "PutRepositoryCatalogDataResponse",
}) as any as S.Schema<PutRepositoryCatalogDataResponse>;
export interface SetRepositoryPolicyRequest {
  registryId?: string;
  repositoryName: string;
  policyText: string;
  force?: boolean;
}
export const SetRepositoryPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.optional(S.String),
    repositoryName: S.String,
    policyText: S.String,
    force: S.optional(S.Boolean),
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
  identifier: "SetRepositoryPolicyRequest",
}) as any as S.Schema<SetRepositoryPolicyRequest>;
export interface SetRepositoryPolicyResponse {
  registryId?: string;
  repositoryName?: string;
  policyText?: string;
}
export const SetRepositoryPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.optional(S.String),
    repositoryName: S.optional(S.String),
    policyText: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "SetRepositoryPolicyResponse",
}) as any as S.Schema<SetRepositoryPolicyResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: TagList }).pipe(
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
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tagKeys: TagKeyList }).pipe(
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
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export type LayerPartBlob = Uint8Array;
export interface UploadLayerPartRequest {
  registryId?: string;
  repositoryName: string;
  uploadId: string;
  partFirstByte: number;
  partLastByte: number;
  layerPartBlob: Uint8Array;
}
export const UploadLayerPartRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.optional(S.String),
    repositoryName: S.String,
    uploadId: S.String,
    partFirstByte: S.Number,
    partLastByte: S.Number,
    layerPartBlob: T.Blob,
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
  identifier: "UploadLayerPartRequest",
}) as any as S.Schema<UploadLayerPartRequest>;
export interface UploadLayerPartResponse {
  registryId?: string;
  repositoryName?: string;
  uploadId?: string;
  lastByteReceived?: number;
}
export const UploadLayerPartResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registryId: S.optional(S.String),
    repositoryName: S.optional(S.String),
    uploadId: S.optional(S.String),
    lastByteReceived: S.optional(S.Number),
  }).pipe(ns),
).annotate({
  identifier: "UploadLayerPartResponse",
}) as any as S.Schema<UploadLayerPartResponse>;
export type ExceptionMessage = string;
export type BatchCheckLayerAvailabilityError =
  | InvalidParameterException
  | RegistryNotFoundException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Checks the availability of one or more image layers that are within a repository in a
 * public registry. When an image is pushed to a repository, each image layer is checked to
 * verify if it has been uploaded before. If it has been uploaded, then the image layer is
 * skipped.
 *
 * This operation is used by the Amazon ECR proxy and is not generally used by customers for pulling and pushing images. In most cases, you should use the `docker` CLI to pull, tag, and push images.
 */
export const batchCheckLayerAvailability: API.OperationMethod<
  BatchCheckLayerAvailabilityRequest,
  BatchCheckLayerAvailabilityResponse,
  BatchCheckLayerAvailabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchCheckLayerAvailabilityRequest,
  output: BatchCheckLayerAvailabilityResponse,
  errors: [
    InvalidParameterException,
    RegistryNotFoundException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCheckLayerAvailability",
}));

export type BatchDeleteImageError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Deletes a list of specified images that are within a repository in a public registry.
 * Images are specified with either an `imageTag` or
 * `imageDigest`.
 *
 * You can remove a tag from an image by specifying the image's tag in your request. When
 * you remove the last tag from an image, the image is deleted from your repository.
 *
 * You can completely delete an image (and all of its tags) by specifying the digest of the
 * image in your request.
 */
export const batchDeleteImage: API.OperationMethod<
  BatchDeleteImageRequest,
  BatchDeleteImageResponse,
  BatchDeleteImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteImageRequest,
  output: BatchDeleteImageResponse,
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteImage",
}));

export type CompleteLayerUploadError =
  | EmptyUploadException
  | InvalidLayerException
  | InvalidParameterException
  | LayerAlreadyExistsException
  | LayerPartTooSmallException
  | RegistryNotFoundException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | UploadNotFoundException
  | CommonErrors;
/**
 * Informs Amazon ECR that the image layer upload is complete for a specified public registry,
 * repository name, and upload ID. You can optionally provide a `sha256` digest of
 * the image layer for data validation purposes.
 *
 * When an image is pushed, the CompleteLayerUpload API is called once for each new image
 * layer to verify that the upload is complete.
 *
 * This operation is used by the Amazon ECR proxy and is not generally used by customers for pulling and pushing images. In most cases, you should use the `docker` CLI to pull, tag, and push images.
 */
export const completeLayerUpload: API.OperationMethod<
  CompleteLayerUploadRequest,
  CompleteLayerUploadResponse,
  CompleteLayerUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CompleteLayerUploadRequest,
  output: CompleteLayerUploadResponse,
  errors: [
    EmptyUploadException,
    InvalidLayerException,
    InvalidParameterException,
    LayerAlreadyExistsException,
    LayerPartTooSmallException,
    RegistryNotFoundException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
    UploadNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteLayerUpload",
}));

export type CreateRepositoryError =
  | InvalidParameterException
  | InvalidTagParameterException
  | LimitExceededException
  | RepositoryAlreadyExistsException
  | ServerException
  | TooManyTagsException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Creates a repository in a public registry. For more information, see Amazon ECR
 * repositories in the *Amazon Elastic Container Registry User Guide*.
 */
export const createRepository: API.OperationMethod<
  CreateRepositoryRequest,
  CreateRepositoryResponse,
  CreateRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRepositoryRequest,
  output: CreateRepositoryResponse,
  errors: [
    InvalidParameterException,
    InvalidTagParameterException,
    LimitExceededException,
    RepositoryAlreadyExistsException,
    ServerException,
    TooManyTagsException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRepository",
}));

export type DeleteRepositoryError =
  | InvalidParameterException
  | RepositoryNotEmptyException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Deletes a repository in a public registry. If the repository contains images, you must
 * either manually delete all images in the repository or use the `force` option.
 * This option deletes all images on your behalf before deleting the repository.
 */
export const deleteRepository: API.OperationMethod<
  DeleteRepositoryRequest,
  DeleteRepositoryResponse,
  DeleteRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRepositoryRequest,
  output: DeleteRepositoryResponse,
  errors: [
    InvalidParameterException,
    RepositoryNotEmptyException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRepository",
}));

export type DeleteRepositoryPolicyError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | RepositoryPolicyNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Deletes the repository policy that's associated with the specified repository.
 */
export const deleteRepositoryPolicy: API.OperationMethod<
  DeleteRepositoryPolicyRequest,
  DeleteRepositoryPolicyResponse,
  DeleteRepositoryPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRepositoryPolicyRequest,
  output: DeleteRepositoryPolicyResponse,
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    RepositoryPolicyNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRepositoryPolicy",
}));

export type DescribeImagesError =
  | ImageNotFoundException
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Returns metadata that's related to the images in a repository in a public
 * registry.
 *
 * Beginning with Docker version 1.9, the Docker client compresses image layers before
 * pushing them to a V2 Docker registry. The output of the `docker images`
 * command shows the uncompressed image size. Therefore, it might return a larger image
 * size than the image sizes that are returned by DescribeImages.
 */
export const describeImages: API.PaginatedOperationMethod<
  DescribeImagesRequest,
  DescribeImagesResponse,
  DescribeImagesError,
  Credentials | HttpClient.HttpClient,
  ImageDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeImagesRequest,
  output: DescribeImagesResponse,
  errors: [
    ImageNotFoundException,
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "imageDetails",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeImageTagsError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Returns the image tag details for a repository in a public registry.
 */
export const describeImageTags: API.PaginatedOperationMethod<
  DescribeImageTagsRequest,
  DescribeImageTagsResponse,
  DescribeImageTagsError,
  Credentials | HttpClient.HttpClient,
  ImageTagDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeImageTagsRequest,
  output: DescribeImageTagsResponse,
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImageTags",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "imageTagDetails",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeRegistriesError =
  | InvalidParameterException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Returns details for a public registry.
 */
export const describeRegistries: API.PaginatedOperationMethod<
  DescribeRegistriesRequest,
  DescribeRegistriesResponse,
  DescribeRegistriesError,
  Credentials | HttpClient.HttpClient,
  Registry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeRegistriesRequest,
  output: DescribeRegistriesResponse,
  errors: [
    InvalidParameterException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRegistries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "registries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeRepositoriesError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Describes repositories that are in a public registry.
 */
export const describeRepositories: API.PaginatedOperationMethod<
  DescribeRepositoriesRequest,
  DescribeRepositoriesResponse,
  DescribeRepositoriesError,
  Credentials | HttpClient.HttpClient,
  Repository
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeRepositoriesRequest,
  output: DescribeRepositoriesResponse,
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRepositories",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "repositories",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetAuthorizationTokenError =
  | InvalidParameterException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Retrieves an authorization token. An authorization token represents your IAM
 * authentication credentials. You can use it to access any Amazon ECR registry that your IAM
 * principal has access to. The authorization token is valid for 12 hours. This API requires
 * the `ecr-public:GetAuthorizationToken` and
 * `sts:GetServiceBearerToken` permissions.
 */
export const getAuthorizationToken: API.OperationMethod<
  GetAuthorizationTokenRequest,
  GetAuthorizationTokenResponse,
  GetAuthorizationTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAuthorizationTokenRequest,
  output: GetAuthorizationTokenResponse,
  errors: [
    InvalidParameterException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAuthorizationToken",
}));

export type GetRegistryCatalogDataError =
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Retrieves catalog metadata for a public registry.
 */
export const getRegistryCatalogData: API.OperationMethod<
  GetRegistryCatalogDataRequest,
  GetRegistryCatalogDataResponse,
  GetRegistryCatalogDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRegistryCatalogDataRequest,
  output: GetRegistryCatalogDataResponse,
  errors: [ServerException, UnsupportedCommandException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegistryCatalogData",
}));

export type GetRepositoryCatalogDataError =
  | InvalidParameterException
  | RepositoryCatalogDataNotFoundException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Retrieve catalog metadata for a repository in a public registry. This metadata is
 * displayed publicly in the Amazon ECR Public Gallery.
 */
export const getRepositoryCatalogData: API.OperationMethod<
  GetRepositoryCatalogDataRequest,
  GetRepositoryCatalogDataResponse,
  GetRepositoryCatalogDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRepositoryCatalogDataRequest,
  output: GetRepositoryCatalogDataResponse,
  errors: [
    InvalidParameterException,
    RepositoryCatalogDataNotFoundException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRepositoryCatalogData",
}));

export type GetRepositoryPolicyError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | RepositoryPolicyNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Retrieves the repository policy for the specified repository.
 */
export const getRepositoryPolicy: API.OperationMethod<
  GetRepositoryPolicyRequest,
  GetRepositoryPolicyResponse,
  GetRepositoryPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRepositoryPolicyRequest,
  output: GetRepositoryPolicyResponse,
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    RepositoryPolicyNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRepositoryPolicy",
}));

export type InitiateLayerUploadError =
  | InvalidParameterException
  | RegistryNotFoundException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Notifies Amazon ECR that you intend to upload an image layer.
 *
 * When an image is pushed, the InitiateLayerUpload API is called once for each image layer
 * that hasn't already been uploaded. Whether an image layer uploads is determined by the
 * BatchCheckLayerAvailability API action.
 *
 * This operation is used by the Amazon ECR proxy and is not generally used by customers for pulling and pushing images. In most cases, you should use the `docker` CLI to pull, tag, and push images.
 */
export const initiateLayerUpload: API.OperationMethod<
  InitiateLayerUploadRequest,
  InitiateLayerUploadResponse,
  InitiateLayerUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InitiateLayerUploadRequest,
  output: InitiateLayerUploadResponse,
  errors: [
    InvalidParameterException,
    RegistryNotFoundException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InitiateLayerUpload",
}));

export type ListTagsForResourceError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * List the tags for an Amazon ECR Public resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutImageError =
  | ImageAlreadyExistsException
  | ImageDigestDoesNotMatchException
  | ImageTagAlreadyExistsException
  | InvalidParameterException
  | LayersNotFoundException
  | LimitExceededException
  | ReferencedImagesNotFoundException
  | RegistryNotFoundException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Creates or updates the image manifest and tags that are associated with an image.
 *
 * When an image is pushed and all new image layers have been uploaded, the PutImage API is
 * called once to create or update the image manifest and the tags that are associated with
 * the image.
 *
 * This operation is used by the Amazon ECR proxy and is not generally used by customers for pulling and pushing images. In most cases, you should use the `docker` CLI to pull, tag, and push images.
 */
export const putImage: API.OperationMethod<
  PutImageRequest,
  PutImageResponse,
  PutImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutImageRequest,
  output: PutImageResponse,
  errors: [
    ImageAlreadyExistsException,
    ImageDigestDoesNotMatchException,
    ImageTagAlreadyExistsException,
    InvalidParameterException,
    LayersNotFoundException,
    LimitExceededException,
    ReferencedImagesNotFoundException,
    RegistryNotFoundException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutImage",
}));

export type PutRegistryCatalogDataError =
  | InvalidParameterException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Create or update the catalog data for a public registry.
 */
export const putRegistryCatalogData: API.OperationMethod<
  PutRegistryCatalogDataRequest,
  PutRegistryCatalogDataResponse,
  PutRegistryCatalogDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutRegistryCatalogDataRequest,
  output: PutRegistryCatalogDataResponse,
  errors: [
    InvalidParameterException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRegistryCatalogData",
}));

export type PutRepositoryCatalogDataError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Creates or updates the catalog data for a repository in a public registry.
 */
export const putRepositoryCatalogData: API.OperationMethod<
  PutRepositoryCatalogDataRequest,
  PutRepositoryCatalogDataResponse,
  PutRepositoryCatalogDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutRepositoryCatalogDataRequest,
  output: PutRepositoryCatalogDataResponse,
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRepositoryCatalogData",
}));

export type SetRepositoryPolicyError =
  | InvalidParameterException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Applies a repository policy to the specified public repository to control access
 * permissions. For more information, see Amazon ECR Repository
 * Policies in the *Amazon Elastic Container Registry User Guide*.
 */
export const setRepositoryPolicy: API.OperationMethod<
  SetRepositoryPolicyRequest,
  SetRepositoryPolicyResponse,
  SetRepositoryPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetRepositoryPolicyRequest,
  output: SetRepositoryPolicyResponse,
  errors: [
    InvalidParameterException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetRepositoryPolicy",
}));

export type TagResourceError =
  | InvalidParameterException
  | InvalidTagParameterException
  | RepositoryNotFoundException
  | ServerException
  | TooManyTagsException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Associates the specified tags to a resource with the specified `resourceArn`.
 * If existing tags on a resource aren't specified in the request parameters, they aren't
 * changed. When a resource is deleted, the tags associated with that resource are also
 * deleted.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    InvalidParameterException,
    InvalidTagParameterException,
    RepositoryNotFoundException,
    ServerException,
    TooManyTagsException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InvalidParameterException
  | InvalidTagParameterException
  | RepositoryNotFoundException
  | ServerException
  | TooManyTagsException
  | UnsupportedCommandException
  | CommonErrors;
/**
 * Deletes specified tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    InvalidParameterException,
    InvalidTagParameterException,
    RepositoryNotFoundException,
    ServerException,
    TooManyTagsException,
    UnsupportedCommandException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UploadLayerPartError =
  | InvalidLayerPartException
  | InvalidParameterException
  | LimitExceededException
  | RegistryNotFoundException
  | RepositoryNotFoundException
  | ServerException
  | UnsupportedCommandException
  | UploadNotFoundException
  | CommonErrors;
/**
 * Uploads an image layer part to Amazon ECR.
 *
 * When an image is pushed, each new image layer is uploaded in parts. The maximum size of
 * each image layer part can be 20971520 bytes (about 20MB). The UploadLayerPart API is called
 * once for each new image layer part.
 *
 * This operation is used by the Amazon ECR proxy and is not generally used by customers for pulling and pushing images. In most cases, you should use the `docker` CLI to pull, tag, and push images.
 */
export const uploadLayerPart: API.OperationMethod<
  UploadLayerPartRequest,
  UploadLayerPartResponse,
  UploadLayerPartError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UploadLayerPartRequest,
  output: UploadLayerPartResponse,
  errors: [
    InvalidLayerPartException,
    InvalidParameterException,
    LimitExceededException,
    RegistryNotFoundException,
    RepositoryNotFoundException,
    ServerException,
    UnsupportedCommandException,
    UploadNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UploadLayerPart",
}));
