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
  sdkId: "Keyspaces",
  serviceShapeName: "KeyspacesService",
});
const auth = T.AwsAuthSigv4({ name: "cassandra" });
const ver = T.ServiceVersion("2022-02-10");
const proto = T.AwsProtocolsAwsJson1_0();
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
              `https://cassandra-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://cassandra.${Region}.amazonaws.com`);
            }
            return e(
              `https://cassandra-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://cassandra.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://cassandra.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "AccessDeniedException", httpResponseCode: 403 }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ConflictException", httpResponseCode: 409 }),
      T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InternalServerException",
        httpResponseCode: 500,
      }),
      T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      resourceArn: S.optional(S.String),
    },
    T.all(
      T.AwsQueryError({
        code: "ResourceNotFoundException",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ServiceQuotaExceededException",
        httpResponseCode: 402,
      }),
      T.HttpError(402),
    ),
  ).pipe(C.withQuotaError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "ValidationException", httpResponseCode: 400 }),
  ) {}
export type KeyspaceName = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export type Rs = string;
export type Region = string;
export type RegionList = string[];
export const RegionList = /*@__PURE__*/ S.Array(S.String);
export interface ReplicationSpecification {
  replicationStrategy: string;
  regionList?: string[];
}
export const ReplicationSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    replicationStrategy: S.String,
    regionList: S.optional(RegionList),
  }),
).annotate({
  identifier: "ReplicationSpecification",
}) as any as S.Schema<ReplicationSpecification>;
export interface CreateKeyspaceRequest {
  keyspaceName: string;
  tags?: Tag[];
  replicationSpecification?: ReplicationSpecification;
}
export const CreateKeyspaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    keyspaceName: S.String,
    tags: S.optional(TagList),
    replicationSpecification: S.optional(ReplicationSpecification),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateKeyspaceRequest",
}) as any as S.Schema<CreateKeyspaceRequest>;
export type ARN = string;
export interface CreateKeyspaceResponse {
  resourceArn: string;
}
export const CreateKeyspaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String }),
).annotate({
  identifier: "CreateKeyspaceResponse",
}) as any as S.Schema<CreateKeyspaceResponse>;
export type TableName = string;
export interface ColumnDefinition {
  name: string;
  type: string;
}
export const ColumnDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, type: S.String }),
).annotate({
  identifier: "ColumnDefinition",
}) as any as S.Schema<ColumnDefinition>;
export type ColumnDefinitionList = ColumnDefinition[];
export const ColumnDefinitionList = /*@__PURE__*/ S.Array(ColumnDefinition);
export interface PartitionKey {
  name: string;
}
export const PartitionKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }),
).annotate({ identifier: "PartitionKey" }) as any as S.Schema<PartitionKey>;
export type PartitionKeyList = PartitionKey[];
export const PartitionKeyList = /*@__PURE__*/ S.Array(PartitionKey);
export type SortOrder = string;
export interface ClusteringKey {
  name: string;
  orderBy: string;
}
export const ClusteringKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, orderBy: S.String }),
).annotate({ identifier: "ClusteringKey" }) as any as S.Schema<ClusteringKey>;
export type ClusteringKeyList = ClusteringKey[];
export const ClusteringKeyList = /*@__PURE__*/ S.Array(ClusteringKey);
export interface StaticColumn {
  name: string;
}
export const StaticColumn = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }),
).annotate({ identifier: "StaticColumn" }) as any as S.Schema<StaticColumn>;
export type StaticColumnList = StaticColumn[];
export const StaticColumnList = /*@__PURE__*/ S.Array(StaticColumn);
export interface SchemaDefinition {
  allColumns: ColumnDefinition[];
  partitionKeys: PartitionKey[];
  clusteringKeys?: ClusteringKey[];
  staticColumns?: StaticColumn[];
}
export const SchemaDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allColumns: ColumnDefinitionList,
    partitionKeys: PartitionKeyList,
    clusteringKeys: S.optional(ClusteringKeyList),
    staticColumns: S.optional(StaticColumnList),
  }),
).annotate({
  identifier: "SchemaDefinition",
}) as any as S.Schema<SchemaDefinition>;
export interface Comment {
  message: string;
}
export const Comment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: S.String }),
).annotate({ identifier: "Comment" }) as any as S.Schema<Comment>;
export type ThroughputMode = string;
export type CapacityUnits = number;
export interface CapacitySpecification {
  throughputMode: string;
  readCapacityUnits?: number;
  writeCapacityUnits?: number;
}
export const CapacitySpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    throughputMode: S.String,
    readCapacityUnits: S.optional(S.Number),
    writeCapacityUnits: S.optional(S.Number),
  }),
).annotate({
  identifier: "CapacitySpecification",
}) as any as S.Schema<CapacitySpecification>;
export type EncryptionType = string;
export type KmsKeyARN = string;
export interface EncryptionSpecification {
  type: string;
  kmsKeyIdentifier?: string;
}
export const EncryptionSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: S.String, kmsKeyIdentifier: S.optional(S.String) }),
).annotate({
  identifier: "EncryptionSpecification",
}) as any as S.Schema<EncryptionSpecification>;
export type PointInTimeRecoveryStatus = string;
export interface PointInTimeRecovery {
  status: string;
}
export const PointInTimeRecovery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.String }),
).annotate({
  identifier: "PointInTimeRecovery",
}) as any as S.Schema<PointInTimeRecovery>;
export type TimeToLiveStatus = string;
export interface TimeToLive {
  status: string;
}
export const TimeToLive = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.String }),
).annotate({ identifier: "TimeToLive" }) as any as S.Schema<TimeToLive>;
export type DefaultTimeToLive = number;
export type ClientSideTimestampsStatus = string;
export interface ClientSideTimestamps {
  status: string;
}
export const ClientSideTimestamps = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.String }),
).annotate({
  identifier: "ClientSideTimestamps",
}) as any as S.Schema<ClientSideTimestamps>;
export type IntegerObject = number;
export type DoubleObject = number;
export interface TargetTrackingScalingPolicyConfiguration {
  disableScaleIn?: boolean;
  scaleInCooldown?: number;
  scaleOutCooldown?: number;
  targetValue: number;
}
export const TargetTrackingScalingPolicyConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      disableScaleIn: S.optional(S.Boolean),
      scaleInCooldown: S.optional(S.Number),
      scaleOutCooldown: S.optional(S.Number),
      targetValue: S.Number,
    }),
).annotate({
  identifier: "TargetTrackingScalingPolicyConfiguration",
}) as any as S.Schema<TargetTrackingScalingPolicyConfiguration>;
export interface AutoScalingPolicy {
  targetTrackingScalingPolicyConfiguration?: TargetTrackingScalingPolicyConfiguration;
}
export const AutoScalingPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetTrackingScalingPolicyConfiguration: S.optional(
      TargetTrackingScalingPolicyConfiguration,
    ),
  }),
).annotate({
  identifier: "AutoScalingPolicy",
}) as any as S.Schema<AutoScalingPolicy>;
export interface AutoScalingSettings {
  autoScalingDisabled?: boolean;
  minimumUnits?: number;
  maximumUnits?: number;
  scalingPolicy?: AutoScalingPolicy;
}
export const AutoScalingSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autoScalingDisabled: S.optional(S.Boolean),
    minimumUnits: S.optional(S.Number),
    maximumUnits: S.optional(S.Number),
    scalingPolicy: S.optional(AutoScalingPolicy),
  }),
).annotate({
  identifier: "AutoScalingSettings",
}) as any as S.Schema<AutoScalingSettings>;
export interface AutoScalingSpecification {
  writeCapacityAutoScaling?: AutoScalingSettings;
  readCapacityAutoScaling?: AutoScalingSettings;
}
export const AutoScalingSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    writeCapacityAutoScaling: S.optional(AutoScalingSettings),
    readCapacityAutoScaling: S.optional(AutoScalingSettings),
  }),
).annotate({
  identifier: "AutoScalingSpecification",
}) as any as S.Schema<AutoScalingSpecification>;
export interface ReplicaSpecification {
  region: string;
  readCapacityUnits?: number;
  readCapacityAutoScaling?: AutoScalingSettings;
}
export const ReplicaSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    region: S.String,
    readCapacityUnits: S.optional(S.Number),
    readCapacityAutoScaling: S.optional(AutoScalingSettings),
  }),
).annotate({
  identifier: "ReplicaSpecification",
}) as any as S.Schema<ReplicaSpecification>;
export type ReplicaSpecificationList = ReplicaSpecification[];
export const ReplicaSpecificationList =
  /*@__PURE__*/ S.Array(ReplicaSpecification);
export type CdcStatus = string;
export type ViewType = string;
export type CdcPropagateTags = string;
export interface CdcSpecification {
  status: string;
  viewType?: string;
  tags?: Tag[];
  propagateTags?: string;
}
export const CdcSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.String,
    viewType: S.optional(S.String),
    tags: S.optional(TagList),
    propagateTags: S.optional(S.String),
  }),
).annotate({
  identifier: "CdcSpecification",
}) as any as S.Schema<CdcSpecification>;
export interface WarmThroughputSpecification {
  readUnitsPerSecond?: number;
  writeUnitsPerSecond?: number;
}
export const WarmThroughputSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    readUnitsPerSecond: S.optional(S.Number),
    writeUnitsPerSecond: S.optional(S.Number),
  }),
).annotate({
  identifier: "WarmThroughputSpecification",
}) as any as S.Schema<WarmThroughputSpecification>;
export interface CreateTableRequest {
  keyspaceName: string;
  tableName: string;
  schemaDefinition: SchemaDefinition;
  comment?: Comment;
  capacitySpecification?: CapacitySpecification;
  encryptionSpecification?: EncryptionSpecification;
  pointInTimeRecovery?: PointInTimeRecovery;
  ttl?: TimeToLive;
  defaultTimeToLive?: number;
  tags?: Tag[];
  clientSideTimestamps?: ClientSideTimestamps;
  autoScalingSpecification?: AutoScalingSpecification;
  replicaSpecifications?: ReplicaSpecification[];
  cdcSpecification?: CdcSpecification;
  warmThroughputSpecification?: WarmThroughputSpecification;
}
export const CreateTableRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    keyspaceName: S.String,
    tableName: S.String,
    schemaDefinition: SchemaDefinition,
    comment: S.optional(Comment),
    capacitySpecification: S.optional(CapacitySpecification),
    encryptionSpecification: S.optional(EncryptionSpecification),
    pointInTimeRecovery: S.optional(PointInTimeRecovery),
    ttl: S.optional(TimeToLive),
    defaultTimeToLive: S.optional(S.Number),
    tags: S.optional(TagList),
    clientSideTimestamps: S.optional(ClientSideTimestamps),
    autoScalingSpecification: S.optional(AutoScalingSpecification),
    replicaSpecifications: S.optional(ReplicaSpecificationList),
    cdcSpecification: S.optional(CdcSpecification),
    warmThroughputSpecification: S.optional(WarmThroughputSpecification),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateTableRequest",
}) as any as S.Schema<CreateTableRequest>;
export interface CreateTableResponse {
  resourceArn: string;
}
export const CreateTableResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String }),
).annotate({
  identifier: "CreateTableResponse",
}) as any as S.Schema<CreateTableResponse>;
export type TypeName = string;
export interface FieldDefinition {
  name: string;
  type: string;
}
export const FieldDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, type: S.String }),
).annotate({
  identifier: "FieldDefinition",
}) as any as S.Schema<FieldDefinition>;
export type FieldList = FieldDefinition[];
export const FieldList = /*@__PURE__*/ S.Array(FieldDefinition);
export interface CreateTypeRequest {
  keyspaceName: string;
  typeName: string;
  fieldDefinitions: FieldDefinition[];
}
export const CreateTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    keyspaceName: S.String,
    typeName: S.String,
    fieldDefinitions: FieldList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateTypeRequest",
}) as any as S.Schema<CreateTypeRequest>;
export interface CreateTypeResponse {
  keyspaceArn: string;
  typeName: string;
}
export const CreateTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ keyspaceArn: S.String, typeName: S.String }),
).annotate({
  identifier: "CreateTypeResponse",
}) as any as S.Schema<CreateTypeResponse>;
export interface DeleteKeyspaceRequest {
  keyspaceName: string;
}
export const DeleteKeyspaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ keyspaceName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteKeyspaceRequest",
}) as any as S.Schema<DeleteKeyspaceRequest>;
export interface DeleteKeyspaceResponse {}
export const DeleteKeyspaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteKeyspaceResponse",
}) as any as S.Schema<DeleteKeyspaceResponse>;
export interface DeleteTableRequest {
  keyspaceName: string;
  tableName: string;
}
export const DeleteTableRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ keyspaceName: S.String, tableName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteTableRequest",
}) as any as S.Schema<DeleteTableRequest>;
export interface DeleteTableResponse {}
export const DeleteTableResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTableResponse",
}) as any as S.Schema<DeleteTableResponse>;
export interface DeleteTypeRequest {
  keyspaceName: string;
  typeName: string;
}
export const DeleteTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ keyspaceName: S.String, typeName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteTypeRequest",
}) as any as S.Schema<DeleteTypeRequest>;
export interface DeleteTypeResponse {
  keyspaceArn: string;
  typeName: string;
}
export const DeleteTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ keyspaceArn: S.String, typeName: S.String }),
).annotate({
  identifier: "DeleteTypeResponse",
}) as any as S.Schema<DeleteTypeResponse>;
export interface GetKeyspaceRequest {
  keyspaceName: string;
}
export const GetKeyspaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ keyspaceName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetKeyspaceRequest",
}) as any as S.Schema<GetKeyspaceRequest>;
export type KeyspaceStatus = string;
export type TablesReplicationProgress = string;
export interface ReplicationGroupStatus {
  region: string;
  keyspaceStatus: string;
  tablesReplicationProgress?: string;
}
export const ReplicationGroupStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    region: S.String,
    keyspaceStatus: S.String,
    tablesReplicationProgress: S.optional(S.String),
  }),
).annotate({
  identifier: "ReplicationGroupStatus",
}) as any as S.Schema<ReplicationGroupStatus>;
export type ReplicationGroupStatusList = ReplicationGroupStatus[];
export const ReplicationGroupStatusList = /*@__PURE__*/ S.Array(
  ReplicationGroupStatus,
);
export interface GetKeyspaceResponse {
  keyspaceName: string;
  resourceArn: string;
  replicationStrategy: string;
  replicationRegions?: string[];
  replicationGroupStatuses?: ReplicationGroupStatus[];
}
export const GetKeyspaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    keyspaceName: S.String,
    resourceArn: S.String,
    replicationStrategy: S.String,
    replicationRegions: S.optional(RegionList),
    replicationGroupStatuses: S.optional(ReplicationGroupStatusList),
  }),
).annotate({
  identifier: "GetKeyspaceResponse",
}) as any as S.Schema<GetKeyspaceResponse>;
export interface GetTableRequest {
  keyspaceName: string;
  tableName: string;
}
export const GetTableRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ keyspaceName: S.String, tableName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetTableRequest",
}) as any as S.Schema<GetTableRequest>;
export type TableStatus = string;
export interface CapacitySpecificationSummary {
  throughputMode: string;
  readCapacityUnits?: number;
  writeCapacityUnits?: number;
  lastUpdateToPayPerRequestTimestamp?: Date;
}
export const CapacitySpecificationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    throughputMode: S.String,
    readCapacityUnits: S.optional(S.Number),
    writeCapacityUnits: S.optional(S.Number),
    lastUpdateToPayPerRequestTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "CapacitySpecificationSummary",
}) as any as S.Schema<CapacitySpecificationSummary>;
export interface PointInTimeRecoverySummary {
  status: string;
  earliestRestorableTimestamp?: Date;
}
export const PointInTimeRecoverySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.String,
    earliestRestorableTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "PointInTimeRecoverySummary",
}) as any as S.Schema<PointInTimeRecoverySummary>;
export type WarmThroughputStatus = string;
export interface WarmThroughputSpecificationSummary {
  readUnitsPerSecond: number;
  writeUnitsPerSecond: number;
  status: string;
}
export const WarmThroughputSpecificationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    readUnitsPerSecond: S.Number,
    writeUnitsPerSecond: S.Number,
    status: S.String,
  }),
).annotate({
  identifier: "WarmThroughputSpecificationSummary",
}) as any as S.Schema<WarmThroughputSpecificationSummary>;
export interface ReplicaSpecificationSummary {
  region?: string;
  status?: string;
  capacitySpecification?: CapacitySpecificationSummary;
  warmThroughputSpecification?: WarmThroughputSpecificationSummary;
}
export const ReplicaSpecificationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    region: S.optional(S.String),
    status: S.optional(S.String),
    capacitySpecification: S.optional(CapacitySpecificationSummary),
    warmThroughputSpecification: S.optional(WarmThroughputSpecificationSummary),
  }),
).annotate({
  identifier: "ReplicaSpecificationSummary",
}) as any as S.Schema<ReplicaSpecificationSummary>;
export type ReplicaSpecificationSummaryList = ReplicaSpecificationSummary[];
export const ReplicaSpecificationSummaryList = /*@__PURE__*/ S.Array(
  ReplicaSpecificationSummary,
);
export type StreamArn = string;
export interface CdcSpecificationSummary {
  status: string;
  viewType?: string;
}
export const CdcSpecificationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ status: S.String, viewType: S.optional(S.String) }),
).annotate({
  identifier: "CdcSpecificationSummary",
}) as any as S.Schema<CdcSpecificationSummary>;
export interface GetTableResponse {
  keyspaceName: string;
  tableName: string;
  resourceArn: string;
  creationTimestamp?: Date;
  status?: string;
  schemaDefinition?: SchemaDefinition;
  capacitySpecification?: CapacitySpecificationSummary;
  encryptionSpecification?: EncryptionSpecification;
  pointInTimeRecovery?: PointInTimeRecoverySummary;
  ttl?: TimeToLive;
  defaultTimeToLive?: number;
  comment?: Comment;
  clientSideTimestamps?: ClientSideTimestamps;
  replicaSpecifications?: ReplicaSpecificationSummary[];
  latestStreamArn?: string;
  cdcSpecification?: CdcSpecificationSummary;
  warmThroughputSpecification?: WarmThroughputSpecificationSummary;
}
export const GetTableResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    keyspaceName: S.String,
    tableName: S.String,
    resourceArn: S.String,
    creationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    status: S.optional(S.String),
    schemaDefinition: S.optional(SchemaDefinition),
    capacitySpecification: S.optional(CapacitySpecificationSummary),
    encryptionSpecification: S.optional(EncryptionSpecification),
    pointInTimeRecovery: S.optional(PointInTimeRecoverySummary),
    ttl: S.optional(TimeToLive),
    defaultTimeToLive: S.optional(S.Number),
    comment: S.optional(Comment),
    clientSideTimestamps: S.optional(ClientSideTimestamps),
    replicaSpecifications: S.optional(ReplicaSpecificationSummaryList),
    latestStreamArn: S.optional(S.String),
    cdcSpecification: S.optional(CdcSpecificationSummary),
    warmThroughputSpecification: S.optional(WarmThroughputSpecificationSummary),
  }),
).annotate({
  identifier: "GetTableResponse",
}) as any as S.Schema<GetTableResponse>;
export interface GetTableAutoScalingSettingsRequest {
  keyspaceName: string;
  tableName: string;
}
export const GetTableAutoScalingSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ keyspaceName: S.String, tableName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetTableAutoScalingSettingsRequest",
}) as any as S.Schema<GetTableAutoScalingSettingsRequest>;
export interface ReplicaAutoScalingSpecification {
  region?: string;
  autoScalingSpecification?: AutoScalingSpecification;
}
export const ReplicaAutoScalingSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    region: S.optional(S.String),
    autoScalingSpecification: S.optional(AutoScalingSpecification),
  }),
).annotate({
  identifier: "ReplicaAutoScalingSpecification",
}) as any as S.Schema<ReplicaAutoScalingSpecification>;
export type ReplicaAutoScalingSpecificationList =
  ReplicaAutoScalingSpecification[];
export const ReplicaAutoScalingSpecificationList = /*@__PURE__*/ S.Array(
  ReplicaAutoScalingSpecification,
);
export interface GetTableAutoScalingSettingsResponse {
  keyspaceName: string;
  tableName: string;
  resourceArn: string;
  autoScalingSpecification?: AutoScalingSpecification;
  replicaSpecifications?: ReplicaAutoScalingSpecification[];
}
export const GetTableAutoScalingSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    keyspaceName: S.String,
    tableName: S.String,
    resourceArn: S.String,
    autoScalingSpecification: S.optional(AutoScalingSpecification),
    replicaSpecifications: S.optional(ReplicaAutoScalingSpecificationList),
  }),
).annotate({
  identifier: "GetTableAutoScalingSettingsResponse",
}) as any as S.Schema<GetTableAutoScalingSettingsResponse>;
export interface GetTypeRequest {
  keyspaceName: string;
  typeName: string;
}
export const GetTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ keyspaceName: S.String, typeName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({ identifier: "GetTypeRequest" }) as any as S.Schema<GetTypeRequest>;
export type TypeStatus = string;
export type TableNameList = string[];
export const TableNameList = /*@__PURE__*/ S.Array(S.String);
export type TypeNameList = string[];
export const TypeNameList = /*@__PURE__*/ S.Array(S.String);
export type Depth = number;
export interface GetTypeResponse {
  keyspaceName: string;
  typeName: string;
  fieldDefinitions?: FieldDefinition[];
  lastModifiedTimestamp?: Date;
  status?: string;
  directReferringTables?: string[];
  directParentTypes?: string[];
  maxNestingDepth?: number;
  keyspaceArn: string;
}
export const GetTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    keyspaceName: S.String,
    typeName: S.String,
    fieldDefinitions: S.optional(FieldList),
    lastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    status: S.optional(S.String),
    directReferringTables: S.optional(TableNameList),
    directParentTypes: S.optional(TypeNameList),
    maxNestingDepth: S.optional(S.Number),
    keyspaceArn: S.String,
  }),
).annotate({
  identifier: "GetTypeResponse",
}) as any as S.Schema<GetTypeResponse>;
export type NextToken = string;
export type MaxResults = number;
export interface ListKeyspacesRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListKeyspacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListKeyspacesRequest",
}) as any as S.Schema<ListKeyspacesRequest>;
export interface KeyspaceSummary {
  keyspaceName: string;
  resourceArn: string;
  replicationStrategy: string;
  replicationRegions?: string[];
}
export const KeyspaceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    keyspaceName: S.String,
    resourceArn: S.String,
    replicationStrategy: S.String,
    replicationRegions: S.optional(RegionList),
  }),
).annotate({
  identifier: "KeyspaceSummary",
}) as any as S.Schema<KeyspaceSummary>;
export type KeyspaceSummaryList = KeyspaceSummary[];
export const KeyspaceSummaryList = /*@__PURE__*/ S.Array(KeyspaceSummary);
export interface ListKeyspacesResponse {
  nextToken?: string;
  keyspaces: KeyspaceSummary[];
}
export const ListKeyspacesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), keyspaces: KeyspaceSummaryList }),
).annotate({
  identifier: "ListKeyspacesResponse",
}) as any as S.Schema<ListKeyspacesResponse>;
export interface ListTablesRequest {
  nextToken?: string;
  maxResults?: number;
  keyspaceName: string;
}
export const ListTablesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    keyspaceName: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTablesRequest",
}) as any as S.Schema<ListTablesRequest>;
export interface TableSummary {
  keyspaceName: string;
  tableName: string;
  resourceArn: string;
}
export const TableSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    keyspaceName: S.String,
    tableName: S.String,
    resourceArn: S.String,
  }),
).annotate({ identifier: "TableSummary" }) as any as S.Schema<TableSummary>;
export type TableSummaryList = TableSummary[];
export const TableSummaryList = /*@__PURE__*/ S.Array(TableSummary);
export interface ListTablesResponse {
  nextToken?: string;
  tables?: TableSummary[];
}
export const ListTablesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    tables: S.optional(TableSummaryList),
  }),
).annotate({
  identifier: "ListTablesResponse",
}) as any as S.Schema<ListTablesResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  nextToken?: string;
  tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListTypesRequest {
  nextToken?: string;
  maxResults?: number;
  keyspaceName: string;
}
export const ListTypesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    keyspaceName: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTypesRequest",
}) as any as S.Schema<ListTypesRequest>;
export interface ListTypesResponse {
  nextToken?: string;
  types: string[];
}
export const ListTypesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), types: TypeNameList }),
).annotate({
  identifier: "ListTypesResponse",
}) as any as S.Schema<ListTypesResponse>;
export interface RestoreTableRequest {
  sourceKeyspaceName: string;
  sourceTableName: string;
  targetKeyspaceName: string;
  targetTableName: string;
  restoreTimestamp?: Date;
  capacitySpecificationOverride?: CapacitySpecification;
  encryptionSpecificationOverride?: EncryptionSpecification;
  pointInTimeRecoveryOverride?: PointInTimeRecovery;
  tagsOverride?: Tag[];
  autoScalingSpecification?: AutoScalingSpecification;
  replicaSpecifications?: ReplicaSpecification[];
}
export const RestoreTableRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceKeyspaceName: S.String,
    sourceTableName: S.String,
    targetKeyspaceName: S.String,
    targetTableName: S.String,
    restoreTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    capacitySpecificationOverride: S.optional(CapacitySpecification),
    encryptionSpecificationOverride: S.optional(EncryptionSpecification),
    pointInTimeRecoveryOverride: S.optional(PointInTimeRecovery),
    tagsOverride: S.optional(TagList),
    autoScalingSpecification: S.optional(AutoScalingSpecification),
    replicaSpecifications: S.optional(ReplicaSpecificationList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RestoreTableRequest",
}) as any as S.Schema<RestoreTableRequest>;
export interface RestoreTableResponse {
  restoredTableARN: string;
}
export const RestoreTableResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ restoredTableARN: S.String }),
).annotate({
  identifier: "RestoreTableResponse",
}) as any as S.Schema<RestoreTableResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: TagList }).pipe(
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
export interface UntagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: TagList }).pipe(
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
export interface UpdateKeyspaceRequest {
  keyspaceName: string;
  replicationSpecification: ReplicationSpecification;
  clientSideTimestamps?: ClientSideTimestamps;
}
export const UpdateKeyspaceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    keyspaceName: S.String,
    replicationSpecification: ReplicationSpecification,
    clientSideTimestamps: S.optional(ClientSideTimestamps),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateKeyspaceRequest",
}) as any as S.Schema<UpdateKeyspaceRequest>;
export interface UpdateKeyspaceResponse {
  resourceArn: string;
}
export const UpdateKeyspaceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String }),
).annotate({
  identifier: "UpdateKeyspaceResponse",
}) as any as S.Schema<UpdateKeyspaceResponse>;
export interface UpdateTableRequest {
  keyspaceName: string;
  tableName: string;
  addColumns?: ColumnDefinition[];
  capacitySpecification?: CapacitySpecification;
  encryptionSpecification?: EncryptionSpecification;
  pointInTimeRecovery?: PointInTimeRecovery;
  ttl?: TimeToLive;
  defaultTimeToLive?: number;
  clientSideTimestamps?: ClientSideTimestamps;
  autoScalingSpecification?: AutoScalingSpecification;
  replicaSpecifications?: ReplicaSpecification[];
  cdcSpecification?: CdcSpecification;
  warmThroughputSpecification?: WarmThroughputSpecification;
}
export const UpdateTableRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    keyspaceName: S.String,
    tableName: S.String,
    addColumns: S.optional(ColumnDefinitionList),
    capacitySpecification: S.optional(CapacitySpecification),
    encryptionSpecification: S.optional(EncryptionSpecification),
    pointInTimeRecovery: S.optional(PointInTimeRecovery),
    ttl: S.optional(TimeToLive),
    defaultTimeToLive: S.optional(S.Number),
    clientSideTimestamps: S.optional(ClientSideTimestamps),
    autoScalingSpecification: S.optional(AutoScalingSpecification),
    replicaSpecifications: S.optional(ReplicaSpecificationList),
    cdcSpecification: S.optional(CdcSpecification),
    warmThroughputSpecification: S.optional(WarmThroughputSpecification),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateTableRequest",
}) as any as S.Schema<UpdateTableRequest>;
export interface UpdateTableResponse {
  resourceArn: string;
}
export const UpdateTableResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String }),
).annotate({
  identifier: "UpdateTableResponse",
}) as any as S.Schema<UpdateTableResponse>;
export type CreateKeyspaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * The `CreateKeyspace` operation adds a new keyspace to your account. In an Amazon Web Services account, keyspace names must be unique within each Region.
 *
 * `CreateKeyspace` is an asynchronous operation. You can monitor the creation status of the new keyspace by using the `GetKeyspace` operation.
 *
 * For more information, see Create a keyspace in the *Amazon Keyspaces Developer Guide*.
 */
export const createKeyspace: API.OperationMethod<
  CreateKeyspaceRequest,
  CreateKeyspaceResponse,
  CreateKeyspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateKeyspaceRequest,
  output: CreateKeyspaceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKeyspace",
}));

export type CreateTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * The `CreateTable` operation adds a new table to the specified keyspace. Within a keyspace, table names must be unique.
 *
 * `CreateTable` is an asynchronous operation. When the request is received, the status of the table is set to `CREATING`. You can monitor the creation status of the new table by using the `GetTable` operation, which returns the current `status` of the table. You can start using a table when the status is `ACTIVE`.
 *
 * For more information, see Create a table in the *Amazon Keyspaces Developer Guide*.
 */
export const createTable: API.OperationMethod<
  CreateTableRequest,
  CreateTableResponse,
  CreateTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTableRequest,
  output: CreateTableResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTable",
}));

export type CreateTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * The `CreateType` operation creates a new user-defined type in the specified keyspace.
 *
 * To configure the required permissions, see Permissions to create a UDT in the *Amazon Keyspaces Developer Guide*.
 *
 * For more information, see User-defined types (UDTs) in the *Amazon Keyspaces Developer Guide*.
 */
export const createType: API.OperationMethod<
  CreateTypeRequest,
  CreateTypeResponse,
  CreateTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTypeRequest,
  output: CreateTypeResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateType",
}));

export type DeleteKeyspaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * The `DeleteKeyspace` operation deletes a keyspace and all of its tables.
 */
export const deleteKeyspace: API.OperationMethod<
  DeleteKeyspaceRequest,
  DeleteKeyspaceResponse,
  DeleteKeyspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteKeyspaceRequest,
  output: DeleteKeyspaceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKeyspace",
}));

export type DeleteTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * The `DeleteTable` operation deletes a table and all of its data. After a `DeleteTable` request is received, the specified table is in the `DELETING` state until Amazon Keyspaces completes the deletion. If the table is in the `ACTIVE` state, you can delete it. If a table is either in the `CREATING` or `UPDATING` states, then Amazon Keyspaces returns a `ResourceInUseException`. If the specified table does not exist, Amazon Keyspaces returns a `ResourceNotFoundException`. If the table is already in the `DELETING` state, no error is returned.
 */
export const deleteTable: API.OperationMethod<
  DeleteTableRequest,
  DeleteTableResponse,
  DeleteTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTableRequest,
  output: DeleteTableResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTable",
}));

export type DeleteTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * The `DeleteType` operation deletes a user-defined type (UDT). You can only delete a type that is not used in a table or another UDT.
 *
 * To configure the required permissions, see Permissions to delete a UDT in the *Amazon Keyspaces Developer Guide*.
 */
export const deleteType: API.OperationMethod<
  DeleteTypeRequest,
  DeleteTypeResponse,
  DeleteTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTypeRequest,
  output: DeleteTypeResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteType",
}));

export type GetKeyspaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Returns the name of the specified keyspace, the Amazon Resource Name (ARN), the replication strategy, the Amazon Web Services Regions of a multi-Region keyspace, and the status of newly added Regions after an `UpdateKeyspace` operation.
 */
export const getKeyspace: API.OperationMethod<
  GetKeyspaceRequest,
  GetKeyspaceResponse,
  GetKeyspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetKeyspaceRequest,
  output: GetKeyspaceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKeyspace",
}));

export type GetTableError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the table, including the table's name and current status, the keyspace name, configuration settings, and metadata.
 *
 * To read table metadata using `GetTable`, the IAM principal needs `Select` action permissions for the table and the system keyspace.
 */
export const getTable: API.OperationMethod<
  GetTableRequest,
  GetTableResponse,
  GetTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTableRequest,
  output: GetTableResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTable",
}));

export type GetTableAutoScalingSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Returns auto scaling related settings of the specified table in JSON format. If the table is a multi-Region table, the Amazon Web Services Region specific auto scaling settings of the table are included.
 *
 * Amazon Keyspaces auto scaling helps you provision throughput capacity for variable workloads efficiently by increasing and decreasing your table's read and write capacity automatically in response to application traffic. For more information, see Managing throughput capacity automatically with Amazon Keyspaces auto scaling in the *Amazon Keyspaces Developer Guide*.
 *
 * `GetTableAutoScalingSettings` can't be used as an action in an IAM policy.
 *
 * To define permissions for `GetTableAutoScalingSettings`, you must allow the following two actions in the IAM policy statement's `Action` element:
 *
 * - `application-autoscaling:DescribeScalableTargets`
 *
 * - `application-autoscaling:DescribeScalingPolicies`
 */
export const getTableAutoScalingSettings: API.OperationMethod<
  GetTableAutoScalingSettingsRequest,
  GetTableAutoScalingSettingsResponse,
  GetTableAutoScalingSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTableAutoScalingSettingsRequest,
  output: GetTableAutoScalingSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableAutoScalingSettings",
}));

export type GetTypeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * The `GetType` operation returns information about the type, for example the field definitions, the timestamp when the type was last modified, the level of nesting, the status, and details about if the type is used in other types and tables.
 *
 * To read keyspace metadata using `GetType`, the IAM principal needs `Select` action permissions for the system keyspace. To configure the required permissions, see Permissions to view a UDT in the *Amazon Keyspaces Developer Guide*.
 */
export const getType: API.OperationMethod<
  GetTypeRequest,
  GetTypeResponse,
  GetTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTypeRequest,
  output: GetTypeResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetType",
}));

export type ListKeyspacesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * The `ListKeyspaces` operation returns a list of keyspaces.
 */
export const listKeyspaces: API.PaginatedOperationMethod<
  ListKeyspacesRequest,
  ListKeyspacesResponse,
  ListKeyspacesError,
  Credentials | HttpClient.HttpClient,
  KeyspaceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListKeyspacesRequest,
  output: ListKeyspacesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKeyspaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "keyspaces",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTablesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * The `ListTables` operation returns a list of tables for a specified keyspace.
 *
 * To read keyspace metadata using `ListTables`, the IAM principal needs `Select` action permissions for the system keyspace.
 */
export const listTables: API.PaginatedOperationMethod<
  ListTablesRequest,
  ListTablesResponse,
  ListTablesError,
  Credentials | HttpClient.HttpClient,
  TableSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTablesRequest,
  output: ListTablesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTables",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tables",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all tags associated with the specified Amazon Keyspaces resource.
 *
 * To read keyspace metadata using `ListTagsForResource`, the IAM principal needs `Select` action permissions for the specified resource and the system keyspace.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tags",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTypesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * The `ListTypes` operation returns a list of types for a specified keyspace.
 *
 * To read keyspace metadata using `ListTypes`, the IAM principal needs `Select` action permissions for the system keyspace. To configure the required permissions, see Permissions to view a UDT in the *Amazon Keyspaces Developer Guide*.
 */
export const listTypes: API.PaginatedOperationMethod<
  ListTypesRequest,
  ListTypesResponse,
  ListTypesError,
  Credentials | HttpClient.HttpClient,
  TypeName
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTypesRequest,
  output: ListTypesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "types",
    pageSize: "maxResults",
  } as const,
})) as any;

export type RestoreTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Restores the table to the specified point in time within the `earliest_restorable_timestamp` and the current time. For more information about restore points, see Time window for PITR continuous backups in the *Amazon Keyspaces Developer Guide*.
 *
 * Any number of users can execute up to 4 concurrent restores (any type of restore) in a given account.
 *
 * When you restore using point in time recovery, Amazon Keyspaces restores your source table's schema and data to the state based on the selected timestamp `(day:hour:minute:second)` to a new table. The Time to Live (TTL) settings are also restored to the state based on the selected timestamp.
 *
 * In addition to the table's schema, data, and TTL settings, `RestoreTable` restores the capacity mode, auto scaling settings, encryption settings, and point-in-time recovery settings from the source table. Unlike the table's schema data and TTL settings, which are restored based on the selected timestamp, these settings are always restored based on the table's settings as of the current time or when the table was deleted.
 *
 * You can also overwrite these settings during restore:
 *
 * - Read/write capacity mode
 *
 * - Provisioned throughput capacity units
 *
 * - Auto scaling settings
 *
 * - Point-in-time (PITR) settings
 *
 * - Tags
 *
 * For more information, see PITR restore settings in the *Amazon Keyspaces Developer Guide*.
 *
 * Note that the following settings are not restored, and you must configure them manually for the new table:
 *
 * - Identity and Access Management (IAM) policies
 *
 * - Amazon CloudWatch metrics and alarms
 */
export const restoreTable: API.OperationMethod<
  RestoreTableRequest,
  RestoreTableResponse,
  RestoreTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestoreTableRequest,
  output: RestoreTableResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreTable",
}));

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Associates a set of tags with a Amazon Keyspaces resource. You can then activate these user-defined tags so that they appear on the Cost Management Console for cost allocation tracking. For more information, see Adding tags and labels to Amazon Keyspaces resources in the *Amazon Keyspaces Developer Guide*.
 *
 * For IAM policy examples that show how to control access to Amazon Keyspaces resources based on tags, see Amazon Keyspaces resource access based on tags in the *Amazon Keyspaces Developer Guide*.
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
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Removes the association of tags from a Amazon Keyspaces resource.
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
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateKeyspaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Adds a new Amazon Web Services Region to the keyspace. You can add a new Region to a keyspace that is either a single or a multi-Region keyspace. Amazon Keyspaces is going to replicate all tables in the keyspace to the new Region. To successfully replicate all tables to the new Region, they must use client-side timestamps for conflict resolution. To enable client-side timestamps, specify `clientSideTimestamps.status = enabled` when invoking the API. For more information about client-side timestamps, see Client-side timestamps in Amazon Keyspaces in the *Amazon Keyspaces Developer Guide*.
 *
 * To add a Region to a keyspace using the `UpdateKeyspace` API, the IAM principal needs permissions for the following IAM actions:
 *
 * - `cassandra:Alter`
 *
 * - `cassandra:AlterMultiRegionResource`
 *
 * - `cassandra:Create`
 *
 * - `cassandra:CreateMultiRegionResource`
 *
 * - `cassandra:Select`
 *
 * - `cassandra:SelectMultiRegionResource`
 *
 * - `cassandra:Modify`
 *
 * - `cassandra:ModifyMultiRegionResource`
 *
 * If the keyspace contains a table that is configured in provisioned mode with auto scaling enabled, the following additional IAM actions need to be allowed.
 *
 * - `application-autoscaling:RegisterScalableTarget`
 *
 * - `application-autoscaling:DeregisterScalableTarget`
 *
 * - `application-autoscaling:DescribeScalableTargets`
 *
 * - `application-autoscaling:PutScalingPolicy`
 *
 * - `application-autoscaling:DescribeScalingPolicies`
 *
 * To use the `UpdateKeyspace` API, the IAM principal also needs permissions to create a service-linked role with the following elements:
 *
 * - `iam:CreateServiceLinkedRole` - The **action** the principal can perform.
 *
 * - `arn:aws:iam::*:role/aws-service-role/replication.cassandra.amazonaws.com/AWSServiceRoleForKeyspacesReplication` - The **resource** that the action can be performed on.
 *
 * - `iam:AWSServiceName: replication.cassandra.amazonaws.com` - The only Amazon Web Services service that this role can be attached to is Amazon Keyspaces.
 *
 * For more information, see Configure the IAM permissions required to add an Amazon Web Services Region to a keyspace in the *Amazon Keyspaces Developer Guide*.
 */
export const updateKeyspace: API.OperationMethod<
  UpdateKeyspaceRequest,
  UpdateKeyspaceResponse,
  UpdateKeyspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateKeyspaceRequest,
  output: UpdateKeyspaceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKeyspace",
}));

export type UpdateTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Adds new columns to the table or updates one of the table's settings, for example capacity mode, auto scaling, encryption, point-in-time recovery, or ttl settings. Note that you can only update one specific table setting per update operation.
 */
export const updateTable: API.OperationMethod<
  UpdateTableRequest,
  UpdateTableResponse,
  UpdateTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTableRequest,
  output: UpdateTableResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTable",
}));
