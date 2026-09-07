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
  sdkId: "TaxSettings",
  serviceShapeName: "TaxSettings",
});
const auth = T.AwsAuthSigv4({ name: "tax" });
const ver = T.ServiceVersion("2018-05-10");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
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
              `https://tax-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p0(PartitionResult),
              {},
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://tax-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              _p0(PartitionResult),
              {},
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://tax.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p0(PartitionResult),
              {},
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://tax.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    { message: SensitiveString.pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class AttachmentUploadException
  extends /*@__PURE__*/ S.TaggedError<AttachmentUploadException>()(
    "AttachmentUploadException",
    { message: SensitiveString.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class CaseCreationLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<CaseCreationLimitExceededException>()(
    "CaseCreationLimitExceededException",
    { message: SensitiveString.pipe(T.ErrorMessage()) },
    T.HttpError(413),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: SensitiveString.pipe(T.ErrorMessage()), errorCode: S.String },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: SensitiveString.pipe(T.ErrorMessage()), errorCode: S.String },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: SensitiveString.pipe(T.ErrorMessage()), errorCode: S.String },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: SensitiveString.pipe(T.ErrorMessage()),
      errorCode: S.suspend(() => ValidationExceptionErrorCode).annotate({
        identifier: "ValidationExceptionErrorCode",
      }),
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type AccountId = string;
export type AccountIds = string[];
export const AccountIds = /*@__PURE__*/ S.Array(S.String);
export interface BatchDeleteTaxRegistrationRequest {
  accountIds: string[];
}
export const BatchDeleteTaxRegistrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountIds: AccountIds }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchDeleteTaxRegistration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchDeleteTaxRegistrationRequest",
}) as any as S.Schema<BatchDeleteTaxRegistrationRequest>;
export type ErrorMessage = string | redacted.Redacted<string>;
export type ErrorCode = string;
export interface BatchDeleteTaxRegistrationError_ {
  accountId: string;
  message: string | redacted.Redacted<string>;
  code?: string;
}
export const BatchDeleteTaxRegistrationError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.String,
    message: SensitiveString,
    code: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchDeleteTaxRegistrationError",
}) as any as S.Schema<BatchDeleteTaxRegistrationError_>;
export type BatchDeleteTaxRegistrationErrors =
  BatchDeleteTaxRegistrationError_[];
export const BatchDeleteTaxRegistrationErrors = /*@__PURE__*/ S.Array(
  BatchDeleteTaxRegistrationError_,
);
export interface BatchDeleteTaxRegistrationResponse {
  errors: BatchDeleteTaxRegistrationError_[];
}
export const BatchDeleteTaxRegistrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ errors: BatchDeleteTaxRegistrationErrors }),
).annotate({
  identifier: "BatchDeleteTaxRegistrationResponse",
}) as any as S.Schema<BatchDeleteTaxRegistrationResponse>;
export interface BatchGetTaxExemptionsRequest {
  accountIds: string[];
}
export const BatchGetTaxExemptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountIds: AccountIds }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchGetTaxExemptions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetTaxExemptionsRequest",
}) as any as S.Schema<BatchGetTaxExemptionsRequest>;
export type CountryCode = string;
export type State = string;
export interface Authority {
  country: string;
  state?: string;
}
export const Authority = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ country: S.String, state: S.optional(S.String) }),
).annotate({ identifier: "Authority" }) as any as S.Schema<Authority>;
export type DisplayName = string;
export type Authorities = Authority[];
export const Authorities = /*@__PURE__*/ S.Array(Authority);
export interface TaxExemptionType {
  displayName?: string;
  description?: string;
  applicableJurisdictions?: Authority[];
}
export const TaxExemptionType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayName: S.optional(S.String),
    description: S.optional(S.String),
    applicableJurisdictions: S.optional(Authorities),
  }),
).annotate({
  identifier: "TaxExemptionType",
}) as any as S.Schema<TaxExemptionType>;
export type EntityExemptionAccountStatus =
  | "None"
  | "Valid"
  | "Expired"
  | "Pending"
  | (string & {});
export const EntityExemptionAccountStatus = S.String;

export interface TaxExemption {
  authority: Authority;
  taxExemptionType: TaxExemptionType;
  effectiveDate?: Date;
  expirationDate?: Date;
  systemEffectiveDate?: Date;
  status?: EntityExemptionAccountStatus;
}
export const TaxExemption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    authority: Authority,
    taxExemptionType: TaxExemptionType,
    effectiveDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    expirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    systemEffectiveDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    status: S.optional(EntityExemptionAccountStatus),
  }),
).annotate({ identifier: "TaxExemption" }) as any as S.Schema<TaxExemption>;
export type TaxExemptions = TaxExemption[];
export const TaxExemptions = /*@__PURE__*/ S.Array(TaxExemption);
export interface TaxExemptionDetails {
  taxExemptions?: TaxExemption[];
  heritageObtainedDetails?: boolean;
  heritageObtainedParentEntity?: string;
  heritageObtainedReason?: string;
}
export const TaxExemptionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taxExemptions: S.optional(TaxExemptions),
    heritageObtainedDetails: S.optional(S.Boolean),
    heritageObtainedParentEntity: S.optional(S.String),
    heritageObtainedReason: S.optional(S.String),
  }),
).annotate({
  identifier: "TaxExemptionDetails",
}) as any as S.Schema<TaxExemptionDetails>;
export type TaxExemptionDetailsMap = {
  [key: string]: TaxExemptionDetails | undefined;
};
export const TaxExemptionDetailsMap = /*@__PURE__*/ S.Record(
  S.String,
  TaxExemptionDetails.pipe(S.optional),
);
export interface BatchGetTaxExemptionsResponse {
  taxExemptionDetailsMap?: { [key: string]: TaxExemptionDetails | undefined };
  failedAccounts?: string[];
}
export const BatchGetTaxExemptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taxExemptionDetailsMap: S.optional(TaxExemptionDetailsMap),
    failedAccounts: S.optional(AccountIds),
  }),
).annotate({
  identifier: "BatchGetTaxExemptionsResponse",
}) as any as S.Schema<BatchGetTaxExemptionsResponse>;
export type RegistrationId = string;
export type TaxRegistrationType =
  | "VAT"
  | "GST"
  | "CPF"
  | "CNPJ"
  | "SST"
  | "TIN"
  | "NRIC"
  | "PAN"
  | "NIP"
  | (string & {});
export const TaxRegistrationType = S.String;

export type LegalName = string;
export type AddressLine1 = string;
export type AddressLine2 = string;
export type AddressLine3 = string;
export type District = string;
export type City = string;
export type PostalCode = string;
export interface Address {
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  districtOrCounty?: string;
  city?: string;
  stateOrRegion?: string;
  postalCode: string;
  countryCode: string;
}
export const Address = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    addressLine1: S.optional(S.String),
    addressLine2: S.optional(S.String),
    addressLine3: S.optional(S.String),
    districtOrCounty: S.optional(S.String),
    city: S.optional(S.String),
    stateOrRegion: S.optional(S.String),
    postalCode: S.String,
    countryCode: S.String,
  }),
).annotate({ identifier: "Address" }) as any as S.Schema<Address>;
export type Sector = "Business" | "Individual" | "Government" | (string & {});
export const Sector = S.String;

export type MalaysiaServiceTaxCode =
  | "Consultancy"
  | "Digital Service And Electronic Medium"
  | "IT Services"
  | "Training Or Coaching"
  | (string & {});
export const MalaysiaServiceTaxCode = S.String;

export type MalaysiaServiceTaxCodesList = MalaysiaServiceTaxCode[];
export const MalaysiaServiceTaxCodesList = /*@__PURE__*/ S.Array(
  MalaysiaServiceTaxCode,
);
export type TaxInformationNumber = string;
export type BusinessRegistrationNumber = string;
export interface MalaysiaAdditionalInfo {
  serviceTaxCodes?: MalaysiaServiceTaxCode[];
  taxInformationNumber?: string;
  businessRegistrationNumber?: string;
}
export const MalaysiaAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceTaxCodes: S.optional(MalaysiaServiceTaxCodesList),
    taxInformationNumber: S.optional(S.String),
    businessRegistrationNumber: S.optional(S.String),
  }),
).annotate({
  identifier: "MalaysiaAdditionalInfo",
}) as any as S.Schema<MalaysiaAdditionalInfo>;
export type IsraelDealerType = "Authorized" | "Non-authorized" | (string & {});
export const IsraelDealerType = S.String;

export type IsraelCustomerType = "Business" | "Individual" | (string & {});
export const IsraelCustomerType = S.String;

export interface IsraelAdditionalInfo {
  dealerType: IsraelDealerType;
  customerType: IsraelCustomerType;
}
export const IsraelAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dealerType: IsraelDealerType, customerType: IsraelCustomerType }),
).annotate({
  identifier: "IsraelAdditionalInfo",
}) as any as S.Schema<IsraelAdditionalInfo>;
export type RegistryCommercialCode = string;
export interface EstoniaAdditionalInfo {
  registryCommercialCode: string;
}
export const EstoniaAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ registryCommercialCode: S.String }),
).annotate({
  identifier: "EstoniaAdditionalInfo",
}) as any as S.Schema<EstoniaAdditionalInfo>;
export type CanadaProvincialSalesTaxIdString = string;
export type CanadaQuebecSalesTaxNumberString = string;
export type CanadaRetailSalesTaxNumberString = string;
export interface CanadaAdditionalInfo {
  provincialSalesTaxId?: string;
  canadaQuebecSalesTaxNumber?: string;
  canadaRetailSalesTaxNumber?: string;
  isResellerAccount?: boolean;
}
export const CanadaAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    provincialSalesTaxId: S.optional(S.String),
    canadaQuebecSalesTaxNumber: S.optional(S.String),
    canadaRetailSalesTaxNumber: S.optional(S.String),
    isResellerAccount: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "CanadaAdditionalInfo",
}) as any as S.Schema<CanadaAdditionalInfo>;
export type RegistrationType = "Intra-EU" | "Local" | (string & {});
export const RegistrationType = S.String;

export interface SpainAdditionalInfo {
  registrationType: RegistrationType;
}
export const SpainAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ registrationType: RegistrationType }),
).annotate({
  identifier: "SpainAdditionalInfo",
}) as any as S.Schema<SpainAdditionalInfo>;
export type PersonType =
  | "Legal Person"
  | "Physical Person"
  | "Business"
  | (string & {});
export const PersonType = S.String;

export interface KenyaAdditionalInfo {
  personType: PersonType;
}
export const KenyaAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ personType: PersonType }),
).annotate({
  identifier: "KenyaAdditionalInfo",
}) as any as S.Schema<KenyaAdditionalInfo>;
export type BusinessRepresentativeName = string;
export type LineOfBusiness = string;
export type ItemOfBusiness = string;
export interface SouthKoreaAdditionalInfo {
  businessRepresentativeName: string;
  lineOfBusiness: string;
  itemOfBusiness: string;
}
export const SouthKoreaAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    businessRepresentativeName: S.String,
    lineOfBusiness: S.String,
    itemOfBusiness: S.String,
  }),
).annotate({
  identifier: "SouthKoreaAdditionalInfo",
}) as any as S.Schema<SouthKoreaAdditionalInfo>;
export type TaxOffice = string;
export type KepEmailId = string;
export type SecondaryTaxId = string;
export type Industries =
  | "CirculatingOrg"
  | "ProfessionalOrg"
  | "Banks"
  | "Insurance"
  | "PensionAndBenefitFunds"
  | "DevelopmentAgencies"
  | (string & {});
export const Industries = S.String;

export interface TurkeyAdditionalInfo {
  taxOffice?: string;
  kepEmailId?: string;
  secondaryTaxId?: string;
  industries?: Industries;
}
export const TurkeyAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taxOffice: S.optional(S.String),
    kepEmailId: S.optional(S.String),
    secondaryTaxId: S.optional(S.String),
    industries: S.optional(Industries),
  }),
).annotate({
  identifier: "TurkeyAdditionalInfo",
}) as any as S.Schema<TurkeyAdditionalInfo>;
export interface GeorgiaAdditionalInfo {
  personType: PersonType;
}
export const GeorgiaAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ personType: PersonType }),
).annotate({
  identifier: "GeorgiaAdditionalInfo",
}) as any as S.Schema<GeorgiaAdditionalInfo>;
export type SdiAccountId = string;
export type CigNumber = string;
export type CupNumber = string;
export type TaxCode = string;
export type CustomerType = "Business" | "Individual" | (string & {});
export const CustomerType = S.String;

export interface ItalyAdditionalInfo {
  sdiAccountId?: string;
  cigNumber?: string;
  cupNumber?: string;
  taxCode?: string;
  customerType?: CustomerType;
}
export const ItalyAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sdiAccountId: S.optional(S.String),
    cigNumber: S.optional(S.String),
    cupNumber: S.optional(S.String),
    taxCode: S.optional(S.String),
    customerType: S.optional(CustomerType),
  }),
).annotate({
  identifier: "ItalyAdditionalInfo",
}) as any as S.Schema<ItalyAdditionalInfo>;
export type TaxRegistrationNumberType =
  | "TaxRegistrationNumber"
  | "LocalRegistrationNumber"
  | (string & {});
export const TaxRegistrationNumberType = S.String;

export interface RomaniaAdditionalInfo {
  taxRegistrationNumberType: TaxRegistrationNumberType;
}
export const RomaniaAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taxRegistrationNumberType: TaxRegistrationNumberType }),
).annotate({
  identifier: "RomaniaAdditionalInfo",
}) as any as S.Schema<RomaniaAdditionalInfo>;
export type UkraineTrnType = "Business" | "Individual" | (string & {});
export const UkraineTrnType = S.String;

export interface UkraineAdditionalInfo {
  ukraineTrnType: UkraineTrnType;
}
export const UkraineAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ukraineTrnType: UkraineTrnType }),
).annotate({
  identifier: "UkraineAdditionalInfo",
}) as any as S.Schema<UkraineAdditionalInfo>;
export type IndividualRegistrationNumber = string;
export type PolandTaxRegistrationNumberType =
  | "EUTaxRegistrationNumber"
  | "LocalTaxRegistrationNumber"
  | "LocalRegistrationNumber"
  | (string & {});
export const PolandTaxRegistrationNumberType = S.String;

export interface PolandAdditionalInfo {
  individualRegistrationNumber?: string;
  isGroupVatEnabled?: boolean;
  taxRegistrationNumberType?: PolandTaxRegistrationNumberType;
}
export const PolandAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    individualRegistrationNumber: S.optional(S.String),
    isGroupVatEnabled: S.optional(S.Boolean),
    taxRegistrationNumberType: S.optional(PolandTaxRegistrationNumberType),
  }),
).annotate({
  identifier: "PolandAdditionalInfo",
}) as any as S.Schema<PolandAdditionalInfo>;
export type SaudiArabiaTaxRegistrationNumberType =
  | "TaxRegistrationNumber"
  | "TaxIdentificationNumber"
  | "CommercialRegistrationNumber"
  | (string & {});
export const SaudiArabiaTaxRegistrationNumberType = S.String;

export interface SaudiArabiaAdditionalInfo {
  taxRegistrationNumberType?: SaudiArabiaTaxRegistrationNumberType;
}
export const SaudiArabiaAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taxRegistrationNumberType: S.optional(SaudiArabiaTaxRegistrationNumberType),
  }),
).annotate({
  identifier: "SaudiArabiaAdditionalInfo",
}) as any as S.Schema<SaudiArabiaAdditionalInfo>;
export type IndonesiaTaxRegistrationNumberType =
  | "NIK"
  | "PassportNumber"
  | "NPWP"
  | "NITKU"
  | (string & {});
export const IndonesiaTaxRegistrationNumberType = S.String;

export type PpnExceptionDesignationCode = string;
export type DecisionNumber = string;
export interface IndonesiaAdditionalInfo {
  taxRegistrationNumberType?: IndonesiaTaxRegistrationNumberType;
  ppnExceptionDesignationCode?: string;
  decisionNumber?: string;
}
export const IndonesiaAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taxRegistrationNumberType: S.optional(IndonesiaTaxRegistrationNumberType),
    ppnExceptionDesignationCode: S.optional(S.String),
    decisionNumber: S.optional(S.String),
  }),
).annotate({
  identifier: "IndonesiaAdditionalInfo",
}) as any as S.Schema<IndonesiaAdditionalInfo>;
export type EnterpriseIdentificationNumber = string;
export type ElectronicTransactionCodeNumber = string;
export type PaymentVoucherNumber = string;
export type DateString = string;
export interface VietnamAdditionalInfo {
  enterpriseIdentificationNumber?: string;
  electronicTransactionCodeNumber?: string;
  paymentVoucherNumber?: string;
  paymentVoucherNumberDate?: string;
}
export const VietnamAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enterpriseIdentificationNumber: S.optional(S.String),
    electronicTransactionCodeNumber: S.optional(S.String),
    paymentVoucherNumber: S.optional(S.String),
    paymentVoucherNumberDate: S.optional(S.String),
  }),
).annotate({
  identifier: "VietnamAdditionalInfo",
}) as any as S.Schema<VietnamAdditionalInfo>;
export type UniqueIdentificationNumber = string;
export interface EgyptAdditionalInfo {
  uniqueIdentificationNumber?: string;
  uniqueIdentificationNumberExpirationDate?: string;
}
export const EgyptAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    uniqueIdentificationNumber: S.optional(S.String),
    uniqueIdentificationNumberExpirationDate: S.optional(S.String),
  }),
).annotate({
  identifier: "EgyptAdditionalInfo",
}) as any as S.Schema<EgyptAdditionalInfo>;
export type ContractingAuthorityCode = string;
export interface GreeceAdditionalInfo {
  contractingAuthorityCode?: string;
}
export const GreeceAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ contractingAuthorityCode: S.optional(S.String) }),
).annotate({
  identifier: "GreeceAdditionalInfo",
}) as any as S.Schema<GreeceAdditionalInfo>;
export type UzbekistanTaxRegistrationNumberType =
  | "Business"
  | "Individual"
  | (string & {});
export const UzbekistanTaxRegistrationNumberType = S.String;

export type VatRegistrationNumber = string;
export interface UzbekistanAdditionalInfo {
  taxRegistrationNumberType?: UzbekistanTaxRegistrationNumberType;
  vatRegistrationNumber?: string;
}
export const UzbekistanAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taxRegistrationNumberType: S.optional(UzbekistanTaxRegistrationNumberType),
    vatRegistrationNumber: S.optional(S.String),
  }),
).annotate({
  identifier: "UzbekistanAdditionalInfo",
}) as any as S.Schema<UzbekistanAdditionalInfo>;
export interface PhilippinesAdditionalInfo {
  isVatRegistered?: boolean;
}
export const PhilippinesAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ isVatRegistered: S.optional(S.Boolean) }),
).annotate({
  identifier: "PhilippinesAdditionalInfo",
}) as any as S.Schema<PhilippinesAdditionalInfo>;
export type PeppolId = string;
export interface BelgiumAdditionalInfo {
  peppolId?: string;
  isMercuriusBoxEnabled?: boolean;
}
export const BelgiumAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    peppolId: S.optional(S.String),
    isMercuriusBoxEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "BelgiumAdditionalInfo",
}) as any as S.Schema<BelgiumAdditionalInfo>;
export type ChileDocumentType = "Invoice" | "Receipt" | (string & {});
export const ChileDocumentType = S.String;

export interface ChileAdditionalInfo {
  documentType?: ChileDocumentType;
  businessActivity?: string;
}
export const ChileAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    documentType: S.optional(ChileDocumentType),
    businessActivity: S.optional(S.String),
  }),
).annotate({
  identifier: "ChileAdditionalInfo",
}) as any as S.Schema<ChileAdditionalInfo>;
export type SirenNumber = string;
export interface FranceAdditionalInfo {
  sirenNumber: string;
}
export const FranceAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sirenNumber: S.String }),
).annotate({
  identifier: "FranceAdditionalInfo",
}) as any as S.Schema<FranceAdditionalInfo>;
export interface AdditionalInfoRequest {
  malaysiaAdditionalInfo?: MalaysiaAdditionalInfo;
  israelAdditionalInfo?: IsraelAdditionalInfo;
  estoniaAdditionalInfo?: EstoniaAdditionalInfo;
  canadaAdditionalInfo?: CanadaAdditionalInfo;
  spainAdditionalInfo?: SpainAdditionalInfo;
  kenyaAdditionalInfo?: KenyaAdditionalInfo;
  southKoreaAdditionalInfo?: SouthKoreaAdditionalInfo;
  turkeyAdditionalInfo?: TurkeyAdditionalInfo;
  georgiaAdditionalInfo?: GeorgiaAdditionalInfo;
  italyAdditionalInfo?: ItalyAdditionalInfo;
  romaniaAdditionalInfo?: RomaniaAdditionalInfo;
  ukraineAdditionalInfo?: UkraineAdditionalInfo;
  polandAdditionalInfo?: PolandAdditionalInfo;
  saudiArabiaAdditionalInfo?: SaudiArabiaAdditionalInfo;
  indonesiaAdditionalInfo?: IndonesiaAdditionalInfo;
  vietnamAdditionalInfo?: VietnamAdditionalInfo;
  egyptAdditionalInfo?: EgyptAdditionalInfo;
  greeceAdditionalInfo?: GreeceAdditionalInfo;
  uzbekistanAdditionalInfo?: UzbekistanAdditionalInfo;
  philippinesAdditionalInfo?: PhilippinesAdditionalInfo;
  belgiumAdditionalInfo?: BelgiumAdditionalInfo;
  chileAdditionalInfo?: ChileAdditionalInfo;
  franceAdditionalInfo?: FranceAdditionalInfo;
}
export const AdditionalInfoRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    malaysiaAdditionalInfo: S.optional(MalaysiaAdditionalInfo),
    israelAdditionalInfo: S.optional(IsraelAdditionalInfo),
    estoniaAdditionalInfo: S.optional(EstoniaAdditionalInfo),
    canadaAdditionalInfo: S.optional(CanadaAdditionalInfo),
    spainAdditionalInfo: S.optional(SpainAdditionalInfo),
    kenyaAdditionalInfo: S.optional(KenyaAdditionalInfo),
    southKoreaAdditionalInfo: S.optional(SouthKoreaAdditionalInfo),
    turkeyAdditionalInfo: S.optional(TurkeyAdditionalInfo),
    georgiaAdditionalInfo: S.optional(GeorgiaAdditionalInfo),
    italyAdditionalInfo: S.optional(ItalyAdditionalInfo),
    romaniaAdditionalInfo: S.optional(RomaniaAdditionalInfo),
    ukraineAdditionalInfo: S.optional(UkraineAdditionalInfo),
    polandAdditionalInfo: S.optional(PolandAdditionalInfo),
    saudiArabiaAdditionalInfo: S.optional(SaudiArabiaAdditionalInfo),
    indonesiaAdditionalInfo: S.optional(IndonesiaAdditionalInfo),
    vietnamAdditionalInfo: S.optional(VietnamAdditionalInfo),
    egyptAdditionalInfo: S.optional(EgyptAdditionalInfo),
    greeceAdditionalInfo: S.optional(GreeceAdditionalInfo),
    uzbekistanAdditionalInfo: S.optional(UzbekistanAdditionalInfo),
    philippinesAdditionalInfo: S.optional(PhilippinesAdditionalInfo),
    belgiumAdditionalInfo: S.optional(BelgiumAdditionalInfo),
    chileAdditionalInfo: S.optional(ChileAdditionalInfo),
    franceAdditionalInfo: S.optional(FranceAdditionalInfo),
  }),
).annotate({
  identifier: "AdditionalInfoRequest",
}) as any as S.Schema<AdditionalInfoRequest>;
export type DateOfBirth = string;
export type S3BucketName = string;
export type S3Key = string;
export interface SourceS3Location {
  bucket: string;
  key: string;
}
export const SourceS3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucket: S.String, key: S.String }),
).annotate({
  identifier: "SourceS3Location",
}) as any as S.Schema<SourceS3Location>;
export type TaxDocumentName = string;
export type FileBlob = Uint8Array;
export interface TaxRegistrationDocFile {
  fileName: string;
  fileContent: Uint8Array;
}
export const TaxRegistrationDocFile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fileName: S.String, fileContent: T.Blob }),
).annotate({
  identifier: "TaxRegistrationDocFile",
}) as any as S.Schema<TaxRegistrationDocFile>;
export interface TaxRegistrationDocument {
  s3Location?: SourceS3Location;
  file?: TaxRegistrationDocFile;
}
export const TaxRegistrationDocument = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3Location: S.optional(SourceS3Location),
    file: S.optional(TaxRegistrationDocFile),
  }),
).annotate({
  identifier: "TaxRegistrationDocument",
}) as any as S.Schema<TaxRegistrationDocument>;
export type TaxRegistrationDocuments = TaxRegistrationDocument[];
export const TaxRegistrationDocuments = /*@__PURE__*/ S.Array(
  TaxRegistrationDocument,
);
export interface VerificationDetails {
  dateOfBirth?: string;
  taxRegistrationDocuments?: TaxRegistrationDocument[];
}
export const VerificationDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dateOfBirth: S.optional(S.String),
    taxRegistrationDocuments: S.optional(TaxRegistrationDocuments),
  }),
).annotate({
  identifier: "VerificationDetails",
}) as any as S.Schema<VerificationDetails>;
export type CertifiedEmailId = string;
export interface TaxRegistrationEntry {
  registrationId: string;
  registrationType: TaxRegistrationType;
  legalName?: string;
  legalAddress?: Address;
  sector?: Sector;
  additionalTaxInformation?: AdditionalInfoRequest;
  verificationDetails?: VerificationDetails;
  certifiedEmailId?: string;
}
export const TaxRegistrationEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registrationId: S.String,
    registrationType: TaxRegistrationType,
    legalName: S.optional(S.String),
    legalAddress: S.optional(Address),
    sector: S.optional(Sector),
    additionalTaxInformation: S.optional(AdditionalInfoRequest),
    verificationDetails: S.optional(VerificationDetails),
    certifiedEmailId: S.optional(S.String),
  }),
).annotate({
  identifier: "TaxRegistrationEntry",
}) as any as S.Schema<TaxRegistrationEntry>;
export interface BatchPutTaxRegistrationRequest {
  accountIds: string[];
  taxRegistrationEntry: TaxRegistrationEntry;
}
export const BatchPutTaxRegistrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountIds: AccountIds,
    taxRegistrationEntry: TaxRegistrationEntry,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchPutTaxRegistration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchPutTaxRegistrationRequest",
}) as any as S.Schema<BatchPutTaxRegistrationRequest>;
export type TaxRegistrationStatus =
  | "Verified"
  | "Pending"
  | "Deleted"
  | "Rejected"
  | (string & {});
export const TaxRegistrationStatus = S.String;

export interface BatchPutTaxRegistrationError_ {
  accountId: string;
  message: string | redacted.Redacted<string>;
  code?: string;
}
export const BatchPutTaxRegistrationError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.String,
    message: SensitiveString,
    code: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchPutTaxRegistrationError",
}) as any as S.Schema<BatchPutTaxRegistrationError_>;
export type BatchPutTaxRegistrationErrors = BatchPutTaxRegistrationError_[];
export const BatchPutTaxRegistrationErrors = /*@__PURE__*/ S.Array(
  BatchPutTaxRegistrationError_,
);
export interface BatchPutTaxRegistrationResponse {
  status?: TaxRegistrationStatus;
  errors: BatchPutTaxRegistrationError_[];
}
export const BatchPutTaxRegistrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(TaxRegistrationStatus),
    errors: BatchPutTaxRegistrationErrors,
  }),
).annotate({
  identifier: "BatchPutTaxRegistrationResponse",
}) as any as S.Schema<BatchPutTaxRegistrationResponse>;
export interface DeleteSupplementalTaxRegistrationRequest {
  authorityId: string;
}
export const DeleteSupplementalTaxRegistrationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ authorityId: S.String }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/DeleteSupplementalTaxRegistration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteSupplementalTaxRegistrationRequest",
}) as any as S.Schema<DeleteSupplementalTaxRegistrationRequest>;
export interface DeleteSupplementalTaxRegistrationResponse {}
export const DeleteSupplementalTaxRegistrationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteSupplementalTaxRegistrationResponse",
  }) as any as S.Schema<DeleteSupplementalTaxRegistrationResponse>;
export interface DeleteTaxRegistrationRequest {
  accountId?: string;
}
export const DeleteTaxRegistrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountId: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteTaxRegistration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTaxRegistrationRequest",
}) as any as S.Schema<DeleteTaxRegistrationRequest>;
export interface DeleteTaxRegistrationResponse {}
export const DeleteTaxRegistrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTaxRegistrationResponse",
}) as any as S.Schema<DeleteTaxRegistrationResponse>;
export interface GetTaxExemptionTypesRequest {}
export const GetTaxExemptionTypesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetTaxExemptionTypes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTaxExemptionTypesRequest",
}) as any as S.Schema<GetTaxExemptionTypesRequest>;
export type TaxExemptionTypes = TaxExemptionType[];
export const TaxExemptionTypes = /*@__PURE__*/ S.Array(TaxExemptionType);
export interface GetTaxExemptionTypesResponse {
  taxExemptionTypes?: TaxExemptionType[];
}
export const GetTaxExemptionTypesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taxExemptionTypes: S.optional(TaxExemptionTypes) }),
).annotate({
  identifier: "GetTaxExemptionTypesResponse",
}) as any as S.Schema<GetTaxExemptionTypesResponse>;
export interface GetTaxInheritanceRequest {}
export const GetTaxInheritanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetTaxInheritance" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTaxInheritanceRequest",
}) as any as S.Schema<GetTaxInheritanceRequest>;
export type HeritageStatus = "OptIn" | "OptOut" | (string & {});
export const HeritageStatus = S.String;

export interface GetTaxInheritanceResponse {
  heritageStatus?: HeritageStatus;
}
export const GetTaxInheritanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ heritageStatus: S.optional(HeritageStatus) }),
).annotate({
  identifier: "GetTaxInheritanceResponse",
}) as any as S.Schema<GetTaxInheritanceResponse>;
export interface GetTaxRegistrationRequest {
  accountId?: string;
}
export const GetTaxRegistrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountId: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetTaxRegistration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTaxRegistrationRequest",
}) as any as S.Schema<GetTaxRegistrationRequest>;
export type TaxDocumentAccessToken = string;
export interface TaxDocumentMetadata {
  taxDocumentAccessToken: string;
  taxDocumentName: string;
}
export const TaxDocumentMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taxDocumentAccessToken: S.String, taxDocumentName: S.String }),
).annotate({
  identifier: "TaxDocumentMetadata",
}) as any as S.Schema<TaxDocumentMetadata>;
export type TaxDocumentMetadatas = TaxDocumentMetadata[];
export const TaxDocumentMetadatas = /*@__PURE__*/ S.Array(TaxDocumentMetadata);
export type CcmCode = string;
export type LegalNatureCode = string;
export interface BrazilAdditionalInfo {
  ccmCode?: string;
  legalNatureCode?: string;
}
export const BrazilAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ccmCode: S.optional(S.String),
    legalNatureCode: S.optional(S.String),
  }),
).annotate({
  identifier: "BrazilAdditionalInfo",
}) as any as S.Schema<BrazilAdditionalInfo>;
export type Pan = string;
export interface IndiaAdditionalInfo {
  pan?: string;
}
export const IndiaAdditionalInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pan: S.optional(S.String) }),
).annotate({
  identifier: "IndiaAdditionalInfo",
}) as any as S.Schema<IndiaAdditionalInfo>;
export interface AdditionalInfoResponse {
  malaysiaAdditionalInfo?: MalaysiaAdditionalInfo;
  israelAdditionalInfo?: IsraelAdditionalInfo;
  estoniaAdditionalInfo?: EstoniaAdditionalInfo;
  canadaAdditionalInfo?: CanadaAdditionalInfo;
  brazilAdditionalInfo?: BrazilAdditionalInfo;
  spainAdditionalInfo?: SpainAdditionalInfo;
  kenyaAdditionalInfo?: KenyaAdditionalInfo;
  southKoreaAdditionalInfo?: SouthKoreaAdditionalInfo;
  turkeyAdditionalInfo?: TurkeyAdditionalInfo;
  georgiaAdditionalInfo?: GeorgiaAdditionalInfo;
  italyAdditionalInfo?: ItalyAdditionalInfo;
  romaniaAdditionalInfo?: RomaniaAdditionalInfo;
  ukraineAdditionalInfo?: UkraineAdditionalInfo;
  polandAdditionalInfo?: PolandAdditionalInfo;
  saudiArabiaAdditionalInfo?: SaudiArabiaAdditionalInfo;
  indiaAdditionalInfo?: IndiaAdditionalInfo;
  indonesiaAdditionalInfo?: IndonesiaAdditionalInfo;
  vietnamAdditionalInfo?: VietnamAdditionalInfo;
  egyptAdditionalInfo?: EgyptAdditionalInfo;
  greeceAdditionalInfo?: GreeceAdditionalInfo;
  uzbekistanAdditionalInfo?: UzbekistanAdditionalInfo;
  philippinesAdditionalInfo?: PhilippinesAdditionalInfo;
  belgiumAdditionalInfo?: BelgiumAdditionalInfo;
  chileAdditionalInfo?: ChileAdditionalInfo;
  franceAdditionalInfo?: FranceAdditionalInfo;
}
export const AdditionalInfoResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    malaysiaAdditionalInfo: S.optional(MalaysiaAdditionalInfo),
    israelAdditionalInfo: S.optional(IsraelAdditionalInfo),
    estoniaAdditionalInfo: S.optional(EstoniaAdditionalInfo),
    canadaAdditionalInfo: S.optional(CanadaAdditionalInfo),
    brazilAdditionalInfo: S.optional(BrazilAdditionalInfo),
    spainAdditionalInfo: S.optional(SpainAdditionalInfo),
    kenyaAdditionalInfo: S.optional(KenyaAdditionalInfo),
    southKoreaAdditionalInfo: S.optional(SouthKoreaAdditionalInfo),
    turkeyAdditionalInfo: S.optional(TurkeyAdditionalInfo),
    georgiaAdditionalInfo: S.optional(GeorgiaAdditionalInfo),
    italyAdditionalInfo: S.optional(ItalyAdditionalInfo),
    romaniaAdditionalInfo: S.optional(RomaniaAdditionalInfo),
    ukraineAdditionalInfo: S.optional(UkraineAdditionalInfo),
    polandAdditionalInfo: S.optional(PolandAdditionalInfo),
    saudiArabiaAdditionalInfo: S.optional(SaudiArabiaAdditionalInfo),
    indiaAdditionalInfo: S.optional(IndiaAdditionalInfo),
    indonesiaAdditionalInfo: S.optional(IndonesiaAdditionalInfo),
    vietnamAdditionalInfo: S.optional(VietnamAdditionalInfo),
    egyptAdditionalInfo: S.optional(EgyptAdditionalInfo),
    greeceAdditionalInfo: S.optional(GreeceAdditionalInfo),
    uzbekistanAdditionalInfo: S.optional(UzbekistanAdditionalInfo),
    philippinesAdditionalInfo: S.optional(PhilippinesAdditionalInfo),
    belgiumAdditionalInfo: S.optional(BelgiumAdditionalInfo),
    chileAdditionalInfo: S.optional(ChileAdditionalInfo),
    franceAdditionalInfo: S.optional(FranceAdditionalInfo),
  }),
).annotate({
  identifier: "AdditionalInfoResponse",
}) as any as S.Schema<AdditionalInfoResponse>;
export interface TaxRegistration {
  registrationId: string;
  registrationType: TaxRegistrationType;
  legalName: string;
  status: TaxRegistrationStatus;
  sector?: Sector;
  taxDocumentMetadatas?: TaxDocumentMetadata[];
  certifiedEmailId?: string;
  additionalTaxInformation?: AdditionalInfoResponse;
  legalAddress: Address;
}
export const TaxRegistration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registrationId: S.String,
    registrationType: TaxRegistrationType,
    legalName: S.String,
    status: TaxRegistrationStatus,
    sector: S.optional(Sector),
    taxDocumentMetadatas: S.optional(TaxDocumentMetadatas),
    certifiedEmailId: S.optional(S.String),
    additionalTaxInformation: S.optional(AdditionalInfoResponse),
    legalAddress: Address,
  }),
).annotate({
  identifier: "TaxRegistration",
}) as any as S.Schema<TaxRegistration>;
export interface GetTaxRegistrationResponse {
  taxRegistration?: TaxRegistration;
}
export const GetTaxRegistrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ taxRegistration: S.optional(TaxRegistration) }),
).annotate({
  identifier: "GetTaxRegistrationResponse",
}) as any as S.Schema<GetTaxRegistrationResponse>;
export type S3Prefix = string;
export interface DestinationS3Location {
  bucket: string;
  prefix?: string;
}
export const DestinationS3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucket: S.String, prefix: S.optional(S.String) }),
).annotate({
  identifier: "DestinationS3Location",
}) as any as S.Schema<DestinationS3Location>;
export interface GetTaxRegistrationDocumentRequest {
  destinationS3Location?: DestinationS3Location;
  taxDocumentMetadata: TaxDocumentMetadata;
}
export const GetTaxRegistrationDocumentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    destinationS3Location: S.optional(DestinationS3Location),
    taxDocumentMetadata: TaxDocumentMetadata,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetTaxRegistrationDocument" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTaxRegistrationDocumentRequest",
}) as any as S.Schema<GetTaxRegistrationDocumentRequest>;
export type DestinationFilePath = string;
export type Url = string;
export interface GetTaxRegistrationDocumentResponse {
  destinationFilePath?: string;
  presignedS3Url?: string;
}
export const GetTaxRegistrationDocumentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    destinationFilePath: S.optional(S.String),
    presignedS3Url: S.optional(S.String),
  }),
).annotate({
  identifier: "GetTaxRegistrationDocumentResponse",
}) as any as S.Schema<GetTaxRegistrationDocumentResponse>;
export type MaxResults = number;
export type PaginationTokenString = string;
export interface ListSupplementalTaxRegistrationsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListSupplementalTaxRegistrationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/ListSupplementalTaxRegistrations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListSupplementalTaxRegistrationsRequest",
}) as any as S.Schema<ListSupplementalTaxRegistrationsRequest>;
export type SupplementalTaxRegistrationType = "VAT" | (string & {});
export const SupplementalTaxRegistrationType = S.String;

export interface SupplementalTaxRegistration {
  registrationId: string;
  registrationType: SupplementalTaxRegistrationType;
  legalName: string;
  address: Address;
  authorityId: string;
  status: TaxRegistrationStatus;
}
export const SupplementalTaxRegistration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registrationId: S.String,
    registrationType: SupplementalTaxRegistrationType,
    legalName: S.String,
    address: Address,
    authorityId: S.String,
    status: TaxRegistrationStatus,
  }),
).annotate({
  identifier: "SupplementalTaxRegistration",
}) as any as S.Schema<SupplementalTaxRegistration>;
export type SupplementalTaxRegistrationList = SupplementalTaxRegistration[];
export const SupplementalTaxRegistrationList = /*@__PURE__*/ S.Array(
  SupplementalTaxRegistration,
);
export interface ListSupplementalTaxRegistrationsResponse {
  taxRegistrations: SupplementalTaxRegistration[];
  nextToken?: string;
}
export const ListSupplementalTaxRegistrationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      taxRegistrations: SupplementalTaxRegistrationList,
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListSupplementalTaxRegistrationsResponse",
}) as any as S.Schema<ListSupplementalTaxRegistrationsResponse>;
export interface ListTaxExemptionsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListTaxExemptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListTaxExemptions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTaxExemptionsRequest",
}) as any as S.Schema<ListTaxExemptionsRequest>;
export interface ListTaxExemptionsResponse {
  nextToken?: string;
  taxExemptionDetailsMap?: { [key: string]: TaxExemptionDetails | undefined };
}
export const ListTaxExemptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    taxExemptionDetailsMap: S.optional(TaxExemptionDetailsMap),
  }),
).annotate({
  identifier: "ListTaxExemptionsResponse",
}) as any as S.Schema<ListTaxExemptionsResponse>;
export interface ListTaxRegistrationsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListTaxRegistrationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListTaxRegistrations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTaxRegistrationsRequest",
}) as any as S.Schema<ListTaxRegistrationsRequest>;
export interface Jurisdiction {
  stateOrRegion?: string;
  countryCode: string;
}
export const Jurisdiction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stateOrRegion: S.optional(S.String), countryCode: S.String }),
).annotate({ identifier: "Jurisdiction" }) as any as S.Schema<Jurisdiction>;
export interface TaxRegistrationWithJurisdiction {
  registrationId: string;
  registrationType: TaxRegistrationType;
  legalName: string;
  status: TaxRegistrationStatus;
  sector?: Sector;
  taxDocumentMetadatas?: TaxDocumentMetadata[];
  certifiedEmailId?: string;
  additionalTaxInformation?: AdditionalInfoResponse;
  jurisdiction: Jurisdiction;
}
export const TaxRegistrationWithJurisdiction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registrationId: S.String,
    registrationType: TaxRegistrationType,
    legalName: S.String,
    status: TaxRegistrationStatus,
    sector: S.optional(Sector),
    taxDocumentMetadatas: S.optional(TaxDocumentMetadatas),
    certifiedEmailId: S.optional(S.String),
    additionalTaxInformation: S.optional(AdditionalInfoResponse),
    jurisdiction: Jurisdiction,
  }),
).annotate({
  identifier: "TaxRegistrationWithJurisdiction",
}) as any as S.Schema<TaxRegistrationWithJurisdiction>;
export type InheritanceObtainedReason = string;
export interface TaxInheritanceDetails {
  parentEntityId?: string;
  inheritanceObtainedReason?: string;
}
export const TaxInheritanceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    parentEntityId: S.optional(S.String),
    inheritanceObtainedReason: S.optional(S.String),
  }),
).annotate({
  identifier: "TaxInheritanceDetails",
}) as any as S.Schema<TaxInheritanceDetails>;
export type AccountName = string;
export type Seller = string;
export type AddressRoleType =
  | "TaxAddress"
  | "BillingAddress"
  | "ContactAddress"
  | (string & {});
export const AddressRoleType = S.String;

export type AddressRoleMap = { [key in AddressRoleType]?: Jurisdiction };
export const AddressRoleMap = /*@__PURE__*/ S.Record(
  AddressRoleType,
  Jurisdiction.pipe(S.optional),
);
export interface AccountMetaData {
  accountName?: string;
  seller?: string;
  address?: Address;
  addressType?: AddressRoleType;
  addressRoleMap?: { [key: string]: Jurisdiction | undefined };
}
export const AccountMetaData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountName: S.optional(S.String),
    seller: S.optional(S.String),
    address: S.optional(Address),
    addressType: S.optional(AddressRoleType),
    addressRoleMap: S.optional(AddressRoleMap),
  }),
).annotate({
  identifier: "AccountMetaData",
}) as any as S.Schema<AccountMetaData>;
export interface AccountDetails {
  accountId?: string;
  taxRegistration?: TaxRegistrationWithJurisdiction;
  taxInheritanceDetails?: TaxInheritanceDetails;
  accountMetaData?: AccountMetaData;
}
export const AccountDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    taxRegistration: S.optional(TaxRegistrationWithJurisdiction),
    taxInheritanceDetails: S.optional(TaxInheritanceDetails),
    accountMetaData: S.optional(AccountMetaData),
  }),
).annotate({ identifier: "AccountDetails" }) as any as S.Schema<AccountDetails>;
export type AccountDetailsList = AccountDetails[];
export const AccountDetailsList = /*@__PURE__*/ S.Array(AccountDetails);
export interface ListTaxRegistrationsResponse {
  accountDetails: AccountDetails[];
  nextToken?: string;
}
export const ListTaxRegistrationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountDetails: AccountDetailsList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTaxRegistrationsResponse",
}) as any as S.Schema<ListTaxRegistrationsResponse>;
export interface SupplementalTaxRegistrationEntry {
  registrationId: string;
  registrationType: SupplementalTaxRegistrationType;
  legalName: string;
  address: Address;
}
export const SupplementalTaxRegistrationEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registrationId: S.String,
    registrationType: SupplementalTaxRegistrationType,
    legalName: S.String,
    address: Address,
  }),
).annotate({
  identifier: "SupplementalTaxRegistrationEntry",
}) as any as S.Schema<SupplementalTaxRegistrationEntry>;
export interface PutSupplementalTaxRegistrationRequest {
  taxRegistrationEntry: SupplementalTaxRegistrationEntry;
}
export const PutSupplementalTaxRegistrationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ taxRegistrationEntry: SupplementalTaxRegistrationEntry }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/PutSupplementalTaxRegistration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutSupplementalTaxRegistrationRequest",
}) as any as S.Schema<PutSupplementalTaxRegistrationRequest>;
export interface PutSupplementalTaxRegistrationResponse {
  authorityId: string;
  status: TaxRegistrationStatus;
}
export const PutSupplementalTaxRegistrationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ authorityId: S.String, status: TaxRegistrationStatus }),
).annotate({
  identifier: "PutSupplementalTaxRegistrationResponse",
}) as any as S.Schema<PutSupplementalTaxRegistrationResponse>;
export type ExemptionDocumentName = string;
export type ExemptionFileBlob = Uint8Array;
export interface ExemptionCertificate {
  documentName: string;
  documentFile: Uint8Array;
}
export const ExemptionCertificate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ documentName: S.String, documentFile: T.Blob }),
).annotate({
  identifier: "ExemptionCertificate",
}) as any as S.Schema<ExemptionCertificate>;
export interface PutTaxExemptionRequest {
  accountIds: string[];
  authority: Authority;
  exemptionType: string;
  exemptionCertificate: ExemptionCertificate;
}
export const PutTaxExemptionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountIds: AccountIds,
    authority: Authority,
    exemptionType: S.String,
    exemptionCertificate: ExemptionCertificate,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/PutTaxExemption" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutTaxExemptionRequest",
}) as any as S.Schema<PutTaxExemptionRequest>;
export interface PutTaxExemptionResponse {
  caseId?: string;
}
export const PutTaxExemptionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ caseId: S.optional(S.String) }),
).annotate({
  identifier: "PutTaxExemptionResponse",
}) as any as S.Schema<PutTaxExemptionResponse>;
export interface PutTaxInheritanceRequest {
  heritageStatus?: HeritageStatus;
}
export const PutTaxInheritanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ heritageStatus: S.optional(HeritageStatus) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/PutTaxInheritance" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutTaxInheritanceRequest",
}) as any as S.Schema<PutTaxInheritanceRequest>;
export interface PutTaxInheritanceResponse {}
export const PutTaxInheritanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutTaxInheritanceResponse",
}) as any as S.Schema<PutTaxInheritanceResponse>;
export interface PutTaxRegistrationRequest {
  accountId?: string;
  taxRegistrationEntry: TaxRegistrationEntry;
}
export const PutTaxRegistrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    taxRegistrationEntry: TaxRegistrationEntry,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/PutTaxRegistration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutTaxRegistrationRequest",
}) as any as S.Schema<PutTaxRegistrationRequest>;
export interface PutTaxRegistrationResponse {
  status?: TaxRegistrationStatus;
}
export const PutTaxRegistrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.optional(TaxRegistrationStatus) }),
).annotate({
  identifier: "PutTaxRegistrationResponse",
}) as any as S.Schema<PutTaxRegistrationResponse>;
export type ValidationExceptionErrorCode =
  | "MalformedToken"
  | "ExpiredToken"
  | "InvalidToken"
  | "FieldValidationFailed"
  | "MissingInput"
  | "NonIndiaCustomerCanNotSetPAN"
  | "GSTExistenceBlockSetPAN"
  | (string & {});
export const ValidationExceptionErrorCode = S.String;

export type FieldName = string;
export interface ValidationExceptionField {
  name: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type BatchDeleteTaxRegistrationError =
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Deletes tax registration for multiple accounts in batch. This can be used to delete tax registrations for up to five accounts in one batch.
 *
 * This API operation can't be used to delete your tax registration in Brazil. Use the Payment preferences page in the Billing and Cost Management console instead.
 */
export const batchDeleteTaxRegistration: API.OperationMethod<
  BatchDeleteTaxRegistrationRequest,
  BatchDeleteTaxRegistrationResponse,
  BatchDeleteTaxRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteTaxRegistrationRequest,
  output: BatchDeleteTaxRegistrationResponse,
  errors: [ConflictException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteTaxRegistration",
}));

export type BatchGetTaxExemptionsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Get the active tax exemptions for a given list of accounts. The IAM action is `tax:GetExemptions`.
 */
export const batchGetTaxExemptions: API.OperationMethod<
  BatchGetTaxExemptionsRequest,
  BatchGetTaxExemptionsResponse,
  BatchGetTaxExemptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetTaxExemptionsRequest,
  output: BatchGetTaxExemptionsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetTaxExemptions",
}));

export type BatchPutTaxRegistrationError =
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates tax registration for multiple accounts in batch. This can be used to add or update tax registrations for up to five accounts in one batch. You can't set a TRN if there's a pending TRN. You'll need to delete the pending TRN first.
 *
 * To call this API operation for specific countries, see the following country-specific requirements.
 *
 * **Bangladesh**
 *
 * - You must specify the tax registration certificate document in the `taxRegistrationDocuments` field of the `VerificationDetails` object.
 *
 * **Brazil**
 *
 * - You must complete the tax registration process in the Payment preferences page in the Billing and Cost Management console. After your TRN and billing address are verified, you can call this API operation.
 *
 * - For Amazon Web Services accounts created through Organizations, you can call this API operation when you don't have a billing address.
 *
 * **Georgia**
 *
 * - The valid `personType` values are `Physical Person` and `Business`.
 *
 * **Indonesia**
 *
 * - `PutTaxRegistration`: The use of this operation to submit tax information is subject to the Amazon Web Services service terms. By submitting, you’re providing consent for Amazon Web Services to validate NIK, NPWP, and NITKU data, provided by you with the Directorate General of Taxes of Indonesia in accordance with the Minister of Finance Regulation (PMK) Number 112/PMK.03/2022.
 *
 * - `BatchPutTaxRegistration`: The use of this operation to submit tax information is subject to the Amazon Web Services service terms. By submitting, you’re providing consent for Amazon Web Services to validate NIK, NPWP, and NITKU data, provided by you with the Directorate General of Taxes of Indonesia in accordance with the Minister of Finance Regulation (PMK) Number 112/PMK.03/2022, through our third-party partner PT Achilles Advanced Management (OnlinePajak).
 *
 * - You must specify the `taxRegistrationNumberType` in the `indonesiaAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * - If you specify `decisionNumber`, you must specify the `ppnExceptionDesignationCode` in the `indonesiaAdditionalInfo` field of the `additionalTaxInformation` object. If the `taxRegistrationNumberType` is set to NPWP or NITKU, valid values for `ppnExceptionDesignationCode` are either `01`, `02`, `03`, `07`, or `08`.
 *
 * For other `taxRegistrationNumberType` values, `ppnExceptionDesignationCode` must be either `01`, `07`, or `08`.
 *
 * - If `ppnExceptionDesignationCode` is `07` or `08`, you must specify the `decisionNumber` in the `indonesiaAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * **Kenya**
 *
 * - You must specify the `personType` in the `kenyaAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * - If the `personType` is `Physical Person`, you must specify the tax registration certificate document in the `taxRegistrationDocuments` field of the `VerificationDetails` object.
 *
 * **Malaysia**
 *
 * - The sector valid values are `Business` and `Individual`.
 *
 * - `RegistrationType` valid values are `NRIC` for individual, and TIN and sales and service tax (SST) for Business.
 *
 * - For individual, you can specify the `taxInformationNumber` in `MalaysiaAdditionalInfo` with NRIC type, and a valid `MyKad` or NRIC number.
 *
 * - For business, you must specify a `businessRegistrationNumber` in `MalaysiaAdditionalInfo` with a TIN type and tax identification number.
 *
 * - For business resellers, you must specify a `businessRegistrationNumber` and `taxInformationNumber` in `MalaysiaAdditionalInfo` with a sales and service tax (SST) type and a valid SST number.
 *
 * - For business resellers with service codes, you must specify `businessRegistrationNumber`, `taxInformationNumber`, and distinct `serviceTaxCodes` in `MalaysiaAdditionalInfo` with a SST type and valid sales and service tax (SST) number. By using this API operation, Amazon Web Services registers your self-declaration that you’re an authorized business reseller registered with the Royal Malaysia Customs Department (RMCD), and have a valid SST number.
 *
 * - Amazon Web Services reserves the right to seek additional information and/or take other actions to support your self-declaration as appropriate.
 *
 * - Amazon Web Services is currently registered under the following service tax codes. You must include at least one of the service tax codes in the service tax code strings to declare yourself as an authorized registered business reseller.
 *
 * Taxable service and service tax codes:
 *
 * Consultancy - 9907061674
 *
 * Training or coaching service - 9907071685
 *
 * IT service - 9907101676
 *
 * Digital services and electronic medium - 9907121690
 *
 * **Mexico**
 *
 * - You must provide a Constancia de Situación fiscal (CSF) document in the **verificationDetails** field.
 *
 * - You do not need to provide address and legal name. These will be populated based on your tax registration number.
 *
 * **Nepal**
 *
 * - The sector valid values are `Business` and `Individual`.
 *
 * **Saudi Arabia**
 *
 * - For `address`, you must specify `addressLine3`.
 *
 * **South Korea**
 *
 * - You must specify the `certifiedEmailId` and `legalName` in the `TaxRegistrationEntry` object. Use Korean characters for `legalName`.
 *
 * - You must specify the `businessRepresentativeName`, `itemOfBusiness`, and `lineOfBusiness` in the `southKoreaAdditionalInfo` field of the `additionalTaxInformation` object. Use Korean characters for these fields.
 *
 * - You must specify the tax registration certificate document in the `taxRegistrationDocuments` field of the `VerificationDetails` object.
 *
 * - For the `address` object, use Korean characters for `addressLine1`, `addressLine2` `city`, `postalCode`, and `stateOrRegion`.
 *
 * **Spain**
 *
 * - You must specify the `registrationType` in the `spainAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * - If the `registrationType` is `Local`, you must specify the tax registration certificate document in the `taxRegistrationDocuments` field of the `VerificationDetails` object.
 *
 * **Turkey**
 *
 * - You must specify the `sector` in the `taxRegistrationEntry` object.
 *
 * - If your `sector` is `Business`, `Individual`, or `Government`:
 *
 * - Specify the `taxOffice`. If your `sector` is `Individual`, don't enter this value.
 *
 * - (Optional) Specify the `kepEmailId`. If your `sector` is `Individual`, don't enter this value.
 *
 * - **Note:** In the **Tax Settings** page of the Billing console, `Government` appears as **Public institutions**
 *
 * - If your `sector` is `Business` and you're subject to KDV tax, you must specify your industry in the `industries` field.
 *
 * - For `address`, you must specify `districtOrCounty`.
 *
 * **Ukraine**
 *
 * - The sector valid values are `Business` and `Individual`.
 *
 * **Philippines**
 *
 * - You can optionally specify the `isVatRegistered` in the `philippinesAdditionalInfo` field of the `additionalTaxInformation` object to indicate your VAT registration status with the Bureau of Internal Revenue (BIR).
 *
 * **Belgium**
 *
 * - You can optionally specify the `peppolId` in the `belgiumAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * **Chile**
 *
 * - You can optionally specify the `documentType` and `businessActivity` in the `chileAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * **France**
 *
 * - You must specify the `sirenNumber` in the `franceAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * **Poland**
 *
 * - You can optionally specify the `taxRegistrationNumberType` in the `polandAdditionalInfo` field of the `additionalTaxInformation` object. Valid values are `EUTaxRegistrationNumber`, `LocalTaxRegistrationNumber`, or `LocalRegistrationNumber`.
 */
export const batchPutTaxRegistration: API.OperationMethod<
  BatchPutTaxRegistrationRequest,
  BatchPutTaxRegistrationResponse,
  BatchPutTaxRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchPutTaxRegistrationRequest,
  output: BatchPutTaxRegistrationResponse,
  errors: [ConflictException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchPutTaxRegistration",
}));

export type DeleteSupplementalTaxRegistrationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a supplemental tax registration for a single account.
 */
export const deleteSupplementalTaxRegistration: API.OperationMethod<
  DeleteSupplementalTaxRegistrationRequest,
  DeleteSupplementalTaxRegistrationResponse,
  DeleteSupplementalTaxRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSupplementalTaxRegistrationRequest,
  output: DeleteSupplementalTaxRegistrationResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSupplementalTaxRegistration",
}));

export type DeleteTaxRegistrationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes tax registration for a single account.
 *
 * This API operation can't be used to delete your tax registration in Brazil. Use the Payment preferences page in the Billing and Cost Management console instead.
 */
export const deleteTaxRegistration: API.OperationMethod<
  DeleteTaxRegistrationRequest,
  DeleteTaxRegistrationResponse,
  DeleteTaxRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTaxRegistrationRequest,
  output: DeleteTaxRegistrationResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTaxRegistration",
}));

export type GetTaxExemptionTypesError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Get supported tax exemption types. The IAM action is `tax:GetExemptions`.
 */
export const getTaxExemptionTypes: API.OperationMethod<
  GetTaxExemptionTypesRequest,
  GetTaxExemptionTypesResponse,
  GetTaxExemptionTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTaxExemptionTypesRequest,
  output: GetTaxExemptionTypesResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTaxExemptionTypes",
}));

export type GetTaxInheritanceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * The get account tax inheritance status.
 */
export const getTaxInheritance: API.OperationMethod<
  GetTaxInheritanceRequest,
  GetTaxInheritanceResponse,
  GetTaxInheritanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTaxInheritanceRequest,
  output: GetTaxInheritanceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTaxInheritance",
}));

export type GetTaxRegistrationError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves tax registration for a single account.
 */
export const getTaxRegistration: API.OperationMethod<
  GetTaxRegistrationRequest,
  GetTaxRegistrationResponse,
  GetTaxRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTaxRegistrationRequest,
  output: GetTaxRegistrationResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTaxRegistration",
}));

export type GetTaxRegistrationDocumentError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Downloads your tax documents to the Amazon S3 bucket that you specify in your request.
 */
export const getTaxRegistrationDocument: API.OperationMethod<
  GetTaxRegistrationDocumentRequest,
  GetTaxRegistrationDocumentResponse,
  GetTaxRegistrationDocumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTaxRegistrationDocumentRequest,
  output: GetTaxRegistrationDocumentResponse,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTaxRegistrationDocument",
}));

export type ListSupplementalTaxRegistrationsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves supplemental tax registrations for a single account.
 */
export const listSupplementalTaxRegistrations: API.PaginatedOperationMethod<
  ListSupplementalTaxRegistrationsRequest,
  ListSupplementalTaxRegistrationsResponse,
  ListSupplementalTaxRegistrationsError,
  Credentials | HttpClient.HttpClient,
  SupplementalTaxRegistration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSupplementalTaxRegistrationsRequest,
  output: ListSupplementalTaxRegistrationsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSupplementalTaxRegistrations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "taxRegistrations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTaxExemptionsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the tax exemption of accounts listed in a consolidated billing family. The IAM action is `tax:GetExemptions`.
 */
export const listTaxExemptions: API.PaginatedOperationMethod<
  ListTaxExemptionsRequest,
  ListTaxExemptionsResponse,
  ListTaxExemptionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTaxExemptionsRequest,
  output: ListTaxExemptionsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTaxExemptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "taxExemptionDetailsMap",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTaxRegistrationsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the tax registration of accounts listed in a consolidated billing family. This can be used to retrieve up to 100 accounts' tax registrations in one call (default 50).
 */
export const listTaxRegistrations: API.PaginatedOperationMethod<
  ListTaxRegistrationsRequest,
  ListTaxRegistrationsResponse,
  ListTaxRegistrationsError,
  Credentials | HttpClient.HttpClient,
  AccountDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTaxRegistrationsRequest,
  output: ListTaxRegistrationsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTaxRegistrations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accountDetails",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutSupplementalTaxRegistrationError =
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Stores supplemental tax registration for a single account.
 */
export const putSupplementalTaxRegistration: API.OperationMethod<
  PutSupplementalTaxRegistrationRequest,
  PutSupplementalTaxRegistrationResponse,
  PutSupplementalTaxRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutSupplementalTaxRegistrationRequest,
  output: PutSupplementalTaxRegistrationResponse,
  errors: [ConflictException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSupplementalTaxRegistration",
}));

export type PutTaxExemptionError =
  | AccessDeniedException
  | AttachmentUploadException
  | CaseCreationLimitExceededException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds the tax exemption for a single account or all accounts listed in a consolidated billing family. The IAM action is `tax:UpdateExemptions`.
 */
export const putTaxExemption: API.OperationMethod<
  PutTaxExemptionRequest,
  PutTaxExemptionResponse,
  PutTaxExemptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutTaxExemptionRequest,
  output: PutTaxExemptionResponse,
  errors: [
    AccessDeniedException,
    AttachmentUploadException,
    CaseCreationLimitExceededException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTaxExemption",
}));

export type PutTaxInheritanceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * The updated tax inheritance status.
 */
export const putTaxInheritance: API.OperationMethod<
  PutTaxInheritanceRequest,
  PutTaxInheritanceResponse,
  PutTaxInheritanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutTaxInheritanceRequest,
  output: PutTaxInheritanceResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTaxInheritance",
}));

export type PutTaxRegistrationError =
  | ConflictException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates tax registration for a single account. You can't set a TRN if there's a pending TRN. You'll need to delete the pending TRN first.
 *
 * To call this API operation for specific countries, see the following country-specific requirements.
 *
 * **Bangladesh**
 *
 * - You must specify the tax registration certificate document in the `taxRegistrationDocuments` field of the `VerificationDetails` object.
 *
 * **Brazil**
 *
 * - You must complete the tax registration process in the Payment preferences page in the Billing and Cost Management console. After your TRN and billing address are verified, you can call this API operation.
 *
 * - For Amazon Web Services accounts created through Organizations, you can call this API operation when you don't have a billing address.
 *
 * **Georgia**
 *
 * - The valid `personType` values are `Physical Person` and `Business`.
 *
 * **Indonesia**
 *
 * - `PutTaxRegistration`: The use of this operation to submit tax information is subject to the Amazon Web Services service terms. By submitting, you’re providing consent for Amazon Web Services to validate NIK, NPWP, and NITKU data, provided by you with the Directorate General of Taxes of Indonesia in accordance with the Minister of Finance Regulation (PMK) Number 112/PMK.03/2022.
 *
 * - `BatchPutTaxRegistration`: The use of this operation to submit tax information is subject to the Amazon Web Services service terms. By submitting, you’re providing consent for Amazon Web Services to validate NIK, NPWP, and NITKU data, provided by you with the Directorate General of Taxes of Indonesia in accordance with the Minister of Finance Regulation (PMK) Number 112/PMK.03/2022, through our third-party partner PT Achilles Advanced Management (OnlinePajak).
 *
 * - You must specify the `taxRegistrationNumberType` in the `indonesiaAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * - If you specify `decisionNumber`, you must specify the `ppnExceptionDesignationCode` in the `indonesiaAdditionalInfo` field of the `additionalTaxInformation` object. If the `taxRegistrationNumberType` is set to NPWP or NITKU, valid values for `ppnExceptionDesignationCode` are either `01`, `02`, `03`, `07`, or `08`.
 *
 * For other `taxRegistrationNumberType` values, `ppnExceptionDesignationCode` must be either `01`, `07`, or `08`.
 *
 * - If `ppnExceptionDesignationCode` is `07` or `08`, you must specify the `decisionNumber` in the `indonesiaAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * **Kenya**
 *
 * - You must specify the `personType` in the `kenyaAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * - If the `personType` is `Physical Person`, you must specify the tax registration certificate document in the `taxRegistrationDocuments` field of the `VerificationDetails` object.
 *
 * **Malaysia**
 *
 * - The sector valid values are `Business` and `Individual`.
 *
 * - `RegistrationType` valid values are `NRIC` for individual, and TIN and sales and service tax (SST) for Business.
 *
 * - For individual, you can specify the `taxInformationNumber` in `MalaysiaAdditionalInfo` with NRIC type, and a valid `MyKad` or NRIC number.
 *
 * - For business, you must specify a `businessRegistrationNumber` in `MalaysiaAdditionalInfo` with a TIN type and tax identification number.
 *
 * - For business resellers, you must specify a `businessRegistrationNumber` and `taxInformationNumber` in `MalaysiaAdditionalInfo` with a sales and service tax (SST) type and a valid SST number.
 *
 * - For business resellers with service codes, you must specify `businessRegistrationNumber`, `taxInformationNumber`, and distinct `serviceTaxCodes` in `MalaysiaAdditionalInfo` with a SST type and valid sales and service tax (SST) number. By using this API operation, Amazon Web Services registers your self-declaration that you’re an authorized business reseller registered with the Royal Malaysia Customs Department (RMCD), and have a valid SST number.
 *
 * - Amazon Web Services reserves the right to seek additional information and/or take other actions to support your self-declaration as appropriate.
 *
 * - Amazon Web Services is currently registered under the following service tax codes. You must include at least one of the service tax codes in the service tax code strings to declare yourself as an authorized registered business reseller.
 *
 * Taxable service and service tax codes:
 *
 * Consultancy - 9907061674
 *
 * Training or coaching service - 9907071685
 *
 * IT service - 9907101676
 *
 * Digital services and electronic medium - 9907121690
 *
 * **Mexico**
 *
 * - You must provide a Constancia de Situación fiscal (CSF) document in the **verificationDetails** field.
 *
 * - You do not need to provide address and legal name. These will be populated based on your tax registration number.
 *
 * **Nepal**
 *
 * - The sector valid values are `Business` and `Individual`.
 *
 * **Saudi Arabia**
 *
 * - For `address`, you must specify `addressLine3`.
 *
 * **South Korea**
 *
 * - You must specify the `certifiedEmailId` and `legalName` in the `TaxRegistrationEntry` object. Use Korean characters for `legalName`.
 *
 * - You must specify the `businessRepresentativeName`, `itemOfBusiness`, and `lineOfBusiness` in the `southKoreaAdditionalInfo` field of the `additionalTaxInformation` object. Use Korean characters for these fields.
 *
 * - You must specify the tax registration certificate document in the `taxRegistrationDocuments` field of the `VerificationDetails` object.
 *
 * - For the `address` object, use Korean characters for `addressLine1`, `addressLine2` `city`, `postalCode`, and `stateOrRegion`.
 *
 * **Spain**
 *
 * - You must specify the `registrationType` in the `spainAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * - If the `registrationType` is `Local`, you must specify the tax registration certificate document in the `taxRegistrationDocuments` field of the `VerificationDetails` object.
 *
 * **Turkey**
 *
 * - You must specify the `sector` in the `taxRegistrationEntry` object.
 *
 * - If your `sector` is `Business`, `Individual`, or `Government`:
 *
 * - Specify the `taxOffice`. If your `sector` is `Individual`, don't enter this value.
 *
 * - (Optional) Specify the `kepEmailId`. If your `sector` is `Individual`, don't enter this value.
 *
 * - **Note:** In the **Tax Settings** page of the Billing console, `Government` appears as **Public institutions**
 *
 * - If your `sector` is `Business` and you're subject to KDV tax, you must specify your industry in the `industries` field.
 *
 * - For `address`, you must specify `districtOrCounty`.
 *
 * **Ukraine**
 *
 * - The sector valid values are `Business` and `Individual`.
 *
 * **Philippines**
 *
 * - You can optionally specify the `isVatRegistered` in the `philippinesAdditionalInfo` field of the `additionalTaxInformation` object to indicate your VAT registration status with the Bureau of Internal Revenue (BIR).
 *
 * **Belgium**
 *
 * - You can optionally specify the `peppolId` in the `belgiumAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * **Chile**
 *
 * - You can optionally specify the `documentType` and `businessActivity` in the `chileAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * **France**
 *
 * - You must specify the `sirenNumber` in the `franceAdditionalInfo` field of the `additionalTaxInformation` object.
 *
 * **Poland**
 *
 * - You can optionally specify the `taxRegistrationNumberType` in the `polandAdditionalInfo` field of the `additionalTaxInformation` object. Valid values are `EUTaxRegistrationNumber`, `LocalTaxRegistrationNumber`, or `LocalRegistrationNumber`.
 */
export const putTaxRegistration: API.OperationMethod<
  PutTaxRegistrationRequest,
  PutTaxRegistrationResponse,
  PutTaxRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutTaxRegistrationRequest,
  output: PutTaxRegistrationResponse,
  errors: [ConflictException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTaxRegistration",
}));
