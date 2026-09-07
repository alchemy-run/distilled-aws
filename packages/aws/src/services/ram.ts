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
  sdkId: "RAM",
  serviceShapeName: "AmazonResourceSharing",
});
const auth = T.AwsAuthSigv4({ name: "ram" });
const ver = T.ServiceVersion("2018-01-04");
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
              `https://ram-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://ram.${Region}.amazonaws.com`);
            }
            return e(
              `https://ram-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://ram.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://ram.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ S.TaggedError<IdempotentParameterMismatchException>()(
    "IdempotentParameterMismatchException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "IdempotentParameterMismatch",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidClientTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidClientTokenException>()(
    "InvalidClientTokenException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidClientToken", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidMaxResultsException
  extends /*@__PURE__*/ S.TaggedError<InvalidMaxResultsException>()(
    "InvalidMaxResultsException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidMaxResults", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidNextToken", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidParameter", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidPolicyException
  extends /*@__PURE__*/ S.TaggedError<InvalidPolicyException>()(
    "InvalidPolicyException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidPolicy", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidResourceTypeException
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceTypeException>()(
    "InvalidResourceTypeException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidResourceType.Unknown",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidStateTransitionException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateTransitionException>()(
    "InvalidStateTransitionException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidStateTransitionException.Unknown",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class MalformedArnException
  extends /*@__PURE__*/ S.TaggedError<MalformedArnException>()(
    "MalformedArnException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidArn.Malformed", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class MalformedPolicyTemplateException
  extends /*@__PURE__*/ S.TaggedError<MalformedPolicyTemplateException>()(
    "MalformedPolicyTemplateException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "MalformedPolicyTemplateException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class MissingRequiredParameterException
  extends /*@__PURE__*/ S.TaggedError<MissingRequiredParameterException>()(
    "MissingRequiredParameterException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "MissingRequiredParameter",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class OperationNotPermittedException
  extends /*@__PURE__*/ S.TaggedError<OperationNotPermittedException>()(
    "OperationNotPermittedException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "OperationNotPermitted", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class PermissionAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<PermissionAlreadyExistsException>()(
    "PermissionAlreadyExistsException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "PermissionAlreadyExistsException",
        httpResponseCode: 409,
      }),
      T.HttpError(409),
    ),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class PermissionLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<PermissionLimitExceededException>()(
    "PermissionLimitExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "PermissionLimitExceededException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class PermissionVersionsLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<PermissionVersionsLimitExceededException>()(
    "PermissionVersionsLimitExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "PermissionVersionsLimitExceededException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceArnNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceArnNotFoundException>()(
    "ResourceArnNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidResourceArn.NotFound",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceShareInvitationAlreadyAcceptedException
  extends /*@__PURE__*/ S.TaggedError<ResourceShareInvitationAlreadyAcceptedException>()(
    "ResourceShareInvitationAlreadyAcceptedException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidResourceShareInvitationArn.AlreadyAccepted",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceShareInvitationAlreadyRejectedException
  extends /*@__PURE__*/ S.TaggedError<ResourceShareInvitationAlreadyRejectedException>()(
    "ResourceShareInvitationAlreadyRejectedException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidResourceShareInvitationArn.AlreadyRejected",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceShareInvitationArnNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceShareInvitationArnNotFoundException>()(
    "ResourceShareInvitationArnNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidResourceShareInvitationArn.NotFound",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceShareInvitationExpiredException
  extends /*@__PURE__*/ S.TaggedError<ResourceShareInvitationExpiredException>()(
    "ResourceShareInvitationExpiredException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidResourceShareInvitationArn.Expired",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceShareLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceShareLimitExceededException>()(
    "ResourceShareLimitExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ResourceShareLimitExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServerInternalException
  extends /*@__PURE__*/ S.TaggedError<ServerInternalException>()(
    "ServerInternalException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InternalError", httpResponseCode: 500 }),
      T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "Unavailable", httpResponseCode: 503 }),
      T.HttpError(503),
    ),
  ).pipe(C.withServerError) {}
export class TagLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<TagLimitExceededException>()(
    "TagLimitExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TagLimitExceeded", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TagPolicyViolationException
  extends /*@__PURE__*/ S.TaggedError<TagPolicyViolationException>()(
    "TagPolicyViolationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TagPolicyViolation", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ThrottlingException", httpResponseCode: 429 }),
      T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export class UnknownResourceException
  extends /*@__PURE__*/ S.TaggedError<UnknownResourceException>()(
    "UnknownResourceException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidResourceShareArn.NotFound",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class UnmatchedPolicyPermissionException
  extends /*@__PURE__*/ S.TaggedError<UnmatchedPolicyPermissionException>()(
    "UnmatchedPolicyPermissionException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "UnmatchedPolicyPermissionException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export interface AcceptResourceShareInvitationRequest {
  resourceShareInvitationArn: string;
  clientToken?: string;
}
export const AcceptResourceShareInvitationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      resourceShareInvitationArn: S.String,
      clientToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/acceptresourceshareinvitation" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AcceptResourceShareInvitationRequest",
}) as any as S.Schema<AcceptResourceShareInvitationRequest>;
export type ResourceShareInvitationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "EXPIRED"
  | (string & {});
export const ResourceShareInvitationStatus = S.String;

export type ResourceShareAssociationType =
  | "PRINCIPAL"
  | "RESOURCE"
  | "SOURCE"
  | (string & {});
export const ResourceShareAssociationType = S.String;

export type ResourceShareAssociationStatus =
  | "ASSOCIATING"
  | "ASSOCIATED"
  | "FAILED"
  | "DISASSOCIATING"
  | "DISASSOCIATED"
  | "SUSPENDED"
  | "SUSPENDING"
  | "RESTORING"
  | (string & {});
export const ResourceShareAssociationStatus = S.String;

export interface ResourceShareAssociation {
  resourceShareArn?: string;
  resourceShareName?: string;
  associatedEntity?: string;
  associationType?: ResourceShareAssociationType;
  status?: ResourceShareAssociationStatus;
  statusMessage?: string;
  creationTime?: Date;
  lastUpdatedTime?: Date;
  external?: boolean;
}
export const ResourceShareAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceShareArn: S.optional(S.String),
    resourceShareName: S.optional(S.String),
    associatedEntity: S.optional(S.String),
    associationType: S.optional(ResourceShareAssociationType),
    status: S.optional(ResourceShareAssociationStatus),
    statusMessage: S.optional(S.String),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    external: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ResourceShareAssociation",
}) as any as S.Schema<ResourceShareAssociation>;
export type ResourceShareAssociationList = ResourceShareAssociation[];
export const ResourceShareAssociationList = /*@__PURE__*/ S.Array(
  ResourceShareAssociation.pipe(T.XmlName("item")).annotate({
    identifier: "ResourceShareAssociation",
  }),
);
export interface ResourceShareInvitation {
  resourceShareInvitationArn?: string;
  resourceShareName?: string;
  resourceShareArn?: string;
  senderAccountId?: string;
  receiverAccountId?: string;
  invitationTimestamp?: Date;
  status?: ResourceShareInvitationStatus;
  resourceShareAssociations?: ResourceShareAssociation[];
  receiverArn?: string;
}
export const ResourceShareInvitation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceShareInvitationArn: S.optional(S.String),
    resourceShareName: S.optional(S.String),
    resourceShareArn: S.optional(S.String),
    senderAccountId: S.optional(S.String),
    receiverAccountId: S.optional(S.String),
    invitationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    status: S.optional(ResourceShareInvitationStatus),
    resourceShareAssociations: S.optional(ResourceShareAssociationList),
    receiverArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ResourceShareInvitation",
}) as any as S.Schema<ResourceShareInvitation>;
export interface AcceptResourceShareInvitationResponse {
  resourceShareInvitation?: ResourceShareInvitation;
  clientToken?: string;
}
export const AcceptResourceShareInvitationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      resourceShareInvitation: S.optional(ResourceShareInvitation),
      clientToken: S.optional(S.String),
    }),
).annotate({
  identifier: "AcceptResourceShareInvitationResponse",
}) as any as S.Schema<AcceptResourceShareInvitationResponse>;
export type ResourceArnList = string[];
export const ResourceArnList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("item")),
);
export type PrincipalArnOrIdList = string[];
export const PrincipalArnOrIdList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("item")),
);
export type SourceArnOrAccountList = string[];
export const SourceArnOrAccountList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("item")),
);
export interface AssociateResourceShareRequest {
  resourceShareArn: string;
  resourceArns?: string[];
  principals?: string[];
  clientToken?: string;
  sources?: string[];
}
export const AssociateResourceShareRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceShareArn: S.String,
    resourceArns: S.optional(ResourceArnList),
    principals: S.optional(PrincipalArnOrIdList),
    clientToken: S.optional(S.String),
    sources: S.optional(SourceArnOrAccountList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/associateresourceshare" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateResourceShareRequest",
}) as any as S.Schema<AssociateResourceShareRequest>;
export interface AssociateResourceShareResponse {
  resourceShareAssociations?: ResourceShareAssociation[];
  clientToken?: string;
}
export const AssociateResourceShareResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceShareAssociations: S.optional(ResourceShareAssociationList),
    clientToken: S.optional(S.String),
  }),
).annotate({
  identifier: "AssociateResourceShareResponse",
}) as any as S.Schema<AssociateResourceShareResponse>;
export interface AssociateResourceSharePermissionRequest {
  resourceShareArn: string;
  permissionArn: string;
  replace?: boolean;
  clientToken?: string;
  permissionVersion?: number;
}
export const AssociateResourceSharePermissionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      resourceShareArn: S.String,
      permissionArn: S.String,
      replace: S.optional(S.Boolean),
      clientToken: S.optional(S.String),
      permissionVersion: S.optional(S.Number),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/associateresourcesharepermission" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AssociateResourceSharePermissionRequest",
}) as any as S.Schema<AssociateResourceSharePermissionRequest>;
export interface AssociateResourceSharePermissionResponse {
  returnValue?: boolean;
  clientToken?: string;
}
export const AssociateResourceSharePermissionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      returnValue: S.optional(S.Boolean),
      clientToken: S.optional(S.String),
    }),
).annotate({
  identifier: "AssociateResourceSharePermissionResponse",
}) as any as S.Schema<AssociateResourceSharePermissionResponse>;
export type PermissionName = string;
export type Policy = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key?: string;
  value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface CreatePermissionRequest {
  name: string;
  resourceType: string;
  policyTemplate: string;
  clientToken?: string;
  tags?: Tag[];
}
export const CreatePermissionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    resourceType: S.String,
    policyTemplate: S.String,
    clientToken: S.optional(S.String),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/createpermission" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePermissionRequest",
}) as any as S.Schema<CreatePermissionRequest>;
export type PermissionType = "CUSTOMER_MANAGED" | "AWS_MANAGED" | (string & {});
export const PermissionType = S.String;

export type PermissionFeatureSet =
  | "CREATED_FROM_POLICY"
  | "PROMOTING_TO_STANDARD"
  | "STANDARD"
  | (string & {});
export const PermissionFeatureSet = S.String;

export interface ResourceSharePermissionSummary {
  arn?: string;
  version?: string;
  defaultVersion?: boolean;
  name?: string;
  resourceType?: string;
  status?: string;
  creationTime?: Date;
  lastUpdatedTime?: Date;
  isResourceTypeDefault?: boolean;
  permissionType?: PermissionType;
  featureSet?: PermissionFeatureSet;
  tags?: Tag[];
}
export const ResourceSharePermissionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    version: S.optional(S.String),
    defaultVersion: S.optional(S.Boolean),
    name: S.optional(S.String),
    resourceType: S.optional(S.String),
    status: S.optional(S.String),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    isResourceTypeDefault: S.optional(S.Boolean),
    permissionType: S.optional(PermissionType),
    featureSet: S.optional(PermissionFeatureSet),
    tags: S.optional(TagList),
  }),
).annotate({
  identifier: "ResourceSharePermissionSummary",
}) as any as S.Schema<ResourceSharePermissionSummary>;
export interface CreatePermissionResponse {
  permission?: ResourceSharePermissionSummary;
  clientToken?: string;
}
export const CreatePermissionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    permission: S.optional(ResourceSharePermissionSummary),
    clientToken: S.optional(S.String),
  }),
).annotate({
  identifier: "CreatePermissionResponse",
}) as any as S.Schema<CreatePermissionResponse>;
export interface CreatePermissionVersionRequest {
  permissionArn: string;
  policyTemplate: string;
  clientToken?: string;
}
export const CreatePermissionVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    permissionArn: S.String,
    policyTemplate: S.String,
    clientToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/createpermissionversion" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePermissionVersionRequest",
}) as any as S.Schema<CreatePermissionVersionRequest>;
export type PermissionStatus =
  | "ATTACHABLE"
  | "UNATTACHABLE"
  | "DELETING"
  | "DELETED"
  | (string & {});
export const PermissionStatus = S.String;

export interface ResourceSharePermissionDetail {
  arn?: string;
  version?: string;
  defaultVersion?: boolean;
  name?: string;
  resourceType?: string;
  permission?: string;
  creationTime?: Date;
  lastUpdatedTime?: Date;
  isResourceTypeDefault?: boolean;
  permissionType?: PermissionType;
  featureSet?: PermissionFeatureSet;
  status?: PermissionStatus;
  tags?: Tag[];
}
export const ResourceSharePermissionDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    version: S.optional(S.String),
    defaultVersion: S.optional(S.Boolean),
    name: S.optional(S.String),
    resourceType: S.optional(S.String),
    permission: S.optional(S.String),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    isResourceTypeDefault: S.optional(S.Boolean),
    permissionType: S.optional(PermissionType),
    featureSet: S.optional(PermissionFeatureSet),
    status: S.optional(PermissionStatus),
    tags: S.optional(TagList),
  }),
).annotate({
  identifier: "ResourceSharePermissionDetail",
}) as any as S.Schema<ResourceSharePermissionDetail>;
export interface CreatePermissionVersionResponse {
  permission?: ResourceSharePermissionDetail;
  clientToken?: string;
}
export const CreatePermissionVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    permission: S.optional(ResourceSharePermissionDetail),
    clientToken: S.optional(S.String),
  }),
).annotate({
  identifier: "CreatePermissionVersionResponse",
}) as any as S.Schema<CreatePermissionVersionResponse>;
export type PermissionArnList = string[];
export const PermissionArnList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("item")),
);
export interface ResourceShareConfiguration {
  retainSharingOnAccountLeaveOrganization?: boolean;
}
export const ResourceShareConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ retainSharingOnAccountLeaveOrganization: S.optional(S.Boolean) }),
).annotate({
  identifier: "ResourceShareConfiguration",
}) as any as S.Schema<ResourceShareConfiguration>;
export interface CreateResourceShareRequest {
  name: string;
  resourceArns?: string[];
  principals?: string[];
  tags?: Tag[];
  allowExternalPrincipals?: boolean;
  clientToken?: string;
  permissionArns?: string[];
  sources?: string[];
  resourceShareConfiguration?: ResourceShareConfiguration;
}
export const CreateResourceShareRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    resourceArns: S.optional(ResourceArnList),
    principals: S.optional(PrincipalArnOrIdList),
    tags: S.optional(TagList),
    allowExternalPrincipals: S.optional(S.Boolean),
    clientToken: S.optional(S.String),
    permissionArns: S.optional(PermissionArnList),
    sources: S.optional(SourceArnOrAccountList),
    resourceShareConfiguration: S.optional(ResourceShareConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/createresourceshare" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateResourceShareRequest",
}) as any as S.Schema<CreateResourceShareRequest>;
export type ResourceShareStatus =
  | "PENDING"
  | "ACTIVE"
  | "FAILED"
  | "DELETING"
  | "DELETED"
  | (string & {});
export const ResourceShareStatus = S.String;

export type ResourceShareFeatureSet =
  | "CREATED_FROM_POLICY"
  | "PROMOTING_TO_STANDARD"
  | "STANDARD"
  | (string & {});
export const ResourceShareFeatureSet = S.String;

export interface ResourceShare {
  resourceShareArn?: string;
  name?: string;
  owningAccountId?: string;
  allowExternalPrincipals?: boolean;
  status?: ResourceShareStatus;
  statusMessage?: string;
  tags?: Tag[];
  creationTime?: Date;
  lastUpdatedTime?: Date;
  featureSet?: ResourceShareFeatureSet;
  resourceShareConfiguration?: ResourceShareConfiguration;
}
export const ResourceShare = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceShareArn: S.optional(S.String),
    name: S.optional(S.String),
    owningAccountId: S.optional(S.String),
    allowExternalPrincipals: S.optional(S.Boolean),
    status: S.optional(ResourceShareStatus),
    statusMessage: S.optional(S.String),
    tags: S.optional(TagList),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    featureSet: S.optional(ResourceShareFeatureSet),
    resourceShareConfiguration: S.optional(ResourceShareConfiguration),
  }),
).annotate({ identifier: "ResourceShare" }) as any as S.Schema<ResourceShare>;
export interface CreateResourceShareResponse {
  resourceShare?: ResourceShare;
  clientToken?: string;
}
export const CreateResourceShareResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceShare: S.optional(ResourceShare),
    clientToken: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateResourceShareResponse",
}) as any as S.Schema<CreateResourceShareResponse>;
export interface DeletePermissionRequest {
  permissionArn: string;
  clientToken?: string;
}
export const DeletePermissionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    permissionArn: S.String.pipe(T.HttpQuery("permissionArn")),
    clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/deletepermission" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePermissionRequest",
}) as any as S.Schema<DeletePermissionRequest>;
export interface DeletePermissionResponse {
  returnValue?: boolean;
  clientToken?: string;
  permissionStatus?: PermissionStatus;
}
export const DeletePermissionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    returnValue: S.optional(S.Boolean).pipe(T.XmlName("return")),
    clientToken: S.optional(S.String),
    permissionStatus: S.optional(PermissionStatus),
  }),
).annotate({
  identifier: "DeletePermissionResponse",
}) as any as S.Schema<DeletePermissionResponse>;
export interface DeletePermissionVersionRequest {
  permissionArn: string;
  permissionVersion: number;
  clientToken?: string;
}
export const DeletePermissionVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    permissionArn: S.String.pipe(T.HttpQuery("permissionArn")),
    permissionVersion: S.Number.pipe(T.HttpQuery("permissionVersion")),
    clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/deletepermissionversion" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePermissionVersionRequest",
}) as any as S.Schema<DeletePermissionVersionRequest>;
export interface DeletePermissionVersionResponse {
  returnValue?: boolean;
  clientToken?: string;
  permissionStatus?: PermissionStatus;
}
export const DeletePermissionVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    returnValue: S.optional(S.Boolean).pipe(T.XmlName("return")),
    clientToken: S.optional(S.String),
    permissionStatus: S.optional(PermissionStatus),
  }),
).annotate({
  identifier: "DeletePermissionVersionResponse",
}) as any as S.Schema<DeletePermissionVersionResponse>;
export interface DeleteResourceShareRequest {
  resourceShareArn: string;
  clientToken?: string;
}
export const DeleteResourceShareRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceShareArn: S.String.pipe(T.HttpQuery("resourceShareArn")),
    clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/deleteresourceshare" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteResourceShareRequest",
}) as any as S.Schema<DeleteResourceShareRequest>;
export interface DeleteResourceShareResponse {
  returnValue?: boolean;
  clientToken?: string;
}
export const DeleteResourceShareResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    returnValue: S.optional(S.Boolean).pipe(T.XmlName("return")),
    clientToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteResourceShareResponse",
}) as any as S.Schema<DeleteResourceShareResponse>;
export interface DisassociateResourceShareRequest {
  resourceShareArn: string;
  resourceArns?: string[];
  principals?: string[];
  clientToken?: string;
  sources?: string[];
}
export const DisassociateResourceShareRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceShareArn: S.String,
    resourceArns: S.optional(ResourceArnList),
    principals: S.optional(PrincipalArnOrIdList),
    clientToken: S.optional(S.String),
    sources: S.optional(SourceArnOrAccountList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/disassociateresourceshare" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateResourceShareRequest",
}) as any as S.Schema<DisassociateResourceShareRequest>;
export interface DisassociateResourceShareResponse {
  resourceShareAssociations?: ResourceShareAssociation[];
  clientToken?: string;
}
export const DisassociateResourceShareResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceShareAssociations: S.optional(ResourceShareAssociationList),
    clientToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DisassociateResourceShareResponse",
}) as any as S.Schema<DisassociateResourceShareResponse>;
export interface DisassociateResourceSharePermissionRequest {
  resourceShareArn: string;
  permissionArn: string;
  clientToken?: string;
}
export const DisassociateResourceSharePermissionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      resourceShareArn: S.String,
      permissionArn: S.String,
      clientToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/disassociateresourcesharepermission" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DisassociateResourceSharePermissionRequest",
  }) as any as S.Schema<DisassociateResourceSharePermissionRequest>;
export interface DisassociateResourceSharePermissionResponse {
  returnValue?: boolean;
  clientToken?: string;
}
export const DisassociateResourceSharePermissionResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      returnValue: S.optional(S.Boolean),
      clientToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DisassociateResourceSharePermissionResponse",
  }) as any as S.Schema<DisassociateResourceSharePermissionResponse>;
export interface EnableSharingWithAwsOrganizationRequest {}
export const EnableSharingWithAwsOrganizationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/enablesharingwithawsorganization" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "EnableSharingWithAwsOrganizationRequest",
}) as any as S.Schema<EnableSharingWithAwsOrganizationRequest>;
export interface EnableSharingWithAwsOrganizationResponse {
  returnValue?: boolean;
}
export const EnableSharingWithAwsOrganizationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ returnValue: S.optional(S.Boolean).pipe(T.XmlName("return")) }),
).annotate({
  identifier: "EnableSharingWithAwsOrganizationResponse",
}) as any as S.Schema<EnableSharingWithAwsOrganizationResponse>;
export interface GetPermissionRequest {
  permissionArn: string;
  permissionVersion?: number;
}
export const GetPermissionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    permissionArn: S.String,
    permissionVersion: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/getpermission" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPermissionRequest",
}) as any as S.Schema<GetPermissionRequest>;
export interface GetPermissionResponse {
  permission?: ResourceSharePermissionDetail;
}
export const GetPermissionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ permission: S.optional(ResourceSharePermissionDetail) }),
).annotate({
  identifier: "GetPermissionResponse",
}) as any as S.Schema<GetPermissionResponse>;
export type MaxResults = number;
export interface GetResourcePoliciesRequest {
  resourceArns: string[];
  principal?: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetResourcePoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArns: ResourceArnList,
    principal: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/getresourcepolicies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourcePoliciesRequest",
}) as any as S.Schema<GetResourcePoliciesRequest>;
export type PolicyList = string[];
export const PolicyList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("item")),
);
export interface GetResourcePoliciesResponse {
  policies?: string[];
  nextToken?: string;
}
export const GetResourcePoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policies: S.optional(PolicyList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetResourcePoliciesResponse",
}) as any as S.Schema<GetResourcePoliciesResponse>;
export type ResourceShareArnList = string[];
export const ResourceShareArnList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("item")),
);
export interface GetResourceShareAssociationsRequest {
  associationType: ResourceShareAssociationType;
  resourceShareArns?: string[];
  resourceArn?: string;
  principal?: string;
  associationStatus?: ResourceShareAssociationStatus;
  nextToken?: string;
  maxResults?: number;
}
export const GetResourceShareAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    associationType: ResourceShareAssociationType,
    resourceShareArns: S.optional(ResourceShareArnList),
    resourceArn: S.optional(S.String),
    principal: S.optional(S.String),
    associationStatus: S.optional(ResourceShareAssociationStatus),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/getresourceshareassociations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourceShareAssociationsRequest",
}) as any as S.Schema<GetResourceShareAssociationsRequest>;
export interface GetResourceShareAssociationsResponse {
  resourceShareAssociations?: ResourceShareAssociation[];
  nextToken?: string;
}
export const GetResourceShareAssociationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      resourceShareAssociations: S.optional(ResourceShareAssociationList),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "GetResourceShareAssociationsResponse",
}) as any as S.Schema<GetResourceShareAssociationsResponse>;
export type ResourceShareInvitationArnList = string[];
export const ResourceShareInvitationArnList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("item")),
);
export interface GetResourceShareInvitationsRequest {
  resourceShareInvitationArns?: string[];
  resourceShareArns?: string[];
  nextToken?: string;
  maxResults?: number;
}
export const GetResourceShareInvitationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceShareInvitationArns: S.optional(ResourceShareInvitationArnList),
    resourceShareArns: S.optional(ResourceShareArnList),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/getresourceshareinvitations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourceShareInvitationsRequest",
}) as any as S.Schema<GetResourceShareInvitationsRequest>;
export type ResourceShareInvitationList = ResourceShareInvitation[];
export const ResourceShareInvitationList = /*@__PURE__*/ S.Array(
  ResourceShareInvitation.pipe(T.XmlName("item")).annotate({
    identifier: "ResourceShareInvitation",
  }),
);
export interface GetResourceShareInvitationsResponse {
  resourceShareInvitations?: ResourceShareInvitation[];
  nextToken?: string;
}
export const GetResourceShareInvitationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceShareInvitations: S.optional(ResourceShareInvitationList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetResourceShareInvitationsResponse",
}) as any as S.Schema<GetResourceShareInvitationsResponse>;
export type ResourceOwner = "SELF" | "OTHER-ACCOUNTS" | (string & {});
export const ResourceOwner = S.String;

export type TagValueList = string[];
export const TagValueList = /*@__PURE__*/ S.Array(S.String);
export interface TagFilter {
  tagKey?: string;
  tagValues?: string[];
}
export const TagFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tagKey: S.optional(S.String),
    tagValues: S.optional(TagValueList),
  }),
).annotate({ identifier: "TagFilter" }) as any as S.Schema<TagFilter>;
export type TagFilters = TagFilter[];
export const TagFilters = /*@__PURE__*/ S.Array(TagFilter);
export interface GetResourceSharesRequest {
  resourceShareArns?: string[];
  resourceShareStatus?: ResourceShareStatus;
  resourceOwner: ResourceOwner;
  name?: string;
  tagFilters?: TagFilter[];
  nextToken?: string;
  maxResults?: number;
  permissionArn?: string;
  permissionVersion?: number;
}
export const GetResourceSharesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceShareArns: S.optional(ResourceShareArnList),
    resourceShareStatus: S.optional(ResourceShareStatus),
    resourceOwner: ResourceOwner,
    name: S.optional(S.String),
    tagFilters: S.optional(TagFilters),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    permissionArn: S.optional(S.String),
    permissionVersion: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/getresourceshares" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourceSharesRequest",
}) as any as S.Schema<GetResourceSharesRequest>;
export type ResourceShareList = ResourceShare[];
export const ResourceShareList = /*@__PURE__*/ S.Array(
  ResourceShare.pipe(T.XmlName("item")).annotate({
    identifier: "ResourceShare",
  }),
);
export interface GetResourceSharesResponse {
  resourceShares?: ResourceShare[];
  nextToken?: string;
}
export const GetResourceSharesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceShares: S.optional(ResourceShareList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetResourceSharesResponse",
}) as any as S.Schema<GetResourceSharesResponse>;
export type ResourceRegionScopeFilter =
  | "ALL"
  | "REGIONAL"
  | "GLOBAL"
  | (string & {});
export const ResourceRegionScopeFilter = S.String;

export interface ListPendingInvitationResourcesRequest {
  resourceShareInvitationArn: string;
  nextToken?: string;
  maxResults?: number;
  resourceRegionScope?: ResourceRegionScopeFilter;
}
export const ListPendingInvitationResourcesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      resourceShareInvitationArn: S.String,
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
      resourceRegionScope: S.optional(ResourceRegionScopeFilter),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/listpendinginvitationresources" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListPendingInvitationResourcesRequest",
}) as any as S.Schema<ListPendingInvitationResourcesRequest>;
export type ResourceStatus =
  | "AVAILABLE"
  | "ZONAL_RESOURCE_INACCESSIBLE"
  | "LIMIT_EXCEEDED"
  | "UNAVAILABLE"
  | "PENDING"
  | (string & {});
export const ResourceStatus = S.String;

export type ResourceRegionScope = "REGIONAL" | "GLOBAL" | (string & {});
export const ResourceRegionScope = S.String;

export interface Resource {
  arn?: string;
  type?: string;
  resourceShareArn?: string;
  resourceGroupArn?: string;
  status?: ResourceStatus;
  statusMessage?: string;
  creationTime?: Date;
  lastUpdatedTime?: Date;
  resourceRegionScope?: ResourceRegionScope;
}
export const Resource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    type: S.optional(S.String),
    resourceShareArn: S.optional(S.String),
    resourceGroupArn: S.optional(S.String),
    status: S.optional(ResourceStatus),
    statusMessage: S.optional(S.String),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    resourceRegionScope: S.optional(ResourceRegionScope),
  }),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export type ResourceList = Resource[];
export const ResourceList = /*@__PURE__*/ S.Array(
  Resource.pipe(T.XmlName("item")).annotate({ identifier: "Resource" }),
);
export interface ListPendingInvitationResourcesResponse {
  resources?: Resource[];
  nextToken?: string;
}
export const ListPendingInvitationResourcesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      resources: S.optional(ResourceList),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListPendingInvitationResourcesResponse",
}) as any as S.Schema<ListPendingInvitationResourcesResponse>;
export interface ListPermissionAssociationsRequest {
  permissionArn?: string;
  permissionVersion?: number;
  associationStatus?: ResourceShareAssociationStatus;
  resourceType?: string;
  featureSet?: PermissionFeatureSet;
  defaultVersion?: boolean;
  nextToken?: string;
  maxResults?: number;
}
export const ListPermissionAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    permissionArn: S.optional(S.String),
    permissionVersion: S.optional(S.Number),
    associationStatus: S.optional(ResourceShareAssociationStatus),
    resourceType: S.optional(S.String),
    featureSet: S.optional(PermissionFeatureSet),
    defaultVersion: S.optional(S.Boolean),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listpermissionassociations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPermissionAssociationsRequest",
}) as any as S.Schema<ListPermissionAssociationsRequest>;
export interface AssociatedPermission {
  arn?: string;
  permissionVersion?: string;
  defaultVersion?: boolean;
  resourceType?: string;
  status?: string;
  featureSet?: PermissionFeatureSet;
  lastUpdatedTime?: Date;
  resourceShareArn?: string;
}
export const AssociatedPermission = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    permissionVersion: S.optional(S.String),
    defaultVersion: S.optional(S.Boolean),
    resourceType: S.optional(S.String),
    status: S.optional(S.String),
    featureSet: S.optional(PermissionFeatureSet),
    lastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    resourceShareArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AssociatedPermission",
}) as any as S.Schema<AssociatedPermission>;
export type AssociatedPermissionList = AssociatedPermission[];
export const AssociatedPermissionList = /*@__PURE__*/ S.Array(
  AssociatedPermission.pipe(T.XmlName("item")).annotate({
    identifier: "AssociatedPermission",
  }),
);
export interface ListPermissionAssociationsResponse {
  permissions?: AssociatedPermission[];
  nextToken?: string;
}
export const ListPermissionAssociationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    permissions: S.optional(AssociatedPermissionList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPermissionAssociationsResponse",
}) as any as S.Schema<ListPermissionAssociationsResponse>;
export type PermissionTypeFilter =
  | "ALL"
  | "AWS_MANAGED"
  | "CUSTOMER_MANAGED"
  | (string & {});
export const PermissionTypeFilter = S.String;

export interface ListPermissionsRequest {
  resourceType?: string;
  nextToken?: string;
  maxResults?: number;
  permissionType?: PermissionTypeFilter;
}
export const ListPermissionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    permissionType: S.optional(PermissionTypeFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listpermissions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPermissionsRequest",
}) as any as S.Schema<ListPermissionsRequest>;
export type ResourceSharePermissionList = ResourceSharePermissionSummary[];
export const ResourceSharePermissionList = /*@__PURE__*/ S.Array(
  ResourceSharePermissionSummary.pipe(T.XmlName("item")).annotate({
    identifier: "ResourceSharePermissionSummary",
  }),
);
export interface ListPermissionsResponse {
  permissions?: ResourceSharePermissionSummary[];
  nextToken?: string;
}
export const ListPermissionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    permissions: S.optional(ResourceSharePermissionList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPermissionsResponse",
}) as any as S.Schema<ListPermissionsResponse>;
export interface ListPermissionVersionsRequest {
  permissionArn: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListPermissionVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    permissionArn: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listpermissionversions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPermissionVersionsRequest",
}) as any as S.Schema<ListPermissionVersionsRequest>;
export interface ListPermissionVersionsResponse {
  permissions?: ResourceSharePermissionSummary[];
  nextToken?: string;
}
export const ListPermissionVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    permissions: S.optional(ResourceSharePermissionList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPermissionVersionsResponse",
}) as any as S.Schema<ListPermissionVersionsResponse>;
export interface ListPrincipalsRequest {
  resourceOwner: ResourceOwner;
  resourceArn?: string;
  principals?: string[];
  resourceType?: string;
  resourceShareArns?: string[];
  nextToken?: string;
  maxResults?: number;
}
export const ListPrincipalsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceOwner: ResourceOwner,
    resourceArn: S.optional(S.String),
    principals: S.optional(PrincipalArnOrIdList),
    resourceType: S.optional(S.String),
    resourceShareArns: S.optional(ResourceShareArnList),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listprincipals" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPrincipalsRequest",
}) as any as S.Schema<ListPrincipalsRequest>;
export interface Principal {
  id?: string;
  resourceShareArn?: string;
  creationTime?: Date;
  lastUpdatedTime?: Date;
  external?: boolean;
}
export const Principal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    resourceShareArn: S.optional(S.String),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    external: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Principal" }) as any as S.Schema<Principal>;
export type PrincipalList = Principal[];
export const PrincipalList = /*@__PURE__*/ S.Array(
  Principal.pipe(T.XmlName("item")).annotate({ identifier: "Principal" }),
);
export interface ListPrincipalsResponse {
  principals?: Principal[];
  nextToken?: string;
}
export const ListPrincipalsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    principals: S.optional(PrincipalList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPrincipalsResponse",
}) as any as S.Schema<ListPrincipalsResponse>;
export type ReplacePermissionAssociationsWorkIdList = string[];
export const ReplacePermissionAssociationsWorkIdList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("item")),
);
export type ReplacePermissionAssociationsWorkStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export const ReplacePermissionAssociationsWorkStatus = S.String;

export interface ListReplacePermissionAssociationsWorkRequest {
  workIds?: string[];
  status?: ReplacePermissionAssociationsWorkStatus;
  nextToken?: string;
  maxResults?: number;
}
export const ListReplacePermissionAssociationsWorkRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      workIds: S.optional(ReplacePermissionAssociationsWorkIdList),
      status: S.optional(ReplacePermissionAssociationsWorkStatus),
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/listreplacepermissionassociationswork",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListReplacePermissionAssociationsWorkRequest",
  }) as any as S.Schema<ListReplacePermissionAssociationsWorkRequest>;
export interface ReplacePermissionAssociationsWork {
  id?: string;
  fromPermissionArn?: string;
  fromPermissionVersion?: string;
  toPermissionArn?: string;
  toPermissionVersion?: string;
  status?: ReplacePermissionAssociationsWorkStatus;
  statusMessage?: string;
  creationTime?: Date;
  lastUpdatedTime?: Date;
}
export const ReplacePermissionAssociationsWork = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    fromPermissionArn: S.optional(S.String),
    fromPermissionVersion: S.optional(S.String),
    toPermissionArn: S.optional(S.String),
    toPermissionVersion: S.optional(S.String),
    status: S.optional(ReplacePermissionAssociationsWorkStatus),
    statusMessage: S.optional(S.String),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ReplacePermissionAssociationsWork",
}) as any as S.Schema<ReplacePermissionAssociationsWork>;
export type ReplacePermissionAssociationsWorkList =
  ReplacePermissionAssociationsWork[];
export const ReplacePermissionAssociationsWorkList = /*@__PURE__*/ S.Array(
  ReplacePermissionAssociationsWork.pipe(T.XmlName("item")).annotate({
    identifier: "ReplacePermissionAssociationsWork",
  }),
);
export interface ListReplacePermissionAssociationsWorkResponse {
  replacePermissionAssociationsWorks?: ReplacePermissionAssociationsWork[];
  nextToken?: string;
}
export const ListReplacePermissionAssociationsWorkResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      replacePermissionAssociationsWorks: S.optional(
        ReplacePermissionAssociationsWorkList,
      ),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListReplacePermissionAssociationsWorkResponse",
  }) as any as S.Schema<ListReplacePermissionAssociationsWorkResponse>;
export interface ListResourcesRequest {
  resourceOwner: ResourceOwner;
  principal?: string;
  resourceType?: string;
  resourceArns?: string[];
  resourceShareArns?: string[];
  nextToken?: string;
  maxResults?: number;
  resourceRegionScope?: ResourceRegionScopeFilter;
}
export const ListResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceOwner: ResourceOwner,
    principal: S.optional(S.String),
    resourceType: S.optional(S.String),
    resourceArns: S.optional(ResourceArnList),
    resourceShareArns: S.optional(ResourceShareArnList),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    resourceRegionScope: S.optional(ResourceRegionScopeFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listresources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResourcesRequest",
}) as any as S.Schema<ListResourcesRequest>;
export interface ListResourcesResponse {
  resources?: Resource[];
  nextToken?: string;
}
export const ListResourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resources: S.optional(ResourceList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourcesResponse",
}) as any as S.Schema<ListResourcesResponse>;
export interface ListResourceSharePermissionsRequest {
  resourceShareArn: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListResourceSharePermissionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceShareArn: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listresourcesharepermissions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResourceSharePermissionsRequest",
}) as any as S.Schema<ListResourceSharePermissionsRequest>;
export interface ListResourceSharePermissionsResponse {
  permissions?: ResourceSharePermissionSummary[];
  nextToken?: string;
}
export const ListResourceSharePermissionsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      permissions: S.optional(ResourceSharePermissionList),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListResourceSharePermissionsResponse",
}) as any as S.Schema<ListResourceSharePermissionsResponse>;
export interface ListResourceTypesRequest {
  nextToken?: string;
  maxResults?: number;
  resourceRegionScope?: ResourceRegionScopeFilter;
}
export const ListResourceTypesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    resourceRegionScope: S.optional(ResourceRegionScopeFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listresourcetypes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResourceTypesRequest",
}) as any as S.Schema<ListResourceTypesRequest>;
export interface ServiceNameAndResourceType {
  resourceType?: string;
  serviceName?: string;
  resourceRegionScope?: ResourceRegionScope;
}
export const ServiceNameAndResourceType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: S.optional(S.String),
    serviceName: S.optional(S.String),
    resourceRegionScope: S.optional(ResourceRegionScope),
  }),
).annotate({
  identifier: "ServiceNameAndResourceType",
}) as any as S.Schema<ServiceNameAndResourceType>;
export type ServiceNameAndResourceTypeList = ServiceNameAndResourceType[];
export const ServiceNameAndResourceTypeList = /*@__PURE__*/ S.Array(
  ServiceNameAndResourceType.pipe(T.XmlName("item")).annotate({
    identifier: "ServiceNameAndResourceType",
  }),
);
export interface ListResourceTypesResponse {
  resourceTypes?: ServiceNameAndResourceType[];
  nextToken?: string;
}
export const ListResourceTypesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceTypes: S.optional(ServiceNameAndResourceTypeList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourceTypesResponse",
}) as any as S.Schema<ListResourceTypesResponse>;
export interface ListSourceAssociationsRequest {
  resourceShareArns?: string[];
  sourceId?: string;
  sourceType?: string;
  associationStatus?: ResourceShareAssociationStatus;
  nextToken?: string;
  maxResults?: number;
}
export const ListSourceAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceShareArns: S.optional(ResourceShareArnList),
    sourceId: S.optional(S.String),
    sourceType: S.optional(S.String),
    associationStatus: S.optional(ResourceShareAssociationStatus),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listsourceassociations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSourceAssociationsRequest",
}) as any as S.Schema<ListSourceAssociationsRequest>;
export interface AssociatedSource {
  resourceShareArn?: string;
  sourceId?: string;
  sourceType?: string;
  status?: string;
  lastUpdatedTime?: Date;
  creationTime?: Date;
  statusMessage?: string;
}
export const AssociatedSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceShareArn: S.optional(S.String),
    sourceId: S.optional(S.String),
    sourceType: S.optional(S.String),
    status: S.optional(S.String),
    lastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    statusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "AssociatedSource",
}) as any as S.Schema<AssociatedSource>;
export type AssociatedSourceList = AssociatedSource[];
export const AssociatedSourceList = /*@__PURE__*/ S.Array(
  AssociatedSource.pipe(T.XmlName("item")).annotate({
    identifier: "AssociatedSource",
  }),
);
export interface ListSourceAssociationsResponse {
  sourceAssociations?: AssociatedSource[];
  nextToken?: string;
}
export const ListSourceAssociationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceAssociations: S.optional(AssociatedSourceList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSourceAssociationsResponse",
}) as any as S.Schema<ListSourceAssociationsResponse>;
export interface PromotePermissionCreatedFromPolicyRequest {
  permissionArn: string;
  name: string;
  clientToken?: string;
}
export const PromotePermissionCreatedFromPolicyRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      permissionArn: S.String,
      name: S.String,
      clientToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/promotepermissioncreatedfrompolicy" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PromotePermissionCreatedFromPolicyRequest",
  }) as any as S.Schema<PromotePermissionCreatedFromPolicyRequest>;
export interface PromotePermissionCreatedFromPolicyResponse {
  permission?: ResourceSharePermissionSummary;
  clientToken?: string;
}
export const PromotePermissionCreatedFromPolicyResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      permission: S.optional(ResourceSharePermissionSummary),
      clientToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "PromotePermissionCreatedFromPolicyResponse",
  }) as any as S.Schema<PromotePermissionCreatedFromPolicyResponse>;
export interface PromoteResourceShareCreatedFromPolicyRequest {
  resourceShareArn: string;
}
export const PromoteResourceShareCreatedFromPolicyRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      resourceShareArn: S.String.pipe(T.HttpQuery("resourceShareArn")),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/promoteresourcesharecreatedfrompolicy",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PromoteResourceShareCreatedFromPolicyRequest",
  }) as any as S.Schema<PromoteResourceShareCreatedFromPolicyRequest>;
export interface PromoteResourceShareCreatedFromPolicyResponse {
  returnValue?: boolean;
}
export const PromoteResourceShareCreatedFromPolicyResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ returnValue: S.optional(S.Boolean).pipe(T.XmlName("return")) }),
  ).annotate({
    identifier: "PromoteResourceShareCreatedFromPolicyResponse",
  }) as any as S.Schema<PromoteResourceShareCreatedFromPolicyResponse>;
export interface RejectResourceShareInvitationRequest {
  resourceShareInvitationArn: string;
  clientToken?: string;
}
export const RejectResourceShareInvitationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      resourceShareInvitationArn: S.String,
      clientToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/rejectresourceshareinvitation" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "RejectResourceShareInvitationRequest",
}) as any as S.Schema<RejectResourceShareInvitationRequest>;
export interface RejectResourceShareInvitationResponse {
  resourceShareInvitation?: ResourceShareInvitation;
  clientToken?: string;
}
export const RejectResourceShareInvitationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      resourceShareInvitation: S.optional(ResourceShareInvitation),
      clientToken: S.optional(S.String),
    }),
).annotate({
  identifier: "RejectResourceShareInvitationResponse",
}) as any as S.Schema<RejectResourceShareInvitationResponse>;
export interface ReplacePermissionAssociationsRequest {
  fromPermissionArn: string;
  fromPermissionVersion?: number;
  toPermissionArn: string;
  clientToken?: string;
}
export const ReplacePermissionAssociationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      fromPermissionArn: S.String,
      fromPermissionVersion: S.optional(S.Number),
      toPermissionArn: S.String,
      clientToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/replacepermissionassociations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ReplacePermissionAssociationsRequest",
}) as any as S.Schema<ReplacePermissionAssociationsRequest>;
export interface ReplacePermissionAssociationsResponse {
  replacePermissionAssociationsWork?: ReplacePermissionAssociationsWork;
  clientToken?: string;
}
export const ReplacePermissionAssociationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      replacePermissionAssociationsWork: S.optional(
        ReplacePermissionAssociationsWork,
      ),
      clientToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ReplacePermissionAssociationsResponse",
}) as any as S.Schema<ReplacePermissionAssociationsResponse>;
export interface SetDefaultPermissionVersionRequest {
  permissionArn: string;
  permissionVersion: number;
  clientToken?: string;
}
export const SetDefaultPermissionVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    permissionArn: S.String,
    permissionVersion: S.Number,
    clientToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/setdefaultpermissionversion" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SetDefaultPermissionVersionRequest",
}) as any as S.Schema<SetDefaultPermissionVersionRequest>;
export interface SetDefaultPermissionVersionResponse {
  returnValue?: boolean;
  clientToken?: string;
}
export const SetDefaultPermissionVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    returnValue: S.optional(S.Boolean).pipe(T.XmlName("return")),
    clientToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SetDefaultPermissionVersionResponse",
}) as any as S.Schema<SetDefaultPermissionVersionResponse>;
export interface TagResourceRequest {
  resourceShareArn?: string;
  tags: Tag[];
  resourceArn?: string;
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceShareArn: S.optional(S.String),
    tags: TagList,
    resourceArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tagresource" }),
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
  resourceShareArn?: string;
  tagKeys: string[];
  resourceArn?: string;
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceShareArn: S.optional(S.String),
    tagKeys: TagKeyList,
    resourceArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/untagresource" }),
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
export interface UpdateResourceShareRequest {
  resourceShareArn: string;
  name?: string;
  allowExternalPrincipals?: boolean;
  clientToken?: string;
}
export const UpdateResourceShareRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceShareArn: S.String,
    name: S.optional(S.String),
    allowExternalPrincipals: S.optional(S.Boolean),
    clientToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/updateresourceshare" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateResourceShareRequest",
}) as any as S.Schema<UpdateResourceShareRequest>;
export interface UpdateResourceShareResponse {
  resourceShare?: ResourceShare;
  clientToken?: string;
}
export const UpdateResourceShareResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceShare: S.optional(ResourceShare),
    clientToken: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateResourceShareResponse",
}) as any as S.Schema<UpdateResourceShareResponse>;
export type AcceptResourceShareInvitationError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | MalformedArnException
  | OperationNotPermittedException
  | ResourceShareInvitationAlreadyAcceptedException
  | ResourceShareInvitationAlreadyRejectedException
  | ResourceShareInvitationArnNotFoundException
  | ResourceShareInvitationExpiredException
  | ServerInternalException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Accepts an invitation to a resource share from another Amazon Web Services account. After you accept the
 * invitation, the resources included in the resource share are available to interact with in the
 * relevant Amazon Web Services Management Consoles and tools.
 */
export const acceptResourceShareInvitation: API.OperationMethod<
  AcceptResourceShareInvitationRequest,
  AcceptResourceShareInvitationResponse,
  AcceptResourceShareInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptResourceShareInvitationRequest,
  output: AcceptResourceShareInvitationResponse,
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    MalformedArnException,
    OperationNotPermittedException,
    ResourceShareInvitationAlreadyAcceptedException,
    ResourceShareInvitationAlreadyRejectedException,
    ResourceShareInvitationArnNotFoundException,
    ResourceShareInvitationExpiredException,
    ServerInternalException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptResourceShareInvitation",
}));

export type AssociateResourceShareError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | InvalidParameterException
  | InvalidStateTransitionException
  | MalformedArnException
  | OperationNotPermittedException
  | ResourceShareLimitExceededException
  | ServerInternalException
  | ServiceUnavailableException
  | ThrottlingException
  | UnknownResourceException
  | CommonErrors;
/**
 * Adds the specified list of principals, resources, and source constraints to a resource share. Principals that
 * already have access to this resource share immediately receive access to the added resources.
 * Newly added principals immediately receive access to the resources shared in this resource share.
 */
export const associateResourceShare: API.OperationMethod<
  AssociateResourceShareRequest,
  AssociateResourceShareResponse,
  AssociateResourceShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateResourceShareRequest,
  output: AssociateResourceShareResponse,
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    InvalidParameterException,
    InvalidStateTransitionException,
    MalformedArnException,
    OperationNotPermittedException,
    ResourceShareLimitExceededException,
    ServerInternalException,
    ServiceUnavailableException,
    ThrottlingException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateResourceShare",
}));

export type AssociateResourceSharePermissionError =
  | InvalidClientTokenException
  | InvalidParameterException
  | MalformedArnException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Adds or replaces the RAM permission for a resource type included in a resource share. You can
 * have exactly one permission associated with each resource type in the resource share. You can add
 * a new RAM permission only if there are currently no resources of that resource type
 * currently in the resource share.
 */
export const associateResourceSharePermission: API.OperationMethod<
  AssociateResourceSharePermissionRequest,
  AssociateResourceSharePermissionResponse,
  AssociateResourceSharePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateResourceSharePermissionRequest,
  output: AssociateResourceSharePermissionResponse,
  errors: [
    InvalidClientTokenException,
    InvalidParameterException,
    MalformedArnException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateResourceSharePermission",
}));

export type CreatePermissionError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | InvalidParameterException
  | InvalidPolicyException
  | MalformedPolicyTemplateException
  | OperationNotPermittedException
  | PermissionAlreadyExistsException
  | PermissionLimitExceededException
  | ServerInternalException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Creates a customer managed permission for a specified resource type that you can attach to resource shares.
 * It is created in the Amazon Web Services Region in which you call the operation.
 */
export const createPermission: API.OperationMethod<
  CreatePermissionRequest,
  CreatePermissionResponse,
  CreatePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePermissionRequest,
  output: CreatePermissionResponse,
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    InvalidParameterException,
    InvalidPolicyException,
    MalformedPolicyTemplateException,
    OperationNotPermittedException,
    PermissionAlreadyExistsException,
    PermissionLimitExceededException,
    ServerInternalException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePermission",
}));

export type CreatePermissionVersionError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | InvalidParameterException
  | InvalidPolicyException
  | MalformedArnException
  | MalformedPolicyTemplateException
  | PermissionVersionsLimitExceededException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Creates a new version of the specified customer managed permission. The new version is automatically set as
 * the default version of the customer managed permission. New resource shares automatically use the default
 * permission. Existing resource shares continue to use their original permission versions,
 * but you can use ReplacePermissionAssociations to update them.
 *
 * If the specified customer managed permission already has the maximum of 5 versions, then
 * you must delete one of the existing versions before you can create a new one.
 */
export const createPermissionVersion: API.OperationMethod<
  CreatePermissionVersionRequest,
  CreatePermissionVersionResponse,
  CreatePermissionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePermissionVersionRequest,
  output: CreatePermissionVersionResponse,
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    InvalidParameterException,
    InvalidPolicyException,
    MalformedArnException,
    MalformedPolicyTemplateException,
    PermissionVersionsLimitExceededException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePermissionVersion",
}));

export type CreateResourceShareError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | InvalidParameterException
  | InvalidStateTransitionException
  | MalformedArnException
  | OperationNotPermittedException
  | ResourceShareLimitExceededException
  | ServerInternalException
  | ServiceUnavailableException
  | TagLimitExceededException
  | TagPolicyViolationException
  | ThrottlingException
  | UnknownResourceException
  | CommonErrors;
/**
 * Creates a resource share. You can provide a list of the Amazon Resource Names (ARNs) for the resources that you
 * want to share, a list of principals you want to share the resources with, the
 * permissions to grant those principals, and optionally source constraints to enhance security for service principal sharing.
 *
 * Sharing a resource makes it available for use by principals outside of the
 * Amazon Web Services account that created the resource. Sharing doesn't change any permissions or
 * quotas that apply to the resource in the account that created it.
 */
export const createResourceShare: API.OperationMethod<
  CreateResourceShareRequest,
  CreateResourceShareResponse,
  CreateResourceShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateResourceShareRequest,
  output: CreateResourceShareResponse,
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    InvalidParameterException,
    InvalidStateTransitionException,
    MalformedArnException,
    OperationNotPermittedException,
    ResourceShareLimitExceededException,
    ServerInternalException,
    ServiceUnavailableException,
    TagLimitExceededException,
    TagPolicyViolationException,
    ThrottlingException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceShare",
}));

export type DeletePermissionError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | MalformedArnException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Deletes the specified customer managed permission in the Amazon Web Services Region in which you call this operation. You
 * can delete a customer managed permission only if it isn't attached to any resource share. The operation deletes all
 * versions associated with the customer managed permission.
 */
export const deletePermission: API.OperationMethod<
  DeletePermissionRequest,
  DeletePermissionResponse,
  DeletePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePermissionRequest,
  output: DeletePermissionResponse,
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    MalformedArnException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePermission",
}));

export type DeletePermissionVersionError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | InvalidParameterException
  | MalformedArnException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Deletes one version of a customer managed permission. The version you specify must not be attached to any
 * resource share and must not be the default version for the permission.
 *
 * If a customer managed permission has the maximum of 5 versions, then you must delete at
 * least one version before you can create another.
 */
export const deletePermissionVersion: API.OperationMethod<
  DeletePermissionVersionRequest,
  DeletePermissionVersionResponse,
  DeletePermissionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePermissionVersionRequest,
  output: DeletePermissionVersionResponse,
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    InvalidParameterException,
    MalformedArnException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePermissionVersion",
}));

export type DeleteResourceShareError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | InvalidParameterException
  | InvalidStateTransitionException
  | MalformedArnException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | ThrottlingException
  | UnknownResourceException
  | CommonErrors;
/**
 * Deletes the specified resource share.
 *
 * This doesn't delete any of the resources that were associated with the resource share; it
 * only stops the sharing of those resources through this resource share.
 */
export const deleteResourceShare: API.OperationMethod<
  DeleteResourceShareRequest,
  DeleteResourceShareResponse,
  DeleteResourceShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourceShareRequest,
  output: DeleteResourceShareResponse,
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    InvalidParameterException,
    InvalidStateTransitionException,
    MalformedArnException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    ThrottlingException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceShare",
}));

export type DisassociateResourceShareError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | InvalidParameterException
  | InvalidStateTransitionException
  | MalformedArnException
  | OperationNotPermittedException
  | ResourceShareLimitExceededException
  | ServerInternalException
  | ServiceUnavailableException
  | ThrottlingException
  | UnknownResourceException
  | CommonErrors;
/**
 * Removes the specified principals, resources, or source constraints from participating in the specified
 * resource share.
 */
export const disassociateResourceShare: API.OperationMethod<
  DisassociateResourceShareRequest,
  DisassociateResourceShareResponse,
  DisassociateResourceShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateResourceShareRequest,
  output: DisassociateResourceShareResponse,
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    InvalidParameterException,
    InvalidStateTransitionException,
    MalformedArnException,
    OperationNotPermittedException,
    ResourceShareLimitExceededException,
    ServerInternalException,
    ServiceUnavailableException,
    ThrottlingException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateResourceShare",
}));

export type DisassociateResourceSharePermissionError =
  | InvalidClientTokenException
  | InvalidParameterException
  | InvalidStateTransitionException
  | MalformedArnException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Removes a managed permission from a resource share. Permission changes take effect immediately. You can
 * remove a managed permission from a resource share only if there are currently no resources of the relevant
 * resource type currently attached to the resource share.
 */
export const disassociateResourceSharePermission: API.OperationMethod<
  DisassociateResourceSharePermissionRequest,
  DisassociateResourceSharePermissionResponse,
  DisassociateResourceSharePermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateResourceSharePermissionRequest,
  output: DisassociateResourceSharePermissionResponse,
  errors: [
    InvalidClientTokenException,
    InvalidParameterException,
    InvalidStateTransitionException,
    MalformedArnException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateResourceSharePermission",
}));

export type EnableSharingWithAwsOrganizationError =
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Enables resource sharing within your organization in Organizations. This operation creates
 * a service-linked role called `AWSServiceRoleForResourceAccessManager` that has the IAM managed policy
 * named AWSResourceAccessManagerServiceRolePolicy attached. This role permits RAM to retrieve information about
 * the organization and its structure. This lets you share resources with all of the
 * accounts in the calling account's organization by specifying the organization ID, or all
 * of the accounts in an organizational unit (OU) by specifying the OU ID. Until you enable
 * sharing within the organization, you can specify only individual Amazon Web Services accounts, or for
 * supported resource types, IAM roles and users.
 *
 * You must call this operation from an IAM role or user in the organization's
 * management account.
 */
export const enableSharingWithAwsOrganization: API.OperationMethod<
  EnableSharingWithAwsOrganizationRequest,
  EnableSharingWithAwsOrganizationResponse,
  EnableSharingWithAwsOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableSharingWithAwsOrganizationRequest,
  output: EnableSharingWithAwsOrganizationResponse,
  errors: [
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableSharingWithAwsOrganization",
}));

export type GetPermissionError =
  | InvalidParameterException
  | MalformedArnException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Retrieves the contents of a managed permission in JSON format.
 */
export const getPermission: API.OperationMethod<
  GetPermissionRequest,
  GetPermissionResponse,
  GetPermissionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPermissionRequest,
  output: GetPermissionResponse,
  errors: [
    InvalidParameterException,
    MalformedArnException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPermission",
}));

export type GetResourcePoliciesError =
  | InvalidNextTokenException
  | InvalidParameterException
  | MalformedArnException
  | ResourceArnNotFoundException
  | ServerInternalException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves the resource policies for the specified resources that you own and have
 * shared.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const getResourcePolicies: API.PaginatedOperationMethod<
  GetResourcePoliciesRequest,
  GetResourcePoliciesResponse,
  GetResourcePoliciesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetResourcePoliciesRequest,
  output: GetResourcePoliciesResponse,
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    MalformedArnException,
    ResourceArnNotFoundException,
    ServerInternalException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetResourceShareAssociationsError =
  | InvalidNextTokenException
  | InvalidParameterException
  | MalformedArnException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Retrieves the lists of resources and principals that associated for resource shares that you
 * own.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const getResourceShareAssociations: API.PaginatedOperationMethod<
  GetResourceShareAssociationsRequest,
  GetResourceShareAssociationsResponse,
  GetResourceShareAssociationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetResourceShareAssociationsRequest,
  output: GetResourceShareAssociationsResponse,
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    MalformedArnException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceShareAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetResourceShareInvitationsError =
  | InvalidMaxResultsException
  | InvalidNextTokenException
  | InvalidParameterException
  | MalformedArnException
  | ResourceShareInvitationArnNotFoundException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Retrieves details about invitations that you have received for resource shares.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const getResourceShareInvitations: API.PaginatedOperationMethod<
  GetResourceShareInvitationsRequest,
  GetResourceShareInvitationsResponse,
  GetResourceShareInvitationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetResourceShareInvitationsRequest,
  output: GetResourceShareInvitationsResponse,
  errors: [
    InvalidMaxResultsException,
    InvalidNextTokenException,
    InvalidParameterException,
    MalformedArnException,
    ResourceShareInvitationArnNotFoundException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceShareInvitations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetResourceSharesError =
  | InvalidNextTokenException
  | InvalidParameterException
  | MalformedArnException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Retrieves details about the resource shares that you own or that are shared with you.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const getResourceShares: API.PaginatedOperationMethod<
  GetResourceSharesRequest,
  GetResourceSharesResponse,
  GetResourceSharesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetResourceSharesRequest,
  output: GetResourceSharesResponse,
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    MalformedArnException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceShares",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPendingInvitationResourcesError =
  | InvalidNextTokenException
  | InvalidParameterException
  | MalformedArnException
  | MissingRequiredParameterException
  | ResourceShareInvitationAlreadyRejectedException
  | ResourceShareInvitationArnNotFoundException
  | ResourceShareInvitationExpiredException
  | ServerInternalException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the resources in a resource share that is shared with you but for which the invitation is
 * still `PENDING`. That means that you haven't accepted or rejected the
 * invitation and the invitation hasn't expired.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const listPendingInvitationResources: API.PaginatedOperationMethod<
  ListPendingInvitationResourcesRequest,
  ListPendingInvitationResourcesResponse,
  ListPendingInvitationResourcesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPendingInvitationResourcesRequest,
  output: ListPendingInvitationResourcesResponse,
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    MalformedArnException,
    MissingRequiredParameterException,
    ResourceShareInvitationAlreadyRejectedException,
    ResourceShareInvitationArnNotFoundException,
    ResourceShareInvitationExpiredException,
    ServerInternalException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPendingInvitationResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPermissionAssociationsError =
  | InvalidNextTokenException
  | InvalidParameterException
  | MalformedArnException
  | ServerInternalException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists information about the managed permission and its associations to any resource shares that use
 * this managed permission. This lets you see which resource shares use which versions of the specified
 * managed permission.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const listPermissionAssociations: API.PaginatedOperationMethod<
  ListPermissionAssociationsRequest,
  ListPermissionAssociationsResponse,
  ListPermissionAssociationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPermissionAssociationsRequest,
  output: ListPermissionAssociationsResponse,
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    MalformedArnException,
    ServerInternalException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPermissionAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPermissionsError =
  | InvalidNextTokenException
  | InvalidParameterException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves a list of available RAM permissions that you can use for the supported
 * resource types.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const listPermissions: API.PaginatedOperationMethod<
  ListPermissionsRequest,
  ListPermissionsResponse,
  ListPermissionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPermissionsRequest,
  output: ListPermissionsResponse,
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPermissions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPermissionVersionsError =
  | InvalidNextTokenException
  | InvalidParameterException
  | MalformedArnException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Lists the available versions of the specified RAM permission.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const listPermissionVersions: API.PaginatedOperationMethod<
  ListPermissionVersionsRequest,
  ListPermissionVersionsResponse,
  ListPermissionVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPermissionVersionsRequest,
  output: ListPermissionVersionsResponse,
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    MalformedArnException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPermissionVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPrincipalsError =
  | InvalidNextTokenException
  | InvalidParameterException
  | MalformedArnException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Lists the principals that you are sharing resources with or that are sharing resources
 * with you.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const listPrincipals: API.PaginatedOperationMethod<
  ListPrincipalsRequest,
  ListPrincipalsResponse,
  ListPrincipalsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPrincipalsRequest,
  output: ListPrincipalsResponse,
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    MalformedArnException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrincipals",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReplacePermissionAssociationsWorkError =
  | InvalidNextTokenException
  | InvalidParameterException
  | ServerInternalException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Retrieves the current status of the asynchronous tasks performed by RAM when you
 * perform the ReplacePermissionAssociationsWork operation.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const listReplacePermissionAssociationsWork: API.PaginatedOperationMethod<
  ListReplacePermissionAssociationsWorkRequest,
  ListReplacePermissionAssociationsWorkResponse,
  ListReplacePermissionAssociationsWorkError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReplacePermissionAssociationsWorkRequest,
  output: ListReplacePermissionAssociationsWorkResponse,
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    ServerInternalException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReplacePermissionAssociationsWork",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResourcesError =
  | InvalidNextTokenException
  | InvalidParameterException
  | InvalidResourceTypeException
  | MalformedArnException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Lists the resources that you added to a resource share or the resources that are shared with
 * you.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const listResources: API.PaginatedOperationMethod<
  ListResourcesRequest,
  ListResourcesResponse,
  ListResourcesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourcesRequest,
  output: ListResourcesResponse,
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    InvalidResourceTypeException,
    MalformedArnException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResourceSharePermissionsError =
  | InvalidNextTokenException
  | InvalidParameterException
  | MalformedArnException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Lists the RAM permissions that are associated with a resource share.
 *
 * Always check the `NextToken` response parameter for a `null` value
 * when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more
 * results available. The `NextToken` response parameter value is `null`
 * *only*
 * when there are no more results to display.
 */
export const listResourceSharePermissions: API.PaginatedOperationMethod<
  ListResourceSharePermissionsRequest,
  ListResourceSharePermissionsResponse,
  ListResourceSharePermissionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourceSharePermissionsRequest,
  output: ListResourceSharePermissionsResponse,
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    MalformedArnException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceSharePermissions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResourceTypesError =
  | InvalidNextTokenException
  | InvalidParameterException
  | ServerInternalException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists the resource types that can be shared by RAM.
 */
export const listResourceTypes: API.PaginatedOperationMethod<
  ListResourceTypesRequest,
  ListResourceTypesResponse,
  ListResourceTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourceTypesRequest,
  output: ListResourceTypesResponse,
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    ServerInternalException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSourceAssociationsError =
  | InvalidNextTokenException
  | InvalidParameterException
  | MalformedArnException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Lists source associations for resource shares. Source associations control which sources can be used with service principals in resource shares. This operation provides visibility into source associations for resource share owners.
 *
 * You can filter the results by resource share Amazon Resource Name (ARN), source ID, source type, or association status. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const listSourceAssociations: API.PaginatedOperationMethod<
  ListSourceAssociationsRequest,
  ListSourceAssociationsResponse,
  ListSourceAssociationsError,
  Credentials | HttpClient.HttpClient,
  AssociatedSource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSourceAssociationsRequest,
  output: ListSourceAssociationsResponse,
  errors: [
    InvalidNextTokenException,
    InvalidParameterException,
    MalformedArnException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSourceAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sourceAssociations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PromotePermissionCreatedFromPolicyError =
  | InvalidParameterException
  | InvalidPolicyException
  | MalformedArnException
  | MissingRequiredParameterException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * When you attach a resource-based policy to a resource, RAM automatically creates
 * a resource share of `featureSet`=`CREATED_FROM_POLICY` with a managed permission that
 * has the same IAM permissions as the original resource-based policy. However, this type
 * of managed permission is visible to only the resource share owner, and the associated resource share can't be modified by
 * using RAM.
 *
 * This operation creates a separate, fully manageable customer managed permission that has the same IAM
 * permissions as the original resource-based policy. You can associate this customer managed permission to any
 * resource shares.
 *
 * Before you use PromoteResourceShareCreatedFromPolicy, you should
 * first run this operation to ensure that you have an appropriate customer managed permission that can be
 * associated with the promoted resource share.
 *
 * - The original `CREATED_FROM_POLICY` policy isn't deleted, and
 * resource shares using that original policy aren't automatically
 * updated.
 *
 * - You can't modify a `CREATED_FROM_POLICY` resource share so you can't
 * associate the new customer managed permission by using
 * `ReplacePermsissionAssociations`. However, if you use PromoteResourceShareCreatedFromPolicy, that operation
 * automatically associates the fully manageable customer managed permission to the newly promoted
 * `STANDARD` resource share.
 *
 * - After you promote a resource share, if the original `CREATED_FROM_POLICY`
 * managed permission has no other associations to A resource share, then RAM automatically deletes
 * it.
 */
export const promotePermissionCreatedFromPolicy: API.OperationMethod<
  PromotePermissionCreatedFromPolicyRequest,
  PromotePermissionCreatedFromPolicyResponse,
  PromotePermissionCreatedFromPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PromotePermissionCreatedFromPolicyRequest,
  output: PromotePermissionCreatedFromPolicyResponse,
  errors: [
    InvalidParameterException,
    InvalidPolicyException,
    MalformedArnException,
    MissingRequiredParameterException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PromotePermissionCreatedFromPolicy",
}));

export type PromoteResourceShareCreatedFromPolicyError =
  | InvalidParameterException
  | InvalidStateTransitionException
  | MalformedArnException
  | MissingRequiredParameterException
  | OperationNotPermittedException
  | ResourceShareLimitExceededException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | UnmatchedPolicyPermissionException
  | CommonErrors;
/**
 * When you attach a resource-based policy to a resource, RAM automatically creates
 * a resource share of `featureSet`=`CREATED_FROM_POLICY` with a managed permission that
 * has the same IAM permissions as the original resource-based policy. However, this type
 * of managed permission is visible to only the resource share owner, and the associated resource share can't be modified by
 * using RAM.
 *
 * This operation promotes the resource share to a `STANDARD` resource share that is fully
 * manageable in RAM. When you promote a resource share, you can then manage the resource share in RAM and
 * it becomes visible to all of the principals you shared it with.
 *
 * Before you perform this operation, you should first run PromotePermissionCreatedFromPolicyto ensure that you have an
 * appropriate customer managed permission that can be associated with this resource share after its is promoted. If
 * this operation can't find a managed permission that exactly matches the existing
 * `CREATED_FROM_POLICY` permission, then this operation fails.
 */
export const promoteResourceShareCreatedFromPolicy: API.OperationMethod<
  PromoteResourceShareCreatedFromPolicyRequest,
  PromoteResourceShareCreatedFromPolicyResponse,
  PromoteResourceShareCreatedFromPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PromoteResourceShareCreatedFromPolicyRequest,
  output: PromoteResourceShareCreatedFromPolicyResponse,
  errors: [
    InvalidParameterException,
    InvalidStateTransitionException,
    MalformedArnException,
    MissingRequiredParameterException,
    OperationNotPermittedException,
    ResourceShareLimitExceededException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
    UnmatchedPolicyPermissionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PromoteResourceShareCreatedFromPolicy",
}));

export type RejectResourceShareInvitationError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | MalformedArnException
  | OperationNotPermittedException
  | ResourceShareInvitationAlreadyAcceptedException
  | ResourceShareInvitationAlreadyRejectedException
  | ResourceShareInvitationArnNotFoundException
  | ResourceShareInvitationExpiredException
  | ServerInternalException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Rejects an invitation to a resource share from another Amazon Web Services account.
 */
export const rejectResourceShareInvitation: API.OperationMethod<
  RejectResourceShareInvitationRequest,
  RejectResourceShareInvitationResponse,
  RejectResourceShareInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectResourceShareInvitationRequest,
  output: RejectResourceShareInvitationResponse,
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    MalformedArnException,
    OperationNotPermittedException,
    ResourceShareInvitationAlreadyAcceptedException,
    ResourceShareInvitationAlreadyRejectedException,
    ResourceShareInvitationArnNotFoundException,
    ResourceShareInvitationExpiredException,
    ServerInternalException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectResourceShareInvitation",
}));

export type ReplacePermissionAssociationsError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | InvalidParameterException
  | MalformedArnException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Updates all resource shares that use a managed permission to a different managed
 * permission. This operation always applies the default version of the target managed
 * permission. You can optionally specify that the update applies to only resource shares that
 * currently use a specified version. This enables you to update to the latest version,
 * without changing the which managed permission is used.
 *
 * You can use this operation to update all of your resource shares to use the current
 * default version of the permission by specifying the same value for the
 * `fromPermissionArn` and `toPermissionArn` parameters.
 *
 * You can use the optional `fromPermissionVersion` parameter to update only
 * those resources that use a specified version of the managed permission to the new managed
 * permission.
 *
 * To successfully perform this operation, you must have permission to update the
 * resource-based policy on all affected resource types.
 */
export const replacePermissionAssociations: API.OperationMethod<
  ReplacePermissionAssociationsRequest,
  ReplacePermissionAssociationsResponse,
  ReplacePermissionAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ReplacePermissionAssociationsRequest,
  output: ReplacePermissionAssociationsResponse,
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    InvalidParameterException,
    MalformedArnException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReplacePermissionAssociations",
}));

export type SetDefaultPermissionVersionError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | InvalidParameterException
  | MalformedArnException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Designates the specified version number as the default version for the specified
 * customer managed permission. New resource shares automatically use this new default permission. Existing
 * resource shares continue to use their original permission version, but you can use ReplacePermissionAssociations to update them.
 */
export const setDefaultPermissionVersion: API.OperationMethod<
  SetDefaultPermissionVersionRequest,
  SetDefaultPermissionVersionResponse,
  SetDefaultPermissionVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetDefaultPermissionVersionRequest,
  output: SetDefaultPermissionVersionResponse,
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    InvalidParameterException,
    MalformedArnException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetDefaultPermissionVersion",
}));

export type TagResourceError =
  | InvalidParameterException
  | MalformedArnException
  | ResourceArnNotFoundException
  | ServerInternalException
  | ServiceUnavailableException
  | TagLimitExceededException
  | TagPolicyViolationException
  | UnknownResourceException
  | CommonErrors;
/**
 * Adds the specified tag keys and values to a resource share or managed permission. If you choose a resource share, the
 * tags are attached to only the resource share, not to the resources that are in the resource share.
 *
 * The tags on a managed permission are the same for all versions of the managed permission.
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
    MalformedArnException,
    ResourceArnNotFoundException,
    ServerInternalException,
    ServiceUnavailableException,
    TagLimitExceededException,
    TagPolicyViolationException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InvalidParameterException
  | MalformedArnException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Removes the specified tag key and value pairs from the specified resource share or managed permission.
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
    MalformedArnException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateResourceShareError =
  | IdempotentParameterMismatchException
  | InvalidClientTokenException
  | InvalidParameterException
  | MalformedArnException
  | MissingRequiredParameterException
  | OperationNotPermittedException
  | ServerInternalException
  | ServiceUnavailableException
  | UnknownResourceException
  | CommonErrors;
/**
 * Modifies some of the properties of the specified resource share.
 */
export const updateResourceShare: API.OperationMethod<
  UpdateResourceShareRequest,
  UpdateResourceShareResponse,
  UpdateResourceShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateResourceShareRequest,
  output: UpdateResourceShareResponse,
  errors: [
    IdempotentParameterMismatchException,
    InvalidClientTokenException,
    InvalidParameterException,
    MalformedArnException,
    MissingRequiredParameterException,
    OperationNotPermittedException,
    ServerInternalException,
    ServiceUnavailableException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResourceShare",
}));
