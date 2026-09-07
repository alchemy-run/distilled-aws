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
  sdkId: "Marketplace Agreement",
  serviceShapeName: "AWSMPCommerceService_v20200301",
});
const auth = T.AwsAuthSigv4({ name: "aws-marketplace" });
const ver = T.ServiceVersion("2020-03-01");
const proto = T.AwsProtocolsAwsJson1_0();
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
              `https://agreement-marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://agreement-marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://agreement-marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://agreement-marketplace.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      requestId: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      reason: S.optional(
        S.suspend(() => AccessDeniedExceptionReason).annotate({
          identifier: "AccessDeniedExceptionReason",
        }),
      ),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      requestId: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(
        S.suspend(() => ResourceType).annotate({ identifier: "ResourceType" }),
      ),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      requestId: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      requestId: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(
        S.suspend(() => ResourceType).annotate({ identifier: "ResourceType" }),
      ),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      requestId: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      quotaCode: S.optional(S.String),
      serviceCode: S.optional(S.String),
      resourceType: S.optional(S.String),
      resourceId: S.optional(S.String),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      requestId: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      requestId: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      reason: S.optional(
        S.suspend(() => ValidationExceptionReason).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      fields: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type AgreementId = string;
export type AgreementCancellationRequestId = string;
export interface AcceptAgreementCancellationRequestInput {
  agreementId: string;
  agreementCancellationRequestId: string;
}
export const AcceptAgreementCancellationRequestInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      agreementId: S.String,
      agreementCancellationRequestId: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "AcceptAgreementCancellationRequestInput",
}) as any as S.Schema<AcceptAgreementCancellationRequestInput>;
export type AgreementCancellationRequestStatus =
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED"
  | "VALIDATION_FAILED"
  | (string & {});
export const AgreementCancellationRequestStatus = S.String;

export type AgreementCancellationRequestReasonCode =
  | "INCORRECT_TERMS_ACCEPTED"
  | "REPLACING_AGREEMENT"
  | "TEST_AGREEMENT"
  | "ALTERNATIVE_PROCUREMENT_CHANNEL"
  | "PRODUCT_DISCONTINUED"
  | "UNINTENDED_RENEWAL"
  | "BUYER_DISSATISFACTION"
  | "OTHER"
  | (string & {});
export const AgreementCancellationRequestReasonCode = S.String;

export type AgreementCancellationRequestDescription =
  | string
  | redacted.Redacted<string>;
export interface AcceptAgreementCancellationRequestOutput {
  agreementId?: string;
  agreementCancellationRequestId?: string;
  status?: AgreementCancellationRequestStatus;
  reasonCode?: AgreementCancellationRequestReasonCode;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  updatedAt?: Date;
}
export const AcceptAgreementCancellationRequestOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      agreementId: S.optional(S.String),
      agreementCancellationRequestId: S.optional(S.String),
      status: S.optional(AgreementCancellationRequestStatus),
      reasonCode: S.optional(AgreementCancellationRequestReasonCode),
      description: S.optional(SensitiveString),
      createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    }),
).annotate({
  identifier: "AcceptAgreementCancellationRequestOutput",
}) as any as S.Schema<AcceptAgreementCancellationRequestOutput>;
export type PaymentRequestId = string;
export type PurchaseOrderReference = string;
export interface AcceptAgreementPaymentRequestInput {
  paymentRequestId: string;
  agreementId: string;
  purchaseOrderReference?: string;
}
export const AcceptAgreementPaymentRequestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentRequestId: S.String,
    agreementId: S.String,
    purchaseOrderReference: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AcceptAgreementPaymentRequestInput",
}) as any as S.Schema<AcceptAgreementPaymentRequestInput>;
export type PaymentRequestStatus =
  | "VALIDATING"
  | "VALIDATION_FAILED"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED"
  | (string & {});
export const PaymentRequestStatus = S.String;

export type PaymentRequestName = string;
export type PaymentRequestDescription = string | redacted.Redacted<string>;
export type PositiveAmountUpto8Decimals = string;
export type CurrencyCode = string;
export interface AcceptAgreementPaymentRequestOutput {
  paymentRequestId?: string;
  agreementId?: string;
  status?: PaymentRequestStatus;
  name?: string;
  description?: string | redacted.Redacted<string>;
  chargeAmount?: string;
  currencyCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const AcceptAgreementPaymentRequestOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentRequestId: S.optional(S.String),
    agreementId: S.optional(S.String),
    status: S.optional(PaymentRequestStatus),
    name: S.optional(S.String),
    description: S.optional(SensitiveString),
    chargeAmount: S.optional(S.String),
    currencyCode: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "AcceptAgreementPaymentRequestOutput",
}) as any as S.Schema<AcceptAgreementPaymentRequestOutput>;
export type AgreementRequestId = string;
export type ResourceId = string;
export type ChargeRevision = number;
export interface PurchaseOrder {
  chargeId: string;
  chargeRevision?: number;
  agreementId?: string;
  purchaseOrderReference?: string;
}
export const PurchaseOrder = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    chargeId: S.String,
    chargeRevision: S.optional(S.Number),
    agreementId: S.optional(S.String),
    purchaseOrderReference: S.optional(S.String),
  }),
).annotate({ identifier: "PurchaseOrder" }) as any as S.Schema<PurchaseOrder>;
export type PurchaseOrders = PurchaseOrder[];
export const PurchaseOrders = /*@__PURE__*/ S.Array(PurchaseOrder);
export interface AcceptAgreementRequestInput {
  agreementRequestId: string;
  purchaseOrders?: PurchaseOrder[];
}
export const AcceptAgreementRequestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agreementRequestId: S.String,
    purchaseOrders: S.optional(PurchaseOrders),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AcceptAgreementRequestInput",
}) as any as S.Schema<AcceptAgreementRequestInput>;
export interface AcceptAgreementRequestOutput {
  agreementId?: string;
}
export const AcceptAgreementRequestOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agreementId: S.optional(S.String) }),
).annotate({
  identifier: "AcceptAgreementRequestOutput",
}) as any as S.Schema<AcceptAgreementRequestOutput>;
export type InvoiceId = string;
export type BillingAdjustmentReasonCode =
  | "INCORRECT_TERMS_ACCEPTED"
  | "INCORRECT_METERING"
  | "TEST_ENVIRONMENT_CHARGES"
  | "ALTERNATIVE_PROCUREMENT_CHANNEL"
  | "UNINTENDED_RENEWAL"
  | "BUYER_DISSATISFACTION"
  | "OTHER"
  | (string & {});
export const BillingAdjustmentReasonCode = S.String;

export type BillingAdjustmentDescription = string | redacted.Redacted<string>;
export type ClientToken = string;
export interface BatchCreateBillingAdjustmentRequestEntry {
  agreementId: string;
  originalInvoiceId: string;
  adjustmentAmount: string;
  currencyCode: string;
  adjustmentReasonCode: BillingAdjustmentReasonCode;
  description?: string | redacted.Redacted<string>;
  clientToken: string;
}
export const BatchCreateBillingAdjustmentRequestEntry = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      agreementId: S.String,
      originalInvoiceId: S.String,
      adjustmentAmount: S.String,
      currencyCode: S.String,
      adjustmentReasonCode: BillingAdjustmentReasonCode,
      description: S.optional(SensitiveString),
      clientToken: S.String,
    }),
).annotate({
  identifier: "BatchCreateBillingAdjustmentRequestEntry",
}) as any as S.Schema<BatchCreateBillingAdjustmentRequestEntry>;
export type BatchCreateBillingAdjustmentRequestEntryList =
  BatchCreateBillingAdjustmentRequestEntry[];
export const BatchCreateBillingAdjustmentRequestEntryList =
  /*@__PURE__*/ S.Array(BatchCreateBillingAdjustmentRequestEntry);
export interface BatchCreateBillingAdjustmentRequestInput {
  billingAdjustmentRequestEntries: BatchCreateBillingAdjustmentRequestEntry[];
}
export const BatchCreateBillingAdjustmentRequestInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      billingAdjustmentRequestEntries:
        BatchCreateBillingAdjustmentRequestEntryList,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "BatchCreateBillingAdjustmentRequestInput",
}) as any as S.Schema<BatchCreateBillingAdjustmentRequestInput>;
export type BillingAdjustmentRequestId = string;
export interface BatchCreateBillingAdjustmentItem {
  billingAdjustmentRequestId: string;
  clientToken: string;
}
export const BatchCreateBillingAdjustmentItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ billingAdjustmentRequestId: S.String, clientToken: S.String }),
).annotate({
  identifier: "BatchCreateBillingAdjustmentItem",
}) as any as S.Schema<BatchCreateBillingAdjustmentItem>;
export type BatchCreateBillingAdjustmentItemList =
  BatchCreateBillingAdjustmentItem[];
export const BatchCreateBillingAdjustmentItemList = /*@__PURE__*/ S.Array(
  BatchCreateBillingAdjustmentItem,
);
export type BillingAdjustmentErrorCode =
  | "CONFLICT_EXCEPTION"
  | "VALIDATION_EXCEPTION"
  | "RESOURCE_NOT_FOUND_EXCEPTION"
  | "INTERNAL_FAILURE"
  | (string & {});
export const BillingAdjustmentErrorCode = S.String;

export interface BatchCreateBillingAdjustmentError {
  code: BillingAdjustmentErrorCode;
  message: string;
  clientToken: string;
}
export const BatchCreateBillingAdjustmentError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    code: BillingAdjustmentErrorCode,
    message: S.String,
    clientToken: S.String,
  }),
).annotate({
  identifier: "BatchCreateBillingAdjustmentError",
}) as any as S.Schema<BatchCreateBillingAdjustmentError>;
export type BatchCreateBillingAdjustmentErrorList =
  BatchCreateBillingAdjustmentError[];
export const BatchCreateBillingAdjustmentErrorList = /*@__PURE__*/ S.Array(
  BatchCreateBillingAdjustmentError,
);
export interface BatchCreateBillingAdjustmentRequestOutput {
  items: BatchCreateBillingAdjustmentItem[];
  errors: BatchCreateBillingAdjustmentError[];
}
export const BatchCreateBillingAdjustmentRequestOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      items: BatchCreateBillingAdjustmentItemList,
      errors: BatchCreateBillingAdjustmentErrorList,
    }),
  ).annotate({
    identifier: "BatchCreateBillingAdjustmentRequestOutput",
  }) as any as S.Schema<BatchCreateBillingAdjustmentRequestOutput>;
export interface CancelAgreementInput {
  agreementId: string;
}
export const CancelAgreementInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agreementId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CancelAgreementInput",
}) as any as S.Schema<CancelAgreementInput>;
export interface CancelAgreementOutput {}
export const CancelAgreementOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelAgreementOutput",
}) as any as S.Schema<CancelAgreementOutput>;
export type AgreementCancellationRequestCancellationReason =
  | string
  | redacted.Redacted<string>;
export interface CancelAgreementCancellationRequestInput {
  agreementId: string;
  agreementCancellationRequestId: string;
  cancellationReason: string | redacted.Redacted<string>;
}
export const CancelAgreementCancellationRequestInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      agreementId: S.String,
      agreementCancellationRequestId: S.String,
      cancellationReason: SensitiveString,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CancelAgreementCancellationRequestInput",
}) as any as S.Schema<CancelAgreementCancellationRequestInput>;
export type AgreementCancellationRequestStatusMessage = string;
export interface CancelAgreementCancellationRequestOutput {
  agreementCancellationRequestId?: string;
  agreementId?: string;
  reasonCode?: AgreementCancellationRequestReasonCode;
  description?: string | redacted.Redacted<string>;
  status?: AgreementCancellationRequestStatus;
  statusMessage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const CancelAgreementCancellationRequestOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      agreementCancellationRequestId: S.optional(S.String),
      agreementId: S.optional(S.String),
      reasonCode: S.optional(AgreementCancellationRequestReasonCode),
      description: S.optional(SensitiveString),
      status: S.optional(AgreementCancellationRequestStatus),
      statusMessage: S.optional(S.String),
      createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    }),
).annotate({
  identifier: "CancelAgreementCancellationRequestOutput",
}) as any as S.Schema<CancelAgreementCancellationRequestOutput>;
export interface CancelAgreementPaymentRequestInput {
  paymentRequestId: string;
  agreementId: string;
}
export const CancelAgreementPaymentRequestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ paymentRequestId: S.String, agreementId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CancelAgreementPaymentRequestInput",
}) as any as S.Schema<CancelAgreementPaymentRequestInput>;
export interface CancelAgreementPaymentRequestOutput {
  paymentRequestId?: string;
  agreementId?: string;
  status?: PaymentRequestStatus;
  name?: string;
  description?: string | redacted.Redacted<string>;
  chargeAmount?: string;
  currencyCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const CancelAgreementPaymentRequestOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentRequestId: S.optional(S.String),
    agreementId: S.optional(S.String),
    status: S.optional(PaymentRequestStatus),
    name: S.optional(S.String),
    description: S.optional(SensitiveString),
    chargeAmount: S.optional(S.String),
    currencyCode: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "CancelAgreementPaymentRequestOutput",
}) as any as S.Schema<CancelAgreementPaymentRequestOutput>;
export type Intent = "NEW" | "AMEND" | "REPLACE" | (string & {});
export const Intent = S.String;

export type TermId = string;
export type BoundedString = string;
export type ZeroValueInteger = number;
export interface Dimension {
  dimensionKey: string;
  dimensionValue: number;
}
export const Dimension = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dimensionKey: S.String, dimensionValue: S.Number }),
).annotate({ identifier: "Dimension" }) as any as S.Schema<Dimension>;
export type DimensionList = Dimension[];
export const DimensionList = /*@__PURE__*/ S.Array(Dimension);
export interface ConfigurableUpfrontPricingTermConfiguration {
  selectorValue: string;
  dimensions: Dimension[];
}
export const ConfigurableUpfrontPricingTermConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ selectorValue: S.String, dimensions: DimensionList }),
  ).annotate({
    identifier: "ConfigurableUpfrontPricingTermConfiguration",
  }) as any as S.Schema<ConfigurableUpfrontPricingTermConfiguration>;
export interface RenewalTermConfiguration {
  enableAutoRenew: boolean;
}
export const RenewalTermConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enableAutoRenew: S.Boolean }),
).annotate({
  identifier: "RenewalTermConfiguration",
}) as any as S.Schema<RenewalTermConfiguration>;
export type PaymentRequestApprovalStrategy =
  | "AUTO_APPROVE_ON_EXPIRATION"
  | "WAIT_FOR_APPROVAL"
  | (string & {});
export const PaymentRequestApprovalStrategy = S.String;

export type ISO8601Duration = string;
export interface VariablePaymentTermConfiguration {
  paymentRequestApprovalStrategy: PaymentRequestApprovalStrategy;
  expirationDuration?: string;
}
export const VariablePaymentTermConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentRequestApprovalStrategy: PaymentRequestApprovalStrategy,
    expirationDuration: S.optional(S.String),
  }),
).annotate({
  identifier: "VariablePaymentTermConfiguration",
}) as any as S.Schema<VariablePaymentTermConfiguration>;
export type RequestedTermConfiguration =
  | {
      configurableUpfrontPricingTermConfiguration: ConfigurableUpfrontPricingTermConfiguration;
      renewalTermConfiguration?: never;
      variablePaymentTermConfiguration?: never;
    }
  | {
      configurableUpfrontPricingTermConfiguration?: never;
      renewalTermConfiguration: RenewalTermConfiguration;
      variablePaymentTermConfiguration?: never;
    }
  | {
      configurableUpfrontPricingTermConfiguration?: never;
      renewalTermConfiguration?: never;
      variablePaymentTermConfiguration: VariablePaymentTermConfiguration;
    };
export const RequestedTermConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({
    configurableUpfrontPricingTermConfiguration:
      ConfigurableUpfrontPricingTermConfiguration,
  }),
  S.Struct({ renewalTermConfiguration: RenewalTermConfiguration }),
  S.Struct({
    variablePaymentTermConfiguration: VariablePaymentTermConfiguration,
  }),
]);
export interface RequestedTerm {
  id: string;
  configuration?: RequestedTermConfiguration;
}
export const RequestedTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    configuration: S.optional(RequestedTermConfiguration),
  }),
).annotate({ identifier: "RequestedTerm" }) as any as S.Schema<RequestedTerm>;
export type RequestedTermList = RequestedTerm[];
export const RequestedTermList = /*@__PURE__*/ S.Array(RequestedTerm);
export type AgreementProposalId = string;
export type TaxEstimation = "DISABLED" | "ENABLED" | (string & {});
export const TaxEstimation = S.String;

export interface TaxConfiguration {
  taxEstimation?: TaxEstimation;
}
export const TaxConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taxEstimation: S.optional(TaxEstimation) }),
).annotate({
  identifier: "TaxConfiguration",
}) as any as S.Schema<TaxConfiguration>;
export interface CreateAgreementRequestInput {
  clientToken?: string;
  intent: Intent;
  requestedTerms: RequestedTerm[];
  sourceAgreementIdentifier?: string;
  agreementProposalIdentifier?: string;
  taxConfiguration?: TaxConfiguration;
}
export const CreateAgreementRequestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    intent: Intent,
    requestedTerms: RequestedTermList,
    sourceAgreementIdentifier: S.optional(S.String),
    agreementProposalIdentifier: S.optional(S.String),
    taxConfiguration: S.optional(TaxConfiguration),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateAgreementRequestInput",
}) as any as S.Schema<CreateAgreementRequestInput>;
export type Timing =
  | "ON_ACCEPTANCE"
  | "SCHEDULED"
  | "BILLING_PERIOD"
  | (string & {});
export const Timing = S.String;

export interface TaxBreakdownItem {
  amount?: string;
  rate?: string;
  type?: string;
}
export const TaxBreakdownItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    amount: S.optional(S.String),
    rate: S.optional(S.String),
    type: S.optional(S.String),
  }),
).annotate({
  identifier: "TaxBreakdownItem",
}) as any as S.Schema<TaxBreakdownItem>;
export type TaxBreakdown = TaxBreakdownItem[];
export const TaxBreakdown = /*@__PURE__*/ S.Array(TaxBreakdownItem);
export interface EstimatedTaxes {
  breakdown?: TaxBreakdownItem[];
  totalAmount?: string;
}
export const EstimatedTaxes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    breakdown: S.optional(TaxBreakdown),
    totalAmount: S.optional(S.String),
  }),
).annotate({ identifier: "EstimatedTaxes" }) as any as S.Schema<EstimatedTaxes>;
export interface ExpectedCharge {
  id?: string;
  time?: Date;
  amount?: string;
  amountAfterTax?: string;
  timing?: Timing;
  estimatedTaxes?: EstimatedTaxes;
}
export const ExpectedCharge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    time: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    amount: S.optional(S.String),
    amountAfterTax: S.optional(S.String),
    timing: S.optional(Timing),
    estimatedTaxes: S.optional(EstimatedTaxes),
  }),
).annotate({ identifier: "ExpectedCharge" }) as any as S.Schema<ExpectedCharge>;
export type ExpectedChargeList = ExpectedCharge[];
export const ExpectedChargeList = /*@__PURE__*/ S.Array(ExpectedCharge);
export interface ItemizedCharge {
  dimensionKey?: string;
  newQuantity?: number;
  oldQuantity?: number;
  chargeReference?: string;
  incrementalChargeAmount?: string;
}
export const ItemizedCharge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dimensionKey: S.optional(S.String),
    newQuantity: S.optional(S.Number),
    oldQuantity: S.optional(S.Number),
    chargeReference: S.optional(S.String),
    incrementalChargeAmount: S.optional(S.String),
  }),
).annotate({ identifier: "ItemizedCharge" }) as any as S.Schema<ItemizedCharge>;
export type ItemizedChargeList = ItemizedCharge[];
export const ItemizedChargeList = /*@__PURE__*/ S.Array(ItemizedCharge);
export interface InvoicingEntity {
  legalName?: string;
  branchName?: string;
}
export const InvoicingEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    legalName: S.optional(S.String),
    branchName: S.optional(S.String),
  }),
).annotate({
  identifier: "InvoicingEntity",
}) as any as S.Schema<InvoicingEntity>;
export interface ChargeSummary {
  currencyCode?: string;
  newAgreementValue?: string;
  newAgreementValueAfterTax?: string;
  expectedCharges?: ExpectedCharge[];
  estimatedTaxes?: EstimatedTaxes;
  itemizedCharges?: ItemizedCharge[];
  invoicingEntity?: InvoicingEntity;
}
export const ChargeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    currencyCode: S.optional(S.String),
    newAgreementValue: S.optional(S.String),
    newAgreementValueAfterTax: S.optional(S.String),
    expectedCharges: S.optional(ExpectedChargeList),
    estimatedTaxes: S.optional(EstimatedTaxes),
    itemizedCharges: S.optional(ItemizedChargeList),
    invoicingEntity: S.optional(InvoicingEntity),
  }),
).annotate({ identifier: "ChargeSummary" }) as any as S.Schema<ChargeSummary>;
export interface CreateAgreementRequestOutput {
  agreementRequestId?: string;
  chargeSummary?: ChargeSummary;
}
export const CreateAgreementRequestOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agreementRequestId: S.optional(S.String),
    chargeSummary: S.optional(ChargeSummary),
  }),
).annotate({
  identifier: "CreateAgreementRequestOutput",
}) as any as S.Schema<CreateAgreementRequestOutput>;
export interface DescribeAgreementInput {
  agreementId: string;
}
export const DescribeAgreementInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agreementId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeAgreementInput",
}) as any as S.Schema<DescribeAgreementInput>;
export type AWSAccountId = string;
export interface Acceptor {
  accountId?: string;
}
export const Acceptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountId: S.optional(S.String) }),
).annotate({ identifier: "Acceptor" }) as any as S.Schema<Acceptor>;
export interface Proposer {
  accountId?: string;
}
export const Proposer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountId: S.optional(S.String) }),
).annotate({ identifier: "Proposer" }) as any as S.Schema<Proposer>;
export type AgreementType = string;
export interface EstimatedCharges {
  currencyCode?: string;
  agreementValue?: string;
}
export const EstimatedCharges = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    currencyCode: S.optional(S.String),
    agreementValue: S.optional(S.String),
  }),
).annotate({
  identifier: "EstimatedCharges",
}) as any as S.Schema<EstimatedCharges>;
export type AgreementResourceType = string;
export interface Resource {
  id?: string;
  type?: string;
}
export const Resource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.optional(S.String), type: S.optional(S.String) }),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export type Resources = Resource[];
export const Resources = /*@__PURE__*/ S.Array(Resource);
export type OfferId = string;
export type OfferSetId = string;
export interface ProposalSummary {
  resources?: Resource[];
  offerId?: string;
  offerSetId?: string;
}
export const ProposalSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resources: S.optional(Resources),
    offerId: S.optional(S.String),
    offerSetId: S.optional(S.String),
  }),
).annotate({
  identifier: "ProposalSummary",
}) as any as S.Schema<ProposalSummary>;
export type AgreementStatus =
  | "ACTIVE"
  | "ARCHIVED"
  | "CANCELLED"
  | "EXPIRED"
  | "RENEWED"
  | "REPLACED"
  | "ROLLED_BACK"
  | "SUPERSEDED"
  | "TERMINATED"
  | (string & {});
export const AgreementStatus = S.String;

export interface DescribeAgreementOutput {
  agreementId?: string;
  acceptor?: Acceptor;
  proposer?: Proposer;
  startTime?: Date;
  endTime?: Date;
  acceptanceTime?: Date;
  agreementType?: string;
  estimatedCharges?: EstimatedCharges;
  proposalSummary?: ProposalSummary;
  status?: AgreementStatus;
}
export const DescribeAgreementOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agreementId: S.optional(S.String),
    acceptor: S.optional(Acceptor),
    proposer: S.optional(Proposer),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    acceptanceTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    agreementType: S.optional(S.String),
    estimatedCharges: S.optional(EstimatedCharges),
    proposalSummary: S.optional(ProposalSummary),
    status: S.optional(AgreementStatus),
  }),
).annotate({
  identifier: "DescribeAgreementOutput",
}) as any as S.Schema<DescribeAgreementOutput>;
export interface GetAgreementCancellationRequestInput {
  agreementCancellationRequestId: string;
  agreementId: string;
}
export const GetAgreementCancellationRequestInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      agreementCancellationRequestId: S.String,
      agreementId: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetAgreementCancellationRequestInput",
}) as any as S.Schema<GetAgreementCancellationRequestInput>;
export interface GetAgreementCancellationRequestOutput {
  agreementCancellationRequestId?: string;
  agreementId?: string;
  reasonCode?: AgreementCancellationRequestReasonCode;
  description?: string | redacted.Redacted<string>;
  status?: AgreementCancellationRequestStatus;
  statusMessage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const GetAgreementCancellationRequestOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      agreementCancellationRequestId: S.optional(S.String),
      agreementId: S.optional(S.String),
      reasonCode: S.optional(AgreementCancellationRequestReasonCode),
      description: S.optional(SensitiveString),
      status: S.optional(AgreementCancellationRequestStatus),
      statusMessage: S.optional(S.String),
      createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    }),
).annotate({
  identifier: "GetAgreementCancellationRequestOutput",
}) as any as S.Schema<GetAgreementCancellationRequestOutput>;
export type MaxResults = number;
export type NextToken = string;
export interface GetAgreementEntitlementsInput {
  agreementId: string;
  maxResults?: number;
  nextToken?: string;
}
export const GetAgreementEntitlementsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agreementId: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAgreementEntitlementsInput",
}) as any as S.Schema<GetAgreementEntitlementsInput>;
export type EntitlementType = string;
export type RegistrationToken = string;
export type AgreementEntitlementStatus =
  | "PROVISIONED"
  | "SCHEDULED"
  | "PENDING"
  | "FAILED"
  | "DEPROVISIONED"
  | (string & {});
export const AgreementEntitlementStatus = S.String;

export type AgreementEntitlementStatusReasonCode =
  | "PROVISIONING_IN_PROGRESS"
  | "FUTURE_START_DATE"
  | "INVALID_PAYMENT_INSTRUMENT"
  | "INCOMPATIBLE_CURRENCY"
  | "ACCOUNT_SUSPENDED"
  | "UNSUPPORTED_OPERATION"
  | "AGREEMENT_INACTIVE"
  | "AGREEMENT_ACTIVE"
  | "PRODUCT_RESTRICTED"
  | (string & {});
export const AgreementEntitlementStatusReasonCode = S.String;

export type AwsArn = string;
export interface AgreementEntitlement {
  resource?: Resource;
  type?: string;
  registrationToken?: string;
  status?: AgreementEntitlementStatus;
  statusReasonCode?: AgreementEntitlementStatusReasonCode;
  licenseArn?: string;
}
export const AgreementEntitlement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resource: S.optional(Resource),
    type: S.optional(S.String),
    registrationToken: S.optional(S.String),
    status: S.optional(AgreementEntitlementStatus),
    statusReasonCode: S.optional(AgreementEntitlementStatusReasonCode),
    licenseArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AgreementEntitlement",
}) as any as S.Schema<AgreementEntitlement>;
export type AgreementEntitlementList = AgreementEntitlement[];
export const AgreementEntitlementList =
  /*@__PURE__*/ S.Array(AgreementEntitlement);
export interface GetAgreementEntitlementsOutput {
  agreementEntitlements?: AgreementEntitlement[];
  nextToken?: string;
}
export const GetAgreementEntitlementsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agreementEntitlements: S.optional(AgreementEntitlementList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetAgreementEntitlementsOutput",
}) as any as S.Schema<GetAgreementEntitlementsOutput>;
export interface GetAgreementPaymentRequestInput {
  paymentRequestId: string;
  agreementId: string;
}
export const GetAgreementPaymentRequestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ paymentRequestId: S.String, agreementId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAgreementPaymentRequestInput",
}) as any as S.Schema<GetAgreementPaymentRequestInput>;
export type PaymentRequestStatusMessage = string;
export type ChargeId = string;
export interface GetAgreementPaymentRequestOutput {
  paymentRequestId?: string;
  agreementId?: string;
  status?: PaymentRequestStatus;
  statusMessage?: string;
  name?: string;
  description?: string | redacted.Redacted<string>;
  chargeId?: string;
  chargeAmount?: string;
  currencyCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const GetAgreementPaymentRequestOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentRequestId: S.optional(S.String),
    agreementId: S.optional(S.String),
    status: S.optional(PaymentRequestStatus),
    statusMessage: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(SensitiveString),
    chargeId: S.optional(S.String),
    chargeAmount: S.optional(S.String),
    currencyCode: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GetAgreementPaymentRequestOutput",
}) as any as S.Schema<GetAgreementPaymentRequestOutput>;
export interface GetAgreementTermsInput {
  agreementId: string;
  maxResults?: number;
  nextToken?: string;
}
export const GetAgreementTermsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agreementId: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAgreementTermsInput",
}) as any as S.Schema<GetAgreementTermsInput>;
export type UnversionedTermType = string;
export interface DocumentItem {
  type?: string;
  url?: string;
  version?: string;
}
export const DocumentItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    url: S.optional(S.String),
    version: S.optional(S.String),
  }),
).annotate({ identifier: "DocumentItem" }) as any as S.Schema<DocumentItem>;
export type DocumentList = DocumentItem[];
export const DocumentList = /*@__PURE__*/ S.Array(DocumentItem);
export interface LegalTerm {
  type?: string;
  id?: string;
  documents?: DocumentItem[];
}
export const LegalTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    id: S.optional(S.String),
    documents: S.optional(DocumentList),
  }),
).annotate({ identifier: "LegalTerm" }) as any as S.Schema<LegalTerm>;
export interface SupportTerm {
  type?: string;
  id?: string;
  refundPolicy?: string;
}
export const SupportTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    id: S.optional(S.String),
    refundPolicy: S.optional(S.String),
  }),
).annotate({ identifier: "SupportTerm" }) as any as S.Schema<SupportTerm>;
export interface RenewalTerm {
  type?: string;
  id?: string;
  configuration?: RenewalTermConfiguration;
}
export const RenewalTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    id: S.optional(S.String),
    configuration: S.optional(RenewalTermConfiguration),
  }),
).annotate({ identifier: "RenewalTerm" }) as any as S.Schema<RenewalTerm>;
export interface RateCardItem {
  dimensionKey?: string;
  price?: string;
}
export const RateCardItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dimensionKey: S.optional(S.String), price: S.optional(S.String) }),
).annotate({ identifier: "RateCardItem" }) as any as S.Schema<RateCardItem>;
export type RateCardList = RateCardItem[];
export const RateCardList = /*@__PURE__*/ S.Array(RateCardItem);
export interface UsageBasedRateCardItem {
  rateCard?: RateCardItem[];
}
export const UsageBasedRateCardItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ rateCard: S.optional(RateCardList) }),
).annotate({
  identifier: "UsageBasedRateCardItem",
}) as any as S.Schema<UsageBasedRateCardItem>;
export type UsageBasedRateCardList = UsageBasedRateCardItem[];
export const UsageBasedRateCardList = /*@__PURE__*/ S.Array(
  UsageBasedRateCardItem,
);
export interface UsageBasedPricingTerm {
  type?: string;
  id?: string;
  currencyCode?: string;
  rateCards?: UsageBasedRateCardItem[];
}
export const UsageBasedPricingTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    id: S.optional(S.String),
    currencyCode: S.optional(S.String),
    rateCards: S.optional(UsageBasedRateCardList),
  }),
).annotate({
  identifier: "UsageBasedPricingTerm",
}) as any as S.Schema<UsageBasedPricingTerm>;
export interface Selector {
  type?: string;
  value?: string;
}
export const Selector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: S.optional(S.String), value: S.optional(S.String) }),
).annotate({ identifier: "Selector" }) as any as S.Schema<Selector>;
export interface Constraints {
  multipleDimensionSelection?: string;
  quantityConfiguration?: string;
}
export const Constraints = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    multipleDimensionSelection: S.optional(S.String),
    quantityConfiguration: S.optional(S.String),
  }),
).annotate({ identifier: "Constraints" }) as any as S.Schema<Constraints>;
export interface ConfigurableUpfrontRateCardItem {
  selector?: Selector;
  constraints?: Constraints;
  rateCard?: RateCardItem[];
}
export const ConfigurableUpfrontRateCardItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    selector: S.optional(Selector),
    constraints: S.optional(Constraints),
    rateCard: S.optional(RateCardList),
  }),
).annotate({
  identifier: "ConfigurableUpfrontRateCardItem",
}) as any as S.Schema<ConfigurableUpfrontRateCardItem>;
export type ConfigurableUpfrontRateCardList = ConfigurableUpfrontRateCardItem[];
export const ConfigurableUpfrontRateCardList = /*@__PURE__*/ S.Array(
  ConfigurableUpfrontRateCardItem,
);
export interface ConfigurableUpfrontPricingTerm {
  type?: string;
  id?: string;
  currencyCode?: string;
  rateCards?: ConfigurableUpfrontRateCardItem[];
  configuration?: ConfigurableUpfrontPricingTermConfiguration;
}
export const ConfigurableUpfrontPricingTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    id: S.optional(S.String),
    currencyCode: S.optional(S.String),
    rateCards: S.optional(ConfigurableUpfrontRateCardList),
    configuration: S.optional(ConfigurableUpfrontPricingTermConfiguration),
  }),
).annotate({
  identifier: "ConfigurableUpfrontPricingTerm",
}) as any as S.Schema<ConfigurableUpfrontPricingTerm>;
export interface ByolPricingTerm {
  type?: string;
  id?: string;
}
export const ByolPricingTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: S.optional(S.String), id: S.optional(S.String) }),
).annotate({
  identifier: "ByolPricingTerm",
}) as any as S.Schema<ByolPricingTerm>;
export interface RecurringPaymentTerm {
  type?: string;
  id?: string;
  currencyCode?: string;
  billingPeriod?: string;
  price?: string;
}
export const RecurringPaymentTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    id: S.optional(S.String),
    currencyCode: S.optional(S.String),
    billingPeriod: S.optional(S.String),
    price: S.optional(S.String),
  }),
).annotate({
  identifier: "RecurringPaymentTerm",
}) as any as S.Schema<RecurringPaymentTerm>;
export interface ValidityTerm {
  type?: string;
  id?: string;
  agreementDuration?: string;
  agreementStartDate?: Date;
  agreementEndDate?: Date;
}
export const ValidityTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    id: S.optional(S.String),
    agreementDuration: S.optional(S.String),
    agreementStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    agreementEndDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "ValidityTerm" }) as any as S.Schema<ValidityTerm>;
export interface ScheduleItem {
  chargeDate?: Date;
  chargeAmount?: string;
}
export const ScheduleItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    chargeDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    chargeAmount: S.optional(S.String),
  }),
).annotate({ identifier: "ScheduleItem" }) as any as S.Schema<ScheduleItem>;
export type ScheduleList = ScheduleItem[];
export const ScheduleList = /*@__PURE__*/ S.Array(ScheduleItem);
export interface PaymentScheduleTerm {
  type?: string;
  id?: string;
  currencyCode?: string;
  schedule?: ScheduleItem[];
}
export const PaymentScheduleTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    id: S.optional(S.String),
    currencyCode: S.optional(S.String),
    schedule: S.optional(ScheduleList),
  }),
).annotate({
  identifier: "PaymentScheduleTerm",
}) as any as S.Schema<PaymentScheduleTerm>;
export type PositiveIntegerWithDefaultValueOne = number;
export interface GrantItem {
  dimensionKey?: string;
  maxQuantity?: number;
}
export const GrantItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dimensionKey: S.optional(S.String),
    maxQuantity: S.optional(S.Number),
  }),
).annotate({ identifier: "GrantItem" }) as any as S.Schema<GrantItem>;
export type GrantList = GrantItem[];
export const GrantList = /*@__PURE__*/ S.Array(GrantItem);
export interface FreeTrialPricingTerm {
  type?: string;
  id?: string;
  duration?: string;
  grants?: GrantItem[];
}
export const FreeTrialPricingTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    id: S.optional(S.String),
    duration: S.optional(S.String),
    grants: S.optional(GrantList),
  }),
).annotate({
  identifier: "FreeTrialPricingTerm",
}) as any as S.Schema<FreeTrialPricingTerm>;
export interface FixedUpfrontPricingTerm {
  type?: string;
  id?: string;
  currencyCode?: string;
  duration?: string;
  price?: string;
  grants?: GrantItem[];
}
export const FixedUpfrontPricingTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    id: S.optional(S.String),
    currencyCode: S.optional(S.String),
    duration: S.optional(S.String),
    price: S.optional(S.String),
    grants: S.optional(GrantList),
  }),
).annotate({
  identifier: "FixedUpfrontPricingTerm",
}) as any as S.Schema<FixedUpfrontPricingTerm>;
export interface VariablePaymentTerm {
  type?: string;
  id?: string;
  currencyCode?: string;
  maxTotalChargeAmount?: string;
  configuration?: VariablePaymentTermConfiguration;
}
export const VariablePaymentTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    id: S.optional(S.String),
    currencyCode: S.optional(S.String),
    maxTotalChargeAmount: S.optional(S.String),
    configuration: S.optional(VariablePaymentTermConfiguration),
  }),
).annotate({
  identifier: "VariablePaymentTerm",
}) as any as S.Schema<VariablePaymentTerm>;
export interface NetPaymentTerm {
  type?: string;
  id?: string;
  paymentDuePeriod?: string;
}
export const NetPaymentTerm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    id: S.optional(S.String),
    paymentDuePeriod: S.optional(S.String),
  }),
).annotate({ identifier: "NetPaymentTerm" }) as any as S.Schema<NetPaymentTerm>;
export type AcceptedTerm =
  | {
      legalTerm: LegalTerm;
      supportTerm?: never;
      renewalTerm?: never;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm?: never;
      recurringPaymentTerm?: never;
      validityTerm?: never;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm: SupportTerm;
      renewalTerm?: never;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm?: never;
      recurringPaymentTerm?: never;
      validityTerm?: never;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm?: never;
      renewalTerm: RenewalTerm;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm?: never;
      recurringPaymentTerm?: never;
      validityTerm?: never;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm?: never;
      renewalTerm?: never;
      usageBasedPricingTerm: UsageBasedPricingTerm;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm?: never;
      recurringPaymentTerm?: never;
      validityTerm?: never;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm?: never;
      renewalTerm?: never;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm: ConfigurableUpfrontPricingTerm;
      byolPricingTerm?: never;
      recurringPaymentTerm?: never;
      validityTerm?: never;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm?: never;
      renewalTerm?: never;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm: ByolPricingTerm;
      recurringPaymentTerm?: never;
      validityTerm?: never;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm?: never;
      renewalTerm?: never;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm?: never;
      recurringPaymentTerm: RecurringPaymentTerm;
      validityTerm?: never;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm?: never;
      renewalTerm?: never;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm?: never;
      recurringPaymentTerm?: never;
      validityTerm: ValidityTerm;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm?: never;
      renewalTerm?: never;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm?: never;
      recurringPaymentTerm?: never;
      validityTerm?: never;
      paymentScheduleTerm: PaymentScheduleTerm;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm?: never;
      renewalTerm?: never;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm?: never;
      recurringPaymentTerm?: never;
      validityTerm?: never;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm: FreeTrialPricingTerm;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm?: never;
      renewalTerm?: never;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm?: never;
      recurringPaymentTerm?: never;
      validityTerm?: never;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm: FixedUpfrontPricingTerm;
      variablePaymentTerm?: never;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm?: never;
      renewalTerm?: never;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm?: never;
      recurringPaymentTerm?: never;
      validityTerm?: never;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm: VariablePaymentTerm;
      netPaymentTerm?: never;
    }
  | {
      legalTerm?: never;
      supportTerm?: never;
      renewalTerm?: never;
      usageBasedPricingTerm?: never;
      configurableUpfrontPricingTerm?: never;
      byolPricingTerm?: never;
      recurringPaymentTerm?: never;
      validityTerm?: never;
      paymentScheduleTerm?: never;
      freeTrialPricingTerm?: never;
      fixedUpfrontPricingTerm?: never;
      variablePaymentTerm?: never;
      netPaymentTerm: NetPaymentTerm;
    };
export const AcceptedTerm = /*@__PURE__*/ S.Union([
  S.Struct({ legalTerm: LegalTerm }),
  S.Struct({ supportTerm: SupportTerm }),
  S.Struct({ renewalTerm: RenewalTerm }),
  S.Struct({ usageBasedPricingTerm: UsageBasedPricingTerm }),
  S.Struct({ configurableUpfrontPricingTerm: ConfigurableUpfrontPricingTerm }),
  S.Struct({ byolPricingTerm: ByolPricingTerm }),
  S.Struct({ recurringPaymentTerm: RecurringPaymentTerm }),
  S.Struct({ validityTerm: ValidityTerm }),
  S.Struct({ paymentScheduleTerm: PaymentScheduleTerm }),
  S.Struct({ freeTrialPricingTerm: FreeTrialPricingTerm }),
  S.Struct({ fixedUpfrontPricingTerm: FixedUpfrontPricingTerm }),
  S.Struct({ variablePaymentTerm: VariablePaymentTerm }),
  S.Struct({ netPaymentTerm: NetPaymentTerm }),
]);
export type AcceptedTermList = AcceptedTerm[];
export const AcceptedTermList = /*@__PURE__*/ S.Array(AcceptedTerm);
export interface GetAgreementTermsOutput {
  acceptedTerms?: AcceptedTerm[];
  nextToken?: string;
}
export const GetAgreementTermsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    acceptedTerms: S.optional(AcceptedTermList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetAgreementTermsOutput",
}) as any as S.Schema<GetAgreementTermsOutput>;
export interface GetBillingAdjustmentRequestInput {
  agreementId: string;
  billingAdjustmentRequestId: string;
}
export const GetBillingAdjustmentRequestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agreementId: S.String,
    billingAdjustmentRequestId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetBillingAdjustmentRequestInput",
}) as any as S.Schema<GetBillingAdjustmentRequestInput>;
export type BillingAdjustmentStatus =
  | "PENDING"
  | "VALIDATION_FAILED"
  | "COMPLETED"
  | (string & {});
export const BillingAdjustmentStatus = S.String;

export type BillingAdjustmentStatusMessage = string;
export interface GetBillingAdjustmentRequestOutput {
  billingAdjustmentRequestId: string;
  agreementId: string;
  adjustmentReasonCode: BillingAdjustmentReasonCode;
  description?: string;
  originalInvoiceId: string;
  adjustmentAmount: string;
  currencyCode: string;
  status: BillingAdjustmentStatus;
  statusMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}
export const GetBillingAdjustmentRequestOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    billingAdjustmentRequestId: S.String,
    agreementId: S.String,
    adjustmentReasonCode: BillingAdjustmentReasonCode,
    description: S.optional(S.String),
    originalInvoiceId: S.String,
    adjustmentAmount: S.String,
    currencyCode: S.String,
    status: BillingAdjustmentStatus,
    statusMessage: S.optional(S.String),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GetBillingAdjustmentRequestOutput",
}) as any as S.Schema<GetBillingAdjustmentRequestOutput>;
export type PartyType = string;
export type Catalog = string;
export interface ListAgreementCancellationRequestsInput {
  partyType: string;
  agreementId?: string;
  status?: AgreementCancellationRequestStatus;
  agreementType?: string;
  catalog?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListAgreementCancellationRequestsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      partyType: S.String,
      agreementId: S.optional(S.String),
      status: S.optional(AgreementCancellationRequestStatus),
      agreementType: S.optional(S.String),
      catalog: S.optional(S.String),
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListAgreementCancellationRequestsInput",
}) as any as S.Schema<ListAgreementCancellationRequestsInput>;
export interface AgreementCancellationRequestSummary {
  agreementCancellationRequestId?: string;
  agreementId?: string;
  status?: AgreementCancellationRequestStatus;
  reasonCode?: AgreementCancellationRequestReasonCode;
  agreementType?: string;
  catalog?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const AgreementCancellationRequestSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agreementCancellationRequestId: S.optional(S.String),
    agreementId: S.optional(S.String),
    status: S.optional(AgreementCancellationRequestStatus),
    reasonCode: S.optional(AgreementCancellationRequestReasonCode),
    agreementType: S.optional(S.String),
    catalog: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "AgreementCancellationRequestSummary",
}) as any as S.Schema<AgreementCancellationRequestSummary>;
export type AgreementCancellationRequestSummaryList =
  AgreementCancellationRequestSummary[];
export const AgreementCancellationRequestSummaryList = /*@__PURE__*/ S.Array(
  AgreementCancellationRequestSummary,
);
export interface ListAgreementCancellationRequestsOutput {
  nextToken?: string;
  items?: AgreementCancellationRequestSummary[];
}
export const ListAgreementCancellationRequestsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      items: S.optional(AgreementCancellationRequestSummaryList),
    }),
).annotate({
  identifier: "ListAgreementCancellationRequestsOutput",
}) as any as S.Schema<ListAgreementCancellationRequestsOutput>;
export interface ListAgreementChargesInput {
  catalog?: string;
  agreementId?: string;
  agreementType?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListAgreementChargesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    catalog: S.optional(S.String),
    agreementId: S.optional(S.String),
    agreementType: S.optional(S.String),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAgreementChargesInput",
}) as any as S.Schema<ListAgreementChargesInput>;
export interface Charge {
  id?: string;
  revision?: number;
  agreementId?: string;
  agreementType?: string;
  purchaseOrderReference?: string;
  currencyCode?: string;
  amount?: string;
  time?: Date;
}
export const Charge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    revision: S.optional(S.Number),
    agreementId: S.optional(S.String),
    agreementType: S.optional(S.String),
    purchaseOrderReference: S.optional(S.String),
    currencyCode: S.optional(S.String),
    amount: S.optional(S.String),
    time: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Charge" }) as any as S.Schema<Charge>;
export type Charges = Charge[];
export const Charges = /*@__PURE__*/ S.Array(Charge);
export interface ListAgreementChargesOutput {
  items?: Charge[];
  nextToken?: string;
}
export const ListAgreementChargesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: S.optional(Charges), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListAgreementChargesOutput",
}) as any as S.Schema<ListAgreementChargesOutput>;
export type LineItemGroupBy = "INVOICE_ID" | (string & {});
export const LineItemGroupBy = S.String;

export type InvoiceType = "INVOICE" | "CREDIT_MEMO" | (string & {});
export const InvoiceType = S.String;

export interface InvoiceBillingPeriod {
  month: number;
  year: number;
}
export const InvoiceBillingPeriod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ month: S.Number, year: S.Number }),
).annotate({
  identifier: "InvoiceBillingPeriod",
}) as any as S.Schema<InvoiceBillingPeriod>;
export interface ListAgreementInvoiceLineItemsInput {
  agreementId: string;
  groupBy: LineItemGroupBy;
  invoiceId?: string;
  invoiceType?: InvoiceType;
  invoiceBillingPeriod?: InvoiceBillingPeriod;
  beforeIssuedTime?: Date;
  afterIssuedTime?: Date;
  maxResults?: number;
  nextToken?: string;
}
export const ListAgreementInvoiceLineItemsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agreementId: S.String,
    groupBy: LineItemGroupBy,
    invoiceId: S.optional(S.String),
    invoiceType: S.optional(InvoiceType),
    invoiceBillingPeriod: S.optional(InvoiceBillingPeriod),
    beforeIssuedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    afterIssuedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAgreementInvoiceLineItemsInput",
}) as any as S.Schema<ListAgreementInvoiceLineItemsInput>;
export interface PricingCurrencyAmount {
  amount?: string;
  maxAdjustmentAmount?: string;
  currencyCode?: string;
}
export const PricingCurrencyAmount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    amount: S.optional(S.String),
    maxAdjustmentAmount: S.optional(S.String),
    currencyCode: S.optional(S.String),
  }),
).annotate({
  identifier: "PricingCurrencyAmount",
}) as any as S.Schema<PricingCurrencyAmount>;
export interface AgreementInvoiceLineItemGroupSummary {
  agreementId?: string;
  invoiceId?: string;
  pricingCurrencyAmount?: PricingCurrencyAmount;
  invoiceBillingPeriod?: InvoiceBillingPeriod;
  issuedTime?: Date;
  invoiceType?: InvoiceType;
  invoicingEntity?: InvoicingEntity;
}
export const AgreementInvoiceLineItemGroupSummary = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      agreementId: S.optional(S.String),
      invoiceId: S.optional(S.String),
      pricingCurrencyAmount: S.optional(PricingCurrencyAmount),
      invoiceBillingPeriod: S.optional(InvoiceBillingPeriod),
      issuedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      invoiceType: S.optional(InvoiceType),
      invoicingEntity: S.optional(InvoicingEntity),
    }),
).annotate({
  identifier: "AgreementInvoiceLineItemGroupSummary",
}) as any as S.Schema<AgreementInvoiceLineItemGroupSummary>;
export type AgreementInvoiceLineItemGroupSummaries =
  AgreementInvoiceLineItemGroupSummary[];
export const AgreementInvoiceLineItemGroupSummaries = /*@__PURE__*/ S.Array(
  AgreementInvoiceLineItemGroupSummary,
);
export interface ListAgreementInvoiceLineItemsOutput {
  agreementInvoiceLineItemGroupSummaries?: AgreementInvoiceLineItemGroupSummary[];
  nextToken?: string;
}
export const ListAgreementInvoiceLineItemsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agreementInvoiceLineItemGroupSummaries: S.optional(
      AgreementInvoiceLineItemGroupSummaries,
    ),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAgreementInvoiceLineItemsOutput",
}) as any as S.Schema<ListAgreementInvoiceLineItemsOutput>;
export interface ListAgreementPaymentRequestsInput {
  partyType: string;
  agreementType?: string;
  catalog?: string;
  agreementId?: string;
  status?: PaymentRequestStatus;
  maxResults?: number;
  nextToken?: string;
}
export const ListAgreementPaymentRequestsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    partyType: S.String,
    agreementType: S.optional(S.String),
    catalog: S.optional(S.String),
    agreementId: S.optional(S.String),
    status: S.optional(PaymentRequestStatus),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAgreementPaymentRequestsInput",
}) as any as S.Schema<ListAgreementPaymentRequestsInput>;
export interface PaymentRequestSummary {
  paymentRequestId?: string;
  agreementId?: string;
  status?: PaymentRequestStatus;
  name?: string;
  chargeId?: string;
  chargeAmount?: string;
  currencyCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const PaymentRequestSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentRequestId: S.optional(S.String),
    agreementId: S.optional(S.String),
    status: S.optional(PaymentRequestStatus),
    name: S.optional(S.String),
    chargeId: S.optional(S.String),
    chargeAmount: S.optional(S.String),
    currencyCode: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "PaymentRequestSummary",
}) as any as S.Schema<PaymentRequestSummary>;
export type PaymentRequestSummaryList = PaymentRequestSummary[];
export const PaymentRequestSummaryList = /*@__PURE__*/ S.Array(
  PaymentRequestSummary,
);
export interface ListAgreementPaymentRequestsOutput {
  nextToken?: string;
  items: PaymentRequestSummary[];
}
export const ListAgreementPaymentRequestsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    items: PaymentRequestSummaryList,
  }),
).annotate({
  identifier: "ListAgreementPaymentRequestsOutput",
}) as any as S.Schema<ListAgreementPaymentRequestsOutput>;
export interface ListBillingAdjustmentRequestsInput {
  agreementId?: string;
  status?: BillingAdjustmentStatus;
  createdAfter?: Date;
  createdBefore?: Date;
  maxResults?: number;
  catalog?: string;
  agreementType?: string;
  nextToken?: string;
}
export const ListBillingAdjustmentRequestsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agreementId: S.optional(S.String),
    status: S.optional(BillingAdjustmentStatus),
    createdAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createdBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    maxResults: S.optional(S.Number),
    catalog: S.optional(S.String),
    agreementType: S.optional(S.String),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListBillingAdjustmentRequestsInput",
}) as any as S.Schema<ListBillingAdjustmentRequestsInput>;
export interface BillingAdjustmentSummary {
  billingAdjustmentRequestId: string;
  originalInvoiceId: string;
  adjustmentAmount: string;
  currencyCode: string;
  status: BillingAdjustmentStatus;
  agreementId: string;
  createdAt: Date;
  updatedAt: Date;
  agreementType: string;
  catalog: string;
}
export const BillingAdjustmentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    billingAdjustmentRequestId: S.String,
    originalInvoiceId: S.String,
    adjustmentAmount: S.String,
    currencyCode: S.String,
    status: BillingAdjustmentStatus,
    agreementId: S.String,
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    agreementType: S.String,
    catalog: S.String,
  }),
).annotate({
  identifier: "BillingAdjustmentSummary",
}) as any as S.Schema<BillingAdjustmentSummary>;
export type BillingAdjustmentSummaryList = BillingAdjustmentSummary[];
export const BillingAdjustmentSummaryList = /*@__PURE__*/ S.Array(
  BillingAdjustmentSummary,
);
export interface ListBillingAdjustmentRequestsOutput {
  nextToken?: string;
  items: BillingAdjustmentSummary[];
}
export const ListBillingAdjustmentRequestsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    items: BillingAdjustmentSummaryList,
  }),
).annotate({
  identifier: "ListBillingAdjustmentRequestsOutput",
}) as any as S.Schema<ListBillingAdjustmentRequestsOutput>;
export type AgreementCancellationRequestRejectionReason =
  | string
  | redacted.Redacted<string>;
export interface RejectAgreementCancellationRequestInput {
  agreementId: string;
  agreementCancellationRequestId: string;
  rejectionReason: string | redacted.Redacted<string>;
}
export const RejectAgreementCancellationRequestInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      agreementId: S.String,
      agreementCancellationRequestId: S.String,
      rejectionReason: SensitiveString,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "RejectAgreementCancellationRequestInput",
}) as any as S.Schema<RejectAgreementCancellationRequestInput>;
export interface RejectAgreementCancellationRequestOutput {
  agreementId?: string;
  agreementCancellationRequestId?: string;
  status?: AgreementCancellationRequestStatus;
  statusMessage?: string;
  reasonCode?: AgreementCancellationRequestReasonCode;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  updatedAt?: Date;
}
export const RejectAgreementCancellationRequestOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      agreementId: S.optional(S.String),
      agreementCancellationRequestId: S.optional(S.String),
      status: S.optional(AgreementCancellationRequestStatus),
      statusMessage: S.optional(S.String),
      reasonCode: S.optional(AgreementCancellationRequestReasonCode),
      description: S.optional(SensitiveString),
      createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    }),
).annotate({
  identifier: "RejectAgreementCancellationRequestOutput",
}) as any as S.Schema<RejectAgreementCancellationRequestOutput>;
export type PaymentRequestRejectionReason = string;
export interface RejectAgreementPaymentRequestInput {
  paymentRequestId: string;
  agreementId: string;
  rejectionReason?: string;
}
export const RejectAgreementPaymentRequestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentRequestId: S.String,
    agreementId: S.String,
    rejectionReason: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RejectAgreementPaymentRequestInput",
}) as any as S.Schema<RejectAgreementPaymentRequestInput>;
export interface RejectAgreementPaymentRequestOutput {
  paymentRequestId?: string;
  agreementId?: string;
  status?: PaymentRequestStatus;
  statusMessage?: string;
  name?: string;
  description?: string | redacted.Redacted<string>;
  chargeAmount?: string;
  currencyCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export const RejectAgreementPaymentRequestOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentRequestId: S.optional(S.String),
    agreementId: S.optional(S.String),
    status: S.optional(PaymentRequestStatus),
    statusMessage: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(SensitiveString),
    chargeAmount: S.optional(S.String),
    currencyCode: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "RejectAgreementPaymentRequestOutput",
}) as any as S.Schema<RejectAgreementPaymentRequestOutput>;
export type FilterName = string;
export type FilterValue = string;
export type FilterValueList = string[];
export const FilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface Filter {
  name?: string;
  values?: string[];
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), values: S.optional(FilterValueList) }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = Filter[];
export const FilterList = /*@__PURE__*/ S.Array(Filter);
export type SortBy = string;
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export const SortOrder = S.String;

export interface Sort {
  sortBy?: string;
  sortOrder?: SortOrder;
}
export const Sort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sortBy: S.optional(S.String), sortOrder: S.optional(SortOrder) }),
).annotate({ identifier: "Sort" }) as any as S.Schema<Sort>;
export interface SearchAgreementsInput {
  catalog?: string;
  filters?: Filter[];
  sort?: Sort;
  maxResults?: number;
  nextToken?: string;
}
export const SearchAgreementsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    catalog: S.optional(S.String),
    filters: S.optional(FilterList),
    sort: S.optional(Sort),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SearchAgreementsInput",
}) as any as S.Schema<SearchAgreementsInput>;
export interface Entitlement {
  licenseArn?: string;
}
export const Entitlement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ licenseArn: S.optional(S.String) }),
).annotate({ identifier: "Entitlement" }) as any as S.Schema<Entitlement>;
export type EntitlementList = Entitlement[];
export const EntitlementList = /*@__PURE__*/ S.Array(Entitlement);
export interface AgreementViewSummary {
  agreementId?: string;
  acceptanceTime?: Date;
  startTime?: Date;
  endTime?: Date;
  agreementType?: string;
  acceptor?: Acceptor;
  proposer?: Proposer;
  proposalSummary?: ProposalSummary;
  status?: AgreementStatus;
  entitlements?: Entitlement[];
}
export const AgreementViewSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agreementId: S.optional(S.String),
    acceptanceTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    agreementType: S.optional(S.String),
    acceptor: S.optional(Acceptor),
    proposer: S.optional(Proposer),
    proposalSummary: S.optional(ProposalSummary),
    status: S.optional(AgreementStatus),
    entitlements: S.optional(EntitlementList),
  }),
).annotate({
  identifier: "AgreementViewSummary",
}) as any as S.Schema<AgreementViewSummary>;
export type AgreementViewSummaryList = AgreementViewSummary[];
export const AgreementViewSummaryList =
  /*@__PURE__*/ S.Array(AgreementViewSummary);
export interface SearchAgreementsOutput {
  agreementViewSummaries?: AgreementViewSummary[];
  nextToken?: string;
}
export const SearchAgreementsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agreementViewSummaries: S.optional(AgreementViewSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchAgreementsOutput",
}) as any as S.Schema<SearchAgreementsOutput>;
export interface SendAgreementCancellationRequestInput {
  agreementId: string;
  reasonCode: AgreementCancellationRequestReasonCode;
  clientToken?: string;
  description?: string | redacted.Redacted<string>;
}
export const SendAgreementCancellationRequestInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      agreementId: S.String,
      reasonCode: AgreementCancellationRequestReasonCode,
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      description: S.optional(SensitiveString),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "SendAgreementCancellationRequestInput",
}) as any as S.Schema<SendAgreementCancellationRequestInput>;
export interface SendAgreementCancellationRequestOutput {
  agreementId?: string;
  agreementCancellationRequestId?: string;
  status?: AgreementCancellationRequestStatus;
  reasonCode?: AgreementCancellationRequestReasonCode;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  updatedAt?: Date;
}
export const SendAgreementCancellationRequestOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      agreementId: S.optional(S.String),
      agreementCancellationRequestId: S.optional(S.String),
      status: S.optional(AgreementCancellationRequestStatus),
      reasonCode: S.optional(AgreementCancellationRequestReasonCode),
      description: S.optional(SensitiveString),
      createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    }),
).annotate({
  identifier: "SendAgreementCancellationRequestOutput",
}) as any as S.Schema<SendAgreementCancellationRequestOutput>;
export interface SendAgreementPaymentRequestInput {
  clientToken?: string;
  agreementId: string;
  termId: string;
  name: string;
  chargeAmount: string;
  description?: string | redacted.Redacted<string>;
}
export const SendAgreementPaymentRequestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    agreementId: S.String,
    termId: S.String,
    name: S.String,
    chargeAmount: S.String,
    description: S.optional(SensitiveString),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SendAgreementPaymentRequestInput",
}) as any as S.Schema<SendAgreementPaymentRequestInput>;
export interface SendAgreementPaymentRequestOutput {
  paymentRequestId?: string;
  agreementId?: string;
  status?: PaymentRequestStatus;
  name?: string;
  description?: string | redacted.Redacted<string>;
  chargeAmount?: string;
  currencyCode?: string;
  createdAt?: Date;
}
export const SendAgreementPaymentRequestOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    paymentRequestId: S.optional(S.String),
    agreementId: S.optional(S.String),
    status: S.optional(PaymentRequestStatus),
    name: S.optional(S.String),
    description: S.optional(SensitiveString),
    chargeAmount: S.optional(S.String),
    currencyCode: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "SendAgreementPaymentRequestOutput",
}) as any as S.Schema<SendAgreementPaymentRequestOutput>;
export interface UpdatePurchaseOrdersInput {
  purchaseOrders: PurchaseOrder[];
}
export const UpdatePurchaseOrdersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ purchaseOrders: PurchaseOrders }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdatePurchaseOrdersInput",
}) as any as S.Schema<UpdatePurchaseOrdersInput>;
export interface UpdatePurchaseOrdersOutput {}
export const UpdatePurchaseOrdersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdatePurchaseOrdersOutput",
}) as any as S.Schema<UpdatePurchaseOrdersOutput>;
export type RequestId = string;
export type ExceptionMessage = string;
export type AccessDeniedExceptionReason =
  | "INVALID_ACCOUNT_STATE"
  | "DENIED_BY_PRIVATE_MARKETPLACE_POLICY"
  | "FAILED_KYC_COMPLIANCE"
  | "MISSING_MFA"
  | "INVALID_ACCESS"
  | (string & {});
export const AccessDeniedExceptionReason = S.String;

export type ResourceType =
  | "Agreement"
  | "AgreementRequest"
  | "AgreementProposal"
  | "Charge"
  | "PaymentRequest"
  | "Invoice"
  | "AgreementCancellationRequest"
  | "BillingAdjustmentRequest"
  | (string & {});
export const ResourceType = S.String;

export type ValidationExceptionReason =
  | "MISSING_BILLING_ADJUSTMENTS"
  | "BILLING_ADJUSTMENTS_LIMIT_EXCEEDED"
  | "MISSING_INVOICE_ID"
  | "INVALID_ADJUSTMENT_AMOUNT"
  | "MISSING_ADJUSTMENT_AMOUNT"
  | "INVALID_REASON_CODE"
  | "MISSING_REASON_CODE"
  | "MISSING_DESCRIPTION"
  | "INVALID_INVOICE_ADJUSTMENT_PERIOD"
  | "INVALID_CURRENCY_CODE"
  | "MISSING_CURRENCY_CODE"
  | "EXCEEDED_MAXIMUM_ADJUSTMENT_AMOUNT"
  | "MISSING_BILLING_ADJUSTMENT_REQUEST_ENTRY"
  | "MULTIPLE_AGREEMENT_IDS"
  | "INVALID_AGREEMENT_CANCELLATION_REQUEST_ID"
  | "MISSING_AGREEMENT_CANCELLATION_REQUEST_ID"
  | "MISSING_REASON"
  | "INVALID_REASON"
  | "INVALID_STATUS"
  | "INVALID_AGREEMENT_ID"
  | "MISSING_AGREEMENT_ID"
  | "INVALID_CATALOG"
  | "INVALID_FILTERS"
  | "INVALID_FILTER_NAME"
  | "MISSING_FILTER_NAME"
  | "INVALID_FILTER_VALUES"
  | "MISSING_FILTER_VALUES"
  | "INVALID_SORT_BY"
  | "INVALID_SORT_ORDER"
  | "INVALID_NEXT_TOKEN"
  | "INVALID_MAX_RESULTS"
  | "INVALID_TERM_ID"
  | "MISSING_TERM_ID"
  | "MISSING_NAME"
  | "INVALID_NAME"
  | "INVALID_DESCRIPTION"
  | "MISSING_CHARGE_AMOUNT"
  | "INVALID_CHARGE_AMOUNT"
  | "MISSING_PAYMENT_REQUEST_ID"
  | "INVALID_PAYMENT_REQUEST_ID"
  | "MISSING_PARTY_TYPE"
  | "INVALID_PARTY_TYPE"
  | "UNSUPPORTED_FILTERS"
  | "INVALID_CLIENT_TOKEN"
  | "INVALID_INTENT"
  | "MISSING_INTENT"
  | "INVALID_SOURCE_AGREEMENT_IDENTIFIER"
  | "MISSING_SOURCE_AGREEMENT_IDENTIFIER"
  | "INVALID_AGREEMENT_PROPOSAL_IDENTIFIER"
  | "MISSING_AGREEMENT_PROPOSAL_IDENTIFIER"
  | "INVALID_REQUESTED_TERMS"
  | "MISSING_REQUESTED_TERMS"
  | "INVALID_REQUESTED_TERM_ID"
  | "MISSING_REQUESTED_TERM_ID"
  | "INVALID_REQUESTED_TERM_CONFIGURATION"
  | "MISSING_REQUESTED_TERM_CONFIGURATION"
  | "INVALID_AGREEMENT_REQUEST_ID"
  | "MISSING_AGREEMENT_REQUEST_ID"
  | "INVALID_PURCHASE_ORDERS"
  | "MISSING_PURCHASE_ORDERS"
  | "INVALID_CHARGE_ID"
  | "MISSING_CHARGE_ID"
  | "INVALID_CHARGE_REVISION"
  | "MISSING_CHARGE_REVISION"
  | "INVALID_AGREEMENT_TYPE"
  | "INVALID_PURCHASE_ORDER_REFERENCE"
  | "INACTIVE_AGREEMENT"
  | "SUPERSEDED_AGREEMENT_PROPOSAL"
  | "EXPIRED_AGREEMENT_PROPOSAL"
  | "MISSING_MANDATORY_TERMS"
  | "INCOMPATIBLE_TERMS"
  | "MISSING_USAGE_AGREEMENT"
  | "INVALID_INCREMENTAL_CHARGE"
  | "MISSING_ACCOUNT_ADDRESS"
  | "UNSUPPORTED_ACTION"
  | "INVALID_REJECTION_REASON"
  | "INVALID_PAYMENT_REQUEST_STATUS"
  | "OTHER"
  | "DUPLICATE_CHARGES"
  | "UNSUPPORTED_ACCOUNT_PLAN"
  | "DUPLICATE_AGREEMENT_IN_ORGANIZATION"
  | "MISSING_PURCHASE_ORDER_REFERENCE"
  | (string & {});
export const ValidationExceptionReason = S.String;

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
export type AcceptAgreementCancellationRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows buyers (acceptors) to accept a cancellation request that is in `PENDING_APPROVAL` status. Once accepted, the cancellation request transitions to `APPROVED` status and the agreement cancellation will be processed.
 *
 * Only cancellation requests in `PENDING_APPROVAL` status can be accepted. A `ConflictException` is thrown if the cancellation request is in any other status.
 */
export const acceptAgreementCancellationRequest: API.OperationMethod<
  AcceptAgreementCancellationRequestInput,
  AcceptAgreementCancellationRequestOutput,
  AcceptAgreementCancellationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptAgreementCancellationRequestInput,
  output: AcceptAgreementCancellationRequestOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptAgreementCancellationRequest",
}));

export type AcceptAgreementPaymentRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows buyers (acceptors) to accept a payment request that is in `PENDING_APPROVAL` status. Once accepted, the payment request transitions to `APPROVED` status and the charge will be processed. Buyers can optionally provide a purchase order reference for their internal tracking.
 *
 * Only payment requests in `PENDING_APPROVAL` status can be accepted. A `ConflictException` is thrown if the payment request is in any other status.
 */
export const acceptAgreementPaymentRequest: API.OperationMethod<
  AcceptAgreementPaymentRequestInput,
  AcceptAgreementPaymentRequestOutput,
  AcceptAgreementPaymentRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptAgreementPaymentRequestInput,
  output: AcceptAgreementPaymentRequestOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptAgreementPaymentRequest",
}));

export type AcceptAgreementRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Accepts an agreement request to finalize the agreement. The acceptor can optionally provide purchase orders to associate with the agreement charges.
 */
export const acceptAgreementRequest: API.OperationMethod<
  AcceptAgreementRequestInput,
  AcceptAgreementRequestOutput,
  AcceptAgreementRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptAgreementRequestInput,
  output: AcceptAgreementRequestOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptAgreementRequest",
}));

export type BatchCreateBillingAdjustmentRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows sellers (proposers) to submit billing adjustment requests for one or more invoices within an agreement. Each entry in the batch specifies an invoice and the adjustment amount. The operation returns successfully created adjustment request IDs and any errors for entries that failed to process.
 *
 * Each entry requires a unique `clientToken` for idempotency.
 */
export const batchCreateBillingAdjustmentRequest: API.OperationMethod<
  BatchCreateBillingAdjustmentRequestInput,
  BatchCreateBillingAdjustmentRequestOutput,
  BatchCreateBillingAdjustmentRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchCreateBillingAdjustmentRequestInput,
  output: BatchCreateBillingAdjustmentRequestOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateBillingAdjustmentRequest",
}));

export type CancelAgreementError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows an acceptor to cancel an active agreement. Not all agreements are eligible for cancellation. Use the error response to determine why a cancellation request was rejected.
 */
export const cancelAgreement: API.OperationMethod<
  CancelAgreementInput,
  CancelAgreementOutput,
  CancelAgreementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelAgreementInput,
  output: CancelAgreementOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelAgreement",
}));

export type CancelAgreementCancellationRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows sellers (proposers) to withdraw an existing agreement cancellation request that is in a pending state. Once cancelled, the cancellation request transitions to `CANCELLED` status and can no longer be approved or rejected by the buyer.
 *
 * Only cancellation requests in `PENDING_APPROVAL` status can be cancelled. A `ConflictException` is thrown if the cancellation request is in any other status.
 */
export const cancelAgreementCancellationRequest: API.OperationMethod<
  CancelAgreementCancellationRequestInput,
  CancelAgreementCancellationRequestOutput,
  CancelAgreementCancellationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelAgreementCancellationRequestInput,
  output: CancelAgreementCancellationRequestOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelAgreementCancellationRequest",
}));

export type CancelAgreementPaymentRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows sellers (proposers) to cancel a payment request that is in `PENDING_APPROVAL` status. Once cancelled, the payment request transitions to `CANCELLED` status and can no longer be accepted or rejected by the buyer.
 *
 * Only payment requests in `PENDING_APPROVAL` status can be cancelled. A `ConflictException` is thrown if the payment request is in any other status.
 */
export const cancelAgreementPaymentRequest: API.OperationMethod<
  CancelAgreementPaymentRequestInput,
  CancelAgreementPaymentRequestOutput,
  CancelAgreementPaymentRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelAgreementPaymentRequestInput,
  output: CancelAgreementPaymentRequestOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelAgreementPaymentRequest",
}));

export type CreateAgreementRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an agreement request that acts as a quote for the terms you want to accept. The agreement request captures the requested terms, calculates charges, and returns a summary. Use `AcceptAgreementRequest` with the returned `agreementRequestId` to finalize the agreement.
 */
export const createAgreementRequest: API.OperationMethod<
  CreateAgreementRequestInput,
  CreateAgreementRequestOutput,
  CreateAgreementRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAgreementRequestInput,
  output: CreateAgreementRequestOutput,
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
  operationName: "CreateAgreementRequest",
}));

export type DescribeAgreementError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides details about an agreement, such as the proposer, acceptor, start date, and end date.
 */
export const describeAgreement: API.OperationMethod<
  DescribeAgreementInput,
  DescribeAgreementOutput,
  DescribeAgreementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAgreementInput,
  output: DescribeAgreementOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAgreement",
}));

export type GetAgreementCancellationRequestError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific agreement cancellation request. Both sellers (proposers) and buyers (acceptors) can use this operation to view cancellation requests associated with their agreements.
 */
export const getAgreementCancellationRequest: API.OperationMethod<
  GetAgreementCancellationRequestInput,
  GetAgreementCancellationRequestOutput,
  GetAgreementCancellationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAgreementCancellationRequestInput,
  output: GetAgreementCancellationRequestOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgreementCancellationRequest",
}));

export type GetAgreementEntitlementsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Obtains details about the entitlements of an agreement.
 */
export const getAgreementEntitlements: API.PaginatedOperationMethod<
  GetAgreementEntitlementsInput,
  GetAgreementEntitlementsOutput,
  GetAgreementEntitlementsError,
  Credentials | HttpClient.HttpClient,
  AgreementEntitlement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetAgreementEntitlementsInput,
  output: GetAgreementEntitlementsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgreementEntitlements",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agreementEntitlements",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetAgreementPaymentRequestError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific payment request. Both sellers (proposers) and buyers (acceptors) can use this operation to view payment requests associated with their agreements. The response includes the current status, charge details, timestamps, and the charge ID if the request has been approved.
 *
 * The calling identity must be either the acceptor or proposer of the payment request. A `ResourceNotFoundException` is returned if the payment request does not exist.
 */
export const getAgreementPaymentRequest: API.OperationMethod<
  GetAgreementPaymentRequestInput,
  GetAgreementPaymentRequestOutput,
  GetAgreementPaymentRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAgreementPaymentRequestInput,
  output: GetAgreementPaymentRequestOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgreementPaymentRequest",
}));

export type GetAgreementTermsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Obtains details about the terms in an agreement that you participated in as proposer or acceptor.
 *
 * The details include:
 *
 * - `TermType` – The type of term, such as `LegalTerm`, `RenewalTerm`, or `ConfigurableUpfrontPricingTerm`.
 *
 * - `TermID` – The ID of the particular term, which is common between offer and agreement.
 *
 * - `TermPayload` – The key information contained in the term, such as the EULA for `LegalTerm` or pricing and dimensions for various pricing terms, such as `ConfigurableUpfrontPricingTerm` or `UsageBasedPricingTerm`.
 *
 * - `Configuration` – The buyer/acceptor's selection at the time of agreement creation, such as the number of units purchased for a dimension or setting the `EnableAutoRenew` flag.
 */
export const getAgreementTerms: API.PaginatedOperationMethod<
  GetAgreementTermsInput,
  GetAgreementTermsOutput,
  GetAgreementTermsError,
  Credentials | HttpClient.HttpClient,
  AcceptedTerm
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetAgreementTermsInput,
  output: GetAgreementTermsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgreementTerms",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "acceptedTerms",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetBillingAdjustmentRequestError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific billing adjustment request. Sellers (proposers) can use this operation to view the status and details of a billing adjustment request they submitted.
 */
export const getBillingAdjustmentRequest: API.OperationMethod<
  GetBillingAdjustmentRequestInput,
  GetBillingAdjustmentRequestOutput,
  GetBillingAdjustmentRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBillingAdjustmentRequestInput,
  output: GetBillingAdjustmentRequestOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBillingAdjustmentRequest",
}));

export type ListAgreementCancellationRequestsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists agreement cancellation requests available to you as a seller or buyer. Both sellers (proposers) and buyers (acceptors) can use this operation to find cancellation requests by specifying their party type and applying optional filters.
 *
 * `PartyType` is a required parameter. A `ValidationException` is returned if `PartyType` is not provided.
 */
export const listAgreementCancellationRequests: API.PaginatedOperationMethod<
  ListAgreementCancellationRequestsInput,
  ListAgreementCancellationRequestsOutput,
  ListAgreementCancellationRequestsError,
  Credentials | HttpClient.HttpClient,
  AgreementCancellationRequestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAgreementCancellationRequestsInput,
  output: ListAgreementCancellationRequestsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgreementCancellationRequests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgreementChargesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows acceptors to view charges and purchase orders that are associated with an agreement. The response includes details about all charges regardless of whether a purchase order is linked to each charge.
 */
export const listAgreementCharges: API.PaginatedOperationMethod<
  ListAgreementChargesInput,
  ListAgreementChargesOutput,
  ListAgreementChargesError,
  Credentials | HttpClient.HttpClient,
  Charge
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAgreementChargesInput,
  output: ListAgreementChargesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgreementCharges",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgreementInvoiceLineItemsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows sellers (proposers) to retrieve aggregated billing data from AWS Marketplace agreements using flexible grouping. Supports invoice-level aggregation with filtering by billing period, invoice type, and issued date.
 *
 * The `groupBy` parameter is required and supports only `INVOICE_ID` as a value. The `agreementId` parameter is required.
 */
export const listAgreementInvoiceLineItems: API.PaginatedOperationMethod<
  ListAgreementInvoiceLineItemsInput,
  ListAgreementInvoiceLineItemsOutput,
  ListAgreementInvoiceLineItemsError,
  Credentials | HttpClient.HttpClient,
  AgreementInvoiceLineItemGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAgreementInvoiceLineItemsInput,
  output: ListAgreementInvoiceLineItemsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgreementInvoiceLineItems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agreementInvoiceLineItemGroupSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgreementPaymentRequestsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists payment requests available to you as a seller or buyer. Both sellers (proposers) and buyers (acceptors) can use this operation to find payment requests by specifying their party type and applying optional parameters.
 *
 * `PartyType` is a required parameter. A `ValidationException` is returned if `PartyType` is not provided. Pagination is supported through `maxResults` (1-50, default 50) and `nextToken` parameters.
 */
export const listAgreementPaymentRequests: API.PaginatedOperationMethod<
  ListAgreementPaymentRequestsInput,
  ListAgreementPaymentRequestsOutput,
  ListAgreementPaymentRequestsError,
  Credentials | HttpClient.HttpClient,
  PaymentRequestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAgreementPaymentRequestsInput,
  output: ListAgreementPaymentRequestsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgreementPaymentRequests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBillingAdjustmentRequestsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists billing adjustment requests for a specific agreement. Sellers (proposers) can use this operation to view all billing adjustment requests associated with an agreement.
 */
export const listBillingAdjustmentRequests: API.PaginatedOperationMethod<
  ListBillingAdjustmentRequestsInput,
  ListBillingAdjustmentRequestsOutput,
  ListBillingAdjustmentRequestsError,
  Credentials | HttpClient.HttpClient,
  BillingAdjustmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBillingAdjustmentRequestsInput,
  output: ListBillingAdjustmentRequestsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBillingAdjustmentRequests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type RejectAgreementCancellationRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows buyers (acceptors) to reject a cancellation request that is in `PENDING_APPROVAL` status. Once rejected, the cancellation request transitions to `REJECTED` status and the agreement remains active. Buyers must provide a reason for the rejection.
 *
 * Only cancellation requests in `PENDING_APPROVAL` status can be rejected. A `ConflictException` is thrown if the cancellation request is in any other status.
 */
export const rejectAgreementCancellationRequest: API.OperationMethod<
  RejectAgreementCancellationRequestInput,
  RejectAgreementCancellationRequestOutput,
  RejectAgreementCancellationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectAgreementCancellationRequestInput,
  output: RejectAgreementCancellationRequestOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectAgreementCancellationRequest",
}));

export type RejectAgreementPaymentRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows buyers (acceptors) to reject a payment request that is in `PENDING_APPROVAL` status. Once rejected, the payment request transitions to `REJECTED` status and cannot be accepted. Buyers can optionally provide a reason for the rejection.
 *
 * Only payment requests in `PENDING_APPROVAL` status can be rejected. A `ConflictException` is thrown if the payment request is in any other status.
 */
export const rejectAgreementPaymentRequest: API.OperationMethod<
  RejectAgreementPaymentRequestInput,
  RejectAgreementPaymentRequestOutput,
  RejectAgreementPaymentRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectAgreementPaymentRequestInput,
  output: RejectAgreementPaymentRequestOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectAgreementPaymentRequest",
}));

export type SearchAgreementsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches across all agreements that a proposer or an acceptor has in AWS Marketplace. The search returns a list of agreements with basic agreement information.
 *
 * The following filter combinations are supported when the `PartyType` is `Proposer`:
 *
 * - `AgreementType`
 *
 * - `AgreementType` + `EndTime`
 *
 * - `AgreementType` + `ResourceType`
 *
 * - `AgreementType` + `ResourceType` + `EndTime`
 *
 * - `AgreementType` + `ResourceType` + `Status`
 *
 * - `AgreementType` + `ResourceType` + `Status` + `EndTime`
 *
 * - `AgreementType` + `ResourceIdentifier`
 *
 * - `AgreementType` + `ResourceIdentifier` + `EndTime`
 *
 * - `AgreementType` + `ResourceIdentifier` + `Status`
 *
 * - `AgreementType` + `ResourceIdentifier` + `Status` + `EndTime`
 *
 * - `AgreementType` + `AcceptorAccountId`
 *
 * - `AgreementType` + `AcceptorAccountId` + `EndTime`
 *
 * - `AgreementType` + `AcceptorAccountId` + `Status`
 *
 * - `AgreementType` + `AcceptorAccountId` + `Status` + `EndTime`
 *
 * - `AgreementType` + `AcceptorAccountId` + `OfferId`
 *
 * - `AgreementType` + `AcceptorAccountId` + `OfferId` + `Status`
 *
 * - `AgreementType` + `AcceptorAccountId` + `OfferId` + `EndTime`
 *
 * - `AgreementType` + `AcceptorAccountId` + `OfferId` + `Status` + `EndTime`
 *
 * - `AgreementType` + `AcceptorAccountId` + `ResourceIdentifier`
 *
 * - `AgreementType` + `AcceptorAccountId` + `ResourceIdentifier` + `Status`
 *
 * - `AgreementType` + `AcceptorAccountId` + `ResourceIdentifier` + `EndTime`
 *
 * - `AgreementType` + `AcceptorAccountId` + `ResourceIdentifier` + `Status` + `EndTime`
 *
 * - `AgreementType` + `AcceptorAccountId` + `ResourceType`
 *
 * - `AgreementType` + `AcceptorAccountId` + `ResourceType` + `EndTime`
 *
 * - `AgreementType` + `AcceptorAccountId` + `ResourceType` + `Status`
 *
 * - `AgreementType` + `AcceptorAccountId` + `ResourceType` + `Status` + `EndTime`
 *
 * - `AgreementType` + `Status`
 *
 * - `AgreementType` + `Status` + `EndTime`
 *
 * - `AgreementType` + `OfferId`
 *
 * - `AgreementType` + `OfferId` + `EndTime`
 *
 * - `AgreementType` + `OfferId` + `Status`
 *
 * - `AgreementType` + `OfferId` + `Status` + `EndTime`
 *
 * - `AgreementType` + `OfferSetId`
 *
 * - `AgreementType` + `OfferSetId` + `EndTime`
 *
 * - `AgreementType` + `OfferSetId` + `Status`
 *
 * - `AgreementType` + `OfferSetId` + `Status` + `EndTime`
 *
 * To filter by `EndTime`, you can use `BeforeEndTime` and/or `AfterEndTime`. Only `EndTime` is supported for sorting.
 *
 * The following filter combinations are supported when the `PartyType` is `Acceptor`:
 *
 * - `AgreementType`
 *
 * - `AgreementType` + `Status`
 *
 * - `AgreementType` + `EndTime`
 *
 * - `AgreementType` + `Status` + `EndTime`
 *
 * - `AgreementType` + `ResourceIdentifier`
 *
 * - `AgreementType` + `ResourceIdentifier` + `EndTime`
 *
 * - `AgreementType` + `ResourceIdentifier` + `Status`
 *
 * - `AgreementType` + `ResourceIdentifier` + `Status` + `EndTime`
 *
 * - `AgreementType` + `ResourceType`
 *
 * - `AgreementType` + `ResourceType` + `EndTime`
 *
 * - `AgreementType` + `OfferId`
 *
 * - `AgreementType` + `OfferId` + `EndTime`
 *
 * - `AgreementType` + `OfferId` + `Status`
 *
 * - `AgreementType` + `OfferId` + `Status` + `EndTime`
 *
 * - `AgreementType` + `OfferSetId`
 *
 * - `AgreementType` + `OfferSetId` + `EndTime`
 *
 * - `AgreementType` + `OfferSetId` + `Status`
 *
 * - `AgreementType` + `OfferSetId` + `Status` + `EndTime`
 */
export const searchAgreements: API.PaginatedOperationMethod<
  SearchAgreementsInput,
  SearchAgreementsOutput,
  SearchAgreementsError,
  Credentials | HttpClient.HttpClient,
  AgreementViewSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchAgreementsInput,
  output: SearchAgreementsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchAgreements",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agreementViewSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SendAgreementCancellationRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows sellers (proposers) to submit a cancellation request for an active agreement. The cancellation request is created in `PENDING_APPROVAL` status, at which point the buyer can review it.
 */
export const sendAgreementCancellationRequest: API.OperationMethod<
  SendAgreementCancellationRequestInput,
  SendAgreementCancellationRequestOutput,
  SendAgreementCancellationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendAgreementCancellationRequestInput,
  output: SendAgreementCancellationRequestOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendAgreementCancellationRequest",
}));

export type SendAgreementPaymentRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows sellers (proposers) to submit a payment request to buyers (acceptors) for a specific charge amount for an agreement that includes a `VariablePaymentTerm`. The payment request is created in `PENDING_APPROVAL` status, at which point the buyer can accept or reject it.
 *
 * The agreement must be active and have a `VariablePaymentTerm` to support payment requests. The `chargeAmount` must not exceed the remaining available balance under the `VariablePaymentTerm` `maxTotalChargeAmount`.
 */
export const sendAgreementPaymentRequest: API.OperationMethod<
  SendAgreementPaymentRequestInput,
  SendAgreementPaymentRequestOutput,
  SendAgreementPaymentRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendAgreementPaymentRequestInput,
  output: SendAgreementPaymentRequestOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendAgreementPaymentRequest",
}));

export type UpdatePurchaseOrdersError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows acceptors to associate purchase orders with agreement charges after an agreement is created.
 */
export const updatePurchaseOrders: API.OperationMethod<
  UpdatePurchaseOrdersInput,
  UpdatePurchaseOrdersOutput,
  UpdatePurchaseOrdersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePurchaseOrdersInput,
  output: UpdatePurchaseOrdersOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePurchaseOrders",
}));
