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
  sdkId: "AppConfig",
  serviceShapeName: "AmazonAppConfig",
});
const auth = T.AwsAuthSigv4({ name: "appconfig" });
const ver = T.ServiceVersion("2019-10-09");
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
              `https://appconfig-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (Region === "us-gov-east-1") {
              return e("https://appconfig.us-gov-east-1.amazonaws.com");
            }
            if (Region === "us-gov-west-1") {
              return e("https://appconfig.us-gov-west-1.amazonaws.com");
            }
            return e(
              `https://appconfig-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://appconfig.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://appconfig.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => BadRequestReason).annotate({
          identifier: "BadRequestReason",
        }),
      ),
      Details: S.optional(
        S.suspend(() => BadRequestDetails).annotate({
          identifier: "BadRequestDetails",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class PayloadTooLargeException
  extends /*@__PURE__*/ S.TaggedError<PayloadTooLargeException>()(
    "PayloadTooLargeException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Measure: S.optional(
        S.suspend(() => BytesMeasure).annotate({ identifier: "BytesMeasure" }),
      ),
      Limit: S.optional(S.Number),
      Size: S.optional(S.Number),
    },
    T.HttpError(413),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceName: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export type Name = string;
export type Description = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateApplicationRequest {
  Name: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/applications" }),
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
export type Id = string;
export interface Application {
  Id?: string;
  Name?: string;
  Description?: string;
}
export const Application = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
  }),
).annotate({ identifier: "Application" }) as any as S.Schema<Application>;
export type LongName = string;
export type Uri = string;
export type RoleArn = string;
export type ValidatorType = "JSON_SCHEMA" | "LAMBDA" | (string & {});
export const ValidatorType = /*@__PURE__*/ S.String;

export type StringWithLengthBetween0And32768 =
  | string
  | redacted.Redacted<string>;
export interface Validator {
  Type: ValidatorType;
  Content: string | redacted.Redacted<string>;
}
export const Validator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: ValidatorType, Content: SensitiveString }),
).annotate({ identifier: "Validator" }) as any as S.Schema<Validator>;
export type ValidatorList = Validator[];
export const ValidatorList = /*@__PURE__*/ S.Array(Validator);
export type ConfigurationProfileType = string;
export type KmsKeyIdentifier = string;
export interface CreateConfigurationProfileRequest {
  ApplicationId: string;
  Name: string;
  Description?: string;
  LocationUri: string;
  RetrievalRoleArn?: string;
  Validators?: Validator[];
  Tags?: { [key: string]: string | undefined };
  Type?: string;
  KmsKeyIdentifier?: string;
}
export const CreateConfigurationProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    Name: S.String,
    Description: S.optional(S.String),
    LocationUri: S.String,
    RetrievalRoleArn: S.optional(S.String),
    Validators: S.optional(ValidatorList),
    Tags: S.optional(TagMap),
    Type: S.optional(S.String),
    KmsKeyIdentifier: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{ApplicationId}/configurationprofiles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConfigurationProfileRequest",
}) as any as S.Schema<CreateConfigurationProfileRequest>;
export type Arn = string;
export interface ConfigurationProfile {
  ApplicationId?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  LocationUri?: string;
  RetrievalRoleArn?: string;
  Validators?: Validator[];
  Type?: string;
  KmsKeyArn?: string;
  KmsKeyIdentifier?: string;
}
export const ConfigurationProfile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    LocationUri: S.optional(S.String),
    RetrievalRoleArn: S.optional(S.String),
    Validators: S.optional(ValidatorList),
    Type: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
    KmsKeyIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "ConfigurationProfile",
}) as any as S.Schema<ConfigurationProfile>;
export type MinutesBetween0And24Hours = number;
export type GrowthFactor = number;
export type GrowthType = "LINEAR" | "EXPONENTIAL" | (string & {});
export const GrowthType = /*@__PURE__*/ S.String;

export type ReplicateTo = "NONE" | "SSM_DOCUMENT" | (string & {});
export const ReplicateTo = /*@__PURE__*/ S.String;

export interface CreateDeploymentStrategyRequest {
  Name: string;
  Description?: string;
  DeploymentDurationInMinutes: number;
  FinalBakeTimeInMinutes?: number;
  GrowthFactor: number;
  GrowthType?: GrowthType;
  ReplicateTo?: ReplicateTo;
  Tags?: { [key: string]: string | undefined };
}
export const CreateDeploymentStrategyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    DeploymentDurationInMinutes: S.Number,
    FinalBakeTimeInMinutes: S.optional(S.Number),
    GrowthFactor: S.Number,
    GrowthType: S.optional(GrowthType),
    ReplicateTo: S.optional(ReplicateTo),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/deploymentstrategies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDeploymentStrategyRequest",
}) as any as S.Schema<CreateDeploymentStrategyRequest>;
export type Percentage = number;
export interface DeploymentStrategy {
  Id?: string;
  Name?: string;
  Description?: string;
  DeploymentDurationInMinutes?: number;
  GrowthType?: GrowthType;
  GrowthFactor?: number;
  FinalBakeTimeInMinutes?: number;
  ReplicateTo?: ReplicateTo;
}
export const DeploymentStrategy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    DeploymentDurationInMinutes: S.optional(S.Number),
    GrowthType: S.optional(GrowthType),
    GrowthFactor: S.optional(S.Number),
    FinalBakeTimeInMinutes: S.optional(S.Number),
    ReplicateTo: S.optional(ReplicateTo),
  }),
).annotate({
  identifier: "DeploymentStrategy",
}) as any as S.Schema<DeploymentStrategy>;
export type StringWithLengthBetween1And2048 = string;
export interface Monitor {
  AlarmArn: string;
  AlarmRoleArn?: string;
}
export const Monitor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AlarmArn: S.String, AlarmRoleArn: S.optional(S.String) }),
).annotate({ identifier: "Monitor" }) as any as S.Schema<Monitor>;
export type MonitorList = Monitor[];
export const MonitorList = /*@__PURE__*/ S.Array(Monitor);
export interface CreateEnvironmentRequest {
  ApplicationId: string;
  Name: string;
  Description?: string;
  Monitors?: Monitor[];
  Tags?: { [key: string]: string | undefined };
}
export const CreateEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    Name: S.String,
    Description: S.optional(S.String),
    Monitors: S.optional(MonitorList),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{ApplicationId}/environments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEnvironmentRequest",
}) as any as S.Schema<CreateEnvironmentRequest>;
export type EnvironmentState =
  | "READY_FOR_DEPLOYMENT"
  | "DEPLOYING"
  | "ROLLING_BACK"
  | "ROLLED_BACK"
  | "REVERTED"
  | (string & {});
export const EnvironmentState = /*@__PURE__*/ S.String;

export interface Environment {
  ApplicationId?: string;
  Id?: string;
  Name?: string;
  Description?: string;
  State?: EnvironmentState;
  Monitors?: Monitor[];
}
export const Environment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    State: S.optional(EnvironmentState),
    Monitors: S.optional(MonitorList),
  }),
).annotate({ identifier: "Environment" }) as any as S.Schema<Environment>;
export type Identifier = string;
export type NameWithReservedAwsPrefix = string;
export type FlagKey = string;
export type Weight = number;
export type AttributeKey = string;
export type AttributeString = string;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export type NumberList = number[];
export const NumberList = /*@__PURE__*/ S.Array(S.Number);
export type AttributeValue =
  | {
      StringValue: string;
      NumberValue?: never;
      BooleanValue?: never;
      StringArray?: never;
      NumberArray?: never;
    }
  | {
      StringValue?: never;
      NumberValue: number;
      BooleanValue?: never;
      StringArray?: never;
      NumberArray?: never;
    }
  | {
      StringValue?: never;
      NumberValue?: never;
      BooleanValue: boolean;
      StringArray?: never;
      NumberArray?: never;
    }
  | {
      StringValue?: never;
      NumberValue?: never;
      BooleanValue?: never;
      StringArray: string[];
      NumberArray?: never;
    }
  | {
      StringValue?: never;
      NumberValue?: never;
      BooleanValue?: never;
      StringArray?: never;
      NumberArray: number[];
    };
export const AttributeValue = /*@__PURE__*/ S.Union([
  S.Struct({ StringValue: S.String }),
  S.Struct({ NumberValue: S.Number }),
  S.Struct({ BooleanValue: S.Boolean }),
  S.Struct({ StringArray: StringList }),
  S.Struct({ NumberArray: NumberList }),
]);
export type AttributeValueMap = { [key: string]: AttributeValue | undefined };
export const AttributeValueMap = /*@__PURE__*/ S.Record(
  S.String,
  AttributeValue.pipe(S.optional),
);
export interface FlagValue {
  Enabled: boolean;
  AttributeValues?: { [key: string]: AttributeValue | undefined };
}
export const FlagValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.Boolean,
    AttributeValues: S.optional(AttributeValueMap),
  }),
).annotate({ identifier: "FlagValue" }) as any as S.Schema<FlagValue>;
export interface TreatmentInput {
  Weight: number;
  Description?: string;
  FlagValue: FlagValue;
}
export const TreatmentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Weight: S.Number,
    Description: S.optional(S.String),
    FlagValue: FlagValue,
  }),
).annotate({ identifier: "TreatmentInput" }) as any as S.Schema<TreatmentInput>;
export type TreatmentInputList = TreatmentInput[];
export const TreatmentInputList = /*@__PURE__*/ S.Array(TreatmentInput);
export type Rule = string;
export interface CreateExperimentDefinitionRequest {
  ApplicationIdentifier: string;
  Name: string;
  ConfigurationProfileIdentifier: string;
  EnvironmentIdentifier: string;
  FlagKey: string;
  Treatments: TreatmentInput[];
  Control: TreatmentInput;
  AudienceRule: string;
  Hypothesis?: string;
  AudienceDescription?: string;
  LaunchCriteria?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateExperimentDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
    Name: S.String,
    ConfigurationProfileIdentifier: S.String,
    EnvironmentIdentifier: S.String,
    FlagKey: S.String,
    Treatments: TreatmentInputList,
    Control: TreatmentInput,
    AudienceRule: S.String,
    Hypothesis: S.optional(S.String),
    AudienceDescription: S.optional(S.String),
    LaunchCriteria: S.optional(S.String),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{ApplicationIdentifier}/experimentdefinitions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateExperimentDefinitionRequest",
}) as any as S.Schema<CreateExperimentDefinitionRequest>;
export type ExperimentDefinitionStatus =
  | "ACTIVE"
  | "IDLE"
  | "ARCHIVED"
  | (string & {});
export const ExperimentDefinitionStatus = /*@__PURE__*/ S.String;

export type TreatmentKey = string;
export interface Treatment {
  Key?: string;
  Weight: number;
  Description?: string;
  FlagValue: FlagValue;
}
export const Treatment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(S.String),
    Weight: S.Number,
    Description: S.optional(S.String),
    FlagValue: FlagValue,
  }),
).annotate({ identifier: "Treatment" }) as any as S.Schema<Treatment>;
export type TreatmentList = Treatment[];
export const TreatmentList = /*@__PURE__*/ S.Array(Treatment);
export type Iso8601DateTime = Date;
export interface ExperimentDefinition {
  ApplicationId?: string;
  Id?: string;
  Name?: string;
  Hypothesis?: string;
  Status?: ExperimentDefinitionStatus;
  ConfigurationProfileId?: string;
  EnvironmentId?: string;
  FlagKey?: string;
  AudienceRule?: string;
  AudienceDescription?: string;
  LaunchCriteria?: string;
  Treatments?: Treatment[];
  Control?: Treatment;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  KmsKeyIdentifier?: string;
}
export const ExperimentDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Hypothesis: S.optional(S.String),
    Status: S.optional(ExperimentDefinitionStatus),
    ConfigurationProfileId: S.optional(S.String),
    EnvironmentId: S.optional(S.String),
    FlagKey: S.optional(S.String),
    AudienceRule: S.optional(S.String),
    AudienceDescription: S.optional(S.String),
    LaunchCriteria: S.optional(S.String),
    Treatments: S.optional(TreatmentList),
    Control: S.optional(Treatment),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    KmsKeyIdentifier: S.optional(S.String),
  }),
).annotate({
  identifier: "ExperimentDefinition",
}) as any as S.Schema<ExperimentDefinition>;
export type ExtensionOrParameterName = string;
export type ActionPoint =
  | "PRE_CREATE_HOSTED_CONFIGURATION_VERSION"
  | "PRE_START_DEPLOYMENT"
  | "AT_DEPLOYMENT_TICK"
  | "ON_DEPLOYMENT_START"
  | "ON_DEPLOYMENT_STEP"
  | "ON_DEPLOYMENT_BAKING"
  | "ON_DEPLOYMENT_COMPLETE"
  | "ON_DEPLOYMENT_ROLLED_BACK"
  | (string & {});
export const ActionPoint = /*@__PURE__*/ S.String;

export interface Action {
  Name?: string;
  Description?: string;
  Uri?: string;
  RoleArn?: string;
}
export const Action = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Uri: S.optional(S.String),
    RoleArn: S.optional(S.String),
  }),
).annotate({ identifier: "Action" }) as any as S.Schema<Action>;
export type ActionList = Action[];
export const ActionList = /*@__PURE__*/ S.Array(Action);
export type ActionsMap = { [key in ActionPoint]?: Action[] };
export const ActionsMap = /*@__PURE__*/ S.Record(
  ActionPoint,
  ActionList.pipe(S.optional),
);
export interface Parameter {
  Description?: string;
  Required?: boolean;
  Dynamic?: boolean;
}
export const Parameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    Required: S.optional(S.Boolean),
    Dynamic: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Parameter" }) as any as S.Schema<Parameter>;
export type ParameterMap = { [key: string]: Parameter | undefined };
export const ParameterMap = /*@__PURE__*/ S.Record(
  S.String,
  Parameter.pipe(S.optional),
);
export interface CreateExtensionRequest {
  Name: string;
  Description?: string;
  Actions: { [key: string]: Action[] | undefined };
  Parameters?: { [key: string]: Parameter | undefined };
  Tags?: { [key: string]: string | undefined };
  LatestVersionNumber?: number;
}
export const CreateExtensionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    Actions: ActionsMap,
    Parameters: S.optional(ParameterMap),
    Tags: S.optional(TagMap),
    LatestVersionNumber: S.optional(S.Number).pipe(
      T.HttpHeader("Latest-Version-Number"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/extensions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateExtensionRequest",
}) as any as S.Schema<CreateExtensionRequest>;
export interface Extension {
  Id?: string;
  Name?: string;
  VersionNumber?: number;
  Arn?: string;
  Description?: string;
  Actions?: { [key: string]: Action[] | undefined };
  Parameters?: { [key: string]: Parameter | undefined };
}
export const Extension = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    VersionNumber: S.optional(S.Number),
    Arn: S.optional(S.String),
    Description: S.optional(S.String),
    Actions: S.optional(ActionsMap),
    Parameters: S.optional(ParameterMap),
  }),
).annotate({ identifier: "Extension" }) as any as S.Schema<Extension>;
export type ParameterValueMap = { [key: string]: string | undefined };
export const ParameterValueMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateExtensionAssociationRequest {
  ExtensionIdentifier: string;
  ExtensionVersionNumber?: number;
  ResourceIdentifier: string;
  Parameters?: { [key: string]: string | undefined };
  Tags?: { [key: string]: string | undefined };
}
export const CreateExtensionAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExtensionIdentifier: S.String,
    ExtensionVersionNumber: S.optional(S.Number),
    ResourceIdentifier: S.String,
    Parameters: S.optional(ParameterValueMap),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/extensionassociations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateExtensionAssociationRequest",
}) as any as S.Schema<CreateExtensionAssociationRequest>;
export interface ExtensionAssociation {
  Id?: string;
  ExtensionArn?: string;
  ResourceArn?: string;
  Arn?: string;
  Parameters?: { [key: string]: string | undefined };
  ExtensionVersionNumber?: number;
}
export const ExtensionAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ExtensionArn: S.optional(S.String),
    ResourceArn: S.optional(S.String),
    Arn: S.optional(S.String),
    Parameters: S.optional(ParameterValueMap),
    ExtensionVersionNumber: S.optional(S.Number),
  }),
).annotate({
  identifier: "ExtensionAssociation",
}) as any as S.Schema<ExtensionAssociation>;
export type StringWithLengthBetween1And255 = string;
export type VersionLabel = string;
export interface CreateHostedConfigurationVersionRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
  Description?: string;
  Content: T.StreamingInputBody;
  ContentType: string;
  LatestVersionNumber?: number;
  VersionLabel?: string;
}
export const CreateHostedConfigurationVersionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
      ConfigurationProfileId: S.String.pipe(
        T.HttpLabel("ConfigurationProfileId"),
      ),
      Description: S.optional(S.String).pipe(T.HttpHeader("Description")),
      Content: T.StreamingInput.pipe(T.HttpPayload()),
      ContentType: S.String.pipe(T.HttpHeader("Content-Type")),
      LatestVersionNumber: S.optional(S.Number).pipe(
        T.HttpHeader("Latest-Version-Number"),
      ),
      VersionLabel: S.optional(S.String).pipe(T.HttpHeader("VersionLabel")),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}/hostedconfigurationversions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateHostedConfigurationVersionRequest",
}) as any as S.Schema<CreateHostedConfigurationVersionRequest>;
export interface HostedConfigurationVersion {
  ApplicationId?: string;
  ConfigurationProfileId?: string;
  VersionNumber?: number;
  Description?: string;
  Content?: T.StreamingOutputBody;
  ContentType?: string;
  VersionLabel?: string;
  KmsKeyArn?: string;
}
export const HostedConfigurationVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String).pipe(T.HttpHeader("Application-Id")),
    ConfigurationProfileId: S.optional(S.String).pipe(
      T.HttpHeader("Configuration-Profile-Id"),
    ),
    VersionNumber: S.optional(S.Number).pipe(T.HttpHeader("Version-Number")),
    Description: S.optional(S.String).pipe(T.HttpHeader("Description")),
    Content: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    VersionLabel: S.optional(S.String).pipe(T.HttpHeader("VersionLabel")),
    KmsKeyArn: S.optional(S.String).pipe(T.HttpHeader("KmsKeyArn")),
  }),
).annotate({
  identifier: "HostedConfigurationVersion",
}) as any as S.Schema<HostedConfigurationVersion>;
export interface DeleteApplicationRequest {
  ApplicationId: string;
}
export const DeleteApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/applications/{ApplicationId}" }),
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
  S.Struct({}),
).annotate({
  identifier: "DeleteApplicationResponse",
}) as any as S.Schema<DeleteApplicationResponse>;
export type DeletionProtectionCheck =
  | "ACCOUNT_DEFAULT"
  | "APPLY"
  | "BYPASS"
  | (string & {});
export const DeletionProtectionCheck = /*@__PURE__*/ S.String;

export interface DeleteConfigurationProfileRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
  DeletionProtectionCheck?: DeletionProtectionCheck;
}
export const DeleteConfigurationProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    ConfigurationProfileId: S.String.pipe(
      T.HttpLabel("ConfigurationProfileId"),
    ),
    DeletionProtectionCheck: S.optional(DeletionProtectionCheck).pipe(
      T.HttpHeader("x-amzn-deletion-protection-check"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConfigurationProfileRequest",
}) as any as S.Schema<DeleteConfigurationProfileRequest>;
export interface DeleteConfigurationProfileResponse {}
export const DeleteConfigurationProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteConfigurationProfileResponse",
}) as any as S.Schema<DeleteConfigurationProfileResponse>;
export type DeploymentStrategyId = string;
export interface DeleteDeploymentStrategyRequest {
  DeploymentStrategyId: string;
}
export const DeleteDeploymentStrategyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeploymentStrategyId: S.String.pipe(T.HttpLabel("DeploymentStrategyId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/deployementstrategies/{DeploymentStrategyId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDeploymentStrategyRequest",
}) as any as S.Schema<DeleteDeploymentStrategyRequest>;
export interface DeleteDeploymentStrategyResponse {}
export const DeleteDeploymentStrategyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDeploymentStrategyResponse",
}) as any as S.Schema<DeleteDeploymentStrategyResponse>;
export interface DeleteEnvironmentRequest {
  EnvironmentId: string;
  ApplicationId: string;
  DeletionProtectionCheck?: DeletionProtectionCheck;
}
export const DeleteEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnvironmentId: S.String.pipe(T.HttpLabel("EnvironmentId")),
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    DeletionProtectionCheck: S.optional(DeletionProtectionCheck).pipe(
      T.HttpHeader("x-amzn-deletion-protection-check"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{ApplicationId}/environments/{EnvironmentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEnvironmentRequest",
}) as any as S.Schema<DeleteEnvironmentRequest>;
export interface DeleteEnvironmentResponse {}
export const DeleteEnvironmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEnvironmentResponse",
}) as any as S.Schema<DeleteEnvironmentResponse>;
export type DeleteType = "ARCHIVE" | "DESTROY" | (string & {});
export const DeleteType = /*@__PURE__*/ S.String;

export interface DeleteExperimentDefinitionRequest {
  ApplicationIdentifier: string;
  ExperimentDefinitionIdentifier: string;
  DeleteType?: DeleteType;
}
export const DeleteExperimentDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
    ExperimentDefinitionIdentifier: S.String.pipe(
      T.HttpLabel("ExperimentDefinitionIdentifier"),
    ),
    DeleteType: S.optional(DeleteType).pipe(T.HttpQuery("delete_type")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteExperimentDefinitionRequest",
}) as any as S.Schema<DeleteExperimentDefinitionRequest>;
export interface DeleteExperimentDefinitionResponse {}
export const DeleteExperimentDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteExperimentDefinitionResponse",
}) as any as S.Schema<DeleteExperimentDefinitionResponse>;
export interface DeleteExtensionRequest {
  ExtensionIdentifier: string;
  VersionNumber?: number;
}
export const DeleteExtensionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExtensionIdentifier: S.String.pipe(T.HttpLabel("ExtensionIdentifier")),
    VersionNumber: S.optional(S.Number).pipe(T.HttpQuery("version")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/extensions/{ExtensionIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteExtensionRequest",
}) as any as S.Schema<DeleteExtensionRequest>;
export interface DeleteExtensionResponse {}
export const DeleteExtensionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteExtensionResponse",
}) as any as S.Schema<DeleteExtensionResponse>;
export interface DeleteExtensionAssociationRequest {
  ExtensionAssociationId: string;
}
export const DeleteExtensionAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExtensionAssociationId: S.String.pipe(
      T.HttpLabel("ExtensionAssociationId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/extensionassociations/{ExtensionAssociationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteExtensionAssociationRequest",
}) as any as S.Schema<DeleteExtensionAssociationRequest>;
export interface DeleteExtensionAssociationResponse {}
export const DeleteExtensionAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteExtensionAssociationResponse",
}) as any as S.Schema<DeleteExtensionAssociationResponse>;
export interface DeleteHostedConfigurationVersionRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
  VersionNumber: number;
}
export const DeleteHostedConfigurationVersionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
      ConfigurationProfileId: S.String.pipe(
        T.HttpLabel("ConfigurationProfileId"),
      ),
      VersionNumber: S.Number.pipe(T.HttpLabel("VersionNumber")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}/hostedconfigurationversions/{VersionNumber}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteHostedConfigurationVersionRequest",
}) as any as S.Schema<DeleteHostedConfigurationVersionRequest>;
export interface DeleteHostedConfigurationVersionResponse {}
export const DeleteHostedConfigurationVersionResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteHostedConfigurationVersionResponse",
}) as any as S.Schema<DeleteHostedConfigurationVersionResponse>;
export interface GetAccountSettingsRequest {}
export const GetAccountSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccountSettingsRequest",
}) as any as S.Schema<GetAccountSettingsRequest>;
export type DeletionProtectionDuration = number;
export interface DeletionProtectionSettings {
  Enabled?: boolean;
  ProtectionPeriodInMinutes?: number;
}
export const DeletionProtectionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    ProtectionPeriodInMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "DeletionProtectionSettings",
}) as any as S.Schema<DeletionProtectionSettings>;
export interface VendedMetricsSettings {
  Enabled?: boolean;
}
export const VendedMetricsSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Enabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "VendedMetricsSettings",
}) as any as S.Schema<VendedMetricsSettings>;
export interface AccountSettings {
  DeletionProtection?: DeletionProtectionSettings;
  VendedMetrics?: VendedMetricsSettings;
}
export const AccountSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeletionProtection: S.optional(DeletionProtectionSettings),
    VendedMetrics: S.optional(VendedMetricsSettings),
  }),
).annotate({
  identifier: "AccountSettings",
}) as any as S.Schema<AccountSettings>;
export interface GetApplicationRequest {
  ApplicationId: string;
}
export const GetApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications/{ApplicationId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApplicationRequest",
}) as any as S.Schema<GetApplicationRequest>;
export type StringWithLengthBetween1And64 = string;
export type Version = string;
export interface GetConfigurationRequest {
  Application: string;
  Environment: string;
  Configuration: string;
  ClientId: string;
  ClientConfigurationVersion?: string;
}
export const GetConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Application: S.String.pipe(T.HttpLabel("Application")),
    Environment: S.String.pipe(T.HttpLabel("Environment")),
    Configuration: S.String.pipe(T.HttpLabel("Configuration")),
    ClientId: S.String.pipe(T.HttpQuery("client_id")),
    ClientConfigurationVersion: S.optional(S.String).pipe(
      T.HttpQuery("client_configuration_version"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{Application}/environments/{Environment}/configurations/{Configuration}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConfigurationRequest",
}) as any as S.Schema<GetConfigurationRequest>;
export interface Configuration {
  Content?: T.StreamingOutputBody;
  ConfigurationVersion?: string;
  ContentType?: string;
}
export const Configuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Content: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
    ConfigurationVersion: S.optional(S.String).pipe(
      T.HttpHeader("Configuration-Version"),
    ),
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
  }),
).annotate({ identifier: "Configuration" }) as any as S.Schema<Configuration>;
export interface GetConfigurationProfileRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
}
export const GetConfigurationProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    ConfigurationProfileId: S.String.pipe(
      T.HttpLabel("ConfigurationProfileId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConfigurationProfileRequest",
}) as any as S.Schema<GetConfigurationProfileRequest>;
export interface GetDeploymentRequest {
  ApplicationId: string;
  EnvironmentId: string;
  DeploymentNumber: number;
}
export const GetDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    EnvironmentId: S.String.pipe(T.HttpLabel("EnvironmentId")),
    DeploymentNumber: S.Number.pipe(T.HttpLabel("DeploymentNumber")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{ApplicationId}/environments/{EnvironmentId}/deployments/{DeploymentNumber}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeploymentRequest",
}) as any as S.Schema<GetDeploymentRequest>;
export type DeploymentState =
  | "BAKING"
  | "VALIDATING"
  | "DEPLOYING"
  | "COMPLETE"
  | "ROLLING_BACK"
  | "ROLLED_BACK"
  | "REVERTED"
  | (string & {});
export const DeploymentState = /*@__PURE__*/ S.String;

export type DeploymentEventType =
  | "PERCENTAGE_UPDATED"
  | "ROLLBACK_STARTED"
  | "ROLLBACK_COMPLETED"
  | "BAKE_TIME_STARTED"
  | "DEPLOYMENT_STARTED"
  | "DEPLOYMENT_COMPLETED"
  | "REVERT_COMPLETED"
  | (string & {});
export const DeploymentEventType = /*@__PURE__*/ S.String;

export type TriggeredBy =
  | "USER"
  | "APPCONFIG"
  | "CLOUDWATCH_ALARM"
  | "INTERNAL_ERROR"
  | (string & {});
export const TriggeredBy = /*@__PURE__*/ S.String;

export interface ActionInvocation {
  ExtensionIdentifier?: string;
  ActionName?: string;
  Uri?: string;
  RoleArn?: string;
  ErrorMessage?: string;
  ErrorCode?: string;
  InvocationId?: string;
}
export const ActionInvocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExtensionIdentifier: S.optional(S.String),
    ActionName: S.optional(S.String),
    Uri: S.optional(S.String),
    RoleArn: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
    ErrorCode: S.optional(S.String),
    InvocationId: S.optional(S.String),
  }),
).annotate({
  identifier: "ActionInvocation",
}) as any as S.Schema<ActionInvocation>;
export type ActionInvocations = ActionInvocation[];
export const ActionInvocations = /*@__PURE__*/ S.Array(ActionInvocation);
export interface DeploymentEvent {
  EventType?: DeploymentEventType;
  TriggeredBy?: TriggeredBy;
  Description?: string;
  ActionInvocations?: ActionInvocation[];
  OccurredAt?: Date;
}
export const DeploymentEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventType: S.optional(DeploymentEventType),
    TriggeredBy: S.optional(TriggeredBy),
    Description: S.optional(S.String),
    ActionInvocations: S.optional(ActionInvocations),
    OccurredAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "DeploymentEvent",
}) as any as S.Schema<DeploymentEvent>;
export type DeploymentEvents = DeploymentEvent[];
export const DeploymentEvents = /*@__PURE__*/ S.Array(DeploymentEvent);
export interface AppliedExtension {
  ExtensionId?: string;
  ExtensionAssociationId?: string;
  VersionNumber?: number;
  Parameters?: { [key: string]: string | undefined };
}
export const AppliedExtension = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExtensionId: S.optional(S.String),
    ExtensionAssociationId: S.optional(S.String),
    VersionNumber: S.optional(S.Number),
    Parameters: S.optional(ParameterValueMap),
  }),
).annotate({
  identifier: "AppliedExtension",
}) as any as S.Schema<AppliedExtension>;
export type AppliedExtensions = AppliedExtension[];
export const AppliedExtensions = /*@__PURE__*/ S.Array(AppliedExtension);
export interface Deployment {
  ApplicationId?: string;
  EnvironmentId?: string;
  DeploymentStrategyId?: string;
  ConfigurationProfileId?: string;
  DeploymentNumber?: number;
  ConfigurationName?: string;
  ConfigurationLocationUri?: string;
  ConfigurationVersion?: string;
  Description?: string;
  DeploymentDurationInMinutes?: number;
  GrowthType?: GrowthType;
  GrowthFactor?: number;
  FinalBakeTimeInMinutes?: number;
  State?: DeploymentState;
  EventLog?: DeploymentEvent[];
  PercentageComplete?: number;
  StartedAt?: Date;
  CompletedAt?: Date;
  AppliedExtensions?: AppliedExtension[];
  KmsKeyArn?: string;
  KmsKeyIdentifier?: string;
  VersionLabel?: string;
}
export const Deployment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    EnvironmentId: S.optional(S.String),
    DeploymentStrategyId: S.optional(S.String),
    ConfigurationProfileId: S.optional(S.String),
    DeploymentNumber: S.optional(S.Number),
    ConfigurationName: S.optional(S.String),
    ConfigurationLocationUri: S.optional(S.String),
    ConfigurationVersion: S.optional(S.String),
    Description: S.optional(S.String),
    DeploymentDurationInMinutes: S.optional(S.Number),
    GrowthType: S.optional(GrowthType),
    GrowthFactor: S.optional(S.Number),
    FinalBakeTimeInMinutes: S.optional(S.Number),
    State: S.optional(DeploymentState),
    EventLog: S.optional(DeploymentEvents),
    PercentageComplete: S.optional(S.Number),
    StartedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CompletedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    AppliedExtensions: S.optional(AppliedExtensions),
    KmsKeyArn: S.optional(S.String),
    KmsKeyIdentifier: S.optional(S.String),
    VersionLabel: S.optional(S.String),
  }),
).annotate({ identifier: "Deployment" }) as any as S.Schema<Deployment>;
export interface GetDeploymentStrategyRequest {
  DeploymentStrategyId: string;
}
export const GetDeploymentStrategyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeploymentStrategyId: S.String.pipe(T.HttpLabel("DeploymentStrategyId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/deploymentstrategies/{DeploymentStrategyId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeploymentStrategyRequest",
}) as any as S.Schema<GetDeploymentStrategyRequest>;
export interface GetEnvironmentRequest {
  ApplicationId: string;
  EnvironmentId: string;
}
export const GetEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    EnvironmentId: S.String.pipe(T.HttpLabel("EnvironmentId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{ApplicationId}/environments/{EnvironmentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEnvironmentRequest",
}) as any as S.Schema<GetEnvironmentRequest>;
export interface GetExperimentDefinitionRequest {
  ApplicationIdentifier: string;
  ExperimentDefinitionIdentifier: string;
}
export const GetExperimentDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
    ExperimentDefinitionIdentifier: S.String.pipe(
      T.HttpLabel("ExperimentDefinitionIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetExperimentDefinitionRequest",
}) as any as S.Schema<GetExperimentDefinitionRequest>;
export type PositiveInteger = number;
export interface GetExperimentRunRequest {
  ApplicationIdentifier: string;
  ExperimentDefinitionIdentifier: string;
  Run: number;
}
export const GetExperimentRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
    ExperimentDefinitionIdentifier: S.String.pipe(
      T.HttpLabel("ExperimentDefinitionIdentifier"),
    ),
    Run: S.Number.pipe(T.HttpLabel("Run")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}/experimentruns/{Run}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetExperimentRunRequest",
}) as any as S.Schema<GetExperimentRunRequest>;
export type ExperimentRunStatus = "RUNNING" | "DONE" | (string & {});
export const ExperimentRunStatus = /*@__PURE__*/ S.String;

export type NullablePercentage = number;
export type EntityId = string;
export type TreatmentOverrideMap = { [key: string]: string | undefined };
export const TreatmentOverrideMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type TreatmentOverrides = {
  Inline: { [key: string]: string | undefined };
};
export const TreatmentOverrides = /*@__PURE__*/ S.Union([
  S.Struct({ Inline: TreatmentOverrideMap }),
]);
export interface ExperimentRunResult {
  ExecutiveSummary?: string;
  ReasonsToLaunch?: string;
  ReasonsNotToLaunch?: string;
}
export const ExperimentRunResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExecutiveSummary: S.optional(S.String),
    ReasonsToLaunch: S.optional(S.String),
    ReasonsNotToLaunch: S.optional(S.String),
  }),
).annotate({
  identifier: "ExperimentRunResult",
}) as any as S.Schema<ExperimentRunResult>;
export interface ExperimentDefinitionSnapshot {
  ApplicationId?: string;
  Id?: string;
  Name?: string;
  Hypothesis?: string;
  ConfigurationProfileId?: string;
  EnvironmentId?: string;
  FlagKey?: string;
  AudienceRule?: string;
  AudienceDescription?: string;
  LaunchCriteria?: string;
  Treatments?: Treatment[];
  Control?: Treatment;
}
export const ExperimentDefinitionSnapshot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Hypothesis: S.optional(S.String),
    ConfigurationProfileId: S.optional(S.String),
    EnvironmentId: S.optional(S.String),
    FlagKey: S.optional(S.String),
    AudienceRule: S.optional(S.String),
    AudienceDescription: S.optional(S.String),
    LaunchCriteria: S.optional(S.String),
    Treatments: S.optional(TreatmentList),
    Control: S.optional(Treatment),
  }),
).annotate({
  identifier: "ExperimentDefinitionSnapshot",
}) as any as S.Schema<ExperimentDefinitionSnapshot>;
export interface ExperimentRun {
  ApplicationId?: string;
  ExperimentDefinitionId?: string;
  Run?: number;
  Description?: string;
  Status?: ExperimentRunStatus;
  ExposurePercentage?: number;
  TreatmentOverrides?: TreatmentOverrides;
  Result?: ExperimentRunResult;
  StartedAt?: Date;
  UpdatedAt?: Date;
  EndedAt?: Date;
  ExperimentDefinitionSnapshot?: ExperimentDefinitionSnapshot;
}
export const ExperimentRun = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    ExperimentDefinitionId: S.optional(S.String),
    Run: S.optional(S.Number),
    Description: S.optional(S.String),
    Status: S.optional(ExperimentRunStatus),
    ExposurePercentage: S.optional(S.Number),
    TreatmentOverrides: S.optional(TreatmentOverrides),
    Result: S.optional(ExperimentRunResult),
    StartedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    ExperimentDefinitionSnapshot: S.optional(ExperimentDefinitionSnapshot),
  }),
).annotate({ identifier: "ExperimentRun" }) as any as S.Schema<ExperimentRun>;
export interface GetExtensionRequest {
  ExtensionIdentifier: string;
  VersionNumber?: number;
}
export const GetExtensionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExtensionIdentifier: S.String.pipe(T.HttpLabel("ExtensionIdentifier")),
    VersionNumber: S.optional(S.Number).pipe(T.HttpQuery("version_number")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/extensions/{ExtensionIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetExtensionRequest",
}) as any as S.Schema<GetExtensionRequest>;
export interface GetExtensionAssociationRequest {
  ExtensionAssociationId: string;
}
export const GetExtensionAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExtensionAssociationId: S.String.pipe(
      T.HttpLabel("ExtensionAssociationId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/extensionassociations/{ExtensionAssociationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetExtensionAssociationRequest",
}) as any as S.Schema<GetExtensionAssociationRequest>;
export interface GetHostedConfigurationVersionRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
  VersionNumber: number;
}
export const GetHostedConfigurationVersionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
      ConfigurationProfileId: S.String.pipe(
        T.HttpLabel("ConfigurationProfileId"),
      ),
      VersionNumber: S.Number.pipe(T.HttpLabel("VersionNumber")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}/hostedconfigurationversions/{VersionNumber}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetHostedConfigurationVersionRequest",
}) as any as S.Schema<GetHostedConfigurationVersionRequest>;
export type MaxResults = number;
export type NextToken = string;
export interface ListApplicationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListApplicationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/applications" }),
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
export type ApplicationList = Application[];
export const ApplicationList = /*@__PURE__*/ S.Array(Application);
export interface Applications {
  Items?: Application[];
  NextToken?: string;
}
export const Applications = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(ApplicationList),
    NextToken: S.optional(S.String),
  }),
).annotate({ identifier: "Applications" }) as any as S.Schema<Applications>;
export interface ListConfigurationProfilesRequest {
  ApplicationId: string;
  MaxResults?: number;
  NextToken?: string;
  Type?: string;
}
export const ListConfigurationProfilesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
    Type: S.optional(S.String).pipe(T.HttpQuery("type")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{ApplicationId}/configurationprofiles",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConfigurationProfilesRequest",
}) as any as S.Schema<ListConfigurationProfilesRequest>;
export type ValidatorTypeList = ValidatorType[];
export const ValidatorTypeList = /*@__PURE__*/ S.Array(ValidatorType);
export interface ConfigurationProfileSummary {
  ApplicationId?: string;
  Id?: string;
  Name?: string;
  LocationUri?: string;
  ValidatorTypes?: ValidatorType[];
  Type?: string;
}
export const ConfigurationProfileSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    LocationUri: S.optional(S.String),
    ValidatorTypes: S.optional(ValidatorTypeList),
    Type: S.optional(S.String),
  }),
).annotate({
  identifier: "ConfigurationProfileSummary",
}) as any as S.Schema<ConfigurationProfileSummary>;
export type ConfigurationProfileSummaryList = ConfigurationProfileSummary[];
export const ConfigurationProfileSummaryList = /*@__PURE__*/ S.Array(
  ConfigurationProfileSummary,
);
export interface ConfigurationProfiles {
  Items?: ConfigurationProfileSummary[];
  NextToken?: string;
}
export const ConfigurationProfiles = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(ConfigurationProfileSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ConfigurationProfiles",
}) as any as S.Schema<ConfigurationProfiles>;
export interface ListDeploymentsRequest {
  ApplicationId: string;
  EnvironmentId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListDeploymentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    EnvironmentId: S.String.pipe(T.HttpLabel("EnvironmentId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{ApplicationId}/environments/{EnvironmentId}/deployments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDeploymentsRequest",
}) as any as S.Schema<ListDeploymentsRequest>;
export type DeploymentType = "USER" | "MANAGED" | (string & {});
export const DeploymentType = /*@__PURE__*/ S.String;

export interface DeploymentSummary {
  DeploymentNumber?: number;
  ConfigurationProfileId?: string;
  ConfigurationName?: string;
  ConfigurationVersion?: string;
  DeploymentDurationInMinutes?: number;
  GrowthType?: GrowthType;
  GrowthFactor?: number;
  FinalBakeTimeInMinutes?: number;
  State?: DeploymentState;
  PercentageComplete?: number;
  StartedAt?: Date;
  CompletedAt?: Date;
  VersionLabel?: string;
  Type?: DeploymentType;
}
export const DeploymentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeploymentNumber: S.optional(S.Number),
    ConfigurationProfileId: S.optional(S.String),
    ConfigurationName: S.optional(S.String),
    ConfigurationVersion: S.optional(S.String),
    DeploymentDurationInMinutes: S.optional(S.Number),
    GrowthType: S.optional(GrowthType),
    GrowthFactor: S.optional(S.Number),
    FinalBakeTimeInMinutes: S.optional(S.Number),
    State: S.optional(DeploymentState),
    PercentageComplete: S.optional(S.Number),
    StartedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CompletedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    VersionLabel: S.optional(S.String),
    Type: S.optional(DeploymentType),
  }),
).annotate({
  identifier: "DeploymentSummary",
}) as any as S.Schema<DeploymentSummary>;
export type DeploymentList = DeploymentSummary[];
export const DeploymentList = /*@__PURE__*/ S.Array(DeploymentSummary);
export interface Deployments {
  Items?: DeploymentSummary[];
  NextToken?: string;
}
export const Deployments = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(DeploymentList),
    NextToken: S.optional(S.String),
  }),
).annotate({ identifier: "Deployments" }) as any as S.Schema<Deployments>;
export interface ListDeploymentStrategiesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListDeploymentStrategiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/deploymentstrategies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDeploymentStrategiesRequest",
}) as any as S.Schema<ListDeploymentStrategiesRequest>;
export type DeploymentStrategyList = DeploymentStrategy[];
export const DeploymentStrategyList = /*@__PURE__*/ S.Array(DeploymentStrategy);
export interface DeploymentStrategies {
  Items?: DeploymentStrategy[];
  NextToken?: string;
}
export const DeploymentStrategies = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(DeploymentStrategyList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DeploymentStrategies",
}) as any as S.Schema<DeploymentStrategies>;
export interface ListEnvironmentsRequest {
  ApplicationId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListEnvironmentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{ApplicationId}/environments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEnvironmentsRequest",
}) as any as S.Schema<ListEnvironmentsRequest>;
export type EnvironmentList = Environment[];
export const EnvironmentList = /*@__PURE__*/ S.Array(Environment);
export interface Environments {
  Items?: Environment[];
  NextToken?: string;
}
export const Environments = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(EnvironmentList),
    NextToken: S.optional(S.String),
  }),
).annotate({ identifier: "Environments" }) as any as S.Schema<Environments>;
export interface ListExperimentDefinitionsRequest {
  ApplicationIdentifier?: string;
  ConfigurationProfileIdentifier?: string;
  EnvironmentIdentifier?: string;
  Status?: ExperimentDefinitionStatus;
  MaxResults?: number;
  NextToken?: string;
}
export const ListExperimentDefinitionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("application_identifier"),
    ),
    ConfigurationProfileIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("configuration_profile_identifier"),
    ),
    EnvironmentIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("environment_identifier"),
    ),
    Status: S.optional(ExperimentDefinitionStatus).pipe(T.HttpQuery("status")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/experimentdefinitions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListExperimentDefinitionsRequest",
}) as any as S.Schema<ListExperimentDefinitionsRequest>;
export interface ExperimentDefinitionSummary {
  ApplicationId?: string;
  Id?: string;
  Name?: string;
  Hypothesis?: string;
  Status?: ExperimentDefinitionStatus;
  ConfigurationProfileId?: string;
  EnvironmentId?: string;
  FlagKey?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const ExperimentDefinitionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Hypothesis: S.optional(S.String),
    Status: S.optional(ExperimentDefinitionStatus),
    ConfigurationProfileId: S.optional(S.String),
    EnvironmentId: S.optional(S.String),
    FlagKey: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ExperimentDefinitionSummary",
}) as any as S.Schema<ExperimentDefinitionSummary>;
export type ExperimentDefinitionList = ExperimentDefinitionSummary[];
export const ExperimentDefinitionList = /*@__PURE__*/ S.Array(
  ExperimentDefinitionSummary,
);
export interface ExperimentDefinitions {
  Items?: ExperimentDefinitionSummary[];
  NextToken?: string;
}
export const ExperimentDefinitions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(ExperimentDefinitionList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ExperimentDefinitions",
}) as any as S.Schema<ExperimentDefinitions>;
export interface ListExperimentRunEventsRequest {
  ApplicationIdentifier: string;
  ExperimentDefinitionIdentifier: string;
  Run: number;
  MaxResults?: number;
  NextToken?: string;
}
export const ListExperimentRunEventsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
    ExperimentDefinitionIdentifier: S.String.pipe(
      T.HttpLabel("ExperimentDefinitionIdentifier"),
    ),
    Run: S.Number.pipe(T.HttpLabel("Run")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}/experimentruns/{Run}/events",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListExperimentRunEventsRequest",
}) as any as S.Schema<ListExperimentRunEventsRequest>;
export type ExperimentRunEventType =
  | "RUN_STARTED"
  | "EXPOSURE_UPDATED"
  | "OVERRIDES_UPDATED"
  | "RUN_STOPPED"
  | (string & {});
export const ExperimentRunEventType = /*@__PURE__*/ S.String;

export interface ExperimentRunEvent {
  Description?: string;
  AssociatedDeployment?: string;
  EventType?: ExperimentRunEventType;
  OccurredAt?: Date;
  TriggeredBy?: TriggeredBy;
  ExposurePercentage?: number;
  TreatmentOverrides?: TreatmentOverrides;
}
export const ExperimentRunEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    AssociatedDeployment: S.optional(S.String),
    EventType: S.optional(ExperimentRunEventType),
    OccurredAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    TriggeredBy: S.optional(TriggeredBy),
    ExposurePercentage: S.optional(S.Number),
    TreatmentOverrides: S.optional(TreatmentOverrides),
  }),
).annotate({
  identifier: "ExperimentRunEvent",
}) as any as S.Schema<ExperimentRunEvent>;
export type ExperimentRunEventList = ExperimentRunEvent[];
export const ExperimentRunEventList = /*@__PURE__*/ S.Array(ExperimentRunEvent);
export interface ExperimentRunEvents {
  Items?: ExperimentRunEvent[];
  NextToken?: string;
}
export const ExperimentRunEvents = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(ExperimentRunEventList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ExperimentRunEvents",
}) as any as S.Schema<ExperimentRunEvents>;
export interface ListExperimentRunsRequest {
  ApplicationIdentifier: string;
  ExperimentDefinitionIdentifier: string;
  MaxResults?: number;
  NextToken?: string;
  Status?: ExperimentRunStatus;
}
export const ListExperimentRunsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
    ExperimentDefinitionIdentifier: S.String.pipe(
      T.HttpLabel("ExperimentDefinitionIdentifier"),
    ),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
    Status: S.optional(ExperimentRunStatus).pipe(T.HttpQuery("status")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}/experimentruns",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListExperimentRunsRequest",
}) as any as S.Schema<ListExperimentRunsRequest>;
export interface ExperimentRunSummary {
  ExperimentDefinitionId?: string;
  Run?: number;
  Description?: string;
  Status?: ExperimentRunStatus;
  StartedAt?: Date;
  UpdatedAt?: Date;
  EndedAt?: Date;
}
export const ExperimentRunSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExperimentDefinitionId: S.optional(S.String),
    Run: S.optional(S.Number),
    Description: S.optional(S.String),
    Status: S.optional(ExperimentRunStatus),
    StartedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    EndedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({
  identifier: "ExperimentRunSummary",
}) as any as S.Schema<ExperimentRunSummary>;
export type ExperimentRunSummaryList = ExperimentRunSummary[];
export const ExperimentRunSummaryList =
  /*@__PURE__*/ S.Array(ExperimentRunSummary);
export interface ExperimentRuns {
  Items?: ExperimentRunSummary[];
  NextToken?: string;
}
export const ExperimentRuns = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(ExperimentRunSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({ identifier: "ExperimentRuns" }) as any as S.Schema<ExperimentRuns>;
export interface ListExtensionAssociationsRequest {
  ResourceIdentifier?: string;
  ExtensionIdentifier?: string;
  ExtensionVersionNumber?: number;
  MaxResults?: number;
  NextToken?: string;
}
export const ListExtensionAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("resource_identifier"),
    ),
    ExtensionIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("extension_identifier"),
    ),
    ExtensionVersionNumber: S.optional(S.Number).pipe(
      T.HttpQuery("extension_version_number"),
    ),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/extensionassociations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListExtensionAssociationsRequest",
}) as any as S.Schema<ListExtensionAssociationsRequest>;
export interface ExtensionAssociationSummary {
  Id?: string;
  ExtensionArn?: string;
  ResourceArn?: string;
}
export const ExtensionAssociationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ExtensionArn: S.optional(S.String),
    ResourceArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ExtensionAssociationSummary",
}) as any as S.Schema<ExtensionAssociationSummary>;
export type ExtensionAssociationSummaries = ExtensionAssociationSummary[];
export const ExtensionAssociationSummaries = /*@__PURE__*/ S.Array(
  ExtensionAssociationSummary,
);
export interface ExtensionAssociations {
  Items?: ExtensionAssociationSummary[];
  NextToken?: string;
}
export const ExtensionAssociations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(ExtensionAssociationSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ExtensionAssociations",
}) as any as S.Schema<ExtensionAssociations>;
export type QueryName = string;
export interface ListExtensionsRequest {
  MaxResults?: number;
  NextToken?: string;
  Name?: string;
}
export const ListExtensionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
    Name: S.optional(S.String).pipe(T.HttpQuery("name")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/extensions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListExtensionsRequest",
}) as any as S.Schema<ListExtensionsRequest>;
export interface ExtensionSummary {
  Id?: string;
  Name?: string;
  VersionNumber?: number;
  Arn?: string;
  Description?: string;
}
export const ExtensionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    VersionNumber: S.optional(S.Number),
    Arn: S.optional(S.String),
    Description: S.optional(S.String),
  }),
).annotate({
  identifier: "ExtensionSummary",
}) as any as S.Schema<ExtensionSummary>;
export type ExtensionSummaries = ExtensionSummary[];
export const ExtensionSummaries = /*@__PURE__*/ S.Array(ExtensionSummary);
export interface Extensions {
  Items?: ExtensionSummary[];
  NextToken?: string;
}
export const Extensions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(ExtensionSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({ identifier: "Extensions" }) as any as S.Schema<Extensions>;
export interface ListHostedConfigurationVersionsRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
  MaxResults?: number;
  NextToken?: string;
  VersionLabel?: string;
}
export const ListHostedConfigurationVersionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
      ConfigurationProfileId: S.String.pipe(
        T.HttpLabel("ConfigurationProfileId"),
      ),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
      VersionLabel: S.optional(S.String).pipe(T.HttpQuery("version_label")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}/hostedconfigurationversions",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListHostedConfigurationVersionsRequest",
}) as any as S.Schema<ListHostedConfigurationVersionsRequest>;
export interface HostedConfigurationVersionSummary {
  ApplicationId?: string;
  ConfigurationProfileId?: string;
  VersionNumber?: number;
  Description?: string;
  ContentType?: string;
  VersionLabel?: string;
  KmsKeyArn?: string;
}
export const HostedConfigurationVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    ConfigurationProfileId: S.optional(S.String),
    VersionNumber: S.optional(S.Number),
    Description: S.optional(S.String),
    ContentType: S.optional(S.String),
    VersionLabel: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "HostedConfigurationVersionSummary",
}) as any as S.Schema<HostedConfigurationVersionSummary>;
export type HostedConfigurationVersionSummaryList =
  HostedConfigurationVersionSummary[];
export const HostedConfigurationVersionSummaryList = /*@__PURE__*/ S.Array(
  HostedConfigurationVersionSummary,
);
export interface HostedConfigurationVersions {
  Items?: HostedConfigurationVersionSummary[];
  NextToken?: string;
}
export const HostedConfigurationVersions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(HostedConfigurationVersionSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "HostedConfigurationVersions",
}) as any as S.Schema<HostedConfigurationVersions>;
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
export interface ResourceTags {
  Tags?: { [key: string]: string | undefined };
}
export const ResourceTags = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagMap) }),
).annotate({ identifier: "ResourceTags" }) as any as S.Schema<ResourceTags>;
export type DynamicParameterKey = string;
export type DynamicParameterMap = { [key: string]: string | undefined };
export const DynamicParameterMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface StartDeploymentRequest {
  ApplicationId: string;
  EnvironmentId: string;
  DeploymentStrategyId: string;
  ConfigurationProfileId: string;
  ConfigurationVersion: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
  KmsKeyIdentifier?: string;
  DynamicExtensionParameters?: { [key: string]: string | undefined };
  LatestDeploymentNumber?: number;
}
export const StartDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    EnvironmentId: S.String.pipe(T.HttpLabel("EnvironmentId")),
    DeploymentStrategyId: S.String,
    ConfigurationProfileId: S.String,
    ConfigurationVersion: S.String,
    Description: S.optional(S.String),
    Tags: S.optional(TagMap),
    KmsKeyIdentifier: S.optional(S.String),
    DynamicExtensionParameters: S.optional(DynamicParameterMap),
    LatestDeploymentNumber: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{ApplicationId}/environments/{EnvironmentId}/deployments",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartDeploymentRequest",
}) as any as S.Schema<StartDeploymentRequest>;
export interface DeploymentParameters {
  DynamicExtensionParameters?: { [key: string]: string | undefined };
  Tags?: { [key: string]: string | undefined };
}
export const DeploymentParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DynamicExtensionParameters: S.optional(DynamicParameterMap),
    Tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "DeploymentParameters",
}) as any as S.Schema<DeploymentParameters>;
export interface StartExperimentRunRequest {
  ApplicationIdentifier: string;
  ExperimentDefinitionIdentifier: string;
  Description?: string;
  ExposurePercentage?: number;
  TreatmentOverrides?: TreatmentOverrides;
  Tags?: { [key: string]: string | undefined };
  DeploymentParameters?: DeploymentParameters;
}
export const StartExperimentRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
    ExperimentDefinitionIdentifier: S.String.pipe(
      T.HttpLabel("ExperimentDefinitionIdentifier"),
    ),
    Description: S.optional(S.String),
    ExposurePercentage: S.optional(S.Number),
    TreatmentOverrides: S.optional(TreatmentOverrides),
    Tags: S.optional(TagMap),
    DeploymentParameters: S.optional(DeploymentParameters),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}/experimentruns",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartExperimentRunRequest",
}) as any as S.Schema<StartExperimentRunRequest>;
export interface StopDeploymentRequest {
  ApplicationId: string;
  EnvironmentId: string;
  DeploymentNumber: number;
  AllowRevert?: boolean;
}
export const StopDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    EnvironmentId: S.String.pipe(T.HttpLabel("EnvironmentId")),
    DeploymentNumber: S.Number.pipe(T.HttpLabel("DeploymentNumber")),
    AllowRevert: S.optional(S.Boolean).pipe(T.HttpHeader("Allow-Revert")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/applications/{ApplicationId}/environments/{EnvironmentId}/deployments/{DeploymentNumber}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopDeploymentRequest",
}) as any as S.Schema<StopDeploymentRequest>;
export interface StopExperimentRunRequest {
  ApplicationIdentifier: string;
  ExperimentDefinitionIdentifier: string;
  Run: number;
  Result?: ExperimentRunResult;
  DeploymentParameters?: DeploymentParameters;
}
export const StopExperimentRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
    ExperimentDefinitionIdentifier: S.String.pipe(
      T.HttpLabel("ExperimentDefinitionIdentifier"),
    ),
    Run: S.Number.pipe(T.HttpLabel("Run")),
    Result: S.optional(ExperimentRunResult),
    DeploymentParameters: S.optional(DeploymentParameters),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}/experimentruns/{Run}/stop",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopExperimentRunRequest",
}) as any as S.Schema<StopExperimentRunRequest>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: TagMap,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
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
export interface UpdateAccountSettingsRequest {
  DeletionProtection?: DeletionProtectionSettings;
  VendedMetrics?: VendedMetricsSettings;
}
export const UpdateAccountSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeletionProtection: S.optional(DeletionProtectionSettings),
    VendedMetrics: S.optional(VendedMetricsSettings),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAccountSettingsRequest",
}) as any as S.Schema<UpdateAccountSettingsRequest>;
export interface UpdateApplicationRequest {
  ApplicationId: string;
  Name?: string;
  Description?: string;
}
export const UpdateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/applications/{ApplicationId}" }),
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
export type KmsKeyIdentifierOrEmpty = string;
export interface UpdateConfigurationProfileRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
  Name?: string;
  Description?: string;
  RetrievalRoleArn?: string;
  Validators?: Validator[];
  KmsKeyIdentifier?: string;
}
export const UpdateConfigurationProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    ConfigurationProfileId: S.String.pipe(
      T.HttpLabel("ConfigurationProfileId"),
    ),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    RetrievalRoleArn: S.optional(S.String),
    Validators: S.optional(ValidatorList),
    KmsKeyIdentifier: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateConfigurationProfileRequest",
}) as any as S.Schema<UpdateConfigurationProfileRequest>;
export interface UpdateDeploymentStrategyRequest {
  DeploymentStrategyId: string;
  Description?: string;
  DeploymentDurationInMinutes?: number;
  FinalBakeTimeInMinutes?: number;
  GrowthFactor?: number;
  GrowthType?: GrowthType;
}
export const UpdateDeploymentStrategyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeploymentStrategyId: S.String.pipe(T.HttpLabel("DeploymentStrategyId")),
    Description: S.optional(S.String),
    DeploymentDurationInMinutes: S.optional(S.Number),
    FinalBakeTimeInMinutes: S.optional(S.Number),
    GrowthFactor: S.optional(S.Number),
    GrowthType: S.optional(GrowthType),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/deploymentstrategies/{DeploymentStrategyId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDeploymentStrategyRequest",
}) as any as S.Schema<UpdateDeploymentStrategyRequest>;
export interface UpdateEnvironmentRequest {
  ApplicationId: string;
  EnvironmentId: string;
  Name?: string;
  Description?: string;
  Monitors?: Monitor[];
}
export const UpdateEnvironmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    EnvironmentId: S.String.pipe(T.HttpLabel("EnvironmentId")),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Monitors: S.optional(MonitorList),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/applications/{ApplicationId}/environments/{EnvironmentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEnvironmentRequest",
}) as any as S.Schema<UpdateEnvironmentRequest>;
export interface UpdateExperimentDefinitionRequest {
  ApplicationIdentifier: string;
  ExperimentDefinitionIdentifier: string;
  Treatments?: TreatmentInput[];
  Control?: TreatmentInput;
  Hypothesis?: string;
  AudienceRule?: string;
  AudienceDescription?: string;
  LaunchCriteria?: string;
}
export const UpdateExperimentDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
    ExperimentDefinitionIdentifier: S.String.pipe(
      T.HttpLabel("ExperimentDefinitionIdentifier"),
    ),
    Treatments: S.optional(TreatmentInputList),
    Control: S.optional(TreatmentInput),
    Hypothesis: S.optional(S.String),
    AudienceRule: S.optional(S.String),
    AudienceDescription: S.optional(S.String),
    LaunchCriteria: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateExperimentDefinitionRequest",
}) as any as S.Schema<UpdateExperimentDefinitionRequest>;
export interface UpdateExperimentRunRequest {
  ApplicationIdentifier: string;
  ExperimentDefinitionIdentifier: string;
  Run: number;
  Description?: string;
  ExposurePercentage?: number;
  TreatmentOverrides?: TreatmentOverrides;
  DeploymentParameters?: DeploymentParameters;
}
export const UpdateExperimentRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationIdentifier: S.String.pipe(T.HttpLabel("ApplicationIdentifier")),
    ExperimentDefinitionIdentifier: S.String.pipe(
      T.HttpLabel("ExperimentDefinitionIdentifier"),
    ),
    Run: S.Number.pipe(T.HttpLabel("Run")),
    Description: S.optional(S.String),
    ExposurePercentage: S.optional(S.Number),
    TreatmentOverrides: S.optional(TreatmentOverrides),
    DeploymentParameters: S.optional(DeploymentParameters),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/applications/{ApplicationIdentifier}/experimentdefinitions/{ExperimentDefinitionIdentifier}/experimentruns/{Run}/update",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateExperimentRunRequest",
}) as any as S.Schema<UpdateExperimentRunRequest>;
export interface UpdateExtensionRequest {
  ExtensionIdentifier: string;
  Description?: string;
  Actions?: { [key: string]: Action[] | undefined };
  Parameters?: { [key: string]: Parameter | undefined };
  VersionNumber?: number;
}
export const UpdateExtensionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExtensionIdentifier: S.String.pipe(T.HttpLabel("ExtensionIdentifier")),
    Description: S.optional(S.String),
    Actions: S.optional(ActionsMap),
    Parameters: S.optional(ParameterMap),
    VersionNumber: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/extensions/{ExtensionIdentifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateExtensionRequest",
}) as any as S.Schema<UpdateExtensionRequest>;
export interface UpdateExtensionAssociationRequest {
  ExtensionAssociationId: string;
  Parameters?: { [key: string]: string | undefined };
}
export const UpdateExtensionAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExtensionAssociationId: S.String.pipe(
      T.HttpLabel("ExtensionAssociationId"),
    ),
    Parameters: S.optional(ParameterValueMap),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/extensionassociations/{ExtensionAssociationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateExtensionAssociationRequest",
}) as any as S.Schema<UpdateExtensionAssociationRequest>;
export interface ValidateConfigurationRequest {
  ApplicationId: string;
  ConfigurationProfileId: string;
  ConfigurationVersion: string;
}
export const ValidateConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    ConfigurationProfileId: S.String.pipe(
      T.HttpLabel("ConfigurationProfileId"),
    ),
    ConfigurationVersion: S.String.pipe(T.HttpQuery("configuration_version")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/applications/{ApplicationId}/configurationprofiles/{ConfigurationProfileId}/validators",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ValidateConfigurationRequest",
}) as any as S.Schema<ValidateConfigurationRequest>;
export interface ValidateConfigurationResponse {}
export const ValidateConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ValidateConfigurationResponse",
}) as any as S.Schema<ValidateConfigurationResponse>;
export type BadRequestReason = "InvalidConfiguration" | (string & {});
export const BadRequestReason = /*@__PURE__*/ S.String;

export interface InvalidConfigurationDetail {
  Constraint?: string;
  Location?: string;
  Reason?: string;
  Type?: string;
  Value?: string;
}
export const InvalidConfigurationDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Constraint: S.optional(S.String),
    Location: S.optional(S.String),
    Reason: S.optional(S.String),
    Type: S.optional(S.String),
    Value: S.optional(S.String),
  }),
).annotate({
  identifier: "InvalidConfigurationDetail",
}) as any as S.Schema<InvalidConfigurationDetail>;
export type InvalidConfigurationDetailList = InvalidConfigurationDetail[];
export const InvalidConfigurationDetailList = /*@__PURE__*/ S.Array(
  InvalidConfigurationDetail,
);
export type BadRequestDetails = {
  InvalidConfiguration: InvalidConfigurationDetail[];
};
export const BadRequestDetails = /*@__PURE__*/ S.Union([
  S.Struct({ InvalidConfiguration: InvalidConfigurationDetailList }),
]);
export type BytesMeasure = "KILOBYTES" | (string & {});
export const BytesMeasure = /*@__PURE__*/ S.String;

export type CreateApplicationError =
  | BadRequestException
  | InternalServerException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates an application. In AppConfig, an application is simply an
 * organizational construct like a folder. This organizational construct has a relationship
 * with some unit of executable code. For example, you could create an application called
 * MyMobileApp to organize and manage configuration data for a mobile application installed by
 * your users.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationRequest,
  Application,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApplicationRequest,
  output: Application,
  errors: [
    BadRequestException,
    InternalServerException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
}));

export type CreateConfigurationProfileError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates a configuration profile, which is information that enables AppConfig
 * to access the configuration source. Valid configuration sources include the
 * following:
 *
 * - Configuration data in YAML, JSON, and other formats stored in the AppConfig hosted configuration store
 *
 * - Configuration data stored as objects in an Amazon Simple Storage Service (Amazon S3)
 * bucket
 *
 * - Pipelines stored in CodePipeline
 *
 * - Secrets stored in Secrets Manager
 *
 * - Standard and secure string parameters stored in Amazon Web Services Systems Manager Parameter Store
 *
 * - Configuration data in SSM documents stored in the Systems Manager document store
 *
 * A configuration profile includes the following information:
 *
 * - The URI location of the configuration data.
 *
 * - The Identity and Access Management (IAM) role that provides access to the configuration data.
 *
 * - A validator for the configuration data. Available validators include either a JSON
 * Schema or an Amazon Web Services Lambda function.
 *
 * For more information, see Create a
 * Configuration and a Configuration Profile in the AppConfig
 * User Guide.
 */
export const createConfigurationProfile: API.OperationMethod<
  CreateConfigurationProfileRequest,
  ConfigurationProfile,
  CreateConfigurationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfigurationProfileRequest,
  output: ConfigurationProfile,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationProfile",
}));

export type CreateDeploymentStrategyError =
  | BadRequestException
  | InternalServerException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates a deployment strategy that defines important criteria for rolling out your
 * configuration to the designated targets. A deployment strategy includes the overall
 * duration required, a percentage of targets to receive the deployment during each interval,
 * an algorithm that defines how percentage grows, and bake time.
 */
export const createDeploymentStrategy: API.OperationMethod<
  CreateDeploymentStrategyRequest,
  DeploymentStrategy,
  CreateDeploymentStrategyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDeploymentStrategyRequest,
  output: DeploymentStrategy,
  errors: [
    BadRequestException,
    InternalServerException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeploymentStrategy",
}));

export type CreateEnvironmentError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates an environment. For each application, you define one or more environments. An
 * environment is a deployment group of AppConfig targets, such as applications in a
 * `Beta` or `Production` environment. You can also define
 * environments for application subcomponents such as the `Web`,
 * `Mobile` and `Back-end` components for your application. You can
 * configure Amazon CloudWatch alarms for each environment. The system monitors alarms during a
 * configuration deployment. If an alarm is triggered, the system rolls back the
 * configuration.
 */
export const createEnvironment: API.OperationMethod<
  CreateEnvironmentRequest,
  Environment,
  CreateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEnvironmentRequest,
  output: Environment,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEnvironment",
}));

export type CreateExperimentDefinitionError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates an experiment definition in AppConfig. An experiment definition describes the purpose, scope, and operational configuration of an experiment, including the target audience, feature flag, and treatment configurations.
 */
export const createExperimentDefinition: API.OperationMethod<
  CreateExperimentDefinitionRequest,
  ExperimentDefinition,
  CreateExperimentDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateExperimentDefinitionRequest,
  output: ExperimentDefinition,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExperimentDefinition",
}));

export type CreateExtensionError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates an AppConfig extension. An extension augments your ability to inject
 * logic or behavior at different points during the AppConfig workflow of creating
 * or deploying a configuration.
 *
 * You can create your own extensions or use the Amazon Web Services authored extensions provided by
 * AppConfig. For an AppConfig extension that uses Lambda, you must create a Lambda function to perform any computation and processing
 * defined in the extension. If you plan to create custom versions of the Amazon Web Services
 * authored notification extensions, you only need to specify an Amazon Resource Name (ARN) in
 * the `Uri` field for the new extension version.
 *
 * - For a custom EventBridge notification extension, enter the ARN of the EventBridge
 * default events in the `Uri` field.
 *
 * - For a custom Amazon SNS notification extension, enter the ARN of an Amazon SNS
 * topic in the `Uri` field.
 *
 * - For a custom Amazon SQS notification extension, enter the ARN of an Amazon SQS
 * message queue in the `Uri` field.
 *
 * For more information about extensions, see Extending
 * workflows in the *AppConfig User Guide*.
 */
export const createExtension: API.OperationMethod<
  CreateExtensionRequest,
  Extension,
  CreateExtensionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateExtensionRequest,
  output: Extension,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExtension",
}));

export type CreateExtensionAssociationError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * When you create an extension or configure an Amazon Web Services authored extension, you
 * associate the extension with an AppConfig application, environment, or
 * configuration profile. For example, you can choose to run the AppConfig
 * deployment events to Amazon SNS
 * Amazon Web Services authored extension and receive notifications on an Amazon SNS
 * topic anytime a configuration deployment is started for a specific application. Defining
 * which extension to associate with an AppConfig resource is called an
 * *extension association*. An extension association is a specified
 * relationship between an extension and an AppConfig resource, such as an
 * application or a configuration profile. For more information about extensions and
 * associations, see Extending
 * workflows in the *AppConfig User Guide*.
 */
export const createExtensionAssociation: API.OperationMethod<
  CreateExtensionAssociationRequest,
  ExtensionAssociation,
  CreateExtensionAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateExtensionAssociationRequest,
  output: ExtensionAssociation,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExtensionAssociation",
}));

export type CreateHostedConfigurationVersionError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | PayloadTooLargeException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates a new configuration in the AppConfig hosted configuration store. If
 * you're creating a feature flag, we recommend you familiarize yourself with the JSON schema
 * for feature flag data. For more information, see Type reference for AWS.AppConfig.FeatureFlags in the
 * *AppConfig User Guide*.
 */
export const createHostedConfigurationVersion: API.OperationMethod<
  CreateHostedConfigurationVersionRequest,
  HostedConfigurationVersion,
  CreateHostedConfigurationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateHostedConfigurationVersionRequest,
  output: HostedConfigurationVersion,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    PayloadTooLargeException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHostedConfigurationVersion",
}));

export type DeleteApplicationError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an application.
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
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

export type DeleteConfigurationProfileError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a configuration profile.
 *
 * To prevent users from unintentionally deleting actively-used configuration profiles,
 * enable deletion
 * protection.
 */
export const deleteConfigurationProfile: API.OperationMethod<
  DeleteConfigurationProfileRequest,
  DeleteConfigurationProfileResponse,
  DeleteConfigurationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfigurationProfileRequest,
  output: DeleteConfigurationProfileResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationProfile",
}));

export type DeleteDeploymentStrategyError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a deployment strategy.
 */
export const deleteDeploymentStrategy: API.OperationMethod<
  DeleteDeploymentStrategyRequest,
  DeleteDeploymentStrategyResponse,
  DeleteDeploymentStrategyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDeploymentStrategyRequest,
  output: DeleteDeploymentStrategyResponse,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeploymentStrategy",
}));

export type DeleteEnvironmentError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an environment.
 *
 * To prevent users from unintentionally deleting actively-used environments, enable deletion
 * protection.
 */
export const deleteEnvironment: API.OperationMethod<
  DeleteEnvironmentRequest,
  DeleteEnvironmentResponse,
  DeleteEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEnvironmentRequest,
  output: DeleteEnvironmentResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnvironment",
}));

export type DeleteExperimentDefinitionError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an experiment definition. You can archive the definition to hide it from the active list while preserving it for future reference, or permanently delete it along with all associated run history.
 */
export const deleteExperimentDefinition: API.OperationMethod<
  DeleteExperimentDefinitionRequest,
  DeleteExperimentDefinitionResponse,
  DeleteExperimentDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteExperimentDefinitionRequest,
  output: DeleteExperimentDefinitionResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExperimentDefinition",
}));

export type DeleteExtensionError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an AppConfig extension. You must delete all associations to an
 * extension before you delete the extension.
 */
export const deleteExtension: API.OperationMethod<
  DeleteExtensionRequest,
  DeleteExtensionResponse,
  DeleteExtensionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteExtensionRequest,
  output: DeleteExtensionResponse,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExtension",
}));

export type DeleteExtensionAssociationError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an extension association. This action doesn't delete extensions defined in the
 * association.
 */
export const deleteExtensionAssociation: API.OperationMethod<
  DeleteExtensionAssociationRequest,
  DeleteExtensionAssociationResponse,
  DeleteExtensionAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteExtensionAssociationRequest,
  output: DeleteExtensionAssociationResponse,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExtensionAssociation",
}));

export type DeleteHostedConfigurationVersionError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a version of a configuration from the AppConfig hosted configuration
 * store.
 */
export const deleteHostedConfigurationVersion: API.OperationMethod<
  DeleteHostedConfigurationVersionRequest,
  DeleteHostedConfigurationVersionResponse,
  DeleteHostedConfigurationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteHostedConfigurationVersionRequest,
  output: DeleteHostedConfigurationVersionResponse,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHostedConfigurationVersion",
}));

export type GetAccountSettingsError =
  | BadRequestException
  | InternalServerException
  | CommonErrors;
/**
 * Returns information about the status of the `DeletionProtection`
 * parameter.
 */
export const getAccountSettings: API.OperationMethod<
  GetAccountSettingsRequest,
  AccountSettings,
  GetAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountSettingsRequest,
  output: AccountSettings,
  errors: [BadRequestException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountSettings",
}));

export type GetApplicationError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about an application.
 */
export const getApplication: API.OperationMethod<
  GetApplicationRequest,
  Application,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApplicationRequest,
  output: Application,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
}));

export type GetConfigurationError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * (Deprecated) Retrieves the latest deployed configuration.
 *
 * Note the following important information.
 *
 * - This API action is deprecated. Calls to receive configuration data should use
 * the StartConfigurationSession and GetLatestConfiguration APIs instead.
 *
 * - GetConfiguration is a priced call. For more information, see
 * Pricing.
 */
export const getConfiguration: API.OperationMethod<
  GetConfigurationRequest,
  Configuration,
  GetConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfigurationRequest,
  output: Configuration,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfiguration",
}));

export type GetConfigurationProfileError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about a configuration profile.
 */
export const getConfigurationProfile: API.OperationMethod<
  GetConfigurationProfileRequest,
  ConfigurationProfile,
  GetConfigurationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfigurationProfileRequest,
  output: ConfigurationProfile,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationProfile",
}));

export type GetDeploymentError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about a configuration deployment.
 */
export const getDeployment: API.OperationMethod<
  GetDeploymentRequest,
  Deployment,
  GetDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeploymentRequest,
  output: Deployment,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployment",
}));

export type GetDeploymentStrategyError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about a deployment strategy. A deployment strategy defines
 * important criteria for rolling out your configuration to the designated targets. A
 * deployment strategy includes the overall duration required, a percentage of targets to
 * receive the deployment during each interval, an algorithm that defines how percentage
 * grows, and bake time.
 */
export const getDeploymentStrategy: API.OperationMethod<
  GetDeploymentStrategyRequest,
  DeploymentStrategy,
  GetDeploymentStrategyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeploymentStrategyRequest,
  output: DeploymentStrategy,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeploymentStrategy",
}));

export type GetEnvironmentError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about an environment. An environment is a deployment group of
 * AppConfig applications, such as applications in a `Production`
 * environment or in an `EU_Region` environment. Each configuration deployment
 * targets an environment. You can enable one or more Amazon CloudWatch alarms for an environment. If
 * an alarm is triggered during a deployment, AppConfig roles back the
 * configuration.
 */
export const getEnvironment: API.OperationMethod<
  GetEnvironmentRequest,
  Environment,
  GetEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEnvironmentRequest,
  output: Environment,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnvironment",
}));

export type GetExperimentDefinitionError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about an experiment definition.
 */
export const getExperimentDefinition: API.OperationMethod<
  GetExperimentDefinitionRequest,
  ExperimentDefinition,
  GetExperimentDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetExperimentDefinitionRequest,
  output: ExperimentDefinition,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExperimentDefinition",
}));

export type GetExperimentRunError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about an experiment run, including its status, start time, and exposure settings.
 */
export const getExperimentRun: API.OperationMethod<
  GetExperimentRunRequest,
  ExperimentRun,
  GetExperimentRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetExperimentRunRequest,
  output: ExperimentRun,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExperimentRun",
}));

export type GetExtensionError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about an AppConfig extension.
 */
export const getExtension: API.OperationMethod<
  GetExtensionRequest,
  Extension,
  GetExtensionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetExtensionRequest,
  output: Extension,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExtension",
}));

export type GetExtensionAssociationError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about an AppConfig extension association. For more
 * information about extensions and associations, see Extending
 * workflows in the *AppConfig User Guide*.
 */
export const getExtensionAssociation: API.OperationMethod<
  GetExtensionAssociationRequest,
  ExtensionAssociation,
  GetExtensionAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetExtensionAssociationRequest,
  output: ExtensionAssociation,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExtensionAssociation",
}));

export type GetHostedConfigurationVersionError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves information about a specific configuration version.
 */
export const getHostedConfigurationVersion: API.OperationMethod<
  GetHostedConfigurationVersionRequest,
  HostedConfigurationVersion,
  GetHostedConfigurationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetHostedConfigurationVersionRequest,
  output: HostedConfigurationVersion,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHostedConfigurationVersion",
}));

export type ListApplicationsError =
  | BadRequestException
  | InternalServerException
  | CommonErrors;
/**
 * Lists all applications in your Amazon Web Services account.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsRequest,
  Applications,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  Application
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationsRequest,
  output: Applications,
  errors: [BadRequestException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConfigurationProfilesError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the configuration profiles for an application.
 */
export const listConfigurationProfiles: API.PaginatedOperationMethod<
  ListConfigurationProfilesRequest,
  ConfigurationProfiles,
  ListConfigurationProfilesError,
  Credentials | HttpClient.HttpClient,
  ConfigurationProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConfigurationProfilesRequest,
  output: ConfigurationProfiles,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationProfiles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDeploymentsError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the deployments for an environment in descending deployment number order.
 */
export const listDeployments: API.PaginatedOperationMethod<
  ListDeploymentsRequest,
  Deployments,
  ListDeploymentsError,
  Credentials | HttpClient.HttpClient,
  DeploymentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDeploymentsRequest,
  output: Deployments,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeployments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDeploymentStrategiesError =
  | BadRequestException
  | InternalServerException
  | CommonErrors;
/**
 * Lists deployment strategies.
 */
export const listDeploymentStrategies: API.PaginatedOperationMethod<
  ListDeploymentStrategiesRequest,
  DeploymentStrategies,
  ListDeploymentStrategiesError,
  Credentials | HttpClient.HttpClient,
  DeploymentStrategy
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDeploymentStrategiesRequest,
  output: DeploymentStrategies,
  errors: [BadRequestException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeploymentStrategies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEnvironmentsError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the environments for an application.
 */
export const listEnvironments: API.PaginatedOperationMethod<
  ListEnvironmentsRequest,
  Environments,
  ListEnvironmentsError,
  Credentials | HttpClient.HttpClient,
  Environment
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEnvironmentsRequest,
  output: Environments,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnvironments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExperimentDefinitionsError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the experiment definitions for an account. You can filter results by application, configuration profile, environment, or status.
 */
export const listExperimentDefinitions: API.PaginatedOperationMethod<
  ListExperimentDefinitionsRequest,
  ExperimentDefinitions,
  ListExperimentDefinitionsError,
  Credentials | HttpClient.HttpClient,
  ExperimentDefinitionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExperimentDefinitionsRequest,
  output: ExperimentDefinitions,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExperimentDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExperimentRunEventsError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the events for a specified experiment run. Events provide a timeline of actions and state changes that occurred during the run.
 */
export const listExperimentRunEvents: API.PaginatedOperationMethod<
  ListExperimentRunEventsRequest,
  ExperimentRunEvents,
  ListExperimentRunEventsError,
  Credentials | HttpClient.HttpClient,
  ExperimentRunEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExperimentRunEventsRequest,
  output: ExperimentRunEvents,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExperimentRunEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExperimentRunsError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the experiment runs for a specified experiment definition. You can filter by status.
 */
export const listExperimentRuns: API.PaginatedOperationMethod<
  ListExperimentRunsRequest,
  ExperimentRuns,
  ListExperimentRunsError,
  Credentials | HttpClient.HttpClient,
  ExperimentRunSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExperimentRunsRequest,
  output: ExperimentRuns,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExperimentRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExtensionAssociationsError =
  | BadRequestException
  | InternalServerException
  | CommonErrors;
/**
 * Lists all AppConfig extension associations in the account. For more
 * information about extensions and associations, see Extending
 * workflows in the *AppConfig User Guide*.
 */
export const listExtensionAssociations: API.PaginatedOperationMethod<
  ListExtensionAssociationsRequest,
  ExtensionAssociations,
  ListExtensionAssociationsError,
  Credentials | HttpClient.HttpClient,
  ExtensionAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExtensionAssociationsRequest,
  output: ExtensionAssociations,
  errors: [BadRequestException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExtensionAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExtensionsError =
  | BadRequestException
  | InternalServerException
  | CommonErrors;
/**
 * Lists all custom and Amazon Web Services authored AppConfig extensions in the
 * account. For more information about extensions, see Extending
 * workflows in the *AppConfig User Guide*.
 */
export const listExtensions: API.PaginatedOperationMethod<
  ListExtensionsRequest,
  Extensions,
  ListExtensionsError,
  Credentials | HttpClient.HttpClient,
  ExtensionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExtensionsRequest,
  output: Extensions,
  errors: [BadRequestException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExtensions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHostedConfigurationVersionsError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists configurations stored in the AppConfig hosted configuration store by
 * version.
 */
export const listHostedConfigurationVersions: API.PaginatedOperationMethod<
  ListHostedConfigurationVersionsRequest,
  HostedConfigurationVersions,
  ListHostedConfigurationVersionsError,
  Credentials | HttpClient.HttpClient,
  HostedConfigurationVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListHostedConfigurationVersionsRequest,
  output: HostedConfigurationVersions,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHostedConfigurationVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the list of key-value tags assigned to the resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ResourceTags,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ResourceTags,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartDeploymentError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts a deployment.
 *
 * AppConfig Agent supports deploying feature flag or free-form configuration data to specific segments or individual users during a gradual rollout. Entity-based gradual deployments ensure that once a user or segment receives a configuration version, they continue to receive that same version throughout the deployment period, regardless of which compute resource serves their requests. For more information, see Using AppConfig Agent for user-based or entity-based gradual deployments
 */
export const startDeployment: API.OperationMethod<
  StartDeploymentRequest,
  Deployment,
  StartDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDeploymentRequest,
  output: Deployment,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDeployment",
}));

export type StartExperimentRunError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Starts an experiment run for the specified experiment definition. An experiment run delivers treatments to the target audience and collects metrics. You can start multiple experiment runs from the same experiment definition.
 */
export const startExperimentRun: API.OperationMethod<
  StartExperimentRunRequest,
  ExperimentRun,
  StartExperimentRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartExperimentRunRequest,
  output: ExperimentRun,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExperimentRun",
}));

export type StopDeploymentError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops a deployment. This API action works only on deployments that have a status of
 * `DEPLOYING`, unless an `AllowRevert` parameter is supplied. If the
 * `AllowRevert` parameter is supplied, the status of an in-progress deployment
 * will be `ROLLED_BACK`. The status of a completed deployment will be
 * `REVERTED`. AppConfig only allows a revert within 72 hours of
 * deployment completion.
 */
export const stopDeployment: API.OperationMethod<
  StopDeploymentRequest,
  Deployment,
  StopDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopDeploymentRequest,
  output: Deployment,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDeployment",
}));

export type StopExperimentRunError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops a running experiment. Stopping an experiment run ends audience exposure and returns users to the currently deployed feature flag configuration.
 */
export const stopExperimentRun: API.OperationMethod<
  StopExperimentRunRequest,
  ExperimentRun,
  StopExperimentRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopExperimentRunRequest,
  output: ExperimentRun,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopExperimentRun",
}));

export type TagResourceError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Assigns metadata to an AppConfig resource. Tags help organize and categorize
 * your AppConfig resources. Each tag consists of a key and an optional value, both
 * of which you define. You can specify a maximum of 50 tags for a resource.
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
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a tag key and value from an AppConfig resource.
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
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAccountSettingsError =
  | BadRequestException
  | InternalServerException
  | CommonErrors;
/**
 * Updates the value of the `DeletionProtection` parameter.
 */
export const updateAccountSettings: API.OperationMethod<
  UpdateAccountSettingsRequest,
  AccountSettings,
  UpdateAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAccountSettingsRequest,
  output: AccountSettings,
  errors: [BadRequestException, InternalServerException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountSettings",
}));

export type UpdateApplicationError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an application.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationRequest,
  Application,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApplicationRequest,
  output: Application,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));

export type UpdateConfigurationProfileError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a configuration profile.
 */
export const updateConfigurationProfile: API.OperationMethod<
  UpdateConfigurationProfileRequest,
  ConfigurationProfile,
  UpdateConfigurationProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConfigurationProfileRequest,
  output: ConfigurationProfile,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationProfile",
}));

export type UpdateDeploymentStrategyError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a deployment strategy.
 */
export const updateDeploymentStrategy: API.OperationMethod<
  UpdateDeploymentStrategyRequest,
  DeploymentStrategy,
  UpdateDeploymentStrategyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDeploymentStrategyRequest,
  output: DeploymentStrategy,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeploymentStrategy",
}));

export type UpdateEnvironmentError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an environment.
 */
export const updateEnvironment: API.OperationMethod<
  UpdateEnvironmentRequest,
  Environment,
  UpdateEnvironmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEnvironmentRequest,
  output: Environment,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnvironment",
}));

export type UpdateExperimentDefinitionError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an experiment definition. You can update treatments, the control, audience rules, and other properties. You cannot update an experiment definition while an experiment run is active.
 */
export const updateExperimentDefinition: API.OperationMethod<
  UpdateExperimentDefinitionRequest,
  ExperimentDefinition,
  UpdateExperimentDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateExperimentDefinitionRequest,
  output: ExperimentDefinition,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExperimentDefinition",
}));

export type UpdateExperimentRunError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a running experiment. Use this operation to increase audience exposure, modify treatment assignment overrides, or update the description of an active experiment run. Audience exposure can only be increased, not decreased.
 */
export const updateExperimentRun: API.OperationMethod<
  UpdateExperimentRunRequest,
  ExperimentRun,
  UpdateExperimentRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateExperimentRunRequest,
  output: ExperimentRun,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExperimentRun",
}));

export type UpdateExtensionError =
  | BadRequestException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an AppConfig extension. For more information about extensions, see
 * Extending
 * workflows in the *AppConfig User Guide*.
 */
export const updateExtension: API.OperationMethod<
  UpdateExtensionRequest,
  Extension,
  UpdateExtensionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateExtensionRequest,
  output: Extension,
  errors: [
    BadRequestException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExtension",
}));

export type UpdateExtensionAssociationError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an association. For more information about extensions and associations, see
 * Extending
 * workflows in the *AppConfig User Guide*.
 */
export const updateExtensionAssociation: API.OperationMethod<
  UpdateExtensionAssociationRequest,
  ExtensionAssociation,
  UpdateExtensionAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateExtensionAssociationRequest,
  output: ExtensionAssociation,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExtensionAssociation",
}));

export type ValidateConfigurationError =
  | BadRequestException
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Uses the validators in a configuration profile to validate a configuration.
 */
export const validateConfiguration: API.OperationMethod<
  ValidateConfigurationRequest,
  ValidateConfigurationResponse,
  ValidateConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ValidateConfigurationRequest,
  output: ValidateConfigurationResponse,
  errors: [
    BadRequestException,
    InternalServerException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateConfiguration",
}));
