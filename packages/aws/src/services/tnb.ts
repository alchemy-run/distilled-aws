import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc = T.AwsApiService({ sdkId: "tnb", serviceShapeName: "TNB" });
const auth = T.AwsAuthSigv4({ name: "tnb" });
const ver = T.ServiceVersion("2008-10-21");
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
              `https://tnb-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://tnb-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://tnb.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://tnb.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type NsLcmOpOccId = string;
export interface CancelSolNetworkOperationInput {
  nsLcmOpOccId: string;
}
export const CancelSolNetworkOperationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nsLcmOpOccId: S.String.pipe(T.HttpLabel("nsLcmOpOccId")) }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sol/nslcm/v1/ns_lcm_op_occs/{nsLcmOpOccId}/cancel",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelSolNetworkOperationInput",
}) as any as S.Schema<CancelSolNetworkOperationInput>;
export interface CancelSolNetworkOperationResponse {}
export const CancelSolNetworkOperationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelSolNetworkOperationResponse",
}) as any as S.Schema<CancelSolNetworkOperationResponse>;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateSolFunctionPackageInput {
  tags?: { [key: string]: string | undefined };
}
export const CreateSolFunctionPackageInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/sol/vnfpkgm/v1/vnf_packages" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSolFunctionPackageInput",
}) as any as S.Schema<CreateSolFunctionPackageInput>;
export type VnfPkgId = string;
export type VnfPkgArn = string;
export type OnboardingState = "CREATED" | "ONBOARDED" | "ERROR" | (string & {});
export const OnboardingState = S.String;

export type OperationalState = "ENABLED" | "DISABLED" | (string & {});
export const OperationalState = S.String;

export type UsageState = "IN_USE" | "NOT_IN_USE" | (string & {});
export const UsageState = S.String;

export interface CreateSolFunctionPackageOutput {
  id: string;
  arn: string;
  onboardingState: OnboardingState;
  operationalState: OperationalState;
  usageState: UsageState;
  tags?: { [key: string]: string | undefined };
}
export const CreateSolFunctionPackageOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    onboardingState: OnboardingState,
    operationalState: OperationalState,
    usageState: UsageState,
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateSolFunctionPackageOutput",
}) as any as S.Schema<CreateSolFunctionPackageOutput>;
export type NsdInfoId = string;
export interface CreateSolNetworkInstanceInput {
  nsdInfoId: string;
  nsName: string;
  nsDescription?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateSolNetworkInstanceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nsdInfoId: S.String,
    nsName: S.String,
    nsDescription: S.optional(S.String),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/sol/nslcm/v1/ns_instances" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSolNetworkInstanceInput",
}) as any as S.Schema<CreateSolNetworkInstanceInput>;
export type NsInstanceId = string;
export type NsInstanceArn = string;
export interface CreateSolNetworkInstanceOutput {
  id: string;
  arn: string;
  nsdInfoId: string;
  nsInstanceName: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateSolNetworkInstanceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    nsdInfoId: S.String,
    nsInstanceName: S.String,
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateSolNetworkInstanceOutput",
}) as any as S.Schema<CreateSolNetworkInstanceOutput>;
export interface CreateSolNetworkPackageInput {
  tags?: { [key: string]: string | undefined };
}
export const CreateSolNetworkPackageInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/sol/nsd/v1/ns_descriptors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSolNetworkPackageInput",
}) as any as S.Schema<CreateSolNetworkPackageInput>;
export type NsdInfoArn = string;
export type NsdOnboardingState =
  | "CREATED"
  | "ONBOARDED"
  | "ERROR"
  | (string & {});
export const NsdOnboardingState = S.String;

export type NsdOperationalState = "ENABLED" | "DISABLED" | (string & {});
export const NsdOperationalState = S.String;

export type NsdUsageState = "IN_USE" | "NOT_IN_USE" | (string & {});
export const NsdUsageState = S.String;

export interface CreateSolNetworkPackageOutput {
  id: string;
  arn: string;
  nsdOnboardingState: NsdOnboardingState;
  nsdOperationalState: NsdOperationalState;
  nsdUsageState: NsdUsageState;
  tags?: { [key: string]: string | undefined };
}
export const CreateSolNetworkPackageOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    nsdOnboardingState: NsdOnboardingState,
    nsdOperationalState: NsdOperationalState,
    nsdUsageState: NsdUsageState,
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateSolNetworkPackageOutput",
}) as any as S.Schema<CreateSolNetworkPackageOutput>;
export interface DeleteSolFunctionPackageInput {
  vnfPkgId: string;
}
export const DeleteSolFunctionPackageInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vnfPkgId: S.String.pipe(T.HttpLabel("vnfPkgId")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/sol/vnfpkgm/v1/vnf_packages/{vnfPkgId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSolFunctionPackageInput",
}) as any as S.Schema<DeleteSolFunctionPackageInput>;
export interface DeleteSolFunctionPackageResponse {}
export const DeleteSolFunctionPackageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSolFunctionPackageResponse",
}) as any as S.Schema<DeleteSolFunctionPackageResponse>;
export interface DeleteSolNetworkInstanceInput {
  nsInstanceId: string;
}
export const DeleteSolNetworkInstanceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nsInstanceId: S.String.pipe(T.HttpLabel("nsInstanceId")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/sol/nslcm/v1/ns_instances/{nsInstanceId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSolNetworkInstanceInput",
}) as any as S.Schema<DeleteSolNetworkInstanceInput>;
export interface DeleteSolNetworkInstanceResponse {}
export const DeleteSolNetworkInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSolNetworkInstanceResponse",
}) as any as S.Schema<DeleteSolNetworkInstanceResponse>;
export interface DeleteSolNetworkPackageInput {
  nsdInfoId: string;
}
export const DeleteSolNetworkPackageInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nsdInfoId: S.String.pipe(T.HttpLabel("nsdInfoId")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/sol/nsd/v1/ns_descriptors/{nsdInfoId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSolNetworkPackageInput",
}) as any as S.Schema<DeleteSolNetworkPackageInput>;
export interface DeleteSolNetworkPackageResponse {}
export const DeleteSolNetworkPackageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSolNetworkPackageResponse",
}) as any as S.Schema<DeleteSolNetworkPackageResponse>;
export type VnfInstanceId = string;
export interface GetSolFunctionInstanceInput {
  vnfInstanceId: string;
}
export const GetSolFunctionInstanceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vnfInstanceId: S.String.pipe(T.HttpLabel("vnfInstanceId")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sol/vnflcm/v1/vnf_instances/{vnfInstanceId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSolFunctionInstanceInput",
}) as any as S.Schema<GetSolFunctionInstanceInput>;
export type VnfInstanceArn = string;
export type VnfdId = string;
export type VnfInstantiationState =
  | "INSTANTIATED"
  | "NOT_INSTANTIATED"
  | (string & {});
export const VnfInstantiationState = S.String;

export type VnfOperationalState = "STARTED" | "STOPPED" | (string & {});
export const VnfOperationalState = S.String;

export interface GetSolVnfcResourceInfoMetadata {
  nodeGroup?: string;
  cluster?: string;
  helmChart?: string;
}
export const GetSolVnfcResourceInfoMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nodeGroup: S.optional(S.String),
    cluster: S.optional(S.String),
    helmChart: S.optional(S.String),
  }),
).annotate({
  identifier: "GetSolVnfcResourceInfoMetadata",
}) as any as S.Schema<GetSolVnfcResourceInfoMetadata>;
export interface GetSolVnfcResourceInfo {
  metadata?: GetSolVnfcResourceInfoMetadata;
}
export const GetSolVnfcResourceInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ metadata: S.optional(GetSolVnfcResourceInfoMetadata) }),
).annotate({
  identifier: "GetSolVnfcResourceInfo",
}) as any as S.Schema<GetSolVnfcResourceInfo>;
export type GetSolVnfcResourceInfoList = GetSolVnfcResourceInfo[];
export const GetSolVnfcResourceInfoList = /*@__PURE__*/ S.Array(
  GetSolVnfcResourceInfo,
);
export interface GetSolVnfInfo {
  vnfState?: VnfOperationalState;
  vnfcResourceInfo?: GetSolVnfcResourceInfo[];
}
export const GetSolVnfInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vnfState: S.optional(VnfOperationalState),
    vnfcResourceInfo: S.optional(GetSolVnfcResourceInfoList),
  }),
).annotate({ identifier: "GetSolVnfInfo" }) as any as S.Schema<GetSolVnfInfo>;
export interface GetSolFunctionInstanceMetadata {
  createdAt: Date;
  lastModified: Date;
}
export const GetSolFunctionInstanceMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModified: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetSolFunctionInstanceMetadata",
}) as any as S.Schema<GetSolFunctionInstanceMetadata>;
export interface GetSolFunctionInstanceOutput {
  id: string;
  arn: string;
  nsInstanceId: string;
  vnfPkgId: string;
  vnfdId: string;
  vnfProvider?: string;
  vnfProductName?: string;
  vnfdVersion?: string;
  instantiationState: VnfInstantiationState;
  instantiatedVnfInfo?: GetSolVnfInfo;
  metadata: GetSolFunctionInstanceMetadata;
  tags?: { [key: string]: string | undefined };
}
export const GetSolFunctionInstanceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    nsInstanceId: S.String,
    vnfPkgId: S.String,
    vnfdId: S.String,
    vnfProvider: S.optional(S.String),
    vnfProductName: S.optional(S.String),
    vnfdVersion: S.optional(S.String),
    instantiationState: VnfInstantiationState,
    instantiatedVnfInfo: S.optional(GetSolVnfInfo),
    metadata: GetSolFunctionInstanceMetadata,
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetSolFunctionInstanceOutput",
}) as any as S.Schema<GetSolFunctionInstanceOutput>;
export interface GetSolFunctionPackageInput {
  vnfPkgId: string;
}
export const GetSolFunctionPackageInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vnfPkgId: S.String.pipe(T.HttpLabel("vnfPkgId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sol/vnfpkgm/v1/vnf_packages/{vnfPkgId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSolFunctionPackageInput",
}) as any as S.Schema<GetSolFunctionPackageInput>;
export interface ToscaOverride {
  name?: string;
  defaultValue?: string;
}
export const ToscaOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), defaultValue: S.optional(S.String) }),
).annotate({ identifier: "ToscaOverride" }) as any as S.Schema<ToscaOverride>;
export type OverrideList = ToscaOverride[];
export const OverrideList = /*@__PURE__*/ S.Array(ToscaOverride);
export interface FunctionArtifactMeta {
  overrides?: ToscaOverride[];
}
export const FunctionArtifactMeta = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ overrides: S.optional(OverrideList) }),
).annotate({
  identifier: "FunctionArtifactMeta",
}) as any as S.Schema<FunctionArtifactMeta>;
export interface GetSolFunctionPackageMetadata {
  vnfd?: FunctionArtifactMeta;
  createdAt: Date;
  lastModified: Date;
}
export const GetSolFunctionPackageMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vnfd: S.optional(FunctionArtifactMeta),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModified: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetSolFunctionPackageMetadata",
}) as any as S.Schema<GetSolFunctionPackageMetadata>;
export interface GetSolFunctionPackageOutput {
  id: string;
  arn: string;
  onboardingState: OnboardingState;
  operationalState: OperationalState;
  usageState: UsageState;
  vnfdId?: string;
  vnfProvider?: string;
  vnfProductName?: string;
  vnfdVersion?: string;
  metadata?: GetSolFunctionPackageMetadata;
  tags?: { [key: string]: string | undefined };
}
export const GetSolFunctionPackageOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    onboardingState: OnboardingState,
    operationalState: OperationalState,
    usageState: UsageState,
    vnfdId: S.optional(S.String),
    vnfProvider: S.optional(S.String),
    vnfProductName: S.optional(S.String),
    vnfdVersion: S.optional(S.String),
    metadata: S.optional(GetSolFunctionPackageMetadata),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetSolFunctionPackageOutput",
}) as any as S.Schema<GetSolFunctionPackageOutput>;
export type PackageContentType = "application/zip" | (string & {});
export const PackageContentType = S.String;

export interface GetSolFunctionPackageContentInput {
  vnfPkgId: string;
  accept: PackageContentType;
}
export const GetSolFunctionPackageContentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vnfPkgId: S.String.pipe(T.HttpLabel("vnfPkgId")),
    accept: PackageContentType.pipe(T.HttpHeader("Accept")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sol/vnfpkgm/v1/vnf_packages/{vnfPkgId}/package_content",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSolFunctionPackageContentInput",
}) as any as S.Schema<GetSolFunctionPackageContentInput>;
export interface GetSolFunctionPackageContentOutput {
  contentType?: PackageContentType;
  packageContent?: Uint8Array;
}
export const GetSolFunctionPackageContentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contentType: S.optional(PackageContentType).pipe(
      T.HttpHeader("Content-Type"),
    ),
    packageContent: S.optional(T.Blob).pipe(T.HttpPayload()),
  }),
).annotate({
  identifier: "GetSolFunctionPackageContentOutput",
}) as any as S.Schema<GetSolFunctionPackageContentOutput>;
export type DescriptorContentType = "text/plain" | (string & {});
export const DescriptorContentType = S.String;

export interface GetSolFunctionPackageDescriptorInput {
  vnfPkgId: string;
  accept: DescriptorContentType;
}
export const GetSolFunctionPackageDescriptorInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      vnfPkgId: S.String.pipe(T.HttpLabel("vnfPkgId")),
      accept: DescriptorContentType.pipe(T.HttpHeader("Accept")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/sol/vnfpkgm/v1/vnf_packages/{vnfPkgId}/vnfd",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetSolFunctionPackageDescriptorInput",
}) as any as S.Schema<GetSolFunctionPackageDescriptorInput>;
export interface GetSolFunctionPackageDescriptorOutput {
  contentType?: DescriptorContentType;
  vnfd?: Uint8Array;
}
export const GetSolFunctionPackageDescriptorOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      contentType: S.optional(DescriptorContentType).pipe(
        T.HttpHeader("Content-Type"),
      ),
      vnfd: S.optional(T.Blob).pipe(T.HttpPayload()),
    }),
).annotate({
  identifier: "GetSolFunctionPackageDescriptorOutput",
}) as any as S.Schema<GetSolFunctionPackageDescriptorOutput>;
export interface GetSolNetworkInstanceInput {
  nsInstanceId: string;
}
export const GetSolNetworkInstanceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nsInstanceId: S.String.pipe(T.HttpLabel("nsInstanceId")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sol/nslcm/v1/ns_instances/{nsInstanceId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSolNetworkInstanceInput",
}) as any as S.Schema<GetSolNetworkInstanceInput>;
export type NsdId = string;
export type NsState =
  | "INSTANTIATED"
  | "NOT_INSTANTIATED"
  | "UPDATED"
  | "IMPAIRED"
  | "UPDATE_FAILED"
  | "STOPPED"
  | "DELETED"
  | "INSTANTIATE_IN_PROGRESS"
  | "INTENT_TO_UPDATE_IN_PROGRESS"
  | "UPDATE_IN_PROGRESS"
  | "TERMINATE_IN_PROGRESS"
  | (string & {});
export const NsState = S.String;

export interface LcmOperationInfo {
  nsLcmOpOccId: string;
}
export const LcmOperationInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nsLcmOpOccId: S.String }),
).annotate({
  identifier: "LcmOperationInfo",
}) as any as S.Schema<LcmOperationInfo>;
export interface GetSolNetworkInstanceMetadata {
  createdAt: Date;
  lastModified: Date;
}
export const GetSolNetworkInstanceMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModified: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetSolNetworkInstanceMetadata",
}) as any as S.Schema<GetSolNetworkInstanceMetadata>;
export interface GetSolNetworkInstanceOutput {
  id: string;
  arn: string;
  nsInstanceName: string;
  nsInstanceDescription: string;
  nsdId: string;
  nsdInfoId: string;
  nsState?: NsState;
  lcmOpInfo?: LcmOperationInfo;
  metadata: GetSolNetworkInstanceMetadata;
  tags?: { [key: string]: string | undefined };
}
export const GetSolNetworkInstanceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    nsInstanceName: S.String,
    nsInstanceDescription: S.String,
    nsdId: S.String,
    nsdInfoId: S.String,
    nsState: S.optional(NsState),
    lcmOpInfo: S.optional(LcmOperationInfo),
    metadata: GetSolNetworkInstanceMetadata,
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetSolNetworkInstanceOutput",
}) as any as S.Schema<GetSolNetworkInstanceOutput>;
export interface GetSolNetworkOperationInput {
  nsLcmOpOccId: string;
}
export const GetSolNetworkOperationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nsLcmOpOccId: S.String.pipe(T.HttpLabel("nsLcmOpOccId")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sol/nslcm/v1/ns_lcm_op_occs/{nsLcmOpOccId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSolNetworkOperationInput",
}) as any as S.Schema<GetSolNetworkOperationInput>;
export type NsLcmOpOccArn = string;
export type NsLcmOperationState =
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLING"
  | "CANCELLED"
  | (string & {});
export const NsLcmOperationState = S.String;

export type LcmOperationType =
  | "INSTANTIATE"
  | "UPDATE"
  | "TERMINATE"
  | (string & {});
export const LcmOperationType = S.String;

export type UpdateSolNetworkType =
  | "MODIFY_VNF_INFORMATION"
  | "UPDATE_NS"
  | (string & {});
export const UpdateSolNetworkType = S.String;

export interface ProblemDetails {
  detail: string;
  title?: string;
}
export const ProblemDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ detail: S.String, title: S.optional(S.String) }),
).annotate({ identifier: "ProblemDetails" }) as any as S.Schema<ProblemDetails>;
export interface UpdateNsMetadata {
  nsdInfoId: string;
  additionalParamsForNs?: any;
}
export const UpdateNsMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nsdInfoId: S.String, additionalParamsForNs: S.optional(S.Any) }),
).annotate({
  identifier: "UpdateNsMetadata",
}) as any as S.Schema<UpdateNsMetadata>;
export interface ModifyVnfInfoMetadata {
  vnfInstanceId: string;
  vnfConfigurableProperties: any;
}
export const ModifyVnfInfoMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vnfInstanceId: S.String, vnfConfigurableProperties: S.Any }),
).annotate({
  identifier: "ModifyVnfInfoMetadata",
}) as any as S.Schema<ModifyVnfInfoMetadata>;
export interface InstantiateMetadata {
  nsdInfoId: string;
  additionalParamsForNs?: any;
}
export const InstantiateMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nsdInfoId: S.String, additionalParamsForNs: S.optional(S.Any) }),
).annotate({
  identifier: "InstantiateMetadata",
}) as any as S.Schema<InstantiateMetadata>;
export interface GetSolNetworkOperationMetadata {
  updateNsMetadata?: UpdateNsMetadata;
  modifyVnfInfoMetadata?: ModifyVnfInfoMetadata;
  instantiateMetadata?: InstantiateMetadata;
  createdAt: Date;
  lastModified: Date;
}
export const GetSolNetworkOperationMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    updateNsMetadata: S.optional(UpdateNsMetadata),
    modifyVnfInfoMetadata: S.optional(ModifyVnfInfoMetadata),
    instantiateMetadata: S.optional(InstantiateMetadata),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModified: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetSolNetworkOperationMetadata",
}) as any as S.Schema<GetSolNetworkOperationMetadata>;
export type StringMap = { [key: string]: string | undefined };
export const StringMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ErrorCause = string;
export type ErrorDetails = string;
export interface ErrorInfo {
  cause?: string;
  details?: string;
}
export const ErrorInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cause: S.optional(S.String), details: S.optional(S.String) }),
).annotate({ identifier: "ErrorInfo" }) as any as S.Schema<ErrorInfo>;
export type TaskStatus =
  | "SCHEDULED"
  | "STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ERROR"
  | "SKIPPED"
  | "CANCELLED"
  | (string & {});
export const TaskStatus = S.String;

export interface GetSolNetworkOperationTaskDetails {
  taskName?: string;
  taskContext?: { [key: string]: string | undefined };
  taskErrorDetails?: ErrorInfo;
  taskStatus?: TaskStatus;
  taskStartTime?: Date;
  taskEndTime?: Date;
}
export const GetSolNetworkOperationTaskDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    taskName: S.optional(S.String),
    taskContext: S.optional(StringMap),
    taskErrorDetails: S.optional(ErrorInfo),
    taskStatus: S.optional(TaskStatus),
    taskStartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    taskEndTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetSolNetworkOperationTaskDetails",
}) as any as S.Schema<GetSolNetworkOperationTaskDetails>;
export type GetSolNetworkOperationTasksList =
  GetSolNetworkOperationTaskDetails[];
export const GetSolNetworkOperationTasksList = /*@__PURE__*/ S.Array(
  GetSolNetworkOperationTaskDetails,
);
export interface GetSolNetworkOperationOutput {
  id?: string;
  arn: string;
  operationState?: NsLcmOperationState;
  nsInstanceId?: string;
  lcmOperationType?: LcmOperationType;
  updateType?: UpdateSolNetworkType;
  error?: ProblemDetails;
  metadata?: GetSolNetworkOperationMetadata;
  tasks?: GetSolNetworkOperationTaskDetails[];
  tags?: { [key: string]: string | undefined };
}
export const GetSolNetworkOperationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.String,
    operationState: S.optional(NsLcmOperationState),
    nsInstanceId: S.optional(S.String),
    lcmOperationType: S.optional(LcmOperationType),
    updateType: S.optional(UpdateSolNetworkType),
    error: S.optional(ProblemDetails),
    metadata: S.optional(GetSolNetworkOperationMetadata),
    tasks: S.optional(GetSolNetworkOperationTasksList),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetSolNetworkOperationOutput",
}) as any as S.Schema<GetSolNetworkOperationOutput>;
export interface GetSolNetworkPackageInput {
  nsdInfoId: string;
}
export const GetSolNetworkPackageInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nsdInfoId: S.String.pipe(T.HttpLabel("nsdInfoId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sol/nsd/v1/ns_descriptors/{nsdInfoId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSolNetworkPackageInput",
}) as any as S.Schema<GetSolNetworkPackageInput>;
export type VnfPkgIdList = string[];
export const VnfPkgIdList = /*@__PURE__*/ S.Array(S.String);
export interface NetworkArtifactMeta {
  overrides?: ToscaOverride[];
}
export const NetworkArtifactMeta = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ overrides: S.optional(OverrideList) }),
).annotate({
  identifier: "NetworkArtifactMeta",
}) as any as S.Schema<NetworkArtifactMeta>;
export interface GetSolNetworkPackageMetadata {
  nsd?: NetworkArtifactMeta;
  createdAt: Date;
  lastModified: Date;
}
export const GetSolNetworkPackageMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nsd: S.optional(NetworkArtifactMeta),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModified: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "GetSolNetworkPackageMetadata",
}) as any as S.Schema<GetSolNetworkPackageMetadata>;
export interface GetSolNetworkPackageOutput {
  id: string;
  arn: string;
  nsdOnboardingState: NsdOnboardingState;
  nsdOperationalState: NsdOperationalState;
  nsdUsageState: NsdUsageState;
  nsdId: string;
  nsdName: string;
  nsdVersion: string;
  vnfPkgIds: string[];
  metadata: GetSolNetworkPackageMetadata;
  tags?: { [key: string]: string | undefined };
}
export const GetSolNetworkPackageOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    nsdOnboardingState: NsdOnboardingState,
    nsdOperationalState: NsdOperationalState,
    nsdUsageState: NsdUsageState,
    nsdId: S.String,
    nsdName: S.String,
    nsdVersion: S.String,
    vnfPkgIds: VnfPkgIdList,
    metadata: GetSolNetworkPackageMetadata,
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetSolNetworkPackageOutput",
}) as any as S.Schema<GetSolNetworkPackageOutput>;
export interface GetSolNetworkPackageContentInput {
  nsdInfoId: string;
  accept: PackageContentType;
}
export const GetSolNetworkPackageContentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nsdInfoId: S.String.pipe(T.HttpLabel("nsdInfoId")),
    accept: PackageContentType.pipe(T.HttpHeader("Accept")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sol/nsd/v1/ns_descriptors/{nsdInfoId}/nsd_content",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSolNetworkPackageContentInput",
}) as any as S.Schema<GetSolNetworkPackageContentInput>;
export interface GetSolNetworkPackageContentOutput {
  contentType?: PackageContentType;
  nsdContent?: Uint8Array;
}
export const GetSolNetworkPackageContentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contentType: S.optional(PackageContentType).pipe(
      T.HttpHeader("Content-Type"),
    ),
    nsdContent: S.optional(T.Blob).pipe(T.HttpPayload()),
  }),
).annotate({
  identifier: "GetSolNetworkPackageContentOutput",
}) as any as S.Schema<GetSolNetworkPackageContentOutput>;
export interface GetSolNetworkPackageDescriptorInput {
  nsdInfoId: string;
}
export const GetSolNetworkPackageDescriptorInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nsdInfoId: S.String.pipe(T.HttpLabel("nsdInfoId")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sol/nsd/v1/ns_descriptors/{nsdInfoId}/nsd",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSolNetworkPackageDescriptorInput",
}) as any as S.Schema<GetSolNetworkPackageDescriptorInput>;
export interface GetSolNetworkPackageDescriptorOutput {
  contentType?: DescriptorContentType;
  nsd?: Uint8Array;
}
export const GetSolNetworkPackageDescriptorOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      contentType: S.optional(DescriptorContentType).pipe(
        T.HttpHeader("Content-Type"),
      ),
      nsd: S.optional(T.Blob).pipe(T.HttpPayload()),
    }),
).annotate({
  identifier: "GetSolNetworkPackageDescriptorOutput",
}) as any as S.Schema<GetSolNetworkPackageDescriptorOutput>;
export interface InstantiateSolNetworkInstanceInput {
  nsInstanceId: string;
  dryRun?: boolean;
  additionalParamsForNs?: any;
  tags?: { [key: string]: string | undefined };
}
export const InstantiateSolNetworkInstanceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nsInstanceId: S.String.pipe(T.HttpLabel("nsInstanceId")),
    dryRun: S.optional(S.Boolean).pipe(T.HttpQuery("dry_run")),
    additionalParamsForNs: S.optional(S.Any),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sol/nslcm/v1/ns_instances/{nsInstanceId}/instantiate",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "InstantiateSolNetworkInstanceInput",
}) as any as S.Schema<InstantiateSolNetworkInstanceInput>;
export interface InstantiateSolNetworkInstanceOutput {
  nsLcmOpOccId: string;
  tags?: { [key: string]: string | undefined };
}
export const InstantiateSolNetworkInstanceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nsLcmOpOccId: S.String, tags: S.optional(TagMap) }),
).annotate({
  identifier: "InstantiateSolNetworkInstanceOutput",
}) as any as S.Schema<InstantiateSolNetworkInstanceOutput>;
export type PaginationToken = string;
export interface ListSolFunctionInstancesInput {
  maxResults?: number;
  nextToken?: string;
}
export const ListSolFunctionInstancesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextpage_opaque_marker")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sol/vnflcm/v1/vnf_instances" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSolFunctionInstancesInput",
}) as any as S.Schema<ListSolFunctionInstancesInput>;
export interface GetSolInstantiatedVnfInfo {
  vnfState?: VnfOperationalState;
}
export const GetSolInstantiatedVnfInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vnfState: S.optional(VnfOperationalState) }),
).annotate({
  identifier: "GetSolInstantiatedVnfInfo",
}) as any as S.Schema<GetSolInstantiatedVnfInfo>;
export interface ListSolFunctionInstanceMetadata {
  createdAt: Date;
  lastModified: Date;
}
export const ListSolFunctionInstanceMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModified: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ListSolFunctionInstanceMetadata",
}) as any as S.Schema<ListSolFunctionInstanceMetadata>;
export interface ListSolFunctionInstanceInfo {
  id: string;
  arn: string;
  nsInstanceId: string;
  vnfPkgId: string;
  vnfPkgName?: string;
  instantiationState: VnfInstantiationState;
  instantiatedVnfInfo?: GetSolInstantiatedVnfInfo;
  metadata: ListSolFunctionInstanceMetadata;
}
export const ListSolFunctionInstanceInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    nsInstanceId: S.String,
    vnfPkgId: S.String,
    vnfPkgName: S.optional(S.String),
    instantiationState: VnfInstantiationState,
    instantiatedVnfInfo: S.optional(GetSolInstantiatedVnfInfo),
    metadata: ListSolFunctionInstanceMetadata,
  }),
).annotate({
  identifier: "ListSolFunctionInstanceInfo",
}) as any as S.Schema<ListSolFunctionInstanceInfo>;
export type ListSolFunctionInstanceResources = ListSolFunctionInstanceInfo[];
export const ListSolFunctionInstanceResources = /*@__PURE__*/ S.Array(
  ListSolFunctionInstanceInfo,
);
export interface ListSolFunctionInstancesOutput {
  nextToken?: string;
  functionInstances?: ListSolFunctionInstanceInfo[];
}
export const ListSolFunctionInstancesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    functionInstances: S.optional(ListSolFunctionInstanceResources),
  }),
).annotate({
  identifier: "ListSolFunctionInstancesOutput",
}) as any as S.Schema<ListSolFunctionInstancesOutput>;
export interface ListSolFunctionPackagesInput {
  maxResults?: number;
  nextToken?: string;
}
export const ListSolFunctionPackagesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextpage_opaque_marker")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sol/vnfpkgm/v1/vnf_packages" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSolFunctionPackagesInput",
}) as any as S.Schema<ListSolFunctionPackagesInput>;
export interface ListSolFunctionPackageMetadata {
  createdAt: Date;
  lastModified: Date;
}
export const ListSolFunctionPackageMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModified: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ListSolFunctionPackageMetadata",
}) as any as S.Schema<ListSolFunctionPackageMetadata>;
export interface ListSolFunctionPackageInfo {
  id: string;
  arn: string;
  onboardingState: OnboardingState;
  operationalState: OperationalState;
  usageState: UsageState;
  vnfdId?: string;
  vnfProvider?: string;
  vnfProductName?: string;
  vnfdVersion?: string;
  metadata?: ListSolFunctionPackageMetadata;
}
export const ListSolFunctionPackageInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    onboardingState: OnboardingState,
    operationalState: OperationalState,
    usageState: UsageState,
    vnfdId: S.optional(S.String),
    vnfProvider: S.optional(S.String),
    vnfProductName: S.optional(S.String),
    vnfdVersion: S.optional(S.String),
    metadata: S.optional(ListSolFunctionPackageMetadata),
  }),
).annotate({
  identifier: "ListSolFunctionPackageInfo",
}) as any as S.Schema<ListSolFunctionPackageInfo>;
export type ListSolFunctionPackageResources = ListSolFunctionPackageInfo[];
export const ListSolFunctionPackageResources = /*@__PURE__*/ S.Array(
  ListSolFunctionPackageInfo,
);
export interface ListSolFunctionPackagesOutput {
  nextToken?: string;
  functionPackages: ListSolFunctionPackageInfo[];
}
export const ListSolFunctionPackagesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    functionPackages: ListSolFunctionPackageResources,
  }),
).annotate({
  identifier: "ListSolFunctionPackagesOutput",
}) as any as S.Schema<ListSolFunctionPackagesOutput>;
export interface ListSolNetworkInstancesInput {
  maxResults?: number;
  nextToken?: string;
}
export const ListSolNetworkInstancesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextpage_opaque_marker")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sol/nslcm/v1/ns_instances" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSolNetworkInstancesInput",
}) as any as S.Schema<ListSolNetworkInstancesInput>;
export interface ListSolNetworkInstanceMetadata {
  createdAt: Date;
  lastModified: Date;
}
export const ListSolNetworkInstanceMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModified: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ListSolNetworkInstanceMetadata",
}) as any as S.Schema<ListSolNetworkInstanceMetadata>;
export interface ListSolNetworkInstanceInfo {
  id: string;
  arn: string;
  nsInstanceName: string;
  nsInstanceDescription: string;
  nsdId: string;
  nsdInfoId: string;
  nsState: NsState;
  metadata: ListSolNetworkInstanceMetadata;
}
export const ListSolNetworkInstanceInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    nsInstanceName: S.String,
    nsInstanceDescription: S.String,
    nsdId: S.String,
    nsdInfoId: S.String,
    nsState: NsState,
    metadata: ListSolNetworkInstanceMetadata,
  }),
).annotate({
  identifier: "ListSolNetworkInstanceInfo",
}) as any as S.Schema<ListSolNetworkInstanceInfo>;
export type ListSolNetworkInstanceResources = ListSolNetworkInstanceInfo[];
export const ListSolNetworkInstanceResources = /*@__PURE__*/ S.Array(
  ListSolNetworkInstanceInfo,
);
export interface ListSolNetworkInstancesOutput {
  nextToken?: string;
  networkInstances?: ListSolNetworkInstanceInfo[];
}
export const ListSolNetworkInstancesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    networkInstances: S.optional(ListSolNetworkInstanceResources),
  }),
).annotate({
  identifier: "ListSolNetworkInstancesOutput",
}) as any as S.Schema<ListSolNetworkInstancesOutput>;
export interface ListSolNetworkOperationsInput {
  nsInstanceId?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListSolNetworkOperationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nsInstanceId: S.optional(S.String).pipe(T.HttpQuery("nsInstanceId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextpage_opaque_marker")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sol/nslcm/v1/ns_lcm_op_occs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSolNetworkOperationsInput",
}) as any as S.Schema<ListSolNetworkOperationsInput>;
export interface ListSolNetworkOperationsMetadata {
  nsdInfoId?: string;
  vnfInstanceId?: string;
  createdAt: Date;
  lastModified: Date;
}
export const ListSolNetworkOperationsMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nsdInfoId: S.optional(S.String),
    vnfInstanceId: S.optional(S.String),
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModified: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ListSolNetworkOperationsMetadata",
}) as any as S.Schema<ListSolNetworkOperationsMetadata>;
export interface ListSolNetworkOperationsInfo {
  id: string;
  arn: string;
  operationState: NsLcmOperationState;
  nsInstanceId: string;
  lcmOperationType: LcmOperationType;
  updateType?: UpdateSolNetworkType;
  error?: ProblemDetails;
  metadata?: ListSolNetworkOperationsMetadata;
}
export const ListSolNetworkOperationsInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    operationState: NsLcmOperationState,
    nsInstanceId: S.String,
    lcmOperationType: LcmOperationType,
    updateType: S.optional(UpdateSolNetworkType),
    error: S.optional(ProblemDetails),
    metadata: S.optional(ListSolNetworkOperationsMetadata),
  }),
).annotate({
  identifier: "ListSolNetworkOperationsInfo",
}) as any as S.Schema<ListSolNetworkOperationsInfo>;
export type ListSolNetworkOperationsResources = ListSolNetworkOperationsInfo[];
export const ListSolNetworkOperationsResources = /*@__PURE__*/ S.Array(
  ListSolNetworkOperationsInfo,
);
export interface ListSolNetworkOperationsOutput {
  nextToken?: string;
  networkOperations?: ListSolNetworkOperationsInfo[];
}
export const ListSolNetworkOperationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    networkOperations: S.optional(ListSolNetworkOperationsResources),
  }),
).annotate({
  identifier: "ListSolNetworkOperationsOutput",
}) as any as S.Schema<ListSolNetworkOperationsOutput>;
export interface ListSolNetworkPackagesInput {
  maxResults?: number;
  nextToken?: string;
}
export const ListSolNetworkPackagesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextpage_opaque_marker")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sol/nsd/v1/ns_descriptors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSolNetworkPackagesInput",
}) as any as S.Schema<ListSolNetworkPackagesInput>;
export interface ListSolNetworkPackageMetadata {
  createdAt: Date;
  lastModified: Date;
}
export const ListSolNetworkPackageMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    lastModified: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "ListSolNetworkPackageMetadata",
}) as any as S.Schema<ListSolNetworkPackageMetadata>;
export interface ListSolNetworkPackageInfo {
  id: string;
  arn: string;
  nsdOnboardingState: NsdOnboardingState;
  nsdOperationalState: NsdOperationalState;
  nsdUsageState: NsdUsageState;
  nsdId?: string;
  nsdName?: string;
  nsdVersion?: string;
  nsdDesigner?: string;
  nsdInvariantId?: string;
  vnfPkgIds?: string[];
  metadata: ListSolNetworkPackageMetadata;
}
export const ListSolNetworkPackageInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    nsdOnboardingState: NsdOnboardingState,
    nsdOperationalState: NsdOperationalState,
    nsdUsageState: NsdUsageState,
    nsdId: S.optional(S.String),
    nsdName: S.optional(S.String),
    nsdVersion: S.optional(S.String),
    nsdDesigner: S.optional(S.String),
    nsdInvariantId: S.optional(S.String),
    vnfPkgIds: S.optional(VnfPkgIdList),
    metadata: ListSolNetworkPackageMetadata,
  }),
).annotate({
  identifier: "ListSolNetworkPackageInfo",
}) as any as S.Schema<ListSolNetworkPackageInfo>;
export type ListSolNetworkPackageResources = ListSolNetworkPackageInfo[];
export const ListSolNetworkPackageResources = /*@__PURE__*/ S.Array(
  ListSolNetworkPackageInfo,
);
export interface ListSolNetworkPackagesOutput {
  nextToken?: string;
  networkPackages: ListSolNetworkPackageInfo[];
}
export const ListSolNetworkPackagesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    networkPackages: ListSolNetworkPackageResources,
  }),
).annotate({
  identifier: "ListSolNetworkPackagesOutput",
}) as any as S.Schema<ListSolNetworkPackagesOutput>;
export type TNBResourceArn = string;
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
  tags: { [key: string]: string | undefined };
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: TagMap }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface PutSolFunctionPackageContentInput {
  vnfPkgId: string;
  contentType?: PackageContentType;
  file: T.StreamingInputBody;
}
export const PutSolFunctionPackageContentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vnfPkgId: S.String.pipe(T.HttpLabel("vnfPkgId")),
    contentType: S.optional(PackageContentType).pipe(
      T.HttpHeader("Content-Type"),
    ),
    file: T.StreamingInput.pipe(T.HttpPayload()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/sol/vnfpkgm/v1/vnf_packages/{vnfPkgId}/package_content",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutSolFunctionPackageContentInput",
}) as any as S.Schema<PutSolFunctionPackageContentInput>;
export interface PutSolFunctionPackageContentMetadata {
  vnfd?: FunctionArtifactMeta;
}
export const PutSolFunctionPackageContentMetadata = /*@__PURE__*/ S.suspend(
  () => S.Struct({ vnfd: S.optional(FunctionArtifactMeta) }),
).annotate({
  identifier: "PutSolFunctionPackageContentMetadata",
}) as any as S.Schema<PutSolFunctionPackageContentMetadata>;
export interface PutSolFunctionPackageContentOutput {
  id: string;
  vnfdId: string;
  vnfProductName: string;
  vnfProvider: string;
  vnfdVersion: string;
  metadata: PutSolFunctionPackageContentMetadata;
}
export const PutSolFunctionPackageContentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    vnfdId: S.String,
    vnfProductName: S.String,
    vnfProvider: S.String,
    vnfdVersion: S.String,
    metadata: PutSolFunctionPackageContentMetadata,
  }),
).annotate({
  identifier: "PutSolFunctionPackageContentOutput",
}) as any as S.Schema<PutSolFunctionPackageContentOutput>;
export interface PutSolNetworkPackageContentInput {
  nsdInfoId: string;
  contentType?: PackageContentType;
  file: T.StreamingInputBody;
}
export const PutSolNetworkPackageContentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nsdInfoId: S.String.pipe(T.HttpLabel("nsdInfoId")),
    contentType: S.optional(PackageContentType).pipe(
      T.HttpHeader("Content-Type"),
    ),
    file: T.StreamingInput.pipe(T.HttpPayload()),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/sol/nsd/v1/ns_descriptors/{nsdInfoId}/nsd_content",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutSolNetworkPackageContentInput",
}) as any as S.Schema<PutSolNetworkPackageContentInput>;
export interface PutSolNetworkPackageContentMetadata {
  nsd?: NetworkArtifactMeta;
}
export const PutSolNetworkPackageContentMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nsd: S.optional(NetworkArtifactMeta) }),
).annotate({
  identifier: "PutSolNetworkPackageContentMetadata",
}) as any as S.Schema<PutSolNetworkPackageContentMetadata>;
export interface PutSolNetworkPackageContentOutput {
  id: string;
  arn: string;
  nsdId: string;
  nsdName: string;
  nsdVersion: string;
  vnfPkgIds: string[];
  metadata: PutSolNetworkPackageContentMetadata;
}
export const PutSolNetworkPackageContentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    nsdId: S.String,
    nsdName: S.String,
    nsdVersion: S.String,
    vnfPkgIds: VnfPkgIdList,
    metadata: PutSolNetworkPackageContentMetadata,
  }),
).annotate({
  identifier: "PutSolNetworkPackageContentOutput",
}) as any as S.Schema<PutSolNetworkPackageContentOutput>;
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagMap,
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
export interface TerminateSolNetworkInstanceInput {
  nsInstanceId: string;
  tags?: { [key: string]: string | undefined };
}
export const TerminateSolNetworkInstanceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nsInstanceId: S.String.pipe(T.HttpLabel("nsInstanceId")),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sol/nslcm/v1/ns_instances/{nsInstanceId}/terminate",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TerminateSolNetworkInstanceInput",
}) as any as S.Schema<TerminateSolNetworkInstanceInput>;
export interface TerminateSolNetworkInstanceOutput {
  nsLcmOpOccId?: string;
  tags?: { [key: string]: string | undefined };
}
export const TerminateSolNetworkInstanceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nsLcmOpOccId: S.optional(S.String), tags: S.optional(TagMap) }),
).annotate({
  identifier: "TerminateSolNetworkInstanceOutput",
}) as any as S.Schema<TerminateSolNetworkInstanceOutput>;
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
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
export interface UpdateSolFunctionPackageInput {
  vnfPkgId: string;
  operationalState: OperationalState;
}
export const UpdateSolFunctionPackageInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    vnfPkgId: S.String.pipe(T.HttpLabel("vnfPkgId")),
    operationalState: OperationalState,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/sol/vnfpkgm/v1/vnf_packages/{vnfPkgId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSolFunctionPackageInput",
}) as any as S.Schema<UpdateSolFunctionPackageInput>;
export interface UpdateSolFunctionPackageOutput {
  operationalState: OperationalState;
}
export const UpdateSolFunctionPackageOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ operationalState: OperationalState }),
).annotate({
  identifier: "UpdateSolFunctionPackageOutput",
}) as any as S.Schema<UpdateSolFunctionPackageOutput>;
export interface UpdateSolNetworkModify {
  vnfInstanceId: string;
  vnfConfigurableProperties: any;
}
export const UpdateSolNetworkModify = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ vnfInstanceId: S.String, vnfConfigurableProperties: S.Any }),
).annotate({
  identifier: "UpdateSolNetworkModify",
}) as any as S.Schema<UpdateSolNetworkModify>;
export interface UpdateSolNetworkServiceData {
  nsdInfoId: string;
  additionalParamsForNs?: any;
}
export const UpdateSolNetworkServiceData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nsdInfoId: S.String, additionalParamsForNs: S.optional(S.Any) }),
).annotate({
  identifier: "UpdateSolNetworkServiceData",
}) as any as S.Schema<UpdateSolNetworkServiceData>;
export interface UpdateSolNetworkInstanceInput {
  nsInstanceId: string;
  updateType: UpdateSolNetworkType;
  modifyVnfInfoData?: UpdateSolNetworkModify;
  updateNs?: UpdateSolNetworkServiceData;
  tags?: { [key: string]: string | undefined };
}
export const UpdateSolNetworkInstanceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nsInstanceId: S.String.pipe(T.HttpLabel("nsInstanceId")),
    updateType: UpdateSolNetworkType,
    modifyVnfInfoData: S.optional(UpdateSolNetworkModify),
    updateNs: S.optional(UpdateSolNetworkServiceData),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/sol/nslcm/v1/ns_instances/{nsInstanceId}/update",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSolNetworkInstanceInput",
}) as any as S.Schema<UpdateSolNetworkInstanceInput>;
export interface UpdateSolNetworkInstanceOutput {
  nsLcmOpOccId?: string;
  tags?: { [key: string]: string | undefined };
}
export const UpdateSolNetworkInstanceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nsLcmOpOccId: S.optional(S.String), tags: S.optional(TagMap) }),
).annotate({
  identifier: "UpdateSolNetworkInstanceOutput",
}) as any as S.Schema<UpdateSolNetworkInstanceOutput>;
export interface UpdateSolNetworkPackageInput {
  nsdInfoId: string;
  nsdOperationalState: NsdOperationalState;
}
export const UpdateSolNetworkPackageInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nsdInfoId: S.String.pipe(T.HttpLabel("nsdInfoId")),
    nsdOperationalState: NsdOperationalState,
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/sol/nsd/v1/ns_descriptors/{nsdInfoId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSolNetworkPackageInput",
}) as any as S.Schema<UpdateSolNetworkPackageInput>;
export interface UpdateSolNetworkPackageOutput {
  nsdOperationalState: NsdOperationalState;
}
export const UpdateSolNetworkPackageOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nsdOperationalState: NsdOperationalState }),
).annotate({
  identifier: "UpdateSolNetworkPackageOutput",
}) as any as S.Schema<UpdateSolNetworkPackageOutput>;
export interface ValidateSolFunctionPackageContentInput {
  vnfPkgId: string;
  contentType?: PackageContentType;
  file: T.StreamingInputBody;
}
export const ValidateSolFunctionPackageContentInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      vnfPkgId: S.String.pipe(T.HttpLabel("vnfPkgId")),
      contentType: S.optional(PackageContentType).pipe(
        T.HttpHeader("Content-Type"),
      ),
      file: T.StreamingInput.pipe(T.HttpPayload()),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/sol/vnfpkgm/v1/vnf_packages/{vnfPkgId}/package_content/validate",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ValidateSolFunctionPackageContentInput",
}) as any as S.Schema<ValidateSolFunctionPackageContentInput>;
export interface ValidateSolFunctionPackageContentMetadata {
  vnfd?: FunctionArtifactMeta;
}
export const ValidateSolFunctionPackageContentMetadata =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ vnfd: S.optional(FunctionArtifactMeta) }),
  ).annotate({
    identifier: "ValidateSolFunctionPackageContentMetadata",
  }) as any as S.Schema<ValidateSolFunctionPackageContentMetadata>;
export interface ValidateSolFunctionPackageContentOutput {
  id: string;
  vnfdId: string;
  vnfProductName: string;
  vnfProvider: string;
  vnfdVersion: string;
  metadata: ValidateSolFunctionPackageContentMetadata;
}
export const ValidateSolFunctionPackageContentOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      id: S.String,
      vnfdId: S.String,
      vnfProductName: S.String,
      vnfProvider: S.String,
      vnfdVersion: S.String,
      metadata: ValidateSolFunctionPackageContentMetadata,
    }),
).annotate({
  identifier: "ValidateSolFunctionPackageContentOutput",
}) as any as S.Schema<ValidateSolFunctionPackageContentOutput>;
export interface ValidateSolNetworkPackageContentInput {
  nsdInfoId: string;
  contentType?: PackageContentType;
  file: T.StreamingInputBody;
}
export const ValidateSolNetworkPackageContentInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nsdInfoId: S.String.pipe(T.HttpLabel("nsdInfoId")),
      contentType: S.optional(PackageContentType).pipe(
        T.HttpHeader("Content-Type"),
      ),
      file: T.StreamingInput.pipe(T.HttpPayload()),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/sol/nsd/v1/ns_descriptors/{nsdInfoId}/nsd_content/validate",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ValidateSolNetworkPackageContentInput",
}) as any as S.Schema<ValidateSolNetworkPackageContentInput>;
export interface ValidateSolNetworkPackageContentMetadata {
  nsd?: NetworkArtifactMeta;
}
export const ValidateSolNetworkPackageContentMetadata = /*@__PURE__*/ S.suspend(
  () => S.Struct({ nsd: S.optional(NetworkArtifactMeta) }),
).annotate({
  identifier: "ValidateSolNetworkPackageContentMetadata",
}) as any as S.Schema<ValidateSolNetworkPackageContentMetadata>;
export interface ValidateSolNetworkPackageContentOutput {
  id: string;
  arn: string;
  nsdId: string;
  nsdName: string;
  nsdVersion: string;
  vnfPkgIds: string[];
  metadata: ValidateSolNetworkPackageContentMetadata;
}
export const ValidateSolNetworkPackageContentOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      id: S.String,
      arn: S.String,
      nsdId: S.String,
      nsdName: S.String,
      nsdVersion: S.String,
      vnfPkgIds: VnfPkgIdList,
      metadata: ValidateSolNetworkPackageContentMetadata,
    }),
).annotate({
  identifier: "ValidateSolNetworkPackageContentOutput",
}) as any as S.Schema<ValidateSolNetworkPackageContentOutput>;
export type CancelSolNetworkOperationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a network operation.
 *
 * A network operation is any operation that is done to your network, such as network instance instantiation or termination.
 */
export const cancelSolNetworkOperation: API.OperationMethod<
  CancelSolNetworkOperationInput,
  CancelSolNetworkOperationResponse,
  CancelSolNetworkOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelSolNetworkOperationInput,
  output: CancelSolNetworkOperationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelSolNetworkOperation",
}));

export type CreateSolFunctionPackageError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a function package.
 *
 * A function package is a .zip file in CSAR (Cloud Service Archive) format that contains a network function (an ETSI standard telecommunication application) and function package descriptor that uses the TOSCA standard to describe how the network functions should run on your network. For more information, see Function packages in the
 * *Amazon Web Services Telco Network Builder User Guide*.
 *
 * Creating a function package is the first step for creating a network in AWS TNB. This
 * request creates an empty container with an ID. The next step is to upload the actual CSAR
 * zip file into that empty container. To upload function package content, see PutSolFunctionPackageContent.
 */
export const createSolFunctionPackage: API.OperationMethod<
  CreateSolFunctionPackageInput,
  CreateSolFunctionPackageOutput,
  CreateSolFunctionPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSolFunctionPackageInput,
  output: CreateSolFunctionPackageOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSolFunctionPackage",
}));

export type CreateSolNetworkInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a network instance.
 *
 * A network instance is a single network created in Amazon Web Services TNB that can be deployed and on which life-cycle operations (like terminate, update, and delete) can be performed. Creating a network instance is the third step after creating a network
 * package. For more information about network instances, Network instances in the
 * *Amazon Web Services Telco Network Builder User Guide*.
 *
 * Once you create a network instance, you can instantiate it. To instantiate a network,
 * see InstantiateSolNetworkInstance.
 */
export const createSolNetworkInstance: API.OperationMethod<
  CreateSolNetworkInstanceInput,
  CreateSolNetworkInstanceOutput,
  CreateSolNetworkInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSolNetworkInstanceInput,
  output: CreateSolNetworkInstanceOutput,
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
  operationName: "CreateSolNetworkInstance",
}));

export type CreateSolNetworkPackageError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a network package.
 *
 * A network package is a .zip file in CSAR (Cloud Service Archive) format defines the function packages you want to deploy and the Amazon Web Services infrastructure you want to deploy them on. For more information, see Network instances in the
 * *Amazon Web Services Telco Network Builder User Guide*.
 *
 * A network package consists of a network service descriptor (NSD) file (required) and any
 * additional files (optional), such as scripts specific to your needs. For example, if you
 * have multiple function packages in your network package, you can use the NSD to define
 * which network functions should run in certain VPCs, subnets, or EKS clusters.
 *
 * This request creates an empty network package container with an ID. Once you create a
 * network package, you can upload the network package content using PutSolNetworkPackageContent.
 */
export const createSolNetworkPackage: API.OperationMethod<
  CreateSolNetworkPackageInput,
  CreateSolNetworkPackageOutput,
  CreateSolNetworkPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSolNetworkPackageInput,
  output: CreateSolNetworkPackageOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSolNetworkPackage",
}));

export type DeleteSolFunctionPackageError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a function package.
 *
 * A function package is a .zip file in CSAR (Cloud Service Archive) format that contains a network function (an ETSI standard telecommunication application) and function package descriptor that uses the TOSCA standard to describe how the network functions should run on your network.
 *
 * To delete a function package, the package must be in a disabled state. To disable a
 * function package, see UpdateSolFunctionPackage.
 */
export const deleteSolFunctionPackage: API.OperationMethod<
  DeleteSolFunctionPackageInput,
  DeleteSolFunctionPackageResponse,
  DeleteSolFunctionPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSolFunctionPackageInput,
  output: DeleteSolFunctionPackageResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSolFunctionPackage",
}));

export type DeleteSolNetworkInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a network instance.
 *
 * A network instance is a single network created in Amazon Web Services TNB that can be deployed and on which life-cycle operations (like terminate, update, and delete) can be performed.
 *
 * To delete a network instance, the instance must be in a stopped or terminated state. To
 * terminate a network instance, see TerminateSolNetworkInstance.
 */
export const deleteSolNetworkInstance: API.OperationMethod<
  DeleteSolNetworkInstanceInput,
  DeleteSolNetworkInstanceResponse,
  DeleteSolNetworkInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSolNetworkInstanceInput,
  output: DeleteSolNetworkInstanceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSolNetworkInstance",
}));

export type DeleteSolNetworkPackageError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes network package.
 *
 * A network package is a .zip file in CSAR (Cloud Service Archive) format defines the function packages you want to deploy and the Amazon Web Services infrastructure you want to deploy them on.
 *
 * To delete a network package, the package must be in a disable state. To disable a
 * network package, see UpdateSolNetworkPackage.
 */
export const deleteSolNetworkPackage: API.OperationMethod<
  DeleteSolNetworkPackageInput,
  DeleteSolNetworkPackageResponse,
  DeleteSolNetworkPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSolNetworkPackageInput,
  output: DeleteSolNetworkPackageResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSolNetworkPackage",
}));

export type GetSolFunctionInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a network function instance, including the instantiation state and
 * metadata from the function package descriptor in the network function package.
 *
 * A network function instance is a function in a function package .
 */
export const getSolFunctionInstance: API.OperationMethod<
  GetSolFunctionInstanceInput,
  GetSolFunctionInstanceOutput,
  GetSolFunctionInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSolFunctionInstanceInput,
  output: GetSolFunctionInstanceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSolFunctionInstance",
}));

export type GetSolFunctionPackageError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of an individual function package, such as the operational state and
 * whether the package is in use.
 *
 * A function package is a .zip file in CSAR (Cloud Service Archive) format that contains a network function (an ETSI standard telecommunication application) and function package descriptor that uses the TOSCA standard to describe how the network functions should run on your network..
 */
export const getSolFunctionPackage: API.OperationMethod<
  GetSolFunctionPackageInput,
  GetSolFunctionPackageOutput,
  GetSolFunctionPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSolFunctionPackageInput,
  output: GetSolFunctionPackageOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSolFunctionPackage",
}));

export type GetSolFunctionPackageContentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the contents of a function package.
 *
 * A function package is a .zip file in CSAR (Cloud Service Archive) format that contains a network function (an ETSI standard telecommunication application) and function package descriptor that uses the TOSCA standard to describe how the network functions should run on your network.
 */
export const getSolFunctionPackageContent: API.OperationMethod<
  GetSolFunctionPackageContentInput,
  GetSolFunctionPackageContentOutput,
  GetSolFunctionPackageContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSolFunctionPackageContentInput,
  output: GetSolFunctionPackageContentOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSolFunctionPackageContent",
}));

export type GetSolFunctionPackageDescriptorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a function package descriptor in a function package.
 *
 * A function package descriptor is a .yaml file in a function package that uses the TOSCA standard to describe how the network function in the function package should run on your network.
 *
 * A function package is a .zip file in CSAR (Cloud Service Archive) format that contains a network function (an ETSI standard telecommunication application) and function package descriptor that uses the TOSCA standard to describe how the network functions should run on your network.
 */
export const getSolFunctionPackageDescriptor: API.OperationMethod<
  GetSolFunctionPackageDescriptorInput,
  GetSolFunctionPackageDescriptorOutput,
  GetSolFunctionPackageDescriptorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSolFunctionPackageDescriptorInput,
  output: GetSolFunctionPackageDescriptorOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSolFunctionPackageDescriptor",
}));

export type GetSolNetworkInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of the network instance.
 *
 * A network instance is a single network created in Amazon Web Services TNB that can be deployed and on which life-cycle operations (like terminate, update, and delete) can be performed.
 */
export const getSolNetworkInstance: API.OperationMethod<
  GetSolNetworkInstanceInput,
  GetSolNetworkInstanceOutput,
  GetSolNetworkInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSolNetworkInstanceInput,
  output: GetSolNetworkInstanceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSolNetworkInstance",
}));

export type GetSolNetworkOperationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a network operation, including the tasks involved in the network
 * operation and the status of the tasks.
 *
 * A network operation is any operation that is done to your network, such as network instance instantiation or termination.
 */
export const getSolNetworkOperation: API.OperationMethod<
  GetSolNetworkOperationInput,
  GetSolNetworkOperationOutput,
  GetSolNetworkOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSolNetworkOperationInput,
  output: GetSolNetworkOperationOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSolNetworkOperation",
}));

export type GetSolNetworkPackageError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a network package.
 *
 * A network package is a .zip file in CSAR (Cloud Service Archive) format defines the function packages you want to deploy and the Amazon Web Services infrastructure you want to deploy them on.
 */
export const getSolNetworkPackage: API.OperationMethod<
  GetSolNetworkPackageInput,
  GetSolNetworkPackageOutput,
  GetSolNetworkPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSolNetworkPackageInput,
  output: GetSolNetworkPackageOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSolNetworkPackage",
}));

export type GetSolNetworkPackageContentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the contents of a network package.
 *
 * A network package is a .zip file in CSAR (Cloud Service Archive) format defines the function packages you want to deploy and the Amazon Web Services infrastructure you want to deploy them on.
 */
export const getSolNetworkPackageContent: API.OperationMethod<
  GetSolNetworkPackageContentInput,
  GetSolNetworkPackageContentOutput,
  GetSolNetworkPackageContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSolNetworkPackageContentInput,
  output: GetSolNetworkPackageContentOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSolNetworkPackageContent",
}));

export type GetSolNetworkPackageDescriptorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the content of the network service descriptor.
 *
 * A network service descriptor is a .yaml file in a network package that uses the TOSCA standard to describe the network functions you want to deploy and the Amazon Web Services infrastructure you want to deploy the network functions on.
 */
export const getSolNetworkPackageDescriptor: API.OperationMethod<
  GetSolNetworkPackageDescriptorInput,
  GetSolNetworkPackageDescriptorOutput,
  GetSolNetworkPackageDescriptorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSolNetworkPackageDescriptorInput,
  output: GetSolNetworkPackageDescriptorOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSolNetworkPackageDescriptor",
}));

export type InstantiateSolNetworkInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Instantiates a network instance.
 *
 * A network instance is a single network created in Amazon Web Services TNB that can be deployed and on which life-cycle operations (like terminate, update, and delete) can be performed.
 *
 * Before you can instantiate a network instance, you have to create a network instance.
 * For more information, see CreateSolNetworkInstance.
 */
export const instantiateSolNetworkInstance: API.OperationMethod<
  InstantiateSolNetworkInstanceInput,
  InstantiateSolNetworkInstanceOutput,
  InstantiateSolNetworkInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: InstantiateSolNetworkInstanceInput,
  output: InstantiateSolNetworkInstanceOutput,
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
  operationName: "InstantiateSolNetworkInstance",
}));

export type ListSolFunctionInstancesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists network function instances.
 *
 * A network function instance is a function in a function package .
 */
export const listSolFunctionInstances: API.PaginatedOperationMethod<
  ListSolFunctionInstancesInput,
  ListSolFunctionInstancesOutput,
  ListSolFunctionInstancesError,
  Credentials | HttpClient.HttpClient,
  ListSolFunctionInstanceInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSolFunctionInstancesInput,
  output: ListSolFunctionInstancesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSolFunctionInstances",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "functionInstances",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSolFunctionPackagesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists information about function packages.
 *
 * A function package is a .zip file in CSAR (Cloud Service Archive) format that contains a network function (an ETSI standard telecommunication application) and function package descriptor that uses the TOSCA standard to describe how the network functions should run on your network.
 */
export const listSolFunctionPackages: API.PaginatedOperationMethod<
  ListSolFunctionPackagesInput,
  ListSolFunctionPackagesOutput,
  ListSolFunctionPackagesError,
  Credentials | HttpClient.HttpClient,
  ListSolFunctionPackageInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSolFunctionPackagesInput,
  output: ListSolFunctionPackagesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSolFunctionPackages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "functionPackages",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSolNetworkInstancesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists your network instances.
 *
 * A network instance is a single network created in Amazon Web Services TNB that can be deployed and on which life-cycle operations (like terminate, update, and delete) can be performed.
 */
export const listSolNetworkInstances: API.PaginatedOperationMethod<
  ListSolNetworkInstancesInput,
  ListSolNetworkInstancesOutput,
  ListSolNetworkInstancesError,
  Credentials | HttpClient.HttpClient,
  ListSolNetworkInstanceInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSolNetworkInstancesInput,
  output: ListSolNetworkInstancesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSolNetworkInstances",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "networkInstances",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSolNetworkOperationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists details for a network operation, including when the operation started and the
 * status of the operation.
 *
 * A network operation is any operation that is done to your network, such as network instance instantiation or termination.
 */
export const listSolNetworkOperations: API.PaginatedOperationMethod<
  ListSolNetworkOperationsInput,
  ListSolNetworkOperationsOutput,
  ListSolNetworkOperationsError,
  Credentials | HttpClient.HttpClient,
  ListSolNetworkOperationsInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSolNetworkOperationsInput,
  output: ListSolNetworkOperationsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSolNetworkOperations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "networkOperations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSolNetworkPackagesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists network packages.
 *
 * A network package is a .zip file in CSAR (Cloud Service Archive) format defines the function packages you want to deploy and the Amazon Web Services infrastructure you want to deploy them on.
 */
export const listSolNetworkPackages: API.PaginatedOperationMethod<
  ListSolNetworkPackagesInput,
  ListSolNetworkPackagesOutput,
  ListSolNetworkPackagesError,
  Credentials | HttpClient.HttpClient,
  ListSolNetworkPackageInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSolNetworkPackagesInput,
  output: ListSolNetworkPackagesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSolNetworkPackages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "networkPackages",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists tags for AWS TNB resources.
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
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutSolFunctionPackageContentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Uploads the contents of a function package.
 *
 * A function package is a .zip file in CSAR (Cloud Service Archive) format that contains a network function (an ETSI standard telecommunication application) and function package descriptor that uses the TOSCA standard to describe how the network functions should run on your network.
 */
export const putSolFunctionPackageContent: API.OperationMethod<
  PutSolFunctionPackageContentInput,
  PutSolFunctionPackageContentOutput,
  PutSolFunctionPackageContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutSolFunctionPackageContentInput,
  output: PutSolFunctionPackageContentOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSolFunctionPackageContent",
}));

export type PutSolNetworkPackageContentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Uploads the contents of a network package.
 *
 * A network package is a .zip file in CSAR (Cloud Service Archive) format defines the function packages you want to deploy and the Amazon Web Services infrastructure you want to deploy them on.
 */
export const putSolNetworkPackageContent: API.OperationMethod<
  PutSolNetworkPackageContentInput,
  PutSolNetworkPackageContentOutput,
  PutSolNetworkPackageContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutSolNetworkPackageContentInput,
  output: PutSolNetworkPackageContentOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSolNetworkPackageContent",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tags an AWS TNB resource.
 *
 * A tag is a label that you assign to an Amazon Web Services resource. Each tag consists of a key and an optional value. You can use tags to search and filter your resources or track your Amazon Web Services costs.
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TerminateSolNetworkInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Terminates a network instance.
 *
 * A network instance is a single network created in Amazon Web Services TNB that can be deployed and on which life-cycle operations (like terminate, update, and delete) can be performed.
 *
 * You must terminate a network instance before you can delete it.
 */
export const terminateSolNetworkInstance: API.OperationMethod<
  TerminateSolNetworkInstanceInput,
  TerminateSolNetworkInstanceOutput,
  TerminateSolNetworkInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TerminateSolNetworkInstanceInput,
  output: TerminateSolNetworkInstanceOutput,
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
  operationName: "TerminateSolNetworkInstance",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Untags an AWS TNB resource.
 *
 * A tag is a label that you assign to an Amazon Web Services resource. Each tag consists of a key and an optional value. You can use tags to search and filter your resources or track your Amazon Web Services costs.
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
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateSolFunctionPackageError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the operational state of function package.
 *
 * A function package is a .zip file in CSAR (Cloud Service Archive) format that contains a network function (an ETSI standard telecommunication application) and function package descriptor that uses the TOSCA standard to describe how the network functions should run on your network.
 */
export const updateSolFunctionPackage: API.OperationMethod<
  UpdateSolFunctionPackageInput,
  UpdateSolFunctionPackageOutput,
  UpdateSolFunctionPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSolFunctionPackageInput,
  output: UpdateSolFunctionPackageOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSolFunctionPackage",
}));

export type UpdateSolNetworkInstanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a network instance.
 *
 * A network instance is a single network created in Amazon Web Services TNB that can be deployed and on which life-cycle operations (like terminate, update, and delete) can be performed.
 *
 * Choose the *updateType* parameter to target the necessary update of the network instance.
 */
export const updateSolNetworkInstance: API.OperationMethod<
  UpdateSolNetworkInstanceInput,
  UpdateSolNetworkInstanceOutput,
  UpdateSolNetworkInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSolNetworkInstanceInput,
  output: UpdateSolNetworkInstanceOutput,
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
  operationName: "UpdateSolNetworkInstance",
}));

export type UpdateSolNetworkPackageError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the operational state of a network package.
 *
 * A network package is a .zip file in CSAR (Cloud Service Archive) format defines the function packages you want to deploy and the Amazon Web Services infrastructure you want to deploy them on.
 *
 * A network service descriptor is a .yaml file in a network package that uses the TOSCA standard to describe the network functions you want to deploy and the Amazon Web Services infrastructure you want to deploy the network functions on.
 */
export const updateSolNetworkPackage: API.OperationMethod<
  UpdateSolNetworkPackageInput,
  UpdateSolNetworkPackageOutput,
  UpdateSolNetworkPackageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSolNetworkPackageInput,
  output: UpdateSolNetworkPackageOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSolNetworkPackage",
}));

export type ValidateSolFunctionPackageContentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Validates function package content. This can be used as a dry run before uploading
 * function package content with PutSolFunctionPackageContent.
 *
 * A function package is a .zip file in CSAR (Cloud Service Archive) format that contains a network function (an ETSI standard telecommunication application) and function package descriptor that uses the TOSCA standard to describe how the network functions should run on your network.
 */
export const validateSolFunctionPackageContent: API.OperationMethod<
  ValidateSolFunctionPackageContentInput,
  ValidateSolFunctionPackageContentOutput,
  ValidateSolFunctionPackageContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ValidateSolFunctionPackageContentInput,
  output: ValidateSolFunctionPackageContentOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateSolFunctionPackageContent",
}));

export type ValidateSolNetworkPackageContentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Validates network package content. This can be used as a dry run before uploading
 * network package content with PutSolNetworkPackageContent.
 *
 * A network package is a .zip file in CSAR (Cloud Service Archive) format defines the function packages you want to deploy and the Amazon Web Services infrastructure you want to deploy them on.
 */
export const validateSolNetworkPackageContent: API.OperationMethod<
  ValidateSolNetworkPackageContentInput,
  ValidateSolNetworkPackageContentOutput,
  ValidateSolNetworkPackageContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ValidateSolNetworkPackageContentInput,
  output: ValidateSolNetworkPackageContentOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateSolNetworkPackageContent",
}));
