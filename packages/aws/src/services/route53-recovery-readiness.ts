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
  sdkId: "Route53 Recovery Readiness",
  serviceShapeName: "Route53RecoveryReadiness",
});
const auth = T.AwsAuthSigv4({ name: "route53-recovery-readiness" });
const ver = T.ServiceVersion("2019-12-02");
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
              `https://route53-recovery-readiness-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://route53-recovery-readiness-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://route53-recovery-readiness.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://route53-recovery-readiness.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
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
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type __listOf__string = string[];
export const __listOf__string = /*@__PURE__*/ S.Array(S.String);
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export interface CreateCellRequest {
  CellName?: string;
  Cells?: string[];
  Tags?: { [key: string]: string | undefined };
}
export const CreateCellRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CellName: S.optional(S.String),
    Cells: S.optional(__listOf__string),
    Tags: S.optional(Tags),
  })
    .pipe(S.encodeKeys({ CellName: "cellName", Cells: "cells", Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/cells" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateCellRequest",
}) as any as S.Schema<CreateCellRequest>;
export type __stringMax256 = string;
export type __stringMax64PatternAAZAZ09Z = string;
export interface CreateCellResponse {
  CellArn?: string;
  CellName?: string;
  Cells?: string[];
  ParentReadinessScopes?: string[];
  Tags?: { [key: string]: string | undefined };
}
export const CreateCellResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CellArn: S.optional(S.String),
    CellName: S.optional(S.String),
    Cells: S.optional(__listOf__string),
    ParentReadinessScopes: S.optional(__listOf__string),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      CellArn: "cellArn",
      CellName: "cellName",
      Cells: "cells",
      ParentReadinessScopes: "parentReadinessScopes",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "CreateCellResponse",
}) as any as S.Schema<CreateCellResponse>;
export type CrossAccountAuthorization = string;
export interface CreateCrossAccountAuthorizationRequest {
  CrossAccountAuthorization?: string;
}
export const CreateCrossAccountAuthorizationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ CrossAccountAuthorization: S.optional(S.String) })
      .pipe(
        S.encodeKeys({
          CrossAccountAuthorization: "crossAccountAuthorization",
        }),
      )
      .pipe(
        T.all(
          T.Http({ method: "POST", uri: "/crossaccountauthorizations" }),
          svc,
          auth,
          proto,
          ver,
          rules,
        ),
      ),
).annotate({
  identifier: "CreateCrossAccountAuthorizationRequest",
}) as any as S.Schema<CreateCrossAccountAuthorizationRequest>;
export interface CreateCrossAccountAuthorizationResponse {
  CrossAccountAuthorization?: string;
}
export const CreateCrossAccountAuthorizationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ CrossAccountAuthorization: S.optional(S.String) }).pipe(
      S.encodeKeys({ CrossAccountAuthorization: "crossAccountAuthorization" }),
    ),
).annotate({
  identifier: "CreateCrossAccountAuthorizationResponse",
}) as any as S.Schema<CreateCrossAccountAuthorizationResponse>;
export interface CreateReadinessCheckRequest {
  ReadinessCheckName?: string;
  ResourceSetName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateReadinessCheckRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReadinessCheckName: S.optional(S.String),
    ResourceSetName: S.optional(S.String),
    Tags: S.optional(Tags),
  })
    .pipe(
      S.encodeKeys({
        ReadinessCheckName: "readinessCheckName",
        ResourceSetName: "resourceSetName",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/readinesschecks" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateReadinessCheckRequest",
}) as any as S.Schema<CreateReadinessCheckRequest>;
export interface CreateReadinessCheckResponse {
  ReadinessCheckArn?: string;
  ReadinessCheckName?: string;
  ResourceSet?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateReadinessCheckResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReadinessCheckArn: S.optional(S.String),
    ReadinessCheckName: S.optional(S.String),
    ResourceSet: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ReadinessCheckArn: "readinessCheckArn",
      ReadinessCheckName: "readinessCheckName",
      ResourceSet: "resourceSet",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "CreateReadinessCheckResponse",
}) as any as S.Schema<CreateReadinessCheckResponse>;
export interface CreateRecoveryGroupRequest {
  Cells?: string[];
  RecoveryGroupName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateRecoveryGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Cells: S.optional(__listOf__string),
    RecoveryGroupName: S.optional(S.String),
    Tags: S.optional(Tags),
  })
    .pipe(
      S.encodeKeys({
        Cells: "cells",
        RecoveryGroupName: "recoveryGroupName",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/recoverygroups" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateRecoveryGroupRequest",
}) as any as S.Schema<CreateRecoveryGroupRequest>;
export interface CreateRecoveryGroupResponse {
  Cells?: string[];
  RecoveryGroupArn?: string;
  RecoveryGroupName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateRecoveryGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Cells: S.optional(__listOf__string),
    RecoveryGroupArn: S.optional(S.String),
    RecoveryGroupName: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Cells: "cells",
      RecoveryGroupArn: "recoveryGroupArn",
      RecoveryGroupName: "recoveryGroupName",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "CreateRecoveryGroupResponse",
}) as any as S.Schema<CreateRecoveryGroupResponse>;
export type __stringPatternAWSAZaZ09AZaZ09 = string;
export interface NLBResource {
  Arn?: string;
}
export const NLBResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }).pipe(S.encodeKeys({ Arn: "arn" })),
).annotate({ identifier: "NLBResource" }) as any as S.Schema<NLBResource>;
export interface R53ResourceRecord {
  DomainName?: string;
  RecordSetId?: string;
}
export const R53ResourceRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.optional(S.String),
    RecordSetId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ DomainName: "domainName", RecordSetId: "recordSetId" }),
  ),
).annotate({
  identifier: "R53ResourceRecord",
}) as any as S.Schema<R53ResourceRecord>;
export interface TargetResource {
  NLBResource?: NLBResource;
  R53Resource?: R53ResourceRecord;
}
export const TargetResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NLBResource: S.optional(NLBResource),
    R53Resource: S.optional(R53ResourceRecord),
  }).pipe(
    S.encodeKeys({ NLBResource: "nLBResource", R53Resource: "r53Resource" }),
  ),
).annotate({ identifier: "TargetResource" }) as any as S.Schema<TargetResource>;
export interface DNSTargetResource {
  DomainName?: string;
  HostedZoneArn?: string;
  RecordSetId?: string;
  RecordType?: string;
  TargetResource?: TargetResource;
}
export const DNSTargetResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainName: S.optional(S.String),
    HostedZoneArn: S.optional(S.String),
    RecordSetId: S.optional(S.String),
    RecordType: S.optional(S.String),
    TargetResource: S.optional(TargetResource),
  }).pipe(
    S.encodeKeys({
      DomainName: "domainName",
      HostedZoneArn: "hostedZoneArn",
      RecordSetId: "recordSetId",
      RecordType: "recordType",
      TargetResource: "targetResource",
    }),
  ),
).annotate({
  identifier: "DNSTargetResource",
}) as any as S.Schema<DNSTargetResource>;
export interface Resource {
  ComponentId?: string;
  DnsTargetResource?: DNSTargetResource;
  ReadinessScopes?: string[];
  ResourceArn?: string;
}
export const Resource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ComponentId: S.optional(S.String),
    DnsTargetResource: S.optional(DNSTargetResource),
    ReadinessScopes: S.optional(__listOf__string),
    ResourceArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ComponentId: "componentId",
      DnsTargetResource: "dnsTargetResource",
      ReadinessScopes: "readinessScopes",
      ResourceArn: "resourceArn",
    }),
  ),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export type __listOfResource = Resource[];
export const __listOfResource = /*@__PURE__*/ S.Array(Resource);
export interface CreateResourceSetRequest {
  ResourceSetName?: string;
  ResourceSetType?: string;
  Resources?: Resource[];
  Tags?: { [key: string]: string | undefined };
}
export const CreateResourceSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceSetName: S.optional(S.String),
    ResourceSetType: S.optional(S.String),
    Resources: S.optional(__listOfResource),
    Tags: S.optional(Tags),
  })
    .pipe(
      S.encodeKeys({
        ResourceSetName: "resourceSetName",
        ResourceSetType: "resourceSetType",
        Resources: "resources",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/resourcesets" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateResourceSetRequest",
}) as any as S.Schema<CreateResourceSetRequest>;
export interface CreateResourceSetResponse {
  ResourceSetArn?: string;
  ResourceSetName?: string;
  ResourceSetType?: string;
  Resources?: Resource[];
  Tags?: { [key: string]: string | undefined };
}
export const CreateResourceSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceSetArn: S.optional(S.String),
    ResourceSetName: S.optional(S.String),
    ResourceSetType: S.optional(S.String),
    Resources: S.optional(__listOfResource),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ResourceSetArn: "resourceSetArn",
      ResourceSetName: "resourceSetName",
      ResourceSetType: "resourceSetType",
      Resources: "resources",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "CreateResourceSetResponse",
}) as any as S.Schema<CreateResourceSetResponse>;
export interface DeleteCellRequest {
  CellName: string;
}
export const DeleteCellRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CellName: S.String.pipe(T.HttpLabel("CellName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/cells/{CellName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCellRequest",
}) as any as S.Schema<DeleteCellRequest>;
export interface DeleteCellResponse {}
export const DeleteCellResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCellResponse",
}) as any as S.Schema<DeleteCellResponse>;
export interface DeleteCrossAccountAuthorizationRequest {
  CrossAccountAuthorization: string;
}
export const DeleteCrossAccountAuthorizationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CrossAccountAuthorization: S.String.pipe(
        T.HttpLabel("CrossAccountAuthorization"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/crossaccountauthorizations/{CrossAccountAuthorization}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteCrossAccountAuthorizationRequest",
}) as any as S.Schema<DeleteCrossAccountAuthorizationRequest>;
export interface DeleteCrossAccountAuthorizationResponse {}
export const DeleteCrossAccountAuthorizationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteCrossAccountAuthorizationResponse",
}) as any as S.Schema<DeleteCrossAccountAuthorizationResponse>;
export interface DeleteReadinessCheckRequest {
  ReadinessCheckName: string;
}
export const DeleteReadinessCheckRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReadinessCheckName: S.String.pipe(T.HttpLabel("ReadinessCheckName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/readinesschecks/{ReadinessCheckName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteReadinessCheckRequest",
}) as any as S.Schema<DeleteReadinessCheckRequest>;
export interface DeleteReadinessCheckResponse {}
export const DeleteReadinessCheckResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteReadinessCheckResponse",
}) as any as S.Schema<DeleteReadinessCheckResponse>;
export interface DeleteRecoveryGroupRequest {
  RecoveryGroupName: string;
}
export const DeleteRecoveryGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RecoveryGroupName: S.String.pipe(T.HttpLabel("RecoveryGroupName")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/recoverygroups/{RecoveryGroupName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRecoveryGroupRequest",
}) as any as S.Schema<DeleteRecoveryGroupRequest>;
export interface DeleteRecoveryGroupResponse {}
export const DeleteRecoveryGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRecoveryGroupResponse",
}) as any as S.Schema<DeleteRecoveryGroupResponse>;
export interface DeleteResourceSetRequest {
  ResourceSetName: string;
}
export const DeleteResourceSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceSetName: S.String.pipe(T.HttpLabel("ResourceSetName")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/resourcesets/{ResourceSetName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteResourceSetRequest",
}) as any as S.Schema<DeleteResourceSetRequest>;
export interface DeleteResourceSetResponse {}
export const DeleteResourceSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteResourceSetResponse",
}) as any as S.Schema<DeleteResourceSetResponse>;
export type MaxResults = number;
export interface GetArchitectureRecommendationsRequest {
  MaxResults?: number;
  NextToken?: string;
  RecoveryGroupName: string;
}
export const GetArchitectureRecommendationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      RecoveryGroupName: S.String.pipe(T.HttpLabel("RecoveryGroupName")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/recoverygroups/{RecoveryGroupName}/architectureRecommendations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetArchitectureRecommendationsRequest",
}) as any as S.Schema<GetArchitectureRecommendationsRequest>;
export type LastAuditTimestamp = Date;
export interface Recommendation {
  RecommendationText?: string;
}
export const Recommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RecommendationText: S.optional(S.String) }).pipe(
    S.encodeKeys({ RecommendationText: "recommendationText" }),
  ),
).annotate({ identifier: "Recommendation" }) as any as S.Schema<Recommendation>;
export type __listOfRecommendation = Recommendation[];
export const __listOfRecommendation = /*@__PURE__*/ S.Array(Recommendation);
export interface GetArchitectureRecommendationsResponse {
  LastAuditTimestamp?: Date;
  NextToken?: string;
  Recommendations?: (Recommendation & { RecommendationText: string })[];
}
export const GetArchitectureRecommendationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      LastAuditTimestamp: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      NextToken: S.optional(S.String),
      Recommendations: S.optional(__listOfRecommendation),
    }).pipe(
      S.encodeKeys({
        LastAuditTimestamp: "lastAuditTimestamp",
        NextToken: "nextToken",
        Recommendations: "recommendations",
      }),
    ),
).annotate({
  identifier: "GetArchitectureRecommendationsResponse",
}) as any as S.Schema<GetArchitectureRecommendationsResponse>;
export interface GetCellRequest {
  CellName: string;
}
export const GetCellRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CellName: S.String.pipe(T.HttpLabel("CellName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/cells/{CellName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetCellRequest" }) as any as S.Schema<GetCellRequest>;
export interface GetCellResponse {
  CellArn?: string;
  CellName?: string;
  Cells?: string[];
  ParentReadinessScopes?: string[];
  Tags?: { [key: string]: string | undefined };
}
export const GetCellResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CellArn: S.optional(S.String),
    CellName: S.optional(S.String),
    Cells: S.optional(__listOf__string),
    ParentReadinessScopes: S.optional(__listOf__string),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      CellArn: "cellArn",
      CellName: "cellName",
      Cells: "cells",
      ParentReadinessScopes: "parentReadinessScopes",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "GetCellResponse",
}) as any as S.Schema<GetCellResponse>;
export interface GetCellReadinessSummaryRequest {
  CellName: string;
  MaxResults?: number;
  NextToken?: string;
}
export const GetCellReadinessSummaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CellName: S.String.pipe(T.HttpLabel("CellName")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/cellreadiness/{CellName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCellReadinessSummaryRequest",
}) as any as S.Schema<GetCellReadinessSummaryRequest>;
export type Readiness =
  | "READY"
  | "NOT_READY"
  | "UNKNOWN"
  | "NOT_AUTHORIZED"
  | (string & {});
export const Readiness = S.String;

export interface ReadinessCheckSummary {
  Readiness?: Readiness;
  ReadinessCheckName?: string;
}
export const ReadinessCheckSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Readiness: S.optional(Readiness),
    ReadinessCheckName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Readiness: "readiness",
      ReadinessCheckName: "readinessCheckName",
    }),
  ),
).annotate({
  identifier: "ReadinessCheckSummary",
}) as any as S.Schema<ReadinessCheckSummary>;
export type __listOfReadinessCheckSummary = ReadinessCheckSummary[];
export const __listOfReadinessCheckSummary = /*@__PURE__*/ S.Array(
  ReadinessCheckSummary,
);
export interface GetCellReadinessSummaryResponse {
  NextToken?: string;
  Readiness?: Readiness;
  ReadinessChecks?: ReadinessCheckSummary[];
}
export const GetCellReadinessSummaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Readiness: S.optional(Readiness),
    ReadinessChecks: S.optional(__listOfReadinessCheckSummary),
  }).pipe(
    S.encodeKeys({
      NextToken: "nextToken",
      Readiness: "readiness",
      ReadinessChecks: "readinessChecks",
    }),
  ),
).annotate({
  identifier: "GetCellReadinessSummaryResponse",
}) as any as S.Schema<GetCellReadinessSummaryResponse>;
export interface GetReadinessCheckRequest {
  ReadinessCheckName: string;
}
export const GetReadinessCheckRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReadinessCheckName: S.String.pipe(T.HttpLabel("ReadinessCheckName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/readinesschecks/{ReadinessCheckName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReadinessCheckRequest",
}) as any as S.Schema<GetReadinessCheckRequest>;
export interface GetReadinessCheckResponse {
  ReadinessCheckArn?: string;
  ReadinessCheckName?: string;
  ResourceSet?: string;
  Tags?: { [key: string]: string | undefined };
}
export const GetReadinessCheckResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReadinessCheckArn: S.optional(S.String),
    ReadinessCheckName: S.optional(S.String),
    ResourceSet: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ReadinessCheckArn: "readinessCheckArn",
      ReadinessCheckName: "readinessCheckName",
      ResourceSet: "resourceSet",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "GetReadinessCheckResponse",
}) as any as S.Schema<GetReadinessCheckResponse>;
export interface GetReadinessCheckResourceStatusRequest {
  MaxResults?: number;
  NextToken?: string;
  ReadinessCheckName: string;
  ResourceIdentifier: string;
}
export const GetReadinessCheckResourceStatusRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      ReadinessCheckName: S.String.pipe(T.HttpLabel("ReadinessCheckName")),
      ResourceIdentifier: S.String.pipe(T.HttpLabel("ResourceIdentifier")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/readinesschecks/{ReadinessCheckName}/resource/{ResourceIdentifier}/status",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetReadinessCheckResourceStatusRequest",
}) as any as S.Schema<GetReadinessCheckResourceStatusRequest>;
export type ReadinessCheckTimestamp = Date;
export interface Message {
  MessageText?: string;
}
export const Message = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MessageText: S.optional(S.String) }).pipe(
    S.encodeKeys({ MessageText: "messageText" }),
  ),
).annotate({ identifier: "Message" }) as any as S.Schema<Message>;
export type __listOfMessage = Message[];
export const __listOfMessage = /*@__PURE__*/ S.Array(Message);
export interface RuleResult {
  LastCheckedTimestamp?: Date;
  Messages?: Message[];
  Readiness?: Readiness;
  RuleId?: string;
}
export const RuleResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LastCheckedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Messages: S.optional(__listOfMessage),
    Readiness: S.optional(Readiness),
    RuleId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      LastCheckedTimestamp: "lastCheckedTimestamp",
      Messages: "messages",
      Readiness: "readiness",
      RuleId: "ruleId",
    }),
  ),
).annotate({ identifier: "RuleResult" }) as any as S.Schema<RuleResult>;
export type __listOfRuleResult = RuleResult[];
export const __listOfRuleResult = /*@__PURE__*/ S.Array(RuleResult);
export interface GetReadinessCheckResourceStatusResponse {
  NextToken?: string;
  Readiness?: Readiness;
  Rules?: (RuleResult & {
    LastCheckedTimestamp: ReadinessCheckTimestamp;
    Messages: __listOfMessage;
    Readiness: Readiness;
    RuleId: string;
  })[];
}
export const GetReadinessCheckResourceStatusResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String),
      Readiness: S.optional(Readiness),
      Rules: S.optional(__listOfRuleResult),
    }).pipe(
      S.encodeKeys({
        NextToken: "nextToken",
        Readiness: "readiness",
        Rules: "rules",
      }),
    ),
).annotate({
  identifier: "GetReadinessCheckResourceStatusResponse",
}) as any as S.Schema<GetReadinessCheckResourceStatusResponse>;
export interface GetReadinessCheckStatusRequest {
  MaxResults?: number;
  NextToken?: string;
  ReadinessCheckName: string;
}
export const GetReadinessCheckStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    ReadinessCheckName: S.String.pipe(T.HttpLabel("ReadinessCheckName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/readinesschecks/{ReadinessCheckName}/status",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetReadinessCheckStatusRequest",
}) as any as S.Schema<GetReadinessCheckStatusRequest>;
export interface ResourceResult {
  ComponentId?: string;
  LastCheckedTimestamp?: Date;
  Readiness?: Readiness;
  ResourceArn?: string;
}
export const ResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ComponentId: S.optional(S.String),
    LastCheckedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Readiness: S.optional(Readiness),
    ResourceArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ComponentId: "componentId",
      LastCheckedTimestamp: "lastCheckedTimestamp",
      Readiness: "readiness",
      ResourceArn: "resourceArn",
    }),
  ),
).annotate({ identifier: "ResourceResult" }) as any as S.Schema<ResourceResult>;
export type __listOfResourceResult = ResourceResult[];
export const __listOfResourceResult = /*@__PURE__*/ S.Array(ResourceResult);
export interface GetReadinessCheckStatusResponse {
  Messages?: Message[];
  NextToken?: string;
  Readiness?: Readiness;
  Resources?: (ResourceResult & {
    LastCheckedTimestamp: ReadinessCheckTimestamp;
    Readiness: Readiness;
  })[];
}
export const GetReadinessCheckStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Messages: S.optional(__listOfMessage),
    NextToken: S.optional(S.String),
    Readiness: S.optional(Readiness),
    Resources: S.optional(__listOfResourceResult),
  }).pipe(
    S.encodeKeys({
      Messages: "messages",
      NextToken: "nextToken",
      Readiness: "readiness",
      Resources: "resources",
    }),
  ),
).annotate({
  identifier: "GetReadinessCheckStatusResponse",
}) as any as S.Schema<GetReadinessCheckStatusResponse>;
export interface GetRecoveryGroupRequest {
  RecoveryGroupName: string;
}
export const GetRecoveryGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RecoveryGroupName: S.String.pipe(T.HttpLabel("RecoveryGroupName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/recoverygroups/{RecoveryGroupName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRecoveryGroupRequest",
}) as any as S.Schema<GetRecoveryGroupRequest>;
export interface GetRecoveryGroupResponse {
  Cells?: string[];
  RecoveryGroupArn?: string;
  RecoveryGroupName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const GetRecoveryGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Cells: S.optional(__listOf__string),
    RecoveryGroupArn: S.optional(S.String),
    RecoveryGroupName: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Cells: "cells",
      RecoveryGroupArn: "recoveryGroupArn",
      RecoveryGroupName: "recoveryGroupName",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "GetRecoveryGroupResponse",
}) as any as S.Schema<GetRecoveryGroupResponse>;
export interface GetRecoveryGroupReadinessSummaryRequest {
  MaxResults?: number;
  NextToken?: string;
  RecoveryGroupName: string;
}
export const GetRecoveryGroupReadinessSummaryRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      RecoveryGroupName: S.String.pipe(T.HttpLabel("RecoveryGroupName")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/recoverygroupreadiness/{RecoveryGroupName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetRecoveryGroupReadinessSummaryRequest",
}) as any as S.Schema<GetRecoveryGroupReadinessSummaryRequest>;
export interface GetRecoveryGroupReadinessSummaryResponse {
  NextToken?: string;
  Readiness?: Readiness;
  ReadinessChecks?: ReadinessCheckSummary[];
}
export const GetRecoveryGroupReadinessSummaryResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String),
      Readiness: S.optional(Readiness),
      ReadinessChecks: S.optional(__listOfReadinessCheckSummary),
    }).pipe(
      S.encodeKeys({
        NextToken: "nextToken",
        Readiness: "readiness",
        ReadinessChecks: "readinessChecks",
      }),
    ),
).annotate({
  identifier: "GetRecoveryGroupReadinessSummaryResponse",
}) as any as S.Schema<GetRecoveryGroupReadinessSummaryResponse>;
export interface GetResourceSetRequest {
  ResourceSetName: string;
}
export const GetResourceSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceSetName: S.String.pipe(T.HttpLabel("ResourceSetName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/resourcesets/{ResourceSetName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourceSetRequest",
}) as any as S.Schema<GetResourceSetRequest>;
export interface GetResourceSetResponse {
  ResourceSetArn?: string;
  ResourceSetName?: string;
  ResourceSetType?: string;
  Resources?: Resource[];
  Tags?: { [key: string]: string | undefined };
}
export const GetResourceSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceSetArn: S.optional(S.String),
    ResourceSetName: S.optional(S.String),
    ResourceSetType: S.optional(S.String),
    Resources: S.optional(__listOfResource),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ResourceSetArn: "resourceSetArn",
      ResourceSetName: "resourceSetName",
      ResourceSetType: "resourceSetType",
      Resources: "resources",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "GetResourceSetResponse",
}) as any as S.Schema<GetResourceSetResponse>;
export interface ListCellsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListCellsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/cells" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCellsRequest",
}) as any as S.Schema<ListCellsRequest>;
export interface CellOutput {
  CellArn?: string;
  CellName?: string;
  Cells?: string[];
  ParentReadinessScopes?: string[];
  Tags?: { [key: string]: string | undefined };
}
export const CellOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CellArn: S.optional(S.String),
    CellName: S.optional(S.String),
    Cells: S.optional(__listOf__string),
    ParentReadinessScopes: S.optional(__listOf__string),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      CellArn: "cellArn",
      CellName: "cellName",
      Cells: "cells",
      ParentReadinessScopes: "parentReadinessScopes",
      Tags: "tags",
    }),
  ),
).annotate({ identifier: "CellOutput" }) as any as S.Schema<CellOutput>;
export type __listOfCellOutput = CellOutput[];
export const __listOfCellOutput = /*@__PURE__*/ S.Array(CellOutput);
export interface ListCellsResponse {
  Cells?: (CellOutput & {
    CellArn: __stringMax256;
    CellName: __stringMax64PatternAAZAZ09Z;
    Cells: __listOf__string;
    ParentReadinessScopes: __listOf__string;
  })[];
  NextToken?: string;
}
export const ListCellsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Cells: S.optional(__listOfCellOutput),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Cells: "cells", NextToken: "nextToken" })),
).annotate({
  identifier: "ListCellsResponse",
}) as any as S.Schema<ListCellsResponse>;
export interface ListCrossAccountAuthorizationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListCrossAccountAuthorizationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/crossaccountauthorizations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListCrossAccountAuthorizationsRequest",
}) as any as S.Schema<ListCrossAccountAuthorizationsRequest>;
export type __listOfCrossAccountAuthorization = string[];
export const __listOfCrossAccountAuthorization = /*@__PURE__*/ S.Array(
  S.String,
);
export interface ListCrossAccountAuthorizationsResponse {
  CrossAccountAuthorizations?: string[];
  NextToken?: string;
}
export const ListCrossAccountAuthorizationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CrossAccountAuthorizations: S.optional(__listOfCrossAccountAuthorization),
      NextToken: S.optional(S.String),
    }).pipe(
      S.encodeKeys({
        CrossAccountAuthorizations: "crossAccountAuthorizations",
        NextToken: "nextToken",
      }),
    ),
).annotate({
  identifier: "ListCrossAccountAuthorizationsResponse",
}) as any as S.Schema<ListCrossAccountAuthorizationsResponse>;
export interface ListReadinessChecksRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListReadinessChecksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/readinesschecks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReadinessChecksRequest",
}) as any as S.Schema<ListReadinessChecksRequest>;
export interface ReadinessCheckOutput {
  ReadinessCheckArn?: string;
  ReadinessCheckName?: string;
  ResourceSet?: string;
  Tags?: { [key: string]: string | undefined };
}
export const ReadinessCheckOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReadinessCheckArn: S.optional(S.String),
    ReadinessCheckName: S.optional(S.String),
    ResourceSet: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ReadinessCheckArn: "readinessCheckArn",
      ReadinessCheckName: "readinessCheckName",
      ResourceSet: "resourceSet",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "ReadinessCheckOutput",
}) as any as S.Schema<ReadinessCheckOutput>;
export type __listOfReadinessCheckOutput = ReadinessCheckOutput[];
export const __listOfReadinessCheckOutput =
  /*@__PURE__*/ S.Array(ReadinessCheckOutput);
export interface ListReadinessChecksResponse {
  NextToken?: string;
  ReadinessChecks?: (ReadinessCheckOutput & {
    ReadinessCheckArn: __stringMax256;
    ResourceSet: __stringMax64PatternAAZAZ09Z;
  })[];
}
export const ListReadinessChecksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    ReadinessChecks: S.optional(__listOfReadinessCheckOutput),
  }).pipe(
    S.encodeKeys({
      NextToken: "nextToken",
      ReadinessChecks: "readinessChecks",
    }),
  ),
).annotate({
  identifier: "ListReadinessChecksResponse",
}) as any as S.Schema<ListReadinessChecksResponse>;
export interface ListRecoveryGroupsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListRecoveryGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/recoverygroups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRecoveryGroupsRequest",
}) as any as S.Schema<ListRecoveryGroupsRequest>;
export interface RecoveryGroupOutput {
  Cells?: string[];
  RecoveryGroupArn?: string;
  RecoveryGroupName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const RecoveryGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Cells: S.optional(__listOf__string),
    RecoveryGroupArn: S.optional(S.String),
    RecoveryGroupName: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Cells: "cells",
      RecoveryGroupArn: "recoveryGroupArn",
      RecoveryGroupName: "recoveryGroupName",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "RecoveryGroupOutput",
}) as any as S.Schema<RecoveryGroupOutput>;
export type __listOfRecoveryGroupOutput = RecoveryGroupOutput[];
export const __listOfRecoveryGroupOutput =
  /*@__PURE__*/ S.Array(RecoveryGroupOutput);
export interface ListRecoveryGroupsResponse {
  NextToken?: string;
  RecoveryGroups?: (RecoveryGroupOutput & {
    Cells: __listOf__string;
    RecoveryGroupArn: __stringMax256;
    RecoveryGroupName: __stringMax64PatternAAZAZ09Z;
  })[];
}
export const ListRecoveryGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    RecoveryGroups: S.optional(__listOfRecoveryGroupOutput),
  }).pipe(
    S.encodeKeys({ NextToken: "nextToken", RecoveryGroups: "recoveryGroups" }),
  ),
).annotate({
  identifier: "ListRecoveryGroupsResponse",
}) as any as S.Schema<ListRecoveryGroupsResponse>;
export interface ListResourceSetsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListResourceSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/resourcesets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResourceSetsRequest",
}) as any as S.Schema<ListResourceSetsRequest>;
export interface ResourceSetOutput {
  ResourceSetArn?: string;
  ResourceSetName?: string;
  ResourceSetType?: string;
  Resources?: Resource[];
  Tags?: { [key: string]: string | undefined };
}
export const ResourceSetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceSetArn: S.optional(S.String),
    ResourceSetName: S.optional(S.String),
    ResourceSetType: S.optional(S.String),
    Resources: S.optional(__listOfResource),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ResourceSetArn: "resourceSetArn",
      ResourceSetName: "resourceSetName",
      ResourceSetType: "resourceSetType",
      Resources: "resources",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "ResourceSetOutput",
}) as any as S.Schema<ResourceSetOutput>;
export type __listOfResourceSetOutput = ResourceSetOutput[];
export const __listOfResourceSetOutput =
  /*@__PURE__*/ S.Array(ResourceSetOutput);
export interface ListResourceSetsResponse {
  NextToken?: string;
  ResourceSets?: (ResourceSetOutput & {
    ResourceSetArn: __stringMax256;
    ResourceSetName: __stringMax64PatternAAZAZ09Z;
    ResourceSetType: __stringPatternAWSAZaZ09AZaZ09;
    Resources: __listOfResource;
  })[];
}
export const ListResourceSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    ResourceSets: S.optional(__listOfResourceSetOutput),
  }).pipe(
    S.encodeKeys({ NextToken: "nextToken", ResourceSets: "resourceSets" }),
  ),
).annotate({
  identifier: "ListResourceSetsResponse",
}) as any as S.Schema<ListResourceSetsResponse>;
export interface ListRulesRequest {
  MaxResults?: number;
  NextToken?: string;
  ResourceType?: string;
}
export const ListRulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    ResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/rules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRulesRequest",
}) as any as S.Schema<ListRulesRequest>;
export type __stringMax64 = string;
export interface ListRulesOutput {
  ResourceType?: string;
  RuleDescription?: string;
  RuleId?: string;
}
export const ListRulesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceType: S.optional(S.String),
    RuleDescription: S.optional(S.String),
    RuleId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ResourceType: "resourceType",
      RuleDescription: "ruleDescription",
      RuleId: "ruleId",
    }),
  ),
).annotate({
  identifier: "ListRulesOutput",
}) as any as S.Schema<ListRulesOutput>;
export type __listOfListRulesOutput = ListRulesOutput[];
export const __listOfListRulesOutput = /*@__PURE__*/ S.Array(ListRulesOutput);
export interface ListRulesResponse {
  NextToken?: string;
  Rules?: (ListRulesOutput & {
    ResourceType: __stringMax64;
    RuleDescription: __stringMax256;
    RuleId: __stringMax64;
  })[];
}
export const ListRulesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Rules: S.optional(__listOfListRulesOutput),
  }).pipe(S.encodeKeys({ NextToken: "nextToken", Rules: "rules" })),
).annotate({
  identifier: "ListRulesResponse",
}) as any as S.Schema<ListRulesResponse>;
export interface ListTagsForResourcesRequest {
  ResourceArn: string;
}
export const ListTagsForResourcesRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "ListTagsForResourcesRequest",
}) as any as S.Schema<ListTagsForResourcesRequest>;
export interface ListTagsForResourcesResponse {
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(Tags) }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "ListTagsForResourcesResponse",
}) as any as S.Schema<ListTagsForResourcesResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: S.optional(Tags),
  })
    .pipe(S.encodeKeys({ Tags: "tags" }))
    .pipe(
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
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: S.optional(__listOf__string).pipe(T.HttpQuery("tagKeys")),
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
export interface UpdateCellRequest {
  CellName: string;
  Cells?: string[];
}
export const UpdateCellRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CellName: S.String.pipe(T.HttpLabel("CellName")),
    Cells: S.optional(__listOf__string),
  })
    .pipe(S.encodeKeys({ Cells: "cells" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/cells/{CellName}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateCellRequest",
}) as any as S.Schema<UpdateCellRequest>;
export interface UpdateCellResponse {
  CellArn?: string;
  CellName?: string;
  Cells?: string[];
  ParentReadinessScopes?: string[];
  Tags?: { [key: string]: string | undefined };
}
export const UpdateCellResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CellArn: S.optional(S.String),
    CellName: S.optional(S.String),
    Cells: S.optional(__listOf__string),
    ParentReadinessScopes: S.optional(__listOf__string),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      CellArn: "cellArn",
      CellName: "cellName",
      Cells: "cells",
      ParentReadinessScopes: "parentReadinessScopes",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "UpdateCellResponse",
}) as any as S.Schema<UpdateCellResponse>;
export interface UpdateReadinessCheckRequest {
  ReadinessCheckName: string;
  ResourceSetName?: string;
}
export const UpdateReadinessCheckRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReadinessCheckName: S.String.pipe(T.HttpLabel("ReadinessCheckName")),
    ResourceSetName: S.optional(S.String),
  })
    .pipe(S.encodeKeys({ ResourceSetName: "resourceSetName" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/readinesschecks/{ReadinessCheckName}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateReadinessCheckRequest",
}) as any as S.Schema<UpdateReadinessCheckRequest>;
export interface UpdateReadinessCheckResponse {
  ReadinessCheckArn?: string;
  ReadinessCheckName?: string;
  ResourceSet?: string;
  Tags?: { [key: string]: string | undefined };
}
export const UpdateReadinessCheckResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReadinessCheckArn: S.optional(S.String),
    ReadinessCheckName: S.optional(S.String),
    ResourceSet: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ReadinessCheckArn: "readinessCheckArn",
      ReadinessCheckName: "readinessCheckName",
      ResourceSet: "resourceSet",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "UpdateReadinessCheckResponse",
}) as any as S.Schema<UpdateReadinessCheckResponse>;
export interface UpdateRecoveryGroupRequest {
  Cells?: string[];
  RecoveryGroupName: string;
}
export const UpdateRecoveryGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Cells: S.optional(__listOf__string),
    RecoveryGroupName: S.String.pipe(T.HttpLabel("RecoveryGroupName")),
  })
    .pipe(S.encodeKeys({ Cells: "cells" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/recoverygroups/{RecoveryGroupName}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateRecoveryGroupRequest",
}) as any as S.Schema<UpdateRecoveryGroupRequest>;
export interface UpdateRecoveryGroupResponse {
  Cells?: string[];
  RecoveryGroupArn?: string;
  RecoveryGroupName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const UpdateRecoveryGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Cells: S.optional(__listOf__string),
    RecoveryGroupArn: S.optional(S.String),
    RecoveryGroupName: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Cells: "cells",
      RecoveryGroupArn: "recoveryGroupArn",
      RecoveryGroupName: "recoveryGroupName",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "UpdateRecoveryGroupResponse",
}) as any as S.Schema<UpdateRecoveryGroupResponse>;
export interface UpdateResourceSetRequest {
  ResourceSetName: string;
  ResourceSetType?: string;
  Resources?: Resource[];
}
export const UpdateResourceSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceSetName: S.String.pipe(T.HttpLabel("ResourceSetName")),
    ResourceSetType: S.optional(S.String),
    Resources: S.optional(__listOfResource),
  })
    .pipe(
      S.encodeKeys({
        ResourceSetType: "resourceSetType",
        Resources: "resources",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/resourcesets/{ResourceSetName}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateResourceSetRequest",
}) as any as S.Schema<UpdateResourceSetRequest>;
export interface UpdateResourceSetResponse {
  ResourceSetArn?: string;
  ResourceSetName?: string;
  ResourceSetType?: string;
  Resources?: Resource[];
  Tags?: { [key: string]: string | undefined };
}
export const UpdateResourceSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceSetArn: S.optional(S.String),
    ResourceSetName: S.optional(S.String),
    ResourceSetType: S.optional(S.String),
    Resources: S.optional(__listOfResource),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ResourceSetArn: "resourceSetArn",
      ResourceSetName: "resourceSetName",
      ResourceSetType: "resourceSetType",
      Resources: "resources",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "UpdateResourceSetResponse",
}) as any as S.Schema<UpdateResourceSetResponse>;
export type CreateCellError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a cell in an account.
 */
export const createCell: API.OperationMethod<
  CreateCellRequest,
  CreateCellResponse,
  CreateCellError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCellRequest,
  output: CreateCellResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCell",
}));

export type CreateCrossAccountAuthorizationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a cross-account readiness authorization. This lets you authorize another account to work with Route 53 Application Recovery Controller, for example, to check the readiness status of resources in a separate account.
 */
export const createCrossAccountAuthorization: API.OperationMethod<
  CreateCrossAccountAuthorizationRequest,
  CreateCrossAccountAuthorizationResponse,
  CreateCrossAccountAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCrossAccountAuthorizationRequest,
  output: CreateCrossAccountAuthorizationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCrossAccountAuthorization",
}));

export type CreateReadinessCheckError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a readiness check in an account. A readiness check monitors a resource set in your application, such as a set of Amazon Aurora instances, that Application Recovery Controller is auditing recovery readiness for. The audits run once every minute on every resource that's associated with a readiness check.
 */
export const createReadinessCheck: API.OperationMethod<
  CreateReadinessCheckRequest,
  CreateReadinessCheckResponse,
  CreateReadinessCheckError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateReadinessCheckRequest,
  output: CreateReadinessCheckResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReadinessCheck",
}));

export type CreateRecoveryGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a recovery group in an account. A recovery group corresponds to an application and includes a list of the cells that make up the application.
 */
export const createRecoveryGroup: API.OperationMethod<
  CreateRecoveryGroupRequest,
  CreateRecoveryGroupResponse,
  CreateRecoveryGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRecoveryGroupRequest,
  output: CreateRecoveryGroupResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRecoveryGroup",
}));

export type CreateResourceSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a resource set. A resource set is a set of resources of one type that span multiple cells. You can associate a resource set with a readiness check to monitor the resources for failover readiness.
 */
export const createResourceSet: API.OperationMethod<
  CreateResourceSetRequest,
  CreateResourceSetResponse,
  CreateResourceSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateResourceSetRequest,
  output: CreateResourceSetResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceSet",
}));

export type DeleteCellError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a cell. When successful, the response code is 204, with no response body.
 */
export const deleteCell: API.OperationMethod<
  DeleteCellRequest,
  DeleteCellResponse,
  DeleteCellError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCellRequest,
  output: DeleteCellResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCell",
}));

export type DeleteCrossAccountAuthorizationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes cross account readiness authorization.
 */
export const deleteCrossAccountAuthorization: API.OperationMethod<
  DeleteCrossAccountAuthorizationRequest,
  DeleteCrossAccountAuthorizationResponse,
  DeleteCrossAccountAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCrossAccountAuthorizationRequest,
  output: DeleteCrossAccountAuthorizationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCrossAccountAuthorization",
}));

export type DeleteReadinessCheckError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a readiness check.
 */
export const deleteReadinessCheck: API.OperationMethod<
  DeleteReadinessCheckRequest,
  DeleteReadinessCheckResponse,
  DeleteReadinessCheckError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteReadinessCheckRequest,
  output: DeleteReadinessCheckResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReadinessCheck",
}));

export type DeleteRecoveryGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a recovery group.
 */
export const deleteRecoveryGroup: API.OperationMethod<
  DeleteRecoveryGroupRequest,
  DeleteRecoveryGroupResponse,
  DeleteRecoveryGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRecoveryGroupRequest,
  output: DeleteRecoveryGroupResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecoveryGroup",
}));

export type DeleteResourceSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a resource set.
 */
export const deleteResourceSet: API.OperationMethod<
  DeleteResourceSetRequest,
  DeleteResourceSetResponse,
  DeleteResourceSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourceSetRequest,
  output: DeleteResourceSetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceSet",
}));

export type GetArchitectureRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets recommendations about architecture designs for improving resiliency for an application, based on a recovery group.
 */
export const getArchitectureRecommendations: API.OperationMethod<
  GetArchitectureRecommendationsRequest,
  GetArchitectureRecommendationsResponse,
  GetArchitectureRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetArchitectureRecommendationsRequest,
  output: GetArchitectureRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetArchitectureRecommendations",
}));

export type GetCellError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a cell including cell name, cell Amazon Resource Name (ARN), ARNs of nested cells for this cell, and a list of those cell ARNs with their associated recovery group ARNs.
 */
export const getCell: API.OperationMethod<
  GetCellRequest,
  GetCellResponse,
  GetCellError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCellRequest,
  output: GetCellResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCell",
}));

export type GetCellReadinessSummaryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets readiness for a cell. Aggregates the readiness of all the resources that are associated with the cell into a single value.
 */
export const getCellReadinessSummary: API.PaginatedOperationMethod<
  GetCellReadinessSummaryRequest,
  GetCellReadinessSummaryResponse,
  GetCellReadinessSummaryError,
  Credentials | HttpClient.HttpClient,
  ReadinessCheckSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetCellReadinessSummaryRequest,
  output: GetCellReadinessSummaryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCellReadinessSummary",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ReadinessChecks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetReadinessCheckError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets details about a readiness check.
 */
export const getReadinessCheck: API.OperationMethod<
  GetReadinessCheckRequest,
  GetReadinessCheckResponse,
  GetReadinessCheckError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReadinessCheckRequest,
  output: GetReadinessCheckResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReadinessCheck",
}));

export type GetReadinessCheckResourceStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets individual readiness status for a readiness check. To see the overall readiness status for a recovery group, that considers the readiness status for all the readiness checks in the recovery group, use GetRecoveryGroupReadinessSummary.
 */
export const getReadinessCheckResourceStatus: API.PaginatedOperationMethod<
  GetReadinessCheckResourceStatusRequest,
  GetReadinessCheckResourceStatusResponse,
  GetReadinessCheckResourceStatusError,
  Credentials | HttpClient.HttpClient,
  RuleResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetReadinessCheckResourceStatusRequest,
  output: GetReadinessCheckResourceStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReadinessCheckResourceStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Rules",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetReadinessCheckStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the readiness status for an individual readiness check. To see the overall readiness status for a recovery group, that considers the readiness status for all the readiness checks in a recovery group, use GetRecoveryGroupReadinessSummary.
 */
export const getReadinessCheckStatus: API.PaginatedOperationMethod<
  GetReadinessCheckStatusRequest,
  GetReadinessCheckStatusResponse,
  GetReadinessCheckStatusError,
  Credentials | HttpClient.HttpClient,
  ResourceResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetReadinessCheckStatusRequest,
  output: GetReadinessCheckStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReadinessCheckStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Resources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetRecoveryGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets details about a recovery group, including a list of the cells that are included in it.
 */
export const getRecoveryGroup: API.OperationMethod<
  GetRecoveryGroupRequest,
  GetRecoveryGroupResponse,
  GetRecoveryGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRecoveryGroupRequest,
  output: GetRecoveryGroupResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecoveryGroup",
}));

export type GetRecoveryGroupReadinessSummaryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Displays a summary of information about a recovery group's readiness status. Includes the readiness checks for resources in the recovery group and the readiness status of each one.
 */
export const getRecoveryGroupReadinessSummary: API.PaginatedOperationMethod<
  GetRecoveryGroupReadinessSummaryRequest,
  GetRecoveryGroupReadinessSummaryResponse,
  GetRecoveryGroupReadinessSummaryError,
  Credentials | HttpClient.HttpClient,
  ReadinessCheckSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetRecoveryGroupReadinessSummaryRequest,
  output: GetRecoveryGroupReadinessSummaryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecoveryGroupReadinessSummary",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ReadinessChecks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetResourceSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Displays the details about a resource set, including a list of the resources in the set.
 */
export const getResourceSet: API.OperationMethod<
  GetResourceSetRequest,
  GetResourceSetResponse,
  GetResourceSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourceSetRequest,
  output: GetResourceSetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceSet",
}));

export type ListCellsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the cells for an account.
 */
export const listCells: API.PaginatedOperationMethod<
  ListCellsRequest,
  ListCellsResponse,
  ListCellsError,
  Credentials | HttpClient.HttpClient,
  CellOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCellsRequest,
  output: ListCellsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCells",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Cells",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCrossAccountAuthorizationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the cross-account readiness authorizations that are in place for an account.
 */
export const listCrossAccountAuthorizations: API.PaginatedOperationMethod<
  ListCrossAccountAuthorizationsRequest,
  ListCrossAccountAuthorizationsResponse,
  ListCrossAccountAuthorizationsError,
  Credentials | HttpClient.HttpClient,
  CrossAccountAuthorization
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCrossAccountAuthorizationsRequest,
  output: ListCrossAccountAuthorizationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCrossAccountAuthorizations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CrossAccountAuthorizations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListReadinessChecksError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the readiness checks for an account.
 */
export const listReadinessChecks: API.PaginatedOperationMethod<
  ListReadinessChecksRequest,
  ListReadinessChecksResponse,
  ListReadinessChecksError,
  Credentials | HttpClient.HttpClient,
  ReadinessCheckOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReadinessChecksRequest,
  output: ListReadinessChecksResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReadinessChecks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ReadinessChecks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRecoveryGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the recovery groups in an account.
 */
export const listRecoveryGroups: API.PaginatedOperationMethod<
  ListRecoveryGroupsRequest,
  ListRecoveryGroupsResponse,
  ListRecoveryGroupsError,
  Credentials | HttpClient.HttpClient,
  RecoveryGroupOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRecoveryGroupsRequest,
  output: ListRecoveryGroupsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecoveryGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RecoveryGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceSetsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the resource sets in an account.
 */
export const listResourceSets: API.PaginatedOperationMethod<
  ListResourceSetsRequest,
  ListResourceSetsResponse,
  ListResourceSetsError,
  Credentials | HttpClient.HttpClient,
  ResourceSetOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourceSetsRequest,
  output: ListResourceSetsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceSets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRulesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all readiness rules, or lists the readiness rules for a specific resource type.
 */
export const listRules: API.PaginatedOperationMethod<
  ListRulesRequest,
  ListRulesResponse,
  ListRulesError,
  Credentials | HttpClient.HttpClient,
  ListRulesOutput
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRulesRequest,
  output: ListRulesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Rules",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourcesError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags for a resource.
 */
export const listTagsForResources: API.OperationMethod<
  ListTagsForResourcesRequest,
  ListTagsForResourcesResponse,
  ListTagsForResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourcesRequest,
  output: ListTagsForResourcesResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResources",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds a tag to a resource.
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
 * Removes a tag from a resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateCellError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a cell to replace the list of nested cells with a new list of nested cells.
 */
export const updateCell: API.OperationMethod<
  UpdateCellRequest,
  UpdateCellResponse,
  UpdateCellError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCellRequest,
  output: UpdateCellResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCell",
}));

export type UpdateReadinessCheckError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a readiness check.
 */
export const updateReadinessCheck: API.OperationMethod<
  UpdateReadinessCheckRequest,
  UpdateReadinessCheckResponse,
  UpdateReadinessCheckError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateReadinessCheckRequest,
  output: UpdateReadinessCheckResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReadinessCheck",
}));

export type UpdateRecoveryGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a recovery group.
 */
export const updateRecoveryGroup: API.OperationMethod<
  UpdateRecoveryGroupRequest,
  UpdateRecoveryGroupResponse,
  UpdateRecoveryGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRecoveryGroupRequest,
  output: UpdateRecoveryGroupResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRecoveryGroup",
}));

export type UpdateResourceSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a resource set.
 */
export const updateResourceSet: API.OperationMethod<
  UpdateResourceSetRequest,
  UpdateResourceSetResponse,
  UpdateResourceSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateResourceSetRequest,
  output: UpdateResourceSetResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResourceSet",
}));
