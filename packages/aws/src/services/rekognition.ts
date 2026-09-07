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
import { SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "Rekognition",
  serviceShapeName: "RekognitionService",
});
const auth = T.AwsAuthSigv4({ name: "rekognition" });
const ver = T.ServiceVersion("2016-06-27");
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
              `https://rekognition-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://rekognition-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://rekognition.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://rekognition.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
  ) {}
export class HumanLoopQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<HumanLoopQuotaExceededException>()(
    "HumanLoopQuotaExceededException",
    {
      ResourceType: S.optional(S.String),
      QuotaCode: S.optional(S.String),
      ServiceCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ S.TaggedError<IdempotentParameterMismatchException>()(
    "IdempotentParameterMismatchException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
  ) {}
export class ImageTooLargeException
  extends /*@__PURE__*/ S.TaggedError<ImageTooLargeException>()(
    "ImageTooLargeException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
  ) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()(
    "InternalServerError",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
  ) {}
export class InvalidImageFormatException
  extends /*@__PURE__*/ S.TaggedError<InvalidImageFormatException>()(
    "InvalidImageFormatException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
  ) {}
export class InvalidManifestException
  extends /*@__PURE__*/ S.TaggedError<InvalidManifestException>()(
    "InvalidManifestException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
  ) {}
export class InvalidPaginationTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidPaginationTokenException>()(
    "InvalidPaginationTokenException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
  ) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
  ) {}
export class InvalidPolicyRevisionIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidPolicyRevisionIdException>()(
    "InvalidPolicyRevisionIdException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
  ) {}
export class InvalidS3ObjectException
  extends /*@__PURE__*/ S.TaggedError<InvalidS3ObjectException>()(
    "InvalidS3ObjectException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
  ) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
  ) {}
export class MalformedPolicyDocumentException
  extends /*@__PURE__*/ S.TaggedError<MalformedPolicyDocumentException>()(
    "MalformedPolicyDocumentException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
  ) {}
export class ProvisionedThroughputExceededException
  extends /*@__PURE__*/ S.TaggedError<ProvisionedThroughputExceededException>()(
    "ProvisionedThroughputExceededException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
  ) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
  ).pipe(C.withAlreadyExistsError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
  ) {}
export class ResourceNotReadyException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotReadyException>()(
    "ResourceNotReadyException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
  ) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
  ) {}
export class SessionNotFoundException
  extends /*@__PURE__*/ S.TaggedError<SessionNotFoundException>()(
    "SessionNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
  ) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
  ) {}
export class VideoTooLargeException
  extends /*@__PURE__*/ S.TaggedError<VideoTooLargeException>()(
    "VideoTooLargeException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Code: S.optional(S.String),
      Logref: S.optional(S.String),
    },
  ) {}
export type CollectionId = string;
export type UserId = string;
export type FaceId = string;
export type UserFaceIdList = string[];
export const UserFaceIdList = /*@__PURE__*/ S.Array(S.String);
export type Percent = number;
export type ClientRequestToken = string;
export interface AssociateFacesRequest {
  CollectionId: string;
  UserId: string;
  FaceIds: string[];
  UserMatchThreshold?: number;
  ClientRequestToken?: string;
}
export const AssociateFacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionId: S.String,
    UserId: S.String,
    FaceIds: UserFaceIdList,
    UserMatchThreshold: S.optional(S.Number),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateFacesRequest",
}) as any as S.Schema<AssociateFacesRequest>;
export interface AssociatedFace {
  FaceId?: string;
}
export const AssociatedFace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FaceId: S.optional(S.String) }),
).annotate({ identifier: "AssociatedFace" }) as any as S.Schema<AssociatedFace>;
export type AssociatedFacesList = AssociatedFace[];
export const AssociatedFacesList = /*@__PURE__*/ S.Array(AssociatedFace);
export type UnsuccessfulFaceAssociationReason =
  | "FACE_NOT_FOUND"
  | "ASSOCIATED_TO_A_DIFFERENT_USER"
  | "LOW_MATCH_CONFIDENCE"
  | (string & {});
export const UnsuccessfulFaceAssociationReason = /*@__PURE__*/ S.String;

export type UnsuccessfulFaceAssociationReasons =
  UnsuccessfulFaceAssociationReason[];
export const UnsuccessfulFaceAssociationReasons = /*@__PURE__*/ S.Array(
  UnsuccessfulFaceAssociationReason,
);
export interface UnsuccessfulFaceAssociation {
  FaceId?: string;
  UserId?: string;
  Confidence?: number;
  Reasons?: UnsuccessfulFaceAssociationReason[];
}
export const UnsuccessfulFaceAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FaceId: S.optional(S.String),
    UserId: S.optional(S.String),
    Confidence: S.optional(S.Number),
    Reasons: S.optional(UnsuccessfulFaceAssociationReasons),
  }),
).annotate({
  identifier: "UnsuccessfulFaceAssociation",
}) as any as S.Schema<UnsuccessfulFaceAssociation>;
export type UnsuccessfulFaceAssociationList = UnsuccessfulFaceAssociation[];
export const UnsuccessfulFaceAssociationList = /*@__PURE__*/ S.Array(
  UnsuccessfulFaceAssociation,
);
export type UserStatus =
  | "ACTIVE"
  | "UPDATING"
  | "CREATING"
  | "CREATED"
  | (string & {});
export const UserStatus = /*@__PURE__*/ S.String;

export interface AssociateFacesResponse {
  AssociatedFaces?: AssociatedFace[];
  UnsuccessfulFaceAssociations?: UnsuccessfulFaceAssociation[];
  UserStatus?: UserStatus;
}
export const AssociateFacesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociatedFaces: S.optional(AssociatedFacesList),
    UnsuccessfulFaceAssociations: S.optional(UnsuccessfulFaceAssociationList),
    UserStatus: S.optional(UserStatus),
  }),
).annotate({
  identifier: "AssociateFacesResponse",
}) as any as S.Schema<AssociateFacesResponse>;
export type ImageBlob = Uint8Array;
export type S3Bucket = string;
export type S3ObjectName = string;
export type S3ObjectVersion = string;
export interface S3Object {
  Bucket?: string;
  Name?: string;
  Version?: string;
}
export const S3Object = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bucket: S.optional(S.String),
    Name: S.optional(S.String),
    Version: S.optional(S.String),
  }),
).annotate({ identifier: "S3Object" }) as any as S.Schema<S3Object>;
export interface Image {
  Bytes?: Uint8Array;
  S3Object?: S3Object;
}
export const Image = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bytes: S.optional(T.Blob), S3Object: S.optional(S3Object) }),
).annotate({ identifier: "Image" }) as any as S.Schema<Image>;
export type QualityFilter =
  | "NONE"
  | "AUTO"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | (string & {});
export const QualityFilter = /*@__PURE__*/ S.String;

export interface CompareFacesRequest {
  SourceImage: Image;
  TargetImage: Image;
  SimilarityThreshold?: number;
  QualityFilter?: QualityFilter;
}
export const CompareFacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceImage: Image,
    TargetImage: Image,
    SimilarityThreshold: S.optional(S.Number),
    QualityFilter: S.optional(QualityFilter),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CompareFacesRequest",
}) as any as S.Schema<CompareFacesRequest>;
export interface BoundingBox {
  Width?: number;
  Height?: number;
  Left?: number;
  Top?: number;
}
export const BoundingBox = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Width: S.optional(S.Number),
    Height: S.optional(S.Number),
    Left: S.optional(S.Number),
    Top: S.optional(S.Number),
  }),
).annotate({ identifier: "BoundingBox" }) as any as S.Schema<BoundingBox>;
export interface ComparedSourceImageFace {
  BoundingBox?: BoundingBox;
  Confidence?: number;
}
export const ComparedSourceImageFace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BoundingBox: S.optional(BoundingBox),
    Confidence: S.optional(S.Number),
  }),
).annotate({
  identifier: "ComparedSourceImageFace",
}) as any as S.Schema<ComparedSourceImageFace>;
export type LandmarkType =
  | "eyeLeft"
  | "eyeRight"
  | "nose"
  | "mouthLeft"
  | "mouthRight"
  | "leftEyeBrowLeft"
  | "leftEyeBrowRight"
  | "leftEyeBrowUp"
  | "rightEyeBrowLeft"
  | "rightEyeBrowRight"
  | "rightEyeBrowUp"
  | "leftEyeLeft"
  | "leftEyeRight"
  | "leftEyeUp"
  | "leftEyeDown"
  | "rightEyeLeft"
  | "rightEyeRight"
  | "rightEyeUp"
  | "rightEyeDown"
  | "noseLeft"
  | "noseRight"
  | "mouthUp"
  | "mouthDown"
  | "leftPupil"
  | "rightPupil"
  | "upperJawlineLeft"
  | "midJawlineLeft"
  | "chinBottom"
  | "midJawlineRight"
  | "upperJawlineRight"
  | (string & {});
export const LandmarkType = /*@__PURE__*/ S.String;

export interface Landmark {
  Type?: LandmarkType;
  X?: number;
  Y?: number;
}
export const Landmark = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(LandmarkType),
    X: S.optional(S.Number),
    Y: S.optional(S.Number),
  }),
).annotate({ identifier: "Landmark" }) as any as S.Schema<Landmark>;
export type Landmarks = Landmark[];
export const Landmarks = /*@__PURE__*/ S.Array(Landmark);
export type Degree = number;
export interface Pose {
  Roll?: number;
  Yaw?: number;
  Pitch?: number;
}
export const Pose = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Roll: S.optional(S.Number),
    Yaw: S.optional(S.Number),
    Pitch: S.optional(S.Number),
  }),
).annotate({ identifier: "Pose" }) as any as S.Schema<Pose>;
export interface ImageQuality {
  Brightness?: number;
  Sharpness?: number;
}
export const ImageQuality = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Brightness: S.optional(S.Number),
    Sharpness: S.optional(S.Number),
  }),
).annotate({ identifier: "ImageQuality" }) as any as S.Schema<ImageQuality>;
export type EmotionName =
  | "HAPPY"
  | "SAD"
  | "ANGRY"
  | "CONFUSED"
  | "DISGUSTED"
  | "SURPRISED"
  | "CALM"
  | "UNKNOWN"
  | "FEAR"
  | (string & {});
export const EmotionName = /*@__PURE__*/ S.String;

export interface Emotion {
  Type?: EmotionName;
  Confidence?: number;
}
export const Emotion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.optional(EmotionName), Confidence: S.optional(S.Number) }),
).annotate({ identifier: "Emotion" }) as any as S.Schema<Emotion>;
export type Emotions = Emotion[];
export const Emotions = /*@__PURE__*/ S.Array(Emotion);
export interface Smile {
  Value?: boolean;
  Confidence?: number;
}
export const Smile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.optional(S.Boolean), Confidence: S.optional(S.Number) }),
).annotate({ identifier: "Smile" }) as any as S.Schema<Smile>;
export interface ComparedFace {
  BoundingBox?: BoundingBox;
  Confidence?: number;
  Landmarks?: Landmark[];
  Pose?: Pose;
  Quality?: ImageQuality;
  Emotions?: Emotion[];
  Smile?: Smile;
}
export const ComparedFace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BoundingBox: S.optional(BoundingBox),
    Confidence: S.optional(S.Number),
    Landmarks: S.optional(Landmarks),
    Pose: S.optional(Pose),
    Quality: S.optional(ImageQuality),
    Emotions: S.optional(Emotions),
    Smile: S.optional(Smile),
  }),
).annotate({ identifier: "ComparedFace" }) as any as S.Schema<ComparedFace>;
export interface CompareFacesMatch {
  Similarity?: number;
  Face?: ComparedFace;
}
export const CompareFacesMatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Similarity: S.optional(S.Number),
    Face: S.optional(ComparedFace),
  }),
).annotate({
  identifier: "CompareFacesMatch",
}) as any as S.Schema<CompareFacesMatch>;
export type CompareFacesMatchList = CompareFacesMatch[];
export const CompareFacesMatchList = /*@__PURE__*/ S.Array(CompareFacesMatch);
export type CompareFacesUnmatchList = ComparedFace[];
export const CompareFacesUnmatchList = /*@__PURE__*/ S.Array(ComparedFace);
export type OrientationCorrection =
  | "ROTATE_0"
  | "ROTATE_90"
  | "ROTATE_180"
  | "ROTATE_270"
  | (string & {});
export const OrientationCorrection = /*@__PURE__*/ S.String;

export interface CompareFacesResponse {
  SourceImageFace?: ComparedSourceImageFace;
  FaceMatches?: CompareFacesMatch[];
  UnmatchedFaces?: ComparedFace[];
  SourceImageOrientationCorrection?: OrientationCorrection;
  TargetImageOrientationCorrection?: OrientationCorrection;
}
export const CompareFacesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceImageFace: S.optional(ComparedSourceImageFace),
    FaceMatches: S.optional(CompareFacesMatchList),
    UnmatchedFaces: S.optional(CompareFacesUnmatchList),
    SourceImageOrientationCorrection: S.optional(OrientationCorrection),
    TargetImageOrientationCorrection: S.optional(OrientationCorrection),
  }),
).annotate({
  identifier: "CompareFacesResponse",
}) as any as S.Schema<CompareFacesResponse>;
export type ProjectArn = string;
export type ProjectVersionArn = string;
export type VersionName = string;
export type S3KeyPrefix = string;
export interface OutputConfig {
  S3Bucket?: string;
  S3KeyPrefix?: string;
}
export const OutputConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3Bucket: S.optional(S.String),
    S3KeyPrefix: S.optional(S.String),
  }),
).annotate({ identifier: "OutputConfig" }) as any as S.Schema<OutputConfig>;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type KmsKeyId = string;
export interface CopyProjectVersionRequest {
  SourceProjectArn: string;
  SourceProjectVersionArn: string;
  DestinationProjectArn: string;
  VersionName: string;
  OutputConfig: OutputConfig;
  Tags?: { [key: string]: string | undefined };
  KmsKeyId?: string;
}
export const CopyProjectVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceProjectArn: S.String,
    SourceProjectVersionArn: S.String,
    DestinationProjectArn: S.String,
    VersionName: S.String,
    OutputConfig: OutputConfig,
    Tags: S.optional(TagMap),
    KmsKeyId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CopyProjectVersionRequest",
}) as any as S.Schema<CopyProjectVersionRequest>;
export interface CopyProjectVersionResponse {
  ProjectVersionArn?: string;
}
export const CopyProjectVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProjectVersionArn: S.optional(S.String) }),
).annotate({
  identifier: "CopyProjectVersionResponse",
}) as any as S.Schema<CopyProjectVersionResponse>;
export interface CreateCollectionRequest {
  CollectionId: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateCollectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CollectionId: S.String, Tags: S.optional(TagMap) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateCollectionRequest",
}) as any as S.Schema<CreateCollectionRequest>;
export type UInteger = number;
export interface CreateCollectionResponse {
  StatusCode?: number;
  CollectionArn?: string;
  FaceModelVersion?: string;
}
export const CreateCollectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatusCode: S.optional(S.Number),
    CollectionArn: S.optional(S.String),
    FaceModelVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateCollectionResponse",
}) as any as S.Schema<CreateCollectionResponse>;
export interface GroundTruthManifest {
  S3Object?: S3Object;
}
export const GroundTruthManifest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Object: S.optional(S3Object) }),
).annotate({
  identifier: "GroundTruthManifest",
}) as any as S.Schema<GroundTruthManifest>;
export type DatasetArn = string;
export interface DatasetSource {
  GroundTruthManifest?: GroundTruthManifest;
  DatasetArn?: string;
}
export const DatasetSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroundTruthManifest: S.optional(GroundTruthManifest),
    DatasetArn: S.optional(S.String),
  }),
).annotate({ identifier: "DatasetSource" }) as any as S.Schema<DatasetSource>;
export type DatasetType = "TRAIN" | "TEST" | (string & {});
export const DatasetType = /*@__PURE__*/ S.String;

export interface CreateDatasetRequest {
  DatasetSource?: DatasetSource;
  DatasetType: DatasetType;
  ProjectArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetSource: S.optional(DatasetSource),
    DatasetType: DatasetType,
    ProjectArn: S.String,
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDatasetRequest",
}) as any as S.Schema<CreateDatasetRequest>;
export interface CreateDatasetResponse {
  DatasetArn?: string;
}
export const CreateDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatasetArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateDatasetResponse",
}) as any as S.Schema<CreateDatasetResponse>;
export type LivenessS3KeyPrefix = string;
export interface LivenessOutputConfig {
  S3Bucket: string;
  S3KeyPrefix?: string;
}
export const LivenessOutputConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Bucket: S.String, S3KeyPrefix: S.optional(S.String) }),
).annotate({
  identifier: "LivenessOutputConfig",
}) as any as S.Schema<LivenessOutputConfig>;
export type AuditImagesLimit = number;
export type ChallengeType =
  | "FaceMovementAndLightChallenge"
  | "FaceMovementChallenge"
  | (string & {});
export const ChallengeType = /*@__PURE__*/ S.String;

export type Version = string;
export interface Versions {
  Minimum?: string;
  Maximum?: string;
}
export const Versions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Minimum: S.optional(S.String), Maximum: S.optional(S.String) }),
).annotate({ identifier: "Versions" }) as any as S.Schema<Versions>;
export interface ChallengePreference {
  Type: ChallengeType;
  Versions?: Versions;
}
export const ChallengePreference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: ChallengeType, Versions: S.optional(Versions) }),
).annotate({
  identifier: "ChallengePreference",
}) as any as S.Schema<ChallengePreference>;
export type ChallengePreferences = ChallengePreference[];
export const ChallengePreferences = /*@__PURE__*/ S.Array(ChallengePreference);
export interface CreateFaceLivenessSessionRequestSettings {
  OutputConfig?: LivenessOutputConfig;
  AuditImagesLimit?: number;
  ChallengePreferences?: ChallengePreference[];
}
export const CreateFaceLivenessSessionRequestSettings = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      OutputConfig: S.optional(LivenessOutputConfig),
      AuditImagesLimit: S.optional(S.Number),
      ChallengePreferences: S.optional(ChallengePreferences),
    }),
).annotate({
  identifier: "CreateFaceLivenessSessionRequestSettings",
}) as any as S.Schema<CreateFaceLivenessSessionRequestSettings>;
export interface CreateFaceLivenessSessionRequest {
  KmsKeyId?: string;
  Settings?: CreateFaceLivenessSessionRequestSettings;
  ClientRequestToken?: string;
}
export const CreateFaceLivenessSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KmsKeyId: S.optional(S.String),
    Settings: S.optional(CreateFaceLivenessSessionRequestSettings),
    ClientRequestToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateFaceLivenessSessionRequest",
}) as any as S.Schema<CreateFaceLivenessSessionRequest>;
export type LivenessSessionId = string;
export interface CreateFaceLivenessSessionResponse {
  SessionId: string;
}
export const CreateFaceLivenessSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SessionId: S.String }),
).annotate({
  identifier: "CreateFaceLivenessSessionResponse",
}) as any as S.Schema<CreateFaceLivenessSessionResponse>;
export type ProjectName = string;
export type CustomizationFeature =
  | "CONTENT_MODERATION"
  | "CUSTOM_LABELS"
  | (string & {});
export const CustomizationFeature = /*@__PURE__*/ S.String;

export type ProjectAutoUpdate = "ENABLED" | "DISABLED" | (string & {});
export const ProjectAutoUpdate = /*@__PURE__*/ S.String;

export interface CreateProjectRequest {
  ProjectName: string;
  Feature?: CustomizationFeature;
  AutoUpdate?: ProjectAutoUpdate;
  Tags?: { [key: string]: string | undefined };
}
export const CreateProjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProjectName: S.String,
    Feature: S.optional(CustomizationFeature),
    AutoUpdate: S.optional(ProjectAutoUpdate),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateProjectRequest",
}) as any as S.Schema<CreateProjectRequest>;
export interface CreateProjectResponse {
  ProjectArn?: string;
}
export const CreateProjectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProjectArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateProjectResponse",
}) as any as S.Schema<CreateProjectResponse>;
export interface Asset {
  GroundTruthManifest?: GroundTruthManifest;
}
export const Asset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroundTruthManifest: S.optional(GroundTruthManifest) }),
).annotate({ identifier: "Asset" }) as any as S.Schema<Asset>;
export type Assets = Asset[];
export const Assets = /*@__PURE__*/ S.Array(Asset);
export interface TrainingData {
  Assets?: Asset[];
}
export const TrainingData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Assets: S.optional(Assets) }),
).annotate({ identifier: "TrainingData" }) as any as S.Schema<TrainingData>;
export interface TestingData {
  Assets?: Asset[];
  AutoCreate?: boolean;
}
export const TestingData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Assets: S.optional(Assets), AutoCreate: S.optional(S.Boolean) }),
).annotate({ identifier: "TestingData" }) as any as S.Schema<TestingData>;
export type VersionDescription = string;
export interface CustomizationFeatureContentModerationConfig {
  ConfidenceThreshold?: number;
}
export const CustomizationFeatureContentModerationConfig =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ConfidenceThreshold: S.optional(S.Number) }),
  ).annotate({
    identifier: "CustomizationFeatureContentModerationConfig",
  }) as any as S.Schema<CustomizationFeatureContentModerationConfig>;
export interface CustomizationFeatureConfig {
  ContentModeration?: CustomizationFeatureContentModerationConfig;
}
export const CustomizationFeatureConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContentModeration: S.optional(CustomizationFeatureContentModerationConfig),
  }),
).annotate({
  identifier: "CustomizationFeatureConfig",
}) as any as S.Schema<CustomizationFeatureConfig>;
export interface CreateProjectVersionRequest {
  ProjectArn: string;
  VersionName: string;
  OutputConfig: OutputConfig;
  TrainingData?: TrainingData;
  TestingData?: TestingData;
  Tags?: { [key: string]: string | undefined };
  KmsKeyId?: string;
  VersionDescription?: string;
  FeatureConfig?: CustomizationFeatureConfig;
}
export const CreateProjectVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProjectArn: S.String,
    VersionName: S.String,
    OutputConfig: OutputConfig,
    TrainingData: S.optional(TrainingData),
    TestingData: S.optional(TestingData),
    Tags: S.optional(TagMap),
    KmsKeyId: S.optional(S.String),
    VersionDescription: S.optional(S.String),
    FeatureConfig: S.optional(CustomizationFeatureConfig),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateProjectVersionRequest",
}) as any as S.Schema<CreateProjectVersionRequest>;
export interface CreateProjectVersionResponse {
  ProjectVersionArn?: string;
}
export const CreateProjectVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProjectVersionArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateProjectVersionResponse",
}) as any as S.Schema<CreateProjectVersionResponse>;
export type KinesisVideoArn = string;
export interface KinesisVideoStream {
  Arn?: string;
}
export const KinesisVideoStream = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "KinesisVideoStream",
}) as any as S.Schema<KinesisVideoStream>;
export interface StreamProcessorInput {
  KinesisVideoStream?: KinesisVideoStream;
}
export const StreamProcessorInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ KinesisVideoStream: S.optional(KinesisVideoStream) }),
).annotate({
  identifier: "StreamProcessorInput",
}) as any as S.Schema<StreamProcessorInput>;
export type KinesisDataArn = string;
export interface KinesisDataStream {
  Arn?: string;
}
export const KinesisDataStream = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "KinesisDataStream",
}) as any as S.Schema<KinesisDataStream>;
export interface S3Destination {
  Bucket?: string;
  KeyPrefix?: string;
}
export const S3Destination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bucket: S.optional(S.String), KeyPrefix: S.optional(S.String) }),
).annotate({ identifier: "S3Destination" }) as any as S.Schema<S3Destination>;
export interface StreamProcessorOutput {
  KinesisDataStream?: KinesisDataStream;
  S3Destination?: S3Destination;
}
export const StreamProcessorOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KinesisDataStream: S.optional(KinesisDataStream),
    S3Destination: S.optional(S3Destination),
  }),
).annotate({
  identifier: "StreamProcessorOutput",
}) as any as S.Schema<StreamProcessorOutput>;
export type StreamProcessorName = string;
export interface FaceSearchSettings {
  CollectionId?: string;
  FaceMatchThreshold?: number;
}
export const FaceSearchSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionId: S.optional(S.String),
    FaceMatchThreshold: S.optional(S.Number),
  }),
).annotate({
  identifier: "FaceSearchSettings",
}) as any as S.Schema<FaceSearchSettings>;
export type ConnectedHomeLabel = string;
export type ConnectedHomeLabels = string[];
export const ConnectedHomeLabels = /*@__PURE__*/ S.Array(S.String);
export interface ConnectedHomeSettings {
  Labels: string[];
  MinConfidence?: number;
}
export const ConnectedHomeSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Labels: ConnectedHomeLabels,
    MinConfidence: S.optional(S.Number),
  }),
).annotate({
  identifier: "ConnectedHomeSettings",
}) as any as S.Schema<ConnectedHomeSettings>;
export interface StreamProcessorSettings {
  FaceSearch?: FaceSearchSettings;
  ConnectedHome?: ConnectedHomeSettings;
}
export const StreamProcessorSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FaceSearch: S.optional(FaceSearchSettings),
    ConnectedHome: S.optional(ConnectedHomeSettings),
  }),
).annotate({
  identifier: "StreamProcessorSettings",
}) as any as S.Schema<StreamProcessorSettings>;
export type RoleArn = string;
export type SNSTopicArn = string;
export interface StreamProcessorNotificationChannel {
  SNSTopicArn: string;
}
export const StreamProcessorNotificationChannel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SNSTopicArn: S.String }),
).annotate({
  identifier: "StreamProcessorNotificationChannel",
}) as any as S.Schema<StreamProcessorNotificationChannel>;
export interface Point {
  X?: number;
  Y?: number;
}
export const Point = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ X: S.optional(S.Number), Y: S.optional(S.Number) }),
).annotate({ identifier: "Point" }) as any as S.Schema<Point>;
export type Polygon = Point[];
export const Polygon = /*@__PURE__*/ S.Array(Point);
export interface RegionOfInterest {
  BoundingBox?: BoundingBox;
  Polygon?: Point[];
}
export const RegionOfInterest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BoundingBox: S.optional(BoundingBox),
    Polygon: S.optional(Polygon),
  }),
).annotate({
  identifier: "RegionOfInterest",
}) as any as S.Schema<RegionOfInterest>;
export type RegionsOfInterest = RegionOfInterest[];
export const RegionsOfInterest = /*@__PURE__*/ S.Array(RegionOfInterest);
export interface StreamProcessorDataSharingPreference {
  OptIn: boolean;
}
export const StreamProcessorDataSharingPreference = /*@__PURE__*/ S.suspend(
  () => S.Struct({ OptIn: S.Boolean }),
).annotate({
  identifier: "StreamProcessorDataSharingPreference",
}) as any as S.Schema<StreamProcessorDataSharingPreference>;
export interface CreateStreamProcessorRequest {
  Input: StreamProcessorInput;
  Output: StreamProcessorOutput;
  Name: string;
  Settings: StreamProcessorSettings;
  RoleArn: string;
  Tags?: { [key: string]: string | undefined };
  NotificationChannel?: StreamProcessorNotificationChannel;
  KmsKeyId?: string;
  RegionsOfInterest?: RegionOfInterest[];
  DataSharingPreference?: StreamProcessorDataSharingPreference;
}
export const CreateStreamProcessorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Input: StreamProcessorInput,
    Output: StreamProcessorOutput,
    Name: S.String,
    Settings: StreamProcessorSettings,
    RoleArn: S.String,
    Tags: S.optional(TagMap),
    NotificationChannel: S.optional(StreamProcessorNotificationChannel),
    KmsKeyId: S.optional(S.String),
    RegionsOfInterest: S.optional(RegionsOfInterest),
    DataSharingPreference: S.optional(StreamProcessorDataSharingPreference),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateStreamProcessorRequest",
}) as any as S.Schema<CreateStreamProcessorRequest>;
export type StreamProcessorArn = string;
export interface CreateStreamProcessorResponse {
  StreamProcessorArn?: string;
}
export const CreateStreamProcessorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StreamProcessorArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateStreamProcessorResponse",
}) as any as S.Schema<CreateStreamProcessorResponse>;
export interface CreateUserRequest {
  CollectionId: string;
  UserId: string;
  ClientRequestToken?: string;
}
export const CreateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionId: S.String,
    UserId: S.String,
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateUserRequest",
}) as any as S.Schema<CreateUserRequest>;
export interface CreateUserResponse {}
export const CreateUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateUserResponse",
}) as any as S.Schema<CreateUserResponse>;
export interface DeleteCollectionRequest {
  CollectionId: string;
}
export const DeleteCollectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CollectionId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteCollectionRequest",
}) as any as S.Schema<DeleteCollectionRequest>;
export interface DeleteCollectionResponse {
  StatusCode?: number;
}
export const DeleteCollectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StatusCode: S.optional(S.Number) }),
).annotate({
  identifier: "DeleteCollectionResponse",
}) as any as S.Schema<DeleteCollectionResponse>;
export interface DeleteDatasetRequest {
  DatasetArn: string;
}
export const DeleteDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatasetArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteDatasetRequest",
}) as any as S.Schema<DeleteDatasetRequest>;
export interface DeleteDatasetResponse {}
export const DeleteDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDatasetResponse",
}) as any as S.Schema<DeleteDatasetResponse>;
export type FaceIdList = string[];
export const FaceIdList = /*@__PURE__*/ S.Array(S.String);
export interface DeleteFacesRequest {
  CollectionId: string;
  FaceIds: string[];
}
export const DeleteFacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CollectionId: S.String, FaceIds: FaceIdList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteFacesRequest",
}) as any as S.Schema<DeleteFacesRequest>;
export type UnsuccessfulFaceDeletionReason =
  | "ASSOCIATED_TO_AN_EXISTING_USER"
  | "FACE_NOT_FOUND"
  | (string & {});
export const UnsuccessfulFaceDeletionReason = /*@__PURE__*/ S.String;

export type UnsuccessfulFaceDeletionReasons = UnsuccessfulFaceDeletionReason[];
export const UnsuccessfulFaceDeletionReasons = /*@__PURE__*/ S.Array(
  UnsuccessfulFaceDeletionReason,
);
export interface UnsuccessfulFaceDeletion {
  FaceId?: string;
  UserId?: string;
  Reasons?: UnsuccessfulFaceDeletionReason[];
}
export const UnsuccessfulFaceDeletion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FaceId: S.optional(S.String),
    UserId: S.optional(S.String),
    Reasons: S.optional(UnsuccessfulFaceDeletionReasons),
  }),
).annotate({
  identifier: "UnsuccessfulFaceDeletion",
}) as any as S.Schema<UnsuccessfulFaceDeletion>;
export type UnsuccessfulFaceDeletionsList = UnsuccessfulFaceDeletion[];
export const UnsuccessfulFaceDeletionsList = /*@__PURE__*/ S.Array(
  UnsuccessfulFaceDeletion,
);
export interface DeleteFacesResponse {
  DeletedFaces?: string[];
  UnsuccessfulFaceDeletions?: UnsuccessfulFaceDeletion[];
}
export const DeleteFacesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeletedFaces: S.optional(FaceIdList),
    UnsuccessfulFaceDeletions: S.optional(UnsuccessfulFaceDeletionsList),
  }),
).annotate({
  identifier: "DeleteFacesResponse",
}) as any as S.Schema<DeleteFacesResponse>;
export interface DeleteProjectRequest {
  ProjectArn: string;
}
export const DeleteProjectRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProjectArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteProjectRequest",
}) as any as S.Schema<DeleteProjectRequest>;
export type ProjectStatus = "CREATING" | "CREATED" | "DELETING" | (string & {});
export const ProjectStatus = /*@__PURE__*/ S.String;

export interface DeleteProjectResponse {
  Status?: ProjectStatus;
}
export const DeleteProjectResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(ProjectStatus) }),
).annotate({
  identifier: "DeleteProjectResponse",
}) as any as S.Schema<DeleteProjectResponse>;
export type ProjectPolicyName = string;
export type ProjectPolicyRevisionId = string;
export interface DeleteProjectPolicyRequest {
  ProjectArn: string;
  PolicyName: string;
  PolicyRevisionId?: string;
}
export const DeleteProjectPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProjectArn: S.String,
    PolicyName: S.String,
    PolicyRevisionId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteProjectPolicyRequest",
}) as any as S.Schema<DeleteProjectPolicyRequest>;
export interface DeleteProjectPolicyResponse {}
export const DeleteProjectPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteProjectPolicyResponse",
}) as any as S.Schema<DeleteProjectPolicyResponse>;
export interface DeleteProjectVersionRequest {
  ProjectVersionArn: string;
}
export const DeleteProjectVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProjectVersionArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteProjectVersionRequest",
}) as any as S.Schema<DeleteProjectVersionRequest>;
export type ProjectVersionStatus =
  | "TRAINING_IN_PROGRESS"
  | "TRAINING_COMPLETED"
  | "TRAINING_FAILED"
  | "STARTING"
  | "RUNNING"
  | "FAILED"
  | "STOPPING"
  | "STOPPED"
  | "DELETING"
  | "COPYING_IN_PROGRESS"
  | "COPYING_COMPLETED"
  | "COPYING_FAILED"
  | "DEPRECATED"
  | "EXPIRED"
  | (string & {});
export const ProjectVersionStatus = /*@__PURE__*/ S.String;

export interface DeleteProjectVersionResponse {
  Status?: ProjectVersionStatus;
}
export const DeleteProjectVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(ProjectVersionStatus) }),
).annotate({
  identifier: "DeleteProjectVersionResponse",
}) as any as S.Schema<DeleteProjectVersionResponse>;
export interface DeleteStreamProcessorRequest {
  Name: string;
}
export const DeleteStreamProcessorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteStreamProcessorRequest",
}) as any as S.Schema<DeleteStreamProcessorRequest>;
export interface DeleteStreamProcessorResponse {}
export const DeleteStreamProcessorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteStreamProcessorResponse",
}) as any as S.Schema<DeleteStreamProcessorResponse>;
export interface DeleteUserRequest {
  CollectionId: string;
  UserId: string;
  ClientRequestToken?: string;
}
export const DeleteUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionId: S.String,
    UserId: S.String,
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteUserRequest",
}) as any as S.Schema<DeleteUserRequest>;
export interface DeleteUserResponse {}
export const DeleteUserResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteUserResponse",
}) as any as S.Schema<DeleteUserResponse>;
export interface DescribeCollectionRequest {
  CollectionId: string;
}
export const DescribeCollectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CollectionId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeCollectionRequest",
}) as any as S.Schema<DescribeCollectionRequest>;
export type ULong = number;
export interface DescribeCollectionResponse {
  FaceCount?: number;
  FaceModelVersion?: string;
  CollectionARN?: string;
  CreationTimestamp?: Date;
  UserCount?: number;
}
export const DescribeCollectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FaceCount: S.optional(S.Number),
    FaceModelVersion: S.optional(S.String),
    CollectionARN: S.optional(S.String),
    CreationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    UserCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "DescribeCollectionResponse",
}) as any as S.Schema<DescribeCollectionResponse>;
export interface DescribeDatasetRequest {
  DatasetArn: string;
}
export const DescribeDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatasetArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeDatasetRequest",
}) as any as S.Schema<DescribeDatasetRequest>;
export type DatasetStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_COMPLETE"
  | "CREATE_FAILED"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_COMPLETE"
  | "UPDATE_FAILED"
  | "DELETE_IN_PROGRESS"
  | (string & {});
export const DatasetStatus = /*@__PURE__*/ S.String;

export type StatusMessage = string;
export type DatasetStatusMessageCode =
  | "SUCCESS"
  | "SERVICE_ERROR"
  | "CLIENT_ERROR"
  | (string & {});
export const DatasetStatusMessageCode = /*@__PURE__*/ S.String;

export interface DatasetStats {
  LabeledEntries?: number;
  TotalEntries?: number;
  TotalLabels?: number;
  ErrorEntries?: number;
}
export const DatasetStats = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LabeledEntries: S.optional(S.Number),
    TotalEntries: S.optional(S.Number),
    TotalLabels: S.optional(S.Number),
    ErrorEntries: S.optional(S.Number),
  }),
).annotate({ identifier: "DatasetStats" }) as any as S.Schema<DatasetStats>;
export interface DatasetDescription {
  CreationTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
  Status?: DatasetStatus;
  StatusMessage?: string;
  StatusMessageCode?: DatasetStatusMessageCode;
  DatasetStats?: DatasetStats;
}
export const DatasetDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Status: S.optional(DatasetStatus),
    StatusMessage: S.optional(S.String),
    StatusMessageCode: S.optional(DatasetStatusMessageCode),
    DatasetStats: S.optional(DatasetStats),
  }),
).annotate({
  identifier: "DatasetDescription",
}) as any as S.Schema<DatasetDescription>;
export interface DescribeDatasetResponse {
  DatasetDescription?: DatasetDescription;
}
export const DescribeDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatasetDescription: S.optional(DatasetDescription) }),
).annotate({
  identifier: "DescribeDatasetResponse",
}) as any as S.Schema<DescribeDatasetResponse>;
export type ExtendedPaginationToken = string;
export type ProjectsPageSize = number;
export type ProjectNames = string[];
export const ProjectNames = /*@__PURE__*/ S.Array(S.String);
export type CustomizationFeatures = CustomizationFeature[];
export const CustomizationFeatures =
  /*@__PURE__*/ S.Array(CustomizationFeature);
export interface DescribeProjectsRequest {
  NextToken?: string;
  MaxResults?: number;
  ProjectNames?: string[];
  Features?: CustomizationFeature[];
}
export const DescribeProjectsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    ProjectNames: S.optional(ProjectNames),
    Features: S.optional(CustomizationFeatures),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeProjectsRequest",
}) as any as S.Schema<DescribeProjectsRequest>;
export interface DatasetMetadata {
  CreationTimestamp?: Date;
  DatasetType?: DatasetType;
  DatasetArn?: string;
  Status?: DatasetStatus;
  StatusMessage?: string;
  StatusMessageCode?: DatasetStatusMessageCode;
}
export const DatasetMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    DatasetType: S.optional(DatasetType),
    DatasetArn: S.optional(S.String),
    Status: S.optional(DatasetStatus),
    StatusMessage: S.optional(S.String),
    StatusMessageCode: S.optional(DatasetStatusMessageCode),
  }),
).annotate({
  identifier: "DatasetMetadata",
}) as any as S.Schema<DatasetMetadata>;
export type DatasetMetadataList = DatasetMetadata[];
export const DatasetMetadataList = /*@__PURE__*/ S.Array(DatasetMetadata);
export interface ProjectDescription {
  ProjectArn?: string;
  CreationTimestamp?: Date;
  Status?: ProjectStatus;
  Datasets?: DatasetMetadata[];
  Feature?: CustomizationFeature;
  AutoUpdate?: ProjectAutoUpdate;
}
export const ProjectDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProjectArn: S.optional(S.String),
    CreationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Status: S.optional(ProjectStatus),
    Datasets: S.optional(DatasetMetadataList),
    Feature: S.optional(CustomizationFeature),
    AutoUpdate: S.optional(ProjectAutoUpdate),
  }),
).annotate({
  identifier: "ProjectDescription",
}) as any as S.Schema<ProjectDescription>;
export type ProjectDescriptions = ProjectDescription[];
export const ProjectDescriptions = /*@__PURE__*/ S.Array(ProjectDescription);
export interface DescribeProjectsResponse {
  ProjectDescriptions?: ProjectDescription[];
  NextToken?: string;
}
export const DescribeProjectsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProjectDescriptions: S.optional(ProjectDescriptions),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeProjectsResponse",
}) as any as S.Schema<DescribeProjectsResponse>;
export type VersionNames = string[];
export const VersionNames = /*@__PURE__*/ S.Array(S.String);
export type ProjectVersionsPageSize = number;
export interface DescribeProjectVersionsRequest {
  ProjectArn: string;
  VersionNames?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeProjectVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProjectArn: S.String,
    VersionNames: S.optional(VersionNames),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeProjectVersionsRequest",
}) as any as S.Schema<DescribeProjectVersionsRequest>;
export type InferenceUnits = number;
export interface ValidationData {
  Assets?: Asset[];
}
export const ValidationData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Assets: S.optional(Assets) }),
).annotate({ identifier: "ValidationData" }) as any as S.Schema<ValidationData>;
export interface TrainingDataResult {
  Input?: TrainingData;
  Output?: TrainingData;
  Validation?: ValidationData;
}
export const TrainingDataResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Input: S.optional(TrainingData),
    Output: S.optional(TrainingData),
    Validation: S.optional(ValidationData),
  }),
).annotate({
  identifier: "TrainingDataResult",
}) as any as S.Schema<TrainingDataResult>;
export interface TestingDataResult {
  Input?: TestingData;
  Output?: TestingData;
  Validation?: ValidationData;
}
export const TestingDataResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Input: S.optional(TestingData),
    Output: S.optional(TestingData),
    Validation: S.optional(ValidationData),
  }),
).annotate({
  identifier: "TestingDataResult",
}) as any as S.Schema<TestingDataResult>;
export interface Summary {
  S3Object?: S3Object;
}
export const Summary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Object: S.optional(S3Object) }),
).annotate({ identifier: "Summary" }) as any as S.Schema<Summary>;
export interface EvaluationResult {
  F1Score?: number;
  Summary?: Summary;
}
export const EvaluationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ F1Score: S.optional(S.Number), Summary: S.optional(Summary) }),
).annotate({
  identifier: "EvaluationResult",
}) as any as S.Schema<EvaluationResult>;
export interface ProjectVersionDescription {
  ProjectVersionArn?: string;
  CreationTimestamp?: Date;
  MinInferenceUnits?: number;
  Status?: ProjectVersionStatus;
  StatusMessage?: string;
  BillableTrainingTimeInSeconds?: number;
  TrainingEndTimestamp?: Date;
  OutputConfig?: OutputConfig;
  TrainingDataResult?: TrainingDataResult;
  TestingDataResult?: TestingDataResult;
  EvaluationResult?: EvaluationResult;
  ManifestSummary?: GroundTruthManifest;
  KmsKeyId?: string;
  MaxInferenceUnits?: number;
  SourceProjectVersionArn?: string;
  VersionDescription?: string;
  Feature?: CustomizationFeature;
  BaseModelVersion?: string;
  FeatureConfig?: CustomizationFeatureConfig;
}
export const ProjectVersionDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProjectVersionArn: S.optional(S.String),
    CreationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    MinInferenceUnits: S.optional(S.Number),
    Status: S.optional(ProjectVersionStatus),
    StatusMessage: S.optional(S.String),
    BillableTrainingTimeInSeconds: S.optional(S.Number),
    TrainingEndTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    OutputConfig: S.optional(OutputConfig),
    TrainingDataResult: S.optional(TrainingDataResult),
    TestingDataResult: S.optional(TestingDataResult),
    EvaluationResult: S.optional(EvaluationResult),
    ManifestSummary: S.optional(GroundTruthManifest),
    KmsKeyId: S.optional(S.String),
    MaxInferenceUnits: S.optional(S.Number),
    SourceProjectVersionArn: S.optional(S.String),
    VersionDescription: S.optional(S.String),
    Feature: S.optional(CustomizationFeature),
    BaseModelVersion: S.optional(S.String),
    FeatureConfig: S.optional(CustomizationFeatureConfig),
  }),
).annotate({
  identifier: "ProjectVersionDescription",
}) as any as S.Schema<ProjectVersionDescription>;
export type ProjectVersionDescriptions = ProjectVersionDescription[];
export const ProjectVersionDescriptions = /*@__PURE__*/ S.Array(
  ProjectVersionDescription,
);
export interface DescribeProjectVersionsResponse {
  ProjectVersionDescriptions?: ProjectVersionDescription[];
  NextToken?: string;
}
export const DescribeProjectVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProjectVersionDescriptions: S.optional(ProjectVersionDescriptions),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeProjectVersionsResponse",
}) as any as S.Schema<DescribeProjectVersionsResponse>;
export interface DescribeStreamProcessorRequest {
  Name: string;
}
export const DescribeStreamProcessorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeStreamProcessorRequest",
}) as any as S.Schema<DescribeStreamProcessorRequest>;
export type StreamProcessorStatus =
  | "STOPPED"
  | "STARTING"
  | "RUNNING"
  | "FAILED"
  | "STOPPING"
  | "UPDATING"
  | (string & {});
export const StreamProcessorStatus = /*@__PURE__*/ S.String;

export interface DescribeStreamProcessorResponse {
  Name?: string;
  StreamProcessorArn?: string;
  Status?: StreamProcessorStatus;
  StatusMessage?: string;
  CreationTimestamp?: Date;
  LastUpdateTimestamp?: Date;
  Input?: StreamProcessorInput;
  Output?: StreamProcessorOutput;
  RoleArn?: string;
  Settings?: StreamProcessorSettings;
  NotificationChannel?: StreamProcessorNotificationChannel;
  KmsKeyId?: string;
  RegionsOfInterest?: RegionOfInterest[];
  DataSharingPreference?: StreamProcessorDataSharingPreference;
}
export const DescribeStreamProcessorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    StreamProcessorArn: S.optional(S.String),
    Status: S.optional(StreamProcessorStatus),
    StatusMessage: S.optional(S.String),
    CreationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastUpdateTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Input: S.optional(StreamProcessorInput),
    Output: S.optional(StreamProcessorOutput),
    RoleArn: S.optional(S.String),
    Settings: S.optional(StreamProcessorSettings),
    NotificationChannel: S.optional(StreamProcessorNotificationChannel),
    KmsKeyId: S.optional(S.String),
    RegionsOfInterest: S.optional(RegionsOfInterest),
    DataSharingPreference: S.optional(StreamProcessorDataSharingPreference),
  }),
).annotate({
  identifier: "DescribeStreamProcessorResponse",
}) as any as S.Schema<DescribeStreamProcessorResponse>;
export interface DetectCustomLabelsRequest {
  ProjectVersionArn: string;
  Image: Image;
  MaxResults?: number;
  MinConfidence?: number;
}
export const DetectCustomLabelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProjectVersionArn: S.String,
    Image: Image,
    MaxResults: S.optional(S.Number),
    MinConfidence: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DetectCustomLabelsRequest",
}) as any as S.Schema<DetectCustomLabelsRequest>;
export interface Geometry {
  BoundingBox?: BoundingBox;
  Polygon?: Point[];
}
export const Geometry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BoundingBox: S.optional(BoundingBox),
    Polygon: S.optional(Polygon),
  }),
).annotate({ identifier: "Geometry" }) as any as S.Schema<Geometry>;
export interface CustomLabel {
  Name?: string;
  Confidence?: number;
  Geometry?: Geometry;
}
export const CustomLabel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Confidence: S.optional(S.Number),
    Geometry: S.optional(Geometry),
  }),
).annotate({ identifier: "CustomLabel" }) as any as S.Schema<CustomLabel>;
export type CustomLabels = CustomLabel[];
export const CustomLabels = /*@__PURE__*/ S.Array(CustomLabel);
export interface DetectCustomLabelsResponse {
  CustomLabels?: CustomLabel[];
}
export const DetectCustomLabelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CustomLabels: S.optional(CustomLabels) }),
).annotate({
  identifier: "DetectCustomLabelsResponse",
}) as any as S.Schema<DetectCustomLabelsResponse>;
export type Attribute =
  | "DEFAULT"
  | "ALL"
  | "AGE_RANGE"
  | "BEARD"
  | "EMOTIONS"
  | "EYE_DIRECTION"
  | "EYEGLASSES"
  | "EYES_OPEN"
  | "GENDER"
  | "MOUTH_OPEN"
  | "MUSTACHE"
  | "FACE_OCCLUDED"
  | "SMILE"
  | "SUNGLASSES"
  | (string & {});
export const Attribute = /*@__PURE__*/ S.String;

export type Attributes = Attribute[];
export const Attributes = /*@__PURE__*/ S.Array(Attribute);
export interface DetectFacesRequest {
  Image: Image;
  Attributes?: Attribute[];
}
export const DetectFacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Image: Image, Attributes: S.optional(Attributes) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DetectFacesRequest",
}) as any as S.Schema<DetectFacesRequest>;
export interface AgeRange {
  Low?: number;
  High?: number;
}
export const AgeRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Low: S.optional(S.Number), High: S.optional(S.Number) }),
).annotate({ identifier: "AgeRange" }) as any as S.Schema<AgeRange>;
export interface Eyeglasses {
  Value?: boolean;
  Confidence?: number;
}
export const Eyeglasses = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.optional(S.Boolean), Confidence: S.optional(S.Number) }),
).annotate({ identifier: "Eyeglasses" }) as any as S.Schema<Eyeglasses>;
export interface Sunglasses {
  Value?: boolean;
  Confidence?: number;
}
export const Sunglasses = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.optional(S.Boolean), Confidence: S.optional(S.Number) }),
).annotate({ identifier: "Sunglasses" }) as any as S.Schema<Sunglasses>;
export type GenderType = "Male" | "Female" | (string & {});
export const GenderType = /*@__PURE__*/ S.String;

export interface Gender {
  Value?: GenderType;
  Confidence?: number;
}
export const Gender = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.optional(GenderType), Confidence: S.optional(S.Number) }),
).annotate({ identifier: "Gender" }) as any as S.Schema<Gender>;
export interface Beard {
  Value?: boolean;
  Confidence?: number;
}
export const Beard = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.optional(S.Boolean), Confidence: S.optional(S.Number) }),
).annotate({ identifier: "Beard" }) as any as S.Schema<Beard>;
export interface Mustache {
  Value?: boolean;
  Confidence?: number;
}
export const Mustache = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.optional(S.Boolean), Confidence: S.optional(S.Number) }),
).annotate({ identifier: "Mustache" }) as any as S.Schema<Mustache>;
export interface EyeOpen {
  Value?: boolean;
  Confidence?: number;
}
export const EyeOpen = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.optional(S.Boolean), Confidence: S.optional(S.Number) }),
).annotate({ identifier: "EyeOpen" }) as any as S.Schema<EyeOpen>;
export interface MouthOpen {
  Value?: boolean;
  Confidence?: number;
}
export const MouthOpen = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.optional(S.Boolean), Confidence: S.optional(S.Number) }),
).annotate({ identifier: "MouthOpen" }) as any as S.Schema<MouthOpen>;
export interface FaceOccluded {
  Value?: boolean;
  Confidence?: number;
}
export const FaceOccluded = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.optional(S.Boolean), Confidence: S.optional(S.Number) }),
).annotate({ identifier: "FaceOccluded" }) as any as S.Schema<FaceOccluded>;
export interface EyeDirection {
  Yaw?: number;
  Pitch?: number;
  Confidence?: number;
}
export const EyeDirection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Yaw: S.optional(S.Number),
    Pitch: S.optional(S.Number),
    Confidence: S.optional(S.Number),
  }),
).annotate({ identifier: "EyeDirection" }) as any as S.Schema<EyeDirection>;
export interface FaceDetail {
  BoundingBox?: BoundingBox;
  AgeRange?: AgeRange;
  Smile?: Smile;
  Eyeglasses?: Eyeglasses;
  Sunglasses?: Sunglasses;
  Gender?: Gender;
  Beard?: Beard;
  Mustache?: Mustache;
  EyesOpen?: EyeOpen;
  MouthOpen?: MouthOpen;
  Emotions?: Emotion[];
  Landmarks?: Landmark[];
  Pose?: Pose;
  Quality?: ImageQuality;
  Confidence?: number;
  FaceOccluded?: FaceOccluded;
  EyeDirection?: EyeDirection;
}
export const FaceDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BoundingBox: S.optional(BoundingBox),
    AgeRange: S.optional(AgeRange),
    Smile: S.optional(Smile),
    Eyeglasses: S.optional(Eyeglasses),
    Sunglasses: S.optional(Sunglasses),
    Gender: S.optional(Gender),
    Beard: S.optional(Beard),
    Mustache: S.optional(Mustache),
    EyesOpen: S.optional(EyeOpen),
    MouthOpen: S.optional(MouthOpen),
    Emotions: S.optional(Emotions),
    Landmarks: S.optional(Landmarks),
    Pose: S.optional(Pose),
    Quality: S.optional(ImageQuality),
    Confidence: S.optional(S.Number),
    FaceOccluded: S.optional(FaceOccluded),
    EyeDirection: S.optional(EyeDirection),
  }),
).annotate({ identifier: "FaceDetail" }) as any as S.Schema<FaceDetail>;
export type FaceDetailList = FaceDetail[];
export const FaceDetailList = /*@__PURE__*/ S.Array(FaceDetail);
export interface DetectFacesResponse {
  FaceDetails?: FaceDetail[];
  OrientationCorrection?: OrientationCorrection;
}
export const DetectFacesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FaceDetails: S.optional(FaceDetailList),
    OrientationCorrection: S.optional(OrientationCorrection),
  }),
).annotate({
  identifier: "DetectFacesResponse",
}) as any as S.Schema<DetectFacesResponse>;
export type DetectLabelsFeatureName =
  | "GENERAL_LABELS"
  | "IMAGE_PROPERTIES"
  | (string & {});
export const DetectLabelsFeatureName = /*@__PURE__*/ S.String;

export type DetectLabelsFeatureList = DetectLabelsFeatureName[];
export const DetectLabelsFeatureList = /*@__PURE__*/ S.Array(
  DetectLabelsFeatureName,
);
export type GeneralLabelsFilterValue = string;
export type GeneralLabelsFilterList = string[];
export const GeneralLabelsFilterList = /*@__PURE__*/ S.Array(S.String);
export interface GeneralLabelsSettings {
  LabelInclusionFilters?: string[];
  LabelExclusionFilters?: string[];
  LabelCategoryInclusionFilters?: string[];
  LabelCategoryExclusionFilters?: string[];
}
export const GeneralLabelsSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LabelInclusionFilters: S.optional(GeneralLabelsFilterList),
    LabelExclusionFilters: S.optional(GeneralLabelsFilterList),
    LabelCategoryInclusionFilters: S.optional(GeneralLabelsFilterList),
    LabelCategoryExclusionFilters: S.optional(GeneralLabelsFilterList),
  }),
).annotate({
  identifier: "GeneralLabelsSettings",
}) as any as S.Schema<GeneralLabelsSettings>;
export type DetectLabelsMaxDominantColors = number;
export interface DetectLabelsImagePropertiesSettings {
  MaxDominantColors?: number;
}
export const DetectLabelsImagePropertiesSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MaxDominantColors: S.optional(S.Number) }),
).annotate({
  identifier: "DetectLabelsImagePropertiesSettings",
}) as any as S.Schema<DetectLabelsImagePropertiesSettings>;
export interface DetectLabelsSettings {
  GeneralLabels?: GeneralLabelsSettings;
  ImageProperties?: DetectLabelsImagePropertiesSettings;
}
export const DetectLabelsSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GeneralLabels: S.optional(GeneralLabelsSettings),
    ImageProperties: S.optional(DetectLabelsImagePropertiesSettings),
  }),
).annotate({
  identifier: "DetectLabelsSettings",
}) as any as S.Schema<DetectLabelsSettings>;
export interface DetectLabelsRequest {
  Image: Image;
  MaxLabels?: number;
  MinConfidence?: number;
  Features?: DetectLabelsFeatureName[];
  Settings?: DetectLabelsSettings;
}
export const DetectLabelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Image: Image,
    MaxLabels: S.optional(S.Number),
    MinConfidence: S.optional(S.Number),
    Features: S.optional(DetectLabelsFeatureList),
    Settings: S.optional(DetectLabelsSettings),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DetectLabelsRequest",
}) as any as S.Schema<DetectLabelsRequest>;
export interface DominantColor {
  Red?: number;
  Blue?: number;
  Green?: number;
  HexCode?: string;
  CSSColor?: string;
  SimplifiedColor?: string;
  PixelPercent?: number;
}
export const DominantColor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Red: S.optional(S.Number),
    Blue: S.optional(S.Number),
    Green: S.optional(S.Number),
    HexCode: S.optional(S.String),
    CSSColor: S.optional(S.String),
    SimplifiedColor: S.optional(S.String),
    PixelPercent: S.optional(S.Number),
  }),
).annotate({ identifier: "DominantColor" }) as any as S.Schema<DominantColor>;
export type DominantColors = DominantColor[];
export const DominantColors = /*@__PURE__*/ S.Array(DominantColor);
export interface Instance {
  BoundingBox?: BoundingBox;
  Confidence?: number;
  DominantColors?: DominantColor[];
}
export const Instance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BoundingBox: S.optional(BoundingBox),
    Confidence: S.optional(S.Number),
    DominantColors: S.optional(DominantColors),
  }),
).annotate({ identifier: "Instance" }) as any as S.Schema<Instance>;
export type Instances = Instance[];
export const Instances = /*@__PURE__*/ S.Array(Instance);
export interface Parent {
  Name?: string;
}
export const Parent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({ identifier: "Parent" }) as any as S.Schema<Parent>;
export type Parents = Parent[];
export const Parents = /*@__PURE__*/ S.Array(Parent);
export interface LabelAlias {
  Name?: string;
}
export const LabelAlias = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({ identifier: "LabelAlias" }) as any as S.Schema<LabelAlias>;
export type LabelAliases = LabelAlias[];
export const LabelAliases = /*@__PURE__*/ S.Array(LabelAlias);
export interface LabelCategory {
  Name?: string;
}
export const LabelCategory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({ identifier: "LabelCategory" }) as any as S.Schema<LabelCategory>;
export type LabelCategories = LabelCategory[];
export const LabelCategories = /*@__PURE__*/ S.Array(LabelCategory);
export interface Label {
  Name?: string;
  Confidence?: number;
  Instances?: Instance[];
  Parents?: Parent[];
  Aliases?: LabelAlias[];
  Categories?: LabelCategory[];
}
export const Label = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Confidence: S.optional(S.Number),
    Instances: S.optional(Instances),
    Parents: S.optional(Parents),
    Aliases: S.optional(LabelAliases),
    Categories: S.optional(LabelCategories),
  }),
).annotate({ identifier: "Label" }) as any as S.Schema<Label>;
export type Labels = Label[];
export const Labels = /*@__PURE__*/ S.Array(Label);
export interface DetectLabelsImageQuality {
  Brightness?: number;
  Sharpness?: number;
  Contrast?: number;
}
export const DetectLabelsImageQuality = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Brightness: S.optional(S.Number),
    Sharpness: S.optional(S.Number),
    Contrast: S.optional(S.Number),
  }),
).annotate({
  identifier: "DetectLabelsImageQuality",
}) as any as S.Schema<DetectLabelsImageQuality>;
export interface DetectLabelsImageForeground {
  Quality?: DetectLabelsImageQuality;
  DominantColors?: DominantColor[];
}
export const DetectLabelsImageForeground = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Quality: S.optional(DetectLabelsImageQuality),
    DominantColors: S.optional(DominantColors),
  }),
).annotate({
  identifier: "DetectLabelsImageForeground",
}) as any as S.Schema<DetectLabelsImageForeground>;
export interface DetectLabelsImageBackground {
  Quality?: DetectLabelsImageQuality;
  DominantColors?: DominantColor[];
}
export const DetectLabelsImageBackground = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Quality: S.optional(DetectLabelsImageQuality),
    DominantColors: S.optional(DominantColors),
  }),
).annotate({
  identifier: "DetectLabelsImageBackground",
}) as any as S.Schema<DetectLabelsImageBackground>;
export interface DetectLabelsImageProperties {
  Quality?: DetectLabelsImageQuality;
  DominantColors?: DominantColor[];
  Foreground?: DetectLabelsImageForeground;
  Background?: DetectLabelsImageBackground;
}
export const DetectLabelsImageProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Quality: S.optional(DetectLabelsImageQuality),
    DominantColors: S.optional(DominantColors),
    Foreground: S.optional(DetectLabelsImageForeground),
    Background: S.optional(DetectLabelsImageBackground),
  }),
).annotate({
  identifier: "DetectLabelsImageProperties",
}) as any as S.Schema<DetectLabelsImageProperties>;
export interface DetectLabelsResponse {
  Labels?: Label[];
  OrientationCorrection?: OrientationCorrection;
  LabelModelVersion?: string;
  ImageProperties?: DetectLabelsImageProperties;
}
export const DetectLabelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Labels: S.optional(Labels),
    OrientationCorrection: S.optional(OrientationCorrection),
    LabelModelVersion: S.optional(S.String),
    ImageProperties: S.optional(DetectLabelsImageProperties),
  }),
).annotate({
  identifier: "DetectLabelsResponse",
}) as any as S.Schema<DetectLabelsResponse>;
export type HumanLoopName = string;
export type FlowDefinitionArn = string;
export type ContentClassifier =
  | "FreeOfPersonallyIdentifiableInformation"
  | "FreeOfAdultContent"
  | (string & {});
export const ContentClassifier = /*@__PURE__*/ S.String;

export type ContentClassifiers = ContentClassifier[];
export const ContentClassifiers = /*@__PURE__*/ S.Array(ContentClassifier);
export interface HumanLoopDataAttributes {
  ContentClassifiers?: ContentClassifier[];
}
export const HumanLoopDataAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContentClassifiers: S.optional(ContentClassifiers) }),
).annotate({
  identifier: "HumanLoopDataAttributes",
}) as any as S.Schema<HumanLoopDataAttributes>;
export interface HumanLoopConfig {
  HumanLoopName: string;
  FlowDefinitionArn: string;
  DataAttributes?: HumanLoopDataAttributes;
}
export const HumanLoopConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HumanLoopName: S.String,
    FlowDefinitionArn: S.String,
    DataAttributes: S.optional(HumanLoopDataAttributes),
  }),
).annotate({
  identifier: "HumanLoopConfig",
}) as any as S.Schema<HumanLoopConfig>;
export type ProjectVersionId = string;
export interface DetectModerationLabelsRequest {
  Image: Image;
  MinConfidence?: number;
  HumanLoopConfig?: HumanLoopConfig;
  ProjectVersion?: string;
}
export const DetectModerationLabelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Image: Image,
    MinConfidence: S.optional(S.Number),
    HumanLoopConfig: S.optional(HumanLoopConfig),
    ProjectVersion: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DetectModerationLabelsRequest",
}) as any as S.Schema<DetectModerationLabelsRequest>;
export interface ModerationLabel {
  Confidence?: number;
  Name?: string;
  ParentName?: string;
  TaxonomyLevel?: number;
}
export const ModerationLabel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Confidence: S.optional(S.Number),
    Name: S.optional(S.String),
    ParentName: S.optional(S.String),
    TaxonomyLevel: S.optional(S.Number),
  }),
).annotate({
  identifier: "ModerationLabel",
}) as any as S.Schema<ModerationLabel>;
export type ModerationLabels = ModerationLabel[];
export const ModerationLabels = /*@__PURE__*/ S.Array(ModerationLabel);
export type HumanLoopArn = string;
export type HumanLoopActivationReason = string;
export type HumanLoopActivationReasons = string[];
export const HumanLoopActivationReasons = /*@__PURE__*/ S.Array(S.String);
export type SynthesizedJsonHumanLoopActivationConditionsEvaluationResults =
  string;
export interface HumanLoopActivationOutput {
  HumanLoopArn?: string;
  HumanLoopActivationReasons?: string[];
  HumanLoopActivationConditionsEvaluationResults?: string;
}
export const HumanLoopActivationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HumanLoopArn: S.optional(S.String),
    HumanLoopActivationReasons: S.optional(HumanLoopActivationReasons),
    HumanLoopActivationConditionsEvaluationResults: S.optional(S.String),
  }),
).annotate({
  identifier: "HumanLoopActivationOutput",
}) as any as S.Schema<HumanLoopActivationOutput>;
export interface ContentType {
  Confidence?: number;
  Name?: string;
}
export const ContentType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Confidence: S.optional(S.Number), Name: S.optional(S.String) }),
).annotate({ identifier: "ContentType" }) as any as S.Schema<ContentType>;
export type ContentTypes = ContentType[];
export const ContentTypes = /*@__PURE__*/ S.Array(ContentType);
export interface DetectModerationLabelsResponse {
  ModerationLabels?: ModerationLabel[];
  ModerationModelVersion?: string;
  HumanLoopActivationOutput?: HumanLoopActivationOutput;
  ProjectVersion?: string;
  ContentTypes?: ContentType[];
}
export const DetectModerationLabelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModerationLabels: S.optional(ModerationLabels),
    ModerationModelVersion: S.optional(S.String),
    HumanLoopActivationOutput: S.optional(HumanLoopActivationOutput),
    ProjectVersion: S.optional(S.String),
    ContentTypes: S.optional(ContentTypes),
  }),
).annotate({
  identifier: "DetectModerationLabelsResponse",
}) as any as S.Schema<DetectModerationLabelsResponse>;
export type ProtectiveEquipmentType =
  | "FACE_COVER"
  | "HAND_COVER"
  | "HEAD_COVER"
  | (string & {});
export const ProtectiveEquipmentType = /*@__PURE__*/ S.String;

export type ProtectiveEquipmentTypes = ProtectiveEquipmentType[];
export const ProtectiveEquipmentTypes = /*@__PURE__*/ S.Array(
  ProtectiveEquipmentType,
);
export interface ProtectiveEquipmentSummarizationAttributes {
  MinConfidence: number;
  RequiredEquipmentTypes: ProtectiveEquipmentType[];
}
export const ProtectiveEquipmentSummarizationAttributes =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MinConfidence: S.Number,
      RequiredEquipmentTypes: ProtectiveEquipmentTypes,
    }),
  ).annotate({
    identifier: "ProtectiveEquipmentSummarizationAttributes",
  }) as any as S.Schema<ProtectiveEquipmentSummarizationAttributes>;
export interface DetectProtectiveEquipmentRequest {
  Image: Image;
  SummarizationAttributes?: ProtectiveEquipmentSummarizationAttributes;
}
export const DetectProtectiveEquipmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Image: Image,
    SummarizationAttributes: S.optional(
      ProtectiveEquipmentSummarizationAttributes,
    ),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DetectProtectiveEquipmentRequest",
}) as any as S.Schema<DetectProtectiveEquipmentRequest>;
export type BodyPart =
  | "FACE"
  | "HEAD"
  | "LEFT_HAND"
  | "RIGHT_HAND"
  | (string & {});
export const BodyPart = /*@__PURE__*/ S.String;

export interface CoversBodyPart {
  Confidence?: number;
  Value?: boolean;
}
export const CoversBodyPart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Confidence: S.optional(S.Number), Value: S.optional(S.Boolean) }),
).annotate({ identifier: "CoversBodyPart" }) as any as S.Schema<CoversBodyPart>;
export interface EquipmentDetection {
  BoundingBox?: BoundingBox;
  Confidence?: number;
  Type?: ProtectiveEquipmentType;
  CoversBodyPart?: CoversBodyPart;
}
export const EquipmentDetection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BoundingBox: S.optional(BoundingBox),
    Confidence: S.optional(S.Number),
    Type: S.optional(ProtectiveEquipmentType),
    CoversBodyPart: S.optional(CoversBodyPart),
  }),
).annotate({
  identifier: "EquipmentDetection",
}) as any as S.Schema<EquipmentDetection>;
export type EquipmentDetections = EquipmentDetection[];
export const EquipmentDetections = /*@__PURE__*/ S.Array(EquipmentDetection);
export interface ProtectiveEquipmentBodyPart {
  Name?: BodyPart;
  Confidence?: number;
  EquipmentDetections?: EquipmentDetection[];
}
export const ProtectiveEquipmentBodyPart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(BodyPart),
    Confidence: S.optional(S.Number),
    EquipmentDetections: S.optional(EquipmentDetections),
  }),
).annotate({
  identifier: "ProtectiveEquipmentBodyPart",
}) as any as S.Schema<ProtectiveEquipmentBodyPart>;
export type BodyParts = ProtectiveEquipmentBodyPart[];
export const BodyParts = /*@__PURE__*/ S.Array(ProtectiveEquipmentBodyPart);
export interface ProtectiveEquipmentPerson {
  BodyParts?: ProtectiveEquipmentBodyPart[];
  BoundingBox?: BoundingBox;
  Confidence?: number;
  Id?: number;
}
export const ProtectiveEquipmentPerson = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BodyParts: S.optional(BodyParts),
    BoundingBox: S.optional(BoundingBox),
    Confidence: S.optional(S.Number),
    Id: S.optional(S.Number),
  }),
).annotate({
  identifier: "ProtectiveEquipmentPerson",
}) as any as S.Schema<ProtectiveEquipmentPerson>;
export type ProtectiveEquipmentPersons = ProtectiveEquipmentPerson[];
export const ProtectiveEquipmentPersons = /*@__PURE__*/ S.Array(
  ProtectiveEquipmentPerson,
);
export type ProtectiveEquipmentPersonIds = number[];
export const ProtectiveEquipmentPersonIds = /*@__PURE__*/ S.Array(S.Number);
export interface ProtectiveEquipmentSummary {
  PersonsWithRequiredEquipment?: number[];
  PersonsWithoutRequiredEquipment?: number[];
  PersonsIndeterminate?: number[];
}
export const ProtectiveEquipmentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PersonsWithRequiredEquipment: S.optional(ProtectiveEquipmentPersonIds),
    PersonsWithoutRequiredEquipment: S.optional(ProtectiveEquipmentPersonIds),
    PersonsIndeterminate: S.optional(ProtectiveEquipmentPersonIds),
  }),
).annotate({
  identifier: "ProtectiveEquipmentSummary",
}) as any as S.Schema<ProtectiveEquipmentSummary>;
export interface DetectProtectiveEquipmentResponse {
  ProtectiveEquipmentModelVersion?: string;
  Persons?: ProtectiveEquipmentPerson[];
  Summary?: ProtectiveEquipmentSummary;
}
export const DetectProtectiveEquipmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProtectiveEquipmentModelVersion: S.optional(S.String),
    Persons: S.optional(ProtectiveEquipmentPersons),
    Summary: S.optional(ProtectiveEquipmentSummary),
  }),
).annotate({
  identifier: "DetectProtectiveEquipmentResponse",
}) as any as S.Schema<DetectProtectiveEquipmentResponse>;
export type BoundingBoxHeight = number;
export type BoundingBoxWidth = number;
export interface DetectionFilter {
  MinConfidence?: number;
  MinBoundingBoxHeight?: number;
  MinBoundingBoxWidth?: number;
}
export const DetectionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MinConfidence: S.optional(S.Number),
    MinBoundingBoxHeight: S.optional(S.Number),
    MinBoundingBoxWidth: S.optional(S.Number),
  }),
).annotate({
  identifier: "DetectionFilter",
}) as any as S.Schema<DetectionFilter>;
export interface DetectTextFilters {
  WordFilter?: DetectionFilter;
  RegionsOfInterest?: RegionOfInterest[];
}
export const DetectTextFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WordFilter: S.optional(DetectionFilter),
    RegionsOfInterest: S.optional(RegionsOfInterest),
  }),
).annotate({
  identifier: "DetectTextFilters",
}) as any as S.Schema<DetectTextFilters>;
export interface DetectTextRequest {
  Image: Image;
  Filters?: DetectTextFilters;
}
export const DetectTextRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Image: Image, Filters: S.optional(DetectTextFilters) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DetectTextRequest",
}) as any as S.Schema<DetectTextRequest>;
export type TextTypes = "LINE" | "WORD" | (string & {});
export const TextTypes = /*@__PURE__*/ S.String;

export interface TextDetection {
  DetectedText?: string;
  Type?: TextTypes;
  Id?: number;
  ParentId?: number;
  Confidence?: number;
  Geometry?: Geometry;
}
export const TextDetection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectedText: S.optional(S.String),
    Type: S.optional(TextTypes),
    Id: S.optional(S.Number),
    ParentId: S.optional(S.Number),
    Confidence: S.optional(S.Number),
    Geometry: S.optional(Geometry),
  }),
).annotate({ identifier: "TextDetection" }) as any as S.Schema<TextDetection>;
export type TextDetectionList = TextDetection[];
export const TextDetectionList = /*@__PURE__*/ S.Array(TextDetection);
export interface DetectTextResponse {
  TextDetections?: TextDetection[];
  TextModelVersion?: string;
}
export const DetectTextResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TextDetections: S.optional(TextDetectionList),
    TextModelVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "DetectTextResponse",
}) as any as S.Schema<DetectTextResponse>;
export interface DisassociateFacesRequest {
  CollectionId: string;
  UserId: string;
  ClientRequestToken?: string;
  FaceIds: string[];
}
export const DisassociateFacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionId: S.String,
    UserId: S.String,
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    FaceIds: UserFaceIdList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisassociateFacesRequest",
}) as any as S.Schema<DisassociateFacesRequest>;
export interface DisassociatedFace {
  FaceId?: string;
}
export const DisassociatedFace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FaceId: S.optional(S.String) }),
).annotate({
  identifier: "DisassociatedFace",
}) as any as S.Schema<DisassociatedFace>;
export type DisassociatedFacesList = DisassociatedFace[];
export const DisassociatedFacesList = /*@__PURE__*/ S.Array(DisassociatedFace);
export type UnsuccessfulFaceDisassociationReason =
  | "FACE_NOT_FOUND"
  | "ASSOCIATED_TO_A_DIFFERENT_USER"
  | (string & {});
export const UnsuccessfulFaceDisassociationReason = /*@__PURE__*/ S.String;

export type UnsuccessfulFaceDisassociationReasons =
  UnsuccessfulFaceDisassociationReason[];
export const UnsuccessfulFaceDisassociationReasons = /*@__PURE__*/ S.Array(
  UnsuccessfulFaceDisassociationReason,
);
export interface UnsuccessfulFaceDisassociation {
  FaceId?: string;
  UserId?: string;
  Reasons?: UnsuccessfulFaceDisassociationReason[];
}
export const UnsuccessfulFaceDisassociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FaceId: S.optional(S.String),
    UserId: S.optional(S.String),
    Reasons: S.optional(UnsuccessfulFaceDisassociationReasons),
  }),
).annotate({
  identifier: "UnsuccessfulFaceDisassociation",
}) as any as S.Schema<UnsuccessfulFaceDisassociation>;
export type UnsuccessfulFaceDisassociationList =
  UnsuccessfulFaceDisassociation[];
export const UnsuccessfulFaceDisassociationList = /*@__PURE__*/ S.Array(
  UnsuccessfulFaceDisassociation,
);
export interface DisassociateFacesResponse {
  DisassociatedFaces?: DisassociatedFace[];
  UnsuccessfulFaceDisassociations?: UnsuccessfulFaceDisassociation[];
  UserStatus?: UserStatus;
}
export const DisassociateFacesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DisassociatedFaces: S.optional(DisassociatedFacesList),
    UnsuccessfulFaceDisassociations: S.optional(
      UnsuccessfulFaceDisassociationList,
    ),
    UserStatus: S.optional(UserStatus),
  }),
).annotate({
  identifier: "DisassociateFacesResponse",
}) as any as S.Schema<DisassociateFacesResponse>;
export interface DistributeDataset {
  Arn: string;
}
export const DistributeDataset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String }),
).annotate({
  identifier: "DistributeDataset",
}) as any as S.Schema<DistributeDataset>;
export type DistributeDatasetMetadataList = DistributeDataset[];
export const DistributeDatasetMetadataList =
  /*@__PURE__*/ S.Array(DistributeDataset);
export interface DistributeDatasetEntriesRequest {
  Datasets: DistributeDataset[];
}
export const DistributeDatasetEntriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Datasets: DistributeDatasetMetadataList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DistributeDatasetEntriesRequest",
}) as any as S.Schema<DistributeDatasetEntriesRequest>;
export interface DistributeDatasetEntriesResponse {}
export const DistributeDatasetEntriesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DistributeDatasetEntriesResponse",
}) as any as S.Schema<DistributeDatasetEntriesResponse>;
export type RekognitionUniqueId = string;
export interface GetCelebrityInfoRequest {
  Id: string;
}
export const GetCelebrityInfoRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCelebrityInfoRequest",
}) as any as S.Schema<GetCelebrityInfoRequest>;
export type Url = string;
export type Urls = string[];
export const Urls = /*@__PURE__*/ S.Array(S.String);
export type KnownGenderType =
  | "Male"
  | "Female"
  | "Nonbinary"
  | "Unlisted"
  | (string & {});
export const KnownGenderType = /*@__PURE__*/ S.String;

export interface KnownGender {
  Type?: KnownGenderType;
}
export const KnownGender = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.optional(KnownGenderType) }),
).annotate({ identifier: "KnownGender" }) as any as S.Schema<KnownGender>;
export interface GetCelebrityInfoResponse {
  Urls?: string[];
  Name?: string;
  KnownGender?: KnownGender;
}
export const GetCelebrityInfoResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Urls: S.optional(Urls),
    Name: S.optional(S.String),
    KnownGender: S.optional(KnownGender),
  }),
).annotate({
  identifier: "GetCelebrityInfoResponse",
}) as any as S.Schema<GetCelebrityInfoResponse>;
export type JobId = string;
export type MaxResults = number;
export type PaginationToken = string;
export type CelebrityRecognitionSortBy = "ID" | "TIMESTAMP" | (string & {});
export const CelebrityRecognitionSortBy = /*@__PURE__*/ S.String;

export interface GetCelebrityRecognitionRequest {
  JobId: string;
  MaxResults?: number;
  NextToken?: string;
  SortBy?: CelebrityRecognitionSortBy;
}
export const GetCelebrityRecognitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    SortBy: S.optional(CelebrityRecognitionSortBy),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCelebrityRecognitionRequest",
}) as any as S.Schema<GetCelebrityRecognitionRequest>;
export type VideoJobStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export const VideoJobStatus = /*@__PURE__*/ S.String;

export type VideoColorRange = "FULL" | "LIMITED" | (string & {});
export const VideoColorRange = /*@__PURE__*/ S.String;

export interface VideoMetadata {
  Codec?: string;
  DurationMillis?: number;
  Format?: string;
  FrameRate?: number;
  FrameHeight?: number;
  FrameWidth?: number;
  ColorRange?: VideoColorRange;
}
export const VideoMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Codec: S.optional(S.String),
    DurationMillis: S.optional(S.Number),
    Format: S.optional(S.String),
    FrameRate: S.optional(S.Number),
    FrameHeight: S.optional(S.Number),
    FrameWidth: S.optional(S.Number),
    ColorRange: S.optional(VideoColorRange),
  }),
).annotate({ identifier: "VideoMetadata" }) as any as S.Schema<VideoMetadata>;
export interface CelebrityDetail {
  Urls?: string[];
  Name?: string;
  Id?: string;
  Confidence?: number;
  BoundingBox?: BoundingBox;
  Face?: FaceDetail;
  KnownGender?: KnownGender;
}
export const CelebrityDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Urls: S.optional(Urls),
    Name: S.optional(S.String),
    Id: S.optional(S.String),
    Confidence: S.optional(S.Number),
    BoundingBox: S.optional(BoundingBox),
    Face: S.optional(FaceDetail),
    KnownGender: S.optional(KnownGender),
  }),
).annotate({
  identifier: "CelebrityDetail",
}) as any as S.Schema<CelebrityDetail>;
export interface CelebrityRecognition {
  Timestamp?: number;
  Celebrity?: CelebrityDetail;
}
export const CelebrityRecognition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamp: S.optional(S.Number),
    Celebrity: S.optional(CelebrityDetail),
  }),
).annotate({
  identifier: "CelebrityRecognition",
}) as any as S.Schema<CelebrityRecognition>;
export type CelebrityRecognitions = CelebrityRecognition[];
export const CelebrityRecognitions =
  /*@__PURE__*/ S.Array(CelebrityRecognition);
export interface Video {
  S3Object?: S3Object;
}
export const Video = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Object: S.optional(S3Object) }),
).annotate({ identifier: "Video" }) as any as S.Schema<Video>;
export type JobTag = string;
export interface GetCelebrityRecognitionResponse {
  JobStatus?: VideoJobStatus;
  StatusMessage?: string;
  VideoMetadata?: VideoMetadata;
  NextToken?: string;
  Celebrities?: CelebrityRecognition[];
  JobId?: string;
  Video?: Video;
  JobTag?: string;
}
export const GetCelebrityRecognitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobStatus: S.optional(VideoJobStatus),
    StatusMessage: S.optional(S.String),
    VideoMetadata: S.optional(VideoMetadata),
    NextToken: S.optional(S.String),
    Celebrities: S.optional(CelebrityRecognitions),
    JobId: S.optional(S.String),
    Video: S.optional(Video),
    JobTag: S.optional(S.String),
  }),
).annotate({
  identifier: "GetCelebrityRecognitionResponse",
}) as any as S.Schema<GetCelebrityRecognitionResponse>;
export type ContentModerationSortBy = "NAME" | "TIMESTAMP" | (string & {});
export const ContentModerationSortBy = /*@__PURE__*/ S.String;

export type ContentModerationAggregateBy =
  | "TIMESTAMPS"
  | "SEGMENTS"
  | (string & {});
export const ContentModerationAggregateBy = /*@__PURE__*/ S.String;

export interface GetContentModerationRequest {
  JobId: string;
  MaxResults?: number;
  NextToken?: string;
  SortBy?: ContentModerationSortBy;
  AggregateBy?: ContentModerationAggregateBy;
}
export const GetContentModerationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    SortBy: S.optional(ContentModerationSortBy),
    AggregateBy: S.optional(ContentModerationAggregateBy),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetContentModerationRequest",
}) as any as S.Schema<GetContentModerationRequest>;
export interface ContentModerationDetection {
  Timestamp?: number;
  ModerationLabel?: ModerationLabel;
  StartTimestampMillis?: number;
  EndTimestampMillis?: number;
  DurationMillis?: number;
  ContentTypes?: ContentType[];
}
export const ContentModerationDetection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamp: S.optional(S.Number),
    ModerationLabel: S.optional(ModerationLabel),
    StartTimestampMillis: S.optional(S.Number),
    EndTimestampMillis: S.optional(S.Number),
    DurationMillis: S.optional(S.Number),
    ContentTypes: S.optional(ContentTypes),
  }),
).annotate({
  identifier: "ContentModerationDetection",
}) as any as S.Schema<ContentModerationDetection>;
export type ContentModerationDetections = ContentModerationDetection[];
export const ContentModerationDetections = /*@__PURE__*/ S.Array(
  ContentModerationDetection,
);
export interface GetContentModerationRequestMetadata {
  SortBy?: ContentModerationSortBy;
  AggregateBy?: ContentModerationAggregateBy;
}
export const GetContentModerationRequestMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SortBy: S.optional(ContentModerationSortBy),
    AggregateBy: S.optional(ContentModerationAggregateBy),
  }),
).annotate({
  identifier: "GetContentModerationRequestMetadata",
}) as any as S.Schema<GetContentModerationRequestMetadata>;
export interface GetContentModerationResponse {
  JobStatus?: VideoJobStatus;
  StatusMessage?: string;
  VideoMetadata?: VideoMetadata;
  ModerationLabels?: ContentModerationDetection[];
  NextToken?: string;
  ModerationModelVersion?: string;
  JobId?: string;
  Video?: Video;
  JobTag?: string;
  GetRequestMetadata?: GetContentModerationRequestMetadata;
}
export const GetContentModerationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobStatus: S.optional(VideoJobStatus),
    StatusMessage: S.optional(S.String),
    VideoMetadata: S.optional(VideoMetadata),
    ModerationLabels: S.optional(ContentModerationDetections),
    NextToken: S.optional(S.String),
    ModerationModelVersion: S.optional(S.String),
    JobId: S.optional(S.String),
    Video: S.optional(Video),
    JobTag: S.optional(S.String),
    GetRequestMetadata: S.optional(GetContentModerationRequestMetadata),
  }),
).annotate({
  identifier: "GetContentModerationResponse",
}) as any as S.Schema<GetContentModerationResponse>;
export interface GetFaceDetectionRequest {
  JobId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const GetFaceDetectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetFaceDetectionRequest",
}) as any as S.Schema<GetFaceDetectionRequest>;
export interface FaceDetection {
  Timestamp?: number;
  Face?: FaceDetail;
}
export const FaceDetection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Timestamp: S.optional(S.Number), Face: S.optional(FaceDetail) }),
).annotate({ identifier: "FaceDetection" }) as any as S.Schema<FaceDetection>;
export type FaceDetections = FaceDetection[];
export const FaceDetections = /*@__PURE__*/ S.Array(FaceDetection);
export interface GetFaceDetectionResponse {
  JobStatus?: VideoJobStatus;
  StatusMessage?: string;
  VideoMetadata?: VideoMetadata;
  NextToken?: string;
  Faces?: FaceDetection[];
  JobId?: string;
  Video?: Video;
  JobTag?: string;
}
export const GetFaceDetectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobStatus: S.optional(VideoJobStatus),
    StatusMessage: S.optional(S.String),
    VideoMetadata: S.optional(VideoMetadata),
    NextToken: S.optional(S.String),
    Faces: S.optional(FaceDetections),
    JobId: S.optional(S.String),
    Video: S.optional(Video),
    JobTag: S.optional(S.String),
  }),
).annotate({
  identifier: "GetFaceDetectionResponse",
}) as any as S.Schema<GetFaceDetectionResponse>;
export interface GetFaceLivenessSessionResultsRequest {
  SessionId: string;
}
export const GetFaceLivenessSessionResultsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ SessionId: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetFaceLivenessSessionResultsRequest",
}) as any as S.Schema<GetFaceLivenessSessionResultsRequest>;
export type LivenessSessionStatus =
  | "CREATED"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | "EXPIRED"
  | (string & {});
export const LivenessSessionStatus = /*@__PURE__*/ S.String;

export type LivenessImageBlob = Uint8Array | redacted.Redacted<Uint8Array>;
export interface AuditImage {
  Bytes?: Uint8Array | redacted.Redacted<Uint8Array>;
  S3Object?: S3Object;
  BoundingBox?: BoundingBox;
}
export const AuditImage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bytes: S.optional(SensitiveBlob),
    S3Object: S.optional(S3Object),
    BoundingBox: S.optional(BoundingBox),
  }),
).annotate({ identifier: "AuditImage" }) as any as S.Schema<AuditImage>;
export type AuditImages = AuditImage[];
export const AuditImages = /*@__PURE__*/ S.Array(AuditImage);
export interface Challenge {
  Type: ChallengeType;
  Version: string;
}
export const Challenge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: ChallengeType, Version: S.String }),
).annotate({ identifier: "Challenge" }) as any as S.Schema<Challenge>;
export interface GetFaceLivenessSessionResultsResponse {
  SessionId: string;
  Status: LivenessSessionStatus;
  Confidence?: number;
  ReferenceImage?: AuditImage;
  AuditImages?: AuditImage[];
  Challenge?: Challenge;
}
export const GetFaceLivenessSessionResultsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SessionId: S.String,
      Status: LivenessSessionStatus,
      Confidence: S.optional(S.Number),
      ReferenceImage: S.optional(AuditImage),
      AuditImages: S.optional(AuditImages),
      Challenge: S.optional(Challenge),
    }),
).annotate({
  identifier: "GetFaceLivenessSessionResultsResponse",
}) as any as S.Schema<GetFaceLivenessSessionResultsResponse>;
export type FaceSearchSortBy = "INDEX" | "TIMESTAMP" | (string & {});
export const FaceSearchSortBy = /*@__PURE__*/ S.String;

export interface GetFaceSearchRequest {
  JobId: string;
  MaxResults?: number;
  NextToken?: string;
  SortBy?: FaceSearchSortBy;
}
export const GetFaceSearchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    SortBy: S.optional(FaceSearchSortBy),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetFaceSearchRequest",
}) as any as S.Schema<GetFaceSearchRequest>;
export type PersonIndex = number;
export interface PersonDetail {
  Index?: number;
  BoundingBox?: BoundingBox;
  Face?: FaceDetail;
}
export const PersonDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Index: S.optional(S.Number),
    BoundingBox: S.optional(BoundingBox),
    Face: S.optional(FaceDetail),
  }),
).annotate({ identifier: "PersonDetail" }) as any as S.Schema<PersonDetail>;
export type ImageId = string;
export type ExternalImageId = string;
export type IndexFacesModelVersion = string;
export interface Face {
  FaceId?: string;
  BoundingBox?: BoundingBox;
  ImageId?: string;
  ExternalImageId?: string;
  Confidence?: number;
  IndexFacesModelVersion?: string;
  UserId?: string;
}
export const Face = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FaceId: S.optional(S.String),
    BoundingBox: S.optional(BoundingBox),
    ImageId: S.optional(S.String),
    ExternalImageId: S.optional(S.String),
    Confidence: S.optional(S.Number),
    IndexFacesModelVersion: S.optional(S.String),
    UserId: S.optional(S.String),
  }),
).annotate({ identifier: "Face" }) as any as S.Schema<Face>;
export interface FaceMatch {
  Similarity?: number;
  Face?: Face;
}
export const FaceMatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Similarity: S.optional(S.Number), Face: S.optional(Face) }),
).annotate({ identifier: "FaceMatch" }) as any as S.Schema<FaceMatch>;
export type FaceMatchList = FaceMatch[];
export const FaceMatchList = /*@__PURE__*/ S.Array(FaceMatch);
export interface PersonMatch {
  Timestamp?: number;
  Person?: PersonDetail;
  FaceMatches?: FaceMatch[];
}
export const PersonMatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamp: S.optional(S.Number),
    Person: S.optional(PersonDetail),
    FaceMatches: S.optional(FaceMatchList),
  }),
).annotate({ identifier: "PersonMatch" }) as any as S.Schema<PersonMatch>;
export type PersonMatches = PersonMatch[];
export const PersonMatches = /*@__PURE__*/ S.Array(PersonMatch);
export interface GetFaceSearchResponse {
  JobStatus?: VideoJobStatus;
  StatusMessage?: string;
  NextToken?: string;
  VideoMetadata?: VideoMetadata;
  Persons?: PersonMatch[];
  JobId?: string;
  Video?: Video;
  JobTag?: string;
}
export const GetFaceSearchResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobStatus: S.optional(VideoJobStatus),
    StatusMessage: S.optional(S.String),
    NextToken: S.optional(S.String),
    VideoMetadata: S.optional(VideoMetadata),
    Persons: S.optional(PersonMatches),
    JobId: S.optional(S.String),
    Video: S.optional(Video),
    JobTag: S.optional(S.String),
  }),
).annotate({
  identifier: "GetFaceSearchResponse",
}) as any as S.Schema<GetFaceSearchResponse>;
export type LabelDetectionSortBy = "NAME" | "TIMESTAMP" | (string & {});
export const LabelDetectionSortBy = /*@__PURE__*/ S.String;

export type LabelDetectionAggregateBy =
  | "TIMESTAMPS"
  | "SEGMENTS"
  | (string & {});
export const LabelDetectionAggregateBy = /*@__PURE__*/ S.String;

export interface GetLabelDetectionRequest {
  JobId: string;
  MaxResults?: number;
  NextToken?: string;
  SortBy?: LabelDetectionSortBy;
  AggregateBy?: LabelDetectionAggregateBy;
}
export const GetLabelDetectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    SortBy: S.optional(LabelDetectionSortBy),
    AggregateBy: S.optional(LabelDetectionAggregateBy),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetLabelDetectionRequest",
}) as any as S.Schema<GetLabelDetectionRequest>;
export interface LabelDetection {
  Timestamp?: number;
  Label?: Label;
  StartTimestampMillis?: number;
  EndTimestampMillis?: number;
  DurationMillis?: number;
}
export const LabelDetection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamp: S.optional(S.Number),
    Label: S.optional(Label),
    StartTimestampMillis: S.optional(S.Number),
    EndTimestampMillis: S.optional(S.Number),
    DurationMillis: S.optional(S.Number),
  }),
).annotate({ identifier: "LabelDetection" }) as any as S.Schema<LabelDetection>;
export type LabelDetections = LabelDetection[];
export const LabelDetections = /*@__PURE__*/ S.Array(LabelDetection);
export interface GetLabelDetectionRequestMetadata {
  SortBy?: LabelDetectionSortBy;
  AggregateBy?: LabelDetectionAggregateBy;
}
export const GetLabelDetectionRequestMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SortBy: S.optional(LabelDetectionSortBy),
    AggregateBy: S.optional(LabelDetectionAggregateBy),
  }),
).annotate({
  identifier: "GetLabelDetectionRequestMetadata",
}) as any as S.Schema<GetLabelDetectionRequestMetadata>;
export interface GetLabelDetectionResponse {
  JobStatus?: VideoJobStatus;
  StatusMessage?: string;
  VideoMetadata?: VideoMetadata;
  NextToken?: string;
  Labels?: LabelDetection[];
  LabelModelVersion?: string;
  JobId?: string;
  Video?: Video;
  JobTag?: string;
  GetRequestMetadata?: GetLabelDetectionRequestMetadata;
}
export const GetLabelDetectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobStatus: S.optional(VideoJobStatus),
    StatusMessage: S.optional(S.String),
    VideoMetadata: S.optional(VideoMetadata),
    NextToken: S.optional(S.String),
    Labels: S.optional(LabelDetections),
    LabelModelVersion: S.optional(S.String),
    JobId: S.optional(S.String),
    Video: S.optional(Video),
    JobTag: S.optional(S.String),
    GetRequestMetadata: S.optional(GetLabelDetectionRequestMetadata),
  }),
).annotate({
  identifier: "GetLabelDetectionResponse",
}) as any as S.Schema<GetLabelDetectionResponse>;
export type MediaAnalysisJobId = string;
export interface GetMediaAnalysisJobRequest {
  JobId: string;
}
export const GetMediaAnalysisJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetMediaAnalysisJobRequest",
}) as any as S.Schema<GetMediaAnalysisJobRequest>;
export type MediaAnalysisJobName = string;
export interface MediaAnalysisDetectModerationLabelsConfig {
  MinConfidence?: number;
  ProjectVersion?: string;
}
export const MediaAnalysisDetectModerationLabelsConfig =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MinConfidence: S.optional(S.Number),
      ProjectVersion: S.optional(S.String),
    }),
  ).annotate({
    identifier: "MediaAnalysisDetectModerationLabelsConfig",
  }) as any as S.Schema<MediaAnalysisDetectModerationLabelsConfig>;
export interface MediaAnalysisOperationsConfig {
  DetectModerationLabels?: MediaAnalysisDetectModerationLabelsConfig;
}
export const MediaAnalysisOperationsConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetectModerationLabels: S.optional(
      MediaAnalysisDetectModerationLabelsConfig,
    ),
  }),
).annotate({
  identifier: "MediaAnalysisOperationsConfig",
}) as any as S.Schema<MediaAnalysisOperationsConfig>;
export type MediaAnalysisJobStatus =
  | "CREATED"
  | "QUEUED"
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export const MediaAnalysisJobStatus = /*@__PURE__*/ S.String;

export type MediaAnalysisJobFailureCode =
  | "INTERNAL_ERROR"
  | "INVALID_S3_OBJECT"
  | "INVALID_MANIFEST"
  | "INVALID_OUTPUT_CONFIG"
  | "INVALID_KMS_KEY"
  | "ACCESS_DENIED"
  | "RESOURCE_NOT_FOUND"
  | "RESOURCE_NOT_READY"
  | "THROTTLED"
  | (string & {});
export const MediaAnalysisJobFailureCode = /*@__PURE__*/ S.String;

export interface MediaAnalysisJobFailureDetails {
  Code?: MediaAnalysisJobFailureCode;
  Message?: string;
}
export const MediaAnalysisJobFailureDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(MediaAnalysisJobFailureCode),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "MediaAnalysisJobFailureDetails",
}) as any as S.Schema<MediaAnalysisJobFailureDetails>;
export interface MediaAnalysisInput {
  S3Object: S3Object;
}
export const MediaAnalysisInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Object: S3Object }),
).annotate({
  identifier: "MediaAnalysisInput",
}) as any as S.Schema<MediaAnalysisInput>;
export type MediaAnalysisS3KeyPrefix = string;
export interface MediaAnalysisOutputConfig {
  S3Bucket: string;
  S3KeyPrefix?: string;
}
export const MediaAnalysisOutputConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Bucket: S.String, S3KeyPrefix: S.optional(S.String) }),
).annotate({
  identifier: "MediaAnalysisOutputConfig",
}) as any as S.Schema<MediaAnalysisOutputConfig>;
export interface MediaAnalysisModelVersions {
  Moderation?: string;
}
export const MediaAnalysisModelVersions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Moderation: S.optional(S.String) }),
).annotate({
  identifier: "MediaAnalysisModelVersions",
}) as any as S.Schema<MediaAnalysisModelVersions>;
export interface MediaAnalysisResults {
  S3Object?: S3Object;
  ModelVersions?: MediaAnalysisModelVersions;
}
export const MediaAnalysisResults = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3Object: S.optional(S3Object),
    ModelVersions: S.optional(MediaAnalysisModelVersions),
  }),
).annotate({
  identifier: "MediaAnalysisResults",
}) as any as S.Schema<MediaAnalysisResults>;
export interface MediaAnalysisManifestSummary {
  S3Object?: S3Object;
}
export const MediaAnalysisManifestSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Object: S.optional(S3Object) }),
).annotate({
  identifier: "MediaAnalysisManifestSummary",
}) as any as S.Schema<MediaAnalysisManifestSummary>;
export interface GetMediaAnalysisJobResponse {
  JobId: string;
  JobName?: string;
  OperationsConfig: MediaAnalysisOperationsConfig;
  Status: MediaAnalysisJobStatus;
  FailureDetails?: MediaAnalysisJobFailureDetails;
  CreationTimestamp: Date;
  CompletionTimestamp?: Date;
  Input: MediaAnalysisInput;
  OutputConfig: MediaAnalysisOutputConfig;
  KmsKeyId?: string;
  Results?: MediaAnalysisResults;
  ManifestSummary?: MediaAnalysisManifestSummary;
}
export const GetMediaAnalysisJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.String,
    JobName: S.optional(S.String),
    OperationsConfig: MediaAnalysisOperationsConfig,
    Status: MediaAnalysisJobStatus,
    FailureDetails: S.optional(MediaAnalysisJobFailureDetails),
    CreationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    CompletionTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Input: MediaAnalysisInput,
    OutputConfig: MediaAnalysisOutputConfig,
    KmsKeyId: S.optional(S.String),
    Results: S.optional(MediaAnalysisResults),
    ManifestSummary: S.optional(MediaAnalysisManifestSummary),
  }),
).annotate({
  identifier: "GetMediaAnalysisJobResponse",
}) as any as S.Schema<GetMediaAnalysisJobResponse>;
export type PersonTrackingSortBy = "INDEX" | "TIMESTAMP" | (string & {});
export const PersonTrackingSortBy = /*@__PURE__*/ S.String;

export interface GetPersonTrackingRequest {
  JobId: string;
  MaxResults?: number;
  NextToken?: string;
  SortBy?: PersonTrackingSortBy;
}
export const GetPersonTrackingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    SortBy: S.optional(PersonTrackingSortBy),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetPersonTrackingRequest",
}) as any as S.Schema<GetPersonTrackingRequest>;
export interface PersonDetection {
  Timestamp?: number;
  Person?: PersonDetail;
}
export const PersonDetection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamp: S.optional(S.Number),
    Person: S.optional(PersonDetail),
  }),
).annotate({
  identifier: "PersonDetection",
}) as any as S.Schema<PersonDetection>;
export type PersonDetections = PersonDetection[];
export const PersonDetections = /*@__PURE__*/ S.Array(PersonDetection);
export interface GetPersonTrackingResponse {
  JobStatus?: VideoJobStatus;
  StatusMessage?: string;
  VideoMetadata?: VideoMetadata;
  NextToken?: string;
  Persons?: PersonDetection[];
  JobId?: string;
  Video?: Video;
  JobTag?: string;
}
export const GetPersonTrackingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobStatus: S.optional(VideoJobStatus),
    StatusMessage: S.optional(S.String),
    VideoMetadata: S.optional(VideoMetadata),
    NextToken: S.optional(S.String),
    Persons: S.optional(PersonDetections),
    JobId: S.optional(S.String),
    Video: S.optional(Video),
    JobTag: S.optional(S.String),
  }),
).annotate({
  identifier: "GetPersonTrackingResponse",
}) as any as S.Schema<GetPersonTrackingResponse>;
export interface GetSegmentDetectionRequest {
  JobId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const GetSegmentDetectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetSegmentDetectionRequest",
}) as any as S.Schema<GetSegmentDetectionRequest>;
export type VideoMetadataList = VideoMetadata[];
export const VideoMetadataList = /*@__PURE__*/ S.Array(VideoMetadata);
export interface AudioMetadata {
  Codec?: string;
  DurationMillis?: number;
  SampleRate?: number;
  NumberOfChannels?: number;
}
export const AudioMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Codec: S.optional(S.String),
    DurationMillis: S.optional(S.Number),
    SampleRate: S.optional(S.Number),
    NumberOfChannels: S.optional(S.Number),
  }),
).annotate({ identifier: "AudioMetadata" }) as any as S.Schema<AudioMetadata>;
export type AudioMetadataList = AudioMetadata[];
export const AudioMetadataList = /*@__PURE__*/ S.Array(AudioMetadata);
export type SegmentType = "TECHNICAL_CUE" | "SHOT" | (string & {});
export const SegmentType = /*@__PURE__*/ S.String;

export type Timecode = string;
export type TechnicalCueType =
  | "ColorBars"
  | "EndCredits"
  | "BlackFrames"
  | "OpeningCredits"
  | "StudioLogo"
  | "Slate"
  | "Content"
  | (string & {});
export const TechnicalCueType = /*@__PURE__*/ S.String;

export type SegmentConfidence = number;
export interface TechnicalCueSegment {
  Type?: TechnicalCueType;
  Confidence?: number;
}
export const TechnicalCueSegment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(TechnicalCueType),
    Confidence: S.optional(S.Number),
  }),
).annotate({
  identifier: "TechnicalCueSegment",
}) as any as S.Schema<TechnicalCueSegment>;
export interface ShotSegment {
  Index?: number;
  Confidence?: number;
}
export const ShotSegment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Index: S.optional(S.Number), Confidence: S.optional(S.Number) }),
).annotate({ identifier: "ShotSegment" }) as any as S.Schema<ShotSegment>;
export interface SegmentDetection {
  Type?: SegmentType;
  StartTimestampMillis?: number;
  EndTimestampMillis?: number;
  DurationMillis?: number;
  StartTimecodeSMPTE?: string;
  EndTimecodeSMPTE?: string;
  DurationSMPTE?: string;
  TechnicalCueSegment?: TechnicalCueSegment;
  ShotSegment?: ShotSegment;
  StartFrameNumber?: number;
  EndFrameNumber?: number;
  DurationFrames?: number;
}
export const SegmentDetection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(SegmentType),
    StartTimestampMillis: S.optional(S.Number),
    EndTimestampMillis: S.optional(S.Number),
    DurationMillis: S.optional(S.Number),
    StartTimecodeSMPTE: S.optional(S.String),
    EndTimecodeSMPTE: S.optional(S.String),
    DurationSMPTE: S.optional(S.String),
    TechnicalCueSegment: S.optional(TechnicalCueSegment),
    ShotSegment: S.optional(ShotSegment),
    StartFrameNumber: S.optional(S.Number),
    EndFrameNumber: S.optional(S.Number),
    DurationFrames: S.optional(S.Number),
  }),
).annotate({
  identifier: "SegmentDetection",
}) as any as S.Schema<SegmentDetection>;
export type SegmentDetections = SegmentDetection[];
export const SegmentDetections = /*@__PURE__*/ S.Array(SegmentDetection);
export interface SegmentTypeInfo {
  Type?: SegmentType;
  ModelVersion?: string;
}
export const SegmentTypeInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(SegmentType),
    ModelVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "SegmentTypeInfo",
}) as any as S.Schema<SegmentTypeInfo>;
export type SegmentTypesInfo = SegmentTypeInfo[];
export const SegmentTypesInfo = /*@__PURE__*/ S.Array(SegmentTypeInfo);
export interface GetSegmentDetectionResponse {
  JobStatus?: VideoJobStatus;
  StatusMessage?: string;
  VideoMetadata?: VideoMetadata[];
  AudioMetadata?: AudioMetadata[];
  NextToken?: string;
  Segments?: SegmentDetection[];
  SelectedSegmentTypes?: SegmentTypeInfo[];
  JobId?: string;
  Video?: Video;
  JobTag?: string;
}
export const GetSegmentDetectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobStatus: S.optional(VideoJobStatus),
    StatusMessage: S.optional(S.String),
    VideoMetadata: S.optional(VideoMetadataList),
    AudioMetadata: S.optional(AudioMetadataList),
    NextToken: S.optional(S.String),
    Segments: S.optional(SegmentDetections),
    SelectedSegmentTypes: S.optional(SegmentTypesInfo),
    JobId: S.optional(S.String),
    Video: S.optional(Video),
    JobTag: S.optional(S.String),
  }),
).annotate({
  identifier: "GetSegmentDetectionResponse",
}) as any as S.Schema<GetSegmentDetectionResponse>;
export interface GetTextDetectionRequest {
  JobId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const GetTextDetectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetTextDetectionRequest",
}) as any as S.Schema<GetTextDetectionRequest>;
export interface TextDetectionResult {
  Timestamp?: number;
  TextDetection?: TextDetection;
}
export const TextDetectionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamp: S.optional(S.Number),
    TextDetection: S.optional(TextDetection),
  }),
).annotate({
  identifier: "TextDetectionResult",
}) as any as S.Schema<TextDetectionResult>;
export type TextDetectionResults = TextDetectionResult[];
export const TextDetectionResults = /*@__PURE__*/ S.Array(TextDetectionResult);
export interface GetTextDetectionResponse {
  JobStatus?: VideoJobStatus;
  StatusMessage?: string;
  VideoMetadata?: VideoMetadata;
  TextDetections?: TextDetectionResult[];
  NextToken?: string;
  TextModelVersion?: string;
  JobId?: string;
  Video?: Video;
  JobTag?: string;
}
export const GetTextDetectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobStatus: S.optional(VideoJobStatus),
    StatusMessage: S.optional(S.String),
    VideoMetadata: S.optional(VideoMetadata),
    TextDetections: S.optional(TextDetectionResults),
    NextToken: S.optional(S.String),
    TextModelVersion: S.optional(S.String),
    JobId: S.optional(S.String),
    Video: S.optional(Video),
    JobTag: S.optional(S.String),
  }),
).annotate({
  identifier: "GetTextDetectionResponse",
}) as any as S.Schema<GetTextDetectionResponse>;
export type MaxFacesToIndex = number;
export interface IndexFacesRequest {
  CollectionId: string;
  Image: Image;
  ExternalImageId?: string;
  DetectionAttributes?: Attribute[];
  MaxFaces?: number;
  QualityFilter?: QualityFilter;
}
export const IndexFacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionId: S.String,
    Image: Image,
    ExternalImageId: S.optional(S.String),
    DetectionAttributes: S.optional(Attributes),
    MaxFaces: S.optional(S.Number),
    QualityFilter: S.optional(QualityFilter),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "IndexFacesRequest",
}) as any as S.Schema<IndexFacesRequest>;
export interface FaceRecord {
  Face?: Face;
  FaceDetail?: FaceDetail;
}
export const FaceRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Face: S.optional(Face), FaceDetail: S.optional(FaceDetail) }),
).annotate({ identifier: "FaceRecord" }) as any as S.Schema<FaceRecord>;
export type FaceRecordList = FaceRecord[];
export const FaceRecordList = /*@__PURE__*/ S.Array(FaceRecord);
export type Reason =
  | "EXCEEDS_MAX_FACES"
  | "EXTREME_POSE"
  | "LOW_BRIGHTNESS"
  | "LOW_SHARPNESS"
  | "LOW_CONFIDENCE"
  | "SMALL_BOUNDING_BOX"
  | "LOW_FACE_QUALITY"
  | (string & {});
export const Reason = /*@__PURE__*/ S.String;

export type Reasons = Reason[];
export const Reasons = /*@__PURE__*/ S.Array(Reason);
export interface UnindexedFace {
  Reasons?: Reason[];
  FaceDetail?: FaceDetail;
}
export const UnindexedFace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Reasons: S.optional(Reasons),
    FaceDetail: S.optional(FaceDetail),
  }),
).annotate({ identifier: "UnindexedFace" }) as any as S.Schema<UnindexedFace>;
export type UnindexedFaces = UnindexedFace[];
export const UnindexedFaces = /*@__PURE__*/ S.Array(UnindexedFace);
export interface IndexFacesResponse {
  FaceRecords?: FaceRecord[];
  OrientationCorrection?: OrientationCorrection;
  FaceModelVersion?: string;
  UnindexedFaces?: UnindexedFace[];
}
export const IndexFacesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FaceRecords: S.optional(FaceRecordList),
    OrientationCorrection: S.optional(OrientationCorrection),
    FaceModelVersion: S.optional(S.String),
    UnindexedFaces: S.optional(UnindexedFaces),
  }),
).annotate({
  identifier: "IndexFacesResponse",
}) as any as S.Schema<IndexFacesResponse>;
export type PageSize = number;
export interface ListCollectionsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListCollectionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListCollectionsRequest",
}) as any as S.Schema<ListCollectionsRequest>;
export type CollectionIdList = string[];
export const CollectionIdList = /*@__PURE__*/ S.Array(S.String);
export type FaceModelVersionList = string[];
export const FaceModelVersionList = /*@__PURE__*/ S.Array(S.String);
export interface ListCollectionsResponse {
  CollectionIds?: string[];
  NextToken?: string;
  FaceModelVersions?: string[];
}
export const ListCollectionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionIds: S.optional(CollectionIdList),
    NextToken: S.optional(S.String),
    FaceModelVersions: S.optional(FaceModelVersionList),
  }),
).annotate({
  identifier: "ListCollectionsResponse",
}) as any as S.Schema<ListCollectionsResponse>;
export type DatasetLabel = string;
export type DatasetLabels = string[];
export const DatasetLabels = /*@__PURE__*/ S.Array(S.String);
export type IsLabeled = boolean;
export type QueryString = string;
export type HasErrors = boolean;
export type ListDatasetEntriesPageSize = number;
export interface ListDatasetEntriesRequest {
  DatasetArn: string;
  ContainsLabels?: string[];
  Labeled?: boolean;
  SourceRefContains?: string;
  HasErrors?: boolean;
  NextToken?: string;
  MaxResults?: number;
}
export const ListDatasetEntriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetArn: S.String,
    ContainsLabels: S.optional(DatasetLabels),
    Labeled: S.optional(S.Boolean),
    SourceRefContains: S.optional(S.String),
    HasErrors: S.optional(S.Boolean),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDatasetEntriesRequest",
}) as any as S.Schema<ListDatasetEntriesRequest>;
export type DatasetEntry = string;
export type DatasetEntries = string[];
export const DatasetEntries = /*@__PURE__*/ S.Array(S.String);
export interface ListDatasetEntriesResponse {
  DatasetEntries?: string[];
  NextToken?: string;
}
export const ListDatasetEntriesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetEntries: S.optional(DatasetEntries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDatasetEntriesResponse",
}) as any as S.Schema<ListDatasetEntriesResponse>;
export type ListDatasetLabelsPageSize = number;
export interface ListDatasetLabelsRequest {
  DatasetArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListDatasetLabelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetArn: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDatasetLabelsRequest",
}) as any as S.Schema<ListDatasetLabelsRequest>;
export interface DatasetLabelStats {
  EntryCount?: number;
  BoundingBoxCount?: number;
}
export const DatasetLabelStats = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntryCount: S.optional(S.Number),
    BoundingBoxCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "DatasetLabelStats",
}) as any as S.Schema<DatasetLabelStats>;
export interface DatasetLabelDescription {
  LabelName?: string;
  LabelStats?: DatasetLabelStats;
}
export const DatasetLabelDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LabelName: S.optional(S.String),
    LabelStats: S.optional(DatasetLabelStats),
  }),
).annotate({
  identifier: "DatasetLabelDescription",
}) as any as S.Schema<DatasetLabelDescription>;
export type DatasetLabelDescriptions = DatasetLabelDescription[];
export const DatasetLabelDescriptions = /*@__PURE__*/ S.Array(
  DatasetLabelDescription,
);
export interface ListDatasetLabelsResponse {
  DatasetLabelDescriptions?: DatasetLabelDescription[];
  NextToken?: string;
}
export const ListDatasetLabelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetLabelDescriptions: S.optional(DatasetLabelDescriptions),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDatasetLabelsResponse",
}) as any as S.Schema<ListDatasetLabelsResponse>;
export interface ListFacesRequest {
  CollectionId: string;
  NextToken?: string;
  MaxResults?: number;
  UserId?: string;
  FaceIds?: string[];
}
export const ListFacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    UserId: S.optional(S.String),
    FaceIds: S.optional(FaceIdList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListFacesRequest",
}) as any as S.Schema<ListFacesRequest>;
export type FaceList = Face[];
export const FaceList = /*@__PURE__*/ S.Array(Face);
export interface ListFacesResponse {
  Faces?: Face[];
  NextToken?: string;
  FaceModelVersion?: string;
}
export const ListFacesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Faces: S.optional(FaceList),
    NextToken: S.optional(S.String),
    FaceModelVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFacesResponse",
}) as any as S.Schema<ListFacesResponse>;
export type ListMediaAnalysisJobsPageSize = number;
export interface ListMediaAnalysisJobsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListMediaAnalysisJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListMediaAnalysisJobsRequest",
}) as any as S.Schema<ListMediaAnalysisJobsRequest>;
export interface MediaAnalysisJobDescription {
  JobId: string;
  JobName?: string;
  OperationsConfig: MediaAnalysisOperationsConfig;
  Status: MediaAnalysisJobStatus;
  FailureDetails?: MediaAnalysisJobFailureDetails;
  CreationTimestamp: Date;
  CompletionTimestamp?: Date;
  Input: MediaAnalysisInput;
  OutputConfig: MediaAnalysisOutputConfig;
  KmsKeyId?: string;
  Results?: MediaAnalysisResults;
  ManifestSummary?: MediaAnalysisManifestSummary;
}
export const MediaAnalysisJobDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.String,
    JobName: S.optional(S.String),
    OperationsConfig: MediaAnalysisOperationsConfig,
    Status: MediaAnalysisJobStatus,
    FailureDetails: S.optional(MediaAnalysisJobFailureDetails),
    CreationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    CompletionTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Input: MediaAnalysisInput,
    OutputConfig: MediaAnalysisOutputConfig,
    KmsKeyId: S.optional(S.String),
    Results: S.optional(MediaAnalysisResults),
    ManifestSummary: S.optional(MediaAnalysisManifestSummary),
  }),
).annotate({
  identifier: "MediaAnalysisJobDescription",
}) as any as S.Schema<MediaAnalysisJobDescription>;
export type MediaAnalysisJobDescriptions = MediaAnalysisJobDescription[];
export const MediaAnalysisJobDescriptions = /*@__PURE__*/ S.Array(
  MediaAnalysisJobDescription,
);
export interface ListMediaAnalysisJobsResponse {
  NextToken?: string;
  MediaAnalysisJobs: MediaAnalysisJobDescription[];
}
export const ListMediaAnalysisJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MediaAnalysisJobs: MediaAnalysisJobDescriptions,
  }),
).annotate({
  identifier: "ListMediaAnalysisJobsResponse",
}) as any as S.Schema<ListMediaAnalysisJobsResponse>;
export type ListProjectPoliciesPageSize = number;
export interface ListProjectPoliciesRequest {
  ProjectArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListProjectPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProjectArn: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListProjectPoliciesRequest",
}) as any as S.Schema<ListProjectPoliciesRequest>;
export type ProjectPolicyDocument = string;
export interface ProjectPolicy {
  ProjectArn?: string;
  PolicyName?: string;
  PolicyRevisionId?: string;
  PolicyDocument?: string;
  CreationTimestamp?: Date;
  LastUpdatedTimestamp?: Date;
}
export const ProjectPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProjectArn: S.optional(S.String),
    PolicyName: S.optional(S.String),
    PolicyRevisionId: S.optional(S.String),
    PolicyDocument: S.optional(S.String),
    CreationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "ProjectPolicy" }) as any as S.Schema<ProjectPolicy>;
export type ProjectPolicies = ProjectPolicy[];
export const ProjectPolicies = /*@__PURE__*/ S.Array(ProjectPolicy);
export interface ListProjectPoliciesResponse {
  ProjectPolicies?: ProjectPolicy[];
  NextToken?: string;
}
export const ListProjectPoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProjectPolicies: S.optional(ProjectPolicies),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProjectPoliciesResponse",
}) as any as S.Schema<ListProjectPoliciesResponse>;
export interface ListStreamProcessorsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListStreamProcessorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListStreamProcessorsRequest",
}) as any as S.Schema<ListStreamProcessorsRequest>;
export interface StreamProcessor {
  Name?: string;
  Status?: StreamProcessorStatus;
}
export const StreamProcessor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Status: S.optional(StreamProcessorStatus),
  }),
).annotate({
  identifier: "StreamProcessor",
}) as any as S.Schema<StreamProcessor>;
export type StreamProcessorList = StreamProcessor[];
export const StreamProcessorList = /*@__PURE__*/ S.Array(StreamProcessor);
export interface ListStreamProcessorsResponse {
  NextToken?: string;
  StreamProcessors?: StreamProcessor[];
}
export const ListStreamProcessorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    StreamProcessors: S.optional(StreamProcessorList),
  }),
).annotate({
  identifier: "ListStreamProcessorsResponse",
}) as any as S.Schema<ListStreamProcessorsResponse>;
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type MaxUserResults = number;
export interface ListUsersRequest {
  CollectionId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListUsersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListUsersRequest",
}) as any as S.Schema<ListUsersRequest>;
export interface User {
  UserId?: string;
  UserStatus?: UserStatus;
}
export const User = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserId: S.optional(S.String),
    UserStatus: S.optional(UserStatus),
  }),
).annotate({ identifier: "User" }) as any as S.Schema<User>;
export type UserList = User[];
export const UserList = /*@__PURE__*/ S.Array(User);
export interface ListUsersResponse {
  Users?: User[];
  NextToken?: string;
}
export const ListUsersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Users: S.optional(UserList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListUsersResponse",
}) as any as S.Schema<ListUsersResponse>;
export interface PutProjectPolicyRequest {
  ProjectArn: string;
  PolicyName: string;
  PolicyRevisionId?: string;
  PolicyDocument: string;
}
export const PutProjectPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProjectArn: S.String,
    PolicyName: S.String,
    PolicyRevisionId: S.optional(S.String),
    PolicyDocument: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutProjectPolicyRequest",
}) as any as S.Schema<PutProjectPolicyRequest>;
export interface PutProjectPolicyResponse {
  PolicyRevisionId?: string;
}
export const PutProjectPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PolicyRevisionId: S.optional(S.String) }),
).annotate({
  identifier: "PutProjectPolicyResponse",
}) as any as S.Schema<PutProjectPolicyResponse>;
export interface RecognizeCelebritiesRequest {
  Image: Image;
}
export const RecognizeCelebritiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Image: Image }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RecognizeCelebritiesRequest",
}) as any as S.Schema<RecognizeCelebritiesRequest>;
export interface Celebrity {
  Urls?: string[];
  Name?: string;
  Id?: string;
  Face?: ComparedFace;
  MatchConfidence?: number;
  KnownGender?: KnownGender;
}
export const Celebrity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Urls: S.optional(Urls),
    Name: S.optional(S.String),
    Id: S.optional(S.String),
    Face: S.optional(ComparedFace),
    MatchConfidence: S.optional(S.Number),
    KnownGender: S.optional(KnownGender),
  }),
).annotate({ identifier: "Celebrity" }) as any as S.Schema<Celebrity>;
export type CelebrityList = Celebrity[];
export const CelebrityList = /*@__PURE__*/ S.Array(Celebrity);
export type ComparedFaceList = ComparedFace[];
export const ComparedFaceList = /*@__PURE__*/ S.Array(ComparedFace);
export interface RecognizeCelebritiesResponse {
  CelebrityFaces?: Celebrity[];
  UnrecognizedFaces?: ComparedFace[];
  OrientationCorrection?: OrientationCorrection;
}
export const RecognizeCelebritiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CelebrityFaces: S.optional(CelebrityList),
    UnrecognizedFaces: S.optional(ComparedFaceList),
    OrientationCorrection: S.optional(OrientationCorrection),
  }),
).annotate({
  identifier: "RecognizeCelebritiesResponse",
}) as any as S.Schema<RecognizeCelebritiesResponse>;
export type MaxFaces = number;
export interface SearchFacesRequest {
  CollectionId: string;
  FaceId: string;
  MaxFaces?: number;
  FaceMatchThreshold?: number;
}
export const SearchFacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionId: S.String,
    FaceId: S.String,
    MaxFaces: S.optional(S.Number),
    FaceMatchThreshold: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SearchFacesRequest",
}) as any as S.Schema<SearchFacesRequest>;
export interface SearchFacesResponse {
  SearchedFaceId?: string;
  FaceMatches?: FaceMatch[];
  FaceModelVersion?: string;
}
export const SearchFacesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SearchedFaceId: S.optional(S.String),
    FaceMatches: S.optional(FaceMatchList),
    FaceModelVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchFacesResponse",
}) as any as S.Schema<SearchFacesResponse>;
export interface SearchFacesByImageRequest {
  CollectionId: string;
  Image: Image;
  MaxFaces?: number;
  FaceMatchThreshold?: number;
  QualityFilter?: QualityFilter;
}
export const SearchFacesByImageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionId: S.String,
    Image: Image,
    MaxFaces: S.optional(S.Number),
    FaceMatchThreshold: S.optional(S.Number),
    QualityFilter: S.optional(QualityFilter),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SearchFacesByImageRequest",
}) as any as S.Schema<SearchFacesByImageRequest>;
export interface SearchFacesByImageResponse {
  SearchedFaceBoundingBox?: BoundingBox;
  SearchedFaceConfidence?: number;
  FaceMatches?: FaceMatch[];
  FaceModelVersion?: string;
}
export const SearchFacesByImageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SearchedFaceBoundingBox: S.optional(BoundingBox),
    SearchedFaceConfidence: S.optional(S.Number),
    FaceMatches: S.optional(FaceMatchList),
    FaceModelVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchFacesByImageResponse",
}) as any as S.Schema<SearchFacesByImageResponse>;
export interface SearchUsersRequest {
  CollectionId: string;
  UserId?: string;
  FaceId?: string;
  UserMatchThreshold?: number;
  MaxUsers?: number;
}
export const SearchUsersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionId: S.String,
    UserId: S.optional(S.String),
    FaceId: S.optional(S.String),
    UserMatchThreshold: S.optional(S.Number),
    MaxUsers: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SearchUsersRequest",
}) as any as S.Schema<SearchUsersRequest>;
export interface MatchedUser {
  UserId?: string;
  UserStatus?: UserStatus;
}
export const MatchedUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserId: S.optional(S.String),
    UserStatus: S.optional(UserStatus),
  }),
).annotate({ identifier: "MatchedUser" }) as any as S.Schema<MatchedUser>;
export interface UserMatch {
  Similarity?: number;
  User?: MatchedUser;
}
export const UserMatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Similarity: S.optional(S.Number), User: S.optional(MatchedUser) }),
).annotate({ identifier: "UserMatch" }) as any as S.Schema<UserMatch>;
export type UserMatchList = UserMatch[];
export const UserMatchList = /*@__PURE__*/ S.Array(UserMatch);
export interface SearchedFace {
  FaceId?: string;
}
export const SearchedFace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FaceId: S.optional(S.String) }),
).annotate({ identifier: "SearchedFace" }) as any as S.Schema<SearchedFace>;
export interface SearchedUser {
  UserId?: string;
}
export const SearchedUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserId: S.optional(S.String) }),
).annotate({ identifier: "SearchedUser" }) as any as S.Schema<SearchedUser>;
export interface SearchUsersResponse {
  UserMatches?: UserMatch[];
  FaceModelVersion?: string;
  SearchedFace?: SearchedFace;
  SearchedUser?: SearchedUser;
}
export const SearchUsersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserMatches: S.optional(UserMatchList),
    FaceModelVersion: S.optional(S.String),
    SearchedFace: S.optional(SearchedFace),
    SearchedUser: S.optional(SearchedUser),
  }),
).annotate({
  identifier: "SearchUsersResponse",
}) as any as S.Schema<SearchUsersResponse>;
export interface SearchUsersByImageRequest {
  CollectionId: string;
  Image: Image;
  UserMatchThreshold?: number;
  MaxUsers?: number;
  QualityFilter?: QualityFilter;
}
export const SearchUsersByImageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CollectionId: S.String,
    Image: Image,
    UserMatchThreshold: S.optional(S.Number),
    MaxUsers: S.optional(S.Number),
    QualityFilter: S.optional(QualityFilter),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SearchUsersByImageRequest",
}) as any as S.Schema<SearchUsersByImageRequest>;
export interface SearchedFaceDetails {
  FaceDetail?: FaceDetail;
}
export const SearchedFaceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FaceDetail: S.optional(FaceDetail) }),
).annotate({
  identifier: "SearchedFaceDetails",
}) as any as S.Schema<SearchedFaceDetails>;
export type UnsearchedFaceReason =
  | "FACE_NOT_LARGEST"
  | "EXCEEDS_MAX_FACES"
  | "EXTREME_POSE"
  | "LOW_BRIGHTNESS"
  | "LOW_SHARPNESS"
  | "LOW_CONFIDENCE"
  | "SMALL_BOUNDING_BOX"
  | "LOW_FACE_QUALITY"
  | (string & {});
export const UnsearchedFaceReason = /*@__PURE__*/ S.String;

export type UnsearchedFaceReasons = UnsearchedFaceReason[];
export const UnsearchedFaceReasons =
  /*@__PURE__*/ S.Array(UnsearchedFaceReason);
export interface UnsearchedFace {
  FaceDetails?: FaceDetail;
  Reasons?: UnsearchedFaceReason[];
}
export const UnsearchedFace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FaceDetails: S.optional(FaceDetail),
    Reasons: S.optional(UnsearchedFaceReasons),
  }),
).annotate({ identifier: "UnsearchedFace" }) as any as S.Schema<UnsearchedFace>;
export type UnsearchedFacesList = UnsearchedFace[];
export const UnsearchedFacesList = /*@__PURE__*/ S.Array(UnsearchedFace);
export interface SearchUsersByImageResponse {
  UserMatches?: UserMatch[];
  FaceModelVersion?: string;
  SearchedFace?: SearchedFaceDetails;
  UnsearchedFaces?: UnsearchedFace[];
}
export const SearchUsersByImageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserMatches: S.optional(UserMatchList),
    FaceModelVersion: S.optional(S.String),
    SearchedFace: S.optional(SearchedFaceDetails),
    UnsearchedFaces: S.optional(UnsearchedFacesList),
  }),
).annotate({
  identifier: "SearchUsersByImageResponse",
}) as any as S.Schema<SearchUsersByImageResponse>;
export interface NotificationChannel {
  SNSTopicArn: string;
  RoleArn: string;
}
export const NotificationChannel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SNSTopicArn: S.String, RoleArn: S.String }),
).annotate({
  identifier: "NotificationChannel",
}) as any as S.Schema<NotificationChannel>;
export interface StartCelebrityRecognitionRequest {
  Video: Video;
  ClientRequestToken?: string;
  NotificationChannel?: NotificationChannel;
  JobTag?: string;
}
export const StartCelebrityRecognitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Video: Video,
    ClientRequestToken: S.optional(S.String),
    NotificationChannel: S.optional(NotificationChannel),
    JobTag: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartCelebrityRecognitionRequest",
}) as any as S.Schema<StartCelebrityRecognitionRequest>;
export interface StartCelebrityRecognitionResponse {
  JobId?: string;
}
export const StartCelebrityRecognitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String) }),
).annotate({
  identifier: "StartCelebrityRecognitionResponse",
}) as any as S.Schema<StartCelebrityRecognitionResponse>;
export interface StartContentModerationRequest {
  Video: Video;
  MinConfidence?: number;
  ClientRequestToken?: string;
  NotificationChannel?: NotificationChannel;
  JobTag?: string;
}
export const StartContentModerationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Video: Video,
    MinConfidence: S.optional(S.Number),
    ClientRequestToken: S.optional(S.String),
    NotificationChannel: S.optional(NotificationChannel),
    JobTag: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartContentModerationRequest",
}) as any as S.Schema<StartContentModerationRequest>;
export interface StartContentModerationResponse {
  JobId?: string;
}
export const StartContentModerationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String) }),
).annotate({
  identifier: "StartContentModerationResponse",
}) as any as S.Schema<StartContentModerationResponse>;
export type FaceAttributes = "DEFAULT" | "ALL" | (string & {});
export const FaceAttributes = /*@__PURE__*/ S.String;

export interface StartFaceDetectionRequest {
  Video: Video;
  ClientRequestToken?: string;
  NotificationChannel?: NotificationChannel;
  FaceAttributes?: FaceAttributes;
  JobTag?: string;
}
export const StartFaceDetectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Video: Video,
    ClientRequestToken: S.optional(S.String),
    NotificationChannel: S.optional(NotificationChannel),
    FaceAttributes: S.optional(FaceAttributes),
    JobTag: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartFaceDetectionRequest",
}) as any as S.Schema<StartFaceDetectionRequest>;
export interface StartFaceDetectionResponse {
  JobId?: string;
}
export const StartFaceDetectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String) }),
).annotate({
  identifier: "StartFaceDetectionResponse",
}) as any as S.Schema<StartFaceDetectionResponse>;
export interface StartFaceSearchRequest {
  Video: Video;
  ClientRequestToken?: string;
  FaceMatchThreshold?: number;
  CollectionId: string;
  NotificationChannel?: NotificationChannel;
  JobTag?: string;
}
export const StartFaceSearchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Video: Video,
    ClientRequestToken: S.optional(S.String),
    FaceMatchThreshold: S.optional(S.Number),
    CollectionId: S.String,
    NotificationChannel: S.optional(NotificationChannel),
    JobTag: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartFaceSearchRequest",
}) as any as S.Schema<StartFaceSearchRequest>;
export interface StartFaceSearchResponse {
  JobId?: string;
}
export const StartFaceSearchResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String) }),
).annotate({
  identifier: "StartFaceSearchResponse",
}) as any as S.Schema<StartFaceSearchResponse>;
export type LabelDetectionFeatureName = "GENERAL_LABELS" | (string & {});
export const LabelDetectionFeatureName = /*@__PURE__*/ S.String;

export type LabelDetectionFeatureList = LabelDetectionFeatureName[];
export const LabelDetectionFeatureList = /*@__PURE__*/ S.Array(
  LabelDetectionFeatureName,
);
export interface LabelDetectionSettings {
  GeneralLabels?: GeneralLabelsSettings;
}
export const LabelDetectionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GeneralLabels: S.optional(GeneralLabelsSettings) }),
).annotate({
  identifier: "LabelDetectionSettings",
}) as any as S.Schema<LabelDetectionSettings>;
export interface StartLabelDetectionRequest {
  Video: Video;
  ClientRequestToken?: string;
  MinConfidence?: number;
  NotificationChannel?: NotificationChannel;
  JobTag?: string;
  Features?: LabelDetectionFeatureName[];
  Settings?: LabelDetectionSettings;
}
export const StartLabelDetectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Video: Video,
    ClientRequestToken: S.optional(S.String),
    MinConfidence: S.optional(S.Number),
    NotificationChannel: S.optional(NotificationChannel),
    JobTag: S.optional(S.String),
    Features: S.optional(LabelDetectionFeatureList),
    Settings: S.optional(LabelDetectionSettings),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartLabelDetectionRequest",
}) as any as S.Schema<StartLabelDetectionRequest>;
export interface StartLabelDetectionResponse {
  JobId?: string;
}
export const StartLabelDetectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String) }),
).annotate({
  identifier: "StartLabelDetectionResponse",
}) as any as S.Schema<StartLabelDetectionResponse>;
export interface StartMediaAnalysisJobRequest {
  ClientRequestToken?: string;
  JobName?: string;
  OperationsConfig: MediaAnalysisOperationsConfig;
  Input: MediaAnalysisInput;
  OutputConfig: MediaAnalysisOutputConfig;
  KmsKeyId?: string;
}
export const StartMediaAnalysisJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    JobName: S.optional(S.String),
    OperationsConfig: MediaAnalysisOperationsConfig,
    Input: MediaAnalysisInput,
    OutputConfig: MediaAnalysisOutputConfig,
    KmsKeyId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartMediaAnalysisJobRequest",
}) as any as S.Schema<StartMediaAnalysisJobRequest>;
export interface StartMediaAnalysisJobResponse {
  JobId: string;
}
export const StartMediaAnalysisJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String }),
).annotate({
  identifier: "StartMediaAnalysisJobResponse",
}) as any as S.Schema<StartMediaAnalysisJobResponse>;
export interface StartPersonTrackingRequest {
  Video: Video;
  ClientRequestToken?: string;
  NotificationChannel?: NotificationChannel;
  JobTag?: string;
}
export const StartPersonTrackingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Video: Video,
    ClientRequestToken: S.optional(S.String),
    NotificationChannel: S.optional(NotificationChannel),
    JobTag: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartPersonTrackingRequest",
}) as any as S.Schema<StartPersonTrackingRequest>;
export interface StartPersonTrackingResponse {
  JobId?: string;
}
export const StartPersonTrackingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String) }),
).annotate({
  identifier: "StartPersonTrackingResponse",
}) as any as S.Schema<StartPersonTrackingResponse>;
export interface StartProjectVersionRequest {
  ProjectVersionArn: string;
  MinInferenceUnits: number;
  MaxInferenceUnits?: number;
}
export const StartProjectVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProjectVersionArn: S.String,
    MinInferenceUnits: S.Number,
    MaxInferenceUnits: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartProjectVersionRequest",
}) as any as S.Schema<StartProjectVersionRequest>;
export interface StartProjectVersionResponse {
  Status?: ProjectVersionStatus;
}
export const StartProjectVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(ProjectVersionStatus) }),
).annotate({
  identifier: "StartProjectVersionResponse",
}) as any as S.Schema<StartProjectVersionResponse>;
export type MaxPixelThreshold = number;
export type MinCoveragePercentage = number;
export interface BlackFrame {
  MaxPixelThreshold?: number;
  MinCoveragePercentage?: number;
}
export const BlackFrame = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxPixelThreshold: S.optional(S.Number),
    MinCoveragePercentage: S.optional(S.Number),
  }),
).annotate({ identifier: "BlackFrame" }) as any as S.Schema<BlackFrame>;
export interface StartTechnicalCueDetectionFilter {
  MinSegmentConfidence?: number;
  BlackFrame?: BlackFrame;
}
export const StartTechnicalCueDetectionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MinSegmentConfidence: S.optional(S.Number),
    BlackFrame: S.optional(BlackFrame),
  }),
).annotate({
  identifier: "StartTechnicalCueDetectionFilter",
}) as any as S.Schema<StartTechnicalCueDetectionFilter>;
export interface StartShotDetectionFilter {
  MinSegmentConfidence?: number;
}
export const StartShotDetectionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MinSegmentConfidence: S.optional(S.Number) }),
).annotate({
  identifier: "StartShotDetectionFilter",
}) as any as S.Schema<StartShotDetectionFilter>;
export interface StartSegmentDetectionFilters {
  TechnicalCueFilter?: StartTechnicalCueDetectionFilter;
  ShotFilter?: StartShotDetectionFilter;
}
export const StartSegmentDetectionFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TechnicalCueFilter: S.optional(StartTechnicalCueDetectionFilter),
    ShotFilter: S.optional(StartShotDetectionFilter),
  }),
).annotate({
  identifier: "StartSegmentDetectionFilters",
}) as any as S.Schema<StartSegmentDetectionFilters>;
export type SegmentTypes = SegmentType[];
export const SegmentTypes = /*@__PURE__*/ S.Array(SegmentType);
export interface StartSegmentDetectionRequest {
  Video: Video;
  ClientRequestToken?: string;
  NotificationChannel?: NotificationChannel;
  JobTag?: string;
  Filters?: StartSegmentDetectionFilters;
  SegmentTypes: SegmentType[];
}
export const StartSegmentDetectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Video: Video,
    ClientRequestToken: S.optional(S.String),
    NotificationChannel: S.optional(NotificationChannel),
    JobTag: S.optional(S.String),
    Filters: S.optional(StartSegmentDetectionFilters),
    SegmentTypes: SegmentTypes,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartSegmentDetectionRequest",
}) as any as S.Schema<StartSegmentDetectionRequest>;
export interface StartSegmentDetectionResponse {
  JobId?: string;
}
export const StartSegmentDetectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String) }),
).annotate({
  identifier: "StartSegmentDetectionResponse",
}) as any as S.Schema<StartSegmentDetectionResponse>;
export type KinesisVideoStreamFragmentNumber = string;
export interface KinesisVideoStreamStartSelector {
  ProducerTimestamp?: number;
  FragmentNumber?: string;
}
export const KinesisVideoStreamStartSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProducerTimestamp: S.optional(S.Number),
    FragmentNumber: S.optional(S.String),
  }),
).annotate({
  identifier: "KinesisVideoStreamStartSelector",
}) as any as S.Schema<KinesisVideoStreamStartSelector>;
export interface StreamProcessingStartSelector {
  KVSStreamStartSelector?: KinesisVideoStreamStartSelector;
}
export const StreamProcessingStartSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KVSStreamStartSelector: S.optional(KinesisVideoStreamStartSelector),
  }),
).annotate({
  identifier: "StreamProcessingStartSelector",
}) as any as S.Schema<StreamProcessingStartSelector>;
export type MaxDurationInSecondsULong = number;
export interface StreamProcessingStopSelector {
  MaxDurationInSeconds?: number;
}
export const StreamProcessingStopSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MaxDurationInSeconds: S.optional(S.Number) }),
).annotate({
  identifier: "StreamProcessingStopSelector",
}) as any as S.Schema<StreamProcessingStopSelector>;
export interface StartStreamProcessorRequest {
  Name: string;
  StartSelector?: StreamProcessingStartSelector;
  StopSelector?: StreamProcessingStopSelector;
}
export const StartStreamProcessorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    StartSelector: S.optional(StreamProcessingStartSelector),
    StopSelector: S.optional(StreamProcessingStopSelector),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartStreamProcessorRequest",
}) as any as S.Schema<StartStreamProcessorRequest>;
export type StartStreamProcessorSessionId = string;
export interface StartStreamProcessorResponse {
  SessionId?: string;
}
export const StartStreamProcessorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SessionId: S.optional(S.String) }),
).annotate({
  identifier: "StartStreamProcessorResponse",
}) as any as S.Schema<StartStreamProcessorResponse>;
export interface StartTextDetectionFilters {
  WordFilter?: DetectionFilter;
  RegionsOfInterest?: RegionOfInterest[];
}
export const StartTextDetectionFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WordFilter: S.optional(DetectionFilter),
    RegionsOfInterest: S.optional(RegionsOfInterest),
  }),
).annotate({
  identifier: "StartTextDetectionFilters",
}) as any as S.Schema<StartTextDetectionFilters>;
export interface StartTextDetectionRequest {
  Video: Video;
  ClientRequestToken?: string;
  NotificationChannel?: NotificationChannel;
  JobTag?: string;
  Filters?: StartTextDetectionFilters;
}
export const StartTextDetectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Video: Video,
    ClientRequestToken: S.optional(S.String),
    NotificationChannel: S.optional(NotificationChannel),
    JobTag: S.optional(S.String),
    Filters: S.optional(StartTextDetectionFilters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartTextDetectionRequest",
}) as any as S.Schema<StartTextDetectionRequest>;
export interface StartTextDetectionResponse {
  JobId?: string;
}
export const StartTextDetectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String) }),
).annotate({
  identifier: "StartTextDetectionResponse",
}) as any as S.Schema<StartTextDetectionResponse>;
export interface StopProjectVersionRequest {
  ProjectVersionArn: string;
}
export const StopProjectVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProjectVersionArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopProjectVersionRequest",
}) as any as S.Schema<StopProjectVersionRequest>;
export interface StopProjectVersionResponse {
  Status?: ProjectVersionStatus;
}
export const StopProjectVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(ProjectVersionStatus) }),
).annotate({
  identifier: "StopProjectVersionResponse",
}) as any as S.Schema<StopProjectVersionResponse>;
export interface StopStreamProcessorRequest {
  Name: string;
}
export const StopStreamProcessorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopStreamProcessorRequest",
}) as any as S.Schema<StopStreamProcessorRequest>;
export interface StopStreamProcessorResponse {}
export const StopStreamProcessorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopStreamProcessorResponse",
}) as any as S.Schema<StopStreamProcessorResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: TagMap }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagKeys: TagKeyList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export type GroundTruthBlob = Uint8Array;
export interface DatasetChanges {
  GroundTruth: Uint8Array;
}
export const DatasetChanges = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroundTruth: T.Blob }),
).annotate({ identifier: "DatasetChanges" }) as any as S.Schema<DatasetChanges>;
export interface UpdateDatasetEntriesRequest {
  DatasetArn: string;
  Changes: DatasetChanges;
}
export const UpdateDatasetEntriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatasetArn: S.String, Changes: DatasetChanges }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateDatasetEntriesRequest",
}) as any as S.Schema<UpdateDatasetEntriesRequest>;
export interface UpdateDatasetEntriesResponse {}
export const UpdateDatasetEntriesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateDatasetEntriesResponse",
}) as any as S.Schema<UpdateDatasetEntriesResponse>;
export interface ConnectedHomeSettingsForUpdate {
  Labels?: string[];
  MinConfidence?: number;
}
export const ConnectedHomeSettingsForUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Labels: S.optional(ConnectedHomeLabels),
    MinConfidence: S.optional(S.Number),
  }),
).annotate({
  identifier: "ConnectedHomeSettingsForUpdate",
}) as any as S.Schema<ConnectedHomeSettingsForUpdate>;
export interface StreamProcessorSettingsForUpdate {
  ConnectedHomeForUpdate?: ConnectedHomeSettingsForUpdate;
}
export const StreamProcessorSettingsForUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectedHomeForUpdate: S.optional(ConnectedHomeSettingsForUpdate),
  }),
).annotate({
  identifier: "StreamProcessorSettingsForUpdate",
}) as any as S.Schema<StreamProcessorSettingsForUpdate>;
export type StreamProcessorParameterToDelete =
  | "ConnectedHomeMinConfidence"
  | "RegionsOfInterest"
  | (string & {});
export const StreamProcessorParameterToDelete = /*@__PURE__*/ S.String;

export type StreamProcessorParametersToDelete =
  StreamProcessorParameterToDelete[];
export const StreamProcessorParametersToDelete = /*@__PURE__*/ S.Array(
  StreamProcessorParameterToDelete,
);
export interface UpdateStreamProcessorRequest {
  Name: string;
  SettingsForUpdate?: StreamProcessorSettingsForUpdate;
  RegionsOfInterestForUpdate?: RegionOfInterest[];
  DataSharingPreferenceForUpdate?: StreamProcessorDataSharingPreference;
  ParametersToDelete?: StreamProcessorParameterToDelete[];
}
export const UpdateStreamProcessorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    SettingsForUpdate: S.optional(StreamProcessorSettingsForUpdate),
    RegionsOfInterestForUpdate: S.optional(RegionsOfInterest),
    DataSharingPreferenceForUpdate: S.optional(
      StreamProcessorDataSharingPreference,
    ),
    ParametersToDelete: S.optional(StreamProcessorParametersToDelete),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateStreamProcessorRequest",
}) as any as S.Schema<UpdateStreamProcessorRequest>;
export interface UpdateStreamProcessorResponse {}
export const UpdateStreamProcessorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateStreamProcessorResponse",
}) as any as S.Schema<UpdateStreamProcessorResponse>;
export type AssociateFacesError =
  | AccessDeniedException
  | ConflictException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates one or more faces with an existing UserID. Takes an array of
 * `FaceIds`. Each `FaceId` that are present in the `FaceIds`
 * list is associated with the provided UserID. The number of FaceIds that can be used as input
 * in a single request is limited to 100.
 *
 * Note that the total number of faces that can be associated with a single
 * `UserID` is also limited to 100. Once a `UserID` has 100 faces
 * associated with it, no additional faces can be added. If more API calls are made after the
 * limit is reached, a `ServiceQuotaExceededException` will result.
 *
 * The `UserMatchThreshold` parameter specifies the minimum user match confidence
 * required for the face to be associated with a UserID that has at least one `FaceID`
 * already associated. This ensures that the `FaceIds` are associated with the right
 * UserID. The value ranges from 0-100 and default value is 75.
 *
 * If successful, an array of `AssociatedFace` objects containing the associated
 * `FaceIds` is returned. If a given face is already associated with the given
 * `UserID`, it will be ignored and will not be returned in the response. If a given
 * face is already associated to a different `UserID`, isn't found in the collection,
 * doesn’t meet the `UserMatchThreshold`, or there are already 100 faces associated
 * with the `UserID`, it will be returned as part of an array of
 * `UnsuccessfulFaceAssociations.`
 *
 * The `UserStatus` reflects the status of an operation which updates a UserID
 * representation with a list of given faces. The `UserStatus` can be:
 *
 * - ACTIVE - All associations or disassociations of FaceID(s) for a UserID are
 * complete.
 *
 * - CREATED - A UserID has been created, but has no FaceID(s) associated with it.
 *
 * - UPDATING - A UserID is being updated and there are current associations or
 * disassociations of FaceID(s) taking place.
 */
export const associateFaces: API.OperationMethod<
  AssociateFacesRequest,
  AssociateFacesResponse,
  AssociateFacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateFacesRequest,
  output: AssociateFacesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateFaces",
}));

export type CompareFacesError =
  | AccessDeniedException
  | ImageTooLargeException
  | InternalServerError
  | InvalidImageFormatException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Compares a face in the *source* input image with each of the 100
 * largest faces detected in the *target* input image.
 *
 * If the source image contains multiple faces, the service detects the largest face and
 * compares it with each face detected in the target image.
 *
 * CompareFaces uses machine learning algorithms, which are probabilistic. A false negative
 * is an incorrect prediction that a face in the target image has a low similarity confidence
 * score when compared to the face in the source image. To reduce the probability of false
 * negatives, we recommend that you compare the target image against multiple source images. If
 * you plan to use `CompareFaces` to make a decision that impacts an individual's
 * rights, privacy, or access to services, we recommend that you pass the result to a human for
 * review and further validation before taking action.
 *
 * You pass the input and target images either as base64-encoded image bytes or as
 * references to images in an Amazon S3 bucket. If you use the
 * AWS
 * CLI to call Amazon Rekognition operations, passing image bytes isn't
 * supported. The image must be formatted as a PNG or JPEG file.
 *
 * In response, the operation returns an array of face matches ordered by similarity score
 * in descending order. For each face match, the response provides a bounding box of the face,
 * facial landmarks, pose details (pitch, roll, and yaw), quality (brightness and sharpness), and
 * confidence value (indicating the level of confidence that the bounding box contains a face).
 * The response also provides a similarity score, which indicates how closely the faces match.
 *
 * By default, only faces with a similarity score of greater than or equal to 80% are
 * returned in the response. You can change this value by specifying the
 * `SimilarityThreshold` parameter.
 *
 * `CompareFaces` also returns an array of faces that don't match the source
 * image. For each face, it returns a bounding box, confidence value, landmarks, pose details,
 * and quality. The response also returns information about the face in the source image,
 * including the bounding box of the face and confidence value.
 *
 * The `QualityFilter` input parameter allows you to filter out detected faces
 * that don’t meet a required quality bar. The quality bar is based on a variety of common use
 * cases. Use `QualityFilter` to set the quality bar by specifying `LOW`,
 * `MEDIUM`, or `HIGH`. If you do not want to filter detected faces,
 * specify `NONE`. The default value is `NONE`.
 *
 * If the image doesn't contain Exif metadata, `CompareFaces` returns
 * orientation information for the source and target images. Use these values to display the
 * images with the correct image orientation.
 *
 * If no faces are detected in the source or target images, `CompareFaces`
 * returns an `InvalidParameterException` error.
 *
 * This is a stateless API operation. That is, data returned by this operation doesn't
 * persist.
 *
 * For an example, see Comparing Faces in Images in the Amazon Rekognition Developer
 * Guide.
 *
 * This operation requires permissions to perform the
 * `rekognition:CompareFaces` action.
 */
export const compareFaces: API.OperationMethod<
  CompareFacesRequest,
  CompareFacesResponse,
  CompareFacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CompareFacesRequest,
  output: CompareFacesResponse,
  errors: [
    AccessDeniedException,
    ImageTooLargeException,
    InternalServerError,
    InvalidImageFormatException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompareFaces",
}));

export type CopyProjectVersionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Copies a version of an Amazon Rekognition Custom Labels model from a source project to a destination project. The source and
 * destination projects can be in different AWS accounts but must be in the same AWS Region.
 * You can't copy a model to another AWS service.
 *
 * To copy a model version to a different AWS account, you need to create a resource-based policy known as a
 * *project policy*. You attach the project policy to the
 * source project by calling PutProjectPolicy. The project policy
 * gives permission to copy the model version from a trusting AWS account to a trusted account.
 *
 * For more information creating and attaching a project policy, see Attaching a project policy (SDK)
 * in the *Amazon Rekognition Custom Labels Developer Guide*.
 *
 * If you are copying a model version to a project in the same AWS account, you don't need to create a project policy.
 *
 * Copying project versions is supported only for Custom Labels models.
 *
 * To copy a model, the destination project, source project, and source model version
 * must already exist.
 *
 * Copying a model version takes a while to complete. To get the current status, call DescribeProjectVersions and check the value of `Status` in the
 * ProjectVersionDescription object. The copy operation has finished when
 * the value of `Status` is `COPYING_COMPLETED`.
 *
 * This operation requires permissions to perform the `rekognition:CopyProjectVersion` action.
 */
export const copyProjectVersion: API.OperationMethod<
  CopyProjectVersionRequest,
  CopyProjectVersionResponse,
  CopyProjectVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CopyProjectVersionRequest,
  output: CopyProjectVersionResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyProjectVersion",
}));

export type CreateCollectionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceAlreadyExistsException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a collection in an AWS Region. You can add faces to the collection using the
 * IndexFaces operation.
 *
 * For example, you might create collections, one for each of your application users. A
 * user can then index faces using the `IndexFaces` operation and persist results in a
 * specific collection. Then, a user can search the collection for faces in the user-specific
 * container.
 *
 * When you create a collection, it is associated with the latest version of the face model
 * version.
 *
 * Collection names are case-sensitive.
 *
 * This operation requires permissions to perform the
 * `rekognition:CreateCollection` action. If you want to tag your collection, you
 * also require permission to perform the `rekognition:TagResource`
 * operation.
 */
export const createCollection: API.OperationMethod<
  CreateCollectionRequest,
  CreateCollectionResponse,
  CreateCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCollectionRequest,
  output: CreateCollectionResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceAlreadyExistsException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCollection",
}));

export type CreateDatasetError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Creates a new Amazon Rekognition Custom Labels dataset. You can create a dataset by using
 * an Amazon Sagemaker format manifest file or by copying an existing Amazon Rekognition Custom Labels dataset.
 *
 * To create a training dataset for a project, specify `TRAIN` for the value of
 * `DatasetType`. To create the test dataset for a project,
 * specify `TEST` for the value of `DatasetType`.
 *
 * The response from `CreateDataset` is the Amazon Resource Name (ARN) for the dataset.
 * Creating a dataset takes a while to complete. Use DescribeDataset to check the
 * current status. The dataset created successfully if the value of `Status` is
 * `CREATE_COMPLETE`.
 *
 * To check if any non-terminal errors occurred, call ListDatasetEntries
 * and check for the presence of `errors` lists in the JSON Lines.
 *
 * Dataset creation fails if a terminal error occurs (`Status` = `CREATE_FAILED`).
 * Currently, you can't access the terminal error information.
 *
 * For more information, see Creating dataset in the *Amazon Rekognition Custom Labels Developer Guide*.
 *
 * This operation requires permissions to perform the `rekognition:CreateDataset` action.
 * If you want to copy an existing dataset, you also require permission to perform the `rekognition:ListDatasetEntries` action.
 */
export const createDataset: API.OperationMethod<
  CreateDatasetRequest,
  CreateDatasetResponse,
  CreateDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDatasetRequest,
  output: CreateDatasetResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataset",
}));

export type CreateFaceLivenessSessionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * This API operation initiates a Face Liveness session. It returns a `SessionId`,
 * which you can use to start streaming Face Liveness video and get the results for a Face
 * Liveness session.
 *
 * You can use the `OutputConfig` option in the Settings parameter to provide an
 * Amazon S3 bucket location. The Amazon S3 bucket stores reference images and audit images. If no Amazon S3
 * bucket is defined, raw bytes are sent instead.
 *
 * You can use `AuditImagesLimit` to limit the number of audit images returned
 * when `GetFaceLivenessSessionResults` is called. This number is between 0 and 4. By
 * default, it is set to 0. The limit is best effort and based on the duration of the
 * selfie-video.
 */
export const createFaceLivenessSession: API.OperationMethod<
  CreateFaceLivenessSessionRequest,
  CreateFaceLivenessSessionResponse,
  CreateFaceLivenessSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFaceLivenessSessionRequest,
  output: CreateFaceLivenessSessionResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFaceLivenessSession",
}));

export type CreateProjectError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new Amazon Rekognition project. A project is a group of resources (datasets, model
 * versions) that you use to create and manage a Amazon Rekognition Custom Labels Model or custom adapter. You can
 * specify a feature to create the project with, if no feature is specified then Custom Labels
 * is used by default. For adapters, you can also choose whether or not to have the project
 * auto update by using the AutoUpdate argument. This operation requires permissions to
 * perform the `rekognition:CreateProject` action.
 */
export const createProject: API.OperationMethod<
  CreateProjectRequest,
  CreateProjectResponse,
  CreateProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProjectRequest,
  output: CreateProjectResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProject",
}));

export type CreateProjectVersionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new version of Amazon Rekognition project (like a Custom Labels model or a custom adapter)
 * and begins training. Models and adapters are managed as part of a Rekognition project. The
 * response from `CreateProjectVersion` is an Amazon Resource Name (ARN) for the
 * project version.
 *
 * The FeatureConfig operation argument allows you to configure specific model or adapter
 * settings. You can provide a description to the project version by using the
 * VersionDescription argment. Training can take a while to complete. You can get the current
 * status by calling DescribeProjectVersions. Training completed
 * successfully if the value of the `Status` field is
 * `TRAINING_COMPLETED`. Once training has successfully completed, call DescribeProjectVersions to get the training results and evaluate the
 * model.
 *
 * This operation requires permissions to perform the
 * `rekognition:CreateProjectVersion` action.
 *
 * The following applies only to projects with Amazon Rekognition Custom Labels as the chosen
 * feature:
 *
 * You can train a model in a project that doesn't have associated datasets by specifying manifest files in the
 * `TrainingData` and `TestingData` fields.
 *
 * If you open the console after training a model with manifest files, Amazon Rekognition Custom Labels creates
 * the datasets for you using the most recent manifest files. You can no longer train
 * a model version for the project by specifying manifest files.
 *
 * Instead of training with a project without associated datasets,
 * we recommend that you use the manifest
 * files to create training and test datasets for the project.
 */
export const createProjectVersion: API.OperationMethod<
  CreateProjectVersionRequest,
  CreateProjectVersionResponse,
  CreateProjectVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProjectVersionRequest,
  output: CreateProjectVersionResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProjectVersion",
}));

export type CreateStreamProcessorError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an Amazon Rekognition stream processor that you can use to detect and recognize faces or to detect labels in a streaming video.
 *
 * Amazon Rekognition Video is a consumer of live video from Amazon Kinesis Video Streams. There are two different settings for stream processors in Amazon Rekognition: detecting faces and detecting labels.
 *
 * - If you are creating a stream processor for detecting faces, you provide as input a Kinesis video stream
 * (`Input`) and a Kinesis data stream (`Output`) stream for receiving
 * the output. You must use the `FaceSearch` option in
 * `Settings`, specifying the collection that contains the faces you
 * want to recognize. After you have finished analyzing a streaming video, use
 * StopStreamProcessor to stop processing.
 *
 * - If you are creating a stream processor to detect labels, you provide as input a Kinesis video stream
 * (`Input`), Amazon S3 bucket information (`Output`), and an
 * Amazon SNS topic ARN (`NotificationChannel`). You can also provide a KMS
 * key ID to encrypt the data sent to your Amazon S3 bucket. You specify what you want
 * to detect by using the `ConnectedHome` option in settings, and
 * selecting one of the following: `PERSON`, `PET`,
 * `PACKAGE`, `ALL` You can also specify where in the
 * frame you want Amazon Rekognition to monitor with `RegionsOfInterest`. When
 * you run the StartStreamProcessor operation on a label
 * detection stream processor, you input start and stop information to determine
 * the length of the processing time.
 *
 * Use `Name` to assign an identifier for the stream processor. You use `Name`
 * to manage the stream processor. For example, you can start processing the source video by calling StartStreamProcessor with
 * the `Name` field.
 *
 * This operation requires permissions to perform the
 * `rekognition:CreateStreamProcessor` action. If you want to tag your stream processor, you also require permission to perform the `rekognition:TagResource` operation.
 */
export const createStreamProcessor: API.OperationMethod<
  CreateStreamProcessorRequest,
  CreateStreamProcessorResponse,
  CreateStreamProcessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStreamProcessorRequest,
  output: CreateStreamProcessorResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStreamProcessor",
}));

export type CreateUserError =
  | AccessDeniedException
  | ConflictException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new User within a collection specified by `CollectionId`. Takes
 * `UserId` as a parameter, which is a user provided ID which should be unique
 * within the collection. The provided `UserId` will alias the system generated UUID
 * to make the `UserId` more user friendly.
 *
 * Uses a `ClientToken`, an idempotency token that ensures a call to
 * `CreateUser` completes only once. If the value is not supplied, the AWS SDK
 * generates an idempotency token for the requests. This prevents retries after a network error
 * results from making multiple `CreateUser` calls.
 */
export const createUser: API.OperationMethod<
  CreateUserRequest,
  CreateUserResponse,
  CreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUserRequest,
  output: CreateUserResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
}));

export type DeleteCollectionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified collection. Note that this operation removes all faces in the
 * collection. For an example, see Deleting a
 * collection.
 *
 * This operation requires permissions to perform the
 * `rekognition:DeleteCollection` action.
 */
export const deleteCollection: API.OperationMethod<
  DeleteCollectionRequest,
  DeleteCollectionResponse,
  DeleteCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCollectionRequest,
  output: DeleteCollectionResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCollection",
}));

export type DeleteDatasetError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Deletes an existing Amazon Rekognition Custom Labels dataset.
 * Deleting a dataset might take while. Use DescribeDataset to check the
 * current status. The dataset is still deleting if the value of `Status` is
 * `DELETE_IN_PROGRESS`. If you try to access the dataset after it is deleted, you get
 * a `ResourceNotFoundException` exception.
 *
 * You can't delete a dataset while it is creating (`Status` = `CREATE_IN_PROGRESS`)
 * or if the dataset is updating (`Status` = `UPDATE_IN_PROGRESS`).
 *
 * This operation requires permissions to perform the `rekognition:DeleteDataset` action.
 */
export const deleteDataset: API.OperationMethod<
  DeleteDatasetRequest,
  DeleteDatasetResponse,
  DeleteDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDatasetRequest,
  output: DeleteDatasetResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataset",
}));

export type DeleteFacesError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes faces from a collection. You specify a collection ID and an array of face IDs
 * to remove from the collection.
 *
 * This operation requires permissions to perform the `rekognition:DeleteFaces`
 * action.
 */
export const deleteFaces: API.OperationMethod<
  DeleteFacesRequest,
  DeleteFacesResponse,
  DeleteFacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFacesRequest,
  output: DeleteFacesResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFaces",
}));

export type DeleteProjectError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a Amazon Rekognition project. To delete a project you must first delete all models or
 * adapters associated with the project. To delete a model or adapter, see DeleteProjectVersion.
 *
 * `DeleteProject` is an asynchronous operation. To check if the project is
 * deleted, call DescribeProjects. The project is deleted when the project
 * no longer appears in the response. Be aware that deleting a given project will also delete
 * any `ProjectPolicies` associated with that project.
 *
 * This operation requires permissions to perform the
 * `rekognition:DeleteProject` action.
 */
export const deleteProject: API.OperationMethod<
  DeleteProjectRequest,
  DeleteProjectResponse,
  DeleteProjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProjectRequest,
  output: DeleteProjectResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProject",
}));

export type DeleteProjectPolicyError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | InvalidPolicyRevisionIdException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Deletes an existing project policy.
 *
 * To get a list of project policies attached to a project, call ListProjectPolicies. To attach a project policy to a project, call PutProjectPolicy.
 *
 * This operation requires permissions to perform the `rekognition:DeleteProjectPolicy` action.
 */
export const deleteProjectPolicy: API.OperationMethod<
  DeleteProjectPolicyRequest,
  DeleteProjectPolicyResponse,
  DeleteProjectPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProjectPolicyRequest,
  output: DeleteProjectPolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    InvalidPolicyRevisionIdException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProjectPolicy",
}));

export type DeleteProjectVersionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a Rekognition project model or project version, like a Amazon Rekognition Custom Labels model or a custom
 * adapter.
 *
 * You can't delete a project version if it is running or if it is training. To check
 * the status of a project version, use the Status field returned from DescribeProjectVersions. To stop a project version call StopProjectVersion. If the project version is training, wait until it
 * finishes.
 *
 * This operation requires permissions to perform the
 * `rekognition:DeleteProjectVersion` action.
 */
export const deleteProjectVersion: API.OperationMethod<
  DeleteProjectVersionRequest,
  DeleteProjectVersionResponse,
  DeleteProjectVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProjectVersionRequest,
  output: DeleteProjectVersionResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProjectVersion",
}));

export type DeleteStreamProcessorError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the stream processor identified by `Name`. You assign the value for `Name` when you create the stream processor with
 * CreateStreamProcessor. You might not be able to use the same name for a stream processor for a few seconds after calling `DeleteStreamProcessor`.
 */
export const deleteStreamProcessor: API.OperationMethod<
  DeleteStreamProcessorRequest,
  DeleteStreamProcessorResponse,
  DeleteStreamProcessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStreamProcessorRequest,
  output: DeleteStreamProcessorResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStreamProcessor",
}));

export type DeleteUserError =
  | AccessDeniedException
  | ConflictException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified UserID within the collection. Faces that are associated with the
 * UserID are disassociated from the UserID before deleting the specified UserID. If the
 * specified `Collection` or `UserID` is already deleted or not found, a
 * `ResourceNotFoundException` will be thrown. If the action is successful with a
 * 200 response, an empty HTTP body is returned.
 */
export const deleteUser: API.OperationMethod<
  DeleteUserRequest,
  DeleteUserResponse,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUserRequest,
  output: DeleteUserResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
}));

export type DescribeCollectionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the specified collection. You can use `DescribeCollection` to get
 * information, such as the number of faces indexed into a collection and the version of the
 * model used by the collection for face detection.
 *
 * For more information, see Describing a Collection in the
 * Amazon Rekognition Developer Guide.
 */
export const describeCollection: API.OperationMethod<
  DescribeCollectionRequest,
  DescribeCollectionResponse,
  DescribeCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCollectionRequest,
  output: DescribeCollectionResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCollection",
}));

export type DescribeDatasetError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Describes an Amazon Rekognition Custom Labels dataset. You can get information such as the current status of a dataset and
 * statistics about the images and labels in a dataset.
 *
 * This operation requires permissions to perform the `rekognition:DescribeDataset` action.
 */
export const describeDataset: API.OperationMethod<
  DescribeDatasetRequest,
  DescribeDatasetResponse,
  DescribeDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDatasetRequest,
  output: DescribeDatasetResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataset",
}));

export type DescribeProjectsError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about your Rekognition projects.
 *
 * This operation requires permissions to perform the `rekognition:DescribeProjects` action.
 */
export const describeProjects: API.PaginatedOperationMethod<
  DescribeProjectsRequest,
  DescribeProjectsResponse,
  DescribeProjectsError,
  Credentials | HttpClient.HttpClient,
  ProjectDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeProjectsRequest,
  output: DescribeProjectsResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProjects",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProjectDescriptions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeProjectVersionsError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists and describes the versions of an Amazon Rekognition project. You can specify up to 10 model or
 * adapter versions in `ProjectVersionArns`. If you don't specify a value,
 * descriptions for all model/adapter versions in the project are returned.
 *
 * This operation requires permissions to perform the `rekognition:DescribeProjectVersions`
 * action.
 */
export const describeProjectVersions: API.PaginatedOperationMethod<
  DescribeProjectVersionsRequest,
  DescribeProjectVersionsResponse,
  DescribeProjectVersionsError,
  Credentials | HttpClient.HttpClient,
  ProjectVersionDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeProjectVersionsRequest,
  output: DescribeProjectVersionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProjectVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProjectVersionDescriptions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeStreamProcessorError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides information about a stream processor created by CreateStreamProcessor. You can get information about the input and output streams, the input parameters for the face recognition being performed,
 * and the current status of the stream processor.
 */
export const describeStreamProcessor: API.OperationMethod<
  DescribeStreamProcessorRequest,
  DescribeStreamProcessorResponse,
  DescribeStreamProcessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeStreamProcessorRequest,
  output: DescribeStreamProcessorResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStreamProcessor",
}));

export type DetectCustomLabelsError =
  | AccessDeniedException
  | ImageTooLargeException
  | InternalServerError
  | InvalidImageFormatException
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Detects custom labels in a supplied image by using an Amazon Rekognition Custom Labels model.
 *
 * You specify which version of a model version to use by using the `ProjectVersionArn` input
 * parameter.
 *
 * You pass the input image as base64-encoded image bytes or as a reference to an image in
 * an Amazon S3 bucket. If you use the AWS CLI to call Amazon Rekognition operations, passing
 * image bytes is not supported. The image must be either a PNG or JPEG formatted file.
 *
 * For each object that the model version detects on an image, the API returns a
 * (`CustomLabel`) object in an array (`CustomLabels`).
 * Each `CustomLabel` object provides the label name (`Name`), the level
 * of confidence that the image contains the object (`Confidence`), and
 * object location information, if it exists, for the label on the image (`Geometry`).
 *
 * To filter labels that are returned, specify a value for `MinConfidence`.
 * `DetectCustomLabelsLabels` only returns labels with a confidence that's higher than
 * the specified value.
 *
 * The value of `MinConfidence` maps to the assumed threshold values
 * created during training. For more information, see *Assumed threshold*
 * in the Amazon Rekognition Custom Labels Developer Guide.
 * Amazon Rekognition Custom Labels metrics expresses an assumed threshold as a floating point value between 0-1. The range of
 * `MinConfidence` normalizes the threshold value to a percentage value (0-100). Confidence
 * responses from `DetectCustomLabels` are also returned as a percentage.
 * You can use `MinConfidence` to change the precision and recall or your model.
 * For more information, see
 * *Analyzing an image* in the Amazon Rekognition Custom Labels Developer Guide.
 *
 * If you don't specify a value for `MinConfidence`, `DetectCustomLabels`
 * returns labels based on the assumed threshold of each label.
 *
 * This is a stateless API operation. That is, the operation does not persist any
 * data.
 *
 * This operation requires permissions to perform the
 * `rekognition:DetectCustomLabels` action.
 *
 * For more information, see
 * *Analyzing an image* in the Amazon Rekognition Custom Labels Developer Guide.
 */
export const detectCustomLabels: API.OperationMethod<
  DetectCustomLabelsRequest,
  DetectCustomLabelsResponse,
  DetectCustomLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DetectCustomLabelsRequest,
  output: DetectCustomLabelsResponse,
  errors: [
    AccessDeniedException,
    ImageTooLargeException,
    InternalServerError,
    InvalidImageFormatException,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectCustomLabels",
}));

export type DetectFacesError =
  | AccessDeniedException
  | ImageTooLargeException
  | InternalServerError
  | InvalidImageFormatException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Detects faces within an image that is provided as input.
 *
 * `DetectFaces` detects the 100 largest faces in the image. For each face
 * detected, the operation returns face details. These details include a bounding box of the
 * face, a confidence value (that the bounding box contains a face), and a fixed set of
 * attributes such as facial landmarks (for example, coordinates of eye and mouth), pose,
 * presence of facial occlusion, and so on.
 *
 * The face-detection algorithm is most effective on frontal faces. For non-frontal or
 * obscured faces, the algorithm might not detect the faces or might detect faces with lower
 * confidence.
 *
 * You pass the input image either as base64-encoded image bytes or as a reference to an
 * image in an Amazon S3 bucket. If you use the AWS CLI to call Amazon Rekognition operations,
 * passing image bytes is not supported. The image must be either a PNG or JPEG formatted file.
 *
 * This is a stateless API operation. That is, the operation does not persist any
 * data.
 *
 * This operation requires permissions to perform the `rekognition:DetectFaces`
 * action.
 */
export const detectFaces: API.OperationMethod<
  DetectFacesRequest,
  DetectFacesResponse,
  DetectFacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DetectFacesRequest,
  output: DetectFacesResponse,
  errors: [
    AccessDeniedException,
    ImageTooLargeException,
    InternalServerError,
    InvalidImageFormatException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectFaces",
}));

export type DetectLabelsError =
  | AccessDeniedException
  | ImageTooLargeException
  | InternalServerError
  | InvalidImageFormatException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Detects instances of real-world entities within an image (JPEG or PNG) provided as
 * input. This includes objects like flower, tree, and table; events like wedding, graduation,
 * and birthday party; and concepts like landscape, evening, and nature.
 *
 * For an example, see Analyzing images stored in an Amazon S3 bucket in the
 * Amazon Rekognition Developer Guide.
 *
 * You pass the input image as base64-encoded image bytes or as a reference to an image in
 * an Amazon S3 bucket. If you use the
 * AWS
 * CLI to call Amazon Rekognition operations, passing image bytes is not
 * supported. The image must be either a PNG or JPEG formatted file.
 *
 * **Optional Parameters**
 *
 * You can specify one or both of the `GENERAL_LABELS` and
 * `IMAGE_PROPERTIES` feature types when calling the DetectLabels API. Including
 * `GENERAL_LABELS` will ensure the response includes the labels detected in the
 * input image, while including `IMAGE_PROPERTIES `will ensure the response includes
 * information about the image quality and color.
 *
 * When using `GENERAL_LABELS` and/or `IMAGE_PROPERTIES` you can
 * provide filtering criteria to the Settings parameter. You can filter with sets of individual
 * labels or with label categories. You can specify inclusive filters, exclusive filters, or a
 * combination of inclusive and exclusive filters. For more information on filtering see Detecting
 * Labels in an Image.
 *
 * When getting labels, you can specify `MinConfidence` to control the
 * confidence threshold for the labels returned. The default is 55%. You can also add the
 * `MaxLabels` parameter to limit the number of labels returned. The default and
 * upper limit is 1000 labels. These arguments are only valid when supplying GENERAL_LABELS as a
 * feature type.
 *
 * **Response Elements**
 *
 * For each object, scene, and concept the API returns one or more labels. The API
 * returns the following types of information about labels:
 *
 * - Name - The name of the detected label.
 *
 * - Confidence - The level of confidence in the label assigned to a detected object.
 *
 * - Parents - The ancestor labels for a detected label. DetectLabels returns a
 * hierarchical taxonomy of detected labels. For example, a detected car might be assigned
 * the label car. The label car has two parent labels: Vehicle (its parent) and
 * Transportation (its grandparent). The response includes the all ancestors for a label,
 * where every ancestor is a unique label. In the previous example, Car, Vehicle, and
 * Transportation are returned as unique labels in the response.
 *
 * - Aliases - Possible Aliases for the label.
 *
 * - Categories - The label categories that the detected label belongs to.
 *
 * - BoundingBox — Bounding boxes are described for all instances of detected common
 * object labels, returned in an array of Instance objects. An Instance object contains a
 * BoundingBox object, describing the location of the label on the input image. It also
 * includes the confidence for the accuracy of the detected bounding box.
 *
 * The API returns the following information regarding the image, as part of the
 * ImageProperties structure:
 *
 * - Quality - Information about the Sharpness, Brightness, and Contrast of the input
 * image, scored between 0 to 100. Image quality is returned for the entire image, as well as
 * the background and the foreground.
 *
 * - Dominant Color - An array of the dominant colors in the image.
 *
 * - Foreground - Information about the sharpness, brightness, and dominant colors of the
 * input image’s foreground.
 *
 * - Background - Information about the sharpness, brightness, and dominant colors of the
 * input image’s background.
 *
 * The list of returned labels will include at least one label for every detected object,
 * along with information about that label. In the following example, suppose the input image has
 * a lighthouse, the sea, and a rock. The response includes all three labels, one for each
 * object, as well as the confidence in the label:
 *
 * `{Name: lighthouse, Confidence: 98.4629}`
 *
 * `{Name: rock,Confidence: 79.2097}`
 *
 * ` {Name: sea,Confidence: 75.061}`
 *
 * The list of labels can include multiple labels for the same object. For example, if the
 * input image shows a flower (for example, a tulip), the operation might return the following
 * three labels.
 *
 * `{Name: flower,Confidence: 99.0562}`
 *
 * `{Name: plant,Confidence: 99.0562}`
 *
 * `{Name: tulip,Confidence: 99.0562}`
 *
 * In this example, the detection algorithm more precisely identifies the flower as a
 * tulip.
 *
 * If the object detected is a person, the operation doesn't provide the same facial
 * details that the DetectFaces operation provides.
 *
 * This is a stateless API operation that doesn't return any data.
 *
 * This operation requires permissions to perform the
 * `rekognition:DetectLabels` action.
 */
export const detectLabels: API.OperationMethod<
  DetectLabelsRequest,
  DetectLabelsResponse,
  DetectLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DetectLabelsRequest,
  output: DetectLabelsResponse,
  errors: [
    AccessDeniedException,
    ImageTooLargeException,
    InternalServerError,
    InvalidImageFormatException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectLabels",
}));

export type DetectModerationLabelsError =
  | AccessDeniedException
  | HumanLoopQuotaExceededException
  | ImageTooLargeException
  | InternalServerError
  | InvalidImageFormatException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | CommonErrors;
/**
 * Detects unsafe content in a specified JPEG or PNG format image. Use
 * `DetectModerationLabels` to moderate images depending on your requirements. For
 * example, you might want to filter images that contain nudity, but not images containing
 * suggestive content.
 *
 * To filter images, use the labels returned by `DetectModerationLabels` to
 * determine which types of content are appropriate.
 *
 * For information about moderation labels, see Detecting Unsafe Content in the
 * Amazon Rekognition Developer Guide.
 *
 * You pass the input image either as base64-encoded image bytes or as a reference to an
 * image in an Amazon S3 bucket. If you use the
 * AWS
 * CLI to call Amazon Rekognition operations, passing image bytes is not
 * supported. The image must be either a PNG or JPEG formatted file.
 *
 * You can specify an adapter to use when retrieving label predictions by providing a
 * `ProjectVersionArn` to the `ProjectVersion` argument.
 */
export const detectModerationLabels: API.OperationMethod<
  DetectModerationLabelsRequest,
  DetectModerationLabelsResponse,
  DetectModerationLabelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DetectModerationLabelsRequest,
  output: DetectModerationLabelsResponse,
  errors: [
    AccessDeniedException,
    HumanLoopQuotaExceededException,
    ImageTooLargeException,
    InternalServerError,
    InvalidImageFormatException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectModerationLabels",
}));

export type DetectProtectiveEquipmentError =
  | AccessDeniedException
  | ImageTooLargeException
  | InternalServerError
  | InvalidImageFormatException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Detects Personal Protective Equipment (PPE) worn by people detected in an image. Amazon Rekognition can detect the
 * following types of PPE.
 *
 * - Face cover
 *
 * - Hand cover
 *
 * - Head cover
 *
 * You pass the input image as base64-encoded image bytes or as a reference to an image in an Amazon S3 bucket.
 * The image must be either a PNG or JPG formatted file.
 *
 * `DetectProtectiveEquipment` detects PPE worn by up to 15 persons detected in an image.
 *
 * For each person detected in the image the API returns an array of body parts (face, head, left-hand, right-hand).
 * For each body part, an array of detected items of PPE is returned, including an indicator of whether or not the PPE
 * covers the body part. The API returns the confidence it has in each detection
 * (person, PPE, body part and body part coverage). It also returns a bounding box (BoundingBox) for each detected
 * person and each detected item of PPE.
 *
 * You can optionally request a summary of detected PPE items with the `SummarizationAttributes` input parameter.
 * The summary provides the following information.
 *
 * - The persons detected as wearing all of the types of PPE that you specify.
 *
 * - The persons detected as not wearing all of the types PPE that you specify.
 *
 * - The persons detected where PPE adornment could not be determined.
 *
 * This is a stateless API operation. That is, the operation does not persist any data.
 *
 * This operation requires permissions to perform the `rekognition:DetectProtectiveEquipment` action.
 */
export const detectProtectiveEquipment: API.OperationMethod<
  DetectProtectiveEquipmentRequest,
  DetectProtectiveEquipmentResponse,
  DetectProtectiveEquipmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DetectProtectiveEquipmentRequest,
  output: DetectProtectiveEquipmentResponse,
  errors: [
    AccessDeniedException,
    ImageTooLargeException,
    InternalServerError,
    InvalidImageFormatException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectProtectiveEquipment",
}));

export type DetectTextError =
  | AccessDeniedException
  | ImageTooLargeException
  | InternalServerError
  | InvalidImageFormatException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Detects text in the input image and converts it into machine-readable text.
 *
 * Pass the input image as base64-encoded image bytes or as a reference to an image in an
 * Amazon S3 bucket. If you use the AWS CLI to call Amazon Rekognition operations, you must pass it as a
 * reference to an image in an Amazon S3 bucket. For the AWS CLI, passing image bytes is not
 * supported. The image must be either a .png or .jpeg formatted file.
 *
 * The `DetectText` operation returns text in an array of TextDetection elements, `TextDetections`. Each
 * `TextDetection` element provides information about a single word or line of text
 * that was detected in the image.
 *
 * A word is one or more script characters that are not separated by spaces.
 * `DetectText` can detect up to 100 words in an image.
 *
 * A line is a string of equally spaced words. A line isn't necessarily a complete
 * sentence. For example, a driver's license number is detected as a line. A line ends when there
 * is no aligned text after it. Also, a line ends when there is a large gap between words,
 * relative to the length of the words. This means, depending on the gap between words, Amazon Rekognition
 * may detect multiple lines in text aligned in the same direction. Periods don't represent the
 * end of a line. If a sentence spans multiple lines, the `DetectText` operation
 * returns multiple lines.
 *
 * To determine whether a `TextDetection` element is a line of text or a word,
 * use the `TextDetection` object `Type` field.
 *
 * To be detected, text must be within +/- 90 degrees orientation of the horizontal
 * axis.
 *
 * For more information, see Detecting text in the Amazon Rekognition Developer
 * Guide.
 */
export const detectText: API.OperationMethod<
  DetectTextRequest,
  DetectTextResponse,
  DetectTextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DetectTextRequest,
  output: DetectTextResponse,
  errors: [
    AccessDeniedException,
    ImageTooLargeException,
    InternalServerError,
    InvalidImageFormatException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectText",
}));

export type DisassociateFacesError =
  | AccessDeniedException
  | ConflictException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the association between a `Face` supplied in an array of
 * `FaceIds` and the User. If the User is not present already, then a
 * `ResourceNotFound` exception is thrown. If successful, an array of faces that are
 * disassociated from the User is returned. If a given face is already disassociated from the
 * given UserID, it will be ignored and not be returned in the response. If a given face is
 * already associated with a different User or not found in the collection it will be returned as
 * part of `UnsuccessfulDisassociations`. You can remove 1 - 100 face IDs from a user
 * at one time.
 */
export const disassociateFaces: API.OperationMethod<
  DisassociateFacesRequest,
  DisassociateFacesResponse,
  DisassociateFacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateFacesRequest,
  output: DisassociateFacesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFaces",
}));

export type DistributeDatasetEntriesError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Distributes the entries (images) in a training dataset across the training dataset and the test dataset for a project.
 * `DistributeDatasetEntries` moves 20% of the training dataset images to the test dataset.
 * An entry is a JSON Line that describes an image.
 *
 * You supply the Amazon Resource Names (ARN) of a project's training dataset and test dataset.
 * The training dataset must contain the images that you want to split. The test dataset
 * must be empty. The datasets must belong to the same project. To create training and test datasets for a project, call CreateDataset.
 *
 * Distributing a dataset takes a while to complete. To check the status call `DescribeDataset`. The operation
 * is complete when the `Status` field for the training dataset and the test dataset is `UPDATE_COMPLETE`.
 * If the dataset split fails, the value of `Status` is `UPDATE_FAILED`.
 *
 * This operation requires permissions to perform the `rekognition:DistributeDatasetEntries` action.
 */
export const distributeDatasetEntries: API.OperationMethod<
  DistributeDatasetEntriesRequest,
  DistributeDatasetEntriesResponse,
  DistributeDatasetEntriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DistributeDatasetEntriesRequest,
  output: DistributeDatasetEntriesResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DistributeDatasetEntries",
}));

export type GetCelebrityInfoError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the name and additional information about a celebrity based on their Amazon Rekognition ID.
 * The additional information is returned as an array of URLs. If there is no additional
 * information about the celebrity, this list is empty.
 *
 * For more information, see Getting information about a celebrity in the
 * Amazon Rekognition Developer Guide.
 *
 * This operation requires permissions to perform the
 * `rekognition:GetCelebrityInfo` action.
 */
export const getCelebrityInfo: API.OperationMethod<
  GetCelebrityInfoRequest,
  GetCelebrityInfoResponse,
  GetCelebrityInfoError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCelebrityInfoRequest,
  output: GetCelebrityInfoResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCelebrityInfo",
}));

export type GetCelebrityRecognitionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the celebrity recognition results for a Amazon Rekognition Video analysis started by
 * StartCelebrityRecognition.
 *
 * Celebrity recognition in a video is an asynchronous operation. Analysis is started by a
 * call to StartCelebrityRecognition which returns a job identifier
 * (`JobId`).
 *
 * When the celebrity recognition operation finishes, Amazon Rekognition Video publishes a completion
 * status to the Amazon Simple Notification Service topic registered in the initial call to
 * `StartCelebrityRecognition`. To get the results of the celebrity recognition
 * analysis, first check that the status value published to the Amazon SNS topic is
 * `SUCCEEDED`. If so, call `GetCelebrityDetection` and pass the job
 * identifier (`JobId`) from the initial call to `StartCelebrityDetection`.
 *
 * For more information, see Working With Stored Videos in the Amazon Rekognition Developer Guide.
 *
 * `GetCelebrityRecognition` returns detected celebrities and the time(s) they
 * are detected in an array (`Celebrities`) of CelebrityRecognition
 * objects. Each `CelebrityRecognition`
 * contains information about the celebrity in a CelebrityDetail object and the
 * time, `Timestamp`, the celebrity was detected. This CelebrityDetail object stores information about the detected celebrity's face
 * attributes, a face bounding box, known gender, the celebrity's name, and a confidence
 * estimate.
 *
 * `GetCelebrityRecognition` only returns the default facial
 * attributes (`BoundingBox`, `Confidence`, `Landmarks`,
 * `Pose`, and `Quality`). The `BoundingBox` field only
 * applies to the detected face instance. The other facial attributes listed in the
 * `Face` object of the following response syntax are not returned. For more
 * information, see FaceDetail in the Amazon Rekognition Developer Guide.
 *
 * By default, the `Celebrities` array is sorted by time (milliseconds from the start of the video).
 * You can also sort the array by celebrity by specifying the value `ID` in the `SortBy` input parameter.
 *
 * The `CelebrityDetail` object includes the celebrity identifer and additional information urls. If you don't store
 * the additional information urls, you can get them later by calling GetCelebrityInfo with the celebrity identifer.
 *
 * No information is returned for faces not recognized as celebrities.
 *
 * Use MaxResults parameter to limit the number of labels returned. If there are more results than
 * specified in `MaxResults`, the value of `NextToken` in the operation response contains a
 * pagination token for getting the next set of results. To get the next page of results, call `GetCelebrityDetection`
 * and populate the `NextToken` request parameter with the token
 * value returned from the previous call to `GetCelebrityRecognition`.
 */
export const getCelebrityRecognition: API.PaginatedOperationMethod<
  GetCelebrityRecognitionRequest,
  GetCelebrityRecognitionResponse,
  GetCelebrityRecognitionError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetCelebrityRecognitionRequest,
  output: GetCelebrityRecognitionResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCelebrityRecognition",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetContentModerationError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the inappropriate, unwanted, or offensive content analysis results for a Amazon Rekognition Video analysis started by
 * StartContentModeration. For a list of moderation labels in Amazon Rekognition, see
 * Using the image and video moderation APIs.
 *
 * Amazon Rekognition Video inappropriate or offensive content detection in a stored video is an asynchronous operation. You start analysis by calling
 * StartContentModeration which returns a job identifier (`JobId`).
 * When analysis finishes, Amazon Rekognition Video publishes a completion status to the Amazon Simple Notification Service
 * topic registered in the initial call to `StartContentModeration`.
 * To get the results of the content analysis, first check that the status value published to the Amazon SNS
 * topic is `SUCCEEDED`. If so, call `GetContentModeration` and pass the job identifier
 * (`JobId`) from the initial call to `StartContentModeration`.
 *
 * For more information, see Working with Stored Videos in the
 * Amazon Rekognition Devlopers Guide.
 *
 * `GetContentModeration` returns detected inappropriate, unwanted, or offensive content moderation labels,
 * and the time they are detected, in an array, `ModerationLabels`, of
 * ContentModerationDetection objects.
 *
 * By default, the moderated labels are returned sorted by time, in milliseconds from the start of the
 * video. You can also sort them by moderated label by specifying `NAME` for the `SortBy`
 * input parameter.
 *
 * Since video analysis can return a large number of results, use the `MaxResults` parameter to limit
 * the number of labels returned in a single call to `GetContentModeration`. If there are more results than
 * specified in `MaxResults`, the value of `NextToken` in the operation response contains a
 * pagination token for getting the next set of results. To get the next page of results, call `GetContentModeration`
 * and populate the `NextToken` request parameter with the value of `NextToken`
 * returned from the previous call to `GetContentModeration`.
 *
 * For more information, see moderating content in the Amazon Rekognition Developer Guide.
 */
export const getContentModeration: API.PaginatedOperationMethod<
  GetContentModerationRequest,
  GetContentModerationResponse,
  GetContentModerationError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetContentModerationRequest,
  output: GetContentModerationResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContentModeration",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetFaceDetectionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets face detection results for a Amazon Rekognition Video analysis started by StartFaceDetection.
 *
 * Face detection with Amazon Rekognition Video is an asynchronous operation. You start face detection by calling StartFaceDetection
 * which returns a job identifier (`JobId`). When the face detection operation finishes, Amazon Rekognition Video publishes a completion status to
 * the Amazon Simple Notification Service topic registered in the initial call to `StartFaceDetection`. To get the results
 * of the face detection operation, first check that the status value published to the Amazon SNS topic is `SUCCEEDED`.
 * If so, call GetFaceDetection and pass the job identifier
 * (`JobId`) from the initial call to `StartFaceDetection`.
 *
 * `GetFaceDetection` returns an array of detected faces (`Faces`) sorted by the time the faces were detected.
 *
 * Use MaxResults parameter to limit the number of labels returned. If there are more results than
 * specified in `MaxResults`, the value of `NextToken` in the operation response contains a pagination token for getting the next set
 * of results. To get the next page of results, call `GetFaceDetection` and populate the `NextToken` request parameter with the token
 * value returned from the previous call to `GetFaceDetection`.
 *
 * Note that for the `GetFaceDetection` operation, the returned values for
 * `FaceOccluded` and `EyeDirection` will always be "null".
 */
export const getFaceDetection: API.PaginatedOperationMethod<
  GetFaceDetectionRequest,
  GetFaceDetectionResponse,
  GetFaceDetectionError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetFaceDetectionRequest,
  output: GetFaceDetectionResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFaceDetection",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetFaceLivenessSessionResultsError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | SessionNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the results of a specific Face Liveness session. It requires the
 * `sessionId` as input, which was created using
 * `CreateFaceLivenessSession`. Returns the corresponding Face Liveness confidence
 * score, a reference image that includes a face bounding box, and audit images that also contain
 * face bounding boxes. The Face Liveness confidence score ranges from 0 to 100.
 *
 * The number of audit images returned by `GetFaceLivenessSessionResults` is
 * defined by the `AuditImagesLimit` paramater when calling
 * `CreateFaceLivenessSession`. Reference images are always returned when
 * possible.
 */
export const getFaceLivenessSessionResults: API.OperationMethod<
  GetFaceLivenessSessionResultsRequest,
  GetFaceLivenessSessionResultsResponse,
  GetFaceLivenessSessionResultsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFaceLivenessSessionResultsRequest,
  output: GetFaceLivenessSessionResultsResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    SessionNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFaceLivenessSessionResults",
}));

export type GetFaceSearchError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the face search results for Amazon Rekognition Video face search started by
 * StartFaceSearch. The search returns faces in a collection that match the faces
 * of persons detected in a video. It also includes the time(s) that faces are matched in the video.
 *
 * Face search in a video is an asynchronous operation. You start face search by calling
 * to StartFaceSearch which returns a job identifier (`JobId`).
 * When the search operation finishes, Amazon Rekognition Video publishes a completion status to the Amazon Simple Notification Service
 * topic registered in the initial call to `StartFaceSearch`.
 * To get the search results, first check that the status value published to the Amazon SNS
 * topic is `SUCCEEDED`. If so, call `GetFaceSearch` and pass the job identifier
 * (`JobId`) from the initial call to `StartFaceSearch`.
 *
 * For more information, see Searching Faces in a Collection in the
 * Amazon Rekognition Developer Guide.
 *
 * The search results are retured in an array, `Persons`, of
 * PersonMatch objects. Each`PersonMatch` element contains
 * details about the matching faces in the input collection, person information (facial attributes,
 * bounding boxes, and person identifer)
 * for the matched person, and the time the person was matched in the video.
 *
 * `GetFaceSearch` only returns the default
 * facial attributes (`BoundingBox`, `Confidence`,
 * `Landmarks`, `Pose`, and `Quality`). The other facial attributes listed
 * in the `Face` object of the following response syntax are not returned. For more information,
 * see FaceDetail in the Amazon Rekognition Developer Guide.
 *
 * By default, the `Persons` array is sorted by the time, in milliseconds from the
 * start of the video, persons are matched.
 * You can also sort by persons by specifying `INDEX` for the `SORTBY` input
 * parameter.
 */
export const getFaceSearch: API.PaginatedOperationMethod<
  GetFaceSearchRequest,
  GetFaceSearchResponse,
  GetFaceSearchError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetFaceSearchRequest,
  output: GetFaceSearchResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFaceSearch",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetLabelDetectionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the label detection results of a Amazon Rekognition Video analysis started by StartLabelDetection.
 *
 * The label detection operation is started by a call to StartLabelDetection which returns a job identifier (`JobId`). When
 * the label detection operation finishes, Amazon Rekognition publishes a completion status to the
 * Amazon Simple Notification Service topic registered in the initial call to `StartlabelDetection`.
 *
 * To get the results of the label detection operation, first check that the status value
 * published to the Amazon SNS topic is `SUCCEEDED`. If so, call GetLabelDetection and pass the job identifier (`JobId`) from the
 * initial call to `StartLabelDetection`.
 *
 * `GetLabelDetection` returns an array of detected labels
 * (`Labels`) sorted by the time the labels were detected. You can also sort by the
 * label name by specifying `NAME` for the `SortBy` input parameter. If
 * there is no `NAME` specified, the default sort is by
 * timestamp.
 *
 * You can select how results are aggregated by using the `AggregateBy` input
 * parameter. The default aggregation method is `TIMESTAMPS`. You can also aggregate
 * by `SEGMENTS`, which aggregates all instances of labels detected in a given
 * segment.
 *
 * The returned Labels array may include the following attributes:
 *
 * - Name - The name of the detected label.
 *
 * - Confidence - The level of confidence in the label assigned to a detected object.
 *
 * - Parents - The ancestor labels for a detected label. GetLabelDetection returns a hierarchical
 * taxonomy of detected labels. For example, a detected car might be assigned the label car.
 * The label car has two parent labels: Vehicle (its parent) and Transportation (its
 * grandparent). The response includes the all ancestors for a label, where every ancestor is
 * a unique label. In the previous example, Car, Vehicle, and Transportation are returned as
 * unique labels in the response.
 *
 * - Aliases - Possible Aliases for the label.
 *
 * - Categories - The label categories that the detected label belongs to.
 *
 * - BoundingBox — Bounding boxes are described for all instances of detected common object labels,
 * returned in an array of Instance objects. An Instance object contains a BoundingBox object, describing
 * the location of the label on the input image. It also includes the confidence for the accuracy of the detected bounding box.
 *
 * - Timestamp - Time, in milliseconds from the start of the video, that the label was detected.
 * For aggregation by `SEGMENTS`, the `StartTimestampMillis`,
 * `EndTimestampMillis`, and `DurationMillis` structures are what
 * define a segment. Although the “Timestamp” structure is still returned with each label,
 * its value is set to be the same as `StartTimestampMillis`.
 *
 * Timestamp and Bounding box information are returned for detected Instances, only if
 * aggregation is done by `TIMESTAMPS`. If aggregating by `SEGMENTS`,
 * information about detected instances isn’t returned.
 *
 * The version of the label model used for the detection is also returned.
 *
 * Note `DominantColors` isn't returned for `Instances`,
 * although it is shown as part of the response in the sample seen below.
 *
 * Use `MaxResults` parameter to limit the number of labels returned. If
 * there are more results than specified in `MaxResults`, the value of
 * `NextToken` in the operation response contains a pagination token for getting the
 * next set of results. To get the next page of results, call `GetlabelDetection` and
 * populate the `NextToken` request parameter with the token value returned from the
 * previous call to `GetLabelDetection`.
 *
 * If you are retrieving results while using the Amazon Simple Notification Service, note that you will receive an
 * "ERROR" notification if the job encounters an issue.
 */
export const getLabelDetection: API.PaginatedOperationMethod<
  GetLabelDetectionRequest,
  GetLabelDetectionResponse,
  GetLabelDetectionError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetLabelDetectionRequest,
  output: GetLabelDetectionResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLabelDetection",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetMediaAnalysisJobError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the results for a given media analysis job.
 * Takes a `JobId` returned by StartMediaAnalysisJob.
 */
export const getMediaAnalysisJob: API.OperationMethod<
  GetMediaAnalysisJobRequest,
  GetMediaAnalysisJobResponse,
  GetMediaAnalysisJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMediaAnalysisJobRequest,
  output: GetMediaAnalysisJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMediaAnalysisJob",
}));

export type GetPersonTrackingError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * *End of support notice:* On October 31, 2025, AWS will discontinue
 * support for Amazon Rekognition People Pathing. After October 31, 2025, you will no
 * longer be able to use the Rekognition People Pathing capability. For more information,
 * visit this blog post.
 *
 * Gets the path tracking results of a Amazon Rekognition Video analysis started by StartPersonTracking.
 *
 * The person path tracking operation is started by a call to `StartPersonTracking`
 * which returns a job identifier (`JobId`). When the operation finishes, Amazon Rekognition Video publishes a completion status to
 * the Amazon Simple Notification Service topic registered in the initial call to `StartPersonTracking`.
 *
 * To get the results of the person path tracking operation, first check
 * that the status value published to the Amazon SNS topic is `SUCCEEDED`.
 * If so, call GetPersonTracking and pass the job identifier
 * (`JobId`) from the initial call to `StartPersonTracking`.
 *
 * `GetPersonTracking` returns an array, `Persons`, of tracked persons and the time(s) their
 * paths were tracked in the video.
 *
 * `GetPersonTracking` only returns the default
 * facial attributes (`BoundingBox`, `Confidence`,
 * `Landmarks`, `Pose`, and `Quality`). The other facial attributes listed
 * in the `Face` object of the following response syntax are not returned.
 *
 * For more information, see FaceDetail in the Amazon Rekognition Developer Guide.
 *
 * By default, the array is sorted by the time(s) a person's path is tracked in the video.
 * You can sort by tracked persons by specifying `INDEX` for the `SortBy` input parameter.
 *
 * Use the `MaxResults` parameter to limit the number of items returned. If there are more results than
 * specified in `MaxResults`, the value of `NextToken` in the operation response contains a pagination token for getting the next set
 * of results. To get the next page of results, call `GetPersonTracking` and populate the `NextToken` request parameter with the token
 * value returned from the previous call to `GetPersonTracking`.
 */
export const getPersonTracking: API.PaginatedOperationMethod<
  GetPersonTrackingRequest,
  GetPersonTrackingResponse,
  GetPersonTrackingError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetPersonTrackingRequest,
  output: GetPersonTrackingResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPersonTracking",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetSegmentDetectionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the segment detection results of a Amazon Rekognition Video analysis started by StartSegmentDetection.
 *
 * Segment detection with Amazon Rekognition Video is an asynchronous operation. You start segment detection by
 * calling StartSegmentDetection which returns a job identifier (`JobId`).
 * When the segment detection operation finishes, Amazon Rekognition publishes a completion status to the Amazon Simple Notification Service
 * topic registered in the initial call to `StartSegmentDetection`. To get the results
 * of the segment detection operation, first check that the status value published to the Amazon SNS topic is `SUCCEEDED`.
 * if so, call `GetSegmentDetection` and pass the job identifier (`JobId`) from the initial call
 * of `StartSegmentDetection`.
 *
 * `GetSegmentDetection` returns detected segments in an array (`Segments`)
 * of SegmentDetection objects. `Segments` is sorted by the segment types
 * specified in the `SegmentTypes` input parameter of `StartSegmentDetection`.
 * Each element of the array includes the detected segment, the precentage confidence in the acuracy
 * of the detected segment, the type of the segment, and the frame in which the segment was detected.
 *
 * Use `SelectedSegmentTypes` to find out the type of segment detection requested in the
 * call to `StartSegmentDetection`.
 *
 * Use the `MaxResults` parameter to limit the number of segment detections returned. If there are more results than
 * specified in `MaxResults`, the value of `NextToken` in the operation response contains
 * a pagination token for getting the next set of results. To get the next page of results, call `GetSegmentDetection`
 * and populate the `NextToken` request parameter with the token value returned from the previous
 * call to `GetSegmentDetection`.
 *
 * For more information, see Detecting video segments in stored video in the Amazon Rekognition Developer Guide.
 */
export const getSegmentDetection: API.PaginatedOperationMethod<
  GetSegmentDetectionRequest,
  GetSegmentDetectionResponse,
  GetSegmentDetectionError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetSegmentDetectionRequest,
  output: GetSegmentDetectionResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSegmentDetection",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetTextDetectionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the text detection results of a Amazon Rekognition Video analysis started by StartTextDetection.
 *
 * Text detection with Amazon Rekognition Video is an asynchronous operation. You start text detection by
 * calling StartTextDetection which returns a job identifier (`JobId`)
 * When the text detection operation finishes, Amazon Rekognition publishes a completion status to the Amazon Simple Notification Service
 * topic registered in the initial call to `StartTextDetection`. To get the results
 * of the text detection operation, first check that the status value published to the Amazon SNS topic is `SUCCEEDED`.
 * if so, call `GetTextDetection` and pass the job identifier (`JobId`) from the initial call
 * of `StartLabelDetection`.
 *
 * `GetTextDetection` returns an array of detected text (`TextDetections`) sorted by
 * the time the text was detected, up to 100 words per frame of video.
 *
 * Each element of the array includes the detected text, the precentage confidence in the acuracy
 * of the detected text, the time the text was detected, bounding box information for where the text
 * was located, and unique identifiers for words and their lines.
 *
 * Use MaxResults parameter to limit the number of text detections returned. If there are more results than
 * specified in `MaxResults`, the value of `NextToken` in the operation response contains
 * a pagination token for getting the next set of results. To get the next page of results, call `GetTextDetection`
 * and populate the `NextToken` request parameter with the token value returned from the previous
 * call to `GetTextDetection`.
 */
export const getTextDetection: API.PaginatedOperationMethod<
  GetTextDetectionRequest,
  GetTextDetectionResponse,
  GetTextDetectionError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetTextDetectionRequest,
  output: GetTextDetectionResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTextDetection",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type IndexFacesError =
  | AccessDeniedException
  | ImageTooLargeException
  | InternalServerError
  | InvalidImageFormatException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Detects faces in the input image and adds them to the specified collection.
 *
 * Amazon Rekognition doesn't save the actual faces that are detected. Instead, the underlying
 * detection algorithm first detects the faces in the input image. For each face, the algorithm
 * extracts facial features into a feature vector, and stores it in the backend database.
 * Amazon Rekognition uses feature vectors when it performs face match and search operations using the
 * SearchFaces and SearchFacesByImage operations.
 *
 * For more information, see Adding faces to a collection in the Amazon Rekognition
 * Developer Guide.
 *
 * To get the number of faces in a collection, call DescribeCollection.
 *
 * If you're using version 1.0 of the face detection model, `IndexFaces`
 * indexes the 15 largest faces in the input image. Later versions of the face detection model
 * index the 100 largest faces in the input image.
 *
 * If you're using version 4 or later of the face model, image orientation information is not
 * returned in the `OrientationCorrection` field.
 *
 * To determine which version of the model you're using, call DescribeCollection and supply the collection ID. You can also get the model
 * version from the value of `FaceModelVersion` in the response from
 * `IndexFaces`
 *
 * For more information, see Model Versioning in the Amazon Rekognition Developer
 * Guide.
 *
 * If you provide the optional `ExternalImageId` for the input image you
 * provided, Amazon Rekognition associates this ID with all faces that it detects. When you call the ListFaces operation, the response returns the external ID. You can use this
 * external image ID to create a client-side index to associate the faces with each image. You
 * can then use the index to find all faces in an image.
 *
 * You can specify the maximum number of faces to index with the `MaxFaces` input
 * parameter. This is useful when you want to index the largest faces in an image and don't want
 * to index smaller faces, such as those belonging to people standing in the background.
 *
 * The `QualityFilter` input parameter allows you to filter out detected faces
 * that don’t meet a required quality bar. The quality bar is based on a variety of common use
 * cases. By default, `IndexFaces` chooses the quality bar that's used to filter
 * faces. You can also explicitly choose the quality bar. Use `QualityFilter`, to set
 * the quality bar by specifying `LOW`, `MEDIUM`, or `HIGH`. If
 * you do not want to filter detected faces, specify `NONE`.
 *
 * To use quality filtering, you need a collection associated with version 3 of the face
 * model or higher. To get the version of the face model associated with a collection, call
 * DescribeCollection.
 *
 * Information about faces detected in an image, but not indexed, is returned in an array of
 * UnindexedFace objects, `UnindexedFaces`. Faces aren't indexed
 * for reasons such as:
 *
 * - The number of faces detected exceeds the value of the `MaxFaces` request
 * parameter.
 *
 * - The face is too small compared to the image dimensions.
 *
 * - The face is too blurry.
 *
 * - The image is too dark.
 *
 * - The face has an extreme pose.
 *
 * - The face doesn’t have enough detail to be suitable for face search.
 *
 * In response, the `IndexFaces` operation returns an array of metadata for all
 * detected faces, `FaceRecords`. This includes:
 *
 * - The bounding box, `BoundingBox`, of the detected face.
 *
 * - A confidence value, `Confidence`, which indicates the confidence that the
 * bounding box contains a face.
 *
 * - A face ID, `FaceId`, assigned by the service for each face that's detected
 * and stored.
 *
 * - An image ID, `ImageId`, assigned by the service for the input image.
 *
 * If you request `ALL` or specific facial attributes (e.g.,
 * `FACE_OCCLUDED`) by using the detectionAttributes parameter, Amazon Rekognition
 * returns detailed facial attributes, such as facial landmarks (for example, location of eye and
 * mouth), facial occlusion, and other facial attributes.
 *
 * If you provide the same image, specify the same collection, and use the same external ID
 * in the `IndexFaces` operation, Amazon Rekognition doesn't save duplicate face
 * metadata.
 *
 * The input image is passed either as base64-encoded image bytes, or as a reference to an
 * image in an Amazon S3 bucket. If you use the AWS CLI to call Amazon Rekognition operations,
 * passing image bytes isn't supported. The image must be formatted as a PNG or JPEG file.
 *
 * This operation requires permissions to perform the `rekognition:IndexFaces`
 * action.
 */
export const indexFaces: API.OperationMethod<
  IndexFacesRequest,
  IndexFacesResponse,
  IndexFacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: IndexFacesRequest,
  output: IndexFacesResponse,
  errors: [
    AccessDeniedException,
    ImageTooLargeException,
    InternalServerError,
    InvalidImageFormatException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IndexFaces",
}));

export type ListCollectionsError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns list of collection IDs in your account. If the result is truncated, the
 * response also provides a `NextToken` that you can use in the subsequent request to
 * fetch the next set of collection IDs.
 *
 * For an example, see Listing collections in the Amazon Rekognition Developer
 * Guide.
 *
 * This operation requires permissions to perform the
 * `rekognition:ListCollections` action.
 */
export const listCollections: API.PaginatedOperationMethod<
  ListCollectionsRequest,
  ListCollectionsResponse,
  ListCollectionsError,
  Credentials | HttpClient.HttpClient,
  CollectionId
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCollectionsRequest,
  output: ListCollectionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCollections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CollectionIds",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDatasetEntriesError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Lists the entries (images) within a dataset. An entry is a
 * JSON Line that contains the information for a single image, including
 * the image location, assigned labels, and object location bounding boxes. For
 * more information, see Creating a manifest file.
 *
 * JSON Lines in the response include information about non-terminal
 * errors found in the dataset.
 * Non terminal errors are reported in `errors` lists within each JSON Line. The
 * same information is reported in the training and testing validation result manifests that
 * Amazon Rekognition Custom Labels creates during model training.
 *
 * You can filter the response in variety of ways, such as choosing which labels to return and returning JSON Lines created after a specific date.
 *
 * This operation requires permissions to perform the `rekognition:ListDatasetEntries` action.
 */
export const listDatasetEntries: API.PaginatedOperationMethod<
  ListDatasetEntriesRequest,
  ListDatasetEntriesResponse,
  ListDatasetEntriesError,
  Credentials | HttpClient.HttpClient,
  DatasetEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDatasetEntriesRequest,
  output: ListDatasetEntriesResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasetEntries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DatasetEntries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDatasetLabelsError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Lists the labels in a dataset. Amazon Rekognition Custom Labels uses labels to describe images. For more information, see
 * Labeling images.
 *
 * Lists the labels in a dataset. Amazon Rekognition Custom Labels uses labels to describe images. For more information, see Labeling images
 * in the *Amazon Rekognition Custom Labels Developer Guide*.
 */
export const listDatasetLabels: API.PaginatedOperationMethod<
  ListDatasetLabelsRequest,
  ListDatasetLabelsResponse,
  ListDatasetLabelsError,
  Credentials | HttpClient.HttpClient,
  DatasetLabelDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDatasetLabelsRequest,
  output: ListDatasetLabelsResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasetLabels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DatasetLabelDescriptions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFacesError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns metadata for faces in the specified collection. This metadata
 * includes information such as the bounding box coordinates, the confidence (that the bounding
 * box contains a face), and face ID. For an example, see Listing Faces in a Collection in the
 * Amazon Rekognition Developer Guide.
 *
 * This operation requires permissions to perform the `rekognition:ListFaces`
 * action.
 */
export const listFaces: API.PaginatedOperationMethod<
  ListFacesRequest,
  ListFacesResponse,
  ListFacesError,
  Credentials | HttpClient.HttpClient,
  Face
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFacesRequest,
  output: ListFacesResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFaces",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Faces",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMediaAnalysisJobsError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of media analysis jobs. Results are sorted by `CreationTimestamp` in descending order.
 */
export const listMediaAnalysisJobs: API.PaginatedOperationMethod<
  ListMediaAnalysisJobsRequest,
  ListMediaAnalysisJobsResponse,
  ListMediaAnalysisJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMediaAnalysisJobsRequest,
  output: ListMediaAnalysisJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMediaAnalysisJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProjectPoliciesError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Gets a list of the project policies attached to a project.
 *
 * To attach a project policy to a project, call PutProjectPolicy. To remove a project policy from a project, call DeleteProjectPolicy.
 *
 * This operation requires permissions to perform the `rekognition:ListProjectPolicies` action.
 */
export const listProjectPolicies: API.PaginatedOperationMethod<
  ListProjectPoliciesRequest,
  ListProjectPoliciesResponse,
  ListProjectPoliciesError,
  Credentials | HttpClient.HttpClient,
  ProjectPolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProjectPoliciesRequest,
  output: ListProjectPoliciesResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProjectPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProjectPolicies",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStreamProcessorsError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets a list of stream processors that you have created with CreateStreamProcessor.
 */
export const listStreamProcessors: API.PaginatedOperationMethod<
  ListStreamProcessorsRequest,
  ListStreamProcessorsResponse,
  ListStreamProcessorsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStreamProcessorsRequest,
  output: ListStreamProcessorsResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreamProcessors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of tags in an Amazon Rekognition collection, stream processor, or Custom Labels
 * model.
 *
 * This operation requires permissions to perform the
 * `rekognition:ListTagsForResource` action.
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
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListUsersError =
  | AccessDeniedException
  | InternalServerError
  | InvalidPaginationTokenException
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns metadata of the User such as `UserID` in the specified collection.
 * Anonymous User (to reserve faces without any identity) is not returned as part of this
 * request. The results are sorted by system generated primary key ID. If the response is
 * truncated, `NextToken` is returned in the response that can be used in the
 * subsequent request to retrieve the next set of identities.
 */
export const listUsers: API.PaginatedOperationMethod<
  ListUsersRequest,
  ListUsersResponse,
  ListUsersError,
  Credentials | HttpClient.HttpClient,
  User
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListUsersRequest,
  output: ListUsersResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidPaginationTokenException,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Users",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutProjectPolicyError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | InvalidPolicyRevisionIdException
  | LimitExceededException
  | MalformedPolicyDocumentException
  | ProvisionedThroughputExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Attaches a project policy to a Amazon Rekognition Custom Labels project in a trusting AWS account. A
 * project policy specifies that a trusted AWS account can copy a model version from a
 * trusting AWS account to a project in the trusted AWS account. To copy a model version
 * you use the CopyProjectVersion operation. Only applies to Custom Labels
 * projects.
 *
 * For more information about the format of a project policy document, see Attaching a project policy (SDK)
 * in the *Amazon Rekognition Custom Labels Developer Guide*.
 *
 * The response from `PutProjectPolicy` is a revision ID for the project policy.
 * You can attach multiple project policies to a project. You can also update an existing
 * project policy by specifying the policy revision ID of the existing policy.
 *
 * To remove a project policy from a project, call DeleteProjectPolicy.
 * To get a list of project policies attached to a project, call ListProjectPolicies.
 *
 * You copy a model version by calling CopyProjectVersion.
 *
 * This operation requires permissions to perform the `rekognition:PutProjectPolicy` action.
 */
export const putProjectPolicy: API.OperationMethod<
  PutProjectPolicyRequest,
  PutProjectPolicyResponse,
  PutProjectPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutProjectPolicyRequest,
  output: PutProjectPolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    InvalidPolicyRevisionIdException,
    LimitExceededException,
    MalformedPolicyDocumentException,
    ProvisionedThroughputExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutProjectPolicy",
}));

export type RecognizeCelebritiesError =
  | AccessDeniedException
  | ImageTooLargeException
  | InternalServerError
  | InvalidImageFormatException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns an array of celebrities recognized in the input image. For more
 * information, see Recognizing celebrities in the Amazon Rekognition Developer Guide.
 *
 * `RecognizeCelebrities` returns the 64 largest faces in the image. It lists
 * the recognized celebrities in the `CelebrityFaces` array and any unrecognized faces
 * in the `UnrecognizedFaces` array. `RecognizeCelebrities` doesn't return
 * celebrities whose faces aren't among the largest 64 faces in the image.
 *
 * For each celebrity recognized, `RecognizeCelebrities` returns a
 * `Celebrity` object. The `Celebrity` object contains the celebrity
 * name, ID, URL links to additional information, match confidence, and a
 * `ComparedFace` object that you can use to locate the celebrity's face on the
 * image.
 *
 * Amazon Rekognition doesn't retain information about which images a celebrity has been recognized
 * in. Your application must store this information and use the `Celebrity` ID
 * property as a unique identifier for the celebrity. If you don't store the celebrity name or
 * additional information URLs returned by `RecognizeCelebrities`, you will need the
 * ID to identify the celebrity in a call to the GetCelebrityInfo
 * operation.
 *
 * You pass the input image either as base64-encoded image bytes or as a reference to an
 * image in an Amazon S3 bucket. If you use the
 * AWS
 * CLI to call Amazon Rekognition operations, passing image bytes is not
 * supported. The image must be either a PNG or JPEG formatted file.
 *
 * For an example, see Recognizing celebrities in an image in the Amazon Rekognition
 * Developer Guide.
 *
 * This operation requires permissions to perform the
 * `rekognition:RecognizeCelebrities` operation.
 */
export const recognizeCelebrities: API.OperationMethod<
  RecognizeCelebritiesRequest,
  RecognizeCelebritiesResponse,
  RecognizeCelebritiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RecognizeCelebritiesRequest,
  output: RecognizeCelebritiesResponse,
  errors: [
    AccessDeniedException,
    ImageTooLargeException,
    InternalServerError,
    InvalidImageFormatException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RecognizeCelebrities",
}));

export type SearchFacesError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * For a given input face ID, searches for matching faces in the collection the face
 * belongs to. You get a face ID when you add a face to the collection using the IndexFaces operation. The operation compares the features of the input face with
 * faces in the specified collection.
 *
 * You can also search faces without indexing faces by using the
 * `SearchFacesByImage` operation.
 *
 * The operation response returns an array of faces that match, ordered by similarity
 * score with the highest similarity first. More specifically, it is an array of metadata for
 * each face match that is found. Along with the metadata, the response also includes a
 * `confidence` value for each face match, indicating the confidence that the
 * specific face matches the input face.
 *
 * For an example, see Searching for a face using its face ID in the Amazon Rekognition
 * Developer Guide.
 *
 * This operation requires permissions to perform the `rekognition:SearchFaces`
 * action.
 */
export const searchFaces: API.OperationMethod<
  SearchFacesRequest,
  SearchFacesResponse,
  SearchFacesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SearchFacesRequest,
  output: SearchFacesResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchFaces",
}));

export type SearchFacesByImageError =
  | AccessDeniedException
  | ImageTooLargeException
  | InternalServerError
  | InvalidImageFormatException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * For a given input image, first detects the largest face in the image, and then searches
 * the specified collection for matching faces. The operation compares the features of the input
 * face with faces in the specified collection.
 *
 * To search for all faces in an input image, you might first call the IndexFaces operation, and then use the face IDs returned in subsequent calls
 * to the SearchFaces operation.
 *
 * You can also call the `DetectFaces` operation and use the bounding boxes
 * in the response to make face crops, which then you can pass in to the
 * `SearchFacesByImage` operation.
 *
 * You pass the input image either as base64-encoded image bytes or as a reference to an
 * image in an Amazon S3 bucket. If you use the
 * AWS
 * CLI to call Amazon Rekognition operations, passing image bytes is not
 * supported. The image must be either a PNG or JPEG formatted file.
 *
 * The response returns an array of faces that match, ordered by similarity score with
 * the highest similarity first. More specifically, it is an array of metadata for each face
 * match found. Along with the metadata, the response also includes a `similarity`
 * indicating how similar the face is to the input face. In the response, the operation also
 * returns the bounding box (and a confidence level that the bounding box contains a face) of the
 * face that Amazon Rekognition used for the input image.
 *
 * If no faces are detected in the input image, `SearchFacesByImage` returns an
 * `InvalidParameterException` error.
 *
 * For an example, Searching for a Face Using an Image in the Amazon Rekognition
 * Developer Guide.
 *
 * The `QualityFilter` input parameter allows you to filter out detected faces
 * that don’t meet a required quality bar. The quality bar is based on a variety of common use
 * cases. Use `QualityFilter` to set the quality bar for filtering by specifying
 * `LOW`, `MEDIUM`, or `HIGH`. If you do not want to filter
 * detected faces, specify `NONE`. The default value is `NONE`.
 *
 * To use quality filtering, you need a collection associated with version 3 of the face
 * model or higher. To get the version of the face model associated with a collection, call
 * DescribeCollection.
 *
 * This operation requires permissions to perform the
 * `rekognition:SearchFacesByImage` action.
 */
export const searchFacesByImage: API.OperationMethod<
  SearchFacesByImageRequest,
  SearchFacesByImageResponse,
  SearchFacesByImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SearchFacesByImageRequest,
  output: SearchFacesByImageResponse,
  errors: [
    AccessDeniedException,
    ImageTooLargeException,
    InternalServerError,
    InvalidImageFormatException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchFacesByImage",
}));

export type SearchUsersError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for UserIDs within a collection based on a `FaceId` or
 * `UserId`. This API can be used to find the closest UserID (with a highest
 * similarity) to associate a face. The request must be provided with either `FaceId`
 * or `UserId`. The operation returns an array of UserID that match the
 * `FaceId` or `UserId`, ordered by similarity score with the highest
 * similarity first.
 */
export const searchUsers: API.OperationMethod<
  SearchUsersRequest,
  SearchUsersResponse,
  SearchUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SearchUsersRequest,
  output: SearchUsersResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchUsers",
}));

export type SearchUsersByImageError =
  | AccessDeniedException
  | ImageTooLargeException
  | InternalServerError
  | InvalidImageFormatException
  | InvalidParameterException
  | InvalidS3ObjectException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for UserIDs using a supplied image. It first detects the largest face in the
 * image, and then searches a specified collection for matching UserIDs.
 *
 * The operation returns an array of UserIDs that match the face in the supplied image,
 * ordered by similarity score with the highest similarity first. It also returns a bounding box
 * for the face found in the input image.
 *
 * Information about faces detected in the supplied image, but not used for the search, is
 * returned in an array of `UnsearchedFace` objects. If no valid face is detected in
 * the image, the response will contain an empty `UserMatches` list and no
 * `SearchedFace` object.
 */
export const searchUsersByImage: API.OperationMethod<
  SearchUsersByImageRequest,
  SearchUsersByImageResponse,
  SearchUsersByImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SearchUsersByImageRequest,
  output: SearchUsersByImageResponse,
  errors: [
    AccessDeniedException,
    ImageTooLargeException,
    InternalServerError,
    InvalidImageFormatException,
    InvalidParameterException,
    InvalidS3ObjectException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchUsersByImage",
}));

export type StartCelebrityRecognitionError =
  | AccessDeniedException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | VideoTooLargeException
  | CommonErrors;
/**
 * Starts asynchronous recognition of celebrities in a stored video.
 *
 * Amazon Rekognition Video can detect celebrities in a video must be stored in an Amazon S3 bucket. Use Video to specify the bucket name
 * and the filename of the video.
 * `StartCelebrityRecognition`
 * returns a job identifier (`JobId`) which you use to get the results of the analysis.
 * When celebrity recognition analysis is finished, Amazon Rekognition Video publishes a completion status
 * to the Amazon Simple Notification Service topic that you specify in `NotificationChannel`.
 * To get the results of the celebrity recognition analysis, first check that the status value published to the Amazon SNS
 * topic is `SUCCEEDED`. If so, call GetCelebrityRecognition and pass the job identifier
 * (`JobId`) from the initial call to `StartCelebrityRecognition`.
 *
 * For more information, see Recognizing celebrities in the Amazon Rekognition Developer Guide.
 */
export const startCelebrityRecognition: API.OperationMethod<
  StartCelebrityRecognitionRequest,
  StartCelebrityRecognitionResponse,
  StartCelebrityRecognitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartCelebrityRecognitionRequest,
  output: StartCelebrityRecognitionResponse,
  errors: [
    AccessDeniedException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    VideoTooLargeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCelebrityRecognition",
}));

export type StartContentModerationError =
  | AccessDeniedException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | VideoTooLargeException
  | CommonErrors;
/**
 * Starts asynchronous detection of inappropriate, unwanted, or offensive content in a stored video. For a list of moderation labels in Amazon Rekognition, see
 * Using the image and video moderation APIs.
 *
 * Amazon Rekognition Video can moderate content in a video stored in an Amazon S3 bucket. Use Video to specify the bucket name
 * and the filename of the video. `StartContentModeration`
 * returns a job identifier (`JobId`) which you use to get the results of the analysis.
 * When content analysis is finished, Amazon Rekognition Video publishes a completion status
 * to the Amazon Simple Notification Service topic that you specify in `NotificationChannel`.
 *
 * To get the results of the content analysis, first check that the status value published to the Amazon SNS
 * topic is `SUCCEEDED`. If so, call GetContentModeration and pass the job identifier
 * (`JobId`) from the initial call to `StartContentModeration`.
 *
 * For more information, see Moderating content in the Amazon Rekognition Developer Guide.
 */
export const startContentModeration: API.OperationMethod<
  StartContentModerationRequest,
  StartContentModerationResponse,
  StartContentModerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartContentModerationRequest,
  output: StartContentModerationResponse,
  errors: [
    AccessDeniedException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    VideoTooLargeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartContentModeration",
}));

export type StartFaceDetectionError =
  | AccessDeniedException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | VideoTooLargeException
  | CommonErrors;
/**
 * Starts asynchronous detection of faces in a stored video.
 *
 * Amazon Rekognition Video can detect faces in a video stored in an Amazon S3 bucket.
 * Use Video to specify the bucket name and the filename of the video.
 * `StartFaceDetection` returns a job identifier (`JobId`) that you
 * use to get the results of the operation.
 * When face detection is finished, Amazon Rekognition Video publishes a completion status
 * to the Amazon Simple Notification Service topic that you specify in `NotificationChannel`.
 * To get the results of the face detection operation, first check that the status value published to the Amazon SNS
 * topic is `SUCCEEDED`. If so, call GetFaceDetection and pass the job identifier
 * (`JobId`) from the initial call to `StartFaceDetection`.
 *
 * For more information, see Detecting faces in a stored video in the
 * Amazon Rekognition Developer Guide.
 */
export const startFaceDetection: API.OperationMethod<
  StartFaceDetectionRequest,
  StartFaceDetectionResponse,
  StartFaceDetectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartFaceDetectionRequest,
  output: StartFaceDetectionResponse,
  errors: [
    AccessDeniedException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    VideoTooLargeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFaceDetection",
}));

export type StartFaceSearchError =
  | AccessDeniedException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | VideoTooLargeException
  | CommonErrors;
/**
 * Starts the asynchronous search for faces in a collection that match the faces of persons detected in a stored video.
 *
 * The video must be stored in an Amazon S3 bucket. Use Video to specify the bucket name
 * and the filename of the video. `StartFaceSearch`
 * returns a job identifier (`JobId`) which you use to get the search results once the search has completed.
 * When searching is finished, Amazon Rekognition Video publishes a completion status
 * to the Amazon Simple Notification Service topic that you specify in `NotificationChannel`.
 * To get the search results, first check that the status value published to the Amazon SNS
 * topic is `SUCCEEDED`. If so, call GetFaceSearch and pass the job identifier
 * (`JobId`) from the initial call to `StartFaceSearch`. For more information, see
 * Searching stored videos for faces.
 */
export const startFaceSearch: API.OperationMethod<
  StartFaceSearchRequest,
  StartFaceSearchResponse,
  StartFaceSearchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartFaceSearchRequest,
  output: StartFaceSearchResponse,
  errors: [
    AccessDeniedException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    VideoTooLargeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFaceSearch",
}));

export type StartLabelDetectionError =
  | AccessDeniedException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | VideoTooLargeException
  | CommonErrors;
/**
 * Starts asynchronous detection of labels in a stored video.
 *
 * Amazon Rekognition Video can detect labels in a video. Labels are instances of real-world entities.
 * This includes objects like flower, tree, and table; events like
 * wedding, graduation, and birthday party; concepts like landscape, evening, and nature; and activities
 * like a person getting out of a car or a person skiing.
 *
 * The video must be stored in an Amazon S3 bucket. Use Video to specify the bucket name
 * and the filename of the video.
 * `StartLabelDetection` returns a job identifier (`JobId`) which you use to get the
 * results of the operation. When label detection is finished, Amazon Rekognition Video publishes a completion status
 * to the Amazon Simple Notification Service topic that you specify in `NotificationChannel`.
 *
 * To get the results of the label detection operation, first check that the status value published to the Amazon SNS
 * topic is `SUCCEEDED`. If so, call GetLabelDetection and pass the job identifier
 * (`JobId`) from the initial call to `StartLabelDetection`.
 *
 * *Optional Parameters*
 *
 * `StartLabelDetection` has the `GENERAL_LABELS` Feature applied by
 * default. This feature allows you to provide filtering criteria to the `Settings`
 * parameter. You can filter with sets of individual labels or with label categories. You can
 * specify inclusive filters, exclusive filters, or a combination of inclusive and exclusive
 * filters. For more information on filtering, see Detecting labels in a
 * video.
 *
 * You can specify `MinConfidence` to control the confidence threshold for the
 * labels returned. The default is 50.
 */
export const startLabelDetection: API.OperationMethod<
  StartLabelDetectionRequest,
  StartLabelDetectionResponse,
  StartLabelDetectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartLabelDetectionRequest,
  output: StartLabelDetectionResponse,
  errors: [
    AccessDeniedException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    VideoTooLargeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartLabelDetection",
}));

export type StartMediaAnalysisJobError =
  | AccessDeniedException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidManifestException
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ResourceNotReadyException
  | ThrottlingException
  | CommonErrors;
/**
 * Initiates a new media analysis job. Accepts a manifest file in an Amazon S3 bucket. The
 * output is a manifest file and a summary of the manifest stored in the Amazon S3 bucket.
 */
export const startMediaAnalysisJob: API.OperationMethod<
  StartMediaAnalysisJobRequest,
  StartMediaAnalysisJobResponse,
  StartMediaAnalysisJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMediaAnalysisJobRequest,
  output: StartMediaAnalysisJobResponse,
  errors: [
    AccessDeniedException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidManifestException,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ResourceNotReadyException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMediaAnalysisJob",
}));

export type StartPersonTrackingError =
  | AccessDeniedException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | VideoTooLargeException
  | CommonErrors;
/**
 * *End of support notice:* On October 31, 2025, AWS will discontinue
 * support for Amazon Rekognition People Pathing. After October 31, 2025, you will no
 * longer be able to use the Rekognition People Pathing capability. For more information,
 * visit this blog post.
 *
 * Starts the asynchronous tracking of a person's path in a stored video.
 *
 * Amazon Rekognition Video can track the path of people in a video stored in an Amazon S3 bucket. Use Video to specify the bucket name
 * and the filename of the video. `StartPersonTracking`
 * returns a job identifier (`JobId`) which you use to get the results of the operation.
 * When label detection is finished, Amazon Rekognition publishes a completion status
 * to the Amazon Simple Notification Service topic that you specify in `NotificationChannel`.
 *
 * To get the results of the person detection operation, first check that the status value published to the Amazon SNS
 * topic is `SUCCEEDED`. If so, call GetPersonTracking and pass the job identifier
 * (`JobId`) from the initial call to `StartPersonTracking`.
 */
export const startPersonTracking: API.OperationMethod<
  StartPersonTrackingRequest,
  StartPersonTrackingResponse,
  StartPersonTrackingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartPersonTrackingRequest,
  output: StartPersonTrackingResponse,
  errors: [
    AccessDeniedException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    VideoTooLargeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartPersonTracking",
}));

export type StartProjectVersionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Starts the running of the version of a model. Starting a model takes a while to
 * complete. To check the current state of the model, use DescribeProjectVersions.
 *
 * Once the model is running, you can detect custom labels in new images by calling
 * DetectCustomLabels.
 *
 * You are charged for the amount of time that the model is running. To stop a running
 * model, call StopProjectVersion.
 *
 * This operation requires permissions to perform the
 * `rekognition:StartProjectVersion` action.
 */
export const startProjectVersion: API.OperationMethod<
  StartProjectVersionRequest,
  StartProjectVersionResponse,
  StartProjectVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartProjectVersionRequest,
  output: StartProjectVersionResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartProjectVersion",
}));

export type StartSegmentDetectionError =
  | AccessDeniedException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | VideoTooLargeException
  | CommonErrors;
/**
 * Starts asynchronous detection of segment detection in a stored video.
 *
 * Amazon Rekognition Video can detect segments in a video stored in an Amazon S3 bucket. Use Video to specify the bucket name and
 * the filename of the video. `StartSegmentDetection` returns a job identifier (`JobId`) which you use to get
 * the results of the operation. When segment detection is finished, Amazon Rekognition Video publishes a completion status to the Amazon Simple Notification Service topic
 * that you specify in `NotificationChannel`.
 *
 * You can use the `Filters` (StartSegmentDetectionFilters)
 * input parameter to specify the minimum detection confidence returned in the response.
 * Within `Filters`, use `ShotFilter` (StartShotDetectionFilter)
 * to filter detected shots. Use `TechnicalCueFilter` (StartTechnicalCueDetectionFilter)
 * to filter technical cues.
 *
 * To get the results of the segment detection operation, first check that the status value published to the Amazon SNS
 * topic is `SUCCEEDED`. if so, call GetSegmentDetection and pass the job identifier (`JobId`)
 * from the initial call to `StartSegmentDetection`.
 *
 * For more information, see Detecting video segments in stored video in the Amazon Rekognition Developer Guide.
 */
export const startSegmentDetection: API.OperationMethod<
  StartSegmentDetectionRequest,
  StartSegmentDetectionResponse,
  StartSegmentDetectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartSegmentDetectionRequest,
  output: StartSegmentDetectionResponse,
  errors: [
    AccessDeniedException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    VideoTooLargeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSegmentDetection",
}));

export type StartStreamProcessorError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Starts processing a stream processor. You create a stream processor by calling CreateStreamProcessor.
 * To tell `StartStreamProcessor` which stream processor to start, use the value of the `Name` field specified in the call to
 * `CreateStreamProcessor`.
 *
 * If you are using a label detection stream processor to detect labels, you need to provide a `Start selector` and a `Stop selector` to determine the length of the stream processing time.
 */
export const startStreamProcessor: API.OperationMethod<
  StartStreamProcessorRequest,
  StartStreamProcessorResponse,
  StartStreamProcessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartStreamProcessorRequest,
  output: StartStreamProcessorResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartStreamProcessor",
}));

export type StartTextDetectionError =
  | AccessDeniedException
  | IdempotentParameterMismatchException
  | InternalServerError
  | InvalidParameterException
  | InvalidS3ObjectException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ThrottlingException
  | VideoTooLargeException
  | CommonErrors;
/**
 * Starts asynchronous detection of text in a stored video.
 *
 * Amazon Rekognition Video can detect text in a video stored in an Amazon S3 bucket. Use Video to specify the bucket name and
 * the filename of the video. `StartTextDetection` returns a job identifier (`JobId`) which you use to get
 * the results of the operation. When text detection is finished, Amazon Rekognition Video publishes a completion status to the Amazon Simple Notification Service topic
 * that you specify in `NotificationChannel`.
 *
 * To get the results of the text detection operation, first check that the status value published to the Amazon SNS
 * topic is `SUCCEEDED`. if so, call GetTextDetection and pass the job identifier (`JobId`)
 * from the initial call to `StartTextDetection`.
 */
export const startTextDetection: API.OperationMethod<
  StartTextDetectionRequest,
  StartTextDetectionResponse,
  StartTextDetectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartTextDetectionRequest,
  output: StartTextDetectionResponse,
  errors: [
    AccessDeniedException,
    IdempotentParameterMismatchException,
    InternalServerError,
    InvalidParameterException,
    InvalidS3ObjectException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ThrottlingException,
    VideoTooLargeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTextDetection",
}));

export type StopProjectVersionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Stops a running model. The operation might take a while to complete. To check the
 * current status, call DescribeProjectVersions. Only applies to Custom
 * Labels projects.
 *
 * This operation requires permissions to perform the `rekognition:StopProjectVersion` action.
 */
export const stopProjectVersion: API.OperationMethod<
  StopProjectVersionRequest,
  StopProjectVersionResponse,
  StopProjectVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopProjectVersionRequest,
  output: StopProjectVersionResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopProjectVersion",
}));

export type StopStreamProcessorError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Stops a running stream processor that was created by CreateStreamProcessor.
 */
export const stopStreamProcessor: API.OperationMethod<
  StopStreamProcessorRequest,
  StopStreamProcessorResponse,
  StopStreamProcessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopStreamProcessorRequest,
  output: StopStreamProcessorResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopStreamProcessor",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds one or more key-value tags to an Amazon Rekognition collection, stream processor, or Custom
 * Labels model. For more information, see Tagging AWS
 * Resources.
 *
 * This operation requires permissions to perform the `rekognition:TagResource`
 * action.
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
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes one or more tags from an Amazon Rekognition collection, stream processor, or Custom Labels
 * model.
 *
 * This operation requires permissions to perform the
 * `rekognition:UntagResource` action.
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
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDatasetEntriesError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | LimitExceededException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation applies only to Amazon Rekognition Custom Labels.
 *
 * Adds or updates one or more entries (images) in a dataset. An entry is a JSON Line which contains the
 * information for a single image, including
 * the image location, assigned labels, and object location bounding boxes. For more information,
 * see Image-Level labels in manifest files and Object localization in manifest files in the *Amazon Rekognition Custom Labels Developer Guide*.
 *
 * If the `source-ref` field in the JSON line references an existing image, the existing image in the dataset
 * is updated.
 * If `source-ref` field doesn't reference an existing image, the image is added as a new image to the dataset.
 *
 * You specify the changes that you want to make in the `Changes` input parameter.
 * There isn't a limit to the number JSON Lines that you can change, but the size of `Changes` must be less
 * than 5MB.
 *
 * `UpdateDatasetEntries` returns immediatly, but the dataset update might take a while to complete.
 * Use DescribeDataset to check the
 * current status. The dataset updated successfully if the value of `Status` is
 * `UPDATE_COMPLETE`.
 *
 * To check if any non-terminal errors occured, call ListDatasetEntries
 * and check for the presence of `errors` lists in the JSON Lines.
 *
 * Dataset update fails if a terminal error occurs (`Status` = `UPDATE_FAILED`).
 * Currently, you can't access the terminal error information from the Amazon Rekognition Custom Labels SDK.
 *
 * This operation requires permissions to perform the `rekognition:UpdateDatasetEntries` action.
 */
export const updateDatasetEntries: API.OperationMethod<
  UpdateDatasetEntriesRequest,
  UpdateDatasetEntriesResponse,
  UpdateDatasetEntriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDatasetEntriesRequest,
  output: UpdateDatasetEntriesResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    LimitExceededException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDatasetEntries",
}));

export type UpdateStreamProcessorError =
  | AccessDeniedException
  | InternalServerError
  | InvalidParameterException
  | ProvisionedThroughputExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Allows you to update a stream processor. You can change some settings and regions of interest and delete certain parameters.
 */
export const updateStreamProcessor: API.OperationMethod<
  UpdateStreamProcessorRequest,
  UpdateStreamProcessorResponse,
  UpdateStreamProcessorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateStreamProcessorRequest,
  output: UpdateStreamProcessorResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidParameterException,
    ProvisionedThroughputExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStreamProcessor",
}));
