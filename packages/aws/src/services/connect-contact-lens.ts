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
  sdkId: "Connect Contact Lens",
  serviceShapeName: "AmazonConnectContactLens",
});
const auth = T.AwsAuthSigv4({ name: "connect" });
const ver = T.ServiceVersion("2020-08-21");
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
              `https://contact-lens-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://contact-lens-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://contact-lens.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://contact-lens.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class InternalServiceException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceException>()(
    "InternalServiceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type InstanceId = string;
export type ContactId = string;
export type MaxResults = number;
export type NextToken = string;
export interface ListRealtimeContactAnalysisSegmentsRequest {
  InstanceId?: string;
  ContactId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListRealtimeContactAnalysisSegmentsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      InstanceId: S.optional(S.String),
      ContactId: S.optional(S.String),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/realtime-contact-analysis/analysis-segments",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListRealtimeContactAnalysisSegmentsRequest",
  }) as any as S.Schema<ListRealtimeContactAnalysisSegmentsRequest>;
export type TranscriptId = string;
export type ParticipantId = string;
export type ParticipantRole = string;
export type TranscriptContent = string;
export type OffsetMillis = number;
export type SentimentValue =
  | "POSITIVE"
  | "NEUTRAL"
  | "NEGATIVE"
  | (string & {});
export const SentimentValue = S.String;

export type CharacterOffset = number;
export interface CharacterOffsets {
  BeginOffsetChar?: number;
  EndOffsetChar?: number;
}
export const CharacterOffsets = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BeginOffsetChar: S.optional(S.Number),
    EndOffsetChar: S.optional(S.Number),
  }),
).annotate({
  identifier: "CharacterOffsets",
}) as any as S.Schema<CharacterOffsets>;
export interface IssueDetected {
  CharacterOffsets?: CharacterOffsets;
}
export const IssueDetected = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CharacterOffsets: S.optional(CharacterOffsets) }),
).annotate({ identifier: "IssueDetected" }) as any as S.Schema<IssueDetected>;
export type IssuesDetected = IssueDetected[];
export const IssuesDetected = /*@__PURE__*/ S.Array(IssueDetected);
export interface Transcript {
  Id?: string;
  ParticipantId?: string;
  ParticipantRole?: string;
  Content?: string;
  BeginOffsetMillis?: number;
  EndOffsetMillis?: number;
  Sentiment?: SentimentValue;
  IssuesDetected?: IssueDetected[];
}
export const Transcript = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ParticipantId: S.optional(S.String),
    ParticipantRole: S.optional(S.String),
    Content: S.optional(S.String),
    BeginOffsetMillis: S.optional(S.Number),
    EndOffsetMillis: S.optional(S.Number),
    Sentiment: S.optional(SentimentValue),
    IssuesDetected: S.optional(IssuesDetected),
  }),
).annotate({ identifier: "Transcript" }) as any as S.Schema<Transcript>;
export type CategoryName = string;
export type MatchedCategories = string[];
export const MatchedCategories = /*@__PURE__*/ S.Array(S.String);
export interface PointOfInterest {
  BeginOffsetMillis?: number;
  EndOffsetMillis?: number;
}
export const PointOfInterest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BeginOffsetMillis: S.optional(S.Number),
    EndOffsetMillis: S.optional(S.Number),
  }),
).annotate({
  identifier: "PointOfInterest",
}) as any as S.Schema<PointOfInterest>;
export type PointsOfInterest = PointOfInterest[];
export const PointsOfInterest = /*@__PURE__*/ S.Array(PointOfInterest);
export interface CategoryDetails {
  PointsOfInterest?: PointOfInterest[];
}
export const CategoryDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PointsOfInterest: S.optional(PointsOfInterest) }),
).annotate({
  identifier: "CategoryDetails",
}) as any as S.Schema<CategoryDetails>;
export type MatchedDetails = { [key: string]: CategoryDetails | undefined };
export const MatchedDetails = /*@__PURE__*/ S.Record(
  S.String,
  CategoryDetails.pipe(S.optional),
);
export interface Categories {
  MatchedCategories?: string[];
  MatchedDetails?: { [key: string]: CategoryDetails | undefined };
}
export const Categories = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MatchedCategories: S.optional(MatchedCategories),
    MatchedDetails: S.optional(MatchedDetails),
  }),
).annotate({ identifier: "Categories" }) as any as S.Schema<Categories>;
export type PostContactSummaryContent = string;
export type PostContactSummaryStatus = "FAILED" | "COMPLETED" | (string & {});
export const PostContactSummaryStatus = S.String;

export type PostContactSummaryFailureCode =
  | "QUOTA_EXCEEDED"
  | "INSUFFICIENT_CONVERSATION_CONTENT"
  | "FAILED_SAFETY_GUIDELINES"
  | "INVALID_ANALYSIS_CONFIGURATION"
  | "INTERNAL_ERROR"
  | (string & {});
export const PostContactSummaryFailureCode = S.String;

export interface PostContactSummary {
  Content?: string;
  Status?: PostContactSummaryStatus;
  FailureCode?: PostContactSummaryFailureCode;
}
export const PostContactSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Content: S.optional(S.String),
    Status: S.optional(PostContactSummaryStatus),
    FailureCode: S.optional(PostContactSummaryFailureCode),
  }),
).annotate({
  identifier: "PostContactSummary",
}) as any as S.Schema<PostContactSummary>;
export type ExtractionDefinitionId = string;
export type ExtractionDefinitionName = string;
export type ExtractionDefinitionDisplayLabel = string;
export type ExtractedInformationContent = string;
export interface ExtractedInformationValue {
  Content?: string;
  PointsOfInterest?: PointOfInterest[];
}
export const ExtractedInformationValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Content: S.optional(S.String),
    PointsOfInterest: S.optional(PointsOfInterest),
  }),
).annotate({
  identifier: "ExtractedInformationValue",
}) as any as S.Schema<ExtractedInformationValue>;
export type ExtractedInformationValues = ExtractedInformationValue[];
export const ExtractedInformationValues = /*@__PURE__*/ S.Array(
  ExtractedInformationValue,
);
export type ExtractedInformationFailureCode =
  | "QUOTA_EXCEEDED"
  | "INSUFFICIENT_CONVERSATION_CONTENT"
  | "FAILED_SAFETY_GUIDELINES"
  | "INTERNAL_ERROR"
  | "MAX_PACKAGE_FEATURE_ONLY"
  | (string & {});
export const ExtractedInformationFailureCode = S.String;

export interface ExtractedInformation {
  ExtractionDefinitionId?: string;
  ExtractionDefinitionName?: string;
  ExtractionDefinitionDisplayLabel?: string;
  ExtractedValues?: ExtractedInformationValue[];
  FailureCode?: ExtractedInformationFailureCode;
}
export const ExtractedInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExtractionDefinitionId: S.optional(S.String),
    ExtractionDefinitionName: S.optional(S.String),
    ExtractionDefinitionDisplayLabel: S.optional(S.String),
    ExtractedValues: S.optional(ExtractedInformationValues),
    FailureCode: S.optional(ExtractedInformationFailureCode),
  }),
).annotate({
  identifier: "ExtractedInformation",
}) as any as S.Schema<ExtractedInformation>;
export interface RealtimeContactAnalysisSegment {
  Transcript?: Transcript;
  Categories?: Categories;
  PostContactSummary?: PostContactSummary;
  ExtractedInformation?: ExtractedInformation;
}
export const RealtimeContactAnalysisSegment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Transcript: S.optional(Transcript),
    Categories: S.optional(Categories),
    PostContactSummary: S.optional(PostContactSummary),
    ExtractedInformation: S.optional(ExtractedInformation),
  }),
).annotate({
  identifier: "RealtimeContactAnalysisSegment",
}) as any as S.Schema<RealtimeContactAnalysisSegment>;
export type RealtimeContactAnalysisSegments = RealtimeContactAnalysisSegment[];
export const RealtimeContactAnalysisSegments = /*@__PURE__*/ S.Array(
  RealtimeContactAnalysisSegment,
);
export interface ListRealtimeContactAnalysisSegmentsResponse {
  Segments: (RealtimeContactAnalysisSegment & {
    Transcript: Transcript & {
      Id: TranscriptId;
      ParticipantId: ParticipantId;
      ParticipantRole: ParticipantRole;
      Content: TranscriptContent;
      BeginOffsetMillis: OffsetMillis;
      EndOffsetMillis: OffsetMillis;
      IssuesDetected: (IssueDetected & {
        CharacterOffsets: CharacterOffsets & {
          BeginOffsetChar: CharacterOffset;
          EndOffsetChar: CharacterOffset;
        };
      })[];
    };
    Categories: Categories & {
      MatchedCategories: MatchedCategories;
      MatchedDetails: {
        [key: string]:
          | (CategoryDetails & {
              PointsOfInterest: (PointOfInterest & {
                BeginOffsetMillis: OffsetMillis;
                EndOffsetMillis: OffsetMillis;
              })[];
            })
          | undefined;
      };
    };
    PostContactSummary: PostContactSummary & {
      Status: PostContactSummaryStatus;
    };
    ExtractedInformation: ExtractedInformation & {
      ExtractionDefinitionId: ExtractionDefinitionId;
      ExtractionDefinitionName: ExtractionDefinitionName;
      ExtractedValues: (ExtractedInformationValue & {
        Content: ExtractedInformationContent;
        PointsOfInterest: (PointOfInterest & {
          BeginOffsetMillis: OffsetMillis;
          EndOffsetMillis: OffsetMillis;
        })[];
      })[];
    };
  })[];
  NextToken?: string;
}
export const ListRealtimeContactAnalysisSegmentsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Segments: S.optional(RealtimeContactAnalysisSegments),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListRealtimeContactAnalysisSegmentsResponse",
  }) as any as S.Schema<ListRealtimeContactAnalysisSegmentsResponse>;
export type Message = string;
export type ListRealtimeContactAnalysisSegmentsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides a list of analysis segments for a real-time analysis session for
 * voice.
 *
 * Voice data is retained for 24 hours. You must invoke this API during that
 * time.
 */
export const listRealtimeContactAnalysisSegments: API.PaginatedOperationMethod<
  ListRealtimeContactAnalysisSegmentsRequest,
  ListRealtimeContactAnalysisSegmentsResponse,
  ListRealtimeContactAnalysisSegmentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRealtimeContactAnalysisSegmentsRequest,
  output: ListRealtimeContactAnalysisSegmentsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRealtimeContactAnalysisSegments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;
