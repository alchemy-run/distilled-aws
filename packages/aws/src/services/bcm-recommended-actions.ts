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
  sdkId: "BCM Recommended Actions",
  serviceShapeName: "AWSBillingAndCostManagementRecommendedActions",
});
const auth = T.AwsAuthSigv4({ name: "bcm-recommended-actions" });
const ver = T.ServiceVersion("2024-11-14");
const proto = T.AwsProtocolsAwsJson1_0();
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
  const _p0 = (_0: unknown) => ({
    authSchemes: [
      {
        name: "sigv4",
        signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}`,
      },
    ],
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
            `https://bcm-recommended-actions-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            _p0(PartitionResult),
            {},
          );
        }
        return e(
          `https://bcm-recommended-actions.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          _p0(PartitionResult),
          {},
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
    T.all(
      T.AwsQueryError({
        code: "BCMRecommendedActionsAccessDenied",
        httpResponseCode: 403,
      }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "BCMRecommendedActionsInternalServer",
        httpResponseCode: 500,
      }),
      T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "BCMRecommendedActionsThrottling",
        httpResponseCode: 429,
      }),
      T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.suspend(() => ValidationExceptionReason).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.all(
      T.AwsQueryError({
        code: "BCMRecommendedActionsValidation",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type FilterName = "FEATURE" | "SEVERITY" | "TYPE" | (string & {});
export const FilterName = /*@__PURE__*/ S.String;

export type MatchOption = "EQUALS" | "NOT_EQUALS" | (string & {});
export const MatchOption = /*@__PURE__*/ S.String;

export type FilterValue = string;
export type FilterValues = string[];
export const FilterValues = /*@__PURE__*/ S.Array(S.String);
export interface ActionFilter {
  key: FilterName;
  matchOption: MatchOption;
  values: string[];
}
export const ActionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: FilterName, matchOption: MatchOption, values: FilterValues }),
).annotate({ identifier: "ActionFilter" }) as any as S.Schema<ActionFilter>;
export type ActionFilterList = ActionFilter[];
export const ActionFilterList = /*@__PURE__*/ S.Array(ActionFilter);
export interface RequestFilter {
  actions?: ActionFilter[];
}
export const RequestFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ actions: S.optional(ActionFilterList) }),
).annotate({ identifier: "RequestFilter" }) as any as S.Schema<RequestFilter>;
export type MaxResults = number;
export type NextToken = string;
export interface ListRecommendedActionsRequest {
  filter?: RequestFilter;
  maxResults?: number;
  nextToken?: string;
}
export const ListRecommendedActionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filter: S.optional(RequestFilter),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRecommendedActionsRequest",
}) as any as S.Schema<ListRecommendedActionsRequest>;
export type ActionType =
  | "ADD_ALTERNATE_BILLING_CONTACT"
  | "CREATE_ANOMALY_MONITOR"
  | "CREATE_BUDGET"
  | "ENABLE_COST_OPTIMIZATION_HUB"
  | "MIGRATE_TO_GRANULAR_PERMISSIONS"
  | "PAYMENTS_DUE"
  | "PAYMENTS_PAST_DUE"
  | "REVIEW_ANOMALIES"
  | "REVIEW_BUDGET_ALERTS"
  | "REVIEW_BUDGETS_EXCEEDED"
  | "REVIEW_EXPIRING_RI"
  | "REVIEW_EXPIRING_SP"
  | "REVIEW_FREETIER_USAGE_ALERTS"
  | "REVIEW_FREETIER_CREDITS_REMAINING"
  | "REVIEW_FREETIER_DAYS_REMAINING"
  | "REVIEW_SAVINGS_OPPORTUNITY_RECOMMENDATIONS"
  | "UPDATE_EXPIRED_PAYMENT_METHOD"
  | "UPDATE_INVALID_PAYMENT_METHOD"
  | "UPDATE_TAX_EXEMPTION_CERTIFICATE"
  | "UPDATE_TAX_REGISTRATION_NUMBER"
  | (string & {});
export const ActionType = /*@__PURE__*/ S.String;

export type AccountId = string;
export type Severity = "INFO" | "WARNING" | "CRITICAL" | (string & {});
export const Severity = /*@__PURE__*/ S.String;

export type Feature =
  | "ACCOUNT"
  | "BUDGETS"
  | "COST_ANOMALY_DETECTION"
  | "COST_OPTIMIZATION_HUB"
  | "FREE_TIER"
  | "IAM"
  | "PAYMENTS"
  | "RESERVATIONS"
  | "SAVINGS_PLANS"
  | "TAX_SETTINGS"
  | (string & {});
export const Feature = /*@__PURE__*/ S.String;

export type Context = { [key: string]: string | undefined };
export const Context = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type NextStep = string;
export type NextSteps = string[];
export const NextSteps = /*@__PURE__*/ S.Array(S.String);
export interface RecommendedAction {
  id?: string;
  type?: ActionType;
  accountId?: string;
  severity?: Severity;
  feature?: Feature;
  context?: { [key: string]: string | undefined };
  nextSteps?: string[];
  lastUpdatedTimeStamp?: string;
}
export const RecommendedAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    type: S.optional(ActionType),
    accountId: S.optional(S.String),
    severity: S.optional(Severity),
    feature: S.optional(Feature),
    context: S.optional(Context),
    nextSteps: S.optional(NextSteps),
    lastUpdatedTimeStamp: S.optional(S.String),
  }),
).annotate({
  identifier: "RecommendedAction",
}) as any as S.Schema<RecommendedAction>;
export type RecommendedActions = RecommendedAction[];
export const RecommendedActions = /*@__PURE__*/ S.Array(RecommendedAction);
export interface ListRecommendedActionsResponse {
  recommendedActions: RecommendedAction[];
  nextToken?: string;
}
export const ListRecommendedActionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendedActions: RecommendedActions,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRecommendedActionsResponse",
}) as any as S.Schema<ListRecommendedActionsResponse>;
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | (string & {});
export const ValidationExceptionReason = /*@__PURE__*/ S.String;

export interface ValidationExceptionField {
  name: string;
  message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type ListRecommendedActionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of recommended actions that match the filter criteria.
 */
export const listRecommendedActions: API.PaginatedOperationMethod<
  ListRecommendedActionsRequest,
  ListRecommendedActionsResponse,
  ListRecommendedActionsError,
  Credentials | HttpClient.HttpClient,
  RecommendedAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRecommendedActionsRequest,
  output: ListRecommendedActionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendedActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recommendedActions",
    pageSize: "maxResults",
  } as const,
})) as any;
