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
  sdkId: "AmplifyUIBuilder",
  serviceShapeName: "AmplifyUIBuilder",
});
const auth = T.AwsAuthSigv4({ name: "amplifyuibuilder" });
const ver = T.ServiceVersion("2021-08-11");
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
              `https://amplifyuibuilder-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://amplifyuibuilder-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://amplifyuibuilder.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://amplifyuibuilder.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceConflictException
  extends /*@__PURE__*/ S.TaggedError<ResourceConflictException>()(
    "ResourceConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export type ComponentName = string;
export type ComponentType = string;
export interface ComponentPropertyBindingProperties {
  property: string;
  field?: string;
}
export const ComponentPropertyBindingProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ property: S.String, field: S.optional(S.String) }),
).annotate({
  identifier: "ComponentPropertyBindingProperties",
}) as any as S.Schema<ComponentPropertyBindingProperties>;
export interface FormBindingElement {
  element: string;
  property: string;
}
export const FormBindingElement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ element: S.String, property: S.String }),
).annotate({
  identifier: "FormBindingElement",
}) as any as S.Schema<FormBindingElement>;
export type FormBindings = { [key: string]: FormBindingElement | undefined };
export const FormBindings = /*@__PURE__*/ S.Record(
  S.String,
  FormBindingElement.pipe(S.optional),
);
export type ComponentPropertyList = ComponentProperty[];
export const ComponentPropertyList = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<ComponentProperty> => ComponentProperty).annotate({
    identifier: "ComponentProperty",
  }),
) as any as S.Schema<ComponentPropertyList>;
export interface ComponentConditionProperty {
  property?: string;
  field?: string;
  operator?: string;
  operand?: string;
  then?: ComponentProperty;
  else?: ComponentProperty;
  operandType?: string;
}
export const ComponentConditionProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    property: S.optional(S.String),
    field: S.optional(S.String),
    operator: S.optional(S.String),
    operand: S.optional(S.String),
    then: S.optional(
      S.suspend((): S.Schema<ComponentProperty> => ComponentProperty).annotate({
        identifier: "ComponentProperty",
      }),
    ),
    else: S.optional(
      S.suspend((): S.Schema<ComponentProperty> => ComponentProperty).annotate({
        identifier: "ComponentProperty",
      }),
    ),
    operandType: S.optional(S.String),
  }),
).annotate({
  identifier: "ComponentConditionProperty",
}) as any as S.Schema<ComponentConditionProperty>;
export interface ComponentProperty {
  value?: string;
  bindingProperties?: ComponentPropertyBindingProperties;
  collectionBindingProperties?: ComponentPropertyBindingProperties;
  defaultValue?: string;
  model?: string;
  bindings?: { [key: string]: FormBindingElement | undefined };
  event?: string;
  userAttribute?: string;
  concat?: ComponentProperty[];
  condition?: ComponentConditionProperty;
  configured?: boolean;
  type?: string;
  importedValue?: string;
  componentName?: string;
  property?: string;
}
export const ComponentProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    value: S.optional(S.String),
    bindingProperties: S.optional(ComponentPropertyBindingProperties),
    collectionBindingProperties: S.optional(ComponentPropertyBindingProperties),
    defaultValue: S.optional(S.String),
    model: S.optional(S.String),
    bindings: S.optional(FormBindings),
    event: S.optional(S.String),
    userAttribute: S.optional(S.String),
    concat: S.optional(
      S.suspend(() => ComponentPropertyList).annotate({
        identifier: "ComponentPropertyList",
      }),
    ),
    condition: S.optional(
      S.suspend(
        (): S.Schema<ComponentConditionProperty> => ComponentConditionProperty,
      ).annotate({ identifier: "ComponentConditionProperty" }),
    ),
    configured: S.optional(S.Boolean),
    type: S.optional(S.String),
    importedValue: S.optional(S.String),
    componentName: S.optional(S.String),
    property: S.optional(S.String),
  }),
).annotate({
  identifier: "ComponentProperty",
}) as any as S.Schema<ComponentProperty>;
export type ComponentProperties = {
  [key: string]: ComponentProperty | undefined;
};
export const ComponentProperties = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend((): S.Schema<ComponentProperty> => ComponentProperty)
    .annotate({ identifier: "ComponentProperty" })
    .pipe(S.optional),
);
export interface MutationActionSetStateParameter {
  componentName: string;
  property: string;
  set: ComponentProperty;
}
export const MutationActionSetStateParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    componentName: S.String,
    property: S.String,
    set: ComponentProperty,
  }),
).annotate({
  identifier: "MutationActionSetStateParameter",
}) as any as S.Schema<MutationActionSetStateParameter>;
export interface ActionParameters {
  type?: ComponentProperty;
  url?: ComponentProperty;
  anchor?: ComponentProperty;
  target?: ComponentProperty;
  global?: ComponentProperty;
  model?: string;
  id?: ComponentProperty;
  fields?: { [key: string]: ComponentProperty | undefined };
  state?: MutationActionSetStateParameter;
}
export const ActionParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(ComponentProperty),
    url: S.optional(ComponentProperty),
    anchor: S.optional(ComponentProperty),
    target: S.optional(ComponentProperty),
    global: S.optional(ComponentProperty),
    model: S.optional(S.String),
    id: S.optional(ComponentProperty),
    fields: S.optional(ComponentProperties),
    state: S.optional(MutationActionSetStateParameter),
  }),
).annotate({
  identifier: "ActionParameters",
}) as any as S.Schema<ActionParameters>;
export interface ComponentEvent {
  action?: string;
  parameters?: ActionParameters;
  bindingEvent?: string;
}
export const ComponentEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: S.optional(S.String),
    parameters: S.optional(ActionParameters),
    bindingEvent: S.optional(S.String),
  }),
).annotate({ identifier: "ComponentEvent" }) as any as S.Schema<ComponentEvent>;
export type ComponentEvents = { [key: string]: ComponentEvent | undefined };
export const ComponentEvents = /*@__PURE__*/ S.Record(
  S.String,
  ComponentEvent.pipe(S.optional),
);
export interface ComponentChild {
  componentType: string;
  name: string;
  properties: { [key: string]: ComponentProperty | undefined };
  children?: ComponentChild[];
  events?: { [key: string]: ComponentEvent | undefined };
  sourceId?: string;
}
export const ComponentChild = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    componentType: S.String,
    name: S.String,
    properties: ComponentProperties,
    children: S.optional(
      S.suspend(() => ComponentChildList).annotate({
        identifier: "ComponentChildList",
      }),
    ),
    events: S.optional(ComponentEvents),
    sourceId: S.optional(S.String),
  }),
).annotate({ identifier: "ComponentChild" }) as any as S.Schema<ComponentChild>;
export type ComponentChildList = ComponentChild[];
export const ComponentChildList = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<ComponentChild> => ComponentChild).annotate({
    identifier: "ComponentChild",
  }),
) as any as S.Schema<ComponentChildList>;
export type ComponentVariantValues = { [key: string]: string | undefined };
export const ComponentVariantValues = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ComponentOverridesValue = { [key: string]: string | undefined };
export const ComponentOverridesValue = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ComponentOverrides = {
  [key: string]: { [key: string]: string | undefined } | undefined;
};
export const ComponentOverrides = /*@__PURE__*/ S.Record(
  S.String,
  ComponentOverridesValue.pipe(S.optional),
);
export interface ComponentVariant {
  variantValues?: { [key: string]: string | undefined };
  overrides?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
}
export const ComponentVariant = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    variantValues: S.optional(ComponentVariantValues),
    overrides: S.optional(ComponentOverrides),
  }),
).annotate({
  identifier: "ComponentVariant",
}) as any as S.Schema<ComponentVariant>;
export type ComponentVariants = ComponentVariant[];
export const ComponentVariants = /*@__PURE__*/ S.Array(ComponentVariant);
export type OperandType = string;
export interface Predicate {
  or?: Predicate[];
  and?: Predicate[];
  field?: string;
  operator?: string;
  operand?: string;
  operandType?: string;
}
export const Predicate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    or: S.optional(
      S.suspend(() => PredicateList).annotate({ identifier: "PredicateList" }),
    ),
    and: S.optional(
      S.suspend(() => PredicateList).annotate({ identifier: "PredicateList" }),
    ),
    field: S.optional(S.String),
    operator: S.optional(S.String),
    operand: S.optional(S.String),
    operandType: S.optional(S.String),
  }),
).annotate({ identifier: "Predicate" }) as any as S.Schema<Predicate>;
export type PredicateList = Predicate[];
export const PredicateList = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<Predicate> => Predicate).annotate({
    identifier: "Predicate",
  }),
) as any as S.Schema<PredicateList>;
export interface ComponentBindingPropertiesValueProperties {
  model?: string;
  field?: string;
  predicates?: Predicate[];
  userAttribute?: string;
  bucket?: string;
  key?: string;
  defaultValue?: string;
  slotName?: string;
}
export const ComponentBindingPropertiesValueProperties =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      model: S.optional(S.String),
      field: S.optional(S.String),
      predicates: S.optional(PredicateList),
      userAttribute: S.optional(S.String),
      bucket: S.optional(S.String),
      key: S.optional(S.String),
      defaultValue: S.optional(S.String),
      slotName: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ComponentBindingPropertiesValueProperties",
  }) as any as S.Schema<ComponentBindingPropertiesValueProperties>;
export interface ComponentBindingPropertiesValue {
  type?: string;
  bindingProperties?: ComponentBindingPropertiesValueProperties;
  defaultValue?: string;
}
export const ComponentBindingPropertiesValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    bindingProperties: S.optional(ComponentBindingPropertiesValueProperties),
    defaultValue: S.optional(S.String),
  }),
).annotate({
  identifier: "ComponentBindingPropertiesValue",
}) as any as S.Schema<ComponentBindingPropertiesValue>;
export type ComponentBindingProperties = {
  [key: string]: ComponentBindingPropertiesValue | undefined;
};
export const ComponentBindingProperties = /*@__PURE__*/ S.Record(
  S.String,
  ComponentBindingPropertiesValue.pipe(S.optional),
);
export type SortDirection = "ASC" | "DESC" | (string & {});
export const SortDirection = /*@__PURE__*/ S.String;

export interface SortProperty {
  field: string;
  direction: SortDirection;
}
export const SortProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ field: S.String, direction: SortDirection }),
).annotate({ identifier: "SortProperty" }) as any as S.Schema<SortProperty>;
export type SortPropertyList = SortProperty[];
export const SortPropertyList = /*@__PURE__*/ S.Array(SortProperty);
export type IdentifierList = string[];
export const IdentifierList = /*@__PURE__*/ S.Array(S.String);
export interface ComponentDataConfiguration {
  model: string;
  sort?: SortProperty[];
  predicate?: Predicate;
  identifiers?: string[];
}
export const ComponentDataConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    model: S.String,
    sort: S.optional(SortPropertyList),
    predicate: S.optional(Predicate),
    identifiers: S.optional(IdentifierList),
  }),
).annotate({
  identifier: "ComponentDataConfiguration",
}) as any as S.Schema<ComponentDataConfiguration>;
export type ComponentCollectionProperties = {
  [key: string]: ComponentDataConfiguration | undefined;
};
export const ComponentCollectionProperties = /*@__PURE__*/ S.Record(
  S.String,
  ComponentDataConfiguration.pipe(S.optional),
);
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export interface CreateComponentData {
  name: string;
  sourceId?: string;
  componentType: string;
  properties: { [key: string]: ComponentProperty | undefined };
  children?: ComponentChild[];
  variants: ComponentVariant[];
  overrides: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  bindingProperties: {
    [key: string]: ComponentBindingPropertiesValue | undefined;
  };
  collectionProperties?: {
    [key: string]: ComponentDataConfiguration | undefined;
  };
  tags?: { [key: string]: string | undefined };
  events?: { [key: string]: ComponentEvent | undefined };
  schemaVersion?: string;
}
export const CreateComponentData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    sourceId: S.optional(S.String),
    componentType: S.String,
    properties: ComponentProperties,
    children: S.optional(ComponentChildList),
    variants: ComponentVariants,
    overrides: ComponentOverrides,
    bindingProperties: ComponentBindingProperties,
    collectionProperties: S.optional(ComponentCollectionProperties),
    tags: S.optional(Tags),
    events: S.optional(ComponentEvents),
    schemaVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateComponentData",
}) as any as S.Schema<CreateComponentData>;
export interface CreateComponentRequest {
  appId: string;
  environmentName: string;
  clientToken?: string;
  componentToCreate: CreateComponentData;
}
export const CreateComponentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
    componentToCreate: CreateComponentData.pipe(T.HttpPayload()).annotate({
      identifier: "CreateComponentData",
    }),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/app/{appId}/environment/{environmentName}/components",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateComponentRequest",
}) as any as S.Schema<CreateComponentRequest>;
export type Uuid = string;
export interface Component {
  appId: string;
  environmentName: string;
  sourceId?: string;
  id: string;
  name: string;
  componentType: string;
  properties: { [key: string]: ComponentProperty | undefined };
  children?: ComponentChild[];
  variants: ComponentVariant[];
  overrides: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  bindingProperties: {
    [key: string]: ComponentBindingPropertiesValue | undefined;
  };
  collectionProperties?: {
    [key: string]: ComponentDataConfiguration | undefined;
  };
  createdAt: Date;
  modifiedAt?: Date;
  tags?: { [key: string]: string | undefined };
  events?: { [key: string]: ComponentEvent | undefined };
  schemaVersion?: string;
}
export const Component = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String,
    environmentName: S.String,
    sourceId: S.optional(S.String),
    id: S.String,
    name: S.String,
    componentType: S.String,
    properties: ComponentProperties,
    children: S.optional(ComponentChildList),
    variants: ComponentVariants,
    overrides: ComponentOverrides,
    bindingProperties: ComponentBindingProperties,
    collectionProperties: S.optional(ComponentCollectionProperties),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    modifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    tags: S.optional(Tags),
    events: S.optional(ComponentEvents),
    schemaVersion: S.optional(S.String),
  }),
).annotate({ identifier: "Component" }) as any as S.Schema<Component>;
export interface CreateComponentResponse {
  entity?: Component;
}
export const CreateComponentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entity: S.optional(Component)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "Component" }),
  }),
).annotate({
  identifier: "CreateComponentResponse",
}) as any as S.Schema<CreateComponentResponse>;
export type FormName = string;
export type FormDataSourceType = string;
export interface FormDataTypeConfig {
  dataSourceType: string;
  dataTypeName: string;
}
export const FormDataTypeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dataSourceType: S.String, dataTypeName: S.String }),
).annotate({
  identifier: "FormDataTypeConfig",
}) as any as S.Schema<FormDataTypeConfig>;
export type FormActionType = "create" | "update" | (string & {});
export const FormActionType = /*@__PURE__*/ S.String;

export type FixedPosition = "first" | (string & {});
export const FixedPosition = /*@__PURE__*/ S.String;

export type FieldPosition =
  | { fixed: FixedPosition; rightOf?: never; below?: never }
  | { fixed?: never; rightOf: string; below?: never }
  | { fixed?: never; rightOf?: never; below: string };
export const FieldPosition = /*@__PURE__*/ S.Union([
  S.Struct({ fixed: FixedPosition }),
  S.Struct({ rightOf: S.String }),
  S.Struct({ below: S.String }),
]);
export interface FormInputValuePropertyBindingProperties {
  property: string;
  field?: string;
}
export const FormInputValuePropertyBindingProperties = /*@__PURE__*/ S.suspend(
  () => S.Struct({ property: S.String, field: S.optional(S.String) }),
).annotate({
  identifier: "FormInputValuePropertyBindingProperties",
}) as any as S.Schema<FormInputValuePropertyBindingProperties>;
export type FormInputValuePropertyList = FormInputValueProperty[];
export const FormInputValuePropertyList = /*@__PURE__*/ S.Array(
  S.suspend(
    (): S.Schema<FormInputValueProperty> => FormInputValueProperty,
  ).annotate({ identifier: "FormInputValueProperty" }),
) as any as S.Schema<FormInputValuePropertyList>;
export interface FormInputValueProperty {
  value?: string;
  bindingProperties?: FormInputValuePropertyBindingProperties;
  concat?: FormInputValueProperty[];
}
export const FormInputValueProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    value: S.optional(S.String),
    bindingProperties: S.optional(FormInputValuePropertyBindingProperties),
    concat: S.optional(
      S.suspend(() => FormInputValuePropertyList).annotate({
        identifier: "FormInputValuePropertyList",
      }),
    ),
  }),
).annotate({
  identifier: "FormInputValueProperty",
}) as any as S.Schema<FormInputValueProperty>;
export interface ValueMapping {
  displayValue?: FormInputValueProperty;
  value: FormInputValueProperty;
}
export const ValueMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    displayValue: S.optional(FormInputValueProperty),
    value: FormInputValueProperty,
  }),
).annotate({ identifier: "ValueMapping" }) as any as S.Schema<ValueMapping>;
export type ValueMappingList = ValueMapping[];
export const ValueMappingList = /*@__PURE__*/ S.Array(ValueMapping);
export interface FormInputBindingPropertiesValueProperties {
  model?: string;
}
export const FormInputBindingPropertiesValueProperties =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ model: S.optional(S.String) }),
  ).annotate({
    identifier: "FormInputBindingPropertiesValueProperties",
  }) as any as S.Schema<FormInputBindingPropertiesValueProperties>;
export interface FormInputBindingPropertiesValue {
  type?: string;
  bindingProperties?: FormInputBindingPropertiesValueProperties;
}
export const FormInputBindingPropertiesValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    bindingProperties: S.optional(FormInputBindingPropertiesValueProperties),
  }),
).annotate({
  identifier: "FormInputBindingPropertiesValue",
}) as any as S.Schema<FormInputBindingPropertiesValue>;
export type FormInputBindingProperties = {
  [key: string]: FormInputBindingPropertiesValue | undefined;
};
export const FormInputBindingProperties = /*@__PURE__*/ S.Record(
  S.String,
  FormInputBindingPropertiesValue.pipe(S.optional),
);
export interface ValueMappings {
  values: ValueMapping[];
  bindingProperties?: {
    [key: string]: FormInputBindingPropertiesValue | undefined;
  };
}
export const ValueMappings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    values: ValueMappingList,
    bindingProperties: S.optional(FormInputBindingProperties),
  }),
).annotate({ identifier: "ValueMappings" }) as any as S.Schema<ValueMappings>;
export type StorageAccessLevel =
  | "public"
  | "protected"
  | "private"
  | (string & {});
export const StorageAccessLevel = /*@__PURE__*/ S.String;

export type StrValues = string[];
export const StrValues = /*@__PURE__*/ S.Array(S.String);
export interface FileUploaderFieldConfig {
  accessLevel: StorageAccessLevel;
  acceptedFileTypes: string[];
  showThumbnails?: boolean;
  isResumable?: boolean;
  maxFileCount?: number;
  maxSize?: number;
}
export const FileUploaderFieldConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessLevel: StorageAccessLevel,
    acceptedFileTypes: StrValues,
    showThumbnails: S.optional(S.Boolean),
    isResumable: S.optional(S.Boolean),
    maxFileCount: S.optional(S.Number),
    maxSize: S.optional(S.Number),
  }),
).annotate({
  identifier: "FileUploaderFieldConfig",
}) as any as S.Schema<FileUploaderFieldConfig>;
export interface FieldInputConfig {
  type: string;
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  defaultValue?: string;
  descriptiveText?: string;
  defaultChecked?: boolean;
  defaultCountryCode?: string;
  valueMappings?: ValueMappings;
  name?: string;
  minValue?: number;
  maxValue?: number;
  step?: number;
  value?: string;
  isArray?: boolean;
  fileUploaderConfig?: FileUploaderFieldConfig;
}
export const FieldInputConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.String,
    required: S.optional(S.Boolean),
    readOnly: S.optional(S.Boolean),
    placeholder: S.optional(S.String),
    defaultValue: S.optional(S.String),
    descriptiveText: S.optional(S.String),
    defaultChecked: S.optional(S.Boolean),
    defaultCountryCode: S.optional(S.String),
    valueMappings: S.optional(ValueMappings),
    name: S.optional(S.String),
    minValue: S.optional(S.Number),
    maxValue: S.optional(S.Number),
    step: S.optional(S.Number),
    value: S.optional(S.String),
    isArray: S.optional(S.Boolean),
    fileUploaderConfig: S.optional(FileUploaderFieldConfig),
  }),
).annotate({
  identifier: "FieldInputConfig",
}) as any as S.Schema<FieldInputConfig>;
export type NumValues = number[];
export const NumValues = /*@__PURE__*/ S.Array(S.Number);
export interface FieldValidationConfiguration {
  type: string;
  strValues?: string[];
  numValues?: number[];
  validationMessage?: string;
}
export const FieldValidationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.String,
    strValues: S.optional(StrValues),
    numValues: S.optional(NumValues),
    validationMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "FieldValidationConfiguration",
}) as any as S.Schema<FieldValidationConfiguration>;
export type ValidationsList = FieldValidationConfiguration[];
export const ValidationsList = /*@__PURE__*/ S.Array(
  FieldValidationConfiguration,
);
export interface FieldConfig {
  label?: string;
  position?: FieldPosition;
  excluded?: boolean;
  inputType?: FieldInputConfig;
  validations?: FieldValidationConfiguration[];
}
export const FieldConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    label: S.optional(S.String),
    position: S.optional(FieldPosition),
    excluded: S.optional(S.Boolean),
    inputType: S.optional(FieldInputConfig),
    validations: S.optional(ValidationsList),
  }),
).annotate({ identifier: "FieldConfig" }) as any as S.Schema<FieldConfig>;
export type FieldsMap = { [key: string]: FieldConfig | undefined };
export const FieldsMap = /*@__PURE__*/ S.Record(
  S.String,
  FieldConfig.pipe(S.optional),
);
export type FormStyleConfig =
  | { tokenReference: string; value?: never }
  | { tokenReference?: never; value: string };
export const FormStyleConfig = /*@__PURE__*/ S.Union([
  S.Struct({ tokenReference: S.String }),
  S.Struct({ value: S.String }),
]);
export interface FormStyle {
  horizontalGap?: FormStyleConfig;
  verticalGap?: FormStyleConfig;
  outerPadding?: FormStyleConfig;
}
export const FormStyle = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    horizontalGap: S.optional(FormStyleConfig),
    verticalGap: S.optional(FormStyleConfig),
    outerPadding: S.optional(FormStyleConfig),
  }),
).annotate({ identifier: "FormStyle" }) as any as S.Schema<FormStyle>;
export interface SectionalElement {
  type: string;
  position?: FieldPosition;
  text?: string;
  level?: number;
  orientation?: string;
  excluded?: boolean;
}
export const SectionalElement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.String,
    position: S.optional(FieldPosition),
    text: S.optional(S.String),
    level: S.optional(S.Number),
    orientation: S.optional(S.String),
    excluded: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "SectionalElement",
}) as any as S.Schema<SectionalElement>;
export type SectionalElementMap = {
  [key: string]: SectionalElement | undefined;
};
export const SectionalElementMap = /*@__PURE__*/ S.Record(
  S.String,
  SectionalElement.pipe(S.optional),
);
export type FormButtonsPosition =
  | "top"
  | "bottom"
  | "top_and_bottom"
  | (string & {});
export const FormButtonsPosition = /*@__PURE__*/ S.String;

export interface FormButton {
  excluded?: boolean;
  children?: string;
  position?: FieldPosition;
}
export const FormButton = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    excluded: S.optional(S.Boolean),
    children: S.optional(S.String),
    position: S.optional(FieldPosition),
  }),
).annotate({ identifier: "FormButton" }) as any as S.Schema<FormButton>;
export interface FormCTA {
  position?: FormButtonsPosition;
  clear?: FormButton;
  cancel?: FormButton;
  submit?: FormButton;
}
export const FormCTA = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    position: S.optional(FormButtonsPosition),
    clear: S.optional(FormButton),
    cancel: S.optional(FormButton),
    submit: S.optional(FormButton),
  }),
).annotate({ identifier: "FormCTA" }) as any as S.Schema<FormCTA>;
export type LabelDecorator = string;
export interface CreateFormData {
  name: string;
  dataType: FormDataTypeConfig;
  formActionType: FormActionType;
  fields: { [key: string]: FieldConfig | undefined };
  style: FormStyle;
  sectionalElements: { [key: string]: SectionalElement | undefined };
  schemaVersion: string;
  cta?: FormCTA;
  tags?: { [key: string]: string | undefined };
  labelDecorator?: string;
}
export const CreateFormData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    dataType: FormDataTypeConfig,
    formActionType: FormActionType,
    fields: FieldsMap,
    style: FormStyle,
    sectionalElements: SectionalElementMap,
    schemaVersion: S.String,
    cta: S.optional(FormCTA),
    tags: S.optional(Tags),
    labelDecorator: S.optional(S.String),
  }),
).annotate({ identifier: "CreateFormData" }) as any as S.Schema<CreateFormData>;
export interface CreateFormRequest {
  appId: string;
  environmentName: string;
  clientToken?: string;
  formToCreate: CreateFormData;
}
export const CreateFormRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
    formToCreate: CreateFormData.pipe(T.HttpPayload()).annotate({
      identifier: "CreateFormData",
    }),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/app/{appId}/environment/{environmentName}/forms",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFormRequest",
}) as any as S.Schema<CreateFormRequest>;
export interface Form {
  appId: string;
  environmentName: string;
  id: string;
  name: string;
  formActionType: FormActionType;
  style: FormStyle;
  dataType: FormDataTypeConfig;
  fields: { [key: string]: FieldConfig | undefined };
  sectionalElements: { [key: string]: SectionalElement | undefined };
  schemaVersion: string;
  tags?: { [key: string]: string | undefined };
  cta?: FormCTA;
  labelDecorator?: string;
}
export const Form = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String,
    environmentName: S.String,
    id: S.String,
    name: S.String,
    formActionType: FormActionType,
    style: FormStyle,
    dataType: FormDataTypeConfig,
    fields: FieldsMap,
    sectionalElements: SectionalElementMap,
    schemaVersion: S.String,
    tags: S.optional(Tags),
    cta: S.optional(FormCTA),
    labelDecorator: S.optional(S.String),
  }),
).annotate({ identifier: "Form" }) as any as S.Schema<Form>;
export interface CreateFormResponse {
  entity?: Form;
}
export const CreateFormResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entity: S.optional(Form)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "Form" }),
  }),
).annotate({
  identifier: "CreateFormResponse",
}) as any as S.Schema<CreateFormResponse>;
export type ThemeName = string;
export interface ThemeValue {
  value?: string;
  children?: ThemeValues[];
}
export const ThemeValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    value: S.optional(S.String),
    children: S.optional(
      S.suspend(() => ThemeValuesList).annotate({
        identifier: "ThemeValuesList",
      }),
    ),
  }),
).annotate({ identifier: "ThemeValue" }) as any as S.Schema<ThemeValue>;
export interface ThemeValues {
  key?: string;
  value?: ThemeValue;
}
export const ThemeValues = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    key: S.optional(S.String),
    value: S.optional(
      S.suspend((): S.Schema<ThemeValue> => ThemeValue).annotate({
        identifier: "ThemeValue",
      }),
    ),
  }),
).annotate({ identifier: "ThemeValues" }) as any as S.Schema<ThemeValues>;
export type ThemeValuesList = ThemeValues[];
export const ThemeValuesList = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<ThemeValues> => ThemeValues).annotate({
    identifier: "ThemeValues",
  }),
) as any as S.Schema<ThemeValuesList>;
export interface CreateThemeData {
  name: string;
  values: ThemeValues[];
  overrides?: ThemeValues[];
  tags?: { [key: string]: string | undefined };
}
export const CreateThemeData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    values: ThemeValuesList,
    overrides: S.optional(ThemeValuesList),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "CreateThemeData",
}) as any as S.Schema<CreateThemeData>;
export interface CreateThemeRequest {
  appId: string;
  environmentName: string;
  clientToken?: string;
  themeToCreate: CreateThemeData;
}
export const CreateThemeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
    themeToCreate: CreateThemeData.pipe(T.HttpPayload()).annotate({
      identifier: "CreateThemeData",
    }),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/app/{appId}/environment/{environmentName}/themes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateThemeRequest",
}) as any as S.Schema<CreateThemeRequest>;
export interface Theme {
  appId: string;
  environmentName: string;
  id: string;
  name: string;
  createdAt: Date;
  modifiedAt?: Date;
  values: ThemeValues[];
  overrides?: ThemeValues[];
  tags?: { [key: string]: string | undefined };
}
export const Theme = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String,
    environmentName: S.String,
    id: S.String,
    name: S.String,
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    modifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    values: ThemeValuesList,
    overrides: S.optional(ThemeValuesList),
    tags: S.optional(Tags),
  }),
).annotate({ identifier: "Theme" }) as any as S.Schema<Theme>;
export interface CreateThemeResponse {
  entity?: Theme;
}
export const CreateThemeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entity: S.optional(Theme)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "Theme" }),
  }),
).annotate({
  identifier: "CreateThemeResponse",
}) as any as S.Schema<CreateThemeResponse>;
export interface DeleteComponentRequest {
  appId: string;
  environmentName: string;
  id: string;
}
export const DeleteComponentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
    id: S.String.pipe(T.HttpLabel("id")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/app/{appId}/environment/{environmentName}/components/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteComponentRequest",
}) as any as S.Schema<DeleteComponentRequest>;
export interface DeleteComponentResponse {}
export const DeleteComponentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteComponentResponse",
}) as any as S.Schema<DeleteComponentResponse>;
export interface DeleteFormRequest {
  appId: string;
  environmentName: string;
  id: string;
}
export const DeleteFormRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
    id: S.String.pipe(T.HttpLabel("id")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/app/{appId}/environment/{environmentName}/forms/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFormRequest",
}) as any as S.Schema<DeleteFormRequest>;
export interface DeleteFormResponse {}
export const DeleteFormResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteFormResponse",
}) as any as S.Schema<DeleteFormResponse>;
export interface DeleteThemeRequest {
  appId: string;
  environmentName: string;
  id: string;
}
export const DeleteThemeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
    id: S.String.pipe(T.HttpLabel("id")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/app/{appId}/environment/{environmentName}/themes/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteThemeRequest",
}) as any as S.Schema<DeleteThemeRequest>;
export interface DeleteThemeResponse {}
export const DeleteThemeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteThemeResponse",
}) as any as S.Schema<DeleteThemeResponse>;
export type TokenProviders = string;
export type SensitiveString = string | redacted.Redacted<string>;
export interface ExchangeCodeForTokenRequestBody {
  code: string | redacted.Redacted<string>;
  redirectUri: string;
  clientId?: string | redacted.Redacted<string>;
}
export const ExchangeCodeForTokenRequestBody = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    code: SensitiveString,
    redirectUri: S.String,
    clientId: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ExchangeCodeForTokenRequestBody",
}) as any as S.Schema<ExchangeCodeForTokenRequestBody>;
export interface ExchangeCodeForTokenRequest {
  provider: string;
  request: ExchangeCodeForTokenRequestBody;
}
export const ExchangeCodeForTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    provider: S.String.pipe(T.HttpLabel("provider")),
    request: ExchangeCodeForTokenRequestBody.pipe(T.HttpPayload()).annotate({
      identifier: "ExchangeCodeForTokenRequestBody",
    }),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tokens/{provider}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExchangeCodeForTokenRequest",
}) as any as S.Schema<ExchangeCodeForTokenRequest>;
export interface ExchangeCodeForTokenResponse {
  accessToken: string | redacted.Redacted<string>;
  expiresIn: number;
  refreshToken: string | redacted.Redacted<string>;
}
export const ExchangeCodeForTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessToken: SensitiveString,
    expiresIn: S.Number,
    refreshToken: SensitiveString,
  }),
).annotate({
  identifier: "ExchangeCodeForTokenResponse",
}) as any as S.Schema<ExchangeCodeForTokenResponse>;
export interface ExportComponentsRequest {
  appId: string;
  environmentName: string;
  nextToken?: string;
}
export const ExportComponentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/export/app/{appId}/environment/{environmentName}/components",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExportComponentsRequest",
}) as any as S.Schema<ExportComponentsRequest>;
export type ComponentList = Component[];
export const ComponentList = /*@__PURE__*/ S.Array(Component);
export interface ExportComponentsResponse {
  entities: Component[];
  nextToken?: string;
}
export const ExportComponentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ entities: ComponentList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ExportComponentsResponse",
}) as any as S.Schema<ExportComponentsResponse>;
export interface ExportFormsRequest {
  appId: string;
  environmentName: string;
  nextToken?: string;
}
export const ExportFormsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/export/app/{appId}/environment/{environmentName}/forms",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExportFormsRequest",
}) as any as S.Schema<ExportFormsRequest>;
export type FormList = Form[];
export const FormList = /*@__PURE__*/ S.Array(Form);
export interface ExportFormsResponse {
  entities: Form[];
  nextToken?: string;
}
export const ExportFormsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ entities: FormList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ExportFormsResponse",
}) as any as S.Schema<ExportFormsResponse>;
export interface ExportThemesRequest {
  appId: string;
  environmentName: string;
  nextToken?: string;
}
export const ExportThemesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/export/app/{appId}/environment/{environmentName}/themes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExportThemesRequest",
}) as any as S.Schema<ExportThemesRequest>;
export type ThemeList = Theme[];
export const ThemeList = /*@__PURE__*/ S.Array(Theme);
export interface ExportThemesResponse {
  entities: Theme[];
  nextToken?: string;
}
export const ExportThemesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ entities: ThemeList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ExportThemesResponse",
}) as any as S.Schema<ExportThemesResponse>;
export type AppId = string;
export interface GetCodegenJobRequest {
  appId: string;
  environmentName: string;
  id: string;
}
export const GetCodegenJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
    id: S.String.pipe(T.HttpLabel("id")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/app/{appId}/environment/{environmentName}/codegen-jobs/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCodegenJobRequest",
}) as any as S.Schema<GetCodegenJobRequest>;
export type JSModule = "es2020" | "esnext" | (string & {});
export const JSModule = /*@__PURE__*/ S.String;

export type JSTarget = "es2015" | "es2020" | (string & {});
export const JSTarget = /*@__PURE__*/ S.String;

export type JSScript = "jsx" | "tsx" | "js" | (string & {});
export const JSScript = /*@__PURE__*/ S.String;

export interface GraphQLRenderConfig {
  typesFilePath: string;
  queriesFilePath: string;
  mutationsFilePath: string;
  subscriptionsFilePath: string;
  fragmentsFilePath: string;
}
export const GraphQLRenderConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    typesFilePath: S.String,
    queriesFilePath: S.String,
    mutationsFilePath: S.String,
    subscriptionsFilePath: S.String,
    fragmentsFilePath: S.String,
  }),
).annotate({
  identifier: "GraphQLRenderConfig",
}) as any as S.Schema<GraphQLRenderConfig>;
export interface DataStoreRenderConfig {}
export const DataStoreRenderConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DataStoreRenderConfig",
}) as any as S.Schema<DataStoreRenderConfig>;
export interface NoApiRenderConfig {}
export const NoApiRenderConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "NoApiRenderConfig",
}) as any as S.Schema<NoApiRenderConfig>;
export type ApiConfiguration =
  | {
      graphQLConfig: GraphQLRenderConfig;
      dataStoreConfig?: never;
      noApiConfig?: never;
    }
  | {
      graphQLConfig?: never;
      dataStoreConfig: DataStoreRenderConfig;
      noApiConfig?: never;
    }
  | {
      graphQLConfig?: never;
      dataStoreConfig?: never;
      noApiConfig: NoApiRenderConfig;
    };
export const ApiConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ graphQLConfig: GraphQLRenderConfig }),
  S.Struct({ dataStoreConfig: DataStoreRenderConfig }),
  S.Struct({ noApiConfig: NoApiRenderConfig }),
]);
export type ReactCodegenDependencies = { [key: string]: string | undefined };
export const ReactCodegenDependencies = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ReactStartCodegenJobData {
  module?: JSModule;
  target?: JSTarget;
  script?: JSScript;
  renderTypeDeclarations?: boolean;
  inlineSourceMap?: boolean;
  apiConfiguration?: ApiConfiguration;
  dependencies?: { [key: string]: string | undefined };
}
export const ReactStartCodegenJobData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    module: S.optional(JSModule),
    target: S.optional(JSTarget),
    script: S.optional(JSScript),
    renderTypeDeclarations: S.optional(S.Boolean),
    inlineSourceMap: S.optional(S.Boolean),
    apiConfiguration: S.optional(ApiConfiguration),
    dependencies: S.optional(ReactCodegenDependencies),
  }),
).annotate({
  identifier: "ReactStartCodegenJobData",
}) as any as S.Schema<ReactStartCodegenJobData>;
export type CodegenJobRenderConfig = { react: ReactStartCodegenJobData };
export const CodegenJobRenderConfig = /*@__PURE__*/ S.Union([
  S.Struct({ react: ReactStartCodegenJobData }),
]);
export type CodegenJobGenericDataSourceType = "DataStore" | (string & {});
export const CodegenJobGenericDataSourceType = /*@__PURE__*/ S.String;

export type CodegenGenericDataFieldDataType =
  | "ID"
  | "String"
  | "Int"
  | "Float"
  | "AWSDate"
  | "AWSTime"
  | "AWSDateTime"
  | "AWSTimestamp"
  | "AWSEmail"
  | "AWSURL"
  | "AWSIPAddress"
  | "Boolean"
  | "AWSJSON"
  | "AWSPhone"
  | "Enum"
  | "Model"
  | "NonModel"
  | (string & {});
export const CodegenGenericDataFieldDataType = /*@__PURE__*/ S.String;

export type GenericDataRelationshipType =
  | "HAS_MANY"
  | "HAS_ONE"
  | "BELONGS_TO"
  | (string & {});
export const GenericDataRelationshipType = /*@__PURE__*/ S.String;

export type RelatedModelFieldsList = string[];
export const RelatedModelFieldsList = /*@__PURE__*/ S.Array(S.String);
export type AssociatedFieldsList = string[];
export const AssociatedFieldsList = /*@__PURE__*/ S.Array(S.String);
export interface CodegenGenericDataRelationshipType {
  type: GenericDataRelationshipType;
  relatedModelName: string;
  relatedModelFields?: string[];
  canUnlinkAssociatedModel?: boolean;
  relatedJoinFieldName?: string;
  relatedJoinTableName?: string;
  belongsToFieldOnRelatedModel?: string;
  associatedFields?: string[];
  isHasManyIndex?: boolean;
}
export const CodegenGenericDataRelationshipType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: GenericDataRelationshipType,
    relatedModelName: S.String,
    relatedModelFields: S.optional(RelatedModelFieldsList),
    canUnlinkAssociatedModel: S.optional(S.Boolean),
    relatedJoinFieldName: S.optional(S.String),
    relatedJoinTableName: S.optional(S.String),
    belongsToFieldOnRelatedModel: S.optional(S.String),
    associatedFields: S.optional(AssociatedFieldsList),
    isHasManyIndex: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "CodegenGenericDataRelationshipType",
}) as any as S.Schema<CodegenGenericDataRelationshipType>;
export interface CodegenGenericDataField {
  dataType: CodegenGenericDataFieldDataType;
  dataTypeValue: string;
  required: boolean;
  readOnly: boolean;
  isArray: boolean;
  relationship?: CodegenGenericDataRelationshipType;
}
export const CodegenGenericDataField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataType: CodegenGenericDataFieldDataType,
    dataTypeValue: S.String,
    required: S.Boolean,
    readOnly: S.Boolean,
    isArray: S.Boolean,
    relationship: S.optional(CodegenGenericDataRelationshipType),
  }),
).annotate({
  identifier: "CodegenGenericDataField",
}) as any as S.Schema<CodegenGenericDataField>;
export type CodegenGenericDataFields = {
  [key: string]: CodegenGenericDataField | undefined;
};
export const CodegenGenericDataFields = /*@__PURE__*/ S.Record(
  S.String,
  CodegenGenericDataField.pipe(S.optional),
);
export type CodegenPrimaryKeysList = string[];
export const CodegenPrimaryKeysList = /*@__PURE__*/ S.Array(S.String);
export interface CodegenGenericDataModel {
  fields: { [key: string]: CodegenGenericDataField | undefined };
  isJoinTable?: boolean;
  primaryKeys: string[];
}
export const CodegenGenericDataModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    fields: CodegenGenericDataFields,
    isJoinTable: S.optional(S.Boolean),
    primaryKeys: CodegenPrimaryKeysList,
  }),
).annotate({
  identifier: "CodegenGenericDataModel",
}) as any as S.Schema<CodegenGenericDataModel>;
export type CodegenGenericDataModels = {
  [key: string]: CodegenGenericDataModel | undefined;
};
export const CodegenGenericDataModels = /*@__PURE__*/ S.Record(
  S.String,
  CodegenGenericDataModel.pipe(S.optional),
);
export type CodegenGenericDataEnumValuesList = string[];
export const CodegenGenericDataEnumValuesList = /*@__PURE__*/ S.Array(S.String);
export interface CodegenGenericDataEnum {
  values: string[];
}
export const CodegenGenericDataEnum = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ values: CodegenGenericDataEnumValuesList }),
).annotate({
  identifier: "CodegenGenericDataEnum",
}) as any as S.Schema<CodegenGenericDataEnum>;
export type CodegenGenericDataEnums = {
  [key: string]: CodegenGenericDataEnum | undefined;
};
export const CodegenGenericDataEnums = /*@__PURE__*/ S.Record(
  S.String,
  CodegenGenericDataEnum.pipe(S.optional),
);
export type CodegenGenericDataNonModelFields = {
  [key: string]: CodegenGenericDataField | undefined;
};
export const CodegenGenericDataNonModelFields = /*@__PURE__*/ S.Record(
  S.String,
  CodegenGenericDataField.pipe(S.optional),
);
export interface CodegenGenericDataNonModel {
  fields: { [key: string]: CodegenGenericDataField | undefined };
}
export const CodegenGenericDataNonModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ fields: CodegenGenericDataNonModelFields }),
).annotate({
  identifier: "CodegenGenericDataNonModel",
}) as any as S.Schema<CodegenGenericDataNonModel>;
export type CodegenGenericDataNonModels = {
  [key: string]: CodegenGenericDataNonModel | undefined;
};
export const CodegenGenericDataNonModels = /*@__PURE__*/ S.Record(
  S.String,
  CodegenGenericDataNonModel.pipe(S.optional),
);
export interface CodegenJobGenericDataSchema {
  dataSourceType: CodegenJobGenericDataSourceType;
  models: { [key: string]: CodegenGenericDataModel | undefined };
  enums: { [key: string]: CodegenGenericDataEnum | undefined };
  nonModels: { [key: string]: CodegenGenericDataNonModel | undefined };
}
export const CodegenJobGenericDataSchema = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataSourceType: CodegenJobGenericDataSourceType,
    models: CodegenGenericDataModels,
    enums: CodegenGenericDataEnums,
    nonModels: CodegenGenericDataNonModels,
  }),
).annotate({
  identifier: "CodegenJobGenericDataSchema",
}) as any as S.Schema<CodegenJobGenericDataSchema>;
export interface CodegenFeatureFlags {
  isRelationshipSupported?: boolean;
  isNonModelSupported?: boolean;
}
export const CodegenFeatureFlags = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    isRelationshipSupported: S.optional(S.Boolean),
    isNonModelSupported: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "CodegenFeatureFlags",
}) as any as S.Schema<CodegenFeatureFlags>;
export type CodegenJobStatus =
  | "in_progress"
  | "failed"
  | "succeeded"
  | (string & {});
export const CodegenJobStatus = /*@__PURE__*/ S.String;

export interface CodegenJobAsset {
  downloadUrl?: string;
}
export const CodegenJobAsset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ downloadUrl: S.optional(S.String) }),
).annotate({
  identifier: "CodegenJobAsset",
}) as any as S.Schema<CodegenJobAsset>;
export interface CodegenDependency {
  name?: string;
  supportedVersion?: string;
  isSemVer?: boolean;
  reason?: string;
}
export const CodegenDependency = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    supportedVersion: S.optional(S.String),
    isSemVer: S.optional(S.Boolean),
    reason: S.optional(S.String),
  }),
).annotate({
  identifier: "CodegenDependency",
}) as any as S.Schema<CodegenDependency>;
export type CodegenDependencies = CodegenDependency[];
export const CodegenDependencies = /*@__PURE__*/ S.Array(CodegenDependency);
export interface CodegenJob {
  id: string;
  appId: string;
  environmentName: string;
  renderConfig?: CodegenJobRenderConfig;
  genericDataSchema?: CodegenJobGenericDataSchema;
  autoGenerateForms?: boolean;
  features?: CodegenFeatureFlags;
  status?: CodegenJobStatus;
  statusMessage?: string;
  asset?: CodegenJobAsset;
  tags?: { [key: string]: string | undefined };
  createdAt?: Date;
  modifiedAt?: Date;
  dependencies?: CodegenDependency[];
}
export const CodegenJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    appId: S.String,
    environmentName: S.String,
    renderConfig: S.optional(CodegenJobRenderConfig),
    genericDataSchema: S.optional(CodegenJobGenericDataSchema),
    autoGenerateForms: S.optional(S.Boolean),
    features: S.optional(CodegenFeatureFlags),
    status: S.optional(CodegenJobStatus),
    statusMessage: S.optional(S.String),
    asset: S.optional(CodegenJobAsset),
    tags: S.optional(Tags),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    modifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    dependencies: S.optional(CodegenDependencies),
  }),
).annotate({ identifier: "CodegenJob" }) as any as S.Schema<CodegenJob>;
export interface GetCodegenJobResponse {
  job?: CodegenJob;
}
export const GetCodegenJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    job: S.optional(CodegenJob)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "CodegenJob" }),
  }),
).annotate({
  identifier: "GetCodegenJobResponse",
}) as any as S.Schema<GetCodegenJobResponse>;
export interface GetComponentRequest {
  appId: string;
  environmentName: string;
  id: string;
}
export const GetComponentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
    id: S.String.pipe(T.HttpLabel("id")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/app/{appId}/environment/{environmentName}/components/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetComponentRequest",
}) as any as S.Schema<GetComponentRequest>;
export interface GetComponentResponse {
  component?: Component;
}
export const GetComponentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    component: S.optional(Component)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "Component" }),
  }),
).annotate({
  identifier: "GetComponentResponse",
}) as any as S.Schema<GetComponentResponse>;
export interface GetFormRequest {
  appId: string;
  environmentName: string;
  id: string;
}
export const GetFormRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
    id: S.String.pipe(T.HttpLabel("id")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/app/{appId}/environment/{environmentName}/forms/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetFormRequest" }) as any as S.Schema<GetFormRequest>;
export interface GetFormResponse {
  form?: Form;
}
export const GetFormResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    form: S.optional(Form)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "Form" }),
  }),
).annotate({
  identifier: "GetFormResponse",
}) as any as S.Schema<GetFormResponse>;
export interface GetMetadataRequest {
  appId: string;
  environmentName: string;
}
export const GetMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/app/{appId}/environment/{environmentName}/metadata",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMetadataRequest",
}) as any as S.Schema<GetMetadataRequest>;
export type FeaturesMap = { [key: string]: string | undefined };
export const FeaturesMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface GetMetadataResponse {
  features: { [key: string]: string | undefined };
}
export const GetMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ features: FeaturesMap }),
).annotate({
  identifier: "GetMetadataResponse",
}) as any as S.Schema<GetMetadataResponse>;
export interface GetThemeRequest {
  appId: string;
  environmentName: string;
  id: string;
}
export const GetThemeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
    id: S.String.pipe(T.HttpLabel("id")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/app/{appId}/environment/{environmentName}/themes/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetThemeRequest",
}) as any as S.Schema<GetThemeRequest>;
export interface GetThemeResponse {
  theme?: Theme;
}
export const GetThemeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    theme: S.optional(Theme)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "Theme" }),
  }),
).annotate({
  identifier: "GetThemeResponse",
}) as any as S.Schema<GetThemeResponse>;
export type ListCodegenJobsLimit = number;
export interface ListCodegenJobsRequest {
  appId: string;
  environmentName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListCodegenJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/app/{appId}/environment/{environmentName}/codegen-jobs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCodegenJobsRequest",
}) as any as S.Schema<ListCodegenJobsRequest>;
export interface CodegenJobSummary {
  appId: string;
  environmentName: string;
  id: string;
  createdAt?: Date;
  modifiedAt?: Date;
}
export const CodegenJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String,
    environmentName: S.String,
    id: S.String,
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    modifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CodegenJobSummary",
}) as any as S.Schema<CodegenJobSummary>;
export type CodegenJobSummaryList = CodegenJobSummary[];
export const CodegenJobSummaryList = /*@__PURE__*/ S.Array(CodegenJobSummary);
export interface ListCodegenJobsResponse {
  entities: CodegenJobSummary[];
  nextToken?: string;
}
export const ListCodegenJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entities: CodegenJobSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCodegenJobsResponse",
}) as any as S.Schema<ListCodegenJobsResponse>;
export type ListEntityLimit = number;
export interface ListComponentsRequest {
  appId: string;
  environmentName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListComponentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/app/{appId}/environment/{environmentName}/components",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListComponentsRequest",
}) as any as S.Schema<ListComponentsRequest>;
export interface ComponentSummary {
  appId: string;
  environmentName: string;
  id: string;
  name: string;
  componentType: string;
}
export const ComponentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String,
    environmentName: S.String,
    id: S.String,
    name: S.String,
    componentType: S.String,
  }),
).annotate({
  identifier: "ComponentSummary",
}) as any as S.Schema<ComponentSummary>;
export type ComponentSummaryList = ComponentSummary[];
export const ComponentSummaryList = /*@__PURE__*/ S.Array(ComponentSummary);
export interface ListComponentsResponse {
  entities: ComponentSummary[];
  nextToken?: string;
}
export const ListComponentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ entities: ComponentSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListComponentsResponse",
}) as any as S.Schema<ListComponentsResponse>;
export interface ListFormsRequest {
  appId: string;
  environmentName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListFormsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/app/{appId}/environment/{environmentName}/forms",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFormsRequest",
}) as any as S.Schema<ListFormsRequest>;
export interface FormSummary {
  appId: string;
  dataType: FormDataTypeConfig;
  environmentName: string;
  formActionType: FormActionType;
  id: string;
  name: string;
}
export const FormSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String,
    dataType: FormDataTypeConfig,
    environmentName: S.String,
    formActionType: FormActionType,
    id: S.String,
    name: S.String,
  }),
).annotate({ identifier: "FormSummary" }) as any as S.Schema<FormSummary>;
export type FormSummaryList = FormSummary[];
export const FormSummaryList = /*@__PURE__*/ S.Array(FormSummary);
export interface ListFormsResponse {
  entities: FormSummary[];
  nextToken?: string;
}
export const ListFormsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ entities: FormSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListFormsResponse",
}) as any as S.Schema<ListFormsResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
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
  tags: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: Tags }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListThemesRequest {
  appId: string;
  environmentName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListThemesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/app/{appId}/environment/{environmentName}/themes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListThemesRequest",
}) as any as S.Schema<ListThemesRequest>;
export interface ThemeSummary {
  appId: string;
  environmentName: string;
  id: string;
  name: string;
}
export const ThemeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String,
    environmentName: S.String,
    id: S.String,
    name: S.String,
  }),
).annotate({ identifier: "ThemeSummary" }) as any as S.Schema<ThemeSummary>;
export type ThemeSummaryList = ThemeSummary[];
export const ThemeSummaryList = /*@__PURE__*/ S.Array(ThemeSummary);
export interface ListThemesResponse {
  entities: ThemeSummary[];
  nextToken?: string;
}
export const ListThemesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ entities: ThemeSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListThemesResponse",
}) as any as S.Schema<ListThemesResponse>;
export interface PutMetadataFlagBody {
  newValue: string;
}
export const PutMetadataFlagBody = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ newValue: S.String }),
).annotate({
  identifier: "PutMetadataFlagBody",
}) as any as S.Schema<PutMetadataFlagBody>;
export interface PutMetadataFlagRequest {
  appId: string;
  environmentName: string;
  featureName: string;
  body: PutMetadataFlagBody;
}
export const PutMetadataFlagRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
    featureName: S.String.pipe(T.HttpLabel("featureName")),
    body: PutMetadataFlagBody.pipe(T.HttpPayload()).annotate({
      identifier: "PutMetadataFlagBody",
    }),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/app/{appId}/environment/{environmentName}/metadata/features/{featureName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutMetadataFlagRequest",
}) as any as S.Schema<PutMetadataFlagRequest>;
export interface PutMetadataFlagResponse {}
export const PutMetadataFlagResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutMetadataFlagResponse",
}) as any as S.Schema<PutMetadataFlagResponse>;
export interface RefreshTokenRequestBody {
  token: string | redacted.Redacted<string>;
  clientId?: string | redacted.Redacted<string>;
}
export const RefreshTokenRequestBody = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ token: SensitiveString, clientId: S.optional(SensitiveString) }),
).annotate({
  identifier: "RefreshTokenRequestBody",
}) as any as S.Schema<RefreshTokenRequestBody>;
export interface RefreshTokenRequest {
  provider: string;
  refreshTokenBody: RefreshTokenRequestBody;
}
export const RefreshTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    provider: S.String.pipe(T.HttpLabel("provider")),
    refreshTokenBody: RefreshTokenRequestBody.pipe(T.HttpPayload()).annotate({
      identifier: "RefreshTokenRequestBody",
    }),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tokens/{provider}/refresh" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RefreshTokenRequest",
}) as any as S.Schema<RefreshTokenRequest>;
export interface RefreshTokenResponse {
  accessToken: string | redacted.Redacted<string>;
  expiresIn: number;
}
export const RefreshTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accessToken: SensitiveString, expiresIn: S.Number }),
).annotate({
  identifier: "RefreshTokenResponse",
}) as any as S.Schema<RefreshTokenResponse>;
export interface StartCodegenJobData {
  renderConfig: CodegenJobRenderConfig;
  genericDataSchema?: CodegenJobGenericDataSchema;
  autoGenerateForms?: boolean;
  features?: CodegenFeatureFlags;
  tags?: { [key: string]: string | undefined };
}
export const StartCodegenJobData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    renderConfig: CodegenJobRenderConfig,
    genericDataSchema: S.optional(CodegenJobGenericDataSchema),
    autoGenerateForms: S.optional(S.Boolean),
    features: S.optional(CodegenFeatureFlags),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "StartCodegenJobData",
}) as any as S.Schema<StartCodegenJobData>;
export interface StartCodegenJobRequest {
  appId: string;
  environmentName: string;
  clientToken?: string;
  codegenJobToCreate: StartCodegenJobData;
}
export const StartCodegenJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
    codegenJobToCreate: StartCodegenJobData.pipe(T.HttpPayload()).annotate({
      identifier: "StartCodegenJobData",
    }),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/app/{appId}/environment/{environmentName}/codegen-jobs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartCodegenJobRequest",
}) as any as S.Schema<StartCodegenJobRequest>;
export interface StartCodegenJobResponse {
  entity?: CodegenJob;
}
export const StartCodegenJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entity: S.optional(CodegenJob)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "CodegenJob" }),
  }),
).annotate({
  identifier: "StartCodegenJobResponse",
}) as any as S.Schema<StartCodegenJobResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: Tags,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
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
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
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
export interface UpdateComponentData {
  id?: string;
  name?: string;
  sourceId?: string;
  componentType?: string;
  properties?: { [key: string]: ComponentProperty | undefined };
  children?: ComponentChild[];
  variants?: ComponentVariant[];
  overrides?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  bindingProperties?: {
    [key: string]: ComponentBindingPropertiesValue | undefined;
  };
  collectionProperties?: {
    [key: string]: ComponentDataConfiguration | undefined;
  };
  events?: { [key: string]: ComponentEvent | undefined };
  schemaVersion?: string;
}
export const UpdateComponentData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    sourceId: S.optional(S.String),
    componentType: S.optional(S.String),
    properties: S.optional(ComponentProperties),
    children: S.optional(ComponentChildList),
    variants: S.optional(ComponentVariants),
    overrides: S.optional(ComponentOverrides),
    bindingProperties: S.optional(ComponentBindingProperties),
    collectionProperties: S.optional(ComponentCollectionProperties),
    events: S.optional(ComponentEvents),
    schemaVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateComponentData",
}) as any as S.Schema<UpdateComponentData>;
export interface UpdateComponentRequest {
  appId: string;
  environmentName: string;
  id: string;
  clientToken?: string;
  updatedComponent: UpdateComponentData;
}
export const UpdateComponentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
    id: S.String.pipe(T.HttpLabel("id")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
    updatedComponent: UpdateComponentData.pipe(T.HttpPayload()).annotate({
      identifier: "UpdateComponentData",
    }),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/app/{appId}/environment/{environmentName}/components/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateComponentRequest",
}) as any as S.Schema<UpdateComponentRequest>;
export interface UpdateComponentResponse {
  entity?: Component;
}
export const UpdateComponentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entity: S.optional(Component)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "Component" }),
  }),
).annotate({
  identifier: "UpdateComponentResponse",
}) as any as S.Schema<UpdateComponentResponse>;
export interface UpdateFormData {
  name?: string;
  dataType?: FormDataTypeConfig;
  formActionType?: FormActionType;
  fields?: { [key: string]: FieldConfig | undefined };
  style?: FormStyle;
  sectionalElements?: { [key: string]: SectionalElement | undefined };
  schemaVersion?: string;
  cta?: FormCTA;
  labelDecorator?: string;
}
export const UpdateFormData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    dataType: S.optional(FormDataTypeConfig),
    formActionType: S.optional(FormActionType),
    fields: S.optional(FieldsMap),
    style: S.optional(FormStyle),
    sectionalElements: S.optional(SectionalElementMap),
    schemaVersion: S.optional(S.String),
    cta: S.optional(FormCTA),
    labelDecorator: S.optional(S.String),
  }),
).annotate({ identifier: "UpdateFormData" }) as any as S.Schema<UpdateFormData>;
export interface UpdateFormRequest {
  appId: string;
  environmentName: string;
  id: string;
  clientToken?: string;
  updatedForm: UpdateFormData;
}
export const UpdateFormRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
    id: S.String.pipe(T.HttpLabel("id")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
    updatedForm: UpdateFormData.pipe(T.HttpPayload()).annotate({
      identifier: "UpdateFormData",
    }),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/app/{appId}/environment/{environmentName}/forms/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFormRequest",
}) as any as S.Schema<UpdateFormRequest>;
export interface UpdateFormResponse {
  entity?: Form;
}
export const UpdateFormResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entity: S.optional(Form)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "Form" }),
  }),
).annotate({
  identifier: "UpdateFormResponse",
}) as any as S.Schema<UpdateFormResponse>;
export interface UpdateThemeData {
  id?: string;
  name?: string;
  values: ThemeValues[];
  overrides?: ThemeValues[];
}
export const UpdateThemeData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    name: S.optional(S.String),
    values: ThemeValuesList,
    overrides: S.optional(ThemeValuesList),
  }),
).annotate({
  identifier: "UpdateThemeData",
}) as any as S.Schema<UpdateThemeData>;
export interface UpdateThemeRequest {
  appId: string;
  environmentName: string;
  id: string;
  clientToken?: string;
  updatedTheme: UpdateThemeData;
}
export const UpdateThemeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    appId: S.String.pipe(T.HttpLabel("appId")),
    environmentName: S.String.pipe(T.HttpLabel("environmentName")),
    id: S.String.pipe(T.HttpLabel("id")),
    clientToken: S.optional(S.String).pipe(
      T.HttpQuery("clientToken"),
      T.IdempotencyToken(),
    ),
    updatedTheme: UpdateThemeData.pipe(T.HttpPayload()).annotate({
      identifier: "UpdateThemeData",
    }),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/app/{appId}/environment/{environmentName}/themes/{id}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateThemeRequest",
}) as any as S.Schema<UpdateThemeRequest>;
export interface UpdateThemeResponse {
  entity?: Theme;
}
export const UpdateThemeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entity: S.optional(Theme)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "Theme" }),
  }),
).annotate({
  identifier: "UpdateThemeResponse",
}) as any as S.Schema<UpdateThemeResponse>;
export type CreateComponentError =
  | InternalServerException
  | InvalidParameterException
  | ResourceConflictException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates a new component for an Amplify app.
 */
export const createComponent: API.OperationMethod<
  CreateComponentRequest,
  CreateComponentResponse,
  CreateComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateComponentRequest,
  output: CreateComponentResponse,
  errors: [
    InternalServerException,
    InvalidParameterException,
    ResourceConflictException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateComponent",
}));

export type CreateFormError =
  | InternalServerException
  | InvalidParameterException
  | ResourceConflictException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates a new form for an Amplify app.
 */
export const createForm: API.OperationMethod<
  CreateFormRequest,
  CreateFormResponse,
  CreateFormError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateFormRequest,
  output: CreateFormResponse,
  errors: [
    InternalServerException,
    InvalidParameterException,
    ResourceConflictException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateForm",
}));

export type CreateThemeError =
  | InternalServerException
  | InvalidParameterException
  | ResourceConflictException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates a theme to apply to the components in an Amplify app.
 */
export const createTheme: API.OperationMethod<
  CreateThemeRequest,
  CreateThemeResponse,
  CreateThemeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateThemeRequest,
  output: CreateThemeResponse,
  errors: [
    InternalServerException,
    InvalidParameterException,
    ResourceConflictException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTheme",
}));

export type DeleteComponentError =
  | InternalServerException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a component from an Amplify app.
 */
export const deleteComponent: API.OperationMethod<
  DeleteComponentRequest,
  DeleteComponentResponse,
  DeleteComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteComponentRequest,
  output: DeleteComponentResponse,
  errors: [
    InternalServerException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteComponent",
}));

export type DeleteFormError =
  | InternalServerException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a form from an Amplify app.
 */
export const deleteForm: API.OperationMethod<
  DeleteFormRequest,
  DeleteFormResponse,
  DeleteFormError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFormRequest,
  output: DeleteFormResponse,
  errors: [
    InternalServerException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteForm",
}));

export type DeleteThemeError =
  | InternalServerException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a theme from an Amplify app.
 */
export const deleteTheme: API.OperationMethod<
  DeleteThemeRequest,
  DeleteThemeResponse,
  DeleteThemeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteThemeRequest,
  output: DeleteThemeResponse,
  errors: [
    InternalServerException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTheme",
}));

export type ExchangeCodeForTokenError =
  | InvalidParameterException
  | CommonErrors;
/**
 * This is for internal use.
 *
 * Amplify uses this action to exchange an access code for a token.
 */
export const exchangeCodeForToken: API.OperationMethod<
  ExchangeCodeForTokenRequest,
  ExchangeCodeForTokenResponse,
  ExchangeCodeForTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExchangeCodeForTokenRequest,
  output: ExchangeCodeForTokenResponse,
  errors: [InvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExchangeCodeForToken",
}));

export type ExportComponentsError =
  | InternalServerException
  | InvalidParameterException
  | CommonErrors;
/**
 * Exports component configurations to code that is ready to integrate into an Amplify app.
 */
export const exportComponents: API.PaginatedOperationMethod<
  ExportComponentsRequest,
  ExportComponentsResponse,
  ExportComponentsError,
  Credentials | HttpClient.HttpClient,
  Component
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ExportComponentsRequest,
  output: ExportComponentsResponse,
  errors: [InternalServerException, InvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportComponents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "entities",
  } as const,
})) as any;

export type ExportFormsError =
  | InternalServerException
  | InvalidParameterException
  | CommonErrors;
/**
 * Exports form configurations to code that is ready to integrate into an Amplify app.
 */
export const exportForms: API.PaginatedOperationMethod<
  ExportFormsRequest,
  ExportFormsResponse,
  ExportFormsError,
  Credentials | HttpClient.HttpClient,
  Form
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ExportFormsRequest,
  output: ExportFormsResponse,
  errors: [InternalServerException, InvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportForms",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "entities",
  } as const,
})) as any;

export type ExportThemesError =
  | InternalServerException
  | InvalidParameterException
  | CommonErrors;
/**
 * Exports theme configurations to code that is ready to integrate into an Amplify app.
 */
export const exportThemes: API.PaginatedOperationMethod<
  ExportThemesRequest,
  ExportThemesResponse,
  ExportThemesError,
  Credentials | HttpClient.HttpClient,
  Theme
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ExportThemesRequest,
  output: ExportThemesResponse,
  errors: [InternalServerException, InvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportThemes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "entities",
  } as const,
})) as any;

export type GetCodegenJobError =
  | InternalServerException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns an existing code generation job.
 */
export const getCodegenJob: API.OperationMethod<
  GetCodegenJobRequest,
  GetCodegenJobResponse,
  GetCodegenJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCodegenJobRequest,
  output: GetCodegenJobResponse,
  errors: [
    InternalServerException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCodegenJob",
}));

export type GetComponentError =
  | InternalServerException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns an existing component for an Amplify app.
 */
export const getComponent: API.OperationMethod<
  GetComponentRequest,
  GetComponentResponse,
  GetComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetComponentRequest,
  output: GetComponentResponse,
  errors: [
    InternalServerException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComponent",
}));

export type GetFormError =
  | InternalServerException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns an existing form for an Amplify app.
 */
export const getForm: API.OperationMethod<
  GetFormRequest,
  GetFormResponse,
  GetFormError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFormRequest,
  output: GetFormResponse,
  errors: [
    InternalServerException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetForm",
}));

export type GetMetadataError =
  | InvalidParameterException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns existing metadata for an Amplify app.
 */
export const getMetadata: API.OperationMethod<
  GetMetadataRequest,
  GetMetadataResponse,
  GetMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMetadataRequest,
  output: GetMetadataResponse,
  errors: [InvalidParameterException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetadata",
}));

export type GetThemeError =
  | InternalServerException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns an existing theme for an Amplify app.
 */
export const getTheme: API.OperationMethod<
  GetThemeRequest,
  GetThemeResponse,
  GetThemeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetThemeRequest,
  output: GetThemeResponse,
  errors: [
    InternalServerException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTheme",
}));

export type ListCodegenJobsError =
  | InternalServerException
  | InvalidParameterException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a list of code generation jobs for a specified Amplify app and backend environment.
 */
export const listCodegenJobs: API.PaginatedOperationMethod<
  ListCodegenJobsRequest,
  ListCodegenJobsResponse,
  ListCodegenJobsError,
  Credentials | HttpClient.HttpClient,
  CodegenJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCodegenJobsRequest,
  output: ListCodegenJobsResponse,
  errors: [
    InternalServerException,
    InvalidParameterException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCodegenJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "entities",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListComponentsError =
  | InternalServerException
  | InvalidParameterException
  | CommonErrors;
/**
 * Retrieves a list of components for a specified Amplify app and backend
 * environment.
 */
export const listComponents: API.PaginatedOperationMethod<
  ListComponentsRequest,
  ListComponentsResponse,
  ListComponentsError,
  Credentials | HttpClient.HttpClient,
  ComponentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListComponentsRequest,
  output: ListComponentsResponse,
  errors: [InternalServerException, InvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComponents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "entities",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFormsError =
  | InternalServerException
  | InvalidParameterException
  | CommonErrors;
/**
 * Retrieves a list of forms for a specified Amplify app and backend environment.
 */
export const listForms: API.PaginatedOperationMethod<
  ListFormsRequest,
  ListFormsResponse,
  ListFormsError,
  Credentials | HttpClient.HttpClient,
  FormSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFormsRequest,
  output: ListFormsResponse,
  errors: [InternalServerException, InvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListForms",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "entities",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of tags for a specified Amazon Resource Name (ARN).
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
    InternalServerException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListThemesError =
  | InternalServerException
  | InvalidParameterException
  | CommonErrors;
/**
 * Retrieves a list of themes for a specified Amplify app and backend
 * environment.
 */
export const listThemes: API.PaginatedOperationMethod<
  ListThemesRequest,
  ListThemesResponse,
  ListThemesError,
  Credentials | HttpClient.HttpClient,
  ThemeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListThemesRequest,
  output: ListThemesResponse,
  errors: [InternalServerException, InvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThemes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "entities",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutMetadataFlagError =
  | InvalidParameterException
  | UnauthorizedException
  | CommonErrors;
/**
 * Stores the metadata information about a feature on a form.
 */
export const putMetadataFlag: API.OperationMethod<
  PutMetadataFlagRequest,
  PutMetadataFlagResponse,
  PutMetadataFlagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutMetadataFlagRequest,
  output: PutMetadataFlagResponse,
  errors: [InvalidParameterException, UnauthorizedException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMetadataFlag",
}));

export type RefreshTokenError = InvalidParameterException | CommonErrors;
/**
 * This is for internal use.
 *
 * Amplify uses this action to refresh a previously issued access token that might have expired.
 */
export const refreshToken: API.OperationMethod<
  RefreshTokenRequest,
  RefreshTokenResponse,
  RefreshTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RefreshTokenRequest,
  output: RefreshTokenResponse,
  errors: [InvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RefreshToken",
}));

export type StartCodegenJobError =
  | InternalServerException
  | InvalidParameterException
  | ThrottlingException
  | CommonErrors;
/**
 * Starts a code generation job for a specified Amplify app and backend environment.
 */
export const startCodegenJob: API.OperationMethod<
  StartCodegenJobRequest,
  StartCodegenJobResponse,
  StartCodegenJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartCodegenJobRequest,
  output: StartCodegenJobResponse,
  errors: [
    InternalServerException,
    InvalidParameterException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCodegenJob",
}));

export type TagResourceError =
  | InternalServerException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Tags the resource with a tag key and value.
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
    InternalServerException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | CommonErrors;
/**
 * Untags a resource with a specified Amazon Resource Name (ARN).
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
    InternalServerException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateComponentError =
  | InternalServerException
  | InvalidParameterException
  | ResourceConflictException
  | CommonErrors;
/**
 * Updates an existing component.
 */
export const updateComponent: API.OperationMethod<
  UpdateComponentRequest,
  UpdateComponentResponse,
  UpdateComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateComponentRequest,
  output: UpdateComponentResponse,
  errors: [
    InternalServerException,
    InvalidParameterException,
    ResourceConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateComponent",
}));

export type UpdateFormError =
  | InternalServerException
  | InvalidParameterException
  | ResourceConflictException
  | CommonErrors;
/**
 * Updates an existing form.
 */
export const updateForm: API.OperationMethod<
  UpdateFormRequest,
  UpdateFormResponse,
  UpdateFormError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateFormRequest,
  output: UpdateFormResponse,
  errors: [
    InternalServerException,
    InvalidParameterException,
    ResourceConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateForm",
}));

export type UpdateThemeError =
  | InternalServerException
  | InvalidParameterException
  | ResourceConflictException
  | CommonErrors;
/**
 * Updates an existing theme.
 */
export const updateTheme: API.OperationMethod<
  UpdateThemeRequest,
  UpdateThemeResponse,
  UpdateThemeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateThemeRequest,
  output: UpdateThemeResponse,
  errors: [
    InternalServerException,
    InvalidParameterException,
    ResourceConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTheme",
}));
