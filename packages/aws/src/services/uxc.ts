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
  sdkId: "uxc",
  serviceShapeName: "AWSAccountUXSetting",
});
const auth = T.AwsAuthSigv4({ name: "uxc" });
const ver = T.ServiceVersion("2024-07-01");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { UseFIPS = false, Endpoint, Region } = p;
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
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (UseFIPS === true) {
          return e(
            `https://uxc-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://uxc.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
  ) {}
export interface GetAccountCustomizationsInput {}
export const GetAccountCustomizationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/account-customizations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccountCustomizationsInput",
}) as any as S.Schema<GetAccountCustomizationsInput>;
export type AccountColor =
  | "none"
  | "pink"
  | "purple"
  | "darkBlue"
  | "lightBlue"
  | "teal"
  | "green"
  | "yellow"
  | "orange"
  | "red"
  | (string & {});
export const AccountColor = /*@__PURE__*/ S.String;

export type Service = string;
export type ServiceList = string[];
export const ServiceList = /*@__PURE__*/ S.Array(S.String);
export type Region = string;
export type RegionsList = string[];
export const RegionsList = /*@__PURE__*/ S.Array(S.String);
export interface GetAccountCustomizationsOutput {
  accountColor?: AccountColor;
  visibleServices?: string[];
  visibleRegions?: string[];
}
export const GetAccountCustomizationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountColor: S.optional(AccountColor),
    visibleServices: S.optional(ServiceList),
    visibleRegions: S.optional(RegionsList),
  }),
).annotate({
  identifier: "GetAccountCustomizationsOutput",
}) as any as S.Schema<GetAccountCustomizationsOutput>;
export type NextToken = string;
export type MaxResults = number;
export interface ListServicesInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListServicesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/services" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServicesInput",
}) as any as S.Schema<ListServicesInput>;
export interface ListServicesOutput {
  nextToken?: string;
  services?: string[];
}
export const ListServicesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    services: S.optional(ServiceList),
  }),
).annotate({
  identifier: "ListServicesOutput",
}) as any as S.Schema<ListServicesOutput>;
export interface UpdateAccountCustomizationsInput {
  accountColor?: AccountColor;
  visibleServices?: string[];
  visibleRegions?: string[];
}
export const UpdateAccountCustomizationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountColor: S.optional(AccountColor),
    visibleServices: S.optional(ServiceList),
    visibleRegions: S.optional(RegionsList),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/v1/account-customizations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAccountCustomizationsInput",
}) as any as S.Schema<UpdateAccountCustomizationsInput>;
export interface UpdateAccountCustomizationsOutput {
  accountColor?: AccountColor;
  visibleServices?: string[];
  visibleRegions?: string[];
}
export const UpdateAccountCustomizationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountColor: S.optional(AccountColor),
    visibleServices: S.optional(ServiceList),
    visibleRegions: S.optional(RegionsList),
  }),
).annotate({
  identifier: "UpdateAccountCustomizationsOutput",
}) as any as S.Schema<UpdateAccountCustomizationsOutput>;
export interface ValidationExceptionField {
  path: string;
  message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ path: S.String, message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type GetAccountCustomizationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the current account customization settings, including account color, visible services, and visible Regions. Settings that you have not configured return their default values: visible Regions and visible services return `null`, and account color returns `none`.
 *
 * The `visibleServices` and `visibleRegions` settings control only the appearance of services and Regions in the Amazon Web Services Management Console. They do not restrict access through the CLI, SDKs, or other APIs.
 */
export const getAccountCustomizations: API.OperationMethod<
  GetAccountCustomizationsInput,
  GetAccountCustomizationsOutput,
  GetAccountCustomizationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountCustomizationsInput,
  output: GetAccountCustomizationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountCustomizations",
}));

export type ListServicesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of Amazon Web Services service identifiers that you can use as values for the `visibleServices` setting in UpdateAccountCustomizations. The available services vary by Amazon Web Services partition. Use pagination to retrieve all results.
 *
 * The `visibleServices` setting controls only the appearance of services in the Amazon Web Services Management Console. It does not restrict access through the CLI, SDKs, or other APIs.
 */
export const listServices: API.PaginatedOperationMethod<
  ListServicesInput,
  ListServicesOutput,
  ListServicesError,
  Credentials | HttpClient.HttpClient,
  Service
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServicesInput,
  output: ListServicesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "services",
  } as const,
})) as any;

export type UpdateAccountCustomizationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates one or more account customization settings. You can update account color, visible services, and visible Regions in a single request. Only the settings that you include in the request body are modified. Omitted settings remain unchanged. To reset a setting to its default behavior, set the value to `null` for visible Regions and visible services, or `none` for account color. This operation is idempotent.
 *
 * The `visibleServices` and `visibleRegions` settings control only the appearance of services and Regions in the Amazon Web Services Management Console. They do not restrict access through the CLI, SDKs, or other APIs.
 */
export const updateAccountCustomizations: API.OperationMethod<
  UpdateAccountCustomizationsInput,
  UpdateAccountCustomizationsOutput,
  UpdateAccountCustomizationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAccountCustomizationsInput,
  output: UpdateAccountCustomizationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountCustomizations",
}));
