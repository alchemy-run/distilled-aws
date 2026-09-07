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
  sdkId: "ACM",
  serviceShapeName: "CertificateManager",
});
const auth = T.AwsAuthSigv4({ name: "acm" });
const ver = T.ServiceVersion("2015-12-08");
const proto = T.AwsProtocolsAwsJson1_1();
const rules = T.EndpointResolver((p, _) => {
  const {
    Region,
    Endpoint,
    UseFIPS = false,
    UseDualStack = false,
    ServiceType,
  } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  if (Endpoint != null) {
    return e(`${Endpoint}`);
  }
  {
    const PartitionResult = _.partition(Region);
    if (PartitionResult != null && PartitionResult !== false) {
      if (ServiceType === "ACM-ACME") {
        if (Endpoint != null) {
          return e(`${Endpoint}`);
        }
        if (_.getAttr(PartitionResult, "name") === "aws") {
          if (UseFIPS === true) {
            return err("FIPS endpoints are not available for ACME operations");
          }
          return e(
            `https://acm-acme.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return err(
          "ACME operations are only available in commercial AWS partitions",
        );
      }
      if (UseFIPS === true && UseDualStack === true) {
        return e(
          `https://acm-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
        );
      }
      if (UseFIPS === true) {
        if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
          return e(`https://acm.${Region}.amazonaws.com`);
        }
        return e(
          `https://acm-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
      if (UseDualStack === true) {
        return e(
          `https://acm.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
        );
      }
      return e(
        `https://acm.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
      );
    }
  }
  return err("Region must be set to resolve an endpoint.");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "AccessDenied", httpResponseCode: 403 }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.Retryable(),
  ).pipe(C.withRetryableError) {}
export class InvalidArgsException
  extends /*@__PURE__*/ S.TaggedError<InvalidArgsException>()(
    "InvalidArgsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidArnException>()(
    "InvalidArnException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidDomainValidationOptionsException
  extends /*@__PURE__*/ S.TaggedError<InvalidDomainValidationOptionsException>()(
    "InvalidDomainValidationOptionsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateException>()(
    "InvalidStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidTagException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagException>()(
    "InvalidTagException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withQuotaError) {}
export class RequestInProgressException
  extends /*@__PURE__*/ S.TaggedError<RequestInProgressException>()(
    "RequestInProgressException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withConflictError, C.withRetryableError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TagPolicyException
  extends /*@__PURE__*/ S.TaggedError<TagPolicyException>()(
    "TagPolicyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      throttlingReasons: S.optional(
        S.suspend(() => ThrottlingReasonList).annotate({
          identifier: "ThrottlingReasonList",
        }),
      ),
    },
    T.all(
      T.AwsQueryError({ code: "Throttling", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withThrottlingError, C.withRetryableError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ValidationError", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type Arn = string;
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
export interface AddTagsToCertificateRequest {
  CertificateArn: string;
  Tags: Tag[];
}
export const AddTagsToCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CertificateArn: S.String, Tags: TagList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM" } }),
    ),
  ),
).annotate({
  identifier: "AddTagsToCertificateRequest",
}) as any as S.Schema<AddTagsToCertificateRequest>;
export interface AddTagsToCertificateResponse {}
export const AddTagsToCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AddTagsToCertificateResponse",
}) as any as S.Schema<AddTagsToCertificateResponse>;
export type AcmeEndpointArn = string;
export type DomainName = string;
export type DomainScopeOption = "ENABLED" | "DISABLED" | (string & {});
export const DomainScopeOption = S.String;

export interface DomainScope {
  ExactDomain?: DomainScopeOption;
  Subdomains?: DomainScopeOption;
  Wildcards?: DomainScopeOption;
}
export const DomainScope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExactDomain: S.optional(DomainScopeOption),
    Subdomains: S.optional(DomainScopeOption),
    Wildcards: S.optional(DomainScopeOption),
  }),
).annotate({ identifier: "DomainScope" }) as any as S.Schema<DomainScope>;
export type HostedZoneId = string;
export interface DnsPrevalidationOptions {
  DomainScope?: DomainScope;
  HostedZoneId?: string;
}
export const DnsPrevalidationOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainScope: S.optional(DomainScope),
    HostedZoneId: S.optional(S.String),
  }),
).annotate({
  identifier: "DnsPrevalidationOptions",
}) as any as S.Schema<DnsPrevalidationOptions>;
export type PrevalidationOptions = {
  DnsPrevalidation: DnsPrevalidationOptions;
};
export const PrevalidationOptions = /*@__PURE__*/ S.Union([
  S.Struct({ DnsPrevalidation: DnsPrevalidationOptions }),
]);
export interface CreateAcmeDomainValidationRequest {
  IdempotencyToken?: string;
  AcmeEndpointArn: string;
  DomainName: string;
  PrevalidationOptions: PrevalidationOptions;
  Tags?: Tag[];
}
export const CreateAcmeDomainValidationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    AcmeEndpointArn: S.String,
    DomainName: S.String,
    PrevalidationOptions: PrevalidationOptions,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
    ),
  ),
).annotate({
  identifier: "CreateAcmeDomainValidationRequest",
}) as any as S.Schema<CreateAcmeDomainValidationRequest>;
export type AcmeDomainValidationArn = string;
export interface CreateAcmeDomainValidationResponse {
  AcmeDomainValidationArn: string;
}
export const CreateAcmeDomainValidationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AcmeDomainValidationArn: S.String }),
).annotate({
  identifier: "CreateAcmeDomainValidationResponse",
}) as any as S.Schema<CreateAcmeDomainValidationResponse>;
export type AcmeAuthorizationBehavior = "PRE_APPROVED" | (string & {});
export const AcmeAuthorizationBehavior = S.String;

export type AcmeContact = "REQUIRED" | "NOT_REQUIRED" | (string & {});
export const AcmeContact = S.String;

export type PublicKeyAlgorithm =
  | "RSA_2048"
  | "EC_prime256v1"
  | "EC_secp384r1"
  | (string & {});
export const PublicKeyAlgorithm = S.String;

export type PublicKeyAlgorithmList = PublicKeyAlgorithm[];
export const PublicKeyAlgorithmList = /*@__PURE__*/ S.Array(PublicKeyAlgorithm);
export interface PublicCertificateAuthority {
  AllowedKeyAlgorithms?: PublicKeyAlgorithm[];
}
export const PublicCertificateAuthority = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AllowedKeyAlgorithms: S.optional(PublicKeyAlgorithmList) }),
).annotate({
  identifier: "PublicCertificateAuthority",
}) as any as S.Schema<PublicCertificateAuthority>;
export type CertificateAuthority = {
  PublicCertificateAuthority: PublicCertificateAuthority;
};
export const CertificateAuthority = /*@__PURE__*/ S.Union([
  S.Struct({ PublicCertificateAuthority: PublicCertificateAuthority }),
]);
export interface CreateAcmeEndpointRequest {
  IdempotencyToken?: string;
  AuthorizationBehavior: AcmeAuthorizationBehavior;
  Contact?: AcmeContact;
  CertificateAuthority: CertificateAuthority;
  Tags?: Tag[];
  CertificateTags?: Tag[];
}
export const CreateAcmeEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    AuthorizationBehavior: AcmeAuthorizationBehavior,
    Contact: S.optional(AcmeContact),
    CertificateAuthority: CertificateAuthority,
    Tags: S.optional(TagList),
    CertificateTags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
    ),
  ),
).annotate({
  identifier: "CreateAcmeEndpointRequest",
}) as any as S.Schema<CreateAcmeEndpointRequest>;
export interface CreateAcmeEndpointResponse {
  AcmeEndpointArn?: string;
}
export const CreateAcmeEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AcmeEndpointArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateAcmeEndpointResponse",
}) as any as S.Schema<CreateAcmeEndpointResponse>;
export type RoleArn = string;
export type TimeType = "MINUTES" | "HOURS" | "DAYS" | (string & {});
export const TimeType = S.String;

export interface Expiration {
  Value: number;
  Type: TimeType;
}
export const Expiration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.Number, Type: TimeType }),
).annotate({ identifier: "Expiration" }) as any as S.Schema<Expiration>;
export interface CreateAcmeExternalAccountBindingRequest {
  IdempotencyToken?: string;
  AcmeEndpointArn: string;
  RoleArn: string;
  Expiration?: Expiration;
  Tags?: Tag[];
}
export const CreateAcmeExternalAccountBindingRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      AcmeEndpointArn: S.String,
      RoleArn: S.String,
      Expiration: S.optional(Expiration),
      Tags: S.optional(TagList),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
      ),
    ),
).annotate({
  identifier: "CreateAcmeExternalAccountBindingRequest",
}) as any as S.Schema<CreateAcmeExternalAccountBindingRequest>;
export type AcmeExternalAccountBindingArn = string;
export interface AcmeExternalAccountBinding {
  AcmeExternalAccountBindingArn?: string;
  AcmeEndpointArn?: string;
  RoleArn?: string;
  ExpiresAt?: Date;
  RevokedAt?: Date;
  LastUsedAt?: Date;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const AcmeExternalAccountBinding = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcmeExternalAccountBindingArn: S.optional(S.String),
    AcmeEndpointArn: S.optional(S.String),
    RoleArn: S.optional(S.String),
    ExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RevokedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUsedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "AcmeExternalAccountBinding",
}) as any as S.Schema<AcmeExternalAccountBinding>;
export interface CreateAcmeExternalAccountBindingResponse {
  ExternalAccountBinding?: AcmeExternalAccountBinding;
}
export const CreateAcmeExternalAccountBindingResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ExternalAccountBinding: S.optional(AcmeExternalAccountBinding),
    }),
).annotate({
  identifier: "CreateAcmeExternalAccountBindingResponse",
}) as any as S.Schema<CreateAcmeExternalAccountBindingResponse>;
export interface DeleteAcmeDomainValidationRequest {
  AcmeDomainValidationArn: string;
}
export const DeleteAcmeDomainValidationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AcmeDomainValidationArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
    ),
  ),
).annotate({
  identifier: "DeleteAcmeDomainValidationRequest",
}) as any as S.Schema<DeleteAcmeDomainValidationRequest>;
export interface DeleteAcmeDomainValidationResponse {}
export const DeleteAcmeDomainValidationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAcmeDomainValidationResponse",
}) as any as S.Schema<DeleteAcmeDomainValidationResponse>;
export interface DeleteAcmeEndpointRequest {
  AcmeEndpointArn: string;
}
export const DeleteAcmeEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AcmeEndpointArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
    ),
  ),
).annotate({
  identifier: "DeleteAcmeEndpointRequest",
}) as any as S.Schema<DeleteAcmeEndpointRequest>;
export interface DeleteAcmeEndpointResponse {}
export const DeleteAcmeEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAcmeEndpointResponse",
}) as any as S.Schema<DeleteAcmeEndpointResponse>;
export interface DeleteAcmeExternalAccountBindingRequest {
  AcmeExternalAccountBindingArn: string;
}
export const DeleteAcmeExternalAccountBindingRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ AcmeExternalAccountBindingArn: S.String }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
      ),
    ),
).annotate({
  identifier: "DeleteAcmeExternalAccountBindingRequest",
}) as any as S.Schema<DeleteAcmeExternalAccountBindingRequest>;
export interface DeleteAcmeExternalAccountBindingResponse {}
export const DeleteAcmeExternalAccountBindingResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteAcmeExternalAccountBindingResponse",
}) as any as S.Schema<DeleteAcmeExternalAccountBindingResponse>;
export interface DeleteCertificateRequest {
  CertificateArn: string;
}
export const DeleteCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CertificateArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM" } }),
    ),
  ),
).annotate({
  identifier: "DeleteCertificateRequest",
}) as any as S.Schema<DeleteCertificateRequest>;
export interface DeleteCertificateResponse {}
export const DeleteCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCertificateResponse",
}) as any as S.Schema<DeleteCertificateResponse>;
export interface DescribeAcmeAccountRequest {
  AcmeEndpointArn: string;
  AccountUrl: string;
}
export const DescribeAcmeAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AcmeEndpointArn: S.String, AccountUrl: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
    ),
  ),
).annotate({
  identifier: "DescribeAcmeAccountRequest",
}) as any as S.Schema<DescribeAcmeAccountRequest>;
export type AcmeAccountStatus =
  | "VALID"
  | "DEACTIVATED"
  | "REVOKED"
  | (string & {});
export const AcmeAccountStatus = S.String;

export type ContactList = string[];
export const ContactList = /*@__PURE__*/ S.Array(S.String);
export interface AcmeAccount {
  AccountUrl?: string;
  PublicKeyThumbprint?: string;
  Status?: AcmeAccountStatus;
  CreatedAt?: Date;
  AcmeExternalAccountBindingArn?: string;
  Contacts?: string[];
}
export const AcmeAccount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountUrl: S.optional(S.String),
    PublicKeyThumbprint: S.optional(S.String),
    Status: S.optional(AcmeAccountStatus),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AcmeExternalAccountBindingArn: S.optional(S.String),
    Contacts: S.optional(ContactList),
  }),
).annotate({ identifier: "AcmeAccount" }) as any as S.Schema<AcmeAccount>;
export interface DescribeAcmeAccountResponse {
  AcmeAccount?: AcmeAccount;
}
export const DescribeAcmeAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AcmeAccount: S.optional(AcmeAccount) }),
).annotate({
  identifier: "DescribeAcmeAccountResponse",
}) as any as S.Schema<DescribeAcmeAccountResponse>;
export interface DescribeAcmeDomainValidationRequest {
  AcmeDomainValidationArn: string;
}
export const DescribeAcmeDomainValidationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AcmeDomainValidationArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
    ),
  ),
).annotate({
  identifier: "DescribeAcmeDomainValidationRequest",
}) as any as S.Schema<DescribeAcmeDomainValidationRequest>;
export type PrevalidationType = "DNS_PREVALIDATION" | (string & {});
export const PrevalidationType = S.String;

export type RecordType = "CNAME" | (string & {});
export const RecordType = S.String;

export interface ResourceRecord {
  Name: string;
  Type: RecordType;
  Value: string;
}
export const ResourceRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Type: RecordType, Value: S.String }),
).annotate({ identifier: "ResourceRecord" }) as any as S.Schema<ResourceRecord>;
export interface DnsPrevalidationDetails {
  DomainScope?: DomainScope;
  HostedZoneId?: string;
  ResourceRecord?: ResourceRecord;
}
export const DnsPrevalidationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainScope: S.optional(DomainScope),
    HostedZoneId: S.optional(S.String),
    ResourceRecord: S.optional(ResourceRecord),
  }),
).annotate({
  identifier: "DnsPrevalidationDetails",
}) as any as S.Schema<DnsPrevalidationDetails>;
export type PrevalidationDetails = {
  DnsPrevalidation: DnsPrevalidationDetails;
};
export const PrevalidationDetails = /*@__PURE__*/ S.Union([
  S.Struct({ DnsPrevalidation: DnsPrevalidationDetails }),
]);
export type AcmeDomainValidationStatus =
  | "VALIDATING"
  | "VALID"
  | "INVALID"
  | "DELETING"
  | (string & {});
export const AcmeDomainValidationStatus = S.String;

export type AcmeDomainValidationFailureReason =
  | "ACCESS_DENIED"
  | "DOMAIN_MISMATCH"
  | "DOMAIN_NOT_ALLOWED"
  | "ENDPOINT_NOT_ACTIVE"
  | "HOSTED_ZONE_NOT_FOUND"
  | "INTERNAL_FAILURE"
  | "INVALID_CHANGE_BATCH"
  | "INVALID_PUBLIC_DOMAIN"
  | "TIMED_OUT"
  | (string & {});
export const AcmeDomainValidationFailureReason = S.String;

export interface FailureDetails {
  Reason?: AcmeDomainValidationFailureReason;
  Message?: string;
}
export const FailureDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Reason: S.optional(AcmeDomainValidationFailureReason),
    Message: S.optional(S.String),
  }),
).annotate({ identifier: "FailureDetails" }) as any as S.Schema<FailureDetails>;
export interface AcmeDomainValidation {
  AcmeDomainValidationArn?: string;
  AcmeEndpointArn?: string;
  DomainName?: string;
  PrevalidationType?: PrevalidationType;
  PrevalidationDetails?: PrevalidationDetails;
  Status?: AcmeDomainValidationStatus;
  FailureDetails?: FailureDetails;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const AcmeDomainValidation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcmeDomainValidationArn: S.optional(S.String),
    AcmeEndpointArn: S.optional(S.String),
    DomainName: S.optional(S.String),
    PrevalidationType: S.optional(PrevalidationType),
    PrevalidationDetails: S.optional(PrevalidationDetails),
    Status: S.optional(AcmeDomainValidationStatus),
    FailureDetails: S.optional(FailureDetails),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "AcmeDomainValidation",
}) as any as S.Schema<AcmeDomainValidation>;
export interface DescribeAcmeDomainValidationResponse {
  AcmeDomainValidation?: AcmeDomainValidation;
}
export const DescribeAcmeDomainValidationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ AcmeDomainValidation: S.optional(AcmeDomainValidation) }),
).annotate({
  identifier: "DescribeAcmeDomainValidationResponse",
}) as any as S.Schema<DescribeAcmeDomainValidationResponse>;
export interface DescribeAcmeEndpointRequest {
  AcmeEndpointArn: string;
}
export const DescribeAcmeEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AcmeEndpointArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
    ),
  ),
).annotate({
  identifier: "DescribeAcmeEndpointRequest",
}) as any as S.Schema<DescribeAcmeEndpointRequest>;
export type AcmeEndpointStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | (string & {});
export const AcmeEndpointStatus = S.String;

export interface AcmeEndpoint {
  AcmeEndpointArn?: string;
  EndpointUrl?: string;
  Status?: AcmeEndpointStatus;
  FailureReason?: string;
  AuthorizationBehavior?: AcmeAuthorizationBehavior;
  Contact?: AcmeContact;
  CertificateAuthority?: CertificateAuthority;
  CertificateTags?: Tag[];
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const AcmeEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcmeEndpointArn: S.optional(S.String),
    EndpointUrl: S.optional(S.String),
    Status: S.optional(AcmeEndpointStatus),
    FailureReason: S.optional(S.String),
    AuthorizationBehavior: S.optional(AcmeAuthorizationBehavior),
    Contact: S.optional(AcmeContact),
    CertificateAuthority: S.optional(CertificateAuthority),
    CertificateTags: S.optional(TagList),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "AcmeEndpoint" }) as any as S.Schema<AcmeEndpoint>;
export interface DescribeAcmeEndpointResponse {
  AcmeEndpoint?: AcmeEndpoint;
}
export const DescribeAcmeEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AcmeEndpoint: S.optional(AcmeEndpoint) }),
).annotate({
  identifier: "DescribeAcmeEndpointResponse",
}) as any as S.Schema<DescribeAcmeEndpointResponse>;
export interface DescribeAcmeExternalAccountBindingRequest {
  AcmeExternalAccountBindingArn: string;
}
export const DescribeAcmeExternalAccountBindingRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ AcmeExternalAccountBindingArn: S.String }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
      ),
    ),
  ).annotate({
    identifier: "DescribeAcmeExternalAccountBindingRequest",
  }) as any as S.Schema<DescribeAcmeExternalAccountBindingRequest>;
export interface DescribeAcmeExternalAccountBindingResponse {
  ExternalAccountBinding?: AcmeExternalAccountBinding;
}
export const DescribeAcmeExternalAccountBindingResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ExternalAccountBinding: S.optional(AcmeExternalAccountBinding),
    }),
  ).annotate({
    identifier: "DescribeAcmeExternalAccountBindingResponse",
  }) as any as S.Schema<DescribeAcmeExternalAccountBindingResponse>;
export interface DescribeCertificateRequest {
  CertificateArn: string;
}
export const DescribeCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CertificateArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM" } }),
    ),
  ),
).annotate({
  identifier: "DescribeCertificateRequest",
}) as any as S.Schema<DescribeCertificateRequest>;
export type DomainNameString = string;
export type DomainList = string[];
export const DomainList = /*@__PURE__*/ S.Array(S.String);
export type CertificateManagedBy = "CLOUDFRONT" | (string & {});
export const CertificateManagedBy = S.String;

export type ValidationEmailList = string[];
export const ValidationEmailList = /*@__PURE__*/ S.Array(S.String);
export type DomainStatus =
  | "PENDING_VALIDATION"
  | "SUCCESS"
  | "FAILED"
  | (string & {});
export const DomainStatus = S.String;

export interface HttpRedirect {
  RedirectFrom?: string;
  RedirectTo?: string;
}
export const HttpRedirect = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RedirectFrom: S.optional(S.String),
    RedirectTo: S.optional(S.String),
  }),
).annotate({ identifier: "HttpRedirect" }) as any as S.Schema<HttpRedirect>;
export type ValidationMethod = "EMAIL" | "DNS" | "HTTP" | (string & {});
export const ValidationMethod = S.String;

export interface DomainValidation {
  DomainName: string;
  ValidationEmails?: string[];
  ValidationDomain?: string;
  ValidationStatus?: DomainStatus;
  ResourceRecord?: ResourceRecord;
  HttpRedirect?: HttpRedirect;
  ValidationMethod?: ValidationMethod;
}
export const DomainValidation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    ValidationEmails: S.optional(ValidationEmailList),
    ValidationDomain: S.optional(S.String),
    ValidationStatus: S.optional(DomainStatus),
    ResourceRecord: S.optional(ResourceRecord),
    HttpRedirect: S.optional(HttpRedirect),
    ValidationMethod: S.optional(ValidationMethod),
  }),
).annotate({
  identifier: "DomainValidation",
}) as any as S.Schema<DomainValidation>;
export type DomainValidationList = DomainValidation[];
export const DomainValidationList = /*@__PURE__*/ S.Array(DomainValidation);
export type CertificateStatus =
  | "PENDING_VALIDATION"
  | "ISSUED"
  | "INACTIVE"
  | "EXPIRED"
  | "VALIDATION_TIMED_OUT"
  | "REVOKED"
  | "FAILED"
  | (string & {});
export const CertificateStatus = S.String;

export type RevocationReason =
  | "UNSPECIFIED"
  | "KEY_COMPROMISE"
  | "CA_COMPROMISE"
  | "AFFILIATION_CHANGED"
  | "SUPERCEDED"
  | "SUPERSEDED"
  | "CESSATION_OF_OPERATION"
  | "CERTIFICATE_HOLD"
  | "REMOVE_FROM_CRL"
  | "PRIVILEGE_WITHDRAWN"
  | "A_A_COMPROMISE"
  | (string & {});
export const RevocationReason = S.String;

export type KeyAlgorithm =
  | "RSA_1024"
  | "RSA_2048"
  | "RSA_3072"
  | "RSA_4096"
  | "EC_prime256v1"
  | "EC_secp384r1"
  | "EC_secp521r1"
  | (string & {});
export const KeyAlgorithm = S.String;

export type InUseList = string[];
export const InUseList = /*@__PURE__*/ S.Array(S.String);
export type FailureReason =
  | "NO_AVAILABLE_CONTACTS"
  | "ADDITIONAL_VERIFICATION_REQUIRED"
  | "DOMAIN_NOT_ALLOWED"
  | "INVALID_PUBLIC_DOMAIN"
  | "DOMAIN_VALIDATION_DENIED"
  | "CAA_ERROR"
  | "PCA_LIMIT_EXCEEDED"
  | "PCA_INVALID_ARN"
  | "PCA_INVALID_STATE"
  | "PCA_REQUEST_FAILED"
  | "PCA_NAME_CONSTRAINTS_VALIDATION"
  | "PCA_RESOURCE_NOT_FOUND"
  | "PCA_INVALID_ARGS"
  | "PCA_INVALID_DURATION"
  | "PCA_ACCESS_DENIED"
  | "SLR_NOT_FOUND"
  | "OTHER"
  | (string & {});
export const FailureReason = S.String;

export type CertificateType =
  | "IMPORTED"
  | "AMAZON_ISSUED"
  | "PRIVATE"
  | (string & {});
export const CertificateType = S.String;

export type RenewalStatus =
  | "PENDING_AUTO_RENEWAL"
  | "PENDING_VALIDATION"
  | "SUCCESS"
  | "FAILED"
  | (string & {});
export const RenewalStatus = S.String;

export interface RenewalSummary {
  RenewalStatus: RenewalStatus;
  DomainValidationOptions: DomainValidation[];
  RenewalStatusReason?: FailureReason;
  UpdatedAt: Date;
}
export const RenewalSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RenewalStatus: RenewalStatus,
    DomainValidationOptions: DomainValidationList,
    RenewalStatusReason: S.optional(FailureReason),
    UpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "RenewalSummary" }) as any as S.Schema<RenewalSummary>;
export type KeyUsageName =
  | "DIGITAL_SIGNATURE"
  | "NON_REPUDIATION"
  | "KEY_ENCIPHERMENT"
  | "DATA_ENCIPHERMENT"
  | "KEY_AGREEMENT"
  | "CERTIFICATE_SIGNING"
  | "CRL_SIGNING"
  | "ENCIPHER_ONLY"
  | "DECIPHER_ONLY"
  | "ANY"
  | "CUSTOM"
  | (string & {});
export const KeyUsageName = S.String;

export interface KeyUsage {
  Name?: KeyUsageName;
}
export const KeyUsage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(KeyUsageName) }),
).annotate({ identifier: "KeyUsage" }) as any as S.Schema<KeyUsage>;
export type KeyUsageList = KeyUsage[];
export const KeyUsageList = /*@__PURE__*/ S.Array(KeyUsage);
export type ExtendedKeyUsageName =
  | "TLS_WEB_SERVER_AUTHENTICATION"
  | "TLS_WEB_CLIENT_AUTHENTICATION"
  | "CODE_SIGNING"
  | "EMAIL_PROTECTION"
  | "TIME_STAMPING"
  | "OCSP_SIGNING"
  | "IPSEC_END_SYSTEM"
  | "IPSEC_TUNNEL"
  | "IPSEC_USER"
  | "ANY"
  | "NONE"
  | "CUSTOM"
  | (string & {});
export const ExtendedKeyUsageName = S.String;

export interface ExtendedKeyUsage {
  Name?: ExtendedKeyUsageName;
  OID?: string;
}
export const ExtendedKeyUsage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(ExtendedKeyUsageName),
    OID: S.optional(S.String),
  }),
).annotate({
  identifier: "ExtendedKeyUsage",
}) as any as S.Schema<ExtendedKeyUsage>;
export type ExtendedKeyUsageList = ExtendedKeyUsage[];
export const ExtendedKeyUsageList = /*@__PURE__*/ S.Array(ExtendedKeyUsage);
export type RenewalEligibility = "ELIGIBLE" | "INELIGIBLE" | (string & {});
export const RenewalEligibility = S.String;

export type CertificateTransparencyLoggingPreference =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const CertificateTransparencyLoggingPreference = S.String;

export type CertificateExport = "ENABLED" | "DISABLED" | (string & {});
export const CertificateExport = S.String;

export interface CertificateOptions {
  CertificateTransparencyLoggingPreference?: CertificateTransparencyLoggingPreference;
  Export?: CertificateExport;
  ValidationMethod?: ValidationMethod;
}
export const CertificateOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateTransparencyLoggingPreference: S.optional(
      CertificateTransparencyLoggingPreference,
    ),
    Export: S.optional(CertificateExport),
    ValidationMethod: S.optional(ValidationMethod),
  }),
).annotate({
  identifier: "CertificateOptions",
}) as any as S.Schema<CertificateOptions>;
export type UpdateStatus =
  | "PENDING_DOMAIN_VALIDATION"
  | "SUCCESS"
  | "FAILED"
  | (string & {});
export const UpdateStatus = S.String;

export type UpdateType = "DOMAIN_VALIDATION_METHOD" | (string & {});
export const UpdateType = S.String;

export interface DomainValidationMethodUpdateSummary {
  From?: ValidationMethod;
  To?: ValidationMethod;
}
export const DomainValidationMethodUpdateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    From: S.optional(ValidationMethod),
    To: S.optional(ValidationMethod),
  }),
).annotate({
  identifier: "DomainValidationMethodUpdateSummary",
}) as any as S.Schema<DomainValidationMethodUpdateSummary>;
export interface UpdateSummary {
  Status?: UpdateStatus;
  Type?: UpdateType;
  DomainValidationMethodUpdateSummary?: DomainValidationMethodUpdateSummary;
  RequestedAt?: Date;
  UpdatedAt?: Date;
}
export const UpdateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(UpdateStatus),
    Type: S.optional(UpdateType),
    DomainValidationMethodUpdateSummary: S.optional(
      DomainValidationMethodUpdateSummary,
    ),
    RequestedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "UpdateSummary" }) as any as S.Schema<UpdateSummary>;
export type CertificateKeyPairOrigin =
  | "AWS_MANAGED"
  | "ACME"
  | "CUSTOMER_PROVIDED"
  | (string & {});
export const CertificateKeyPairOrigin = S.String;

export type AcmeAccountId = string;
export interface CertificateDetail {
  CertificateArn?: string;
  DomainName?: string;
  SubjectAlternativeNames?: string[];
  ManagedBy?: CertificateManagedBy;
  DomainValidationOptions?: DomainValidation[];
  Serial?: string;
  Subject?: string;
  Issuer?: string;
  CreatedAt?: Date;
  IssuedAt?: Date;
  ImportedAt?: Date;
  Status?: CertificateStatus;
  RevokedAt?: Date;
  RevocationReason?: RevocationReason;
  NotBefore?: Date;
  NotAfter?: Date;
  KeyAlgorithm?: KeyAlgorithm;
  SignatureAlgorithm?: string;
  InUseBy?: string[];
  FailureReason?: FailureReason;
  Type?: CertificateType;
  RenewalSummary?: RenewalSummary;
  KeyUsages?: KeyUsage[];
  ExtendedKeyUsages?: ExtendedKeyUsage[];
  CertificateAuthorityArn?: string;
  RenewalEligibility?: RenewalEligibility;
  Options?: CertificateOptions;
  UpdateSummary?: UpdateSummary;
  CertificateKeyPairOrigin?: CertificateKeyPairOrigin;
  AcmeEndpointArn?: string;
  AcmeAccountId?: string;
}
export const CertificateDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateArn: S.optional(S.String),
    DomainName: S.optional(S.String),
    SubjectAlternativeNames: S.optional(DomainList),
    ManagedBy: S.optional(CertificateManagedBy),
    DomainValidationOptions: S.optional(DomainValidationList),
    Serial: S.optional(S.String),
    Subject: S.optional(S.String),
    Issuer: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IssuedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ImportedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(CertificateStatus),
    RevokedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RevocationReason: S.optional(RevocationReason),
    NotBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    NotAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    KeyAlgorithm: S.optional(KeyAlgorithm),
    SignatureAlgorithm: S.optional(S.String),
    InUseBy: S.optional(InUseList),
    FailureReason: S.optional(FailureReason),
    Type: S.optional(CertificateType),
    RenewalSummary: S.optional(RenewalSummary),
    KeyUsages: S.optional(KeyUsageList),
    ExtendedKeyUsages: S.optional(ExtendedKeyUsageList),
    CertificateAuthorityArn: S.optional(S.String),
    RenewalEligibility: S.optional(RenewalEligibility),
    Options: S.optional(CertificateOptions),
    UpdateSummary: S.optional(UpdateSummary),
    CertificateKeyPairOrigin: S.optional(CertificateKeyPairOrigin),
    AcmeEndpointArn: S.optional(S.String),
    AcmeAccountId: S.optional(S.String),
  }),
).annotate({
  identifier: "CertificateDetail",
}) as any as S.Schema<CertificateDetail>;
export interface DescribeCertificateResponse {
  Certificate?: CertificateDetail;
}
export const DescribeCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Certificate: S.optional(CertificateDetail) }),
).annotate({
  identifier: "DescribeCertificateResponse",
}) as any as S.Schema<DescribeCertificateResponse>;
export type PassphraseBlob = Uint8Array | redacted.Redacted<Uint8Array>;
export interface ExportCertificateRequest {
  CertificateArn: string;
  Passphrase: Uint8Array | redacted.Redacted<Uint8Array>;
}
export const ExportCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CertificateArn: S.String, Passphrase: SensitiveBlob }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM" } }),
    ),
  ),
).annotate({
  identifier: "ExportCertificateRequest",
}) as any as S.Schema<ExportCertificateRequest>;
export type CertificateBody = string;
export type CertificateChain = string;
export type PrivateKey = string | redacted.Redacted<string>;
export interface ExportCertificateResponse {
  Certificate?: string;
  CertificateChain?: string;
  PrivateKey?: string | redacted.Redacted<string>;
}
export const ExportCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Certificate: S.optional(S.String),
    CertificateChain: S.optional(S.String),
    PrivateKey: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ExportCertificateResponse",
}) as any as S.Schema<ExportCertificateResponse>;
export interface GetAccountConfigurationRequest {}
export const GetAccountConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM" } }),
    ),
  ),
).annotate({
  identifier: "GetAccountConfigurationRequest",
}) as any as S.Schema<GetAccountConfigurationRequest>;
export type PositiveInteger = number;
export interface ExpiryEventsConfiguration {
  DaysBeforeExpiry?: number;
}
export const ExpiryEventsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DaysBeforeExpiry: S.optional(S.Number) }),
).annotate({
  identifier: "ExpiryEventsConfiguration",
}) as any as S.Schema<ExpiryEventsConfiguration>;
export interface GetAccountConfigurationResponse {
  ExpiryEvents?: ExpiryEventsConfiguration;
}
export const GetAccountConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExpiryEvents: S.optional(ExpiryEventsConfiguration) }),
).annotate({
  identifier: "GetAccountConfigurationResponse",
}) as any as S.Schema<GetAccountConfigurationResponse>;
export interface GetAcmeExternalAccountBindingCredentialsRequest {
  AcmeExternalAccountBindingArn: string;
}
export const GetAcmeExternalAccountBindingCredentialsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ AcmeExternalAccountBindingArn: S.String }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
      ),
    ),
  ).annotate({
    identifier: "GetAcmeExternalAccountBindingCredentialsRequest",
  }) as any as S.Schema<GetAcmeExternalAccountBindingCredentialsRequest>;
export type MacKey = string | redacted.Redacted<string>;
export interface GetAcmeExternalAccountBindingCredentialsResponse {
  KeyId?: string;
  MacKey?: string | redacted.Redacted<string>;
}
export const GetAcmeExternalAccountBindingCredentialsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      KeyId: S.optional(S.String),
      MacKey: S.optional(SensitiveString),
    }),
  ).annotate({
    identifier: "GetAcmeExternalAccountBindingCredentialsResponse",
  }) as any as S.Schema<GetAcmeExternalAccountBindingCredentialsResponse>;
export interface GetCertificateRequest {
  CertificateArn: string;
}
export const GetCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CertificateArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM" } }),
    ),
  ),
).annotate({
  identifier: "GetCertificateRequest",
}) as any as S.Schema<GetCertificateRequest>;
export interface GetCertificateResponse {
  Certificate?: string;
  CertificateChain?: string;
}
export const GetCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Certificate: S.optional(S.String),
    CertificateChain: S.optional(S.String),
  }),
).annotate({
  identifier: "GetCertificateResponse",
}) as any as S.Schema<GetCertificateResponse>;
export type CertificateBodyBlob = Uint8Array;
export type PrivateKeyBlob = Uint8Array | redacted.Redacted<Uint8Array>;
export type CertificateChainBlob = Uint8Array;
export interface ImportCertificateRequest {
  CertificateArn?: string;
  Certificate: Uint8Array;
  PrivateKey: Uint8Array | redacted.Redacted<Uint8Array>;
  CertificateChain?: Uint8Array;
  Tags?: Tag[];
}
export const ImportCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateArn: S.optional(S.String),
    Certificate: T.Blob,
    PrivateKey: SensitiveBlob,
    CertificateChain: S.optional(T.Blob),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM" } }),
    ),
  ),
).annotate({
  identifier: "ImportCertificateRequest",
}) as any as S.Schema<ImportCertificateRequest>;
export interface ImportCertificateResponse {
  CertificateArn?: string;
}
export const ImportCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CertificateArn: S.optional(S.String) }),
).annotate({
  identifier: "ImportCertificateResponse",
}) as any as S.Schema<ImportCertificateResponse>;
export interface ListAcmeAccountsRequest {
  NextToken?: string;
  MaxResults?: number;
  AcmeEndpointArn: string;
}
export const ListAcmeAccountsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    AcmeEndpointArn: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
    ),
  ),
).annotate({
  identifier: "ListAcmeAccountsRequest",
}) as any as S.Schema<ListAcmeAccountsRequest>;
export interface AcmeAccountSummary {
  AccountUrl?: string;
  PublicKeyThumbprint?: string;
  Status?: AcmeAccountStatus;
  CreatedAt?: Date;
  AcmeExternalAccountBindingArn?: string;
  Contacts?: string[];
}
export const AcmeAccountSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountUrl: S.optional(S.String),
    PublicKeyThumbprint: S.optional(S.String),
    Status: S.optional(AcmeAccountStatus),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AcmeExternalAccountBindingArn: S.optional(S.String),
    Contacts: S.optional(ContactList),
  }),
).annotate({
  identifier: "AcmeAccountSummary",
}) as any as S.Schema<AcmeAccountSummary>;
export type AcmeAccountList = AcmeAccountSummary[];
export const AcmeAccountList = /*@__PURE__*/ S.Array(AcmeAccountSummary);
export interface ListAcmeAccountsResponse {
  AcmeAccounts?: AcmeAccountSummary[];
  NextToken?: string;
}
export const ListAcmeAccountsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcmeAccounts: S.optional(AcmeAccountList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAcmeAccountsResponse",
}) as any as S.Schema<ListAcmeAccountsResponse>;
export interface ListAcmeDomainValidationsRequest {
  NextToken?: string;
  MaxResults?: number;
  AcmeEndpointArn: string;
}
export const ListAcmeDomainValidationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    AcmeEndpointArn: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
    ),
  ),
).annotate({
  identifier: "ListAcmeDomainValidationsRequest",
}) as any as S.Schema<ListAcmeDomainValidationsRequest>;
export interface AcmeDomainValidationSummary {
  AcmeDomainValidationArn?: string;
  AcmeEndpointArn?: string;
  DomainName?: string;
  PrevalidationType?: PrevalidationType;
  PrevalidationDetails?: PrevalidationDetails;
  Status?: AcmeDomainValidationStatus;
  FailureDetails?: FailureDetails;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const AcmeDomainValidationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcmeDomainValidationArn: S.optional(S.String),
    AcmeEndpointArn: S.optional(S.String),
    DomainName: S.optional(S.String),
    PrevalidationType: S.optional(PrevalidationType),
    PrevalidationDetails: S.optional(PrevalidationDetails),
    Status: S.optional(AcmeDomainValidationStatus),
    FailureDetails: S.optional(FailureDetails),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "AcmeDomainValidationSummary",
}) as any as S.Schema<AcmeDomainValidationSummary>;
export type AcmeDomainValidationList = AcmeDomainValidationSummary[];
export const AcmeDomainValidationList = /*@__PURE__*/ S.Array(
  AcmeDomainValidationSummary,
);
export interface ListAcmeDomainValidationsResponse {
  AcmeDomainValidations?: AcmeDomainValidationSummary[];
  NextToken?: string;
}
export const ListAcmeDomainValidationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcmeDomainValidations: S.optional(AcmeDomainValidationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAcmeDomainValidationsResponse",
}) as any as S.Schema<ListAcmeDomainValidationsResponse>;
export interface ListAcmeEndpointsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListAcmeEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
    ),
  ),
).annotate({
  identifier: "ListAcmeEndpointsRequest",
}) as any as S.Schema<ListAcmeEndpointsRequest>;
export interface AcmeEndpointSummary {
  AcmeEndpointArn?: string;
  EndpointUrl?: string;
  Status?: AcmeEndpointStatus;
  FailureReason?: string;
  AuthorizationBehavior?: AcmeAuthorizationBehavior;
  Contact?: AcmeContact;
  CertificateAuthority?: CertificateAuthority;
  CertificateTags?: Tag[];
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const AcmeEndpointSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcmeEndpointArn: S.optional(S.String),
    EndpointUrl: S.optional(S.String),
    Status: S.optional(AcmeEndpointStatus),
    FailureReason: S.optional(S.String),
    AuthorizationBehavior: S.optional(AcmeAuthorizationBehavior),
    Contact: S.optional(AcmeContact),
    CertificateAuthority: S.optional(CertificateAuthority),
    CertificateTags: S.optional(TagList),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "AcmeEndpointSummary",
}) as any as S.Schema<AcmeEndpointSummary>;
export type AcmeEndpointList = AcmeEndpointSummary[];
export const AcmeEndpointList = /*@__PURE__*/ S.Array(AcmeEndpointSummary);
export interface ListAcmeEndpointsResponse {
  AcmeEndpoints?: AcmeEndpointSummary[];
  NextToken?: string;
}
export const ListAcmeEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcmeEndpoints: S.optional(AcmeEndpointList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAcmeEndpointsResponse",
}) as any as S.Schema<ListAcmeEndpointsResponse>;
export interface ListAcmeExternalAccountBindingsRequest {
  NextToken?: string;
  MaxResults?: number;
  AcmeEndpointArn: string;
}
export const ListAcmeExternalAccountBindingsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
      AcmeEndpointArn: S.String,
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
      ),
    ),
).annotate({
  identifier: "ListAcmeExternalAccountBindingsRequest",
}) as any as S.Schema<ListAcmeExternalAccountBindingsRequest>;
export interface AcmeExternalAccountBindingSummary {
  AcmeExternalAccountBindingArn?: string;
  AcmeEndpointArn?: string;
  RoleArn?: string;
  ExpiresAt?: Date;
  RevokedAt?: Date;
  LastUsedAt?: Date;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const AcmeExternalAccountBindingSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcmeExternalAccountBindingArn: S.optional(S.String),
    AcmeEndpointArn: S.optional(S.String),
    RoleArn: S.optional(S.String),
    ExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RevokedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUsedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "AcmeExternalAccountBindingSummary",
}) as any as S.Schema<AcmeExternalAccountBindingSummary>;
export type AcmeExternalAccountBindingList =
  AcmeExternalAccountBindingSummary[];
export const AcmeExternalAccountBindingList = /*@__PURE__*/ S.Array(
  AcmeExternalAccountBindingSummary,
);
export interface ListAcmeExternalAccountBindingsResponse {
  ExternalAccountBindings?: AcmeExternalAccountBindingSummary[];
  NextToken?: string;
}
export const ListAcmeExternalAccountBindingsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ExternalAccountBindings: S.optional(AcmeExternalAccountBindingList),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListAcmeExternalAccountBindingsResponse",
}) as any as S.Schema<ListAcmeExternalAccountBindingsResponse>;
export type CertificateArn = string;
export type NextToken = string;
export type MaxItems = number;
export interface ListCertificateDomainValidationsRequest {
  CertificateArn: string;
  NextToken?: string;
  MaxItems?: number;
}
export const ListCertificateDomainValidationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CertificateArn: S.String,
      NextToken: S.optional(S.String),
      MaxItems: S.optional(S.Number),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ ServiceType: { value: "ACM" } }),
      ),
    ),
).annotate({
  identifier: "ListCertificateDomainValidationsRequest",
}) as any as S.Schema<ListCertificateDomainValidationsRequest>;
export interface EmailValidationChallenge {
  ValidationEmails?: string[];
  ValidationDomain?: string;
}
export const EmailValidationChallenge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ValidationEmails: S.optional(ValidationEmailList),
    ValidationDomain: S.optional(S.String),
  }),
).annotate({
  identifier: "EmailValidationChallenge",
}) as any as S.Schema<EmailValidationChallenge>;
export interface DnsValidationChallenge {
  ResourceRecord?: ResourceRecord;
}
export const DnsValidationChallenge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceRecord: S.optional(ResourceRecord) }),
).annotate({
  identifier: "DnsValidationChallenge",
}) as any as S.Schema<DnsValidationChallenge>;
export type ValidationChallenge =
  | {
      EmailValidationChallenge: EmailValidationChallenge;
      DnsValidationChallenge?: never;
    }
  | {
      EmailValidationChallenge?: never;
      DnsValidationChallenge: DnsValidationChallenge;
    };
export const ValidationChallenge = /*@__PURE__*/ S.Union([
  S.Struct({ EmailValidationChallenge: EmailValidationChallenge }),
  S.Struct({ DnsValidationChallenge: DnsValidationChallenge }),
]);
export interface ValidationConfiguration {
  ValidationMethod?: ValidationMethod;
  ValidationChallenge?: ValidationChallenge;
  ValidationStatus?: DomainStatus;
}
export const ValidationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ValidationMethod: S.optional(ValidationMethod),
    ValidationChallenge: S.optional(ValidationChallenge),
    ValidationStatus: S.optional(DomainStatus),
  }),
).annotate({
  identifier: "ValidationConfiguration",
}) as any as S.Schema<ValidationConfiguration>;
export interface DomainValidationSummary {
  DomainName: string;
  ActiveValidationConfiguration?: ValidationConfiguration;
  RequestedValidationConfiguration?: ValidationConfiguration;
}
export const DomainValidationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    ActiveValidationConfiguration: S.optional(ValidationConfiguration),
    RequestedValidationConfiguration: S.optional(ValidationConfiguration),
  }),
).annotate({
  identifier: "DomainValidationSummary",
}) as any as S.Schema<DomainValidationSummary>;
export type DomainValidationSummaryList = DomainValidationSummary[];
export const DomainValidationSummaryList = /*@__PURE__*/ S.Array(
  DomainValidationSummary,
);
export interface ListCertificateDomainValidationsResponse {
  DomainValidationSummaryList?: DomainValidationSummary[];
  NextToken?: string;
}
export const ListCertificateDomainValidationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DomainValidationSummaryList: S.optional(DomainValidationSummaryList),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListCertificateDomainValidationsResponse",
}) as any as S.Schema<ListCertificateDomainValidationsResponse>;
export type CertificateStatuses = CertificateStatus[];
export const CertificateStatuses = /*@__PURE__*/ S.Array(CertificateStatus);
export type CertificateKeyPairOrigins = CertificateKeyPairOrigin[];
export const CertificateKeyPairOrigins = /*@__PURE__*/ S.Array(
  CertificateKeyPairOrigin,
);
export type ExtendedKeyUsageFilterList = ExtendedKeyUsageName[];
export const ExtendedKeyUsageFilterList =
  /*@__PURE__*/ S.Array(ExtendedKeyUsageName);
export type KeyUsageFilterList = KeyUsageName[];
export const KeyUsageFilterList = /*@__PURE__*/ S.Array(KeyUsageName);
export type KeyAlgorithmList = KeyAlgorithm[];
export const KeyAlgorithmList = /*@__PURE__*/ S.Array(KeyAlgorithm);
export interface Filters {
  extendedKeyUsage?: ExtendedKeyUsageName[];
  keyUsage?: KeyUsageName[];
  keyTypes?: KeyAlgorithm[];
  exportOption?: CertificateExport;
  managedBy?: CertificateManagedBy;
}
export const Filters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    extendedKeyUsage: S.optional(ExtendedKeyUsageFilterList),
    keyUsage: S.optional(KeyUsageFilterList),
    keyTypes: S.optional(KeyAlgorithmList),
    exportOption: S.optional(CertificateExport),
    managedBy: S.optional(CertificateManagedBy),
  }),
).annotate({ identifier: "Filters" }) as any as S.Schema<Filters>;
export type SortBy = "CREATED_AT" | (string & {});
export const SortBy = S.String;

export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export const SortOrder = S.String;

export interface ListCertificatesRequest {
  CertificateStatuses?: CertificateStatus[];
  CertificateKeyPairOrigins?: CertificateKeyPairOrigin[];
  Includes?: Filters;
  NextToken?: string;
  MaxItems?: number;
  SortBy?: SortBy;
  SortOrder?: SortOrder;
}
export const ListCertificatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateStatuses: S.optional(CertificateStatuses),
    CertificateKeyPairOrigins: S.optional(CertificateKeyPairOrigins),
    Includes: S.optional(Filters),
    NextToken: S.optional(S.String),
    MaxItems: S.optional(S.Number),
    SortBy: S.optional(SortBy),
    SortOrder: S.optional(SortOrder),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM" } }),
    ),
  ),
).annotate({
  identifier: "ListCertificatesRequest",
}) as any as S.Schema<ListCertificatesRequest>;
export type KeyUsageNames = KeyUsageName[];
export const KeyUsageNames = /*@__PURE__*/ S.Array(KeyUsageName);
export type ExtendedKeyUsageNames = ExtendedKeyUsageName[];
export const ExtendedKeyUsageNames =
  /*@__PURE__*/ S.Array(ExtendedKeyUsageName);
export interface CertificateSummary {
  CertificateArn?: string;
  DomainName?: string;
  SubjectAlternativeNameSummaries?: string[];
  HasAdditionalSubjectAlternativeNames?: boolean;
  Status?: CertificateStatus;
  Type?: CertificateType;
  KeyAlgorithm?: KeyAlgorithm;
  KeyUsages?: KeyUsageName[];
  ExtendedKeyUsages?: ExtendedKeyUsageName[];
  ExportOption?: CertificateExport;
  InUse?: boolean;
  Exported?: boolean;
  RenewalEligibility?: RenewalEligibility;
  NotBefore?: Date;
  NotAfter?: Date;
  CreatedAt?: Date;
  IssuedAt?: Date;
  ImportedAt?: Date;
  RevokedAt?: Date;
  ManagedBy?: CertificateManagedBy;
  CertificateKeyPairOrigin?: CertificateKeyPairOrigin;
}
export const CertificateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateArn: S.optional(S.String),
    DomainName: S.optional(S.String),
    SubjectAlternativeNameSummaries: S.optional(DomainList),
    HasAdditionalSubjectAlternativeNames: S.optional(S.Boolean),
    Status: S.optional(CertificateStatus),
    Type: S.optional(CertificateType),
    KeyAlgorithm: S.optional(KeyAlgorithm),
    KeyUsages: S.optional(KeyUsageNames),
    ExtendedKeyUsages: S.optional(ExtendedKeyUsageNames),
    ExportOption: S.optional(CertificateExport),
    InUse: S.optional(S.Boolean),
    Exported: S.optional(S.Boolean),
    RenewalEligibility: S.optional(RenewalEligibility),
    NotBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    NotAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IssuedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ImportedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RevokedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ManagedBy: S.optional(CertificateManagedBy),
    CertificateKeyPairOrigin: S.optional(CertificateKeyPairOrigin),
  }),
).annotate({
  identifier: "CertificateSummary",
}) as any as S.Schema<CertificateSummary>;
export type CertificateSummaryList = CertificateSummary[];
export const CertificateSummaryList = /*@__PURE__*/ S.Array(CertificateSummary);
export interface ListCertificatesResponse {
  NextToken?: string;
  CertificateSummaryList?: CertificateSummary[];
}
export const ListCertificatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    CertificateSummaryList: S.optional(CertificateSummaryList),
  }),
).annotate({
  identifier: "ListCertificatesResponse",
}) as any as S.Schema<ListCertificatesResponse>;
export interface ListTagsForCertificateRequest {
  CertificateArn: string;
}
export const ListTagsForCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CertificateArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM" } }),
    ),
  ),
).annotate({
  identifier: "ListTagsForCertificateRequest",
}) as any as S.Schema<ListTagsForCertificateRequest>;
export interface ListTagsForCertificateResponse {
  Tags?: Tag[];
}
export const ListTagsForCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForCertificateResponse",
}) as any as S.Schema<ListTagsForCertificateResponse>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM" } }),
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type IdempotencyToken = string;
export interface PutAccountConfigurationRequest {
  ExpiryEvents?: ExpiryEventsConfiguration;
  IdempotencyToken: string;
}
export const PutAccountConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExpiryEvents: S.optional(ExpiryEventsConfiguration),
    IdempotencyToken: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM" } }),
    ),
  ),
).annotate({
  identifier: "PutAccountConfigurationRequest",
}) as any as S.Schema<PutAccountConfigurationRequest>;
export interface PutAccountConfigurationResponse {}
export const PutAccountConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutAccountConfigurationResponse",
}) as any as S.Schema<PutAccountConfigurationResponse>;
export interface RemoveTagsFromCertificateRequest {
  CertificateArn: string;
  Tags: Tag[];
}
export const RemoveTagsFromCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CertificateArn: S.String, Tags: TagList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM" } }),
    ),
  ),
).annotate({
  identifier: "RemoveTagsFromCertificateRequest",
}) as any as S.Schema<RemoveTagsFromCertificateRequest>;
export interface RemoveTagsFromCertificateResponse {}
export const RemoveTagsFromCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RemoveTagsFromCertificateResponse",
}) as any as S.Schema<RemoveTagsFromCertificateResponse>;
export interface RenewCertificateRequest {
  CertificateArn: string;
}
export const RenewCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CertificateArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM" } }),
    ),
  ),
).annotate({
  identifier: "RenewCertificateRequest",
}) as any as S.Schema<RenewCertificateRequest>;
export interface RenewCertificateResponse {}
export const RenewCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RenewCertificateResponse",
}) as any as S.Schema<RenewCertificateResponse>;
export interface DomainValidationOption {
  DomainName: string;
  ValidationDomain: string;
}
export const DomainValidationOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String, ValidationDomain: S.String }),
).annotate({
  identifier: "DomainValidationOption",
}) as any as S.Schema<DomainValidationOption>;
export type DomainValidationOptionList = DomainValidationOption[];
export const DomainValidationOptionList = /*@__PURE__*/ S.Array(
  DomainValidationOption,
);
export type PcaArn = string;
export interface RequestCertificateRequest {
  DomainName: string;
  ValidationMethod?: ValidationMethod;
  SubjectAlternativeNames?: string[];
  IdempotencyToken?: string;
  DomainValidationOptions?: DomainValidationOption[];
  Options?: CertificateOptions;
  CertificateAuthorityArn?: string;
  Tags?: Tag[];
  KeyAlgorithm?: KeyAlgorithm;
  ManagedBy?: CertificateManagedBy;
}
export const RequestCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    ValidationMethod: S.optional(ValidationMethod),
    SubjectAlternativeNames: S.optional(DomainList),
    IdempotencyToken: S.optional(S.String),
    DomainValidationOptions: S.optional(DomainValidationOptionList),
    Options: S.optional(CertificateOptions),
    CertificateAuthorityArn: S.optional(S.String),
    Tags: S.optional(TagList),
    KeyAlgorithm: S.optional(KeyAlgorithm),
    ManagedBy: S.optional(CertificateManagedBy),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM" } }),
    ),
  ),
).annotate({
  identifier: "RequestCertificateRequest",
}) as any as S.Schema<RequestCertificateRequest>;
export interface RequestCertificateResponse {
  CertificateArn?: string;
}
export const RequestCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CertificateArn: S.optional(S.String) }),
).annotate({
  identifier: "RequestCertificateResponse",
}) as any as S.Schema<RequestCertificateResponse>;
export interface ResendValidationEmailRequest {
  CertificateArn: string;
  Domain: string;
  ValidationDomain: string;
}
export const ResendValidationEmailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateArn: S.String,
    Domain: S.String,
    ValidationDomain: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM" } }),
    ),
  ),
).annotate({
  identifier: "ResendValidationEmailRequest",
}) as any as S.Schema<ResendValidationEmailRequest>;
export interface ResendValidationEmailResponse {}
export const ResendValidationEmailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ResendValidationEmailResponse",
}) as any as S.Schema<ResendValidationEmailResponse>;
export interface RevokeAcmeAccountRequest {
  AcmeEndpointArn: string;
  AccountUrl: string;
}
export const RevokeAcmeAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AcmeEndpointArn: S.String, AccountUrl: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
    ),
  ),
).annotate({
  identifier: "RevokeAcmeAccountRequest",
}) as any as S.Schema<RevokeAcmeAccountRequest>;
export interface RevokeAcmeAccountResponse {}
export const RevokeAcmeAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RevokeAcmeAccountResponse",
}) as any as S.Schema<RevokeAcmeAccountResponse>;
export interface RevokeAcmeExternalAccountBindingRequest {
  AcmeExternalAccountBindingArn: string;
}
export const RevokeAcmeExternalAccountBindingRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ AcmeExternalAccountBindingArn: S.String }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
        T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
      ),
    ),
).annotate({
  identifier: "RevokeAcmeExternalAccountBindingRequest",
}) as any as S.Schema<RevokeAcmeExternalAccountBindingRequest>;
export interface RevokeAcmeExternalAccountBindingResponse {}
export const RevokeAcmeExternalAccountBindingResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "RevokeAcmeExternalAccountBindingResponse",
}) as any as S.Schema<RevokeAcmeExternalAccountBindingResponse>;
export interface RevokeCertificateRequest {
  CertificateArn: string;
  RevocationReason: RevocationReason;
}
export const RevokeCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateArn: S.String,
    RevocationReason: RevocationReason,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM" } }),
    ),
  ),
).annotate({
  identifier: "RevokeCertificateRequest",
}) as any as S.Schema<RevokeCertificateRequest>;
export interface RevokeCertificateResponse {
  CertificateArn?: string;
}
export const RevokeCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CertificateArn: S.optional(S.String) }),
).annotate({
  identifier: "RevokeCertificateResponse",
}) as any as S.Schema<RevokeCertificateResponse>;
export type CertificateFilterStatementList = CertificateFilterStatement[];
export const CertificateFilterStatementList = /*@__PURE__*/ S.Array(
  S.suspend(() => CertificateFilterStatement).annotate({
    identifier: "CertificateFilterStatement",
  }),
) as any as S.Schema<CertificateFilterStatementList>;
export type FilterString = string;
export type ComparisonOperator = "CONTAINS" | "EQUALS" | (string & {});
export const ComparisonOperator = S.String;

export interface CommonNameFilter {
  Value: string;
  ComparisonOperator: ComparisonOperator;
}
export const CommonNameFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.String, ComparisonOperator: ComparisonOperator }),
).annotate({
  identifier: "CommonNameFilter",
}) as any as S.Schema<CommonNameFilter>;
export type SubjectFilter = { CommonName: CommonNameFilter };
export const SubjectFilter = /*@__PURE__*/ S.Union([
  S.Struct({ CommonName: CommonNameFilter }),
]);
export interface DnsNameFilter {
  Value: string;
  ComparisonOperator: ComparisonOperator;
}
export const DnsNameFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.String, ComparisonOperator: ComparisonOperator }),
).annotate({ identifier: "DnsNameFilter" }) as any as S.Schema<DnsNameFilter>;
export type SubjectAlternativeNameFilter = { DnsName: DnsNameFilter };
export const SubjectAlternativeNameFilter = /*@__PURE__*/ S.Union([
  S.Struct({ DnsName: DnsNameFilter }),
]);
export type SerialNumber = string;
export interface TimestampRange {
  Start?: Date;
  End?: Date;
}
export const TimestampRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Start: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    End: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "TimestampRange" }) as any as S.Schema<TimestampRange>;
export type X509AttributeFilter =
  | {
      Subject: SubjectFilter;
      SubjectAlternativeName?: never;
      ExtendedKeyUsage?: never;
      KeyUsage?: never;
      KeyAlgorithm?: never;
      SerialNumber?: never;
      NotAfter?: never;
      NotBefore?: never;
    }
  | {
      Subject?: never;
      SubjectAlternativeName: SubjectAlternativeNameFilter;
      ExtendedKeyUsage?: never;
      KeyUsage?: never;
      KeyAlgorithm?: never;
      SerialNumber?: never;
      NotAfter?: never;
      NotBefore?: never;
    }
  | {
      Subject?: never;
      SubjectAlternativeName?: never;
      ExtendedKeyUsage: ExtendedKeyUsageName;
      KeyUsage?: never;
      KeyAlgorithm?: never;
      SerialNumber?: never;
      NotAfter?: never;
      NotBefore?: never;
    }
  | {
      Subject?: never;
      SubjectAlternativeName?: never;
      ExtendedKeyUsage?: never;
      KeyUsage: KeyUsageName;
      KeyAlgorithm?: never;
      SerialNumber?: never;
      NotAfter?: never;
      NotBefore?: never;
    }
  | {
      Subject?: never;
      SubjectAlternativeName?: never;
      ExtendedKeyUsage?: never;
      KeyUsage?: never;
      KeyAlgorithm: KeyAlgorithm;
      SerialNumber?: never;
      NotAfter?: never;
      NotBefore?: never;
    }
  | {
      Subject?: never;
      SubjectAlternativeName?: never;
      ExtendedKeyUsage?: never;
      KeyUsage?: never;
      KeyAlgorithm?: never;
      SerialNumber: string;
      NotAfter?: never;
      NotBefore?: never;
    }
  | {
      Subject?: never;
      SubjectAlternativeName?: never;
      ExtendedKeyUsage?: never;
      KeyUsage?: never;
      KeyAlgorithm?: never;
      SerialNumber?: never;
      NotAfter: TimestampRange;
      NotBefore?: never;
    }
  | {
      Subject?: never;
      SubjectAlternativeName?: never;
      ExtendedKeyUsage?: never;
      KeyUsage?: never;
      KeyAlgorithm?: never;
      SerialNumber?: never;
      NotAfter?: never;
      NotBefore: TimestampRange;
    };
export const X509AttributeFilter = /*@__PURE__*/ S.Union([
  S.Struct({ Subject: SubjectFilter }),
  S.Struct({ SubjectAlternativeName: SubjectAlternativeNameFilter }),
  S.Struct({ ExtendedKeyUsage: ExtendedKeyUsageName }),
  S.Struct({ KeyUsage: KeyUsageName }),
  S.Struct({ KeyAlgorithm: KeyAlgorithm }),
  S.Struct({ SerialNumber: S.String }),
  S.Struct({ NotAfter: TimestampRange }),
  S.Struct({ NotBefore: TimestampRange }),
]);
export type AcmCertificateMetadataFilter =
  | {
      Status: CertificateStatus;
      RenewalStatus?: never;
      Type?: never;
      InUse?: never;
      Exported?: never;
      ExportOption?: never;
      ManagedBy?: never;
      ValidationMethod?: never;
      CertificateKeyPairOrigin?: never;
      AcmeEndpointArn?: never;
      AcmeAccountId?: never;
    }
  | {
      Status?: never;
      RenewalStatus: RenewalStatus;
      Type?: never;
      InUse?: never;
      Exported?: never;
      ExportOption?: never;
      ManagedBy?: never;
      ValidationMethod?: never;
      CertificateKeyPairOrigin?: never;
      AcmeEndpointArn?: never;
      AcmeAccountId?: never;
    }
  | {
      Status?: never;
      RenewalStatus?: never;
      Type: CertificateType;
      InUse?: never;
      Exported?: never;
      ExportOption?: never;
      ManagedBy?: never;
      ValidationMethod?: never;
      CertificateKeyPairOrigin?: never;
      AcmeEndpointArn?: never;
      AcmeAccountId?: never;
    }
  | {
      Status?: never;
      RenewalStatus?: never;
      Type?: never;
      InUse: boolean;
      Exported?: never;
      ExportOption?: never;
      ManagedBy?: never;
      ValidationMethod?: never;
      CertificateKeyPairOrigin?: never;
      AcmeEndpointArn?: never;
      AcmeAccountId?: never;
    }
  | {
      Status?: never;
      RenewalStatus?: never;
      Type?: never;
      InUse?: never;
      Exported: boolean;
      ExportOption?: never;
      ManagedBy?: never;
      ValidationMethod?: never;
      CertificateKeyPairOrigin?: never;
      AcmeEndpointArn?: never;
      AcmeAccountId?: never;
    }
  | {
      Status?: never;
      RenewalStatus?: never;
      Type?: never;
      InUse?: never;
      Exported?: never;
      ExportOption: CertificateExport;
      ManagedBy?: never;
      ValidationMethod?: never;
      CertificateKeyPairOrigin?: never;
      AcmeEndpointArn?: never;
      AcmeAccountId?: never;
    }
  | {
      Status?: never;
      RenewalStatus?: never;
      Type?: never;
      InUse?: never;
      Exported?: never;
      ExportOption?: never;
      ManagedBy: CertificateManagedBy;
      ValidationMethod?: never;
      CertificateKeyPairOrigin?: never;
      AcmeEndpointArn?: never;
      AcmeAccountId?: never;
    }
  | {
      Status?: never;
      RenewalStatus?: never;
      Type?: never;
      InUse?: never;
      Exported?: never;
      ExportOption?: never;
      ManagedBy?: never;
      ValidationMethod: ValidationMethod;
      CertificateKeyPairOrigin?: never;
      AcmeEndpointArn?: never;
      AcmeAccountId?: never;
    }
  | {
      Status?: never;
      RenewalStatus?: never;
      Type?: never;
      InUse?: never;
      Exported?: never;
      ExportOption?: never;
      ManagedBy?: never;
      ValidationMethod?: never;
      CertificateKeyPairOrigin: CertificateKeyPairOrigin;
      AcmeEndpointArn?: never;
      AcmeAccountId?: never;
    }
  | {
      Status?: never;
      RenewalStatus?: never;
      Type?: never;
      InUse?: never;
      Exported?: never;
      ExportOption?: never;
      ManagedBy?: never;
      ValidationMethod?: never;
      CertificateKeyPairOrigin?: never;
      AcmeEndpointArn: string;
      AcmeAccountId?: never;
    }
  | {
      Status?: never;
      RenewalStatus?: never;
      Type?: never;
      InUse?: never;
      Exported?: never;
      ExportOption?: never;
      ManagedBy?: never;
      ValidationMethod?: never;
      CertificateKeyPairOrigin?: never;
      AcmeEndpointArn?: never;
      AcmeAccountId: string;
    };
export const AcmCertificateMetadataFilter = /*@__PURE__*/ S.Union([
  S.Struct({ Status: CertificateStatus }),
  S.Struct({ RenewalStatus: RenewalStatus }),
  S.Struct({ Type: CertificateType }),
  S.Struct({ InUse: S.Boolean }),
  S.Struct({ Exported: S.Boolean }),
  S.Struct({ ExportOption: CertificateExport }),
  S.Struct({ ManagedBy: CertificateManagedBy }),
  S.Struct({ ValidationMethod: ValidationMethod }),
  S.Struct({ CertificateKeyPairOrigin: CertificateKeyPairOrigin }),
  S.Struct({ AcmeEndpointArn: S.String }),
  S.Struct({ AcmeAccountId: S.String }),
]);
export type CertificateFilter =
  | {
      CertificateArn: string;
      X509AttributeFilter?: never;
      AcmCertificateMetadataFilter?: never;
    }
  | {
      CertificateArn?: never;
      X509AttributeFilter: X509AttributeFilter;
      AcmCertificateMetadataFilter?: never;
    }
  | {
      CertificateArn?: never;
      X509AttributeFilter?: never;
      AcmCertificateMetadataFilter: AcmCertificateMetadataFilter;
    };
export const CertificateFilter = /*@__PURE__*/ S.Union([
  S.Struct({ CertificateArn: S.String }),
  S.Struct({ X509AttributeFilter: X509AttributeFilter }),
  S.Struct({ AcmCertificateMetadataFilter: AcmCertificateMetadataFilter }),
]);
export type CertificateFilterStatement =
  | {
      And: CertificateFilterStatement[];
      Or?: never;
      Not?: never;
      Filter?: never;
    }
  | {
      And?: never;
      Or: CertificateFilterStatement[];
      Not?: never;
      Filter?: never;
    }
  | { And?: never; Or?: never; Not: CertificateFilterStatement; Filter?: never }
  | { And?: never; Or?: never; Not?: never; Filter: CertificateFilter };
export const CertificateFilterStatement = /*@__PURE__*/ S.Union([
  S.Struct({
    And: S.suspend(() => CertificateFilterStatementList).annotate({
      identifier: "CertificateFilterStatementList",
    }),
  }),
  S.Struct({
    Or: S.suspend(() => CertificateFilterStatementList).annotate({
      identifier: "CertificateFilterStatementList",
    }),
  }),
  S.Struct({
    Not: S.suspend(() => CertificateFilterStatement).annotate({
      identifier: "CertificateFilterStatement",
    }),
  }),
  S.Struct({ Filter: CertificateFilter }),
]) as any as S.Schema<CertificateFilterStatement>;
export type SearchMaxResults = number;
export type SearchCertificatesSortBy =
  | "CREATED_AT"
  | "NOT_AFTER"
  | "STATUS"
  | "RENEWAL_STATUS"
  | "EXPORTED"
  | "IN_USE"
  | "NOT_BEFORE"
  | "KEY_ALGORITHM"
  | "TYPE"
  | "CERTIFICATE_ARN"
  | "COMMON_NAME"
  | "REVOKED_AT"
  | "RENEWAL_ELIGIBILITY"
  | "ISSUED_AT"
  | "MANAGED_BY"
  | "EXPORT_OPTION"
  | "VALIDATION_METHOD"
  | "IMPORTED_AT"
  | "ACME_ENDPOINT_ARN"
  | "ACME_ACCOUNT_ID"
  | "CERTIFICATE_KEY_PAIR_ORIGIN"
  | (string & {});
export const SearchCertificatesSortBy = S.String;

export type SearchCertificatesSortOrder =
  | "ASCENDING"
  | "DESCENDING"
  | (string & {});
export const SearchCertificatesSortOrder = S.String;

export interface SearchCertificatesRequest {
  FilterStatement?: CertificateFilterStatement;
  MaxResults?: number;
  NextToken?: string;
  SortBy?: SearchCertificatesSortBy;
  SortOrder?: SearchCertificatesSortOrder;
}
export const SearchCertificatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FilterStatement: S.optional(CertificateFilterStatement),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    SortBy: S.optional(SearchCertificatesSortBy),
    SortOrder: S.optional(SearchCertificatesSortOrder),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM" } }),
    ),
  ),
).annotate({
  identifier: "SearchCertificatesRequest",
}) as any as S.Schema<SearchCertificatesRequest>;
export type DomainComponentList = string[];
export const DomainComponentList = /*@__PURE__*/ S.Array(S.String);
export interface CustomAttribute {
  ObjectIdentifier?: string;
  Value?: string;
}
export const CustomAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ObjectIdentifier: S.optional(S.String),
    Value: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomAttribute",
}) as any as S.Schema<CustomAttribute>;
export type CustomAttributeList = CustomAttribute[];
export const CustomAttributeList = /*@__PURE__*/ S.Array(CustomAttribute);
export interface DistinguishedName {
  CommonName?: string;
  DomainComponents?: string[];
  Country?: string;
  CustomAttributes?: CustomAttribute[];
  DistinguishedNameQualifier?: string;
  GenerationQualifier?: string;
  GivenName?: string;
  Initials?: string;
  Locality?: string;
  Organization?: string;
  OrganizationalUnit?: string;
  Pseudonym?: string;
  SerialNumber?: string;
  State?: string;
  Surname?: string;
  Title?: string;
}
export const DistinguishedName = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CommonName: S.optional(S.String),
    DomainComponents: S.optional(DomainComponentList),
    Country: S.optional(S.String),
    CustomAttributes: S.optional(CustomAttributeList),
    DistinguishedNameQualifier: S.optional(S.String),
    GenerationQualifier: S.optional(S.String),
    GivenName: S.optional(S.String),
    Initials: S.optional(S.String),
    Locality: S.optional(S.String),
    Organization: S.optional(S.String),
    OrganizationalUnit: S.optional(S.String),
    Pseudonym: S.optional(S.String),
    SerialNumber: S.optional(S.String),
    State: S.optional(S.String),
    Surname: S.optional(S.String),
    Title: S.optional(S.String),
  }),
).annotate({
  identifier: "DistinguishedName",
}) as any as S.Schema<DistinguishedName>;
export interface OtherName {
  ObjectIdentifier?: string;
  Value?: string;
}
export const OtherName = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ObjectIdentifier: S.optional(S.String),
    Value: S.optional(S.String),
  }),
).annotate({ identifier: "OtherName" }) as any as S.Schema<OtherName>;
export type GeneralName =
  | {
      DirectoryName: DistinguishedName;
      DnsName?: never;
      IpAddress?: never;
      OtherName?: never;
      RegisteredId?: never;
      Rfc822Name?: never;
      UniformResourceIdentifier?: never;
    }
  | {
      DirectoryName?: never;
      DnsName: string;
      IpAddress?: never;
      OtherName?: never;
      RegisteredId?: never;
      Rfc822Name?: never;
      UniformResourceIdentifier?: never;
    }
  | {
      DirectoryName?: never;
      DnsName?: never;
      IpAddress: string;
      OtherName?: never;
      RegisteredId?: never;
      Rfc822Name?: never;
      UniformResourceIdentifier?: never;
    }
  | {
      DirectoryName?: never;
      DnsName?: never;
      IpAddress?: never;
      OtherName: OtherName;
      RegisteredId?: never;
      Rfc822Name?: never;
      UniformResourceIdentifier?: never;
    }
  | {
      DirectoryName?: never;
      DnsName?: never;
      IpAddress?: never;
      OtherName?: never;
      RegisteredId: string;
      Rfc822Name?: never;
      UniformResourceIdentifier?: never;
    }
  | {
      DirectoryName?: never;
      DnsName?: never;
      IpAddress?: never;
      OtherName?: never;
      RegisteredId?: never;
      Rfc822Name: string;
      UniformResourceIdentifier?: never;
    }
  | {
      DirectoryName?: never;
      DnsName?: never;
      IpAddress?: never;
      OtherName?: never;
      RegisteredId?: never;
      Rfc822Name?: never;
      UniformResourceIdentifier: string;
    };
export const GeneralName = /*@__PURE__*/ S.Union([
  S.Struct({ DirectoryName: DistinguishedName }),
  S.Struct({ DnsName: S.String }),
  S.Struct({ IpAddress: S.String }),
  S.Struct({ OtherName: OtherName }),
  S.Struct({ RegisteredId: S.String }),
  S.Struct({ Rfc822Name: S.String }),
  S.Struct({ UniformResourceIdentifier: S.String }),
]);
export type GeneralNameList = GeneralName[];
export const GeneralNameList = /*@__PURE__*/ S.Array(GeneralName);
export interface X509Attributes {
  Issuer?: DistinguishedName;
  Subject?: DistinguishedName;
  SubjectAlternativeNames?: GeneralName[];
  ExtendedKeyUsages?: ExtendedKeyUsageName[];
  KeyAlgorithm?: KeyAlgorithm;
  KeyUsages?: KeyUsageName[];
  SerialNumber?: string;
  NotAfter?: Date;
  NotBefore?: Date;
}
export const X509Attributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Issuer: S.optional(DistinguishedName),
    Subject: S.optional(DistinguishedName),
    SubjectAlternativeNames: S.optional(GeneralNameList),
    ExtendedKeyUsages: S.optional(ExtendedKeyUsageNames),
    KeyAlgorithm: S.optional(KeyAlgorithm),
    KeyUsages: S.optional(KeyUsageNames),
    SerialNumber: S.optional(S.String),
    NotAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    NotBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "X509Attributes" }) as any as S.Schema<X509Attributes>;
export interface AcmCertificateMetadata {
  CreatedAt?: Date;
  Exported?: boolean;
  ImportedAt?: Date;
  InUse?: boolean;
  IssuedAt?: Date;
  RenewalEligibility?: RenewalEligibility;
  RevokedAt?: Date;
  Status?: CertificateStatus;
  RenewalStatus?: RenewalStatus;
  Type?: CertificateType;
  ExportOption?: CertificateExport;
  ManagedBy?: CertificateManagedBy;
  ValidationMethod?: ValidationMethod;
  CertificateKeyPairOrigin?: CertificateKeyPairOrigin;
  AcmeEndpointArn?: string;
  AcmeAccountId?: string;
}
export const AcmCertificateMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Exported: S.optional(S.Boolean),
    ImportedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    InUse: S.optional(S.Boolean),
    IssuedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RenewalEligibility: S.optional(RenewalEligibility),
    RevokedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(CertificateStatus),
    RenewalStatus: S.optional(RenewalStatus),
    Type: S.optional(CertificateType),
    ExportOption: S.optional(CertificateExport),
    ManagedBy: S.optional(CertificateManagedBy),
    ValidationMethod: S.optional(ValidationMethod),
    CertificateKeyPairOrigin: S.optional(CertificateKeyPairOrigin),
    AcmeEndpointArn: S.optional(S.String),
    AcmeAccountId: S.optional(S.String),
  }),
).annotate({
  identifier: "AcmCertificateMetadata",
}) as any as S.Schema<AcmCertificateMetadata>;
export type CertificateMetadata = {
  AcmCertificateMetadata: AcmCertificateMetadata;
};
export const CertificateMetadata = /*@__PURE__*/ S.Union([
  S.Struct({ AcmCertificateMetadata: AcmCertificateMetadata }),
]);
export interface CertificateSearchResult {
  CertificateArn?: string;
  X509Attributes?: X509Attributes;
  CertificateMetadata?: CertificateMetadata;
}
export const CertificateSearchResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateArn: S.optional(S.String),
    X509Attributes: S.optional(X509Attributes),
    CertificateMetadata: S.optional(CertificateMetadata),
  }),
).annotate({
  identifier: "CertificateSearchResult",
}) as any as S.Schema<CertificateSearchResult>;
export type CertificateSearchResultList = CertificateSearchResult[];
export const CertificateSearchResultList = /*@__PURE__*/ S.Array(
  CertificateSearchResult,
);
export interface SearchCertificatesResponse {
  Results?: CertificateSearchResult[];
  NextToken?: string;
}
export const SearchCertificatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Results: S.optional(CertificateSearchResultList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchCertificatesResponse",
}) as any as S.Schema<SearchCertificatesResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: TagList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM" } }),
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
  S.Struct({ ResourceArn: S.String, TagKeys: TagKeyList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM" } }),
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
export interface UpdateAcmeDomainValidationRequest {
  AcmeDomainValidationArn: string;
  PrevalidationOptions?: PrevalidationOptions;
}
export const UpdateAcmeDomainValidationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcmeDomainValidationArn: S.String,
    PrevalidationOptions: S.optional(PrevalidationOptions),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
    ),
  ),
).annotate({
  identifier: "UpdateAcmeDomainValidationRequest",
}) as any as S.Schema<UpdateAcmeDomainValidationRequest>;
export interface UpdateAcmeDomainValidationResponse {}
export const UpdateAcmeDomainValidationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateAcmeDomainValidationResponse",
}) as any as S.Schema<UpdateAcmeDomainValidationResponse>;
export interface UpdateAcmeEndpointRequest {
  AcmeEndpointArn: string;
  AuthorizationBehavior?: AcmeAuthorizationBehavior;
  Contact?: AcmeContact;
  CertificateAuthority?: CertificateAuthority;
}
export const UpdateAcmeEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcmeEndpointArn: S.String,
    AuthorizationBehavior: S.optional(AcmeAuthorizationBehavior),
    Contact: S.optional(AcmeContact),
    CertificateAuthority: S.optional(CertificateAuthority),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM-ACME" } }),
    ),
  ),
).annotate({
  identifier: "UpdateAcmeEndpointRequest",
}) as any as S.Schema<UpdateAcmeEndpointRequest>;
export interface UpdateAcmeEndpointResponse {}
export const UpdateAcmeEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateAcmeEndpointResponse",
}) as any as S.Schema<UpdateAcmeEndpointResponse>;
export interface UpdateCertificateOptionsRequest {
  CertificateArn: string;
  Options: CertificateOptions;
}
export const UpdateCertificateOptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CertificateArn: S.String, Options: CertificateOptions }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
      T.StaticContextParams({ ServiceType: { value: "ACM" } }),
    ),
  ),
).annotate({
  identifier: "UpdateCertificateOptionsRequest",
}) as any as S.Schema<UpdateCertificateOptionsRequest>;
export interface UpdateCertificateOptionsResponse {}
export const UpdateCertificateOptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateCertificateOptionsResponse",
}) as any as S.Schema<UpdateCertificateOptionsResponse>;
export type AvailabilityErrorMessage = string;
export type CoralAvailabilityThrottlingReason = string;
export type CoralAvailabilityThrottledResource = string;
export interface ThrottlingReason {
  reason?: string;
  resource?: string;
}
export const ThrottlingReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reason: S.optional(S.String), resource: S.optional(S.String) }),
).annotate({
  identifier: "ThrottlingReason",
}) as any as S.Schema<ThrottlingReason>;
export type ThrottlingReasonList = ThrottlingReason[];
export const ThrottlingReasonList = /*@__PURE__*/ S.Array(ThrottlingReason);
export type ValidationExceptionMessage = string;
export type ServiceErrorMessage = string;
export type AddTagsToCertificateError =
  | InvalidArnException
  | InvalidParameterException
  | InvalidTagException
  | ResourceNotFoundException
  | TagPolicyException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Adds one or more tags to an ACM certificate. Tags are labels that you can use to identify and organize your Amazon Web Services resources. Each tag consists of a `key` and an optional `value`. You specify the certificate on input by its Amazon Resource Name (ARN). You specify the tag by using a key-value pair.
 *
 * This action applies only to the `certificate` resource type. For all other ACM resource types, use TagResource instead.
 *
 * You can apply a tag to just one certificate if you want to identify a specific characteristic of that certificate, or you can apply the same tag to multiple certificates if you want to filter for a common relationship among those certificates. Similarly, you can apply the same tag to multiple resources if you want to specify a relationship among those resources. For example, you can add the same tag to an ACM certificate and an Elastic Load Balancing load balancer to indicate that they are both used by the same website. For more information, see Tagging ACM certificates.
 *
 * To remove one or more tags, use the RemoveTagsFromCertificate action. To view all of the tags that have been applied to the certificate, use the ListTagsForCertificate action.
 */
export const addTagsToCertificate: API.OperationMethod<
  AddTagsToCertificateRequest,
  AddTagsToCertificateResponse,
  AddTagsToCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddTagsToCertificateRequest,
  output: AddTagsToCertificateResponse,
  errors: [
    InvalidArnException,
    InvalidParameterException,
    InvalidTagException,
    ResourceNotFoundException,
    TagPolicyException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTagsToCertificate",
}));

export type CreateAcmeDomainValidationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a domain validation for an ACME endpoint. Domain validations authorize the endpoint to issue certificates for specified domain names. You configure prevalidation to prove domain ownership.
 */
export const createAcmeDomainValidation: API.OperationMethod<
  CreateAcmeDomainValidationRequest,
  CreateAcmeDomainValidationResponse,
  CreateAcmeDomainValidationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAcmeDomainValidationRequest,
  output: CreateAcmeDomainValidationResponse,
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
  operationName: "CreateAcmeDomainValidation",
}));

export type CreateAcmeEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an ACME endpoint, which is a managed ACME server with a unique endpoint URL. After creation, ACME clients can use the endpoint URL to automate certificate issuance using the ACME protocol.
 */
export const createAcmeEndpoint: API.OperationMethod<
  CreateAcmeEndpointRequest,
  CreateAcmeEndpointResponse,
  CreateAcmeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAcmeEndpointRequest,
  output: CreateAcmeEndpointResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAcmeEndpoint",
}));

export type CreateAcmeExternalAccountBindingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an external account binding (EAB) for an ACME endpoint. An EAB provides credentials that authorize an ACME client to register an account with the endpoint. Each EAB is associated with an IAM role that controls what certificate operations the ACME client can perform.
 */
export const createAcmeExternalAccountBinding: API.OperationMethod<
  CreateAcmeExternalAccountBindingRequest,
  CreateAcmeExternalAccountBindingResponse,
  CreateAcmeExternalAccountBindingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAcmeExternalAccountBindingRequest,
  output: CreateAcmeExternalAccountBindingResponse,
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
  operationName: "CreateAcmeExternalAccountBinding",
}));

export type DeleteAcmeDomainValidationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a domain validation. After deletion, the ACME endpoint can no longer issue certificates for the associated domain.
 */
export const deleteAcmeDomainValidation: API.OperationMethod<
  DeleteAcmeDomainValidationRequest,
  DeleteAcmeDomainValidationResponse,
  DeleteAcmeDomainValidationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAcmeDomainValidationRequest,
  output: DeleteAcmeDomainValidationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAcmeDomainValidation",
}));

export type DeleteAcmeEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an ACME endpoint. After deletion, the endpoint URL is no longer accessible and ACME clients cannot issue certificates through it. Any existing external account bindings and domain validations associated with the endpoint are also deleted.
 */
export const deleteAcmeEndpoint: API.OperationMethod<
  DeleteAcmeEndpointRequest,
  DeleteAcmeEndpointResponse,
  DeleteAcmeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAcmeEndpointRequest,
  output: DeleteAcmeEndpointResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAcmeEndpoint",
}));

export type DeleteAcmeExternalAccountBindingError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an external account binding. Previously fetched credentials for this binding will no longer be usable for account registration. A deleted binding cannot be recovered.
 */
export const deleteAcmeExternalAccountBinding: API.OperationMethod<
  DeleteAcmeExternalAccountBindingRequest,
  DeleteAcmeExternalAccountBindingResponse,
  DeleteAcmeExternalAccountBindingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAcmeExternalAccountBindingRequest,
  output: DeleteAcmeExternalAccountBindingResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAcmeExternalAccountBinding",
}));

export type DeleteCertificateError =
  | AccessDeniedException
  | ConflictException
  | InvalidArnException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a certificate and its associated private key. If this action succeeds, the certificate is not available for use by Amazon Web Services services integrated with ACM. Deleting a certificate is eventually consistent. The may be a short delay before the certificate no longer appears in the list that can be displayed by calling the ListCertificates action or be retrieved by calling the GetCertificate action.
 *
 * You cannot delete an ACM certificate that is being used by another Amazon Web Services service. To delete a certificate that is in use, you must first remove the certificate association using the console or the CLI for the associated service.
 *
 * Deleting a certificate issued by a private certificate authority (CA) has no effect on the CA. You will continue to be charged for the CA until it is deleted. For more information, see Deleting Your Private CA in the *Private Certificate Authority User Guide*.
 *
 * You cannot delete a certificate with a `CertificateKeyPairOrigin` of `ACME`. ACM automatically deletes these certificates 1 year after they expire.
 *
 * Deleting a certificate issued by a private certificate authority (CA) has no effect on the CA. You will continue to be charged for the CA until it is deleted. For more information, see Deleting your private CA in the *Amazon Web Services Private Certificate Authority User Guide*.
 */
export const deleteCertificate: API.OperationMethod<
  DeleteCertificateRequest,
  DeleteCertificateResponse,
  DeleteCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCertificateRequest,
  output: DeleteCertificateResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InvalidArnException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCertificate",
}));

export type DescribeAcmeAccountError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed metadata about the specified ACME account, including its status, public key thumbprint, and associated external account binding.
 */
export const describeAcmeAccount: API.OperationMethod<
  DescribeAcmeAccountRequest,
  DescribeAcmeAccountResponse,
  DescribeAcmeAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAcmeAccountRequest,
  output: DescribeAcmeAccountResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAcmeAccount",
}));

export type DescribeAcmeDomainValidationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed metadata about the specified domain validation, including its status, domain scope, and DNS resource records required for validation.
 */
export const describeAcmeDomainValidation: API.OperationMethod<
  DescribeAcmeDomainValidationRequest,
  DescribeAcmeDomainValidationResponse,
  DescribeAcmeDomainValidationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAcmeDomainValidationRequest,
  output: DescribeAcmeDomainValidationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAcmeDomainValidation",
}));

export type DescribeAcmeEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed metadata about the specified ACME endpoint, including its status, URL, authorization behavior, and certificate authority configuration.
 */
export const describeAcmeEndpoint: API.OperationMethod<
  DescribeAcmeEndpointRequest,
  DescribeAcmeEndpointResponse,
  DescribeAcmeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAcmeEndpointRequest,
  output: DescribeAcmeEndpointResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAcmeEndpoint",
}));

export type DescribeAcmeExternalAccountBindingError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed metadata about the specified external account binding, including the associated IAM role, expiration time, and usage history.
 */
export const describeAcmeExternalAccountBinding: API.OperationMethod<
  DescribeAcmeExternalAccountBindingRequest,
  DescribeAcmeExternalAccountBindingResponse,
  DescribeAcmeExternalAccountBindingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAcmeExternalAccountBindingRequest,
  output: DescribeAcmeExternalAccountBindingResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAcmeExternalAccountBinding",
}));

export type DescribeCertificateError =
  | InvalidArnException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed metadata about the specified ACM certificate.
 *
 * If you have just created a certificate using the `RequestCertificate` action, there is a delay of several seconds before you can retrieve information about it.
 */
export const describeCertificate: API.OperationMethod<
  DescribeCertificateRequest,
  DescribeCertificateResponse,
  DescribeCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCertificateRequest,
  output: DescribeCertificateResponse,
  errors: [InvalidArnException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCertificate",
}));

export type ExportCertificateError =
  | InvalidArnException
  | RequestInProgressException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Exports a private certificate issued by a private certificate authority (CA) or a public certificate for use anywhere. The exported file contains the certificate, the certificate chain, and the encrypted private key associated with the public key that is embedded in the certificate. For security, you must assign a passphrase for the private key when exporting it.
 *
 * For information about exporting and formatting a certificate using the ACM console or CLI, see Export a private certificate and Export a public certificate.
 *
 * ACM public certificates created prior to June 17, 2025 cannot be exported.
 */
export const exportCertificate: API.OperationMethod<
  ExportCertificateRequest,
  ExportCertificateResponse,
  ExportCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportCertificateRequest,
  output: ExportCertificateResponse,
  errors: [
    InvalidArnException,
    RequestInProgressException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportCertificate",
}));

export type GetAccountConfigurationError =
  | AccessDeniedException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the account configuration options associated with an Amazon Web Services account.
 */
export const getAccountConfiguration: API.OperationMethod<
  GetAccountConfigurationRequest,
  GetAccountConfigurationResponse,
  GetAccountConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountConfigurationRequest,
  output: GetAccountConfigurationResponse,
  errors: [AccessDeniedException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountConfiguration",
}));

export type GetAcmeExternalAccountBindingCredentialsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the key ID and MAC key credentials for an external account binding. These credentials are used by ACME clients during account registration to bind to the endpoint.
 */
export const getAcmeExternalAccountBindingCredentials: API.OperationMethod<
  GetAcmeExternalAccountBindingCredentialsRequest,
  GetAcmeExternalAccountBindingCredentialsResponse,
  GetAcmeExternalAccountBindingCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAcmeExternalAccountBindingCredentialsRequest,
  output: GetAcmeExternalAccountBindingCredentialsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAcmeExternalAccountBindingCredentials",
}));

export type GetCertificateError =
  | InvalidArnException
  | RequestInProgressException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a certificate and its certificate chain. The certificate may be either a public or private certificate issued using the ACM `RequestCertificate` action, or a certificate imported into ACM using the `ImportCertificate` action. The chain consists of the certificate of the issuing CA and the intermediate certificates of any other subordinate CAs. All of the certificates are base64 encoded. You can use OpenSSL to decode the certificates and inspect individual fields.
 */
export const getCertificate: API.OperationMethod<
  GetCertificateRequest,
  GetCertificateResponse,
  GetCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCertificateRequest,
  output: GetCertificateResponse,
  errors: [
    InvalidArnException,
    RequestInProgressException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCertificate",
}));

export type ImportCertificateError =
  | ConflictException
  | InvalidArnException
  | InvalidParameterException
  | InvalidTagException
  | LimitExceededException
  | ResourceNotFoundException
  | TagPolicyException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Imports a certificate into Certificate Manager (ACM) to use with services that are integrated with ACM. Note that integrated services allow only certificate types and keys they support to be associated with their resources. Further, their support differs depending on whether the certificate is imported into IAM or into ACM. For more information, see the documentation for each service. For more information about importing certificates into ACM, see Importing Certificates in the *Certificate Manager User Guide*.
 *
 * ACM does not provide managed renewal for certificates that you import.
 *
 * Note the following guidelines when importing third party certificates:
 *
 * - You must enter the private key that matches the certificate you are importing.
 *
 * - The private key must be unencrypted. You cannot import a private key that is protected by a password or a passphrase.
 *
 * - The private key must be no larger than 5 KB (5,120 bytes).
 *
 * - The certificate, private key, and certificate chain must be PEM-encoded.
 *
 * - The current time must be between the `Not Before` and `Not After` certificate fields.
 *
 * - The `Issuer` field must not be empty.
 *
 * - The OCSP authority URL, if present, must not exceed 1000 characters.
 *
 * - To import a new certificate, omit the `CertificateArn` argument. Include this argument only when you want to replace a previously imported certificate.
 *
 * - When you import a certificate by using the CLI, you must specify the certificate, the certificate chain, and the private key by their file names preceded by `fileb://`. For example, you can specify a certificate saved in the `C:\temp` folder as `fileb://C:\temp\certificate_to_import.pem`. If you are making an HTTP or HTTPS Query request, include these arguments as BLOBs.
 *
 * - When you import a certificate by using an SDK, you must specify the certificate, the certificate chain, and the private key files in the manner required by the programming language you're using.
 *
 * - The cryptographic algorithm of an imported certificate must match the algorithm of the signing CA. For example, if the signing CA key type is RSA, then the certificate key type must also be RSA.
 *
 * This operation returns the Amazon Resource Name (ARN) of the imported certificate.
 */
export const importCertificate: API.OperationMethod<
  ImportCertificateRequest,
  ImportCertificateResponse,
  ImportCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportCertificateRequest,
  output: ImportCertificateResponse,
  errors: [
    ConflictException,
    InvalidArnException,
    InvalidParameterException,
    InvalidTagException,
    LimitExceededException,
    ResourceNotFoundException,
    TagPolicyException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportCertificate",
}));

export type ListAcmeAccountsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of ACME accounts registered with the specified ACME endpoint. ACME accounts are created when clients use external account binding credentials to register.
 */
export const listAcmeAccounts: API.PaginatedOperationMethod<
  ListAcmeAccountsRequest,
  ListAcmeAccountsResponse,
  ListAcmeAccountsError,
  Credentials | HttpClient.HttpClient,
  AcmeAccountSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAcmeAccountsRequest,
  output: ListAcmeAccountsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAcmeAccounts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AcmeAccounts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAcmeDomainValidationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of domain validations for the specified ACME endpoint.
 */
export const listAcmeDomainValidations: API.PaginatedOperationMethod<
  ListAcmeDomainValidationsRequest,
  ListAcmeDomainValidationsResponse,
  ListAcmeDomainValidationsError,
  Credentials | HttpClient.HttpClient,
  AcmeDomainValidationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAcmeDomainValidationsRequest,
  output: ListAcmeDomainValidationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAcmeDomainValidations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AcmeDomainValidations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAcmeEndpointsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of ACME endpoints in your account. Use this operation to view all configured ACME endpoints and their current status.
 */
export const listAcmeEndpoints: API.PaginatedOperationMethod<
  ListAcmeEndpointsRequest,
  ListAcmeEndpointsResponse,
  ListAcmeEndpointsError,
  Credentials | HttpClient.HttpClient,
  AcmeEndpointSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAcmeEndpointsRequest,
  output: ListAcmeEndpointsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAcmeEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AcmeEndpoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAcmeExternalAccountBindingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of external account bindings for the specified ACME endpoint.
 */
export const listAcmeExternalAccountBindings: API.PaginatedOperationMethod<
  ListAcmeExternalAccountBindingsRequest,
  ListAcmeExternalAccountBindingsResponse,
  ListAcmeExternalAccountBindingsError,
  Credentials | HttpClient.HttpClient,
  AcmeExternalAccountBindingSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAcmeExternalAccountBindingsRequest,
  output: ListAcmeExternalAccountBindingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAcmeExternalAccountBindings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ExternalAccountBindings",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCertificateDomainValidationsError =
  | AccessDeniedException
  | InvalidArgsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns per-domain validation summaries for an ACM certificate. Each summary includes the domain name, the active validation configuration, and the requested validation configuration when a validation method migration is in progress. You can use the results to monitor the progress of an email-to-DNS validation migration and to retrieve the CNAME records required for DNS validation.
 */
export const listCertificateDomainValidations: API.PaginatedOperationMethod<
  ListCertificateDomainValidationsRequest,
  ListCertificateDomainValidationsResponse,
  ListCertificateDomainValidationsError,
  Credentials | HttpClient.HttpClient,
  DomainValidationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCertificateDomainValidationsRequest,
  output: ListCertificateDomainValidationsResponse,
  errors: [
    AccessDeniedException,
    InvalidArgsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCertificateDomainValidations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DomainValidationSummaryList",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListCertificatesError =
  | InvalidArgsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of certificate ARNs and domain names. You can request that only certificates that match a specific status be listed. You can also filter by specific attributes of the certificate. Default filtering returns only `RSA_2048` certificates. For more information, see Filters.
 *
 * By default, this action does not return certificates with a `CertificateKeyPairOrigin` of `ACME`. To include ACME certificates, specify `ACME` in the `CertificateKeyPairOrigins` filter.
 */
export const listCertificates: API.PaginatedOperationMethod<
  ListCertificatesRequest,
  ListCertificatesResponse,
  ListCertificatesError,
  Credentials | HttpClient.HttpClient,
  CertificateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCertificatesRequest,
  output: ListCertificatesResponse,
  errors: [InvalidArgsException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCertificates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CertificateSummaryList",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListTagsForCertificateError =
  | InvalidArnException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags that have been applied to the ACM certificate. Use the certificate's Amazon Resource Name (ARN) to specify the certificate. To add a tag to an ACM certificate, use the AddTagsToCertificate action. To delete a tag, use the RemoveTagsFromCertificate action.
 *
 * This action applies only to the `certificate` resource type. For all other ACM resource types, use ListTagsForResource instead.
 */
export const listTagsForCertificate: API.OperationMethod<
  ListTagsForCertificateRequest,
  ListTagsForCertificateResponse,
  ListTagsForCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForCertificateRequest,
  output: ListTagsForCertificateResponse,
  errors: [InvalidArnException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForCertificate",
}));

export type ListTagsForResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags associated with an ACM resource.
 *
 * Use this action for all ACM resource types except the `certificate` resource type. For certificate resources, use ListTagsForCertificate instead.
 *
 * To add one or more tags, use the TagResource action. To remove one or more tags, use the UntagResource action.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutAccountConfigurationError =
  | AccessDeniedException
  | ConflictException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or modifies account-level configurations in ACM.
 *
 * The supported configuration option is `DaysBeforeExpiry`. This option specifies the number of days prior to certificate expiration when ACM starts generating `EventBridge` events. ACM sends one event per day per certificate until the certificate expires. By default, accounts receive events starting 45 days before certificate expiration.
 */
export const putAccountConfiguration: API.OperationMethod<
  PutAccountConfigurationRequest,
  PutAccountConfigurationResponse,
  PutAccountConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAccountConfigurationRequest,
  output: PutAccountConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountConfiguration",
}));

export type RemoveTagsFromCertificateError =
  | InvalidArnException
  | InvalidParameterException
  | InvalidTagException
  | ResourceNotFoundException
  | TagPolicyException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Remove one or more tags from an ACM certificate. A tag consists of a key-value pair. If you do not specify the value portion of the tag when calling this function, the tag will be removed regardless of value. If you specify a value, the tag is removed only if it is associated with the specified value.
 *
 * This action applies only to the `certificate` resource type. For all other ACM resource types, use UntagResource instead.
 *
 * To add tags to a certificate, use the AddTagsToCertificate action. To view all of the tags that have been applied to a specific ACM certificate, use the ListTagsForCertificate action.
 */
export const removeTagsFromCertificate: API.OperationMethod<
  RemoveTagsFromCertificateRequest,
  RemoveTagsFromCertificateResponse,
  RemoveTagsFromCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveTagsFromCertificateRequest,
  output: RemoveTagsFromCertificateResponse,
  errors: [
    InvalidArnException,
    InvalidParameterException,
    InvalidTagException,
    ResourceNotFoundException,
    TagPolicyException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTagsFromCertificate",
}));

export type RenewCertificateError =
  | InvalidArnException
  | RequestInProgressException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Renews an eligible ACM certificate. In order to renew your Amazon Web Services Private CA certificates with ACM, you must first grant the ACM service principal permission to do so. For more information, see Testing Managed Renewal in the ACM User Guide.
 */
export const renewCertificate: API.OperationMethod<
  RenewCertificateRequest,
  RenewCertificateResponse,
  RenewCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RenewCertificateRequest,
  output: RenewCertificateResponse,
  errors: [
    InvalidArnException,
    RequestInProgressException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RenewCertificate",
}));

export type RequestCertificateError =
  | InvalidArnException
  | InvalidDomainValidationOptionsException
  | InvalidParameterException
  | InvalidTagException
  | LimitExceededException
  | TagPolicyException
  | TooManyTagsException
  | CommonErrors;
/**
 * Requests an ACM certificate for use with other Amazon Web Services services. To request an ACM certificate, you must specify a fully qualified domain name (FQDN) in the `DomainName` parameter. You can also specify additional FQDNs in the `SubjectAlternativeNames` parameter.
 *
 * If you are requesting a private certificate, domain validation is not required. If you are requesting a public certificate, each domain name that you specify must be validated to verify that you own or control the domain. You can use DNS validation or email validation. We recommend that you use DNS validation.
 *
 * ACM behavior differs from the RFC 6125 specification of the certificate validation process. ACM first checks for a Subject Alternative Name, and, if it finds one, ignores the common name (CN).
 *
 * After successful completion of the `RequestCertificate` action, there is a delay of several seconds before you can retrieve information about the new certificate.
 */
export const requestCertificate: API.OperationMethod<
  RequestCertificateRequest,
  RequestCertificateResponse,
  RequestCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RequestCertificateRequest,
  output: RequestCertificateResponse,
  errors: [
    InvalidArnException,
    InvalidDomainValidationOptionsException,
    InvalidParameterException,
    InvalidTagException,
    LimitExceededException,
    TagPolicyException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RequestCertificate",
}));

export type ResendValidationEmailError =
  | InvalidArnException
  | InvalidDomainValidationOptionsException
  | InvalidStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Resends the email that requests domain ownership validation. The domain owner or an authorized representative must approve the ACM certificate before it can be issued. The certificate can be approved by clicking a link in the mail to navigate to the Amazon certificate approval website and then clicking **I Approve**. However, the validation email can be blocked by spam filters. Therefore, if you do not receive the original mail, you can request that the mail be resent within 72 hours of requesting the ACM certificate. If more than 72 hours have elapsed since your original request or since your last attempt to resend validation mail, you must request a new certificate. For more information about setting up your contact email addresses, see Configure Email for your Domain.
 */
export const resendValidationEmail: API.OperationMethod<
  ResendValidationEmailRequest,
  ResendValidationEmailResponse,
  ResendValidationEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResendValidationEmailRequest,
  output: ResendValidationEmailResponse,
  errors: [
    InvalidArnException,
    InvalidDomainValidationOptionsException,
    InvalidStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResendValidationEmail",
}));

export type RevokeAcmeAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Revokes an ACME account, preventing it from requesting or revoking certificates. This operation is irreversible.
 */
export const revokeAcmeAccount: API.OperationMethod<
  RevokeAcmeAccountRequest,
  RevokeAcmeAccountResponse,
  RevokeAcmeAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RevokeAcmeAccountRequest,
  output: RevokeAcmeAccountResponse,
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
  operationName: "RevokeAcmeAccount",
}));

export type RevokeAcmeExternalAccountBindingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Revokes an external account binding, preventing new ACME accounts from being registered using this binding. Existing ACME accounts that were previously registered using the binding are not affected and must be revoked separately.
 */
export const revokeAcmeExternalAccountBinding: API.OperationMethod<
  RevokeAcmeExternalAccountBindingRequest,
  RevokeAcmeExternalAccountBindingResponse,
  RevokeAcmeExternalAccountBindingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RevokeAcmeExternalAccountBindingRequest,
  output: RevokeAcmeExternalAccountBindingResponse,
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
  operationName: "RevokeAcmeExternalAccountBinding",
}));

export type RevokeCertificateError =
  | AccessDeniedException
  | ConflictException
  | InvalidArnException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Revokes a public ACM certificate. You can only revoke certificates that have been previously exported.
 *
 * Once a certificate is revoked, you cannot reuse the certificate. Revoking a certificate is permanent.
 */
export const revokeCertificate: API.OperationMethod<
  RevokeCertificateRequest,
  RevokeCertificateResponse,
  RevokeCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RevokeCertificateRequest,
  output: RevokeCertificateResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InvalidArnException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokeCertificate",
}));

export type SearchCertificatesError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of certificates matching search criteria. You can filter certificates by X.509 attributes and ACM specific properties like certificate status, type and renewal eligibility. This operation provides more flexible filtering than ListCertificates by supporting complex filter statements.
 */
export const searchCertificates: API.PaginatedOperationMethod<
  SearchCertificatesRequest,
  SearchCertificatesResponse,
  SearchCertificatesError,
  Credentials | HttpClient.HttpClient,
  CertificateSearchResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchCertificatesRequest,
  output: SearchCertificatesResponse,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchCertificates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type TagResourceError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Adds one or more tags to an ACM resource. Tags are labels that you can use to identify and organize your Amazon Web Services resources. Each tag consists of a `key` and an optional `value`.
 *
 * Use this action for all ACM resource types except the `certificate` resource type. For certificate resources, use AddTagsToCertificate instead.
 *
 * To remove one or more tags, use the UntagResource action. To view all of the tags that have been applied to a resource, use the ListTagsForResource action.
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
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from an ACM resource.
 *
 * Use this action for all ACM resource types except the `certificate` resource type. For certificate resources, use RemoveTagsFromCertificate instead.
 *
 * To add one or more tags, use the TagResource action. To view all of the tags that have been applied to a resource, use the ListTagsForResource action.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAcmeDomainValidationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the prevalidation configuration of an existing domain validation.
 */
export const updateAcmeDomainValidation: API.OperationMethod<
  UpdateAcmeDomainValidationRequest,
  UpdateAcmeDomainValidationResponse,
  UpdateAcmeDomainValidationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAcmeDomainValidationRequest,
  output: UpdateAcmeDomainValidationResponse,
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
  operationName: "UpdateAcmeDomainValidation",
}));

export type UpdateAcmeEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing ACME endpoint. You can change the authorization behavior, contact requirement, or certificate authority settings.
 */
export const updateAcmeEndpoint: API.OperationMethod<
  UpdateAcmeEndpointRequest,
  UpdateAcmeEndpointResponse,
  UpdateAcmeEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAcmeEndpointRequest,
  output: UpdateAcmeEndpointResponse,
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
  operationName: "UpdateAcmeEndpoint",
}));

export type UpdateCertificateOptionsError =
  | ConflictException
  | InvalidArnException
  | InvalidStateException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates certificate options. You can use this operation to change the domain validation method or specify whether to export your certificate. For more information, see Migrate from email to DNS validation and Certificate Manager Exportable Managed Certificates.
 */
export const updateCertificateOptions: API.OperationMethod<
  UpdateCertificateOptionsRequest,
  UpdateCertificateOptionsResponse,
  UpdateCertificateOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCertificateOptionsRequest,
  output: UpdateCertificateOptionsResponse,
  errors: [
    ConflictException,
    InvalidArnException,
    InvalidStateException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCertificateOptions",
}));
