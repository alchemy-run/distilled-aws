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
const svc = T.AwsApiService({ sdkId: "Account", serviceShapeName: "Account" });
const auth = T.AwsAuthSigv4({ name: "account" });
const ver = T.ServiceVersion("2021-02-01");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  const _p0 = (_0: unknown) => ({
    authSchemes: [
      {
        name: "sigv4",
        signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}`,
      },
    ],
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
              `https://account-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p0(PartitionResult),
              {},
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://account-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              _p0(PartitionResult),
              {},
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://account.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p0(PartitionResult),
              {},
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://account.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          _p0(PartitionResult),
          {},
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
      message: S.String.pipe(T.ErrorMessage()),
      errorType: S.optional(S.String).pipe(T.HttpHeader("x-amzn-ErrorType")),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      errorType: S.optional(S.String).pipe(T.HttpHeader("x-amzn-ErrorType")),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      errorType: S.optional(S.String).pipe(T.HttpHeader("x-amzn-ErrorType")),
    },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      errorType: S.optional(S.String).pipe(T.HttpHeader("x-amzn-ErrorType")),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ResourceUnavailableException>()(
    "ResourceUnavailableException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      errorType: S.optional(S.String).pipe(T.HttpHeader("x-amzn-ErrorType")),
    },
    T.HttpError(424),
  ) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      errorType: S.optional(S.String).pipe(T.HttpHeader("x-amzn-ErrorType")),
    },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: SensitiveString.pipe(T.ErrorMessage()),
      reason: S.optional(S.String),
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type AccountId = string;
export type PrimaryEmailAddress = string | redacted.Redacted<string>;
export type Otp = string | redacted.Redacted<string>;
export interface AcceptPrimaryEmailUpdateRequest {
  AccountId: string;
  PrimaryEmail: string | redacted.Redacted<string>;
  Otp: string | redacted.Redacted<string>;
}
export const AcceptPrimaryEmailUpdateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String,
    PrimaryEmail: SensitiveString,
    Otp: SensitiveString,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/acceptPrimaryEmailUpdate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AcceptPrimaryEmailUpdateRequest",
}) as any as S.Schema<AcceptPrimaryEmailUpdateRequest>;
export type PrimaryEmailUpdateStatus = string;
export interface AcceptPrimaryEmailUpdateResponse {
  Status?: string;
}
export const AcceptPrimaryEmailUpdateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(S.String) }),
).annotate({
  identifier: "AcceptPrimaryEmailUpdateResponse",
}) as any as S.Schema<AcceptPrimaryEmailUpdateResponse>;
export type AlternateContactType = string;
export interface DeleteAlternateContactRequest {
  AlternateContactType: string;
  AccountId?: string;
}
export const DeleteAlternateContactRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlternateContactType: S.String,
    AccountId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/deleteAlternateContact" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAlternateContactRequest",
}) as any as S.Schema<DeleteAlternateContactRequest>;
export interface DeleteAlternateContactResponse {}
export const DeleteAlternateContactResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAlternateContactResponse",
}) as any as S.Schema<DeleteAlternateContactResponse>;
export type RegionName = string;
export interface DisableRegionRequest {
  AccountId?: string;
  RegionName: string;
}
export const DisableRegionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountId: S.optional(S.String), RegionName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/disableRegion" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisableRegionRequest",
}) as any as S.Schema<DisableRegionRequest>;
export interface DisableRegionResponse {}
export const DisableRegionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisableRegionResponse",
}) as any as S.Schema<DisableRegionResponse>;
export interface EnableRegionRequest {
  AccountId?: string;
  RegionName: string;
}
export const EnableRegionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountId: S.optional(S.String), RegionName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/enableRegion" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "EnableRegionRequest",
}) as any as S.Schema<EnableRegionRequest>;
export interface EnableRegionResponse {}
export const EnableRegionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "EnableRegionResponse",
}) as any as S.Schema<EnableRegionResponse>;
export interface GetAccountInformationRequest {
  AccountId?: string;
}
export const GetAccountInformationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountId: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/getAccountInformation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccountInformationRequest",
}) as any as S.Schema<GetAccountInformationRequest>;
export type AccountName = string | redacted.Redacted<string>;
export type AccountCreatedDate = Date;
export type AccountState = string;
export interface GetAccountInformationResponse {
  AccountId?: string;
  AccountName?: string | redacted.Redacted<string>;
  AccountCreatedDate?: Date;
  AccountState?: string;
}
export const GetAccountInformationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    AccountName: S.optional(SensitiveString),
    AccountCreatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    AccountState: S.optional(S.String),
  }),
).annotate({
  identifier: "GetAccountInformationResponse",
}) as any as S.Schema<GetAccountInformationResponse>;
export interface GetAlternateContactRequest {
  AlternateContactType: string;
  AccountId?: string;
}
export const GetAlternateContactRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlternateContactType: S.String,
    AccountId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/getAlternateContact" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAlternateContactRequest",
}) as any as S.Schema<GetAlternateContactRequest>;
export type Name = string | redacted.Redacted<string>;
export type Title = string | redacted.Redacted<string>;
export type EmailAddress = string | redacted.Redacted<string>;
export type PhoneNumber = string | redacted.Redacted<string>;
export interface AlternateContact {
  Name?: string | redacted.Redacted<string>;
  Title?: string | redacted.Redacted<string>;
  EmailAddress?: string | redacted.Redacted<string>;
  PhoneNumber?: string | redacted.Redacted<string>;
  AlternateContactType?: string;
}
export const AlternateContact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(SensitiveString),
    Title: S.optional(SensitiveString),
    EmailAddress: S.optional(SensitiveString),
    PhoneNumber: S.optional(SensitiveString),
    AlternateContactType: S.optional(S.String),
  }),
).annotate({
  identifier: "AlternateContact",
}) as any as S.Schema<AlternateContact>;
export interface GetAlternateContactResponse {
  AlternateContact?: AlternateContact;
}
export const GetAlternateContactResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AlternateContact: S.optional(AlternateContact) }),
).annotate({
  identifier: "GetAlternateContactResponse",
}) as any as S.Schema<GetAlternateContactResponse>;
export interface GetContactInformationRequest {
  AccountId?: string;
}
export const GetContactInformationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountId: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/getContactInformation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetContactInformationRequest",
}) as any as S.Schema<GetContactInformationRequest>;
export type FullName = string | redacted.Redacted<string>;
export type AddressLine = string | redacted.Redacted<string>;
export type City = string | redacted.Redacted<string>;
export type StateOrRegion = string | redacted.Redacted<string>;
export type DistrictOrCounty = string | redacted.Redacted<string>;
export type PostalCode = string | redacted.Redacted<string>;
export type CountryCode = string | redacted.Redacted<string>;
export type ContactInformationPhoneNumber = string | redacted.Redacted<string>;
export type CompanyName = string | redacted.Redacted<string>;
export type WebsiteUrl = string | redacted.Redacted<string>;
export interface ContactInformation {
  FullName: string | redacted.Redacted<string>;
  AddressLine1: string | redacted.Redacted<string>;
  AddressLine2?: string | redacted.Redacted<string>;
  AddressLine3?: string | redacted.Redacted<string>;
  City: string | redacted.Redacted<string>;
  StateOrRegion?: string | redacted.Redacted<string>;
  DistrictOrCounty?: string | redacted.Redacted<string>;
  PostalCode: string | redacted.Redacted<string>;
  CountryCode: string | redacted.Redacted<string>;
  PhoneNumber: string | redacted.Redacted<string>;
  CompanyName?: string | redacted.Redacted<string>;
  WebsiteUrl?: string | redacted.Redacted<string>;
}
export const ContactInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FullName: SensitiveString,
    AddressLine1: SensitiveString,
    AddressLine2: S.optional(SensitiveString),
    AddressLine3: S.optional(SensitiveString),
    City: SensitiveString,
    StateOrRegion: S.optional(SensitiveString),
    DistrictOrCounty: S.optional(SensitiveString),
    PostalCode: SensitiveString,
    CountryCode: SensitiveString,
    PhoneNumber: SensitiveString,
    CompanyName: S.optional(SensitiveString),
    WebsiteUrl: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ContactInformation",
}) as any as S.Schema<ContactInformation>;
export interface GetContactInformationResponse {
  ContactInformation?: ContactInformation;
}
export const GetContactInformationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContactInformation: S.optional(ContactInformation) }),
).annotate({
  identifier: "GetContactInformationResponse",
}) as any as S.Schema<GetContactInformationResponse>;
export interface GetGovCloudAccountInformationRequest {
  StandardAccountId?: string;
}
export const GetGovCloudAccountInformationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ StandardAccountId: S.optional(S.String) }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/getGovCloudAccountInformation" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetGovCloudAccountInformationRequest",
}) as any as S.Schema<GetGovCloudAccountInformationRequest>;
export type AwsAccountState = string;
export interface GetGovCloudAccountInformationResponse {
  GovCloudAccountId: string;
  AccountState: string;
}
export const GetGovCloudAccountInformationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ GovCloudAccountId: S.String, AccountState: S.String }),
).annotate({
  identifier: "GetGovCloudAccountInformationResponse",
}) as any as S.Schema<GetGovCloudAccountInformationResponse>;
export interface GetPrimaryEmailRequest {
  AccountId: string;
}
export const GetPrimaryEmailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/getPrimaryEmail" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPrimaryEmailRequest",
}) as any as S.Schema<GetPrimaryEmailRequest>;
export interface GetPrimaryEmailResponse {
  PrimaryEmail?: string | redacted.Redacted<string>;
}
export const GetPrimaryEmailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PrimaryEmail: S.optional(SensitiveString) }),
).annotate({
  identifier: "GetPrimaryEmailResponse",
}) as any as S.Schema<GetPrimaryEmailResponse>;
export interface GetRegionOptStatusRequest {
  AccountId?: string;
  RegionName: string;
}
export const GetRegionOptStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountId: S.optional(S.String), RegionName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/getRegionOptStatus" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRegionOptStatusRequest",
}) as any as S.Schema<GetRegionOptStatusRequest>;
export type RegionOptStatus = string;
export interface GetRegionOptStatusResponse {
  RegionName?: string;
  RegionOptStatus?: string;
}
export const GetRegionOptStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegionName: S.optional(S.String),
    RegionOptStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "GetRegionOptStatusResponse",
}) as any as S.Schema<GetRegionOptStatusResponse>;
export type RegionOptStatusList = string[];
export const RegionOptStatusList = /*@__PURE__*/ S.Array(S.String);
export interface ListRegionsRequest {
  AccountId?: string;
  MaxResults?: number;
  NextToken?: string;
  RegionOptStatusContains?: string[];
}
export const ListRegionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    RegionOptStatusContains: S.optional(RegionOptStatusList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listRegions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRegionsRequest",
}) as any as S.Schema<ListRegionsRequest>;
export interface Region {
  RegionName?: string;
  RegionOptStatus?: string;
}
export const Region = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegionName: S.optional(S.String),
    RegionOptStatus: S.optional(S.String),
  }),
).annotate({ identifier: "Region" }) as any as S.Schema<Region>;
export type RegionOptList = Region[];
export const RegionOptList = /*@__PURE__*/ S.Array(Region);
export interface ListRegionsResponse {
  NextToken?: string;
  Regions?: Region[];
}
export const ListRegionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Regions: S.optional(RegionOptList),
  }),
).annotate({
  identifier: "ListRegionsResponse",
}) as any as S.Schema<ListRegionsResponse>;
export interface PutAccountNameRequest {
  AccountName: string | redacted.Redacted<string>;
  AccountId?: string;
}
export const PutAccountNameRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountName: SensitiveString,
    AccountId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/putAccountName" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAccountNameRequest",
}) as any as S.Schema<PutAccountNameRequest>;
export interface PutAccountNameResponse {}
export const PutAccountNameResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutAccountNameResponse",
}) as any as S.Schema<PutAccountNameResponse>;
export interface PutAlternateContactRequest {
  Name: string | redacted.Redacted<string>;
  Title: string | redacted.Redacted<string>;
  EmailAddress: string | redacted.Redacted<string>;
  PhoneNumber: string | redacted.Redacted<string>;
  AlternateContactType: string;
  AccountId?: string;
}
export const PutAlternateContactRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: SensitiveString,
    Title: SensitiveString,
    EmailAddress: SensitiveString,
    PhoneNumber: SensitiveString,
    AlternateContactType: S.String,
    AccountId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/putAlternateContact" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAlternateContactRequest",
}) as any as S.Schema<PutAlternateContactRequest>;
export interface PutAlternateContactResponse {}
export const PutAlternateContactResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutAlternateContactResponse",
}) as any as S.Schema<PutAlternateContactResponse>;
export interface PutContactInformationRequest {
  ContactInformation: ContactInformation;
  AccountId?: string;
}
export const PutContactInformationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactInformation: ContactInformation,
    AccountId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/putContactInformation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutContactInformationRequest",
}) as any as S.Schema<PutContactInformationRequest>;
export interface PutContactInformationResponse {}
export const PutContactInformationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutContactInformationResponse",
}) as any as S.Schema<PutContactInformationResponse>;
export interface StartPrimaryEmailUpdateRequest {
  AccountId: string;
  PrimaryEmail: string | redacted.Redacted<string>;
}
export const StartPrimaryEmailUpdateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountId: S.String, PrimaryEmail: SensitiveString }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/startPrimaryEmailUpdate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartPrimaryEmailUpdateRequest",
}) as any as S.Schema<StartPrimaryEmailUpdateRequest>;
export interface StartPrimaryEmailUpdateResponse {
  Status?: string;
}
export const StartPrimaryEmailUpdateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(S.String) }),
).annotate({
  identifier: "StartPrimaryEmailUpdateResponse",
}) as any as S.Schema<StartPrimaryEmailUpdateResponse>;
export type SensitiveString = string | redacted.Redacted<string>;
export type ValidationExceptionReason = string;
export interface ValidationExceptionField {
  name: string;
  message: string | redacted.Redacted<string>;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, message: SensitiveString }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type AcceptPrimaryEmailUpdateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Accepts the request that originated from StartPrimaryEmailUpdate to update the primary email address (also known as the root user email address) for the specified account.
 */
export const acceptPrimaryEmailUpdate: API.OperationMethod<
  AcceptPrimaryEmailUpdateRequest,
  AcceptPrimaryEmailUpdateResponse,
  AcceptPrimaryEmailUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptPrimaryEmailUpdateRequest,
  output: AcceptPrimaryEmailUpdateResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptPrimaryEmailUpdate",
}));

export type DeleteAlternateContactError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified alternate contact from an Amazon Web Services account.
 *
 * For complete details about how to use the alternate contact operations, see Update the alternate contacts for your Amazon Web Services account.
 *
 * Before you can update the alternate contact information for an Amazon Web Services account that is managed by Organizations, you must first enable integration between Amazon Web Services Account Management and Organizations. For more information, see Enable trusted access for Amazon Web Services Account Management.
 */
export const deleteAlternateContact: API.OperationMethod<
  DeleteAlternateContactRequest,
  DeleteAlternateContactResponse,
  DeleteAlternateContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAlternateContactRequest,
  output: DeleteAlternateContactResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAlternateContact",
}));

export type DisableRegionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Disables (opts-out) a particular Region for an account.
 *
 * The act of disabling a Region will remove all IAM access to any resources that reside in that Region.
 */
export const disableRegion: API.OperationMethod<
  DisableRegionRequest,
  DisableRegionResponse,
  DisableRegionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableRegionRequest,
  output: DisableRegionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableRegion",
}));

export type EnableRegionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Enables (opts-in) a particular Region for an account.
 */
export const enableRegion: API.OperationMethod<
  EnableRegionRequest,
  EnableRegionResponse,
  EnableRegionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableRegionRequest,
  output: EnableRegionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableRegion",
}));

export type GetAccountInformationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified account including its account name, account ID, account creation date and time, and account state. To use this API, an IAM user or role must have the `account:GetAccountInformation` IAM permission.
 */
export const getAccountInformation: API.OperationMethod<
  GetAccountInformationRequest,
  GetAccountInformationResponse,
  GetAccountInformationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountInformationRequest,
  output: GetAccountInformationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountInformation",
}));

export type GetAlternateContactError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified alternate contact attached to an Amazon Web Services account.
 *
 * For complete details about how to use the alternate contact operations, see Update the alternate contacts for your Amazon Web Services account.
 *
 * Before you can update the alternate contact information for an Amazon Web Services account that is managed by Organizations, you must first enable integration between Amazon Web Services Account Management and Organizations. For more information, see Enable trusted access for Amazon Web Services Account Management.
 */
export const getAlternateContact: API.OperationMethod<
  GetAlternateContactRequest,
  GetAlternateContactResponse,
  GetAlternateContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAlternateContactRequest,
  output: GetAlternateContactResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAlternateContact",
}));

export type GetContactInformationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the primary contact information of an Amazon Web Services account.
 *
 * For complete details about how to use the primary contact operations, see Update the primary contact for your Amazon Web Services account.
 */
export const getContactInformation: API.OperationMethod<
  GetContactInformationRequest,
  GetContactInformationResponse,
  GetContactInformationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetContactInformationRequest,
  output: GetContactInformationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContactInformation",
}));

export type GetGovCloudAccountInformationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the GovCloud account linked to the specified standard account (if it exists) including the GovCloud account ID and state. To use this API, an IAM user or role must have the `account:GetGovCloudAccountInformation` IAM permission.
 */
export const getGovCloudAccountInformation: API.OperationMethod<
  GetGovCloudAccountInformationRequest,
  GetGovCloudAccountInformationResponse,
  GetGovCloudAccountInformationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGovCloudAccountInformationRequest,
  output: GetGovCloudAccountInformationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGovCloudAccountInformation",
}));

export type GetPrimaryEmailError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the primary email address for the specified account.
 */
export const getPrimaryEmail: API.OperationMethod<
  GetPrimaryEmailRequest,
  GetPrimaryEmailResponse,
  GetPrimaryEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPrimaryEmailRequest,
  output: GetPrimaryEmailResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPrimaryEmail",
}));

export type GetRegionOptStatusError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the opt-in status of a particular Region.
 */
export const getRegionOptStatus: API.OperationMethod<
  GetRegionOptStatusRequest,
  GetRegionOptStatusResponse,
  GetRegionOptStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRegionOptStatusRequest,
  output: GetRegionOptStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegionOptStatus",
}));

export type ListRegionsError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the Regions for a given account and their respective opt-in statuses. Optionally, this list can be filtered by the `region-opt-status-contains` parameter.
 */
export const listRegions: API.PaginatedOperationMethod<
  ListRegionsRequest,
  ListRegionsResponse,
  ListRegionsError,
  Credentials | HttpClient.HttpClient,
  Region
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRegionsRequest,
  output: ListRegionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Regions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutAccountNameError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Updates the account name of the specified account. To use this API, IAM principals must have the `account:PutAccountName` IAM permission.
 */
export const putAccountName: API.OperationMethod<
  PutAccountNameRequest,
  PutAccountNameResponse,
  PutAccountNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAccountNameRequest,
  output: PutAccountNameResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountName",
}));

export type PutAlternateContactError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Modifies the specified alternate contact attached to an Amazon Web Services account.
 *
 * For complete details about how to use the alternate contact operations, see Update the alternate contacts for your Amazon Web Services account.
 *
 * Before you can update the alternate contact information for an Amazon Web Services account that is managed by Organizations, you must first enable integration between Amazon Web Services Account Management and Organizations. For more information, see Enable trusted access for Amazon Web Services Account Management.
 */
export const putAlternateContact: API.OperationMethod<
  PutAlternateContactRequest,
  PutAlternateContactResponse,
  PutAlternateContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAlternateContactRequest,
  output: PutAlternateContactResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAlternateContact",
}));

export type PutContactInformationError =
  | AccessDeniedException
  | InternalServerException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Updates the primary contact information of an Amazon Web Services account.
 *
 * For complete details about how to use the primary contact operations, see Update the primary contact for your Amazon Web Services account.
 */
export const putContactInformation: API.OperationMethod<
  PutContactInformationRequest,
  PutContactInformationResponse,
  PutContactInformationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutContactInformationRequest,
  output: PutContactInformationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutContactInformation",
}));

export type StartPrimaryEmailUpdateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | ValidationException
  | CommonErrors;
/**
 * Starts the process to update the primary email address for the specified account.
 */
export const startPrimaryEmailUpdate: API.OperationMethod<
  StartPrimaryEmailUpdateRequest,
  StartPrimaryEmailUpdateResponse,
  StartPrimaryEmailUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartPrimaryEmailUpdateRequest,
  output: StartPrimaryEmailUpdateResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartPrimaryEmailUpdate",
}));
