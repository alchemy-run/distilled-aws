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
  sdkId: "Marketplace Reporting",
  serviceShapeName: "AWSMarketplaceReporting",
});
const auth = T.AwsAuthSigv4({ name: "aws-marketplace" });
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
              `https://reporting-marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://reporting-marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://reporting-marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://reporting-marketplace.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export type DashboardIdentifier = string;
export type EmbeddingDomain = string;
export type EmbeddingDomains = string[];
export const EmbeddingDomains = /*@__PURE__*/ S.Array(S.String);
export interface GetBuyerDashboardInput {
  dashboardIdentifier: string;
  embeddingDomains: string[];
}
export const GetBuyerDashboardInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dashboardIdentifier: S.String,
    embeddingDomains: EmbeddingDomains,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/getBuyerDashboard" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBuyerDashboardInput",
}) as any as S.Schema<GetBuyerDashboardInput>;
export interface GetBuyerDashboardOutput {
  embedUrl: string;
  dashboardIdentifier: string;
  embeddingDomains: string[];
}
export const GetBuyerDashboardOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    embedUrl: S.String,
    dashboardIdentifier: S.String,
    embeddingDomains: EmbeddingDomains,
  }),
).annotate({
  identifier: "GetBuyerDashboardOutput",
}) as any as S.Schema<GetBuyerDashboardOutput>;
export type GetBuyerDashboardError =
  | AccessDeniedException
  | BadRequestException
  | InternalServerException
  | UnauthorizedException
  | CommonErrors;
/**
 * Generates an embedding URL for an Amazon QuickSight dashboard for an anonymous user.
 *
 * This API is available only to Amazon Web Services Organization management accounts or
 * delegated administrators registered for the procurement insights
 * (`procurement-insights.marketplace.amazonaws.com`) feature.
 *
 * The following rules apply to a generated URL:
 *
 * - It contains a temporary bearer token, valid for 5 minutes after it is generated. Once redeemed within that period, it cannot be re-used again.
 *
 * - It has a session lifetime of one hour. The 5-minute validity period runs separately from the session lifetime.
 */
export const getBuyerDashboard: API.OperationMethod<
  GetBuyerDashboardInput,
  GetBuyerDashboardOutput,
  GetBuyerDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBuyerDashboardInput,
  output: GetBuyerDashboardOutput,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalServerException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBuyerDashboard",
}));
