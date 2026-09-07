import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc = T.AwsApiService({
  sdkId: "CloudTrail Data",
  serviceShapeName: "CloudTrailDataService",
});
const auth = T.AwsAuthSigv4({ name: "cloudtrail-data" });
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
              `https://cloudtrail-data-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://cloudtrail-data-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://cloudtrail-data.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://cloudtrail-data.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ChannelInsufficientPermission
  extends /*@__PURE__*/ S.TaggedError<ChannelInsufficientPermission>()(
    "ChannelInsufficientPermission",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ChannelNotFound
  extends /*@__PURE__*/ S.TaggedError<ChannelNotFound>()("ChannelNotFound", {
    message: S.optional(S.String).pipe(T.ErrorMessage()),
  }) {}
export class ChannelUnsupportedSchema
  extends /*@__PURE__*/ S.TaggedError<ChannelUnsupportedSchema>()(
    "ChannelUnsupportedSchema",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DuplicatedAuditEventId
  extends /*@__PURE__*/ S.TaggedError<DuplicatedAuditEventId>()(
    "DuplicatedAuditEventId",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidChannelARN
  extends /*@__PURE__*/ S.TaggedError<InvalidChannelARN>()(
    "InvalidChannelARN",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type Uuid = string;
export interface AuditEvent {
  id: string;
  eventData: string;
  eventDataChecksum?: string;
}
export const AuditEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    eventData: S.String,
    eventDataChecksum: S.optional(S.String),
  }),
).annotate({ identifier: "AuditEvent" }) as any as S.Schema<AuditEvent>;
export type AuditEvents = AuditEvent[];
export const AuditEvents = /*@__PURE__*/ S.Array(AuditEvent);
export type ChannelArn = string;
export type ExternalId = string;
export interface PutAuditEventsRequest {
  auditEvents: AuditEvent[];
  channelArn: string;
  externalId?: string;
}
export const PutAuditEventsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    auditEvents: AuditEvents,
    channelArn: S.String.pipe(T.HttpQuery("channelArn")),
    externalId: S.optional(S.String).pipe(T.HttpQuery("externalId")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/PutAuditEvents" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAuditEventsRequest",
}) as any as S.Schema<PutAuditEventsRequest>;
export interface AuditEventResultEntry {
  id: string;
  eventID: string;
}
export const AuditEventResultEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, eventID: S.String }),
).annotate({
  identifier: "AuditEventResultEntry",
}) as any as S.Schema<AuditEventResultEntry>;
export type AuditEventResultEntries = AuditEventResultEntry[];
export const AuditEventResultEntries = /*@__PURE__*/ S.Array(
  AuditEventResultEntry,
);
export type ErrorCode = string;
export type ErrorMessage = string;
export interface ResultErrorEntry {
  id: string;
  errorCode: string;
  errorMessage: string;
}
export const ResultErrorEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String, errorCode: S.String, errorMessage: S.String }),
).annotate({
  identifier: "ResultErrorEntry",
}) as any as S.Schema<ResultErrorEntry>;
export type ResultErrorEntries = ResultErrorEntry[];
export const ResultErrorEntries = /*@__PURE__*/ S.Array(ResultErrorEntry);
export interface PutAuditEventsResponse {
  successful: AuditEventResultEntry[];
  failed: ResultErrorEntry[];
}
export const PutAuditEventsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ successful: AuditEventResultEntries, failed: ResultErrorEntries }),
).annotate({
  identifier: "PutAuditEventsResponse",
}) as any as S.Schema<PutAuditEventsResponse>;
export type PutAuditEventsError =
  | ChannelInsufficientPermission
  | ChannelNotFound
  | ChannelUnsupportedSchema
  | DuplicatedAuditEventId
  | InvalidChannelARN
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Ingests your application events into CloudTrail Lake. A required parameter,
 * `auditEvents`, accepts the JSON records (also called
 * *payload*) of events that you want CloudTrail to ingest. You
 * can add up to 100 of these events (or up to 1 MB) per `PutAuditEvents`
 * request.
 */
export const putAuditEvents: API.OperationMethod<
  PutAuditEventsRequest,
  PutAuditEventsResponse,
  PutAuditEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAuditEventsRequest,
  output: PutAuditEventsResponse,
  errors: [
    ChannelInsufficientPermission,
    ChannelNotFound,
    ChannelUnsupportedSchema,
    DuplicatedAuditEventId,
    InvalidChannelARN,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAuditEvents",
}));
