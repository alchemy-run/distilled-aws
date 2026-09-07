import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace("http://cloudsearch.amazonaws.com/doc/2013-01-01/");
const svc = T.AwsApiService({
  sdkId: "CloudSearch",
  serviceShapeName: "A9SearchCloudConfigService2013",
});
const auth = T.AwsAuthSigv4({ name: "cloudsearch" });
const ver = T.ServiceVersion("2013-01-01");
const proto = T.AwsProtocolsAwsQuery();
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
              `https://cloudsearch-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://cloudsearch-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://cloudsearch.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://cloudsearch.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class BaseException
  extends /*@__PURE__*/ S.TaggedError<BaseException>()("BaseException", {
    Code: S.optional(S.String),
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class DisabledOperationException
  extends /*@__PURE__*/ S.TaggedError<DisabledOperationException>()(
    "DisabledOperationException",
    {
      Code: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({ code: "DisabledAction", httpResponseCode: 409 }),
      T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class InternalException
  extends /*@__PURE__*/ S.TaggedError<InternalException>()(
    "InternalException",
    {
      Code: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({ code: "InternalException", httpResponseCode: 500 }),
      T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class InvalidTypeException
  extends /*@__PURE__*/ S.TaggedError<InvalidTypeException>()(
    "InvalidTypeException",
    {
      Code: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({ code: "InvalidType", httpResponseCode: 409 }),
      T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    {
      Code: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({ code: "LimitExceeded", httpResponseCode: 409 }),
      T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    {
      Code: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({ code: "ResourceAlreadyExists", httpResponseCode: 409 }),
      T.HttpError(409),
    ),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      Code: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({ code: "ResourceNotFound", httpResponseCode: 409 }),
      T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      Code: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DomainName = string;
export interface BuildSuggestersRequest {
  DomainName: string;
}
export const BuildSuggestersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BuildSuggestersRequest",
}) as any as S.Schema<BuildSuggestersRequest>;
export type FieldName = string;
export type FieldNameList = string[];
export const FieldNameList = /*@__PURE__*/ S.Array(S.String);
export interface BuildSuggestersResponse {
  FieldNames?: string[];
}
export const BuildSuggestersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FieldNames: S.optional(FieldNameList) }).pipe(ns),
).annotate({
  identifier: "BuildSuggestersResponse",
}) as any as S.Schema<BuildSuggestersResponse>;
export interface CreateDomainRequest {
  DomainName: string;
}
export const CreateDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDomainRequest",
}) as any as S.Schema<CreateDomainRequest>;
export type DomainId = string;
export type ARN = string;
export type ServiceUrl = string;
export interface ServiceEndpoint {
  Endpoint?: string;
}
export const ServiceEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Endpoint: S.optional(S.String) }),
).annotate({
  identifier: "ServiceEndpoint",
}) as any as S.Schema<ServiceEndpoint>;
export type SearchInstanceType = string;
export type PartitionCount = number;
export type InstanceCount = number;
export type MaximumReplicationCount = number;
export type MaximumPartitionCount = number;
export interface Limits {
  MaximumReplicationCount: number;
  MaximumPartitionCount: number;
}
export const Limits = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaximumReplicationCount: S.Number,
    MaximumPartitionCount: S.Number,
  }),
).annotate({ identifier: "Limits" }) as any as S.Schema<Limits>;
export interface DomainStatus {
  DomainId: string;
  DomainName: string;
  ARN?: string;
  Created?: boolean;
  Deleted?: boolean;
  DocService?: ServiceEndpoint;
  SearchService?: ServiceEndpoint;
  RequiresIndexDocuments: boolean;
  Processing?: boolean;
  SearchInstanceType?: string;
  SearchPartitionCount?: number;
  SearchInstanceCount?: number;
  Limits?: Limits;
}
export const DomainStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainId: S.String,
    DomainName: S.String,
    ARN: S.optional(S.String),
    Created: S.optional(S.Boolean),
    Deleted: S.optional(S.Boolean),
    DocService: S.optional(ServiceEndpoint),
    SearchService: S.optional(ServiceEndpoint),
    RequiresIndexDocuments: S.Boolean,
    Processing: S.optional(S.Boolean),
    SearchInstanceType: S.optional(S.String),
    SearchPartitionCount: S.optional(S.Number),
    SearchInstanceCount: S.optional(S.Number),
    Limits: S.optional(Limits),
  }),
).annotate({ identifier: "DomainStatus" }) as any as S.Schema<DomainStatus>;
export interface CreateDomainResponse {
  DomainStatus?: DomainStatus;
}
export const CreateDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainStatus: S.optional(DomainStatus) }).pipe(ns),
).annotate({
  identifier: "CreateDomainResponse",
}) as any as S.Schema<CreateDomainResponse>;
export type StandardName = string;
export type AnalysisSchemeLanguage =
  | "ar"
  | "bg"
  | "ca"
  | "cs"
  | "da"
  | "de"
  | "el"
  | "en"
  | "es"
  | "eu"
  | "fa"
  | "fi"
  | "fr"
  | "ga"
  | "gl"
  | "he"
  | "hi"
  | "hu"
  | "hy"
  | "id"
  | "it"
  | "ja"
  | "ko"
  | "lv"
  | "mul"
  | "nl"
  | "no"
  | "pt"
  | "ro"
  | "ru"
  | "sv"
  | "th"
  | "tr"
  | "zh-Hans"
  | "zh-Hant"
  | (string & {});
export const AnalysisSchemeLanguage = /*@__PURE__*/ S.String;

export type AlgorithmicStemming =
  | "none"
  | "minimal"
  | "light"
  | "full"
  | (string & {});
export const AlgorithmicStemming = /*@__PURE__*/ S.String;

export interface AnalysisOptions {
  Synonyms?: string;
  Stopwords?: string;
  StemmingDictionary?: string;
  JapaneseTokenizationDictionary?: string;
  AlgorithmicStemming?: AlgorithmicStemming;
}
export const AnalysisOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Synonyms: S.optional(S.String),
    Stopwords: S.optional(S.String),
    StemmingDictionary: S.optional(S.String),
    JapaneseTokenizationDictionary: S.optional(S.String),
    AlgorithmicStemming: S.optional(AlgorithmicStemming),
  }),
).annotate({
  identifier: "AnalysisOptions",
}) as any as S.Schema<AnalysisOptions>;
export interface AnalysisScheme {
  AnalysisSchemeName: string;
  AnalysisSchemeLanguage: AnalysisSchemeLanguage;
  AnalysisOptions?: AnalysisOptions;
}
export const AnalysisScheme = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AnalysisSchemeName: S.String,
    AnalysisSchemeLanguage: AnalysisSchemeLanguage,
    AnalysisOptions: S.optional(AnalysisOptions),
  }),
).annotate({ identifier: "AnalysisScheme" }) as any as S.Schema<AnalysisScheme>;
export interface DefineAnalysisSchemeRequest {
  DomainName: string;
  AnalysisScheme: AnalysisScheme;
}
export const DefineAnalysisSchemeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String, AnalysisScheme: AnalysisScheme }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DefineAnalysisSchemeRequest",
}) as any as S.Schema<DefineAnalysisSchemeRequest>;
export type UpdateTimestamp = Date;
export type UIntValue = number;
export type OptionState =
  | "RequiresIndexDocuments"
  | "Processing"
  | "Active"
  | "FailedToValidate"
  | (string & {});
export const OptionState = /*@__PURE__*/ S.String;

export interface OptionStatus {
  CreationDate: Date;
  UpdateDate: Date;
  UpdateVersion?: number;
  State: OptionState;
  PendingDeletion?: boolean;
}
export const OptionStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreationDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdateDate: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    UpdateVersion: S.optional(S.Number),
    State: OptionState,
    PendingDeletion: S.optional(S.Boolean),
  }),
).annotate({ identifier: "OptionStatus" }) as any as S.Schema<OptionStatus>;
export interface AnalysisSchemeStatus {
  Options: AnalysisScheme;
  Status: OptionStatus;
}
export const AnalysisSchemeStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: AnalysisScheme, Status: OptionStatus }),
).annotate({
  identifier: "AnalysisSchemeStatus",
}) as any as S.Schema<AnalysisSchemeStatus>;
export interface DefineAnalysisSchemeResponse {
  AnalysisScheme: AnalysisSchemeStatus;
}
export const DefineAnalysisSchemeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AnalysisScheme: AnalysisSchemeStatus }).pipe(ns),
).annotate({
  identifier: "DefineAnalysisSchemeResponse",
}) as any as S.Schema<DefineAnalysisSchemeResponse>;
export type ExpressionValue = string;
export interface Expression {
  ExpressionName: string;
  ExpressionValue: string;
}
export const Expression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExpressionName: S.String, ExpressionValue: S.String }),
).annotate({ identifier: "Expression" }) as any as S.Schema<Expression>;
export interface DefineExpressionRequest {
  DomainName: string;
  Expression: Expression;
}
export const DefineExpressionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String, Expression: Expression }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DefineExpressionRequest",
}) as any as S.Schema<DefineExpressionRequest>;
export interface ExpressionStatus {
  Options: Expression;
  Status: OptionStatus;
}
export const ExpressionStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: Expression, Status: OptionStatus }),
).annotate({
  identifier: "ExpressionStatus",
}) as any as S.Schema<ExpressionStatus>;
export interface DefineExpressionResponse {
  Expression: ExpressionStatus;
}
export const DefineExpressionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Expression: ExpressionStatus }).pipe(ns),
).annotate({
  identifier: "DefineExpressionResponse",
}) as any as S.Schema<DefineExpressionResponse>;
export type DynamicFieldName = string;
export type IndexFieldType =
  | "int"
  | "double"
  | "literal"
  | "text"
  | "date"
  | "latlon"
  | "int-array"
  | "double-array"
  | "literal-array"
  | "text-array"
  | "date-array"
  | (string & {});
export const IndexFieldType = /*@__PURE__*/ S.String;

export interface IntOptions {
  DefaultValue?: number;
  SourceField?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
  SortEnabled?: boolean;
}
export const IntOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.Number),
    SourceField: S.optional(S.String),
    FacetEnabled: S.optional(S.Boolean),
    SearchEnabled: S.optional(S.Boolean),
    ReturnEnabled: S.optional(S.Boolean),
    SortEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "IntOptions" }) as any as S.Schema<IntOptions>;
export interface DoubleOptions {
  DefaultValue?: number;
  SourceField?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
  SortEnabled?: boolean;
}
export const DoubleOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.Number),
    SourceField: S.optional(S.String),
    FacetEnabled: S.optional(S.Boolean),
    SearchEnabled: S.optional(S.Boolean),
    ReturnEnabled: S.optional(S.Boolean),
    SortEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "DoubleOptions" }) as any as S.Schema<DoubleOptions>;
export type FieldValue = string;
export interface LiteralOptions {
  DefaultValue?: string;
  SourceField?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
  SortEnabled?: boolean;
}
export const LiteralOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.String),
    SourceField: S.optional(S.String),
    FacetEnabled: S.optional(S.Boolean),
    SearchEnabled: S.optional(S.Boolean),
    ReturnEnabled: S.optional(S.Boolean),
    SortEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "LiteralOptions" }) as any as S.Schema<LiteralOptions>;
export type Word = string;
export interface TextOptions {
  DefaultValue?: string;
  SourceField?: string;
  ReturnEnabled?: boolean;
  SortEnabled?: boolean;
  HighlightEnabled?: boolean;
  AnalysisScheme?: string;
}
export const TextOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.String),
    SourceField: S.optional(S.String),
    ReturnEnabled: S.optional(S.Boolean),
    SortEnabled: S.optional(S.Boolean),
    HighlightEnabled: S.optional(S.Boolean),
    AnalysisScheme: S.optional(S.String),
  }),
).annotate({ identifier: "TextOptions" }) as any as S.Schema<TextOptions>;
export interface DateOptions {
  DefaultValue?: string;
  SourceField?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
  SortEnabled?: boolean;
}
export const DateOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.String),
    SourceField: S.optional(S.String),
    FacetEnabled: S.optional(S.Boolean),
    SearchEnabled: S.optional(S.Boolean),
    ReturnEnabled: S.optional(S.Boolean),
    SortEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "DateOptions" }) as any as S.Schema<DateOptions>;
export interface LatLonOptions {
  DefaultValue?: string;
  SourceField?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
  SortEnabled?: boolean;
}
export const LatLonOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.String),
    SourceField: S.optional(S.String),
    FacetEnabled: S.optional(S.Boolean),
    SearchEnabled: S.optional(S.Boolean),
    ReturnEnabled: S.optional(S.Boolean),
    SortEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "LatLonOptions" }) as any as S.Schema<LatLonOptions>;
export type FieldNameCommaList = string;
export interface IntArrayOptions {
  DefaultValue?: number;
  SourceFields?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
}
export const IntArrayOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.Number),
    SourceFields: S.optional(S.String),
    FacetEnabled: S.optional(S.Boolean),
    SearchEnabled: S.optional(S.Boolean),
    ReturnEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "IntArrayOptions",
}) as any as S.Schema<IntArrayOptions>;
export interface DoubleArrayOptions {
  DefaultValue?: number;
  SourceFields?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
}
export const DoubleArrayOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.Number),
    SourceFields: S.optional(S.String),
    FacetEnabled: S.optional(S.Boolean),
    SearchEnabled: S.optional(S.Boolean),
    ReturnEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DoubleArrayOptions",
}) as any as S.Schema<DoubleArrayOptions>;
export interface LiteralArrayOptions {
  DefaultValue?: string;
  SourceFields?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
}
export const LiteralArrayOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.String),
    SourceFields: S.optional(S.String),
    FacetEnabled: S.optional(S.Boolean),
    SearchEnabled: S.optional(S.Boolean),
    ReturnEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "LiteralArrayOptions",
}) as any as S.Schema<LiteralArrayOptions>;
export interface TextArrayOptions {
  DefaultValue?: string;
  SourceFields?: string;
  ReturnEnabled?: boolean;
  HighlightEnabled?: boolean;
  AnalysisScheme?: string;
}
export const TextArrayOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.String),
    SourceFields: S.optional(S.String),
    ReturnEnabled: S.optional(S.Boolean),
    HighlightEnabled: S.optional(S.Boolean),
    AnalysisScheme: S.optional(S.String),
  }),
).annotate({
  identifier: "TextArrayOptions",
}) as any as S.Schema<TextArrayOptions>;
export interface DateArrayOptions {
  DefaultValue?: string;
  SourceFields?: string;
  FacetEnabled?: boolean;
  SearchEnabled?: boolean;
  ReturnEnabled?: boolean;
}
export const DateArrayOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.String),
    SourceFields: S.optional(S.String),
    FacetEnabled: S.optional(S.Boolean),
    SearchEnabled: S.optional(S.Boolean),
    ReturnEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DateArrayOptions",
}) as any as S.Schema<DateArrayOptions>;
export interface IndexField {
  IndexFieldName: string;
  IndexFieldType: IndexFieldType;
  IntOptions?: IntOptions;
  DoubleOptions?: DoubleOptions;
  LiteralOptions?: LiteralOptions;
  TextOptions?: TextOptions;
  DateOptions?: DateOptions;
  LatLonOptions?: LatLonOptions;
  IntArrayOptions?: IntArrayOptions;
  DoubleArrayOptions?: DoubleArrayOptions;
  LiteralArrayOptions?: LiteralArrayOptions;
  TextArrayOptions?: TextArrayOptions;
  DateArrayOptions?: DateArrayOptions;
}
export const IndexField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexFieldName: S.String,
    IndexFieldType: IndexFieldType,
    IntOptions: S.optional(IntOptions),
    DoubleOptions: S.optional(DoubleOptions),
    LiteralOptions: S.optional(LiteralOptions),
    TextOptions: S.optional(TextOptions),
    DateOptions: S.optional(DateOptions),
    LatLonOptions: S.optional(LatLonOptions),
    IntArrayOptions: S.optional(IntArrayOptions),
    DoubleArrayOptions: S.optional(DoubleArrayOptions),
    LiteralArrayOptions: S.optional(LiteralArrayOptions),
    TextArrayOptions: S.optional(TextArrayOptions),
    DateArrayOptions: S.optional(DateArrayOptions),
  }),
).annotate({ identifier: "IndexField" }) as any as S.Schema<IndexField>;
export interface DefineIndexFieldRequest {
  DomainName: string;
  IndexField: IndexField;
}
export const DefineIndexFieldRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String, IndexField: IndexField }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DefineIndexFieldRequest",
}) as any as S.Schema<DefineIndexFieldRequest>;
export interface IndexFieldStatus {
  Options: IndexField;
  Status: OptionStatus;
}
export const IndexFieldStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: IndexField, Status: OptionStatus }),
).annotate({
  identifier: "IndexFieldStatus",
}) as any as S.Schema<IndexFieldStatus>;
export interface DefineIndexFieldResponse {
  IndexField: IndexFieldStatus;
}
export const DefineIndexFieldResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IndexField: IndexFieldStatus }).pipe(ns),
).annotate({
  identifier: "DefineIndexFieldResponse",
}) as any as S.Schema<DefineIndexFieldResponse>;
export type SuggesterFuzzyMatching = "none" | "low" | "high" | (string & {});
export const SuggesterFuzzyMatching = /*@__PURE__*/ S.String;

export interface DocumentSuggesterOptions {
  SourceField: string;
  FuzzyMatching?: SuggesterFuzzyMatching;
  SortExpression?: string;
}
export const DocumentSuggesterOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceField: S.String,
    FuzzyMatching: S.optional(SuggesterFuzzyMatching),
    SortExpression: S.optional(S.String),
  }),
).annotate({
  identifier: "DocumentSuggesterOptions",
}) as any as S.Schema<DocumentSuggesterOptions>;
export interface Suggester {
  SuggesterName: string;
  DocumentSuggesterOptions: DocumentSuggesterOptions;
}
export const Suggester = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SuggesterName: S.String,
    DocumentSuggesterOptions: DocumentSuggesterOptions,
  }),
).annotate({ identifier: "Suggester" }) as any as S.Schema<Suggester>;
export interface DefineSuggesterRequest {
  DomainName: string;
  Suggester: Suggester;
}
export const DefineSuggesterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String, Suggester: Suggester }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DefineSuggesterRequest",
}) as any as S.Schema<DefineSuggesterRequest>;
export interface SuggesterStatus {
  Options: Suggester;
  Status: OptionStatus;
}
export const SuggesterStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: Suggester, Status: OptionStatus }),
).annotate({
  identifier: "SuggesterStatus",
}) as any as S.Schema<SuggesterStatus>;
export interface DefineSuggesterResponse {
  Suggester: SuggesterStatus;
}
export const DefineSuggesterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Suggester: SuggesterStatus }).pipe(ns),
).annotate({
  identifier: "DefineSuggesterResponse",
}) as any as S.Schema<DefineSuggesterResponse>;
export interface DeleteAnalysisSchemeRequest {
  DomainName: string;
  AnalysisSchemeName: string;
}
export const DeleteAnalysisSchemeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String, AnalysisSchemeName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAnalysisSchemeRequest",
}) as any as S.Schema<DeleteAnalysisSchemeRequest>;
export interface DeleteAnalysisSchemeResponse {
  AnalysisScheme: AnalysisSchemeStatus;
}
export const DeleteAnalysisSchemeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AnalysisScheme: AnalysisSchemeStatus }).pipe(ns),
).annotate({
  identifier: "DeleteAnalysisSchemeResponse",
}) as any as S.Schema<DeleteAnalysisSchemeResponse>;
export interface DeleteDomainRequest {
  DomainName: string;
}
export const DeleteDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDomainRequest",
}) as any as S.Schema<DeleteDomainRequest>;
export interface DeleteDomainResponse {
  DomainStatus?: DomainStatus;
}
export const DeleteDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainStatus: S.optional(DomainStatus) }).pipe(ns),
).annotate({
  identifier: "DeleteDomainResponse",
}) as any as S.Schema<DeleteDomainResponse>;
export interface DeleteExpressionRequest {
  DomainName: string;
  ExpressionName: string;
}
export const DeleteExpressionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String, ExpressionName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteExpressionRequest",
}) as any as S.Schema<DeleteExpressionRequest>;
export interface DeleteExpressionResponse {
  Expression: ExpressionStatus;
}
export const DeleteExpressionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Expression: ExpressionStatus }).pipe(ns),
).annotate({
  identifier: "DeleteExpressionResponse",
}) as any as S.Schema<DeleteExpressionResponse>;
export interface DeleteIndexFieldRequest {
  DomainName: string;
  IndexFieldName: string;
}
export const DeleteIndexFieldRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String, IndexFieldName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIndexFieldRequest",
}) as any as S.Schema<DeleteIndexFieldRequest>;
export interface DeleteIndexFieldResponse {
  IndexField: IndexFieldStatus;
}
export const DeleteIndexFieldResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IndexField: IndexFieldStatus }).pipe(ns),
).annotate({
  identifier: "DeleteIndexFieldResponse",
}) as any as S.Schema<DeleteIndexFieldResponse>;
export interface DeleteSuggesterRequest {
  DomainName: string;
  SuggesterName: string;
}
export const DeleteSuggesterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String, SuggesterName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSuggesterRequest",
}) as any as S.Schema<DeleteSuggesterRequest>;
export interface DeleteSuggesterResponse {
  Suggester: SuggesterStatus;
}
export const DeleteSuggesterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Suggester: SuggesterStatus }).pipe(ns),
).annotate({
  identifier: "DeleteSuggesterResponse",
}) as any as S.Schema<DeleteSuggesterResponse>;
export type StandardNameList = string[];
export const StandardNameList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeAnalysisSchemesRequest {
  DomainName: string;
  AnalysisSchemeNames?: string[];
  Deployed?: boolean;
}
export const DescribeAnalysisSchemesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    AnalysisSchemeNames: S.optional(StandardNameList),
    Deployed: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAnalysisSchemesRequest",
}) as any as S.Schema<DescribeAnalysisSchemesRequest>;
export type AnalysisSchemeStatusList = AnalysisSchemeStatus[];
export const AnalysisSchemeStatusList =
  /*@__PURE__*/ S.Array(AnalysisSchemeStatus);
export interface DescribeAnalysisSchemesResponse {
  AnalysisSchemes: AnalysisSchemeStatus[];
}
export const DescribeAnalysisSchemesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AnalysisSchemes: AnalysisSchemeStatusList }).pipe(ns),
).annotate({
  identifier: "DescribeAnalysisSchemesResponse",
}) as any as S.Schema<DescribeAnalysisSchemesResponse>;
export interface DescribeAvailabilityOptionsRequest {
  DomainName: string;
  Deployed?: boolean;
}
export const DescribeAvailabilityOptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String, Deployed: S.optional(S.Boolean) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAvailabilityOptionsRequest",
}) as any as S.Schema<DescribeAvailabilityOptionsRequest>;
export type MultiAZ = boolean;
export interface AvailabilityOptionsStatus {
  Options: boolean;
  Status: OptionStatus;
}
export const AvailabilityOptionsStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: S.Boolean, Status: OptionStatus }),
).annotate({
  identifier: "AvailabilityOptionsStatus",
}) as any as S.Schema<AvailabilityOptionsStatus>;
export interface DescribeAvailabilityOptionsResponse {
  AvailabilityOptions?: AvailabilityOptionsStatus;
}
export const DescribeAvailabilityOptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AvailabilityOptions: S.optional(AvailabilityOptionsStatus) }).pipe(
    ns,
  ),
).annotate({
  identifier: "DescribeAvailabilityOptionsResponse",
}) as any as S.Schema<DescribeAvailabilityOptionsResponse>;
export interface DescribeDomainEndpointOptionsRequest {
  DomainName: string;
  Deployed?: boolean;
}
export const DescribeDomainEndpointOptionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ DomainName: S.String, Deployed: S.optional(S.Boolean) }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeDomainEndpointOptionsRequest",
}) as any as S.Schema<DescribeDomainEndpointOptionsRequest>;
export type TLSSecurityPolicy =
  | "Policy-Min-TLS-1-0-2019-07"
  | "Policy-Min-TLS-1-2-2019-07"
  | (string & {});
export const TLSSecurityPolicy = /*@__PURE__*/ S.String;

export interface DomainEndpointOptions {
  EnforceHTTPS?: boolean;
  TLSSecurityPolicy?: TLSSecurityPolicy;
}
export const DomainEndpointOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnforceHTTPS: S.optional(S.Boolean),
    TLSSecurityPolicy: S.optional(TLSSecurityPolicy),
  }),
).annotate({
  identifier: "DomainEndpointOptions",
}) as any as S.Schema<DomainEndpointOptions>;
export interface DomainEndpointOptionsStatus {
  Options: DomainEndpointOptions;
  Status: OptionStatus;
}
export const DomainEndpointOptionsStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: DomainEndpointOptions, Status: OptionStatus }),
).annotate({
  identifier: "DomainEndpointOptionsStatus",
}) as any as S.Schema<DomainEndpointOptionsStatus>;
export interface DescribeDomainEndpointOptionsResponse {
  DomainEndpointOptions?: DomainEndpointOptionsStatus;
}
export const DescribeDomainEndpointOptionsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DomainEndpointOptions: S.optional(DomainEndpointOptionsStatus),
    }).pipe(ns),
).annotate({
  identifier: "DescribeDomainEndpointOptionsResponse",
}) as any as S.Schema<DescribeDomainEndpointOptionsResponse>;
export type DomainNameList = string[];
export const DomainNameList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeDomainsRequest {
  DomainNames?: string[];
}
export const DescribeDomainsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainNames: S.optional(DomainNameList) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDomainsRequest",
}) as any as S.Schema<DescribeDomainsRequest>;
export type DomainStatusList = DomainStatus[];
export const DomainStatusList = /*@__PURE__*/ S.Array(DomainStatus);
export interface DescribeDomainsResponse {
  DomainStatusList: DomainStatus[];
}
export const DescribeDomainsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainStatusList: DomainStatusList }).pipe(ns),
).annotate({
  identifier: "DescribeDomainsResponse",
}) as any as S.Schema<DescribeDomainsResponse>;
export interface DescribeExpressionsRequest {
  DomainName: string;
  ExpressionNames?: string[];
  Deployed?: boolean;
}
export const DescribeExpressionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    ExpressionNames: S.optional(StandardNameList),
    Deployed: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeExpressionsRequest",
}) as any as S.Schema<DescribeExpressionsRequest>;
export type ExpressionStatusList = ExpressionStatus[];
export const ExpressionStatusList = /*@__PURE__*/ S.Array(ExpressionStatus);
export interface DescribeExpressionsResponse {
  Expressions: ExpressionStatus[];
}
export const DescribeExpressionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Expressions: ExpressionStatusList }).pipe(ns),
).annotate({
  identifier: "DescribeExpressionsResponse",
}) as any as S.Schema<DescribeExpressionsResponse>;
export type DynamicFieldNameList = string[];
export const DynamicFieldNameList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeIndexFieldsRequest {
  DomainName: string;
  FieldNames?: string[];
  Deployed?: boolean;
}
export const DescribeIndexFieldsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    FieldNames: S.optional(DynamicFieldNameList),
    Deployed: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeIndexFieldsRequest",
}) as any as S.Schema<DescribeIndexFieldsRequest>;
export type IndexFieldStatusList = IndexFieldStatus[];
export const IndexFieldStatusList = /*@__PURE__*/ S.Array(IndexFieldStatus);
export interface DescribeIndexFieldsResponse {
  IndexFields: IndexFieldStatus[];
}
export const DescribeIndexFieldsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IndexFields: IndexFieldStatusList }).pipe(ns),
).annotate({
  identifier: "DescribeIndexFieldsResponse",
}) as any as S.Schema<DescribeIndexFieldsResponse>;
export interface DescribeScalingParametersRequest {
  DomainName: string;
}
export const DescribeScalingParametersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeScalingParametersRequest",
}) as any as S.Schema<DescribeScalingParametersRequest>;
export type PartitionInstanceType =
  | "search.m1.small"
  | "search.m1.large"
  | "search.m2.xlarge"
  | "search.m2.2xlarge"
  | "search.m3.medium"
  | "search.m3.large"
  | "search.m3.xlarge"
  | "search.m3.2xlarge"
  | "search.small"
  | "search.medium"
  | "search.large"
  | "search.xlarge"
  | "search.2xlarge"
  | "search.previousgeneration.small"
  | "search.previousgeneration.large"
  | "search.previousgeneration.xlarge"
  | "search.previousgeneration.2xlarge"
  | (string & {});
export const PartitionInstanceType = /*@__PURE__*/ S.String;

export interface ScalingParameters {
  DesiredInstanceType?: PartitionInstanceType;
  DesiredReplicationCount?: number;
  DesiredPartitionCount?: number;
}
export const ScalingParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DesiredInstanceType: S.optional(PartitionInstanceType),
    DesiredReplicationCount: S.optional(S.Number),
    DesiredPartitionCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ScalingParameters",
}) as any as S.Schema<ScalingParameters>;
export interface ScalingParametersStatus {
  Options: ScalingParameters;
  Status: OptionStatus;
}
export const ScalingParametersStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: ScalingParameters, Status: OptionStatus }),
).annotate({
  identifier: "ScalingParametersStatus",
}) as any as S.Schema<ScalingParametersStatus>;
export interface DescribeScalingParametersResponse {
  ScalingParameters: ScalingParametersStatus;
}
export const DescribeScalingParametersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScalingParameters: ScalingParametersStatus }).pipe(ns),
).annotate({
  identifier: "DescribeScalingParametersResponse",
}) as any as S.Schema<DescribeScalingParametersResponse>;
export interface DescribeServiceAccessPoliciesRequest {
  DomainName: string;
  Deployed?: boolean;
}
export const DescribeServiceAccessPoliciesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ DomainName: S.String, Deployed: S.optional(S.Boolean) }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeServiceAccessPoliciesRequest",
}) as any as S.Schema<DescribeServiceAccessPoliciesRequest>;
export type PolicyDocument = string;
export interface AccessPoliciesStatus {
  Options: string;
  Status: OptionStatus;
}
export const AccessPoliciesStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Options: S.String, Status: OptionStatus }),
).annotate({
  identifier: "AccessPoliciesStatus",
}) as any as S.Schema<AccessPoliciesStatus>;
export interface DescribeServiceAccessPoliciesResponse {
  AccessPolicies: AccessPoliciesStatus;
}
export const DescribeServiceAccessPoliciesResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ AccessPolicies: AccessPoliciesStatus }).pipe(ns),
).annotate({
  identifier: "DescribeServiceAccessPoliciesResponse",
}) as any as S.Schema<DescribeServiceAccessPoliciesResponse>;
export interface DescribeSuggestersRequest {
  DomainName: string;
  SuggesterNames?: string[];
  Deployed?: boolean;
}
export const DescribeSuggestersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    SuggesterNames: S.optional(StandardNameList),
    Deployed: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSuggestersRequest",
}) as any as S.Schema<DescribeSuggestersRequest>;
export type SuggesterStatusList = SuggesterStatus[];
export const SuggesterStatusList = /*@__PURE__*/ S.Array(SuggesterStatus);
export interface DescribeSuggestersResponse {
  Suggesters: SuggesterStatus[];
}
export const DescribeSuggestersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Suggesters: SuggesterStatusList }).pipe(ns),
).annotate({
  identifier: "DescribeSuggestersResponse",
}) as any as S.Schema<DescribeSuggestersResponse>;
export interface IndexDocumentsRequest {
  DomainName: string;
}
export const IndexDocumentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "IndexDocumentsRequest",
}) as any as S.Schema<IndexDocumentsRequest>;
export interface IndexDocumentsResponse {
  FieldNames?: string[];
}
export const IndexDocumentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FieldNames: S.optional(FieldNameList) }).pipe(ns),
).annotate({
  identifier: "IndexDocumentsResponse",
}) as any as S.Schema<IndexDocumentsResponse>;
export interface ListDomainNamesRequest {}
export const ListDomainNamesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDomainNamesRequest",
}) as any as S.Schema<ListDomainNamesRequest>;
export type APIVersion = string;
export type DomainNameMap = { [key: string]: string | undefined };
export const DomainNameMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ListDomainNamesResponse {
  DomainNames?: { [key: string]: string | undefined };
}
export const ListDomainNamesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainNames: S.optional(DomainNameMap) }).pipe(ns),
).annotate({
  identifier: "ListDomainNamesResponse",
}) as any as S.Schema<ListDomainNamesResponse>;
export interface UpdateAvailabilityOptionsRequest {
  DomainName: string;
  MultiAZ: boolean;
}
export const UpdateAvailabilityOptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String, MultiAZ: S.Boolean }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAvailabilityOptionsRequest",
}) as any as S.Schema<UpdateAvailabilityOptionsRequest>;
export interface UpdateAvailabilityOptionsResponse {
  AvailabilityOptions?: AvailabilityOptionsStatus;
}
export const UpdateAvailabilityOptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AvailabilityOptions: S.optional(AvailabilityOptionsStatus) }).pipe(
    ns,
  ),
).annotate({
  identifier: "UpdateAvailabilityOptionsResponse",
}) as any as S.Schema<UpdateAvailabilityOptionsResponse>;
export interface UpdateDomainEndpointOptionsRequest {
  DomainName: string;
  DomainEndpointOptions: DomainEndpointOptions;
}
export const UpdateDomainEndpointOptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.String,
    DomainEndpointOptions: DomainEndpointOptions,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDomainEndpointOptionsRequest",
}) as any as S.Schema<UpdateDomainEndpointOptionsRequest>;
export interface UpdateDomainEndpointOptionsResponse {
  DomainEndpointOptions?: DomainEndpointOptionsStatus;
}
export const UpdateDomainEndpointOptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainEndpointOptions: S.optional(DomainEndpointOptionsStatus),
  }).pipe(ns),
).annotate({
  identifier: "UpdateDomainEndpointOptionsResponse",
}) as any as S.Schema<UpdateDomainEndpointOptionsResponse>;
export interface UpdateScalingParametersRequest {
  DomainName: string;
  ScalingParameters: ScalingParameters;
}
export const UpdateScalingParametersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String, ScalingParameters: ScalingParameters }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateScalingParametersRequest",
}) as any as S.Schema<UpdateScalingParametersRequest>;
export interface UpdateScalingParametersResponse {
  ScalingParameters: ScalingParametersStatus;
}
export const UpdateScalingParametersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScalingParameters: ScalingParametersStatus }).pipe(ns),
).annotate({
  identifier: "UpdateScalingParametersResponse",
}) as any as S.Schema<UpdateScalingParametersResponse>;
export interface UpdateServiceAccessPoliciesRequest {
  DomainName: string;
  AccessPolicies: string;
}
export const UpdateServiceAccessPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainName: S.String, AccessPolicies: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateServiceAccessPoliciesRequest",
}) as any as S.Schema<UpdateServiceAccessPoliciesRequest>;
export interface UpdateServiceAccessPoliciesResponse {
  AccessPolicies: AccessPoliciesStatus;
}
export const UpdateServiceAccessPoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccessPolicies: AccessPoliciesStatus }).pipe(ns),
).annotate({
  identifier: "UpdateServiceAccessPoliciesResponse",
}) as any as S.Schema<UpdateServiceAccessPoliciesResponse>;
export type ErrorCode = string;
export type ErrorMessage = string;
export type BuildSuggestersError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Indexes the search suggestions. For more information, see Configuring Suggesters in the *Amazon CloudSearch Developer Guide*.
 */
export const buildSuggesters: API.OperationMethod<
  BuildSuggestersRequest,
  BuildSuggestersResponse,
  BuildSuggestersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BuildSuggestersRequest,
  output: BuildSuggestersResponse,
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BuildSuggesters",
}));

export type CreateDomainError =
  | BaseException
  | InternalException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new search domain. For more information,
 * see Creating a Search Domain in the *Amazon CloudSearch Developer Guide*.
 */
export const createDomain: API.OperationMethod<
  CreateDomainRequest,
  CreateDomainResponse,
  CreateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDomainRequest,
  output: CreateDomainResponse,
  errors: [
    BaseException,
    InternalException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomain",
}));

export type DefineAnalysisSchemeError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Configures an analysis scheme that can be applied to a `text` or `text-array` field to define language-specific text processing options. For more information, see Configuring Analysis Schemes in the *Amazon CloudSearch Developer Guide*.
 */
export const defineAnalysisScheme: API.OperationMethod<
  DefineAnalysisSchemeRequest,
  DefineAnalysisSchemeResponse,
  DefineAnalysisSchemeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DefineAnalysisSchemeRequest,
  output: DefineAnalysisSchemeResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DefineAnalysisScheme",
}));

export type DefineExpressionError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Configures an `Expression` for the search domain. Used to create new expressions and modify existing ones. If the expression exists, the new configuration replaces the old one. For more information, see Configuring Expressions in the *Amazon CloudSearch Developer Guide*.
 */
export const defineExpression: API.OperationMethod<
  DefineExpressionRequest,
  DefineExpressionResponse,
  DefineExpressionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DefineExpressionRequest,
  output: DefineExpressionResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DefineExpression",
}));

export type DefineIndexFieldError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Configures an `IndexField` for the search domain. Used to create new fields and modify existing ones. You must specify the name of the domain you are configuring and an index field configuration. The index field configuration specifies a unique name, the index field type, and the options you want to configure for the field. The options you can specify depend on the `IndexFieldType`. If the field exists, the new configuration replaces the old one. For more information, see Configuring Index Fields in the *Amazon CloudSearch Developer Guide*.
 */
export const defineIndexField: API.OperationMethod<
  DefineIndexFieldRequest,
  DefineIndexFieldResponse,
  DefineIndexFieldError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DefineIndexFieldRequest,
  output: DefineIndexFieldResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DefineIndexField",
}));

export type DefineSuggesterError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Configures a suggester for a domain. A suggester enables you to display possible matches before users finish typing their queries. When you configure a suggester, you must specify the name of the text field you want to search for possible matches and a unique name for the suggester. For more information, see Getting Search Suggestions in the *Amazon CloudSearch Developer Guide*.
 */
export const defineSuggester: API.OperationMethod<
  DefineSuggesterRequest,
  DefineSuggesterResponse,
  DefineSuggesterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DefineSuggesterRequest,
  output: DefineSuggesterResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DefineSuggester",
}));

export type DeleteAnalysisSchemeError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an analysis scheme. For more information, see Configuring Analysis Schemes in the *Amazon CloudSearch Developer Guide*.
 */
export const deleteAnalysisScheme: API.OperationMethod<
  DeleteAnalysisSchemeRequest,
  DeleteAnalysisSchemeResponse,
  DeleteAnalysisSchemeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAnalysisSchemeRequest,
  output: DeleteAnalysisSchemeResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAnalysisScheme",
}));

export type DeleteDomainError =
  | BaseException
  | InternalException
  | CommonErrors;
/**
 * Permanently deletes a search domain and all of its data. Once a domain has been deleted, it cannot be recovered. For more information,
 * see Deleting a Search Domain in the *Amazon CloudSearch Developer Guide*.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainRequest,
  DeleteDomainResponse,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDomainRequest,
  output: DeleteDomainResponse,
  errors: [BaseException, InternalException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomain",
}));

export type DeleteExpressionError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes an `Expression` from the search domain. For more information, see Configuring Expressions in the *Amazon CloudSearch Developer Guide*.
 */
export const deleteExpression: API.OperationMethod<
  DeleteExpressionRequest,
  DeleteExpressionResponse,
  DeleteExpressionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteExpressionRequest,
  output: DeleteExpressionResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExpression",
}));

export type DeleteIndexFieldError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes an `IndexField` from the search domain. For more information, see Configuring Index Fields in the *Amazon CloudSearch Developer Guide*.
 */
export const deleteIndexField: API.OperationMethod<
  DeleteIndexFieldRequest,
  DeleteIndexFieldResponse,
  DeleteIndexFieldError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIndexFieldRequest,
  output: DeleteIndexFieldResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIndexField",
}));

export type DeleteSuggesterError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a suggester. For more information, see Getting Search Suggestions in the *Amazon CloudSearch Developer Guide*.
 */
export const deleteSuggester: API.OperationMethod<
  DeleteSuggesterRequest,
  DeleteSuggesterResponse,
  DeleteSuggesterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSuggesterRequest,
  output: DeleteSuggesterResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSuggester",
}));

export type DescribeAnalysisSchemesError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the analysis schemes configured for a domain. An analysis scheme defines language-specific text processing options for a `text` field. Can be limited to specific analysis schemes by name. By default, shows all analysis schemes and includes any pending changes to the configuration. Set the `Deployed` option to `true` to show the active configuration and exclude pending changes. For more information, see Configuring Analysis Schemes in the *Amazon CloudSearch Developer Guide*.
 */
export const describeAnalysisSchemes: API.OperationMethod<
  DescribeAnalysisSchemesRequest,
  DescribeAnalysisSchemesResponse,
  DescribeAnalysisSchemesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAnalysisSchemesRequest,
  output: DescribeAnalysisSchemesResponse,
  errors: [BaseException, InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAnalysisSchemes",
}));

export type DescribeAvailabilityOptionsError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the availability options configured for a domain. By default, shows the configuration with any pending changes. Set the `Deployed` option to `true` to show the active configuration and exclude pending changes. For more information, see Configuring Availability Options in the *Amazon CloudSearch Developer Guide*.
 */
export const describeAvailabilityOptions: API.OperationMethod<
  DescribeAvailabilityOptionsRequest,
  DescribeAvailabilityOptionsResponse,
  DescribeAvailabilityOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAvailabilityOptionsRequest,
  output: DescribeAvailabilityOptionsResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAvailabilityOptions",
}));

export type DescribeDomainEndpointOptionsError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the domain's endpoint options, specifically whether all requests to the domain must arrive over HTTPS. For more information, see Configuring Domain Endpoint Options in the *Amazon CloudSearch Developer Guide*.
 */
export const describeDomainEndpointOptions: API.OperationMethod<
  DescribeDomainEndpointOptionsRequest,
  DescribeDomainEndpointOptionsResponse,
  DescribeDomainEndpointOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDomainEndpointOptionsRequest,
  output: DescribeDomainEndpointOptionsResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomainEndpointOptions",
}));

export type DescribeDomainsError =
  | BaseException
  | InternalException
  | CommonErrors;
/**
 * Gets information about the search domains owned by this account. Can be limited to specific domains. Shows
 * all domains by default. To get the number of searchable documents in a domain, use the console or submit a `matchall` request to your domain's search endpoint: `q=matchall&q.parser=structured&size=0`. For more information,
 * see Getting Information about a Search Domain in the *Amazon CloudSearch Developer Guide*.
 */
export const describeDomains: API.OperationMethod<
  DescribeDomainsRequest,
  DescribeDomainsResponse,
  DescribeDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDomainsRequest,
  output: DescribeDomainsResponse,
  errors: [BaseException, InternalException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomains",
}));

export type DescribeExpressionsError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the expressions configured for the search domain. Can be limited to specific expressions by name. By default, shows all expressions and includes any pending changes to the configuration. Set the `Deployed` option to `true` to show the active configuration and exclude pending changes. For more information, see Configuring Expressions in the *Amazon CloudSearch Developer Guide*.
 */
export const describeExpressions: API.OperationMethod<
  DescribeExpressionsRequest,
  DescribeExpressionsResponse,
  DescribeExpressionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeExpressionsRequest,
  output: DescribeExpressionsResponse,
  errors: [BaseException, InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExpressions",
}));

export type DescribeIndexFieldsError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about the index fields configured for the search domain.
 * Can be limited to specific fields by name. By default, shows all fields and includes any pending changes to the configuration. Set the `Deployed` option to `true` to show the active configuration and exclude pending changes. For more information,
 * see Getting Domain Information in the *Amazon CloudSearch Developer Guide*.
 */
export const describeIndexFields: API.OperationMethod<
  DescribeIndexFieldsRequest,
  DescribeIndexFieldsResponse,
  DescribeIndexFieldsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeIndexFieldsRequest,
  output: DescribeIndexFieldsResponse,
  errors: [BaseException, InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIndexFields",
}));

export type DescribeScalingParametersError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the scaling parameters configured for a domain. A domain's scaling parameters specify the desired search instance type and replication count. For more information, see Configuring Scaling Options in the *Amazon CloudSearch Developer Guide*.
 */
export const describeScalingParameters: API.OperationMethod<
  DescribeScalingParametersRequest,
  DescribeScalingParametersResponse,
  DescribeScalingParametersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeScalingParametersRequest,
  output: DescribeScalingParametersResponse,
  errors: [BaseException, InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScalingParameters",
}));

export type DescribeServiceAccessPoliciesError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about the access policies that control access to the domain's document and search endpoints. By default, shows the configuration with any pending changes. Set the `Deployed` option to `true` to show the active configuration and exclude pending changes. For more information,
 * see Configuring Access for a Search Domain in the *Amazon CloudSearch Developer Guide*.
 */
export const describeServiceAccessPolicies: API.OperationMethod<
  DescribeServiceAccessPoliciesRequest,
  DescribeServiceAccessPoliciesResponse,
  DescribeServiceAccessPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeServiceAccessPoliciesRequest,
  output: DescribeServiceAccessPoliciesResponse,
  errors: [BaseException, InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeServiceAccessPolicies",
}));

export type DescribeSuggestersError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the suggesters configured for a domain. A suggester enables you to display possible matches before users finish typing their queries. Can be limited to specific suggesters by name. By default, shows all suggesters and includes any pending changes to the configuration. Set the `Deployed` option to `true` to show the active configuration and exclude pending changes. For more information, see Getting Search Suggestions in the *Amazon CloudSearch Developer Guide*.
 */
export const describeSuggesters: API.OperationMethod<
  DescribeSuggestersRequest,
  DescribeSuggestersResponse,
  DescribeSuggestersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSuggestersRequest,
  output: DescribeSuggestersResponse,
  errors: [BaseException, InternalException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSuggesters",
}));

export type IndexDocumentsError =
  | BaseException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Tells the search domain to start indexing its documents using the latest indexing options. This operation must be invoked to activate options whose OptionStatus is `RequiresIndexDocuments`.
 */
export const indexDocuments: API.OperationMethod<
  IndexDocumentsRequest,
  IndexDocumentsResponse,
  IndexDocumentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: IndexDocumentsRequest,
  output: IndexDocumentsResponse,
  errors: [
    BaseException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IndexDocuments",
}));

export type ListDomainNamesError = BaseException | CommonErrors;
/**
 * Lists all search domains owned by an account.
 */
export const listDomainNames: API.OperationMethod<
  ListDomainNamesRequest,
  ListDomainNamesResponse,
  ListDomainNamesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListDomainNamesRequest,
  output: ListDomainNamesResponse,
  errors: [BaseException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainNames",
}));

export type UpdateAvailabilityOptionsError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Configures the availability options for a domain. Enabling the Multi-AZ option expands an Amazon CloudSearch domain to an additional Availability Zone in the same Region to increase fault tolerance in the event of a service disruption. Changes to the Multi-AZ option can take about half an hour to become active. For more information, see Configuring Availability Options in the *Amazon CloudSearch Developer Guide*.
 */
export const updateAvailabilityOptions: API.OperationMethod<
  UpdateAvailabilityOptionsRequest,
  UpdateAvailabilityOptionsResponse,
  UpdateAvailabilityOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAvailabilityOptionsRequest,
  output: UpdateAvailabilityOptionsResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAvailabilityOptions",
}));

export type UpdateDomainEndpointOptionsError =
  | BaseException
  | DisabledOperationException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the domain's endpoint options, specifically whether all requests to the domain must arrive over HTTPS. For more information, see Configuring Domain Endpoint Options in the *Amazon CloudSearch Developer Guide*.
 */
export const updateDomainEndpointOptions: API.OperationMethod<
  UpdateDomainEndpointOptionsRequest,
  UpdateDomainEndpointOptionsResponse,
  UpdateDomainEndpointOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDomainEndpointOptionsRequest,
  output: UpdateDomainEndpointOptionsResponse,
  errors: [
    BaseException,
    DisabledOperationException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomainEndpointOptions",
}));

export type UpdateScalingParametersError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Configures scaling parameters for a domain. A domain's scaling parameters specify the desired search instance type and replication count. Amazon CloudSearch will still automatically scale your domain based on the volume of data and traffic, but not below the desired instance type and replication count. If the Multi-AZ option is enabled, these values control the resources used per Availability Zone. For more information, see Configuring Scaling Options in the *Amazon CloudSearch Developer Guide*.
 */
export const updateScalingParameters: API.OperationMethod<
  UpdateScalingParametersRequest,
  UpdateScalingParametersResponse,
  UpdateScalingParametersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateScalingParametersRequest,
  output: UpdateScalingParametersResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateScalingParameters",
}));

export type UpdateServiceAccessPoliciesError =
  | BaseException
  | InternalException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Configures the access rules that control access to the domain's document and search endpoints.
 * For more information, see
 * Configuring Access for an Amazon CloudSearch Domain.
 */
export const updateServiceAccessPolicies: API.OperationMethod<
  UpdateServiceAccessPoliciesRequest,
  UpdateServiceAccessPoliciesResponse,
  UpdateServiceAccessPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServiceAccessPoliciesRequest,
  output: UpdateServiceAccessPoliciesResponse,
  errors: [
    BaseException,
    InternalException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceAccessPolicies",
}));
