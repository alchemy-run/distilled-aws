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
  sdkId: "VerifiedPermissions",
  serviceShapeName: "VerifiedPermissions",
});
const auth = T.AwsAuthSigv4({ name: "verifiedpermissions" });
const ver = T.ServiceVersion("2021-12-01");
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
              `https://verifiedpermissions-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://verifiedpermissions-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://verifiedpermissions.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://verifiedpermissions.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      resources: S.suspend(() => ResourceConflictList).annotate({
        identifier: "ResourceConflictList",
      }),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateException>()(
    "InvalidStateException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(406),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.suspend(() => ResourceType).annotate({
        identifier: "ResourceType",
      }),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.suspend(() => ResourceType).annotate({
        identifier: "ResourceType",
      }),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      serviceCode: S.optional(S.String),
      quotaCode: S.optional(S.String),
    },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceName: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type PolicyStoreId = string;
export type PolicyId = string;
export interface BatchGetPolicyInputItem {
  policyStoreId: string;
  policyId: string;
}
export const BatchGetPolicyInputItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyStoreId: S.String, policyId: S.String }),
).annotate({
  identifier: "BatchGetPolicyInputItem",
}) as any as S.Schema<BatchGetPolicyInputItem>;
export type BatchGetPolicyInputList = BatchGetPolicyInputItem[];
export const BatchGetPolicyInputList = /*@__PURE__*/ S.Array(
  BatchGetPolicyInputItem,
);
export interface BatchGetPolicyInput {
  requests: BatchGetPolicyInputItem[];
}
export const BatchGetPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ requests: BatchGetPolicyInputList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchGetPolicyInput",
}) as any as S.Schema<BatchGetPolicyInput>;
export type PolicyType = "STATIC" | "TEMPLATE_LINKED" | (string & {});
export const PolicyType = S.String;

export type StaticPolicyDescription = string | redacted.Redacted<string>;
export type PolicyStatement = string | redacted.Redacted<string>;
export interface StaticPolicyDefinitionDetail {
  description?: string | redacted.Redacted<string>;
  statement: string | redacted.Redacted<string>;
}
export const StaticPolicyDefinitionDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(SensitiveString),
    statement: SensitiveString,
  }),
).annotate({
  identifier: "StaticPolicyDefinitionDetail",
}) as any as S.Schema<StaticPolicyDefinitionDetail>;
export type PolicyTemplateId = string;
export type EntityType = string | redacted.Redacted<string>;
export type EntityId = string | redacted.Redacted<string>;
export interface EntityIdentifier {
  entityType: string | redacted.Redacted<string>;
  entityId: string | redacted.Redacted<string>;
}
export const EntityIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ entityType: SensitiveString, entityId: SensitiveString }),
).annotate({
  identifier: "EntityIdentifier",
}) as any as S.Schema<EntityIdentifier>;
export interface TemplateLinkedPolicyDefinitionDetail {
  policyTemplateId: string;
  principal?: EntityIdentifier;
  resource?: EntityIdentifier;
}
export const TemplateLinkedPolicyDefinitionDetail = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      policyTemplateId: S.String,
      principal: S.optional(EntityIdentifier),
      resource: S.optional(EntityIdentifier),
    }),
).annotate({
  identifier: "TemplateLinkedPolicyDefinitionDetail",
}) as any as S.Schema<TemplateLinkedPolicyDefinitionDetail>;
export type PolicyDefinitionDetail =
  | { static: StaticPolicyDefinitionDetail; templateLinked?: never }
  | { static?: never; templateLinked: TemplateLinkedPolicyDefinitionDetail };
export const PolicyDefinitionDetail = /*@__PURE__*/ S.Union([
  S.Struct({ static: StaticPolicyDefinitionDetail }),
  S.Struct({ templateLinked: TemplateLinkedPolicyDefinitionDetail }),
]);
export type TimestampFormat = Date;
export type PolicyName = string;
export interface BatchGetPolicyOutputItem {
  policyStoreId: string;
  policyId: string;
  policyType: PolicyType;
  definition: PolicyDefinitionDetail;
  createdDate: Date;
  lastUpdatedDate: Date;
  name?: string;
}
export const BatchGetPolicyOutputItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    policyId: S.String,
    policyType: PolicyType,
    definition: PolicyDefinitionDetail,
    createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    name: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchGetPolicyOutputItem",
}) as any as S.Schema<BatchGetPolicyOutputItem>;
export type BatchGetPolicyOutputList = BatchGetPolicyOutputItem[];
export const BatchGetPolicyOutputList = /*@__PURE__*/ S.Array(
  BatchGetPolicyOutputItem,
);
export type BatchGetPolicyErrorCode =
  | "POLICY_STORE_NOT_FOUND"
  | "POLICY_NOT_FOUND"
  | "POLICY_STORE_ALIAS_NOT_FOUND"
  | (string & {});
export const BatchGetPolicyErrorCode = S.String;

export interface BatchGetPolicyErrorItem {
  code: BatchGetPolicyErrorCode;
  policyStoreId: string;
  policyId: string;
  message: string;
}
export const BatchGetPolicyErrorItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    code: BatchGetPolicyErrorCode,
    policyStoreId: S.String,
    policyId: S.String,
    message: S.String,
  }),
).annotate({
  identifier: "BatchGetPolicyErrorItem",
}) as any as S.Schema<BatchGetPolicyErrorItem>;
export type BatchGetPolicyErrorList = BatchGetPolicyErrorItem[];
export const BatchGetPolicyErrorList = /*@__PURE__*/ S.Array(
  BatchGetPolicyErrorItem,
);
export interface BatchGetPolicyOutput {
  results: BatchGetPolicyOutputItem[];
  errors: BatchGetPolicyErrorItem[];
}
export const BatchGetPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    results: BatchGetPolicyOutputList,
    errors: BatchGetPolicyErrorList,
  }),
).annotate({
  identifier: "BatchGetPolicyOutput",
}) as any as S.Schema<BatchGetPolicyOutput>;
export type BooleanAttribute = boolean;
export type LongAttribute = number;
export type StringAttribute = string | redacted.Redacted<string>;
export type SetAttribute = AttributeValue[];
export const SetAttribute = /*@__PURE__*/ S.Array(
  S.suspend(() => AttributeValue).annotate({ identifier: "AttributeValue" }),
) as any as S.Schema<SetAttribute>;
export type RecordAttribute = { [key: string]: AttributeValue | undefined };
export const RecordAttribute = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend(() => AttributeValue)
    .annotate({ identifier: "AttributeValue" })
    .pipe(S.optional),
) as any as S.Schema<RecordAttribute>;
export type IpAddr = string | redacted.Redacted<string>;
export type Decimal = string | redacted.Redacted<string>;
export type DatetimeAttribute = string | redacted.Redacted<string>;
export type Duration = string | redacted.Redacted<string>;
export type AttributeValue =
  | {
      boolean: boolean;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier: EntityIdentifier;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long: number;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string: string | redacted.Redacted<string>;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set: AttributeValue[];
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record: { [key: string]: AttributeValue | undefined };
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr: string | redacted.Redacted<string>;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal: string | redacted.Redacted<string>;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime: string | redacted.Redacted<string>;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration: string | redacted.Redacted<string>;
    };
export const AttributeValue = /*@__PURE__*/ S.Union([
  S.Struct({ boolean: S.Boolean }),
  S.Struct({ entityIdentifier: EntityIdentifier }),
  S.Struct({ long: S.Number }),
  S.Struct({ string: SensitiveString }),
  S.Struct({
    set: S.suspend(() => SetAttribute).annotate({ identifier: "SetAttribute" }),
  }),
  S.Struct({
    record: S.suspend(() => RecordAttribute).annotate({
      identifier: "RecordAttribute",
    }),
  }),
  S.Struct({ ipaddr: SensitiveString }),
  S.Struct({ decimal: SensitiveString }),
  S.Struct({ datetime: SensitiveString }),
  S.Struct({ duration: SensitiveString }),
]) as any as S.Schema<AttributeValue>;
export type EntityAttributes = { [key: string]: AttributeValue | undefined };
export const EntityAttributes = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend(() => AttributeValue)
    .annotate({ identifier: "AttributeValue" })
    .pipe(S.optional),
);
export type ParentList = EntityIdentifier[];
export const ParentList = /*@__PURE__*/ S.Array(EntityIdentifier);
export type CedarTagSetAttribute = CedarTagValue[];
export const CedarTagSetAttribute = /*@__PURE__*/ S.Array(
  S.suspend(() => CedarTagValue).annotate({ identifier: "CedarTagValue" }),
) as any as S.Schema<CedarTagSetAttribute>;
export type CedarTagRecordAttribute = {
  [key: string]: CedarTagValue | undefined;
};
export const CedarTagRecordAttribute = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend(() => CedarTagValue)
    .annotate({ identifier: "CedarTagValue" })
    .pipe(S.optional),
) as any as S.Schema<CedarTagRecordAttribute>;
export type CedarTagValue =
  | {
      boolean: boolean;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier: EntityIdentifier;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long: number;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string: string | redacted.Redacted<string>;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set: CedarTagValue[];
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record: { [key: string]: CedarTagValue | undefined };
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr: string | redacted.Redacted<string>;
      decimal?: never;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal: string | redacted.Redacted<string>;
      datetime?: never;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime: string | redacted.Redacted<string>;
      duration?: never;
    }
  | {
      boolean?: never;
      entityIdentifier?: never;
      long?: never;
      string?: never;
      set?: never;
      record?: never;
      ipaddr?: never;
      decimal?: never;
      datetime?: never;
      duration: string | redacted.Redacted<string>;
    };
export const CedarTagValue = /*@__PURE__*/ S.Union([
  S.Struct({ boolean: S.Boolean }),
  S.Struct({ entityIdentifier: EntityIdentifier }),
  S.Struct({ long: S.Number }),
  S.Struct({ string: SensitiveString }),
  S.Struct({
    set: S.suspend(() => CedarTagSetAttribute).annotate({
      identifier: "CedarTagSetAttribute",
    }),
  }),
  S.Struct({
    record: S.suspend(() => CedarTagRecordAttribute).annotate({
      identifier: "CedarTagRecordAttribute",
    }),
  }),
  S.Struct({ ipaddr: SensitiveString }),
  S.Struct({ decimal: SensitiveString }),
  S.Struct({ datetime: SensitiveString }),
  S.Struct({ duration: SensitiveString }),
]) as any as S.Schema<CedarTagValue>;
export type EntityCedarTags = { [key: string]: CedarTagValue | undefined };
export const EntityCedarTags = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend(() => CedarTagValue)
    .annotate({ identifier: "CedarTagValue" })
    .pipe(S.optional),
);
export interface EntityItem {
  identifier: EntityIdentifier;
  attributes?: { [key: string]: AttributeValue | undefined };
  parents?: EntityIdentifier[];
  tags?: { [key: string]: CedarTagValue | undefined };
}
export const EntityItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifier: EntityIdentifier,
    attributes: S.optional(EntityAttributes),
    parents: S.optional(ParentList),
    tags: S.optional(EntityCedarTags),
  }),
).annotate({ identifier: "EntityItem" }) as any as S.Schema<EntityItem>;
export type EntityList = EntityItem[];
export const EntityList = /*@__PURE__*/ S.Array(EntityItem);
export type CedarJson = string | redacted.Redacted<string>;
export type EntitiesDefinition =
  | { entityList: EntityItem[]; cedarJson?: never }
  | { entityList?: never; cedarJson: string | redacted.Redacted<string> };
export const EntitiesDefinition = /*@__PURE__*/ S.Union([
  S.Struct({ entityList: EntityList }),
  S.Struct({ cedarJson: SensitiveString }),
]);
export type ActionType = string | redacted.Redacted<string>;
export type ActionId = string | redacted.Redacted<string>;
export interface ActionIdentifier {
  actionType: string | redacted.Redacted<string>;
  actionId: string | redacted.Redacted<string>;
}
export const ActionIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ actionType: SensitiveString, actionId: SensitiveString }),
).annotate({
  identifier: "ActionIdentifier",
}) as any as S.Schema<ActionIdentifier>;
export type ContextMap = { [key: string]: AttributeValue | undefined };
export const ContextMap = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend(() => AttributeValue)
    .annotate({ identifier: "AttributeValue" })
    .pipe(S.optional),
);
export type ContextDefinition =
  | {
      contextMap: { [key: string]: AttributeValue | undefined };
      cedarJson?: never;
    }
  | { contextMap?: never; cedarJson: string | redacted.Redacted<string> };
export const ContextDefinition = /*@__PURE__*/ S.Union([
  S.Struct({ contextMap: ContextMap }),
  S.Struct({ cedarJson: SensitiveString }),
]);
export interface BatchIsAuthorizedInputItem {
  principal?: EntityIdentifier;
  action?: ActionIdentifier;
  resource?: EntityIdentifier;
  context?: ContextDefinition;
}
export const BatchIsAuthorizedInputItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    principal: S.optional(EntityIdentifier),
    action: S.optional(ActionIdentifier),
    resource: S.optional(EntityIdentifier),
    context: S.optional(ContextDefinition),
  }),
).annotate({
  identifier: "BatchIsAuthorizedInputItem",
}) as any as S.Schema<BatchIsAuthorizedInputItem>;
export type BatchIsAuthorizedInputList = BatchIsAuthorizedInputItem[];
export const BatchIsAuthorizedInputList = /*@__PURE__*/ S.Array(
  BatchIsAuthorizedInputItem,
);
export interface BatchIsAuthorizedInput {
  policyStoreId: string;
  entities?: EntitiesDefinition;
  requests: BatchIsAuthorizedInputItem[];
}
export const BatchIsAuthorizedInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    entities: S.optional(EntitiesDefinition),
    requests: BatchIsAuthorizedInputList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchIsAuthorizedInput",
}) as any as S.Schema<BatchIsAuthorizedInput>;
export type Decision = "ALLOW" | "DENY" | (string & {});
export const Decision = S.String;

export interface DeterminingPolicyItem {
  policyId: string;
}
export const DeterminingPolicyItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyId: S.String }),
).annotate({
  identifier: "DeterminingPolicyItem",
}) as any as S.Schema<DeterminingPolicyItem>;
export type DeterminingPolicyList = DeterminingPolicyItem[];
export const DeterminingPolicyList = /*@__PURE__*/ S.Array(
  DeterminingPolicyItem,
);
export interface EvaluationErrorItem {
  errorDescription: string;
}
export const EvaluationErrorItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ errorDescription: S.String }),
).annotate({
  identifier: "EvaluationErrorItem",
}) as any as S.Schema<EvaluationErrorItem>;
export type EvaluationErrorList = EvaluationErrorItem[];
export const EvaluationErrorList = /*@__PURE__*/ S.Array(EvaluationErrorItem);
export interface BatchIsAuthorizedOutputItem {
  request: BatchIsAuthorizedInputItem;
  decision: Decision;
  determiningPolicies: DeterminingPolicyItem[];
  errors: EvaluationErrorItem[];
}
export const BatchIsAuthorizedOutputItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    request: BatchIsAuthorizedInputItem,
    decision: Decision,
    determiningPolicies: DeterminingPolicyList,
    errors: EvaluationErrorList,
  }),
).annotate({
  identifier: "BatchIsAuthorizedOutputItem",
}) as any as S.Schema<BatchIsAuthorizedOutputItem>;
export type BatchIsAuthorizedOutputList = BatchIsAuthorizedOutputItem[];
export const BatchIsAuthorizedOutputList = /*@__PURE__*/ S.Array(
  BatchIsAuthorizedOutputItem,
);
export interface BatchIsAuthorizedOutput {
  results: BatchIsAuthorizedOutputItem[];
}
export const BatchIsAuthorizedOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ results: BatchIsAuthorizedOutputList }),
).annotate({
  identifier: "BatchIsAuthorizedOutput",
}) as any as S.Schema<BatchIsAuthorizedOutput>;
export type Token = string | redacted.Redacted<string>;
export interface BatchIsAuthorizedWithTokenInputItem {
  action?: ActionIdentifier;
  resource?: EntityIdentifier;
  context?: ContextDefinition;
}
export const BatchIsAuthorizedWithTokenInputItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: S.optional(ActionIdentifier),
    resource: S.optional(EntityIdentifier),
    context: S.optional(ContextDefinition),
  }),
).annotate({
  identifier: "BatchIsAuthorizedWithTokenInputItem",
}) as any as S.Schema<BatchIsAuthorizedWithTokenInputItem>;
export type BatchIsAuthorizedWithTokenInputList =
  BatchIsAuthorizedWithTokenInputItem[];
export const BatchIsAuthorizedWithTokenInputList = /*@__PURE__*/ S.Array(
  BatchIsAuthorizedWithTokenInputItem,
);
export interface BatchIsAuthorizedWithTokenInput {
  policyStoreId: string;
  identityToken?: string | redacted.Redacted<string>;
  accessToken?: string | redacted.Redacted<string>;
  entities?: EntitiesDefinition;
  requests: BatchIsAuthorizedWithTokenInputItem[];
}
export const BatchIsAuthorizedWithTokenInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    identityToken: S.optional(SensitiveString),
    accessToken: S.optional(SensitiveString),
    entities: S.optional(EntitiesDefinition),
    requests: BatchIsAuthorizedWithTokenInputList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchIsAuthorizedWithTokenInput",
}) as any as S.Schema<BatchIsAuthorizedWithTokenInput>;
export interface BatchIsAuthorizedWithTokenOutputItem {
  request: BatchIsAuthorizedWithTokenInputItem;
  decision: Decision;
  determiningPolicies: DeterminingPolicyItem[];
  errors: EvaluationErrorItem[];
}
export const BatchIsAuthorizedWithTokenOutputItem = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      request: BatchIsAuthorizedWithTokenInputItem,
      decision: Decision,
      determiningPolicies: DeterminingPolicyList,
      errors: EvaluationErrorList,
    }),
).annotate({
  identifier: "BatchIsAuthorizedWithTokenOutputItem",
}) as any as S.Schema<BatchIsAuthorizedWithTokenOutputItem>;
export type BatchIsAuthorizedWithTokenOutputList =
  BatchIsAuthorizedWithTokenOutputItem[];
export const BatchIsAuthorizedWithTokenOutputList = /*@__PURE__*/ S.Array(
  BatchIsAuthorizedWithTokenOutputItem,
);
export interface BatchIsAuthorizedWithTokenOutput {
  principal?: EntityIdentifier;
  results: BatchIsAuthorizedWithTokenOutputItem[];
}
export const BatchIsAuthorizedWithTokenOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    principal: S.optional(EntityIdentifier),
    results: BatchIsAuthorizedWithTokenOutputList,
  }),
).annotate({
  identifier: "BatchIsAuthorizedWithTokenOutput",
}) as any as S.Schema<BatchIsAuthorizedWithTokenOutput>;
export type IdempotencyToken = string;
export type UserPoolArn = string;
export type ClientId = string | redacted.Redacted<string>;
export type ClientIds = (string | redacted.Redacted<string>)[];
export const ClientIds = /*@__PURE__*/ S.Array(SensitiveString);
export type GroupEntityType = string | redacted.Redacted<string>;
export interface CognitoGroupConfiguration {
  groupEntityType: string | redacted.Redacted<string>;
}
export const CognitoGroupConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ groupEntityType: SensitiveString }),
).annotate({
  identifier: "CognitoGroupConfiguration",
}) as any as S.Schema<CognitoGroupConfiguration>;
export interface CognitoUserPoolConfiguration {
  userPoolArn: string;
  clientIds?: (string | redacted.Redacted<string>)[];
  groupConfiguration?: CognitoGroupConfiguration;
}
export const CognitoUserPoolConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userPoolArn: S.String,
    clientIds: S.optional(ClientIds),
    groupConfiguration: S.optional(CognitoGroupConfiguration),
  }),
).annotate({
  identifier: "CognitoUserPoolConfiguration",
}) as any as S.Schema<CognitoUserPoolConfiguration>;
export type Issuer = string;
export type EntityIdPrefix = string | redacted.Redacted<string>;
export type Claim = string | redacted.Redacted<string>;
export interface OpenIdConnectGroupConfiguration {
  groupClaim: string | redacted.Redacted<string>;
  groupEntityType: string | redacted.Redacted<string>;
}
export const OpenIdConnectGroupConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ groupClaim: SensitiveString, groupEntityType: SensitiveString }),
).annotate({
  identifier: "OpenIdConnectGroupConfiguration",
}) as any as S.Schema<OpenIdConnectGroupConfiguration>;
export type Audience = string;
export type Audiences = string[];
export const Audiences = /*@__PURE__*/ S.Array(S.String);
export interface OpenIdConnectAccessTokenConfiguration {
  principalIdClaim?: string | redacted.Redacted<string>;
  audiences?: string[];
}
export const OpenIdConnectAccessTokenConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      principalIdClaim: S.optional(SensitiveString),
      audiences: S.optional(Audiences),
    }),
).annotate({
  identifier: "OpenIdConnectAccessTokenConfiguration",
}) as any as S.Schema<OpenIdConnectAccessTokenConfiguration>;
export interface OpenIdConnectIdentityTokenConfiguration {
  principalIdClaim?: string | redacted.Redacted<string>;
  clientIds?: (string | redacted.Redacted<string>)[];
}
export const OpenIdConnectIdentityTokenConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      principalIdClaim: S.optional(SensitiveString),
      clientIds: S.optional(ClientIds),
    }),
).annotate({
  identifier: "OpenIdConnectIdentityTokenConfiguration",
}) as any as S.Schema<OpenIdConnectIdentityTokenConfiguration>;
export type OpenIdConnectTokenSelection =
  | {
      accessTokenOnly: OpenIdConnectAccessTokenConfiguration;
      identityTokenOnly?: never;
    }
  | {
      accessTokenOnly?: never;
      identityTokenOnly: OpenIdConnectIdentityTokenConfiguration;
    };
export const OpenIdConnectTokenSelection = /*@__PURE__*/ S.Union([
  S.Struct({ accessTokenOnly: OpenIdConnectAccessTokenConfiguration }),
  S.Struct({ identityTokenOnly: OpenIdConnectIdentityTokenConfiguration }),
]);
export interface OpenIdConnectConfiguration {
  issuer: string;
  entityIdPrefix?: string | redacted.Redacted<string>;
  groupConfiguration?: OpenIdConnectGroupConfiguration;
  tokenSelection: OpenIdConnectTokenSelection;
}
export const OpenIdConnectConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    issuer: S.String,
    entityIdPrefix: S.optional(SensitiveString),
    groupConfiguration: S.optional(OpenIdConnectGroupConfiguration),
    tokenSelection: OpenIdConnectTokenSelection,
  }),
).annotate({
  identifier: "OpenIdConnectConfiguration",
}) as any as S.Schema<OpenIdConnectConfiguration>;
export type Configuration =
  | {
      cognitoUserPoolConfiguration: CognitoUserPoolConfiguration;
      openIdConnectConfiguration?: never;
    }
  | {
      cognitoUserPoolConfiguration?: never;
      openIdConnectConfiguration: OpenIdConnectConfiguration;
    };
export const Configuration = /*@__PURE__*/ S.Union([
  S.Struct({ cognitoUserPoolConfiguration: CognitoUserPoolConfiguration }),
  S.Struct({ openIdConnectConfiguration: OpenIdConnectConfiguration }),
]);
export type PrincipalEntityType = string | redacted.Redacted<string>;
export interface CreateIdentitySourceInput {
  clientToken?: string;
  policyStoreId: string;
  configuration: Configuration;
  principalEntityType?: string | redacted.Redacted<string>;
}
export const CreateIdentitySourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    policyStoreId: S.String,
    configuration: Configuration,
    principalEntityType: S.optional(SensitiveString),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateIdentitySourceInput",
}) as any as S.Schema<CreateIdentitySourceInput>;
export type IdentitySourceId = string;
export interface CreateIdentitySourceOutput {
  createdDate: Date;
  identitySourceId: string;
  lastUpdatedDate: Date;
  policyStoreId: string;
}
export const CreateIdentitySourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    identitySourceId: S.String,
    lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    policyStoreId: S.String,
  }),
).annotate({
  identifier: "CreateIdentitySourceOutput",
}) as any as S.Schema<CreateIdentitySourceOutput>;
export interface StaticPolicyDefinition {
  description?: string | redacted.Redacted<string>;
  statement: string | redacted.Redacted<string>;
}
export const StaticPolicyDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(SensitiveString),
    statement: SensitiveString,
  }),
).annotate({
  identifier: "StaticPolicyDefinition",
}) as any as S.Schema<StaticPolicyDefinition>;
export interface TemplateLinkedPolicyDefinition {
  policyTemplateId: string;
  principal?: EntityIdentifier;
  resource?: EntityIdentifier;
}
export const TemplateLinkedPolicyDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyTemplateId: S.String,
    principal: S.optional(EntityIdentifier),
    resource: S.optional(EntityIdentifier),
  }),
).annotate({
  identifier: "TemplateLinkedPolicyDefinition",
}) as any as S.Schema<TemplateLinkedPolicyDefinition>;
export type PolicyDefinition =
  | { static: StaticPolicyDefinition; templateLinked?: never }
  | { static?: never; templateLinked: TemplateLinkedPolicyDefinition };
export const PolicyDefinition = /*@__PURE__*/ S.Union([
  S.Struct({ static: StaticPolicyDefinition }),
  S.Struct({ templateLinked: TemplateLinkedPolicyDefinition }),
]);
export interface CreatePolicyInput {
  clientToken?: string;
  policyStoreId: string;
  definition: PolicyDefinition;
  name?: string;
}
export const CreatePolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    policyStoreId: S.String,
    definition: PolicyDefinition,
    name: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreatePolicyInput",
}) as any as S.Schema<CreatePolicyInput>;
export type ActionIdentifierList = ActionIdentifier[];
export const ActionIdentifierList = /*@__PURE__*/ S.Array(ActionIdentifier);
export type PolicyEffect = "Permit" | "Forbid" | (string & {});
export const PolicyEffect = S.String;

export interface CreatePolicyOutput {
  policyStoreId: string;
  policyId: string;
  policyType: PolicyType;
  principal?: EntityIdentifier;
  resource?: EntityIdentifier;
  actions?: ActionIdentifier[];
  createdDate: Date;
  lastUpdatedDate: Date;
  effect?: PolicyEffect;
}
export const CreatePolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    policyId: S.String,
    policyType: PolicyType,
    principal: S.optional(EntityIdentifier),
    resource: S.optional(EntityIdentifier),
    actions: S.optional(ActionIdentifierList),
    createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    effect: S.optional(PolicyEffect),
  }),
).annotate({
  identifier: "CreatePolicyOutput",
}) as any as S.Schema<CreatePolicyOutput>;
export type ValidationMode = "OFF" | "STRICT" | (string & {});
export const ValidationMode = S.String;

export interface ValidationSettings {
  mode: ValidationMode;
}
export const ValidationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ mode: ValidationMode }),
).annotate({
  identifier: "ValidationSettings",
}) as any as S.Schema<ValidationSettings>;
export type PolicyStoreDescription = string | redacted.Redacted<string>;
export type DeletionProtection = "ENABLED" | "DISABLED" | (string & {});
export const DeletionProtection = S.String;

export type KmsKey = string;
export type EncryptionContextKey = string;
export type EncryptionContextValue = string;
export type EncryptionContext = { [key: string]: string | undefined };
export const EncryptionContext = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface KmsEncryptionSettings {
  key: string;
  encryptionContext?: { [key: string]: string | undefined };
}
export const KmsEncryptionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, encryptionContext: S.optional(EncryptionContext) }),
).annotate({
  identifier: "KmsEncryptionSettings",
}) as any as S.Schema<KmsEncryptionSettings>;
export type EncryptionSettings =
  | { kmsEncryptionSettings: KmsEncryptionSettings; default?: never }
  | { kmsEncryptionSettings?: never; default: Record<string, never> };
export const EncryptionSettings = /*@__PURE__*/ S.Union([
  S.Struct({ kmsEncryptionSettings: KmsEncryptionSettings }),
  S.Struct({ default: S.Struct({}) }),
]);
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreatePolicyStoreInput {
  clientToken?: string;
  validationSettings: ValidationSettings;
  description?: string | redacted.Redacted<string>;
  deletionProtection?: DeletionProtection;
  encryptionSettings?: EncryptionSettings;
  tags?: { [key: string]: string | undefined };
}
export const CreatePolicyStoreInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    validationSettings: ValidationSettings,
    description: S.optional(SensitiveString),
    deletionProtection: S.optional(DeletionProtection),
    encryptionSettings: S.optional(EncryptionSettings),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreatePolicyStoreInput",
}) as any as S.Schema<CreatePolicyStoreInput>;
export type ResourceArn = string;
export interface CreatePolicyStoreOutput {
  policyStoreId: string;
  arn: string;
  createdDate: Date;
  lastUpdatedDate: Date;
}
export const CreatePolicyStoreOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    arn: S.String,
    createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreatePolicyStoreOutput",
}) as any as S.Schema<CreatePolicyStoreOutput>;
export type Alias = string;
export interface CreatePolicyStoreAliasInput {
  aliasName: string;
  policyStoreId: string;
}
export const CreatePolicyStoreAliasInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ aliasName: S.String, policyStoreId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreatePolicyStoreAliasInput",
}) as any as S.Schema<CreatePolicyStoreAliasInput>;
export interface CreatePolicyStoreAliasOutput {
  aliasName: string;
  policyStoreId: string;
  aliasArn: string;
  createdAt: Date;
}
export const CreatePolicyStoreAliasOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    aliasName: S.String,
    policyStoreId: S.String,
    aliasArn: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreatePolicyStoreAliasOutput",
}) as any as S.Schema<CreatePolicyStoreAliasOutput>;
export type PolicyTemplateDescription = string | redacted.Redacted<string>;
export type PolicyTemplateName = string;
export interface CreatePolicyTemplateInput {
  clientToken?: string;
  policyStoreId: string;
  description?: string | redacted.Redacted<string>;
  statement: string | redacted.Redacted<string>;
  name?: string;
}
export const CreatePolicyTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    policyStoreId: S.String,
    description: S.optional(SensitiveString),
    statement: SensitiveString,
    name: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreatePolicyTemplateInput",
}) as any as S.Schema<CreatePolicyTemplateInput>;
export interface CreatePolicyTemplateOutput {
  policyStoreId: string;
  policyTemplateId: string;
  createdDate: Date;
  lastUpdatedDate: Date;
}
export const CreatePolicyTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    policyTemplateId: S.String,
    createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "CreatePolicyTemplateOutput",
}) as any as S.Schema<CreatePolicyTemplateOutput>;
export interface DeleteIdentitySourceInput {
  policyStoreId: string;
  identitySourceId: string;
}
export const DeleteIdentitySourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyStoreId: S.String, identitySourceId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteIdentitySourceInput",
}) as any as S.Schema<DeleteIdentitySourceInput>;
export interface DeleteIdentitySourceOutput {}
export const DeleteIdentitySourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteIdentitySourceOutput",
}) as any as S.Schema<DeleteIdentitySourceOutput>;
export interface DeletePolicyInput {
  policyStoreId: string;
  policyId: string;
}
export const DeletePolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyStoreId: S.String, policyId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeletePolicyInput",
}) as any as S.Schema<DeletePolicyInput>;
export interface DeletePolicyOutput {}
export const DeletePolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePolicyOutput",
}) as any as S.Schema<DeletePolicyOutput>;
export interface DeletePolicyStoreInput {
  policyStoreId: string;
}
export const DeletePolicyStoreInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyStoreId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeletePolicyStoreInput",
}) as any as S.Schema<DeletePolicyStoreInput>;
export interface DeletePolicyStoreOutput {}
export const DeletePolicyStoreOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePolicyStoreOutput",
}) as any as S.Schema<DeletePolicyStoreOutput>;
export type DeletionMode = "SoftDelete" | "HardDelete" | (string & {});
export const DeletionMode = S.String;

export interface DeletePolicyStoreAliasInput {
  aliasName: string;
  deletionMode?: DeletionMode;
}
export const DeletePolicyStoreAliasInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    aliasName: S.String,
    deletionMode: S.optional(DeletionMode),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeletePolicyStoreAliasInput",
}) as any as S.Schema<DeletePolicyStoreAliasInput>;
export interface DeletePolicyStoreAliasOutput {}
export const DeletePolicyStoreAliasOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePolicyStoreAliasOutput",
}) as any as S.Schema<DeletePolicyStoreAliasOutput>;
export interface DeletePolicyTemplateInput {
  policyStoreId: string;
  policyTemplateId: string;
}
export const DeletePolicyTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyStoreId: S.String, policyTemplateId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeletePolicyTemplateInput",
}) as any as S.Schema<DeletePolicyTemplateInput>;
export interface DeletePolicyTemplateOutput {}
export const DeletePolicyTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePolicyTemplateOutput",
}) as any as S.Schema<DeletePolicyTemplateOutput>;
export interface GetIdentitySourceInput {
  policyStoreId: string;
  identitySourceId: string;
}
export const GetIdentitySourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyStoreId: S.String, identitySourceId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetIdentitySourceInput",
}) as any as S.Schema<GetIdentitySourceInput>;
export type DiscoveryUrl = string;
export type OpenIdIssuer = "COGNITO" | (string & {});
export const OpenIdIssuer = S.String;

export interface IdentitySourceDetails {
  clientIds?: (string | redacted.Redacted<string>)[];
  userPoolArn?: string;
  discoveryUrl?: string;
  openIdIssuer?: OpenIdIssuer;
}
export const IdentitySourceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientIds: S.optional(ClientIds),
    userPoolArn: S.optional(S.String),
    discoveryUrl: S.optional(S.String),
    openIdIssuer: S.optional(OpenIdIssuer),
  }),
).annotate({
  identifier: "IdentitySourceDetails",
}) as any as S.Schema<IdentitySourceDetails>;
export interface CognitoGroupConfigurationDetail {
  groupEntityType?: string | redacted.Redacted<string>;
}
export const CognitoGroupConfigurationDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ groupEntityType: S.optional(SensitiveString) }),
).annotate({
  identifier: "CognitoGroupConfigurationDetail",
}) as any as S.Schema<CognitoGroupConfigurationDetail>;
export interface CognitoUserPoolConfigurationDetail {
  userPoolArn: string;
  clientIds: (string | redacted.Redacted<string>)[];
  issuer: string;
  groupConfiguration?: CognitoGroupConfigurationDetail;
}
export const CognitoUserPoolConfigurationDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userPoolArn: S.String,
    clientIds: ClientIds,
    issuer: S.String,
    groupConfiguration: S.optional(CognitoGroupConfigurationDetail),
  }),
).annotate({
  identifier: "CognitoUserPoolConfigurationDetail",
}) as any as S.Schema<CognitoUserPoolConfigurationDetail>;
export interface OpenIdConnectGroupConfigurationDetail {
  groupClaim: string | redacted.Redacted<string>;
  groupEntityType: string | redacted.Redacted<string>;
}
export const OpenIdConnectGroupConfigurationDetail = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ groupClaim: SensitiveString, groupEntityType: SensitiveString }),
).annotate({
  identifier: "OpenIdConnectGroupConfigurationDetail",
}) as any as S.Schema<OpenIdConnectGroupConfigurationDetail>;
export interface OpenIdConnectAccessTokenConfigurationDetail {
  principalIdClaim?: string | redacted.Redacted<string>;
  audiences?: string[];
}
export const OpenIdConnectAccessTokenConfigurationDetail =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      principalIdClaim: S.optional(SensitiveString),
      audiences: S.optional(Audiences),
    }),
  ).annotate({
    identifier: "OpenIdConnectAccessTokenConfigurationDetail",
  }) as any as S.Schema<OpenIdConnectAccessTokenConfigurationDetail>;
export interface OpenIdConnectIdentityTokenConfigurationDetail {
  principalIdClaim?: string | redacted.Redacted<string>;
  clientIds?: (string | redacted.Redacted<string>)[];
}
export const OpenIdConnectIdentityTokenConfigurationDetail =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      principalIdClaim: S.optional(SensitiveString),
      clientIds: S.optional(ClientIds),
    }),
  ).annotate({
    identifier: "OpenIdConnectIdentityTokenConfigurationDetail",
  }) as any as S.Schema<OpenIdConnectIdentityTokenConfigurationDetail>;
export type OpenIdConnectTokenSelectionDetail =
  | {
      accessTokenOnly: OpenIdConnectAccessTokenConfigurationDetail;
      identityTokenOnly?: never;
    }
  | {
      accessTokenOnly?: never;
      identityTokenOnly: OpenIdConnectIdentityTokenConfigurationDetail;
    };
export const OpenIdConnectTokenSelectionDetail = /*@__PURE__*/ S.Union([
  S.Struct({ accessTokenOnly: OpenIdConnectAccessTokenConfigurationDetail }),
  S.Struct({
    identityTokenOnly: OpenIdConnectIdentityTokenConfigurationDetail,
  }),
]);
export interface OpenIdConnectConfigurationDetail {
  issuer: string;
  entityIdPrefix?: string | redacted.Redacted<string>;
  groupConfiguration?: OpenIdConnectGroupConfigurationDetail;
  tokenSelection: OpenIdConnectTokenSelectionDetail;
}
export const OpenIdConnectConfigurationDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    issuer: S.String,
    entityIdPrefix: S.optional(SensitiveString),
    groupConfiguration: S.optional(OpenIdConnectGroupConfigurationDetail),
    tokenSelection: OpenIdConnectTokenSelectionDetail,
  }),
).annotate({
  identifier: "OpenIdConnectConfigurationDetail",
}) as any as S.Schema<OpenIdConnectConfigurationDetail>;
export type ConfigurationDetail =
  | {
      cognitoUserPoolConfiguration: CognitoUserPoolConfigurationDetail;
      openIdConnectConfiguration?: never;
    }
  | {
      cognitoUserPoolConfiguration?: never;
      openIdConnectConfiguration: OpenIdConnectConfigurationDetail;
    };
export const ConfigurationDetail = /*@__PURE__*/ S.Union([
  S.Struct({
    cognitoUserPoolConfiguration: CognitoUserPoolConfigurationDetail,
  }),
  S.Struct({ openIdConnectConfiguration: OpenIdConnectConfigurationDetail }),
]);
export interface GetIdentitySourceOutput {
  createdDate: Date;
  details?: IdentitySourceDetails;
  identitySourceId: string;
  lastUpdatedDate: Date;
  policyStoreId: string;
  principalEntityType: string | redacted.Redacted<string>;
  configuration?: ConfigurationDetail;
}
export const GetIdentitySourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    details: S.optional(IdentitySourceDetails),
    identitySourceId: S.String,
    lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    policyStoreId: S.String,
    principalEntityType: SensitiveString,
    configuration: S.optional(ConfigurationDetail),
  }),
).annotate({
  identifier: "GetIdentitySourceOutput",
}) as any as S.Schema<GetIdentitySourceOutput>;
export interface GetPolicyInput {
  policyStoreId: string;
  policyId: string;
}
export const GetPolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyStoreId: S.String, policyId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({ identifier: "GetPolicyInput" }) as any as S.Schema<GetPolicyInput>;
export interface GetPolicyOutput {
  policyStoreId: string;
  policyId: string;
  policyType: PolicyType;
  principal?: EntityIdentifier;
  resource?: EntityIdentifier;
  actions?: ActionIdentifier[];
  definition: PolicyDefinitionDetail;
  createdDate: Date;
  lastUpdatedDate: Date;
  effect?: PolicyEffect;
  name?: string;
}
export const GetPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    policyId: S.String,
    policyType: PolicyType,
    principal: S.optional(EntityIdentifier),
    resource: S.optional(EntityIdentifier),
    actions: S.optional(ActionIdentifierList),
    definition: PolicyDefinitionDetail,
    createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    effect: S.optional(PolicyEffect),
    name: S.optional(S.String),
  }),
).annotate({
  identifier: "GetPolicyOutput",
}) as any as S.Schema<GetPolicyOutput>;
export interface GetPolicyStoreInput {
  policyStoreId: string;
  tags?: boolean;
}
export const GetPolicyStoreInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyStoreId: S.String, tags: S.optional(S.Boolean) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetPolicyStoreInput",
}) as any as S.Schema<GetPolicyStoreInput>;
export interface KmsEncryptionState {
  key: string;
  encryptionContext: { [key: string]: string | undefined };
}
export const KmsEncryptionState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, encryptionContext: EncryptionContext }),
).annotate({
  identifier: "KmsEncryptionState",
}) as any as S.Schema<KmsEncryptionState>;
export type EncryptionState =
  | { kmsEncryptionState: KmsEncryptionState; default?: never }
  | { kmsEncryptionState?: never; default: Record<string, never> };
export const EncryptionState = /*@__PURE__*/ S.Union([
  S.Struct({ kmsEncryptionState: KmsEncryptionState }),
  S.Struct({ default: S.Struct({}) }),
]);
export type CedarVersion = "CEDAR_2" | "CEDAR_4" | (string & {});
export const CedarVersion = S.String;

export interface GetPolicyStoreOutput {
  policyStoreId: string;
  arn: string;
  validationSettings: ValidationSettings;
  createdDate: Date;
  lastUpdatedDate: Date;
  description?: string | redacted.Redacted<string>;
  deletionProtection?: DeletionProtection;
  encryptionState?: EncryptionState;
  cedarVersion?: CedarVersion;
  tags?: { [key: string]: string | undefined };
}
export const GetPolicyStoreOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    arn: S.String,
    validationSettings: ValidationSettings,
    createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    description: S.optional(SensitiveString),
    deletionProtection: S.optional(DeletionProtection),
    encryptionState: S.optional(EncryptionState),
    cedarVersion: S.optional(CedarVersion),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetPolicyStoreOutput",
}) as any as S.Schema<GetPolicyStoreOutput>;
export interface GetPolicyStoreAliasInput {
  aliasName: string;
}
export const GetPolicyStoreAliasInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ aliasName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetPolicyStoreAliasInput",
}) as any as S.Schema<GetPolicyStoreAliasInput>;
export type AliasState = "Active" | "PendingDeletion" | (string & {});
export const AliasState = S.String;

export interface GetPolicyStoreAliasOutput {
  aliasName: string;
  policyStoreId: string;
  aliasArn: string;
  createdAt: Date;
  state: AliasState;
}
export const GetPolicyStoreAliasOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    aliasName: S.String,
    policyStoreId: S.String,
    aliasArn: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    state: AliasState,
  }),
).annotate({
  identifier: "GetPolicyStoreAliasOutput",
}) as any as S.Schema<GetPolicyStoreAliasOutput>;
export interface GetPolicyTemplateInput {
  policyStoreId: string;
  policyTemplateId: string;
}
export const GetPolicyTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyStoreId: S.String, policyTemplateId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetPolicyTemplateInput",
}) as any as S.Schema<GetPolicyTemplateInput>;
export interface GetPolicyTemplateOutput {
  policyStoreId: string;
  policyTemplateId: string;
  description?: string | redacted.Redacted<string>;
  statement: string | redacted.Redacted<string>;
  createdDate: Date;
  lastUpdatedDate: Date;
  name?: string;
}
export const GetPolicyTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    policyTemplateId: S.String,
    description: S.optional(SensitiveString),
    statement: SensitiveString,
    createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    name: S.optional(S.String),
  }),
).annotate({
  identifier: "GetPolicyTemplateOutput",
}) as any as S.Schema<GetPolicyTemplateOutput>;
export interface GetSchemaInput {
  policyStoreId: string;
}
export const GetSchemaInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyStoreId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({ identifier: "GetSchemaInput" }) as any as S.Schema<GetSchemaInput>;
export type SchemaJson = string | redacted.Redacted<string>;
export type Namespace = string | redacted.Redacted<string>;
export type NamespaceList = (string | redacted.Redacted<string>)[];
export const NamespaceList = /*@__PURE__*/ S.Array(SensitiveString);
export interface GetSchemaOutput {
  policyStoreId: string;
  schema: string | redacted.Redacted<string>;
  createdDate: Date;
  lastUpdatedDate: Date;
  namespaces?: (string | redacted.Redacted<string>)[];
}
export const GetSchemaOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    schema: SensitiveString,
    createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    namespaces: S.optional(NamespaceList),
  }),
).annotate({
  identifier: "GetSchemaOutput",
}) as any as S.Schema<GetSchemaOutput>;
export interface IsAuthorizedInput {
  policyStoreId: string;
  principal?: EntityIdentifier;
  action?: ActionIdentifier;
  resource?: EntityIdentifier;
  context?: ContextDefinition;
  entities?: EntitiesDefinition;
}
export const IsAuthorizedInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    principal: S.optional(EntityIdentifier),
    action: S.optional(ActionIdentifier),
    resource: S.optional(EntityIdentifier),
    context: S.optional(ContextDefinition),
    entities: S.optional(EntitiesDefinition),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "IsAuthorizedInput",
}) as any as S.Schema<IsAuthorizedInput>;
export interface IsAuthorizedOutput {
  decision: Decision;
  determiningPolicies: DeterminingPolicyItem[];
  errors: EvaluationErrorItem[];
}
export const IsAuthorizedOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    decision: Decision,
    determiningPolicies: DeterminingPolicyList,
    errors: EvaluationErrorList,
  }),
).annotate({
  identifier: "IsAuthorizedOutput",
}) as any as S.Schema<IsAuthorizedOutput>;
export interface IsAuthorizedWithTokenInput {
  policyStoreId: string;
  identityToken?: string | redacted.Redacted<string>;
  accessToken?: string | redacted.Redacted<string>;
  action?: ActionIdentifier;
  resource?: EntityIdentifier;
  context?: ContextDefinition;
  entities?: EntitiesDefinition;
}
export const IsAuthorizedWithTokenInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    identityToken: S.optional(SensitiveString),
    accessToken: S.optional(SensitiveString),
    action: S.optional(ActionIdentifier),
    resource: S.optional(EntityIdentifier),
    context: S.optional(ContextDefinition),
    entities: S.optional(EntitiesDefinition),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "IsAuthorizedWithTokenInput",
}) as any as S.Schema<IsAuthorizedWithTokenInput>;
export interface IsAuthorizedWithTokenOutput {
  decision: Decision;
  determiningPolicies: DeterminingPolicyItem[];
  errors: EvaluationErrorItem[];
  principal?: EntityIdentifier;
}
export const IsAuthorizedWithTokenOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    decision: Decision,
    determiningPolicies: DeterminingPolicyList,
    errors: EvaluationErrorList,
    principal: S.optional(EntityIdentifier),
  }),
).annotate({
  identifier: "IsAuthorizedWithTokenOutput",
}) as any as S.Schema<IsAuthorizedWithTokenOutput>;
export type NextToken = string;
export type ListIdentitySourcesMaxResults = number;
export interface IdentitySourceFilter {
  principalEntityType?: string | redacted.Redacted<string>;
}
export const IdentitySourceFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ principalEntityType: S.optional(SensitiveString) }),
).annotate({
  identifier: "IdentitySourceFilter",
}) as any as S.Schema<IdentitySourceFilter>;
export type IdentitySourceFilters = IdentitySourceFilter[];
export const IdentitySourceFilters =
  /*@__PURE__*/ S.Array(IdentitySourceFilter);
export interface ListIdentitySourcesInput {
  policyStoreId: string;
  nextToken?: string;
  maxResults?: number;
  filters?: IdentitySourceFilter[];
}
export const ListIdentitySourcesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    filters: S.optional(IdentitySourceFilters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListIdentitySourcesInput",
}) as any as S.Schema<ListIdentitySourcesInput>;
export interface IdentitySourceItemDetails {
  clientIds?: (string | redacted.Redacted<string>)[];
  userPoolArn?: string;
  discoveryUrl?: string;
  openIdIssuer?: OpenIdIssuer;
}
export const IdentitySourceItemDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientIds: S.optional(ClientIds),
    userPoolArn: S.optional(S.String),
    discoveryUrl: S.optional(S.String),
    openIdIssuer: S.optional(OpenIdIssuer),
  }),
).annotate({
  identifier: "IdentitySourceItemDetails",
}) as any as S.Schema<IdentitySourceItemDetails>;
export interface CognitoGroupConfigurationItem {
  groupEntityType?: string | redacted.Redacted<string>;
}
export const CognitoGroupConfigurationItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ groupEntityType: S.optional(SensitiveString) }),
).annotate({
  identifier: "CognitoGroupConfigurationItem",
}) as any as S.Schema<CognitoGroupConfigurationItem>;
export interface CognitoUserPoolConfigurationItem {
  userPoolArn: string;
  clientIds: (string | redacted.Redacted<string>)[];
  issuer: string;
  groupConfiguration?: CognitoGroupConfigurationItem;
}
export const CognitoUserPoolConfigurationItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userPoolArn: S.String,
    clientIds: ClientIds,
    issuer: S.String,
    groupConfiguration: S.optional(CognitoGroupConfigurationItem),
  }),
).annotate({
  identifier: "CognitoUserPoolConfigurationItem",
}) as any as S.Schema<CognitoUserPoolConfigurationItem>;
export interface OpenIdConnectGroupConfigurationItem {
  groupClaim: string | redacted.Redacted<string>;
  groupEntityType: string | redacted.Redacted<string>;
}
export const OpenIdConnectGroupConfigurationItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ groupClaim: SensitiveString, groupEntityType: SensitiveString }),
).annotate({
  identifier: "OpenIdConnectGroupConfigurationItem",
}) as any as S.Schema<OpenIdConnectGroupConfigurationItem>;
export interface OpenIdConnectAccessTokenConfigurationItem {
  principalIdClaim?: string | redacted.Redacted<string>;
  audiences?: string[];
}
export const OpenIdConnectAccessTokenConfigurationItem =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      principalIdClaim: S.optional(SensitiveString),
      audiences: S.optional(Audiences),
    }),
  ).annotate({
    identifier: "OpenIdConnectAccessTokenConfigurationItem",
  }) as any as S.Schema<OpenIdConnectAccessTokenConfigurationItem>;
export interface OpenIdConnectIdentityTokenConfigurationItem {
  principalIdClaim?: string | redacted.Redacted<string>;
  clientIds?: (string | redacted.Redacted<string>)[];
}
export const OpenIdConnectIdentityTokenConfigurationItem =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      principalIdClaim: S.optional(SensitiveString),
      clientIds: S.optional(ClientIds),
    }),
  ).annotate({
    identifier: "OpenIdConnectIdentityTokenConfigurationItem",
  }) as any as S.Schema<OpenIdConnectIdentityTokenConfigurationItem>;
export type OpenIdConnectTokenSelectionItem =
  | {
      accessTokenOnly: OpenIdConnectAccessTokenConfigurationItem;
      identityTokenOnly?: never;
    }
  | {
      accessTokenOnly?: never;
      identityTokenOnly: OpenIdConnectIdentityTokenConfigurationItem;
    };
export const OpenIdConnectTokenSelectionItem = /*@__PURE__*/ S.Union([
  S.Struct({ accessTokenOnly: OpenIdConnectAccessTokenConfigurationItem }),
  S.Struct({ identityTokenOnly: OpenIdConnectIdentityTokenConfigurationItem }),
]);
export interface OpenIdConnectConfigurationItem {
  issuer: string;
  entityIdPrefix?: string | redacted.Redacted<string>;
  groupConfiguration?: OpenIdConnectGroupConfigurationItem;
  tokenSelection: OpenIdConnectTokenSelectionItem;
}
export const OpenIdConnectConfigurationItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    issuer: S.String,
    entityIdPrefix: S.optional(SensitiveString),
    groupConfiguration: S.optional(OpenIdConnectGroupConfigurationItem),
    tokenSelection: OpenIdConnectTokenSelectionItem,
  }),
).annotate({
  identifier: "OpenIdConnectConfigurationItem",
}) as any as S.Schema<OpenIdConnectConfigurationItem>;
export type ConfigurationItem =
  | {
      cognitoUserPoolConfiguration: CognitoUserPoolConfigurationItem;
      openIdConnectConfiguration?: never;
    }
  | {
      cognitoUserPoolConfiguration?: never;
      openIdConnectConfiguration: OpenIdConnectConfigurationItem;
    };
export const ConfigurationItem = /*@__PURE__*/ S.Union([
  S.Struct({ cognitoUserPoolConfiguration: CognitoUserPoolConfigurationItem }),
  S.Struct({ openIdConnectConfiguration: OpenIdConnectConfigurationItem }),
]);
export interface IdentitySourceItem {
  createdDate: Date;
  details?: IdentitySourceItemDetails;
  identitySourceId: string;
  lastUpdatedDate: Date;
  policyStoreId: string;
  principalEntityType: string | redacted.Redacted<string>;
  configuration?: ConfigurationItem;
}
export const IdentitySourceItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    details: S.optional(IdentitySourceItemDetails),
    identitySourceId: S.String,
    lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    policyStoreId: S.String,
    principalEntityType: SensitiveString,
    configuration: S.optional(ConfigurationItem),
  }),
).annotate({
  identifier: "IdentitySourceItem",
}) as any as S.Schema<IdentitySourceItem>;
export type IdentitySources = IdentitySourceItem[];
export const IdentitySources = /*@__PURE__*/ S.Array(IdentitySourceItem);
export interface ListIdentitySourcesOutput {
  nextToken?: string;
  identitySources: IdentitySourceItem[];
}
export const ListIdentitySourcesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    identitySources: IdentitySources,
  }),
).annotate({
  identifier: "ListIdentitySourcesOutput",
}) as any as S.Schema<ListIdentitySourcesOutput>;
export type MaxResults = number;
export type EntityReference =
  | { unspecified: boolean; identifier?: never }
  | { unspecified?: never; identifier: EntityIdentifier };
export const EntityReference = /*@__PURE__*/ S.Union([
  S.Struct({ unspecified: S.Boolean }),
  S.Struct({ identifier: EntityIdentifier }),
]);
export interface PolicyFilter {
  principal?: EntityReference;
  resource?: EntityReference;
  policyType?: PolicyType;
  policyTemplateId?: string;
}
export const PolicyFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    principal: S.optional(EntityReference),
    resource: S.optional(EntityReference),
    policyType: S.optional(PolicyType),
    policyTemplateId: S.optional(S.String),
  }),
).annotate({ identifier: "PolicyFilter" }) as any as S.Schema<PolicyFilter>;
export interface ListPoliciesInput {
  policyStoreId: string;
  nextToken?: string;
  maxResults?: number;
  filter?: PolicyFilter;
}
export const ListPoliciesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    filter: S.optional(PolicyFilter),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPoliciesInput",
}) as any as S.Schema<ListPoliciesInput>;
export interface StaticPolicyDefinitionItem {
  description?: string | redacted.Redacted<string>;
}
export const StaticPolicyDefinitionItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ description: S.optional(SensitiveString) }),
).annotate({
  identifier: "StaticPolicyDefinitionItem",
}) as any as S.Schema<StaticPolicyDefinitionItem>;
export interface TemplateLinkedPolicyDefinitionItem {
  policyTemplateId: string;
  principal?: EntityIdentifier;
  resource?: EntityIdentifier;
}
export const TemplateLinkedPolicyDefinitionItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyTemplateId: S.String,
    principal: S.optional(EntityIdentifier),
    resource: S.optional(EntityIdentifier),
  }),
).annotate({
  identifier: "TemplateLinkedPolicyDefinitionItem",
}) as any as S.Schema<TemplateLinkedPolicyDefinitionItem>;
export type PolicyDefinitionItem =
  | { static: StaticPolicyDefinitionItem; templateLinked?: never }
  | { static?: never; templateLinked: TemplateLinkedPolicyDefinitionItem };
export const PolicyDefinitionItem = /*@__PURE__*/ S.Union([
  S.Struct({ static: StaticPolicyDefinitionItem }),
  S.Struct({ templateLinked: TemplateLinkedPolicyDefinitionItem }),
]);
export interface PolicyItem {
  policyStoreId: string;
  policyId: string;
  policyType: PolicyType;
  principal?: EntityIdentifier;
  resource?: EntityIdentifier;
  actions?: ActionIdentifier[];
  definition: PolicyDefinitionItem;
  createdDate: Date;
  lastUpdatedDate: Date;
  effect?: PolicyEffect;
  name?: string;
}
export const PolicyItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    policyId: S.String,
    policyType: PolicyType,
    principal: S.optional(EntityIdentifier),
    resource: S.optional(EntityIdentifier),
    actions: S.optional(ActionIdentifierList),
    definition: PolicyDefinitionItem,
    createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    effect: S.optional(PolicyEffect),
    name: S.optional(S.String),
  }),
).annotate({ identifier: "PolicyItem" }) as any as S.Schema<PolicyItem>;
export type PolicyList = PolicyItem[];
export const PolicyList = /*@__PURE__*/ S.Array(PolicyItem);
export interface ListPoliciesOutput {
  nextToken?: string;
  policies: PolicyItem[];
}
export const ListPoliciesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), policies: PolicyList }),
).annotate({
  identifier: "ListPoliciesOutput",
}) as any as S.Schema<ListPoliciesOutput>;
export interface PolicyStoreAliasFilter {
  policyStoreId?: string;
}
export const PolicyStoreAliasFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyStoreId: S.optional(S.String) }),
).annotate({
  identifier: "PolicyStoreAliasFilter",
}) as any as S.Schema<PolicyStoreAliasFilter>;
export interface ListPolicyStoreAliasesInput {
  nextToken?: string;
  maxResults?: number;
  filter?: PolicyStoreAliasFilter;
}
export const ListPolicyStoreAliasesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    filter: S.optional(PolicyStoreAliasFilter),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPolicyStoreAliasesInput",
}) as any as S.Schema<ListPolicyStoreAliasesInput>;
export interface PolicyStoreAliasItem {
  aliasName: string;
  policyStoreId: string;
  aliasArn: string;
  createdAt: Date;
  state: AliasState;
}
export const PolicyStoreAliasItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    aliasName: S.String,
    policyStoreId: S.String,
    aliasArn: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    state: AliasState,
  }),
).annotate({
  identifier: "PolicyStoreAliasItem",
}) as any as S.Schema<PolicyStoreAliasItem>;
export type PolicyStoreAliasList = PolicyStoreAliasItem[];
export const PolicyStoreAliasList = /*@__PURE__*/ S.Array(PolicyStoreAliasItem);
export interface ListPolicyStoreAliasesOutput {
  nextToken?: string;
  policyStoreAliases: PolicyStoreAliasItem[];
}
export const ListPolicyStoreAliasesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    policyStoreAliases: PolicyStoreAliasList,
  }),
).annotate({
  identifier: "ListPolicyStoreAliasesOutput",
}) as any as S.Schema<ListPolicyStoreAliasesOutput>;
export interface ListPolicyStoresInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListPolicyStoresInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPolicyStoresInput",
}) as any as S.Schema<ListPolicyStoresInput>;
export interface PolicyStoreItem {
  policyStoreId: string;
  arn: string;
  createdDate: Date;
  lastUpdatedDate?: Date;
  description?: string | redacted.Redacted<string>;
}
export const PolicyStoreItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    arn: S.String,
    createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    description: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "PolicyStoreItem",
}) as any as S.Schema<PolicyStoreItem>;
export type PolicyStoreList = PolicyStoreItem[];
export const PolicyStoreList = /*@__PURE__*/ S.Array(PolicyStoreItem);
export interface ListPolicyStoresOutput {
  nextToken?: string;
  policyStores: PolicyStoreItem[];
}
export const ListPolicyStoresOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), policyStores: PolicyStoreList }),
).annotate({
  identifier: "ListPolicyStoresOutput",
}) as any as S.Schema<ListPolicyStoresOutput>;
export interface ListPolicyTemplatesInput {
  policyStoreId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListPolicyTemplatesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPolicyTemplatesInput",
}) as any as S.Schema<ListPolicyTemplatesInput>;
export interface PolicyTemplateItem {
  policyStoreId: string;
  policyTemplateId: string;
  description?: string | redacted.Redacted<string>;
  createdDate: Date;
  lastUpdatedDate: Date;
  name?: string;
}
export const PolicyTemplateItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    policyTemplateId: S.String,
    description: S.optional(SensitiveString),
    createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    name: S.optional(S.String),
  }),
).annotate({
  identifier: "PolicyTemplateItem",
}) as any as S.Schema<PolicyTemplateItem>;
export type PolicyTemplatesList = PolicyTemplateItem[];
export const PolicyTemplatesList = /*@__PURE__*/ S.Array(PolicyTemplateItem);
export interface ListPolicyTemplatesOutput {
  nextToken?: string;
  policyTemplates: PolicyTemplateItem[];
}
export const ListPolicyTemplatesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    policyTemplates: PolicyTemplatesList,
  }),
).annotate({
  identifier: "ListPolicyTemplatesOutput",
}) as any as S.Schema<ListPolicyTemplatesOutput>;
export type AmazonResourceName = string;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export type SchemaDefinition = {
  cedarJson: string | redacted.Redacted<string>;
};
export const SchemaDefinition = /*@__PURE__*/ S.Union([
  S.Struct({ cedarJson: SensitiveString }),
]);
export interface PutSchemaInput {
  policyStoreId: string;
  definition: SchemaDefinition;
}
export const PutSchemaInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyStoreId: S.String, definition: SchemaDefinition }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({ identifier: "PutSchemaInput" }) as any as S.Schema<PutSchemaInput>;
export interface PutSchemaOutput {
  policyStoreId: string;
  namespaces: (string | redacted.Redacted<string>)[];
  createdDate: Date;
  lastUpdatedDate: Date;
}
export const PutSchemaOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    namespaces: NamespaceList,
    createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "PutSchemaOutput",
}) as any as S.Schema<PutSchemaOutput>;
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: TagMap }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tagKeys: TagKeyList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
export interface UpdateCognitoGroupConfiguration {
  groupEntityType: string | redacted.Redacted<string>;
}
export const UpdateCognitoGroupConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ groupEntityType: SensitiveString }),
).annotate({
  identifier: "UpdateCognitoGroupConfiguration",
}) as any as S.Schema<UpdateCognitoGroupConfiguration>;
export interface UpdateCognitoUserPoolConfiguration {
  userPoolArn: string;
  clientIds?: (string | redacted.Redacted<string>)[];
  groupConfiguration?: UpdateCognitoGroupConfiguration;
}
export const UpdateCognitoUserPoolConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userPoolArn: S.String,
    clientIds: S.optional(ClientIds),
    groupConfiguration: S.optional(UpdateCognitoGroupConfiguration),
  }),
).annotate({
  identifier: "UpdateCognitoUserPoolConfiguration",
}) as any as S.Schema<UpdateCognitoUserPoolConfiguration>;
export interface UpdateOpenIdConnectGroupConfiguration {
  groupClaim: string | redacted.Redacted<string>;
  groupEntityType: string | redacted.Redacted<string>;
}
export const UpdateOpenIdConnectGroupConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ groupClaim: SensitiveString, groupEntityType: SensitiveString }),
).annotate({
  identifier: "UpdateOpenIdConnectGroupConfiguration",
}) as any as S.Schema<UpdateOpenIdConnectGroupConfiguration>;
export interface UpdateOpenIdConnectAccessTokenConfiguration {
  principalIdClaim?: string | redacted.Redacted<string>;
  audiences?: string[];
}
export const UpdateOpenIdConnectAccessTokenConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      principalIdClaim: S.optional(SensitiveString),
      audiences: S.optional(Audiences),
    }),
  ).annotate({
    identifier: "UpdateOpenIdConnectAccessTokenConfiguration",
  }) as any as S.Schema<UpdateOpenIdConnectAccessTokenConfiguration>;
export interface UpdateOpenIdConnectIdentityTokenConfiguration {
  principalIdClaim?: string | redacted.Redacted<string>;
  clientIds?: (string | redacted.Redacted<string>)[];
}
export const UpdateOpenIdConnectIdentityTokenConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      principalIdClaim: S.optional(SensitiveString),
      clientIds: S.optional(ClientIds),
    }),
  ).annotate({
    identifier: "UpdateOpenIdConnectIdentityTokenConfiguration",
  }) as any as S.Schema<UpdateOpenIdConnectIdentityTokenConfiguration>;
export type UpdateOpenIdConnectTokenSelection =
  | {
      accessTokenOnly: UpdateOpenIdConnectAccessTokenConfiguration;
      identityTokenOnly?: never;
    }
  | {
      accessTokenOnly?: never;
      identityTokenOnly: UpdateOpenIdConnectIdentityTokenConfiguration;
    };
export const UpdateOpenIdConnectTokenSelection = /*@__PURE__*/ S.Union([
  S.Struct({ accessTokenOnly: UpdateOpenIdConnectAccessTokenConfiguration }),
  S.Struct({
    identityTokenOnly: UpdateOpenIdConnectIdentityTokenConfiguration,
  }),
]);
export interface UpdateOpenIdConnectConfiguration {
  issuer: string;
  entityIdPrefix?: string | redacted.Redacted<string>;
  groupConfiguration?: UpdateOpenIdConnectGroupConfiguration;
  tokenSelection: UpdateOpenIdConnectTokenSelection;
}
export const UpdateOpenIdConnectConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    issuer: S.String,
    entityIdPrefix: S.optional(SensitiveString),
    groupConfiguration: S.optional(UpdateOpenIdConnectGroupConfiguration),
    tokenSelection: UpdateOpenIdConnectTokenSelection,
  }),
).annotate({
  identifier: "UpdateOpenIdConnectConfiguration",
}) as any as S.Schema<UpdateOpenIdConnectConfiguration>;
export type UpdateConfiguration =
  | {
      cognitoUserPoolConfiguration: UpdateCognitoUserPoolConfiguration;
      openIdConnectConfiguration?: never;
    }
  | {
      cognitoUserPoolConfiguration?: never;
      openIdConnectConfiguration: UpdateOpenIdConnectConfiguration;
    };
export const UpdateConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({
    cognitoUserPoolConfiguration: UpdateCognitoUserPoolConfiguration,
  }),
  S.Struct({ openIdConnectConfiguration: UpdateOpenIdConnectConfiguration }),
]);
export interface UpdateIdentitySourceInput {
  policyStoreId: string;
  identitySourceId: string;
  updateConfiguration: UpdateConfiguration;
  principalEntityType?: string | redacted.Redacted<string>;
}
export const UpdateIdentitySourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    identitySourceId: S.String,
    updateConfiguration: UpdateConfiguration,
    principalEntityType: S.optional(SensitiveString),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateIdentitySourceInput",
}) as any as S.Schema<UpdateIdentitySourceInput>;
export interface UpdateIdentitySourceOutput {
  createdDate: Date;
  identitySourceId: string;
  lastUpdatedDate: Date;
  policyStoreId: string;
}
export const UpdateIdentitySourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    identitySourceId: S.String,
    lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    policyStoreId: S.String,
  }),
).annotate({
  identifier: "UpdateIdentitySourceOutput",
}) as any as S.Schema<UpdateIdentitySourceOutput>;
export interface UpdateStaticPolicyDefinition {
  description?: string | redacted.Redacted<string>;
  statement: string | redacted.Redacted<string>;
}
export const UpdateStaticPolicyDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(SensitiveString),
    statement: SensitiveString,
  }),
).annotate({
  identifier: "UpdateStaticPolicyDefinition",
}) as any as S.Schema<UpdateStaticPolicyDefinition>;
export type UpdatePolicyDefinition = { static: UpdateStaticPolicyDefinition };
export const UpdatePolicyDefinition = /*@__PURE__*/ S.Union([
  S.Struct({ static: UpdateStaticPolicyDefinition }),
]);
export interface UpdatePolicyInput {
  policyStoreId: string;
  policyId: string;
  definition?: UpdatePolicyDefinition;
  name?: string;
}
export const UpdatePolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    policyId: S.String,
    definition: S.optional(UpdatePolicyDefinition),
    name: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdatePolicyInput",
}) as any as S.Schema<UpdatePolicyInput>;
export interface UpdatePolicyOutput {
  policyStoreId: string;
  policyId: string;
  policyType: PolicyType;
  principal?: EntityIdentifier;
  resource?: EntityIdentifier;
  actions?: ActionIdentifier[];
  createdDate: Date;
  lastUpdatedDate: Date;
  effect?: PolicyEffect;
}
export const UpdatePolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    policyId: S.String,
    policyType: PolicyType,
    principal: S.optional(EntityIdentifier),
    resource: S.optional(EntityIdentifier),
    actions: S.optional(ActionIdentifierList),
    createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    effect: S.optional(PolicyEffect),
  }),
).annotate({
  identifier: "UpdatePolicyOutput",
}) as any as S.Schema<UpdatePolicyOutput>;
export interface UpdatePolicyStoreInput {
  policyStoreId: string;
  validationSettings: ValidationSettings;
  deletionProtection?: DeletionProtection;
  description?: string | redacted.Redacted<string>;
}
export const UpdatePolicyStoreInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    validationSettings: ValidationSettings,
    deletionProtection: S.optional(DeletionProtection),
    description: S.optional(SensitiveString),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdatePolicyStoreInput",
}) as any as S.Schema<UpdatePolicyStoreInput>;
export interface UpdatePolicyStoreOutput {
  policyStoreId: string;
  arn: string;
  createdDate: Date;
  lastUpdatedDate: Date;
}
export const UpdatePolicyStoreOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    arn: S.String,
    createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdatePolicyStoreOutput",
}) as any as S.Schema<UpdatePolicyStoreOutput>;
export interface UpdatePolicyTemplateInput {
  policyStoreId: string;
  policyTemplateId: string;
  description?: string | redacted.Redacted<string>;
  statement: string | redacted.Redacted<string>;
  name?: string;
}
export const UpdatePolicyTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    policyTemplateId: S.String,
    description: S.optional(SensitiveString),
    statement: SensitiveString,
    name: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdatePolicyTemplateInput",
}) as any as S.Schema<UpdatePolicyTemplateInput>;
export interface UpdatePolicyTemplateOutput {
  policyStoreId: string;
  policyTemplateId: string;
  createdDate: Date;
  lastUpdatedDate: Date;
}
export const UpdatePolicyTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyStoreId: S.String,
    policyTemplateId: S.String,
    createdDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastUpdatedDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "UpdatePolicyTemplateOutput",
}) as any as S.Schema<UpdatePolicyTemplateOutput>;
export type ResourceType =
  | "IDENTITY_SOURCE"
  | "POLICY_STORE"
  | "POLICY"
  | "POLICY_TEMPLATE"
  | "SCHEMA"
  | "POLICY_STORE_ALIAS"
  | (string & {});
export const ResourceType = S.String;

export interface ResourceConflict {
  resourceId: string;
  resourceType: ResourceType;
}
export const ResourceConflict = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceId: S.String, resourceType: ResourceType }),
).annotate({
  identifier: "ResourceConflict",
}) as any as S.Schema<ResourceConflict>;
export type ResourceConflictList = ResourceConflict[];
export const ResourceConflictList = /*@__PURE__*/ S.Array(ResourceConflict);
export type BatchGetPolicyError = ValidationException | CommonErrors;
/**
 * Retrieves information about a group (batch) of policies.
 *
 * The `BatchGetPolicy` operation doesn't have its own IAM permission. To authorize this operation for Amazon Web Services principals, include the permission `verifiedpermissions:GetPolicy` in their IAM policies.
 */
export const batchGetPolicy: API.OperationMethod<
  BatchGetPolicyInput,
  BatchGetPolicyOutput,
  BatchGetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetPolicyInput,
  output: BatchGetPolicyOutput,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetPolicy",
}));

export type BatchIsAuthorizedError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Makes a series of decisions about multiple authorization requests for one principal or resource. Each request contains the equivalent content of an `IsAuthorized` request: principal, action, resource, and context. Either the `principal` or the `resource` parameter must be identical across all requests. For example, Verified Permissions won't evaluate a pair of requests where `bob` views `photo1` and `alice` views `photo2`. Authorization of `bob` to view `photo1` and `photo2`, or `bob` and `alice` to view `photo1`, are valid batches.
 *
 * The request is evaluated against all policies in the specified policy store that match the entities that you declare. The result of the decisions is a series of `Allow` or `Deny` responses, along with the IDs of the policies that produced each decision.
 *
 * The `entities` of a `BatchIsAuthorized` API request can contain up to 100 principals and up to 100 resources. The `requests` of a `BatchIsAuthorized` API request can contain up to 30 requests.
 *
 * The `BatchIsAuthorized` operation doesn't have its own IAM permission. To authorize this operation for Amazon Web Services principals, include the permission `verifiedpermissions:IsAuthorized` in their IAM policies.
 */
export const batchIsAuthorized: API.OperationMethod<
  BatchIsAuthorizedInput,
  BatchIsAuthorizedOutput,
  BatchIsAuthorizedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchIsAuthorizedInput,
  output: BatchIsAuthorizedOutput,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchIsAuthorized",
}));

export type BatchIsAuthorizedWithTokenError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Makes a series of decisions about multiple authorization requests for one token. The principal in this request comes from an external identity source in the form of an identity or access token, formatted as a JSON web token (JWT). The information in the parameters can also define additional context that Verified Permissions can include in the evaluations.
 *
 * The request is evaluated against all policies in the specified policy store that match the entities that you provide in the entities declaration and in the token. The result of the decisions is a series of `Allow` or `Deny` responses, along with the IDs of the policies that produced each decision.
 *
 * The `entities` of a `BatchIsAuthorizedWithToken` API request can contain up to 100 resources and up to 99 user groups. The `requests` of a `BatchIsAuthorizedWithToken` API request can contain up to 30 requests.
 *
 * The `BatchIsAuthorizedWithToken` operation doesn't have its own IAM permission. To authorize this operation for Amazon Web Services principals, include the permission `verifiedpermissions:IsAuthorizedWithToken` in their IAM policies.
 */
export const batchIsAuthorizedWithToken: API.OperationMethod<
  BatchIsAuthorizedWithTokenInput,
  BatchIsAuthorizedWithTokenOutput,
  BatchIsAuthorizedWithTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchIsAuthorizedWithTokenInput,
  output: BatchIsAuthorizedWithTokenOutput,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchIsAuthorizedWithToken",
}));

export type CreateIdentitySourceError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Adds an identity source to a policy store–an Amazon Cognito user pool or OpenID Connect (OIDC) identity provider (IdP).
 *
 * After you create an identity source, you can use the identities provided by the IdP as proxies for the principal in authorization queries that use the IsAuthorizedWithToken or BatchIsAuthorizedWithToken API operations. These identities take the form of tokens that contain claims about the user, such as IDs, attributes and group memberships. Identity sources provide identity (ID) tokens and access tokens. Verified Permissions derives information about your user and session from token claims. Access tokens provide action `context` to your policies, and ID tokens provide principal `Attributes`.
 *
 * Tokens from an identity source user continue to be usable until they expire. Token revocation and resource deletion have no effect on the validity of a token in your policy store
 *
 * To reference a user from this identity source in your Cedar policies, refer to the following syntax examples.
 *
 * - Amazon Cognito user pool: `Namespace::[Entity type]::[User pool ID]|[user principal attribute]`, for example `MyCorp::User::us-east-1_EXAMPLE|a1b2c3d4-5678-90ab-cdef-EXAMPLE11111`.
 *
 * - OpenID Connect (OIDC) provider: `Namespace::[Entity type]::[entityIdPrefix]|[user principal attribute]`, for example `MyCorp::User::MyOIDCProvider|a1b2c3d4-5678-90ab-cdef-EXAMPLE22222`.
 *
 * Verified Permissions is * eventually consistent *. It can take a few seconds for a new or changed element to propagate through the service and be visible in the results of other Verified Permissions operations.
 */
export const createIdentitySource: API.OperationMethod<
  CreateIdentitySourceInput,
  CreateIdentitySourceOutput,
  CreateIdentitySourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIdentitySourceInput,
  output: CreateIdentitySourceOutput,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIdentitySource",
}));

export type CreatePolicyError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Cedar policy and saves it in the specified policy store. You can create either a static policy or a policy linked to a policy template.
 *
 * - To create a static policy, provide the Cedar policy text in the `StaticPolicy` section of the `PolicyDefinition`.
 *
 * - To create a policy that is dynamically linked to a policy template, specify the policy template ID and the principal and resource to associate with this policy in the `templateLinked` section of the `PolicyDefinition`. If the policy template is ever updated, any policies linked to the policy template automatically use the updated template.
 *
 * Creating a policy causes it to be validated against the schema in the policy store. If the policy doesn't pass validation, the operation fails and the policy isn't stored.
 *
 * Verified Permissions is * eventually consistent *. It can take a few seconds for a new or changed element to propagate through the service and be visible in the results of other Verified Permissions operations.
 */
export const createPolicy: API.OperationMethod<
  CreatePolicyInput,
  CreatePolicyOutput,
  CreatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePolicyInput,
  output: CreatePolicyOutput,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicy",
}));

export type CreatePolicyStoreError =
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a policy store. A policy store is a container for policy resources.
 *
 * As of May 2026, Verified Permissions has aligned with Cedar and now supports multiple namespaces.
 *
 * Verified Permissions is * eventually consistent *. It can take a few seconds for a new or changed element to propagate through the service and be visible in the results of other Verified Permissions operations.
 */
export const createPolicyStore: API.OperationMethod<
  CreatePolicyStoreInput,
  CreatePolicyStoreOutput,
  CreatePolicyStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePolicyStoreInput,
  output: CreatePolicyStoreOutput,
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicyStore",
}));

export type CreatePolicyStoreAliasError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a policy store alias for the specified policy store. A policy store alias is an alternative identifier that you can use to reference a policy store in API operations.
 *
 * This operation is idempotent. If multiple CreatePolicyStoreAlias requests are made where the `aliasName` and `policyStoreId` fields are the same between the requests, subsequent requests will be ignored. For each duplicate CreatePolicyStoreAlias request, a Success response will be returned and a new policy store alias will not be created.
 *
 * Verified Permissions is * eventually consistent *. It can take a few seconds for a new or changed element to propagate through the service and be visible in the results of other Verified Permissions operations.
 */
export const createPolicyStoreAlias: API.OperationMethod<
  CreatePolicyStoreAliasInput,
  CreatePolicyStoreAliasOutput,
  CreatePolicyStoreAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePolicyStoreAliasInput,
  output: CreatePolicyStoreAliasOutput,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicyStoreAlias",
}));

export type CreatePolicyTemplateError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a policy template. A template can use placeholders for the principal and resource. A template must be instantiated into a policy by associating it with specific principals and resources to use for the placeholders. That instantiated policy can then be considered in authorization decisions. The instantiated policy works identically to any other policy, except that it is dynamically linked to the template. If the template changes, then any policies that are linked to that template are immediately updated as well.
 *
 * Verified Permissions is * eventually consistent *. It can take a few seconds for a new or changed element to propagate through the service and be visible in the results of other Verified Permissions operations.
 */
export const createPolicyTemplate: API.OperationMethod<
  CreatePolicyTemplateInput,
  CreatePolicyTemplateOutput,
  CreatePolicyTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePolicyTemplateInput,
  output: CreatePolicyTemplateOutput,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicyTemplate",
}));

export type DeleteIdentitySourceError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an identity source that references an identity provider (IdP) such as Amazon Cognito. After you delete the identity source, you can no longer use tokens for identities from that identity source to represent principals in authorization queries made using IsAuthorizedWithToken. operations.
 */
export const deleteIdentitySource: API.OperationMethod<
  DeleteIdentitySourceInput,
  DeleteIdentitySourceOutput,
  DeleteIdentitySourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIdentitySourceInput,
  output: DeleteIdentitySourceOutput,
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentitySource",
}));

export type DeletePolicyError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified policy from the policy store.
 *
 * This operation is idempotent; if you specify a policy that doesn't exist, the request response returns a successful `HTTP 200` status code.
 */
export const deletePolicy: API.OperationMethod<
  DeletePolicyInput,
  DeletePolicyOutput,
  DeletePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePolicyInput,
  output: DeletePolicyOutput,
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicy",
}));

export type DeletePolicyStoreError = InvalidStateException | CommonErrors;
/**
 * Deletes the specified policy store.
 *
 * This operation is idempotent. If you specify a policy store that does not exist, the request response will still return a successful HTTP 200 status code.
 */
export const deletePolicyStore: API.OperationMethod<
  DeletePolicyStoreInput,
  DeletePolicyStoreOutput,
  DeletePolicyStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePolicyStoreInput,
  output: DeletePolicyStoreOutput,
  errors: [InvalidStateException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicyStore",
}));

export type DeletePolicyStoreAliasError =
  | InvalidStateException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified policy store alias.
 *
 * This operation is idempotent. If you specify a policy store alias that does not exist, the request response will still return a successful HTTP 200 status code.
 *
 * By default, when a policy store alias is deleted, it enters the `PendingDeletion` state. When a policy store alias is in the `PendingDeletion` state, new policy store aliases cannot be created with the same name. If the policy store alias is used in an API that has a `policyStoreId` field, the operation will fail with a `ResourceNotFound` exception.
 *
 * To immediately delete a policy store alias and bypass the `PendingDeletion` state, set the `deletionMode` parameter to `HardDelete`.
 *
 * Verified Permissions is eventually consistent. If you hard delete a policy store alias and then immediately recreate it to be associated with a different policy store, requests that reference this alias may continue to be evaluated against the previously associated policy store for a short period of time.
 */
export const deletePolicyStoreAlias: API.OperationMethod<
  DeletePolicyStoreAliasInput,
  DeletePolicyStoreAliasOutput,
  DeletePolicyStoreAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePolicyStoreAliasInput,
  output: DeletePolicyStoreAliasOutput,
  errors: [
    InvalidStateException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicyStoreAlias",
}));

export type DeletePolicyTemplateError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified policy template from the policy store.
 *
 * This operation also deletes any policies that were created from the specified policy template. Those policies are immediately removed from all future API responses, and are asynchronously deleted from the policy store.
 */
export const deletePolicyTemplate: API.OperationMethod<
  DeletePolicyTemplateInput,
  DeletePolicyTemplateOutput,
  DeletePolicyTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePolicyTemplateInput,
  output: DeletePolicyTemplateOutput,
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicyTemplate",
}));

export type GetIdentitySourceError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves the details about the specified identity source.
 */
export const getIdentitySource: API.OperationMethod<
  GetIdentitySourceInput,
  GetIdentitySourceOutput,
  GetIdentitySourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIdentitySourceInput,
  output: GetIdentitySourceOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentitySource",
}));

export type GetPolicyError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified policy.
 */
export const getPolicy: API.OperationMethod<
  GetPolicyInput,
  GetPolicyOutput,
  GetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPolicyInput,
  output: GetPolicyOutput,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
}));

export type GetPolicyStoreError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a policy store.
 */
export const getPolicyStore: API.OperationMethod<
  GetPolicyStoreInput,
  GetPolicyStoreOutput,
  GetPolicyStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPolicyStoreInput,
  output: GetPolicyStoreOutput,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicyStore",
}));

export type GetPolicyStoreAliasError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves details about the specified policy store alias.
 */
export const getPolicyStoreAlias: API.OperationMethod<
  GetPolicyStoreAliasInput,
  GetPolicyStoreAliasOutput,
  GetPolicyStoreAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPolicyStoreAliasInput,
  output: GetPolicyStoreAliasOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicyStoreAlias",
}));

export type GetPolicyTemplateError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieve the details for the specified policy template in the specified policy store.
 */
export const getPolicyTemplate: API.OperationMethod<
  GetPolicyTemplateInput,
  GetPolicyTemplateOutput,
  GetPolicyTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPolicyTemplateInput,
  output: GetPolicyTemplateOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicyTemplate",
}));

export type GetSchemaError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieve the details for the specified schema in the specified policy store.
 */
export const getSchema: API.OperationMethod<
  GetSchemaInput,
  GetSchemaOutput,
  GetSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSchemaInput,
  output: GetSchemaOutput,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchema",
}));

export type IsAuthorizedError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Makes an authorization decision about a service request described in the parameters. The information in the parameters can also define additional context that Verified Permissions can include in the evaluation. The request is evaluated against all matching policies in the specified policy store. The result of the decision is either `Allow` or `Deny`, along with a list of the policies that resulted in the decision.
 */
export const isAuthorized: API.OperationMethod<
  IsAuthorizedInput,
  IsAuthorizedOutput,
  IsAuthorizedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: IsAuthorizedInput,
  output: IsAuthorizedOutput,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IsAuthorized",
}));

export type IsAuthorizedWithTokenError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Makes an authorization decision about a service request described in the parameters. The principal in this request comes from an external identity source in the form of an identity token formatted as a JSON web token (JWT). The information in the parameters can also define additional context that Verified Permissions can include in the evaluation. The request is evaluated against all matching policies in the specified policy store. The result of the decision is either `Allow` or `Deny`, along with a list of the policies that resulted in the decision.
 *
 * Verified Permissions validates each token that is specified in a request by checking its expiration date and its signature.
 *
 * Tokens from an identity source user continue to be usable until they expire. Token revocation and resource deletion have no effect on the validity of a token in your policy store
 */
export const isAuthorizedWithToken: API.OperationMethod<
  IsAuthorizedWithTokenInput,
  IsAuthorizedWithTokenOutput,
  IsAuthorizedWithTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: IsAuthorizedWithTokenInput,
  output: IsAuthorizedWithTokenOutput,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IsAuthorizedWithToken",
}));

export type ListIdentitySourcesError = ResourceNotFoundException | CommonErrors;
/**
 * Returns a paginated list of all of the identity sources defined in the specified policy store.
 */
export const listIdentitySources: API.PaginatedOperationMethod<
  ListIdentitySourcesInput,
  ListIdentitySourcesOutput,
  ListIdentitySourcesError,
  Credentials | HttpClient.HttpClient,
  IdentitySourceItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIdentitySourcesInput,
  output: ListIdentitySourcesOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentitySources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "identitySources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPoliciesError = ResourceNotFoundException | CommonErrors;
/**
 * Returns a paginated list of all policies stored in the specified policy store.
 */
export const listPolicies: API.PaginatedOperationMethod<
  ListPoliciesInput,
  ListPoliciesOutput,
  ListPoliciesError,
  Credentials | HttpClient.HttpClient,
  PolicyItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPoliciesInput,
  output: ListPoliciesOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policies",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicyStoreAliasesError = CommonErrors;
/**
 * Returns a paginated list of all policy store aliases in the calling Amazon Web Services account.
 */
export const listPolicyStoreAliases: API.PaginatedOperationMethod<
  ListPolicyStoreAliasesInput,
  ListPolicyStoreAliasesOutput,
  ListPolicyStoreAliasesError,
  Credentials | HttpClient.HttpClient,
  PolicyStoreAliasItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPolicyStoreAliasesInput,
  output: ListPolicyStoreAliasesOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyStoreAliases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policyStoreAliases",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicyStoresError = CommonErrors;
/**
 * Returns a paginated list of all policy stores in the calling Amazon Web Services account.
 */
export const listPolicyStores: API.PaginatedOperationMethod<
  ListPolicyStoresInput,
  ListPolicyStoresOutput,
  ListPolicyStoresError,
  Credentials | HttpClient.HttpClient,
  PolicyStoreItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPolicyStoresInput,
  output: ListPolicyStoresOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyStores",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policyStores",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicyTemplatesError = ResourceNotFoundException | CommonErrors;
/**
 * Returns a paginated list of all policy templates in the specified policy store.
 */
export const listPolicyTemplates: API.PaginatedOperationMethod<
  ListPolicyTemplatesInput,
  ListPolicyTemplatesOutput,
  ListPolicyTemplatesError,
  Credentials | HttpClient.HttpClient,
  PolicyTemplateItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPolicyTemplatesInput,
  output: ListPolicyTemplatesOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policyTemplates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the tags associated with the specified Amazon Verified Permissions resource. In Verified Permissions, policy stores can be tagged.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutSchemaError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates the policy schema in the specified policy store. The schema is used to validate any Cedar policies and policy templates submitted to the policy store. Any changes to the schema validate only policies and templates submitted after the schema change. Existing policies and templates are not re-evaluated against the changed schema. If you later update a policy, then it is evaluated against the new schema at that time.
 *
 * Verified Permissions is * eventually consistent *. It can take a few seconds for a new or changed element to propagate through the service and be visible in the results of other Verified Permissions operations.
 */
export const putSchema: API.OperationMethod<
  PutSchemaInput,
  PutSchemaOutput,
  PutSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutSchemaInput,
  output: PutSchemaOutput,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSchema",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyTagsException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified Amazon Verified Permissions resource. Tags can help you organize and categorize your resources. You can also use them to scope user permissions by granting a user permission to access or change only resources with certain tag values. In Verified Permissions, policy stores can be tagged.
 *
 * Tags don't have any semantic meaning to Amazon Web Services and are interpreted strictly as strings of characters.
 *
 * You can use the TagResource action with a resource that already has tags. If you specify a new tag key, this tag is appended to the list of tags associated with the resource. If you specify a tag key that is already associated with the resource, the new tag value that you specify replaces the previous value for that tag.
 *
 * You can associate as many as 50 tags with a resource.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyTagsException,
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
  | CommonErrors;
/**
 * Removes one or more tags from the specified Amazon Verified Permissions resource. In Verified Permissions, policy stores can be tagged.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateIdentitySourceError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified identity source to use a new identity provider (IdP), or to change the mapping of identities from the IdP to a different principal entity type.
 *
 * Verified Permissions is * eventually consistent *. It can take a few seconds for a new or changed element to propagate through the service and be visible in the results of other Verified Permissions operations.
 */
export const updateIdentitySource: API.OperationMethod<
  UpdateIdentitySourceInput,
  UpdateIdentitySourceOutput,
  UpdateIdentitySourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIdentitySourceInput,
  output: UpdateIdentitySourceOutput,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIdentitySource",
}));

export type UpdatePolicyError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Modifies a Cedar static policy in the specified policy store. You can change only certain elements of the UpdatePolicyDefinition parameter. You can directly update only static policies. To change a template-linked policy, you must update the template instead, using UpdatePolicyTemplate.
 *
 * - If policy validation is enabled in the policy store, then updating a static policy causes Verified Permissions to validate the policy against the schema in the policy store. If the updated static policy doesn't pass validation, the operation fails and the update isn't stored.
 *
 * - When you edit a static policy, you can change only certain elements of a static policy:
 *
 * - The action referenced by the policy.
 *
 * - A condition clause, such as when and unless.
 *
 * You can't change these elements of a static policy:
 *
 * - Changing a policy from a static policy to a template-linked policy.
 *
 * - Changing the effect of a static policy from permit or forbid.
 *
 * - The principal referenced by a static policy.
 *
 * - The resource referenced by a static policy.
 *
 * - To update a template-linked policy, you must update the template instead.
 *
 * Verified Permissions is * eventually consistent *. It can take a few seconds for a new or changed element to propagate through the service and be visible in the results of other Verified Permissions operations.
 */
export const updatePolicy: API.OperationMethod<
  UpdatePolicyInput,
  UpdatePolicyOutput,
  UpdatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePolicyInput,
  output: UpdatePolicyOutput,
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePolicy",
}));

export type UpdatePolicyStoreError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Modifies the validation setting for a policy store.
 *
 * Verified Permissions is * eventually consistent *. It can take a few seconds for a new or changed element to propagate through the service and be visible in the results of other Verified Permissions operations.
 */
export const updatePolicyStore: API.OperationMethod<
  UpdatePolicyStoreInput,
  UpdatePolicyStoreOutput,
  UpdatePolicyStoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePolicyStoreInput,
  output: UpdatePolicyStoreOutput,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePolicyStore",
}));

export type UpdatePolicyTemplateError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified policy template. You can update only the description and the some elements of the policyBody.
 *
 * Changes you make to the policy template content are immediately (within the constraints of eventual consistency) reflected in authorization decisions that involve all template-linked policies instantiated from this template.
 *
 * Verified Permissions is * eventually consistent *. It can take a few seconds for a new or changed element to propagate through the service and be visible in the results of other Verified Permissions operations.
 */
export const updatePolicyTemplate: API.OperationMethod<
  UpdatePolicyTemplateInput,
  UpdatePolicyTemplateOutput,
  UpdatePolicyTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePolicyTemplateInput,
  output: UpdatePolicyTemplateOutput,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePolicyTemplate",
}));
