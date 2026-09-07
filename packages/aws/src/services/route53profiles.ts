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
  sdkId: "Route53Profiles",
  serviceShapeName: "Route53Profiles",
});
const auth = T.AwsAuthSigv4({ name: "route53profiles" });
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
              `https://route53profiles-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://route53profiles-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://route53profiles.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://route53profiles.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InternalServiceErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceErrorException>()(
    "InternalServiceErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      FieldName: S.optional(S.String),
    },
  ) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceType: S.optional(S.String),
    },
  ) {}
export class ResourceExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceExistsException>()(
    "ResourceExistsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceType: S.optional(S.String),
    },
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceType: S.optional(S.String),
    },
  ) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type ResourceId = string;
export type Name = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface AssociateProfileRequest {
  ProfileId: string;
  ResourceId: string;
  Name: string;
  Tags?: Tag[];
}
export const AssociateProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileId: S.String,
    ResourceId: S.String,
    Name: S.String,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/profileassociation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateProfileRequest",
}) as any as S.Schema<AssociateProfileRequest>;
export type AccountId = string;
export type ProfileStatus =
  | "COMPLETE"
  | "DELETING"
  | "UPDATING"
  | "CREATING"
  | "DELETED"
  | "FAILED"
  | (string & {});
export const ProfileStatus = S.String;

export type Rfc3339Timestamp = Date;
export interface ProfileAssociation {
  Id?: string;
  Name?: string;
  OwnerId?: string;
  ProfileId?: string;
  ResourceId?: string;
  Status?: ProfileStatus;
  StatusMessage?: string;
  CreationTime?: Date;
  ModificationTime?: Date;
}
export const ProfileAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    OwnerId: S.optional(S.String),
    ProfileId: S.optional(S.String),
    ResourceId: S.optional(S.String),
    Status: S.optional(ProfileStatus),
    StatusMessage: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ProfileAssociation",
}) as any as S.Schema<ProfileAssociation>;
export interface AssociateProfileResponse {
  ProfileAssociation?: ProfileAssociation;
}
export const AssociateProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProfileAssociation: S.optional(ProfileAssociation) }),
).annotate({
  identifier: "AssociateProfileResponse",
}) as any as S.Schema<AssociateProfileResponse>;
export type Arn = string;
export type ResourceProperties = string;
export interface AssociateResourceToProfileRequest {
  ProfileId: string;
  ResourceArn: string;
  Name: string;
  ResourceProperties?: string;
}
export const AssociateResourceToProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileId: S.String,
    ResourceArn: S.String,
    Name: S.String,
    ResourceProperties: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/profileresourceassociation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateResourceToProfileRequest",
}) as any as S.Schema<AssociateResourceToProfileRequest>;
export interface ProfileResourceAssociation {
  Id?: string;
  Name?: string;
  OwnerId?: string;
  ProfileId?: string;
  ResourceArn?: string;
  ResourceType?: string;
  ResourceProperties?: string;
  Status?: ProfileStatus;
  StatusMessage?: string;
  CreationTime?: Date;
  ModificationTime?: Date;
}
export const ProfileResourceAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    OwnerId: S.optional(S.String),
    ProfileId: S.optional(S.String),
    ResourceArn: S.optional(S.String),
    ResourceType: S.optional(S.String),
    ResourceProperties: S.optional(S.String),
    Status: S.optional(ProfileStatus),
    StatusMessage: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ProfileResourceAssociation",
}) as any as S.Schema<ProfileResourceAssociation>;
export interface AssociateResourceToProfileResponse {
  ProfileResourceAssociation?: ProfileResourceAssociation;
}
export const AssociateResourceToProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileResourceAssociation: S.optional(ProfileResourceAssociation),
  }),
).annotate({
  identifier: "AssociateResourceToProfileResponse",
}) as any as S.Schema<AssociateResourceToProfileResponse>;
export type CreatorRequestId = string;
export interface CreateProfileRequest {
  Name: string;
  ClientToken: string;
  Tags?: Tag[];
}
export const CreateProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    ClientToken: S.String.pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/profile" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateProfileRequest",
}) as any as S.Schema<CreateProfileRequest>;
export type ShareStatus =
  | "NOT_SHARED"
  | "SHARED_WITH_ME"
  | "SHARED_BY_ME"
  | (string & {});
export const ShareStatus = S.String;

export interface Profile {
  Id?: string;
  Arn?: string;
  Name?: string;
  OwnerId?: string;
  Status?: ProfileStatus;
  StatusMessage?: string;
  ShareStatus?: ShareStatus;
  CreationTime?: Date;
  ModificationTime?: Date;
  ClientToken?: string;
}
export const Profile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    OwnerId: S.optional(S.String),
    Status: S.optional(ProfileStatus),
    StatusMessage: S.optional(S.String),
    ShareStatus: S.optional(ShareStatus),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ClientToken: S.optional(S.String),
  }),
).annotate({ identifier: "Profile" }) as any as S.Schema<Profile>;
export interface CreateProfileResponse {
  Profile?: Profile;
}
export const CreateProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Profile: S.optional(Profile) }),
).annotate({
  identifier: "CreateProfileResponse",
}) as any as S.Schema<CreateProfileResponse>;
export interface DeleteProfileRequest {
  ProfileId: string;
}
export const DeleteProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProfileId: S.String.pipe(T.HttpLabel("ProfileId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/profile/{ProfileId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteProfileRequest",
}) as any as S.Schema<DeleteProfileRequest>;
export interface DeleteProfileResponse {
  Profile?: Profile;
}
export const DeleteProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Profile: S.optional(Profile) }),
).annotate({
  identifier: "DeleteProfileResponse",
}) as any as S.Schema<DeleteProfileResponse>;
export interface DisassociateProfileRequest {
  ProfileId: string;
  ResourceId: string;
}
export const DisassociateProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileId: S.String.pipe(T.HttpLabel("ProfileId")),
    ResourceId: S.String.pipe(T.HttpLabel("ResourceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/profileassociation/Profileid/{ProfileId}/resourceid/{ResourceId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateProfileRequest",
}) as any as S.Schema<DisassociateProfileRequest>;
export interface DisassociateProfileResponse {
  ProfileAssociation?: ProfileAssociation;
}
export const DisassociateProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProfileAssociation: S.optional(ProfileAssociation) }),
).annotate({
  identifier: "DisassociateProfileResponse",
}) as any as S.Schema<DisassociateProfileResponse>;
export interface DisassociateResourceFromProfileRequest {
  ProfileId: string;
  ResourceArn: string;
}
export const DisassociateResourceFromProfileRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProfileId: S.String.pipe(T.HttpLabel("ProfileId")),
      ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/profileresourceassociation/profileid/{ProfileId}/resourcearn/{ResourceArn}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DisassociateResourceFromProfileRequest",
}) as any as S.Schema<DisassociateResourceFromProfileRequest>;
export interface DisassociateResourceFromProfileResponse {
  ProfileResourceAssociation?: ProfileResourceAssociation;
}
export const DisassociateResourceFromProfileResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProfileResourceAssociation: S.optional(ProfileResourceAssociation),
    }),
).annotate({
  identifier: "DisassociateResourceFromProfileResponse",
}) as any as S.Schema<DisassociateResourceFromProfileResponse>;
export interface GetProfileRequest {
  ProfileId: string;
}
export const GetProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProfileId: S.String.pipe(T.HttpLabel("ProfileId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/profile/{ProfileId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetProfileRequest",
}) as any as S.Schema<GetProfileRequest>;
export interface GetProfileResponse {
  Profile?: Profile;
}
export const GetProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Profile: S.optional(Profile) }),
).annotate({
  identifier: "GetProfileResponse",
}) as any as S.Schema<GetProfileResponse>;
export interface GetProfileAssociationRequest {
  ProfileAssociationId: string;
}
export const GetProfileAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileAssociationId: S.String.pipe(T.HttpLabel("ProfileAssociationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/profileassociation/{ProfileAssociationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetProfileAssociationRequest",
}) as any as S.Schema<GetProfileAssociationRequest>;
export interface GetProfileAssociationResponse {
  ProfileAssociation?: ProfileAssociation;
}
export const GetProfileAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProfileAssociation: S.optional(ProfileAssociation) }),
).annotate({
  identifier: "GetProfileAssociationResponse",
}) as any as S.Schema<GetProfileAssociationResponse>;
export interface GetProfileResourceAssociationRequest {
  ProfileResourceAssociationId: string;
}
export const GetProfileResourceAssociationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProfileResourceAssociationId: S.String.pipe(
        T.HttpLabel("ProfileResourceAssociationId"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/profileresourceassociation/{ProfileResourceAssociationId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetProfileResourceAssociationRequest",
}) as any as S.Schema<GetProfileResourceAssociationRequest>;
export interface GetProfileResourceAssociationResponse {
  ProfileResourceAssociation?: ProfileResourceAssociation;
}
export const GetProfileResourceAssociationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProfileResourceAssociation: S.optional(ProfileResourceAssociation),
    }),
).annotate({
  identifier: "GetProfileResourceAssociationResponse",
}) as any as S.Schema<GetProfileResourceAssociationResponse>;
export type MaxResults = number;
export type NextToken = string;
export interface ListProfileAssociationsRequest {
  ResourceId?: string;
  ProfileId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListProfileAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.optional(S.String).pipe(T.HttpQuery("resourceId")),
    ProfileId: S.optional(S.String).pipe(T.HttpQuery("profileId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/profileassociations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProfileAssociationsRequest",
}) as any as S.Schema<ListProfileAssociationsRequest>;
export type ProfileAssociations = ProfileAssociation[];
export const ProfileAssociations = /*@__PURE__*/ S.Array(ProfileAssociation);
export interface ListProfileAssociationsResponse {
  ProfileAssociations?: ProfileAssociation[];
  NextToken?: string;
}
export const ListProfileAssociationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileAssociations: S.optional(ProfileAssociations),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProfileAssociationsResponse",
}) as any as S.Schema<ListProfileAssociationsResponse>;
export interface ListProfileResourceAssociationsRequest {
  ProfileId: string;
  ResourceType?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListProfileResourceAssociationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProfileId: S.String.pipe(T.HttpLabel("ProfileId")),
      ResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/profileresourceassociations/profileid/{ProfileId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListProfileResourceAssociationsRequest",
}) as any as S.Schema<ListProfileResourceAssociationsRequest>;
export type ProfileResourceAssociations = ProfileResourceAssociation[];
export const ProfileResourceAssociations = /*@__PURE__*/ S.Array(
  ProfileResourceAssociation,
);
export interface ListProfileResourceAssociationsResponse {
  ProfileResourceAssociations?: ProfileResourceAssociation[];
  NextToken?: string;
}
export const ListProfileResourceAssociationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProfileResourceAssociations: S.optional(ProfileResourceAssociations),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListProfileResourceAssociationsResponse",
}) as any as S.Schema<ListProfileResourceAssociationsResponse>;
export interface ListProfilesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListProfilesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/profiles" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListProfilesRequest",
}) as any as S.Schema<ListProfilesRequest>;
export interface ProfileSummary {
  Id?: string;
  Arn?: string;
  Name?: string;
  ShareStatus?: ShareStatus;
}
export const ProfileSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    ShareStatus: S.optional(ShareStatus),
  }),
).annotate({ identifier: "ProfileSummary" }) as any as S.Schema<ProfileSummary>;
export type ProfileSummaryList = ProfileSummary[];
export const ProfileSummaryList = /*@__PURE__*/ S.Array(ProfileSummary);
export interface ListProfilesResponse {
  ProfileSummaries?: ProfileSummary[];
  NextToken?: string;
}
export const ListProfilesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileSummaries: S.optional(ProfileSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListProfilesResponse",
}) as any as S.Schema<ListProfilesResponse>;
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
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ListTagsForResourceResponse {
  Tags: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: TagMap }),
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
    Tags: TagMap,
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
export interface UpdateProfileResourceAssociationRequest {
  ProfileResourceAssociationId: string;
  Name?: string;
  ResourceProperties?: string;
}
export const UpdateProfileResourceAssociationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProfileResourceAssociationId: S.String.pipe(
        T.HttpLabel("ProfileResourceAssociationId"),
      ),
      Name: S.optional(S.String),
      ResourceProperties: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "PATCH",
          uri: "/profileresourceassociation/{ProfileResourceAssociationId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateProfileResourceAssociationRequest",
}) as any as S.Schema<UpdateProfileResourceAssociationRequest>;
export interface UpdateProfileResourceAssociationResponse {
  ProfileResourceAssociation?: ProfileResourceAssociation;
}
export const UpdateProfileResourceAssociationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProfileResourceAssociation: S.optional(ProfileResourceAssociation),
    }),
).annotate({
  identifier: "UpdateProfileResourceAssociationResponse",
}) as any as S.Schema<UpdateProfileResourceAssociationResponse>;
export type ExceptionMessage = string;
export type AssociateProfileError =
  | AccessDeniedException
  | ConflictException
  | InvalidParameterException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a Route 53 Profiles profile with a VPC. A VPC can have only one Profile associated with it, but a Profile can be associated with 1000 of VPCs (and you can request a higher quota).
 * For more information, see https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/DNSLimitations.html#limits-api-entities.
 */
export const associateProfile: API.OperationMethod<
  AssociateProfileRequest,
  AssociateProfileResponse,
  AssociateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateProfileRequest,
  output: AssociateProfileResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InvalidParameterException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateProfile",
}));

export type AssociateResourceToProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceErrorException
  | InvalidParameterException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a DNS reource configuration to a Route 53 Profile.
 */
export const associateResourceToProfile: API.OperationMethod<
  AssociateResourceToProfileRequest,
  AssociateResourceToProfileResponse,
  AssociateResourceToProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateResourceToProfileRequest,
  output: AssociateResourceToProfileResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateResourceToProfile",
}));

export type CreateProfileError =
  | AccessDeniedException
  | InvalidParameterException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an empty Route 53 Profile.
 */
export const createProfile: API.OperationMethod<
  CreateProfileRequest,
  CreateProfileResponse,
  CreateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProfileRequest,
  output: CreateProfileResponse,
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProfile",
}));

export type DeleteProfileError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified Route 53 Profile. Before you can delete a profile, you must first disassociate it from all VPCs.
 */
export const deleteProfile: API.OperationMethod<
  DeleteProfileRequest,
  DeleteProfileResponse,
  DeleteProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProfileRequest,
  output: DeleteProfileResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProfile",
}));

export type DisassociateProfileError =
  | AccessDeniedException
  | InvalidParameterException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Dissociates a specified Route 53 Profile from the specified VPC.
 */
export const disassociateProfile: API.OperationMethod<
  DisassociateProfileRequest,
  DisassociateProfileResponse,
  DisassociateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateProfileRequest,
  output: DisassociateProfileResponse,
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateProfile",
}));

export type DisassociateResourceFromProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceErrorException
  | InvalidParameterException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Dissoaciated a specified resource, from the Route 53 Profile.
 */
export const disassociateResourceFromProfile: API.OperationMethod<
  DisassociateResourceFromProfileRequest,
  DisassociateResourceFromProfileResponse,
  DisassociateResourceFromProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateResourceFromProfileRequest,
  output: DisassociateResourceFromProfileResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateResourceFromProfile",
}));

export type GetProfileError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specified Route 53 Profile, such as whether whether the Profile is shared, and the current status of the Profile.
 */
export const getProfile: API.OperationMethod<
  GetProfileRequest,
  GetProfileResponse,
  GetProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProfileRequest,
  output: GetProfileResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfile",
}));

export type GetProfileAssociationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a Route 53 Profile association for a VPC. A VPC can have only one Profile association, but a Profile can be associated with up to 5000 VPCs.
 */
export const getProfileAssociation: API.OperationMethod<
  GetProfileAssociationRequest,
  GetProfileAssociationResponse,
  GetProfileAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProfileAssociationRequest,
  output: GetProfileAssociationResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfileAssociation",
}));

export type GetProfileResourceAssociationError =
  | AccessDeniedException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specified Route 53 Profile resource association.
 */
export const getProfileResourceAssociation: API.OperationMethod<
  GetProfileResourceAssociationRequest,
  GetProfileResourceAssociationResponse,
  GetProfileResourceAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProfileResourceAssociationRequest,
  output: GetProfileResourceAssociationResponse,
  errors: [
    AccessDeniedException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProfileResourceAssociation",
}));

export type ListProfileAssociationsError =
  | AccessDeniedException
  | InvalidNextTokenException
  | InvalidParameterException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the VPCs that the specified Route 53 Profile is associated with.
 */
export const listProfileAssociations: API.PaginatedOperationMethod<
  ListProfileAssociationsRequest,
  ListProfileAssociationsResponse,
  ListProfileAssociationsError,
  Credentials | HttpClient.HttpClient,
  ProfileAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProfileAssociationsRequest,
  output: ListProfileAssociationsResponse,
  errors: [
    AccessDeniedException,
    InvalidNextTokenException,
    InvalidParameterException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfileAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProfileAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProfileResourceAssociationsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the resource associations for the specified Route 53 Profile.
 */
export const listProfileResourceAssociations: API.PaginatedOperationMethod<
  ListProfileResourceAssociationsRequest,
  ListProfileResourceAssociationsResponse,
  ListProfileResourceAssociationsError,
  Credentials | HttpClient.HttpClient,
  ProfileResourceAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProfileResourceAssociationsRequest,
  output: ListProfileResourceAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfileResourceAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProfileResourceAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProfilesError =
  | AccessDeniedException
  | InvalidNextTokenException
  | InvalidParameterException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the Route 53 Profiles associated with your Amazon Web Services account.
 */
export const listProfiles: API.PaginatedOperationMethod<
  ListProfilesRequest,
  ListProfilesResponse,
  ListProfilesError,
  Credentials | HttpClient.HttpClient,
  ProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProfilesRequest,
  output: ListProfilesResponse,
  errors: [
    AccessDeniedException,
    InvalidNextTokenException,
    InvalidParameterException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfiles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProfileSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags that you associated with the specified resource.
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
    ConflictException,
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
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds one or more tags to a specified resource.
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
  | ConflictException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from a specified resource.
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
    ConflictException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateProfileResourceAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceErrorException
  | InvalidParameterException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified Route 53 Profile resourse association.
 */
export const updateProfileResourceAssociation: API.OperationMethod<
  UpdateProfileResourceAssociationRequest,
  UpdateProfileResourceAssociationResponse,
  UpdateProfileResourceAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProfileResourceAssociationRequest,
  output: UpdateProfileResourceAssociationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    InvalidParameterException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProfileResourceAssociation",
}));
