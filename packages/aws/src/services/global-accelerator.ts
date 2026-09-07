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
  sdkId: "Global Accelerator",
  serviceShapeName: "GlobalAccelerator_V20180706",
});
const auth = T.AwsAuthSigv4({ name: "globalaccelerator" });
const ver = T.ServiceVersion("2018-08-08");
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
              `https://globalaccelerator-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://globalaccelerator-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://globalaccelerator.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://globalaccelerator.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AcceleratorNotDisabledException
  extends /*@__PURE__*/ S.TaggedError<AcceleratorNotDisabledException>()(
    "AcceleratorNotDisabledException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class AcceleratorNotFoundException
  extends /*@__PURE__*/ S.TaggedError<AcceleratorNotFoundException>()(
    "AcceleratorNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class AssociatedEndpointGroupFoundException
  extends /*@__PURE__*/ S.TaggedError<AssociatedEndpointGroupFoundException>()(
    "AssociatedEndpointGroupFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class AssociatedListenerFoundException
  extends /*@__PURE__*/ S.TaggedError<AssociatedListenerFoundException>()(
    "AssociatedListenerFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class AttachmentNotFoundException
  extends /*@__PURE__*/ S.TaggedError<AttachmentNotFoundException>()(
    "AttachmentNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ByoipCidrNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ByoipCidrNotFoundException>()(
    "ByoipCidrNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class EndpointAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<EndpointAlreadyExistsException>()(
    "EndpointAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class EndpointGroupAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<EndpointGroupAlreadyExistsException>()(
    "EndpointGroupAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class EndpointGroupNotFoundException
  extends /*@__PURE__*/ S.TaggedError<EndpointGroupNotFoundException>()(
    "EndpointGroupNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class EndpointNotFoundException
  extends /*@__PURE__*/ S.TaggedError<EndpointNotFoundException>()(
    "EndpointNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class IncorrectCidrStateException
  extends /*@__PURE__*/ S.TaggedError<IncorrectCidrStateException>()(
    "IncorrectCidrStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class InternalServiceErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceErrorException>()(
    "InternalServiceErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidArgumentException
  extends /*@__PURE__*/ S.TaggedError<InvalidArgumentException>()(
    "InvalidArgumentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidPortRangeException
  extends /*@__PURE__*/ S.TaggedError<InvalidPortRangeException>()(
    "InvalidPortRangeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ListenerNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ListenerNotFoundException>()(
    "ListenerNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TransactionInProgressException
  extends /*@__PURE__*/ S.TaggedError<TransactionInProgressException>()(
    "TransactionInProgressException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export interface CustomRoutingEndpointConfiguration {
  EndpointId?: string;
  AttachmentArn?: string;
}
export const CustomRoutingEndpointConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointId: S.optional(S.String),
    AttachmentArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomRoutingEndpointConfiguration",
}) as any as S.Schema<CustomRoutingEndpointConfiguration>;
export type CustomRoutingEndpointConfigurations =
  CustomRoutingEndpointConfiguration[];
export const CustomRoutingEndpointConfigurations = /*@__PURE__*/ S.Array(
  CustomRoutingEndpointConfiguration,
);
export interface AddCustomRoutingEndpointsRequest {
  EndpointConfigurations: CustomRoutingEndpointConfiguration[];
  EndpointGroupArn: string;
}
export const AddCustomRoutingEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointConfigurations: CustomRoutingEndpointConfigurations,
    EndpointGroupArn: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AddCustomRoutingEndpointsRequest",
}) as any as S.Schema<AddCustomRoutingEndpointsRequest>;
export interface CustomRoutingEndpointDescription {
  EndpointId?: string;
}
export const CustomRoutingEndpointDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EndpointId: S.optional(S.String) }),
).annotate({
  identifier: "CustomRoutingEndpointDescription",
}) as any as S.Schema<CustomRoutingEndpointDescription>;
export type CustomRoutingEndpointDescriptions =
  CustomRoutingEndpointDescription[];
export const CustomRoutingEndpointDescriptions = /*@__PURE__*/ S.Array(
  CustomRoutingEndpointDescription,
);
export interface AddCustomRoutingEndpointsResponse {
  EndpointDescriptions?: CustomRoutingEndpointDescription[];
  EndpointGroupArn?: string;
}
export const AddCustomRoutingEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointDescriptions: S.optional(CustomRoutingEndpointDescriptions),
    EndpointGroupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AddCustomRoutingEndpointsResponse",
}) as any as S.Schema<AddCustomRoutingEndpointsResponse>;
export type EndpointWeight = number;
export interface EndpointConfiguration {
  EndpointId?: string;
  Weight?: number;
  ClientIPPreservationEnabled?: boolean;
  AttachmentArn?: string;
}
export const EndpointConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointId: S.optional(S.String),
    Weight: S.optional(S.Number),
    ClientIPPreservationEnabled: S.optional(S.Boolean),
    AttachmentArn: S.optional(S.String),
  }),
).annotate({
  identifier: "EndpointConfiguration",
}) as any as S.Schema<EndpointConfiguration>;
export type EndpointConfigurations = EndpointConfiguration[];
export const EndpointConfigurations = /*@__PURE__*/ S.Array(
  EndpointConfiguration,
);
export interface AddEndpointsRequest {
  EndpointConfigurations: EndpointConfiguration[];
  EndpointGroupArn: string;
}
export const AddEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointConfigurations: EndpointConfigurations,
    EndpointGroupArn: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AddEndpointsRequest",
}) as any as S.Schema<AddEndpointsRequest>;
export type HealthState = "INITIAL" | "HEALTHY" | "UNHEALTHY" | (string & {});
export const HealthState = S.String;

export interface EndpointDescription {
  EndpointId?: string;
  Weight?: number;
  HealthState?: HealthState;
  HealthReason?: string;
  ClientIPPreservationEnabled?: boolean;
}
export const EndpointDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointId: S.optional(S.String),
    Weight: S.optional(S.Number),
    HealthState: S.optional(HealthState),
    HealthReason: S.optional(S.String),
    ClientIPPreservationEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "EndpointDescription",
}) as any as S.Schema<EndpointDescription>;
export type EndpointDescriptions = EndpointDescription[];
export const EndpointDescriptions = /*@__PURE__*/ S.Array(EndpointDescription);
export interface AddEndpointsResponse {
  EndpointDescriptions?: EndpointDescription[];
  EndpointGroupArn?: string;
}
export const AddEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointDescriptions: S.optional(EndpointDescriptions),
    EndpointGroupArn: S.optional(S.String),
  }),
).annotate({
  identifier: "AddEndpointsResponse",
}) as any as S.Schema<AddEndpointsResponse>;
export interface AdvertiseByoipCidrRequest {
  Cidr: string;
}
export const AdvertiseByoipCidrRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cidr: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AdvertiseByoipCidrRequest",
}) as any as S.Schema<AdvertiseByoipCidrRequest>;
export type ByoipCidrState =
  | "PENDING_PROVISIONING"
  | "READY"
  | "PENDING_ADVERTISING"
  | "ADVERTISING"
  | "PENDING_WITHDRAWING"
  | "PENDING_DEPROVISIONING"
  | "DEPROVISIONED"
  | "FAILED_PROVISION"
  | "FAILED_ADVERTISING"
  | "FAILED_WITHDRAW"
  | "FAILED_DEPROVISION"
  | (string & {});
export const ByoipCidrState = S.String;

export interface ByoipCidrEvent {
  Message?: string;
  Timestamp?: Date;
}
export const ByoipCidrEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Message: S.optional(S.String),
    Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "ByoipCidrEvent" }) as any as S.Schema<ByoipCidrEvent>;
export type ByoipCidrEvents = ByoipCidrEvent[];
export const ByoipCidrEvents = /*@__PURE__*/ S.Array(ByoipCidrEvent);
export interface ByoipCidr {
  Cidr?: string;
  State?: ByoipCidrState;
  Events?: ByoipCidrEvent[];
}
export const ByoipCidr = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Cidr: S.optional(S.String),
    State: S.optional(ByoipCidrState),
    Events: S.optional(ByoipCidrEvents),
  }),
).annotate({ identifier: "ByoipCidr" }) as any as S.Schema<ByoipCidr>;
export interface AdvertiseByoipCidrResponse {
  ByoipCidr?: ByoipCidr;
}
export const AdvertiseByoipCidrResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ByoipCidr: S.optional(ByoipCidr) }),
).annotate({
  identifier: "AdvertiseByoipCidrResponse",
}) as any as S.Schema<AdvertiseByoipCidrResponse>;
export type IpAddress = string;
export type DestinationAddresses = string[];
export const DestinationAddresses = /*@__PURE__*/ S.Array(S.String);
export type PortNumber = number;
export type DestinationPorts = number[];
export const DestinationPorts = /*@__PURE__*/ S.Array(S.Number);
export interface AllowCustomRoutingTrafficRequest {
  EndpointGroupArn: string;
  EndpointId: string;
  DestinationAddresses?: string[];
  DestinationPorts?: number[];
  AllowAllTrafficToEndpoint?: boolean;
}
export const AllowCustomRoutingTrafficRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointGroupArn: S.String,
    EndpointId: S.String,
    DestinationAddresses: S.optional(DestinationAddresses),
    DestinationPorts: S.optional(DestinationPorts),
    AllowAllTrafficToEndpoint: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AllowCustomRoutingTrafficRequest",
}) as any as S.Schema<AllowCustomRoutingTrafficRequest>;
export interface AllowCustomRoutingTrafficResponse {}
export const AllowCustomRoutingTrafficResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AllowCustomRoutingTrafficResponse",
}) as any as S.Schema<AllowCustomRoutingTrafficResponse>;
export type IpAddressType = "IPV4" | "DUAL_STACK" | (string & {});
export const IpAddressType = S.String;

export type IpAddresses = string[];
export const IpAddresses = /*@__PURE__*/ S.Array(S.String);
export type IdempotencyToken = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type Tags = Tag[];
export const Tags = /*@__PURE__*/ S.Array(Tag);
export interface CreateAcceleratorRequest {
  Name: string;
  IpAddressType?: IpAddressType;
  IpAddresses?: string[];
  Enabled?: boolean;
  IdempotencyToken: string;
  Tags?: Tag[];
}
export const CreateAcceleratorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    IpAddressType: S.optional(IpAddressType),
    IpAddresses: S.optional(IpAddresses),
    Enabled: S.optional(S.Boolean),
    IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateAcceleratorRequest",
}) as any as S.Schema<CreateAcceleratorRequest>;
export type IpAddressFamily = "IPv4" | "IPv6" | (string & {});
export const IpAddressFamily = S.String;

export interface IpSet {
  IpFamily?: string;
  IpAddresses?: string[];
  IpAddressFamily?: IpAddressFamily;
}
export const IpSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IpFamily: S.optional(S.String),
    IpAddresses: S.optional(IpAddresses),
    IpAddressFamily: S.optional(IpAddressFamily),
  }),
).annotate({ identifier: "IpSet" }) as any as S.Schema<IpSet>;
export type IpSets = IpSet[];
export const IpSets = /*@__PURE__*/ S.Array(IpSet);
export type AcceleratorStatus = "DEPLOYED" | "IN_PROGRESS" | (string & {});
export const AcceleratorStatus = S.String;

export interface AcceleratorEvent {
  Message?: string;
  Timestamp?: Date;
}
export const AcceleratorEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Message: S.optional(S.String),
    Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "AcceleratorEvent",
}) as any as S.Schema<AcceleratorEvent>;
export type AcceleratorEvents = AcceleratorEvent[];
export const AcceleratorEvents = /*@__PURE__*/ S.Array(AcceleratorEvent);
export interface Accelerator {
  AcceleratorArn?: string;
  Name?: string;
  IpAddressType?: IpAddressType;
  Enabled?: boolean;
  IpSets?: IpSet[];
  DnsName?: string;
  Status?: AcceleratorStatus;
  CreatedTime?: Date;
  LastModifiedTime?: Date;
  DualStackDnsName?: string;
  Events?: AcceleratorEvent[];
}
export const Accelerator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceleratorArn: S.optional(S.String),
    Name: S.optional(S.String),
    IpAddressType: S.optional(IpAddressType),
    Enabled: S.optional(S.Boolean),
    IpSets: S.optional(IpSets),
    DnsName: S.optional(S.String),
    Status: S.optional(AcceleratorStatus),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    DualStackDnsName: S.optional(S.String),
    Events: S.optional(AcceleratorEvents),
  }),
).annotate({ identifier: "Accelerator" }) as any as S.Schema<Accelerator>;
export interface CreateAcceleratorResponse {
  Accelerator?: Accelerator;
}
export const CreateAcceleratorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Accelerator: S.optional(Accelerator) }),
).annotate({
  identifier: "CreateAcceleratorResponse",
}) as any as S.Schema<CreateAcceleratorResponse>;
export type AttachmentName = string;
export type Principal = string;
export type Principals = string[];
export const Principals = /*@__PURE__*/ S.Array(S.String);
export interface Resource {
  EndpointId?: string;
  Cidr?: string;
  Region?: string;
}
export const Resource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointId: S.optional(S.String),
    Cidr: S.optional(S.String),
    Region: S.optional(S.String),
  }),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export type Resources = Resource[];
export const Resources = /*@__PURE__*/ S.Array(Resource);
export interface CreateCrossAccountAttachmentRequest {
  Name: string;
  Principals?: string[];
  Resources?: Resource[];
  IdempotencyToken: string;
  Tags?: Tag[];
}
export const CreateCrossAccountAttachmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Principals: S.optional(Principals),
    Resources: S.optional(Resources),
    IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateCrossAccountAttachmentRequest",
}) as any as S.Schema<CreateCrossAccountAttachmentRequest>;
export interface Attachment {
  AttachmentArn?: string;
  Name?: string;
  Principals?: string[];
  Resources?: Resource[];
  LastModifiedTime?: Date;
  CreatedTime?: Date;
}
export const Attachment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttachmentArn: S.optional(S.String),
    Name: S.optional(S.String),
    Principals: S.optional(Principals),
    Resources: S.optional(Resources),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Attachment" }) as any as S.Schema<Attachment>;
export interface CreateCrossAccountAttachmentResponse {
  CrossAccountAttachment?: Attachment;
}
export const CreateCrossAccountAttachmentResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ CrossAccountAttachment: S.optional(Attachment) }),
).annotate({
  identifier: "CreateCrossAccountAttachmentResponse",
}) as any as S.Schema<CreateCrossAccountAttachmentResponse>;
export interface CreateCustomRoutingAcceleratorRequest {
  Name: string;
  IpAddressType?: IpAddressType;
  IpAddresses?: string[];
  Enabled?: boolean;
  IdempotencyToken: string;
  Tags?: Tag[];
}
export const CreateCustomRoutingAcceleratorRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Name: S.String,
      IpAddressType: S.optional(IpAddressType),
      IpAddresses: S.optional(IpAddresses),
      Enabled: S.optional(S.Boolean),
      IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
      Tags: S.optional(Tags),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CreateCustomRoutingAcceleratorRequest",
}) as any as S.Schema<CreateCustomRoutingAcceleratorRequest>;
export type CustomRoutingAcceleratorStatus =
  | "DEPLOYED"
  | "IN_PROGRESS"
  | (string & {});
export const CustomRoutingAcceleratorStatus = S.String;

export interface CustomRoutingAccelerator {
  AcceleratorArn?: string;
  Name?: string;
  IpAddressType?: IpAddressType;
  Enabled?: boolean;
  IpSets?: IpSet[];
  DnsName?: string;
  Status?: CustomRoutingAcceleratorStatus;
  CreatedTime?: Date;
  LastModifiedTime?: Date;
}
export const CustomRoutingAccelerator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceleratorArn: S.optional(S.String),
    Name: S.optional(S.String),
    IpAddressType: S.optional(IpAddressType),
    Enabled: S.optional(S.Boolean),
    IpSets: S.optional(IpSets),
    DnsName: S.optional(S.String),
    Status: S.optional(CustomRoutingAcceleratorStatus),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "CustomRoutingAccelerator",
}) as any as S.Schema<CustomRoutingAccelerator>;
export interface CreateCustomRoutingAcceleratorResponse {
  Accelerator?: CustomRoutingAccelerator;
}
export const CreateCustomRoutingAcceleratorResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Accelerator: S.optional(CustomRoutingAccelerator) }),
).annotate({
  identifier: "CreateCustomRoutingAcceleratorResponse",
}) as any as S.Schema<CreateCustomRoutingAcceleratorResponse>;
export type CustomRoutingProtocol = "TCP" | "UDP" | (string & {});
export const CustomRoutingProtocol = S.String;

export type CustomRoutingProtocols = CustomRoutingProtocol[];
export const CustomRoutingProtocols = /*@__PURE__*/ S.Array(
  CustomRoutingProtocol,
);
export interface CustomRoutingDestinationConfiguration {
  FromPort: number;
  ToPort: number;
  Protocols: CustomRoutingProtocol[];
}
export const CustomRoutingDestinationConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FromPort: S.Number,
      ToPort: S.Number,
      Protocols: CustomRoutingProtocols,
    }),
).annotate({
  identifier: "CustomRoutingDestinationConfiguration",
}) as any as S.Schema<CustomRoutingDestinationConfiguration>;
export type CustomRoutingDestinationConfigurations =
  CustomRoutingDestinationConfiguration[];
export const CustomRoutingDestinationConfigurations = /*@__PURE__*/ S.Array(
  CustomRoutingDestinationConfiguration,
);
export interface CreateCustomRoutingEndpointGroupRequest {
  ListenerArn: string;
  EndpointGroupRegion: string;
  DestinationConfigurations: CustomRoutingDestinationConfiguration[];
  IdempotencyToken: string;
}
export const CreateCustomRoutingEndpointGroupRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ListenerArn: S.String,
      EndpointGroupRegion: S.String,
      DestinationConfigurations: CustomRoutingDestinationConfigurations,
      IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CreateCustomRoutingEndpointGroupRequest",
}) as any as S.Schema<CreateCustomRoutingEndpointGroupRequest>;
export type Protocol = "TCP" | "UDP" | (string & {});
export const Protocol = S.String;

export type Protocols = Protocol[];
export const Protocols = /*@__PURE__*/ S.Array(Protocol);
export interface CustomRoutingDestinationDescription {
  FromPort?: number;
  ToPort?: number;
  Protocols?: Protocol[];
}
export const CustomRoutingDestinationDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FromPort: S.optional(S.Number),
    ToPort: S.optional(S.Number),
    Protocols: S.optional(Protocols),
  }),
).annotate({
  identifier: "CustomRoutingDestinationDescription",
}) as any as S.Schema<CustomRoutingDestinationDescription>;
export type CustomRoutingDestinationDescriptions =
  CustomRoutingDestinationDescription[];
export const CustomRoutingDestinationDescriptions = /*@__PURE__*/ S.Array(
  CustomRoutingDestinationDescription,
);
export interface CustomRoutingEndpointGroup {
  EndpointGroupArn?: string;
  EndpointGroupRegion?: string;
  DestinationDescriptions?: CustomRoutingDestinationDescription[];
  EndpointDescriptions?: CustomRoutingEndpointDescription[];
}
export const CustomRoutingEndpointGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointGroupArn: S.optional(S.String),
    EndpointGroupRegion: S.optional(S.String),
    DestinationDescriptions: S.optional(CustomRoutingDestinationDescriptions),
    EndpointDescriptions: S.optional(CustomRoutingEndpointDescriptions),
  }),
).annotate({
  identifier: "CustomRoutingEndpointGroup",
}) as any as S.Schema<CustomRoutingEndpointGroup>;
export interface CreateCustomRoutingEndpointGroupResponse {
  EndpointGroup?: CustomRoutingEndpointGroup;
}
export const CreateCustomRoutingEndpointGroupResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ EndpointGroup: S.optional(CustomRoutingEndpointGroup) }),
).annotate({
  identifier: "CreateCustomRoutingEndpointGroupResponse",
}) as any as S.Schema<CreateCustomRoutingEndpointGroupResponse>;
export interface PortRange {
  FromPort?: number;
  ToPort?: number;
}
export const PortRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FromPort: S.optional(S.Number), ToPort: S.optional(S.Number) }),
).annotate({ identifier: "PortRange" }) as any as S.Schema<PortRange>;
export type PortRanges = PortRange[];
export const PortRanges = /*@__PURE__*/ S.Array(PortRange);
export interface CreateCustomRoutingListenerRequest {
  AcceleratorArn: string;
  PortRanges: PortRange[];
  IdempotencyToken: string;
}
export const CreateCustomRoutingListenerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceleratorArn: S.String,
    PortRanges: PortRanges,
    IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateCustomRoutingListenerRequest",
}) as any as S.Schema<CreateCustomRoutingListenerRequest>;
export interface CustomRoutingListener {
  ListenerArn?: string;
  PortRanges?: PortRange[];
}
export const CustomRoutingListener = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ListenerArn: S.optional(S.String),
    PortRanges: S.optional(PortRanges),
  }),
).annotate({
  identifier: "CustomRoutingListener",
}) as any as S.Schema<CustomRoutingListener>;
export interface CreateCustomRoutingListenerResponse {
  Listener?: CustomRoutingListener;
}
export const CreateCustomRoutingListenerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Listener: S.optional(CustomRoutingListener) }),
).annotate({
  identifier: "CreateCustomRoutingListenerResponse",
}) as any as S.Schema<CreateCustomRoutingListenerResponse>;
export type TrafficDialPercentage = number;
export type HealthCheckPort = number;
export type HealthCheckProtocol = "TCP" | "HTTP" | "HTTPS" | (string & {});
export const HealthCheckProtocol = S.String;

export type HealthCheckPath = string;
export type HealthCheckIntervalSeconds = number;
export type ThresholdCount = number;
export interface PortOverride {
  ListenerPort?: number;
  EndpointPort?: number;
}
export const PortOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ListenerPort: S.optional(S.Number),
    EndpointPort: S.optional(S.Number),
  }),
).annotate({ identifier: "PortOverride" }) as any as S.Schema<PortOverride>;
export type PortOverrides = PortOverride[];
export const PortOverrides = /*@__PURE__*/ S.Array(PortOverride);
export interface CreateEndpointGroupRequest {
  ListenerArn: string;
  EndpointGroupRegion: string;
  EndpointConfigurations?: EndpointConfiguration[];
  TrafficDialPercentage?: number;
  HealthCheckPort?: number;
  HealthCheckProtocol?: HealthCheckProtocol;
  HealthCheckPath?: string;
  HealthCheckIntervalSeconds?: number;
  ThresholdCount?: number;
  IdempotencyToken: string;
  PortOverrides?: PortOverride[];
}
export const CreateEndpointGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ListenerArn: S.String,
    EndpointGroupRegion: S.String,
    EndpointConfigurations: S.optional(EndpointConfigurations),
    TrafficDialPercentage: S.optional(S.Number),
    HealthCheckPort: S.optional(S.Number),
    HealthCheckProtocol: S.optional(HealthCheckProtocol),
    HealthCheckPath: S.optional(S.String),
    HealthCheckIntervalSeconds: S.optional(S.Number),
    ThresholdCount: S.optional(S.Number),
    IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
    PortOverrides: S.optional(PortOverrides),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateEndpointGroupRequest",
}) as any as S.Schema<CreateEndpointGroupRequest>;
export interface EndpointGroup {
  EndpointGroupArn?: string;
  EndpointGroupRegion?: string;
  EndpointDescriptions?: EndpointDescription[];
  TrafficDialPercentage?: number;
  HealthCheckPort?: number;
  HealthCheckProtocol?: HealthCheckProtocol;
  HealthCheckPath?: string;
  HealthCheckIntervalSeconds?: number;
  ThresholdCount?: number;
  PortOverrides?: PortOverride[];
}
export const EndpointGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointGroupArn: S.optional(S.String),
    EndpointGroupRegion: S.optional(S.String),
    EndpointDescriptions: S.optional(EndpointDescriptions),
    TrafficDialPercentage: S.optional(S.Number),
    HealthCheckPort: S.optional(S.Number),
    HealthCheckProtocol: S.optional(HealthCheckProtocol),
    HealthCheckPath: S.optional(S.String),
    HealthCheckIntervalSeconds: S.optional(S.Number),
    ThresholdCount: S.optional(S.Number),
    PortOverrides: S.optional(PortOverrides),
  }),
).annotate({ identifier: "EndpointGroup" }) as any as S.Schema<EndpointGroup>;
export interface CreateEndpointGroupResponse {
  EndpointGroup?: EndpointGroup;
}
export const CreateEndpointGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EndpointGroup: S.optional(EndpointGroup) }),
).annotate({
  identifier: "CreateEndpointGroupResponse",
}) as any as S.Schema<CreateEndpointGroupResponse>;
export type ClientAffinity = "NONE" | "SOURCE_IP" | (string & {});
export const ClientAffinity = S.String;

export interface CreateListenerRequest {
  AcceleratorArn: string;
  PortRanges: PortRange[];
  Protocol: Protocol;
  ClientAffinity?: ClientAffinity;
  IdempotencyToken: string;
}
export const CreateListenerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceleratorArn: S.String,
    PortRanges: PortRanges,
    Protocol: Protocol,
    ClientAffinity: S.optional(ClientAffinity),
    IdempotencyToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateListenerRequest",
}) as any as S.Schema<CreateListenerRequest>;
export interface Listener {
  ListenerArn?: string;
  PortRanges?: PortRange[];
  Protocol?: Protocol;
  ClientAffinity?: ClientAffinity;
}
export const Listener = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ListenerArn: S.optional(S.String),
    PortRanges: S.optional(PortRanges),
    Protocol: S.optional(Protocol),
    ClientAffinity: S.optional(ClientAffinity),
  }),
).annotate({ identifier: "Listener" }) as any as S.Schema<Listener>;
export interface CreateListenerResponse {
  Listener?: Listener;
}
export const CreateListenerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Listener: S.optional(Listener) }),
).annotate({
  identifier: "CreateListenerResponse",
}) as any as S.Schema<CreateListenerResponse>;
export interface DeleteAcceleratorRequest {
  AcceleratorArn: string;
}
export const DeleteAcceleratorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AcceleratorArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteAcceleratorRequest",
}) as any as S.Schema<DeleteAcceleratorRequest>;
export interface DeleteAcceleratorResponse {}
export const DeleteAcceleratorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAcceleratorResponse",
}) as any as S.Schema<DeleteAcceleratorResponse>;
export interface DeleteCrossAccountAttachmentRequest {
  AttachmentArn: string;
}
export const DeleteCrossAccountAttachmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AttachmentArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteCrossAccountAttachmentRequest",
}) as any as S.Schema<DeleteCrossAccountAttachmentRequest>;
export interface DeleteCrossAccountAttachmentResponse {}
export const DeleteCrossAccountAttachmentResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteCrossAccountAttachmentResponse",
}) as any as S.Schema<DeleteCrossAccountAttachmentResponse>;
export interface DeleteCustomRoutingAcceleratorRequest {
  AcceleratorArn: string;
}
export const DeleteCustomRoutingAcceleratorRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ AcceleratorArn: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DeleteCustomRoutingAcceleratorRequest",
}) as any as S.Schema<DeleteCustomRoutingAcceleratorRequest>;
export interface DeleteCustomRoutingAcceleratorResponse {}
export const DeleteCustomRoutingAcceleratorResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteCustomRoutingAcceleratorResponse",
}) as any as S.Schema<DeleteCustomRoutingAcceleratorResponse>;
export interface DeleteCustomRoutingEndpointGroupRequest {
  EndpointGroupArn: string;
}
export const DeleteCustomRoutingEndpointGroupRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ EndpointGroupArn: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DeleteCustomRoutingEndpointGroupRequest",
}) as any as S.Schema<DeleteCustomRoutingEndpointGroupRequest>;
export interface DeleteCustomRoutingEndpointGroupResponse {}
export const DeleteCustomRoutingEndpointGroupResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteCustomRoutingEndpointGroupResponse",
}) as any as S.Schema<DeleteCustomRoutingEndpointGroupResponse>;
export interface DeleteCustomRoutingListenerRequest {
  ListenerArn: string;
}
export const DeleteCustomRoutingListenerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ListenerArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteCustomRoutingListenerRequest",
}) as any as S.Schema<DeleteCustomRoutingListenerRequest>;
export interface DeleteCustomRoutingListenerResponse {}
export const DeleteCustomRoutingListenerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCustomRoutingListenerResponse",
}) as any as S.Schema<DeleteCustomRoutingListenerResponse>;
export interface DeleteEndpointGroupRequest {
  EndpointGroupArn: string;
}
export const DeleteEndpointGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EndpointGroupArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteEndpointGroupRequest",
}) as any as S.Schema<DeleteEndpointGroupRequest>;
export interface DeleteEndpointGroupResponse {}
export const DeleteEndpointGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEndpointGroupResponse",
}) as any as S.Schema<DeleteEndpointGroupResponse>;
export interface DeleteListenerRequest {
  ListenerArn: string;
}
export const DeleteListenerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ListenerArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteListenerRequest",
}) as any as S.Schema<DeleteListenerRequest>;
export interface DeleteListenerResponse {}
export const DeleteListenerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteListenerResponse",
}) as any as S.Schema<DeleteListenerResponse>;
export interface DenyCustomRoutingTrafficRequest {
  EndpointGroupArn: string;
  EndpointId: string;
  DestinationAddresses?: string[];
  DestinationPorts?: number[];
  DenyAllTrafficToEndpoint?: boolean;
}
export const DenyCustomRoutingTrafficRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointGroupArn: S.String,
    EndpointId: S.String,
    DestinationAddresses: S.optional(DestinationAddresses),
    DestinationPorts: S.optional(DestinationPorts),
    DenyAllTrafficToEndpoint: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DenyCustomRoutingTrafficRequest",
}) as any as S.Schema<DenyCustomRoutingTrafficRequest>;
export interface DenyCustomRoutingTrafficResponse {}
export const DenyCustomRoutingTrafficResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DenyCustomRoutingTrafficResponse",
}) as any as S.Schema<DenyCustomRoutingTrafficResponse>;
export interface DeprovisionByoipCidrRequest {
  Cidr: string;
}
export const DeprovisionByoipCidrRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cidr: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeprovisionByoipCidrRequest",
}) as any as S.Schema<DeprovisionByoipCidrRequest>;
export interface DeprovisionByoipCidrResponse {
  ByoipCidr?: ByoipCidr;
}
export const DeprovisionByoipCidrResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ByoipCidr: S.optional(ByoipCidr) }),
).annotate({
  identifier: "DeprovisionByoipCidrResponse",
}) as any as S.Schema<DeprovisionByoipCidrResponse>;
export interface DescribeAcceleratorRequest {
  AcceleratorArn: string;
}
export const DescribeAcceleratorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AcceleratorArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeAcceleratorRequest",
}) as any as S.Schema<DescribeAcceleratorRequest>;
export interface DescribeAcceleratorResponse {
  Accelerator?: Accelerator;
}
export const DescribeAcceleratorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Accelerator: S.optional(Accelerator) }),
).annotate({
  identifier: "DescribeAcceleratorResponse",
}) as any as S.Schema<DescribeAcceleratorResponse>;
export interface DescribeAcceleratorAttributesRequest {
  AcceleratorArn: string;
}
export const DescribeAcceleratorAttributesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ AcceleratorArn: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeAcceleratorAttributesRequest",
}) as any as S.Schema<DescribeAcceleratorAttributesRequest>;
export interface AcceleratorAttributes {
  FlowLogsEnabled?: boolean;
  FlowLogsS3Bucket?: string;
  FlowLogsS3Prefix?: string;
}
export const AcceleratorAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowLogsEnabled: S.optional(S.Boolean),
    FlowLogsS3Bucket: S.optional(S.String),
    FlowLogsS3Prefix: S.optional(S.String),
  }),
).annotate({
  identifier: "AcceleratorAttributes",
}) as any as S.Schema<AcceleratorAttributes>;
export interface DescribeAcceleratorAttributesResponse {
  AcceleratorAttributes?: AcceleratorAttributes;
}
export const DescribeAcceleratorAttributesResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ AcceleratorAttributes: S.optional(AcceleratorAttributes) }),
).annotate({
  identifier: "DescribeAcceleratorAttributesResponse",
}) as any as S.Schema<DescribeAcceleratorAttributesResponse>;
export interface DescribeCrossAccountAttachmentRequest {
  AttachmentArn: string;
}
export const DescribeCrossAccountAttachmentRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ AttachmentArn: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeCrossAccountAttachmentRequest",
}) as any as S.Schema<DescribeCrossAccountAttachmentRequest>;
export interface DescribeCrossAccountAttachmentResponse {
  CrossAccountAttachment?: Attachment;
}
export const DescribeCrossAccountAttachmentResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ CrossAccountAttachment: S.optional(Attachment) }),
).annotate({
  identifier: "DescribeCrossAccountAttachmentResponse",
}) as any as S.Schema<DescribeCrossAccountAttachmentResponse>;
export interface DescribeCustomRoutingAcceleratorRequest {
  AcceleratorArn: string;
}
export const DescribeCustomRoutingAcceleratorRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ AcceleratorArn: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeCustomRoutingAcceleratorRequest",
}) as any as S.Schema<DescribeCustomRoutingAcceleratorRequest>;
export interface DescribeCustomRoutingAcceleratorResponse {
  Accelerator?: CustomRoutingAccelerator;
}
export const DescribeCustomRoutingAcceleratorResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Accelerator: S.optional(CustomRoutingAccelerator) }),
).annotate({
  identifier: "DescribeCustomRoutingAcceleratorResponse",
}) as any as S.Schema<DescribeCustomRoutingAcceleratorResponse>;
export interface DescribeCustomRoutingAcceleratorAttributesRequest {
  AcceleratorArn: string;
}
export const DescribeCustomRoutingAcceleratorAttributesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ AcceleratorArn: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DescribeCustomRoutingAcceleratorAttributesRequest",
  }) as any as S.Schema<DescribeCustomRoutingAcceleratorAttributesRequest>;
export interface CustomRoutingAcceleratorAttributes {
  FlowLogsEnabled?: boolean;
  FlowLogsS3Bucket?: string;
  FlowLogsS3Prefix?: string;
}
export const CustomRoutingAcceleratorAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowLogsEnabled: S.optional(S.Boolean),
    FlowLogsS3Bucket: S.optional(S.String),
    FlowLogsS3Prefix: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomRoutingAcceleratorAttributes",
}) as any as S.Schema<CustomRoutingAcceleratorAttributes>;
export interface DescribeCustomRoutingAcceleratorAttributesResponse {
  AcceleratorAttributes?: CustomRoutingAcceleratorAttributes;
}
export const DescribeCustomRoutingAcceleratorAttributesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AcceleratorAttributes: S.optional(CustomRoutingAcceleratorAttributes),
    }),
  ).annotate({
    identifier: "DescribeCustomRoutingAcceleratorAttributesResponse",
  }) as any as S.Schema<DescribeCustomRoutingAcceleratorAttributesResponse>;
export interface DescribeCustomRoutingEndpointGroupRequest {
  EndpointGroupArn: string;
}
export const DescribeCustomRoutingEndpointGroupRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ EndpointGroupArn: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DescribeCustomRoutingEndpointGroupRequest",
  }) as any as S.Schema<DescribeCustomRoutingEndpointGroupRequest>;
export interface DescribeCustomRoutingEndpointGroupResponse {
  EndpointGroup?: CustomRoutingEndpointGroup;
}
export const DescribeCustomRoutingEndpointGroupResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ EndpointGroup: S.optional(CustomRoutingEndpointGroup) }),
  ).annotate({
    identifier: "DescribeCustomRoutingEndpointGroupResponse",
  }) as any as S.Schema<DescribeCustomRoutingEndpointGroupResponse>;
export interface DescribeCustomRoutingListenerRequest {
  ListenerArn: string;
}
export const DescribeCustomRoutingListenerRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ListenerArn: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeCustomRoutingListenerRequest",
}) as any as S.Schema<DescribeCustomRoutingListenerRequest>;
export interface DescribeCustomRoutingListenerResponse {
  Listener?: CustomRoutingListener;
}
export const DescribeCustomRoutingListenerResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Listener: S.optional(CustomRoutingListener) }),
).annotate({
  identifier: "DescribeCustomRoutingListenerResponse",
}) as any as S.Schema<DescribeCustomRoutingListenerResponse>;
export interface DescribeEndpointGroupRequest {
  EndpointGroupArn: string;
}
export const DescribeEndpointGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EndpointGroupArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeEndpointGroupRequest",
}) as any as S.Schema<DescribeEndpointGroupRequest>;
export interface DescribeEndpointGroupResponse {
  EndpointGroup?: EndpointGroup;
}
export const DescribeEndpointGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EndpointGroup: S.optional(EndpointGroup) }),
).annotate({
  identifier: "DescribeEndpointGroupResponse",
}) as any as S.Schema<DescribeEndpointGroupResponse>;
export interface DescribeListenerRequest {
  ListenerArn: string;
}
export const DescribeListenerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ListenerArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeListenerRequest",
}) as any as S.Schema<DescribeListenerRequest>;
export interface DescribeListenerResponse {
  Listener?: Listener;
}
export const DescribeListenerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Listener: S.optional(Listener) }),
).annotate({
  identifier: "DescribeListenerResponse",
}) as any as S.Schema<DescribeListenerResponse>;
export type MaxResults = number;
export interface ListAcceleratorsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListAcceleratorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAcceleratorsRequest",
}) as any as S.Schema<ListAcceleratorsRequest>;
export type Accelerators = Accelerator[];
export const Accelerators = /*@__PURE__*/ S.Array(Accelerator);
export interface ListAcceleratorsResponse {
  Accelerators?: Accelerator[];
  NextToken?: string;
}
export const ListAcceleratorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Accelerators: S.optional(Accelerators),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAcceleratorsResponse",
}) as any as S.Schema<ListAcceleratorsResponse>;
export interface ListByoipCidrsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListByoipCidrsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListByoipCidrsRequest",
}) as any as S.Schema<ListByoipCidrsRequest>;
export type ByoipCidrs = ByoipCidr[];
export const ByoipCidrs = /*@__PURE__*/ S.Array(ByoipCidr);
export interface ListByoipCidrsResponse {
  ByoipCidrs?: ByoipCidr[];
  NextToken?: string;
}
export const ListByoipCidrsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ByoipCidrs: S.optional(ByoipCidrs),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListByoipCidrsResponse",
}) as any as S.Schema<ListByoipCidrsResponse>;
export interface ListCrossAccountAttachmentsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListCrossAccountAttachmentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListCrossAccountAttachmentsRequest",
}) as any as S.Schema<ListCrossAccountAttachmentsRequest>;
export type Attachments = Attachment[];
export const Attachments = /*@__PURE__*/ S.Array(Attachment);
export interface ListCrossAccountAttachmentsResponse {
  CrossAccountAttachments?: Attachment[];
  NextToken?: string;
}
export const ListCrossAccountAttachmentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CrossAccountAttachments: S.optional(Attachments),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCrossAccountAttachmentsResponse",
}) as any as S.Schema<ListCrossAccountAttachmentsResponse>;
export interface ListCrossAccountResourceAccountsRequest {}
export const ListCrossAccountResourceAccountsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListCrossAccountResourceAccountsRequest",
}) as any as S.Schema<ListCrossAccountResourceAccountsRequest>;
export type AwsAccountId = string;
export type AwsAccountIds = string[];
export const AwsAccountIds = /*@__PURE__*/ S.Array(S.String);
export interface ListCrossAccountResourceAccountsResponse {
  ResourceOwnerAwsAccountIds?: string[];
}
export const ListCrossAccountResourceAccountsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ ResourceOwnerAwsAccountIds: S.optional(AwsAccountIds) }),
).annotate({
  identifier: "ListCrossAccountResourceAccountsResponse",
}) as any as S.Schema<ListCrossAccountResourceAccountsResponse>;
export interface ListCrossAccountResourcesRequest {
  AcceleratorArn?: string;
  ResourceOwnerAwsAccountId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListCrossAccountResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceleratorArn: S.optional(S.String),
    ResourceOwnerAwsAccountId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListCrossAccountResourcesRequest",
}) as any as S.Schema<ListCrossAccountResourcesRequest>;
export interface CrossAccountResource {
  EndpointId?: string;
  Cidr?: string;
  AttachmentArn?: string;
}
export const CrossAccountResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointId: S.optional(S.String),
    Cidr: S.optional(S.String),
    AttachmentArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CrossAccountResource",
}) as any as S.Schema<CrossAccountResource>;
export type CrossAccountResources = CrossAccountResource[];
export const CrossAccountResources =
  /*@__PURE__*/ S.Array(CrossAccountResource);
export interface ListCrossAccountResourcesResponse {
  CrossAccountResources?: CrossAccountResource[];
  NextToken?: string;
}
export const ListCrossAccountResourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CrossAccountResources: S.optional(CrossAccountResources),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCrossAccountResourcesResponse",
}) as any as S.Schema<ListCrossAccountResourcesResponse>;
export interface ListCustomRoutingAcceleratorsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListCustomRoutingAcceleratorsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListCustomRoutingAcceleratorsRequest",
}) as any as S.Schema<ListCustomRoutingAcceleratorsRequest>;
export type CustomRoutingAccelerators = CustomRoutingAccelerator[];
export const CustomRoutingAccelerators = /*@__PURE__*/ S.Array(
  CustomRoutingAccelerator,
);
export interface ListCustomRoutingAcceleratorsResponse {
  Accelerators?: CustomRoutingAccelerator[];
  NextToken?: string;
}
export const ListCustomRoutingAcceleratorsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Accelerators: S.optional(CustomRoutingAccelerators),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListCustomRoutingAcceleratorsResponse",
}) as any as S.Schema<ListCustomRoutingAcceleratorsResponse>;
export interface ListCustomRoutingEndpointGroupsRequest {
  ListenerArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListCustomRoutingEndpointGroupsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ListenerArn: S.String,
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListCustomRoutingEndpointGroupsRequest",
}) as any as S.Schema<ListCustomRoutingEndpointGroupsRequest>;
export type CustomRoutingEndpointGroups = CustomRoutingEndpointGroup[];
export const CustomRoutingEndpointGroups = /*@__PURE__*/ S.Array(
  CustomRoutingEndpointGroup,
);
export interface ListCustomRoutingEndpointGroupsResponse {
  EndpointGroups?: CustomRoutingEndpointGroup[];
  NextToken?: string;
}
export const ListCustomRoutingEndpointGroupsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EndpointGroups: S.optional(CustomRoutingEndpointGroups),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListCustomRoutingEndpointGroupsResponse",
}) as any as S.Schema<ListCustomRoutingEndpointGroupsResponse>;
export interface ListCustomRoutingListenersRequest {
  AcceleratorArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListCustomRoutingListenersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceleratorArn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListCustomRoutingListenersRequest",
}) as any as S.Schema<ListCustomRoutingListenersRequest>;
export type CustomRoutingListeners = CustomRoutingListener[];
export const CustomRoutingListeners = /*@__PURE__*/ S.Array(
  CustomRoutingListener,
);
export interface ListCustomRoutingListenersResponse {
  Listeners?: CustomRoutingListener[];
  NextToken?: string;
}
export const ListCustomRoutingListenersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Listeners: S.optional(CustomRoutingListeners),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCustomRoutingListenersResponse",
}) as any as S.Schema<ListCustomRoutingListenersResponse>;
export type PortMappingsMaxResults = number;
export interface ListCustomRoutingPortMappingsRequest {
  AcceleratorArn: string;
  EndpointGroupArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListCustomRoutingPortMappingsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AcceleratorArn: S.String,
      EndpointGroupArn: S.optional(S.String),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListCustomRoutingPortMappingsRequest",
}) as any as S.Schema<ListCustomRoutingPortMappingsRequest>;
export interface SocketAddress {
  IpAddress?: string;
  Port?: number;
}
export const SocketAddress = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IpAddress: S.optional(S.String), Port: S.optional(S.Number) }),
).annotate({ identifier: "SocketAddress" }) as any as S.Schema<SocketAddress>;
export type CustomRoutingDestinationTrafficState =
  | "ALLOW"
  | "DENY"
  | (string & {});
export const CustomRoutingDestinationTrafficState = S.String;

export interface PortMapping {
  AcceleratorPort?: number;
  EndpointGroupArn?: string;
  EndpointId?: string;
  DestinationSocketAddress?: SocketAddress;
  Protocols?: CustomRoutingProtocol[];
  DestinationTrafficState?: CustomRoutingDestinationTrafficState;
}
export const PortMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceleratorPort: S.optional(S.Number),
    EndpointGroupArn: S.optional(S.String),
    EndpointId: S.optional(S.String),
    DestinationSocketAddress: S.optional(SocketAddress),
    Protocols: S.optional(CustomRoutingProtocols),
    DestinationTrafficState: S.optional(CustomRoutingDestinationTrafficState),
  }),
).annotate({ identifier: "PortMapping" }) as any as S.Schema<PortMapping>;
export type PortMappings = PortMapping[];
export const PortMappings = /*@__PURE__*/ S.Array(PortMapping);
export interface ListCustomRoutingPortMappingsResponse {
  PortMappings?: PortMapping[];
  NextToken?: string;
}
export const ListCustomRoutingPortMappingsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      PortMappings: S.optional(PortMappings),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListCustomRoutingPortMappingsResponse",
}) as any as S.Schema<ListCustomRoutingPortMappingsResponse>;
export interface ListCustomRoutingPortMappingsByDestinationRequest {
  EndpointId: string;
  DestinationAddress: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListCustomRoutingPortMappingsByDestinationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EndpointId: S.String,
      DestinationAddress: S.String,
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ListCustomRoutingPortMappingsByDestinationRequest",
  }) as any as S.Schema<ListCustomRoutingPortMappingsByDestinationRequest>;
export type SocketAddresses = SocketAddress[];
export const SocketAddresses = /*@__PURE__*/ S.Array(SocketAddress);
export interface DestinationPortMapping {
  AcceleratorArn?: string;
  AcceleratorSocketAddresses?: SocketAddress[];
  EndpointGroupArn?: string;
  EndpointId?: string;
  EndpointGroupRegion?: string;
  DestinationSocketAddress?: SocketAddress;
  IpAddressType?: IpAddressType;
  DestinationTrafficState?: CustomRoutingDestinationTrafficState;
}
export const DestinationPortMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceleratorArn: S.optional(S.String),
    AcceleratorSocketAddresses: S.optional(SocketAddresses),
    EndpointGroupArn: S.optional(S.String),
    EndpointId: S.optional(S.String),
    EndpointGroupRegion: S.optional(S.String),
    DestinationSocketAddress: S.optional(SocketAddress),
    IpAddressType: S.optional(IpAddressType),
    DestinationTrafficState: S.optional(CustomRoutingDestinationTrafficState),
  }),
).annotate({
  identifier: "DestinationPortMapping",
}) as any as S.Schema<DestinationPortMapping>;
export type DestinationPortMappings = DestinationPortMapping[];
export const DestinationPortMappings = /*@__PURE__*/ S.Array(
  DestinationPortMapping,
);
export interface ListCustomRoutingPortMappingsByDestinationResponse {
  DestinationPortMappings?: DestinationPortMapping[];
  NextToken?: string;
}
export const ListCustomRoutingPortMappingsByDestinationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DestinationPortMappings: S.optional(DestinationPortMappings),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListCustomRoutingPortMappingsByDestinationResponse",
  }) as any as S.Schema<ListCustomRoutingPortMappingsByDestinationResponse>;
export interface ListEndpointGroupsRequest {
  ListenerArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListEndpointGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ListenerArn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEndpointGroupsRequest",
}) as any as S.Schema<ListEndpointGroupsRequest>;
export type EndpointGroups = EndpointGroup[];
export const EndpointGroups = /*@__PURE__*/ S.Array(EndpointGroup);
export interface ListEndpointGroupsResponse {
  EndpointGroups?: EndpointGroup[];
  NextToken?: string;
}
export const ListEndpointGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointGroups: S.optional(EndpointGroups),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEndpointGroupsResponse",
}) as any as S.Schema<ListEndpointGroupsResponse>;
export interface ListListenersRequest {
  AcceleratorArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListListenersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceleratorArn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListListenersRequest",
}) as any as S.Schema<ListListenersRequest>;
export type Listeners = Listener[];
export const Listeners = /*@__PURE__*/ S.Array(Listener);
export interface ListListenersResponse {
  Listeners?: Listener[];
  NextToken?: string;
}
export const ListListenersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Listeners: S.optional(Listeners),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListListenersResponse",
}) as any as S.Schema<ListListenersResponse>;
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface CidrAuthorizationContext {
  Message: string;
  Signature: string;
}
export const CidrAuthorizationContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.String, Signature: S.String }),
).annotate({
  identifier: "CidrAuthorizationContext",
}) as any as S.Schema<CidrAuthorizationContext>;
export interface ProvisionByoipCidrRequest {
  Cidr: string;
  CidrAuthorizationContext: CidrAuthorizationContext;
}
export const ProvisionByoipCidrRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Cidr: S.String,
    CidrAuthorizationContext: CidrAuthorizationContext,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ProvisionByoipCidrRequest",
}) as any as S.Schema<ProvisionByoipCidrRequest>;
export interface ProvisionByoipCidrResponse {
  ByoipCidr?: ByoipCidr;
}
export const ProvisionByoipCidrResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ByoipCidr: S.optional(ByoipCidr) }),
).annotate({
  identifier: "ProvisionByoipCidrResponse",
}) as any as S.Schema<ProvisionByoipCidrResponse>;
export type EndpointIds = string[];
export const EndpointIds = /*@__PURE__*/ S.Array(S.String);
export interface RemoveCustomRoutingEndpointsRequest {
  EndpointIds: string[];
  EndpointGroupArn: string;
}
export const RemoveCustomRoutingEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EndpointIds: EndpointIds, EndpointGroupArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RemoveCustomRoutingEndpointsRequest",
}) as any as S.Schema<RemoveCustomRoutingEndpointsRequest>;
export interface RemoveCustomRoutingEndpointsResponse {}
export const RemoveCustomRoutingEndpointsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "RemoveCustomRoutingEndpointsResponse",
}) as any as S.Schema<RemoveCustomRoutingEndpointsResponse>;
export interface EndpointIdentifier {
  EndpointId: string;
  ClientIPPreservationEnabled?: boolean;
}
export const EndpointIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointId: S.String,
    ClientIPPreservationEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "EndpointIdentifier",
}) as any as S.Schema<EndpointIdentifier>;
export type EndpointIdentifiers = EndpointIdentifier[];
export const EndpointIdentifiers = /*@__PURE__*/ S.Array(EndpointIdentifier);
export interface RemoveEndpointsRequest {
  EndpointIdentifiers: EndpointIdentifier[];
  EndpointGroupArn: string;
}
export const RemoveEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointIdentifiers: EndpointIdentifiers,
    EndpointGroupArn: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RemoveEndpointsRequest",
}) as any as S.Schema<RemoveEndpointsRequest>;
export interface RemoveEndpointsResponse {}
export const RemoveEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RemoveEndpointsResponse",
}) as any as S.Schema<RemoveEndpointsResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: Tags }).pipe(
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
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagKeys: TagKeys }).pipe(
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
export interface UpdateAcceleratorRequest {
  AcceleratorArn: string;
  Name?: string;
  IpAddressType?: IpAddressType;
  IpAddresses?: string[];
  Enabled?: boolean;
}
export const UpdateAcceleratorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceleratorArn: S.String,
    Name: S.optional(S.String),
    IpAddressType: S.optional(IpAddressType),
    IpAddresses: S.optional(IpAddresses),
    Enabled: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateAcceleratorRequest",
}) as any as S.Schema<UpdateAcceleratorRequest>;
export interface UpdateAcceleratorResponse {
  Accelerator?: Accelerator;
}
export const UpdateAcceleratorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Accelerator: S.optional(Accelerator) }),
).annotate({
  identifier: "UpdateAcceleratorResponse",
}) as any as S.Schema<UpdateAcceleratorResponse>;
export interface UpdateAcceleratorAttributesRequest {
  AcceleratorArn: string;
  FlowLogsEnabled?: boolean;
  FlowLogsS3Bucket?: string;
  FlowLogsS3Prefix?: string;
}
export const UpdateAcceleratorAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcceleratorArn: S.String,
    FlowLogsEnabled: S.optional(S.Boolean),
    FlowLogsS3Bucket: S.optional(S.String),
    FlowLogsS3Prefix: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateAcceleratorAttributesRequest",
}) as any as S.Schema<UpdateAcceleratorAttributesRequest>;
export interface UpdateAcceleratorAttributesResponse {
  AcceleratorAttributes?: AcceleratorAttributes;
}
export const UpdateAcceleratorAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AcceleratorAttributes: S.optional(AcceleratorAttributes) }),
).annotate({
  identifier: "UpdateAcceleratorAttributesResponse",
}) as any as S.Schema<UpdateAcceleratorAttributesResponse>;
export interface UpdateCrossAccountAttachmentRequest {
  AttachmentArn: string;
  Name?: string;
  AddPrincipals?: string[];
  RemovePrincipals?: string[];
  AddResources?: Resource[];
  RemoveResources?: Resource[];
}
export const UpdateCrossAccountAttachmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttachmentArn: S.String,
    Name: S.optional(S.String),
    AddPrincipals: S.optional(Principals),
    RemovePrincipals: S.optional(Principals),
    AddResources: S.optional(Resources),
    RemoveResources: S.optional(Resources),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateCrossAccountAttachmentRequest",
}) as any as S.Schema<UpdateCrossAccountAttachmentRequest>;
export interface UpdateCrossAccountAttachmentResponse {
  CrossAccountAttachment?: Attachment;
}
export const UpdateCrossAccountAttachmentResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ CrossAccountAttachment: S.optional(Attachment) }),
).annotate({
  identifier: "UpdateCrossAccountAttachmentResponse",
}) as any as S.Schema<UpdateCrossAccountAttachmentResponse>;
export interface UpdateCustomRoutingAcceleratorRequest {
  AcceleratorArn: string;
  Name?: string;
  IpAddressType?: IpAddressType;
  IpAddresses?: string[];
  Enabled?: boolean;
}
export const UpdateCustomRoutingAcceleratorRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AcceleratorArn: S.String,
      Name: S.optional(S.String),
      IpAddressType: S.optional(IpAddressType),
      IpAddresses: S.optional(IpAddresses),
      Enabled: S.optional(S.Boolean),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "UpdateCustomRoutingAcceleratorRequest",
}) as any as S.Schema<UpdateCustomRoutingAcceleratorRequest>;
export interface UpdateCustomRoutingAcceleratorResponse {
  Accelerator?: CustomRoutingAccelerator;
}
export const UpdateCustomRoutingAcceleratorResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Accelerator: S.optional(CustomRoutingAccelerator) }),
).annotate({
  identifier: "UpdateCustomRoutingAcceleratorResponse",
}) as any as S.Schema<UpdateCustomRoutingAcceleratorResponse>;
export interface UpdateCustomRoutingAcceleratorAttributesRequest {
  AcceleratorArn: string;
  FlowLogsEnabled?: boolean;
  FlowLogsS3Bucket?: string;
  FlowLogsS3Prefix?: string;
}
export const UpdateCustomRoutingAcceleratorAttributesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AcceleratorArn: S.String,
      FlowLogsEnabled: S.optional(S.Boolean),
      FlowLogsS3Bucket: S.optional(S.String),
      FlowLogsS3Prefix: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "UpdateCustomRoutingAcceleratorAttributesRequest",
  }) as any as S.Schema<UpdateCustomRoutingAcceleratorAttributesRequest>;
export interface UpdateCustomRoutingAcceleratorAttributesResponse {
  AcceleratorAttributes?: CustomRoutingAcceleratorAttributes;
}
export const UpdateCustomRoutingAcceleratorAttributesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AcceleratorAttributes: S.optional(CustomRoutingAcceleratorAttributes),
    }),
  ).annotate({
    identifier: "UpdateCustomRoutingAcceleratorAttributesResponse",
  }) as any as S.Schema<UpdateCustomRoutingAcceleratorAttributesResponse>;
export interface UpdateCustomRoutingListenerRequest {
  ListenerArn: string;
  PortRanges: PortRange[];
}
export const UpdateCustomRoutingListenerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ListenerArn: S.String, PortRanges: PortRanges }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateCustomRoutingListenerRequest",
}) as any as S.Schema<UpdateCustomRoutingListenerRequest>;
export interface UpdateCustomRoutingListenerResponse {
  Listener?: CustomRoutingListener;
}
export const UpdateCustomRoutingListenerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Listener: S.optional(CustomRoutingListener) }),
).annotate({
  identifier: "UpdateCustomRoutingListenerResponse",
}) as any as S.Schema<UpdateCustomRoutingListenerResponse>;
export interface UpdateEndpointGroupRequest {
  EndpointGroupArn: string;
  EndpointConfigurations?: EndpointConfiguration[];
  TrafficDialPercentage?: number;
  HealthCheckPort?: number;
  HealthCheckProtocol?: HealthCheckProtocol;
  HealthCheckPath?: string;
  HealthCheckIntervalSeconds?: number;
  ThresholdCount?: number;
  PortOverrides?: PortOverride[];
}
export const UpdateEndpointGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointGroupArn: S.String,
    EndpointConfigurations: S.optional(EndpointConfigurations),
    TrafficDialPercentage: S.optional(S.Number),
    HealthCheckPort: S.optional(S.Number),
    HealthCheckProtocol: S.optional(HealthCheckProtocol),
    HealthCheckPath: S.optional(S.String),
    HealthCheckIntervalSeconds: S.optional(S.Number),
    ThresholdCount: S.optional(S.Number),
    PortOverrides: S.optional(PortOverrides),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateEndpointGroupRequest",
}) as any as S.Schema<UpdateEndpointGroupRequest>;
export interface UpdateEndpointGroupResponse {
  EndpointGroup?: EndpointGroup;
}
export const UpdateEndpointGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EndpointGroup: S.optional(EndpointGroup) }),
).annotate({
  identifier: "UpdateEndpointGroupResponse",
}) as any as S.Schema<UpdateEndpointGroupResponse>;
export interface UpdateListenerRequest {
  ListenerArn: string;
  PortRanges?: PortRange[];
  Protocol?: Protocol;
  ClientAffinity?: ClientAffinity;
}
export const UpdateListenerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ListenerArn: S.String,
    PortRanges: S.optional(PortRanges),
    Protocol: S.optional(Protocol),
    ClientAffinity: S.optional(ClientAffinity),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateListenerRequest",
}) as any as S.Schema<UpdateListenerRequest>;
export interface UpdateListenerResponse {
  Listener?: Listener;
}
export const UpdateListenerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Listener: S.optional(Listener) }),
).annotate({
  identifier: "UpdateListenerResponse",
}) as any as S.Schema<UpdateListenerResponse>;
export interface WithdrawByoipCidrRequest {
  Cidr: string;
}
export const WithdrawByoipCidrRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cidr: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "WithdrawByoipCidrRequest",
}) as any as S.Schema<WithdrawByoipCidrRequest>;
export interface WithdrawByoipCidrResponse {
  ByoipCidr?: ByoipCidr;
}
export const WithdrawByoipCidrResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ByoipCidr: S.optional(ByoipCidr) }),
).annotate({
  identifier: "WithdrawByoipCidrResponse",
}) as any as S.Schema<WithdrawByoipCidrResponse>;
export type ErrorMessage = string;
export type AddCustomRoutingEndpointsError =
  | AccessDeniedException
  | ConflictException
  | EndpointAlreadyExistsException
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | LimitExceededException
  | CommonErrors;
/**
 * Associate a virtual private cloud (VPC) subnet endpoint with your custom routing accelerator.
 *
 * The listener port range must be large enough to support the number of IP addresses that can be
 * specified in your subnet. The number of ports required is: subnet size times the number
 * of ports per destination EC2 instances. For example, a subnet defined as /24 requires a listener
 * port range of at least 255 ports.
 *
 * Note: You must have enough remaining listener ports available to
 * map to the subnet ports, or the call will fail with a LimitExceededException.
 *
 * By default, all destinations in a subnet in a custom routing accelerator cannot receive traffic. To enable all
 * destinations to receive traffic, or to specify individual port mappings that can receive
 * traffic, see the
 * AllowCustomRoutingTraffic operation.
 */
export const addCustomRoutingEndpoints: API.OperationMethod<
  AddCustomRoutingEndpointsRequest,
  AddCustomRoutingEndpointsResponse,
  AddCustomRoutingEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddCustomRoutingEndpointsRequest,
  output: AddCustomRoutingEndpointsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    EndpointAlreadyExistsException,
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddCustomRoutingEndpoints",
}));

export type AddEndpointsError =
  | AccessDeniedException
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | LimitExceededException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Add endpoints to an endpoint group. The `AddEndpoints` API operation is the recommended option for adding endpoints. The
 * alternative options are to add endpoints when you create an endpoint group (with the
 * CreateEndpointGroup API)
 * or when you update an endpoint group (with the
 * UpdateEndpointGroup API).
 *
 * There are two advantages to using `AddEndpoints` to add endpoints in Global Accelerator:
 *
 * - It's faster, because Global Accelerator only has to resolve the new endpoints that
 * you're adding, rather than resolving new and existing endpoints.
 *
 * - It's more convenient, because you don't need to specify the current
 * endpoints that are already in the endpoint group, in addition to the new endpoints that
 * you want to add.
 *
 * For information about endpoint types and requirements for endpoints that you can add
 * to Global Accelerator, see
 * Endpoints for standard accelerators in the *Global Accelerator Developer Guide*.
 */
export const addEndpoints: API.OperationMethod<
  AddEndpointsRequest,
  AddEndpointsResponse,
  AddEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddEndpointsRequest,
  output: AddEndpointsResponse,
  errors: [
    AccessDeniedException,
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    LimitExceededException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddEndpoints",
}));

export type AdvertiseByoipCidrError =
  | AccessDeniedException
  | ByoipCidrNotFoundException
  | IncorrectCidrStateException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Advertises an IPv4 address range that is provisioned for use with your Amazon Web Services resources
 * through bring your own IP addresses (BYOIP). It can take a few minutes before traffic to
 * the specified addresses starts routing to Amazon Web Services because of propagation delays.
 *
 * To stop advertising the BYOIP address range, use
 * WithdrawByoipCidr.
 *
 * For more information, see Bring your own
 * IP addresses (BYOIP) in the *Global Accelerator Developer Guide*.
 */
export const advertiseByoipCidr: API.OperationMethod<
  AdvertiseByoipCidrRequest,
  AdvertiseByoipCidrResponse,
  AdvertiseByoipCidrError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AdvertiseByoipCidrRequest,
  output: AdvertiseByoipCidrResponse,
  errors: [
    AccessDeniedException,
    ByoipCidrNotFoundException,
    IncorrectCidrStateException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AdvertiseByoipCidr",
}));

export type AllowCustomRoutingTrafficError =
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Specify the Amazon EC2 instance (destination) IP addresses and ports for a VPC subnet endpoint that can receive traffic
 * for a custom routing accelerator. You can allow traffic to all destinations in the subnet endpoint, or allow traffic to a
 * specified list of destination IP addresses and ports in the subnet. Note that you cannot specify IP addresses or ports
 * outside of the range that you configured for the endpoint group.
 *
 * After you make changes, you can verify that the updates are complete by checking the status of your
 * accelerator: the status changes from IN_PROGRESS to DEPLOYED.
 */
export const allowCustomRoutingTraffic: API.OperationMethod<
  AllowCustomRoutingTrafficRequest,
  AllowCustomRoutingTrafficResponse,
  AllowCustomRoutingTrafficError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AllowCustomRoutingTrafficRequest,
  output: AllowCustomRoutingTrafficResponse,
  errors: [
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AllowCustomRoutingTraffic",
}));

export type CreateAcceleratorError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidArgumentException
  | LimitExceededException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Create an accelerator. An accelerator includes one or more listeners that process inbound connections and direct traffic
 * to one or more endpoint groups, each of which includes endpoints, such as Network Load Balancers.
 *
 * Global Accelerator is a global service that supports endpoints in multiple Amazon Web Services Regions but you must specify the
 * US West (Oregon) Region to create, update, or otherwise work with accelerators. That is, for example, specify `--region us-west-2`
 * on Amazon Web Services CLI commands.
 */
export const createAccelerator: API.OperationMethod<
  CreateAcceleratorRequest,
  CreateAcceleratorResponse,
  CreateAcceleratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAcceleratorRequest,
  output: CreateAcceleratorResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidArgumentException,
    LimitExceededException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccelerator",
}));

export type CreateCrossAccountAttachmentError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidArgumentException
  | LimitExceededException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Create a cross-account attachment in Global Accelerator. You create a cross-account attachment to
 * specify the *principals* who have permission to work with *resources*
 * in accelerators in their own account. You specify, in the same attachment, the resources that are shared.
 *
 * A principal can be an Amazon Web Services account number or the Amazon Resource Name (ARN) for an
 * accelerator. For account numbers that are listed as principals, to work with a resource listed in the attachment,
 * you must sign in to an account specified as a principal. Then, you can work with resources that are listed,
 * with any of your accelerators. If an accelerator ARN is listed in the cross-account attachment as a principal,
 * anyone with permission to make updates to the accelerator can work with resources that are listed in the
 * attachment.
 *
 * Specify each principal and resource separately. To specify two CIDR address pools, list
 * them individually under `Resources`, and so on. For a command line operation, for example,
 * you might use a statement like the following:
 *
 * ` "Resources": [{"Cidr": "169.254.60.0/24"},{"Cidr": "169.254.59.0/24"}]`
 *
 * For more information, see
 * Working with cross-account attachments and resources in Global Accelerator in the
 * Global Accelerator Developer Guide.
 */
export const createCrossAccountAttachment: API.OperationMethod<
  CreateCrossAccountAttachmentRequest,
  CreateCrossAccountAttachmentResponse,
  CreateCrossAccountAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCrossAccountAttachmentRequest,
  output: CreateCrossAccountAttachmentResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidArgumentException,
    LimitExceededException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCrossAccountAttachment",
}));

export type CreateCustomRoutingAcceleratorError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidArgumentException
  | LimitExceededException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Create a custom routing accelerator. A custom routing accelerator directs traffic to one of possibly thousands
 * of Amazon EC2 instance destinations running in a single or multiple virtual private clouds (VPC) subnet endpoints.
 *
 * Be aware that, by default, all destination EC2 instances in a VPC subnet endpoint cannot receive
 * traffic. To enable all destinations to receive traffic, or to specify individual port
 * mappings that can receive traffic, see the
 * AllowCustomRoutingTraffic operation.
 *
 * Global Accelerator is a global service that supports endpoints in multiple Amazon Web Services Regions but you must specify the
 * US West (Oregon) Region to create, update, or otherwise work with accelerators. That is, for example, specify `--region us-west-2`
 * on Amazon Web Services CLI commands.
 */
export const createCustomRoutingAccelerator: API.OperationMethod<
  CreateCustomRoutingAcceleratorRequest,
  CreateCustomRoutingAcceleratorResponse,
  CreateCustomRoutingAcceleratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCustomRoutingAcceleratorRequest,
  output: CreateCustomRoutingAcceleratorResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidArgumentException,
    LimitExceededException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomRoutingAccelerator",
}));

export type CreateCustomRoutingEndpointGroupError =
  | AcceleratorNotFoundException
  | AccessDeniedException
  | EndpointGroupAlreadyExistsException
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidPortRangeException
  | LimitExceededException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * Create an endpoint group for the specified listener for a custom routing accelerator.
 * An endpoint group is a collection of endpoints in one Amazon Web Services
 * Region.
 */
export const createCustomRoutingEndpointGroup: API.OperationMethod<
  CreateCustomRoutingEndpointGroupRequest,
  CreateCustomRoutingEndpointGroupResponse,
  CreateCustomRoutingEndpointGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCustomRoutingEndpointGroupRequest,
  output: CreateCustomRoutingEndpointGroupResponse,
  errors: [
    AcceleratorNotFoundException,
    AccessDeniedException,
    EndpointGroupAlreadyExistsException,
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidPortRangeException,
    LimitExceededException,
    ListenerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomRoutingEndpointGroup",
}));

export type CreateCustomRoutingListenerError =
  | AcceleratorNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidPortRangeException
  | LimitExceededException
  | CommonErrors;
/**
 * Create a listener to process inbound connections from clients to a custom routing accelerator.
 * Connections arrive to assigned static IP addresses on the port range that you specify.
 */
export const createCustomRoutingListener: API.OperationMethod<
  CreateCustomRoutingListenerRequest,
  CreateCustomRoutingListenerResponse,
  CreateCustomRoutingListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCustomRoutingListenerRequest,
  output: CreateCustomRoutingListenerResponse,
  errors: [
    AcceleratorNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidPortRangeException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomRoutingListener",
}));

export type CreateEndpointGroupError =
  | AcceleratorNotFoundException
  | AccessDeniedException
  | EndpointGroupAlreadyExistsException
  | InternalServiceErrorException
  | InvalidArgumentException
  | LimitExceededException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * Create an endpoint group for the specified listener. An endpoint group is a collection of endpoints in one Amazon Web Services
 * Region. A resource must be valid and active when you add it as an endpoint.
 *
 * For more information about endpoint types and requirements for endpoints that you can add
 * to Global Accelerator, see
 * Endpoints for standard accelerators in the *Global Accelerator Developer Guide*.
 */
export const createEndpointGroup: API.OperationMethod<
  CreateEndpointGroupRequest,
  CreateEndpointGroupResponse,
  CreateEndpointGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEndpointGroupRequest,
  output: CreateEndpointGroupResponse,
  errors: [
    AcceleratorNotFoundException,
    AccessDeniedException,
    EndpointGroupAlreadyExistsException,
    InternalServiceErrorException,
    InvalidArgumentException,
    LimitExceededException,
    ListenerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEndpointGroup",
}));

export type CreateListenerError =
  | AcceleratorNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidPortRangeException
  | LimitExceededException
  | CommonErrors;
/**
 * Create a listener to process inbound connections from clients to an accelerator. Connections arrive to assigned static
 * IP addresses on a port, port range, or list of port ranges that you specify.
 */
export const createListener: API.OperationMethod<
  CreateListenerRequest,
  CreateListenerResponse,
  CreateListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateListenerRequest,
  output: CreateListenerResponse,
  errors: [
    AcceleratorNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidPortRangeException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateListener",
}));

export type DeleteAcceleratorError =
  | AcceleratorNotDisabledException
  | AcceleratorNotFoundException
  | AssociatedListenerFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Delete an accelerator. Before you can delete an accelerator, you must disable it and remove all dependent resources
 * (listeners and endpoint groups). To disable the accelerator, update the accelerator to set `Enabled` to false.
 *
 * When you create an accelerator, by default, Global Accelerator provides you with a set of two static IP addresses.
 * Alternatively, you can bring your own IP address ranges to Global Accelerator and assign IP addresses from those ranges.
 *
 * The IP addresses are assigned to your accelerator for as long as it exists, even if you disable the accelerator and
 * it no longer accepts or routes traffic. However, when you *delete* an accelerator, you lose the
 * static IP addresses that are assigned to the accelerator, so you can no longer route traffic by using them.
 * As a best practice, ensure that you have permissions in place to avoid inadvertently deleting accelerators. You
 * can use IAM policies with Global Accelerator to limit the users who have permissions to delete an accelerator. For more information,
 * see Identity and access management in
 * the *Global Accelerator Developer Guide*.
 */
export const deleteAccelerator: API.OperationMethod<
  DeleteAcceleratorRequest,
  DeleteAcceleratorResponse,
  DeleteAcceleratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAcceleratorRequest,
  output: DeleteAcceleratorResponse,
  errors: [
    AcceleratorNotDisabledException,
    AcceleratorNotFoundException,
    AssociatedListenerFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccelerator",
}));

export type DeleteCrossAccountAttachmentError =
  | AccessDeniedException
  | AttachmentNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Delete a cross-account attachment. When you delete an attachment, Global Accelerator revokes the permission
 * to use the resources in the attachment from all principals in the list of principals. Global Accelerator
 * revokes the permission for specific resources.
 *
 * For more information, see
 * Working with cross-account attachments and resources in Global Accelerator in the
 * Global Accelerator Developer Guide.
 */
export const deleteCrossAccountAttachment: API.OperationMethod<
  DeleteCrossAccountAttachmentRequest,
  DeleteCrossAccountAttachmentResponse,
  DeleteCrossAccountAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCrossAccountAttachmentRequest,
  output: DeleteCrossAccountAttachmentResponse,
  errors: [
    AccessDeniedException,
    AttachmentNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCrossAccountAttachment",
}));

export type DeleteCustomRoutingAcceleratorError =
  | AcceleratorNotDisabledException
  | AcceleratorNotFoundException
  | AssociatedListenerFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Delete a custom routing accelerator. Before you can delete an accelerator, you must disable it and remove all dependent resources
 * (listeners and endpoint groups). To disable the accelerator, update the accelerator to set `Enabled` to false.
 *
 * When you create a custom routing accelerator, by default, Global Accelerator provides you with a set of two static IP addresses.
 *
 * The IP
 * addresses are assigned to your accelerator for as long as it exists, even if you disable the accelerator and
 * it no longer accepts or routes traffic. However, when you *delete* an accelerator, you lose the
 * static IP addresses that are assigned to the accelerator, so you can no longer route traffic by using them.
 * As a best practice, ensure that you have permissions in place to avoid inadvertently deleting accelerators. You
 * can use IAM policies with Global Accelerator to limit the users who have permissions to delete an accelerator. For more information,
 * see Identity and access management in
 * the *Global Accelerator Developer Guide*.
 */
export const deleteCustomRoutingAccelerator: API.OperationMethod<
  DeleteCustomRoutingAcceleratorRequest,
  DeleteCustomRoutingAcceleratorResponse,
  DeleteCustomRoutingAcceleratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCustomRoutingAcceleratorRequest,
  output: DeleteCustomRoutingAcceleratorResponse,
  errors: [
    AcceleratorNotDisabledException,
    AcceleratorNotFoundException,
    AssociatedListenerFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomRoutingAccelerator",
}));

export type DeleteCustomRoutingEndpointGroupError =
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Delete an endpoint group from a listener for a custom routing accelerator.
 */
export const deleteCustomRoutingEndpointGroup: API.OperationMethod<
  DeleteCustomRoutingEndpointGroupRequest,
  DeleteCustomRoutingEndpointGroupResponse,
  DeleteCustomRoutingEndpointGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCustomRoutingEndpointGroupRequest,
  output: DeleteCustomRoutingEndpointGroupResponse,
  errors: [
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomRoutingEndpointGroup",
}));

export type DeleteCustomRoutingListenerError =
  | AssociatedEndpointGroupFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * Delete a listener for a custom routing accelerator.
 */
export const deleteCustomRoutingListener: API.OperationMethod<
  DeleteCustomRoutingListenerRequest,
  DeleteCustomRoutingListenerResponse,
  DeleteCustomRoutingListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCustomRoutingListenerRequest,
  output: DeleteCustomRoutingListenerResponse,
  errors: [
    AssociatedEndpointGroupFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    ListenerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomRoutingListener",
}));

export type DeleteEndpointGroupError =
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Delete an endpoint group from a listener.
 */
export const deleteEndpointGroup: API.OperationMethod<
  DeleteEndpointGroupRequest,
  DeleteEndpointGroupResponse,
  DeleteEndpointGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEndpointGroupRequest,
  output: DeleteEndpointGroupResponse,
  errors: [
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEndpointGroup",
}));

export type DeleteListenerError =
  | AssociatedEndpointGroupFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * Delete a listener from an accelerator.
 */
export const deleteListener: API.OperationMethod<
  DeleteListenerRequest,
  DeleteListenerResponse,
  DeleteListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteListenerRequest,
  output: DeleteListenerResponse,
  errors: [
    AssociatedEndpointGroupFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    ListenerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteListener",
}));

export type DenyCustomRoutingTrafficError =
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Specify the Amazon EC2 instance (destination) IP addresses and ports for a VPC subnet endpoint that cannot receive traffic
 * for a custom routing accelerator. You can deny traffic to all destinations in the VPC endpoint, or deny traffic to a
 * specified list of destination IP addresses and ports. Note that you cannot specify IP addresses
 * or ports outside of the range that you configured for the endpoint group.
 *
 * After you make changes, you can verify that the updates are complete by checking the status of your
 * accelerator: the status changes from IN_PROGRESS to DEPLOYED.
 */
export const denyCustomRoutingTraffic: API.OperationMethod<
  DenyCustomRoutingTrafficRequest,
  DenyCustomRoutingTrafficResponse,
  DenyCustomRoutingTrafficError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DenyCustomRoutingTrafficRequest,
  output: DenyCustomRoutingTrafficResponse,
  errors: [
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DenyCustomRoutingTraffic",
}));

export type DeprovisionByoipCidrError =
  | AccessDeniedException
  | ByoipCidrNotFoundException
  | IncorrectCidrStateException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Releases the specified address range that you provisioned to use with your Amazon Web Services resources
 * through bring your own IP addresses (BYOIP) and deletes the corresponding address pool.
 *
 * Before you can release an address range, you must stop advertising it by using WithdrawByoipCidr and you must not have
 * any accelerators that are using static IP addresses allocated from its address range.
 *
 * For more information, see Bring
 * your own IP addresses (BYOIP) in the *Global Accelerator Developer Guide*.
 */
export const deprovisionByoipCidr: API.OperationMethod<
  DeprovisionByoipCidrRequest,
  DeprovisionByoipCidrResponse,
  DeprovisionByoipCidrError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeprovisionByoipCidrRequest,
  output: DeprovisionByoipCidrResponse,
  errors: [
    AccessDeniedException,
    ByoipCidrNotFoundException,
    IncorrectCidrStateException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeprovisionByoipCidr",
}));

export type DescribeAcceleratorError =
  | AcceleratorNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Describe an accelerator.
 */
export const describeAccelerator: API.OperationMethod<
  DescribeAcceleratorRequest,
  DescribeAcceleratorResponse,
  DescribeAcceleratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAcceleratorRequest,
  output: DescribeAcceleratorResponse,
  errors: [
    AcceleratorNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccelerator",
}));

export type DescribeAcceleratorAttributesError =
  | AcceleratorNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Describe the attributes of an accelerator.
 */
export const describeAcceleratorAttributes: API.OperationMethod<
  DescribeAcceleratorAttributesRequest,
  DescribeAcceleratorAttributesResponse,
  DescribeAcceleratorAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAcceleratorAttributesRequest,
  output: DescribeAcceleratorAttributesResponse,
  errors: [
    AcceleratorNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAcceleratorAttributes",
}));

export type DescribeCrossAccountAttachmentError =
  | AccessDeniedException
  | AttachmentNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Gets configuration information about a cross-account attachment.
 */
export const describeCrossAccountAttachment: API.OperationMethod<
  DescribeCrossAccountAttachmentRequest,
  DescribeCrossAccountAttachmentResponse,
  DescribeCrossAccountAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCrossAccountAttachmentRequest,
  output: DescribeCrossAccountAttachmentResponse,
  errors: [
    AccessDeniedException,
    AttachmentNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCrossAccountAttachment",
}));

export type DescribeCustomRoutingAcceleratorError =
  | AcceleratorNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Describe a custom routing accelerator.
 */
export const describeCustomRoutingAccelerator: API.OperationMethod<
  DescribeCustomRoutingAcceleratorRequest,
  DescribeCustomRoutingAcceleratorResponse,
  DescribeCustomRoutingAcceleratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCustomRoutingAcceleratorRequest,
  output: DescribeCustomRoutingAcceleratorResponse,
  errors: [
    AcceleratorNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomRoutingAccelerator",
}));

export type DescribeCustomRoutingAcceleratorAttributesError =
  | AcceleratorNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Describe the attributes of a custom routing accelerator.
 */
export const describeCustomRoutingAcceleratorAttributes: API.OperationMethod<
  DescribeCustomRoutingAcceleratorAttributesRequest,
  DescribeCustomRoutingAcceleratorAttributesResponse,
  DescribeCustomRoutingAcceleratorAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCustomRoutingAcceleratorAttributesRequest,
  output: DescribeCustomRoutingAcceleratorAttributesResponse,
  errors: [
    AcceleratorNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomRoutingAcceleratorAttributes",
}));

export type DescribeCustomRoutingEndpointGroupError =
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Describe an endpoint group for a custom routing accelerator.
 */
export const describeCustomRoutingEndpointGroup: API.OperationMethod<
  DescribeCustomRoutingEndpointGroupRequest,
  DescribeCustomRoutingEndpointGroupResponse,
  DescribeCustomRoutingEndpointGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCustomRoutingEndpointGroupRequest,
  output: DescribeCustomRoutingEndpointGroupResponse,
  errors: [
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomRoutingEndpointGroup",
}));

export type DescribeCustomRoutingListenerError =
  | InternalServiceErrorException
  | InvalidArgumentException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * The description of a listener for a custom routing accelerator.
 */
export const describeCustomRoutingListener: API.OperationMethod<
  DescribeCustomRoutingListenerRequest,
  DescribeCustomRoutingListenerResponse,
  DescribeCustomRoutingListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCustomRoutingListenerRequest,
  output: DescribeCustomRoutingListenerResponse,
  errors: [
    InternalServiceErrorException,
    InvalidArgumentException,
    ListenerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomRoutingListener",
}));

export type DescribeEndpointGroupError =
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Describe an endpoint group.
 */
export const describeEndpointGroup: API.OperationMethod<
  DescribeEndpointGroupRequest,
  DescribeEndpointGroupResponse,
  DescribeEndpointGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEndpointGroupRequest,
  output: DescribeEndpointGroupResponse,
  errors: [
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpointGroup",
}));

export type DescribeListenerError =
  | InternalServiceErrorException
  | InvalidArgumentException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * Describe a listener.
 */
export const describeListener: API.OperationMethod<
  DescribeListenerRequest,
  DescribeListenerResponse,
  DescribeListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeListenerRequest,
  output: DescribeListenerResponse,
  errors: [
    InternalServiceErrorException,
    InvalidArgumentException,
    ListenerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeListener",
}));

export type ListAcceleratorsError =
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * List the accelerators for an Amazon Web Services account.
 */
export const listAccelerators: API.PaginatedOperationMethod<
  ListAcceleratorsRequest,
  ListAcceleratorsResponse,
  ListAcceleratorsError,
  Credentials | HttpClient.HttpClient,
  Accelerator
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAcceleratorsRequest,
  output: ListAcceleratorsResponse,
  errors: [
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidNextTokenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccelerators",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Accelerators",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListByoipCidrsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Lists the IP address ranges that were specified in calls to ProvisionByoipCidr, including
 * the current state and a history of state changes.
 */
export const listByoipCidrs: API.PaginatedOperationMethod<
  ListByoipCidrsRequest,
  ListByoipCidrsResponse,
  ListByoipCidrsError,
  Credentials | HttpClient.HttpClient,
  ByoipCidr
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListByoipCidrsRequest,
  output: ListByoipCidrsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidNextTokenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListByoipCidrs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ByoipCidrs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCrossAccountAttachmentsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * List the cross-account attachments that have been created in Global Accelerator.
 */
export const listCrossAccountAttachments: API.PaginatedOperationMethod<
  ListCrossAccountAttachmentsRequest,
  ListCrossAccountAttachmentsResponse,
  ListCrossAccountAttachmentsError,
  Credentials | HttpClient.HttpClient,
  Attachment
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCrossAccountAttachmentsRequest,
  output: ListCrossAccountAttachmentsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidNextTokenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCrossAccountAttachments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CrossAccountAttachments",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCrossAccountResourceAccountsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | CommonErrors;
/**
 * List the accounts that have cross-account resources.
 *
 * For more information, see
 * Working with cross-account attachments and resources in Global Accelerator in the
 * Global Accelerator Developer Guide.
 */
export const listCrossAccountResourceAccounts: API.OperationMethod<
  ListCrossAccountResourceAccountsRequest,
  ListCrossAccountResourceAccountsResponse,
  ListCrossAccountResourceAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListCrossAccountResourceAccountsRequest,
  output: ListCrossAccountResourceAccountsResponse,
  errors: [AccessDeniedException, InternalServiceErrorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCrossAccountResourceAccounts",
}));

export type ListCrossAccountResourcesError =
  | AcceleratorNotFoundException
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * List the cross-account resources available to work with.
 */
export const listCrossAccountResources: API.PaginatedOperationMethod<
  ListCrossAccountResourcesRequest,
  ListCrossAccountResourcesResponse,
  ListCrossAccountResourcesError,
  Credentials | HttpClient.HttpClient,
  CrossAccountResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCrossAccountResourcesRequest,
  output: ListCrossAccountResourcesResponse,
  errors: [
    AcceleratorNotFoundException,
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidNextTokenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCrossAccountResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CrossAccountResources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCustomRoutingAcceleratorsError =
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * List the custom routing accelerators for an Amazon Web Services account.
 */
export const listCustomRoutingAccelerators: API.PaginatedOperationMethod<
  ListCustomRoutingAcceleratorsRequest,
  ListCustomRoutingAcceleratorsResponse,
  ListCustomRoutingAcceleratorsError,
  Credentials | HttpClient.HttpClient,
  CustomRoutingAccelerator
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCustomRoutingAcceleratorsRequest,
  output: ListCustomRoutingAcceleratorsResponse,
  errors: [
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidNextTokenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomRoutingAccelerators",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Accelerators",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCustomRoutingEndpointGroupsError =
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidNextTokenException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * List the endpoint groups that are associated with a listener for a custom routing accelerator.
 */
export const listCustomRoutingEndpointGroups: API.PaginatedOperationMethod<
  ListCustomRoutingEndpointGroupsRequest,
  ListCustomRoutingEndpointGroupsResponse,
  ListCustomRoutingEndpointGroupsError,
  Credentials | HttpClient.HttpClient,
  CustomRoutingEndpointGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCustomRoutingEndpointGroupsRequest,
  output: ListCustomRoutingEndpointGroupsResponse,
  errors: [
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidNextTokenException,
    ListenerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomRoutingEndpointGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EndpointGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCustomRoutingListenersError =
  | AcceleratorNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * List the listeners for a custom routing accelerator.
 */
export const listCustomRoutingListeners: API.PaginatedOperationMethod<
  ListCustomRoutingListenersRequest,
  ListCustomRoutingListenersResponse,
  ListCustomRoutingListenersError,
  Credentials | HttpClient.HttpClient,
  CustomRoutingListener
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCustomRoutingListenersRequest,
  output: ListCustomRoutingListenersResponse,
  errors: [
    AcceleratorNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidNextTokenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomRoutingListeners",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Listeners",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCustomRoutingPortMappingsError =
  | AcceleratorNotFoundException
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Provides a complete mapping from the public accelerator IP address and port to destination EC2 instance
 * IP addresses and ports in the virtual public cloud (VPC) subnet endpoint for a custom routing accelerator.
 * For each subnet endpoint that you add, Global Accelerator creates a new static port mapping for the accelerator. The port
 * mappings don't change after Global Accelerator generates them, so you can retrieve and cache the full mapping on your servers.
 *
 * If you remove a subnet from your accelerator, Global Accelerator removes (reclaims) the port mappings. If you add a subnet to
 * your accelerator, Global Accelerator creates new port mappings (the existing ones don't change). If you add or remove EC2 instances
 * in your subnet, the port mappings don't change, because the mappings are created when you add the subnet to Global Accelerator.
 *
 * The mappings also include a flag for each destination denoting which destination IP addresses and
 * ports are allowed or denied traffic.
 */
export const listCustomRoutingPortMappings: API.PaginatedOperationMethod<
  ListCustomRoutingPortMappingsRequest,
  ListCustomRoutingPortMappingsResponse,
  ListCustomRoutingPortMappingsError,
  Credentials | HttpClient.HttpClient,
  PortMapping
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCustomRoutingPortMappingsRequest,
  output: ListCustomRoutingPortMappingsResponse,
  errors: [
    AcceleratorNotFoundException,
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidNextTokenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomRoutingPortMappings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PortMappings",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCustomRoutingPortMappingsByDestinationError =
  | EndpointNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * List the port mappings for a specific EC2 instance (destination) in a VPC subnet endpoint. The
 * response is the mappings for one destination IP address. This is useful when your subnet endpoint has mappings that
 * span multiple custom routing accelerators in your account, or for scenarios where you only want to
 * list the port mappings for a specific destination instance.
 */
export const listCustomRoutingPortMappingsByDestination: API.PaginatedOperationMethod<
  ListCustomRoutingPortMappingsByDestinationRequest,
  ListCustomRoutingPortMappingsByDestinationResponse,
  ListCustomRoutingPortMappingsByDestinationError,
  Credentials | HttpClient.HttpClient,
  DestinationPortMapping
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCustomRoutingPortMappingsByDestinationRequest,
  output: ListCustomRoutingPortMappingsByDestinationResponse,
  errors: [
    EndpointNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidNextTokenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomRoutingPortMappingsByDestination",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DestinationPortMappings",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEndpointGroupsError =
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidNextTokenException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * List the endpoint groups that are associated with a listener.
 */
export const listEndpointGroups: API.PaginatedOperationMethod<
  ListEndpointGroupsRequest,
  ListEndpointGroupsResponse,
  ListEndpointGroupsError,
  Credentials | HttpClient.HttpClient,
  EndpointGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEndpointGroupsRequest,
  output: ListEndpointGroupsResponse,
  errors: [
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidNextTokenException,
    ListenerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEndpointGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EndpointGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListListenersError =
  | AcceleratorNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * List the listeners for an accelerator.
 */
export const listListeners: API.PaginatedOperationMethod<
  ListListenersRequest,
  ListListenersResponse,
  ListListenersError,
  Credentials | HttpClient.HttpClient,
  Listener
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListListenersRequest,
  output: ListListenersResponse,
  errors: [
    AcceleratorNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidNextTokenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListListeners",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Listeners",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AcceleratorNotFoundException
  | AttachmentNotFoundException
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * List all tags for an accelerator.
 *
 * For more information, see Tagging
 * in Global Accelerator in the *Global Accelerator Developer Guide*.
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
    AcceleratorNotFoundException,
    AttachmentNotFoundException,
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    ListenerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ProvisionByoipCidrError =
  | AccessDeniedException
  | IncorrectCidrStateException
  | InternalServiceErrorException
  | InvalidArgumentException
  | LimitExceededException
  | CommonErrors;
/**
 * Provisions an IP address range to use with your Amazon Web Services resources through bring your own IP
 * addresses (BYOIP) and creates a corresponding address pool. After the address range is provisioned,
 * it is ready to be advertised using
 * AdvertiseByoipCidr.
 *
 * For more information, see Bring your own
 * IP addresses (BYOIP) in the *Global Accelerator Developer Guide*.
 */
export const provisionByoipCidr: API.OperationMethod<
  ProvisionByoipCidrRequest,
  ProvisionByoipCidrResponse,
  ProvisionByoipCidrError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ProvisionByoipCidrRequest,
  output: ProvisionByoipCidrResponse,
  errors: [
    AccessDeniedException,
    IncorrectCidrStateException,
    InternalServiceErrorException,
    InvalidArgumentException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ProvisionByoipCidr",
}));

export type RemoveCustomRoutingEndpointsError =
  | AccessDeniedException
  | ConflictException
  | EndpointGroupNotFoundException
  | EndpointNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Remove endpoints from a custom routing accelerator.
 */
export const removeCustomRoutingEndpoints: API.OperationMethod<
  RemoveCustomRoutingEndpointsRequest,
  RemoveCustomRoutingEndpointsResponse,
  RemoveCustomRoutingEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveCustomRoutingEndpointsRequest,
  output: RemoveCustomRoutingEndpointsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    EndpointGroupNotFoundException,
    EndpointNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveCustomRoutingEndpoints",
}));

export type RemoveEndpointsError =
  | AccessDeniedException
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Remove endpoints from an endpoint group.
 *
 * The `RemoveEndpoints` API operation is the recommended option for removing endpoints. The alternative is to remove
 * endpoints by updating an endpoint group by using the
 * UpdateEndpointGroup
 * API operation. There are two advantages to using `AddEndpoints` to remove endpoints instead:
 *
 * - It's more convenient, because you only need to specify the endpoints that you want to remove. With the
 * `UpdateEndpointGroup` API operation, you must specify all of the endpoints in the
 * endpoint group except the ones that you want to remove from the group.
 *
 * - It's faster, because Global Accelerator doesn't need to resolve any endpoints. With the
 * `UpdateEndpointGroup` API operation, Global Accelerator must resolve all of the endpoints that
 * remain in the group.
 */
export const removeEndpoints: API.OperationMethod<
  RemoveEndpointsRequest,
  RemoveEndpointsResponse,
  RemoveEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveEndpointsRequest,
  output: RemoveEndpointsResponse,
  errors: [
    AccessDeniedException,
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveEndpoints",
}));

export type TagResourceError =
  | AcceleratorNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Add tags to an accelerator resource.
 *
 * For more information, see Tagging
 * in Global Accelerator in the *Global Accelerator Developer Guide*.
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
    AcceleratorNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AcceleratorNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Remove tags from a Global Accelerator resource. When you specify a tag key, the action removes both that key and its associated value.
 * The operation succeeds even if you attempt to remove tags from an accelerator that was already removed.
 *
 * For more information, see Tagging
 * in Global Accelerator in the *Global Accelerator Developer Guide*.
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
    AcceleratorNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAcceleratorError =
  | AcceleratorNotFoundException
  | AccessDeniedException
  | ConflictException
  | InternalServiceErrorException
  | InvalidArgumentException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Update an accelerator to make changes, such as the following:
 *
 * - Change the name of the accelerator.
 *
 * - Disable the accelerator so that it no longer accepts or routes traffic, or so that you can delete it.
 *
 * - Enable the accelerator, if it is disabled.
 *
 * - Change the IP address type to dual-stack if it is IPv4, or change the IP address type to IPv4 if it's dual-stack.
 *
 * Be aware that static IP addresses remain assigned to your accelerator for as long as it exists, even if you disable the accelerator and it no
 * longer accepts or routes traffic. However, when you delete the accelerator, you lose the static IP addresses that are assigned to it, so you
 * can no longer route traffic by using them.
 *
 * Global Accelerator is a global service that supports endpoints in multiple Amazon Web Services Regions but you must specify the
 * US West (Oregon) Region to create, update, or otherwise work with accelerators. That is, for example, specify `--region us-west-2`
 * on Amazon Web Services CLI commands.
 */
export const updateAccelerator: API.OperationMethod<
  UpdateAcceleratorRequest,
  UpdateAcceleratorResponse,
  UpdateAcceleratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAcceleratorRequest,
  output: UpdateAcceleratorResponse,
  errors: [
    AcceleratorNotFoundException,
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    InvalidArgumentException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccelerator",
}));

export type UpdateAcceleratorAttributesError =
  | AcceleratorNotFoundException
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidArgumentException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Update the attributes for an accelerator.
 */
export const updateAcceleratorAttributes: API.OperationMethod<
  UpdateAcceleratorAttributesRequest,
  UpdateAcceleratorAttributesResponse,
  UpdateAcceleratorAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAcceleratorAttributesRequest,
  output: UpdateAcceleratorAttributesResponse,
  errors: [
    AcceleratorNotFoundException,
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidArgumentException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAcceleratorAttributes",
}));

export type UpdateCrossAccountAttachmentError =
  | AccessDeniedException
  | AttachmentNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | LimitExceededException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Update a cross-account attachment to add or remove principals or resources. When you update
 * an attachment to remove a principal (account ID or accelerator) or a resource, Global Accelerator
 * revokes the permission for specific resources.
 *
 * For more information, see
 * Working with cross-account attachments and resources in Global Accelerator in the
 * Global Accelerator Developer Guide.
 */
export const updateCrossAccountAttachment: API.OperationMethod<
  UpdateCrossAccountAttachmentRequest,
  UpdateCrossAccountAttachmentResponse,
  UpdateCrossAccountAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCrossAccountAttachmentRequest,
  output: UpdateCrossAccountAttachmentResponse,
  errors: [
    AccessDeniedException,
    AttachmentNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    LimitExceededException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCrossAccountAttachment",
}));

export type UpdateCustomRoutingAcceleratorError =
  | AcceleratorNotFoundException
  | ConflictException
  | InternalServiceErrorException
  | InvalidArgumentException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Update a custom routing accelerator.
 */
export const updateCustomRoutingAccelerator: API.OperationMethod<
  UpdateCustomRoutingAcceleratorRequest,
  UpdateCustomRoutingAcceleratorResponse,
  UpdateCustomRoutingAcceleratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCustomRoutingAcceleratorRequest,
  output: UpdateCustomRoutingAcceleratorResponse,
  errors: [
    AcceleratorNotFoundException,
    ConflictException,
    InternalServiceErrorException,
    InvalidArgumentException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomRoutingAccelerator",
}));

export type UpdateCustomRoutingAcceleratorAttributesError =
  | AcceleratorNotFoundException
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidArgumentException
  | TransactionInProgressException
  | CommonErrors;
/**
 * Update the attributes for a custom routing accelerator.
 */
export const updateCustomRoutingAcceleratorAttributes: API.OperationMethod<
  UpdateCustomRoutingAcceleratorAttributesRequest,
  UpdateCustomRoutingAcceleratorAttributesResponse,
  UpdateCustomRoutingAcceleratorAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCustomRoutingAcceleratorAttributesRequest,
  output: UpdateCustomRoutingAcceleratorAttributesResponse,
  errors: [
    AcceleratorNotFoundException,
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidArgumentException,
    TransactionInProgressException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomRoutingAcceleratorAttributes",
}));

export type UpdateCustomRoutingListenerError =
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidPortRangeException
  | LimitExceededException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * Update a listener for a custom routing accelerator.
 */
export const updateCustomRoutingListener: API.OperationMethod<
  UpdateCustomRoutingListenerRequest,
  UpdateCustomRoutingListenerResponse,
  UpdateCustomRoutingListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCustomRoutingListenerRequest,
  output: UpdateCustomRoutingListenerResponse,
  errors: [
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidPortRangeException,
    LimitExceededException,
    ListenerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomRoutingListener",
}));

export type UpdateEndpointGroupError =
  | AccessDeniedException
  | EndpointGroupNotFoundException
  | InternalServiceErrorException
  | InvalidArgumentException
  | LimitExceededException
  | CommonErrors;
/**
 * Update an endpoint group. A resource must be valid and active when you add it as an endpoint.
 */
export const updateEndpointGroup: API.OperationMethod<
  UpdateEndpointGroupRequest,
  UpdateEndpointGroupResponse,
  UpdateEndpointGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEndpointGroupRequest,
  output: UpdateEndpointGroupResponse,
  errors: [
    AccessDeniedException,
    EndpointGroupNotFoundException,
    InternalServiceErrorException,
    InvalidArgumentException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEndpointGroup",
}));

export type UpdateListenerError =
  | InternalServiceErrorException
  | InvalidArgumentException
  | InvalidPortRangeException
  | LimitExceededException
  | ListenerNotFoundException
  | CommonErrors;
/**
 * Update a listener.
 */
export const updateListener: API.OperationMethod<
  UpdateListenerRequest,
  UpdateListenerResponse,
  UpdateListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateListenerRequest,
  output: UpdateListenerResponse,
  errors: [
    InternalServiceErrorException,
    InvalidArgumentException,
    InvalidPortRangeException,
    LimitExceededException,
    ListenerNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateListener",
}));

export type WithdrawByoipCidrError =
  | AccessDeniedException
  | ByoipCidrNotFoundException
  | IncorrectCidrStateException
  | InternalServiceErrorException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Stops advertising an address range that is provisioned as an address pool.
 * You can perform this operation at most once every 10 seconds, even if you specify different address
 * ranges each time.
 *
 * It can take a few minutes before traffic to the specified addresses stops routing to Amazon Web Services because of
 * propagation delays.
 *
 * For more information, see Bring your own
 * IP addresses (BYOIP) in the *Global Accelerator Developer Guide*.
 */
export const withdrawByoipCidr: API.OperationMethod<
  WithdrawByoipCidrRequest,
  WithdrawByoipCidrResponse,
  WithdrawByoipCidrError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: WithdrawByoipCidrRequest,
  output: WithdrawByoipCidrResponse,
  errors: [
    AccessDeniedException,
    ByoipCidrNotFoundException,
    IncorrectCidrStateException,
    InternalServiceErrorException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "WithdrawByoipCidr",
}));
