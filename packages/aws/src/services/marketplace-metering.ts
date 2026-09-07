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
  sdkId: "Marketplace Metering",
  serviceShapeName: "AWSMPMeteringService",
});
const auth = T.AwsAuthSigv4({ name: "aws-marketplace" });
const ver = T.ServiceVersion("2016-01-14");
const proto = T.AwsProtocolsAwsJson1_1();
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
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://metering-marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-cn" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://metering-marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://metering-marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-eusc" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(`https://metering-marketplace.${Region}.amazonaws.eu`);
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://metering.marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://metering.marketplace-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://metering.marketplace.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://metering.marketplace.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class CustomerNotEntitledException
  extends /*@__PURE__*/ S.TaggedError<CustomerNotEntitledException>()(
    "CustomerNotEntitledException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DisabledApiException
  extends /*@__PURE__*/ S.TaggedError<DisabledApiException>()(
    "DisabledApiException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DuplicateRequestException
  extends /*@__PURE__*/ S.TaggedError<DuplicateRequestException>()(
    "DuplicateRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ExpiredTokenException
  extends /*@__PURE__*/ S.TaggedError<ExpiredTokenException>()(
    "ExpiredTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class IdempotencyConflictException
  extends /*@__PURE__*/ S.TaggedError<IdempotencyConflictException>()(
    "IdempotencyConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServiceErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceErrorException>()(
    "InternalServiceErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidCustomerIdentifierException
  extends /*@__PURE__*/ S.TaggedError<InvalidCustomerIdentifierException>()(
    "InvalidCustomerIdentifierException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidEndpointRegionException
  extends /*@__PURE__*/ S.TaggedError<InvalidEndpointRegionException>()(
    "InvalidEndpointRegionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidLicenseException
  extends /*@__PURE__*/ S.TaggedError<InvalidLicenseException>()(
    "InvalidLicenseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidProductCodeException
  extends /*@__PURE__*/ S.TaggedError<InvalidProductCodeException>()(
    "InvalidProductCodeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidPublicKeyVersionException
  extends /*@__PURE__*/ S.TaggedError<InvalidPublicKeyVersionException>()(
    "InvalidPublicKeyVersionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidRegionException
  extends /*@__PURE__*/ S.TaggedError<InvalidRegionException>()(
    "InvalidRegionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidTagException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagException>()(
    "InvalidTagException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidTokenException>()(
    "InvalidTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidUsageAllocationsException
  extends /*@__PURE__*/ S.TaggedError<InvalidUsageAllocationsException>()(
    "InvalidUsageAllocationsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidUsageDimensionException
  extends /*@__PURE__*/ S.TaggedError<InvalidUsageDimensionException>()(
    "InvalidUsageDimensionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class PlatformNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<PlatformNotSupportedException>()(
    "PlatformNotSupportedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TimestampOutOfBoundsException
  extends /*@__PURE__*/ S.TaggedError<TimestampOutOfBoundsException>()(
    "TimestampOutOfBoundsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type CustomerIdentifier = string;
export type UsageDimension = string;
export type UsageQuantity = number;
export type AllocatedUsageQuantity = number;
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
export interface UsageAllocation {
  AllocatedUsageQuantity: number;
  Tags?: Tag[];
}
export const UsageAllocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AllocatedUsageQuantity: S.Number, Tags: S.optional(TagList) }),
).annotate({
  identifier: "UsageAllocation",
}) as any as S.Schema<UsageAllocation>;
export type UsageAllocations = UsageAllocation[];
export const UsageAllocations = /*@__PURE__*/ S.Array(UsageAllocation);
export type CustomerAWSAccountId = string;
export type LicenseArn = string;
export interface UsageRecord {
  Timestamp: Date;
  CustomerIdentifier?: string;
  Dimension: string;
  Quantity?: number;
  UsageAllocations?: UsageAllocation[];
  CustomerAWSAccountId?: string;
  LicenseArn?: string;
}
export const UsageRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    CustomerIdentifier: S.optional(S.String),
    Dimension: S.String,
    Quantity: S.optional(S.Number),
    UsageAllocations: S.optional(UsageAllocations),
    CustomerAWSAccountId: S.optional(S.String),
    LicenseArn: S.optional(S.String),
  }),
).annotate({ identifier: "UsageRecord" }) as any as S.Schema<UsageRecord>;
export type UsageRecordList = UsageRecord[];
export const UsageRecordList = /*@__PURE__*/ S.Array(UsageRecord);
export type ProductCode = string;
export interface BatchMeterUsageRequest {
  UsageRecords: UsageRecord[];
  ProductCode?: string;
}
export const BatchMeterUsageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UsageRecords: UsageRecordList,
    ProductCode: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchMeterUsageRequest",
}) as any as S.Schema<BatchMeterUsageRequest>;
export type UsageRecordResultStatus =
  | "Success"
  | "CustomerNotSubscribed"
  | "DuplicateRecord"
  | (string & {});
export const UsageRecordResultStatus = /*@__PURE__*/ S.String;

export interface UsageRecordResult {
  UsageRecord?: UsageRecord;
  MeteringRecordId?: string;
  Status?: UsageRecordResultStatus;
}
export const UsageRecordResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UsageRecord: S.optional(UsageRecord),
    MeteringRecordId: S.optional(S.String),
    Status: S.optional(UsageRecordResultStatus),
  }),
).annotate({
  identifier: "UsageRecordResult",
}) as any as S.Schema<UsageRecordResult>;
export type UsageRecordResultList = UsageRecordResult[];
export const UsageRecordResultList = /*@__PURE__*/ S.Array(UsageRecordResult);
export interface BatchMeterUsageResult {
  Results?: UsageRecordResult[];
  UnprocessedRecords?: UsageRecord[];
}
export const BatchMeterUsageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Results: S.optional(UsageRecordResultList),
    UnprocessedRecords: S.optional(UsageRecordList),
  }),
).annotate({
  identifier: "BatchMeterUsageResult",
}) as any as S.Schema<BatchMeterUsageResult>;
export type ClientToken = string;
export interface MeterUsageRequest {
  ProductCode: string;
  Timestamp: Date;
  UsageDimension: string;
  UsageQuantity?: number;
  DryRun?: boolean;
  UsageAllocations?: UsageAllocation[];
  ClientToken?: string;
}
export const MeterUsageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductCode: S.String,
    Timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    UsageDimension: S.String,
    UsageQuantity: S.optional(S.Number),
    DryRun: S.optional(S.Boolean),
    UsageAllocations: S.optional(UsageAllocations),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "MeterUsageRequest",
}) as any as S.Schema<MeterUsageRequest>;
export interface MeterUsageResult {
  MeteringRecordId?: string;
}
export const MeterUsageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MeteringRecordId: S.optional(S.String) }),
).annotate({
  identifier: "MeterUsageResult",
}) as any as S.Schema<MeterUsageResult>;
export type VersionInteger = number;
export type Nonce = string;
export interface RegisterUsageRequest {
  ProductCode: string;
  PublicKeyVersion: number;
  Nonce?: string;
}
export const RegisterUsageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProductCode: S.String,
    PublicKeyVersion: S.Number,
    Nonce: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RegisterUsageRequest",
}) as any as S.Schema<RegisterUsageRequest>;
export type NonEmptyString = string;
export interface RegisterUsageResult {
  PublicKeyRotationTimestamp?: Date;
  Signature?: string;
}
export const RegisterUsageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PublicKeyRotationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Signature: S.optional(S.String),
  }),
).annotate({
  identifier: "RegisterUsageResult",
}) as any as S.Schema<RegisterUsageResult>;
export interface ResolveCustomerRequest {
  RegistrationToken: string;
}
export const ResolveCustomerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegistrationToken: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ResolveCustomerRequest",
}) as any as S.Schema<ResolveCustomerRequest>;
export interface ResolveCustomerResult {
  CustomerIdentifier?: string;
  ProductCode?: string;
  CustomerAWSAccountId?: string;
  LicenseArn?: string;
}
export const ResolveCustomerResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomerIdentifier: S.optional(S.String),
    ProductCode: S.optional(S.String),
    CustomerAWSAccountId: S.optional(S.String),
    LicenseArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ResolveCustomerResult",
}) as any as S.Schema<ResolveCustomerResult>;
export type ErrorMessage = string;
export type BatchMeterUsageError =
  | DisabledApiException
  | InternalServiceErrorException
  | InvalidCustomerIdentifierException
  | InvalidLicenseException
  | InvalidProductCodeException
  | InvalidTagException
  | InvalidUsageAllocationsException
  | InvalidUsageDimensionException
  | ThrottlingException
  | TimestampOutOfBoundsException
  | CommonErrors;
/**
 * Amazon Web Services Marketplace is introducing Concurrent Agreements, enabling buyers to make multiple purchases per Amazon Web Services account. Starting June 1, 2026, new SaaS products must use `CustomerAWSAccountId` (instead of `CustomerIdentifier`), `LicenseArn` (instead of `ProductCode`) to support this feature. Existing integrations will continue to work. Review the new integration for Concurrent Agreements here.
 *
 * To post metering records for customers, SaaS applications call
 * `BatchMeterUsage`, which is used for metering SaaS flexible
 * consumption pricing (FCP). Identical requests are idempotent and can be
 * retried with the same records or a subset of records. Each
 * `BatchMeterUsage` request is for only one product. If you
 * want to meter usage for multiple products, you must make multiple
 * `BatchMeterUsage` calls.
 *
 * Usage records should be submitted in quick succession following a
 * recorded event. Usage records aren't accepted 6 hours or more after an
 * event.
 *
 * `BatchMeterUsage` can process up to 25
 * `UsageRecords` at a time, and each request must be less than
 * 1 MB in size. Optionally, you can have multiple usage allocations for
 * usage data that's split into buckets according to predefined tags.
 *
 * `BatchMeterUsage` returns a list of
 * `UsageRecordResult` objects, which have each
 * `UsageRecord`. It also returns a list of
 * `UnprocessedRecords`, which indicate errors on the service
 * side that should be retried.
 *
 * For Amazon Web Services Regions that support `BatchMeterUsage`, see BatchMeterUsage Region support.
 *
 * For an example of `BatchMeterUsage`, see BatchMeterUsage code example in the Amazon Web Services Marketplace Seller
 * Guide.
 */
export const batchMeterUsage: API.OperationMethod<
  BatchMeterUsageRequest,
  BatchMeterUsageResult,
  BatchMeterUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchMeterUsageRequest,
  output: BatchMeterUsageResult,
  errors: [
    DisabledApiException,
    InternalServiceErrorException,
    InvalidCustomerIdentifierException,
    InvalidLicenseException,
    InvalidProductCodeException,
    InvalidTagException,
    InvalidUsageAllocationsException,
    InvalidUsageDimensionException,
    ThrottlingException,
    TimestampOutOfBoundsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchMeterUsage",
}));

export type MeterUsageError =
  | CustomerNotEntitledException
  | DuplicateRequestException
  | IdempotencyConflictException
  | InternalServiceErrorException
  | InvalidEndpointRegionException
  | InvalidProductCodeException
  | InvalidTagException
  | InvalidUsageAllocationsException
  | InvalidUsageDimensionException
  | ThrottlingException
  | TimestampOutOfBoundsException
  | CommonErrors;
/**
 * As a seller, your software hosted in the buyer's Amazon Web Services account uses this API action to emit metering records directly to Amazon Web Services Marketplace.
 * You must use the following buyer Amazon Web Services account credentials to sign the API request.
 *
 * - For **Amazon EC2** deployments, your software must use the
 * IAM role for Amazon EC2
 * to sign the API call for `MeterUsage` API operation.
 *
 * - For **Amazon EKS** deployments, your software must use
 * IAM roles for service accounts (IRSA)
 * to sign the API call for the `MeterUsage` API operation. Using
 * EKS Pod Identity, the node role, or long-term access keys is not supported.
 *
 * - For **Amazon ECS** deployments, your software must use
 * Amazon ECS task IAM
 * role to sign the API call for the `MeterUsage` API operation. Using the node role or long-term access keys are not supported.
 *
 * - For **Amazon Bedrock AgentCore Runtime** deployments, your software must use the
 * AgentCore Runtime execution role
 * to sign the API call for the `MeterUsage` API operation. Long-term access keys are not supported.
 *
 * The handling of `MeterUsage` requests varies between Amazon Bedrock AgentCore Runtime and non-Amazon Bedrock AgentCore deployments.
 *
 * - For **non-Amazon Bedrock AgentCore Runtime** deployments, you can only report usage once per hour for each dimension.
 * For AMI-based products, this is per dimension and per EC2 instance. For container products, this is per dimension and per ECS task or EKS pod. You can't modify values
 * after they're recorded. If you report usage before a current hour ends, you will be unable to report additional usage until the next hour begins.
 * The `Timestamp` request parameter is rounded down to the hour and used to enforce this once-per-hour rule for idempotency.
 * For requests that are identical after the `Timestamp` is rounded down, the API is idempotent and returns the metering record ID.
 *
 * - For **Amazon Bedrock AgentCore Runtime** deployments, you can report usage multiple times per hour for the same dimension.
 * You do not need to aggregate metering records by the hour. You must include an idempotency token in the `ClientToken` request parameter. If using an Amazon
 * SDK or the Amazon Web Services CLI, you must use the latest version which automatically includes an idempotency token in the `ClientToken` request parameter so that the request is processed successfully.
 * The `Timestamp` request parameter is not rounded down to the hour and is not used for duplicate validation. Requests with duplicate `Timestamps` are aggregated as long as the
 * `ClientToken` is unique.
 *
 * If you submit records more than six hours after events occur, the records won't be accepted. The timestamp in your request determines when an event is recorded.
 *
 * You can optionally include multiple usage allocations, to provide customers with usage data split into buckets by tags that you define or allow the customer to define.
 *
 * For Amazon Web Services Regions that support `MeterUsage`, see MeterUsage Region support for Amazon EC2 and MeterUsage Region support for Amazon ECS and Amazon EKS.
 */
export const meterUsage: API.OperationMethod<
  MeterUsageRequest,
  MeterUsageResult,
  MeterUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: MeterUsageRequest,
  output: MeterUsageResult,
  errors: [
    CustomerNotEntitledException,
    DuplicateRequestException,
    IdempotencyConflictException,
    InternalServiceErrorException,
    InvalidEndpointRegionException,
    InvalidProductCodeException,
    InvalidTagException,
    InvalidUsageAllocationsException,
    InvalidUsageDimensionException,
    ThrottlingException,
    TimestampOutOfBoundsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MeterUsage",
}));

export type RegisterUsageError =
  | CustomerNotEntitledException
  | DisabledApiException
  | InternalServiceErrorException
  | InvalidProductCodeException
  | InvalidPublicKeyVersionException
  | InvalidRegionException
  | PlatformNotSupportedException
  | ThrottlingException
  | CommonErrors;
/**
 * Paid container software products sold through Amazon Web Services Marketplace must integrate with the Amazon Web Services Marketplace
 * Metering Service and call the `RegisterUsage` operation for software
 * entitlement and metering. Free and BYOL products for Amazon ECS or Amazon EKS aren't required to call `RegisterUsage`, but you may choose to
 * do so if you would like to receive usage data in your seller reports. The sections below
 * explain the behavior of `RegisterUsage`. `RegisterUsage` performs
 * two primary functions: metering and entitlement.
 *
 * - *Entitlement*: `RegisterUsage` allows you to
 * verify that the customer running your paid software is subscribed to your
 * product on Amazon Web Services Marketplace, enabling you to guard against unauthorized use. Your container
 * image that integrates with `RegisterUsage` is only required to guard
 * against unauthorized use at container startup, as such a
 * `CustomerNotSubscribedException` or
 * `PlatformNotSupportedException` will only be thrown on the
 * initial call to `RegisterUsage`. Subsequent calls from the same
 * Amazon ECS task instance (e.g. task-id) or Amazon EKS pod
 * will not throw a `CustomerNotSubscribedException`, even if the
 * customer unsubscribes while the Amazon ECS task or Amazon EKS
 * pod is still running.
 *
 * - *Metering*: `RegisterUsage` meters software use
 * per ECS task, per hour, or per pod for Amazon EKS with usage prorated to
 * the second. A minimum of 1 minute of usage applies to tasks that are short
 * lived. For example, if a customer has a 10 node Amazon ECS or Amazon EKS cluster and a service configured as a Daemon Set, then Amazon ECS or Amazon EKS will launch a task on all 10 cluster nodes
 * and the customer will be charged for 10 tasks. Software metering
 * is handled by the Amazon Web Services Marketplace metering control plane—your software is
 * not required to perform metering-specific actions other than to call
 * `RegisterUsage` to commence metering.
 * The Amazon Web Services Marketplace metering control plane will also bill customers for
 * running ECS tasks and Amazon EKS pods, regardless of the customer's
 * subscription state, which removes the need for your software to run entitlement
 * checks at runtime. For containers, `RegisterUsage` should be called
 * immediately at launch. If you don’t register the container within the first 6 hours
 * of the launch, Amazon Web Services Marketplace Metering Service doesn’t provide any metering
 * guarantees for previous months. Metering will continue, however, for the
 * current month forward until the container ends. `RegisterUsage` is
 * for metering paid hourly container products.
 *
 * For Amazon Web Services Regions that support `RegisterUsage`, see RegisterUsage Region support.
 */
export const registerUsage: API.OperationMethod<
  RegisterUsageRequest,
  RegisterUsageResult,
  RegisterUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterUsageRequest,
  output: RegisterUsageResult,
  errors: [
    CustomerNotEntitledException,
    DisabledApiException,
    InternalServiceErrorException,
    InvalidProductCodeException,
    InvalidPublicKeyVersionException,
    InvalidRegionException,
    PlatformNotSupportedException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterUsage",
}));

export type ResolveCustomerError =
  | DisabledApiException
  | ExpiredTokenException
  | InternalServiceErrorException
  | InvalidTokenException
  | ThrottlingException
  | CommonErrors;
/**
 * `ResolveCustomer` is called by a SaaS application during the registration
 * process. When a buyer visits your website during the registration process, the buyer
 * submits a registration token through their browser. The registration token is resolved
 * through this API to obtain a `CustomerIdentifier` along with the
 * `CustomerAWSAccountId`, `ProductCode`, and `LicenseArn`.
 *
 * To successfully resolve the token, the API must be called from the account that was used to publish the SaaS
 * application. For an example of using `ResolveCustomer`, see ResolveCustomer code example in the Amazon Web Services Marketplace Seller
 * Guide.
 *
 * Permission is required for this operation. Your IAM role or user performing this
 * operation requires a policy to allow the `aws-marketplace:ResolveCustomer`
 * action. For more information, see Actions, resources, and condition keys for Amazon Web Services Marketplace Metering Service in
 * the *Service Authorization Reference*.
 *
 * For Amazon Web Services Regions that support `ResolveCustomer`, see ResolveCustomer Region support.
 */
export const resolveCustomer: API.OperationMethod<
  ResolveCustomerRequest,
  ResolveCustomerResult,
  ResolveCustomerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResolveCustomerRequest,
  output: ResolveCustomerResult,
  errors: [
    DisabledApiException,
    ExpiredTokenException,
    InternalServiceErrorException,
    InvalidTokenException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResolveCustomer",
}));
