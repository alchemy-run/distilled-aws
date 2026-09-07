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
  "http://analytics.kinesis.amazonaws.com/doc/2015-08-14",
);
const svc = T.AwsApiService({
  sdkId: "Kinesis Analytics",
  serviceShapeName: "KinesisAnalytics_20150814",
});
const auth = T.AwsAuthSigv4({ name: "kinesisanalytics" });
const ver = T.ServiceVersion("2015-08-14");
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
export type RoleARN = string;
export interface CloudWatchLoggingOption {
  LogStreamARN: string;
  RoleARN: string;
}
export const CloudWatchLoggingOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LogStreamARN: S.String, RoleARN: S.String }),
).annotate({
  identifier: "CloudWatchLoggingOption",
}) as any as S.Schema<CloudWatchLoggingOption>;
export interface AddApplicationCloudWatchLoggingOptionRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  CloudWatchLoggingOption: CloudWatchLoggingOption;
}
export const AddApplicationCloudWatchLoggingOptionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationName: S.String,
      CurrentApplicationVersionId: S.Number,
      CloudWatchLoggingOption: CloudWatchLoggingOption,
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
export interface AddApplicationCloudWatchLoggingOptionResponse {}
export const AddApplicationCloudWatchLoggingOptionResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "AddApplicationCloudWatchLoggingOptionResponse",
  }) as any as S.Schema<AddApplicationCloudWatchLoggingOptionResponse>;
export type InAppStreamName = string;
export type ResourceARN = string;
export interface InputLambdaProcessor {
  ResourceARN: string;
  RoleARN: string;
}
export const InputLambdaProcessor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, RoleARN: S.String }),
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
  RoleARN: string;
}
export const KinesisStreamsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, RoleARN: S.String }),
).annotate({
  identifier: "KinesisStreamsInput",
}) as any as S.Schema<KinesisStreamsInput>;
export interface KinesisFirehoseInput {
  ResourceARN: string;
  RoleARN: string;
}
export const KinesisFirehoseInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, RoleARN: S.String }),
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
export const RecordFormatType = S.String;

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
export interface AddApplicationInputResponse {}
export const AddApplicationInputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AddApplicationInputResponse",
}) as any as S.Schema<AddApplicationInputResponse>;
export type Id = string;
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
export interface AddApplicationInputProcessingConfigurationResponse {}
export const AddApplicationInputProcessingConfigurationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "AddApplicationInputProcessingConfigurationResponse",
  }) as any as S.Schema<AddApplicationInputProcessingConfigurationResponse>;
export interface KinesisStreamsOutput {
  ResourceARN: string;
  RoleARN: string;
}
export const KinesisStreamsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, RoleARN: S.String }),
).annotate({
  identifier: "KinesisStreamsOutput",
}) as any as S.Schema<KinesisStreamsOutput>;
export interface KinesisFirehoseOutput {
  ResourceARN: string;
  RoleARN: string;
}
export const KinesisFirehoseOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, RoleARN: S.String }),
).annotate({
  identifier: "KinesisFirehoseOutput",
}) as any as S.Schema<KinesisFirehoseOutput>;
export interface LambdaOutput {
  ResourceARN: string;
  RoleARN: string;
}
export const LambdaOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, RoleARN: S.String }),
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
export interface AddApplicationOutputResponse {}
export const AddApplicationOutputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AddApplicationOutputResponse",
}) as any as S.Schema<AddApplicationOutputResponse>;
export type InAppTableName = string;
export type BucketARN = string;
export type FileKey = string;
export interface S3ReferenceDataSource {
  BucketARN: string;
  FileKey: string;
  ReferenceRoleARN: string;
}
export const S3ReferenceDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BucketARN: S.String,
    FileKey: S.String,
    ReferenceRoleARN: S.String,
  }),
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
export interface AddApplicationReferenceDataSourceResponse {}
export const AddApplicationReferenceDataSourceResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "AddApplicationReferenceDataSourceResponse",
  }) as any as S.Schema<AddApplicationReferenceDataSourceResponse>;
export type ApplicationDescription = string;
export type Inputs = Input[];
export const Inputs = /*@__PURE__*/ S.Array(Input);
export type Outputs = Output[];
export const Outputs = /*@__PURE__*/ S.Array(Output);
export type CloudWatchLoggingOptions = CloudWatchLoggingOption[];
export const CloudWatchLoggingOptions = /*@__PURE__*/ S.Array(
  CloudWatchLoggingOption,
);
export type ApplicationCode = string;
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
export interface CreateApplicationRequest {
  ApplicationName: string;
  ApplicationDescription?: string;
  Inputs?: Input[];
  Outputs?: Output[];
  CloudWatchLoggingOptions?: CloudWatchLoggingOption[];
  ApplicationCode?: string;
  Tags?: Tag[];
}
export const CreateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    ApplicationDescription: S.optional(S.String),
    Inputs: S.optional(Inputs),
    Outputs: S.optional(Outputs),
    CloudWatchLoggingOptions: S.optional(CloudWatchLoggingOptions),
    ApplicationCode: S.optional(S.String),
    Tags: S.optional(Tags),
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
  | (string & {});
export const ApplicationStatus = S.String;

export interface ApplicationSummary {
  ApplicationName: string;
  ApplicationARN: string;
  ApplicationStatus: ApplicationStatus;
}
export const ApplicationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    ApplicationARN: S.String,
    ApplicationStatus: ApplicationStatus,
  }),
).annotate({
  identifier: "ApplicationSummary",
}) as any as S.Schema<ApplicationSummary>;
export interface CreateApplicationResponse {
  ApplicationSummary: ApplicationSummary;
}
export const CreateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationSummary: ApplicationSummary }).pipe(ns),
).annotate({
  identifier: "CreateApplicationResponse",
}) as any as S.Schema<CreateApplicationResponse>;
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
  CurrentApplicationVersionId: number;
  CloudWatchLoggingOptionId: string;
}
export const DeleteApplicationCloudWatchLoggingOptionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationName: S.String,
      CurrentApplicationVersionId: S.Number,
      CloudWatchLoggingOptionId: S.String,
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
export interface DeleteApplicationCloudWatchLoggingOptionResponse {}
export const DeleteApplicationCloudWatchLoggingOptionResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
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
export interface DeleteApplicationInputProcessingConfigurationResponse {}
export const DeleteApplicationInputProcessingConfigurationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
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
export interface DeleteApplicationOutputResponse {}
export const DeleteApplicationOutputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
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
export interface DeleteApplicationReferenceDataSourceResponse {}
export const DeleteApplicationReferenceDataSourceResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "DeleteApplicationReferenceDataSourceResponse",
  }) as any as S.Schema<DeleteApplicationReferenceDataSourceResponse>;
export interface DescribeApplicationRequest {
  ApplicationName: string;
}
export const DescribeApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationName: S.String }).pipe(
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
export type InAppStreamNames = string[];
export const InAppStreamNames = /*@__PURE__*/ S.Array(S.String);
export interface InputLambdaProcessorDescription {
  ResourceARN?: string;
  RoleARN?: string;
}
export const InputLambdaProcessorDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARN: S.optional(S.String),
    RoleARN: S.optional(S.String),
  }),
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
  ResourceARN?: string;
  RoleARN?: string;
}
export const KinesisStreamsInputDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARN: S.optional(S.String),
    RoleARN: S.optional(S.String),
  }),
).annotate({
  identifier: "KinesisStreamsInputDescription",
}) as any as S.Schema<KinesisStreamsInputDescription>;
export interface KinesisFirehoseInputDescription {
  ResourceARN?: string;
  RoleARN?: string;
}
export const KinesisFirehoseInputDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARN: S.optional(S.String),
    RoleARN: S.optional(S.String),
  }),
).annotate({
  identifier: "KinesisFirehoseInputDescription",
}) as any as S.Schema<KinesisFirehoseInputDescription>;
export type InputStartingPosition =
  | "NOW"
  | "TRIM_HORIZON"
  | "LAST_STOPPED_POINT"
  | (string & {});
export const InputStartingPosition = S.String;

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
export interface KinesisStreamsOutputDescription {
  ResourceARN?: string;
  RoleARN?: string;
}
export const KinesisStreamsOutputDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARN: S.optional(S.String),
    RoleARN: S.optional(S.String),
  }),
).annotate({
  identifier: "KinesisStreamsOutputDescription",
}) as any as S.Schema<KinesisStreamsOutputDescription>;
export interface KinesisFirehoseOutputDescription {
  ResourceARN?: string;
  RoleARN?: string;
}
export const KinesisFirehoseOutputDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARN: S.optional(S.String),
    RoleARN: S.optional(S.String),
  }),
).annotate({
  identifier: "KinesisFirehoseOutputDescription",
}) as any as S.Schema<KinesisFirehoseOutputDescription>;
export interface LambdaOutputDescription {
  ResourceARN?: string;
  RoleARN?: string;
}
export const LambdaOutputDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARN: S.optional(S.String),
    RoleARN: S.optional(S.String),
  }),
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
export interface S3ReferenceDataSourceDescription {
  BucketARN: string;
  FileKey: string;
  ReferenceRoleARN: string;
}
export const S3ReferenceDataSourceDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BucketARN: S.String,
    FileKey: S.String,
    ReferenceRoleARN: S.String,
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
export interface CloudWatchLoggingOptionDescription {
  CloudWatchLoggingOptionId?: string;
  LogStreamARN: string;
  RoleARN: string;
}
export const CloudWatchLoggingOptionDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudWatchLoggingOptionId: S.optional(S.String),
    LogStreamARN: S.String,
    RoleARN: S.String,
  }),
).annotate({
  identifier: "CloudWatchLoggingOptionDescription",
}) as any as S.Schema<CloudWatchLoggingOptionDescription>;
export type CloudWatchLoggingOptionDescriptions =
  CloudWatchLoggingOptionDescription[];
export const CloudWatchLoggingOptionDescriptions = /*@__PURE__*/ S.Array(
  CloudWatchLoggingOptionDescription,
);
export interface ApplicationDetail {
  ApplicationName: string;
  ApplicationDescription?: string;
  ApplicationARN: string;
  ApplicationStatus: ApplicationStatus;
  CreateTimestamp?: Date;
  LastUpdateTimestamp?: Date;
  InputDescriptions?: InputDescription[];
  OutputDescriptions?: OutputDescription[];
  ReferenceDataSourceDescriptions?: ReferenceDataSourceDescription[];
  CloudWatchLoggingOptionDescriptions?: CloudWatchLoggingOptionDescription[];
  ApplicationCode?: string;
  ApplicationVersionId: number;
}
export const ApplicationDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    ApplicationDescription: S.optional(S.String),
    ApplicationARN: S.String,
    ApplicationStatus: ApplicationStatus,
    CreateTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastUpdateTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    InputDescriptions: S.optional(InputDescriptions),
    OutputDescriptions: S.optional(OutputDescriptions),
    ReferenceDataSourceDescriptions: S.optional(
      ReferenceDataSourceDescriptions,
    ),
    CloudWatchLoggingOptionDescriptions: S.optional(
      CloudWatchLoggingOptionDescriptions,
    ),
    ApplicationCode: S.optional(S.String),
    ApplicationVersionId: S.Number,
  }),
).annotate({
  identifier: "ApplicationDetail",
}) as any as S.Schema<ApplicationDetail>;
export interface DescribeApplicationResponse {
  ApplicationDetail: ApplicationDetail;
}
export const DescribeApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationDetail: ApplicationDetail }).pipe(ns),
).annotate({
  identifier: "DescribeApplicationResponse",
}) as any as S.Schema<DescribeApplicationResponse>;
export interface S3Configuration {
  RoleARN: string;
  BucketARN: string;
  FileKey: string;
}
export const S3Configuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RoleARN: S.String, BucketARN: S.String, FileKey: S.String }),
).annotate({
  identifier: "S3Configuration",
}) as any as S.Schema<S3Configuration>;
export interface DiscoverInputSchemaRequest {
  ResourceARN?: string;
  RoleARN?: string;
  InputStartingPositionConfiguration?: InputStartingPositionConfiguration;
  S3Configuration?: S3Configuration;
  InputProcessingConfiguration?: InputProcessingConfiguration;
}
export const DiscoverInputSchemaRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARN: S.optional(S.String),
    RoleARN: S.optional(S.String),
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
export type ListApplicationsInputLimit = number;
export interface ListApplicationsRequest {
  Limit?: number;
  ExclusiveStartApplicationName?: string;
}
export const ListApplicationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Limit: S.optional(S.Number),
    ExclusiveStartApplicationName: S.optional(S.String),
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
export type ApplicationSummaries = ApplicationSummary[];
export const ApplicationSummaries = /*@__PURE__*/ S.Array(ApplicationSummary);
export interface ListApplicationsResponse {
  ApplicationSummaries: ApplicationSummary[];
  HasMoreApplications: boolean;
}
export const ListApplicationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationSummaries: ApplicationSummaries,
    HasMoreApplications: S.Boolean,
  }).pipe(ns),
).annotate({
  identifier: "ListApplicationsResponse",
}) as any as S.Schema<ListApplicationsResponse>;
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
export interface InputConfiguration {
  Id: string;
  InputStartingPositionConfiguration: InputStartingPositionConfiguration;
}
export const InputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    InputStartingPositionConfiguration: InputStartingPositionConfiguration,
  }),
).annotate({
  identifier: "InputConfiguration",
}) as any as S.Schema<InputConfiguration>;
export type InputConfigurations = InputConfiguration[];
export const InputConfigurations = /*@__PURE__*/ S.Array(InputConfiguration);
export interface StartApplicationRequest {
  ApplicationName: string;
  InputConfigurations: InputConfiguration[];
}
export const StartApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    InputConfigurations: InputConfigurations,
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
export interface StartApplicationResponse {}
export const StartApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "StartApplicationResponse",
}) as any as S.Schema<StartApplicationResponse>;
export interface StopApplicationRequest {
  ApplicationName: string;
}
export const StopApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationName: S.String }).pipe(
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
export interface StopApplicationResponse {}
export const StopApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
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
  ResourceARNUpdate?: string;
  RoleARNUpdate?: string;
}
export const InputLambdaProcessorUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARNUpdate: S.optional(S.String),
    RoleARNUpdate: S.optional(S.String),
  }),
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
  ResourceARNUpdate?: string;
  RoleARNUpdate?: string;
}
export const KinesisStreamsInputUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARNUpdate: S.optional(S.String),
    RoleARNUpdate: S.optional(S.String),
  }),
).annotate({
  identifier: "KinesisStreamsInputUpdate",
}) as any as S.Schema<KinesisStreamsInputUpdate>;
export interface KinesisFirehoseInputUpdate {
  ResourceARNUpdate?: string;
  RoleARNUpdate?: string;
}
export const KinesisFirehoseInputUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARNUpdate: S.optional(S.String),
    RoleARNUpdate: S.optional(S.String),
  }),
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
  CountUpdate?: number;
}
export const InputParallelismUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CountUpdate: S.optional(S.Number) }),
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
  ResourceARNUpdate?: string;
  RoleARNUpdate?: string;
}
export const KinesisStreamsOutputUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARNUpdate: S.optional(S.String),
    RoleARNUpdate: S.optional(S.String),
  }),
).annotate({
  identifier: "KinesisStreamsOutputUpdate",
}) as any as S.Schema<KinesisStreamsOutputUpdate>;
export interface KinesisFirehoseOutputUpdate {
  ResourceARNUpdate?: string;
  RoleARNUpdate?: string;
}
export const KinesisFirehoseOutputUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARNUpdate: S.optional(S.String),
    RoleARNUpdate: S.optional(S.String),
  }),
).annotate({
  identifier: "KinesisFirehoseOutputUpdate",
}) as any as S.Schema<KinesisFirehoseOutputUpdate>;
export interface LambdaOutputUpdate {
  ResourceARNUpdate?: string;
  RoleARNUpdate?: string;
}
export const LambdaOutputUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARNUpdate: S.optional(S.String),
    RoleARNUpdate: S.optional(S.String),
  }),
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
  ReferenceRoleARNUpdate?: string;
}
export const S3ReferenceDataSourceUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BucketARNUpdate: S.optional(S.String),
    FileKeyUpdate: S.optional(S.String),
    ReferenceRoleARNUpdate: S.optional(S.String),
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
export interface CloudWatchLoggingOptionUpdate {
  CloudWatchLoggingOptionId: string;
  LogStreamARNUpdate?: string;
  RoleARNUpdate?: string;
}
export const CloudWatchLoggingOptionUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudWatchLoggingOptionId: S.String,
    LogStreamARNUpdate: S.optional(S.String),
    RoleARNUpdate: S.optional(S.String),
  }),
).annotate({
  identifier: "CloudWatchLoggingOptionUpdate",
}) as any as S.Schema<CloudWatchLoggingOptionUpdate>;
export type CloudWatchLoggingOptionUpdates = CloudWatchLoggingOptionUpdate[];
export const CloudWatchLoggingOptionUpdates = /*@__PURE__*/ S.Array(
  CloudWatchLoggingOptionUpdate,
);
export interface ApplicationUpdate {
  InputUpdates?: InputUpdate[];
  ApplicationCodeUpdate?: string;
  OutputUpdates?: OutputUpdate[];
  ReferenceDataSourceUpdates?: ReferenceDataSourceUpdate[];
  CloudWatchLoggingOptionUpdates?: CloudWatchLoggingOptionUpdate[];
}
export const ApplicationUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputUpdates: S.optional(InputUpdates),
    ApplicationCodeUpdate: S.optional(S.String),
    OutputUpdates: S.optional(OutputUpdates),
    ReferenceDataSourceUpdates: S.optional(ReferenceDataSourceUpdates),
    CloudWatchLoggingOptionUpdates: S.optional(CloudWatchLoggingOptionUpdates),
  }),
).annotate({
  identifier: "ApplicationUpdate",
}) as any as S.Schema<ApplicationUpdate>;
export interface UpdateApplicationRequest {
  ApplicationName: string;
  CurrentApplicationVersionId: number;
  ApplicationUpdate: ApplicationUpdate;
}
export const UpdateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationName: S.String,
    CurrentApplicationVersionId: S.Number,
    ApplicationUpdate: ApplicationUpdate,
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
export interface UpdateApplicationResponse {}
export const UpdateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateApplicationResponse",
}) as any as S.Schema<UpdateApplicationResponse>;
export type ErrorMessage = string;
export type AddApplicationCloudWatchLoggingOptionError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Adds a CloudWatch log stream to monitor application configuration errors. For more
 * information about using CloudWatch log streams with Amazon Kinesis Analytics
 * applications, see Working with Amazon
 * CloudWatch Logs.
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
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddApplicationCloudWatchLoggingOption",
}));

export type AddApplicationInputError =
  | CodeValidationException
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Adds a streaming source to your Amazon Kinesis application.
 * For conceptual information,
 * see Configuring Application Input.
 *
 * You can add a streaming source either when you create an application or you can use
 * this operation to add a streaming source after you create an application. For more information, see
 * CreateApplication.
 *
 * Any configuration update, including adding a streaming source using this operation,
 * results in a new version of the application. You can use the DescribeApplication operation
 * to find the current application version.
 *
 * This operation requires permissions to perform the
 * `kinesisanalytics:AddApplicationInput` action.
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
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddApplicationInput",
}));

export type AddApplicationInputProcessingConfigurationError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Adds an InputProcessingConfiguration to an application. An input processor preprocesses records on the input stream
 * before the application's SQL code executes. Currently, the only input processor available is
 * AWS Lambda.
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
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddApplicationInputProcessingConfiguration",
}));

export type AddApplicationOutputError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Adds an external destination to your Amazon Kinesis Analytics application.
 *
 * If you want Amazon Kinesis Analytics to deliver data from an in-application stream
 * within your application to an external destination (such as an Amazon Kinesis stream, an
 * Amazon Kinesis Firehose delivery stream, or an AWS Lambda function), you add the
 * relevant configuration to your application using this operation. You can configure one
 * or more outputs for your application. Each output configuration maps an in-application
 * stream and an external destination.
 *
 * You can use one of the output configurations to deliver data from your
 * in-application error stream to an external destination so that you can analyze the
 * errors. For more information, see Understanding Application
 * Output (Destination).
 *
 * Any configuration update, including adding a streaming source using this
 * operation, results in a new version of the application. You can use the DescribeApplication operation to find the current application
 * version.
 *
 * For the limits on the number of application inputs and outputs
 * you can configure, see Limits.
 *
 * This operation requires permissions to perform the `kinesisanalytics:AddApplicationOutput` action.
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
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddApplicationOutput",
}));

export type AddApplicationReferenceDataSourceError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Adds a reference data source to an existing application.
 *
 * Amazon Kinesis Analytics reads reference data (that is, an Amazon S3 object) and creates an in-application table within your application. In the request, you provide the source (S3 bucket name and object key name), name of the in-application table to create, and the necessary mapping information that describes how data in Amazon S3 object maps to columns in the resulting in-application table.
 *
 * For conceptual information,
 * see Configuring Application Input.
 * For the limits on data sources you can add to your application, see
 * Limits.
 *
 * This operation requires permissions to perform the `kinesisanalytics:AddApplicationOutput` action.
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
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddApplicationReferenceDataSource",
}));

export type CreateApplicationError =
  | CodeValidationException
  | ConcurrentModificationException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | TooManyTagsException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Creates an Amazon Kinesis Analytics application.
 * You can configure each application with one streaming source as input,
 * application code to process the input, and up to
 * three destinations where
 * you want Amazon Kinesis Analytics to write the output data from your application.
 * For an overview, see
 * How it Works.
 *
 * In the input configuration, you map the streaming source to an in-application stream, which you can think of as a constantly updating table. In the mapping, you must provide a schema for the in-application stream and map each data column in the in-application stream to a
 * data element in the streaming source.
 *
 * Your application code is one or more SQL statements that read input data, transform it, and generate output. Your application code can create one or more SQL artifacts like SQL streams or pumps.
 *
 * In the output configuration, you can configure the application to write data from in-application streams created in your applications to up to three destinations.
 *
 * To read data from your source stream or write data to destination streams, Amazon Kinesis Analytics
 * needs your permissions. You grant these permissions by creating IAM roles. This operation requires permissions to perform the
 * `kinesisanalytics:CreateApplication` action.
 *
 * For introductory exercises to create an Amazon Kinesis Analytics application, see
 * Getting Started.
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
    LimitExceededException,
    ResourceInUseException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
}));

export type DeleteApplicationError =
  | ConcurrentModificationException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Deletes the specified application. Amazon Kinesis Analytics halts application execution and deletes the application, including any application artifacts (such as in-application streams, reference table, and application code).
 *
 * This operation requires permissions to perform the `kinesisanalytics:DeleteApplication` action.
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
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

export type DeleteApplicationCloudWatchLoggingOptionError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Deletes a CloudWatch log stream from an application. For more information about
 * using CloudWatch log streams with Amazon Kinesis Analytics applications, see
 * Working with Amazon CloudWatch Logs.
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
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationCloudWatchLoggingOption",
}));

export type DeleteApplicationInputProcessingConfigurationError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
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
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationInputProcessingConfiguration",
}));

export type DeleteApplicationOutputError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Deletes output destination configuration from your application configuration. Amazon Kinesis Analytics will no longer write data from the corresponding in-application stream to the external output destination.
 *
 * This operation requires permissions to perform the
 * `kinesisanalytics:DeleteApplicationOutput` action.
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
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationOutput",
}));

export type DeleteApplicationReferenceDataSourceError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Deletes a reference data source configuration from the specified application configuration.
 *
 * If the application is running, Amazon Kinesis Analytics immediately removes the in-application table
 * that you created using the AddApplicationReferenceDataSource operation.
 *
 * This operation requires permissions to perform the `kinesisanalytics.DeleteApplicationReferenceDataSource`
 * action.
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
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplicationReferenceDataSource",
}));

export type DescribeApplicationError =
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Returns information about a specific Amazon Kinesis Analytics application.
 *
 * If you want to retrieve a list of all applications in your account,
 * use the ListApplications operation.
 *
 * This operation requires permissions to perform the `kinesisanalytics:DescribeApplication`
 * action. You can use `DescribeApplication` to get the current application versionId, which you need to call other
 * operations such as `Update`.
 */
export const describeApplication: API.OperationMethod<
  DescribeApplicationRequest,
  DescribeApplicationResponse,
  DescribeApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeApplicationRequest,
  output: DescribeApplicationResponse,
  errors: [ResourceNotFoundException, UnsupportedOperationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApplication",
}));

export type DiscoverInputSchemaError =
  | InvalidArgumentException
  | ResourceProvisionedThroughputExceededException
  | ServiceUnavailableException
  | UnableToDetectSchemaException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Infers a schema by evaluating sample records on the specified streaming source (Amazon Kinesis stream or Amazon Kinesis Firehose delivery stream) or S3 object. In the response, the operation returns the inferred schema and also the sample records that the operation used to infer the schema.
 *
 * You can use the inferred schema when configuring a streaming source
 * for your application. For conceptual information,
 * see Configuring Application Input.
 * Note that when you create an application using the Amazon Kinesis Analytics console,
 * the console uses this operation to infer a schema and show it in the console user interface.
 *
 * This operation requires permissions to perform the
 * `kinesisanalytics:DiscoverInputSchema` action.
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
    ResourceProvisionedThroughputExceededException,
    ServiceUnavailableException,
    UnableToDetectSchemaException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DiscoverInputSchema",
}));

export type ListApplicationsError = CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Returns a list of Amazon Kinesis Analytics applications in your account.
 * For each application, the response includes the application name,
 * Amazon Resource Name (ARN), and status.
 *
 * If the response returns the `HasMoreApplications` value as true,
 * you can send another request by adding the
 * `ExclusiveStartApplicationName` in the request body, and
 * set the value of this to the last application name from
 * the previous response.
 *
 * If you want detailed information about a specific application, use
 * DescribeApplication.
 *
 * This operation requires permissions to perform the
 * `kinesisanalytics:ListApplications` action.
 */
export const listApplications: API.OperationMethod<
  ListApplicationsRequest,
  ListApplicationsResponse,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListApplicationsRequest,
  output: ListApplicationsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
}));

export type ListTagsForResourceError =
  | ConcurrentModificationException
  | InvalidArgumentException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the list of key-value tags assigned to the application. For more information, see Using Tagging.
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

export type StartApplicationError =
  | InvalidApplicationConfigurationException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Starts the specified Amazon Kinesis Analytics application. After creating an application, you must exclusively call this operation to start your application.
 *
 * After the application starts, it begins consuming the input data, processes it, and writes the output to the configured destination.
 *
 * The application status must be `READY` for you to start an application. You can
 * get the application status in the console or using the DescribeApplication operation.
 *
 * After you start the application, you can stop the application from processing
 * the input by calling the StopApplication operation.
 *
 * This operation requires permissions to perform the
 * `kinesisanalytics:StartApplication` action.
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
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartApplication",
}));

export type StopApplicationError =
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Stops the application from processing input data. You can stop
 * an application only if it is in the running state.
 * You can use the DescribeApplication operation to find the application state.
 * After the application is stopped,
 * Amazon Kinesis Analytics stops reading data from the input, the
 * application stops processing data, and there is no output written to the destination.
 *
 * This operation requires permissions to perform the
 * `kinesisanalytics:StopApplication` action.
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
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
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
 * Adds one or more key-value tags to a Kinesis Analytics application. Note that the maximum number of application tags includes system tags. The maximum number of user-defined application tags is 50.
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
 * Removes one or more tags from a Kinesis Analytics application. For more information, see Using Tagging.
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
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * This documentation is for version 1 of the Amazon Kinesis Data Analytics API, which only supports SQL applications. Version 2 of the API supports SQL and Java applications. For more information about version 2, see Amazon Kinesis Data Analytics API V2 Documentation.
 *
 * Updates an existing Amazon Kinesis Analytics application. Using this API,
 * you can update application code, input configuration, and
 * output configuration.
 *
 * Note that Amazon Kinesis Analytics updates the `CurrentApplicationVersionId`
 * each time you update your application.
 *
 * This operation requires permission for the
 * `kinesisanalytics:UpdateApplication` action.
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
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));
