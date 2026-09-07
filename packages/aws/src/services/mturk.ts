import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace("http://requester.mturk.com/2017-01-17/");
const svc = T.AwsApiService({
  sdkId: "MTurk",
  serviceShapeName: "MTurkRequesterServiceV20170117",
});
const auth = T.AwsAuthSigv4({ name: "mturk-requester" });
const ver = T.ServiceVersion("2017-01-17");
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
              `https://mturk-requester-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://mturk-requester-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://mturk-requester.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        if (Region === "sandbox") {
          return e("https://mturk-requester-sandbox.us-east-1.amazonaws.com");
        }
        return e(
          `https://mturk-requester.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class RequestError
  extends /*@__PURE__*/ S.TaggedError<RequestError>()(
    "RequestError",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      TurkErrorCode: S.optional(S.String),
    },
    T.all(
      T.AwsQueryError({ code: "RequestError", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ServiceFault
  extends /*@__PURE__*/ S.TaggedError<ServiceFault>()(
    "ServiceFault",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      TurkErrorCode: S.optional(S.String),
    },
    T.all(
      T.AwsQueryError({ code: "ServiceFault", httpResponseCode: 500 }),
      T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export interface AcceptQualificationRequestRequest {
  QualificationRequestId: string;
  IntegerValue?: number;
}
export const AcceptQualificationRequestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QualificationRequestId: S.String,
    IntegerValue: S.optional(S.Number),
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
  identifier: "AcceptQualificationRequestRequest",
}) as any as S.Schema<AcceptQualificationRequestRequest>;
export interface AcceptQualificationRequestResponse {}
export const AcceptQualificationRequestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AcceptQualificationRequestResponse",
}) as any as S.Schema<AcceptQualificationRequestResponse>;
export type EntityId = string;
export interface ApproveAssignmentRequest {
  AssignmentId: string;
  RequesterFeedback?: string;
  OverrideRejection?: boolean;
}
export const ApproveAssignmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssignmentId: S.String,
    RequesterFeedback: S.optional(S.String),
    OverrideRejection: S.optional(S.Boolean),
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
  identifier: "ApproveAssignmentRequest",
}) as any as S.Schema<ApproveAssignmentRequest>;
export interface ApproveAssignmentResponse {}
export const ApproveAssignmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ApproveAssignmentResponse",
}) as any as S.Schema<ApproveAssignmentResponse>;
export type CustomerId = string;
export interface AssociateQualificationWithWorkerRequest {
  QualificationTypeId: string;
  WorkerId: string;
  IntegerValue?: number;
  SendNotification?: boolean;
}
export const AssociateQualificationWithWorkerRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      QualificationTypeId: S.String,
      WorkerId: S.String,
      IntegerValue: S.optional(S.Number),
      SendNotification: S.optional(S.Boolean),
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
  identifier: "AssociateQualificationWithWorkerRequest",
}) as any as S.Schema<AssociateQualificationWithWorkerRequest>;
export interface AssociateQualificationWithWorkerResponse {}
export const AssociateQualificationWithWorkerResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "AssociateQualificationWithWorkerResponse",
}) as any as S.Schema<AssociateQualificationWithWorkerResponse>;
export type IdempotencyToken = string;
export interface CreateAdditionalAssignmentsForHITRequest {
  HITId: string;
  NumberOfAdditionalAssignments: number;
  UniqueRequestToken?: string;
}
export const CreateAdditionalAssignmentsForHITRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      HITId: S.String,
      NumberOfAdditionalAssignments: S.Number,
      UniqueRequestToken: S.optional(S.String),
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
  identifier: "CreateAdditionalAssignmentsForHITRequest",
}) as any as S.Schema<CreateAdditionalAssignmentsForHITRequest>;
export interface CreateAdditionalAssignmentsForHITResponse {}
export const CreateAdditionalAssignmentsForHITResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "CreateAdditionalAssignmentsForHITResponse",
  }) as any as S.Schema<CreateAdditionalAssignmentsForHITResponse>;
export type CurrencyAmount = string;
export type Comparator =
  | "LessThan"
  | "LessThanOrEqualTo"
  | "GreaterThan"
  | "GreaterThanOrEqualTo"
  | "EqualTo"
  | "NotEqualTo"
  | "Exists"
  | "DoesNotExist"
  | "In"
  | "NotIn"
  | (string & {});
export const Comparator = S.String;

export type IntegerList = number[];
export const IntegerList = /*@__PURE__*/ S.Array(S.Number);
export type CountryParameters = string;
export interface Locale {
  Country: string;
  Subdivision?: string;
}
export const Locale = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Country: S.String, Subdivision: S.optional(S.String) }),
).annotate({ identifier: "Locale" }) as any as S.Schema<Locale>;
export type LocaleList = Locale[];
export const LocaleList = /*@__PURE__*/ S.Array(Locale);
export type HITAccessActions =
  | "Accept"
  | "PreviewAndAccept"
  | "DiscoverPreviewAndAccept"
  | (string & {});
export const HITAccessActions = S.String;

export interface QualificationRequirement {
  QualificationTypeId: string;
  Comparator: Comparator;
  IntegerValues?: number[];
  LocaleValues?: Locale[];
  RequiredToPreview?: boolean;
  ActionsGuarded?: HITAccessActions;
}
export const QualificationRequirement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QualificationTypeId: S.String,
    Comparator: Comparator,
    IntegerValues: S.optional(IntegerList),
    LocaleValues: S.optional(LocaleList),
    RequiredToPreview: S.optional(S.Boolean),
    ActionsGuarded: S.optional(HITAccessActions),
  }),
).annotate({
  identifier: "QualificationRequirement",
}) as any as S.Schema<QualificationRequirement>;
export type QualificationRequirementList = QualificationRequirement[];
export const QualificationRequirementList = /*@__PURE__*/ S.Array(
  QualificationRequirement,
);
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface ParameterMapEntry {
  Key?: string;
  Values?: string[];
}
export const ParameterMapEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Values: S.optional(StringList) }),
).annotate({
  identifier: "ParameterMapEntry",
}) as any as S.Schema<ParameterMapEntry>;
export type ParameterMapEntryList = ParameterMapEntry[];
export const ParameterMapEntryList = /*@__PURE__*/ S.Array(ParameterMapEntry);
export interface PolicyParameter {
  Key?: string;
  Values?: string[];
  MapEntries?: ParameterMapEntry[];
}
export const PolicyParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(S.String),
    Values: S.optional(StringList),
    MapEntries: S.optional(ParameterMapEntryList),
  }),
).annotate({
  identifier: "PolicyParameter",
}) as any as S.Schema<PolicyParameter>;
export type PolicyParameterList = PolicyParameter[];
export const PolicyParameterList = /*@__PURE__*/ S.Array(PolicyParameter);
export interface ReviewPolicy {
  PolicyName: string;
  Parameters?: PolicyParameter[];
}
export const ReviewPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyName: S.String,
    Parameters: S.optional(PolicyParameterList),
  }),
).annotate({ identifier: "ReviewPolicy" }) as any as S.Schema<ReviewPolicy>;
export interface HITLayoutParameter {
  Name: string;
  Value: string;
}
export const HITLayoutParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Value: S.String }),
).annotate({
  identifier: "HITLayoutParameter",
}) as any as S.Schema<HITLayoutParameter>;
export type HITLayoutParameterList = HITLayoutParameter[];
export const HITLayoutParameterList = /*@__PURE__*/ S.Array(HITLayoutParameter);
export interface CreateHITRequest {
  MaxAssignments?: number;
  AutoApprovalDelayInSeconds?: number;
  LifetimeInSeconds: number;
  AssignmentDurationInSeconds: number;
  Reward: string;
  Title: string;
  Keywords?: string;
  Description: string;
  Question?: string;
  RequesterAnnotation?: string;
  QualificationRequirements?: QualificationRequirement[];
  UniqueRequestToken?: string;
  AssignmentReviewPolicy?: ReviewPolicy;
  HITReviewPolicy?: ReviewPolicy;
  HITLayoutId?: string;
  HITLayoutParameters?: HITLayoutParameter[];
}
export const CreateHITRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxAssignments: S.optional(S.Number),
    AutoApprovalDelayInSeconds: S.optional(S.Number),
    LifetimeInSeconds: S.Number,
    AssignmentDurationInSeconds: S.Number,
    Reward: S.String,
    Title: S.String,
    Keywords: S.optional(S.String),
    Description: S.String,
    Question: S.optional(S.String),
    RequesterAnnotation: S.optional(S.String),
    QualificationRequirements: S.optional(QualificationRequirementList),
    UniqueRequestToken: S.optional(S.String),
    AssignmentReviewPolicy: S.optional(ReviewPolicy),
    HITReviewPolicy: S.optional(ReviewPolicy),
    HITLayoutId: S.optional(S.String),
    HITLayoutParameters: S.optional(HITLayoutParameterList),
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
  identifier: "CreateHITRequest",
}) as any as S.Schema<CreateHITRequest>;
export type HITStatus =
  | "Assignable"
  | "Unassignable"
  | "Reviewable"
  | "Reviewing"
  | "Disposed"
  | (string & {});
export const HITStatus = S.String;

export type HITReviewStatus =
  | "NotReviewed"
  | "MarkedForReview"
  | "ReviewedAppropriate"
  | "ReviewedInappropriate"
  | (string & {});
export const HITReviewStatus = S.String;

export interface HIT {
  HITId?: string;
  HITTypeId?: string;
  HITGroupId?: string;
  HITLayoutId?: string;
  CreationTime?: Date;
  Title?: string;
  Description?: string;
  Question?: string;
  Keywords?: string;
  HITStatus?: HITStatus;
  MaxAssignments?: number;
  Reward?: string;
  AutoApprovalDelayInSeconds?: number;
  Expiration?: Date;
  AssignmentDurationInSeconds?: number;
  RequesterAnnotation?: string;
  QualificationRequirements?: QualificationRequirement[];
  HITReviewStatus?: HITReviewStatus;
  NumberOfAssignmentsPending?: number;
  NumberOfAssignmentsAvailable?: number;
  NumberOfAssignmentsCompleted?: number;
}
export const HIT = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HITId: S.optional(S.String),
    HITTypeId: S.optional(S.String),
    HITGroupId: S.optional(S.String),
    HITLayoutId: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Title: S.optional(S.String),
    Description: S.optional(S.String),
    Question: S.optional(S.String),
    Keywords: S.optional(S.String),
    HITStatus: S.optional(HITStatus),
    MaxAssignments: S.optional(S.Number),
    Reward: S.optional(S.String),
    AutoApprovalDelayInSeconds: S.optional(S.Number),
    Expiration: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AssignmentDurationInSeconds: S.optional(S.Number),
    RequesterAnnotation: S.optional(S.String),
    QualificationRequirements: S.optional(QualificationRequirementList),
    HITReviewStatus: S.optional(HITReviewStatus),
    NumberOfAssignmentsPending: S.optional(S.Number),
    NumberOfAssignmentsAvailable: S.optional(S.Number),
    NumberOfAssignmentsCompleted: S.optional(S.Number),
  }),
).annotate({ identifier: "HIT" }) as any as S.Schema<HIT>;
export interface CreateHITResponse {
  HIT?: HIT;
}
export const CreateHITResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HIT: S.optional(HIT) }).pipe(ns),
).annotate({
  identifier: "CreateHITResponse",
}) as any as S.Schema<CreateHITResponse>;
export interface CreateHITTypeRequest {
  AutoApprovalDelayInSeconds?: number;
  AssignmentDurationInSeconds: number;
  Reward: string;
  Title: string;
  Keywords?: string;
  Description: string;
  QualificationRequirements?: QualificationRequirement[];
}
export const CreateHITTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutoApprovalDelayInSeconds: S.optional(S.Number),
    AssignmentDurationInSeconds: S.Number,
    Reward: S.String,
    Title: S.String,
    Keywords: S.optional(S.String),
    Description: S.String,
    QualificationRequirements: S.optional(QualificationRequirementList),
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
  identifier: "CreateHITTypeRequest",
}) as any as S.Schema<CreateHITTypeRequest>;
export interface CreateHITTypeResponse {
  HITTypeId?: string;
}
export const CreateHITTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HITTypeId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateHITTypeResponse",
}) as any as S.Schema<CreateHITTypeResponse>;
export interface CreateHITWithHITTypeRequest {
  HITTypeId: string;
  MaxAssignments?: number;
  LifetimeInSeconds: number;
  Question?: string;
  RequesterAnnotation?: string;
  UniqueRequestToken?: string;
  AssignmentReviewPolicy?: ReviewPolicy;
  HITReviewPolicy?: ReviewPolicy;
  HITLayoutId?: string;
  HITLayoutParameters?: HITLayoutParameter[];
}
export const CreateHITWithHITTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HITTypeId: S.String,
    MaxAssignments: S.optional(S.Number),
    LifetimeInSeconds: S.Number,
    Question: S.optional(S.String),
    RequesterAnnotation: S.optional(S.String),
    UniqueRequestToken: S.optional(S.String),
    AssignmentReviewPolicy: S.optional(ReviewPolicy),
    HITReviewPolicy: S.optional(ReviewPolicy),
    HITLayoutId: S.optional(S.String),
    HITLayoutParameters: S.optional(HITLayoutParameterList),
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
  identifier: "CreateHITWithHITTypeRequest",
}) as any as S.Schema<CreateHITWithHITTypeRequest>;
export interface CreateHITWithHITTypeResponse {
  HIT?: HIT;
}
export const CreateHITWithHITTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HIT: S.optional(HIT) }).pipe(ns),
).annotate({
  identifier: "CreateHITWithHITTypeResponse",
}) as any as S.Schema<CreateHITWithHITTypeResponse>;
export type QualificationTypeStatus = "Active" | "Inactive" | (string & {});
export const QualificationTypeStatus = S.String;

export interface CreateQualificationTypeRequest {
  Name: string;
  Keywords?: string;
  Description: string;
  QualificationTypeStatus: QualificationTypeStatus;
  RetryDelayInSeconds?: number;
  Test?: string;
  AnswerKey?: string;
  TestDurationInSeconds?: number;
  AutoGranted?: boolean;
  AutoGrantedValue?: number;
}
export const CreateQualificationTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Keywords: S.optional(S.String),
    Description: S.String,
    QualificationTypeStatus: QualificationTypeStatus,
    RetryDelayInSeconds: S.optional(S.Number),
    Test: S.optional(S.String),
    AnswerKey: S.optional(S.String),
    TestDurationInSeconds: S.optional(S.Number),
    AutoGranted: S.optional(S.Boolean),
    AutoGrantedValue: S.optional(S.Number),
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
  identifier: "CreateQualificationTypeRequest",
}) as any as S.Schema<CreateQualificationTypeRequest>;
export interface QualificationType {
  QualificationTypeId?: string;
  CreationTime?: Date;
  Name?: string;
  Description?: string;
  Keywords?: string;
  QualificationTypeStatus?: QualificationTypeStatus;
  Test?: string;
  TestDurationInSeconds?: number;
  AnswerKey?: string;
  RetryDelayInSeconds?: number;
  IsRequestable?: boolean;
  AutoGranted?: boolean;
  AutoGrantedValue?: number;
}
export const QualificationType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QualificationTypeId: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Keywords: S.optional(S.String),
    QualificationTypeStatus: S.optional(QualificationTypeStatus),
    Test: S.optional(S.String),
    TestDurationInSeconds: S.optional(S.Number),
    AnswerKey: S.optional(S.String),
    RetryDelayInSeconds: S.optional(S.Number),
    IsRequestable: S.optional(S.Boolean),
    AutoGranted: S.optional(S.Boolean),
    AutoGrantedValue: S.optional(S.Number),
  }),
).annotate({
  identifier: "QualificationType",
}) as any as S.Schema<QualificationType>;
export interface CreateQualificationTypeResponse {
  QualificationType?: QualificationType;
}
export const CreateQualificationTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ QualificationType: S.optional(QualificationType) }).pipe(ns),
).annotate({
  identifier: "CreateQualificationTypeResponse",
}) as any as S.Schema<CreateQualificationTypeResponse>;
export interface CreateWorkerBlockRequest {
  WorkerId: string;
  Reason: string;
}
export const CreateWorkerBlockRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WorkerId: S.String, Reason: S.String }).pipe(
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
  identifier: "CreateWorkerBlockRequest",
}) as any as S.Schema<CreateWorkerBlockRequest>;
export interface CreateWorkerBlockResponse {}
export const CreateWorkerBlockResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateWorkerBlockResponse",
}) as any as S.Schema<CreateWorkerBlockResponse>;
export interface DeleteHITRequest {
  HITId: string;
}
export const DeleteHITRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HITId: S.String }).pipe(
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
  identifier: "DeleteHITRequest",
}) as any as S.Schema<DeleteHITRequest>;
export interface DeleteHITResponse {}
export const DeleteHITResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteHITResponse",
}) as any as S.Schema<DeleteHITResponse>;
export interface DeleteQualificationTypeRequest {
  QualificationTypeId: string;
}
export const DeleteQualificationTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ QualificationTypeId: S.String }).pipe(
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
  identifier: "DeleteQualificationTypeRequest",
}) as any as S.Schema<DeleteQualificationTypeRequest>;
export interface DeleteQualificationTypeResponse {}
export const DeleteQualificationTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteQualificationTypeResponse",
}) as any as S.Schema<DeleteQualificationTypeResponse>;
export interface DeleteWorkerBlockRequest {
  WorkerId: string;
  Reason?: string;
}
export const DeleteWorkerBlockRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WorkerId: S.String, Reason: S.optional(S.String) }).pipe(
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
  identifier: "DeleteWorkerBlockRequest",
}) as any as S.Schema<DeleteWorkerBlockRequest>;
export interface DeleteWorkerBlockResponse {}
export const DeleteWorkerBlockResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteWorkerBlockResponse",
}) as any as S.Schema<DeleteWorkerBlockResponse>;
export interface DisassociateQualificationFromWorkerRequest {
  WorkerId: string;
  QualificationTypeId: string;
  Reason?: string;
}
export const DisassociateQualificationFromWorkerRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      WorkerId: S.String,
      QualificationTypeId: S.String,
      Reason: S.optional(S.String),
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
    identifier: "DisassociateQualificationFromWorkerRequest",
  }) as any as S.Schema<DisassociateQualificationFromWorkerRequest>;
export interface DisassociateQualificationFromWorkerResponse {}
export const DisassociateQualificationFromWorkerResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "DisassociateQualificationFromWorkerResponse",
  }) as any as S.Schema<DisassociateQualificationFromWorkerResponse>;
export interface GetAccountBalanceRequest {}
export const GetAccountBalanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
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
  identifier: "GetAccountBalanceRequest",
}) as any as S.Schema<GetAccountBalanceRequest>;
export interface GetAccountBalanceResponse {
  AvailableBalance?: string;
  OnHoldBalance?: string;
}
export const GetAccountBalanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailableBalance: S.optional(S.String),
    OnHoldBalance: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetAccountBalanceResponse",
}) as any as S.Schema<GetAccountBalanceResponse>;
export interface GetAssignmentRequest {
  AssignmentId: string;
}
export const GetAssignmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AssignmentId: S.String }).pipe(
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
  identifier: "GetAssignmentRequest",
}) as any as S.Schema<GetAssignmentRequest>;
export type AssignmentStatus =
  | "Submitted"
  | "Approved"
  | "Rejected"
  | (string & {});
export const AssignmentStatus = S.String;

export interface Assignment {
  AssignmentId?: string;
  WorkerId?: string;
  HITId?: string;
  AssignmentStatus?: AssignmentStatus;
  AutoApprovalTime?: Date;
  AcceptTime?: Date;
  SubmitTime?: Date;
  ApprovalTime?: Date;
  RejectionTime?: Date;
  Deadline?: Date;
  Answer?: string;
  RequesterFeedback?: string;
}
export const Assignment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssignmentId: S.optional(S.String),
    WorkerId: S.optional(S.String),
    HITId: S.optional(S.String),
    AssignmentStatus: S.optional(AssignmentStatus),
    AutoApprovalTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AcceptTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    SubmitTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ApprovalTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RejectionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Deadline: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Answer: S.optional(S.String),
    RequesterFeedback: S.optional(S.String),
  }),
).annotate({ identifier: "Assignment" }) as any as S.Schema<Assignment>;
export interface GetAssignmentResponse {
  Assignment?: Assignment;
  HIT?: HIT;
}
export const GetAssignmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Assignment: S.optional(Assignment), HIT: S.optional(HIT) }).pipe(
    ns,
  ),
).annotate({
  identifier: "GetAssignmentResponse",
}) as any as S.Schema<GetAssignmentResponse>;
export interface GetFileUploadURLRequest {
  AssignmentId: string;
  QuestionIdentifier: string;
}
export const GetFileUploadURLRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AssignmentId: S.String, QuestionIdentifier: S.String }).pipe(
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
  identifier: "GetFileUploadURLRequest",
}) as any as S.Schema<GetFileUploadURLRequest>;
export interface GetFileUploadURLResponse {
  FileUploadURL?: string;
}
export const GetFileUploadURLResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FileUploadURL: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "GetFileUploadURLResponse",
}) as any as S.Schema<GetFileUploadURLResponse>;
export interface GetHITRequest {
  HITId: string;
}
export const GetHITRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HITId: S.String }).pipe(
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
).annotate({ identifier: "GetHITRequest" }) as any as S.Schema<GetHITRequest>;
export interface GetHITResponse {
  HIT?: HIT;
}
export const GetHITResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HIT: S.optional(HIT) }).pipe(ns),
).annotate({ identifier: "GetHITResponse" }) as any as S.Schema<GetHITResponse>;
export interface GetQualificationScoreRequest {
  QualificationTypeId: string;
  WorkerId: string;
}
export const GetQualificationScoreRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ QualificationTypeId: S.String, WorkerId: S.String }).pipe(
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
  identifier: "GetQualificationScoreRequest",
}) as any as S.Schema<GetQualificationScoreRequest>;
export type QualificationStatus = "Granted" | "Revoked" | (string & {});
export const QualificationStatus = S.String;

export interface Qualification {
  QualificationTypeId?: string;
  WorkerId?: string;
  GrantTime?: Date;
  IntegerValue?: number;
  LocaleValue?: Locale;
  Status?: QualificationStatus;
}
export const Qualification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QualificationTypeId: S.optional(S.String),
    WorkerId: S.optional(S.String),
    GrantTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IntegerValue: S.optional(S.Number),
    LocaleValue: S.optional(Locale),
    Status: S.optional(QualificationStatus),
  }),
).annotate({ identifier: "Qualification" }) as any as S.Schema<Qualification>;
export interface GetQualificationScoreResponse {
  Qualification?: Qualification;
}
export const GetQualificationScoreResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Qualification: S.optional(Qualification) }).pipe(ns),
).annotate({
  identifier: "GetQualificationScoreResponse",
}) as any as S.Schema<GetQualificationScoreResponse>;
export interface GetQualificationTypeRequest {
  QualificationTypeId: string;
}
export const GetQualificationTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ QualificationTypeId: S.String }).pipe(
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
  identifier: "GetQualificationTypeRequest",
}) as any as S.Schema<GetQualificationTypeRequest>;
export interface GetQualificationTypeResponse {
  QualificationType?: QualificationType;
}
export const GetQualificationTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ QualificationType: S.optional(QualificationType) }).pipe(ns),
).annotate({
  identifier: "GetQualificationTypeResponse",
}) as any as S.Schema<GetQualificationTypeResponse>;
export type PaginationToken = string;
export type ResultSize = number;
export type AssignmentStatusList = AssignmentStatus[];
export const AssignmentStatusList = /*@__PURE__*/ S.Array(AssignmentStatus);
export interface ListAssignmentsForHITRequest {
  HITId: string;
  NextToken?: string;
  MaxResults?: number;
  AssignmentStatuses?: AssignmentStatus[];
}
export const ListAssignmentsForHITRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HITId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    AssignmentStatuses: S.optional(AssignmentStatusList),
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
  identifier: "ListAssignmentsForHITRequest",
}) as any as S.Schema<ListAssignmentsForHITRequest>;
export type AssignmentList = Assignment[];
export const AssignmentList = /*@__PURE__*/ S.Array(Assignment);
export interface ListAssignmentsForHITResponse {
  NextToken?: string;
  NumResults?: number;
  Assignments?: Assignment[];
}
export const ListAssignmentsForHITResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    NumResults: S.optional(S.Number),
    Assignments: S.optional(AssignmentList),
  }).pipe(ns),
).annotate({
  identifier: "ListAssignmentsForHITResponse",
}) as any as S.Schema<ListAssignmentsForHITResponse>;
export interface ListBonusPaymentsRequest {
  HITId?: string;
  AssignmentId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListBonusPaymentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HITId: S.optional(S.String),
    AssignmentId: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
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
  identifier: "ListBonusPaymentsRequest",
}) as any as S.Schema<ListBonusPaymentsRequest>;
export interface BonusPayment {
  WorkerId?: string;
  BonusAmount?: string;
  AssignmentId?: string;
  Reason?: string;
  GrantTime?: Date;
}
export const BonusPayment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkerId: S.optional(S.String),
    BonusAmount: S.optional(S.String),
    AssignmentId: S.optional(S.String),
    Reason: S.optional(S.String),
    GrantTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "BonusPayment" }) as any as S.Schema<BonusPayment>;
export type BonusPaymentList = BonusPayment[];
export const BonusPaymentList = /*@__PURE__*/ S.Array(BonusPayment);
export interface ListBonusPaymentsResponse {
  NumResults?: number;
  NextToken?: string;
  BonusPayments?: BonusPayment[];
}
export const ListBonusPaymentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NumResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    BonusPayments: S.optional(BonusPaymentList),
  }).pipe(ns),
).annotate({
  identifier: "ListBonusPaymentsResponse",
}) as any as S.Schema<ListBonusPaymentsResponse>;
export interface ListHITsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListHITsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
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
  identifier: "ListHITsRequest",
}) as any as S.Schema<ListHITsRequest>;
export type HITList = HIT[];
export const HITList = /*@__PURE__*/ S.Array(HIT);
export interface ListHITsResponse {
  NextToken?: string;
  NumResults?: number;
  HITs?: HIT[];
}
export const ListHITsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    NumResults: S.optional(S.Number),
    HITs: S.optional(HITList),
  }).pipe(ns),
).annotate({
  identifier: "ListHITsResponse",
}) as any as S.Schema<ListHITsResponse>;
export interface ListHITsForQualificationTypeRequest {
  QualificationTypeId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListHITsForQualificationTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QualificationTypeId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
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
  identifier: "ListHITsForQualificationTypeRequest",
}) as any as S.Schema<ListHITsForQualificationTypeRequest>;
export interface ListHITsForQualificationTypeResponse {
  NextToken?: string;
  NumResults?: number;
  HITs?: HIT[];
}
export const ListHITsForQualificationTypeResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String),
      NumResults: S.optional(S.Number),
      HITs: S.optional(HITList),
    }).pipe(ns),
).annotate({
  identifier: "ListHITsForQualificationTypeResponse",
}) as any as S.Schema<ListHITsForQualificationTypeResponse>;
export interface ListQualificationRequestsRequest {
  QualificationTypeId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListQualificationRequestsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QualificationTypeId: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
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
  identifier: "ListQualificationRequestsRequest",
}) as any as S.Schema<ListQualificationRequestsRequest>;
export interface QualificationRequest {
  QualificationRequestId?: string;
  QualificationTypeId?: string;
  WorkerId?: string;
  Test?: string;
  Answer?: string;
  SubmitTime?: Date;
}
export const QualificationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QualificationRequestId: S.optional(S.String),
    QualificationTypeId: S.optional(S.String),
    WorkerId: S.optional(S.String),
    Test: S.optional(S.String),
    Answer: S.optional(S.String),
    SubmitTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "QualificationRequest",
}) as any as S.Schema<QualificationRequest>;
export type QualificationRequestList = QualificationRequest[];
export const QualificationRequestList =
  /*@__PURE__*/ S.Array(QualificationRequest);
export interface ListQualificationRequestsResponse {
  NumResults?: number;
  NextToken?: string;
  QualificationRequests?: QualificationRequest[];
}
export const ListQualificationRequestsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NumResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    QualificationRequests: S.optional(QualificationRequestList),
  }).pipe(ns),
).annotate({
  identifier: "ListQualificationRequestsResponse",
}) as any as S.Schema<ListQualificationRequestsResponse>;
export interface ListQualificationTypesRequest {
  Query?: string;
  MustBeRequestable: boolean;
  MustBeOwnedByCaller?: boolean;
  NextToken?: string;
  MaxResults?: number;
}
export const ListQualificationTypesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Query: S.optional(S.String),
    MustBeRequestable: S.Boolean,
    MustBeOwnedByCaller: S.optional(S.Boolean),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
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
  identifier: "ListQualificationTypesRequest",
}) as any as S.Schema<ListQualificationTypesRequest>;
export type QualificationTypeList = QualificationType[];
export const QualificationTypeList = /*@__PURE__*/ S.Array(QualificationType);
export interface ListQualificationTypesResponse {
  NumResults?: number;
  NextToken?: string;
  QualificationTypes?: QualificationType[];
}
export const ListQualificationTypesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NumResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    QualificationTypes: S.optional(QualificationTypeList),
  }).pipe(ns),
).annotate({
  identifier: "ListQualificationTypesResponse",
}) as any as S.Schema<ListQualificationTypesResponse>;
export type ReviewableHITStatus = "Reviewable" | "Reviewing" | (string & {});
export const ReviewableHITStatus = S.String;

export interface ListReviewableHITsRequest {
  HITTypeId?: string;
  Status?: ReviewableHITStatus;
  NextToken?: string;
  MaxResults?: number;
}
export const ListReviewableHITsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HITTypeId: S.optional(S.String),
    Status: S.optional(ReviewableHITStatus),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
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
  identifier: "ListReviewableHITsRequest",
}) as any as S.Schema<ListReviewableHITsRequest>;
export interface ListReviewableHITsResponse {
  NextToken?: string;
  NumResults?: number;
  HITs?: HIT[];
}
export const ListReviewableHITsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    NumResults: S.optional(S.Number),
    HITs: S.optional(HITList),
  }).pipe(ns),
).annotate({
  identifier: "ListReviewableHITsResponse",
}) as any as S.Schema<ListReviewableHITsResponse>;
export type ReviewPolicyLevel = "Assignment" | "HIT" | (string & {});
export const ReviewPolicyLevel = S.String;

export type ReviewPolicyLevelList = ReviewPolicyLevel[];
export const ReviewPolicyLevelList = /*@__PURE__*/ S.Array(ReviewPolicyLevel);
export interface ListReviewPolicyResultsForHITRequest {
  HITId: string;
  PolicyLevels?: ReviewPolicyLevel[];
  RetrieveActions?: boolean;
  RetrieveResults?: boolean;
  NextToken?: string;
  MaxResults?: number;
}
export const ListReviewPolicyResultsForHITRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      HITId: S.String,
      PolicyLevels: S.optional(ReviewPolicyLevelList),
      RetrieveActions: S.optional(S.Boolean),
      RetrieveResults: S.optional(S.Boolean),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
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
  identifier: "ListReviewPolicyResultsForHITRequest",
}) as any as S.Schema<ListReviewPolicyResultsForHITRequest>;
export interface ReviewResultDetail {
  ActionId?: string;
  SubjectId?: string;
  SubjectType?: string;
  QuestionId?: string;
  Key?: string;
  Value?: string;
}
export const ReviewResultDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionId: S.optional(S.String),
    SubjectId: S.optional(S.String),
    SubjectType: S.optional(S.String),
    QuestionId: S.optional(S.String),
    Key: S.optional(S.String),
    Value: S.optional(S.String),
  }),
).annotate({
  identifier: "ReviewResultDetail",
}) as any as S.Schema<ReviewResultDetail>;
export type ReviewResultDetailList = ReviewResultDetail[];
export const ReviewResultDetailList = /*@__PURE__*/ S.Array(ReviewResultDetail);
export type ReviewActionStatus =
  | "Intended"
  | "Succeeded"
  | "Failed"
  | "Cancelled"
  | (string & {});
export const ReviewActionStatus = S.String;

export interface ReviewActionDetail {
  ActionId?: string;
  ActionName?: string;
  TargetId?: string;
  TargetType?: string;
  Status?: ReviewActionStatus;
  CompleteTime?: Date;
  Result?: string;
  ErrorCode?: string;
}
export const ReviewActionDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionId: S.optional(S.String),
    ActionName: S.optional(S.String),
    TargetId: S.optional(S.String),
    TargetType: S.optional(S.String),
    Status: S.optional(ReviewActionStatus),
    CompleteTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Result: S.optional(S.String),
    ErrorCode: S.optional(S.String),
  }),
).annotate({
  identifier: "ReviewActionDetail",
}) as any as S.Schema<ReviewActionDetail>;
export type ReviewActionDetailList = ReviewActionDetail[];
export const ReviewActionDetailList = /*@__PURE__*/ S.Array(ReviewActionDetail);
export interface ReviewReport {
  ReviewResults?: ReviewResultDetail[];
  ReviewActions?: ReviewActionDetail[];
}
export const ReviewReport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReviewResults: S.optional(ReviewResultDetailList),
    ReviewActions: S.optional(ReviewActionDetailList),
  }),
).annotate({ identifier: "ReviewReport" }) as any as S.Schema<ReviewReport>;
export interface ListReviewPolicyResultsForHITResponse {
  HITId?: string;
  AssignmentReviewPolicy?: ReviewPolicy;
  HITReviewPolicy?: ReviewPolicy;
  AssignmentReviewReport?: ReviewReport;
  HITReviewReport?: ReviewReport;
  NextToken?: string;
}
export const ListReviewPolicyResultsForHITResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      HITId: S.optional(S.String),
      AssignmentReviewPolicy: S.optional(ReviewPolicy),
      HITReviewPolicy: S.optional(ReviewPolicy),
      AssignmentReviewReport: S.optional(ReviewReport),
      HITReviewReport: S.optional(ReviewReport),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListReviewPolicyResultsForHITResponse",
}) as any as S.Schema<ListReviewPolicyResultsForHITResponse>;
export interface ListWorkerBlocksRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListWorkerBlocksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
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
  identifier: "ListWorkerBlocksRequest",
}) as any as S.Schema<ListWorkerBlocksRequest>;
export interface WorkerBlock {
  WorkerId?: string;
  Reason?: string;
}
export const WorkerBlock = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WorkerId: S.optional(S.String), Reason: S.optional(S.String) }),
).annotate({ identifier: "WorkerBlock" }) as any as S.Schema<WorkerBlock>;
export type WorkerBlockList = WorkerBlock[];
export const WorkerBlockList = /*@__PURE__*/ S.Array(WorkerBlock);
export interface ListWorkerBlocksResponse {
  NextToken?: string;
  NumResults?: number;
  WorkerBlocks?: WorkerBlock[];
}
export const ListWorkerBlocksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    NumResults: S.optional(S.Number),
    WorkerBlocks: S.optional(WorkerBlockList),
  }).pipe(ns),
).annotate({
  identifier: "ListWorkerBlocksResponse",
}) as any as S.Schema<ListWorkerBlocksResponse>;
export interface ListWorkersWithQualificationTypeRequest {
  QualificationTypeId: string;
  Status?: QualificationStatus;
  NextToken?: string;
  MaxResults?: number;
}
export const ListWorkersWithQualificationTypeRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      QualificationTypeId: S.String,
      Status: S.optional(QualificationStatus),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
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
  identifier: "ListWorkersWithQualificationTypeRequest",
}) as any as S.Schema<ListWorkersWithQualificationTypeRequest>;
export type QualificationList = Qualification[];
export const QualificationList = /*@__PURE__*/ S.Array(Qualification);
export interface ListWorkersWithQualificationTypeResponse {
  NextToken?: string;
  NumResults?: number;
  Qualifications?: Qualification[];
}
export const ListWorkersWithQualificationTypeResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String),
      NumResults: S.optional(S.Number),
      Qualifications: S.optional(QualificationList),
    }).pipe(ns),
).annotate({
  identifier: "ListWorkersWithQualificationTypeResponse",
}) as any as S.Schema<ListWorkersWithQualificationTypeResponse>;
export type CustomerIdList = string[];
export const CustomerIdList = /*@__PURE__*/ S.Array(S.String);
export interface NotifyWorkersRequest {
  Subject: string;
  MessageText: string;
  WorkerIds: string[];
}
export const NotifyWorkersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Subject: S.String,
    MessageText: S.String,
    WorkerIds: CustomerIdList,
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
  identifier: "NotifyWorkersRequest",
}) as any as S.Schema<NotifyWorkersRequest>;
export type NotifyWorkersFailureCode =
  | "SoftFailure"
  | "HardFailure"
  | (string & {});
export const NotifyWorkersFailureCode = S.String;

export interface NotifyWorkersFailureStatus {
  NotifyWorkersFailureCode?: NotifyWorkersFailureCode;
  NotifyWorkersFailureMessage?: string;
  WorkerId?: string;
}
export const NotifyWorkersFailureStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotifyWorkersFailureCode: S.optional(NotifyWorkersFailureCode),
    NotifyWorkersFailureMessage: S.optional(S.String),
    WorkerId: S.optional(S.String),
  }),
).annotate({
  identifier: "NotifyWorkersFailureStatus",
}) as any as S.Schema<NotifyWorkersFailureStatus>;
export type NotifyWorkersFailureStatusList = NotifyWorkersFailureStatus[];
export const NotifyWorkersFailureStatusList = /*@__PURE__*/ S.Array(
  NotifyWorkersFailureStatus,
);
export interface NotifyWorkersResponse {
  NotifyWorkersFailureStatuses?: NotifyWorkersFailureStatus[];
}
export const NotifyWorkersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotifyWorkersFailureStatuses: S.optional(NotifyWorkersFailureStatusList),
  }).pipe(ns),
).annotate({
  identifier: "NotifyWorkersResponse",
}) as any as S.Schema<NotifyWorkersResponse>;
export interface RejectAssignmentRequest {
  AssignmentId: string;
  RequesterFeedback: string;
}
export const RejectAssignmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AssignmentId: S.String, RequesterFeedback: S.String }).pipe(
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
  identifier: "RejectAssignmentRequest",
}) as any as S.Schema<RejectAssignmentRequest>;
export interface RejectAssignmentResponse {}
export const RejectAssignmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RejectAssignmentResponse",
}) as any as S.Schema<RejectAssignmentResponse>;
export interface RejectQualificationRequestRequest {
  QualificationRequestId: string;
  Reason?: string;
}
export const RejectQualificationRequestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QualificationRequestId: S.String,
    Reason: S.optional(S.String),
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
  identifier: "RejectQualificationRequestRequest",
}) as any as S.Schema<RejectQualificationRequestRequest>;
export interface RejectQualificationRequestResponse {}
export const RejectQualificationRequestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RejectQualificationRequestResponse",
}) as any as S.Schema<RejectQualificationRequestResponse>;
export interface SendBonusRequest {
  WorkerId: string;
  BonusAmount: string;
  AssignmentId: string;
  Reason: string;
  UniqueRequestToken?: string;
}
export const SendBonusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkerId: S.String,
    BonusAmount: S.String,
    AssignmentId: S.String,
    Reason: S.String,
    UniqueRequestToken: S.optional(S.String),
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
  identifier: "SendBonusRequest",
}) as any as S.Schema<SendBonusRequest>;
export interface SendBonusResponse {}
export const SendBonusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "SendBonusResponse",
}) as any as S.Schema<SendBonusResponse>;
export type NotificationTransport = "Email" | "SQS" | "SNS" | (string & {});
export const NotificationTransport = S.String;

export type EventType =
  | "AssignmentAccepted"
  | "AssignmentAbandoned"
  | "AssignmentReturned"
  | "AssignmentSubmitted"
  | "AssignmentRejected"
  | "AssignmentApproved"
  | "HITCreated"
  | "HITExpired"
  | "HITReviewable"
  | "HITExtended"
  | "HITDisposed"
  | "Ping"
  | (string & {});
export const EventType = S.String;

export type EventTypeList = EventType[];
export const EventTypeList = /*@__PURE__*/ S.Array(EventType);
export interface NotificationSpecification {
  Destination: string;
  Transport: NotificationTransport;
  Version: string;
  EventTypes: EventType[];
}
export const NotificationSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destination: S.String,
    Transport: NotificationTransport,
    Version: S.String,
    EventTypes: EventTypeList,
  }),
).annotate({
  identifier: "NotificationSpecification",
}) as any as S.Schema<NotificationSpecification>;
export interface SendTestEventNotificationRequest {
  Notification: NotificationSpecification;
  TestEventType: EventType;
}
export const SendTestEventNotificationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Notification: NotificationSpecification,
    TestEventType: EventType,
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
  identifier: "SendTestEventNotificationRequest",
}) as any as S.Schema<SendTestEventNotificationRequest>;
export interface SendTestEventNotificationResponse {}
export const SendTestEventNotificationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "SendTestEventNotificationResponse",
}) as any as S.Schema<SendTestEventNotificationResponse>;
export interface UpdateExpirationForHITRequest {
  HITId: string;
  ExpireAt: Date;
}
export const UpdateExpirationForHITRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HITId: S.String,
    ExpireAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
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
  identifier: "UpdateExpirationForHITRequest",
}) as any as S.Schema<UpdateExpirationForHITRequest>;
export interface UpdateExpirationForHITResponse {}
export const UpdateExpirationForHITResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateExpirationForHITResponse",
}) as any as S.Schema<UpdateExpirationForHITResponse>;
export interface UpdateHITReviewStatusRequest {
  HITId: string;
  Revert?: boolean;
}
export const UpdateHITReviewStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HITId: S.String, Revert: S.optional(S.Boolean) }).pipe(
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
  identifier: "UpdateHITReviewStatusRequest",
}) as any as S.Schema<UpdateHITReviewStatusRequest>;
export interface UpdateHITReviewStatusResponse {}
export const UpdateHITReviewStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateHITReviewStatusResponse",
}) as any as S.Schema<UpdateHITReviewStatusResponse>;
export interface UpdateHITTypeOfHITRequest {
  HITId: string;
  HITTypeId: string;
}
export const UpdateHITTypeOfHITRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HITId: S.String, HITTypeId: S.String }).pipe(
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
  identifier: "UpdateHITTypeOfHITRequest",
}) as any as S.Schema<UpdateHITTypeOfHITRequest>;
export interface UpdateHITTypeOfHITResponse {}
export const UpdateHITTypeOfHITResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateHITTypeOfHITResponse",
}) as any as S.Schema<UpdateHITTypeOfHITResponse>;
export interface UpdateNotificationSettingsRequest {
  HITTypeId: string;
  Notification?: NotificationSpecification;
  Active?: boolean;
}
export const UpdateNotificationSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HITTypeId: S.String,
    Notification: S.optional(NotificationSpecification),
    Active: S.optional(S.Boolean),
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
  identifier: "UpdateNotificationSettingsRequest",
}) as any as S.Schema<UpdateNotificationSettingsRequest>;
export interface UpdateNotificationSettingsResponse {}
export const UpdateNotificationSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateNotificationSettingsResponse",
}) as any as S.Schema<UpdateNotificationSettingsResponse>;
export interface UpdateQualificationTypeRequest {
  QualificationTypeId: string;
  Description?: string;
  QualificationTypeStatus?: QualificationTypeStatus;
  Test?: string;
  AnswerKey?: string;
  TestDurationInSeconds?: number;
  RetryDelayInSeconds?: number;
  AutoGranted?: boolean;
  AutoGrantedValue?: number;
}
export const UpdateQualificationTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QualificationTypeId: S.String,
    Description: S.optional(S.String),
    QualificationTypeStatus: S.optional(QualificationTypeStatus),
    Test: S.optional(S.String),
    AnswerKey: S.optional(S.String),
    TestDurationInSeconds: S.optional(S.Number),
    RetryDelayInSeconds: S.optional(S.Number),
    AutoGranted: S.optional(S.Boolean),
    AutoGrantedValue: S.optional(S.Number),
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
  identifier: "UpdateQualificationTypeRequest",
}) as any as S.Schema<UpdateQualificationTypeRequest>;
export interface UpdateQualificationTypeResponse {
  QualificationType?: QualificationType;
}
export const UpdateQualificationTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ QualificationType: S.optional(QualificationType) }).pipe(ns),
).annotate({
  identifier: "UpdateQualificationTypeResponse",
}) as any as S.Schema<UpdateQualificationTypeResponse>;
export type ExceptionMessage = string;
export type TurkErrorCode = string;
export type AcceptQualificationRequestError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `AcceptQualificationRequest` operation approves a Worker's request for a Qualification.
 *
 * Only the owner of the Qualification type can grant a Qualification request for that type.
 *
 * A successful request for the `AcceptQualificationRequest` operation
 * returns with no errors and an empty body.
 */
export const acceptQualificationRequest: API.OperationMethod<
  AcceptQualificationRequestRequest,
  AcceptQualificationRequestResponse,
  AcceptQualificationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptQualificationRequestRequest,
  output: AcceptQualificationRequestResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptQualificationRequest",
}));

export type ApproveAssignmentError = RequestError | ServiceFault | CommonErrors;
/**
 * The `ApproveAssignment` operation approves the results of a completed assignment.
 *
 * Approving an assignment initiates two payments from the Requester's Amazon.com account
 *
 * - The Worker who submitted the results is paid the reward specified in the HIT.
 *
 * - Amazon Mechanical Turk fees are debited.
 *
 * If the Requester's account does not have adequate funds for these payments,
 * the call to ApproveAssignment returns an exception, and the approval is not processed.
 * You can include an optional feedback message with the approval,
 * which the Worker can see in the Status section of the web site.
 *
 * You can also call this operation for assignments that were previous rejected
 * and approve them by explicitly overriding the previous rejection.
 * This only works on rejected assignments that were submitted within the previous 30 days
 * and only if the assignment's related HIT has not been deleted.
 */
export const approveAssignment: API.OperationMethod<
  ApproveAssignmentRequest,
  ApproveAssignmentResponse,
  ApproveAssignmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ApproveAssignmentRequest,
  output: ApproveAssignmentResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ApproveAssignment",
}));

export type AssociateQualificationWithWorkerError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `AssociateQualificationWithWorker` operation gives a Worker a
 * Qualification. `AssociateQualificationWithWorker` does not require that the Worker
 * submit a Qualification request. It gives the Qualification directly to the Worker.
 *
 * You can only assign a Qualification of a Qualification type that you created (using
 * the `CreateQualificationType` operation).
 *
 * Note: `AssociateQualificationWithWorker` does not affect any pending Qualification
 * requests for the Qualification by the Worker. If you assign a Qualification to a
 * Worker, then later grant a Qualification request made by the Worker, the granting of
 * the request may modify the Qualification score. To resolve a pending Qualification
 * request without affecting the Qualification the Worker already has, reject the
 * request with the `RejectQualificationRequest` operation.
 */
export const associateQualificationWithWorker: API.OperationMethod<
  AssociateQualificationWithWorkerRequest,
  AssociateQualificationWithWorkerResponse,
  AssociateQualificationWithWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateQualificationWithWorkerRequest,
  output: AssociateQualificationWithWorkerResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateQualificationWithWorker",
}));

export type CreateAdditionalAssignmentsForHITError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The
 * `CreateAdditionalAssignmentsForHIT`
 * operation increases the maximum number of assignments of an existing HIT.
 *
 * To extend the maximum number of assignments, specify the number of additional assignments.
 *
 * - HITs created with fewer than 10 assignments cannot be extended to have 10 or more assignments. Attempting to add assignments in a way that brings the total number of assignments for a HIT from fewer than 10 assignments to 10 or more
 * assignments will result in an
 * `AWS.MechanicalTurk.InvalidMaximumAssignmentsIncrease`
 * exception.
 *
 * - HITs that were created before July 22, 2015 cannot be extended. Attempting to extend HITs that were created before July 22, 2015 will result in an
 * `AWS.MechanicalTurk.HITTooOldForExtension`
 * exception.
 */
export const createAdditionalAssignmentsForHIT: API.OperationMethod<
  CreateAdditionalAssignmentsForHITRequest,
  CreateAdditionalAssignmentsForHITResponse,
  CreateAdditionalAssignmentsForHITError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAdditionalAssignmentsForHITRequest,
  output: CreateAdditionalAssignmentsForHITResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAdditionalAssignmentsForHIT",
}));

export type CreateHITError = RequestError | ServiceFault | CommonErrors;
/**
 * The `CreateHIT` operation creates a new Human Intelligence Task (HIT).
 * The new HIT is made available for Workers to find and accept on the Amazon Mechanical
 * Turk website.
 *
 * This operation allows you to specify a new HIT by passing in values for the properties of the HIT, such as its title, reward amount and number of assignments. When you pass these values to `CreateHIT`, a new HIT is created for you, with a new `HITTypeID`. The HITTypeID can be used to create additional HITs in the future without needing to specify common parameters such as the title, description and reward amount each time.
 *
 * An alternative way to create HITs is to first generate a HITTypeID using the `CreateHITType` operation and then call the `CreateHITWithHITType` operation. This is the recommended best practice for Requesters who are creating large numbers of HITs.
 *
 * CreateHIT also supports several ways to provide question data: by providing a value
 * for the `Question` parameter that fully specifies the contents of the HIT, or by providing
 * a `HitLayoutId` and associated `HitLayoutParameters`.
 *
 * If a HIT is created with 10 or more maximum assignments, there is an additional fee. For more information, see
 * Amazon Mechanical Turk Pricing.
 */
export const createHIT: API.OperationMethod<
  CreateHITRequest,
  CreateHITResponse,
  CreateHITError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateHITRequest,
  output: CreateHITResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHIT",
}));

export type CreateHITTypeError = RequestError | ServiceFault | CommonErrors;
/**
 * The `CreateHITType` operation creates a new HIT type. This operation
 * allows you to define a standard set of HIT properties to use when creating HITs.
 * If you register a HIT type with values that match an existing HIT type, the HIT type
 * ID of the existing type will be returned.
 */
export const createHITType: API.OperationMethod<
  CreateHITTypeRequest,
  CreateHITTypeResponse,
  CreateHITTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateHITTypeRequest,
  output: CreateHITTypeResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHITType",
}));

export type CreateHITWithHITTypeError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `CreateHITWithHITType` operation creates a new Human Intelligence Task (HIT)
 * using an existing HITTypeID generated by the `CreateHITType` operation.
 *
 * This is an alternative way to create HITs from the `CreateHIT` operation.
 * This is the recommended best practice for Requesters who are creating large numbers of HITs.
 *
 * CreateHITWithHITType also supports several ways to provide question data:
 * by providing a value for the `Question` parameter that fully specifies the contents of the HIT,
 * or by providing a `HitLayoutId` and associated `HitLayoutParameters`.
 *
 * If a HIT is created with 10 or more maximum assignments, there is an additional fee.
 * For more information, see Amazon Mechanical Turk Pricing.
 */
export const createHITWithHITType: API.OperationMethod<
  CreateHITWithHITTypeRequest,
  CreateHITWithHITTypeResponse,
  CreateHITWithHITTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateHITWithHITTypeRequest,
  output: CreateHITWithHITTypeResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateHITWithHITType",
}));

export type CreateQualificationTypeError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The
 * `CreateQualificationType`
 * operation creates a new Qualification type, which is represented by a
 * `QualificationType`
 * data structure.
 */
export const createQualificationType: API.OperationMethod<
  CreateQualificationTypeRequest,
  CreateQualificationTypeResponse,
  CreateQualificationTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateQualificationTypeRequest,
  output: CreateQualificationTypeResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQualificationType",
}));

export type CreateWorkerBlockError = RequestError | ServiceFault | CommonErrors;
/**
 * The `CreateWorkerBlock` operation allows you to prevent a Worker from working on your HITs. For example, you can block a Worker who is producing poor quality work. You can block up to 100,000 Workers.
 */
export const createWorkerBlock: API.OperationMethod<
  CreateWorkerBlockRequest,
  CreateWorkerBlockResponse,
  CreateWorkerBlockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWorkerBlockRequest,
  output: CreateWorkerBlockResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkerBlock",
}));

export type DeleteHITError = RequestError | ServiceFault | CommonErrors;
/**
 * The `DeleteHIT` operation is used to delete HIT that is no longer needed.
 * Only the Requester who created the HIT can delete it.
 *
 * You can only dispose of HITs that are in the `Reviewable` state,
 * with all of their submitted assignments already either approved or rejected.
 * If you call the DeleteHIT operation on a HIT that is not in the `Reviewable` state
 * (for example, that has not expired, or still has active assignments),
 * or on a HIT that is Reviewable but without all of its submitted assignments
 * already approved or rejected, the service will return an error.
 *
 * - HITs are automatically disposed of after 120 days.
 *
 * - After you dispose of a HIT, you can no longer approve the HIT's rejected assignments.
 *
 * - Disposed HITs are not returned in results for the ListHITs operation.
 *
 * - Disposing HITs can improve the performance of operations such as ListReviewableHITs and ListHITs.
 */
export const deleteHIT: API.OperationMethod<
  DeleteHITRequest,
  DeleteHITResponse,
  DeleteHITError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteHITRequest,
  output: DeleteHITResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteHIT",
}));

export type DeleteQualificationTypeError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The
 * `DeleteQualificationType`
 * deletes a Qualification type and deletes any HIT types that are
 * associated with the Qualification type.
 *
 * This operation does not revoke Qualifications already assigned
 * to Workers because the Qualifications might be needed for active HITs.
 * If there are any pending requests for the Qualification type, Amazon
 * Mechanical Turk rejects those requests. After you delete a
 * Qualification type, you can no longer use it to create HITs or HIT
 * types.
 *
 * DeleteQualificationType must wait for all the HITs that use
 * the deleted Qualification type to be deleted before completing. It
 * may take up to 48 hours before DeleteQualificationType completes and
 * the unique name of the Qualification type is available for reuse with
 * CreateQualificationType.
 */
export const deleteQualificationType: API.OperationMethod<
  DeleteQualificationTypeRequest,
  DeleteQualificationTypeResponse,
  DeleteQualificationTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteQualificationTypeRequest,
  output: DeleteQualificationTypeResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQualificationType",
}));

export type DeleteWorkerBlockError = RequestError | ServiceFault | CommonErrors;
/**
 * The `DeleteWorkerBlock` operation allows you to reinstate a blocked Worker to work on your HITs. This operation reverses the effects of the CreateWorkerBlock operation. You need the Worker ID to use this operation. If the Worker ID is missing or invalid, this operation fails and returns the message “WorkerId is invalid.” If the specified Worker is not blocked, this operation returns successfully.
 */
export const deleteWorkerBlock: API.OperationMethod<
  DeleteWorkerBlockRequest,
  DeleteWorkerBlockResponse,
  DeleteWorkerBlockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWorkerBlockRequest,
  output: DeleteWorkerBlockResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkerBlock",
}));

export type DisassociateQualificationFromWorkerError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `DisassociateQualificationFromWorker`
 * revokes a previously granted Qualification from a user.
 *
 * You can provide a text message explaining why the Qualification was
 * revoked. The user who had the Qualification can see this message.
 */
export const disassociateQualificationFromWorker: API.OperationMethod<
  DisassociateQualificationFromWorkerRequest,
  DisassociateQualificationFromWorkerResponse,
  DisassociateQualificationFromWorkerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateQualificationFromWorkerRequest,
  output: DisassociateQualificationFromWorkerResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateQualificationFromWorker",
}));

export type GetAccountBalanceError = RequestError | ServiceFault | CommonErrors;
/**
 * The `GetAccountBalance` operation retrieves the Prepaid HITs balance in your Amazon Mechanical Turk account if you are a Prepaid Requester.
 * Alternatively, this operation will retrieve the remaining available AWS Billing usage if you have enabled AWS Billing.
 * Note: If you have enabled AWS Billing and still have a remaining Prepaid HITs balance, this balance can be viewed on the My Account page in the Requester console.
 */
export const getAccountBalance: API.OperationMethod<
  GetAccountBalanceRequest,
  GetAccountBalanceResponse,
  GetAccountBalanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountBalanceRequest,
  output: GetAccountBalanceResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountBalance",
}));

export type GetAssignmentError = RequestError | ServiceFault | CommonErrors;
/**
 * The `GetAssignment` operation retrieves the details of the specified Assignment.
 */
export const getAssignment: API.OperationMethod<
  GetAssignmentRequest,
  GetAssignmentResponse,
  GetAssignmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAssignmentRequest,
  output: GetAssignmentResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssignment",
}));

export type GetFileUploadURLError = RequestError | ServiceFault | CommonErrors;
/**
 * The
 * `GetFileUploadURL`
 * operation generates and returns a temporary URL. You use the
 * temporary URL to retrieve a file uploaded by a Worker as an answer to
 * a FileUploadAnswer question for a HIT. The temporary URL is generated
 * the instant the GetFileUploadURL operation is called, and is valid
 * for 60 seconds. You can get a temporary file upload URL any time
 * until the HIT is disposed. After the HIT is disposed, any uploaded
 * files are deleted, and cannot be retrieved.
 *
 * Pending Deprecation on December 12, 2017. The Answer Specification
 * structure will no longer support the `FileUploadAnswer`
 * element to be used for the QuestionForm data structure.
 * Instead, we recommend that Requesters who want to create HITs asking
 * Workers to upload files to use Amazon S3.
 */
export const getFileUploadURL: API.OperationMethod<
  GetFileUploadURLRequest,
  GetFileUploadURLResponse,
  GetFileUploadURLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFileUploadURLRequest,
  output: GetFileUploadURLResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFileUploadURL",
}));

export type GetHITError = RequestError | ServiceFault | CommonErrors;
/**
 * The `GetHIT` operation retrieves the details of the specified HIT.
 */
export const getHIT: API.OperationMethod<
  GetHITRequest,
  GetHITResponse,
  GetHITError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetHITRequest,
  output: GetHITResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHIT",
}));

export type GetQualificationScoreError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The
 * `GetQualificationScore`
 * operation returns the value of a Worker's Qualification for a given
 * Qualification type.
 *
 * To get a Worker's Qualification, you must know the Worker's ID. The
 * Worker's ID is included in the assignment data returned by the
 * `ListAssignmentsForHIT`
 * operation.
 *
 * Only the owner of a Qualification type can query the value of
 * a Worker's Qualification of that type.
 */
export const getQualificationScore: API.OperationMethod<
  GetQualificationScoreRequest,
  GetQualificationScoreResponse,
  GetQualificationScoreError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQualificationScoreRequest,
  output: GetQualificationScoreResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQualificationScore",
}));

export type GetQualificationTypeError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `GetQualificationType`operation retrieves information about a Qualification type using its ID.
 */
export const getQualificationType: API.OperationMethod<
  GetQualificationTypeRequest,
  GetQualificationTypeResponse,
  GetQualificationTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQualificationTypeRequest,
  output: GetQualificationTypeResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQualificationType",
}));

export type ListAssignmentsForHITError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The
 * `ListAssignmentsForHIT`
 * operation retrieves completed assignments for a HIT. You can use this
 * operation to retrieve the results for a HIT.
 *
 * You can get assignments for a HIT at any time, even if the
 * HIT is not yet Reviewable. If a HIT requested multiple assignments,
 * and has received some results but has not yet become Reviewable, you
 * can still retrieve the partial results with this operation.
 *
 * Use the AssignmentStatus parameter to control which set of
 * assignments for a HIT are returned. The ListAssignmentsForHIT
 * operation
 * can return submitted assignments awaiting approval, or it can return
 * assignments that have already been approved or rejected. You can set
 * AssignmentStatus=Approved,Rejected to get assignments that have
 * already been approved and rejected together in one result set.
 *
 * Only the Requester who created the HIT can retrieve the
 * assignments for that HIT.
 *
 * Results are sorted and divided into numbered pages and the
 * operation returns a single page of results. You can use the
 * parameters
 * of the operation to control sorting and pagination.
 */
export const listAssignmentsForHIT: API.PaginatedOperationMethod<
  ListAssignmentsForHITRequest,
  ListAssignmentsForHITResponse,
  ListAssignmentsForHITError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssignmentsForHITRequest,
  output: ListAssignmentsForHITResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssignmentsForHIT",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBonusPaymentsError = RequestError | ServiceFault | CommonErrors;
/**
 * The
 * `ListBonusPayments`
 * operation retrieves the amounts of bonuses you have paid to Workers
 * for a given HIT or assignment.
 */
export const listBonusPayments: API.PaginatedOperationMethod<
  ListBonusPaymentsRequest,
  ListBonusPaymentsResponse,
  ListBonusPaymentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBonusPaymentsRequest,
  output: ListBonusPaymentsResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBonusPayments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHITsError = RequestError | ServiceFault | CommonErrors;
/**
 * The
 * `ListHITs`
 * operation returns all of a Requester's HITs. The operation returns
 * HITs of any status, except for HITs that have been deleted of with
 * the DeleteHIT operation or that have been auto-deleted.
 */
export const listHITs: API.PaginatedOperationMethod<
  ListHITsRequest,
  ListHITsResponse,
  ListHITsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListHITsRequest,
  output: ListHITsResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHITs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHITsForQualificationTypeError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `ListHITsForQualificationType` operation returns the HITs that use
 * the given Qualification type for a Qualification requirement.
 * The operation returns HITs of any status, except for HITs that have been deleted
 * with the `DeleteHIT` operation or that have been auto-deleted.
 */
export const listHITsForQualificationType: API.PaginatedOperationMethod<
  ListHITsForQualificationTypeRequest,
  ListHITsForQualificationTypeResponse,
  ListHITsForQualificationTypeError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListHITsForQualificationTypeRequest,
  output: ListHITsForQualificationTypeResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHITsForQualificationType",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListQualificationRequestsError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The
 * `ListQualificationRequests`
 * operation retrieves requests for Qualifications of a particular
 * Qualification type. The owner of the Qualification type calls this
 * operation to poll for pending requests, and accepts them using the
 * AcceptQualification operation.
 */
export const listQualificationRequests: API.PaginatedOperationMethod<
  ListQualificationRequestsRequest,
  ListQualificationRequestsResponse,
  ListQualificationRequestsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListQualificationRequestsRequest,
  output: ListQualificationRequestsResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQualificationRequests",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListQualificationTypesError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The
 * `ListQualificationTypes`
 * operation returns a list of Qualification types, filtered by
 * an optional search term.
 */
export const listQualificationTypes: API.PaginatedOperationMethod<
  ListQualificationTypesRequest,
  ListQualificationTypesResponse,
  ListQualificationTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListQualificationTypesRequest,
  output: ListQualificationTypesResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQualificationTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListReviewableHITsError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `ListReviewableHITs` operation retrieves the HITs with Status equal to
 * Reviewable or Status equal to Reviewing that belong to the Requester calling the operation.
 */
export const listReviewableHITs: API.PaginatedOperationMethod<
  ListReviewableHITsRequest,
  ListReviewableHITsResponse,
  ListReviewableHITsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReviewableHITsRequest,
  output: ListReviewableHITsResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReviewableHITs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListReviewPolicyResultsForHITError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `ListReviewPolicyResultsForHIT` operation retrieves the computed results
 * and the actions taken in the course of executing your Review Policies for a given HIT.
 * For information about how to specify Review Policies when you call CreateHIT,
 * see Review Policies. The ListReviewPolicyResultsForHIT operation can return results for both
 * Assignment-level and HIT-level review results.
 */
export const listReviewPolicyResultsForHIT: API.PaginatedOperationMethod<
  ListReviewPolicyResultsForHITRequest,
  ListReviewPolicyResultsForHITResponse,
  ListReviewPolicyResultsForHITError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReviewPolicyResultsForHITRequest,
  output: ListReviewPolicyResultsForHITResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReviewPolicyResultsForHIT",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkerBlocksError = RequestError | ServiceFault | CommonErrors;
/**
 * The `ListWorkersBlocks` operation retrieves a list of Workers who are blocked from working on your HITs.
 */
export const listWorkerBlocks: API.PaginatedOperationMethod<
  ListWorkerBlocksRequest,
  ListWorkerBlocksResponse,
  ListWorkerBlocksError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkerBlocksRequest,
  output: ListWorkerBlocksResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkerBlocks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkersWithQualificationTypeError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `ListWorkersWithQualificationType` operation returns all of the Workers
 * that have been associated with a given Qualification type.
 */
export const listWorkersWithQualificationType: API.PaginatedOperationMethod<
  ListWorkersWithQualificationTypeRequest,
  ListWorkersWithQualificationTypeResponse,
  ListWorkersWithQualificationTypeError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkersWithQualificationTypeRequest,
  output: ListWorkersWithQualificationTypeResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkersWithQualificationType",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type NotifyWorkersError = RequestError | ServiceFault | CommonErrors;
/**
 * The
 * `NotifyWorkers`
 * operation sends an email to one or more Workers that you specify with
 * the Worker ID. You can specify up to 100 Worker IDs to send the same
 * message with a single call to the NotifyWorkers operation. The
 * NotifyWorkers operation will send a notification email to a Worker
 * only if you have previously approved or rejected work from the
 * Worker.
 */
export const notifyWorkers: API.OperationMethod<
  NotifyWorkersRequest,
  NotifyWorkersResponse,
  NotifyWorkersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: NotifyWorkersRequest,
  output: NotifyWorkersResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyWorkers",
}));

export type RejectAssignmentError = RequestError | ServiceFault | CommonErrors;
/**
 * The `RejectAssignment` operation rejects the results of a completed assignment.
 *
 * You can include an optional feedback message with the rejection,
 * which the Worker can see in the Status section of the web site.
 * When you include a feedback message with the rejection,
 * it helps the Worker understand why the assignment was rejected,
 * and can improve the quality of the results the Worker submits in the future.
 *
 * Only the Requester who created the HIT can reject an assignment for the HIT.
 */
export const rejectAssignment: API.OperationMethod<
  RejectAssignmentRequest,
  RejectAssignmentResponse,
  RejectAssignmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectAssignmentRequest,
  output: RejectAssignmentResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectAssignment",
}));

export type RejectQualificationRequestError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The
 * `RejectQualificationRequest`
 * operation rejects a user's request for a Qualification.
 *
 * You can provide a text message explaining why the request was
 * rejected. The Worker who made the request can see this message.
 */
export const rejectQualificationRequest: API.OperationMethod<
  RejectQualificationRequestRequest,
  RejectQualificationRequestResponse,
  RejectQualificationRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectQualificationRequestRequest,
  output: RejectQualificationRequestResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectQualificationRequest",
}));

export type SendBonusError = RequestError | ServiceFault | CommonErrors;
/**
 * The
 * `SendBonus`
 * operation issues a payment of money from your account to a Worker.
 * This payment happens separately from the reward you pay to the Worker
 * when you approve the Worker's assignment. The SendBonus operation
 * requires the Worker's ID and the assignment ID as parameters to
 * initiate payment of the bonus. You must include a message that
 * explains the reason for the bonus payment, as the Worker may not be
 * expecting the payment. Amazon Mechanical Turk collects a fee for
 * bonus payments, similar to the HIT listing fee. This operation fails
 * if your account does not have enough funds to pay for both the bonus
 * and the fees.
 */
export const sendBonus: API.OperationMethod<
  SendBonusRequest,
  SendBonusResponse,
  SendBonusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendBonusRequest,
  output: SendBonusResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendBonus",
}));

export type SendTestEventNotificationError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `SendTestEventNotification` operation causes Amazon Mechanical Turk to send
 * a notification message as if a HIT event occurred, according to the provided
 * notification specification. This allows you to test notifications without
 * setting up notifications for a real HIT type and trying to trigger them using the website.
 * When you call this operation, the service attempts to send the test notification immediately.
 */
export const sendTestEventNotification: API.OperationMethod<
  SendTestEventNotificationRequest,
  SendTestEventNotificationResponse,
  SendTestEventNotificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendTestEventNotificationRequest,
  output: SendTestEventNotificationResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendTestEventNotification",
}));

export type UpdateExpirationForHITError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `UpdateExpirationForHIT` operation allows you update the expiration time of a HIT.
 * If you update it to a time in the past, the HIT will be immediately expired.
 */
export const updateExpirationForHIT: API.OperationMethod<
  UpdateExpirationForHITRequest,
  UpdateExpirationForHITResponse,
  UpdateExpirationForHITError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateExpirationForHITRequest,
  output: UpdateExpirationForHITResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExpirationForHIT",
}));

export type UpdateHITReviewStatusError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `UpdateHITReviewStatus` operation updates the status of a HIT.
 * If the status is Reviewable, this operation can update the status to Reviewing,
 * or it can revert a Reviewing HIT back to the Reviewable status.
 */
export const updateHITReviewStatus: API.OperationMethod<
  UpdateHITReviewStatusRequest,
  UpdateHITReviewStatusResponse,
  UpdateHITReviewStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateHITReviewStatusRequest,
  output: UpdateHITReviewStatusResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHITReviewStatus",
}));

export type UpdateHITTypeOfHITError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The
 * `UpdateHITTypeOfHIT`
 * operation allows you to change the HITType properties of a HIT. This
 * operation disassociates the HIT from its old HITType properties and
 * associates it with the new HITType properties. The HIT takes on the
 * properties of the new HITType in place of the old ones.
 */
export const updateHITTypeOfHIT: API.OperationMethod<
  UpdateHITTypeOfHITRequest,
  UpdateHITTypeOfHITResponse,
  UpdateHITTypeOfHITError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateHITTypeOfHITRequest,
  output: UpdateHITTypeOfHITResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateHITTypeOfHIT",
}));

export type UpdateNotificationSettingsError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The `UpdateNotificationSettings` operation creates, updates,
 * disables or re-enables notifications for a HIT type.
 * If you call the UpdateNotificationSettings operation for a HIT type that already has a
 * notification specification, the operation replaces the old specification with a new one.
 * You can call the UpdateNotificationSettings operation to enable or disable notifications
 * for the HIT type, without having to modify the notification specification itself by providing
 * updates to the Active status without specifying a new notification specification.
 * To change the Active status of a HIT type's notifications,
 * the HIT type must already have a notification specification,
 * or one must be provided in the same call to `UpdateNotificationSettings`.
 */
export const updateNotificationSettings: API.OperationMethod<
  UpdateNotificationSettingsRequest,
  UpdateNotificationSettingsResponse,
  UpdateNotificationSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNotificationSettingsRequest,
  output: UpdateNotificationSettingsResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNotificationSettings",
}));

export type UpdateQualificationTypeError =
  | RequestError
  | ServiceFault
  | CommonErrors;
/**
 * The
 * `UpdateQualificationType`
 * operation modifies the attributes of an existing Qualification type,
 * which is represented by a QualificationType data structure. Only the
 * owner of a Qualification type can modify its attributes.
 *
 * Most attributes of a Qualification type can be changed after
 * the type has been created. However, the Name and Keywords fields
 * cannot be modified. The RetryDelayInSeconds parameter can be modified
 * or added to change the delay or to enable retries, but
 * RetryDelayInSeconds cannot be used to disable retries.
 *
 * You can use this operation to update the test for a
 * Qualification type. The test is updated based on the values specified
 * for the Test, TestDurationInSeconds and AnswerKey parameters. All
 * three parameters specify the updated test. If you are updating the
 * test for a type, you must specify the Test and TestDurationInSeconds
 * parameters. The AnswerKey parameter is optional; omitting it specifies
 * that the updated test does not have an answer key.
 *
 * If you omit the Test parameter, the test for the
 * Qualification type is unchanged. There is no way to remove a test from
 * a Qualification type that has one. If the type already has a test, you
 * cannot update it to be AutoGranted. If the Qualification type does not
 * have a test and one is provided by an update, the type will henceforth
 * have a test.
 *
 * If you want to update the test duration or answer key for an
 * existing test without changing the questions, you must specify a Test
 * parameter with the original questions, along with the updated values.
 *
 * If you provide an updated Test but no AnswerKey, the new test
 * will not have an answer key. Requests for such Qualifications must be
 * granted manually.
 *
 * You can also update the AutoGranted and AutoGrantedValue
 * attributes of the Qualification type.
 */
export const updateQualificationType: API.OperationMethod<
  UpdateQualificationTypeRequest,
  UpdateQualificationTypeResponse,
  UpdateQualificationTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateQualificationTypeRequest,
  output: UpdateQualificationTypeResponse,
  errors: [RequestError, ServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQualificationType",
}));
