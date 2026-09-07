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
  sdkId: "Invoicing",
  serviceShapeName: "Invoicing",
});
const auth = T.AwsAuthSigv4({ name: "invoicing" });
const ver = T.ServiceVersion("2024-12-01");
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
            `https://invoicing-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            _p0(PartitionResult),
            {},
          );
        }
        return e(
          `https://invoicing.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceName: S.optional(S.String),
    },
    T.all(
      T.AwsQueryError({ code: "InvoicingAccessDenied", httpResponseCode: 403 }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
    },
    T.all(
      T.AwsQueryError({ code: "InvoicingConflict", httpResponseCode: 409 }),
      T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({
        code: "InvoicingInternalServer",
        httpResponseCode: 500,
      }),
      T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceName: S.optional(S.String),
    },
    T.all(
      T.AwsQueryError({
        code: "InvoicingResourceNotFound",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvoicingServiceQuotaExceeded",
        httpResponseCode: 402,
      }),
      T.HttpError(402),
    ),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvoicingThrottling", httpResponseCode: 429 }),
      T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceName: S.optional(S.String),
      reason: S.optional(
        S.suspend(() => ValidationExceptionReason).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.all(
      T.AwsQueryError({ code: "InvoicingValidation", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type AccountIdString = string;
export type AccountIdList = string[];
export const AccountIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetInvoiceProfileRequest {
  AccountIds: string[];
}
export const BatchGetInvoiceProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountIds: AccountIdList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchGetInvoiceProfileRequest",
}) as any as S.Schema<BatchGetInvoiceProfileRequest>;
export type BasicStringWithoutSpace = string;
export type BasicString = string;
export interface ReceiverAddress {
  AddressLine1?: string;
  AddressLine2?: string;
  AddressLine3?: string;
  DistrictOrCounty?: string;
  City?: string;
  StateOrRegion?: string;
  CountryCode?: string;
  CompanyName?: string;
  PostalCode?: string;
}
export const ReceiverAddress = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AddressLine1: S.optional(S.String),
    AddressLine2: S.optional(S.String),
    AddressLine3: S.optional(S.String),
    DistrictOrCounty: S.optional(S.String),
    City: S.optional(S.String),
    StateOrRegion: S.optional(S.String),
    CountryCode: S.optional(S.String),
    CompanyName: S.optional(S.String),
    PostalCode: S.optional(S.String),
  }),
).annotate({
  identifier: "ReceiverAddress",
}) as any as S.Schema<ReceiverAddress>;
export type SensitiveBasicStringWithoutSpace =
  | string
  | redacted.Redacted<string>;
export interface InvoiceProfile {
  AccountId?: string;
  ReceiverName?: string;
  ReceiverAddress?: ReceiverAddress;
  ReceiverEmail?: string | redacted.Redacted<string>;
  Issuer?: string;
  TaxRegistrationNumber?: string | redacted.Redacted<string>;
}
export const InvoiceProfile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    ReceiverName: S.optional(S.String),
    ReceiverAddress: S.optional(ReceiverAddress),
    ReceiverEmail: S.optional(SensitiveString),
    Issuer: S.optional(S.String),
    TaxRegistrationNumber: S.optional(SensitiveString),
  }),
).annotate({ identifier: "InvoiceProfile" }) as any as S.Schema<InvoiceProfile>;
export type ProfileList = InvoiceProfile[];
export const ProfileList = /*@__PURE__*/ S.Array(InvoiceProfile);
export interface BatchGetInvoiceProfileResponse {
  Profiles?: InvoiceProfile[];
}
export const BatchGetInvoiceProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Profiles: S.optional(ProfileList) }),
).annotate({
  identifier: "BatchGetInvoiceProfileResponse",
}) as any as S.Schema<BatchGetInvoiceProfileResponse>;
export type InvoiceUnitName = string;
export type DescriptionString = string;
export type TaxInheritanceDisabledFlag = boolean;
export type RuleAccountIdList = string[];
export const RuleAccountIdList = /*@__PURE__*/ S.Array(S.String);
export interface InvoiceUnitRule {
  LinkedAccounts?: string[];
  BillSourceAccounts?: string[];
}
export const InvoiceUnitRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LinkedAccounts: S.optional(RuleAccountIdList),
    BillSourceAccounts: S.optional(RuleAccountIdList),
  }),
).annotate({
  identifier: "InvoiceUnitRule",
}) as any as S.Schema<InvoiceUnitRule>;
export type ResourceTagKey = string;
export type ResourceTagValue = string;
export interface ResourceTag {
  Key: string;
  Value: string;
}
export const ResourceTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "ResourceTag" }) as any as S.Schema<ResourceTag>;
export type ResourceTagList = ResourceTag[];
export const ResourceTagList = /*@__PURE__*/ S.Array(ResourceTag);
export interface CreateInvoiceUnitRequest {
  Name: string;
  InvoiceReceiver: string;
  Description?: string;
  TaxInheritanceDisabled?: boolean;
  Rule: InvoiceUnitRule;
  ResourceTags?: ResourceTag[];
  ClientToken?: string;
}
export const CreateInvoiceUnitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    InvoiceReceiver: S.String,
    Description: S.optional(S.String),
    TaxInheritanceDisabled: S.optional(S.Boolean),
    Rule: InvoiceUnitRule,
    ResourceTags: S.optional(ResourceTagList),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateInvoiceUnitRequest",
}) as any as S.Schema<CreateInvoiceUnitRequest>;
export type InvoiceUnitArnString = string;
export interface CreateInvoiceUnitResponse {
  InvoiceUnitArn?: string;
}
export const CreateInvoiceUnitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InvoiceUnitArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateInvoiceUnitResponse",
}) as any as S.Schema<CreateInvoiceUnitResponse>;
export type ProcurementPortalName =
  | "SAP_BUSINESS_NETWORK"
  | "COUPA"
  | (string & {});
export const ProcurementPortalName = /*@__PURE__*/ S.String;

export type BuyerDomain = "NetworkID" | (string & {});
export const BuyerDomain = /*@__PURE__*/ S.String;

export type SupplierDomain = "NetworkID" | (string & {});
export const SupplierDomain = /*@__PURE__*/ S.String;

export type InvoiceUnitArns = string[];
export const InvoiceUnitArns = /*@__PURE__*/ S.Array(S.String);
export type SellerOfRecords = string[];
export const SellerOfRecords = /*@__PURE__*/ S.Array(S.String);
export interface ProcurementPortalPreferenceSelector {
  InvoiceUnitArns?: string[];
  SellerOfRecords?: string[];
}
export const ProcurementPortalPreferenceSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InvoiceUnitArns: S.optional(InvoiceUnitArns),
    SellerOfRecords: S.optional(SellerOfRecords),
  }),
).annotate({
  identifier: "ProcurementPortalPreferenceSelector",
}) as any as S.Schema<ProcurementPortalPreferenceSelector>;
export interface TestEnvPreferenceInput {
  BuyerDomain: BuyerDomain;
  BuyerIdentifier: string;
  SupplierDomain: SupplierDomain;
  SupplierIdentifier: string;
  ProcurementPortalSharedSecret?: string;
  ProcurementPortalInstanceEndpoint?: string;
}
export const TestEnvPreferenceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BuyerDomain: BuyerDomain,
    BuyerIdentifier: S.String,
    SupplierDomain: SupplierDomain,
    SupplierIdentifier: S.String,
    ProcurementPortalSharedSecret: S.optional(S.String),
    ProcurementPortalInstanceEndpoint: S.optional(S.String),
  }),
).annotate({
  identifier: "TestEnvPreferenceInput",
}) as any as S.Schema<TestEnvPreferenceInput>;
export type EinvoiceDeliveryDocumentType =
  | "AWS_CLOUD_INVOICE"
  | "AWS_CLOUD_CREDIT_MEMO"
  | "AWS_MARKETPLACE_INVOICE"
  | "AWS_MARKETPLACE_CREDIT_MEMO"
  | "AWS_REQUEST_FOR_PAYMENT"
  | (string & {});
export const EinvoiceDeliveryDocumentType = /*@__PURE__*/ S.String;

export type EinvoiceDeliveryDocumentTypes = EinvoiceDeliveryDocumentType[];
export const EinvoiceDeliveryDocumentTypes = /*@__PURE__*/ S.Array(
  EinvoiceDeliveryDocumentType,
);
export type EinvoiceDeliveryAttachmentType =
  | "INVOICE_PDF"
  | "RFP_PDF"
  | (string & {});
export const EinvoiceDeliveryAttachmentType = /*@__PURE__*/ S.String;

export type EinvoiceDeliveryAttachmentTypes = EinvoiceDeliveryAttachmentType[];
export const EinvoiceDeliveryAttachmentTypes = /*@__PURE__*/ S.Array(
  EinvoiceDeliveryAttachmentType,
);
export type Protocol = "CXML" | (string & {});
export const Protocol = /*@__PURE__*/ S.String;

export type PurchaseOrderDataSourceType =
  | "ASSOCIATED_PURCHASE_ORDER_REQUIRED"
  | "PURCHASE_ORDER_NOT_REQUIRED"
  | (string & {});
export const PurchaseOrderDataSourceType = /*@__PURE__*/ S.String;

export interface PurchaseOrderDataSource {
  EinvoiceDeliveryDocumentType?: EinvoiceDeliveryDocumentType;
  PurchaseOrderDataSourceType?: PurchaseOrderDataSourceType;
}
export const PurchaseOrderDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EinvoiceDeliveryDocumentType: S.optional(EinvoiceDeliveryDocumentType),
    PurchaseOrderDataSourceType: S.optional(PurchaseOrderDataSourceType),
  }),
).annotate({
  identifier: "PurchaseOrderDataSource",
}) as any as S.Schema<PurchaseOrderDataSource>;
export type PurchaseOrderDataSources = PurchaseOrderDataSource[];
export const PurchaseOrderDataSources = /*@__PURE__*/ S.Array(
  PurchaseOrderDataSource,
);
export type ConnectionTestingMethod =
  | "PROD_ENV_DOLLAR_TEST"
  | "TEST_ENV_REPLAY_TEST"
  | (string & {});
export const ConnectionTestingMethod = /*@__PURE__*/ S.String;

export interface EinvoiceDeliveryPreference {
  EinvoiceDeliveryDocumentTypes: EinvoiceDeliveryDocumentType[];
  EinvoiceDeliveryAttachmentTypes?: EinvoiceDeliveryAttachmentType[];
  Protocol: Protocol;
  PurchaseOrderDataSources: PurchaseOrderDataSource[];
  ConnectionTestingMethod: ConnectionTestingMethod;
  EinvoiceDeliveryActivationDate: Date;
}
export const EinvoiceDeliveryPreference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EinvoiceDeliveryDocumentTypes: EinvoiceDeliveryDocumentTypes,
    EinvoiceDeliveryAttachmentTypes: S.optional(
      EinvoiceDeliveryAttachmentTypes,
    ),
    Protocol: Protocol,
    PurchaseOrderDataSources: PurchaseOrderDataSources,
    ConnectionTestingMethod: ConnectionTestingMethod,
    EinvoiceDeliveryActivationDate: S.Date.pipe(
      T.TimestampFormat("epoch-seconds"),
    ),
  }),
).annotate({
  identifier: "EinvoiceDeliveryPreference",
}) as any as S.Schema<EinvoiceDeliveryPreference>;
export type EmailString = string;
export interface Contact {
  Name?: string;
  Email?: string;
}
export const Contact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Email: S.optional(S.String) }),
).annotate({ identifier: "Contact" }) as any as S.Schema<Contact>;
export type Contacts = Contact[];
export const Contacts = /*@__PURE__*/ S.Array(Contact);
export interface CreateProcurementPortalPreferenceRequest {
  ProcurementPortalName: ProcurementPortalName;
  BuyerDomain: BuyerDomain;
  BuyerIdentifier: string;
  SupplierDomain: SupplierDomain;
  SupplierIdentifier: string;
  Selector?: ProcurementPortalPreferenceSelector;
  ProcurementPortalSharedSecret?: string | redacted.Redacted<string>;
  ProcurementPortalInstanceEndpoint?: string;
  TestEnvPreference?: TestEnvPreferenceInput;
  EinvoiceDeliveryEnabled: boolean;
  EinvoiceDeliveryPreference?: EinvoiceDeliveryPreference;
  PurchaseOrderRetrievalEnabled: boolean;
  Contacts: Contact[];
  ResourceTags?: ResourceTag[];
  ClientToken?: string;
}
export const CreateProcurementPortalPreferenceRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProcurementPortalName: ProcurementPortalName,
      BuyerDomain: BuyerDomain,
      BuyerIdentifier: S.String,
      SupplierDomain: SupplierDomain,
      SupplierIdentifier: S.String,
      Selector: S.optional(ProcurementPortalPreferenceSelector),
      ProcurementPortalSharedSecret: S.optional(SensitiveString),
      ProcurementPortalInstanceEndpoint: S.optional(S.String),
      TestEnvPreference: S.optional(TestEnvPreferenceInput),
      EinvoiceDeliveryEnabled: S.Boolean,
      EinvoiceDeliveryPreference: S.optional(EinvoiceDeliveryPreference),
      PurchaseOrderRetrievalEnabled: S.Boolean,
      Contacts: Contacts,
      ResourceTags: S.optional(ResourceTagList),
      ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CreateProcurementPortalPreferenceRequest",
}) as any as S.Schema<CreateProcurementPortalPreferenceRequest>;
export type ProcurementPortalPreferenceArnString = string;
export interface CreateProcurementPortalPreferenceResponse {
  ProcurementPortalPreferenceArn: string;
}
export const CreateProcurementPortalPreferenceResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ProcurementPortalPreferenceArn: S.String }),
  ).annotate({
    identifier: "CreateProcurementPortalPreferenceResponse",
  }) as any as S.Schema<CreateProcurementPortalPreferenceResponse>;
export interface DeleteInvoiceUnitRequest {
  InvoiceUnitArn: string;
  ClientToken?: string;
}
export const DeleteInvoiceUnitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InvoiceUnitArn: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteInvoiceUnitRequest",
}) as any as S.Schema<DeleteInvoiceUnitRequest>;
export interface DeleteInvoiceUnitResponse {
  InvoiceUnitArn?: string;
}
export const DeleteInvoiceUnitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InvoiceUnitArn: S.optional(S.String) }),
).annotate({
  identifier: "DeleteInvoiceUnitResponse",
}) as any as S.Schema<DeleteInvoiceUnitResponse>;
export interface DeleteProcurementPortalPreferenceRequest {
  ProcurementPortalPreferenceArn: string;
  ClientToken?: string;
}
export const DeleteProcurementPortalPreferenceRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProcurementPortalPreferenceArn: S.String,
      ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DeleteProcurementPortalPreferenceRequest",
}) as any as S.Schema<DeleteProcurementPortalPreferenceRequest>;
export interface DeleteProcurementPortalPreferenceResponse {
  ProcurementPortalPreferenceArn: string;
}
export const DeleteProcurementPortalPreferenceResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ProcurementPortalPreferenceArn: S.String }),
  ).annotate({
    identifier: "DeleteProcurementPortalPreferenceResponse",
  }) as any as S.Schema<DeleteProcurementPortalPreferenceResponse>;
export type StringWithoutNewLine = string;
export interface GetInvoicePDFRequest {
  InvoiceId: string;
}
export const GetInvoicePDFRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InvoiceId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetInvoicePDFRequest",
}) as any as S.Schema<GetInvoicePDFRequest>;
export type SupplementalDocumentType =
  | "GOVERNMENT_INVOICE"
  | "TAX_E_INVOICE"
  | "PAYMENT_RECEIPT"
  | "SUPPLEMENT"
  | (string & {});
export const SupplementalDocumentType = /*@__PURE__*/ S.String;

export interface SupplementalDocument {
  DocumentType?: SupplementalDocumentType;
  DocumentId?: string;
  DocumentUrl?: string;
  DocumentUrlExpirationDate?: Date;
}
export const SupplementalDocument = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DocumentType: S.optional(SupplementalDocumentType),
    DocumentId: S.optional(S.String),
    DocumentUrl: S.optional(S.String),
    DocumentUrlExpirationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "SupplementalDocument",
}) as any as S.Schema<SupplementalDocument>;
export type SupplementalDocuments = SupplementalDocument[];
export const SupplementalDocuments =
  /*@__PURE__*/ S.Array(SupplementalDocument);
export interface InvoicePDF {
  InvoiceId?: string;
  DocumentUrl?: string;
  DocumentUrlExpirationDate?: Date;
  SupplementalDocuments?: SupplementalDocument[];
}
export const InvoicePDF = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InvoiceId: S.optional(S.String),
    DocumentUrl: S.optional(S.String),
    DocumentUrlExpirationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SupplementalDocuments: S.optional(SupplementalDocuments),
  }),
).annotate({ identifier: "InvoicePDF" }) as any as S.Schema<InvoicePDF>;
export interface GetInvoicePDFResponse {
  InvoicePDF?: InvoicePDF;
}
export const GetInvoicePDFResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InvoicePDF: S.optional(InvoicePDF) }),
).annotate({
  identifier: "GetInvoicePDFResponse",
}) as any as S.Schema<GetInvoicePDFResponse>;
export type AsOfTimestamp = Date;
export interface GetInvoiceUnitRequest {
  InvoiceUnitArn: string;
  AsOf?: Date;
}
export const GetInvoiceUnitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InvoiceUnitArn: S.String,
    AsOf: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetInvoiceUnitRequest",
}) as any as S.Schema<GetInvoiceUnitRequest>;
export type LastModifiedTimestamp = Date;
export interface GetInvoiceUnitResponse {
  InvoiceUnitArn?: string;
  InvoiceReceiver?: string;
  Name?: string;
  Description?: string;
  TaxInheritanceDisabled?: boolean;
  Rule?: InvoiceUnitRule;
  LastModified?: Date;
}
export const GetInvoiceUnitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InvoiceUnitArn: S.optional(S.String),
    InvoiceReceiver: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    TaxInheritanceDisabled: S.optional(S.Boolean),
    Rule: S.optional(InvoiceUnitRule),
    LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GetInvoiceUnitResponse",
}) as any as S.Schema<GetInvoiceUnitResponse>;
export interface GetProcurementPortalPreferenceRequest {
  ProcurementPortalPreferenceArn: string;
}
export const GetProcurementPortalPreferenceRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ProcurementPortalPreferenceArn: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetProcurementPortalPreferenceRequest",
}) as any as S.Schema<GetProcurementPortalPreferenceRequest>;
export interface TestEnvPreference {
  BuyerDomain: BuyerDomain;
  BuyerIdentifier: string;
  SupplierDomain: SupplierDomain;
  SupplierIdentifier: string;
  ProcurementPortalSharedSecret?: string;
  ProcurementPortalInstanceEndpoint?: string;
  PurchaseOrderRetrievalEndpoint?: string;
}
export const TestEnvPreference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BuyerDomain: BuyerDomain,
    BuyerIdentifier: S.String,
    SupplierDomain: SupplierDomain,
    SupplierIdentifier: S.String,
    ProcurementPortalSharedSecret: S.optional(S.String),
    ProcurementPortalInstanceEndpoint: S.optional(S.String),
    PurchaseOrderRetrievalEndpoint: S.optional(S.String),
  }),
).annotate({
  identifier: "TestEnvPreference",
}) as any as S.Schema<TestEnvPreference>;
export type ProcurementPortalPreferenceStatus =
  | "PENDING_VERIFICATION"
  | "TEST_INITIALIZED"
  | "TEST_INITIALIZATION_FAILED"
  | "TEST_FAILED"
  | "ACTIVE"
  | "SUSPENDED"
  | (string & {});
export const ProcurementPortalPreferenceStatus = /*@__PURE__*/ S.String;

export interface ProcurementPortalPreference {
  AwsAccountId: string;
  ProcurementPortalPreferenceArn: string;
  ProcurementPortalName: ProcurementPortalName;
  BuyerDomain: BuyerDomain;
  BuyerIdentifier: string;
  SupplierDomain: SupplierDomain;
  SupplierIdentifier: string;
  Selector?: ProcurementPortalPreferenceSelector;
  ProcurementPortalSharedSecret?: string;
  ProcurementPortalInstanceEndpoint?: string;
  PurchaseOrderRetrievalEndpoint?: string;
  TestEnvPreference?: TestEnvPreference;
  EinvoiceDeliveryEnabled: boolean;
  EinvoiceDeliveryPreference?: EinvoiceDeliveryPreference;
  PurchaseOrderRetrievalEnabled: boolean;
  Contacts?: Contact[];
  EinvoiceDeliveryPreferenceStatus?: ProcurementPortalPreferenceStatus;
  EinvoiceDeliveryPreferenceStatusReason?: string;
  PurchaseOrderRetrievalPreferenceStatus?: ProcurementPortalPreferenceStatus;
  PurchaseOrderRetrievalPreferenceStatusReason?: string;
  Version: number;
  CreateDate: Date;
  LastUpdateDate: Date;
}
export const ProcurementPortalPreference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AwsAccountId: S.String,
    ProcurementPortalPreferenceArn: S.String,
    ProcurementPortalName: ProcurementPortalName,
    BuyerDomain: BuyerDomain,
    BuyerIdentifier: S.String,
    SupplierDomain: SupplierDomain,
    SupplierIdentifier: S.String,
    Selector: S.optional(ProcurementPortalPreferenceSelector),
    ProcurementPortalSharedSecret: S.optional(S.String),
    ProcurementPortalInstanceEndpoint: S.optional(S.String),
    PurchaseOrderRetrievalEndpoint: S.optional(S.String),
    TestEnvPreference: S.optional(TestEnvPreference),
    EinvoiceDeliveryEnabled: S.Boolean,
    EinvoiceDeliveryPreference: S.optional(EinvoiceDeliveryPreference),
    PurchaseOrderRetrievalEnabled: S.Boolean,
    Contacts: S.optional(Contacts),
    EinvoiceDeliveryPreferenceStatus: S.optional(
      ProcurementPortalPreferenceStatus,
    ),
    EinvoiceDeliveryPreferenceStatusReason: S.optional(S.String),
    PurchaseOrderRetrievalPreferenceStatus: S.optional(
      ProcurementPortalPreferenceStatus,
    ),
    PurchaseOrderRetrievalPreferenceStatusReason: S.optional(S.String),
    Version: S.Number,
    CreateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    LastUpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "ProcurementPortalPreference",
}) as any as S.Schema<ProcurementPortalPreference>;
export interface GetProcurementPortalPreferenceResponse {
  ProcurementPortalPreference: ProcurementPortalPreference;
}
export const GetProcurementPortalPreferenceResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ ProcurementPortalPreference: ProcurementPortalPreference }),
).annotate({
  identifier: "GetProcurementPortalPreferenceResponse",
}) as any as S.Schema<GetProcurementPortalPreferenceResponse>;
export type ListInvoiceSummariesResourceType =
  | "ACCOUNT_ID"
  | "INVOICE_ID"
  | (string & {});
export const ListInvoiceSummariesResourceType = /*@__PURE__*/ S.String;

export interface InvoiceSummariesSelector {
  ResourceType: ListInvoiceSummariesResourceType;
  Value: string;
}
export const InvoiceSummariesSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceType: ListInvoiceSummariesResourceType, Value: S.String }),
).annotate({
  identifier: "InvoiceSummariesSelector",
}) as any as S.Schema<InvoiceSummariesSelector>;
export interface DateInterval {
  StartDate: Date;
  EndDate: Date;
}
export const DateInterval = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "DateInterval" }) as any as S.Schema<DateInterval>;
export type Month = number;
export type Year = number;
export interface BillingPeriod {
  Month: number;
  Year: number;
}
export const BillingPeriod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Month: S.Number, Year: S.Number }),
).annotate({ identifier: "BillingPeriod" }) as any as S.Schema<BillingPeriod>;
export type ReceiverRole = "SELLER" | "RESELLER" | "BUYER" | (string & {});
export const ReceiverRole = /*@__PURE__*/ S.String;

export interface InvoiceSummariesFilter {
  TimeInterval?: DateInterval;
  BillingPeriod?: BillingPeriod;
  InvoicingEntity?: string;
  ReceiverRole?: ReceiverRole;
}
export const InvoiceSummariesFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimeInterval: S.optional(DateInterval),
    BillingPeriod: S.optional(BillingPeriod),
    InvoicingEntity: S.optional(S.String),
    ReceiverRole: S.optional(ReceiverRole),
  }),
).annotate({
  identifier: "InvoiceSummariesFilter",
}) as any as S.Schema<InvoiceSummariesFilter>;
export type NextTokenString = string;
export type InvoiceSummariesMaxResults = number;
export interface ListInvoiceSummariesRequest {
  Selector: InvoiceSummariesSelector;
  Filter?: InvoiceSummariesFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListInvoiceSummariesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Selector: InvoiceSummariesSelector,
    Filter: S.optional(InvoiceSummariesFilter),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListInvoiceSummariesRequest",
}) as any as S.Schema<ListInvoiceSummariesRequest>;
export type BillSourceAccountList = string[];
export const BillSourceAccountList = /*@__PURE__*/ S.Array(S.String);
export type BillingEntity = "AWS" | "AWS_MARKETPLACE" | (string & {});
export const BillingEntity = /*@__PURE__*/ S.String;

export interface Entity {
  InvoicingEntity?: string;
  BillingEntity?: BillingEntity;
}
export const Entity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InvoicingEntity: S.optional(S.String),
    BillingEntity: S.optional(BillingEntity),
  }),
).annotate({ identifier: "Entity" }) as any as S.Schema<Entity>;
export type InvoiceFrequency = "ONE_TIME" | "RECURRING" | (string & {});
export const InvoiceFrequency = /*@__PURE__*/ S.String;

export type BillType = "ANNIVERSARY" | "PURCHASE" | "REFUND" | (string & {});
export const BillType = /*@__PURE__*/ S.String;

export type InvoiceType =
  | "INVOICE"
  | "CREDIT_MEMO"
  | "PAYMENT_RECEIPT"
  | (string & {});
export const InvoiceType = /*@__PURE__*/ S.String;

export type EinvoiceDeliveryStatus =
  | "DELIVERED"
  | "NOT_DELIVERED"
  | (string & {});
export const EinvoiceDeliveryStatus = /*@__PURE__*/ S.String;

export type TaxAuthorityStatus = "ISSUED" | "CANCELLED" | (string & {});
export const TaxAuthorityStatus = /*@__PURE__*/ S.String;

export type CurrencyCode = string;
export interface DiscountsBreakdownAmount {
  Description?: string;
  Amount?: string;
  Rate?: string;
}
export const DiscountsBreakdownAmount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    Amount: S.optional(S.String),
    Rate: S.optional(S.String),
  }),
).annotate({
  identifier: "DiscountsBreakdownAmount",
}) as any as S.Schema<DiscountsBreakdownAmount>;
export type DiscountsBreakdownAmountList = DiscountsBreakdownAmount[];
export const DiscountsBreakdownAmountList = /*@__PURE__*/ S.Array(
  DiscountsBreakdownAmount,
);
export interface DiscountsBreakdown {
  Breakdown?: DiscountsBreakdownAmount[];
  TotalAmount?: string;
}
export const DiscountsBreakdown = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Breakdown: S.optional(DiscountsBreakdownAmountList),
    TotalAmount: S.optional(S.String),
  }),
).annotate({
  identifier: "DiscountsBreakdown",
}) as any as S.Schema<DiscountsBreakdown>;
export interface TaxesBreakdownAmount {
  Description?: string;
  Amount?: string;
  Rate?: string;
}
export const TaxesBreakdownAmount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    Amount: S.optional(S.String),
    Rate: S.optional(S.String),
  }),
).annotate({
  identifier: "TaxesBreakdownAmount",
}) as any as S.Schema<TaxesBreakdownAmount>;
export type TaxesBreakdownAmountList = TaxesBreakdownAmount[];
export const TaxesBreakdownAmountList =
  /*@__PURE__*/ S.Array(TaxesBreakdownAmount);
export interface TaxesBreakdown {
  Breakdown?: TaxesBreakdownAmount[];
  TotalAmount?: string;
}
export const TaxesBreakdown = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Breakdown: S.optional(TaxesBreakdownAmountList),
    TotalAmount: S.optional(S.String),
  }),
).annotate({ identifier: "TaxesBreakdown" }) as any as S.Schema<TaxesBreakdown>;
export interface FeesBreakdownAmount {
  Description?: string;
  Amount?: string;
  Rate?: string;
}
export const FeesBreakdownAmount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    Amount: S.optional(S.String),
    Rate: S.optional(S.String),
  }),
).annotate({
  identifier: "FeesBreakdownAmount",
}) as any as S.Schema<FeesBreakdownAmount>;
export type FeesBreakdownAmountList = FeesBreakdownAmount[];
export const FeesBreakdownAmountList =
  /*@__PURE__*/ S.Array(FeesBreakdownAmount);
export interface FeesBreakdown {
  Breakdown?: FeesBreakdownAmount[];
  TotalAmount?: string;
}
export const FeesBreakdown = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Breakdown: S.optional(FeesBreakdownAmountList),
    TotalAmount: S.optional(S.String),
  }),
).annotate({ identifier: "FeesBreakdown" }) as any as S.Schema<FeesBreakdown>;
export interface AmountBreakdown {
  SubTotalAmount?: string;
  Discounts?: DiscountsBreakdown;
  Taxes?: TaxesBreakdown;
  Fees?: FeesBreakdown;
}
export const AmountBreakdown = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubTotalAmount: S.optional(S.String),
    Discounts: S.optional(DiscountsBreakdown),
    Taxes: S.optional(TaxesBreakdown),
    Fees: S.optional(FeesBreakdown),
  }),
).annotate({
  identifier: "AmountBreakdown",
}) as any as S.Schema<AmountBreakdown>;
export interface CurrencyExchangeDetails {
  SourceCurrencyCode?: string;
  TargetCurrencyCode?: string;
  Rate?: string;
}
export const CurrencyExchangeDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceCurrencyCode: S.optional(S.String),
    TargetCurrencyCode: S.optional(S.String),
    Rate: S.optional(S.String),
  }),
).annotate({
  identifier: "CurrencyExchangeDetails",
}) as any as S.Schema<CurrencyExchangeDetails>;
export interface InvoiceCurrencyAmount {
  TotalAmount?: string;
  TotalAmountBeforeTax?: string;
  CurrencyCode?: string;
  AmountBreakdown?: AmountBreakdown;
  CurrencyExchangeDetails?: CurrencyExchangeDetails;
}
export const InvoiceCurrencyAmount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TotalAmount: S.optional(S.String),
    TotalAmountBeforeTax: S.optional(S.String),
    CurrencyCode: S.optional(S.String),
    AmountBreakdown: S.optional(AmountBreakdown),
    CurrencyExchangeDetails: S.optional(CurrencyExchangeDetails),
  }),
).annotate({
  identifier: "InvoiceCurrencyAmount",
}) as any as S.Schema<InvoiceCurrencyAmount>;
export interface InvoiceSummary {
  AccountId?: string;
  InvoiceId?: string;
  IssuedDate?: Date;
  DueDate?: Date;
  BillSourceAccounts?: string[];
  BillSourceAccountsTotalCount?: number;
  ReceiverRole?: ReceiverRole;
  Entity?: Entity;
  BillingPeriod?: BillingPeriod;
  InvoiceFrequency?: InvoiceFrequency;
  BillType?: BillType;
  InvoiceType?: InvoiceType;
  CommercialInvoiceId?: string;
  OriginalInvoiceId?: string;
  PurchaseOrderNumber?: string;
  EinvoiceDeliveryStatus?: EinvoiceDeliveryStatus;
  TaxAuthorityStatus?: TaxAuthorityStatus;
  BaseCurrencyAmount?: InvoiceCurrencyAmount;
  TaxCurrencyAmount?: InvoiceCurrencyAmount;
  PaymentCurrencyAmount?: InvoiceCurrencyAmount;
}
export const InvoiceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    InvoiceId: S.optional(S.String),
    IssuedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DueDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    BillSourceAccounts: S.optional(BillSourceAccountList),
    BillSourceAccountsTotalCount: S.optional(S.Number),
    ReceiverRole: S.optional(ReceiverRole),
    Entity: S.optional(Entity),
    BillingPeriod: S.optional(BillingPeriod),
    InvoiceFrequency: S.optional(InvoiceFrequency),
    BillType: S.optional(BillType),
    InvoiceType: S.optional(InvoiceType),
    CommercialInvoiceId: S.optional(S.String),
    OriginalInvoiceId: S.optional(S.String),
    PurchaseOrderNumber: S.optional(S.String),
    EinvoiceDeliveryStatus: S.optional(EinvoiceDeliveryStatus),
    TaxAuthorityStatus: S.optional(TaxAuthorityStatus),
    BaseCurrencyAmount: S.optional(InvoiceCurrencyAmount),
    TaxCurrencyAmount: S.optional(InvoiceCurrencyAmount),
    PaymentCurrencyAmount: S.optional(InvoiceCurrencyAmount),
  }),
).annotate({ identifier: "InvoiceSummary" }) as any as S.Schema<InvoiceSummary>;
export type InvoiceSummaries = InvoiceSummary[];
export const InvoiceSummaries = /*@__PURE__*/ S.Array(InvoiceSummary);
export interface ListInvoiceSummariesResponse {
  InvoiceSummaries: InvoiceSummary[];
  NextToken?: string;
}
export const ListInvoiceSummariesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InvoiceSummaries: InvoiceSummaries,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListInvoiceSummariesResponse",
}) as any as S.Schema<ListInvoiceSummariesResponse>;
export type InvoiceUnitNames = string[];
export const InvoiceUnitNames = /*@__PURE__*/ S.Array(S.String);
export interface Filters {
  Names?: string[];
  InvoiceReceivers?: string[];
  Accounts?: string[];
  BillSourceAccounts?: string[];
}
export const Filters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Names: S.optional(InvoiceUnitNames),
    InvoiceReceivers: S.optional(AccountIdList),
    Accounts: S.optional(AccountIdList),
    BillSourceAccounts: S.optional(AccountIdList),
  }),
).annotate({ identifier: "Filters" }) as any as S.Schema<Filters>;
export type MaxResultsInteger = number;
export interface ListInvoiceUnitsRequest {
  Filters?: Filters;
  NextToken?: string;
  MaxResults?: number;
  AsOf?: Date;
}
export const ListInvoiceUnitsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(Filters),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    AsOf: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListInvoiceUnitsRequest",
}) as any as S.Schema<ListInvoiceUnitsRequest>;
export interface InvoiceUnit {
  InvoiceUnitArn?: string;
  InvoiceReceiver?: string;
  Name?: string;
  Description?: string;
  TaxInheritanceDisabled?: boolean;
  Rule?: InvoiceUnitRule;
  LastModified?: Date;
}
export const InvoiceUnit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InvoiceUnitArn: S.optional(S.String),
    InvoiceReceiver: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    TaxInheritanceDisabled: S.optional(S.Boolean),
    Rule: S.optional(InvoiceUnitRule),
    LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "InvoiceUnit" }) as any as S.Schema<InvoiceUnit>;
export type InvoiceUnits = InvoiceUnit[];
export const InvoiceUnits = /*@__PURE__*/ S.Array(InvoiceUnit);
export interface ListInvoiceUnitsResponse {
  InvoiceUnits?: InvoiceUnit[];
  NextToken?: string;
}
export const ListInvoiceUnitsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InvoiceUnits: S.optional(InvoiceUnits),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListInvoiceUnitsResponse",
}) as any as S.Schema<ListInvoiceUnitsResponse>;
export type MaxResults = number;
export interface ListProcurementPortalPreferencesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListProcurementPortalPreferencesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListProcurementPortalPreferencesRequest",
}) as any as S.Schema<ListProcurementPortalPreferencesRequest>;
export interface ProcurementPortalPreferenceSummary {
  AwsAccountId: string;
  ProcurementPortalPreferenceArn: string;
  ProcurementPortalName: ProcurementPortalName;
  BuyerDomain: BuyerDomain;
  BuyerIdentifier: string;
  SupplierDomain: SupplierDomain;
  SupplierIdentifier: string;
  Selector?: ProcurementPortalPreferenceSelector;
  EinvoiceDeliveryEnabled: boolean;
  PurchaseOrderRetrievalEnabled: boolean;
  EinvoiceDeliveryPreferenceStatus?: ProcurementPortalPreferenceStatus;
  EinvoiceDeliveryPreferenceStatusReason?: string;
  PurchaseOrderRetrievalPreferenceStatus?: ProcurementPortalPreferenceStatus;
  PurchaseOrderRetrievalPreferenceStatusReason?: string;
  Version: number;
  CreateDate: Date;
  LastUpdateDate: Date;
}
export const ProcurementPortalPreferenceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AwsAccountId: S.String,
    ProcurementPortalPreferenceArn: S.String,
    ProcurementPortalName: ProcurementPortalName,
    BuyerDomain: BuyerDomain,
    BuyerIdentifier: S.String,
    SupplierDomain: SupplierDomain,
    SupplierIdentifier: S.String,
    Selector: S.optional(ProcurementPortalPreferenceSelector),
    EinvoiceDeliveryEnabled: S.Boolean,
    PurchaseOrderRetrievalEnabled: S.Boolean,
    EinvoiceDeliveryPreferenceStatus: S.optional(
      ProcurementPortalPreferenceStatus,
    ),
    EinvoiceDeliveryPreferenceStatusReason: S.optional(S.String),
    PurchaseOrderRetrievalPreferenceStatus: S.optional(
      ProcurementPortalPreferenceStatus,
    ),
    PurchaseOrderRetrievalPreferenceStatusReason: S.optional(S.String),
    Version: S.Number,
    CreateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    LastUpdateDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "ProcurementPortalPreferenceSummary",
}) as any as S.Schema<ProcurementPortalPreferenceSummary>;
export type ProcurementPortalPreferenceSummaries =
  ProcurementPortalPreferenceSummary[];
export const ProcurementPortalPreferenceSummaries = /*@__PURE__*/ S.Array(
  ProcurementPortalPreferenceSummary,
);
export interface ListProcurementPortalPreferencesResponse {
  ProcurementPortalPreferences?: ProcurementPortalPreferenceSummary[];
  NextToken?: string;
}
export const ListProcurementPortalPreferencesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProcurementPortalPreferences: S.optional(
        ProcurementPortalPreferenceSummaries,
      ),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListProcurementPortalPreferencesResponse",
}) as any as S.Schema<ListProcurementPortalPreferencesResponse>;
export type TagrisArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  ResourceTags?: ResourceTag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceTags: S.optional(ResourceTagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutProcurementPortalPreferenceRequest {
  ProcurementPortalPreferenceArn: string;
  Selector?: ProcurementPortalPreferenceSelector;
  ProcurementPortalSharedSecret?: string | redacted.Redacted<string>;
  ProcurementPortalInstanceEndpoint?: string;
  TestEnvPreference?: TestEnvPreferenceInput;
  EinvoiceDeliveryEnabled: boolean;
  EinvoiceDeliveryPreference?: EinvoiceDeliveryPreference;
  PurchaseOrderRetrievalEnabled: boolean;
  Contacts: Contact[];
  ClientToken?: string;
}
export const PutProcurementPortalPreferenceRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProcurementPortalPreferenceArn: S.String,
      Selector: S.optional(ProcurementPortalPreferenceSelector),
      ProcurementPortalSharedSecret: S.optional(SensitiveString),
      ProcurementPortalInstanceEndpoint: S.optional(S.String),
      TestEnvPreference: S.optional(TestEnvPreferenceInput),
      EinvoiceDeliveryEnabled: S.Boolean,
      EinvoiceDeliveryPreference: S.optional(EinvoiceDeliveryPreference),
      PurchaseOrderRetrievalEnabled: S.Boolean,
      Contacts: Contacts,
      ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "PutProcurementPortalPreferenceRequest",
}) as any as S.Schema<PutProcurementPortalPreferenceRequest>;
export interface PutProcurementPortalPreferenceResponse {
  ProcurementPortalPreferenceArn: string;
}
export const PutProcurementPortalPreferenceResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ ProcurementPortalPreferenceArn: S.String }),
).annotate({
  identifier: "PutProcurementPortalPreferenceResponse",
}) as any as S.Schema<PutProcurementPortalPreferenceResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  ResourceTags: ResourceTag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, ResourceTags: ResourceTagList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
export type ResourceTagKeyList = string[];
export const ResourceTagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  ResourceTagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, ResourceTagKeys: ResourceTagKeyList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
export interface UpdateInvoiceUnitRequest {
  InvoiceUnitArn: string;
  Description?: string;
  TaxInheritanceDisabled?: boolean;
  Rule?: InvoiceUnitRule;
  ClientToken?: string;
}
export const UpdateInvoiceUnitRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InvoiceUnitArn: S.String,
    Description: S.optional(S.String),
    TaxInheritanceDisabled: S.optional(S.Boolean),
    Rule: S.optional(InvoiceUnitRule),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateInvoiceUnitRequest",
}) as any as S.Schema<UpdateInvoiceUnitRequest>;
export interface UpdateInvoiceUnitResponse {
  InvoiceUnitArn?: string;
}
export const UpdateInvoiceUnitResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InvoiceUnitArn: S.optional(S.String) }),
).annotate({
  identifier: "UpdateInvoiceUnitResponse",
}) as any as S.Schema<UpdateInvoiceUnitResponse>;
export interface UpdateProcurementPortalPreferenceStatusRequest {
  ProcurementPortalPreferenceArn: string;
  EinvoiceDeliveryPreferenceStatus?: ProcurementPortalPreferenceStatus;
  EinvoiceDeliveryPreferenceStatusReason?: string;
  PurchaseOrderRetrievalPreferenceStatus?: ProcurementPortalPreferenceStatus;
  PurchaseOrderRetrievalPreferenceStatusReason?: string;
  ClientToken?: string;
}
export const UpdateProcurementPortalPreferenceStatusRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ProcurementPortalPreferenceArn: S.String,
      EinvoiceDeliveryPreferenceStatus: S.optional(
        ProcurementPortalPreferenceStatus,
      ),
      EinvoiceDeliveryPreferenceStatusReason: S.optional(S.String),
      PurchaseOrderRetrievalPreferenceStatus: S.optional(
        ProcurementPortalPreferenceStatus,
      ),
      PurchaseOrderRetrievalPreferenceStatusReason: S.optional(S.String),
      ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "UpdateProcurementPortalPreferenceStatusRequest",
  }) as any as S.Schema<UpdateProcurementPortalPreferenceStatusRequest>;
export interface UpdateProcurementPortalPreferenceStatusResponse {
  ProcurementPortalPreferenceArn: string;
}
export const UpdateProcurementPortalPreferenceStatusResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ProcurementPortalPreferenceArn: S.String }),
  ).annotate({
    identifier: "UpdateProcurementPortalPreferenceStatusResponse",
  }) as any as S.Schema<UpdateProcurementPortalPreferenceStatusResponse>;
export type ValidationExceptionReason =
  | "nonMemberPresent"
  | "maxAccountsExceeded"
  | "maxInvoiceUnitsExceeded"
  | "duplicateInvoiceUnit"
  | "mutualExclusionError"
  | "accountMembershipError"
  | "taxSettingsError"
  | "expiredNextToken"
  | "invalidNextToken"
  | "invalidInput"
  | "fieldValidationFailed"
  | "cannotParse"
  | "unknownOperation"
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
export type BatchGetInvoiceProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This gets the invoice profile associated with a set of accounts. The accounts must be linked accounts under the requester management account organization.
 */
export const batchGetInvoiceProfile: API.OperationMethod<
  BatchGetInvoiceProfileRequest,
  BatchGetInvoiceProfileResponse,
  BatchGetInvoiceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetInvoiceProfileRequest,
  output: BatchGetInvoiceProfileResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetInvoiceProfile",
}));

export type CreateInvoiceUnitError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This creates a new invoice unit with the provided definition.
 */
export const createInvoiceUnit: API.OperationMethod<
  CreateInvoiceUnitRequest,
  CreateInvoiceUnitResponse,
  CreateInvoiceUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateInvoiceUnitRequest,
  output: CreateInvoiceUnitResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInvoiceUnit",
}));

export type CreateProcurementPortalPreferenceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * * **This feature API is subject to changing at any time. For more information, see the Amazon Web Services Service Terms (Betas and Previews).** *
 *
 * Creates a procurement portal preference configuration for e-invoice delivery and purchase order retrieval. This preference defines how invoices are delivered to a procurement portal and how purchase orders are retrieved.
 */
export const createProcurementPortalPreference: API.OperationMethod<
  CreateProcurementPortalPreferenceRequest,
  CreateProcurementPortalPreferenceResponse,
  CreateProcurementPortalPreferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProcurementPortalPreferenceRequest,
  output: CreateProcurementPortalPreferenceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProcurementPortalPreference",
}));

export type DeleteInvoiceUnitError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This deletes an invoice unit with the provided invoice unit ARN.
 */
export const deleteInvoiceUnit: API.OperationMethod<
  DeleteInvoiceUnitRequest,
  DeleteInvoiceUnitResponse,
  DeleteInvoiceUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInvoiceUnitRequest,
  output: DeleteInvoiceUnitResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInvoiceUnit",
}));

export type DeleteProcurementPortalPreferenceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * * **This feature API is subject to changing at any time. For more information, see the Amazon Web Services Service Terms (Betas and Previews).** *
 *
 * Deletes an existing procurement portal preference. This action cannot be undone. Active e-invoice delivery and PO retrieval configurations will be terminated.
 */
export const deleteProcurementPortalPreference: API.OperationMethod<
  DeleteProcurementPortalPreferenceRequest,
  DeleteProcurementPortalPreferenceResponse,
  DeleteProcurementPortalPreferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProcurementPortalPreferenceRequest,
  output: DeleteProcurementPortalPreferenceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProcurementPortalPreference",
}));

export type GetInvoicePDFError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a URL to download the invoice document and supplemental documents associated with an invoice. The URLs are pre-signed and have expiration time. For special cases like Brazil, where Amazon Web Services generated invoice identifiers and government provided identifiers do not match, use the Amazon Web Services generated invoice identifier when making API requests. To grant IAM permission to use this operation, the caller needs the `invoicing:GetInvoicePDF` policy action.
 */
export const getInvoicePDF: API.OperationMethod<
  GetInvoicePDFRequest,
  GetInvoicePDFResponse,
  GetInvoicePDFError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInvoicePDFRequest,
  output: GetInvoicePDFResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInvoicePDF",
}));

export type GetInvoiceUnitError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This retrieves the invoice unit definition.
 */
export const getInvoiceUnit: API.OperationMethod<
  GetInvoiceUnitRequest,
  GetInvoiceUnitResponse,
  GetInvoiceUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInvoiceUnitRequest,
  output: GetInvoiceUnitResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInvoiceUnit",
}));

export type GetProcurementPortalPreferenceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * * **This feature API is subject to changing at any time. For more information, see the Amazon Web Services Service Terms (Betas and Previews).** *
 *
 * Retrieves the details of a specific procurement portal preference configuration.
 */
export const getProcurementPortalPreference: API.OperationMethod<
  GetProcurementPortalPreferenceRequest,
  GetProcurementPortalPreferenceResponse,
  GetProcurementPortalPreferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProcurementPortalPreferenceRequest,
  output: GetProcurementPortalPreferenceResponse,
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
  operationName: "GetProcurementPortalPreference",
}));

export type ListInvoiceSummariesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves your invoice details programmatically, without line item details.
 */
export const listInvoiceSummaries: API.PaginatedOperationMethod<
  ListInvoiceSummariesRequest,
  ListInvoiceSummariesResponse,
  ListInvoiceSummariesError,
  Credentials | HttpClient.HttpClient,
  InvoiceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInvoiceSummariesRequest,
  output: ListInvoiceSummariesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInvoiceSummaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InvoiceSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInvoiceUnitsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This fetches a list of all invoice unit definitions for a given account, as of the provided `AsOf` date.
 */
export const listInvoiceUnits: API.PaginatedOperationMethod<
  ListInvoiceUnitsRequest,
  ListInvoiceUnitsResponse,
  ListInvoiceUnitsError,
  Credentials | HttpClient.HttpClient,
  InvoiceUnit
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInvoiceUnitsRequest,
  output: ListInvoiceUnitsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInvoiceUnits",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InvoiceUnits",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProcurementPortalPreferencesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * * **This feature API is subject to changing at any time. For more information, see the Amazon Web Services Service Terms (Betas and Previews).** *
 *
 * Retrieves a list of procurement portal preferences associated with the Amazon Web Services account.
 */
export const listProcurementPortalPreferences: API.PaginatedOperationMethod<
  ListProcurementPortalPreferencesRequest,
  ListProcurementPortalPreferencesResponse,
  ListProcurementPortalPreferencesError,
  Credentials | HttpClient.HttpClient,
  ProcurementPortalPreferenceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProcurementPortalPreferencesRequest,
  output: ListProcurementPortalPreferencesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProcurementPortalPreferences",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProcurementPortalPreferences",
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
 * Lists the tags for a resource.
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

export type PutProcurementPortalPreferenceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * * **This feature API is subject to changing at any time. For more information, see the Amazon Web Services Service Terms (Betas and Previews).** *
 *
 * Updates an existing procurement portal preference configuration. This operation can modify settings for e-invoice delivery and purchase order retrieval.
 */
export const putProcurementPortalPreference: API.OperationMethod<
  PutProcurementPortalPreferenceRequest,
  PutProcurementPortalPreferenceResponse,
  PutProcurementPortalPreferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutProcurementPortalPreferenceRequest,
  output: PutProcurementPortalPreferenceResponse,
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
  operationName: "PutProcurementPortalPreference",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a tag to a resource.
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
    ServiceQuotaExceededException,
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
 * Removes a tag from a resource.
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

export type UpdateInvoiceUnitError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * You can update the invoice unit configuration at any time, and Amazon Web Services will use the latest configuration at the end of the month.
 */
export const updateInvoiceUnit: API.OperationMethod<
  UpdateInvoiceUnitRequest,
  UpdateInvoiceUnitResponse,
  UpdateInvoiceUnitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateInvoiceUnitRequest,
  output: UpdateInvoiceUnitResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInvoiceUnit",
}));

export type UpdateProcurementPortalPreferenceStatusError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * * **This feature API is subject to changing at any time. For more information, see the Amazon Web Services Service Terms (Betas and Previews).** *
 *
 * Updates the status of a procurement portal preference, including the activation state of e-invoice delivery and purchase order retrieval features.
 */
export const updateProcurementPortalPreferenceStatus: API.OperationMethod<
  UpdateProcurementPortalPreferenceStatusRequest,
  UpdateProcurementPortalPreferenceStatusResponse,
  UpdateProcurementPortalPreferenceStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProcurementPortalPreferenceStatusRequest,
  output: UpdateProcurementPortalPreferenceStatusResponse,
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
  operationName: "UpdateProcurementPortalPreferenceStatus",
}));
