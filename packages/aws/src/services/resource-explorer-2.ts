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
  sdkId: "Resource Explorer 2",
  serviceShapeName: "ResourceExplorer",
});
const auth = T.AwsAuthSigv4({ name: "resource-explorer-2" });
const ver = T.ServiceVersion("2022-07-28");
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
              `https://resource-explorer-2-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://resource-explorer-2-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://resource-explorer-2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://resource-explorer-2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      Name: S.String,
      Value: S.String,
    },
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
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      FieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export interface AssociateDefaultViewInput {
  ViewArn: string;
}
export const AssociateDefaultViewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ViewArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/AssociateDefaultView" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateDefaultViewInput",
}) as any as S.Schema<AssociateDefaultViewInput>;
export interface AssociateDefaultViewOutput {
  ViewArn?: string;
}
export const AssociateDefaultViewOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ViewArn: S.optional(S.String) }),
).annotate({
  identifier: "AssociateDefaultViewOutput",
}) as any as S.Schema<AssociateDefaultViewOutput>;
export type ViewArnList = string[];
export const ViewArnList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetViewInput {
  ViewArns?: string[];
}
export const BatchGetViewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ViewArns: S.optional(ViewArnList) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchGetView" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetViewInput",
}) as any as S.Schema<BatchGetViewInput>;
export type ViewName = string;
export interface IncludedProperty {
  Name: string;
}
export const IncludedProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({
  identifier: "IncludedProperty",
}) as any as S.Schema<IncludedProperty>;
export type IncludedPropertyList = IncludedProperty[];
export const IncludedPropertyList = /*@__PURE__*/ S.Array(IncludedProperty);
export interface SearchFilter {
  FilterString: string;
}
export const SearchFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FilterString: S.String }),
).annotate({ identifier: "SearchFilter" }) as any as S.Schema<SearchFilter>;
export interface View {
  ViewArn?: string;
  ViewName?: string;
  Owner?: string;
  LastUpdatedAt?: Date;
  Scope?: string;
  IncludedProperties?: IncludedProperty[];
  Filters?: SearchFilter;
}
export const View = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ViewArn: S.optional(S.String),
    ViewName: S.optional(S.String),
    Owner: S.optional(S.String),
    LastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Scope: S.optional(S.String),
    IncludedProperties: S.optional(IncludedPropertyList),
    Filters: S.optional(SearchFilter),
  }),
).annotate({ identifier: "View" }) as any as S.Schema<View>;
export type ViewList = View[];
export const ViewList = /*@__PURE__*/ S.Array(View);
export interface BatchGetViewError_ {
  ViewArn: string;
  ErrorMessage: string;
}
export const BatchGetViewError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ViewArn: S.String, ErrorMessage: S.String }),
).annotate({
  identifier: "BatchGetViewError",
}) as any as S.Schema<BatchGetViewError_>;
export type BatchGetViewErrors = BatchGetViewError_[];
export const BatchGetViewErrors = /*@__PURE__*/ S.Array(BatchGetViewError_);
export interface BatchGetViewOutput {
  Views?: View[];
  Errors?: BatchGetViewError_[];
}
export const BatchGetViewOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Views: S.optional(ViewList),
    Errors: S.optional(BatchGetViewErrors),
  }),
).annotate({
  identifier: "BatchGetViewOutput",
}) as any as S.Schema<BatchGetViewOutput>;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateIndexInput {
  ClientToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateIndexInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateIndex" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateIndexInput",
}) as any as S.Schema<CreateIndexInput>;
export type IndexState = string;
export interface CreateIndexOutput {
  Arn?: string;
  State?: string;
  CreatedAt?: Date;
}
export const CreateIndexOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    State: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CreateIndexOutput",
}) as any as S.Schema<CreateIndexOutput>;
export type RegionList = string[];
export const RegionList = /*@__PURE__*/ S.Array(S.String);
export interface CreateResourceExplorerSetupInput {
  RegionList: string[];
  AggregatorRegions?: string[];
  ViewName: string;
}
export const CreateResourceExplorerSetupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegionList: RegionList,
    AggregatorRegions: S.optional(RegionList),
    ViewName: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateResourceExplorerSetup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateResourceExplorerSetupInput",
}) as any as S.Schema<CreateResourceExplorerSetupInput>;
export interface CreateResourceExplorerSetupOutput {
  TaskId: string;
}
export const CreateResourceExplorerSetupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TaskId: S.String }),
).annotate({
  identifier: "CreateResourceExplorerSetupOutput",
}) as any as S.Schema<CreateResourceExplorerSetupOutput>;
export interface CreateViewInput {
  ClientToken?: string;
  ViewName: string;
  IncludedProperties?: IncludedProperty[];
  Scope?: string;
  Filters?: SearchFilter;
  Tags?: { [key: string]: string | undefined };
}
export const CreateViewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    ViewName: S.String,
    IncludedProperties: S.optional(IncludedPropertyList),
    Scope: S.optional(S.String),
    Filters: S.optional(SearchFilter),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateView" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateViewInput",
}) as any as S.Schema<CreateViewInput>;
export interface CreateViewOutput {
  View?: View;
}
export const CreateViewOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ View: S.optional(View) }),
).annotate({
  identifier: "CreateViewOutput",
}) as any as S.Schema<CreateViewOutput>;
export interface DeleteIndexInput {
  Arn: string;
}
export const DeleteIndexInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteIndex" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIndexInput",
}) as any as S.Schema<DeleteIndexInput>;
export interface DeleteIndexOutput {
  Arn?: string;
  State?: string;
  LastUpdatedAt?: Date;
}
export const DeleteIndexOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    State: S.optional(S.String),
    LastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "DeleteIndexOutput",
}) as any as S.Schema<DeleteIndexOutput>;
export interface DeleteResourceExplorerSetupInput {
  RegionList?: string[];
  DeleteInAllRegions?: boolean;
}
export const DeleteResourceExplorerSetupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegionList: S.optional(RegionList),
    DeleteInAllRegions: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteResourceExplorerSetup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteResourceExplorerSetupInput",
}) as any as S.Schema<DeleteResourceExplorerSetupInput>;
export interface DeleteResourceExplorerSetupOutput {
  TaskId: string;
}
export const DeleteResourceExplorerSetupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TaskId: S.String }),
).annotate({
  identifier: "DeleteResourceExplorerSetupOutput",
}) as any as S.Schema<DeleteResourceExplorerSetupOutput>;
export interface DeleteViewInput {
  ViewArn: string;
}
export const DeleteViewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ViewArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteView" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteViewInput",
}) as any as S.Schema<DeleteViewInput>;
export interface DeleteViewOutput {
  ViewArn?: string;
}
export const DeleteViewOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ViewArn: S.optional(S.String) }),
).annotate({
  identifier: "DeleteViewOutput",
}) as any as S.Schema<DeleteViewOutput>;
export interface DisassociateDefaultViewRequest {}
export const DisassociateDefaultViewRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DisassociateDefaultView" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateDefaultViewRequest",
}) as any as S.Schema<DisassociateDefaultViewRequest>;
export interface DisassociateDefaultViewResponse {}
export const DisassociateDefaultViewResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateDefaultViewResponse",
}) as any as S.Schema<DisassociateDefaultViewResponse>;
export interface GetAccountLevelServiceConfigurationRequest {}
export const GetAccountLevelServiceConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/GetAccountLevelServiceConfiguration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetAccountLevelServiceConfigurationRequest",
  }) as any as S.Schema<GetAccountLevelServiceConfigurationRequest>;
export type AWSServiceAccessStatus = string;
export interface OrgConfiguration {
  AWSServiceAccessStatus: string;
  ServiceLinkedRole?: string;
}
export const OrgConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AWSServiceAccessStatus: S.String,
    ServiceLinkedRole: S.optional(S.String),
  }),
).annotate({
  identifier: "OrgConfiguration",
}) as any as S.Schema<OrgConfiguration>;
export interface GetAccountLevelServiceConfigurationOutput {
  OrgConfiguration?: OrgConfiguration;
}
export const GetAccountLevelServiceConfigurationOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ OrgConfiguration: S.optional(OrgConfiguration) }),
  ).annotate({
    identifier: "GetAccountLevelServiceConfigurationOutput",
  }) as any as S.Schema<GetAccountLevelServiceConfigurationOutput>;
export interface GetDefaultViewRequest {}
export const GetDefaultViewRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetDefaultView" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDefaultViewRequest",
}) as any as S.Schema<GetDefaultViewRequest>;
export interface GetDefaultViewOutput {
  ViewArn?: string;
}
export const GetDefaultViewOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ViewArn: S.optional(S.String) }),
).annotate({
  identifier: "GetDefaultViewOutput",
}) as any as S.Schema<GetDefaultViewOutput>;
export interface GetIndexRequest {}
export const GetIndexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetIndex" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIndexRequest",
}) as any as S.Schema<GetIndexRequest>;
export type IndexType = string;
export interface GetIndexOutput {
  Arn?: string;
  Type?: string;
  State?: string;
  ReplicatingFrom?: string[];
  ReplicatingTo?: string[];
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Tags?: { [key: string]: string | undefined };
}
export const GetIndexOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Type: S.optional(S.String),
    State: S.optional(S.String),
    ReplicatingFrom: S.optional(RegionList),
    ReplicatingTo: S.optional(RegionList),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Tags: S.optional(TagMap),
  }),
).annotate({ identifier: "GetIndexOutput" }) as any as S.Schema<GetIndexOutput>;
export interface GetManagedViewInput {
  ManagedViewArn: string;
}
export const GetManagedViewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ManagedViewArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetManagedView" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetManagedViewInput",
}) as any as S.Schema<GetManagedViewInput>;
export interface ManagedView {
  ManagedViewArn?: string;
  ManagedViewName?: string;
  TrustedService?: string;
  LastUpdatedAt?: Date;
  Owner?: string;
  Scope?: string;
  IncludedProperties?: IncludedProperty[];
  Filters?: SearchFilter;
  ResourcePolicy?: string;
  Version?: string;
}
export const ManagedView = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManagedViewArn: S.optional(S.String),
    ManagedViewName: S.optional(S.String),
    TrustedService: S.optional(S.String),
    LastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Owner: S.optional(S.String),
    Scope: S.optional(S.String),
    IncludedProperties: S.optional(IncludedPropertyList),
    Filters: S.optional(SearchFilter),
    ResourcePolicy: S.optional(S.String),
    Version: S.optional(S.String),
  }),
).annotate({ identifier: "ManagedView" }) as any as S.Schema<ManagedView>;
export interface GetManagedViewOutput {
  ManagedView?: ManagedView;
}
export const GetManagedViewOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ManagedView: S.optional(ManagedView) }),
).annotate({
  identifier: "GetManagedViewOutput",
}) as any as S.Schema<GetManagedViewOutput>;
export interface GetResourceExplorerSetupInput {
  TaskId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const GetResourceExplorerSetupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetResourceExplorerSetup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourceExplorerSetupInput",
}) as any as S.Schema<GetResourceExplorerSetupInput>;
export type OperationStatus = string;
export interface Index {
  Region?: string;
  Arn?: string;
  Type?: string;
}
export const Index = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Region: S.optional(S.String),
    Arn: S.optional(S.String),
    Type: S.optional(S.String),
  }),
).annotate({ identifier: "Index" }) as any as S.Schema<Index>;
export interface ErrorDetails {
  Code?: string;
  Message?: string;
}
export const ErrorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Code: S.optional(S.String), Message: S.optional(S.String) }),
).annotate({ identifier: "ErrorDetails" }) as any as S.Schema<ErrorDetails>;
export interface IndexStatus {
  Status?: string;
  Index?: Index;
  ErrorDetails?: ErrorDetails;
}
export const IndexStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(S.String),
    Index: S.optional(Index),
    ErrorDetails: S.optional(ErrorDetails),
  }),
).annotate({ identifier: "IndexStatus" }) as any as S.Schema<IndexStatus>;
export interface ViewStatus {
  Status?: string;
  View?: View;
  ErrorDetails?: ErrorDetails;
}
export const ViewStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(S.String),
    View: S.optional(View),
    ErrorDetails: S.optional(ErrorDetails),
  }),
).annotate({ identifier: "ViewStatus" }) as any as S.Schema<ViewStatus>;
export interface RegionStatus {
  Region?: string;
  Index?: IndexStatus;
  View?: ViewStatus;
}
export const RegionStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Region: S.optional(S.String),
    Index: S.optional(IndexStatus),
    View: S.optional(ViewStatus),
  }),
).annotate({ identifier: "RegionStatus" }) as any as S.Schema<RegionStatus>;
export type RegionStatusList = RegionStatus[];
export const RegionStatusList = /*@__PURE__*/ S.Array(RegionStatus);
export interface GetResourceExplorerSetupOutput {
  Regions?: RegionStatus[];
  NextToken?: string;
}
export const GetResourceExplorerSetupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Regions: S.optional(RegionStatusList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetResourceExplorerSetupOutput",
}) as any as S.Schema<GetResourceExplorerSetupOutput>;
export interface GetServiceIndexRequest {}
export const GetServiceIndexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetServiceIndex" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetServiceIndexRequest",
}) as any as S.Schema<GetServiceIndexRequest>;
export interface GetServiceIndexOutput {
  Arn?: string;
  Type?: string;
}
export const GetServiceIndexOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String), Type: S.optional(S.String) }),
).annotate({
  identifier: "GetServiceIndexOutput",
}) as any as S.Schema<GetServiceIndexOutput>;
export interface GetServiceViewInput {
  ServiceViewArn: string;
}
export const GetServiceViewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceViewArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetServiceView" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetServiceViewInput",
}) as any as S.Schema<GetServiceViewInput>;
export type ServiceViewName = string;
export type RecorderType = string;
export interface ServiceLinkedRecorderInfo {
  ServicePrincipal?: string;
  RecorderName?: string;
  RecorderType?: string;
}
export const ServiceLinkedRecorderInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServicePrincipal: S.optional(S.String),
    RecorderName: S.optional(S.String),
    RecorderType: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceLinkedRecorderInfo",
}) as any as S.Schema<ServiceLinkedRecorderInfo>;
export interface ServiceView {
  ServiceViewArn: string;
  ServiceViewName?: string;
  Filters?: SearchFilter;
  IncludedProperties?: IncludedProperty[];
  StreamingAccessForService?: string;
  ScopeType?: string;
  ServiceLinkedRecorder?: ServiceLinkedRecorderInfo;
}
export const ServiceView = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceViewArn: S.String,
    ServiceViewName: S.optional(S.String),
    Filters: S.optional(SearchFilter),
    IncludedProperties: S.optional(IncludedPropertyList),
    StreamingAccessForService: S.optional(S.String),
    ScopeType: S.optional(S.String),
    ServiceLinkedRecorder: S.optional(ServiceLinkedRecorderInfo),
  }),
).annotate({ identifier: "ServiceView" }) as any as S.Schema<ServiceView>;
export interface GetServiceViewOutput {
  View: ServiceView;
}
export const GetServiceViewOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ View: ServiceView }),
).annotate({
  identifier: "GetServiceViewOutput",
}) as any as S.Schema<GetServiceViewOutput>;
export interface GetViewInput {
  ViewArn: string;
}
export const GetViewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ViewArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetView" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetViewInput" }) as any as S.Schema<GetViewInput>;
export interface GetViewOutput {
  View?: View;
  Tags?: { [key: string]: string | undefined };
}
export const GetViewOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ View: S.optional(View), Tags: S.optional(TagMap) }),
).annotate({ identifier: "GetViewOutput" }) as any as S.Schema<GetViewOutput>;
export interface ListIndexesInput {
  Type?: string;
  Regions?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListIndexesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(S.String),
    Regions: S.optional(RegionList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListIndexes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIndexesInput",
}) as any as S.Schema<ListIndexesInput>;
export type IndexList = Index[];
export const IndexList = /*@__PURE__*/ S.Array(Index);
export interface ListIndexesOutput {
  Indexes?: Index[];
  NextToken?: string;
}
export const ListIndexesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Indexes: S.optional(IndexList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListIndexesOutput",
}) as any as S.Schema<ListIndexesOutput>;
export type AccountId = string;
export type AccountIdList = string[];
export const AccountIdList = /*@__PURE__*/ S.Array(S.String);
export interface ListIndexesForMembersInput {
  AccountIdList: string[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListIndexesForMembersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountIdList: AccountIdList,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListIndexesForMembers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIndexesForMembersInput",
}) as any as S.Schema<ListIndexesForMembersInput>;
export interface MemberIndex {
  AccountId?: string;
  Region?: string;
  Arn?: string;
  Type?: string;
}
export const MemberIndex = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    Region: S.optional(S.String),
    Arn: S.optional(S.String),
    Type: S.optional(S.String),
  }),
).annotate({ identifier: "MemberIndex" }) as any as S.Schema<MemberIndex>;
export type MemberIndexList = MemberIndex[];
export const MemberIndexList = /*@__PURE__*/ S.Array(MemberIndex);
export interface ListIndexesForMembersOutput {
  Indexes?: MemberIndex[];
  NextToken?: string;
}
export const ListIndexesForMembersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Indexes: S.optional(MemberIndexList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListIndexesForMembersOutput",
}) as any as S.Schema<ListIndexesForMembersOutput>;
export interface ListManagedViewsInput {
  MaxResults?: number;
  NextToken?: string;
  ServicePrincipal?: string;
}
export const ListManagedViewsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    ServicePrincipal: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListManagedViews" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListManagedViewsInput",
}) as any as S.Schema<ListManagedViewsInput>;
export type ManagedViewArnList = string[];
export const ManagedViewArnList = /*@__PURE__*/ S.Array(S.String);
export interface ListManagedViewsOutput {
  NextToken?: string;
  ManagedViews?: string[];
}
export const ListManagedViewsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    ManagedViews: S.optional(ManagedViewArnList),
  }),
).annotate({
  identifier: "ListManagedViewsOutput",
}) as any as S.Schema<ListManagedViewsOutput>;
export interface ListResourcesInput {
  Filters?: SearchFilter;
  MaxResults?: number;
  ViewArn?: string;
  NextToken?: string;
}
export const ListResourcesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(SearchFilter),
    MaxResults: S.optional(S.Number),
    ViewArn: S.optional(S.String),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListResources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResourcesInput",
}) as any as S.Schema<ListResourcesInput>;
export interface ResourceProperty {
  Name?: string;
  LastReportedAt?: Date;
  Data?: any;
}
export const ResourceProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    LastReportedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Data: S.optional(S.Any),
  }),
).annotate({
  identifier: "ResourceProperty",
}) as any as S.Schema<ResourceProperty>;
export type ResourcePropertyList = ResourceProperty[];
export const ResourcePropertyList = /*@__PURE__*/ S.Array(ResourceProperty);
export interface Resource {
  Arn?: string;
  OwningAccountId?: string;
  Region?: string;
  ResourceType?: string;
  Service?: string;
  CfnResourceType?: string;
  LastReportedAt?: Date;
  Properties?: ResourceProperty[];
}
export const Resource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    OwningAccountId: S.optional(S.String),
    Region: S.optional(S.String),
    ResourceType: S.optional(S.String),
    Service: S.optional(S.String),
    CfnResourceType: S.optional(S.String),
    LastReportedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Properties: S.optional(ResourcePropertyList),
  }),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export type ResourceList = Resource[];
export const ResourceList = /*@__PURE__*/ S.Array(Resource);
export interface ListResourcesOutput {
  Resources?: Resource[];
  NextToken?: string;
  ViewArn?: string;
}
export const ListResourcesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Resources: S.optional(ResourceList),
    NextToken: S.optional(S.String),
    ViewArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourcesOutput",
}) as any as S.Schema<ListResourcesOutput>;
export interface ListServiceIndexesInput {
  Regions?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListServiceIndexesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Regions: S.optional(RegionList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListServiceIndexes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceIndexesInput",
}) as any as S.Schema<ListServiceIndexesInput>;
export interface ListServiceIndexesOutput {
  Indexes?: Index[];
  NextToken?: string;
}
export const ListServiceIndexesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Indexes: S.optional(IndexList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListServiceIndexesOutput",
}) as any as S.Schema<ListServiceIndexesOutput>;
export interface ListServiceViewsInput {
  MaxResults?: number;
  NextToken?: string;
}
export const ListServiceViewsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListServiceViews" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceViewsInput",
}) as any as S.Schema<ListServiceViewsInput>;
export type ServiceViewArnList = string[];
export const ServiceViewArnList = /*@__PURE__*/ S.Array(S.String);
export interface ListServiceViewsOutput {
  NextToken?: string;
  ServiceViews?: string[];
}
export const ListServiceViewsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    ServiceViews: S.optional(ServiceViewArnList),
  }),
).annotate({
  identifier: "ListServiceViewsOutput",
}) as any as S.Schema<ListServiceViewsOutput>;
export interface ListStreamingAccessForServicesInput {
  MaxResults?: number;
  NextToken?: string;
}
export const ListStreamingAccessForServicesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListStreamingAccessForServices" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListStreamingAccessForServicesInput",
}) as any as S.Schema<ListStreamingAccessForServicesInput>;
export interface StreamingAccessDetails {
  ServicePrincipal: string;
  CreatedAt: Date;
}
export const StreamingAccessDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServicePrincipal: S.String,
    CreatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "StreamingAccessDetails",
}) as any as S.Schema<StreamingAccessDetails>;
export type StreamingAccessDetailsList = StreamingAccessDetails[];
export const StreamingAccessDetailsList = /*@__PURE__*/ S.Array(
  StreamingAccessDetails,
);
export interface ListStreamingAccessForServicesOutput {
  StreamingAccessForServices: StreamingAccessDetails[];
  NextToken?: string;
}
export const ListStreamingAccessForServicesOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StreamingAccessForServices: StreamingAccessDetailsList,
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListStreamingAccessForServicesOutput",
}) as any as S.Schema<ListStreamingAccessForServicesOutput>;
export interface ListSupportedResourceTypesInput {
  NextToken?: string;
  MaxResults?: number;
}
export const ListSupportedResourceTypesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListSupportedResourceTypes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSupportedResourceTypesInput",
}) as any as S.Schema<ListSupportedResourceTypesInput>;
export type CFNResourceTypeList = string[];
export const CFNResourceTypeList = /*@__PURE__*/ S.Array(S.String);
export interface SupportedResourceType {
  Service?: string;
  ResourceType?: string;
  CFNResourceTypes?: string[];
}
export const SupportedResourceType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Service: S.optional(S.String),
    ResourceType: S.optional(S.String),
    CFNResourceTypes: S.optional(CFNResourceTypeList),
  }),
).annotate({
  identifier: "SupportedResourceType",
}) as any as S.Schema<SupportedResourceType>;
export type ResourceTypeList = SupportedResourceType[];
export const ResourceTypeList = /*@__PURE__*/ S.Array(SupportedResourceType);
export interface ListSupportedResourceTypesOutput {
  ResourceTypes?: SupportedResourceType[];
  NextToken?: string;
}
export const ListSupportedResourceTypesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceTypes: S.optional(ResourceTypeList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSupportedResourceTypesOutput",
}) as any as S.Schema<ListSupportedResourceTypesOutput>;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface ListViewsInput {
  NextToken?: string;
  MaxResults?: number;
}
export const ListViewsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListViews" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "ListViewsInput" }) as any as S.Schema<ListViewsInput>;
export interface ListViewsOutput {
  Views?: string[];
  NextToken?: string;
}
export const ListViewsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Views: S.optional(ViewArnList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListViewsOutput",
}) as any as S.Schema<ListViewsOutput>;
export type QueryString = string | redacted.Redacted<string>;
export interface SearchInput {
  QueryString: string | redacted.Redacted<string>;
  MaxResults?: number;
  ViewArn?: string;
  NextToken?: string;
}
export const SearchInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryString: SensitiveString,
    MaxResults: S.optional(S.Number),
    ViewArn: S.optional(S.String),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/Search" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "SearchInput" }) as any as S.Schema<SearchInput>;
export interface ResourceCount {
  TotalResources?: number;
  Complete?: boolean;
}
export const ResourceCount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TotalResources: S.optional(S.Number),
    Complete: S.optional(S.Boolean),
  }),
).annotate({ identifier: "ResourceCount" }) as any as S.Schema<ResourceCount>;
export interface SearchOutput {
  Resources?: Resource[];
  NextToken?: string;
  ViewArn?: string;
  Count?: ResourceCount;
}
export const SearchOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Resources: S.optional(ResourceList),
    NextToken: S.optional(S.String),
    ViewArn: S.optional(S.String),
    Count: S.optional(ResourceCount),
  }),
).annotate({ identifier: "SearchOutput" }) as any as S.Schema<SearchOutput>;
export interface TagResourceInput {
  resourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    Tags: S.optional(TagMap),
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
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {}
export const TagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: StringList.pipe(T.HttpQuery("tagKeys")),
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
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export interface UpdateIndexTypeInput {
  Arn: string;
  Type: string;
}
export const UpdateIndexTypeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String, Type: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateIndexType" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateIndexTypeInput",
}) as any as S.Schema<UpdateIndexTypeInput>;
export interface UpdateIndexTypeOutput {
  Arn?: string;
  Type?: string;
  State?: string;
  LastUpdatedAt?: Date;
}
export const UpdateIndexTypeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Type: S.optional(S.String),
    State: S.optional(S.String),
    LastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "UpdateIndexTypeOutput",
}) as any as S.Schema<UpdateIndexTypeOutput>;
export interface UpdateViewInput {
  ViewArn: string;
  IncludedProperties?: IncludedProperty[];
  Filters?: SearchFilter;
}
export const UpdateViewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ViewArn: S.String,
    IncludedProperties: S.optional(IncludedPropertyList),
    Filters: S.optional(SearchFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateView" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateViewInput",
}) as any as S.Schema<UpdateViewInput>;
export interface UpdateViewOutput {
  View?: View;
}
export const UpdateViewOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ View: S.optional(View) }),
).annotate({
  identifier: "UpdateViewOutput",
}) as any as S.Schema<UpdateViewOutput>;
export interface ValidationExceptionField {
  Name: string;
  ValidationIssue: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, ValidationIssue: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type AssociateDefaultViewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets the specified view as the default for the Amazon Web Services Region in which you call this operation. When a user performs a Search that doesn't explicitly specify which view to use, then Amazon Web Services Resource Explorer automatically chooses this default view for searches performed in this Amazon Web Services Region.
 *
 * If an Amazon Web Services Region doesn't have a default view configured, then users must explicitly specify a view with every `Search` operation performed in that Region.
 */
export const associateDefaultView: API.OperationMethod<
  AssociateDefaultViewInput,
  AssociateDefaultViewOutput,
  AssociateDefaultViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateDefaultViewInput,
  output: AssociateDefaultViewOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateDefaultView",
}));

export type BatchGetViewError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a list of views.
 */
export const batchGetView: API.OperationMethod<
  BatchGetViewInput,
  BatchGetViewOutput,
  BatchGetViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetViewInput,
  output: BatchGetViewOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetView",
}));

export type CreateIndexError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Turns on Amazon Web Services Resource Explorer in the Amazon Web Services Region in which you called this operation by creating an index. Resource Explorer begins discovering the resources in this Region and stores the details about the resources in the index so that they can be queried by using the Search operation. You can create only one index in a Region.
 *
 * This operation creates only a *local* index. To promote the local index in one Amazon Web Services Region into the aggregator index for the Amazon Web Services account, use the UpdateIndexType operation. For more information, see Turning on cross-Region search by creating an aggregator index in the *Amazon Web Services Resource Explorer User Guide*.
 *
 * For more details about what happens when you turn on Resource Explorer in an Amazon Web Services Region, see Turn on Resource Explorer to index your resources in an Amazon Web Services Region in the *Amazon Web Services Resource Explorer User Guide*.
 *
 * If this is the first Amazon Web Services Region in which you've created an index for Resource Explorer, then this operation also creates a service-linked role in your Amazon Web Services account that allows Resource Explorer to enumerate your resources to populate the index.
 *
 * - **Action**: `resource-explorer-2:CreateIndex`
 *
 * **Resource**: The ARN of the index (as it will exist after the operation completes) in the Amazon Web Services Region and account in which you're trying to create the index. Use the wildcard character (`*`) at the end of the string to match the eventual UUID. For example, the following `Resource` element restricts the role or user to creating an index in only the `us-east-2` Region of the specified account.
 *
 * `"Resource": "arn:aws:resource-explorer-2:us-west-2:*<account-id>*:index/*"`
 *
 * Alternatively, you can use `"Resource": "*"` to allow the role or user to create an index in any Region.
 *
 * - **Action**: `iam:CreateServiceLinkedRole`
 *
 * **Resource**: No specific resource (*).
 *
 * This permission is required only the first time you create an index to turn on Resource Explorer in the account. Resource Explorer uses this to create the service-linked role needed to index the resources in your account. Resource Explorer uses the same service-linked role for all additional indexes you create afterwards.
 */
export const createIndex: API.OperationMethod<
  CreateIndexInput,
  CreateIndexOutput,
  CreateIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIndexInput,
  output: CreateIndexOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIndex",
}));

export type CreateResourceExplorerSetupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Resource Explorer setup configuration across multiple Amazon Web Services Regions. This operation sets up indexes and views in the specified Regions. This operation can also be used to set an aggregator Region for cross-Region resource search.
 */
export const createResourceExplorerSetup: API.OperationMethod<
  CreateResourceExplorerSetupInput,
  CreateResourceExplorerSetupOutput,
  CreateResourceExplorerSetupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateResourceExplorerSetupInput,
  output: CreateResourceExplorerSetupOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceExplorerSetup",
}));

export type CreateViewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates a view that users can query by using the Search operation. Results from queries that you make using this view include only resources that match the view's `Filters`. For more information about Amazon Web Services Resource Explorer views, see Managing views in the *Amazon Web Services Resource Explorer User Guide*.
 *
 * Only the principals with an IAM identity-based policy that grants `Allow` to the `Search` action on a `Resource` with the Amazon resource name (ARN) of this view can Search using views you create with this operation.
 */
export const createView: API.OperationMethod<
  CreateViewInput,
  CreateViewOutput,
  CreateViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateViewInput,
  output: CreateViewOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateView",
}));

export type DeleteIndexError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified index and turns off Amazon Web Services Resource Explorer in the specified Amazon Web Services Region. When you delete an index, Resource Explorer stops discovering and indexing resources in that Region. Resource Explorer also deletes all views in that Region. These actions occur as asynchronous background tasks. You can check to see when the actions are complete by using the GetIndex operation and checking the `Status` response value.
 *
 * If the index you delete is the aggregator index for the Amazon Web Services account, you must wait 24 hours before you can promote another local index to be the aggregator index for the account. Users can't perform account-wide searches using Resource Explorer until another aggregator index is configured.
 */
export const deleteIndex: API.OperationMethod<
  DeleteIndexInput,
  DeleteIndexOutput,
  DeleteIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIndexInput,
  output: DeleteIndexOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIndex",
}));

export type DeleteResourceExplorerSetupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Resource Explorer setup configuration. This operation removes indexes and views from the specified Regions or all Regions where Resource Explorer is configured.
 */
export const deleteResourceExplorerSetup: API.OperationMethod<
  DeleteResourceExplorerSetupInput,
  DeleteResourceExplorerSetupOutput,
  DeleteResourceExplorerSetupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourceExplorerSetupInput,
  output: DeleteResourceExplorerSetupOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceExplorerSetup",
}));

export type DeleteViewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified view.
 *
 * If the specified view is the default view for its Amazon Web Services Region, then all Search operations in that Region must explicitly specify the view to use until you configure a new default by calling the AssociateDefaultView operation.
 */
export const deleteView: API.OperationMethod<
  DeleteViewInput,
  DeleteViewOutput,
  DeleteViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteViewInput,
  output: DeleteViewOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteView",
}));

export type DisassociateDefaultViewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * After you call this operation, the affected Amazon Web Services Region no longer has a default view. All Search operations in that Region must explicitly specify a view or the operation fails. You can configure a new default by calling the AssociateDefaultView operation.
 *
 * If an Amazon Web Services Region doesn't have a default view configured, then users must explicitly specify a view with every `Search` operation performed in that Region.
 */
export const disassociateDefaultView: API.OperationMethod<
  DisassociateDefaultViewRequest,
  DisassociateDefaultViewResponse,
  DisassociateDefaultViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateDefaultViewRequest,
  output: DisassociateDefaultViewResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateDefaultView",
}));

export type GetAccountLevelServiceConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the status of your account's Amazon Web Services service access, and validates the service linked role required to access the multi-account search feature. Only the management account can invoke this API call.
 */
export const getAccountLevelServiceConfiguration: API.OperationMethod<
  GetAccountLevelServiceConfigurationRequest,
  GetAccountLevelServiceConfigurationOutput,
  GetAccountLevelServiceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountLevelServiceConfigurationRequest,
  output: GetAccountLevelServiceConfigurationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountLevelServiceConfiguration",
}));

export type GetDefaultViewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the Amazon Resource Name (ARN) of the view that is the default for the Amazon Web Services Region in which you call this operation. You can then call GetView to retrieve the details of that view.
 */
export const getDefaultView: API.OperationMethod<
  GetDefaultViewRequest,
  GetDefaultViewOutput,
  GetDefaultViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDefaultViewRequest,
  output: GetDefaultViewOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDefaultView",
}));

export type GetIndexError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about the Amazon Web Services Resource Explorer index in the Amazon Web Services Region in which you invoked the operation.
 */
export const getIndex: API.OperationMethod<
  GetIndexRequest,
  GetIndexOutput,
  GetIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIndexRequest,
  output: GetIndexOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIndex",
}));

export type GetManagedViewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details of the specified Amazon Web Services-managed view.
 */
export const getManagedView: API.OperationMethod<
  GetManagedViewInput,
  GetManagedViewOutput,
  GetManagedViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetManagedViewInput,
  output: GetManagedViewOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetManagedView",
}));

export type GetResourceExplorerSetupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the status and details of a Resource Explorer setup operation. This operation returns information about the progress of creating or deleting Resource Explorer configurations across Regions.
 */
export const getResourceExplorerSetup: API.PaginatedOperationMethod<
  GetResourceExplorerSetupInput,
  GetResourceExplorerSetupOutput,
  GetResourceExplorerSetupError,
  Credentials | HttpClient.HttpClient,
  RegionStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetResourceExplorerSetupInput,
  output: GetResourceExplorerSetupOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceExplorerSetup",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Regions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetServiceIndexError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the Resource Explorer index in the current Amazon Web Services Region. This operation returns the ARN and type of the index if one exists.
 */
export const getServiceIndex: API.OperationMethod<
  GetServiceIndexRequest,
  GetServiceIndexOutput,
  GetServiceIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServiceIndexRequest,
  output: GetServiceIndexOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceIndex",
}));

export type GetServiceViewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a specific Resource Explorer service view. This operation returns the configuration and properties of the specified view.
 */
export const getServiceView: API.OperationMethod<
  GetServiceViewInput,
  GetServiceViewOutput,
  GetServiceViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServiceViewInput,
  output: GetServiceViewOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceView",
}));

export type GetViewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details of the specified view.
 */
export const getView: API.OperationMethod<
  GetViewInput,
  GetViewOutput,
  GetViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetViewInput,
  output: GetViewOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetView",
}));

export type ListIndexesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all of the indexes in Amazon Web Services Regions that are currently collecting resource information for Amazon Web Services Resource Explorer.
 */
export const listIndexes: API.PaginatedOperationMethod<
  ListIndexesInput,
  ListIndexesOutput,
  ListIndexesError,
  Credentials | HttpClient.HttpClient,
  Index
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIndexesInput,
  output: ListIndexesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIndexes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Indexes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListIndexesForMembersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of a member's indexes in all Amazon Web Services Regions that are currently collecting resource information for Amazon Web Services Resource Explorer. Only the management account or a delegated administrator with service access enabled can invoke this API call.
 */
export const listIndexesForMembers: API.PaginatedOperationMethod<
  ListIndexesForMembersInput,
  ListIndexesForMembersOutput,
  ListIndexesForMembersError,
  Credentials | HttpClient.HttpClient,
  MemberIndex
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIndexesForMembersInput,
  output: ListIndexesForMembersOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIndexesForMembers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Indexes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListManagedViewsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Amazon resource names (ARNs) of the Amazon Web Services-managed views available in the Amazon Web Services Region in which you call this operation.
 */
export const listManagedViews: API.PaginatedOperationMethod<
  ListManagedViewsInput,
  ListManagedViewsOutput,
  ListManagedViewsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListManagedViewsInput,
  output: ListManagedViewsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedViews",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ManagedViews",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of resources and their details that match the specified criteria. This query must use a view. If you don’t explicitly specify a view, then Resource Explorer uses the default view for the Amazon Web Services Region in which you call this operation.
 */
export const listResources: API.PaginatedOperationMethod<
  ListResourcesInput,
  ListResourcesOutput,
  ListResourcesError,
  Credentials | HttpClient.HttpClient,
  Resource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourcesInput,
  output: ListResourcesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Resources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceIndexesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Resource Explorer indexes across the specified Amazon Web Services Regions. This operation returns information about indexes including their ARNs, types, and Regions.
 */
export const listServiceIndexes: API.PaginatedOperationMethod<
  ListServiceIndexesInput,
  ListServiceIndexesOutput,
  ListServiceIndexesError,
  Credentials | HttpClient.HttpClient,
  Index
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServiceIndexesInput,
  output: ListServiceIndexesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceIndexes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Indexes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceViewsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Resource Explorer service views available in the current Amazon Web Services account. This operation returns the ARNs of available service views.
 */
export const listServiceViews: API.PaginatedOperationMethod<
  ListServiceViewsInput,
  ListServiceViewsOutput,
  ListServiceViewsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServiceViewsInput,
  output: ListServiceViewsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceViews",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceViews",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStreamingAccessForServicesError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of Amazon Web Services services that have been granted streaming access to your Resource Explorer data. Streaming access allows Amazon Web Services services to receive real-time updates about your resources as they are indexed by Resource Explorer.
 */
export const listStreamingAccessForServices: API.PaginatedOperationMethod<
  ListStreamingAccessForServicesInput,
  ListStreamingAccessForServicesOutput,
  ListStreamingAccessForServicesError,
  Credentials | HttpClient.HttpClient,
  StreamingAccessDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStreamingAccessForServicesInput,
  output: ListStreamingAccessForServicesOutput,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreamingAccessForServices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StreamingAccessForServices",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSupportedResourceTypesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all resource types currently supported by Amazon Web Services Resource Explorer.
 */
export const listSupportedResourceTypes: API.PaginatedOperationMethod<
  ListSupportedResourceTypesInput,
  ListSupportedResourceTypesOutput,
  ListSupportedResourceTypesError,
  Credentials | HttpClient.HttpClient,
  SupportedResourceType
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSupportedResourceTypesInput,
  output: ListSupportedResourceTypesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSupportedResourceTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceTypes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags that are attached to the specified resource.
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
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListViewsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Amazon resource names (ARNs) of the views available in the Amazon Web Services Region in which you call this operation.
 *
 * Always check the `NextToken` response parameter for a `null` value when calling a paginated operation. These operations can occasionally return an empty set of results even when there are more results available. The `NextToken` response parameter value is `null` *only* when there are no more results to display.
 */
export const listViews: API.PaginatedOperationMethod<
  ListViewsInput,
  ListViewsOutput,
  ListViewsError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListViewsInput,
  output: ListViewsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListViews",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Views",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Searches for resources and displays details about all resources that match the specified criteria. You must specify a query string.
 *
 * All search queries must use a view. If you don't explicitly specify a view, then Amazon Web Services Resource Explorer uses the default view for the Amazon Web Services Region in which you call this operation. The results are the logical intersection of the results that match both the `QueryString` parameter supplied to this operation and the `SearchFilter` parameter attached to the view.
 *
 * For the complete syntax supported by the `QueryString` parameter, see Search query syntax reference for Resource Explorer.
 *
 * If your search results are empty, or are missing results that you think should be there, see Troubleshooting Resource Explorer search.
 */
export const search: API.PaginatedOperationMethod<
  SearchInput,
  SearchOutput,
  SearchError,
  Credentials | HttpClient.HttpClient,
  Resource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchInput,
  output: SearchOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Search",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Resources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Adds one or more tag key and value pairs to an Amazon Web Services Resource Explorer view or index.
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
    ConflictException,
    InternalServerException,
    ThrottlingException,
    UnauthorizedException,
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
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tag key and value pairs from an Amazon Web Services Resource Explorer view or index.
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
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateIndexTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Changes the type of the index from one of the following types to the other. For more information about indexes and the role they perform in Amazon Web Services Resource Explorer, see Turning on cross-Region search by creating an aggregator index in the *Amazon Web Services Resource Explorer User Guide*.
 *
 * - ** `AGGREGATOR` index type**
 *
 * The index contains information about resources from all Amazon Web Services Regions in the Amazon Web Services account in which you've created a Resource Explorer index. Resource information from all other Regions is replicated to this Region's index.
 *
 * When you change the index type to `AGGREGATOR`, Resource Explorer turns on replication of all discovered resource information from the other Amazon Web Services Regions in your account to this index. You can then, from this Region only, perform resource search queries that span all Amazon Web Services Regions in the Amazon Web Services account. Turning on replication from all other Regions is performed by asynchronous background tasks. You can check the status of the asynchronous tasks by using the GetIndex operation. When the asynchronous tasks complete, the `Status` response of that operation changes from `UPDATING` to `ACTIVE`. After that, you can start to see results from other Amazon Web Services Regions in query results. However, it can take several hours for replication from all other Regions to complete.
 *
 * You can have only one aggregator index per Amazon Web Services account. Before you can promote a different index to be the aggregator index for the account, you must first demote the existing aggregator index to type `LOCAL`.
 *
 * - ** `LOCAL` index type**
 *
 * The index contains information about resources in only the Amazon Web Services Region in which the index exists. If an aggregator index in another Region exists, then information in this local index is replicated to the aggregator index.
 *
 * When you change the index type to `LOCAL`, Resource Explorer turns off the replication of resource information from all other Amazon Web Services Regions in the Amazon Web Services account to this Region. The aggregator index remains in the `UPDATING` state until all replication with other Regions successfully stops. You can check the status of the asynchronous task by using the GetIndex operation. When Resource Explorer successfully stops all replication with other Regions, the `Status` response of that operation changes from `UPDATING` to `ACTIVE`. Separately, the resource information from other Regions that was previously stored in the index is deleted within 30 days by another background task. Until that asynchronous task completes, some results from other Regions can continue to appear in search results.
 *
 * After you demote an aggregator index to a local index, you must wait 24 hours before you can promote another index to be the new aggregator index for the account.
 */
export const updateIndexType: API.OperationMethod<
  UpdateIndexTypeInput,
  UpdateIndexTypeOutput,
  UpdateIndexTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIndexTypeInput,
  output: UpdateIndexTypeOutput,
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
  operationName: "UpdateIndexType",
}));

export type UpdateViewError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Modifies some of the details of a view. You can change the filter string and the list of included properties. You can't change the name of the view.
 */
export const updateView: API.OperationMethod<
  UpdateViewInput,
  UpdateViewOutput,
  UpdateViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateViewInput,
  output: UpdateViewOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateView",
}));
