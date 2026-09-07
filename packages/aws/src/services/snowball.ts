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
  sdkId: "Snowball",
  serviceShapeName: "AWSIESnowballJobManagementService",
});
const auth = T.AwsAuthSigv4({ name: "snowball" });
const ver = T.ServiceVersion("2016-06-30");
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
              `https://snowball-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://snowball-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://snowball.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://snowball.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ClusterLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ClusterLimitExceededException>()(
    "ClusterLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      ConflictResource: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
  ) {}
export class Ec2RequestFailedException
  extends /*@__PURE__*/ S.TaggedError<Ec2RequestFailedException>()(
    "Ec2RequestFailedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidAddressException
  extends /*@__PURE__*/ S.TaggedError<InvalidAddressException>()(
    "InvalidAddressException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidInputCombinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputCombinationException>()(
    "InvalidInputCombinationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidJobStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidJobStateException>()(
    "InvalidJobStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidResourceException
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceException>()(
    "InvalidResourceException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceType: S.optional(S.String),
    },
  ) {}
export class KMSRequestFailedException
  extends /*@__PURE__*/ S.TaggedError<KMSRequestFailedException>()(
    "KMSRequestFailedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ReturnShippingLabelAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ReturnShippingLabelAlreadyExistsException>()(
    "ReturnShippingLabelAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class UnsupportedAddressException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedAddressException>()(
    "UnsupportedAddressException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type ClusterId = string;
export interface CancelClusterRequest {
  ClusterId: string;
}
export const CancelClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CancelClusterRequest",
}) as any as S.Schema<CancelClusterRequest>;
export interface CancelClusterResult {}
export const CancelClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelClusterResult",
}) as any as S.Schema<CancelClusterResult>;
export type JobId = string;
export interface CancelJobRequest {
  JobId: string;
}
export const CancelJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CancelJobRequest",
}) as any as S.Schema<CancelJobRequest>;
export interface CancelJobResult {}
export const CancelJobResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelJobResult",
}) as any as S.Schema<CancelJobResult>;
export type AddressId = string;
export type AddressType = "CUST_PICKUP" | "AWS_SHIP" | (string & {});
export const AddressType = S.String;

export interface Address {
  AddressId?: string;
  Name?: string;
  Company?: string;
  Street1?: string;
  Street2?: string;
  Street3?: string;
  City?: string;
  StateOrProvince?: string;
  PrefectureOrDistrict?: string;
  Landmark?: string;
  Country?: string;
  PostalCode?: string;
  PhoneNumber?: string;
  IsRestricted?: boolean;
  Type?: AddressType;
}
export const Address = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AddressId: S.optional(S.String),
    Name: S.optional(S.String),
    Company: S.optional(S.String),
    Street1: S.optional(S.String),
    Street2: S.optional(S.String),
    Street3: S.optional(S.String),
    City: S.optional(S.String),
    StateOrProvince: S.optional(S.String),
    PrefectureOrDistrict: S.optional(S.String),
    Landmark: S.optional(S.String),
    Country: S.optional(S.String),
    PostalCode: S.optional(S.String),
    PhoneNumber: S.optional(S.String),
    IsRestricted: S.optional(S.Boolean),
    Type: S.optional(AddressType),
  }),
).annotate({ identifier: "Address" }) as any as S.Schema<Address>;
export interface CreateAddressRequest {
  Address: Address;
}
export const CreateAddressRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Address: Address }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateAddressRequest",
}) as any as S.Schema<CreateAddressRequest>;
export interface CreateAddressResult {
  AddressId?: string;
}
export const CreateAddressResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AddressId: S.optional(S.String) }),
).annotate({
  identifier: "CreateAddressResult",
}) as any as S.Schema<CreateAddressResult>;
export type JobType = "IMPORT" | "EXPORT" | "LOCAL_USE" | (string & {});
export const JobType = S.String;

export type ResourceARN = string;
export interface KeyRange {
  BeginMarker?: string;
  EndMarker?: string;
}
export const KeyRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BeginMarker: S.optional(S.String),
    EndMarker: S.optional(S.String),
  }),
).annotate({ identifier: "KeyRange" }) as any as S.Schema<KeyRange>;
export type DeviceServiceName =
  | "NFS_ON_DEVICE_SERVICE"
  | "S3_ON_DEVICE_SERVICE"
  | (string & {});
export const DeviceServiceName = S.String;

export type TransferOption = "IMPORT" | "EXPORT" | "LOCAL_USE" | (string & {});
export const TransferOption = S.String;

export interface TargetOnDeviceService {
  ServiceName?: DeviceServiceName;
  TransferOption?: TransferOption;
}
export const TargetOnDeviceService = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceName: S.optional(DeviceServiceName),
    TransferOption: S.optional(TransferOption),
  }),
).annotate({
  identifier: "TargetOnDeviceService",
}) as any as S.Schema<TargetOnDeviceService>;
export type TargetOnDeviceServiceList = TargetOnDeviceService[];
export const TargetOnDeviceServiceList = /*@__PURE__*/ S.Array(
  TargetOnDeviceService,
);
export interface S3Resource {
  BucketArn?: string;
  KeyRange?: KeyRange;
  TargetOnDeviceServices?: TargetOnDeviceService[];
}
export const S3Resource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BucketArn: S.optional(S.String),
    KeyRange: S.optional(KeyRange),
    TargetOnDeviceServices: S.optional(TargetOnDeviceServiceList),
  }),
).annotate({ identifier: "S3Resource" }) as any as S.Schema<S3Resource>;
export type S3ResourceList = S3Resource[];
export const S3ResourceList = /*@__PURE__*/ S.Array(S3Resource);
export interface EventTriggerDefinition {
  EventResourceARN?: string;
}
export const EventTriggerDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EventResourceARN: S.optional(S.String) }),
).annotate({
  identifier: "EventTriggerDefinition",
}) as any as S.Schema<EventTriggerDefinition>;
export type EventTriggerDefinitionList = EventTriggerDefinition[];
export const EventTriggerDefinitionList = /*@__PURE__*/ S.Array(
  EventTriggerDefinition,
);
export interface LambdaResource {
  LambdaArn?: string;
  EventTriggers?: EventTriggerDefinition[];
}
export const LambdaResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LambdaArn: S.optional(S.String),
    EventTriggers: S.optional(EventTriggerDefinitionList),
  }),
).annotate({ identifier: "LambdaResource" }) as any as S.Schema<LambdaResource>;
export type LambdaResourceList = LambdaResource[];
export const LambdaResourceList = /*@__PURE__*/ S.Array(LambdaResource);
export type AmiId = string;
export interface Ec2AmiResource {
  AmiId: string;
  SnowballAmiId?: string;
}
export const Ec2AmiResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AmiId: S.String, SnowballAmiId: S.optional(S.String) }),
).annotate({ identifier: "Ec2AmiResource" }) as any as S.Schema<Ec2AmiResource>;
export type Ec2AmiResourceList = Ec2AmiResource[];
export const Ec2AmiResourceList = /*@__PURE__*/ S.Array(Ec2AmiResource);
export interface JobResource {
  S3Resources?: S3Resource[];
  LambdaResources?: LambdaResource[];
  Ec2AmiResources?: Ec2AmiResource[];
}
export const JobResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3Resources: S.optional(S3ResourceList),
    LambdaResources: S.optional(LambdaResourceList),
    Ec2AmiResources: S.optional(Ec2AmiResourceList),
  }),
).annotate({ identifier: "JobResource" }) as any as S.Schema<JobResource>;
export type StorageLimit = number;
export type StorageUnit = "TB" | (string & {});
export const StorageUnit = S.String;

export interface NFSOnDeviceServiceConfiguration {
  StorageLimit?: number;
  StorageUnit?: StorageUnit;
}
export const NFSOnDeviceServiceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StorageLimit: S.optional(S.Number),
    StorageUnit: S.optional(StorageUnit),
  }),
).annotate({
  identifier: "NFSOnDeviceServiceConfiguration",
}) as any as S.Schema<NFSOnDeviceServiceConfiguration>;
export interface TGWOnDeviceServiceConfiguration {
  StorageLimit?: number;
  StorageUnit?: StorageUnit;
}
export const TGWOnDeviceServiceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StorageLimit: S.optional(S.Number),
    StorageUnit: S.optional(StorageUnit),
  }),
).annotate({
  identifier: "TGWOnDeviceServiceConfiguration",
}) as any as S.Schema<TGWOnDeviceServiceConfiguration>;
export interface EKSOnDeviceServiceConfiguration {
  KubernetesVersion?: string;
  EKSAnywhereVersion?: string;
}
export const EKSOnDeviceServiceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KubernetesVersion: S.optional(S.String),
    EKSAnywhereVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "EKSOnDeviceServiceConfiguration",
}) as any as S.Schema<EKSOnDeviceServiceConfiguration>;
export type S3StorageLimit = number;
export type ServiceSize = number;
export type NodeFaultTolerance = number;
export interface S3OnDeviceServiceConfiguration {
  StorageLimit?: number;
  StorageUnit?: StorageUnit;
  ServiceSize?: number;
  FaultTolerance?: number;
}
export const S3OnDeviceServiceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StorageLimit: S.optional(S.Number),
    StorageUnit: S.optional(StorageUnit),
    ServiceSize: S.optional(S.Number),
    FaultTolerance: S.optional(S.Number),
  }),
).annotate({
  identifier: "S3OnDeviceServiceConfiguration",
}) as any as S.Schema<S3OnDeviceServiceConfiguration>;
export interface OnDeviceServiceConfiguration {
  NFSOnDeviceService?: NFSOnDeviceServiceConfiguration;
  TGWOnDeviceService?: TGWOnDeviceServiceConfiguration;
  EKSOnDeviceService?: EKSOnDeviceServiceConfiguration;
  S3OnDeviceService?: S3OnDeviceServiceConfiguration;
}
export const OnDeviceServiceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NFSOnDeviceService: S.optional(NFSOnDeviceServiceConfiguration),
    TGWOnDeviceService: S.optional(TGWOnDeviceServiceConfiguration),
    EKSOnDeviceService: S.optional(EKSOnDeviceServiceConfiguration),
    S3OnDeviceService: S.optional(S3OnDeviceServiceConfiguration),
  }),
).annotate({
  identifier: "OnDeviceServiceConfiguration",
}) as any as S.Schema<OnDeviceServiceConfiguration>;
export type KmsKeyARN = string;
export type RoleARN = string;
export type SnowballType =
  | "STANDARD"
  | "EDGE"
  | "EDGE_C"
  | "EDGE_CG"
  | "EDGE_S"
  | "SNC1_HDD"
  | "SNC1_SSD"
  | "V3_5C"
  | "V3_5S"
  | "RACK_5U_C"
  | (string & {});
export const SnowballType = S.String;

export type ShippingOption =
  | "SECOND_DAY"
  | "NEXT_DAY"
  | "EXPRESS"
  | "STANDARD"
  | (string & {});
export const ShippingOption = S.String;

export type SnsTopicARN = string;
export type JobState =
  | "New"
  | "PreparingAppliance"
  | "PreparingShipment"
  | "InTransitToCustomer"
  | "WithCustomer"
  | "InTransitToAWS"
  | "WithAWSSortingFacility"
  | "WithAWS"
  | "InProgress"
  | "Complete"
  | "Cancelled"
  | "Listing"
  | "Pending"
  | (string & {});
export const JobState = S.String;

export type JobStateList = JobState[];
export const JobStateList = /*@__PURE__*/ S.Array(JobState);
export interface Notification {
  SnsTopicARN?: string;
  JobStatesToNotify?: JobState[];
  NotifyAll?: boolean;
  DevicePickupSnsTopicARN?: string;
}
export const Notification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnsTopicARN: S.optional(S.String),
    JobStatesToNotify: S.optional(JobStateList),
    NotifyAll: S.optional(S.Boolean),
    DevicePickupSnsTopicARN: S.optional(S.String),
  }),
).annotate({ identifier: "Notification" }) as any as S.Schema<Notification>;
export type GSTIN = string;
export interface INDTaxDocuments {
  GSTIN?: string;
}
export const INDTaxDocuments = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GSTIN: S.optional(S.String) }),
).annotate({
  identifier: "INDTaxDocuments",
}) as any as S.Schema<INDTaxDocuments>;
export interface TaxDocuments {
  IND?: INDTaxDocuments;
}
export const TaxDocuments = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IND: S.optional(INDTaxDocuments) }),
).annotate({ identifier: "TaxDocuments" }) as any as S.Schema<TaxDocuments>;
export type RemoteManagement =
  | "INSTALLED_ONLY"
  | "INSTALLED_AUTOSTART"
  | "NOT_INSTALLED"
  | (string & {});
export const RemoteManagement = S.String;

export type InitialClusterSize = number;
export type LongTermPricingId = string;
export type LongTermPricingIdList = string[];
export const LongTermPricingIdList = /*@__PURE__*/ S.Array(S.String);
export type SnowballCapacity =
  | "T50"
  | "T80"
  | "T100"
  | "T42"
  | "T98"
  | "T8"
  | "T14"
  | "T32"
  | "NoPreference"
  | "T240"
  | "T13"
  | (string & {});
export const SnowballCapacity = S.String;

export interface CreateClusterRequest {
  JobType: JobType;
  Resources?: JobResource;
  OnDeviceServiceConfiguration?: OnDeviceServiceConfiguration;
  Description?: string;
  AddressId: string;
  KmsKeyARN?: string;
  RoleARN?: string;
  SnowballType: SnowballType;
  ShippingOption: ShippingOption;
  Notification?: Notification;
  ForwardingAddressId?: string;
  TaxDocuments?: TaxDocuments;
  RemoteManagement?: RemoteManagement;
  InitialClusterSize?: number;
  ForceCreateJobs?: boolean;
  LongTermPricingIds?: string[];
  SnowballCapacityPreference?: SnowballCapacity;
}
export const CreateClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobType: JobType,
    Resources: S.optional(JobResource),
    OnDeviceServiceConfiguration: S.optional(OnDeviceServiceConfiguration),
    Description: S.optional(S.String),
    AddressId: S.String,
    KmsKeyARN: S.optional(S.String),
    RoleARN: S.optional(S.String),
    SnowballType: SnowballType,
    ShippingOption: ShippingOption,
    Notification: S.optional(Notification),
    ForwardingAddressId: S.optional(S.String),
    TaxDocuments: S.optional(TaxDocuments),
    RemoteManagement: S.optional(RemoteManagement),
    InitialClusterSize: S.optional(S.Number),
    ForceCreateJobs: S.optional(S.Boolean),
    LongTermPricingIds: S.optional(LongTermPricingIdList),
    SnowballCapacityPreference: S.optional(SnowballCapacity),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateClusterRequest",
}) as any as S.Schema<CreateClusterRequest>;
export interface JobListEntry {
  JobId?: string;
  JobState?: JobState;
  IsMaster?: boolean;
  JobType?: JobType;
  SnowballType?: SnowballType;
  CreationDate?: Date;
  Description?: string;
}
export const JobListEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobState: S.optional(JobState),
    IsMaster: S.optional(S.Boolean),
    JobType: S.optional(JobType),
    SnowballType: S.optional(SnowballType),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Description: S.optional(S.String),
  }),
).annotate({ identifier: "JobListEntry" }) as any as S.Schema<JobListEntry>;
export type JobListEntryList = JobListEntry[];
export const JobListEntryList = /*@__PURE__*/ S.Array(JobListEntry);
export interface CreateClusterResult {
  ClusterId?: string;
  JobListEntries?: JobListEntry[];
}
export const CreateClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    JobListEntries: S.optional(JobListEntryList),
  }),
).annotate({
  identifier: "CreateClusterResult",
}) as any as S.Schema<CreateClusterResult>;
export interface WirelessConnection {
  IsWifiEnabled?: boolean;
}
export const WirelessConnection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IsWifiEnabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "WirelessConnection",
}) as any as S.Schema<WirelessConnection>;
export interface SnowconeDeviceConfiguration {
  WirelessConnection?: WirelessConnection;
}
export const SnowconeDeviceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WirelessConnection: S.optional(WirelessConnection) }),
).annotate({
  identifier: "SnowconeDeviceConfiguration",
}) as any as S.Schema<SnowconeDeviceConfiguration>;
export interface DeviceConfiguration {
  SnowconeDeviceConfiguration?: SnowconeDeviceConfiguration;
}
export const DeviceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnowconeDeviceConfiguration: S.optional(SnowconeDeviceConfiguration),
  }),
).annotate({
  identifier: "DeviceConfiguration",
}) as any as S.Schema<DeviceConfiguration>;
export type ImpactLevel =
  | "IL2"
  | "IL4"
  | "IL5"
  | "IL6"
  | "IL99"
  | (string & {});
export const ImpactLevel = S.String;

export type PhoneNumber = string | redacted.Redacted<string>;
export type Email = string | redacted.Redacted<string>;
export type DevicePickupId = string;
export interface PickupDetails {
  Name?: string;
  PhoneNumber?: string | redacted.Redacted<string>;
  Email?: string | redacted.Redacted<string>;
  IdentificationNumber?: string;
  IdentificationExpirationDate?: Date;
  IdentificationIssuingOrg?: string;
  DevicePickupId?: string;
}
export const PickupDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    PhoneNumber: S.optional(SensitiveString),
    Email: S.optional(SensitiveString),
    IdentificationNumber: S.optional(S.String),
    IdentificationExpirationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    IdentificationIssuingOrg: S.optional(S.String),
    DevicePickupId: S.optional(S.String),
  }),
).annotate({ identifier: "PickupDetails" }) as any as S.Schema<PickupDetails>;
export interface CreateJobRequest {
  JobType?: JobType;
  Resources?: JobResource;
  OnDeviceServiceConfiguration?: OnDeviceServiceConfiguration;
  Description?: string;
  AddressId?: string;
  KmsKeyARN?: string;
  RoleARN?: string;
  SnowballCapacityPreference?: SnowballCapacity;
  ShippingOption?: ShippingOption;
  Notification?: Notification;
  ClusterId?: string;
  SnowballType?: SnowballType;
  ForwardingAddressId?: string;
  TaxDocuments?: TaxDocuments;
  DeviceConfiguration?: DeviceConfiguration;
  RemoteManagement?: RemoteManagement;
  LongTermPricingId?: string;
  ImpactLevel?: ImpactLevel;
  PickupDetails?: PickupDetails;
}
export const CreateJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobType: S.optional(JobType),
    Resources: S.optional(JobResource),
    OnDeviceServiceConfiguration: S.optional(OnDeviceServiceConfiguration),
    Description: S.optional(S.String),
    AddressId: S.optional(S.String),
    KmsKeyARN: S.optional(S.String),
    RoleARN: S.optional(S.String),
    SnowballCapacityPreference: S.optional(SnowballCapacity),
    ShippingOption: S.optional(ShippingOption),
    Notification: S.optional(Notification),
    ClusterId: S.optional(S.String),
    SnowballType: S.optional(SnowballType),
    ForwardingAddressId: S.optional(S.String),
    TaxDocuments: S.optional(TaxDocuments),
    DeviceConfiguration: S.optional(DeviceConfiguration),
    RemoteManagement: S.optional(RemoteManagement),
    LongTermPricingId: S.optional(S.String),
    ImpactLevel: S.optional(ImpactLevel),
    PickupDetails: S.optional(PickupDetails),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateJobRequest",
}) as any as S.Schema<CreateJobRequest>;
export interface CreateJobResult {
  JobId?: string;
}
export const CreateJobResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String) }),
).annotate({
  identifier: "CreateJobResult",
}) as any as S.Schema<CreateJobResult>;
export type LongTermPricingType =
  | "OneYear"
  | "ThreeYear"
  | "OneMonth"
  | (string & {});
export const LongTermPricingType = S.String;

export type JavaBoolean = boolean;
export interface CreateLongTermPricingRequest {
  LongTermPricingType: LongTermPricingType;
  IsLongTermPricingAutoRenew?: boolean;
  SnowballType: SnowballType;
}
export const CreateLongTermPricingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LongTermPricingType: LongTermPricingType,
    IsLongTermPricingAutoRenew: S.optional(S.Boolean),
    SnowballType: SnowballType,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateLongTermPricingRequest",
}) as any as S.Schema<CreateLongTermPricingRequest>;
export interface CreateLongTermPricingResult {
  LongTermPricingId?: string;
}
export const CreateLongTermPricingResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LongTermPricingId: S.optional(S.String) }),
).annotate({
  identifier: "CreateLongTermPricingResult",
}) as any as S.Schema<CreateLongTermPricingResult>;
export interface CreateReturnShippingLabelRequest {
  JobId: string;
  ShippingOption?: ShippingOption;
}
export const CreateReturnShippingLabelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.String,
    ShippingOption: S.optional(ShippingOption),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateReturnShippingLabelRequest",
}) as any as S.Schema<CreateReturnShippingLabelRequest>;
export type ShippingLabelStatus =
  | "InProgress"
  | "TimedOut"
  | "Succeeded"
  | "Failed"
  | (string & {});
export const ShippingLabelStatus = S.String;

export interface CreateReturnShippingLabelResult {
  Status?: ShippingLabelStatus;
}
export const CreateReturnShippingLabelResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(ShippingLabelStatus) }),
).annotate({
  identifier: "CreateReturnShippingLabelResult",
}) as any as S.Schema<CreateReturnShippingLabelResult>;
export interface DescribeAddressRequest {
  AddressId: string;
}
export const DescribeAddressRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AddressId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeAddressRequest",
}) as any as S.Schema<DescribeAddressRequest>;
export interface DescribeAddressResult {
  Address?: Address;
}
export const DescribeAddressResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Address: S.optional(Address) }),
).annotate({
  identifier: "DescribeAddressResult",
}) as any as S.Schema<DescribeAddressResult>;
export type ListLimit = number;
export interface DescribeAddressesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeAddressesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeAddressesRequest",
}) as any as S.Schema<DescribeAddressesRequest>;
export type AddressList = Address[];
export const AddressList = /*@__PURE__*/ S.Array(Address);
export interface DescribeAddressesResult {
  Addresses?: Address[];
  NextToken?: string;
}
export const DescribeAddressesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Addresses: S.optional(AddressList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeAddressesResult",
}) as any as S.Schema<DescribeAddressesResult>;
export interface DescribeClusterRequest {
  ClusterId: string;
}
export const DescribeClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeClusterRequest",
}) as any as S.Schema<DescribeClusterRequest>;
export type ClusterState =
  | "AwaitingQuorum"
  | "Pending"
  | "InUse"
  | "Complete"
  | "Cancelled"
  | (string & {});
export const ClusterState = S.String;

export interface ClusterMetadata {
  ClusterId?: string;
  Description?: string;
  KmsKeyARN?: string;
  RoleARN?: string;
  ClusterState?: ClusterState;
  JobType?: JobType;
  SnowballType?: SnowballType;
  CreationDate?: Date;
  Resources?: JobResource;
  AddressId?: string;
  ShippingOption?: ShippingOption;
  Notification?: Notification;
  ForwardingAddressId?: string;
  TaxDocuments?: TaxDocuments;
  OnDeviceServiceConfiguration?: OnDeviceServiceConfiguration;
}
export const ClusterMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    Description: S.optional(S.String),
    KmsKeyARN: S.optional(S.String),
    RoleARN: S.optional(S.String),
    ClusterState: S.optional(ClusterState),
    JobType: S.optional(JobType),
    SnowballType: S.optional(SnowballType),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Resources: S.optional(JobResource),
    AddressId: S.optional(S.String),
    ShippingOption: S.optional(ShippingOption),
    Notification: S.optional(Notification),
    ForwardingAddressId: S.optional(S.String),
    TaxDocuments: S.optional(TaxDocuments),
    OnDeviceServiceConfiguration: S.optional(OnDeviceServiceConfiguration),
  }),
).annotate({
  identifier: "ClusterMetadata",
}) as any as S.Schema<ClusterMetadata>;
export interface DescribeClusterResult {
  ClusterMetadata?: ClusterMetadata;
}
export const DescribeClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterMetadata: S.optional(ClusterMetadata) }),
).annotate({
  identifier: "DescribeClusterResult",
}) as any as S.Schema<DescribeClusterResult>;
export interface DescribeJobRequest {
  JobId: string;
}
export const DescribeJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeJobRequest",
}) as any as S.Schema<DescribeJobRequest>;
export interface Shipment {
  Status?: string;
  TrackingNumber?: string;
}
export const Shipment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(S.String),
    TrackingNumber: S.optional(S.String),
  }),
).annotate({ identifier: "Shipment" }) as any as S.Schema<Shipment>;
export interface ShippingDetails {
  ShippingOption?: ShippingOption;
  InboundShipment?: Shipment;
  OutboundShipment?: Shipment;
}
export const ShippingDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ShippingOption: S.optional(ShippingOption),
    InboundShipment: S.optional(Shipment),
    OutboundShipment: S.optional(Shipment),
  }),
).annotate({
  identifier: "ShippingDetails",
}) as any as S.Schema<ShippingDetails>;
export interface DataTransfer {
  BytesTransferred?: number;
  ObjectsTransferred?: number;
  TotalBytes?: number;
  TotalObjects?: number;
}
export const DataTransfer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BytesTransferred: S.optional(S.Number),
    ObjectsTransferred: S.optional(S.Number),
    TotalBytes: S.optional(S.Number),
    TotalObjects: S.optional(S.Number),
  }),
).annotate({ identifier: "DataTransfer" }) as any as S.Schema<DataTransfer>;
export interface JobLogs {
  JobCompletionReportURI?: string;
  JobSuccessLogURI?: string;
  JobFailureLogURI?: string;
}
export const JobLogs = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobCompletionReportURI: S.optional(S.String),
    JobSuccessLogURI: S.optional(S.String),
    JobFailureLogURI: S.optional(S.String),
  }),
).annotate({ identifier: "JobLogs" }) as any as S.Schema<JobLogs>;
export interface JobMetadata {
  JobId?: string;
  JobState?: JobState;
  JobType?: JobType;
  SnowballType?: SnowballType;
  CreationDate?: Date;
  Resources?: JobResource;
  Description?: string;
  KmsKeyARN?: string;
  RoleARN?: string;
  AddressId?: string;
  ShippingDetails?: ShippingDetails;
  SnowballCapacityPreference?: SnowballCapacity;
  Notification?: Notification;
  DataTransferProgress?: DataTransfer;
  JobLogInfo?: JobLogs;
  ClusterId?: string;
  ForwardingAddressId?: string;
  TaxDocuments?: TaxDocuments;
  DeviceConfiguration?: DeviceConfiguration;
  RemoteManagement?: RemoteManagement;
  LongTermPricingId?: string;
  OnDeviceServiceConfiguration?: OnDeviceServiceConfiguration;
  ImpactLevel?: ImpactLevel;
  PickupDetails?: PickupDetails;
  SnowballId?: string;
}
export const JobMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobState: S.optional(JobState),
    JobType: S.optional(JobType),
    SnowballType: S.optional(SnowballType),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Resources: S.optional(JobResource),
    Description: S.optional(S.String),
    KmsKeyARN: S.optional(S.String),
    RoleARN: S.optional(S.String),
    AddressId: S.optional(S.String),
    ShippingDetails: S.optional(ShippingDetails),
    SnowballCapacityPreference: S.optional(SnowballCapacity),
    Notification: S.optional(Notification),
    DataTransferProgress: S.optional(DataTransfer),
    JobLogInfo: S.optional(JobLogs),
    ClusterId: S.optional(S.String),
    ForwardingAddressId: S.optional(S.String),
    TaxDocuments: S.optional(TaxDocuments),
    DeviceConfiguration: S.optional(DeviceConfiguration),
    RemoteManagement: S.optional(RemoteManagement),
    LongTermPricingId: S.optional(S.String),
    OnDeviceServiceConfiguration: S.optional(OnDeviceServiceConfiguration),
    ImpactLevel: S.optional(ImpactLevel),
    PickupDetails: S.optional(PickupDetails),
    SnowballId: S.optional(S.String),
  }),
).annotate({ identifier: "JobMetadata" }) as any as S.Schema<JobMetadata>;
export type JobMetadataList = JobMetadata[];
export const JobMetadataList = /*@__PURE__*/ S.Array(JobMetadata);
export interface DescribeJobResult {
  JobMetadata?: JobMetadata;
  SubJobMetadata?: JobMetadata[];
}
export const DescribeJobResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobMetadata: S.optional(JobMetadata),
    SubJobMetadata: S.optional(JobMetadataList),
  }),
).annotate({
  identifier: "DescribeJobResult",
}) as any as S.Schema<DescribeJobResult>;
export interface DescribeReturnShippingLabelRequest {
  JobId: string;
}
export const DescribeReturnShippingLabelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeReturnShippingLabelRequest",
}) as any as S.Schema<DescribeReturnShippingLabelRequest>;
export interface DescribeReturnShippingLabelResult {
  Status?: ShippingLabelStatus;
  ExpirationDate?: Date;
  ReturnShippingLabelURI?: string;
}
export const DescribeReturnShippingLabelResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(ShippingLabelStatus),
    ExpirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ReturnShippingLabelURI: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeReturnShippingLabelResult",
}) as any as S.Schema<DescribeReturnShippingLabelResult>;
export interface GetJobManifestRequest {
  JobId: string;
}
export const GetJobManifestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetJobManifestRequest",
}) as any as S.Schema<GetJobManifestRequest>;
export interface GetJobManifestResult {
  ManifestURI?: string;
}
export const GetJobManifestResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ManifestURI: S.optional(S.String) }),
).annotate({
  identifier: "GetJobManifestResult",
}) as any as S.Schema<GetJobManifestResult>;
export interface GetJobUnlockCodeRequest {
  JobId: string;
}
export const GetJobUnlockCodeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetJobUnlockCodeRequest",
}) as any as S.Schema<GetJobUnlockCodeRequest>;
export interface GetJobUnlockCodeResult {
  UnlockCode?: string;
}
export const GetJobUnlockCodeResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UnlockCode: S.optional(S.String) }),
).annotate({
  identifier: "GetJobUnlockCodeResult",
}) as any as S.Schema<GetJobUnlockCodeResult>;
export interface GetSnowballUsageRequest {}
export const GetSnowballUsageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetSnowballUsageRequest",
}) as any as S.Schema<GetSnowballUsageRequest>;
export interface GetSnowballUsageResult {
  SnowballLimit?: number;
  SnowballsInUse?: number;
}
export const GetSnowballUsageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnowballLimit: S.optional(S.Number),
    SnowballsInUse: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetSnowballUsageResult",
}) as any as S.Schema<GetSnowballUsageResult>;
export interface GetSoftwareUpdatesRequest {
  JobId: string;
}
export const GetSoftwareUpdatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetSoftwareUpdatesRequest",
}) as any as S.Schema<GetSoftwareUpdatesRequest>;
export interface GetSoftwareUpdatesResult {
  UpdatesURI?: string;
}
export const GetSoftwareUpdatesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UpdatesURI: S.optional(S.String) }),
).annotate({
  identifier: "GetSoftwareUpdatesResult",
}) as any as S.Schema<GetSoftwareUpdatesResult>;
export interface ListClusterJobsRequest {
  ClusterId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListClusterJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListClusterJobsRequest",
}) as any as S.Schema<ListClusterJobsRequest>;
export interface ListClusterJobsResult {
  JobListEntries?: JobListEntry[];
  NextToken?: string;
}
export const ListClusterJobsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobListEntries: S.optional(JobListEntryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListClusterJobsResult",
}) as any as S.Schema<ListClusterJobsResult>;
export interface ListClustersRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListClustersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListClustersRequest",
}) as any as S.Schema<ListClustersRequest>;
export interface ClusterListEntry {
  ClusterId?: string;
  ClusterState?: ClusterState;
  CreationDate?: Date;
  Description?: string;
}
export const ClusterListEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.optional(S.String),
    ClusterState: S.optional(ClusterState),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Description: S.optional(S.String),
  }),
).annotate({
  identifier: "ClusterListEntry",
}) as any as S.Schema<ClusterListEntry>;
export type ClusterListEntryList = ClusterListEntry[];
export const ClusterListEntryList = /*@__PURE__*/ S.Array(ClusterListEntry);
export interface ListClustersResult {
  ClusterListEntries?: ClusterListEntry[];
  NextToken?: string;
}
export const ListClustersResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterListEntries: S.optional(ClusterListEntryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListClustersResult",
}) as any as S.Schema<ListClustersResult>;
export interface ListCompatibleImagesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListCompatibleImagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListCompatibleImagesRequest",
}) as any as S.Schema<ListCompatibleImagesRequest>;
export interface CompatibleImage {
  AmiId?: string;
  Name?: string;
}
export const CompatibleImage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AmiId: S.optional(S.String), Name: S.optional(S.String) }),
).annotate({
  identifier: "CompatibleImage",
}) as any as S.Schema<CompatibleImage>;
export type CompatibleImageList = CompatibleImage[];
export const CompatibleImageList = /*@__PURE__*/ S.Array(CompatibleImage);
export interface ListCompatibleImagesResult {
  CompatibleImages?: CompatibleImage[];
  NextToken?: string;
}
export const ListCompatibleImagesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CompatibleImages: S.optional(CompatibleImageList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCompatibleImagesResult",
}) as any as S.Schema<ListCompatibleImagesResult>;
export interface ListJobsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListJobsRequest",
}) as any as S.Schema<ListJobsRequest>;
export interface ListJobsResult {
  JobListEntries?: JobListEntry[];
  NextToken?: string;
}
export const ListJobsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobListEntries: S.optional(JobListEntryList),
    NextToken: S.optional(S.String),
  }),
).annotate({ identifier: "ListJobsResult" }) as any as S.Schema<ListJobsResult>;
export interface ListLongTermPricingRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListLongTermPricingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListLongTermPricingRequest",
}) as any as S.Schema<ListLongTermPricingRequest>;
export type LongTermPricingAssociatedJobIdList = string[];
export const LongTermPricingAssociatedJobIdList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface LongTermPricingListEntry {
  LongTermPricingId?: string;
  LongTermPricingEndDate?: Date;
  LongTermPricingStartDate?: Date;
  LongTermPricingType?: LongTermPricingType;
  CurrentActiveJob?: string;
  ReplacementJob?: string;
  IsLongTermPricingAutoRenew?: boolean;
  LongTermPricingStatus?: string;
  SnowballType?: SnowballType;
  JobIds?: string[];
}
export const LongTermPricingListEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LongTermPricingId: S.optional(S.String),
    LongTermPricingEndDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LongTermPricingStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LongTermPricingType: S.optional(LongTermPricingType),
    CurrentActiveJob: S.optional(S.String),
    ReplacementJob: S.optional(S.String),
    IsLongTermPricingAutoRenew: S.optional(S.Boolean),
    LongTermPricingStatus: S.optional(S.String),
    SnowballType: S.optional(SnowballType),
    JobIds: S.optional(LongTermPricingAssociatedJobIdList),
  }),
).annotate({
  identifier: "LongTermPricingListEntry",
}) as any as S.Schema<LongTermPricingListEntry>;
export type LongTermPricingEntryList = LongTermPricingListEntry[];
export const LongTermPricingEntryList = /*@__PURE__*/ S.Array(
  LongTermPricingListEntry,
);
export interface ListLongTermPricingResult {
  LongTermPricingEntries?: LongTermPricingListEntry[];
  NextToken?: string;
}
export const ListLongTermPricingResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LongTermPricingEntries: S.optional(LongTermPricingEntryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLongTermPricingResult",
}) as any as S.Schema<ListLongTermPricingResult>;
export interface ListPickupLocationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListPickupLocationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPickupLocationsRequest",
}) as any as S.Schema<ListPickupLocationsRequest>;
export interface ListPickupLocationsResult {
  Addresses?: Address[];
  NextToken?: string;
}
export const ListPickupLocationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Addresses: S.optional(AddressList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPickupLocationsResult",
}) as any as S.Schema<ListPickupLocationsResult>;
export type ServiceName = "KUBERNETES" | "EKS_ANYWHERE" | (string & {});
export const ServiceName = S.String;

export interface ServiceVersion {
  Version?: string;
}
export const ServiceVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Version: S.optional(S.String) }),
).annotate({ identifier: "ServiceVersion" }) as any as S.Schema<ServiceVersion>;
export interface DependentService {
  ServiceName?: ServiceName;
  ServiceVersion?: ServiceVersion;
}
export const DependentService = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceName: S.optional(ServiceName),
    ServiceVersion: S.optional(ServiceVersion),
  }),
).annotate({
  identifier: "DependentService",
}) as any as S.Schema<DependentService>;
export type DependentServiceList = DependentService[];
export const DependentServiceList = /*@__PURE__*/ S.Array(DependentService);
export interface ListServiceVersionsRequest {
  ServiceName: ServiceName;
  DependentServices?: DependentService[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListServiceVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceName: ServiceName,
    DependentServices: S.optional(DependentServiceList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListServiceVersionsRequest",
}) as any as S.Schema<ListServiceVersionsRequest>;
export type ServiceVersionList = ServiceVersion[];
export const ServiceVersionList = /*@__PURE__*/ S.Array(ServiceVersion);
export interface ListServiceVersionsResult {
  ServiceVersions: ServiceVersion[];
  ServiceName: ServiceName;
  DependentServices?: DependentService[];
  NextToken?: string;
}
export const ListServiceVersionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceVersions: ServiceVersionList,
    ServiceName: ServiceName,
    DependentServices: S.optional(DependentServiceList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServiceVersionsResult",
}) as any as S.Schema<ListServiceVersionsResult>;
export interface UpdateClusterRequest {
  ClusterId: string;
  RoleARN?: string;
  Description?: string;
  Resources?: JobResource;
  OnDeviceServiceConfiguration?: OnDeviceServiceConfiguration;
  AddressId?: string;
  ShippingOption?: ShippingOption;
  Notification?: Notification;
  ForwardingAddressId?: string;
}
export const UpdateClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.String,
    RoleARN: S.optional(S.String),
    Description: S.optional(S.String),
    Resources: S.optional(JobResource),
    OnDeviceServiceConfiguration: S.optional(OnDeviceServiceConfiguration),
    AddressId: S.optional(S.String),
    ShippingOption: S.optional(ShippingOption),
    Notification: S.optional(Notification),
    ForwardingAddressId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateClusterRequest",
}) as any as S.Schema<UpdateClusterRequest>;
export interface UpdateClusterResult {}
export const UpdateClusterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateClusterResult",
}) as any as S.Schema<UpdateClusterResult>;
export interface UpdateJobRequest {
  JobId: string;
  RoleARN?: string;
  Notification?: Notification;
  Resources?: JobResource;
  OnDeviceServiceConfiguration?: OnDeviceServiceConfiguration;
  AddressId?: string;
  ShippingOption?: ShippingOption;
  Description?: string;
  SnowballCapacityPreference?: SnowballCapacity;
  ForwardingAddressId?: string;
  PickupDetails?: PickupDetails;
}
export const UpdateJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.String,
    RoleARN: S.optional(S.String),
    Notification: S.optional(Notification),
    Resources: S.optional(JobResource),
    OnDeviceServiceConfiguration: S.optional(OnDeviceServiceConfiguration),
    AddressId: S.optional(S.String),
    ShippingOption: S.optional(ShippingOption),
    Description: S.optional(S.String),
    SnowballCapacityPreference: S.optional(SnowballCapacity),
    ForwardingAddressId: S.optional(S.String),
    PickupDetails: S.optional(PickupDetails),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateJobRequest",
}) as any as S.Schema<UpdateJobRequest>;
export interface UpdateJobResult {}
export const UpdateJobResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateJobResult",
}) as any as S.Schema<UpdateJobResult>;
export type ShipmentState = "RECEIVED" | "RETURNED" | (string & {});
export const ShipmentState = S.String;

export interface UpdateJobShipmentStateRequest {
  JobId: string;
  ShipmentState: ShipmentState;
}
export const UpdateJobShipmentStateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String, ShipmentState: ShipmentState }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateJobShipmentStateRequest",
}) as any as S.Schema<UpdateJobShipmentStateRequest>;
export interface UpdateJobShipmentStateResult {}
export const UpdateJobShipmentStateResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateJobShipmentStateResult",
}) as any as S.Schema<UpdateJobShipmentStateResult>;
export interface UpdateLongTermPricingRequest {
  LongTermPricingId: string;
  ReplacementJob?: string;
  IsLongTermPricingAutoRenew?: boolean;
}
export const UpdateLongTermPricingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LongTermPricingId: S.String,
    ReplacementJob: S.optional(S.String),
    IsLongTermPricingAutoRenew: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateLongTermPricingRequest",
}) as any as S.Schema<UpdateLongTermPricingRequest>;
export interface UpdateLongTermPricingResult {}
export const UpdateLongTermPricingResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateLongTermPricingResult",
}) as any as S.Schema<UpdateLongTermPricingResult>;
export type CancelClusterError =
  | InvalidJobStateException
  | InvalidResourceException
  | KMSRequestFailedException
  | CommonErrors;
/**
 * Cancels a cluster job. You can only cancel a cluster job while it's in the
 * `AwaitingQuorum` status. You'll have at least an hour after creating a cluster
 * job to cancel it.
 */
export const cancelCluster: API.OperationMethod<
  CancelClusterRequest,
  CancelClusterResult,
  CancelClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelClusterRequest,
  output: CancelClusterResult,
  errors: [
    InvalidJobStateException,
    InvalidResourceException,
    KMSRequestFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelCluster",
}));

export type CancelJobError =
  | InvalidJobStateException
  | InvalidResourceException
  | KMSRequestFailedException
  | CommonErrors;
/**
 * Cancels the specified job. You can only cancel a job before its `JobState`
 * value changes to `PreparingAppliance`. Requesting the `ListJobs` or
 * `DescribeJob` action returns a job's `JobState` as part of the
 * response element data returned.
 */
export const cancelJob: API.OperationMethod<
  CancelJobRequest,
  CancelJobResult,
  CancelJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelJobRequest,
  output: CancelJobResult,
  errors: [
    InvalidJobStateException,
    InvalidResourceException,
    KMSRequestFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJob",
}));

export type CreateAddressError =
  | InvalidAddressException
  | UnsupportedAddressException
  | CommonErrors;
/**
 * Creates an address for a Snow device to be shipped to. In most regions,
 * addresses are validated at the time of creation. The address you provide must be located
 * within the serviceable area of your region. If the address is invalid or unsupported, then an
 * exception is thrown. If providing an address as a JSON file through the `cli-input-json` option, include the full file path. For example, `--cli-input-json file://create-address.json`.
 */
export const createAddress: API.OperationMethod<
  CreateAddressRequest,
  CreateAddressResult,
  CreateAddressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAddressRequest,
  output: CreateAddressResult,
  errors: [InvalidAddressException, UnsupportedAddressException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAddress",
}));

export type CreateClusterError =
  | Ec2RequestFailedException
  | InvalidInputCombinationException
  | InvalidResourceException
  | KMSRequestFailedException
  | CommonErrors;
/**
 * Creates an empty cluster. Each cluster supports five nodes. You use the CreateJob action separately to create the jobs for each of these nodes. The
 * cluster does not ship until these five node jobs have been created.
 */
export const createCluster: API.OperationMethod<
  CreateClusterRequest,
  CreateClusterResult,
  CreateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateClusterRequest,
  output: CreateClusterResult,
  errors: [
    Ec2RequestFailedException,
    InvalidInputCombinationException,
    InvalidResourceException,
    KMSRequestFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
}));

export type CreateJobError =
  | ClusterLimitExceededException
  | Ec2RequestFailedException
  | InvalidInputCombinationException
  | InvalidResourceException
  | KMSRequestFailedException
  | CommonErrors;
/**
 * Creates a job to import or export data between Amazon S3 and your on-premises data
 * center. Your Amazon Web Services account must have the right trust policies and permissions in
 * place to create a job for a Snow device. If you're creating a job for a node in a cluster, you
 * only need to provide the `clusterId` value; the other job attributes are inherited
 * from the cluster.
 *
 * Only the Snowball; Edge device type is supported when ordering clustered jobs.
 *
 * The device capacity is optional.
 *
 * Availability of device types differ by Amazon Web Services Region. For more information
 * about Region availability, see Amazon Web Services Regional Services.
 *
 * **Snow Family devices and their capacities.**
 *
 * - Device type: **SNC1_SSD**
 *
 * - Capacity: T14
 *
 * - Description: Snowcone
 *
 * - Device type: **SNC1_HDD**
 *
 * - Capacity: T8
 *
 * - Description: Snowcone
 *
 * - Device type: **EDGE_S**
 *
 * - Capacity: T98
 *
 * - Description: Snowball Edge Storage Optimized for data transfer only
 *
 * - Device type: **EDGE_CG**
 *
 * - Capacity: T42
 *
 * - Description: Snowball Edge Compute Optimized with GPU
 *
 * - Device type: **EDGE_C**
 *
 * - Capacity: T42
 *
 * - Description: Snowball Edge Compute Optimized without GPU
 *
 * - Device type: **EDGE**
 *
 * - Capacity: T100
 *
 * - Description: Snowball Edge Storage Optimized with EC2 Compute
 *
 * This device is replaced with T98.
 *
 * - Device type: **STANDARD**
 *
 * - Capacity: T50
 *
 * - Description: Original Snowball device
 *
 * This device is only available in the Ningxia, Beijing, and Singapore Amazon Web Services Region
 *
 * - Device type: **STANDARD**
 *
 * - Capacity: T80
 *
 * - Description: Original Snowball device
 *
 * This device is only available in the Ningxia, Beijing, and Singapore Amazon Web Services Region.
 *
 * - Snow Family device type: **RACK_5U_C**
 *
 * - Capacity: T13
 *
 * - Description: Snowblade.
 *
 * - Device type: **V3_5S**
 *
 * - Capacity: T240
 *
 * - Description: Snowball Edge Storage Optimized 210TB
 */
export const createJob: API.OperationMethod<
  CreateJobRequest,
  CreateJobResult,
  CreateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateJobRequest,
  output: CreateJobResult,
  errors: [
    ClusterLimitExceededException,
    Ec2RequestFailedException,
    InvalidInputCombinationException,
    InvalidResourceException,
    KMSRequestFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJob",
}));

export type CreateLongTermPricingError =
  | InvalidResourceException
  | CommonErrors;
/**
 * Creates a job with the long-term usage option for a device. The long-term usage is a
 * 1-year or 3-year long-term pricing type for the device. You are billed upfront, and Amazon Web Services provides discounts for long-term pricing.
 */
export const createLongTermPricing: API.OperationMethod<
  CreateLongTermPricingRequest,
  CreateLongTermPricingResult,
  CreateLongTermPricingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLongTermPricingRequest,
  output: CreateLongTermPricingResult,
  errors: [InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLongTermPricing",
}));

export type CreateReturnShippingLabelError =
  | ConflictException
  | InvalidInputCombinationException
  | InvalidJobStateException
  | InvalidResourceException
  | ReturnShippingLabelAlreadyExistsException
  | CommonErrors;
/**
 * Creates a shipping label that will be used to return the Snow device to Amazon Web Services.
 */
export const createReturnShippingLabel: API.OperationMethod<
  CreateReturnShippingLabelRequest,
  CreateReturnShippingLabelResult,
  CreateReturnShippingLabelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateReturnShippingLabelRequest,
  output: CreateReturnShippingLabelResult,
  errors: [
    ConflictException,
    InvalidInputCombinationException,
    InvalidJobStateException,
    InvalidResourceException,
    ReturnShippingLabelAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReturnShippingLabel",
}));

export type DescribeAddressError = InvalidResourceException | CommonErrors;
/**
 * Takes an `AddressId` and returns specific details about that address in the
 * form of an `Address` object.
 */
export const describeAddress: API.OperationMethod<
  DescribeAddressRequest,
  DescribeAddressResult,
  DescribeAddressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAddressRequest,
  output: DescribeAddressResult,
  errors: [InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAddress",
}));

export type DescribeAddressesError =
  | InvalidNextTokenException
  | InvalidResourceException
  | CommonErrors;
/**
 * Returns a specified number of `ADDRESS` objects. Calling this API in one of
 * the US regions will return addresses from the list of all addresses associated with this
 * account in all US regions.
 */
export const describeAddresses: API.PaginatedOperationMethod<
  DescribeAddressesRequest,
  DescribeAddressesResult,
  DescribeAddressesError,
  Credentials | HttpClient.HttpClient,
  Address
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeAddressesRequest,
  output: DescribeAddressesResult,
  errors: [InvalidNextTokenException, InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAddresses",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Addresses",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeClusterError = InvalidResourceException | CommonErrors;
/**
 * Returns information about a specific cluster including shipping information, cluster
 * status, and other important metadata.
 */
export const describeCluster: API.OperationMethod<
  DescribeClusterRequest,
  DescribeClusterResult,
  DescribeClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeClusterRequest,
  output: DescribeClusterResult,
  errors: [InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCluster",
}));

export type DescribeJobError = InvalidResourceException | CommonErrors;
/**
 * Returns information about a specific job including shipping information, job status,
 * and other important metadata.
 */
export const describeJob: API.OperationMethod<
  DescribeJobRequest,
  DescribeJobResult,
  DescribeJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeJobRequest,
  output: DescribeJobResult,
  errors: [InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJob",
}));

export type DescribeReturnShippingLabelError =
  | ConflictException
  | InvalidJobStateException
  | InvalidResourceException
  | CommonErrors;
/**
 * Information on the shipping label of a Snow device that is being returned to Amazon Web Services.
 */
export const describeReturnShippingLabel: API.OperationMethod<
  DescribeReturnShippingLabelRequest,
  DescribeReturnShippingLabelResult,
  DescribeReturnShippingLabelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeReturnShippingLabelRequest,
  output: DescribeReturnShippingLabelResult,
  errors: [
    ConflictException,
    InvalidJobStateException,
    InvalidResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReturnShippingLabel",
}));

export type GetJobManifestError =
  | InvalidJobStateException
  | InvalidResourceException
  | CommonErrors;
/**
 * Returns a link to an Amazon S3 presigned URL for the manifest file associated with the
 * specified `JobId` value. You can access the manifest file for up to 60 minutes
 * after this request has been made. To access the manifest file after 60 minutes have passed,
 * you'll have to make another call to the `GetJobManifest` action.
 *
 * The manifest is an encrypted file that you can download after your job enters the
 * `WithCustomer` status. This is the only valid status for calling this API as the
 * manifest and `UnlockCode` code value are used for securing your device and should
 * only be used when you have the device. The manifest is decrypted by using the
 * `UnlockCode` code value, when you pass both values to the Snow device through the
 * Snowball client when the client is started for the first time.
 *
 * As a best practice, we recommend that you don't save a copy of an
 * `UnlockCode` value in the same location as the manifest file for that job. Saving
 * these separately helps prevent unauthorized parties from gaining access to the Snow device
 * associated with that job.
 *
 * The credentials of a given job, including its manifest file and unlock code, expire 360
 * days after the job is created.
 */
export const getJobManifest: API.OperationMethod<
  GetJobManifestRequest,
  GetJobManifestResult,
  GetJobManifestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJobManifestRequest,
  output: GetJobManifestResult,
  errors: [InvalidJobStateException, InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobManifest",
}));

export type GetJobUnlockCodeError =
  | InvalidJobStateException
  | InvalidResourceException
  | CommonErrors;
/**
 * Returns the `UnlockCode` code value for the specified job. A particular
 * `UnlockCode` value can be accessed for up to 360 days after the associated job
 * has been created.
 *
 * The `UnlockCode` value is a 29-character code with 25 alphanumeric
 * characters and 4 hyphens. This code is used to decrypt the manifest file when it is passed
 * along with the manifest to the Snow device through the Snowball client when the client is
 * started for the first time. The only valid status for calling this API is
 * `WithCustomer` as the manifest and `Unlock` code values are used for
 * securing your device and should only be used when you have the device.
 *
 * As a best practice, we recommend that you don't save a copy of the
 * `UnlockCode` in the same location as the manifest file for that job. Saving these
 * separately helps prevent unauthorized parties from gaining access to the Snow device
 * associated with that job.
 */
export const getJobUnlockCode: API.OperationMethod<
  GetJobUnlockCodeRequest,
  GetJobUnlockCodeResult,
  GetJobUnlockCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJobUnlockCodeRequest,
  output: GetJobUnlockCodeResult,
  errors: [InvalidJobStateException, InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobUnlockCode",
}));

export type GetSnowballUsageError = CommonErrors;
/**
 * Returns information about the Snow Family service limit for your account, and also the
 * number of Snow devices your account has in use.
 *
 * The default service limit for the number of Snow devices that you can have at one time
 * is 1. If you want to increase your service limit, contact Amazon Web Services Support.
 */
export const getSnowballUsage: API.OperationMethod<
  GetSnowballUsageRequest,
  GetSnowballUsageResult,
  GetSnowballUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSnowballUsageRequest,
  output: GetSnowballUsageResult,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSnowballUsage",
}));

export type GetSoftwareUpdatesError =
  | InvalidJobStateException
  | InvalidResourceException
  | CommonErrors;
/**
 * Returns an Amazon S3 presigned URL for an update file associated with a specified
 * `JobId`.
 */
export const getSoftwareUpdates: API.OperationMethod<
  GetSoftwareUpdatesRequest,
  GetSoftwareUpdatesResult,
  GetSoftwareUpdatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSoftwareUpdatesRequest,
  output: GetSoftwareUpdatesResult,
  errors: [InvalidJobStateException, InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSoftwareUpdates",
}));

export type ListClusterJobsError =
  | InvalidNextTokenException
  | InvalidResourceException
  | CommonErrors;
/**
 * Returns an array of `JobListEntry` objects of the specified length. Each
 * `JobListEntry` object is for a job in the specified cluster and contains a job's
 * state, a job's ID, and other information.
 */
export const listClusterJobs: API.PaginatedOperationMethod<
  ListClusterJobsRequest,
  ListClusterJobsResult,
  ListClusterJobsError,
  Credentials | HttpClient.HttpClient,
  JobListEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListClusterJobsRequest,
  output: ListClusterJobsResult,
  errors: [InvalidNextTokenException, InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusterJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "JobListEntries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListClustersError = InvalidNextTokenException | CommonErrors;
/**
 * Returns an array of `ClusterListEntry` objects of the specified length. Each
 * `ClusterListEntry` object contains a cluster's state, a cluster's ID, and other
 * important status information.
 */
export const listClusters: API.PaginatedOperationMethod<
  ListClustersRequest,
  ListClustersResult,
  ListClustersError,
  Credentials | HttpClient.HttpClient,
  ClusterListEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListClustersRequest,
  output: ListClustersResult,
  errors: [InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ClusterListEntries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCompatibleImagesError =
  | Ec2RequestFailedException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * This action returns a list of the different Amazon EC2-compatible Amazon Machine Images (AMIs)
 * that are owned by your Amazon Web Services accountthat would be supported for use on a Snow
 * device. Currently, supported AMIs are based on the Amazon Linux-2, Ubuntu 20.04 LTS - Focal, or Ubuntu 22.04 LTS - Jammy images, available on the
 * Amazon Web Services Marketplace. Ubuntu 16.04 LTS - Xenial (HVM) images are no longer supported in the Market, but still supported for use on devices through Amazon EC2 VM Import/Export and running locally in AMIs.
 */
export const listCompatibleImages: API.PaginatedOperationMethod<
  ListCompatibleImagesRequest,
  ListCompatibleImagesResult,
  ListCompatibleImagesError,
  Credentials | HttpClient.HttpClient,
  CompatibleImage
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCompatibleImagesRequest,
  output: ListCompatibleImagesResult,
  errors: [Ec2RequestFailedException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCompatibleImages",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CompatibleImages",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListJobsError = InvalidNextTokenException | CommonErrors;
/**
 * Returns an array of `JobListEntry` objects of the specified length. Each
 * `JobListEntry` object contains a job's state, a job's ID, and a value that
 * indicates whether the job is a job part, in the case of export jobs. Calling this API action
 * in one of the US regions will return jobs from the list of all jobs associated with this
 * account in all US regions.
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResult,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  JobListEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobsRequest,
  output: ListJobsResult,
  errors: [InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "JobListEntries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLongTermPricingError =
  | InvalidNextTokenException
  | InvalidResourceException
  | CommonErrors;
/**
 * Lists all long-term pricing types.
 */
export const listLongTermPricing: API.PaginatedOperationMethod<
  ListLongTermPricingRequest,
  ListLongTermPricingResult,
  ListLongTermPricingError,
  Credentials | HttpClient.HttpClient,
  LongTermPricingListEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLongTermPricingRequest,
  output: ListLongTermPricingResult,
  errors: [InvalidNextTokenException, InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLongTermPricing",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LongTermPricingEntries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPickupLocationsError = InvalidResourceException | CommonErrors;
/**
 * A list of locations from which the customer can choose to pickup a device.
 */
export const listPickupLocations: API.PaginatedOperationMethod<
  ListPickupLocationsRequest,
  ListPickupLocationsResult,
  ListPickupLocationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPickupLocationsRequest,
  output: ListPickupLocationsResult,
  errors: [InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPickupLocations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceVersionsError =
  | InvalidNextTokenException
  | InvalidResourceException
  | CommonErrors;
/**
 * Lists all supported versions for Snow on-device services. Returns an
 * array of `ServiceVersion` object containing the supported versions for a particular service.
 */
export const listServiceVersions: API.OperationMethod<
  ListServiceVersionsRequest,
  ListServiceVersionsResult,
  ListServiceVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListServiceVersionsRequest,
  output: ListServiceVersionsResult,
  errors: [InvalidNextTokenException, InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceVersions",
}));

export type UpdateClusterError =
  | Ec2RequestFailedException
  | InvalidInputCombinationException
  | InvalidJobStateException
  | InvalidResourceException
  | KMSRequestFailedException
  | CommonErrors;
/**
 * While a cluster's `ClusterState` value is in the `AwaitingQuorum`
 * state, you can update some of the information associated with a cluster. Once the cluster
 * changes to a different job state, usually 60 minutes after the cluster being created, this
 * action is no longer available.
 */
export const updateCluster: API.OperationMethod<
  UpdateClusterRequest,
  UpdateClusterResult,
  UpdateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateClusterRequest,
  output: UpdateClusterResult,
  errors: [
    Ec2RequestFailedException,
    InvalidInputCombinationException,
    InvalidJobStateException,
    InvalidResourceException,
    KMSRequestFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCluster",
}));

export type UpdateJobError =
  | ClusterLimitExceededException
  | Ec2RequestFailedException
  | InvalidInputCombinationException
  | InvalidJobStateException
  | InvalidResourceException
  | KMSRequestFailedException
  | CommonErrors;
/**
 * While a job's `JobState` value is `New`, you can update some of
 * the information associated with a job. Once the job changes to a different job state, usually
 * within 60 minutes of the job being created, this action is no longer available.
 */
export const updateJob: API.OperationMethod<
  UpdateJobRequest,
  UpdateJobResult,
  UpdateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateJobRequest,
  output: UpdateJobResult,
  errors: [
    ClusterLimitExceededException,
    Ec2RequestFailedException,
    InvalidInputCombinationException,
    InvalidJobStateException,
    InvalidResourceException,
    KMSRequestFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJob",
}));

export type UpdateJobShipmentStateError =
  | InvalidJobStateException
  | InvalidResourceException
  | CommonErrors;
/**
 * Updates the state when a shipment state changes to a different state.
 */
export const updateJobShipmentState: API.OperationMethod<
  UpdateJobShipmentStateRequest,
  UpdateJobShipmentStateResult,
  UpdateJobShipmentStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateJobShipmentStateRequest,
  output: UpdateJobShipmentStateResult,
  errors: [InvalidJobStateException, InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJobShipmentState",
}));

export type UpdateLongTermPricingError =
  | InvalidResourceException
  | CommonErrors;
/**
 * Updates the long-term pricing type.
 */
export const updateLongTermPricing: API.OperationMethod<
  UpdateLongTermPricingRequest,
  UpdateLongTermPricingResult,
  UpdateLongTermPricingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLongTermPricingRequest,
  output: UpdateLongTermPricingResult,
  errors: [InvalidResourceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLongTermPricing",
}));
