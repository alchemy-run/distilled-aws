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
  sdkId: "AppStream",
  serviceShapeName: "PhotonAdminProxyService",
});
const auth = T.AwsAuthSigv4({ name: "appstream" });
const ver = T.ServiceVersion("2016-12-01");
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
              `https://appstream2-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://appstream2-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://appstream2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        if ("aws" === _.getAttr(PartitionResult, "name")) {
          return e(`https://appstream2.${Region}.amazonaws.com`);
        }
        if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
          return e(`https://appstream2.${Region}.amazonaws.com`);
        }
        return e(
          `https://appstream2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class DryRunOperationException
  extends /*@__PURE__*/ S.TaggedError<DryRunOperationException>()(
    "DryRunOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(412),
  ) {}
export class EntitlementAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<EntitlementAlreadyExistsException>()(
    "EntitlementAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class EntitlementNotFoundException
  extends /*@__PURE__*/ S.TaggedError<EntitlementNotFoundException>()(
    "EntitlementNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class IncompatibleImageException
  extends /*@__PURE__*/ S.TaggedError<IncompatibleImageException>()(
    "IncompatibleImageException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidAccountStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidAccountStatusException>()(
    "InvalidAccountStatusException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterCombinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterCombinationException>()(
    "InvalidParameterCombinationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRoleException
  extends /*@__PURE__*/ S.TaggedError<InvalidRoleException>()(
    "InvalidRoleException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class OperationNotPermittedException
  extends /*@__PURE__*/ S.TaggedError<OperationNotPermittedException>()(
    "OperationNotPermittedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class RequestLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<RequestLimitExceededException>()(
    "RequestLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotAvailableException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotAvailableException>()(
    "ResourceNotAvailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export type Arn = string;
export type Name = string;
export interface AssociateAppBlockBuilderAppBlockRequest {
  AppBlockArn?: string;
  AppBlockBuilderName?: string;
}
export const AssociateAppBlockBuilderAppBlockRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AppBlockArn: S.optional(S.String),
      AppBlockBuilderName: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "AssociateAppBlockBuilderAppBlockRequest",
}) as any as S.Schema<AssociateAppBlockBuilderAppBlockRequest>;
export interface AppBlockBuilderAppBlockAssociation {
  AppBlockArn?: string;
  AppBlockBuilderName?: string;
}
export const AppBlockBuilderAppBlockAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppBlockArn: S.optional(S.String),
    AppBlockBuilderName: S.optional(S.String),
  }),
).annotate({
  identifier: "AppBlockBuilderAppBlockAssociation",
}) as any as S.Schema<AppBlockBuilderAppBlockAssociation>;
export interface AssociateAppBlockBuilderAppBlockResult {
  AppBlockBuilderAppBlockAssociation?: AppBlockBuilderAppBlockAssociation & {
    AppBlockArn: Arn;
    AppBlockBuilderName: Name;
  };
}
export const AssociateAppBlockBuilderAppBlockResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AppBlockBuilderAppBlockAssociation: S.optional(
        AppBlockBuilderAppBlockAssociation,
      ),
    }),
).annotate({
  identifier: "AssociateAppBlockBuilderAppBlockResult",
}) as any as S.Schema<AssociateAppBlockBuilderAppBlockResult>;
export interface AssociateApplicationFleetRequest {
  FleetName?: string;
  ApplicationArn?: string;
}
export const AssociateApplicationFleetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetName: S.optional(S.String),
    ApplicationArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateApplicationFleetRequest",
}) as any as S.Schema<AssociateApplicationFleetRequest>;
export interface ApplicationFleetAssociation {
  FleetName?: string;
  ApplicationArn?: string;
}
export const ApplicationFleetAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetName: S.optional(S.String),
    ApplicationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ApplicationFleetAssociation",
}) as any as S.Schema<ApplicationFleetAssociation>;
export interface AssociateApplicationFleetResult {
  ApplicationFleetAssociation?: ApplicationFleetAssociation & {
    FleetName: string;
    ApplicationArn: Arn;
  };
}
export const AssociateApplicationFleetResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationFleetAssociation: S.optional(ApplicationFleetAssociation),
  }),
).annotate({
  identifier: "AssociateApplicationFleetResult",
}) as any as S.Schema<AssociateApplicationFleetResult>;
export interface AssociateApplicationToEntitlementRequest {
  StackName?: string;
  EntitlementName?: string;
  ApplicationIdentifier?: string;
}
export const AssociateApplicationToEntitlementRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StackName: S.optional(S.String),
      EntitlementName: S.optional(S.String),
      ApplicationIdentifier: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "AssociateApplicationToEntitlementRequest",
}) as any as S.Schema<AssociateApplicationToEntitlementRequest>;
export interface AssociateApplicationToEntitlementResult {}
export const AssociateApplicationToEntitlementResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "AssociateApplicationToEntitlementResult",
}) as any as S.Schema<AssociateApplicationToEntitlementResult>;
export interface AssociateFleetRequest {
  FleetName?: string;
  StackName?: string;
}
export const AssociateFleetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetName: S.optional(S.String),
    StackName: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateFleetRequest",
}) as any as S.Schema<AssociateFleetRequest>;
export interface AssociateFleetResult {}
export const AssociateFleetResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateFleetResult",
}) as any as S.Schema<AssociateFleetResult>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface AssociateSoftwareToImageBuilderRequest {
  ImageBuilderName?: string;
  SoftwareNames?: string[];
}
export const AssociateSoftwareToImageBuilderRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ImageBuilderName: S.optional(S.String),
      SoftwareNames: S.optional(StringList),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "AssociateSoftwareToImageBuilderRequest",
}) as any as S.Schema<AssociateSoftwareToImageBuilderRequest>;
export interface AssociateSoftwareToImageBuilderResult {}
export const AssociateSoftwareToImageBuilderResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "AssociateSoftwareToImageBuilderResult",
}) as any as S.Schema<AssociateSoftwareToImageBuilderResult>;
export type Username = string | redacted.Redacted<string>;
export type AuthenticationType =
  | "API"
  | "SAML"
  | "USERPOOL"
  | "AWS_AD"
  | (string & {});
export const AuthenticationType = S.String;

export interface UserStackAssociation {
  StackName?: string;
  UserName?: string | redacted.Redacted<string>;
  AuthenticationType?: AuthenticationType;
  SendEmailNotification?: boolean;
}
export const UserStackAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    UserName: S.optional(SensitiveString),
    AuthenticationType: S.optional(AuthenticationType),
    SendEmailNotification: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "UserStackAssociation",
}) as any as S.Schema<UserStackAssociation>;
export type UserStackAssociationList = UserStackAssociation[];
export const UserStackAssociationList =
  /*@__PURE__*/ S.Array(UserStackAssociation);
export interface BatchAssociateUserStackRequest {
  UserStackAssociations?: UserStackAssociation[];
}
export const BatchAssociateUserStackRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserStackAssociations: S.optional(UserStackAssociationList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchAssociateUserStackRequest",
}) as any as S.Schema<BatchAssociateUserStackRequest>;
export type UserStackAssociationErrorCode =
  | "STACK_NOT_FOUND"
  | "USER_NAME_NOT_FOUND"
  | "DIRECTORY_NOT_FOUND"
  | "INTERNAL_ERROR"
  | (string & {});
export const UserStackAssociationErrorCode = S.String;

export interface UserStackAssociationError {
  UserStackAssociation?: UserStackAssociation;
  ErrorCode?: UserStackAssociationErrorCode;
  ErrorMessage?: string;
}
export const UserStackAssociationError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserStackAssociation: S.optional(UserStackAssociation),
    ErrorCode: S.optional(UserStackAssociationErrorCode),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "UserStackAssociationError",
}) as any as S.Schema<UserStackAssociationError>;
export type UserStackAssociationErrorList = UserStackAssociationError[];
export const UserStackAssociationErrorList = /*@__PURE__*/ S.Array(
  UserStackAssociationError,
);
export interface BatchAssociateUserStackResult {
  errors?: (UserStackAssociationError & {
    UserStackAssociation: UserStackAssociation & {
      StackName: string;
      UserName: Username;
      AuthenticationType: AuthenticationType;
    };
  })[];
}
export const BatchAssociateUserStackResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ errors: S.optional(UserStackAssociationErrorList) }),
).annotate({
  identifier: "BatchAssociateUserStackResult",
}) as any as S.Schema<BatchAssociateUserStackResult>;
export interface BatchDisassociateUserStackRequest {
  UserStackAssociations?: UserStackAssociation[];
}
export const BatchDisassociateUserStackRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserStackAssociations: S.optional(UserStackAssociationList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchDisassociateUserStackRequest",
}) as any as S.Schema<BatchDisassociateUserStackRequest>;
export interface BatchDisassociateUserStackResult {
  errors?: (UserStackAssociationError & {
    UserStackAssociation: UserStackAssociation & {
      StackName: string;
      UserName: Username;
      AuthenticationType: AuthenticationType;
    };
  })[];
}
export const BatchDisassociateUserStackResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ errors: S.optional(UserStackAssociationErrorList) }),
).annotate({
  identifier: "BatchDisassociateUserStackResult",
}) as any as S.Schema<BatchDisassociateUserStackResult>;
export type RegionName = string;
export type Description = string;
export interface CopyImageRequest {
  SourceImageName?: string;
  DestinationImageName?: string;
  DestinationRegion?: string;
  DestinationImageDescription?: string;
}
export const CopyImageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceImageName: S.optional(S.String),
    DestinationImageName: S.optional(S.String),
    DestinationRegion: S.optional(S.String),
    DestinationImageDescription: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CopyImageRequest",
}) as any as S.Schema<CopyImageRequest>;
export interface CopyImageResponse {
  DestinationImageName?: string;
}
export const CopyImageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DestinationImageName: S.optional(S.String) }),
).annotate({
  identifier: "CopyImageResponse",
}) as any as S.Schema<CopyImageResponse>;
export type DisplayName = string;
export type S3Bucket = string;
export type S3Key = string;
export interface S3Location {
  S3Bucket?: string;
  S3Key?: string;
}
export const S3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Bucket: S.optional(S.String), S3Key: S.optional(S.String) }),
).annotate({ identifier: "S3Location" }) as any as S.Schema<S3Location>;
export interface ScriptDetails {
  ScriptS3Location?: S3Location;
  ExecutablePath?: string;
  ExecutableParameters?: string;
  TimeoutInSeconds?: number;
}
export const ScriptDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScriptS3Location: S.optional(S3Location),
    ExecutablePath: S.optional(S.String),
    ExecutableParameters: S.optional(S.String),
    TimeoutInSeconds: S.optional(S.Number),
  }),
).annotate({ identifier: "ScriptDetails" }) as any as S.Schema<ScriptDetails>;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export type PackagingType = "CUSTOM" | "APPSTREAM2" | (string & {});
export const PackagingType = S.String;

export interface CreateAppBlockRequest {
  Name?: string;
  Description?: string;
  DisplayName?: string;
  SourceS3Location?: S3Location;
  SetupScriptDetails?: ScriptDetails;
  Tags?: { [key: string]: string | undefined };
  PostSetupScriptDetails?: ScriptDetails;
  PackagingType?: PackagingType;
}
export const CreateAppBlockRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    SourceS3Location: S.optional(S3Location),
    SetupScriptDetails: S.optional(ScriptDetails),
    Tags: S.optional(Tags),
    PostSetupScriptDetails: S.optional(ScriptDetails),
    PackagingType: S.optional(PackagingType),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateAppBlockRequest",
}) as any as S.Schema<CreateAppBlockRequest>;
export type AppBlockState = "INACTIVE" | "ACTIVE" | (string & {});
export const AppBlockState = S.String;

export interface ErrorDetails {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const ErrorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "ErrorDetails" }) as any as S.Schema<ErrorDetails>;
export type ErrorDetailsList = ErrorDetails[];
export const ErrorDetailsList = /*@__PURE__*/ S.Array(ErrorDetails);
export interface AppBlock {
  Name?: string;
  Arn?: string;
  Description?: string;
  DisplayName?: string;
  SourceS3Location?: S3Location;
  SetupScriptDetails?: ScriptDetails;
  CreatedTime?: Date;
  PostSetupScriptDetails?: ScriptDetails;
  PackagingType?: PackagingType;
  State?: AppBlockState;
  AppBlockErrors?: ErrorDetails[];
}
export const AppBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Arn: S.optional(S.String),
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    SourceS3Location: S.optional(S3Location),
    SetupScriptDetails: S.optional(ScriptDetails),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    PostSetupScriptDetails: S.optional(ScriptDetails),
    PackagingType: S.optional(PackagingType),
    State: S.optional(AppBlockState),
    AppBlockErrors: S.optional(ErrorDetailsList),
  }),
).annotate({ identifier: "AppBlock" }) as any as S.Schema<AppBlock>;
export interface CreateAppBlockResult {
  AppBlock?: AppBlock & {
    Name: string;
    Arn: Arn;
    SourceS3Location: S3Location & { S3Bucket: S3Bucket };
    SetupScriptDetails: ScriptDetails & {
      ScriptS3Location: S3Location & { S3Bucket: S3Bucket };
      ExecutablePath: string;
      TimeoutInSeconds: number;
    };
    PostSetupScriptDetails: ScriptDetails & {
      ScriptS3Location: S3Location & { S3Bucket: S3Bucket };
      ExecutablePath: string;
      TimeoutInSeconds: number;
    };
  };
}
export const CreateAppBlockResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AppBlock: S.optional(AppBlock) }),
).annotate({
  identifier: "CreateAppBlockResult",
}) as any as S.Schema<CreateAppBlockResult>;
export type AppBlockBuilderPlatformType = "WINDOWS_SERVER_2019" | (string & {});
export const AppBlockBuilderPlatformType = S.String;

export type SubnetIdList = string[];
export const SubnetIdList = /*@__PURE__*/ S.Array(S.String);
export type SecurityGroupIdList = string[];
export const SecurityGroupIdList = /*@__PURE__*/ S.Array(S.String);
export interface VpcConfig {
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
}
export const VpcConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetIds: S.optional(SubnetIdList),
    SecurityGroupIds: S.optional(SecurityGroupIdList),
  }),
).annotate({ identifier: "VpcConfig" }) as any as S.Schema<VpcConfig>;
export type AccessEndpointType = "STREAMING" | (string & {});
export const AccessEndpointType = S.String;

export interface AccessEndpoint {
  EndpointType?: AccessEndpointType;
  VpceId?: string;
}
export const AccessEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointType: S.optional(AccessEndpointType),
    VpceId: S.optional(S.String),
  }),
).annotate({ identifier: "AccessEndpoint" }) as any as S.Schema<AccessEndpoint>;
export type AccessEndpointList = AccessEndpoint[];
export const AccessEndpointList = /*@__PURE__*/ S.Array(AccessEndpoint);
export interface CreateAppBlockBuilderRequest {
  Name?: string;
  Description?: string;
  DisplayName?: string;
  Tags?: { [key: string]: string | undefined };
  Platform?: AppBlockBuilderPlatformType;
  InstanceType?: string;
  VpcConfig?: VpcConfig;
  EnableDefaultInternetAccess?: boolean;
  IamRoleArn?: string;
  AccessEndpoints?: AccessEndpoint[];
  DisableIMDSV1?: boolean;
}
export const CreateAppBlockBuilderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    Tags: S.optional(Tags),
    Platform: S.optional(AppBlockBuilderPlatformType),
    InstanceType: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
    EnableDefaultInternetAccess: S.optional(S.Boolean),
    IamRoleArn: S.optional(S.String),
    AccessEndpoints: S.optional(AccessEndpointList),
    DisableIMDSV1: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateAppBlockBuilderRequest",
}) as any as S.Schema<CreateAppBlockBuilderRequest>;
export type AppBlockBuilderState =
  | "STARTING"
  | "RUNNING"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export const AppBlockBuilderState = S.String;

export type FleetErrorCode =
  | "IAM_SERVICE_ROLE_MISSING_ENI_DESCRIBE_ACTION"
  | "IAM_SERVICE_ROLE_MISSING_ENI_CREATE_ACTION"
  | "IAM_SERVICE_ROLE_MISSING_ENI_DELETE_ACTION"
  | "NETWORK_INTERFACE_LIMIT_EXCEEDED"
  | "INTERNAL_SERVICE_ERROR"
  | "IAM_SERVICE_ROLE_IS_MISSING"
  | "MACHINE_ROLE_IS_MISSING"
  | "STS_DISABLED_IN_REGION"
  | "SUBNET_HAS_INSUFFICIENT_IP_ADDRESSES"
  | "IAM_SERVICE_ROLE_MISSING_DESCRIBE_SUBNET_ACTION"
  | "SUBNET_NOT_FOUND"
  | "IMAGE_NOT_FOUND"
  | "INVALID_SUBNET_CONFIGURATION"
  | "SECURITY_GROUPS_NOT_FOUND"
  | "IGW_NOT_ATTACHED"
  | "IAM_SERVICE_ROLE_MISSING_DESCRIBE_SECURITY_GROUPS_ACTION"
  | "FLEET_STOPPED"
  | "FLEET_INSTANCE_PROVISIONING_FAILURE"
  | "DOMAIN_JOIN_ERROR_FILE_NOT_FOUND"
  | "DOMAIN_JOIN_ERROR_ACCESS_DENIED"
  | "DOMAIN_JOIN_ERROR_LOGON_FAILURE"
  | "DOMAIN_JOIN_ERROR_INVALID_PARAMETER"
  | "DOMAIN_JOIN_ERROR_MORE_DATA"
  | "DOMAIN_JOIN_ERROR_NO_SUCH_DOMAIN"
  | "DOMAIN_JOIN_ERROR_NOT_SUPPORTED"
  | "DOMAIN_JOIN_NERR_INVALID_WORKGROUP_NAME"
  | "DOMAIN_JOIN_NERR_WORKSTATION_NOT_STARTED"
  | "DOMAIN_JOIN_ERROR_DS_MACHINE_ACCOUNT_QUOTA_EXCEEDED"
  | "DOMAIN_JOIN_NERR_PASSWORD_EXPIRED"
  | "DOMAIN_JOIN_INTERNAL_SERVICE_ERROR"
  | "VALIDATION_ERROR"
  | (string & {});
export const FleetErrorCode = S.String;

export interface ResourceError {
  ErrorCode?: FleetErrorCode;
  ErrorMessage?: string;
  ErrorTimestamp?: Date;
}
export const ResourceError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(FleetErrorCode),
    ErrorMessage: S.optional(S.String),
    ErrorTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "ResourceError" }) as any as S.Schema<ResourceError>;
export type ResourceErrors = ResourceError[];
export const ResourceErrors = /*@__PURE__*/ S.Array(ResourceError);
export type AppBlockBuilderStateChangeReasonCode =
  | "INTERNAL_ERROR"
  | (string & {});
export const AppBlockBuilderStateChangeReasonCode = S.String;

export interface AppBlockBuilderStateChangeReason {
  Code?: AppBlockBuilderStateChangeReasonCode;
  Message?: string;
}
export const AppBlockBuilderStateChangeReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(AppBlockBuilderStateChangeReasonCode),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "AppBlockBuilderStateChangeReason",
}) as any as S.Schema<AppBlockBuilderStateChangeReason>;
export interface AppBlockBuilder {
  Arn?: string;
  Name?: string;
  DisplayName?: string;
  Description?: string;
  Platform?: AppBlockBuilderPlatformType;
  InstanceType?: string;
  EnableDefaultInternetAccess?: boolean;
  IamRoleArn?: string;
  VpcConfig?: VpcConfig;
  State?: AppBlockBuilderState;
  CreatedTime?: Date;
  AppBlockBuilderErrors?: ResourceError[];
  StateChangeReason?: AppBlockBuilderStateChangeReason;
  AccessEndpoints?: AccessEndpoint[];
  DisableIMDSV1?: boolean;
}
export const AppBlockBuilder = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    DisplayName: S.optional(S.String),
    Description: S.optional(S.String),
    Platform: S.optional(AppBlockBuilderPlatformType),
    InstanceType: S.optional(S.String),
    EnableDefaultInternetAccess: S.optional(S.Boolean),
    IamRoleArn: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
    State: S.optional(AppBlockBuilderState),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AppBlockBuilderErrors: S.optional(ResourceErrors),
    StateChangeReason: S.optional(AppBlockBuilderStateChangeReason),
    AccessEndpoints: S.optional(AccessEndpointList),
    DisableIMDSV1: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AppBlockBuilder",
}) as any as S.Schema<AppBlockBuilder>;
export interface CreateAppBlockBuilderResult {
  AppBlockBuilder?: AppBlockBuilder & {
    Arn: Arn;
    Name: string;
    Platform: AppBlockBuilderPlatformType;
    InstanceType: string;
    VpcConfig: VpcConfig;
    State: AppBlockBuilderState;
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
  };
}
export const CreateAppBlockBuilderResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AppBlockBuilder: S.optional(AppBlockBuilder) }),
).annotate({
  identifier: "CreateAppBlockBuilderResult",
}) as any as S.Schema<CreateAppBlockBuilderResult>;
export interface CreateAppBlockBuilderStreamingURLRequest {
  AppBlockBuilderName?: string;
  Validity?: number;
}
export const CreateAppBlockBuilderStreamingURLRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AppBlockBuilderName: S.optional(S.String),
      Validity: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CreateAppBlockBuilderStreamingURLRequest",
}) as any as S.Schema<CreateAppBlockBuilderStreamingURLRequest>;
export interface CreateAppBlockBuilderStreamingURLResult {
  StreamingURL?: string;
  Expires?: Date;
}
export const CreateAppBlockBuilderStreamingURLResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StreamingURL: S.optional(S.String),
      Expires: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    }),
).annotate({
  identifier: "CreateAppBlockBuilderStreamingURLResult",
}) as any as S.Schema<CreateAppBlockBuilderStreamingURLResult>;
export type PlatformType =
  | "WINDOWS"
  | "WINDOWS_SERVER_2016"
  | "WINDOWS_SERVER_2019"
  | "WINDOWS_SERVER_2022"
  | "WINDOWS_SERVER_2025"
  | "AMAZON_LINUX2"
  | "RHEL8"
  | "ROCKY_LINUX8"
  | "UBUNTU_PRO_2404"
  | (string & {});
export const PlatformType = S.String;

export type Platforms = PlatformType[];
export const Platforms = /*@__PURE__*/ S.Array(PlatformType);
export interface CreateApplicationRequest {
  Name?: string;
  DisplayName?: string;
  Description?: string;
  IconS3Location?: S3Location;
  LaunchPath?: string;
  WorkingDirectory?: string;
  LaunchParameters?: string;
  Platforms?: PlatformType[];
  InstanceFamilies?: string[];
  AppBlockArn?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    DisplayName: S.optional(S.String),
    Description: S.optional(S.String),
    IconS3Location: S.optional(S3Location),
    LaunchPath: S.optional(S.String),
    WorkingDirectory: S.optional(S.String),
    LaunchParameters: S.optional(S.String),
    Platforms: S.optional(Platforms),
    InstanceFamilies: S.optional(StringList),
    AppBlockArn: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateApplicationRequest",
}) as any as S.Schema<CreateApplicationRequest>;
export type Metadata = { [key: string]: string | undefined };
export const Metadata = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface Application {
  Name?: string;
  DisplayName?: string;
  IconURL?: string;
  LaunchPath?: string;
  LaunchParameters?: string;
  Enabled?: boolean;
  Metadata?: { [key: string]: string | undefined };
  WorkingDirectory?: string;
  Description?: string;
  Arn?: string;
  AppBlockArn?: string;
  IconS3Location?: S3Location;
  Platforms?: PlatformType[];
  InstanceFamilies?: string[];
  CreatedTime?: Date;
}
export const Application = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    DisplayName: S.optional(S.String),
    IconURL: S.optional(S.String),
    LaunchPath: S.optional(S.String),
    LaunchParameters: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    Metadata: S.optional(Metadata),
    WorkingDirectory: S.optional(S.String),
    Description: S.optional(S.String),
    Arn: S.optional(S.String),
    AppBlockArn: S.optional(S.String),
    IconS3Location: S.optional(S3Location),
    Platforms: S.optional(Platforms),
    InstanceFamilies: S.optional(StringList),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Application" }) as any as S.Schema<Application>;
export interface CreateApplicationResult {
  Application?: Application & {
    IconS3Location: S3Location & { S3Bucket: S3Bucket };
  };
}
export const CreateApplicationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Application: S.optional(Application) }),
).annotate({
  identifier: "CreateApplicationResult",
}) as any as S.Schema<CreateApplicationResult>;
export type DirectoryName = string;
export type OrganizationalUnitDistinguishedName = string;
export type OrganizationalUnitDistinguishedNamesList = string[];
export const OrganizationalUnitDistinguishedNamesList = /*@__PURE__*/ S.Array(
  S.String,
);
export type AccountName = string | redacted.Redacted<string>;
export type AccountPassword = string | redacted.Redacted<string>;
export interface ServiceAccountCredentials {
  AccountName?: string | redacted.Redacted<string>;
  AccountPassword?: string | redacted.Redacted<string>;
}
export const ServiceAccountCredentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountName: S.optional(SensitiveString),
    AccountPassword: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ServiceAccountCredentials",
}) as any as S.Schema<ServiceAccountCredentials>;
export type CertificateBasedAuthStatus =
  | "DISABLED"
  | "ENABLED"
  | "ENABLED_NO_DIRECTORY_LOGIN_FALLBACK"
  | (string & {});
export const CertificateBasedAuthStatus = S.String;

export interface CertificateBasedAuthProperties {
  Status?: CertificateBasedAuthStatus;
  CertificateAuthorityArn?: string;
}
export const CertificateBasedAuthProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(CertificateBasedAuthStatus),
    CertificateAuthorityArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CertificateBasedAuthProperties",
}) as any as S.Schema<CertificateBasedAuthProperties>;
export interface CreateDirectoryConfigRequest {
  DirectoryName?: string;
  OrganizationalUnitDistinguishedNames?: string[];
  ServiceAccountCredentials?: ServiceAccountCredentials;
  CertificateBasedAuthProperties?: CertificateBasedAuthProperties;
}
export const CreateDirectoryConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryName: S.optional(S.String),
    OrganizationalUnitDistinguishedNames: S.optional(
      OrganizationalUnitDistinguishedNamesList,
    ),
    ServiceAccountCredentials: S.optional(ServiceAccountCredentials),
    CertificateBasedAuthProperties: S.optional(CertificateBasedAuthProperties),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDirectoryConfigRequest",
}) as any as S.Schema<CreateDirectoryConfigRequest>;
export interface DirectoryConfig {
  DirectoryName?: string;
  OrganizationalUnitDistinguishedNames?: string[];
  ServiceAccountCredentials?: ServiceAccountCredentials;
  CreatedTime?: Date;
  CertificateBasedAuthProperties?: CertificateBasedAuthProperties;
}
export const DirectoryConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryName: S.optional(S.String),
    OrganizationalUnitDistinguishedNames: S.optional(
      OrganizationalUnitDistinguishedNamesList,
    ),
    ServiceAccountCredentials: S.optional(ServiceAccountCredentials),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CertificateBasedAuthProperties: S.optional(CertificateBasedAuthProperties),
  }),
).annotate({
  identifier: "DirectoryConfig",
}) as any as S.Schema<DirectoryConfig>;
export interface CreateDirectoryConfigResult {
  DirectoryConfig?: DirectoryConfig & {
    DirectoryName: DirectoryName;
    ServiceAccountCredentials: ServiceAccountCredentials & {
      AccountName: AccountName;
      AccountPassword: AccountPassword;
    };
  };
}
export const CreateDirectoryConfigResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DirectoryConfig: S.optional(DirectoryConfig) }),
).annotate({
  identifier: "CreateDirectoryConfigResult",
}) as any as S.Schema<CreateDirectoryConfigResult>;
export type AppVisibility = "ALL" | "ASSOCIATED" | (string & {});
export const AppVisibility = S.String;

export interface EntitlementAttribute {
  Name?: string;
  Value?: string;
}
export const EntitlementAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "EntitlementAttribute",
}) as any as S.Schema<EntitlementAttribute>;
export type EntitlementAttributeList = EntitlementAttribute[];
export const EntitlementAttributeList =
  /*@__PURE__*/ S.Array(EntitlementAttribute);
export interface CreateEntitlementRequest {
  Name?: string;
  StackName?: string;
  Description?: string;
  AppVisibility?: AppVisibility;
  Attributes?: EntitlementAttribute[];
}
export const CreateEntitlementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    StackName: S.optional(S.String),
    Description: S.optional(S.String),
    AppVisibility: S.optional(AppVisibility),
    Attributes: S.optional(EntitlementAttributeList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateEntitlementRequest",
}) as any as S.Schema<CreateEntitlementRequest>;
export interface Entitlement {
  Name?: string;
  StackName?: string;
  Description?: string;
  AppVisibility?: AppVisibility;
  Attributes?: EntitlementAttribute[];
  CreatedTime?: Date;
  LastModifiedTime?: Date;
}
export const Entitlement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    StackName: S.optional(S.String),
    Description: S.optional(S.String),
    AppVisibility: S.optional(AppVisibility),
    Attributes: S.optional(EntitlementAttributeList),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "Entitlement" }) as any as S.Schema<Entitlement>;
export interface CreateEntitlementResult {
  Entitlement?: Entitlement & {
    Name: Name;
    StackName: Name;
    AppVisibility: AppVisibility;
    Attributes: (EntitlementAttribute & { Name: string; Value: string })[];
  };
}
export const CreateEntitlementResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Entitlement: S.optional(Entitlement) }),
).annotate({
  identifier: "CreateEntitlementResult",
}) as any as S.Schema<CreateEntitlementResult>;
export type AmiName = string;
export interface CreateExportImageTaskRequest {
  ImageName?: string;
  AmiName?: string;
  IamRoleArn?: string;
  TagSpecifications?: { [key: string]: string | undefined };
  AmiDescription?: string;
}
export const CreateExportImageTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImageName: S.optional(S.String),
    AmiName: S.optional(S.String),
    IamRoleArn: S.optional(S.String),
    TagSpecifications: S.optional(Tags),
    AmiDescription: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateExportImageTaskRequest",
}) as any as S.Schema<CreateExportImageTaskRequest>;
export type UUID = string;
export type ExportImageTaskState =
  | "EXPORTING"
  | "COMPLETED"
  | "FAILED"
  | "TIMED_OUT"
  | (string & {});
export const ExportImageTaskState = S.String;

export type PhotonAmiId = string;
export interface ExportImageTask {
  TaskId?: string;
  ImageArn?: string;
  AmiName?: string;
  CreatedDate?: Date;
  AmiDescription?: string;
  State?: ExportImageTaskState;
  AmiId?: string;
  TagSpecifications?: { [key: string]: string | undefined };
  ErrorDetails?: ErrorDetails[];
}
export const ExportImageTask = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskId: S.optional(S.String),
    ImageArn: S.optional(S.String),
    AmiName: S.optional(S.String),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AmiDescription: S.optional(S.String),
    State: S.optional(ExportImageTaskState),
    AmiId: S.optional(S.String),
    TagSpecifications: S.optional(Tags),
    ErrorDetails: S.optional(ErrorDetailsList),
  }),
).annotate({
  identifier: "ExportImageTask",
}) as any as S.Schema<ExportImageTask>;
export interface CreateExportImageTaskResult {
  ExportImageTask?: ExportImageTask & {
    TaskId: UUID;
    ImageArn: Arn;
    AmiName: AmiName;
    CreatedDate: Date;
  };
}
export const CreateExportImageTaskResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExportImageTask: S.optional(ExportImageTask) }),
).annotate({
  identifier: "CreateExportImageTaskResult",
}) as any as S.Schema<CreateExportImageTaskResult>;
export type FleetType = "ALWAYS_ON" | "ON_DEMAND" | "ELASTIC" | (string & {});
export const FleetType = S.String;

export interface ComputeCapacity {
  DesiredInstances?: number;
  DesiredSessions?: number;
}
export const ComputeCapacity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DesiredInstances: S.optional(S.Number),
    DesiredSessions: S.optional(S.Number),
  }),
).annotate({
  identifier: "ComputeCapacity",
}) as any as S.Schema<ComputeCapacity>;
export interface DomainJoinInfo {
  DirectoryName?: string;
  OrganizationalUnitDistinguishedName?: string;
}
export const DomainJoinInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryName: S.optional(S.String),
    OrganizationalUnitDistinguishedName: S.optional(S.String),
  }),
).annotate({ identifier: "DomainJoinInfo" }) as any as S.Schema<DomainJoinInfo>;
export type StreamView = "APP" | "DESKTOP" | (string & {});
export const StreamView = S.String;

export type UsbDeviceFilterString = string;
export type UsbDeviceFilterStrings = string[];
export const UsbDeviceFilterStrings = /*@__PURE__*/ S.Array(S.String);
export interface VolumeConfig {
  VolumeSizeInGb?: number;
}
export const VolumeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VolumeSizeInGb: S.optional(S.Number) }),
).annotate({ identifier: "VolumeConfig" }) as any as S.Schema<VolumeConfig>;
export interface CreateFleetRequest {
  Name?: string;
  ImageName?: string;
  ImageArn?: string;
  InstanceType?: string;
  FleetType?: FleetType;
  ComputeCapacity?: ComputeCapacity;
  VpcConfig?: VpcConfig;
  MaxUserDurationInSeconds?: number;
  DisconnectTimeoutInSeconds?: number;
  Description?: string;
  DisplayName?: string;
  EnableDefaultInternetAccess?: boolean;
  DomainJoinInfo?: DomainJoinInfo;
  Tags?: { [key: string]: string | undefined };
  IdleDisconnectTimeoutInSeconds?: number;
  IamRoleArn?: string;
  StreamView?: StreamView;
  Platform?: PlatformType;
  MaxConcurrentSessions?: number;
  UsbDeviceFilterStrings?: string[];
  SessionScriptS3Location?: S3Location;
  MaxSessionsPerInstance?: number;
  RootVolumeConfig?: VolumeConfig;
  DisableIMDSV1?: boolean;
}
export const CreateFleetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    ImageName: S.optional(S.String),
    ImageArn: S.optional(S.String),
    InstanceType: S.optional(S.String),
    FleetType: S.optional(FleetType),
    ComputeCapacity: S.optional(ComputeCapacity),
    VpcConfig: S.optional(VpcConfig),
    MaxUserDurationInSeconds: S.optional(S.Number),
    DisconnectTimeoutInSeconds: S.optional(S.Number),
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    EnableDefaultInternetAccess: S.optional(S.Boolean),
    DomainJoinInfo: S.optional(DomainJoinInfo),
    Tags: S.optional(Tags),
    IdleDisconnectTimeoutInSeconds: S.optional(S.Number),
    IamRoleArn: S.optional(S.String),
    StreamView: S.optional(StreamView),
    Platform: S.optional(PlatformType),
    MaxConcurrentSessions: S.optional(S.Number),
    UsbDeviceFilterStrings: S.optional(UsbDeviceFilterStrings),
    SessionScriptS3Location: S.optional(S3Location),
    MaxSessionsPerInstance: S.optional(S.Number),
    RootVolumeConfig: S.optional(VolumeConfig),
    DisableIMDSV1: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateFleetRequest",
}) as any as S.Schema<CreateFleetRequest>;
export interface ComputeCapacityStatus {
  Desired?: number;
  Running?: number;
  InUse?: number;
  Available?: number;
  DesiredUserSessions?: number;
  AvailableUserSessions?: number;
  ActiveUserSessions?: number;
  ActualUserSessions?: number;
  Draining?: number;
  DrainModeActiveUserSessions?: number;
  DrainModeUnusedUserSessions?: number;
}
export const ComputeCapacityStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Desired: S.optional(S.Number),
    Running: S.optional(S.Number),
    InUse: S.optional(S.Number),
    Available: S.optional(S.Number),
    DesiredUserSessions: S.optional(S.Number),
    AvailableUserSessions: S.optional(S.Number),
    ActiveUserSessions: S.optional(S.Number),
    ActualUserSessions: S.optional(S.Number),
    Draining: S.optional(S.Number),
    DrainModeActiveUserSessions: S.optional(S.Number),
    DrainModeUnusedUserSessions: S.optional(S.Number),
  }),
).annotate({
  identifier: "ComputeCapacityStatus",
}) as any as S.Schema<ComputeCapacityStatus>;
export type FleetState =
  | "STARTING"
  | "RUNNING"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export const FleetState = S.String;

export interface FleetError {
  ErrorCode?: FleetErrorCode;
  ErrorMessage?: string;
}
export const FleetError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(FleetErrorCode),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "FleetError" }) as any as S.Schema<FleetError>;
export type FleetErrors = FleetError[];
export const FleetErrors = /*@__PURE__*/ S.Array(FleetError);
export interface Fleet {
  Arn?: string;
  Name?: string;
  DisplayName?: string;
  Description?: string;
  ImageName?: string;
  ImageArn?: string;
  InstanceType?: string;
  FleetType?: FleetType;
  ComputeCapacityStatus?: ComputeCapacityStatus;
  MaxUserDurationInSeconds?: number;
  DisconnectTimeoutInSeconds?: number;
  State?: FleetState;
  VpcConfig?: VpcConfig;
  CreatedTime?: Date;
  FleetErrors?: FleetError[];
  EnableDefaultInternetAccess?: boolean;
  DomainJoinInfo?: DomainJoinInfo;
  IdleDisconnectTimeoutInSeconds?: number;
  IamRoleArn?: string;
  StreamView?: StreamView;
  Platform?: PlatformType;
  MaxConcurrentSessions?: number;
  UsbDeviceFilterStrings?: string[];
  SessionScriptS3Location?: S3Location;
  MaxSessionsPerInstance?: number;
  RootVolumeConfig?: VolumeConfig;
  DisableIMDSV1?: boolean;
}
export const Fleet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    DisplayName: S.optional(S.String),
    Description: S.optional(S.String),
    ImageName: S.optional(S.String),
    ImageArn: S.optional(S.String),
    InstanceType: S.optional(S.String),
    FleetType: S.optional(FleetType),
    ComputeCapacityStatus: S.optional(ComputeCapacityStatus),
    MaxUserDurationInSeconds: S.optional(S.Number),
    DisconnectTimeoutInSeconds: S.optional(S.Number),
    State: S.optional(FleetState),
    VpcConfig: S.optional(VpcConfig),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FleetErrors: S.optional(FleetErrors),
    EnableDefaultInternetAccess: S.optional(S.Boolean),
    DomainJoinInfo: S.optional(DomainJoinInfo),
    IdleDisconnectTimeoutInSeconds: S.optional(S.Number),
    IamRoleArn: S.optional(S.String),
    StreamView: S.optional(StreamView),
    Platform: S.optional(PlatformType),
    MaxConcurrentSessions: S.optional(S.Number),
    UsbDeviceFilterStrings: S.optional(UsbDeviceFilterStrings),
    SessionScriptS3Location: S.optional(S3Location),
    MaxSessionsPerInstance: S.optional(S.Number),
    RootVolumeConfig: S.optional(VolumeConfig),
    DisableIMDSV1: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Fleet" }) as any as S.Schema<Fleet>;
export interface CreateFleetResult {
  Fleet?: Fleet & {
    Arn: Arn;
    Name: string;
    InstanceType: string;
    ComputeCapacityStatus: ComputeCapacityStatus & { Desired: number };
    State: FleetState;
    SessionScriptS3Location: S3Location & { S3Bucket: S3Bucket };
  };
}
export const CreateFleetResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Fleet: S.optional(Fleet) }),
).annotate({
  identifier: "CreateFleetResult",
}) as any as S.Schema<CreateFleetResult>;
export type AppstreamAgentVersion = string;
export interface CreateImageBuilderRequest {
  Name?: string;
  ImageName?: string;
  ImageArn?: string;
  InstanceType?: string;
  Description?: string;
  DisplayName?: string;
  VpcConfig?: VpcConfig;
  IamRoleArn?: string;
  EnableDefaultInternetAccess?: boolean;
  DomainJoinInfo?: DomainJoinInfo;
  AppstreamAgentVersion?: string;
  Tags?: { [key: string]: string | undefined };
  AccessEndpoints?: AccessEndpoint[];
  RootVolumeConfig?: VolumeConfig;
  SoftwaresToInstall?: string[];
  SoftwaresToUninstall?: string[];
  DisableIMDSV1?: boolean;
}
export const CreateImageBuilderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    ImageName: S.optional(S.String),
    ImageArn: S.optional(S.String),
    InstanceType: S.optional(S.String),
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
    IamRoleArn: S.optional(S.String),
    EnableDefaultInternetAccess: S.optional(S.Boolean),
    DomainJoinInfo: S.optional(DomainJoinInfo),
    AppstreamAgentVersion: S.optional(S.String),
    Tags: S.optional(Tags),
    AccessEndpoints: S.optional(AccessEndpointList),
    RootVolumeConfig: S.optional(VolumeConfig),
    SoftwaresToInstall: S.optional(StringList),
    SoftwaresToUninstall: S.optional(StringList),
    DisableIMDSV1: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateImageBuilderRequest",
}) as any as S.Schema<CreateImageBuilderRequest>;
export type ImageBuilderState =
  | "PENDING"
  | "UPDATING_AGENT"
  | "RUNNING"
  | "STOPPING"
  | "STOPPED"
  | "REBOOTING"
  | "SNAPSHOTTING"
  | "DELETING"
  | "FAILED"
  | "UPDATING"
  | "PENDING_QUALIFICATION"
  | "PENDING_SYNCING_APPS"
  | "SYNCING_APPS"
  | "PENDING_IMAGE_IMPORT"
  | (string & {});
export const ImageBuilderState = S.String;

export type ImageBuilderStateChangeReasonCode =
  | "INTERNAL_ERROR"
  | "IMAGE_UNAVAILABLE"
  | (string & {});
export const ImageBuilderStateChangeReasonCode = S.String;

export interface ImageBuilderStateChangeReason {
  Code?: ImageBuilderStateChangeReasonCode;
  Message?: string;
}
export const ImageBuilderStateChangeReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(ImageBuilderStateChangeReasonCode),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "ImageBuilderStateChangeReason",
}) as any as S.Schema<ImageBuilderStateChangeReason>;
export interface NetworkAccessConfiguration {
  EniPrivateIpAddress?: string;
  EniIpv6Addresses?: string[];
  EniId?: string;
}
export const NetworkAccessConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EniPrivateIpAddress: S.optional(S.String),
    EniIpv6Addresses: S.optional(StringList),
    EniId: S.optional(S.String),
  }),
).annotate({
  identifier: "NetworkAccessConfiguration",
}) as any as S.Schema<NetworkAccessConfiguration>;
export type LatestAppstreamAgentVersion = "TRUE" | "FALSE" | (string & {});
export const LatestAppstreamAgentVersion = S.String;

export interface ImageBuilder {
  Name?: string;
  Arn?: string;
  ImageArn?: string;
  Description?: string;
  DisplayName?: string;
  VpcConfig?: VpcConfig;
  InstanceType?: string;
  Platform?: PlatformType;
  IamRoleArn?: string;
  State?: ImageBuilderState;
  StateChangeReason?: ImageBuilderStateChangeReason;
  CreatedTime?: Date;
  EnableDefaultInternetAccess?: boolean;
  DomainJoinInfo?: DomainJoinInfo;
  NetworkAccessConfiguration?: NetworkAccessConfiguration;
  ImageBuilderErrors?: ResourceError[];
  AppstreamAgentVersion?: string;
  AccessEndpoints?: AccessEndpoint[];
  RootVolumeConfig?: VolumeConfig;
  LatestAppstreamAgentVersion?: LatestAppstreamAgentVersion;
  DisableIMDSV1?: boolean;
}
export const ImageBuilder = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Arn: S.optional(S.String),
    ImageArn: S.optional(S.String),
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
    InstanceType: S.optional(S.String),
    Platform: S.optional(PlatformType),
    IamRoleArn: S.optional(S.String),
    State: S.optional(ImageBuilderState),
    StateChangeReason: S.optional(ImageBuilderStateChangeReason),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EnableDefaultInternetAccess: S.optional(S.Boolean),
    DomainJoinInfo: S.optional(DomainJoinInfo),
    NetworkAccessConfiguration: S.optional(NetworkAccessConfiguration),
    ImageBuilderErrors: S.optional(ResourceErrors),
    AppstreamAgentVersion: S.optional(S.String),
    AccessEndpoints: S.optional(AccessEndpointList),
    RootVolumeConfig: S.optional(VolumeConfig),
    LatestAppstreamAgentVersion: S.optional(LatestAppstreamAgentVersion),
    DisableIMDSV1: S.optional(S.Boolean),
  }),
).annotate({ identifier: "ImageBuilder" }) as any as S.Schema<ImageBuilder>;
export interface CreateImageBuilderResult {
  ImageBuilder?: ImageBuilder & {
    Name: string;
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
  };
}
export const CreateImageBuilderResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ImageBuilder: S.optional(ImageBuilder) }),
).annotate({
  identifier: "CreateImageBuilderResult",
}) as any as S.Schema<CreateImageBuilderResult>;
export interface CreateImageBuilderStreamingURLRequest {
  Name?: string;
  Validity?: number;
}
export const CreateImageBuilderStreamingURLRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Name: S.optional(S.String),
      Validity: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CreateImageBuilderStreamingURLRequest",
}) as any as S.Schema<CreateImageBuilderStreamingURLRequest>;
export interface CreateImageBuilderStreamingURLResult {
  StreamingURL?: string;
  Expires?: Date;
}
export const CreateImageBuilderStreamingURLResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StreamingURL: S.optional(S.String),
      Expires: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    }),
).annotate({
  identifier: "CreateImageBuilderStreamingURLResult",
}) as any as S.Schema<CreateImageBuilderStreamingURLResult>;
export type WorkspaceImageId = string;
export type ImageImportDescription = string;
export type ImageImportDisplayName = string;
export type InstanceType = string;
export interface RuntimeValidationConfig {
  IntendedInstanceType?: string;
}
export const RuntimeValidationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IntendedInstanceType: S.optional(S.String) }),
).annotate({
  identifier: "RuntimeValidationConfig",
}) as any as S.Schema<RuntimeValidationConfig>;
export type AgentSoftwareVersion =
  | "CURRENT_LATEST"
  | "ALWAYS_LATEST"
  | (string & {});
export const AgentSoftwareVersion = S.String;

export type AppName = string;
export type AppDisplayName = string;
export type FilePath = string | redacted.Redacted<string>;
export type LaunchParameters = string | redacted.Redacted<string>;
export interface ApplicationConfig {
  Name?: string;
  DisplayName?: string;
  AbsoluteAppPath?: string | redacted.Redacted<string>;
  AbsoluteIconPath?: string | redacted.Redacted<string>;
  AbsoluteManifestPath?: string | redacted.Redacted<string>;
  WorkingDirectory?: string | redacted.Redacted<string>;
  LaunchParameters?: string | redacted.Redacted<string>;
}
export const ApplicationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    DisplayName: S.optional(S.String),
    AbsoluteAppPath: S.optional(SensitiveString),
    AbsoluteIconPath: S.optional(SensitiveString),
    AbsoluteManifestPath: S.optional(SensitiveString),
    WorkingDirectory: S.optional(SensitiveString),
    LaunchParameters: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ApplicationConfig",
}) as any as S.Schema<ApplicationConfig>;
export type AppCatalogConfig = ApplicationConfig[];
export const AppCatalogConfig = /*@__PURE__*/ S.Array(ApplicationConfig);
export interface CreateImportedImageRequest {
  Name?: string;
  SourceAmiId?: string;
  WorkspaceImageId?: string;
  IamRoleArn?: string;
  Description?: string;
  DisplayName?: string;
  Tags?: { [key: string]: string | undefined };
  RuntimeValidationConfig?: RuntimeValidationConfig;
  AgentSoftwareVersion?: AgentSoftwareVersion;
  AppCatalogConfig?: ApplicationConfig[];
  DryRun?: boolean;
}
export const CreateImportedImageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    SourceAmiId: S.optional(S.String),
    WorkspaceImageId: S.optional(S.String),
    IamRoleArn: S.optional(S.String),
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    Tags: S.optional(Tags),
    RuntimeValidationConfig: S.optional(RuntimeValidationConfig),
    AgentSoftwareVersion: S.optional(AgentSoftwareVersion),
    AppCatalogConfig: S.optional(AppCatalogConfig),
    DryRun: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateImportedImageRequest",
}) as any as S.Schema<CreateImportedImageRequest>;
export type ImageState =
  | "PENDING"
  | "AVAILABLE"
  | "FAILED"
  | "COPYING"
  | "DELETING"
  | "CREATING"
  | "IMPORTING"
  | "VALIDATING"
  | (string & {});
export const ImageState = S.String;

export type VisibilityType = "PUBLIC" | "PRIVATE" | "SHARED" | (string & {});
export const VisibilityType = S.String;

export type ImageStateChangeReasonCode =
  | "INTERNAL_ERROR"
  | "IMAGE_BUILDER_NOT_AVAILABLE"
  | "IMAGE_COPY_FAILURE"
  | "IMAGE_UPDATE_FAILURE"
  | "IMAGE_IMPORT_FAILURE"
  | (string & {});
export const ImageStateChangeReasonCode = S.String;

export interface ImageStateChangeReason {
  Code?: ImageStateChangeReasonCode;
  Message?: string;
}
export const ImageStateChangeReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(ImageStateChangeReasonCode),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "ImageStateChangeReason",
}) as any as S.Schema<ImageStateChangeReason>;
export type Applications = Application[];
export const Applications = /*@__PURE__*/ S.Array(Application);
export interface ImagePermissions {
  allowFleet?: boolean;
  allowImageBuilder?: boolean;
}
export const ImagePermissions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allowFleet: S.optional(S.Boolean),
    allowImageBuilder: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ImagePermissions",
}) as any as S.Schema<ImagePermissions>;
export type DynamicAppProvidersEnabled = "ENABLED" | "DISABLED" | (string & {});
export const DynamicAppProvidersEnabled = S.String;

export type ImageSharedWithOthers = "TRUE" | "FALSE" | (string & {});
export const ImageSharedWithOthers = S.String;

export type ImageType = "CUSTOM" | "NATIVE" | "BYOL" | (string & {});
export const ImageType = S.String;

export interface Image {
  Name?: string;
  Arn?: string;
  BaseImageArn?: string;
  DisplayName?: string;
  State?: ImageState;
  Visibility?: VisibilityType;
  ImageBuilderSupported?: boolean;
  ImageBuilderName?: string;
  Platform?: PlatformType;
  Description?: string;
  StateChangeReason?: ImageStateChangeReason;
  Applications?: Application[];
  CreatedTime?: Date;
  PublicBaseImageReleasedDate?: Date;
  AppstreamAgentVersion?: string;
  ImagePermissions?: ImagePermissions;
  ImageErrors?: ResourceError[];
  LatestAppstreamAgentVersion?: LatestAppstreamAgentVersion;
  SupportedInstanceFamilies?: string[];
  DynamicAppProvidersEnabled?: DynamicAppProvidersEnabled;
  ImageSharedWithOthers?: ImageSharedWithOthers;
  ManagedSoftwareIncluded?: boolean;
  ImageType?: ImageType;
}
export const Image = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Arn: S.optional(S.String),
    BaseImageArn: S.optional(S.String),
    DisplayName: S.optional(S.String),
    State: S.optional(ImageState),
    Visibility: S.optional(VisibilityType),
    ImageBuilderSupported: S.optional(S.Boolean),
    ImageBuilderName: S.optional(S.String),
    Platform: S.optional(PlatformType),
    Description: S.optional(S.String),
    StateChangeReason: S.optional(ImageStateChangeReason),
    Applications: S.optional(Applications),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    PublicBaseImageReleasedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AppstreamAgentVersion: S.optional(S.String),
    ImagePermissions: S.optional(ImagePermissions),
    ImageErrors: S.optional(ResourceErrors),
    LatestAppstreamAgentVersion: S.optional(LatestAppstreamAgentVersion),
    SupportedInstanceFamilies: S.optional(StringList),
    DynamicAppProvidersEnabled: S.optional(DynamicAppProvidersEnabled),
    ImageSharedWithOthers: S.optional(ImageSharedWithOthers),
    ManagedSoftwareIncluded: S.optional(S.Boolean),
    ImageType: S.optional(ImageType),
  }),
).annotate({ identifier: "Image" }) as any as S.Schema<Image>;
export interface CreateImportedImageResult {
  Image?: Image & {
    Name: string;
    Applications: (Application & {
      IconS3Location: S3Location & { S3Bucket: S3Bucket };
    })[];
  };
}
export const CreateImportedImageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Image: S.optional(Image) }),
).annotate({
  identifier: "CreateImportedImageResult",
}) as any as S.Schema<CreateImportedImageResult>;
export type StorageConnectorType =
  | "HOMEFOLDERS"
  | "GOOGLE_DRIVE"
  | "ONE_DRIVE"
  | (string & {});
export const StorageConnectorType = S.String;

export type ResourceIdentifier = string;
export type Domain = string;
export type DomainList = string[];
export const DomainList = /*@__PURE__*/ S.Array(S.String);
export interface StorageConnector {
  ConnectorType?: StorageConnectorType;
  ResourceIdentifier?: string;
  Domains?: string[];
  DomainsRequireAdminConsent?: string[];
}
export const StorageConnector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectorType: S.optional(StorageConnectorType),
    ResourceIdentifier: S.optional(S.String),
    Domains: S.optional(DomainList),
    DomainsRequireAdminConsent: S.optional(DomainList),
  }),
).annotate({
  identifier: "StorageConnector",
}) as any as S.Schema<StorageConnector>;
export type StorageConnectorList = StorageConnector[];
export const StorageConnectorList = /*@__PURE__*/ S.Array(StorageConnector);
export type RedirectURL = string;
export type FeedbackURL = string;
export type Action =
  | "CLIPBOARD_COPY_FROM_LOCAL_DEVICE"
  | "CLIPBOARD_COPY_TO_LOCAL_DEVICE"
  | "FILE_UPLOAD"
  | "FILE_DOWNLOAD"
  | "PRINTING_TO_LOCAL_DEVICE"
  | "DOMAIN_PASSWORD_SIGNIN"
  | "DOMAIN_SMART_CARD_SIGNIN"
  | "AUTO_TIME_ZONE_REDIRECTION"
  | (string & {});
export const Action = S.String;

export type Permission = "ENABLED" | "DISABLED" | (string & {});
export const Permission = S.String;

export interface UserSetting {
  Action?: Action;
  Permission?: Permission;
  MaximumLength?: number;
}
export const UserSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(Action),
    Permission: S.optional(Permission),
    MaximumLength: S.optional(S.Number),
  }),
).annotate({ identifier: "UserSetting" }) as any as S.Schema<UserSetting>;
export type UserSettingList = UserSetting[];
export const UserSettingList = /*@__PURE__*/ S.Array(UserSetting);
export type SettingsGroup = string;
export interface ApplicationSettings {
  Enabled?: boolean;
  SettingsGroup?: string;
}
export const ApplicationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    SettingsGroup: S.optional(S.String),
  }),
).annotate({
  identifier: "ApplicationSettings",
}) as any as S.Schema<ApplicationSettings>;
export type EmbedHostDomain = string;
export type EmbedHostDomains = string[];
export const EmbedHostDomains = /*@__PURE__*/ S.Array(S.String);
export type PreferredProtocol = "TCP" | "UDP" | (string & {});
export const PreferredProtocol = S.String;

export interface StreamingExperienceSettings {
  PreferredProtocol?: PreferredProtocol;
}
export const StreamingExperienceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PreferredProtocol: S.optional(PreferredProtocol) }),
).annotate({
  identifier: "StreamingExperienceSettings",
}) as any as S.Schema<StreamingExperienceSettings>;
export type UrlPattern = string;
export type UrlPatternList = string[];
export const UrlPatternList = /*@__PURE__*/ S.Array(S.String);
export interface UrlRedirectionConfig {
  Enabled?: boolean;
  AllowedUrls?: string[];
  DeniedUrls?: string[];
}
export const UrlRedirectionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    AllowedUrls: S.optional(UrlPatternList),
    DeniedUrls: S.optional(UrlPatternList),
  }),
).annotate({
  identifier: "UrlRedirectionConfig",
}) as any as S.Schema<UrlRedirectionConfig>;
export interface ContentRedirection {
  HostToClient?: UrlRedirectionConfig;
}
export const ContentRedirection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HostToClient: S.optional(UrlRedirectionConfig) }),
).annotate({
  identifier: "ContentRedirection",
}) as any as S.Schema<ContentRedirection>;
export type AgentAction =
  | "COMPUTER_VISION"
  | "COMPUTER_INPUT"
  | "FORWARD_MCP_TOOLS"
  | (string & {});
export const AgentAction = S.String;

export interface AgentAccessSetting {
  AgentAction?: AgentAction;
  Permission?: Permission;
}
export const AgentAccessSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AgentAction: S.optional(AgentAction),
    Permission: S.optional(Permission),
  }),
).annotate({
  identifier: "AgentAccessSetting",
}) as any as S.Schema<AgentAccessSetting>;
export type AgentAccessSettingList = AgentAccessSetting[];
export const AgentAccessSettingList = /*@__PURE__*/ S.Array(AgentAccessSetting);
export type S3BucketArn = string;
export type ScreenResolution = "W_1280xH_720" | (string & {});
export const ScreenResolution = S.String;

export type ScreenImageFormat = "PNG" | "JPEG" | (string & {});
export const ScreenImageFormat = S.String;

export type UserControlMode =
  | "VIEW_ONLY"
  | "VIEW_STOP"
  | "DISABLED"
  | (string & {});
export const UserControlMode = S.String;

export interface AgentAccessConfig {
  Settings?: AgentAccessSetting[];
  S3BucketArn?: string;
  ScreenshotsUploadEnabled?: boolean;
  ScreenResolution?: ScreenResolution;
  ScreenImageFormat?: ScreenImageFormat;
  UserControlMode?: UserControlMode;
}
export const AgentAccessConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Settings: S.optional(AgentAccessSettingList),
    S3BucketArn: S.optional(S.String),
    ScreenshotsUploadEnabled: S.optional(S.Boolean),
    ScreenResolution: S.optional(ScreenResolution),
    ScreenImageFormat: S.optional(ScreenImageFormat),
    UserControlMode: S.optional(UserControlMode),
  }),
).annotate({
  identifier: "AgentAccessConfig",
}) as any as S.Schema<AgentAccessConfig>;
export interface CreateStackRequest {
  Name?: string;
  Description?: string;
  DisplayName?: string;
  StorageConnectors?: StorageConnector[];
  RedirectURL?: string;
  FeedbackURL?: string;
  UserSettings?: UserSetting[];
  ApplicationSettings?: ApplicationSettings;
  Tags?: { [key: string]: string | undefined };
  AccessEndpoints?: AccessEndpoint[];
  EmbedHostDomains?: string[];
  StreamingExperienceSettings?: StreamingExperienceSettings;
  ContentRedirection?: ContentRedirection;
  AgentAccessConfig?: AgentAccessConfig;
}
export const CreateStackRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    StorageConnectors: S.optional(StorageConnectorList),
    RedirectURL: S.optional(S.String),
    FeedbackURL: S.optional(S.String),
    UserSettings: S.optional(UserSettingList),
    ApplicationSettings: S.optional(ApplicationSettings),
    Tags: S.optional(Tags),
    AccessEndpoints: S.optional(AccessEndpointList),
    EmbedHostDomains: S.optional(EmbedHostDomains),
    StreamingExperienceSettings: S.optional(StreamingExperienceSettings),
    ContentRedirection: S.optional(ContentRedirection),
    AgentAccessConfig: S.optional(AgentAccessConfig),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateStackRequest",
}) as any as S.Schema<CreateStackRequest>;
export type StackErrorCode =
  | "STORAGE_CONNECTOR_ERROR"
  | "INTERNAL_SERVICE_ERROR"
  | (string & {});
export const StackErrorCode = S.String;

export interface StackError {
  ErrorCode?: StackErrorCode;
  ErrorMessage?: string;
}
export const StackError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(StackErrorCode),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "StackError" }) as any as S.Schema<StackError>;
export type StackErrors = StackError[];
export const StackErrors = /*@__PURE__*/ S.Array(StackError);
export interface ApplicationSettingsResponse {
  Enabled?: boolean;
  SettingsGroup?: string;
  S3BucketName?: string;
}
export const ApplicationSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    SettingsGroup: S.optional(S.String),
    S3BucketName: S.optional(S.String),
  }),
).annotate({
  identifier: "ApplicationSettingsResponse",
}) as any as S.Schema<ApplicationSettingsResponse>;
export interface Stack {
  Arn?: string;
  Name?: string;
  Description?: string;
  DisplayName?: string;
  CreatedTime?: Date;
  StorageConnectors?: StorageConnector[];
  RedirectURL?: string;
  FeedbackURL?: string;
  StackErrors?: StackError[];
  UserSettings?: UserSetting[];
  ApplicationSettings?: ApplicationSettingsResponse;
  AccessEndpoints?: AccessEndpoint[];
  EmbedHostDomains?: string[];
  StreamingExperienceSettings?: StreamingExperienceSettings;
  ContentRedirection?: ContentRedirection;
  AgentAccessConfig?: AgentAccessConfig;
}
export const Stack = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StorageConnectors: S.optional(StorageConnectorList),
    RedirectURL: S.optional(S.String),
    FeedbackURL: S.optional(S.String),
    StackErrors: S.optional(StackErrors),
    UserSettings: S.optional(UserSettingList),
    ApplicationSettings: S.optional(ApplicationSettingsResponse),
    AccessEndpoints: S.optional(AccessEndpointList),
    EmbedHostDomains: S.optional(EmbedHostDomains),
    StreamingExperienceSettings: S.optional(StreamingExperienceSettings),
    ContentRedirection: S.optional(ContentRedirection),
    AgentAccessConfig: S.optional(AgentAccessConfig),
  }),
).annotate({ identifier: "Stack" }) as any as S.Schema<Stack>;
export interface CreateStackResult {
  Stack?: Stack & {
    Name: string;
    StorageConnectors: (StorageConnector & {
      ConnectorType: StorageConnectorType;
    })[];
    UserSettings: (UserSetting & { Action: Action; Permission: Permission })[];
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
    ContentRedirection: ContentRedirection & {
      HostToClient: UrlRedirectionConfig & { Enabled: boolean };
    };
    AgentAccessConfig: AgentAccessConfig & {
      Settings: (AgentAccessSetting & {
        AgentAction: AgentAction;
        Permission: Permission;
      })[];
      ScreenResolution: ScreenResolution;
      ScreenImageFormat: ScreenImageFormat;
    };
  };
}
export const CreateStackResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Stack: S.optional(Stack) }),
).annotate({
  identifier: "CreateStackResult",
}) as any as S.Schema<CreateStackResult>;
export type StreamingUrlUserId = string;
export interface CreateStreamingURLRequest {
  StackName?: string;
  FleetName?: string;
  UserId?: string;
  ApplicationId?: string;
  Validity?: number;
  SessionContext?: string;
}
export const CreateStreamingURLRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    FleetName: S.optional(S.String),
    UserId: S.optional(S.String),
    ApplicationId: S.optional(S.String),
    Validity: S.optional(S.Number),
    SessionContext: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateStreamingURLRequest",
}) as any as S.Schema<CreateStreamingURLRequest>;
export interface CreateStreamingURLResult {
  StreamingURL?: string;
  Expires?: Date;
}
export const CreateStreamingURLResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamingURL: S.optional(S.String),
    Expires: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "CreateStreamingURLResult",
}) as any as S.Schema<CreateStreamingURLResult>;
export type ThemeFooterLinkDisplayName = string;
export type ThemeFooterLinkURL = string;
export interface ThemeFooterLink {
  DisplayName?: string;
  FooterLinkURL?: string;
}
export const ThemeFooterLink = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DisplayName: S.optional(S.String),
    FooterLinkURL: S.optional(S.String),
  }),
).annotate({
  identifier: "ThemeFooterLink",
}) as any as S.Schema<ThemeFooterLink>;
export type ThemeFooterLinks = ThemeFooterLink[];
export const ThemeFooterLinks = /*@__PURE__*/ S.Array(ThemeFooterLink);
export type ThemeTitleText = string;
export type ThemeStyling =
  | "LIGHT_BLUE"
  | "BLUE"
  | "PINK"
  | "RED"
  | (string & {});
export const ThemeStyling = S.String;

export interface CreateThemeForStackRequest {
  StackName?: string;
  FooterLinks?: ThemeFooterLink[];
  TitleText?: string;
  ThemeStyling?: ThemeStyling;
  OrganizationLogoS3Location?: S3Location;
  FaviconS3Location?: S3Location;
}
export const CreateThemeForStackRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    FooterLinks: S.optional(ThemeFooterLinks),
    TitleText: S.optional(S.String),
    ThemeStyling: S.optional(ThemeStyling),
    OrganizationLogoS3Location: S.optional(S3Location),
    FaviconS3Location: S.optional(S3Location),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateThemeForStackRequest",
}) as any as S.Schema<CreateThemeForStackRequest>;
export type ThemeState = "ENABLED" | "DISABLED" | (string & {});
export const ThemeState = S.String;

export interface Theme {
  StackName?: string;
  State?: ThemeState;
  ThemeTitleText?: string;
  ThemeStyling?: ThemeStyling;
  ThemeFooterLinks?: ThemeFooterLink[];
  ThemeOrganizationLogoURL?: string;
  ThemeFaviconURL?: string;
  CreatedTime?: Date;
}
export const Theme = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    State: S.optional(ThemeState),
    ThemeTitleText: S.optional(S.String),
    ThemeStyling: S.optional(ThemeStyling),
    ThemeFooterLinks: S.optional(ThemeFooterLinks),
    ThemeOrganizationLogoURL: S.optional(S.String),
    ThemeFaviconURL: S.optional(S.String),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Theme" }) as any as S.Schema<Theme>;
export interface CreateThemeForStackResult {
  Theme?: Theme;
}
export const CreateThemeForStackResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Theme: S.optional(Theme) }),
).annotate({
  identifier: "CreateThemeForStackResult",
}) as any as S.Schema<CreateThemeForStackResult>;
export interface CreateUpdatedImageRequest {
  existingImageName?: string;
  newImageName?: string;
  newImageDescription?: string;
  newImageDisplayName?: string;
  newImageTags?: { [key: string]: string | undefined };
  dryRun?: boolean;
}
export const CreateUpdatedImageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    existingImageName: S.optional(S.String),
    newImageName: S.optional(S.String),
    newImageDescription: S.optional(S.String),
    newImageDisplayName: S.optional(S.String),
    newImageTags: S.optional(Tags),
    dryRun: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateUpdatedImageRequest",
}) as any as S.Schema<CreateUpdatedImageRequest>;
export interface CreateUpdatedImageResult {
  image?: Image & {
    Name: string;
    Applications: (Application & {
      IconS3Location: S3Location & { S3Bucket: S3Bucket };
    })[];
  };
  canUpdateImage?: boolean;
}
export const CreateUpdatedImageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ image: S.optional(Image), canUpdateImage: S.optional(S.Boolean) }),
).annotate({
  identifier: "CreateUpdatedImageResult",
}) as any as S.Schema<CreateUpdatedImageResult>;
export interface CreateUsageReportSubscriptionRequest {}
export const CreateUsageReportSubscriptionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CreateUsageReportSubscriptionRequest",
}) as any as S.Schema<CreateUsageReportSubscriptionRequest>;
export type UsageReportSchedule = "DAILY" | (string & {});
export const UsageReportSchedule = S.String;

export interface CreateUsageReportSubscriptionResult {
  S3BucketName?: string;
  Schedule?: UsageReportSchedule;
}
export const CreateUsageReportSubscriptionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3BucketName: S.optional(S.String),
    Schedule: S.optional(UsageReportSchedule),
  }),
).annotate({
  identifier: "CreateUsageReportSubscriptionResult",
}) as any as S.Schema<CreateUsageReportSubscriptionResult>;
export type MessageAction = "SUPPRESS" | "RESEND" | (string & {});
export const MessageAction = S.String;

export type UserAttributeValue = string | redacted.Redacted<string>;
export interface CreateUserRequest {
  UserName?: string | redacted.Redacted<string>;
  MessageAction?: MessageAction;
  FirstName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
  AuthenticationType?: AuthenticationType;
}
export const CreateUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserName: S.optional(SensitiveString),
    MessageAction: S.optional(MessageAction),
    FirstName: S.optional(SensitiveString),
    LastName: S.optional(SensitiveString),
    AuthenticationType: S.optional(AuthenticationType),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateUserRequest",
}) as any as S.Schema<CreateUserRequest>;
export interface CreateUserResult {}
export const CreateUserResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateUserResult",
}) as any as S.Schema<CreateUserResult>;
export interface DeleteAppBlockRequest {
  Name?: string;
}
export const DeleteAppBlockRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteAppBlockRequest",
}) as any as S.Schema<DeleteAppBlockRequest>;
export interface DeleteAppBlockResult {}
export const DeleteAppBlockResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAppBlockResult",
}) as any as S.Schema<DeleteAppBlockResult>;
export interface DeleteAppBlockBuilderRequest {
  Name?: string;
}
export const DeleteAppBlockBuilderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteAppBlockBuilderRequest",
}) as any as S.Schema<DeleteAppBlockBuilderRequest>;
export interface DeleteAppBlockBuilderResult {}
export const DeleteAppBlockBuilderResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAppBlockBuilderResult",
}) as any as S.Schema<DeleteAppBlockBuilderResult>;
export interface DeleteApplicationRequest {
  Name?: string;
}
export const DeleteApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteApplicationRequest",
}) as any as S.Schema<DeleteApplicationRequest>;
export interface DeleteApplicationResult {}
export const DeleteApplicationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteApplicationResult",
}) as any as S.Schema<DeleteApplicationResult>;
export interface DeleteDirectoryConfigRequest {
  DirectoryName?: string;
}
export const DeleteDirectoryConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DirectoryName: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteDirectoryConfigRequest",
}) as any as S.Schema<DeleteDirectoryConfigRequest>;
export interface DeleteDirectoryConfigResult {}
export const DeleteDirectoryConfigResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDirectoryConfigResult",
}) as any as S.Schema<DeleteDirectoryConfigResult>;
export interface DeleteEntitlementRequest {
  Name?: string;
  StackName?: string;
}
export const DeleteEntitlementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    StackName: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteEntitlementRequest",
}) as any as S.Schema<DeleteEntitlementRequest>;
export interface DeleteEntitlementResult {}
export const DeleteEntitlementResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEntitlementResult",
}) as any as S.Schema<DeleteEntitlementResult>;
export interface DeleteFleetRequest {
  Name?: string;
}
export const DeleteFleetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteFleetRequest",
}) as any as S.Schema<DeleteFleetRequest>;
export interface DeleteFleetResult {}
export const DeleteFleetResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteFleetResult",
}) as any as S.Schema<DeleteFleetResult>;
export interface DeleteImageRequest {
  Name?: string;
}
export const DeleteImageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteImageRequest",
}) as any as S.Schema<DeleteImageRequest>;
export interface DeleteImageResult {
  Image?: Image & {
    Name: string;
    Applications: (Application & {
      IconS3Location: S3Location & { S3Bucket: S3Bucket };
    })[];
  };
}
export const DeleteImageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Image: S.optional(Image) }),
).annotate({
  identifier: "DeleteImageResult",
}) as any as S.Schema<DeleteImageResult>;
export interface DeleteImageBuilderRequest {
  Name?: string;
}
export const DeleteImageBuilderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteImageBuilderRequest",
}) as any as S.Schema<DeleteImageBuilderRequest>;
export interface DeleteImageBuilderResult {
  ImageBuilder?: ImageBuilder & {
    Name: string;
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
  };
}
export const DeleteImageBuilderResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ImageBuilder: S.optional(ImageBuilder) }),
).annotate({
  identifier: "DeleteImageBuilderResult",
}) as any as S.Schema<DeleteImageBuilderResult>;
export type AwsAccountId = string;
export interface DeleteImagePermissionsRequest {
  Name?: string;
  SharedAccountId?: string;
}
export const DeleteImagePermissionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    SharedAccountId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteImagePermissionsRequest",
}) as any as S.Schema<DeleteImagePermissionsRequest>;
export interface DeleteImagePermissionsResult {}
export const DeleteImagePermissionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteImagePermissionsResult",
}) as any as S.Schema<DeleteImagePermissionsResult>;
export interface DeleteStackRequest {
  Name?: string;
}
export const DeleteStackRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteStackRequest",
}) as any as S.Schema<DeleteStackRequest>;
export interface DeleteStackResult {}
export const DeleteStackResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteStackResult",
}) as any as S.Schema<DeleteStackResult>;
export interface DeleteThemeForStackRequest {
  StackName?: string;
}
export const DeleteThemeForStackRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StackName: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteThemeForStackRequest",
}) as any as S.Schema<DeleteThemeForStackRequest>;
export interface DeleteThemeForStackResult {}
export const DeleteThemeForStackResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteThemeForStackResult",
}) as any as S.Schema<DeleteThemeForStackResult>;
export interface DeleteUsageReportSubscriptionRequest {}
export const DeleteUsageReportSubscriptionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DeleteUsageReportSubscriptionRequest",
}) as any as S.Schema<DeleteUsageReportSubscriptionRequest>;
export interface DeleteUsageReportSubscriptionResult {}
export const DeleteUsageReportSubscriptionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteUsageReportSubscriptionResult",
}) as any as S.Schema<DeleteUsageReportSubscriptionResult>;
export interface DeleteUserRequest {
  UserName?: string | redacted.Redacted<string>;
  AuthenticationType?: AuthenticationType;
}
export const DeleteUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserName: S.optional(SensitiveString),
    AuthenticationType: S.optional(AuthenticationType),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteUserRequest",
}) as any as S.Schema<DeleteUserRequest>;
export interface DeleteUserResult {}
export const DeleteUserResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteUserResult",
}) as any as S.Schema<DeleteUserResult>;
export interface DescribeAppBlockBuilderAppBlockAssociationsRequest {
  AppBlockArn?: string;
  AppBlockBuilderName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeAppBlockBuilderAppBlockAssociationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AppBlockArn: S.optional(S.String),
      AppBlockBuilderName: S.optional(S.String),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DescribeAppBlockBuilderAppBlockAssociationsRequest",
  }) as any as S.Schema<DescribeAppBlockBuilderAppBlockAssociationsRequest>;
export type AppBlockBuilderAppBlockAssociationsList =
  AppBlockBuilderAppBlockAssociation[];
export const AppBlockBuilderAppBlockAssociationsList = /*@__PURE__*/ S.Array(
  AppBlockBuilderAppBlockAssociation,
);
export interface DescribeAppBlockBuilderAppBlockAssociationsResult {
  AppBlockBuilderAppBlockAssociations?: (AppBlockBuilderAppBlockAssociation & {
    AppBlockArn: Arn;
    AppBlockBuilderName: Name;
  })[];
  NextToken?: string;
}
export const DescribeAppBlockBuilderAppBlockAssociationsResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AppBlockBuilderAppBlockAssociations: S.optional(
        AppBlockBuilderAppBlockAssociationsList,
      ),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DescribeAppBlockBuilderAppBlockAssociationsResult",
  }) as any as S.Schema<DescribeAppBlockBuilderAppBlockAssociationsResult>;
export interface DescribeAppBlockBuildersRequest {
  Names?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeAppBlockBuildersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Names: S.optional(StringList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeAppBlockBuildersRequest",
}) as any as S.Schema<DescribeAppBlockBuildersRequest>;
export type AppBlockBuilderList = AppBlockBuilder[];
export const AppBlockBuilderList = /*@__PURE__*/ S.Array(AppBlockBuilder);
export interface DescribeAppBlockBuildersResult {
  AppBlockBuilders?: (AppBlockBuilder & {
    Arn: Arn;
    Name: string;
    Platform: AppBlockBuilderPlatformType;
    InstanceType: string;
    VpcConfig: VpcConfig;
    State: AppBlockBuilderState;
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
  })[];
  NextToken?: string;
}
export const DescribeAppBlockBuildersResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppBlockBuilders: S.optional(AppBlockBuilderList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeAppBlockBuildersResult",
}) as any as S.Schema<DescribeAppBlockBuildersResult>;
export type ArnList = string[];
export const ArnList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeAppBlocksRequest {
  Arns?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeAppBlocksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arns: S.optional(ArnList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeAppBlocksRequest",
}) as any as S.Schema<DescribeAppBlocksRequest>;
export type AppBlocks = AppBlock[];
export const AppBlocks = /*@__PURE__*/ S.Array(AppBlock);
export interface DescribeAppBlocksResult {
  AppBlocks?: (AppBlock & {
    Name: string;
    Arn: Arn;
    SourceS3Location: S3Location & { S3Bucket: S3Bucket };
    SetupScriptDetails: ScriptDetails & {
      ScriptS3Location: S3Location & { S3Bucket: S3Bucket };
      ExecutablePath: string;
      TimeoutInSeconds: number;
    };
    PostSetupScriptDetails: ScriptDetails & {
      ScriptS3Location: S3Location & { S3Bucket: S3Bucket };
      ExecutablePath: string;
      TimeoutInSeconds: number;
    };
  })[];
  NextToken?: string;
}
export const DescribeAppBlocksResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppBlocks: S.optional(AppBlocks),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeAppBlocksResult",
}) as any as S.Schema<DescribeAppBlocksResult>;
export interface DescribeApplicationFleetAssociationsRequest {
  FleetName?: string;
  ApplicationArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeApplicationFleetAssociationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      FleetName: S.optional(S.String),
      ApplicationArn: S.optional(S.String),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DescribeApplicationFleetAssociationsRequest",
  }) as any as S.Schema<DescribeApplicationFleetAssociationsRequest>;
export type ApplicationFleetAssociationList = ApplicationFleetAssociation[];
export const ApplicationFleetAssociationList = /*@__PURE__*/ S.Array(
  ApplicationFleetAssociation,
);
export interface DescribeApplicationFleetAssociationsResult {
  ApplicationFleetAssociations?: (ApplicationFleetAssociation & {
    FleetName: string;
    ApplicationArn: Arn;
  })[];
  NextToken?: string;
}
export const DescribeApplicationFleetAssociationsResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationFleetAssociations: S.optional(ApplicationFleetAssociationList),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DescribeApplicationFleetAssociationsResult",
  }) as any as S.Schema<DescribeApplicationFleetAssociationsResult>;
export interface DescribeApplicationsRequest {
  Arns?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeApplicationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arns: S.optional(ArnList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeApplicationsRequest",
}) as any as S.Schema<DescribeApplicationsRequest>;
export interface DescribeApplicationsResult {
  Applications?: (Application & {
    IconS3Location: S3Location & { S3Bucket: S3Bucket };
  })[];
  NextToken?: string;
}
export const DescribeApplicationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Applications: S.optional(Applications),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeApplicationsResult",
}) as any as S.Schema<DescribeApplicationsResult>;
export interface DescribeAppLicenseUsageRequest {
  BillingPeriod?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeAppLicenseUsageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BillingPeriod: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeAppLicenseUsageRequest",
}) as any as S.Schema<DescribeAppLicenseUsageRequest>;
export interface AdminAppLicenseUsageRecord {
  UserArn?: string;
  BillingPeriod?: string;
  OwnerAWSAccountId?: string;
  SubscriptionFirstUsedDate?: Date;
  SubscriptionLastUsedDate?: Date;
  LicenseType?: string;
  UserId?: string;
}
export const AdminAppLicenseUsageRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserArn: S.optional(S.String),
    BillingPeriod: S.optional(S.String),
    OwnerAWSAccountId: S.optional(S.String),
    SubscriptionFirstUsedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SubscriptionLastUsedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LicenseType: S.optional(S.String),
    UserId: S.optional(S.String),
  }),
).annotate({
  identifier: "AdminAppLicenseUsageRecord",
}) as any as S.Schema<AdminAppLicenseUsageRecord>;
export type AdminAppLicenseUsageList = AdminAppLicenseUsageRecord[];
export const AdminAppLicenseUsageList = /*@__PURE__*/ S.Array(
  AdminAppLicenseUsageRecord,
);
export interface DescribeAppLicenseUsageResult {
  AppLicenseUsages?: (AdminAppLicenseUsageRecord & {
    UserArn: string;
    BillingPeriod: string;
    OwnerAWSAccountId: AwsAccountId;
    SubscriptionFirstUsedDate: Date;
    SubscriptionLastUsedDate: Date;
    LicenseType: string;
    UserId: string;
  })[];
  NextToken?: string;
}
export const DescribeAppLicenseUsageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppLicenseUsages: S.optional(AdminAppLicenseUsageList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeAppLicenseUsageResult",
}) as any as S.Schema<DescribeAppLicenseUsageResult>;
export type DirectoryNameList = string[];
export const DirectoryNameList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeDirectoryConfigsRequest {
  DirectoryNames?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeDirectoryConfigsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryNames: S.optional(DirectoryNameList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeDirectoryConfigsRequest",
}) as any as S.Schema<DescribeDirectoryConfigsRequest>;
export type DirectoryConfigList = DirectoryConfig[];
export const DirectoryConfigList = /*@__PURE__*/ S.Array(DirectoryConfig);
export interface DescribeDirectoryConfigsResult {
  DirectoryConfigs?: (DirectoryConfig & {
    DirectoryName: DirectoryName;
    ServiceAccountCredentials: ServiceAccountCredentials & {
      AccountName: AccountName;
      AccountPassword: AccountPassword;
    };
  })[];
  NextToken?: string;
}
export const DescribeDirectoryConfigsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryConfigs: S.optional(DirectoryConfigList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeDirectoryConfigsResult",
}) as any as S.Schema<DescribeDirectoryConfigsResult>;
export interface DescribeEntitlementsRequest {
  Name?: string;
  StackName?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeEntitlementsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    StackName: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeEntitlementsRequest",
}) as any as S.Schema<DescribeEntitlementsRequest>;
export type EntitlementList = Entitlement[];
export const EntitlementList = /*@__PURE__*/ S.Array(Entitlement);
export interface DescribeEntitlementsResult {
  Entitlements?: (Entitlement & {
    Name: Name;
    StackName: Name;
    AppVisibility: AppVisibility;
    Attributes: (EntitlementAttribute & { Name: string; Value: string })[];
  })[];
  NextToken?: string;
}
export const DescribeEntitlementsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entitlements: S.optional(EntitlementList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeEntitlementsResult",
}) as any as S.Schema<DescribeEntitlementsResult>;
export interface DescribeFleetsRequest {
  Names?: string[];
  NextToken?: string;
}
export const DescribeFleetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Names: S.optional(StringList),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeFleetsRequest",
}) as any as S.Schema<DescribeFleetsRequest>;
export type FleetList = Fleet[];
export const FleetList = /*@__PURE__*/ S.Array(Fleet);
export interface DescribeFleetsResult {
  Fleets?: (Fleet & {
    Arn: Arn;
    Name: string;
    InstanceType: string;
    ComputeCapacityStatus: ComputeCapacityStatus & { Desired: number };
    State: FleetState;
    SessionScriptS3Location: S3Location & { S3Bucket: S3Bucket };
  })[];
  NextToken?: string;
}
export const DescribeFleetsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Fleets: S.optional(FleetList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "DescribeFleetsResult",
}) as any as S.Schema<DescribeFleetsResult>;
export interface DescribeImageBuildersRequest {
  Names?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeImageBuildersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Names: S.optional(StringList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeImageBuildersRequest",
}) as any as S.Schema<DescribeImageBuildersRequest>;
export type ImageBuilderList = ImageBuilder[];
export const ImageBuilderList = /*@__PURE__*/ S.Array(ImageBuilder);
export interface DescribeImageBuildersResult {
  ImageBuilders?: (ImageBuilder & {
    Name: string;
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
  })[];
  NextToken?: string;
}
export const DescribeImageBuildersResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImageBuilders: S.optional(ImageBuilderList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeImageBuildersResult",
}) as any as S.Schema<DescribeImageBuildersResult>;
export type MaxResults = number;
export type AwsAccountIdList = string[];
export const AwsAccountIdList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeImagePermissionsRequest {
  Name?: string;
  MaxResults?: number;
  SharedAwsAccountIds?: string[];
  NextToken?: string;
}
export const DescribeImagePermissionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    SharedAwsAccountIds: S.optional(AwsAccountIdList),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeImagePermissionsRequest",
}) as any as S.Schema<DescribeImagePermissionsRequest>;
export interface SharedImagePermissions {
  sharedAccountId?: string;
  imagePermissions?: ImagePermissions;
}
export const SharedImagePermissions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sharedAccountId: S.optional(S.String),
    imagePermissions: S.optional(ImagePermissions),
  }),
).annotate({
  identifier: "SharedImagePermissions",
}) as any as S.Schema<SharedImagePermissions>;
export type SharedImagePermissionsList = SharedImagePermissions[];
export const SharedImagePermissionsList = /*@__PURE__*/ S.Array(
  SharedImagePermissions,
);
export interface DescribeImagePermissionsResult {
  Name?: string;
  SharedImagePermissionsList?: (SharedImagePermissions & {
    sharedAccountId: AwsAccountId;
    imagePermissions: ImagePermissions;
  })[];
  NextToken?: string;
}
export const DescribeImagePermissionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    SharedImagePermissionsList: S.optional(SharedImagePermissionsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeImagePermissionsResult",
}) as any as S.Schema<DescribeImagePermissionsResult>;
export type DescribeImagesMaxResults = number;
export interface DescribeImagesRequest {
  Names?: string[];
  Arns?: string[];
  Type?: VisibilityType;
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeImagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Names: S.optional(StringList),
    Arns: S.optional(ArnList),
    Type: S.optional(VisibilityType),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeImagesRequest",
}) as any as S.Schema<DescribeImagesRequest>;
export type ImageList = Image[];
export const ImageList = /*@__PURE__*/ S.Array(Image);
export interface DescribeImagesResult {
  Images?: (Image & {
    Name: string;
    Applications: (Application & {
      IconS3Location: S3Location & { S3Bucket: S3Bucket };
    })[];
  })[];
  NextToken?: string;
}
export const DescribeImagesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Images: S.optional(ImageList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "DescribeImagesResult",
}) as any as S.Schema<DescribeImagesResult>;
export type UserId = string;
export interface DescribeSessionsRequest {
  StackName?: string;
  FleetName?: string;
  UserId?: string;
  NextToken?: string;
  Limit?: number;
  AuthenticationType?: AuthenticationType;
  InstanceId?: string;
}
export const DescribeSessionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    FleetName: S.optional(S.String),
    UserId: S.optional(S.String),
    NextToken: S.optional(S.String),
    Limit: S.optional(S.Number),
    AuthenticationType: S.optional(AuthenticationType),
    InstanceId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeSessionsRequest",
}) as any as S.Schema<DescribeSessionsRequest>;
export type SessionState = "ACTIVE" | "PENDING" | "EXPIRED" | (string & {});
export const SessionState = S.String;

export type SessionConnectionState =
  | "CONNECTED"
  | "NOT_CONNECTED"
  | (string & {});
export const SessionConnectionState = S.String;

export type InstanceDrainStatus =
  | "ACTIVE"
  | "DRAINING"
  | "NOT_APPLICABLE"
  | (string & {});
export const InstanceDrainStatus = S.String;

export interface Session {
  Id?: string;
  UserId?: string;
  StackName?: string;
  FleetName?: string;
  State?: SessionState;
  ConnectionState?: SessionConnectionState;
  StartTime?: Date;
  MaxExpirationTime?: Date;
  AuthenticationType?: AuthenticationType;
  NetworkAccessConfiguration?: NetworkAccessConfiguration;
  InstanceId?: string;
  InstanceDrainStatus?: InstanceDrainStatus;
}
export const Session = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    UserId: S.optional(S.String),
    StackName: S.optional(S.String),
    FleetName: S.optional(S.String),
    State: S.optional(SessionState),
    ConnectionState: S.optional(SessionConnectionState),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    MaxExpirationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AuthenticationType: S.optional(AuthenticationType),
    NetworkAccessConfiguration: S.optional(NetworkAccessConfiguration),
    InstanceId: S.optional(S.String),
    InstanceDrainStatus: S.optional(InstanceDrainStatus),
  }),
).annotate({ identifier: "Session" }) as any as S.Schema<Session>;
export type SessionList = Session[];
export const SessionList = /*@__PURE__*/ S.Array(Session);
export interface DescribeSessionsResult {
  Sessions?: (Session & {
    Id: string;
    UserId: UserId;
    StackName: string;
    FleetName: string;
    State: SessionState;
  })[];
  NextToken?: string;
}
export const DescribeSessionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Sessions: S.optional(SessionList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeSessionsResult",
}) as any as S.Schema<DescribeSessionsResult>;
export interface DescribeSoftwareAssociationsRequest {
  AssociatedResource?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeSoftwareAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociatedResource: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeSoftwareAssociationsRequest",
}) as any as S.Schema<DescribeSoftwareAssociationsRequest>;
export type SoftwareDeploymentStatus =
  | "STAGED_FOR_INSTALLATION"
  | "PENDING_INSTALLATION"
  | "INSTALLED"
  | "STAGED_FOR_UNINSTALLATION"
  | "PENDING_UNINSTALLATION"
  | "FAILED_TO_INSTALL"
  | "FAILED_TO_UNINSTALL"
  | (string & {});
export const SoftwareDeploymentStatus = S.String;

export interface SoftwareAssociations {
  SoftwareName?: string;
  Status?: SoftwareDeploymentStatus;
  DeploymentError?: ErrorDetails[];
}
export const SoftwareAssociations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SoftwareName: S.optional(S.String),
    Status: S.optional(SoftwareDeploymentStatus),
    DeploymentError: S.optional(ErrorDetailsList),
  }),
).annotate({
  identifier: "SoftwareAssociations",
}) as any as S.Schema<SoftwareAssociations>;
export type SoftwareAssociationsList = SoftwareAssociations[];
export const SoftwareAssociationsList =
  /*@__PURE__*/ S.Array(SoftwareAssociations);
export interface DescribeSoftwareAssociationsResult {
  AssociatedResource?: string;
  SoftwareAssociations?: SoftwareAssociations[];
  NextToken?: string;
}
export const DescribeSoftwareAssociationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociatedResource: S.optional(S.String),
    SoftwareAssociations: S.optional(SoftwareAssociationsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeSoftwareAssociationsResult",
}) as any as S.Schema<DescribeSoftwareAssociationsResult>;
export interface DescribeStacksRequest {
  Names?: string[];
  NextToken?: string;
}
export const DescribeStacksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Names: S.optional(StringList),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeStacksRequest",
}) as any as S.Schema<DescribeStacksRequest>;
export type StackList = Stack[];
export const StackList = /*@__PURE__*/ S.Array(Stack);
export interface DescribeStacksResult {
  Stacks?: (Stack & {
    Name: string;
    StorageConnectors: (StorageConnector & {
      ConnectorType: StorageConnectorType;
    })[];
    UserSettings: (UserSetting & { Action: Action; Permission: Permission })[];
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
    ContentRedirection: ContentRedirection & {
      HostToClient: UrlRedirectionConfig & { Enabled: boolean };
    };
    AgentAccessConfig: AgentAccessConfig & {
      Settings: (AgentAccessSetting & {
        AgentAction: AgentAction;
        Permission: Permission;
      })[];
      ScreenResolution: ScreenResolution;
      ScreenImageFormat: ScreenImageFormat;
    };
  })[];
  NextToken?: string;
}
export const DescribeStacksResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Stacks: S.optional(StackList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "DescribeStacksResult",
}) as any as S.Schema<DescribeStacksResult>;
export interface DescribeThemeForStackRequest {
  StackName?: string;
}
export const DescribeThemeForStackRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StackName: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeThemeForStackRequest",
}) as any as S.Schema<DescribeThemeForStackRequest>;
export interface DescribeThemeForStackResult {
  Theme?: Theme;
}
export const DescribeThemeForStackResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Theme: S.optional(Theme) }),
).annotate({
  identifier: "DescribeThemeForStackResult",
}) as any as S.Schema<DescribeThemeForStackResult>;
export interface DescribeUsageReportSubscriptionsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeUsageReportSubscriptionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeUsageReportSubscriptionsRequest",
}) as any as S.Schema<DescribeUsageReportSubscriptionsRequest>;
export type UsageReportExecutionErrorCode =
  | "RESOURCE_NOT_FOUND"
  | "ACCESS_DENIED"
  | "INTERNAL_SERVICE_ERROR"
  | (string & {});
export const UsageReportExecutionErrorCode = S.String;

export interface LastReportGenerationExecutionError {
  ErrorCode?: UsageReportExecutionErrorCode;
  ErrorMessage?: string;
}
export const LastReportGenerationExecutionError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(UsageReportExecutionErrorCode),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "LastReportGenerationExecutionError",
}) as any as S.Schema<LastReportGenerationExecutionError>;
export type LastReportGenerationExecutionErrors =
  LastReportGenerationExecutionError[];
export const LastReportGenerationExecutionErrors = /*@__PURE__*/ S.Array(
  LastReportGenerationExecutionError,
);
export interface UsageReportSubscription {
  S3BucketName?: string;
  Schedule?: UsageReportSchedule;
  LastGeneratedReportDate?: Date;
  SubscriptionErrors?: LastReportGenerationExecutionError[];
}
export const UsageReportSubscription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3BucketName: S.optional(S.String),
    Schedule: S.optional(UsageReportSchedule),
    LastGeneratedReportDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SubscriptionErrors: S.optional(LastReportGenerationExecutionErrors),
  }),
).annotate({
  identifier: "UsageReportSubscription",
}) as any as S.Schema<UsageReportSubscription>;
export type UsageReportSubscriptionList = UsageReportSubscription[];
export const UsageReportSubscriptionList = /*@__PURE__*/ S.Array(
  UsageReportSubscription,
);
export interface DescribeUsageReportSubscriptionsResult {
  UsageReportSubscriptions?: UsageReportSubscription[];
  NextToken?: string;
}
export const DescribeUsageReportSubscriptionsResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      UsageReportSubscriptions: S.optional(UsageReportSubscriptionList),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "DescribeUsageReportSubscriptionsResult",
}) as any as S.Schema<DescribeUsageReportSubscriptionsResult>;
export interface DescribeUsersRequest {
  AuthenticationType?: AuthenticationType;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeUsersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationType: S.optional(AuthenticationType),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeUsersRequest",
}) as any as S.Schema<DescribeUsersRequest>;
export interface User {
  Arn?: string;
  UserName?: string | redacted.Redacted<string>;
  Enabled?: boolean;
  Status?: string;
  FirstName?: string | redacted.Redacted<string>;
  LastName?: string | redacted.Redacted<string>;
  CreatedTime?: Date;
  AuthenticationType?: AuthenticationType;
}
export const User = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    UserName: S.optional(SensitiveString),
    Enabled: S.optional(S.Boolean),
    Status: S.optional(S.String),
    FirstName: S.optional(SensitiveString),
    LastName: S.optional(SensitiveString),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AuthenticationType: S.optional(AuthenticationType),
  }),
).annotate({ identifier: "User" }) as any as S.Schema<User>;
export type UserList = User[];
export const UserList = /*@__PURE__*/ S.Array(User);
export interface DescribeUsersResult {
  Users?: (User & { AuthenticationType: AuthenticationType })[];
  NextToken?: string;
}
export const DescribeUsersResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Users: S.optional(UserList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "DescribeUsersResult",
}) as any as S.Schema<DescribeUsersResult>;
export interface DescribeUserStackAssociationsRequest {
  StackName?: string;
  UserName?: string | redacted.Redacted<string>;
  AuthenticationType?: AuthenticationType;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeUserStackAssociationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StackName: S.optional(S.String),
      UserName: S.optional(SensitiveString),
      AuthenticationType: S.optional(AuthenticationType),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeUserStackAssociationsRequest",
}) as any as S.Schema<DescribeUserStackAssociationsRequest>;
export interface DescribeUserStackAssociationsResult {
  UserStackAssociations?: (UserStackAssociation & {
    StackName: string;
    UserName: Username;
    AuthenticationType: AuthenticationType;
  })[];
  NextToken?: string;
}
export const DescribeUserStackAssociationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserStackAssociations: S.optional(UserStackAssociationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeUserStackAssociationsResult",
}) as any as S.Schema<DescribeUserStackAssociationsResult>;
export interface DisableUserRequest {
  UserName?: string | redacted.Redacted<string>;
  AuthenticationType?: AuthenticationType;
}
export const DisableUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserName: S.optional(SensitiveString),
    AuthenticationType: S.optional(AuthenticationType),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisableUserRequest",
}) as any as S.Schema<DisableUserRequest>;
export interface DisableUserResult {}
export const DisableUserResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisableUserResult",
}) as any as S.Schema<DisableUserResult>;
export interface DisassociateAppBlockBuilderAppBlockRequest {
  AppBlockArn?: string;
  AppBlockBuilderName?: string;
}
export const DisassociateAppBlockBuilderAppBlockRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AppBlockArn: S.optional(S.String),
      AppBlockBuilderName: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DisassociateAppBlockBuilderAppBlockRequest",
  }) as any as S.Schema<DisassociateAppBlockBuilderAppBlockRequest>;
export interface DisassociateAppBlockBuilderAppBlockResult {}
export const DisassociateAppBlockBuilderAppBlockResult =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DisassociateAppBlockBuilderAppBlockResult",
  }) as any as S.Schema<DisassociateAppBlockBuilderAppBlockResult>;
export interface DisassociateApplicationFleetRequest {
  FleetName?: string;
  ApplicationArn?: string;
}
export const DisassociateApplicationFleetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetName: S.optional(S.String),
    ApplicationArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisassociateApplicationFleetRequest",
}) as any as S.Schema<DisassociateApplicationFleetRequest>;
export interface DisassociateApplicationFleetResult {}
export const DisassociateApplicationFleetResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateApplicationFleetResult",
}) as any as S.Schema<DisassociateApplicationFleetResult>;
export interface DisassociateApplicationFromEntitlementRequest {
  StackName?: string;
  EntitlementName?: string;
  ApplicationIdentifier?: string;
}
export const DisassociateApplicationFromEntitlementRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      StackName: S.optional(S.String),
      EntitlementName: S.optional(S.String),
      ApplicationIdentifier: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DisassociateApplicationFromEntitlementRequest",
  }) as any as S.Schema<DisassociateApplicationFromEntitlementRequest>;
export interface DisassociateApplicationFromEntitlementResult {}
export const DisassociateApplicationFromEntitlementResult =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DisassociateApplicationFromEntitlementResult",
  }) as any as S.Schema<DisassociateApplicationFromEntitlementResult>;
export interface DisassociateFleetRequest {
  FleetName?: string;
  StackName?: string;
}
export const DisassociateFleetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetName: S.optional(S.String),
    StackName: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisassociateFleetRequest",
}) as any as S.Schema<DisassociateFleetRequest>;
export interface DisassociateFleetResult {}
export const DisassociateFleetResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateFleetResult",
}) as any as S.Schema<DisassociateFleetResult>;
export interface DisassociateSoftwareFromImageBuilderRequest {
  ImageBuilderName?: string;
  SoftwareNames?: string[];
}
export const DisassociateSoftwareFromImageBuilderRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ImageBuilderName: S.optional(S.String),
      SoftwareNames: S.optional(StringList),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DisassociateSoftwareFromImageBuilderRequest",
  }) as any as S.Schema<DisassociateSoftwareFromImageBuilderRequest>;
export interface DisassociateSoftwareFromImageBuilderResult {}
export const DisassociateSoftwareFromImageBuilderResult =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DisassociateSoftwareFromImageBuilderResult",
  }) as any as S.Schema<DisassociateSoftwareFromImageBuilderResult>;
export interface DrainSessionInstanceRequest {
  SessionId?: string;
}
export const DrainSessionInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SessionId: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DrainSessionInstanceRequest",
}) as any as S.Schema<DrainSessionInstanceRequest>;
export interface DrainSessionInstanceResult {}
export const DrainSessionInstanceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DrainSessionInstanceResult",
}) as any as S.Schema<DrainSessionInstanceResult>;
export interface EnableUserRequest {
  UserName?: string | redacted.Redacted<string>;
  AuthenticationType?: AuthenticationType;
}
export const EnableUserRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserName: S.optional(SensitiveString),
    AuthenticationType: S.optional(AuthenticationType),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "EnableUserRequest",
}) as any as S.Schema<EnableUserRequest>;
export interface EnableUserResult {}
export const EnableUserResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "EnableUserResult",
}) as any as S.Schema<EnableUserResult>;
export interface ExpireSessionRequest {
  SessionId?: string;
}
export const ExpireSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SessionId: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ExpireSessionRequest",
}) as any as S.Schema<ExpireSessionRequest>;
export interface ExpireSessionResult {}
export const ExpireSessionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ExpireSessionResult",
}) as any as S.Schema<ExpireSessionResult>;
export interface GetExportImageTaskRequest {
  TaskId?: string;
}
export const GetExportImageTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TaskId: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetExportImageTaskRequest",
}) as any as S.Schema<GetExportImageTaskRequest>;
export interface GetExportImageTaskResult {
  ExportImageTask?: ExportImageTask & {
    TaskId: UUID;
    ImageArn: Arn;
    AmiName: AmiName;
    CreatedDate: Date;
  };
}
export const GetExportImageTaskResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExportImageTask: S.optional(ExportImageTask) }),
).annotate({
  identifier: "GetExportImageTaskResult",
}) as any as S.Schema<GetExportImageTaskResult>;
export interface ListAssociatedFleetsRequest {
  StackName?: string;
  NextToken?: string;
}
export const ListAssociatedFleetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAssociatedFleetsRequest",
}) as any as S.Schema<ListAssociatedFleetsRequest>;
export interface ListAssociatedFleetsResult {
  Names?: string[];
  NextToken?: string;
}
export const ListAssociatedFleetsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Names: S.optional(StringList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListAssociatedFleetsResult",
}) as any as S.Schema<ListAssociatedFleetsResult>;
export interface ListAssociatedStacksRequest {
  FleetName?: string;
  NextToken?: string;
}
export const ListAssociatedStacksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FleetName: S.optional(S.String),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAssociatedStacksRequest",
}) as any as S.Schema<ListAssociatedStacksRequest>;
export interface ListAssociatedStacksResult {
  Names?: string[];
  NextToken?: string;
}
export const ListAssociatedStacksResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Names: S.optional(StringList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListAssociatedStacksResult",
}) as any as S.Schema<ListAssociatedStacksResult>;
export interface ListEntitledApplicationsRequest {
  StackName?: string;
  EntitlementName?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListEntitledApplicationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    EntitlementName: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEntitledApplicationsRequest",
}) as any as S.Schema<ListEntitledApplicationsRequest>;
export interface EntitledApplication {
  ApplicationIdentifier?: string;
}
export const EntitledApplication = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationIdentifier: S.optional(S.String) }),
).annotate({
  identifier: "EntitledApplication",
}) as any as S.Schema<EntitledApplication>;
export type EntitledApplicationList = EntitledApplication[];
export const EntitledApplicationList =
  /*@__PURE__*/ S.Array(EntitledApplication);
export interface ListEntitledApplicationsResult {
  EntitledApplications?: (EntitledApplication & {
    ApplicationIdentifier: string;
  })[];
  NextToken?: string;
}
export const ListEntitledApplicationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntitledApplications: S.optional(EntitledApplicationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEntitledApplicationsResult",
}) as any as S.Schema<ListEntitledApplicationsResult>;
export type FilterName = string;
export type FilterValue = string;
export type FilterValues = string[];
export const FilterValues = /*@__PURE__*/ S.Array(S.String);
export interface Filter {
  Name?: string;
  Values?: string[];
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Values: S.optional(FilterValues) }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type Filters = Filter[];
export const Filters = /*@__PURE__*/ S.Array(Filter);
export interface ListExportImageTasksRequest {
  Filters?: Filter[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListExportImageTasksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(Filters),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListExportImageTasksRequest",
}) as any as S.Schema<ListExportImageTasksRequest>;
export type ExportImageTasks = ExportImageTask[];
export const ExportImageTasks = /*@__PURE__*/ S.Array(ExportImageTask);
export interface ListExportImageTasksResult {
  ExportImageTasks?: (ExportImageTask & {
    TaskId: UUID;
    ImageArn: Arn;
    AmiName: AmiName;
    CreatedDate: Date;
  })[];
  NextToken?: string;
}
export const ListExportImageTasksResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportImageTasks: S.optional(ExportImageTasks),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListExportImageTasksResult",
}) as any as S.Schema<ListExportImageTasksResult>;
export interface ListTagsForResourceRequest {
  ResourceArn?: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
export interface StartAppBlockBuilderRequest {
  Name?: string;
}
export const StartAppBlockBuilderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartAppBlockBuilderRequest",
}) as any as S.Schema<StartAppBlockBuilderRequest>;
export interface StartAppBlockBuilderResult {
  AppBlockBuilder?: AppBlockBuilder & {
    Arn: Arn;
    Name: string;
    Platform: AppBlockBuilderPlatformType;
    InstanceType: string;
    VpcConfig: VpcConfig;
    State: AppBlockBuilderState;
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
  };
}
export const StartAppBlockBuilderResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AppBlockBuilder: S.optional(AppBlockBuilder) }),
).annotate({
  identifier: "StartAppBlockBuilderResult",
}) as any as S.Schema<StartAppBlockBuilderResult>;
export interface StartFleetRequest {
  Name?: string;
}
export const StartFleetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartFleetRequest",
}) as any as S.Schema<StartFleetRequest>;
export interface StartFleetResult {}
export const StartFleetResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StartFleetResult",
}) as any as S.Schema<StartFleetResult>;
export interface StartImageBuilderRequest {
  Name?: string;
  AppstreamAgentVersion?: string;
}
export const StartImageBuilderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    AppstreamAgentVersion: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartImageBuilderRequest",
}) as any as S.Schema<StartImageBuilderRequest>;
export interface StartImageBuilderResult {
  ImageBuilder?: ImageBuilder & {
    Name: string;
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
  };
}
export const StartImageBuilderResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ImageBuilder: S.optional(ImageBuilder) }),
).annotate({
  identifier: "StartImageBuilderResult",
}) as any as S.Schema<StartImageBuilderResult>;
export interface StartSoftwareDeploymentToImageBuilderRequest {
  ImageBuilderName?: string;
  RetryFailedDeployments?: boolean;
}
export const StartSoftwareDeploymentToImageBuilderRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ImageBuilderName: S.optional(S.String),
      RetryFailedDeployments: S.optional(S.Boolean),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "StartSoftwareDeploymentToImageBuilderRequest",
  }) as any as S.Schema<StartSoftwareDeploymentToImageBuilderRequest>;
export interface StartSoftwareDeploymentToImageBuilderResult {}
export const StartSoftwareDeploymentToImageBuilderResult =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "StartSoftwareDeploymentToImageBuilderResult",
  }) as any as S.Schema<StartSoftwareDeploymentToImageBuilderResult>;
export interface StopAppBlockBuilderRequest {
  Name?: string;
}
export const StopAppBlockBuilderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopAppBlockBuilderRequest",
}) as any as S.Schema<StopAppBlockBuilderRequest>;
export interface StopAppBlockBuilderResult {
  AppBlockBuilder?: AppBlockBuilder & {
    Arn: Arn;
    Name: string;
    Platform: AppBlockBuilderPlatformType;
    InstanceType: string;
    VpcConfig: VpcConfig;
    State: AppBlockBuilderState;
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
  };
}
export const StopAppBlockBuilderResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AppBlockBuilder: S.optional(AppBlockBuilder) }),
).annotate({
  identifier: "StopAppBlockBuilderResult",
}) as any as S.Schema<StopAppBlockBuilderResult>;
export interface StopFleetRequest {
  Name?: string;
}
export const StopFleetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopFleetRequest",
}) as any as S.Schema<StopFleetRequest>;
export interface StopFleetResult {}
export const StopFleetResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopFleetResult",
}) as any as S.Schema<StopFleetResult>;
export interface StopImageBuilderRequest {
  Name?: string;
}
export const StopImageBuilderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopImageBuilderRequest",
}) as any as S.Schema<StopImageBuilderRequest>;
export interface StopImageBuilderResult {
  ImageBuilder?: ImageBuilder & {
    Name: string;
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
  };
}
export const StopImageBuilderResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ImageBuilder: S.optional(ImageBuilder) }),
).annotate({
  identifier: "StopImageBuilderResult",
}) as any as S.Schema<StopImageBuilderResult>;
export interface TagResourceRequest {
  ResourceArn?: string;
  Tags?: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.optional(S.String), Tags: S.optional(Tags) }).pipe(
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
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn?: string;
  TagKeys?: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    TagKeys: S.optional(TagKeyList),
  }).pipe(
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
export type AppBlockBuilderAttribute =
  | "IAM_ROLE_ARN"
  | "ACCESS_ENDPOINTS"
  | "VPC_CONFIGURATION_SECURITY_GROUP_IDS"
  | (string & {});
export const AppBlockBuilderAttribute = S.String;

export type AppBlockBuilderAttributes = AppBlockBuilderAttribute[];
export const AppBlockBuilderAttributes = /*@__PURE__*/ S.Array(
  AppBlockBuilderAttribute,
);
export interface UpdateAppBlockBuilderRequest {
  Name?: string;
  Description?: string;
  DisplayName?: string;
  Platform?: PlatformType;
  InstanceType?: string;
  VpcConfig?: VpcConfig;
  EnableDefaultInternetAccess?: boolean;
  IamRoleArn?: string;
  AccessEndpoints?: AccessEndpoint[];
  AttributesToDelete?: AppBlockBuilderAttribute[];
  DisableIMDSV1?: boolean;
}
export const UpdateAppBlockBuilderRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    Platform: S.optional(PlatformType),
    InstanceType: S.optional(S.String),
    VpcConfig: S.optional(VpcConfig),
    EnableDefaultInternetAccess: S.optional(S.Boolean),
    IamRoleArn: S.optional(S.String),
    AccessEndpoints: S.optional(AccessEndpointList),
    AttributesToDelete: S.optional(AppBlockBuilderAttributes),
    DisableIMDSV1: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateAppBlockBuilderRequest",
}) as any as S.Schema<UpdateAppBlockBuilderRequest>;
export interface UpdateAppBlockBuilderResult {
  AppBlockBuilder?: AppBlockBuilder & {
    Arn: Arn;
    Name: string;
    Platform: AppBlockBuilderPlatformType;
    InstanceType: string;
    VpcConfig: VpcConfig;
    State: AppBlockBuilderState;
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
  };
}
export const UpdateAppBlockBuilderResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AppBlockBuilder: S.optional(AppBlockBuilder) }),
).annotate({
  identifier: "UpdateAppBlockBuilderResult",
}) as any as S.Schema<UpdateAppBlockBuilderResult>;
export type ApplicationAttribute =
  | "LAUNCH_PARAMETERS"
  | "WORKING_DIRECTORY"
  | (string & {});
export const ApplicationAttribute = S.String;

export type ApplicationAttributes = ApplicationAttribute[];
export const ApplicationAttributes =
  /*@__PURE__*/ S.Array(ApplicationAttribute);
export interface UpdateApplicationRequest {
  Name?: string;
  DisplayName?: string;
  Description?: string;
  IconS3Location?: S3Location;
  LaunchPath?: string;
  WorkingDirectory?: string;
  LaunchParameters?: string;
  AppBlockArn?: string;
  AttributesToDelete?: ApplicationAttribute[];
}
export const UpdateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    DisplayName: S.optional(S.String),
    Description: S.optional(S.String),
    IconS3Location: S.optional(S3Location),
    LaunchPath: S.optional(S.String),
    WorkingDirectory: S.optional(S.String),
    LaunchParameters: S.optional(S.String),
    AppBlockArn: S.optional(S.String),
    AttributesToDelete: S.optional(ApplicationAttributes),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateApplicationRequest",
}) as any as S.Schema<UpdateApplicationRequest>;
export interface UpdateApplicationResult {
  Application?: Application & {
    IconS3Location: S3Location & { S3Bucket: S3Bucket };
  };
}
export const UpdateApplicationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Application: S.optional(Application) }),
).annotate({
  identifier: "UpdateApplicationResult",
}) as any as S.Schema<UpdateApplicationResult>;
export interface UpdateDirectoryConfigRequest {
  DirectoryName?: string;
  OrganizationalUnitDistinguishedNames?: string[];
  ServiceAccountCredentials?: ServiceAccountCredentials;
  CertificateBasedAuthProperties?: CertificateBasedAuthProperties;
}
export const UpdateDirectoryConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DirectoryName: S.optional(S.String),
    OrganizationalUnitDistinguishedNames: S.optional(
      OrganizationalUnitDistinguishedNamesList,
    ),
    ServiceAccountCredentials: S.optional(ServiceAccountCredentials),
    CertificateBasedAuthProperties: S.optional(CertificateBasedAuthProperties),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateDirectoryConfigRequest",
}) as any as S.Schema<UpdateDirectoryConfigRequest>;
export interface UpdateDirectoryConfigResult {
  DirectoryConfig?: DirectoryConfig & {
    DirectoryName: DirectoryName;
    ServiceAccountCredentials: ServiceAccountCredentials & {
      AccountName: AccountName;
      AccountPassword: AccountPassword;
    };
  };
}
export const UpdateDirectoryConfigResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DirectoryConfig: S.optional(DirectoryConfig) }),
).annotate({
  identifier: "UpdateDirectoryConfigResult",
}) as any as S.Schema<UpdateDirectoryConfigResult>;
export interface UpdateEntitlementRequest {
  Name?: string;
  StackName?: string;
  Description?: string;
  AppVisibility?: AppVisibility;
  Attributes?: EntitlementAttribute[];
}
export const UpdateEntitlementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    StackName: S.optional(S.String),
    Description: S.optional(S.String),
    AppVisibility: S.optional(AppVisibility),
    Attributes: S.optional(EntitlementAttributeList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateEntitlementRequest",
}) as any as S.Schema<UpdateEntitlementRequest>;
export interface UpdateEntitlementResult {
  Entitlement?: Entitlement & {
    Name: Name;
    StackName: Name;
    AppVisibility: AppVisibility;
    Attributes: (EntitlementAttribute & { Name: string; Value: string })[];
  };
}
export const UpdateEntitlementResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Entitlement: S.optional(Entitlement) }),
).annotate({
  identifier: "UpdateEntitlementResult",
}) as any as S.Schema<UpdateEntitlementResult>;
export type FleetAttribute =
  | "VPC_CONFIGURATION"
  | "VPC_CONFIGURATION_SECURITY_GROUP_IDS"
  | "DOMAIN_JOIN_INFO"
  | "IAM_ROLE_ARN"
  | "USB_DEVICE_FILTER_STRINGS"
  | "SESSION_SCRIPT_S3_LOCATION"
  | "MAX_SESSIONS_PER_INSTANCE"
  | "VOLUME_CONFIGURATION"
  | (string & {});
export const FleetAttribute = S.String;

export type FleetAttributes = FleetAttribute[];
export const FleetAttributes = /*@__PURE__*/ S.Array(FleetAttribute);
export interface UpdateFleetRequest {
  ImageName?: string;
  ImageArn?: string;
  Name?: string;
  InstanceType?: string;
  ComputeCapacity?: ComputeCapacity;
  VpcConfig?: VpcConfig;
  MaxUserDurationInSeconds?: number;
  DisconnectTimeoutInSeconds?: number;
  DeleteVpcConfig?: boolean;
  Description?: string;
  DisplayName?: string;
  EnableDefaultInternetAccess?: boolean;
  DomainJoinInfo?: DomainJoinInfo;
  IdleDisconnectTimeoutInSeconds?: number;
  AttributesToDelete?: FleetAttribute[];
  IamRoleArn?: string;
  StreamView?: StreamView;
  Platform?: PlatformType;
  MaxConcurrentSessions?: number;
  UsbDeviceFilterStrings?: string[];
  SessionScriptS3Location?: S3Location;
  MaxSessionsPerInstance?: number;
  RootVolumeConfig?: VolumeConfig;
  DisableIMDSV1?: boolean;
}
export const UpdateFleetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImageName: S.optional(S.String),
    ImageArn: S.optional(S.String),
    Name: S.optional(S.String),
    InstanceType: S.optional(S.String),
    ComputeCapacity: S.optional(ComputeCapacity),
    VpcConfig: S.optional(VpcConfig),
    MaxUserDurationInSeconds: S.optional(S.Number),
    DisconnectTimeoutInSeconds: S.optional(S.Number),
    DeleteVpcConfig: S.optional(S.Boolean),
    Description: S.optional(S.String),
    DisplayName: S.optional(S.String),
    EnableDefaultInternetAccess: S.optional(S.Boolean),
    DomainJoinInfo: S.optional(DomainJoinInfo),
    IdleDisconnectTimeoutInSeconds: S.optional(S.Number),
    AttributesToDelete: S.optional(FleetAttributes),
    IamRoleArn: S.optional(S.String),
    StreamView: S.optional(StreamView),
    Platform: S.optional(PlatformType),
    MaxConcurrentSessions: S.optional(S.Number),
    UsbDeviceFilterStrings: S.optional(UsbDeviceFilterStrings),
    SessionScriptS3Location: S.optional(S3Location),
    MaxSessionsPerInstance: S.optional(S.Number),
    RootVolumeConfig: S.optional(VolumeConfig),
    DisableIMDSV1: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateFleetRequest",
}) as any as S.Schema<UpdateFleetRequest>;
export interface UpdateFleetResult {
  Fleet?: Fleet & {
    Arn: Arn;
    Name: string;
    InstanceType: string;
    ComputeCapacityStatus: ComputeCapacityStatus & { Desired: number };
    State: FleetState;
    SessionScriptS3Location: S3Location & { S3Bucket: S3Bucket };
  };
}
export const UpdateFleetResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Fleet: S.optional(Fleet) }),
).annotate({
  identifier: "UpdateFleetResult",
}) as any as S.Schema<UpdateFleetResult>;
export interface UpdateImagePermissionsRequest {
  Name?: string;
  SharedAccountId?: string;
  ImagePermissions?: ImagePermissions;
}
export const UpdateImagePermissionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    SharedAccountId: S.optional(S.String),
    ImagePermissions: S.optional(ImagePermissions),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateImagePermissionsRequest",
}) as any as S.Schema<UpdateImagePermissionsRequest>;
export interface UpdateImagePermissionsResult {}
export const UpdateImagePermissionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateImagePermissionsResult",
}) as any as S.Schema<UpdateImagePermissionsResult>;
export type StackAttribute =
  | "STORAGE_CONNECTORS"
  | "STORAGE_CONNECTOR_HOMEFOLDERS"
  | "STORAGE_CONNECTOR_GOOGLE_DRIVE"
  | "STORAGE_CONNECTOR_ONE_DRIVE"
  | "REDIRECT_URL"
  | "FEEDBACK_URL"
  | "THEME_NAME"
  | "USER_SETTINGS"
  | "EMBED_HOST_DOMAINS"
  | "IAM_ROLE_ARN"
  | "ACCESS_ENDPOINTS"
  | "STREAMING_EXPERIENCE_SETTINGS"
  | "CONTENT_REDIRECTION"
  | "AGENT_ACCESS_CONFIG"
  | (string & {});
export const StackAttribute = S.String;

export type StackAttributes = StackAttribute[];
export const StackAttributes = /*@__PURE__*/ S.Array(StackAttribute);
export interface AgentAccessConfigForUpdate {
  Settings?: AgentAccessSetting[];
  S3BucketArn?: string;
  ScreenshotsUploadEnabled?: boolean;
  ScreenResolution?: ScreenResolution;
  ScreenImageFormat?: ScreenImageFormat;
  UserControlMode?: UserControlMode;
}
export const AgentAccessConfigForUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Settings: S.optional(AgentAccessSettingList),
    S3BucketArn: S.optional(S.String),
    ScreenshotsUploadEnabled: S.optional(S.Boolean),
    ScreenResolution: S.optional(ScreenResolution),
    ScreenImageFormat: S.optional(ScreenImageFormat),
    UserControlMode: S.optional(UserControlMode),
  }),
).annotate({
  identifier: "AgentAccessConfigForUpdate",
}) as any as S.Schema<AgentAccessConfigForUpdate>;
export interface UpdateStackRequest {
  DisplayName?: string;
  Description?: string;
  Name?: string;
  StorageConnectors?: StorageConnector[];
  DeleteStorageConnectors?: boolean;
  RedirectURL?: string;
  FeedbackURL?: string;
  AttributesToDelete?: StackAttribute[];
  UserSettings?: UserSetting[];
  ApplicationSettings?: ApplicationSettings;
  AccessEndpoints?: AccessEndpoint[];
  EmbedHostDomains?: string[];
  StreamingExperienceSettings?: StreamingExperienceSettings;
  ContentRedirection?: ContentRedirection;
  AgentAccessConfig?: AgentAccessConfigForUpdate;
}
export const UpdateStackRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DisplayName: S.optional(S.String),
    Description: S.optional(S.String),
    Name: S.optional(S.String),
    StorageConnectors: S.optional(StorageConnectorList),
    DeleteStorageConnectors: S.optional(S.Boolean),
    RedirectURL: S.optional(S.String),
    FeedbackURL: S.optional(S.String),
    AttributesToDelete: S.optional(StackAttributes),
    UserSettings: S.optional(UserSettingList),
    ApplicationSettings: S.optional(ApplicationSettings),
    AccessEndpoints: S.optional(AccessEndpointList),
    EmbedHostDomains: S.optional(EmbedHostDomains),
    StreamingExperienceSettings: S.optional(StreamingExperienceSettings),
    ContentRedirection: S.optional(ContentRedirection),
    AgentAccessConfig: S.optional(AgentAccessConfigForUpdate),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateStackRequest",
}) as any as S.Schema<UpdateStackRequest>;
export interface UpdateStackResult {
  Stack?: Stack & {
    Name: string;
    StorageConnectors: (StorageConnector & {
      ConnectorType: StorageConnectorType;
    })[];
    UserSettings: (UserSetting & { Action: Action; Permission: Permission })[];
    AccessEndpoints: (AccessEndpoint & { EndpointType: AccessEndpointType })[];
    ContentRedirection: ContentRedirection & {
      HostToClient: UrlRedirectionConfig & { Enabled: boolean };
    };
    AgentAccessConfig: AgentAccessConfig & {
      Settings: (AgentAccessSetting & {
        AgentAction: AgentAction;
        Permission: Permission;
      })[];
      ScreenResolution: ScreenResolution;
      ScreenImageFormat: ScreenImageFormat;
    };
  };
}
export const UpdateStackResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Stack: S.optional(Stack) }),
).annotate({
  identifier: "UpdateStackResult",
}) as any as S.Schema<UpdateStackResult>;
export type ThemeAttribute = "FOOTER_LINKS" | (string & {});
export const ThemeAttribute = S.String;

export type ThemeAttributes = ThemeAttribute[];
export const ThemeAttributes = /*@__PURE__*/ S.Array(ThemeAttribute);
export interface UpdateThemeForStackRequest {
  StackName?: string;
  FooterLinks?: ThemeFooterLink[];
  TitleText?: string;
  ThemeStyling?: ThemeStyling;
  OrganizationLogoS3Location?: S3Location;
  FaviconS3Location?: S3Location;
  State?: ThemeState;
  AttributesToDelete?: ThemeAttribute[];
}
export const UpdateThemeForStackRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    FooterLinks: S.optional(ThemeFooterLinks),
    TitleText: S.optional(S.String),
    ThemeStyling: S.optional(ThemeStyling),
    OrganizationLogoS3Location: S.optional(S3Location),
    FaviconS3Location: S.optional(S3Location),
    State: S.optional(ThemeState),
    AttributesToDelete: S.optional(ThemeAttributes),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateThemeForStackRequest",
}) as any as S.Schema<UpdateThemeForStackRequest>;
export interface UpdateThemeForStackResult {
  Theme?: Theme;
}
export const UpdateThemeForStackResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Theme: S.optional(Theme) }),
).annotate({
  identifier: "UpdateThemeForStackResult",
}) as any as S.Schema<UpdateThemeForStackResult>;
export type ErrorMessage = string;
export type AssociateAppBlockBuilderAppBlockError =
  | ConcurrentModificationException
  | InvalidParameterCombinationException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates the specified app block builder with the specified app block.
 */
export const associateAppBlockBuilderAppBlock: API.OperationMethod<
  AssociateAppBlockBuilderAppBlockRequest,
  AssociateAppBlockBuilderAppBlockResult,
  AssociateAppBlockBuilderAppBlockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateAppBlockBuilderAppBlockRequest,
  output: AssociateAppBlockBuilderAppBlockResult,
  errors: [
    ConcurrentModificationException,
    InvalidParameterCombinationException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAppBlockBuilderAppBlock",
}));

export type AssociateApplicationFleetError =
  | ConcurrentModificationException
  | InvalidParameterCombinationException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates the specified application with the specified fleet. This is only supported for Elastic fleets.
 */
export const associateApplicationFleet: API.OperationMethod<
  AssociateApplicationFleetRequest,
  AssociateApplicationFleetResult,
  AssociateApplicationFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateApplicationFleetRequest,
  output: AssociateApplicationFleetResult,
  errors: [
    ConcurrentModificationException,
    InvalidParameterCombinationException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateApplicationFleet",
}));

export type AssociateApplicationToEntitlementError =
  | EntitlementNotFoundException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates an application to entitle.
 */
export const associateApplicationToEntitlement: API.OperationMethod<
  AssociateApplicationToEntitlementRequest,
  AssociateApplicationToEntitlementResult,
  AssociateApplicationToEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateApplicationToEntitlementRequest,
  output: AssociateApplicationToEntitlementResult,
  errors: [
    EntitlementNotFoundException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateApplicationToEntitlement",
}));

export type AssociateFleetError =
  | ConcurrentModificationException
  | IncompatibleImageException
  | InvalidAccountStatusException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates the specified fleet with the specified stack.
 */
export const associateFleet: API.OperationMethod<
  AssociateFleetRequest,
  AssociateFleetResult,
  AssociateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateFleetRequest,
  output: AssociateFleetResult,
  errors: [
    ConcurrentModificationException,
    IncompatibleImageException,
    InvalidAccountStatusException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateFleet",
}));

export type AssociateSoftwareToImageBuilderError =
  | ConcurrentModificationException
  | IncompatibleImageException
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates license included application(s) with an existing image builder instance.
 */
export const associateSoftwareToImageBuilder: API.OperationMethod<
  AssociateSoftwareToImageBuilderRequest,
  AssociateSoftwareToImageBuilderResult,
  AssociateSoftwareToImageBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateSoftwareToImageBuilderRequest,
  output: AssociateSoftwareToImageBuilderResult,
  errors: [
    ConcurrentModificationException,
    IncompatibleImageException,
    InvalidParameterCombinationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSoftwareToImageBuilder",
}));

export type BatchAssociateUserStackError =
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | CommonErrors;
/**
 * Associates the specified users with the specified stacks. Users in a user pool cannot be assigned to stacks with fleets that are joined to an Active Directory domain.
 */
export const batchAssociateUserStack: API.OperationMethod<
  BatchAssociateUserStackRequest,
  BatchAssociateUserStackResult,
  BatchAssociateUserStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchAssociateUserStackRequest,
  output: BatchAssociateUserStackResult,
  errors: [
    InvalidParameterCombinationException,
    OperationNotPermittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAssociateUserStack",
}));

export type BatchDisassociateUserStackError =
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | CommonErrors;
/**
 * Disassociates the specified users from the specified stacks.
 */
export const batchDisassociateUserStack: API.OperationMethod<
  BatchDisassociateUserStackRequest,
  BatchDisassociateUserStackResult,
  BatchDisassociateUserStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDisassociateUserStackRequest,
  output: BatchDisassociateUserStackResult,
  errors: [
    InvalidParameterCombinationException,
    OperationNotPermittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDisassociateUserStack",
}));

export type CopyImageError =
  | IncompatibleImageException
  | InvalidAccountStatusException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Copies the image within the same region or to a new region within the same AWS account. Note that any tags you added to the image will not be copied.
 */
export const copyImage: API.OperationMethod<
  CopyImageRequest,
  CopyImageResponse,
  CopyImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CopyImageRequest,
  output: CopyImageResponse,
  errors: [
    IncompatibleImageException,
    InvalidAccountStatusException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyImage",
}));

export type CreateAppBlockError =
  | ConcurrentModificationException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceAlreadyExistsException
  | CommonErrors;
/**
 * Creates an app block.
 *
 * App blocks are a WorkSpaces Applications resource that stores the details about the
 * virtual hard disk in an S3 bucket. It also stores the setup script with details about
 * how to mount the virtual hard disk. The virtual hard disk includes the application
 * binaries and other files necessary to launch your applications. Multiple applications
 * can be assigned to a single app block.
 *
 * This is only supported for Elastic fleets.
 */
export const createAppBlock: API.OperationMethod<
  CreateAppBlockRequest,
  CreateAppBlockResult,
  CreateAppBlockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAppBlockRequest,
  output: CreateAppBlockResult,
  errors: [
    ConcurrentModificationException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAppBlock",
}));

export type CreateAppBlockBuilderError =
  | ConcurrentModificationException
  | InvalidAccountStatusException
  | InvalidParameterCombinationException
  | InvalidRoleException
  | LimitExceededException
  | OperationNotPermittedException
  | RequestLimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates an app block builder.
 */
export const createAppBlockBuilder: API.OperationMethod<
  CreateAppBlockBuilderRequest,
  CreateAppBlockBuilderResult,
  CreateAppBlockBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAppBlockBuilderRequest,
  output: CreateAppBlockBuilderResult,
  errors: [
    ConcurrentModificationException,
    InvalidAccountStatusException,
    InvalidParameterCombinationException,
    InvalidRoleException,
    LimitExceededException,
    OperationNotPermittedException,
    RequestLimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAppBlockBuilder",
}));

export type CreateAppBlockBuilderStreamingURLError =
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a URL to start a create app block builder streaming session.
 */
export const createAppBlockBuilderStreamingURL: API.OperationMethod<
  CreateAppBlockBuilderStreamingURLRequest,
  CreateAppBlockBuilderStreamingURLResult,
  CreateAppBlockBuilderStreamingURLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAppBlockBuilderStreamingURLRequest,
  output: CreateAppBlockBuilderStreamingURLResult,
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAppBlockBuilderStreamingURL",
}));

export type CreateApplicationError =
  | ConcurrentModificationException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates an application.
 *
 * Applications are a WorkSpaces Applications resource that stores the details about how to
 * launch applications on Elastic fleet streaming instances. An application consists of the
 * launch details, icon, and display name. Applications are associated with an app block
 * that contains the application binaries and other files. The applications assigned to an
 * Elastic fleet are the applications users can launch.
 *
 * This is only supported for Elastic fleets.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResult,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApplicationRequest,
  output: CreateApplicationResult,
  errors: [
    ConcurrentModificationException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
}));

export type CreateDirectoryConfigError =
  | InvalidAccountStatusException
  | InvalidRoleException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a Directory Config object in WorkSpaces Applications. This object includes the configuration information required to join fleets and image builders to Microsoft Active Directory domains.
 */
export const createDirectoryConfig: API.OperationMethod<
  CreateDirectoryConfigRequest,
  CreateDirectoryConfigResult,
  CreateDirectoryConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDirectoryConfigRequest,
  output: CreateDirectoryConfigResult,
  errors: [
    InvalidAccountStatusException,
    InvalidRoleException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDirectoryConfig",
}));

export type CreateEntitlementError =
  | EntitlementAlreadyExistsException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a new entitlement. Entitlements control access to specific applications within
 * a stack, based on user attributes. Entitlements apply to SAML 2.0 federated user
 * identities. WorkSpaces Applications user pool and streaming URL users are entitled to all
 * applications in a stack. Entitlements don't apply to the desktop stream view
 * application, or to applications managed by a dynamic app provider using the Dynamic
 * Application Framework.
 */
export const createEntitlement: API.OperationMethod<
  CreateEntitlementRequest,
  CreateEntitlementResult,
  CreateEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEntitlementRequest,
  output: CreateEntitlementResult,
  errors: [
    EntitlementAlreadyExistsException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEntitlement",
}));

export type CreateExportImageTaskError =
  | ConcurrentModificationException
  | InvalidAccountStatusException
  | InvalidRoleException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a task to export a WorkSpaces Applications image to an EC2 AMI. This allows you to use your customized WorkSpaces Applications images with other AWS services or for backup purposes.
 */
export const createExportImageTask: API.OperationMethod<
  CreateExportImageTaskRequest,
  CreateExportImageTaskResult,
  CreateExportImageTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateExportImageTaskRequest,
  output: CreateExportImageTaskResult,
  errors: [
    ConcurrentModificationException,
    InvalidAccountStatusException,
    InvalidRoleException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExportImageTask",
}));

export type CreateFleetError =
  | ConcurrentModificationException
  | IncompatibleImageException
  | InvalidAccountStatusException
  | InvalidParameterCombinationException
  | InvalidRoleException
  | LimitExceededException
  | OperationNotPermittedException
  | RequestLimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a fleet. A fleet consists of streaming instances that your users access for their applications and desktops.
 */
export const createFleet: API.OperationMethod<
  CreateFleetRequest,
  CreateFleetResult,
  CreateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFleetRequest,
  output: CreateFleetResult,
  errors: [
    ConcurrentModificationException,
    IncompatibleImageException,
    InvalidAccountStatusException,
    InvalidParameterCombinationException,
    InvalidRoleException,
    LimitExceededException,
    OperationNotPermittedException,
    RequestLimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFleet",
}));

export type CreateImageBuilderError =
  | ConcurrentModificationException
  | IncompatibleImageException
  | InvalidAccountStatusException
  | InvalidParameterCombinationException
  | InvalidRoleException
  | LimitExceededException
  | OperationNotPermittedException
  | RequestLimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates an image builder. An image builder is a virtual machine that is used to create an image.
 *
 * The initial state of the builder is `PENDING`. When it is ready, the state is `RUNNING`.
 */
export const createImageBuilder: API.OperationMethod<
  CreateImageBuilderRequest,
  CreateImageBuilderResult,
  CreateImageBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateImageBuilderRequest,
  output: CreateImageBuilderResult,
  errors: [
    ConcurrentModificationException,
    IncompatibleImageException,
    InvalidAccountStatusException,
    InvalidParameterCombinationException,
    InvalidRoleException,
    LimitExceededException,
    OperationNotPermittedException,
    RequestLimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateImageBuilder",
}));

export type CreateImageBuilderStreamingURLError =
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a URL to start an image builder streaming session.
 */
export const createImageBuilderStreamingURL: API.OperationMethod<
  CreateImageBuilderStreamingURLRequest,
  CreateImageBuilderStreamingURLResult,
  CreateImageBuilderStreamingURLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateImageBuilderStreamingURLRequest,
  output: CreateImageBuilderStreamingURLResult,
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateImageBuilderStreamingURL",
}));

export type CreateImportedImageError =
  | DryRunOperationException
  | IncompatibleImageException
  | InvalidAccountStatusException
  | InvalidParameterCombinationException
  | InvalidRoleException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a custom WorkSpaces Applications image by importing an EC2 AMI. This allows you to use your own customized AMI to create WorkSpaces Applications images that support additional instance types beyond the standard stream.* instances.
 */
export const createImportedImage: API.OperationMethod<
  CreateImportedImageRequest,
  CreateImportedImageResult,
  CreateImportedImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateImportedImageRequest,
  output: CreateImportedImageResult,
  errors: [
    DryRunOperationException,
    IncompatibleImageException,
    InvalidAccountStatusException,
    InvalidParameterCombinationException,
    InvalidRoleException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateImportedImage",
}));

export type CreateStackError =
  | ConcurrentModificationException
  | InvalidAccountStatusException
  | InvalidParameterCombinationException
  | InvalidRoleException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a stack to start streaming applications to users. A stack consists of an associated fleet, user access policies, and storage configurations.
 */
export const createStack: API.OperationMethod<
  CreateStackRequest,
  CreateStackResult,
  CreateStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStackRequest,
  output: CreateStackResult,
  errors: [
    ConcurrentModificationException,
    InvalidAccountStatusException,
    InvalidParameterCombinationException,
    InvalidRoleException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStack",
}));

export type CreateStreamingURLError =
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a temporary URL to start an WorkSpaces Applications streaming session for the specified user. A streaming URL enables application streaming to be tested without user setup.
 */
export const createStreamingURL: API.OperationMethod<
  CreateStreamingURLRequest,
  CreateStreamingURLResult,
  CreateStreamingURLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStreamingURLRequest,
  output: CreateStreamingURLResult,
  errors: [
    InvalidParameterCombinationException,
    OperationNotPermittedException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStreamingURL",
}));

export type CreateThemeForStackError =
  | ConcurrentModificationException
  | InvalidAccountStatusException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates custom branding that customizes the appearance of the streaming application catalog page.
 */
export const createThemeForStack: API.OperationMethod<
  CreateThemeForStackRequest,
  CreateThemeForStackResult,
  CreateThemeForStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateThemeForStackRequest,
  output: CreateThemeForStackResult,
  errors: [
    ConcurrentModificationException,
    InvalidAccountStatusException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateThemeForStack",
}));

export type CreateUpdatedImageError =
  | ConcurrentModificationException
  | IncompatibleImageException
  | InvalidAccountStatusException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a new image with the latest Windows operating system updates, driver updates, and WorkSpaces Applications agent software.
 *
 * For more information, see the "Update an Image by Using
 * Managed WorkSpaces Applications Image Updates" section in Administer Your WorkSpaces Applications Images, in the *Amazon WorkSpaces Applications Administration Guide*.
 */
export const createUpdatedImage: API.OperationMethod<
  CreateUpdatedImageRequest,
  CreateUpdatedImageResult,
  CreateUpdatedImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUpdatedImageRequest,
  output: CreateUpdatedImageResult,
  errors: [
    ConcurrentModificationException,
    IncompatibleImageException,
    InvalidAccountStatusException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUpdatedImage",
}));

export type CreateUsageReportSubscriptionError =
  | InvalidAccountStatusException
  | InvalidRoleException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a usage report subscription. Usage reports are generated daily.
 */
export const createUsageReportSubscription: API.OperationMethod<
  CreateUsageReportSubscriptionRequest,
  CreateUsageReportSubscriptionResult,
  CreateUsageReportSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUsageReportSubscriptionRequest,
  output: CreateUsageReportSubscriptionResult,
  errors: [
    InvalidAccountStatusException,
    InvalidRoleException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUsageReportSubscription",
}));

export type CreateUserError =
  | InvalidAccountStatusException
  | InvalidParameterCombinationException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceAlreadyExistsException
  | CommonErrors;
/**
 * Creates a new user in the user pool.
 */
export const createUser: API.OperationMethod<
  CreateUserRequest,
  CreateUserResult,
  CreateUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUserRequest,
  output: CreateUserResult,
  errors: [
    InvalidAccountStatusException,
    InvalidParameterCombinationException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUser",
}));

export type DeleteAppBlockError =
  | ConcurrentModificationException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an app block.
 */
export const deleteAppBlock: API.OperationMethod<
  DeleteAppBlockRequest,
  DeleteAppBlockResult,
  DeleteAppBlockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAppBlockRequest,
  output: DeleteAppBlockResult,
  errors: [
    ConcurrentModificationException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAppBlock",
}));

export type DeleteAppBlockBuilderError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an app block builder.
 *
 * An app block builder can only be deleted when it has no association with an app
 * block.
 */
export const deleteAppBlockBuilder: API.OperationMethod<
  DeleteAppBlockBuilderRequest,
  DeleteAppBlockBuilderResult,
  DeleteAppBlockBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAppBlockBuilderRequest,
  output: DeleteAppBlockBuilderResult,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAppBlockBuilder",
}));

export type DeleteApplicationError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an application.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResult,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApplicationRequest,
  output: DeleteApplicationResult,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

export type DeleteDirectoryConfigError =
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified Directory Config object from WorkSpaces Applications. This object includes the information required to join streaming instances to an Active Directory domain.
 */
export const deleteDirectoryConfig: API.OperationMethod<
  DeleteDirectoryConfigRequest,
  DeleteDirectoryConfigResult,
  DeleteDirectoryConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDirectoryConfigRequest,
  output: DeleteDirectoryConfigResult,
  errors: [ResourceInUseException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDirectoryConfig",
}));

export type DeleteEntitlementError =
  | ConcurrentModificationException
  | EntitlementNotFoundException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified entitlement.
 */
export const deleteEntitlement: API.OperationMethod<
  DeleteEntitlementRequest,
  DeleteEntitlementResult,
  DeleteEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEntitlementRequest,
  output: DeleteEntitlementResult,
  errors: [
    ConcurrentModificationException,
    EntitlementNotFoundException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEntitlement",
}));

export type DeleteFleetError =
  | ConcurrentModificationException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified fleet.
 */
export const deleteFleet: API.OperationMethod<
  DeleteFleetRequest,
  DeleteFleetResult,
  DeleteFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFleetRequest,
  output: DeleteFleetResult,
  errors: [
    ConcurrentModificationException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFleet",
}));

export type DeleteImageError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified image. You cannot delete an image when it is in use.
 * After you delete an image, you cannot provision new capacity using the image.
 */
export const deleteImage: API.OperationMethod<
  DeleteImageRequest,
  DeleteImageResult,
  DeleteImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteImageRequest,
  output: DeleteImageResult,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImage",
}));

export type DeleteImageBuilderError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified image builder and releases the capacity.
 */
export const deleteImageBuilder: API.OperationMethod<
  DeleteImageBuilderRequest,
  DeleteImageBuilderResult,
  DeleteImageBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteImageBuilderRequest,
  output: DeleteImageBuilderResult,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImageBuilder",
}));

export type DeleteImagePermissionsError =
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes permissions for the specified private image. After you delete permissions for an image, AWS accounts to which you previously granted these permissions can no longer use the image.
 */
export const deleteImagePermissions: API.OperationMethod<
  DeleteImagePermissionsRequest,
  DeleteImagePermissionsResult,
  DeleteImagePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteImagePermissionsRequest,
  output: DeleteImagePermissionsResult,
  errors: [ResourceNotAvailableException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImagePermissions",
}));

export type DeleteStackError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified stack. After the stack is deleted, the application streaming environment provided by the stack is no longer available to users. Also, any reservations made for application streaming sessions for the stack are released.
 */
export const deleteStack: API.OperationMethod<
  DeleteStackRequest,
  DeleteStackResult,
  DeleteStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStackRequest,
  output: DeleteStackResult,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStack",
}));

export type DeleteThemeForStackError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes custom branding that customizes the appearance of the streaming application catalog page.
 */
export const deleteThemeForStack: API.OperationMethod<
  DeleteThemeForStackRequest,
  DeleteThemeForStackResult,
  DeleteThemeForStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteThemeForStackRequest,
  output: DeleteThemeForStackResult,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteThemeForStack",
}));

export type DeleteUsageReportSubscriptionError =
  | InvalidAccountStatusException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disables usage report generation.
 */
export const deleteUsageReportSubscription: API.OperationMethod<
  DeleteUsageReportSubscriptionRequest,
  DeleteUsageReportSubscriptionResult,
  DeleteUsageReportSubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUsageReportSubscriptionRequest,
  output: DeleteUsageReportSubscriptionResult,
  errors: [InvalidAccountStatusException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUsageReportSubscription",
}));

export type DeleteUserError = ResourceNotFoundException | CommonErrors;
/**
 * Deletes a user from the user pool.
 */
export const deleteUser: API.OperationMethod<
  DeleteUserRequest,
  DeleteUserResult,
  DeleteUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUserRequest,
  output: DeleteUserResult,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUser",
}));

export type DescribeAppBlockBuilderAppBlockAssociationsError =
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | CommonErrors;
/**
 * Retrieves a list that describes one or more app block builder associations.
 */
export const describeAppBlockBuilderAppBlockAssociations: API.PaginatedOperationMethod<
  DescribeAppBlockBuilderAppBlockAssociationsRequest,
  DescribeAppBlockBuilderAppBlockAssociationsResult,
  DescribeAppBlockBuilderAppBlockAssociationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeAppBlockBuilderAppBlockAssociationsRequest,
  output: DescribeAppBlockBuilderAppBlockAssociationsResult,
  errors: [
    InvalidParameterCombinationException,
    OperationNotPermittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAppBlockBuilderAppBlockAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeAppBlockBuildersError =
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes one or more app block builders.
 */
export const describeAppBlockBuilders: API.PaginatedOperationMethod<
  DescribeAppBlockBuildersRequest,
  DescribeAppBlockBuildersResult,
  DescribeAppBlockBuildersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeAppBlockBuildersRequest,
  output: DescribeAppBlockBuildersResult,
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAppBlockBuilders",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeAppBlocksError =
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes one or more app blocks.
 */
export const describeAppBlocks: API.OperationMethod<
  DescribeAppBlocksRequest,
  DescribeAppBlocksResult,
  DescribeAppBlocksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAppBlocksRequest,
  output: DescribeAppBlocksResult,
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAppBlocks",
}));

export type DescribeApplicationFleetAssociationsError =
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | CommonErrors;
/**
 * Retrieves a list that describes one or more application fleet associations. Either ApplicationArn or FleetName must be specified.
 */
export const describeApplicationFleetAssociations: API.OperationMethod<
  DescribeApplicationFleetAssociationsRequest,
  DescribeApplicationFleetAssociationsResult,
  DescribeApplicationFleetAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeApplicationFleetAssociationsRequest,
  output: DescribeApplicationFleetAssociationsResult,
  errors: [
    InvalidParameterCombinationException,
    OperationNotPermittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicationFleetAssociations",
}));

export type DescribeApplicationsError =
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes one or more applications.
 */
export const describeApplications: API.OperationMethod<
  DescribeApplicationsRequest,
  DescribeApplicationsResult,
  DescribeApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeApplicationsRequest,
  output: DescribeApplicationsResult,
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplications",
}));

export type DescribeAppLicenseUsageError =
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves license included application usage information.
 */
export const describeAppLicenseUsage: API.OperationMethod<
  DescribeAppLicenseUsageRequest,
  DescribeAppLicenseUsageResult,
  DescribeAppLicenseUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAppLicenseUsageRequest,
  output: DescribeAppLicenseUsageResult,
  errors: [
    InvalidParameterCombinationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAppLicenseUsage",
}));

export type DescribeDirectoryConfigsError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes one or more specified Directory Config objects for WorkSpaces Applications, if the names for these objects are provided. Otherwise, all Directory Config objects in the account are described. These objects include the configuration information required to join fleets and image builders to Microsoft Active Directory domains.
 *
 * Although the response syntax in this topic includes the account password, this password is not returned in the actual response.
 */
export const describeDirectoryConfigs: API.OperationMethod<
  DescribeDirectoryConfigsRequest,
  DescribeDirectoryConfigsResult,
  DescribeDirectoryConfigsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDirectoryConfigsRequest,
  output: DescribeDirectoryConfigsResult,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDirectoryConfigs",
}));

export type DescribeEntitlementsError =
  | EntitlementNotFoundException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes one of more entitlements.
 */
export const describeEntitlements: API.OperationMethod<
  DescribeEntitlementsRequest,
  DescribeEntitlementsResult,
  DescribeEntitlementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEntitlementsRequest,
  output: DescribeEntitlementsResult,
  errors: [
    EntitlementNotFoundException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEntitlements",
}));

export type DescribeFleetsError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves a list that describes one or more specified fleets, if the fleet names are provided. Otherwise, all fleets in the account are described.
 */
export const describeFleets: API.OperationMethod<
  DescribeFleetsRequest,
  DescribeFleetsResult,
  DescribeFleetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFleetsRequest,
  output: DescribeFleetsResult,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFleets",
}));

export type DescribeImageBuildersError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes one or more specified image builders, if the image builder names are provided. Otherwise, all image builders in the account are described.
 */
export const describeImageBuilders: API.OperationMethod<
  DescribeImageBuildersRequest,
  DescribeImageBuildersResult,
  DescribeImageBuildersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeImageBuildersRequest,
  output: DescribeImageBuildersResult,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImageBuilders",
}));

export type DescribeImagePermissionsError =
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes the permissions for shared AWS account IDs on a private image that you own.
 */
export const describeImagePermissions: API.PaginatedOperationMethod<
  DescribeImagePermissionsRequest,
  DescribeImagePermissionsResult,
  DescribeImagePermissionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeImagePermissionsRequest,
  output: DescribeImagePermissionsResult,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImagePermissions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeImagesError =
  | InvalidParameterCombinationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes one or more specified images, if the image names or image ARNs are provided. Otherwise, all images in the account are described.
 */
export const describeImages: API.PaginatedOperationMethod<
  DescribeImagesRequest,
  DescribeImagesResult,
  DescribeImagesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeImagesRequest,
  output: DescribeImagesResult,
  errors: [InvalidParameterCombinationException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImages",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSessionsError =
  | InvalidParameterCombinationException
  | CommonErrors;
/**
 * Retrieves a list that describes the streaming sessions for a specified stack and fleet. If a UserId is provided for the stack and fleet,
 * only streaming sessions for that user are described. If an authentication type is not provided,
 * the default is to authenticate users using a streaming URL.
 */
export const describeSessions: API.OperationMethod<
  DescribeSessionsRequest,
  DescribeSessionsResult,
  DescribeSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSessionsRequest,
  output: DescribeSessionsResult,
  errors: [InvalidParameterCombinationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSessions",
}));

export type DescribeSoftwareAssociationsError =
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves license included application associations for a specified resource.
 */
export const describeSoftwareAssociations: API.OperationMethod<
  DescribeSoftwareAssociationsRequest,
  DescribeSoftwareAssociationsResult,
  DescribeSoftwareAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSoftwareAssociationsRequest,
  output: DescribeSoftwareAssociationsResult,
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSoftwareAssociations",
}));

export type DescribeStacksError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves a list that describes one or more specified stacks, if the stack names are provided. Otherwise, all stacks in the account are described.
 */
export const describeStacks: API.OperationMethod<
  DescribeStacksRequest,
  DescribeStacksResult,
  DescribeStacksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeStacksRequest,
  output: DescribeStacksResult,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStacks",
}));

export type DescribeThemeForStackError =
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes the theme for a specified stack. A theme is custom branding that customizes the appearance of the streaming application catalog page.
 */
export const describeThemeForStack: API.OperationMethod<
  DescribeThemeForStackRequest,
  DescribeThemeForStackResult,
  DescribeThemeForStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeThemeForStackRequest,
  output: DescribeThemeForStackResult,
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeThemeForStack",
}));

export type DescribeUsageReportSubscriptionsError =
  | InvalidAccountStatusException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes one or more usage report subscriptions.
 */
export const describeUsageReportSubscriptions: API.OperationMethod<
  DescribeUsageReportSubscriptionsRequest,
  DescribeUsageReportSubscriptionsResult,
  DescribeUsageReportSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeUsageReportSubscriptionsRequest,
  output: DescribeUsageReportSubscriptionsResult,
  errors: [InvalidAccountStatusException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUsageReportSubscriptions",
}));

export type DescribeUsersError =
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list that describes one or more specified users in the user pool.
 */
export const describeUsers: API.OperationMethod<
  DescribeUsersRequest,
  DescribeUsersResult,
  DescribeUsersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeUsersRequest,
  output: DescribeUsersResult,
  errors: [
    InvalidParameterCombinationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUsers",
}));

export type DescribeUserStackAssociationsError =
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | CommonErrors;
/**
 * Retrieves a list that describes the UserStackAssociation objects. You must specify either or both of the following:
 *
 * - The stack name
 *
 * - The user name (email address of the user associated with the stack) and the authentication type for the user
 */
export const describeUserStackAssociations: API.OperationMethod<
  DescribeUserStackAssociationsRequest,
  DescribeUserStackAssociationsResult,
  DescribeUserStackAssociationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeUserStackAssociationsRequest,
  output: DescribeUserStackAssociationsResult,
  errors: [
    InvalidParameterCombinationException,
    OperationNotPermittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeUserStackAssociations",
}));

export type DisableUserError = ResourceNotFoundException | CommonErrors;
/**
 * Disables the specified user in the user pool. Users can't sign in to WorkSpaces Applications until they are re-enabled. This action does not delete the user.
 */
export const disableUser: API.OperationMethod<
  DisableUserRequest,
  DisableUserResult,
  DisableUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableUserRequest,
  output: DisableUserResult,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableUser",
}));

export type DisassociateAppBlockBuilderAppBlockError =
  | ConcurrentModificationException
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates a specified app block builder from a specified app block.
 */
export const disassociateAppBlockBuilderAppBlock: API.OperationMethod<
  DisassociateAppBlockBuilderAppBlockRequest,
  DisassociateAppBlockBuilderAppBlockResult,
  DisassociateAppBlockBuilderAppBlockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateAppBlockBuilderAppBlockRequest,
  output: DisassociateAppBlockBuilderAppBlockResult,
  errors: [
    ConcurrentModificationException,
    InvalidParameterCombinationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAppBlockBuilderAppBlock",
}));

export type DisassociateApplicationFleetError =
  | ConcurrentModificationException
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | CommonErrors;
/**
 * Disassociates the specified application from the fleet.
 */
export const disassociateApplicationFleet: API.OperationMethod<
  DisassociateApplicationFleetRequest,
  DisassociateApplicationFleetResult,
  DisassociateApplicationFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateApplicationFleetRequest,
  output: DisassociateApplicationFleetResult,
  errors: [
    ConcurrentModificationException,
    InvalidParameterCombinationException,
    OperationNotPermittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateApplicationFleet",
}));

export type DisassociateApplicationFromEntitlementError =
  | EntitlementNotFoundException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified application from the specified entitlement.
 */
export const disassociateApplicationFromEntitlement: API.OperationMethod<
  DisassociateApplicationFromEntitlementRequest,
  DisassociateApplicationFromEntitlementResult,
  DisassociateApplicationFromEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateApplicationFromEntitlementRequest,
  output: DisassociateApplicationFromEntitlementResult,
  errors: [
    EntitlementNotFoundException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateApplicationFromEntitlement",
}));

export type DisassociateFleetError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates the specified fleet from the specified stack.
 */
export const disassociateFleet: API.OperationMethod<
  DisassociateFleetRequest,
  DisassociateFleetResult,
  DisassociateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateFleetRequest,
  output: DisassociateFleetResult,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFleet",
}));

export type DisassociateSoftwareFromImageBuilderError =
  | ConcurrentModificationException
  | InvalidParameterCombinationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes license included application(s) association(s) from an image builder instance.
 */
export const disassociateSoftwareFromImageBuilder: API.OperationMethod<
  DisassociateSoftwareFromImageBuilderRequest,
  DisassociateSoftwareFromImageBuilderResult,
  DisassociateSoftwareFromImageBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateSoftwareFromImageBuilderRequest,
  output: DisassociateSoftwareFromImageBuilderResult,
  errors: [
    ConcurrentModificationException,
    InvalidParameterCombinationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSoftwareFromImageBuilder",
}));

export type DrainSessionInstanceError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Drains the instance hosting the specified streaming session. The instance stops accepting new sessions while existing sessions continue uninterrupted. Once all sessions end, the instance is reclaimed and replaced. This only applies to multi-session fleets.
 */
export const drainSessionInstance: API.OperationMethod<
  DrainSessionInstanceRequest,
  DrainSessionInstanceResult,
  DrainSessionInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DrainSessionInstanceRequest,
  output: DrainSessionInstanceResult,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DrainSessionInstance",
}));

export type EnableUserError =
  | InvalidAccountStatusException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Enables a user in the user pool. After being enabled, users can sign in to WorkSpaces Applications and open applications from the stacks to which they are assigned.
 */
export const enableUser: API.OperationMethod<
  EnableUserRequest,
  EnableUserResult,
  EnableUserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableUserRequest,
  output: EnableUserResult,
  errors: [InvalidAccountStatusException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableUser",
}));

export type ExpireSessionError = CommonErrors;
/**
 * Immediately stops the specified streaming session.
 */
export const expireSession: API.OperationMethod<
  ExpireSessionRequest,
  ExpireSessionResult,
  ExpireSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExpireSessionRequest,
  output: ExpireSessionResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExpireSession",
}));

export type GetExportImageTaskError =
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about an export image task, including its current state, progress, and any error details.
 */
export const getExportImageTask: API.OperationMethod<
  GetExportImageTaskRequest,
  GetExportImageTaskResult,
  GetExportImageTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetExportImageTaskRequest,
  output: GetExportImageTaskResult,
  errors: [OperationNotPermittedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExportImageTask",
}));

export type ListAssociatedFleetsError = CommonErrors;
/**
 * Retrieves the name of the fleet that is associated with the specified stack.
 */
export const listAssociatedFleets: API.OperationMethod<
  ListAssociatedFleetsRequest,
  ListAssociatedFleetsResult,
  ListAssociatedFleetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListAssociatedFleetsRequest,
  output: ListAssociatedFleetsResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedFleets",
}));

export type ListAssociatedStacksError = CommonErrors;
/**
 * Retrieves the name of the stack with which the specified fleet is associated.
 */
export const listAssociatedStacks: API.OperationMethod<
  ListAssociatedStacksRequest,
  ListAssociatedStacksResult,
  ListAssociatedStacksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListAssociatedStacksRequest,
  output: ListAssociatedStacksResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedStacks",
}));

export type ListEntitledApplicationsError =
  | EntitlementNotFoundException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list of entitled applications.
 */
export const listEntitledApplications: API.OperationMethod<
  ListEntitledApplicationsRequest,
  ListEntitledApplicationsResult,
  ListEntitledApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListEntitledApplicationsRequest,
  output: ListEntitledApplicationsResult,
  errors: [
    EntitlementNotFoundException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntitledApplications",
}));

export type ListExportImageTasksError =
  | OperationNotPermittedException
  | CommonErrors;
/**
 * Lists export image tasks, with optional filtering and pagination. Use this operation to monitor the status of multiple export operations.
 */
export const listExportImageTasks: API.OperationMethod<
  ListExportImageTasksRequest,
  ListExportImageTasksResult,
  ListExportImageTasksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListExportImageTasksRequest,
  output: ListExportImageTasksResult,
  errors: [OperationNotPermittedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExportImageTasks",
}));

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves a list of all tags for the specified WorkSpaces Applications resource. You can tag WorkSpaces Applications image builders, images, fleets, and stacks.
 *
 * For more information about tags, see Tagging Your Resources in the *Amazon WorkSpaces Applications Administration Guide*.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartAppBlockBuilderError =
  | ConcurrentModificationException
  | InvalidAccountStatusException
  | LimitExceededException
  | OperationNotPermittedException
  | RequestLimitExceededException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts an app block builder.
 *
 * An app block builder can only be started when it's associated with an app
 * block.
 *
 * Starting an app block builder starts a new instance, which is equivalent to an elastic
 * fleet instance with application builder assistance functionality.
 */
export const startAppBlockBuilder: API.OperationMethod<
  StartAppBlockBuilderRequest,
  StartAppBlockBuilderResult,
  StartAppBlockBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartAppBlockBuilderRequest,
  output: StartAppBlockBuilderResult,
  errors: [
    ConcurrentModificationException,
    InvalidAccountStatusException,
    LimitExceededException,
    OperationNotPermittedException,
    RequestLimitExceededException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAppBlockBuilder",
}));

export type StartFleetError =
  | ConcurrentModificationException
  | InvalidAccountStatusException
  | InvalidRoleException
  | LimitExceededException
  | OperationNotPermittedException
  | RequestLimitExceededException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts the specified fleet.
 */
export const startFleet: API.OperationMethod<
  StartFleetRequest,
  StartFleetResult,
  StartFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartFleetRequest,
  output: StartFleetResult,
  errors: [
    ConcurrentModificationException,
    InvalidAccountStatusException,
    InvalidRoleException,
    LimitExceededException,
    OperationNotPermittedException,
    RequestLimitExceededException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFleet",
}));

export type StartImageBuilderError =
  | ConcurrentModificationException
  | IncompatibleImageException
  | InvalidAccountStatusException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts the specified image builder.
 */
export const startImageBuilder: API.OperationMethod<
  StartImageBuilderRequest,
  StartImageBuilderResult,
  StartImageBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartImageBuilderRequest,
  output: StartImageBuilderResult,
  errors: [
    ConcurrentModificationException,
    IncompatibleImageException,
    InvalidAccountStatusException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImageBuilder",
}));

export type StartSoftwareDeploymentToImageBuilderError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Initiates license included applications deployment to an image builder instance.
 */
export const startSoftwareDeploymentToImageBuilder: API.OperationMethod<
  StartSoftwareDeploymentToImageBuilderRequest,
  StartSoftwareDeploymentToImageBuilderResult,
  StartSoftwareDeploymentToImageBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartSoftwareDeploymentToImageBuilderRequest,
  output: StartSoftwareDeploymentToImageBuilderResult,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSoftwareDeploymentToImageBuilder",
}));

export type StopAppBlockBuilderError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops an app block builder.
 *
 * Stopping an app block builder terminates the instance, and the instance state is not
 * persisted.
 */
export const stopAppBlockBuilder: API.OperationMethod<
  StopAppBlockBuilderRequest,
  StopAppBlockBuilderResult,
  StopAppBlockBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopAppBlockBuilderRequest,
  output: StopAppBlockBuilderResult,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopAppBlockBuilder",
}));

export type StopFleetError =
  | ConcurrentModificationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops the specified fleet.
 */
export const stopFleet: API.OperationMethod<
  StopFleetRequest,
  StopFleetResult,
  StopFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopFleetRequest,
  output: StopFleetResult,
  errors: [ConcurrentModificationException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopFleet",
}));

export type StopImageBuilderError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops the specified image builder.
 */
export const stopImageBuilder: API.OperationMethod<
  StopImageBuilderRequest,
  StopImageBuilderResult,
  StopImageBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopImageBuilderRequest,
  output: StopImageBuilderResult,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopImageBuilder",
}));

export type TagResourceError =
  | InvalidAccountStatusException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds or overwrites one or more tags for the specified WorkSpaces Applications resource. You can tag WorkSpaces Applications image builders, images, fleets, and stacks.
 *
 * Each tag consists of a key and an optional value. If a resource already has a tag with the same key,
 * this operation updates its value.
 *
 * To list the current tags for your resources, use ListTagsForResource.
 * To disassociate tags from your resources, use UntagResource.
 *
 * For more information about tags, see Tagging Your Resources in the *Amazon WorkSpaces Applications Administration Guide*.
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
    InvalidAccountStatusException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Disassociates one or more specified tags from the specified WorkSpaces Applications resource.
 *
 * To list the current tags for your resources, use ListTagsForResource.
 *
 * For more information about tags, see Tagging Your Resources in the *Amazon WorkSpaces Applications Administration Guide*.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAppBlockBuilderError =
  | ConcurrentModificationException
  | InvalidAccountStatusException
  | InvalidParameterCombinationException
  | InvalidRoleException
  | LimitExceededException
  | OperationNotPermittedException
  | RequestLimitExceededException
  | ResourceInUseException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an app block builder.
 *
 * If the app block builder is in the `STARTING` or `STOPPING`
 * state, you can't update it. If the app block builder is in the `RUNNING`
 * state, you can only update the DisplayName and Description. If the app block builder is
 * in the `STOPPED` state, you can update any attribute except the Name.
 */
export const updateAppBlockBuilder: API.OperationMethod<
  UpdateAppBlockBuilderRequest,
  UpdateAppBlockBuilderResult,
  UpdateAppBlockBuilderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAppBlockBuilderRequest,
  output: UpdateAppBlockBuilderResult,
  errors: [
    ConcurrentModificationException,
    InvalidAccountStatusException,
    InvalidParameterCombinationException,
    InvalidRoleException,
    LimitExceededException,
    OperationNotPermittedException,
    RequestLimitExceededException,
    ResourceInUseException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAppBlockBuilder",
}));

export type UpdateApplicationError =
  | ConcurrentModificationException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the specified application.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  UpdateApplicationResult,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApplicationRequest,
  output: UpdateApplicationResult,
  errors: [
    ConcurrentModificationException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));

export type UpdateDirectoryConfigError =
  | ConcurrentModificationException
  | IncompatibleImageException
  | InvalidRoleException
  | OperationNotPermittedException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the specified Directory Config object in WorkSpaces Applications. This object includes the configuration information required to join fleets and image builders to Microsoft Active Directory domains.
 */
export const updateDirectoryConfig: API.OperationMethod<
  UpdateDirectoryConfigRequest,
  UpdateDirectoryConfigResult,
  UpdateDirectoryConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDirectoryConfigRequest,
  output: UpdateDirectoryConfigResult,
  errors: [
    ConcurrentModificationException,
    IncompatibleImageException,
    InvalidRoleException,
    OperationNotPermittedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDirectoryConfig",
}));

export type UpdateEntitlementError =
  | ConcurrentModificationException
  | EntitlementNotFoundException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the specified entitlement.
 */
export const updateEntitlement: API.OperationMethod<
  UpdateEntitlementRequest,
  UpdateEntitlementResult,
  UpdateEntitlementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEntitlementRequest,
  output: UpdateEntitlementResult,
  errors: [
    ConcurrentModificationException,
    EntitlementNotFoundException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEntitlement",
}));

export type UpdateFleetError =
  | ConcurrentModificationException
  | IncompatibleImageException
  | InvalidAccountStatusException
  | InvalidParameterCombinationException
  | InvalidRoleException
  | LimitExceededException
  | OperationNotPermittedException
  | RequestLimitExceededException
  | ResourceInUseException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the specified fleet.
 *
 * If the fleet is in the `STOPPED` state, you can update any attribute except
 * the fleet name.
 *
 * If the fleet is in the `RUNNING` state, you can update the following based
 * on the fleet type:
 *
 * - Always-On and On-Demand fleet types
 *
 * You can update the `DisplayName`, `ComputeCapacity`,
 * `ImageARN`, `ImageName`,
 * `IdleDisconnectTimeoutInSeconds`, and
 * `DisconnectTimeoutInSeconds` attributes.
 *
 * - Elastic fleet type
 *
 * You can update the `DisplayName`,
 * `IdleDisconnectTimeoutInSeconds`,
 * `DisconnectTimeoutInSeconds`, `MaxConcurrentSessions`, `SessionScriptS3Location`
 * and `UsbDeviceFilterStrings` attributes.
 *
 * If the fleet is in the `STARTING` or `STOPPED` state, you can't update it.
 */
export const updateFleet: API.OperationMethod<
  UpdateFleetRequest,
  UpdateFleetResult,
  UpdateFleetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFleetRequest,
  output: UpdateFleetResult,
  errors: [
    ConcurrentModificationException,
    IncompatibleImageException,
    InvalidAccountStatusException,
    InvalidParameterCombinationException,
    InvalidRoleException,
    LimitExceededException,
    OperationNotPermittedException,
    RequestLimitExceededException,
    ResourceInUseException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFleet",
}));

export type UpdateImagePermissionsError =
  | LimitExceededException
  | ResourceNotAvailableException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds or updates permissions for the specified private image.
 */
export const updateImagePermissions: API.OperationMethod<
  UpdateImagePermissionsRequest,
  UpdateImagePermissionsResult,
  UpdateImagePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateImagePermissionsRequest,
  output: UpdateImagePermissionsResult,
  errors: [
    LimitExceededException,
    ResourceNotAvailableException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateImagePermissions",
}));

export type UpdateStackError =
  | ConcurrentModificationException
  | IncompatibleImageException
  | InvalidAccountStatusException
  | InvalidParameterCombinationException
  | InvalidRoleException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the specified fields for the specified stack.
 */
export const updateStack: API.OperationMethod<
  UpdateStackRequest,
  UpdateStackResult,
  UpdateStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateStackRequest,
  output: UpdateStackResult,
  errors: [
    ConcurrentModificationException,
    IncompatibleImageException,
    InvalidAccountStatusException,
    InvalidParameterCombinationException,
    InvalidRoleException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStack",
}));

export type UpdateThemeForStackError =
  | ConcurrentModificationException
  | InvalidAccountStatusException
  | InvalidParameterCombinationException
  | LimitExceededException
  | OperationNotPermittedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates custom branding that customizes the appearance of the streaming application catalog page.
 */
export const updateThemeForStack: API.OperationMethod<
  UpdateThemeForStackRequest,
  UpdateThemeForStackResult,
  UpdateThemeForStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateThemeForStackRequest,
  output: UpdateThemeForStackResult,
  errors: [
    ConcurrentModificationException,
    InvalidAccountStatusException,
    InvalidParameterCombinationException,
    LimitExceededException,
    OperationNotPermittedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateThemeForStack",
}));
