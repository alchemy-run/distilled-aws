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
  sdkId: "IAM Toolbox",
  serviceShapeName: "AuthRequestService",
});
const auth = T.AwsAuthSigv4({ name: "iam" });
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
              `https://iam-toolbox-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://iam-toolbox-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://iam-toolbox.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://iam-toolbox.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export interface GetRequestAuthorizationDetailsInput {
  authorizationId: string;
  nextToken?: string;
}
export const GetRequestAuthorizationDetailsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authorizationId: S.String.pipe(T.HttpLabel("authorizationId")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/authorization-details/{authorizationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRequestAuthorizationDetailsInput",
}) as any as S.Schema<GetRequestAuthorizationDetailsInput>;
export type AuthorizationContext = { [key: string]: any | undefined };
export const AuthorizationContext = /*@__PURE__*/ S.Record(
  S.String,
  S.Any.pipe(S.optional),
);
export type EvaluatedEffect =
  | "ALLOW"
  | "EXPLICIT_DENY"
  | "IMPLICIT_DENY"
  | (string & {});
export const EvaluatedEffect = S.String;

export type StatementEffect = "ALLOW" | "DENY" | (string & {});
export const StatementEffect = S.String;

export interface MatchedStatement {
  sid?: string;
  evaluatedEffect?: StatementEffect;
}
export const MatchedStatement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sid: S.optional(S.String),
    evaluatedEffect: S.optional(StatementEffect),
  }),
).annotate({
  identifier: "MatchedStatement",
}) as any as S.Schema<MatchedStatement>;
export type MatchedStatementList = MatchedStatement[];
export const MatchedStatementList = /*@__PURE__*/ S.Array(MatchedStatement);
export interface MatchedPolicy {
  uri: string;
  matchedStatements?: MatchedStatement[];
}
export const MatchedPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    uri: S.String,
    matchedStatements: S.optional(MatchedStatementList),
  }),
).annotate({ identifier: "MatchedPolicy" }) as any as S.Schema<MatchedPolicy>;
export type MatchedPolicyList = MatchedPolicy[];
export const MatchedPolicyList = /*@__PURE__*/ S.Array(MatchedPolicy);
export interface Evaluation {
  action: string;
  resource: string;
  context?: { [key: string]: any | undefined };
  evaluatedEffect?: EvaluatedEffect;
  matchedPolicies?: MatchedPolicy[];
}
export const Evaluation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: S.String,
    resource: S.String,
    context: S.optional(AuthorizationContext),
    evaluatedEffect: S.optional(EvaluatedEffect),
    matchedPolicies: S.optional(MatchedPolicyList),
  }),
).annotate({ identifier: "Evaluation" }) as any as S.Schema<Evaluation>;
export type Evaluations = Evaluation[];
export const Evaluations = /*@__PURE__*/ S.Array(Evaluation);
export type PolicyType =
  | "IDENTITY_BASED_POLICY"
  | "RESOURCE_BASED_POLICY"
  | "PERMISSIONS_BOUNDARY"
  | "SESSION_POLICY"
  | "SERVICE_CONTROL_POLICY"
  | "RESOURCE_CONTROL_POLICY"
  | "VPC_ENDPOINT_POLICY"
  | (string & {});
export const PolicyType = S.String;

export interface AttachedTo {
  arn?: string;
}
export const AttachedTo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.optional(S.String) }),
).annotate({ identifier: "AttachedTo" }) as any as S.Schema<AttachedTo>;
export type AttachedToList = AttachedTo[];
export const AttachedToList = /*@__PURE__*/ S.Array(AttachedTo);
export interface PolicyInfo {
  type?: PolicyType;
  inline?: boolean;
  uri?: string;
  attachedTo?: AttachedTo[];
}
export const PolicyInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(PolicyType),
    inline: S.optional(S.Boolean),
    uri: S.optional(S.String),
    attachedTo: S.optional(AttachedToList),
  }),
).annotate({ identifier: "PolicyInfo" }) as any as S.Schema<PolicyInfo>;
export type PolicyInfoList = PolicyInfo[];
export const PolicyInfoList = /*@__PURE__*/ S.Array(PolicyInfo);
export interface GetRequestAuthorizationDetailsOutput {
  requestContext: { [key: string]: any | undefined };
  evaluations: Evaluation[];
  policies: PolicyInfo[];
  nextToken?: string;
}
export const GetRequestAuthorizationDetailsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      requestContext: AuthorizationContext,
      evaluations: Evaluations,
      policies: PolicyInfoList,
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "GetRequestAuthorizationDetailsOutput",
}) as any as S.Schema<GetRequestAuthorizationDetailsOutput>;
export type GetRequestAuthorizationDetailsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the authorization details for a specific access denied request. The details include the request context, the evaluations performed, and the policies that were evaluated.
 *
 * Use this operation to understand why a request was denied. Supported services include an authorization ID in the access denied error message. Pass that ID to this operation to retrieve the details.
 *
 * Authorization details are available for at least 24 hours after the denial.
 *
 * To use this operation, you must have the `iam:GetRequestAuthorizationDetails` permission.
 */
export const getRequestAuthorizationDetails: API.PaginatedOperationMethod<
  GetRequestAuthorizationDetailsInput,
  GetRequestAuthorizationDetailsOutput,
  GetRequestAuthorizationDetailsError,
  Credentials | HttpClient.HttpClient,
  Evaluation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetRequestAuthorizationDetailsInput,
  output: GetRequestAuthorizationDetailsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRequestAuthorizationDetails",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "evaluations",
  } as const,
})) as any;
