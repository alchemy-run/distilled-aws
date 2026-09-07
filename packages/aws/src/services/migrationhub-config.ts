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
  sdkId: "MigrationHub Config",
  serviceShapeName: "AWSMigrationHubMultiAccountService",
});
const auth = T.AwsAuthSigv4({ name: "mgh" });
const ver = T.ServiceVersion("2019-06-30");
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
              `https://migrationhub-config-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://migrationhub-config-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://migrationhub-config.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://migrationhub-config.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class DryRunOperation
  extends /*@__PURE__*/ S.TaggedError<DryRunOperation>()("DryRunOperation", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()(
    "InternalServerError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      RetryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export type HomeRegion = string;
export type TargetType = "ACCOUNT" | (string & {});
export const TargetType = S.String;

export type TargetId = string;
export interface Target {
  Type: TargetType;
  Id?: string;
}
export const Target = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: TargetType, Id: S.optional(S.String) }),
).annotate({ identifier: "Target" }) as any as S.Schema<Target>;
export type DryRun = boolean;
export interface CreateHomeRegionControlRequest {
  HomeRegion: string;
  Target: Target;
  DryRun?: boolean;
}
export const CreateHomeRegionControlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HomeRegion: S.String,
    Target: Target,
    DryRun: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateHomeRegionControlRequest",
}) as any as S.Schema<CreateHomeRegionControlRequest>;
export type ControlId = string;
export type RequestedTime = Date;
export interface HomeRegionControl {
  ControlId?: string;
  HomeRegion?: string;
  Target?: Target;
  RequestedTime?: Date;
}
export const HomeRegionControl = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ControlId: S.optional(S.String),
    HomeRegion: S.optional(S.String),
    Target: S.optional(Target),
    RequestedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "HomeRegionControl",
}) as any as S.Schema<HomeRegionControl>;
export interface CreateHomeRegionControlResult {
  HomeRegionControl?: HomeRegionControl;
}
export const CreateHomeRegionControlResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HomeRegionControl: S.optional(HomeRegionControl) }),
).annotate({
  identifier: "CreateHomeRegionControlResult",
}) as any as S.Schema<CreateHomeRegionControlResult>;
export interface DeleteHomeRegionControlRequest {
  ControlId: string;
}
export const DeleteHomeRegionControlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ControlId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteHomeRegionControlRequest",
}) as any as S.Schema<DeleteHomeRegionControlRequest>;
export interface DeleteHomeRegionControlResult {}
export const DeleteHomeRegionControlResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteHomeRegionControlResult",
}) as any as S.Schema<DeleteHomeRegionControlResult>;
export type DescribeHomeRegionControlsMaxResults = number;
export type Token = string;
export interface DescribeHomeRegionControlsRequest {
  ControlId?: string;
  HomeRegion?: string;
  Target?: Target;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeHomeRegionControlsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ControlId: S.optional(S.String),
    HomeRegion: S.optional(S.String),
    Target: S.optional(Target),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeHomeRegionControlsRequest",
}) as any as S.Schema<DescribeHomeRegionControlsRequest>;
export type HomeRegionControls = HomeRegionControl[];
export const HomeRegionControls = /*@__PURE__*/ S.Array(HomeRegionControl);
export interface DescribeHomeRegionControlsResult {
  HomeRegionControls?: HomeRegionControl[];
  NextToken?: string;
}
export const DescribeHomeRegionControlsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HomeRegionControls: S.optional(HomeRegionControls),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeHomeRegionControlsResult",
}) as any as S.Schema<DescribeHomeRegionControlsResult>;
export interface GetHomeRegionRequest {}
export const GetHomeRegionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetHomeRegionRequest",
}) as any as S.Schema<GetHomeRegionRequest>;
export interface GetHomeRegionResult {
  HomeRegion?: string;
}
export const GetHomeRegionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HomeRegion: S.optional(S.String) }),
).annotate({
  identifier: "GetHomeRegionResult",
}) as any as S.Schema<GetHomeRegionResult>;
export type ErrorMessage = string;
export type RetryAfterSeconds = number;
export type CreateHomeRegionControlError =
  | AccessDeniedException
  | DryRunOperation
  | InternalServerError
  | InvalidInputException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * This API sets up the home region for the calling account only.
 */
export const createHomeRegionControl: API.OperationMethod<
  CreateHomeRegionControlRequest,
  CreateHomeRegionControlResult,
  CreateHomeRegionControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateHomeRegionControlRequest,
  output: CreateHomeRegionControlResult,
  errors: [
    AccessDeniedException,
    DryRunOperation,
    InternalServerError,
    InvalidInputException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHomeRegionControl",
}));

export type DeleteHomeRegionControlError =
  | AccessDeniedException
  | InternalServerError
  | InvalidInputException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * This operation deletes the home region configuration for the calling account. The operation does not delete discovery or migration tracking data in the home region.
 */
export const deleteHomeRegionControl: API.OperationMethod<
  DeleteHomeRegionControlRequest,
  DeleteHomeRegionControlResult,
  DeleteHomeRegionControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteHomeRegionControlRequest,
  output: DeleteHomeRegionControlResult,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidInputException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHomeRegionControl",
}));

export type DescribeHomeRegionControlsError =
  | AccessDeniedException
  | InternalServerError
  | InvalidInputException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * This API permits filtering on the `ControlId` and `HomeRegion`
 * fields.
 */
export const describeHomeRegionControls: API.PaginatedOperationMethod<
  DescribeHomeRegionControlsRequest,
  DescribeHomeRegionControlsResult,
  DescribeHomeRegionControlsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeHomeRegionControlsRequest,
  output: DescribeHomeRegionControlsResult,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidInputException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeHomeRegionControls",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetHomeRegionError =
  | AccessDeniedException
  | InternalServerError
  | InvalidInputException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the calling account’s home region, if configured. This API is used by other AWS
 * services to determine the regional endpoint for calling AWS Application Discovery Service and
 * Migration Hub. You must call `GetHomeRegion` at least once before you call any
 * other AWS Application Discovery Service and AWS Migration Hub APIs, to obtain the account's
 * Migration Hub home region.
 */
export const getHomeRegion: API.OperationMethod<
  GetHomeRegionRequest,
  GetHomeRegionResult,
  GetHomeRegionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetHomeRegionRequest,
  output: GetHomeRegionResult,
  errors: [
    AccessDeniedException,
    InternalServerError,
    InvalidInputException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHomeRegion",
}));
