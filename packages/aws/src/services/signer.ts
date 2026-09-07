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
  sdkId: "signer",
  serviceShapeName: "WallabyService",
});
const auth = T.AwsAuthSigv4({ name: "signer" });
const ver = T.ServiceVersion("2017-08-25");
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
              `https://signer-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://signer-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://signer.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://signer.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      code: S.optional(S.String),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      code: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      code: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServiceErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceErrorException>()(
    "InternalServiceErrorException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      code: S.optional(S.String),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      code: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      code: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceLimitExceededException>()(
    "ServiceLimitExceededException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      code: S.optional(S.String),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class SigningProfileAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<SigningProfileAlreadyExists>()(
    "SigningProfileAlreadyExists",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      code: S.optional(S.String),
    },
    T.SyntheticError({
      from: "ValidationException",
      message: { includes: "already exists" },
    }),
  ).pipe(C.withAlreadyExistsError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      code: S.optional(S.String),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      code: S.optional(S.String),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      code: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ProfileName = string;
export type ProfileVersion = string;
export interface AddProfilePermissionRequest {
  profileName: string;
  profileVersion?: string;
  action: string;
  principal: string;
  revisionId?: string;
  statementId: string;
}
export const AddProfilePermissionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileName: S.String.pipe(T.HttpLabel("profileName")),
    profileVersion: S.optional(S.String),
    action: S.String,
    principal: S.String,
    revisionId: S.optional(S.String),
    statementId: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/signing-profiles/{profileName}/permissions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AddProfilePermissionRequest",
}) as any as S.Schema<AddProfilePermissionRequest>;
export interface AddProfilePermissionResponse {
  revisionId?: string;
}
export const AddProfilePermissionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ revisionId: S.optional(S.String) }),
).annotate({
  identifier: "AddProfilePermissionResponse",
}) as any as S.Schema<AddProfilePermissionResponse>;
export interface CancelSigningProfileRequest {
  profileName: string;
}
export const CancelSigningProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ profileName: S.String.pipe(T.HttpLabel("profileName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/signing-profiles/{profileName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelSigningProfileRequest",
}) as any as S.Schema<CancelSigningProfileRequest>;
export interface CancelSigningProfileResponse {}
export const CancelSigningProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelSigningProfileResponse",
}) as any as S.Schema<CancelSigningProfileResponse>;
export type JobId = string;
export interface DescribeSigningJobRequest {
  jobId: string;
}
export const DescribeSigningJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.String.pipe(T.HttpLabel("jobId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/signing-jobs/{jobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSigningJobRequest",
}) as any as S.Schema<DescribeSigningJobRequest>;
export type BucketName = string;
export type Key = string;
export type Version = string;
export interface S3Source {
  bucketName: string;
  key: string;
  version: string;
}
export const S3Source = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucketName: S.String, key: S.String, version: S.String }),
).annotate({ identifier: "S3Source" }) as any as S.Schema<S3Source>;
export interface Source {
  s3?: S3Source;
}
export const Source = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3: S.optional(S3Source) }),
).annotate({ identifier: "Source" }) as any as S.Schema<Source>;
export type CertificateArn = string;
export interface SigningMaterial {
  certificateArn?: string;
}
export const SigningMaterial = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ certificateArn: S.optional(S.String) }),
).annotate({
  identifier: "SigningMaterial",
}) as any as S.Schema<SigningMaterial>;
export type PlatformId = string;
export type DisplayName = string;
export type EncryptionAlgorithm = "RSA" | "ECDSA" | (string & {});
export const EncryptionAlgorithm = /*@__PURE__*/ S.String;

export type HashAlgorithm = "SHA1" | "SHA256" | (string & {});
export const HashAlgorithm = /*@__PURE__*/ S.String;

export interface SigningConfigurationOverrides {
  encryptionAlgorithm?: EncryptionAlgorithm;
  hashAlgorithm?: HashAlgorithm;
}
export const SigningConfigurationOverrides = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    encryptionAlgorithm: S.optional(EncryptionAlgorithm),
    hashAlgorithm: S.optional(HashAlgorithm),
  }),
).annotate({
  identifier: "SigningConfigurationOverrides",
}) as any as S.Schema<SigningConfigurationOverrides>;
export type ImageFormat =
  | "JSON"
  | "JSONEmbedded"
  | "JSONDetached"
  | (string & {});
export const ImageFormat = /*@__PURE__*/ S.String;

export interface SigningPlatformOverrides {
  signingConfiguration?: SigningConfigurationOverrides;
  signingImageFormat?: ImageFormat;
}
export const SigningPlatformOverrides = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    signingConfiguration: S.optional(SigningConfigurationOverrides),
    signingImageFormat: S.optional(ImageFormat),
  }),
).annotate({
  identifier: "SigningPlatformOverrides",
}) as any as S.Schema<SigningPlatformOverrides>;
export type SigningParameterKey = string;
export type SigningParameterValue = string;
export type SigningParameters = { [key: string]: string | undefined };
export const SigningParameters = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type RequestedBy = string;
export type SigningStatus =
  | "InProgress"
  | "Failed"
  | "Succeeded"
  | (string & {});
export const SigningStatus = /*@__PURE__*/ S.String;

export type StatusReason = string;
export interface SigningJobRevocationRecord {
  reason?: string;
  revokedAt?: Date;
  revokedBy?: string;
}
export const SigningJobRevocationRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reason: S.optional(S.String),
    revokedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    revokedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "SigningJobRevocationRecord",
}) as any as S.Schema<SigningJobRevocationRecord>;
export interface S3SignedObject {
  bucketName?: string;
  key?: string;
}
export const S3SignedObject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucketName: S.optional(S.String), key: S.optional(S.String) }),
).annotate({ identifier: "S3SignedObject" }) as any as S.Schema<S3SignedObject>;
export interface SignedObject {
  s3?: S3SignedObject;
}
export const SignedObject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3: S.optional(S3SignedObject) }),
).annotate({ identifier: "SignedObject" }) as any as S.Schema<SignedObject>;
export type AccountId = string;
export interface DescribeSigningJobResponse {
  jobId?: string;
  source?: Source;
  signingMaterial?: SigningMaterial;
  platformId?: string;
  platformDisplayName?: string;
  profileName?: string;
  profileVersion?: string;
  overrides?: SigningPlatformOverrides;
  signingParameters?: { [key: string]: string | undefined };
  createdAt?: Date;
  completedAt?: Date;
  signatureExpiresAt?: Date;
  requestedBy?: string;
  status?: SigningStatus;
  statusReason?: string;
  revocationRecord?: SigningJobRevocationRecord;
  signedObject?: SignedObject;
  jobOwner?: string;
  jobInvoker?: string;
}
export const DescribeSigningJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.optional(S.String),
    source: S.optional(Source),
    signingMaterial: S.optional(SigningMaterial),
    platformId: S.optional(S.String),
    platformDisplayName: S.optional(S.String),
    profileName: S.optional(S.String),
    profileVersion: S.optional(S.String),
    overrides: S.optional(SigningPlatformOverrides),
    signingParameters: S.optional(SigningParameters),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    signatureExpiresAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    requestedBy: S.optional(S.String),
    status: S.optional(SigningStatus),
    statusReason: S.optional(S.String),
    revocationRecord: S.optional(SigningJobRevocationRecord),
    signedObject: S.optional(SignedObject),
    jobOwner: S.optional(S.String),
    jobInvoker: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeSigningJobResponse",
}) as any as S.Schema<DescribeSigningJobResponse>;
export type Arn = string;
export type CertificateHashes = string[];
export const CertificateHashes = /*@__PURE__*/ S.Array(S.String);
export interface GetRevocationStatusRequest {
  signatureTimestamp: Date;
  platformId: string;
  profileVersionArn: string;
  jobArn: string;
  certificateHashes: string[];
}
export const GetRevocationStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    signatureTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("signatureTimestamp"),
    ),
    platformId: S.String.pipe(T.HttpQuery("platformId")),
    profileVersionArn: S.String.pipe(T.HttpQuery("profileVersionArn")),
    jobArn: S.String.pipe(T.HttpQuery("jobArn")),
    certificateHashes: CertificateHashes.pipe(T.HttpQuery("certificateHashes")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/revocations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRevocationStatusRequest",
}) as any as S.Schema<GetRevocationStatusRequest>;
export type RevokedEntities = string[];
export const RevokedEntities = /*@__PURE__*/ S.Array(S.String);
export interface GetRevocationStatusResponse {
  revokedEntities?: string[];
}
export const GetRevocationStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ revokedEntities: S.optional(RevokedEntities) }),
).annotate({
  identifier: "GetRevocationStatusResponse",
}) as any as S.Schema<GetRevocationStatusResponse>;
export interface GetSigningPlatformRequest {
  platformId: string;
}
export const GetSigningPlatformRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ platformId: S.String.pipe(T.HttpLabel("platformId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/signing-platforms/{platformId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSigningPlatformRequest",
}) as any as S.Schema<GetSigningPlatformRequest>;
export type Category = "AWSIoT" | (string & {});
export const Category = /*@__PURE__*/ S.String;

export type EncryptionAlgorithms = EncryptionAlgorithm[];
export const EncryptionAlgorithms = /*@__PURE__*/ S.Array(EncryptionAlgorithm);
export interface EncryptionAlgorithmOptions {
  allowedValues: EncryptionAlgorithm[];
  defaultValue: EncryptionAlgorithm;
}
export const EncryptionAlgorithmOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allowedValues: EncryptionAlgorithms,
    defaultValue: EncryptionAlgorithm,
  }),
).annotate({
  identifier: "EncryptionAlgorithmOptions",
}) as any as S.Schema<EncryptionAlgorithmOptions>;
export type HashAlgorithms = HashAlgorithm[];
export const HashAlgorithms = /*@__PURE__*/ S.Array(HashAlgorithm);
export interface HashAlgorithmOptions {
  allowedValues: HashAlgorithm[];
  defaultValue: HashAlgorithm;
}
export const HashAlgorithmOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ allowedValues: HashAlgorithms, defaultValue: HashAlgorithm }),
).annotate({
  identifier: "HashAlgorithmOptions",
}) as any as S.Schema<HashAlgorithmOptions>;
export interface SigningConfiguration {
  encryptionAlgorithmOptions: EncryptionAlgorithmOptions;
  hashAlgorithmOptions: HashAlgorithmOptions;
}
export const SigningConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    encryptionAlgorithmOptions: EncryptionAlgorithmOptions,
    hashAlgorithmOptions: HashAlgorithmOptions,
  }),
).annotate({
  identifier: "SigningConfiguration",
}) as any as S.Schema<SigningConfiguration>;
export type ImageFormats = ImageFormat[];
export const ImageFormats = /*@__PURE__*/ S.Array(ImageFormat);
export interface SigningImageFormat {
  supportedFormats: ImageFormat[];
  defaultFormat: ImageFormat;
}
export const SigningImageFormat = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ supportedFormats: ImageFormats, defaultFormat: ImageFormat }),
).annotate({
  identifier: "SigningImageFormat",
}) as any as S.Schema<SigningImageFormat>;
export type MaxSizeInMB = number;
export interface GetSigningPlatformResponse {
  platformId?: string;
  displayName?: string;
  partner?: string;
  target?: string;
  category?: Category;
  signingConfiguration?: SigningConfiguration;
  signingImageFormat?: SigningImageFormat;
  maxSizeInMB?: number;
  revocationSupported?: boolean;
}
export const GetSigningPlatformResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    platformId: S.optional(S.String),
    displayName: S.optional(S.String),
    partner: S.optional(S.String),
    target: S.optional(S.String),
    category: S.optional(Category),
    signingConfiguration: S.optional(SigningConfiguration),
    signingImageFormat: S.optional(SigningImageFormat),
    maxSizeInMB: S.optional(S.Number),
    revocationSupported: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GetSigningPlatformResponse",
}) as any as S.Schema<GetSigningPlatformResponse>;
export interface GetSigningProfileRequest {
  profileName: string;
  profileOwner?: string;
}
export const GetSigningProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileName: S.String.pipe(T.HttpLabel("profileName")),
    profileOwner: S.optional(S.String).pipe(T.HttpQuery("profileOwner")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/signing-profiles/{profileName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSigningProfileRequest",
}) as any as S.Schema<GetSigningProfileRequest>;
export interface SigningProfileRevocationRecord {
  revocationEffectiveFrom?: Date;
  revokedAt?: Date;
  revokedBy?: string;
}
export const SigningProfileRevocationRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    revocationEffectiveFrom: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    revokedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    revokedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "SigningProfileRevocationRecord",
}) as any as S.Schema<SigningProfileRevocationRecord>;
export type ValidityType = "DAYS" | "MONTHS" | "YEARS" | (string & {});
export const ValidityType = /*@__PURE__*/ S.String;

export interface SignatureValidityPeriod {
  value?: number;
  type?: ValidityType;
}
export const SignatureValidityPeriod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.optional(S.Number), type: S.optional(ValidityType) }),
).annotate({
  identifier: "SignatureValidityPeriod",
}) as any as S.Schema<SignatureValidityPeriod>;
export type SigningProfileStatus =
  | "Active"
  | "Canceled"
  | "Revoked"
  | (string & {});
export const SigningProfileStatus = /*@__PURE__*/ S.String;

export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface GetSigningProfileResponse {
  profileName?: string;
  profileVersion?: string;
  profileVersionArn?: string;
  revocationRecord?: SigningProfileRevocationRecord;
  signingMaterial?: SigningMaterial;
  platformId?: string;
  platformDisplayName?: string;
  signatureValidityPeriod?: SignatureValidityPeriod;
  overrides?: SigningPlatformOverrides;
  signingParameters?: { [key: string]: string | undefined };
  status?: SigningProfileStatus;
  statusReason?: string;
  arn?: string;
  tags?: { [key: string]: string | undefined };
}
export const GetSigningProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileName: S.optional(S.String),
    profileVersion: S.optional(S.String),
    profileVersionArn: S.optional(S.String),
    revocationRecord: S.optional(SigningProfileRevocationRecord),
    signingMaterial: S.optional(SigningMaterial),
    platformId: S.optional(S.String),
    platformDisplayName: S.optional(S.String),
    signatureValidityPeriod: S.optional(SignatureValidityPeriod),
    overrides: S.optional(SigningPlatformOverrides),
    signingParameters: S.optional(SigningParameters),
    status: S.optional(SigningProfileStatus),
    statusReason: S.optional(S.String),
    arn: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetSigningProfileResponse",
}) as any as S.Schema<GetSigningProfileResponse>;
export interface ListProfilePermissionsRequest {
  profileName: string;
  nextToken?: string;
}
export const ListProfilePermissionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileName: S.String.pipe(T.HttpLabel("profileName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/signing-profiles/{profileName}/permissions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProfilePermissionsRequest",
}) as any as S.Schema<ListProfilePermissionsRequest>;
export type PolicySizeBytes = number;
export interface Permission {
  action?: string;
  principal?: string;
  statementId?: string;
  profileVersion?: string;
}
export const Permission = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: S.optional(S.String),
    principal: S.optional(S.String),
    statementId: S.optional(S.String),
    profileVersion: S.optional(S.String),
  }),
).annotate({ identifier: "Permission" }) as any as S.Schema<Permission>;
export type Permissions = Permission[];
export const Permissions = /*@__PURE__*/ S.Array(Permission);
export interface ListProfilePermissionsResponse {
  revisionId?: string;
  policySizeBytes?: number;
  permissions?: Permission[];
  nextToken?: string;
}
export const ListProfilePermissionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    revisionId: S.optional(S.String),
    policySizeBytes: S.optional(S.Number),
    permissions: S.optional(Permissions),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProfilePermissionsResponse",
}) as any as S.Schema<ListProfilePermissionsResponse>;
export type MaxResults = number;
export type NextToken = string;
export interface ListSigningJobsRequest {
  status?: SigningStatus;
  platformId?: string;
  requestedBy?: string;
  maxResults?: number;
  nextToken?: string;
  isRevoked?: boolean;
  signatureExpiresBefore?: Date;
  signatureExpiresAfter?: Date;
  jobInvoker?: string;
}
export const ListSigningJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(SigningStatus).pipe(T.HttpQuery("status")),
    platformId: S.optional(S.String).pipe(T.HttpQuery("platformId")),
    requestedBy: S.optional(S.String).pipe(T.HttpQuery("requestedBy")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    isRevoked: S.optional(S.Boolean).pipe(T.HttpQuery("isRevoked")),
    signatureExpiresBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("signatureExpiresBefore")),
    signatureExpiresAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("signatureExpiresAfter")),
    jobInvoker: S.optional(S.String).pipe(T.HttpQuery("jobInvoker")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/signing-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSigningJobsRequest",
}) as any as S.Schema<ListSigningJobsRequest>;
export interface SigningJob {
  jobId?: string;
  source?: Source;
  signedObject?: SignedObject;
  signingMaterial?: SigningMaterial;
  createdAt?: Date;
  status?: SigningStatus;
  isRevoked?: boolean;
  profileName?: string;
  profileVersion?: string;
  platformId?: string;
  platformDisplayName?: string;
  signatureExpiresAt?: Date;
  jobOwner?: string;
  jobInvoker?: string;
}
export const SigningJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.optional(S.String),
    source: S.optional(Source),
    signedObject: S.optional(SignedObject),
    signingMaterial: S.optional(SigningMaterial),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.optional(SigningStatus),
    isRevoked: S.optional(S.Boolean),
    profileName: S.optional(S.String),
    profileVersion: S.optional(S.String),
    platformId: S.optional(S.String),
    platformDisplayName: S.optional(S.String),
    signatureExpiresAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    jobOwner: S.optional(S.String),
    jobInvoker: S.optional(S.String),
  }),
).annotate({ identifier: "SigningJob" }) as any as S.Schema<SigningJob>;
export type SigningJobs = SigningJob[];
export const SigningJobs = /*@__PURE__*/ S.Array(SigningJob);
export interface ListSigningJobsResponse {
  jobs?: SigningJob[];
  nextToken?: string;
}
export const ListSigningJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobs: S.optional(SigningJobs), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListSigningJobsResponse",
}) as any as S.Schema<ListSigningJobsResponse>;
export interface ListSigningPlatformsRequest {
  category?: string;
  partner?: string;
  target?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListSigningPlatformsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    category: S.optional(S.String).pipe(T.HttpQuery("category")),
    partner: S.optional(S.String).pipe(T.HttpQuery("partner")),
    target: S.optional(S.String).pipe(T.HttpQuery("target")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/signing-platforms" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSigningPlatformsRequest",
}) as any as S.Schema<ListSigningPlatformsRequest>;
export interface SigningPlatform {
  platformId?: string;
  displayName?: string;
  partner?: string;
  target?: string;
  category?: Category;
  signingConfiguration?: SigningConfiguration;
  signingImageFormat?: SigningImageFormat;
  maxSizeInMB?: number;
  revocationSupported?: boolean;
}
export const SigningPlatform = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    platformId: S.optional(S.String),
    displayName: S.optional(S.String),
    partner: S.optional(S.String),
    target: S.optional(S.String),
    category: S.optional(Category),
    signingConfiguration: S.optional(SigningConfiguration),
    signingImageFormat: S.optional(SigningImageFormat),
    maxSizeInMB: S.optional(S.Number),
    revocationSupported: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "SigningPlatform",
}) as any as S.Schema<SigningPlatform>;
export type SigningPlatforms = SigningPlatform[];
export const SigningPlatforms = /*@__PURE__*/ S.Array(SigningPlatform);
export interface ListSigningPlatformsResponse {
  platforms?: SigningPlatform[];
  nextToken?: string;
}
export const ListSigningPlatformsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    platforms: S.optional(SigningPlatforms),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSigningPlatformsResponse",
}) as any as S.Schema<ListSigningPlatformsResponse>;
export type Statuses = SigningProfileStatus[];
export const Statuses = /*@__PURE__*/ S.Array(SigningProfileStatus);
export interface ListSigningProfilesRequest {
  includeCanceled?: boolean;
  maxResults?: number;
  nextToken?: string;
  platformId?: string;
  statuses?: SigningProfileStatus[];
}
export const ListSigningProfilesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    includeCanceled: S.optional(S.Boolean).pipe(T.HttpQuery("includeCanceled")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    platformId: S.optional(S.String).pipe(T.HttpQuery("platformId")),
    statuses: S.optional(Statuses).pipe(T.HttpQuery("statuses")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/signing-profiles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSigningProfilesRequest",
}) as any as S.Schema<ListSigningProfilesRequest>;
export interface SigningProfile {
  profileName?: string;
  profileVersion?: string;
  profileVersionArn?: string;
  signingMaterial?: SigningMaterial;
  signatureValidityPeriod?: SignatureValidityPeriod;
  platformId?: string;
  platformDisplayName?: string;
  signingParameters?: { [key: string]: string | undefined };
  status?: SigningProfileStatus;
  arn?: string;
  tags?: { [key: string]: string | undefined };
}
export const SigningProfile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileName: S.optional(S.String),
    profileVersion: S.optional(S.String),
    profileVersionArn: S.optional(S.String),
    signingMaterial: S.optional(SigningMaterial),
    signatureValidityPeriod: S.optional(SignatureValidityPeriod),
    platformId: S.optional(S.String),
    platformDisplayName: S.optional(S.String),
    signingParameters: S.optional(SigningParameters),
    status: S.optional(SigningProfileStatus),
    arn: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({ identifier: "SigningProfile" }) as any as S.Schema<SigningProfile>;
export type SigningProfiles = SigningProfile[];
export const SigningProfiles = /*@__PURE__*/ S.Array(SigningProfile);
export interface ListSigningProfilesResponse {
  profiles?: SigningProfile[];
  nextToken?: string;
}
export const ListSigningProfilesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profiles: S.optional(SigningProfiles),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSigningProfilesResponse",
}) as any as S.Schema<ListSigningProfilesResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutSigningProfileRequest {
  profileName: string;
  signingMaterial?: SigningMaterial;
  signatureValidityPeriod?: SignatureValidityPeriod;
  platformId: string;
  overrides?: SigningPlatformOverrides;
  signingParameters?: { [key: string]: string | undefined };
  tags?: { [key: string]: string | undefined };
}
export const PutSigningProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileName: S.String.pipe(T.HttpLabel("profileName")),
    signingMaterial: S.optional(SigningMaterial),
    signatureValidityPeriod: S.optional(SignatureValidityPeriod),
    platformId: S.String,
    overrides: S.optional(SigningPlatformOverrides),
    signingParameters: S.optional(SigningParameters),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/signing-profiles/{profileName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutSigningProfileRequest",
}) as any as S.Schema<PutSigningProfileRequest>;
export interface PutSigningProfileResponse {
  arn?: string;
  profileVersion?: string;
  profileVersionArn?: string;
}
export const PutSigningProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    profileVersion: S.optional(S.String),
    profileVersionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "PutSigningProfileResponse",
}) as any as S.Schema<PutSigningProfileResponse>;
export interface RemoveProfilePermissionRequest {
  profileName: string;
  revisionId: string;
  statementId: string;
}
export const RemoveProfilePermissionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileName: S.String.pipe(T.HttpLabel("profileName")),
    revisionId: S.String.pipe(T.HttpQuery("revisionId")),
    statementId: S.String.pipe(T.HttpLabel("statementId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/signing-profiles/{profileName}/permissions/{statementId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveProfilePermissionRequest",
}) as any as S.Schema<RemoveProfilePermissionRequest>;
export interface RemoveProfilePermissionResponse {
  revisionId?: string;
}
export const RemoveProfilePermissionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ revisionId: S.optional(S.String) }),
).annotate({
  identifier: "RemoveProfilePermissionResponse",
}) as any as S.Schema<RemoveProfilePermissionResponse>;
export type RevocationReasonString = string;
export interface RevokeSignatureRequest {
  jobId: string;
  jobOwner?: string;
  reason: string;
}
export const RevokeSignatureRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.String.pipe(T.HttpLabel("jobId")),
    jobOwner: S.optional(S.String),
    reason: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/signing-jobs/{jobId}/revoke" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RevokeSignatureRequest",
}) as any as S.Schema<RevokeSignatureRequest>;
export interface RevokeSignatureResponse {}
export const RevokeSignatureResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RevokeSignatureResponse",
}) as any as S.Schema<RevokeSignatureResponse>;
export interface RevokeSigningProfileRequest {
  profileName: string;
  profileVersion: string;
  reason: string;
  effectiveTime: Date;
}
export const RevokeSigningProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileName: S.String.pipe(T.HttpLabel("profileName")),
    profileVersion: S.String,
    reason: S.String,
    effectiveTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/signing-profiles/{profileName}/revoke" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RevokeSigningProfileRequest",
}) as any as S.Schema<RevokeSigningProfileRequest>;
export interface RevokeSigningProfileResponse {}
export const RevokeSigningProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RevokeSigningProfileResponse",
}) as any as S.Schema<RevokeSigningProfileResponse>;
export type Payload = Uint8Array;
export interface SignPayloadRequest {
  profileName: string;
  profileOwner?: string;
  payload: Uint8Array;
  payloadFormat: string;
}
export const SignPayloadRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    profileName: S.String,
    profileOwner: S.optional(S.String),
    payload: T.Blob,
    payloadFormat: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/signing-jobs/with-payload" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SignPayloadRequest",
}) as any as S.Schema<SignPayloadRequest>;
export type Metadata = { [key: string]: string | undefined };
export const Metadata = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface SignPayloadResponse {
  jobId?: string;
  jobOwner?: string;
  metadata?: { [key: string]: string | undefined };
  signature?: Uint8Array;
}
export const SignPayloadResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    jobId: S.optional(S.String),
    jobOwner: S.optional(S.String),
    metadata: S.optional(Metadata),
    signature: S.optional(T.Blob),
  }),
).annotate({
  identifier: "SignPayloadResponse",
}) as any as S.Schema<SignPayloadResponse>;
export type Prefix = string;
export interface S3Destination {
  bucketName?: string;
  prefix?: string;
}
export const S3Destination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucketName: S.optional(S.String), prefix: S.optional(S.String) }),
).annotate({ identifier: "S3Destination" }) as any as S.Schema<S3Destination>;
export interface Destination {
  s3?: S3Destination;
}
export const Destination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3: S.optional(S3Destination) }),
).annotate({ identifier: "Destination" }) as any as S.Schema<Destination>;
export type ClientRequestToken = string;
export interface StartSigningJobRequest {
  source: Source;
  destination: Destination;
  profileName: string;
  clientRequestToken: string;
  profileOwner?: string;
}
export const StartSigningJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    source: Source,
    destination: Destination,
    profileName: S.String,
    clientRequestToken: S.String.pipe(T.IdempotencyToken()),
    profileOwner: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/signing-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartSigningJobRequest",
}) as any as S.Schema<StartSigningJobRequest>;
export interface StartSigningJobResponse {
  jobId?: string;
  jobOwner?: string;
}
export const StartSigningJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ jobId: S.optional(S.String), jobOwner: S.optional(S.String) }),
).annotate({
  identifier: "StartSigningJobResponse",
}) as any as S.Schema<StartSigningJobResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
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
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export type ErrorMessage = string;
export type ErrorCode = string;
export type AddProfilePermissionError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ServiceLimitExceededException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Adds cross-account permissions to a signing profile.
 */
export const addProfilePermission: API.OperationMethod<
  AddProfilePermissionRequest,
  AddProfilePermissionResponse,
  AddProfilePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddProfilePermissionRequest,
  output: AddProfilePermissionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ServiceLimitExceededException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddProfilePermission",
}));

export type CancelSigningProfileError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Changes the state of an `ACTIVE` signing profile to `CANCELED`.
 * A canceled profile is still viewable with the `ListSigningProfiles`
 * operation, but it cannot perform new signing jobs. See Data Retention for more information on scheduled deletion of a canceled signing profile.
 */
export const cancelSigningProfile: API.OperationMethod<
  CancelSigningProfileRequest,
  CancelSigningProfileResponse,
  CancelSigningProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelSigningProfileRequest,
  output: CancelSigningProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelSigningProfile",
}));

export type DescribeSigningJobError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns information about a specific code signing job. You specify the job by using the
 * `jobId` value that is returned by the StartSigningJob
 * operation.
 */
export const describeSigningJob: API.OperationMethod<
  DescribeSigningJobRequest,
  DescribeSigningJobResponse,
  DescribeSigningJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSigningJobRequest,
  output: DescribeSigningJobResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSigningJob",
}));

export type GetRevocationStatusError =
  | AccessDeniedException
  | InternalServiceErrorException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the revocation status of one or more of the signing profile, signing job,
 * and signing certificate.
 */
export const getRevocationStatus: API.OperationMethod<
  GetRevocationStatusRequest,
  GetRevocationStatusResponse,
  GetRevocationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRevocationStatusRequest,
  output: GetRevocationStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRevocationStatus",
  endpointHostPrefix: "data-",
}));

export type GetSigningPlatformError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns information on a specific signing platform.
 */
export const getSigningPlatform: API.OperationMethod<
  GetSigningPlatformRequest,
  GetSigningPlatformResponse,
  GetSigningPlatformError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSigningPlatformRequest,
  output: GetSigningPlatformResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSigningPlatform",
}));

export type GetSigningProfileError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns information on a specific signing profile.
 */
export const getSigningProfile: API.OperationMethod<
  GetSigningProfileRequest,
  GetSigningProfileResponse,
  GetSigningProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSigningProfileRequest,
  output: GetSigningProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSigningProfile",
}));

export type ListProfilePermissionsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Lists the cross-account permissions associated with a signing profile.
 */
export const listProfilePermissions: API.OperationMethod<
  ListProfilePermissionsRequest,
  ListProfilePermissionsResponse,
  ListProfilePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListProfilePermissionsRequest,
  output: ListProfilePermissionsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfilePermissions",
}));

export type ListSigningJobsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Lists all your signing jobs. You can use the `maxResults` parameter to limit the
 * number of signing jobs that are returned in the response. If additional jobs remain to
 * be listed, AWS Signer returns a `nextToken` value. Use this value in
 * subsequent calls to `ListSigningJobs` to fetch the remaining values. You can
 * continue calling `ListSigningJobs` with your `maxResults`
 * parameter and with new values that Signer returns in the `nextToken`
 * parameter until all of your signing jobs have been returned.
 */
export const listSigningJobs: API.PaginatedOperationMethod<
  ListSigningJobsRequest,
  ListSigningJobsResponse,
  ListSigningJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSigningJobsRequest,
  output: ListSigningJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSigningJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSigningPlatformsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Lists all signing platforms available in AWS Signer that match the request parameters. If
 * additional jobs remain to be listed, Signer returns a `nextToken` value.
 * Use this value in subsequent calls to `ListSigningJobs` to fetch the
 * remaining values. You can continue calling `ListSigningJobs` with your
 * `maxResults` parameter and with new values that Signer returns in the
 * `nextToken` parameter until all of your signing jobs have been
 * returned.
 */
export const listSigningPlatforms: API.PaginatedOperationMethod<
  ListSigningPlatformsRequest,
  ListSigningPlatformsResponse,
  ListSigningPlatformsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSigningPlatformsRequest,
  output: ListSigningPlatformsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSigningPlatforms",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSigningProfilesError =
  | AccessDeniedException
  | InternalServiceErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all available signing profiles in your AWS account. Returns only profiles with an
 * `ACTIVE` status unless the `includeCanceled` request field is
 * set to `true`. If additional jobs remain to be listed, AWS Signer returns a
 * `nextToken` value. Use this value in subsequent calls to
 * `ListSigningJobs` to fetch the remaining values. You can continue calling
 * `ListSigningJobs` with your `maxResults` parameter and with
 * new values that Signer returns in the `nextToken` parameter until all of
 * your signing jobs have been returned.
 */
export const listSigningProfiles: API.PaginatedOperationMethod<
  ListSigningProfilesRequest,
  ListSigningProfilesResponse,
  ListSigningProfilesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSigningProfilesRequest,
  output: ListSigningProfilesResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSigningProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | InternalServiceErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of the tags associated with a signing profile resource.
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
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutSigningProfileError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | SigningProfileAlreadyExists
  | CommonErrors;
/**
 * Creates a signing profile. A signing profile is a code-signing template that can be used to
 * carry out a pre-defined signing job.
 */
export const putSigningProfile: API.OperationMethod<
  PutSigningProfileRequest,
  PutSigningProfileResponse,
  PutSigningProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutSigningProfileRequest,
  output: PutSigningProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
    SigningProfileAlreadyExists,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSigningProfile",
}));

export type RemoveProfilePermissionError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Removes cross-account permissions from a signing profile.
 */
export const removeProfilePermission: API.OperationMethod<
  RemoveProfilePermissionRequest,
  RemoveProfilePermissionResponse,
  RemoveProfilePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveProfilePermissionRequest,
  output: RemoveProfilePermissionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveProfilePermission",
}));

export type RevokeSignatureError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Changes the state of a signing job to `REVOKED`. This indicates that the signature is no
 * longer valid.
 */
export const revokeSignature: API.OperationMethod<
  RevokeSignatureRequest,
  RevokeSignatureResponse,
  RevokeSignatureError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RevokeSignatureRequest,
  output: RevokeSignatureResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeSignature",
}));

export type RevokeSigningProfileError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Changes the state of a signing profile to `REVOKED`. This indicates that signatures
 * generated using the signing profile after an effective start date are no longer
 * valid. A revoked profile is still viewable with the `ListSigningProfiles`
 * operation, but it cannot perform new signing jobs. See Data Retention
 * for more information on scheduled deletion of a revoked signing profile.
 */
export const revokeSigningProfile: API.OperationMethod<
  RevokeSigningProfileRequest,
  RevokeSigningProfileResponse,
  RevokeSigningProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RevokeSigningProfileRequest,
  output: RevokeSigningProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeSigningProfile",
}));

export type SignPayloadError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Signs a binary payload and returns a signature envelope.
 */
export const signPayload: API.OperationMethod<
  SignPayloadRequest,
  SignPayloadResponse,
  SignPayloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SignPayloadRequest,
  output: SignPayloadResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SignPayload",
}));

export type StartSigningJobError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Initiates a signing job to be performed on the code provided. Signing jobs are
 * viewable by the `ListSigningJobs` operation. Note the following requirements:
 *
 * - You must create an Amazon S3 source bucket. For more information, see Creating a Bucket in the
 * *Amazon S3 Getting Started Guide*.
 *
 * - Your S3 source bucket must be version enabled.
 *
 * - You must create an S3 destination bucket. AWS Signer uses your S3 destination bucket to
 * write your signed code.
 *
 * - You specify the name of the source and destination buckets when calling the
 * `StartSigningJob` operation.
 *
 * - You must ensure the S3 buckets are from the same Region as the signing profile. Cross-Region signing isn't supported.
 *
 * - You must also specify a request token that identifies your request to Signer.
 *
 * You can call the DescribeSigningJob and the ListSigningJobs actions after you call
 * `StartSigningJob`.
 *
 * For a Java example that shows how to use this action, see StartSigningJob.
 */
export const startSigningJob: API.OperationMethod<
  StartSigningJobRequest,
  StartSigningJobResponse,
  StartSigningJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartSigningJobRequest,
  output: StartSigningJobResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSigningJob",
}));

export type TagResourceError =
  | BadRequestException
  | InternalServiceErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds one or more tags to a signing profile. Tags are labels that you can use to
 * identify and organize your AWS resources. Each tag consists of a key and an optional
 * value. To specify the signing profile, use its Amazon Resource Name (ARN). To specify
 * the tag, use a key-value pair.
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
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | BadRequestException
  | InternalServiceErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes one or more tags from a signing profile. To remove the tags, specify a list of
 * tag keys.
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
    BadRequestException,
    InternalServiceErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));
