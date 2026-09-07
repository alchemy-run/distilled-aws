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
  sdkId: "Launch Wizard",
  serviceShapeName: "LaunchWizard",
});
const auth = T.AwsAuthSigv4({ name: "launchwizard" });
const ver = T.ServiceVersion("2018-05-10");
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
              `https://launchwizard-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://launchwizard-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://launchwizard.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://launchwizard.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceLimitException
  extends /*@__PURE__*/ S.TaggedError<ResourceLimitException>()(
    "ResourceLimitException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type WorkloadName = string;
export type DeploymentPatternName = string;
export type DeploymentName = string;
export type KeyString = string;
export type ValueString = string;
export type DeploymentSpecifications = { [key: string]: string | undefined };
export const DeploymentSpecifications = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export interface CreateDeploymentInput {
  workloadName: string;
  deploymentPatternName: string;
  name: string;
  specifications: { [key: string]: string | undefined };
  dryRun?: boolean;
  tags?: { [key: string]: string | undefined };
}
export const CreateDeploymentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workloadName: S.String,
    deploymentPatternName: S.String,
    name: S.String,
    specifications: DeploymentSpecifications,
    dryRun: S.optional(S.Boolean),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/createDeployment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDeploymentInput",
}) as any as S.Schema<CreateDeploymentInput>;
export type DeploymentId = string;
export interface CreateDeploymentOutput {
  deploymentId?: string;
}
export const CreateDeploymentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentId: S.optional(S.String) }),
).annotate({
  identifier: "CreateDeploymentOutput",
}) as any as S.Schema<CreateDeploymentOutput>;
export interface DeleteDeploymentInput {
  deploymentId: string;
}
export const DeleteDeploymentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/deleteDeployment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDeploymentInput",
}) as any as S.Schema<DeleteDeploymentInput>;
export type DeploymentStatus =
  | "COMPLETED"
  | "CREATING"
  | "DELETE_IN_PROGRESS"
  | "DELETE_INITIATING"
  | "DELETE_FAILED"
  | "DELETED"
  | "FAILED"
  | "IN_PROGRESS"
  | "VALIDATING"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_COMPLETED"
  | "UPDATE_FAILED"
  | "UPDATE_ROLLBACK_COMPLETED"
  | "UPDATE_ROLLBACK_FAILED"
  | (string & {});
export const DeploymentStatus = S.String;

export interface DeleteDeploymentOutput {
  status?: DeploymentStatus;
  statusReason?: string;
}
export const DeleteDeploymentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(DeploymentStatus),
    statusReason: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteDeploymentOutput",
}) as any as S.Schema<DeleteDeploymentOutput>;
export interface GetDeploymentInput {
  deploymentId: string;
}
export const GetDeploymentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/getDeployment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeploymentInput",
}) as any as S.Schema<GetDeploymentInput>;
export interface DeploymentData {
  name?: string;
  id?: string;
  workloadName?: string;
  patternName?: string;
  status?: DeploymentStatus;
  createdAt?: Date;
  modifiedAt?: Date;
  specifications?: { [key: string]: string | undefined };
  resourceGroup?: string;
  deletedAt?: Date;
  tags?: { [key: string]: string | undefined };
  deploymentArn?: string;
}
export const DeploymentData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    id: S.optional(S.String),
    workloadName: S.optional(S.String),
    patternName: S.optional(S.String),
    status: S.optional(DeploymentStatus),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    specifications: S.optional(DeploymentSpecifications),
    resourceGroup: S.optional(S.String),
    deletedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(Tags),
    deploymentArn: S.optional(S.String),
  }),
).annotate({ identifier: "DeploymentData" }) as any as S.Schema<DeploymentData>;
export interface GetDeploymentOutput {
  deployment?: DeploymentData;
}
export const GetDeploymentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deployment: S.optional(DeploymentData) }),
).annotate({
  identifier: "GetDeploymentOutput",
}) as any as S.Schema<GetDeploymentOutput>;
export type DeploymentPatternVersionName = string;
export interface GetDeploymentPatternVersionInput {
  workloadName: string;
  deploymentPatternName: string;
  deploymentPatternVersionName: string;
}
export const GetDeploymentPatternVersionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workloadName: S.String,
    deploymentPatternName: S.String,
    deploymentPatternVersionName: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/getDeploymentPatternVersion" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeploymentPatternVersionInput",
}) as any as S.Schema<GetDeploymentPatternVersionInput>;
export interface DeploymentPatternVersionDataSummary {
  deploymentPatternVersionName?: string;
  description?: string;
  documentationUrl?: string;
  workloadName?: string;
  deploymentPatternName?: string;
}
export const DeploymentPatternVersionDataSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentPatternVersionName: S.optional(S.String),
    description: S.optional(S.String),
    documentationUrl: S.optional(S.String),
    workloadName: S.optional(S.String),
    deploymentPatternName: S.optional(S.String),
  }),
).annotate({
  identifier: "DeploymentPatternVersionDataSummary",
}) as any as S.Schema<DeploymentPatternVersionDataSummary>;
export interface GetDeploymentPatternVersionOutput {
  deploymentPatternVersion?: DeploymentPatternVersionDataSummary;
}
export const GetDeploymentPatternVersionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentPatternVersion: S.optional(DeploymentPatternVersionDataSummary),
  }),
).annotate({
  identifier: "GetDeploymentPatternVersionOutput",
}) as any as S.Schema<GetDeploymentPatternVersionOutput>;
export interface GetWorkloadInput {
  workloadName: string;
}
export const GetWorkloadInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workloadName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/getWorkload" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkloadInput",
}) as any as S.Schema<GetWorkloadInput>;
export type WorkloadStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "DISABLED"
  | "DELETED"
  | (string & {});
export const WorkloadStatus = S.String;

export interface ManagementAccountConstraint {}
export const ManagementAccountConstraint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ManagementAccountConstraint",
}) as any as S.Schema<ManagementAccountConstraint>;
export type ServicePrincipalType = string;
export interface DelegatedAdminConstraint {
  servicePrincipal: string;
}
export const DelegatedAdminConstraint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ servicePrincipal: S.String }),
).annotate({
  identifier: "DelegatedAdminConstraint",
}) as any as S.Schema<DelegatedAdminConstraint>;
export type AccountConstraint =
  | { managementAccount: ManagementAccountConstraint; delegatedAdmin?: never }
  | { managementAccount?: never; delegatedAdmin: DelegatedAdminConstraint };
export const AccountConstraint = /*@__PURE__*/ S.Union([
  S.Struct({ managementAccount: ManagementAccountConstraint }),
  S.Struct({ delegatedAdmin: DelegatedAdminConstraint }),
]);
export type AccountConstraintsList = AccountConstraint[];
export const AccountConstraintsList = /*@__PURE__*/ S.Array(AccountConstraint);
export interface WorkloadData {
  workloadName?: string;
  displayName?: string;
  status?: WorkloadStatus;
  accountConstraints?: AccountConstraint[];
  description?: string;
  documentationUrl?: string;
  iconUrl?: string;
  statusMessage?: string;
}
export const WorkloadData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workloadName: S.optional(S.String),
    displayName: S.optional(S.String),
    status: S.optional(WorkloadStatus),
    accountConstraints: S.optional(AccountConstraintsList),
    description: S.optional(S.String),
    documentationUrl: S.optional(S.String),
    iconUrl: S.optional(S.String),
    statusMessage: S.optional(S.String),
  }),
).annotate({ identifier: "WorkloadData" }) as any as S.Schema<WorkloadData>;
export interface GetWorkloadOutput {
  workload?: WorkloadData;
}
export const GetWorkloadOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workload: S.optional(WorkloadData) }),
).annotate({
  identifier: "GetWorkloadOutput",
}) as any as S.Schema<GetWorkloadOutput>;
export interface GetWorkloadDeploymentPatternInput {
  workloadName: string;
  deploymentPatternName: string;
}
export const GetWorkloadDeploymentPatternInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ workloadName: S.String, deploymentPatternName: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/getWorkloadDeploymentPattern" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkloadDeploymentPatternInput",
}) as any as S.Schema<GetWorkloadDeploymentPatternInput>;
export type WorkloadVersionName = string;
export type WorkloadDeploymentPatternStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "DISABLED"
  | "DELETED"
  | (string & {});
export const WorkloadDeploymentPatternStatus = S.String;

export type AllowedValues = string[];
export const AllowedValues = /*@__PURE__*/ S.Array(S.String);
export interface DeploymentConditionalField {
  name?: string;
  value?: string;
  comparator?: string;
}
export const DeploymentConditionalField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    value: S.optional(S.String),
    comparator: S.optional(S.String),
  }),
).annotate({
  identifier: "DeploymentConditionalField",
}) as any as S.Schema<DeploymentConditionalField>;
export type SpecificationsConditionalData = DeploymentConditionalField[];
export const SpecificationsConditionalData = /*@__PURE__*/ S.Array(
  DeploymentConditionalField,
);
export interface DeploymentSpecificationsField {
  name?: string;
  description?: string;
  allowedValues?: string[];
  required?: string;
  conditionals?: DeploymentConditionalField[];
}
export const DeploymentSpecificationsField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    allowedValues: S.optional(AllowedValues),
    required: S.optional(S.String),
    conditionals: S.optional(SpecificationsConditionalData),
  }),
).annotate({
  identifier: "DeploymentSpecificationsField",
}) as any as S.Schema<DeploymentSpecificationsField>;
export type DeploymentSpecificationsData = DeploymentSpecificationsField[];
export const DeploymentSpecificationsData = /*@__PURE__*/ S.Array(
  DeploymentSpecificationsField,
);
export interface WorkloadDeploymentPatternData {
  workloadName?: string;
  deploymentPatternName?: string;
  workloadVersionName?: string;
  deploymentPatternVersionName?: string;
  displayName?: string;
  description?: string;
  status?: WorkloadDeploymentPatternStatus;
  statusMessage?: string;
  accountConstraints?: AccountConstraint[];
  specifications?: DeploymentSpecificationsField[];
}
export const WorkloadDeploymentPatternData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workloadName: S.optional(S.String),
    deploymentPatternName: S.optional(S.String),
    workloadVersionName: S.optional(S.String),
    deploymentPatternVersionName: S.optional(S.String),
    displayName: S.optional(S.String),
    description: S.optional(S.String),
    status: S.optional(WorkloadDeploymentPatternStatus),
    statusMessage: S.optional(S.String),
    accountConstraints: S.optional(AccountConstraintsList),
    specifications: S.optional(DeploymentSpecificationsData),
  }),
).annotate({
  identifier: "WorkloadDeploymentPatternData",
}) as any as S.Schema<WorkloadDeploymentPatternData>;
export interface GetWorkloadDeploymentPatternOutput {
  workloadDeploymentPattern?: WorkloadDeploymentPatternData;
}
export const GetWorkloadDeploymentPatternOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workloadDeploymentPattern: S.optional(WorkloadDeploymentPatternData),
  }),
).annotate({
  identifier: "GetWorkloadDeploymentPatternOutput",
}) as any as S.Schema<GetWorkloadDeploymentPatternOutput>;
export type MaxDeploymentEventResults = number;
export type NextToken = string;
export interface ListDeploymentEventsInput {
  deploymentId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListDeploymentEventsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listDeploymentEvents" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDeploymentEventsInput",
}) as any as S.Schema<ListDeploymentEventsInput>;
export type EventStatus =
  | "CANCELED"
  | "CANCELING"
  | "COMPLETED"
  | "CREATED"
  | "FAILED"
  | "IN_PROGRESS"
  | "PENDING"
  | "TIMED_OUT"
  | (string & {});
export const EventStatus = S.String;

export type DeploymentEventMetadataKey = string;
export type DeploymentEventMetadataValue = string;
export type DeploymentEventMetadata = { [key: string]: string | undefined };
export const DeploymentEventMetadata = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface DeploymentEventDataSummary {
  name?: string;
  description?: string;
  status?: EventStatus;
  statusReason?: string;
  timestamp?: Date;
  metadata?: { [key: string]: string | undefined };
}
export const DeploymentEventDataSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    status: S.optional(EventStatus),
    statusReason: S.optional(S.String),
    timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    metadata: S.optional(DeploymentEventMetadata),
  }),
).annotate({
  identifier: "DeploymentEventDataSummary",
}) as any as S.Schema<DeploymentEventDataSummary>;
export type DeploymentEventDataSummaryList = DeploymentEventDataSummary[];
export const DeploymentEventDataSummaryList = /*@__PURE__*/ S.Array(
  DeploymentEventDataSummary,
);
export interface ListDeploymentEventsOutput {
  deploymentEvents?: DeploymentEventDataSummary[];
  nextToken?: string;
}
export const ListDeploymentEventsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentEvents: S.optional(DeploymentEventDataSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDeploymentEventsOutput",
}) as any as S.Schema<ListDeploymentEventsOutput>;
export type MaxWorkloadResults = number;
export type DeploymentPatternVersionFilterKey =
  | "updateFromVersion"
  | (string & {});
export const DeploymentPatternVersionFilterKey = S.String;

export type DeploymentPatternVersionFilterValue = string;
export type DeploymentPatternVersionFilterValues = string[];
export const DeploymentPatternVersionFilterValues = /*@__PURE__*/ S.Array(
  S.String,
);
export interface DeploymentPatternVersionFilter {
  name: DeploymentPatternVersionFilterKey;
  values: string[];
}
export const DeploymentPatternVersionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: DeploymentPatternVersionFilterKey,
    values: DeploymentPatternVersionFilterValues,
  }),
).annotate({
  identifier: "DeploymentPatternVersionFilter",
}) as any as S.Schema<DeploymentPatternVersionFilter>;
export type FilterList = DeploymentPatternVersionFilter[];
export const FilterList = /*@__PURE__*/ S.Array(DeploymentPatternVersionFilter);
export interface ListDeploymentPatternVersionsInput {
  workloadName: string;
  deploymentPatternName: string;
  maxResults?: number;
  nextToken?: string;
  filters?: DeploymentPatternVersionFilter[];
}
export const ListDeploymentPatternVersionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workloadName: S.String,
    deploymentPatternName: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    filters: S.optional(FilterList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listDeploymentPatternVersions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDeploymentPatternVersionsInput",
}) as any as S.Schema<ListDeploymentPatternVersionsInput>;
export type DeploymentPatternVersionDataSummaryList =
  DeploymentPatternVersionDataSummary[];
export const DeploymentPatternVersionDataSummaryList = /*@__PURE__*/ S.Array(
  DeploymentPatternVersionDataSummary,
);
export interface ListDeploymentPatternVersionsOutput {
  deploymentPatternVersions?: DeploymentPatternVersionDataSummary[];
  nextToken?: string;
}
export const ListDeploymentPatternVersionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentPatternVersions: S.optional(
      DeploymentPatternVersionDataSummaryList,
    ),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDeploymentPatternVersionsOutput",
}) as any as S.Schema<ListDeploymentPatternVersionsOutput>;
export type DeploymentFilterKey =
  | "WORKLOAD_NAME"
  | "DEPLOYMENT_STATUS"
  | (string & {});
export const DeploymentFilterKey = S.String;

export type DeploymentFilterValue = string;
export type DeploymentFilterValues = string[];
export const DeploymentFilterValues = /*@__PURE__*/ S.Array(S.String);
export interface DeploymentFilter {
  name?: DeploymentFilterKey;
  values?: string[];
}
export const DeploymentFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(DeploymentFilterKey),
    values: S.optional(DeploymentFilterValues),
  }),
).annotate({
  identifier: "DeploymentFilter",
}) as any as S.Schema<DeploymentFilter>;
export type DeploymentFilterList = DeploymentFilter[];
export const DeploymentFilterList = /*@__PURE__*/ S.Array(DeploymentFilter);
export type MaxDeploymentResults = number;
export interface ListDeploymentsInput {
  filters?: DeploymentFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListDeploymentsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(DeploymentFilterList),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listDeployments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDeploymentsInput",
}) as any as S.Schema<ListDeploymentsInput>;
export interface DeploymentDataSummary {
  name?: string;
  id?: string;
  workloadName?: string;
  patternName?: string;
  status?: DeploymentStatus;
  createdAt?: Date;
  modifiedAt?: Date;
}
export const DeploymentDataSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    id: S.optional(S.String),
    workloadName: S.optional(S.String),
    patternName: S.optional(S.String),
    status: S.optional(DeploymentStatus),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DeploymentDataSummary",
}) as any as S.Schema<DeploymentDataSummary>;
export type DeploymentDataSummaryList = DeploymentDataSummary[];
export const DeploymentDataSummaryList = /*@__PURE__*/ S.Array(
  DeploymentDataSummary,
);
export interface ListDeploymentsOutput {
  deployments?: DeploymentDataSummary[];
  nextToken?: string;
}
export const ListDeploymentsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deployments: S.optional(DeploymentDataSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDeploymentsOutput",
}) as any as S.Schema<ListDeploymentsOutput>;
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
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export type MaxWorkloadDeploymentPatternResults = number;
export interface ListWorkloadDeploymentPatternsInput {
  workloadName: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListWorkloadDeploymentPatternsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workloadName: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listWorkloadDeploymentPatterns" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkloadDeploymentPatternsInput",
}) as any as S.Schema<ListWorkloadDeploymentPatternsInput>;
export interface WorkloadDeploymentPatternDataSummary {
  workloadName?: string;
  deploymentPatternName?: string;
  workloadVersionName?: string;
  deploymentPatternVersionName?: string;
  displayName?: string;
  description?: string;
  status?: WorkloadDeploymentPatternStatus;
  statusMessage?: string;
  accountConstraints?: AccountConstraint[];
}
export const WorkloadDeploymentPatternDataSummary = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      workloadName: S.optional(S.String),
      deploymentPatternName: S.optional(S.String),
      workloadVersionName: S.optional(S.String),
      deploymentPatternVersionName: S.optional(S.String),
      displayName: S.optional(S.String),
      description: S.optional(S.String),
      status: S.optional(WorkloadDeploymentPatternStatus),
      statusMessage: S.optional(S.String),
      accountConstraints: S.optional(AccountConstraintsList),
    }),
).annotate({
  identifier: "WorkloadDeploymentPatternDataSummary",
}) as any as S.Schema<WorkloadDeploymentPatternDataSummary>;
export type WorkloadDeploymentPatternDataSummaryList =
  WorkloadDeploymentPatternDataSummary[];
export const WorkloadDeploymentPatternDataSummaryList = /*@__PURE__*/ S.Array(
  WorkloadDeploymentPatternDataSummary,
);
export interface ListWorkloadDeploymentPatternsOutput {
  workloadDeploymentPatterns?: WorkloadDeploymentPatternDataSummary[];
  nextToken?: string;
}
export const ListWorkloadDeploymentPatternsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      workloadDeploymentPatterns: S.optional(
        WorkloadDeploymentPatternDataSummaryList,
      ),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListWorkloadDeploymentPatternsOutput",
}) as any as S.Schema<ListWorkloadDeploymentPatternsOutput>;
export interface ListWorkloadsInput {
  maxResults?: number;
  nextToken?: string;
}
export const ListWorkloadsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/listWorkloads" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListWorkloadsInput",
}) as any as S.Schema<ListWorkloadsInput>;
export interface WorkloadDataSummary {
  workloadName?: string;
  displayName?: string;
  status?: WorkloadStatus;
  accountConstraints?: AccountConstraint[];
}
export const WorkloadDataSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workloadName: S.optional(S.String),
    displayName: S.optional(S.String),
    status: S.optional(WorkloadStatus),
    accountConstraints: S.optional(AccountConstraintsList),
  }),
).annotate({
  identifier: "WorkloadDataSummary",
}) as any as S.Schema<WorkloadDataSummary>;
export type WorkloadDataSummaryList = WorkloadDataSummary[];
export const WorkloadDataSummaryList =
  /*@__PURE__*/ S.Array(WorkloadDataSummary);
export interface ListWorkloadsOutput {
  workloads?: WorkloadDataSummary[];
  nextToken?: string;
}
export const ListWorkloadsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    workloads: S.optional(WorkloadDataSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWorkloadsOutput",
}) as any as S.Schema<ListWorkloadsOutput>;
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: Tags,
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
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
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
export interface UpdateDeploymentInput {
  deploymentId: string;
  specifications: { [key: string]: string | undefined };
  workloadVersionName?: string;
  deploymentPatternVersionName?: string;
  dryRun?: boolean;
  force?: boolean;
}
export const UpdateDeploymentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.String,
    specifications: DeploymentSpecifications,
    workloadVersionName: S.optional(S.String),
    deploymentPatternVersionName: S.optional(S.String),
    dryRun: S.optional(S.Boolean),
    force: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/updateDeployment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDeploymentInput",
}) as any as S.Schema<UpdateDeploymentInput>;
export interface UpdateDeploymentOutput {
  deployment?: DeploymentDataSummary;
}
export const UpdateDeploymentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deployment: S.optional(DeploymentDataSummary) }),
).annotate({
  identifier: "UpdateDeploymentOutput",
}) as any as S.Schema<UpdateDeploymentOutput>;
export type CreateDeploymentError =
  | InternalServerException
  | ResourceLimitException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a deployment for the given workload. Deployments created by this operation are not available in the Launch Wizard console to use the `Clone deployment` action on.
 */
export const createDeployment: API.OperationMethod<
  CreateDeploymentInput,
  CreateDeploymentOutput,
  CreateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDeploymentInput,
  output: CreateDeploymentOutput,
  errors: [
    InternalServerException,
    ResourceLimitException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeployment",
}));

export type DeleteDeploymentError =
  | InternalServerException
  | ResourceLimitException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a deployment.
 */
export const deleteDeployment: API.OperationMethod<
  DeleteDeploymentInput,
  DeleteDeploymentOutput,
  DeleteDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDeploymentInput,
  output: DeleteDeploymentOutput,
  errors: [
    InternalServerException,
    ResourceLimitException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeployment",
}));

export type GetDeploymentError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the deployment.
 */
export const getDeployment: API.OperationMethod<
  GetDeploymentInput,
  GetDeploymentOutput,
  GetDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeploymentInput,
  output: GetDeploymentOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployment",
}));

export type GetDeploymentPatternVersionError =
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about a deployment pattern version.
 */
export const getDeploymentPatternVersion: API.OperationMethod<
  GetDeploymentPatternVersionInput,
  GetDeploymentPatternVersionOutput,
  GetDeploymentPatternVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeploymentPatternVersionInput,
  output: GetDeploymentPatternVersionOutput,
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeploymentPatternVersion",
}));

export type GetWorkloadError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a workload.
 */
export const getWorkload: API.OperationMethod<
  GetWorkloadInput,
  GetWorkloadOutput,
  GetWorkloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWorkloadInput,
  output: GetWorkloadOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkload",
}));

export type GetWorkloadDeploymentPatternError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns details for a given workload and deployment pattern, including the available specifications. You can use the ListWorkloads operation to discover the available workload names and the ListWorkloadDeploymentPatterns operation to discover the available deployment pattern names of a given workload.
 */
export const getWorkloadDeploymentPattern: API.OperationMethod<
  GetWorkloadDeploymentPatternInput,
  GetWorkloadDeploymentPatternOutput,
  GetWorkloadDeploymentPatternError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWorkloadDeploymentPatternInput,
  output: GetWorkloadDeploymentPatternOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkloadDeploymentPattern",
}));

export type ListDeploymentEventsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the events of a deployment.
 */
export const listDeploymentEvents: API.PaginatedOperationMethod<
  ListDeploymentEventsInput,
  ListDeploymentEventsOutput,
  ListDeploymentEventsError,
  Credentials | HttpClient.HttpClient,
  DeploymentEventDataSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDeploymentEventsInput,
  output: ListDeploymentEventsOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeploymentEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deploymentEvents",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDeploymentPatternVersionsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the deployment pattern versions.
 */
export const listDeploymentPatternVersions: API.PaginatedOperationMethod<
  ListDeploymentPatternVersionsInput,
  ListDeploymentPatternVersionsOutput,
  ListDeploymentPatternVersionsError,
  Credentials | HttpClient.HttpClient,
  DeploymentPatternVersionDataSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDeploymentPatternVersionsInput,
  output: ListDeploymentPatternVersionsOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeploymentPatternVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deploymentPatternVersions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDeploymentsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the deployments that have been created.
 */
export const listDeployments: API.PaginatedOperationMethod<
  ListDeploymentsInput,
  ListDeploymentsOutput,
  ListDeploymentsError,
  Credentials | HttpClient.HttpClient,
  DeploymentDataSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDeploymentsInput,
  output: ListDeploymentsOutput,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeployments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deployments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags associated with a specified resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListWorkloadDeploymentPatternsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the workload deployment patterns for a given workload name. You can use the ListWorkloads operation to discover the available workload names.
 */
export const listWorkloadDeploymentPatterns: API.PaginatedOperationMethod<
  ListWorkloadDeploymentPatternsInput,
  ListWorkloadDeploymentPatternsOutput,
  ListWorkloadDeploymentPatternsError,
  Credentials | HttpClient.HttpClient,
  WorkloadDeploymentPatternDataSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkloadDeploymentPatternsInput,
  output: ListWorkloadDeploymentPatternsOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkloadDeploymentPatterns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workloadDeploymentPatterns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListWorkloadsError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the available workload names. You can use the ListWorkloadDeploymentPatterns operation to discover the available deployment patterns for a given workload.
 */
export const listWorkloads: API.PaginatedOperationMethod<
  ListWorkloadsInput,
  ListWorkloadsOutput,
  ListWorkloadsError,
  Credentials | HttpClient.HttpClient,
  WorkloadDataSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkloadsInput,
  output: ListWorkloadsOutput,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkloads",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workloads",
    pageSize: "maxResults",
  } as const,
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds the specified tags to the given resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified tags from the given resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDeploymentError =
  | InternalServerException
  | ResourceLimitException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a deployment.
 */
export const updateDeployment: API.OperationMethod<
  UpdateDeploymentInput,
  UpdateDeploymentOutput,
  UpdateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDeploymentInput,
  output: UpdateDeploymentOutput,
  errors: [
    InternalServerException,
    ResourceLimitException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeployment",
}));
