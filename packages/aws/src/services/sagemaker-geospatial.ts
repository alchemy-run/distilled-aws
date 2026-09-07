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
  sdkId: "SageMaker Geospatial",
  serviceShapeName: "SageMakerGeospatial",
});
const auth = T.AwsAuthSigv4({ name: "sagemaker-geospatial" });
const ver = T.ServiceVersion("2020-05-27");
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
              `https://sagemaker-geospatial-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://sagemaker-geospatial-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://sagemaker-geospatial.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://sagemaker-geospatial.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.optional(S.String),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.optional(S.String),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.optional(S.String),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type EarthObservationJobArn = string;
export interface DeleteEarthObservationJobInput {
  Arn: string;
}
export const DeleteEarthObservationJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/earth-observation-jobs/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEarthObservationJobInput",
}) as any as S.Schema<DeleteEarthObservationJobInput>;
export interface DeleteEarthObservationJobOutput {}
export const DeleteEarthObservationJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEarthObservationJobOutput",
}) as any as S.Schema<DeleteEarthObservationJobOutput>;
export type VectorEnrichmentJobArn = string;
export interface DeleteVectorEnrichmentJobInput {
  Arn: string;
}
export const DeleteVectorEnrichmentJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/vector-enrichment-jobs/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVectorEnrichmentJobInput",
}) as any as S.Schema<DeleteVectorEnrichmentJobInput>;
export interface DeleteVectorEnrichmentJobOutput {}
export const DeleteVectorEnrichmentJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteVectorEnrichmentJobOutput",
}) as any as S.Schema<DeleteVectorEnrichmentJobOutput>;
export type ExecutionRoleArn = string;
export type S3Uri = string;
export type KmsKey = string;
export interface ExportS3DataInput {
  S3Uri: string;
  KmsKeyId?: string;
}
export const ExportS3DataInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Uri: S.String, KmsKeyId: S.optional(S.String) }),
).annotate({
  identifier: "ExportS3DataInput",
}) as any as S.Schema<ExportS3DataInput>;
export interface OutputConfigInput {
  S3Data: ExportS3DataInput;
}
export const OutputConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Data: ExportS3DataInput }),
).annotate({
  identifier: "OutputConfigInput",
}) as any as S.Schema<OutputConfigInput>;
export interface ExportEarthObservationJobInput {
  Arn: string;
  ClientToken?: string;
  ExecutionRoleArn: string;
  OutputConfig: OutputConfigInput;
  ExportSourceImages?: boolean;
}
export const ExportEarthObservationJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    ExecutionRoleArn: S.String,
    OutputConfig: OutputConfigInput,
    ExportSourceImages: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/export-earth-observation-job" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExportEarthObservationJobInput",
}) as any as S.Schema<ExportEarthObservationJobInput>;
export type EarthObservationJobExportStatus = string;
export interface ExportEarthObservationJobOutput {
  Arn: string;
  CreationTime: Date;
  ExportStatus: string;
  ExecutionRoleArn: string;
  OutputConfig: OutputConfigInput;
  ExportSourceImages?: boolean;
}
export const ExportEarthObservationJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    CreationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ExportStatus: S.String,
    ExecutionRoleArn: S.String,
    OutputConfig: OutputConfigInput,
    ExportSourceImages: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ExportEarthObservationJobOutput",
}) as any as S.Schema<ExportEarthObservationJobOutput>;
export interface VectorEnrichmentJobS3Data {
  S3Uri: string;
  KmsKeyId?: string;
}
export const VectorEnrichmentJobS3Data = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Uri: S.String, KmsKeyId: S.optional(S.String) }),
).annotate({
  identifier: "VectorEnrichmentJobS3Data",
}) as any as S.Schema<VectorEnrichmentJobS3Data>;
export interface ExportVectorEnrichmentJobOutputConfig {
  S3Data: VectorEnrichmentJobS3Data;
}
export const ExportVectorEnrichmentJobOutputConfig = /*@__PURE__*/ S.suspend(
  () => S.Struct({ S3Data: VectorEnrichmentJobS3Data }),
).annotate({
  identifier: "ExportVectorEnrichmentJobOutputConfig",
}) as any as S.Schema<ExportVectorEnrichmentJobOutputConfig>;
export interface ExportVectorEnrichmentJobInput {
  Arn: string;
  ClientToken?: string;
  ExecutionRoleArn: string;
  OutputConfig: ExportVectorEnrichmentJobOutputConfig;
}
export const ExportVectorEnrichmentJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    ExecutionRoleArn: S.String,
    OutputConfig: ExportVectorEnrichmentJobOutputConfig,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/export-vector-enrichment-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExportVectorEnrichmentJobInput",
}) as any as S.Schema<ExportVectorEnrichmentJobInput>;
export type VectorEnrichmentJobExportStatus = string;
export interface ExportVectorEnrichmentJobOutput {
  Arn: string;
  CreationTime: Date;
  ExecutionRoleArn: string;
  ExportStatus: string;
  OutputConfig: ExportVectorEnrichmentJobOutputConfig;
}
export const ExportVectorEnrichmentJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    CreationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ExecutionRoleArn: S.String,
    ExportStatus: S.String,
    OutputConfig: ExportVectorEnrichmentJobOutputConfig,
  }),
).annotate({
  identifier: "ExportVectorEnrichmentJobOutput",
}) as any as S.Schema<ExportVectorEnrichmentJobOutput>;
export interface GetEarthObservationJobInput {
  Arn: string;
}
export const GetEarthObservationJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/earth-observation-jobs/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEarthObservationJobInput",
}) as any as S.Schema<GetEarthObservationJobInput>;
export type EarthObservationJobStatus = string;
export type DataCollectionArn = string;
export interface TimeRangeFilterOutput {
  StartTime: Date;
  EndTime: Date;
}
export const TimeRangeFilterOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    EndTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({
  identifier: "TimeRangeFilterOutput",
}) as any as S.Schema<TimeRangeFilterOutput>;
export type Position = number[];
export const Position = /*@__PURE__*/ S.Array(S.Number);
export type LinearRing = number[][];
export const LinearRing = /*@__PURE__*/ S.Array(Position);
export type LinearRings = number[][][];
export const LinearRings = /*@__PURE__*/ S.Array(LinearRing);
export interface PolygonGeometryInput {
  Coordinates: number[][][];
}
export const PolygonGeometryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Coordinates: LinearRings }),
).annotate({
  identifier: "PolygonGeometryInput",
}) as any as S.Schema<PolygonGeometryInput>;
export type LinearRingsList = number[][][][];
export const LinearRingsList = /*@__PURE__*/ S.Array(LinearRings);
export interface MultiPolygonGeometryInput {
  Coordinates: number[][][][];
}
export const MultiPolygonGeometryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Coordinates: LinearRingsList }),
).annotate({
  identifier: "MultiPolygonGeometryInput",
}) as any as S.Schema<MultiPolygonGeometryInput>;
export type AreaOfInterestGeometry =
  | { PolygonGeometry: PolygonGeometryInput; MultiPolygonGeometry?: never }
  | {
      PolygonGeometry?: never;
      MultiPolygonGeometry: MultiPolygonGeometryInput;
    };
export const AreaOfInterestGeometry = /*@__PURE__*/ S.Union([
  S.Struct({ PolygonGeometry: PolygonGeometryInput }),
  S.Struct({ MultiPolygonGeometry: MultiPolygonGeometryInput }),
]);
export type AreaOfInterest = { AreaOfInterestGeometry: AreaOfInterestGeometry };
export const AreaOfInterest = /*@__PURE__*/ S.Union([
  S.Struct({ AreaOfInterestGeometry: AreaOfInterestGeometry }),
]);
export interface EoCloudCoverInput {
  LowerBound: number;
  UpperBound: number;
}
export const EoCloudCoverInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LowerBound: S.Number, UpperBound: S.Number }),
).annotate({
  identifier: "EoCloudCoverInput",
}) as any as S.Schema<EoCloudCoverInput>;
export interface ViewOffNadirInput {
  LowerBound: number;
  UpperBound: number;
}
export const ViewOffNadirInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LowerBound: S.Number, UpperBound: S.Number }),
).annotate({
  identifier: "ViewOffNadirInput",
}) as any as S.Schema<ViewOffNadirInput>;
export interface ViewSunAzimuthInput {
  LowerBound: number;
  UpperBound: number;
}
export const ViewSunAzimuthInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LowerBound: S.Number, UpperBound: S.Number }),
).annotate({
  identifier: "ViewSunAzimuthInput",
}) as any as S.Schema<ViewSunAzimuthInput>;
export interface ViewSunElevationInput {
  LowerBound: number;
  UpperBound: number;
}
export const ViewSunElevationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LowerBound: S.Number, UpperBound: S.Number }),
).annotate({
  identifier: "ViewSunElevationInput",
}) as any as S.Schema<ViewSunElevationInput>;
export type ComparisonOperator = string;
export interface PlatformInput {
  Value: string;
  ComparisonOperator?: string;
}
export const PlatformInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.String, ComparisonOperator: S.optional(S.String) }),
).annotate({ identifier: "PlatformInput" }) as any as S.Schema<PlatformInput>;
export interface LandsatCloudCoverLandInput {
  LowerBound: number;
  UpperBound: number;
}
export const LandsatCloudCoverLandInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LowerBound: S.Number, UpperBound: S.Number }),
).annotate({
  identifier: "LandsatCloudCoverLandInput",
}) as any as S.Schema<LandsatCloudCoverLandInput>;
export type Property =
  | {
      EoCloudCover: EoCloudCoverInput;
      ViewOffNadir?: never;
      ViewSunAzimuth?: never;
      ViewSunElevation?: never;
      Platform?: never;
      LandsatCloudCoverLand?: never;
    }
  | {
      EoCloudCover?: never;
      ViewOffNadir: ViewOffNadirInput;
      ViewSunAzimuth?: never;
      ViewSunElevation?: never;
      Platform?: never;
      LandsatCloudCoverLand?: never;
    }
  | {
      EoCloudCover?: never;
      ViewOffNadir?: never;
      ViewSunAzimuth: ViewSunAzimuthInput;
      ViewSunElevation?: never;
      Platform?: never;
      LandsatCloudCoverLand?: never;
    }
  | {
      EoCloudCover?: never;
      ViewOffNadir?: never;
      ViewSunAzimuth?: never;
      ViewSunElevation: ViewSunElevationInput;
      Platform?: never;
      LandsatCloudCoverLand?: never;
    }
  | {
      EoCloudCover?: never;
      ViewOffNadir?: never;
      ViewSunAzimuth?: never;
      ViewSunElevation?: never;
      Platform: PlatformInput;
      LandsatCloudCoverLand?: never;
    }
  | {
      EoCloudCover?: never;
      ViewOffNadir?: never;
      ViewSunAzimuth?: never;
      ViewSunElevation?: never;
      Platform?: never;
      LandsatCloudCoverLand: LandsatCloudCoverLandInput;
    };
export const Property = /*@__PURE__*/ S.Union([
  S.Struct({ EoCloudCover: EoCloudCoverInput }),
  S.Struct({ ViewOffNadir: ViewOffNadirInput }),
  S.Struct({ ViewSunAzimuth: ViewSunAzimuthInput }),
  S.Struct({ ViewSunElevation: ViewSunElevationInput }),
  S.Struct({ Platform: PlatformInput }),
  S.Struct({ LandsatCloudCoverLand: LandsatCloudCoverLandInput }),
]);
export interface PropertyFilter {
  Property: Property;
}
export const PropertyFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Property: Property }),
).annotate({ identifier: "PropertyFilter" }) as any as S.Schema<PropertyFilter>;
export type PropertyFiltersList = PropertyFilter[];
export const PropertyFiltersList = /*@__PURE__*/ S.Array(PropertyFilter);
export type LogicalOperator = string;
export interface PropertyFilters {
  Properties?: PropertyFilter[];
  LogicalOperator?: string;
}
export const PropertyFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Properties: S.optional(PropertyFiltersList),
    LogicalOperator: S.optional(S.String),
  }),
).annotate({
  identifier: "PropertyFilters",
}) as any as S.Schema<PropertyFilters>;
export interface RasterDataCollectionQueryOutput {
  RasterDataCollectionArn: string;
  RasterDataCollectionName: string;
  TimeRangeFilter: TimeRangeFilterOutput;
  AreaOfInterest?: AreaOfInterest;
  PropertyFilters?: PropertyFilters;
}
export const RasterDataCollectionQueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RasterDataCollectionArn: S.String,
    RasterDataCollectionName: S.String,
    TimeRangeFilter: TimeRangeFilterOutput,
    AreaOfInterest: S.optional(AreaOfInterest),
    PropertyFilters: S.optional(PropertyFilters),
  }),
).annotate({
  identifier: "RasterDataCollectionQueryOutput",
}) as any as S.Schema<RasterDataCollectionQueryOutput>;
export interface InputConfigOutput {
  PreviousEarthObservationJobArn?: string;
  RasterDataCollectionQuery?: RasterDataCollectionQueryOutput;
}
export const InputConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PreviousEarthObservationJobArn: S.optional(S.String),
    RasterDataCollectionQuery: S.optional(RasterDataCollectionQueryOutput),
  }),
).annotate({
  identifier: "InputConfigOutput",
}) as any as S.Schema<InputConfigOutput>;
export type StringListInput = string[];
export const StringListInput = /*@__PURE__*/ S.Array(S.String);
export type OutputType = string;
export interface Operation {
  Name: string;
  Equation: string;
  OutputType?: string;
}
export const Operation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Equation: S.String,
    OutputType: S.optional(S.String),
  }),
).annotate({ identifier: "Operation" }) as any as S.Schema<Operation>;
export type OperationsListInput = Operation[];
export const OperationsListInput = /*@__PURE__*/ S.Array(Operation);
export interface CustomIndicesInput {
  Operations?: Operation[];
}
export const CustomIndicesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Operations: S.optional(OperationsListInput) }),
).annotate({
  identifier: "CustomIndicesInput",
}) as any as S.Schema<CustomIndicesInput>;
export interface BandMathConfigInput {
  PredefinedIndices?: string[];
  CustomIndices?: CustomIndicesInput;
}
export const BandMathConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PredefinedIndices: S.optional(StringListInput),
    CustomIndices: S.optional(CustomIndicesInput),
  }),
).annotate({
  identifier: "BandMathConfigInput",
}) as any as S.Schema<BandMathConfigInput>;
export type Unit = string;
export interface UserDefined {
  Value: number;
  Unit: string;
}
export const UserDefined = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.Number, Unit: S.String }),
).annotate({ identifier: "UserDefined" }) as any as S.Schema<UserDefined>;
export interface OutputResolutionResamplingInput {
  UserDefined: UserDefined;
}
export const OutputResolutionResamplingInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserDefined: UserDefined }),
).annotate({
  identifier: "OutputResolutionResamplingInput",
}) as any as S.Schema<OutputResolutionResamplingInput>;
export type AlgorithmNameResampling = string;
export interface ResamplingConfigInput {
  OutputResolution: OutputResolutionResamplingInput;
  AlgorithmName?: string;
  TargetBands?: string[];
}
export const ResamplingConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutputResolution: OutputResolutionResamplingInput,
    AlgorithmName: S.optional(S.String),
    TargetBands: S.optional(StringListInput),
  }),
).annotate({
  identifier: "ResamplingConfigInput",
}) as any as S.Schema<ResamplingConfigInput>;
export type GroupBy = string;
export type TemporalStatistics = string;
export type TemporalStatisticsListInput = string[];
export const TemporalStatisticsListInput = /*@__PURE__*/ S.Array(S.String);
export interface TemporalStatisticsConfigInput {
  GroupBy?: string;
  Statistics: string[];
  TargetBands?: string[];
}
export const TemporalStatisticsConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupBy: S.optional(S.String),
    Statistics: TemporalStatisticsListInput,
    TargetBands: S.optional(StringListInput),
  }),
).annotate({
  identifier: "TemporalStatisticsConfigInput",
}) as any as S.Schema<TemporalStatisticsConfigInput>;
export type AlgorithmNameCloudRemoval = string;
export interface CloudRemovalConfigInput {
  AlgorithmName?: string;
  InterpolationValue?: string;
  TargetBands?: string[];
}
export const CloudRemovalConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlgorithmName: S.optional(S.String),
    InterpolationValue: S.optional(S.String),
    TargetBands: S.optional(StringListInput),
  }),
).annotate({
  identifier: "CloudRemovalConfigInput",
}) as any as S.Schema<CloudRemovalConfigInput>;
export type ZonalStatistics = string;
export type ZonalStatisticsListInput = string[];
export const ZonalStatisticsListInput = /*@__PURE__*/ S.Array(S.String);
export interface ZonalStatisticsConfigInput {
  ZoneS3Path: string;
  Statistics: string[];
  TargetBands?: string[];
  ZoneS3PathKmsKeyId?: string;
}
export const ZonalStatisticsConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ZoneS3Path: S.String,
    Statistics: ZonalStatisticsListInput,
    TargetBands: S.optional(StringListInput),
    ZoneS3PathKmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "ZonalStatisticsConfigInput",
}) as any as S.Schema<ZonalStatisticsConfigInput>;
export type AlgorithmNameGeoMosaic = string;
export interface GeoMosaicConfigInput {
  AlgorithmName?: string;
  TargetBands?: string[];
}
export const GeoMosaicConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlgorithmName: S.optional(S.String),
    TargetBands: S.optional(StringListInput),
  }),
).annotate({
  identifier: "GeoMosaicConfigInput",
}) as any as S.Schema<GeoMosaicConfigInput>;
export type PredefinedResolution = string;
export interface OutputResolutionStackInput {
  Predefined?: string;
  UserDefined?: UserDefined;
}
export const OutputResolutionStackInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Predefined: S.optional(S.String),
    UserDefined: S.optional(UserDefined),
  }),
).annotate({
  identifier: "OutputResolutionStackInput",
}) as any as S.Schema<OutputResolutionStackInput>;
export interface StackConfigInput {
  OutputResolution?: OutputResolutionStackInput;
  TargetBands?: string[];
}
export const StackConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutputResolution: S.optional(OutputResolutionStackInput),
    TargetBands: S.optional(StringListInput),
  }),
).annotate({
  identifier: "StackConfigInput",
}) as any as S.Schema<StackConfigInput>;
export interface CloudMaskingConfigInput {}
export const CloudMaskingConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CloudMaskingConfigInput",
}) as any as S.Schema<CloudMaskingConfigInput>;
export interface LandCoverSegmentationConfigInput {}
export const LandCoverSegmentationConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "LandCoverSegmentationConfigInput",
}) as any as S.Schema<LandCoverSegmentationConfigInput>;
export type JobConfigInput =
  | {
      BandMathConfig: BandMathConfigInput;
      ResamplingConfig?: never;
      TemporalStatisticsConfig?: never;
      CloudRemovalConfig?: never;
      ZonalStatisticsConfig?: never;
      GeoMosaicConfig?: never;
      StackConfig?: never;
      CloudMaskingConfig?: never;
      LandCoverSegmentationConfig?: never;
    }
  | {
      BandMathConfig?: never;
      ResamplingConfig: ResamplingConfigInput;
      TemporalStatisticsConfig?: never;
      CloudRemovalConfig?: never;
      ZonalStatisticsConfig?: never;
      GeoMosaicConfig?: never;
      StackConfig?: never;
      CloudMaskingConfig?: never;
      LandCoverSegmentationConfig?: never;
    }
  | {
      BandMathConfig?: never;
      ResamplingConfig?: never;
      TemporalStatisticsConfig: TemporalStatisticsConfigInput;
      CloudRemovalConfig?: never;
      ZonalStatisticsConfig?: never;
      GeoMosaicConfig?: never;
      StackConfig?: never;
      CloudMaskingConfig?: never;
      LandCoverSegmentationConfig?: never;
    }
  | {
      BandMathConfig?: never;
      ResamplingConfig?: never;
      TemporalStatisticsConfig?: never;
      CloudRemovalConfig: CloudRemovalConfigInput;
      ZonalStatisticsConfig?: never;
      GeoMosaicConfig?: never;
      StackConfig?: never;
      CloudMaskingConfig?: never;
      LandCoverSegmentationConfig?: never;
    }
  | {
      BandMathConfig?: never;
      ResamplingConfig?: never;
      TemporalStatisticsConfig?: never;
      CloudRemovalConfig?: never;
      ZonalStatisticsConfig: ZonalStatisticsConfigInput;
      GeoMosaicConfig?: never;
      StackConfig?: never;
      CloudMaskingConfig?: never;
      LandCoverSegmentationConfig?: never;
    }
  | {
      BandMathConfig?: never;
      ResamplingConfig?: never;
      TemporalStatisticsConfig?: never;
      CloudRemovalConfig?: never;
      ZonalStatisticsConfig?: never;
      GeoMosaicConfig: GeoMosaicConfigInput;
      StackConfig?: never;
      CloudMaskingConfig?: never;
      LandCoverSegmentationConfig?: never;
    }
  | {
      BandMathConfig?: never;
      ResamplingConfig?: never;
      TemporalStatisticsConfig?: never;
      CloudRemovalConfig?: never;
      ZonalStatisticsConfig?: never;
      GeoMosaicConfig?: never;
      StackConfig: StackConfigInput;
      CloudMaskingConfig?: never;
      LandCoverSegmentationConfig?: never;
    }
  | {
      BandMathConfig?: never;
      ResamplingConfig?: never;
      TemporalStatisticsConfig?: never;
      CloudRemovalConfig?: never;
      ZonalStatisticsConfig?: never;
      GeoMosaicConfig?: never;
      StackConfig?: never;
      CloudMaskingConfig: CloudMaskingConfigInput;
      LandCoverSegmentationConfig?: never;
    }
  | {
      BandMathConfig?: never;
      ResamplingConfig?: never;
      TemporalStatisticsConfig?: never;
      CloudRemovalConfig?: never;
      ZonalStatisticsConfig?: never;
      GeoMosaicConfig?: never;
      StackConfig?: never;
      CloudMaskingConfig?: never;
      LandCoverSegmentationConfig: LandCoverSegmentationConfigInput;
    };
export const JobConfigInput = /*@__PURE__*/ S.Union([
  S.Struct({ BandMathConfig: BandMathConfigInput }),
  S.Struct({ ResamplingConfig: ResamplingConfigInput }),
  S.Struct({ TemporalStatisticsConfig: TemporalStatisticsConfigInput }),
  S.Struct({ CloudRemovalConfig: CloudRemovalConfigInput }),
  S.Struct({ ZonalStatisticsConfig: ZonalStatisticsConfigInput }),
  S.Struct({ GeoMosaicConfig: GeoMosaicConfigInput }),
  S.Struct({ StackConfig: StackConfigInput }),
  S.Struct({ CloudMaskingConfig: CloudMaskingConfigInput }),
  S.Struct({ LandCoverSegmentationConfig: LandCoverSegmentationConfigInput }),
]);
export interface OutputBand {
  BandName: string;
  OutputDataType: string;
}
export const OutputBand = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BandName: S.String, OutputDataType: S.String }),
).annotate({ identifier: "OutputBand" }) as any as S.Schema<OutputBand>;
export type EarthObservationJobOutputBands = OutputBand[];
export const EarthObservationJobOutputBands = /*@__PURE__*/ S.Array(OutputBand);
export type EarthObservationJobErrorType = string;
export interface EarthObservationJobErrorDetails {
  Type?: string;
  Message?: string;
}
export const EarthObservationJobErrorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.optional(S.String), Message: S.optional(S.String) }),
).annotate({
  identifier: "EarthObservationJobErrorDetails",
}) as any as S.Schema<EarthObservationJobErrorDetails>;
export type ExportErrorType = string;
export interface ExportErrorDetailsOutput {
  Type?: string;
  Message?: string;
}
export const ExportErrorDetailsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.optional(S.String), Message: S.optional(S.String) }),
).annotate({
  identifier: "ExportErrorDetailsOutput",
}) as any as S.Schema<ExportErrorDetailsOutput>;
export interface ExportErrorDetails {
  ExportResults?: ExportErrorDetailsOutput;
  ExportSourceImages?: ExportErrorDetailsOutput;
}
export const ExportErrorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportResults: S.optional(ExportErrorDetailsOutput),
    ExportSourceImages: S.optional(ExportErrorDetailsOutput),
  }),
).annotate({
  identifier: "ExportErrorDetails",
}) as any as S.Schema<ExportErrorDetails>;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export interface GetEarthObservationJobOutput {
  Arn: string;
  Name: string;
  CreationTime: Date;
  DurationInSeconds: number;
  Status: string;
  KmsKeyId?: string;
  InputConfig: InputConfigOutput;
  JobConfig: JobConfigInput;
  OutputBands?: OutputBand[];
  ExecutionRoleArn?: string;
  ErrorDetails?: EarthObservationJobErrorDetails;
  ExportStatus?: string;
  ExportErrorDetails?: ExportErrorDetails;
  Tags?: { [key: string]: string | undefined };
}
export const GetEarthObservationJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    CreationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    DurationInSeconds: S.Number,
    Status: S.String,
    KmsKeyId: S.optional(S.String),
    InputConfig: InputConfigOutput,
    JobConfig: JobConfigInput,
    OutputBands: S.optional(EarthObservationJobOutputBands),
    ExecutionRoleArn: S.optional(S.String),
    ErrorDetails: S.optional(EarthObservationJobErrorDetails),
    ExportStatus: S.optional(S.String),
    ExportErrorDetails: S.optional(ExportErrorDetails),
    Tags: S.optional(Tags),
  }),
).annotate({
  identifier: "GetEarthObservationJobOutput",
}) as any as S.Schema<GetEarthObservationJobOutput>;
export interface GetRasterDataCollectionInput {
  Arn: string;
}
export const GetRasterDataCollectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/raster-data-collection/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRasterDataCollectionInput",
}) as any as S.Schema<GetRasterDataCollectionInput>;
export type DataCollectionType = string;
export interface Filter {
  Name: string;
  Type: string;
  Minimum?: number;
  Maximum?: number;
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Type: S.String,
    Minimum: S.optional(S.Number),
    Maximum: S.optional(S.Number),
  }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = Filter[];
export const FilterList = /*@__PURE__*/ S.Array(Filter);
export type ImageSourceBandList = string[];
export const ImageSourceBandList = /*@__PURE__*/ S.Array(S.String);
export interface GetRasterDataCollectionOutput {
  Name: string;
  Arn: string;
  Type: string;
  Description: string;
  DescriptionPageUrl: string;
  SupportedFilters: Filter[];
  ImageSourceBands: string[];
  Tags?: { [key: string]: string | undefined };
}
export const GetRasterDataCollectionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Arn: S.String,
    Type: S.String,
    Description: S.String,
    DescriptionPageUrl: S.String,
    SupportedFilters: FilterList,
    ImageSourceBands: ImageSourceBandList,
    Tags: S.optional(Tags),
  }),
).annotate({
  identifier: "GetRasterDataCollectionOutput",
}) as any as S.Schema<GetRasterDataCollectionOutput>;
export type TargetOptions = string;
export interface GetTileInput {
  x: number;
  y: number;
  z: number;
  ImageAssets: string[];
  Target: string;
  Arn: string;
  ImageMask?: boolean;
  OutputFormat?: string;
  TimeRangeFilter?: string;
  PropertyFilters?: string;
  OutputDataType?: string;
  ExecutionRoleArn?: string;
}
export const GetTileInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    x: S.Number.pipe(T.HttpLabel("x")),
    y: S.Number.pipe(T.HttpLabel("y")),
    z: S.Number.pipe(T.HttpLabel("z")),
    ImageAssets: StringListInput.pipe(T.HttpQuery("ImageAssets")),
    Target: S.String.pipe(T.HttpQuery("Target")),
    Arn: S.String.pipe(T.HttpQuery("Arn")),
    ImageMask: S.optional(S.Boolean).pipe(T.HttpQuery("ImageMask")),
    OutputFormat: S.optional(S.String).pipe(T.HttpQuery("OutputFormat")),
    TimeRangeFilter: S.optional(S.String).pipe(T.HttpQuery("TimeRangeFilter")),
    PropertyFilters: S.optional(S.String).pipe(T.HttpQuery("PropertyFilters")),
    OutputDataType: S.optional(S.String).pipe(T.HttpQuery("OutputDataType")),
    ExecutionRoleArn: S.optional(S.String).pipe(
      T.HttpQuery("ExecutionRoleArn"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tile/{z}/{x}/{y}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetTileInput" }) as any as S.Schema<GetTileInput>;
export interface GetTileOutput {
  BinaryFile?: T.StreamingOutputBody;
}
export const GetTileOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BinaryFile: S.optional(T.StreamingOutput).pipe(T.HttpPayload()) }),
).annotate({ identifier: "GetTileOutput" }) as any as S.Schema<GetTileOutput>;
export interface GetVectorEnrichmentJobInput {
  Arn: string;
}
export const GetVectorEnrichmentJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/vector-enrichment-jobs/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVectorEnrichmentJobInput",
}) as any as S.Schema<GetVectorEnrichmentJobInput>;
export type VectorEnrichmentJobType = string;
export type VectorEnrichmentJobStatus = string;
export type VectorEnrichmentJobDocumentType = string;
export type VectorEnrichmentJobDataSourceConfigInput = {
  S3Data: VectorEnrichmentJobS3Data;
};
export const VectorEnrichmentJobDataSourceConfigInput = /*@__PURE__*/ S.Union([
  S.Struct({ S3Data: VectorEnrichmentJobS3Data }),
]);
export interface VectorEnrichmentJobInputConfig {
  DocumentType: string;
  DataSourceConfig: VectorEnrichmentJobDataSourceConfigInput;
}
export const VectorEnrichmentJobInputConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DocumentType: S.String,
    DataSourceConfig: VectorEnrichmentJobDataSourceConfigInput,
  }),
).annotate({
  identifier: "VectorEnrichmentJobInputConfig",
}) as any as S.Schema<VectorEnrichmentJobInputConfig>;
export interface ReverseGeocodingConfig {
  YAttributeName: string;
  XAttributeName: string;
}
export const ReverseGeocodingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ YAttributeName: S.String, XAttributeName: S.String }),
).annotate({
  identifier: "ReverseGeocodingConfig",
}) as any as S.Schema<ReverseGeocodingConfig>;
export interface MapMatchingConfig {
  IdAttributeName: string;
  YAttributeName: string;
  XAttributeName: string;
  TimestampAttributeName: string;
}
export const MapMatchingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdAttributeName: S.String,
    YAttributeName: S.String,
    XAttributeName: S.String,
    TimestampAttributeName: S.String,
  }),
).annotate({
  identifier: "MapMatchingConfig",
}) as any as S.Schema<MapMatchingConfig>;
export type VectorEnrichmentJobConfig =
  | {
      ReverseGeocodingConfig: ReverseGeocodingConfig;
      MapMatchingConfig?: never;
    }
  | { ReverseGeocodingConfig?: never; MapMatchingConfig: MapMatchingConfig };
export const VectorEnrichmentJobConfig = /*@__PURE__*/ S.Union([
  S.Struct({ ReverseGeocodingConfig: ReverseGeocodingConfig }),
  S.Struct({ MapMatchingConfig: MapMatchingConfig }),
]);
export type VectorEnrichmentJobErrorType = string;
export interface VectorEnrichmentJobErrorDetails {
  ErrorType?: string;
  ErrorMessage?: string;
}
export const VectorEnrichmentJobErrorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorType: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "VectorEnrichmentJobErrorDetails",
}) as any as S.Schema<VectorEnrichmentJobErrorDetails>;
export type VectorEnrichmentJobExportErrorType = string;
export interface VectorEnrichmentJobExportErrorDetails {
  Type?: string;
  Message?: string;
}
export const VectorEnrichmentJobExportErrorDetails = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Type: S.optional(S.String), Message: S.optional(S.String) }),
).annotate({
  identifier: "VectorEnrichmentJobExportErrorDetails",
}) as any as S.Schema<VectorEnrichmentJobExportErrorDetails>;
export interface GetVectorEnrichmentJobOutput {
  Arn: string;
  Type: string;
  Name: string;
  CreationTime: Date;
  DurationInSeconds: number;
  Status: string;
  KmsKeyId?: string;
  InputConfig: VectorEnrichmentJobInputConfig;
  JobConfig: VectorEnrichmentJobConfig;
  ExecutionRoleArn: string;
  ErrorDetails?: VectorEnrichmentJobErrorDetails;
  ExportStatus?: string;
  ExportErrorDetails?: VectorEnrichmentJobExportErrorDetails;
  Tags?: { [key: string]: string | undefined };
}
export const GetVectorEnrichmentJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Type: S.String,
    Name: S.String,
    CreationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    DurationInSeconds: S.Number,
    Status: S.String,
    KmsKeyId: S.optional(S.String),
    InputConfig: VectorEnrichmentJobInputConfig,
    JobConfig: VectorEnrichmentJobConfig,
    ExecutionRoleArn: S.String,
    ErrorDetails: S.optional(VectorEnrichmentJobErrorDetails),
    ExportStatus: S.optional(S.String),
    ExportErrorDetails: S.optional(VectorEnrichmentJobExportErrorDetails),
    Tags: S.optional(Tags),
  }),
).annotate({
  identifier: "GetVectorEnrichmentJobOutput",
}) as any as S.Schema<GetVectorEnrichmentJobOutput>;
export type SortOrder = string;
export type NextToken = string | redacted.Redacted<string>;
export interface ListEarthObservationJobInput {
  StatusEquals?: string;
  SortOrder?: string;
  SortBy?: string;
  NextToken?: string | redacted.Redacted<string>;
  MaxResults?: number;
}
export const ListEarthObservationJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatusEquals: S.optional(S.String),
    SortOrder: S.optional(S.String),
    SortBy: S.optional(S.String),
    NextToken: S.optional(SensitiveString),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-earth-observation-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEarthObservationJobInput",
}) as any as S.Schema<ListEarthObservationJobInput>;
export interface ListEarthObservationJobOutputConfig {
  Arn: string;
  Name: string;
  CreationTime: Date;
  DurationInSeconds: number;
  Status: string;
  OperationType: string;
  Tags?: { [key: string]: string | undefined };
}
export const ListEarthObservationJobOutputConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    CreationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    DurationInSeconds: S.Number,
    Status: S.String,
    OperationType: S.String,
    Tags: S.optional(Tags),
  }),
).annotate({
  identifier: "ListEarthObservationJobOutputConfig",
}) as any as S.Schema<ListEarthObservationJobOutputConfig>;
export type EarthObservationJobList = ListEarthObservationJobOutputConfig[];
export const EarthObservationJobList = /*@__PURE__*/ S.Array(
  ListEarthObservationJobOutputConfig,
);
export interface ListEarthObservationJobOutput {
  EarthObservationJobSummaries: ListEarthObservationJobOutputConfig[];
  NextToken?: string | redacted.Redacted<string>;
}
export const ListEarthObservationJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EarthObservationJobSummaries: EarthObservationJobList,
    NextToken: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ListEarthObservationJobOutput",
}) as any as S.Schema<ListEarthObservationJobOutput>;
export interface ListRasterDataCollectionsInput {
  NextToken?: string | redacted.Redacted<string>;
  MaxResults?: number;
}
export const ListRasterDataCollectionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(SensitiveString).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/raster-data-collections" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRasterDataCollectionsInput",
}) as any as S.Schema<ListRasterDataCollectionsInput>;
export interface RasterDataCollectionMetadata {
  Name: string;
  Arn: string;
  Type: string;
  Description: string;
  DescriptionPageUrl?: string;
  SupportedFilters: Filter[];
  Tags?: { [key: string]: string | undefined };
}
export const RasterDataCollectionMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Arn: S.String,
    Type: S.String,
    Description: S.String,
    DescriptionPageUrl: S.optional(S.String),
    SupportedFilters: FilterList,
    Tags: S.optional(Tags),
  }),
).annotate({
  identifier: "RasterDataCollectionMetadata",
}) as any as S.Schema<RasterDataCollectionMetadata>;
export type DataCollectionsList = RasterDataCollectionMetadata[];
export const DataCollectionsList = /*@__PURE__*/ S.Array(
  RasterDataCollectionMetadata,
);
export interface ListRasterDataCollectionsOutput {
  RasterDataCollectionSummaries: RasterDataCollectionMetadata[];
  NextToken?: string | redacted.Redacted<string>;
}
export const ListRasterDataCollectionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RasterDataCollectionSummaries: DataCollectionsList,
    NextToken: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ListRasterDataCollectionsOutput",
}) as any as S.Schema<ListRasterDataCollectionsOutput>;
export type Arn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
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
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListVectorEnrichmentJobInput {
  StatusEquals?: string;
  SortOrder?: string;
  SortBy?: string;
  NextToken?: string | redacted.Redacted<string>;
  MaxResults?: number;
}
export const ListVectorEnrichmentJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatusEquals: S.optional(S.String),
    SortOrder: S.optional(S.String),
    SortBy: S.optional(S.String),
    NextToken: S.optional(SensitiveString),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-vector-enrichment-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVectorEnrichmentJobInput",
}) as any as S.Schema<ListVectorEnrichmentJobInput>;
export interface ListVectorEnrichmentJobOutputConfig {
  Arn: string;
  Name: string;
  Type: string;
  CreationTime: Date;
  DurationInSeconds: number;
  Status: string;
  Tags?: { [key: string]: string | undefined };
}
export const ListVectorEnrichmentJobOutputConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    Type: S.String,
    CreationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    DurationInSeconds: S.Number,
    Status: S.String,
    Tags: S.optional(Tags),
  }),
).annotate({
  identifier: "ListVectorEnrichmentJobOutputConfig",
}) as any as S.Schema<ListVectorEnrichmentJobOutputConfig>;
export type VectorEnrichmentJobList = ListVectorEnrichmentJobOutputConfig[];
export const VectorEnrichmentJobList = /*@__PURE__*/ S.Array(
  ListVectorEnrichmentJobOutputConfig,
);
export interface ListVectorEnrichmentJobOutput {
  VectorEnrichmentJobSummaries: ListVectorEnrichmentJobOutputConfig[];
  NextToken?: string | redacted.Redacted<string>;
}
export const ListVectorEnrichmentJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VectorEnrichmentJobSummaries: VectorEnrichmentJobList,
    NextToken: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "ListVectorEnrichmentJobOutput",
}) as any as S.Schema<ListVectorEnrichmentJobOutput>;
export interface TimeRangeFilterInput {
  StartTime: Date;
  EndTime: Date;
}
export const TimeRangeFilterInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "TimeRangeFilterInput",
}) as any as S.Schema<TimeRangeFilterInput>;
export interface RasterDataCollectionQueryWithBandFilterInput {
  TimeRangeFilter: TimeRangeFilterInput;
  AreaOfInterest?: AreaOfInterest;
  PropertyFilters?: PropertyFilters;
  BandFilter?: string[];
}
export const RasterDataCollectionQueryWithBandFilterInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TimeRangeFilter: TimeRangeFilterInput,
      AreaOfInterest: S.optional(AreaOfInterest),
      PropertyFilters: S.optional(PropertyFilters),
      BandFilter: S.optional(StringListInput),
    }),
  ).annotate({
    identifier: "RasterDataCollectionQueryWithBandFilterInput",
  }) as any as S.Schema<RasterDataCollectionQueryWithBandFilterInput>;
export interface SearchRasterDataCollectionInput {
  Arn: string;
  RasterDataCollectionQuery: RasterDataCollectionQueryWithBandFilterInput;
  NextToken?: string | redacted.Redacted<string>;
}
export const SearchRasterDataCollectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    RasterDataCollectionQuery: RasterDataCollectionQueryWithBandFilterInput,
    NextToken: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/search-raster-data-collection" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchRasterDataCollectionInput",
}) as any as S.Schema<SearchRasterDataCollectionInput>;
export interface Geometry {
  Type: string;
  Coordinates: number[][][];
}
export const Geometry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.String, Coordinates: LinearRings }),
).annotate({ identifier: "Geometry" }) as any as S.Schema<Geometry>;
export interface AssetValue {
  Href?: string;
}
export const AssetValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Href: S.optional(S.String) }),
).annotate({ identifier: "AssetValue" }) as any as S.Schema<AssetValue>;
export type AssetsMap = { [key: string]: AssetValue | undefined };
export const AssetsMap = /*@__PURE__*/ S.Record(
  S.String,
  AssetValue.pipe(S.optional),
);
export interface Properties {
  EoCloudCover?: number;
  ViewOffNadir?: number;
  ViewSunAzimuth?: number;
  ViewSunElevation?: number;
  Platform?: string;
  LandsatCloudCoverLand?: number;
}
export const Properties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EoCloudCover: S.optional(S.Number),
    ViewOffNadir: S.optional(S.Number),
    ViewSunAzimuth: S.optional(S.Number),
    ViewSunElevation: S.optional(S.Number),
    Platform: S.optional(S.String),
    LandsatCloudCoverLand: S.optional(S.Number),
  }),
).annotate({ identifier: "Properties" }) as any as S.Schema<Properties>;
export interface ItemSource {
  Id: string;
  Geometry: Geometry;
  Assets?: { [key: string]: AssetValue | undefined };
  DateTime: Date;
  Properties?: Properties;
}
export const ItemSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    Geometry: Geometry,
    Assets: S.optional(AssetsMap),
    DateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Properties: S.optional(Properties),
  }),
).annotate({ identifier: "ItemSource" }) as any as S.Schema<ItemSource>;
export type ItemSourceList = ItemSource[];
export const ItemSourceList = /*@__PURE__*/ S.Array(ItemSource);
export interface SearchRasterDataCollectionOutput {
  ApproximateResultCount: number;
  NextToken?: string | redacted.Redacted<string>;
  Items?: ItemSource[];
}
export const SearchRasterDataCollectionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApproximateResultCount: S.Number,
    NextToken: S.optional(SensitiveString),
    Items: S.optional(ItemSourceList),
  }),
).annotate({
  identifier: "SearchRasterDataCollectionOutput",
}) as any as S.Schema<SearchRasterDataCollectionOutput>;
export interface RasterDataCollectionQueryInput {
  RasterDataCollectionArn: string;
  TimeRangeFilter: TimeRangeFilterInput;
  AreaOfInterest?: AreaOfInterest;
  PropertyFilters?: PropertyFilters;
}
export const RasterDataCollectionQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RasterDataCollectionArn: S.String,
    TimeRangeFilter: TimeRangeFilterInput,
    AreaOfInterest: S.optional(AreaOfInterest),
    PropertyFilters: S.optional(PropertyFilters),
  }),
).annotate({
  identifier: "RasterDataCollectionQueryInput",
}) as any as S.Schema<RasterDataCollectionQueryInput>;
export interface InputConfigInput {
  PreviousEarthObservationJobArn?: string;
  RasterDataCollectionQuery?: RasterDataCollectionQueryInput;
}
export const InputConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PreviousEarthObservationJobArn: S.optional(S.String),
    RasterDataCollectionQuery: S.optional(RasterDataCollectionQueryInput),
  }),
).annotate({
  identifier: "InputConfigInput",
}) as any as S.Schema<InputConfigInput>;
export interface StartEarthObservationJobInput {
  Name: string;
  ClientToken?: string;
  KmsKeyId?: string;
  InputConfig: InputConfigInput;
  JobConfig: JobConfigInput;
  ExecutionRoleArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const StartEarthObservationJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    KmsKeyId: S.optional(S.String),
    InputConfig: InputConfigInput,
    JobConfig: JobConfigInput,
    ExecutionRoleArn: S.String,
    Tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/earth-observation-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartEarthObservationJobInput",
}) as any as S.Schema<StartEarthObservationJobInput>;
export interface StartEarthObservationJobOutput {
  Name: string;
  Arn: string;
  CreationTime: Date;
  DurationInSeconds: number;
  Status: string;
  KmsKeyId?: string;
  InputConfig?: InputConfigOutput;
  JobConfig: JobConfigInput;
  ExecutionRoleArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const StartEarthObservationJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Arn: S.String,
    CreationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    DurationInSeconds: S.Number,
    Status: S.String,
    KmsKeyId: S.optional(S.String),
    InputConfig: S.optional(InputConfigOutput),
    JobConfig: JobConfigInput,
    ExecutionRoleArn: S.String,
    Tags: S.optional(Tags),
  }),
).annotate({
  identifier: "StartEarthObservationJobOutput",
}) as any as S.Schema<StartEarthObservationJobOutput>;
export interface StartVectorEnrichmentJobInput {
  Name: string;
  ClientToken?: string;
  KmsKeyId?: string;
  InputConfig: VectorEnrichmentJobInputConfig;
  JobConfig: VectorEnrichmentJobConfig;
  ExecutionRoleArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const StartVectorEnrichmentJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    KmsKeyId: S.optional(S.String),
    InputConfig: VectorEnrichmentJobInputConfig,
    JobConfig: VectorEnrichmentJobConfig,
    ExecutionRoleArn: S.String,
    Tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/vector-enrichment-jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartVectorEnrichmentJobInput",
}) as any as S.Schema<StartVectorEnrichmentJobInput>;
export interface StartVectorEnrichmentJobOutput {
  Name: string;
  Arn: string;
  Type: string;
  CreationTime: Date;
  DurationInSeconds: number;
  Status: string;
  KmsKeyId?: string;
  InputConfig: VectorEnrichmentJobInputConfig;
  JobConfig: VectorEnrichmentJobConfig;
  ExecutionRoleArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const StartVectorEnrichmentJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Arn: S.String,
    Type: S.String,
    CreationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    DurationInSeconds: S.Number,
    Status: S.String,
    KmsKeyId: S.optional(S.String),
    InputConfig: VectorEnrichmentJobInputConfig,
    JobConfig: VectorEnrichmentJobConfig,
    ExecutionRoleArn: S.String,
    Tags: S.optional(Tags),
  }),
).annotate({
  identifier: "StartVectorEnrichmentJobOutput",
}) as any as S.Schema<StartVectorEnrichmentJobOutput>;
export interface StopEarthObservationJobInput {
  Arn: string;
}
export const StopEarthObservationJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/earth-observation-jobs/stop" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopEarthObservationJobInput",
}) as any as S.Schema<StopEarthObservationJobInput>;
export interface StopEarthObservationJobOutput {}
export const StopEarthObservationJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopEarthObservationJobOutput",
}) as any as S.Schema<StopEarthObservationJobOutput>;
export interface StopVectorEnrichmentJobInput {
  Arn: string;
}
export const StopVectorEnrichmentJobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/vector-enrichment-jobs/stop" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopVectorEnrichmentJobInput",
}) as any as S.Schema<StopVectorEnrichmentJobInput>;
export interface StopVectorEnrichmentJobOutput {}
export const StopVectorEnrichmentJobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopVectorEnrichmentJobOutput",
}) as any as S.Schema<StopVectorEnrichmentJobOutput>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: Tags,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/tags/{ResourceArn}" }),
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
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
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
export type DeleteEarthObservationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to delete an Earth Observation job.
 */
export const deleteEarthObservationJob: API.OperationMethod<
  DeleteEarthObservationJobInput,
  DeleteEarthObservationJobOutput,
  DeleteEarthObservationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEarthObservationJobInput,
  output: DeleteEarthObservationJobOutput,
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
  operationName: "DeleteEarthObservationJob",
}));

export type DeleteVectorEnrichmentJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to delete a Vector Enrichment job.
 */
export const deleteVectorEnrichmentJob: API.OperationMethod<
  DeleteVectorEnrichmentJobInput,
  DeleteVectorEnrichmentJobOutput,
  DeleteVectorEnrichmentJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVectorEnrichmentJobInput,
  output: DeleteVectorEnrichmentJobOutput,
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
  operationName: "DeleteVectorEnrichmentJob",
}));

export type ExportEarthObservationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to export results of an Earth Observation job and optionally source images used as input to the EOJ to an Amazon S3 location.
 */
export const exportEarthObservationJob: API.OperationMethod<
  ExportEarthObservationJobInput,
  ExportEarthObservationJobOutput,
  ExportEarthObservationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportEarthObservationJobInput,
  output: ExportEarthObservationJobOutput,
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
  operationName: "ExportEarthObservationJob",
}));

export type ExportVectorEnrichmentJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to copy results of a Vector Enrichment job to an Amazon S3 location.
 */
export const exportVectorEnrichmentJob: API.OperationMethod<
  ExportVectorEnrichmentJobInput,
  ExportVectorEnrichmentJobOutput,
  ExportVectorEnrichmentJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportVectorEnrichmentJobInput,
  output: ExportVectorEnrichmentJobOutput,
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
  operationName: "ExportVectorEnrichmentJob",
}));

export type GetEarthObservationJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the details for a previously initiated Earth Observation job.
 */
export const getEarthObservationJob: API.OperationMethod<
  GetEarthObservationJobInput,
  GetEarthObservationJobOutput,
  GetEarthObservationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEarthObservationJobInput,
  output: GetEarthObservationJobOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEarthObservationJob",
}));

export type GetRasterDataCollectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to get details of a specific raster data collection.
 */
export const getRasterDataCollection: API.OperationMethod<
  GetRasterDataCollectionInput,
  GetRasterDataCollectionOutput,
  GetRasterDataCollectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRasterDataCollectionInput,
  output: GetRasterDataCollectionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRasterDataCollection",
}));

export type GetTileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a web mercator tile for the given Earth Observation job.
 */
export const getTile: API.OperationMethod<
  GetTileInput,
  GetTileOutput,
  GetTileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTileInput,
  output: GetTileOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTile",
}));

export type GetVectorEnrichmentJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details of a Vector Enrichment Job for a given job Amazon Resource Name (ARN).
 */
export const getVectorEnrichmentJob: API.OperationMethod<
  GetVectorEnrichmentJobInput,
  GetVectorEnrichmentJobOutput,
  GetVectorEnrichmentJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetVectorEnrichmentJobInput,
  output: GetVectorEnrichmentJobOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVectorEnrichmentJob",
}));

export type ListEarthObservationJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to get a list of the Earth Observation jobs associated with the calling Amazon Web Services account.
 */
export const listEarthObservationJobs: API.PaginatedOperationMethod<
  ListEarthObservationJobInput,
  ListEarthObservationJobOutput,
  ListEarthObservationJobsError,
  Credentials | HttpClient.HttpClient,
  ListEarthObservationJobOutputConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEarthObservationJobInput,
  output: ListEarthObservationJobOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEarthObservationJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EarthObservationJobSummaries",
  } as const,
})) as any;

export type ListRasterDataCollectionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to get raster data collections.
 */
export const listRasterDataCollections: API.PaginatedOperationMethod<
  ListRasterDataCollectionsInput,
  ListRasterDataCollectionsOutput,
  ListRasterDataCollectionsError,
  Credentials | HttpClient.HttpClient,
  RasterDataCollectionMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRasterDataCollectionsInput,
  output: ListRasterDataCollectionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRasterDataCollections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RasterDataCollectionSummaries",
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
 * Lists the tags attached to the resource.
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

export type ListVectorEnrichmentJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of vector enrichment jobs.
 */
export const listVectorEnrichmentJobs: API.PaginatedOperationMethod<
  ListVectorEnrichmentJobInput,
  ListVectorEnrichmentJobOutput,
  ListVectorEnrichmentJobsError,
  Credentials | HttpClient.HttpClient,
  ListVectorEnrichmentJobOutputConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVectorEnrichmentJobInput,
  output: ListVectorEnrichmentJobOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVectorEnrichmentJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "VectorEnrichmentJobSummaries",
  } as const,
})) as any;

export type SearchRasterDataCollectionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows you run image query on a specific raster data collection to get a list of the satellite imagery matching the selected filters.
 */
export const searchRasterDataCollection: API.PaginatedOperationMethod<
  SearchRasterDataCollectionInput,
  SearchRasterDataCollectionOutput,
  SearchRasterDataCollectionError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchRasterDataCollectionInput,
  output: SearchRasterDataCollectionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchRasterDataCollection",
  pagination: { inputToken: "NextToken", outputToken: "NextToken" } as const,
})) as any;

export type StartEarthObservationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to create an Earth observation job.
 */
export const startEarthObservationJob: API.OperationMethod<
  StartEarthObservationJobInput,
  StartEarthObservationJobOutput,
  StartEarthObservationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartEarthObservationJobInput,
  output: StartEarthObservationJobOutput,
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
  operationName: "StartEarthObservationJob",
}));

export type StartVectorEnrichmentJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Vector Enrichment job for the supplied job type. Currently, there are two supported job types: reverse geocoding and map matching.
 */
export const startVectorEnrichmentJob: API.OperationMethod<
  StartVectorEnrichmentJobInput,
  StartVectorEnrichmentJobOutput,
  StartVectorEnrichmentJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartVectorEnrichmentJobInput,
  output: StartVectorEnrichmentJobOutput,
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
  operationName: "StartVectorEnrichmentJob",
}));

export type StopEarthObservationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to stop an existing earth observation job.
 */
export const stopEarthObservationJob: API.OperationMethod<
  StopEarthObservationJobInput,
  StopEarthObservationJobOutput,
  StopEarthObservationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopEarthObservationJobInput,
  output: StopEarthObservationJobOutput,
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
  operationName: "StopEarthObservationJob",
}));

export type StopVectorEnrichmentJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops the Vector Enrichment job for a given job ARN.
 */
export const stopVectorEnrichmentJob: API.OperationMethod<
  StopVectorEnrichmentJobInput,
  StopVectorEnrichmentJobOutput,
  StopVectorEnrichmentJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopVectorEnrichmentJobInput,
  output: StopVectorEnrichmentJobOutput,
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
  operationName: "StopVectorEnrichmentJob",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The resource you want to tag.
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
 * The resource you want to untag.
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
