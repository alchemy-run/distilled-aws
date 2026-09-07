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
  sdkId: "DataExchange",
  serviceShapeName: "DataExchange",
});
const auth = T.AwsAuthSigv4({ name: "dataexchange" });
const ver = T.ServiceVersion("2017-07-25");
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
              `https://dataexchange-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://dataexchange-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://dataexchange.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://dataexchange.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.optional(S.String),
      ResourceType: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.optional(S.String),
      ResourceType: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceLimitExceededException>()(
    "ServiceLimitExceededException",
    {
      LimitName: S.optional(S.String),
      LimitValue: S.optional(S.Number),
      message: S.String.pipe(T.ErrorMessage()),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ExceptionCause: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DataGrantArn = string;
export interface AcceptDataGrantRequest {
  DataGrantArn: string;
}
export const AcceptDataGrantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataGrantArn: S.String.pipe(T.HttpLabel("DataGrantArn")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/data-grants/{DataGrantArn}/accept" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AcceptDataGrantRequest",
}) as any as S.Schema<AcceptDataGrantRequest>;
export type DataGrantName = string;
export type SenderPrincipal = string;
export type ReceiverPrincipal = string;
export type DataGrantDescription = string;
export type DataGrantAcceptanceState = string;
export type GrantDistributionScope = string;
export type Id = string;
export type Arn = string;
export interface AcceptDataGrantResponse {
  Name: string;
  SenderPrincipal?: string;
  ReceiverPrincipal: string;
  Description?: string;
  AcceptanceState: string;
  AcceptedAt?: Date;
  EndsAt?: Date;
  GrantDistributionScope: string;
  DataSetId: string;
  Id: string;
  Arn: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}
export const AcceptDataGrantResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    SenderPrincipal: S.optional(S.String),
    ReceiverPrincipal: S.String,
    Description: S.optional(S.String),
    AcceptanceState: S.String,
    AcceptedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndsAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    GrantDistributionScope: S.String,
    DataSetId: S.String,
    Id: S.String,
    Arn: S.String,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "AcceptDataGrantResponse",
}) as any as S.Schema<AcceptDataGrantResponse>;
export interface CancelJobRequest {
  JobId: string;
}
export const CancelJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String.pipe(T.HttpLabel("JobId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/jobs/{JobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelJobRequest",
}) as any as S.Schema<CancelJobRequest>;
export interface CancelJobResponse {}
export const CancelJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelJobResponse",
}) as any as S.Schema<CancelJobResponse>;
export type Description = string;
export type MapOf__string = { [key: string]: string | undefined };
export const MapOf__string = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateDataGrantRequest {
  Name: string;
  GrantDistributionScope: string;
  ReceiverPrincipal: string;
  SourceDataSetId: string;
  EndsAt?: Date;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateDataGrantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    GrantDistributionScope: S.String,
    ReceiverPrincipal: S.String,
    SourceDataSetId: S.String,
    EndsAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    Description: S.optional(S.String),
    Tags: S.optional(MapOf__string),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/data-grants" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDataGrantRequest",
}) as any as S.Schema<CreateDataGrantRequest>;
export interface CreateDataGrantResponse {
  Name: string;
  SenderPrincipal: string;
  ReceiverPrincipal: string;
  Description?: string;
  AcceptanceState: string;
  AcceptedAt?: Date;
  EndsAt?: Date;
  GrantDistributionScope: string;
  DataSetId: string;
  SourceDataSetId: string;
  Id: string;
  Arn: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  Tags?: { [key: string]: string | undefined };
}
export const CreateDataGrantResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    SenderPrincipal: S.String,
    ReceiverPrincipal: S.String,
    Description: S.optional(S.String),
    AcceptanceState: S.String,
    AcceptedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndsAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    GrantDistributionScope: S.String,
    DataSetId: S.String,
    SourceDataSetId: S.String,
    Id: S.String,
    Arn: S.String,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Tags: S.optional(MapOf__string),
  }),
).annotate({
  identifier: "CreateDataGrantResponse",
}) as any as S.Schema<CreateDataGrantResponse>;
export type AssetType = string;
export type Name = string;
export interface CreateDataSetRequest {
  AssetType: string;
  Description: string;
  Name: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateDataSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetType: S.String,
    Description: S.String,
    Name: S.String,
    Tags: S.optional(MapOf__string),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/data-sets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDataSetRequest",
}) as any as S.Schema<CreateDataSetRequest>;
export type Origin = string;
export interface OriginDetails {
  ProductId?: string;
  DataGrantId?: string;
}
export const OriginDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductId: S.optional(S.String),
    DataGrantId: S.optional(S.String),
  }),
).annotate({ identifier: "OriginDetails" }) as any as S.Schema<OriginDetails>;
export interface CreateDataSetResponse {
  Arn?: string;
  AssetType?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  Name?: string;
  Origin?: string;
  OriginDetails?: OriginDetails;
  SourceId?: string;
  Tags?: { [key: string]: string | undefined };
  UpdatedAt?: Date;
}
export const CreateDataSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AssetType: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Origin: S.optional(S.String),
    OriginDetails: S.optional(OriginDetails),
    SourceId: S.optional(S.String),
    Tags: S.optional(MapOf__string),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CreateDataSetResponse",
}) as any as S.Schema<CreateDataSetResponse>;
export type ServerSideEncryptionTypes = string;
export interface ExportServerSideEncryption {
  KmsKeyArn?: string;
  Type: string;
}
export const ExportServerSideEncryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ KmsKeyArn: S.optional(S.String), Type: S.String }),
).annotate({
  identifier: "ExportServerSideEncryption",
}) as any as S.Schema<ExportServerSideEncryption>;
export interface AutoExportRevisionDestinationEntry {
  Bucket: string;
  KeyPattern?: string;
}
export const AutoExportRevisionDestinationEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bucket: S.String, KeyPattern: S.optional(S.String) }),
).annotate({
  identifier: "AutoExportRevisionDestinationEntry",
}) as any as S.Schema<AutoExportRevisionDestinationEntry>;
export interface AutoExportRevisionToS3RequestDetails {
  Encryption?: ExportServerSideEncryption;
  RevisionDestination: AutoExportRevisionDestinationEntry;
}
export const AutoExportRevisionToS3RequestDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Encryption: S.optional(ExportServerSideEncryption),
      RevisionDestination: AutoExportRevisionDestinationEntry,
    }),
).annotate({
  identifier: "AutoExportRevisionToS3RequestDetails",
}) as any as S.Schema<AutoExportRevisionToS3RequestDetails>;
export interface Action {
  ExportRevisionToS3?: AutoExportRevisionToS3RequestDetails;
}
export const Action = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportRevisionToS3: S.optional(AutoExportRevisionToS3RequestDetails),
  }),
).annotate({ identifier: "Action" }) as any as S.Schema<Action>;
export interface RevisionPublished {
  DataSetId: string;
}
export const RevisionPublished = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataSetId: S.String }),
).annotate({
  identifier: "RevisionPublished",
}) as any as S.Schema<RevisionPublished>;
export interface Event {
  RevisionPublished?: RevisionPublished;
}
export const Event = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RevisionPublished: S.optional(RevisionPublished) }),
).annotate({ identifier: "Event" }) as any as S.Schema<Event>;
export interface CreateEventActionRequest {
  Action: Action;
  Event: Event;
  Tags?: { [key: string]: string | undefined };
}
export const CreateEventActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: Action,
    Event: Event,
    Tags: S.optional(MapOf__string),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/event-actions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEventActionRequest",
}) as any as S.Schema<CreateEventActionRequest>;
export interface CreateEventActionResponse {
  Action?: Action;
  Arn?: string;
  CreatedAt?: Date;
  Event?: Event;
  Id?: string;
  Tags?: { [key: string]: string | undefined };
  UpdatedAt?: Date;
}
export const CreateEventActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(Action),
    Arn: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Event: S.optional(Event),
    Id: S.optional(S.String),
    Tags: S.optional(MapOf__string),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CreateEventActionResponse",
}) as any as S.Schema<CreateEventActionResponse>;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type ListOfTag = Tag[];
export const ListOfTag = /*@__PURE__*/ S.Array(Tag);
export interface AssetConfiguration {
  Tags?: Tag[];
}
export const AssetConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(ListOfTag) }),
).annotate({
  identifier: "AssetConfiguration",
}) as any as S.Schema<AssetConfiguration>;
export interface ExportAssetToSignedUrlRequestDetails {
  AssetId: string;
  DataSetId: string;
  RevisionId: string;
}
export const ExportAssetToSignedUrlRequestDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ AssetId: S.String, DataSetId: S.String, RevisionId: S.String }),
).annotate({
  identifier: "ExportAssetToSignedUrlRequestDetails",
}) as any as S.Schema<ExportAssetToSignedUrlRequestDetails>;
export interface AssetDestinationEntry {
  AssetId: string;
  Bucket: string;
  Key?: string;
}
export const AssetDestinationEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AssetId: S.String, Bucket: S.String, Key: S.optional(S.String) }),
).annotate({
  identifier: "AssetDestinationEntry",
}) as any as S.Schema<AssetDestinationEntry>;
export type ListOfAssetDestinationEntry = AssetDestinationEntry[];
export const ListOfAssetDestinationEntry = /*@__PURE__*/ S.Array(
  AssetDestinationEntry,
);
export interface ExportAssetsToS3RequestDetails {
  AssetDestinations: AssetDestinationEntry[];
  DataSetId: string;
  Encryption?: ExportServerSideEncryption;
  RevisionId: string;
}
export const ExportAssetsToS3RequestDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetDestinations: ListOfAssetDestinationEntry,
    DataSetId: S.String,
    Encryption: S.optional(ExportServerSideEncryption),
    RevisionId: S.String,
  }),
).annotate({
  identifier: "ExportAssetsToS3RequestDetails",
}) as any as S.Schema<ExportAssetsToS3RequestDetails>;
export interface RevisionDestinationEntry {
  Bucket: string;
  KeyPattern?: string;
  RevisionId: string;
}
export const RevisionDestinationEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bucket: S.String,
    KeyPattern: S.optional(S.String),
    RevisionId: S.String,
  }),
).annotate({
  identifier: "RevisionDestinationEntry",
}) as any as S.Schema<RevisionDestinationEntry>;
export type ListOfRevisionDestinationEntry = RevisionDestinationEntry[];
export const ListOfRevisionDestinationEntry = /*@__PURE__*/ S.Array(
  RevisionDestinationEntry,
);
export interface ExportRevisionsToS3RequestDetails {
  DataSetId: string;
  Encryption?: ExportServerSideEncryption;
  RevisionDestinations: RevisionDestinationEntry[];
}
export const ExportRevisionsToS3RequestDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSetId: S.String,
    Encryption: S.optional(ExportServerSideEncryption),
    RevisionDestinations: ListOfRevisionDestinationEntry,
  }),
).annotate({
  identifier: "ExportRevisionsToS3RequestDetails",
}) as any as S.Schema<ExportRevisionsToS3RequestDetails>;
export type AssetName = string;
export type __stringMin24Max24PatternAZaZ094AZaZ092AZaZ093 = string;
export interface ImportAssetFromSignedUrlRequestDetails {
  AssetName: string;
  DataSetId: string;
  Md5Hash: string;
  RevisionId: string;
}
export const ImportAssetFromSignedUrlRequestDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AssetName: S.String,
      DataSetId: S.String,
      Md5Hash: S.String,
      RevisionId: S.String,
    }),
).annotate({
  identifier: "ImportAssetFromSignedUrlRequestDetails",
}) as any as S.Schema<ImportAssetFromSignedUrlRequestDetails>;
export interface AssetSourceEntry {
  Bucket: string;
  Key: string;
}
export const AssetSourceEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Bucket: S.String, Key: S.String }),
).annotate({
  identifier: "AssetSourceEntry",
}) as any as S.Schema<AssetSourceEntry>;
export type ListOfAssetSourceEntry = AssetSourceEntry[];
export const ListOfAssetSourceEntry = /*@__PURE__*/ S.Array(AssetSourceEntry);
export interface ImportAssetsFromS3RequestDetails {
  AssetSources: AssetSourceEntry[];
  DataSetId: string;
  RevisionId: string;
}
export const ImportAssetsFromS3RequestDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetSources: ListOfAssetSourceEntry,
    DataSetId: S.String,
    RevisionId: S.String,
  }),
).annotate({
  identifier: "ImportAssetsFromS3RequestDetails",
}) as any as S.Schema<ImportAssetsFromS3RequestDetails>;
export interface RedshiftDataShareAssetSourceEntry {
  DataShareArn: string;
}
export const RedshiftDataShareAssetSourceEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataShareArn: S.String }),
).annotate({
  identifier: "RedshiftDataShareAssetSourceEntry",
}) as any as S.Schema<RedshiftDataShareAssetSourceEntry>;
export type ListOfRedshiftDataShareAssetSourceEntry =
  RedshiftDataShareAssetSourceEntry[];
export const ListOfRedshiftDataShareAssetSourceEntry = /*@__PURE__*/ S.Array(
  RedshiftDataShareAssetSourceEntry,
);
export interface ImportAssetsFromRedshiftDataSharesRequestDetails {
  AssetSources: RedshiftDataShareAssetSourceEntry[];
  DataSetId: string;
  RevisionId: string;
}
export const ImportAssetsFromRedshiftDataSharesRequestDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AssetSources: ListOfRedshiftDataShareAssetSourceEntry,
      DataSetId: S.String,
      RevisionId: S.String,
    }),
  ).annotate({
    identifier: "ImportAssetsFromRedshiftDataSharesRequestDetails",
  }) as any as S.Schema<ImportAssetsFromRedshiftDataSharesRequestDetails>;
export type ApiDescription = string;
export type ProtocolType = string;
export interface ImportAssetFromApiGatewayApiRequestDetails {
  ApiDescription?: string;
  ApiId: string;
  ApiKey?: string | redacted.Redacted<string>;
  ApiName: string;
  ApiSpecificationMd5Hash: string;
  DataSetId: string;
  ProtocolType: string;
  RevisionId: string;
  Stage: string;
}
export const ImportAssetFromApiGatewayApiRequestDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApiDescription: S.optional(S.String),
      ApiId: S.String,
      ApiKey: S.optional(SensitiveString),
      ApiName: S.String,
      ApiSpecificationMd5Hash: S.String,
      DataSetId: S.String,
      ProtocolType: S.String,
      RevisionId: S.String,
      Stage: S.String,
    }),
  ).annotate({
    identifier: "ImportAssetFromApiGatewayApiRequestDetails",
  }) as any as S.Schema<ImportAssetFromApiGatewayApiRequestDetails>;
export type ListOf__string = string[];
export const ListOf__string = /*@__PURE__*/ S.Array(S.String);
export type KmsKeyArn = string;
export interface KmsKeyToGrant {
  KmsKeyArn: string;
}
export const KmsKeyToGrant = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ KmsKeyArn: S.String }),
).annotate({ identifier: "KmsKeyToGrant" }) as any as S.Schema<KmsKeyToGrant>;
export type ListOfKmsKeysToGrant = KmsKeyToGrant[];
export const ListOfKmsKeysToGrant = /*@__PURE__*/ S.Array(KmsKeyToGrant);
export interface S3DataAccessAssetSourceEntry {
  Bucket: string;
  KeyPrefixes?: string[];
  Keys?: string[];
  KmsKeysToGrant?: KmsKeyToGrant[];
}
export const S3DataAccessAssetSourceEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bucket: S.String,
    KeyPrefixes: S.optional(ListOf__string),
    Keys: S.optional(ListOf__string),
    KmsKeysToGrant: S.optional(ListOfKmsKeysToGrant),
  }),
).annotate({
  identifier: "S3DataAccessAssetSourceEntry",
}) as any as S.Schema<S3DataAccessAssetSourceEntry>;
export interface CreateS3DataAccessFromS3BucketRequestDetails {
  AssetSource: S3DataAccessAssetSourceEntry;
  DataSetId: string;
  RevisionId: string;
}
export const CreateS3DataAccessFromS3BucketRequestDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AssetSource: S3DataAccessAssetSourceEntry,
      DataSetId: S.String,
      RevisionId: S.String,
    }),
  ).annotate({
    identifier: "CreateS3DataAccessFromS3BucketRequestDetails",
  }) as any as S.Schema<CreateS3DataAccessFromS3BucketRequestDetails>;
export type AwsAccountId = string;
export type ListOfLFTagValues = string[];
export const ListOfLFTagValues = /*@__PURE__*/ S.Array(S.String);
export interface LFTag {
  TagKey: string;
  TagValues: string[];
}
export const LFTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TagKey: S.String, TagValues: ListOfLFTagValues }),
).annotate({ identifier: "LFTag" }) as any as S.Schema<LFTag>;
export type ListOfLFTags = LFTag[];
export const ListOfLFTags = /*@__PURE__*/ S.Array(LFTag);
export type DatabaseLFTagPolicyPermission = string;
export type ListOfDatabaseLFTagPolicyPermissions = string[];
export const ListOfDatabaseLFTagPolicyPermissions = /*@__PURE__*/ S.Array(
  S.String,
);
export interface DatabaseLFTagPolicyAndPermissions {
  Expression: LFTag[];
  Permissions: string[];
}
export const DatabaseLFTagPolicyAndPermissions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Expression: ListOfLFTags,
    Permissions: ListOfDatabaseLFTagPolicyPermissions,
  }),
).annotate({
  identifier: "DatabaseLFTagPolicyAndPermissions",
}) as any as S.Schema<DatabaseLFTagPolicyAndPermissions>;
export type TableTagPolicyLFPermission = string;
export type ListOfTableTagPolicyLFPermissions = string[];
export const ListOfTableTagPolicyLFPermissions = /*@__PURE__*/ S.Array(
  S.String,
);
export interface TableLFTagPolicyAndPermissions {
  Expression: LFTag[];
  Permissions: string[];
}
export const TableLFTagPolicyAndPermissions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Expression: ListOfLFTags,
    Permissions: ListOfTableTagPolicyLFPermissions,
  }),
).annotate({
  identifier: "TableLFTagPolicyAndPermissions",
}) as any as S.Schema<TableLFTagPolicyAndPermissions>;
export type RoleArn = string;
export interface ImportAssetsFromLakeFormationTagPolicyRequestDetails {
  CatalogId: string;
  Database?: DatabaseLFTagPolicyAndPermissions;
  Table?: TableLFTagPolicyAndPermissions;
  RoleArn: string;
  DataSetId: string;
  RevisionId: string;
}
export const ImportAssetsFromLakeFormationTagPolicyRequestDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CatalogId: S.String,
      Database: S.optional(DatabaseLFTagPolicyAndPermissions),
      Table: S.optional(TableLFTagPolicyAndPermissions),
      RoleArn: S.String,
      DataSetId: S.String,
      RevisionId: S.String,
    }),
  ).annotate({
    identifier: "ImportAssetsFromLakeFormationTagPolicyRequestDetails",
  }) as any as S.Schema<ImportAssetsFromLakeFormationTagPolicyRequestDetails>;
export interface RequestDetails {
  ExportAssetToSignedUrl?: ExportAssetToSignedUrlRequestDetails;
  ExportAssetsToS3?: ExportAssetsToS3RequestDetails;
  ExportRevisionsToS3?: ExportRevisionsToS3RequestDetails;
  ImportAssetFromSignedUrl?: ImportAssetFromSignedUrlRequestDetails;
  ImportAssetsFromS3?: ImportAssetsFromS3RequestDetails;
  ImportAssetsFromRedshiftDataShares?: ImportAssetsFromRedshiftDataSharesRequestDetails;
  ImportAssetFromApiGatewayApi?: ImportAssetFromApiGatewayApiRequestDetails;
  CreateS3DataAccessFromS3Bucket?: CreateS3DataAccessFromS3BucketRequestDetails;
  ImportAssetsFromLakeFormationTagPolicy?: ImportAssetsFromLakeFormationTagPolicyRequestDetails;
}
export const RequestDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportAssetToSignedUrl: S.optional(ExportAssetToSignedUrlRequestDetails),
    ExportAssetsToS3: S.optional(ExportAssetsToS3RequestDetails),
    ExportRevisionsToS3: S.optional(ExportRevisionsToS3RequestDetails),
    ImportAssetFromSignedUrl: S.optional(
      ImportAssetFromSignedUrlRequestDetails,
    ),
    ImportAssetsFromS3: S.optional(ImportAssetsFromS3RequestDetails),
    ImportAssetsFromRedshiftDataShares: S.optional(
      ImportAssetsFromRedshiftDataSharesRequestDetails,
    ),
    ImportAssetFromApiGatewayApi: S.optional(
      ImportAssetFromApiGatewayApiRequestDetails,
    ),
    CreateS3DataAccessFromS3Bucket: S.optional(
      CreateS3DataAccessFromS3BucketRequestDetails,
    ),
    ImportAssetsFromLakeFormationTagPolicy: S.optional(
      ImportAssetsFromLakeFormationTagPolicyRequestDetails,
    ),
  }),
).annotate({ identifier: "RequestDetails" }) as any as S.Schema<RequestDetails>;
export type Type = string;
export interface CreateJobRequest {
  AssetConfiguration?: AssetConfiguration;
  Details: RequestDetails;
  Type: string;
}
export const CreateJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetConfiguration: S.optional(AssetConfiguration),
    Details: RequestDetails,
    Type: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateJobRequest",
}) as any as S.Schema<CreateJobRequest>;
export interface ExportAssetToSignedUrlResponseDetails {
  AssetId: string;
  DataSetId: string;
  RevisionId: string;
  SignedUrl?: string;
  SignedUrlExpiresAt?: Date;
}
export const ExportAssetToSignedUrlResponseDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AssetId: S.String,
      DataSetId: S.String,
      RevisionId: S.String,
      SignedUrl: S.optional(S.String),
      SignedUrlExpiresAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
    }),
).annotate({
  identifier: "ExportAssetToSignedUrlResponseDetails",
}) as any as S.Schema<ExportAssetToSignedUrlResponseDetails>;
export interface ExportAssetsToS3ResponseDetails {
  AssetDestinations: AssetDestinationEntry[];
  DataSetId: string;
  Encryption?: ExportServerSideEncryption;
  RevisionId: string;
}
export const ExportAssetsToS3ResponseDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetDestinations: ListOfAssetDestinationEntry,
    DataSetId: S.String,
    Encryption: S.optional(ExportServerSideEncryption),
    RevisionId: S.String,
  }),
).annotate({
  identifier: "ExportAssetsToS3ResponseDetails",
}) as any as S.Schema<ExportAssetsToS3ResponseDetails>;
export interface ExportRevisionsToS3ResponseDetails {
  DataSetId: string;
  Encryption?: ExportServerSideEncryption;
  RevisionDestinations: RevisionDestinationEntry[];
  EventActionArn?: string;
}
export const ExportRevisionsToS3ResponseDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSetId: S.String,
    Encryption: S.optional(ExportServerSideEncryption),
    RevisionDestinations: ListOfRevisionDestinationEntry,
    EventActionArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ExportRevisionsToS3ResponseDetails",
}) as any as S.Schema<ExportRevisionsToS3ResponseDetails>;
export interface ImportAssetFromSignedUrlResponseDetails {
  AssetName: string;
  DataSetId: string;
  Md5Hash?: string;
  RevisionId: string;
  SignedUrl?: string;
  SignedUrlExpiresAt?: Date;
}
export const ImportAssetFromSignedUrlResponseDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AssetName: S.String,
      DataSetId: S.String,
      Md5Hash: S.optional(S.String),
      RevisionId: S.String,
      SignedUrl: S.optional(S.String),
      SignedUrlExpiresAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
    }),
).annotate({
  identifier: "ImportAssetFromSignedUrlResponseDetails",
}) as any as S.Schema<ImportAssetFromSignedUrlResponseDetails>;
export interface ImportAssetsFromS3ResponseDetails {
  AssetSources: AssetSourceEntry[];
  DataSetId: string;
  RevisionId: string;
}
export const ImportAssetsFromS3ResponseDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetSources: ListOfAssetSourceEntry,
    DataSetId: S.String,
    RevisionId: S.String,
  }),
).annotate({
  identifier: "ImportAssetsFromS3ResponseDetails",
}) as any as S.Schema<ImportAssetsFromS3ResponseDetails>;
export interface ImportAssetsFromRedshiftDataSharesResponseDetails {
  AssetSources: RedshiftDataShareAssetSourceEntry[];
  DataSetId: string;
  RevisionId: string;
}
export const ImportAssetsFromRedshiftDataSharesResponseDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AssetSources: ListOfRedshiftDataShareAssetSourceEntry,
      DataSetId: S.String,
      RevisionId: S.String,
    }),
  ).annotate({
    identifier: "ImportAssetsFromRedshiftDataSharesResponseDetails",
  }) as any as S.Schema<ImportAssetsFromRedshiftDataSharesResponseDetails>;
export interface ImportAssetFromApiGatewayApiResponseDetails {
  ApiDescription?: string;
  ApiId: string;
  ApiKey?: string | redacted.Redacted<string>;
  ApiName: string;
  ApiSpecificationMd5Hash: string;
  ApiSpecificationUploadUrl: string;
  ApiSpecificationUploadUrlExpiresAt: Date;
  DataSetId: string;
  ProtocolType: string;
  RevisionId: string;
  Stage: string;
}
export const ImportAssetFromApiGatewayApiResponseDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApiDescription: S.optional(S.String),
      ApiId: S.String,
      ApiKey: S.optional(SensitiveString),
      ApiName: S.String,
      ApiSpecificationMd5Hash: S.String,
      ApiSpecificationUploadUrl: S.String,
      ApiSpecificationUploadUrlExpiresAt: T.DateFromString.pipe(
        T.TimestampFormat("date-time"),
      ),
      DataSetId: S.String,
      ProtocolType: S.String,
      RevisionId: S.String,
      Stage: S.String,
    }),
  ).annotate({
    identifier: "ImportAssetFromApiGatewayApiResponseDetails",
  }) as any as S.Schema<ImportAssetFromApiGatewayApiResponseDetails>;
export interface CreateS3DataAccessFromS3BucketResponseDetails {
  AssetSource: S3DataAccessAssetSourceEntry;
  DataSetId: string;
  RevisionId: string;
}
export const CreateS3DataAccessFromS3BucketResponseDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AssetSource: S3DataAccessAssetSourceEntry,
      DataSetId: S.String,
      RevisionId: S.String,
    }),
  ).annotate({
    identifier: "CreateS3DataAccessFromS3BucketResponseDetails",
  }) as any as S.Schema<CreateS3DataAccessFromS3BucketResponseDetails>;
export interface ImportAssetsFromLakeFormationTagPolicyResponseDetails {
  CatalogId: string;
  Database?: DatabaseLFTagPolicyAndPermissions;
  Table?: TableLFTagPolicyAndPermissions;
  RoleArn: string;
  DataSetId: string;
  RevisionId: string;
}
export const ImportAssetsFromLakeFormationTagPolicyResponseDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CatalogId: S.String,
      Database: S.optional(DatabaseLFTagPolicyAndPermissions),
      Table: S.optional(TableLFTagPolicyAndPermissions),
      RoleArn: S.String,
      DataSetId: S.String,
      RevisionId: S.String,
    }),
  ).annotate({
    identifier: "ImportAssetsFromLakeFormationTagPolicyResponseDetails",
  }) as any as S.Schema<ImportAssetsFromLakeFormationTagPolicyResponseDetails>;
export interface ResponseDetails {
  ExportAssetToSignedUrl?: ExportAssetToSignedUrlResponseDetails;
  ExportAssetsToS3?: ExportAssetsToS3ResponseDetails;
  ExportRevisionsToS3?: ExportRevisionsToS3ResponseDetails;
  ImportAssetFromSignedUrl?: ImportAssetFromSignedUrlResponseDetails;
  ImportAssetsFromS3?: ImportAssetsFromS3ResponseDetails;
  ImportAssetsFromRedshiftDataShares?: ImportAssetsFromRedshiftDataSharesResponseDetails;
  ImportAssetFromApiGatewayApi?: ImportAssetFromApiGatewayApiResponseDetails;
  CreateS3DataAccessFromS3Bucket?: CreateS3DataAccessFromS3BucketResponseDetails;
  ImportAssetsFromLakeFormationTagPolicy?: ImportAssetsFromLakeFormationTagPolicyResponseDetails;
}
export const ResponseDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportAssetToSignedUrl: S.optional(ExportAssetToSignedUrlResponseDetails),
    ExportAssetsToS3: S.optional(ExportAssetsToS3ResponseDetails),
    ExportRevisionsToS3: S.optional(ExportRevisionsToS3ResponseDetails),
    ImportAssetFromSignedUrl: S.optional(
      ImportAssetFromSignedUrlResponseDetails,
    ),
    ImportAssetsFromS3: S.optional(ImportAssetsFromS3ResponseDetails),
    ImportAssetsFromRedshiftDataShares: S.optional(
      ImportAssetsFromRedshiftDataSharesResponseDetails,
    ),
    ImportAssetFromApiGatewayApi: S.optional(
      ImportAssetFromApiGatewayApiResponseDetails,
    ),
    CreateS3DataAccessFromS3Bucket: S.optional(
      CreateS3DataAccessFromS3BucketResponseDetails,
    ),
    ImportAssetsFromLakeFormationTagPolicy: S.optional(
      ImportAssetsFromLakeFormationTagPolicyResponseDetails,
    ),
  }),
).annotate({
  identifier: "ResponseDetails",
}) as any as S.Schema<ResponseDetails>;
export type Code = string;
export interface ImportAssetFromSignedUrlJobErrorDetails {
  AssetName: string;
}
export const ImportAssetFromSignedUrlJobErrorDetails = /*@__PURE__*/ S.suspend(
  () => S.Struct({ AssetName: S.String }),
).annotate({
  identifier: "ImportAssetFromSignedUrlJobErrorDetails",
}) as any as S.Schema<ImportAssetFromSignedUrlJobErrorDetails>;
export interface Details {
  ImportAssetFromSignedUrlJobErrorDetails?: ImportAssetFromSignedUrlJobErrorDetails;
  ImportAssetsFromS3JobErrorDetails?: AssetSourceEntry[];
}
export const Details = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImportAssetFromSignedUrlJobErrorDetails: S.optional(
      ImportAssetFromSignedUrlJobErrorDetails,
    ),
    ImportAssetsFromS3JobErrorDetails: S.optional(ListOfAssetSourceEntry),
  }),
).annotate({ identifier: "Details" }) as any as S.Schema<Details>;
export type JobErrorLimitName = string;
export type JobErrorResourceTypes = string;
export interface JobError {
  Code: string;
  Details?: Details;
  LimitName?: string;
  LimitValue?: number;
  Message: string;
  ResourceId?: string;
  ResourceType?: string;
}
export const JobError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.String,
    Details: S.optional(Details),
    LimitName: S.optional(S.String),
    LimitValue: S.optional(S.Number),
    Message: S.String,
    ResourceId: S.optional(S.String),
    ResourceType: S.optional(S.String),
  }),
).annotate({ identifier: "JobError" }) as any as S.Schema<JobError>;
export type ListOfJobError = JobError[];
export const ListOfJobError = /*@__PURE__*/ S.Array(JobError);
export type State = string;
export interface CreateJobResponse {
  Arn?: string;
  AssetConfiguration?: AssetConfiguration;
  CreatedAt?: Date;
  Details?: ResponseDetails;
  Errors?: JobError[];
  Id?: string;
  State?: string;
  Type?: string;
  UpdatedAt?: Date;
}
export const CreateJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AssetConfiguration: S.optional(AssetConfiguration),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Details: S.optional(ResponseDetails),
    Errors: S.optional(ListOfJobError),
    Id: S.optional(S.String),
    State: S.optional(S.String),
    Type: S.optional(S.String),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CreateJobResponse",
}) as any as S.Schema<CreateJobResponse>;
export type __stringMin0Max16384 = string;
export interface CreateRevisionRequest {
  Comment?: string;
  DataSetId: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateRevisionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Comment: S.optional(S.String),
    DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
    Tags: S.optional(MapOf__string),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/data-sets/{DataSetId}/revisions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateRevisionRequest",
}) as any as S.Schema<CreateRevisionRequest>;
export type __stringMin10Max512 = string;
export interface CreateRevisionResponse {
  Arn?: string;
  Comment?: string;
  CreatedAt?: Date;
  DataSetId?: string;
  Finalized?: boolean;
  Id?: string;
  SourceId?: string;
  Tags?: { [key: string]: string | undefined };
  UpdatedAt?: Date;
  RevocationComment?: string;
  Revoked?: boolean;
  RevokedAt?: Date;
}
export const CreateRevisionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Comment: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DataSetId: S.optional(S.String),
    Finalized: S.optional(S.Boolean),
    Id: S.optional(S.String),
    SourceId: S.optional(S.String),
    Tags: S.optional(MapOf__string),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    RevocationComment: S.optional(S.String),
    Revoked: S.optional(S.Boolean),
    RevokedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CreateRevisionResponse",
}) as any as S.Schema<CreateRevisionResponse>;
export interface DeleteAssetRequest {
  AssetId: string;
  DataSetId: string;
  RevisionId: string;
}
export const DeleteAssetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetId: S.String.pipe(T.HttpLabel("AssetId")),
    DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
    RevisionId: S.String.pipe(T.HttpLabel("RevisionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/data-sets/{DataSetId}/revisions/{RevisionId}/assets/{AssetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAssetRequest",
}) as any as S.Schema<DeleteAssetRequest>;
export interface DeleteAssetResponse {}
export const DeleteAssetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAssetResponse",
}) as any as S.Schema<DeleteAssetResponse>;
export type DataGrantId = string;
export interface DeleteDataGrantRequest {
  DataGrantId: string;
}
export const DeleteDataGrantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataGrantId: S.String.pipe(T.HttpLabel("DataGrantId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/data-grants/{DataGrantId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDataGrantRequest",
}) as any as S.Schema<DeleteDataGrantRequest>;
export interface DeleteDataGrantResponse {}
export const DeleteDataGrantResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDataGrantResponse",
}) as any as S.Schema<DeleteDataGrantResponse>;
export interface DeleteDataSetRequest {
  DataSetId: string;
}
export const DeleteDataSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataSetId: S.String.pipe(T.HttpLabel("DataSetId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/data-sets/{DataSetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDataSetRequest",
}) as any as S.Schema<DeleteDataSetRequest>;
export interface DeleteDataSetResponse {}
export const DeleteDataSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDataSetResponse",
}) as any as S.Schema<DeleteDataSetResponse>;
export interface DeleteEventActionRequest {
  EventActionId: string;
}
export const DeleteEventActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventActionId: S.String.pipe(T.HttpLabel("EventActionId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/event-actions/{EventActionId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEventActionRequest",
}) as any as S.Schema<DeleteEventActionRequest>;
export interface DeleteEventActionResponse {}
export const DeleteEventActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEventActionResponse",
}) as any as S.Schema<DeleteEventActionResponse>;
export interface DeleteRevisionRequest {
  DataSetId: string;
  RevisionId: string;
}
export const DeleteRevisionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
    RevisionId: S.String.pipe(T.HttpLabel("RevisionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/data-sets/{DataSetId}/revisions/{RevisionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRevisionRequest",
}) as any as S.Schema<DeleteRevisionRequest>;
export interface DeleteRevisionResponse {}
export const DeleteRevisionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRevisionResponse",
}) as any as S.Schema<DeleteRevisionResponse>;
export interface GetAssetRequest {
  AssetId: string;
  DataSetId: string;
  RevisionId: string;
}
export const GetAssetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetId: S.String.pipe(T.HttpLabel("AssetId")),
    DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
    RevisionId: S.String.pipe(T.HttpLabel("RevisionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/data-sets/{DataSetId}/revisions/{RevisionId}/assets/{AssetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAssetRequest",
}) as any as S.Schema<GetAssetRequest>;
export type __doubleMin0 = number;
export interface S3SnapshotAsset {
  Size: number;
}
export const S3SnapshotAsset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Size: S.Number }),
).annotate({
  identifier: "S3SnapshotAsset",
}) as any as S.Schema<S3SnapshotAsset>;
export interface RedshiftDataShareAsset {
  Arn: string;
}
export const RedshiftDataShareAsset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String }),
).annotate({
  identifier: "RedshiftDataShareAsset",
}) as any as S.Schema<RedshiftDataShareAsset>;
export interface ApiGatewayApiAsset {
  ApiDescription?: string;
  ApiEndpoint?: string;
  ApiId?: string;
  ApiKey?: string | redacted.Redacted<string>;
  ApiName?: string;
  ApiSpecificationDownloadUrl?: string;
  ApiSpecificationDownloadUrlExpiresAt?: Date;
  ProtocolType?: string;
  Stage?: string;
}
export const ApiGatewayApiAsset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiDescription: S.optional(S.String),
    ApiEndpoint: S.optional(S.String),
    ApiId: S.optional(S.String),
    ApiKey: S.optional(SensitiveString),
    ApiName: S.optional(S.String),
    ApiSpecificationDownloadUrl: S.optional(S.String),
    ApiSpecificationDownloadUrlExpiresAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ProtocolType: S.optional(S.String),
    Stage: S.optional(S.String),
  }),
).annotate({
  identifier: "ApiGatewayApiAsset",
}) as any as S.Schema<ApiGatewayApiAsset>;
export interface S3DataAccessAsset {
  Bucket: string;
  KeyPrefixes?: string[];
  Keys?: string[];
  S3AccessPointAlias?: string;
  S3AccessPointArn?: string;
  KmsKeysToGrant?: KmsKeyToGrant[];
}
export const S3DataAccessAsset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bucket: S.String,
    KeyPrefixes: S.optional(ListOf__string),
    Keys: S.optional(ListOf__string),
    S3AccessPointAlias: S.optional(S.String),
    S3AccessPointArn: S.optional(S.String),
    KmsKeysToGrant: S.optional(ListOfKmsKeysToGrant),
  }),
).annotate({
  identifier: "S3DataAccessAsset",
}) as any as S.Schema<S3DataAccessAsset>;
export type LFResourceType = string;
export interface DatabaseLFTagPolicy {
  Expression: LFTag[];
}
export const DatabaseLFTagPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Expression: ListOfLFTags }),
).annotate({
  identifier: "DatabaseLFTagPolicy",
}) as any as S.Schema<DatabaseLFTagPolicy>;
export interface TableLFTagPolicy {
  Expression: LFTag[];
}
export const TableLFTagPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Expression: ListOfLFTags }),
).annotate({
  identifier: "TableLFTagPolicy",
}) as any as S.Schema<TableLFTagPolicy>;
export interface LFResourceDetails {
  Database?: DatabaseLFTagPolicy;
  Table?: TableLFTagPolicy;
}
export const LFResourceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Database: S.optional(DatabaseLFTagPolicy),
    Table: S.optional(TableLFTagPolicy),
  }),
).annotate({
  identifier: "LFResourceDetails",
}) as any as S.Schema<LFResourceDetails>;
export interface LFTagPolicyDetails {
  CatalogId: string;
  ResourceType: string;
  ResourceDetails: LFResourceDetails;
}
export const LFTagPolicyDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.String,
    ResourceType: S.String,
    ResourceDetails: LFResourceDetails,
  }),
).annotate({
  identifier: "LFTagPolicyDetails",
}) as any as S.Schema<LFTagPolicyDetails>;
export interface LakeFormationDataPermissionDetails {
  LFTagPolicy?: LFTagPolicyDetails;
}
export const LakeFormationDataPermissionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LFTagPolicy: S.optional(LFTagPolicyDetails) }),
).annotate({
  identifier: "LakeFormationDataPermissionDetails",
}) as any as S.Schema<LakeFormationDataPermissionDetails>;
export type LakeFormationDataPermissionType = string;
export type LFPermission = string;
export type ListOfLFPermissions = string[];
export const ListOfLFPermissions = /*@__PURE__*/ S.Array(S.String);
export interface LakeFormationDataPermissionAsset {
  LakeFormationDataPermissionDetails: LakeFormationDataPermissionDetails;
  LakeFormationDataPermissionType: string;
  Permissions: string[];
  RoleArn?: string;
}
export const LakeFormationDataPermissionAsset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LakeFormationDataPermissionDetails: LakeFormationDataPermissionDetails,
    LakeFormationDataPermissionType: S.String,
    Permissions: ListOfLFPermissions,
    RoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "LakeFormationDataPermissionAsset",
}) as any as S.Schema<LakeFormationDataPermissionAsset>;
export interface AssetDetails {
  S3SnapshotAsset?: S3SnapshotAsset;
  RedshiftDataShareAsset?: RedshiftDataShareAsset;
  ApiGatewayApiAsset?: ApiGatewayApiAsset;
  S3DataAccessAsset?: S3DataAccessAsset;
  LakeFormationDataPermissionAsset?: LakeFormationDataPermissionAsset;
}
export const AssetDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3SnapshotAsset: S.optional(S3SnapshotAsset),
    RedshiftDataShareAsset: S.optional(RedshiftDataShareAsset),
    ApiGatewayApiAsset: S.optional(ApiGatewayApiAsset),
    S3DataAccessAsset: S.optional(S3DataAccessAsset),
    LakeFormationDataPermissionAsset: S.optional(
      LakeFormationDataPermissionAsset,
    ),
  }),
).annotate({ identifier: "AssetDetails" }) as any as S.Schema<AssetDetails>;
export interface GetAssetResponse {
  Arn?: string;
  AssetDetails?: AssetDetails;
  AssetType?: string;
  CreatedAt?: Date;
  DataSetId?: string;
  Id?: string;
  Name?: string;
  RevisionId?: string;
  SourceId?: string;
  Tags?: { [key: string]: string | undefined };
  UpdatedAt?: Date;
}
export const GetAssetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AssetDetails: S.optional(AssetDetails),
    AssetType: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DataSetId: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    RevisionId: S.optional(S.String),
    SourceId: S.optional(S.String),
    Tags: S.optional(MapOf__string),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetAssetResponse",
}) as any as S.Schema<GetAssetResponse>;
export interface GetDataGrantRequest {
  DataGrantId: string;
}
export const GetDataGrantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataGrantId: S.String.pipe(T.HttpLabel("DataGrantId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/data-grants/{DataGrantId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataGrantRequest",
}) as any as S.Schema<GetDataGrantRequest>;
export interface GetDataGrantResponse {
  Name: string;
  SenderPrincipal: string;
  ReceiverPrincipal: string;
  Description?: string;
  AcceptanceState: string;
  AcceptedAt?: Date;
  EndsAt?: Date;
  GrantDistributionScope: string;
  DataSetId: string;
  SourceDataSetId: string;
  Id: string;
  Arn: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  Tags?: { [key: string]: string | undefined };
}
export const GetDataGrantResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    SenderPrincipal: S.String,
    ReceiverPrincipal: S.String,
    Description: S.optional(S.String),
    AcceptanceState: S.String,
    AcceptedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndsAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    GrantDistributionScope: S.String,
    DataSetId: S.String,
    SourceDataSetId: S.String,
    Id: S.String,
    Arn: S.String,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Tags: S.optional(MapOf__string),
  }),
).annotate({
  identifier: "GetDataGrantResponse",
}) as any as S.Schema<GetDataGrantResponse>;
export interface GetDataSetRequest {
  DataSetId: string;
}
export const GetDataSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataSetId: S.String.pipe(T.HttpLabel("DataSetId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/data-sets/{DataSetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataSetRequest",
}) as any as S.Schema<GetDataSetRequest>;
export interface GetDataSetResponse {
  Arn?: string;
  AssetType?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  Name?: string;
  Origin?: string;
  OriginDetails?: OriginDetails;
  SourceId?: string;
  Tags?: { [key: string]: string | undefined };
  UpdatedAt?: Date;
}
export const GetDataSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AssetType: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Origin: S.optional(S.String),
    OriginDetails: S.optional(OriginDetails),
    SourceId: S.optional(S.String),
    Tags: S.optional(MapOf__string),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetDataSetResponse",
}) as any as S.Schema<GetDataSetResponse>;
export interface GetEventActionRequest {
  EventActionId: string;
}
export const GetEventActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventActionId: S.String.pipe(T.HttpLabel("EventActionId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/event-actions/{EventActionId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEventActionRequest",
}) as any as S.Schema<GetEventActionRequest>;
export interface GetEventActionResponse {
  Action?: Action;
  Arn?: string;
  CreatedAt?: Date;
  Event?: Event;
  Id?: string;
  Tags?: { [key: string]: string | undefined };
  UpdatedAt?: Date;
}
export const GetEventActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(Action),
    Arn: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Event: S.optional(Event),
    Id: S.optional(S.String),
    Tags: S.optional(MapOf__string),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetEventActionResponse",
}) as any as S.Schema<GetEventActionResponse>;
export interface GetJobRequest {
  JobId: string;
}
export const GetJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String.pipe(T.HttpLabel("JobId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/jobs/{JobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetJobRequest" }) as any as S.Schema<GetJobRequest>;
export interface GetJobResponse {
  Arn?: string;
  AssetConfiguration?: AssetConfiguration;
  CreatedAt?: Date;
  Details?: ResponseDetails;
  Errors?: JobError[];
  Id?: string;
  State?: string;
  Type?: string;
  UpdatedAt?: Date;
}
export const GetJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AssetConfiguration: S.optional(AssetConfiguration),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Details: S.optional(ResponseDetails),
    Errors: S.optional(ListOfJobError),
    Id: S.optional(S.String),
    State: S.optional(S.String),
    Type: S.optional(S.String),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "GetJobResponse" }) as any as S.Schema<GetJobResponse>;
export interface GetReceivedDataGrantRequest {
  DataGrantArn: string;
}
export const GetReceivedDataGrantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataGrantArn: S.String.pipe(T.HttpLabel("DataGrantArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/received-data-grants/{DataGrantArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReceivedDataGrantRequest",
}) as any as S.Schema<GetReceivedDataGrantRequest>;
export interface GetReceivedDataGrantResponse {
  Name: string;
  SenderPrincipal?: string;
  ReceiverPrincipal: string;
  Description?: string;
  AcceptanceState: string;
  AcceptedAt?: Date;
  EndsAt?: Date;
  GrantDistributionScope: string;
  DataSetId: string;
  Id: string;
  Arn: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}
export const GetReceivedDataGrantResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    SenderPrincipal: S.optional(S.String),
    ReceiverPrincipal: S.String,
    Description: S.optional(S.String),
    AcceptanceState: S.String,
    AcceptedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndsAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    GrantDistributionScope: S.String,
    DataSetId: S.String,
    Id: S.String,
    Arn: S.String,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetReceivedDataGrantResponse",
}) as any as S.Schema<GetReceivedDataGrantResponse>;
export interface GetRevisionRequest {
  DataSetId: string;
  RevisionId: string;
}
export const GetRevisionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
    RevisionId: S.String.pipe(T.HttpLabel("RevisionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/data-sets/{DataSetId}/revisions/{RevisionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRevisionRequest",
}) as any as S.Schema<GetRevisionRequest>;
export interface GetRevisionResponse {
  Arn?: string;
  Comment?: string;
  CreatedAt?: Date;
  DataSetId?: string;
  Finalized?: boolean;
  Id?: string;
  SourceId?: string;
  Tags?: { [key: string]: string | undefined };
  UpdatedAt?: Date;
  RevocationComment?: string;
  Revoked?: boolean;
  RevokedAt?: Date;
}
export const GetRevisionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Comment: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DataSetId: S.optional(S.String),
    Finalized: S.optional(S.Boolean),
    Id: S.optional(S.String),
    SourceId: S.optional(S.String),
    Tags: S.optional(MapOf__string),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    RevocationComment: S.optional(S.String),
    Revoked: S.optional(S.Boolean),
    RevokedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetRevisionResponse",
}) as any as S.Schema<GetRevisionResponse>;
export type MaxResults = number;
export interface ListDataGrantsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListDataGrantsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/data-grants" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataGrantsRequest",
}) as any as S.Schema<ListDataGrantsRequest>;
export interface DataGrantSummaryEntry {
  Name: string;
  SenderPrincipal: string;
  ReceiverPrincipal: string;
  AcceptanceState: string;
  AcceptedAt?: Date;
  EndsAt?: Date;
  DataSetId: string;
  SourceDataSetId: string;
  Id: string;
  Arn: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}
export const DataGrantSummaryEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    SenderPrincipal: S.String,
    ReceiverPrincipal: S.String,
    AcceptanceState: S.String,
    AcceptedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndsAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    DataSetId: S.String,
    SourceDataSetId: S.String,
    Id: S.String,
    Arn: S.String,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "DataGrantSummaryEntry",
}) as any as S.Schema<DataGrantSummaryEntry>;
export type ListOfDataGrantSummaryEntry = DataGrantSummaryEntry[];
export const ListOfDataGrantSummaryEntry = /*@__PURE__*/ S.Array(
  DataGrantSummaryEntry,
);
export type NextToken = string;
export interface ListDataGrantsResponse {
  DataGrantSummaries?: DataGrantSummaryEntry[];
  NextToken?: string;
}
export const ListDataGrantsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataGrantSummaries: S.optional(ListOfDataGrantSummaryEntry),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDataGrantsResponse",
}) as any as S.Schema<ListDataGrantsResponse>;
export interface ListDataSetRevisionsRequest {
  DataSetId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListDataSetRevisionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/data-sets/{DataSetId}/revisions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataSetRevisionsRequest",
}) as any as S.Schema<ListDataSetRevisionsRequest>;
export interface RevisionEntry {
  Arn: string;
  Comment?: string;
  CreatedAt: Date;
  DataSetId: string;
  Finalized?: boolean;
  Id: string;
  SourceId?: string;
  UpdatedAt: Date;
  RevocationComment?: string;
  Revoked?: boolean;
  RevokedAt?: Date;
}
export const RevisionEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Comment: S.optional(S.String),
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    DataSetId: S.String,
    Finalized: S.optional(S.Boolean),
    Id: S.String,
    SourceId: S.optional(S.String),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    RevocationComment: S.optional(S.String),
    Revoked: S.optional(S.Boolean),
    RevokedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "RevisionEntry" }) as any as S.Schema<RevisionEntry>;
export type ListOfRevisionEntry = RevisionEntry[];
export const ListOfRevisionEntry = /*@__PURE__*/ S.Array(RevisionEntry);
export interface ListDataSetRevisionsResponse {
  NextToken?: string;
  Revisions?: RevisionEntry[];
}
export const ListDataSetRevisionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Revisions: S.optional(ListOfRevisionEntry),
  }),
).annotate({
  identifier: "ListDataSetRevisionsResponse",
}) as any as S.Schema<ListDataSetRevisionsResponse>;
export interface ListDataSetsRequest {
  MaxResults?: number;
  NextToken?: string;
  Origin?: string;
}
export const ListDataSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    Origin: S.optional(S.String).pipe(T.HttpQuery("origin")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/data-sets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataSetsRequest",
}) as any as S.Schema<ListDataSetsRequest>;
export interface DataSetEntry {
  Arn: string;
  AssetType: string;
  CreatedAt: Date;
  Description: string;
  Id: string;
  Name: string;
  Origin: string;
  OriginDetails?: OriginDetails;
  SourceId?: string;
  UpdatedAt: Date;
}
export const DataSetEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    AssetType: S.String,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Description: S.String,
    Id: S.String,
    Name: S.String,
    Origin: S.String,
    OriginDetails: S.optional(OriginDetails),
    SourceId: S.optional(S.String),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({ identifier: "DataSetEntry" }) as any as S.Schema<DataSetEntry>;
export type ListOfDataSetEntry = DataSetEntry[];
export const ListOfDataSetEntry = /*@__PURE__*/ S.Array(DataSetEntry);
export interface ListDataSetsResponse {
  DataSets?: DataSetEntry[];
  NextToken?: string;
}
export const ListDataSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSets: S.optional(ListOfDataSetEntry),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDataSetsResponse",
}) as any as S.Schema<ListDataSetsResponse>;
export interface ListEventActionsRequest {
  EventSourceId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListEventActionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventSourceId: S.optional(S.String).pipe(T.HttpQuery("eventSourceId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/event-actions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEventActionsRequest",
}) as any as S.Schema<ListEventActionsRequest>;
export interface EventActionEntry {
  Action: Action;
  Arn: string;
  CreatedAt: Date;
  Event: Event;
  Id: string;
  UpdatedAt: Date;
}
export const EventActionEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: Action,
    Arn: S.String,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Event: Event,
    Id: S.String,
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "EventActionEntry",
}) as any as S.Schema<EventActionEntry>;
export type ListOfEventActionEntry = EventActionEntry[];
export const ListOfEventActionEntry = /*@__PURE__*/ S.Array(EventActionEntry);
export interface ListEventActionsResponse {
  EventActions?: EventActionEntry[];
  NextToken?: string;
}
export const ListEventActionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventActions: S.optional(ListOfEventActionEntry),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEventActionsResponse",
}) as any as S.Schema<ListEventActionsResponse>;
export interface ListJobsRequest {
  DataSetId?: string;
  MaxResults?: number;
  NextToken?: string;
  RevisionId?: string;
}
export const ListJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSetId: S.optional(S.String).pipe(T.HttpQuery("dataSetId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    RevisionId: S.optional(S.String).pipe(T.HttpQuery("revisionId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListJobsRequest",
}) as any as S.Schema<ListJobsRequest>;
export interface JobEntry {
  Arn: string;
  AssetConfiguration?: AssetConfiguration;
  CreatedAt: Date;
  Details: ResponseDetails;
  Errors?: JobError[];
  Id: string;
  State: string;
  Type: string;
  UpdatedAt: Date;
}
export const JobEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    AssetConfiguration: S.optional(AssetConfiguration),
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    Details: ResponseDetails,
    Errors: S.optional(ListOfJobError),
    Id: S.String,
    State: S.String,
    Type: S.String,
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({ identifier: "JobEntry" }) as any as S.Schema<JobEntry>;
export type ListOfJobEntry = JobEntry[];
export const ListOfJobEntry = /*@__PURE__*/ S.Array(JobEntry);
export interface ListJobsResponse {
  Jobs?: JobEntry[];
  NextToken?: string;
}
export const ListJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Jobs: S.optional(ListOfJobEntry),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListJobsResponse",
}) as any as S.Schema<ListJobsResponse>;
export type AcceptanceStateFilterValue = string;
export type AcceptanceStateFilterValues = string[];
export const AcceptanceStateFilterValues = /*@__PURE__*/ S.Array(S.String);
export interface ListReceivedDataGrantsRequest {
  MaxResults?: number;
  NextToken?: string;
  AcceptanceState?: string[];
}
export const ListReceivedDataGrantsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    AcceptanceState: S.optional(AcceptanceStateFilterValues).pipe(
      T.HttpQuery("acceptanceState"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/received-data-grants" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReceivedDataGrantsRequest",
}) as any as S.Schema<ListReceivedDataGrantsRequest>;
export interface ReceivedDataGrantSummariesEntry {
  Name: string;
  SenderPrincipal: string;
  ReceiverPrincipal: string;
  AcceptanceState: string;
  AcceptedAt?: Date;
  EndsAt?: Date;
  DataSetId: string;
  Id: string;
  Arn: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}
export const ReceivedDataGrantSummariesEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    SenderPrincipal: S.String,
    ReceiverPrincipal: S.String,
    AcceptanceState: S.String,
    AcceptedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndsAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    DataSetId: S.String,
    Id: S.String,
    Arn: S.String,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ReceivedDataGrantSummariesEntry",
}) as any as S.Schema<ReceivedDataGrantSummariesEntry>;
export type ListOfReceivedDataGrantSummariesEntry =
  ReceivedDataGrantSummariesEntry[];
export const ListOfReceivedDataGrantSummariesEntry = /*@__PURE__*/ S.Array(
  ReceivedDataGrantSummariesEntry,
);
export interface ListReceivedDataGrantsResponse {
  DataGrantSummaries?: ReceivedDataGrantSummariesEntry[];
  NextToken?: string;
}
export const ListReceivedDataGrantsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataGrantSummaries: S.optional(ListOfReceivedDataGrantSummariesEntry),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListReceivedDataGrantsResponse",
}) as any as S.Schema<ListReceivedDataGrantsResponse>;
export interface ListRevisionAssetsRequest {
  DataSetId: string;
  MaxResults?: number;
  NextToken?: string;
  RevisionId: string;
}
export const ListRevisionAssetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    RevisionId: S.String.pipe(T.HttpLabel("RevisionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/data-sets/{DataSetId}/revisions/{RevisionId}/assets",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRevisionAssetsRequest",
}) as any as S.Schema<ListRevisionAssetsRequest>;
export interface AssetEntry {
  Arn: string;
  AssetDetails: AssetDetails;
  AssetType: string;
  CreatedAt: Date;
  DataSetId: string;
  Id: string;
  Name: string;
  RevisionId: string;
  SourceId?: string;
  UpdatedAt: Date;
}
export const AssetEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    AssetDetails: AssetDetails,
    AssetType: S.String,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    DataSetId: S.String,
    Id: S.String,
    Name: S.String,
    RevisionId: S.String,
    SourceId: S.optional(S.String),
    UpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({ identifier: "AssetEntry" }) as any as S.Schema<AssetEntry>;
export type ListOfAssetEntry = AssetEntry[];
export const ListOfAssetEntry = /*@__PURE__*/ S.Array(AssetEntry);
export interface ListRevisionAssetsResponse {
  Assets?: AssetEntry[];
  NextToken?: string;
}
export const ListRevisionAssetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Assets: S.optional(ListOfAssetEntry),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRevisionAssetsResponse",
}) as any as S.Schema<ListRevisionAssetsResponse>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
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
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(MapOf__string) }).pipe(
    S.encodeKeys({ Tags: "tags" }),
  ),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface RevokeRevisionRequest {
  DataSetId: string;
  RevisionId: string;
  RevocationComment: string;
}
export const RevokeRevisionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
    RevisionId: S.String.pipe(T.HttpLabel("RevisionId")),
    RevocationComment: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v1/data-sets/{DataSetId}/revisions/{RevisionId}/revoke",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RevokeRevisionRequest",
}) as any as S.Schema<RevokeRevisionRequest>;
export interface RevokeRevisionResponse {
  Arn?: string;
  Comment?: string;
  CreatedAt?: Date;
  DataSetId?: string;
  Finalized?: boolean;
  Id?: string;
  SourceId?: string;
  UpdatedAt?: Date;
  RevocationComment?: string;
  Revoked?: boolean;
  RevokedAt?: Date;
}
export const RevokeRevisionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Comment: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DataSetId: S.optional(S.String),
    Finalized: S.optional(S.Boolean),
    Id: S.optional(S.String),
    SourceId: S.optional(S.String),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    RevocationComment: S.optional(S.String),
    Revoked: S.optional(S.Boolean),
    RevokedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "RevokeRevisionResponse",
}) as any as S.Schema<RevokeRevisionResponse>;
export interface SendApiAssetRequest {
  Body?: string;
  QueryStringParameters?: { [key: string]: string | undefined };
  AssetId: string;
  DataSetId: string;
  RequestHeaders?: { [key: string]: string | undefined };
  Method?: string;
  Path?: string;
  RevisionId: string;
}
export const SendApiAssetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Body: S.optional(S.String).pipe(T.HttpPayload()),
    QueryStringParameters: S.optional(MapOf__string).pipe(T.HttpQueryParams()),
    AssetId: S.String.pipe(T.HttpHeader("x-amzn-dataexchange-asset-id")),
    DataSetId: S.String.pipe(T.HttpHeader("x-amzn-dataexchange-data-set-id")),
    RequestHeaders: S.optional(MapOf__string).pipe(
      T.HttpPrefixHeaders("x-amzn-dataexchange-header-"),
    ),
    Method: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-dataexchange-http-method"),
    ),
    Path: S.optional(S.String).pipe(T.HttpHeader("x-amzn-dataexchange-path")),
    RevisionId: S.String.pipe(T.HttpHeader("x-amzn-dataexchange-revision-id")),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/v1" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SendApiAssetRequest",
}) as any as S.Schema<SendApiAssetRequest>;
export interface SendApiAssetResponse {
  Body?: string;
  ResponseHeaders?: { [key: string]: string | undefined };
}
export const SendApiAssetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Body: S.optional(S.String).pipe(T.HttpPayload()),
    ResponseHeaders: S.optional(MapOf__string).pipe(T.HttpPrefixHeaders("")),
  }),
).annotate({
  identifier: "SendApiAssetResponse",
}) as any as S.Schema<SendApiAssetResponse>;
export interface LakeFormationTagPolicyDetails {
  Database?: string;
  Table?: string;
}
export const LakeFormationTagPolicyDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Database: S.optional(S.String), Table: S.optional(S.String) }),
).annotate({
  identifier: "LakeFormationTagPolicyDetails",
}) as any as S.Schema<LakeFormationTagPolicyDetails>;
export type ListOfLakeFormationTagPolicies = LakeFormationTagPolicyDetails[];
export const ListOfLakeFormationTagPolicies = /*@__PURE__*/ S.Array(
  LakeFormationTagPolicyDetails,
);
export interface RedshiftDataShareDetails {
  Arn: string;
  Database: string;
  Function?: string;
  Table?: string;
  Schema?: string;
  View?: string;
}
export const RedshiftDataShareDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Database: S.String,
    Function: S.optional(S.String),
    Table: S.optional(S.String),
    Schema: S.optional(S.String),
    View: S.optional(S.String),
  }),
).annotate({
  identifier: "RedshiftDataShareDetails",
}) as any as S.Schema<RedshiftDataShareDetails>;
export type ListOfRedshiftDataShares = RedshiftDataShareDetails[];
export const ListOfRedshiftDataShares = /*@__PURE__*/ S.Array(
  RedshiftDataShareDetails,
);
export interface S3DataAccessDetails {
  KeyPrefixes?: string[];
  Keys?: string[];
}
export const S3DataAccessDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyPrefixes: S.optional(ListOf__string),
    Keys: S.optional(ListOf__string),
  }),
).annotate({
  identifier: "S3DataAccessDetails",
}) as any as S.Schema<S3DataAccessDetails>;
export type ListOfS3DataAccesses = S3DataAccessDetails[];
export const ListOfS3DataAccesses = /*@__PURE__*/ S.Array(S3DataAccessDetails);
export interface ScopeDetails {
  LakeFormationTagPolicies?: LakeFormationTagPolicyDetails[];
  RedshiftDataShares?: RedshiftDataShareDetails[];
  S3DataAccesses?: S3DataAccessDetails[];
}
export const ScopeDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LakeFormationTagPolicies: S.optional(ListOfLakeFormationTagPolicies),
    RedshiftDataShares: S.optional(ListOfRedshiftDataShares),
    S3DataAccesses: S.optional(ListOfS3DataAccesses),
  }),
).annotate({ identifier: "ScopeDetails" }) as any as S.Schema<ScopeDetails>;
export type ClientToken = string;
export type __stringMin0Max4096 = string;
export interface DataUpdateRequestDetails {
  DataUpdatedAt?: Date;
}
export const DataUpdateRequestDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "DataUpdateRequestDetails",
}) as any as S.Schema<DataUpdateRequestDetails>;
export interface DeprecationRequestDetails {
  DeprecationAt: Date;
}
export const DeprecationRequestDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeprecationAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "DeprecationRequestDetails",
}) as any as S.Schema<DeprecationRequestDetails>;
export type SchemaChangeType = string;
export interface SchemaChangeDetails {
  Name: string;
  Type: string;
  Description?: string;
}
export const SchemaChangeDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Type: S.String,
    Description: S.optional(S.String),
  }),
).annotate({
  identifier: "SchemaChangeDetails",
}) as any as S.Schema<SchemaChangeDetails>;
export type ListOfSchemaChangeDetails = SchemaChangeDetails[];
export const ListOfSchemaChangeDetails =
  /*@__PURE__*/ S.Array(SchemaChangeDetails);
export interface SchemaChangeRequestDetails {
  Changes?: SchemaChangeDetails[];
  SchemaChangeAt: Date;
}
export const SchemaChangeRequestDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Changes: S.optional(ListOfSchemaChangeDetails),
    SchemaChangeAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "SchemaChangeRequestDetails",
}) as any as S.Schema<SchemaChangeRequestDetails>;
export interface NotificationDetails {
  DataUpdate?: DataUpdateRequestDetails;
  Deprecation?: DeprecationRequestDetails;
  SchemaChange?: SchemaChangeRequestDetails;
}
export const NotificationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataUpdate: S.optional(DataUpdateRequestDetails),
    Deprecation: S.optional(DeprecationRequestDetails),
    SchemaChange: S.optional(SchemaChangeRequestDetails),
  }),
).annotate({
  identifier: "NotificationDetails",
}) as any as S.Schema<NotificationDetails>;
export type NotificationType = string;
export interface SendDataSetNotificationRequest {
  Scope?: ScopeDetails;
  ClientToken?: string;
  Comment?: string;
  DataSetId: string;
  Details?: NotificationDetails;
  Type: string;
}
export const SendDataSetNotificationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Scope: S.optional(ScopeDetails),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Comment: S.optional(S.String),
    DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
    Details: S.optional(NotificationDetails),
    Type: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/data-sets/{DataSetId}/notification" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendDataSetNotificationRequest",
}) as any as S.Schema<SendDataSetNotificationRequest>;
export interface SendDataSetNotificationResponse {}
export const SendDataSetNotificationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "SendDataSetNotificationResponse",
}) as any as S.Schema<SendDataSetNotificationResponse>;
export interface StartJobRequest {
  JobId: string;
}
export const StartJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String.pipe(T.HttpLabel("JobId")) }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/v1/jobs/{JobId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartJobRequest",
}) as any as S.Schema<StartJobRequest>;
export interface StartJobResponse {}
export const StartJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StartJobResponse",
}) as any as S.Schema<StartJobResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: MapOf__string,
  })
    .pipe(S.encodeKeys({ Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
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
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: ListOf__string.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
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
export interface UpdateAssetRequest {
  AssetId: string;
  DataSetId: string;
  Name: string;
  RevisionId: string;
}
export const UpdateAssetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetId: S.String.pipe(T.HttpLabel("AssetId")),
    DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
    Name: S.String,
    RevisionId: S.String.pipe(T.HttpLabel("RevisionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v1/data-sets/{DataSetId}/revisions/{RevisionId}/assets/{AssetId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAssetRequest",
}) as any as S.Schema<UpdateAssetRequest>;
export interface UpdateAssetResponse {
  Arn?: string;
  AssetDetails?: AssetDetails;
  AssetType?: string;
  CreatedAt?: Date;
  DataSetId?: string;
  Id?: string;
  Name?: string;
  RevisionId?: string;
  SourceId?: string;
  UpdatedAt?: Date;
}
export const UpdateAssetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AssetDetails: S.optional(AssetDetails),
    AssetType: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DataSetId: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    RevisionId: S.optional(S.String),
    SourceId: S.optional(S.String),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "UpdateAssetResponse",
}) as any as S.Schema<UpdateAssetResponse>;
export interface UpdateDataSetRequest {
  DataSetId: string;
  Description?: string;
  Name?: string;
}
export const UpdateDataSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
    Description: S.optional(S.String),
    Name: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/v1/data-sets/{DataSetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDataSetRequest",
}) as any as S.Schema<UpdateDataSetRequest>;
export interface UpdateDataSetResponse {
  Arn?: string;
  AssetType?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  Name?: string;
  Origin?: string;
  OriginDetails?: OriginDetails;
  SourceId?: string;
  UpdatedAt?: Date;
}
export const UpdateDataSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AssetType: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Origin: S.optional(S.String),
    OriginDetails: S.optional(OriginDetails),
    SourceId: S.optional(S.String),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "UpdateDataSetResponse",
}) as any as S.Schema<UpdateDataSetResponse>;
export interface UpdateEventActionRequest {
  Action?: Action;
  EventActionId: string;
}
export const UpdateEventActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(Action),
    EventActionId: S.String.pipe(T.HttpLabel("EventActionId")),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/v1/event-actions/{EventActionId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEventActionRequest",
}) as any as S.Schema<UpdateEventActionRequest>;
export interface UpdateEventActionResponse {
  Action?: Action;
  Arn?: string;
  CreatedAt?: Date;
  Event?: Event;
  Id?: string;
  UpdatedAt?: Date;
}
export const UpdateEventActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(Action),
    Arn: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Event: S.optional(Event),
    Id: S.optional(S.String),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "UpdateEventActionResponse",
}) as any as S.Schema<UpdateEventActionResponse>;
export interface UpdateRevisionRequest {
  Comment?: string;
  DataSetId: string;
  Finalized?: boolean;
  RevisionId: string;
}
export const UpdateRevisionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Comment: S.optional(S.String),
    DataSetId: S.String.pipe(T.HttpLabel("DataSetId")),
    Finalized: S.optional(S.Boolean),
    RevisionId: S.String.pipe(T.HttpLabel("RevisionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/v1/data-sets/{DataSetId}/revisions/{RevisionId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRevisionRequest",
}) as any as S.Schema<UpdateRevisionRequest>;
export interface UpdateRevisionResponse {
  Arn?: string;
  Comment?: string;
  CreatedAt?: Date;
  DataSetId?: string;
  Finalized?: boolean;
  Id?: string;
  SourceId?: string;
  UpdatedAt?: Date;
  RevocationComment?: string;
  Revoked?: boolean;
  RevokedAt?: Date;
}
export const UpdateRevisionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Comment: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DataSetId: S.optional(S.String),
    Finalized: S.optional(S.Boolean),
    Id: S.optional(S.String),
    SourceId: S.optional(S.String),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    RevocationComment: S.optional(S.String),
    Revoked: S.optional(S.Boolean),
    RevokedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "UpdateRevisionResponse",
}) as any as S.Schema<UpdateRevisionResponse>;
export type ResourceType = string;
export type ExceptionCause = string;
export type LimitName = string;
export type AcceptDataGrantError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation accepts a data grant.
 */
export const acceptDataGrant: API.OperationMethod<
  AcceptDataGrantRequest,
  AcceptDataGrantResponse,
  AcceptDataGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptDataGrantRequest,
  output: AcceptDataGrantResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptDataGrant",
}));

export type CancelJobError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation cancels a job. Jobs can be cancelled only when they are in the WAITING state.
 */
export const cancelJob: API.OperationMethod<
  CancelJobRequest,
  CancelJobResponse,
  CancelJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelJobRequest,
  output: CancelJobResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJob",
}));

export type CreateDataGrantError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation creates a data grant.
 */
export const createDataGrant: API.OperationMethod<
  CreateDataGrantRequest,
  CreateDataGrantResponse,
  CreateDataGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataGrantRequest,
  output: CreateDataGrantResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataGrant",
}));

export type CreateDataSetError =
  | AccessDeniedException
  | InternalServerException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation creates a data set.
 */
export const createDataSet: API.OperationMethod<
  CreateDataSetRequest,
  CreateDataSetResponse,
  CreateDataSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataSetRequest,
  output: CreateDataSetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataSet",
}));

export type CreateEventActionError =
  | AccessDeniedException
  | InternalServerException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation creates an event action.
 */
export const createEventAction: API.OperationMethod<
  CreateEventActionRequest,
  CreateEventActionResponse,
  CreateEventActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEventActionRequest,
  output: CreateEventActionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventAction",
}));

export type CreateJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation creates a job.
 */
export const createJob: API.OperationMethod<
  CreateJobRequest,
  CreateJobResponse,
  CreateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateJobRequest,
  output: CreateJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJob",
}));

export type CreateRevisionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation creates a revision for a data set.
 */
export const createRevision: API.OperationMethod<
  CreateRevisionRequest,
  CreateRevisionResponse,
  CreateRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRevisionRequest,
  output: CreateRevisionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRevision",
}));

export type DeleteAssetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation deletes an asset.
 */
export const deleteAsset: API.OperationMethod<
  DeleteAssetRequest,
  DeleteAssetResponse,
  DeleteAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAssetRequest,
  output: DeleteAssetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAsset",
}));

export type DeleteDataGrantError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation deletes a data grant.
 */
export const deleteDataGrant: API.OperationMethod<
  DeleteDataGrantRequest,
  DeleteDataGrantResponse,
  DeleteDataGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataGrantRequest,
  output: DeleteDataGrantResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataGrant",
}));

export type DeleteDataSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation deletes a data set.
 */
export const deleteDataSet: API.OperationMethod<
  DeleteDataSetRequest,
  DeleteDataSetResponse,
  DeleteDataSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataSetRequest,
  output: DeleteDataSetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataSet",
}));

export type DeleteEventActionError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation deletes the event action.
 */
export const deleteEventAction: API.OperationMethod<
  DeleteEventActionRequest,
  DeleteEventActionResponse,
  DeleteEventActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEventActionRequest,
  output: DeleteEventActionResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventAction",
}));

export type DeleteRevisionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation deletes a revision.
 */
export const deleteRevision: API.OperationMethod<
  DeleteRevisionRequest,
  DeleteRevisionResponse,
  DeleteRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRevisionRequest,
  output: DeleteRevisionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRevision",
}));

export type GetAssetError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns information about an asset.
 */
export const getAsset: API.OperationMethod<
  GetAssetRequest,
  GetAssetResponse,
  GetAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAssetRequest,
  output: GetAssetResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAsset",
}));

export type GetDataGrantError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns information about a data grant.
 */
export const getDataGrant: API.OperationMethod<
  GetDataGrantRequest,
  GetDataGrantResponse,
  GetDataGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataGrantRequest,
  output: GetDataGrantResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataGrant",
}));

export type GetDataSetError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns information about a data set.
 */
export const getDataSet: API.OperationMethod<
  GetDataSetRequest,
  GetDataSetResponse,
  GetDataSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataSetRequest,
  output: GetDataSetResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSet",
}));

export type GetEventActionError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation retrieves information about an event action.
 */
export const getEventAction: API.OperationMethod<
  GetEventActionRequest,
  GetEventActionResponse,
  GetEventActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEventActionRequest,
  output: GetEventActionResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventAction",
}));

export type GetJobError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns information about a job.
 */
export const getJob: API.OperationMethod<
  GetJobRequest,
  GetJobResponse,
  GetJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJobRequest,
  output: GetJobResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJob",
}));

export type GetReceivedDataGrantError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns information about a received data grant.
 */
export const getReceivedDataGrant: API.OperationMethod<
  GetReceivedDataGrantRequest,
  GetReceivedDataGrantResponse,
  GetReceivedDataGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReceivedDataGrantRequest,
  output: GetReceivedDataGrantResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReceivedDataGrant",
}));

export type GetRevisionError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns information about a revision.
 */
export const getRevision: API.OperationMethod<
  GetRevisionRequest,
  GetRevisionResponse,
  GetRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRevisionRequest,
  output: GetRevisionResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRevision",
}));

export type ListDataGrantsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns information about all data grants.
 */
export const listDataGrants: API.PaginatedOperationMethod<
  ListDataGrantsRequest,
  ListDataGrantsResponse,
  ListDataGrantsError,
  Credentials | HttpClient.HttpClient,
  DataGrantSummaryEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataGrantsRequest,
  output: ListDataGrantsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataGrants",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DataGrantSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataSetRevisionsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation lists a data set's revisions sorted by CreatedAt in descending order.
 */
export const listDataSetRevisions: API.PaginatedOperationMethod<
  ListDataSetRevisionsRequest,
  ListDataSetRevisionsResponse,
  ListDataSetRevisionsError,
  Credentials | HttpClient.HttpClient,
  RevisionEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataSetRevisionsRequest,
  output: ListDataSetRevisionsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSetRevisions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Revisions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataSetsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation lists your data sets. When listing by origin OWNED, results are sorted by CreatedAt in descending order. When listing by origin ENTITLED, there is no order.
 */
export const listDataSets: API.PaginatedOperationMethod<
  ListDataSetsRequest,
  ListDataSetsResponse,
  ListDataSetsError,
  Credentials | HttpClient.HttpClient,
  DataSetEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataSetsRequest,
  output: ListDataSetsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DataSets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEventActionsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation lists your event actions.
 */
export const listEventActions: API.PaginatedOperationMethod<
  ListEventActionsRequest,
  ListEventActionsResponse,
  ListEventActionsError,
  Credentials | HttpClient.HttpClient,
  EventActionEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEventActionsRequest,
  output: ListEventActionsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventActions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EventActions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListJobsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation lists your jobs sorted by CreatedAt in descending order.
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResponse,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  JobEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobsRequest,
  output: ListJobsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Jobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListReceivedDataGrantsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation returns information about all received data grants.
 */
export const listReceivedDataGrants: API.PaginatedOperationMethod<
  ListReceivedDataGrantsRequest,
  ListReceivedDataGrantsResponse,
  ListReceivedDataGrantsError,
  Credentials | HttpClient.HttpClient,
  ReceivedDataGrantSummariesEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReceivedDataGrantsRequest,
  output: ListReceivedDataGrantsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReceivedDataGrants",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DataGrantSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRevisionAssetsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation lists a revision's assets sorted alphabetically in descending order.
 */
export const listRevisionAssets: API.PaginatedOperationMethod<
  ListRevisionAssetsRequest,
  ListRevisionAssetsResponse,
  ListRevisionAssetsError,
  Credentials | HttpClient.HttpClient,
  AssetEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRevisionAssetsRequest,
  output: ListRevisionAssetsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRevisionAssets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Assets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = CommonErrors;
/**
 * This operation lists the tags on the resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RevokeRevisionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation revokes subscribers' access to a revision.
 */
export const revokeRevision: API.OperationMethod<
  RevokeRevisionRequest,
  RevokeRevisionResponse,
  RevokeRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RevokeRevisionRequest,
  output: RevokeRevisionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeRevision",
}));

export type SendApiAssetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation invokes an API Gateway API asset. The request is proxied to the provider’s API Gateway API.
 */
export const sendApiAsset: API.OperationMethod<
  SendApiAssetRequest,
  SendApiAssetResponse,
  SendApiAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendApiAssetRequest,
  output: SendApiAssetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendApiAsset",
  endpointHostPrefix: "api-fulfill.",
}));

export type SendDataSetNotificationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The type of event associated with the data set.
 */
export const sendDataSetNotification: API.OperationMethod<
  SendDataSetNotificationRequest,
  SendDataSetNotificationResponse,
  SendDataSetNotificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendDataSetNotificationRequest,
  output: SendDataSetNotificationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendDataSetNotification",
}));

export type StartJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation starts a job.
 */
export const startJob: API.OperationMethod<
  StartJobRequest,
  StartJobResponse,
  StartJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartJobRequest,
  output: StartJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartJob",
}));

export type TagResourceError = CommonErrors;
/**
 * This operation tags a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = CommonErrors;
/**
 * This operation removes one or more tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAssetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation updates an asset.
 */
export const updateAsset: API.OperationMethod<
  UpdateAssetRequest,
  UpdateAssetResponse,
  UpdateAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAssetRequest,
  output: UpdateAssetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAsset",
}));

export type UpdateDataSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation updates a data set.
 */
export const updateDataSet: API.OperationMethod<
  UpdateDataSetRequest,
  UpdateDataSetResponse,
  UpdateDataSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDataSetRequest,
  output: UpdateDataSetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataSet",
}));

export type UpdateEventActionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation updates the event action.
 */
export const updateEventAction: API.OperationMethod<
  UpdateEventActionRequest,
  UpdateEventActionResponse,
  UpdateEventActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEventActionRequest,
  output: UpdateEventActionResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventAction",
}));

export type UpdateRevisionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This operation updates a revision.
 */
export const updateRevision: API.OperationMethod<
  UpdateRevisionRequest,
  UpdateRevisionResponse,
  UpdateRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRevisionRequest,
  output: UpdateRevisionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRevision",
}));
