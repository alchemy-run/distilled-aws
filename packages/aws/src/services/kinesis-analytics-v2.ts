import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace(
  "http://analytics.kinesis.amazonaws.com/doc/2018-05-23",
);
const svc = T.AwsApiService({
  sdkId: "Kinesis Analytics V2",
  serviceShapeName: "KinesisAnalytics_20180523",
});
const auth = T.AwsAuthSigv4({ name: "kinesisanalytics" });
const ver = T.ServiceVersion("2018-05-23");
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
              `https://kinesisanalytics-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://kinesisanalytics-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://kinesisanalytics.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://kinesisanalytics.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class CodeValidationException
  extends /*@__PURE__*/ S.TaggedError<CodeValidationException>()(
    "CodeValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InvalidApplicationConfigurationException
  extends /*@__PURE__*/ S.TaggedError<InvalidApplicationConfigurationException>()(
    "InvalidApplicationConfigurationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidArgumentException
  extends /*@__PURE__*/ S.TaggedError<InvalidArgumentException>()(
    "InvalidArgumentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceProvisionedThroughputExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceProvisionedThroughputExceededException>()(
    "ResourceProvisionedThroughputExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class UnableToDetectSchemaException
  extends /*@__PURE__*/ S.TaggedError<UnableToDetectSchemaException>()(
    "UnableToDetectSchemaException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RawInputRecords: S.optional(
        S.suspend(() => RawInputRecords).annotate({
          identifier: "RawInputRecords",
        }),
      ),
      ProcessedInputRecords: S.optional(
        S.suspend(() => ProcessedInputRecords).annotate({
          identifier: "ProcessedInputRecords",
        }),
      ),
    },
  ) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type ApplicationName = string;
export type ApplicationVersionId = number;
export type LogStreamARN = string;
export interface CloudWatchLoggingOption {
  LogStreamARN: string;
}
export const CloudWatchLoggingOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LogStreamARN: S.String }),
).annotate({
  identifier: "CloudWatchLoggingOption",
}) as any as S.Schema<CloudWatchLoggingOption>;
export type ConditionalToken = string;
export interface AddApplicationCloudWatchLoggingOptionRequest {
  ApplicationName: string;
  CurrentApplicationVersionId?: number;
  CloudWatchLoggingOption: CloudWatchLoggingOption;
  ConditionalToken?: string;
}
export const AddApplicationCloudWatchLoggingOptionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationName: S.String,
      CurrentApplicationVersionId: S.optional(S.Number),
      CloudWatchLoggingOption: CloudWatchLoggingOption,
      ConditionalToken: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "AddApplicationCloudWatchLoggingOptionRequest",
  }) as any as S.Schema<AddApplicationCloudWatchLoggingOptionRequest>;
export type ResourceARN = string;
export type Id = string;
export type RoleARN = string;
export interface CloudWatchLoggingOptionDescription {
  CloudWatchLoggingOptionId?: string;
  LogStreamARN: string;
  RoleARN?: string;
}
export const CloudWatchLoggingOptionDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudWatchLoggingOptionId: S.optional(S.String),
    LogStreamARN: S.String,
    RoleARN: S.optional(S.String),
  }),
).annotate({
  identifier: "CloudWatchLoggingOptionDescription",
}) as any as S.Schema<CloudWatchLoggingOptionDescription>;
export type CloudWatchLoggingOptionDescriptions =
  CloudWatchLoggingOptionDescription[];
export const CloudWatchLoggingOptionDescriptions = /*@__PURE__*/ S.Array(
  CloudWatchLoggingOptionDescription,
);
export type OperationId = string;
export interface AddApplicationCloudWatchLoggingOptionResponse {
  ApplicationARN?: string;
  ApplicationVersionId?: number;
  CloudWatchLoggingOptionDescriptions?: CloudWatchLoggingOptionDescription[];
  OperationId?: string;
}
export const AddApplicationCloudWatchLoggingOptionResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationARN: S.optional(S.String),
      ApplicationVersionId: S.optional(S.Number),
      CloudWatchLoggingOptionDescriptions: S.optional(
        CloudWatchLoggingOptionDescriptions,
      ),
      OperationId: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "AddApplicationCloudWatchLoggingOptionResponse",
  }) as any as S.Schema<AddApplicationCloudWatchLoggingOptionResponse>;
export type InAppStreamName = string;
export interface InputLambdaProcessor {
  ResourceARN: string;
}
export const InputLambdaProcessor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String }),
).annotate({
  identifier: "InputLambdaProcessor",
}) as any as S.Schema<InputLambdaProcessor>;
export interface InputProcessingConfiguration {
  InputLambdaProcessor: InputLambdaProcessor;
}
export const InputProcessingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InputLambdaProcessor: InputLambdaProcessor }),
).annotate({
  identifier: "InputProcessingConfiguration",
}) as any as S.Schema<InputProcessingConfiguration>;
export interface KinesisStreamsInput {
  ResourceARN: string;
}
export const KinesisStreamsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String }),
).annotate({
  identifier: "KinesisStreamsInput",
}) as any as S.Schema<KinesisStreamsInput>;
export interface KinesisFirehoseInput {
  ResourceARN: string;
}
export const KinesisFirehoseInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String }),
).annotate({
  identifier: "KinesisFirehoseInput",
}) as any as S.Schema<KinesisFirehoseInput>;
export type InputParallelismCount = number;
export interface InputParallelism {
  Count?: number;
}
export const InputParallelism = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Count: S.optional(S.Number) }),
).annotate({
  identifier: "InputParallelism",
}) as any as S.Schema<InputParallelism>;
export type RecordFormatType = "JSON" | "CSV" | (string & {});
export const RecordFormatType = /*@__PURE__*/ S.String;

export type RecordRowPath = string;
export interface JSONMappingParameters {
  RecordRowPath: string;
}
export const JSONMappingParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RecordRowPath: S.String }),
).annotate({
  identifier: "JSONMappingParameters",
}) as any as S.Schema<JSONMappingParameters>;
export type RecordRowDelimiter = string;
export type RecordColumnDelimiter = string;
export interface CSVMappingParameters {
  RecordRowDelimiter: string;
  RecordColumnDelimiter: string;
}
export const CSVMappingParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RecordRowDelimiter: S.String, RecordColumnDelimiter: S.String }),
).annotate({
  identifier: "CSVMappingParameters",
}) as any as S.Schema<CSVMappingParameters>;
export interface MappingParameters {
  JSONMappingParameters?: JSONMappingParameters;
  CSVMappingParameters?: CSVMappingParameters;
}
export const MappingParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JSONMappingParameters: S.optional(JSONMappingParameters),
    CSVMappingParameters: S.optional(CSVMappingParameters),
  }),
).annotate({
  identifier: "MappingParameters",
}) as any as S.Schema<MappingParameters>;
export interface RecordFormat {
  RecordFormatType: RecordFormatType;
  MappingParameters?: MappingParameters;
}
export const RecordFormat = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RecordFormatType: RecordFormatType,
    MappingParameters: S.optional(MappingParameters),
  }),
).annotate({ identifier: "RecordFormat" }) as any as S.Schema<RecordFormat>;
export type RecordEncoding = string;
export type RecordColumnName = string;
export type RecordColumnMapping = string;
export type RecordColumnSqlType = string;
export interface RecordColumn {
  Name: string;
  Mapping?: string;
  SqlType: string;
}
export const RecordColumn = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Mapping: S.optional(S.String),
    SqlType: S.String,
  }),
).annotate({ identifier: "RecordColumn" }) as any as S.Schema<RecordColumn>;
export type RecordColumns = RecordColumn[];
export const RecordColumns = /*@__PURE__*/ S.Array(RecordColumn);
export interface SourceSchema {
  RecordFormat: RecordFormat;
  RecordEncoding?: string;
  RecordColumns: RecordColumn[];
}
export const SourceSchema = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RecordFormat: RecordFormat,
    RecordEncoding: S.optional(S.String),
    RecordColumns: RecordColumns,
  }),
).annotate({ identifier: "SourceSchema" }) as any as S.Schema<SourceSchema>;
export interface Input {
  NamePrefix: string;
  InputProcessingConfiguration?: InputProcessingConfiguration;
  KinesisStreamsInput?: KinesisStreamsInput;
  KinesisFirehoseInput?: KinesisFirehoseInput;
  InputParallelism?: InputParallelism;
  InputSchema: SourceSchema;
}
export const Input = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NamePrefix: S.String,
    InputProcessingConfiguration: S.optional(InputProcessingConfiguration),
    KinesisStreamsInput: S.optional(KinesisStreamsInput),
    KinesisFirehoseInput: S.optional(KinesisFirehoseInput),
    InputParallelism: S.optional(InputParallelism),
    InputSchema: SourceSchema,
  }),
).annotate({ identifier: "Input" }) as any as S.Schema<Input>;
export interface AddApplicationInputRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  Input: Input;
}
export const AddApplicationInputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    CurrentApplicationVersionId: S.Number,
    Input: Input,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AddApplicationInputRequest",
}) as any as S.Schema<AddApplicationInputRequest>;
export type InAppStreamNames = string[];
export const InAppStreamNames = /*@__PURE__*/ S.Array(S.String);
export interface InputLambdaProcessorDescription {
  ResourceARN: string;
  RoleARN?: string;
}
export const InputLambdaProcessorDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, RoleARN: S.optional(S.String) }),
).annotate({
  identifier: "InputLambdaProcessorDescription",
}) as any as S.Schema<InputLambdaProcessorDescription>;
export interface InputProcessingConfigurationDescription {
  InputLambdaProcessorDescription?: InputLambdaProcessorDescription;
}
export const InputProcessingConfigurationDescription = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      InputLambdaProcessorDescription: S.optional(
        InputLambdaProcessorDescription,
      ),
    }),
).annotate({
  identifier: "InputProcessingConfigurationDescription",
}) as any as S.Schema<InputProcessingConfigurationDescription>;
export interface KinesisStreamsInputDescription {
  ResourceARN: string;
  RoleARN?: string;
}
export const KinesisStreamsInputDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, RoleARN: S.optional(S.String) }),
).annotate({
  identifier: "KinesisStreamsInputDescription",
}) as any as S.Schema<KinesisStreamsInputDescription>;
export interface KinesisFirehoseInputDescription {
  ResourceARN: string;
  RoleARN?: string;
}
export const KinesisFirehoseInputDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, RoleARN: S.optional(S.String) }),
).annotate({
  identifier: "KinesisFirehoseInputDescription",
}) as any as S.Schema<KinesisFirehoseInputDescription>;
export type InputStartingPosition =
  | "NOW"
  | "TRIM_HORIZON"
  | "LAST_STOPPED_POINT"
  | (string & {});
export const InputStartingPosition = /*@__PURE__*/ S.String;

export interface InputStartingPositionConfiguration {
  InputStartingPosition?: InputStartingPosition;
}
export const InputStartingPositionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InputStartingPosition: S.optional(InputStartingPosition) }),
).annotate({
  identifier: "InputStartingPositionConfiguration",
}) as any as S.Schema<InputStartingPositionConfiguration>;
export interface InputDescription {
  InputId?: string;
  NamePrefix?: string;
  InAppStreamNames?: string[];
  InputProcessingConfigurationDescription?: InputProcessingConfigurationDescription;
  KinesisStreamsInputDescription?: KinesisStreamsInputDescription;
  KinesisFirehoseInputDescription?: KinesisFirehoseInputDescription;
  InputSchema?: SourceSchema;
  InputParallelism?: InputParallelism;
  InputStartingPositionConfiguration?: InputStartingPositionConfiguration;
}
export const InputDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputId: S.optional(S.String),
    NamePrefix: S.optional(S.String),
    InAppStreamNames: S.optional(InAppStreamNames),
    InputProcessingConfigurationDescription: S.optional(
      InputProcessingConfigurationDescription,
    ),
    KinesisStreamsInputDescription: S.optional(KinesisStreamsInputDescription),
    KinesisFirehoseInputDescription: S.optional(
      KinesisFirehoseInputDescription,
    ),
    InputSchema: S.optional(SourceSchema),
    InputParallelism: S.optional(InputParallelism),
    InputStartingPositionConfiguration: S.optional(
      InputStartingPositionConfiguration,
    ),
  }),
).annotate({
  identifier: "InputDescription",
}) as any as S.Schema<InputDescription>;
export type InputDescriptions = InputDescription[];
export const InputDescriptions = /*@__PURE__*/ S.Array(InputDescription);
export interface AddApplicationInputResponse {
  ApplicationARN?: string;
  ApplicationVersionId?: number;
  InputDescriptions?: InputDescription[];
}
export const AddApplicationInputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationARN: S.optional(S.String),
    ApplicationVersionId: S.optional(S.Number),
    InputDescriptions: S.optional(InputDescriptions),
  }).pipe(ns),
).annotate({
  identifier: "AddApplicationInputResponse",
}) as any as S.Schema<AddApplicationInputResponse>;
export interface AddApplicationInputProcessingConfigurationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  InputId: string;
  InputProcessingConfiguration: InputProcessingConfiguration;
}
export const AddApplicationInputProcessingConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationName: S.String,
      CurrentApplicationVersionId: S.Number,
      InputId: S.String,
      InputProcessingConfiguration: InputProcessingConfiguration,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "AddApplicationInputProcessingConfigurationRequest",
  }) as any as S.Schema<AddApplicationInputProcessingConfigurationRequest>;
export interface AddApplicationInputProcessingConfigurationResponse {
  ApplicationARN?: string;
  ApplicationVersionId?: number;
  InputId?: string;
  InputProcessingConfigurationDescription?: InputProcessingConfigurationDescription;
}
export const AddApplicationInputProcessingConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationARN: S.optional(S.String),
      ApplicationVersionId: S.optional(S.Number),
      InputId: S.optional(S.String),
      InputProcessingConfigurationDescription: S.optional(
        InputProcessingConfigurationDescription,
      ),
    }).pipe(ns),
  ).annotate({
    identifier: "AddApplicationInputProcessingConfigurationResponse",
  }) as any as S.Schema<AddApplicationInputProcessingConfigurationResponse>;
export interface KinesisStreamsOutput {
  ResourceARN: string;
}
export const KinesisStreamsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String }),
).annotate({
  identifier: "KinesisStreamsOutput",
}) as any as S.Schema<KinesisStreamsOutput>;
export interface KinesisFirehoseOutput {
  ResourceARN: string;
}
export const KinesisFirehoseOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String }),
).annotate({
  identifier: "KinesisFirehoseOutput",
}) as any as S.Schema<KinesisFirehoseOutput>;
export interface LambdaOutput {
  ResourceARN: string;
}
export const LambdaOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String }),
).annotate({ identifier: "LambdaOutput" }) as any as S.Schema<LambdaOutput>;
export interface DestinationSchema {
  RecordFormatType: RecordFormatType;
}
export const DestinationSchema = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RecordFormatType: RecordFormatType }),
).annotate({
  identifier: "DestinationSchema",
}) as any as S.Schema<DestinationSchema>;
export interface Output {
  Name: string;
  KinesisStreamsOutput?: KinesisStreamsOutput;
  KinesisFirehoseOutput?: KinesisFirehoseOutput;
  LambdaOutput?: LambdaOutput;
  DestinationSchema: DestinationSchema;
}
export const Output = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    KinesisStreamsOutput: S.optional(KinesisStreamsOutput),
    KinesisFirehoseOutput: S.optional(KinesisFirehoseOutput),
    LambdaOutput: S.optional(LambdaOutput),
    DestinationSchema: DestinationSchema,
  }),
).annotate({ identifier: "Output" }) as any as S.Schema<Output>;
export interface AddApplicationOutputRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  Output: Output;
}
export const AddApplicationOutputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    CurrentApplicationVersionId: S.Number,
    Output: Output,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AddApplicationOutputRequest",
}) as any as S.Schema<AddApplicationOutputRequest>;
export interface KinesisStreamsOutputDescription {
  ResourceARN: string;
  RoleARN?: string;
}
export const KinesisStreamsOutputDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, RoleARN: S.optional(S.String) }),
).annotate({
  identifier: "KinesisStreamsOutputDescription",
}) as any as S.Schema<KinesisStreamsOutputDescription>;
export interface KinesisFirehoseOutputDescription {
  ResourceARN: string;
  RoleARN?: string;
}
export const KinesisFirehoseOutputDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, RoleARN: S.optional(S.String) }),
).annotate({
  identifier: "KinesisFirehoseOutputDescription",
}) as any as S.Schema<KinesisFirehoseOutputDescription>;
export interface LambdaOutputDescription {
  ResourceARN: string;
  RoleARN?: string;
}
export const LambdaOutputDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, RoleARN: S.optional(S.String) }),
).annotate({
  identifier: "LambdaOutputDescription",
}) as any as S.Schema<LambdaOutputDescription>;
export interface OutputDescription {
  OutputId?: string;
  Name?: string;
  KinesisStreamsOutputDescription?: KinesisStreamsOutputDescription;
  KinesisFirehoseOutputDescription?: KinesisFirehoseOutputDescription;
  LambdaOutputDescription?: LambdaOutputDescription;
  DestinationSchema?: DestinationSchema;
}
export const OutputDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutputId: S.optional(S.String),
    Name: S.optional(S.String),
    KinesisStreamsOutputDescription: S.optional(
      KinesisStreamsOutputDescription,
    ),
    KinesisFirehoseOutputDescription: S.optional(
      KinesisFirehoseOutputDescription,
    ),
    LambdaOutputDescription: S.optional(LambdaOutputDescription),
    DestinationSchema: S.optional(DestinationSchema),
  }),
).annotate({
  identifier: "OutputDescription",
}) as any as S.Schema<OutputDescription>;
export type OutputDescriptions = OutputDescription[];
export const OutputDescriptions = /*@__PURE__*/ S.Array(OutputDescription);
export interface AddApplicationOutputResponse {
  ApplicationARN?: string;
  ApplicationVersionId?: number;
  OutputDescriptions?: OutputDescription[];
}
export const AddApplicationOutputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationARN: S.optional(S.String),
    ApplicationVersionId: S.optional(S.Number),
    OutputDescriptions: S.optional(OutputDescriptions),
  }).pipe(ns),
).annotate({
  identifier: "AddApplicationOutputResponse",
}) as any as S.Schema<AddApplicationOutputResponse>;
export type InAppTableName = string;
export type BucketARN = string;
export type FileKey = string;
export interface S3ReferenceDataSource {
  BucketARN?: string;
  FileKey?: string;
}
export const S3ReferenceDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BucketARN: S.optional(S.String), FileKey: S.optional(S.String) }),
).annotate({
  identifier: "S3ReferenceDataSource",
}) as any as S.Schema<S3ReferenceDataSource>;
export interface ReferenceDataSource {
  TableName: string;
  S3ReferenceDataSource?: S3ReferenceDataSource;
  ReferenceSchema: SourceSchema;
}
export const ReferenceDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.String,
    S3ReferenceDataSource: S.optional(S3ReferenceDataSource),
    ReferenceSchema: SourceSchema,
  }),
).annotate({
  identifier: "ReferenceDataSource",
}) as any as S.Schema<ReferenceDataSource>;
export interface AddApplicationReferenceDataSourceRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  ReferenceDataSource: ReferenceDataSource;
}
export const AddApplicationReferenceDataSourceRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ApplicationName: S.String,
      CurrentApplicationVersionId: S.Number,
      ReferenceDataSource: ReferenceDataSource,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AddApplicationReferenceDataSourceRequest",
}) as any as S.Schema<AddApplicationReferenceDataSourceRequest>;
export interface S3ReferenceDataSourceDescription {
  BucketARN: string;
  FileKey: string;
  ReferenceRoleARN?: string;
}
export const S3ReferenceDataSourceDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BucketARN: S.String,
    FileKey: S.String,
    ReferenceRoleARN: S.optional(S.String),
  }),
).annotate({
  identifier: "S3ReferenceDataSourceDescription",
}) as any as S.Schema<S3ReferenceDataSourceDescription>;
export interface ReferenceDataSourceDescription {
  ReferenceId: string;
  TableName: string;
  S3ReferenceDataSourceDescription: S3ReferenceDataSourceDescription;
  ReferenceSchema?: SourceSchema;
}
export const ReferenceDataSourceDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReferenceId: S.String,
    TableName: S.String,
    S3ReferenceDataSourceDescription: S3ReferenceDataSourceDescription,
    ReferenceSchema: S.optional(SourceSchema),
  }),
).annotate({
  identifier: "ReferenceDataSourceDescription",
}) as any as S.Schema<ReferenceDataSourceDescription>;
export type ReferenceDataSourceDescriptions = ReferenceDataSourceDescription[];
export const ReferenceDataSourceDescriptions = /*@__PURE__*/ S.Array(
  ReferenceDataSourceDescription,
);
export interface AddApplicationReferenceDataSourceResponse {
  ApplicationARN?: string;
  ApplicationVersionId?: number;
  ReferenceDataSourceDescriptions?: ReferenceDataSourceDescription[];
}
export const AddApplicationReferenceDataSourceResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationARN: S.optional(S.String),
      ApplicationVersionId: S.optional(S.Number),
      ReferenceDataSourceDescriptions: S.optional(
        ReferenceDataSourceDescriptions,
      ),
    }).pipe(ns),
  ).annotate({
    identifier: "AddApplicationReferenceDataSourceResponse",
  }) as any as S.Schema<AddApplicationReferenceDataSourceResponse>;
export type SubnetId = string;
export type SubnetIds = string[];
export const SubnetIds = /*@__PURE__*/ S.Array(S.String);
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export const SecurityGroupIds = /*@__PURE__*/ S.Array(S.String);
export interface VpcConfiguration {
  SubnetIds: string[];
  SecurityGroupIds: string[];
}
export const VpcConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SubnetIds: SubnetIds, SecurityGroupIds: SecurityGroupIds }),
).annotate({
  identifier: "VpcConfiguration",
}) as any as S.Schema<VpcConfiguration>;
export interface AddApplicationVpcConfigurationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId?: number;
  VpcConfiguration: VpcConfiguration;
  ConditionalToken?: string;
}
export const AddApplicationVpcConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ApplicationName: S.String,
      CurrentApplicationVersionId: S.optional(S.Number),
      VpcConfiguration: VpcConfiguration,
      ConditionalToken: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AddApplicationVpcConfigurationRequest",
}) as any as S.Schema<AddApplicationVpcConfigurationRequest>;
export type VpcId = string;
export interface VpcConfigurationDescription {
  VpcConfigurationId: string;
  VpcId: string;
  SubnetIds: string[];
  SecurityGroupIds: string[];
}
export const VpcConfigurationDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcConfigurationId: S.String,
    VpcId: S.String,
    SubnetIds: SubnetIds,
    SecurityGroupIds: SecurityGroupIds,
  }),
).annotate({
  identifier: "VpcConfigurationDescription",
}) as any as S.Schema<VpcConfigurationDescription>;
export interface AddApplicationVpcConfigurationResponse {
  ApplicationARN?: string;
  ApplicationVersionId?: number;
  VpcConfigurationDescription?: VpcConfigurationDescription;
  OperationId?: string;
}
export const AddApplicationVpcConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ApplicationARN: S.optional(S.String),
      ApplicationVersionId: S.optional(S.Number),
      VpcConfigurationDescription: S.optional(VpcConfigurationDescription),
      OperationId: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "AddApplicationVpcConfigurationResponse",
}) as any as S.Schema<AddApplicationVpcConfigurationResponse>;
export type ApplicationDescription = string;
export type RuntimeEnvironment =
  | "SQL-1_0"
  | "FLINK-1_6"
  | "FLINK-1_8"
  | "ZEPPELIN-FLINK-1_0"
  | "FLINK-1_11"
  | "FLINK-1_13"
  | "ZEPPELIN-FLINK-2_0"
  | "FLINK-1_15"
  | "ZEPPELIN-FLINK-3_0"
  | "FLINK-1_18"
  | "FLINK-1_19"
  | "FLINK-1_20"
  | "FLINK-2_2"
  | (string & {});
export const RuntimeEnvironment = /*@__PURE__*/ S.String;

export type Inputs = Input[];
export const Inputs = /*@__PURE__*/ S.Array(Input);
export type Outputs = Output[];
export const Outputs = /*@__PURE__*/ S.Array(Output);
export type ReferenceDataSources = ReferenceDataSource[];
export const ReferenceDataSources = /*@__PURE__*/ S.Array(ReferenceDataSource);
export interface SqlApplicationConfiguration {
  Inputs?: Input[];
  Outputs?: Output[];
  ReferenceDataSources?: ReferenceDataSource[];
}
export const SqlApplicationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Inputs: S.optional(Inputs),
    Outputs: S.optional(Outputs),
    ReferenceDataSources: S.optional(ReferenceDataSources),
  }),
).annotate({
  identifier: "SqlApplicationConfiguration",
}) as any as S.Schema<SqlApplicationConfiguration>;
export type ConfigurationType = "DEFAULT" | "CUSTOM" | (string & {});
export const ConfigurationType = /*@__PURE__*/ S.String;

export type CheckpointInterval = number;
export type MinPauseBetweenCheckpoints = number;
export interface CheckpointConfiguration {
  ConfigurationType: ConfigurationType;
  CheckpointingEnabled?: boolean;
  CheckpointInterval?: number;
  MinPauseBetweenCheckpoints?: number;
}
export const CheckpointConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationType: ConfigurationType,
    CheckpointingEnabled: S.optional(S.Boolean),
    CheckpointInterval: S.optional(S.Number),
    MinPauseBetweenCheckpoints: S.optional(S.Number),
  }),
).annotate({
  identifier: "CheckpointConfiguration",
}) as any as S.Schema<CheckpointConfiguration>;
export type MetricsLevel =
  | "APPLICATION"
  | "TASK"
  | "OPERATOR"
  | "PARALLELISM"
  | (string & {});
export const MetricsLevel = /*@__PURE__*/ S.String;

export type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG" | (string & {});
export const LogLevel = /*@__PURE__*/ S.String;

export interface MonitoringConfiguration {
  ConfigurationType: ConfigurationType;
  MetricsLevel?: MetricsLevel;
  LogLevel?: LogLevel;
}
export const MonitoringConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationType: ConfigurationType,
    MetricsLevel: S.optional(MetricsLevel),
    LogLevel: S.optional(LogLevel),
  }),
).annotate({
  identifier: "MonitoringConfiguration",
}) as any as S.Schema<MonitoringConfiguration>;
export type Parallelism = number;
export type ParallelismPerKPU = number;
export interface ParallelismConfiguration {
  ConfigurationType: ConfigurationType;
  Parallelism?: number;
  ParallelismPerKPU?: number;
  AutoScalingEnabled?: boolean;
}
export const ParallelismConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationType: ConfigurationType,
    Parallelism: S.optional(S.Number),
    ParallelismPerKPU: S.optional(S.Number),
    AutoScalingEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ParallelismConfiguration",
}) as any as S.Schema<ParallelismConfiguration>;
export interface FlinkApplicationConfiguration {
  CheckpointConfiguration?: CheckpointConfiguration;
  MonitoringConfiguration?: MonitoringConfiguration;
  ParallelismConfiguration?: ParallelismConfiguration;
}
export const FlinkApplicationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CheckpointConfiguration: S.optional(CheckpointConfiguration),
    MonitoringConfiguration: S.optional(MonitoringConfiguration),
    ParallelismConfiguration: S.optional(ParallelismConfiguration),
  }),
).annotate({
  identifier: "FlinkApplicationConfiguration",
}) as any as S.Schema<FlinkApplicationConfiguration>;
export type PropertyKey = string;
export type PropertyValue = string;
export type PropertyMap = { [key: string]: string | undefined };
export const PropertyMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface PropertyGroup {
  PropertyGroupId: string;
  PropertyMap: { [key: string]: string | undefined };
}
export const PropertyGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PropertyGroupId: S.String, PropertyMap: PropertyMap }),
).annotate({ identifier: "PropertyGroup" }) as any as S.Schema<PropertyGroup>;
export type PropertyGroups = PropertyGroup[];
export const PropertyGroups = /*@__PURE__*/ S.Array(PropertyGroup);
export interface EnvironmentProperties {
  PropertyGroups: PropertyGroup[];
}
export const EnvironmentProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PropertyGroups: PropertyGroups }),
).annotate({
  identifier: "EnvironmentProperties",
}) as any as S.Schema<EnvironmentProperties>;
export type TextContent = string;
export type ZipFileContent = Uint8Array;
export type ObjectVersion = string;
export interface S3ContentLocation {
  BucketARN: string;
  FileKey: string;
  ObjectVersion?: string;
}
export const S3ContentLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BucketARN: S.String,
    FileKey: S.String,
    ObjectVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "S3ContentLocation",
}) as any as S.Schema<S3ContentLocation>;
export interface CodeContent {
  TextContent?: string;
  ZipFileContent?: Uint8Array;
  S3ContentLocation?: S3ContentLocation;
}
export const CodeContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TextContent: S.optional(S.String),
    ZipFileContent: S.optional(T.Blob),
    S3ContentLocation: S.optional(S3ContentLocation),
  }),
).annotate({ identifier: "CodeContent" }) as any as S.Schema<CodeContent>;
export type CodeContentType = "PLAINTEXT" | "ZIPFILE" | (string & {});
export const CodeContentType = /*@__PURE__*/ S.String;

export interface ApplicationCodeConfiguration {
  CodeContent?: CodeContent;
  CodeContentType: CodeContentType;
}
export const ApplicationCodeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CodeContent: S.optional(CodeContent),
    CodeContentType: CodeContentType,
  }),
).annotate({
  identifier: "ApplicationCodeConfiguration",
}) as any as S.Schema<ApplicationCodeConfiguration>;
export interface ApplicationSnapshotConfiguration {
  SnapshotsEnabled: boolean;
}
export const ApplicationSnapshotConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SnapshotsEnabled: S.Boolean }),
).annotate({
  identifier: "ApplicationSnapshotConfiguration",
}) as any as S.Schema<ApplicationSnapshotConfiguration>;
export interface ApplicationSystemRollbackConfiguration {
  RollbackEnabled: boolean;
}
export const ApplicationSystemRollbackConfiguration = /*@__PURE__*/ S.suspend(
  () => S.Struct({ RollbackEnabled: S.Boolean }),
).annotate({
  identifier: "ApplicationSystemRollbackConfiguration",
}) as any as S.Schema<ApplicationSystemRollbackConfiguration>;
export type VpcConfigurations = VpcConfiguration[];
export const VpcConfigurations = /*@__PURE__*/ S.Array(VpcConfiguration);
export interface ZeppelinMonitoringConfiguration {
  LogLevel: LogLevel;
}
export const ZeppelinMonitoringConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LogLevel: LogLevel }),
).annotate({
  identifier: "ZeppelinMonitoringConfiguration",
}) as any as S.Schema<ZeppelinMonitoringConfiguration>;
export type DatabaseARN = string;
export interface GlueDataCatalogConfiguration {
  DatabaseARN: string;
}
export const GlueDataCatalogConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatabaseARN: S.String }),
).annotate({
  identifier: "GlueDataCatalogConfiguration",
}) as any as S.Schema<GlueDataCatalogConfiguration>;
export interface CatalogConfiguration {
  GlueDataCatalogConfiguration: GlueDataCatalogConfiguration;
}
export const CatalogConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GlueDataCatalogConfiguration: GlueDataCatalogConfiguration }),
).annotate({
  identifier: "CatalogConfiguration",
}) as any as S.Schema<CatalogConfiguration>;
export type BasePath = string;
export interface S3ContentBaseLocation {
  BucketARN: string;
  BasePath?: string;
}
export const S3ContentBaseLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BucketARN: S.String, BasePath: S.optional(S.String) }),
).annotate({
  identifier: "S3ContentBaseLocation",
}) as any as S.Schema<S3ContentBaseLocation>;
export interface DeployAsApplicationConfiguration {
  S3ContentLocation: S3ContentBaseLocation;
}
export const DeployAsApplicationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3ContentLocation: S3ContentBaseLocation }),
).annotate({
  identifier: "DeployAsApplicationConfiguration",
}) as any as S.Schema<DeployAsApplicationConfiguration>;
export type ArtifactType = "UDF" | "DEPENDENCY_JAR" | (string & {});
export const ArtifactType = /*@__PURE__*/ S.String;

export type MavenGroupId = string;
export type MavenArtifactId = string;
export type MavenVersion = string;
export interface MavenReference {
  GroupId: string;
  ArtifactId: string;
  Version: string;
}
export const MavenReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupId: S.String, ArtifactId: S.String, Version: S.String }),
).annotate({ identifier: "MavenReference" }) as any as S.Schema<MavenReference>;
export interface CustomArtifactConfiguration {
  ArtifactType: ArtifactType;
  S3ContentLocation?: S3ContentLocation;
  MavenReference?: MavenReference;
}
export const CustomArtifactConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ArtifactType: ArtifactType,
    S3ContentLocation: S.optional(S3ContentLocation),
    MavenReference: S.optional(MavenReference),
  }),
).annotate({
  identifier: "CustomArtifactConfiguration",
}) as any as S.Schema<CustomArtifactConfiguration>;
export type CustomArtifactsConfigurationList = CustomArtifactConfiguration[];
export const CustomArtifactsConfigurationList = /*@__PURE__*/ S.Array(
  CustomArtifactConfiguration,
);
export interface ZeppelinApplicationConfiguration {
  MonitoringConfiguration?: ZeppelinMonitoringConfiguration;
  CatalogConfiguration?: CatalogConfiguration;
  DeployAsApplicationConfiguration?: DeployAsApplicationConfiguration;
  CustomArtifactsConfiguration?: CustomArtifactConfiguration[];
}
export const ZeppelinApplicationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MonitoringConfiguration: S.optional(ZeppelinMonitoringConfiguration),
    CatalogConfiguration: S.optional(CatalogConfiguration),
    DeployAsApplicationConfiguration: S.optional(
      DeployAsApplicationConfiguration,
    ),
    CustomArtifactsConfiguration: S.optional(CustomArtifactsConfigurationList),
  }),
).annotate({
  identifier: "ZeppelinApplicationConfiguration",
}) as any as S.Schema<ZeppelinApplicationConfiguration>;
export type KeyId = string;
export type KeyType = "AWS_OWNED_KEY" | "CUSTOMER_MANAGED_KEY" | (string & {});
export const KeyType = /*@__PURE__*/ S.String;

export interface ApplicationEncryptionConfiguration {
  KeyId?: string;
  KeyType: KeyType;
}
export const ApplicationEncryptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ KeyId: S.optional(S.String), KeyType: KeyType }),
).annotate({
  identifier: "ApplicationEncryptionConfiguration",
}) as any as S.Schema<ApplicationEncryptionConfiguration>;
export interface ApplicationConfiguration {
  SqlApplicationConfiguration?: SqlApplicationConfiguration;
  FlinkApplicationConfiguration?: FlinkApplicationConfiguration;
  EnvironmentProperties?: EnvironmentProperties;
  ApplicationCodeConfiguration?: ApplicationCodeConfiguration;
  ApplicationSnapshotConfiguration?: ApplicationSnapshotConfiguration;
  ApplicationSystemRollbackConfiguration?: ApplicationSystemRollbackConfiguration;
  VpcConfigurations?: VpcConfiguration[];
  ZeppelinApplicationConfiguration?: ZeppelinApplicationConfiguration;
  ApplicationEncryptionConfiguration?: ApplicationEncryptionConfiguration;
}
export const ApplicationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SqlApplicationConfiguration: S.optional(SqlApplicationConfiguration),
    FlinkApplicationConfiguration: S.optional(FlinkApplicationConfiguration),
    EnvironmentProperties: S.optional(EnvironmentProperties),
    ApplicationCodeConfiguration: S.optional(ApplicationCodeConfiguration),
    ApplicationSnapshotConfiguration: S.optional(
      ApplicationSnapshotConfiguration,
    ),
    ApplicationSystemRollbackConfiguration: S.optional(
      ApplicationSystemRollbackConfiguration,
    ),
    VpcConfigurations: S.optional(VpcConfigurations),
    ZeppelinApplicationConfiguration: S.optional(
      ZeppelinApplicationConfiguration,
    ),
    ApplicationEncryptionConfiguration: S.optional(
      ApplicationEncryptionConfiguration,
    ),
  }),
).annotate({
  identifier: "ApplicationConfiguration",
}) as any as S.Schema<ApplicationConfiguration>;
export type CloudWatchLoggingOptions = CloudWatchLoggingOption[];
export const CloudWatchLoggingOptions = /*@__PURE__*/ S.Array(
  CloudWatchLoggingOption,
);
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type Tags = Tag[];
export const Tags = /*@__PURE__*/ S.Array(Tag);
export type ApplicationMode = "STREAMING" | "INTERACTIVE" | (string & {});
export const ApplicationMode = /*@__PURE__*/ S.String;

export interface CreateApplicationRequest {
  ApplicationName: string;
  ApplicationDescription?: string;
  RuntimeEnvironment: RuntimeEnvironment;
  ServiceExecutionRole: string;
  ApplicationConfiguration?: ApplicationConfiguration;
  CloudWatchLoggingOptions?: CloudWatchLoggingOption[];
  Tags?: Tag[];
  ApplicationMode?: ApplicationMode;
}
export const CreateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    ApplicationDescription: S.optional(S.String),
    RuntimeEnvironment: RuntimeEnvironment,
    ServiceExecutionRole: S.String,
    ApplicationConfiguration: S.optional(ApplicationConfiguration),
    CloudWatchLoggingOptions: S.optional(CloudWatchLoggingOptions),
    Tags: S.optional(Tags),
    ApplicationMode: S.optional(ApplicationMode),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateApplicationRequest",
}) as any as S.Schema<CreateApplicationRequest>;
export type ApplicationStatus =
  | "DELETING"
  | "STARTING"
  | "STOPPING"
  | "READY"
  | "RUNNING"
  | "UPDATING"
  | "AUTOSCALING"
  | "FORCE_STOPPING"
  | "ROLLING_BACK"
  | "MAINTENANCE"
  | "ROLLED_BACK"
  | (string & {});
export const ApplicationStatus = /*@__PURE__*/ S.String;

export interface SqlApplicationConfigurationDescription {
  InputDescriptions?: InputDescription[];
  OutputDescriptions?: OutputDescription[];
  ReferenceDataSourceDescriptions?: ReferenceDataSourceDescription[];
}
export const SqlApplicationConfigurationDescription = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      InputDescriptions: S.optional(InputDescriptions),
      OutputDescriptions: S.optional(OutputDescriptions),
      ReferenceDataSourceDescriptions: S.optional(
        ReferenceDataSourceDescriptions,
      ),
    }),
).annotate({
  identifier: "SqlApplicationConfigurationDescription",
}) as any as S.Schema<SqlApplicationConfigurationDescription>;
export type CodeMD5 = string;
export type CodeSize = number;
export interface S3ApplicationCodeLocationDescription {
  BucketARN: string;
  FileKey: string;
  ObjectVersion?: string;
}
export const S3ApplicationCodeLocationDescription = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      BucketARN: S.String,
      FileKey: S.String,
      ObjectVersion: S.optional(S.String),
    }),
).annotate({
  identifier: "S3ApplicationCodeLocationDescription",
}) as any as S.Schema<S3ApplicationCodeLocationDescription>;
export interface CodeContentDescription {
  TextContent?: string;
  CodeMD5?: string;
  CodeSize?: number;
  S3ApplicationCodeLocationDescription?: S3ApplicationCodeLocationDescription;
}
export const CodeContentDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TextContent: S.optional(S.String),
    CodeMD5: S.optional(S.String),
    CodeSize: S.optional(S.Number),
    S3ApplicationCodeLocationDescription: S.optional(
      S3ApplicationCodeLocationDescription,
    ),
  }),
).annotate({
  identifier: "CodeContentDescription",
}) as any as S.Schema<CodeContentDescription>;
export interface ApplicationCodeConfigurationDescription {
  CodeContentType: CodeContentType;
  CodeContentDescription?: CodeContentDescription;
}
export const ApplicationCodeConfigurationDescription = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CodeContentType: CodeContentType,
      CodeContentDescription: S.optional(CodeContentDescription),
    }),
).annotate({
  identifier: "ApplicationCodeConfigurationDescription",
}) as any as S.Schema<ApplicationCodeConfigurationDescription>;
export type ApplicationRestoreType =
  | "SKIP_RESTORE_FROM_SNAPSHOT"
  | "RESTORE_FROM_LATEST_SNAPSHOT"
  | "RESTORE_FROM_CUSTOM_SNAPSHOT"
  | (string & {});
export const ApplicationRestoreType = /*@__PURE__*/ S.String;

export type SnapshotName = string;
export interface ApplicationRestoreConfiguration {
  ApplicationRestoreType: ApplicationRestoreType;
  SnapshotName?: string;
}
export const ApplicationRestoreConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationRestoreType: ApplicationRestoreType,
    SnapshotName: S.optional(S.String),
  }),
).annotate({
  identifier: "ApplicationRestoreConfiguration",
}) as any as S.Schema<ApplicationRestoreConfiguration>;
export interface FlinkRunConfiguration {
  AllowNonRestoredState?: boolean;
}
export const FlinkRunConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AllowNonRestoredState: S.optional(S.Boolean) }),
).annotate({
  identifier: "FlinkRunConfiguration",
}) as any as S.Schema<FlinkRunConfiguration>;
export interface RunConfigurationDescription {
  ApplicationRestoreConfigurationDescription?: ApplicationRestoreConfiguration;
  FlinkRunConfigurationDescription?: FlinkRunConfiguration;
}
export const RunConfigurationDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationRestoreConfigurationDescription: S.optional(
      ApplicationRestoreConfiguration,
    ),
    FlinkRunConfigurationDescription: S.optional(FlinkRunConfiguration),
  }),
).annotate({
  identifier: "RunConfigurationDescription",
}) as any as S.Schema<RunConfigurationDescription>;
export interface CheckpointConfigurationDescription {
  ConfigurationType?: ConfigurationType;
  CheckpointingEnabled?: boolean;
  CheckpointInterval?: number;
  MinPauseBetweenCheckpoints?: number;
}
export const CheckpointConfigurationDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationType: S.optional(ConfigurationType),
    CheckpointingEnabled: S.optional(S.Boolean),
    CheckpointInterval: S.optional(S.Number),
    MinPauseBetweenCheckpoints: S.optional(S.Number),
  }),
).annotate({
  identifier: "CheckpointConfigurationDescription",
}) as any as S.Schema<CheckpointConfigurationDescription>;
export interface MonitoringConfigurationDescription {
  ConfigurationType?: ConfigurationType;
  MetricsLevel?: MetricsLevel;
  LogLevel?: LogLevel;
}
export const MonitoringConfigurationDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationType: S.optional(ConfigurationType),
    MetricsLevel: S.optional(MetricsLevel),
    LogLevel: S.optional(LogLevel),
  }),
).annotate({
  identifier: "MonitoringConfigurationDescription",
}) as any as S.Schema<MonitoringConfigurationDescription>;
export interface ParallelismConfigurationDescription {
  ConfigurationType?: ConfigurationType;
  Parallelism?: number;
  ParallelismPerKPU?: number;
  CurrentParallelism?: number;
  AutoScalingEnabled?: boolean;
}
export const ParallelismConfigurationDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationType: S.optional(ConfigurationType),
    Parallelism: S.optional(S.Number),
    ParallelismPerKPU: S.optional(S.Number),
    CurrentParallelism: S.optional(S.Number),
    AutoScalingEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ParallelismConfigurationDescription",
}) as any as S.Schema<ParallelismConfigurationDescription>;
export type JobPlanDescription = string;
export interface FlinkApplicationConfigurationDescription {
  CheckpointConfigurationDescription?: CheckpointConfigurationDescription;
  MonitoringConfigurationDescription?: MonitoringConfigurationDescription;
  ParallelismConfigurationDescription?: ParallelismConfigurationDescription;
  JobPlanDescription?: string;
}
export const FlinkApplicationConfigurationDescription = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CheckpointConfigurationDescription: S.optional(
        CheckpointConfigurationDescription,
      ),
      MonitoringConfigurationDescription: S.optional(
        MonitoringConfigurationDescription,
      ),
      ParallelismConfigurationDescription: S.optional(
        ParallelismConfigurationDescription,
      ),
      JobPlanDescription: S.optional(S.String),
    }),
).annotate({
  identifier: "FlinkApplicationConfigurationDescription",
}) as any as S.Schema<FlinkApplicationConfigurationDescription>;
export interface EnvironmentPropertyDescriptions {
  PropertyGroupDescriptions?: PropertyGroup[];
}
export const EnvironmentPropertyDescriptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PropertyGroupDescriptions: S.optional(PropertyGroups) }),
).annotate({
  identifier: "EnvironmentPropertyDescriptions",
}) as any as S.Schema<EnvironmentPropertyDescriptions>;
export interface ApplicationSnapshotConfigurationDescription {
  SnapshotsEnabled: boolean;
}
export const ApplicationSnapshotConfigurationDescription =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ SnapshotsEnabled: S.Boolean }),
  ).annotate({
    identifier: "ApplicationSnapshotConfigurationDescription",
  }) as any as S.Schema<ApplicationSnapshotConfigurationDescription>;
export interface ApplicationSystemRollbackConfigurationDescription {
  RollbackEnabled: boolean;
}
export const ApplicationSystemRollbackConfigurationDescription =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ RollbackEnabled: S.Boolean }),
  ).annotate({
    identifier: "ApplicationSystemRollbackConfigurationDescription",
  }) as any as S.Schema<ApplicationSystemRollbackConfigurationDescription>;
export type VpcConfigurationDescriptions = VpcConfigurationDescription[];
export const VpcConfigurationDescriptions = /*@__PURE__*/ S.Array(
  VpcConfigurationDescription,
);
export interface ZeppelinMonitoringConfigurationDescription {
  LogLevel?: LogLevel;
}
export const ZeppelinMonitoringConfigurationDescription =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ LogLevel: S.optional(LogLevel) }),
  ).annotate({
    identifier: "ZeppelinMonitoringConfigurationDescription",
  }) as any as S.Schema<ZeppelinMonitoringConfigurationDescription>;
export interface GlueDataCatalogConfigurationDescription {
  DatabaseARN: string;
}
export const GlueDataCatalogConfigurationDescription = /*@__PURE__*/ S.suspend(
  () => S.Struct({ DatabaseARN: S.String }),
).annotate({
  identifier: "GlueDataCatalogConfigurationDescription",
}) as any as S.Schema<GlueDataCatalogConfigurationDescription>;
export interface CatalogConfigurationDescription {
  GlueDataCatalogConfigurationDescription: GlueDataCatalogConfigurationDescription;
}
export const CatalogConfigurationDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlueDataCatalogConfigurationDescription:
      GlueDataCatalogConfigurationDescription,
  }),
).annotate({
  identifier: "CatalogConfigurationDescription",
}) as any as S.Schema<CatalogConfigurationDescription>;
export interface S3ContentBaseLocationDescription {
  BucketARN: string;
  BasePath?: string;
}
export const S3ContentBaseLocationDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BucketARN: S.String, BasePath: S.optional(S.String) }),
).annotate({
  identifier: "S3ContentBaseLocationDescription",
}) as any as S.Schema<S3ContentBaseLocationDescription>;
export interface DeployAsApplicationConfigurationDescription {
  S3ContentLocationDescription: S3ContentBaseLocationDescription;
}
export const DeployAsApplicationConfigurationDescription =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      S3ContentLocationDescription: S3ContentBaseLocationDescription,
    }),
  ).annotate({
    identifier: "DeployAsApplicationConfigurationDescription",
  }) as any as S.Schema<DeployAsApplicationConfigurationDescription>;
export interface CustomArtifactConfigurationDescription {
  ArtifactType?: ArtifactType;
  S3ContentLocationDescription?: S3ContentLocation;
  MavenReferenceDescription?: MavenReference;
}
export const CustomArtifactConfigurationDescription = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ArtifactType: S.optional(ArtifactType),
      S3ContentLocationDescription: S.optional(S3ContentLocation),
      MavenReferenceDescription: S.optional(MavenReference),
    }),
).annotate({
  identifier: "CustomArtifactConfigurationDescription",
}) as any as S.Schema<CustomArtifactConfigurationDescription>;
export type CustomArtifactsConfigurationDescriptionList =
  CustomArtifactConfigurationDescription[];
export const CustomArtifactsConfigurationDescriptionList =
  /*@__PURE__*/ S.Array(CustomArtifactConfigurationDescription);
export interface ZeppelinApplicationConfigurationDescription {
  MonitoringConfigurationDescription: ZeppelinMonitoringConfigurationDescription;
  CatalogConfigurationDescription?: CatalogConfigurationDescription;
  DeployAsApplicationConfigurationDescription?: DeployAsApplicationConfigurationDescription;
  CustomArtifactsConfigurationDescription?: CustomArtifactConfigurationDescription[];
}
export const ZeppelinApplicationConfigurationDescription =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MonitoringConfigurationDescription:
        ZeppelinMonitoringConfigurationDescription,
      CatalogConfigurationDescription: S.optional(
        CatalogConfigurationDescription,
      ),
      DeployAsApplicationConfigurationDescription: S.optional(
        DeployAsApplicationConfigurationDescription,
      ),
      CustomArtifactsConfigurationDescription: S.optional(
        CustomArtifactsConfigurationDescriptionList,
      ),
    }),
  ).annotate({
    identifier: "ZeppelinApplicationConfigurationDescription",
  }) as any as S.Schema<ZeppelinApplicationConfigurationDescription>;
export interface ApplicationEncryptionConfigurationDescription {
  KeyId?: string;
  KeyType: KeyType;
}
export const ApplicationEncryptionConfigurationDescription =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ KeyId: S.optional(S.String), KeyType: KeyType }),
  ).annotate({
    identifier: "ApplicationEncryptionConfigurationDescription",
  }) as any as S.Schema<ApplicationEncryptionConfigurationDescription>;
export interface ApplicationConfigurationDescription {
  SqlApplicationConfigurationDescription?: SqlApplicationConfigurationDescription;
  ApplicationCodeConfigurationDescription?: ApplicationCodeConfigurationDescription;
  RunConfigurationDescription?: RunConfigurationDescription;
  FlinkApplicationConfigurationDescription?: FlinkApplicationConfigurationDescription;
  EnvironmentPropertyDescriptions?: EnvironmentPropertyDescriptions;
  ApplicationSnapshotConfigurationDescription?: ApplicationSnapshotConfigurationDescription;
  ApplicationSystemRollbackConfigurationDescription?: ApplicationSystemRollbackConfigurationDescription;
  VpcConfigurationDescriptions?: VpcConfigurationDescription[];
  ZeppelinApplicationConfigurationDescription?: ZeppelinApplicationConfigurationDescription;
  ApplicationEncryptionConfigurationDescription?: ApplicationEncryptionConfigurationDescription;
}
export const ApplicationConfigurationDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SqlApplicationConfigurationDescription: S.optional(
      SqlApplicationConfigurationDescription,
    ),
    ApplicationCodeConfigurationDescription: S.optional(
      ApplicationCodeConfigurationDescription,
    ),
    RunConfigurationDescription: S.optional(RunConfigurationDescription),
    FlinkApplicationConfigurationDescription: S.optional(
      FlinkApplicationConfigurationDescription,
    ),
    EnvironmentPropertyDescriptions: S.optional(
      EnvironmentPropertyDescriptions,
    ),
    ApplicationSnapshotConfigurationDescription: S.optional(
      ApplicationSnapshotConfigurationDescription,
    ),
    ApplicationSystemRollbackConfigurationDescription: S.optional(
      ApplicationSystemRollbackConfigurationDescription,
    ),
    VpcConfigurationDescriptions: S.optional(VpcConfigurationDescriptions),
    ZeppelinApplicationConfigurationDescription: S.optional(
      ZeppelinApplicationConfigurationDescription,
    ),
    ApplicationEncryptionConfigurationDescription: S.optional(
      ApplicationEncryptionConfigurationDescription,
    ),
  }),
).annotate({
  identifier: "ApplicationConfigurationDescription",
}) as any as S.Schema<ApplicationConfigurationDescription>;
export type ApplicationMaintenanceWindowStartTime = string;
export type ApplicationMaintenanceWindowEndTime = string;
export interface ApplicationMaintenanceConfigurationDescription {
  ApplicationMaintenanceWindowStartTime: string;
  ApplicationMaintenanceWindowEndTime: string;
}
export const ApplicationMaintenanceConfigurationDescription =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationMaintenanceWindowStartTime: S.String,
      ApplicationMaintenanceWindowEndTime: S.String,
    }),
  ).annotate({
    identifier: "ApplicationMaintenanceConfigurationDescription",
  }) as any as S.Schema<ApplicationMaintenanceConfigurationDescription>;
export interface ApplicationDetail {
  ApplicationARN: string;
  ApplicationDescription?: string;
  ApplicationName: string;
  RuntimeEnvironment: RuntimeEnvironment;
  ServiceExecutionRole?: string;
  ApplicationStatus: ApplicationStatus;
  ApplicationVersionId: number;
  CreateTimestamp?: Date;
  LastUpdateTimestamp?: Date;
  ApplicationConfigurationDescription?: ApplicationConfigurationDescription;
  CloudWatchLoggingOptionDescriptions?: CloudWatchLoggingOptionDescription[];
  ApplicationMaintenanceConfigurationDescription?: ApplicationMaintenanceConfigurationDescription;
  ApplicationVersionUpdatedFrom?: number;
  ApplicationVersionRolledBackFrom?: number;
  ApplicationVersionCreateTimestamp?: Date;
  ConditionalToken?: string;
  ApplicationVersionRolledBackTo?: number;
  ApplicationMode?: ApplicationMode;
}
export const ApplicationDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationARN: S.String,
    ApplicationDescription: S.optional(S.String),
    ApplicationName: S.String,
    RuntimeEnvironment: RuntimeEnvironment,
    ServiceExecutionRole: S.optional(S.String),
    ApplicationStatus: ApplicationStatus,
    ApplicationVersionId: S.Number,
    CreateTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastUpdateTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ApplicationConfigurationDescription: S.optional(
      ApplicationConfigurationDescription,
    ),
    CloudWatchLoggingOptionDescriptions: S.optional(
      CloudWatchLoggingOptionDescriptions,
    ),
    ApplicationMaintenanceConfigurationDescription: S.optional(
      ApplicationMaintenanceConfigurationDescription,
    ),
    ApplicationVersionUpdatedFrom: S.optional(S.Number),
    ApplicationVersionRolledBackFrom: S.optional(S.Number),
    ApplicationVersionCreateTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ConditionalToken: S.optional(S.String),
    ApplicationVersionRolledBackTo: S.optional(S.Number),
    ApplicationMode: S.optional(ApplicationMode),
  }),
).annotate({
  identifier: "ApplicationDetail",
}) as any as S.Schema<ApplicationDetail>;
export interface CreateApplicationResponse {
  ApplicationDetail: ApplicationDetail;
}
export const CreateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationDetail: ApplicationDetail }).pipe(ns),
).annotate({
  identifier: "CreateApplicationResponse",
}) as any as S.Schema<CreateApplicationResponse>;
export type UrlType = "FLINK_DASHBOARD_URL" | "ZEPPELIN_UI_URL" | (string & {});
export const UrlType = /*@__PURE__*/ S.String;

export type SessionExpirationDurationInSeconds = number;
export interface CreateApplicationPresignedUrlRequest {
  ApplicationName: string;
  UrlType: UrlType;
  SessionExpirationDurationInSeconds?: number;
}
export const CreateApplicationPresignedUrlRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ApplicationName: S.String,
      UrlType: UrlType,
      SessionExpirationDurationInSeconds: S.optional(S.Number),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateApplicationPresignedUrlRequest",
}) as any as S.Schema<CreateApplicationPresignedUrlRequest>;
export type AuthorizedUrl = string;
export interface CreateApplicationPresignedUrlResponse {
  AuthorizedUrl?: string;
}
export const CreateApplicationPresignedUrlResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ AuthorizedUrl: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateApplicationPresignedUrlResponse",
}) as any as S.Schema<CreateApplicationPresignedUrlResponse>;
export interface CreateApplicationSnapshotRequest {
  ApplicationName: string;
  SnapshotName: string;
}
export const CreateApplicationSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationName: S.String, SnapshotName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateApplicationSnapshotRequest",
}) as any as S.Schema<CreateApplicationSnapshotRequest>;
export interface CreateApplicationSnapshotResponse {}
export const CreateApplicationSnapshotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateApplicationSnapshotResponse",
}) as any as S.Schema<CreateApplicationSnapshotResponse>;
export interface DeleteApplicationRequest {
  ApplicationName: string;
  CreateTimestamp: Date;
}
export const DeleteApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    CreateTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteApplicationRequest",
}) as any as S.Schema<DeleteApplicationRequest>;
export interface DeleteApplicationResponse {}
export const DeleteApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteApplicationResponse",
}) as any as S.Schema<DeleteApplicationResponse>;
export interface DeleteApplicationCloudWatchLoggingOptionRequest {
  ApplicationName: string;
  CurrentApplicationVersionId?: number;
  CloudWatchLoggingOptionId: string;
  ConditionalToken?: string;
}
export const DeleteApplicationCloudWatchLoggingOptionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationName: S.String,
      CurrentApplicationVersionId: S.optional(S.Number),
      CloudWatchLoggingOptionId: S.String,
      ConditionalToken: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteApplicationCloudWatchLoggingOptionRequest",
  }) as any as S.Schema<DeleteApplicationCloudWatchLoggingOptionRequest>;
export interface DeleteApplicationCloudWatchLoggingOptionResponse {
  ApplicationARN?: string;
  ApplicationVersionId?: number;
  CloudWatchLoggingOptionDescriptions?: CloudWatchLoggingOptionDescription[];
  OperationId?: string;
}
export const DeleteApplicationCloudWatchLoggingOptionResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationARN: S.optional(S.String),
      ApplicationVersionId: S.optional(S.Number),
      CloudWatchLoggingOptionDescriptions: S.optional(
        CloudWatchLoggingOptionDescriptions,
      ),
      OperationId: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DeleteApplicationCloudWatchLoggingOptionResponse",
  }) as any as S.Schema<DeleteApplicationCloudWatchLoggingOptionResponse>;
export interface DeleteApplicationInputProcessingConfigurationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  InputId: string;
}
export const DeleteApplicationInputProcessingConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationName: S.String,
      CurrentApplicationVersionId: S.Number,
      InputId: S.String,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteApplicationInputProcessingConfigurationRequest",
  }) as any as S.Schema<DeleteApplicationInputProcessingConfigurationRequest>;
export interface DeleteApplicationInputProcessingConfigurationResponse {
  ApplicationARN?: string;
  ApplicationVersionId?: number;
}
export const DeleteApplicationInputProcessingConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationARN: S.optional(S.String),
      ApplicationVersionId: S.optional(S.Number),
    }).pipe(ns),
  ).annotate({
    identifier: "DeleteApplicationInputProcessingConfigurationResponse",
  }) as any as S.Schema<DeleteApplicationInputProcessingConfigurationResponse>;
export interface DeleteApplicationOutputRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  OutputId: string;
}
export const DeleteApplicationOutputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    CurrentApplicationVersionId: S.Number,
    OutputId: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteApplicationOutputRequest",
}) as any as S.Schema<DeleteApplicationOutputRequest>;
export interface DeleteApplicationOutputResponse {
  ApplicationARN?: string;
  ApplicationVersionId?: number;
}
export const DeleteApplicationOutputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationARN: S.optional(S.String),
    ApplicationVersionId: S.optional(S.Number),
  }).pipe(ns),
).annotate({
  identifier: "DeleteApplicationOutputResponse",
}) as any as S.Schema<DeleteApplicationOutputResponse>;
export interface DeleteApplicationReferenceDataSourceRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  ReferenceId: string;
}
export const DeleteApplicationReferenceDataSourceRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationName: S.String,
      CurrentApplicationVersionId: S.Number,
      ReferenceId: S.String,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteApplicationReferenceDataSourceRequest",
  }) as any as S.Schema<DeleteApplicationReferenceDataSourceRequest>;
export interface DeleteApplicationReferenceDataSourceResponse {
  ApplicationARN?: string;
  ApplicationVersionId?: number;
}
export const DeleteApplicationReferenceDataSourceResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationARN: S.optional(S.String),
      ApplicationVersionId: S.optional(S.Number),
    }).pipe(ns),
  ).annotate({
    identifier: "DeleteApplicationReferenceDataSourceResponse",
  }) as any as S.Schema<DeleteApplicationReferenceDataSourceResponse>;
export interface DeleteApplicationSnapshotRequest {
  ApplicationName: string;
  SnapshotName: string;
  SnapshotCreationTimestamp: Date;
}
export const DeleteApplicationSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    SnapshotName: S.String,
    SnapshotCreationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteApplicationSnapshotRequest",
}) as any as S.Schema<DeleteApplicationSnapshotRequest>;
export interface DeleteApplicationSnapshotResponse {}
export const DeleteApplicationSnapshotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteApplicationSnapshotResponse",
}) as any as S.Schema<DeleteApplicationSnapshotResponse>;
export interface DeleteApplicationVpcConfigurationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId?: number;
  VpcConfigurationId: string;
  ConditionalToken?: string;
}
export const DeleteApplicationVpcConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ApplicationName: S.String,
      CurrentApplicationVersionId: S.optional(S.Number),
      VpcConfigurationId: S.String,
      ConditionalToken: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteApplicationVpcConfigurationRequest",
}) as any as S.Schema<DeleteApplicationVpcConfigurationRequest>;
export interface DeleteApplicationVpcConfigurationResponse {
  ApplicationARN?: string;
  ApplicationVersionId?: number;
  OperationId?: string;
}
export const DeleteApplicationVpcConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationARN: S.optional(S.String),
      ApplicationVersionId: S.optional(S.Number),
      OperationId: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DeleteApplicationVpcConfigurationResponse",
  }) as any as S.Schema<DeleteApplicationVpcConfigurationResponse>;
export interface DescribeApplicationRequest {
  ApplicationName: string;
  IncludeAdditionalDetails?: boolean;
}
export const DescribeApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    IncludeAdditionalDetails: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeApplicationRequest",
}) as any as S.Schema<DescribeApplicationRequest>;
export interface DescribeApplicationResponse {
  ApplicationDetail: ApplicationDetail;
}
export const DescribeApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationDetail: ApplicationDetail }).pipe(ns),
).annotate({
  identifier: "DescribeApplicationResponse",
}) as any as S.Schema<DescribeApplicationResponse>;
export interface DescribeApplicationOperationRequest {
  ApplicationName: string;
  OperationId: string;
}
export const DescribeApplicationOperationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationName: S.String, OperationId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeApplicationOperationRequest",
}) as any as S.Schema<DescribeApplicationOperationRequest>;
export type Operation = string;
export type OperationStatus =
  | "IN_PROGRESS"
  | "CANCELLED"
  | "SUCCESSFUL"
  | "FAILED"
  | (string & {});
export const OperationStatus = /*@__PURE__*/ S.String;

export interface ApplicationVersionChangeDetails {
  ApplicationVersionUpdatedFrom: number;
  ApplicationVersionUpdatedTo: number;
}
export const ApplicationVersionChangeDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationVersionUpdatedFrom: S.Number,
    ApplicationVersionUpdatedTo: S.Number,
  }),
).annotate({
  identifier: "ApplicationVersionChangeDetails",
}) as any as S.Schema<ApplicationVersionChangeDetails>;
export type ErrorString = string;
export interface ErrorInfo {
  ErrorString?: string;
}
export const ErrorInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ErrorString: S.optional(S.String) }),
).annotate({ identifier: "ErrorInfo" }) as any as S.Schema<ErrorInfo>;
export interface OperationFailureDetails {
  RollbackOperationId?: string;
  ErrorInfo?: ErrorInfo;
}
export const OperationFailureDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RollbackOperationId: S.optional(S.String),
    ErrorInfo: S.optional(ErrorInfo),
  }),
).annotate({
  identifier: "OperationFailureDetails",
}) as any as S.Schema<OperationFailureDetails>;
export interface ApplicationOperationInfoDetails {
  Operation: string;
  StartTime: Date;
  EndTime: Date;
  OperationStatus: OperationStatus;
  ApplicationVersionChangeDetails?: ApplicationVersionChangeDetails;
  OperationFailureDetails?: OperationFailureDetails;
}
export const ApplicationOperationInfoDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Operation: S.String,
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    OperationStatus: OperationStatus,
    ApplicationVersionChangeDetails: S.optional(
      ApplicationVersionChangeDetails,
    ),
    OperationFailureDetails: S.optional(OperationFailureDetails),
  }),
).annotate({
  identifier: "ApplicationOperationInfoDetails",
}) as any as S.Schema<ApplicationOperationInfoDetails>;
export interface DescribeApplicationOperationResponse {
  ApplicationOperationInfoDetails?: ApplicationOperationInfoDetails;
}
export const DescribeApplicationOperationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ApplicationOperationInfoDetails: S.optional(
        ApplicationOperationInfoDetails,
      ),
    }).pipe(ns),
).annotate({
  identifier: "DescribeApplicationOperationResponse",
}) as any as S.Schema<DescribeApplicationOperationResponse>;
export interface DescribeApplicationSnapshotRequest {
  ApplicationName: string;
  SnapshotName: string;
}
export const DescribeApplicationSnapshotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationName: S.String, SnapshotName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeApplicationSnapshotRequest",
}) as any as S.Schema<DescribeApplicationSnapshotRequest>;
export type SnapshotStatus =
  | "CREATING"
  | "READY"
  | "DELETING"
  | "FAILED"
  | (string & {});
export const SnapshotStatus = /*@__PURE__*/ S.String;

export interface SnapshotDetails {
  SnapshotName: string;
  SnapshotStatus: SnapshotStatus;
  ApplicationVersionId: number;
  SnapshotCreationTimestamp?: Date;
  RuntimeEnvironment?: RuntimeEnvironment;
  ApplicationEncryptionConfigurationDescription?: ApplicationEncryptionConfigurationDescription;
}
export const SnapshotDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnapshotName: S.String,
    SnapshotStatus: SnapshotStatus,
    ApplicationVersionId: S.Number,
    SnapshotCreationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    RuntimeEnvironment: S.optional(RuntimeEnvironment),
    ApplicationEncryptionConfigurationDescription: S.optional(
      ApplicationEncryptionConfigurationDescription,
    ),
  }),
).annotate({
  identifier: "SnapshotDetails",
}) as any as S.Schema<SnapshotDetails>;
export interface DescribeApplicationSnapshotResponse {
  SnapshotDetails: SnapshotDetails;
}
export const DescribeApplicationSnapshotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SnapshotDetails: SnapshotDetails }).pipe(ns),
).annotate({
  identifier: "DescribeApplicationSnapshotResponse",
}) as any as S.Schema<DescribeApplicationSnapshotResponse>;
export interface DescribeApplicationVersionRequest {
  ApplicationName: string;
  ApplicationVersionId: number;
}
export const DescribeApplicationVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationName: S.String, ApplicationVersionId: S.Number }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeApplicationVersionRequest",
}) as any as S.Schema<DescribeApplicationVersionRequest>;
export interface DescribeApplicationVersionResponse {
  ApplicationVersionDetail?: ApplicationDetail;
}
export const DescribeApplicationVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationVersionDetail: S.optional(ApplicationDetail) }).pipe(
    ns,
  ),
).annotate({
  identifier: "DescribeApplicationVersionResponse",
}) as any as S.Schema<DescribeApplicationVersionResponse>;
export interface S3Configuration {
  BucketARN: string;
  FileKey: string;
}
export const S3Configuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BucketARN: S.String, FileKey: S.String }),
).annotate({
  identifier: "S3Configuration",
}) as any as S.Schema<S3Configuration>;
export interface DiscoverInputSchemaRequest {
  ResourceARN?: string;
  ServiceExecutionRole: string;
  InputStartingPositionConfiguration?: InputStartingPositionConfiguration;
  S3Configuration?: S3Configuration;
  InputProcessingConfiguration?: InputProcessingConfiguration;
}
export const DiscoverInputSchemaRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARN: S.optional(S.String),
    ServiceExecutionRole: S.String,
    InputStartingPositionConfiguration: S.optional(
      InputStartingPositionConfiguration,
    ),
    S3Configuration: S.optional(S3Configuration),
    InputProcessingConfiguration: S.optional(InputProcessingConfiguration),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DiscoverInputSchemaRequest",
}) as any as S.Schema<DiscoverInputSchemaRequest>;
export type ParsedInputRecordField = string;
export type ParsedInputRecord = string[];
export const ParsedInputRecord = /*@__PURE__*/ S.Array(S.String);
export type ParsedInputRecords = string[][];
export const ParsedInputRecords = /*@__PURE__*/ S.Array(ParsedInputRecord);
export type ProcessedInputRecord = string;
export type ProcessedInputRecords = string[];
export const ProcessedInputRecords = /*@__PURE__*/ S.Array(S.String);
export type RawInputRecord = string;
export type RawInputRecords = string[];
export const RawInputRecords = /*@__PURE__*/ S.Array(S.String);
export interface DiscoverInputSchemaResponse {
  InputSchema?: SourceSchema;
  ParsedInputRecords?: string[][];
  ProcessedInputRecords?: string[];
  RawInputRecords?: string[];
}
export const DiscoverInputSchemaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputSchema: S.optional(SourceSchema),
    ParsedInputRecords: S.optional(ParsedInputRecords),
    ProcessedInputRecords: S.optional(ProcessedInputRecords),
    RawInputRecords: S.optional(RawInputRecords),
  }).pipe(ns),
).annotate({
  identifier: "DiscoverInputSchemaResponse",
}) as any as S.Schema<DiscoverInputSchemaResponse>;
export type ListApplicationOperationsInputLimit = number;
export type NextToken = string;
export interface ListApplicationOperationsRequest {
  ApplicationName: string;
  Limit?: number;
  NextToken?: string;
  Operation?: string;
  OperationStatus?: OperationStatus;
}
export const ListApplicationOperationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Operation: S.optional(S.String),
    OperationStatus: S.optional(OperationStatus),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListApplicationOperationsRequest",
}) as any as S.Schema<ListApplicationOperationsRequest>;
export interface ApplicationOperationInfo {
  Operation?: string;
  OperationId?: string;
  StartTime?: Date;
  EndTime?: Date;
  OperationStatus?: OperationStatus;
}
export const ApplicationOperationInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Operation: S.optional(S.String),
    OperationId: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    OperationStatus: S.optional(OperationStatus),
  }),
).annotate({
  identifier: "ApplicationOperationInfo",
}) as any as S.Schema<ApplicationOperationInfo>;
export type ApplicationOperationInfoList = ApplicationOperationInfo[];
export const ApplicationOperationInfoList = /*@__PURE__*/ S.Array(
  ApplicationOperationInfo,
);
export interface ListApplicationOperationsResponse {
  ApplicationOperationInfoList?: ApplicationOperationInfo[];
  NextToken?: string;
}
export const ListApplicationOperationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationOperationInfoList: S.optional(ApplicationOperationInfoList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListApplicationOperationsResponse",
}) as any as S.Schema<ListApplicationOperationsResponse>;
export type ListApplicationsInputLimit = number;
export interface ListApplicationsRequest {
  Limit?: number;
  NextToken?: string;
}
export const ListApplicationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListApplicationsRequest",
}) as any as S.Schema<ListApplicationsRequest>;
export interface ApplicationSummary {
  ApplicationName: string;
  ApplicationARN: string;
  ApplicationStatus: ApplicationStatus;
  ApplicationVersionId: number;
  RuntimeEnvironment: RuntimeEnvironment;
  ApplicationMode?: ApplicationMode;
}
export const ApplicationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    ApplicationARN: S.String,
    ApplicationStatus: ApplicationStatus,
    ApplicationVersionId: S.Number,
    RuntimeEnvironment: RuntimeEnvironment,
    ApplicationMode: S.optional(ApplicationMode),
  }),
).annotate({
  identifier: "ApplicationSummary",
}) as any as S.Schema<ApplicationSummary>;
export type ApplicationSummaries = ApplicationSummary[];
export const ApplicationSummaries = /*@__PURE__*/ S.Array(ApplicationSummary);
export interface ListApplicationsResponse {
  ApplicationSummaries: ApplicationSummary[];
  NextToken?: string;
}
export const ListApplicationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationSummaries: ApplicationSummaries,
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListApplicationsResponse",
}) as any as S.Schema<ListApplicationsResponse>;
export type ListSnapshotsInputLimit = number;
export interface ListApplicationSnapshotsRequest {
  ApplicationName: string;
  Limit?: number;
  NextToken?: string;
}
export const ListApplicationSnapshotsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListApplicationSnapshotsRequest",
}) as any as S.Schema<ListApplicationSnapshotsRequest>;
export type SnapshotSummaries = SnapshotDetails[];
export const SnapshotSummaries = /*@__PURE__*/ S.Array(SnapshotDetails);
export interface ListApplicationSnapshotsResponse {
  SnapshotSummaries?: SnapshotDetails[];
  NextToken?: string;
}
export const ListApplicationSnapshotsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SnapshotSummaries: S.optional(SnapshotSummaries),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListApplicationSnapshotsResponse",
}) as any as S.Schema<ListApplicationSnapshotsResponse>;
export type ListApplicationVersionsInputLimit = number;
export interface ListApplicationVersionsRequest {
  ApplicationName: string;
  Limit?: number;
  NextToken?: string;
}
export const ListApplicationVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    Limit: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListApplicationVersionsRequest",
}) as any as S.Schema<ListApplicationVersionsRequest>;
export interface ApplicationVersionSummary {
  ApplicationVersionId: number;
  ApplicationStatus: ApplicationStatus;
}
export const ApplicationVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationVersionId: S.Number,
    ApplicationStatus: ApplicationStatus,
  }),
).annotate({
  identifier: "ApplicationVersionSummary",
}) as any as S.Schema<ApplicationVersionSummary>;
export type ApplicationVersionSummaries = ApplicationVersionSummary[];
export const ApplicationVersionSummaries = /*@__PURE__*/ S.Array(
  ApplicationVersionSummary,
);
export interface ListApplicationVersionsResponse {
  ApplicationVersionSummaries?: ApplicationVersionSummary[];
  NextToken?: string;
}
export const ListApplicationVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationVersionSummaries: S.optional(ApplicationVersionSummaries),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListApplicationVersionsResponse",
}) as any as S.Schema<ListApplicationVersionsResponse>;
export type KinesisAnalyticsARN = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
  S.Struct({ Tags: S.optional(Tags) }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface RollbackApplicationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
}
export const RollbackApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    CurrentApplicationVersionId: S.Number,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RollbackApplicationRequest",
}) as any as S.Schema<RollbackApplicationRequest>;
export interface RollbackApplicationResponse {
  ApplicationDetail: ApplicationDetail;
  OperationId?: string;
}
export const RollbackApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationDetail: ApplicationDetail,
    OperationId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "RollbackApplicationResponse",
}) as any as S.Schema<RollbackApplicationResponse>;
export interface SqlRunConfiguration {
  InputId: string;
  InputStartingPositionConfiguration: InputStartingPositionConfiguration;
}
export const SqlRunConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputId: S.String,
    InputStartingPositionConfiguration: InputStartingPositionConfiguration,
  }),
).annotate({
  identifier: "SqlRunConfiguration",
}) as any as S.Schema<SqlRunConfiguration>;
export type SqlRunConfigurations = SqlRunConfiguration[];
export const SqlRunConfigurations = /*@__PURE__*/ S.Array(SqlRunConfiguration);
export interface RunConfiguration {
  FlinkRunConfiguration?: FlinkRunConfiguration;
  SqlRunConfigurations?: SqlRunConfiguration[];
  ApplicationRestoreConfiguration?: ApplicationRestoreConfiguration;
}
export const RunConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlinkRunConfiguration: S.optional(FlinkRunConfiguration),
    SqlRunConfigurations: S.optional(SqlRunConfigurations),
    ApplicationRestoreConfiguration: S.optional(
      ApplicationRestoreConfiguration,
    ),
  }),
).annotate({
  identifier: "RunConfiguration",
}) as any as S.Schema<RunConfiguration>;
export interface StartApplicationRequest {
  ApplicationName: string;
  RunConfiguration?: RunConfiguration;
}
export const StartApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    RunConfiguration: S.optional(RunConfiguration),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartApplicationRequest",
}) as any as S.Schema<StartApplicationRequest>;
export interface StartApplicationResponse {
  OperationId?: string;
}
export const StartApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StartApplicationResponse",
}) as any as S.Schema<StartApplicationResponse>;
export interface StopApplicationRequest {
  ApplicationName: string;
  Force?: boolean;
}
export const StopApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationName: S.String, Force: S.optional(S.Boolean) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopApplicationRequest",
}) as any as S.Schema<StopApplicationRequest>;
export interface StopApplicationResponse {
  OperationId?: string;
}
export const StopApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StopApplicationResponse",
}) as any as S.Schema<StopApplicationResponse>;
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, Tags: Tags }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
export type TagKeys = string[];
export const TagKeys = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, TagKeys: TagKeys }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
export interface InputLambdaProcessorUpdate {
  ResourceARNUpdate: string;
}
export const InputLambdaProcessorUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARNUpdate: S.String }),
).annotate({
  identifier: "InputLambdaProcessorUpdate",
}) as any as S.Schema<InputLambdaProcessorUpdate>;
export interface InputProcessingConfigurationUpdate {
  InputLambdaProcessorUpdate: InputLambdaProcessorUpdate;
}
export const InputProcessingConfigurationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InputLambdaProcessorUpdate: InputLambdaProcessorUpdate }),
).annotate({
  identifier: "InputProcessingConfigurationUpdate",
}) as any as S.Schema<InputProcessingConfigurationUpdate>;
export interface KinesisStreamsInputUpdate {
  ResourceARNUpdate: string;
}
export const KinesisStreamsInputUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARNUpdate: S.String }),
).annotate({
  identifier: "KinesisStreamsInputUpdate",
}) as any as S.Schema<KinesisStreamsInputUpdate>;
export interface KinesisFirehoseInputUpdate {
  ResourceARNUpdate: string;
}
export const KinesisFirehoseInputUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARNUpdate: S.String }),
).annotate({
  identifier: "KinesisFirehoseInputUpdate",
}) as any as S.Schema<KinesisFirehoseInputUpdate>;
export interface InputSchemaUpdate {
  RecordFormatUpdate?: RecordFormat;
  RecordEncodingUpdate?: string;
  RecordColumnUpdates?: RecordColumn[];
}
export const InputSchemaUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RecordFormatUpdate: S.optional(RecordFormat),
    RecordEncodingUpdate: S.optional(S.String),
    RecordColumnUpdates: S.optional(RecordColumns),
  }),
).annotate({
  identifier: "InputSchemaUpdate",
}) as any as S.Schema<InputSchemaUpdate>;
export interface InputParallelismUpdate {
  CountUpdate: number;
}
export const InputParallelismUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CountUpdate: S.Number }),
).annotate({
  identifier: "InputParallelismUpdate",
}) as any as S.Schema<InputParallelismUpdate>;
export interface InputUpdate {
  InputId: string;
  NamePrefixUpdate?: string;
  InputProcessingConfigurationUpdate?: InputProcessingConfigurationUpdate;
  KinesisStreamsInputUpdate?: KinesisStreamsInputUpdate;
  KinesisFirehoseInputUpdate?: KinesisFirehoseInputUpdate;
  InputSchemaUpdate?: InputSchemaUpdate;
  InputParallelismUpdate?: InputParallelismUpdate;
}
export const InputUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputId: S.String,
    NamePrefixUpdate: S.optional(S.String),
    InputProcessingConfigurationUpdate: S.optional(
      InputProcessingConfigurationUpdate,
    ),
    KinesisStreamsInputUpdate: S.optional(KinesisStreamsInputUpdate),
    KinesisFirehoseInputUpdate: S.optional(KinesisFirehoseInputUpdate),
    InputSchemaUpdate: S.optional(InputSchemaUpdate),
    InputParallelismUpdate: S.optional(InputParallelismUpdate),
  }),
).annotate({ identifier: "InputUpdate" }) as any as S.Schema<InputUpdate>;
export type InputUpdates = InputUpdate[];
export const InputUpdates = /*@__PURE__*/ S.Array(InputUpdate);
export interface KinesisStreamsOutputUpdate {
  ResourceARNUpdate: string;
}
export const KinesisStreamsOutputUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARNUpdate: S.String }),
).annotate({
  identifier: "KinesisStreamsOutputUpdate",
}) as any as S.Schema<KinesisStreamsOutputUpdate>;
export interface KinesisFirehoseOutputUpdate {
  ResourceARNUpdate: string;
}
export const KinesisFirehoseOutputUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARNUpdate: S.String }),
).annotate({
  identifier: "KinesisFirehoseOutputUpdate",
}) as any as S.Schema<KinesisFirehoseOutputUpdate>;
export interface LambdaOutputUpdate {
  ResourceARNUpdate: string;
}
export const LambdaOutputUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARNUpdate: S.String }),
).annotate({
  identifier: "LambdaOutputUpdate",
}) as any as S.Schema<LambdaOutputUpdate>;
export interface OutputUpdate {
  OutputId: string;
  NameUpdate?: string;
  KinesisStreamsOutputUpdate?: KinesisStreamsOutputUpdate;
  KinesisFirehoseOutputUpdate?: KinesisFirehoseOutputUpdate;
  LambdaOutputUpdate?: LambdaOutputUpdate;
  DestinationSchemaUpdate?: DestinationSchema;
}
export const OutputUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutputId: S.String,
    NameUpdate: S.optional(S.String),
    KinesisStreamsOutputUpdate: S.optional(KinesisStreamsOutputUpdate),
    KinesisFirehoseOutputUpdate: S.optional(KinesisFirehoseOutputUpdate),
    LambdaOutputUpdate: S.optional(LambdaOutputUpdate),
    DestinationSchemaUpdate: S.optional(DestinationSchema),
  }),
).annotate({ identifier: "OutputUpdate" }) as any as S.Schema<OutputUpdate>;
export type OutputUpdates = OutputUpdate[];
export const OutputUpdates = /*@__PURE__*/ S.Array(OutputUpdate);
export interface S3ReferenceDataSourceUpdate {
  BucketARNUpdate?: string;
  FileKeyUpdate?: string;
}
export const S3ReferenceDataSourceUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BucketARNUpdate: S.optional(S.String),
    FileKeyUpdate: S.optional(S.String),
  }),
).annotate({
  identifier: "S3ReferenceDataSourceUpdate",
}) as any as S.Schema<S3ReferenceDataSourceUpdate>;
export interface ReferenceDataSourceUpdate {
  ReferenceId: string;
  TableNameUpdate?: string;
  S3ReferenceDataSourceUpdate?: S3ReferenceDataSourceUpdate;
  ReferenceSchemaUpdate?: SourceSchema;
}
export const ReferenceDataSourceUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReferenceId: S.String,
    TableNameUpdate: S.optional(S.String),
    S3ReferenceDataSourceUpdate: S.optional(S3ReferenceDataSourceUpdate),
    ReferenceSchemaUpdate: S.optional(SourceSchema),
  }),
).annotate({
  identifier: "ReferenceDataSourceUpdate",
}) as any as S.Schema<ReferenceDataSourceUpdate>;
export type ReferenceDataSourceUpdates = ReferenceDataSourceUpdate[];
export const ReferenceDataSourceUpdates = /*@__PURE__*/ S.Array(
  ReferenceDataSourceUpdate,
);
export interface SqlApplicationConfigurationUpdate {
  InputUpdates?: InputUpdate[];
  OutputUpdates?: OutputUpdate[];
  ReferenceDataSourceUpdates?: ReferenceDataSourceUpdate[];
}
export const SqlApplicationConfigurationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputUpdates: S.optional(InputUpdates),
    OutputUpdates: S.optional(OutputUpdates),
    ReferenceDataSourceUpdates: S.optional(ReferenceDataSourceUpdates),
  }),
).annotate({
  identifier: "SqlApplicationConfigurationUpdate",
}) as any as S.Schema<SqlApplicationConfigurationUpdate>;
export interface S3ContentLocationUpdate {
  BucketARNUpdate?: string;
  FileKeyUpdate?: string;
  ObjectVersionUpdate?: string;
}
export const S3ContentLocationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BucketARNUpdate: S.optional(S.String),
    FileKeyUpdate: S.optional(S.String),
    ObjectVersionUpdate: S.optional(S.String),
  }),
).annotate({
  identifier: "S3ContentLocationUpdate",
}) as any as S.Schema<S3ContentLocationUpdate>;
export interface CodeContentUpdate {
  TextContentUpdate?: string;
  ZipFileContentUpdate?: Uint8Array;
  S3ContentLocationUpdate?: S3ContentLocationUpdate;
}
export const CodeContentUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TextContentUpdate: S.optional(S.String),
    ZipFileContentUpdate: S.optional(T.Blob),
    S3ContentLocationUpdate: S.optional(S3ContentLocationUpdate),
  }),
).annotate({
  identifier: "CodeContentUpdate",
}) as any as S.Schema<CodeContentUpdate>;
export interface ApplicationCodeConfigurationUpdate {
  CodeContentTypeUpdate?: CodeContentType;
  CodeContentUpdate?: CodeContentUpdate;
}
export const ApplicationCodeConfigurationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CodeContentTypeUpdate: S.optional(CodeContentType),
    CodeContentUpdate: S.optional(CodeContentUpdate),
  }),
).annotate({
  identifier: "ApplicationCodeConfigurationUpdate",
}) as any as S.Schema<ApplicationCodeConfigurationUpdate>;
export interface CheckpointConfigurationUpdate {
  ConfigurationTypeUpdate?: ConfigurationType;
  CheckpointingEnabledUpdate?: boolean;
  CheckpointIntervalUpdate?: number;
  MinPauseBetweenCheckpointsUpdate?: number;
}
export const CheckpointConfigurationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationTypeUpdate: S.optional(ConfigurationType),
    CheckpointingEnabledUpdate: S.optional(S.Boolean),
    CheckpointIntervalUpdate: S.optional(S.Number),
    MinPauseBetweenCheckpointsUpdate: S.optional(S.Number),
  }),
).annotate({
  identifier: "CheckpointConfigurationUpdate",
}) as any as S.Schema<CheckpointConfigurationUpdate>;
export interface MonitoringConfigurationUpdate {
  ConfigurationTypeUpdate?: ConfigurationType;
  MetricsLevelUpdate?: MetricsLevel;
  LogLevelUpdate?: LogLevel;
}
export const MonitoringConfigurationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationTypeUpdate: S.optional(ConfigurationType),
    MetricsLevelUpdate: S.optional(MetricsLevel),
    LogLevelUpdate: S.optional(LogLevel),
  }),
).annotate({
  identifier: "MonitoringConfigurationUpdate",
}) as any as S.Schema<MonitoringConfigurationUpdate>;
export interface ParallelismConfigurationUpdate {
  ConfigurationTypeUpdate?: ConfigurationType;
  ParallelismUpdate?: number;
  ParallelismPerKPUUpdate?: number;
  AutoScalingEnabledUpdate?: boolean;
}
export const ParallelismConfigurationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationTypeUpdate: S.optional(ConfigurationType),
    ParallelismUpdate: S.optional(S.Number),
    ParallelismPerKPUUpdate: S.optional(S.Number),
    AutoScalingEnabledUpdate: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ParallelismConfigurationUpdate",
}) as any as S.Schema<ParallelismConfigurationUpdate>;
export interface FlinkApplicationConfigurationUpdate {
  CheckpointConfigurationUpdate?: CheckpointConfigurationUpdate;
  MonitoringConfigurationUpdate?: MonitoringConfigurationUpdate;
  ParallelismConfigurationUpdate?: ParallelismConfigurationUpdate;
}
export const FlinkApplicationConfigurationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CheckpointConfigurationUpdate: S.optional(CheckpointConfigurationUpdate),
    MonitoringConfigurationUpdate: S.optional(MonitoringConfigurationUpdate),
    ParallelismConfigurationUpdate: S.optional(ParallelismConfigurationUpdate),
  }),
).annotate({
  identifier: "FlinkApplicationConfigurationUpdate",
}) as any as S.Schema<FlinkApplicationConfigurationUpdate>;
export interface EnvironmentPropertyUpdates {
  PropertyGroups: PropertyGroup[];
}
export const EnvironmentPropertyUpdates = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PropertyGroups: PropertyGroups }),
).annotate({
  identifier: "EnvironmentPropertyUpdates",
}) as any as S.Schema<EnvironmentPropertyUpdates>;
export interface ApplicationSnapshotConfigurationUpdate {
  SnapshotsEnabledUpdate: boolean;
}
export const ApplicationSnapshotConfigurationUpdate = /*@__PURE__*/ S.suspend(
  () => S.Struct({ SnapshotsEnabledUpdate: S.Boolean }),
).annotate({
  identifier: "ApplicationSnapshotConfigurationUpdate",
}) as any as S.Schema<ApplicationSnapshotConfigurationUpdate>;
export interface ApplicationSystemRollbackConfigurationUpdate {
  RollbackEnabledUpdate: boolean;
}
export const ApplicationSystemRollbackConfigurationUpdate =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ RollbackEnabledUpdate: S.Boolean }),
  ).annotate({
    identifier: "ApplicationSystemRollbackConfigurationUpdate",
  }) as any as S.Schema<ApplicationSystemRollbackConfigurationUpdate>;
export interface VpcConfigurationUpdate {
  VpcConfigurationId: string;
  SubnetIdUpdates?: string[];
  SecurityGroupIdUpdates?: string[];
}
export const VpcConfigurationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VpcConfigurationId: S.String,
    SubnetIdUpdates: S.optional(SubnetIds),
    SecurityGroupIdUpdates: S.optional(SecurityGroupIds),
  }),
).annotate({
  identifier: "VpcConfigurationUpdate",
}) as any as S.Schema<VpcConfigurationUpdate>;
export type VpcConfigurationUpdates = VpcConfigurationUpdate[];
export const VpcConfigurationUpdates = /*@__PURE__*/ S.Array(
  VpcConfigurationUpdate,
);
export interface ZeppelinMonitoringConfigurationUpdate {
  LogLevelUpdate: LogLevel;
}
export const ZeppelinMonitoringConfigurationUpdate = /*@__PURE__*/ S.suspend(
  () => S.Struct({ LogLevelUpdate: LogLevel }),
).annotate({
  identifier: "ZeppelinMonitoringConfigurationUpdate",
}) as any as S.Schema<ZeppelinMonitoringConfigurationUpdate>;
export interface GlueDataCatalogConfigurationUpdate {
  DatabaseARNUpdate: string;
}
export const GlueDataCatalogConfigurationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatabaseARNUpdate: S.String }),
).annotate({
  identifier: "GlueDataCatalogConfigurationUpdate",
}) as any as S.Schema<GlueDataCatalogConfigurationUpdate>;
export interface CatalogConfigurationUpdate {
  GlueDataCatalogConfigurationUpdate: GlueDataCatalogConfigurationUpdate;
}
export const CatalogConfigurationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlueDataCatalogConfigurationUpdate: GlueDataCatalogConfigurationUpdate,
  }),
).annotate({
  identifier: "CatalogConfigurationUpdate",
}) as any as S.Schema<CatalogConfigurationUpdate>;
export interface S3ContentBaseLocationUpdate {
  BucketARNUpdate?: string;
  BasePathUpdate?: string;
}
export const S3ContentBaseLocationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BucketARNUpdate: S.optional(S.String),
    BasePathUpdate: S.optional(S.String),
  }),
).annotate({
  identifier: "S3ContentBaseLocationUpdate",
}) as any as S.Schema<S3ContentBaseLocationUpdate>;
export interface DeployAsApplicationConfigurationUpdate {
  S3ContentLocationUpdate?: S3ContentBaseLocationUpdate;
}
export const DeployAsApplicationConfigurationUpdate = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      S3ContentLocationUpdate: S.optional(S3ContentBaseLocationUpdate),
    }),
).annotate({
  identifier: "DeployAsApplicationConfigurationUpdate",
}) as any as S.Schema<DeployAsApplicationConfigurationUpdate>;
export interface ZeppelinApplicationConfigurationUpdate {
  MonitoringConfigurationUpdate?: ZeppelinMonitoringConfigurationUpdate;
  CatalogConfigurationUpdate?: CatalogConfigurationUpdate;
  DeployAsApplicationConfigurationUpdate?: DeployAsApplicationConfigurationUpdate;
  CustomArtifactsConfigurationUpdate?: CustomArtifactConfiguration[];
}
export const ZeppelinApplicationConfigurationUpdate = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MonitoringConfigurationUpdate: S.optional(
        ZeppelinMonitoringConfigurationUpdate,
      ),
      CatalogConfigurationUpdate: S.optional(CatalogConfigurationUpdate),
      DeployAsApplicationConfigurationUpdate: S.optional(
        DeployAsApplicationConfigurationUpdate,
      ),
      CustomArtifactsConfigurationUpdate: S.optional(
        CustomArtifactsConfigurationList,
      ),
    }),
).annotate({
  identifier: "ZeppelinApplicationConfigurationUpdate",
}) as any as S.Schema<ZeppelinApplicationConfigurationUpdate>;
export interface ApplicationEncryptionConfigurationUpdate {
  KeyIdUpdate?: string;
  KeyTypeUpdate: KeyType;
}
export const ApplicationEncryptionConfigurationUpdate = /*@__PURE__*/ S.suspend(
  () => S.Struct({ KeyIdUpdate: S.optional(S.String), KeyTypeUpdate: KeyType }),
).annotate({
  identifier: "ApplicationEncryptionConfigurationUpdate",
}) as any as S.Schema<ApplicationEncryptionConfigurationUpdate>;
export interface ApplicationConfigurationUpdate {
  SqlApplicationConfigurationUpdate?: SqlApplicationConfigurationUpdate;
  ApplicationCodeConfigurationUpdate?: ApplicationCodeConfigurationUpdate;
  FlinkApplicationConfigurationUpdate?: FlinkApplicationConfigurationUpdate;
  EnvironmentPropertyUpdates?: EnvironmentPropertyUpdates;
  ApplicationSnapshotConfigurationUpdate?: ApplicationSnapshotConfigurationUpdate;
  ApplicationSystemRollbackConfigurationUpdate?: ApplicationSystemRollbackConfigurationUpdate;
  VpcConfigurationUpdates?: VpcConfigurationUpdate[];
  ZeppelinApplicationConfigurationUpdate?: ZeppelinApplicationConfigurationUpdate;
  ApplicationEncryptionConfigurationUpdate?: ApplicationEncryptionConfigurationUpdate;
}
export const ApplicationConfigurationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SqlApplicationConfigurationUpdate: S.optional(
      SqlApplicationConfigurationUpdate,
    ),
    ApplicationCodeConfigurationUpdate: S.optional(
      ApplicationCodeConfigurationUpdate,
    ),
    FlinkApplicationConfigurationUpdate: S.optional(
      FlinkApplicationConfigurationUpdate,
    ),
    EnvironmentPropertyUpdates: S.optional(EnvironmentPropertyUpdates),
    ApplicationSnapshotConfigurationUpdate: S.optional(
      ApplicationSnapshotConfigurationUpdate,
    ),
    ApplicationSystemRollbackConfigurationUpdate: S.optional(
      ApplicationSystemRollbackConfigurationUpdate,
    ),
    VpcConfigurationUpdates: S.optional(VpcConfigurationUpdates),
    ZeppelinApplicationConfigurationUpdate: S.optional(
      ZeppelinApplicationConfigurationUpdate,
    ),
    ApplicationEncryptionConfigurationUpdate: S.optional(
      ApplicationEncryptionConfigurationUpdate,
    ),
  }),
).annotate({
  identifier: "ApplicationConfigurationUpdate",
}) as any as S.Schema<ApplicationConfigurationUpdate>;
export interface RunConfigurationUpdate {
  FlinkRunConfiguration?: FlinkRunConfiguration;
  ApplicationRestoreConfiguration?: ApplicationRestoreConfiguration;
}
export const RunConfigurationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlinkRunConfiguration: S.optional(FlinkRunConfiguration),
    ApplicationRestoreConfiguration: S.optional(
      ApplicationRestoreConfiguration,
    ),
  }),
).annotate({
  identifier: "RunConfigurationUpdate",
}) as any as S.Schema<RunConfigurationUpdate>;
export interface CloudWatchLoggingOptionUpdate {
  CloudWatchLoggingOptionId: string;
  LogStreamARNUpdate?: string;
}
export const CloudWatchLoggingOptionUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudWatchLoggingOptionId: S.String,
    LogStreamARNUpdate: S.optional(S.String),
  }),
).annotate({
  identifier: "CloudWatchLoggingOptionUpdate",
}) as any as S.Schema<CloudWatchLoggingOptionUpdate>;
export type CloudWatchLoggingOptionUpdates = CloudWatchLoggingOptionUpdate[];
export const CloudWatchLoggingOptionUpdates = /*@__PURE__*/ S.Array(
  CloudWatchLoggingOptionUpdate,
);
export interface UpdateApplicationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId?: number;
  ApplicationConfigurationUpdate?: ApplicationConfigurationUpdate;
  ServiceExecutionRoleUpdate?: string;
  RunConfigurationUpdate?: RunConfigurationUpdate;
  CloudWatchLoggingOptionUpdates?: CloudWatchLoggingOptionUpdate[];
  ConditionalToken?: string;
  RuntimeEnvironmentUpdate?: RuntimeEnvironment;
}
export const UpdateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    CurrentApplicationVersionId: S.optional(S.Number),
    ApplicationConfigurationUpdate: S.optional(ApplicationConfigurationUpdate),
    ServiceExecutionRoleUpdate: S.optional(S.String),
    RunConfigurationUpdate: S.optional(RunConfigurationUpdate),
    CloudWatchLoggingOptionUpdates: S.optional(CloudWatchLoggingOptionUpdates),
    ConditionalToken: S.optional(S.String),
    RuntimeEnvironmentUpdate: S.optional(RuntimeEnvironment),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateApplicationRequest",
}) as any as S.Schema<UpdateApplicationRequest>;
export interface UpdateApplicationResponse {
  ApplicationDetail: ApplicationDetail;
  OperationId?: string;
}
export const UpdateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationDetail: ApplicationDetail,
    OperationId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "UpdateApplicationResponse",
}) as any as S.Schema<UpdateApplicationResponse>;
export interface ApplicationMaintenanceConfigurationUpdate {
  ApplicationMaintenanceWindowStartTimeUpdate: string;
}
export const ApplicationMaintenanceConfigurationUpdate =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ApplicationMaintenanceWindowStartTimeUpdate: S.String }),
  ).annotate({
    identifier: "ApplicationMaintenanceConfigurationUpdate",
  }) as any as S.Schema<ApplicationMaintenanceConfigurationUpdate>;
export interface UpdateApplicationMaintenanceConfigurationRequest {
  ApplicationName: string;
  ApplicationMaintenanceConfigurationUpdate: ApplicationMaintenanceConfigurationUpdate;
}
export const UpdateApplicationMaintenanceConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationName: S.String,
      ApplicationMaintenanceConfigurationUpdate:
        ApplicationMaintenanceConfigurationUpdate,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateApplicationMaintenanceConfigurationRequest",
  }) as any as S.Schema<UpdateApplicationMaintenanceConfigurationRequest>;
export interface UpdateApplicationMaintenanceConfigurationResponse {
  ApplicationARN?: string;
  ApplicationMaintenanceConfigurationDescription?: ApplicationMaintenanceConfigurationDescription;
}
export const UpdateApplicationMaintenanceConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationARN: S.optional(S.String),
      ApplicationMaintenanceConfigurationDescription: S.optional(
        ApplicationMaintenanceConfigurationDescription,
      ),
    }).pipe(ns),
  ).annotate({
    identifier: "UpdateApplicationMaintenanceConfigurationResponse",
  }) as any as S.Schema<UpdateApplicationMaintenanceConfigurationResponse>;
export type ErrorMessage = string;
export type AddApplicationCloudWatchLoggingOptionError =
  | ConcurrentModificationException
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds an Amazon CloudWatch log stream to monitor application configuration errors.
 */
export const addApplicationCloudWatchLoggingOption: API.OperationMethod<
  AddApplicationCloudWatchLoggingOptionRequest,
  AddApplicationCloudWatchLoggingOptionResponse,
  AddApplicationCloudWatchLoggingOptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddApplicationCloudWatchLoggingOptionRequest,
  output: AddApplicationCloudWatchLoggingOptionResponse,
  errors: [
    ConcurrentModificationException,
    InvalidApplicationConfigurationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddApplicationCloudWatchLoggingOption",
}));

export type AddApplicationInputError =
  | CodeValidationException
  | ConcurrentModificationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds a streaming source to your SQL-based Kinesis Data Analytics application.
 *
 * You can add a streaming source when you create an application, or you can use this
 * operation to add a streaming source after you create an application. For more information, see
 * CreateApplication.
 *
 * Any configuration update, including adding a streaming source using this operation,
 * results in a new version of the application. You can use the DescribeApplication operation
 * to find the current application version.
 */
export const addApplicationInput: API.OperationMethod<
  AddApplicationInputRequest,
  AddApplicationInputResponse,
  AddApplicationInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddApplicationInputRequest,
  output: AddApplicationInputResponse,
  errors: [
    CodeValidationException,
    ConcurrentModificationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddApplicationInput",
}));

export type AddApplicationInputProcessingConfigurationError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds an InputProcessingConfiguration to a SQL-based Kinesis Data Analytics application. An input processor pre-processes records
 * on the input stream before the
 * application's SQL code executes. Currently, the only input processor available is Amazon Lambda.
 */
export const addApplicationInputProcessingConfiguration: API.OperationMethod<
  AddApplicationInputProcessingConfigurationRequest,
  AddApplicationInputProcessingConfigurationResponse,
  AddApplicationInputProcessingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddApplicationInputProcessingConfigurationRequest,
  output: AddApplicationInputProcessingConfigurationResponse,
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddApplicationInputProcessingConfiguration",
}));

export type AddApplicationOutputError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds an external destination to your SQL-based Kinesis Data Analytics application.
 *
 * If you want Kinesis Data Analytics to deliver data from an in-application stream within
 * your application to an external destination (such as an Kinesis data stream, a Kinesis Data
 * Firehose delivery stream, or an Amazon Lambda function), you add the relevant configuration to
 * your application using this operation. You can configure one or more outputs for your
 * application. Each output configuration maps an in-application stream and an external
 * destination.
 *
 * You can use one of the output configurations to deliver data from your
 * in-application error stream to an external destination so that you can analyze the
 * errors.
 *
 * Any configuration update, including adding a streaming source using this
 * operation, results in a new version of the application. You can use the DescribeApplication operation to find the current application
 * version.
 */
export const addApplicationOutput: API.OperationMethod<
  AddApplicationOutputRequest,
  AddApplicationOutputResponse,
  AddApplicationOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddApplicationOutputRequest,
  output: AddApplicationOutputResponse,
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddApplicationOutput",
}));

export type AddApplicationReferenceDataSourceError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds a reference data source to an existing SQL-based Kinesis Data Analytics application.
 *
 * Kinesis Data Analytics reads reference data (that is, an Amazon S3 object) and creates an
 * in-application table within your application. In the request, you provide the source (S3
 * bucket name and object key name), name of the in-application table to create, and the
 * necessary mapping information that describes how data in an Amazon S3 object maps to columns
 * in the resulting in-application table.
 */
export const addApplicationReferenceDataSource: API.OperationMethod<
  AddApplicationReferenceDataSourceRequest,
  AddApplicationReferenceDataSourceResponse,
  AddApplicationReferenceDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddApplicationReferenceDataSourceRequest,
  output: AddApplicationReferenceDataSourceResponse,
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddApplicationReferenceDataSource",
}));

export type AddApplicationVpcConfigurationError =
  | ConcurrentModificationException
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds a Virtual Private Cloud (VPC) configuration to the application. Applications can use VPCs to store
 * and access resources securely.
 *
 * Note the following about VPC configurations for Managed Service for Apache Flink applications:
 *
 * - VPC configurations are not supported for SQL applications.
 *
 * - When a VPC is added to a Managed Service for Apache Flink application, the application can no longer be accessed from the
 * Internet directly. To enable Internet access to the application, add an Internet gateway to your VPC.
 */
export const addApplicationVpcConfiguration: API.OperationMethod<
  AddApplicationVpcConfigurationRequest,
  AddApplicationVpcConfigurationResponse,
  AddApplicationVpcConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddApplicationVpcConfigurationRequest,
  output: AddApplicationVpcConfigurationResponse,
  errors: [
    ConcurrentModificationException,
    InvalidApplicationConfigurationException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddApplicationVpcConfiguration",
}));

export type CreateApplicationError =
  | CodeValidationException
  | ConcurrentModificationException
  | InvalidArgumentException
  | InvalidRequestException
  | LimitExceededException
  | ResourceInUseException
  | TooManyTagsException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a Managed Service for Apache Flink application. For information about creating a
 * Managed Service for Apache Flink application, see Creating an
 * Application.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  CreateApplicationResponse,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApplicationRequest,
  output: CreateApplicationResponse,
  errors: [
    CodeValidationException,
    ConcurrentModificationException,
    InvalidArgumentException,
    InvalidRequestException,
    LimitExceededException,
    ResourceInUseException,
    TooManyTagsException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
}));

export type CreateApplicationPresignedUrlError =
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates and returns a URL that you can use to connect to
 * an application's extension.
 *
 * The IAM role or user used to call this API defines the permissions to access the
 * extension. After the presigned URL is created, no additional permission is required to access
 * this URL. IAM authorization policies for this API are also enforced for every HTTP request
 * that attempts to connect to the extension.
 *
 * You control the amount of time that the URL will be valid using the `SessionExpirationDurationInSeconds`
 * parameter. If you do not provide this parameter, the returned URL is valid for twelve hours.
 *
 * The URL that you get from a call to CreateApplicationPresignedUrl must be used within 3 minutes
 * to be valid.
 * If you first try to use the URL after the 3-minute limit expires, the service returns an HTTP 403 Forbidden error.
 */
export const createApplicationPresignedUrl: API.OperationMethod<
  CreateApplicationPresignedUrlRequest,
  CreateApplicationPresignedUrlResponse,
  CreateApplicationPresignedUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApplicationPresignedUrlRequest,
  output: CreateApplicationPresignedUrlResponse,
  errors: [
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplicationPresignedUrl",
}));

export type CreateApplicationSnapshotError =
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | InvalidRequestException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates a snapshot of the application's state data.
 */
export const createApplicationSnapshot: API.OperationMethod<
  CreateApplicationSnapshotRequest,
  CreateApplicationSnapshotResponse,
  CreateApplicationSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApplicationSnapshotRequest,
  output: CreateApplicationSnapshotResponse,
  errors: [
    InvalidApplicationConfigurationException,
    InvalidArgumentException,
    InvalidRequestException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplicationSnapshot",
}));

export type DeleteApplicationError =
  | ConcurrentModificationException
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified application. Managed Service for Apache Flink halts application execution and deletes the application.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationRequest,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApplicationRequest,
  output: DeleteApplicationResponse,
  errors: [
    ConcurrentModificationException,
    InvalidApplicationConfigurationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

export type DeleteApplicationCloudWatchLoggingOptionError =
  | ConcurrentModificationException
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an Amazon CloudWatch log stream from an SQL-based Kinesis Data Analytics application.
 */
export const deleteApplicationCloudWatchLoggingOption: API.OperationMethod<
  DeleteApplicationCloudWatchLoggingOptionRequest,
  DeleteApplicationCloudWatchLoggingOptionResponse,
  DeleteApplicationCloudWatchLoggingOptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApplicationCloudWatchLoggingOptionRequest,
  output: DeleteApplicationCloudWatchLoggingOptionResponse,
  errors: [
    ConcurrentModificationException,
    InvalidApplicationConfigurationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationCloudWatchLoggingOption",
}));

export type DeleteApplicationInputProcessingConfigurationError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an InputProcessingConfiguration from an input.
 */
export const deleteApplicationInputProcessingConfiguration: API.OperationMethod<
  DeleteApplicationInputProcessingConfigurationRequest,
  DeleteApplicationInputProcessingConfigurationResponse,
  DeleteApplicationInputProcessingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApplicationInputProcessingConfigurationRequest,
  output: DeleteApplicationInputProcessingConfigurationResponse,
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationInputProcessingConfiguration",
}));

export type DeleteApplicationOutputError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the output destination configuration from your SQL-based Kinesis Data Analytics application's configuration.
 * Kinesis Data Analytics will no longer write data from
 * the corresponding in-application stream to the external output destination.
 */
export const deleteApplicationOutput: API.OperationMethod<
  DeleteApplicationOutputRequest,
  DeleteApplicationOutputResponse,
  DeleteApplicationOutputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApplicationOutputRequest,
  output: DeleteApplicationOutputResponse,
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationOutput",
}));

export type DeleteApplicationReferenceDataSourceError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a reference data source configuration from the specified SQL-based Kinesis Data Analytics application's configuration.
 *
 * If the application is running, Kinesis Data Analytics immediately removes the in-application table
 * that you created using the AddApplicationReferenceDataSource operation.
 */
export const deleteApplicationReferenceDataSource: API.OperationMethod<
  DeleteApplicationReferenceDataSourceRequest,
  DeleteApplicationReferenceDataSourceResponse,
  DeleteApplicationReferenceDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApplicationReferenceDataSourceRequest,
  output: DeleteApplicationReferenceDataSourceResponse,
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationReferenceDataSource",
}));

export type DeleteApplicationSnapshotError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes a snapshot of application state.
 */
export const deleteApplicationSnapshot: API.OperationMethod<
  DeleteApplicationSnapshotRequest,
  DeleteApplicationSnapshotResponse,
  DeleteApplicationSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApplicationSnapshotRequest,
  output: DeleteApplicationSnapshotResponse,
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationSnapshot",
}));

export type DeleteApplicationVpcConfigurationError =
  | ConcurrentModificationException
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes a VPC configuration from a Managed Service for Apache Flink application.
 */
export const deleteApplicationVpcConfiguration: API.OperationMethod<
  DeleteApplicationVpcConfigurationRequest,
  DeleteApplicationVpcConfigurationResponse,
  DeleteApplicationVpcConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApplicationVpcConfigurationRequest,
  output: DeleteApplicationVpcConfigurationResponse,
  errors: [
    ConcurrentModificationException,
    InvalidApplicationConfigurationException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationVpcConfiguration",
}));

export type DescribeApplicationError =
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about a specific Managed Service for Apache Flink application.
 *
 * If you want to retrieve a list of all applications in your account,
 * use the ListApplications operation.
 */
export const describeApplication: API.OperationMethod<
  DescribeApplicationRequest,
  DescribeApplicationResponse,
  DescribeApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeApplicationRequest,
  output: DescribeApplicationResponse,
  errors: [
    InvalidArgumentException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplication",
}));

export type DescribeApplicationOperationError =
  | InvalidArgumentException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Provides a detailed description of a specified application operation. To see a list of all the operations of an application, invoke the ListApplicationOperations operation.
 *
 * This operation is supported only for Managed Service for Apache Flink.
 */
export const describeApplicationOperation: API.OperationMethod<
  DescribeApplicationOperationRequest,
  DescribeApplicationOperationResponse,
  DescribeApplicationOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeApplicationOperationRequest,
  output: DescribeApplicationOperationResponse,
  errors: [
    InvalidArgumentException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicationOperation",
}));

export type DescribeApplicationSnapshotError =
  | InvalidArgumentException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Returns information about a snapshot of application state data.
 */
export const describeApplicationSnapshot: API.OperationMethod<
  DescribeApplicationSnapshotRequest,
  DescribeApplicationSnapshotResponse,
  DescribeApplicationSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeApplicationSnapshotRequest,
  output: DescribeApplicationSnapshotResponse,
  errors: [
    InvalidArgumentException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicationSnapshot",
}));

export type DescribeApplicationVersionError =
  | InvalidArgumentException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Provides a detailed description of a specified version of the application. To see a list of all the versions of an application, invoke the ListApplicationVersions operation.
 *
 * This operation is supported only for Managed Service for Apache Flink.
 */
export const describeApplicationVersion: API.OperationMethod<
  DescribeApplicationVersionRequest,
  DescribeApplicationVersionResponse,
  DescribeApplicationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeApplicationVersionRequest,
  output: DescribeApplicationVersionResponse,
  errors: [
    InvalidArgumentException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplicationVersion",
}));

export type DiscoverInputSchemaError =
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceProvisionedThroughputExceededException
  | ServiceUnavailableException
  | UnableToDetectSchemaException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Infers a schema for a SQL-based Kinesis Data Analytics application by evaluating
 * sample records on the specified streaming source (Kinesis data stream or Kinesis Data Firehose
 * delivery stream) or Amazon S3 object. In the response, the operation returns the inferred
 * schema and also the sample records that the operation used to infer the schema.
 *
 * You can use the inferred schema when configuring a streaming source for your application.
 * When you create an application using the Kinesis Data Analytics console, the console uses this
 * operation to infer a schema and show it in the console user interface.
 */
export const discoverInputSchema: API.OperationMethod<
  DiscoverInputSchemaRequest,
  DiscoverInputSchemaResponse,
  DiscoverInputSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DiscoverInputSchemaRequest,
  output: DiscoverInputSchemaResponse,
  errors: [
    InvalidArgumentException,
    InvalidRequestException,
    ResourceProvisionedThroughputExceededException,
    ServiceUnavailableException,
    UnableToDetectSchemaException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DiscoverInputSchema",
}));

export type ListApplicationOperationsError =
  | InvalidArgumentException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists all the operations performed for the specified application such as UpdateApplication, StartApplication etc.
 * The response also includes a summary of the operation.
 *
 * To get the complete description of a specific operation, invoke the DescribeApplicationOperation operation.
 *
 * This operation is supported only for Managed Service for Apache Flink.
 */
export const listApplicationOperations: API.PaginatedOperationMethod<
  ListApplicationOperationsRequest,
  ListApplicationOperationsResponse,
  ListApplicationOperationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationOperationInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationOperationsRequest,
  output: ListApplicationOperationsResponse,
  errors: [
    InvalidArgumentException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationOperations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ApplicationOperationInfoList",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListApplicationsError = InvalidRequestException | CommonErrors;
/**
 * Returns a list of Managed Service for Apache Flink applications in your account. For each
 * application, the response includes the application name, Amazon Resource Name (ARN), and
 * status.
 *
 * If you want detailed information about a specific application, use
 * DescribeApplication.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationsRequest,
  output: ListApplicationsResponse,
  errors: [InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ApplicationSummaries",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListApplicationSnapshotsError =
  | InvalidArgumentException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists information about the current application snapshots.
 */
export const listApplicationSnapshots: API.PaginatedOperationMethod<
  ListApplicationSnapshotsRequest,
  ListApplicationSnapshotsResponse,
  ListApplicationSnapshotsError,
  Credentials | HttpClient.HttpClient,
  SnapshotDetails
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationSnapshotsRequest,
  output: ListApplicationSnapshotsResponse,
  errors: [InvalidArgumentException, UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationSnapshots",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SnapshotSummaries",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListApplicationVersionsError =
  | InvalidArgumentException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Lists all the versions for the specified application, including versions that were rolled back. The response also includes a summary of the configuration
 * associated with each version.
 *
 * To get the complete description of a specific application version, invoke the DescribeApplicationVersion operation.
 *
 * This operation is supported only for Managed Service for Apache Flink.
 */
export const listApplicationVersions: API.PaginatedOperationMethod<
  ListApplicationVersionsRequest,
  ListApplicationVersionsResponse,
  ListApplicationVersionsError,
  Credentials | HttpClient.HttpClient,
  ApplicationVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationVersionsRequest,
  output: ListApplicationVersionsResponse,
  errors: [
    InvalidArgumentException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ApplicationVersionSummaries",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the list of key-value tags assigned to the application. For more information, see
 * Using Tagging.
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
    ConcurrentModificationException,
    InvalidArgumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RollbackApplicationError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Reverts the application to the previous running version. You can roll back an
 * application if you suspect it is stuck in a transient status or in the running status.
 *
 * You can roll back an application only if it is in the `UPDATING`,
 * `AUTOSCALING`, or `RUNNING` statuses.
 *
 * When you rollback an application, it loads state data from the last successful snapshot.
 * If the application has no snapshots, Managed Service for Apache Flink rejects the rollback request.
 */
export const rollbackApplication: API.OperationMethod<
  RollbackApplicationRequest,
  RollbackApplicationResponse,
  RollbackApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RollbackApplicationRequest,
  output: RollbackApplicationResponse,
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RollbackApplication",
}));

export type StartApplicationError =
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts the specified Managed Service for Apache Flink application. After creating an application, you must exclusively call this operation to
 * start your application.
 */
export const startApplication: API.OperationMethod<
  StartApplicationRequest,
  StartApplicationResponse,
  StartApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartApplicationRequest,
  output: StartApplicationResponse,
  errors: [
    InvalidApplicationConfigurationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartApplication",
}));

export type StopApplicationError =
  | ConcurrentModificationException
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops the application from processing data. You can stop
 * an application only if it is in the running status, unless you set the `Force`
 * parameter to `true`.
 *
 * You can use the DescribeApplication operation to find the application status.
 *
 * Managed Service for Apache Flink takes a snapshot when the application is stopped, unless `Force` is set
 * to `true`.
 */
export const stopApplication: API.OperationMethod<
  StopApplicationRequest,
  StopApplicationResponse,
  StopApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopApplicationRequest,
  output: StopApplicationResponse,
  errors: [
    ConcurrentModificationException,
    InvalidApplicationConfigurationException,
    InvalidArgumentException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopApplication",
}));

export type TagResourceError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Adds one or more key-value tags to a Managed Service for Apache Flink application. Note that the maximum number of application
 * tags includes system tags. The maximum number of user-defined application tags is 50.
 * For more information, see Using Tagging.
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
    ConcurrentModificationException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Removes one or more tags from a Managed Service for Apache Flink application. For more information, see
 * Using Tagging.
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
    ConcurrentModificationException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateApplicationError =
  | CodeValidationException
  | ConcurrentModificationException
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | InvalidRequestException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an existing Managed Service for Apache Flink application. Using this operation, you
 * can update application code, input configuration, and output configuration.
 *
 * Managed Service for Apache Flink updates the `ApplicationVersionId` each time you update
 * your application.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApplicationRequest,
  output: UpdateApplicationResponse,
  errors: [
    CodeValidationException,
    ConcurrentModificationException,
    InvalidApplicationConfigurationException,
    InvalidArgumentException,
    InvalidRequestException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));

export type UpdateApplicationMaintenanceConfigurationError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates the maintenance configuration of the Managed Service for Apache Flink application.
 *
 * You can invoke this operation on an application that is in one of the two following
 * states: `READY` or `RUNNING`. If you invoke it when the application is
 * in a state other than these two states, it throws a `ResourceInUseException`. The
 * service makes use of the updated configuration the next time it schedules maintenance for the
 * application. If you invoke this operation after the service schedules maintenance, the service
 * will apply the configuration update the next time it schedules maintenance for the
 * application. This means that you might not see the maintenance configuration update applied to
 * the maintenance process that follows a successful invocation of this operation, but to the
 * following maintenance process instead.
 *
 * To see the current maintenance configuration of your application, invoke the
 * DescribeApplication operation.
 *
 * For information about application maintenance, see Managed Service for Apache Flink for Apache Flink Maintenance.
 *
 * This operation is supported only for Managed Service for Apache Flink.
 */
export const updateApplicationMaintenanceConfiguration: API.OperationMethod<
  UpdateApplicationMaintenanceConfigurationRequest,
  UpdateApplicationMaintenanceConfigurationResponse,
  UpdateApplicationMaintenanceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApplicationMaintenanceConfigurationRequest,
  output: UpdateApplicationMaintenanceConfigurationResponse,
  errors: [
    ConcurrentModificationException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplicationMaintenanceConfiguration",
}));
