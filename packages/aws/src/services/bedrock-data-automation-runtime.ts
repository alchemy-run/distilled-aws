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
  sdkId: "Bedrock Data Automation Runtime",
  serviceShapeName: "AmazonBedrockKeystoneRuntimeService",
});
const auth = T.AwsAuthSigv4({ name: "bedrock" });
const ver = T.ServiceVersion("2024-06-13");
const proto = T.AwsProtocolsAwsJson1_1();
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
              `https://bedrock-data-automation-runtime-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://bedrock-data-automation-runtime-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://bedrock-data-automation-runtime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://bedrock-data-automation-runtime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type InvocationArn = string;
export interface GetDataAutomationStatusRequest {
  invocationArn: string;
}
export const GetDataAutomationStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ invocationArn: S.String.pipe(T.HttpLabel("invocationArn")) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDataAutomationStatusRequest",
}) as any as S.Schema<GetDataAutomationStatusRequest>;
export type AutomationJobStatus =
  | "Created"
  | "InProgress"
  | "Success"
  | "ServiceError"
  | "ClientError"
  | (string & {});
export const AutomationJobStatus = /*@__PURE__*/ S.String;

export type S3Uri = string;
export interface OutputConfiguration {
  s3Uri: string;
}
export const OutputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Uri: S.String }),
).annotate({
  identifier: "OutputConfiguration",
}) as any as S.Schema<OutputConfiguration>;
export interface GetDataAutomationStatusResponse {
  status?: AutomationJobStatus;
  errorType?: string;
  errorMessage?: string;
  outputConfiguration?: OutputConfiguration;
  jobSubmissionTime?: Date;
  jobCompletionTime?: Date;
  jobDurationInSeconds?: number;
}
export const GetDataAutomationStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(AutomationJobStatus),
    errorType: S.optional(S.String),
    errorMessage: S.optional(S.String),
    outputConfiguration: S.optional(OutputConfiguration),
    jobSubmissionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    jobCompletionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    jobDurationInSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetDataAutomationStatusResponse",
}) as any as S.Schema<GetDataAutomationStatusResponse>;
export interface SyncInputConfiguration {
  bytes?: Uint8Array;
  s3Uri?: string;
}
export const SyncInputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bytes: S.optional(T.Blob), s3Uri: S.optional(S.String) }),
).annotate({
  identifier: "SyncInputConfiguration",
}) as any as S.Schema<SyncInputConfiguration>;
export type DataAutomationArn = string;
export type DataAutomationStage = "LIVE" | "DEVELOPMENT" | (string & {});
export const DataAutomationStage = /*@__PURE__*/ S.String;

export interface DataAutomationConfiguration {
  dataAutomationProjectArn: string;
  stage?: DataAutomationStage;
}
export const DataAutomationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataAutomationProjectArn: S.String,
    stage: S.optional(DataAutomationStage),
  }),
).annotate({
  identifier: "DataAutomationConfiguration",
}) as any as S.Schema<DataAutomationConfiguration>;
export type BlueprintArn = string;
export type BlueprintVersion = string;
export type BlueprintStage = "DEVELOPMENT" | "LIVE" | (string & {});
export const BlueprintStage = /*@__PURE__*/ S.String;

export interface Blueprint {
  blueprintArn: string;
  version?: string;
  stage?: BlueprintStage;
}
export const Blueprint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    blueprintArn: S.String,
    version: S.optional(S.String),
    stage: S.optional(BlueprintStage),
  }),
).annotate({ identifier: "Blueprint" }) as any as S.Schema<Blueprint>;
export type BlueprintList = Blueprint[];
export const BlueprintList = /*@__PURE__*/ S.Array(Blueprint);
export type DataAutomationProfileArn = string;
export type KMSKeyId = string;
export type EncryptionContextKey = string;
export type EncryptionContextValue = string;
export type EncryptionContextMap = { [key: string]: string | undefined };
export const EncryptionContextMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface EncryptionConfiguration {
  kmsKeyId: string;
  kmsEncryptionContext?: { [key: string]: string | undefined };
}
export const EncryptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    kmsKeyId: S.String,
    kmsEncryptionContext: S.optional(EncryptionContextMap),
  }),
).annotate({
  identifier: "EncryptionConfiguration",
}) as any as S.Schema<EncryptionConfiguration>;
export interface InvokeDataAutomationRequest {
  inputConfiguration: SyncInputConfiguration;
  dataAutomationConfiguration?: DataAutomationConfiguration;
  blueprints?: Blueprint[];
  dataAutomationProfileArn: string;
  encryptionConfiguration?: EncryptionConfiguration;
  outputConfiguration?: OutputConfiguration;
}
export const InvokeDataAutomationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inputConfiguration: SyncInputConfiguration,
    dataAutomationConfiguration: S.optional(DataAutomationConfiguration),
    blueprints: S.optional(BlueprintList),
    dataAutomationProfileArn: S.String,
    encryptionConfiguration: S.optional(EncryptionConfiguration),
    outputConfiguration: S.optional(OutputConfiguration),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "InvokeDataAutomationRequest",
}) as any as S.Schema<InvokeDataAutomationRequest>;
export type SemanticModality =
  | "DOCUMENT"
  | "IMAGE"
  | "AUDIO"
  | "VIDEO"
  | (string & {});
export const SemanticModality = /*@__PURE__*/ S.String;

export type CustomOutputStatus = "MATCH" | "NO_MATCH" | (string & {});
export const CustomOutputStatus = /*@__PURE__*/ S.String;

export interface OutputSegment {
  customOutputStatus?: CustomOutputStatus;
  customOutput?: string;
  standardOutput?: string;
}
export const OutputSegment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    customOutputStatus: S.optional(CustomOutputStatus),
    customOutput: S.optional(S.String),
    standardOutput: S.optional(S.String),
  }),
).annotate({ identifier: "OutputSegment" }) as any as S.Schema<OutputSegment>;
export type OutputSegmentList = OutputSegment[];
export const OutputSegmentList = /*@__PURE__*/ S.Array(OutputSegment);
export interface InvokeDataAutomationResponse {
  outputConfiguration?: OutputConfiguration;
  semanticModality: SemanticModality;
  outputSegments?: OutputSegment[];
}
export const InvokeDataAutomationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    outputConfiguration: S.optional(OutputConfiguration),
    semanticModality: SemanticModality,
    outputSegments: S.optional(OutputSegmentList),
  }),
).annotate({
  identifier: "InvokeDataAutomationResponse",
}) as any as S.Schema<InvokeDataAutomationResponse>;
export type IdempotencyToken = string;
export interface TimestampSegment {
  startTimeMillis: number;
  endTimeMillis: number;
}
export const TimestampSegment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ startTimeMillis: S.Number, endTimeMillis: S.Number }),
).annotate({
  identifier: "TimestampSegment",
}) as any as S.Schema<TimestampSegment>;
export type VideoSegmentConfiguration = { timestampSegment: TimestampSegment };
export const VideoSegmentConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ timestampSegment: TimestampSegment }),
]);
export interface VideoAssetProcessingConfiguration {
  segmentConfiguration?: VideoSegmentConfiguration;
}
export const VideoAssetProcessingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ segmentConfiguration: S.optional(VideoSegmentConfiguration) }),
).annotate({
  identifier: "VideoAssetProcessingConfiguration",
}) as any as S.Schema<VideoAssetProcessingConfiguration>;
export interface AssetProcessingConfiguration {
  video?: VideoAssetProcessingConfiguration;
}
export const AssetProcessingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ video: S.optional(VideoAssetProcessingConfiguration) }),
).annotate({
  identifier: "AssetProcessingConfiguration",
}) as any as S.Schema<AssetProcessingConfiguration>;
export interface InputConfiguration {
  s3Uri: string;
  assetProcessingConfiguration?: AssetProcessingConfiguration;
}
export const InputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3Uri: S.String,
    assetProcessingConfiguration: S.optional(AssetProcessingConfiguration),
  }),
).annotate({
  identifier: "InputConfiguration",
}) as any as S.Schema<InputConfiguration>;
export interface EventBridgeConfiguration {
  eventBridgeEnabled: boolean;
}
export const EventBridgeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ eventBridgeEnabled: S.Boolean }),
).annotate({
  identifier: "EventBridgeConfiguration",
}) as any as S.Schema<EventBridgeConfiguration>;
export interface NotificationConfiguration {
  eventBridgeConfiguration: EventBridgeConfiguration;
}
export const NotificationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ eventBridgeConfiguration: EventBridgeConfiguration }),
).annotate({
  identifier: "NotificationConfiguration",
}) as any as S.Schema<NotificationConfiguration>;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface InvokeDataAutomationAsyncRequest {
  clientToken?: string;
  inputConfiguration: InputConfiguration;
  outputConfiguration: OutputConfiguration;
  dataAutomationConfiguration?: DataAutomationConfiguration;
  encryptionConfiguration?: EncryptionConfiguration;
  notificationConfiguration?: NotificationConfiguration;
  blueprints?: Blueprint[];
  dataAutomationProfileArn: string;
  tags?: Tag[];
}
export const InvokeDataAutomationAsyncRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    inputConfiguration: InputConfiguration,
    outputConfiguration: OutputConfiguration,
    dataAutomationConfiguration: S.optional(DataAutomationConfiguration),
    encryptionConfiguration: S.optional(EncryptionConfiguration),
    notificationConfiguration: S.optional(NotificationConfiguration),
    blueprints: S.optional(BlueprintList),
    dataAutomationProfileArn: S.String,
    tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "InvokeDataAutomationAsyncRequest",
}) as any as S.Schema<InvokeDataAutomationAsyncRequest>;
export interface InvokeDataAutomationAsyncResponse {
  invocationArn: string;
}
export const InvokeDataAutomationAsyncResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ invocationArn: S.String }),
).annotate({
  identifier: "InvokeDataAutomationAsyncResponse",
}) as any as S.Schema<InvokeDataAutomationAsyncResponse>;
export type TaggableResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceARN: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceARN: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  resourceARN: string;
  tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceARN: S.String, tags: TagList }).pipe(
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
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  resourceARN: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceARN: S.String, tagKeys: TagKeyList }).pipe(
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
export type NonBlankString = string;
export type GetDataAutomationStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * API used to get data automation status.
 */
export const getDataAutomationStatus: API.OperationMethod<
  GetDataAutomationStatusRequest,
  GetDataAutomationStatusResponse,
  GetDataAutomationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataAutomationStatusRequest,
  output: GetDataAutomationStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataAutomationStatus",
}));

export type InvokeDataAutomationError =
  | AccessDeniedException
  | InternalServerException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sync API: Invoke data automation.
 */
export const invokeDataAutomation: API.OperationMethod<
  InvokeDataAutomationRequest,
  InvokeDataAutomationResponse,
  InvokeDataAutomationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InvokeDataAutomationRequest,
  output: InvokeDataAutomationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeDataAutomation",
}));

export type InvokeDataAutomationAsyncError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Async API: Invoke data automation.
 */
export const invokeDataAutomationAsync: API.OperationMethod<
  InvokeDataAutomationAsyncRequest,
  InvokeDataAutomationAsyncResponse,
  InvokeDataAutomationAsyncError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InvokeDataAutomationAsyncRequest,
  output: InvokeDataAutomationAsyncResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeDataAutomationAsync",
}));

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List tags for an Amazon Bedrock Data Automation resource
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
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tag an Amazon Bedrock Data Automation resource
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
 * Untag an Amazon Bedrock Data Automation resource
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
