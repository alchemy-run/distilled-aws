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
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "Secrets Manager",
  serviceShapeName: "secretsmanager",
});
const auth = T.AwsAuthSigv4({ name: "secretsmanager" });
const ver = T.ServiceVersion("2017-10-17");
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
            if ("aws" === _.getAttr(PartitionResult, "name")) {
              return e(`https://secretsmanager-fips.${Region}.amazonaws.com`);
            }
            if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
              return e(`https://secretsmanager-fips.${Region}.amazonaws.com`);
            }
            return e(
              `https://secretsmanager-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://secretsmanager-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            if ("aws" === _.getAttr(PartitionResult, "name")) {
              return e(`https://secretsmanager.${Region}.amazonaws.com`);
            }
            if ("aws-cn" === _.getAttr(PartitionResult, "name")) {
              return e(`https://secretsmanager.${Region}.amazonaws.com.cn`);
            }
            if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
              return e(`https://secretsmanager.${Region}.amazonaws.com`);
            }
            return e(
              `https://secretsmanager.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://secretsmanager.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class DecryptionFailure
  extends /*@__PURE__*/ S.TaggedError<DecryptionFailure>()(
    "DecryptionFailure",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withServerError) {}
export class EncryptionFailure
  extends /*@__PURE__*/ S.TaggedError<EncryptionFailure>()(
    "EncryptionFailure",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withServerError) {}
export class InternalServiceError
  extends /*@__PURE__*/ S.TaggedError<InternalServiceError>()(
    "InternalServiceError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withQuotaError) {}
export class MalformedPolicyDocumentException
  extends /*@__PURE__*/ S.TaggedError<MalformedPolicyDocumentException>()(
    "MalformedPolicyDocumentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class PreconditionNotMetException
  extends /*@__PURE__*/ S.TaggedError<PreconditionNotMetException>()(
    "PreconditionNotMetException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withConflictError) {}
export class PublicPolicyException
  extends /*@__PURE__*/ S.TaggedError<PublicPolicyException>()(
    "PublicPolicyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class ResourceExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceExistsException>()(
    "ResourceExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export type SecretIdType = string;
export type SecretIdListType = string[];
export const SecretIdListType = /*@__PURE__*/ S.Array(S.String);
export type FilterNameStringType =
  | "description"
  | "name"
  | "tag-key"
  | "tag-value"
  | "primary-region"
  | "owning-service"
  | "all"
  | (string & {});
export const FilterNameStringType = S.String;

export type FilterValueStringType = string;
export type FilterValuesStringList = string[];
export const FilterValuesStringList = /*@__PURE__*/ S.Array(S.String);
export interface Filter {
  Key?: FilterNameStringType;
  Values?: string[];
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(FilterNameStringType),
    Values: S.optional(FilterValuesStringList),
  }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FiltersListType = Filter[];
export const FiltersListType = /*@__PURE__*/ S.Array(Filter);
export type MaxResultsBatchType = number;
export type NextTokenType = string;
export interface BatchGetSecretValueRequest {
  SecretIdList?: string[];
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export const BatchGetSecretValueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecretIdList: S.optional(SecretIdListType),
    Filters: S.optional(FiltersListType),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchGetSecretValueRequest",
}) as any as S.Schema<BatchGetSecretValueRequest>;
export type SecretARNType = string;
export type SecretNameType = string;
export type SecretVersionIdType = string;
export type SecretBinaryType = Uint8Array | redacted.Redacted<Uint8Array>;
export type SecretStringType = string | redacted.Redacted<string>;
export type SecretVersionStageType = string;
export type SecretVersionStagesType = string[];
export const SecretVersionStagesType = /*@__PURE__*/ S.Array(S.String);
export type CreatedDateType = Date;
export interface SecretValueEntry {
  ARN?: string;
  Name?: string;
  VersionId?: string;
  SecretBinary?: Uint8Array | redacted.Redacted<Uint8Array>;
  SecretString?: string | redacted.Redacted<string>;
  VersionStages?: string[];
  CreatedDate?: Date;
}
export const SecretValueEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ARN: S.optional(S.String),
    Name: S.optional(S.String),
    VersionId: S.optional(S.String),
    SecretBinary: S.optional(SensitiveBlob),
    SecretString: S.optional(SensitiveString),
    VersionStages: S.optional(SecretVersionStagesType),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "SecretValueEntry",
}) as any as S.Schema<SecretValueEntry>;
export type SecretValuesType = SecretValueEntry[];
export const SecretValuesType = /*@__PURE__*/ S.Array(SecretValueEntry);
export type ErrorCode = string;
export type ErrorMessage = string;
export interface APIErrorType {
  SecretId?: string;
  ErrorCode?: string;
  Message?: string;
}
export const APIErrorType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecretId: S.optional(S.String),
    ErrorCode: S.optional(S.String),
    Message: S.optional(S.String),
  }),
).annotate({ identifier: "APIErrorType" }) as any as S.Schema<APIErrorType>;
export type APIErrorListType = APIErrorType[];
export const APIErrorListType = /*@__PURE__*/ S.Array(APIErrorType);
export interface BatchGetSecretValueResponse {
  SecretValues?: SecretValueEntry[];
  NextToken?: string;
  Errors?: APIErrorType[];
}
export const BatchGetSecretValueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecretValues: S.optional(SecretValuesType),
    NextToken: S.optional(S.String),
    Errors: S.optional(APIErrorListType),
  }),
).annotate({
  identifier: "BatchGetSecretValueResponse",
}) as any as S.Schema<BatchGetSecretValueResponse>;
export interface CancelRotateSecretRequest {
  SecretId: string;
}
export const CancelRotateSecretRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SecretId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CancelRotateSecretRequest",
}) as any as S.Schema<CancelRotateSecretRequest>;
export interface CancelRotateSecretResponse {
  ARN?: string;
  Name?: string;
  VersionId?: string;
}
export const CancelRotateSecretResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ARN: S.optional(S.String),
    Name: S.optional(S.String),
    VersionId: S.optional(S.String),
  }),
).annotate({
  identifier: "CancelRotateSecretResponse",
}) as any as S.Schema<CancelRotateSecretResponse>;
export type NameType = string;
export type ClientRequestTokenType = string;
export type DescriptionType = string;
export type KmsKeyIdType = string;
export type TagKeyType = string;
export type TagValueType = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagListType = Tag[];
export const TagListType = /*@__PURE__*/ S.Array(Tag);
export type RegionType = string;
export interface ReplicaRegionType {
  Region?: string;
  KmsKeyId?: string;
}
export const ReplicaRegionType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Region: S.optional(S.String), KmsKeyId: S.optional(S.String) }),
).annotate({
  identifier: "ReplicaRegionType",
}) as any as S.Schema<ReplicaRegionType>;
export type AddReplicaRegionListType = ReplicaRegionType[];
export const AddReplicaRegionListType =
  /*@__PURE__*/ S.Array(ReplicaRegionType);
export type MedeaTypeType = string;
export interface CreateSecretRequest {
  Name: string;
  ClientRequestToken?: string;
  Description?: string;
  KmsKeyId?: string;
  SecretBinary?: Uint8Array | redacted.Redacted<Uint8Array>;
  SecretString?: string | redacted.Redacted<string>;
  Tags?: Tag[];
  AddReplicaRegions?: ReplicaRegionType[];
  ForceOverwriteReplicaSecret?: boolean;
  Type?: string;
}
export const CreateSecretRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Description: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    SecretBinary: S.optional(SensitiveBlob),
    SecretString: S.optional(SensitiveString),
    Tags: S.optional(TagListType),
    AddReplicaRegions: S.optional(AddReplicaRegionListType),
    ForceOverwriteReplicaSecret: S.optional(S.Boolean),
    Type: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateSecretRequest",
}) as any as S.Schema<CreateSecretRequest>;
export type StatusType = "InSync" | "Failed" | "InProgress" | (string & {});
export const StatusType = S.String;

export type StatusMessageType = string;
export type LastAccessedDateType = Date;
export interface ReplicationStatusType {
  Region?: string;
  KmsKeyId?: string;
  Status?: StatusType;
  StatusMessage?: string;
  LastAccessedDate?: Date;
}
export const ReplicationStatusType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Region: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    Status: S.optional(StatusType),
    StatusMessage: S.optional(S.String),
    LastAccessedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ReplicationStatusType",
}) as any as S.Schema<ReplicationStatusType>;
export type ReplicationStatusListType = ReplicationStatusType[];
export const ReplicationStatusListType = /*@__PURE__*/ S.Array(
  ReplicationStatusType,
);
export interface CreateSecretResponse {
  ARN?: string;
  Name?: string;
  VersionId?: string;
  ReplicationStatus?: ReplicationStatusType[];
}
export const CreateSecretResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ARN: S.optional(S.String),
    Name: S.optional(S.String),
    VersionId: S.optional(S.String),
    ReplicationStatus: S.optional(ReplicationStatusListType),
  }),
).annotate({
  identifier: "CreateSecretResponse",
}) as any as S.Schema<CreateSecretResponse>;
export interface DeleteResourcePolicyRequest {
  SecretId: string;
}
export const DeleteResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SecretId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteResourcePolicyRequest",
}) as any as S.Schema<DeleteResourcePolicyRequest>;
export interface DeleteResourcePolicyResponse {
  ARN?: string;
  Name?: string;
}
export const DeleteResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ARN: S.optional(S.String), Name: S.optional(S.String) }),
).annotate({
  identifier: "DeleteResourcePolicyResponse",
}) as any as S.Schema<DeleteResourcePolicyResponse>;
export type RecoveryWindowInDaysType = number;
export interface DeleteSecretRequest {
  SecretId: string;
  RecoveryWindowInDays?: number;
  ForceDeleteWithoutRecovery?: boolean;
}
export const DeleteSecretRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecretId: S.String,
    RecoveryWindowInDays: S.optional(S.Number),
    ForceDeleteWithoutRecovery: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteSecretRequest",
}) as any as S.Schema<DeleteSecretRequest>;
export type DeletionDateType = Date;
export interface DeleteSecretResponse {
  ARN?: string;
  Name?: string;
  DeletionDate?: Date;
}
export const DeleteSecretResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ARN: S.optional(S.String),
    Name: S.optional(S.String),
    DeletionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DeleteSecretResponse",
}) as any as S.Schema<DeleteSecretResponse>;
export interface DescribeSecretRequest {
  SecretId: string;
}
export const DescribeSecretRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SecretId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeSecretRequest",
}) as any as S.Schema<DescribeSecretRequest>;
export type RotationEnabledType = boolean;
export type RotationLambdaARNType = string;
export type AutomaticallyRotateAfterDaysType = number;
export type DurationType = string;
export type ScheduleExpressionType = string;
export interface RotationRulesType {
  AutomaticallyAfterDays?: number;
  Duration?: string;
  ScheduleExpression?: string;
}
export const RotationRulesType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutomaticallyAfterDays: S.optional(S.Number),
    Duration: S.optional(S.String),
    ScheduleExpression: S.optional(S.String),
  }),
).annotate({
  identifier: "RotationRulesType",
}) as any as S.Schema<RotationRulesType>;
export type ExternalSecretRotationMetadataItemKeyType = string;
export type ExternalSecretRotationMetadataItemValueType = string;
export interface ExternalSecretRotationMetadataItem {
  Key?: string;
  Value?: string;
}
export const ExternalSecretRotationMetadataItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "ExternalSecretRotationMetadataItem",
}) as any as S.Schema<ExternalSecretRotationMetadataItem>;
export type ExternalSecretRotationMetadataType =
  ExternalSecretRotationMetadataItem[];
export const ExternalSecretRotationMetadataType = /*@__PURE__*/ S.Array(
  ExternalSecretRotationMetadataItem,
);
export type RoleARNType = string;
export type LastRotatedDateType = Date;
export type LastChangedDateType = Date;
export type DeletedDateType = Date;
export type NextRotationDateType = Date;
export type SecretVersionsToStagesMapType = {
  [key: string]: string[] | undefined;
};
export const SecretVersionsToStagesMapType = /*@__PURE__*/ S.Record(
  S.String,
  SecretVersionStagesType.pipe(S.optional),
);
export type OwningServiceType = string;
export interface DescribeSecretResponse {
  ARN?: string;
  Name?: string;
  Type?: string;
  Description?: string;
  KmsKeyId?: string;
  RotationEnabled?: boolean;
  RotationLambdaARN?: string;
  RotationRules?: RotationRulesType;
  ExternalSecretRotationMetadata?: ExternalSecretRotationMetadataItem[];
  ExternalSecretRotationRoleArn?: string;
  LastRotatedDate?: Date;
  LastChangedDate?: Date;
  LastAccessedDate?: Date;
  DeletedDate?: Date;
  NextRotationDate?: Date;
  Tags?: Tag[];
  VersionIdsToStages?: { [key: string]: string[] | undefined };
  OwningService?: string;
  CreatedDate?: Date;
  PrimaryRegion?: string;
  ReplicationStatus?: ReplicationStatusType[];
}
export const DescribeSecretResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ARN: S.optional(S.String),
    Name: S.optional(S.String),
    Type: S.optional(S.String),
    Description: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    RotationEnabled: S.optional(S.Boolean),
    RotationLambdaARN: S.optional(S.String),
    RotationRules: S.optional(RotationRulesType),
    ExternalSecretRotationMetadata: S.optional(
      ExternalSecretRotationMetadataType,
    ),
    ExternalSecretRotationRoleArn: S.optional(S.String),
    LastRotatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastChangedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastAccessedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    DeletedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    NextRotationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Tags: S.optional(TagListType),
    VersionIdsToStages: S.optional(SecretVersionsToStagesMapType),
    OwningService: S.optional(S.String),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    PrimaryRegion: S.optional(S.String),
    ReplicationStatus: S.optional(ReplicationStatusListType),
  }),
).annotate({
  identifier: "DescribeSecretResponse",
}) as any as S.Schema<DescribeSecretResponse>;
export type PasswordLengthType = number;
export type ExcludeCharactersType = string;
export type ExcludeNumbersType = boolean;
export type ExcludePunctuationType = boolean;
export type ExcludeUppercaseType = boolean;
export type ExcludeLowercaseType = boolean;
export type IncludeSpaceType = boolean;
export type RequireEachIncludedTypeType = boolean;
export interface GetRandomPasswordRequest {
  PasswordLength?: number;
  ExcludeCharacters?: string;
  ExcludeNumbers?: boolean;
  ExcludePunctuation?: boolean;
  ExcludeUppercase?: boolean;
  ExcludeLowercase?: boolean;
  IncludeSpace?: boolean;
  RequireEachIncludedType?: boolean;
}
export const GetRandomPasswordRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PasswordLength: S.optional(S.Number),
    ExcludeCharacters: S.optional(S.String),
    ExcludeNumbers: S.optional(S.Boolean),
    ExcludePunctuation: S.optional(S.Boolean),
    ExcludeUppercase: S.optional(S.Boolean),
    ExcludeLowercase: S.optional(S.Boolean),
    IncludeSpace: S.optional(S.Boolean),
    RequireEachIncludedType: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetRandomPasswordRequest",
}) as any as S.Schema<GetRandomPasswordRequest>;
export type RandomPasswordType = string | redacted.Redacted<string>;
export interface GetRandomPasswordResponse {
  RandomPassword?: string | redacted.Redacted<string>;
}
export const GetRandomPasswordResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RandomPassword: S.optional(SensitiveString) }),
).annotate({
  identifier: "GetRandomPasswordResponse",
}) as any as S.Schema<GetRandomPasswordResponse>;
export interface GetResourcePolicyRequest {
  SecretId: string;
}
export const GetResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SecretId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResourcePolicyRequest",
}) as any as S.Schema<GetResourcePolicyRequest>;
export type NonEmptyResourcePolicyType = string;
export interface GetResourcePolicyResponse {
  ARN?: string;
  Name?: string;
  ResourcePolicy?: string;
}
export const GetResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ARN: S.optional(S.String),
    Name: S.optional(S.String),
    ResourcePolicy: S.optional(S.String),
  }),
).annotate({
  identifier: "GetResourcePolicyResponse",
}) as any as S.Schema<GetResourcePolicyResponse>;
export interface GetSecretValueRequest {
  SecretId: string;
  VersionId?: string;
  VersionStage?: string;
}
export const GetSecretValueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecretId: S.String,
    VersionId: S.optional(S.String),
    VersionStage: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetSecretValueRequest",
}) as any as S.Schema<GetSecretValueRequest>;
export interface GetSecretValueResponse {
  ARN?: string;
  Name?: string;
  VersionId?: string;
  SecretBinary?: Uint8Array | redacted.Redacted<Uint8Array>;
  SecretString?: string | redacted.Redacted<string>;
  VersionStages?: string[];
  CreatedDate?: Date;
}
export const GetSecretValueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ARN: S.optional(S.String),
    Name: S.optional(S.String),
    VersionId: S.optional(S.String),
    SecretBinary: S.optional(SensitiveBlob),
    SecretString: S.optional(SensitiveString),
    VersionStages: S.optional(SecretVersionStagesType),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GetSecretValueResponse",
}) as any as S.Schema<GetSecretValueResponse>;
export type MaxResultsType = number;
export type SortOrderType = "asc" | "desc" | (string & {});
export const SortOrderType = S.String;

export type SortByType =
  | "created-date"
  | "last-accessed-date"
  | "last-changed-date"
  | "name"
  | (string & {});
export const SortByType = S.String;

export interface ListSecretsRequest {
  IncludePlannedDeletion?: boolean;
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
  SortOrder?: SortOrderType;
  SortBy?: SortByType;
}
export const ListSecretsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IncludePlannedDeletion: S.optional(S.Boolean),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(FiltersListType),
    SortOrder: S.optional(SortOrderType),
    SortBy: S.optional(SortByType),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListSecretsRequest",
}) as any as S.Schema<ListSecretsRequest>;
export interface SecretListEntry {
  ARN?: string;
  Name?: string;
  Type?: string;
  Description?: string;
  KmsKeyId?: string;
  RotationEnabled?: boolean;
  RotationLambdaARN?: string;
  RotationRules?: RotationRulesType;
  ExternalSecretRotationMetadata?: ExternalSecretRotationMetadataItem[];
  ExternalSecretRotationRoleArn?: string;
  LastRotatedDate?: Date;
  LastChangedDate?: Date;
  LastAccessedDate?: Date;
  DeletedDate?: Date;
  NextRotationDate?: Date;
  Tags?: Tag[];
  SecretVersionsToStages?: { [key: string]: string[] | undefined };
  OwningService?: string;
  CreatedDate?: Date;
  PrimaryRegion?: string;
}
export const SecretListEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ARN: S.optional(S.String),
    Name: S.optional(S.String),
    Type: S.optional(S.String),
    Description: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    RotationEnabled: S.optional(S.Boolean),
    RotationLambdaARN: S.optional(S.String),
    RotationRules: S.optional(RotationRulesType),
    ExternalSecretRotationMetadata: S.optional(
      ExternalSecretRotationMetadataType,
    ),
    ExternalSecretRotationRoleArn: S.optional(S.String),
    LastRotatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastChangedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastAccessedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    DeletedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    NextRotationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Tags: S.optional(TagListType),
    SecretVersionsToStages: S.optional(SecretVersionsToStagesMapType),
    OwningService: S.optional(S.String),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    PrimaryRegion: S.optional(S.String),
  }),
).annotate({
  identifier: "SecretListEntry",
}) as any as S.Schema<SecretListEntry>;
export type SecretListType = SecretListEntry[];
export const SecretListType = /*@__PURE__*/ S.Array(SecretListEntry);
export interface ListSecretsResponse {
  SecretList?: SecretListEntry[];
  NextToken?: string;
}
export const ListSecretsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecretList: S.optional(SecretListType),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSecretsResponse",
}) as any as S.Schema<ListSecretsResponse>;
export interface ListSecretVersionIdsRequest {
  SecretId: string;
  MaxResults?: number;
  NextToken?: string;
  IncludeDeprecated?: boolean;
}
export const ListSecretVersionIdsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecretId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    IncludeDeprecated: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListSecretVersionIdsRequest",
}) as any as S.Schema<ListSecretVersionIdsRequest>;
export type KmsKeyIdListType = string[];
export const KmsKeyIdListType = /*@__PURE__*/ S.Array(S.String);
export interface SecretVersionsListEntry {
  VersionId?: string;
  VersionStages?: string[];
  LastAccessedDate?: Date;
  CreatedDate?: Date;
  KmsKeyIds?: string[];
}
export const SecretVersionsListEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VersionId: S.optional(S.String),
    VersionStages: S.optional(SecretVersionStagesType),
    LastAccessedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    KmsKeyIds: S.optional(KmsKeyIdListType),
  }),
).annotate({
  identifier: "SecretVersionsListEntry",
}) as any as S.Schema<SecretVersionsListEntry>;
export type SecretVersionsListType = SecretVersionsListEntry[];
export const SecretVersionsListType = /*@__PURE__*/ S.Array(
  SecretVersionsListEntry,
);
export interface ListSecretVersionIdsResponse {
  Versions?: SecretVersionsListEntry[];
  NextToken?: string;
  ARN?: string;
  Name?: string;
}
export const ListSecretVersionIdsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Versions: S.optional(SecretVersionsListType),
    NextToken: S.optional(S.String),
    ARN: S.optional(S.String),
    Name: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSecretVersionIdsResponse",
}) as any as S.Schema<ListSecretVersionIdsResponse>;
export interface PutResourcePolicyRequest {
  SecretId: string;
  ResourcePolicy: string;
  BlockPublicPolicy?: boolean;
}
export const PutResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecretId: S.String,
    ResourcePolicy: S.String,
    BlockPublicPolicy: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutResourcePolicyRequest",
}) as any as S.Schema<PutResourcePolicyRequest>;
export interface PutResourcePolicyResponse {
  ARN?: string;
  Name?: string;
}
export const PutResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ARN: S.optional(S.String), Name: S.optional(S.String) }),
).annotate({
  identifier: "PutResourcePolicyResponse",
}) as any as S.Schema<PutResourcePolicyResponse>;
export type RotationTokenType = string | redacted.Redacted<string>;
export interface PutSecretValueRequest {
  SecretId: string;
  ClientRequestToken?: string;
  SecretBinary?: Uint8Array | redacted.Redacted<Uint8Array>;
  SecretString?: string | redacted.Redacted<string>;
  VersionStages?: string[];
  RotationToken?: string | redacted.Redacted<string>;
}
export const PutSecretValueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecretId: S.String,
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    SecretBinary: S.optional(SensitiveBlob),
    SecretString: S.optional(SensitiveString),
    VersionStages: S.optional(SecretVersionStagesType),
    RotationToken: S.optional(SensitiveString),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutSecretValueRequest",
}) as any as S.Schema<PutSecretValueRequest>;
export interface PutSecretValueResponse {
  ARN?: string;
  Name?: string;
  VersionId?: string;
  VersionStages?: string[];
}
export const PutSecretValueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ARN: S.optional(S.String),
    Name: S.optional(S.String),
    VersionId: S.optional(S.String),
    VersionStages: S.optional(SecretVersionStagesType),
  }),
).annotate({
  identifier: "PutSecretValueResponse",
}) as any as S.Schema<PutSecretValueResponse>;
export type RemoveReplicaRegionListType = string[];
export const RemoveReplicaRegionListType = /*@__PURE__*/ S.Array(S.String);
export interface RemoveRegionsFromReplicationRequest {
  SecretId: string;
  RemoveReplicaRegions: string[];
}
export const RemoveRegionsFromReplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecretId: S.String,
    RemoveReplicaRegions: RemoveReplicaRegionListType,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RemoveRegionsFromReplicationRequest",
}) as any as S.Schema<RemoveRegionsFromReplicationRequest>;
export interface RemoveRegionsFromReplicationResponse {
  ARN?: string;
  ReplicationStatus?: ReplicationStatusType[];
}
export const RemoveRegionsFromReplicationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ARN: S.optional(S.String),
      ReplicationStatus: S.optional(ReplicationStatusListType),
    }),
).annotate({
  identifier: "RemoveRegionsFromReplicationResponse",
}) as any as S.Schema<RemoveRegionsFromReplicationResponse>;
export interface ReplicateSecretToRegionsRequest {
  SecretId: string;
  AddReplicaRegions: ReplicaRegionType[];
  ForceOverwriteReplicaSecret?: boolean;
}
export const ReplicateSecretToRegionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecretId: S.String,
    AddReplicaRegions: AddReplicaRegionListType,
    ForceOverwriteReplicaSecret: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ReplicateSecretToRegionsRequest",
}) as any as S.Schema<ReplicateSecretToRegionsRequest>;
export interface ReplicateSecretToRegionsResponse {
  ARN?: string;
  ReplicationStatus?: ReplicationStatusType[];
}
export const ReplicateSecretToRegionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ARN: S.optional(S.String),
    ReplicationStatus: S.optional(ReplicationStatusListType),
  }),
).annotate({
  identifier: "ReplicateSecretToRegionsResponse",
}) as any as S.Schema<ReplicateSecretToRegionsResponse>;
export interface RestoreSecretRequest {
  SecretId: string;
}
export const RestoreSecretRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SecretId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RestoreSecretRequest",
}) as any as S.Schema<RestoreSecretRequest>;
export interface RestoreSecretResponse {
  ARN?: string;
  Name?: string;
}
export const RestoreSecretResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ARN: S.optional(S.String), Name: S.optional(S.String) }),
).annotate({
  identifier: "RestoreSecretResponse",
}) as any as S.Schema<RestoreSecretResponse>;
export interface RotateSecretRequest {
  SecretId: string;
  ClientRequestToken?: string;
  RotationLambdaARN?: string;
  RotationRules?: RotationRulesType;
  ExternalSecretRotationMetadata?: ExternalSecretRotationMetadataItem[];
  ExternalSecretRotationRoleArn?: string;
  RotateImmediately?: boolean;
}
export const RotateSecretRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecretId: S.String,
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    RotationLambdaARN: S.optional(S.String),
    RotationRules: S.optional(RotationRulesType),
    ExternalSecretRotationMetadata: S.optional(
      ExternalSecretRotationMetadataType,
    ),
    ExternalSecretRotationRoleArn: S.optional(S.String),
    RotateImmediately: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RotateSecretRequest",
}) as any as S.Schema<RotateSecretRequest>;
export interface RotateSecretResponse {
  ARN?: string;
  Name?: string;
  VersionId?: string;
}
export const RotateSecretResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ARN: S.optional(S.String),
    Name: S.optional(S.String),
    VersionId: S.optional(S.String),
  }),
).annotate({
  identifier: "RotateSecretResponse",
}) as any as S.Schema<RotateSecretResponse>;
export interface StopReplicationToReplicaRequest {
  SecretId: string;
}
export const StopReplicationToReplicaRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SecretId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopReplicationToReplicaRequest",
}) as any as S.Schema<StopReplicationToReplicaRequest>;
export interface StopReplicationToReplicaResponse {
  ARN?: string;
}
export const StopReplicationToReplicaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ARN: S.optional(S.String) }),
).annotate({
  identifier: "StopReplicationToReplicaResponse",
}) as any as S.Schema<StopReplicationToReplicaResponse>;
export interface TagResourceRequest {
  SecretId: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SecretId: S.String, Tags: TagListType }).pipe(
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
export type TagKeyListType = string[];
export const TagKeyListType = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  SecretId: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SecretId: S.String, TagKeys: TagKeyListType }).pipe(
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
export interface UpdateSecretRequest {
  SecretId: string;
  ClientRequestToken?: string;
  Description?: string;
  KmsKeyId?: string;
  SecretBinary?: Uint8Array | redacted.Redacted<Uint8Array>;
  SecretString?: string | redacted.Redacted<string>;
  Type?: string;
}
export const UpdateSecretRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecretId: S.String,
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Description: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    SecretBinary: S.optional(SensitiveBlob),
    SecretString: S.optional(SensitiveString),
    Type: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateSecretRequest",
}) as any as S.Schema<UpdateSecretRequest>;
export interface UpdateSecretResponse {
  ARN?: string;
  Name?: string;
  VersionId?: string;
}
export const UpdateSecretResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ARN: S.optional(S.String),
    Name: S.optional(S.String),
    VersionId: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateSecretResponse",
}) as any as S.Schema<UpdateSecretResponse>;
export interface UpdateSecretVersionStageRequest {
  SecretId: string;
  VersionStage: string;
  RemoveFromVersionId?: string;
  MoveToVersionId?: string;
}
export const UpdateSecretVersionStageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecretId: S.String,
    VersionStage: S.String,
    RemoveFromVersionId: S.optional(S.String),
    MoveToVersionId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateSecretVersionStageRequest",
}) as any as S.Schema<UpdateSecretVersionStageRequest>;
export interface UpdateSecretVersionStageResponse {
  ARN?: string;
  Name?: string;
}
export const UpdateSecretVersionStageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ARN: S.optional(S.String), Name: S.optional(S.String) }),
).annotate({
  identifier: "UpdateSecretVersionStageResponse",
}) as any as S.Schema<UpdateSecretVersionStageResponse>;
export interface ValidateResourcePolicyRequest {
  SecretId?: string;
  ResourcePolicy: string;
}
export const ValidateResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SecretId: S.optional(S.String), ResourcePolicy: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ValidateResourcePolicyRequest",
}) as any as S.Schema<ValidateResourcePolicyRequest>;
export interface ValidationErrorsEntry {
  CheckName?: string;
  ErrorMessage?: string;
}
export const ValidationErrorsEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CheckName: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "ValidationErrorsEntry",
}) as any as S.Schema<ValidationErrorsEntry>;
export type ValidationErrorsType = ValidationErrorsEntry[];
export const ValidationErrorsType = /*@__PURE__*/ S.Array(
  ValidationErrorsEntry,
);
export interface ValidateResourcePolicyResponse {
  PolicyValidationPassed?: boolean;
  ValidationErrors?: ValidationErrorsEntry[];
}
export const ValidateResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyValidationPassed: S.optional(S.Boolean),
    ValidationErrors: S.optional(ValidationErrorsType),
  }),
).annotate({
  identifier: "ValidateResourcePolicyResponse",
}) as any as S.Schema<ValidateResourcePolicyResponse>;
export type BatchGetSecretValueError =
  | DecryptionFailure
  | InternalServiceError
  | InvalidNextTokenException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the contents of the encrypted fields `SecretString` or
 * `SecretBinary` for up to 20 secrets. To retrieve a single secret, call
 * GetSecretValue.
 *
 * To choose which secrets to retrieve, you can specify a list of secrets by name or ARN,
 * or you can use filters. If Secrets Manager encounters errors such as
 * `AccessDeniedException` while attempting to retrieve any of the secrets,
 * you can see the errors in `Errors` in the response.
 *
 * Secrets Manager generates CloudTrail
 * `GetSecretValue` log entries for each secret you request when you call this
 * action. Do not include sensitive information in request parameters because it might be
 * logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * **Required permissions: **
 * `secretsmanager:BatchGetSecretValue`, and you must have
 * `secretsmanager:GetSecretValue` for each secret. If you use filters, you
 * must also have `secretsmanager:ListSecrets`. If the secrets are encrypted
 * using customer-managed keys instead of the Amazon Web Services managed key
 * `aws/secretsmanager`, then you also need `kms:Decrypt`
 * permissions for the keys. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const batchGetSecretValue: API.PaginatedOperationMethod<
  BatchGetSecretValueRequest,
  BatchGetSecretValueResponse,
  BatchGetSecretValueError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: BatchGetSecretValueRequest,
  output: BatchGetSecretValueResponse,
  errors: [
    DecryptionFailure,
    InternalServiceError,
    InvalidNextTokenException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetSecretValue",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type CancelRotateSecretError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Turns off automatic rotation, and if a rotation is currently in progress, cancels the
 * rotation.
 *
 * If you cancel a rotation in progress, it can leave the `VersionStage`
 * labels in an unexpected state. You might need to remove the staging label
 * `AWSPENDING` from the partially created version. You also need to
 * determine whether to roll back to the previous version of the secret by moving the
 * staging label `AWSCURRENT` to the version that has `AWSPENDING`.
 * To determine which version has a specific staging label, call ListSecretVersionIds. Then use UpdateSecretVersionStage to change staging labels. For more information, see How rotation
 * works.
 *
 * To turn on automatic rotation again, call RotateSecret.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:CancelRotateSecret`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const cancelRotateSecret: API.OperationMethod<
  CancelRotateSecretRequest,
  CancelRotateSecretResponse,
  CancelRotateSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelRotateSecretRequest,
  output: CancelRotateSecretResponse,
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelRotateSecret",
}));

export type CreateSecretError =
  | DecryptionFailure
  | EncryptionFailure
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | MalformedPolicyDocumentException
  | PreconditionNotMetException
  | ResourceExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a new secret. A *secret* can be a password, a set of
 * credentials such as a user name and password, an OAuth token, or other secret
 * information that you store in an encrypted form in Secrets Manager. The secret also includes the
 * connection information to access a database or other service, which Secrets Manager doesn't
 * encrypt. A secret in Secrets Manager consists of both the protected secret data and the important
 * information needed to manage the secret.
 *
 * For secrets that use *managed rotation*, you need to create the
 * secret through the managing service. For more information, see Secrets Manager secrets
 * managed by other Amazon Web Services services.
 *
 * For information about creating a secret in the console, see Create a
 * secret.
 *
 * To create a secret, you can provide the secret value to be encrypted in either the
 * `SecretString` parameter or the `SecretBinary` parameter, but
 * not both. If you include `SecretString` or `SecretBinary` then
 * Secrets Manager creates an initial secret version and automatically attaches the staging label
 * `AWSCURRENT` to it.
 *
 * For database credentials you want to rotate, for Secrets Manager to be able to rotate the
 * secret, you must make sure the JSON you store in the `SecretString` matches
 * the JSON
 * structure of a database secret.
 *
 * If you don't specify an KMS encryption key, Secrets Manager uses the Amazon Web Services managed key
 * `aws/secretsmanager`. If this key doesn't already exist in your account,
 * then Secrets Manager creates it for you automatically. All users and roles in the Amazon Web Services account
 * automatically have access to use `aws/secretsmanager`. Creating
 * `aws/secretsmanager` can result in a one-time significant delay in
 * returning the result.
 *
 * If the secret is in a different Amazon Web Services account from the credentials calling the API,
 * then you can't use `aws/secretsmanager` to encrypt the secret, and you must
 * create and use a customer managed KMS key.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action.
 * Do not include sensitive information in request parameters except
 * `SecretBinary` or `SecretString` because it might be logged.
 * For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:CreateSecret`. If you include tags in the
 * secret, you also need `secretsmanager:TagResource`. To add replica Regions,
 * you must also have `secretsmanager:ReplicateSecretToRegions`.
 * For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 *
 * To encrypt the secret with a KMS key other than `aws/secretsmanager`, you
 * need `kms:GenerateDataKey` and `kms:Decrypt` permission to the
 * key.
 *
 * When you enter commands in a command shell, there is a risk of the command history being accessed or utilities having access to your command parameters. This is a concern if the command includes the value of a secret. Learn how to Mitigate the risks of using command-line tools to store Secrets Manager secrets.
 */
export const createSecret: API.OperationMethod<
  CreateSecretRequest,
  CreateSecretResponse,
  CreateSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSecretRequest,
  output: CreateSecretResponse,
  errors: [
    DecryptionFailure,
    EncryptionFailure,
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    MalformedPolicyDocumentException,
    PreconditionNotMetException,
    ResourceExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSecret",
}));

export type DeleteResourcePolicyError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the resource-based permission policy attached to the secret. To attach a
 * policy to a secret, use PutResourcePolicy.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:DeleteResourcePolicy`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourcePolicyRequest,
  output: DeleteResourcePolicyResponse,
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DeleteSecretError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a secret and all of its versions. You can specify a recovery window during
 * which you can restore the secret. The minimum recovery window is 7 days. The default
 * recovery window is 30 days. Secrets Manager attaches a `DeletionDate` stamp to the
 * secret that specifies the end of the recovery window. At the end of the recovery window,
 * Secrets Manager deletes the secret permanently.
 *
 * You can't delete a primary secret that is replicated to other Regions. You must first
 * delete the replicas using RemoveRegionsFromReplication, and then
 * delete the primary secret. When you delete a replica, it is deleted immediately.
 *
 * You can't directly delete a version of a secret. Instead, you remove all staging
 * labels from the version using UpdateSecretVersionStage. This marks the
 * version as deprecated, and then Secrets Manager can automatically delete the version in the
 * background.
 *
 * To determine whether an application still uses a secret, you can create an Amazon CloudWatch alarm
 * to alert you to any attempts to access a secret during the recovery window. For more
 * information, see
 * Monitor secrets scheduled for deletion.
 *
 * Secrets Manager performs the permanent secret deletion at the end of the waiting period as a
 * background task with low priority. There is no guarantee of a specific time after the
 * recovery window for the permanent delete to occur.
 *
 * At any time before recovery window ends, you can use RestoreSecret
 * to remove the `DeletionDate` and cancel the deletion of the secret.
 *
 * When a secret is scheduled for deletion, you cannot retrieve the secret value. You
 * must first cancel the deletion with RestoreSecret and then you can
 * retrieve the secret.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:DeleteSecret`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const deleteSecret: API.OperationMethod<
  DeleteSecretRequest,
  DeleteSecretResponse,
  DeleteSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSecretRequest,
  output: DeleteSecretResponse,
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSecret",
}));

export type DescribeSecretError =
  | InternalServiceError
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the details of a secret. It does not include the encrypted secret value.
 * Secrets Manager only returns fields that have a value in the response.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:DescribeSecret`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const describeSecret: API.OperationMethod<
  DescribeSecretRequest,
  DescribeSecretResponse,
  DescribeSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSecretRequest,
  output: DescribeSecretResponse,
  errors: [
    InternalServiceError,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSecret",
}));

export type GetRandomPasswordError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | CommonErrors;
/**
 * Generates a random password. We recommend that you specify the maximum length and
 * include every character type that the system you are generating a password for can
 * support. By default, Secrets Manager uses uppercase and lowercase letters, numbers, and the
 * following characters in passwords:
 * `!\"#$%&'()*+,-./:;?@[\\]^_`{|}~`
 *
 * Secrets Manager generates a CloudTrail log entry when you call this
 * action.
 *
 * Required permissions:
 *
 * `secretsmanager:GetRandomPassword`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const getRandomPassword: API.OperationMethod<
  GetRandomPasswordRequest,
  GetRandomPasswordResponse,
  GetRandomPasswordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRandomPasswordRequest,
  output: GetRandomPasswordResponse,
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRandomPassword",
}));

export type GetResourcePolicyError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the JSON text of the resource-based policy document attached to the secret.
 * For more information about permissions policies attached to a secret, see Permissions policies attached to a secret.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:GetResourcePolicy`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourcePolicyRequest,
  output: GetResourcePolicyResponse,
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type GetSecretValueError =
  | DecryptionFailure
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the contents of the encrypted fields `SecretString` or
 * `SecretBinary` from the specified version of a secret, whichever contains
 * content.
 *
 * To retrieve the values for a group of secrets, call BatchGetSecretValue.
 *
 * We recommend that you cache your secret values by using client-side caching. Caching
 * secrets improves speed and reduces your costs. For more information, see Cache secrets for your applications.
 *
 * To retrieve the previous version of a secret, use `VersionStage` and
 * specify AWSPREVIOUS. To revert to the previous version of a secret, call UpdateSecretVersionStage.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:GetSecretValue`. If the secret is encrypted
 * using a customer-managed key instead of the Amazon Web Services managed key
 * `aws/secretsmanager`, then you also need `kms:Decrypt`
 * permissions for that key. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const getSecretValue: API.OperationMethod<
  GetSecretValueRequest,
  GetSecretValueResponse,
  GetSecretValueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSecretValueRequest,
  output: GetSecretValueResponse,
  errors: [
    DecryptionFailure,
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSecretValue",
}));

export type ListSecretsError =
  | InternalServiceError
  | InvalidNextTokenException
  | InvalidParameterException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists the secrets that are stored by Secrets Manager in the Amazon Web Services account, not including secrets
 * that are marked for deletion. To see secrets marked for deletion, use the Secrets Manager
 * console.
 *
 * All Secrets Manager operations are eventually consistent. ListSecrets might not
 * reflect changes from the last five minutes. You can get more recent information for a
 * specific secret by calling DescribeSecret.
 *
 * To list the versions of a secret, use ListSecretVersionIds.
 *
 * To retrieve the values for the secrets, call BatchGetSecretValue or
 * GetSecretValue.
 *
 * For information about finding secrets in the console, see Find secrets in
 * Secrets Manager.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:ListSecrets`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const listSecrets: API.PaginatedOperationMethod<
  ListSecretsRequest,
  ListSecretsResponse,
  ListSecretsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSecretsRequest,
  output: ListSecretsResponse,
  errors: [
    InternalServiceError,
    InvalidNextTokenException,
    InvalidParameterException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecrets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSecretVersionIdsError =
  | InternalServiceError
  | InvalidNextTokenException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the versions of a secret. Secrets Manager uses staging labels to indicate the different
 * versions of a secret. For more information, see Secrets Manager
 * concepts: Versions.
 *
 * To list the secrets in the account, use ListSecrets.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:ListSecretVersionIds`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const listSecretVersionIds: API.PaginatedOperationMethod<
  ListSecretVersionIdsRequest,
  ListSecretVersionIdsResponse,
  ListSecretVersionIdsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSecretVersionIdsRequest,
  output: ListSecretVersionIdsResponse,
  errors: [
    InternalServiceError,
    InvalidNextTokenException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSecretVersionIds",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutResourcePolicyError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | MalformedPolicyDocumentException
  | PublicPolicyException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Attaches a resource-based permission policy to a secret. A resource-based policy is
 * optional. For more information, see Authentication and access control for Secrets Manager
 *
 * For information about attaching a policy in the console, see Attach a permissions policy to a secret.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:PutResourcePolicy`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutResourcePolicyRequest,
  output: PutResourcePolicyResponse,
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    MalformedPolicyDocumentException,
    PublicPolicyException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type PutSecretValueError =
  | DecryptionFailure
  | EncryptionFailure
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a new version of your secret by creating a new encrypted value and attaching
 * it to the secret. version can contain a new `SecretString` value or a new
 * `SecretBinary` value.
 *
 * Do not call `PutSecretValue` at a sustained rate of more than once every 10
 * minutes. When you update the secret value, Secrets Manager creates a new version of the secret.
 * Secrets Manager keeps 100 of the most recent versions, but it keeps *all*
 * secret versions created in the last 24 hours. If you call `PutSecretValue`
 * more than once every 10 minutes, you will create more versions than Secrets Manager removes, and
 * you will reach the quota for secret versions.
 *
 * You can specify the staging labels to attach to the new version in
 * `VersionStages`. If you don't include `VersionStages`, then
 * Secrets Manager automatically moves the staging label `AWSCURRENT` to this version. If
 * this operation creates the first version for the secret, then Secrets Manager automatically
 * attaches the staging label `AWSCURRENT` to it. If this operation moves the
 * staging label `AWSCURRENT` from another version to this version, then Secrets Manager
 * also automatically moves the staging label `AWSPREVIOUS` to the version that
 * `AWSCURRENT` was removed from.
 *
 * This operation is idempotent. If you call this operation with a
 * `ClientRequestToken` that matches an existing version's VersionId, and
 * you specify the same secret data, the operation succeeds but does nothing. However, if
 * the secret data is different, then the operation fails because you can't modify an
 * existing version; you can only create new ones.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action.
 * Do not include sensitive information in request parameters except
 * `SecretBinary`, `SecretString`, or `RotationToken`
 * because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:PutSecretValue`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 *
 * When you enter commands in a command shell, there is a risk of the command history being accessed or utilities having access to your command parameters. This is a concern if the command includes the value of a secret. Learn how to Mitigate the risks of using command-line tools to store Secrets Manager secrets.
 */
export const putSecretValue: API.OperationMethod<
  PutSecretValueRequest,
  PutSecretValueResponse,
  PutSecretValueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutSecretValueRequest,
  output: PutSecretValueResponse,
  errors: [
    DecryptionFailure,
    EncryptionFailure,
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSecretValue",
}));

export type RemoveRegionsFromReplicationError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * For a secret that is replicated to other Regions, deletes the secret replicas from the
 * Regions you specify.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:RemoveRegionsFromReplication`.
 * For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const removeRegionsFromReplication: API.OperationMethod<
  RemoveRegionsFromReplicationRequest,
  RemoveRegionsFromReplicationResponse,
  RemoveRegionsFromReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveRegionsFromReplicationRequest,
  output: RemoveRegionsFromReplicationResponse,
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveRegionsFromReplication",
}));

export type ReplicateSecretToRegionsError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Replicates the secret to a new Regions. See Multi-Region secrets.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:ReplicateSecretToRegions`. If the primary
 * secret is encrypted with a KMS key other than `aws/secretsmanager`, you also
 * need `kms:Decrypt` permission to the key. To encrypt the replicated secret
 * with a KMS key other than `aws/secretsmanager`, you need
 * `kms:GenerateDataKey` and `kms:Encrypt` to the key.
 * For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const replicateSecretToRegions: API.OperationMethod<
  ReplicateSecretToRegionsRequest,
  ReplicateSecretToRegionsResponse,
  ReplicateSecretToRegionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ReplicateSecretToRegionsRequest,
  output: ReplicateSecretToRegionsResponse,
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReplicateSecretToRegions",
}));

export type RestoreSecretError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Cancels the scheduled deletion of a secret by removing the `DeletedDate`
 * time stamp. You can access a secret again after it has been restored.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:RestoreSecret`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const restoreSecret: API.OperationMethod<
  RestoreSecretRequest,
  RestoreSecretResponse,
  RestoreSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestoreSecretRequest,
  output: RestoreSecretResponse,
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreSecret",
}));

export type RotateSecretError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Configures and starts the asynchronous process of rotating the secret. For information
 * about rotation, see Rotate secrets
 * in the *Secrets Manager User Guide*. If you include the configuration
 * parameters, the operation sets the values for the secret and then immediately starts a
 * rotation. If you don't include the configuration parameters, the operation starts a
 * rotation with the values already stored in the secret.
 *
 * When rotation is successful, the `AWSPENDING` staging label might be
 * attached to the same version as the `AWSCURRENT` version, or it might not be
 * attached to any version. If the `AWSPENDING` staging label is present but not
 * attached to the same version as `AWSCURRENT`, then any later invocation of
 * `RotateSecret` assumes that a previous rotation request is still in
 * progress and returns an error. When rotation is unsuccessful, the
 * `AWSPENDING` staging label might be attached to an empty secret version.
 * For more information, see Troubleshoot
 * rotation in the *Secrets Manager User Guide*.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:RotateSecret`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager. You also
 * need `lambda:InvokeFunction` permissions on the rotation function. For more
 * information, see Permissions for rotation.
 */
export const rotateSecret: API.OperationMethod<
  RotateSecretRequest,
  RotateSecretResponse,
  RotateSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RotateSecretRequest,
  output: RotateSecretResponse,
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RotateSecret",
}));

export type StopReplicationToReplicaError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes the link between the replica secret and the primary secret and promotes the
 * replica to a primary secret in the replica Region.
 *
 * You must call this operation from the Region in which you want to promote the replica
 * to a primary secret.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:StopReplicationToReplica`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const stopReplicationToReplica: API.OperationMethod<
  StopReplicationToReplicaRequest,
  StopReplicationToReplicaResponse,
  StopReplicationToReplicaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopReplicationToReplicaRequest,
  output: StopReplicationToReplicaResponse,
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopReplicationToReplica",
}));

export type TagResourceError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Attaches tags to a secret. Tags consist of a key name and a value. Tags are part of
 * the secret's metadata. They are not associated with specific versions of the secret.
 * This operation appends tags to the existing list of tags.
 *
 * For tag quotas and naming restrictions, see Service quotas for
 * Tagging in the *Amazon Web Services General Reference guide*.
 *
 * If you use tags as part of your security strategy, then adding or removing a tag
 * can change permissions. If successfully completing this operation would result in
 * you losing your permissions for this secret, then the operation is blocked and
 * returns an Access Denied error.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:TagResource`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
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
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes specific tags from a secret.
 *
 * This operation is idempotent. If a requested tag is not attached to the secret, no
 * error is returned and the secret metadata is unchanged.
 *
 * If you use tags as part of your security strategy, then removing a tag can change
 * permissions. If successfully completing this operation would result in you losing
 * your permissions for this secret, then the operation is blocked and returns an
 * Access Denied error.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:UntagResource`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
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
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateSecretError =
  | DecryptionFailure
  | EncryptionFailure
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | MalformedPolicyDocumentException
  | PreconditionNotMetException
  | ResourceExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Modifies the details of a secret, including metadata and the secret value. To change
 * the secret value, you can also use PutSecretValue.
 *
 * To change the rotation configuration of a secret, use RotateSecret
 * instead.
 *
 * To change a secret so that it is managed by another service, you need to recreate the
 * secret in that service. See Secrets Manager secrets
 * managed by other Amazon Web Services services.
 *
 * We recommend you avoid calling `UpdateSecret` at a sustained rate of more
 * than once every 10 minutes. When you call `UpdateSecret` to update the secret
 * value, Secrets Manager creates a new version of the secret. Secrets Manager removes outdated versions when
 * there are more than 100, but it does not remove versions created less than 24 hours ago.
 * If you update the secret value more than once every 10 minutes, you create more versions
 * than Secrets Manager removes, and you will reach the quota for secret versions.
 *
 * If you include `SecretString` or `SecretBinary` to create a new
 * secret version, Secrets Manager automatically moves the staging label `AWSCURRENT` to
 * the new version. Then it attaches the label `AWSPREVIOUS` to the version that
 * `AWSCURRENT` was removed from.
 *
 * If you call this operation with a `ClientRequestToken` that matches an
 * existing version's `VersionId`, the operation results in an error. You can't
 * modify an existing version, you can only create a new version. To remove a version,
 * remove all staging labels from it. See UpdateSecretVersionStage.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action.
 * Do not include sensitive information in request parameters except
 * `SecretBinary` or `SecretString` because it might be logged.
 * For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:UpdateSecret`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager. If you use a
 * customer managed key, you must also have `kms:GenerateDataKey`,
 * `kms:Encrypt`, and `kms:Decrypt` permissions on the key. If
 * you change the KMS key and you don't have `kms:Encrypt` permission to the new
 * key, Secrets Manager does not re-encrypt existing secret versions with the new key. For more
 * information, see Secret encryption
 * and decryption.
 *
 * When you enter commands in a command shell, there is a risk of the command history being accessed or utilities having access to your command parameters. This is a concern if the command includes the value of a secret. Learn how to Mitigate the risks of using command-line tools to store Secrets Manager secrets.
 */
export const updateSecret: API.OperationMethod<
  UpdateSecretRequest,
  UpdateSecretResponse,
  UpdateSecretError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSecretRequest,
  output: UpdateSecretResponse,
  errors: [
    DecryptionFailure,
    EncryptionFailure,
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    MalformedPolicyDocumentException,
    PreconditionNotMetException,
    ResourceExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSecret",
}));

export type UpdateSecretVersionStageError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Modifies the staging labels attached to a version of a secret. Secrets Manager uses staging
 * labels to track a version as it progresses through the secret rotation process. Each
 * staging label can be attached to only one version at a time. To add a staging label to a
 * version when it is already attached to another version, Secrets Manager first removes it from the
 * other version first and then attaches it to this one. For more information about
 * versions and staging labels, see Concepts:
 * Version.
 *
 * The staging labels that you specify in the `VersionStage` parameter are
 * added to the existing list of staging labels for the version.
 *
 * You can move the `AWSCURRENT` staging label to this version by including it
 * in this call.
 *
 * Whenever you move `AWSCURRENT`, Secrets Manager automatically moves the label
 * `AWSPREVIOUS` to the version that `AWSCURRENT` was removed
 * from.
 *
 * If this action results in the last label being removed from a version, then the
 * version is considered to be 'deprecated' and can be deleted by Secrets Manager.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:UpdateSecretVersionStage`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const updateSecretVersionStage: API.OperationMethod<
  UpdateSecretVersionStageRequest,
  UpdateSecretVersionStageResponse,
  UpdateSecretVersionStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSecretVersionStageRequest,
  output: UpdateSecretVersionStageResponse,
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSecretVersionStage",
}));

export type ValidateResourcePolicyError =
  | InternalServiceError
  | InvalidParameterException
  | InvalidRequestException
  | MalformedPolicyDocumentException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Validates that a resource policy does not grant a wide range of principals access to
 * your secret. A resource-based policy is optional for secrets.
 *
 * The API performs three checks when validating the policy:
 *
 * - Sends a call to Zelkova, an automated reasoning engine, to ensure your resource
 * policy does not allow broad access to your secret, for example policies that use
 * a wildcard for the principal.
 *
 * - Checks for correct syntax in a policy.
 *
 * - Verifies the policy does not lock out a caller.
 *
 * Secrets Manager generates a CloudTrail log entry when you call this action. Do not include sensitive information in request parameters because it might be logged. For more information, see Logging Secrets Manager events with CloudTrail.
 *
 * Required permissions:
 *
 * `secretsmanager:ValidateResourcePolicy` and
 * `secretsmanager:PutResourcePolicy`. For more information, see
 * IAM policy actions for Secrets Manager and Authentication
 * and access control in Secrets Manager.
 */
export const validateResourcePolicy: API.OperationMethod<
  ValidateResourcePolicyRequest,
  ValidateResourcePolicyResponse,
  ValidateResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ValidateResourcePolicyRequest,
  output: ValidateResourcePolicyResponse,
  errors: [
    InternalServiceError,
    InvalidParameterException,
    InvalidRequestException,
    MalformedPolicyDocumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateResourcePolicy",
}));
