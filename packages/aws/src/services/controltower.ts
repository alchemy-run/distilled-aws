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
  sdkId: "ControlTower",
  serviceShapeName: "AWSControlTowerApis",
});
const auth = T.AwsAuthSigv4({ name: "controltower" });
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
              `https://controltower-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://controltower-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://controltower.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://controltower.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.String.pipe(T.ErrorMessage()) },
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
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAuthError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type LandingZoneVersion = string;
export type RemediationType = "INHERITANCE_DRIFT" | (string & {});
export const RemediationType = S.String;

export type RemediationTypes = RemediationType[];
export const RemediationTypes = /*@__PURE__*/ S.Array(RemediationType);
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type Manifest = unknown;
export interface CreateLandingZoneInput {
  version: string;
  remediationTypes?: RemediationType[];
  tags?: { [key: string]: string | undefined };
  manifest?: any;
}
export const CreateLandingZoneInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    version: S.String,
    remediationTypes: S.optional(RemediationTypes),
    tags: S.optional(TagMap),
    manifest: S.optional(S.Any),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/create-landingzone" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLandingZoneInput",
}) as any as S.Schema<CreateLandingZoneInput>;
export type Arn = string;
export type OperationIdentifier = string;
export interface CreateLandingZoneOutput {
  arn: string;
  operationIdentifier: string;
}
export const CreateLandingZoneOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, operationIdentifier: S.String }),
).annotate({
  identifier: "CreateLandingZoneOutput",
}) as any as S.Schema<CreateLandingZoneOutput>;
export interface DeleteLandingZoneInput {
  landingZoneIdentifier: string;
}
export const DeleteLandingZoneInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ landingZoneIdentifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/delete-landingzone" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLandingZoneInput",
}) as any as S.Schema<DeleteLandingZoneInput>;
export interface DeleteLandingZoneOutput {
  operationIdentifier: string;
}
export const DeleteLandingZoneOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operationIdentifier: S.String }),
).annotate({
  identifier: "DeleteLandingZoneOutput",
}) as any as S.Schema<DeleteLandingZoneOutput>;
export interface DisableBaselineInput {
  enabledBaselineIdentifier: string;
}
export const DisableBaselineInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabledBaselineIdentifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/disable-baseline" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisableBaselineInput",
}) as any as S.Schema<DisableBaselineInput>;
export interface DisableBaselineOutput {
  operationIdentifier: string;
}
export const DisableBaselineOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operationIdentifier: S.String }),
).annotate({
  identifier: "DisableBaselineOutput",
}) as any as S.Schema<DisableBaselineOutput>;
export type ControlIdentifier = string;
export type TargetIdentifier = string;
export interface DisableControlInput {
  controlIdentifier?: string;
  targetIdentifier?: string;
  enabledControlIdentifier?: string;
}
export const DisableControlInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    controlIdentifier: S.optional(S.String),
    targetIdentifier: S.optional(S.String),
    enabledControlIdentifier: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/disable-control" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisableControlInput",
}) as any as S.Schema<DisableControlInput>;
export interface DisableControlOutput {
  operationIdentifier: string;
}
export const DisableControlOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operationIdentifier: S.String }),
).annotate({
  identifier: "DisableControlOutput",
}) as any as S.Schema<DisableControlOutput>;
export type BaselineVersion = string;
export type EnabledBaselineParameterDocument = unknown;
export interface EnabledBaselineParameter {
  key: string;
  value: any;
}
export const EnabledBaselineParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.Any }),
).annotate({
  identifier: "EnabledBaselineParameter",
}) as any as S.Schema<EnabledBaselineParameter>;
export type EnabledBaselineParameters = EnabledBaselineParameter[];
export const EnabledBaselineParameters = /*@__PURE__*/ S.Array(
  EnabledBaselineParameter,
);
export interface EnableBaselineInput {
  baselineVersion: string;
  parameters?: EnabledBaselineParameter[];
  baselineIdentifier: string;
  targetIdentifier: string;
  tags?: { [key: string]: string | undefined };
}
export const EnableBaselineInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    baselineVersion: S.String,
    parameters: S.optional(EnabledBaselineParameters),
    baselineIdentifier: S.String,
    targetIdentifier: S.String,
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/enable-baseline" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "EnableBaselineInput",
}) as any as S.Schema<EnableBaselineInput>;
export interface EnableBaselineOutput {
  operationIdentifier: string;
  arn: string;
}
export const EnableBaselineOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operationIdentifier: S.String, arn: S.String }),
).annotate({
  identifier: "EnableBaselineOutput",
}) as any as S.Schema<EnableBaselineOutput>;
export interface EnabledControlParameter {
  key: string;
  value: any;
}
export const EnabledControlParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.Any }),
).annotate({
  identifier: "EnabledControlParameter",
}) as any as S.Schema<EnabledControlParameter>;
export type EnabledControlParameters = EnabledControlParameter[];
export const EnabledControlParameters = /*@__PURE__*/ S.Array(
  EnabledControlParameter,
);
export interface EnableControlInput {
  controlIdentifier: string;
  targetIdentifier: string;
  tags?: { [key: string]: string | undefined };
  parameters?: EnabledControlParameter[];
}
export const EnableControlInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    controlIdentifier: S.String,
    targetIdentifier: S.String,
    tags: S.optional(TagMap),
    parameters: S.optional(EnabledControlParameters),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/enable-control" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "EnableControlInput",
}) as any as S.Schema<EnableControlInput>;
export interface EnableControlOutput {
  operationIdentifier: string;
  arn?: string;
}
export const EnableControlOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operationIdentifier: S.String, arn: S.optional(S.String) }),
).annotate({
  identifier: "EnableControlOutput",
}) as any as S.Schema<EnableControlOutput>;
export type BaselineArn = string;
export interface GetBaselineInput {
  baselineIdentifier: string;
}
export const GetBaselineInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ baselineIdentifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-baseline" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBaselineInput",
}) as any as S.Schema<GetBaselineInput>;
export interface GetBaselineOutput {
  arn: string;
  name: string;
  description?: string;
}
export const GetBaselineOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "GetBaselineOutput",
}) as any as S.Schema<GetBaselineOutput>;
export interface GetBaselineOperationInput {
  operationIdentifier: string;
}
export const GetBaselineOperationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operationIdentifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-baseline-operation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBaselineOperationInput",
}) as any as S.Schema<GetBaselineOperationInput>;
export type BaselineOperationType =
  | "ENABLE_BASELINE"
  | "DISABLE_BASELINE"
  | "UPDATE_ENABLED_BASELINE"
  | "RESET_ENABLED_BASELINE"
  | (string & {});
export const BaselineOperationType = S.String;

export type BaselineOperationStatus =
  | "SUCCEEDED"
  | "FAILED"
  | "IN_PROGRESS"
  | (string & {});
export const BaselineOperationStatus = S.String;

export interface BaselineOperation {
  operationIdentifier?: string;
  operationType?: BaselineOperationType;
  status?: BaselineOperationStatus;
  startTime?: Date;
  endTime?: Date;
  statusMessage?: string;
}
export const BaselineOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    operationIdentifier: S.optional(S.String),
    operationType: S.optional(BaselineOperationType),
    status: S.optional(BaselineOperationStatus),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    statusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "BaselineOperation",
}) as any as S.Schema<BaselineOperation>;
export interface GetBaselineOperationOutput {
  baselineOperation: BaselineOperation;
}
export const GetBaselineOperationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ baselineOperation: BaselineOperation }),
).annotate({
  identifier: "GetBaselineOperationOutput",
}) as any as S.Schema<GetBaselineOperationOutput>;
export interface GetControlOperationInput {
  operationIdentifier: string;
}
export const GetControlOperationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operationIdentifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-control-operation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetControlOperationInput",
}) as any as S.Schema<GetControlOperationInput>;
export type ControlOperationType =
  | "ENABLE_CONTROL"
  | "DISABLE_CONTROL"
  | "UPDATE_ENABLED_CONTROL"
  | "RESET_ENABLED_CONTROL"
  | (string & {});
export const ControlOperationType = S.String;

export type ControlOperationStatus =
  | "SUCCEEDED"
  | "FAILED"
  | "IN_PROGRESS"
  | (string & {});
export const ControlOperationStatus = S.String;

export interface ControlOperation {
  operationType?: ControlOperationType;
  startTime?: Date;
  endTime?: Date;
  status?: ControlOperationStatus;
  statusMessage?: string;
  operationIdentifier?: string;
  controlIdentifier?: string;
  targetIdentifier?: string;
  enabledControlIdentifier?: string;
}
export const ControlOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    operationType: S.optional(ControlOperationType),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    status: S.optional(ControlOperationStatus),
    statusMessage: S.optional(S.String),
    operationIdentifier: S.optional(S.String),
    controlIdentifier: S.optional(S.String),
    targetIdentifier: S.optional(S.String),
    enabledControlIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "ControlOperation",
}) as any as S.Schema<ControlOperation>;
export interface GetControlOperationOutput {
  controlOperation: ControlOperation;
}
export const GetControlOperationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ controlOperation: ControlOperation }),
).annotate({
  identifier: "GetControlOperationOutput",
}) as any as S.Schema<GetControlOperationOutput>;
export interface GetEnabledBaselineInput {
  enabledBaselineIdentifier: string;
}
export const GetEnabledBaselineInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabledBaselineIdentifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-enabled-baseline" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEnabledBaselineInput",
}) as any as S.Schema<GetEnabledBaselineInput>;
export type EnabledBaselineDriftStatus = "IN_SYNC" | "DRIFTED" | (string & {});
export const EnabledBaselineDriftStatus = S.String;

export interface EnabledBaselineInheritanceDrift {
  status?: EnabledBaselineDriftStatus;
}
export const EnabledBaselineInheritanceDrift = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(EnabledBaselineDriftStatus) }),
).annotate({
  identifier: "EnabledBaselineInheritanceDrift",
}) as any as S.Schema<EnabledBaselineInheritanceDrift>;
export interface EnabledBaselineDriftTypes {
  inheritance?: EnabledBaselineInheritanceDrift;
}
export const EnabledBaselineDriftTypes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ inheritance: S.optional(EnabledBaselineInheritanceDrift) }),
).annotate({
  identifier: "EnabledBaselineDriftTypes",
}) as any as S.Schema<EnabledBaselineDriftTypes>;
export interface EnabledBaselineDriftStatusSummary {
  types?: EnabledBaselineDriftTypes;
}
export const EnabledBaselineDriftStatusSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ types: S.optional(EnabledBaselineDriftTypes) }),
).annotate({
  identifier: "EnabledBaselineDriftStatusSummary",
}) as any as S.Schema<EnabledBaselineDriftStatusSummary>;
export type EnablementStatus =
  | "SUCCEEDED"
  | "FAILED"
  | "UNDER_CHANGE"
  | (string & {});
export const EnablementStatus = S.String;

export interface EnablementStatusSummary {
  status?: EnablementStatus;
  lastOperationIdentifier?: string;
}
export const EnablementStatusSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(EnablementStatus),
    lastOperationIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "EnablementStatusSummary",
}) as any as S.Schema<EnablementStatusSummary>;
export interface EnabledBaselineParameterSummary {
  key: string;
  value: any;
}
export const EnabledBaselineParameterSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.Any }),
).annotate({
  identifier: "EnabledBaselineParameterSummary",
}) as any as S.Schema<EnabledBaselineParameterSummary>;
export type EnabledBaselineParameterSummaries =
  EnabledBaselineParameterSummary[];
export const EnabledBaselineParameterSummaries = /*@__PURE__*/ S.Array(
  EnabledBaselineParameterSummary,
);
export interface EnabledBaselineDetails {
  arn: string;
  baselineIdentifier: string;
  baselineVersion?: string;
  driftStatusSummary?: EnabledBaselineDriftStatusSummary;
  targetIdentifier: string;
  parentIdentifier?: string;
  statusSummary: EnablementStatusSummary;
  parameters?: EnabledBaselineParameterSummary[];
}
export const EnabledBaselineDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    baselineIdentifier: S.String,
    baselineVersion: S.optional(S.String),
    driftStatusSummary: S.optional(EnabledBaselineDriftStatusSummary),
    targetIdentifier: S.String,
    parentIdentifier: S.optional(S.String),
    statusSummary: EnablementStatusSummary,
    parameters: S.optional(EnabledBaselineParameterSummaries),
  }),
).annotate({
  identifier: "EnabledBaselineDetails",
}) as any as S.Schema<EnabledBaselineDetails>;
export interface GetEnabledBaselineOutput {
  enabledBaselineDetails?: EnabledBaselineDetails;
}
export const GetEnabledBaselineOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabledBaselineDetails: S.optional(EnabledBaselineDetails) }),
).annotate({
  identifier: "GetEnabledBaselineOutput",
}) as any as S.Schema<GetEnabledBaselineOutput>;
export interface GetEnabledControlInput {
  enabledControlIdentifier: string;
}
export const GetEnabledControlInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabledControlIdentifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-enabled-control" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEnabledControlInput",
}) as any as S.Schema<GetEnabledControlInput>;
export type DriftStatus =
  | "DRIFTED"
  | "IN_SYNC"
  | "NOT_CHECKING"
  | "UNKNOWN"
  | (string & {});
export const DriftStatus = S.String;

export interface EnabledControlInheritanceDrift {
  status?: DriftStatus;
}
export const EnabledControlInheritanceDrift = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(DriftStatus) }),
).annotate({
  identifier: "EnabledControlInheritanceDrift",
}) as any as S.Schema<EnabledControlInheritanceDrift>;
export interface EnabledControlResourceDrift {
  status?: DriftStatus;
}
export const EnabledControlResourceDrift = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(DriftStatus) }),
).annotate({
  identifier: "EnabledControlResourceDrift",
}) as any as S.Schema<EnabledControlResourceDrift>;
export interface EnabledControlDriftTypes {
  inheritance?: EnabledControlInheritanceDrift;
  resource?: EnabledControlResourceDrift;
}
export const EnabledControlDriftTypes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inheritance: S.optional(EnabledControlInheritanceDrift),
    resource: S.optional(EnabledControlResourceDrift),
  }),
).annotate({
  identifier: "EnabledControlDriftTypes",
}) as any as S.Schema<EnabledControlDriftTypes>;
export interface DriftStatusSummary {
  driftStatus?: DriftStatus;
  types?: EnabledControlDriftTypes;
}
export const DriftStatusSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    driftStatus: S.optional(DriftStatus),
    types: S.optional(EnabledControlDriftTypes),
  }),
).annotate({
  identifier: "DriftStatusSummary",
}) as any as S.Schema<DriftStatusSummary>;
export type ParentIdentifier = string;
export type RegionName = string;
export interface Region {
  name?: string;
}
export const Region = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String) }),
).annotate({ identifier: "Region" }) as any as S.Schema<Region>;
export type TargetRegions = Region[];
export const TargetRegions = /*@__PURE__*/ S.Array(Region);
export interface EnabledControlParameterSummary {
  key: string;
  value: any;
}
export const EnabledControlParameterSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.Any }),
).annotate({
  identifier: "EnabledControlParameterSummary",
}) as any as S.Schema<EnabledControlParameterSummary>;
export type EnabledControlParameterSummaries = EnabledControlParameterSummary[];
export const EnabledControlParameterSummaries = /*@__PURE__*/ S.Array(
  EnabledControlParameterSummary,
);
export interface EnabledControlDetails {
  arn?: string;
  controlIdentifier?: string;
  targetIdentifier?: string;
  statusSummary?: EnablementStatusSummary;
  driftStatusSummary?: DriftStatusSummary;
  parentIdentifier?: string;
  targetRegions?: Region[];
  parameters?: EnabledControlParameterSummary[];
}
export const EnabledControlDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    controlIdentifier: S.optional(S.String),
    targetIdentifier: S.optional(S.String),
    statusSummary: S.optional(EnablementStatusSummary),
    driftStatusSummary: S.optional(DriftStatusSummary),
    parentIdentifier: S.optional(S.String),
    targetRegions: S.optional(TargetRegions),
    parameters: S.optional(EnabledControlParameterSummaries),
  }),
).annotate({
  identifier: "EnabledControlDetails",
}) as any as S.Schema<EnabledControlDetails>;
export interface GetEnabledControlOutput {
  enabledControlDetails: EnabledControlDetails;
}
export const GetEnabledControlOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabledControlDetails: EnabledControlDetails }),
).annotate({
  identifier: "GetEnabledControlOutput",
}) as any as S.Schema<GetEnabledControlOutput>;
export interface GetLandingZoneInput {
  landingZoneIdentifier: string;
}
export const GetLandingZoneInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ landingZoneIdentifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-landingzone" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLandingZoneInput",
}) as any as S.Schema<GetLandingZoneInput>;
export type LandingZoneStatus =
  | "ACTIVE"
  | "PROCESSING"
  | "FAILED"
  | (string & {});
export const LandingZoneStatus = S.String;

export type LandingZoneDriftStatus = "DRIFTED" | "IN_SYNC" | (string & {});
export const LandingZoneDriftStatus = S.String;

export interface LandingZoneDriftStatusSummary {
  status?: LandingZoneDriftStatus;
}
export const LandingZoneDriftStatusSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(LandingZoneDriftStatus) }),
).annotate({
  identifier: "LandingZoneDriftStatusSummary",
}) as any as S.Schema<LandingZoneDriftStatusSummary>;
export interface LandingZoneDetail {
  version: string;
  remediationTypes?: RemediationType[];
  arn?: string;
  status?: LandingZoneStatus;
  latestAvailableVersion?: string;
  driftStatus?: LandingZoneDriftStatusSummary;
  manifest: any;
}
export const LandingZoneDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    version: S.String,
    remediationTypes: S.optional(RemediationTypes),
    arn: S.optional(S.String),
    status: S.optional(LandingZoneStatus),
    latestAvailableVersion: S.optional(S.String),
    driftStatus: S.optional(LandingZoneDriftStatusSummary),
    manifest: S.Any,
  }),
).annotate({
  identifier: "LandingZoneDetail",
}) as any as S.Schema<LandingZoneDetail>;
export interface GetLandingZoneOutput {
  landingZone: LandingZoneDetail;
}
export const GetLandingZoneOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ landingZone: LandingZoneDetail }),
).annotate({
  identifier: "GetLandingZoneOutput",
}) as any as S.Schema<GetLandingZoneOutput>;
export interface GetLandingZoneOperationInput {
  operationIdentifier: string;
}
export const GetLandingZoneOperationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operationIdentifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-landingzone-operation" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLandingZoneOperationInput",
}) as any as S.Schema<GetLandingZoneOperationInput>;
export type LandingZoneOperationType =
  | "DELETE"
  | "CREATE"
  | "UPDATE"
  | "RESET"
  | (string & {});
export const LandingZoneOperationType = S.String;

export type LandingZoneOperationStatus =
  | "SUCCEEDED"
  | "FAILED"
  | "IN_PROGRESS"
  | (string & {});
export const LandingZoneOperationStatus = S.String;

export interface LandingZoneOperationDetail {
  operationType?: LandingZoneOperationType;
  operationIdentifier?: string;
  status?: LandingZoneOperationStatus;
  startTime?: Date;
  endTime?: Date;
  statusMessage?: string;
}
export const LandingZoneOperationDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    operationType: S.optional(LandingZoneOperationType),
    operationIdentifier: S.optional(S.String),
    status: S.optional(LandingZoneOperationStatus),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    statusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "LandingZoneOperationDetail",
}) as any as S.Schema<LandingZoneOperationDetail>;
export interface GetLandingZoneOperationOutput {
  operationDetails: LandingZoneOperationDetail;
}
export const GetLandingZoneOperationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operationDetails: LandingZoneOperationDetail }),
).annotate({
  identifier: "GetLandingZoneOperationOutput",
}) as any as S.Schema<GetLandingZoneOperationOutput>;
export type ListBaselinesMaxResults = number;
export interface ListBaselinesInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListBaselinesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-baselines" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBaselinesInput",
}) as any as S.Schema<ListBaselinesInput>;
export interface BaselineSummary {
  arn: string;
  name: string;
  description?: string;
}
export const BaselineSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "BaselineSummary",
}) as any as S.Schema<BaselineSummary>;
export type Baselines = BaselineSummary[];
export const Baselines = /*@__PURE__*/ S.Array(BaselineSummary);
export interface ListBaselinesOutput {
  baselines: BaselineSummary[];
  nextToken?: string;
}
export const ListBaselinesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ baselines: Baselines, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListBaselinesOutput",
}) as any as S.Schema<ListBaselinesOutput>;
export type ControlIdentifiers = string[];
export const ControlIdentifiers = /*@__PURE__*/ S.Array(S.String);
export type TargetIdentifiers = string[];
export const TargetIdentifiers = /*@__PURE__*/ S.Array(S.String);
export type EnabledControlIdentifiers = string[];
export const EnabledControlIdentifiers = /*@__PURE__*/ S.Array(S.String);
export type ControlOperationStatuses = ControlOperationStatus[];
export const ControlOperationStatuses = /*@__PURE__*/ S.Array(
  ControlOperationStatus,
);
export type ControlOperationTypes = ControlOperationType[];
export const ControlOperationTypes =
  /*@__PURE__*/ S.Array(ControlOperationType);
export interface ControlOperationFilter {
  controlIdentifiers?: string[];
  targetIdentifiers?: string[];
  enabledControlIdentifiers?: string[];
  statuses?: ControlOperationStatus[];
  controlOperationTypes?: ControlOperationType[];
}
export const ControlOperationFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    controlIdentifiers: S.optional(ControlIdentifiers),
    targetIdentifiers: S.optional(TargetIdentifiers),
    enabledControlIdentifiers: S.optional(EnabledControlIdentifiers),
    statuses: S.optional(ControlOperationStatuses),
    controlOperationTypes: S.optional(ControlOperationTypes),
  }),
).annotate({
  identifier: "ControlOperationFilter",
}) as any as S.Schema<ControlOperationFilter>;
export type ListControlOperationsNextToken = string;
export type ListControlOperationsMaxResults = number;
export interface ListControlOperationsInput {
  filter?: ControlOperationFilter;
  nextToken?: string;
  maxResults?: number;
}
export const ListControlOperationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filter: S.optional(ControlOperationFilter),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-control-operations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListControlOperationsInput",
}) as any as S.Schema<ListControlOperationsInput>;
export interface ControlOperationSummary {
  operationType?: ControlOperationType;
  startTime?: Date;
  endTime?: Date;
  status?: ControlOperationStatus;
  statusMessage?: string;
  operationIdentifier?: string;
  controlIdentifier?: string;
  targetIdentifier?: string;
  enabledControlIdentifier?: string;
}
export const ControlOperationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    operationType: S.optional(ControlOperationType),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    status: S.optional(ControlOperationStatus),
    statusMessage: S.optional(S.String),
    operationIdentifier: S.optional(S.String),
    controlIdentifier: S.optional(S.String),
    targetIdentifier: S.optional(S.String),
    enabledControlIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "ControlOperationSummary",
}) as any as S.Schema<ControlOperationSummary>;
export type ControlOperations = ControlOperationSummary[];
export const ControlOperations = /*@__PURE__*/ S.Array(ControlOperationSummary);
export interface ListControlOperationsOutput {
  controlOperations: ControlOperationSummary[];
  nextToken?: string;
}
export const ListControlOperationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    controlOperations: ControlOperations,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListControlOperationsOutput",
}) as any as S.Schema<ListControlOperationsOutput>;
export type EnabledBaselineTargetIdentifiers = string[];
export const EnabledBaselineTargetIdentifiers = /*@__PURE__*/ S.Array(S.String);
export type EnabledBaselineBaselineIdentifiers = string[];
export const EnabledBaselineBaselineIdentifiers = /*@__PURE__*/ S.Array(
  S.String,
);
export type EnabledBaselineParentIdentifiers = string[];
export const EnabledBaselineParentIdentifiers = /*@__PURE__*/ S.Array(S.String);
export type EnabledBaselineEnablementStatuses = EnablementStatus[];
export const EnabledBaselineEnablementStatuses =
  /*@__PURE__*/ S.Array(EnablementStatus);
export type EnabledBaselineDriftStatuses = EnabledBaselineDriftStatus[];
export const EnabledBaselineDriftStatuses = /*@__PURE__*/ S.Array(
  EnabledBaselineDriftStatus,
);
export interface EnabledBaselineFilter {
  targetIdentifiers?: string[];
  baselineIdentifiers?: string[];
  parentIdentifiers?: string[];
  statuses?: EnablementStatus[];
  inheritanceDriftStatuses?: EnabledBaselineDriftStatus[];
}
export const EnabledBaselineFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetIdentifiers: S.optional(EnabledBaselineTargetIdentifiers),
    baselineIdentifiers: S.optional(EnabledBaselineBaselineIdentifiers),
    parentIdentifiers: S.optional(EnabledBaselineParentIdentifiers),
    statuses: S.optional(EnabledBaselineEnablementStatuses),
    inheritanceDriftStatuses: S.optional(EnabledBaselineDriftStatuses),
  }),
).annotate({
  identifier: "EnabledBaselineFilter",
}) as any as S.Schema<EnabledBaselineFilter>;
export type ListEnabledBaselinesNextToken = string;
export type ListEnabledBaselinesMaxResults = number;
export interface ListEnabledBaselinesInput {
  filter?: EnabledBaselineFilter;
  nextToken?: string;
  maxResults?: number;
  includeChildren?: boolean;
}
export const ListEnabledBaselinesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filter: S.optional(EnabledBaselineFilter),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    includeChildren: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-enabled-baselines" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEnabledBaselinesInput",
}) as any as S.Schema<ListEnabledBaselinesInput>;
export interface EnabledBaselineSummary {
  arn: string;
  baselineIdentifier: string;
  baselineVersion?: string;
  driftStatusSummary?: EnabledBaselineDriftStatusSummary;
  targetIdentifier: string;
  parentIdentifier?: string;
  statusSummary: EnablementStatusSummary;
}
export const EnabledBaselineSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    baselineIdentifier: S.String,
    baselineVersion: S.optional(S.String),
    driftStatusSummary: S.optional(EnabledBaselineDriftStatusSummary),
    targetIdentifier: S.String,
    parentIdentifier: S.optional(S.String),
    statusSummary: EnablementStatusSummary,
  }),
).annotate({
  identifier: "EnabledBaselineSummary",
}) as any as S.Schema<EnabledBaselineSummary>;
export type EnabledBaselines = EnabledBaselineSummary[];
export const EnabledBaselines = /*@__PURE__*/ S.Array(EnabledBaselineSummary);
export interface ListEnabledBaselinesOutput {
  enabledBaselines: EnabledBaselineSummary[];
  nextToken?: string;
}
export const ListEnabledBaselinesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabledBaselines: EnabledBaselines,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEnabledBaselinesOutput",
}) as any as S.Schema<ListEnabledBaselinesOutput>;
export type MaxResults = number;
export type EnablementStatuses = EnablementStatus[];
export const EnablementStatuses = /*@__PURE__*/ S.Array(EnablementStatus);
export type DriftStatuses = DriftStatus[];
export const DriftStatuses = /*@__PURE__*/ S.Array(DriftStatus);
export type ParentIdentifiers = string[];
export const ParentIdentifiers = /*@__PURE__*/ S.Array(S.String);
export interface EnabledControlFilter {
  controlIdentifiers?: string[];
  statuses?: EnablementStatus[];
  driftStatuses?: DriftStatus[];
  parentIdentifiers?: string[];
  inheritanceDriftStatuses?: DriftStatus[];
  resourceDriftStatuses?: DriftStatus[];
}
export const EnabledControlFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    controlIdentifiers: S.optional(ControlIdentifiers),
    statuses: S.optional(EnablementStatuses),
    driftStatuses: S.optional(DriftStatuses),
    parentIdentifiers: S.optional(ParentIdentifiers),
    inheritanceDriftStatuses: S.optional(DriftStatuses),
    resourceDriftStatuses: S.optional(DriftStatuses),
  }),
).annotate({
  identifier: "EnabledControlFilter",
}) as any as S.Schema<EnabledControlFilter>;
export interface ListEnabledControlsInput {
  targetIdentifier?: string;
  nextToken?: string;
  maxResults?: number;
  filter?: EnabledControlFilter;
  includeChildren?: boolean;
}
export const ListEnabledControlsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetIdentifier: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    filter: S.optional(EnabledControlFilter),
    includeChildren: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-enabled-controls" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEnabledControlsInput",
}) as any as S.Schema<ListEnabledControlsInput>;
export interface EnabledControlSummary {
  arn?: string;
  controlIdentifier?: string;
  targetIdentifier?: string;
  statusSummary?: EnablementStatusSummary;
  driftStatusSummary?: DriftStatusSummary;
  parentIdentifier?: string;
}
export const EnabledControlSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    controlIdentifier: S.optional(S.String),
    targetIdentifier: S.optional(S.String),
    statusSummary: S.optional(EnablementStatusSummary),
    driftStatusSummary: S.optional(DriftStatusSummary),
    parentIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "EnabledControlSummary",
}) as any as S.Schema<EnabledControlSummary>;
export type EnabledControls = EnabledControlSummary[];
export const EnabledControls = /*@__PURE__*/ S.Array(EnabledControlSummary);
export interface ListEnabledControlsOutput {
  enabledControls: EnabledControlSummary[];
  nextToken?: string;
}
export const ListEnabledControlsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabledControls: EnabledControls,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEnabledControlsOutput",
}) as any as S.Schema<ListEnabledControlsOutput>;
export type LandingZoneOperationTypes = LandingZoneOperationType[];
export const LandingZoneOperationTypes = /*@__PURE__*/ S.Array(
  LandingZoneOperationType,
);
export type LandingZoneOperationStatuses = LandingZoneOperationStatus[];
export const LandingZoneOperationStatuses = /*@__PURE__*/ S.Array(
  LandingZoneOperationStatus,
);
export interface LandingZoneOperationFilter {
  types?: LandingZoneOperationType[];
  statuses?: LandingZoneOperationStatus[];
}
export const LandingZoneOperationFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    types: S.optional(LandingZoneOperationTypes),
    statuses: S.optional(LandingZoneOperationStatuses),
  }),
).annotate({
  identifier: "LandingZoneOperationFilter",
}) as any as S.Schema<LandingZoneOperationFilter>;
export type ListLandingZoneOperationsMaxResults = number;
export interface ListLandingZoneOperationsInput {
  filter?: LandingZoneOperationFilter;
  nextToken?: string;
  maxResults?: number;
}
export const ListLandingZoneOperationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filter: S.optional(LandingZoneOperationFilter),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-landingzone-operations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLandingZoneOperationsInput",
}) as any as S.Schema<ListLandingZoneOperationsInput>;
export interface LandingZoneOperationSummary {
  operationType?: LandingZoneOperationType;
  operationIdentifier?: string;
  status?: LandingZoneOperationStatus;
}
export const LandingZoneOperationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    operationType: S.optional(LandingZoneOperationType),
    operationIdentifier: S.optional(S.String),
    status: S.optional(LandingZoneOperationStatus),
  }),
).annotate({
  identifier: "LandingZoneOperationSummary",
}) as any as S.Schema<LandingZoneOperationSummary>;
export type LandingZoneOperations = LandingZoneOperationSummary[];
export const LandingZoneOperations = /*@__PURE__*/ S.Array(
  LandingZoneOperationSummary,
);
export interface ListLandingZoneOperationsOutput {
  landingZoneOperations: LandingZoneOperationSummary[];
  nextToken?: string;
}
export const ListLandingZoneOperationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    landingZoneOperations: LandingZoneOperations,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLandingZoneOperationsOutput",
}) as any as S.Schema<ListLandingZoneOperationsOutput>;
export type ListLandingZonesMaxResults = number;
export interface ListLandingZonesInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListLandingZonesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-landingzones" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLandingZonesInput",
}) as any as S.Schema<ListLandingZonesInput>;
export interface LandingZoneSummary {
  arn?: string;
}
export const LandingZoneSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.optional(S.String) }),
).annotate({
  identifier: "LandingZoneSummary",
}) as any as S.Schema<LandingZoneSummary>;
export type LandingZoneSummaries = LandingZoneSummary[];
export const LandingZoneSummaries = /*@__PURE__*/ S.Array(LandingZoneSummary);
export interface ListLandingZonesOutput {
  landingZones: LandingZoneSummary[];
  nextToken?: string;
}
export const ListLandingZonesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    landingZones: LandingZoneSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLandingZonesOutput",
}) as any as S.Schema<ListLandingZonesOutput>;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  tags: { [key: string]: string | undefined };
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: TagMap }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface ResetEnabledBaselineInput {
  enabledBaselineIdentifier: string;
}
export const ResetEnabledBaselineInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabledBaselineIdentifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/reset-enabled-baseline" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResetEnabledBaselineInput",
}) as any as S.Schema<ResetEnabledBaselineInput>;
export interface ResetEnabledBaselineOutput {
  operationIdentifier: string;
}
export const ResetEnabledBaselineOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operationIdentifier: S.String }),
).annotate({
  identifier: "ResetEnabledBaselineOutput",
}) as any as S.Schema<ResetEnabledBaselineOutput>;
export interface ResetEnabledControlInput {
  enabledControlIdentifier: string;
}
export const ResetEnabledControlInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabledControlIdentifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/reset-enabled-control" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResetEnabledControlInput",
}) as any as S.Schema<ResetEnabledControlInput>;
export interface ResetEnabledControlOutput {
  operationIdentifier: string;
}
export const ResetEnabledControlOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operationIdentifier: S.String }),
).annotate({
  identifier: "ResetEnabledControlOutput",
}) as any as S.Schema<ResetEnabledControlOutput>;
export interface ResetLandingZoneInput {
  landingZoneIdentifier: string;
}
export const ResetLandingZoneInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ landingZoneIdentifier: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/reset-landingzone" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResetLandingZoneInput",
}) as any as S.Schema<ResetLandingZoneInput>;
export interface ResetLandingZoneOutput {
  operationIdentifier: string;
}
export const ResetLandingZoneOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operationIdentifier: S.String }),
).annotate({
  identifier: "ResetLandingZoneOutput",
}) as any as S.Schema<ResetLandingZoneOutput>;
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagMap,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {}
export const TagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export interface UpdateEnabledBaselineInput {
  baselineVersion: string;
  parameters?: EnabledBaselineParameter[];
  enabledBaselineIdentifier: string;
}
export const UpdateEnabledBaselineInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    baselineVersion: S.String,
    parameters: S.optional(EnabledBaselineParameters),
    enabledBaselineIdentifier: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/update-enabled-baseline" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEnabledBaselineInput",
}) as any as S.Schema<UpdateEnabledBaselineInput>;
export interface UpdateEnabledBaselineOutput {
  operationIdentifier: string;
}
export const UpdateEnabledBaselineOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operationIdentifier: S.String }),
).annotate({
  identifier: "UpdateEnabledBaselineOutput",
}) as any as S.Schema<UpdateEnabledBaselineOutput>;
export interface UpdateEnabledControlInput {
  parameters: EnabledControlParameter[];
  enabledControlIdentifier: string;
}
export const UpdateEnabledControlInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    parameters: EnabledControlParameters,
    enabledControlIdentifier: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/update-enabled-control" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEnabledControlInput",
}) as any as S.Schema<UpdateEnabledControlInput>;
export interface UpdateEnabledControlOutput {
  operationIdentifier: string;
}
export const UpdateEnabledControlOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operationIdentifier: S.String }),
).annotate({
  identifier: "UpdateEnabledControlOutput",
}) as any as S.Schema<UpdateEnabledControlOutput>;
export interface UpdateLandingZoneInput {
  version: string;
  remediationTypes?: RemediationType[];
  landingZoneIdentifier: string;
  manifest?: any;
}
export const UpdateLandingZoneInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    version: S.String,
    remediationTypes: S.optional(RemediationTypes),
    landingZoneIdentifier: S.String,
    manifest: S.optional(S.Any),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/update-landingzone" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateLandingZoneInput",
}) as any as S.Schema<UpdateLandingZoneInput>;
export interface UpdateLandingZoneOutput {
  operationIdentifier: string;
}
export const UpdateLandingZoneOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operationIdentifier: S.String }),
).annotate({
  identifier: "UpdateLandingZoneOutput",
}) as any as S.Schema<UpdateLandingZoneOutput>;
export type CreateLandingZoneError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new landing zone. This API call starts an asynchronous operation that creates and configures a landing zone, based on the parameters specified in the manifest JSON file.
 */
export const createLandingZone: API.OperationMethod<
  CreateLandingZoneInput,
  CreateLandingZoneOutput,
  CreateLandingZoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLandingZoneInput,
  output: CreateLandingZoneOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLandingZone",
}));

export type DeleteLandingZoneError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Decommissions a landing zone. This API call starts an asynchronous operation that deletes Amazon Web Services Control Tower resources deployed in accounts managed by Amazon Web Services Control Tower.
 *
 * Decommissioning a landing zone is a process with significant consequences, and it cannot be undone. We strongly recommend that you perform this decommissioning process only if you intend to stop using your landing zone.
 */
export const deleteLandingZone: API.OperationMethod<
  DeleteLandingZoneInput,
  DeleteLandingZoneOutput,
  DeleteLandingZoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLandingZoneInput,
  output: DeleteLandingZoneOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLandingZone",
}));

export type DisableBaselineError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Disable an `EnabledBaseline` resource on the specified Target. This API starts an asynchronous operation to remove all resources deployed as part of the baseline enablement. The resource will vary depending on the enabled baseline. For usage examples, see *the Amazon Web Services Control Tower User Guide* .
 */
export const disableBaseline: API.OperationMethod<
  DisableBaselineInput,
  DisableBaselineOutput,
  DisableBaselineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableBaselineInput,
  output: DisableBaselineOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableBaseline",
}));

export type DisableControlError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This API call turns off a control. It starts an asynchronous operation that deletes Amazon Web Services resources on the specified organizational unit and the accounts it contains. The resources will vary according to the control that you specify. For usage examples, see the *Controls Reference Guide* .
 */
export const disableControl: API.OperationMethod<
  DisableControlInput,
  DisableControlOutput,
  DisableControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableControlInput,
  output: DisableControlOutput,
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
  operationName: "DisableControl",
}));

export type EnableBaselineError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Enable (apply) a `Baseline` to a Target. This API starts an asynchronous operation to deploy resources specified by the `Baseline` to the specified Target. For usage examples, see *the Amazon Web Services Control Tower User Guide* .
 */
export const enableBaseline: API.OperationMethod<
  EnableBaselineInput,
  EnableBaselineOutput,
  EnableBaselineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableBaselineInput,
  output: EnableBaselineOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableBaseline",
}));

export type EnableControlError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This API call activates a control. It starts an asynchronous operation that creates Amazon Web Services resources on the specified organizational unit and the accounts it contains. The resources created will vary according to the control that you specify. For usage examples, see the *Controls Reference Guide* .
 */
export const enableControl: API.OperationMethod<
  EnableControlInput,
  EnableControlOutput,
  EnableControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableControlInput,
  output: EnableControlOutput,
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
  operationName: "EnableControl",
}));

export type GetBaselineError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieve details about an existing `Baseline` resource by specifying its identifier. For usage examples, see *the Amazon Web Services Control Tower User Guide* .
 */
export const getBaseline: API.OperationMethod<
  GetBaselineInput,
  GetBaselineOutput,
  GetBaselineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBaselineInput,
  output: GetBaselineOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBaseline",
}));

export type GetBaselineOperationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns the details of an asynchronous baseline operation, as initiated by any of these APIs: `EnableBaseline`, `DisableBaseline`, `UpdateEnabledBaseline`, `ResetEnabledBaseline`. A status message is displayed in case of operation failure. For usage examples, see *the Amazon Web Services Control Tower User Guide* .
 */
export const getBaselineOperation: API.OperationMethod<
  GetBaselineOperationInput,
  GetBaselineOperationOutput,
  GetBaselineOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBaselineOperationInput,
  output: GetBaselineOperationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBaselineOperation",
}));

export type GetControlOperationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the status of a particular `EnableControl` or `DisableControl` operation. Displays a message in case of error. Details for an operation are available for 90 days. For usage examples, see the *Controls Reference Guide* .
 */
export const getControlOperation: API.OperationMethod<
  GetControlOperationInput,
  GetControlOperationOutput,
  GetControlOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetControlOperationInput,
  output: GetControlOperationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetControlOperation",
}));

export type GetEnabledBaselineError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Retrieve details of an `EnabledBaseline` resource by specifying its identifier.
 */
export const getEnabledBaseline: API.OperationMethod<
  GetEnabledBaselineInput,
  GetEnabledBaselineOutput,
  GetEnabledBaselineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEnabledBaselineInput,
  output: GetEnabledBaselineOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnabledBaseline",
}));

export type GetEnabledControlError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about an enabled control. For usage examples, see the *Controls Reference Guide* .
 */
export const getEnabledControl: API.OperationMethod<
  GetEnabledControlInput,
  GetEnabledControlOutput,
  GetEnabledControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEnabledControlInput,
  output: GetEnabledControlOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnabledControl",
}));

export type GetLandingZoneError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns details about the landing zone. Displays a message in case of error.
 */
export const getLandingZone: API.OperationMethod<
  GetLandingZoneInput,
  GetLandingZoneOutput,
  GetLandingZoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLandingZoneInput,
  output: GetLandingZoneOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLandingZone",
}));

export type GetLandingZoneOperationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns the status of the specified landing zone operation. Details for an operation are available for 90 days.
 */
export const getLandingZoneOperation: API.OperationMethod<
  GetLandingZoneOperationInput,
  GetLandingZoneOperationOutput,
  GetLandingZoneOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLandingZoneOperationInput,
  output: GetLandingZoneOperationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLandingZoneOperation",
}));

export type ListBaselinesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a summary list of all available baselines. For usage examples, see *the Amazon Web Services Control Tower User Guide* .
 */
export const listBaselines: API.PaginatedOperationMethod<
  ListBaselinesInput,
  ListBaselinesOutput,
  ListBaselinesError,
  Credentials | HttpClient.HttpClient,
  BaselineSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBaselinesInput,
  output: ListBaselinesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBaselines",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "baselines",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListControlOperationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides a list of operations in progress or queued. For usage examples, see ListControlOperation examples.
 */
export const listControlOperations: API.PaginatedOperationMethod<
  ListControlOperationsInput,
  ListControlOperationsOutput,
  ListControlOperationsError,
  Credentials | HttpClient.HttpClient,
  ControlOperationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListControlOperationsInput,
  output: ListControlOperationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListControlOperations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "controlOperations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnabledBaselinesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of summaries describing `EnabledBaseline` resources. You can filter the list by the corresponding `Baseline` or `Target` of the `EnabledBaseline` resources. For usage examples, see *the Amazon Web Services Control Tower User Guide* .
 */
export const listEnabledBaselines: API.PaginatedOperationMethod<
  ListEnabledBaselinesInput,
  ListEnabledBaselinesOutput,
  ListEnabledBaselinesError,
  Credentials | HttpClient.HttpClient,
  EnabledBaselineSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnabledBaselinesInput,
  output: ListEnabledBaselinesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnabledBaselines",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "enabledBaselines",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnabledControlsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the controls enabled by Amazon Web Services Control Tower on the specified organizational unit and the accounts it contains. For usage examples, see the *Controls Reference Guide* .
 */
export const listEnabledControls: API.PaginatedOperationMethod<
  ListEnabledControlsInput,
  ListEnabledControlsOutput,
  ListEnabledControlsError,
  Credentials | HttpClient.HttpClient,
  EnabledControlSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnabledControlsInput,
  output: ListEnabledControlsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnabledControls",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "enabledControls",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListLandingZoneOperationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists all landing zone operations from the past 90 days. Results are sorted by time, with the most recent operation first.
 */
export const listLandingZoneOperations: API.PaginatedOperationMethod<
  ListLandingZoneOperationsInput,
  ListLandingZoneOperationsOutput,
  ListLandingZoneOperationsError,
  Credentials | HttpClient.HttpClient,
  LandingZoneOperationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLandingZoneOperationsInput,
  output: ListLandingZoneOperationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLandingZoneOperations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "landingZoneOperations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListLandingZonesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns the landing zone ARN for the landing zone deployed in your managed account. This API also creates an ARN for existing accounts that do not yet have a landing zone ARN.
 *
 * Returns one landing zone ARN.
 */
export const listLandingZones: API.PaginatedOperationMethod<
  ListLandingZonesInput,
  ListLandingZonesOutput,
  ListLandingZonesError,
  Credentials | HttpClient.HttpClient,
  LandingZoneSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLandingZonesInput,
  output: ListLandingZonesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLandingZones",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "landingZones",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | BadRequestException
  | CommonErrors;
/**
 * Returns a list of tags associated with the resource. For usage examples, see the *Controls Reference Guide* .
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    BadRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ResetEnabledBaselineError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Re-enables an `EnabledBaseline` resource. For example, this API can re-apply the existing `Baseline` after a new member account is moved to the target OU. For usage examples, see *the Amazon Web Services Control Tower User Guide* .
 */
export const resetEnabledBaseline: API.OperationMethod<
  ResetEnabledBaselineInput,
  ResetEnabledBaselineOutput,
  ResetEnabledBaselineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResetEnabledBaselineInput,
  output: ResetEnabledBaselineOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetEnabledBaseline",
}));

export type ResetEnabledControlError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Resets an enabled control. Does not work for controls implemented with SCPs.
 */
export const resetEnabledControl: API.OperationMethod<
  ResetEnabledControlInput,
  ResetEnabledControlOutput,
  ResetEnabledControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResetEnabledControlInput,
  output: ResetEnabledControlOutput,
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
  operationName: "ResetEnabledControl",
}));

export type ResetLandingZoneError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * This API call resets a landing zone. It starts an asynchronous operation that resets the landing zone to the parameters specified in the original configuration, which you specified in the manifest file. Nothing in the manifest file's original landing zone configuration is changed during the reset process, by default. This API is not the same as a rollback of a landing zone version, which is not a supported operation.
 */
export const resetLandingZone: API.OperationMethod<
  ResetLandingZoneInput,
  ResetLandingZoneOutput,
  ResetLandingZoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResetLandingZoneInput,
  output: ResetLandingZoneOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetLandingZone",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | BadRequestException
  | CommonErrors;
/**
 * Applies tags to a resource. For usage examples, see the *Controls Reference Guide* .
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    BadRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | BadRequestException
  | CommonErrors;
/**
 * Removes tags from a resource. For usage examples, see the *Controls Reference Guide* .
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    BadRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateEnabledBaselineError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates an `EnabledBaseline` resource's applied parameters or version. For usage examples, see *the Amazon Web Services Control Tower User Guide* .
 */
export const updateEnabledBaseline: API.OperationMethod<
  UpdateEnabledBaselineInput,
  UpdateEnabledBaselineOutput,
  UpdateEnabledBaselineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEnabledBaselineInput,
  output: UpdateEnabledBaselineOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnabledBaseline",
}));

export type UpdateEnabledControlError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an already enabled control.
 *
 * If the enabled control shows an `EnablementStatus` of SUCCEEDED, supply parameters that are different from the currently configured parameters. Otherwise, Amazon Web Services Control Tower will not accept the request.
 *
 * If the enabled control shows an `EnablementStatus` of FAILED, Amazon Web Services Control Tower updates the control to match any valid parameters that you supply.
 *
 * If the `DriftSummary` status for the control shows as `DRIFTED`, you cannot call this API. Instead, you can update the control by calling the `ResetEnabledControl` API. Alternatively, you can call `DisableControl` and then call `EnableControl` again. Also, you can run an extending governance operation to repair drift. For usage examples, see the *Controls Reference Guide* .
 */
export const updateEnabledControl: API.OperationMethod<
  UpdateEnabledControlInput,
  UpdateEnabledControlOutput,
  UpdateEnabledControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEnabledControlInput,
  output: UpdateEnabledControlOutput,
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
  operationName: "UpdateEnabledControl",
}));

export type UpdateLandingZoneError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | UnauthorizedException
  | CommonErrors;
/**
 * This API call updates the landing zone. It starts an asynchronous operation that updates the landing zone based on the new landing zone version, or on the changed parameters specified in the updated manifest file.
 */
export const updateLandingZone: API.OperationMethod<
  UpdateLandingZoneInput,
  UpdateLandingZoneOutput,
  UpdateLandingZoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLandingZoneInput,
  output: UpdateLandingZoneOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLandingZone",
}));
