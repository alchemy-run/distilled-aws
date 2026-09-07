import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace("http://osis.amazonaws.com/doc/2022-01-01");
const svc = T.AwsApiService({
  sdkId: "OSIS",
  serviceShapeName: "AmazonOpenSearchIngestionService",
});
const auth = T.AwsAuthSigv4({ name: "osis" });
const ver = T.ServiceVersion("2022-01-01");
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
              `https://osis-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://osis-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://osis.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://osis.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class DisabledOperationException
  extends /*@__PURE__*/ S.TaggedError<DisabledOperationException>()(
    "DisabledOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalException
  extends /*@__PURE__*/ S.TaggedError<InternalException>()(
    "InternalException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidPaginationTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidPaginationTokenException>()(
    "InvalidPaginationTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type PipelineName = string;
export type PipelineUnits = number;
export type PipelineConfigurationBody = string;
export type LogGroup = string;
export interface CloudWatchLogDestination {
  LogGroup: string;
}
export const CloudWatchLogDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LogGroup: S.String }),
).annotate({
  identifier: "CloudWatchLogDestination",
}) as any as S.Schema<CloudWatchLogDestination>;
export interface LogPublishingOptions {
  IsLoggingEnabled?: boolean;
  CloudWatchLogDestination?: CloudWatchLogDestination;
}
export const LogPublishingOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IsLoggingEnabled: S.optional(S.Boolean),
    CloudWatchLogDestination: S.optional(CloudWatchLogDestination),
  }),
).annotate({
  identifier: "LogPublishingOptions",
}) as any as S.Schema<LogPublishingOptions>;
export type SubnetId = string;
export type SubnetIds = string[];
export const SubnetIds = /*@__PURE__*/ S.Array(S.String);
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export const SecurityGroupIds = /*@__PURE__*/ S.Array(S.String);
export type CidrBlock = string;
export interface VpcAttachmentOptions {
  AttachToVpc: boolean;
  CidrBlock?: string;
}
export const VpcAttachmentOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AttachToVpc: S.Boolean, CidrBlock: S.optional(S.String) }),
).annotate({
  identifier: "VpcAttachmentOptions",
}) as any as S.Schema<VpcAttachmentOptions>;
export type VpcEndpointManagement = "CUSTOMER" | "SERVICE" | (string & {});
export const VpcEndpointManagement = S.String;

export interface VpcOptions {
  SubnetIds: string[];
  SecurityGroupIds?: string[];
  VpcAttachmentOptions?: VpcAttachmentOptions;
  VpcEndpointManagement?: VpcEndpointManagement;
}
export const VpcOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetIds: SubnetIds,
    SecurityGroupIds: S.optional(SecurityGroupIds),
    VpcAttachmentOptions: S.optional(VpcAttachmentOptions),
    VpcEndpointManagement: S.optional(VpcEndpointManagement),
  }),
).annotate({ identifier: "VpcOptions" }) as any as S.Schema<VpcOptions>;
export interface BufferOptions {
  PersistentBufferEnabled: boolean;
}
export const BufferOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PersistentBufferEnabled: S.Boolean }),
).annotate({ identifier: "BufferOptions" }) as any as S.Schema<BufferOptions>;
export type KmsKeyArn = string;
export interface EncryptionAtRestOptions {
  KmsKeyArn: string;
}
export const EncryptionAtRestOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ KmsKeyArn: S.String }),
).annotate({
  identifier: "EncryptionAtRestOptions",
}) as any as S.Schema<EncryptionAtRestOptions>;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export type PipelineRoleArn = string;
export interface CreatePipelineRequest {
  PipelineName: string;
  MinUnits: number;
  MaxUnits: number;
  PipelineConfigurationBody: string;
  LogPublishingOptions?: LogPublishingOptions;
  VpcOptions?: VpcOptions;
  BufferOptions?: BufferOptions;
  EncryptionAtRestOptions?: EncryptionAtRestOptions;
  Tags?: Tag[];
  PipelineRoleArn?: string;
}
export const CreatePipelineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PipelineName: S.String,
    MinUnits: S.Number,
    MaxUnits: S.Number,
    PipelineConfigurationBody: S.String,
    LogPublishingOptions: S.optional(LogPublishingOptions),
    VpcOptions: S.optional(VpcOptions),
    BufferOptions: S.optional(BufferOptions),
    EncryptionAtRestOptions: S.optional(EncryptionAtRestOptions),
    Tags: S.optional(TagList),
    PipelineRoleArn: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2022-01-01/osis/createPipeline" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePipelineRequest",
}) as any as S.Schema<CreatePipelineRequest>;
export type PipelineStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "STARTING"
  | "START_FAILED"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export const PipelineStatus = S.String;

export interface PipelineStatusReason {
  Description?: string;
}
export const PipelineStatusReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Description: S.optional(S.String) }),
).annotate({
  identifier: "PipelineStatusReason",
}) as any as S.Schema<PipelineStatusReason>;
export type IngestEndpointUrlsList = string[];
export const IngestEndpointUrlsList = /*@__PURE__*/ S.Array(S.String);
export interface VpcEndpoint {
  VpcEndpointId?: string;
  VpcId?: string;
  VpcOptions?: VpcOptions;
}
export const VpcEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcEndpointId: S.optional(S.String),
    VpcId: S.optional(S.String),
    VpcOptions: S.optional(VpcOptions),
  }),
).annotate({ identifier: "VpcEndpoint" }) as any as S.Schema<VpcEndpoint>;
export type VpcEndpointsList = VpcEndpoint[];
export const VpcEndpointsList = /*@__PURE__*/ S.Array(VpcEndpoint);
export type VpcEndpointServiceName = "OPENSEARCH_SERVERLESS" | (string & {});
export const VpcEndpointServiceName = S.String;

export interface ServiceVpcEndpoint {
  ServiceName?: VpcEndpointServiceName;
  VpcEndpointId?: string;
}
export const ServiceVpcEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceName: S.optional(VpcEndpointServiceName),
    VpcEndpointId: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceVpcEndpoint",
}) as any as S.Schema<ServiceVpcEndpoint>;
export type ServiceVpcEndpointsList = ServiceVpcEndpoint[];
export const ServiceVpcEndpointsList =
  /*@__PURE__*/ S.Array(ServiceVpcEndpoint);
export interface PipelineDestination {
  ServiceName?: string;
  Endpoint?: string;
}
export const PipelineDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceName: S.optional(S.String),
    Endpoint: S.optional(S.String),
  }),
).annotate({
  identifier: "PipelineDestination",
}) as any as S.Schema<PipelineDestination>;
export type PipelineDestinationList = PipelineDestination[];
export const PipelineDestinationList =
  /*@__PURE__*/ S.Array(PipelineDestination);
export interface Pipeline {
  PipelineName?: string;
  PipelineArn?: string;
  MinUnits?: number;
  MaxUnits?: number;
  Status?: PipelineStatus;
  StatusReason?: PipelineStatusReason;
  PipelineConfigurationBody?: string;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  IngestEndpointUrls?: string[];
  LogPublishingOptions?: LogPublishingOptions;
  VpcEndpoints?: VpcEndpoint[];
  BufferOptions?: BufferOptions;
  EncryptionAtRestOptions?: EncryptionAtRestOptions;
  VpcEndpointService?: string;
  ServiceVpcEndpoints?: ServiceVpcEndpoint[];
  Destinations?: PipelineDestination[];
  Tags?: Tag[];
  PipelineRoleArn?: string;
}
export const Pipeline = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PipelineName: S.optional(S.String),
    PipelineArn: S.optional(S.String),
    MinUnits: S.optional(S.Number),
    MaxUnits: S.optional(S.Number),
    Status: S.optional(PipelineStatus),
    StatusReason: S.optional(PipelineStatusReason),
    PipelineConfigurationBody: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IngestEndpointUrls: S.optional(IngestEndpointUrlsList),
    LogPublishingOptions: S.optional(LogPublishingOptions),
    VpcEndpoints: S.optional(VpcEndpointsList),
    BufferOptions: S.optional(BufferOptions),
    EncryptionAtRestOptions: S.optional(EncryptionAtRestOptions),
    VpcEndpointService: S.optional(S.String),
    ServiceVpcEndpoints: S.optional(ServiceVpcEndpointsList),
    Destinations: S.optional(PipelineDestinationList),
    Tags: S.optional(TagList),
    PipelineRoleArn: S.optional(S.String),
  }),
).annotate({ identifier: "Pipeline" }) as any as S.Schema<Pipeline>;
export interface CreatePipelineResponse {
  Pipeline?: Pipeline;
}
export const CreatePipelineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Pipeline: S.optional(Pipeline) }).pipe(ns),
).annotate({
  identifier: "CreatePipelineResponse",
}) as any as S.Schema<CreatePipelineResponse>;
export type PipelineArn = string;
export interface PipelineEndpointVpcOptions {
  SubnetIds?: string[];
  SecurityGroupIds?: string[];
}
export const PipelineEndpointVpcOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetIds: S.optional(SubnetIds),
    SecurityGroupIds: S.optional(SecurityGroupIds),
  }),
).annotate({
  identifier: "PipelineEndpointVpcOptions",
}) as any as S.Schema<PipelineEndpointVpcOptions>;
export interface CreatePipelineEndpointRequest {
  PipelineArn: string;
  VpcOptions: PipelineEndpointVpcOptions;
}
export const CreatePipelineEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PipelineArn: S.String,
    VpcOptions: PipelineEndpointVpcOptions,
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2022-01-01/osis/createPipelineEndpoint",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePipelineEndpointRequest",
}) as any as S.Schema<CreatePipelineEndpointRequest>;
export type PipelineEndpointId = string;
export type PipelineEndpointStatus =
  | "CREATING"
  | "ACTIVE"
  | "CREATE_FAILED"
  | "DELETING"
  | "REVOKING"
  | "REVOKED"
  | (string & {});
export const PipelineEndpointStatus = S.String;

export interface CreatePipelineEndpointResponse {
  PipelineArn?: string;
  EndpointId?: string;
  Status?: PipelineEndpointStatus;
  VpcId?: string;
}
export const CreatePipelineEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PipelineArn: S.optional(S.String),
    EndpointId: S.optional(S.String),
    Status: S.optional(PipelineEndpointStatus),
    VpcId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreatePipelineEndpointResponse",
}) as any as S.Schema<CreatePipelineEndpointResponse>;
export interface DeletePipelineRequest {
  PipelineName: string;
}
export const DeletePipelineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PipelineName: S.String.pipe(T.HttpLabel("PipelineName")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/2022-01-01/osis/deletePipeline/{PipelineName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePipelineRequest",
}) as any as S.Schema<DeletePipelineRequest>;
export interface DeletePipelineResponse {}
export const DeletePipelineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeletePipelineResponse",
}) as any as S.Schema<DeletePipelineResponse>;
export interface DeletePipelineEndpointRequest {
  EndpointId: string;
}
export const DeletePipelineEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EndpointId: S.String.pipe(T.HttpLabel("EndpointId")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/2022-01-01/osis/deletePipelineEndpoint/{EndpointId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePipelineEndpointRequest",
}) as any as S.Schema<DeletePipelineEndpointRequest>;
export interface DeletePipelineEndpointResponse {}
export const DeletePipelineEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeletePipelineEndpointResponse",
}) as any as S.Schema<DeletePipelineEndpointResponse>;
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
}
export const DeleteResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "DELETE",
        uri: "/2022-01-01/osis/resourcePolicy/{ResourceArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteResourcePolicyRequest",
}) as any as S.Schema<DeleteResourcePolicyRequest>;
export interface DeleteResourcePolicyResponse {}
export const DeleteResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteResourcePolicyResponse",
}) as any as S.Schema<DeleteResourcePolicyResponse>;
export interface GetPipelineRequest {
  PipelineName: string;
}
export const GetPipelineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PipelineName: S.String.pipe(T.HttpLabel("PipelineName")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2022-01-01/osis/getPipeline/{PipelineName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPipelineRequest",
}) as any as S.Schema<GetPipelineRequest>;
export interface GetPipelineResponse {
  Pipeline?: Pipeline;
}
export const GetPipelineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Pipeline: S.optional(Pipeline) }).pipe(ns),
).annotate({
  identifier: "GetPipelineResponse",
}) as any as S.Schema<GetPipelineResponse>;
export type BlueprintFormat = string;
export interface GetPipelineBlueprintRequest {
  BlueprintName: string;
  Format?: string;
}
export const GetPipelineBlueprintRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BlueprintName: S.String.pipe(T.HttpLabel("BlueprintName")),
    Format: S.optional(S.String).pipe(T.HttpQuery("format")),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2022-01-01/osis/getPipelineBlueprint/{BlueprintName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPipelineBlueprintRequest",
}) as any as S.Schema<GetPipelineBlueprintRequest>;
export interface PipelineBlueprint {
  BlueprintName?: string;
  PipelineConfigurationBody?: string;
  DisplayName?: string;
  DisplayDescription?: string;
  Service?: string;
  UseCase?: string;
}
export const PipelineBlueprint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BlueprintName: S.optional(S.String),
    PipelineConfigurationBody: S.optional(S.String),
    DisplayName: S.optional(S.String),
    DisplayDescription: S.optional(S.String),
    Service: S.optional(S.String),
    UseCase: S.optional(S.String),
  }),
).annotate({
  identifier: "PipelineBlueprint",
}) as any as S.Schema<PipelineBlueprint>;
export interface GetPipelineBlueprintResponse {
  Blueprint?: PipelineBlueprint;
  Format?: string;
}
export const GetPipelineBlueprintResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Blueprint: S.optional(PipelineBlueprint),
    Format: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetPipelineBlueprintResponse",
}) as any as S.Schema<GetPipelineBlueprintResponse>;
export interface GetPipelineChangeProgressRequest {
  PipelineName: string;
}
export const GetPipelineChangeProgressRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PipelineName: S.String.pipe(T.HttpLabel("PipelineName")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2022-01-01/osis/getPipelineChangeProgress/{PipelineName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPipelineChangeProgressRequest",
}) as any as S.Schema<GetPipelineChangeProgressRequest>;
export type ChangeProgressStatuses =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export const ChangeProgressStatuses = S.String;

export type ChangeProgressStageStatuses =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export const ChangeProgressStageStatuses = S.String;

export interface ChangeProgressStage {
  Name?: string;
  Status?: ChangeProgressStageStatuses;
  Description?: string;
  LastUpdatedAt?: Date;
}
export const ChangeProgressStage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Status: S.optional(ChangeProgressStageStatuses),
    Description: S.optional(S.String),
    LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ChangeProgressStage",
}) as any as S.Schema<ChangeProgressStage>;
export type ChangeProgressStageList = ChangeProgressStage[];
export const ChangeProgressStageList =
  /*@__PURE__*/ S.Array(ChangeProgressStage);
export interface ChangeProgressStatus {
  StartTime?: Date;
  Status?: ChangeProgressStatuses;
  TotalNumberOfStages?: number;
  ChangeProgressStages?: ChangeProgressStage[];
}
export const ChangeProgressStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(ChangeProgressStatuses),
    TotalNumberOfStages: S.optional(S.Number),
    ChangeProgressStages: S.optional(ChangeProgressStageList),
  }),
).annotate({
  identifier: "ChangeProgressStatus",
}) as any as S.Schema<ChangeProgressStatus>;
export type ChangeProgressStatusList = ChangeProgressStatus[];
export const ChangeProgressStatusList =
  /*@__PURE__*/ S.Array(ChangeProgressStatus);
export interface GetPipelineChangeProgressResponse {
  ChangeProgressStatuses?: ChangeProgressStatus[];
}
export const GetPipelineChangeProgressResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChangeProgressStatuses: S.optional(ChangeProgressStatusList),
  }).pipe(ns),
).annotate({
  identifier: "GetPipelineChangeProgressResponse",
}) as any as S.Schema<GetPipelineChangeProgressResponse>;
export interface GetResourcePolicyRequest {
  ResourceArn: string;
}
export const GetResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "GET",
        uri: "/2022-01-01/osis/resourcePolicy/{ResourceArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourcePolicyRequest",
}) as any as S.Schema<GetResourcePolicyRequest>;
export type ResourcePolicy = string;
export interface GetResourcePolicyResponse {
  ResourceArn?: string;
  Policy?: string;
}
export const GetResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    Policy: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetResourcePolicyResponse",
}) as any as S.Schema<GetResourcePolicyResponse>;
export interface ListPipelineBlueprintsRequest {}
export const ListPipelineBlueprintsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({
        method: "POST",
        uri: "/2022-01-01/osis/listPipelineBlueprints",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPipelineBlueprintsRequest",
}) as any as S.Schema<ListPipelineBlueprintsRequest>;
export interface PipelineBlueprintSummary {
  BlueprintName?: string;
  DisplayName?: string;
  DisplayDescription?: string;
  Service?: string;
  UseCase?: string;
}
export const PipelineBlueprintSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BlueprintName: S.optional(S.String),
    DisplayName: S.optional(S.String),
    DisplayDescription: S.optional(S.String),
    Service: S.optional(S.String),
    UseCase: S.optional(S.String),
  }),
).annotate({
  identifier: "PipelineBlueprintSummary",
}) as any as S.Schema<PipelineBlueprintSummary>;
export type PipelineBlueprintsSummaryList = PipelineBlueprintSummary[];
export const PipelineBlueprintsSummaryList = /*@__PURE__*/ S.Array(
  PipelineBlueprintSummary,
);
export interface ListPipelineBlueprintsResponse {
  Blueprints?: PipelineBlueprintSummary[];
}
export const ListPipelineBlueprintsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Blueprints: S.optional(PipelineBlueprintsSummaryList) }).pipe(ns),
).annotate({
  identifier: "ListPipelineBlueprintsResponse",
}) as any as S.Schema<ListPipelineBlueprintsResponse>;
export type MaxResults = number;
export type NextToken = string;
export interface ListPipelineEndpointConnectionsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListPipelineEndpointConnectionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "GET",
          uri: "/2022-01-01/osis/listPipelineEndpointConnections",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListPipelineEndpointConnectionsRequest",
}) as any as S.Schema<ListPipelineEndpointConnectionsRequest>;
export type AwsAccountId = string;
export interface PipelineEndpointConnection {
  PipelineArn?: string;
  EndpointId?: string;
  Status?: PipelineEndpointStatus;
  VpcEndpointOwner?: string;
}
export const PipelineEndpointConnection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PipelineArn: S.optional(S.String),
    EndpointId: S.optional(S.String),
    Status: S.optional(PipelineEndpointStatus),
    VpcEndpointOwner: S.optional(S.String),
  }),
).annotate({
  identifier: "PipelineEndpointConnection",
}) as any as S.Schema<PipelineEndpointConnection>;
export type PipelineEndpointConnectionsSummaryList =
  PipelineEndpointConnection[];
export const PipelineEndpointConnectionsSummaryList = /*@__PURE__*/ S.Array(
  PipelineEndpointConnection,
);
export interface ListPipelineEndpointConnectionsResponse {
  NextToken?: string;
  PipelineEndpointConnections?: PipelineEndpointConnection[];
}
export const ListPipelineEndpointConnectionsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String),
      PipelineEndpointConnections: S.optional(
        PipelineEndpointConnectionsSummaryList,
      ),
    }).pipe(ns),
).annotate({
  identifier: "ListPipelineEndpointConnectionsResponse",
}) as any as S.Schema<ListPipelineEndpointConnectionsResponse>;
export interface ListPipelineEndpointsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListPipelineEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/2022-01-01/osis/listPipelineEndpoints" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPipelineEndpointsRequest",
}) as any as S.Schema<ListPipelineEndpointsRequest>;
export interface PipelineEndpoint {
  PipelineArn?: string;
  EndpointId?: string;
  Status?: PipelineEndpointStatus;
  VpcId?: string;
  VpcOptions?: PipelineEndpointVpcOptions;
  IngestEndpointUrl?: string;
}
export const PipelineEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PipelineArn: S.optional(S.String),
    EndpointId: S.optional(S.String),
    Status: S.optional(PipelineEndpointStatus),
    VpcId: S.optional(S.String),
    VpcOptions: S.optional(PipelineEndpointVpcOptions),
    IngestEndpointUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "PipelineEndpoint",
}) as any as S.Schema<PipelineEndpoint>;
export type PipelineEndpointsSummaryList = PipelineEndpoint[];
export const PipelineEndpointsSummaryList =
  /*@__PURE__*/ S.Array(PipelineEndpoint);
export interface ListPipelineEndpointsResponse {
  NextToken?: string;
  PipelineEndpoints?: PipelineEndpoint[];
}
export const ListPipelineEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    PipelineEndpoints: S.optional(PipelineEndpointsSummaryList),
  }).pipe(ns),
).annotate({
  identifier: "ListPipelineEndpointsResponse",
}) as any as S.Schema<ListPipelineEndpointsResponse>;
export interface ListPipelinesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListPipelinesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/2022-01-01/osis/listPipelines" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPipelinesRequest",
}) as any as S.Schema<ListPipelinesRequest>;
export interface PipelineSummary {
  Status?: PipelineStatus;
  StatusReason?: PipelineStatusReason;
  PipelineName?: string;
  PipelineArn?: string;
  MinUnits?: number;
  MaxUnits?: number;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Destinations?: PipelineDestination[];
  Tags?: Tag[];
}
export const PipelineSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(PipelineStatus),
    StatusReason: S.optional(PipelineStatusReason),
    PipelineName: S.optional(S.String),
    PipelineArn: S.optional(S.String),
    MinUnits: S.optional(S.Number),
    MaxUnits: S.optional(S.Number),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Destinations: S.optional(PipelineDestinationList),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "PipelineSummary",
}) as any as S.Schema<PipelineSummary>;
export type PipelineSummaryList = PipelineSummary[];
export const PipelineSummaryList = /*@__PURE__*/ S.Array(PipelineSummary);
export interface ListPipelinesResponse {
  NextToken?: string;
  Pipelines?: PipelineSummary[];
}
export const ListPipelinesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Pipelines: S.optional(PipelineSummaryList),
  }).pipe(ns),
).annotate({
  identifier: "ListPipelinesResponse",
}) as any as S.Schema<ListPipelinesResponse>;
export interface ListTagsForResourceRequest {
  Arn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpQuery("arn")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/2022-01-01/osis/listTagsForResource" }),
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
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  Policy: string;
}
export const PutResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Policy: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "PUT",
        uri: "/2022-01-01/osis/resourcePolicy/{ResourceArn}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutResourcePolicyRequest",
}) as any as S.Schema<PutResourcePolicyRequest>;
export interface PutResourcePolicyResponse {
  ResourceArn?: string;
  Policy?: string;
}
export const PutResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    Policy: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "PutResourcePolicyResponse",
}) as any as S.Schema<PutResourcePolicyResponse>;
export type PipelineEndpointIdsList = string[];
export const PipelineEndpointIdsList = /*@__PURE__*/ S.Array(S.String);
export interface RevokePipelineEndpointConnectionsRequest {
  PipelineArn: string;
  EndpointIds: string[];
}
export const RevokePipelineEndpointConnectionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      PipelineArn: S.String,
      EndpointIds: PipelineEndpointIdsList,
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "POST",
          uri: "/2022-01-01/osis/revokePipelineEndpointConnections",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "RevokePipelineEndpointConnectionsRequest",
}) as any as S.Schema<RevokePipelineEndpointConnectionsRequest>;
export interface RevokePipelineEndpointConnectionsResponse {
  PipelineArn?: string;
}
export const RevokePipelineEndpointConnectionsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ PipelineArn: S.optional(S.String) }).pipe(ns),
  ).annotate({
    identifier: "RevokePipelineEndpointConnectionsResponse",
  }) as any as S.Schema<RevokePipelineEndpointConnectionsResponse>;
export interface StartPipelineRequest {
  PipelineName: string;
}
export const StartPipelineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PipelineName: S.String.pipe(T.HttpLabel("PipelineName")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "PUT",
        uri: "/2022-01-01/osis/startPipeline/{PipelineName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartPipelineRequest",
}) as any as S.Schema<StartPipelineRequest>;
export interface StartPipelineResponse {
  Pipeline?: Pipeline;
}
export const StartPipelineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Pipeline: S.optional(Pipeline) }).pipe(ns),
).annotate({
  identifier: "StartPipelineResponse",
}) as any as S.Schema<StartPipelineResponse>;
export interface StopPipelineRequest {
  PipelineName: string;
}
export const StopPipelineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PipelineName: S.String.pipe(T.HttpLabel("PipelineName")) }).pipe(
    T.all(
      ns,
      T.Http({
        method: "PUT",
        uri: "/2022-01-01/osis/stopPipeline/{PipelineName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopPipelineRequest",
}) as any as S.Schema<StopPipelineRequest>;
export interface StopPipelineResponse {
  Pipeline?: Pipeline;
}
export const StopPipelineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Pipeline: S.optional(Pipeline) }).pipe(ns),
).annotate({
  identifier: "StopPipelineResponse",
}) as any as S.Schema<StopPipelineResponse>;
export interface TagResourceRequest {
  Arn: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpQuery("arn")), Tags: TagList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2022-01-01/osis/tagResource" }),
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
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  Arn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String.pipe(T.HttpQuery("arn")),
    TagKeys: StringList,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2022-01-01/osis/untagResource" }),
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
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdatePipelineRequest {
  PipelineName: string;
  MinUnits?: number;
  MaxUnits?: number;
  PipelineConfigurationBody?: string;
  LogPublishingOptions?: LogPublishingOptions;
  BufferOptions?: BufferOptions;
  EncryptionAtRestOptions?: EncryptionAtRestOptions;
  PipelineRoleArn?: string;
}
export const UpdatePipelineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PipelineName: S.String.pipe(T.HttpLabel("PipelineName")),
    MinUnits: S.optional(S.Number),
    MaxUnits: S.optional(S.Number),
    PipelineConfigurationBody: S.optional(S.String),
    LogPublishingOptions: S.optional(LogPublishingOptions),
    BufferOptions: S.optional(BufferOptions),
    EncryptionAtRestOptions: S.optional(EncryptionAtRestOptions),
    PipelineRoleArn: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({
        method: "PUT",
        uri: "/2022-01-01/osis/updatePipeline/{PipelineName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePipelineRequest",
}) as any as S.Schema<UpdatePipelineRequest>;
export interface UpdatePipelineResponse {
  Pipeline?: Pipeline;
}
export const UpdatePipelineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Pipeline: S.optional(Pipeline) }).pipe(ns),
).annotate({
  identifier: "UpdatePipelineResponse",
}) as any as S.Schema<UpdatePipelineResponse>;
export interface ValidatePipelineRequest {
  PipelineConfigurationBody: string;
}
export const ValidatePipelineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PipelineConfigurationBody: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/2022-01-01/osis/validatePipeline" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ValidatePipelineRequest",
}) as any as S.Schema<ValidatePipelineRequest>;
export interface ValidationMessage {
  Message?: string;
}
export const ValidationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.optional(S.String) }),
).annotate({
  identifier: "ValidationMessage",
}) as any as S.Schema<ValidationMessage>;
export type ValidationMessageList = ValidationMessage[];
export const ValidationMessageList = /*@__PURE__*/ S.Array(ValidationMessage);
export interface ValidatePipelineResponse {
  isValid?: boolean;
  Errors?: ValidationMessage[];
}
export const ValidatePipelineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    isValid: S.optional(S.Boolean),
    Errors: S.optional(ValidationMessageList),
  }).pipe(ns),
).annotate({
  identifier: "ValidatePipelineResponse",
}) as any as S.Schema<ValidatePipelineResponse>;
export type ErrorMessage = string;
export type CreatePipelineError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates an OpenSearch Ingestion pipeline. For more information, see Creating Amazon OpenSearch
 * Ingestion pipelines.
 */
export const createPipeline: API.OperationMethod<
  CreatePipelineRequest,
  CreatePipelineResponse,
  CreatePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePipelineRequest,
  output: CreatePipelineResponse,
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePipeline",
}));

export type CreatePipelineEndpointError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a VPC endpoint for an OpenSearch Ingestion pipeline. Pipeline endpoints allow you to
 * ingest data from your VPC into pipelines that you have access to.
 */
export const createPipelineEndpoint: API.OperationMethod<
  CreatePipelineEndpointRequest,
  CreatePipelineEndpointResponse,
  CreatePipelineEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePipelineEndpointRequest,
  output: CreatePipelineEndpointResponse,
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePipelineEndpoint",
}));

export type DeletePipelineError =
  | AccessDeniedException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an OpenSearch Ingestion pipeline. For more information, see Deleting Amazon OpenSearch
 * Ingestion pipelines.
 */
export const deletePipeline: API.OperationMethod<
  DeletePipelineRequest,
  DeletePipelineResponse,
  DeletePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePipelineRequest,
  output: DeletePipelineResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePipeline",
}));

export type DeletePipelineEndpointError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a VPC endpoint for an OpenSearch Ingestion pipeline.
 */
export const deletePipelineEndpoint: API.OperationMethod<
  DeletePipelineEndpointRequest,
  DeletePipelineEndpointResponse,
  DeletePipelineEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePipelineEndpointRequest,
  output: DeletePipelineEndpointResponse,
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePipelineEndpoint",
}));

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a resource-based policy from an OpenSearch Ingestion resource.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourcePolicyRequest,
  output: DeleteResourcePolicyResponse,
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type GetPipelineError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an OpenSearch Ingestion pipeline.
 */
export const getPipeline: API.OperationMethod<
  GetPipelineRequest,
  GetPipelineResponse,
  GetPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPipelineRequest,
  output: GetPipelineResponse,
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPipeline",
}));

export type GetPipelineBlueprintError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific blueprint for OpenSearch Ingestion. Blueprints are
 * templates for the configuration needed for a `CreatePipeline` request. For more
 * information, see Using
 * blueprints to create a pipeline.
 */
export const getPipelineBlueprint: API.OperationMethod<
  GetPipelineBlueprintRequest,
  GetPipelineBlueprintResponse,
  GetPipelineBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPipelineBlueprintRequest,
  output: GetPipelineBlueprintResponse,
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPipelineBlueprint",
}));

export type GetPipelineChangeProgressError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns progress information for the current change happening on an OpenSearch Ingestion
 * pipeline. Currently, this operation only returns information when a pipeline is being
 * created.
 *
 * For more information, see Tracking the status of pipeline creation.
 */
export const getPipelineChangeProgress: API.OperationMethod<
  GetPipelineChangeProgressRequest,
  GetPipelineChangeProgressResponse,
  GetPipelineChangeProgressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPipelineChangeProgressRequest,
  output: GetPipelineChangeProgressResponse,
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPipelineChangeProgress",
}));

export type GetResourcePolicyError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the resource-based policy attached to an OpenSearch Ingestion resource.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourcePolicyRequest,
  output: GetResourcePolicyResponse,
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type ListPipelineBlueprintsError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | InvalidPaginationTokenException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of all available blueprints for Data Prepper. For more information, see
 * Using
 * blueprints to create a pipeline.
 */
export const listPipelineBlueprints: API.OperationMethod<
  ListPipelineBlueprintsRequest,
  ListPipelineBlueprintsResponse,
  ListPipelineBlueprintsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListPipelineBlueprintsRequest,
  output: ListPipelineBlueprintsResponse,
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    InvalidPaginationTokenException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPipelineBlueprints",
}));

export type ListPipelineEndpointConnectionsError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Lists the pipeline endpoints connected to pipelines in your account.
 */
export const listPipelineEndpointConnections: API.PaginatedOperationMethod<
  ListPipelineEndpointConnectionsRequest,
  ListPipelineEndpointConnectionsResponse,
  ListPipelineEndpointConnectionsError,
  Credentials | HttpClient.HttpClient,
  PipelineEndpointConnection
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPipelineEndpointConnectionsRequest,
  output: ListPipelineEndpointConnectionsResponse,
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPipelineEndpointConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PipelineEndpointConnections",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPipelineEndpointsError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Lists all pipeline endpoints in your account.
 */
export const listPipelineEndpoints: API.PaginatedOperationMethod<
  ListPipelineEndpointsRequest,
  ListPipelineEndpointsResponse,
  ListPipelineEndpointsError,
  Credentials | HttpClient.HttpClient,
  PipelineEndpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPipelineEndpointsRequest,
  output: ListPipelineEndpointsResponse,
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPipelineEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PipelineEndpoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPipelinesError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | InvalidPaginationTokenException
  | ValidationException
  | CommonErrors;
/**
 * Lists all OpenSearch Ingestion pipelines in the current Amazon Web Services account and Region.
 * For more information, see Viewing Amazon OpenSearch
 * Ingestion pipelines.
 */
export const listPipelines: API.PaginatedOperationMethod<
  ListPipelinesRequest,
  ListPipelinesResponse,
  ListPipelinesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPipelinesRequest,
  output: ListPipelinesResponse,
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    InvalidPaginationTokenException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPipelines",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all resource tags associated with an OpenSearch Ingestion pipeline. For more information,
 * see Tagging Amazon OpenSearch Ingestion pipelines.
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
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutResourcePolicyError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Attaches a resource-based policy to an OpenSearch Ingestion resource. Resource-based
 * policies grant permissions to principals to perform actions on the resource.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutResourcePolicyRequest,
  output: PutResourcePolicyResponse,
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type RevokePipelineEndpointConnectionsError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Revokes pipeline endpoints from specified endpoint IDs.
 */
export const revokePipelineEndpointConnections: API.OperationMethod<
  RevokePipelineEndpointConnectionsRequest,
  RevokePipelineEndpointConnectionsResponse,
  RevokePipelineEndpointConnectionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RevokePipelineEndpointConnectionsRequest,
  output: RevokePipelineEndpointConnectionsResponse,
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokePipelineEndpointConnections",
}));

export type StartPipelineError =
  | AccessDeniedException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Starts an OpenSearch Ingestion pipeline. For more information, see Starting an OpenSearch Ingestion pipeline.
 */
export const startPipeline: API.OperationMethod<
  StartPipelineRequest,
  StartPipelineResponse,
  StartPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartPipelineRequest,
  output: StartPipelineResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartPipeline",
}));

export type StopPipelineError =
  | AccessDeniedException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Stops an OpenSearch Ingestion pipeline. For more information, see Stopping
 * an OpenSearch Ingestion pipeline.
 */
export const stopPipeline: API.OperationMethod<
  StopPipelineRequest,
  StopPipelineResponse,
  StopPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopPipelineRequest,
  output: StopPipelineResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopPipeline",
}));

export type TagResourceError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Tags an OpenSearch Ingestion pipeline. For more information, see Tagging Amazon OpenSearch
 * Ingestion pipelines.
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
    DisabledOperationException,
    InternalException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from an OpenSearch Ingestion pipeline. For more information, see Tagging
 * Amazon OpenSearch Ingestion pipelines.
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
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdatePipelineError =
  | AccessDeniedException
  | ConflictException
  | DisabledOperationException
  | InternalException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an OpenSearch Ingestion pipeline. For more information, see Updating Amazon OpenSearch
 * Ingestion pipelines.
 */
export const updatePipeline: API.OperationMethod<
  UpdatePipelineRequest,
  UpdatePipelineResponse,
  UpdatePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePipelineRequest,
  output: UpdatePipelineResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    DisabledOperationException,
    InternalException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePipeline",
}));

export type ValidatePipelineError =
  | AccessDeniedException
  | DisabledOperationException
  | InternalException
  | ValidationException
  | CommonErrors;
/**
 * Checks whether an OpenSearch Ingestion pipeline configuration is valid prior to creation. For
 * more information, see Creating Amazon OpenSearch
 * Ingestion pipelines.
 */
export const validatePipeline: API.OperationMethod<
  ValidatePipelineRequest,
  ValidatePipelineResponse,
  ValidatePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ValidatePipelineRequest,
  output: ValidatePipelineResponse,
  errors: [
    AccessDeniedException,
    DisabledOperationException,
    InternalException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidatePipeline",
}));
