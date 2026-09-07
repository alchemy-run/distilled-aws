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
  sdkId: "SSM Contacts",
  serviceShapeName: "SSMContacts",
});
const auth = T.AwsAuthSigv4({ name: "ssm-contacts" });
const ver = T.ServiceVersion("2021-05-03");
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
              `https://ssm-contacts-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://ssm-contacts-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://ssm-contacts.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://ssm-contacts.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      ResourceId: S.String,
      ResourceType: S.String,
      DependentEntities: S.optional(
        S.suspend(() => DependentEntityList).annotate({
          identifier: "DependentEntityList",
        }),
      ),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DataEncryptionException
  extends /*@__PURE__*/ S.TaggedError<DataEncryptionException>()(
    "DataEncryptionException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class IncidentManagerNotOnboarded
  extends /*@__PURE__*/ S.TaggedError<IncidentManagerNotOnboarded>()(
    "IncidentManagerNotOnboarded",
    {
      message: S.String.pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => ValidationExceptionReason).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      Fields: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.SyntheticError({
      from: "ValidationException",
      message: { includes: "Account not found for the request" },
    }),
  ).pipe(C.withBadRequestError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      RetryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidRotationArn
  extends /*@__PURE__*/ S.TaggedError<InvalidRotationArn>()(
    "InvalidRotationArn",
    {
      message: S.String.pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => ValidationExceptionReason).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      Fields: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.SyntheticError({
      from: "ValidationException",
      message: { includes: "Invalid resource Arn" },
    }),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.optional(S.String),
      ResourceType: S.optional(S.String),
      QuotaCode: S.String,
      ServiceCode: S.String,
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      QuotaCode: S.optional(S.String),
      ServiceCode: S.optional(S.String),
      RetryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => ValidationExceptionReason).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      Fields: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type SsmContactsArn = string;
export type AcceptType = "DELIVERED" | "READ" | (string & {});
export const AcceptType = S.String;

export type ReceiptInfo = string;
export type AcceptCode = string;
export type AcceptCodeValidation = "IGNORE" | "ENFORCE" | (string & {});
export const AcceptCodeValidation = S.String;

export interface AcceptPageRequest {
  PageId: string;
  ContactChannelId?: string;
  AcceptType: AcceptType;
  Note?: string;
  AcceptCode: string;
  AcceptCodeValidation?: AcceptCodeValidation;
}
export const AcceptPageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PageId: S.String,
    ContactChannelId: S.optional(S.String),
    AcceptType: AcceptType,
    Note: S.optional(S.String),
    AcceptCode: S.String,
    AcceptCodeValidation: S.optional(AcceptCodeValidation),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AcceptPageRequest",
}) as any as S.Schema<AcceptPageRequest>;
export interface AcceptPageResult {}
export const AcceptPageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AcceptPageResult",
}) as any as S.Schema<AcceptPageResult>;
export type ActivationCode = string;
export interface ActivateContactChannelRequest {
  ContactChannelId: string;
  ActivationCode: string;
}
export const ActivateContactChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContactChannelId: S.String, ActivationCode: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ActivateContactChannelRequest",
}) as any as S.Schema<ActivateContactChannelRequest>;
export interface ActivateContactChannelResult {}
export const ActivateContactChannelResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ActivateContactChannelResult",
}) as any as S.Schema<ActivateContactChannelResult>;
export type ContactAlias = string;
export type ContactName = string;
export type ContactType =
  | "PERSONAL"
  | "ESCALATION"
  | "ONCALL_SCHEDULE"
  | (string & {});
export const ContactType = S.String;

export type StageDurationInMins = number;
export type RetryIntervalInMinutes = number;
export interface ChannelTargetInfo {
  ContactChannelId: string;
  RetryIntervalInMinutes?: number;
}
export const ChannelTargetInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactChannelId: S.String,
    RetryIntervalInMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "ChannelTargetInfo",
}) as any as S.Schema<ChannelTargetInfo>;
export type IsEssential = boolean;
export interface ContactTargetInfo {
  ContactId?: string;
  IsEssential: boolean;
}
export const ContactTargetInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContactId: S.optional(S.String), IsEssential: S.Boolean }),
).annotate({
  identifier: "ContactTargetInfo",
}) as any as S.Schema<ContactTargetInfo>;
export interface Target {
  ChannelTargetInfo?: ChannelTargetInfo;
  ContactTargetInfo?: ContactTargetInfo;
}
export const Target = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelTargetInfo: S.optional(ChannelTargetInfo),
    ContactTargetInfo: S.optional(ContactTargetInfo),
  }),
).annotate({ identifier: "Target" }) as any as S.Schema<Target>;
export type TargetsList = Target[];
export const TargetsList = /*@__PURE__*/ S.Array(Target);
export interface Stage {
  DurationInMinutes: number;
  Targets: Target[];
}
export const Stage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DurationInMinutes: S.Number, Targets: TargetsList }),
).annotate({ identifier: "Stage" }) as any as S.Schema<Stage>;
export type StagesList = Stage[];
export const StagesList = /*@__PURE__*/ S.Array(Stage);
export type SsmContactsArnList = string[];
export const SsmContactsArnList = /*@__PURE__*/ S.Array(S.String);
export interface Plan {
  Stages?: Stage[];
  RotationIds?: string[];
}
export const Plan = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Stages: S.optional(StagesList),
    RotationIds: S.optional(SsmContactsArnList),
  }),
).annotate({ identifier: "Plan" }) as any as S.Schema<Plan>;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagsList = Tag[];
export const TagsList = /*@__PURE__*/ S.Array(Tag);
export type IdempotencyToken = string;
export interface CreateContactRequest {
  Alias: string;
  DisplayName?: string;
  Type: ContactType;
  Plan: Plan;
  Tags?: Tag[];
  IdempotencyToken?: string;
}
export const CreateContactRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Alias: S.String,
    DisplayName: S.optional(S.String),
    Type: ContactType,
    Plan: Plan,
    Tags: S.optional(TagsList),
    IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateContactRequest",
}) as any as S.Schema<CreateContactRequest>;
export interface CreateContactResult {
  ContactArn: string;
}
export const CreateContactResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContactArn: S.String }),
).annotate({
  identifier: "CreateContactResult",
}) as any as S.Schema<CreateContactResult>;
export type ChannelName = string;
export type ChannelType = "SMS" | "VOICE" | "EMAIL" | (string & {});
export const ChannelType = S.String;

export type SimpleAddress = string;
export interface ContactChannelAddress {
  SimpleAddress?: string;
}
export const ContactChannelAddress = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SimpleAddress: S.optional(S.String) }),
).annotate({
  identifier: "ContactChannelAddress",
}) as any as S.Schema<ContactChannelAddress>;
export type DeferActivation = boolean;
export interface CreateContactChannelRequest {
  ContactId: string;
  Name: string;
  Type: ChannelType;
  DeliveryAddress: ContactChannelAddress;
  DeferActivation?: boolean;
  IdempotencyToken?: string;
}
export const CreateContactChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactId: S.String,
    Name: S.String,
    Type: ChannelType,
    DeliveryAddress: ContactChannelAddress,
    DeferActivation: S.optional(S.Boolean),
    IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateContactChannelRequest",
}) as any as S.Schema<CreateContactChannelRequest>;
export interface CreateContactChannelResult {
  ContactChannelArn: string;
}
export const CreateContactChannelResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContactChannelArn: S.String }),
).annotate({
  identifier: "CreateContactChannelResult",
}) as any as S.Schema<CreateContactChannelResult>;
export type RotationName = string;
export type RotationContactsArnList = string[];
export const RotationContactsArnList = /*@__PURE__*/ S.Array(S.String);
export type TimeZoneId = string;
export type DayOfMonth = number;
export type HourOfDay = number;
export type MinuteOfHour = number;
export interface HandOffTime {
  HourOfDay: number;
  MinuteOfHour: number;
}
export const HandOffTime = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HourOfDay: S.Number, MinuteOfHour: S.Number }),
).annotate({ identifier: "HandOffTime" }) as any as S.Schema<HandOffTime>;
export interface MonthlySetting {
  DayOfMonth: number;
  HandOffTime: HandOffTime;
}
export const MonthlySetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DayOfMonth: S.Number, HandOffTime: HandOffTime }),
).annotate({ identifier: "MonthlySetting" }) as any as S.Schema<MonthlySetting>;
export type MonthlySettings = MonthlySetting[];
export const MonthlySettings = /*@__PURE__*/ S.Array(MonthlySetting);
export type DayOfWeek =
  | "MON"
  | "TUE"
  | "WED"
  | "THU"
  | "FRI"
  | "SAT"
  | "SUN"
  | (string & {});
export const DayOfWeek = S.String;

export interface WeeklySetting {
  DayOfWeek: DayOfWeek;
  HandOffTime: HandOffTime;
}
export const WeeklySetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DayOfWeek: DayOfWeek, HandOffTime: HandOffTime }),
).annotate({ identifier: "WeeklySetting" }) as any as S.Schema<WeeklySetting>;
export type WeeklySettings = WeeklySetting[];
export const WeeklySettings = /*@__PURE__*/ S.Array(WeeklySetting);
export type DailySettings = HandOffTime[];
export const DailySettings = /*@__PURE__*/ S.Array(HandOffTime);
export type NumberOfOnCalls = number;
export interface CoverageTime {
  Start?: HandOffTime;
  End?: HandOffTime;
}
export const CoverageTime = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Start: S.optional(HandOffTime), End: S.optional(HandOffTime) }),
).annotate({ identifier: "CoverageTime" }) as any as S.Schema<CoverageTime>;
export type CoverageTimes = CoverageTime[];
export const CoverageTimes = /*@__PURE__*/ S.Array(CoverageTime);
export type ShiftCoveragesMap = { [key in DayOfWeek]?: CoverageTime[] };
export const ShiftCoveragesMap = /*@__PURE__*/ S.Record(
  DayOfWeek,
  CoverageTimes.pipe(S.optional),
);
export type RecurrenceMultiplier = number;
export interface RecurrenceSettings {
  MonthlySettings?: MonthlySetting[];
  WeeklySettings?: WeeklySetting[];
  DailySettings?: HandOffTime[];
  NumberOfOnCalls: number;
  ShiftCoverages?: { [key: string]: CoverageTime[] | undefined };
  RecurrenceMultiplier: number;
}
export const RecurrenceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MonthlySettings: S.optional(MonthlySettings),
    WeeklySettings: S.optional(WeeklySettings),
    DailySettings: S.optional(DailySettings),
    NumberOfOnCalls: S.Number,
    ShiftCoverages: S.optional(ShiftCoveragesMap),
    RecurrenceMultiplier: S.Number,
  }),
).annotate({
  identifier: "RecurrenceSettings",
}) as any as S.Schema<RecurrenceSettings>;
export interface CreateRotationRequest {
  Name: string;
  ContactIds: string[];
  StartTime?: Date;
  TimeZoneId: string;
  Recurrence: RecurrenceSettings;
  Tags?: Tag[];
  IdempotencyToken?: string;
}
export const CreateRotationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    ContactIds: RotationContactsArnList,
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TimeZoneId: S.String,
    Recurrence: RecurrenceSettings,
    Tags: S.optional(TagsList),
    IdempotencyToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateRotationRequest",
}) as any as S.Schema<CreateRotationRequest>;
export interface CreateRotationResult {
  RotationArn: string;
}
export const CreateRotationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RotationArn: S.String }),
).annotate({
  identifier: "CreateRotationResult",
}) as any as S.Schema<CreateRotationResult>;
export type RotationOverrideContactsArnList = string[];
export const RotationOverrideContactsArnList = /*@__PURE__*/ S.Array(S.String);
export interface CreateRotationOverrideRequest {
  RotationId: string;
  NewContactIds: string[];
  StartTime: Date;
  EndTime: Date;
  IdempotencyToken?: string;
}
export const CreateRotationOverrideRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RotationId: S.String,
    NewContactIds: RotationOverrideContactsArnList,
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    IdempotencyToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateRotationOverrideRequest",
}) as any as S.Schema<CreateRotationOverrideRequest>;
export type Uuid = string;
export interface CreateRotationOverrideResult {
  RotationOverrideId: string;
}
export const CreateRotationOverrideResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RotationOverrideId: S.String }),
).annotate({
  identifier: "CreateRotationOverrideResult",
}) as any as S.Schema<CreateRotationOverrideResult>;
export interface DeactivateContactChannelRequest {
  ContactChannelId: string;
}
export const DeactivateContactChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContactChannelId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeactivateContactChannelRequest",
}) as any as S.Schema<DeactivateContactChannelRequest>;
export interface DeactivateContactChannelResult {}
export const DeactivateContactChannelResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeactivateContactChannelResult",
}) as any as S.Schema<DeactivateContactChannelResult>;
export interface DeleteContactRequest {
  ContactId: string;
}
export const DeleteContactRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContactId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteContactRequest",
}) as any as S.Schema<DeleteContactRequest>;
export interface DeleteContactResult {}
export const DeleteContactResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteContactResult",
}) as any as S.Schema<DeleteContactResult>;
export interface DeleteContactChannelRequest {
  ContactChannelId: string;
}
export const DeleteContactChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContactChannelId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteContactChannelRequest",
}) as any as S.Schema<DeleteContactChannelRequest>;
export interface DeleteContactChannelResult {}
export const DeleteContactChannelResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteContactChannelResult",
}) as any as S.Schema<DeleteContactChannelResult>;
export interface DeleteRotationRequest {
  RotationId: string;
}
export const DeleteRotationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RotationId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteRotationRequest",
}) as any as S.Schema<DeleteRotationRequest>;
export interface DeleteRotationResult {}
export const DeleteRotationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRotationResult",
}) as any as S.Schema<DeleteRotationResult>;
export interface DeleteRotationOverrideRequest {
  RotationId: string;
  RotationOverrideId: string;
}
export const DeleteRotationOverrideRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RotationId: S.String, RotationOverrideId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteRotationOverrideRequest",
}) as any as S.Schema<DeleteRotationOverrideRequest>;
export interface DeleteRotationOverrideResult {}
export const DeleteRotationOverrideResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteRotationOverrideResult",
}) as any as S.Schema<DeleteRotationOverrideResult>;
export interface DescribeEngagementRequest {
  EngagementId: string;
}
export const DescribeEngagementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EngagementId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeEngagementRequest",
}) as any as S.Schema<DescribeEngagementRequest>;
export type Sender = string;
export type Subject = string;
export type Content = string;
export type PublicSubject = string;
export type PublicContent = string;
export type IncidentId = string;
export interface DescribeEngagementResult {
  ContactArn: string;
  EngagementArn: string;
  Sender: string;
  Subject: string;
  Content: string;
  PublicSubject?: string;
  PublicContent?: string;
  IncidentId?: string;
  StartTime?: Date;
  StopTime?: Date;
}
export const DescribeEngagementResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactArn: S.String,
    EngagementArn: S.String,
    Sender: S.String,
    Subject: S.String,
    Content: S.String,
    PublicSubject: S.optional(S.String),
    PublicContent: S.optional(S.String),
    IncidentId: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StopTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DescribeEngagementResult",
}) as any as S.Schema<DescribeEngagementResult>;
export interface DescribePageRequest {
  PageId: string;
}
export const DescribePageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PageId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribePageRequest",
}) as any as S.Schema<DescribePageRequest>;
export interface DescribePageResult {
  PageArn: string;
  EngagementArn: string;
  ContactArn: string;
  Sender: string;
  Subject: string;
  Content: string;
  PublicSubject?: string;
  PublicContent?: string;
  IncidentId?: string;
  SentTime?: Date;
  ReadTime?: Date;
  DeliveryTime?: Date;
}
export const DescribePageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PageArn: S.String,
    EngagementArn: S.String,
    ContactArn: S.String,
    Sender: S.String,
    Subject: S.String,
    Content: S.String,
    PublicSubject: S.optional(S.String),
    PublicContent: S.optional(S.String),
    IncidentId: S.optional(S.String),
    SentTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ReadTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DeliveryTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DescribePageResult",
}) as any as S.Schema<DescribePageResult>;
export interface GetContactRequest {
  ContactId: string;
}
export const GetContactRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContactId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetContactRequest",
}) as any as S.Schema<GetContactRequest>;
export interface GetContactResult {
  ContactArn: string;
  Alias: string;
  DisplayName?: string;
  Type: ContactType;
  Plan: Plan;
}
export const GetContactResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactArn: S.String,
    Alias: S.String,
    DisplayName: S.optional(S.String),
    Type: ContactType,
    Plan: Plan,
  }),
).annotate({
  identifier: "GetContactResult",
}) as any as S.Schema<GetContactResult>;
export interface GetContactChannelRequest {
  ContactChannelId: string;
}
export const GetContactChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContactChannelId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetContactChannelRequest",
}) as any as S.Schema<GetContactChannelRequest>;
export type ActivationStatus = "ACTIVATED" | "NOT_ACTIVATED" | (string & {});
export const ActivationStatus = S.String;

export interface GetContactChannelResult {
  ContactArn: string;
  ContactChannelArn: string;
  Name: string;
  Type: ChannelType;
  DeliveryAddress: ContactChannelAddress;
  ActivationStatus?: ActivationStatus;
}
export const GetContactChannelResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactArn: S.String,
    ContactChannelArn: S.String,
    Name: S.String,
    Type: ChannelType,
    DeliveryAddress: ContactChannelAddress,
    ActivationStatus: S.optional(ActivationStatus),
  }),
).annotate({
  identifier: "GetContactChannelResult",
}) as any as S.Schema<GetContactChannelResult>;
export interface GetContactPolicyRequest {
  ContactArn: string;
}
export const GetContactPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContactArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetContactPolicyRequest",
}) as any as S.Schema<GetContactPolicyRequest>;
export type Policy = string;
export interface GetContactPolicyResult {
  ContactArn?: string;
  Policy?: string;
}
export const GetContactPolicyResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContactArn: S.optional(S.String), Policy: S.optional(S.String) }),
).annotate({
  identifier: "GetContactPolicyResult",
}) as any as S.Schema<GetContactPolicyResult>;
export interface GetRotationRequest {
  RotationId: string;
}
export const GetRotationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RotationId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetRotationRequest",
}) as any as S.Schema<GetRotationRequest>;
export interface GetRotationResult {
  RotationArn: string;
  Name: string;
  ContactIds: string[];
  StartTime: Date;
  TimeZoneId: string;
  Recurrence: RecurrenceSettings;
}
export const GetRotationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RotationArn: S.String,
    Name: S.String,
    ContactIds: RotationContactsArnList,
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    TimeZoneId: S.String,
    Recurrence: RecurrenceSettings,
  }),
).annotate({
  identifier: "GetRotationResult",
}) as any as S.Schema<GetRotationResult>;
export interface GetRotationOverrideRequest {
  RotationId: string;
  RotationOverrideId: string;
}
export const GetRotationOverrideRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RotationId: S.String, RotationOverrideId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetRotationOverrideRequest",
}) as any as S.Schema<GetRotationOverrideRequest>;
export interface GetRotationOverrideResult {
  RotationOverrideId?: string;
  RotationArn?: string;
  NewContactIds?: string[];
  StartTime?: Date;
  EndTime?: Date;
  CreateTime?: Date;
}
export const GetRotationOverrideResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RotationOverrideId: S.optional(S.String),
    RotationArn: S.optional(S.String),
    NewContactIds: S.optional(SsmContactsArnList),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GetRotationOverrideResult",
}) as any as S.Schema<GetRotationOverrideResult>;
export type PaginationToken = string;
export type MaxResults = number;
export interface ListContactChannelsRequest {
  ContactId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListContactChannelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListContactChannelsRequest",
}) as any as S.Schema<ListContactChannelsRequest>;
export interface ContactChannel {
  ContactChannelArn: string;
  ContactArn: string;
  Name: string;
  Type?: ChannelType;
  DeliveryAddress: ContactChannelAddress;
  ActivationStatus: ActivationStatus;
}
export const ContactChannel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactChannelArn: S.String,
    ContactArn: S.String,
    Name: S.String,
    Type: S.optional(ChannelType),
    DeliveryAddress: ContactChannelAddress,
    ActivationStatus: ActivationStatus,
  }),
).annotate({ identifier: "ContactChannel" }) as any as S.Schema<ContactChannel>;
export type ContactChannelList = ContactChannel[];
export const ContactChannelList = /*@__PURE__*/ S.Array(ContactChannel);
export interface ListContactChannelsResult {
  NextToken?: string;
  ContactChannels: ContactChannel[];
}
export const ListContactChannelsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    ContactChannels: ContactChannelList,
  }),
).annotate({
  identifier: "ListContactChannelsResult",
}) as any as S.Schema<ListContactChannelsResult>;
export interface ListContactsRequest {
  NextToken?: string;
  MaxResults?: number;
  AliasPrefix?: string;
  Type?: ContactType;
}
export const ListContactsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    AliasPrefix: S.optional(S.String),
    Type: S.optional(ContactType),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListContactsRequest",
}) as any as S.Schema<ListContactsRequest>;
export interface Contact {
  ContactArn: string;
  Alias: string;
  DisplayName?: string;
  Type: ContactType;
}
export const Contact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactArn: S.String,
    Alias: S.String,
    DisplayName: S.optional(S.String),
    Type: ContactType,
  }),
).annotate({ identifier: "Contact" }) as any as S.Schema<Contact>;
export type ContactsList = Contact[];
export const ContactsList = /*@__PURE__*/ S.Array(Contact);
export interface ListContactsResult {
  NextToken?: string;
  Contacts?: Contact[];
}
export const ListContactsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Contacts: S.optional(ContactsList),
  }),
).annotate({
  identifier: "ListContactsResult",
}) as any as S.Schema<ListContactsResult>;
export interface TimeRange {
  StartTime?: Date;
  EndTime?: Date;
}
export const TimeRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "TimeRange" }) as any as S.Schema<TimeRange>;
export interface ListEngagementsRequest {
  NextToken?: string;
  MaxResults?: number;
  IncidentId?: string;
  TimeRangeValue?: TimeRange;
}
export const ListEngagementsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    IncidentId: S.optional(S.String),
    TimeRangeValue: S.optional(TimeRange),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEngagementsRequest",
}) as any as S.Schema<ListEngagementsRequest>;
export interface Engagement {
  EngagementArn: string;
  ContactArn: string;
  Sender: string;
  IncidentId?: string;
  StartTime?: Date;
  StopTime?: Date;
}
export const Engagement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngagementArn: S.String,
    ContactArn: S.String,
    Sender: S.String,
    IncidentId: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StopTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Engagement" }) as any as S.Schema<Engagement>;
export type EngagementsList = Engagement[];
export const EngagementsList = /*@__PURE__*/ S.Array(Engagement);
export interface ListEngagementsResult {
  NextToken?: string;
  Engagements: Engagement[];
}
export const ListEngagementsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String), Engagements: EngagementsList }),
).annotate({
  identifier: "ListEngagementsResult",
}) as any as S.Schema<ListEngagementsResult>;
export interface ListPageReceiptsRequest {
  PageId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListPageReceiptsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PageId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPageReceiptsRequest",
}) as any as S.Schema<ListPageReceiptsRequest>;
export type ReceiptType =
  | "DELIVERED"
  | "ERROR"
  | "READ"
  | "SENT"
  | "STOP"
  | (string & {});
export const ReceiptType = S.String;

export interface Receipt {
  ContactChannelArn?: string;
  ReceiptType: ReceiptType;
  ReceiptInfo?: string;
  ReceiptTime: Date;
}
export const Receipt = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactChannelArn: S.optional(S.String),
    ReceiptType: ReceiptType,
    ReceiptInfo: S.optional(S.String),
    ReceiptTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "Receipt" }) as any as S.Schema<Receipt>;
export type ReceiptsList = Receipt[];
export const ReceiptsList = /*@__PURE__*/ S.Array(Receipt);
export interface ListPageReceiptsResult {
  NextToken?: string;
  Receipts?: Receipt[];
}
export const ListPageReceiptsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Receipts: S.optional(ReceiptsList),
  }),
).annotate({
  identifier: "ListPageReceiptsResult",
}) as any as S.Schema<ListPageReceiptsResult>;
export interface ListPageResolutionsRequest {
  NextToken?: string;
  PageId: string;
}
export const ListPageResolutionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String), PageId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPageResolutionsRequest",
}) as any as S.Schema<ListPageResolutionsRequest>;
export type StageIndex = number;
export interface ResolutionContact {
  ContactArn: string;
  Type: ContactType;
  StageIndex?: number;
}
export const ResolutionContact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactArn: S.String,
    Type: ContactType,
    StageIndex: S.optional(S.Number),
  }),
).annotate({
  identifier: "ResolutionContact",
}) as any as S.Schema<ResolutionContact>;
export type ResolutionList = ResolutionContact[];
export const ResolutionList = /*@__PURE__*/ S.Array(ResolutionContact);
export interface ListPageResolutionsResult {
  NextToken?: string;
  PageResolutions: ResolutionContact[];
}
export const ListPageResolutionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    PageResolutions: ResolutionList,
  }),
).annotate({
  identifier: "ListPageResolutionsResult",
}) as any as S.Schema<ListPageResolutionsResult>;
export interface ListPagesByContactRequest {
  ContactId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListPagesByContactRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPagesByContactRequest",
}) as any as S.Schema<ListPagesByContactRequest>;
export interface Page {
  PageArn: string;
  EngagementArn: string;
  ContactArn: string;
  Sender: string;
  IncidentId?: string;
  SentTime?: Date;
  DeliveryTime?: Date;
  ReadTime?: Date;
}
export const Page = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PageArn: S.String,
    EngagementArn: S.String,
    ContactArn: S.String,
    Sender: S.String,
    IncidentId: S.optional(S.String),
    SentTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DeliveryTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ReadTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Page" }) as any as S.Schema<Page>;
export type PagesList = Page[];
export const PagesList = /*@__PURE__*/ S.Array(Page);
export interface ListPagesByContactResult {
  NextToken?: string;
  Pages: Page[];
}
export const ListPagesByContactResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String), Pages: PagesList }),
).annotate({
  identifier: "ListPagesByContactResult",
}) as any as S.Schema<ListPagesByContactResult>;
export interface ListPagesByEngagementRequest {
  EngagementId: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListPagesByEngagementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngagementId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPagesByEngagementRequest",
}) as any as S.Schema<ListPagesByEngagementRequest>;
export interface ListPagesByEngagementResult {
  NextToken?: string;
  Pages: Page[];
}
export const ListPagesByEngagementResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String), Pages: PagesList }),
).annotate({
  identifier: "ListPagesByEngagementResult",
}) as any as S.Schema<ListPagesByEngagementResult>;
export type Member = string;
export type RotationPreviewMemberList = string[];
export const RotationPreviewMemberList = /*@__PURE__*/ S.Array(S.String);
export type RotationOverridePreviewMemberList = string[];
export const RotationOverridePreviewMemberList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface PreviewOverride {
  NewMembers?: string[];
  StartTime?: Date;
  EndTime?: Date;
}
export const PreviewOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NewMembers: S.optional(RotationOverridePreviewMemberList),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "PreviewOverride",
}) as any as S.Schema<PreviewOverride>;
export type OverrideList = PreviewOverride[];
export const OverrideList = /*@__PURE__*/ S.Array(PreviewOverride);
export interface ListPreviewRotationShiftsRequest {
  RotationStartTime?: Date;
  StartTime?: Date;
  EndTime: Date;
  Members: string[];
  TimeZoneId: string;
  Recurrence: RecurrenceSettings;
  Overrides?: PreviewOverride[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListPreviewRotationShiftsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RotationStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Members: RotationPreviewMemberList,
    TimeZoneId: S.String,
    Recurrence: RecurrenceSettings,
    Overrides: S.optional(OverrideList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPreviewRotationShiftsRequest",
}) as any as S.Schema<ListPreviewRotationShiftsRequest>;
export type ShiftType = "REGULAR" | "OVERRIDDEN" | (string & {});
export const ShiftType = S.String;

export interface ShiftDetails {
  OverriddenContactIds: string[];
}
export const ShiftDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OverriddenContactIds: SsmContactsArnList }),
).annotate({ identifier: "ShiftDetails" }) as any as S.Schema<ShiftDetails>;
export interface RotationShift {
  ContactIds?: string[];
  StartTime: Date;
  EndTime: Date;
  Type?: ShiftType;
  ShiftDetails?: ShiftDetails;
}
export const RotationShift = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactIds: S.optional(SsmContactsArnList),
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Type: S.optional(ShiftType),
    ShiftDetails: S.optional(ShiftDetails),
  }),
).annotate({ identifier: "RotationShift" }) as any as S.Schema<RotationShift>;
export type RotationShifts = RotationShift[];
export const RotationShifts = /*@__PURE__*/ S.Array(RotationShift);
export interface ListPreviewRotationShiftsResult {
  RotationShifts?: RotationShift[];
  NextToken?: string;
}
export const ListPreviewRotationShiftsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RotationShifts: S.optional(RotationShifts),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPreviewRotationShiftsResult",
}) as any as S.Schema<ListPreviewRotationShiftsResult>;
export interface ListRotationOverridesRequest {
  RotationId: string;
  StartTime: Date;
  EndTime: Date;
  NextToken?: string;
  MaxResults?: number;
}
export const ListRotationOverridesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RotationId: S.String,
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRotationOverridesRequest",
}) as any as S.Schema<ListRotationOverridesRequest>;
export interface RotationOverride {
  RotationOverrideId: string;
  NewContactIds: string[];
  StartTime: Date;
  EndTime: Date;
  CreateTime: Date;
}
export const RotationOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RotationOverrideId: S.String,
    NewContactIds: SsmContactsArnList,
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    CreateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "RotationOverride",
}) as any as S.Schema<RotationOverride>;
export type RotationOverrides = RotationOverride[];
export const RotationOverrides = /*@__PURE__*/ S.Array(RotationOverride);
export interface ListRotationOverridesResult {
  RotationOverrides?: RotationOverride[];
  NextToken?: string;
}
export const ListRotationOverridesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RotationOverrides: S.optional(RotationOverrides),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRotationOverridesResult",
}) as any as S.Schema<ListRotationOverridesResult>;
export interface ListRotationsRequest {
  RotationNamePrefix?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListRotationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RotationNamePrefix: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRotationsRequest",
}) as any as S.Schema<ListRotationsRequest>;
export interface Rotation {
  RotationArn: string;
  Name: string;
  ContactIds?: string[];
  StartTime?: Date;
  TimeZoneId?: string;
  Recurrence?: RecurrenceSettings;
}
export const Rotation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RotationArn: S.String,
    Name: S.String,
    ContactIds: S.optional(SsmContactsArnList),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TimeZoneId: S.optional(S.String),
    Recurrence: S.optional(RecurrenceSettings),
  }),
).annotate({ identifier: "Rotation" }) as any as S.Schema<Rotation>;
export type Rotations = Rotation[];
export const Rotations = /*@__PURE__*/ S.Array(Rotation);
export interface ListRotationsResult {
  NextToken?: string;
  Rotations: Rotation[];
}
export const ListRotationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String), Rotations: Rotations }),
).annotate({
  identifier: "ListRotationsResult",
}) as any as S.Schema<ListRotationsResult>;
export interface ListRotationShiftsRequest {
  RotationId: string;
  StartTime?: Date;
  EndTime: Date;
  NextToken?: string;
  MaxResults?: number;
}
export const ListRotationShiftsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RotationId: S.String,
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRotationShiftsRequest",
}) as any as S.Schema<ListRotationShiftsRequest>;
export interface ListRotationShiftsResult {
  RotationShifts?: RotationShift[];
  NextToken?: string;
}
export const ListRotationShiftsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RotationShifts: S.optional(RotationShifts),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRotationShiftsResult",
}) as any as S.Schema<ListRotationShiftsResult>;
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResult {
  Tags?: Tag[];
}
export const ListTagsForResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagsList) }),
).annotate({
  identifier: "ListTagsForResourceResult",
}) as any as S.Schema<ListTagsForResourceResult>;
export interface PutContactPolicyRequest {
  ContactArn: string;
  Policy: string;
}
export const PutContactPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContactArn: S.String, Policy: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutContactPolicyRequest",
}) as any as S.Schema<PutContactPolicyRequest>;
export interface PutContactPolicyResult {}
export const PutContactPolicyResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutContactPolicyResult",
}) as any as S.Schema<PutContactPolicyResult>;
export interface SendActivationCodeRequest {
  ContactChannelId: string;
}
export const SendActivationCodeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ContactChannelId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SendActivationCodeRequest",
}) as any as S.Schema<SendActivationCodeRequest>;
export interface SendActivationCodeResult {}
export const SendActivationCodeResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "SendActivationCodeResult",
}) as any as S.Schema<SendActivationCodeResult>;
export interface StartEngagementRequest {
  ContactId: string;
  Sender: string;
  Subject: string;
  Content: string;
  PublicSubject?: string;
  PublicContent?: string;
  IncidentId?: string;
  IdempotencyToken?: string;
}
export const StartEngagementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactId: S.String,
    Sender: S.String,
    Subject: S.String,
    Content: S.String,
    PublicSubject: S.optional(S.String),
    PublicContent: S.optional(S.String),
    IncidentId: S.optional(S.String),
    IdempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartEngagementRequest",
}) as any as S.Schema<StartEngagementRequest>;
export interface StartEngagementResult {
  EngagementArn: string;
}
export const StartEngagementResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EngagementArn: S.String }),
).annotate({
  identifier: "StartEngagementResult",
}) as any as S.Schema<StartEngagementResult>;
export type StopReason = string;
export interface StopEngagementRequest {
  EngagementId: string;
  Reason?: string;
}
export const StopEngagementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EngagementId: S.String, Reason: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopEngagementRequest",
}) as any as S.Schema<StopEngagementRequest>;
export interface StopEngagementResult {}
export const StopEngagementResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopEngagementResult",
}) as any as S.Schema<StopEngagementResult>;
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, Tags: TagsList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResult {}
export const TagResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceResult",
}) as any as S.Schema<TagResourceResult>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, TagKeys: TagKeyList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResult {}
export const UntagResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceResult",
}) as any as S.Schema<UntagResourceResult>;
export interface UpdateContactRequest {
  ContactId: string;
  DisplayName?: string;
  Plan?: Plan;
}
export const UpdateContactRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactId: S.String,
    DisplayName: S.optional(S.String),
    Plan: S.optional(Plan),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateContactRequest",
}) as any as S.Schema<UpdateContactRequest>;
export interface UpdateContactResult {}
export const UpdateContactResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateContactResult",
}) as any as S.Schema<UpdateContactResult>;
export interface UpdateContactChannelRequest {
  ContactChannelId: string;
  Name?: string;
  DeliveryAddress?: ContactChannelAddress;
}
export const UpdateContactChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContactChannelId: S.String,
    Name: S.optional(S.String),
    DeliveryAddress: S.optional(ContactChannelAddress),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateContactChannelRequest",
}) as any as S.Schema<UpdateContactChannelRequest>;
export interface UpdateContactChannelResult {}
export const UpdateContactChannelResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateContactChannelResult",
}) as any as S.Schema<UpdateContactChannelResult>;
export interface UpdateRotationRequest {
  RotationId: string;
  ContactIds?: string[];
  StartTime?: Date;
  TimeZoneId?: string;
  Recurrence: RecurrenceSettings;
}
export const UpdateRotationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RotationId: S.String,
    ContactIds: S.optional(RotationContactsArnList),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TimeZoneId: S.optional(S.String),
    Recurrence: RecurrenceSettings,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateRotationRequest",
}) as any as S.Schema<UpdateRotationRequest>;
export interface UpdateRotationResult {}
export const UpdateRotationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateRotationResult",
}) as any as S.Schema<UpdateRotationResult>;
export type RetryAfterSeconds = number;
export type ValidationExceptionReason =
  | "UNKNOWN_OPERATION"
  | "CANNOT_PARSE"
  | "FIELD_VALIDATION_FAILED"
  | "OTHER"
  | (string & {});
export const ValidationExceptionReason = S.String;

export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export interface DependentEntity {
  RelationType: string;
  DependentResourceIds: string[];
}
export const DependentEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RelationType: S.String,
    DependentResourceIds: SsmContactsArnList,
  }),
).annotate({
  identifier: "DependentEntity",
}) as any as S.Schema<DependentEntity>;
export type DependentEntityList = DependentEntity[];
export const DependentEntityList = /*@__PURE__*/ S.Array(DependentEntity);
export type AcceptPageError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Used to acknowledge an engagement to a contact channel during an incident.
 */
export const acceptPage: API.OperationMethod<
  AcceptPageRequest,
  AcceptPageResult,
  AcceptPageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptPageRequest,
  output: AcceptPageResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptPage",
}));

export type ActivateContactChannelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Activates a contact's contact channel. Incident Manager can't engage a contact until the
 * contact channel has been activated.
 */
export const activateContactChannel: API.OperationMethod<
  ActivateContactChannelRequest,
  ActivateContactChannelResult,
  ActivateContactChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ActivateContactChannelRequest,
  output: ActivateContactChannelResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ActivateContactChannel",
}));

export type CreateContactError =
  | AccessDeniedException
  | ConflictException
  | DataEncryptionException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Contacts are either the contacts that Incident Manager engages during an incident or the
 * escalation plans that Incident Manager uses to engage contacts in phases during an
 * incident.
 */
export const createContact: API.OperationMethod<
  CreateContactRequest,
  CreateContactResult,
  CreateContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateContactRequest,
  output: CreateContactResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    DataEncryptionException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContact",
}));

export type CreateContactChannelError =
  | AccessDeniedException
  | ConflictException
  | DataEncryptionException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * A contact channel is the method that Incident Manager uses to engage your contact.
 */
export const createContactChannel: API.OperationMethod<
  CreateContactChannelRequest,
  CreateContactChannelResult,
  CreateContactChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateContactChannelRequest,
  output: CreateContactChannelResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    DataEncryptionException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContactChannel",
}));

export type CreateRotationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Creates a rotation in an on-call schedule.
 */
export const createRotation: API.OperationMethod<
  CreateRotationRequest,
  CreateRotationResult,
  CreateRotationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRotationRequest,
  output: CreateRotationResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    ConflictException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRotation",
}));

export type CreateRotationOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | InvalidRotationArn
  | CommonErrors;
/**
 * Creates an override for a rotation in an on-call schedule.
 */
export const createRotationOverride: API.OperationMethod<
  CreateRotationOverrideRequest,
  CreateRotationOverrideResult,
  CreateRotationOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRotationOverrideRequest,
  output: CreateRotationOverrideResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
    InvalidRotationArn,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRotationOverride",
}));

export type DeactivateContactChannelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * To no longer receive Incident Manager engagements to a contact channel, you can deactivate
 * the channel.
 */
export const deactivateContactChannel: API.OperationMethod<
  DeactivateContactChannelRequest,
  DeactivateContactChannelResult,
  DeactivateContactChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeactivateContactChannelRequest,
  output: DeactivateContactChannelResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeactivateContactChannel",
}));

export type DeleteContactError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * To remove a contact from Incident Manager, you can delete the contact. However, deleting a
 * contact does not remove it from escalation plans and related response plans. Deleting an
 * escalation plan also does not remove it from all related response plans. To modify an
 * escalation plan, we recommend using the UpdateContact action to specify a
 * different existing contact.
 */
export const deleteContact: API.OperationMethod<
  DeleteContactRequest,
  DeleteContactResult,
  DeleteContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteContactRequest,
  output: DeleteContactResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContact",
}));

export type DeleteContactChannelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * To stop receiving engagements on a contact channel, you can delete the channel from a
 * contact. Deleting the contact channel does not remove it from the contact's engagement
 * plan, but the stage that includes the channel will be ignored. If you delete the only
 * contact channel for a contact, you'll no longer be able to engage that contact during an
 * incident.
 */
export const deleteContactChannel: API.OperationMethod<
  DeleteContactChannelRequest,
  DeleteContactChannelResult,
  DeleteContactChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteContactChannelRequest,
  output: DeleteContactChannelResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContactChannel",
}));

export type DeleteRotationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | InvalidRotationArn
  | CommonErrors;
/**
 * Deletes a rotation from the system. If a rotation belongs to more than one on-call
 * schedule, this operation deletes it from all of them.
 */
export const deleteRotation: API.OperationMethod<
  DeleteRotationRequest,
  DeleteRotationResult,
  DeleteRotationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRotationRequest,
  output: DeleteRotationResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
    InvalidRotationArn,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRotation",
}));

export type DeleteRotationOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | InvalidRotationArn
  | CommonErrors;
/**
 * Deletes an existing override for an on-call rotation.
 */
export const deleteRotationOverride: API.OperationMethod<
  DeleteRotationOverrideRequest,
  DeleteRotationOverrideResult,
  DeleteRotationOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRotationOverrideRequest,
  output: DeleteRotationOverrideResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
    InvalidRotationArn,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRotationOverride",
}));

export type DescribeEngagementError =
  | AccessDeniedException
  | DataEncryptionException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Incident Manager uses engagements to engage contacts and escalation plans during an incident.
 * Use this command to describe the engagement that occurred during an incident.
 */
export const describeEngagement: API.OperationMethod<
  DescribeEngagementRequest,
  DescribeEngagementResult,
  DescribeEngagementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEngagementRequest,
  output: DescribeEngagementResult,
  errors: [
    AccessDeniedException,
    DataEncryptionException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEngagement",
}));

export type DescribePageError =
  | AccessDeniedException
  | DataEncryptionException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Lists details of the engagement to a contact channel.
 */
export const describePage: API.OperationMethod<
  DescribePageRequest,
  DescribePageResult,
  DescribePageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePageRequest,
  output: DescribePageResult,
  errors: [
    AccessDeniedException,
    DataEncryptionException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePage",
}));

export type GetContactError =
  | AccessDeniedException
  | DataEncryptionException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Retrieves information about the specified contact or escalation plan.
 */
export const getContact: API.OperationMethod<
  GetContactRequest,
  GetContactResult,
  GetContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetContactRequest,
  output: GetContactResult,
  errors: [
    AccessDeniedException,
    DataEncryptionException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContact",
}));

export type GetContactChannelError =
  | AccessDeniedException
  | DataEncryptionException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * List details about a specific contact channel.
 */
export const getContactChannel: API.OperationMethod<
  GetContactChannelRequest,
  GetContactChannelResult,
  GetContactChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetContactChannelRequest,
  output: GetContactChannelResult,
  errors: [
    AccessDeniedException,
    DataEncryptionException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContactChannel",
}));

export type GetContactPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Retrieves the resource policies attached to the specified contact or escalation
 * plan.
 */
export const getContactPolicy: API.OperationMethod<
  GetContactPolicyRequest,
  GetContactPolicyResult,
  GetContactPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetContactPolicyRequest,
  output: GetContactPolicyResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContactPolicy",
}));

export type GetRotationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | InvalidRotationArn
  | CommonErrors;
/**
 * Retrieves information about an on-call rotation.
 */
export const getRotation: API.OperationMethod<
  GetRotationRequest,
  GetRotationResult,
  GetRotationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRotationRequest,
  output: GetRotationResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
    InvalidRotationArn,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRotation",
}));

export type GetRotationOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | InvalidRotationArn
  | CommonErrors;
/**
 * Retrieves information about an override to an on-call rotation.
 */
export const getRotationOverride: API.OperationMethod<
  GetRotationOverrideRequest,
  GetRotationOverrideResult,
  GetRotationOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRotationOverrideRequest,
  output: GetRotationOverrideResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
    InvalidRotationArn,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRotationOverride",
}));

export type ListContactChannelsError =
  | AccessDeniedException
  | DataEncryptionException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Lists all contact channels for the specified contact.
 */
export const listContactChannels: API.PaginatedOperationMethod<
  ListContactChannelsRequest,
  ListContactChannelsResult,
  ListContactChannelsError,
  Credentials | HttpClient.HttpClient,
  ContactChannel
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListContactChannelsRequest,
  output: ListContactChannelsResult,
  errors: [
    AccessDeniedException,
    DataEncryptionException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContactChannels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ContactChannels",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListContactsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Lists all contacts and escalation plans in Incident Manager.
 */
export const listContacts: API.PaginatedOperationMethod<
  ListContactsRequest,
  ListContactsResult,
  ListContactsError,
  Credentials | HttpClient.HttpClient,
  Contact
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListContactsRequest,
  output: ListContactsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContacts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Contacts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEngagementsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Lists all engagements that have happened in an incident.
 */
export const listEngagements: API.PaginatedOperationMethod<
  ListEngagementsRequest,
  ListEngagementsResult,
  ListEngagementsError,
  Credentials | HttpClient.HttpClient,
  Engagement
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEngagementsRequest,
  output: ListEngagementsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEngagements",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Engagements",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPageReceiptsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Lists all of the engagements to contact channels that have been acknowledged.
 */
export const listPageReceipts: API.PaginatedOperationMethod<
  ListPageReceiptsRequest,
  ListPageReceiptsResult,
  ListPageReceiptsError,
  Credentials | HttpClient.HttpClient,
  Receipt
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPageReceiptsRequest,
  output: ListPageReceiptsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPageReceipts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Receipts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPageResolutionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Returns the resolution path of an engagement. For example, the escalation plan engaged
 * in an incident might target an on-call schedule that includes several contacts in a
 * rotation, but just one contact on-call when the incident starts. The resolution path
 * indicates the hierarchy of escalation plan > on-call schedule >
 * contact.
 */
export const listPageResolutions: API.PaginatedOperationMethod<
  ListPageResolutionsRequest,
  ListPageResolutionsResult,
  ListPageResolutionsError,
  Credentials | HttpClient.HttpClient,
  ResolutionContact
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPageResolutionsRequest,
  output: ListPageResolutionsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPageResolutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PageResolutions",
  } as const,
})) as any;

export type ListPagesByContactError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Lists the engagements to a contact's contact channels.
 */
export const listPagesByContact: API.PaginatedOperationMethod<
  ListPagesByContactRequest,
  ListPagesByContactResult,
  ListPagesByContactError,
  Credentials | HttpClient.HttpClient,
  Page
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPagesByContactRequest,
  output: ListPagesByContactResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPagesByContact",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Pages",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPagesByEngagementError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Lists the engagements to contact channels that occurred by engaging a contact.
 */
export const listPagesByEngagement: API.PaginatedOperationMethod<
  ListPagesByEngagementRequest,
  ListPagesByEngagementResult,
  ListPagesByEngagementError,
  Credentials | HttpClient.HttpClient,
  Page
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPagesByEngagementRequest,
  output: ListPagesByEngagementResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPagesByEngagement",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Pages",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPreviewRotationShiftsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Returns a list of shifts based on rotation configuration parameters.
 *
 * The Incident Manager primarily uses this operation to populate the **Preview** calendar. It is not typically run by end users.
 */
export const listPreviewRotationShifts: API.PaginatedOperationMethod<
  ListPreviewRotationShiftsRequest,
  ListPreviewRotationShiftsResult,
  ListPreviewRotationShiftsError,
  Credentials | HttpClient.HttpClient,
  RotationShift
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPreviewRotationShiftsRequest,
  output: ListPreviewRotationShiftsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPreviewRotationShifts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RotationShifts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRotationOverridesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | InvalidRotationArn
  | CommonErrors;
/**
 * Retrieves a list of overrides currently specified for an on-call rotation.
 */
export const listRotationOverrides: API.PaginatedOperationMethod<
  ListRotationOverridesRequest,
  ListRotationOverridesResult,
  ListRotationOverridesError,
  Credentials | HttpClient.HttpClient,
  RotationOverride
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRotationOverridesRequest,
  output: ListRotationOverridesResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
    InvalidRotationArn,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRotationOverrides",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RotationOverrides",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRotationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Retrieves a list of on-call rotations.
 */
export const listRotations: API.PaginatedOperationMethod<
  ListRotationsRequest,
  ListRotationsResult,
  ListRotationsError,
  Credentials | HttpClient.HttpClient,
  Rotation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRotationsRequest,
  output: ListRotationsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRotations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Rotations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRotationShiftsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | InvalidRotationArn
  | CommonErrors;
/**
 * Returns a list of shifts generated by an existing rotation in the system.
 */
export const listRotationShifts: API.PaginatedOperationMethod<
  ListRotationShiftsRequest,
  ListRotationShiftsResult,
  ListRotationShiftsError,
  Credentials | HttpClient.HttpClient,
  RotationShift
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRotationShiftsRequest,
  output: ListRotationShiftsResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
    InvalidRotationArn,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRotationShifts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RotationShifts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Lists the tags of a contact, escalation plan, rotation, or on-call schedule.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResult,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutContactPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Adds a resource policy to the specified contact or escalation plan. The resource policy
 * is used to share the contact or escalation plan using Resource Access Manager (RAM). For more information about cross-account sharing, see Setting up
 * cross-account functionality.
 */
export const putContactPolicy: API.OperationMethod<
  PutContactPolicyRequest,
  PutContactPolicyResult,
  PutContactPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutContactPolicyRequest,
  output: PutContactPolicyResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutContactPolicy",
}));

export type SendActivationCodeError =
  | AccessDeniedException
  | DataEncryptionException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Sends an activation code to a contact channel. The contact can use this code to activate
 * the contact channel in the console or with the `ActivateChannel` operation.
 * Incident Manager can't engage a contact channel until it has been activated.
 */
export const sendActivationCode: API.OperationMethod<
  SendActivationCodeRequest,
  SendActivationCodeResult,
  SendActivationCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendActivationCodeRequest,
  output: SendActivationCodeResult,
  errors: [
    AccessDeniedException,
    DataEncryptionException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendActivationCode",
}));

export type StartEngagementError =
  | AccessDeniedException
  | DataEncryptionException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Starts an engagement to a contact or escalation plan. The engagement engages each
 * contact specified in the incident.
 */
export const startEngagement: API.OperationMethod<
  StartEngagementRequest,
  StartEngagementResult,
  StartEngagementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartEngagementRequest,
  output: StartEngagementResult,
  errors: [
    AccessDeniedException,
    DataEncryptionException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartEngagement",
}));

export type StopEngagementError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Stops an engagement before it finishes the final stage of the escalation plan or
 * engagement plan. Further contacts aren't engaged.
 */
export const stopEngagement: API.OperationMethod<
  StopEngagementRequest,
  StopEngagementResult,
  StopEngagementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopEngagementRequest,
  output: StopEngagementResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopEngagement",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Tags a contact or escalation plan. You can tag only contacts and escalation plans in the
 * first region of your replication set.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResult,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
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
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Removes tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResult,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateContactError =
  | AccessDeniedException
  | DataEncryptionException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Updates the contact or escalation plan specified.
 */
export const updateContact: API.OperationMethod<
  UpdateContactRequest,
  UpdateContactResult,
  UpdateContactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateContactRequest,
  output: UpdateContactResult,
  errors: [
    AccessDeniedException,
    DataEncryptionException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContact",
}));

export type UpdateContactChannelError =
  | AccessDeniedException
  | ConflictException
  | DataEncryptionException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | CommonErrors;
/**
 * Updates a contact's contact channel.
 */
export const updateContactChannel: API.OperationMethod<
  UpdateContactChannelRequest,
  UpdateContactChannelResult,
  UpdateContactChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateContactChannelRequest,
  output: UpdateContactChannelResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    DataEncryptionException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContactChannel",
}));

export type UpdateRotationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | IncidentManagerNotOnboarded
  | InvalidRotationArn
  | CommonErrors;
/**
 * Updates the information specified for an on-call rotation.
 */
export const updateRotation: API.OperationMethod<
  UpdateRotationRequest,
  UpdateRotationResult,
  UpdateRotationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRotationRequest,
  output: UpdateRotationResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    IncidentManagerNotOnboarded,
    InvalidRotationArn,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRotation",
}));
