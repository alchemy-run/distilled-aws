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
const ns = T.XmlNamespace("http://organizations.amazonaws.com/doc/2016-11-28/");
const svc = T.AwsApiService({
  sdkId: "Organizations",
  serviceShapeName: "AWSOrganizationsV20161128",
});
const auth = T.AwsAuthSigv4({ name: "organizations" });
const ver = T.ServiceVersion("2016-11-28");
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
  const _p0 = () => ({
    authSchemes: [
      {
        name: "sigv4",
        signingName: "organizations",
        signingRegion: "us-east-1",
      },
    ],
  });
  const _p1 = () => ({
    authSchemes: [
      {
        name: "sigv4",
        signingName: "organizations",
        signingRegion: "us-gov-west-1",
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
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e("https://organizations.us-east-1.amazonaws.com", _p0(), {});
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === true &&
          UseDualStack === false
        ) {
          return e(
            "https://organizations-fips.us-east-1.amazonaws.com",
            _p0(),
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-cn" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            "https://organizations.cn-northwest-1.amazonaws.com.cn",
            {
              authSchemes: [
                {
                  name: "sigv4",
                  signingName: "organizations",
                  signingRegion: "cn-northwest-1",
                },
              ],
            },
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            "https://organizations.us-gov-west-1.amazonaws.com",
            _p1(),
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === true &&
          UseDualStack === false
        ) {
          return e(
            "https://organizations.us-gov-west-1.amazonaws.com",
            _p1(),
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            "https://organizations.us-iso-east-1.c2s.ic.gov",
            {
              authSchemes: [
                {
                  name: "sigv4",
                  signingName: "organizations",
                  signingRegion: "us-iso-east-1",
                },
              ],
            },
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            "https://organizations.us-isob-east-1.sc2s.sgov.gov",
            {
              authSchemes: [
                {
                  name: "sigv4",
                  signingName: "organizations",
                  signingRegion: "us-isob-east-1",
                },
              ],
            },
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso-f" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            "https://organizations.us-isof-south-1.csp.hci.ic.gov",
            {
              authSchemes: [
                {
                  name: "sigv4",
                  signingName: "organizations",
                  signingRegion: "us-isof-south-1",
                },
              ],
            },
            {},
          );
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://organizations-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://organizations-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://organizations.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://organizations.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class AccessDeniedForDependencyException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedForDependencyException>()(
    "AccessDeniedForDependencyException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => AccessDeniedForDependencyExceptionReason).annotate({
          identifier: "AccessDeniedForDependencyExceptionReason",
        }),
      ),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class AccountAlreadyClosedException
  extends /*@__PURE__*/ S.TaggedError<AccountAlreadyClosedException>()(
    "AccountAlreadyClosedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class AccountAlreadyRegisteredException
  extends /*@__PURE__*/ S.TaggedError<AccountAlreadyRegisteredException>()(
    "AccountAlreadyRegisteredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class AccountNotFoundException
  extends /*@__PURE__*/ S.TaggedError<AccountNotFoundException>()(
    "AccountNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class AccountNotRegisteredException
  extends /*@__PURE__*/ S.TaggedError<AccountNotRegisteredException>()(
    "AccountNotRegisteredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class AccountOwnerNotVerifiedException
  extends /*@__PURE__*/ S.TaggedError<AccountOwnerNotVerifiedException>()(
    "AccountOwnerNotVerifiedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class AlreadyInOrganizationException
  extends /*@__PURE__*/ S.TaggedError<AlreadyInOrganizationException>()(
    "AlreadyInOrganizationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class AWSOrganizationsNotInUseException
  extends /*@__PURE__*/ S.TaggedError<AWSOrganizationsNotInUseException>()(
    "AWSOrganizationsNotInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ChildNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ChildNotFoundException>()(
    "ChildNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ConstraintViolationException
  extends /*@__PURE__*/ S.TaggedError<ConstraintViolationException>()(
    "ConstraintViolationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => ConstraintViolationExceptionReason).annotate({
          identifier: "ConstraintViolationExceptionReason",
        }),
      ),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class CreateAccountStatusNotFoundException
  extends /*@__PURE__*/ S.TaggedError<CreateAccountStatusNotFoundException>()(
    "CreateAccountStatusNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class DestinationParentNotFoundException
  extends /*@__PURE__*/ S.TaggedError<DestinationParentNotFoundException>()(
    "DestinationParentNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class DuplicateAccountException
  extends /*@__PURE__*/ S.TaggedError<DuplicateAccountException>()(
    "DuplicateAccountException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DuplicateHandshakeException
  extends /*@__PURE__*/ S.TaggedError<DuplicateHandshakeException>()(
    "DuplicateHandshakeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DuplicateOrganizationalUnitException
  extends /*@__PURE__*/ S.TaggedError<DuplicateOrganizationalUnitException>()(
    "DuplicateOrganizationalUnitException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DuplicatePolicyAttachmentException
  extends /*@__PURE__*/ S.TaggedError<DuplicatePolicyAttachmentException>()(
    "DuplicatePolicyAttachmentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DuplicatePolicyException
  extends /*@__PURE__*/ S.TaggedError<DuplicatePolicyException>()(
    "DuplicatePolicyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class EffectivePolicyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<EffectivePolicyNotFoundException>()(
    "EffectivePolicyNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class FinalizingOrganizationException
  extends /*@__PURE__*/ S.TaggedError<FinalizingOrganizationException>()(
    "FinalizingOrganizationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class HandshakeAlreadyInStateException
  extends /*@__PURE__*/ S.TaggedError<HandshakeAlreadyInStateException>()(
    "HandshakeAlreadyInStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class HandshakeConstraintViolationException
  extends /*@__PURE__*/ S.TaggedError<HandshakeConstraintViolationException>()(
    "HandshakeConstraintViolationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => HandshakeConstraintViolationExceptionReason).annotate({
          identifier: "HandshakeConstraintViolationExceptionReason",
        }),
      ),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class HandshakeNotFoundException
  extends /*@__PURE__*/ S.TaggedError<HandshakeNotFoundException>()(
    "HandshakeNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class InvalidHandshakeTransitionException
  extends /*@__PURE__*/ S.TaggedError<InvalidHandshakeTransitionException>()(
    "InvalidHandshakeTransitionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => InvalidInputExceptionReason).annotate({
          identifier: "InvalidInputExceptionReason",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidResponsibilityTransferTransitionException
  extends /*@__PURE__*/ S.TaggedError<InvalidResponsibilityTransferTransitionException>()(
    "InvalidResponsibilityTransferTransitionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class MalformedPolicyDocumentException
  extends /*@__PURE__*/ S.TaggedError<MalformedPolicyDocumentException>()(
    "MalformedPolicyDocumentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MasterCannotLeaveOrganizationException
  extends /*@__PURE__*/ S.TaggedError<MasterCannotLeaveOrganizationException>()(
    "MasterCannotLeaveOrganizationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class OrganizationalUnitNotEmptyException
  extends /*@__PURE__*/ S.TaggedError<OrganizationalUnitNotEmptyException>()(
    "OrganizationalUnitNotEmptyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class OrganizationalUnitNotFoundException
  extends /*@__PURE__*/ S.TaggedError<OrganizationalUnitNotFoundException>()(
    "OrganizationalUnitNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class OrganizationNotEmptyException
  extends /*@__PURE__*/ S.TaggedError<OrganizationNotEmptyException>()(
    "OrganizationNotEmptyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ParentNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ParentNotFoundException>()(
    "ParentNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class PolicyChangesInProgressException
  extends /*@__PURE__*/ S.TaggedError<PolicyChangesInProgressException>()(
    "PolicyChangesInProgressException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class PolicyInUseException
  extends /*@__PURE__*/ S.TaggedError<PolicyInUseException>()(
    "PolicyInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class PolicyNotAttachedException
  extends /*@__PURE__*/ S.TaggedError<PolicyNotAttachedException>()(
    "PolicyNotAttachedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class PolicyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<PolicyNotFoundException>()(
    "PolicyNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class PolicyTypeAlreadyEnabledException
  extends /*@__PURE__*/ S.TaggedError<PolicyTypeAlreadyEnabledException>()(
    "PolicyTypeAlreadyEnabledException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class PolicyTypeNotAvailableForOrganizationException
  extends /*@__PURE__*/ S.TaggedError<PolicyTypeNotAvailableForOrganizationException>()(
    "PolicyTypeNotAvailableForOrganizationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class PolicyTypeNotEnabledException
  extends /*@__PURE__*/ S.TaggedError<PolicyTypeNotEnabledException>()(
    "PolicyTypeNotEnabledException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourcePolicyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourcePolicyNotFoundException>()(
    "ResourcePolicyNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResponsibilityTransferAlreadyInStatusException
  extends /*@__PURE__*/ S.TaggedError<ResponsibilityTransferAlreadyInStatusException>()(
    "ResponsibilityTransferAlreadyInStatusException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResponsibilityTransferNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResponsibilityTransferNotFoundException>()(
    "ResponsibilityTransferNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class RootNotFoundException
  extends /*@__PURE__*/ S.TaggedError<RootNotFoundException>()(
    "RootNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceException
  extends /*@__PURE__*/ S.TaggedError<ServiceException>()(
    "ServiceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class SourceParentNotFoundException
  extends /*@__PURE__*/ S.TaggedError<SourceParentNotFoundException>()(
    "SourceParentNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TargetNotFoundException
  extends /*@__PURE__*/ S.TaggedError<TargetNotFoundException>()(
    "TargetNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      Type: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnsupportedAPIEndpointException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedAPIEndpointException>()(
    "UnsupportedAPIEndpointException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export type HandshakeId = string;
export interface AcceptHandshakeRequest {
  HandshakeId: string;
}
export const AcceptHandshakeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HandshakeId: S.String }).pipe(
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
  identifier: "AcceptHandshakeRequest",
}) as any as S.Schema<AcceptHandshakeRequest>;
export type HandshakeArn = string;
export type HandshakePartyId = string | redacted.Redacted<string>;
export type HandshakePartyType =
  | "ACCOUNT"
  | "ORGANIZATION"
  | "EMAIL"
  | (string & {});
export const HandshakePartyType = S.String;

export interface HandshakeParty {
  Id: string | redacted.Redacted<string>;
  Type: HandshakePartyType;
}
export const HandshakeParty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: SensitiveString, Type: HandshakePartyType }),
).annotate({ identifier: "HandshakeParty" }) as any as S.Schema<HandshakeParty>;
export type HandshakeParties = HandshakeParty[];
export const HandshakeParties = /*@__PURE__*/ S.Array(HandshakeParty);
export type HandshakeState =
  | "REQUESTED"
  | "OPEN"
  | "CANCELED"
  | "ACCEPTED"
  | "DECLINED"
  | "EXPIRED"
  | (string & {});
export const HandshakeState = S.String;

export type ActionType =
  | "INVITE"
  | "ENABLE_ALL_FEATURES"
  | "APPROVE_ALL_FEATURES"
  | "ADD_ORGANIZATIONS_SERVICE_LINKED_ROLE"
  | "TRANSFER_RESPONSIBILITY"
  | (string & {});
export const ActionType = S.String;

export type HandshakeResourceValue = string | redacted.Redacted<string>;
export type HandshakeResourceType =
  | "ACCOUNT"
  | "ORGANIZATION"
  | "ORGANIZATION_FEATURE_SET"
  | "EMAIL"
  | "MASTER_EMAIL"
  | "MASTER_NAME"
  | "NOTES"
  | "PARENT_HANDSHAKE"
  | "RESPONSIBILITY_TRANSFER"
  | "TRANSFER_START_TIMESTAMP"
  | "TRANSFER_TYPE"
  | "MANAGEMENT_ACCOUNT"
  | "MANAGEMENT_EMAIL"
  | "MANAGEMENT_NAME"
  | (string & {});
export const HandshakeResourceType = S.String;

export interface HandshakeResource {
  Value?: string | redacted.Redacted<string>;
  Type?: HandshakeResourceType;
  Resources?: HandshakeResource[];
}
export const HandshakeResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.optional(SensitiveString),
    Type: S.optional(HandshakeResourceType),
    Resources: S.optional(
      S.suspend(() => HandshakeResources).annotate({
        identifier: "HandshakeResources",
      }),
    ),
  }),
).annotate({
  identifier: "HandshakeResource",
}) as any as S.Schema<HandshakeResource>;
export type HandshakeResources = HandshakeResource[];
export const HandshakeResources = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<HandshakeResource> => HandshakeResource).annotate({
    identifier: "HandshakeResource",
  }),
) as any as S.Schema<HandshakeResources>;
export interface Handshake {
  Id?: string;
  Arn?: string;
  Parties?: HandshakeParty[];
  State?: HandshakeState;
  RequestedTimestamp?: Date;
  ExpirationTimestamp?: Date;
  Action?: ActionType;
  Resources?: HandshakeResource[];
}
export const Handshake = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    Parties: S.optional(HandshakeParties),
    State: S.optional(HandshakeState),
    RequestedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ExpirationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Action: S.optional(ActionType),
    Resources: S.optional(HandshakeResources),
  }),
).annotate({ identifier: "Handshake" }) as any as S.Schema<Handshake>;
export interface AcceptHandshakeResponse {
  Handshake?: Handshake;
}
export const AcceptHandshakeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Handshake: S.optional(Handshake) }).pipe(ns),
).annotate({
  identifier: "AcceptHandshakeResponse",
}) as any as S.Schema<AcceptHandshakeResponse>;
export type PolicyId = string;
export type PolicyTargetId = string;
export interface AttachPolicyRequest {
  PolicyId: string;
  TargetId: string;
}
export const AttachPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PolicyId: S.String, TargetId: S.String }).pipe(
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
  identifier: "AttachPolicyRequest",
}) as any as S.Schema<AttachPolicyRequest>;
export interface AttachPolicyResponse {}
export const AttachPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AttachPolicyResponse",
}) as any as S.Schema<AttachPolicyResponse>;
export interface CancelHandshakeRequest {
  HandshakeId: string;
}
export const CancelHandshakeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HandshakeId: S.String }).pipe(
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
  identifier: "CancelHandshakeRequest",
}) as any as S.Schema<CancelHandshakeRequest>;
export interface CancelHandshakeResponse {
  Handshake?: Handshake;
}
export const CancelHandshakeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Handshake: S.optional(Handshake) }).pipe(ns),
).annotate({
  identifier: "CancelHandshakeResponse",
}) as any as S.Schema<CancelHandshakeResponse>;
export type AccountId = string;
export interface CloseAccountRequest {
  AccountId: string;
}
export const CloseAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountId: S.String }).pipe(
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
  identifier: "CloseAccountRequest",
}) as any as S.Schema<CloseAccountRequest>;
export interface CloseAccountResponse {}
export const CloseAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CloseAccountResponse",
}) as any as S.Schema<CloseAccountResponse>;
export type Email = string | redacted.Redacted<string>;
export type CreateAccountName = string | redacted.Redacted<string>;
export type RoleName = string;
export type IAMUserAccessToBilling = "ALLOW" | "DENY" | (string & {});
export const IAMUserAccessToBilling = S.String;

export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type Tags = Tag[];
export const Tags = /*@__PURE__*/ S.Array(Tag);
export interface CreateAccountRequest {
  Email: string | redacted.Redacted<string>;
  AccountName: string | redacted.Redacted<string>;
  RoleName?: string;
  IamUserAccessToBilling?: IAMUserAccessToBilling;
  Tags?: Tag[];
}
export const CreateAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Email: SensitiveString,
    AccountName: SensitiveString,
    RoleName: S.optional(S.String),
    IamUserAccessToBilling: S.optional(IAMUserAccessToBilling),
    Tags: S.optional(Tags),
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
  identifier: "CreateAccountRequest",
}) as any as S.Schema<CreateAccountRequest>;
export type CreateAccountRequestId = string;
export type CreateAccountState =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export const CreateAccountState = S.String;

export type CreateAccountFailureReason =
  | "ACCOUNT_LIMIT_EXCEEDED"
  | "EMAIL_ALREADY_EXISTS"
  | "INVALID_ADDRESS"
  | "INVALID_EMAIL"
  | "CONCURRENT_ACCOUNT_MODIFICATION"
  | "INTERNAL_FAILURE"
  | "GOVCLOUD_ACCOUNT_ALREADY_EXISTS"
  | "MISSING_BUSINESS_VALIDATION"
  | "FAILED_BUSINESS_VALIDATION"
  | "PENDING_BUSINESS_VALIDATION"
  | "INVALID_IDENTITY_FOR_BUSINESS_VALIDATION"
  | "UNKNOWN_BUSINESS_VALIDATION"
  | "MISSING_PAYMENT_INSTRUMENT"
  | "INVALID_PAYMENT_INSTRUMENT"
  | "UPDATE_EXISTING_RESOURCE_POLICY_WITH_TAGS_NOT_SUPPORTED"
  | (string & {});
export const CreateAccountFailureReason = S.String;

export interface CreateAccountStatus {
  Id?: string;
  AccountName?: string | redacted.Redacted<string>;
  State?: CreateAccountState;
  RequestedTimestamp?: Date;
  CompletedTimestamp?: Date;
  AccountId?: string;
  GovCloudAccountId?: string;
  FailureReason?: CreateAccountFailureReason;
}
export const CreateAccountStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    AccountName: S.optional(SensitiveString),
    State: S.optional(CreateAccountState),
    RequestedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CompletedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AccountId: S.optional(S.String),
    GovCloudAccountId: S.optional(S.String),
    FailureReason: S.optional(CreateAccountFailureReason),
  }),
).annotate({
  identifier: "CreateAccountStatus",
}) as any as S.Schema<CreateAccountStatus>;
export interface CreateAccountResponse {
  CreateAccountStatus?: CreateAccountStatus;
}
export const CreateAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CreateAccountStatus: S.optional(CreateAccountStatus) }).pipe(ns),
).annotate({
  identifier: "CreateAccountResponse",
}) as any as S.Schema<CreateAccountResponse>;
export interface CreateGovCloudAccountRequest {
  Email: string | redacted.Redacted<string>;
  AccountName: string | redacted.Redacted<string>;
  RoleName?: string;
  IamUserAccessToBilling?: IAMUserAccessToBilling;
  Tags?: Tag[];
}
export const CreateGovCloudAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Email: SensitiveString,
    AccountName: SensitiveString,
    RoleName: S.optional(S.String),
    IamUserAccessToBilling: S.optional(IAMUserAccessToBilling),
    Tags: S.optional(Tags),
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
  identifier: "CreateGovCloudAccountRequest",
}) as any as S.Schema<CreateGovCloudAccountRequest>;
export interface CreateGovCloudAccountResponse {
  CreateAccountStatus?: CreateAccountStatus;
}
export const CreateGovCloudAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CreateAccountStatus: S.optional(CreateAccountStatus) }).pipe(ns),
).annotate({
  identifier: "CreateGovCloudAccountResponse",
}) as any as S.Schema<CreateGovCloudAccountResponse>;
export type OrganizationFeatureSet =
  | "ALL"
  | "CONSOLIDATED_BILLING"
  | (string & {});
export const OrganizationFeatureSet = S.String;

export interface CreateOrganizationRequest {
  FeatureSet?: OrganizationFeatureSet;
}
export const CreateOrganizationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FeatureSet: S.optional(OrganizationFeatureSet) }).pipe(
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
  identifier: "CreateOrganizationRequest",
}) as any as S.Schema<CreateOrganizationRequest>;
export type OrganizationId = string;
export type OrganizationArn = string;
export type AccountArn = string;
export type PolicyType =
  | "SERVICE_CONTROL_POLICY"
  | "RESOURCE_CONTROL_POLICY"
  | "TAG_POLICY"
  | "BACKUP_POLICY"
  | "AISERVICES_OPT_OUT_POLICY"
  | "CHATBOT_POLICY"
  | "DECLARATIVE_POLICY_EC2"
  | "SECURITYHUB_POLICY"
  | "INSPECTOR_POLICY"
  | "UPGRADE_ROLLOUT_POLICY"
  | "BEDROCK_POLICY"
  | "S3_POLICY"
  | "NETWORK_SECURITY_DIRECTOR_POLICY"
  | (string & {});
export const PolicyType = S.String;

export type PolicyTypeStatus =
  | "ENABLED"
  | "PENDING_ENABLE"
  | "PENDING_DISABLE"
  | (string & {});
export const PolicyTypeStatus = S.String;

export interface PolicyTypeSummary {
  Type?: PolicyType;
  Status?: PolicyTypeStatus;
}
export const PolicyTypeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(PolicyType),
    Status: S.optional(PolicyTypeStatus),
  }),
).annotate({
  identifier: "PolicyTypeSummary",
}) as any as S.Schema<PolicyTypeSummary>;
export type PolicyTypes = PolicyTypeSummary[];
export const PolicyTypes = /*@__PURE__*/ S.Array(PolicyTypeSummary);
export interface Organization {
  Id?: string;
  Arn?: string;
  FeatureSet?: OrganizationFeatureSet;
  MasterAccountArn?: string;
  MasterAccountId?: string;
  MasterAccountEmail?: string | redacted.Redacted<string>;
  AvailablePolicyTypes?: PolicyTypeSummary[];
}
export const Organization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    FeatureSet: S.optional(OrganizationFeatureSet),
    MasterAccountArn: S.optional(S.String),
    MasterAccountId: S.optional(S.String),
    MasterAccountEmail: S.optional(SensitiveString),
    AvailablePolicyTypes: S.optional(PolicyTypes),
  }),
).annotate({ identifier: "Organization" }) as any as S.Schema<Organization>;
export interface CreateOrganizationResponse {
  Organization?: Organization;
}
export const CreateOrganizationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Organization: S.optional(Organization) }).pipe(ns),
).annotate({
  identifier: "CreateOrganizationResponse",
}) as any as S.Schema<CreateOrganizationResponse>;
export type ParentId = string;
export type OrganizationalUnitName = string;
export interface CreateOrganizationalUnitRequest {
  ParentId: string;
  Name: string;
  Tags?: Tag[];
}
export const CreateOrganizationalUnitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ParentId: S.String, Name: S.String, Tags: S.optional(Tags) }).pipe(
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
  identifier: "CreateOrganizationalUnitRequest",
}) as any as S.Schema<CreateOrganizationalUnitRequest>;
export type OrganizationalUnitId = string;
export type OrganizationalUnitArn = string;
export type Path = string;
export interface OrganizationalUnit {
  Id?: string;
  Arn?: string;
  Name?: string;
  Path?: string;
}
export const OrganizationalUnit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    Path: S.optional(S.String),
  }),
).annotate({
  identifier: "OrganizationalUnit",
}) as any as S.Schema<OrganizationalUnit>;
export interface CreateOrganizationalUnitResponse {
  OrganizationalUnit?: OrganizationalUnit;
}
export const CreateOrganizationalUnitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationalUnit: S.optional(OrganizationalUnit) }).pipe(ns),
).annotate({
  identifier: "CreateOrganizationalUnitResponse",
}) as any as S.Schema<CreateOrganizationalUnitResponse>;
export type PolicyContent = string;
export type PolicyDescription = string;
export type PolicyName = string;
export interface CreatePolicyRequest {
  Content: string;
  Description: string;
  Name: string;
  Type: PolicyType;
  Tags?: Tag[];
}
export const CreatePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Content: S.String,
    Description: S.String,
    Name: S.String,
    Type: PolicyType,
    Tags: S.optional(Tags),
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
  identifier: "CreatePolicyRequest",
}) as any as S.Schema<CreatePolicyRequest>;
export type PolicyArn = string;
export type AwsManagedPolicy = boolean;
export interface PolicySummary {
  Id?: string;
  Arn?: string;
  Name?: string;
  Description?: string;
  Type?: PolicyType;
  AwsManaged?: boolean;
}
export const PolicySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Type: S.optional(PolicyType),
    AwsManaged: S.optional(S.Boolean),
  }),
).annotate({ identifier: "PolicySummary" }) as any as S.Schema<PolicySummary>;
export interface Policy {
  PolicySummary?: PolicySummary;
  Content?: string;
}
export const Policy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicySummary: S.optional(PolicySummary),
    Content: S.optional(S.String),
  }),
).annotate({ identifier: "Policy" }) as any as S.Schema<Policy>;
export interface CreatePolicyResponse {
  Policy?: Policy;
}
export const CreatePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(Policy) }).pipe(ns),
).annotate({
  identifier: "CreatePolicyResponse",
}) as any as S.Schema<CreatePolicyResponse>;
export interface DeclineHandshakeRequest {
  HandshakeId: string;
}
export const DeclineHandshakeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HandshakeId: S.String }).pipe(
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
  identifier: "DeclineHandshakeRequest",
}) as any as S.Schema<DeclineHandshakeRequest>;
export interface DeclineHandshakeResponse {
  Handshake?: Handshake;
}
export const DeclineHandshakeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Handshake: S.optional(Handshake) }).pipe(ns),
).annotate({
  identifier: "DeclineHandshakeResponse",
}) as any as S.Schema<DeclineHandshakeResponse>;
export interface DeleteOrganizationRequest {}
export const DeleteOrganizationRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "DeleteOrganizationRequest",
}) as any as S.Schema<DeleteOrganizationRequest>;
export interface DeleteOrganizationResponse {}
export const DeleteOrganizationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteOrganizationResponse",
}) as any as S.Schema<DeleteOrganizationResponse>;
export interface DeleteOrganizationalUnitRequest {
  OrganizationalUnitId: string;
}
export const DeleteOrganizationalUnitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationalUnitId: S.String }).pipe(
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
  identifier: "DeleteOrganizationalUnitRequest",
}) as any as S.Schema<DeleteOrganizationalUnitRequest>;
export interface DeleteOrganizationalUnitResponse {}
export const DeleteOrganizationalUnitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteOrganizationalUnitResponse",
}) as any as S.Schema<DeleteOrganizationalUnitResponse>;
export interface DeletePolicyRequest {
  PolicyId: string;
}
export const DeletePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PolicyId: S.String }).pipe(
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
  identifier: "DeletePolicyRequest",
}) as any as S.Schema<DeletePolicyRequest>;
export interface DeletePolicyResponse {}
export const DeletePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeletePolicyResponse",
}) as any as S.Schema<DeletePolicyResponse>;
export interface DeleteResourcePolicyRequest {}
export const DeleteResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "DeleteResourcePolicyRequest",
}) as any as S.Schema<DeleteResourcePolicyRequest>;
export interface DeleteResourcePolicyResponse {}
export const DeleteResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteResourcePolicyResponse",
}) as any as S.Schema<DeleteResourcePolicyResponse>;
export type ServicePrincipal = string;
export interface DeregisterDelegatedAdministratorRequest {
  AccountId: string;
  ServicePrincipal: string;
}
export const DeregisterDelegatedAdministratorRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ AccountId: S.String, ServicePrincipal: S.String }).pipe(
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
  identifier: "DeregisterDelegatedAdministratorRequest",
}) as any as S.Schema<DeregisterDelegatedAdministratorRequest>;
export interface DeregisterDelegatedAdministratorResponse {}
export const DeregisterDelegatedAdministratorResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeregisterDelegatedAdministratorResponse",
}) as any as S.Schema<DeregisterDelegatedAdministratorResponse>;
export interface DescribeAccountRequest {
  AccountId: string;
}
export const DescribeAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountId: S.String }).pipe(
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
  identifier: "DescribeAccountRequest",
}) as any as S.Schema<DescribeAccountRequest>;
export type AccountName = string | redacted.Redacted<string>;
export type AccountStatus =
  | "ACTIVE"
  | "SUSPENDED"
  | "PENDING_CLOSURE"
  | (string & {});
export const AccountStatus = S.String;

export type AccountState =
  | "PENDING_ACTIVATION"
  | "ACTIVE"
  | "SUSPENDED"
  | "PENDING_CLOSURE"
  | "CLOSED"
  | (string & {});
export const AccountState = S.String;

export type Paths = string[];
export const Paths = /*@__PURE__*/ S.Array(S.String);
export type AccountJoinedMethod = "INVITED" | "CREATED" | (string & {});
export const AccountJoinedMethod = S.String;

export interface Account {
  Id?: string;
  Arn?: string;
  Email?: string | redacted.Redacted<string>;
  Name?: string | redacted.Redacted<string>;
  Status?: AccountStatus;
  State?: AccountState;
  Paths?: string[];
  JoinedMethod?: AccountJoinedMethod;
  JoinedTimestamp?: Date;
}
export const Account = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    Email: S.optional(SensitiveString),
    Name: S.optional(SensitiveString),
    Status: S.optional(AccountStatus),
    State: S.optional(AccountState),
    Paths: S.optional(Paths),
    JoinedMethod: S.optional(AccountJoinedMethod),
    JoinedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "Account" }) as any as S.Schema<Account>;
export interface DescribeAccountResponse {
  Account?: Account;
}
export const DescribeAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Account: S.optional(Account) }).pipe(ns),
).annotate({
  identifier: "DescribeAccountResponse",
}) as any as S.Schema<DescribeAccountResponse>;
export interface DescribeCreateAccountStatusRequest {
  CreateAccountRequestId: string;
}
export const DescribeCreateAccountStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CreateAccountRequestId: S.String }).pipe(
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
  identifier: "DescribeCreateAccountStatusRequest",
}) as any as S.Schema<DescribeCreateAccountStatusRequest>;
export interface DescribeCreateAccountStatusResponse {
  CreateAccountStatus?: CreateAccountStatus;
}
export const DescribeCreateAccountStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CreateAccountStatus: S.optional(CreateAccountStatus) }).pipe(ns),
).annotate({
  identifier: "DescribeCreateAccountStatusResponse",
}) as any as S.Schema<DescribeCreateAccountStatusResponse>;
export type EffectivePolicyType =
  | "TAG_POLICY"
  | "BACKUP_POLICY"
  | "AISERVICES_OPT_OUT_POLICY"
  | "CHATBOT_POLICY"
  | "DECLARATIVE_POLICY_EC2"
  | "SECURITYHUB_POLICY"
  | "INSPECTOR_POLICY"
  | "UPGRADE_ROLLOUT_POLICY"
  | "BEDROCK_POLICY"
  | "S3_POLICY"
  | "NETWORK_SECURITY_DIRECTOR_POLICY"
  | (string & {});
export const EffectivePolicyType = S.String;

export interface DescribeEffectivePolicyRequest {
  PolicyType: EffectivePolicyType;
  TargetId?: string;
}
export const DescribeEffectivePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyType: EffectivePolicyType,
    TargetId: S.optional(S.String),
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
  identifier: "DescribeEffectivePolicyRequest",
}) as any as S.Schema<DescribeEffectivePolicyRequest>;
export interface EffectivePolicy {
  PolicyContent?: string;
  LastUpdatedTimestamp?: Date;
  TargetId?: string;
  PolicyType?: EffectivePolicyType;
}
export const EffectivePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyContent: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TargetId: S.optional(S.String),
    PolicyType: S.optional(EffectivePolicyType),
  }),
).annotate({
  identifier: "EffectivePolicy",
}) as any as S.Schema<EffectivePolicy>;
export interface DescribeEffectivePolicyResponse {
  EffectivePolicy?: EffectivePolicy;
}
export const DescribeEffectivePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EffectivePolicy: S.optional(EffectivePolicy) }).pipe(ns),
).annotate({
  identifier: "DescribeEffectivePolicyResponse",
}) as any as S.Schema<DescribeEffectivePolicyResponse>;
export interface DescribeHandshakeRequest {
  HandshakeId: string;
}
export const DescribeHandshakeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HandshakeId: S.String }).pipe(
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
  identifier: "DescribeHandshakeRequest",
}) as any as S.Schema<DescribeHandshakeRequest>;
export interface DescribeHandshakeResponse {
  Handshake?: Handshake;
}
export const DescribeHandshakeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Handshake: S.optional(Handshake) }).pipe(ns),
).annotate({
  identifier: "DescribeHandshakeResponse",
}) as any as S.Schema<DescribeHandshakeResponse>;
export interface DescribeOrganizationRequest {}
export const DescribeOrganizationRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "DescribeOrganizationRequest",
}) as any as S.Schema<DescribeOrganizationRequest>;
export interface DescribeOrganizationResponse {
  Organization?: Organization;
}
export const DescribeOrganizationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Organization: S.optional(Organization) }).pipe(ns),
).annotate({
  identifier: "DescribeOrganizationResponse",
}) as any as S.Schema<DescribeOrganizationResponse>;
export interface DescribeOrganizationalUnitRequest {
  OrganizationalUnitId: string;
}
export const DescribeOrganizationalUnitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationalUnitId: S.String }).pipe(
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
  identifier: "DescribeOrganizationalUnitRequest",
}) as any as S.Schema<DescribeOrganizationalUnitRequest>;
export interface DescribeOrganizationalUnitResponse {
  OrganizationalUnit?: OrganizationalUnit;
}
export const DescribeOrganizationalUnitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationalUnit: S.optional(OrganizationalUnit) }).pipe(ns),
).annotate({
  identifier: "DescribeOrganizationalUnitResponse",
}) as any as S.Schema<DescribeOrganizationalUnitResponse>;
export interface DescribePolicyRequest {
  PolicyId: string;
}
export const DescribePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PolicyId: S.String }).pipe(
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
  identifier: "DescribePolicyRequest",
}) as any as S.Schema<DescribePolicyRequest>;
export interface DescribePolicyResponse {
  Policy?: Policy;
}
export const DescribePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(Policy) }).pipe(ns),
).annotate({
  identifier: "DescribePolicyResponse",
}) as any as S.Schema<DescribePolicyResponse>;
export interface DescribeResourcePolicyRequest {}
export const DescribeResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "DescribeResourcePolicyRequest",
}) as any as S.Schema<DescribeResourcePolicyRequest>;
export type ResourcePolicyId = string;
export type ResourcePolicyArn = string;
export interface ResourcePolicySummary {
  Id?: string;
  Arn?: string;
}
export const ResourcePolicySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String), Arn: S.optional(S.String) }),
).annotate({
  identifier: "ResourcePolicySummary",
}) as any as S.Schema<ResourcePolicySummary>;
export type ResourcePolicyContent = string;
export interface ResourcePolicy {
  ResourcePolicySummary?: ResourcePolicySummary;
  Content?: string;
}
export const ResourcePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourcePolicySummary: S.optional(ResourcePolicySummary),
    Content: S.optional(S.String),
  }),
).annotate({ identifier: "ResourcePolicy" }) as any as S.Schema<ResourcePolicy>;
export interface DescribeResourcePolicyResponse {
  ResourcePolicy?: ResourcePolicy;
}
export const DescribeResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourcePolicy: S.optional(ResourcePolicy) }).pipe(ns),
).annotate({
  identifier: "DescribeResourcePolicyResponse",
}) as any as S.Schema<DescribeResourcePolicyResponse>;
export type ResponsibilityTransferId = string;
export interface DescribeResponsibilityTransferRequest {
  Id: string;
}
export const DescribeResponsibilityTransferRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Id: S.String }).pipe(
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
  identifier: "DescribeResponsibilityTransferRequest",
}) as any as S.Schema<DescribeResponsibilityTransferRequest>;
export type ResponsibilityTransferArn = string;
export type ResponsibilityTransferName = string | redacted.Redacted<string>;
export type ResponsibilityTransferType = "BILLING" | (string & {});
export const ResponsibilityTransferType = S.String;

export type ResponsibilityTransferStatus =
  | "REQUESTED"
  | "DECLINED"
  | "CANCELED"
  | "EXPIRED"
  | "ACCEPTED"
  | "WITHDRAWN"
  | (string & {});
export const ResponsibilityTransferStatus = S.String;

export interface TransferParticipant {
  ManagementAccountId?: string;
  ManagementAccountEmail?: string | redacted.Redacted<string>;
}
export const TransferParticipant = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManagementAccountId: S.optional(S.String),
    ManagementAccountEmail: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "TransferParticipant",
}) as any as S.Schema<TransferParticipant>;
export interface ResponsibilityTransfer {
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  Id?: string;
  Type?: ResponsibilityTransferType;
  Status?: ResponsibilityTransferStatus;
  Source?: TransferParticipant;
  Target?: TransferParticipant;
  StartTimestamp?: Date;
  EndTimestamp?: Date;
  ActiveHandshakeId?: string;
}
export const ResponsibilityTransfer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(SensitiveString),
    Id: S.optional(S.String),
    Type: S.optional(ResponsibilityTransferType),
    Status: S.optional(ResponsibilityTransferStatus),
    Source: S.optional(TransferParticipant),
    Target: S.optional(TransferParticipant),
    StartTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ActiveHandshakeId: S.optional(S.String),
  }),
).annotate({
  identifier: "ResponsibilityTransfer",
}) as any as S.Schema<ResponsibilityTransfer>;
export interface DescribeResponsibilityTransferResponse {
  ResponsibilityTransfer?: ResponsibilityTransfer;
}
export const DescribeResponsibilityTransferResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ResponsibilityTransfer: S.optional(ResponsibilityTransfer),
    }).pipe(ns),
).annotate({
  identifier: "DescribeResponsibilityTransferResponse",
}) as any as S.Schema<DescribeResponsibilityTransferResponse>;
export interface DetachPolicyRequest {
  PolicyId: string;
  TargetId: string;
}
export const DetachPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PolicyId: S.String, TargetId: S.String }).pipe(
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
  identifier: "DetachPolicyRequest",
}) as any as S.Schema<DetachPolicyRequest>;
export interface DetachPolicyResponse {}
export const DetachPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DetachPolicyResponse",
}) as any as S.Schema<DetachPolicyResponse>;
export interface DisableAWSServiceAccessRequest {
  ServicePrincipal: string;
}
export const DisableAWSServiceAccessRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServicePrincipal: S.String }).pipe(
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
  identifier: "DisableAWSServiceAccessRequest",
}) as any as S.Schema<DisableAWSServiceAccessRequest>;
export interface DisableAWSServiceAccessResponse {}
export const DisableAWSServiceAccessResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DisableAWSServiceAccessResponse",
}) as any as S.Schema<DisableAWSServiceAccessResponse>;
export type RootId = string;
export interface DisablePolicyTypeRequest {
  RootId: string;
  PolicyType: PolicyType;
}
export const DisablePolicyTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RootId: S.String, PolicyType: PolicyType }).pipe(
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
  identifier: "DisablePolicyTypeRequest",
}) as any as S.Schema<DisablePolicyTypeRequest>;
export type RootArn = string;
export type RootName = string;
export interface Root {
  Id?: string;
  Arn?: string;
  Name?: string;
  PolicyTypes?: PolicyTypeSummary[];
}
export const Root = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    PolicyTypes: S.optional(PolicyTypes),
  }),
).annotate({ identifier: "Root" }) as any as S.Schema<Root>;
export interface DisablePolicyTypeResponse {
  Root?: Root;
}
export const DisablePolicyTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Root: S.optional(Root) }).pipe(ns),
).annotate({
  identifier: "DisablePolicyTypeResponse",
}) as any as S.Schema<DisablePolicyTypeResponse>;
export interface EnableAllFeaturesRequest {}
export const EnableAllFeaturesRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "EnableAllFeaturesRequest",
}) as any as S.Schema<EnableAllFeaturesRequest>;
export interface EnableAllFeaturesResponse {
  Handshake?: Handshake;
}
export const EnableAllFeaturesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Handshake: S.optional(Handshake) }).pipe(ns),
).annotate({
  identifier: "EnableAllFeaturesResponse",
}) as any as S.Schema<EnableAllFeaturesResponse>;
export interface EnableAWSServiceAccessRequest {
  ServicePrincipal: string;
}
export const EnableAWSServiceAccessRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServicePrincipal: S.String }).pipe(
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
  identifier: "EnableAWSServiceAccessRequest",
}) as any as S.Schema<EnableAWSServiceAccessRequest>;
export interface EnableAWSServiceAccessResponse {}
export const EnableAWSServiceAccessResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "EnableAWSServiceAccessResponse",
}) as any as S.Schema<EnableAWSServiceAccessResponse>;
export interface EnablePolicyTypeRequest {
  RootId: string;
  PolicyType: PolicyType;
}
export const EnablePolicyTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RootId: S.String, PolicyType: PolicyType }).pipe(
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
  identifier: "EnablePolicyTypeRequest",
}) as any as S.Schema<EnablePolicyTypeRequest>;
export interface EnablePolicyTypeResponse {
  Root?: Root;
}
export const EnablePolicyTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Root: S.optional(Root) }).pipe(ns),
).annotate({
  identifier: "EnablePolicyTypeResponse",
}) as any as S.Schema<EnablePolicyTypeResponse>;
export type HandshakeNotes = string | redacted.Redacted<string>;
export interface InviteAccountToOrganizationRequest {
  Target: HandshakeParty;
  Notes?: string | redacted.Redacted<string>;
  Tags?: Tag[];
}
export const InviteAccountToOrganizationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Target: HandshakeParty,
    Notes: S.optional(SensitiveString),
    Tags: S.optional(Tags),
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
  identifier: "InviteAccountToOrganizationRequest",
}) as any as S.Schema<InviteAccountToOrganizationRequest>;
export interface InviteAccountToOrganizationResponse {
  Handshake?: Handshake;
}
export const InviteAccountToOrganizationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Handshake: S.optional(Handshake) }).pipe(ns),
).annotate({
  identifier: "InviteAccountToOrganizationResponse",
}) as any as S.Schema<InviteAccountToOrganizationResponse>;
export interface InviteOrganizationToTransferResponsibilityRequest {
  Type: ResponsibilityTransferType;
  Target: HandshakeParty;
  Notes?: string | redacted.Redacted<string>;
  StartTimestamp: Date;
  SourceName: string | redacted.Redacted<string>;
  Tags?: Tag[];
}
export const InviteOrganizationToTransferResponsibilityRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Type: ResponsibilityTransferType,
      Target: HandshakeParty,
      Notes: S.optional(SensitiveString),
      StartTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      SourceName: SensitiveString,
      Tags: S.optional(Tags),
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
    identifier: "InviteOrganizationToTransferResponsibilityRequest",
  }) as any as S.Schema<InviteOrganizationToTransferResponsibilityRequest>;
export interface InviteOrganizationToTransferResponsibilityResponse {
  Handshake?: Handshake;
}
export const InviteOrganizationToTransferResponsibilityResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Handshake: S.optional(Handshake) }).pipe(ns),
  ).annotate({
    identifier: "InviteOrganizationToTransferResponsibilityResponse",
  }) as any as S.Schema<InviteOrganizationToTransferResponsibilityResponse>;
export interface LeaveOrganizationRequest {}
export const LeaveOrganizationRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "LeaveOrganizationRequest",
}) as any as S.Schema<LeaveOrganizationRequest>;
export interface LeaveOrganizationResponse {}
export const LeaveOrganizationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "LeaveOrganizationResponse",
}) as any as S.Schema<LeaveOrganizationResponse>;
export type NextToken = string;
export type MaxResults = number;
export interface ListAccountsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListAccountsRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "ListAccountsRequest",
}) as any as S.Schema<ListAccountsRequest>;
export type Accounts = Account[];
export const Accounts = /*@__PURE__*/ S.Array(Account);
export interface ListAccountsResponse {
  Accounts?: Account[];
  NextToken?: string;
}
export const ListAccountsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Accounts: S.optional(Accounts),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListAccountsResponse",
}) as any as S.Schema<ListAccountsResponse>;
export interface ListAccountsForParentRequest {
  ParentId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListAccountsForParentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParentId: S.String,
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
  identifier: "ListAccountsForParentRequest",
}) as any as S.Schema<ListAccountsForParentRequest>;
export interface ListAccountsForParentResponse {
  Accounts?: Account[];
  NextToken?: string;
}
export const ListAccountsForParentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Accounts: S.optional(Accounts),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListAccountsForParentResponse",
}) as any as S.Schema<ListAccountsForParentResponse>;
export interface ListAccountsWithInvalidEffectivePolicyRequest {
  PolicyType: EffectivePolicyType;
  NextToken?: string;
  MaxResults?: number;
}
export const ListAccountsWithInvalidEffectivePolicyRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      PolicyType: EffectivePolicyType,
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
    identifier: "ListAccountsWithInvalidEffectivePolicyRequest",
  }) as any as S.Schema<ListAccountsWithInvalidEffectivePolicyRequest>;
export interface ListAccountsWithInvalidEffectivePolicyResponse {
  Accounts?: Account[];
  PolicyType?: EffectivePolicyType;
  NextToken?: string;
}
export const ListAccountsWithInvalidEffectivePolicyResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Accounts: S.optional(Accounts),
      PolicyType: S.optional(EffectivePolicyType),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "ListAccountsWithInvalidEffectivePolicyResponse",
  }) as any as S.Schema<ListAccountsWithInvalidEffectivePolicyResponse>;
export interface ListAWSServiceAccessForOrganizationRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListAWSServiceAccessForOrganizationRequest =
  /*@__PURE__*/ S.suspend(() =>
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
    identifier: "ListAWSServiceAccessForOrganizationRequest",
  }) as any as S.Schema<ListAWSServiceAccessForOrganizationRequest>;
export interface EnabledServicePrincipal {
  ServicePrincipal?: string;
  DateEnabled?: Date;
}
export const EnabledServicePrincipal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServicePrincipal: S.optional(S.String),
    DateEnabled: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "EnabledServicePrincipal",
}) as any as S.Schema<EnabledServicePrincipal>;
export type EnabledServicePrincipals = EnabledServicePrincipal[];
export const EnabledServicePrincipals = /*@__PURE__*/ S.Array(
  EnabledServicePrincipal,
);
export interface ListAWSServiceAccessForOrganizationResponse {
  EnabledServicePrincipals?: EnabledServicePrincipal[];
  NextToken?: string;
}
export const ListAWSServiceAccessForOrganizationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EnabledServicePrincipals: S.optional(EnabledServicePrincipals),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "ListAWSServiceAccessForOrganizationResponse",
  }) as any as S.Schema<ListAWSServiceAccessForOrganizationResponse>;
export type ChildType = "ACCOUNT" | "ORGANIZATIONAL_UNIT" | (string & {});
export const ChildType = S.String;

export interface ListChildrenRequest {
  ParentId: string;
  ChildType: ChildType;
  NextToken?: string;
  MaxResults?: number;
}
export const ListChildrenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParentId: S.String,
    ChildType: ChildType,
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
  identifier: "ListChildrenRequest",
}) as any as S.Schema<ListChildrenRequest>;
export type ChildId = string;
export interface Child {
  Id?: string;
  Type?: ChildType;
}
export const Child = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String), Type: S.optional(ChildType) }),
).annotate({ identifier: "Child" }) as any as S.Schema<Child>;
export type Children = Child[];
export const Children = /*@__PURE__*/ S.Array(Child);
export interface ListChildrenResponse {
  Children?: Child[];
  NextToken?: string;
}
export const ListChildrenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Children: S.optional(Children),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListChildrenResponse",
}) as any as S.Schema<ListChildrenResponse>;
export type CreateAccountStates = CreateAccountState[];
export const CreateAccountStates = /*@__PURE__*/ S.Array(CreateAccountState);
export interface ListCreateAccountStatusRequest {
  States?: CreateAccountState[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListCreateAccountStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    States: S.optional(CreateAccountStates),
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
  identifier: "ListCreateAccountStatusRequest",
}) as any as S.Schema<ListCreateAccountStatusRequest>;
export type CreateAccountStatuses = CreateAccountStatus[];
export const CreateAccountStatuses = /*@__PURE__*/ S.Array(CreateAccountStatus);
export interface ListCreateAccountStatusResponse {
  CreateAccountStatuses?: CreateAccountStatus[];
  NextToken?: string;
}
export const ListCreateAccountStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreateAccountStatuses: S.optional(CreateAccountStatuses),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListCreateAccountStatusResponse",
}) as any as S.Schema<ListCreateAccountStatusResponse>;
export interface ListDelegatedAdministratorsRequest {
  ServicePrincipal?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListDelegatedAdministratorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServicePrincipal: S.optional(S.String),
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
  identifier: "ListDelegatedAdministratorsRequest",
}) as any as S.Schema<ListDelegatedAdministratorsRequest>;
export interface DelegatedAdministrator {
  Id?: string;
  Arn?: string;
  Email?: string | redacted.Redacted<string>;
  Name?: string | redacted.Redacted<string>;
  Status?: AccountStatus;
  State?: AccountState;
  JoinedMethod?: AccountJoinedMethod;
  JoinedTimestamp?: Date;
  DelegationEnabledDate?: Date;
}
export const DelegatedAdministrator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    Email: S.optional(SensitiveString),
    Name: S.optional(SensitiveString),
    Status: S.optional(AccountStatus),
    State: S.optional(AccountState),
    JoinedMethod: S.optional(AccountJoinedMethod),
    JoinedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    DelegationEnabledDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DelegatedAdministrator",
}) as any as S.Schema<DelegatedAdministrator>;
export type DelegatedAdministrators = DelegatedAdministrator[];
export const DelegatedAdministrators = /*@__PURE__*/ S.Array(
  DelegatedAdministrator,
);
export interface ListDelegatedAdministratorsResponse {
  DelegatedAdministrators?: DelegatedAdministrator[];
  NextToken?: string;
}
export const ListDelegatedAdministratorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DelegatedAdministrators: S.optional(DelegatedAdministrators),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDelegatedAdministratorsResponse",
}) as any as S.Schema<ListDelegatedAdministratorsResponse>;
export interface ListDelegatedServicesForAccountRequest {
  AccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListDelegatedServicesForAccountRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccountId: S.String,
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
  identifier: "ListDelegatedServicesForAccountRequest",
}) as any as S.Schema<ListDelegatedServicesForAccountRequest>;
export interface DelegatedService {
  ServicePrincipal?: string;
  DelegationEnabledDate?: Date;
}
export const DelegatedService = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServicePrincipal: S.optional(S.String),
    DelegationEnabledDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DelegatedService",
}) as any as S.Schema<DelegatedService>;
export type DelegatedServices = DelegatedService[];
export const DelegatedServices = /*@__PURE__*/ S.Array(DelegatedService);
export interface ListDelegatedServicesForAccountResponse {
  DelegatedServices?: DelegatedService[];
  NextToken?: string;
}
export const ListDelegatedServicesForAccountResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DelegatedServices: S.optional(DelegatedServices),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListDelegatedServicesForAccountResponse",
}) as any as S.Schema<ListDelegatedServicesForAccountResponse>;
export interface ListEffectivePolicyValidationErrorsRequest {
  AccountId: string;
  PolicyType: EffectivePolicyType;
  NextToken?: string;
  MaxResults?: number;
}
export const ListEffectivePolicyValidationErrorsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.String,
      PolicyType: EffectivePolicyType,
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
    identifier: "ListEffectivePolicyValidationErrorsRequest",
  }) as any as S.Schema<ListEffectivePolicyValidationErrorsRequest>;
export type ErrorCode = string;
export type ErrorMessage = string;
export type PathToError = string;
export type PolicyIds = string[];
export const PolicyIds = /*@__PURE__*/ S.Array(S.String);
export interface EffectivePolicyValidationError {
  ErrorCode?: string;
  ErrorMessage?: string;
  PathToError?: string;
  ContributingPolicies?: string[];
}
export const EffectivePolicyValidationError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
    PathToError: S.optional(S.String),
    ContributingPolicies: S.optional(PolicyIds),
  }),
).annotate({
  identifier: "EffectivePolicyValidationError",
}) as any as S.Schema<EffectivePolicyValidationError>;
export type EffectivePolicyValidationErrors = EffectivePolicyValidationError[];
export const EffectivePolicyValidationErrors = /*@__PURE__*/ S.Array(
  EffectivePolicyValidationError,
);
export interface ListEffectivePolicyValidationErrorsResponse {
  AccountId?: string;
  PolicyType?: EffectivePolicyType;
  Path?: string;
  EvaluationTimestamp?: Date;
  NextToken?: string;
  EffectivePolicyValidationErrors?: EffectivePolicyValidationError[];
}
export const ListEffectivePolicyValidationErrorsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.optional(S.String),
      PolicyType: S.optional(EffectivePolicyType),
      Path: S.optional(S.String),
      EvaluationTimestamp: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      NextToken: S.optional(S.String),
      EffectivePolicyValidationErrors: S.optional(
        EffectivePolicyValidationErrors,
      ),
    }).pipe(ns),
  ).annotate({
    identifier: "ListEffectivePolicyValidationErrorsResponse",
  }) as any as S.Schema<ListEffectivePolicyValidationErrorsResponse>;
export interface HandshakeFilter {
  ActionType?: ActionType;
  ParentHandshakeId?: string;
}
export const HandshakeFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionType: S.optional(ActionType),
    ParentHandshakeId: S.optional(S.String),
  }),
).annotate({
  identifier: "HandshakeFilter",
}) as any as S.Schema<HandshakeFilter>;
export interface ListHandshakesForAccountRequest {
  Filter?: HandshakeFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListHandshakesForAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filter: S.optional(HandshakeFilter),
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
  identifier: "ListHandshakesForAccountRequest",
}) as any as S.Schema<ListHandshakesForAccountRequest>;
export type Handshakes = Handshake[];
export const Handshakes = /*@__PURE__*/ S.Array(Handshake);
export interface ListHandshakesForAccountResponse {
  Handshakes?: Handshake[];
  NextToken?: string;
}
export const ListHandshakesForAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Handshakes: S.optional(Handshakes),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListHandshakesForAccountResponse",
}) as any as S.Schema<ListHandshakesForAccountResponse>;
export interface ListHandshakesForOrganizationRequest {
  Filter?: HandshakeFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListHandshakesForOrganizationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Filter: S.optional(HandshakeFilter),
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
  identifier: "ListHandshakesForOrganizationRequest",
}) as any as S.Schema<ListHandshakesForOrganizationRequest>;
export interface ListHandshakesForOrganizationResponse {
  Handshakes?: Handshake[];
  NextToken?: string;
}
export const ListHandshakesForOrganizationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Handshakes: S.optional(Handshakes),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListHandshakesForOrganizationResponse",
}) as any as S.Schema<ListHandshakesForOrganizationResponse>;
export interface ListInboundResponsibilityTransfersRequest {
  Type: ResponsibilityTransferType;
  Id?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListInboundResponsibilityTransfersRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Type: ResponsibilityTransferType,
      Id: S.optional(S.String),
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
    identifier: "ListInboundResponsibilityTransfersRequest",
  }) as any as S.Schema<ListInboundResponsibilityTransfersRequest>;
export type ResponsibilityTransfers = ResponsibilityTransfer[];
export const ResponsibilityTransfers = /*@__PURE__*/ S.Array(
  ResponsibilityTransfer,
);
export interface ListInboundResponsibilityTransfersResponse {
  ResponsibilityTransfers?: ResponsibilityTransfer[];
  NextToken?: string;
}
export const ListInboundResponsibilityTransfersResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ResponsibilityTransfers: S.optional(ResponsibilityTransfers),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "ListInboundResponsibilityTransfersResponse",
  }) as any as S.Schema<ListInboundResponsibilityTransfersResponse>;
export interface ListOrganizationalUnitsForParentRequest {
  ParentId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListOrganizationalUnitsForParentRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ParentId: S.String,
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
  identifier: "ListOrganizationalUnitsForParentRequest",
}) as any as S.Schema<ListOrganizationalUnitsForParentRequest>;
export type OrganizationalUnits = OrganizationalUnit[];
export const OrganizationalUnits = /*@__PURE__*/ S.Array(OrganizationalUnit);
export interface ListOrganizationalUnitsForParentResponse {
  OrganizationalUnits?: OrganizationalUnit[];
  NextToken?: string;
}
export const ListOrganizationalUnitsForParentResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      OrganizationalUnits: S.optional(OrganizationalUnits),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListOrganizationalUnitsForParentResponse",
}) as any as S.Schema<ListOrganizationalUnitsForParentResponse>;
export interface ListOutboundResponsibilityTransfersRequest {
  Type: ResponsibilityTransferType;
  NextToken?: string;
  MaxResults?: number;
}
export const ListOutboundResponsibilityTransfersRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Type: ResponsibilityTransferType,
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
    identifier: "ListOutboundResponsibilityTransfersRequest",
  }) as any as S.Schema<ListOutboundResponsibilityTransfersRequest>;
export interface ListOutboundResponsibilityTransfersResponse {
  ResponsibilityTransfers?: ResponsibilityTransfer[];
  NextToken?: string;
}
export const ListOutboundResponsibilityTransfersResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ResponsibilityTransfers: S.optional(ResponsibilityTransfers),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "ListOutboundResponsibilityTransfersResponse",
  }) as any as S.Schema<ListOutboundResponsibilityTransfersResponse>;
export interface ListParentsRequest {
  ChildId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListParentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChildId: S.String,
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
  identifier: "ListParentsRequest",
}) as any as S.Schema<ListParentsRequest>;
export type ParentType = "ROOT" | "ORGANIZATIONAL_UNIT" | (string & {});
export const ParentType = S.String;

export interface Parent {
  Id?: string;
  Type?: ParentType;
}
export const Parent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String), Type: S.optional(ParentType) }),
).annotate({ identifier: "Parent" }) as any as S.Schema<Parent>;
export type Parents = Parent[];
export const Parents = /*@__PURE__*/ S.Array(Parent);
export interface ListParentsResponse {
  Parents?: Parent[];
  NextToken?: string;
}
export const ListParentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Parents: S.optional(Parents),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListParentsResponse",
}) as any as S.Schema<ListParentsResponse>;
export interface ListPoliciesRequest {
  Filter: PolicyType;
  NextToken?: string;
  MaxResults?: number;
}
export const ListPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filter: PolicyType,
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
  identifier: "ListPoliciesRequest",
}) as any as S.Schema<ListPoliciesRequest>;
export type Policies = PolicySummary[];
export const Policies = /*@__PURE__*/ S.Array(PolicySummary);
export interface ListPoliciesResponse {
  Policies?: PolicySummary[];
  NextToken?: string;
}
export const ListPoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Policies: S.optional(Policies),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListPoliciesResponse",
}) as any as S.Schema<ListPoliciesResponse>;
export interface ListPoliciesForTargetRequest {
  TargetId: string;
  Filter: PolicyType;
  NextToken?: string;
  MaxResults?: number;
}
export const ListPoliciesForTargetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetId: S.String,
    Filter: PolicyType,
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
  identifier: "ListPoliciesForTargetRequest",
}) as any as S.Schema<ListPoliciesForTargetRequest>;
export interface ListPoliciesForTargetResponse {
  Policies?: PolicySummary[];
  NextToken?: string;
}
export const ListPoliciesForTargetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Policies: S.optional(Policies),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListPoliciesForTargetResponse",
}) as any as S.Schema<ListPoliciesForTargetResponse>;
export interface ListRootsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListRootsRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "ListRootsRequest",
}) as any as S.Schema<ListRootsRequest>;
export type Roots = Root[];
export const Roots = /*@__PURE__*/ S.Array(Root);
export interface ListRootsResponse {
  Roots?: Root[];
  NextToken?: string;
}
export const ListRootsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Roots: S.optional(Roots), NextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ListRootsResponse",
}) as any as S.Schema<ListRootsResponse>;
export type TaggableResourceId = string;
export interface ListTagsForResourceRequest {
  ResourceId: string;
  NextToken?: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceId: S.String, NextToken: S.optional(S.String) }).pipe(
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
  NextToken?: string;
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(Tags), NextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListTargetsForPolicyRequest {
  PolicyId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListTargetsForPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyId: S.String,
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
  identifier: "ListTargetsForPolicyRequest",
}) as any as S.Schema<ListTargetsForPolicyRequest>;
export type GenericArn = string;
export type TargetName = string;
export type TargetType =
  | "ACCOUNT"
  | "ORGANIZATIONAL_UNIT"
  | "ROOT"
  | (string & {});
export const TargetType = S.String;

export interface PolicyTargetSummary {
  TargetId?: string;
  Arn?: string;
  Name?: string;
  Type?: TargetType;
}
export const PolicyTargetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetId: S.optional(S.String),
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    Type: S.optional(TargetType),
  }),
).annotate({
  identifier: "PolicyTargetSummary",
}) as any as S.Schema<PolicyTargetSummary>;
export type PolicyTargets = PolicyTargetSummary[];
export const PolicyTargets = /*@__PURE__*/ S.Array(PolicyTargetSummary);
export interface ListTargetsForPolicyResponse {
  Targets?: PolicyTargetSummary[];
  NextToken?: string;
}
export const ListTargetsForPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Targets: S.optional(PolicyTargets),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListTargetsForPolicyResponse",
}) as any as S.Schema<ListTargetsForPolicyResponse>;
export interface MoveAccountRequest {
  AccountId: string;
  SourceParentId: string;
  DestinationParentId: string;
}
export const MoveAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String,
    SourceParentId: S.String,
    DestinationParentId: S.String,
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
  identifier: "MoveAccountRequest",
}) as any as S.Schema<MoveAccountRequest>;
export interface MoveAccountResponse {}
export const MoveAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "MoveAccountResponse",
}) as any as S.Schema<MoveAccountResponse>;
export interface PutResourcePolicyRequest {
  Content: string;
  Tags?: Tag[];
}
export const PutResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Content: S.String, Tags: S.optional(Tags) }).pipe(
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
  identifier: "PutResourcePolicyRequest",
}) as any as S.Schema<PutResourcePolicyRequest>;
export interface PutResourcePolicyResponse {
  ResourcePolicy?: ResourcePolicy;
}
export const PutResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourcePolicy: S.optional(ResourcePolicy) }).pipe(ns),
).annotate({
  identifier: "PutResourcePolicyResponse",
}) as any as S.Schema<PutResourcePolicyResponse>;
export interface RegisterDelegatedAdministratorRequest {
  AccountId: string;
  ServicePrincipal: string;
}
export const RegisterDelegatedAdministratorRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ AccountId: S.String, ServicePrincipal: S.String }).pipe(
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
  identifier: "RegisterDelegatedAdministratorRequest",
}) as any as S.Schema<RegisterDelegatedAdministratorRequest>;
export interface RegisterDelegatedAdministratorResponse {}
export const RegisterDelegatedAdministratorResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "RegisterDelegatedAdministratorResponse",
}) as any as S.Schema<RegisterDelegatedAdministratorResponse>;
export interface RemoveAccountFromOrganizationRequest {
  AccountId: string;
}
export const RemoveAccountFromOrganizationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ AccountId: S.String }).pipe(
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
  identifier: "RemoveAccountFromOrganizationRequest",
}) as any as S.Schema<RemoveAccountFromOrganizationRequest>;
export interface RemoveAccountFromOrganizationResponse {}
export const RemoveAccountFromOrganizationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "RemoveAccountFromOrganizationResponse",
}) as any as S.Schema<RemoveAccountFromOrganizationResponse>;
export interface TagResourceRequest {
  ResourceId: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceId: S.String, Tags: Tags }).pipe(
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
export interface TerminateResponsibilityTransferRequest {
  Id: string;
  EndTimestamp?: Date;
}
export const TerminateResponsibilityTransferRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Id: S.String,
      EndTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
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
  identifier: "TerminateResponsibilityTransferRequest",
}) as any as S.Schema<TerminateResponsibilityTransferRequest>;
export interface TerminateResponsibilityTransferResponse {
  ResponsibilityTransfer?: ResponsibilityTransfer;
}
export const TerminateResponsibilityTransferResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ResponsibilityTransfer: S.optional(ResponsibilityTransfer),
    }).pipe(ns),
).annotate({
  identifier: "TerminateResponsibilityTransferResponse",
}) as any as S.Schema<TerminateResponsibilityTransferResponse>;
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceId: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceId: S.String, TagKeys: TagKeys }).pipe(
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
export interface UpdateOrganizationalUnitRequest {
  OrganizationalUnitId: string;
  Name?: string;
}
export const UpdateOrganizationalUnitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationalUnitId: S.String, Name: S.optional(S.String) }).pipe(
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
  identifier: "UpdateOrganizationalUnitRequest",
}) as any as S.Schema<UpdateOrganizationalUnitRequest>;
export interface UpdateOrganizationalUnitResponse {
  OrganizationalUnit?: OrganizationalUnit;
}
export const UpdateOrganizationalUnitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationalUnit: S.optional(OrganizationalUnit) }).pipe(ns),
).annotate({
  identifier: "UpdateOrganizationalUnitResponse",
}) as any as S.Schema<UpdateOrganizationalUnitResponse>;
export interface UpdatePolicyRequest {
  PolicyId: string;
  Name?: string;
  Description?: string;
  Content?: string;
}
export const UpdatePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyId: S.String,
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Content: S.optional(S.String),
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
  identifier: "UpdatePolicyRequest",
}) as any as S.Schema<UpdatePolicyRequest>;
export interface UpdatePolicyResponse {
  Policy?: Policy;
}
export const UpdatePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(Policy) }).pipe(ns),
).annotate({
  identifier: "UpdatePolicyResponse",
}) as any as S.Schema<UpdatePolicyResponse>;
export interface UpdateResponsibilityTransferRequest {
  Id: string;
  Name: string | redacted.Redacted<string>;
}
export const UpdateResponsibilityTransferRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String, Name: SensitiveString }).pipe(
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
  identifier: "UpdateResponsibilityTransferRequest",
}) as any as S.Schema<UpdateResponsibilityTransferRequest>;
export interface UpdateResponsibilityTransferResponse {
  ResponsibilityTransfer?: ResponsibilityTransfer;
}
export const UpdateResponsibilityTransferResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ResponsibilityTransfer: S.optional(ResponsibilityTransfer),
    }).pipe(ns),
).annotate({
  identifier: "UpdateResponsibilityTransferResponse",
}) as any as S.Schema<UpdateResponsibilityTransferResponse>;
export type ExceptionMessage = string;
export type AccessDeniedForDependencyExceptionReason =
  | "ACCESS_DENIED_DURING_CREATE_SERVICE_LINKED_ROLE"
  | (string & {});
export const AccessDeniedForDependencyExceptionReason = S.String;

export type ConstraintViolationExceptionReason =
  | "ACCOUNT_NUMBER_LIMIT_EXCEEDED"
  | "HANDSHAKE_RATE_LIMIT_EXCEEDED"
  | "OU_NUMBER_LIMIT_EXCEEDED"
  | "OU_DEPTH_LIMIT_EXCEEDED"
  | "POLICY_NUMBER_LIMIT_EXCEEDED"
  | "POLICY_CONTENT_LIMIT_EXCEEDED"
  | "MAX_POLICY_TYPE_ATTACHMENT_LIMIT_EXCEEDED"
  | "MIN_POLICY_TYPE_ATTACHMENT_LIMIT_EXCEEDED"
  | "ACCOUNT_CANNOT_LEAVE_ORGANIZATION"
  | "ACCOUNT_CANNOT_LEAVE_WITHOUT_EULA"
  | "ACCOUNT_CANNOT_LEAVE_WITHOUT_PHONE_VERIFICATION"
  | "MASTER_ACCOUNT_PAYMENT_INSTRUMENT_REQUIRED"
  | "MEMBER_ACCOUNT_PAYMENT_INSTRUMENT_REQUIRED"
  | "ACCOUNT_CREATION_RATE_LIMIT_EXCEEDED"
  | "MASTER_ACCOUNT_ADDRESS_DOES_NOT_MATCH_MARKETPLACE"
  | "MASTER_ACCOUNT_MISSING_CONTACT_INFO"
  | "MASTER_ACCOUNT_NOT_GOVCLOUD_ENABLED"
  | "ORGANIZATION_NOT_IN_ALL_FEATURES_MODE"
  | "CREATE_ORGANIZATION_IN_BILLING_MODE_UNSUPPORTED_REGION"
  | "EMAIL_VERIFICATION_CODE_EXPIRED"
  | "WAIT_PERIOD_ACTIVE"
  | "MAX_TAG_LIMIT_EXCEEDED"
  | "TAG_POLICY_VIOLATION"
  | "MAX_DELEGATED_ADMINISTRATORS_FOR_SERVICE_LIMIT_EXCEEDED"
  | "CANNOT_REGISTER_MASTER_AS_DELEGATED_ADMINISTRATOR"
  | "CANNOT_REMOVE_DELEGATED_ADMINISTRATOR_FROM_ORG"
  | "DELEGATED_ADMINISTRATOR_EXISTS_FOR_THIS_SERVICE"
  | "POLICY_TYPE_ENABLED_FOR_THIS_SERVICE"
  | "MASTER_ACCOUNT_MISSING_BUSINESS_LICENSE"
  | "CANNOT_CLOSE_MANAGEMENT_ACCOUNT"
  | "CLOSE_ACCOUNT_QUOTA_EXCEEDED"
  | "CLOSE_ACCOUNT_REQUESTS_LIMIT_EXCEEDED"
  | "SERVICE_ACCESS_NOT_ENABLED"
  | "INVALID_PAYMENT_INSTRUMENT"
  | "ACCOUNT_CREATION_NOT_COMPLETE"
  | "CANNOT_REGISTER_SUSPENDED_ACCOUNT_AS_DELEGATED_ADMINISTRATOR"
  | "ALL_FEATURES_MIGRATION_ORGANIZATION_SIZE_LIMIT_EXCEEDED"
  | "RESPONSIBILITY_TRANSFER_MAX_LEVEL_VIOLATION"
  | "RESPONSIBILITY_TRANSFER_MAX_INBOUND_QUOTA_VIOLATION"
  | "RESPONSIBILITY_TRANSFER_MAX_OUTBOUND_QUOTA_VIOLATION"
  | "RESPONSIBILITY_TRANSFER_MAX_TRANSFERS_QUOTA_VIOLATION"
  | "ACTIVE_RESPONSIBILITY_TRANSFER_PROCESS"
  | "TRANSFER_RESPONSIBILITY_TARGET_DELETION_IN_PROGRESS"
  | "TRANSFER_RESPONSIBILITY_SOURCE_DELETION_IN_PROGRESS"
  | "UNSUPPORTED_PRICING"
  | "UNMET_BILLING_PREREQUISITE"
  | "ACCOUNT_NOT_ACTIVE_FOR_TRANSFER_RESPONSIBILITY"
  | "TRANSFER_RESPONSIBILITY_UPDATE_NOT_ALLOWED"
  | (string & {});
export const ConstraintViolationExceptionReason = S.String;

export type HandshakeConstraintViolationExceptionReason =
  | "ACCOUNT_NUMBER_LIMIT_EXCEEDED"
  | "HANDSHAKE_RATE_LIMIT_EXCEEDED"
  | "ALREADY_IN_AN_ORGANIZATION"
  | "ORGANIZATION_ALREADY_HAS_ALL_FEATURES"
  | "ORGANIZATION_IS_ALREADY_PENDING_ALL_FEATURES_MIGRATION"
  | "INVITE_DISABLED_DURING_ENABLE_ALL_FEATURES"
  | "PAYMENT_INSTRUMENT_REQUIRED"
  | "ORGANIZATION_FROM_DIFFERENT_SELLER_OF_RECORD"
  | "ORGANIZATION_MEMBERSHIP_CHANGE_RATE_LIMIT_EXCEEDED"
  | "MANAGEMENT_ACCOUNT_EMAIL_NOT_VERIFIED"
  | "RESPONSIBILITY_TRANSFER_ALREADY_EXISTS"
  | "SOURCE_AND_TARGET_CANNOT_MATCH"
  | "UNUSED_PREPAYMENT_BALANCE"
  | "LEGACY_PERMISSIONS_STILL_IN_USE"
  | "PAST_DUE_INVOICE"
  | "TARGET_ACCOUNT_VALIDATION_FAILURE"
  | (string & {});
export const HandshakeConstraintViolationExceptionReason = S.String;

export type InvalidInputExceptionReason =
  | "INVALID_PARTY_TYPE_TARGET"
  | "INVALID_SYNTAX_ORGANIZATION_ARN"
  | "INVALID_SYNTAX_POLICY_ID"
  | "INVALID_ENUM"
  | "INVALID_ENUM_POLICY_TYPE"
  | "INVALID_LIST_MEMBER"
  | "MAX_LENGTH_EXCEEDED"
  | "MAX_VALUE_EXCEEDED"
  | "MIN_LENGTH_EXCEEDED"
  | "MIN_VALUE_EXCEEDED"
  | "IMMUTABLE_POLICY"
  | "INVALID_PATTERN"
  | "INVALID_PATTERN_TARGET_ID"
  | "INPUT_REQUIRED"
  | "INVALID_NEXT_TOKEN"
  | "MAX_LIMIT_EXCEEDED_FILTER"
  | "MOVING_ACCOUNT_BETWEEN_DIFFERENT_ROOTS"
  | "INVALID_FULL_NAME_TARGET"
  | "UNRECOGNIZED_SERVICE_PRINCIPAL"
  | "INVALID_ROLE_NAME"
  | "INVALID_SYSTEM_TAGS_PARAMETER"
  | "DUPLICATE_TAG_KEY"
  | "TARGET_NOT_SUPPORTED"
  | "INVALID_EMAIL_ADDRESS_TARGET"
  | "INVALID_RESOURCE_POLICY_JSON"
  | "INVALID_PRINCIPAL"
  | "UNSUPPORTED_ACTION_IN_RESOURCE_POLICY"
  | "UNSUPPORTED_POLICY_TYPE_IN_RESOURCE_POLICY"
  | "UNSUPPORTED_RESOURCE_IN_RESOURCE_POLICY"
  | "NON_DETACHABLE_POLICY"
  | "CALLER_REQUIRED_FIELD_MISSING"
  | "UNSUPPORTED_ACTION_IN_RESPONSIBILITY_TRANSFER"
  | "START_DATE_NOT_BEGINNING_OF_MONTH"
  | "START_DATE_NOT_BEGINNING_OF_DAY"
  | "START_DATE_TOO_EARLY"
  | "START_DATE_TOO_LATE"
  | "INVALID_START_DATE"
  | "END_DATE_NOT_END_OF_MONTH"
  | "END_DATE_TOO_EARLY"
  | "END_DATE_TOO_LATE"
  | "INVALID_END_DATE"
  | (string & {});
export const InvalidInputExceptionReason = S.String;

export type ExceptionType = string;
export type AcceptHandshakeError =
  | AccessDeniedException
  | AccessDeniedForDependencyException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | HandshakeAlreadyInStateException
  | HandshakeConstraintViolationException
  | HandshakeNotFoundException
  | InvalidHandshakeTransitionException
  | InvalidInputException
  | MasterCannotLeaveOrganizationException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Accepts a handshake by sending an `ACCEPTED` response to the sender. You
 * can view accepted handshakes in API responses for 30 days before they are
 * deleted.
 *
 * Only the management account can accept the following
 * handshakes:
 *
 * - Enable all features final confirmation
 * (`APPROVE_ALL_FEATURES`)
 *
 * - Billing transfer (`TRANSFER_RESPONSIBILITY`)
 *
 * For more information, see Enabling all features and Responding to a billing transfer invitation in the
 * *Organizations User Guide*.
 *
 * Only a member account can accept the following
 * handshakes:
 *
 * - Invitation to join (`INVITE`)
 *
 * - Approve all features request (`ENABLE_ALL_FEATURES`)
 *
 * For more information, see Responding to invitations and Enabling all features in the *Organizations User Guide*.
 *
 * When a handshake is accepted, Organizations logs membership events in CloudTrail, available
 * only in the management account's event history. If the account was standalone and joined
 * a new organization, an `AccountJoinedOrganization` event is logged with
 * `joinedMethod:INVITED` and `joinedTime` fields. If the account
 * departed one organization and joined another, both an
 * `AccountDepartedOrganization` event with `departureMethod:LEFT`
 * and `departureTime` and an `AccountJoinedOrganization` event with
 * `joinedMethod:INVITED` and `joinedTime` are logged in their
 * respective management accounts.
 *
 * When a billing transfer (`TRANSFER_RESPONSIBILITY`) handshake is accepted,
 * Organizations publishes a `ResponsibilityTransferAccepted` service event to CloudTrail.
 * Each affected account receives this event, including upstream participants such as
 * distributors in a chained transfer. For an example log entry, see Example log entries: AcceptResponsibilityTransfer in the
 * *Organizations User Guide*.
 */
export const acceptHandshake: API.OperationMethod<
  AcceptHandshakeRequest,
  AcceptHandshakeResponse,
  AcceptHandshakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptHandshakeRequest,
  output: AcceptHandshakeResponse,
  errors: [
    AccessDeniedException,
    AccessDeniedForDependencyException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    HandshakeAlreadyInStateException,
    HandshakeConstraintViolationException,
    HandshakeNotFoundException,
    InvalidHandshakeTransitionException,
    InvalidInputException,
    MasterCannotLeaveOrganizationException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptHandshake",
}));

export type AttachPolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | DuplicatePolicyAttachmentException
  | InvalidInputException
  | PolicyChangesInProgressException
  | PolicyNotFoundException
  | PolicyTypeNotEnabledException
  | ServiceException
  | TargetNotFoundException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Attaches a policy to a root, an organizational unit (OU), or an individual account.
 * How the policy affects accounts depends on the type of policy. Refer to the
 * *Organizations User Guide* for information about each policy type:
 *
 * - SERVICE_CONTROL_POLICY
 *
 * - RESOURCE_CONTROL_POLICY
 *
 * - DECLARATIVE_POLICY_EC2
 *
 * - BACKUP_POLICY
 *
 * - TAG_POLICY
 *
 * - CHATBOT_POLICY
 *
 * - AISERVICES_OPT_OUT_POLICY
 *
 * - SECURITYHUB_POLICY
 *
 * - UPGRADE_ROLLOUT_POLICY
 *
 * - INSPECTOR_POLICY
 *
 * - BEDROCK_POLICY
 *
 * - S3_POLICY
 *
 * - NETWORK_SECURITY_DIRECTOR_POLICY
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const attachPolicy: API.OperationMethod<
  AttachPolicyRequest,
  AttachPolicyResponse,
  AttachPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AttachPolicyRequest,
  output: AttachPolicyResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    DuplicatePolicyAttachmentException,
    InvalidInputException,
    PolicyChangesInProgressException,
    PolicyNotFoundException,
    PolicyTypeNotEnabledException,
    ServiceException,
    TargetNotFoundException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachPolicy",
}));

export type CancelHandshakeError =
  | AccessDeniedException
  | ConcurrentModificationException
  | HandshakeAlreadyInStateException
  | HandshakeNotFoundException
  | InvalidHandshakeTransitionException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Cancels a Handshake.
 *
 * Only the account that sent a handshake can call this operation. The recipient of the handshake can't cancel it, but can use DeclineHandshake to decline. After a handshake is canceled, the
 * recipient can no longer respond to the handshake.
 *
 * You can view canceled handshakes in API responses for 30 days before they are
 * deleted.
 */
export const cancelHandshake: API.OperationMethod<
  CancelHandshakeRequest,
  CancelHandshakeResponse,
  CancelHandshakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelHandshakeRequest,
  output: CancelHandshakeResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    HandshakeAlreadyInStateException,
    HandshakeNotFoundException,
    InvalidHandshakeTransitionException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelHandshake",
}));

export type CloseAccountError =
  | AccessDeniedException
  | AccountAlreadyClosedException
  | AccountNotFoundException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConflictException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Closes an Amazon Web Services member account within an organization. You can close an account when
 * all
 * features are enabled . You can't close the management account with this API.
 * This is an asynchronous request that Amazon Web Services performs in the background. Because
 * `CloseAccount` operates asynchronously, it can return a successful
 * completion message even though account closure might still be in progress. You need to
 * wait a few minutes before the account is fully closed. To check the status of the
 * request, do one of the following:
 *
 * - Use the `AccountId` that you sent in the `CloseAccount`
 * request to provide as a parameter to the DescribeAccount
 * operation.
 *
 * While the close account request is in progress, Account status will indicate
 * PENDING_CLOSURE. When the close account request completes, the status will
 * change to SUSPENDED.
 *
 * - Check the CloudTrail log for the `CloseAccountResult` event that gets
 * published after the account closes successfully. For information on using CloudTrail
 * with Organizations, see Logging and monitoring in Organizations in the
 * *Organizations User Guide*.
 *
 * - Resources remaining within the account after closing will be automatically deleted after 90 days. During this 90-day period,
 * the resources won't be available unless you contact Amazon Web Services Support to reopen the account. After 90 days, you can't reopen an account.
 * You might still receive a bill after account closure.
 *
 * - Within a rolling 30 day period you can close the higher of either 250 or 20% of the member accounts in your organization,
 * up to a maximum of 1,000. This quota is not bound by a calendar month, but
 * starts when you close an account. After you reach this limit, you can't
 * close additional accounts. For more information, see Closing a member
 * account in your organization and Quotas for
 * Organizations in the *Organizations User Guide*.
 *
 * - To reinstate a closed account, contact Amazon Web Services Support within the 90-day
 * grace period while the account is in SUSPENDED status.
 *
 * - If the Amazon Web Services account you attempt to close is linked to an Amazon Web Services GovCloud
 * (US) account, the `CloseAccount` request will close both
 * accounts. To learn important pre-closure details, see
 * Closing an Amazon Web Services GovCloud (US) account in the
 * Amazon Web Services GovCloud User Guide.
 *
 * After the permanent termination of the account after the 90-day waiting period,
 * Organizations logs a membership event in CloudTrail. The event is an
 * `AccountDepartedOrganization` event with
 * `departureMethod:CLEANED` and `departureTime`. This event is
 * available only in the management account's event history.
 */
export const closeAccount: API.OperationMethod<
  CloseAccountRequest,
  CloseAccountResponse,
  CloseAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CloseAccountRequest,
  output: CloseAccountResponse,
  errors: [
    AccessDeniedException,
    AccountAlreadyClosedException,
    AccountNotFoundException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConflictException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CloseAccount",
}));

export type CreateAccountError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FinalizingOrganizationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Creates an Amazon Web Services account that is automatically a member of the organization whose
 * credentials made the request. This is an asynchronous request that Amazon Web Services performs in the
 * background. Because `CreateAccount` operates asynchronously, it can return a
 * successful completion message even though account initialization might still be in
 * progress. You might need to wait a few minutes before you can successfully access the
 * account. To check the status of the request, do one of the following:
 *
 * - Use the `Id` value of the `CreateAccountStatus` response
 * element from this operation to provide as a parameter to the DescribeCreateAccountStatus operation.
 *
 * - Check the CloudTrail log for the `CreateAccountResult` event. For
 * information on using CloudTrail with Organizations, see Logging and monitoring in Organizations in the
 * *Organizations User Guide*.
 *
 * Additionally, the `AccountJoinedOrganization` event is logged in CloudTrail and
 * is available only in the management account's event history. This event includes
 * `joinedMethod:Created` and `joinedTime` fields to provide context
 * on how and when the account joined the organization.
 *
 * The user who calls the API to create an account must have the
 * `organizations:CreateAccount` permission. If you enabled all features in
 * the organization, Organizations creates the required service-linked role named
 * `AWSServiceRoleForOrganizations`. For more information, see Organizations and service-linked roles in the
 * *Organizations User Guide*.
 *
 * If the request includes tags, then the requester must have the
 * `organizations:TagResource` permission.
 *
 * Organizations preconfigures the new member account with a role (named
 * `OrganizationAccountAccessRole` by default) that grants users in the
 * management account administrator permissions in the new member account. Principals in
 * the management account can assume the role. Organizations clones the company name and address
 * information for the new account from the organization's management account.
 *
 * You can only call this operation from the management account.
 *
 * For more information about creating accounts, see Creating
 * a member account in your organization in the
 * *Organizations User Guide*.
 *
 * - When you create an account in an organization using the Organizations console,
 * API, or CLI commands, the information required for the account to operate
 * as a standalone account, such as a payment method is
 * *not* automatically collected. If you must remove an
 * account from your organization later, you can do so only after you provide
 * the missing information. For more information, see Considerations before removing an account from an organization
 * in the *Organizations User Guide*.
 *
 * - If you get an exception that indicates that you exceeded your account
 * limits for the organization, contact Amazon Web Services Support.
 *
 * - If you get an exception that indicates that the operation failed because
 * your organization is still initializing, wait one hour and then try again.
 * If the error persists, contact Amazon Web Services Support.
 *
 * - It isn't recommended to use `CreateAccount` to create multiple
 * temporary accounts, and using the `CreateAccount` API to close
 * accounts is subject to a 30-day usage quota. For information on the
 * requirements and process for closing an account, see Closing a member
 * account in your organization in the
 * *Organizations User Guide*.
 *
 * When you create a member account with this operation, you can choose whether to
 * create the account with the IAM User and Role Access to
 * Billing Information switch enabled. If you enable it, IAM users and
 * roles that have appropriate permissions can view billing information for the
 * account. If you disable it, only the account root user can access billing
 * information. For information about how to disable this switch for an account, see
 * Granting access to
 * your billing information and tools.
 */
export const createAccount: API.OperationMethod<
  CreateAccountRequest,
  CreateAccountResponse,
  CreateAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAccountRequest,
  output: CreateAccountResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FinalizingOrganizationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccount",
}));

export type CreateGovCloudAccountError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | FinalizingOrganizationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * This action is available if all of the following are true:
 *
 * - You're authorized to create accounts in the Amazon Web Services GovCloud (US) Region. For
 * more information on the Amazon Web Services GovCloud (US) Region, see the
 * *Amazon Web Services GovCloud User Guide*.
 *
 * - You already have an account in the Amazon Web Services GovCloud (US) Region that is paired
 * with a management account of an organization in the commercial Region.
 *
 * - You call this action from the management account of your organization in the
 * commercial Region.
 *
 * - You have the `organizations:CreateGovCloudAccount` permission.
 *
 * Organizations automatically creates the required service-linked role named
 * `AWSServiceRoleForOrganizations`. For more information, see Organizations and service-linked roles in the
 * *Organizations User Guide*.
 *
 * Amazon Web Services automatically enables CloudTrail for Amazon Web Services GovCloud (US) accounts, but you should also
 * do the following:
 *
 * - Verify that CloudTrail is enabled to store logs.
 *
 * - Create an Amazon S3 bucket for CloudTrail log storage.
 *
 * For more information, see Verifying CloudTrail Is
 * Enabled in the *Amazon Web Services GovCloud User Guide*.
 *
 * If the request includes tags, then the requester must have the
 * `organizations:TagResource` permission. The tags are attached to the
 * commercial account associated with the GovCloud account, rather than the GovCloud
 * account itself. To add tags to the GovCloud account, call the TagResource operation in the GovCloud Region after the new GovCloud
 * account exists.
 *
 * You call this action from the management account of your organization in the
 * commercial Region to create a standalone Amazon Web Services account in the Amazon Web Services GovCloud (US)
 * Region. After the account is created, the management account of an organization in the
 * Amazon Web Services GovCloud (US) Region can invite it to that organization. For more information on
 * inviting standalone accounts in the Amazon Web Services GovCloud (US) to join an organization, see
 * Organizations in the
 * *Amazon Web Services GovCloud User Guide*.
 *
 * Calling `CreateGovCloudAccount` is an asynchronous request that Amazon Web Services
 * performs in the background. Because `CreateGovCloudAccount` operates
 * asynchronously, it can return a successful completion message even though account
 * initialization might still be in progress. You might need to wait a few minutes before
 * you can successfully access the account. To check the status of the request, do one of
 * the following:
 *
 * - Use the `Id` response element from this operation to
 * provide as a parameter to the DescribeCreateAccountStatus
 * operation.
 *
 * - Check the CloudTrail log for the `CreateAccountResult` event. For
 * information on using CloudTrail with Organizations, see Logging and
 * monitoring in Organizations in the
 * *Organizations User Guide*.
 *
 * Additionally, the `AccountJoinedOrganization` event is logged in CloudTrail and
 * is available only in the management account's event history only for the linked
 * commercial account. This event includes `joinedMethod:Created` and
 * `joinedTime` fields to provide context on how and when the account joined
 * the organization.
 *
 * When you call the `CreateGovCloudAccount` action, you create two accounts:
 * a standalone account in the Amazon Web Services GovCloud (US) Region and an associated account in the
 * commercial Region for billing and support purposes. The account in the commercial Region
 * is automatically a member of the organization whose credentials made the request. Both
 * accounts are associated with the same email address.
 *
 * A role is created in the new account in the commercial Region that allows the
 * management account in the organization in the commercial Region to assume it. An Amazon Web Services
 * GovCloud (US) account is then created and associated with the commercial account that
 * you just created. A role is also created in the new Amazon Web Services GovCloud (US) account that can
 * be assumed by the Amazon Web Services GovCloud (US) account that is associated with the management
 * account of the commercial organization. For more information and to view a diagram that
 * explains how account access works, see Organizations in the
 * *Amazon Web Services GovCloud User Guide*.
 *
 * For more information about creating accounts, see Creating
 * a member account in your organization in the
 * *Organizations User Guide*.
 *
 * - When you create an account in an organization using the Organizations console,
 * API, or CLI commands, the information required for the account to operate as
 * a standalone account is *not* automatically collected.
 * This includes a payment method and signing the end user license agreement
 * (EULA). If you must remove an account from your organization later, you can
 * do so only after you provide the missing information. For more information,
 * see Considerations before removing an account from an organization
 * in the *Organizations User Guide*.
 *
 * - If you get an exception that indicates that you exceeded your account
 * limits for the organization, contact Amazon Web Services Support.
 *
 * - If you get an exception that indicates that the operation failed because
 * your organization is still initializing, wait one hour and then try again.
 * If the error persists, contact Amazon Web Services Support.
 *
 * - Using `CreateGovCloudAccount` to create multiple temporary
 * accounts isn't recommended. You can only close an account from the Amazon Web Services
 * Billing and Cost Management console, and you must be signed in as the root user. For information on
 * the requirements and process for closing an account, see Closing a member
 * account in your organization in the
 * *Organizations User Guide*.
 *
 * When you create a member account with this operation, you can choose whether to
 * create the account with the IAM User and Role Access to
 * Billing Information switch enabled. If you enable it, IAM users and
 * roles that have appropriate permissions can view billing information for the
 * account. If you disable it, only the account root user can access billing
 * information. For information about how to disable this switch for an account, see
 * Granting
 * access to your billing information and tools.
 */
export const createGovCloudAccount: API.OperationMethod<
  CreateGovCloudAccountRequest,
  CreateGovCloudAccountResponse,
  CreateGovCloudAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGovCloudAccountRequest,
  output: CreateGovCloudAccountResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    FinalizingOrganizationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGovCloudAccount",
}));

export type CreateOrganizationError =
  | AccessDeniedException
  | AccessDeniedForDependencyException
  | AlreadyInOrganizationException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an Amazon Web Services organization. The account whose user is calling the
 * `CreateOrganization` operation automatically becomes the management account of the new organization.
 *
 * This operation must be called using credentials from the account that is to become the
 * new organization's management account. The principal must also have the relevant IAM
 * permissions.
 *
 * By default (or if you set the `FeatureSet` parameter to `ALL`),
 * the new organization is created with all features enabled and service control policies
 * automatically enabled in the root. If you instead choose to create the organization
 * supporting only the consolidated billing features by setting the `FeatureSet`
 * parameter to `CONSOLIDATED_BILLING`, no policy types are enabled by default
 * and you can't use organization policies.
 *
 * The `AccountJoinedOrganization` event is logged in CloudTrail and
 * is available only in the management account's event history. This event includes
 * `joinedMethod:INVITED` and `joinedTime` fields to provide
 * context on how and when the account joined the organization.
 */
export const createOrganization: API.OperationMethod<
  CreateOrganizationRequest,
  CreateOrganizationResponse,
  CreateOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateOrganizationRequest,
  output: CreateOrganizationResponse,
  errors: [
    AccessDeniedException,
    AccessDeniedForDependencyException,
    AlreadyInOrganizationException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOrganization",
}));

export type CreateOrganizationalUnitError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | DuplicateOrganizationalUnitException
  | InvalidInputException
  | ParentNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an organizational unit (OU) within a root or parent OU. An OU is a container
 * for accounts that enables you to organize your accounts to apply policies according to
 * your business requirements. The number of levels deep that you can nest OUs is dependent
 * upon the policy types enabled for that root. For service control policies, the limit is
 * five.
 *
 * For more information about OUs, see Managing organizational units (OUs) in the
 * *Organizations User Guide*.
 *
 * If the request includes tags, then the requester must have the
 * `organizations:TagResource` permission.
 *
 * You can only call this operation from the management account.
 */
export const createOrganizationalUnit: API.OperationMethod<
  CreateOrganizationalUnitRequest,
  CreateOrganizationalUnitResponse,
  CreateOrganizationalUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateOrganizationalUnitRequest,
  output: CreateOrganizationalUnitResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    DuplicateOrganizationalUnitException,
    InvalidInputException,
    ParentNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOrganizationalUnit",
}));

export type CreatePolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | DuplicatePolicyException
  | InvalidInputException
  | MalformedPolicyDocumentException
  | PolicyTypeNotAvailableForOrganizationException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Creates a policy of a specified type that you can attach to a root, an organizational
 * unit (OU), or an individual Amazon Web Services account.
 *
 * For more information about policies and their use, see Managing
 * Organizations policies.
 *
 * If the request includes tags, then the requester must have the
 * `organizations:TagResource` permission.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const createPolicy: API.OperationMethod<
  CreatePolicyRequest,
  CreatePolicyResponse,
  CreatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePolicyRequest,
  output: CreatePolicyResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    DuplicatePolicyException,
    InvalidInputException,
    MalformedPolicyDocumentException,
    PolicyTypeNotAvailableForOrganizationException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicy",
}));

export type DeclineHandshakeError =
  | AccessDeniedException
  | ConcurrentModificationException
  | HandshakeAlreadyInStateException
  | HandshakeNotFoundException
  | InvalidHandshakeTransitionException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Declines a Handshake.
 *
 * Only the account that receives a handshake can call this operation. The sender of the handshake can use CancelHandshake to
 * cancel if the handshake hasn't yet been responded to.
 *
 * You can view canceled handshakes in API responses for 30 days before they are
 * deleted.
 */
export const declineHandshake: API.OperationMethod<
  DeclineHandshakeRequest,
  DeclineHandshakeResponse,
  DeclineHandshakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeclineHandshakeRequest,
  output: DeclineHandshakeResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    HandshakeAlreadyInStateException,
    HandshakeNotFoundException,
    InvalidHandshakeTransitionException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeclineHandshake",
}));

export type DeleteOrganizationError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | OrganizationNotEmptyException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the organization. You can delete an organization only by using credentials
 * from the management account. The organization must be empty of member accounts.
 *
 * When an organization is deleted, Organizations logs a membership event in CloudTrail. The
 * event is an `AccountDepartedOrganization` event with
 * `departureMethod:LEFT` and `departureTime`. This event is available
 * only in the management account's event history.
 */
export const deleteOrganization: API.OperationMethod<
  DeleteOrganizationRequest,
  DeleteOrganizationResponse,
  DeleteOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteOrganizationRequest,
  output: DeleteOrganizationResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    OrganizationNotEmptyException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOrganization",
}));

export type DeleteOrganizationalUnitError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | InvalidInputException
  | OrganizationalUnitNotEmptyException
  | OrganizationalUnitNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an organizational unit (OU) from a root or another OU. You must first remove
 * all accounts and child OUs from the OU that you want to delete.
 *
 * You can only call this operation from the management account.
 */
export const deleteOrganizationalUnit: API.OperationMethod<
  DeleteOrganizationalUnitRequest,
  DeleteOrganizationalUnitResponse,
  DeleteOrganizationalUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteOrganizationalUnitRequest,
  output: DeleteOrganizationalUnitResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    InvalidInputException,
    OrganizationalUnitNotEmptyException,
    OrganizationalUnitNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOrganizationalUnit",
}));

export type DeletePolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | InvalidInputException
  | PolicyInUseException
  | PolicyNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Deletes the specified policy from your organization. Before you perform this
 * operation, you must first detach the policy from all organizational units (OUs), roots,
 * and accounts.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const deletePolicy: API.OperationMethod<
  DeletePolicyRequest,
  DeletePolicyResponse,
  DeletePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePolicyRequest,
  output: DeletePolicyResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    InvalidInputException,
    PolicyInUseException,
    PolicyNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicy",
}));

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | ResourcePolicyNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Deletes the resource policy from your organization.
 *
 * You can only call this operation from the management account.
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
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    ResourcePolicyNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DeregisterDelegatedAdministratorError =
  | AccessDeniedException
  | AccountNotFoundException
  | AccountNotRegisteredException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Removes the specified member Amazon Web Services account as a delegated administrator for the
 * specified Amazon Web Services service.
 *
 * Deregistering a delegated administrator can have unintended impacts on the
 * functionality of the enabled Amazon Web Services service. See the documentation for the enabled
 * service before you deregister a delegated administrator so that you understand any
 * potential impacts.
 *
 * You can run this action only for Amazon Web Services services that support this
 * feature. For a current list of services that support it, see the column Supports
 * Delegated Administrator in the table at Amazon Web Services Services that you can use with
 * Organizations in the *Organizations User Guide.*
 *
 * You can only call this operation from the management account.
 */
export const deregisterDelegatedAdministrator: API.OperationMethod<
  DeregisterDelegatedAdministratorRequest,
  DeregisterDelegatedAdministratorResponse,
  DeregisterDelegatedAdministratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterDelegatedAdministratorRequest,
  output: DeregisterDelegatedAdministratorResponse,
  errors: [
    AccessDeniedException,
    AccountNotFoundException,
    AccountNotRegisteredException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterDelegatedAdministrator",
}));

export type DescribeAccountError =
  | AccessDeniedException
  | AccountNotFoundException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves Organizations-related information about the specified account.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const describeAccount: API.OperationMethod<
  DescribeAccountRequest,
  DescribeAccountResponse,
  DescribeAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAccountRequest,
  output: DescribeAccountResponse,
  errors: [
    AccessDeniedException,
    AccountNotFoundException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccount",
}));

export type DescribeCreateAccountStatusError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | CreateAccountStatusNotFoundException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Retrieves the current status of an asynchronous request to create an account.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const describeCreateAccountStatus: API.OperationMethod<
  DescribeCreateAccountStatusRequest,
  DescribeCreateAccountStatusResponse,
  DescribeCreateAccountStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCreateAccountStatusRequest,
  output: DescribeCreateAccountStatusResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    CreateAccountStatusNotFoundException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCreateAccountStatus",
}));

export type DescribeEffectivePolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConstraintViolationException
  | EffectivePolicyNotFoundException
  | InvalidInputException
  | ServiceException
  | TargetNotFoundException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Returns the contents of the effective policy for specified policy type and account.
 * The effective policy is the aggregation of any policies of the specified type that the
 * account inherits, plus any policy of that type that is directly attached to the
 * account.
 *
 * This operation applies only to management policies. It does not apply to authorization
 * policies: service control policies (SCPs) and resource control policies (RCPs).
 *
 * For more information about policy inheritance, see Understanding
 * management policy inheritance in the
 * *Organizations User Guide*.
 *
 * You can call this operation from any account in a organization.
 */
export const describeEffectivePolicy: API.OperationMethod<
  DescribeEffectivePolicyRequest,
  DescribeEffectivePolicyResponse,
  DescribeEffectivePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEffectivePolicyRequest,
  output: DescribeEffectivePolicyResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConstraintViolationException,
    EffectivePolicyNotFoundException,
    InvalidInputException,
    ServiceException,
    TargetNotFoundException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEffectivePolicy",
}));

export type DescribeHandshakeError =
  | AccessDeniedException
  | ConcurrentModificationException
  | HandshakeNotFoundException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns details for a handshake. A handshake is the secure exchange of information
 * between two Amazon Web Services accounts: a sender and a recipient.
 *
 * You can view `ACCEPTED`, `DECLINED`, or `CANCELED`
 * handshakes in API Responses for 30 days before they are deleted.
 *
 * You can call this operation from any account in a organization.
 */
export const describeHandshake: API.OperationMethod<
  DescribeHandshakeRequest,
  DescribeHandshakeResponse,
  DescribeHandshakeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeHandshakeRequest,
  output: DescribeHandshakeResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    HandshakeNotFoundException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHandshake",
}));

export type DescribeOrganizationError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the organization that the user's account belongs
 * to.
 *
 * You can call this operation from any account in a organization.
 *
 * Even if a policy type is shown as available in the organization, you can disable
 * it separately at the root level with DisablePolicyType. Use ListRoots to see the status of policy types for a specified
 * root.
 */
export const describeOrganization: API.OperationMethod<
  DescribeOrganizationRequest,
  DescribeOrganizationResponse,
  DescribeOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeOrganizationRequest,
  output: DescribeOrganizationResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganization",
}));

export type DescribeOrganizationalUnitError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | OrganizationalUnitNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about an organizational unit (OU).
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const describeOrganizationalUnit: API.OperationMethod<
  DescribeOrganizationalUnitRequest,
  DescribeOrganizationalUnitResponse,
  DescribeOrganizationalUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeOrganizationalUnitRequest,
  output: DescribeOrganizationalUnitResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    OrganizationalUnitNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganizationalUnit",
}));

export type DescribePolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | PolicyNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Retrieves information about a policy.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const describePolicy: API.OperationMethod<
  DescribePolicyRequest,
  DescribePolicyResponse,
  DescribePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePolicyRequest,
  output: DescribePolicyResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    PolicyNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePolicy",
}));

export type DescribeResourcePolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConstraintViolationException
  | ResourcePolicyNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Retrieves information about a resource policy.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const describeResourcePolicy: API.OperationMethod<
  DescribeResourcePolicyRequest,
  DescribeResourcePolicyResponse,
  DescribeResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeResourcePolicyRequest,
  output: DescribeResourcePolicyResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConstraintViolationException,
    ResourcePolicyNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourcePolicy",
}));

export type DescribeResponsibilityTransferError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | ResponsibilityTransferNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Returns details for a transfer. A *transfer* is an arrangement
 * between two management accounts where one account designates the other with specified
 * responsibilities for their organization.
 */
export const describeResponsibilityTransfer: API.OperationMethod<
  DescribeResponsibilityTransferRequest,
  DescribeResponsibilityTransferResponse,
  DescribeResponsibilityTransferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeResponsibilityTransferRequest,
  output: DescribeResponsibilityTransferResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    ResponsibilityTransferNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResponsibilityTransfer",
}));

export type DetachPolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | PolicyChangesInProgressException
  | PolicyNotAttachedException
  | PolicyNotFoundException
  | ServiceException
  | TargetNotFoundException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Detaches a policy from a target root, organizational unit (OU), or account.
 *
 * If the policy being detached is a service control policy (SCP), the changes to
 * permissions for Identity and Access Management (IAM) users and roles in affected accounts are
 * immediate.
 *
 * Every root, OU, and account must have at least one SCP attached. If you want to
 * replace the default `FullAWSAccess` policy with an SCP that limits the
 * permissions that can be delegated, you must attach the replacement SCP before you can
 * remove the default SCP. This is the authorization strategy of an "allow list". If you instead attach a second SCP and
 * leave the `FullAWSAccess` SCP still attached, and specify "Effect":
 * "Deny" in the second SCP to override the `"Effect": "Allow"` in
 * the `FullAWSAccess` policy (or any other attached SCP), you're using the
 * authorization strategy of a "deny list".
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const detachPolicy: API.OperationMethod<
  DetachPolicyRequest,
  DetachPolicyResponse,
  DetachPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DetachPolicyRequest,
  output: DetachPolicyResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    PolicyChangesInProgressException,
    PolicyNotAttachedException,
    PolicyNotFoundException,
    ServiceException,
    TargetNotFoundException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachPolicy",
}));

export type DisableAWSServiceAccessError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Disables the integration of an Amazon Web Services service (the service that is specified by
 * `ServicePrincipal`) with Organizations. When you disable integration, the
 * specified service no longer can create a service-linked role in
 * *new* accounts in your organization. This means the service can't
 * perform operations on your behalf on any new accounts in your organization. The service
 * can still perform operations in older accounts until the service completes its clean-up
 * from Organizations.
 *
 * We
 * *strongly recommend*
 * that
 * you don't use this command to disable integration between Organizations and the specified
 * Amazon Web Services service. Instead, use the console or commands that are provided by the
 * specified service. This lets the trusted service perform any required initialization
 * when enabling trusted access, such as creating any required resources and any
 * required clean up of resources when disabling trusted access.
 *
 * For information about how to disable trusted service access to your organization
 * using the trusted service, see the **Learn more** link
 * under the **Supports Trusted Access** column at Amazon Web Services services that you can use with Organizations. on this page.
 *
 * If you disable access by using this command, it causes the following actions to
 * occur:
 *
 * - The service can no longer create a service-linked role in the accounts in
 * your organization. This means that the service can't perform operations on
 * your behalf on any new accounts in your organization. The service can still
 * perform operations in older accounts until the service completes its
 * clean-up from Organizations.
 *
 * - The service can no longer perform tasks in the member accounts in the
 * organization, unless those operations are explicitly permitted by the IAM
 * policies that are attached to your roles. This includes any data aggregation
 * from the member accounts to the management account, or to a delegated
 * administrator account, where relevant.
 *
 * - Some services detect this and clean up any remaining data or resources
 * related to the integration, while other services stop accessing the
 * organization but leave any historical data and configuration in place to
 * support a possible re-enabling of the integration.
 *
 * Using the other service's console or commands to disable the integration ensures
 * that the other service is aware that it can clean up any resources that are required
 * only for the integration. How the service cleans up its resources in the
 * organization's accounts depends on that service. For more information, see the
 * documentation for the other Amazon Web Services service.
 *
 * After you perform the `DisableAWSServiceAccess` operation, the specified
 * service can no longer perform operations in your organization's accounts
 *
 * For more information about integrating other services with Organizations, including the
 * list of services that work with Organizations, see Using Organizations with other Amazon Web Services
 * services in the *Organizations User Guide*.
 *
 * You can only call this operation from the management account.
 */
export const disableAWSServiceAccess: API.OperationMethod<
  DisableAWSServiceAccessRequest,
  DisableAWSServiceAccessResponse,
  DisableAWSServiceAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableAWSServiceAccessRequest,
  output: DisableAWSServiceAccessResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableAWSServiceAccess",
}));

export type DisablePolicyTypeError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | PolicyChangesInProgressException
  | PolicyTypeNotEnabledException
  | RootNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Disables an organizational policy type in a root. A policy of a certain type can be
 * attached to entities in a root only if that type is enabled in the root. After you
 * perform this operation, you no longer can attach policies of the specified type to that
 * root or to any organizational unit (OU) or account in that root. You can undo this by
 * using the EnablePolicyType operation.
 *
 * This is an asynchronous request that Amazon Web Services performs in the background. If you disable
 * a policy type for a root, it still appears enabled for the organization if all features are enabled for the organization. Amazon Web Services recommends that you
 * first use ListRoots to see the status of policy types for a specified
 * root, and then use this operation.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 *
 * To view the status of available policy types in the organization, use ListRoots.
 */
export const disablePolicyType: API.OperationMethod<
  DisablePolicyTypeRequest,
  DisablePolicyTypeResponse,
  DisablePolicyTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisablePolicyTypeRequest,
  output: DisablePolicyTypeResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    PolicyChangesInProgressException,
    PolicyTypeNotEnabledException,
    RootNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisablePolicyType",
}));

export type EnableAllFeaturesError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | HandshakeConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables all features in an organization. This enables the use of organization policies
 * that can restrict the services and actions that can be called in each account. Until you
 * enable all features, you have access only to consolidated billing, and you can't use any
 * of the advanced account administration features that Organizations supports. For more
 * information, see Enabling all features in your organization in the
 * *Organizations User Guide*.
 *
 * This operation is required only for organizations that were created explicitly
 * with only the consolidated billing features enabled. Calling this operation sends a
 * handshake to every invited account in the organization. The feature set change can
 * be finalized and the additional features enabled only after all administrators in
 * the invited accounts approve the change by accepting the handshake.
 *
 * After you enable all features, you can separately enable or disable individual policy
 * types in a root using EnablePolicyType and DisablePolicyType. To see the status of policy types in a root, use
 * ListRoots.
 *
 * After all invited member accounts accept the handshake, you finalize the feature set
 * change by accepting the handshake that contains "Action":
 * "ENABLE_ALL_FEATURES". This completes the change.
 *
 * After you enable all features in your organization, the management account in the
 * organization can apply policies on all member accounts. These policies can restrict what
 * users and even administrators in those accounts can do. The management account can apply
 * policies that prevent accounts from leaving the organization. Ensure that your account
 * administrators are aware of this.
 *
 * You can only call this operation from the management account.
 */
export const enableAllFeatures: API.OperationMethod<
  EnableAllFeaturesRequest,
  EnableAllFeaturesResponse,
  EnableAllFeaturesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableAllFeaturesRequest,
  output: EnableAllFeaturesResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    HandshakeConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableAllFeatures",
}));

export type EnableAWSServiceAccessError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Provides an Amazon Web Services service (the service that is specified by
 * `ServicePrincipal`) with permissions to view the structure of an
 * organization, create a service-linked role in
 * all the accounts in the organization, and allow the service to perform operations on
 * behalf of the organization and its accounts. Establishing these permissions can be a
 * first step in enabling the integration of an Amazon Web Services service with Organizations.
 *
 * We recommend that you enable integration between Organizations and the specified Amazon Web Services
 * service by using the console or commands that are provided by the specified service.
 * Doing so ensures that the service is aware that it can create the resources that are
 * required for the integration. How the service creates those resources in the
 * organization's accounts depends on that service. For more information, see the
 * documentation for the other Amazon Web Services service.
 *
 * For more information about enabling services to integrate with Organizations, see Using
 * Organizations with other Amazon Web Services services in the
 * *Organizations User Guide*.
 *
 * You can only call this operation from the management account.
 */
export const enableAWSServiceAccess: API.OperationMethod<
  EnableAWSServiceAccessRequest,
  EnableAWSServiceAccessResponse,
  EnableAWSServiceAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableAWSServiceAccessRequest,
  output: EnableAWSServiceAccessResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableAWSServiceAccess",
}));

export type EnablePolicyTypeError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | PolicyChangesInProgressException
  | PolicyTypeAlreadyEnabledException
  | PolicyTypeNotAvailableForOrganizationException
  | RootNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Enables a policy type in a root. After you enable a policy type in a root, you can
 * attach policies of that type to the root, any organizational unit (OU), or account in
 * that root. You can undo this by using the DisablePolicyType
 * operation.
 *
 * This is an asynchronous request that Amazon Web Services performs in the background. Amazon Web Services
 * recommends that you first use ListRoots to see the status of policy
 * types for a specified root, and then use this operation.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 *
 * You can enable a policy type in a root only if that policy type is available in the
 * organization. To view the status of available policy types in the organization, use
 * ListRoots.
 */
export const enablePolicyType: API.OperationMethod<
  EnablePolicyTypeRequest,
  EnablePolicyTypeResponse,
  EnablePolicyTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnablePolicyTypeRequest,
  output: EnablePolicyTypeResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    PolicyChangesInProgressException,
    PolicyTypeAlreadyEnabledException,
    PolicyTypeNotAvailableForOrganizationException,
    RootNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnablePolicyType",
}));

export type InviteAccountToOrganizationError =
  | AccessDeniedException
  | AccountOwnerNotVerifiedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | DuplicateHandshakeException
  | FinalizingOrganizationException
  | HandshakeConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sends an invitation to another account to join your organization as a member account.
 * Organizations sends email on your behalf to the email address that is associated with the
 * other account's owner. The invitation is implemented as a Handshake
 * whose details are in the response.
 *
 * If you receive an exception that indicates that you exceeded your account limits
 * for the organization or that the operation failed because your organization is still
 * initializing, wait one hour and then try again. If the error persists after an hour,
 * contact Amazon Web Services
 * Support.
 *
 * If the request includes tags, then the requester must have the
 * `organizations:TagResource` permission.
 *
 * You can only call this operation from the management account.
 */
export const inviteAccountToOrganization: API.OperationMethod<
  InviteAccountToOrganizationRequest,
  InviteAccountToOrganizationResponse,
  InviteAccountToOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InviteAccountToOrganizationRequest,
  output: InviteAccountToOrganizationResponse,
  errors: [
    AccessDeniedException,
    AccountOwnerNotVerifiedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    DuplicateHandshakeException,
    FinalizingOrganizationException,
    HandshakeConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InviteAccountToOrganization",
}));

export type InviteOrganizationToTransferResponsibilityError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | DuplicateHandshakeException
  | HandshakeConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Sends an invitation to another organization's management account to designate your
 * account with the specified responsibilities for their organization. The invitation is
 * implemented as a Handshake whose details are in the response.
 *
 * You can only call this operation from the management account.
 */
export const inviteOrganizationToTransferResponsibility: API.OperationMethod<
  InviteOrganizationToTransferResponsibilityRequest,
  InviteOrganizationToTransferResponsibilityResponse,
  InviteOrganizationToTransferResponsibilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InviteOrganizationToTransferResponsibilityRequest,
  output: InviteOrganizationToTransferResponsibilityResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    DuplicateHandshakeException,
    HandshakeConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InviteOrganizationToTransferResponsibility",
}));

export type LeaveOrganizationError =
  | AccessDeniedException
  | AccountNotFoundException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | MasterCannotLeaveOrganizationException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes a member account from its parent organization. This version of the operation
 * is performed by the account that wants to leave. To remove a member account as a user in
 * the management account, use RemoveAccountFromOrganization
 * instead.
 *
 * You can only call from operation from a member account.
 *
 * When an account leaves an organization, Organizations logs a membership event in
 * CloudTrail. The event is an `AccountDepartedOrganization` event with
 * `departureMethod:LEFT` and `departureTime`. This event is available
 * only in the management account's event history.
 *
 * - The management account in an organization with all features enabled can
 * set service control policies (SCPs) that can restrict what administrators of
 * member accounts can do. This includes preventing them from successfully
 * calling `LeaveOrganization` and leaving the organization.
 *
 * - You can leave an organization as a member account only if the account is
 * configured with the information required to operate as a standalone account.
 * When you create an account in an organization using the Organizations console,
 * API, or CLI commands, the information required of standalone accounts is
 * *not* automatically collected. For each account that
 * you want to make standalone, you must perform the following steps. If any of
 * the steps are already completed for this account, that step doesn't
 * appear.
 *
 * - Choose a support plan
 *
 * - Provide and verify the required contact information
 *
 * - Provide a current payment method
 *
 * Amazon Web Services uses the payment method to charge for any billable (not free tier)
 * Amazon Web Services activity that occurs while the account isn't attached to an
 * organization. For more information, see Considerations before removing an account from an organization
 * in the *Organizations User Guide*.
 *
 * - The account that you want to leave must not be a delegated administrator
 * account for any Amazon Web Services service enabled for your organization. If the account
 * is a delegated administrator, you must first change the delegated
 * administrator account to another account that is remaining in the
 * organization.
 *
 * - After the account leaves the organization, all tags that were attached to
 * the account object in the organization are deleted. Amazon Web Services accounts outside
 * of an organization do not support tags.
 *
 * - A newly created account has a waiting period before it can be removed from
 * its organization. You must wait until at least four days after the account
 * was created. Invited accounts aren't subject to this waiting period.
 *
 * - If you are using an organization principal to call
 * `LeaveOrganization` across multiple accounts, you can only do
 * this up to 5 accounts per second in a single organization.
 */
export const leaveOrganization: API.OperationMethod<
  LeaveOrganizationRequest,
  LeaveOrganizationResponse,
  LeaveOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: LeaveOrganizationRequest,
  output: LeaveOrganizationResponse,
  errors: [
    AccessDeniedException,
    AccountNotFoundException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    MasterCannotLeaveOrganizationException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "LeaveOrganization",
}));

export type ListAccountsError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all the accounts in the organization. To request only the accounts in a
 * specified root or organizational unit (OU), use the ListAccountsForParent operation instead.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listAccounts: API.PaginatedOperationMethod<
  ListAccountsRequest,
  ListAccountsResponse,
  ListAccountsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccountsRequest,
  output: ListAccountsResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccounts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAccountsForParentError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | ParentNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the accounts in an organization that are contained by the specified target root
 * or organizational unit (OU). If you specify the root, you get a list of all the accounts
 * that aren't in any OU. If you specify an OU, you get a list of all the accounts in only
 * that OU and not in any child OUs. To get a list of all accounts in the organization, use
 * the ListAccounts operation.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listAccountsForParent: API.PaginatedOperationMethod<
  ListAccountsForParentRequest,
  ListAccountsForParentResponse,
  ListAccountsForParentError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccountsForParentRequest,
  output: ListAccountsForParentResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    ParentNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountsForParent",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAccountsWithInvalidEffectivePolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConstraintViolationException
  | EffectivePolicyNotFoundException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Lists all the accounts in an organization that have invalid effective policies. An
 * *invalid effective policy* is an effective
 * policy that fails validation checks, resulting in the effective policy not
 * being fully enforced on all the intended accounts within an organization.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listAccountsWithInvalidEffectivePolicy: API.PaginatedOperationMethod<
  ListAccountsWithInvalidEffectivePolicyRequest,
  ListAccountsWithInvalidEffectivePolicyResponse,
  ListAccountsWithInvalidEffectivePolicyError,
  Credentials | HttpClient.HttpClient,
  Account
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccountsWithInvalidEffectivePolicyRequest,
  output: ListAccountsWithInvalidEffectivePolicyResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConstraintViolationException,
    EffectivePolicyNotFoundException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountsWithInvalidEffectivePolicy",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Accounts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAWSServiceAccessForOrganizationError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Returns a list of the Amazon Web Services services that you enabled to integrate with your
 * organization. After a service on this list creates the resources that it requires for
 * the integration, it can perform operations on your organization and its accounts.
 *
 * For more information about integrating other services with Organizations, including the
 * list of services that currently work with Organizations, see Using Organizations with other Amazon Web Services
 * services in the *Organizations User Guide*.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listAWSServiceAccessForOrganization: API.PaginatedOperationMethod<
  ListAWSServiceAccessForOrganizationRequest,
  ListAWSServiceAccessForOrganizationResponse,
  ListAWSServiceAccessForOrganizationError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAWSServiceAccessForOrganizationRequest,
  output: ListAWSServiceAccessForOrganizationResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAWSServiceAccessForOrganization",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListChildrenError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | ParentNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists all of the organizational units (OUs) or accounts that are contained in the
 * specified parent OU or root. This operation, along with ListParents
 * enables you to traverse the tree structure that makes up this root.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listChildren: API.PaginatedOperationMethod<
  ListChildrenRequest,
  ListChildrenResponse,
  ListChildrenError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListChildrenRequest,
  output: ListChildrenResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    ParentNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChildren",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCreateAccountStatusError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Lists the account creation requests that match the specified status that is currently
 * being tracked for the organization.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listCreateAccountStatus: API.PaginatedOperationMethod<
  ListCreateAccountStatusRequest,
  ListCreateAccountStatusResponse,
  ListCreateAccountStatusError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCreateAccountStatusRequest,
  output: ListCreateAccountStatusResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCreateAccountStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDelegatedAdministratorsError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Lists the Amazon Web Services accounts that are designated as delegated administrators in this
 * organization.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listDelegatedAdministrators: API.PaginatedOperationMethod<
  ListDelegatedAdministratorsRequest,
  ListDelegatedAdministratorsResponse,
  ListDelegatedAdministratorsError,
  Credentials | HttpClient.HttpClient,
  DelegatedAdministrator
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDelegatedAdministratorsRequest,
  output: ListDelegatedAdministratorsResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDelegatedAdministrators",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DelegatedAdministrators",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDelegatedServicesForAccountError =
  | AccessDeniedException
  | AccountNotFoundException
  | AccountNotRegisteredException
  | AWSOrganizationsNotInUseException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * List the Amazon Web Services services for which the specified account is a delegated
 * administrator.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listDelegatedServicesForAccount: API.PaginatedOperationMethod<
  ListDelegatedServicesForAccountRequest,
  ListDelegatedServicesForAccountResponse,
  ListDelegatedServicesForAccountError,
  Credentials | HttpClient.HttpClient,
  DelegatedService
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDelegatedServicesForAccountRequest,
  output: ListDelegatedServicesForAccountResponse,
  errors: [
    AccessDeniedException,
    AccountNotFoundException,
    AccountNotRegisteredException,
    AWSOrganizationsNotInUseException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDelegatedServicesForAccount",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DelegatedServices",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEffectivePolicyValidationErrorsError =
  | AccessDeniedException
  | AccountNotFoundException
  | AWSOrganizationsNotInUseException
  | ConstraintViolationException
  | EffectivePolicyNotFoundException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Lists all the validation errors on an effective
 * policy for a specified account and policy type.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listEffectivePolicyValidationErrors: API.PaginatedOperationMethod<
  ListEffectivePolicyValidationErrorsRequest,
  ListEffectivePolicyValidationErrorsResponse,
  ListEffectivePolicyValidationErrorsError,
  Credentials | HttpClient.HttpClient,
  EffectivePolicyValidationError
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEffectivePolicyValidationErrorsRequest,
  output: ListEffectivePolicyValidationErrorsResponse,
  errors: [
    AccessDeniedException,
    AccountNotFoundException,
    AWSOrganizationsNotInUseException,
    ConstraintViolationException,
    EffectivePolicyNotFoundException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEffectivePolicyValidationErrors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EffectivePolicyValidationErrors",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHandshakesForAccountError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the recent handshakes that you have received.
 *
 * You can view `CANCELED`, `ACCEPTED`, `DECLINED`, or
 * `EXPIRED` handshakes in API responses for 30 days before they are
 * deleted.
 *
 * You can call this operation from any account in a organization.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 */
export const listHandshakesForAccount: API.PaginatedOperationMethod<
  ListHandshakesForAccountRequest,
  ListHandshakesForAccountResponse,
  ListHandshakesForAccountError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListHandshakesForAccountRequest,
  output: ListHandshakesForAccountResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHandshakesForAccount",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHandshakesForOrganizationError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the recent handshakes that you have sent.
 *
 * You can view `CANCELED`, `ACCEPTED`, `DECLINED`, or
 * `EXPIRED` handshakes in API responses for 30 days before they are
 * deleted.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 */
export const listHandshakesForOrganization: API.PaginatedOperationMethod<
  ListHandshakesForOrganizationRequest,
  ListHandshakesForOrganizationResponse,
  ListHandshakesForOrganizationError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListHandshakesForOrganizationRequest,
  output: ListHandshakesForOrganizationResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHandshakesForOrganization",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInboundResponsibilityTransfersError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConstraintViolationException
  | InvalidInputException
  | ResponsibilityTransferNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Lists transfers that allow you to manage the specified responsibilities for another
 * organization. This operation returns both transfer invitations and transfers.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 */
export const listInboundResponsibilityTransfers: API.OperationMethod<
  ListInboundResponsibilityTransfersRequest,
  ListInboundResponsibilityTransfersResponse,
  ListInboundResponsibilityTransfersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListInboundResponsibilityTransfersRequest,
  output: ListInboundResponsibilityTransfersResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConstraintViolationException,
    InvalidInputException,
    ResponsibilityTransferNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInboundResponsibilityTransfers",
}));

export type ListOrganizationalUnitsForParentError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | ParentNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the organizational units (OUs) in a parent organizational unit or root.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listOrganizationalUnitsForParent: API.PaginatedOperationMethod<
  ListOrganizationalUnitsForParentRequest,
  ListOrganizationalUnitsForParentResponse,
  ListOrganizationalUnitsForParentError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOrganizationalUnitsForParentRequest,
  output: ListOrganizationalUnitsForParentResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    ParentNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrganizationalUnitsForParent",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOutboundResponsibilityTransfersError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Lists transfers that allow an account outside your organization to manage the
 * specified responsibilities for your organization. This operation returns both transfer
 * invitations and transfers.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 */
export const listOutboundResponsibilityTransfers: API.OperationMethod<
  ListOutboundResponsibilityTransfersRequest,
  ListOutboundResponsibilityTransfersResponse,
  ListOutboundResponsibilityTransfersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListOutboundResponsibilityTransfersRequest,
  output: ListOutboundResponsibilityTransfersResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOutboundResponsibilityTransfers",
}));

export type ListParentsError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ChildNotFoundException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the root or organizational units (OUs) that serve as the immediate parent of the
 * specified child OU or account. This operation, along with ListChildren
 * enables you to traverse the tree structure that makes up this root.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 *
 * In the current release, a child can have only a single parent.
 */
export const listParents: API.PaginatedOperationMethod<
  ListParentsRequest,
  ListParentsResponse,
  ListParentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListParentsRequest,
  output: ListParentsResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ChildNotFoundException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListParents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPoliciesError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Retrieves the list of all policies in an organization of a specified type.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listPolicies: API.PaginatedOperationMethod<
  ListPoliciesRequest,
  ListPoliciesResponse,
  ListPoliciesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPoliciesRequest,
  output: ListPoliciesResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPoliciesForTargetError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | ServiceException
  | TargetNotFoundException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Lists the policies that are directly attached to the specified target root,
 * organizational unit (OU), or account. You must specify the policy type that you want
 * included in the returned list.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listPoliciesForTarget: API.PaginatedOperationMethod<
  ListPoliciesForTargetRequest,
  ListPoliciesForTargetResponse,
  ListPoliciesForTargetError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPoliciesForTargetRequest,
  output: ListPoliciesForTargetResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    ServiceException,
    TargetNotFoundException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPoliciesForTarget",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRootsError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists the roots that are defined in the current organization.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 *
 * Policy types can be enabled and disabled in roots. This is distinct from whether
 * they're available in the organization. When you enable all features, you make policy
 * types available for use in that organization. Individual policy types can then be
 * enabled and disabled in a root. To see the availability of a policy type in an
 * organization, use DescribeOrganization.
 */
export const listRoots: API.PaginatedOperationMethod<
  ListRootsRequest,
  ListRootsResponse,
  ListRootsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRootsRequest,
  output: ListRootsResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRoots",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | ServiceException
  | TargetNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists tags that are attached to the specified resource.
 *
 * You can attach tags to the following resources in Organizations.
 *
 * - Amazon Web Services account
 *
 * - Organization root
 *
 * - Organizational unit (OU)
 *
 * - Policy (any type)
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    ServiceException,
    TargetNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tags",
  } as const,
})) as any;

export type ListTargetsForPolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | InvalidInputException
  | PolicyNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Lists all the roots, organizational units (OUs), and accounts that the specified
 * policy is attached to.
 *
 * When calling List* operations, always check the `NextToken` response parameter value, even if you receive an empty result set.
 * These operations can occasionally return an empty set of results even when more results are available.
 * Continue making requests until `NextToken` returns null. A null `NextToken` value indicates that you have retrieved all available results.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const listTargetsForPolicy: API.PaginatedOperationMethod<
  ListTargetsForPolicyRequest,
  ListTargetsForPolicyResponse,
  ListTargetsForPolicyError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTargetsForPolicyRequest,
  output: ListTargetsForPolicyResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    InvalidInputException,
    PolicyNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTargetsForPolicy",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type MoveAccountError =
  | AccessDeniedException
  | AccountNotFoundException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | DestinationParentNotFoundException
  | DuplicateAccountException
  | InvalidInputException
  | ServiceException
  | SourceParentNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Moves an account from its current source parent root or organizational unit (OU) to
 * the specified destination parent root or OU.
 *
 * You can only call this operation from the management account.
 */
export const moveAccount: API.OperationMethod<
  MoveAccountRequest,
  MoveAccountResponse,
  MoveAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: MoveAccountRequest,
  output: MoveAccountResponse,
  errors: [
    AccessDeniedException,
    AccountNotFoundException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    DestinationParentNotFoundException,
    DuplicateAccountException,
    InvalidInputException,
    ServiceException,
    SourceParentNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MoveAccount",
}));

export type PutResourcePolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Creates or updates a resource policy.
 *
 * You can only call this operation from the management account..
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
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type RegisterDelegatedAdministratorError =
  | AccessDeniedException
  | AccountAlreadyRegisteredException
  | AccountNotFoundException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Enables the specified member account to administer the Organizations features of the specified
 * Amazon Web Services service. It grants read-only access to Organizations service data. The account still
 * requires IAM permissions to access and administer the Amazon Web Services service.
 *
 * You can run this action only for Amazon Web Services services that support this
 * feature. For a current list of services that support it, see the column Supports
 * Delegated Administrator in the table at Amazon Web Services Services that you can use with
 * Organizations in the *Organizations User Guide.*
 *
 * You can only call this operation from the management account.
 */
export const registerDelegatedAdministrator: API.OperationMethod<
  RegisterDelegatedAdministratorRequest,
  RegisterDelegatedAdministratorResponse,
  RegisterDelegatedAdministratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterDelegatedAdministratorRequest,
  output: RegisterDelegatedAdministratorResponse,
  errors: [
    AccessDeniedException,
    AccountAlreadyRegisteredException,
    AccountNotFoundException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterDelegatedAdministrator",
}));

export type RemoveAccountFromOrganizationError =
  | AccessDeniedException
  | AccountNotFoundException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | MasterCannotLeaveOrganizationException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes the specified account from the organization.
 *
 * The removed account becomes a standalone account that isn't a member of any
 * organization. It's no longer subject to any policies and is responsible for its own bill
 * payments. The organization's management account is no longer charged for any expenses
 * accrued by the member account after it's removed from the organization.
 *
 * You can only call this operation from the management account. Member accounts can remove themselves with LeaveOrganization instead.
 *
 * When an account is removed from an organization, Organizations logs a membership
 * event in CloudTrail. The event is an
 * `AccountDepartedOrganization` event with
 * `departureMethod:REMOVED` and `departureTime`. This event is
 * available only in the management account's event history.
 *
 * - You can remove an account from your organization only if the account is
 * configured with the information required to operate as a standalone account.
 * When you create an account in an organization using the Organizations console,
 * API, or CLI commands, the information required of standalone accounts is
 * *not* automatically collected. For more information,
 * see Considerations before removing an account from an organization
 * in the *Organizations User Guide*.
 *
 * - The account that you want to leave must not be a delegated administrator
 * account for any Amazon Web Services service enabled for your organization. If the account
 * is a delegated administrator, you must first change the delegated
 * administrator account to another account that is remaining in the
 * organization.
 *
 * - After the account leaves the organization, all tags that were attached to
 * the account object in the organization are deleted. Amazon Web Services accounts outside
 * of an organization do not support tags.
 */
export const removeAccountFromOrganization: API.OperationMethod<
  RemoveAccountFromOrganizationRequest,
  RemoveAccountFromOrganizationResponse,
  RemoveAccountFromOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveAccountFromOrganizationRequest,
  output: RemoveAccountFromOrganizationResponse,
  errors: [
    AccessDeniedException,
    AccountNotFoundException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    MasterCannotLeaveOrganizationException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveAccountFromOrganization",
}));

export type TagResourceError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TargetNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds one or more tags to the specified resource.
 *
 * Currently, you can attach tags to the following resources in Organizations.
 *
 * - Amazon Web Services account
 *
 * - Organization root
 *
 * - Organizational unit (OU)
 *
 * - Policy (any type)
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
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
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TargetNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TerminateResponsibilityTransferError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | InvalidResponsibilityTransferTransitionException
  | ResponsibilityTransferAlreadyInStatusException
  | ResponsibilityTransferNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Ends a transfer. A *transfer* is an arrangement between two
 * management accounts where one account designates the other with specified
 * responsibilities for their organization.
 *
 * When a transfer ends, Organizations publishes a
 * `ResponsibilityTransferTerminated` service event to CloudTrail. Each affected
 * account receives this event, including upstream participants such as distributors in a
 * chained transfer. For an example log entry, see Example log entries: TerminateResponsibilityTransfer in the
 * *Organizations User Guide*.
 */
export const terminateResponsibilityTransfer: API.OperationMethod<
  TerminateResponsibilityTransferRequest,
  TerminateResponsibilityTransferResponse,
  TerminateResponsibilityTransferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TerminateResponsibilityTransferRequest,
  output: TerminateResponsibilityTransferResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    InvalidResponsibilityTransferTransitionException,
    ResponsibilityTransferAlreadyInStatusException,
    ResponsibilityTransferNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateResponsibilityTransfer",
}));

export type UntagResourceError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | InvalidInputException
  | ServiceException
  | TargetNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes any tags with the specified keys from the specified resource.
 *
 * You can attach tags to the following resources in Organizations.
 *
 * - Amazon Web Services account
 *
 * - Organization root
 *
 * - Organizational unit (OU)
 *
 * - Policy (any type)
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
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
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    InvalidInputException,
    ServiceException,
    TargetNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateOrganizationalUnitError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | DuplicateOrganizationalUnitException
  | InvalidInputException
  | OrganizationalUnitNotFoundException
  | ServiceException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Renames the specified organizational unit (OU). The ID and ARN don't change. The child
 * OUs and accounts remain in place, and any attached policies of the OU remain
 * attached.
 *
 * You can only call this operation from the management account.
 */
export const updateOrganizationalUnit: API.OperationMethod<
  UpdateOrganizationalUnitRequest,
  UpdateOrganizationalUnitResponse,
  UpdateOrganizationalUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateOrganizationalUnitRequest,
  output: UpdateOrganizationalUnitResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    DuplicateOrganizationalUnitException,
    InvalidInputException,
    OrganizationalUnitNotFoundException,
    ServiceException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOrganizationalUnit",
}));

export type UpdatePolicyError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConcurrentModificationException
  | ConstraintViolationException
  | DuplicatePolicyException
  | InvalidInputException
  | MalformedPolicyDocumentException
  | PolicyChangesInProgressException
  | PolicyNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Updates an existing policy with a new name, description, or content. If you don't
 * supply any parameter, that value remains unchanged. You can't change a policy's
 * type.
 *
 * You can only call this operation from the management account or a member account that is a delegated administrator.
 */
export const updatePolicy: API.OperationMethod<
  UpdatePolicyRequest,
  UpdatePolicyResponse,
  UpdatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePolicyRequest,
  output: UpdatePolicyResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConcurrentModificationException,
    ConstraintViolationException,
    DuplicatePolicyException,
    InvalidInputException,
    MalformedPolicyDocumentException,
    PolicyChangesInProgressException,
    PolicyNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePolicy",
}));

export type UpdateResponsibilityTransferError =
  | AccessDeniedException
  | AWSOrganizationsNotInUseException
  | ConstraintViolationException
  | InvalidInputException
  | ResponsibilityTransferNotFoundException
  | ServiceException
  | TooManyRequestsException
  | UnsupportedAPIEndpointException
  | CommonErrors;
/**
 * Updates a transfer. A *transfer* is the arrangement between two
 * management accounts where one account designates the other with specified
 * responsibilities for their organization.
 *
 * You can update the name assigned to a transfer.
 */
export const updateResponsibilityTransfer: API.OperationMethod<
  UpdateResponsibilityTransferRequest,
  UpdateResponsibilityTransferResponse,
  UpdateResponsibilityTransferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateResponsibilityTransferRequest,
  output: UpdateResponsibilityTransferResponse,
  errors: [
    AccessDeniedException,
    AWSOrganizationsNotInUseException,
    ConstraintViolationException,
    InvalidInputException,
    ResponsibilityTransferNotFoundException,
    ServiceException,
    TooManyRequestsException,
    UnsupportedAPIEndpointException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResponsibilityTransfer",
}));
