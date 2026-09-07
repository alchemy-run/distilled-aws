import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc = T.AwsApiService({
  sdkId: "Sagemaker Edge",
  serviceShapeName: "AmazonSageMakerEdge",
});
const auth = T.AwsAuthSigv4({ name: "sagemaker" });
const ver = T.ServiceVersion("2020-09-23");
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
              `https://edge.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://edge.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://edge.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://edge.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class InternalServiceException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceException>()(
    "InternalServiceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type DeviceName = string;
export type DeviceFleetName = string;
export interface GetDeploymentsRequest {
  DeviceName?: string;
  DeviceFleetName?: string;
}
export const GetDeploymentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceName: S.optional(S.String),
    DeviceFleetName: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetDeployments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeploymentsRequest",
}) as any as S.Schema<GetDeploymentsRequest>;
export type EntityName = string;
export type DeploymentType = "Model" | (string & {});
export const DeploymentType = /*@__PURE__*/ S.String;

export type FailureHandlingPolicy =
  | "ROLLBACK_ON_FAILURE"
  | "DO_NOTHING"
  | (string & {});
export const FailureHandlingPolicy = /*@__PURE__*/ S.String;

export type S3Uri = string;
export type ChecksumType = "SHA1" | (string & {});
export const ChecksumType = /*@__PURE__*/ S.String;

export type ChecksumString = string;
export interface Checksum {
  Type?: ChecksumType;
  Sum?: string;
}
export const Checksum = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.optional(ChecksumType), Sum: S.optional(S.String) }),
).annotate({ identifier: "Checksum" }) as any as S.Schema<Checksum>;
export type ModelState = "DEPLOY" | "UNDEPLOY" | (string & {});
export const ModelState = /*@__PURE__*/ S.String;

export interface Definition {
  ModelHandle?: string;
  S3Url?: string;
  Checksum?: Checksum;
  State?: ModelState;
}
export const Definition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelHandle: S.optional(S.String),
    S3Url: S.optional(S.String),
    Checksum: S.optional(Checksum),
    State: S.optional(ModelState),
  }),
).annotate({ identifier: "Definition" }) as any as S.Schema<Definition>;
export type Definitions = Definition[];
export const Definitions = /*@__PURE__*/ S.Array(Definition);
export interface EdgeDeployment {
  DeploymentName?: string;
  Type?: DeploymentType;
  FailureHandlingPolicy?: FailureHandlingPolicy;
  Definitions?: Definition[];
}
export const EdgeDeployment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeploymentName: S.optional(S.String),
    Type: S.optional(DeploymentType),
    FailureHandlingPolicy: S.optional(FailureHandlingPolicy),
    Definitions: S.optional(Definitions),
  }),
).annotate({ identifier: "EdgeDeployment" }) as any as S.Schema<EdgeDeployment>;
export type EdgeDeployments = EdgeDeployment[];
export const EdgeDeployments = /*@__PURE__*/ S.Array(EdgeDeployment);
export interface GetDeploymentsResult {
  Deployments?: EdgeDeployment[];
}
export const GetDeploymentsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Deployments: S.optional(EdgeDeployments) }),
).annotate({
  identifier: "GetDeploymentsResult",
}) as any as S.Schema<GetDeploymentsResult>;
export interface GetDeviceRegistrationRequest {
  DeviceName?: string;
  DeviceFleetName?: string;
}
export const GetDeviceRegistrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceName: S.optional(S.String),
    DeviceFleetName: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetDeviceRegistration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeviceRegistrationRequest",
}) as any as S.Schema<GetDeviceRegistrationRequest>;
export type DeviceRegistration = string;
export type CacheTTLSeconds = string;
export interface GetDeviceRegistrationResult {
  DeviceRegistration?: string;
  CacheTTL?: string;
}
export const GetDeviceRegistrationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceRegistration: S.optional(S.String),
    CacheTTL: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDeviceRegistrationResult",
}) as any as S.Schema<GetDeviceRegistrationResult>;
export type Dimension = string;
export type Metric = string;
export type Value = number;
export interface EdgeMetric {
  Dimension?: string;
  MetricName?: string;
  Value?: number;
  Timestamp?: Date;
}
export const EdgeMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Dimension: S.optional(S.String),
    MetricName: S.optional(S.String),
    Value: S.optional(S.Number),
    Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "EdgeMetric" }) as any as S.Schema<EdgeMetric>;
export type EdgeMetrics = EdgeMetric[];
export const EdgeMetrics = /*@__PURE__*/ S.Array(EdgeMetric);
export type ModelName = string;
export type Version = string;
export interface Model {
  ModelName?: string;
  ModelVersion?: string;
  LatestSampleTime?: Date;
  LatestInference?: Date;
  ModelMetrics?: EdgeMetric[];
}
export const Model = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelName: S.optional(S.String),
    ModelVersion: S.optional(S.String),
    LatestSampleTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LatestInference: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ModelMetrics: S.optional(EdgeMetrics),
  }),
).annotate({ identifier: "Model" }) as any as S.Schema<Model>;
export type Models = Model[];
export const Models = /*@__PURE__*/ S.Array(Model);
export type DeploymentStatus = "SUCCESS" | "FAIL" | (string & {});
export const DeploymentStatus = /*@__PURE__*/ S.String;

export interface DeploymentModel {
  ModelHandle?: string;
  ModelName?: string;
  ModelVersion?: string;
  DesiredState?: ModelState;
  State?: ModelState;
  Status?: DeploymentStatus;
  StatusReason?: string;
  RollbackFailureReason?: string;
}
export const DeploymentModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelHandle: S.optional(S.String),
    ModelName: S.optional(S.String),
    ModelVersion: S.optional(S.String),
    DesiredState: S.optional(ModelState),
    State: S.optional(ModelState),
    Status: S.optional(DeploymentStatus),
    StatusReason: S.optional(S.String),
    RollbackFailureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "DeploymentModel",
}) as any as S.Schema<DeploymentModel>;
export type DeploymentModels = DeploymentModel[];
export const DeploymentModels = /*@__PURE__*/ S.Array(DeploymentModel);
export interface DeploymentResult {
  DeploymentName?: string;
  DeploymentStatus?: string;
  DeploymentStatusMessage?: string;
  DeploymentStartTime?: Date;
  DeploymentEndTime?: Date;
  DeploymentModels?: DeploymentModel[];
}
export const DeploymentResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeploymentName: S.optional(S.String),
    DeploymentStatus: S.optional(S.String),
    DeploymentStatusMessage: S.optional(S.String),
    DeploymentStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    DeploymentEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    DeploymentModels: S.optional(DeploymentModels),
  }),
).annotate({
  identifier: "DeploymentResult",
}) as any as S.Schema<DeploymentResult>;
export interface SendHeartbeatRequest {
  AgentMetrics?: EdgeMetric[];
  Models?: Model[];
  AgentVersion?: string;
  DeviceName?: string;
  DeviceFleetName?: string;
  DeploymentResult?: DeploymentResult;
}
export const SendHeartbeatRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AgentMetrics: S.optional(EdgeMetrics),
    Models: S.optional(Models),
    AgentVersion: S.optional(S.String),
    DeviceName: S.optional(S.String),
    DeviceFleetName: S.optional(S.String),
    DeploymentResult: S.optional(DeploymentResult),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/SendHeartbeat" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendHeartbeatRequest",
}) as any as S.Schema<SendHeartbeatRequest>;
export interface SendHeartbeatResponse {}
export const SendHeartbeatResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "SendHeartbeatResponse",
}) as any as S.Schema<SendHeartbeatResponse>;
export type ErrorMessage = string;
export type GetDeploymentsError = InternalServiceException | CommonErrors;
/**
 * Use to get the active deployments from a device.
 */
export const getDeployments: API.OperationMethod<
  GetDeploymentsRequest,
  GetDeploymentsResult,
  GetDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeploymentsRequest,
  output: GetDeploymentsResult,
  errors: [InternalServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployments",
}));

export type GetDeviceRegistrationError =
  | InternalServiceException
  | CommonErrors;
/**
 * Use to check if a device is registered with SageMaker Edge Manager.
 */
export const getDeviceRegistration: API.OperationMethod<
  GetDeviceRegistrationRequest,
  GetDeviceRegistrationResult,
  GetDeviceRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeviceRegistrationRequest,
  output: GetDeviceRegistrationResult,
  errors: [InternalServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeviceRegistration",
}));

export type SendHeartbeatError = InternalServiceException | CommonErrors;
/**
 * Use to get the current status of devices registered on SageMaker Edge Manager.
 */
export const sendHeartbeat: API.OperationMethod<
  SendHeartbeatRequest,
  SendHeartbeatResponse,
  SendHeartbeatError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendHeartbeatRequest,
  output: SendHeartbeatResponse,
  errors: [InternalServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendHeartbeat",
}));
