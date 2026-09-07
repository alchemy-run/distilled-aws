import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace(
  "http://cloudformation.amazonaws.com/doc/2010-05-15/",
);
const svc = T.AwsApiService({
  sdkId: "CloudFormation",
  serviceShapeName: "CloudFormation",
});
const auth = T.AwsAuthSigv4({ name: "cloudformation" });
const ver = T.ServiceVersion("2010-05-15");
const proto = T.AwsProtocolsAwsQuery();
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
              `https://cloudformation-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://cloudformation.${Region}.amazonaws.com`);
            }
            return e(
              `https://cloudformation-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://cloudformation.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://cloudformation.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<AlreadyExistsException>()(
    "AlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "AlreadyExistsException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class CFNRegistryException
  extends /*@__PURE__*/ S.TaggedError<CFNRegistryException>()(
    "CFNRegistryException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "CFNRegistryException", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ChangeSetNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ChangeSetNotFoundException>()(
    "ChangeSetNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ChangeSetNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ConcurrentResourcesLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentResourcesLimitExceededException>()(
    "ConcurrentResourcesLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ConcurrentResourcesLimitExceeded",
        httpResponseCode: 429,
      }),
      T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export class CreatedButModifiedException
  extends /*@__PURE__*/ S.TaggedError<CreatedButModifiedException>()(
    "CreatedButModifiedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CreatedButModifiedException",
        httpResponseCode: 409,
      }),
      T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class GeneratedTemplateNotFoundException
  extends /*@__PURE__*/ S.TaggedError<GeneratedTemplateNotFoundException>()(
    "GeneratedTemplateNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "GeneratedTemplateNotFound",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class HookResultNotFoundException
  extends /*@__PURE__*/ S.TaggedError<HookResultNotFoundException>()(
    "HookResultNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "HookResultNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class InsufficientCapabilitiesException
  extends /*@__PURE__*/ S.TaggedError<InsufficientCapabilitiesException>()(
    "InsufficientCapabilitiesException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InsufficientCapabilitiesException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidChangeSetStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidChangeSetStatusException>()(
    "InvalidChangeSetStatusException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidChangeSetStatus",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidOperationException
  extends /*@__PURE__*/ S.TaggedError<InvalidOperationException>()(
    "InvalidOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidOperationException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidStateTransitionException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateTransitionException>()(
    "InvalidStateTransitionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidStateTransition",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "LimitExceededException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class NameAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<NameAlreadyExistsException>()(
    "NameAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "NameAlreadyExistsException",
        httpResponseCode: 409,
      }),
      T.HttpError(409),
    ),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class NoUpdateToPerform
  extends /*@__PURE__*/ S.TaggedError<NoUpdateToPerform>()(
    "NoUpdateToPerform",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "ValidationError",
      message: { includes: "No updates are to be performed" },
    }),
  ) {}
export class OperationIdAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<OperationIdAlreadyExistsException>()(
    "OperationIdAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "OperationIdAlreadyExistsException",
        httpResponseCode: 409,
      }),
      T.HttpError(409),
    ),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class OperationInProgressException
  extends /*@__PURE__*/ S.TaggedError<OperationInProgressException>()(
    "OperationInProgressException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "OperationInProgressException",
        httpResponseCode: 409,
      }),
      T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class OperationNotFoundException
  extends /*@__PURE__*/ S.TaggedError<OperationNotFoundException>()(
    "OperationNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "OperationNotFoundException",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class OperationStatusCheckFailedException
  extends /*@__PURE__*/ S.TaggedError<OperationStatusCheckFailedException>()(
    "OperationStatusCheckFailedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ConditionalCheckFailed",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceScanInProgressException
  extends /*@__PURE__*/ S.TaggedError<ResourceScanInProgressException>()(
    "ResourceScanInProgressException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ResourceScanInProgress",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceScanLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceScanLimitExceededException>()(
    "ResourceScanLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ResourceScanLimitExceeded",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceScanNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceScanNotFoundException>()(
    "ResourceScanNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ResourceScanNotFound", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class StackInstanceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<StackInstanceNotFoundException>()(
    "StackInstanceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "StackInstanceNotFoundException",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class StackNotFound
  extends /*@__PURE__*/ S.TaggedError<StackNotFound>()(
    "StackNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "ValidationError",
      message: { includes: "does not exist" },
    }),
  ).pipe(C.withNotFoundError) {}
export class StackNotFoundException
  extends /*@__PURE__*/ S.TaggedError<StackNotFoundException>()(
    "StackNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "StackNotFoundException",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class StackRefactorNotFoundException
  extends /*@__PURE__*/ S.TaggedError<StackRefactorNotFoundException>()(
    "StackRefactorNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "StackRefactorNotFoundException",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class StackSetNotEmptyException
  extends /*@__PURE__*/ S.TaggedError<StackSetNotEmptyException>()(
    "StackSetNotEmptyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "StackSetNotEmptyException",
        httpResponseCode: 409,
      }),
      T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class StackSetNotFoundException
  extends /*@__PURE__*/ S.TaggedError<StackSetNotFoundException>()(
    "StackSetNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "StackSetNotFoundException",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class StaleRequestException
  extends /*@__PURE__*/ S.TaggedError<StaleRequestException>()(
    "StaleRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "StaleRequestException", httpResponseCode: 409 }),
      T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class TokenAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<TokenAlreadyExistsException>()(
    "TokenAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "TokenAlreadyExistsException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class TypeConfigurationNotFoundException
  extends /*@__PURE__*/ S.TaggedError<TypeConfigurationNotFoundException>()(
    "TypeConfigurationNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "TypeConfigurationNotFoundException",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class TypeNotFoundException
  extends /*@__PURE__*/ S.TaggedError<TypeNotFoundException>()(
    "TypeNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "TypeNotFoundException", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export interface ActivateOrganizationsAccessInput {}
export const ActivateOrganizationsAccessInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "ActivateOrganizationsAccessInput",
}) as any as S.Schema<ActivateOrganizationsAccessInput>;
export interface ActivateOrganizationsAccessOutput {}
export const ActivateOrganizationsAccessOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ActivateOrganizationsAccessOutput",
}) as any as S.Schema<ActivateOrganizationsAccessOutput>;
export type ThirdPartyType = "RESOURCE" | "MODULE" | "HOOK" | (string & {});
export const ThirdPartyType = /*@__PURE__*/ S.String;

export type ThirdPartyTypeArn = string;
export type PublisherId = string;
export type TypeName = string;
export type AutoUpdate = boolean;
export type RoleARN2 = string;
export type LogGroupName = string;
export interface LoggingConfig {
  LogRoleArn?: string;
  LogGroupName?: string;
}
export const LoggingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogRoleArn: S.optional(S.String),
    LogGroupName: S.optional(S.String),
  }),
).annotate({ identifier: "LoggingConfig" }) as any as S.Schema<LoggingConfig>;
export type VersionBump = "MAJOR" | "MINOR" | (string & {});
export const VersionBump = /*@__PURE__*/ S.String;

export type MajorVersion = number;
export interface ActivateTypeInput {
  Type?: ThirdPartyType;
  PublicTypeArn?: string;
  PublisherId?: string;
  TypeName?: string;
  TypeNameAlias?: string;
  AutoUpdate?: boolean;
  LoggingConfig?: LoggingConfig;
  ExecutionRoleArn?: string;
  VersionBump?: VersionBump;
  MajorVersion?: number;
}
export const ActivateTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(ThirdPartyType),
    PublicTypeArn: S.optional(S.String),
    PublisherId: S.optional(S.String),
    TypeName: S.optional(S.String),
    TypeNameAlias: S.optional(S.String),
    AutoUpdate: S.optional(S.Boolean),
    LoggingConfig: S.optional(LoggingConfig),
    ExecutionRoleArn: S.optional(S.String),
    VersionBump: S.optional(VersionBump),
    MajorVersion: S.optional(S.Number),
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
  identifier: "ActivateTypeInput",
}) as any as S.Schema<ActivateTypeInput>;
export type PrivateTypeArn = string;
export interface ActivateTypeOutput {
  Arn?: string;
}
export const ActivateTypeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "ActivateTypeOutput",
}) as any as S.Schema<ActivateTypeOutput>;
export type TypeArn = string;
export type TypeConfigurationAlias = string;
export type TypeConfigurationArn = string;
export interface TypeConfigurationIdentifier {
  TypeArn?: string;
  TypeConfigurationAlias?: string;
  TypeConfigurationArn?: string;
  Type?: ThirdPartyType;
  TypeName?: string;
}
export const TypeConfigurationIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TypeArn: S.optional(S.String),
    TypeConfigurationAlias: S.optional(S.String),
    TypeConfigurationArn: S.optional(S.String),
    Type: S.optional(ThirdPartyType),
    TypeName: S.optional(S.String),
  }),
).annotate({
  identifier: "TypeConfigurationIdentifier",
}) as any as S.Schema<TypeConfigurationIdentifier>;
export type TypeConfigurationIdentifiers = TypeConfigurationIdentifier[];
export const TypeConfigurationIdentifiers = /*@__PURE__*/ S.Array(
  TypeConfigurationIdentifier,
);
export interface BatchDescribeTypeConfigurationsInput {
  TypeConfigurationIdentifiers?: TypeConfigurationIdentifier[];
}
export const BatchDescribeTypeConfigurationsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TypeConfigurationIdentifiers: S.optional(TypeConfigurationIdentifiers),
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
  identifier: "BatchDescribeTypeConfigurationsInput",
}) as any as S.Schema<BatchDescribeTypeConfigurationsInput>;
export type ErrorCode = string;
export type ErrorMessage = string;
export interface BatchDescribeTypeConfigurationsError_ {
  ErrorCode?: string;
  ErrorMessage?: string;
  TypeConfigurationIdentifier?: TypeConfigurationIdentifier;
}
export const BatchDescribeTypeConfigurationsError_ = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ErrorCode: S.optional(S.String),
      ErrorMessage: S.optional(S.String),
      TypeConfigurationIdentifier: S.optional(TypeConfigurationIdentifier),
    }),
).annotate({
  identifier: "BatchDescribeTypeConfigurationsError",
}) as any as S.Schema<BatchDescribeTypeConfigurationsError_>;
export type BatchDescribeTypeConfigurationsErrors =
  BatchDescribeTypeConfigurationsError_[];
export const BatchDescribeTypeConfigurationsErrors = /*@__PURE__*/ S.Array(
  BatchDescribeTypeConfigurationsError_,
);
export type UnprocessedTypeConfigurations = TypeConfigurationIdentifier[];
export const UnprocessedTypeConfigurations = /*@__PURE__*/ S.Array(
  TypeConfigurationIdentifier,
);
export type TypeConfiguration = string;
export type IsDefaultConfiguration = boolean;
export interface TypeConfigurationDetails {
  Arn?: string;
  Alias?: string;
  Configuration?: string;
  LastUpdated?: Date;
  TypeArn?: string;
  TypeName?: string;
  IsDefaultConfiguration?: boolean;
}
export const TypeConfigurationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Alias: S.optional(S.String),
    Configuration: S.optional(S.String),
    LastUpdated: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    TypeArn: S.optional(S.String),
    TypeName: S.optional(S.String),
    IsDefaultConfiguration: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "TypeConfigurationDetails",
}) as any as S.Schema<TypeConfigurationDetails>;
export type TypeConfigurationDetailsList = TypeConfigurationDetails[];
export const TypeConfigurationDetailsList = /*@__PURE__*/ S.Array(
  TypeConfigurationDetails,
);
export interface BatchDescribeTypeConfigurationsOutput {
  Errors?: BatchDescribeTypeConfigurationsError_[];
  UnprocessedTypeConfigurations?: TypeConfigurationIdentifier[];
  TypeConfigurations?: TypeConfigurationDetails[];
}
export const BatchDescribeTypeConfigurationsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Errors: S.optional(BatchDescribeTypeConfigurationsErrors),
      UnprocessedTypeConfigurations: S.optional(UnprocessedTypeConfigurations),
      TypeConfigurations: S.optional(TypeConfigurationDetailsList),
    }).pipe(ns),
).annotate({
  identifier: "BatchDescribeTypeConfigurationsOutput",
}) as any as S.Schema<BatchDescribeTypeConfigurationsOutput>;
export type StackName = string;
export type ClientRequestToken = string;
export interface CancelUpdateStackInput {
  StackName?: string;
  ClientRequestToken?: string;
}
export const CancelUpdateStackInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    ClientRequestToken: S.optional(S.String),
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
  identifier: "CancelUpdateStackInput",
}) as any as S.Schema<CancelUpdateStackInput>;
export interface CancelUpdateStackResponse {}
export const CancelUpdateStackResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CancelUpdateStackResponse",
}) as any as S.Schema<CancelUpdateStackResponse>;
export type StackNameOrId = string;
export type RoleARN = string;
export type ResourceToSkip = string;
export type ResourcesToSkip = string[];
export const ResourcesToSkip = /*@__PURE__*/ S.Array(S.String);
export interface ContinueUpdateRollbackInput {
  StackName?: string;
  RoleARN?: string;
  ResourcesToSkip?: string[];
  ClientRequestToken?: string;
}
export const ContinueUpdateRollbackInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    RoleARN: S.optional(S.String),
    ResourcesToSkip: S.optional(ResourcesToSkip),
    ClientRequestToken: S.optional(S.String),
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
  identifier: "ContinueUpdateRollbackInput",
}) as any as S.Schema<ContinueUpdateRollbackInput>;
export interface ContinueUpdateRollbackOutput {}
export const ContinueUpdateRollbackOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ContinueUpdateRollbackOutput",
}) as any as S.Schema<ContinueUpdateRollbackOutput>;
export type TemplateBody = string;
export type TemplateURL = string;
export type UsePreviousTemplate = boolean;
export type ParameterKey = string;
export type ParameterValue = string;
export type UsePreviousValue = boolean;
export interface Parameter {
  ParameterKey?: string;
  ParameterValue?: string;
  UsePreviousValue?: boolean;
  ResolvedValue?: string;
}
export const Parameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterKey: S.optional(S.String),
    ParameterValue: S.optional(S.String),
    UsePreviousValue: S.optional(S.Boolean),
    ResolvedValue: S.optional(S.String),
  }),
).annotate({ identifier: "Parameter" }) as any as S.Schema<Parameter>;
export type Parameters = Parameter[];
export const Parameters = /*@__PURE__*/ S.Array(Parameter);
export type Capability =
  | "CAPABILITY_IAM"
  | "CAPABILITY_NAMED_IAM"
  | "CAPABILITY_AUTO_EXPAND"
  | (string & {});
export const Capability = /*@__PURE__*/ S.String;

export type Capabilities = Capability[];
export const Capabilities = /*@__PURE__*/ S.Array(Capability);
export type ResourceType = string;
export type ResourceTypes = string[];
export const ResourceTypes = /*@__PURE__*/ S.Array(S.String);
export type Arn = string;
export type Type = string;
export interface RollbackTrigger {
  Arn?: string;
  Type?: string;
}
export const RollbackTrigger = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String), Type: S.optional(S.String) }),
).annotate({
  identifier: "RollbackTrigger",
}) as any as S.Schema<RollbackTrigger>;
export type RollbackTriggers = RollbackTrigger[];
export const RollbackTriggers = /*@__PURE__*/ S.Array(RollbackTrigger);
export type MonitoringTimeInMinutes = number;
export interface RollbackConfiguration {
  RollbackTriggers?: RollbackTrigger[];
  MonitoringTimeInMinutes?: number;
}
export const RollbackConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RollbackTriggers: S.optional(RollbackTriggers),
    MonitoringTimeInMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "RollbackConfiguration",
}) as any as S.Schema<RollbackConfiguration>;
export type NotificationARN = string;
export type NotificationARNs = string[];
export const NotificationARNs = /*@__PURE__*/ S.Array(S.String);
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type Tags = Tag[];
export const Tags = /*@__PURE__*/ S.Array(Tag);
export type ChangeSetName = string;
export type ClientToken = string;
export type Description = string;
export type ChangeSetType = "CREATE" | "UPDATE" | "IMPORT" | (string & {});
export const ChangeSetType = /*@__PURE__*/ S.String;

export type LogicalResourceId = string;
export type ResourceIdentifierPropertyKey = string;
export type ResourceIdentifierPropertyValue = string;
export type ResourceIdentifierProperties = {
  [key: string]: string | undefined;
};
export const ResourceIdentifierProperties = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ResourceToImport {
  ResourceType?: string;
  LogicalResourceId?: string;
  ResourceIdentifier?: { [key: string]: string | undefined };
}
export const ResourceToImport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceType: S.optional(S.String),
    LogicalResourceId: S.optional(S.String),
    ResourceIdentifier: S.optional(ResourceIdentifierProperties),
  }),
).annotate({
  identifier: "ResourceToImport",
}) as any as S.Schema<ResourceToImport>;
export type ResourcesToImport = ResourceToImport[];
export const ResourcesToImport = /*@__PURE__*/ S.Array(ResourceToImport);
export type IncludeNestedStacks = boolean;
export type OnStackFailure =
  | "DO_NOTHING"
  | "ROLLBACK"
  | "DELETE"
  | (string & {});
export const OnStackFailure = /*@__PURE__*/ S.String;

export type ImportExistingResources = boolean;
export type DeploymentMode = "REVERT_DRIFT" | (string & {});
export const DeploymentMode = /*@__PURE__*/ S.String;

export interface CreateChangeSetInput {
  StackName?: string;
  TemplateBody?: string;
  TemplateURL?: string;
  UsePreviousTemplate?: boolean;
  Parameters?: Parameter[];
  Capabilities?: Capability[];
  ResourceTypes?: string[];
  RoleARN?: string;
  RollbackConfiguration?: RollbackConfiguration;
  NotificationARNs?: string[];
  Tags?: Tag[];
  ChangeSetName?: string;
  ClientToken?: string;
  Description?: string;
  ChangeSetType?: ChangeSetType;
  ResourcesToImport?: ResourceToImport[];
  IncludeNestedStacks?: boolean;
  OnStackFailure?: OnStackFailure;
  ImportExistingResources?: boolean;
  DeploymentMode?: DeploymentMode;
}
export const CreateChangeSetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    TemplateBody: S.optional(S.String),
    TemplateURL: S.optional(S.String),
    UsePreviousTemplate: S.optional(S.Boolean),
    Parameters: S.optional(Parameters),
    Capabilities: S.optional(Capabilities),
    ResourceTypes: S.optional(ResourceTypes),
    RoleARN: S.optional(S.String),
    RollbackConfiguration: S.optional(RollbackConfiguration),
    NotificationARNs: S.optional(NotificationARNs),
    Tags: S.optional(Tags),
    ChangeSetName: S.optional(S.String),
    ClientToken: S.optional(S.String),
    Description: S.optional(S.String),
    ChangeSetType: S.optional(ChangeSetType),
    ResourcesToImport: S.optional(ResourcesToImport),
    IncludeNestedStacks: S.optional(S.Boolean),
    OnStackFailure: S.optional(OnStackFailure),
    ImportExistingResources: S.optional(S.Boolean),
    DeploymentMode: S.optional(DeploymentMode),
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
  identifier: "CreateChangeSetInput",
}) as any as S.Schema<CreateChangeSetInput>;
export type ChangeSetId = string;
export type StackId = string;
export interface CreateChangeSetOutput {
  Id?: string;
  StackId?: string;
}
export const CreateChangeSetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String), StackId: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "CreateChangeSetOutput",
}) as any as S.Schema<CreateChangeSetOutput>;
export interface ResourceDefinition {
  ResourceType?: string;
  LogicalResourceId?: string;
  ResourceIdentifier?: { [key: string]: string | undefined };
}
export const ResourceDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceType: S.optional(S.String),
    LogicalResourceId: S.optional(S.String),
    ResourceIdentifier: S.optional(ResourceIdentifierProperties),
  }),
).annotate({
  identifier: "ResourceDefinition",
}) as any as S.Schema<ResourceDefinition>;
export type ResourceDefinitions = ResourceDefinition[];
export const ResourceDefinitions = /*@__PURE__*/ S.Array(ResourceDefinition);
export type GeneratedTemplateName = string;
export type GeneratedTemplateDeletionPolicy =
  | "DELETE"
  | "RETAIN"
  | (string & {});
export const GeneratedTemplateDeletionPolicy = /*@__PURE__*/ S.String;

export type GeneratedTemplateUpdateReplacePolicy =
  | "DELETE"
  | "RETAIN"
  | (string & {});
export const GeneratedTemplateUpdateReplacePolicy = /*@__PURE__*/ S.String;

export interface TemplateConfiguration {
  DeletionPolicy?: GeneratedTemplateDeletionPolicy;
  UpdateReplacePolicy?: GeneratedTemplateUpdateReplacePolicy;
}
export const TemplateConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeletionPolicy: S.optional(GeneratedTemplateDeletionPolicy),
    UpdateReplacePolicy: S.optional(GeneratedTemplateUpdateReplacePolicy),
  }),
).annotate({
  identifier: "TemplateConfiguration",
}) as any as S.Schema<TemplateConfiguration>;
export interface CreateGeneratedTemplateInput {
  Resources?: ResourceDefinition[];
  GeneratedTemplateName?: string;
  StackName?: string;
  TemplateConfiguration?: TemplateConfiguration;
}
export const CreateGeneratedTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Resources: S.optional(ResourceDefinitions),
    GeneratedTemplateName: S.optional(S.String),
    StackName: S.optional(S.String),
    TemplateConfiguration: S.optional(TemplateConfiguration),
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
  identifier: "CreateGeneratedTemplateInput",
}) as any as S.Schema<CreateGeneratedTemplateInput>;
export type GeneratedTemplateId = string;
export interface CreateGeneratedTemplateOutput {
  GeneratedTemplateId?: string;
}
export const CreateGeneratedTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GeneratedTemplateId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateGeneratedTemplateOutput",
}) as any as S.Schema<CreateGeneratedTemplateOutput>;
export type DisableRollback = boolean;
export type TimeoutMinutes = number;
export type OnFailure = "DO_NOTHING" | "ROLLBACK" | "DELETE" | (string & {});
export const OnFailure = /*@__PURE__*/ S.String;

export type StackPolicyBody = string;
export type StackPolicyURL = string;
export type EnableTerminationProtection = boolean;
export type RetainExceptOnCreate = boolean;
export interface CreateStackInput {
  StackName?: string;
  TemplateBody?: string;
  TemplateURL?: string;
  Parameters?: Parameter[];
  DisableRollback?: boolean;
  RollbackConfiguration?: RollbackConfiguration;
  TimeoutInMinutes?: number;
  NotificationARNs?: string[];
  Capabilities?: Capability[];
  ResourceTypes?: string[];
  RoleARN?: string;
  OnFailure?: OnFailure;
  StackPolicyBody?: string;
  StackPolicyURL?: string;
  Tags?: Tag[];
  ClientRequestToken?: string;
  EnableTerminationProtection?: boolean;
  RetainExceptOnCreate?: boolean;
}
export const CreateStackInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    TemplateBody: S.optional(S.String),
    TemplateURL: S.optional(S.String),
    Parameters: S.optional(Parameters),
    DisableRollback: S.optional(S.Boolean),
    RollbackConfiguration: S.optional(RollbackConfiguration),
    TimeoutInMinutes: S.optional(S.Number),
    NotificationARNs: S.optional(NotificationARNs),
    Capabilities: S.optional(Capabilities),
    ResourceTypes: S.optional(ResourceTypes),
    RoleARN: S.optional(S.String),
    OnFailure: S.optional(OnFailure),
    StackPolicyBody: S.optional(S.String),
    StackPolicyURL: S.optional(S.String),
    Tags: S.optional(Tags),
    ClientRequestToken: S.optional(S.String),
    EnableTerminationProtection: S.optional(S.Boolean),
    RetainExceptOnCreate: S.optional(S.Boolean),
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
  identifier: "CreateStackInput",
}) as any as S.Schema<CreateStackInput>;
export type OperationId = string;
export interface CreateStackOutput {
  StackId?: string;
  OperationId?: string;
}
export const CreateStackOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackId: S.optional(S.String),
    OperationId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateStackOutput",
}) as any as S.Schema<CreateStackOutput>;
export type StackSetName = string;
export type Account = string;
export type AccountList = string[];
export const AccountList = /*@__PURE__*/ S.Array(S.String);
export type AccountsUrl = string;
export type OrganizationalUnitId = string;
export type OrganizationalUnitIdList = string[];
export const OrganizationalUnitIdList = /*@__PURE__*/ S.Array(S.String);
export type AccountFilterType =
  | "NONE"
  | "INTERSECTION"
  | "DIFFERENCE"
  | "UNION"
  | (string & {});
export const AccountFilterType = /*@__PURE__*/ S.String;

export interface DeploymentTargets {
  Accounts?: string[];
  AccountsUrl?: string;
  OrganizationalUnitIds?: string[];
  AccountFilterType?: AccountFilterType;
}
export const DeploymentTargets = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Accounts: S.optional(AccountList),
    AccountsUrl: S.optional(S.String),
    OrganizationalUnitIds: S.optional(OrganizationalUnitIdList),
    AccountFilterType: S.optional(AccountFilterType),
  }),
).annotate({
  identifier: "DeploymentTargets",
}) as any as S.Schema<DeploymentTargets>;
export type Region = string;
export type RegionList = string[];
export const RegionList = /*@__PURE__*/ S.Array(S.String);
export type RegionConcurrencyType = "SEQUENTIAL" | "PARALLEL" | (string & {});
export const RegionConcurrencyType = /*@__PURE__*/ S.String;

export type FailureToleranceCount = number;
export type FailureTolerancePercentage = number;
export type MaxConcurrentCount = number;
export type MaxConcurrentPercentage = number;
export type ConcurrencyMode =
  | "STRICT_FAILURE_TOLERANCE"
  | "SOFT_FAILURE_TOLERANCE"
  | (string & {});
export const ConcurrencyMode = /*@__PURE__*/ S.String;

export interface StackSetOperationPreferences {
  RegionConcurrencyType?: RegionConcurrencyType;
  RegionOrder?: string[];
  FailureToleranceCount?: number;
  FailureTolerancePercentage?: number;
  MaxConcurrentCount?: number;
  MaxConcurrentPercentage?: number;
  ConcurrencyMode?: ConcurrencyMode;
}
export const StackSetOperationPreferences = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegionConcurrencyType: S.optional(RegionConcurrencyType),
    RegionOrder: S.optional(RegionList),
    FailureToleranceCount: S.optional(S.Number),
    FailureTolerancePercentage: S.optional(S.Number),
    MaxConcurrentCount: S.optional(S.Number),
    MaxConcurrentPercentage: S.optional(S.Number),
    ConcurrencyMode: S.optional(ConcurrencyMode),
  }),
).annotate({
  identifier: "StackSetOperationPreferences",
}) as any as S.Schema<StackSetOperationPreferences>;
export type CallAs = "SELF" | "DELEGATED_ADMIN" | (string & {});
export const CallAs = /*@__PURE__*/ S.String;

export interface CreateStackInstancesInput {
  StackSetName?: string;
  Accounts?: string[];
  DeploymentTargets?: DeploymentTargets;
  Regions?: string[];
  ParameterOverrides?: Parameter[];
  OperationPreferences?: StackSetOperationPreferences;
  OperationId?: string;
  CallAs?: CallAs;
}
export const CreateStackInstancesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSetName: S.optional(S.String),
    Accounts: S.optional(AccountList),
    DeploymentTargets: S.optional(DeploymentTargets),
    Regions: S.optional(RegionList),
    ParameterOverrides: S.optional(Parameters),
    OperationPreferences: S.optional(StackSetOperationPreferences),
    OperationId: S.optional(S.String).pipe(T.IdempotencyToken()),
    CallAs: S.optional(CallAs),
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
  identifier: "CreateStackInstancesInput",
}) as any as S.Schema<CreateStackInstancesInput>;
export interface CreateStackInstancesOutput {
  OperationId?: string;
}
export const CreateStackInstancesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateStackInstancesOutput",
}) as any as S.Schema<CreateStackInstancesOutput>;
export type EnableStackCreation = boolean;
export interface ResourceLocation {
  StackName?: string;
  LogicalResourceId?: string;
}
export const ResourceLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    LogicalResourceId: S.optional(S.String),
  }),
).annotate({
  identifier: "ResourceLocation",
}) as any as S.Schema<ResourceLocation>;
export interface ResourceMapping {
  Source?: ResourceLocation;
  Destination?: ResourceLocation;
}
export const ResourceMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Source: S.optional(ResourceLocation),
    Destination: S.optional(ResourceLocation),
  }),
).annotate({
  identifier: "ResourceMapping",
}) as any as S.Schema<ResourceMapping>;
export type ResourceMappings = ResourceMapping[];
export const ResourceMappings = /*@__PURE__*/ S.Array(ResourceMapping);
export interface StackDefinition {
  StackName?: string;
  TemplateBody?: string;
  TemplateURL?: string;
}
export const StackDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    TemplateBody: S.optional(S.String),
    TemplateURL: S.optional(S.String),
  }),
).annotate({
  identifier: "StackDefinition",
}) as any as S.Schema<StackDefinition>;
export type StackDefinitions = StackDefinition[];
export const StackDefinitions = /*@__PURE__*/ S.Array(StackDefinition);
export interface CreateStackRefactorInput {
  Description?: string;
  EnableStackCreation?: boolean;
  ResourceMappings?: ResourceMapping[];
  StackDefinitions?: StackDefinition[];
}
export const CreateStackRefactorInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    EnableStackCreation: S.optional(S.Boolean),
    ResourceMappings: S.optional(ResourceMappings),
    StackDefinitions: S.optional(StackDefinitions),
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
  identifier: "CreateStackRefactorInput",
}) as any as S.Schema<CreateStackRefactorInput>;
export type StackRefactorId = string;
export interface CreateStackRefactorOutput {
  StackRefactorId: string;
}
export const CreateStackRefactorOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StackRefactorId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateStackRefactorOutput",
}) as any as S.Schema<CreateStackRefactorOutput>;
export type ExecutionRoleName = string;
export type PermissionModels =
  | "SERVICE_MANAGED"
  | "SELF_MANAGED"
  | (string & {});
export const PermissionModels = /*@__PURE__*/ S.String;

export type AutoDeploymentNullable = boolean;
export type RetainStacksOnAccountRemovalNullable = boolean;
export type StackSetARN = string;
export type StackSetARNList = string[];
export const StackSetARNList = /*@__PURE__*/ S.Array(S.String);
export interface AutoDeployment {
  Enabled?: boolean;
  RetainStacksOnAccountRemoval?: boolean;
  DependsOn?: string[];
}
export const AutoDeployment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    RetainStacksOnAccountRemoval: S.optional(S.Boolean),
    DependsOn: S.optional(StackSetARNList),
  }),
).annotate({ identifier: "AutoDeployment" }) as any as S.Schema<AutoDeployment>;
export type ManagedExecutionNullable = boolean;
export interface ManagedExecution {
  Active?: boolean;
}
export const ManagedExecution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Active: S.optional(S.Boolean) }),
).annotate({
  identifier: "ManagedExecution",
}) as any as S.Schema<ManagedExecution>;
export interface CreateStackSetInput {
  StackSetName?: string;
  Description?: string;
  TemplateBody?: string;
  TemplateURL?: string;
  StackId?: string;
  Parameters?: Parameter[];
  Capabilities?: Capability[];
  Tags?: Tag[];
  AdministrationRoleARN?: string;
  ExecutionRoleName?: string;
  PermissionModel?: PermissionModels;
  AutoDeployment?: AutoDeployment;
  CallAs?: CallAs;
  ClientRequestToken?: string;
  ManagedExecution?: ManagedExecution;
}
export const CreateStackSetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSetName: S.optional(S.String),
    Description: S.optional(S.String),
    TemplateBody: S.optional(S.String),
    TemplateURL: S.optional(S.String),
    StackId: S.optional(S.String),
    Parameters: S.optional(Parameters),
    Capabilities: S.optional(Capabilities),
    Tags: S.optional(Tags),
    AdministrationRoleARN: S.optional(S.String),
    ExecutionRoleName: S.optional(S.String),
    PermissionModel: S.optional(PermissionModels),
    AutoDeployment: S.optional(AutoDeployment),
    CallAs: S.optional(CallAs),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    ManagedExecution: S.optional(ManagedExecution),
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
  identifier: "CreateStackSetInput",
}) as any as S.Schema<CreateStackSetInput>;
export type StackSetId = string;
export interface CreateStackSetOutput {
  StackSetId?: string;
}
export const CreateStackSetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StackSetId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateStackSetOutput",
}) as any as S.Schema<CreateStackSetOutput>;
export interface DeactivateOrganizationsAccessInput {}
export const DeactivateOrganizationsAccessInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "DeactivateOrganizationsAccessInput",
}) as any as S.Schema<DeactivateOrganizationsAccessInput>;
export interface DeactivateOrganizationsAccessOutput {}
export const DeactivateOrganizationsAccessOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeactivateOrganizationsAccessOutput",
}) as any as S.Schema<DeactivateOrganizationsAccessOutput>;
export interface DeactivateTypeInput {
  TypeName?: string;
  Type?: ThirdPartyType;
  Arn?: string;
}
export const DeactivateTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TypeName: S.optional(S.String),
    Type: S.optional(ThirdPartyType),
    Arn: S.optional(S.String),
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
  identifier: "DeactivateTypeInput",
}) as any as S.Schema<DeactivateTypeInput>;
export interface DeactivateTypeOutput {}
export const DeactivateTypeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeactivateTypeOutput",
}) as any as S.Schema<DeactivateTypeOutput>;
export type ChangeSetNameOrId = string;
export interface DeleteChangeSetInput {
  ChangeSetName?: string;
  StackName?: string;
}
export const DeleteChangeSetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChangeSetName: S.optional(S.String),
    StackName: S.optional(S.String),
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
  identifier: "DeleteChangeSetInput",
}) as any as S.Schema<DeleteChangeSetInput>;
export interface DeleteChangeSetOutput {}
export const DeleteChangeSetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteChangeSetOutput",
}) as any as S.Schema<DeleteChangeSetOutput>;
export interface DeleteGeneratedTemplateInput {
  GeneratedTemplateName?: string;
}
export const DeleteGeneratedTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GeneratedTemplateName: S.optional(S.String) }).pipe(
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
  identifier: "DeleteGeneratedTemplateInput",
}) as any as S.Schema<DeleteGeneratedTemplateInput>;
export interface DeleteGeneratedTemplateResponse {}
export const DeleteGeneratedTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteGeneratedTemplateResponse",
}) as any as S.Schema<DeleteGeneratedTemplateResponse>;
export type RetainResources = string[];
export const RetainResources = /*@__PURE__*/ S.Array(S.String);
export type DeletionMode = "STANDARD" | "FORCE_DELETE_STACK" | (string & {});
export const DeletionMode = /*@__PURE__*/ S.String;

export interface DeleteStackInput {
  StackName?: string;
  RetainResources?: string[];
  RoleARN?: string;
  ClientRequestToken?: string;
  DeletionMode?: DeletionMode;
}
export const DeleteStackInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    RetainResources: S.optional(RetainResources),
    RoleARN: S.optional(S.String),
    ClientRequestToken: S.optional(S.String),
    DeletionMode: S.optional(DeletionMode),
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
  identifier: "DeleteStackInput",
}) as any as S.Schema<DeleteStackInput>;
export interface DeleteStackResponse {}
export const DeleteStackResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteStackResponse",
}) as any as S.Schema<DeleteStackResponse>;
export type RetainStacks = boolean;
export interface DeleteStackInstancesInput {
  StackSetName?: string;
  Accounts?: string[];
  DeploymentTargets?: DeploymentTargets;
  Regions?: string[];
  OperationPreferences?: StackSetOperationPreferences;
  RetainStacks?: boolean;
  OperationId?: string;
  CallAs?: CallAs;
}
export const DeleteStackInstancesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSetName: S.optional(S.String),
    Accounts: S.optional(AccountList),
    DeploymentTargets: S.optional(DeploymentTargets),
    Regions: S.optional(RegionList),
    OperationPreferences: S.optional(StackSetOperationPreferences),
    RetainStacks: S.optional(S.Boolean),
    OperationId: S.optional(S.String).pipe(T.IdempotencyToken()),
    CallAs: S.optional(CallAs),
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
  identifier: "DeleteStackInstancesInput",
}) as any as S.Schema<DeleteStackInstancesInput>;
export interface DeleteStackInstancesOutput {
  OperationId?: string;
}
export const DeleteStackInstancesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteStackInstancesOutput",
}) as any as S.Schema<DeleteStackInstancesOutput>;
export interface DeleteStackSetInput {
  StackSetName?: string;
  CallAs?: CallAs;
}
export const DeleteStackSetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSetName: S.optional(S.String),
    CallAs: S.optional(CallAs),
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
  identifier: "DeleteStackSetInput",
}) as any as S.Schema<DeleteStackSetInput>;
export interface DeleteStackSetOutput {}
export const DeleteStackSetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteStackSetOutput",
}) as any as S.Schema<DeleteStackSetOutput>;
export type RegistryType = "RESOURCE" | "MODULE" | "HOOK" | (string & {});
export const RegistryType = /*@__PURE__*/ S.String;

export type TypeVersionId = string;
export interface DeregisterTypeInput {
  Arn?: string;
  Type?: RegistryType;
  TypeName?: string;
  VersionId?: string;
}
export const DeregisterTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Type: S.optional(RegistryType),
    TypeName: S.optional(S.String),
    VersionId: S.optional(S.String),
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
  identifier: "DeregisterTypeInput",
}) as any as S.Schema<DeregisterTypeInput>;
export interface DeregisterTypeOutput {}
export const DeregisterTypeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeregisterTypeOutput",
}) as any as S.Schema<DeregisterTypeOutput>;
export type NextToken = string;
export interface DescribeAccountLimitsInput {
  NextToken?: string;
}
export const DescribeAccountLimitsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String) }).pipe(
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
  identifier: "DescribeAccountLimitsInput",
}) as any as S.Schema<DescribeAccountLimitsInput>;
export type LimitName = string;
export type LimitValue = number;
export interface AccountLimit {
  Name?: string;
  Value?: number;
}
export const AccountLimit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Value: S.optional(S.Number) }),
).annotate({ identifier: "AccountLimit" }) as any as S.Schema<AccountLimit>;
export type AccountLimitList = AccountLimit[];
export const AccountLimitList = /*@__PURE__*/ S.Array(AccountLimit);
export interface DescribeAccountLimitsOutput {
  AccountLimits?: AccountLimit[];
  NextToken?: string;
}
export const DescribeAccountLimitsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountLimits: S.optional(AccountLimitList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeAccountLimitsOutput",
}) as any as S.Schema<DescribeAccountLimitsOutput>;
export type IncludePropertyValues = boolean;
export interface DescribeChangeSetInput {
  ChangeSetName?: string;
  StackName?: string;
  NextToken?: string;
  IncludePropertyValues?: boolean;
}
export const DescribeChangeSetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChangeSetName: S.optional(S.String),
    StackName: S.optional(S.String),
    NextToken: S.optional(S.String),
    IncludePropertyValues: S.optional(S.Boolean),
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
  identifier: "DescribeChangeSetInput",
}) as any as S.Schema<DescribeChangeSetInput>;
export type CreationTime = Date;
export type ExecutionStatus =
  | "UNAVAILABLE"
  | "AVAILABLE"
  | "EXECUTE_IN_PROGRESS"
  | "EXECUTE_COMPLETE"
  | "EXECUTE_FAILED"
  | "OBSOLETE"
  | (string & {});
export const ExecutionStatus = /*@__PURE__*/ S.String;

export type ChangeSetStatus =
  | "CREATE_PENDING"
  | "CREATE_IN_PROGRESS"
  | "CREATE_COMPLETE"
  | "DELETE_PENDING"
  | "DELETE_IN_PROGRESS"
  | "DELETE_COMPLETE"
  | "DELETE_FAILED"
  | "FAILED"
  | (string & {});
export const ChangeSetStatus = /*@__PURE__*/ S.String;

export type ChangeSetStatusReason = string;
export type StackDriftStatus =
  | "DRIFTED"
  | "IN_SYNC"
  | "UNKNOWN"
  | "NOT_CHECKED"
  | (string & {});
export const StackDriftStatus = /*@__PURE__*/ S.String;

export type ChangeType = "Resource" | (string & {});
export const ChangeType = /*@__PURE__*/ S.String;

export type HookInvocationCount = number;
export type PolicyAction =
  | "Delete"
  | "Retain"
  | "Snapshot"
  | "ReplaceAndDelete"
  | "ReplaceAndRetain"
  | "ReplaceAndSnapshot"
  | (string & {});
export const PolicyAction = /*@__PURE__*/ S.String;

export type ChangeAction =
  | "Add"
  | "Modify"
  | "Remove"
  | "Import"
  | "Dynamic"
  | "SyncWithActual"
  | (string & {});
export const ChangeAction = /*@__PURE__*/ S.String;

export type PhysicalResourceId = string;
export type Replacement = "True" | "False" | "Conditional" | (string & {});
export const Replacement = /*@__PURE__*/ S.String;

export type ResourceAttribute =
  | "Properties"
  | "Metadata"
  | "CreationPolicy"
  | "UpdatePolicy"
  | "DeletionPolicy"
  | "UpdateReplacePolicy"
  | "Tags"
  | (string & {});
export const ResourceAttribute = /*@__PURE__*/ S.String;

export type Scope = ResourceAttribute[];
export const Scope = /*@__PURE__*/ S.Array(ResourceAttribute);
export type StackResourceDriftStatus =
  | "IN_SYNC"
  | "MODIFIED"
  | "DELETED"
  | "NOT_CHECKED"
  | "UNKNOWN"
  | "UNSUPPORTED"
  | (string & {});
export const StackResourceDriftStatus = /*@__PURE__*/ S.String;

export type ResourcePropertyPath = string;
export type DriftIgnoredReason =
  | "MANAGED_BY_AWS"
  | "WRITE_ONLY_PROPERTY"
  | (string & {});
export const DriftIgnoredReason = /*@__PURE__*/ S.String;

export interface ResourceDriftIgnoredAttribute {
  Path?: string;
  Reason?: DriftIgnoredReason;
}
export const ResourceDriftIgnoredAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Path: S.optional(S.String),
    Reason: S.optional(DriftIgnoredReason),
  }),
).annotate({
  identifier: "ResourceDriftIgnoredAttribute",
}) as any as S.Schema<ResourceDriftIgnoredAttribute>;
export type ResourceDriftIgnoredAttributes = ResourceDriftIgnoredAttribute[];
export const ResourceDriftIgnoredAttributes = /*@__PURE__*/ S.Array(
  ResourceDriftIgnoredAttribute,
);
export type PropertyName = string;
export type RequiresRecreation =
  | "Never"
  | "Conditionally"
  | "Always"
  | (string & {});
export const RequiresRecreation = /*@__PURE__*/ S.String;

export type BeforeValue = string;
export type AfterValue = string;
export type BeforeValueFrom =
  | "PREVIOUS_DEPLOYMENT_STATE"
  | "ACTUAL_STATE"
  | (string & {});
export const BeforeValueFrom = /*@__PURE__*/ S.String;

export type AfterValueFrom = "TEMPLATE" | (string & {});
export const AfterValueFrom = /*@__PURE__*/ S.String;

export type ResourceDriftPreviousValue = string;
export type ResourceDriftActualValue = string;
export interface LiveResourceDrift {
  PreviousValue?: string;
  ActualValue?: string;
  DriftDetectionTimestamp?: Date;
}
export const LiveResourceDrift = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PreviousValue: S.optional(S.String),
    ActualValue: S.optional(S.String),
    DriftDetectionTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "LiveResourceDrift",
}) as any as S.Schema<LiveResourceDrift>;
export type AttributeChangeType =
  | "Add"
  | "Remove"
  | "Modify"
  | "SyncWithActual"
  | (string & {});
export const AttributeChangeType = /*@__PURE__*/ S.String;

export interface ResourceTargetDefinition {
  Attribute?: ResourceAttribute;
  Name?: string;
  RequiresRecreation?: RequiresRecreation;
  Path?: string;
  BeforeValue?: string;
  AfterValue?: string;
  BeforeValueFrom?: BeforeValueFrom;
  AfterValueFrom?: AfterValueFrom;
  Drift?: LiveResourceDrift;
  AttributeChangeType?: AttributeChangeType;
}
export const ResourceTargetDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attribute: S.optional(ResourceAttribute),
    Name: S.optional(S.String),
    RequiresRecreation: S.optional(RequiresRecreation),
    Path: S.optional(S.String),
    BeforeValue: S.optional(S.String),
    AfterValue: S.optional(S.String),
    BeforeValueFrom: S.optional(BeforeValueFrom),
    AfterValueFrom: S.optional(AfterValueFrom),
    Drift: S.optional(LiveResourceDrift),
    AttributeChangeType: S.optional(AttributeChangeType),
  }),
).annotate({
  identifier: "ResourceTargetDefinition",
}) as any as S.Schema<ResourceTargetDefinition>;
export type EvaluationType = "Static" | "Dynamic" | (string & {});
export const EvaluationType = /*@__PURE__*/ S.String;

export type ChangeSource =
  | "ResourceReference"
  | "ParameterReference"
  | "ResourceAttribute"
  | "DirectModification"
  | "Automatic"
  | "NoModification"
  | (string & {});
export const ChangeSource = /*@__PURE__*/ S.String;

export type CausingEntity = string;
export interface ResourceChangeDetail {
  Target?: ResourceTargetDefinition;
  Evaluation?: EvaluationType;
  ChangeSource?: ChangeSource;
  CausingEntity?: string;
}
export const ResourceChangeDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Target: S.optional(ResourceTargetDefinition),
    Evaluation: S.optional(EvaluationType),
    ChangeSource: S.optional(ChangeSource),
    CausingEntity: S.optional(S.String),
  }),
).annotate({
  identifier: "ResourceChangeDetail",
}) as any as S.Schema<ResourceChangeDetail>;
export type ResourceChangeDetails = ResourceChangeDetail[];
export const ResourceChangeDetails =
  /*@__PURE__*/ S.Array(ResourceChangeDetail);
export type TypeHierarchy = string;
export type LogicalIdHierarchy = string;
export interface ModuleInfo {
  TypeHierarchy?: string;
  LogicalIdHierarchy?: string;
}
export const ModuleInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TypeHierarchy: S.optional(S.String),
    LogicalIdHierarchy: S.optional(S.String),
  }),
).annotate({ identifier: "ModuleInfo" }) as any as S.Schema<ModuleInfo>;
export type BeforeContext = string;
export type AfterContext = string;
export type PreviousDeploymentContext = string;
export interface ResourceChange {
  PolicyAction?: PolicyAction;
  Action?: ChangeAction;
  LogicalResourceId?: string;
  PhysicalResourceId?: string;
  ResourceType?: string;
  Replacement?: Replacement;
  Scope?: ResourceAttribute[];
  ResourceDriftStatus?: StackResourceDriftStatus;
  ResourceDriftIgnoredAttributes?: ResourceDriftIgnoredAttribute[];
  Details?: ResourceChangeDetail[];
  ChangeSetId?: string;
  ModuleInfo?: ModuleInfo;
  BeforeContext?: string;
  AfterContext?: string;
  PreviousDeploymentContext?: string;
}
export const ResourceChange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyAction: S.optional(PolicyAction),
    Action: S.optional(ChangeAction),
    LogicalResourceId: S.optional(S.String),
    PhysicalResourceId: S.optional(S.String),
    ResourceType: S.optional(S.String),
    Replacement: S.optional(Replacement),
    Scope: S.optional(Scope),
    ResourceDriftStatus: S.optional(StackResourceDriftStatus),
    ResourceDriftIgnoredAttributes: S.optional(ResourceDriftIgnoredAttributes),
    Details: S.optional(ResourceChangeDetails),
    ChangeSetId: S.optional(S.String),
    ModuleInfo: S.optional(ModuleInfo),
    BeforeContext: S.optional(S.String),
    AfterContext: S.optional(S.String),
    PreviousDeploymentContext: S.optional(S.String),
  }),
).annotate({ identifier: "ResourceChange" }) as any as S.Schema<ResourceChange>;
export interface Change {
  Type?: ChangeType;
  HookInvocationCount?: number;
  ResourceChange?: ResourceChange;
}
export const Change = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(ChangeType),
    HookInvocationCount: S.optional(S.Number),
    ResourceChange: S.optional(ResourceChange),
  }),
).annotate({ identifier: "Change" }) as any as S.Schema<Change>;
export type Changes = Change[];
export const Changes = /*@__PURE__*/ S.Array(Change);
export interface DescribeChangeSetOutput {
  ChangeSetName?: string;
  ChangeSetId?: string;
  StackId?: string;
  StackName?: string;
  Description?: string;
  Parameters?: Parameter[];
  CreationTime?: Date;
  ExecutionStatus?: ExecutionStatus;
  Status?: ChangeSetStatus;
  StatusReason?: string;
  StackDriftStatus?: StackDriftStatus;
  NotificationARNs?: string[];
  RollbackConfiguration?: RollbackConfiguration & {
    RollbackTriggers: (RollbackTrigger & { Arn: Arn; Type: Type })[];
  };
  Capabilities?: Capability[];
  Tags?: (Tag & { Key: TagKey; Value: TagValue })[];
  Changes?: Change[];
  NextToken?: string;
  IncludeNestedStacks?: boolean;
  ParentChangeSetId?: string;
  RootChangeSetId?: string;
  OnStackFailure?: OnStackFailure;
  ImportExistingResources?: boolean;
  DeploymentMode?: DeploymentMode;
}
export const DescribeChangeSetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChangeSetName: S.optional(S.String),
    ChangeSetId: S.optional(S.String),
    StackId: S.optional(S.String),
    StackName: S.optional(S.String),
    Description: S.optional(S.String),
    Parameters: S.optional(Parameters),
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ExecutionStatus: S.optional(ExecutionStatus),
    Status: S.optional(ChangeSetStatus),
    StatusReason: S.optional(S.String),
    StackDriftStatus: S.optional(StackDriftStatus),
    NotificationARNs: S.optional(NotificationARNs),
    RollbackConfiguration: S.optional(RollbackConfiguration),
    Capabilities: S.optional(Capabilities),
    Tags: S.optional(Tags),
    Changes: S.optional(Changes),
    NextToken: S.optional(S.String),
    IncludeNestedStacks: S.optional(S.Boolean),
    ParentChangeSetId: S.optional(S.String),
    RootChangeSetId: S.optional(S.String),
    OnStackFailure: S.optional(OnStackFailure),
    ImportExistingResources: S.optional(S.Boolean),
    DeploymentMode: S.optional(DeploymentMode),
  }).pipe(ns),
).annotate({
  identifier: "DescribeChangeSetOutput",
}) as any as S.Schema<DescribeChangeSetOutput>;
export interface DescribeChangeSetHooksInput {
  ChangeSetName?: string;
  StackName?: string;
  NextToken?: string;
  LogicalResourceId?: string;
}
export const DescribeChangeSetHooksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChangeSetName: S.optional(S.String),
    StackName: S.optional(S.String),
    NextToken: S.optional(S.String),
    LogicalResourceId: S.optional(S.String),
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
  identifier: "DescribeChangeSetHooksInput",
}) as any as S.Schema<DescribeChangeSetHooksInput>;
export type HookInvocationPoint = "PRE_PROVISION" | (string & {});
export const HookInvocationPoint = /*@__PURE__*/ S.String;

export type HookFailureMode = "FAIL" | "WARN" | (string & {});
export const HookFailureMode = /*@__PURE__*/ S.String;

export type HookTypeName = string;
export type HookTypeVersionId = string;
export type HookTypeConfigurationVersionId = string;
export type HookTargetType = "RESOURCE" | (string & {});
export const HookTargetType = /*@__PURE__*/ S.String;

export type HookTargetTypeName = string;
export interface ChangeSetHookResourceTargetDetails {
  LogicalResourceId?: string;
  ResourceType?: string;
  ResourceAction?: ChangeAction;
}
export const ChangeSetHookResourceTargetDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogicalResourceId: S.optional(S.String),
    ResourceType: S.optional(S.String),
    ResourceAction: S.optional(ChangeAction),
  }),
).annotate({
  identifier: "ChangeSetHookResourceTargetDetails",
}) as any as S.Schema<ChangeSetHookResourceTargetDetails>;
export interface ChangeSetHookTargetDetails {
  TargetType?: HookTargetType;
  ResourceTargetDetails?: ChangeSetHookResourceTargetDetails;
}
export const ChangeSetHookTargetDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetType: S.optional(HookTargetType),
    ResourceTargetDetails: S.optional(ChangeSetHookResourceTargetDetails),
  }),
).annotate({
  identifier: "ChangeSetHookTargetDetails",
}) as any as S.Schema<ChangeSetHookTargetDetails>;
export interface ChangeSetHook {
  InvocationPoint?: HookInvocationPoint;
  FailureMode?: HookFailureMode;
  TypeName?: string;
  TypeVersionId?: string;
  TypeConfigurationVersionId?: string;
  TargetDetails?: ChangeSetHookTargetDetails;
}
export const ChangeSetHook = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InvocationPoint: S.optional(HookInvocationPoint),
    FailureMode: S.optional(HookFailureMode),
    TypeName: S.optional(S.String),
    TypeVersionId: S.optional(S.String),
    TypeConfigurationVersionId: S.optional(S.String),
    TargetDetails: S.optional(ChangeSetHookTargetDetails),
  }),
).annotate({ identifier: "ChangeSetHook" }) as any as S.Schema<ChangeSetHook>;
export type ChangeSetHooks = ChangeSetHook[];
export const ChangeSetHooks = /*@__PURE__*/ S.Array(ChangeSetHook);
export type ChangeSetHooksStatus =
  | "PLANNING"
  | "PLANNED"
  | "UNAVAILABLE"
  | (string & {});
export const ChangeSetHooksStatus = /*@__PURE__*/ S.String;

export interface DescribeChangeSetHooksOutput {
  ChangeSetId?: string;
  ChangeSetName?: string;
  Hooks?: ChangeSetHook[];
  Status?: ChangeSetHooksStatus;
  NextToken?: string;
  StackId?: string;
  StackName?: string;
}
export const DescribeChangeSetHooksOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChangeSetId: S.optional(S.String),
    ChangeSetName: S.optional(S.String),
    Hooks: S.optional(ChangeSetHooks),
    Status: S.optional(ChangeSetHooksStatus),
    NextToken: S.optional(S.String),
    StackId: S.optional(S.String),
    StackName: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeChangeSetHooksOutput",
}) as any as S.Schema<DescribeChangeSetHooksOutput>;
export type FailedEventsFilter = boolean;
export interface EventFilter {
  FailedEvents?: boolean;
}
export const EventFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FailedEvents: S.optional(S.Boolean) }),
).annotate({ identifier: "EventFilter" }) as any as S.Schema<EventFilter>;
export interface DescribeEventsInput {
  StackName?: string;
  ChangeSetName?: string;
  OperationId?: string;
  Filters?: EventFilter;
  NextToken?: string;
}
export const DescribeEventsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    ChangeSetName: S.optional(S.String),
    OperationId: S.optional(S.String),
    Filters: S.optional(EventFilter),
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
  identifier: "DescribeEventsInput",
}) as any as S.Schema<DescribeEventsInput>;
export type EventId = string;
export type OperationType =
  | "CREATE_STACK"
  | "UPDATE_STACK"
  | "DELETE_STACK"
  | "CONTINUE_ROLLBACK"
  | "ROLLBACK"
  | "CREATE_CHANGESET"
  | (string & {});
export const OperationType = /*@__PURE__*/ S.String;

export type BeaconStackOperationStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export const BeaconStackOperationStatus = /*@__PURE__*/ S.String;

export type EventType =
  | "STACK_EVENT"
  | "PROGRESS_EVENT"
  | "VALIDATION_ERROR"
  | "PROVISIONING_ERROR"
  | "HOOK_INVOCATION_ERROR"
  | (string & {});
export const EventType = /*@__PURE__*/ S.String;

export type ResourceStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "CREATE_COMPLETE"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | "DELETE_COMPLETE"
  | "DELETE_SKIPPED"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_FAILED"
  | "UPDATE_COMPLETE"
  | "IMPORT_FAILED"
  | "IMPORT_COMPLETE"
  | "IMPORT_IN_PROGRESS"
  | "IMPORT_ROLLBACK_IN_PROGRESS"
  | "IMPORT_ROLLBACK_FAILED"
  | "IMPORT_ROLLBACK_COMPLETE"
  | "EXPORT_FAILED"
  | "EXPORT_COMPLETE"
  | "EXPORT_IN_PROGRESS"
  | "EXPORT_ROLLBACK_IN_PROGRESS"
  | "EXPORT_ROLLBACK_FAILED"
  | "EXPORT_ROLLBACK_COMPLETE"
  | "UPDATE_ROLLBACK_IN_PROGRESS"
  | "UPDATE_ROLLBACK_COMPLETE"
  | "UPDATE_ROLLBACK_FAILED"
  | "ROLLBACK_IN_PROGRESS"
  | "ROLLBACK_COMPLETE"
  | "ROLLBACK_FAILED"
  | (string & {});
export const ResourceStatus = /*@__PURE__*/ S.String;

export type ResourceStatusReason = string;
export type ResourceProperties = string;
export type HookType = string;
export type HookStatus =
  | "HOOK_IN_PROGRESS"
  | "HOOK_COMPLETE_SUCCEEDED"
  | "HOOK_COMPLETE_FAILED"
  | "HOOK_FAILED"
  | (string & {});
export const HookStatus = /*@__PURE__*/ S.String;

export type HookStatusReason = string;
export type DetailedStatus =
  | "CONFIGURATION_COMPLETE"
  | "VALIDATION_FAILED"
  | (string & {});
export const DetailedStatus = /*@__PURE__*/ S.String;

export type ValidationName = string;
export type ValidationStatus = "FAILED" | "SKIPPED" | (string & {});
export const ValidationStatus = /*@__PURE__*/ S.String;

export type ValidationStatusReason = string;
export type ValidationPath = string;
export interface OperationEvent {
  EventId?: string;
  StackId?: string;
  OperationId?: string;
  OperationType?: OperationType;
  OperationStatus?: BeaconStackOperationStatus;
  EventType?: EventType;
  LogicalResourceId?: string;
  PhysicalResourceId?: string;
  ResourceType?: string;
  Timestamp?: Date;
  StartTime?: Date;
  EndTime?: Date;
  ResourceStatus?: ResourceStatus;
  ResourceStatusReason?: string;
  ResourceProperties?: string;
  ClientRequestToken?: string;
  HookType?: string;
  HookStatus?: HookStatus;
  HookStatusReason?: string;
  HookInvocationPoint?: HookInvocationPoint;
  HookFailureMode?: HookFailureMode;
  DetailedStatus?: DetailedStatus;
  ValidationFailureMode?: HookFailureMode;
  ValidationName?: string;
  ValidationStatus?: ValidationStatus;
  ValidationStatusReason?: string;
  ValidationPath?: string;
}
export const OperationEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventId: S.optional(S.String),
    StackId: S.optional(S.String),
    OperationId: S.optional(S.String),
    OperationType: S.optional(OperationType),
    OperationStatus: S.optional(BeaconStackOperationStatus),
    EventType: S.optional(EventType),
    LogicalResourceId: S.optional(S.String),
    PhysicalResourceId: S.optional(S.String),
    ResourceType: S.optional(S.String),
    Timestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    ResourceStatus: S.optional(ResourceStatus),
    ResourceStatusReason: S.optional(S.String),
    ResourceProperties: S.optional(S.String),
    ClientRequestToken: S.optional(S.String),
    HookType: S.optional(S.String),
    HookStatus: S.optional(HookStatus),
    HookStatusReason: S.optional(S.String),
    HookInvocationPoint: S.optional(HookInvocationPoint),
    HookFailureMode: S.optional(HookFailureMode),
    DetailedStatus: S.optional(DetailedStatus),
    ValidationFailureMode: S.optional(HookFailureMode),
    ValidationName: S.optional(S.String),
    ValidationStatus: S.optional(ValidationStatus),
    ValidationStatusReason: S.optional(S.String),
    ValidationPath: S.optional(S.String),
  }),
).annotate({ identifier: "OperationEvent" }) as any as S.Schema<OperationEvent>;
export type OperationEvents = OperationEvent[];
export const OperationEvents = /*@__PURE__*/ S.Array(OperationEvent);
export interface DescribeEventsOutput {
  OperationEvents?: OperationEvent[];
  NextToken?: string;
}
export const DescribeEventsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OperationEvents: S.optional(OperationEvents),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeEventsOutput",
}) as any as S.Schema<DescribeEventsOutput>;
export interface DescribeGeneratedTemplateInput {
  GeneratedTemplateName?: string;
}
export const DescribeGeneratedTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GeneratedTemplateName: S.optional(S.String) }).pipe(
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
  identifier: "DescribeGeneratedTemplateInput",
}) as any as S.Schema<DescribeGeneratedTemplateInput>;
export type GeneratedTemplateResourceStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETE"
  | (string & {});
export const GeneratedTemplateResourceStatus = /*@__PURE__*/ S.String;

export type WarningType =
  | "MUTUALLY_EXCLUSIVE_PROPERTIES"
  | "UNSUPPORTED_PROPERTIES"
  | "MUTUALLY_EXCLUSIVE_TYPES"
  | "EXCLUDED_PROPERTIES"
  | "EXCLUDED_RESOURCES"
  | (string & {});
export const WarningType = /*@__PURE__*/ S.String;

export type PropertyPath = string;
export type RequiredProperty = boolean;
export type PropertyDescription = string;
export interface WarningProperty {
  PropertyPath?: string;
  Required?: boolean;
  Description?: string;
}
export const WarningProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PropertyPath: S.optional(S.String),
    Required: S.optional(S.Boolean),
    Description: S.optional(S.String),
  }),
).annotate({
  identifier: "WarningProperty",
}) as any as S.Schema<WarningProperty>;
export type WarningProperties = WarningProperty[];
export const WarningProperties = /*@__PURE__*/ S.Array(WarningProperty);
export interface WarningDetail {
  Type?: WarningType;
  Properties?: WarningProperty[];
}
export const WarningDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(WarningType),
    Properties: S.optional(WarningProperties),
  }),
).annotate({ identifier: "WarningDetail" }) as any as S.Schema<WarningDetail>;
export type WarningDetails = WarningDetail[];
export const WarningDetails = /*@__PURE__*/ S.Array(WarningDetail);
export interface ResourceDetail {
  ResourceType?: string;
  LogicalResourceId?: string;
  ResourceIdentifier?: { [key: string]: string | undefined };
  ResourceStatus?: GeneratedTemplateResourceStatus;
  ResourceStatusReason?: string;
  Warnings?: WarningDetail[];
}
export const ResourceDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceType: S.optional(S.String),
    LogicalResourceId: S.optional(S.String),
    ResourceIdentifier: S.optional(ResourceIdentifierProperties),
    ResourceStatus: S.optional(GeneratedTemplateResourceStatus),
    ResourceStatusReason: S.optional(S.String),
    Warnings: S.optional(WarningDetails),
  }),
).annotate({ identifier: "ResourceDetail" }) as any as S.Schema<ResourceDetail>;
export type ResourceDetails = ResourceDetail[];
export const ResourceDetails = /*@__PURE__*/ S.Array(ResourceDetail);
export type GeneratedTemplateStatus =
  | "CREATE_PENDING"
  | "UPDATE_PENDING"
  | "DELETE_PENDING"
  | "CREATE_IN_PROGRESS"
  | "UPDATE_IN_PROGRESS"
  | "DELETE_IN_PROGRESS"
  | "FAILED"
  | "COMPLETE"
  | (string & {});
export const GeneratedTemplateStatus = /*@__PURE__*/ S.String;

export type TemplateStatusReason = string;
export type LastUpdatedTime = Date;
export type ResourcesSucceeded = number;
export type ResourcesFailed = number;
export type ResourcesProcessing = number;
export type ResourcesPending = number;
export interface TemplateProgress {
  ResourcesSucceeded?: number;
  ResourcesFailed?: number;
  ResourcesProcessing?: number;
  ResourcesPending?: number;
}
export const TemplateProgress = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourcesSucceeded: S.optional(S.Number),
    ResourcesFailed: S.optional(S.Number),
    ResourcesProcessing: S.optional(S.Number),
    ResourcesPending: S.optional(S.Number),
  }),
).annotate({
  identifier: "TemplateProgress",
}) as any as S.Schema<TemplateProgress>;
export type TotalWarnings = number;
export interface DescribeGeneratedTemplateOutput {
  GeneratedTemplateId?: string;
  GeneratedTemplateName?: string;
  Resources?: ResourceDetail[];
  Status?: GeneratedTemplateStatus;
  StatusReason?: string;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
  Progress?: TemplateProgress;
  StackId?: string;
  TemplateConfiguration?: TemplateConfiguration;
  TotalWarnings?: number;
}
export const DescribeGeneratedTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GeneratedTemplateId: S.optional(S.String),
    GeneratedTemplateName: S.optional(S.String),
    Resources: S.optional(ResourceDetails),
    Status: S.optional(GeneratedTemplateStatus),
    StatusReason: S.optional(S.String),
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastUpdatedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Progress: S.optional(TemplateProgress),
    StackId: S.optional(S.String),
    TemplateConfiguration: S.optional(TemplateConfiguration),
    TotalWarnings: S.optional(S.Number),
  }).pipe(ns),
).annotate({
  identifier: "DescribeGeneratedTemplateOutput",
}) as any as S.Schema<DescribeGeneratedTemplateOutput>;
export interface DescribeOrganizationsAccessInput {
  CallAs?: CallAs;
}
export const DescribeOrganizationsAccessInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CallAs: S.optional(CallAs) }).pipe(
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
  identifier: "DescribeOrganizationsAccessInput",
}) as any as S.Schema<DescribeOrganizationsAccessInput>;
export type OrganizationStatus =
  | "ENABLED"
  | "DISABLED"
  | "DISABLED_PERMANENTLY"
  | (string & {});
export const OrganizationStatus = /*@__PURE__*/ S.String;

export interface DescribeOrganizationsAccessOutput {
  Status?: OrganizationStatus;
}
export const DescribeOrganizationsAccessOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(OrganizationStatus) }).pipe(ns),
).annotate({
  identifier: "DescribeOrganizationsAccessOutput",
}) as any as S.Schema<DescribeOrganizationsAccessOutput>;
export interface DescribePublisherInput {
  PublisherId?: string;
}
export const DescribePublisherInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PublisherId: S.optional(S.String) }).pipe(
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
  identifier: "DescribePublisherInput",
}) as any as S.Schema<DescribePublisherInput>;
export type PublisherStatus = "VERIFIED" | "UNVERIFIED" | (string & {});
export const PublisherStatus = /*@__PURE__*/ S.String;

export type IdentityProvider =
  | "AWS_Marketplace"
  | "GitHub"
  | "Bitbucket"
  | (string & {});
export const IdentityProvider = /*@__PURE__*/ S.String;

export type PublisherProfile = string;
export interface DescribePublisherOutput {
  PublisherId?: string;
  PublisherStatus?: PublisherStatus;
  IdentityProvider?: IdentityProvider;
  PublisherProfile?: string;
}
export const DescribePublisherOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PublisherId: S.optional(S.String),
    PublisherStatus: S.optional(PublisherStatus),
    IdentityProvider: S.optional(IdentityProvider),
    PublisherProfile: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribePublisherOutput",
}) as any as S.Schema<DescribePublisherOutput>;
export type ResourceScanId = string;
export interface DescribeResourceScanInput {
  ResourceScanId?: string;
}
export const DescribeResourceScanInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceScanId: S.optional(S.String) }).pipe(
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
  identifier: "DescribeResourceScanInput",
}) as any as S.Schema<DescribeResourceScanInput>;
export type ResourceScanStatus =
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETE"
  | "EXPIRED"
  | (string & {});
export const ResourceScanStatus = /*@__PURE__*/ S.String;

export type ResourceScanStatusReason = string;
export type PercentageCompleted = number;
export type ResourcesScanned = number;
export type ResourcesRead = number;
export type ResourceTypeFilter = string;
export type ResourceTypeFilters = string[];
export const ResourceTypeFilters = /*@__PURE__*/ S.Array(S.String);
export interface ScanFilter {
  Types?: string[];
}
export const ScanFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Types: S.optional(ResourceTypeFilters) }),
).annotate({ identifier: "ScanFilter" }) as any as S.Schema<ScanFilter>;
export type ScanFilters = ScanFilter[];
export const ScanFilters = /*@__PURE__*/ S.Array(ScanFilter);
export interface DescribeResourceScanOutput {
  ResourceScanId?: string;
  Status?: ResourceScanStatus;
  StatusReason?: string;
  StartTime?: Date;
  EndTime?: Date;
  PercentageCompleted?: number;
  ResourceTypes?: string[];
  ResourcesScanned?: number;
  ResourcesRead?: number;
  ScanFilters?: ScanFilter[];
}
export const DescribeResourceScanOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceScanId: S.optional(S.String),
    Status: S.optional(ResourceScanStatus),
    StatusReason: S.optional(S.String),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    PercentageCompleted: S.optional(S.Number),
    ResourceTypes: S.optional(ResourceTypes),
    ResourcesScanned: S.optional(S.Number),
    ResourcesRead: S.optional(S.Number),
    ScanFilters: S.optional(ScanFilters),
  }).pipe(ns),
).annotate({
  identifier: "DescribeResourceScanOutput",
}) as any as S.Schema<DescribeResourceScanOutput>;
export type StackDriftDetectionId = string;
export interface DescribeStackDriftDetectionStatusInput {
  StackDriftDetectionId?: string;
}
export const DescribeStackDriftDetectionStatusInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ StackDriftDetectionId: S.optional(S.String) }).pipe(
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
  identifier: "DescribeStackDriftDetectionStatusInput",
}) as any as S.Schema<DescribeStackDriftDetectionStatusInput>;
export type StackDriftDetectionStatus =
  | "DETECTION_IN_PROGRESS"
  | "DETECTION_FAILED"
  | "DETECTION_COMPLETE"
  | (string & {});
export const StackDriftDetectionStatus = /*@__PURE__*/ S.String;

export type StackDriftDetectionStatusReason = string;
export type BoxedInteger = number;
export interface DescribeStackDriftDetectionStatusOutput {
  StackId: string;
  StackDriftDetectionId: string;
  StackDriftStatus?: StackDriftStatus;
  DetectionStatus: StackDriftDetectionStatus;
  DetectionStatusReason?: string;
  DriftedStackResourceCount?: number;
  Timestamp: Date;
}
export const DescribeStackDriftDetectionStatusOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StackId: S.optional(S.String),
      StackDriftDetectionId: S.optional(S.String),
      StackDriftStatus: S.optional(StackDriftStatus),
      DetectionStatus: S.optional(StackDriftDetectionStatus),
      DetectionStatusReason: S.optional(S.String),
      DriftedStackResourceCount: S.optional(S.Number),
      Timestamp: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
    }).pipe(ns),
).annotate({
  identifier: "DescribeStackDriftDetectionStatusOutput",
}) as any as S.Schema<DescribeStackDriftDetectionStatusOutput>;
export interface DescribeStackEventsInput {
  StackName?: string;
  NextToken?: string;
}
export const DescribeStackEventsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
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
  identifier: "DescribeStackEventsInput",
}) as any as S.Schema<DescribeStackEventsInput>;
export type HookInvocationId = string;
export interface StackEvent {
  StackId?: string;
  EventId?: string;
  StackName?: string;
  OperationId?: string;
  LogicalResourceId?: string;
  PhysicalResourceId?: string;
  ResourceType?: string;
  Timestamp?: Date;
  ResourceStatus?: ResourceStatus;
  ResourceStatusReason?: string;
  ResourceProperties?: string;
  ClientRequestToken?: string;
  HookType?: string;
  HookStatus?: HookStatus;
  HookStatusReason?: string;
  HookInvocationPoint?: HookInvocationPoint;
  HookInvocationId?: string;
  HookFailureMode?: HookFailureMode;
  DetailedStatus?: DetailedStatus;
}
export const StackEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackId: S.optional(S.String),
    EventId: S.optional(S.String),
    StackName: S.optional(S.String),
    OperationId: S.optional(S.String),
    LogicalResourceId: S.optional(S.String),
    PhysicalResourceId: S.optional(S.String),
    ResourceType: S.optional(S.String),
    Timestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ResourceStatus: S.optional(ResourceStatus),
    ResourceStatusReason: S.optional(S.String),
    ResourceProperties: S.optional(S.String),
    ClientRequestToken: S.optional(S.String),
    HookType: S.optional(S.String),
    HookStatus: S.optional(HookStatus),
    HookStatusReason: S.optional(S.String),
    HookInvocationPoint: S.optional(HookInvocationPoint),
    HookInvocationId: S.optional(S.String),
    HookFailureMode: S.optional(HookFailureMode),
    DetailedStatus: S.optional(DetailedStatus),
  }),
).annotate({ identifier: "StackEvent" }) as any as S.Schema<StackEvent>;
export type StackEvents = StackEvent[];
export const StackEvents = /*@__PURE__*/ S.Array(StackEvent);
export interface DescribeStackEventsOutput {
  StackEvents?: (StackEvent & {
    StackId: StackId;
    EventId: EventId;
    StackName: StackName;
    Timestamp: Date;
  })[];
  NextToken?: string;
}
export const DescribeStackEventsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackEvents: S.optional(StackEvents),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeStackEventsOutput",
}) as any as S.Schema<DescribeStackEventsOutput>;
export interface DescribeStackInstanceInput {
  StackSetName?: string;
  StackInstanceAccount?: string;
  StackInstanceRegion?: string;
  CallAs?: CallAs;
}
export const DescribeStackInstanceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSetName: S.optional(S.String),
    StackInstanceAccount: S.optional(S.String),
    StackInstanceRegion: S.optional(S.String),
    CallAs: S.optional(CallAs),
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
  identifier: "DescribeStackInstanceInput",
}) as any as S.Schema<DescribeStackInstanceInput>;
export type StackInstanceStatus =
  | "CURRENT"
  | "OUTDATED"
  | "INOPERABLE"
  | (string & {});
export const StackInstanceStatus = /*@__PURE__*/ S.String;

export type StackInstanceDetailedStatus =
  | "PENDING"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELLED"
  | "INOPERABLE"
  | "SKIPPED_SUSPENDED_ACCOUNT"
  | "FAILED_IMPORT"
  | (string & {});
export const StackInstanceDetailedStatus = /*@__PURE__*/ S.String;

export interface StackInstanceComprehensiveStatus {
  DetailedStatus?: StackInstanceDetailedStatus;
}
export const StackInstanceComprehensiveStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DetailedStatus: S.optional(StackInstanceDetailedStatus) }),
).annotate({
  identifier: "StackInstanceComprehensiveStatus",
}) as any as S.Schema<StackInstanceComprehensiveStatus>;
export type Reason = string;
export interface StackInstance {
  StackSetId?: string;
  Region?: string;
  Account?: string;
  StackId?: string;
  ParameterOverrides?: Parameter[];
  Status?: StackInstanceStatus;
  StackInstanceStatus?: StackInstanceComprehensiveStatus;
  StatusReason?: string;
  OrganizationalUnitId?: string;
  DriftStatus?: StackDriftStatus;
  LastDriftCheckTimestamp?: Date;
  LastOperationId?: string;
}
export const StackInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSetId: S.optional(S.String),
    Region: S.optional(S.String),
    Account: S.optional(S.String),
    StackId: S.optional(S.String),
    ParameterOverrides: S.optional(Parameters),
    Status: S.optional(StackInstanceStatus),
    StackInstanceStatus: S.optional(StackInstanceComprehensiveStatus),
    StatusReason: S.optional(S.String),
    OrganizationalUnitId: S.optional(S.String),
    DriftStatus: S.optional(StackDriftStatus),
    LastDriftCheckTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastOperationId: S.optional(S.String),
  }),
).annotate({ identifier: "StackInstance" }) as any as S.Schema<StackInstance>;
export interface DescribeStackInstanceOutput {
  StackInstance?: StackInstance;
}
export const DescribeStackInstanceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StackInstance: S.optional(StackInstance) }).pipe(ns),
).annotate({
  identifier: "DescribeStackInstanceOutput",
}) as any as S.Schema<DescribeStackInstanceOutput>;
export interface DescribeStackRefactorInput {
  StackRefactorId?: string;
}
export const DescribeStackRefactorInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StackRefactorId: S.optional(S.String) }).pipe(
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
  identifier: "DescribeStackRefactorInput",
}) as any as S.Schema<DescribeStackRefactorInput>;
export type StackIds = string[];
export const StackIds = /*@__PURE__*/ S.Array(S.String);
export type StackRefactorExecutionStatus =
  | "UNAVAILABLE"
  | "AVAILABLE"
  | "OBSOLETE"
  | "EXECUTE_IN_PROGRESS"
  | "EXECUTE_COMPLETE"
  | "EXECUTE_FAILED"
  | "ROLLBACK_IN_PROGRESS"
  | "ROLLBACK_COMPLETE"
  | "ROLLBACK_FAILED"
  | (string & {});
export const StackRefactorExecutionStatus = /*@__PURE__*/ S.String;

export type ExecutionStatusReason = string;
export type StackRefactorStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_COMPLETE"
  | "CREATE_FAILED"
  | "DELETE_IN_PROGRESS"
  | "DELETE_COMPLETE"
  | "DELETE_FAILED"
  | (string & {});
export const StackRefactorStatus = /*@__PURE__*/ S.String;

export type StackRefactorStatusReason = string;
export interface DescribeStackRefactorOutput {
  Description?: string;
  StackRefactorId?: string;
  StackIds?: string[];
  ExecutionStatus?: StackRefactorExecutionStatus;
  ExecutionStatusReason?: string;
  Status?: StackRefactorStatus;
  StatusReason?: string;
}
export const DescribeStackRefactorOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    StackRefactorId: S.optional(S.String),
    StackIds: S.optional(StackIds),
    ExecutionStatus: S.optional(StackRefactorExecutionStatus),
    ExecutionStatusReason: S.optional(S.String),
    Status: S.optional(StackRefactorStatus),
    StatusReason: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeStackRefactorOutput",
}) as any as S.Schema<DescribeStackRefactorOutput>;
export interface DescribeStackResourceInput {
  StackName?: string;
  LogicalResourceId?: string;
}
export const DescribeStackResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    LogicalResourceId: S.optional(S.String),
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
  identifier: "DescribeStackResourceInput",
}) as any as S.Schema<DescribeStackResourceInput>;
export type Metadata = string;
export interface StackResourceDriftInformation {
  StackResourceDriftStatus?: StackResourceDriftStatus;
  LastCheckTimestamp?: Date;
}
export const StackResourceDriftInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackResourceDriftStatus: S.optional(StackResourceDriftStatus),
    LastCheckTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "StackResourceDriftInformation",
}) as any as S.Schema<StackResourceDriftInformation>;
export interface StackResourceDetail {
  StackName?: string;
  StackId?: string;
  LogicalResourceId?: string;
  PhysicalResourceId?: string;
  ResourceType?: string;
  LastUpdatedTimestamp?: Date;
  ResourceStatus?: ResourceStatus;
  ResourceStatusReason?: string;
  Description?: string;
  Metadata?: string;
  DriftInformation?: StackResourceDriftInformation;
  ModuleInfo?: ModuleInfo;
}
export const StackResourceDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    StackId: S.optional(S.String),
    LogicalResourceId: S.optional(S.String),
    PhysicalResourceId: S.optional(S.String),
    ResourceType: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ResourceStatus: S.optional(ResourceStatus),
    ResourceStatusReason: S.optional(S.String),
    Description: S.optional(S.String),
    Metadata: S.optional(S.String),
    DriftInformation: S.optional(StackResourceDriftInformation),
    ModuleInfo: S.optional(ModuleInfo),
  }),
).annotate({
  identifier: "StackResourceDetail",
}) as any as S.Schema<StackResourceDetail>;
export interface DescribeStackResourceOutput {
  StackResourceDetail?: StackResourceDetail & {
    LogicalResourceId: LogicalResourceId;
    ResourceType: ResourceType;
    LastUpdatedTimestamp: Date;
    ResourceStatus: ResourceStatus;
    DriftInformation: StackResourceDriftInformation & {
      StackResourceDriftStatus: StackResourceDriftStatus;
    };
  };
}
export const DescribeStackResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StackResourceDetail: S.optional(StackResourceDetail) }).pipe(ns),
).annotate({
  identifier: "DescribeStackResourceOutput",
}) as any as S.Schema<DescribeStackResourceOutput>;
export type StackResourceDriftStatusFilters = StackResourceDriftStatus[];
export const StackResourceDriftStatusFilters = /*@__PURE__*/ S.Array(
  StackResourceDriftStatus,
);
export type BoxedMaxResults = number;
export interface DescribeStackResourceDriftsInput {
  StackName?: string;
  StackResourceDriftStatusFilters?: StackResourceDriftStatus[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeStackResourceDriftsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    StackResourceDriftStatusFilters: S.optional(
      StackResourceDriftStatusFilters,
    ),
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
  identifier: "DescribeStackResourceDriftsInput",
}) as any as S.Schema<DescribeStackResourceDriftsInput>;
export type Key = string;
export type Value = string;
export interface PhysicalResourceIdContextKeyValuePair {
  Key?: string;
  Value?: string;
}
export const PhysicalResourceIdContextKeyValuePair = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "PhysicalResourceIdContextKeyValuePair",
}) as any as S.Schema<PhysicalResourceIdContextKeyValuePair>;
export type PhysicalResourceIdContext = PhysicalResourceIdContextKeyValuePair[];
export const PhysicalResourceIdContext = /*@__PURE__*/ S.Array(
  PhysicalResourceIdContextKeyValuePair,
);
export type Properties = string;
export type PropertyValue = string;
export type DifferenceType = "ADD" | "REMOVE" | "NOT_EQUAL" | (string & {});
export const DifferenceType = /*@__PURE__*/ S.String;

export interface PropertyDifference {
  PropertyPath?: string;
  ExpectedValue?: string;
  ActualValue?: string;
  DifferenceType?: DifferenceType;
}
export const PropertyDifference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PropertyPath: S.optional(S.String),
    ExpectedValue: S.optional(S.String),
    ActualValue: S.optional(S.String),
    DifferenceType: S.optional(DifferenceType),
  }),
).annotate({
  identifier: "PropertyDifference",
}) as any as S.Schema<PropertyDifference>;
export type PropertyDifferences = PropertyDifference[];
export const PropertyDifferences = /*@__PURE__*/ S.Array(PropertyDifference);
export type StackResourceDriftStatusReason = string;
export interface StackResourceDrift {
  StackId?: string;
  LogicalResourceId?: string;
  PhysicalResourceId?: string;
  PhysicalResourceIdContext?: PhysicalResourceIdContextKeyValuePair[];
  ResourceType?: string;
  ExpectedProperties?: string;
  ActualProperties?: string;
  PropertyDifferences?: PropertyDifference[];
  StackResourceDriftStatus?: StackResourceDriftStatus;
  Timestamp?: Date;
  ModuleInfo?: ModuleInfo;
  DriftStatusReason?: string;
}
export const StackResourceDrift = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackId: S.optional(S.String),
    LogicalResourceId: S.optional(S.String),
    PhysicalResourceId: S.optional(S.String),
    PhysicalResourceIdContext: S.optional(PhysicalResourceIdContext),
    ResourceType: S.optional(S.String),
    ExpectedProperties: S.optional(S.String),
    ActualProperties: S.optional(S.String),
    PropertyDifferences: S.optional(PropertyDifferences),
    StackResourceDriftStatus: S.optional(StackResourceDriftStatus),
    Timestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ModuleInfo: S.optional(ModuleInfo),
    DriftStatusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "StackResourceDrift",
}) as any as S.Schema<StackResourceDrift>;
export type StackResourceDrifts = StackResourceDrift[];
export const StackResourceDrifts = /*@__PURE__*/ S.Array(StackResourceDrift);
export interface DescribeStackResourceDriftsOutput {
  StackResourceDrifts: (StackResourceDrift & {
    StackId: StackId;
    LogicalResourceId: LogicalResourceId;
    ResourceType: ResourceType;
    StackResourceDriftStatus: StackResourceDriftStatus;
    Timestamp: Date;
    PhysicalResourceIdContext: (PhysicalResourceIdContextKeyValuePair & {
      Key: Key;
      Value: Value;
    })[];
    PropertyDifferences: (PropertyDifference & {
      PropertyPath: PropertyPath;
      ExpectedValue: PropertyValue;
      ActualValue: PropertyValue;
      DifferenceType: DifferenceType;
    })[];
  })[];
  NextToken?: string;
}
export const DescribeStackResourceDriftsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackResourceDrifts: S.optional(StackResourceDrifts),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeStackResourceDriftsOutput",
}) as any as S.Schema<DescribeStackResourceDriftsOutput>;
export interface DescribeStackResourcesInput {
  StackName?: string;
  LogicalResourceId?: string;
  PhysicalResourceId?: string;
}
export const DescribeStackResourcesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    LogicalResourceId: S.optional(S.String),
    PhysicalResourceId: S.optional(S.String),
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
  identifier: "DescribeStackResourcesInput",
}) as any as S.Schema<DescribeStackResourcesInput>;
export interface StackResource {
  StackName?: string;
  StackId?: string;
  LogicalResourceId?: string;
  PhysicalResourceId?: string;
  ResourceType?: string;
  Timestamp?: Date;
  ResourceStatus?: ResourceStatus;
  ResourceStatusReason?: string;
  Description?: string;
  DriftInformation?: StackResourceDriftInformation;
  ModuleInfo?: ModuleInfo;
}
export const StackResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    StackId: S.optional(S.String),
    LogicalResourceId: S.optional(S.String),
    PhysicalResourceId: S.optional(S.String),
    ResourceType: S.optional(S.String),
    Timestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ResourceStatus: S.optional(ResourceStatus),
    ResourceStatusReason: S.optional(S.String),
    Description: S.optional(S.String),
    DriftInformation: S.optional(StackResourceDriftInformation),
    ModuleInfo: S.optional(ModuleInfo),
  }),
).annotate({ identifier: "StackResource" }) as any as S.Schema<StackResource>;
export type StackResources = StackResource[];
export const StackResources = /*@__PURE__*/ S.Array(StackResource);
export interface DescribeStackResourcesOutput {
  StackResources?: (StackResource & {
    LogicalResourceId: LogicalResourceId;
    ResourceType: ResourceType;
    Timestamp: Date;
    ResourceStatus: ResourceStatus;
    DriftInformation: StackResourceDriftInformation & {
      StackResourceDriftStatus: StackResourceDriftStatus;
    };
  })[];
}
export const DescribeStackResourcesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StackResources: S.optional(StackResources) }).pipe(ns),
).annotate({
  identifier: "DescribeStackResourcesOutput",
}) as any as S.Schema<DescribeStackResourcesOutput>;
export interface DescribeStacksInput {
  StackName?: string;
  NextToken?: string;
}
export const DescribeStacksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
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
  identifier: "DescribeStacksInput",
}) as any as S.Schema<DescribeStacksInput>;
export type DeletionTime = Date;
export type StackStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_FAILED"
  | "CREATE_COMPLETE"
  | "ROLLBACK_IN_PROGRESS"
  | "ROLLBACK_FAILED"
  | "ROLLBACK_COMPLETE"
  | "DELETE_IN_PROGRESS"
  | "DELETE_FAILED"
  | "DELETE_COMPLETE"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_COMPLETE_CLEANUP_IN_PROGRESS"
  | "UPDATE_COMPLETE"
  | "UPDATE_FAILED"
  | "UPDATE_ROLLBACK_IN_PROGRESS"
  | "UPDATE_ROLLBACK_FAILED"
  | "UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS"
  | "UPDATE_ROLLBACK_COMPLETE"
  | "REVIEW_IN_PROGRESS"
  | "IMPORT_IN_PROGRESS"
  | "IMPORT_COMPLETE"
  | "IMPORT_ROLLBACK_IN_PROGRESS"
  | "IMPORT_ROLLBACK_FAILED"
  | "IMPORT_ROLLBACK_COMPLETE"
  | (string & {});
export const StackStatus = /*@__PURE__*/ S.String;

export type StackStatusReason = string;
export type OutputKey = string;
export type OutputValue = string;
export type ExportName = string;
export interface Output {
  OutputKey?: string;
  OutputValue?: string;
  Description?: string;
  ExportName?: string;
}
export const Output = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutputKey: S.optional(S.String),
    OutputValue: S.optional(S.String),
    Description: S.optional(S.String),
    ExportName: S.optional(S.String),
  }),
).annotate({ identifier: "Output" }) as any as S.Schema<Output>;
export type Outputs = Output[];
export const Outputs = /*@__PURE__*/ S.Array(Output);
export interface StackDriftInformation {
  StackDriftStatus?: StackDriftStatus;
  LastCheckTimestamp?: Date;
}
export const StackDriftInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackDriftStatus: S.optional(StackDriftStatus),
    LastCheckTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "StackDriftInformation",
}) as any as S.Schema<StackDriftInformation>;
export interface OperationEntry {
  OperationType?: OperationType;
  OperationId?: string;
}
export const OperationEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OperationType: S.optional(OperationType),
    OperationId: S.optional(S.String),
  }),
).annotate({ identifier: "OperationEntry" }) as any as S.Schema<OperationEntry>;
export type LastOperations = OperationEntry[];
export const LastOperations = /*@__PURE__*/ S.Array(OperationEntry);
export interface Stack {
  StackId?: string;
  StackName?: string;
  ChangeSetId?: string;
  Description?: string;
  Parameters?: Parameter[];
  CreationTime?: Date;
  DeletionTime?: Date;
  LastUpdatedTime?: Date;
  RollbackConfiguration?: RollbackConfiguration;
  StackStatus?: StackStatus;
  StackStatusReason?: string;
  DisableRollback?: boolean;
  NotificationARNs?: string[];
  TimeoutInMinutes?: number;
  Capabilities?: Capability[];
  Outputs?: Output[];
  RoleARN?: string;
  Tags?: Tag[];
  EnableTerminationProtection?: boolean;
  ParentId?: string;
  RootId?: string;
  DriftInformation?: StackDriftInformation;
  RetainExceptOnCreate?: boolean;
  DeletionMode?: DeletionMode;
  DetailedStatus?: DetailedStatus;
  LastOperations?: OperationEntry[];
}
export const Stack = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackId: S.optional(S.String),
    StackName: S.optional(S.String),
    ChangeSetId: S.optional(S.String),
    Description: S.optional(S.String),
    Parameters: S.optional(Parameters),
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DeletionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastUpdatedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    RollbackConfiguration: S.optional(RollbackConfiguration),
    StackStatus: S.optional(StackStatus),
    StackStatusReason: S.optional(S.String),
    DisableRollback: S.optional(S.Boolean),
    NotificationARNs: S.optional(NotificationARNs),
    TimeoutInMinutes: S.optional(S.Number),
    Capabilities: S.optional(Capabilities),
    Outputs: S.optional(Outputs),
    RoleARN: S.optional(S.String),
    Tags: S.optional(Tags),
    EnableTerminationProtection: S.optional(S.Boolean),
    ParentId: S.optional(S.String),
    RootId: S.optional(S.String),
    DriftInformation: S.optional(StackDriftInformation),
    RetainExceptOnCreate: S.optional(S.Boolean),
    DeletionMode: S.optional(DeletionMode),
    DetailedStatus: S.optional(DetailedStatus),
    LastOperations: S.optional(LastOperations),
  }),
).annotate({ identifier: "Stack" }) as any as S.Schema<Stack>;
export type Stacks = Stack[];
export const Stacks = /*@__PURE__*/ S.Array(Stack);
export interface DescribeStacksOutput {
  Stacks?: (Stack & {
    StackName: StackName;
    CreationTime: CreationTime;
    StackStatus: StackStatus;
    RollbackConfiguration: RollbackConfiguration & {
      RollbackTriggers: (RollbackTrigger & { Arn: Arn; Type: Type })[];
    };
    Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    DriftInformation: StackDriftInformation & {
      StackDriftStatus: StackDriftStatus;
    };
  })[];
  NextToken?: string;
}
export const DescribeStacksOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Stacks: S.optional(Stacks),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeStacksOutput",
}) as any as S.Schema<DescribeStacksOutput>;
export interface DescribeStackSetInput {
  StackSetName?: string;
  CallAs?: CallAs;
}
export const DescribeStackSetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSetName: S.optional(S.String),
    CallAs: S.optional(CallAs),
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
  identifier: "DescribeStackSetInput",
}) as any as S.Schema<DescribeStackSetInput>;
export type StackSetStatus = "ACTIVE" | "DELETED" | (string & {});
export const StackSetStatus = /*@__PURE__*/ S.String;

export type StackSetDriftStatus =
  | "DRIFTED"
  | "IN_SYNC"
  | "NOT_CHECKED"
  | (string & {});
export const StackSetDriftStatus = /*@__PURE__*/ S.String;

export type StackSetDriftDetectionStatus =
  | "COMPLETED"
  | "FAILED"
  | "PARTIAL_SUCCESS"
  | "IN_PROGRESS"
  | "STOPPED"
  | (string & {});
export const StackSetDriftDetectionStatus = /*@__PURE__*/ S.String;

export type TotalStackInstancesCount = number;
export type DriftedStackInstancesCount = number;
export type InSyncStackInstancesCount = number;
export type InProgressStackInstancesCount = number;
export type FailedStackInstancesCount = number;
export interface StackSetDriftDetectionDetails {
  DriftStatus?: StackSetDriftStatus;
  DriftDetectionStatus?: StackSetDriftDetectionStatus;
  LastDriftCheckTimestamp?: Date;
  TotalStackInstancesCount?: number;
  DriftedStackInstancesCount?: number;
  InSyncStackInstancesCount?: number;
  InProgressStackInstancesCount?: number;
  FailedStackInstancesCount?: number;
}
export const StackSetDriftDetectionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DriftStatus: S.optional(StackSetDriftStatus),
    DriftDetectionStatus: S.optional(StackSetDriftDetectionStatus),
    LastDriftCheckTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    TotalStackInstancesCount: S.optional(S.Number),
    DriftedStackInstancesCount: S.optional(S.Number),
    InSyncStackInstancesCount: S.optional(S.Number),
    InProgressStackInstancesCount: S.optional(S.Number),
    FailedStackInstancesCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "StackSetDriftDetectionDetails",
}) as any as S.Schema<StackSetDriftDetectionDetails>;
export interface StackSet {
  StackSetName?: string;
  StackSetId?: string;
  Description?: string;
  Status?: StackSetStatus;
  TemplateBody?: string;
  Parameters?: Parameter[];
  Capabilities?: Capability[];
  Tags?: Tag[];
  StackSetARN?: string;
  AdministrationRoleARN?: string;
  ExecutionRoleName?: string;
  StackSetDriftDetectionDetails?: StackSetDriftDetectionDetails;
  AutoDeployment?: AutoDeployment;
  PermissionModel?: PermissionModels;
  OrganizationalUnitIds?: string[];
  ManagedExecution?: ManagedExecution;
  Regions?: string[];
}
export const StackSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSetName: S.optional(S.String),
    StackSetId: S.optional(S.String),
    Description: S.optional(S.String),
    Status: S.optional(StackSetStatus),
    TemplateBody: S.optional(S.String),
    Parameters: S.optional(Parameters),
    Capabilities: S.optional(Capabilities),
    Tags: S.optional(Tags),
    StackSetARN: S.optional(S.String),
    AdministrationRoleARN: S.optional(S.String),
    ExecutionRoleName: S.optional(S.String),
    StackSetDriftDetectionDetails: S.optional(StackSetDriftDetectionDetails),
    AutoDeployment: S.optional(AutoDeployment),
    PermissionModel: S.optional(PermissionModels),
    OrganizationalUnitIds: S.optional(OrganizationalUnitIdList),
    ManagedExecution: S.optional(ManagedExecution),
    Regions: S.optional(RegionList),
  }),
).annotate({ identifier: "StackSet" }) as any as S.Schema<StackSet>;
export interface DescribeStackSetOutput {
  StackSet?: StackSet & { Tags: (Tag & { Key: TagKey; Value: TagValue })[] };
}
export const DescribeStackSetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StackSet: S.optional(StackSet) }).pipe(ns),
).annotate({
  identifier: "DescribeStackSetOutput",
}) as any as S.Schema<DescribeStackSetOutput>;
export interface DescribeStackSetOperationInput {
  StackSetName?: string;
  OperationId?: string;
  CallAs?: CallAs;
}
export const DescribeStackSetOperationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSetName: S.optional(S.String),
    OperationId: S.optional(S.String),
    CallAs: S.optional(CallAs),
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
  identifier: "DescribeStackSetOperationInput",
}) as any as S.Schema<DescribeStackSetOperationInput>;
export type StackSetOperationAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "DETECT_DRIFT"
  | (string & {});
export const StackSetOperationAction = /*@__PURE__*/ S.String;

export type StackSetOperationStatus =
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "STOPPING"
  | "STOPPED"
  | "QUEUED"
  | (string & {});
export const StackSetOperationStatus = /*@__PURE__*/ S.String;

export type RetainStacksNullable = boolean;
export type StackSetOperationStatusReason = string;
export interface StackSetOperationStatusDetails {
  FailedStackInstancesCount?: number;
}
export const StackSetOperationStatusDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FailedStackInstancesCount: S.optional(S.Number) }),
).annotate({
  identifier: "StackSetOperationStatusDetails",
}) as any as S.Schema<StackSetOperationStatusDetails>;
export interface StackSetOperation {
  OperationId?: string;
  StackSetId?: string;
  Action?: StackSetOperationAction;
  Status?: StackSetOperationStatus;
  OperationPreferences?: StackSetOperationPreferences;
  RetainStacks?: boolean;
  AdministrationRoleARN?: string;
  ExecutionRoleName?: string;
  CreationTimestamp?: Date;
  EndTimestamp?: Date;
  DeploymentTargets?: DeploymentTargets;
  StackSetDriftDetectionDetails?: StackSetDriftDetectionDetails;
  StatusReason?: string;
  StatusDetails?: StackSetOperationStatusDetails;
}
export const StackSetOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OperationId: S.optional(S.String),
    StackSetId: S.optional(S.String),
    Action: S.optional(StackSetOperationAction),
    Status: S.optional(StackSetOperationStatus),
    OperationPreferences: S.optional(StackSetOperationPreferences),
    RetainStacks: S.optional(S.Boolean),
    AdministrationRoleARN: S.optional(S.String),
    ExecutionRoleName: S.optional(S.String),
    CreationTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DeploymentTargets: S.optional(DeploymentTargets),
    StackSetDriftDetectionDetails: S.optional(StackSetDriftDetectionDetails),
    StatusReason: S.optional(S.String),
    StatusDetails: S.optional(StackSetOperationStatusDetails),
  }),
).annotate({
  identifier: "StackSetOperation",
}) as any as S.Schema<StackSetOperation>;
export interface DescribeStackSetOperationOutput {
  StackSetOperation?: StackSetOperation;
}
export const DescribeStackSetOperationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StackSetOperation: S.optional(StackSetOperation) }).pipe(ns),
).annotate({
  identifier: "DescribeStackSetOperationOutput",
}) as any as S.Schema<DescribeStackSetOperationOutput>;
export type PublicVersionNumber = string;
export interface DescribeTypeInput {
  Type?: RegistryType;
  TypeName?: string;
  Arn?: string;
  VersionId?: string;
  PublisherId?: string;
  PublicVersionNumber?: string;
}
export const DescribeTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(RegistryType),
    TypeName: S.optional(S.String),
    Arn: S.optional(S.String),
    VersionId: S.optional(S.String),
    PublisherId: S.optional(S.String),
    PublicVersionNumber: S.optional(S.String),
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
  identifier: "DescribeTypeInput",
}) as any as S.Schema<DescribeTypeInput>;
export type IsDefaultVersion = boolean;
export type TypeTestsStatus =
  | "PASSED"
  | "FAILED"
  | "IN_PROGRESS"
  | "NOT_TESTED"
  | (string & {});
export const TypeTestsStatus = /*@__PURE__*/ S.String;

export type TypeTestsStatusDescription = string;
export type TypeSchema = string;
export type ProvisioningType =
  | "NON_PROVISIONABLE"
  | "IMMUTABLE"
  | "FULLY_MUTABLE"
  | (string & {});
export const ProvisioningType = /*@__PURE__*/ S.String;

export type DeprecatedStatus = "LIVE" | "DEPRECATED" | (string & {});
export const DeprecatedStatus = /*@__PURE__*/ S.String;

export type SupportedMajorVersion = number;
export type SupportedMajorVersions = number[];
export const SupportedMajorVersions = /*@__PURE__*/ S.Array(S.Number);
export interface RequiredActivatedType {
  TypeNameAlias?: string;
  OriginalTypeName?: string;
  PublisherId?: string;
  SupportedMajorVersions?: number[];
}
export const RequiredActivatedType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TypeNameAlias: S.optional(S.String),
    OriginalTypeName: S.optional(S.String),
    PublisherId: S.optional(S.String),
    SupportedMajorVersions: S.optional(SupportedMajorVersions),
  }),
).annotate({
  identifier: "RequiredActivatedType",
}) as any as S.Schema<RequiredActivatedType>;
export type RequiredActivatedTypes = RequiredActivatedType[];
export const RequiredActivatedTypes = /*@__PURE__*/ S.Array(
  RequiredActivatedType,
);
export type Visibility = "PUBLIC" | "PRIVATE" | (string & {});
export const Visibility = /*@__PURE__*/ S.String;

export type OptionalSecureUrl = string;
export type ConfigurationSchema = string;
export type IsActivated = boolean;
export interface DescribeTypeOutput {
  Arn?: string;
  Type?: RegistryType;
  TypeName?: string;
  DefaultVersionId?: string;
  IsDefaultVersion?: boolean;
  TypeTestsStatus?: TypeTestsStatus;
  TypeTestsStatusDescription?: string;
  Description?: string;
  Schema?: string;
  ProvisioningType?: ProvisioningType;
  DeprecatedStatus?: DeprecatedStatus;
  LoggingConfig?: LoggingConfig & {
    LogRoleArn: RoleARN2;
    LogGroupName: LogGroupName;
  };
  RequiredActivatedTypes?: RequiredActivatedType[];
  ExecutionRoleArn?: string;
  Visibility?: Visibility;
  SourceUrl?: string;
  DocumentationUrl?: string;
  LastUpdated?: Date;
  TimeCreated?: Date;
  ConfigurationSchema?: string;
  PublisherId?: string;
  OriginalTypeName?: string;
  OriginalTypeArn?: string;
  PublicVersionNumber?: string;
  LatestPublicVersion?: string;
  IsActivated?: boolean;
  AutoUpdate?: boolean;
}
export const DescribeTypeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Type: S.optional(RegistryType),
    TypeName: S.optional(S.String),
    DefaultVersionId: S.optional(S.String),
    IsDefaultVersion: S.optional(S.Boolean),
    TypeTestsStatus: S.optional(TypeTestsStatus),
    TypeTestsStatusDescription: S.optional(S.String),
    Description: S.optional(S.String),
    Schema: S.optional(S.String),
    ProvisioningType: S.optional(ProvisioningType),
    DeprecatedStatus: S.optional(DeprecatedStatus),
    LoggingConfig: S.optional(LoggingConfig),
    RequiredActivatedTypes: S.optional(RequiredActivatedTypes),
    ExecutionRoleArn: S.optional(S.String),
    Visibility: S.optional(Visibility),
    SourceUrl: S.optional(S.String),
    DocumentationUrl: S.optional(S.String),
    LastUpdated: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    TimeCreated: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ConfigurationSchema: S.optional(S.String),
    PublisherId: S.optional(S.String),
    OriginalTypeName: S.optional(S.String),
    OriginalTypeArn: S.optional(S.String),
    PublicVersionNumber: S.optional(S.String),
    LatestPublicVersion: S.optional(S.String),
    IsActivated: S.optional(S.Boolean),
    AutoUpdate: S.optional(S.Boolean),
  }).pipe(ns),
).annotate({
  identifier: "DescribeTypeOutput",
}) as any as S.Schema<DescribeTypeOutput>;
export type RegistrationToken = string;
export interface DescribeTypeRegistrationInput {
  RegistrationToken?: string;
}
export const DescribeTypeRegistrationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegistrationToken: S.optional(S.String) }).pipe(
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
  identifier: "DescribeTypeRegistrationInput",
}) as any as S.Schema<DescribeTypeRegistrationInput>;
export type RegistrationStatus =
  | "COMPLETE"
  | "IN_PROGRESS"
  | "FAILED"
  | (string & {});
export const RegistrationStatus = /*@__PURE__*/ S.String;

export interface DescribeTypeRegistrationOutput {
  ProgressStatus?: RegistrationStatus;
  Description?: string;
  TypeArn?: string;
  TypeVersionArn?: string;
}
export const DescribeTypeRegistrationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProgressStatus: S.optional(RegistrationStatus),
    Description: S.optional(S.String),
    TypeArn: S.optional(S.String),
    TypeVersionArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeTypeRegistrationOutput",
}) as any as S.Schema<DescribeTypeRegistrationOutput>;
export type LogicalResourceIds = string[];
export const LogicalResourceIds = /*@__PURE__*/ S.Array(S.String);
export interface DetectStackDriftInput {
  StackName?: string;
  LogicalResourceIds?: string[];
}
export const DetectStackDriftInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    LogicalResourceIds: S.optional(LogicalResourceIds),
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
  identifier: "DetectStackDriftInput",
}) as any as S.Schema<DetectStackDriftInput>;
export interface DetectStackDriftOutput {
  StackDriftDetectionId: string;
}
export const DetectStackDriftOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StackDriftDetectionId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DetectStackDriftOutput",
}) as any as S.Schema<DetectStackDriftOutput>;
export interface DetectStackResourceDriftInput {
  StackName?: string;
  LogicalResourceId?: string;
}
export const DetectStackResourceDriftInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    LogicalResourceId: S.optional(S.String),
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
  identifier: "DetectStackResourceDriftInput",
}) as any as S.Schema<DetectStackResourceDriftInput>;
export interface DetectStackResourceDriftOutput {
  StackResourceDrift: StackResourceDrift & {
    StackId: StackId;
    LogicalResourceId: LogicalResourceId;
    ResourceType: ResourceType;
    StackResourceDriftStatus: StackResourceDriftStatus;
    Timestamp: Date;
    PhysicalResourceIdContext: (PhysicalResourceIdContextKeyValuePair & {
      Key: Key;
      Value: Value;
    })[];
    PropertyDifferences: (PropertyDifference & {
      PropertyPath: PropertyPath;
      ExpectedValue: PropertyValue;
      ActualValue: PropertyValue;
      DifferenceType: DifferenceType;
    })[];
  };
}
export const DetectStackResourceDriftOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StackResourceDrift: S.optional(StackResourceDrift) }).pipe(ns),
).annotate({
  identifier: "DetectStackResourceDriftOutput",
}) as any as S.Schema<DetectStackResourceDriftOutput>;
export type StackSetNameOrId = string;
export interface DetectStackSetDriftInput {
  StackSetName?: string;
  OperationPreferences?: StackSetOperationPreferences;
  OperationId?: string;
  CallAs?: CallAs;
}
export const DetectStackSetDriftInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSetName: S.optional(S.String),
    OperationPreferences: S.optional(StackSetOperationPreferences),
    OperationId: S.optional(S.String).pipe(T.IdempotencyToken()),
    CallAs: S.optional(CallAs),
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
  identifier: "DetectStackSetDriftInput",
}) as any as S.Schema<DetectStackSetDriftInput>;
export interface DetectStackSetDriftOutput {
  OperationId?: string;
}
export const DetectStackSetDriftOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DetectStackSetDriftOutput",
}) as any as S.Schema<DetectStackSetDriftOutput>;
export interface EstimateTemplateCostInput {
  TemplateBody?: string;
  TemplateURL?: string;
  Parameters?: Parameter[];
}
export const EstimateTemplateCostInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateBody: S.optional(S.String),
    TemplateURL: S.optional(S.String),
    Parameters: S.optional(Parameters),
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
  identifier: "EstimateTemplateCostInput",
}) as any as S.Schema<EstimateTemplateCostInput>;
export type Url = string;
export interface EstimateTemplateCostOutput {
  Url?: string;
}
export const EstimateTemplateCostOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Url: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "EstimateTemplateCostOutput",
}) as any as S.Schema<EstimateTemplateCostOutput>;
export interface ExecuteChangeSetInput {
  ChangeSetName?: string;
  StackName?: string;
  ClientRequestToken?: string;
  DisableRollback?: boolean;
  RetainExceptOnCreate?: boolean;
}
export const ExecuteChangeSetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChangeSetName: S.optional(S.String),
    StackName: S.optional(S.String),
    ClientRequestToken: S.optional(S.String),
    DisableRollback: S.optional(S.Boolean),
    RetainExceptOnCreate: S.optional(S.Boolean),
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
  identifier: "ExecuteChangeSetInput",
}) as any as S.Schema<ExecuteChangeSetInput>;
export interface ExecuteChangeSetOutput {}
export const ExecuteChangeSetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ExecuteChangeSetOutput",
}) as any as S.Schema<ExecuteChangeSetOutput>;
export interface ExecuteStackRefactorInput {
  StackRefactorId?: string;
}
export const ExecuteStackRefactorInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StackRefactorId: S.optional(S.String) }).pipe(
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
  identifier: "ExecuteStackRefactorInput",
}) as any as S.Schema<ExecuteStackRefactorInput>;
export interface ExecuteStackRefactorResponse {}
export const ExecuteStackRefactorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ExecuteStackRefactorResponse",
}) as any as S.Schema<ExecuteStackRefactorResponse>;
export type TemplateFormat = "JSON" | "YAML" | (string & {});
export const TemplateFormat = /*@__PURE__*/ S.String;

export interface GetGeneratedTemplateInput {
  Format?: TemplateFormat;
  GeneratedTemplateName?: string;
}
export const GetGeneratedTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Format: S.optional(TemplateFormat),
    GeneratedTemplateName: S.optional(S.String),
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
  identifier: "GetGeneratedTemplateInput",
}) as any as S.Schema<GetGeneratedTemplateInput>;
export interface GetGeneratedTemplateOutput {
  Status?: GeneratedTemplateStatus;
  TemplateBody?: string;
}
export const GetGeneratedTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(GeneratedTemplateStatus),
    TemplateBody: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetGeneratedTemplateOutput",
}) as any as S.Schema<GetGeneratedTemplateOutput>;
export interface GetHookResultInput {
  HookResultId?: string;
}
export const GetHookResultInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HookResultId: S.optional(S.String) }).pipe(
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
  identifier: "GetHookResultInput",
}) as any as S.Schema<GetHookResultInput>;
export type HookTypeArn = string;
export type HookTargetId = string;
export type HookTargetAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "IMPORT"
  | (string & {});
export const HookTargetAction = /*@__PURE__*/ S.String;

export interface HookTarget {
  TargetType?: HookTargetType;
  TargetTypeName?: string;
  TargetId?: string;
  Action?: HookTargetAction;
}
export const HookTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetType: S.optional(HookTargetType),
    TargetTypeName: S.optional(S.String),
    TargetId: S.optional(S.String),
    Action: S.optional(HookTargetAction),
  }),
).annotate({ identifier: "HookTarget" }) as any as S.Schema<HookTarget>;
export type AnnotationName = string;
export type AnnotationStatus = "PASSED" | "FAILED" | "SKIPPED" | (string & {});
export const AnnotationStatus = /*@__PURE__*/ S.String;

export type RemediationMessageStatusMessage = string;
export type RemediationMessageRemediationMessage = string;
export type AnnotationRemediationLink = string;
export type AnnotationSeverityLevel =
  | "INFORMATIONAL"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL"
  | (string & {});
export const AnnotationSeverityLevel = /*@__PURE__*/ S.String;

export interface Annotation {
  AnnotationName?: string;
  Status?: AnnotationStatus;
  StatusMessage?: string;
  RemediationMessage?: string;
  RemediationLink?: string;
  SeverityLevel?: AnnotationSeverityLevel;
}
export const Annotation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AnnotationName: S.optional(S.String),
    Status: S.optional(AnnotationStatus),
    StatusMessage: S.optional(S.String),
    RemediationMessage: S.optional(S.String),
    RemediationLink: S.optional(S.String),
    SeverityLevel: S.optional(AnnotationSeverityLevel),
  }),
).annotate({ identifier: "Annotation" }) as any as S.Schema<Annotation>;
export type AnnotationList = Annotation[];
export const AnnotationList = /*@__PURE__*/ S.Array(Annotation);
export interface GetHookResultOutput {
  HookResultId?: string;
  InvocationPoint?: HookInvocationPoint;
  FailureMode?: HookFailureMode;
  TypeName?: string;
  OriginalTypeName?: string;
  TypeVersionId?: string;
  TypeConfigurationVersionId?: string;
  TypeArn?: string;
  Status?: HookStatus;
  HookStatusReason?: string;
  InvokedAt?: Date;
  Target?: HookTarget & {
    TargetType: HookTargetType;
    TargetTypeName: HookTargetTypeName;
    TargetId: HookTargetId;
    Action: HookTargetAction;
  };
  Annotations?: Annotation[];
}
export const GetHookResultOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HookResultId: S.optional(S.String),
    InvocationPoint: S.optional(HookInvocationPoint),
    FailureMode: S.optional(HookFailureMode),
    TypeName: S.optional(S.String),
    OriginalTypeName: S.optional(S.String),
    TypeVersionId: S.optional(S.String),
    TypeConfigurationVersionId: S.optional(S.String),
    TypeArn: S.optional(S.String),
    Status: S.optional(HookStatus),
    HookStatusReason: S.optional(S.String),
    InvokedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Target: S.optional(HookTarget),
    Annotations: S.optional(AnnotationList),
  }).pipe(ns),
).annotate({
  identifier: "GetHookResultOutput",
}) as any as S.Schema<GetHookResultOutput>;
export interface GetStackPolicyInput {
  StackName?: string;
}
export const GetStackPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StackName: S.optional(S.String) }).pipe(
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
  identifier: "GetStackPolicyInput",
}) as any as S.Schema<GetStackPolicyInput>;
export interface GetStackPolicyOutput {
  StackPolicyBody?: string;
}
export const GetStackPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StackPolicyBody: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "GetStackPolicyOutput",
}) as any as S.Schema<GetStackPolicyOutput>;
export type TemplateStage = "Original" | "Processed" | (string & {});
export const TemplateStage = /*@__PURE__*/ S.String;

export interface GetTemplateInput {
  StackName?: string;
  ChangeSetName?: string;
  TemplateStage?: TemplateStage;
}
export const GetTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    ChangeSetName: S.optional(S.String),
    TemplateStage: S.optional(TemplateStage),
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
  identifier: "GetTemplateInput",
}) as any as S.Schema<GetTemplateInput>;
export type StageList = TemplateStage[];
export const StageList = /*@__PURE__*/ S.Array(TemplateStage);
export interface GetTemplateOutput {
  TemplateBody?: string;
  StagesAvailable?: TemplateStage[];
}
export const GetTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateBody: S.optional(S.String),
    StagesAvailable: S.optional(StageList),
  }).pipe(ns),
).annotate({
  identifier: "GetTemplateOutput",
}) as any as S.Schema<GetTemplateOutput>;
export type TreatUnrecognizedResourceTypesAsWarnings = boolean;
export interface TemplateSummaryConfig {
  TreatUnrecognizedResourceTypesAsWarnings?: boolean;
}
export const TemplateSummaryConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TreatUnrecognizedResourceTypesAsWarnings: S.optional(S.Boolean) }),
).annotate({
  identifier: "TemplateSummaryConfig",
}) as any as S.Schema<TemplateSummaryConfig>;
export interface GetTemplateSummaryInput {
  TemplateBody?: string;
  TemplateURL?: string;
  StackName?: string;
  StackSetName?: string;
  CallAs?: CallAs;
  TemplateSummaryConfig?: TemplateSummaryConfig;
}
export const GetTemplateSummaryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateBody: S.optional(S.String),
    TemplateURL: S.optional(S.String),
    StackName: S.optional(S.String),
    StackSetName: S.optional(S.String),
    CallAs: S.optional(CallAs),
    TemplateSummaryConfig: S.optional(TemplateSummaryConfig),
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
  identifier: "GetTemplateSummaryInput",
}) as any as S.Schema<GetTemplateSummaryInput>;
export type ParameterType = string;
export type NoEcho = boolean;
export type AllowedValue = string;
export type AllowedValues = string[];
export const AllowedValues = /*@__PURE__*/ S.Array(S.String);
export interface ParameterConstraints {
  AllowedValues?: string[];
}
export const ParameterConstraints = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AllowedValues: S.optional(AllowedValues) }),
).annotate({
  identifier: "ParameterConstraints",
}) as any as S.Schema<ParameterConstraints>;
export interface ParameterDeclaration {
  ParameterKey?: string;
  DefaultValue?: string;
  ParameterType?: string;
  NoEcho?: boolean;
  Description?: string;
  ParameterConstraints?: ParameterConstraints;
}
export const ParameterDeclaration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterKey: S.optional(S.String),
    DefaultValue: S.optional(S.String),
    ParameterType: S.optional(S.String),
    NoEcho: S.optional(S.Boolean),
    Description: S.optional(S.String),
    ParameterConstraints: S.optional(ParameterConstraints),
  }),
).annotate({
  identifier: "ParameterDeclaration",
}) as any as S.Schema<ParameterDeclaration>;
export type ParameterDeclarations = ParameterDeclaration[];
export const ParameterDeclarations =
  /*@__PURE__*/ S.Array(ParameterDeclaration);
export type CapabilitiesReason = string;
export type Version = string;
export type TransformName = string;
export type TransformsList = string[];
export const TransformsList = /*@__PURE__*/ S.Array(S.String);
export type ResourceIdentifiers = string[];
export const ResourceIdentifiers = /*@__PURE__*/ S.Array(S.String);
export interface ResourceIdentifierSummary {
  ResourceType?: string;
  LogicalResourceIds?: string[];
  ResourceIdentifiers?: string[];
}
export const ResourceIdentifierSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceType: S.optional(S.String),
    LogicalResourceIds: S.optional(LogicalResourceIds),
    ResourceIdentifiers: S.optional(ResourceIdentifiers),
  }),
).annotate({
  identifier: "ResourceIdentifierSummary",
}) as any as S.Schema<ResourceIdentifierSummary>;
export type ResourceIdentifierSummaries = ResourceIdentifierSummary[];
export const ResourceIdentifierSummaries = /*@__PURE__*/ S.Array(
  ResourceIdentifierSummary,
);
export interface Warnings {
  UnrecognizedResourceTypes?: string[];
}
export const Warnings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UnrecognizedResourceTypes: S.optional(ResourceTypes) }),
).annotate({ identifier: "Warnings" }) as any as S.Schema<Warnings>;
export interface GetTemplateSummaryOutput {
  Parameters?: ParameterDeclaration[];
  Description?: string;
  Capabilities?: Capability[];
  CapabilitiesReason?: string;
  ResourceTypes?: string[];
  Version?: string;
  Metadata?: string;
  DeclaredTransforms?: string[];
  ResourceIdentifierSummaries?: ResourceIdentifierSummary[];
  Warnings?: Warnings;
}
export const GetTemplateSummaryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Parameters: S.optional(ParameterDeclarations),
    Description: S.optional(S.String),
    Capabilities: S.optional(Capabilities),
    CapabilitiesReason: S.optional(S.String),
    ResourceTypes: S.optional(ResourceTypes),
    Version: S.optional(S.String),
    Metadata: S.optional(S.String),
    DeclaredTransforms: S.optional(TransformsList),
    ResourceIdentifierSummaries: S.optional(ResourceIdentifierSummaries),
    Warnings: S.optional(Warnings),
  }).pipe(ns),
).annotate({
  identifier: "GetTemplateSummaryOutput",
}) as any as S.Schema<GetTemplateSummaryOutput>;
export type StackIdList = string[];
export const StackIdList = /*@__PURE__*/ S.Array(S.String);
export type StackIdsUrl = string;
export interface ImportStacksToStackSetInput {
  StackSetName?: string;
  StackIds?: string[];
  StackIdsUrl?: string;
  OrganizationalUnitIds?: string[];
  OperationPreferences?: StackSetOperationPreferences;
  OperationId?: string;
  CallAs?: CallAs;
}
export const ImportStacksToStackSetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSetName: S.optional(S.String),
    StackIds: S.optional(StackIdList),
    StackIdsUrl: S.optional(S.String),
    OrganizationalUnitIds: S.optional(OrganizationalUnitIdList),
    OperationPreferences: S.optional(StackSetOperationPreferences),
    OperationId: S.optional(S.String).pipe(T.IdempotencyToken()),
    CallAs: S.optional(CallAs),
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
  identifier: "ImportStacksToStackSetInput",
}) as any as S.Schema<ImportStacksToStackSetInput>;
export interface ImportStacksToStackSetOutput {
  OperationId?: string;
}
export const ImportStacksToStackSetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "ImportStacksToStackSetOutput",
}) as any as S.Schema<ImportStacksToStackSetOutput>;
export interface ListChangeSetsInput {
  StackName?: string;
  NextToken?: string;
}
export const ListChangeSetsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
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
  identifier: "ListChangeSetsInput",
}) as any as S.Schema<ListChangeSetsInput>;
export interface ChangeSetSummary {
  StackId?: string;
  StackName?: string;
  ChangeSetId?: string;
  ChangeSetName?: string;
  ExecutionStatus?: ExecutionStatus;
  Status?: ChangeSetStatus;
  StatusReason?: string;
  CreationTime?: Date;
  Description?: string;
  IncludeNestedStacks?: boolean;
  ParentChangeSetId?: string;
  RootChangeSetId?: string;
  ImportExistingResources?: boolean;
}
export const ChangeSetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackId: S.optional(S.String),
    StackName: S.optional(S.String),
    ChangeSetId: S.optional(S.String),
    ChangeSetName: S.optional(S.String),
    ExecutionStatus: S.optional(ExecutionStatus),
    Status: S.optional(ChangeSetStatus),
    StatusReason: S.optional(S.String),
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    IncludeNestedStacks: S.optional(S.Boolean),
    ParentChangeSetId: S.optional(S.String),
    RootChangeSetId: S.optional(S.String),
    ImportExistingResources: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ChangeSetSummary",
}) as any as S.Schema<ChangeSetSummary>;
export type ChangeSetSummaries = ChangeSetSummary[];
export const ChangeSetSummaries = /*@__PURE__*/ S.Array(ChangeSetSummary);
export interface ListChangeSetsOutput {
  Summaries?: ChangeSetSummary[];
  NextToken?: string;
}
export const ListChangeSetsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Summaries: S.optional(ChangeSetSummaries),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListChangeSetsOutput",
}) as any as S.Schema<ListChangeSetsOutput>;
export interface ListExportsInput {
  NextToken?: string;
}
export const ListExportsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String) }).pipe(
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
  identifier: "ListExportsInput",
}) as any as S.Schema<ListExportsInput>;
export type ExportValue = string;
export interface Export {
  ExportingStackId?: string;
  Name?: string;
  Value?: string;
}
export const Export = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportingStackId: S.optional(S.String),
    Name: S.optional(S.String),
    Value: S.optional(S.String),
  }),
).annotate({ identifier: "Export" }) as any as S.Schema<Export>;
export type Exports = Export[];
export const Exports = /*@__PURE__*/ S.Array(Export);
export interface ListExportsOutput {
  Exports?: Export[];
  NextToken?: string;
}
export const ListExportsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Exports: S.optional(Exports),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListExportsOutput",
}) as any as S.Schema<ListExportsOutput>;
export type MaxResults = number;
export interface ListGeneratedTemplatesInput {
  NextToken?: string;
  MaxResults?: number;
}
export const ListGeneratedTemplatesInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "ListGeneratedTemplatesInput",
}) as any as S.Schema<ListGeneratedTemplatesInput>;
export type NumberOfResources = number;
export interface TemplateSummary {
  GeneratedTemplateId?: string;
  GeneratedTemplateName?: string;
  Status?: GeneratedTemplateStatus;
  StatusReason?: string;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
  NumberOfResources?: number;
}
export const TemplateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GeneratedTemplateId: S.optional(S.String),
    GeneratedTemplateName: S.optional(S.String),
    Status: S.optional(GeneratedTemplateStatus),
    StatusReason: S.optional(S.String),
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastUpdatedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    NumberOfResources: S.optional(S.Number),
  }),
).annotate({
  identifier: "TemplateSummary",
}) as any as S.Schema<TemplateSummary>;
export type TemplateSummaries = TemplateSummary[];
export const TemplateSummaries = /*@__PURE__*/ S.Array(TemplateSummary);
export interface ListGeneratedTemplatesOutput {
  Summaries?: TemplateSummary[];
  NextToken?: string;
}
export const ListGeneratedTemplatesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Summaries: S.optional(TemplateSummaries),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListGeneratedTemplatesOutput",
}) as any as S.Schema<ListGeneratedTemplatesOutput>;
export type ListHookResultsTargetType =
  | "CHANGE_SET"
  | "STACK"
  | "RESOURCE"
  | "CLOUD_CONTROL"
  | (string & {});
export const ListHookResultsTargetType = /*@__PURE__*/ S.String;

export type HookResultId = string;
export interface ListHookResultsInput {
  TargetType?: ListHookResultsTargetType;
  TargetId?: string;
  TypeArn?: string;
  Status?: HookStatus;
  NextToken?: string;
}
export const ListHookResultsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetType: S.optional(ListHookResultsTargetType),
    TargetId: S.optional(S.String),
    TypeArn: S.optional(S.String),
    Status: S.optional(HookStatus),
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
  identifier: "ListHookResultsInput",
}) as any as S.Schema<ListHookResultsInput>;
export interface HookResultSummary {
  HookResultId?: string;
  InvocationPoint?: HookInvocationPoint;
  FailureMode?: HookFailureMode;
  TypeName?: string;
  TypeVersionId?: string;
  TypeConfigurationVersionId?: string;
  Status?: HookStatus;
  HookStatusReason?: string;
  InvokedAt?: Date;
  TargetType?: ListHookResultsTargetType;
  TargetId?: string;
  TypeArn?: string;
  HookExecutionTarget?: string;
}
export const HookResultSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HookResultId: S.optional(S.String),
    InvocationPoint: S.optional(HookInvocationPoint),
    FailureMode: S.optional(HookFailureMode),
    TypeName: S.optional(S.String),
    TypeVersionId: S.optional(S.String),
    TypeConfigurationVersionId: S.optional(S.String),
    Status: S.optional(HookStatus),
    HookStatusReason: S.optional(S.String),
    InvokedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    TargetType: S.optional(ListHookResultsTargetType),
    TargetId: S.optional(S.String),
    TypeArn: S.optional(S.String),
    HookExecutionTarget: S.optional(S.String),
  }),
).annotate({
  identifier: "HookResultSummary",
}) as any as S.Schema<HookResultSummary>;
export type HookResultSummaries = HookResultSummary[];
export const HookResultSummaries = /*@__PURE__*/ S.Array(HookResultSummary);
export interface ListHookResultsOutput {
  TargetType?: ListHookResultsTargetType;
  TargetId?: string;
  HookResults?: HookResultSummary[];
  NextToken?: string;
}
export const ListHookResultsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetType: S.optional(ListHookResultsTargetType),
    TargetId: S.optional(S.String),
    HookResults: S.optional(HookResultSummaries),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListHookResultsOutput",
}) as any as S.Schema<ListHookResultsOutput>;
export interface ListImportsInput {
  ExportName?: string;
  NextToken?: string;
}
export const ListImportsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportName: S.optional(S.String),
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
  identifier: "ListImportsInput",
}) as any as S.Schema<ListImportsInput>;
export type Imports = string[];
export const Imports = /*@__PURE__*/ S.Array(S.String);
export interface ListImportsOutput {
  Imports?: string[];
  NextToken?: string;
}
export const ListImportsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Imports: S.optional(Imports),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListImportsOutput",
}) as any as S.Schema<ListImportsOutput>;
export type JazzResourceIdentifierPropertyKey = string;
export type JazzResourceIdentifierPropertyValue = string;
export type JazzResourceIdentifierProperties = {
  [key: string]: string | undefined;
};
export const JazzResourceIdentifierProperties = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ScannedResourceIdentifier {
  ResourceType?: string;
  ResourceIdentifier?: { [key: string]: string | undefined };
}
export const ScannedResourceIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceType: S.optional(S.String),
    ResourceIdentifier: S.optional(JazzResourceIdentifierProperties),
  }),
).annotate({
  identifier: "ScannedResourceIdentifier",
}) as any as S.Schema<ScannedResourceIdentifier>;
export type ScannedResourceIdentifiers = ScannedResourceIdentifier[];
export const ScannedResourceIdentifiers = /*@__PURE__*/ S.Array(
  ScannedResourceIdentifier,
);
export interface ListResourceScanRelatedResourcesInput {
  ResourceScanId?: string;
  Resources?: ScannedResourceIdentifier[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListResourceScanRelatedResourcesInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ResourceScanId: S.optional(S.String),
      Resources: S.optional(ScannedResourceIdentifiers),
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
  identifier: "ListResourceScanRelatedResourcesInput",
}) as any as S.Schema<ListResourceScanRelatedResourcesInput>;
export type ManagedByStack = boolean;
export interface ScannedResource {
  ResourceType?: string;
  ResourceIdentifier?: { [key: string]: string | undefined };
  ManagedByStack?: boolean;
}
export const ScannedResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceType: S.optional(S.String),
    ResourceIdentifier: S.optional(JazzResourceIdentifierProperties),
    ManagedByStack: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ScannedResource",
}) as any as S.Schema<ScannedResource>;
export type RelatedResources = ScannedResource[];
export const RelatedResources = /*@__PURE__*/ S.Array(ScannedResource);
export interface ListResourceScanRelatedResourcesOutput {
  RelatedResources?: ScannedResource[];
  NextToken?: string;
}
export const ListResourceScanRelatedResourcesOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RelatedResources: S.optional(RelatedResources),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListResourceScanRelatedResourcesOutput",
}) as any as S.Schema<ListResourceScanRelatedResourcesOutput>;
export type ResourceIdentifier = string;
export type ResourceTypePrefix = string;
export type ResourceScannerMaxResults = number;
export interface ListResourceScanResourcesInput {
  ResourceScanId?: string;
  ResourceIdentifier?: string;
  ResourceTypePrefix?: string;
  TagKey?: string;
  TagValue?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListResourceScanResourcesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceScanId: S.optional(S.String),
    ResourceIdentifier: S.optional(S.String),
    ResourceTypePrefix: S.optional(S.String),
    TagKey: S.optional(S.String),
    TagValue: S.optional(S.String),
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
  identifier: "ListResourceScanResourcesInput",
}) as any as S.Schema<ListResourceScanResourcesInput>;
export type ScannedResources = ScannedResource[];
export const ScannedResources = /*@__PURE__*/ S.Array(ScannedResource);
export interface ListResourceScanResourcesOutput {
  Resources?: ScannedResource[];
  NextToken?: string;
}
export const ListResourceScanResourcesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Resources: S.optional(ScannedResources),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListResourceScanResourcesOutput",
}) as any as S.Schema<ListResourceScanResourcesOutput>;
export type ScanType = "FULL" | "PARTIAL" | (string & {});
export const ScanType = /*@__PURE__*/ S.String;

export interface ListResourceScansInput {
  NextToken?: string;
  MaxResults?: number;
  ScanTypeFilter?: ScanType;
}
export const ListResourceScansInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    ScanTypeFilter: S.optional(ScanType),
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
  identifier: "ListResourceScansInput",
}) as any as S.Schema<ListResourceScansInput>;
export interface ResourceScanSummary {
  ResourceScanId?: string;
  Status?: ResourceScanStatus;
  StatusReason?: string;
  StartTime?: Date;
  EndTime?: Date;
  PercentageCompleted?: number;
  ScanType?: ScanType;
}
export const ResourceScanSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceScanId: S.optional(S.String),
    Status: S.optional(ResourceScanStatus),
    StatusReason: S.optional(S.String),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    PercentageCompleted: S.optional(S.Number),
    ScanType: S.optional(ScanType),
  }),
).annotate({
  identifier: "ResourceScanSummary",
}) as any as S.Schema<ResourceScanSummary>;
export type ResourceScanSummaries = ResourceScanSummary[];
export const ResourceScanSummaries = /*@__PURE__*/ S.Array(ResourceScanSummary);
export interface ListResourceScansOutput {
  ResourceScanSummaries?: ResourceScanSummary[];
  NextToken?: string;
}
export const ListResourceScansOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceScanSummaries: S.optional(ResourceScanSummaries),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListResourceScansOutput",
}) as any as S.Schema<ListResourceScansOutput>;
export interface ListStackInstanceResourceDriftsInput {
  StackSetName?: string;
  NextToken?: string;
  MaxResults?: number;
  StackInstanceResourceDriftStatuses?: StackResourceDriftStatus[];
  StackInstanceAccount?: string;
  StackInstanceRegion?: string;
  OperationId?: string;
  CallAs?: CallAs;
}
export const ListStackInstanceResourceDriftsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StackSetName: S.optional(S.String),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
      StackInstanceResourceDriftStatuses: S.optional(
        StackResourceDriftStatusFilters,
      ),
      StackInstanceAccount: S.optional(S.String),
      StackInstanceRegion: S.optional(S.String),
      OperationId: S.optional(S.String),
      CallAs: S.optional(CallAs),
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
  identifier: "ListStackInstanceResourceDriftsInput",
}) as any as S.Schema<ListStackInstanceResourceDriftsInput>;
export interface StackInstanceResourceDriftsSummary {
  StackId?: string;
  LogicalResourceId?: string;
  PhysicalResourceId?: string;
  PhysicalResourceIdContext?: PhysicalResourceIdContextKeyValuePair[];
  ResourceType?: string;
  PropertyDifferences?: PropertyDifference[];
  StackResourceDriftStatus?: StackResourceDriftStatus;
  Timestamp?: Date;
}
export const StackInstanceResourceDriftsSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackId: S.optional(S.String),
    LogicalResourceId: S.optional(S.String),
    PhysicalResourceId: S.optional(S.String),
    PhysicalResourceIdContext: S.optional(PhysicalResourceIdContext),
    ResourceType: S.optional(S.String),
    PropertyDifferences: S.optional(PropertyDifferences),
    StackResourceDriftStatus: S.optional(StackResourceDriftStatus),
    Timestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "StackInstanceResourceDriftsSummary",
}) as any as S.Schema<StackInstanceResourceDriftsSummary>;
export type StackInstanceResourceDriftsSummaries =
  StackInstanceResourceDriftsSummary[];
export const StackInstanceResourceDriftsSummaries = /*@__PURE__*/ S.Array(
  StackInstanceResourceDriftsSummary,
);
export interface ListStackInstanceResourceDriftsOutput {
  Summaries?: (StackInstanceResourceDriftsSummary & {
    StackId: StackId;
    LogicalResourceId: LogicalResourceId;
    ResourceType: ResourceType;
    StackResourceDriftStatus: StackResourceDriftStatus;
    Timestamp: Date;
    PhysicalResourceIdContext: (PhysicalResourceIdContextKeyValuePair & {
      Key: Key;
      Value: Value;
    })[];
    PropertyDifferences: (PropertyDifference & {
      PropertyPath: PropertyPath;
      ExpectedValue: PropertyValue;
      ActualValue: PropertyValue;
      DifferenceType: DifferenceType;
    })[];
  })[];
  NextToken?: string;
}
export const ListStackInstanceResourceDriftsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Summaries: S.optional(StackInstanceResourceDriftsSummaries),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListStackInstanceResourceDriftsOutput",
}) as any as S.Schema<ListStackInstanceResourceDriftsOutput>;
export type StackInstanceFilterName =
  | "DETAILED_STATUS"
  | "LAST_OPERATION_ID"
  | "DRIFT_STATUS"
  | (string & {});
export const StackInstanceFilterName = /*@__PURE__*/ S.String;

export type StackInstanceFilterValues = string;
export interface StackInstanceFilter {
  Name?: StackInstanceFilterName;
  Values?: string;
}
export const StackInstanceFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(StackInstanceFilterName),
    Values: S.optional(S.String),
  }),
).annotate({
  identifier: "StackInstanceFilter",
}) as any as S.Schema<StackInstanceFilter>;
export type StackInstanceFilters = StackInstanceFilter[];
export const StackInstanceFilters = /*@__PURE__*/ S.Array(StackInstanceFilter);
export interface ListStackInstancesInput {
  StackSetName?: string;
  NextToken?: string;
  MaxResults?: number;
  Filters?: StackInstanceFilter[];
  StackInstanceAccount?: string;
  StackInstanceRegion?: string;
  CallAs?: CallAs;
}
export const ListStackInstancesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSetName: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filters: S.optional(StackInstanceFilters),
    StackInstanceAccount: S.optional(S.String),
    StackInstanceRegion: S.optional(S.String),
    CallAs: S.optional(CallAs),
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
  identifier: "ListStackInstancesInput",
}) as any as S.Schema<ListStackInstancesInput>;
export interface StackInstanceSummary {
  StackSetId?: string;
  Region?: string;
  Account?: string;
  StackId?: string;
  Status?: StackInstanceStatus;
  StatusReason?: string;
  StackInstanceStatus?: StackInstanceComprehensiveStatus;
  OrganizationalUnitId?: string;
  DriftStatus?: StackDriftStatus;
  LastDriftCheckTimestamp?: Date;
  LastOperationId?: string;
}
export const StackInstanceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSetId: S.optional(S.String),
    Region: S.optional(S.String),
    Account: S.optional(S.String),
    StackId: S.optional(S.String),
    Status: S.optional(StackInstanceStatus),
    StatusReason: S.optional(S.String),
    StackInstanceStatus: S.optional(StackInstanceComprehensiveStatus),
    OrganizationalUnitId: S.optional(S.String),
    DriftStatus: S.optional(StackDriftStatus),
    LastDriftCheckTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastOperationId: S.optional(S.String),
  }),
).annotate({
  identifier: "StackInstanceSummary",
}) as any as S.Schema<StackInstanceSummary>;
export type StackInstanceSummaries = StackInstanceSummary[];
export const StackInstanceSummaries =
  /*@__PURE__*/ S.Array(StackInstanceSummary);
export interface ListStackInstancesOutput {
  Summaries?: StackInstanceSummary[];
  NextToken?: string;
}
export const ListStackInstancesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Summaries: S.optional(StackInstanceSummaries),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListStackInstancesOutput",
}) as any as S.Schema<ListStackInstancesOutput>;
export interface ListStackRefactorActionsInput {
  StackRefactorId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListStackRefactorActionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackRefactorId: S.optional(S.String),
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
  identifier: "ListStackRefactorActionsInput",
}) as any as S.Schema<ListStackRefactorActionsInput>;
export type StackRefactorActionType = "MOVE" | "CREATE" | (string & {});
export const StackRefactorActionType = /*@__PURE__*/ S.String;

export type StackRefactorActionEntity = "RESOURCE" | "STACK" | (string & {});
export const StackRefactorActionEntity = /*@__PURE__*/ S.String;

export type StackRefactorResourceIdentifier = string;
export type StackRefactorDetection = "AUTO" | "MANUAL" | (string & {});
export const StackRefactorDetection = /*@__PURE__*/ S.String;

export type DetectionReason = string;
export type StackRefactorTagResources = Tag[];
export const StackRefactorTagResources = /*@__PURE__*/ S.Array(Tag);
export type StackRefactorUntagResources = string[];
export const StackRefactorUntagResources = /*@__PURE__*/ S.Array(S.String);
export interface StackRefactorAction {
  Action?: StackRefactorActionType;
  Entity?: StackRefactorActionEntity;
  PhysicalResourceId?: string;
  ResourceIdentifier?: string;
  Description?: string;
  Detection?: StackRefactorDetection;
  DetectionReason?: string;
  TagResources?: Tag[];
  UntagResources?: string[];
  ResourceMapping?: ResourceMapping;
}
export const StackRefactorAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(StackRefactorActionType),
    Entity: S.optional(StackRefactorActionEntity),
    PhysicalResourceId: S.optional(S.String),
    ResourceIdentifier: S.optional(S.String),
    Description: S.optional(S.String),
    Detection: S.optional(StackRefactorDetection),
    DetectionReason: S.optional(S.String),
    TagResources: S.optional(StackRefactorTagResources),
    UntagResources: S.optional(StackRefactorUntagResources),
    ResourceMapping: S.optional(ResourceMapping),
  }),
).annotate({
  identifier: "StackRefactorAction",
}) as any as S.Schema<StackRefactorAction>;
export type StackRefactorActions = StackRefactorAction[];
export const StackRefactorActions = /*@__PURE__*/ S.Array(StackRefactorAction);
export interface ListStackRefactorActionsOutput {
  StackRefactorActions: (StackRefactorAction & {
    TagResources: (Tag & { Key: TagKey; Value: TagValue })[];
    ResourceMapping: ResourceMapping & {
      Source: ResourceLocation & {
        StackName: StackName;
        LogicalResourceId: LogicalResourceId;
      };
      Destination: ResourceLocation & {
        StackName: StackName;
        LogicalResourceId: LogicalResourceId;
      };
    };
  })[];
  NextToken?: string;
}
export const ListStackRefactorActionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackRefactorActions: S.optional(StackRefactorActions),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListStackRefactorActionsOutput",
}) as any as S.Schema<ListStackRefactorActionsOutput>;
export type StackRefactorExecutionStatusFilter = StackRefactorExecutionStatus[];
export const StackRefactorExecutionStatusFilter = /*@__PURE__*/ S.Array(
  StackRefactorExecutionStatus,
);
export interface ListStackRefactorsInput {
  ExecutionStatusFilter?: StackRefactorExecutionStatus[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListStackRefactorsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExecutionStatusFilter: S.optional(StackRefactorExecutionStatusFilter),
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
  identifier: "ListStackRefactorsInput",
}) as any as S.Schema<ListStackRefactorsInput>;
export interface StackRefactorSummary {
  StackRefactorId?: string;
  Description?: string;
  ExecutionStatus?: StackRefactorExecutionStatus;
  ExecutionStatusReason?: string;
  Status?: StackRefactorStatus;
  StatusReason?: string;
}
export const StackRefactorSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackRefactorId: S.optional(S.String),
    Description: S.optional(S.String),
    ExecutionStatus: S.optional(StackRefactorExecutionStatus),
    ExecutionStatusReason: S.optional(S.String),
    Status: S.optional(StackRefactorStatus),
    StatusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "StackRefactorSummary",
}) as any as S.Schema<StackRefactorSummary>;
export type StackRefactorSummaries = StackRefactorSummary[];
export const StackRefactorSummaries =
  /*@__PURE__*/ S.Array(StackRefactorSummary);
export interface ListStackRefactorsOutput {
  StackRefactorSummaries: StackRefactorSummary[];
  NextToken?: string;
}
export const ListStackRefactorsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackRefactorSummaries: S.optional(StackRefactorSummaries),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListStackRefactorsOutput",
}) as any as S.Schema<ListStackRefactorsOutput>;
export interface ListStackResourcesInput {
  StackName?: string;
  NextToken?: string;
}
export const ListStackResourcesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
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
  identifier: "ListStackResourcesInput",
}) as any as S.Schema<ListStackResourcesInput>;
export interface StackResourceDriftInformationSummary {
  StackResourceDriftStatus?: StackResourceDriftStatus;
  LastCheckTimestamp?: Date;
}
export const StackResourceDriftInformationSummary = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StackResourceDriftStatus: S.optional(StackResourceDriftStatus),
      LastCheckTimestamp: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
    }),
).annotate({
  identifier: "StackResourceDriftInformationSummary",
}) as any as S.Schema<StackResourceDriftInformationSummary>;
export interface StackResourceSummary {
  LogicalResourceId?: string;
  PhysicalResourceId?: string;
  ResourceType?: string;
  LastUpdatedTimestamp?: Date;
  ResourceStatus?: ResourceStatus;
  ResourceStatusReason?: string;
  DriftInformation?: StackResourceDriftInformationSummary;
  ModuleInfo?: ModuleInfo;
}
export const StackResourceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogicalResourceId: S.optional(S.String),
    PhysicalResourceId: S.optional(S.String),
    ResourceType: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ResourceStatus: S.optional(ResourceStatus),
    ResourceStatusReason: S.optional(S.String),
    DriftInformation: S.optional(StackResourceDriftInformationSummary),
    ModuleInfo: S.optional(ModuleInfo),
  }),
).annotate({
  identifier: "StackResourceSummary",
}) as any as S.Schema<StackResourceSummary>;
export type StackResourceSummaries = StackResourceSummary[];
export const StackResourceSummaries =
  /*@__PURE__*/ S.Array(StackResourceSummary);
export interface ListStackResourcesOutput {
  StackResourceSummaries?: (StackResourceSummary & {
    LogicalResourceId: LogicalResourceId;
    ResourceType: ResourceType;
    LastUpdatedTimestamp: Date;
    ResourceStatus: ResourceStatus;
    DriftInformation: StackResourceDriftInformationSummary & {
      StackResourceDriftStatus: StackResourceDriftStatus;
    };
  })[];
  NextToken?: string;
}
export const ListStackResourcesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackResourceSummaries: S.optional(StackResourceSummaries),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListStackResourcesOutput",
}) as any as S.Schema<ListStackResourcesOutput>;
export type StackStatusFilter = StackStatus[];
export const StackStatusFilter = /*@__PURE__*/ S.Array(StackStatus);
export interface ListStacksInput {
  NextToken?: string;
  StackStatusFilter?: StackStatus[];
}
export const ListStacksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    StackStatusFilter: S.optional(StackStatusFilter),
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
  identifier: "ListStacksInput",
}) as any as S.Schema<ListStacksInput>;
export type TemplateDescription = string;
export interface StackDriftInformationSummary {
  StackDriftStatus?: StackDriftStatus;
  LastCheckTimestamp?: Date;
}
export const StackDriftInformationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackDriftStatus: S.optional(StackDriftStatus),
    LastCheckTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "StackDriftInformationSummary",
}) as any as S.Schema<StackDriftInformationSummary>;
export interface StackSummary {
  StackId?: string;
  StackName?: string;
  TemplateDescription?: string;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
  DeletionTime?: Date;
  StackStatus?: StackStatus;
  StackStatusReason?: string;
  ParentId?: string;
  RootId?: string;
  DriftInformation?: StackDriftInformationSummary;
  LastOperations?: OperationEntry[];
}
export const StackSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackId: S.optional(S.String),
    StackName: S.optional(S.String),
    TemplateDescription: S.optional(S.String),
    CreationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastUpdatedTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DeletionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    StackStatus: S.optional(StackStatus),
    StackStatusReason: S.optional(S.String),
    ParentId: S.optional(S.String),
    RootId: S.optional(S.String),
    DriftInformation: S.optional(StackDriftInformationSummary),
    LastOperations: S.optional(LastOperations),
  }),
).annotate({ identifier: "StackSummary" }) as any as S.Schema<StackSummary>;
export type StackSummaries = StackSummary[];
export const StackSummaries = /*@__PURE__*/ S.Array(StackSummary);
export interface ListStacksOutput {
  StackSummaries?: (StackSummary & {
    StackName: StackName;
    CreationTime: CreationTime;
    StackStatus: StackStatus;
    DriftInformation: StackDriftInformationSummary & {
      StackDriftStatus: StackDriftStatus;
    };
  })[];
  NextToken?: string;
}
export const ListStacksOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSummaries: S.optional(StackSummaries),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListStacksOutput",
}) as any as S.Schema<ListStacksOutput>;
export interface ListStackSetAutoDeploymentTargetsInput {
  StackSetName?: string;
  NextToken?: string;
  MaxResults?: number;
  CallAs?: CallAs;
}
export const ListStackSetAutoDeploymentTargetsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StackSetName: S.optional(S.String),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
      CallAs: S.optional(CallAs),
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
  identifier: "ListStackSetAutoDeploymentTargetsInput",
}) as any as S.Schema<ListStackSetAutoDeploymentTargetsInput>;
export interface StackSetAutoDeploymentTargetSummary {
  OrganizationalUnitId?: string;
  Regions?: string[];
}
export const StackSetAutoDeploymentTargetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OrganizationalUnitId: S.optional(S.String),
    Regions: S.optional(RegionList),
  }),
).annotate({
  identifier: "StackSetAutoDeploymentTargetSummary",
}) as any as S.Schema<StackSetAutoDeploymentTargetSummary>;
export type StackSetAutoDeploymentTargetSummaries =
  StackSetAutoDeploymentTargetSummary[];
export const StackSetAutoDeploymentTargetSummaries = /*@__PURE__*/ S.Array(
  StackSetAutoDeploymentTargetSummary,
);
export interface ListStackSetAutoDeploymentTargetsOutput {
  Summaries?: StackSetAutoDeploymentTargetSummary[];
  NextToken?: string;
}
export const ListStackSetAutoDeploymentTargetsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Summaries: S.optional(StackSetAutoDeploymentTargetSummaries),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListStackSetAutoDeploymentTargetsOutput",
}) as any as S.Schema<ListStackSetAutoDeploymentTargetsOutput>;
export type OperationResultFilterName =
  | "OPERATION_RESULT_STATUS"
  | (string & {});
export const OperationResultFilterName = /*@__PURE__*/ S.String;

export type OperationResultFilterValues = string;
export interface OperationResultFilter {
  Name?: OperationResultFilterName;
  Values?: string;
}
export const OperationResultFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(OperationResultFilterName),
    Values: S.optional(S.String),
  }),
).annotate({
  identifier: "OperationResultFilter",
}) as any as S.Schema<OperationResultFilter>;
export type OperationResultFilters = OperationResultFilter[];
export const OperationResultFilters = /*@__PURE__*/ S.Array(
  OperationResultFilter,
);
export interface ListStackSetOperationResultsInput {
  StackSetName?: string;
  OperationId?: string;
  NextToken?: string;
  MaxResults?: number;
  CallAs?: CallAs;
  Filters?: OperationResultFilter[];
}
export const ListStackSetOperationResultsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSetName: S.optional(S.String),
    OperationId: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    CallAs: S.optional(CallAs),
    Filters: S.optional(OperationResultFilters),
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
  identifier: "ListStackSetOperationResultsInput",
}) as any as S.Schema<ListStackSetOperationResultsInput>;
export type StackSetOperationResultStatus =
  | "PENDING"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELLED"
  | (string & {});
export const StackSetOperationResultStatus = /*@__PURE__*/ S.String;

export type AccountGateStatus =
  | "SUCCEEDED"
  | "FAILED"
  | "SKIPPED"
  | (string & {});
export const AccountGateStatus = /*@__PURE__*/ S.String;

export type AccountGateStatusReason = string;
export interface AccountGateResult {
  Status?: AccountGateStatus;
  StatusReason?: string;
}
export const AccountGateResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(AccountGateStatus),
    StatusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "AccountGateResult",
}) as any as S.Schema<AccountGateResult>;
export interface StackSetOperationResultSummary {
  Account?: string;
  Region?: string;
  Status?: StackSetOperationResultStatus;
  StatusReason?: string;
  AccountGateResult?: AccountGateResult;
  OrganizationalUnitId?: string;
}
export const StackSetOperationResultSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Account: S.optional(S.String),
    Region: S.optional(S.String),
    Status: S.optional(StackSetOperationResultStatus),
    StatusReason: S.optional(S.String),
    AccountGateResult: S.optional(AccountGateResult),
    OrganizationalUnitId: S.optional(S.String),
  }),
).annotate({
  identifier: "StackSetOperationResultSummary",
}) as any as S.Schema<StackSetOperationResultSummary>;
export type StackSetOperationResultSummaries = StackSetOperationResultSummary[];
export const StackSetOperationResultSummaries = /*@__PURE__*/ S.Array(
  StackSetOperationResultSummary,
);
export interface ListStackSetOperationResultsOutput {
  Summaries?: StackSetOperationResultSummary[];
  NextToken?: string;
}
export const ListStackSetOperationResultsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Summaries: S.optional(StackSetOperationResultSummaries),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListStackSetOperationResultsOutput",
}) as any as S.Schema<ListStackSetOperationResultsOutput>;
export interface ListStackSetOperationsInput {
  StackSetName?: string;
  NextToken?: string;
  MaxResults?: number;
  CallAs?: CallAs;
}
export const ListStackSetOperationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSetName: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    CallAs: S.optional(CallAs),
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
  identifier: "ListStackSetOperationsInput",
}) as any as S.Schema<ListStackSetOperationsInput>;
export interface StackSetOperationSummary {
  OperationId?: string;
  Action?: StackSetOperationAction;
  Status?: StackSetOperationStatus;
  CreationTimestamp?: Date;
  EndTimestamp?: Date;
  StatusReason?: string;
  StatusDetails?: StackSetOperationStatusDetails;
  OperationPreferences?: StackSetOperationPreferences;
}
export const StackSetOperationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OperationId: S.optional(S.String),
    Action: S.optional(StackSetOperationAction),
    Status: S.optional(StackSetOperationStatus),
    CreationTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    StatusReason: S.optional(S.String),
    StatusDetails: S.optional(StackSetOperationStatusDetails),
    OperationPreferences: S.optional(StackSetOperationPreferences),
  }),
).annotate({
  identifier: "StackSetOperationSummary",
}) as any as S.Schema<StackSetOperationSummary>;
export type StackSetOperationSummaries = StackSetOperationSummary[];
export const StackSetOperationSummaries = /*@__PURE__*/ S.Array(
  StackSetOperationSummary,
);
export interface ListStackSetOperationsOutput {
  Summaries?: StackSetOperationSummary[];
  NextToken?: string;
}
export const ListStackSetOperationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Summaries: S.optional(StackSetOperationSummaries),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListStackSetOperationsOutput",
}) as any as S.Schema<ListStackSetOperationsOutput>;
export interface ListStackSetsInput {
  NextToken?: string;
  MaxResults?: number;
  Status?: StackSetStatus;
  CallAs?: CallAs;
}
export const ListStackSetsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Status: S.optional(StackSetStatus),
    CallAs: S.optional(CallAs),
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
  identifier: "ListStackSetsInput",
}) as any as S.Schema<ListStackSetsInput>;
export interface StackSetSummary {
  StackSetName?: string;
  StackSetId?: string;
  Description?: string;
  Status?: StackSetStatus;
  AutoDeployment?: AutoDeployment;
  PermissionModel?: PermissionModels;
  DriftStatus?: StackDriftStatus;
  LastDriftCheckTimestamp?: Date;
  ManagedExecution?: ManagedExecution;
}
export const StackSetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSetName: S.optional(S.String),
    StackSetId: S.optional(S.String),
    Description: S.optional(S.String),
    Status: S.optional(StackSetStatus),
    AutoDeployment: S.optional(AutoDeployment),
    PermissionModel: S.optional(PermissionModels),
    DriftStatus: S.optional(StackDriftStatus),
    LastDriftCheckTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ManagedExecution: S.optional(ManagedExecution),
  }),
).annotate({
  identifier: "StackSetSummary",
}) as any as S.Schema<StackSetSummary>;
export type StackSetSummaries = StackSetSummary[];
export const StackSetSummaries = /*@__PURE__*/ S.Array(StackSetSummary);
export interface ListStackSetsOutput {
  Summaries?: StackSetSummary[];
  NextToken?: string;
}
export const ListStackSetsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Summaries: S.optional(StackSetSummaries),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListStackSetsOutput",
}) as any as S.Schema<ListStackSetsOutput>;
export interface ListTypeRegistrationsInput {
  Type?: RegistryType;
  TypeName?: string;
  TypeArn?: string;
  RegistrationStatusFilter?: RegistrationStatus;
  MaxResults?: number;
  NextToken?: string;
}
export const ListTypeRegistrationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(RegistryType),
    TypeName: S.optional(S.String),
    TypeArn: S.optional(S.String),
    RegistrationStatusFilter: S.optional(RegistrationStatus),
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
  identifier: "ListTypeRegistrationsInput",
}) as any as S.Schema<ListTypeRegistrationsInput>;
export type RegistrationTokenList = string[];
export const RegistrationTokenList = /*@__PURE__*/ S.Array(S.String);
export interface ListTypeRegistrationsOutput {
  RegistrationTokenList?: string[];
  NextToken?: string;
}
export const ListTypeRegistrationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistrationTokenList: S.optional(RegistrationTokenList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListTypeRegistrationsOutput",
}) as any as S.Schema<ListTypeRegistrationsOutput>;
export type Category =
  | "REGISTERED"
  | "ACTIVATED"
  | "THIRD_PARTY"
  | "AWS_TYPES"
  | (string & {});
export const Category = /*@__PURE__*/ S.String;

export type TypeNamePrefix = string;
export interface TypeFilters {
  Category?: Category;
  PublisherId?: string;
  TypeNamePrefix?: string;
}
export const TypeFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Category: S.optional(Category),
    PublisherId: S.optional(S.String),
    TypeNamePrefix: S.optional(S.String),
  }),
).annotate({ identifier: "TypeFilters" }) as any as S.Schema<TypeFilters>;
export interface ListTypesInput {
  Visibility?: Visibility;
  ProvisioningType?: ProvisioningType;
  DeprecatedStatus?: DeprecatedStatus;
  Type?: RegistryType;
  Filters?: TypeFilters;
  MaxResults?: number;
  NextToken?: string;
}
export const ListTypesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Visibility: S.optional(Visibility),
    ProvisioningType: S.optional(ProvisioningType),
    DeprecatedStatus: S.optional(DeprecatedStatus),
    Type: S.optional(RegistryType),
    Filters: S.optional(TypeFilters),
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
).annotate({ identifier: "ListTypesInput" }) as any as S.Schema<ListTypesInput>;
export type PublisherName = string;
export interface TypeSummary {
  Type?: RegistryType;
  TypeName?: string;
  DefaultVersionId?: string;
  TypeArn?: string;
  LastUpdated?: Date;
  Description?: string;
  PublisherId?: string;
  OriginalTypeName?: string;
  PublicVersionNumber?: string;
  LatestPublicVersion?: string;
  PublisherIdentity?: IdentityProvider;
  PublisherName?: string;
  IsActivated?: boolean;
}
export const TypeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(RegistryType),
    TypeName: S.optional(S.String),
    DefaultVersionId: S.optional(S.String),
    TypeArn: S.optional(S.String),
    LastUpdated: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    PublisherId: S.optional(S.String),
    OriginalTypeName: S.optional(S.String),
    PublicVersionNumber: S.optional(S.String),
    LatestPublicVersion: S.optional(S.String),
    PublisherIdentity: S.optional(IdentityProvider),
    PublisherName: S.optional(S.String),
    IsActivated: S.optional(S.Boolean),
  }),
).annotate({ identifier: "TypeSummary" }) as any as S.Schema<TypeSummary>;
export type TypeSummaries = TypeSummary[];
export const TypeSummaries = /*@__PURE__*/ S.Array(TypeSummary);
export interface ListTypesOutput {
  TypeSummaries?: TypeSummary[];
  NextToken?: string;
}
export const ListTypesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TypeSummaries: S.optional(TypeSummaries),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListTypesOutput",
}) as any as S.Schema<ListTypesOutput>;
export interface ListTypeVersionsInput {
  Type?: RegistryType;
  TypeName?: string;
  Arn?: string;
  MaxResults?: number;
  NextToken?: string;
  DeprecatedStatus?: DeprecatedStatus;
  PublisherId?: string;
}
export const ListTypeVersionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(RegistryType),
    TypeName: S.optional(S.String),
    Arn: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    DeprecatedStatus: S.optional(DeprecatedStatus),
    PublisherId: S.optional(S.String),
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
  identifier: "ListTypeVersionsInput",
}) as any as S.Schema<ListTypeVersionsInput>;
export interface TypeVersionSummary {
  Type?: RegistryType;
  TypeName?: string;
  VersionId?: string;
  IsDefaultVersion?: boolean;
  Arn?: string;
  TimeCreated?: Date;
  Description?: string;
  PublicVersionNumber?: string;
}
export const TypeVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(RegistryType),
    TypeName: S.optional(S.String),
    VersionId: S.optional(S.String),
    IsDefaultVersion: S.optional(S.Boolean),
    Arn: S.optional(S.String),
    TimeCreated: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    PublicVersionNumber: S.optional(S.String),
  }),
).annotate({
  identifier: "TypeVersionSummary",
}) as any as S.Schema<TypeVersionSummary>;
export type TypeVersionSummaries = TypeVersionSummary[];
export const TypeVersionSummaries = /*@__PURE__*/ S.Array(TypeVersionSummary);
export interface ListTypeVersionsOutput {
  TypeVersionSummaries?: TypeVersionSummary[];
  NextToken?: string;
}
export const ListTypeVersionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TypeVersionSummaries: S.optional(TypeVersionSummaries),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListTypeVersionsOutput",
}) as any as S.Schema<ListTypeVersionsOutput>;
export interface PublishTypeInput {
  Type?: ThirdPartyType;
  Arn?: string;
  TypeName?: string;
  PublicVersionNumber?: string;
}
export const PublishTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(ThirdPartyType),
    Arn: S.optional(S.String),
    TypeName: S.optional(S.String),
    PublicVersionNumber: S.optional(S.String),
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
  identifier: "PublishTypeInput",
}) as any as S.Schema<PublishTypeInput>;
export interface PublishTypeOutput {
  PublicTypeArn?: string;
}
export const PublishTypeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PublicTypeArn: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "PublishTypeOutput",
}) as any as S.Schema<PublishTypeOutput>;
export type OperationStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "SUCCESS"
  | "FAILED"
  | (string & {});
export const OperationStatus = /*@__PURE__*/ S.String;

export type StatusMessage = string;
export type HandlerErrorCode =
  | "NotUpdatable"
  | "InvalidRequest"
  | "AccessDenied"
  | "InvalidCredentials"
  | "AlreadyExists"
  | "NotFound"
  | "ResourceConflict"
  | "Throttling"
  | "ServiceLimitExceeded"
  | "NotStabilized"
  | "GeneralServiceException"
  | "ServiceInternalError"
  | "NetworkFailure"
  | "InternalFailure"
  | "InvalidTypeConfiguration"
  | "HandlerInternalFailure"
  | "NonCompliant"
  | "Unknown"
  | "UnsupportedTarget"
  | (string & {});
export const HandlerErrorCode = /*@__PURE__*/ S.String;

export type ResourceModel = string;
export interface RecordHandlerProgressInput {
  BearerToken?: string;
  OperationStatus?: OperationStatus;
  CurrentOperationStatus?: OperationStatus;
  StatusMessage?: string;
  ErrorCode?: HandlerErrorCode;
  ResourceModel?: string;
  ClientRequestToken?: string;
}
export const RecordHandlerProgressInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BearerToken: S.optional(S.String),
    OperationStatus: S.optional(OperationStatus),
    CurrentOperationStatus: S.optional(OperationStatus),
    StatusMessage: S.optional(S.String),
    ErrorCode: S.optional(HandlerErrorCode),
    ResourceModel: S.optional(S.String),
    ClientRequestToken: S.optional(S.String),
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
  identifier: "RecordHandlerProgressInput",
}) as any as S.Schema<RecordHandlerProgressInput>;
export interface RecordHandlerProgressOutput {}
export const RecordHandlerProgressOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RecordHandlerProgressOutput",
}) as any as S.Schema<RecordHandlerProgressOutput>;
export type AcceptTermsAndConditions = boolean;
export type ConnectionArn = string;
export interface RegisterPublisherInput {
  AcceptTermsAndConditions?: boolean;
  ConnectionArn?: string;
}
export const RegisterPublisherInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceptTermsAndConditions: S.optional(S.Boolean),
    ConnectionArn: S.optional(S.String),
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
  identifier: "RegisterPublisherInput",
}) as any as S.Schema<RegisterPublisherInput>;
export interface RegisterPublisherOutput {
  PublisherId?: string;
}
export const RegisterPublisherOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PublisherId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "RegisterPublisherOutput",
}) as any as S.Schema<RegisterPublisherOutput>;
export type S3Url = string;
export type RequestToken = string;
export interface RegisterTypeInput {
  Type?: RegistryType;
  TypeName?: string;
  SchemaHandlerPackage?: string;
  LoggingConfig?: LoggingConfig;
  ExecutionRoleArn?: string;
  ClientRequestToken?: string;
}
export const RegisterTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(RegistryType),
    TypeName: S.optional(S.String),
    SchemaHandlerPackage: S.optional(S.String),
    LoggingConfig: S.optional(LoggingConfig),
    ExecutionRoleArn: S.optional(S.String),
    ClientRequestToken: S.optional(S.String),
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
  identifier: "RegisterTypeInput",
}) as any as S.Schema<RegisterTypeInput>;
export interface RegisterTypeOutput {
  RegistrationToken?: string;
}
export const RegisterTypeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegistrationToken: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "RegisterTypeOutput",
}) as any as S.Schema<RegisterTypeOutput>;
export interface RollbackStackInput {
  StackName?: string;
  RoleARN?: string;
  ClientRequestToken?: string;
  RetainExceptOnCreate?: boolean;
}
export const RollbackStackInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    RoleARN: S.optional(S.String),
    ClientRequestToken: S.optional(S.String),
    RetainExceptOnCreate: S.optional(S.Boolean),
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
  identifier: "RollbackStackInput",
}) as any as S.Schema<RollbackStackInput>;
export interface RollbackStackOutput {
  StackId?: string;
  OperationId?: string;
}
export const RollbackStackOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackId: S.optional(S.String),
    OperationId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "RollbackStackOutput",
}) as any as S.Schema<RollbackStackOutput>;
export interface SetStackPolicyInput {
  StackName?: string;
  StackPolicyBody?: string;
  StackPolicyURL?: string;
}
export const SetStackPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    StackPolicyBody: S.optional(S.String),
    StackPolicyURL: S.optional(S.String),
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
  identifier: "SetStackPolicyInput",
}) as any as S.Schema<SetStackPolicyInput>;
export interface SetStackPolicyResponse {}
export const SetStackPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "SetStackPolicyResponse",
}) as any as S.Schema<SetStackPolicyResponse>;
export interface SetTypeConfigurationInput {
  TypeArn?: string;
  Configuration?: string;
  ConfigurationAlias?: string;
  TypeName?: string;
  Type?: ThirdPartyType;
}
export const SetTypeConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TypeArn: S.optional(S.String),
    Configuration: S.optional(S.String),
    ConfigurationAlias: S.optional(S.String),
    TypeName: S.optional(S.String),
    Type: S.optional(ThirdPartyType),
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
  identifier: "SetTypeConfigurationInput",
}) as any as S.Schema<SetTypeConfigurationInput>;
export interface SetTypeConfigurationOutput {
  ConfigurationArn?: string;
}
export const SetTypeConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConfigurationArn: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "SetTypeConfigurationOutput",
}) as any as S.Schema<SetTypeConfigurationOutput>;
export interface SetTypeDefaultVersionInput {
  Arn?: string;
  Type?: RegistryType;
  TypeName?: string;
  VersionId?: string;
}
export const SetTypeDefaultVersionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Type: S.optional(RegistryType),
    TypeName: S.optional(S.String),
    VersionId: S.optional(S.String),
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
  identifier: "SetTypeDefaultVersionInput",
}) as any as S.Schema<SetTypeDefaultVersionInput>;
export interface SetTypeDefaultVersionOutput {}
export const SetTypeDefaultVersionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "SetTypeDefaultVersionOutput",
}) as any as S.Schema<SetTypeDefaultVersionOutput>;
export type ResourceSignalUniqueId = string;
export type ResourceSignalStatus = "SUCCESS" | "FAILURE" | (string & {});
export const ResourceSignalStatus = /*@__PURE__*/ S.String;

export interface SignalResourceInput {
  StackName?: string;
  LogicalResourceId?: string;
  UniqueId?: string;
  Status?: ResourceSignalStatus;
}
export const SignalResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    LogicalResourceId: S.optional(S.String),
    UniqueId: S.optional(S.String),
    Status: S.optional(ResourceSignalStatus),
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
  identifier: "SignalResourceInput",
}) as any as S.Schema<SignalResourceInput>;
export interface SignalResourceResponse {}
export const SignalResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "SignalResourceResponse",
}) as any as S.Schema<SignalResourceResponse>;
export interface StartResourceScanInput {
  ClientRequestToken?: string;
  ScanFilters?: ScanFilter[];
}
export const StartResourceScanInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientRequestToken: S.optional(S.String),
    ScanFilters: S.optional(ScanFilters),
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
  identifier: "StartResourceScanInput",
}) as any as S.Schema<StartResourceScanInput>;
export interface StartResourceScanOutput {
  ResourceScanId?: string;
}
export const StartResourceScanOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceScanId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StartResourceScanOutput",
}) as any as S.Schema<StartResourceScanOutput>;
export interface StopStackSetOperationInput {
  StackSetName?: string;
  OperationId?: string;
  CallAs?: CallAs;
}
export const StopStackSetOperationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSetName: S.optional(S.String),
    OperationId: S.optional(S.String),
    CallAs: S.optional(CallAs),
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
  identifier: "StopStackSetOperationInput",
}) as any as S.Schema<StopStackSetOperationInput>;
export interface StopStackSetOperationOutput {}
export const StopStackSetOperationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "StopStackSetOperationOutput",
}) as any as S.Schema<StopStackSetOperationOutput>;
export type S3Bucket = string;
export interface TestTypeInput {
  Arn?: string;
  Type?: ThirdPartyType;
  TypeName?: string;
  VersionId?: string;
  LogDeliveryBucket?: string;
}
export const TestTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Type: S.optional(ThirdPartyType),
    TypeName: S.optional(S.String),
    VersionId: S.optional(S.String),
    LogDeliveryBucket: S.optional(S.String),
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
).annotate({ identifier: "TestTypeInput" }) as any as S.Schema<TestTypeInput>;
export interface TestTypeOutput {
  TypeVersionArn?: string;
}
export const TestTypeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TypeVersionArn: S.optional(S.String) }).pipe(ns),
).annotate({ identifier: "TestTypeOutput" }) as any as S.Schema<TestTypeOutput>;
export type JazzLogicalResourceIds = string[];
export const JazzLogicalResourceIds = /*@__PURE__*/ S.Array(S.String);
export type RefreshAllResources = boolean;
export interface UpdateGeneratedTemplateInput {
  GeneratedTemplateName?: string;
  NewGeneratedTemplateName?: string;
  AddResources?: ResourceDefinition[];
  RemoveResources?: string[];
  RefreshAllResources?: boolean;
  TemplateConfiguration?: TemplateConfiguration;
}
export const UpdateGeneratedTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GeneratedTemplateName: S.optional(S.String),
    NewGeneratedTemplateName: S.optional(S.String),
    AddResources: S.optional(ResourceDefinitions),
    RemoveResources: S.optional(JazzLogicalResourceIds),
    RefreshAllResources: S.optional(S.Boolean),
    TemplateConfiguration: S.optional(TemplateConfiguration),
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
  identifier: "UpdateGeneratedTemplateInput",
}) as any as S.Schema<UpdateGeneratedTemplateInput>;
export interface UpdateGeneratedTemplateOutput {
  GeneratedTemplateId?: string;
}
export const UpdateGeneratedTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GeneratedTemplateId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateGeneratedTemplateOutput",
}) as any as S.Schema<UpdateGeneratedTemplateOutput>;
export type StackPolicyDuringUpdateBody = string;
export type StackPolicyDuringUpdateURL = string;
export interface UpdateStackInput {
  StackName?: string;
  TemplateBody?: string;
  TemplateURL?: string;
  UsePreviousTemplate?: boolean;
  StackPolicyDuringUpdateBody?: string;
  StackPolicyDuringUpdateURL?: string;
  Parameters?: Parameter[];
  Capabilities?: Capability[];
  ResourceTypes?: string[];
  RoleARN?: string;
  RollbackConfiguration?: RollbackConfiguration;
  StackPolicyBody?: string;
  StackPolicyURL?: string;
  NotificationARNs?: string[];
  Tags?: Tag[];
  DisableRollback?: boolean;
  ClientRequestToken?: string;
  RetainExceptOnCreate?: boolean;
}
export const UpdateStackInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackName: S.optional(S.String),
    TemplateBody: S.optional(S.String),
    TemplateURL: S.optional(S.String),
    UsePreviousTemplate: S.optional(S.Boolean),
    StackPolicyDuringUpdateBody: S.optional(S.String),
    StackPolicyDuringUpdateURL: S.optional(S.String),
    Parameters: S.optional(Parameters),
    Capabilities: S.optional(Capabilities),
    ResourceTypes: S.optional(ResourceTypes),
    RoleARN: S.optional(S.String),
    RollbackConfiguration: S.optional(RollbackConfiguration),
    StackPolicyBody: S.optional(S.String),
    StackPolicyURL: S.optional(S.String),
    NotificationARNs: S.optional(NotificationARNs),
    Tags: S.optional(Tags),
    DisableRollback: S.optional(S.Boolean),
    ClientRequestToken: S.optional(S.String),
    RetainExceptOnCreate: S.optional(S.Boolean),
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
  identifier: "UpdateStackInput",
}) as any as S.Schema<UpdateStackInput>;
export interface UpdateStackOutput {
  StackId?: string;
  OperationId?: string;
}
export const UpdateStackOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackId: S.optional(S.String),
    OperationId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "UpdateStackOutput",
}) as any as S.Schema<UpdateStackOutput>;
export interface UpdateStackInstancesInput {
  StackSetName?: string;
  Accounts?: string[];
  DeploymentTargets?: DeploymentTargets;
  Regions?: string[];
  ParameterOverrides?: Parameter[];
  OperationPreferences?: StackSetOperationPreferences;
  OperationId?: string;
  CallAs?: CallAs;
}
export const UpdateStackInstancesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSetName: S.optional(S.String),
    Accounts: S.optional(AccountList),
    DeploymentTargets: S.optional(DeploymentTargets),
    Regions: S.optional(RegionList),
    ParameterOverrides: S.optional(Parameters),
    OperationPreferences: S.optional(StackSetOperationPreferences),
    OperationId: S.optional(S.String).pipe(T.IdempotencyToken()),
    CallAs: S.optional(CallAs),
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
  identifier: "UpdateStackInstancesInput",
}) as any as S.Schema<UpdateStackInstancesInput>;
export interface UpdateStackInstancesOutput {
  OperationId?: string;
}
export const UpdateStackInstancesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateStackInstancesOutput",
}) as any as S.Schema<UpdateStackInstancesOutput>;
export interface UpdateStackSetInput {
  StackSetName?: string;
  Description?: string;
  TemplateBody?: string;
  TemplateURL?: string;
  UsePreviousTemplate?: boolean;
  Parameters?: Parameter[];
  Capabilities?: Capability[];
  Tags?: Tag[];
  OperationPreferences?: StackSetOperationPreferences;
  AdministrationRoleARN?: string;
  ExecutionRoleName?: string;
  DeploymentTargets?: DeploymentTargets;
  PermissionModel?: PermissionModels;
  AutoDeployment?: AutoDeployment;
  OperationId?: string;
  Accounts?: string[];
  Regions?: string[];
  CallAs?: CallAs;
  ManagedExecution?: ManagedExecution;
}
export const UpdateStackSetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StackSetName: S.optional(S.String),
    Description: S.optional(S.String),
    TemplateBody: S.optional(S.String),
    TemplateURL: S.optional(S.String),
    UsePreviousTemplate: S.optional(S.Boolean),
    Parameters: S.optional(Parameters),
    Capabilities: S.optional(Capabilities),
    Tags: S.optional(Tags),
    OperationPreferences: S.optional(StackSetOperationPreferences),
    AdministrationRoleARN: S.optional(S.String),
    ExecutionRoleName: S.optional(S.String),
    DeploymentTargets: S.optional(DeploymentTargets),
    PermissionModel: S.optional(PermissionModels),
    AutoDeployment: S.optional(AutoDeployment),
    OperationId: S.optional(S.String).pipe(T.IdempotencyToken()),
    Accounts: S.optional(AccountList),
    Regions: S.optional(RegionList),
    CallAs: S.optional(CallAs),
    ManagedExecution: S.optional(ManagedExecution),
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
  identifier: "UpdateStackSetInput",
}) as any as S.Schema<UpdateStackSetInput>;
export interface UpdateStackSetOutput {
  OperationId?: string;
}
export const UpdateStackSetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateStackSetOutput",
}) as any as S.Schema<UpdateStackSetOutput>;
export interface UpdateTerminationProtectionInput {
  EnableTerminationProtection?: boolean;
  StackName?: string;
}
export const UpdateTerminationProtectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnableTerminationProtection: S.optional(S.Boolean),
    StackName: S.optional(S.String),
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
  identifier: "UpdateTerminationProtectionInput",
}) as any as S.Schema<UpdateTerminationProtectionInput>;
export interface UpdateTerminationProtectionOutput {
  StackId?: string;
}
export const UpdateTerminationProtectionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StackId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateTerminationProtectionOutput",
}) as any as S.Schema<UpdateTerminationProtectionOutput>;
export interface ValidateTemplateInput {
  TemplateBody?: string;
  TemplateURL?: string;
}
export const ValidateTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateBody: S.optional(S.String),
    TemplateURL: S.optional(S.String),
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
  identifier: "ValidateTemplateInput",
}) as any as S.Schema<ValidateTemplateInput>;
export interface TemplateParameter {
  ParameterKey?: string;
  DefaultValue?: string;
  NoEcho?: boolean;
  Description?: string;
}
export const TemplateParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterKey: S.optional(S.String),
    DefaultValue: S.optional(S.String),
    NoEcho: S.optional(S.Boolean),
    Description: S.optional(S.String),
  }),
).annotate({
  identifier: "TemplateParameter",
}) as any as S.Schema<TemplateParameter>;
export type TemplateParameters = TemplateParameter[];
export const TemplateParameters = /*@__PURE__*/ S.Array(TemplateParameter);
export interface ValidateTemplateOutput {
  Parameters?: TemplateParameter[];
  Description?: string;
  Capabilities?: Capability[];
  CapabilitiesReason?: string;
  DeclaredTransforms?: string[];
}
export const ValidateTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Parameters: S.optional(TemplateParameters),
    Description: S.optional(S.String),
    Capabilities: S.optional(Capabilities),
    CapabilitiesReason: S.optional(S.String),
    DeclaredTransforms: S.optional(TransformsList),
  }).pipe(ns),
).annotate({
  identifier: "ValidateTemplateOutput",
}) as any as S.Schema<ValidateTemplateOutput>;
export type ActivateOrganizationsAccessError =
  | InvalidOperationException
  | OperationNotFoundException
  | CommonErrors;
/**
 * Activate trusted access with Organizations. With trusted access between StackSets
 * and Organizations activated, the management account has permissions to create
 * and manage StackSets for your organization.
 */
export const activateOrganizationsAccess: API.OperationMethod<
  ActivateOrganizationsAccessInput,
  ActivateOrganizationsAccessOutput,
  ActivateOrganizationsAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ActivateOrganizationsAccessInput,
  output: ActivateOrganizationsAccessOutput,
  errors: [InvalidOperationException, OperationNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ActivateOrganizationsAccess",
}));

export type ActivateTypeError =
  | CFNRegistryException
  | TypeNotFoundException
  | CommonErrors;
/**
 * Activates a public third-party extension, such as a resource or module, to make it
 * available for use in stack templates in your current account and Region. It can also create
 * CloudFormation Hooks, which allow you to evaluate resource configurations before CloudFormation
 * provisions them. Hooks integrate with both CloudFormation and Cloud Control API operations.
 *
 * After you activate an extension, you can use SetTypeConfiguration to set specific properties for the extension.
 *
 * To see which extensions have been activated, use ListTypes. To see
 * configuration details for an extension, use DescribeType.
 *
 * For more information, see Activate a
 * third-party public extension in your account in the
 * *CloudFormation User Guide*. For information about creating Hooks, see the
 * CloudFormation Hooks User Guide.
 */
export const activateType: API.OperationMethod<
  ActivateTypeInput,
  ActivateTypeOutput,
  ActivateTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ActivateTypeInput,
  output: ActivateTypeOutput,
  errors: [CFNRegistryException, TypeNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ActivateType",
}));

export type BatchDescribeTypeConfigurationsError =
  | CFNRegistryException
  | TypeConfigurationNotFoundException
  | CommonErrors;
/**
 * Returns configuration data for the specified CloudFormation extensions, from the CloudFormation
 * registry in your current account and Region.
 *
 * For more information, see Edit configuration
 * data for extensions in your account in the
 * *CloudFormation User Guide*.
 */
export const batchDescribeTypeConfigurations: API.OperationMethod<
  BatchDescribeTypeConfigurationsInput,
  BatchDescribeTypeConfigurationsOutput,
  BatchDescribeTypeConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDescribeTypeConfigurationsInput,
  output: BatchDescribeTypeConfigurationsOutput,
  errors: [CFNRegistryException, TypeConfigurationNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDescribeTypeConfigurations",
}));

export type CancelUpdateStackError = TokenAlreadyExistsException | CommonErrors;
/**
 * Cancels an update on the specified stack. If the call completes successfully, the stack
 * rolls back the update and reverts to the previous stack configuration.
 *
 * You can cancel only stacks that are in the `UPDATE_IN_PROGRESS` state.
 */
export const cancelUpdateStack: API.OperationMethod<
  CancelUpdateStackInput,
  CancelUpdateStackResponse,
  CancelUpdateStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelUpdateStackInput,
  output: CancelUpdateStackResponse,
  errors: [TokenAlreadyExistsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelUpdateStack",
}));

export type ContinueUpdateRollbackError =
  | TokenAlreadyExistsException
  | CommonErrors;
/**
 * Continues rolling back a stack from `UPDATE_ROLLBACK_FAILED` to
 * `UPDATE_ROLLBACK_COMPLETE` state. Depending on the cause of the failure, you can
 * manually fix the error and continue the rollback. By continuing the rollback, you can return
 * your stack to a working state (the `UPDATE_ROLLBACK_COMPLETE` state) and then try
 * to update the stack again.
 *
 * A stack enters the `UPDATE_ROLLBACK_FAILED` state when CloudFormation can't roll
 * back all changes after a failed stack update. For example, this might occur when a stack
 * attempts to roll back to an old database that was deleted outside of CloudFormation. Because
 * CloudFormation doesn't know the instance was deleted, it assumes the instance still exists and
 * attempts to roll back to it, causing the update rollback to fail.
 *
 * For more information, see Continue rolling back an update in the *CloudFormation User Guide*. For
 * information for troubleshooting a failed update rollback, see Update rollback failed.
 */
export const continueUpdateRollback: API.OperationMethod<
  ContinueUpdateRollbackInput,
  ContinueUpdateRollbackOutput,
  ContinueUpdateRollbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ContinueUpdateRollbackInput,
  output: ContinueUpdateRollbackOutput,
  errors: [TokenAlreadyExistsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ContinueUpdateRollback",
}));

export type CreateChangeSetError =
  | AlreadyExistsException
  | InsufficientCapabilitiesException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a list of changes that will be applied to a stack so that you can review the
 * changes before executing them. You can create a change set for a stack that doesn't exist or
 * an existing stack. If you create a change set for a stack that doesn't exist, the change set
 * shows all of the resources that CloudFormation will create. If you create a change set for an
 * existing stack, CloudFormation compares the stack's information with the information that you
 * submit in the change set and lists the differences. Use change sets to understand which
 * resources CloudFormation will create or change, and how it will change resources in an existing
 * stack, before you create or update a stack.
 *
 * To create a change set for a stack that doesn't exist, for the `ChangeSetType`
 * parameter, specify `CREATE`. To create a change set for an existing stack, specify
 * `UPDATE` for the `ChangeSetType` parameter. To create a change set for
 * an import operation, specify `IMPORT` for the `ChangeSetType` parameter.
 * After the `CreateChangeSet` call successfully completes, CloudFormation starts creating
 * the change set. To check the status of the change set or to review it, use the DescribeChangeSet action.
 *
 * When you are satisfied with the changes the change set will make, execute the change set
 * by using the ExecuteChangeSet action. CloudFormation doesn't make changes until
 * you execute the change set.
 *
 * To create a change set for the entire stack hierarchy, set
 * `IncludeNestedStacks` to `True`.
 */
export const createChangeSet: API.OperationMethod<
  CreateChangeSetInput,
  CreateChangeSetOutput,
  CreateChangeSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateChangeSetInput,
  output: CreateChangeSetOutput,
  errors: [
    AlreadyExistsException,
    InsufficientCapabilitiesException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChangeSet",
}));

export type CreateGeneratedTemplateError =
  | AlreadyExistsException
  | ConcurrentResourcesLimitExceededException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a template from existing resources that are not already managed with CloudFormation.
 * You can check the status of the template generation using the
 * `DescribeGeneratedTemplate` API action.
 */
export const createGeneratedTemplate: API.OperationMethod<
  CreateGeneratedTemplateInput,
  CreateGeneratedTemplateOutput,
  CreateGeneratedTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGeneratedTemplateInput,
  output: CreateGeneratedTemplateOutput,
  errors: [
    AlreadyExistsException,
    ConcurrentResourcesLimitExceededException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGeneratedTemplate",
}));

export type CreateStackError =
  | AlreadyExistsException
  | InsufficientCapabilitiesException
  | LimitExceededException
  | TokenAlreadyExistsException
  | CommonErrors;
/**
 * Creates a stack as specified in the template. After the call completes successfully, the
 * stack creation starts. You can check the status of the stack through the DescribeStacks operation.
 *
 * For more information about creating a stack and monitoring stack progress, see Managing Amazon Web Services
 * resources as a single unit with CloudFormation stacks in the
 * *CloudFormation User Guide*.
 */
export const createStack: API.OperationMethod<
  CreateStackInput,
  CreateStackOutput,
  CreateStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStackInput,
  output: CreateStackOutput,
  errors: [
    AlreadyExistsException,
    InsufficientCapabilitiesException,
    LimitExceededException,
    TokenAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStack",
}));

export type CreateStackInstancesError =
  | InvalidOperationException
  | LimitExceededException
  | OperationIdAlreadyExistsException
  | OperationInProgressException
  | StackSetNotFoundException
  | StaleRequestException
  | CommonErrors;
/**
 * Creates stack instances for the specified accounts, within the specified Amazon Web Services Regions. A
 * stack instance refers to a stack in a specific account and Region. You must specify at least
 * one value for either `Accounts` or `DeploymentTargets`, and you must
 * specify at least one value for `Regions`.
 *
 * The maximum number of organizational unit (OUs) supported by a
 * `CreateStackInstances` operation is 50.
 *
 * If you need more than 50, consider the following options:
 *
 * - *Batch processing:* If you don't want to expose your OU
 * hierarchy, split up the operations into multiple calls with less than 50 OUs
 * each.
 *
 * - *Parent OU strategy:* If you don't mind exposing the OU
 * hierarchy, target a parent OU that contains all desired child OUs.
 */
export const createStackInstances: API.OperationMethod<
  CreateStackInstancesInput,
  CreateStackInstancesOutput,
  CreateStackInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStackInstancesInput,
  output: CreateStackInstancesOutput,
  errors: [
    InvalidOperationException,
    LimitExceededException,
    OperationIdAlreadyExistsException,
    OperationInProgressException,
    StackSetNotFoundException,
    StaleRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStackInstances",
}));

export type CreateStackRefactorError = CommonErrors;
/**
 * Creates a refactor across multiple stacks, with the list of stacks and resources that are
 * affected.
 */
export const createStackRefactor: API.OperationMethod<
  CreateStackRefactorInput,
  CreateStackRefactorOutput,
  CreateStackRefactorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStackRefactorInput,
  output: CreateStackRefactorOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStackRefactor",
}));

export type CreateStackSetError =
  | CreatedButModifiedException
  | LimitExceededException
  | NameAlreadyExistsException
  | CommonErrors;
/**
 * Creates a StackSet.
 */
export const createStackSet: API.OperationMethod<
  CreateStackSetInput,
  CreateStackSetOutput,
  CreateStackSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStackSetInput,
  output: CreateStackSetOutput,
  errors: [
    CreatedButModifiedException,
    LimitExceededException,
    NameAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStackSet",
}));

export type DeactivateOrganizationsAccessError =
  | InvalidOperationException
  | OperationNotFoundException
  | CommonErrors;
/**
 * Deactivates trusted access with Organizations. If trusted access is deactivated,
 * the management account does not have permissions to create and manage
 * service-managed StackSets for your organization.
 */
export const deactivateOrganizationsAccess: API.OperationMethod<
  DeactivateOrganizationsAccessInput,
  DeactivateOrganizationsAccessOutput,
  DeactivateOrganizationsAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeactivateOrganizationsAccessInput,
  output: DeactivateOrganizationsAccessOutput,
  errors: [InvalidOperationException, OperationNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeactivateOrganizationsAccess",
}));

export type DeactivateTypeError =
  | CFNRegistryException
  | TypeNotFoundException
  | CommonErrors;
/**
 * Deactivates a public third-party extension, such as a resource or module, or a CloudFormation
 * Hook when you no longer use it.
 *
 * Deactivating an extension deletes the configuration details that are associated with it.
 * To temporarily disable a CloudFormation Hook instead, you can use SetTypeConfiguration.
 *
 * Once deactivated, an extension can't be used in any CloudFormation operation. This includes
 * stack update operations where the stack template includes the extension, even if no updates
 * are being made to the extension. In addition, deactivated extensions aren't automatically
 * updated if a new version of the extension is released.
 *
 * To see which extensions are currently activated, use ListTypes.
 */
export const deactivateType: API.OperationMethod<
  DeactivateTypeInput,
  DeactivateTypeOutput,
  DeactivateTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeactivateTypeInput,
  output: DeactivateTypeOutput,
  errors: [CFNRegistryException, TypeNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeactivateType",
}));

export type DeleteChangeSetError =
  | InvalidChangeSetStatusException
  | CommonErrors;
/**
 * Deletes the specified change set. Deleting change sets ensures that no one executes the
 * wrong change set.
 *
 * If the call successfully completes, CloudFormation successfully deleted the change set.
 *
 * If `IncludeNestedStacks` specifies `True` during the creation of the
 * nested change set, then `DeleteChangeSet` will delete all change sets that belong
 * to the stacks hierarchy and will also delete all change sets for nested stacks with the status
 * of `REVIEW_IN_PROGRESS`.
 */
export const deleteChangeSet: API.OperationMethod<
  DeleteChangeSetInput,
  DeleteChangeSetOutput,
  DeleteChangeSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteChangeSetInput,
  output: DeleteChangeSetOutput,
  errors: [InvalidChangeSetStatusException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChangeSet",
}));

export type DeleteGeneratedTemplateError =
  | ConcurrentResourcesLimitExceededException
  | GeneratedTemplateNotFoundException
  | CommonErrors;
/**
 * Deleted a generated template.
 */
export const deleteGeneratedTemplate: API.OperationMethod<
  DeleteGeneratedTemplateInput,
  DeleteGeneratedTemplateResponse,
  DeleteGeneratedTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGeneratedTemplateInput,
  output: DeleteGeneratedTemplateResponse,
  errors: [
    ConcurrentResourcesLimitExceededException,
    GeneratedTemplateNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGeneratedTemplate",
}));

export type DeleteStackError = TokenAlreadyExistsException | CommonErrors;
/**
 * Deletes a specified stack. Once the call completes successfully, stack deletion starts.
 * Deleted stacks don't show up in the DescribeStacks operation if the deletion
 * has been completed successfully.
 *
 * For more information about deleting a stack, see Delete a stack from
 * the CloudFormation console in the *CloudFormation User Guide*.
 */
export const deleteStack: API.OperationMethod<
  DeleteStackInput,
  DeleteStackResponse,
  DeleteStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStackInput,
  output: DeleteStackResponse,
  errors: [TokenAlreadyExistsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStack",
}));

export type DeleteStackInstancesError =
  | InvalidOperationException
  | OperationIdAlreadyExistsException
  | OperationInProgressException
  | StackSetNotFoundException
  | StaleRequestException
  | CommonErrors;
/**
 * Deletes stack instances for the specified accounts, in the specified Amazon Web Services Regions.
 *
 * The maximum number of organizational unit (OUs) supported by a
 * `DeleteStackInstances` operation is 50.
 *
 * If you need more than 50, consider the following options:
 *
 * - *Batch processing:* If you don't want to expose your OU
 * hierarchy, split up the operations into multiple calls with less than 50 OUs
 * each.
 *
 * - *Parent OU strategy:* If you don't mind exposing the OU
 * hierarchy, target a parent OU that contains all desired child OUs.
 */
export const deleteStackInstances: API.OperationMethod<
  DeleteStackInstancesInput,
  DeleteStackInstancesOutput,
  DeleteStackInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStackInstancesInput,
  output: DeleteStackInstancesOutput,
  errors: [
    InvalidOperationException,
    OperationIdAlreadyExistsException,
    OperationInProgressException,
    StackSetNotFoundException,
    StaleRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStackInstances",
}));

export type DeleteStackSetError =
  | OperationInProgressException
  | StackSetNotEmptyException
  | CommonErrors;
/**
 * Deletes a StackSet. Before you can delete a StackSet, all its member stack instances must
 * be deleted. For more information about how to complete this, see DeleteStackInstances.
 */
export const deleteStackSet: API.OperationMethod<
  DeleteStackSetInput,
  DeleteStackSetOutput,
  DeleteStackSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStackSetInput,
  output: DeleteStackSetOutput,
  errors: [OperationInProgressException, StackSetNotEmptyException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStackSet",
}));

export type DeregisterTypeError =
  | CFNRegistryException
  | TypeNotFoundException
  | CommonErrors;
/**
 * Marks an extension or extension version as `DEPRECATED` in the CloudFormation
 * registry, removing it from active use. Deprecated extensions or extension versions cannot be
 * used in CloudFormation operations.
 *
 * To deregister an entire extension, you must individually deregister all active versions of
 * that extension. If an extension has only a single active version, deregistering that version
 * results in the extension itself being deregistered and marked as deprecated in the
 * registry.
 *
 * You can't deregister the default version of an extension if there are other active version
 * of that extension. If you do deregister the default version of an extension, the extension
 * type itself is deregistered as well and marked as deprecated.
 *
 * To view the deprecation status of an extension or extension version, use DescribeType.
 *
 * For more information, see Remove
 * third-party private extensions from your account in the
 * *CloudFormation User Guide*.
 */
export const deregisterType: API.OperationMethod<
  DeregisterTypeInput,
  DeregisterTypeOutput,
  DeregisterTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterTypeInput,
  output: DeregisterTypeOutput,
  errors: [CFNRegistryException, TypeNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterType",
}));

export type DescribeAccountLimitsError = CommonErrors;
/**
 * Retrieves your account's CloudFormation limits, such as the maximum number of stacks that you
 * can create in your account. For more information about account limits, see Understand CloudFormation quotas in the *CloudFormation User Guide*.
 */
export const describeAccountLimits: API.PaginatedOperationMethod<
  DescribeAccountLimitsInput,
  DescribeAccountLimitsOutput,
  DescribeAccountLimitsError,
  Credentials | HttpClient.HttpClient,
  AccountLimit
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeAccountLimitsInput,
  output: DescribeAccountLimitsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountLimits",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccountLimits",
  } as const,
})) as any;

export type DescribeChangeSetError = ChangeSetNotFoundException | CommonErrors;
/**
 * Returns the inputs for the change set and a list of changes that CloudFormation will make if
 * you execute the change set. For more information, see Update
 * CloudFormation stacks using change sets in the
 * *CloudFormation User Guide*.
 */
export const describeChangeSet: API.PaginatedOperationMethod<
  DescribeChangeSetInput,
  DescribeChangeSetOutput,
  DescribeChangeSetError,
  Credentials | HttpClient.HttpClient,
  Change
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeChangeSetInput,
  output: DescribeChangeSetOutput,
  errors: [ChangeSetNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeChangeSet",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Changes",
  } as const,
})) as any;

export type DescribeChangeSetHooksError =
  | ChangeSetNotFoundException
  | CommonErrors;
/**
 * Returns Hook-related information for the change set and a list of changes that
 * CloudFormation makes when you run the change set.
 */
export const describeChangeSetHooks: API.OperationMethod<
  DescribeChangeSetHooksInput,
  DescribeChangeSetHooksOutput,
  DescribeChangeSetHooksError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeChangeSetHooksInput,
  output: DescribeChangeSetHooksOutput,
  errors: [ChangeSetNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeChangeSetHooks",
}));

export type DescribeEventsError = CommonErrors;
/**
 * Returns CloudFormation events based on flexible query criteria. Groups events by operation ID,
 * enabling you to focus on individual stack operations during deployment.
 *
 * An operation is any action performed on a stack, including stack lifecycle actions
 * (Create, Update, Delete, Rollback), change set creation, nested stack creation, and automatic
 * rollbacks triggered by failures. Each operation has a unique identifier (Operation ID) and
 * represents a discrete change attempt on the stack.
 *
 * Returns different types of events including:
 *
 * - **Progress events** - Status updates during stack operation
 * execution.
 *
 * - **Validation errors** - Failures from CloudFormation Early
 * Validations.
 *
 * - **Provisioning errors** - Resource creation and update
 * failures.
 *
 * - **Hook invocation errors** - Failures from CloudFormation
 * Hook during stack operations.
 *
 * One of `ChangeSetName`, `OperationId` or `StackName`
 * must be specified as input.
 */
export const describeEvents: API.PaginatedOperationMethod<
  DescribeEventsInput,
  DescribeEventsOutput,
  DescribeEventsError,
  Credentials | HttpClient.HttpClient,
  OperationEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeEventsInput,
  output: DescribeEventsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OperationEvents",
  } as const,
})) as any;

export type DescribeGeneratedTemplateError =
  | GeneratedTemplateNotFoundException
  | CommonErrors;
/**
 * Describes a generated template. The output includes details about the progress of the
 * creation of a generated template started by a `CreateGeneratedTemplate` API action
 * or the update of a generated template started with an `UpdateGeneratedTemplate` API
 * action.
 */
export const describeGeneratedTemplate: API.OperationMethod<
  DescribeGeneratedTemplateInput,
  DescribeGeneratedTemplateOutput,
  DescribeGeneratedTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeGeneratedTemplateInput,
  output: DescribeGeneratedTemplateOutput,
  errors: [GeneratedTemplateNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeGeneratedTemplate",
}));

export type DescribeOrganizationsAccessError =
  | InvalidOperationException
  | OperationNotFoundException
  | CommonErrors;
/**
 * Retrieves information about the account's `OrganizationAccess` status. This API
 * can be called either by the management account or the delegated administrator by using the
 * `CallAs` parameter. This API can also be called without the `CallAs`
 * parameter by the management account.
 */
export const describeOrganizationsAccess: API.OperationMethod<
  DescribeOrganizationsAccessInput,
  DescribeOrganizationsAccessOutput,
  DescribeOrganizationsAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeOrganizationsAccessInput,
  output: DescribeOrganizationsAccessOutput,
  errors: [InvalidOperationException, OperationNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOrganizationsAccess",
}));

export type DescribePublisherError = CFNRegistryException | CommonErrors;
/**
 * Returns information about a CloudFormation extension publisher.
 *
 * If you don't supply a `PublisherId`, and you have registered as an extension
 * publisher, `DescribePublisher` returns information about your own publisher
 * account.
 *
 * For more information about registering as a publisher, see:
 *
 * - RegisterPublisher
 *
 * - Publishing extensions
 * to make them available for public use in the
 * *CloudFormation Command Line Interface (CLI) User Guide*
 */
export const describePublisher: API.OperationMethod<
  DescribePublisherInput,
  DescribePublisherOutput,
  DescribePublisherError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePublisherInput,
  output: DescribePublisherOutput,
  errors: [CFNRegistryException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePublisher",
}));

export type DescribeResourceScanError =
  | ResourceScanNotFoundException
  | CommonErrors;
/**
 * Describes details of a resource scan.
 */
export const describeResourceScan: API.OperationMethod<
  DescribeResourceScanInput,
  DescribeResourceScanOutput,
  DescribeResourceScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeResourceScanInput,
  output: DescribeResourceScanOutput,
  errors: [ResourceScanNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourceScan",
}));

export type DescribeStackDriftDetectionStatusError = CommonErrors;
/**
 * Returns information about a stack drift detection operation. A stack drift detection
 * operation detects whether a stack's actual configuration differs, or has
 * *drifted*, from its expected configuration, as defined in the stack
 * template and any values specified as template parameters. A stack is considered to have
 * drifted if one or more of its resources have drifted. For more information about stack and
 * resource drift, see Detect unmanaged
 * configuration changes to stacks and resources with drift detection.
 *
 * Use DetectStackDrift to initiate a stack drift detection operation.
 * `DetectStackDrift` returns a `StackDriftDetectionId` you can use to
 * monitor the progress of the operation using `DescribeStackDriftDetectionStatus`.
 * Once the drift detection operation has completed, use DescribeStackResourceDrifts to return drift information about the stack and its
 * resources.
 */
export const describeStackDriftDetectionStatus: API.OperationMethod<
  DescribeStackDriftDetectionStatusInput,
  DescribeStackDriftDetectionStatusOutput,
  DescribeStackDriftDetectionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeStackDriftDetectionStatusInput,
  output: DescribeStackDriftDetectionStatusOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStackDriftDetectionStatus",
}));

export type DescribeStackEventsError = CommonErrors;
/**
 * Returns all stack related events for a specified stack in reverse chronological order. For
 * more information about a stack's event history, see Understand CloudFormation stack creation events in the
 * *CloudFormation User Guide*.
 *
 * You can list events for stacks that have failed to create or have been deleted by
 * specifying the unique stack identifier (stack ID).
 */
export const describeStackEvents: API.PaginatedOperationMethod<
  DescribeStackEventsInput,
  DescribeStackEventsOutput,
  DescribeStackEventsError,
  Credentials | HttpClient.HttpClient,
  StackEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeStackEventsInput,
  output: DescribeStackEventsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStackEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StackEvents",
  } as const,
})) as any;

export type DescribeStackInstanceError =
  | StackInstanceNotFoundException
  | StackSetNotFoundException
  | CommonErrors;
/**
 * Returns the stack instance that's associated with the specified StackSet, Amazon Web Services account,
 * and Amazon Web Services Region.
 *
 * For a list of stack instances that are associated with a specific StackSet, use ListStackInstances.
 */
export const describeStackInstance: API.OperationMethod<
  DescribeStackInstanceInput,
  DescribeStackInstanceOutput,
  DescribeStackInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeStackInstanceInput,
  output: DescribeStackInstanceOutput,
  errors: [StackInstanceNotFoundException, StackSetNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStackInstance",
}));

export type DescribeStackRefactorError =
  | StackRefactorNotFoundException
  | CommonErrors;
/**
 * Describes the stack refactor status.
 */
export const describeStackRefactor: API.OperationMethod<
  DescribeStackRefactorInput,
  DescribeStackRefactorOutput,
  DescribeStackRefactorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeStackRefactorInput,
  output: DescribeStackRefactorOutput,
  errors: [StackRefactorNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStackRefactor",
}));

export type DescribeStackResourceError = CommonErrors;
/**
 * Returns a description of the specified resource in the specified stack.
 *
 * For deleted stacks, DescribeStackResource returns resource information for up to 90 days
 * after the stack has been deleted.
 */
export const describeStackResource: API.OperationMethod<
  DescribeStackResourceInput,
  DescribeStackResourceOutput,
  DescribeStackResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeStackResourceInput,
  output: DescribeStackResourceOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStackResource",
}));

export type DescribeStackResourceDriftsError = CommonErrors;
/**
 * Returns drift information for the resources that have been checked for drift in the
 * specified stack. This includes actual and expected configuration values for resources where
 * CloudFormation detects configuration drift.
 *
 * For a given stack, there will be one `StackResourceDrift` for each stack
 * resource that has been checked for drift. Resources that haven't yet been checked for drift
 * aren't included. Resources that don't currently support drift detection aren't checked, and so
 * not included. For a list of resources that support drift detection, see Resource
 * type support for imports and drift detection.
 *
 * Use DetectStackResourceDrift to detect drift on individual resources, or
 * DetectStackDrift to detect drift on all supported resources for a given
 * stack.
 */
export const describeStackResourceDrifts: API.PaginatedOperationMethod<
  DescribeStackResourceDriftsInput,
  DescribeStackResourceDriftsOutput,
  DescribeStackResourceDriftsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeStackResourceDriftsInput,
  output: DescribeStackResourceDriftsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStackResourceDrifts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeStackResourcesError = CommonErrors;
/**
 * Returns Amazon Web Services resource descriptions for running and deleted stacks. If
 * `StackName` is specified, all the associated resources that are part of the stack
 * are returned. If `PhysicalResourceId` is specified, the associated resources of the
 * stack that the resource belongs to are returned.
 *
 * Only the first 100 resources will be returned. If your stack has more resources than
 * this, you should use `ListStackResources` instead.
 *
 * For deleted stacks, `DescribeStackResources` returns resource information for
 * up to 90 days after the stack has been deleted.
 *
 * You must specify either `StackName` or `PhysicalResourceId`, but not
 * both. In addition, you can specify `LogicalResourceId` to filter the returned
 * result. For more information about resources, the `LogicalResourceId` and
 * `PhysicalResourceId`, see the CloudFormation User Guide.
 *
 * A `ValidationError` is returned if you specify both `StackName`
 * and `PhysicalResourceId` in the same request.
 */
export const describeStackResources: API.OperationMethod<
  DescribeStackResourcesInput,
  DescribeStackResourcesOutput,
  DescribeStackResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeStackResourcesInput,
  output: DescribeStackResourcesOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStackResources",
}));

export type DescribeStacksError = StackNotFound | CommonErrors;
/**
 * Returns the description for the specified stack; if no stack name was specified, then it
 * returns the description for all the stacks created. For more information about a stack's event
 * history, see Understand CloudFormation stack creation events in the
 * *CloudFormation User Guide*.
 *
 * If the stack doesn't exist, a `ValidationError` is returned.
 */
export const describeStacks: API.PaginatedOperationMethod<
  DescribeStacksInput,
  DescribeStacksOutput,
  DescribeStacksError,
  Credentials | HttpClient.HttpClient,
  Stack
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeStacksInput,
  output: DescribeStacksOutput,
  errors: [StackNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStacks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Stacks",
  } as const,
})) as any;

export type DescribeStackSetError = StackSetNotFoundException | CommonErrors;
/**
 * Returns the description of the specified StackSet.
 *
 * This API provides *strongly consistent* reads meaning it will always
 * return the most up-to-date data.
 */
export const describeStackSet: API.OperationMethod<
  DescribeStackSetInput,
  DescribeStackSetOutput,
  DescribeStackSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeStackSetInput,
  output: DescribeStackSetOutput,
  errors: [StackSetNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStackSet",
}));

export type DescribeStackSetOperationError =
  | OperationNotFoundException
  | StackSetNotFoundException
  | CommonErrors;
/**
 * Returns the description of the specified StackSet operation.
 *
 * This API provides *strongly consistent* reads meaning it will always
 * return the most up-to-date data.
 */
export const describeStackSetOperation: API.OperationMethod<
  DescribeStackSetOperationInput,
  DescribeStackSetOperationOutput,
  DescribeStackSetOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeStackSetOperationInput,
  output: DescribeStackSetOperationOutput,
  errors: [OperationNotFoundException, StackSetNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStackSetOperation",
}));

export type DescribeTypeError =
  | CFNRegistryException
  | TypeNotFoundException
  | CommonErrors;
/**
 * Returns detailed information about an extension from the CloudFormation registry in your
 * current account and Region.
 *
 * If you specify a `VersionId`, `DescribeType` returns information
 * about that specific extension version. Otherwise, it returns information about the default
 * extension version.
 *
 * For more information, see Edit configuration
 * data for extensions in your account in the
 * *CloudFormation User Guide*.
 */
export const describeType: API.OperationMethod<
  DescribeTypeInput,
  DescribeTypeOutput,
  DescribeTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTypeInput,
  output: DescribeTypeOutput,
  errors: [CFNRegistryException, TypeNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeType",
}));

export type DescribeTypeRegistrationError = CFNRegistryException | CommonErrors;
/**
 * Returns information about an extension's registration, including its current status and
 * type and version identifiers.
 *
 * When you initiate a registration request using RegisterType, you can
 * then use DescribeTypeRegistration to monitor the progress of that
 * registration request.
 *
 * Once the registration request has completed, use DescribeType to return
 * detailed information about an extension.
 */
export const describeTypeRegistration: API.OperationMethod<
  DescribeTypeRegistrationInput,
  DescribeTypeRegistrationOutput,
  DescribeTypeRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTypeRegistrationInput,
  output: DescribeTypeRegistrationOutput,
  errors: [CFNRegistryException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTypeRegistration",
}));

export type DetectStackDriftError = CommonErrors;
/**
 * Detects whether a stack's actual configuration differs, or has
 * *drifted*, from its expected configuration, as defined in the stack
 * template and any values specified as template parameters. For each resource in the stack that
 * supports drift detection, CloudFormation compares the actual configuration of the resource with
 * its expected template configuration. Only resource properties explicitly defined in the stack
 * template are checked for drift. A stack is considered to have drifted if one or more of its
 * resources differ from their expected template configurations. For more information, see Detect unmanaged configuration changes to stacks and resources with drift
 * detection.
 *
 * Use `DetectStackDrift` to detect drift on all supported resources for a given
 * stack, or DetectStackResourceDrift to detect drift on individual
 * resources.
 *
 * For a list of stack resources that currently support drift detection, see Resource
 * type support for imports and drift detection.
 *
 * `DetectStackDrift` can take up to several minutes, depending on the number of
 * resources contained within the stack. Use DescribeStackDriftDetectionStatus
 * to monitor the progress of a detect stack drift operation. Once the drift detection operation
 * has completed, use DescribeStackResourceDrifts to return drift information
 * about the stack and its resources.
 *
 * When detecting drift on a stack, CloudFormation doesn't detect drift on any nested stacks
 * belonging to that stack. Perform `DetectStackDrift` directly on the nested stack
 * itself.
 */
export const detectStackDrift: API.OperationMethod<
  DetectStackDriftInput,
  DetectStackDriftOutput,
  DetectStackDriftError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DetectStackDriftInput,
  output: DetectStackDriftOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectStackDrift",
}));

export type DetectStackResourceDriftError = CommonErrors;
/**
 * Returns information about whether a resource's actual configuration differs, or has
 * *drifted*, from its expected configuration, as defined in the stack
 * template and any values specified as template parameters. This information includes actual and
 * expected property values for resources in which CloudFormation detects drift. Only resource
 * properties explicitly defined in the stack template are checked for drift. For more
 * information about stack and resource drift, see Detect unmanaged
 * configuration changes to stacks and resources with drift detection.
 *
 * Use `DetectStackResourceDrift` to detect drift on individual resources, or
 * DetectStackDrift to detect drift on all resources in a given stack that
 * support drift detection.
 *
 * Resources that don't currently support drift detection can't be checked. For a list of
 * resources that support drift detection, see Resource
 * type support for imports and drift detection.
 */
export const detectStackResourceDrift: API.OperationMethod<
  DetectStackResourceDriftInput,
  DetectStackResourceDriftOutput,
  DetectStackResourceDriftError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DetectStackResourceDriftInput,
  output: DetectStackResourceDriftOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectStackResourceDrift",
}));

export type DetectStackSetDriftError =
  | InvalidOperationException
  | OperationInProgressException
  | StackSetNotFoundException
  | CommonErrors;
/**
 * Detect drift on a StackSet. When CloudFormation performs drift detection on a StackSet, it
 * performs drift detection on the stack associated with each stack instance in the StackSet. For
 * more information, see Performing drift detection on
 * CloudFormation StackSets.
 *
 * `DetectStackSetDrift` returns the `OperationId` of the StackSet
 * drift detection operation. Use this operation id with DescribeStackSetOperation to monitor the progress of the drift detection
 * operation. The drift detection operation may take some time, depending on the number of stack
 * instances included in the StackSet, in addition to the number of resources included in each
 * stack.
 *
 * Once the operation has completed, use the following actions to return drift
 * information:
 *
 * - Use DescribeStackSet to return detailed information about the stack
 * set, including detailed information about the last *completed* drift
 * operation performed on the StackSet. (Information about drift operations that are in
 * progress isn't included.)
 *
 * - Use ListStackInstances to return a list of stack instances belonging
 * to the StackSet, including the drift status and last drift time checked of each
 * instance.
 *
 * - Use DescribeStackInstance to return detailed information about a
 * specific stack instance, including its drift status and last drift time checked.
 *
 * You can only run a single drift detection operation on a given StackSet at one
 * time.
 *
 * To stop a drift detection StackSet operation, use StopStackSetOperation.
 */
export const detectStackSetDrift: API.OperationMethod<
  DetectStackSetDriftInput,
  DetectStackSetDriftOutput,
  DetectStackSetDriftError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DetectStackSetDriftInput,
  output: DetectStackSetDriftOutput,
  errors: [
    InvalidOperationException,
    OperationInProgressException,
    StackSetNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetectStackSetDrift",
}));

export type EstimateTemplateCostError = CommonErrors;
/**
 * Returns the estimated monthly cost of a template. The return value is an Amazon Web Services Simple
 * Monthly Calculator URL with a query string that describes the resources required to run the
 * template.
 */
export const estimateTemplateCost: API.OperationMethod<
  EstimateTemplateCostInput,
  EstimateTemplateCostOutput,
  EstimateTemplateCostError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EstimateTemplateCostInput,
  output: EstimateTemplateCostOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EstimateTemplateCost",
}));

export type ExecuteChangeSetError =
  | ChangeSetNotFoundException
  | InsufficientCapabilitiesException
  | InvalidChangeSetStatusException
  | TokenAlreadyExistsException
  | CommonErrors;
/**
 * Updates a stack using the input information that was provided when the specified change
 * set was created. After the call successfully completes, CloudFormation starts updating the stack.
 * Use the DescribeStacks action to view the status of the update.
 *
 * When you execute a change set, CloudFormation deletes all other change sets associated with
 * the stack because they aren't valid for the updated stack.
 *
 * If a stack policy is associated with the stack, CloudFormation enforces the policy during the
 * update. You can't specify a temporary stack policy that overrides the current policy.
 *
 * To create a change set for the entire stack hierarchy, `IncludeNestedStacks`
 * must have been set to `True`.
 */
export const executeChangeSet: API.OperationMethod<
  ExecuteChangeSetInput,
  ExecuteChangeSetOutput,
  ExecuteChangeSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExecuteChangeSetInput,
  output: ExecuteChangeSetOutput,
  errors: [
    ChangeSetNotFoundException,
    InsufficientCapabilitiesException,
    InvalidChangeSetStatusException,
    TokenAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteChangeSet",
}));

export type ExecuteStackRefactorError = CommonErrors;
/**
 * Executes the stack refactor operation.
 */
export const executeStackRefactor: API.OperationMethod<
  ExecuteStackRefactorInput,
  ExecuteStackRefactorResponse,
  ExecuteStackRefactorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExecuteStackRefactorInput,
  output: ExecuteStackRefactorResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteStackRefactor",
}));

export type GetGeneratedTemplateError =
  | GeneratedTemplateNotFoundException
  | CommonErrors;
/**
 * Retrieves a generated template. If the template is in an `InProgress` or
 * `Pending` status then the template returned will be the template when the
 * template was last in a `Complete` status. If the template has not yet been in a
 * `Complete` status then an empty template will be returned.
 */
export const getGeneratedTemplate: API.OperationMethod<
  GetGeneratedTemplateInput,
  GetGeneratedTemplateOutput,
  GetGeneratedTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGeneratedTemplateInput,
  output: GetGeneratedTemplateOutput,
  errors: [GeneratedTemplateNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGeneratedTemplate",
}));

export type GetHookResultError = HookResultNotFoundException | CommonErrors;
/**
 * Retrieves detailed information and remediation guidance for a Hook invocation
 * result.
 *
 * If the Hook uses a KMS key to encrypt annotations, callers of the
 * `GetHookResult` operation must have `kms:Decrypt` permissions. For
 * more information, see KMS key policy
 * and permissions for encrypting CloudFormation Hooks results at rest in the
 * *CloudFormation Hooks User Guide*.
 */
export const getHookResult: API.OperationMethod<
  GetHookResultInput,
  GetHookResultOutput,
  GetHookResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetHookResultInput,
  output: GetHookResultOutput,
  errors: [HookResultNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHookResult",
}));

export type GetStackPolicyError = CommonErrors;
/**
 * Returns the stack policy for a specified stack. If a stack doesn't have a policy, a null
 * value is returned.
 */
export const getStackPolicy: API.OperationMethod<
  GetStackPolicyInput,
  GetStackPolicyOutput,
  GetStackPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStackPolicyInput,
  output: GetStackPolicyOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStackPolicy",
}));

export type GetTemplateError = ChangeSetNotFoundException | CommonErrors;
/**
 * Returns the template body for a specified stack. You can get the template for running or
 * deleted stacks.
 *
 * For deleted stacks, `GetTemplate` returns the template for up to 90 days after
 * the stack has been deleted.
 *
 * If the template doesn't exist, a `ValidationError` is returned.
 */
export const getTemplate: API.OperationMethod<
  GetTemplateInput,
  GetTemplateOutput,
  GetTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTemplateInput,
  output: GetTemplateOutput,
  errors: [ChangeSetNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemplate",
}));

export type GetTemplateSummaryError = StackSetNotFoundException | CommonErrors;
/**
 * Returns information about a new or existing template. The `GetTemplateSummary`
 * action is useful for viewing parameter information, such as default parameter values and
 * parameter types, before you create or update a stack or StackSet.
 *
 * You can use the `GetTemplateSummary` action when you submit a template, or you
 * can get template information for a StackSet, or a running or deleted stack.
 *
 * For deleted stacks, `GetTemplateSummary` returns the template information for
 * up to 90 days after the stack has been deleted. If the template doesn't exist, a
 * `ValidationError` is returned.
 */
export const getTemplateSummary: API.OperationMethod<
  GetTemplateSummaryInput,
  GetTemplateSummaryOutput,
  GetTemplateSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTemplateSummaryInput,
  output: GetTemplateSummaryOutput,
  errors: [StackSetNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemplateSummary",
}));

export type ImportStacksToStackSetError =
  | InvalidOperationException
  | LimitExceededException
  | OperationIdAlreadyExistsException
  | OperationInProgressException
  | StackNotFoundException
  | StackSetNotFoundException
  | StaleRequestException
  | CommonErrors;
/**
 * Import existing stacks into a new StackSets. Use the stack import operation to import up
 * to 10 stacks into a new StackSet in the same account as the source stack or in a different
 * administrator account and Region, by specifying the stack ID of the stack you intend to
 * import.
 */
export const importStacksToStackSet: API.OperationMethod<
  ImportStacksToStackSetInput,
  ImportStacksToStackSetOutput,
  ImportStacksToStackSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportStacksToStackSetInput,
  output: ImportStacksToStackSetOutput,
  errors: [
    InvalidOperationException,
    LimitExceededException,
    OperationIdAlreadyExistsException,
    OperationInProgressException,
    StackNotFoundException,
    StackSetNotFoundException,
    StaleRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportStacksToStackSet",
}));

export type ListChangeSetsError = CommonErrors;
/**
 * Returns the ID and status of each active change set for a stack. For example, CloudFormation
 * lists change sets that are in the `CREATE_IN_PROGRESS` or
 * `CREATE_PENDING` state.
 */
export const listChangeSets: API.PaginatedOperationMethod<
  ListChangeSetsInput,
  ListChangeSetsOutput,
  ListChangeSetsError,
  Credentials | HttpClient.HttpClient,
  ChangeSetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListChangeSetsInput,
  output: ListChangeSetsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChangeSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Summaries",
  } as const,
})) as any;

export type ListExportsError = CommonErrors;
/**
 * Lists all exported output values in the account and Region in which you call this action.
 * Use this action to see the exported output values that you can import into other stacks. To
 * import values, use the Fn::ImportValue function.
 *
 * For more information, see Get exported outputs
 * from a deployed CloudFormation stack.
 */
export const listExports: API.PaginatedOperationMethod<
  ListExportsInput,
  ListExportsOutput,
  ListExportsError,
  Credentials | HttpClient.HttpClient,
  Export
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExportsInput,
  output: ListExportsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Exports",
  } as const,
})) as any;

export type ListGeneratedTemplatesError = CommonErrors;
/**
 * Lists your generated templates in this Region.
 */
export const listGeneratedTemplates: API.PaginatedOperationMethod<
  ListGeneratedTemplatesInput,
  ListGeneratedTemplatesOutput,
  ListGeneratedTemplatesError,
  Credentials | HttpClient.HttpClient,
  TemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGeneratedTemplatesInput,
  output: ListGeneratedTemplatesOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGeneratedTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Summaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHookResultsError = HookResultNotFoundException | CommonErrors;
/**
 * Returns summaries of invoked Hooks. For more information, see View invocation
 * summaries for CloudFormation Hooks in the *CloudFormation Hooks User Guide*.
 *
 * This operation supports the following parameter combinations:
 *
 * - No parameters: Returns all Hook invocation summaries.
 *
 * - `TypeArn` only: Returns summaries for a specific Hook.
 *
 * - `TypeArn` and `Status`: Returns summaries for a specific Hook
 * filtered by status.
 *
 * - `TargetId` and `TargetType`: Returns summaries for a specific
 * Hook invocation target.
 */
export const listHookResults: API.OperationMethod<
  ListHookResultsInput,
  ListHookResultsOutput,
  ListHookResultsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListHookResultsInput,
  output: ListHookResultsOutput,
  errors: [HookResultNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHookResults",
}));

export type ListImportsError = CommonErrors;
/**
 * Lists all stacks that are importing an exported output value. To modify or remove an
 * exported output value, first use this action to see which stacks are using it. To see the
 * exported output values in your account, see ListExports.
 *
 * For more information about importing an exported output value, see the Fn::ImportValue function.
 */
export const listImports: API.PaginatedOperationMethod<
  ListImportsInput,
  ListImportsOutput,
  ListImportsError,
  Credentials | HttpClient.HttpClient,
  StackName
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListImportsInput,
  output: ListImportsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Imports",
  } as const,
})) as any;

export type ListResourceScanRelatedResourcesError =
  | ResourceScanInProgressException
  | ResourceScanNotFoundException
  | CommonErrors;
/**
 * Lists the related resources for a list of resources from a resource scan. The response
 * indicates whether each returned resource is already managed by CloudFormation.
 */
export const listResourceScanRelatedResources: API.PaginatedOperationMethod<
  ListResourceScanRelatedResourcesInput,
  ListResourceScanRelatedResourcesOutput,
  ListResourceScanRelatedResourcesError,
  Credentials | HttpClient.HttpClient,
  ScannedResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourceScanRelatedResourcesInput,
  output: ListResourceScanRelatedResourcesOutput,
  errors: [ResourceScanInProgressException, ResourceScanNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceScanRelatedResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RelatedResources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceScanResourcesError =
  | ResourceScanInProgressException
  | ResourceScanNotFoundException
  | CommonErrors;
/**
 * Lists the resources from a resource scan. The results can be filtered by resource
 * identifier, resource type prefix, tag key, and tag value. Only resources that match all
 * specified filters are returned. The response indicates whether each returned resource is
 * already managed by CloudFormation.
 */
export const listResourceScanResources: API.PaginatedOperationMethod<
  ListResourceScanResourcesInput,
  ListResourceScanResourcesOutput,
  ListResourceScanResourcesError,
  Credentials | HttpClient.HttpClient,
  ScannedResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourceScanResourcesInput,
  output: ListResourceScanResourcesOutput,
  errors: [ResourceScanInProgressException, ResourceScanNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceScanResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Resources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceScansError = CommonErrors;
/**
 * List the resource scans from newest to oldest. By default it will return up to 10 resource
 * scans.
 */
export const listResourceScans: API.PaginatedOperationMethod<
  ListResourceScansInput,
  ListResourceScansOutput,
  ListResourceScansError,
  Credentials | HttpClient.HttpClient,
  ResourceScanSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourceScansInput,
  output: ListResourceScansOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceScans",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceScanSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStackInstanceResourceDriftsError =
  | OperationNotFoundException
  | StackInstanceNotFoundException
  | StackSetNotFoundException
  | CommonErrors;
/**
 * Returns drift information for resources in a stack instance.
 *
 * `ListStackInstanceResourceDrifts` returns drift information for the most
 * recent drift detection operation. If an operation is in progress, it may only return partial
 * results.
 */
export const listStackInstanceResourceDrifts: API.OperationMethod<
  ListStackInstanceResourceDriftsInput,
  ListStackInstanceResourceDriftsOutput,
  ListStackInstanceResourceDriftsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListStackInstanceResourceDriftsInput,
  output: ListStackInstanceResourceDriftsOutput,
  errors: [
    OperationNotFoundException,
    StackInstanceNotFoundException,
    StackSetNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStackInstanceResourceDrifts",
}));

export type ListStackInstancesError = StackSetNotFoundException | CommonErrors;
/**
 * Returns summary information about stack instances that are associated with the specified
 * StackSet. You can filter for stack instances that are associated with a specific Amazon Web Services account
 * name or Region, or that have a specific status.
 */
export const listStackInstances: API.PaginatedOperationMethod<
  ListStackInstancesInput,
  ListStackInstancesOutput,
  ListStackInstancesError,
  Credentials | HttpClient.HttpClient,
  StackInstanceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStackInstancesInput,
  output: ListStackInstancesOutput,
  errors: [StackSetNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStackInstances",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Summaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStackRefactorActionsError = CommonErrors;
/**
 * Lists the stack refactor actions that will be taken after calling the ExecuteStackRefactor action.
 */
export const listStackRefactorActions: API.PaginatedOperationMethod<
  ListStackRefactorActionsInput,
  ListStackRefactorActionsOutput,
  ListStackRefactorActionsError,
  Credentials | HttpClient.HttpClient,
  StackRefactorAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStackRefactorActionsInput,
  output: ListStackRefactorActionsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStackRefactorActions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StackRefactorActions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStackRefactorsError = CommonErrors;
/**
 * Lists all account stack refactor operations and their statuses.
 */
export const listStackRefactors: API.PaginatedOperationMethod<
  ListStackRefactorsInput,
  ListStackRefactorsOutput,
  ListStackRefactorsError,
  Credentials | HttpClient.HttpClient,
  StackRefactorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStackRefactorsInput,
  output: ListStackRefactorsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStackRefactors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StackRefactorSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStackResourcesError = CommonErrors;
/**
 * Returns descriptions of all resources of the specified stack.
 *
 * For deleted stacks, ListStackResources returns resource information for up to 90 days
 * after the stack has been deleted.
 */
export const listStackResources: API.PaginatedOperationMethod<
  ListStackResourcesInput,
  ListStackResourcesOutput,
  ListStackResourcesError,
  Credentials | HttpClient.HttpClient,
  StackResourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStackResourcesInput,
  output: ListStackResourcesOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStackResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StackResourceSummaries",
  } as const,
})) as any;

export type ListStacksError = CommonErrors;
/**
 * Returns the summary information for stacks whose status matches the specified
 * `StackStatusFilter`. Summary information for stacks that have been deleted is
 * kept for 90 days after the stack is deleted. If no `StackStatusFilter` is
 * specified, summary information for all stacks is returned (including existing stacks and
 * stacks that have been deleted).
 */
export const listStacks: API.PaginatedOperationMethod<
  ListStacksInput,
  ListStacksOutput,
  ListStacksError,
  Credentials | HttpClient.HttpClient,
  StackSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStacksInput,
  output: ListStacksOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStacks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StackSummaries",
  } as const,
})) as any;

export type ListStackSetAutoDeploymentTargetsError =
  | StackSetNotFoundException
  | CommonErrors;
/**
 * Returns summary information about deployment targets for a StackSet.
 */
export const listStackSetAutoDeploymentTargets: API.OperationMethod<
  ListStackSetAutoDeploymentTargetsInput,
  ListStackSetAutoDeploymentTargetsOutput,
  ListStackSetAutoDeploymentTargetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListStackSetAutoDeploymentTargetsInput,
  output: ListStackSetAutoDeploymentTargetsOutput,
  errors: [StackSetNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStackSetAutoDeploymentTargets",
}));

export type ListStackSetOperationResultsError =
  | OperationNotFoundException
  | StackSetNotFoundException
  | CommonErrors;
/**
 * Returns summary information about the results of a StackSet operation.
 *
 * This API provides *eventually consistent* reads meaning it may take
 * some time but will eventually return the most up-to-date data.
 */
export const listStackSetOperationResults: API.PaginatedOperationMethod<
  ListStackSetOperationResultsInput,
  ListStackSetOperationResultsOutput,
  ListStackSetOperationResultsError,
  Credentials | HttpClient.HttpClient,
  StackSetOperationResultSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStackSetOperationResultsInput,
  output: ListStackSetOperationResultsOutput,
  errors: [OperationNotFoundException, StackSetNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStackSetOperationResults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Summaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStackSetOperationsError =
  | StackSetNotFoundException
  | CommonErrors;
/**
 * Returns summary information about operations performed on a StackSet.
 *
 * This API provides *eventually consistent* reads meaning it may take
 * some time but will eventually return the most up-to-date data.
 */
export const listStackSetOperations: API.PaginatedOperationMethod<
  ListStackSetOperationsInput,
  ListStackSetOperationsOutput,
  ListStackSetOperationsError,
  Credentials | HttpClient.HttpClient,
  StackSetOperationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStackSetOperationsInput,
  output: ListStackSetOperationsOutput,
  errors: [StackSetNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStackSetOperations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Summaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStackSetsError = CommonErrors;
/**
 * Returns summary information about StackSets that are associated with the user.
 *
 * This API provides *strongly consistent* reads meaning it will always
 * return the most up-to-date data.
 *
 * - [Self-managed permissions] If you set the `CallAs` parameter to
 * `SELF` while signed in to your Amazon Web Services account, `ListStackSets`
 * returns all self-managed StackSets in your Amazon Web Services account.
 *
 * - [Service-managed permissions] If you set the `CallAs` parameter to
 * `SELF` while signed in to the organization's management account,
 * `ListStackSets` returns all StackSets in the management account.
 *
 * - [Service-managed permissions] If you set the `CallAs` parameter to
 * `DELEGATED_ADMIN` while signed in to your member account,
 * `ListStackSets` returns all StackSets with service-managed permissions in the
 * management account.
 */
export const listStackSets: API.PaginatedOperationMethod<
  ListStackSetsInput,
  ListStackSetsOutput,
  ListStackSetsError,
  Credentials | HttpClient.HttpClient,
  StackSetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStackSetsInput,
  output: ListStackSetsOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStackSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Summaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTypeRegistrationsError = CFNRegistryException | CommonErrors;
/**
 * Returns a list of registration tokens for the specified extension(s).
 */
export const listTypeRegistrations: API.PaginatedOperationMethod<
  ListTypeRegistrationsInput,
  ListTypeRegistrationsOutput,
  ListTypeRegistrationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTypeRegistrationsInput,
  output: ListTypeRegistrationsOutput,
  errors: [CFNRegistryException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTypeRegistrations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTypesError = CFNRegistryException | CommonErrors;
/**
 * Returns summary information about all extensions, including your private resource types,
 * modules, and Hooks as well as all public extensions from Amazon Web Services and third-party
 * publishers.
 */
export const listTypes: API.PaginatedOperationMethod<
  ListTypesInput,
  ListTypesOutput,
  ListTypesError,
  Credentials | HttpClient.HttpClient,
  TypeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTypesInput,
  output: ListTypesOutput,
  errors: [CFNRegistryException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TypeSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTypeVersionsError = CFNRegistryException | CommonErrors;
/**
 * Returns summary information about the versions of an extension.
 */
export const listTypeVersions: API.PaginatedOperationMethod<
  ListTypeVersionsInput,
  ListTypeVersionsOutput,
  ListTypeVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTypeVersionsInput,
  output: ListTypeVersionsOutput,
  errors: [CFNRegistryException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTypeVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PublishTypeError =
  | CFNRegistryException
  | TypeNotFoundException
  | CommonErrors;
/**
 * Publishes the specified extension to the CloudFormation registry as a public extension in this
 * Region. Public extensions are available for use by all CloudFormation users. For more information
 * about publishing extensions, see Publishing extensions to
 * make them available for public use in the
 * *CloudFormation Command Line Interface (CLI) User Guide*.
 *
 * To publish an extension, you must be registered as a publisher with CloudFormation. For more
 * information, see RegisterPublisher.
 */
export const publishType: API.OperationMethod<
  PublishTypeInput,
  PublishTypeOutput,
  PublishTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PublishTypeInput,
  output: PublishTypeOutput,
  errors: [CFNRegistryException, TypeNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PublishType",
}));

export type RecordHandlerProgressError =
  | InvalidStateTransitionException
  | OperationStatusCheckFailedException
  | CommonErrors;
/**
 * Reports progress of a resource handler to CloudFormation.
 *
 * Reserved for use by the CloudFormation
 * CLI. Don't use this API in your code.
 */
export const recordHandlerProgress: API.OperationMethod<
  RecordHandlerProgressInput,
  RecordHandlerProgressOutput,
  RecordHandlerProgressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RecordHandlerProgressInput,
  output: RecordHandlerProgressOutput,
  errors: [
    InvalidStateTransitionException,
    OperationStatusCheckFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RecordHandlerProgress",
}));

export type RegisterPublisherError = CFNRegistryException | CommonErrors;
/**
 * Registers your account as a publisher of public extensions in the CloudFormation registry.
 * Public extensions are available for use by all CloudFormation users. This publisher ID applies to
 * your account in all Amazon Web Services Regions.
 *
 * For information about requirements for registering as a public extension publisher, see
 * Prerequisite: Registering your account to publish CloudFormation extensions in the
 * *CloudFormation Command Line Interface (CLI) User Guide*.
 */
export const registerPublisher: API.OperationMethod<
  RegisterPublisherInput,
  RegisterPublisherOutput,
  RegisterPublisherError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterPublisherInput,
  output: RegisterPublisherOutput,
  errors: [CFNRegistryException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterPublisher",
}));

export type RegisterTypeError = CFNRegistryException | CommonErrors;
/**
 * Registers an extension with the CloudFormation service. Registering an extension makes it
 * available for use in CloudFormation templates in your Amazon Web Services account, and includes:
 *
 * - Validating the extension schema.
 *
 * - Determining which handlers, if any, have been specified for the extension.
 *
 * - Making the extension available for use in your account.
 *
 * For more information about how to develop extensions and ready them for registration, see
 * Creating resource types using the CloudFormation CLI in the
 * *CloudFormation Command Line Interface (CLI) User Guide*.
 *
 * You can have a maximum of 50 resource extension versions registered at a time. This
 * maximum is per account and per Region. Use DeregisterType
 * to deregister specific extension versions if necessary.
 *
 * Once you have initiated a registration request using RegisterType, you
 * can use DescribeTypeRegistration to monitor the progress of the registration
 * request.
 *
 * Once you have registered a private extension in your account and Region, use SetTypeConfiguration to specify configuration properties for the extension. For
 * more information, see Edit configuration
 * data for extensions in your account in the
 * *CloudFormation User Guide*.
 */
export const registerType: API.OperationMethod<
  RegisterTypeInput,
  RegisterTypeOutput,
  RegisterTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterTypeInput,
  output: RegisterTypeOutput,
  errors: [CFNRegistryException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterType",
}));

export type RollbackStackError = TokenAlreadyExistsException | CommonErrors;
/**
 * When specifying `RollbackStack`, you preserve the state of previously
 * provisioned resources when an operation fails. You can check the status of the stack through
 * the DescribeStacks operation.
 *
 * Rolls back the specified stack to the last known stable state from
 * `CREATE_FAILED` or `UPDATE_FAILED` stack statuses.
 *
 * This operation will delete a stack if it doesn't contain a last known stable state. A last
 * known stable state includes any status in a `*_COMPLETE`. This includes the
 * following stack statuses.
 *
 * - `CREATE_COMPLETE`
 *
 * - `UPDATE_COMPLETE`
 *
 * - `UPDATE_ROLLBACK_COMPLETE`
 *
 * - `IMPORT_COMPLETE`
 *
 * - `IMPORT_ROLLBACK_COMPLETE`
 */
export const rollbackStack: API.OperationMethod<
  RollbackStackInput,
  RollbackStackOutput,
  RollbackStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RollbackStackInput,
  output: RollbackStackOutput,
  errors: [TokenAlreadyExistsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RollbackStack",
}));

export type SetStackPolicyError = CommonErrors;
/**
 * Sets a stack policy for a specified stack.
 */
export const setStackPolicy: API.OperationMethod<
  SetStackPolicyInput,
  SetStackPolicyResponse,
  SetStackPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetStackPolicyInput,
  output: SetStackPolicyResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetStackPolicy",
}));

export type SetTypeConfigurationError =
  | CFNRegistryException
  | TypeNotFoundException
  | CommonErrors;
/**
 * Specifies the configuration data for a CloudFormation extension, such as a resource or Hook,
 * in the given account and Region.
 *
 * For more information, see Edit configuration
 * data for extensions in your account in the
 * *CloudFormation User Guide*.
 *
 * To view the current configuration data for an extension, refer to the
 * `ConfigurationSchema` element of DescribeType.
 *
 * It's strongly recommended that you use dynamic references to restrict sensitive
 * configuration definitions, such as third-party credentials. For more information, see Specify values stored in other services using dynamic references in the
 * *CloudFormation User Guide*.
 *
 * For more information about setting the configuration data for resource types, see Defining the account-level configuration of an extension in the
 * *CloudFormation Command Line Interface (CLI) User Guide*. For more information about setting the configuration
 * data for Hooks, see the CloudFormation Hooks User Guide.
 */
export const setTypeConfiguration: API.OperationMethod<
  SetTypeConfigurationInput,
  SetTypeConfigurationOutput,
  SetTypeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetTypeConfigurationInput,
  output: SetTypeConfigurationOutput,
  errors: [CFNRegistryException, TypeNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetTypeConfiguration",
}));

export type SetTypeDefaultVersionError =
  | CFNRegistryException
  | TypeNotFoundException
  | CommonErrors;
/**
 * Specify the default version of an extension. The default version of an extension will be
 * used in CloudFormation operations.
 */
export const setTypeDefaultVersion: API.OperationMethod<
  SetTypeDefaultVersionInput,
  SetTypeDefaultVersionOutput,
  SetTypeDefaultVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetTypeDefaultVersionInput,
  output: SetTypeDefaultVersionOutput,
  errors: [CFNRegistryException, TypeNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetTypeDefaultVersion",
}));

export type SignalResourceError = CommonErrors;
/**
 * Sends a signal to the specified resource with a success or failure status. You can use the
 * `SignalResource` operation in conjunction with a creation policy or update
 * policy. CloudFormation doesn't proceed with a stack creation or update until resources receive the
 * required number of signals or the timeout period is exceeded. The `SignalResource`
 * operation is useful in cases where you want to send signals from anywhere other than an Amazon EC2
 * instance.
 */
export const signalResource: API.OperationMethod<
  SignalResourceInput,
  SignalResourceResponse,
  SignalResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SignalResourceInput,
  output: SignalResourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SignalResource",
}));

export type StartResourceScanError =
  | ResourceScanInProgressException
  | ResourceScanLimitExceededException
  | CommonErrors;
/**
 * Starts a scan of the resources in this account in this Region. You can the status of a
 * scan using the `ListResourceScans` API action.
 */
export const startResourceScan: API.OperationMethod<
  StartResourceScanInput,
  StartResourceScanOutput,
  StartResourceScanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartResourceScanInput,
  output: StartResourceScanOutput,
  errors: [ResourceScanInProgressException, ResourceScanLimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartResourceScan",
}));

export type StopStackSetOperationError =
  | InvalidOperationException
  | OperationNotFoundException
  | StackSetNotFoundException
  | CommonErrors;
/**
 * Stops an in-progress operation on a StackSet and its associated stack instances. StackSets
 * will cancel all the unstarted stack instance deployments and wait for those are in-progress to
 * complete.
 */
export const stopStackSetOperation: API.OperationMethod<
  StopStackSetOperationInput,
  StopStackSetOperationOutput,
  StopStackSetOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopStackSetOperationInput,
  output: StopStackSetOperationOutput,
  errors: [
    InvalidOperationException,
    OperationNotFoundException,
    StackSetNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopStackSetOperation",
}));

export type TestTypeError =
  | CFNRegistryException
  | TypeNotFoundException
  | CommonErrors;
/**
 * Tests a registered extension to make sure it meets all necessary requirements for being
 * published in the CloudFormation registry.
 *
 * - For resource types, this includes passing all contracts tests defined for the
 * type.
 *
 * - For modules, this includes determining if the module's model meets all necessary
 * requirements.
 *
 * For more information, see Testing your public extension before publishing in the
 * *CloudFormation Command Line Interface (CLI) User Guide*.
 *
 * If you don't specify a version, CloudFormation uses the default version of the extension in
 * your account and Region for testing.
 *
 * To perform testing, CloudFormation assumes the execution role specified when the type was
 * registered. For more information, see RegisterType.
 *
 * Once you've initiated testing on an extension using `TestType`, you can pass
 * the returned `TypeVersionArn` into DescribeType to
 * monitor the current test status and test status description for the extension.
 *
 * An extension must have a test status of `PASSED` before it can be published.
 * For more information, see Publishing extensions
 * to make them available for public use in the
 * *CloudFormation Command Line Interface (CLI) User Guide*.
 */
export const testType: API.OperationMethod<
  TestTypeInput,
  TestTypeOutput,
  TestTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TestTypeInput,
  output: TestTypeOutput,
  errors: [CFNRegistryException, TypeNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestType",
}));

export type UpdateGeneratedTemplateError =
  | AlreadyExistsException
  | GeneratedTemplateNotFoundException
  | LimitExceededException
  | CommonErrors;
/**
 * Updates a generated template. This can be used to change the name, add and remove
 * resources, refresh resources, and change the `DeletionPolicy` and
 * `UpdateReplacePolicy` settings. You can check the status of the update to the
 * generated template using the `DescribeGeneratedTemplate` API action.
 */
export const updateGeneratedTemplate: API.OperationMethod<
  UpdateGeneratedTemplateInput,
  UpdateGeneratedTemplateOutput,
  UpdateGeneratedTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGeneratedTemplateInput,
  output: UpdateGeneratedTemplateOutput,
  errors: [
    AlreadyExistsException,
    GeneratedTemplateNotFoundException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGeneratedTemplate",
}));

export type UpdateStackError =
  | InsufficientCapabilitiesException
  | TokenAlreadyExistsException
  | NoUpdateToPerform
  | CommonErrors;
/**
 * Updates a stack as specified in the template. After the call completes successfully, the
 * stack update starts. You can check the status of the stack through the DescribeStacks action.
 *
 * To get a copy of the template for an existing stack, you can use the GetTemplate action.
 *
 * For more information about updating a stack and monitoring the progress of the update, see
 * Managing
 * Amazon Web Services resources as a single unit with CloudFormation stacks in the
 * *CloudFormation User Guide*.
 */
export const updateStack: API.OperationMethod<
  UpdateStackInput,
  UpdateStackOutput,
  UpdateStackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateStackInput,
  output: UpdateStackOutput,
  errors: [
    InsufficientCapabilitiesException,
    TokenAlreadyExistsException,
    NoUpdateToPerform,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStack",
}));

export type UpdateStackInstancesError =
  | InvalidOperationException
  | OperationIdAlreadyExistsException
  | OperationInProgressException
  | StackInstanceNotFoundException
  | StackSetNotFoundException
  | StaleRequestException
  | CommonErrors;
/**
 * Updates the parameter values for stack instances for the specified accounts, within the
 * specified Amazon Web Services Regions. A stack instance refers to a stack in a specific account and
 * Region.
 *
 * You can only update stack instances in Amazon Web Services Regions and accounts where they already
 * exist; to create additional stack instances, use CreateStackInstances.
 *
 * During StackSet updates, any parameters overridden for a stack instance aren't updated,
 * but retain their overridden value.
 *
 * You can only update the parameter *values* that are specified in the
 * StackSet. To add or delete a parameter itself, use UpdateStackSet
 * to update the StackSet template. If you add a parameter to a template, before you can override
 * the parameter value specified in the StackSet you must first use UpdateStackSet
 * to update all stack instances with the updated template and parameter value specified in the
 * StackSet. Once a stack instance has been updated with the new parameter, you can then override
 * the parameter value using `UpdateStackInstances`.
 *
 * The maximum number of organizational unit (OUs) supported by a
 * `UpdateStackInstances` operation is 50.
 *
 * If you need more than 50, consider the following options:
 *
 * - *Batch processing:* If you don't want to expose your OU
 * hierarchy, split up the operations into multiple calls with less than 50 OUs
 * each.
 *
 * - *Parent OU strategy:* If you don't mind exposing the OU
 * hierarchy, target a parent OU that contains all desired child OUs.
 */
export const updateStackInstances: API.OperationMethod<
  UpdateStackInstancesInput,
  UpdateStackInstancesOutput,
  UpdateStackInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateStackInstancesInput,
  output: UpdateStackInstancesOutput,
  errors: [
    InvalidOperationException,
    OperationIdAlreadyExistsException,
    OperationInProgressException,
    StackInstanceNotFoundException,
    StackSetNotFoundException,
    StaleRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStackInstances",
}));

export type UpdateStackSetError =
  | InvalidOperationException
  | OperationIdAlreadyExistsException
  | OperationInProgressException
  | StackInstanceNotFoundException
  | StackSetNotFoundException
  | StaleRequestException
  | CommonErrors;
/**
 * Updates the StackSet and associated stack instances in the specified accounts and
 * Amazon Web Services Regions.
 *
 * Even if the StackSet operation created by updating the StackSet fails (completely or
 * partially, below or above a specified failure tolerance), the StackSet is updated with your
 * changes. Subsequent CreateStackInstances calls on the specified StackSet use
 * the updated StackSet.
 *
 * The maximum number of organizational unit (OUs) supported by a
 * `UpdateStackSet` operation is 50.
 *
 * If you need more than 50, consider the following options:
 *
 * - *Batch processing:* If you don't want to expose your OU
 * hierarchy, split up the operations into multiple calls with less than 50 OUs
 * each.
 *
 * - *Parent OU strategy:* If you don't mind exposing the OU
 * hierarchy, target a parent OU that contains all desired child OUs.
 */
export const updateStackSet: API.OperationMethod<
  UpdateStackSetInput,
  UpdateStackSetOutput,
  UpdateStackSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateStackSetInput,
  output: UpdateStackSetOutput,
  errors: [
    InvalidOperationException,
    OperationIdAlreadyExistsException,
    OperationInProgressException,
    StackInstanceNotFoundException,
    StackSetNotFoundException,
    StaleRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStackSet",
}));

export type UpdateTerminationProtectionError = CommonErrors;
/**
 * Updates termination protection for the specified stack. If a user attempts to delete a
 * stack with termination protection enabled, the operation fails and the stack remains
 * unchanged. For more information, see Protect a CloudFormation
 * stack from being deleted in the *CloudFormation User Guide*.
 *
 * For nested stacks,
 * termination protection is set on the root stack and can't be changed directly on the nested
 * stack.
 */
export const updateTerminationProtection: API.OperationMethod<
  UpdateTerminationProtectionInput,
  UpdateTerminationProtectionOutput,
  UpdateTerminationProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTerminationProtectionInput,
  output: UpdateTerminationProtectionOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTerminationProtection",
}));

export type ValidateTemplateError = CommonErrors;
/**
 * Validates a specified template. CloudFormation first checks if the template is valid JSON. If
 * it isn't, CloudFormation checks if the template is valid YAML. If both these checks fail,
 * CloudFormation returns a template validation error.
 */
export const validateTemplate: API.OperationMethod<
  ValidateTemplateInput,
  ValidateTemplateOutput,
  ValidateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ValidateTemplateInput,
  output: ValidateTemplateOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateTemplate",
}));
