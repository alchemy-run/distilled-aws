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
  sdkId: "IoTTwinMaker",
  serviceShapeName: "AWSIoTTwinMaker",
});
const auth = T.AwsAuthSigv4({ name: "iottwinmaker" });
const ver = T.ServiceVersion("2021-11-29");
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
              `https://iottwinmaker-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://iottwinmaker-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://iottwinmaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://iottwinmaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ConnectorFailureException
  extends /*@__PURE__*/ S.TaggedError<ConnectorFailureException>()(
    "ConnectorFailureException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(424),
  ) {}
export class ConnectorTimeoutException
  extends /*@__PURE__*/ S.TaggedError<ConnectorTimeoutException>()(
    "ConnectorTimeoutException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(424),
  ) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class QueryTimeoutException
  extends /*@__PURE__*/ S.TaggedError<QueryTimeoutException>()(
    "QueryTimeoutException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(400), T.Retryable()),
  ).pipe(C.withBadRequestError, C.withRetryableError) {}
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
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Id = string;
export type Name = string;
export type ComponentPath = string;
export type ExternalIdProperty = { [key: string]: string | undefined };
export const ExternalIdProperty = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type EntityId = string;
export interface EntityPropertyReference {
  componentName?: string;
  componentPath?: string;
  externalIdProperty?: { [key: string]: string | undefined };
  entityId?: string;
  propertyName: string;
}
export const EntityPropertyReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    componentName: S.optional(S.String),
    componentPath: S.optional(S.String),
    externalIdProperty: S.optional(ExternalIdProperty),
    entityId: S.optional(S.String),
    propertyName: S.String,
  }),
).annotate({
  identifier: "EntityPropertyReference",
}) as any as S.Schema<EntityPropertyReference>;
export type DataValueList = DataValue[];
export const DataValueList = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<DataValue> => DataValue).annotate({
    identifier: "DataValue",
  }),
) as any as S.Schema<DataValueList>;
export type DataValueMap = { [key: string]: DataValue | undefined };
export const DataValueMap = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend((): S.Schema<DataValue> => DataValue)
    .annotate({ identifier: "DataValue" })
    .pipe(S.optional),
) as any as S.Schema<DataValueMap>;
export interface RelationshipValue {
  targetEntityId?: string;
  targetComponentName?: string;
}
export const RelationshipValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetEntityId: S.optional(S.String),
    targetComponentName: S.optional(S.String),
  }),
).annotate({
  identifier: "RelationshipValue",
}) as any as S.Schema<RelationshipValue>;
export type Expression = string;
export interface DataValue {
  booleanValue?: boolean;
  doubleValue?: number;
  integerValue?: number;
  longValue?: number;
  stringValue?: string;
  listValue?: DataValue[];
  mapValue?: { [key: string]: DataValue | undefined };
  relationshipValue?: RelationshipValue;
  expression?: string;
}
export const DataValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    booleanValue: S.optional(S.Boolean),
    doubleValue: S.optional(S.Number),
    integerValue: S.optional(S.Number),
    longValue: S.optional(S.Number),
    stringValue: S.optional(S.String),
    listValue: S.optional(
      S.suspend(() => DataValueList).annotate({ identifier: "DataValueList" }),
    ),
    mapValue: S.optional(
      S.suspend(() => DataValueMap).annotate({ identifier: "DataValueMap" }),
    ),
    relationshipValue: S.optional(RelationshipValue),
    expression: S.optional(S.String),
  }),
).annotate({ identifier: "DataValue" }) as any as S.Schema<DataValue>;
export interface PropertyValue {
  timestamp?: Date;
  value: DataValue;
  time?: string;
}
export const PropertyValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    value: DataValue,
    time: S.optional(S.String),
  }),
).annotate({ identifier: "PropertyValue" }) as any as S.Schema<PropertyValue>;
export type PropertyValues = PropertyValue[];
export const PropertyValues = /*@__PURE__*/ S.Array(PropertyValue);
export interface PropertyValueEntry {
  entityPropertyReference: EntityPropertyReference;
  propertyValues?: PropertyValue[];
}
export const PropertyValueEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entityPropertyReference: EntityPropertyReference,
    propertyValues: S.optional(PropertyValues),
  }),
).annotate({
  identifier: "PropertyValueEntry",
}) as any as S.Schema<PropertyValueEntry>;
export type Entries = PropertyValueEntry[];
export const Entries = /*@__PURE__*/ S.Array(PropertyValueEntry);
export interface BatchPutPropertyValuesRequest {
  workspaceId: string;
  entries: PropertyValueEntry[];
}
export const BatchPutPropertyValuesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    entries: Entries,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/entity-properties",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchPutPropertyValuesRequest",
}) as any as S.Schema<BatchPutPropertyValuesRequest>;
export interface BatchPutPropertyError {
  errorCode: string;
  errorMessage: string;
  entry: PropertyValueEntry;
}
export const BatchPutPropertyError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    errorCode: S.String,
    errorMessage: S.String,
    entry: PropertyValueEntry,
  }),
).annotate({
  identifier: "BatchPutPropertyError",
}) as any as S.Schema<BatchPutPropertyError>;
export type Errors = BatchPutPropertyError[];
export const Errors = /*@__PURE__*/ S.Array(BatchPutPropertyError);
export interface BatchPutPropertyErrorEntry {
  errors: BatchPutPropertyError[];
}
export const BatchPutPropertyErrorEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ errors: Errors }),
).annotate({
  identifier: "BatchPutPropertyErrorEntry",
}) as any as S.Schema<BatchPutPropertyErrorEntry>;
export type ErrorEntries = BatchPutPropertyErrorEntry[];
export const ErrorEntries = /*@__PURE__*/ S.Array(BatchPutPropertyErrorEntry);
export interface BatchPutPropertyValuesResponse {
  errorEntries: BatchPutPropertyErrorEntry[];
}
export const BatchPutPropertyValuesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ errorEntries: ErrorEntries }),
).annotate({
  identifier: "BatchPutPropertyValuesResponse",
}) as any as S.Schema<BatchPutPropertyValuesResponse>;
export interface CancelMetadataTransferJobRequest {
  metadataTransferJobId: string;
}
export const CancelMetadataTransferJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metadataTransferJobId: S.String.pipe(T.HttpLabel("metadataTransferJobId")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/metadata-transfer-jobs/{metadataTransferJobId}/cancel",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelMetadataTransferJobRequest",
}) as any as S.Schema<CancelMetadataTransferJobRequest>;
export type TwinMakerArn = string;
export type MetadataTransferJobState = string;
export type ErrorCode = string;
export type ErrorMessage = string;
export interface ErrorDetails {
  code?: string;
  message?: string;
}
export const ErrorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
).annotate({ identifier: "ErrorDetails" }) as any as S.Schema<ErrorDetails>;
export interface MetadataTransferJobStatus {
  state?: string;
  error?: ErrorDetails;
  queuedPosition?: number;
}
export const MetadataTransferJobStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    state: S.optional(S.String),
    error: S.optional(ErrorDetails),
    queuedPosition: S.optional(S.Number),
  }),
).annotate({
  identifier: "MetadataTransferJobStatus",
}) as any as S.Schema<MetadataTransferJobStatus>;
export interface MetadataTransferJobProgress {
  totalCount?: number;
  succeededCount?: number;
  skippedCount?: number;
  failedCount?: number;
}
export const MetadataTransferJobProgress = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    totalCount: S.optional(S.Number),
    succeededCount: S.optional(S.Number),
    skippedCount: S.optional(S.Number),
    failedCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "MetadataTransferJobProgress",
}) as any as S.Schema<MetadataTransferJobProgress>;
export interface CancelMetadataTransferJobResponse {
  metadataTransferJobId: string;
  arn: string;
  updateDateTime: Date;
  status: MetadataTransferJobStatus;
  progress?: MetadataTransferJobProgress;
}
export const CancelMetadataTransferJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metadataTransferJobId: S.String,
    arn: S.String,
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: MetadataTransferJobStatus,
    progress: S.optional(MetadataTransferJobProgress),
  }),
).annotate({
  identifier: "CancelMetadataTransferJobResponse",
}) as any as S.Schema<CancelMetadataTransferJobResponse>;
export type ComponentTypeId = string;
export type Description = string;
export type Type = string;
export interface Relationship {
  targetComponentTypeId?: string;
  relationshipType?: string;
}
export const Relationship = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetComponentTypeId: S.optional(S.String),
    relationshipType: S.optional(S.String),
  }),
).annotate({ identifier: "Relationship" }) as any as S.Schema<Relationship>;
export interface DataType {
  type: string;
  nestedType?: DataType;
  allowedValues?: DataValue[];
  unitOfMeasure?: string;
  relationship?: Relationship;
}
export const DataType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.String,
    nestedType: S.optional(
      S.suspend((): S.Schema<DataType> => DataType).annotate({
        identifier: "DataType",
      }),
    ),
    allowedValues: S.optional(
      S.suspend(() => DataValueList).annotate({ identifier: "DataValueList" }),
    ),
    unitOfMeasure: S.optional(S.String),
    relationship: S.optional(Relationship),
  }),
).annotate({ identifier: "DataType" }) as any as S.Schema<DataType>;
export type Value = string;
export type Configuration = { [key: string]: string | undefined };
export const Configuration = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type PropertyDisplayName = string;
export interface PropertyDefinitionRequest {
  dataType?: DataType;
  isRequiredInEntity?: boolean;
  isExternalId?: boolean;
  isStoredExternally?: boolean;
  isTimeSeries?: boolean;
  defaultValue?: DataValue;
  configuration?: { [key: string]: string | undefined };
  displayName?: string;
}
export const PropertyDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataType: S.optional(DataType),
    isRequiredInEntity: S.optional(S.Boolean),
    isExternalId: S.optional(S.Boolean),
    isStoredExternally: S.optional(S.Boolean),
    isTimeSeries: S.optional(S.Boolean),
    defaultValue: S.optional(DataValue),
    configuration: S.optional(Configuration),
    displayName: S.optional(S.String),
  }),
).annotate({
  identifier: "PropertyDefinitionRequest",
}) as any as S.Schema<PropertyDefinitionRequest>;
export type PropertyDefinitionsRequest = {
  [key: string]: PropertyDefinitionRequest | undefined;
};
export const PropertyDefinitionsRequest = /*@__PURE__*/ S.Record(
  S.String,
  PropertyDefinitionRequest.pipe(S.optional),
);
export type ExtendsFrom = string[];
export const ExtendsFrom = /*@__PURE__*/ S.Array(S.String);
export type RequiredProperties = string[];
export const RequiredProperties = /*@__PURE__*/ S.Array(S.String);
export type Scope = string;
export type LambdaArn = string;
export interface LambdaFunction {
  arn: string;
}
export const LambdaFunction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotate({ identifier: "LambdaFunction" }) as any as S.Schema<LambdaFunction>;
export interface DataConnector {
  lambda?: LambdaFunction;
  isNative?: boolean;
}
export const DataConnector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lambda: S.optional(LambdaFunction),
    isNative: S.optional(S.Boolean),
  }),
).annotate({ identifier: "DataConnector" }) as any as S.Schema<DataConnector>;
export interface FunctionRequest {
  requiredProperties?: string[];
  scope?: string;
  implementedBy?: DataConnector;
}
export const FunctionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    requiredProperties: S.optional(RequiredProperties),
    scope: S.optional(S.String),
    implementedBy: S.optional(DataConnector),
  }),
).annotate({
  identifier: "FunctionRequest",
}) as any as S.Schema<FunctionRequest>;
export type FunctionsRequest = { [key: string]: FunctionRequest | undefined };
export const FunctionsRequest = /*@__PURE__*/ S.Record(
  S.String,
  FunctionRequest.pipe(S.optional),
);
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type GroupType = string;
export type PropertyNames = string[];
export const PropertyNames = /*@__PURE__*/ S.Array(S.String);
export interface PropertyGroupRequest {
  groupType?: string;
  propertyNames?: string[];
}
export const PropertyGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    groupType: S.optional(S.String),
    propertyNames: S.optional(PropertyNames),
  }),
).annotate({
  identifier: "PropertyGroupRequest",
}) as any as S.Schema<PropertyGroupRequest>;
export type PropertyGroupsRequest = {
  [key: string]: PropertyGroupRequest | undefined;
};
export const PropertyGroupsRequest = /*@__PURE__*/ S.Record(
  S.String,
  PropertyGroupRequest.pipe(S.optional),
);
export type ComponentTypeName = string;
export interface CompositeComponentTypeRequest {
  componentTypeId?: string;
}
export const CompositeComponentTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ componentTypeId: S.optional(S.String) }),
).annotate({
  identifier: "CompositeComponentTypeRequest",
}) as any as S.Schema<CompositeComponentTypeRequest>;
export type CompositeComponentTypesRequest = {
  [key: string]: CompositeComponentTypeRequest | undefined;
};
export const CompositeComponentTypesRequest = /*@__PURE__*/ S.Record(
  S.String,
  CompositeComponentTypeRequest.pipe(S.optional),
);
export interface CreateComponentTypeRequest {
  workspaceId: string;
  isSingleton?: boolean;
  componentTypeId: string;
  description?: string;
  propertyDefinitions?: {
    [key: string]: PropertyDefinitionRequest | undefined;
  };
  extendsFrom?: string[];
  functions?: { [key: string]: FunctionRequest | undefined };
  tags?: { [key: string]: string | undefined };
  propertyGroups?: { [key: string]: PropertyGroupRequest | undefined };
  componentTypeName?: string;
  compositeComponentTypes?: {
    [key: string]: CompositeComponentTypeRequest | undefined;
  };
}
export const CreateComponentTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    isSingleton: S.optional(S.Boolean),
    componentTypeId: S.String.pipe(T.HttpLabel("componentTypeId")),
    description: S.optional(S.String),
    propertyDefinitions: S.optional(PropertyDefinitionsRequest),
    extendsFrom: S.optional(ExtendsFrom),
    functions: S.optional(FunctionsRequest),
    tags: S.optional(TagMap),
    propertyGroups: S.optional(PropertyGroupsRequest),
    componentTypeName: S.optional(S.String),
    compositeComponentTypes: S.optional(CompositeComponentTypesRequest),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/component-types/{componentTypeId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateComponentTypeRequest",
}) as any as S.Schema<CreateComponentTypeRequest>;
export type State = string;
export interface CreateComponentTypeResponse {
  arn: string;
  creationDateTime: Date;
  state: string;
}
export const CreateComponentTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    state: S.String,
  }),
).annotate({
  identifier: "CreateComponentTypeResponse",
}) as any as S.Schema<CreateComponentTypeResponse>;
export type EntityName = string;
export type PropertyUpdateType = string;
export interface PropertyRequest {
  definition?: PropertyDefinitionRequest;
  value?: DataValue;
  updateType?: string;
}
export const PropertyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    definition: S.optional(PropertyDefinitionRequest),
    value: S.optional(DataValue),
    updateType: S.optional(S.String),
  }),
).annotate({
  identifier: "PropertyRequest",
}) as any as S.Schema<PropertyRequest>;
export type PropertyRequests = { [key: string]: PropertyRequest | undefined };
export const PropertyRequests = /*@__PURE__*/ S.Record(
  S.String,
  PropertyRequest.pipe(S.optional),
);
export type PropertyGroupUpdateType = string;
export interface ComponentPropertyGroupRequest {
  groupType?: string;
  propertyNames?: string[];
  updateType?: string;
}
export const ComponentPropertyGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    groupType: S.optional(S.String),
    propertyNames: S.optional(PropertyNames),
    updateType: S.optional(S.String),
  }),
).annotate({
  identifier: "ComponentPropertyGroupRequest",
}) as any as S.Schema<ComponentPropertyGroupRequest>;
export type ComponentPropertyGroupRequests = {
  [key: string]: ComponentPropertyGroupRequest | undefined;
};
export const ComponentPropertyGroupRequests = /*@__PURE__*/ S.Record(
  S.String,
  ComponentPropertyGroupRequest.pipe(S.optional),
);
export interface ComponentRequest {
  description?: string;
  componentTypeId?: string;
  properties?: { [key: string]: PropertyRequest | undefined };
  propertyGroups?: { [key: string]: ComponentPropertyGroupRequest | undefined };
}
export const ComponentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    componentTypeId: S.optional(S.String),
    properties: S.optional(PropertyRequests),
    propertyGroups: S.optional(ComponentPropertyGroupRequests),
  }),
).annotate({
  identifier: "ComponentRequest",
}) as any as S.Schema<ComponentRequest>;
export type ComponentsMapRequest = {
  [key: string]: ComponentRequest | undefined;
};
export const ComponentsMapRequest = /*@__PURE__*/ S.Record(
  S.String,
  ComponentRequest.pipe(S.optional),
);
export interface CompositeComponentRequest {
  description?: string;
  properties?: { [key: string]: PropertyRequest | undefined };
  propertyGroups?: { [key: string]: ComponentPropertyGroupRequest | undefined };
}
export const CompositeComponentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    properties: S.optional(PropertyRequests),
    propertyGroups: S.optional(ComponentPropertyGroupRequests),
  }),
).annotate({
  identifier: "CompositeComponentRequest",
}) as any as S.Schema<CompositeComponentRequest>;
export type CompositeComponentsMapRequest = {
  [key: string]: CompositeComponentRequest | undefined;
};
export const CompositeComponentsMapRequest = /*@__PURE__*/ S.Record(
  S.String,
  CompositeComponentRequest.pipe(S.optional),
);
export type ParentEntityId = string;
export interface CreateEntityRequest {
  workspaceId: string;
  entityId?: string;
  entityName: string;
  description?: string;
  components?: { [key: string]: ComponentRequest | undefined };
  compositeComponents?: {
    [key: string]: CompositeComponentRequest | undefined;
  };
  parentEntityId?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateEntityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    entityId: S.optional(S.String),
    entityName: S.String,
    description: S.optional(S.String),
    components: S.optional(ComponentsMapRequest),
    compositeComponents: S.optional(CompositeComponentsMapRequest),
    parentEntityId: S.optional(S.String),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/entities" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEntityRequest",
}) as any as S.Schema<CreateEntityRequest>;
export interface CreateEntityResponse {
  entityId: string;
  arn: string;
  creationDateTime: Date;
  state: string;
}
export const CreateEntityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entityId: S.String,
    arn: S.String,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    state: S.String,
  }),
).annotate({
  identifier: "CreateEntityResponse",
}) as any as S.Schema<CreateEntityResponse>;
export type SourceType = string;
export type S3SourceLocation = string;
export interface S3SourceConfiguration {
  location: string;
}
export const S3SourceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ location: S.String }),
).annotate({
  identifier: "S3SourceConfiguration",
}) as any as S.Schema<S3SourceConfiguration>;
export type Uuid = string;
export type SiteWiseExternalId = string;
export interface FilterByAssetModel {
  assetModelId?: string;
  assetModelExternalId?: string;
  includeOffspring?: boolean;
  includeAssets?: boolean;
}
export const FilterByAssetModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetModelId: S.optional(S.String),
    assetModelExternalId: S.optional(S.String),
    includeOffspring: S.optional(S.Boolean),
    includeAssets: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "FilterByAssetModel",
}) as any as S.Schema<FilterByAssetModel>;
export interface FilterByAsset {
  assetId?: string;
  assetExternalId?: string;
  includeOffspring?: boolean;
  includeAssetModel?: boolean;
}
export const FilterByAsset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    assetId: S.optional(S.String),
    assetExternalId: S.optional(S.String),
    includeOffspring: S.optional(S.Boolean),
    includeAssetModel: S.optional(S.Boolean),
  }),
).annotate({ identifier: "FilterByAsset" }) as any as S.Schema<FilterByAsset>;
export type IotSiteWiseSourceConfigurationFilter =
  | { filterByAssetModel: FilterByAssetModel; filterByAsset?: never }
  | { filterByAssetModel?: never; filterByAsset: FilterByAsset };
export const IotSiteWiseSourceConfigurationFilter = /*@__PURE__*/ S.Union([
  S.Struct({ filterByAssetModel: FilterByAssetModel }),
  S.Struct({ filterByAsset: FilterByAsset }),
]);
export type IotSiteWiseSourceConfigurationFilters =
  IotSiteWiseSourceConfigurationFilter[];
export const IotSiteWiseSourceConfigurationFilters = /*@__PURE__*/ S.Array(
  IotSiteWiseSourceConfigurationFilter,
);
export interface IotSiteWiseSourceConfiguration {
  filters?: IotSiteWiseSourceConfigurationFilter[];
}
export const IotSiteWiseSourceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ filters: S.optional(IotSiteWiseSourceConfigurationFilters) }),
).annotate({
  identifier: "IotSiteWiseSourceConfiguration",
}) as any as S.Schema<IotSiteWiseSourceConfiguration>;
export interface FilterByComponentType {
  componentTypeId: string;
}
export const FilterByComponentType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ componentTypeId: S.String }),
).annotate({
  identifier: "FilterByComponentType",
}) as any as S.Schema<FilterByComponentType>;
export interface FilterByEntity {
  entityId: string;
}
export const FilterByEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ entityId: S.String }),
).annotate({ identifier: "FilterByEntity" }) as any as S.Schema<FilterByEntity>;
export type IotTwinMakerSourceConfigurationFilter =
  | { filterByComponentType: FilterByComponentType; filterByEntity?: never }
  | { filterByComponentType?: never; filterByEntity: FilterByEntity };
export const IotTwinMakerSourceConfigurationFilter = /*@__PURE__*/ S.Union([
  S.Struct({ filterByComponentType: FilterByComponentType }),
  S.Struct({ filterByEntity: FilterByEntity }),
]);
export type IotTwinMakerSourceConfigurationFilters =
  IotTwinMakerSourceConfigurationFilter[];
export const IotTwinMakerSourceConfigurationFilters = /*@__PURE__*/ S.Array(
  IotTwinMakerSourceConfigurationFilter,
);
export interface IotTwinMakerSourceConfiguration {
  workspace: string;
  filters?: IotTwinMakerSourceConfigurationFilter[];
}
export const IotTwinMakerSourceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspace: S.String,
    filters: S.optional(IotTwinMakerSourceConfigurationFilters),
  }),
).annotate({
  identifier: "IotTwinMakerSourceConfiguration",
}) as any as S.Schema<IotTwinMakerSourceConfiguration>;
export interface SourceConfiguration {
  type: string;
  s3Configuration?: S3SourceConfiguration;
  iotSiteWiseConfiguration?: IotSiteWiseSourceConfiguration;
  iotTwinMakerConfiguration?: IotTwinMakerSourceConfiguration;
}
export const SourceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.String,
    s3Configuration: S.optional(S3SourceConfiguration),
    iotSiteWiseConfiguration: S.optional(IotSiteWiseSourceConfiguration),
    iotTwinMakerConfiguration: S.optional(IotTwinMakerSourceConfiguration),
  }),
).annotate({
  identifier: "SourceConfiguration",
}) as any as S.Schema<SourceConfiguration>;
export type SourceConfigurations = SourceConfiguration[];
export const SourceConfigurations = /*@__PURE__*/ S.Array(SourceConfiguration);
export type DestinationType = string;
export type S3DestinationLocation = string;
export interface S3DestinationConfiguration {
  location: string;
}
export const S3DestinationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ location: S.String }),
).annotate({
  identifier: "S3DestinationConfiguration",
}) as any as S.Schema<S3DestinationConfiguration>;
export interface IotTwinMakerDestinationConfiguration {
  workspace: string;
}
export const IotTwinMakerDestinationConfiguration = /*@__PURE__*/ S.suspend(
  () => S.Struct({ workspace: S.String }),
).annotate({
  identifier: "IotTwinMakerDestinationConfiguration",
}) as any as S.Schema<IotTwinMakerDestinationConfiguration>;
export interface DestinationConfiguration {
  type: string;
  s3Configuration?: S3DestinationConfiguration;
  iotTwinMakerConfiguration?: IotTwinMakerDestinationConfiguration;
}
export const DestinationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.String,
    s3Configuration: S.optional(S3DestinationConfiguration),
    iotTwinMakerConfiguration: S.optional(IotTwinMakerDestinationConfiguration),
  }),
).annotate({
  identifier: "DestinationConfiguration",
}) as any as S.Schema<DestinationConfiguration>;
export interface CreateMetadataTransferJobRequest {
  metadataTransferJobId?: string;
  description?: string;
  sources: SourceConfiguration[];
  destination: DestinationConfiguration;
}
export const CreateMetadataTransferJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metadataTransferJobId: S.optional(S.String),
    description: S.optional(S.String),
    sources: SourceConfigurations,
    destination: DestinationConfiguration,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/metadata-transfer-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMetadataTransferJobRequest",
}) as any as S.Schema<CreateMetadataTransferJobRequest>;
export interface CreateMetadataTransferJobResponse {
  metadataTransferJobId: string;
  arn: string;
  creationDateTime: Date;
  status: MetadataTransferJobStatus;
}
export const CreateMetadataTransferJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metadataTransferJobId: S.String,
    arn: S.String,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: MetadataTransferJobStatus,
  }),
).annotate({
  identifier: "CreateMetadataTransferJobResponse",
}) as any as S.Schema<CreateMetadataTransferJobResponse>;
export type S3Url = string;
export type SceneCapability = string;
export type SceneCapabilities = string[];
export const SceneCapabilities = /*@__PURE__*/ S.Array(S.String);
export type SceneMetadataValue = string;
export type SceneMetadataMap = { [key: string]: string | undefined };
export const SceneMetadataMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateSceneRequest {
  workspaceId: string;
  sceneId: string;
  contentLocation: string;
  description?: string;
  capabilities?: string[];
  tags?: { [key: string]: string | undefined };
  sceneMetadata?: { [key: string]: string | undefined };
}
export const CreateSceneRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    sceneId: S.String,
    contentLocation: S.String,
    description: S.optional(S.String),
    capabilities: S.optional(SceneCapabilities),
    tags: S.optional(TagMap),
    sceneMetadata: S.optional(SceneMetadataMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/scenes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSceneRequest",
}) as any as S.Schema<CreateSceneRequest>;
export interface CreateSceneResponse {
  arn: string;
  creationDateTime: Date;
}
export const CreateSceneResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "CreateSceneResponse",
}) as any as S.Schema<CreateSceneResponse>;
export type SyncSource = string;
export type RoleArn = string;
export interface CreateSyncJobRequest {
  workspaceId: string;
  syncSource: string;
  syncRole: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateSyncJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    syncSource: S.String.pipe(T.HttpLabel("syncSource")),
    syncRole: S.String,
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/sync-jobs/{syncSource}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSyncJobRequest",
}) as any as S.Schema<CreateSyncJobRequest>;
export type SyncJobState = string;
export interface CreateSyncJobResponse {
  arn: string;
  creationDateTime: Date;
  state: string;
}
export const CreateSyncJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    state: S.String,
  }),
).annotate({
  identifier: "CreateSyncJobResponse",
}) as any as S.Schema<CreateSyncJobResponse>;
export type S3Location = string;
export interface CreateWorkspaceRequest {
  workspaceId: string;
  description?: string;
  s3Location?: string;
  role?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateWorkspaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    description: S.optional(S.String),
    s3Location: S.optional(S.String),
    role: S.optional(S.String),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workspaces/{workspaceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateWorkspaceRequest",
}) as any as S.Schema<CreateWorkspaceRequest>;
export interface CreateWorkspaceResponse {
  arn: string;
  creationDateTime: Date;
}
export const CreateWorkspaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "CreateWorkspaceResponse",
}) as any as S.Schema<CreateWorkspaceResponse>;
export interface DeleteComponentTypeRequest {
  workspaceId: string;
  componentTypeId: string;
}
export const DeleteComponentTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    componentTypeId: S.String.pipe(T.HttpLabel("componentTypeId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/workspaces/{workspaceId}/component-types/{componentTypeId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteComponentTypeRequest",
}) as any as S.Schema<DeleteComponentTypeRequest>;
export interface DeleteComponentTypeResponse {
  state: string;
}
export const DeleteComponentTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ state: S.String }),
).annotate({
  identifier: "DeleteComponentTypeResponse",
}) as any as S.Schema<DeleteComponentTypeResponse>;
export interface DeleteEntityRequest {
  workspaceId: string;
  entityId: string;
  isRecursive?: boolean;
}
export const DeleteEntityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    entityId: S.String.pipe(T.HttpLabel("entityId")),
    isRecursive: S.optional(S.Boolean).pipe(T.HttpQuery("isRecursive")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/workspaces/{workspaceId}/entities/{entityId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEntityRequest",
}) as any as S.Schema<DeleteEntityRequest>;
export interface DeleteEntityResponse {
  state: string;
}
export const DeleteEntityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ state: S.String }),
).annotate({
  identifier: "DeleteEntityResponse",
}) as any as S.Schema<DeleteEntityResponse>;
export interface DeleteSceneRequest {
  workspaceId: string;
  sceneId: string;
}
export const DeleteSceneRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    sceneId: S.String.pipe(T.HttpLabel("sceneId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/workspaces/{workspaceId}/scenes/{sceneId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSceneRequest",
}) as any as S.Schema<DeleteSceneRequest>;
export interface DeleteSceneResponse {}
export const DeleteSceneResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSceneResponse",
}) as any as S.Schema<DeleteSceneResponse>;
export interface DeleteSyncJobRequest {
  workspaceId: string;
  syncSource: string;
}
export const DeleteSyncJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    syncSource: S.String.pipe(T.HttpLabel("syncSource")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/workspaces/{workspaceId}/sync-jobs/{syncSource}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSyncJobRequest",
}) as any as S.Schema<DeleteSyncJobRequest>;
export interface DeleteSyncJobResponse {
  state: string;
}
export const DeleteSyncJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ state: S.String }),
).annotate({
  identifier: "DeleteSyncJobResponse",
}) as any as S.Schema<DeleteSyncJobResponse>;
export interface DeleteWorkspaceRequest {
  workspaceId: string;
}
export const DeleteWorkspaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/workspaces/{workspaceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteWorkspaceRequest",
}) as any as S.Schema<DeleteWorkspaceRequest>;
export type WorkspaceDeleteMessage = string;
export interface DeleteWorkspaceResponse {
  message?: string;
}
export const DeleteWorkspaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.optional(S.String) }),
).annotate({
  identifier: "DeleteWorkspaceResponse",
}) as any as S.Schema<DeleteWorkspaceResponse>;
export type QueryStatement = string;
export type QueryServiceMaxResults = number;
export type NextToken = string;
export interface ExecuteQueryRequest {
  workspaceId: string;
  queryStatement: string;
  maxResults?: number;
  nextToken?: string;
}
export const ExecuteQueryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String,
    queryStatement: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/queries/execution" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExecuteQueryRequest",
}) as any as S.Schema<ExecuteQueryRequest>;
export type ColumnName = string;
export type ColumnType = string;
export interface ColumnDescription {
  name?: string;
  type?: string;
}
export const ColumnDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), type: S.optional(S.String) }),
).annotate({
  identifier: "ColumnDescription",
}) as any as S.Schema<ColumnDescription>;
export type ColumnDescriptions = ColumnDescription[];
export const ColumnDescriptions = /*@__PURE__*/ S.Array(ColumnDescription);
export type QueryResultValue = unknown;
export type RowData = any[];
export const RowData = /*@__PURE__*/ S.Array(S.Any);
export interface Row {
  rowData?: any[];
}
export const Row = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ rowData: S.optional(RowData) }),
).annotate({ identifier: "Row" }) as any as S.Schema<Row>;
export type Rows = Row[];
export const Rows = /*@__PURE__*/ S.Array(Row);
export interface ExecuteQueryResponse {
  columnDescriptions?: ColumnDescription[];
  rows?: Row[];
  nextToken?: string;
}
export const ExecuteQueryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    columnDescriptions: S.optional(ColumnDescriptions),
    rows: S.optional(Rows),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ExecuteQueryResponse",
}) as any as S.Schema<ExecuteQueryResponse>;
export interface GetComponentTypeRequest {
  workspaceId: string;
  componentTypeId: string;
}
export const GetComponentTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    componentTypeId: S.String.pipe(T.HttpLabel("componentTypeId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/workspaces/{workspaceId}/component-types/{componentTypeId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetComponentTypeRequest",
}) as any as S.Schema<GetComponentTypeRequest>;
export interface PropertyDefinitionResponse {
  dataType: DataType;
  isTimeSeries: boolean;
  isRequiredInEntity: boolean;
  isExternalId: boolean;
  isStoredExternally: boolean;
  isImported: boolean;
  isFinal: boolean;
  isInherited: boolean;
  defaultValue?: DataValue;
  configuration?: { [key: string]: string | undefined };
  displayName?: string;
}
export const PropertyDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataType: DataType,
    isTimeSeries: S.Boolean,
    isRequiredInEntity: S.Boolean,
    isExternalId: S.Boolean,
    isStoredExternally: S.Boolean,
    isImported: S.Boolean,
    isFinal: S.Boolean,
    isInherited: S.Boolean,
    defaultValue: S.optional(DataValue),
    configuration: S.optional(Configuration),
    displayName: S.optional(S.String),
  }),
).annotate({
  identifier: "PropertyDefinitionResponse",
}) as any as S.Schema<PropertyDefinitionResponse>;
export type PropertyDefinitionsResponse = {
  [key: string]: PropertyDefinitionResponse | undefined;
};
export const PropertyDefinitionsResponse = /*@__PURE__*/ S.Record(
  S.String,
  PropertyDefinitionResponse.pipe(S.optional),
);
export interface FunctionResponse {
  requiredProperties?: string[];
  scope?: string;
  implementedBy?: DataConnector;
  isInherited?: boolean;
}
export const FunctionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    requiredProperties: S.optional(RequiredProperties),
    scope: S.optional(S.String),
    implementedBy: S.optional(DataConnector),
    isInherited: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "FunctionResponse",
}) as any as S.Schema<FunctionResponse>;
export type FunctionsResponse = { [key: string]: FunctionResponse | undefined };
export const FunctionsResponse = /*@__PURE__*/ S.Record(
  S.String,
  FunctionResponse.pipe(S.optional),
);
export interface Status {
  state?: string;
  error?: ErrorDetails;
}
export const Status = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ state: S.optional(S.String), error: S.optional(ErrorDetails) }),
).annotate({ identifier: "Status" }) as any as S.Schema<Status>;
export interface PropertyGroupResponse {
  groupType: string;
  propertyNames: string[];
  isInherited: boolean;
}
export const PropertyGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    groupType: S.String,
    propertyNames: PropertyNames,
    isInherited: S.Boolean,
  }),
).annotate({
  identifier: "PropertyGroupResponse",
}) as any as S.Schema<PropertyGroupResponse>;
export type PropertyGroupsResponse = {
  [key: string]: PropertyGroupResponse | undefined;
};
export const PropertyGroupsResponse = /*@__PURE__*/ S.Record(
  S.String,
  PropertyGroupResponse.pipe(S.optional),
);
export interface CompositeComponentTypeResponse {
  componentTypeId?: string;
  isInherited?: boolean;
}
export const CompositeComponentTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    componentTypeId: S.optional(S.String),
    isInherited: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "CompositeComponentTypeResponse",
}) as any as S.Schema<CompositeComponentTypeResponse>;
export type CompositeComponentTypesResponse = {
  [key: string]: CompositeComponentTypeResponse | undefined;
};
export const CompositeComponentTypesResponse = /*@__PURE__*/ S.Record(
  S.String,
  CompositeComponentTypeResponse.pipe(S.optional),
);
export interface GetComponentTypeResponse {
  workspaceId: string;
  isSingleton?: boolean;
  componentTypeId: string;
  description?: string;
  propertyDefinitions?: {
    [key: string]: PropertyDefinitionResponse | undefined;
  };
  extendsFrom?: string[];
  functions?: { [key: string]: FunctionResponse | undefined };
  creationDateTime: Date;
  updateDateTime: Date;
  arn: string;
  isAbstract?: boolean;
  isSchemaInitialized?: boolean;
  status?: Status;
  propertyGroups?: { [key: string]: PropertyGroupResponse | undefined };
  syncSource?: string;
  componentTypeName?: string;
  compositeComponentTypes?: {
    [key: string]: CompositeComponentTypeResponse | undefined;
  };
}
export const GetComponentTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String,
    isSingleton: S.optional(S.Boolean),
    componentTypeId: S.String,
    description: S.optional(S.String),
    propertyDefinitions: S.optional(PropertyDefinitionsResponse),
    extendsFrom: S.optional(ExtendsFrom),
    functions: S.optional(FunctionsResponse),
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    arn: S.String,
    isAbstract: S.optional(S.Boolean),
    isSchemaInitialized: S.optional(S.Boolean),
    status: S.optional(Status),
    propertyGroups: S.optional(PropertyGroupsResponse),
    syncSource: S.optional(S.String),
    componentTypeName: S.optional(S.String),
    compositeComponentTypes: S.optional(CompositeComponentTypesResponse),
  }),
).annotate({
  identifier: "GetComponentTypeResponse",
}) as any as S.Schema<GetComponentTypeResponse>;
export interface GetEntityRequest {
  workspaceId: string;
  entityId: string;
}
export const GetEntityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    entityId: S.String.pipe(T.HttpLabel("entityId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/workspaces/{workspaceId}/entities/{entityId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEntityRequest",
}) as any as S.Schema<GetEntityRequest>;
export interface PropertyResponse {
  definition?: PropertyDefinitionResponse;
  value?: DataValue;
  areAllPropertyValuesReturned?: boolean;
}
export const PropertyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    definition: S.optional(PropertyDefinitionResponse),
    value: S.optional(DataValue),
    areAllPropertyValuesReturned: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "PropertyResponse",
}) as any as S.Schema<PropertyResponse>;
export type PropertyResponses = { [key: string]: PropertyResponse | undefined };
export const PropertyResponses = /*@__PURE__*/ S.Record(
  S.String,
  PropertyResponse.pipe(S.optional),
);
export interface ComponentPropertyGroupResponse {
  groupType: string;
  propertyNames: string[];
  isInherited: boolean;
}
export const ComponentPropertyGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    groupType: S.String,
    propertyNames: PropertyNames,
    isInherited: S.Boolean,
  }),
).annotate({
  identifier: "ComponentPropertyGroupResponse",
}) as any as S.Schema<ComponentPropertyGroupResponse>;
export type ComponentPropertyGroupResponses = {
  [key: string]: ComponentPropertyGroupResponse | undefined;
};
export const ComponentPropertyGroupResponses = /*@__PURE__*/ S.Record(
  S.String,
  ComponentPropertyGroupResponse.pipe(S.optional),
);
export interface ComponentSummary {
  componentName: string;
  componentTypeId: string;
  definedIn?: string;
  description?: string;
  propertyGroups?: {
    [key: string]: ComponentPropertyGroupResponse | undefined;
  };
  status: Status;
  syncSource?: string;
  componentPath?: string;
}
export const ComponentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    componentName: S.String,
    componentTypeId: S.String,
    definedIn: S.optional(S.String),
    description: S.optional(S.String),
    propertyGroups: S.optional(ComponentPropertyGroupResponses),
    status: Status,
    syncSource: S.optional(S.String),
    componentPath: S.optional(S.String),
  }),
).annotate({
  identifier: "ComponentSummary",
}) as any as S.Schema<ComponentSummary>;
export type CompositeComponentResponse = {
  [key: string]: ComponentSummary | undefined;
};
export const CompositeComponentResponse = /*@__PURE__*/ S.Record(
  S.String,
  ComponentSummary.pipe(S.optional),
);
export interface ComponentResponse {
  componentName?: string;
  description?: string;
  componentTypeId?: string;
  status?: Status;
  definedIn?: string;
  properties?: { [key: string]: PropertyResponse | undefined };
  propertyGroups?: {
    [key: string]: ComponentPropertyGroupResponse | undefined;
  };
  syncSource?: string;
  areAllPropertiesReturned?: boolean;
  compositeComponents?: { [key: string]: ComponentSummary | undefined };
  areAllCompositeComponentsReturned?: boolean;
}
export const ComponentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    componentName: S.optional(S.String),
    description: S.optional(S.String),
    componentTypeId: S.optional(S.String),
    status: S.optional(Status),
    definedIn: S.optional(S.String),
    properties: S.optional(PropertyResponses),
    propertyGroups: S.optional(ComponentPropertyGroupResponses),
    syncSource: S.optional(S.String),
    areAllPropertiesReturned: S.optional(S.Boolean),
    compositeComponents: S.optional(CompositeComponentResponse),
    areAllCompositeComponentsReturned: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ComponentResponse",
}) as any as S.Schema<ComponentResponse>;
export type ComponentsMap = { [key: string]: ComponentResponse | undefined };
export const ComponentsMap = /*@__PURE__*/ S.Record(
  S.String,
  ComponentResponse.pipe(S.optional),
);
export interface GetEntityResponse {
  entityId: string;
  entityName: string;
  arn: string;
  status: Status;
  workspaceId: string;
  description?: string;
  components?: { [key: string]: ComponentResponse | undefined };
  parentEntityId: string;
  hasChildEntities: boolean;
  creationDateTime: Date;
  updateDateTime: Date;
  syncSource?: string;
  areAllComponentsReturned?: boolean;
}
export const GetEntityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entityId: S.String,
    entityName: S.String,
    arn: S.String,
    status: Status,
    workspaceId: S.String,
    description: S.optional(S.String),
    components: S.optional(ComponentsMap),
    parentEntityId: S.String,
    hasChildEntities: S.Boolean,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    syncSource: S.optional(S.String),
    areAllComponentsReturned: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GetEntityResponse",
}) as any as S.Schema<GetEntityResponse>;
export interface GetMetadataTransferJobRequest {
  metadataTransferJobId: string;
}
export const GetMetadataTransferJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metadataTransferJobId: S.String.pipe(T.HttpLabel("metadataTransferJobId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/metadata-transfer-jobs/{metadataTransferJobId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMetadataTransferJobRequest",
}) as any as S.Schema<GetMetadataTransferJobRequest>;
export interface GetMetadataTransferJobResponse {
  metadataTransferJobId: string;
  arn: string;
  description?: string;
  sources: SourceConfiguration[];
  destination: DestinationConfiguration;
  metadataTransferJobRole: string;
  reportUrl?: string;
  creationDateTime: Date;
  updateDateTime: Date;
  status: MetadataTransferJobStatus;
  progress?: MetadataTransferJobProgress;
}
export const GetMetadataTransferJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metadataTransferJobId: S.String,
    arn: S.String,
    description: S.optional(S.String),
    sources: SourceConfigurations,
    destination: DestinationConfiguration,
    metadataTransferJobRole: S.String,
    reportUrl: S.optional(S.String),
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: MetadataTransferJobStatus,
    progress: S.optional(MetadataTransferJobProgress),
  }),
).annotate({
  identifier: "GetMetadataTransferJobResponse",
}) as any as S.Schema<GetMetadataTransferJobResponse>;
export interface GetPricingPlanRequest {}
export const GetPricingPlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/pricingplan" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPricingPlanRequest",
}) as any as S.Schema<GetPricingPlanRequest>;
export type BundleName = string;
export type PricingBundles = string[];
export const PricingBundles = /*@__PURE__*/ S.Array(S.String);
export type PricingTier = string;
export interface BundleInformation {
  bundleNames: string[];
  pricingTier?: string;
}
export const BundleInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bundleNames: PricingBundles, pricingTier: S.optional(S.String) }),
).annotate({
  identifier: "BundleInformation",
}) as any as S.Schema<BundleInformation>;
export type PricingMode = string;
export type UpdateReason = string;
export interface PricingPlan {
  billableEntityCount?: number;
  bundleInformation?: BundleInformation;
  effectiveDateTime: Date;
  pricingMode: string;
  updateDateTime: Date;
  updateReason: string;
}
export const PricingPlan = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    billableEntityCount: S.optional(S.Number),
    bundleInformation: S.optional(BundleInformation),
    effectiveDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    pricingMode: S.String,
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateReason: S.String,
  }),
).annotate({ identifier: "PricingPlan" }) as any as S.Schema<PricingPlan>;
export interface GetPricingPlanResponse {
  currentPricingPlan: PricingPlan;
  pendingPricingPlan?: PricingPlan;
}
export const GetPricingPlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    currentPricingPlan: PricingPlan,
    pendingPricingPlan: S.optional(PricingPlan),
  }),
).annotate({
  identifier: "GetPricingPlanResponse",
}) as any as S.Schema<GetPricingPlanResponse>;
export type SelectedPropertyList = string[];
export const SelectedPropertyList = /*@__PURE__*/ S.Array(S.String);
export type MaxResults = number;
export type Order = string;
export interface OrderBy {
  order?: string;
  propertyName: string;
}
export const OrderBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ order: S.optional(S.String), propertyName: S.String }),
).annotate({ identifier: "OrderBy" }) as any as S.Schema<OrderBy>;
export type OrderByList = OrderBy[];
export const OrderByList = /*@__PURE__*/ S.Array(OrderBy);
export interface PropertyFilter {
  propertyName?: string;
  operator?: string;
  value?: DataValue;
}
export const PropertyFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    propertyName: S.optional(S.String),
    operator: S.optional(S.String),
    value: S.optional(DataValue),
  }),
).annotate({ identifier: "PropertyFilter" }) as any as S.Schema<PropertyFilter>;
export type PropertyFilters = PropertyFilter[];
export const PropertyFilters = /*@__PURE__*/ S.Array(PropertyFilter);
export interface TabularConditions {
  orderBy?: OrderBy[];
  propertyFilters?: PropertyFilter[];
}
export const TabularConditions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    orderBy: S.optional(OrderByList),
    propertyFilters: S.optional(PropertyFilters),
  }),
).annotate({
  identifier: "TabularConditions",
}) as any as S.Schema<TabularConditions>;
export interface GetPropertyValueRequest {
  componentName?: string;
  componentPath?: string;
  componentTypeId?: string;
  entityId?: string;
  selectedProperties: string[];
  workspaceId: string;
  maxResults?: number;
  nextToken?: string;
  propertyGroupName?: string;
  tabularConditions?: TabularConditions;
}
export const GetPropertyValueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    componentName: S.optional(S.String),
    componentPath: S.optional(S.String),
    componentTypeId: S.optional(S.String),
    entityId: S.optional(S.String),
    selectedProperties: SelectedPropertyList,
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    propertyGroupName: S.optional(S.String),
    tabularConditions: S.optional(TabularConditions),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/entity-properties/value",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPropertyValueRequest",
}) as any as S.Schema<GetPropertyValueRequest>;
export interface PropertyLatestValue {
  propertyReference: EntityPropertyReference;
  propertyValue?: DataValue;
}
export const PropertyLatestValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    propertyReference: EntityPropertyReference,
    propertyValue: S.optional(DataValue),
  }),
).annotate({
  identifier: "PropertyLatestValue",
}) as any as S.Schema<PropertyLatestValue>;
export type PropertyLatestValueMap = {
  [key: string]: PropertyLatestValue | undefined;
};
export const PropertyLatestValueMap = /*@__PURE__*/ S.Record(
  S.String,
  PropertyLatestValue.pipe(S.optional),
);
export type PropertyTableValue = { [key: string]: DataValue | undefined };
export const PropertyTableValue = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend((): S.Schema<DataValue> => DataValue)
    .annotate({ identifier: "DataValue" })
    .pipe(S.optional),
);
export type TabularPropertyValue = { [key: string]: DataValue | undefined }[];
export const TabularPropertyValue = /*@__PURE__*/ S.Array(PropertyTableValue);
export type TabularPropertyValues = {
  [key: string]: DataValue | undefined;
}[][];
export const TabularPropertyValues =
  /*@__PURE__*/ S.Array(TabularPropertyValue);
export interface GetPropertyValueResponse {
  propertyValues?: { [key: string]: PropertyLatestValue | undefined };
  nextToken?: string;
  tabularPropertyValues?: { [key: string]: DataValue | undefined }[][];
}
export const GetPropertyValueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    propertyValues: S.optional(PropertyLatestValueMap),
    nextToken: S.optional(S.String),
    tabularPropertyValues: S.optional(TabularPropertyValues),
  }),
).annotate({
  identifier: "GetPropertyValueResponse",
}) as any as S.Schema<GetPropertyValueResponse>;
export type InterpolationType = string;
export type IntervalInSeconds = number;
export interface InterpolationParameters {
  interpolationType?: string;
  intervalInSeconds?: number;
}
export const InterpolationParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    interpolationType: S.optional(S.String),
    intervalInSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "InterpolationParameters",
}) as any as S.Schema<InterpolationParameters>;
export type OrderByTime = string;
export interface GetPropertyValueHistoryRequest {
  workspaceId: string;
  entityId?: string;
  componentName?: string;
  componentPath?: string;
  componentTypeId?: string;
  selectedProperties: string[];
  propertyFilters?: PropertyFilter[];
  startDateTime?: Date;
  endDateTime?: Date;
  interpolation?: InterpolationParameters;
  nextToken?: string;
  maxResults?: number;
  orderByTime?: string;
  startTime?: string;
  endTime?: string;
}
export const GetPropertyValueHistoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    entityId: S.optional(S.String),
    componentName: S.optional(S.String),
    componentPath: S.optional(S.String),
    componentTypeId: S.optional(S.String),
    selectedProperties: SelectedPropertyList,
    propertyFilters: S.optional(PropertyFilters),
    startDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    interpolation: S.optional(InterpolationParameters),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    orderByTime: S.optional(S.String),
    startTime: S.optional(S.String),
    endTime: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/entity-properties/history",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPropertyValueHistoryRequest",
}) as any as S.Schema<GetPropertyValueHistoryRequest>;
export type Values = PropertyValue[];
export const Values = /*@__PURE__*/ S.Array(PropertyValue);
export interface PropertyValueHistory {
  entityPropertyReference: EntityPropertyReference;
  values?: PropertyValue[];
}
export const PropertyValueHistory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entityPropertyReference: EntityPropertyReference,
    values: S.optional(Values),
  }),
).annotate({
  identifier: "PropertyValueHistory",
}) as any as S.Schema<PropertyValueHistory>;
export type PropertyValueList = PropertyValueHistory[];
export const PropertyValueList = /*@__PURE__*/ S.Array(PropertyValueHistory);
export interface GetPropertyValueHistoryResponse {
  propertyValues: PropertyValueHistory[];
  nextToken?: string;
}
export const GetPropertyValueHistoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    propertyValues: PropertyValueList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetPropertyValueHistoryResponse",
}) as any as S.Schema<GetPropertyValueHistoryResponse>;
export interface GetSceneRequest {
  workspaceId: string;
  sceneId: string;
}
export const GetSceneRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    sceneId: S.String.pipe(T.HttpLabel("sceneId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/workspaces/{workspaceId}/scenes/{sceneId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSceneRequest",
}) as any as S.Schema<GetSceneRequest>;
export type GeneratedSceneMetadataMap = { [key: string]: string | undefined };
export const GeneratedSceneMetadataMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type SceneErrorCode = string;
export interface SceneError {
  code?: string;
  message?: string;
}
export const SceneError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: S.optional(S.String), message: S.optional(S.String) }),
).annotate({ identifier: "SceneError" }) as any as S.Schema<SceneError>;
export interface GetSceneResponse {
  workspaceId: string;
  sceneId: string;
  contentLocation: string;
  arn: string;
  creationDateTime: Date;
  updateDateTime: Date;
  description?: string;
  capabilities?: string[];
  sceneMetadata?: { [key: string]: string | undefined };
  generatedSceneMetadata?: { [key: string]: string | undefined };
  error?: SceneError;
}
export const GetSceneResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String,
    sceneId: S.String,
    contentLocation: S.String,
    arn: S.String,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    description: S.optional(S.String),
    capabilities: S.optional(SceneCapabilities),
    sceneMetadata: S.optional(SceneMetadataMap),
    generatedSceneMetadata: S.optional(GeneratedSceneMetadataMap),
    error: S.optional(SceneError),
  }),
).annotate({
  identifier: "GetSceneResponse",
}) as any as S.Schema<GetSceneResponse>;
export interface GetSyncJobRequest {
  syncSource: string;
  workspaceId?: string;
}
export const GetSyncJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    syncSource: S.String.pipe(T.HttpLabel("syncSource")),
    workspaceId: S.optional(S.String).pipe(T.HttpQuery("workspace")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sync-jobs/{syncSource}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSyncJobRequest",
}) as any as S.Schema<GetSyncJobRequest>;
export interface SyncJobStatus {
  state?: string;
  error?: ErrorDetails;
}
export const SyncJobStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ state: S.optional(S.String), error: S.optional(ErrorDetails) }),
).annotate({ identifier: "SyncJobStatus" }) as any as S.Schema<SyncJobStatus>;
export interface GetSyncJobResponse {
  arn: string;
  workspaceId: string;
  syncSource: string;
  syncRole: string;
  status: SyncJobStatus;
  creationDateTime: Date;
  updateDateTime: Date;
}
export const GetSyncJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    workspaceId: S.String,
    syncSource: S.String,
    syncRole: S.String,
    status: SyncJobStatus,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GetSyncJobResponse",
}) as any as S.Schema<GetSyncJobResponse>;
export type IdOrArn = string;
export interface GetWorkspaceRequest {
  workspaceId: string;
}
export const GetWorkspaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/workspaces/{workspaceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkspaceRequest",
}) as any as S.Schema<GetWorkspaceRequest>;
export type LinkedService = string;
export type LinkedServices = string[];
export const LinkedServices = /*@__PURE__*/ S.Array(S.String);
export interface GetWorkspaceResponse {
  workspaceId: string;
  arn: string;
  description?: string;
  linkedServices?: string[];
  s3Location?: string;
  role?: string;
  creationDateTime: Date;
  updateDateTime: Date;
}
export const GetWorkspaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String,
    arn: S.String,
    description: S.optional(S.String),
    linkedServices: S.optional(LinkedServices),
    s3Location: S.optional(S.String),
    role: S.optional(S.String),
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GetWorkspaceResponse",
}) as any as S.Schema<GetWorkspaceResponse>;
export interface ListComponentsRequest {
  workspaceId: string;
  entityId: string;
  componentPath?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListComponentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    entityId: S.String.pipe(T.HttpLabel("entityId")),
    componentPath: S.optional(S.String),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/entities/{entityId}/components-list",
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
export type ComponentSummaries = ComponentSummary[];
export const ComponentSummaries = /*@__PURE__*/ S.Array(ComponentSummary);
export interface ListComponentsResponse {
  componentSummaries: ComponentSummary[];
  nextToken?: string;
}
export const ListComponentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    componentSummaries: ComponentSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListComponentsResponse",
}) as any as S.Schema<ListComponentsResponse>;
export type ListComponentTypesFilter =
  | { extendsFrom: string; namespace?: never; isAbstract?: never }
  | { extendsFrom?: never; namespace: string; isAbstract?: never }
  | { extendsFrom?: never; namespace?: never; isAbstract: boolean };
export const ListComponentTypesFilter = /*@__PURE__*/ S.Union([
  S.Struct({ extendsFrom: S.String }),
  S.Struct({ namespace: S.String }),
  S.Struct({ isAbstract: S.Boolean }),
]);
export type ListComponentTypesFilters = ListComponentTypesFilter[];
export const ListComponentTypesFilters = /*@__PURE__*/ S.Array(
  ListComponentTypesFilter,
);
export interface ListComponentTypesRequest {
  workspaceId: string;
  filters?: ListComponentTypesFilter[];
  nextToken?: string;
  maxResults?: number;
}
export const ListComponentTypesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    filters: S.optional(ListComponentTypesFilters),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/component-types-list",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListComponentTypesRequest",
}) as any as S.Schema<ListComponentTypesRequest>;
export interface ComponentTypeSummary {
  arn: string;
  componentTypeId: string;
  creationDateTime: Date;
  updateDateTime: Date;
  description?: string;
  status?: Status;
  componentTypeName?: string;
}
export const ComponentTypeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    componentTypeId: S.String,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    description: S.optional(S.String),
    status: S.optional(Status),
    componentTypeName: S.optional(S.String),
  }),
).annotate({
  identifier: "ComponentTypeSummary",
}) as any as S.Schema<ComponentTypeSummary>;
export type ComponentTypeSummaries = ComponentTypeSummary[];
export const ComponentTypeSummaries =
  /*@__PURE__*/ S.Array(ComponentTypeSummary);
export interface ListComponentTypesResponse {
  workspaceId: string;
  componentTypeSummaries: ComponentTypeSummary[];
  nextToken?: string;
  maxResults?: number;
}
export const ListComponentTypesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String,
    componentTypeSummaries: ComponentTypeSummaries,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }),
).annotate({
  identifier: "ListComponentTypesResponse",
}) as any as S.Schema<ListComponentTypesResponse>;
export type ListEntitiesFilter =
  | { parentEntityId: string; componentTypeId?: never; externalId?: never }
  | { parentEntityId?: never; componentTypeId: string; externalId?: never }
  | { parentEntityId?: never; componentTypeId?: never; externalId: string };
export const ListEntitiesFilter = /*@__PURE__*/ S.Union([
  S.Struct({ parentEntityId: S.String }),
  S.Struct({ componentTypeId: S.String }),
  S.Struct({ externalId: S.String }),
]);
export type ListEntitiesFilters = ListEntitiesFilter[];
export const ListEntitiesFilters = /*@__PURE__*/ S.Array(ListEntitiesFilter);
export interface ListEntitiesRequest {
  workspaceId: string;
  filters?: ListEntitiesFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListEntitiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    filters: S.optional(ListEntitiesFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/entities-list",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEntitiesRequest",
}) as any as S.Schema<ListEntitiesRequest>;
export interface EntitySummary {
  entityId: string;
  entityName: string;
  arn: string;
  parentEntityId?: string;
  status: Status;
  description?: string;
  hasChildEntities?: boolean;
  creationDateTime: Date;
  updateDateTime: Date;
}
export const EntitySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entityId: S.String,
    entityName: S.String,
    arn: S.String,
    parentEntityId: S.optional(S.String),
    status: Status,
    description: S.optional(S.String),
    hasChildEntities: S.optional(S.Boolean),
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "EntitySummary" }) as any as S.Schema<EntitySummary>;
export type EntitySummaries = EntitySummary[];
export const EntitySummaries = /*@__PURE__*/ S.Array(EntitySummary);
export interface ListEntitiesResponse {
  entitySummaries?: EntitySummary[];
  nextToken?: string;
}
export const ListEntitiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    entitySummaries: S.optional(EntitySummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEntitiesResponse",
}) as any as S.Schema<ListEntitiesResponse>;
export type ListMetadataTransferJobsFilter =
  | { workspaceId: string; state?: never }
  | { workspaceId?: never; state: string };
export const ListMetadataTransferJobsFilter = /*@__PURE__*/ S.Union([
  S.Struct({ workspaceId: S.String }),
  S.Struct({ state: S.String }),
]);
export type ListMetadataTransferJobsFilters = ListMetadataTransferJobsFilter[];
export const ListMetadataTransferJobsFilters = /*@__PURE__*/ S.Array(
  ListMetadataTransferJobsFilter,
);
export interface ListMetadataTransferJobsRequest {
  sourceType: string;
  destinationType: string;
  filters?: ListMetadataTransferJobsFilter[];
  nextToken?: string;
  maxResults?: number;
}
export const ListMetadataTransferJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceType: S.String,
    destinationType: S.String,
    filters: S.optional(ListMetadataTransferJobsFilters),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/metadata-transfer-jobs-list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMetadataTransferJobsRequest",
}) as any as S.Schema<ListMetadataTransferJobsRequest>;
export interface MetadataTransferJobSummary {
  metadataTransferJobId: string;
  arn: string;
  creationDateTime: Date;
  updateDateTime: Date;
  status: MetadataTransferJobStatus;
  progress?: MetadataTransferJobProgress;
}
export const MetadataTransferJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metadataTransferJobId: S.String,
    arn: S.String,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    status: MetadataTransferJobStatus,
    progress: S.optional(MetadataTransferJobProgress),
  }),
).annotate({
  identifier: "MetadataTransferJobSummary",
}) as any as S.Schema<MetadataTransferJobSummary>;
export type MetadataTransferJobSummaries = MetadataTransferJobSummary[];
export const MetadataTransferJobSummaries = /*@__PURE__*/ S.Array(
  MetadataTransferJobSummary,
);
export interface ListMetadataTransferJobsResponse {
  metadataTransferJobSummaries: MetadataTransferJobSummary[];
  nextToken?: string;
}
export const ListMetadataTransferJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    metadataTransferJobSummaries: MetadataTransferJobSummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMetadataTransferJobsResponse",
}) as any as S.Schema<ListMetadataTransferJobsResponse>;
export interface ListPropertiesRequest {
  workspaceId: string;
  componentName?: string;
  componentPath?: string;
  entityId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListPropertiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    componentName: S.optional(S.String),
    componentPath: S.optional(S.String),
    entityId: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/properties-list",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPropertiesRequest",
}) as any as S.Schema<ListPropertiesRequest>;
export interface PropertySummary {
  definition?: PropertyDefinitionResponse;
  propertyName: string;
  value?: DataValue;
  areAllPropertyValuesReturned?: boolean;
}
export const PropertySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    definition: S.optional(PropertyDefinitionResponse),
    propertyName: S.String,
    value: S.optional(DataValue),
    areAllPropertyValuesReturned: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "PropertySummary",
}) as any as S.Schema<PropertySummary>;
export type PropertySummaries = PropertySummary[];
export const PropertySummaries = /*@__PURE__*/ S.Array(PropertySummary);
export interface ListPropertiesResponse {
  propertySummaries: PropertySummary[];
  nextToken?: string;
}
export const ListPropertiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    propertySummaries: PropertySummaries,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPropertiesResponse",
}) as any as S.Schema<ListPropertiesResponse>;
export interface ListScenesRequest {
  workspaceId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListScenesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/scenes-list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListScenesRequest",
}) as any as S.Schema<ListScenesRequest>;
export interface SceneSummary {
  sceneId: string;
  contentLocation: string;
  arn: string;
  creationDateTime: Date;
  updateDateTime: Date;
  description?: string;
}
export const SceneSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sceneId: S.String,
    contentLocation: S.String,
    arn: S.String,
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    description: S.optional(S.String),
  }),
).annotate({ identifier: "SceneSummary" }) as any as S.Schema<SceneSummary>;
export type SceneSummaries = SceneSummary[];
export const SceneSummaries = /*@__PURE__*/ S.Array(SceneSummary);
export interface ListScenesResponse {
  sceneSummaries?: SceneSummary[];
  nextToken?: string;
}
export const ListScenesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sceneSummaries: S.optional(SceneSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListScenesResponse",
}) as any as S.Schema<ListScenesResponse>;
export interface ListSyncJobsRequest {
  workspaceId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListSyncJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/sync-jobs-list",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSyncJobsRequest",
}) as any as S.Schema<ListSyncJobsRequest>;
export interface SyncJobSummary {
  arn?: string;
  workspaceId?: string;
  syncSource?: string;
  status?: SyncJobStatus;
  creationDateTime?: Date;
  updateDateTime?: Date;
}
export const SyncJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    workspaceId: S.optional(S.String),
    syncSource: S.optional(S.String),
    status: S.optional(SyncJobStatus),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    updateDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "SyncJobSummary" }) as any as S.Schema<SyncJobSummary>;
export type SyncJobSummaries = SyncJobSummary[];
export const SyncJobSummaries = /*@__PURE__*/ S.Array(SyncJobSummary);
export interface ListSyncJobsResponse {
  syncJobSummaries?: SyncJobSummary[];
  nextToken?: string;
}
export const ListSyncJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    syncJobSummaries: S.optional(SyncJobSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSyncJobsResponse",
}) as any as S.Schema<ListSyncJobsResponse>;
export type SyncResourceState = string;
export type SyncResourceType = string;
export type SyncResourceFilter =
  | {
      state: string;
      resourceType?: never;
      resourceId?: never;
      externalId?: never;
    }
  | {
      state?: never;
      resourceType: string;
      resourceId?: never;
      externalId?: never;
    }
  | {
      state?: never;
      resourceType?: never;
      resourceId: string;
      externalId?: never;
    }
  | {
      state?: never;
      resourceType?: never;
      resourceId?: never;
      externalId: string;
    };
export const SyncResourceFilter = /*@__PURE__*/ S.Union([
  S.Struct({ state: S.String }),
  S.Struct({ resourceType: S.String }),
  S.Struct({ resourceId: S.String }),
  S.Struct({ externalId: S.String }),
]);
export type SyncResourceFilters = SyncResourceFilter[];
export const SyncResourceFilters = /*@__PURE__*/ S.Array(SyncResourceFilter);
export interface ListSyncResourcesRequest {
  workspaceId: string;
  syncSource: string;
  filters?: SyncResourceFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListSyncResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    syncSource: S.String.pipe(T.HttpLabel("syncSource")),
    filters: S.optional(SyncResourceFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/workspaces/{workspaceId}/sync-jobs/{syncSource}/resources-list",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSyncResourcesRequest",
}) as any as S.Schema<ListSyncResourcesRequest>;
export interface SyncResourceStatus {
  state?: string;
  error?: ErrorDetails;
}
export const SyncResourceStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ state: S.optional(S.String), error: S.optional(ErrorDetails) }),
).annotate({
  identifier: "SyncResourceStatus",
}) as any as S.Schema<SyncResourceStatus>;
export interface SyncResourceSummary {
  resourceType?: string;
  externalId?: string;
  resourceId?: string;
  status?: SyncResourceStatus;
  updateDateTime?: Date;
}
export const SyncResourceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceType: S.optional(S.String),
    externalId: S.optional(S.String),
    resourceId: S.optional(S.String),
    status: S.optional(SyncResourceStatus),
    updateDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "SyncResourceSummary",
}) as any as S.Schema<SyncResourceSummary>;
export type SyncResourceSummaries = SyncResourceSummary[];
export const SyncResourceSummaries = /*@__PURE__*/ S.Array(SyncResourceSummary);
export interface ListSyncResourcesResponse {
  syncResources?: SyncResourceSummary[];
  nextToken?: string;
}
export const ListSyncResourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    syncResources: S.optional(SyncResourceSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSyncResourcesResponse",
}) as any as S.Schema<ListSyncResourcesResponse>;
export interface ListTagsForResourceRequest {
  resourceARN: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceARN: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags-list" }),
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
  tags?: { [key: string]: string | undefined };
  nextToken?: string;
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap), nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListWorkspacesRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListWorkspacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/workspaces-list" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkspacesRequest",
}) as any as S.Schema<ListWorkspacesRequest>;
export interface WorkspaceSummary {
  workspaceId: string;
  arn: string;
  description?: string;
  linkedServices?: string[];
  creationDateTime: Date;
  updateDateTime: Date;
}
export const WorkspaceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String,
    arn: S.String,
    description: S.optional(S.String),
    linkedServices: S.optional(LinkedServices),
    creationDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "WorkspaceSummary",
}) as any as S.Schema<WorkspaceSummary>;
export type WorkspaceSummaries = WorkspaceSummary[];
export const WorkspaceSummaries = /*@__PURE__*/ S.Array(WorkspaceSummary);
export interface ListWorkspacesResponse {
  workspaceSummaries?: WorkspaceSummary[];
  nextToken?: string;
}
export const ListWorkspacesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceSummaries: S.optional(WorkspaceSummaries),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWorkspacesResponse",
}) as any as S.Schema<ListWorkspacesResponse>;
export interface TagResourceRequest {
  resourceARN: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceARN: S.String, tags: TagMap }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags" }),
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
  resourceARN: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceARN: S.String.pipe(T.HttpQuery("resourceARN")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags" }),
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
export interface UpdateComponentTypeRequest {
  workspaceId: string;
  isSingleton?: boolean;
  componentTypeId: string;
  description?: string;
  propertyDefinitions?: {
    [key: string]: PropertyDefinitionRequest | undefined;
  };
  extendsFrom?: string[];
  functions?: { [key: string]: FunctionRequest | undefined };
  propertyGroups?: { [key: string]: PropertyGroupRequest | undefined };
  componentTypeName?: string;
  compositeComponentTypes?: {
    [key: string]: CompositeComponentTypeRequest | undefined;
  };
}
export const UpdateComponentTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    isSingleton: S.optional(S.Boolean),
    componentTypeId: S.String.pipe(T.HttpLabel("componentTypeId")),
    description: S.optional(S.String),
    propertyDefinitions: S.optional(PropertyDefinitionsRequest),
    extendsFrom: S.optional(ExtendsFrom),
    functions: S.optional(FunctionsRequest),
    propertyGroups: S.optional(PropertyGroupsRequest),
    componentTypeName: S.optional(S.String),
    compositeComponentTypes: S.optional(CompositeComponentTypesRequest),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/workspaces/{workspaceId}/component-types/{componentTypeId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateComponentTypeRequest",
}) as any as S.Schema<UpdateComponentTypeRequest>;
export interface UpdateComponentTypeResponse {
  workspaceId: string;
  arn: string;
  componentTypeId: string;
  state: string;
}
export const UpdateComponentTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String,
    arn: S.String,
    componentTypeId: S.String,
    state: S.String,
  }),
).annotate({
  identifier: "UpdateComponentTypeResponse",
}) as any as S.Schema<UpdateComponentTypeResponse>;
export type ComponentUpdateType = string;
export interface ComponentUpdateRequest {
  updateType?: string;
  description?: string;
  componentTypeId?: string;
  propertyUpdates?: { [key: string]: PropertyRequest | undefined };
  propertyGroupUpdates?: {
    [key: string]: ComponentPropertyGroupRequest | undefined;
  };
}
export const ComponentUpdateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    updateType: S.optional(S.String),
    description: S.optional(S.String),
    componentTypeId: S.optional(S.String),
    propertyUpdates: S.optional(PropertyRequests),
    propertyGroupUpdates: S.optional(ComponentPropertyGroupRequests),
  }),
).annotate({
  identifier: "ComponentUpdateRequest",
}) as any as S.Schema<ComponentUpdateRequest>;
export type ComponentUpdatesMapRequest = {
  [key: string]: ComponentUpdateRequest | undefined;
};
export const ComponentUpdatesMapRequest = /*@__PURE__*/ S.Record(
  S.String,
  ComponentUpdateRequest.pipe(S.optional),
);
export interface CompositeComponentUpdateRequest {
  updateType?: string;
  description?: string;
  propertyUpdates?: { [key: string]: PropertyRequest | undefined };
  propertyGroupUpdates?: {
    [key: string]: ComponentPropertyGroupRequest | undefined;
  };
}
export const CompositeComponentUpdateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    updateType: S.optional(S.String),
    description: S.optional(S.String),
    propertyUpdates: S.optional(PropertyRequests),
    propertyGroupUpdates: S.optional(ComponentPropertyGroupRequests),
  }),
).annotate({
  identifier: "CompositeComponentUpdateRequest",
}) as any as S.Schema<CompositeComponentUpdateRequest>;
export type CompositeComponentUpdatesMapRequest = {
  [key: string]: CompositeComponentUpdateRequest | undefined;
};
export const CompositeComponentUpdatesMapRequest = /*@__PURE__*/ S.Record(
  S.String,
  CompositeComponentUpdateRequest.pipe(S.optional),
);
export type ParentEntityUpdateType = string;
export interface ParentEntityUpdateRequest {
  updateType: string;
  parentEntityId?: string;
}
export const ParentEntityUpdateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ updateType: S.String, parentEntityId: S.optional(S.String) }),
).annotate({
  identifier: "ParentEntityUpdateRequest",
}) as any as S.Schema<ParentEntityUpdateRequest>;
export interface UpdateEntityRequest {
  workspaceId: string;
  entityId: string;
  entityName?: string;
  description?: string;
  componentUpdates?: { [key: string]: ComponentUpdateRequest | undefined };
  compositeComponentUpdates?: {
    [key: string]: CompositeComponentUpdateRequest | undefined;
  };
  parentEntityUpdate?: ParentEntityUpdateRequest;
}
export const UpdateEntityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    entityId: S.String.pipe(T.HttpLabel("entityId")),
    entityName: S.optional(S.String),
    description: S.optional(S.String),
    componentUpdates: S.optional(ComponentUpdatesMapRequest),
    compositeComponentUpdates: S.optional(CompositeComponentUpdatesMapRequest),
    parentEntityUpdate: S.optional(ParentEntityUpdateRequest),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/workspaces/{workspaceId}/entities/{entityId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEntityRequest",
}) as any as S.Schema<UpdateEntityRequest>;
export interface UpdateEntityResponse {
  updateDateTime: Date;
  state: string;
}
export const UpdateEntityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    state: S.String,
  }),
).annotate({
  identifier: "UpdateEntityResponse",
}) as any as S.Schema<UpdateEntityResponse>;
export interface UpdatePricingPlanRequest {
  pricingMode: string;
  bundleNames?: string[];
}
export const UpdatePricingPlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pricingMode: S.String,
    bundleNames: S.optional(PricingBundles),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/pricingplan" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePricingPlanRequest",
}) as any as S.Schema<UpdatePricingPlanRequest>;
export interface UpdatePricingPlanResponse {
  currentPricingPlan: PricingPlan;
  pendingPricingPlan?: PricingPlan;
}
export const UpdatePricingPlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    currentPricingPlan: PricingPlan,
    pendingPricingPlan: S.optional(PricingPlan),
  }),
).annotate({
  identifier: "UpdatePricingPlanResponse",
}) as any as S.Schema<UpdatePricingPlanResponse>;
export interface UpdateSceneRequest {
  workspaceId: string;
  sceneId: string;
  contentLocation?: string;
  description?: string;
  capabilities?: string[];
  sceneMetadata?: { [key: string]: string | undefined };
}
export const UpdateSceneRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    sceneId: S.String.pipe(T.HttpLabel("sceneId")),
    contentLocation: S.optional(S.String),
    description: S.optional(S.String),
    capabilities: S.optional(SceneCapabilities),
    sceneMetadata: S.optional(SceneMetadataMap),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/workspaces/{workspaceId}/scenes/{sceneId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSceneRequest",
}) as any as S.Schema<UpdateSceneRequest>;
export interface UpdateSceneResponse {
  updateDateTime: Date;
}
export const UpdateSceneResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")) }),
).annotate({
  identifier: "UpdateSceneResponse",
}) as any as S.Schema<UpdateSceneResponse>;
export interface UpdateWorkspaceRequest {
  workspaceId: string;
  description?: string;
  role?: string;
  s3Location?: string;
}
export const UpdateWorkspaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
    description: S.optional(S.String),
    role: S.optional(S.String),
    s3Location: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/workspaces/{workspaceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateWorkspaceRequest",
}) as any as S.Schema<UpdateWorkspaceRequest>;
export interface UpdateWorkspaceResponse {
  updateDateTime: Date;
}
export const UpdateWorkspaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ updateDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")) }),
).annotate({
  identifier: "UpdateWorkspaceResponse",
}) as any as S.Schema<UpdateWorkspaceResponse>;
export type ExceptionMessage = string;
export type BatchPutPropertyValuesError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets values for multiple time series properties.
 */
export const batchPutPropertyValues: API.OperationMethod<
  BatchPutPropertyValuesRequest,
  BatchPutPropertyValuesResponse,
  BatchPutPropertyValuesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchPutPropertyValuesRequest,
  output: BatchPutPropertyValuesResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchPutPropertyValues",
  endpointHostPrefix: "data.",
}));

export type CancelMetadataTransferJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels the metadata transfer job.
 */
export const cancelMetadataTransferJob: API.OperationMethod<
  CancelMetadataTransferJobRequest,
  CancelMetadataTransferJobResponse,
  CancelMetadataTransferJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelMetadataTransferJobRequest,
  output: CancelMetadataTransferJobResponse,
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
  operationName: "CancelMetadataTransferJob",
  endpointHostPrefix: "api.",
}));

export type CreateComponentTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a component type.
 */
export const createComponentType: API.OperationMethod<
  CreateComponentTypeRequest,
  CreateComponentTypeResponse,
  CreateComponentTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateComponentTypeRequest,
  output: CreateComponentTypeResponse,
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
  operationName: "CreateComponentType",
  endpointHostPrefix: "api.",
}));

export type CreateEntityError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an entity.
 */
export const createEntity: API.OperationMethod<
  CreateEntityRequest,
  CreateEntityResponse,
  CreateEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEntityRequest,
  output: CreateEntityResponse,
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
  operationName: "CreateEntity",
  endpointHostPrefix: "api.",
}));

export type CreateMetadataTransferJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new metadata transfer job.
 */
export const createMetadataTransferJob: API.OperationMethod<
  CreateMetadataTransferJobRequest,
  CreateMetadataTransferJobResponse,
  CreateMetadataTransferJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMetadataTransferJobRequest,
  output: CreateMetadataTransferJobResponse,
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
  operationName: "CreateMetadataTransferJob",
  endpointHostPrefix: "api.",
}));

export type CreateSceneError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a scene.
 */
export const createScene: API.OperationMethod<
  CreateSceneRequest,
  CreateSceneResponse,
  CreateSceneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSceneRequest,
  output: CreateSceneResponse,
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
  operationName: "CreateScene",
  endpointHostPrefix: "api.",
}));

export type CreateSyncJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action creates a SyncJob.
 */
export const createSyncJob: API.OperationMethod<
  CreateSyncJobRequest,
  CreateSyncJobResponse,
  CreateSyncJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSyncJobRequest,
  output: CreateSyncJobResponse,
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
  operationName: "CreateSyncJob",
  endpointHostPrefix: "api.",
}));

export type CreateWorkspaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a workplace.
 */
export const createWorkspace: API.OperationMethod<
  CreateWorkspaceRequest,
  CreateWorkspaceResponse,
  CreateWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWorkspaceRequest,
  output: CreateWorkspaceResponse,
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
  operationName: "CreateWorkspace",
  endpointHostPrefix: "api.",
}));

export type DeleteComponentTypeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a component type.
 */
export const deleteComponentType: API.OperationMethod<
  DeleteComponentTypeRequest,
  DeleteComponentTypeResponse,
  DeleteComponentTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteComponentTypeRequest,
  output: DeleteComponentTypeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteComponentType",
  endpointHostPrefix: "api.",
}));

export type DeleteEntityError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an entity.
 */
export const deleteEntity: API.OperationMethod<
  DeleteEntityRequest,
  DeleteEntityResponse,
  DeleteEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEntityRequest,
  output: DeleteEntityResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEntity",
  endpointHostPrefix: "api.",
}));

export type DeleteSceneError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a scene.
 */
export const deleteScene: API.OperationMethod<
  DeleteSceneRequest,
  DeleteSceneResponse,
  DeleteSceneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSceneRequest,
  output: DeleteSceneResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScene",
  endpointHostPrefix: "api.",
}));

export type DeleteSyncJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete the SyncJob.
 */
export const deleteSyncJob: API.OperationMethod<
  DeleteSyncJobRequest,
  DeleteSyncJobResponse,
  DeleteSyncJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSyncJobRequest,
  output: DeleteSyncJobResponse,
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
  operationName: "DeleteSyncJob",
  endpointHostPrefix: "api.",
}));

export type DeleteWorkspaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a workspace.
 */
export const deleteWorkspace: API.OperationMethod<
  DeleteWorkspaceRequest,
  DeleteWorkspaceResponse,
  DeleteWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWorkspaceRequest,
  output: DeleteWorkspaceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkspace",
  endpointHostPrefix: "api.",
}));

export type ExecuteQueryError =
  | AccessDeniedException
  | InternalServerException
  | QueryTimeoutException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Run queries to access information from your knowledge graph of entities within
 * individual workspaces.
 *
 * The ExecuteQuery action only works with Amazon Web Services Java SDK2.
 * ExecuteQuery will not work with any Amazon Web Services Java SDK version < 2.x.
 */
export const executeQuery: API.PaginatedOperationMethod<
  ExecuteQueryRequest,
  ExecuteQueryResponse,
  ExecuteQueryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ExecuteQueryRequest,
  output: ExecuteQueryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    QueryTimeoutException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteQuery",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetComponentTypeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a component type.
 */
export const getComponentType: API.OperationMethod<
  GetComponentTypeRequest,
  GetComponentTypeResponse,
  GetComponentTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetComponentTypeRequest,
  output: GetComponentTypeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComponentType",
  endpointHostPrefix: "api.",
}));

export type GetEntityError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an entity.
 */
export const getEntity: API.OperationMethod<
  GetEntityRequest,
  GetEntityResponse,
  GetEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEntityRequest,
  output: GetEntityResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEntity",
  endpointHostPrefix: "api.",
}));

export type GetMetadataTransferJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a nmetadata transfer job.
 */
export const getMetadataTransferJob: API.OperationMethod<
  GetMetadataTransferJobRequest,
  GetMetadataTransferJobResponse,
  GetMetadataTransferJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMetadataTransferJobRequest,
  output: GetMetadataTransferJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetadataTransferJob",
  endpointHostPrefix: "api.",
}));

export type GetPricingPlanError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the pricing plan.
 */
export const getPricingPlan: API.OperationMethod<
  GetPricingPlanRequest,
  GetPricingPlanResponse,
  GetPricingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPricingPlanRequest,
  output: GetPricingPlanResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPricingPlan",
  endpointHostPrefix: "api.",
}));

export type GetPropertyValueError =
  | AccessDeniedException
  | ConnectorFailureException
  | ConnectorTimeoutException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the property values for a component, component type, entity, or workspace.
 *
 * You must specify a value for either `componentName`,
 * `componentTypeId`, `entityId`, or `workspaceId`.
 */
export const getPropertyValue: API.PaginatedOperationMethod<
  GetPropertyValueRequest,
  GetPropertyValueResponse,
  GetPropertyValueError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetPropertyValueRequest,
  output: GetPropertyValueResponse,
  errors: [
    AccessDeniedException,
    ConnectorFailureException,
    ConnectorTimeoutException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPropertyValue",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetPropertyValueHistoryError =
  | AccessDeniedException
  | ConnectorFailureException
  | ConnectorTimeoutException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the history of a time series property value for a component,
 * component type, entity, or workspace.
 *
 * You must specify a value for `workspaceId`. For entity-specific queries,
 * specify values for `componentName` and `entityId`. For cross-entity
 * quries, specify a value for `componentTypeId`.
 */
export const getPropertyValueHistory: API.PaginatedOperationMethod<
  GetPropertyValueHistoryRequest,
  GetPropertyValueHistoryResponse,
  GetPropertyValueHistoryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetPropertyValueHistoryRequest,
  output: GetPropertyValueHistoryResponse,
  errors: [
    AccessDeniedException,
    ConnectorFailureException,
    ConnectorTimeoutException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPropertyValueHistory",
  endpointHostPrefix: "data.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetSceneError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a scene.
 */
export const getScene: API.OperationMethod<
  GetSceneRequest,
  GetSceneResponse,
  GetSceneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSceneRequest,
  output: GetSceneResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetScene",
  endpointHostPrefix: "api.",
}));

export type GetSyncJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the SyncJob.
 */
export const getSyncJob: API.OperationMethod<
  GetSyncJobRequest,
  GetSyncJobResponse,
  GetSyncJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSyncJobRequest,
  output: GetSyncJobResponse,
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
  operationName: "GetSyncJob",
  endpointHostPrefix: "api.",
}));

export type GetWorkspaceError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a workspace.
 */
export const getWorkspace: API.OperationMethod<
  GetWorkspaceRequest,
  GetWorkspaceResponse,
  GetWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWorkspaceRequest,
  output: GetWorkspaceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkspace",
  endpointHostPrefix: "api.",
}));

export type ListComponentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This API lists the components of an entity.
 */
export const listComponents: API.PaginatedOperationMethod<
  ListComponentsRequest,
  ListComponentsResponse,
  ListComponentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListComponentsRequest,
  output: ListComponentsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComponents",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListComponentTypesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all component types in a workspace.
 */
export const listComponentTypes: API.PaginatedOperationMethod<
  ListComponentTypesRequest,
  ListComponentTypesResponse,
  ListComponentTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListComponentTypesRequest,
  output: ListComponentTypesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComponentTypes",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEntitiesError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all entities in a workspace.
 */
export const listEntities: API.PaginatedOperationMethod<
  ListEntitiesRequest,
  ListEntitiesResponse,
  ListEntitiesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEntitiesRequest,
  output: ListEntitiesResponse,
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntities",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMetadataTransferJobsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the metadata transfer jobs.
 */
export const listMetadataTransferJobs: API.PaginatedOperationMethod<
  ListMetadataTransferJobsRequest,
  ListMetadataTransferJobsResponse,
  ListMetadataTransferJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMetadataTransferJobsRequest,
  output: ListMetadataTransferJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMetadataTransferJobs",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPropertiesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This API lists the properties of a component.
 */
export const listProperties: API.PaginatedOperationMethod<
  ListPropertiesRequest,
  ListPropertiesResponse,
  ListPropertiesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPropertiesRequest,
  output: ListPropertiesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProperties",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListScenesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all scenes in a workspace.
 */
export const listScenes: API.PaginatedOperationMethod<
  ListScenesRequest,
  ListScenesResponse,
  ListScenesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListScenesRequest,
  output: ListScenesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScenes",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSyncJobsError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all SyncJobs.
 */
export const listSyncJobs: API.PaginatedOperationMethod<
  ListSyncJobsRequest,
  ListSyncJobsResponse,
  ListSyncJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSyncJobsRequest,
  output: ListSyncJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSyncJobs",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSyncResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the sync resources.
 */
export const listSyncResources: API.PaginatedOperationMethod<
  ListSyncResourcesRequest,
  ListSyncResourcesResponse,
  ListSyncResourcesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSyncResourcesRequest,
  output: ListSyncResourcesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSyncResources",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists all tags associated with a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  endpointHostPrefix: "api.",
}));

export type ListWorkspacesError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about workspaces in the current account.
 */
export const listWorkspaces: API.PaginatedOperationMethod<
  ListWorkspacesRequest,
  ListWorkspacesResponse,
  ListWorkspacesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkspacesRequest,
  output: ListWorkspacesResponse,
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkspaces",
  endpointHostPrefix: "api.",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Adds tags to a resource.
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
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  endpointHostPrefix: "api.",
}));

export type UntagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [AccessDeniedException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  endpointHostPrefix: "api.",
}));

export type UpdateComponentTypeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates information in a component type.
 */
export const updateComponentType: API.OperationMethod<
  UpdateComponentTypeRequest,
  UpdateComponentTypeResponse,
  UpdateComponentTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateComponentTypeRequest,
  output: UpdateComponentTypeResponse,
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
  operationName: "UpdateComponentType",
  endpointHostPrefix: "api.",
}));

export type UpdateEntityError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an entity.
 */
export const updateEntity: API.OperationMethod<
  UpdateEntityRequest,
  UpdateEntityResponse,
  UpdateEntityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEntityRequest,
  output: UpdateEntityResponse,
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
  operationName: "UpdateEntity",
  endpointHostPrefix: "api.",
}));

export type UpdatePricingPlanError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the pricing plan.
 */
export const updatePricingPlan: API.OperationMethod<
  UpdatePricingPlanRequest,
  UpdatePricingPlanResponse,
  UpdatePricingPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePricingPlanRequest,
  output: UpdatePricingPlanResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePricingPlan",
  endpointHostPrefix: "api.",
}));

export type UpdateSceneError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a scene.
 */
export const updateScene: API.OperationMethod<
  UpdateSceneRequest,
  UpdateSceneResponse,
  UpdateSceneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSceneRequest,
  output: UpdateSceneResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateScene",
  endpointHostPrefix: "api.",
}));

export type UpdateWorkspaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a workspace.
 */
export const updateWorkspace: API.OperationMethod<
  UpdateWorkspaceRequest,
  UpdateWorkspaceResponse,
  UpdateWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWorkspaceRequest,
  output: UpdateWorkspaceResponse,
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
  operationName: "UpdateWorkspace",
  endpointHostPrefix: "api.",
}));
