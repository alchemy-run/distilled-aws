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
  sdkId: "billingconductor",
  serviceShapeName: "AWSBillingConductor",
});
const auth = T.AwsAuthSigv4({ name: "billingconductor" });
const ver = T.ServiceVersion("2021-07-30");
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
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            "https://billingconductor.us-east-1.amazonaws.com",
            {
              authSchemes: [
                {
                  name: "sigv4",
                  signingName: "billingconductor",
                  signingRegion: "us-east-1",
                },
              ],
            },
            {},
          );
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://billingconductor-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://billingconductor-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://billingconductor.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://billingconductor.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
      Reason: S.optional(
        S.suspend(() => ConflictExceptionReason).annotate({
          identifier: "ConflictExceptionReason",
        }),
      ),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      RetryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceLimitExceededException>()(
    "ServiceLimitExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.optional(S.String),
      ResourceType: S.optional(S.String),
      LimitCode: S.String,
      ServiceCode: S.String,
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      RetryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => ValidationExceptionReason).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      Fields: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type BillingGroupArn = string;
export type AccountId = string;
export type AccountIdList = string[];
export const AccountIdList = /*@__PURE__*/ S.Array(S.String);
export interface AssociateAccountsInput {
  Arn: string;
  AccountIds: string[];
}
export const AssociateAccountsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String, AccountIds: AccountIdList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/associate-accounts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateAccountsInput",
}) as any as S.Schema<AssociateAccountsInput>;
export interface AssociateAccountsOutput {
  Arn?: string;
}
export const AssociateAccountsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "AssociateAccountsOutput",
}) as any as S.Schema<AssociateAccountsOutput>;
export type PricingPlanArn = string;
export type PricingRuleArn = string;
export type PricingRuleArnsNonEmptyInput = string[];
export const PricingRuleArnsNonEmptyInput = /*@__PURE__*/ S.Array(S.String);
export interface AssociatePricingRulesInput {
  Arn: string;
  PricingRuleArns: string[];
}
export const AssociatePricingRulesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    PricingRuleArns: PricingRuleArnsNonEmptyInput,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/associate-pricing-rules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociatePricingRulesInput",
}) as any as S.Schema<AssociatePricingRulesInput>;
export interface AssociatePricingRulesOutput {
  Arn?: string;
}
export const AssociatePricingRulesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "AssociatePricingRulesOutput",
}) as any as S.Schema<AssociatePricingRulesOutput>;
export type CustomLineItemArn = string;
export type CustomLineItemAssociationElement = string;
export type CustomLineItemBatchAssociationsList = string[];
export const CustomLineItemBatchAssociationsList = /*@__PURE__*/ S.Array(
  S.String,
);
export type BillingPeriod = string;
export interface CustomLineItemBillingPeriodRange {
  InclusiveStartBillingPeriod: string;
  ExclusiveEndBillingPeriod?: string;
}
export const CustomLineItemBillingPeriodRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InclusiveStartBillingPeriod: S.String,
    ExclusiveEndBillingPeriod: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomLineItemBillingPeriodRange",
}) as any as S.Schema<CustomLineItemBillingPeriodRange>;
export interface BatchAssociateResourcesToCustomLineItemInput {
  TargetArn: string;
  ResourceArns: string[];
  BillingPeriodRange?: CustomLineItemBillingPeriodRange;
}
export const BatchAssociateResourcesToCustomLineItemInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TargetArn: S.String,
      ResourceArns: CustomLineItemBatchAssociationsList,
      BillingPeriodRange: S.optional(CustomLineItemBillingPeriodRange),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/batch-associate-resources-to-custom-line-item",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "BatchAssociateResourcesToCustomLineItemInput",
  }) as any as S.Schema<BatchAssociateResourcesToCustomLineItemInput>;
export type AssociateResourceErrorReason =
  | "INVALID_ARN"
  | "SERVICE_LIMIT_EXCEEDED"
  | "ILLEGAL_CUSTOMLINEITEM"
  | "INTERNAL_SERVER_EXCEPTION"
  | "INVALID_BILLING_PERIOD_RANGE"
  | (string & {});
export const AssociateResourceErrorReason = /*@__PURE__*/ S.String;

export interface AssociateResourceError {
  Message?: string;
  Reason?: AssociateResourceErrorReason;
}
export const AssociateResourceError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Message: S.optional(S.String),
    Reason: S.optional(AssociateResourceErrorReason),
  }),
).annotate({
  identifier: "AssociateResourceError",
}) as any as S.Schema<AssociateResourceError>;
export interface AssociateResourceResponseElement {
  Arn?: string;
  Error?: AssociateResourceError;
}
export const AssociateResourceResponseElement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Error: S.optional(AssociateResourceError),
  }),
).annotate({
  identifier: "AssociateResourceResponseElement",
}) as any as S.Schema<AssociateResourceResponseElement>;
export type AssociateResourcesResponseList = AssociateResourceResponseElement[];
export const AssociateResourcesResponseList = /*@__PURE__*/ S.Array(
  AssociateResourceResponseElement,
);
export interface BatchAssociateResourcesToCustomLineItemOutput {
  SuccessfullyAssociatedResources?: AssociateResourceResponseElement[];
  FailedAssociatedResources?: AssociateResourceResponseElement[];
}
export const BatchAssociateResourcesToCustomLineItemOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      SuccessfullyAssociatedResources: S.optional(
        AssociateResourcesResponseList,
      ),
      FailedAssociatedResources: S.optional(AssociateResourcesResponseList),
    }),
  ).annotate({
    identifier: "BatchAssociateResourcesToCustomLineItemOutput",
  }) as any as S.Schema<BatchAssociateResourcesToCustomLineItemOutput>;
export type CustomLineItemBatchDisassociationsList = string[];
export const CustomLineItemBatchDisassociationsList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface BatchDisassociateResourcesFromCustomLineItemInput {
  TargetArn: string;
  ResourceArns: string[];
  BillingPeriodRange?: CustomLineItemBillingPeriodRange;
}
export const BatchDisassociateResourcesFromCustomLineItemInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TargetArn: S.String,
      ResourceArns: CustomLineItemBatchDisassociationsList,
      BillingPeriodRange: S.optional(CustomLineItemBillingPeriodRange),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/batch-disassociate-resources-from-custom-line-item",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "BatchDisassociateResourcesFromCustomLineItemInput",
  }) as any as S.Schema<BatchDisassociateResourcesFromCustomLineItemInput>;
export interface DisassociateResourceResponseElement {
  Arn?: string;
  Error?: AssociateResourceError;
}
export const DisassociateResourceResponseElement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Error: S.optional(AssociateResourceError),
  }),
).annotate({
  identifier: "DisassociateResourceResponseElement",
}) as any as S.Schema<DisassociateResourceResponseElement>;
export type DisassociateResourcesResponseList =
  DisassociateResourceResponseElement[];
export const DisassociateResourcesResponseList = /*@__PURE__*/ S.Array(
  DisassociateResourceResponseElement,
);
export interface BatchDisassociateResourcesFromCustomLineItemOutput {
  SuccessfullyDisassociatedResources?: DisassociateResourceResponseElement[];
  FailedDisassociatedResources?: DisassociateResourceResponseElement[];
}
export const BatchDisassociateResourcesFromCustomLineItemOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      SuccessfullyDisassociatedResources: S.optional(
        DisassociateResourcesResponseList,
      ),
      FailedDisassociatedResources: S.optional(
        DisassociateResourcesResponseList,
      ),
    }),
  ).annotate({
    identifier: "BatchDisassociateResourcesFromCustomLineItemOutput",
  }) as any as S.Schema<BatchDisassociateResourcesFromCustomLineItemOutput>;
export type ClientToken = string;
export type BillingGroupName = string | redacted.Redacted<string>;
export type ResponsibilityTransferArn = string;
export interface AccountGrouping {
  LinkedAccountIds?: string[];
  AutoAssociate?: boolean;
  ResponsibilityTransferArn?: string;
}
export const AccountGrouping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LinkedAccountIds: S.optional(AccountIdList),
    AutoAssociate: S.optional(S.Boolean),
    ResponsibilityTransferArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AccountGrouping",
}) as any as S.Schema<AccountGrouping>;
export type PricingPlanFullArn = string;
export interface ComputationPreference {
  PricingPlanArn: string;
}
export const ComputationPreference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PricingPlanArn: S.String }),
).annotate({
  identifier: "ComputationPreference",
}) as any as S.Schema<ComputationPreference>;
export type BillingGroupDescription = string | redacted.Redacted<string>;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateBillingGroupInput {
  ClientToken?: string;
  Name: string | redacted.Redacted<string>;
  AccountGrouping: AccountGrouping;
  ComputationPreference: ComputationPreference;
  PrimaryAccountId?: string;
  Description?: string | redacted.Redacted<string>;
  Tags?: { [key: string]: string | undefined };
}
export const CreateBillingGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
      T.IdempotencyToken(),
    ),
    Name: SensitiveString,
    AccountGrouping: AccountGrouping,
    ComputationPreference: ComputationPreference,
    PrimaryAccountId: S.optional(S.String),
    Description: S.optional(SensitiveString),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/create-billing-group" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBillingGroupInput",
}) as any as S.Schema<CreateBillingGroupInput>;
export interface CreateBillingGroupOutput {
  Arn?: string;
}
export const CreateBillingGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "CreateBillingGroupOutput",
}) as any as S.Schema<CreateBillingGroupOutput>;
export type CustomLineItemName = string | redacted.Redacted<string>;
export type CustomLineItemDescription = string | redacted.Redacted<string>;
export type CustomLineItemChargeValue = number;
export interface CustomLineItemFlatChargeDetails {
  ChargeValue: number;
}
export const CustomLineItemFlatChargeDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChargeValue: S.Number }),
).annotate({
  identifier: "CustomLineItemFlatChargeDetails",
}) as any as S.Schema<CustomLineItemFlatChargeDetails>;
export type CustomLineItemPercentageChargeValue = number;
export type CustomLineItemAssociationsList = string[];
export const CustomLineItemAssociationsList = /*@__PURE__*/ S.Array(S.String);
export interface CustomLineItemPercentageChargeDetails {
  PercentageValue: number;
  AssociatedValues?: string[];
}
export const CustomLineItemPercentageChargeDetails = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      PercentageValue: S.Number,
      AssociatedValues: S.optional(CustomLineItemAssociationsList),
    }),
).annotate({
  identifier: "CustomLineItemPercentageChargeDetails",
}) as any as S.Schema<CustomLineItemPercentageChargeDetails>;
export type CustomLineItemType = "CREDIT" | "FEE" | (string & {});
export const CustomLineItemType = /*@__PURE__*/ S.String;

export type LineItemFilterAttributeName =
  | "LINE_ITEM_TYPE"
  | "SERVICE"
  | (string & {});
export const LineItemFilterAttributeName = /*@__PURE__*/ S.String;

export type MatchOption = "NOT_EQUAL" | "EQUAL" | (string & {});
export const MatchOption = /*@__PURE__*/ S.String;

export type LineItemFilterValue = "SAVINGS_PLAN_NEGATION" | (string & {});
export const LineItemFilterValue = /*@__PURE__*/ S.String;

export type LineItemFilterValuesList = LineItemFilterValue[];
export const LineItemFilterValuesList =
  /*@__PURE__*/ S.Array(LineItemFilterValue);
export type AttributeValue = string;
export type AttributeValueList = string[];
export const AttributeValueList = /*@__PURE__*/ S.Array(S.String);
export interface LineItemFilter {
  Attribute: LineItemFilterAttributeName;
  MatchOption: MatchOption;
  Values?: LineItemFilterValue[];
  AttributeValues?: string[];
}
export const LineItemFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attribute: LineItemFilterAttributeName,
    MatchOption: MatchOption,
    Values: S.optional(LineItemFilterValuesList),
    AttributeValues: S.optional(AttributeValueList),
  }),
).annotate({ identifier: "LineItemFilter" }) as any as S.Schema<LineItemFilter>;
export type LineItemFiltersList = LineItemFilter[];
export const LineItemFiltersList = /*@__PURE__*/ S.Array(LineItemFilter);
export interface CustomLineItemChargeDetails {
  Flat?: CustomLineItemFlatChargeDetails;
  Percentage?: CustomLineItemPercentageChargeDetails;
  Type: CustomLineItemType;
  LineItemFilters?: LineItemFilter[];
}
export const CustomLineItemChargeDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Flat: S.optional(CustomLineItemFlatChargeDetails),
    Percentage: S.optional(CustomLineItemPercentageChargeDetails),
    Type: CustomLineItemType,
    LineItemFilters: S.optional(LineItemFiltersList),
  }),
).annotate({
  identifier: "CustomLineItemChargeDetails",
}) as any as S.Schema<CustomLineItemChargeDetails>;
export type ComputationRuleEnum = "ITEMIZED" | "CONSOLIDATED" | (string & {});
export const ComputationRuleEnum = /*@__PURE__*/ S.String;

export type Service = string;
export interface PresentationObject {
  Service: string;
}
export const PresentationObject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Service: S.String }),
).annotate({
  identifier: "PresentationObject",
}) as any as S.Schema<PresentationObject>;
export interface CreateCustomLineItemInput {
  ClientToken?: string;
  Name: string | redacted.Redacted<string>;
  Description: string | redacted.Redacted<string>;
  BillingGroupArn: string;
  BillingPeriodRange?: CustomLineItemBillingPeriodRange;
  Tags?: { [key: string]: string | undefined };
  ChargeDetails: CustomLineItemChargeDetails;
  AccountId?: string;
  ComputationRule?: ComputationRuleEnum;
  PresentationDetails?: PresentationObject;
}
export const CreateCustomLineItemInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
      T.IdempotencyToken(),
    ),
    Name: SensitiveString,
    Description: SensitiveString,
    BillingGroupArn: S.String,
    BillingPeriodRange: S.optional(CustomLineItemBillingPeriodRange),
    Tags: S.optional(TagMap),
    ChargeDetails: CustomLineItemChargeDetails,
    AccountId: S.optional(S.String),
    ComputationRule: S.optional(ComputationRuleEnum),
    PresentationDetails: S.optional(PresentationObject),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/create-custom-line-item" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCustomLineItemInput",
}) as any as S.Schema<CreateCustomLineItemInput>;
export interface CreateCustomLineItemOutput {
  Arn?: string;
}
export const CreateCustomLineItemOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "CreateCustomLineItemOutput",
}) as any as S.Schema<CreateCustomLineItemOutput>;
export type PricingPlanName = string | redacted.Redacted<string>;
export type PricingPlanDescription = string | redacted.Redacted<string>;
export type PricingRuleArnsInput = string[];
export const PricingRuleArnsInput = /*@__PURE__*/ S.Array(S.String);
export interface CreatePricingPlanInput {
  ClientToken?: string;
  Name: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  PricingRuleArns?: string[];
  Tags?: { [key: string]: string | undefined };
}
export const CreatePricingPlanInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
      T.IdempotencyToken(),
    ),
    Name: SensitiveString,
    Description: S.optional(SensitiveString),
    PricingRuleArns: S.optional(PricingRuleArnsInput),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/create-pricing-plan" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePricingPlanInput",
}) as any as S.Schema<CreatePricingPlanInput>;
export interface CreatePricingPlanOutput {
  Arn?: string;
}
export const CreatePricingPlanOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "CreatePricingPlanOutput",
}) as any as S.Schema<CreatePricingPlanOutput>;
export type PricingRuleName = string | redacted.Redacted<string>;
export type PricingRuleDescription = string | redacted.Redacted<string>;
export type PricingRuleScope =
  | "GLOBAL"
  | "SERVICE"
  | "BILLING_ENTITY"
  | "SKU"
  | (string & {});
export const PricingRuleScope = /*@__PURE__*/ S.String;

export type PricingRuleType = "MARKUP" | "DISCOUNT" | "TIERING" | (string & {});
export const PricingRuleType = /*@__PURE__*/ S.String;

export type ModifierPercentage = number;
export type BillingEntity = string;
export type TieringActivated = boolean;
export interface CreateFreeTierConfig {
  Activated: boolean;
}
export const CreateFreeTierConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Activated: S.Boolean }),
).annotate({
  identifier: "CreateFreeTierConfig",
}) as any as S.Schema<CreateFreeTierConfig>;
export interface CreateTieringInput {
  FreeTier: CreateFreeTierConfig;
}
export const CreateTieringInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FreeTier: CreateFreeTierConfig }),
).annotate({
  identifier: "CreateTieringInput",
}) as any as S.Schema<CreateTieringInput>;
export type UsageType = string;
export type Operation = string;
export interface CreatePricingRuleInput {
  ClientToken?: string;
  Name: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  Scope: PricingRuleScope;
  Type: PricingRuleType;
  ModifierPercentage?: number;
  Service?: string;
  Tags?: { [key: string]: string | undefined };
  BillingEntity?: string;
  Tiering?: CreateTieringInput;
  UsageType?: string;
  Operation?: string;
}
export const CreatePricingRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(
      T.HttpHeader("X-Amzn-Client-Token"),
      T.IdempotencyToken(),
    ),
    Name: SensitiveString,
    Description: S.optional(SensitiveString),
    Scope: PricingRuleScope,
    Type: PricingRuleType,
    ModifierPercentage: S.optional(S.Number),
    Service: S.optional(S.String),
    Tags: S.optional(TagMap),
    BillingEntity: S.optional(S.String),
    Tiering: S.optional(CreateTieringInput),
    UsageType: S.optional(S.String),
    Operation: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/create-pricing-rule" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePricingRuleInput",
}) as any as S.Schema<CreatePricingRuleInput>;
export interface CreatePricingRuleOutput {
  Arn?: string;
}
export const CreatePricingRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "CreatePricingRuleOutput",
}) as any as S.Schema<CreatePricingRuleOutput>;
export interface DeleteBillingGroupInput {
  Arn: string;
}
export const DeleteBillingGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/delete-billing-group" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBillingGroupInput",
}) as any as S.Schema<DeleteBillingGroupInput>;
export interface DeleteBillingGroupOutput {
  Arn?: string;
}
export const DeleteBillingGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "DeleteBillingGroupOutput",
}) as any as S.Schema<DeleteBillingGroupOutput>;
export interface DeleteCustomLineItemInput {
  Arn: string;
  BillingPeriodRange?: CustomLineItemBillingPeriodRange;
}
export const DeleteCustomLineItemInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    BillingPeriodRange: S.optional(CustomLineItemBillingPeriodRange),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/delete-custom-line-item" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCustomLineItemInput",
}) as any as S.Schema<DeleteCustomLineItemInput>;
export interface DeleteCustomLineItemOutput {
  Arn?: string;
}
export const DeleteCustomLineItemOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "DeleteCustomLineItemOutput",
}) as any as S.Schema<DeleteCustomLineItemOutput>;
export interface DeletePricingPlanInput {
  Arn: string;
}
export const DeletePricingPlanInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/delete-pricing-plan" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePricingPlanInput",
}) as any as S.Schema<DeletePricingPlanInput>;
export interface DeletePricingPlanOutput {
  Arn?: string;
}
export const DeletePricingPlanOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "DeletePricingPlanOutput",
}) as any as S.Schema<DeletePricingPlanOutput>;
export interface DeletePricingRuleInput {
  Arn: string;
}
export const DeletePricingRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/delete-pricing-rule" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePricingRuleInput",
}) as any as S.Schema<DeletePricingRuleInput>;
export interface DeletePricingRuleOutput {
  Arn?: string;
}
export const DeletePricingRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "DeletePricingRuleOutput",
}) as any as S.Schema<DeletePricingRuleOutput>;
export interface DisassociateAccountsInput {
  Arn: string;
  AccountIds: string[];
}
export const DisassociateAccountsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String, AccountIds: AccountIdList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/disassociate-accounts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateAccountsInput",
}) as any as S.Schema<DisassociateAccountsInput>;
export interface DisassociateAccountsOutput {
  Arn?: string;
}
export const DisassociateAccountsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "DisassociateAccountsOutput",
}) as any as S.Schema<DisassociateAccountsOutput>;
export interface DisassociatePricingRulesInput {
  Arn: string;
  PricingRuleArns: string[];
}
export const DisassociatePricingRulesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    PricingRuleArns: PricingRuleArnsNonEmptyInput,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/disassociate-pricing-rules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociatePricingRulesInput",
}) as any as S.Schema<DisassociatePricingRulesInput>;
export interface DisassociatePricingRulesOutput {
  Arn?: string;
}
export const DisassociatePricingRulesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "DisassociatePricingRulesOutput",
}) as any as S.Schema<DisassociatePricingRulesOutput>;
export interface BillingPeriodRange {
  InclusiveStartBillingPeriod: string;
  ExclusiveEndBillingPeriod: string;
}
export const BillingPeriodRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InclusiveStartBillingPeriod: S.String,
    ExclusiveEndBillingPeriod: S.String,
  }),
).annotate({
  identifier: "BillingPeriodRange",
}) as any as S.Schema<BillingPeriodRange>;
export type GroupByAttributeName =
  | "PRODUCT_NAME"
  | "BILLING_PERIOD"
  | (string & {});
export const GroupByAttributeName = /*@__PURE__*/ S.String;

export type GroupByAttributesList = GroupByAttributeName[];
export const GroupByAttributesList =
  /*@__PURE__*/ S.Array(GroupByAttributeName);
export type MaxBillingGroupCostReportResults = number;
export type Token = string;
export interface GetBillingGroupCostReportInput {
  Arn: string;
  BillingPeriodRange?: BillingPeriodRange;
  GroupBy?: GroupByAttributeName[];
  MaxResults?: number;
  NextToken?: string;
}
export const GetBillingGroupCostReportInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    BillingPeriodRange: S.optional(BillingPeriodRange),
    GroupBy: S.optional(GroupByAttributesList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-billing-group-cost-report" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBillingGroupCostReportInput",
}) as any as S.Schema<GetBillingGroupCostReportInput>;
export type AWSCost = string;
export type ProformaCost = string;
export type Margin = string;
export type MarginPercentage = string;
export type Currency = string;
export interface Attribute {
  Key?: string;
  Value?: string;
}
export const Attribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Attribute" }) as any as S.Schema<Attribute>;
export type AttributesList = Attribute[];
export const AttributesList = /*@__PURE__*/ S.Array(Attribute);
export interface BillingGroupCostReportResultElement {
  Arn?: string;
  AWSCost?: string;
  ProformaCost?: string;
  Margin?: string;
  MarginPercentage?: string;
  Currency?: string;
  Attributes?: Attribute[];
}
export const BillingGroupCostReportResultElement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AWSCost: S.optional(S.String),
    ProformaCost: S.optional(S.String),
    Margin: S.optional(S.String),
    MarginPercentage: S.optional(S.String),
    Currency: S.optional(S.String),
    Attributes: S.optional(AttributesList),
  }),
).annotate({
  identifier: "BillingGroupCostReportResultElement",
}) as any as S.Schema<BillingGroupCostReportResultElement>;
export type BillingGroupCostReportResultsList =
  BillingGroupCostReportResultElement[];
export const BillingGroupCostReportResultsList = /*@__PURE__*/ S.Array(
  BillingGroupCostReportResultElement,
);
export interface GetBillingGroupCostReportOutput {
  BillingGroupCostReportResults?: BillingGroupCostReportResultElement[];
  NextToken?: string;
}
export const GetBillingGroupCostReportOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BillingGroupCostReportResults: S.optional(
      BillingGroupCostReportResultsList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetBillingGroupCostReportOutput",
}) as any as S.Schema<GetBillingGroupCostReportOutput>;
export type Association = string;
export type AccountIdFilterList = string[];
export const AccountIdFilterList = /*@__PURE__*/ S.Array(S.String);
export interface ListAccountAssociationsFilter {
  Association?: string;
  AccountId?: string;
  AccountIds?: string[];
}
export const ListAccountAssociationsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Association: S.optional(S.String),
    AccountId: S.optional(S.String),
    AccountIds: S.optional(AccountIdFilterList),
  }),
).annotate({
  identifier: "ListAccountAssociationsFilter",
}) as any as S.Schema<ListAccountAssociationsFilter>;
export interface ListAccountAssociationsInput {
  BillingPeriod?: string;
  Filters?: ListAccountAssociationsFilter;
  NextToken?: string;
}
export const ListAccountAssociationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BillingPeriod: S.optional(S.String),
    Filters: S.optional(ListAccountAssociationsFilter),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-account-associations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAccountAssociationsInput",
}) as any as S.Schema<ListAccountAssociationsInput>;
export type AccountName = string | redacted.Redacted<string>;
export type AccountEmail = string | redacted.Redacted<string>;
export interface AccountAssociationsListElement {
  AccountId?: string;
  BillingGroupArn?: string;
  AccountName?: string | redacted.Redacted<string>;
  AccountEmail?: string | redacted.Redacted<string>;
}
export const AccountAssociationsListElement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    BillingGroupArn: S.optional(S.String),
    AccountName: S.optional(SensitiveString),
    AccountEmail: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "AccountAssociationsListElement",
}) as any as S.Schema<AccountAssociationsListElement>;
export type AccountAssociationsList = AccountAssociationsListElement[];
export const AccountAssociationsList = /*@__PURE__*/ S.Array(
  AccountAssociationsListElement,
);
export interface ListAccountAssociationsOutput {
  LinkedAccounts?: AccountAssociationsListElement[];
  NextToken?: string;
}
export const ListAccountAssociationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LinkedAccounts: S.optional(AccountAssociationsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAccountAssociationsOutput",
}) as any as S.Schema<ListAccountAssociationsOutput>;
export type MaxBillingGroupResults = number;
export type BillingGroupArnList = string[];
export const BillingGroupArnList = /*@__PURE__*/ S.Array(S.String);
export interface ListBillingGroupCostReportsFilter {
  BillingGroupArns?: string[];
}
export const ListBillingGroupCostReportsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BillingGroupArns: S.optional(BillingGroupArnList) }),
).annotate({
  identifier: "ListBillingGroupCostReportsFilter",
}) as any as S.Schema<ListBillingGroupCostReportsFilter>;
export interface ListBillingGroupCostReportsInput {
  BillingPeriod?: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: ListBillingGroupCostReportsFilter;
}
export const ListBillingGroupCostReportsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BillingPeriod: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(ListBillingGroupCostReportsFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-billing-group-cost-reports" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBillingGroupCostReportsInput",
}) as any as S.Schema<ListBillingGroupCostReportsInput>;
export interface BillingGroupCostReportElement {
  Arn?: string;
  AWSCost?: string;
  ProformaCost?: string;
  Margin?: string;
  MarginPercentage?: string;
  Currency?: string;
}
export const BillingGroupCostReportElement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AWSCost: S.optional(S.String),
    ProformaCost: S.optional(S.String),
    Margin: S.optional(S.String),
    MarginPercentage: S.optional(S.String),
    Currency: S.optional(S.String),
  }),
).annotate({
  identifier: "BillingGroupCostReportElement",
}) as any as S.Schema<BillingGroupCostReportElement>;
export type BillingGroupCostReportList = BillingGroupCostReportElement[];
export const BillingGroupCostReportList = /*@__PURE__*/ S.Array(
  BillingGroupCostReportElement,
);
export interface ListBillingGroupCostReportsOutput {
  BillingGroupCostReports?: BillingGroupCostReportElement[];
  NextToken?: string;
}
export const ListBillingGroupCostReportsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BillingGroupCostReports: S.optional(BillingGroupCostReportList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBillingGroupCostReportsOutput",
}) as any as S.Schema<ListBillingGroupCostReportsOutput>;
export type BillingGroupStatus =
  | "ACTIVE"
  | "PRIMARY_ACCOUNT_MISSING"
  | "PENDING"
  | (string & {});
export const BillingGroupStatus = /*@__PURE__*/ S.String;

export type BillingGroupStatusList = BillingGroupStatus[];
export const BillingGroupStatusList = /*@__PURE__*/ S.Array(BillingGroupStatus);
export type PrimaryAccountIdList = string[];
export const PrimaryAccountIdList = /*@__PURE__*/ S.Array(S.String);
export type BillingGroupType = "STANDARD" | "TRANSFER_BILLING" | (string & {});
export const BillingGroupType = /*@__PURE__*/ S.String;

export type BillingGroupTypeList = BillingGroupType[];
export const BillingGroupTypeList = /*@__PURE__*/ S.Array(BillingGroupType);
export type SearchOption = "STARTS_WITH" | (string & {});
export const SearchOption = /*@__PURE__*/ S.String;

export type SearchValue = string;
export interface StringSearch {
  SearchOption: SearchOption;
  SearchValue: string;
}
export const StringSearch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SearchOption: SearchOption, SearchValue: S.String }),
).annotate({ identifier: "StringSearch" }) as any as S.Schema<StringSearch>;
export type StringSearches = StringSearch[];
export const StringSearches = /*@__PURE__*/ S.Array(StringSearch);
export type ResponsibilityTransferArnsList = string[];
export const ResponsibilityTransferArnsList = /*@__PURE__*/ S.Array(S.String);
export interface ListBillingGroupsFilter {
  Arns?: string[];
  PricingPlan?: string;
  Statuses?: BillingGroupStatus[];
  AutoAssociate?: boolean;
  PrimaryAccountIds?: string[];
  BillingGroupTypes?: BillingGroupType[];
  Names?: StringSearch[];
  ResponsibilityTransferArns?: string[];
}
export const ListBillingGroupsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arns: S.optional(BillingGroupArnList),
    PricingPlan: S.optional(S.String),
    Statuses: S.optional(BillingGroupStatusList),
    AutoAssociate: S.optional(S.Boolean),
    PrimaryAccountIds: S.optional(PrimaryAccountIdList),
    BillingGroupTypes: S.optional(BillingGroupTypeList),
    Names: S.optional(StringSearches),
    ResponsibilityTransferArns: S.optional(ResponsibilityTransferArnsList),
  }),
).annotate({
  identifier: "ListBillingGroupsFilter",
}) as any as S.Schema<ListBillingGroupsFilter>;
export interface ListBillingGroupsInput {
  BillingPeriod?: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: ListBillingGroupsFilter;
}
export const ListBillingGroupsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BillingPeriod: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(ListBillingGroupsFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-billing-groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBillingGroupsInput",
}) as any as S.Schema<ListBillingGroupsInput>;
export type NumberOfAccounts = number;
export type Instant = number;
export type BillingGroupStatusReason = string;
export interface ListBillingGroupAccountGrouping {
  AutoAssociate?: boolean;
  ResponsibilityTransferArn?: string;
}
export const ListBillingGroupAccountGrouping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutoAssociate: S.optional(S.Boolean),
    ResponsibilityTransferArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBillingGroupAccountGrouping",
}) as any as S.Schema<ListBillingGroupAccountGrouping>;
export interface BillingGroupListElement {
  Name?: string | redacted.Redacted<string>;
  Arn?: string;
  Description?: string | redacted.Redacted<string>;
  PrimaryAccountId?: string;
  ComputationPreference?: ComputationPreference;
  Size?: number;
  CreationTime?: number;
  LastModifiedTime?: number;
  Status?: BillingGroupStatus;
  StatusReason?: string;
  AccountGrouping?: ListBillingGroupAccountGrouping;
  BillingGroupType?: BillingGroupType;
}
export const BillingGroupListElement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(SensitiveString),
    Arn: S.optional(S.String),
    Description: S.optional(SensitiveString),
    PrimaryAccountId: S.optional(S.String),
    ComputationPreference: S.optional(ComputationPreference),
    Size: S.optional(S.Number),
    CreationTime: S.optional(S.Number),
    LastModifiedTime: S.optional(S.Number),
    Status: S.optional(BillingGroupStatus),
    StatusReason: S.optional(S.String),
    AccountGrouping: S.optional(ListBillingGroupAccountGrouping),
    BillingGroupType: S.optional(BillingGroupType),
  }),
).annotate({
  identifier: "BillingGroupListElement",
}) as any as S.Schema<BillingGroupListElement>;
export type BillingGroupList = BillingGroupListElement[];
export const BillingGroupList = /*@__PURE__*/ S.Array(BillingGroupListElement);
export interface ListBillingGroupsOutput {
  BillingGroups?: BillingGroupListElement[];
  NextToken?: string;
}
export const ListBillingGroupsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BillingGroups: S.optional(BillingGroupList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBillingGroupsOutput",
}) as any as S.Schema<ListBillingGroupsOutput>;
export type MaxCustomLineItemResults = number;
export type CustomLineItemNameList = (string | redacted.Redacted<string>)[];
export const CustomLineItemNameList = /*@__PURE__*/ S.Array(SensitiveString);
export type CustomLineItemArns = string[];
export const CustomLineItemArns = /*@__PURE__*/ S.Array(S.String);
export interface ListCustomLineItemsFilter {
  Names?: (string | redacted.Redacted<string>)[];
  BillingGroups?: string[];
  Arns?: string[];
  AccountIds?: string[];
}
export const ListCustomLineItemsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Names: S.optional(CustomLineItemNameList),
    BillingGroups: S.optional(BillingGroupArnList),
    Arns: S.optional(CustomLineItemArns),
    AccountIds: S.optional(AccountIdList),
  }),
).annotate({
  identifier: "ListCustomLineItemsFilter",
}) as any as S.Schema<ListCustomLineItemsFilter>;
export interface ListCustomLineItemsInput {
  BillingPeriod?: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: ListCustomLineItemsFilter;
}
export const ListCustomLineItemsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BillingPeriod: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(ListCustomLineItemsFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-custom-line-items" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCustomLineItemsInput",
}) as any as S.Schema<ListCustomLineItemsInput>;
export interface ListCustomLineItemFlatChargeDetails {
  ChargeValue: number;
}
export const ListCustomLineItemFlatChargeDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChargeValue: S.Number }),
).annotate({
  identifier: "ListCustomLineItemFlatChargeDetails",
}) as any as S.Schema<ListCustomLineItemFlatChargeDetails>;
export interface ListCustomLineItemPercentageChargeDetails {
  PercentageValue: number;
}
export const ListCustomLineItemPercentageChargeDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ PercentageValue: S.Number }),
  ).annotate({
    identifier: "ListCustomLineItemPercentageChargeDetails",
  }) as any as S.Schema<ListCustomLineItemPercentageChargeDetails>;
export interface ListCustomLineItemChargeDetails {
  Flat?: ListCustomLineItemFlatChargeDetails;
  Percentage?: ListCustomLineItemPercentageChargeDetails;
  Type: CustomLineItemType;
  LineItemFilters?: LineItemFilter[];
}
export const ListCustomLineItemChargeDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Flat: S.optional(ListCustomLineItemFlatChargeDetails),
    Percentage: S.optional(ListCustomLineItemPercentageChargeDetails),
    Type: CustomLineItemType,
    LineItemFilters: S.optional(LineItemFiltersList),
  }),
).annotate({
  identifier: "ListCustomLineItemChargeDetails",
}) as any as S.Schema<ListCustomLineItemChargeDetails>;
export type CurrencyCode = "USD" | "CNY" | (string & {});
export const CurrencyCode = /*@__PURE__*/ S.String;

export type CustomLineItemProductCode = string;
export type NumberOfAssociations = number;
export interface CustomLineItemListElement {
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  ChargeDetails?: ListCustomLineItemChargeDetails;
  CurrencyCode?: CurrencyCode;
  Description?: string | redacted.Redacted<string>;
  ProductCode?: string;
  BillingGroupArn?: string;
  CreationTime?: number;
  LastModifiedTime?: number;
  AssociationSize?: number;
  AccountId?: string;
  ComputationRule?: ComputationRuleEnum;
  PresentationDetails?: PresentationObject;
}
export const CustomLineItemListElement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(SensitiveString),
    ChargeDetails: S.optional(ListCustomLineItemChargeDetails),
    CurrencyCode: S.optional(CurrencyCode),
    Description: S.optional(SensitiveString),
    ProductCode: S.optional(S.String),
    BillingGroupArn: S.optional(S.String),
    CreationTime: S.optional(S.Number),
    LastModifiedTime: S.optional(S.Number),
    AssociationSize: S.optional(S.Number),
    AccountId: S.optional(S.String),
    ComputationRule: S.optional(ComputationRuleEnum),
    PresentationDetails: S.optional(PresentationObject),
  }),
).annotate({
  identifier: "CustomLineItemListElement",
}) as any as S.Schema<CustomLineItemListElement>;
export type CustomLineItemList = CustomLineItemListElement[];
export const CustomLineItemList = /*@__PURE__*/ S.Array(
  CustomLineItemListElement,
);
export interface ListCustomLineItemsOutput {
  CustomLineItems?: CustomLineItemListElement[];
  NextToken?: string;
}
export const ListCustomLineItemsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomLineItems: S.optional(CustomLineItemList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCustomLineItemsOutput",
}) as any as S.Schema<ListCustomLineItemsOutput>;
export interface ListCustomLineItemVersionsBillingPeriodRangeFilter {
  StartBillingPeriod?: string;
  EndBillingPeriod?: string;
}
export const ListCustomLineItemVersionsBillingPeriodRangeFilter =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      StartBillingPeriod: S.optional(S.String),
      EndBillingPeriod: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListCustomLineItemVersionsBillingPeriodRangeFilter",
  }) as any as S.Schema<ListCustomLineItemVersionsBillingPeriodRangeFilter>;
export interface ListCustomLineItemVersionsFilter {
  BillingPeriodRange?: ListCustomLineItemVersionsBillingPeriodRangeFilter;
}
export const ListCustomLineItemVersionsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BillingPeriodRange: S.optional(
      ListCustomLineItemVersionsBillingPeriodRangeFilter,
    ),
  }),
).annotate({
  identifier: "ListCustomLineItemVersionsFilter",
}) as any as S.Schema<ListCustomLineItemVersionsFilter>;
export interface ListCustomLineItemVersionsInput {
  Arn: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: ListCustomLineItemVersionsFilter;
}
export const ListCustomLineItemVersionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(ListCustomLineItemVersionsFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-custom-line-item-versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCustomLineItemVersionsInput",
}) as any as S.Schema<ListCustomLineItemVersionsInput>;
export interface CustomLineItemVersionListElement {
  Name?: string | redacted.Redacted<string>;
  ChargeDetails?: ListCustomLineItemChargeDetails;
  CurrencyCode?: CurrencyCode;
  Description?: string | redacted.Redacted<string>;
  ProductCode?: string;
  BillingGroupArn?: string;
  CreationTime?: number;
  LastModifiedTime?: number;
  AssociationSize?: number;
  StartBillingPeriod?: string;
  EndBillingPeriod?: string;
  Arn?: string;
  StartTime?: number;
  AccountId?: string;
  ComputationRule?: ComputationRuleEnum;
  PresentationDetails?: PresentationObject;
}
export const CustomLineItemVersionListElement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(SensitiveString),
    ChargeDetails: S.optional(ListCustomLineItemChargeDetails),
    CurrencyCode: S.optional(CurrencyCode),
    Description: S.optional(SensitiveString),
    ProductCode: S.optional(S.String),
    BillingGroupArn: S.optional(S.String),
    CreationTime: S.optional(S.Number),
    LastModifiedTime: S.optional(S.Number),
    AssociationSize: S.optional(S.Number),
    StartBillingPeriod: S.optional(S.String),
    EndBillingPeriod: S.optional(S.String),
    Arn: S.optional(S.String),
    StartTime: S.optional(S.Number),
    AccountId: S.optional(S.String),
    ComputationRule: S.optional(ComputationRuleEnum),
    PresentationDetails: S.optional(PresentationObject),
  }),
).annotate({
  identifier: "CustomLineItemVersionListElement",
}) as any as S.Schema<CustomLineItemVersionListElement>;
export type CustomLineItemVersionList = CustomLineItemVersionListElement[];
export const CustomLineItemVersionList = /*@__PURE__*/ S.Array(
  CustomLineItemVersionListElement,
);
export interface ListCustomLineItemVersionsOutput {
  CustomLineItemVersions?: CustomLineItemVersionListElement[];
  NextToken?: string;
}
export const ListCustomLineItemVersionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomLineItemVersions: S.optional(CustomLineItemVersionList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCustomLineItemVersionsOutput",
}) as any as S.Schema<ListCustomLineItemVersionsOutput>;
export type PricingPlanArns = string[];
export const PricingPlanArns = /*@__PURE__*/ S.Array(S.String);
export interface ListPricingPlansFilter {
  Arns?: string[];
}
export const ListPricingPlansFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arns: S.optional(PricingPlanArns) }),
).annotate({
  identifier: "ListPricingPlansFilter",
}) as any as S.Schema<ListPricingPlansFilter>;
export type MaxPricingPlanResults = number;
export interface ListPricingPlansInput {
  BillingPeriod?: string;
  Filters?: ListPricingPlansFilter;
  MaxResults?: number;
  NextToken?: string;
}
export const ListPricingPlansInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BillingPeriod: S.optional(S.String),
    Filters: S.optional(ListPricingPlansFilter),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-pricing-plans" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPricingPlansInput",
}) as any as S.Schema<ListPricingPlansInput>;
export type NumberOfAssociatedPricingRules = number;
export interface PricingPlanListElement {
  Name?: string | redacted.Redacted<string>;
  Arn?: string;
  Description?: string | redacted.Redacted<string>;
  Size?: number;
  CreationTime?: number;
  LastModifiedTime?: number;
}
export const PricingPlanListElement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(SensitiveString),
    Arn: S.optional(S.String),
    Description: S.optional(SensitiveString),
    Size: S.optional(S.Number),
    CreationTime: S.optional(S.Number),
    LastModifiedTime: S.optional(S.Number),
  }),
).annotate({
  identifier: "PricingPlanListElement",
}) as any as S.Schema<PricingPlanListElement>;
export type PricingPlanList = PricingPlanListElement[];
export const PricingPlanList = /*@__PURE__*/ S.Array(PricingPlanListElement);
export interface ListPricingPlansOutput {
  BillingPeriod?: string;
  PricingPlans?: PricingPlanListElement[];
  NextToken?: string;
}
export const ListPricingPlansOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BillingPeriod: S.optional(S.String),
    PricingPlans: S.optional(PricingPlanList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPricingPlansOutput",
}) as any as S.Schema<ListPricingPlansOutput>;
export type MaxPricingRuleResults = number;
export interface ListPricingPlansAssociatedWithPricingRuleInput {
  BillingPeriod?: string;
  PricingRuleArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListPricingPlansAssociatedWithPricingRuleInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      BillingPeriod: S.optional(S.String),
      PricingRuleArn: S.String,
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/list-pricing-plans-associated-with-pricing-rule",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListPricingPlansAssociatedWithPricingRuleInput",
  }) as any as S.Schema<ListPricingPlansAssociatedWithPricingRuleInput>;
export interface ListPricingPlansAssociatedWithPricingRuleOutput {
  BillingPeriod?: string;
  PricingRuleArn?: string;
  PricingPlanArns?: string[];
  NextToken?: string;
}
export const ListPricingPlansAssociatedWithPricingRuleOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      BillingPeriod: S.optional(S.String),
      PricingRuleArn: S.optional(S.String),
      PricingPlanArns: S.optional(PricingPlanArns),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListPricingPlansAssociatedWithPricingRuleOutput",
  }) as any as S.Schema<ListPricingPlansAssociatedWithPricingRuleOutput>;
export type PricingRuleArns = string[];
export const PricingRuleArns = /*@__PURE__*/ S.Array(S.String);
export interface ListPricingRulesFilter {
  Arns?: string[];
}
export const ListPricingRulesFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arns: S.optional(PricingRuleArns) }),
).annotate({
  identifier: "ListPricingRulesFilter",
}) as any as S.Schema<ListPricingRulesFilter>;
export interface ListPricingRulesInput {
  BillingPeriod?: string;
  Filters?: ListPricingRulesFilter;
  MaxResults?: number;
  NextToken?: string;
}
export const ListPricingRulesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BillingPeriod: S.optional(S.String),
    Filters: S.optional(ListPricingRulesFilter),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-pricing-rules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPricingRulesInput",
}) as any as S.Schema<ListPricingRulesInput>;
export type NumberOfPricingPlansAssociatedWith = number;
export interface FreeTierConfig {
  Activated: boolean;
}
export const FreeTierConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Activated: S.Boolean }),
).annotate({ identifier: "FreeTierConfig" }) as any as S.Schema<FreeTierConfig>;
export interface Tiering {
  FreeTier: FreeTierConfig;
}
export const Tiering = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FreeTier: FreeTierConfig }),
).annotate({ identifier: "Tiering" }) as any as S.Schema<Tiering>;
export interface PricingRuleListElement {
  Name?: string | redacted.Redacted<string>;
  Arn?: string;
  Description?: string | redacted.Redacted<string>;
  Scope?: PricingRuleScope;
  Type?: PricingRuleType;
  ModifierPercentage?: number;
  Service?: string;
  AssociatedPricingPlanCount?: number;
  CreationTime?: number;
  LastModifiedTime?: number;
  BillingEntity?: string;
  Tiering?: Tiering;
  UsageType?: string;
  Operation?: string;
}
export const PricingRuleListElement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(SensitiveString),
    Arn: S.optional(S.String),
    Description: S.optional(SensitiveString),
    Scope: S.optional(PricingRuleScope),
    Type: S.optional(PricingRuleType),
    ModifierPercentage: S.optional(S.Number),
    Service: S.optional(S.String),
    AssociatedPricingPlanCount: S.optional(S.Number),
    CreationTime: S.optional(S.Number),
    LastModifiedTime: S.optional(S.Number),
    BillingEntity: S.optional(S.String),
    Tiering: S.optional(Tiering),
    UsageType: S.optional(S.String),
    Operation: S.optional(S.String),
  }),
).annotate({
  identifier: "PricingRuleListElement",
}) as any as S.Schema<PricingRuleListElement>;
export type PricingRuleList = PricingRuleListElement[];
export const PricingRuleList = /*@__PURE__*/ S.Array(PricingRuleListElement);
export interface ListPricingRulesOutput {
  BillingPeriod?: string;
  PricingRules?: PricingRuleListElement[];
  NextToken?: string;
}
export const ListPricingRulesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BillingPeriod: S.optional(S.String),
    PricingRules: S.optional(PricingRuleList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPricingRulesOutput",
}) as any as S.Schema<ListPricingRulesOutput>;
export interface ListPricingRulesAssociatedToPricingPlanInput {
  BillingPeriod?: string;
  PricingPlanArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListPricingRulesAssociatedToPricingPlanInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      BillingPeriod: S.optional(S.String),
      PricingPlanArn: S.String,
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/list-pricing-rules-associated-to-pricing-plan",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListPricingRulesAssociatedToPricingPlanInput",
  }) as any as S.Schema<ListPricingRulesAssociatedToPricingPlanInput>;
export interface ListPricingRulesAssociatedToPricingPlanOutput {
  BillingPeriod?: string;
  PricingPlanArn?: string;
  PricingRuleArns?: string[];
  NextToken?: string;
}
export const ListPricingRulesAssociatedToPricingPlanOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      BillingPeriod: S.optional(S.String),
      PricingPlanArn: S.optional(S.String),
      PricingRuleArns: S.optional(PricingRuleArns),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListPricingRulesAssociatedToPricingPlanOutput",
  }) as any as S.Schema<ListPricingRulesAssociatedToPricingPlanOutput>;
export type CustomLineItemRelationship = "PARENT" | "CHILD" | (string & {});
export const CustomLineItemRelationship = /*@__PURE__*/ S.String;

export interface ListResourcesAssociatedToCustomLineItemFilter {
  Relationship?: CustomLineItemRelationship;
}
export const ListResourcesAssociatedToCustomLineItemFilter =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Relationship: S.optional(CustomLineItemRelationship) }),
  ).annotate({
    identifier: "ListResourcesAssociatedToCustomLineItemFilter",
  }) as any as S.Schema<ListResourcesAssociatedToCustomLineItemFilter>;
export interface ListResourcesAssociatedToCustomLineItemInput {
  BillingPeriod?: string;
  Arn: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: ListResourcesAssociatedToCustomLineItemFilter;
}
export const ListResourcesAssociatedToCustomLineItemInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      BillingPeriod: S.optional(S.String),
      Arn: S.String,
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
      Filters: S.optional(ListResourcesAssociatedToCustomLineItemFilter),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/list-resources-associated-to-custom-line-item",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListResourcesAssociatedToCustomLineItemInput",
  }) as any as S.Schema<ListResourcesAssociatedToCustomLineItemInput>;
export interface ListResourcesAssociatedToCustomLineItemResponseElement {
  Arn?: string;
  Relationship?: CustomLineItemRelationship;
  EndBillingPeriod?: string;
}
export const ListResourcesAssociatedToCustomLineItemResponseElement =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Arn: S.optional(S.String),
      Relationship: S.optional(CustomLineItemRelationship),
      EndBillingPeriod: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListResourcesAssociatedToCustomLineItemResponseElement",
  }) as any as S.Schema<ListResourcesAssociatedToCustomLineItemResponseElement>;
export type ListResourcesAssociatedToCustomLineItemResponseList =
  ListResourcesAssociatedToCustomLineItemResponseElement[];
export const ListResourcesAssociatedToCustomLineItemResponseList =
  /*@__PURE__*/ S.Array(ListResourcesAssociatedToCustomLineItemResponseElement);
export interface ListResourcesAssociatedToCustomLineItemOutput {
  Arn?: string;
  AssociatedResources?: ListResourcesAssociatedToCustomLineItemResponseElement[];
  NextToken?: string;
}
export const ListResourcesAssociatedToCustomLineItemOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Arn: S.optional(S.String),
      AssociatedResources: S.optional(
        ListResourcesAssociatedToCustomLineItemResponseList,
      ),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListResourcesAssociatedToCustomLineItemOutput",
  }) as any as S.Schema<ListResourcesAssociatedToCustomLineItemOutput>;
export type Arn = string;
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
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagMap) }),
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
export interface UpdateBillingGroupAccountGrouping {
  AutoAssociate?: boolean;
  ResponsibilityTransferArn?: string;
}
export const UpdateBillingGroupAccountGrouping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutoAssociate: S.optional(S.Boolean),
    ResponsibilityTransferArn: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateBillingGroupAccountGrouping",
}) as any as S.Schema<UpdateBillingGroupAccountGrouping>;
export interface UpdateBillingGroupInput {
  Arn: string;
  Name?: string | redacted.Redacted<string>;
  Status?: BillingGroupStatus;
  ComputationPreference?: ComputationPreference;
  Description?: string | redacted.Redacted<string>;
  AccountGrouping?: UpdateBillingGroupAccountGrouping;
}
export const UpdateBillingGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.optional(SensitiveString),
    Status: S.optional(BillingGroupStatus),
    ComputationPreference: S.optional(ComputationPreference),
    Description: S.optional(SensitiveString),
    AccountGrouping: S.optional(UpdateBillingGroupAccountGrouping),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/update-billing-group" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateBillingGroupInput",
}) as any as S.Schema<UpdateBillingGroupInput>;
export interface UpdateBillingGroupOutput {
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  PrimaryAccountId?: string;
  PricingPlanArn?: string;
  Size?: number;
  LastModifiedTime?: number;
  Status?: BillingGroupStatus;
  StatusReason?: string;
  AccountGrouping?: UpdateBillingGroupAccountGrouping;
}
export const UpdateBillingGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(SensitiveString),
    Description: S.optional(SensitiveString),
    PrimaryAccountId: S.optional(S.String),
    PricingPlanArn: S.optional(S.String),
    Size: S.optional(S.Number),
    LastModifiedTime: S.optional(S.Number),
    Status: S.optional(BillingGroupStatus),
    StatusReason: S.optional(S.String),
    AccountGrouping: S.optional(UpdateBillingGroupAccountGrouping),
  }),
).annotate({
  identifier: "UpdateBillingGroupOutput",
}) as any as S.Schema<UpdateBillingGroupOutput>;
export interface UpdateCustomLineItemFlatChargeDetails {
  ChargeValue: number;
}
export const UpdateCustomLineItemFlatChargeDetails = /*@__PURE__*/ S.suspend(
  () => S.Struct({ ChargeValue: S.Number }),
).annotate({
  identifier: "UpdateCustomLineItemFlatChargeDetails",
}) as any as S.Schema<UpdateCustomLineItemFlatChargeDetails>;
export interface UpdateCustomLineItemPercentageChargeDetails {
  PercentageValue: number;
}
export const UpdateCustomLineItemPercentageChargeDetails =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ PercentageValue: S.Number }),
  ).annotate({
    identifier: "UpdateCustomLineItemPercentageChargeDetails",
  }) as any as S.Schema<UpdateCustomLineItemPercentageChargeDetails>;
export interface UpdateCustomLineItemChargeDetails {
  Flat?: UpdateCustomLineItemFlatChargeDetails;
  Percentage?: UpdateCustomLineItemPercentageChargeDetails;
  LineItemFilters?: LineItemFilter[];
}
export const UpdateCustomLineItemChargeDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Flat: S.optional(UpdateCustomLineItemFlatChargeDetails),
    Percentage: S.optional(UpdateCustomLineItemPercentageChargeDetails),
    LineItemFilters: S.optional(LineItemFiltersList),
  }),
).annotate({
  identifier: "UpdateCustomLineItemChargeDetails",
}) as any as S.Schema<UpdateCustomLineItemChargeDetails>;
export interface UpdateCustomLineItemInput {
  Arn: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  ChargeDetails?: UpdateCustomLineItemChargeDetails;
  BillingPeriodRange?: CustomLineItemBillingPeriodRange;
}
export const UpdateCustomLineItemInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.optional(SensitiveString),
    Description: S.optional(SensitiveString),
    ChargeDetails: S.optional(UpdateCustomLineItemChargeDetails),
    BillingPeriodRange: S.optional(CustomLineItemBillingPeriodRange),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/update-custom-line-item" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCustomLineItemInput",
}) as any as S.Schema<UpdateCustomLineItemInput>;
export type BillingGroupFullArn = string;
export interface UpdateCustomLineItemOutput {
  Arn?: string;
  BillingGroupArn?: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  ChargeDetails?: ListCustomLineItemChargeDetails;
  LastModifiedTime?: number;
  AssociationSize?: number;
}
export const UpdateCustomLineItemOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    BillingGroupArn: S.optional(S.String),
    Name: S.optional(SensitiveString),
    Description: S.optional(SensitiveString),
    ChargeDetails: S.optional(ListCustomLineItemChargeDetails),
    LastModifiedTime: S.optional(S.Number),
    AssociationSize: S.optional(S.Number),
  }),
).annotate({
  identifier: "UpdateCustomLineItemOutput",
}) as any as S.Schema<UpdateCustomLineItemOutput>;
export interface UpdatePricingPlanInput {
  Arn: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
}
export const UpdatePricingPlanInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.optional(SensitiveString),
    Description: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/update-pricing-plan" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePricingPlanInput",
}) as any as S.Schema<UpdatePricingPlanInput>;
export interface UpdatePricingPlanOutput {
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  Size?: number;
  LastModifiedTime?: number;
}
export const UpdatePricingPlanOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(SensitiveString),
    Description: S.optional(SensitiveString),
    Size: S.optional(S.Number),
    LastModifiedTime: S.optional(S.Number),
  }),
).annotate({
  identifier: "UpdatePricingPlanOutput",
}) as any as S.Schema<UpdatePricingPlanOutput>;
export interface UpdateFreeTierConfig {
  Activated: boolean;
}
export const UpdateFreeTierConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Activated: S.Boolean }),
).annotate({
  identifier: "UpdateFreeTierConfig",
}) as any as S.Schema<UpdateFreeTierConfig>;
export interface UpdateTieringInput {
  FreeTier: UpdateFreeTierConfig;
}
export const UpdateTieringInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FreeTier: UpdateFreeTierConfig }),
).annotate({
  identifier: "UpdateTieringInput",
}) as any as S.Schema<UpdateTieringInput>;
export interface UpdatePricingRuleInput {
  Arn: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  Type?: PricingRuleType;
  ModifierPercentage?: number;
  Tiering?: UpdateTieringInput;
}
export const UpdatePricingRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.optional(SensitiveString),
    Description: S.optional(SensitiveString),
    Type: S.optional(PricingRuleType),
    ModifierPercentage: S.optional(S.Number),
    Tiering: S.optional(UpdateTieringInput),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/update-pricing-rule" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePricingRuleInput",
}) as any as S.Schema<UpdatePricingRuleInput>;
export interface UpdatePricingRuleOutput {
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  Scope?: PricingRuleScope;
  Type?: PricingRuleType;
  ModifierPercentage?: number;
  Service?: string;
  AssociatedPricingPlanCount?: number;
  LastModifiedTime?: number;
  BillingEntity?: string;
  Tiering?: UpdateTieringInput;
  UsageType?: string;
  Operation?: string;
}
export const UpdatePricingRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(SensitiveString),
    Description: S.optional(SensitiveString),
    Scope: S.optional(PricingRuleScope),
    Type: S.optional(PricingRuleType),
    ModifierPercentage: S.optional(S.Number),
    Service: S.optional(S.String),
    AssociatedPricingPlanCount: S.optional(S.Number),
    LastModifiedTime: S.optional(S.Number),
    BillingEntity: S.optional(S.String),
    Tiering: S.optional(UpdateTieringInput),
    UsageType: S.optional(S.String),
    Operation: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdatePricingRuleOutput",
}) as any as S.Schema<UpdatePricingRuleOutput>;
export type ConflictExceptionReason =
  | "RESOURCE_NAME_CONFLICT"
  | "PRICING_RULE_IN_PRICING_PLAN_CONFLICT"
  | "PRICING_PLAN_ATTACHED_TO_BILLING_GROUP_DELETE_CONFLICT"
  | "PRICING_RULE_ATTACHED_TO_PRICING_PLAN_DELETE_CONFLICT"
  | "WRITE_CONFLICT_RETRY"
  | (string & {});
export const ConflictExceptionReason = /*@__PURE__*/ S.String;

export type RetryAfterSeconds = number;
export type ValidationExceptionReason =
  | "UNKNOWN_OPERATION"
  | "CANNOT_PARSE"
  | "FIELD_VALIDATION_FAILED"
  | "OTHER"
  | "PRIMARY_NOT_ASSOCIATED"
  | "PRIMARY_CANNOT_DISASSOCIATE"
  | "ACCOUNTS_NOT_ASSOCIATED"
  | "ACCOUNTS_ALREADY_ASSOCIATED"
  | "ILLEGAL_PRIMARY_ACCOUNT"
  | "ILLEGAL_ACCOUNTS"
  | "MISMATCHED_BILLINGGROUP_ARN"
  | "MISSING_BILLINGGROUP"
  | "MISMATCHED_CUSTOMLINEITEM_ARN"
  | "ILLEGAL_BILLING_PERIOD"
  | "ILLEGAL_BILLING_PERIOD_RANGE"
  | "TOO_MANY_ACCOUNTS_IN_REQUEST"
  | "DUPLICATE_ACCOUNT"
  | "INVALID_BILLING_GROUP_STATUS"
  | "MISMATCHED_PRICINGPLAN_ARN"
  | "MISSING_PRICINGPLAN"
  | "MISMATCHED_PRICINGRULE_ARN"
  | "DUPLICATE_PRICINGRULE_ARNS"
  | "MISSING_COSTCATEGORY"
  | "ILLEGAL_EXPRESSION"
  | "ILLEGAL_SCOPE"
  | "ILLEGAL_SERVICE"
  | "PRICINGRULES_NOT_EXIST"
  | "PRICINGRULES_ALREADY_ASSOCIATED"
  | "PRICINGRULES_NOT_ASSOCIATED"
  | "INVALID_TIME_RANGE"
  | "INVALID_BILLINGVIEW_ARN"
  | "MISMATCHED_BILLINGVIEW_ARN"
  | "ILLEGAL_CUSTOMLINEITEM"
  | "MISSING_CUSTOMLINEITEM"
  | "ILLEGAL_CUSTOMLINEITEM_UPDATE"
  | "TOO_MANY_CUSTOMLINEITEMS_IN_REQUEST"
  | "ILLEGAL_CHARGE_DETAILS"
  | "ILLEGAL_UPDATE_CHARGE_DETAILS"
  | "INVALID_ARN"
  | "ILLEGAL_RESOURCE_ARNS"
  | "ILLEGAL_CUSTOMLINEITEM_MODIFICATION"
  | "MISSING_LINKED_ACCOUNT_IDS"
  | "MULTIPLE_LINKED_ACCOUNT_IDS"
  | "MISSING_PRICING_PLAN_ARN"
  | "MULTIPLE_PRICING_PLAN_ARN"
  | "ILLEGAL_CHILD_ASSOCIATE_RESOURCE"
  | "CUSTOM_LINE_ITEM_ASSOCIATION_EXISTS"
  | "INVALID_BILLING_GROUP"
  | "INVALID_BILLING_PERIOD_FOR_OPERATION"
  | "ILLEGAL_BILLING_ENTITY"
  | "ILLEGAL_MODIFIER_PERCENTAGE"
  | "ILLEGAL_TYPE"
  | "ILLEGAL_BILLING_GROUP_TYPE"
  | "ILLEGAL_BILLING_GROUP_PRICING_PLAN"
  | "ILLEGAL_ENDED_BILLINGGROUP"
  | "ILLEGAL_TIERING_INPUT"
  | "ILLEGAL_OPERATION"
  | "ILLEGAL_USAGE_TYPE"
  | "INVALID_SKU_COMBO"
  | "INVALID_FILTER"
  | "TOO_MANY_AUTO_ASSOCIATE_BILLING_GROUPS"
  | "CANNOT_DELETE_AUTO_ASSOCIATE_BILLING_GROUP"
  | "ILLEGAL_ACCOUNT_ID"
  | "BILLING_GROUP_ALREADY_EXIST_IN_CURRENT_BILLING_PERIOD"
  | "ILLEGAL_COMPUTATION_RULE"
  | "ILLEGAL_LINE_ITEM_FILTER"
  | (string & {});
export const ValidationExceptionReason = /*@__PURE__*/ S.String;

export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type AssociateAccountsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Connects an array of account IDs in a consolidated billing family to a predefined billing group. The account IDs must be a part of the consolidated billing family during the current month, and not already associated with another billing group. The maximum number of accounts that can be associated in one call is 30.
 */
export const associateAccounts: API.OperationMethod<
  AssociateAccountsInput,
  AssociateAccountsOutput,
  AssociateAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateAccountsInput,
  output: AssociateAccountsOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAccounts",
}));

export type AssociatePricingRulesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Connects an array of `PricingRuleArns` to a defined `PricingPlan`. The maximum number `PricingRuleArn` that can be associated in one call is 30.
 */
export const associatePricingRules: API.OperationMethod<
  AssociatePricingRulesInput,
  AssociatePricingRulesOutput,
  AssociatePricingRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociatePricingRulesInput,
  output: AssociatePricingRulesOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociatePricingRules",
}));

export type BatchAssociateResourcesToCustomLineItemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a batch of resources to a percentage custom line item.
 */
export const batchAssociateResourcesToCustomLineItem: API.OperationMethod<
  BatchAssociateResourcesToCustomLineItemInput,
  BatchAssociateResourcesToCustomLineItemOutput,
  BatchAssociateResourcesToCustomLineItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchAssociateResourcesToCustomLineItemInput,
  output: BatchAssociateResourcesToCustomLineItemOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAssociateResourcesToCustomLineItem",
}));

export type BatchDisassociateResourcesFromCustomLineItemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a batch of resources from a percentage custom line item.
 */
export const batchDisassociateResourcesFromCustomLineItem: API.OperationMethod<
  BatchDisassociateResourcesFromCustomLineItemInput,
  BatchDisassociateResourcesFromCustomLineItemOutput,
  BatchDisassociateResourcesFromCustomLineItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDisassociateResourcesFromCustomLineItemInput,
  output: BatchDisassociateResourcesFromCustomLineItemOutput,
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
  operationName: "BatchDisassociateResourcesFromCustomLineItem",
}));

export type CreateBillingGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a billing group that resembles a consolidated billing family that Amazon Web Services charges, based off of the predefined pricing plan computation.
 */
export const createBillingGroup: API.OperationMethod<
  CreateBillingGroupInput,
  CreateBillingGroupOutput,
  CreateBillingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBillingGroupInput,
  output: CreateBillingGroupOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBillingGroup",
}));

export type CreateCustomLineItemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom line item that can be used to create a one-time fixed charge that can be applied to a single billing group for the current or previous billing period. The one-time fixed charge is either a fee or discount.
 */
export const createCustomLineItem: API.OperationMethod<
  CreateCustomLineItemInput,
  CreateCustomLineItemOutput,
  CreateCustomLineItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCustomLineItemInput,
  output: CreateCustomLineItemOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomLineItem",
}));

export type CreatePricingPlanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a pricing plan that is used for computing Amazon Web Services charges for billing groups.
 */
export const createPricingPlan: API.OperationMethod<
  CreatePricingPlanInput,
  CreatePricingPlanOutput,
  CreatePricingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePricingPlanInput,
  output: CreatePricingPlanOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePricingPlan",
}));

export type CreatePricingRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceLimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a pricing rule can be associated to a pricing plan, or a set of pricing plans.
 */
export const createPricingRule: API.OperationMethod<
  CreatePricingRuleInput,
  CreatePricingRuleOutput,
  CreatePricingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePricingRuleInput,
  output: CreatePricingRuleOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceLimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePricingRule",
}));

export type DeleteBillingGroupError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a billing group.
 */
export const deleteBillingGroup: API.OperationMethod<
  DeleteBillingGroupInput,
  DeleteBillingGroupOutput,
  DeleteBillingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBillingGroupInput,
  output: DeleteBillingGroupOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBillingGroup",
}));

export type DeleteCustomLineItemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the custom line item identified by the given ARN in the current, or previous billing period.
 */
export const deleteCustomLineItem: API.OperationMethod<
  DeleteCustomLineItemInput,
  DeleteCustomLineItemOutput,
  DeleteCustomLineItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCustomLineItemInput,
  output: DeleteCustomLineItemOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomLineItem",
}));

export type DeletePricingPlanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a pricing plan. The pricing plan must not be associated with any billing groups to delete successfully.
 */
export const deletePricingPlan: API.OperationMethod<
  DeletePricingPlanInput,
  DeletePricingPlanOutput,
  DeletePricingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePricingPlanInput,
  output: DeletePricingPlanOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePricingPlan",
}));

export type DeletePricingRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the pricing rule that's identified by the input Amazon Resource Name (ARN).
 */
export const deletePricingRule: API.OperationMethod<
  DeletePricingRuleInput,
  DeletePricingRuleOutput,
  DeletePricingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePricingRuleInput,
  output: DeletePricingRuleOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePricingRule",
}));

export type DisassociateAccountsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified list of account IDs from the given billing group.
 */
export const disassociateAccounts: API.OperationMethod<
  DisassociateAccountsInput,
  DisassociateAccountsOutput,
  DisassociateAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateAccountsInput,
  output: DisassociateAccountsOutput,
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
  operationName: "DisassociateAccounts",
}));

export type DisassociatePricingRulesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a list of pricing rules from a pricing plan.
 */
export const disassociatePricingRules: API.OperationMethod<
  DisassociatePricingRulesInput,
  DisassociatePricingRulesOutput,
  DisassociatePricingRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociatePricingRulesInput,
  output: DisassociatePricingRulesOutput,
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
  operationName: "DisassociatePricingRules",
}));

export type GetBillingGroupCostReportError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the margin summary report, which includes the Amazon Web Services cost and charged amount (pro forma cost) by Amazon Web Services service for a specific billing group.
 */
export const getBillingGroupCostReport: API.PaginatedOperationMethod<
  GetBillingGroupCostReportInput,
  GetBillingGroupCostReportOutput,
  GetBillingGroupCostReportError,
  Credentials | HttpClient.HttpClient,
  BillingGroupCostReportResultElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetBillingGroupCostReportInput,
  output: GetBillingGroupCostReportOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBillingGroupCostReport",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BillingGroupCostReportResults",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAccountAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This is a paginated call to list linked accounts that are linked to the payer account for the specified time period. If no information is provided, the current billing period is used. The response will optionally include the billing group that's associated with the linked account.
 */
export const listAccountAssociations: API.PaginatedOperationMethod<
  ListAccountAssociationsInput,
  ListAccountAssociationsOutput,
  ListAccountAssociationsError,
  Credentials | HttpClient.HttpClient,
  AccountAssociationsListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccountAssociationsInput,
  output: ListAccountAssociationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccountAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LinkedAccounts",
  } as const,
})) as any;

export type ListBillingGroupCostReportsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A paginated call to retrieve a summary report of actual Amazon Web Services charges and the calculated Amazon Web Services charges based on the associated pricing plan of a billing group.
 */
export const listBillingGroupCostReports: API.PaginatedOperationMethod<
  ListBillingGroupCostReportsInput,
  ListBillingGroupCostReportsOutput,
  ListBillingGroupCostReportsError,
  Credentials | HttpClient.HttpClient,
  BillingGroupCostReportElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBillingGroupCostReportsInput,
  output: ListBillingGroupCostReportsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBillingGroupCostReports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BillingGroupCostReports",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBillingGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A paginated call to retrieve a list of billing groups for the given billing period. If you don't provide a billing group, the current billing period is used.
 */
export const listBillingGroups: API.PaginatedOperationMethod<
  ListBillingGroupsInput,
  ListBillingGroupsOutput,
  ListBillingGroupsError,
  Credentials | HttpClient.HttpClient,
  BillingGroupListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBillingGroupsInput,
  output: ListBillingGroupsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBillingGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BillingGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCustomLineItemsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A paginated call to get a list of all custom line items (FFLIs) for the given billing period. If you don't provide a billing period, the current billing period is used.
 */
export const listCustomLineItems: API.PaginatedOperationMethod<
  ListCustomLineItemsInput,
  ListCustomLineItemsOutput,
  ListCustomLineItemsError,
  Credentials | HttpClient.HttpClient,
  CustomLineItemListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCustomLineItemsInput,
  output: ListCustomLineItemsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomLineItems",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CustomLineItems",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCustomLineItemVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A paginated call to get a list of all custom line item versions.
 */
export const listCustomLineItemVersions: API.PaginatedOperationMethod<
  ListCustomLineItemVersionsInput,
  ListCustomLineItemVersionsOutput,
  ListCustomLineItemVersionsError,
  Credentials | HttpClient.HttpClient,
  CustomLineItemVersionListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCustomLineItemVersionsInput,
  output: ListCustomLineItemVersionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomLineItemVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CustomLineItemVersions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPricingPlansError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A paginated call to get pricing plans for the given billing period. If you don't provide a billing period, the current billing period is used.
 */
export const listPricingPlans: API.PaginatedOperationMethod<
  ListPricingPlansInput,
  ListPricingPlansOutput,
  ListPricingPlansError,
  Credentials | HttpClient.HttpClient,
  PricingPlanListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPricingPlansInput,
  output: ListPricingPlansOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPricingPlans",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PricingPlans",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPricingPlansAssociatedWithPricingRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A list of the pricing plans that are associated with a pricing rule.
 */
export const listPricingPlansAssociatedWithPricingRule: API.PaginatedOperationMethod<
  ListPricingPlansAssociatedWithPricingRuleInput,
  ListPricingPlansAssociatedWithPricingRuleOutput,
  ListPricingPlansAssociatedWithPricingRuleError,
  Credentials | HttpClient.HttpClient,
  PricingPlanArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPricingPlansAssociatedWithPricingRuleInput,
  output: ListPricingPlansAssociatedWithPricingRuleOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPricingPlansAssociatedWithPricingRule",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PricingPlanArns",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPricingRulesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes a pricing rule that can be associated to a pricing plan, or set of pricing plans.
 */
export const listPricingRules: API.PaginatedOperationMethod<
  ListPricingRulesInput,
  ListPricingRulesOutput,
  ListPricingRulesError,
  Credentials | HttpClient.HttpClient,
  PricingRuleListElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPricingRulesInput,
  output: ListPricingRulesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPricingRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PricingRules",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPricingRulesAssociatedToPricingPlanError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the pricing rules that are associated with a pricing plan.
 */
export const listPricingRulesAssociatedToPricingPlan: API.PaginatedOperationMethod<
  ListPricingRulesAssociatedToPricingPlanInput,
  ListPricingRulesAssociatedToPricingPlanOutput,
  ListPricingRulesAssociatedToPricingPlanError,
  Credentials | HttpClient.HttpClient,
  PricingRuleArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPricingRulesAssociatedToPricingPlanInput,
  output: ListPricingRulesAssociatedToPricingPlanOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPricingRulesAssociatedToPricingPlan",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PricingRuleArns",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourcesAssociatedToCustomLineItemError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the resources that are associated to a custom line item.
 */
export const listResourcesAssociatedToCustomLineItem: API.PaginatedOperationMethod<
  ListResourcesAssociatedToCustomLineItemInput,
  ListResourcesAssociatedToCustomLineItemOutput,
  ListResourcesAssociatedToCustomLineItemError,
  Credentials | HttpClient.HttpClient,
  ListResourcesAssociatedToCustomLineItemResponseElement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourcesAssociatedToCustomLineItemInput,
  output: ListResourcesAssociatedToCustomLineItemOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourcesAssociatedToCustomLineItem",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AssociatedResources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A list the tags for a resource.
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
    InternalServerException,
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
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates the specified tags to a resource with the specified `resourceArn`. If existing tags on a resource are not specified in the request parameters, they are not changed.
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
    InternalServerException,
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
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes specified tags from a resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateBillingGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This updates an existing billing group.
 */
export const updateBillingGroup: API.OperationMethod<
  UpdateBillingGroupInput,
  UpdateBillingGroupOutput,
  UpdateBillingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBillingGroupInput,
  output: UpdateBillingGroupOutput,
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
  operationName: "UpdateBillingGroup",
}));

export type UpdateCustomLineItemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update an existing custom line item in the current or previous billing period.
 */
export const updateCustomLineItem: API.OperationMethod<
  UpdateCustomLineItemInput,
  UpdateCustomLineItemOutput,
  UpdateCustomLineItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCustomLineItemInput,
  output: UpdateCustomLineItemOutput,
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
  operationName: "UpdateCustomLineItem",
}));

export type UpdatePricingPlanError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This updates an existing pricing plan.
 */
export const updatePricingPlan: API.OperationMethod<
  UpdatePricingPlanInput,
  UpdatePricingPlanOutput,
  UpdatePricingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePricingPlanInput,
  output: UpdatePricingPlanOutput,
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
  operationName: "UpdatePricingPlan",
}));

export type UpdatePricingRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing pricing rule.
 */
export const updatePricingRule: API.OperationMethod<
  UpdatePricingRuleInput,
  UpdatePricingRuleOutput,
  UpdatePricingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePricingRuleInput,
  output: UpdatePricingRuleOutput,
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
  operationName: "UpdatePricingRule",
}));
