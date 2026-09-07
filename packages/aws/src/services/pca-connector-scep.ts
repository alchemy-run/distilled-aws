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
  sdkId: "Pca Connector Scep",
  serviceShapeName: "PcaConnectorScep",
});
const auth = T.AwsAuthSigv4({ name: "pca-connector-scep" });
const ver = T.ServiceVersion("2018-05-10");
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
              `https://pca-connector-scep-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://pca-connector-scep-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://pca-connector-scep.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://pca-connector-scep.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceType: S.String,
      ServiceCode: S.String,
      QuotaCode: S.String,
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => ValidationExceptionReason).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ConnectorArn = string;
export type ClientToken = string;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export interface CreateChallengeRequest {
  ConnectorArn: string;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateChallengeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectorArn: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/challenges" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateChallengeRequest",
}) as any as S.Schema<CreateChallengeRequest>;
export type ChallengeArn = string;
export type SensitiveString = string | redacted.Redacted<string>;
export interface Challenge {
  Arn?: string;
  ConnectorArn?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  Password?: string | redacted.Redacted<string>;
}
export const Challenge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ConnectorArn: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Password: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Challenge" }) as any as S.Schema<Challenge>;
export interface CreateChallengeResponse {
  Challenge?: Challenge;
}
export const CreateChallengeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Challenge: S.optional(Challenge) }),
).annotate({
  identifier: "CreateChallengeResponse",
}) as any as S.Schema<CreateChallengeResponse>;
export type CertificateAuthorityArn = string;
export type AzureApplicationId = string;
export type AzureDomain = string;
export interface IntuneConfiguration {
  AzureApplicationId: string;
  Domain: string;
}
export const IntuneConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AzureApplicationId: S.String, Domain: S.String }),
).annotate({
  identifier: "IntuneConfiguration",
}) as any as S.Schema<IntuneConfiguration>;
export type MobileDeviceManagement = { Intune: IntuneConfiguration };
export const MobileDeviceManagement = /*@__PURE__*/ S.Union([
  S.Struct({ Intune: IntuneConfiguration }),
]);
export type VpcEndpointId = string;
export interface CreateConnectorRequest {
  CertificateAuthorityArn: string;
  MobileDeviceManagement?: MobileDeviceManagement;
  VpcEndpointId?: string;
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateAuthorityArn: S.String,
    MobileDeviceManagement: S.optional(MobileDeviceManagement),
    VpcEndpointId: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/connectors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConnectorRequest",
}) as any as S.Schema<CreateConnectorRequest>;
export interface CreateConnectorResponse {
  ConnectorArn?: string;
}
export const CreateConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectorArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateConnectorResponse",
}) as any as S.Schema<CreateConnectorResponse>;
export interface DeleteChallengeRequest {
  ChallengeArn: string;
}
export const DeleteChallengeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChallengeArn: S.String.pipe(T.HttpLabel("ChallengeArn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/challenges/{ChallengeArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteChallengeRequest",
}) as any as S.Schema<DeleteChallengeRequest>;
export interface DeleteChallengeResponse {}
export const DeleteChallengeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteChallengeResponse",
}) as any as S.Schema<DeleteChallengeResponse>;
export interface DeleteConnectorRequest {
  ConnectorArn: string;
}
export const DeleteConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectorArn: S.String.pipe(T.HttpLabel("ConnectorArn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/connectors/{ConnectorArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConnectorRequest",
}) as any as S.Schema<DeleteConnectorRequest>;
export interface DeleteConnectorResponse {}
export const DeleteConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteConnectorResponse",
}) as any as S.Schema<DeleteConnectorResponse>;
export interface GetChallengeMetadataRequest {
  ChallengeArn: string;
}
export const GetChallengeMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChallengeArn: S.String.pipe(T.HttpLabel("ChallengeArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/challengeMetadata/{ChallengeArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetChallengeMetadataRequest",
}) as any as S.Schema<GetChallengeMetadataRequest>;
export interface ChallengeMetadata {
  Arn?: string;
  ConnectorArn?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const ChallengeMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ConnectorArn: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ChallengeMetadata",
}) as any as S.Schema<ChallengeMetadata>;
export interface GetChallengeMetadataResponse {
  ChallengeMetadata?: ChallengeMetadata;
}
export const GetChallengeMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChallengeMetadata: S.optional(ChallengeMetadata) }),
).annotate({
  identifier: "GetChallengeMetadataResponse",
}) as any as S.Schema<GetChallengeMetadataResponse>;
export interface GetChallengePasswordRequest {
  ChallengeArn: string;
}
export const GetChallengePasswordRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChallengeArn: S.String.pipe(T.HttpLabel("ChallengeArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/challengePasswords/{ChallengeArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetChallengePasswordRequest",
}) as any as S.Schema<GetChallengePasswordRequest>;
export interface GetChallengePasswordResponse {
  Password?: string | redacted.Redacted<string>;
}
export const GetChallengePasswordResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Password: S.optional(SensitiveString) }),
).annotate({
  identifier: "GetChallengePasswordResponse",
}) as any as S.Schema<GetChallengePasswordResponse>;
export interface GetConnectorRequest {
  ConnectorArn: string;
}
export const GetConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectorArn: S.String.pipe(T.HttpLabel("ConnectorArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/connectors/{ConnectorArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConnectorRequest",
}) as any as S.Schema<GetConnectorRequest>;
export type ConnectorType = "GENERAL_PURPOSE" | "INTUNE" | (string & {});
export const ConnectorType = /*@__PURE__*/ S.String;

export interface OpenIdConfiguration {
  Issuer?: string;
  Subject?: string;
  Audience?: string;
}
export const OpenIdConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Issuer: S.optional(S.String),
    Subject: S.optional(S.String),
    Audience: S.optional(S.String),
  }),
).annotate({
  identifier: "OpenIdConfiguration",
}) as any as S.Schema<OpenIdConfiguration>;
export type ConnectorStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | (string & {});
export const ConnectorStatus = /*@__PURE__*/ S.String;

export type ConnectorStatusReason =
  | "INTERNAL_FAILURE"
  | "PRIVATECA_ACCESS_DENIED"
  | "PRIVATECA_INVALID_STATE"
  | "PRIVATECA_RESOURCE_NOT_FOUND"
  | "VPC_ENDPOINT_RESOURCE_NOT_FOUND"
  | "VPC_ENDPOINT_DNS_ENTRIES_NOT_FOUND"
  | (string & {});
export const ConnectorStatusReason = /*@__PURE__*/ S.String;

export interface Connector {
  Arn?: string;
  CertificateAuthorityArn?: string;
  Type?: ConnectorType;
  MobileDeviceManagement?: MobileDeviceManagement;
  OpenIdConfiguration?: OpenIdConfiguration;
  Status?: ConnectorStatus;
  StatusReason?: ConnectorStatusReason;
  Endpoint?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const Connector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CertificateAuthorityArn: S.optional(S.String),
    Type: S.optional(ConnectorType),
    MobileDeviceManagement: S.optional(MobileDeviceManagement),
    OpenIdConfiguration: S.optional(OpenIdConfiguration),
    Status: S.optional(ConnectorStatus),
    StatusReason: S.optional(ConnectorStatusReason),
    Endpoint: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Connector" }) as any as S.Schema<Connector>;
export interface GetConnectorResponse {
  Connector?: Connector;
}
export const GetConnectorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Connector: S.optional(Connector) }),
).annotate({
  identifier: "GetConnectorResponse",
}) as any as S.Schema<GetConnectorResponse>;
export type MaxResults = number;
export type NextToken = string;
export interface ListChallengeMetadataRequest {
  MaxResults?: number;
  NextToken?: string;
  ConnectorArn: string;
}
export const ListChallengeMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    ConnectorArn: S.String.pipe(T.HttpQuery("ConnectorArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/challengeMetadata" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListChallengeMetadataRequest",
}) as any as S.Schema<ListChallengeMetadataRequest>;
export interface ChallengeMetadataSummary {
  Arn?: string;
  ConnectorArn?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const ChallengeMetadataSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ConnectorArn: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ChallengeMetadataSummary",
}) as any as S.Schema<ChallengeMetadataSummary>;
export type ChallengeMetadataList = ChallengeMetadataSummary[];
export const ChallengeMetadataList = /*@__PURE__*/ S.Array(
  ChallengeMetadataSummary,
);
export interface ListChallengeMetadataResponse {
  Challenges?: ChallengeMetadataSummary[];
  NextToken?: string;
}
export const ListChallengeMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Challenges: S.optional(ChallengeMetadataList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListChallengeMetadataResponse",
}) as any as S.Schema<ListChallengeMetadataResponse>;
export interface ListConnectorsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListConnectorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/connectors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConnectorsRequest",
}) as any as S.Schema<ListConnectorsRequest>;
export interface ConnectorSummary {
  Arn?: string;
  CertificateAuthorityArn?: string;
  Type?: ConnectorType;
  MobileDeviceManagement?: MobileDeviceManagement;
  OpenIdConfiguration?: OpenIdConfiguration;
  Status?: ConnectorStatus;
  StatusReason?: ConnectorStatusReason;
  Endpoint?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const ConnectorSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CertificateAuthorityArn: S.optional(S.String),
    Type: S.optional(ConnectorType),
    MobileDeviceManagement: S.optional(MobileDeviceManagement),
    OpenIdConfiguration: S.optional(OpenIdConfiguration),
    Status: S.optional(ConnectorStatus),
    StatusReason: S.optional(ConnectorStatusReason),
    Endpoint: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ConnectorSummary",
}) as any as S.Schema<ConnectorSummary>;
export type ConnectorList = ConnectorSummary[];
export const ConnectorList = /*@__PURE__*/ S.Array(ConnectorSummary);
export interface ListConnectorsResponse {
  Connectors?: ConnectorSummary[];
  NextToken?: string;
}
export const ListConnectorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Connectors: S.optional(ConnectorList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConnectorsResponse",
}) as any as S.Schema<ListConnectorsResponse>;
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
  S.Struct({ Tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: Tags,
  }).pipe(
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
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
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
export type ValidationExceptionReason =
  | "CA_CERT_VALIDITY_TOO_SHORT"
  | "INVALID_CA_USAGE_MODE"
  | "INVALID_CONNECTOR_TYPE"
  | "INVALID_STATE"
  | "NO_CLIENT_TOKEN"
  | "UNKNOWN_OPERATION"
  | "OTHER"
  | (string & {});
export const ValidationExceptionReason = /*@__PURE__*/ S.String;

export type CreateChallengeError =
  | AccessDeniedException
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * For general-purpose connectors. Creates a *challenge password* for the specified connector. The SCEP protocol uses a challenge password to authenticate a request before issuing a certificate from a certificate authority (CA). Your SCEP clients include the challenge password as part of their certificate request to Connector for SCEP. To retrieve the connector Amazon Resource Names (ARNs) for the connectors in your account, call ListConnectors.
 *
 * To create additional challenge passwords for the connector, call `CreateChallenge` again. We recommend frequently rotating your challenge passwords.
 */
export const createChallenge: API.OperationMethod<
  CreateChallengeRequest,
  CreateChallengeResponse,
  CreateChallengeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateChallengeRequest,
  output: CreateChallengeResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChallenge",
}));

export type CreateConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a SCEP connector. A SCEP connector links Amazon Web Services Private Certificate Authority to your SCEP-compatible devices and mobile device management (MDM) systems. Before you create a connector, you must complete a set of prerequisites, including creation of a private certificate authority (CA) to use with this connector. For more information, see Connector for SCEP prerequisites.
 */
export const createConnector: API.OperationMethod<
  CreateConnectorRequest,
  CreateConnectorResponse,
  CreateConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConnectorRequest,
  output: CreateConnectorResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnector",
}));

export type DeleteChallengeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified Challenge.
 */
export const deleteChallenge: API.OperationMethod<
  DeleteChallengeRequest,
  DeleteChallengeResponse,
  DeleteChallengeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteChallengeRequest,
  output: DeleteChallengeResponse,
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
  operationName: "DeleteChallenge",
}));

export type DeleteConnectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified Connector. This operation also deletes any challenges associated with the connector.
 */
export const deleteConnector: API.OperationMethod<
  DeleteConnectorRequest,
  DeleteConnectorResponse,
  DeleteConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConnectorRequest,
  output: DeleteConnectorResponse,
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
  operationName: "DeleteConnector",
}));

export type GetChallengeMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the metadata for the specified Challenge.
 */
export const getChallengeMetadata: API.OperationMethod<
  GetChallengeMetadataRequest,
  GetChallengeMetadataResponse,
  GetChallengeMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetChallengeMetadataRequest,
  output: GetChallengeMetadataResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChallengeMetadata",
}));

export type GetChallengePasswordError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the challenge password for the specified Challenge.
 */
export const getChallengePassword: API.OperationMethod<
  GetChallengePasswordRequest,
  GetChallengePasswordResponse,
  GetChallengePasswordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetChallengePasswordRequest,
  output: GetChallengePasswordResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChallengePassword",
}));

export type GetConnectorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about the specified Connector. Calling this action returns important details about the connector, such as the public SCEP URL where your clients can request certificates.
 */
export const getConnector: API.OperationMethod<
  GetConnectorRequest,
  GetConnectorResponse,
  GetConnectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConnectorRequest,
  output: GetConnectorResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnector",
}));

export type ListChallengeMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the challenge metadata for the specified ARN.
 */
export const listChallengeMetadata: API.PaginatedOperationMethod<
  ListChallengeMetadataRequest,
  ListChallengeMetadataResponse,
  ListChallengeMetadataError,
  Credentials | HttpClient.HttpClient,
  ChallengeMetadataSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListChallengeMetadataRequest,
  output: ListChallengeMetadataResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChallengeMetadata",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Challenges",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConnectorsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the connectors belonging to your Amazon Web Services account.
 */
export const listConnectors: API.PaginatedOperationMethod<
  ListConnectorsRequest,
  ListConnectorsResponse,
  ListConnectorsError,
  Credentials | HttpClient.HttpClient,
  ConnectorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConnectorsRequest,
  output: ListConnectorsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Connectors",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the tags associated with the specified resource. Tags are key-value pairs that you can use to categorize and manage your resources, for purposes like billing. For example, you might set the tag key to "customer" and the value to the customer name or ID. You can specify one or more tags to add to each Amazon Web Services resource, up to 50 tags for a resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds one or more tags to your resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from your resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));
