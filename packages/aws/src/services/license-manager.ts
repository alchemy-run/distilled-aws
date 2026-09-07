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
const ns = T.XmlNamespace(
  "https://license-manager.amazonaws.com/doc/2018_08_01",
);
const svc = T.AwsApiService({
  sdkId: "License Manager",
  serviceShapeName: "AWSLicenseManager",
});
const auth = T.AwsAuthSigv4({ name: "license-manager" });
const ver = T.ServiceVersion("2018-08-01");
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
              `https://license-manager-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://license-manager-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://license-manager.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://license-manager.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ServiceAccessDenied", httpResponseCode: 401 }),
      T.HttpError(401),
    ),
  ).pipe(C.withAuthError) {}
export class AuthorizationException
  extends /*@__PURE__*/ S.TaggedError<AuthorizationException>()(
    "AuthorizationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "AuthorizationFailure", httpResponseCode: 403 }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ConflictException", httpResponseCode: 409 }),
      T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class EntitlementNotAllowedException
  extends /*@__PURE__*/ S.TaggedError<EntitlementNotAllowedException>()(
    "EntitlementNotAllowedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class FailedDependencyException
  extends /*@__PURE__*/ S.TaggedError<FailedDependencyException>()(
    "FailedDependencyException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ErrorCode: S.optional(S.String),
    },
    T.all(
      T.AwsQueryError({ code: "FailedDependency", httpResponseCode: 424 }),
      T.HttpError(424),
    ),
  ) {}
export class FilterLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<FilterLimitExceededException>()(
    "FilterLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "FilterLimitExceeded", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidParameterValueProvided",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidResourceStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceStateException>()(
    "InvalidResourceStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidResourceState", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class LicenseConfigurationNotFound
  extends /*@__PURE__*/ S.TaggedError<LicenseConfigurationNotFound>()(
    "LicenseConfigurationNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "InvalidParameterValueException",
      message: { includes: "Invalid license configuration ARN" },
    }),
  ).pipe(C.withNotFoundError) {}
export class LicenseUsageException
  extends /*@__PURE__*/ S.TaggedError<LicenseUsageException>()(
    "LicenseUsageException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "LicenseUsageFailure", httpResponseCode: 412 }),
      T.HttpError(412),
    ),
  ) {}
export class NoEntitlementsAllowedException
  extends /*@__PURE__*/ S.TaggedError<NoEntitlementsAllowedException>()(
    "NoEntitlementsAllowedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class RateLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<RateLimitExceededException>()(
    "RateLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "RateLimitExceeded", httpResponseCode: 429 }),
      T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export class RedirectException
  extends /*@__PURE__*/ S.TaggedError<RedirectException>()(
    "RedirectException",
    {
      Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(308),
  ) {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceLimitExceededException>()(
    "ResourceLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ResourceLimitExceeded", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidResource.NotFound",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServerInternalException
  extends /*@__PURE__*/ S.TaggedError<ServerInternalException>()(
    "ServerInternalException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InternalError", httpResponseCode: 500 }),
      T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class UnsupportedDigitalSignatureMethodException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedDigitalSignatureMethodException>()(
    "UnsupportedDigitalSignatureMethodException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Arn = string;
export interface AcceptGrantRequest {
  GrantArn: string;
}
export const AcceptGrantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GrantArn: S.String }).pipe(
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
  identifier: "AcceptGrantRequest",
}) as any as S.Schema<AcceptGrantRequest>;
export type GrantStatus =
  | "PENDING_WORKFLOW"
  | "PENDING_ACCEPT"
  | "REJECTED"
  | "ACTIVE"
  | "FAILED_WORKFLOW"
  | "DELETED"
  | "PENDING_DELETE"
  | "DISABLED"
  | "WORKFLOW_COMPLETED"
  | (string & {});
export const GrantStatus = /*@__PURE__*/ S.String;

export interface AcceptGrantResponse {
  GrantArn?: string;
  Status?: GrantStatus;
  Version?: string;
}
export const AcceptGrantResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GrantArn: S.optional(S.String),
    Status: S.optional(GrantStatus),
    Version: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "AcceptGrantResponse",
}) as any as S.Schema<AcceptGrantResponse>;
export interface CheckInLicenseRequest {
  LicenseConsumptionToken: string;
  Beneficiary?: string;
}
export const CheckInLicenseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseConsumptionToken: S.String,
    Beneficiary: S.optional(S.String),
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
  identifier: "CheckInLicenseRequest",
}) as any as S.Schema<CheckInLicenseRequest>;
export interface CheckInLicenseResponse {}
export const CheckInLicenseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CheckInLicenseResponse",
}) as any as S.Schema<CheckInLicenseResponse>;
export type EntitlementDataUnit =
  | "Count"
  | "None"
  | "Seconds"
  | "Microseconds"
  | "Milliseconds"
  | "Bytes"
  | "Kilobytes"
  | "Megabytes"
  | "Gigabytes"
  | "Terabytes"
  | "Bits"
  | "Kilobits"
  | "Megabits"
  | "Gigabits"
  | "Terabits"
  | "Percent"
  | "Bytes/Second"
  | "Kilobytes/Second"
  | "Megabytes/Second"
  | "Gigabytes/Second"
  | "Terabytes/Second"
  | "Bits/Second"
  | "Kilobits/Second"
  | "Megabits/Second"
  | "Gigabits/Second"
  | "Terabits/Second"
  | "Count/Second"
  | (string & {});
export const EntitlementDataUnit = /*@__PURE__*/ S.String;

export interface EntitlementData {
  Name: string;
  Value?: string;
  Unit: EntitlementDataUnit;
}
export const EntitlementData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Value: S.optional(S.String),
    Unit: EntitlementDataUnit,
  }),
).annotate({
  identifier: "EntitlementData",
}) as any as S.Schema<EntitlementData>;
export type EntitlementDataList = EntitlementData[];
export const EntitlementDataList = /*@__PURE__*/ S.Array(EntitlementData);
export type DigitalSignatureMethod = "JWT_PS384" | (string & {});
export const DigitalSignatureMethod = /*@__PURE__*/ S.String;

export interface Metadata {
  Name?: string;
  Value?: string;
}
export const Metadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Metadata" }) as any as S.Schema<Metadata>;
export type MetadataList = Metadata[];
export const MetadataList = /*@__PURE__*/ S.Array(Metadata);
export type ClientToken = string;
export interface CheckoutBorrowLicenseRequest {
  LicenseArn: string;
  Entitlements: EntitlementData[];
  DigitalSignatureMethod: DigitalSignatureMethod;
  NodeId?: string;
  CheckoutMetadata?: Metadata[];
  ClientToken: string;
}
export const CheckoutBorrowLicenseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseArn: S.String,
    Entitlements: EntitlementDataList,
    DigitalSignatureMethod: DigitalSignatureMethod,
    NodeId: S.optional(S.String),
    CheckoutMetadata: S.optional(MetadataList),
    ClientToken: S.String,
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
  identifier: "CheckoutBorrowLicenseRequest",
}) as any as S.Schema<CheckoutBorrowLicenseRequest>;
export type SignedToken = string;
export type ISO8601DateTime = string;
export interface CheckoutBorrowLicenseResponse {
  LicenseArn?: string;
  LicenseConsumptionToken?: string;
  EntitlementsAllowed?: EntitlementData[];
  NodeId?: string;
  SignedToken?: string;
  IssuedAt?: string;
  Expiration?: string;
  CheckoutMetadata?: Metadata[];
}
export const CheckoutBorrowLicenseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseArn: S.optional(S.String),
    LicenseConsumptionToken: S.optional(S.String),
    EntitlementsAllowed: S.optional(EntitlementDataList),
    NodeId: S.optional(S.String),
    SignedToken: S.optional(S.String),
    IssuedAt: S.optional(S.String),
    Expiration: S.optional(S.String),
    CheckoutMetadata: S.optional(MetadataList),
  }).pipe(ns),
).annotate({
  identifier: "CheckoutBorrowLicenseResponse",
}) as any as S.Schema<CheckoutBorrowLicenseResponse>;
export type CheckoutType = "PROVISIONAL" | "PERPETUAL" | (string & {});
export const CheckoutType = /*@__PURE__*/ S.String;

export interface CheckoutLicenseRequest {
  ProductSKU: string;
  CheckoutType: CheckoutType;
  KeyFingerprint: string;
  Entitlements: EntitlementData[];
  ClientToken: string;
  Beneficiary?: string;
  NodeId?: string;
}
export const CheckoutLicenseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductSKU: S.String,
    CheckoutType: CheckoutType,
    KeyFingerprint: S.String,
    Entitlements: EntitlementDataList,
    ClientToken: S.String,
    Beneficiary: S.optional(S.String),
    NodeId: S.optional(S.String),
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
  identifier: "CheckoutLicenseRequest",
}) as any as S.Schema<CheckoutLicenseRequest>;
export interface CheckoutLicenseResponse {
  CheckoutType?: CheckoutType;
  LicenseConsumptionToken?: string;
  EntitlementsAllowed?: EntitlementData[];
  SignedToken?: string;
  NodeId?: string;
  IssuedAt?: string;
  Expiration?: string;
  LicenseArn?: string;
}
export const CheckoutLicenseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CheckoutType: S.optional(CheckoutType),
    LicenseConsumptionToken: S.optional(S.String),
    EntitlementsAllowed: S.optional(EntitlementDataList),
    SignedToken: S.optional(S.String),
    NodeId: S.optional(S.String),
    IssuedAt: S.optional(S.String),
    Expiration: S.optional(S.String),
    LicenseArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CheckoutLicenseResponse",
}) as any as S.Schema<CheckoutLicenseResponse>;
export type PrincipalArnList = string[];
export const PrincipalArnList = /*@__PURE__*/ S.Array(S.String);
export type AllowedOperation =
  | "CreateGrant"
  | "CheckoutLicense"
  | "CheckoutBorrowLicense"
  | "CheckInLicense"
  | "ExtendConsumptionLicense"
  | "ListPurchasedLicenses"
  | "CreateToken"
  | (string & {});
export const AllowedOperation = /*@__PURE__*/ S.String;

export type AllowedOperationList = AllowedOperation[];
export const AllowedOperationList = /*@__PURE__*/ S.Array(AllowedOperation);
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface CreateGrantRequest {
  ClientToken: string;
  GrantName: string;
  LicenseArn: string;
  Principals: string[];
  HomeRegion: string;
  AllowedOperations: AllowedOperation[];
  Tags?: Tag[];
}
export const CreateGrantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.String,
    GrantName: S.String,
    LicenseArn: S.String,
    Principals: PrincipalArnList,
    HomeRegion: S.String,
    AllowedOperations: AllowedOperationList,
    Tags: S.optional(TagList),
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
  identifier: "CreateGrantRequest",
}) as any as S.Schema<CreateGrantRequest>;
export interface CreateGrantResponse {
  GrantArn?: string;
  Status?: GrantStatus;
  Version?: string;
}
export const CreateGrantResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GrantArn: S.optional(S.String),
    Status: S.optional(GrantStatus),
    Version: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateGrantResponse",
}) as any as S.Schema<CreateGrantResponse>;
export type StatusReasonMessage = string;
export type ActivationOverrideBehavior =
  | "DISTRIBUTED_GRANTS_ONLY"
  | "ALL_GRANTS_PERMITTED_BY_ISSUER"
  | (string & {});
export const ActivationOverrideBehavior = /*@__PURE__*/ S.String;

export interface Options {
  ActivationOverrideBehavior?: ActivationOverrideBehavior;
}
export const Options = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActivationOverrideBehavior: S.optional(ActivationOverrideBehavior),
  }),
).annotate({ identifier: "Options" }) as any as S.Schema<Options>;
export interface CreateGrantVersionRequest {
  ClientToken: string;
  GrantArn: string;
  GrantName?: string;
  AllowedOperations?: AllowedOperation[];
  Status?: GrantStatus;
  StatusReason?: string;
  SourceVersion?: string;
  Options?: Options;
}
export const CreateGrantVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.String,
    GrantArn: S.String,
    GrantName: S.optional(S.String),
    AllowedOperations: S.optional(AllowedOperationList),
    Status: S.optional(GrantStatus),
    StatusReason: S.optional(S.String),
    SourceVersion: S.optional(S.String),
    Options: S.optional(Options),
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
  identifier: "CreateGrantVersionRequest",
}) as any as S.Schema<CreateGrantVersionRequest>;
export interface CreateGrantVersionResponse {
  GrantArn?: string;
  Status?: GrantStatus;
  Version?: string;
}
export const CreateGrantVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GrantArn: S.optional(S.String),
    Status: S.optional(GrantStatus),
    Version: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateGrantVersionResponse",
}) as any as S.Schema<CreateGrantVersionResponse>;
export interface Issuer {
  Name: string;
  SignKey?: string;
}
export const Issuer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, SignKey: S.optional(S.String) }),
).annotate({ identifier: "Issuer" }) as any as S.Schema<Issuer>;
export interface DatetimeRange {
  Begin: string;
  End?: string;
}
export const DatetimeRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Begin: S.String, End: S.optional(S.String) }),
).annotate({ identifier: "DatetimeRange" }) as any as S.Schema<DatetimeRange>;
export type BoxBoolean = boolean;
export type EntitlementUnit =
  | "Count"
  | "None"
  | "Seconds"
  | "Microseconds"
  | "Milliseconds"
  | "Bytes"
  | "Kilobytes"
  | "Megabytes"
  | "Gigabytes"
  | "Terabytes"
  | "Bits"
  | "Kilobits"
  | "Megabits"
  | "Gigabits"
  | "Terabits"
  | "Percent"
  | "Bytes/Second"
  | "Kilobytes/Second"
  | "Megabytes/Second"
  | "Gigabytes/Second"
  | "Terabytes/Second"
  | "Bits/Second"
  | "Kilobits/Second"
  | "Megabits/Second"
  | "Gigabits/Second"
  | "Terabits/Second"
  | "Count/Second"
  | (string & {});
export const EntitlementUnit = /*@__PURE__*/ S.String;

export interface Entitlement {
  Name: string;
  Value?: string;
  MaxCount?: number;
  Overage?: boolean;
  Unit: EntitlementUnit;
  AllowCheckIn?: boolean;
}
export const Entitlement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Value: S.optional(S.String),
    MaxCount: S.optional(S.Number),
    Overage: S.optional(S.Boolean),
    Unit: EntitlementUnit,
    AllowCheckIn: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Entitlement" }) as any as S.Schema<Entitlement>;
export type EntitlementList = Entitlement[];
export const EntitlementList = /*@__PURE__*/ S.Array(Entitlement);
export type RenewType = "None" | "Weekly" | "Monthly" | (string & {});
export const RenewType = /*@__PURE__*/ S.String;

export type BoxInteger = number;
export interface ProvisionalConfiguration {
  MaxTimeToLiveInMinutes: number;
}
export const ProvisionalConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MaxTimeToLiveInMinutes: S.Number }),
).annotate({
  identifier: "ProvisionalConfiguration",
}) as any as S.Schema<ProvisionalConfiguration>;
export interface BorrowConfiguration {
  AllowEarlyCheckIn: boolean;
  MaxTimeToLiveInMinutes: number;
}
export const BorrowConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AllowEarlyCheckIn: S.Boolean, MaxTimeToLiveInMinutes: S.Number }),
).annotate({
  identifier: "BorrowConfiguration",
}) as any as S.Schema<BorrowConfiguration>;
export interface ConsumptionConfiguration {
  RenewType?: RenewType;
  ProvisionalConfiguration?: ProvisionalConfiguration;
  BorrowConfiguration?: BorrowConfiguration;
}
export const ConsumptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RenewType: S.optional(RenewType),
    ProvisionalConfiguration: S.optional(ProvisionalConfiguration),
    BorrowConfiguration: S.optional(BorrowConfiguration),
  }),
).annotate({
  identifier: "ConsumptionConfiguration",
}) as any as S.Schema<ConsumptionConfiguration>;
export interface CreateLicenseRequest {
  LicenseName: string;
  ProductName: string;
  ProductSKU: string;
  Issuer: Issuer;
  HomeRegion: string;
  Validity: DatetimeRange;
  Entitlements: Entitlement[];
  Beneficiary: string;
  ConsumptionConfiguration: ConsumptionConfiguration;
  LicenseMetadata?: Metadata[];
  ClientToken: string;
  Tags?: Tag[];
}
export const CreateLicenseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseName: S.String,
    ProductName: S.String,
    ProductSKU: S.String,
    Issuer: Issuer,
    HomeRegion: S.String,
    Validity: DatetimeRange,
    Entitlements: EntitlementList,
    Beneficiary: S.String,
    ConsumptionConfiguration: ConsumptionConfiguration,
    LicenseMetadata: S.optional(MetadataList),
    ClientToken: S.String,
    Tags: S.optional(TagList),
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
  identifier: "CreateLicenseRequest",
}) as any as S.Schema<CreateLicenseRequest>;
export type LicenseStatus =
  | "AVAILABLE"
  | "PENDING_AVAILABLE"
  | "DEACTIVATED"
  | "SUSPENDED"
  | "EXPIRED"
  | "PENDING_DELETE"
  | "DELETED"
  | (string & {});
export const LicenseStatus = /*@__PURE__*/ S.String;

export interface CreateLicenseResponse {
  LicenseArn?: string;
  Status?: LicenseStatus;
  Version?: string;
}
export const CreateLicenseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseArn: S.optional(S.String),
    Status: S.optional(LicenseStatus),
    Version: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateLicenseResponse",
}) as any as S.Schema<CreateLicenseResponse>;
export type LicenseAssetResourceName = string;
export type LicenseAssetResourceDescription = string;
export interface LicenseAssetGroupConfiguration {
  UsageDimension?: string;
}
export const LicenseAssetGroupConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UsageDimension: S.optional(S.String) }),
).annotate({
  identifier: "LicenseAssetGroupConfiguration",
}) as any as S.Schema<LicenseAssetGroupConfiguration>;
export type LicenseAssetGroupConfigurationList =
  LicenseAssetGroupConfiguration[];
export const LicenseAssetGroupConfigurationList = /*@__PURE__*/ S.Array(
  LicenseAssetGroupConfiguration,
);
export type LicenseAssetRulesetArnList = string[];
export const LicenseAssetRulesetArnList = /*@__PURE__*/ S.Array(S.String);
export interface LicenseAssetGroupProperty {
  Key: string;
  Value: string;
}
export const LicenseAssetGroupProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({
  identifier: "LicenseAssetGroupProperty",
}) as any as S.Schema<LicenseAssetGroupProperty>;
export type LicenseAssetGroupPropertyList = LicenseAssetGroupProperty[];
export const LicenseAssetGroupPropertyList = /*@__PURE__*/ S.Array(
  LicenseAssetGroupProperty,
);
export interface CreateLicenseAssetGroupRequest {
  Name: string;
  Description?: string;
  LicenseAssetGroupConfigurations: LicenseAssetGroupConfiguration[];
  AssociatedLicenseAssetRulesetARNs: string[];
  Properties?: LicenseAssetGroupProperty[];
  Tags?: Tag[];
  ClientToken: string;
}
export const CreateLicenseAssetGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    LicenseAssetGroupConfigurations: LicenseAssetGroupConfigurationList,
    AssociatedLicenseAssetRulesetARNs: LicenseAssetRulesetArnList,
    Properties: S.optional(LicenseAssetGroupPropertyList),
    Tags: S.optional(TagList),
    ClientToken: S.String,
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
  identifier: "CreateLicenseAssetGroupRequest",
}) as any as S.Schema<CreateLicenseAssetGroupRequest>;
export interface CreateLicenseAssetGroupResponse {
  LicenseAssetGroupArn: string;
  Status: string;
}
export const CreateLicenseAssetGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LicenseAssetGroupArn: S.String, Status: S.String }).pipe(ns),
).annotate({
  identifier: "CreateLicenseAssetGroupResponse",
}) as any as S.Schema<CreateLicenseAssetGroupResponse>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface MatchingRuleStatement {
  KeyToMatch: string;
  Constraint: string;
  ValueToMatch: string[];
}
export const MatchingRuleStatement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyToMatch: S.String,
    Constraint: S.String,
    ValueToMatch: StringList,
  }),
).annotate({
  identifier: "MatchingRuleStatement",
}) as any as S.Schema<MatchingRuleStatement>;
export type MatchingRuleStatementList = MatchingRuleStatement[];
export const MatchingRuleStatementList = /*@__PURE__*/ S.Array(
  MatchingRuleStatement,
);
export interface ScriptRuleStatement {
  KeyToMatch: string;
  Script: string;
}
export const ScriptRuleStatement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ KeyToMatch: S.String, Script: S.String }),
).annotate({
  identifier: "ScriptRuleStatement",
}) as any as S.Schema<ScriptRuleStatement>;
export type ScriptRuleStatementList = ScriptRuleStatement[];
export const ScriptRuleStatementList =
  /*@__PURE__*/ S.Array(ScriptRuleStatement);
export interface AndRuleStatement {
  MatchingRuleStatements?: MatchingRuleStatement[];
  ScriptRuleStatements?: ScriptRuleStatement[];
}
export const AndRuleStatement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MatchingRuleStatements: S.optional(MatchingRuleStatementList),
    ScriptRuleStatements: S.optional(ScriptRuleStatementList),
  }),
).annotate({
  identifier: "AndRuleStatement",
}) as any as S.Schema<AndRuleStatement>;
export interface OrRuleStatement {
  MatchingRuleStatements?: MatchingRuleStatement[];
  ScriptRuleStatements?: ScriptRuleStatement[];
}
export const OrRuleStatement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MatchingRuleStatements: S.optional(MatchingRuleStatementList),
    ScriptRuleStatements: S.optional(ScriptRuleStatementList),
  }),
).annotate({
  identifier: "OrRuleStatement",
}) as any as S.Schema<OrRuleStatement>;
export interface LicenseConfigurationRuleStatement {
  AndRuleStatement?: AndRuleStatement;
  OrRuleStatement?: OrRuleStatement;
  MatchingRuleStatement?: MatchingRuleStatement;
}
export const LicenseConfigurationRuleStatement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AndRuleStatement: S.optional(AndRuleStatement),
    OrRuleStatement: S.optional(OrRuleStatement),
    MatchingRuleStatement: S.optional(MatchingRuleStatement),
  }),
).annotate({
  identifier: "LicenseConfigurationRuleStatement",
}) as any as S.Schema<LicenseConfigurationRuleStatement>;
export interface LicenseRuleStatement {
  AndRuleStatement?: AndRuleStatement;
  OrRuleStatement?: OrRuleStatement;
  MatchingRuleStatement?: MatchingRuleStatement;
}
export const LicenseRuleStatement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AndRuleStatement: S.optional(AndRuleStatement),
    OrRuleStatement: S.optional(OrRuleStatement),
    MatchingRuleStatement: S.optional(MatchingRuleStatement),
  }),
).annotate({
  identifier: "LicenseRuleStatement",
}) as any as S.Schema<LicenseRuleStatement>;
export interface InstanceRuleStatement {
  AndRuleStatement?: AndRuleStatement;
  OrRuleStatement?: OrRuleStatement;
  MatchingRuleStatement?: MatchingRuleStatement;
  ScriptRuleStatement?: ScriptRuleStatement;
}
export const InstanceRuleStatement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AndRuleStatement: S.optional(AndRuleStatement),
    OrRuleStatement: S.optional(OrRuleStatement),
    MatchingRuleStatement: S.optional(MatchingRuleStatement),
    ScriptRuleStatement: S.optional(ScriptRuleStatement),
  }),
).annotate({
  identifier: "InstanceRuleStatement",
}) as any as S.Schema<InstanceRuleStatement>;
export interface RuleStatement {
  LicenseConfigurationRuleStatement?: LicenseConfigurationRuleStatement;
  LicenseRuleStatement?: LicenseRuleStatement;
  InstanceRuleStatement?: InstanceRuleStatement;
}
export const RuleStatement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseConfigurationRuleStatement: S.optional(
      LicenseConfigurationRuleStatement,
    ),
    LicenseRuleStatement: S.optional(LicenseRuleStatement),
    InstanceRuleStatement: S.optional(InstanceRuleStatement),
  }),
).annotate({ identifier: "RuleStatement" }) as any as S.Schema<RuleStatement>;
export interface LicenseAssetRule {
  RuleStatement: RuleStatement;
}
export const LicenseAssetRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleStatement: RuleStatement }),
).annotate({
  identifier: "LicenseAssetRule",
}) as any as S.Schema<LicenseAssetRule>;
export type LicenseAssetRuleList = LicenseAssetRule[];
export const LicenseAssetRuleList = /*@__PURE__*/ S.Array(LicenseAssetRule);
export interface CreateLicenseAssetRulesetRequest {
  Name: string;
  Description?: string;
  Rules: LicenseAssetRule[];
  Tags?: Tag[];
  ClientToken: string;
}
export const CreateLicenseAssetRulesetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    Rules: LicenseAssetRuleList,
    Tags: S.optional(TagList),
    ClientToken: S.String,
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
  identifier: "CreateLicenseAssetRulesetRequest",
}) as any as S.Schema<CreateLicenseAssetRulesetRequest>;
export interface CreateLicenseAssetRulesetResponse {
  LicenseAssetRulesetArn: string;
}
export const CreateLicenseAssetRulesetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LicenseAssetRulesetArn: S.String }).pipe(ns),
).annotate({
  identifier: "CreateLicenseAssetRulesetResponse",
}) as any as S.Schema<CreateLicenseAssetRulesetResponse>;
export type LicenseCountingType =
  | "vCPU"
  | "Instance"
  | "Core"
  | "Socket"
  | (string & {});
export const LicenseCountingType = /*@__PURE__*/ S.String;

export type BoxLong = number;
export interface ProductInformationFilter {
  ProductInformationFilterName: string;
  ProductInformationFilterValue?: string[];
  ProductInformationFilterComparator: string;
}
export const ProductInformationFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductInformationFilterName: S.String,
    ProductInformationFilterValue: S.optional(StringList),
    ProductInformationFilterComparator: S.String,
  }),
).annotate({
  identifier: "ProductInformationFilter",
}) as any as S.Schema<ProductInformationFilter>;
export type ProductInformationFilterList = ProductInformationFilter[];
export const ProductInformationFilterList = /*@__PURE__*/ S.Array(
  ProductInformationFilter,
);
export interface ProductInformation {
  ResourceType: string;
  ProductInformationFilterList: ProductInformationFilter[];
}
export const ProductInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceType: S.String,
    ProductInformationFilterList: ProductInformationFilterList,
  }),
).annotate({
  identifier: "ProductInformation",
}) as any as S.Schema<ProductInformation>;
export type ProductInformationList = ProductInformation[];
export const ProductInformationList = /*@__PURE__*/ S.Array(ProductInformation);
export interface CreateLicenseConfigurationRequest {
  Name: string;
  Description?: string;
  LicenseCountingType: LicenseCountingType;
  LicenseCount?: number;
  LicenseCountHardLimit?: boolean;
  LicenseRules?: string[];
  Tags?: Tag[];
  DisassociateWhenNotFound?: boolean;
  ProductInformationList?: ProductInformation[];
  LicenseExpiry?: number;
}
export const CreateLicenseConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    LicenseCountingType: LicenseCountingType,
    LicenseCount: S.optional(S.Number),
    LicenseCountHardLimit: S.optional(S.Boolean),
    LicenseRules: S.optional(StringList),
    Tags: S.optional(TagList),
    DisassociateWhenNotFound: S.optional(S.Boolean),
    ProductInformationList: S.optional(ProductInformationList),
    LicenseExpiry: S.optional(S.Number),
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
  identifier: "CreateLicenseConfigurationRequest",
}) as any as S.Schema<CreateLicenseConfigurationRequest>;
export interface CreateLicenseConfigurationResponse {
  LicenseConfigurationArn?: string;
}
export const CreateLicenseConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LicenseConfigurationArn: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateLicenseConfigurationResponse",
}) as any as S.Schema<CreateLicenseConfigurationResponse>;
export type UsageOperation = string;
export type ProductCodeId = string;
export type ProductCodeType = "marketplace" | (string & {});
export const ProductCodeType = /*@__PURE__*/ S.String;

export interface ProductCodeListItem {
  ProductCodeId: string;
  ProductCodeType: ProductCodeType;
}
export const ProductCodeListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProductCodeId: S.String, ProductCodeType: ProductCodeType }),
).annotate({
  identifier: "ProductCodeListItem",
}) as any as S.Schema<ProductCodeListItem>;
export type ProductCodeList = ProductCodeListItem[];
export const ProductCodeList = /*@__PURE__*/ S.Array(ProductCodeListItem);
export interface LicenseConversionContext {
  UsageOperation?: string;
  ProductCodes?: ProductCodeListItem[];
}
export const LicenseConversionContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UsageOperation: S.optional(S.String),
    ProductCodes: S.optional(ProductCodeList),
  }),
).annotate({
  identifier: "LicenseConversionContext",
}) as any as S.Schema<LicenseConversionContext>;
export interface CreateLicenseConversionTaskForResourceRequest {
  ResourceArn: string;
  SourceLicenseContext: LicenseConversionContext;
  DestinationLicenseContext: LicenseConversionContext;
}
export const CreateLicenseConversionTaskForResourceRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ResourceArn: S.String,
      SourceLicenseContext: LicenseConversionContext,
      DestinationLicenseContext: LicenseConversionContext,
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
    identifier: "CreateLicenseConversionTaskForResourceRequest",
  }) as any as S.Schema<CreateLicenseConversionTaskForResourceRequest>;
export type LicenseConversionTaskId = string;
export interface CreateLicenseConversionTaskForResourceResponse {
  LicenseConversionTaskId?: string;
}
export const CreateLicenseConversionTaskForResourceResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ LicenseConversionTaskId: S.optional(S.String) }).pipe(ns),
  ).annotate({
    identifier: "CreateLicenseConversionTaskForResourceResponse",
  }) as any as S.Schema<CreateLicenseConversionTaskForResourceResponse>;
export type ReportGeneratorName = string;
export type ReportType =
  | "LicenseConfigurationSummaryReport"
  | "LicenseConfigurationUsageReport"
  | "LicenseAssetGroupUsageReport"
  | (string & {});
export const ReportType = /*@__PURE__*/ S.String;

export type ReportTypeList = ReportType[];
export const ReportTypeList = /*@__PURE__*/ S.Array(ReportType);
export type ArnList = string[];
export const ArnList = /*@__PURE__*/ S.Array(S.String);
export interface ReportContext {
  licenseConfigurationArns?: string[];
  licenseAssetGroupArns?: string[];
  reportStartDate?: Date;
  reportEndDate?: Date;
}
export const ReportContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    licenseConfigurationArns: S.optional(ArnList),
    licenseAssetGroupArns: S.optional(ArnList),
    reportStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    reportEndDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "ReportContext" }) as any as S.Schema<ReportContext>;
export type ReportFrequencyType =
  | "DAY"
  | "WEEK"
  | "MONTH"
  | "ONE_TIME"
  | (string & {});
export const ReportFrequencyType = /*@__PURE__*/ S.String;

export interface ReportFrequency {
  value?: number;
  period?: ReportFrequencyType;
}
export const ReportFrequency = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    value: S.optional(S.Number),
    period: S.optional(ReportFrequencyType),
  }),
).annotate({
  identifier: "ReportFrequency",
}) as any as S.Schema<ReportFrequency>;
export type ClientRequestToken = string;
export interface CreateLicenseManagerReportGeneratorRequest {
  ReportGeneratorName: string;
  Type: ReportType[];
  ReportContext: ReportContext;
  ReportFrequency: ReportFrequency;
  ClientToken: string;
  Description?: string;
  Tags?: Tag[];
}
export const CreateLicenseManagerReportGeneratorRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReportGeneratorName: S.String,
      Type: ReportTypeList,
      ReportContext: ReportContext,
      ReportFrequency: ReportFrequency,
      ClientToken: S.String,
      Description: S.optional(S.String),
      Tags: S.optional(TagList),
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
    identifier: "CreateLicenseManagerReportGeneratorRequest",
  }) as any as S.Schema<CreateLicenseManagerReportGeneratorRequest>;
export interface CreateLicenseManagerReportGeneratorResponse {
  LicenseManagerReportGeneratorArn?: string;
}
export const CreateLicenseManagerReportGeneratorResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ LicenseManagerReportGeneratorArn: S.optional(S.String) }).pipe(
      ns,
    ),
  ).annotate({
    identifier: "CreateLicenseManagerReportGeneratorResponse",
  }) as any as S.Schema<CreateLicenseManagerReportGeneratorResponse>;
export interface CreateLicenseVersionRequest {
  LicenseArn: string;
  LicenseName: string;
  ProductName: string;
  Issuer: Issuer;
  HomeRegion: string;
  Validity: DatetimeRange;
  LicenseMetadata?: Metadata[];
  Entitlements: Entitlement[];
  ConsumptionConfiguration: ConsumptionConfiguration;
  Status: LicenseStatus;
  ClientToken: string;
  SourceVersion?: string;
}
export const CreateLicenseVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseArn: S.String,
    LicenseName: S.String,
    ProductName: S.String,
    Issuer: Issuer,
    HomeRegion: S.String,
    Validity: DatetimeRange,
    LicenseMetadata: S.optional(MetadataList),
    Entitlements: EntitlementList,
    ConsumptionConfiguration: ConsumptionConfiguration,
    Status: LicenseStatus,
    ClientToken: S.String,
    SourceVersion: S.optional(S.String),
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
  identifier: "CreateLicenseVersionRequest",
}) as any as S.Schema<CreateLicenseVersionRequest>;
export interface CreateLicenseVersionResponse {
  LicenseArn?: string;
  Version?: string;
  Status?: LicenseStatus;
}
export const CreateLicenseVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseArn: S.optional(S.String),
    Version: S.optional(S.String),
    Status: S.optional(LicenseStatus),
  }).pipe(ns),
).annotate({
  identifier: "CreateLicenseVersionResponse",
}) as any as S.Schema<CreateLicenseVersionResponse>;
export type MaxSize3StringList = string[];
export const MaxSize3StringList = /*@__PURE__*/ S.Array(S.String);
export interface CreateTokenRequest {
  LicenseArn: string;
  RoleArns?: string[];
  ExpirationInDays?: number;
  TokenProperties?: string[];
  ClientToken: string;
}
export const CreateTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseArn: S.String,
    RoleArns: S.optional(ArnList),
    ExpirationInDays: S.optional(S.Number),
    TokenProperties: S.optional(MaxSize3StringList),
    ClientToken: S.String,
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
  identifier: "CreateTokenRequest",
}) as any as S.Schema<CreateTokenRequest>;
export type TokenType = "REFRESH_TOKEN" | (string & {});
export const TokenType = /*@__PURE__*/ S.String;

export type TokenString = string;
export interface CreateTokenResponse {
  TokenId?: string;
  TokenType?: TokenType;
  Token?: string | redacted.Redacted<string>;
}
export const CreateTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TokenId: S.optional(S.String),
    TokenType: S.optional(TokenType),
    Token: S.optional(SensitiveString),
  }).pipe(ns),
).annotate({
  identifier: "CreateTokenResponse",
}) as any as S.Schema<CreateTokenResponse>;
export interface DeleteGrantRequest {
  GrantArn: string;
  StatusReason?: string;
  Version: string;
}
export const DeleteGrantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GrantArn: S.String,
    StatusReason: S.optional(S.String),
    Version: S.String,
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
  identifier: "DeleteGrantRequest",
}) as any as S.Schema<DeleteGrantRequest>;
export interface DeleteGrantResponse {
  GrantArn?: string;
  Status?: GrantStatus;
  Version?: string;
}
export const DeleteGrantResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GrantArn: S.optional(S.String),
    Status: S.optional(GrantStatus),
    Version: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DeleteGrantResponse",
}) as any as S.Schema<DeleteGrantResponse>;
export interface DeleteLicenseRequest {
  LicenseArn: string;
  SourceVersion: string;
}
export const DeleteLicenseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LicenseArn: S.String, SourceVersion: S.String }).pipe(
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
  identifier: "DeleteLicenseRequest",
}) as any as S.Schema<DeleteLicenseRequest>;
export type LicenseDeletionStatus =
  | "PENDING_DELETE"
  | "DELETED"
  | (string & {});
export const LicenseDeletionStatus = /*@__PURE__*/ S.String;

export interface DeleteLicenseResponse {
  Status?: LicenseDeletionStatus;
  DeletionDate?: string;
}
export const DeleteLicenseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(LicenseDeletionStatus),
    DeletionDate: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DeleteLicenseResponse",
}) as any as S.Schema<DeleteLicenseResponse>;
export interface DeleteLicenseAssetGroupRequest {
  LicenseAssetGroupArn: string;
}
export const DeleteLicenseAssetGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LicenseAssetGroupArn: S.String }).pipe(
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
  identifier: "DeleteLicenseAssetGroupRequest",
}) as any as S.Schema<DeleteLicenseAssetGroupRequest>;
export type LicenseAssetGroupStatus =
  | "ACTIVE"
  | "DISABLED"
  | "DELETED"
  | (string & {});
export const LicenseAssetGroupStatus = /*@__PURE__*/ S.String;

export interface DeleteLicenseAssetGroupResponse {
  Status: LicenseAssetGroupStatus;
}
export const DeleteLicenseAssetGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: LicenseAssetGroupStatus }).pipe(ns),
).annotate({
  identifier: "DeleteLicenseAssetGroupResponse",
}) as any as S.Schema<DeleteLicenseAssetGroupResponse>;
export interface DeleteLicenseAssetRulesetRequest {
  LicenseAssetRulesetArn: string;
}
export const DeleteLicenseAssetRulesetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LicenseAssetRulesetArn: S.String }).pipe(
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
  identifier: "DeleteLicenseAssetRulesetRequest",
}) as any as S.Schema<DeleteLicenseAssetRulesetRequest>;
export interface DeleteLicenseAssetRulesetResponse {}
export const DeleteLicenseAssetRulesetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteLicenseAssetRulesetResponse",
}) as any as S.Schema<DeleteLicenseAssetRulesetResponse>;
export interface DeleteLicenseConfigurationRequest {
  LicenseConfigurationArn: string;
}
export const DeleteLicenseConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LicenseConfigurationArn: S.String }).pipe(
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
  identifier: "DeleteLicenseConfigurationRequest",
}) as any as S.Schema<DeleteLicenseConfigurationRequest>;
export interface DeleteLicenseConfigurationResponse {}
export const DeleteLicenseConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteLicenseConfigurationResponse",
}) as any as S.Schema<DeleteLicenseConfigurationResponse>;
export interface DeleteLicenseManagerReportGeneratorRequest {
  LicenseManagerReportGeneratorArn: string;
}
export const DeleteLicenseManagerReportGeneratorRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ LicenseManagerReportGeneratorArn: S.String }).pipe(
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
    identifier: "DeleteLicenseManagerReportGeneratorRequest",
  }) as any as S.Schema<DeleteLicenseManagerReportGeneratorRequest>;
export interface DeleteLicenseManagerReportGeneratorResponse {}
export const DeleteLicenseManagerReportGeneratorResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "DeleteLicenseManagerReportGeneratorResponse",
  }) as any as S.Schema<DeleteLicenseManagerReportGeneratorResponse>;
export interface DeleteTokenRequest {
  TokenId: string;
}
export const DeleteTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TokenId: S.String }).pipe(
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
  identifier: "DeleteTokenRequest",
}) as any as S.Schema<DeleteTokenRequest>;
export interface DeleteTokenResponse {}
export const DeleteTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteTokenResponse",
}) as any as S.Schema<DeleteTokenResponse>;
export interface ExtendLicenseConsumptionRequest {
  LicenseConsumptionToken: string;
  DryRun?: boolean;
}
export const ExtendLicenseConsumptionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseConsumptionToken: S.String,
    DryRun: S.optional(S.Boolean),
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
  identifier: "ExtendLicenseConsumptionRequest",
}) as any as S.Schema<ExtendLicenseConsumptionRequest>;
export interface ExtendLicenseConsumptionResponse {
  LicenseConsumptionToken?: string;
  Expiration?: string;
}
export const ExtendLicenseConsumptionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseConsumptionToken: S.optional(S.String),
    Expiration: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ExtendLicenseConsumptionResponse",
}) as any as S.Schema<ExtendLicenseConsumptionResponse>;
export interface GetAccessTokenRequest {
  Token: string | redacted.Redacted<string>;
  TokenProperties?: string[];
}
export const GetAccessTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Token: SensitiveString,
    TokenProperties: S.optional(MaxSize3StringList),
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
  identifier: "GetAccessTokenRequest",
}) as any as S.Schema<GetAccessTokenRequest>;
export interface GetAccessTokenResponse {
  AccessToken?: string | redacted.Redacted<string>;
}
export const GetAccessTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccessToken: S.optional(SensitiveString) }).pipe(ns),
).annotate({
  identifier: "GetAccessTokenResponse",
}) as any as S.Schema<GetAccessTokenResponse>;
export interface GetGrantRequest {
  GrantArn: string;
  Version?: string;
}
export const GetGrantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GrantArn: S.String, Version: S.optional(S.String) }).pipe(
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
  identifier: "GetGrantRequest",
}) as any as S.Schema<GetGrantRequest>;
export interface Grant {
  GrantArn: string;
  GrantName: string;
  ParentArn: string;
  LicenseArn: string;
  GranteePrincipalArn: string;
  HomeRegion: string;
  GrantStatus: GrantStatus;
  StatusReason?: string;
  Version: string;
  GrantedOperations: AllowedOperation[];
  Options?: Options;
}
export const Grant = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GrantArn: S.String,
    GrantName: S.String,
    ParentArn: S.String,
    LicenseArn: S.String,
    GranteePrincipalArn: S.String,
    HomeRegion: S.String,
    GrantStatus: GrantStatus,
    StatusReason: S.optional(S.String),
    Version: S.String,
    GrantedOperations: AllowedOperationList,
    Options: S.optional(Options),
  }),
).annotate({ identifier: "Grant" }) as any as S.Schema<Grant>;
export interface GetGrantResponse {
  Grant?: Grant;
}
export const GetGrantResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Grant: S.optional(Grant) }).pipe(ns),
).annotate({
  identifier: "GetGrantResponse",
}) as any as S.Schema<GetGrantResponse>;
export interface GetLicenseRequest {
  LicenseArn: string;
  Version?: string;
}
export const GetLicenseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LicenseArn: S.String, Version: S.optional(S.String) }).pipe(
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
  identifier: "GetLicenseRequest",
}) as any as S.Schema<GetLicenseRequest>;
export interface IssuerDetails {
  Name?: string;
  SignKey?: string;
  KeyFingerprint?: string;
}
export const IssuerDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    SignKey: S.optional(S.String),
    KeyFingerprint: S.optional(S.String),
  }),
).annotate({ identifier: "IssuerDetails" }) as any as S.Schema<IssuerDetails>;
export interface License {
  LicenseArn?: string;
  LicenseName?: string;
  ProductName?: string;
  ProductSKU?: string;
  Issuer?: IssuerDetails;
  HomeRegion?: string;
  Status?: LicenseStatus;
  Validity?: DatetimeRange;
  Beneficiary?: string;
  Entitlements?: Entitlement[];
  ConsumptionConfiguration?: ConsumptionConfiguration;
  LicenseMetadata?: Metadata[];
  CreateTime?: string;
  Version?: string;
}
export const License = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseArn: S.optional(S.String),
    LicenseName: S.optional(S.String),
    ProductName: S.optional(S.String),
    ProductSKU: S.optional(S.String),
    Issuer: S.optional(IssuerDetails),
    HomeRegion: S.optional(S.String),
    Status: S.optional(LicenseStatus),
    Validity: S.optional(DatetimeRange),
    Beneficiary: S.optional(S.String),
    Entitlements: S.optional(EntitlementList),
    ConsumptionConfiguration: S.optional(ConsumptionConfiguration),
    LicenseMetadata: S.optional(MetadataList),
    CreateTime: S.optional(S.String),
    Version: S.optional(S.String),
  }),
).annotate({ identifier: "License" }) as any as S.Schema<License>;
export interface GetLicenseResponse {
  License?: License;
}
export const GetLicenseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ License: S.optional(License) }).pipe(ns),
).annotate({
  identifier: "GetLicenseResponse",
}) as any as S.Schema<GetLicenseResponse>;
export interface GetLicenseAssetGroupRequest {
  LicenseAssetGroupArn: string;
}
export const GetLicenseAssetGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LicenseAssetGroupArn: S.String }).pipe(
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
  identifier: "GetLicenseAssetGroupRequest",
}) as any as S.Schema<GetLicenseAssetGroupRequest>;
export interface LicenseAssetGroup {
  Name: string;
  Description?: string;
  LicenseAssetGroupConfigurations?: LicenseAssetGroupConfiguration[];
  AssociatedLicenseAssetRulesetARNs: string[];
  Properties?: LicenseAssetGroupProperty[];
  LicenseAssetGroupArn: string;
  Status: LicenseAssetGroupStatus;
  StatusMessage?: string;
  LatestUsageAnalysisTime?: Date;
  LatestResourceDiscoveryTime?: Date;
}
export const LicenseAssetGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    LicenseAssetGroupConfigurations: S.optional(
      LicenseAssetGroupConfigurationList,
    ),
    AssociatedLicenseAssetRulesetARNs: LicenseAssetRulesetArnList,
    Properties: S.optional(LicenseAssetGroupPropertyList),
    LicenseAssetGroupArn: S.String,
    Status: LicenseAssetGroupStatus,
    StatusMessage: S.optional(S.String),
    LatestUsageAnalysisTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LatestResourceDiscoveryTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "LicenseAssetGroup",
}) as any as S.Schema<LicenseAssetGroup>;
export interface GetLicenseAssetGroupResponse {
  LicenseAssetGroup: LicenseAssetGroup;
}
export const GetLicenseAssetGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LicenseAssetGroup: LicenseAssetGroup }).pipe(ns),
).annotate({
  identifier: "GetLicenseAssetGroupResponse",
}) as any as S.Schema<GetLicenseAssetGroupResponse>;
export interface GetLicenseAssetRulesetRequest {
  LicenseAssetRulesetArn: string;
}
export const GetLicenseAssetRulesetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LicenseAssetRulesetArn: S.String }).pipe(
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
  identifier: "GetLicenseAssetRulesetRequest",
}) as any as S.Schema<GetLicenseAssetRulesetRequest>;
export interface LicenseAssetRuleset {
  Name: string;
  Description?: string;
  Rules: LicenseAssetRule[];
  LicenseAssetRulesetArn: string;
}
export const LicenseAssetRuleset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    Rules: LicenseAssetRuleList,
    LicenseAssetRulesetArn: S.String,
  }),
).annotate({
  identifier: "LicenseAssetRuleset",
}) as any as S.Schema<LicenseAssetRuleset>;
export interface GetLicenseAssetRulesetResponse {
  LicenseAssetRuleset: LicenseAssetRuleset;
}
export const GetLicenseAssetRulesetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LicenseAssetRuleset: LicenseAssetRuleset }).pipe(ns),
).annotate({
  identifier: "GetLicenseAssetRulesetResponse",
}) as any as S.Schema<GetLicenseAssetRulesetResponse>;
export interface GetLicenseConfigurationRequest {
  LicenseConfigurationArn: string;
}
export const GetLicenseConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LicenseConfigurationArn: S.String }).pipe(
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
  identifier: "GetLicenseConfigurationRequest",
}) as any as S.Schema<GetLicenseConfigurationRequest>;
export type ResourceType =
  | "EC2_INSTANCE"
  | "EC2_HOST"
  | "EC2_AMI"
  | "RDS"
  | "SYSTEMS_MANAGER_MANAGED_INSTANCE"
  | (string & {});
export const ResourceType = /*@__PURE__*/ S.String;

export interface ConsumedLicenseSummary {
  ResourceType?: ResourceType;
  ConsumedLicenses?: number;
}
export const ConsumedLicenseSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceType: S.optional(ResourceType),
    ConsumedLicenses: S.optional(S.Number),
  }),
).annotate({
  identifier: "ConsumedLicenseSummary",
}) as any as S.Schema<ConsumedLicenseSummary>;
export type ConsumedLicenseSummaryList = ConsumedLicenseSummary[];
export const ConsumedLicenseSummaryList = /*@__PURE__*/ S.Array(
  ConsumedLicenseSummary,
);
export interface ManagedResourceSummary {
  ResourceType?: ResourceType;
  AssociationCount?: number;
}
export const ManagedResourceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceType: S.optional(ResourceType),
    AssociationCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ManagedResourceSummary",
}) as any as S.Schema<ManagedResourceSummary>;
export type ManagedResourceSummaryList = ManagedResourceSummary[];
export const ManagedResourceSummaryList = /*@__PURE__*/ S.Array(
  ManagedResourceSummary,
);
export interface AutomatedDiscoveryInformation {
  LastRunTime?: Date;
}
export const AutomatedDiscoveryInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LastRunTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "AutomatedDiscoveryInformation",
}) as any as S.Schema<AutomatedDiscoveryInformation>;
export interface GetLicenseConfigurationResponse {
  LicenseConfigurationId?: string;
  LicenseConfigurationArn?: string;
  Name?: string;
  Description?: string;
  LicenseCountingType?: LicenseCountingType;
  LicenseRules?: string[];
  LicenseCount?: number;
  LicenseCountHardLimit?: boolean;
  ConsumedLicenses?: number;
  Status?: string;
  OwnerAccountId?: string;
  ConsumedLicenseSummaryList?: ConsumedLicenseSummary[];
  ManagedResourceSummaryList?: ManagedResourceSummary[];
  Tags?: Tag[];
  ProductInformationList?: ProductInformation[];
  AutomatedDiscoveryInformation?: AutomatedDiscoveryInformation;
  DisassociateWhenNotFound?: boolean;
  LicenseExpiry?: number;
}
export const GetLicenseConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseConfigurationId: S.optional(S.String),
    LicenseConfigurationArn: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    LicenseCountingType: S.optional(LicenseCountingType),
    LicenseRules: S.optional(StringList),
    LicenseCount: S.optional(S.Number),
    LicenseCountHardLimit: S.optional(S.Boolean),
    ConsumedLicenses: S.optional(S.Number),
    Status: S.optional(S.String),
    OwnerAccountId: S.optional(S.String),
    ConsumedLicenseSummaryList: S.optional(ConsumedLicenseSummaryList),
    ManagedResourceSummaryList: S.optional(ManagedResourceSummaryList),
    Tags: S.optional(TagList),
    ProductInformationList: S.optional(ProductInformationList),
    AutomatedDiscoveryInformation: S.optional(AutomatedDiscoveryInformation),
    DisassociateWhenNotFound: S.optional(S.Boolean),
    LicenseExpiry: S.optional(S.Number),
  }).pipe(ns),
).annotate({
  identifier: "GetLicenseConfigurationResponse",
}) as any as S.Schema<GetLicenseConfigurationResponse>;
export interface GetLicenseConversionTaskRequest {
  LicenseConversionTaskId: string;
}
export const GetLicenseConversionTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LicenseConversionTaskId: S.String }).pipe(
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
  identifier: "GetLicenseConversionTaskRequest",
}) as any as S.Schema<GetLicenseConversionTaskRequest>;
export type LicenseConversionTaskStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export const LicenseConversionTaskStatus = /*@__PURE__*/ S.String;

export interface GetLicenseConversionTaskResponse {
  LicenseConversionTaskId?: string;
  ResourceArn?: string;
  SourceLicenseContext?: LicenseConversionContext;
  DestinationLicenseContext?: LicenseConversionContext;
  StatusMessage?: string;
  Status?: LicenseConversionTaskStatus;
  StartTime?: Date;
  LicenseConversionTime?: Date;
  EndTime?: Date;
}
export const GetLicenseConversionTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseConversionTaskId: S.optional(S.String),
    ResourceArn: S.optional(S.String),
    SourceLicenseContext: S.optional(LicenseConversionContext),
    DestinationLicenseContext: S.optional(LicenseConversionContext),
    StatusMessage: S.optional(S.String),
    Status: S.optional(LicenseConversionTaskStatus),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LicenseConversionTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(ns),
).annotate({
  identifier: "GetLicenseConversionTaskResponse",
}) as any as S.Schema<GetLicenseConversionTaskResponse>;
export interface GetLicenseManagerReportGeneratorRequest {
  LicenseManagerReportGeneratorArn: string;
}
export const GetLicenseManagerReportGeneratorRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ LicenseManagerReportGeneratorArn: S.String }).pipe(
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
  identifier: "GetLicenseManagerReportGeneratorRequest",
}) as any as S.Schema<GetLicenseManagerReportGeneratorRequest>;
export interface S3Location {
  bucket?: string;
  keyPrefix?: string;
}
export const S3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucket: S.optional(S.String), keyPrefix: S.optional(S.String) }),
).annotate({ identifier: "S3Location" }) as any as S.Schema<S3Location>;
export interface ReportGenerator {
  ReportGeneratorName?: string;
  ReportType?: ReportType[];
  ReportContext?: ReportContext;
  ReportFrequency?: ReportFrequency;
  LicenseManagerReportGeneratorArn?: string;
  LastRunStatus?: string;
  LastRunFailureReason?: string;
  LastReportGenerationTime?: string;
  ReportCreatorAccount?: string;
  Description?: string;
  S3Location?: S3Location;
  CreateTime?: string;
  Tags?: Tag[];
}
export const ReportGenerator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReportGeneratorName: S.optional(S.String),
    ReportType: S.optional(ReportTypeList),
    ReportContext: S.optional(ReportContext),
    ReportFrequency: S.optional(ReportFrequency),
    LicenseManagerReportGeneratorArn: S.optional(S.String),
    LastRunStatus: S.optional(S.String),
    LastRunFailureReason: S.optional(S.String),
    LastReportGenerationTime: S.optional(S.String),
    ReportCreatorAccount: S.optional(S.String),
    Description: S.optional(S.String),
    S3Location: S.optional(S3Location),
    CreateTime: S.optional(S.String),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "ReportGenerator",
}) as any as S.Schema<ReportGenerator>;
export interface GetLicenseManagerReportGeneratorResponse {
  ReportGenerator?: ReportGenerator;
}
export const GetLicenseManagerReportGeneratorResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ ReportGenerator: S.optional(ReportGenerator) }).pipe(ns),
).annotate({
  identifier: "GetLicenseManagerReportGeneratorResponse",
}) as any as S.Schema<GetLicenseManagerReportGeneratorResponse>;
export interface GetLicenseUsageRequest {
  LicenseArn: string;
}
export const GetLicenseUsageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LicenseArn: S.String }).pipe(
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
  identifier: "GetLicenseUsageRequest",
}) as any as S.Schema<GetLicenseUsageRequest>;
export interface EntitlementUsage {
  Name: string;
  ConsumedValue: string;
  MaxCount?: string;
  Unit: EntitlementDataUnit;
}
export const EntitlementUsage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    ConsumedValue: S.String,
    MaxCount: S.optional(S.String),
    Unit: EntitlementDataUnit,
  }),
).annotate({
  identifier: "EntitlementUsage",
}) as any as S.Schema<EntitlementUsage>;
export type EntitlementUsageList = EntitlementUsage[];
export const EntitlementUsageList = /*@__PURE__*/ S.Array(EntitlementUsage);
export interface LicenseUsage {
  EntitlementUsages?: EntitlementUsage[];
}
export const LicenseUsage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EntitlementUsages: S.optional(EntitlementUsageList) }),
).annotate({ identifier: "LicenseUsage" }) as any as S.Schema<LicenseUsage>;
export interface GetLicenseUsageResponse {
  LicenseUsage?: LicenseUsage;
}
export const GetLicenseUsageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LicenseUsage: S.optional(LicenseUsage) }).pipe(ns),
).annotate({
  identifier: "GetLicenseUsageResponse",
}) as any as S.Schema<GetLicenseUsageResponse>;
export interface GetServiceSettingsRequest {}
export const GetServiceSettingsRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "GetServiceSettingsRequest",
}) as any as S.Schema<GetServiceSettingsRequest>;
export interface OrganizationConfiguration {
  EnableIntegration: boolean;
}
export const OrganizationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EnableIntegration: S.Boolean }),
).annotate({
  identifier: "OrganizationConfiguration",
}) as any as S.Schema<OrganizationConfiguration>;
export interface CrossAccountDiscoveryServiceStatus {
  Message?: string;
}
export const CrossAccountDiscoveryServiceStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.optional(S.String) }),
).annotate({
  identifier: "CrossAccountDiscoveryServiceStatus",
}) as any as S.Schema<CrossAccountDiscoveryServiceStatus>;
export interface RegionStatus {
  Status?: string;
}
export const RegionStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(S.String) }),
).annotate({ identifier: "RegionStatus" }) as any as S.Schema<RegionStatus>;
export type RegionStatusMap = { [key: string]: RegionStatus | undefined };
export const RegionStatusMap = /*@__PURE__*/ S.Record(
  S.String,
  RegionStatus.pipe(S.optional),
);
export interface CrossRegionDiscoveryStatus {
  Message?: { [key: string]: RegionStatus | undefined };
}
export const CrossRegionDiscoveryStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.optional(RegionStatusMap) }),
).annotate({
  identifier: "CrossRegionDiscoveryStatus",
}) as any as S.Schema<CrossRegionDiscoveryStatus>;
export interface ServiceStatus {
  CrossAccountDiscovery?: CrossAccountDiscoveryServiceStatus;
  CrossRegionDiscovery?: CrossRegionDiscoveryStatus;
}
export const ServiceStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CrossAccountDiscovery: S.optional(CrossAccountDiscoveryServiceStatus),
    CrossRegionDiscovery: S.optional(CrossRegionDiscoveryStatus),
  }),
).annotate({ identifier: "ServiceStatus" }) as any as S.Schema<ServiceStatus>;
export interface GetServiceSettingsResponse {
  S3BucketArn?: string;
  SnsTopicArn?: string;
  OrganizationConfiguration?: OrganizationConfiguration;
  EnableCrossAccountsDiscovery?: boolean;
  LicenseManagerResourceShareArn?: string;
  CrossRegionDiscoveryHomeRegion?: string;
  CrossRegionDiscoverySourceRegions?: string[];
  ServiceStatus?: ServiceStatus;
}
export const GetServiceSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3BucketArn: S.optional(S.String),
    SnsTopicArn: S.optional(S.String),
    OrganizationConfiguration: S.optional(OrganizationConfiguration),
    EnableCrossAccountsDiscovery: S.optional(S.Boolean),
    LicenseManagerResourceShareArn: S.optional(S.String),
    CrossRegionDiscoveryHomeRegion: S.optional(S.String),
    CrossRegionDiscoverySourceRegions: S.optional(StringList),
    ServiceStatus: S.optional(ServiceStatus),
  }).pipe(ns),
).annotate({
  identifier: "GetServiceSettingsResponse",
}) as any as S.Schema<GetServiceSettingsResponse>;
export interface ListAssetsForLicenseAssetGroupRequest {
  LicenseAssetGroupArn: string;
  AssetType: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListAssetsForLicenseAssetGroupRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      LicenseAssetGroupArn: S.String,
      AssetType: S.String,
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
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
  identifier: "ListAssetsForLicenseAssetGroupRequest",
}) as any as S.Schema<ListAssetsForLicenseAssetGroupRequest>;
export interface Asset {
  AssetArn?: string;
  LatestAssetDiscoveryTime?: Date;
}
export const Asset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetArn: S.optional(S.String),
    LatestAssetDiscoveryTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "Asset" }) as any as S.Schema<Asset>;
export type AssetList = Asset[];
export const AssetList = /*@__PURE__*/ S.Array(Asset);
export interface ListAssetsForLicenseAssetGroupResponse {
  Assets?: Asset[];
  NextToken?: string;
}
export const ListAssetsForLicenseAssetGroupResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Assets: S.optional(AssetList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListAssetsForLicenseAssetGroupResponse",
}) as any as S.Schema<ListAssetsForLicenseAssetGroupResponse>;
export interface ListAssociationsForLicenseConfigurationRequest {
  LicenseConfigurationArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListAssociationsForLicenseConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      LicenseConfigurationArn: S.String,
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
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
    identifier: "ListAssociationsForLicenseConfigurationRequest",
  }) as any as S.Schema<ListAssociationsForLicenseConfigurationRequest>;
export interface LicenseConfigurationAssociation {
  ResourceArn?: string;
  ResourceType?: ResourceType;
  ResourceOwnerId?: string;
  AssociationTime?: Date;
  AmiAssociationScope?: string;
}
export const LicenseConfigurationAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    ResourceType: S.optional(ResourceType),
    ResourceOwnerId: S.optional(S.String),
    AssociationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AmiAssociationScope: S.optional(S.String),
  }),
).annotate({
  identifier: "LicenseConfigurationAssociation",
}) as any as S.Schema<LicenseConfigurationAssociation>;
export type LicenseConfigurationAssociations =
  LicenseConfigurationAssociation[];
export const LicenseConfigurationAssociations = /*@__PURE__*/ S.Array(
  LicenseConfigurationAssociation,
);
export interface ListAssociationsForLicenseConfigurationResponse {
  LicenseConfigurationAssociations?: LicenseConfigurationAssociation[];
  NextToken?: string;
}
export const ListAssociationsForLicenseConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      LicenseConfigurationAssociations: S.optional(
        LicenseConfigurationAssociations,
      ),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "ListAssociationsForLicenseConfigurationResponse",
  }) as any as S.Schema<ListAssociationsForLicenseConfigurationResponse>;
export type FilterName = string;
export type FilterValue = string;
export type FilterValues = string[];
export const FilterValues = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("item")),
);
export interface Filter {
  Name?: string;
  Values?: string[];
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Values: S.optional(FilterValues) }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = Filter[];
export const FilterList = /*@__PURE__*/ S.Array(Filter);
export type MaxSize100 = number;
export interface ListDistributedGrantsRequest {
  GrantArns?: string[];
  Filters?: Filter[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListDistributedGrantsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GrantArns: S.optional(ArnList),
    Filters: S.optional(FilterList),
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
  identifier: "ListDistributedGrantsRequest",
}) as any as S.Schema<ListDistributedGrantsRequest>;
export type GrantList = Grant[];
export const GrantList = /*@__PURE__*/ S.Array(Grant);
export interface ListDistributedGrantsResponse {
  Grants?: Grant[];
  NextToken?: string;
}
export const ListDistributedGrantsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Grants: S.optional(GrantList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDistributedGrantsResponse",
}) as any as S.Schema<ListDistributedGrantsResponse>;
export interface ListFailuresForLicenseConfigurationOperationsRequest {
  LicenseConfigurationArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListFailuresForLicenseConfigurationOperationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      LicenseConfigurationArn: S.String,
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
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
    identifier: "ListFailuresForLicenseConfigurationOperationsRequest",
  }) as any as S.Schema<ListFailuresForLicenseConfigurationOperationsRequest>;
export interface LicenseOperationFailure {
  ResourceArn?: string;
  ResourceType?: ResourceType;
  ErrorMessage?: string;
  FailureTime?: Date;
  OperationName?: string;
  ResourceOwnerId?: string;
  OperationRequestedBy?: string;
  MetadataList?: Metadata[];
}
export const LicenseOperationFailure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    ResourceType: S.optional(ResourceType),
    ErrorMessage: S.optional(S.String),
    FailureTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    OperationName: S.optional(S.String),
    ResourceOwnerId: S.optional(S.String),
    OperationRequestedBy: S.optional(S.String),
    MetadataList: S.optional(MetadataList),
  }),
).annotate({
  identifier: "LicenseOperationFailure",
}) as any as S.Schema<LicenseOperationFailure>;
export type LicenseOperationFailureList = LicenseOperationFailure[];
export const LicenseOperationFailureList = /*@__PURE__*/ S.Array(
  LicenseOperationFailure,
);
export interface ListFailuresForLicenseConfigurationOperationsResponse {
  LicenseOperationFailureList?: LicenseOperationFailure[];
  NextToken?: string;
}
export const ListFailuresForLicenseConfigurationOperationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      LicenseOperationFailureList: S.optional(LicenseOperationFailureList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "ListFailuresForLicenseConfigurationOperationsResponse",
  }) as any as S.Schema<ListFailuresForLicenseConfigurationOperationsResponse>;
export type Filters = Filter[];
export const Filters = /*@__PURE__*/ S.Array(
  Filter.pipe(T.XmlName("item")).annotate({ identifier: "Filter" }),
);
export interface ListLicenseAssetGroupsRequest {
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListLicenseAssetGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(Filters),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
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
  identifier: "ListLicenseAssetGroupsRequest",
}) as any as S.Schema<ListLicenseAssetGroupsRequest>;
export type LicenseAssetGroupList = LicenseAssetGroup[];
export const LicenseAssetGroupList = /*@__PURE__*/ S.Array(LicenseAssetGroup);
export interface ListLicenseAssetGroupsResponse {
  LicenseAssetGroups?: LicenseAssetGroup[];
  NextToken?: string;
}
export const ListLicenseAssetGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseAssetGroups: S.optional(LicenseAssetGroupList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListLicenseAssetGroupsResponse",
}) as any as S.Schema<ListLicenseAssetGroupsResponse>;
export interface ListLicenseAssetRulesetsRequest {
  Filters?: Filter[];
  ShowAWSManagedLicenseAssetRulesets?: boolean;
  MaxResults?: number;
  NextToken?: string;
}
export const ListLicenseAssetRulesetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(Filters),
    ShowAWSManagedLicenseAssetRulesets: S.optional(S.Boolean),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
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
  identifier: "ListLicenseAssetRulesetsRequest",
}) as any as S.Schema<ListLicenseAssetRulesetsRequest>;
export type LicenseAssetRulesetList = LicenseAssetRuleset[];
export const LicenseAssetRulesetList =
  /*@__PURE__*/ S.Array(LicenseAssetRuleset);
export interface ListLicenseAssetRulesetsResponse {
  LicenseAssetRulesets?: LicenseAssetRuleset[];
  NextToken?: string;
}
export const ListLicenseAssetRulesetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseAssetRulesets: S.optional(LicenseAssetRulesetList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListLicenseAssetRulesetsResponse",
}) as any as S.Schema<ListLicenseAssetRulesetsResponse>;
export interface ListLicenseConfigurationsRequest {
  LicenseConfigurationArns?: string[];
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export const ListLicenseConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseConfigurationArns: S.optional(StringList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(Filters),
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
  identifier: "ListLicenseConfigurationsRequest",
}) as any as S.Schema<ListLicenseConfigurationsRequest>;
export interface LicenseConfiguration {
  LicenseConfigurationId?: string;
  LicenseConfigurationArn?: string;
  Name?: string;
  Description?: string;
  LicenseCountingType?: LicenseCountingType;
  LicenseRules?: string[];
  LicenseCount?: number;
  LicenseCountHardLimit?: boolean;
  DisassociateWhenNotFound?: boolean;
  ConsumedLicenses?: number;
  Status?: string;
  OwnerAccountId?: string;
  ConsumedLicenseSummaryList?: ConsumedLicenseSummary[];
  ManagedResourceSummaryList?: ManagedResourceSummary[];
  ProductInformationList?: ProductInformation[];
  AutomatedDiscoveryInformation?: AutomatedDiscoveryInformation;
  LicenseExpiry?: number;
}
export const LicenseConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseConfigurationId: S.optional(S.String),
    LicenseConfigurationArn: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    LicenseCountingType: S.optional(LicenseCountingType),
    LicenseRules: S.optional(StringList),
    LicenseCount: S.optional(S.Number),
    LicenseCountHardLimit: S.optional(S.Boolean),
    DisassociateWhenNotFound: S.optional(S.Boolean),
    ConsumedLicenses: S.optional(S.Number),
    Status: S.optional(S.String),
    OwnerAccountId: S.optional(S.String),
    ConsumedLicenseSummaryList: S.optional(ConsumedLicenseSummaryList),
    ManagedResourceSummaryList: S.optional(ManagedResourceSummaryList),
    ProductInformationList: S.optional(ProductInformationList),
    AutomatedDiscoveryInformation: S.optional(AutomatedDiscoveryInformation),
    LicenseExpiry: S.optional(S.Number),
  }),
).annotate({
  identifier: "LicenseConfiguration",
}) as any as S.Schema<LicenseConfiguration>;
export type LicenseConfigurations = LicenseConfiguration[];
export const LicenseConfigurations =
  /*@__PURE__*/ S.Array(LicenseConfiguration);
export interface ListLicenseConfigurationsResponse {
  LicenseConfigurations?: LicenseConfiguration[];
  NextToken?: string;
}
export const ListLicenseConfigurationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseConfigurations: S.optional(LicenseConfigurations),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListLicenseConfigurationsResponse",
}) as any as S.Schema<ListLicenseConfigurationsResponse>;
export interface ListLicenseConfigurationsForOrganizationRequest {
  LicenseConfigurationArns?: string[];
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export const ListLicenseConfigurationsForOrganizationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      LicenseConfigurationArns: S.optional(StringList),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
      Filters: S.optional(Filters),
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
    identifier: "ListLicenseConfigurationsForOrganizationRequest",
  }) as any as S.Schema<ListLicenseConfigurationsForOrganizationRequest>;
export interface ListLicenseConfigurationsForOrganizationResponse {
  LicenseConfigurations?: LicenseConfiguration[];
  NextToken?: string;
}
export const ListLicenseConfigurationsForOrganizationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      LicenseConfigurations: S.optional(LicenseConfigurations),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "ListLicenseConfigurationsForOrganizationResponse",
  }) as any as S.Schema<ListLicenseConfigurationsForOrganizationResponse>;
export interface ListLicenseConversionTasksRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export const ListLicenseConversionTasksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filters: S.optional(Filters),
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
  identifier: "ListLicenseConversionTasksRequest",
}) as any as S.Schema<ListLicenseConversionTasksRequest>;
export interface LicenseConversionTask {
  LicenseConversionTaskId?: string;
  ResourceArn?: string;
  SourceLicenseContext?: LicenseConversionContext;
  DestinationLicenseContext?: LicenseConversionContext;
  Status?: LicenseConversionTaskStatus;
  StatusMessage?: string;
  StartTime?: Date;
  LicenseConversionTime?: Date;
  EndTime?: Date;
}
export const LicenseConversionTask = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseConversionTaskId: S.optional(S.String),
    ResourceArn: S.optional(S.String),
    SourceLicenseContext: S.optional(LicenseConversionContext),
    DestinationLicenseContext: S.optional(LicenseConversionContext),
    Status: S.optional(LicenseConversionTaskStatus),
    StatusMessage: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LicenseConversionTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "LicenseConversionTask",
}) as any as S.Schema<LicenseConversionTask>;
export type LicenseConversionTasks = LicenseConversionTask[];
export const LicenseConversionTasks = /*@__PURE__*/ S.Array(
  LicenseConversionTask,
);
export interface ListLicenseConversionTasksResponse {
  LicenseConversionTasks?: LicenseConversionTask[];
  NextToken?: string;
}
export const ListLicenseConversionTasksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseConversionTasks: S.optional(LicenseConversionTasks),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListLicenseConversionTasksResponse",
}) as any as S.Schema<ListLicenseConversionTasksResponse>;
export interface ListLicenseManagerReportGeneratorsRequest {
  Filters?: Filter[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListLicenseManagerReportGeneratorsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Filters: S.optional(FilterList),
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
    identifier: "ListLicenseManagerReportGeneratorsRequest",
  }) as any as S.Schema<ListLicenseManagerReportGeneratorsRequest>;
export type ReportGeneratorList = ReportGenerator[];
export const ReportGeneratorList = /*@__PURE__*/ S.Array(ReportGenerator);
export interface ListLicenseManagerReportGeneratorsResponse {
  ReportGenerators?: ReportGenerator[];
  NextToken?: string;
}
export const ListLicenseManagerReportGeneratorsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ReportGenerators: S.optional(ReportGeneratorList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "ListLicenseManagerReportGeneratorsResponse",
  }) as any as S.Schema<ListLicenseManagerReportGeneratorsResponse>;
export interface ListLicensesRequest {
  LicenseArns?: string[];
  Filters?: Filter[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListLicensesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseArns: S.optional(ArnList),
    Filters: S.optional(FilterList),
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
  identifier: "ListLicensesRequest",
}) as any as S.Schema<ListLicensesRequest>;
export type LicenseList = License[];
export const LicenseList = /*@__PURE__*/ S.Array(License);
export interface ListLicensesResponse {
  Licenses?: License[];
  NextToken?: string;
}
export const ListLicensesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Licenses: S.optional(LicenseList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListLicensesResponse",
}) as any as S.Schema<ListLicensesResponse>;
export interface ListLicenseSpecificationsForResourceRequest {
  ResourceArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListLicenseSpecificationsForResourceRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ResourceArn: S.String,
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
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
    identifier: "ListLicenseSpecificationsForResourceRequest",
  }) as any as S.Schema<ListLicenseSpecificationsForResourceRequest>;
export interface LicenseSpecification {
  LicenseConfigurationArn: string;
  AmiAssociationScope?: string;
}
export const LicenseSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseConfigurationArn: S.String,
    AmiAssociationScope: S.optional(S.String),
  }),
).annotate({
  identifier: "LicenseSpecification",
}) as any as S.Schema<LicenseSpecification>;
export type LicenseSpecifications = LicenseSpecification[];
export const LicenseSpecifications =
  /*@__PURE__*/ S.Array(LicenseSpecification);
export interface ListLicenseSpecificationsForResourceResponse {
  LicenseSpecifications?: LicenseSpecification[];
  NextToken?: string;
}
export const ListLicenseSpecificationsForResourceResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      LicenseSpecifications: S.optional(LicenseSpecifications),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "ListLicenseSpecificationsForResourceResponse",
  }) as any as S.Schema<ListLicenseSpecificationsForResourceResponse>;
export interface ListLicenseVersionsRequest {
  LicenseArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListLicenseVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseArn: S.String,
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
  identifier: "ListLicenseVersionsRequest",
}) as any as S.Schema<ListLicenseVersionsRequest>;
export interface ListLicenseVersionsResponse {
  Licenses?: License[];
  NextToken?: string;
}
export const ListLicenseVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Licenses: S.optional(LicenseList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListLicenseVersionsResponse",
}) as any as S.Schema<ListLicenseVersionsResponse>;
export interface ListReceivedGrantsRequest {
  GrantArns?: string[];
  Filters?: Filter[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListReceivedGrantsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GrantArns: S.optional(ArnList),
    Filters: S.optional(FilterList),
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
  identifier: "ListReceivedGrantsRequest",
}) as any as S.Schema<ListReceivedGrantsRequest>;
export interface ListReceivedGrantsResponse {
  Grants?: Grant[];
  NextToken?: string;
}
export const ListReceivedGrantsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Grants: S.optional(GrantList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListReceivedGrantsResponse",
}) as any as S.Schema<ListReceivedGrantsResponse>;
export interface ListReceivedGrantsForOrganizationRequest {
  LicenseArn: string;
  Filters?: Filter[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListReceivedGrantsForOrganizationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      LicenseArn: S.String,
      Filters: S.optional(FilterList),
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
  identifier: "ListReceivedGrantsForOrganizationRequest",
}) as any as S.Schema<ListReceivedGrantsForOrganizationRequest>;
export interface ListReceivedGrantsForOrganizationResponse {
  Grants?: Grant[];
  NextToken?: string;
}
export const ListReceivedGrantsForOrganizationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Grants: S.optional(GrantList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "ListReceivedGrantsForOrganizationResponse",
  }) as any as S.Schema<ListReceivedGrantsForOrganizationResponse>;
export interface ListReceivedLicensesRequest {
  LicenseArns?: string[];
  Filters?: Filter[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListReceivedLicensesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseArns: S.optional(ArnList),
    Filters: S.optional(FilterList),
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
  identifier: "ListReceivedLicensesRequest",
}) as any as S.Schema<ListReceivedLicensesRequest>;
export type ReceivedStatus =
  | "PENDING_WORKFLOW"
  | "PENDING_ACCEPT"
  | "REJECTED"
  | "ACTIVE"
  | "FAILED_WORKFLOW"
  | "DELETED"
  | "DISABLED"
  | "WORKFLOW_COMPLETED"
  | (string & {});
export const ReceivedStatus = /*@__PURE__*/ S.String;

export interface ReceivedMetadata {
  ReceivedStatus?: ReceivedStatus;
  ReceivedStatusReason?: string;
  AllowedOperations?: AllowedOperation[];
}
export const ReceivedMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReceivedStatus: S.optional(ReceivedStatus),
    ReceivedStatusReason: S.optional(S.String),
    AllowedOperations: S.optional(AllowedOperationList),
  }),
).annotate({
  identifier: "ReceivedMetadata",
}) as any as S.Schema<ReceivedMetadata>;
export interface GrantedLicense {
  LicenseArn?: string;
  LicenseName?: string;
  ProductName?: string;
  ProductSKU?: string;
  Issuer?: IssuerDetails;
  HomeRegion?: string;
  Status?: LicenseStatus;
  Validity?: DatetimeRange;
  Beneficiary?: string;
  Entitlements?: Entitlement[];
  ConsumptionConfiguration?: ConsumptionConfiguration;
  LicenseMetadata?: Metadata[];
  CreateTime?: string;
  Version?: string;
  ReceivedMetadata?: ReceivedMetadata;
}
export const GrantedLicense = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseArn: S.optional(S.String),
    LicenseName: S.optional(S.String),
    ProductName: S.optional(S.String),
    ProductSKU: S.optional(S.String),
    Issuer: S.optional(IssuerDetails),
    HomeRegion: S.optional(S.String),
    Status: S.optional(LicenseStatus),
    Validity: S.optional(DatetimeRange),
    Beneficiary: S.optional(S.String),
    Entitlements: S.optional(EntitlementList),
    ConsumptionConfiguration: S.optional(ConsumptionConfiguration),
    LicenseMetadata: S.optional(MetadataList),
    CreateTime: S.optional(S.String),
    Version: S.optional(S.String),
    ReceivedMetadata: S.optional(ReceivedMetadata),
  }),
).annotate({ identifier: "GrantedLicense" }) as any as S.Schema<GrantedLicense>;
export type GrantedLicenseList = GrantedLicense[];
export const GrantedLicenseList = /*@__PURE__*/ S.Array(GrantedLicense);
export interface ListReceivedLicensesResponse {
  Licenses?: GrantedLicense[];
  NextToken?: string;
}
export const ListReceivedLicensesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Licenses: S.optional(GrantedLicenseList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListReceivedLicensesResponse",
}) as any as S.Schema<ListReceivedLicensesResponse>;
export interface ListReceivedLicensesForOrganizationRequest {
  Filters?: Filter[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListReceivedLicensesForOrganizationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Filters: S.optional(FilterList),
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
    identifier: "ListReceivedLicensesForOrganizationRequest",
  }) as any as S.Schema<ListReceivedLicensesForOrganizationRequest>;
export interface ListReceivedLicensesForOrganizationResponse {
  Licenses?: GrantedLicense[];
  NextToken?: string;
}
export const ListReceivedLicensesForOrganizationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Licenses: S.optional(GrantedLicenseList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "ListReceivedLicensesForOrganizationResponse",
  }) as any as S.Schema<ListReceivedLicensesForOrganizationResponse>;
export type InventoryFilterCondition =
  | "EQUALS"
  | "NOT_EQUALS"
  | "BEGINS_WITH"
  | "CONTAINS"
  | (string & {});
export const InventoryFilterCondition = /*@__PURE__*/ S.String;

export interface InventoryFilter {
  Name: string;
  Condition: InventoryFilterCondition;
  Value?: string;
}
export const InventoryFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Condition: InventoryFilterCondition,
    Value: S.optional(S.String),
  }),
).annotate({
  identifier: "InventoryFilter",
}) as any as S.Schema<InventoryFilter>;
export type InventoryFilterList = InventoryFilter[];
export const InventoryFilterList = /*@__PURE__*/ S.Array(InventoryFilter);
export interface ListResourceInventoryRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: InventoryFilter[];
}
export const ListResourceInventoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(InventoryFilterList),
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
  identifier: "ListResourceInventoryRequest",
}) as any as S.Schema<ListResourceInventoryRequest>;
export interface ResourceInventory {
  ResourceId?: string;
  ResourceType?: ResourceType;
  ResourceArn?: string;
  Platform?: string;
  PlatformVersion?: string;
  ResourceOwningAccountId?: string;
  MarketplaceProductCodes?: string[];
  UsageOperation?: string;
  AmiId?: string;
  HostId?: string;
  Region?: string;
  InstanceType?: string;
}
export const ResourceInventory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.optional(S.String),
    ResourceType: S.optional(ResourceType),
    ResourceArn: S.optional(S.String),
    Platform: S.optional(S.String),
    PlatformVersion: S.optional(S.String),
    ResourceOwningAccountId: S.optional(S.String),
    MarketplaceProductCodes: S.optional(StringList),
    UsageOperation: S.optional(S.String),
    AmiId: S.optional(S.String),
    HostId: S.optional(S.String),
    Region: S.optional(S.String),
    InstanceType: S.optional(S.String),
  }),
).annotate({
  identifier: "ResourceInventory",
}) as any as S.Schema<ResourceInventory>;
export type ResourceInventoryList = ResourceInventory[];
export const ResourceInventoryList = /*@__PURE__*/ S.Array(ResourceInventory);
export interface ListResourceInventoryResponse {
  ResourceInventoryList?: ResourceInventory[];
  NextToken?: string;
}
export const ListResourceInventoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceInventoryList: S.optional(ResourceInventoryList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListResourceInventoryResponse",
}) as any as S.Schema<ListResourceInventoryResponse>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
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
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListTokensRequest {
  TokenIds?: string[];
  Filters?: Filter[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListTokensRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TokenIds: S.optional(StringList),
    Filters: S.optional(FilterList),
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
  identifier: "ListTokensRequest",
}) as any as S.Schema<ListTokensRequest>;
export interface TokenData {
  TokenId?: string;
  TokenType?: string;
  LicenseArn?: string;
  ExpirationTime?: string;
  TokenProperties?: string[];
  RoleArns?: string[];
  Status?: string;
}
export const TokenData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TokenId: S.optional(S.String),
    TokenType: S.optional(S.String),
    LicenseArn: S.optional(S.String),
    ExpirationTime: S.optional(S.String),
    TokenProperties: S.optional(MaxSize3StringList),
    RoleArns: S.optional(ArnList),
    Status: S.optional(S.String),
  }),
).annotate({ identifier: "TokenData" }) as any as S.Schema<TokenData>;
export type TokenList = TokenData[];
export const TokenList = /*@__PURE__*/ S.Array(TokenData);
export interface ListTokensResponse {
  Tokens?: TokenData[];
  NextToken?: string;
}
export const ListTokensResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Tokens: S.optional(TokenList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListTokensResponse",
}) as any as S.Schema<ListTokensResponse>;
export interface ListUsageForLicenseConfigurationRequest {
  LicenseConfigurationArn: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export const ListUsageForLicenseConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      LicenseConfigurationArn: S.String,
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
      Filters: S.optional(Filters),
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
  identifier: "ListUsageForLicenseConfigurationRequest",
}) as any as S.Schema<ListUsageForLicenseConfigurationRequest>;
export interface LicenseConfigurationUsage {
  ResourceArn?: string;
  ResourceType?: ResourceType;
  ResourceStatus?: string;
  ResourceOwnerId?: string;
  AssociationTime?: Date;
  ConsumedLicenses?: number;
}
export const LicenseConfigurationUsage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    ResourceType: S.optional(ResourceType),
    ResourceStatus: S.optional(S.String),
    ResourceOwnerId: S.optional(S.String),
    AssociationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ConsumedLicenses: S.optional(S.Number),
  }),
).annotate({
  identifier: "LicenseConfigurationUsage",
}) as any as S.Schema<LicenseConfigurationUsage>;
export type LicenseConfigurationUsageList = LicenseConfigurationUsage[];
export const LicenseConfigurationUsageList = /*@__PURE__*/ S.Array(
  LicenseConfigurationUsage,
);
export interface ListUsageForLicenseConfigurationResponse {
  LicenseConfigurationUsageList?: LicenseConfigurationUsage[];
  NextToken?: string;
}
export const ListUsageForLicenseConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      LicenseConfigurationUsageList: S.optional(LicenseConfigurationUsageList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListUsageForLicenseConfigurationResponse",
}) as any as S.Schema<ListUsageForLicenseConfigurationResponse>;
export interface RejectGrantRequest {
  GrantArn: string;
}
export const RejectGrantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GrantArn: S.String }).pipe(
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
  identifier: "RejectGrantRequest",
}) as any as S.Schema<RejectGrantRequest>;
export interface RejectGrantResponse {
  GrantArn?: string;
  Status?: GrantStatus;
  Version?: string;
}
export const RejectGrantResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GrantArn: S.optional(S.String),
    Status: S.optional(GrantStatus),
    Version: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "RejectGrantResponse",
}) as any as S.Schema<RejectGrantResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: TagList }).pipe(
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
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagKeys: TagKeyList }).pipe(
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
export interface UpdateLicenseAssetGroupRequest {
  Name?: string;
  Description?: string;
  LicenseAssetGroupConfigurations?: LicenseAssetGroupConfiguration[];
  AssociatedLicenseAssetRulesetARNs: string[];
  Properties?: LicenseAssetGroupProperty[];
  LicenseAssetGroupArn: string;
  Status?: LicenseAssetGroupStatus;
  ClientToken: string;
}
export const UpdateLicenseAssetGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    LicenseAssetGroupConfigurations: S.optional(
      LicenseAssetGroupConfigurationList,
    ),
    AssociatedLicenseAssetRulesetARNs: LicenseAssetRulesetArnList,
    Properties: S.optional(LicenseAssetGroupPropertyList),
    LicenseAssetGroupArn: S.String,
    Status: S.optional(LicenseAssetGroupStatus),
    ClientToken: S.String,
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
  identifier: "UpdateLicenseAssetGroupRequest",
}) as any as S.Schema<UpdateLicenseAssetGroupRequest>;
export interface UpdateLicenseAssetGroupResponse {
  LicenseAssetGroupArn: string;
  Status: string;
}
export const UpdateLicenseAssetGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LicenseAssetGroupArn: S.String, Status: S.String }).pipe(ns),
).annotate({
  identifier: "UpdateLicenseAssetGroupResponse",
}) as any as S.Schema<UpdateLicenseAssetGroupResponse>;
export interface UpdateLicenseAssetRulesetRequest {
  Name?: string;
  Description?: string;
  Rules: LicenseAssetRule[];
  LicenseAssetRulesetArn: string;
  ClientToken: string;
}
export const UpdateLicenseAssetRulesetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Rules: LicenseAssetRuleList,
    LicenseAssetRulesetArn: S.String,
    ClientToken: S.String,
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
  identifier: "UpdateLicenseAssetRulesetRequest",
}) as any as S.Schema<UpdateLicenseAssetRulesetRequest>;
export interface UpdateLicenseAssetRulesetResponse {
  LicenseAssetRulesetArn: string;
}
export const UpdateLicenseAssetRulesetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LicenseAssetRulesetArn: S.String }).pipe(ns),
).annotate({
  identifier: "UpdateLicenseAssetRulesetResponse",
}) as any as S.Schema<UpdateLicenseAssetRulesetResponse>;
export type LicenseConfigurationStatus =
  | "AVAILABLE"
  | "DISABLED"
  | (string & {});
export const LicenseConfigurationStatus = /*@__PURE__*/ S.String;

export interface UpdateLicenseConfigurationRequest {
  LicenseConfigurationArn: string;
  LicenseConfigurationStatus?: LicenseConfigurationStatus;
  LicenseRules?: string[];
  LicenseCount?: number;
  LicenseCountHardLimit?: boolean;
  Name?: string;
  Description?: string;
  ProductInformationList?: ProductInformation[];
  DisassociateWhenNotFound?: boolean;
  LicenseExpiry?: number;
}
export const UpdateLicenseConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LicenseConfigurationArn: S.String,
    LicenseConfigurationStatus: S.optional(LicenseConfigurationStatus),
    LicenseRules: S.optional(StringList),
    LicenseCount: S.optional(S.Number),
    LicenseCountHardLimit: S.optional(S.Boolean),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    ProductInformationList: S.optional(ProductInformationList),
    DisassociateWhenNotFound: S.optional(S.Boolean),
    LicenseExpiry: S.optional(S.Number),
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
  identifier: "UpdateLicenseConfigurationRequest",
}) as any as S.Schema<UpdateLicenseConfigurationRequest>;
export interface UpdateLicenseConfigurationResponse {}
export const UpdateLicenseConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateLicenseConfigurationResponse",
}) as any as S.Schema<UpdateLicenseConfigurationResponse>;
export interface UpdateLicenseManagerReportGeneratorRequest {
  LicenseManagerReportGeneratorArn: string;
  ReportGeneratorName: string;
  Type: ReportType[];
  ReportContext: ReportContext;
  ReportFrequency: ReportFrequency;
  ClientToken: string;
  Description?: string;
}
export const UpdateLicenseManagerReportGeneratorRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      LicenseManagerReportGeneratorArn: S.String,
      ReportGeneratorName: S.String,
      Type: ReportTypeList,
      ReportContext: ReportContext,
      ReportFrequency: ReportFrequency,
      ClientToken: S.String,
      Description: S.optional(S.String),
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
    identifier: "UpdateLicenseManagerReportGeneratorRequest",
  }) as any as S.Schema<UpdateLicenseManagerReportGeneratorRequest>;
export interface UpdateLicenseManagerReportGeneratorResponse {}
export const UpdateLicenseManagerReportGeneratorResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "UpdateLicenseManagerReportGeneratorResponse",
  }) as any as S.Schema<UpdateLicenseManagerReportGeneratorResponse>;
export interface UpdateLicenseSpecificationsForResourceRequest {
  ResourceArn: string;
  AddLicenseSpecifications?: LicenseSpecification[];
  RemoveLicenseSpecifications?: LicenseSpecification[];
}
export const UpdateLicenseSpecificationsForResourceRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ResourceArn: S.String,
      AddLicenseSpecifications: S.optional(LicenseSpecifications),
      RemoveLicenseSpecifications: S.optional(LicenseSpecifications),
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
    identifier: "UpdateLicenseSpecificationsForResourceRequest",
  }) as any as S.Schema<UpdateLicenseSpecificationsForResourceRequest>;
export interface UpdateLicenseSpecificationsForResourceResponse {}
export const UpdateLicenseSpecificationsForResourceResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "UpdateLicenseSpecificationsForResourceResponse",
  }) as any as S.Schema<UpdateLicenseSpecificationsForResourceResponse>;
export interface UpdateServiceSettingsRequest {
  S3BucketArn?: string;
  SnsTopicArn?: string;
  OrganizationConfiguration?: OrganizationConfiguration;
  EnableCrossAccountsDiscovery?: boolean;
  EnabledDiscoverySourceRegions?: string[];
}
export const UpdateServiceSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3BucketArn: S.optional(S.String),
    SnsTopicArn: S.optional(S.String),
    OrganizationConfiguration: S.optional(OrganizationConfiguration),
    EnableCrossAccountsDiscovery: S.optional(S.Boolean),
    EnabledDiscoverySourceRegions: S.optional(StringList),
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
  identifier: "UpdateServiceSettingsRequest",
}) as any as S.Schema<UpdateServiceSettingsRequest>;
export interface UpdateServiceSettingsResponse {}
export const UpdateServiceSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateServiceSettingsResponse",
}) as any as S.Schema<UpdateServiceSettingsResponse>;
export type Message = string;
export type Location = string;
export type AcceptGrantError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Accepts the specified grant.
 */
export const acceptGrant: API.OperationMethod<
  AcceptGrantRequest,
  AcceptGrantResponse,
  AcceptGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptGrantRequest,
  output: AcceptGrantResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptGrant",
}));

export type CheckInLicenseError =
  | AccessDeniedException
  | AuthorizationException
  | ConflictException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceNotFoundException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Checks in the specified license. Check in a license when it is no longer in use.
 */
export const checkInLicense: API.OperationMethod<
  CheckInLicenseRequest,
  CheckInLicenseResponse,
  CheckInLicenseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CheckInLicenseRequest,
  output: CheckInLicenseResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    ConflictException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceNotFoundException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckInLicense",
}));

export type CheckoutBorrowLicenseError =
  | AccessDeniedException
  | AuthorizationException
  | EntitlementNotAllowedException
  | InvalidParameterValueException
  | NoEntitlementsAllowedException
  | RateLimitExceededException
  | RedirectException
  | ResourceNotFoundException
  | ServerInternalException
  | UnsupportedDigitalSignatureMethodException
  | ValidationException
  | CommonErrors;
/**
 * Checks out the specified license for offline use.
 */
export const checkoutBorrowLicense: API.OperationMethod<
  CheckoutBorrowLicenseRequest,
  CheckoutBorrowLicenseResponse,
  CheckoutBorrowLicenseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CheckoutBorrowLicenseRequest,
  output: CheckoutBorrowLicenseResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    EntitlementNotAllowedException,
    InvalidParameterValueException,
    NoEntitlementsAllowedException,
    RateLimitExceededException,
    RedirectException,
    ResourceNotFoundException,
    ServerInternalException,
    UnsupportedDigitalSignatureMethodException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckoutBorrowLicense",
}));

export type CheckoutLicenseError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | NoEntitlementsAllowedException
  | RateLimitExceededException
  | RedirectException
  | ResourceNotFoundException
  | ServerInternalException
  | UnsupportedDigitalSignatureMethodException
  | ValidationException
  | CommonErrors;
/**
 * Checks out the specified license.
 *
 * If the account that created the license is the same that is performing the check out, you must
 * specify the account as the beneficiary.
 */
export const checkoutLicense: API.OperationMethod<
  CheckoutLicenseRequest,
  CheckoutLicenseResponse,
  CheckoutLicenseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CheckoutLicenseRequest,
  output: CheckoutLicenseResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    NoEntitlementsAllowedException,
    RateLimitExceededException,
    RedirectException,
    ResourceNotFoundException,
    ServerInternalException,
    UnsupportedDigitalSignatureMethodException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckoutLicense",
}));

export type CreateGrantError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Creates a grant for the specified license. A grant shares the use of license
 * entitlements with a specific Amazon Web Services account, an organization, or an
 * organizational unit (OU). For more information, see Granted licenses in License Manager in the *License Manager User Guide*.
 */
export const createGrant: API.OperationMethod<
  CreateGrantRequest,
  CreateGrantResponse,
  CreateGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGrantRequest,
  output: CreateGrantResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGrant",
}));

export type CreateGrantVersionError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new version of the specified grant. For more information, see
 * Granted licenses in License Manager in the *License Manager User Guide*.
 */
export const createGrantVersion: API.OperationMethod<
  CreateGrantVersionRequest,
  CreateGrantVersionResponse,
  CreateGrantVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGrantVersionRequest,
  output: CreateGrantVersionResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGrantVersion",
}));

export type CreateLicenseError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | RedirectException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Creates a license.
 */
export const createLicense: API.OperationMethod<
  CreateLicenseRequest,
  CreateLicenseResponse,
  CreateLicenseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLicenseRequest,
  output: CreateLicenseResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    RedirectException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLicense",
}));

export type CreateLicenseAssetGroupError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Creates a license asset group.
 */
export const createLicenseAssetGroup: API.OperationMethod<
  CreateLicenseAssetGroupRequest,
  CreateLicenseAssetGroupResponse,
  CreateLicenseAssetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLicenseAssetGroupRequest,
  output: CreateLicenseAssetGroupResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLicenseAssetGroup",
}));

export type CreateLicenseAssetRulesetError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Creates a license asset ruleset.
 */
export const createLicenseAssetRuleset: API.OperationMethod<
  CreateLicenseAssetRulesetRequest,
  CreateLicenseAssetRulesetResponse,
  CreateLicenseAssetRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLicenseAssetRulesetRequest,
  output: CreateLicenseAssetRulesetResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLicenseAssetRuleset",
}));

export type CreateLicenseConfigurationError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Creates a license configuration.
 *
 * A license configuration is an abstraction of a customer license agreement that can be
 * consumed and enforced by License Manager. Components include specifications for the license
 * type (licensing by instance, socket, CPU, or vCPU), allowed tenancy (shared tenancy,
 * Dedicated Instance, Dedicated Host, or all of these), license affinity to host (how long a
 * license must be associated with a host), and the number of licenses purchased and used.
 */
export const createLicenseConfiguration: API.OperationMethod<
  CreateLicenseConfigurationRequest,
  CreateLicenseConfigurationResponse,
  CreateLicenseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLicenseConfigurationRequest,
  output: CreateLicenseConfigurationResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLicenseConfiguration",
}));

export type CreateLicenseConversionTaskForResourceError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new license conversion task.
 */
export const createLicenseConversionTaskForResource: API.OperationMethod<
  CreateLicenseConversionTaskForResourceRequest,
  CreateLicenseConversionTaskForResourceResponse,
  CreateLicenseConversionTaskForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLicenseConversionTaskForResourceRequest,
  output: CreateLicenseConversionTaskForResourceResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLicenseConversionTaskForResource",
}));

export type CreateLicenseManagerReportGeneratorError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Creates a report generator.
 */
export const createLicenseManagerReportGenerator: API.OperationMethod<
  CreateLicenseManagerReportGeneratorRequest,
  CreateLicenseManagerReportGeneratorResponse,
  CreateLicenseManagerReportGeneratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLicenseManagerReportGeneratorRequest,
  output: CreateLicenseManagerReportGeneratorResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLicenseManagerReportGenerator",
}));

export type CreateLicenseVersionError =
  | AccessDeniedException
  | AuthorizationException
  | ConflictException
  | RateLimitExceededException
  | RedirectException
  | ResourceNotFoundException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new version of the specified license.
 */
export const createLicenseVersion: API.OperationMethod<
  CreateLicenseVersionRequest,
  CreateLicenseVersionResponse,
  CreateLicenseVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLicenseVersionRequest,
  output: CreateLicenseVersionResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    ConflictException,
    RateLimitExceededException,
    RedirectException,
    ResourceNotFoundException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLicenseVersion",
}));

export type CreateTokenError =
  | AccessDeniedException
  | AuthorizationException
  | RateLimitExceededException
  | RedirectException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Creates a long-lived token.
 *
 * A refresh token is a JWT token used to get an access token. With an access token,
 * you can call AssumeRoleWithWebIdentity to get role credentials that you can use to
 * call License Manager to manage the specified license.
 */
export const createToken: API.OperationMethod<
  CreateTokenRequest,
  CreateTokenResponse,
  CreateTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTokenRequest,
  output: CreateTokenResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    RateLimitExceededException,
    RedirectException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateToken",
}));

export type DeleteGrantError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified grant.
 */
export const deleteGrant: API.OperationMethod<
  DeleteGrantRequest,
  DeleteGrantResponse,
  DeleteGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGrantRequest,
  output: DeleteGrantResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGrant",
}));

export type DeleteLicenseError =
  | AccessDeniedException
  | AuthorizationException
  | ConflictException
  | InvalidParameterValueException
  | RateLimitExceededException
  | RedirectException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified license.
 */
export const deleteLicense: API.OperationMethod<
  DeleteLicenseRequest,
  DeleteLicenseResponse,
  DeleteLicenseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLicenseRequest,
  output: DeleteLicenseResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    ConflictException,
    InvalidParameterValueException,
    RateLimitExceededException,
    RedirectException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLicense",
}));

export type DeleteLicenseAssetGroupError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a license asset group.
 */
export const deleteLicenseAssetGroup: API.OperationMethod<
  DeleteLicenseAssetGroupRequest,
  DeleteLicenseAssetGroupResponse,
  DeleteLicenseAssetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLicenseAssetGroupRequest,
  output: DeleteLicenseAssetGroupResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLicenseAssetGroup",
}));

export type DeleteLicenseAssetRulesetError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a license asset ruleset.
 */
export const deleteLicenseAssetRuleset: API.OperationMethod<
  DeleteLicenseAssetRulesetRequest,
  DeleteLicenseAssetRulesetResponse,
  DeleteLicenseAssetRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLicenseAssetRulesetRequest,
  output: DeleteLicenseAssetRulesetResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLicenseAssetRuleset",
}));

export type DeleteLicenseConfigurationError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | LicenseConfigurationNotFound
  | CommonErrors;
/**
 * Deletes the specified license configuration.
 *
 * You cannot delete a license configuration that is in use.
 */
export const deleteLicenseConfiguration: API.OperationMethod<
  DeleteLicenseConfigurationRequest,
  DeleteLicenseConfigurationResponse,
  DeleteLicenseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLicenseConfigurationRequest,
  output: DeleteLicenseConfigurationResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    LicenseConfigurationNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLicenseConfiguration",
}));

export type DeleteLicenseManagerReportGeneratorError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified report generator.
 *
 * This action deletes the report generator, which stops it from generating future reports.
 * The action cannot be reversed. It has no effect on the previous reports from this generator.
 */
export const deleteLicenseManagerReportGenerator: API.OperationMethod<
  DeleteLicenseManagerReportGeneratorRequest,
  DeleteLicenseManagerReportGeneratorResponse,
  DeleteLicenseManagerReportGeneratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLicenseManagerReportGeneratorRequest,
  output: DeleteLicenseManagerReportGeneratorResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLicenseManagerReportGenerator",
}));

export type DeleteTokenError =
  | AccessDeniedException
  | AuthorizationException
  | RateLimitExceededException
  | RedirectException
  | ResourceNotFoundException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified token. Must be called in the license home Region.
 */
export const deleteToken: API.OperationMethod<
  DeleteTokenRequest,
  DeleteTokenResponse,
  DeleteTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTokenRequest,
  output: DeleteTokenResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    RateLimitExceededException,
    RedirectException,
    ResourceNotFoundException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteToken",
}));

export type ExtendLicenseConsumptionError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceNotFoundException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Extends the expiration date for license consumption.
 */
export const extendLicenseConsumption: API.OperationMethod<
  ExtendLicenseConsumptionRequest,
  ExtendLicenseConsumptionResponse,
  ExtendLicenseConsumptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExtendLicenseConsumptionRequest,
  output: ExtendLicenseConsumptionResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceNotFoundException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExtendLicenseConsumption",
}));

export type GetAccessTokenError =
  | AccessDeniedException
  | AuthorizationException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Gets a temporary access token to use with AssumeRoleWithWebIdentity. Access tokens
 * are valid for one hour.
 */
export const getAccessToken: API.OperationMethod<
  GetAccessTokenRequest,
  GetAccessTokenResponse,
  GetAccessTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccessTokenRequest,
  output: GetAccessTokenResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessToken",
}));

export type GetGrantError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets detailed information about the specified grant.
 */
export const getGrant: API.OperationMethod<
  GetGrantRequest,
  GetGrantResponse,
  GetGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGrantRequest,
  output: GetGrantResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGrant",
}));

export type GetLicenseError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets detailed information about the specified license.
 */
export const getLicense: API.OperationMethod<
  GetLicenseRequest,
  GetLicenseResponse,
  GetLicenseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLicenseRequest,
  output: GetLicenseResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLicense",
}));

export type GetLicenseAssetGroupError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Gets a license asset group.
 */
export const getLicenseAssetGroup: API.OperationMethod<
  GetLicenseAssetGroupRequest,
  GetLicenseAssetGroupResponse,
  GetLicenseAssetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLicenseAssetGroupRequest,
  output: GetLicenseAssetGroupResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLicenseAssetGroup",
}));

export type GetLicenseAssetRulesetError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Gets a license asset ruleset.
 */
export const getLicenseAssetRuleset: API.OperationMethod<
  GetLicenseAssetRulesetRequest,
  GetLicenseAssetRulesetResponse,
  GetLicenseAssetRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLicenseAssetRulesetRequest,
  output: GetLicenseAssetRulesetResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLicenseAssetRuleset",
}));

export type GetLicenseConfigurationError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | LicenseConfigurationNotFound
  | CommonErrors;
/**
 * Gets detailed information about the specified license configuration.
 */
export const getLicenseConfiguration: API.OperationMethod<
  GetLicenseConfigurationRequest,
  GetLicenseConfigurationResponse,
  GetLicenseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLicenseConfigurationRequest,
  output: GetLicenseConfigurationResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    LicenseConfigurationNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLicenseConfiguration",
}));

export type GetLicenseConversionTaskError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Gets information about the specified license type conversion task.
 */
export const getLicenseConversionTask: API.OperationMethod<
  GetLicenseConversionTaskRequest,
  GetLicenseConversionTaskResponse,
  GetLicenseConversionTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLicenseConversionTaskRequest,
  output: GetLicenseConversionTaskResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLicenseConversionTask",
}));

export type GetLicenseManagerReportGeneratorError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified report generator.
 */
export const getLicenseManagerReportGenerator: API.OperationMethod<
  GetLicenseManagerReportGeneratorRequest,
  GetLicenseManagerReportGeneratorResponse,
  GetLicenseManagerReportGeneratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLicenseManagerReportGeneratorRequest,
  output: GetLicenseManagerReportGeneratorResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLicenseManagerReportGenerator",
}));

export type GetLicenseUsageError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Gets detailed information about the usage of the specified license.
 */
export const getLicenseUsage: API.OperationMethod<
  GetLicenseUsageRequest,
  GetLicenseUsageResponse,
  GetLicenseUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLicenseUsageRequest,
  output: GetLicenseUsageResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLicenseUsage",
}));

export type GetServiceSettingsError =
  | AccessDeniedException
  | AuthorizationException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Gets the License Manager settings for the current Region.
 */
export const getServiceSettings: API.OperationMethod<
  GetServiceSettingsRequest,
  GetServiceSettingsResponse,
  GetServiceSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServiceSettingsRequest,
  output: GetServiceSettingsResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceSettings",
}));

export type ListAssetsForLicenseAssetGroupError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists assets for a license asset group.
 */
export const listAssetsForLicenseAssetGroup: API.OperationMethod<
  ListAssetsForLicenseAssetGroupRequest,
  ListAssetsForLicenseAssetGroupResponse,
  ListAssetsForLicenseAssetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListAssetsForLicenseAssetGroupRequest,
  output: ListAssetsForLicenseAssetGroupResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetsForLicenseAssetGroup",
}));

export type ListAssociationsForLicenseConfigurationError =
  | AccessDeniedException
  | AuthorizationException
  | FilterLimitExceededException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Lists the resource associations for the specified license configuration.
 *
 * Resource associations need not consume licenses from a license configuration.
 * For example, an AMI or a stopped instance might not consume a license (depending on
 * the license rules).
 */
export const listAssociationsForLicenseConfiguration: API.OperationMethod<
  ListAssociationsForLicenseConfigurationRequest,
  ListAssociationsForLicenseConfigurationResponse,
  ListAssociationsForLicenseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListAssociationsForLicenseConfigurationRequest,
  output: ListAssociationsForLicenseConfigurationResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    FilterLimitExceededException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociationsForLicenseConfiguration",
}));

export type ListDistributedGrantsError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists the grants distributed for the specified license.
 */
export const listDistributedGrants: API.OperationMethod<
  ListDistributedGrantsRequest,
  ListDistributedGrantsResponse,
  ListDistributedGrantsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListDistributedGrantsRequest,
  output: ListDistributedGrantsResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDistributedGrants",
}));

export type ListFailuresForLicenseConfigurationOperationsError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Lists the license configuration operations that failed.
 */
export const listFailuresForLicenseConfigurationOperations: API.OperationMethod<
  ListFailuresForLicenseConfigurationOperationsRequest,
  ListFailuresForLicenseConfigurationOperationsResponse,
  ListFailuresForLicenseConfigurationOperationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListFailuresForLicenseConfigurationOperationsRequest,
  output: ListFailuresForLicenseConfigurationOperationsResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFailuresForLicenseConfigurationOperations",
}));

export type ListLicenseAssetGroupsError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists license asset groups.
 */
export const listLicenseAssetGroups: API.OperationMethod<
  ListLicenseAssetGroupsRequest,
  ListLicenseAssetGroupsResponse,
  ListLicenseAssetGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListLicenseAssetGroupsRequest,
  output: ListLicenseAssetGroupsResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLicenseAssetGroups",
}));

export type ListLicenseAssetRulesetsError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists license asset rulesets.
 */
export const listLicenseAssetRulesets: API.OperationMethod<
  ListLicenseAssetRulesetsRequest,
  ListLicenseAssetRulesetsResponse,
  ListLicenseAssetRulesetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListLicenseAssetRulesetsRequest,
  output: ListLicenseAssetRulesetsResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLicenseAssetRulesets",
}));

export type ListLicenseConfigurationsError =
  | AccessDeniedException
  | AuthorizationException
  | FilterLimitExceededException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Lists the license configurations for your account.
 */
export const listLicenseConfigurations: API.OperationMethod<
  ListLicenseConfigurationsRequest,
  ListLicenseConfigurationsResponse,
  ListLicenseConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListLicenseConfigurationsRequest,
  output: ListLicenseConfigurationsResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    FilterLimitExceededException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLicenseConfigurations",
}));

export type ListLicenseConfigurationsForOrganizationError =
  | AccessDeniedException
  | AuthorizationException
  | FilterLimitExceededException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Lists license configurations for an organization.
 */
export const listLicenseConfigurationsForOrganization: API.OperationMethod<
  ListLicenseConfigurationsForOrganizationRequest,
  ListLicenseConfigurationsForOrganizationResponse,
  ListLicenseConfigurationsForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListLicenseConfigurationsForOrganizationRequest,
  output: ListLicenseConfigurationsForOrganizationResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    FilterLimitExceededException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLicenseConfigurationsForOrganization",
}));

export type ListLicenseConversionTasksError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Lists the license type conversion tasks for your account.
 */
export const listLicenseConversionTasks: API.OperationMethod<
  ListLicenseConversionTasksRequest,
  ListLicenseConversionTasksResponse,
  ListLicenseConversionTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListLicenseConversionTasksRequest,
  output: ListLicenseConversionTasksResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLicenseConversionTasks",
}));

export type ListLicenseManagerReportGeneratorsError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists the report generators for your account.
 */
export const listLicenseManagerReportGenerators: API.OperationMethod<
  ListLicenseManagerReportGeneratorsRequest,
  ListLicenseManagerReportGeneratorsResponse,
  ListLicenseManagerReportGeneratorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListLicenseManagerReportGeneratorsRequest,
  output: ListLicenseManagerReportGeneratorsResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLicenseManagerReportGenerators",
}));

export type ListLicensesError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists the licenses for your account.
 */
export const listLicenses: API.OperationMethod<
  ListLicensesRequest,
  ListLicensesResponse,
  ListLicensesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListLicensesRequest,
  output: ListLicensesResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLicenses",
}));

export type ListLicenseSpecificationsForResourceError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Describes the license configurations for the specified resource.
 */
export const listLicenseSpecificationsForResource: API.OperationMethod<
  ListLicenseSpecificationsForResourceRequest,
  ListLicenseSpecificationsForResourceResponse,
  ListLicenseSpecificationsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListLicenseSpecificationsForResourceRequest,
  output: ListLicenseSpecificationsForResourceResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLicenseSpecificationsForResource",
}));

export type ListLicenseVersionsError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Lists all versions of the specified license.
 */
export const listLicenseVersions: API.OperationMethod<
  ListLicenseVersionsRequest,
  ListLicenseVersionsResponse,
  ListLicenseVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListLicenseVersionsRequest,
  output: ListLicenseVersionsResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLicenseVersions",
}));

export type ListReceivedGrantsError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists grants that are received. Received grants are grants created while specifying the
 * recipient as this Amazon Web Services account, your organization, or an organizational unit
 * (OU) to which this member account belongs.
 */
export const listReceivedGrants: API.OperationMethod<
  ListReceivedGrantsRequest,
  ListReceivedGrantsResponse,
  ListReceivedGrantsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListReceivedGrantsRequest,
  output: ListReceivedGrantsResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReceivedGrants",
}));

export type ListReceivedGrantsForOrganizationError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists the grants received for all accounts in the organization.
 */
export const listReceivedGrantsForOrganization: API.OperationMethod<
  ListReceivedGrantsForOrganizationRequest,
  ListReceivedGrantsForOrganizationResponse,
  ListReceivedGrantsForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListReceivedGrantsForOrganizationRequest,
  output: ListReceivedGrantsForOrganizationResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReceivedGrantsForOrganization",
}));

export type ListReceivedLicensesError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists received licenses.
 */
export const listReceivedLicenses: API.OperationMethod<
  ListReceivedLicensesRequest,
  ListReceivedLicensesResponse,
  ListReceivedLicensesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListReceivedLicensesRequest,
  output: ListReceivedLicensesResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReceivedLicenses",
}));

export type ListReceivedLicensesForOrganizationError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists the licenses received for all accounts in the organization.
 */
export const listReceivedLicensesForOrganization: API.OperationMethod<
  ListReceivedLicensesForOrganizationRequest,
  ListReceivedLicensesForOrganizationResponse,
  ListReceivedLicensesForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListReceivedLicensesForOrganizationRequest,
  output: ListReceivedLicensesForOrganizationResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReceivedLicensesForOrganization",
}));

export type ListResourceInventoryError =
  | AccessDeniedException
  | AuthorizationException
  | FailedDependencyException
  | FilterLimitExceededException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Lists resources managed using Systems Manager inventory.
 */
export const listResourceInventory: API.OperationMethod<
  ListResourceInventoryRequest,
  ListResourceInventoryResponse,
  ListResourceInventoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListResourceInventoryRequest,
  output: ListResourceInventoryResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    FailedDependencyException,
    FilterLimitExceededException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceInventory",
}));

export type ListTagsForResourceError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags for the specified resource. For more information about tagging support in
 * License Manager, see the TagResource operation.
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
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTokensError =
  | AccessDeniedException
  | AuthorizationException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Lists your tokens.
 */
export const listTokens: API.OperationMethod<
  ListTokensRequest,
  ListTokensResponse,
  ListTokensError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTokensRequest,
  output: ListTokensResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTokens",
}));

export type ListUsageForLicenseConfigurationError =
  | AccessDeniedException
  | AuthorizationException
  | FilterLimitExceededException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Lists all license usage records for a license configuration, displaying license
 * consumption details by resource at a selected point in time. Use this action to audit the
 * current license consumption for any license inventory and configuration.
 */
export const listUsageForLicenseConfiguration: API.OperationMethod<
  ListUsageForLicenseConfigurationRequest,
  ListUsageForLicenseConfigurationResponse,
  ListUsageForLicenseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListUsageForLicenseConfigurationRequest,
  output: ListUsageForLicenseConfigurationResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    FilterLimitExceededException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsageForLicenseConfiguration",
}));

export type RejectGrantError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Rejects the specified grant.
 */
export const rejectGrant: API.OperationMethod<
  RejectGrantRequest,
  RejectGrantResponse,
  RejectGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectGrantRequest,
  output: RejectGrantResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectGrant",
}));

export type TagResourceError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Adds the specified tags to the specified resource. The following resources support
 * tagging in License Manager:
 *
 * - Licenses
 *
 * - Grants
 *
 * - License configurations
 *
 * - Report generators
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
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified tags from the specified resource.
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
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateLicenseAssetGroupError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Updates a license asset group.
 */
export const updateLicenseAssetGroup: API.OperationMethod<
  UpdateLicenseAssetGroupRequest,
  UpdateLicenseAssetGroupResponse,
  UpdateLicenseAssetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLicenseAssetGroupRequest,
  output: UpdateLicenseAssetGroupResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLicenseAssetGroup",
}));

export type UpdateLicenseAssetRulesetError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Updates a license asset ruleset.
 */
export const updateLicenseAssetRuleset: API.OperationMethod<
  UpdateLicenseAssetRulesetRequest,
  UpdateLicenseAssetRulesetResponse,
  UpdateLicenseAssetRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLicenseAssetRulesetRequest,
  output: UpdateLicenseAssetRulesetResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLicenseAssetRuleset",
}));

export type UpdateLicenseConfigurationError =
  | AccessDeniedException
  | AuthorizationException
  | ConflictException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ServerInternalException
  | LicenseConfigurationNotFound
  | CommonErrors;
/**
 * Modifies the attributes of an existing license configuration.
 */
export const updateLicenseConfiguration: API.OperationMethod<
  UpdateLicenseConfigurationRequest,
  UpdateLicenseConfigurationResponse,
  UpdateLicenseConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLicenseConfigurationRequest,
  output: UpdateLicenseConfigurationResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    ConflictException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ServerInternalException,
    LicenseConfigurationNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLicenseConfiguration",
}));

export type UpdateLicenseManagerReportGeneratorError =
  | AccessDeniedException
  | AuthorizationException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ResourceLimitExceededException
  | ResourceNotFoundException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Updates a report generator.
 *
 * After you make changes to a report generator, it starts generating new reports within 60 minutes of being updated.
 */
export const updateLicenseManagerReportGenerator: API.OperationMethod<
  UpdateLicenseManagerReportGeneratorRequest,
  UpdateLicenseManagerReportGeneratorResponse,
  UpdateLicenseManagerReportGeneratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLicenseManagerReportGeneratorRequest,
  output: UpdateLicenseManagerReportGeneratorResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ResourceLimitExceededException,
    ResourceNotFoundException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLicenseManagerReportGenerator",
}));

export type UpdateLicenseSpecificationsForResourceError =
  | AccessDeniedException
  | AuthorizationException
  | ConflictException
  | InvalidParameterValueException
  | InvalidResourceStateException
  | LicenseUsageException
  | RateLimitExceededException
  | ServerInternalException
  | CommonErrors;
/**
 * Adds or removes the specified license configurations for the specified Amazon Web Services resource.
 *
 * You can update the license specifications of AMIs, instances, and hosts.
 * You cannot update the license specifications for launch templates and CloudFormation templates,
 * as they send license configurations to the operation that creates the resource.
 */
export const updateLicenseSpecificationsForResource: API.OperationMethod<
  UpdateLicenseSpecificationsForResourceRequest,
  UpdateLicenseSpecificationsForResourceResponse,
  UpdateLicenseSpecificationsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLicenseSpecificationsForResourceRequest,
  output: UpdateLicenseSpecificationsForResourceResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    ConflictException,
    InvalidParameterValueException,
    InvalidResourceStateException,
    LicenseUsageException,
    RateLimitExceededException,
    ServerInternalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLicenseSpecificationsForResource",
}));

export type UpdateServiceSettingsError =
  | AccessDeniedException
  | AuthorizationException
  | ConflictException
  | InvalidParameterValueException
  | RateLimitExceededException
  | ServerInternalException
  | ValidationException
  | CommonErrors;
/**
 * Updates License Manager settings for the current Region.
 */
export const updateServiceSettings: API.OperationMethod<
  UpdateServiceSettingsRequest,
  UpdateServiceSettingsResponse,
  UpdateServiceSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServiceSettingsRequest,
  output: UpdateServiceSettingsResponse,
  errors: [
    AccessDeniedException,
    AuthorizationException,
    ConflictException,
    InvalidParameterValueException,
    RateLimitExceededException,
    ServerInternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceSettings",
}));
