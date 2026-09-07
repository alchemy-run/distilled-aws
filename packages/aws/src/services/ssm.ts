import * as HttpClient from "effect/unstable/http/HttpClient";
import * as redacted from "effect/Redacted";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials as Creds } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const ns = T.XmlNamespace("http://ssm.amazonaws.com/doc/2014-11-06/");
const svc = T.AwsApiService({ sdkId: "SSM", serviceShapeName: "AmazonSSM" });
const auth = T.AwsAuthSigv4({ name: "ssm" });
const ver = T.ServiceVersion("2014-11-06");
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
              `https://ssm-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://ssm.${Region}.amazonaws.com`);
            }
            return e(
              `https://ssm-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://ssm.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://ssm.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  ).pipe(C.withAuthError) {}
export class AlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<AlreadyExistsException>()(
    "AlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "AlreadyExistsException", httpResponseCode: 400 }),
  ).pipe(C.withAlreadyExistsError) {}
export class AssociatedInstances
  extends /*@__PURE__*/ S.TaggedError<AssociatedInstances>()(
    "AssociatedInstances",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "AssociatedInstances", httpResponseCode: 400 }),
  ) {}
export class AssociationAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<AssociationAlreadyExists>()(
    "AssociationAlreadyExists",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "AssociationAlreadyExists",
      httpResponseCode: 400,
    }),
  ).pipe(C.withAlreadyExistsError) {}
export class AssociationDoesNotExist
  extends /*@__PURE__*/ S.TaggedError<AssociationDoesNotExist>()(
    "AssociationDoesNotExist",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "AssociationDoesNotExist", httpResponseCode: 404 }),
  ) {}
export class AssociationExecutionDoesNotExist
  extends /*@__PURE__*/ S.TaggedError<AssociationExecutionDoesNotExist>()(
    "AssociationExecutionDoesNotExist",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "AssociationExecutionDoesNotExist",
      httpResponseCode: 404,
    }),
  ) {}
export class AssociationLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<AssociationLimitExceeded>()(
    "AssociationLimitExceeded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "AssociationLimitExceeded",
      httpResponseCode: 400,
    }),
  ).pipe(C.withThrottlingError) {}
export class AssociationVersionLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<AssociationVersionLimitExceeded>()(
    "AssociationVersionLimitExceeded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "AssociationVersionLimitExceeded",
      httpResponseCode: 400,
    }),
  ).pipe(C.withThrottlingError) {}
export class AutomationDefinitionNotApprovedException
  extends /*@__PURE__*/ S.TaggedError<AutomationDefinitionNotApprovedException>()(
    "AutomationDefinitionNotApprovedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "AutomationDefinitionNotApproved",
      httpResponseCode: 400,
    }),
  ) {}
export class AutomationDefinitionNotFoundException
  extends /*@__PURE__*/ S.TaggedError<AutomationDefinitionNotFoundException>()(
    "AutomationDefinitionNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "AutomationDefinitionNotFound",
      httpResponseCode: 404,
    }),
  ) {}
export class AutomationDefinitionVersionNotFoundException
  extends /*@__PURE__*/ S.TaggedError<AutomationDefinitionVersionNotFoundException>()(
    "AutomationDefinitionVersionNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "AutomationDefinitionVersionNotFound",
      httpResponseCode: 404,
    }),
  ) {}
export class AutomationExecutionLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<AutomationExecutionLimitExceededException>()(
    "AutomationExecutionLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "AutomationExecutionLimitExceeded",
      httpResponseCode: 429,
    }),
  ) {}
export class AutomationExecutionNotFoundException
  extends /*@__PURE__*/ S.TaggedError<AutomationExecutionNotFoundException>()(
    "AutomationExecutionNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "AutomationExecutionNotFound",
      httpResponseCode: 404,
    }),
  ) {}
export class AutomationStepNotFoundException
  extends /*@__PURE__*/ S.TaggedError<AutomationStepNotFoundException>()(
    "AutomationStepNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "AutomationStepNotFoundException",
      httpResponseCode: 404,
    }),
  ) {}
export class ComplianceTypeCountLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ComplianceTypeCountLimitExceededException>()(
    "ComplianceTypeCountLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "ComplianceTypeCountLimitExceeded",
      httpResponseCode: 400,
    }),
  ) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "ConflictException", httpResponseCode: 409 }),
  ) {}
export class CustomSchemaCountLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<CustomSchemaCountLimitExceededException>()(
    "CustomSchemaCountLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "CustomSchemaCountLimitExceeded",
      httpResponseCode: 400,
    }),
  ) {}
export class DocumentAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<DocumentAlreadyExists>()(
    "DocumentAlreadyExists",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "DocumentAlreadyExists", httpResponseCode: 400 }),
  ).pipe(C.withAlreadyExistsError) {}
export class DocumentLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<DocumentLimitExceeded>()(
    "DocumentLimitExceeded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "DocumentLimitExceeded", httpResponseCode: 400 }),
  ).pipe(C.withThrottlingError) {}
export class DocumentPermissionLimit
  extends /*@__PURE__*/ S.TaggedError<DocumentPermissionLimit>()(
    "DocumentPermissionLimit",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "DocumentPermissionLimit", httpResponseCode: 400 }),
  ) {}
export class DocumentVersionLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<DocumentVersionLimitExceeded>()(
    "DocumentVersionLimitExceeded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "DocumentVersionLimitExceeded",
      httpResponseCode: 400,
    }),
  ).pipe(C.withThrottlingError) {}
export class DoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<DoesNotExistException>()(
    "DoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "DoesNotExistException", httpResponseCode: 404 }),
  ) {}
export class DuplicateDocumentContent
  extends /*@__PURE__*/ S.TaggedError<DuplicateDocumentContent>()(
    "DuplicateDocumentContent",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "DuplicateDocumentContent",
      httpResponseCode: 400,
    }),
  ) {}
export class DuplicateDocumentVersionName
  extends /*@__PURE__*/ S.TaggedError<DuplicateDocumentVersionName>()(
    "DuplicateDocumentVersionName",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "DuplicateDocumentVersionName",
      httpResponseCode: 400,
    }),
  ) {}
export class DuplicateInstanceId
  extends /*@__PURE__*/ S.TaggedError<DuplicateInstanceId>()(
    "DuplicateInstanceId",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "DuplicateInstanceId", httpResponseCode: 404 }),
  ) {}
export class FeatureNotAvailableException
  extends /*@__PURE__*/ S.TaggedError<FeatureNotAvailableException>()(
    "FeatureNotAvailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "FeatureNotAvailableException",
      httpResponseCode: 400,
    }),
  ) {}
export class HierarchyLevelLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<HierarchyLevelLimitExceededException>()(
    "HierarchyLevelLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "HierarchyLevelLimitExceededException",
      httpResponseCode: 400,
    }),
  ) {}
export class HierarchyTypeMismatchException
  extends /*@__PURE__*/ S.TaggedError<HierarchyTypeMismatchException>()(
    "HierarchyTypeMismatchException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "HierarchyTypeMismatchException",
      httpResponseCode: 400,
    }),
  ) {}
export class IdempotentParameterMismatch
  extends /*@__PURE__*/ S.TaggedError<IdempotentParameterMismatch>()(
    "IdempotentParameterMismatch",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "IdempotentParameterMismatch",
      httpResponseCode: 400,
    }),
  ).pipe(C.withConflictError) {}
export class IncompatiblePolicyException
  extends /*@__PURE__*/ S.TaggedError<IncompatiblePolicyException>()(
    "IncompatiblePolicyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "IncompatiblePolicyException",
      httpResponseCode: 400,
    }),
  ) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()(
    "InternalServerError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InternalServerError", httpResponseCode: 500 }),
  ) {}
export class InvalidActivation
  extends /*@__PURE__*/ S.TaggedError<InvalidActivation>()(
    "InvalidActivation",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidActivation", httpResponseCode: 404 }),
  ) {}
export class InvalidActivationId
  extends /*@__PURE__*/ S.TaggedError<InvalidActivationId>()(
    "InvalidActivationId",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidActivationId", httpResponseCode: 404 }),
  ) {}
export class InvalidAggregatorException
  extends /*@__PURE__*/ S.TaggedError<InvalidAggregatorException>()(
    "InvalidAggregatorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidAggregator", httpResponseCode: 400 }),
  ) {}
export class InvalidAllowedPatternException
  extends /*@__PURE__*/ S.TaggedError<InvalidAllowedPatternException>()(
    "InvalidAllowedPatternException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "InvalidAllowedPatternException",
      httpResponseCode: 400,
    }),
  ) {}
export class InvalidAssociation
  extends /*@__PURE__*/ S.TaggedError<InvalidAssociation>()(
    "InvalidAssociation",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidAssociation", httpResponseCode: 400 }),
  ) {}
export class InvalidAssociationVersion
  extends /*@__PURE__*/ S.TaggedError<InvalidAssociationVersion>()(
    "InvalidAssociationVersion",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "InvalidAssociationVersion",
      httpResponseCode: 400,
    }),
  ) {}
export class InvalidAutomationExecutionParametersException
  extends /*@__PURE__*/ S.TaggedError<InvalidAutomationExecutionParametersException>()(
    "InvalidAutomationExecutionParametersException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "InvalidAutomationExecutionParameters",
      httpResponseCode: 400,
    }),
  ) {}
export class InvalidAutomationSignalException
  extends /*@__PURE__*/ S.TaggedError<InvalidAutomationSignalException>()(
    "InvalidAutomationSignalException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "InvalidAutomationSignalException",
      httpResponseCode: 400,
    }),
  ) {}
export class InvalidAutomationStatusUpdateException
  extends /*@__PURE__*/ S.TaggedError<InvalidAutomationStatusUpdateException>()(
    "InvalidAutomationStatusUpdateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "InvalidAutomationStatusUpdateException",
      httpResponseCode: 400,
    }),
  ) {}
export class InvalidCommandId
  extends /*@__PURE__*/ S.TaggedError<InvalidCommandId>()(
    "InvalidCommandId",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidCommandId", httpResponseCode: 404 }),
  ) {}
export class InvalidDeleteInventoryParametersException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeleteInventoryParametersException>()(
    "InvalidDeleteInventoryParametersException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "InvalidDeleteInventoryParameters",
      httpResponseCode: 400,
    }),
  ) {}
export class InvalidDeletionIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeletionIdException>()(
    "InvalidDeletionIdException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidDeletionId", httpResponseCode: 400 }),
  ) {}
export class InvalidDocument
  extends /*@__PURE__*/ S.TaggedError<InvalidDocument>()(
    "InvalidDocument",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidDocument", httpResponseCode: 404 }),
  ) {}
export class InvalidDocumentContent
  extends /*@__PURE__*/ S.TaggedError<InvalidDocumentContent>()(
    "InvalidDocumentContent",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidDocumentContent", httpResponseCode: 400 }),
  ) {}
export class InvalidDocumentOperation
  extends /*@__PURE__*/ S.TaggedError<InvalidDocumentOperation>()(
    "InvalidDocumentOperation",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "InvalidDocumentOperation",
      httpResponseCode: 403,
    }),
  ) {}
export class InvalidDocumentSchemaVersion
  extends /*@__PURE__*/ S.TaggedError<InvalidDocumentSchemaVersion>()(
    "InvalidDocumentSchemaVersion",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "InvalidDocumentSchemaVersion",
      httpResponseCode: 400,
    }),
  ) {}
export class InvalidDocumentType
  extends /*@__PURE__*/ S.TaggedError<InvalidDocumentType>()(
    "InvalidDocumentType",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidDocumentType", httpResponseCode: 400 }),
  ) {}
export class InvalidDocumentVersion
  extends /*@__PURE__*/ S.TaggedError<InvalidDocumentVersion>()(
    "InvalidDocumentVersion",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidDocumentVersion", httpResponseCode: 400 }),
  ) {}
export class InvalidFilter
  extends /*@__PURE__*/ S.TaggedError<InvalidFilter>()(
    "InvalidFilter",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidFilter", httpResponseCode: 441 }),
  ) {}
export class InvalidFilterKey
  extends /*@__PURE__*/ S.TaggedError<InvalidFilterKey>()(
    "InvalidFilterKey",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidFilterKey", httpResponseCode: 400 }),
  ) {}
export class InvalidFilterOption
  extends /*@__PURE__*/ S.TaggedError<InvalidFilterOption>()(
    "InvalidFilterOption",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidFilterOption", httpResponseCode: 400 }),
  ) {}
export class InvalidFilterValue
  extends /*@__PURE__*/ S.TaggedError<InvalidFilterValue>()(
    "InvalidFilterValue",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidFilterValue", httpResponseCode: 400 }),
  ) {}
export class InvalidInstanceId
  extends /*@__PURE__*/ S.TaggedError<InvalidInstanceId>()(
    "InvalidInstanceId",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidInstanceId", httpResponseCode: 404 }),
  ) {}
export class InvalidInstanceInformationFilterValue
  extends /*@__PURE__*/ S.TaggedError<InvalidInstanceInformationFilterValue>()(
    "InvalidInstanceInformationFilterValue",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "InvalidInstanceInformationFilterValue",
      httpResponseCode: 400,
    }),
  ) {}
export class InvalidInstancePropertyFilterValue
  extends /*@__PURE__*/ S.TaggedError<InvalidInstancePropertyFilterValue>()(
    "InvalidInstancePropertyFilterValue",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "InvalidInstancePropertyFilterValue",
      httpResponseCode: 400,
    }),
  ) {}
export class InvalidInventoryGroupException
  extends /*@__PURE__*/ S.TaggedError<InvalidInventoryGroupException>()(
    "InvalidInventoryGroupException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidInventoryGroup", httpResponseCode: 400 }),
  ) {}
export class InvalidInventoryItemContextException
  extends /*@__PURE__*/ S.TaggedError<InvalidInventoryItemContextException>()(
    "InvalidInventoryItemContextException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "InvalidInventoryItemContext",
      httpResponseCode: 400,
    }),
  ) {}
export class InvalidInventoryRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidInventoryRequestException>()(
    "InvalidInventoryRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidInventoryRequest", httpResponseCode: 400 }),
  ) {}
export class InvalidItemContentException
  extends /*@__PURE__*/ S.TaggedError<InvalidItemContentException>()(
    "InvalidItemContentException",
    {
      TypeName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.AwsQueryError({ code: "InvalidItemContent", httpResponseCode: 400 }),
  ) {}
export class InvalidKeyId
  extends /*@__PURE__*/ S.TaggedError<InvalidKeyId>()(
    "InvalidKeyId",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidKeyId", httpResponseCode: 400 }),
  ) {}
export class InvalidNextToken
  extends /*@__PURE__*/ S.TaggedError<InvalidNextToken>()(
    "InvalidNextToken",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidNextToken", httpResponseCode: 400 }),
  ) {}
export class InvalidNotificationConfig
  extends /*@__PURE__*/ S.TaggedError<InvalidNotificationConfig>()(
    "InvalidNotificationConfig",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "InvalidNotificationConfig",
      httpResponseCode: 400,
    }),
  ) {}
export class InvalidOptionException
  extends /*@__PURE__*/ S.TaggedError<InvalidOptionException>()(
    "InvalidOptionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidOption", httpResponseCode: 400 }),
  ) {}
export class InvalidOutputFolder
  extends /*@__PURE__*/ S.TaggedError<InvalidOutputFolder>()(
    "InvalidOutputFolder",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidOutputFolder", httpResponseCode: 400 }),
  ) {}
export class InvalidOutputLocation
  extends /*@__PURE__*/ S.TaggedError<InvalidOutputLocation>()(
    "InvalidOutputLocation",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidOutputLocation", httpResponseCode: 400 }),
  ) {}
export class InvalidParameters
  extends /*@__PURE__*/ S.TaggedError<InvalidParameters>()(
    "InvalidParameters",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidParameters", httpResponseCode: 400 }),
  ) {}
export class InvalidPermissionType
  extends /*@__PURE__*/ S.TaggedError<InvalidPermissionType>()(
    "InvalidPermissionType",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidPermissionType", httpResponseCode: 400 }),
  ) {}
export class InvalidPluginName
  extends /*@__PURE__*/ S.TaggedError<InvalidPluginName>()(
    "InvalidPluginName",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidPluginName", httpResponseCode: 404 }),
  ) {}
export class InvalidPolicyAttributeException
  extends /*@__PURE__*/ S.TaggedError<InvalidPolicyAttributeException>()(
    "InvalidPolicyAttributeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "InvalidPolicyAttributeException",
      httpResponseCode: 400,
    }),
  ) {}
export class InvalidPolicyTypeException
  extends /*@__PURE__*/ S.TaggedError<InvalidPolicyTypeException>()(
    "InvalidPolicyTypeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "InvalidPolicyTypeException",
      httpResponseCode: 400,
    }),
  ) {}
export class InvalidResourceId
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceId>()(
    "InvalidResourceId",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidResourceId", httpResponseCode: 400 }),
  ) {}
export class InvalidResourceType
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceType>()(
    "InvalidResourceType",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidResourceType", httpResponseCode: 400 }),
  ) {}
export class InvalidResultAttributeException
  extends /*@__PURE__*/ S.TaggedError<InvalidResultAttributeException>()(
    "InvalidResultAttributeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidResultAttribute", httpResponseCode: 400 }),
  ) {}
export class InvalidRole
  extends /*@__PURE__*/ S.TaggedError<InvalidRole>()(
    "InvalidRole",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidRole", httpResponseCode: 400 }),
  ) {}
export class InvalidSchedule
  extends /*@__PURE__*/ S.TaggedError<InvalidSchedule>()(
    "InvalidSchedule",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidSchedule", httpResponseCode: 400 }),
  ) {}
export class InvalidTag
  extends /*@__PURE__*/ S.TaggedError<InvalidTag>()(
    "InvalidTag",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidTag", httpResponseCode: 400 }),
  ) {}
export class InvalidTarget
  extends /*@__PURE__*/ S.TaggedError<InvalidTarget>()(
    "InvalidTarget",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidTarget", httpResponseCode: 400 }),
  ) {}
export class InvalidTargetMaps
  extends /*@__PURE__*/ S.TaggedError<InvalidTargetMaps>()(
    "InvalidTargetMaps",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidTargetMaps", httpResponseCode: 400 }),
  ) {}
export class InvalidTypeNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidTypeNameException>()(
    "InvalidTypeNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidTypeName", httpResponseCode: 400 }),
  ) {}
export class InvalidUpdate
  extends /*@__PURE__*/ S.TaggedError<InvalidUpdate>()(
    "InvalidUpdate",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvalidUpdate", httpResponseCode: 400 }),
  ) {}
export class InvocationDoesNotExist
  extends /*@__PURE__*/ S.TaggedError<InvocationDoesNotExist>()(
    "InvocationDoesNotExist",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "InvocationDoesNotExist", httpResponseCode: 400 }),
  ) {}
export class ItemContentMismatchException
  extends /*@__PURE__*/ S.TaggedError<ItemContentMismatchException>()(
    "ItemContentMismatchException",
    {
      TypeName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.AwsQueryError({ code: "ItemContentMismatch", httpResponseCode: 400 }),
  ) {}
export class ItemSizeLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ItemSizeLimitExceededException>()(
    "ItemSizeLimitExceededException",
    {
      TypeName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.AwsQueryError({ code: "ItemSizeLimitExceeded", httpResponseCode: 400 }),
  ) {}
export class MalformedResourcePolicyDocumentException
  extends /*@__PURE__*/ S.TaggedError<MalformedResourcePolicyDocumentException>()(
    "MalformedResourcePolicyDocumentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "MalformedResourcePolicyDocumentException",
      httpResponseCode: 400,
    }),
  ) {}
export class MaxDocumentSizeExceeded
  extends /*@__PURE__*/ S.TaggedError<MaxDocumentSizeExceeded>()(
    "MaxDocumentSizeExceeded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "MaxDocumentSizeExceeded", httpResponseCode: 400 }),
  ) {}
export class NoLongerSupportedException
  extends /*@__PURE__*/ S.TaggedError<NoLongerSupportedException>()(
    "NoLongerSupportedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "NoLongerSupported", httpResponseCode: 400 }),
  ) {}
export class OpsItemAccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<OpsItemAccessDeniedException>()(
    "OpsItemAccessDeniedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "OpsItemAccessDeniedException",
      httpResponseCode: 403,
    }),
  ).pipe(C.withAuthError) {}
export class OpsItemAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<OpsItemAlreadyExistsException>()(
    "OpsItemAlreadyExistsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      OpsItemId: S.optional(S.String),
    },
    T.AwsQueryError({
      code: "OpsItemAlreadyExistsException",
      httpResponseCode: 400,
    }),
  ).pipe(C.withAlreadyExistsError) {}
export class OpsItemConflictException
  extends /*@__PURE__*/ S.TaggedError<OpsItemConflictException>()(
    "OpsItemConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "OpsItemConflictException",
      httpResponseCode: 409,
    }),
  ) {}
export class OpsItemInvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<OpsItemInvalidParameterException>()(
    "OpsItemInvalidParameterException",
    {
      ParameterNames: S.optional(
        S.suspend(() => OpsItemParameterNamesList).annotate({
          identifier: "OpsItemParameterNamesList",
        }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.AwsQueryError({
      code: "OpsItemInvalidParameterException",
      httpResponseCode: 400,
    }),
  ) {}
export class OpsItemLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<OpsItemLimitExceededException>()(
    "OpsItemLimitExceededException",
    {
      ResourceTypes: S.optional(
        S.suspend(() => OpsItemParameterNamesList).annotate({
          identifier: "OpsItemParameterNamesList",
        }),
      ),
      Limit: S.optional(S.Number),
      LimitType: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.AwsQueryError({
      code: "OpsItemLimitExceededException",
      httpResponseCode: 400,
    }),
  ) {}
export class OpsItemNotFoundException
  extends /*@__PURE__*/ S.TaggedError<OpsItemNotFoundException>()(
    "OpsItemNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "OpsItemNotFoundException",
      httpResponseCode: 400,
    }),
  ) {}
export class OpsItemRelatedItemAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<OpsItemRelatedItemAlreadyExistsException>()(
    "OpsItemRelatedItemAlreadyExistsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceUri: S.optional(S.String),
      OpsItemId: S.optional(S.String),
    },
    T.AwsQueryError({
      code: "OpsItemRelatedItemAlreadyExistsException",
      httpResponseCode: 400,
    }),
  ).pipe(C.withAlreadyExistsError) {}
export class OpsItemRelatedItemAssociationNotFoundException
  extends /*@__PURE__*/ S.TaggedError<OpsItemRelatedItemAssociationNotFoundException>()(
    "OpsItemRelatedItemAssociationNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "OpsItemRelatedItemAssociationNotFoundException",
      httpResponseCode: 400,
    }),
  ) {}
export class OpsMetadataAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<OpsMetadataAlreadyExistsException>()(
    "OpsMetadataAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "OpsMetadataAlreadyExistsException",
      httpResponseCode: 400,
    }),
  ).pipe(C.withAlreadyExistsError) {}
export class OpsMetadataInvalidArgumentException
  extends /*@__PURE__*/ S.TaggedError<OpsMetadataInvalidArgumentException>()(
    "OpsMetadataInvalidArgumentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "OpsMetadataInvalidArgumentException",
      httpResponseCode: 400,
    }),
  ) {}
export class OpsMetadataKeyLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<OpsMetadataKeyLimitExceededException>()(
    "OpsMetadataKeyLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "OpsMetadataKeyLimitExceededException",
      httpResponseCode: 429,
    }),
  ) {}
export class OpsMetadataLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<OpsMetadataLimitExceededException>()(
    "OpsMetadataLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "OpsMetadataLimitExceededException",
      httpResponseCode: 429,
    }),
  ) {}
export class OpsMetadataNotFoundException
  extends /*@__PURE__*/ S.TaggedError<OpsMetadataNotFoundException>()(
    "OpsMetadataNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "OpsMetadataNotFoundException",
      httpResponseCode: 404,
    }),
  ) {}
export class OpsMetadataTooManyUpdatesException
  extends /*@__PURE__*/ S.TaggedError<OpsMetadataTooManyUpdatesException>()(
    "OpsMetadataTooManyUpdatesException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "OpsMetadataTooManyUpdatesException",
      httpResponseCode: 429,
    }),
  ) {}
export class ParameterAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<ParameterAlreadyExists>()(
    "ParameterAlreadyExists",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "ParameterAlreadyExists", httpResponseCode: 400 }),
  ).pipe(C.withAlreadyExistsError) {}
export class ParameterLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<ParameterLimitExceeded>()(
    "ParameterLimitExceeded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "ParameterLimitExceeded", httpResponseCode: 429 }),
  ).pipe(C.withThrottlingError) {}
export class ParameterMaxVersionLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<ParameterMaxVersionLimitExceeded>()(
    "ParameterMaxVersionLimitExceeded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "ParameterMaxVersionLimitExceeded",
      httpResponseCode: 400,
    }),
  ).pipe(C.withThrottlingError) {}
export class ParameterNotFound
  extends /*@__PURE__*/ S.TaggedError<ParameterNotFound>()(
    "ParameterNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "ParameterNotFound", httpResponseCode: 404 }),
  ) {}
export class ParameterPatternMismatchException
  extends /*@__PURE__*/ S.TaggedError<ParameterPatternMismatchException>()(
    "ParameterPatternMismatchException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "ParameterPatternMismatchException",
      httpResponseCode: 400,
    }),
  ) {}
export class ParameterVersionLabelLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<ParameterVersionLabelLimitExceeded>()(
    "ParameterVersionLabelLimitExceeded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "ParameterVersionLabelLimitExceeded",
      httpResponseCode: 400,
    }),
  ).pipe(C.withThrottlingError) {}
export class ParameterVersionNotFound
  extends /*@__PURE__*/ S.TaggedError<ParameterVersionNotFound>()(
    "ParameterVersionNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "ParameterVersionNotFound",
      httpResponseCode: 400,
    }),
  ) {}
export class PoliciesLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<PoliciesLimitExceededException>()(
    "PoliciesLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "PoliciesLimitExceededException",
      httpResponseCode: 400,
    }),
  ) {}
export class ResourceDataSyncAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceDataSyncAlreadyExistsException>()(
    "ResourceDataSyncAlreadyExistsException",
    {
      SyncName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.AwsQueryError({
      code: "ResourceDataSyncAlreadyExists",
      httpResponseCode: 400,
    }),
  ).pipe(C.withAlreadyExistsError) {}
export class ResourceDataSyncConflictException
  extends /*@__PURE__*/ S.TaggedError<ResourceDataSyncConflictException>()(
    "ResourceDataSyncConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "ResourceDataSyncConflictException",
      httpResponseCode: 409,
    }),
  ) {}
export class ResourceDataSyncCountExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceDataSyncCountExceededException>()(
    "ResourceDataSyncCountExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "ResourceDataSyncCountExceeded",
      httpResponseCode: 400,
    }),
  ) {}
export class ResourceDataSyncInvalidConfigurationException
  extends /*@__PURE__*/ S.TaggedError<ResourceDataSyncInvalidConfigurationException>()(
    "ResourceDataSyncInvalidConfigurationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "ResourceDataSyncInvalidConfiguration",
      httpResponseCode: 400,
    }),
  ) {}
export class ResourceDataSyncNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceDataSyncNotFoundException>()(
    "ResourceDataSyncNotFoundException",
    {
      SyncName: S.optional(S.String),
      SyncType: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.AwsQueryError({
      code: "ResourceDataSyncNotFound",
      httpResponseCode: 404,
    }),
  ) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "ResourceInUseException", httpResponseCode: 400 }),
  ) {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceLimitExceededException>()(
    "ResourceLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "ResourceLimitExceededException",
      httpResponseCode: 400,
    }),
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "ResourceNotFoundException",
      httpResponseCode: 404,
    }),
  ) {}
export class ResourcePolicyConflictException
  extends /*@__PURE__*/ S.TaggedError<ResourcePolicyConflictException>()(
    "ResourcePolicyConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "ResourcePolicyConflictException",
      httpResponseCode: 400,
    }),
  ) {}
export class ResourcePolicyInvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<ResourcePolicyInvalidParameterException>()(
    "ResourcePolicyInvalidParameterException",
    {
      ParameterNames: S.optional(
        S.suspend(() => ResourcePolicyParameterNamesList).annotate({
          identifier: "ResourcePolicyParameterNamesList",
        }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.AwsQueryError({
      code: "ResourcePolicyInvalidParameterException",
      httpResponseCode: 400,
    }),
  ) {}
export class ResourcePolicyLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourcePolicyLimitExceededException>()(
    "ResourcePolicyLimitExceededException",
    {
      Limit: S.optional(S.Number),
      LimitType: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.AwsQueryError({
      code: "ResourcePolicyLimitExceededException",
      httpResponseCode: 400,
    }),
  ) {}
export class ResourcePolicyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourcePolicyNotFoundException>()(
    "ResourcePolicyNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "ResourcePolicyNotFoundException",
      httpResponseCode: 404,
    }),
  ) {}
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
  ) {}
export class ServiceSettingNotFound
  extends /*@__PURE__*/ S.TaggedError<ServiceSettingNotFound>()(
    "ServiceSettingNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "ServiceSettingNotFound", httpResponseCode: 400 }),
  ) {}
export class StatusUnchanged
  extends /*@__PURE__*/ S.TaggedError<StatusUnchanged>()(
    "StatusUnchanged",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "StatusUnchanged", httpResponseCode: 400 }),
  ) {}
export class SubTypeCountLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<SubTypeCountLimitExceededException>()(
    "SubTypeCountLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "SubTypeCountLimitExceeded",
      httpResponseCode: 400,
    }),
  ) {}
export class TargetInUseException
  extends /*@__PURE__*/ S.TaggedError<TargetInUseException>()(
    "TargetInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "TargetInUseException", httpResponseCode: 400 }),
  ) {}
export class TargetNotConnected
  extends /*@__PURE__*/ S.TaggedError<TargetNotConnected>()(
    "TargetNotConnected",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "TargetNotConnected", httpResponseCode: 430 }),
  ) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      QuotaCode: S.optional(S.String),
      ServiceCode: S.optional(S.String),
    },
  ) {}
export class TooManyTagsError
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsError>()(
    "TooManyTagsError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "TooManyTagsError", httpResponseCode: 400 }),
  ) {}
export class TooManyUpdates
  extends /*@__PURE__*/ S.TaggedError<TooManyUpdates>()(
    "TooManyUpdates",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "TooManyUpdates", httpResponseCode: 429 }),
  ) {}
export class TotalSizeLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<TotalSizeLimitExceededException>()(
    "TotalSizeLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "TotalSizeLimitExceeded", httpResponseCode: 400 }),
  ) {}
export class UnsupportedCalendarException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedCalendarException>()(
    "UnsupportedCalendarException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "UnsupportedCalendarException",
      httpResponseCode: 400,
    }),
  ) {}
export class UnsupportedFeatureRequiredException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedFeatureRequiredException>()(
    "UnsupportedFeatureRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "UnsupportedFeatureRequiredException",
      httpResponseCode: 400,
    }),
  ) {}
export class UnsupportedInventoryItemContextException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedInventoryItemContextException>()(
    "UnsupportedInventoryItemContextException",
    {
      TypeName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.AwsQueryError({
      code: "UnsupportedInventoryItemContext",
      httpResponseCode: 400,
    }),
  ) {}
export class UnsupportedInventorySchemaVersionException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedInventorySchemaVersionException>()(
    "UnsupportedInventorySchemaVersionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "UnsupportedInventorySchemaVersion",
      httpResponseCode: 400,
    }),
  ) {}
export class UnsupportedOperatingSystem
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperatingSystem>()(
    "UnsupportedOperatingSystem",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "UnsupportedOperatingSystem",
      httpResponseCode: 400,
    }),
  ) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "UnsupportedOperation", httpResponseCode: 400 }),
  ) {}
export class UnsupportedParameterType
  extends /*@__PURE__*/ S.TaggedError<UnsupportedParameterType>()(
    "UnsupportedParameterType",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({
      code: "UnsupportedParameterType",
      httpResponseCode: 400,
    }),
  ) {}
export class UnsupportedPlatformType
  extends /*@__PURE__*/ S.TaggedError<UnsupportedPlatformType>()(
    "UnsupportedPlatformType",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.AwsQueryError({ code: "UnsupportedPlatformType", httpResponseCode: 400 }),
  ) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ReasonCode: S.optional(S.String),
    },
    T.AwsQueryError({ code: "ValidationException", httpResponseCode: 400 }),
  ) {}
export type ResourceTypeForTagging =
  | "Document"
  | "ManagedInstance"
  | "MaintenanceWindow"
  | "Parameter"
  | "PatchBaseline"
  | "OpsItem"
  | "OpsMetadata"
  | "Automation"
  | "Association"
  | "CloudConnector"
  | (string & {});
export const ResourceTypeForTagging = S.String;

export type ResourceId = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface AddTagsToResourceRequest {
  ResourceType: ResourceTypeForTagging;
  ResourceId: string;
  Tags: Tag[];
}
export const AddTagsToResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceType: ResourceTypeForTagging,
    ResourceId: S.String,
    Tags: TagList,
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
  identifier: "AddTagsToResourceRequest",
}) as any as S.Schema<AddTagsToResourceRequest>;
export interface AddTagsToResourceResult {}
export const AddTagsToResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AddTagsToResourceResult",
}) as any as S.Schema<AddTagsToResourceResult>;
export type OpsItemId = string;
export type OpsItemRelatedItemAssociationType = string;
export type OpsItemRelatedItemAssociationResourceType = string;
export type OpsItemRelatedItemAssociationResourceUri = string;
export interface AssociateOpsItemRelatedItemRequest {
  OpsItemId: string;
  AssociationType: string;
  ResourceType: string;
  ResourceUri: string;
}
export const AssociateOpsItemRelatedItemRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OpsItemId: S.String,
    AssociationType: S.String,
    ResourceType: S.String,
    ResourceUri: S.String,
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
  identifier: "AssociateOpsItemRelatedItemRequest",
}) as any as S.Schema<AssociateOpsItemRelatedItemRequest>;
export type OpsItemRelatedItemAssociationId = string;
export interface AssociateOpsItemRelatedItemResponse {
  AssociationId?: string;
}
export const AssociateOpsItemRelatedItemResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AssociationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "AssociateOpsItemRelatedItemResponse",
}) as any as S.Schema<AssociateOpsItemRelatedItemResponse>;
export type CommandId = string;
export type InstanceId = string;
export type InstanceIdList = string[];
export const InstanceIdList = /*@__PURE__*/ S.Array(S.String);
export interface CancelCommandRequest {
  CommandId: string;
  InstanceIds?: string[];
}
export const CancelCommandRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CommandId: S.String,
    InstanceIds: S.optional(InstanceIdList),
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
  identifier: "CancelCommandRequest",
}) as any as S.Schema<CancelCommandRequest>;
export interface CancelCommandResult {}
export const CancelCommandResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CancelCommandResult",
}) as any as S.Schema<CancelCommandResult>;
export type MaintenanceWindowExecutionId = string;
export interface CancelMaintenanceWindowExecutionRequest {
  WindowExecutionId: string;
}
export const CancelMaintenanceWindowExecutionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ WindowExecutionId: S.String }).pipe(
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
  identifier: "CancelMaintenanceWindowExecutionRequest",
}) as any as S.Schema<CancelMaintenanceWindowExecutionRequest>;
export interface CancelMaintenanceWindowExecutionResult {
  WindowExecutionId?: string;
}
export const CancelMaintenanceWindowExecutionResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ WindowExecutionId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CancelMaintenanceWindowExecutionResult",
}) as any as S.Schema<CancelMaintenanceWindowExecutionResult>;
export type ActivationDescription = string;
export type DefaultInstanceName = string;
export type IamRole = string;
export type RegistrationLimit = number;
export type ExpirationDate = Date;
export type RegistrationMetadataKey = string;
export type RegistrationMetadataValue = string;
export interface RegistrationMetadataItem {
  Key: string;
  Value: string;
}
export const RegistrationMetadataItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({
  identifier: "RegistrationMetadataItem",
}) as any as S.Schema<RegistrationMetadataItem>;
export type RegistrationMetadataList = RegistrationMetadataItem[];
export const RegistrationMetadataList = /*@__PURE__*/ S.Array(
  RegistrationMetadataItem,
);
export interface CreateActivationRequest {
  Description?: string;
  DefaultInstanceName?: string;
  IamRole: string;
  RegistrationLimit?: number;
  ExpirationDate?: Date;
  Tags?: Tag[];
  RegistrationMetadata?: RegistrationMetadataItem[];
}
export const CreateActivationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    DefaultInstanceName: S.optional(S.String),
    IamRole: S.String,
    RegistrationLimit: S.optional(S.Number),
    ExpirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Tags: S.optional(TagList),
    RegistrationMetadata: S.optional(RegistrationMetadataList),
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
  identifier: "CreateActivationRequest",
}) as any as S.Schema<CreateActivationRequest>;
export type ActivationId = string;
export type ActivationCode = string;
export interface CreateActivationResult {
  ActivationId?: string;
  ActivationCode?: string;
}
export const CreateActivationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActivationId: S.optional(S.String),
    ActivationCode: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateActivationResult",
}) as any as S.Schema<CreateActivationResult>;
export type DocumentARN = string;
export type DocumentVersion = string;
export type ParameterName = string;
export type ParameterValue = string;
export type ParameterValueList = string[];
export const ParameterValueList = /*@__PURE__*/ S.Array(S.String);
export type Parameters = { [key: string]: string[] | undefined };
export const Parameters = /*@__PURE__*/ S.Record(
  S.String,
  ParameterValueList.pipe(S.optional),
);
export type TargetKey = string;
export type TargetValue = string;
export type TargetValues = string[];
export const TargetValues = /*@__PURE__*/ S.Array(S.String);
export interface Target {
  Key?: string;
  Values?: string[];
}
export const Target = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Values: S.optional(TargetValues) }),
).annotate({ identifier: "Target" }) as any as S.Schema<Target>;
export type Targets = Target[];
export const Targets = /*@__PURE__*/ S.Array(Target);
export type ScheduleExpression = string;
export type S3Region = string;
export type S3BucketName = string;
export type S3KeyPrefix = string;
export interface S3OutputLocation {
  OutputS3Region?: string;
  OutputS3BucketName?: string;
  OutputS3KeyPrefix?: string;
}
export const S3OutputLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutputS3Region: S.optional(S.String),
    OutputS3BucketName: S.optional(S.String),
    OutputS3KeyPrefix: S.optional(S.String),
  }),
).annotate({
  identifier: "S3OutputLocation",
}) as any as S.Schema<S3OutputLocation>;
export interface InstanceAssociationOutputLocation {
  S3Location?: S3OutputLocation;
}
export const InstanceAssociationOutputLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Location: S.optional(S3OutputLocation) }),
).annotate({
  identifier: "InstanceAssociationOutputLocation",
}) as any as S.Schema<InstanceAssociationOutputLocation>;
export type AssociationName = string;
export type AutomationTargetParameterName = string;
export type MaxErrors = string;
export type MaxConcurrency = string;
export type AssociationComplianceSeverity =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "UNSPECIFIED"
  | (string & {});
export const AssociationComplianceSeverity = S.String;

export type AssociationSyncCompliance = "AUTO" | "MANUAL" | (string & {});
export const AssociationSyncCompliance = S.String;

export type ApplyOnlyAtCronInterval = boolean;
export type CalendarNameOrARN = string;
export type CalendarNameOrARNList = string[];
export const CalendarNameOrARNList = /*@__PURE__*/ S.Array(S.String);
export type Account = string;
export type Accounts = string[];
export const Accounts = /*@__PURE__*/ S.Array(S.String);
export type Region = string;
export type Regions = string[];
export const Regions = /*@__PURE__*/ S.Array(S.String);
export type ExecutionRoleName = string;
export type AlarmName = string;
export interface Alarm {
  Name: string;
}
export const Alarm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({ identifier: "Alarm" }) as any as S.Schema<Alarm>;
export type AlarmList = Alarm[];
export const AlarmList = /*@__PURE__*/ S.Array(Alarm);
export interface AlarmConfiguration {
  IgnorePollAlarmFailure?: boolean;
  Alarms: Alarm[];
}
export const AlarmConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IgnorePollAlarmFailure: S.optional(S.Boolean),
    Alarms: AlarmList,
  }),
).annotate({
  identifier: "AlarmConfiguration",
}) as any as S.Schema<AlarmConfiguration>;
export type ExcludeAccount = string;
export type ExcludeAccounts = string[];
export const ExcludeAccounts = /*@__PURE__*/ S.Array(S.String);
export type AutomationTargets = Target[];
export const AutomationTargets = /*@__PURE__*/ S.Array(Target);
export interface TargetLocation {
  Accounts?: string[];
  Regions?: string[];
  TargetLocationMaxConcurrency?: string;
  TargetLocationMaxErrors?: string;
  ExecutionRoleName?: string;
  TargetLocationAlarmConfiguration?: AlarmConfiguration;
  IncludeChildOrganizationUnits?: boolean;
  ExcludeAccounts?: string[];
  Targets?: Target[];
  TargetsMaxConcurrency?: string;
  TargetsMaxErrors?: string;
}
export const TargetLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Accounts: S.optional(Accounts),
    Regions: S.optional(Regions),
    TargetLocationMaxConcurrency: S.optional(S.String),
    TargetLocationMaxErrors: S.optional(S.String),
    ExecutionRoleName: S.optional(S.String),
    TargetLocationAlarmConfiguration: S.optional(AlarmConfiguration),
    IncludeChildOrganizationUnits: S.optional(S.Boolean),
    ExcludeAccounts: S.optional(ExcludeAccounts),
    Targets: S.optional(AutomationTargets),
    TargetsMaxConcurrency: S.optional(S.String),
    TargetsMaxErrors: S.optional(S.String),
  }),
).annotate({ identifier: "TargetLocation" }) as any as S.Schema<TargetLocation>;
export type TargetLocations = TargetLocation[];
export const TargetLocations = /*@__PURE__*/ S.Array(TargetLocation);
export type ScheduleOffset = number;
export type Duration = number;
export type TargetMapKey = string;
export type TargetMapValue = string;
export type TargetMapValueList = string[];
export const TargetMapValueList = /*@__PURE__*/ S.Array(S.String);
export type TargetMap = { [key: string]: string[] | undefined };
export const TargetMap = /*@__PURE__*/ S.Record(
  S.String,
  TargetMapValueList.pipe(S.optional),
);
export type TargetMaps = { [key: string]: string[] | undefined }[];
export const TargetMaps = /*@__PURE__*/ S.Array(TargetMap);
export type AssociationDispatchAssumeRoleArn = string;
export interface CreateAssociationRequest {
  Name: string;
  DocumentVersion?: string;
  InstanceId?: string;
  Parameters?: { [key: string]: string[] | undefined };
  Targets?: Target[];
  ScheduleExpression?: string;
  OutputLocation?: InstanceAssociationOutputLocation;
  AssociationName?: string;
  AutomationTargetParameterName?: string;
  MaxErrors?: string;
  MaxConcurrency?: string;
  ComplianceSeverity?: AssociationComplianceSeverity;
  SyncCompliance?: AssociationSyncCompliance;
  ApplyOnlyAtCronInterval?: boolean;
  CalendarNames?: string[];
  TargetLocations?: TargetLocation[];
  ScheduleOffset?: number;
  Duration?: number;
  TargetMaps?: { [key: string]: string[] | undefined }[];
  Tags?: Tag[];
  AlarmConfiguration?: AlarmConfiguration;
  AssociationDispatchAssumeRole?: string;
}
export const CreateAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    DocumentVersion: S.optional(S.String),
    InstanceId: S.optional(S.String),
    Parameters: S.optional(Parameters),
    Targets: S.optional(Targets),
    ScheduleExpression: S.optional(S.String),
    OutputLocation: S.optional(InstanceAssociationOutputLocation),
    AssociationName: S.optional(S.String),
    AutomationTargetParameterName: S.optional(S.String),
    MaxErrors: S.optional(S.String),
    MaxConcurrency: S.optional(S.String),
    ComplianceSeverity: S.optional(AssociationComplianceSeverity),
    SyncCompliance: S.optional(AssociationSyncCompliance),
    ApplyOnlyAtCronInterval: S.optional(S.Boolean),
    CalendarNames: S.optional(CalendarNameOrARNList),
    TargetLocations: S.optional(TargetLocations),
    ScheduleOffset: S.optional(S.Number),
    Duration: S.optional(S.Number),
    TargetMaps: S.optional(TargetMaps),
    Tags: S.optional(TagList),
    AlarmConfiguration: S.optional(AlarmConfiguration),
    AssociationDispatchAssumeRole: S.optional(S.String),
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
  identifier: "CreateAssociationRequest",
}) as any as S.Schema<CreateAssociationRequest>;
export type AssociationVersion = string;
export type AssociationStatusName =
  | "Pending"
  | "Success"
  | "Failed"
  | (string & {});
export const AssociationStatusName = S.String;

export type StatusMessage = string;
export type StatusAdditionalInfo = string;
export interface AssociationStatus {
  Date: Date;
  Name: AssociationStatusName;
  Message: string;
  AdditionalInfo?: string;
}
export const AssociationStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Date: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Name: AssociationStatusName,
    Message: S.String,
    AdditionalInfo: S.optional(S.String),
  }),
).annotate({
  identifier: "AssociationStatus",
}) as any as S.Schema<AssociationStatus>;
export type StatusName = string;
export type InstanceCount = number;
export type AssociationStatusAggregatedCount = {
  [key: string]: number | undefined;
};
export const AssociationStatusAggregatedCount = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export interface AssociationOverview {
  Status?: string;
  DetailedStatus?: string;
  AssociationStatusAggregatedCount?: { [key: string]: number | undefined };
}
export const AssociationOverview = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(S.String),
    DetailedStatus: S.optional(S.String),
    AssociationStatusAggregatedCount: S.optional(
      AssociationStatusAggregatedCount,
    ),
  }),
).annotate({
  identifier: "AssociationOverview",
}) as any as S.Schema<AssociationOverview>;
export type AssociationId = string;
export type ExternalAlarmState = "UNKNOWN" | "ALARM" | (string & {});
export const ExternalAlarmState = S.String;

export interface AlarmStateInformation {
  Name: string;
  State: ExternalAlarmState;
}
export const AlarmStateInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, State: ExternalAlarmState }),
).annotate({
  identifier: "AlarmStateInformation",
}) as any as S.Schema<AlarmStateInformation>;
export type AlarmStateInformationList = AlarmStateInformation[];
export const AlarmStateInformationList = /*@__PURE__*/ S.Array(
  AlarmStateInformation,
);
export interface AssociationDescription {
  Name?: string;
  InstanceId?: string;
  AssociationVersion?: string;
  Date?: Date;
  LastUpdateAssociationDate?: Date;
  Status?: AssociationStatus;
  Overview?: AssociationOverview;
  DocumentVersion?: string;
  AutomationTargetParameterName?: string;
  Parameters?: { [key: string]: string[] | undefined };
  AssociationId?: string;
  Targets?: Target[];
  ScheduleExpression?: string;
  OutputLocation?: InstanceAssociationOutputLocation;
  LastExecutionDate?: Date;
  LastSuccessfulExecutionDate?: Date;
  AssociationName?: string;
  MaxErrors?: string;
  MaxConcurrency?: string;
  ComplianceSeverity?: AssociationComplianceSeverity;
  SyncCompliance?: AssociationSyncCompliance;
  ApplyOnlyAtCronInterval?: boolean;
  CalendarNames?: string[];
  TargetLocations?: TargetLocation[];
  ScheduleOffset?: number;
  Duration?: number;
  TargetMaps?: { [key: string]: string[] | undefined }[];
  AlarmConfiguration?: AlarmConfiguration;
  TriggeredAlarms?: AlarmStateInformation[];
  AssociationDispatchAssumeRole?: string;
}
export const AssociationDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    InstanceId: S.optional(S.String),
    AssociationVersion: S.optional(S.String),
    Date: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdateAssociationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Status: S.optional(AssociationStatus),
    Overview: S.optional(AssociationOverview),
    DocumentVersion: S.optional(S.String),
    AutomationTargetParameterName: S.optional(S.String),
    Parameters: S.optional(Parameters),
    AssociationId: S.optional(S.String),
    Targets: S.optional(Targets),
    ScheduleExpression: S.optional(S.String),
    OutputLocation: S.optional(InstanceAssociationOutputLocation),
    LastExecutionDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastSuccessfulExecutionDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AssociationName: S.optional(S.String),
    MaxErrors: S.optional(S.String),
    MaxConcurrency: S.optional(S.String),
    ComplianceSeverity: S.optional(AssociationComplianceSeverity),
    SyncCompliance: S.optional(AssociationSyncCompliance),
    ApplyOnlyAtCronInterval: S.optional(S.Boolean),
    CalendarNames: S.optional(CalendarNameOrARNList),
    TargetLocations: S.optional(TargetLocations),
    ScheduleOffset: S.optional(S.Number),
    Duration: S.optional(S.Number),
    TargetMaps: S.optional(TargetMaps),
    AlarmConfiguration: S.optional(AlarmConfiguration),
    TriggeredAlarms: S.optional(AlarmStateInformationList),
    AssociationDispatchAssumeRole: S.optional(S.String),
  }),
).annotate({
  identifier: "AssociationDescription",
}) as any as S.Schema<AssociationDescription>;
export interface CreateAssociationResult {
  AssociationDescription?: AssociationDescription;
}
export const CreateAssociationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AssociationDescription: S.optional(AssociationDescription) }).pipe(
    ns,
  ),
).annotate({
  identifier: "CreateAssociationResult",
}) as any as S.Schema<CreateAssociationResult>;
export interface CreateAssociationBatchRequestEntry {
  Name: string;
  InstanceId?: string;
  Parameters?: { [key: string]: string[] | undefined };
  AutomationTargetParameterName?: string;
  DocumentVersion?: string;
  Targets?: Target[];
  ScheduleExpression?: string;
  OutputLocation?: InstanceAssociationOutputLocation;
  AssociationName?: string;
  MaxErrors?: string;
  MaxConcurrency?: string;
  ComplianceSeverity?: AssociationComplianceSeverity;
  SyncCompliance?: AssociationSyncCompliance;
  ApplyOnlyAtCronInterval?: boolean;
  CalendarNames?: string[];
  TargetLocations?: TargetLocation[];
  ScheduleOffset?: number;
  Duration?: number;
  TargetMaps?: { [key: string]: string[] | undefined }[];
  AlarmConfiguration?: AlarmConfiguration;
}
export const CreateAssociationBatchRequestEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    InstanceId: S.optional(S.String),
    Parameters: S.optional(Parameters),
    AutomationTargetParameterName: S.optional(S.String),
    DocumentVersion: S.optional(S.String),
    Targets: S.optional(Targets),
    ScheduleExpression: S.optional(S.String),
    OutputLocation: S.optional(InstanceAssociationOutputLocation),
    AssociationName: S.optional(S.String),
    MaxErrors: S.optional(S.String),
    MaxConcurrency: S.optional(S.String),
    ComplianceSeverity: S.optional(AssociationComplianceSeverity),
    SyncCompliance: S.optional(AssociationSyncCompliance),
    ApplyOnlyAtCronInterval: S.optional(S.Boolean),
    CalendarNames: S.optional(CalendarNameOrARNList),
    TargetLocations: S.optional(TargetLocations),
    ScheduleOffset: S.optional(S.Number),
    Duration: S.optional(S.Number),
    TargetMaps: S.optional(TargetMaps),
    AlarmConfiguration: S.optional(AlarmConfiguration),
  }),
).annotate({
  identifier: "CreateAssociationBatchRequestEntry",
}) as any as S.Schema<CreateAssociationBatchRequestEntry>;
export type CreateAssociationBatchRequestEntries =
  CreateAssociationBatchRequestEntry[];
export const CreateAssociationBatchRequestEntries = /*@__PURE__*/ S.Array(
  CreateAssociationBatchRequestEntry.pipe(T.XmlName("entries")).annotate({
    identifier: "CreateAssociationBatchRequestEntry",
  }),
);
export interface CreateAssociationBatchRequest {
  Entries: CreateAssociationBatchRequestEntry[];
  AssociationDispatchAssumeRole?: string;
}
export const CreateAssociationBatchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entries: CreateAssociationBatchRequestEntries,
    AssociationDispatchAssumeRole: S.optional(S.String),
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
  identifier: "CreateAssociationBatchRequest",
}) as any as S.Schema<CreateAssociationBatchRequest>;
export type AssociationDescriptionList = AssociationDescription[];
export const AssociationDescriptionList = /*@__PURE__*/ S.Array(
  AssociationDescription.pipe(T.XmlName("AssociationDescription")).annotate({
    identifier: "AssociationDescription",
  }),
);
export type BatchErrorMessage = string;
export type Fault = "Client" | "Server" | "Unknown" | (string & {});
export const Fault = S.String;

export interface FailedCreateAssociation {
  Entry?: CreateAssociationBatchRequestEntry;
  Message?: string;
  Fault?: Fault;
}
export const FailedCreateAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entry: S.optional(CreateAssociationBatchRequestEntry),
    Message: S.optional(S.String),
    Fault: S.optional(Fault),
  }),
).annotate({
  identifier: "FailedCreateAssociation",
}) as any as S.Schema<FailedCreateAssociation>;
export type FailedCreateAssociationList = FailedCreateAssociation[];
export const FailedCreateAssociationList = /*@__PURE__*/ S.Array(
  FailedCreateAssociation.pipe(
    T.XmlName("FailedCreateAssociationEntry"),
  ).annotate({ identifier: "FailedCreateAssociation" }),
);
export interface CreateAssociationBatchResult {
  Successful?: AssociationDescription[];
  Failed?: FailedCreateAssociation[];
}
export const CreateAssociationBatchResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Successful: S.optional(AssociationDescriptionList),
    Failed: S.optional(FailedCreateAssociationList),
  }).pipe(ns),
).annotate({
  identifier: "CreateAssociationBatchResult",
}) as any as S.Schema<CreateAssociationBatchResult>;
export type DisplayName = string;
export type CloudConnectorIamRoleArn = string;
export type CloudConnectorDescription = string;
export type AzureTenantId = string;
export type AzureTenantDisplayName = string;
export type AzureApplicationId = string;
export type AzureApplicationDisplayName = string;
export type AzureSubscriptionId = string;
export type AzureSubscriptionDisplayName = string;
export interface AzureSubscription {
  Id: string;
  DisplayName?: string;
}
export const AzureSubscription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String, DisplayName: S.optional(S.String) }),
).annotate({
  identifier: "AzureSubscription",
}) as any as S.Schema<AzureSubscription>;
export type AzureSubscriptionList = AzureSubscription[];
export const AzureSubscriptionList = /*@__PURE__*/ S.Array(AzureSubscription);
export type ConfigurationTargets = { Subscriptions: AzureSubscription[] };
export const ConfigurationTargets = /*@__PURE__*/ S.Union([
  S.Struct({ Subscriptions: AzureSubscriptionList }),
]);
export interface AzureConfiguration {
  TenantId: string;
  TenantDisplayName?: string;
  ApplicationId: string;
  ApplicationDisplayName?: string;
  Targets?: ConfigurationTargets;
}
export const AzureConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TenantId: S.String,
    TenantDisplayName: S.optional(S.String),
    ApplicationId: S.String,
    ApplicationDisplayName: S.optional(S.String),
    Targets: S.optional(ConfigurationTargets),
  }),
).annotate({
  identifier: "AzureConfiguration",
}) as any as S.Schema<AzureConfiguration>;
export type CloudConnectorConfiguration = {
  AzureConfiguration: AzureConfiguration;
};
export const CloudConnectorConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ AzureConfiguration: AzureConfiguration }),
]);
export type ConfigConnectorArn = string;
export interface CreateCloudConnectorRequest {
  DisplayName: string;
  RoleArn: string;
  Description?: string;
  Configuration: CloudConnectorConfiguration;
  ConfigConnectorArn: string;
  Tags?: Tag[];
}
export const CreateCloudConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DisplayName: S.String,
    RoleArn: S.String,
    Description: S.optional(S.String),
    Configuration: CloudConnectorConfiguration,
    ConfigConnectorArn: S.String,
    Tags: S.optional(TagList),
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
  identifier: "CreateCloudConnectorRequest",
}) as any as S.Schema<CreateCloudConnectorRequest>;
export type CloudConnectorId = string;
export interface CreateCloudConnectorResult {
  CloudConnectorId?: string;
}
export const CreateCloudConnectorResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CloudConnectorId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateCloudConnectorResult",
}) as any as S.Schema<CreateCloudConnectorResult>;
export type DocumentContent = string;
export type RequireType = string;
export type DocumentVersionName = string;
export interface DocumentRequires {
  Name: string;
  Version?: string;
  RequireType?: string;
  VersionName?: string;
}
export const DocumentRequires = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Version: S.optional(S.String),
    RequireType: S.optional(S.String),
    VersionName: S.optional(S.String),
  }),
).annotate({
  identifier: "DocumentRequires",
}) as any as S.Schema<DocumentRequires>;
export type DocumentRequiresList = DocumentRequires[];
export const DocumentRequiresList = /*@__PURE__*/ S.Array(DocumentRequires);
export type AttachmentsSourceKey =
  | "SourceUrl"
  | "S3FileUrl"
  | "AttachmentReference"
  | (string & {});
export const AttachmentsSourceKey = S.String;

export type AttachmentsSourceValue = string;
export type AttachmentsSourceValues = string[];
export const AttachmentsSourceValues = /*@__PURE__*/ S.Array(S.String);
export type AttachmentIdentifier = string;
export interface AttachmentsSource {
  Key?: AttachmentsSourceKey;
  Values?: string[];
  Name?: string;
}
export const AttachmentsSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(AttachmentsSourceKey),
    Values: S.optional(AttachmentsSourceValues),
    Name: S.optional(S.String),
  }),
).annotate({
  identifier: "AttachmentsSource",
}) as any as S.Schema<AttachmentsSource>;
export type AttachmentsSourceList = AttachmentsSource[];
export const AttachmentsSourceList = /*@__PURE__*/ S.Array(AttachmentsSource);
export type DocumentName = string;
export type DocumentDisplayName = string;
export type DocumentType =
  | "Command"
  | "Policy"
  | "Automation"
  | "Session"
  | "Package"
  | "ApplicationConfiguration"
  | "ApplicationConfigurationSchema"
  | "DeploymentStrategy"
  | "ChangeCalendar"
  | "Automation.ChangeTemplate"
  | "ProblemAnalysis"
  | "ProblemAnalysisTemplate"
  | "CloudFormation"
  | "ConformancePackTemplate"
  | "QuickSetup"
  | "ManualApprovalPolicy"
  | "AutoApprovalPolicy"
  | (string & {});
export const DocumentType = S.String;

export type DocumentFormat = "YAML" | "JSON" | "TEXT" | (string & {});
export const DocumentFormat = S.String;

export type TargetType = string;
export interface CreateDocumentRequest {
  Content: string;
  Requires?: DocumentRequires[];
  Attachments?: AttachmentsSource[];
  Name: string;
  DisplayName?: string;
  VersionName?: string;
  DocumentType?: DocumentType;
  DocumentFormat?: DocumentFormat;
  TargetType?: string;
  Tags?: Tag[];
}
export const CreateDocumentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Content: S.String,
    Requires: S.optional(DocumentRequiresList),
    Attachments: S.optional(AttachmentsSourceList),
    Name: S.String,
    DisplayName: S.optional(S.String),
    VersionName: S.optional(S.String),
    DocumentType: S.optional(DocumentType),
    DocumentFormat: S.optional(DocumentFormat),
    TargetType: S.optional(S.String),
    Tags: S.optional(TagList),
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
  identifier: "CreateDocumentRequest",
}) as any as S.Schema<CreateDocumentRequest>;
export type DocumentSha1 = string;
export type DocumentHash = string;
export type DocumentHashType = "Sha256" | "Sha1" | (string & {});
export const DocumentHashType = S.String;

export type DocumentOwner = string;
export type DocumentStatus =
  | "Creating"
  | "Active"
  | "Updating"
  | "Deleting"
  | "Failed"
  | (string & {});
export const DocumentStatus = S.String;

export type DocumentStatusInformation = string;
export type DescriptionInDocument = string;
export type DocumentParameterName = string;
export type DocumentParameterType = "String" | "StringList" | (string & {});
export const DocumentParameterType = S.String;

export type DocumentParameterDescrption = string;
export type DocumentParameterDefaultValue = string;
export interface DocumentParameter {
  Name?: string;
  Type?: DocumentParameterType;
  Description?: string;
  DefaultValue?: string;
}
export const DocumentParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Type: S.optional(DocumentParameterType),
    Description: S.optional(S.String),
    DefaultValue: S.optional(S.String),
  }),
).annotate({
  identifier: "DocumentParameter",
}) as any as S.Schema<DocumentParameter>;
export type DocumentParameterList = DocumentParameter[];
export const DocumentParameterList = /*@__PURE__*/ S.Array(
  DocumentParameter.pipe(T.XmlName("DocumentParameter")).annotate({
    identifier: "DocumentParameter",
  }),
);
export type PlatformType = "Windows" | "Linux" | "MacOS" | (string & {});
export const PlatformType = S.String;

export type PlatformTypeList = PlatformType[];
export const PlatformTypeList = /*@__PURE__*/ S.Array(
  PlatformType.pipe(T.XmlName("PlatformType")),
);
export type DocumentSchemaVersion = string;
export type AttachmentName = string;
export interface AttachmentInformation {
  Name?: string;
}
export const AttachmentInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "AttachmentInformation",
}) as any as S.Schema<AttachmentInformation>;
export type AttachmentInformationList = AttachmentInformation[];
export const AttachmentInformationList = /*@__PURE__*/ S.Array(
  AttachmentInformation.pipe(T.XmlName("AttachmentInformation")).annotate({
    identifier: "AttachmentInformation",
  }),
);
export type DocumentAuthor = string;
export type ReviewStatus =
  | "APPROVED"
  | "NOT_REVIEWED"
  | "PENDING"
  | "REJECTED"
  | (string & {});
export const ReviewStatus = S.String;

export type Reviewer = string;
export interface ReviewInformation {
  ReviewedTime?: Date;
  Status?: ReviewStatus;
  Reviewer?: string;
}
export const ReviewInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReviewedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(ReviewStatus),
    Reviewer: S.optional(S.String),
  }),
).annotate({
  identifier: "ReviewInformation",
}) as any as S.Schema<ReviewInformation>;
export type ReviewInformationList = ReviewInformation[];
export const ReviewInformationList = /*@__PURE__*/ S.Array(
  ReviewInformation.pipe(T.XmlName("ReviewInformation")).annotate({
    identifier: "ReviewInformation",
  }),
);
export type Category = string;
export type CategoryList = string[];
export const CategoryList = /*@__PURE__*/ S.Array(S.String);
export type CategoryEnumList = string[];
export const CategoryEnumList = /*@__PURE__*/ S.Array(S.String);
export interface DocumentDescription {
  Sha1?: string;
  Hash?: string;
  HashType?: DocumentHashType;
  Name?: string;
  DisplayName?: string;
  VersionName?: string;
  Owner?: string;
  CreatedDate?: Date;
  Status?: DocumentStatus;
  StatusInformation?: string;
  DocumentVersion?: string;
  Description?: string;
  Parameters?: DocumentParameter[];
  PlatformTypes?: PlatformType[];
  DocumentType?: DocumentType;
  SchemaVersion?: string;
  LatestVersion?: string;
  DefaultVersion?: string;
  DocumentFormat?: DocumentFormat;
  TargetType?: string;
  Tags?: Tag[];
  AttachmentsInformation?: AttachmentInformation[];
  Requires?: DocumentRequires[];
  Author?: string;
  ReviewInformation?: ReviewInformation[];
  ApprovedVersion?: string;
  PendingReviewVersion?: string;
  ReviewStatus?: ReviewStatus;
  Category?: string[];
  CategoryEnum?: string[];
}
export const DocumentDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Sha1: S.optional(S.String),
    Hash: S.optional(S.String),
    HashType: S.optional(DocumentHashType),
    Name: S.optional(S.String),
    DisplayName: S.optional(S.String),
    VersionName: S.optional(S.String),
    Owner: S.optional(S.String),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(DocumentStatus),
    StatusInformation: S.optional(S.String),
    DocumentVersion: S.optional(S.String),
    Description: S.optional(S.String),
    Parameters: S.optional(DocumentParameterList),
    PlatformTypes: S.optional(PlatformTypeList),
    DocumentType: S.optional(DocumentType),
    SchemaVersion: S.optional(S.String),
    LatestVersion: S.optional(S.String),
    DefaultVersion: S.optional(S.String),
    DocumentFormat: S.optional(DocumentFormat),
    TargetType: S.optional(S.String),
    Tags: S.optional(TagList),
    AttachmentsInformation: S.optional(AttachmentInformationList),
    Requires: S.optional(DocumentRequiresList),
    Author: S.optional(S.String),
    ReviewInformation: S.optional(ReviewInformationList),
    ApprovedVersion: S.optional(S.String),
    PendingReviewVersion: S.optional(S.String),
    ReviewStatus: S.optional(ReviewStatus),
    Category: S.optional(CategoryList),
    CategoryEnum: S.optional(CategoryEnumList),
  }),
).annotate({
  identifier: "DocumentDescription",
}) as any as S.Schema<DocumentDescription>;
export interface CreateDocumentResult {
  DocumentDescription?: DocumentDescription;
}
export const CreateDocumentResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DocumentDescription: S.optional(DocumentDescription) }).pipe(ns),
).annotate({
  identifier: "CreateDocumentResult",
}) as any as S.Schema<CreateDocumentResult>;
export type MaintenanceWindowName = string;
export type MaintenanceWindowDescription = string | redacted.Redacted<string>;
export type MaintenanceWindowStringDateTime = string;
export type MaintenanceWindowSchedule = string;
export type MaintenanceWindowTimezone = string;
export type MaintenanceWindowOffset = number;
export type MaintenanceWindowDurationHours = number;
export type MaintenanceWindowCutoff = number;
export type MaintenanceWindowAllowUnassociatedTargets = boolean;
export type ClientToken = string;
export interface CreateMaintenanceWindowRequest {
  Name: string;
  Description?: string | redacted.Redacted<string>;
  StartDate?: string;
  EndDate?: string;
  Schedule: string;
  ScheduleTimezone?: string;
  ScheduleOffset?: number;
  Duration: number;
  Cutoff: number;
  AllowUnassociatedTargets: boolean;
  ClientToken?: string;
  Tags?: Tag[];
}
export const CreateMaintenanceWindowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(SensitiveString),
    StartDate: S.optional(S.String),
    EndDate: S.optional(S.String),
    Schedule: S.String,
    ScheduleTimezone: S.optional(S.String),
    ScheduleOffset: S.optional(S.Number),
    Duration: S.Number,
    Cutoff: S.Number,
    AllowUnassociatedTargets: S.Boolean,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
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
  identifier: "CreateMaintenanceWindowRequest",
}) as any as S.Schema<CreateMaintenanceWindowRequest>;
export type MaintenanceWindowId = string;
export interface CreateMaintenanceWindowResult {
  WindowId?: string;
}
export const CreateMaintenanceWindowResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WindowId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateMaintenanceWindowResult",
}) as any as S.Schema<CreateMaintenanceWindowResult>;
export type OpsItemDescription = string;
export type OpsItemType = string;
export type OpsItemDataKey = string;
export type OpsItemDataValueString = string;
export type OpsItemDataType = "SearchableString" | "String" | (string & {});
export const OpsItemDataType = S.String;

export interface OpsItemDataValue {
  Value?: string;
  Type?: OpsItemDataType;
}
export const OpsItemDataValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.optional(S.String), Type: S.optional(OpsItemDataType) }),
).annotate({
  identifier: "OpsItemDataValue",
}) as any as S.Schema<OpsItemDataValue>;
export type OpsItemOperationalData = {
  [key: string]: OpsItemDataValue | undefined;
};
export const OpsItemOperationalData = /*@__PURE__*/ S.Record(
  S.String,
  OpsItemDataValue.pipe(S.optional),
);
export interface OpsItemNotification {
  Arn?: string;
}
export const OpsItemNotification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "OpsItemNotification",
}) as any as S.Schema<OpsItemNotification>;
export type OpsItemNotifications = OpsItemNotification[];
export const OpsItemNotifications = /*@__PURE__*/ S.Array(OpsItemNotification);
export type OpsItemPriority = number;
export interface RelatedOpsItem {
  OpsItemId: string;
}
export const RelatedOpsItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OpsItemId: S.String }),
).annotate({ identifier: "RelatedOpsItem" }) as any as S.Schema<RelatedOpsItem>;
export type RelatedOpsItems = RelatedOpsItem[];
export const RelatedOpsItems = /*@__PURE__*/ S.Array(RelatedOpsItem);
export type OpsItemSource = string;
export type OpsItemTitle = string;
export type OpsItemCategory = string;
export type OpsItemSeverity = string;
export type OpsItemAccountId = string;
export interface CreateOpsItemRequest {
  Description: string;
  OpsItemType?: string;
  OperationalData?: { [key: string]: OpsItemDataValue | undefined };
  Notifications?: OpsItemNotification[];
  Priority?: number;
  RelatedOpsItems?: RelatedOpsItem[];
  Source: string;
  Title: string;
  Tags?: Tag[];
  Category?: string;
  Severity?: string;
  ActualStartTime?: Date;
  ActualEndTime?: Date;
  PlannedStartTime?: Date;
  PlannedEndTime?: Date;
  AccountId?: string;
}
export const CreateOpsItemRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.String,
    OpsItemType: S.optional(S.String),
    OperationalData: S.optional(OpsItemOperationalData),
    Notifications: S.optional(OpsItemNotifications),
    Priority: S.optional(S.Number),
    RelatedOpsItems: S.optional(RelatedOpsItems),
    Source: S.String,
    Title: S.String,
    Tags: S.optional(TagList),
    Category: S.optional(S.String),
    Severity: S.optional(S.String),
    ActualStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ActualEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    PlannedStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    PlannedEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AccountId: S.optional(S.String),
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
  identifier: "CreateOpsItemRequest",
}) as any as S.Schema<CreateOpsItemRequest>;
export type OpsItemArn = string;
export interface CreateOpsItemResponse {
  OpsItemId?: string;
  OpsItemArn?: string;
}
export const CreateOpsItemResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OpsItemId: S.optional(S.String),
    OpsItemArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateOpsItemResponse",
}) as any as S.Schema<CreateOpsItemResponse>;
export type OpsMetadataResourceId = string;
export type MetadataKey = string;
export type MetadataValueString = string;
export interface MetadataValue {
  Value?: string;
}
export const MetadataValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.optional(S.String) }),
).annotate({ identifier: "MetadataValue" }) as any as S.Schema<MetadataValue>;
export type MetadataMap = { [key: string]: MetadataValue | undefined };
export const MetadataMap = /*@__PURE__*/ S.Record(
  S.String,
  MetadataValue.pipe(S.optional),
);
export interface CreateOpsMetadataRequest {
  ResourceId: string;
  Metadata?: { [key: string]: MetadataValue | undefined };
  Tags?: Tag[];
}
export const CreateOpsMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.String,
    Metadata: S.optional(MetadataMap),
    Tags: S.optional(TagList),
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
  identifier: "CreateOpsMetadataRequest",
}) as any as S.Schema<CreateOpsMetadataRequest>;
export type OpsMetadataArn = string;
export interface CreateOpsMetadataResult {
  OpsMetadataArn?: string;
}
export const CreateOpsMetadataResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OpsMetadataArn: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateOpsMetadataResult",
}) as any as S.Schema<CreateOpsMetadataResult>;
export type OperatingSystem =
  | "WINDOWS"
  | "AMAZON_LINUX"
  | "AMAZON_LINUX_2"
  | "AMAZON_LINUX_2022"
  | "UBUNTU"
  | "REDHAT_ENTERPRISE_LINUX"
  | "SUSE"
  | "CENTOS"
  | "ORACLE_LINUX"
  | "DEBIAN"
  | "MACOS"
  | "RASPBIAN"
  | "ROCKY_LINUX"
  | "ALMA_LINUX"
  | "AMAZON_LINUX_2023"
  | (string & {});
export const OperatingSystem = S.String;

export type BaselineName = string;
export type PatchFilterKey =
  | "ARCH"
  | "ADVISORY_ID"
  | "BUGZILLA_ID"
  | "PATCH_SET"
  | "PRODUCT"
  | "PRODUCT_FAMILY"
  | "CLASSIFICATION"
  | "CVE_ID"
  | "EPOCH"
  | "MSRC_SEVERITY"
  | "NAME"
  | "PATCH_ID"
  | "SECTION"
  | "PRIORITY"
  | "REPOSITORY"
  | "RELEASE"
  | "SEVERITY"
  | "SECURITY"
  | "VERSION"
  | (string & {});
export const PatchFilterKey = S.String;

export type PatchFilterValue = string;
export type PatchFilterValueList = string[];
export const PatchFilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface PatchFilter {
  Key: PatchFilterKey;
  Values: string[];
}
export const PatchFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: PatchFilterKey, Values: PatchFilterValueList }),
).annotate({ identifier: "PatchFilter" }) as any as S.Schema<PatchFilter>;
export type PatchFilterList = PatchFilter[];
export const PatchFilterList = /*@__PURE__*/ S.Array(PatchFilter);
export interface PatchFilterGroup {
  PatchFilters: PatchFilter[];
}
export const PatchFilterGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PatchFilters: PatchFilterList }),
).annotate({
  identifier: "PatchFilterGroup",
}) as any as S.Schema<PatchFilterGroup>;
export type PatchComplianceLevel =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "INFORMATIONAL"
  | "UNSPECIFIED"
  | (string & {});
export const PatchComplianceLevel = S.String;

export type ApproveAfterDays = number;
export type PatchStringDateTime = string;
export interface PatchRule {
  PatchFilterGroup: PatchFilterGroup;
  ComplianceLevel?: PatchComplianceLevel;
  ApproveAfterDays?: number;
  ApproveUntilDate?: string;
  EnableNonSecurity?: boolean;
}
export const PatchRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PatchFilterGroup: PatchFilterGroup,
    ComplianceLevel: S.optional(PatchComplianceLevel),
    ApproveAfterDays: S.optional(S.Number),
    ApproveUntilDate: S.optional(S.String),
    EnableNonSecurity: S.optional(S.Boolean),
  }),
).annotate({ identifier: "PatchRule" }) as any as S.Schema<PatchRule>;
export type PatchRuleList = PatchRule[];
export const PatchRuleList = /*@__PURE__*/ S.Array(PatchRule);
export interface PatchRuleGroup {
  PatchRules: PatchRule[];
}
export const PatchRuleGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PatchRules: PatchRuleList }),
).annotate({ identifier: "PatchRuleGroup" }) as any as S.Schema<PatchRuleGroup>;
export type PatchId = string;
export type PatchIdList = string[];
export const PatchIdList = /*@__PURE__*/ S.Array(S.String);
export type PatchAction = "ALLOW_AS_DEPENDENCY" | "BLOCK" | (string & {});
export const PatchAction = S.String;

export type BaselineDescription = string;
export type PatchSourceName = string;
export type PatchSourceProduct = string;
export type PatchSourceProductList = string[];
export const PatchSourceProductList = /*@__PURE__*/ S.Array(S.String);
export type PatchSourceConfiguration = string | redacted.Redacted<string>;
export interface PatchSource {
  Name: string;
  Products: string[];
  Configuration: string | redacted.Redacted<string>;
}
export const PatchSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Products: PatchSourceProductList,
    Configuration: SensitiveString,
  }),
).annotate({ identifier: "PatchSource" }) as any as S.Schema<PatchSource>;
export type PatchSourceList = PatchSource[];
export const PatchSourceList = /*@__PURE__*/ S.Array(PatchSource);
export type PatchComplianceStatus =
  | "COMPLIANT"
  | "NON_COMPLIANT"
  | (string & {});
export const PatchComplianceStatus = S.String;

export interface CreatePatchBaselineRequest {
  OperatingSystem?: OperatingSystem;
  Name: string;
  GlobalFilters?: PatchFilterGroup;
  ApprovalRules?: PatchRuleGroup;
  ApprovedPatches?: string[];
  ApprovedPatchesComplianceLevel?: PatchComplianceLevel;
  ApprovedPatchesEnableNonSecurity?: boolean;
  RejectedPatches?: string[];
  RejectedPatchesAction?: PatchAction;
  Description?: string;
  Sources?: PatchSource[];
  AvailableSecurityUpdatesComplianceStatus?: PatchComplianceStatus;
  ClientToken?: string;
  Tags?: Tag[];
}
export const CreatePatchBaselineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OperatingSystem: S.optional(OperatingSystem),
    Name: S.String,
    GlobalFilters: S.optional(PatchFilterGroup),
    ApprovalRules: S.optional(PatchRuleGroup),
    ApprovedPatches: S.optional(PatchIdList),
    ApprovedPatchesComplianceLevel: S.optional(PatchComplianceLevel),
    ApprovedPatchesEnableNonSecurity: S.optional(S.Boolean),
    RejectedPatches: S.optional(PatchIdList),
    RejectedPatchesAction: S.optional(PatchAction),
    Description: S.optional(S.String),
    Sources: S.optional(PatchSourceList),
    AvailableSecurityUpdatesComplianceStatus: S.optional(PatchComplianceStatus),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
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
  identifier: "CreatePatchBaselineRequest",
}) as any as S.Schema<CreatePatchBaselineRequest>;
export type BaselineId = string;
export interface CreatePatchBaselineResult {
  BaselineId?: string;
}
export const CreatePatchBaselineResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BaselineId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreatePatchBaselineResult",
}) as any as S.Schema<CreatePatchBaselineResult>;
export type ResourceDataSyncName = string;
export type ResourceDataSyncS3BucketName = string;
export type ResourceDataSyncS3Prefix = string;
export type ResourceDataSyncS3Format = "JsonSerDe" | (string & {});
export const ResourceDataSyncS3Format = S.String;

export type ResourceDataSyncS3Region = string;
export type ResourceDataSyncAWSKMSKeyARN = string;
export type ResourceDataSyncDestinationDataSharingType = string;
export interface ResourceDataSyncDestinationDataSharing {
  DestinationDataSharingType?: string;
}
export const ResourceDataSyncDestinationDataSharing = /*@__PURE__*/ S.suspend(
  () => S.Struct({ DestinationDataSharingType: S.optional(S.String) }),
).annotate({
  identifier: "ResourceDataSyncDestinationDataSharing",
}) as any as S.Schema<ResourceDataSyncDestinationDataSharing>;
export interface ResourceDataSyncS3Destination {
  BucketName: string;
  Prefix?: string;
  SyncFormat: ResourceDataSyncS3Format;
  Region: string;
  AWSKMSKeyARN?: string;
  DestinationDataSharing?: ResourceDataSyncDestinationDataSharing;
}
export const ResourceDataSyncS3Destination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BucketName: S.String,
    Prefix: S.optional(S.String),
    SyncFormat: ResourceDataSyncS3Format,
    Region: S.String,
    AWSKMSKeyARN: S.optional(S.String),
    DestinationDataSharing: S.optional(ResourceDataSyncDestinationDataSharing),
  }),
).annotate({
  identifier: "ResourceDataSyncS3Destination",
}) as any as S.Schema<ResourceDataSyncS3Destination>;
export type ResourceDataSyncType = string;
export type ResourceDataSyncSourceType = string;
export type ResourceDataSyncOrganizationSourceType = string;
export type ResourceDataSyncOrganizationalUnitId = string;
export interface ResourceDataSyncOrganizationalUnit {
  OrganizationalUnitId?: string;
}
export const ResourceDataSyncOrganizationalUnit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrganizationalUnitId: S.optional(S.String) }),
).annotate({
  identifier: "ResourceDataSyncOrganizationalUnit",
}) as any as S.Schema<ResourceDataSyncOrganizationalUnit>;
export type ResourceDataSyncOrganizationalUnitList =
  ResourceDataSyncOrganizationalUnit[];
export const ResourceDataSyncOrganizationalUnitList = /*@__PURE__*/ S.Array(
  ResourceDataSyncOrganizationalUnit,
);
export interface ResourceDataSyncAwsOrganizationsSource {
  OrganizationSourceType: string;
  OrganizationalUnits?: ResourceDataSyncOrganizationalUnit[];
}
export const ResourceDataSyncAwsOrganizationsSource = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      OrganizationSourceType: S.String,
      OrganizationalUnits: S.optional(ResourceDataSyncOrganizationalUnitList),
    }),
).annotate({
  identifier: "ResourceDataSyncAwsOrganizationsSource",
}) as any as S.Schema<ResourceDataSyncAwsOrganizationsSource>;
export type ResourceDataSyncSourceRegion = string;
export type ResourceDataSyncSourceRegionList = string[];
export const ResourceDataSyncSourceRegionList = /*@__PURE__*/ S.Array(S.String);
export type ResourceDataSyncIncludeFutureRegions = boolean;
export type ResourceDataSyncEnableAllOpsDataSources = boolean;
export interface ResourceDataSyncSource {
  SourceType: string;
  AwsOrganizationsSource?: ResourceDataSyncAwsOrganizationsSource;
  SourceRegions: string[];
  IncludeFutureRegions?: boolean;
  EnableAllOpsDataSources?: boolean;
}
export const ResourceDataSyncSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceType: S.String,
    AwsOrganizationsSource: S.optional(ResourceDataSyncAwsOrganizationsSource),
    SourceRegions: ResourceDataSyncSourceRegionList,
    IncludeFutureRegions: S.optional(S.Boolean),
    EnableAllOpsDataSources: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ResourceDataSyncSource",
}) as any as S.Schema<ResourceDataSyncSource>;
export interface CreateResourceDataSyncRequest {
  SyncName: string;
  S3Destination?: ResourceDataSyncS3Destination;
  SyncType?: string;
  SyncSource?: ResourceDataSyncSource;
}
export const CreateResourceDataSyncRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SyncName: S.String,
    S3Destination: S.optional(ResourceDataSyncS3Destination),
    SyncType: S.optional(S.String),
    SyncSource: S.optional(ResourceDataSyncSource),
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
  identifier: "CreateResourceDataSyncRequest",
}) as any as S.Schema<CreateResourceDataSyncRequest>;
export interface CreateResourceDataSyncResult {}
export const CreateResourceDataSyncResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateResourceDataSyncResult",
}) as any as S.Schema<CreateResourceDataSyncResult>;
export interface DeleteActivationRequest {
  ActivationId: string;
}
export const DeleteActivationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ActivationId: S.String }).pipe(
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
  identifier: "DeleteActivationRequest",
}) as any as S.Schema<DeleteActivationRequest>;
export interface DeleteActivationResult {}
export const DeleteActivationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteActivationResult",
}) as any as S.Schema<DeleteActivationResult>;
export interface DeleteAssociationRequest {
  Name?: string;
  InstanceId?: string;
  AssociationId?: string;
}
export const DeleteAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    InstanceId: S.optional(S.String),
    AssociationId: S.optional(S.String),
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
  identifier: "DeleteAssociationRequest",
}) as any as S.Schema<DeleteAssociationRequest>;
export interface DeleteAssociationResult {}
export const DeleteAssociationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteAssociationResult",
}) as any as S.Schema<DeleteAssociationResult>;
export interface DeleteCloudConnectorRequest {
  CloudConnectorId: string;
}
export const DeleteCloudConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CloudConnectorId: S.String }).pipe(
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
  identifier: "DeleteCloudConnectorRequest",
}) as any as S.Schema<DeleteCloudConnectorRequest>;
export interface DeleteCloudConnectorResult {
  CloudConnectorId?: string;
}
export const DeleteCloudConnectorResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CloudConnectorId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteCloudConnectorResult",
}) as any as S.Schema<DeleteCloudConnectorResult>;
export interface DeleteDocumentRequest {
  Name: string;
  DocumentVersion?: string;
  VersionName?: string;
  Force?: boolean;
}
export const DeleteDocumentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    DocumentVersion: S.optional(S.String),
    VersionName: S.optional(S.String),
    Force: S.optional(S.Boolean),
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
  identifier: "DeleteDocumentRequest",
}) as any as S.Schema<DeleteDocumentRequest>;
export interface DeleteDocumentResult {}
export const DeleteDocumentResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteDocumentResult",
}) as any as S.Schema<DeleteDocumentResult>;
export type InventoryItemTypeName = string;
export type InventorySchemaDeleteOption =
  | "DisableSchema"
  | "DeleteSchema"
  | (string & {});
export const InventorySchemaDeleteOption = S.String;

export type DryRun = boolean;
export type UUID = string;
export interface DeleteInventoryRequest {
  TypeName: string;
  SchemaDeleteOption?: InventorySchemaDeleteOption;
  DryRun?: boolean;
  ClientToken?: string;
}
export const DeleteInventoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TypeName: S.String,
    SchemaDeleteOption: S.optional(InventorySchemaDeleteOption),
    DryRun: S.optional(S.Boolean),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
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
  identifier: "DeleteInventoryRequest",
}) as any as S.Schema<DeleteInventoryRequest>;
export type TotalCount = number;
export type RemainingCount = number;
export type InventoryItemSchemaVersion = string;
export type ResourceCount = number;
export interface InventoryDeletionSummaryItem {
  Version?: string;
  Count?: number;
  RemainingCount?: number;
}
export const InventoryDeletionSummaryItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Version: S.optional(S.String),
    Count: S.optional(S.Number),
    RemainingCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "InventoryDeletionSummaryItem",
}) as any as S.Schema<InventoryDeletionSummaryItem>;
export type InventoryDeletionSummaryItems = InventoryDeletionSummaryItem[];
export const InventoryDeletionSummaryItems = /*@__PURE__*/ S.Array(
  InventoryDeletionSummaryItem,
);
export interface InventoryDeletionSummary {
  TotalCount?: number;
  RemainingCount?: number;
  SummaryItems?: InventoryDeletionSummaryItem[];
}
export const InventoryDeletionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TotalCount: S.optional(S.Number),
    RemainingCount: S.optional(S.Number),
    SummaryItems: S.optional(InventoryDeletionSummaryItems),
  }),
).annotate({
  identifier: "InventoryDeletionSummary",
}) as any as S.Schema<InventoryDeletionSummary>;
export interface DeleteInventoryResult {
  DeletionId?: string;
  TypeName?: string;
  DeletionSummary?: InventoryDeletionSummary;
}
export const DeleteInventoryResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeletionId: S.optional(S.String),
    TypeName: S.optional(S.String),
    DeletionSummary: S.optional(InventoryDeletionSummary),
  }).pipe(ns),
).annotate({
  identifier: "DeleteInventoryResult",
}) as any as S.Schema<DeleteInventoryResult>;
export interface DeleteMaintenanceWindowRequest {
  WindowId: string;
}
export const DeleteMaintenanceWindowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WindowId: S.String }).pipe(
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
  identifier: "DeleteMaintenanceWindowRequest",
}) as any as S.Schema<DeleteMaintenanceWindowRequest>;
export interface DeleteMaintenanceWindowResult {
  WindowId?: string;
}
export const DeleteMaintenanceWindowResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WindowId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteMaintenanceWindowResult",
}) as any as S.Schema<DeleteMaintenanceWindowResult>;
export interface DeleteOpsItemRequest {
  OpsItemId: string;
}
export const DeleteOpsItemRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OpsItemId: S.String }).pipe(
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
  identifier: "DeleteOpsItemRequest",
}) as any as S.Schema<DeleteOpsItemRequest>;
export interface DeleteOpsItemResponse {}
export const DeleteOpsItemResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteOpsItemResponse",
}) as any as S.Schema<DeleteOpsItemResponse>;
export interface DeleteOpsMetadataRequest {
  OpsMetadataArn: string;
}
export const DeleteOpsMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OpsMetadataArn: S.String }).pipe(
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
  identifier: "DeleteOpsMetadataRequest",
}) as any as S.Schema<DeleteOpsMetadataRequest>;
export interface DeleteOpsMetadataResult {}
export const DeleteOpsMetadataResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteOpsMetadataResult",
}) as any as S.Schema<DeleteOpsMetadataResult>;
export type PSParameterName = string;
export interface DeleteParameterRequest {
  Name: string;
}
export const DeleteParameterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
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
  identifier: "DeleteParameterRequest",
}) as any as S.Schema<DeleteParameterRequest>;
export interface DeleteParameterResult {}
export const DeleteParameterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteParameterResult",
}) as any as S.Schema<DeleteParameterResult>;
export type ParameterNameList = string[];
export const ParameterNameList = /*@__PURE__*/ S.Array(S.String);
export interface DeleteParametersRequest {
  Names: string[];
}
export const DeleteParametersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Names: ParameterNameList }).pipe(
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
  identifier: "DeleteParametersRequest",
}) as any as S.Schema<DeleteParametersRequest>;
export interface DeleteParametersResult {
  DeletedParameters?: string[];
  InvalidParameters?: string[];
}
export const DeleteParametersResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeletedParameters: S.optional(ParameterNameList),
    InvalidParameters: S.optional(ParameterNameList),
  }).pipe(ns),
).annotate({
  identifier: "DeleteParametersResult",
}) as any as S.Schema<DeleteParametersResult>;
export interface DeletePatchBaselineRequest {
  BaselineId: string;
}
export const DeletePatchBaselineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BaselineId: S.String }).pipe(
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
  identifier: "DeletePatchBaselineRequest",
}) as any as S.Schema<DeletePatchBaselineRequest>;
export interface DeletePatchBaselineResult {
  BaselineId?: string;
}
export const DeletePatchBaselineResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BaselineId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeletePatchBaselineResult",
}) as any as S.Schema<DeletePatchBaselineResult>;
export interface DeleteResourceDataSyncRequest {
  SyncName: string;
  SyncType?: string;
}
export const DeleteResourceDataSyncRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SyncName: S.String, SyncType: S.optional(S.String) }).pipe(
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
  identifier: "DeleteResourceDataSyncRequest",
}) as any as S.Schema<DeleteResourceDataSyncRequest>;
export interface DeleteResourceDataSyncResult {}
export const DeleteResourceDataSyncResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteResourceDataSyncResult",
}) as any as S.Schema<DeleteResourceDataSyncResult>;
export type ResourceArnString = string;
export type PolicyId = string;
export type PolicyHash = string;
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
  PolicyId: string;
  PolicyHash: string;
}
export const DeleteResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String,
    PolicyId: S.String,
    PolicyHash: S.String,
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
  identifier: "DeleteResourcePolicyRequest",
}) as any as S.Schema<DeleteResourcePolicyRequest>;
export interface DeleteResourcePolicyResponse {}
export const DeleteResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteResourcePolicyResponse",
}) as any as S.Schema<DeleteResourcePolicyResponse>;
export type ManagedInstanceId = string;
export interface DeregisterManagedInstanceRequest {
  InstanceId: string;
}
export const DeregisterManagedInstanceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstanceId: S.String }).pipe(
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
  identifier: "DeregisterManagedInstanceRequest",
}) as any as S.Schema<DeregisterManagedInstanceRequest>;
export interface DeregisterManagedInstanceResult {}
export const DeregisterManagedInstanceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeregisterManagedInstanceResult",
}) as any as S.Schema<DeregisterManagedInstanceResult>;
export type PatchGroup = string;
export interface DeregisterPatchBaselineForPatchGroupRequest {
  BaselineId: string;
  PatchGroup: string;
}
export const DeregisterPatchBaselineForPatchGroupRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ BaselineId: S.String, PatchGroup: S.String }).pipe(
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
    identifier: "DeregisterPatchBaselineForPatchGroupRequest",
  }) as any as S.Schema<DeregisterPatchBaselineForPatchGroupRequest>;
export interface DeregisterPatchBaselineForPatchGroupResult {
  BaselineId?: string;
  PatchGroup?: string;
}
export const DeregisterPatchBaselineForPatchGroupResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      BaselineId: S.optional(S.String),
      PatchGroup: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DeregisterPatchBaselineForPatchGroupResult",
  }) as any as S.Schema<DeregisterPatchBaselineForPatchGroupResult>;
export type MaintenanceWindowTargetId = string;
export interface DeregisterTargetFromMaintenanceWindowRequest {
  WindowId: string;
  WindowTargetId: string;
  Safe?: boolean;
}
export const DeregisterTargetFromMaintenanceWindowRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      WindowId: S.String,
      WindowTargetId: S.String,
      Safe: S.optional(S.Boolean),
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
    identifier: "DeregisterTargetFromMaintenanceWindowRequest",
  }) as any as S.Schema<DeregisterTargetFromMaintenanceWindowRequest>;
export interface DeregisterTargetFromMaintenanceWindowResult {
  WindowId?: string;
  WindowTargetId?: string;
}
export const DeregisterTargetFromMaintenanceWindowResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      WindowId: S.optional(S.String),
      WindowTargetId: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DeregisterTargetFromMaintenanceWindowResult",
  }) as any as S.Schema<DeregisterTargetFromMaintenanceWindowResult>;
export type MaintenanceWindowTaskId = string;
export interface DeregisterTaskFromMaintenanceWindowRequest {
  WindowId: string;
  WindowTaskId: string;
}
export const DeregisterTaskFromMaintenanceWindowRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ WindowId: S.String, WindowTaskId: S.String }).pipe(
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
    identifier: "DeregisterTaskFromMaintenanceWindowRequest",
  }) as any as S.Schema<DeregisterTaskFromMaintenanceWindowRequest>;
export interface DeregisterTaskFromMaintenanceWindowResult {
  WindowId?: string;
  WindowTaskId?: string;
}
export const DeregisterTaskFromMaintenanceWindowResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      WindowId: S.optional(S.String),
      WindowTaskId: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DeregisterTaskFromMaintenanceWindowResult",
  }) as any as S.Schema<DeregisterTaskFromMaintenanceWindowResult>;
export type DescribeActivationsFilterKeys =
  | "ActivationIds"
  | "DefaultInstanceName"
  | "IamRole"
  | (string & {});
export const DescribeActivationsFilterKeys = S.String;

export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeActivationsFilter {
  FilterKey?: DescribeActivationsFilterKeys;
  FilterValues?: string[];
}
export const DescribeActivationsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FilterKey: S.optional(DescribeActivationsFilterKeys),
    FilterValues: S.optional(StringList),
  }),
).annotate({
  identifier: "DescribeActivationsFilter",
}) as any as S.Schema<DescribeActivationsFilter>;
export type DescribeActivationsFilterList = DescribeActivationsFilter[];
export const DescribeActivationsFilterList = /*@__PURE__*/ S.Array(
  DescribeActivationsFilter,
);
export type MaxResults = number;
export type NextToken = string;
export interface DescribeActivationsRequest {
  Filters?: DescribeActivationsFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeActivationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(DescribeActivationsFilterList),
    MaxResults: S.optional(S.Number),
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
  identifier: "DescribeActivationsRequest",
}) as any as S.Schema<DescribeActivationsRequest>;
export type RegistrationsCount = number;
export type CreatedDate = Date;
export interface Activation {
  ActivationId?: string;
  Description?: string;
  DefaultInstanceName?: string;
  IamRole?: string;
  RegistrationLimit?: number;
  RegistrationsCount?: number;
  ExpirationDate?: Date;
  Expired?: boolean;
  CreatedDate?: Date;
  Tags?: Tag[];
}
export const Activation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActivationId: S.optional(S.String),
    Description: S.optional(S.String),
    DefaultInstanceName: S.optional(S.String),
    IamRole: S.optional(S.String),
    RegistrationLimit: S.optional(S.Number),
    RegistrationsCount: S.optional(S.Number),
    ExpirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Expired: S.optional(S.Boolean),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Tags: S.optional(TagList),
  }),
).annotate({ identifier: "Activation" }) as any as S.Schema<Activation>;
export type ActivationList = Activation[];
export const ActivationList = /*@__PURE__*/ S.Array(Activation);
export interface DescribeActivationsResult {
  ActivationList?: Activation[];
  NextToken?: string;
}
export const DescribeActivationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActivationList: S.optional(ActivationList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeActivationsResult",
}) as any as S.Schema<DescribeActivationsResult>;
export interface DescribeAssociationRequest {
  Name?: string;
  InstanceId?: string;
  AssociationId?: string;
  AssociationVersion?: string;
}
export const DescribeAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    InstanceId: S.optional(S.String),
    AssociationId: S.optional(S.String),
    AssociationVersion: S.optional(S.String),
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
  identifier: "DescribeAssociationRequest",
}) as any as S.Schema<DescribeAssociationRequest>;
export interface DescribeAssociationResult {
  AssociationDescription?: AssociationDescription;
}
export const DescribeAssociationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AssociationDescription: S.optional(AssociationDescription) }).pipe(
    ns,
  ),
).annotate({
  identifier: "DescribeAssociationResult",
}) as any as S.Schema<DescribeAssociationResult>;
export type AssociationExecutionFilterKey =
  | "ExecutionId"
  | "Status"
  | "CreatedTime"
  | (string & {});
export const AssociationExecutionFilterKey = S.String;

export type AssociationExecutionFilterValue = string;
export type AssociationFilterOperatorType =
  | "EQUAL"
  | "LESS_THAN"
  | "GREATER_THAN"
  | (string & {});
export const AssociationFilterOperatorType = S.String;

export interface AssociationExecutionFilter {
  Key: AssociationExecutionFilterKey;
  Value: string;
  Type: AssociationFilterOperatorType;
}
export const AssociationExecutionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: AssociationExecutionFilterKey,
    Value: S.String,
    Type: AssociationFilterOperatorType,
  }),
).annotate({
  identifier: "AssociationExecutionFilter",
}) as any as S.Schema<AssociationExecutionFilter>;
export type AssociationExecutionFilterList = AssociationExecutionFilter[];
export const AssociationExecutionFilterList = /*@__PURE__*/ S.Array(
  AssociationExecutionFilter.pipe(
    T.XmlName("AssociationExecutionFilter"),
  ).annotate({ identifier: "AssociationExecutionFilter" }),
);
export interface DescribeAssociationExecutionsRequest {
  AssociationId: string;
  Filters?: AssociationExecutionFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeAssociationExecutionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AssociationId: S.String,
      Filters: S.optional(AssociationExecutionFilterList),
      MaxResults: S.optional(S.Number),
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
  identifier: "DescribeAssociationExecutionsRequest",
}) as any as S.Schema<DescribeAssociationExecutionsRequest>;
export type AssociationExecutionId = string;
export type ResourceCountByStatus = string;
export interface AssociationExecution {
  AssociationId?: string;
  AssociationVersion?: string;
  ExecutionId?: string;
  Status?: string;
  DetailedStatus?: string;
  CreatedTime?: Date;
  LastExecutionDate?: Date;
  ResourceCountByStatus?: string;
  AlarmConfiguration?: AlarmConfiguration;
  TriggeredAlarms?: AlarmStateInformation[];
}
export const AssociationExecution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociationId: S.optional(S.String),
    AssociationVersion: S.optional(S.String),
    ExecutionId: S.optional(S.String),
    Status: S.optional(S.String),
    DetailedStatus: S.optional(S.String),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastExecutionDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ResourceCountByStatus: S.optional(S.String),
    AlarmConfiguration: S.optional(AlarmConfiguration),
    TriggeredAlarms: S.optional(AlarmStateInformationList),
  }),
).annotate({
  identifier: "AssociationExecution",
}) as any as S.Schema<AssociationExecution>;
export type AssociationExecutionsList = AssociationExecution[];
export const AssociationExecutionsList = /*@__PURE__*/ S.Array(
  AssociationExecution.pipe(T.XmlName("AssociationExecution")).annotate({
    identifier: "AssociationExecution",
  }),
);
export interface DescribeAssociationExecutionsResult {
  AssociationExecutions?: AssociationExecution[];
  NextToken?: string;
}
export const DescribeAssociationExecutionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociationExecutions: S.optional(AssociationExecutionsList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeAssociationExecutionsResult",
}) as any as S.Schema<DescribeAssociationExecutionsResult>;
export type AssociationExecutionTargetsFilterKey =
  | "Status"
  | "ResourceId"
  | "ResourceType"
  | (string & {});
export const AssociationExecutionTargetsFilterKey = S.String;

export type AssociationExecutionTargetsFilterValue = string;
export interface AssociationExecutionTargetsFilter {
  Key: AssociationExecutionTargetsFilterKey;
  Value: string;
}
export const AssociationExecutionTargetsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: AssociationExecutionTargetsFilterKey, Value: S.String }),
).annotate({
  identifier: "AssociationExecutionTargetsFilter",
}) as any as S.Schema<AssociationExecutionTargetsFilter>;
export type AssociationExecutionTargetsFilterList =
  AssociationExecutionTargetsFilter[];
export const AssociationExecutionTargetsFilterList = /*@__PURE__*/ S.Array(
  AssociationExecutionTargetsFilter.pipe(
    T.XmlName("AssociationExecutionTargetsFilter"),
  ).annotate({ identifier: "AssociationExecutionTargetsFilter" }),
);
export interface DescribeAssociationExecutionTargetsRequest {
  AssociationId: string;
  ExecutionId: string;
  Filters?: AssociationExecutionTargetsFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeAssociationExecutionTargetsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AssociationId: S.String,
      ExecutionId: S.String,
      Filters: S.optional(AssociationExecutionTargetsFilterList),
      MaxResults: S.optional(S.Number),
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
    identifier: "DescribeAssociationExecutionTargetsRequest",
  }) as any as S.Schema<DescribeAssociationExecutionTargetsRequest>;
export type AssociationResourceId = string;
export type AssociationResourceType = string;
export type OutputSourceId = string;
export type OutputSourceType = string;
export interface OutputSource {
  OutputSourceId?: string;
  OutputSourceType?: string;
}
export const OutputSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutputSourceId: S.optional(S.String),
    OutputSourceType: S.optional(S.String),
  }),
).annotate({ identifier: "OutputSource" }) as any as S.Schema<OutputSource>;
export interface AssociationExecutionTarget {
  AssociationId?: string;
  AssociationVersion?: string;
  ExecutionId?: string;
  ResourceId?: string;
  ResourceType?: string;
  Status?: string;
  DetailedStatus?: string;
  LastExecutionDate?: Date;
  OutputSource?: OutputSource;
}
export const AssociationExecutionTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociationId: S.optional(S.String),
    AssociationVersion: S.optional(S.String),
    ExecutionId: S.optional(S.String),
    ResourceId: S.optional(S.String),
    ResourceType: S.optional(S.String),
    Status: S.optional(S.String),
    DetailedStatus: S.optional(S.String),
    LastExecutionDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    OutputSource: S.optional(OutputSource),
  }),
).annotate({
  identifier: "AssociationExecutionTarget",
}) as any as S.Schema<AssociationExecutionTarget>;
export type AssociationExecutionTargetsList = AssociationExecutionTarget[];
export const AssociationExecutionTargetsList = /*@__PURE__*/ S.Array(
  AssociationExecutionTarget.pipe(
    T.XmlName("AssociationExecutionTarget"),
  ).annotate({ identifier: "AssociationExecutionTarget" }),
);
export interface DescribeAssociationExecutionTargetsResult {
  AssociationExecutionTargets?: AssociationExecutionTarget[];
  NextToken?: string;
}
export const DescribeAssociationExecutionTargetsResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AssociationExecutionTargets: S.optional(AssociationExecutionTargetsList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeAssociationExecutionTargetsResult",
  }) as any as S.Schema<DescribeAssociationExecutionTargetsResult>;
export type AutomationExecutionFilterKey =
  | "DocumentNamePrefix"
  | "ExecutionStatus"
  | "ExecutionId"
  | "ParentExecutionId"
  | "CurrentAction"
  | "StartTimeBefore"
  | "StartTimeAfter"
  | "AutomationType"
  | "TagKey"
  | "TargetResourceGroup"
  | "AutomationSubtype"
  | "OpsItemId"
  | (string & {});
export const AutomationExecutionFilterKey = S.String;

export type AutomationExecutionFilterValue = string;
export type AutomationExecutionFilterValueList = string[];
export const AutomationExecutionFilterValueList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface AutomationExecutionFilter {
  Key: AutomationExecutionFilterKey;
  Values: string[];
}
export const AutomationExecutionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: AutomationExecutionFilterKey,
    Values: AutomationExecutionFilterValueList,
  }),
).annotate({
  identifier: "AutomationExecutionFilter",
}) as any as S.Schema<AutomationExecutionFilter>;
export type AutomationExecutionFilterList = AutomationExecutionFilter[];
export const AutomationExecutionFilterList = /*@__PURE__*/ S.Array(
  AutomationExecutionFilter,
);
export interface DescribeAutomationExecutionsRequest {
  Filters?: AutomationExecutionFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeAutomationExecutionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(AutomationExecutionFilterList),
    MaxResults: S.optional(S.Number),
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
  identifier: "DescribeAutomationExecutionsRequest",
}) as any as S.Schema<DescribeAutomationExecutionsRequest>;
export type AutomationExecutionId = string;
export type AutomationExecutionStatus =
  | "Pending"
  | "InProgress"
  | "Waiting"
  | "Success"
  | "TimedOut"
  | "Cancelling"
  | "Cancelled"
  | "Failed"
  | "PendingApproval"
  | "Approved"
  | "Rejected"
  | "Scheduled"
  | "RunbookInProgress"
  | "PendingChangeCalendarOverride"
  | "ChangeCalendarOverrideApproved"
  | "ChangeCalendarOverrideRejected"
  | "CompletedWithSuccess"
  | "CompletedWithFailure"
  | "Exited"
  | (string & {});
export const AutomationExecutionStatus = S.String;

export type AutomationParameterKey = string;
export type AutomationParameterValue = string;
export type AutomationParameterValueList = string[];
export const AutomationParameterValueList = /*@__PURE__*/ S.Array(S.String);
export type AutomationParameterMap = { [key: string]: string[] | undefined };
export const AutomationParameterMap = /*@__PURE__*/ S.Record(
  S.String,
  AutomationParameterValueList.pipe(S.optional),
);
export type ExecutionMode = "Auto" | "Interactive" | (string & {});
export const ExecutionMode = S.String;

export type TargetParameterList = string[];
export const TargetParameterList = /*@__PURE__*/ S.Array(S.String);
export interface ResolvedTargets {
  ParameterValues?: string[];
  Truncated?: boolean;
}
export const ResolvedTargets = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParameterValues: S.optional(TargetParameterList),
    Truncated: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ResolvedTargets",
}) as any as S.Schema<ResolvedTargets>;
export type AutomationType = "CrossAccount" | "Local" | (string & {});
export const AutomationType = S.String;

export type TargetLocationsURL = string;
export type AutomationSubtype =
  | "ChangeRequest"
  | "AccessRequest"
  | (string & {});
export const AutomationSubtype = S.String;

export interface Runbook {
  DocumentName: string;
  DocumentVersion?: string;
  Parameters?: { [key: string]: string[] | undefined };
  TargetParameterName?: string;
  Targets?: Target[];
  TargetMaps?: { [key: string]: string[] | undefined }[];
  MaxConcurrency?: string;
  MaxErrors?: string;
  TargetLocations?: TargetLocation[];
}
export const Runbook = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DocumentName: S.String,
    DocumentVersion: S.optional(S.String),
    Parameters: S.optional(AutomationParameterMap),
    TargetParameterName: S.optional(S.String),
    Targets: S.optional(Targets),
    TargetMaps: S.optional(TargetMaps),
    MaxConcurrency: S.optional(S.String),
    MaxErrors: S.optional(S.String),
    TargetLocations: S.optional(TargetLocations),
  }),
).annotate({ identifier: "Runbook" }) as any as S.Schema<Runbook>;
export type Runbooks = Runbook[];
export const Runbooks = /*@__PURE__*/ S.Array(Runbook);
export type ChangeRequestName = string;
export interface AutomationExecutionMetadata {
  AutomationExecutionId?: string;
  DocumentName?: string;
  DocumentVersion?: string;
  AutomationExecutionStatus?: AutomationExecutionStatus;
  ExecutionStartTime?: Date;
  ExecutionEndTime?: Date;
  ExecutedBy?: string;
  LogFile?: string;
  Outputs?: { [key: string]: string[] | undefined };
  Mode?: ExecutionMode;
  ParentAutomationExecutionId?: string;
  CurrentStepName?: string;
  CurrentAction?: string;
  FailureMessage?: string;
  WarningMessage?: string;
  TargetParameterName?: string;
  Targets?: Target[];
  TargetMaps?: { [key: string]: string[] | undefined }[];
  ResolvedTargets?: ResolvedTargets;
  MaxConcurrency?: string;
  MaxErrors?: string;
  Target?: string;
  AutomationType?: AutomationType;
  AlarmConfiguration?: AlarmConfiguration;
  TriggeredAlarms?: AlarmStateInformation[];
  TargetLocationsURL?: string;
  AutomationSubtype?: AutomationSubtype;
  ScheduledTime?: Date;
  Runbooks?: Runbook[];
  OpsItemId?: string;
  AssociationId?: string;
  ChangeRequestName?: string;
}
export const AutomationExecutionMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutomationExecutionId: S.optional(S.String),
    DocumentName: S.optional(S.String),
    DocumentVersion: S.optional(S.String),
    AutomationExecutionStatus: S.optional(AutomationExecutionStatus),
    ExecutionStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ExecutionEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ExecutedBy: S.optional(S.String),
    LogFile: S.optional(S.String),
    Outputs: S.optional(AutomationParameterMap),
    Mode: S.optional(ExecutionMode),
    ParentAutomationExecutionId: S.optional(S.String),
    CurrentStepName: S.optional(S.String),
    CurrentAction: S.optional(S.String),
    FailureMessage: S.optional(S.String),
    WarningMessage: S.optional(S.String),
    TargetParameterName: S.optional(S.String),
    Targets: S.optional(Targets),
    TargetMaps: S.optional(TargetMaps),
    ResolvedTargets: S.optional(ResolvedTargets),
    MaxConcurrency: S.optional(S.String),
    MaxErrors: S.optional(S.String),
    Target: S.optional(S.String),
    AutomationType: S.optional(AutomationType),
    AlarmConfiguration: S.optional(AlarmConfiguration),
    TriggeredAlarms: S.optional(AlarmStateInformationList),
    TargetLocationsURL: S.optional(S.String),
    AutomationSubtype: S.optional(AutomationSubtype),
    ScheduledTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Runbooks: S.optional(Runbooks),
    OpsItemId: S.optional(S.String),
    AssociationId: S.optional(S.String),
    ChangeRequestName: S.optional(S.String),
  }),
).annotate({
  identifier: "AutomationExecutionMetadata",
}) as any as S.Schema<AutomationExecutionMetadata>;
export type AutomationExecutionMetadataList = AutomationExecutionMetadata[];
export const AutomationExecutionMetadataList = /*@__PURE__*/ S.Array(
  AutomationExecutionMetadata,
);
export interface DescribeAutomationExecutionsResult {
  AutomationExecutionMetadataList?: AutomationExecutionMetadata[];
  NextToken?: string;
}
export const DescribeAutomationExecutionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutomationExecutionMetadataList: S.optional(
      AutomationExecutionMetadataList,
    ),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeAutomationExecutionsResult",
}) as any as S.Schema<DescribeAutomationExecutionsResult>;
export type StepExecutionFilterKey =
  | "StartTimeBefore"
  | "StartTimeAfter"
  | "StepExecutionStatus"
  | "StepExecutionId"
  | "StepName"
  | "Action"
  | "ParentStepExecutionId"
  | "ParentStepIteration"
  | "ParentStepIteratorValue"
  | (string & {});
export const StepExecutionFilterKey = S.String;

export type StepExecutionFilterValue = string;
export type StepExecutionFilterValueList = string[];
export const StepExecutionFilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface StepExecutionFilter {
  Key: StepExecutionFilterKey;
  Values: string[];
}
export const StepExecutionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: StepExecutionFilterKey,
    Values: StepExecutionFilterValueList,
  }),
).annotate({
  identifier: "StepExecutionFilter",
}) as any as S.Schema<StepExecutionFilter>;
export type StepExecutionFilterList = StepExecutionFilter[];
export const StepExecutionFilterList =
  /*@__PURE__*/ S.Array(StepExecutionFilter);
export interface DescribeAutomationStepExecutionsRequest {
  AutomationExecutionId: string;
  Filters?: StepExecutionFilter[];
  NextToken?: string;
  MaxResults?: number;
  ReverseOrder?: boolean;
}
export const DescribeAutomationStepExecutionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AutomationExecutionId: S.String,
      Filters: S.optional(StepExecutionFilterList),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
      ReverseOrder: S.optional(S.Boolean),
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
  identifier: "DescribeAutomationStepExecutionsRequest",
}) as any as S.Schema<DescribeAutomationStepExecutionsRequest>;
export type AutomationActionName = string;
export type NormalStringMap = { [key: string]: string | undefined };
export const NormalStringMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface FailureDetails {
  FailureStage?: string;
  FailureType?: string;
  Details?: { [key: string]: string[] | undefined };
}
export const FailureDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FailureStage: S.optional(S.String),
    FailureType: S.optional(S.String),
    Details: S.optional(AutomationParameterMap),
  }),
).annotate({ identifier: "FailureDetails" }) as any as S.Schema<FailureDetails>;
export type ValidNextStep = string;
export type ValidNextStepList = string[];
export const ValidNextStepList = /*@__PURE__*/ S.Array(S.String);
export interface ParentStepDetails {
  StepExecutionId?: string;
  StepName?: string;
  Action?: string;
  Iteration?: number;
  IteratorValue?: string;
}
export const ParentStepDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StepExecutionId: S.optional(S.String),
    StepName: S.optional(S.String),
    Action: S.optional(S.String),
    Iteration: S.optional(S.Number),
    IteratorValue: S.optional(S.String),
  }),
).annotate({
  identifier: "ParentStepDetails",
}) as any as S.Schema<ParentStepDetails>;
export interface StepExecution {
  StepName?: string;
  Action?: string;
  TimeoutSeconds?: number;
  OnFailure?: string;
  MaxAttempts?: number;
  ExecutionStartTime?: Date;
  ExecutionEndTime?: Date;
  StepStatus?: AutomationExecutionStatus;
  ResponseCode?: string;
  Inputs?: { [key: string]: string | undefined };
  Outputs?: { [key: string]: string[] | undefined };
  Response?: string;
  FailureMessage?: string;
  WarningMessage?: string;
  FailureDetails?: FailureDetails;
  StepExecutionId?: string;
  OverriddenParameters?: { [key: string]: string[] | undefined };
  IsEnd?: boolean;
  NextStep?: string;
  IsCritical?: boolean;
  ValidNextSteps?: string[];
  Targets?: Target[];
  TargetLocation?: TargetLocation;
  TriggeredAlarms?: AlarmStateInformation[];
  ParentStepDetails?: ParentStepDetails;
}
export const StepExecution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StepName: S.optional(S.String),
    Action: S.optional(S.String),
    TimeoutSeconds: S.optional(S.Number),
    OnFailure: S.optional(S.String),
    MaxAttempts: S.optional(S.Number),
    ExecutionStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ExecutionEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    StepStatus: S.optional(AutomationExecutionStatus),
    ResponseCode: S.optional(S.String),
    Inputs: S.optional(NormalStringMap),
    Outputs: S.optional(AutomationParameterMap),
    Response: S.optional(S.String),
    FailureMessage: S.optional(S.String),
    WarningMessage: S.optional(S.String),
    FailureDetails: S.optional(FailureDetails),
    StepExecutionId: S.optional(S.String),
    OverriddenParameters: S.optional(AutomationParameterMap),
    IsEnd: S.optional(S.Boolean),
    NextStep: S.optional(S.String),
    IsCritical: S.optional(S.Boolean),
    ValidNextSteps: S.optional(ValidNextStepList),
    Targets: S.optional(Targets),
    TargetLocation: S.optional(TargetLocation),
    TriggeredAlarms: S.optional(AlarmStateInformationList),
    ParentStepDetails: S.optional(ParentStepDetails),
  }),
).annotate({ identifier: "StepExecution" }) as any as S.Schema<StepExecution>;
export type StepExecutionList = StepExecution[];
export const StepExecutionList = /*@__PURE__*/ S.Array(StepExecution);
export interface DescribeAutomationStepExecutionsResult {
  StepExecutions?: StepExecution[];
  NextToken?: string;
}
export const DescribeAutomationStepExecutionsResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StepExecutions: S.optional(StepExecutionList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "DescribeAutomationStepExecutionsResult",
}) as any as S.Schema<DescribeAutomationStepExecutionsResult>;
export type PatchOrchestratorFilterKey = string;
export type PatchOrchestratorFilterValue = string;
export type PatchOrchestratorFilterValues = string[];
export const PatchOrchestratorFilterValues = /*@__PURE__*/ S.Array(S.String);
export interface PatchOrchestratorFilter {
  Key?: string;
  Values?: string[];
}
export const PatchOrchestratorFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(S.String),
    Values: S.optional(PatchOrchestratorFilterValues),
  }),
).annotate({
  identifier: "PatchOrchestratorFilter",
}) as any as S.Schema<PatchOrchestratorFilter>;
export type PatchOrchestratorFilterList = PatchOrchestratorFilter[];
export const PatchOrchestratorFilterList = /*@__PURE__*/ S.Array(
  PatchOrchestratorFilter,
);
export type PatchBaselineMaxResults = number;
export interface DescribeAvailablePatchesRequest {
  Filters?: PatchOrchestratorFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeAvailablePatchesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(PatchOrchestratorFilterList),
    MaxResults: S.optional(S.Number),
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
  identifier: "DescribeAvailablePatchesRequest",
}) as any as S.Schema<DescribeAvailablePatchesRequest>;
export type PatchTitle = string;
export type PatchDescription = string;
export type PatchContentUrl = string;
export type PatchVendor = string;
export type PatchProductFamily = string;
export type PatchProduct = string;
export type PatchClassification = string;
export type PatchMsrcSeverity = string;
export type PatchKbNumber = string;
export type PatchMsrcNumber = string;
export type PatchLanguage = string;
export type PatchAdvisoryId = string;
export type PatchAdvisoryIdList = string[];
export const PatchAdvisoryIdList = /*@__PURE__*/ S.Array(S.String);
export type PatchBugzillaId = string;
export type PatchBugzillaIdList = string[];
export const PatchBugzillaIdList = /*@__PURE__*/ S.Array(S.String);
export type PatchCVEId = string;
export type PatchCVEIdList = string[];
export const PatchCVEIdList = /*@__PURE__*/ S.Array(S.String);
export type PatchName = string;
export type PatchEpoch = number;
export type PatchVersion = string;
export type PatchRelease = string;
export type PatchArch = string;
export type PatchSeverity = string;
export type PatchRepository = string;
export interface Patch {
  Id?: string;
  ReleaseDate?: Date;
  Title?: string;
  Description?: string;
  ContentUrl?: string;
  Vendor?: string;
  ProductFamily?: string;
  Product?: string;
  Classification?: string;
  MsrcSeverity?: string;
  KbNumber?: string;
  MsrcNumber?: string;
  Language?: string;
  AdvisoryIds?: string[];
  BugzillaIds?: string[];
  CVEIds?: string[];
  Name?: string;
  Epoch?: number;
  Version?: string;
  Release?: string;
  Arch?: string;
  Severity?: string;
  Repository?: string;
}
export const Patch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ReleaseDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Title: S.optional(S.String),
    Description: S.optional(S.String),
    ContentUrl: S.optional(S.String),
    Vendor: S.optional(S.String),
    ProductFamily: S.optional(S.String),
    Product: S.optional(S.String),
    Classification: S.optional(S.String),
    MsrcSeverity: S.optional(S.String),
    KbNumber: S.optional(S.String),
    MsrcNumber: S.optional(S.String),
    Language: S.optional(S.String),
    AdvisoryIds: S.optional(PatchAdvisoryIdList),
    BugzillaIds: S.optional(PatchBugzillaIdList),
    CVEIds: S.optional(PatchCVEIdList),
    Name: S.optional(S.String),
    Epoch: S.optional(S.Number),
    Version: S.optional(S.String),
    Release: S.optional(S.String),
    Arch: S.optional(S.String),
    Severity: S.optional(S.String),
    Repository: S.optional(S.String),
  }),
).annotate({ identifier: "Patch" }) as any as S.Schema<Patch>;
export type PatchList = Patch[];
export const PatchList = /*@__PURE__*/ S.Array(Patch);
export interface DescribeAvailablePatchesResult {
  Patches?: Patch[];
  NextToken?: string;
}
export const DescribeAvailablePatchesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Patches: S.optional(PatchList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeAvailablePatchesResult",
}) as any as S.Schema<DescribeAvailablePatchesResult>;
export interface DescribeDocumentRequest {
  Name: string;
  DocumentVersion?: string;
  VersionName?: string;
}
export const DescribeDocumentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    DocumentVersion: S.optional(S.String),
    VersionName: S.optional(S.String),
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
  identifier: "DescribeDocumentRequest",
}) as any as S.Schema<DescribeDocumentRequest>;
export interface DescribeDocumentResult {
  Document?: DocumentDescription;
}
export const DescribeDocumentResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Document: S.optional(DocumentDescription) }).pipe(ns),
).annotate({
  identifier: "DescribeDocumentResult",
}) as any as S.Schema<DescribeDocumentResult>;
export type DocumentPermissionType = "Share" | (string & {});
export const DocumentPermissionType = S.String;

export type DocumentPermissionMaxResults = number;
export interface DescribeDocumentPermissionRequest {
  Name: string;
  PermissionType: DocumentPermissionType;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeDocumentPermissionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    PermissionType: DocumentPermissionType,
    MaxResults: S.optional(S.Number),
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
  identifier: "DescribeDocumentPermissionRequest",
}) as any as S.Schema<DescribeDocumentPermissionRequest>;
export type AccountId = string;
export type AccountIdList = string[];
export const AccountIdList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("AccountId")),
);
export type SharedDocumentVersion = string;
export interface AccountSharingInfo {
  AccountId?: string;
  SharedDocumentVersion?: string;
}
export const AccountSharingInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    SharedDocumentVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "AccountSharingInfo",
}) as any as S.Schema<AccountSharingInfo>;
export type AccountSharingInfoList = AccountSharingInfo[];
export const AccountSharingInfoList = /*@__PURE__*/ S.Array(
  AccountSharingInfo.pipe(T.XmlName("AccountSharingInfo")).annotate({
    identifier: "AccountSharingInfo",
  }),
);
export interface DescribeDocumentPermissionResponse {
  AccountIds?: string[];
  AccountSharingInfoList?: AccountSharingInfo[];
  NextToken?: string;
}
export const DescribeDocumentPermissionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountIds: S.optional(AccountIdList),
    AccountSharingInfoList: S.optional(AccountSharingInfoList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeDocumentPermissionResponse",
}) as any as S.Schema<DescribeDocumentPermissionResponse>;
export type EffectiveInstanceAssociationMaxResults = number;
export interface DescribeEffectiveInstanceAssociationsRequest {
  InstanceId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeEffectiveInstanceAssociationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      InstanceId: S.String,
      MaxResults: S.optional(S.Number),
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
    identifier: "DescribeEffectiveInstanceAssociationsRequest",
  }) as any as S.Schema<DescribeEffectiveInstanceAssociationsRequest>;
export interface InstanceAssociation {
  AssociationId?: string;
  InstanceId?: string;
  Content?: string;
  AssociationVersion?: string;
}
export const InstanceAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociationId: S.optional(S.String),
    InstanceId: S.optional(S.String),
    Content: S.optional(S.String),
    AssociationVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "InstanceAssociation",
}) as any as S.Schema<InstanceAssociation>;
export type InstanceAssociationList = InstanceAssociation[];
export const InstanceAssociationList =
  /*@__PURE__*/ S.Array(InstanceAssociation);
export interface DescribeEffectiveInstanceAssociationsResult {
  Associations?: InstanceAssociation[];
  NextToken?: string;
}
export const DescribeEffectiveInstanceAssociationsResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Associations: S.optional(InstanceAssociationList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeEffectiveInstanceAssociationsResult",
  }) as any as S.Schema<DescribeEffectiveInstanceAssociationsResult>;
export interface DescribeEffectivePatchesForPatchBaselineRequest {
  BaselineId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeEffectivePatchesForPatchBaselineRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      BaselineId: S.String,
      MaxResults: S.optional(S.Number),
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
    identifier: "DescribeEffectivePatchesForPatchBaselineRequest",
  }) as any as S.Schema<DescribeEffectivePatchesForPatchBaselineRequest>;
export type PatchDeploymentStatus =
  | "APPROVED"
  | "PENDING_APPROVAL"
  | "EXPLICIT_APPROVED"
  | "EXPLICIT_REJECTED"
  | (string & {});
export const PatchDeploymentStatus = S.String;

export interface PatchStatus {
  DeploymentStatus?: PatchDeploymentStatus;
  ComplianceLevel?: PatchComplianceLevel;
  ApprovalDate?: Date;
}
export const PatchStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeploymentStatus: S.optional(PatchDeploymentStatus),
    ComplianceLevel: S.optional(PatchComplianceLevel),
    ApprovalDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "PatchStatus" }) as any as S.Schema<PatchStatus>;
export interface EffectivePatch {
  Patch?: Patch;
  PatchStatus?: PatchStatus;
}
export const EffectivePatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Patch: S.optional(Patch), PatchStatus: S.optional(PatchStatus) }),
).annotate({ identifier: "EffectivePatch" }) as any as S.Schema<EffectivePatch>;
export type EffectivePatchList = EffectivePatch[];
export const EffectivePatchList = /*@__PURE__*/ S.Array(EffectivePatch);
export interface DescribeEffectivePatchesForPatchBaselineResult {
  EffectivePatches?: EffectivePatch[];
  NextToken?: string;
}
export const DescribeEffectivePatchesForPatchBaselineResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EffectivePatches: S.optional(EffectivePatchList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeEffectivePatchesForPatchBaselineResult",
  }) as any as S.Schema<DescribeEffectivePatchesForPatchBaselineResult>;
export interface DescribeInstanceAssociationsStatusRequest {
  InstanceId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeInstanceAssociationsStatusRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      InstanceId: S.String,
      MaxResults: S.optional(S.Number),
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
    identifier: "DescribeInstanceAssociationsStatusRequest",
  }) as any as S.Schema<DescribeInstanceAssociationsStatusRequest>;
export type InstanceAssociationExecutionSummary = string;
export type AgentErrorCode = string;
export type Url = string;
export interface S3OutputUrl {
  OutputUrl?: string;
}
export const S3OutputUrl = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OutputUrl: S.optional(S.String) }),
).annotate({ identifier: "S3OutputUrl" }) as any as S.Schema<S3OutputUrl>;
export interface InstanceAssociationOutputUrl {
  S3OutputUrl?: S3OutputUrl;
}
export const InstanceAssociationOutputUrl = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3OutputUrl: S.optional(S3OutputUrl) }),
).annotate({
  identifier: "InstanceAssociationOutputUrl",
}) as any as S.Schema<InstanceAssociationOutputUrl>;
export interface InstanceAssociationStatusInfo {
  AssociationId?: string;
  Name?: string;
  DocumentVersion?: string;
  AssociationVersion?: string;
  InstanceId?: string;
  ExecutionDate?: Date;
  Status?: string;
  DetailedStatus?: string;
  ExecutionSummary?: string;
  ErrorCode?: string;
  OutputUrl?: InstanceAssociationOutputUrl;
  AssociationName?: string;
}
export const InstanceAssociationStatusInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociationId: S.optional(S.String),
    Name: S.optional(S.String),
    DocumentVersion: S.optional(S.String),
    AssociationVersion: S.optional(S.String),
    InstanceId: S.optional(S.String),
    ExecutionDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(S.String),
    DetailedStatus: S.optional(S.String),
    ExecutionSummary: S.optional(S.String),
    ErrorCode: S.optional(S.String),
    OutputUrl: S.optional(InstanceAssociationOutputUrl),
    AssociationName: S.optional(S.String),
  }),
).annotate({
  identifier: "InstanceAssociationStatusInfo",
}) as any as S.Schema<InstanceAssociationStatusInfo>;
export type InstanceAssociationStatusInfos = InstanceAssociationStatusInfo[];
export const InstanceAssociationStatusInfos = /*@__PURE__*/ S.Array(
  InstanceAssociationStatusInfo,
);
export interface DescribeInstanceAssociationsStatusResult {
  InstanceAssociationStatusInfos?: InstanceAssociationStatusInfo[];
  NextToken?: string;
}
export const DescribeInstanceAssociationsStatusResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      InstanceAssociationStatusInfos: S.optional(
        InstanceAssociationStatusInfos,
      ),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "DescribeInstanceAssociationsStatusResult",
}) as any as S.Schema<DescribeInstanceAssociationsStatusResult>;
export type InstanceInformationFilterKey =
  | "InstanceIds"
  | "AgentVersion"
  | "PingStatus"
  | "PlatformTypes"
  | "ActivationIds"
  | "IamRole"
  | "ResourceType"
  | "AssociationStatus"
  | (string & {});
export const InstanceInformationFilterKey = S.String;

export type InstanceInformationFilterValue = string;
export type InstanceInformationFilterValueSet = string[];
export const InstanceInformationFilterValueSet = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("InstanceInformationFilterValue")),
);
export interface InstanceInformationFilter {
  key: InstanceInformationFilterKey;
  valueSet: string[];
}
export const InstanceInformationFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    key: InstanceInformationFilterKey,
    valueSet: InstanceInformationFilterValueSet,
  }),
).annotate({
  identifier: "InstanceInformationFilter",
}) as any as S.Schema<InstanceInformationFilter>;
export type InstanceInformationFilterList = InstanceInformationFilter[];
export const InstanceInformationFilterList = /*@__PURE__*/ S.Array(
  InstanceInformationFilter.pipe(
    T.XmlName("InstanceInformationFilter"),
  ).annotate({ identifier: "InstanceInformationFilter" }),
);
export type InstanceInformationStringFilterKey = string;
export interface InstanceInformationStringFilter {
  Key: string;
  Values: string[];
}
export const InstanceInformationStringFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Values: InstanceInformationFilterValueSet }),
).annotate({
  identifier: "InstanceInformationStringFilter",
}) as any as S.Schema<InstanceInformationStringFilter>;
export type InstanceInformationStringFilterList =
  InstanceInformationStringFilter[];
export const InstanceInformationStringFilterList = /*@__PURE__*/ S.Array(
  InstanceInformationStringFilter.pipe(
    T.XmlName("InstanceInformationStringFilter"),
  ).annotate({ identifier: "InstanceInformationStringFilter" }),
);
export type MaxResultsEC2Compatible = number;
export interface DescribeInstanceInformationRequest {
  InstanceInformationFilterList?: InstanceInformationFilter[];
  Filters?: InstanceInformationStringFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeInstanceInformationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceInformationFilterList: S.optional(InstanceInformationFilterList),
    Filters: S.optional(InstanceInformationStringFilterList),
    MaxResults: S.optional(S.Number),
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
  identifier: "DescribeInstanceInformationRequest",
}) as any as S.Schema<DescribeInstanceInformationRequest>;
export type PingStatus =
  | "Online"
  | "ConnectionLost"
  | "Inactive"
  | (string & {});
export const PingStatus = S.String;

export type Version = string;
export type ResourceType = "ManagedInstance" | "EC2Instance" | (string & {});
export const ResourceType = S.String;

export type IPAddress = string | redacted.Redacted<string>;
export type ComputerName = string;
export type InstanceAssociationStatusAggregatedCount = {
  [key: string]: number | undefined;
};
export const InstanceAssociationStatusAggregatedCount = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export interface InstanceAggregatedAssociationOverview {
  DetailedStatus?: string;
  InstanceAssociationStatusAggregatedCount?: {
    [key: string]: number | undefined;
  };
}
export const InstanceAggregatedAssociationOverview = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DetailedStatus: S.optional(S.String),
      InstanceAssociationStatusAggregatedCount: S.optional(
        InstanceAssociationStatusAggregatedCount,
      ),
    }),
).annotate({
  identifier: "InstanceAggregatedAssociationOverview",
}) as any as S.Schema<InstanceAggregatedAssociationOverview>;
export type SourceId = string;
export type SourceType =
  | "AWS::EC2::Instance"
  | "AWS::IoT::Thing"
  | "AWS::SSM::ManagedInstance"
  | "Microsoft.Compute/virtualMachines"
  | (string & {});
export const SourceType = S.String;

export type SourceLocation = string;
export interface InstanceInformation {
  InstanceId?: string;
  PingStatus?: PingStatus;
  LastPingDateTime?: Date;
  AgentVersion?: string;
  IsLatestVersion?: boolean;
  PlatformType?: PlatformType;
  PlatformName?: string;
  PlatformVersion?: string;
  ActivationId?: string;
  IamRole?: string;
  RegistrationDate?: Date;
  ResourceType?: ResourceType;
  Name?: string;
  IPAddress?: string | redacted.Redacted<string>;
  ComputerName?: string;
  AssociationStatus?: string;
  LastAssociationExecutionDate?: Date;
  LastSuccessfulAssociationExecutionDate?: Date;
  AssociationOverview?: InstanceAggregatedAssociationOverview;
  SourceId?: string;
  SourceType?: SourceType;
  SourceLocation?: string;
}
export const InstanceInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceId: S.optional(S.String),
    PingStatus: S.optional(PingStatus),
    LastPingDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AgentVersion: S.optional(S.String),
    IsLatestVersion: S.optional(S.Boolean),
    PlatformType: S.optional(PlatformType),
    PlatformName: S.optional(S.String),
    PlatformVersion: S.optional(S.String),
    ActivationId: S.optional(S.String),
    IamRole: S.optional(S.String),
    RegistrationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ResourceType: S.optional(ResourceType),
    Name: S.optional(S.String),
    IPAddress: S.optional(SensitiveString),
    ComputerName: S.optional(S.String),
    AssociationStatus: S.optional(S.String),
    LastAssociationExecutionDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastSuccessfulAssociationExecutionDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AssociationOverview: S.optional(InstanceAggregatedAssociationOverview),
    SourceId: S.optional(S.String),
    SourceType: S.optional(SourceType),
    SourceLocation: S.optional(S.String),
  }),
).annotate({
  identifier: "InstanceInformation",
}) as any as S.Schema<InstanceInformation>;
export type InstanceInformationList = InstanceInformation[];
export const InstanceInformationList = /*@__PURE__*/ S.Array(
  InstanceInformation.pipe(T.XmlName("InstanceInformation")).annotate({
    identifier: "InstanceInformation",
  }),
);
export interface DescribeInstanceInformationResult {
  InstanceInformationList?: InstanceInformation[];
  NextToken?: string;
}
export const DescribeInstanceInformationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceInformationList: S.optional(InstanceInformationList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeInstanceInformationResult",
}) as any as S.Schema<DescribeInstanceInformationResult>;
export type PatchComplianceMaxResults = number;
export interface DescribeInstancePatchesRequest {
  InstanceId: string;
  Filters?: PatchOrchestratorFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeInstancePatchesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceId: S.String,
    Filters: S.optional(PatchOrchestratorFilterList),
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
  identifier: "DescribeInstancePatchesRequest",
}) as any as S.Schema<DescribeInstancePatchesRequest>;
export type PatchComplianceDataState =
  | "INSTALLED"
  | "INSTALLED_OTHER"
  | "INSTALLED_PENDING_REBOOT"
  | "INSTALLED_REJECTED"
  | "MISSING"
  | "NOT_APPLICABLE"
  | "FAILED"
  | "AVAILABLE_SECURITY_UPDATE"
  | (string & {});
export const PatchComplianceDataState = S.String;

export type PatchCVEIds = string;
export interface PatchComplianceData {
  Title: string;
  KBId: string;
  Classification: string;
  Severity: string;
  State: PatchComplianceDataState;
  InstalledTime: Date;
  CVEIds?: string;
}
export const PatchComplianceData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Title: S.String,
    KBId: S.String,
    Classification: S.String,
    Severity: S.String,
    State: PatchComplianceDataState,
    InstalledTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    CVEIds: S.optional(S.String),
  }),
).annotate({
  identifier: "PatchComplianceData",
}) as any as S.Schema<PatchComplianceData>;
export type PatchComplianceDataList = PatchComplianceData[];
export const PatchComplianceDataList =
  /*@__PURE__*/ S.Array(PatchComplianceData);
export interface DescribeInstancePatchesResult {
  Patches?: PatchComplianceData[];
  NextToken?: string;
}
export const DescribeInstancePatchesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Patches: S.optional(PatchComplianceDataList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeInstancePatchesResult",
}) as any as S.Schema<DescribeInstancePatchesResult>;
export interface DescribeInstancePatchStatesRequest {
  InstanceIds: string[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeInstancePatchStatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceIds: InstanceIdList,
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
  identifier: "DescribeInstancePatchStatesRequest",
}) as any as S.Schema<DescribeInstancePatchStatesRequest>;
export type SnapshotId = string;
export type InstallOverrideList = string;
export type OwnerInformation = string | redacted.Redacted<string>;
export type PatchInstalledCount = number;
export type PatchInstalledOtherCount = number;
export type PatchInstalledPendingRebootCount = number;
export type PatchInstalledRejectedCount = number;
export type PatchMissingCount = number;
export type PatchFailedCount = number;
export type PatchUnreportedNotApplicableCount = number;
export type PatchNotApplicableCount = number;
export type PatchAvailableSecurityUpdateCount = number;
export type PatchOperationType = "Scan" | "Install" | (string & {});
export const PatchOperationType = S.String;

export type RebootOption = "RebootIfNeeded" | "NoReboot" | (string & {});
export const RebootOption = S.String;

export type PatchCriticalNonCompliantCount = number;
export type PatchSecurityNonCompliantCount = number;
export type PatchOtherNonCompliantCount = number;
export interface InstancePatchState {
  InstanceId: string;
  PatchGroup: string;
  BaselineId: string;
  SnapshotId?: string;
  InstallOverrideList?: string;
  OwnerInformation?: string | redacted.Redacted<string>;
  InstalledCount?: number;
  InstalledOtherCount?: number;
  InstalledPendingRebootCount?: number;
  InstalledRejectedCount?: number;
  MissingCount?: number;
  FailedCount?: number;
  UnreportedNotApplicableCount?: number;
  NotApplicableCount?: number;
  AvailableSecurityUpdateCount?: number;
  OperationStartTime: Date;
  OperationEndTime: Date;
  Operation: PatchOperationType;
  LastNoRebootInstallOperationTime?: Date;
  RebootOption?: RebootOption;
  CriticalNonCompliantCount?: number;
  SecurityNonCompliantCount?: number;
  OtherNonCompliantCount?: number;
}
export const InstancePatchState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceId: S.String,
    PatchGroup: S.String,
    BaselineId: S.String,
    SnapshotId: S.optional(S.String),
    InstallOverrideList: S.optional(S.String),
    OwnerInformation: S.optional(SensitiveString),
    InstalledCount: S.optional(S.Number),
    InstalledOtherCount: S.optional(S.Number),
    InstalledPendingRebootCount: S.optional(S.Number),
    InstalledRejectedCount: S.optional(S.Number),
    MissingCount: S.optional(S.Number),
    FailedCount: S.optional(S.Number),
    UnreportedNotApplicableCount: S.optional(S.Number),
    NotApplicableCount: S.optional(S.Number),
    AvailableSecurityUpdateCount: S.optional(S.Number),
    OperationStartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    OperationEndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Operation: PatchOperationType,
    LastNoRebootInstallOperationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    RebootOption: S.optional(RebootOption),
    CriticalNonCompliantCount: S.optional(S.Number),
    SecurityNonCompliantCount: S.optional(S.Number),
    OtherNonCompliantCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "InstancePatchState",
}) as any as S.Schema<InstancePatchState>;
export type InstancePatchStateList = InstancePatchState[];
export const InstancePatchStateList = /*@__PURE__*/ S.Array(InstancePatchState);
export interface DescribeInstancePatchStatesResult {
  InstancePatchStates?: InstancePatchState[];
  NextToken?: string;
}
export const DescribeInstancePatchStatesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstancePatchStates: S.optional(InstancePatchStateList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeInstancePatchStatesResult",
}) as any as S.Schema<DescribeInstancePatchStatesResult>;
export type InstancePatchStateFilterKey = string;
export type InstancePatchStateFilterValue = string;
export type InstancePatchStateFilterValues = string[];
export const InstancePatchStateFilterValues = /*@__PURE__*/ S.Array(S.String);
export type InstancePatchStateOperatorType =
  | "Equal"
  | "NotEqual"
  | "LessThan"
  | "GreaterThan"
  | (string & {});
export const InstancePatchStateOperatorType = S.String;

export interface InstancePatchStateFilter {
  Key: string;
  Values: string[];
  Type: InstancePatchStateOperatorType;
}
export const InstancePatchStateFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.String,
    Values: InstancePatchStateFilterValues,
    Type: InstancePatchStateOperatorType,
  }),
).annotate({
  identifier: "InstancePatchStateFilter",
}) as any as S.Schema<InstancePatchStateFilter>;
export type InstancePatchStateFilterList = InstancePatchStateFilter[];
export const InstancePatchStateFilterList = /*@__PURE__*/ S.Array(
  InstancePatchStateFilter,
);
export interface DescribeInstancePatchStatesForPatchGroupRequest {
  PatchGroup: string;
  Filters?: InstancePatchStateFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeInstancePatchStatesForPatchGroupRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      PatchGroup: S.String,
      Filters: S.optional(InstancePatchStateFilterList),
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
    identifier: "DescribeInstancePatchStatesForPatchGroupRequest",
  }) as any as S.Schema<DescribeInstancePatchStatesForPatchGroupRequest>;
export type InstancePatchStatesList = InstancePatchState[];
export const InstancePatchStatesList =
  /*@__PURE__*/ S.Array(InstancePatchState);
export interface DescribeInstancePatchStatesForPatchGroupResult {
  InstancePatchStates?: InstancePatchState[];
  NextToken?: string;
}
export const DescribeInstancePatchStatesForPatchGroupResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      InstancePatchStates: S.optional(InstancePatchStatesList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeInstancePatchStatesForPatchGroupResult",
  }) as any as S.Schema<DescribeInstancePatchStatesForPatchGroupResult>;
export type InstancePropertyFilterKey =
  | "InstanceIds"
  | "AgentVersion"
  | "PingStatus"
  | "PlatformTypes"
  | "DocumentName"
  | "ActivationIds"
  | "IamRole"
  | "ResourceType"
  | "AssociationStatus"
  | (string & {});
export const InstancePropertyFilterKey = S.String;

export type InstancePropertyFilterValue = string;
export type InstancePropertyFilterValueSet = string[];
export const InstancePropertyFilterValueSet = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("InstancePropertyFilterValue")),
);
export interface InstancePropertyFilter {
  key: InstancePropertyFilterKey;
  valueSet: string[];
}
export const InstancePropertyFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    key: InstancePropertyFilterKey,
    valueSet: InstancePropertyFilterValueSet,
  }),
).annotate({
  identifier: "InstancePropertyFilter",
}) as any as S.Schema<InstancePropertyFilter>;
export type InstancePropertyFilterList = InstancePropertyFilter[];
export const InstancePropertyFilterList = /*@__PURE__*/ S.Array(
  InstancePropertyFilter.pipe(T.XmlName("InstancePropertyFilter")).annotate({
    identifier: "InstancePropertyFilter",
  }),
);
export type InstancePropertyStringFilterKey = string;
export type InstancePropertyFilterOperator =
  | "Equal"
  | "NotEqual"
  | "BeginWith"
  | "LessThan"
  | "GreaterThan"
  | (string & {});
export const InstancePropertyFilterOperator = S.String;

export interface InstancePropertyStringFilter {
  Key: string;
  Values: string[];
  Operator?: InstancePropertyFilterOperator;
}
export const InstancePropertyStringFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.String,
    Values: InstancePropertyFilterValueSet,
    Operator: S.optional(InstancePropertyFilterOperator),
  }),
).annotate({
  identifier: "InstancePropertyStringFilter",
}) as any as S.Schema<InstancePropertyStringFilter>;
export type InstancePropertyStringFilterList = InstancePropertyStringFilter[];
export const InstancePropertyStringFilterList = /*@__PURE__*/ S.Array(
  InstancePropertyStringFilter.pipe(
    T.XmlName("InstancePropertyStringFilter"),
  ).annotate({ identifier: "InstancePropertyStringFilter" }),
);
export type DescribeInstancePropertiesMaxResults = number;
export interface DescribeInstancePropertiesRequest {
  InstancePropertyFilterList?: InstancePropertyFilter[];
  FiltersWithOperator?: InstancePropertyStringFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeInstancePropertiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstancePropertyFilterList: S.optional(InstancePropertyFilterList),
    FiltersWithOperator: S.optional(InstancePropertyStringFilterList),
    MaxResults: S.optional(S.Number),
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
  identifier: "DescribeInstancePropertiesRequest",
}) as any as S.Schema<DescribeInstancePropertiesRequest>;
export type InstanceName = string;
export type InstanceType = string;
export type InstanceRole = string;
export type KeyName = string;
export type InstanceState = string;
export type Architecture = string;
export type PlatformName = string;
export type PlatformVersion = string;
export type AvailabilityZone = string;
export interface InstanceProperty {
  Name?: string;
  InstanceId?: string;
  InstanceType?: string;
  InstanceRole?: string;
  KeyName?: string;
  InstanceState?: string;
  Architecture?: string;
  IPAddress?: string | redacted.Redacted<string>;
  LaunchTime?: Date;
  PingStatus?: PingStatus;
  LastPingDateTime?: Date;
  AgentVersion?: string;
  PlatformType?: PlatformType;
  PlatformName?: string;
  PlatformVersion?: string;
  ActivationId?: string;
  IamRole?: string;
  RegistrationDate?: Date;
  ResourceType?: string;
  ComputerName?: string;
  AssociationStatus?: string;
  LastAssociationExecutionDate?: Date;
  LastSuccessfulAssociationExecutionDate?: Date;
  AssociationOverview?: InstanceAggregatedAssociationOverview;
  SourceId?: string;
  SourceType?: SourceType;
  SourceLocation?: string;
  AvailabilityZone?: string;
}
export const InstanceProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    InstanceId: S.optional(S.String),
    InstanceType: S.optional(S.String),
    InstanceRole: S.optional(S.String),
    KeyName: S.optional(S.String),
    InstanceState: S.optional(S.String),
    Architecture: S.optional(S.String),
    IPAddress: S.optional(SensitiveString),
    LaunchTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    PingStatus: S.optional(PingStatus),
    LastPingDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AgentVersion: S.optional(S.String),
    PlatformType: S.optional(PlatformType),
    PlatformName: S.optional(S.String),
    PlatformVersion: S.optional(S.String),
    ActivationId: S.optional(S.String),
    IamRole: S.optional(S.String),
    RegistrationDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ResourceType: S.optional(S.String),
    ComputerName: S.optional(S.String),
    AssociationStatus: S.optional(S.String),
    LastAssociationExecutionDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastSuccessfulAssociationExecutionDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AssociationOverview: S.optional(InstanceAggregatedAssociationOverview),
    SourceId: S.optional(S.String),
    SourceType: S.optional(SourceType),
    SourceLocation: S.optional(S.String),
    AvailabilityZone: S.optional(S.String),
  }),
).annotate({
  identifier: "InstanceProperty",
}) as any as S.Schema<InstanceProperty>;
export type InstanceProperties = InstanceProperty[];
export const InstanceProperties = /*@__PURE__*/ S.Array(
  InstanceProperty.pipe(T.XmlName("InstanceProperty")).annotate({
    identifier: "InstanceProperty",
  }),
);
export interface DescribeInstancePropertiesResult {
  InstanceProperties?: InstanceProperty[];
  NextToken?: string;
}
export const DescribeInstancePropertiesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceProperties: S.optional(InstanceProperties),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeInstancePropertiesResult",
}) as any as S.Schema<DescribeInstancePropertiesResult>;
export interface DescribeInventoryDeletionsRequest {
  DeletionId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeInventoryDeletionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeletionId: S.optional(S.String),
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
  identifier: "DescribeInventoryDeletionsRequest",
}) as any as S.Schema<DescribeInventoryDeletionsRequest>;
export type InventoryDeletionStartTime = Date;
export type InventoryDeletionStatus = "InProgress" | "Complete" | (string & {});
export const InventoryDeletionStatus = S.String;

export type InventoryDeletionLastStatusMessage = string;
export type InventoryDeletionLastStatusUpdateTime = Date;
export interface InventoryDeletionStatusItem {
  DeletionId?: string;
  TypeName?: string;
  DeletionStartTime?: Date;
  LastStatus?: InventoryDeletionStatus;
  LastStatusMessage?: string;
  DeletionSummary?: InventoryDeletionSummary;
  LastStatusUpdateTime?: Date;
}
export const InventoryDeletionStatusItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeletionId: S.optional(S.String),
    TypeName: S.optional(S.String),
    DeletionStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastStatus: S.optional(InventoryDeletionStatus),
    LastStatusMessage: S.optional(S.String),
    DeletionSummary: S.optional(InventoryDeletionSummary),
    LastStatusUpdateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "InventoryDeletionStatusItem",
}) as any as S.Schema<InventoryDeletionStatusItem>;
export type InventoryDeletionsList = InventoryDeletionStatusItem[];
export const InventoryDeletionsList = /*@__PURE__*/ S.Array(
  InventoryDeletionStatusItem,
);
export interface DescribeInventoryDeletionsResult {
  InventoryDeletions?: InventoryDeletionStatusItem[];
  NextToken?: string;
}
export const DescribeInventoryDeletionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InventoryDeletions: S.optional(InventoryDeletionsList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeInventoryDeletionsResult",
}) as any as S.Schema<DescribeInventoryDeletionsResult>;
export type MaintenanceWindowFilterKey = string;
export type MaintenanceWindowFilterValue = string;
export type MaintenanceWindowFilterValues = string[];
export const MaintenanceWindowFilterValues = /*@__PURE__*/ S.Array(S.String);
export interface MaintenanceWindowFilter {
  Key?: string;
  Values?: string[];
}
export const MaintenanceWindowFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(S.String),
    Values: S.optional(MaintenanceWindowFilterValues),
  }),
).annotate({
  identifier: "MaintenanceWindowFilter",
}) as any as S.Schema<MaintenanceWindowFilter>;
export type MaintenanceWindowFilterList = MaintenanceWindowFilter[];
export const MaintenanceWindowFilterList = /*@__PURE__*/ S.Array(
  MaintenanceWindowFilter,
);
export type MaintenanceWindowMaxResults = number;
export interface DescribeMaintenanceWindowExecutionsRequest {
  WindowId: string;
  Filters?: MaintenanceWindowFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeMaintenanceWindowExecutionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      WindowId: S.String,
      Filters: S.optional(MaintenanceWindowFilterList),
      MaxResults: S.optional(S.Number),
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
    identifier: "DescribeMaintenanceWindowExecutionsRequest",
  }) as any as S.Schema<DescribeMaintenanceWindowExecutionsRequest>;
export type MaintenanceWindowExecutionStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "SUCCESS"
  | "FAILED"
  | "TIMED_OUT"
  | "CANCELLING"
  | "CANCELLED"
  | "SKIPPED_OVERLAPPING"
  | (string & {});
export const MaintenanceWindowExecutionStatus = S.String;

export type MaintenanceWindowExecutionStatusDetails = string;
export interface MaintenanceWindowExecution {
  WindowId?: string;
  WindowExecutionId?: string;
  Status?: MaintenanceWindowExecutionStatus;
  StatusDetails?: string;
  StartTime?: Date;
  EndTime?: Date;
}
export const MaintenanceWindowExecution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WindowId: S.optional(S.String),
    WindowExecutionId: S.optional(S.String),
    Status: S.optional(MaintenanceWindowExecutionStatus),
    StatusDetails: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "MaintenanceWindowExecution",
}) as any as S.Schema<MaintenanceWindowExecution>;
export type MaintenanceWindowExecutionList = MaintenanceWindowExecution[];
export const MaintenanceWindowExecutionList = /*@__PURE__*/ S.Array(
  MaintenanceWindowExecution,
);
export interface DescribeMaintenanceWindowExecutionsResult {
  WindowExecutions?: MaintenanceWindowExecution[];
  NextToken?: string;
}
export const DescribeMaintenanceWindowExecutionsResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      WindowExecutions: S.optional(MaintenanceWindowExecutionList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeMaintenanceWindowExecutionsResult",
  }) as any as S.Schema<DescribeMaintenanceWindowExecutionsResult>;
export type MaintenanceWindowExecutionTaskId = string;
export interface DescribeMaintenanceWindowExecutionTaskInvocationsRequest {
  WindowExecutionId: string;
  TaskId: string;
  Filters?: MaintenanceWindowFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeMaintenanceWindowExecutionTaskInvocationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      WindowExecutionId: S.String,
      TaskId: S.String,
      Filters: S.optional(MaintenanceWindowFilterList),
      MaxResults: S.optional(S.Number),
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
    identifier: "DescribeMaintenanceWindowExecutionTaskInvocationsRequest",
  }) as any as S.Schema<DescribeMaintenanceWindowExecutionTaskInvocationsRequest>;
export type MaintenanceWindowExecutionTaskInvocationId = string;
export type MaintenanceWindowExecutionTaskExecutionId = string;
export type MaintenanceWindowTaskType =
  | "RUN_COMMAND"
  | "AUTOMATION"
  | "STEP_FUNCTIONS"
  | "LAMBDA"
  | (string & {});
export const MaintenanceWindowTaskType = S.String;

export type MaintenanceWindowExecutionTaskInvocationParameters =
  | string
  | redacted.Redacted<string>;
export type MaintenanceWindowTaskTargetId = string;
export interface MaintenanceWindowExecutionTaskInvocationIdentity {
  WindowExecutionId?: string;
  TaskExecutionId?: string;
  InvocationId?: string;
  ExecutionId?: string;
  TaskType?: MaintenanceWindowTaskType;
  Parameters?: string | redacted.Redacted<string>;
  Status?: MaintenanceWindowExecutionStatus;
  StatusDetails?: string;
  StartTime?: Date;
  EndTime?: Date;
  OwnerInformation?: string | redacted.Redacted<string>;
  WindowTargetId?: string;
}
export const MaintenanceWindowExecutionTaskInvocationIdentity =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      WindowExecutionId: S.optional(S.String),
      TaskExecutionId: S.optional(S.String),
      InvocationId: S.optional(S.String),
      ExecutionId: S.optional(S.String),
      TaskType: S.optional(MaintenanceWindowTaskType),
      Parameters: S.optional(SensitiveString),
      Status: S.optional(MaintenanceWindowExecutionStatus),
      StatusDetails: S.optional(S.String),
      StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      OwnerInformation: S.optional(SensitiveString),
      WindowTargetId: S.optional(S.String),
    }),
  ).annotate({
    identifier: "MaintenanceWindowExecutionTaskInvocationIdentity",
  }) as any as S.Schema<MaintenanceWindowExecutionTaskInvocationIdentity>;
export type MaintenanceWindowExecutionTaskInvocationIdentityList =
  MaintenanceWindowExecutionTaskInvocationIdentity[];
export const MaintenanceWindowExecutionTaskInvocationIdentityList =
  /*@__PURE__*/ S.Array(MaintenanceWindowExecutionTaskInvocationIdentity);
export interface DescribeMaintenanceWindowExecutionTaskInvocationsResult {
  WindowExecutionTaskInvocationIdentities?: MaintenanceWindowExecutionTaskInvocationIdentity[];
  NextToken?: string;
}
export const DescribeMaintenanceWindowExecutionTaskInvocationsResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      WindowExecutionTaskInvocationIdentities: S.optional(
        MaintenanceWindowExecutionTaskInvocationIdentityList,
      ),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeMaintenanceWindowExecutionTaskInvocationsResult",
  }) as any as S.Schema<DescribeMaintenanceWindowExecutionTaskInvocationsResult>;
export interface DescribeMaintenanceWindowExecutionTasksRequest {
  WindowExecutionId: string;
  Filters?: MaintenanceWindowFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeMaintenanceWindowExecutionTasksRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      WindowExecutionId: S.String,
      Filters: S.optional(MaintenanceWindowFilterList),
      MaxResults: S.optional(S.Number),
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
    identifier: "DescribeMaintenanceWindowExecutionTasksRequest",
  }) as any as S.Schema<DescribeMaintenanceWindowExecutionTasksRequest>;
export type MaintenanceWindowTaskArn = string;
export interface MaintenanceWindowExecutionTaskIdentity {
  WindowExecutionId?: string;
  TaskExecutionId?: string;
  Status?: MaintenanceWindowExecutionStatus;
  StatusDetails?: string;
  StartTime?: Date;
  EndTime?: Date;
  TaskArn?: string;
  TaskType?: MaintenanceWindowTaskType;
  AlarmConfiguration?: AlarmConfiguration;
  TriggeredAlarms?: AlarmStateInformation[];
}
export const MaintenanceWindowExecutionTaskIdentity = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      WindowExecutionId: S.optional(S.String),
      TaskExecutionId: S.optional(S.String),
      Status: S.optional(MaintenanceWindowExecutionStatus),
      StatusDetails: S.optional(S.String),
      StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      TaskArn: S.optional(S.String),
      TaskType: S.optional(MaintenanceWindowTaskType),
      AlarmConfiguration: S.optional(AlarmConfiguration),
      TriggeredAlarms: S.optional(AlarmStateInformationList),
    }),
).annotate({
  identifier: "MaintenanceWindowExecutionTaskIdentity",
}) as any as S.Schema<MaintenanceWindowExecutionTaskIdentity>;
export type MaintenanceWindowExecutionTaskIdentityList =
  MaintenanceWindowExecutionTaskIdentity[];
export const MaintenanceWindowExecutionTaskIdentityList = /*@__PURE__*/ S.Array(
  MaintenanceWindowExecutionTaskIdentity,
);
export interface DescribeMaintenanceWindowExecutionTasksResult {
  WindowExecutionTaskIdentities?: MaintenanceWindowExecutionTaskIdentity[];
  NextToken?: string;
}
export const DescribeMaintenanceWindowExecutionTasksResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      WindowExecutionTaskIdentities: S.optional(
        MaintenanceWindowExecutionTaskIdentityList,
      ),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeMaintenanceWindowExecutionTasksResult",
  }) as any as S.Schema<DescribeMaintenanceWindowExecutionTasksResult>;
export interface DescribeMaintenanceWindowsRequest {
  Filters?: MaintenanceWindowFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeMaintenanceWindowsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(MaintenanceWindowFilterList),
    MaxResults: S.optional(S.Number),
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
  identifier: "DescribeMaintenanceWindowsRequest",
}) as any as S.Schema<DescribeMaintenanceWindowsRequest>;
export type MaintenanceWindowEnabled = boolean;
export interface MaintenanceWindowIdentity {
  WindowId?: string;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  Enabled?: boolean;
  Duration?: number;
  Cutoff?: number;
  Schedule?: string;
  ScheduleTimezone?: string;
  ScheduleOffset?: number;
  EndDate?: string;
  StartDate?: string;
  NextExecutionTime?: string;
}
export const MaintenanceWindowIdentity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WindowId: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(SensitiveString),
    Enabled: S.optional(S.Boolean),
    Duration: S.optional(S.Number),
    Cutoff: S.optional(S.Number),
    Schedule: S.optional(S.String),
    ScheduleTimezone: S.optional(S.String),
    ScheduleOffset: S.optional(S.Number),
    EndDate: S.optional(S.String),
    StartDate: S.optional(S.String),
    NextExecutionTime: S.optional(S.String),
  }),
).annotate({
  identifier: "MaintenanceWindowIdentity",
}) as any as S.Schema<MaintenanceWindowIdentity>;
export type MaintenanceWindowIdentityList = MaintenanceWindowIdentity[];
export const MaintenanceWindowIdentityList = /*@__PURE__*/ S.Array(
  MaintenanceWindowIdentity,
);
export interface DescribeMaintenanceWindowsResult {
  WindowIdentities?: MaintenanceWindowIdentity[];
  NextToken?: string;
}
export const DescribeMaintenanceWindowsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WindowIdentities: S.optional(MaintenanceWindowIdentityList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeMaintenanceWindowsResult",
}) as any as S.Schema<DescribeMaintenanceWindowsResult>;
export type MaintenanceWindowResourceType =
  | "INSTANCE"
  | "RESOURCE_GROUP"
  | (string & {});
export const MaintenanceWindowResourceType = S.String;

export type MaintenanceWindowSearchMaxResults = number;
export interface DescribeMaintenanceWindowScheduleRequest {
  WindowId?: string;
  Targets?: Target[];
  ResourceType?: MaintenanceWindowResourceType;
  Filters?: PatchOrchestratorFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeMaintenanceWindowScheduleRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      WindowId: S.optional(S.String),
      Targets: S.optional(Targets),
      ResourceType: S.optional(MaintenanceWindowResourceType),
      Filters: S.optional(PatchOrchestratorFilterList),
      MaxResults: S.optional(S.Number),
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
  identifier: "DescribeMaintenanceWindowScheduleRequest",
}) as any as S.Schema<DescribeMaintenanceWindowScheduleRequest>;
export interface ScheduledWindowExecution {
  WindowId?: string;
  Name?: string;
  ExecutionTime?: string;
}
export const ScheduledWindowExecution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WindowId: S.optional(S.String),
    Name: S.optional(S.String),
    ExecutionTime: S.optional(S.String),
  }),
).annotate({
  identifier: "ScheduledWindowExecution",
}) as any as S.Schema<ScheduledWindowExecution>;
export type ScheduledWindowExecutionList = ScheduledWindowExecution[];
export const ScheduledWindowExecutionList = /*@__PURE__*/ S.Array(
  ScheduledWindowExecution,
);
export interface DescribeMaintenanceWindowScheduleResult {
  ScheduledWindowExecutions?: ScheduledWindowExecution[];
  NextToken?: string;
}
export const DescribeMaintenanceWindowScheduleResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ScheduledWindowExecutions: S.optional(ScheduledWindowExecutionList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "DescribeMaintenanceWindowScheduleResult",
}) as any as S.Schema<DescribeMaintenanceWindowScheduleResult>;
export interface DescribeMaintenanceWindowsForTargetRequest {
  Targets: Target[];
  ResourceType: MaintenanceWindowResourceType;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeMaintenanceWindowsForTargetRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Targets: Targets,
      ResourceType: MaintenanceWindowResourceType,
      MaxResults: S.optional(S.Number),
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
    identifier: "DescribeMaintenanceWindowsForTargetRequest",
  }) as any as S.Schema<DescribeMaintenanceWindowsForTargetRequest>;
export interface MaintenanceWindowIdentityForTarget {
  WindowId?: string;
  Name?: string;
}
export const MaintenanceWindowIdentityForTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WindowId: S.optional(S.String), Name: S.optional(S.String) }),
).annotate({
  identifier: "MaintenanceWindowIdentityForTarget",
}) as any as S.Schema<MaintenanceWindowIdentityForTarget>;
export type MaintenanceWindowsForTargetList =
  MaintenanceWindowIdentityForTarget[];
export const MaintenanceWindowsForTargetList = /*@__PURE__*/ S.Array(
  MaintenanceWindowIdentityForTarget,
);
export interface DescribeMaintenanceWindowsForTargetResult {
  WindowIdentities?: MaintenanceWindowIdentityForTarget[];
  NextToken?: string;
}
export const DescribeMaintenanceWindowsForTargetResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      WindowIdentities: S.optional(MaintenanceWindowsForTargetList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeMaintenanceWindowsForTargetResult",
  }) as any as S.Schema<DescribeMaintenanceWindowsForTargetResult>;
export interface DescribeMaintenanceWindowTargetsRequest {
  WindowId: string;
  Filters?: MaintenanceWindowFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeMaintenanceWindowTargetsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      WindowId: S.String,
      Filters: S.optional(MaintenanceWindowFilterList),
      MaxResults: S.optional(S.Number),
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
  identifier: "DescribeMaintenanceWindowTargetsRequest",
}) as any as S.Schema<DescribeMaintenanceWindowTargetsRequest>;
export interface MaintenanceWindowTarget {
  WindowId?: string;
  WindowTargetId?: string;
  ResourceType?: MaintenanceWindowResourceType;
  Targets?: Target[];
  OwnerInformation?: string | redacted.Redacted<string>;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
}
export const MaintenanceWindowTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WindowId: S.optional(S.String),
    WindowTargetId: S.optional(S.String),
    ResourceType: S.optional(MaintenanceWindowResourceType),
    Targets: S.optional(Targets),
    OwnerInformation: S.optional(SensitiveString),
    Name: S.optional(S.String),
    Description: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "MaintenanceWindowTarget",
}) as any as S.Schema<MaintenanceWindowTarget>;
export type MaintenanceWindowTargetList = MaintenanceWindowTarget[];
export const MaintenanceWindowTargetList = /*@__PURE__*/ S.Array(
  MaintenanceWindowTarget,
);
export interface DescribeMaintenanceWindowTargetsResult {
  Targets?: MaintenanceWindowTarget[];
  NextToken?: string;
}
export const DescribeMaintenanceWindowTargetsResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Targets: S.optional(MaintenanceWindowTargetList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "DescribeMaintenanceWindowTargetsResult",
}) as any as S.Schema<DescribeMaintenanceWindowTargetsResult>;
export interface DescribeMaintenanceWindowTasksRequest {
  WindowId: string;
  Filters?: MaintenanceWindowFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeMaintenanceWindowTasksRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      WindowId: S.String,
      Filters: S.optional(MaintenanceWindowFilterList),
      MaxResults: S.optional(S.Number),
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
  identifier: "DescribeMaintenanceWindowTasksRequest",
}) as any as S.Schema<DescribeMaintenanceWindowTasksRequest>;
export type MaintenanceWindowTaskParameterName = string;
export type MaintenanceWindowTaskParameterValue =
  | string
  | redacted.Redacted<string>;
export type MaintenanceWindowTaskParameterValueList = (
  | string
  | redacted.Redacted<string>
)[];
export const MaintenanceWindowTaskParameterValueList =
  /*@__PURE__*/ S.Array(SensitiveString);
export interface MaintenanceWindowTaskParameterValueExpression {
  Values?: (string | redacted.Redacted<string>)[];
}
export const MaintenanceWindowTaskParameterValueExpression =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Values: S.optional(MaintenanceWindowTaskParameterValueList) }),
  ).annotate({
    identifier: "MaintenanceWindowTaskParameterValueExpression",
  }) as any as S.Schema<MaintenanceWindowTaskParameterValueExpression>;
export type MaintenanceWindowTaskParameters = {
  [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined;
};
export const MaintenanceWindowTaskParameters = /*@__PURE__*/ S.Record(
  S.String,
  MaintenanceWindowTaskParameterValueExpression.pipe(S.optional),
);
export type MaintenanceWindowTaskPriority = number;
export interface LoggingInfo {
  S3BucketName: string;
  S3KeyPrefix?: string;
  S3Region: string;
}
export const LoggingInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3BucketName: S.String,
    S3KeyPrefix: S.optional(S.String),
    S3Region: S.String,
  }),
).annotate({ identifier: "LoggingInfo" }) as any as S.Schema<LoggingInfo>;
export type ServiceRole = string;
export type MaintenanceWindowTaskCutoffBehavior =
  | "CONTINUE_TASK"
  | "CANCEL_TASK"
  | (string & {});
export const MaintenanceWindowTaskCutoffBehavior = S.String;

export interface MaintenanceWindowTask {
  WindowId?: string;
  WindowTaskId?: string;
  TaskArn?: string;
  Type?: MaintenanceWindowTaskType;
  Targets?: Target[];
  TaskParameters?: {
    [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined;
  };
  Priority?: number;
  LoggingInfo?: LoggingInfo;
  ServiceRoleArn?: string;
  MaxConcurrency?: string;
  MaxErrors?: string;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  CutoffBehavior?: MaintenanceWindowTaskCutoffBehavior;
  AlarmConfiguration?: AlarmConfiguration;
}
export const MaintenanceWindowTask = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WindowId: S.optional(S.String),
    WindowTaskId: S.optional(S.String),
    TaskArn: S.optional(S.String),
    Type: S.optional(MaintenanceWindowTaskType),
    Targets: S.optional(Targets),
    TaskParameters: S.optional(MaintenanceWindowTaskParameters),
    Priority: S.optional(S.Number),
    LoggingInfo: S.optional(LoggingInfo),
    ServiceRoleArn: S.optional(S.String),
    MaxConcurrency: S.optional(S.String),
    MaxErrors: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(SensitiveString),
    CutoffBehavior: S.optional(MaintenanceWindowTaskCutoffBehavior),
    AlarmConfiguration: S.optional(AlarmConfiguration),
  }),
).annotate({
  identifier: "MaintenanceWindowTask",
}) as any as S.Schema<MaintenanceWindowTask>;
export type MaintenanceWindowTaskList = MaintenanceWindowTask[];
export const MaintenanceWindowTaskList = /*@__PURE__*/ S.Array(
  MaintenanceWindowTask,
);
export interface DescribeMaintenanceWindowTasksResult {
  Tasks?: MaintenanceWindowTask[];
  NextToken?: string;
}
export const DescribeMaintenanceWindowTasksResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Tasks: S.optional(MaintenanceWindowTaskList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "DescribeMaintenanceWindowTasksResult",
}) as any as S.Schema<DescribeMaintenanceWindowTasksResult>;
export type OpsItemFilterKey =
  | "Status"
  | "CreatedBy"
  | "Source"
  | "Priority"
  | "Title"
  | "OpsItemId"
  | "CreatedTime"
  | "LastModifiedTime"
  | "ActualStartTime"
  | "ActualEndTime"
  | "PlannedStartTime"
  | "PlannedEndTime"
  | "OperationalData"
  | "OperationalDataKey"
  | "OperationalDataValue"
  | "ResourceId"
  | "AutomationId"
  | "Category"
  | "Severity"
  | "OpsItemType"
  | "AccessRequestByRequesterArn"
  | "AccessRequestByRequesterId"
  | "AccessRequestByApproverArn"
  | "AccessRequestByApproverId"
  | "AccessRequestBySourceAccountId"
  | "AccessRequestBySourceOpsItemId"
  | "AccessRequestBySourceRegion"
  | "AccessRequestByIsReplica"
  | "AccessRequestByTargetResourceId"
  | "ChangeRequestByRequesterArn"
  | "ChangeRequestByRequesterName"
  | "ChangeRequestByApproverArn"
  | "ChangeRequestByApproverName"
  | "ChangeRequestByTemplate"
  | "ChangeRequestByTargetsResourceGroup"
  | "InsightByType"
  | "AccountId"
  | (string & {});
export const OpsItemFilterKey = S.String;

export type OpsItemFilterValue = string;
export type OpsItemFilterValues = string[];
export const OpsItemFilterValues = /*@__PURE__*/ S.Array(S.String);
export type OpsItemFilterOperator =
  | "Equal"
  | "Contains"
  | "GreaterThan"
  | "LessThan"
  | (string & {});
export const OpsItemFilterOperator = S.String;

export interface OpsItemFilter {
  Key: OpsItemFilterKey;
  Values: string[];
  Operator: OpsItemFilterOperator;
}
export const OpsItemFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: OpsItemFilterKey,
    Values: OpsItemFilterValues,
    Operator: OpsItemFilterOperator,
  }),
).annotate({ identifier: "OpsItemFilter" }) as any as S.Schema<OpsItemFilter>;
export type OpsItemFilters = OpsItemFilter[];
export const OpsItemFilters = /*@__PURE__*/ S.Array(OpsItemFilter);
export type OpsItemMaxResults = number;
export interface DescribeOpsItemsRequest {
  OpsItemFilters?: OpsItemFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeOpsItemsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OpsItemFilters: S.optional(OpsItemFilters),
    MaxResults: S.optional(S.Number),
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
  identifier: "DescribeOpsItemsRequest",
}) as any as S.Schema<DescribeOpsItemsRequest>;
export type OpsItemStatus =
  | "Open"
  | "InProgress"
  | "Resolved"
  | "Pending"
  | "TimedOut"
  | "Cancelling"
  | "Cancelled"
  | "Failed"
  | "CompletedWithSuccess"
  | "CompletedWithFailure"
  | "Scheduled"
  | "RunbookInProgress"
  | "PendingChangeCalendarOverride"
  | "ChangeCalendarOverrideApproved"
  | "ChangeCalendarOverrideRejected"
  | "PendingApproval"
  | "Approved"
  | "Revoked"
  | "Rejected"
  | "Closed"
  | (string & {});
export const OpsItemStatus = S.String;

export interface OpsItemSummary {
  CreatedBy?: string;
  CreatedTime?: Date;
  LastModifiedBy?: string;
  LastModifiedTime?: Date;
  Priority?: number;
  Source?: string;
  Status?: OpsItemStatus;
  OpsItemId?: string;
  Title?: string;
  OperationalData?: { [key: string]: OpsItemDataValue | undefined };
  Category?: string;
  Severity?: string;
  OpsItemType?: string;
  ActualStartTime?: Date;
  ActualEndTime?: Date;
  PlannedStartTime?: Date;
  PlannedEndTime?: Date;
}
export const OpsItemSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedBy: S.optional(S.String),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedBy: S.optional(S.String),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Priority: S.optional(S.Number),
    Source: S.optional(S.String),
    Status: S.optional(OpsItemStatus),
    OpsItemId: S.optional(S.String),
    Title: S.optional(S.String),
    OperationalData: S.optional(OpsItemOperationalData),
    Category: S.optional(S.String),
    Severity: S.optional(S.String),
    OpsItemType: S.optional(S.String),
    ActualStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ActualEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    PlannedStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    PlannedEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "OpsItemSummary" }) as any as S.Schema<OpsItemSummary>;
export type OpsItemSummaries = OpsItemSummary[];
export const OpsItemSummaries = /*@__PURE__*/ S.Array(OpsItemSummary);
export interface DescribeOpsItemsResponse {
  NextToken?: string;
  OpsItemSummaries?: OpsItemSummary[];
}
export const DescribeOpsItemsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    OpsItemSummaries: S.optional(OpsItemSummaries),
  }).pipe(ns),
).annotate({
  identifier: "DescribeOpsItemsResponse",
}) as any as S.Schema<DescribeOpsItemsResponse>;
export type ParametersFilterKey = "Name" | "Type" | "KeyId" | (string & {});
export const ParametersFilterKey = S.String;

export type ParametersFilterValue = string;
export type ParametersFilterValueList = string[];
export const ParametersFilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface ParametersFilter {
  Key: ParametersFilterKey;
  Values: string[];
}
export const ParametersFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: ParametersFilterKey, Values: ParametersFilterValueList }),
).annotate({
  identifier: "ParametersFilter",
}) as any as S.Schema<ParametersFilter>;
export type ParametersFilterList = ParametersFilter[];
export const ParametersFilterList = /*@__PURE__*/ S.Array(ParametersFilter);
export type ParameterStringFilterKey = string;
export type ParameterStringQueryOption = string;
export type ParameterStringFilterValue = string;
export type ParameterStringFilterValueList = string[];
export const ParameterStringFilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface ParameterStringFilter {
  Key: string;
  Option?: string;
  Values?: string[];
}
export const ParameterStringFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.String,
    Option: S.optional(S.String),
    Values: S.optional(ParameterStringFilterValueList),
  }),
).annotate({
  identifier: "ParameterStringFilter",
}) as any as S.Schema<ParameterStringFilter>;
export type ParameterStringFilterList = ParameterStringFilter[];
export const ParameterStringFilterList = /*@__PURE__*/ S.Array(
  ParameterStringFilter,
);
export interface DescribeParametersRequest {
  Filters?: ParametersFilter[];
  ParameterFilters?: ParameterStringFilter[];
  MaxResults?: number;
  NextToken?: string;
  Shared?: boolean;
}
export const DescribeParametersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(ParametersFilterList),
    ParameterFilters: S.optional(ParameterStringFilterList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Shared: S.optional(S.Boolean),
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
  identifier: "DescribeParametersRequest",
}) as any as S.Schema<DescribeParametersRequest>;
export type ParameterType =
  | "String"
  | "StringList"
  | "SecureString"
  | (string & {});
export const ParameterType = S.String;

export type ParameterKeyId = string;
export type ParameterDescription = string;
export type AllowedPattern = string;
export type PSParameterVersion = number;
export type ParameterTier =
  | "Standard"
  | "Advanced"
  | "Intelligent-Tiering"
  | (string & {});
export const ParameterTier = S.String;

export interface ParameterInlinePolicy {
  PolicyText?: string;
  PolicyType?: string;
  PolicyStatus?: string;
}
export const ParameterInlinePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyText: S.optional(S.String),
    PolicyType: S.optional(S.String),
    PolicyStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "ParameterInlinePolicy",
}) as any as S.Schema<ParameterInlinePolicy>;
export type ParameterPolicyList = ParameterInlinePolicy[];
export const ParameterPolicyList = /*@__PURE__*/ S.Array(ParameterInlinePolicy);
export type ParameterDataType = string;
export interface ParameterMetadata {
  Name?: string;
  ARN?: string;
  Type?: ParameterType;
  KeyId?: string;
  LastModifiedDate?: Date;
  LastModifiedUser?: string;
  Description?: string;
  AllowedPattern?: string;
  Version?: number;
  Tier?: ParameterTier;
  Policies?: ParameterInlinePolicy[];
  DataType?: string;
}
export const ParameterMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    ARN: S.optional(S.String),
    Type: S.optional(ParameterType),
    KeyId: S.optional(S.String),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastModifiedUser: S.optional(S.String),
    Description: S.optional(S.String),
    AllowedPattern: S.optional(S.String),
    Version: S.optional(S.Number),
    Tier: S.optional(ParameterTier),
    Policies: S.optional(ParameterPolicyList),
    DataType: S.optional(S.String),
  }),
).annotate({
  identifier: "ParameterMetadata",
}) as any as S.Schema<ParameterMetadata>;
export type ParameterMetadataList = ParameterMetadata[];
export const ParameterMetadataList = /*@__PURE__*/ S.Array(ParameterMetadata);
export interface DescribeParametersResult {
  Parameters?: ParameterMetadata[];
  NextToken?: string;
}
export const DescribeParametersResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Parameters: S.optional(ParameterMetadataList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeParametersResult",
}) as any as S.Schema<DescribeParametersResult>;
export interface DescribePatchBaselinesRequest {
  Filters?: PatchOrchestratorFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribePatchBaselinesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(PatchOrchestratorFilterList),
    MaxResults: S.optional(S.Number),
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
  identifier: "DescribePatchBaselinesRequest",
}) as any as S.Schema<DescribePatchBaselinesRequest>;
export type DefaultBaseline = boolean;
export interface PatchBaselineIdentity {
  BaselineId?: string;
  BaselineName?: string;
  OperatingSystem?: OperatingSystem;
  BaselineDescription?: string;
  DefaultBaseline?: boolean;
}
export const PatchBaselineIdentity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BaselineId: S.optional(S.String),
    BaselineName: S.optional(S.String),
    OperatingSystem: S.optional(OperatingSystem),
    BaselineDescription: S.optional(S.String),
    DefaultBaseline: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "PatchBaselineIdentity",
}) as any as S.Schema<PatchBaselineIdentity>;
export type PatchBaselineIdentityList = PatchBaselineIdentity[];
export const PatchBaselineIdentityList = /*@__PURE__*/ S.Array(
  PatchBaselineIdentity,
);
export interface DescribePatchBaselinesResult {
  BaselineIdentities?: PatchBaselineIdentity[];
  NextToken?: string;
}
export const DescribePatchBaselinesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BaselineIdentities: S.optional(PatchBaselineIdentityList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribePatchBaselinesResult",
}) as any as S.Schema<DescribePatchBaselinesResult>;
export interface DescribePatchGroupsRequest {
  MaxResults?: number;
  Filters?: PatchOrchestratorFilter[];
  NextToken?: string;
}
export const DescribePatchGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    Filters: S.optional(PatchOrchestratorFilterList),
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
  identifier: "DescribePatchGroupsRequest",
}) as any as S.Schema<DescribePatchGroupsRequest>;
export interface PatchGroupPatchBaselineMapping {
  PatchGroup?: string;
  BaselineIdentity?: PatchBaselineIdentity;
}
export const PatchGroupPatchBaselineMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PatchGroup: S.optional(S.String),
    BaselineIdentity: S.optional(PatchBaselineIdentity),
  }),
).annotate({
  identifier: "PatchGroupPatchBaselineMapping",
}) as any as S.Schema<PatchGroupPatchBaselineMapping>;
export type PatchGroupPatchBaselineMappingList =
  PatchGroupPatchBaselineMapping[];
export const PatchGroupPatchBaselineMappingList = /*@__PURE__*/ S.Array(
  PatchGroupPatchBaselineMapping,
);
export interface DescribePatchGroupsResult {
  Mappings?: PatchGroupPatchBaselineMapping[];
  NextToken?: string;
}
export const DescribePatchGroupsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Mappings: S.optional(PatchGroupPatchBaselineMappingList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribePatchGroupsResult",
}) as any as S.Schema<DescribePatchGroupsResult>;
export interface DescribePatchGroupStateRequest {
  PatchGroup: string;
}
export const DescribePatchGroupStateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PatchGroup: S.String }).pipe(
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
  identifier: "DescribePatchGroupStateRequest",
}) as any as S.Schema<DescribePatchGroupStateRequest>;
export type InstancesCount = number;
export interface DescribePatchGroupStateResult {
  Instances?: number;
  InstancesWithInstalledPatches?: number;
  InstancesWithInstalledOtherPatches?: number;
  InstancesWithInstalledPendingRebootPatches?: number;
  InstancesWithInstalledRejectedPatches?: number;
  InstancesWithMissingPatches?: number;
  InstancesWithFailedPatches?: number;
  InstancesWithNotApplicablePatches?: number;
  InstancesWithUnreportedNotApplicablePatches?: number;
  InstancesWithCriticalNonCompliantPatches?: number;
  InstancesWithSecurityNonCompliantPatches?: number;
  InstancesWithOtherNonCompliantPatches?: number;
  InstancesWithAvailableSecurityUpdates?: number;
}
export const DescribePatchGroupStateResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Instances: S.optional(S.Number),
    InstancesWithInstalledPatches: S.optional(S.Number),
    InstancesWithInstalledOtherPatches: S.optional(S.Number),
    InstancesWithInstalledPendingRebootPatches: S.optional(S.Number),
    InstancesWithInstalledRejectedPatches: S.optional(S.Number),
    InstancesWithMissingPatches: S.optional(S.Number),
    InstancesWithFailedPatches: S.optional(S.Number),
    InstancesWithNotApplicablePatches: S.optional(S.Number),
    InstancesWithUnreportedNotApplicablePatches: S.optional(S.Number),
    InstancesWithCriticalNonCompliantPatches: S.optional(S.Number),
    InstancesWithSecurityNonCompliantPatches: S.optional(S.Number),
    InstancesWithOtherNonCompliantPatches: S.optional(S.Number),
    InstancesWithAvailableSecurityUpdates: S.optional(S.Number),
  }).pipe(ns),
).annotate({
  identifier: "DescribePatchGroupStateResult",
}) as any as S.Schema<DescribePatchGroupStateResult>;
export type PatchProperty =
  | "PRODUCT"
  | "PRODUCT_FAMILY"
  | "CLASSIFICATION"
  | "MSRC_SEVERITY"
  | "PRIORITY"
  | "SEVERITY"
  | (string & {});
export const PatchProperty = S.String;

export type PatchSet = "OS" | "APPLICATION" | (string & {});
export const PatchSet = S.String;

export interface DescribePatchPropertiesRequest {
  OperatingSystem: OperatingSystem;
  Property: PatchProperty;
  PatchSet?: PatchSet;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribePatchPropertiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OperatingSystem: OperatingSystem,
    Property: PatchProperty,
    PatchSet: S.optional(PatchSet),
    MaxResults: S.optional(S.Number),
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
  identifier: "DescribePatchPropertiesRequest",
}) as any as S.Schema<DescribePatchPropertiesRequest>;
export type AttributeName = string;
export type AttributeValue = string;
export type PatchPropertyEntry = { [key: string]: string | undefined };
export const PatchPropertyEntry = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type PatchPropertiesList = { [key: string]: string | undefined }[];
export const PatchPropertiesList = /*@__PURE__*/ S.Array(PatchPropertyEntry);
export interface DescribePatchPropertiesResult {
  Properties?: { [key: string]: string | undefined }[];
  NextToken?: string;
}
export const DescribePatchPropertiesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Properties: S.optional(PatchPropertiesList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribePatchPropertiesResult",
}) as any as S.Schema<DescribePatchPropertiesResult>;
export type SessionState = "Active" | "History" | (string & {});
export const SessionState = S.String;

export type SessionMaxResults = number;
export type SessionFilterKey =
  | "InvokedAfter"
  | "InvokedBefore"
  | "Target"
  | "Owner"
  | "Status"
  | "SessionId"
  | "AccessType"
  | (string & {});
export const SessionFilterKey = S.String;

export type SessionFilterValue = string;
export interface SessionFilter {
  key: SessionFilterKey;
  value: string;
}
export const SessionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: SessionFilterKey, value: S.String }),
).annotate({ identifier: "SessionFilter" }) as any as S.Schema<SessionFilter>;
export type SessionFilterList = SessionFilter[];
export const SessionFilterList = /*@__PURE__*/ S.Array(SessionFilter);
export interface DescribeSessionsRequest {
  State: SessionState;
  MaxResults?: number;
  NextToken?: string;
  Filters?: SessionFilter[];
}
export const DescribeSessionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: SessionState,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(SessionFilterList),
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
  identifier: "DescribeSessionsRequest",
}) as any as S.Schema<DescribeSessionsRequest>;
export type SessionId = string;
export type SessionTarget = string;
export type SessionStatus =
  | "Connected"
  | "Connecting"
  | "Disconnected"
  | "Terminated"
  | "Terminating"
  | "Failed"
  | (string & {});
export const SessionStatus = S.String;

export type SessionOwner = string;
export type SessionReason = string;
export type SessionDetails = string;
export type SessionManagerS3OutputUrl = string;
export type SessionManagerCloudWatchOutputUrl = string;
export interface SessionManagerOutputUrl {
  S3OutputUrl?: string;
  CloudWatchOutputUrl?: string;
}
export const SessionManagerOutputUrl = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3OutputUrl: S.optional(S.String),
    CloudWatchOutputUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "SessionManagerOutputUrl",
}) as any as S.Schema<SessionManagerOutputUrl>;
export type MaxSessionDuration = string;
export type AccessType = "Standard" | "JustInTime" | (string & {});
export const AccessType = S.String;

export interface Session {
  SessionId?: string;
  Target?: string;
  Status?: SessionStatus;
  StartDate?: Date;
  EndDate?: Date;
  DocumentName?: string;
  Owner?: string;
  Reason?: string;
  Details?: string;
  OutputUrl?: SessionManagerOutputUrl;
  MaxSessionDuration?: string;
  AccessType?: AccessType;
}
export const Session = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionId: S.optional(S.String),
    Target: S.optional(S.String),
    Status: S.optional(SessionStatus),
    StartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DocumentName: S.optional(S.String),
    Owner: S.optional(S.String),
    Reason: S.optional(S.String),
    Details: S.optional(S.String),
    OutputUrl: S.optional(SessionManagerOutputUrl),
    MaxSessionDuration: S.optional(S.String),
    AccessType: S.optional(AccessType),
  }),
).annotate({ identifier: "Session" }) as any as S.Schema<Session>;
export type SessionList = Session[];
export const SessionList = /*@__PURE__*/ S.Array(Session);
export interface DescribeSessionsResponse {
  Sessions?: Session[];
  NextToken?: string;
}
export const DescribeSessionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Sessions: S.optional(SessionList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeSessionsResponse",
}) as any as S.Schema<DescribeSessionsResponse>;
export interface DisassociateOpsItemRelatedItemRequest {
  OpsItemId: string;
  AssociationId: string;
}
export const DisassociateOpsItemRelatedItemRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ OpsItemId: S.String, AssociationId: S.String }).pipe(
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
  identifier: "DisassociateOpsItemRelatedItemRequest",
}) as any as S.Schema<DisassociateOpsItemRelatedItemRequest>;
export interface DisassociateOpsItemRelatedItemResponse {}
export const DisassociateOpsItemRelatedItemResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DisassociateOpsItemRelatedItemResponse",
}) as any as S.Schema<DisassociateOpsItemRelatedItemResponse>;
export type AccessRequestId = string;
export interface GetAccessTokenRequest {
  AccessRequestId: string;
}
export const GetAccessTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccessRequestId: S.String }).pipe(
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
  identifier: "GetAccessTokenRequest",
}) as any as S.Schema<GetAccessTokenRequest>;
export type AccessKeyIdType = string;
export type AccessKeySecretType = string | redacted.Redacted<string>;
export type SessionTokenType = string | redacted.Redacted<string>;
export interface Credentials {
  AccessKeyId: string;
  SecretAccessKey: string | redacted.Redacted<string>;
  SessionToken: string | redacted.Redacted<string>;
  ExpirationTime: Date;
}
export const Credentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessKeyId: S.String,
    SecretAccessKey: SensitiveString,
    SessionToken: SensitiveString,
    ExpirationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "Credentials" }) as any as S.Schema<Credentials>;
export type AccessRequestStatus =
  | "Approved"
  | "Rejected"
  | "Revoked"
  | "Expired"
  | "Pending"
  | (string & {});
export const AccessRequestStatus = S.String;

export interface GetAccessTokenResponse {
  Credentials?: Credentials;
  AccessRequestStatus?: AccessRequestStatus;
}
export const GetAccessTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Credentials: S.optional(Credentials),
    AccessRequestStatus: S.optional(AccessRequestStatus),
  }).pipe(ns),
).annotate({
  identifier: "GetAccessTokenResponse",
}) as any as S.Schema<GetAccessTokenResponse>;
export interface GetAutomationExecutionRequest {
  AutomationExecutionId: string;
}
export const GetAutomationExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AutomationExecutionId: S.String }).pipe(
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
  identifier: "GetAutomationExecutionRequest",
}) as any as S.Schema<GetAutomationExecutionRequest>;
export interface ProgressCounters {
  TotalSteps?: number;
  SuccessSteps?: number;
  FailedSteps?: number;
  CancelledSteps?: number;
  TimedOutSteps?: number;
}
export const ProgressCounters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TotalSteps: S.optional(S.Number),
    SuccessSteps: S.optional(S.Number),
    FailedSteps: S.optional(S.Number),
    CancelledSteps: S.optional(S.Number),
    TimedOutSteps: S.optional(S.Number),
  }),
).annotate({
  identifier: "ProgressCounters",
}) as any as S.Schema<ProgressCounters>;
export interface AutomationExecution {
  AutomationExecutionId?: string;
  DocumentName?: string;
  DocumentVersion?: string;
  ExecutionStartTime?: Date;
  ExecutionEndTime?: Date;
  AutomationExecutionStatus?: AutomationExecutionStatus;
  StepExecutions?: StepExecution[];
  StepExecutionsTruncated?: boolean;
  Parameters?: { [key: string]: string[] | undefined };
  Outputs?: { [key: string]: string[] | undefined };
  FailureMessage?: string;
  WarningMessage?: string;
  Mode?: ExecutionMode;
  ParentAutomationExecutionId?: string;
  ExecutedBy?: string;
  CurrentStepName?: string;
  CurrentAction?: string;
  TargetParameterName?: string;
  Targets?: Target[];
  TargetMaps?: { [key: string]: string[] | undefined }[];
  ResolvedTargets?: ResolvedTargets;
  MaxConcurrency?: string;
  MaxErrors?: string;
  Target?: string;
  TargetLocations?: TargetLocation[];
  ProgressCounters?: ProgressCounters;
  AlarmConfiguration?: AlarmConfiguration;
  TriggeredAlarms?: AlarmStateInformation[];
  TargetLocationsURL?: string;
  AutomationSubtype?: AutomationSubtype;
  ScheduledTime?: Date;
  Runbooks?: Runbook[];
  OpsItemId?: string;
  AssociationId?: string;
  ChangeRequestName?: string;
  Variables?: { [key: string]: string[] | undefined };
}
export const AutomationExecution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutomationExecutionId: S.optional(S.String),
    DocumentName: S.optional(S.String),
    DocumentVersion: S.optional(S.String),
    ExecutionStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ExecutionEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AutomationExecutionStatus: S.optional(AutomationExecutionStatus),
    StepExecutions: S.optional(StepExecutionList),
    StepExecutionsTruncated: S.optional(S.Boolean),
    Parameters: S.optional(AutomationParameterMap),
    Outputs: S.optional(AutomationParameterMap),
    FailureMessage: S.optional(S.String),
    WarningMessage: S.optional(S.String),
    Mode: S.optional(ExecutionMode),
    ParentAutomationExecutionId: S.optional(S.String),
    ExecutedBy: S.optional(S.String),
    CurrentStepName: S.optional(S.String),
    CurrentAction: S.optional(S.String),
    TargetParameterName: S.optional(S.String),
    Targets: S.optional(Targets),
    TargetMaps: S.optional(TargetMaps),
    ResolvedTargets: S.optional(ResolvedTargets),
    MaxConcurrency: S.optional(S.String),
    MaxErrors: S.optional(S.String),
    Target: S.optional(S.String),
    TargetLocations: S.optional(TargetLocations),
    ProgressCounters: S.optional(ProgressCounters),
    AlarmConfiguration: S.optional(AlarmConfiguration),
    TriggeredAlarms: S.optional(AlarmStateInformationList),
    TargetLocationsURL: S.optional(S.String),
    AutomationSubtype: S.optional(AutomationSubtype),
    ScheduledTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Runbooks: S.optional(Runbooks),
    OpsItemId: S.optional(S.String),
    AssociationId: S.optional(S.String),
    ChangeRequestName: S.optional(S.String),
    Variables: S.optional(AutomationParameterMap),
  }),
).annotate({
  identifier: "AutomationExecution",
}) as any as S.Schema<AutomationExecution>;
export interface GetAutomationExecutionResult {
  AutomationExecution?: AutomationExecution;
}
export const GetAutomationExecutionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AutomationExecution: S.optional(AutomationExecution) }).pipe(ns),
).annotate({
  identifier: "GetAutomationExecutionResult",
}) as any as S.Schema<GetAutomationExecutionResult>;
export type ISO8601String = string;
export interface GetCalendarStateRequest {
  CalendarNames: string[];
  AtTime?: string;
}
export const GetCalendarStateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CalendarNames: CalendarNameOrARNList,
    AtTime: S.optional(S.String),
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
  identifier: "GetCalendarStateRequest",
}) as any as S.Schema<GetCalendarStateRequest>;
export type CalendarState = "OPEN" | "CLOSED" | (string & {});
export const CalendarState = S.String;

export interface GetCalendarStateResponse {
  State?: CalendarState;
  AtTime?: string;
  NextTransitionTime?: string;
}
export const GetCalendarStateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(CalendarState),
    AtTime: S.optional(S.String),
    NextTransitionTime: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetCalendarStateResponse",
}) as any as S.Schema<GetCalendarStateResponse>;
export interface GetCloudConnectorRequest {
  CloudConnectorId: string;
}
export const GetCloudConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CloudConnectorId: S.String }).pipe(
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
  identifier: "GetCloudConnectorRequest",
}) as any as S.Schema<GetCloudConnectorRequest>;
export type CloudConnectorArn = string;
export interface GetCloudConnectorResult {
  CloudConnectorArn?: string;
  DisplayName?: string;
  Description?: string;
  RoleArn?: string;
  Configuration?: CloudConnectorConfiguration;
  ConfigConnectorArn?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const GetCloudConnectorResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudConnectorArn: S.optional(S.String),
    DisplayName: S.optional(S.String),
    Description: S.optional(S.String),
    RoleArn: S.optional(S.String),
    Configuration: S.optional(CloudConnectorConfiguration),
    ConfigConnectorArn: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(ns),
).annotate({
  identifier: "GetCloudConnectorResult",
}) as any as S.Schema<GetCloudConnectorResult>;
export type CommandPluginName = string;
export interface GetCommandInvocationRequest {
  CommandId: string;
  InstanceId: string;
  PluginName?: string;
}
export const GetCommandInvocationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CommandId: S.String,
    InstanceId: S.String,
    PluginName: S.optional(S.String),
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
  identifier: "GetCommandInvocationRequest",
}) as any as S.Schema<GetCommandInvocationRequest>;
export type Comment = string;
export type ResponseCode = number;
export type StringDateTime = string;
export type CommandInvocationStatus =
  | "Pending"
  | "InProgress"
  | "Delayed"
  | "Success"
  | "Cancelled"
  | "TimedOut"
  | "Failed"
  | "Cancelling"
  | (string & {});
export const CommandInvocationStatus = S.String;

export type StatusDetails = string;
export type StandardOutputContent = string;
export type StandardErrorContent = string;
export type CloudWatchLogGroupName = string;
export type CloudWatchOutputEnabled = boolean;
export interface CloudWatchOutputConfig {
  CloudWatchLogGroupName?: string;
  CloudWatchOutputEnabled?: boolean;
}
export const CloudWatchOutputConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudWatchLogGroupName: S.optional(S.String),
    CloudWatchOutputEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "CloudWatchOutputConfig",
}) as any as S.Schema<CloudWatchOutputConfig>;
export interface GetCommandInvocationResult {
  CommandId?: string;
  InstanceId?: string;
  Comment?: string;
  DocumentName?: string;
  DocumentVersion?: string;
  PluginName?: string;
  ResponseCode?: number;
  ExecutionStartDateTime?: string;
  ExecutionElapsedTime?: string;
  ExecutionEndDateTime?: string;
  Status?: CommandInvocationStatus;
  StatusDetails?: string;
  StandardOutputContent?: string;
  StandardOutputUrl?: string;
  StandardErrorContent?: string;
  StandardErrorUrl?: string;
  CloudWatchOutputConfig?: CloudWatchOutputConfig;
}
export const GetCommandInvocationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CommandId: S.optional(S.String),
    InstanceId: S.optional(S.String),
    Comment: S.optional(S.String),
    DocumentName: S.optional(S.String),
    DocumentVersion: S.optional(S.String),
    PluginName: S.optional(S.String),
    ResponseCode: S.optional(S.Number),
    ExecutionStartDateTime: S.optional(S.String),
    ExecutionElapsedTime: S.optional(S.String),
    ExecutionEndDateTime: S.optional(S.String),
    Status: S.optional(CommandInvocationStatus),
    StatusDetails: S.optional(S.String),
    StandardOutputContent: S.optional(S.String),
    StandardOutputUrl: S.optional(S.String),
    StandardErrorContent: S.optional(S.String),
    StandardErrorUrl: S.optional(S.String),
    CloudWatchOutputConfig: S.optional(CloudWatchOutputConfig),
  }).pipe(ns),
).annotate({
  identifier: "GetCommandInvocationResult",
}) as any as S.Schema<GetCommandInvocationResult>;
export interface GetConnectionStatusRequest {
  Target: string;
}
export const GetConnectionStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Target: S.String }).pipe(
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
  identifier: "GetConnectionStatusRequest",
}) as any as S.Schema<GetConnectionStatusRequest>;
export type ConnectionStatus = "connected" | "notconnected" | (string & {});
export const ConnectionStatus = S.String;

export interface GetConnectionStatusResponse {
  Target?: string;
  Status?: ConnectionStatus;
}
export const GetConnectionStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Target: S.optional(S.String),
    Status: S.optional(ConnectionStatus),
  }).pipe(ns),
).annotate({
  identifier: "GetConnectionStatusResponse",
}) as any as S.Schema<GetConnectionStatusResponse>;
export interface GetDefaultPatchBaselineRequest {
  OperatingSystem?: OperatingSystem;
}
export const GetDefaultPatchBaselineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OperatingSystem: S.optional(OperatingSystem) }).pipe(
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
  identifier: "GetDefaultPatchBaselineRequest",
}) as any as S.Schema<GetDefaultPatchBaselineRequest>;
export interface GetDefaultPatchBaselineResult {
  BaselineId?: string;
  OperatingSystem?: OperatingSystem;
}
export const GetDefaultPatchBaselineResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BaselineId: S.optional(S.String),
    OperatingSystem: S.optional(OperatingSystem),
  }).pipe(ns),
).annotate({
  identifier: "GetDefaultPatchBaselineResult",
}) as any as S.Schema<GetDefaultPatchBaselineResult>;
export interface BaselineOverride {
  OperatingSystem?: OperatingSystem;
  GlobalFilters?: PatchFilterGroup;
  ApprovalRules?: PatchRuleGroup;
  ApprovedPatches?: string[];
  ApprovedPatchesComplianceLevel?: PatchComplianceLevel;
  RejectedPatches?: string[];
  RejectedPatchesAction?: PatchAction;
  ApprovedPatchesEnableNonSecurity?: boolean;
  Sources?: PatchSource[];
  AvailableSecurityUpdatesComplianceStatus?: PatchComplianceStatus;
}
export const BaselineOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OperatingSystem: S.optional(OperatingSystem),
    GlobalFilters: S.optional(PatchFilterGroup),
    ApprovalRules: S.optional(PatchRuleGroup),
    ApprovedPatches: S.optional(PatchIdList),
    ApprovedPatchesComplianceLevel: S.optional(PatchComplianceLevel),
    RejectedPatches: S.optional(PatchIdList),
    RejectedPatchesAction: S.optional(PatchAction),
    ApprovedPatchesEnableNonSecurity: S.optional(S.Boolean),
    Sources: S.optional(PatchSourceList),
    AvailableSecurityUpdatesComplianceStatus: S.optional(PatchComplianceStatus),
  }),
).annotate({
  identifier: "BaselineOverride",
}) as any as S.Schema<BaselineOverride>;
export interface GetDeployablePatchSnapshotForInstanceRequest {
  InstanceId: string;
  SnapshotId: string;
  BaselineOverride?: BaselineOverride;
  UseS3DualStackEndpoint?: boolean;
}
export const GetDeployablePatchSnapshotForInstanceRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      InstanceId: S.String,
      SnapshotId: S.String,
      BaselineOverride: S.optional(BaselineOverride),
      UseS3DualStackEndpoint: S.optional(S.Boolean),
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
    identifier: "GetDeployablePatchSnapshotForInstanceRequest",
  }) as any as S.Schema<GetDeployablePatchSnapshotForInstanceRequest>;
export type SnapshotDownloadUrl = string;
export type Product = string;
export interface GetDeployablePatchSnapshotForInstanceResult {
  InstanceId?: string;
  SnapshotId?: string;
  SnapshotDownloadUrl?: string;
  Product?: string;
}
export const GetDeployablePatchSnapshotForInstanceResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      InstanceId: S.optional(S.String),
      SnapshotId: S.optional(S.String),
      SnapshotDownloadUrl: S.optional(S.String),
      Product: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "GetDeployablePatchSnapshotForInstanceResult",
  }) as any as S.Schema<GetDeployablePatchSnapshotForInstanceResult>;
export interface GetDocumentRequest {
  Name: string;
  VersionName?: string;
  DocumentVersion?: string;
  DocumentFormat?: DocumentFormat;
}
export const GetDocumentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    VersionName: S.optional(S.String),
    DocumentVersion: S.optional(S.String),
    DocumentFormat: S.optional(DocumentFormat),
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
  identifier: "GetDocumentRequest",
}) as any as S.Schema<GetDocumentRequest>;
export type ContentLength = number;
export type AttachmentHash = string;
export type AttachmentHashType = "Sha256" | (string & {});
export const AttachmentHashType = S.String;

export type AttachmentUrl = string;
export interface AttachmentContent {
  Name?: string;
  Size?: number;
  Hash?: string;
  HashType?: AttachmentHashType;
  Url?: string;
}
export const AttachmentContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Size: S.optional(S.Number),
    Hash: S.optional(S.String),
    HashType: S.optional(AttachmentHashType),
    Url: S.optional(S.String),
  }),
).annotate({
  identifier: "AttachmentContent",
}) as any as S.Schema<AttachmentContent>;
export type AttachmentContentList = AttachmentContent[];
export const AttachmentContentList = /*@__PURE__*/ S.Array(
  AttachmentContent.pipe(T.XmlName("AttachmentContent")).annotate({
    identifier: "AttachmentContent",
  }),
);
export interface GetDocumentResult {
  Name?: string;
  CreatedDate?: Date;
  DisplayName?: string;
  VersionName?: string;
  DocumentVersion?: string;
  Status?: DocumentStatus;
  StatusInformation?: string;
  Content?: string;
  DocumentType?: DocumentType;
  DocumentFormat?: DocumentFormat;
  Requires?: DocumentRequires[];
  AttachmentsContent?: AttachmentContent[];
  ReviewStatus?: ReviewStatus;
}
export const GetDocumentResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DisplayName: S.optional(S.String),
    VersionName: S.optional(S.String),
    DocumentVersion: S.optional(S.String),
    Status: S.optional(DocumentStatus),
    StatusInformation: S.optional(S.String),
    Content: S.optional(S.String),
    DocumentType: S.optional(DocumentType),
    DocumentFormat: S.optional(DocumentFormat),
    Requires: S.optional(DocumentRequiresList),
    AttachmentsContent: S.optional(AttachmentContentList),
    ReviewStatus: S.optional(ReviewStatus),
  }).pipe(ns),
).annotate({
  identifier: "GetDocumentResult",
}) as any as S.Schema<GetDocumentResult>;
export type ExecutionPreviewId = string;
export interface GetExecutionPreviewRequest {
  ExecutionPreviewId: string;
}
export const GetExecutionPreviewRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExecutionPreviewId: S.String }).pipe(
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
  identifier: "GetExecutionPreviewRequest",
}) as any as S.Schema<GetExecutionPreviewRequest>;
export type ExecutionPreviewStatus =
  | "Pending"
  | "InProgress"
  | "Success"
  | "Failed"
  | (string & {});
export const ExecutionPreviewStatus = S.String;

export type ImpactType =
  | "Mutating"
  | "NonMutating"
  | "Undetermined"
  | (string & {});
export const ImpactType = S.String;

export type StepPreviewMap = { [key in ImpactType]?: number };
export const StepPreviewMap = /*@__PURE__*/ S.Record(
  ImpactType,
  S.Number.pipe(S.optional),
);
export type RegionList = string[];
export const RegionList = /*@__PURE__*/ S.Array(S.String);
export interface TargetPreview {
  Count?: number;
  TargetType?: string;
}
export const TargetPreview = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Count: S.optional(S.Number), TargetType: S.optional(S.String) }),
).annotate({ identifier: "TargetPreview" }) as any as S.Schema<TargetPreview>;
export type TargetPreviewList = TargetPreview[];
export const TargetPreviewList = /*@__PURE__*/ S.Array(TargetPreview);
export interface AutomationExecutionPreview {
  StepPreviews?: { [key: string]: number | undefined };
  Regions?: string[];
  TargetPreviews?: TargetPreview[];
  TotalAccounts?: number;
}
export const AutomationExecutionPreview = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StepPreviews: S.optional(StepPreviewMap),
    Regions: S.optional(RegionList),
    TargetPreviews: S.optional(TargetPreviewList),
    TotalAccounts: S.optional(S.Number),
  }),
).annotate({
  identifier: "AutomationExecutionPreview",
}) as any as S.Schema<AutomationExecutionPreview>;
export type ExecutionPreview = { Automation: AutomationExecutionPreview };
export const ExecutionPreview = /*@__PURE__*/ S.Union([
  S.Struct({ Automation: AutomationExecutionPreview }),
]);
export interface GetExecutionPreviewResponse {
  ExecutionPreviewId?: string;
  EndedAt?: Date;
  Status?: ExecutionPreviewStatus;
  StatusMessage?: string;
  ExecutionPreview?: ExecutionPreview;
}
export const GetExecutionPreviewResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExecutionPreviewId: S.optional(S.String),
    EndedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(ExecutionPreviewStatus),
    StatusMessage: S.optional(S.String),
    ExecutionPreview: S.optional(ExecutionPreview),
  }).pipe(ns),
).annotate({
  identifier: "GetExecutionPreviewResponse",
}) as any as S.Schema<GetExecutionPreviewResponse>;
export type InventoryFilterKey = string;
export type InventoryFilterValue = string;
export type InventoryFilterValueList = string[];
export const InventoryFilterValueList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("FilterValue")),
);
export type InventoryQueryOperatorType =
  | "Equal"
  | "NotEqual"
  | "BeginWith"
  | "LessThan"
  | "GreaterThan"
  | "Exists"
  | (string & {});
export const InventoryQueryOperatorType = S.String;

export interface InventoryFilter {
  Key: string;
  Values: string[];
  Type?: InventoryQueryOperatorType;
}
export const InventoryFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.String,
    Values: InventoryFilterValueList,
    Type: S.optional(InventoryQueryOperatorType),
  }),
).annotate({
  identifier: "InventoryFilter",
}) as any as S.Schema<InventoryFilter>;
export type InventoryFilterList = InventoryFilter[];
export const InventoryFilterList = /*@__PURE__*/ S.Array(
  InventoryFilter.pipe(T.XmlName("InventoryFilter")).annotate({
    identifier: "InventoryFilter",
  }),
);
export type InventoryAggregatorExpression = string;
export type InventoryGroupName = string;
export interface InventoryGroup {
  Name: string;
  Filters: InventoryFilter[];
}
export const InventoryGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Filters: InventoryFilterList }),
).annotate({ identifier: "InventoryGroup" }) as any as S.Schema<InventoryGroup>;
export type InventoryGroupList = InventoryGroup[];
export const InventoryGroupList = /*@__PURE__*/ S.Array(
  InventoryGroup.pipe(T.XmlName("InventoryGroup")).annotate({
    identifier: "InventoryGroup",
  }),
);
export interface InventoryAggregator {
  Expression?: string;
  Aggregators?: InventoryAggregator[];
  Groups?: InventoryGroup[];
}
export const InventoryAggregator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Expression: S.optional(S.String),
    Aggregators: S.optional(
      S.suspend(() => InventoryAggregatorList).annotate({
        identifier: "InventoryAggregatorList",
      }),
    ),
    Groups: S.optional(InventoryGroupList),
  }),
).annotate({
  identifier: "InventoryAggregator",
}) as any as S.Schema<InventoryAggregator>;
export type InventoryAggregatorList = InventoryAggregator[];
export const InventoryAggregatorList = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<InventoryAggregator> => InventoryAggregator)
    .annotate({ identifier: "InventoryAggregator" })
    .pipe(T.XmlName("Aggregator"))
    .annotate({ identifier: "InventoryAggregator" }),
) as any as S.Schema<InventoryAggregatorList>;
export interface ResultAttribute {
  TypeName: string;
}
export const ResultAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TypeName: S.String }),
).annotate({
  identifier: "ResultAttribute",
}) as any as S.Schema<ResultAttribute>;
export type ResultAttributeList = ResultAttribute[];
export const ResultAttributeList = /*@__PURE__*/ S.Array(
  ResultAttribute.pipe(T.XmlName("ResultAttribute")).annotate({
    identifier: "ResultAttribute",
  }),
);
export interface GetInventoryRequest {
  Filters?: InventoryFilter[];
  Aggregators?: InventoryAggregator[];
  ResultAttributes?: ResultAttribute[];
  NextToken?: string;
  MaxResults?: number;
}
export const GetInventoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(InventoryFilterList),
    Aggregators: S.optional(InventoryAggregatorList),
    ResultAttributes: S.optional(ResultAttributeList),
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
  identifier: "GetInventoryRequest",
}) as any as S.Schema<GetInventoryRequest>;
export type InventoryResultEntityId = string;
export type InventoryResultItemKey = string;
export type InventoryItemCaptureTime = string;
export type InventoryItemContentHash = string;
export type InventoryItemEntry = { [key: string]: string | undefined };
export const InventoryItemEntry = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type InventoryItemEntryList = { [key: string]: string | undefined }[];
export const InventoryItemEntryList = /*@__PURE__*/ S.Array(InventoryItemEntry);
export interface InventoryResultItem {
  TypeName: string;
  SchemaVersion: string;
  CaptureTime?: string;
  ContentHash?: string;
  Content: { [key: string]: string | undefined }[];
}
export const InventoryResultItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TypeName: S.String,
    SchemaVersion: S.String,
    CaptureTime: S.optional(S.String),
    ContentHash: S.optional(S.String),
    Content: InventoryItemEntryList,
  }),
).annotate({
  identifier: "InventoryResultItem",
}) as any as S.Schema<InventoryResultItem>;
export type InventoryResultItemMap = {
  [key: string]: InventoryResultItem | undefined;
};
export const InventoryResultItemMap = /*@__PURE__*/ S.Record(
  S.String,
  InventoryResultItem.pipe(S.optional),
);
export interface InventoryResultEntity {
  Id?: string;
  Data?: { [key: string]: InventoryResultItem | undefined };
}
export const InventoryResultEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Data: S.optional(InventoryResultItemMap),
  }),
).annotate({
  identifier: "InventoryResultEntity",
}) as any as S.Schema<InventoryResultEntity>;
export type InventoryResultEntityList = InventoryResultEntity[];
export const InventoryResultEntityList = /*@__PURE__*/ S.Array(
  InventoryResultEntity.pipe(T.XmlName("Entity")).annotate({
    identifier: "InventoryResultEntity",
  }),
);
export interface GetInventoryResult {
  Entities?: InventoryResultEntity[];
  NextToken?: string;
}
export const GetInventoryResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entities: S.optional(InventoryResultEntityList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetInventoryResult",
}) as any as S.Schema<GetInventoryResult>;
export type InventoryItemTypeNameFilter = string;
export type GetInventorySchemaMaxResults = number;
export type AggregatorSchemaOnly = boolean;
export type IsSubTypeSchema = boolean;
export interface GetInventorySchemaRequest {
  TypeName?: string;
  NextToken?: string;
  MaxResults?: number;
  Aggregator?: boolean;
  SubType?: boolean;
}
export const GetInventorySchemaRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TypeName: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Aggregator: S.optional(S.Boolean),
    SubType: S.optional(S.Boolean),
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
  identifier: "GetInventorySchemaRequest",
}) as any as S.Schema<GetInventorySchemaRequest>;
export type InventoryItemAttributeName = string;
export type InventoryAttributeDataType = "string" | "number" | (string & {});
export const InventoryAttributeDataType = S.String;

export interface InventoryItemAttribute {
  Name: string;
  DataType: InventoryAttributeDataType;
}
export const InventoryItemAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, DataType: InventoryAttributeDataType }),
).annotate({
  identifier: "InventoryItemAttribute",
}) as any as S.Schema<InventoryItemAttribute>;
export type InventoryItemAttributeList = InventoryItemAttribute[];
export const InventoryItemAttributeList = /*@__PURE__*/ S.Array(
  InventoryItemAttribute.pipe(T.XmlName("Attribute")).annotate({
    identifier: "InventoryItemAttribute",
  }),
);
export type InventoryTypeDisplayName = string;
export interface InventoryItemSchema {
  TypeName: string;
  Version?: string;
  Attributes: InventoryItemAttribute[];
  DisplayName?: string;
}
export const InventoryItemSchema = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TypeName: S.String,
    Version: S.optional(S.String),
    Attributes: InventoryItemAttributeList,
    DisplayName: S.optional(S.String),
  }),
).annotate({
  identifier: "InventoryItemSchema",
}) as any as S.Schema<InventoryItemSchema>;
export type InventoryItemSchemaResultList = InventoryItemSchema[];
export const InventoryItemSchemaResultList =
  /*@__PURE__*/ S.Array(InventoryItemSchema);
export interface GetInventorySchemaResult {
  Schemas?: InventoryItemSchema[];
  NextToken?: string;
}
export const GetInventorySchemaResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Schemas: S.optional(InventoryItemSchemaResultList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetInventorySchemaResult",
}) as any as S.Schema<GetInventorySchemaResult>;
export interface GetMaintenanceWindowRequest {
  WindowId: string;
}
export const GetMaintenanceWindowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WindowId: S.String }).pipe(
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
  identifier: "GetMaintenanceWindowRequest",
}) as any as S.Schema<GetMaintenanceWindowRequest>;
export interface GetMaintenanceWindowResult {
  WindowId?: string;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  StartDate?: string;
  EndDate?: string;
  Schedule?: string;
  ScheduleTimezone?: string;
  ScheduleOffset?: number;
  NextExecutionTime?: string;
  Duration?: number;
  Cutoff?: number;
  AllowUnassociatedTargets?: boolean;
  Enabled?: boolean;
  CreatedDate?: Date;
  ModifiedDate?: Date;
}
export const GetMaintenanceWindowResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WindowId: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(SensitiveString),
    StartDate: S.optional(S.String),
    EndDate: S.optional(S.String),
    Schedule: S.optional(S.String),
    ScheduleTimezone: S.optional(S.String),
    ScheduleOffset: S.optional(S.Number),
    NextExecutionTime: S.optional(S.String),
    Duration: S.optional(S.Number),
    Cutoff: S.optional(S.Number),
    AllowUnassociatedTargets: S.optional(S.Boolean),
    Enabled: S.optional(S.Boolean),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(ns),
).annotate({
  identifier: "GetMaintenanceWindowResult",
}) as any as S.Schema<GetMaintenanceWindowResult>;
export interface GetMaintenanceWindowExecutionRequest {
  WindowExecutionId: string;
}
export const GetMaintenanceWindowExecutionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ WindowExecutionId: S.String }).pipe(
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
  identifier: "GetMaintenanceWindowExecutionRequest",
}) as any as S.Schema<GetMaintenanceWindowExecutionRequest>;
export type MaintenanceWindowExecutionTaskIdList = string[];
export const MaintenanceWindowExecutionTaskIdList = /*@__PURE__*/ S.Array(
  S.String,
);
export interface GetMaintenanceWindowExecutionResult {
  WindowExecutionId?: string;
  TaskIds?: string[];
  Status?: MaintenanceWindowExecutionStatus;
  StatusDetails?: string;
  StartTime?: Date;
  EndTime?: Date;
}
export const GetMaintenanceWindowExecutionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WindowExecutionId: S.optional(S.String),
    TaskIds: S.optional(MaintenanceWindowExecutionTaskIdList),
    Status: S.optional(MaintenanceWindowExecutionStatus),
    StatusDetails: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(ns),
).annotate({
  identifier: "GetMaintenanceWindowExecutionResult",
}) as any as S.Schema<GetMaintenanceWindowExecutionResult>;
export interface GetMaintenanceWindowExecutionTaskRequest {
  WindowExecutionId: string;
  TaskId: string;
}
export const GetMaintenanceWindowExecutionTaskRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ WindowExecutionId: S.String, TaskId: S.String }).pipe(
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
  identifier: "GetMaintenanceWindowExecutionTaskRequest",
}) as any as S.Schema<GetMaintenanceWindowExecutionTaskRequest>;
export type MaintenanceWindowTaskParametersList = {
  [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined;
}[];
export const MaintenanceWindowTaskParametersList = /*@__PURE__*/ S.Array(
  MaintenanceWindowTaskParameters,
);
export interface GetMaintenanceWindowExecutionTaskResult {
  WindowExecutionId?: string;
  TaskExecutionId?: string;
  TaskArn?: string;
  ServiceRole?: string;
  Type?: MaintenanceWindowTaskType;
  TaskParameters?: {
    [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined;
  }[];
  Priority?: number;
  MaxConcurrency?: string;
  MaxErrors?: string;
  Status?: MaintenanceWindowExecutionStatus;
  StatusDetails?: string;
  StartTime?: Date;
  EndTime?: Date;
  AlarmConfiguration?: AlarmConfiguration;
  TriggeredAlarms?: AlarmStateInformation[];
}
export const GetMaintenanceWindowExecutionTaskResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      WindowExecutionId: S.optional(S.String),
      TaskExecutionId: S.optional(S.String),
      TaskArn: S.optional(S.String),
      ServiceRole: S.optional(S.String),
      Type: S.optional(MaintenanceWindowTaskType),
      TaskParameters: S.optional(MaintenanceWindowTaskParametersList),
      Priority: S.optional(S.Number),
      MaxConcurrency: S.optional(S.String),
      MaxErrors: S.optional(S.String),
      Status: S.optional(MaintenanceWindowExecutionStatus),
      StatusDetails: S.optional(S.String),
      StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      AlarmConfiguration: S.optional(AlarmConfiguration),
      TriggeredAlarms: S.optional(AlarmStateInformationList),
    }).pipe(ns),
).annotate({
  identifier: "GetMaintenanceWindowExecutionTaskResult",
}) as any as S.Schema<GetMaintenanceWindowExecutionTaskResult>;
export interface GetMaintenanceWindowExecutionTaskInvocationRequest {
  WindowExecutionId: string;
  TaskId: string;
  InvocationId: string;
}
export const GetMaintenanceWindowExecutionTaskInvocationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      WindowExecutionId: S.String,
      TaskId: S.String,
      InvocationId: S.String,
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
    identifier: "GetMaintenanceWindowExecutionTaskInvocationRequest",
  }) as any as S.Schema<GetMaintenanceWindowExecutionTaskInvocationRequest>;
export interface GetMaintenanceWindowExecutionTaskInvocationResult {
  WindowExecutionId?: string;
  TaskExecutionId?: string;
  InvocationId?: string;
  ExecutionId?: string;
  TaskType?: MaintenanceWindowTaskType;
  Parameters?: string | redacted.Redacted<string>;
  Status?: MaintenanceWindowExecutionStatus;
  StatusDetails?: string;
  StartTime?: Date;
  EndTime?: Date;
  OwnerInformation?: string | redacted.Redacted<string>;
  WindowTargetId?: string;
}
export const GetMaintenanceWindowExecutionTaskInvocationResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      WindowExecutionId: S.optional(S.String),
      TaskExecutionId: S.optional(S.String),
      InvocationId: S.optional(S.String),
      ExecutionId: S.optional(S.String),
      TaskType: S.optional(MaintenanceWindowTaskType),
      Parameters: S.optional(SensitiveString),
      Status: S.optional(MaintenanceWindowExecutionStatus),
      StatusDetails: S.optional(S.String),
      StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      OwnerInformation: S.optional(SensitiveString),
      WindowTargetId: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "GetMaintenanceWindowExecutionTaskInvocationResult",
  }) as any as S.Schema<GetMaintenanceWindowExecutionTaskInvocationResult>;
export interface GetMaintenanceWindowTaskRequest {
  WindowId: string;
  WindowTaskId: string;
}
export const GetMaintenanceWindowTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WindowId: S.String, WindowTaskId: S.String }).pipe(
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
  identifier: "GetMaintenanceWindowTaskRequest",
}) as any as S.Schema<GetMaintenanceWindowTaskRequest>;
export type NotificationArn = string;
export type NotificationEvent =
  | "All"
  | "InProgress"
  | "Success"
  | "TimedOut"
  | "Cancelled"
  | "Failed"
  | (string & {});
export const NotificationEvent = S.String;

export type NotificationEventList = NotificationEvent[];
export const NotificationEventList = /*@__PURE__*/ S.Array(NotificationEvent);
export type NotificationType = "Command" | "Invocation" | (string & {});
export const NotificationType = S.String;

export interface NotificationConfig {
  NotificationArn?: string;
  NotificationEvents?: NotificationEvent[];
  NotificationType?: NotificationType;
}
export const NotificationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotificationArn: S.optional(S.String),
    NotificationEvents: S.optional(NotificationEventList),
    NotificationType: S.optional(NotificationType),
  }),
).annotate({
  identifier: "NotificationConfig",
}) as any as S.Schema<NotificationConfig>;
export type TimeoutSeconds = number;
export interface MaintenanceWindowRunCommandParameters {
  Comment?: string;
  CloudWatchOutputConfig?: CloudWatchOutputConfig;
  DocumentHash?: string;
  DocumentHashType?: DocumentHashType;
  DocumentVersion?: string;
  NotificationConfig?: NotificationConfig;
  OutputS3BucketName?: string;
  OutputS3KeyPrefix?: string;
  Parameters?: { [key: string]: string[] | undefined };
  ServiceRoleArn?: string;
  TimeoutSeconds?: number;
}
export const MaintenanceWindowRunCommandParameters = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Comment: S.optional(S.String),
      CloudWatchOutputConfig: S.optional(CloudWatchOutputConfig),
      DocumentHash: S.optional(S.String),
      DocumentHashType: S.optional(DocumentHashType),
      DocumentVersion: S.optional(S.String),
      NotificationConfig: S.optional(NotificationConfig),
      OutputS3BucketName: S.optional(S.String),
      OutputS3KeyPrefix: S.optional(S.String),
      Parameters: S.optional(Parameters),
      ServiceRoleArn: S.optional(S.String),
      TimeoutSeconds: S.optional(S.Number),
    }),
).annotate({
  identifier: "MaintenanceWindowRunCommandParameters",
}) as any as S.Schema<MaintenanceWindowRunCommandParameters>;
export interface MaintenanceWindowAutomationParameters {
  DocumentVersion?: string;
  Parameters?: { [key: string]: string[] | undefined };
}
export const MaintenanceWindowAutomationParameters = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DocumentVersion: S.optional(S.String),
      Parameters: S.optional(AutomationParameterMap),
    }),
).annotate({
  identifier: "MaintenanceWindowAutomationParameters",
}) as any as S.Schema<MaintenanceWindowAutomationParameters>;
export type MaintenanceWindowStepFunctionsInput =
  | string
  | redacted.Redacted<string>;
export type MaintenanceWindowStepFunctionsName = string;
export interface MaintenanceWindowStepFunctionsParameters {
  Input?: string | redacted.Redacted<string>;
  Name?: string;
}
export const MaintenanceWindowStepFunctionsParameters = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Input: S.optional(SensitiveString),
      Name: S.optional(S.String),
    }),
).annotate({
  identifier: "MaintenanceWindowStepFunctionsParameters",
}) as any as S.Schema<MaintenanceWindowStepFunctionsParameters>;
export type MaintenanceWindowLambdaClientContext = string;
export type MaintenanceWindowLambdaQualifier = string;
export type MaintenanceWindowLambdaPayload =
  | Uint8Array
  | redacted.Redacted<Uint8Array>;
export interface MaintenanceWindowLambdaParameters {
  ClientContext?: string;
  Qualifier?: string;
  Payload?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export const MaintenanceWindowLambdaParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientContext: S.optional(S.String),
    Qualifier: S.optional(S.String),
    Payload: S.optional(SensitiveBlob),
  }),
).annotate({
  identifier: "MaintenanceWindowLambdaParameters",
}) as any as S.Schema<MaintenanceWindowLambdaParameters>;
export interface MaintenanceWindowTaskInvocationParameters {
  RunCommand?: MaintenanceWindowRunCommandParameters;
  Automation?: MaintenanceWindowAutomationParameters;
  StepFunctions?: MaintenanceWindowStepFunctionsParameters;
  Lambda?: MaintenanceWindowLambdaParameters;
}
export const MaintenanceWindowTaskInvocationParameters =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RunCommand: S.optional(MaintenanceWindowRunCommandParameters),
      Automation: S.optional(MaintenanceWindowAutomationParameters),
      StepFunctions: S.optional(MaintenanceWindowStepFunctionsParameters),
      Lambda: S.optional(MaintenanceWindowLambdaParameters),
    }),
  ).annotate({
    identifier: "MaintenanceWindowTaskInvocationParameters",
  }) as any as S.Schema<MaintenanceWindowTaskInvocationParameters>;
export interface GetMaintenanceWindowTaskResult {
  WindowId?: string;
  WindowTaskId?: string;
  Targets?: Target[];
  TaskArn?: string;
  ServiceRoleArn?: string;
  TaskType?: MaintenanceWindowTaskType;
  TaskParameters?: {
    [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined;
  };
  TaskInvocationParameters?: MaintenanceWindowTaskInvocationParameters;
  Priority?: number;
  MaxConcurrency?: string;
  MaxErrors?: string;
  LoggingInfo?: LoggingInfo;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  CutoffBehavior?: MaintenanceWindowTaskCutoffBehavior;
  AlarmConfiguration?: AlarmConfiguration;
}
export const GetMaintenanceWindowTaskResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WindowId: S.optional(S.String),
    WindowTaskId: S.optional(S.String),
    Targets: S.optional(Targets),
    TaskArn: S.optional(S.String),
    ServiceRoleArn: S.optional(S.String),
    TaskType: S.optional(MaintenanceWindowTaskType),
    TaskParameters: S.optional(MaintenanceWindowTaskParameters),
    TaskInvocationParameters: S.optional(
      MaintenanceWindowTaskInvocationParameters,
    ),
    Priority: S.optional(S.Number),
    MaxConcurrency: S.optional(S.String),
    MaxErrors: S.optional(S.String),
    LoggingInfo: S.optional(LoggingInfo),
    Name: S.optional(S.String),
    Description: S.optional(SensitiveString),
    CutoffBehavior: S.optional(MaintenanceWindowTaskCutoffBehavior),
    AlarmConfiguration: S.optional(AlarmConfiguration),
  }).pipe(ns),
).annotate({
  identifier: "GetMaintenanceWindowTaskResult",
}) as any as S.Schema<GetMaintenanceWindowTaskResult>;
export interface GetOpsItemRequest {
  OpsItemId: string;
  OpsItemArn?: string;
}
export const GetOpsItemRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OpsItemId: S.String, OpsItemArn: S.optional(S.String) }).pipe(
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
  identifier: "GetOpsItemRequest",
}) as any as S.Schema<GetOpsItemRequest>;
export interface OpsItem {
  CreatedBy?: string;
  OpsItemType?: string;
  CreatedTime?: Date;
  Description?: string;
  LastModifiedBy?: string;
  LastModifiedTime?: Date;
  Notifications?: OpsItemNotification[];
  Priority?: number;
  RelatedOpsItems?: RelatedOpsItem[];
  Status?: OpsItemStatus;
  OpsItemId?: string;
  Version?: string;
  Title?: string;
  Source?: string;
  OperationalData?: { [key: string]: OpsItemDataValue | undefined };
  Category?: string;
  Severity?: string;
  ActualStartTime?: Date;
  ActualEndTime?: Date;
  PlannedStartTime?: Date;
  PlannedEndTime?: Date;
  OpsItemArn?: string;
}
export const OpsItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreatedBy: S.optional(S.String),
    OpsItemType: S.optional(S.String),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Description: S.optional(S.String),
    LastModifiedBy: S.optional(S.String),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Notifications: S.optional(OpsItemNotifications),
    Priority: S.optional(S.Number),
    RelatedOpsItems: S.optional(RelatedOpsItems),
    Status: S.optional(OpsItemStatus),
    OpsItemId: S.optional(S.String),
    Version: S.optional(S.String),
    Title: S.optional(S.String),
    Source: S.optional(S.String),
    OperationalData: S.optional(OpsItemOperationalData),
    Category: S.optional(S.String),
    Severity: S.optional(S.String),
    ActualStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ActualEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    PlannedStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    PlannedEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    OpsItemArn: S.optional(S.String),
  }),
).annotate({ identifier: "OpsItem" }) as any as S.Schema<OpsItem>;
export interface GetOpsItemResponse {
  OpsItem?: OpsItem;
}
export const GetOpsItemResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OpsItem: S.optional(OpsItem) }).pipe(ns),
).annotate({
  identifier: "GetOpsItemResponse",
}) as any as S.Schema<GetOpsItemResponse>;
export type GetOpsMetadataMaxResults = number;
export interface GetOpsMetadataRequest {
  OpsMetadataArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const GetOpsMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OpsMetadataArn: S.String,
    MaxResults: S.optional(S.Number),
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
  identifier: "GetOpsMetadataRequest",
}) as any as S.Schema<GetOpsMetadataRequest>;
export interface GetOpsMetadataResult {
  ResourceId?: string;
  Metadata?: { [key: string]: MetadataValue | undefined };
  NextToken?: string;
}
export const GetOpsMetadataResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.optional(S.String),
    Metadata: S.optional(MetadataMap),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetOpsMetadataResult",
}) as any as S.Schema<GetOpsMetadataResult>;
export type OpsFilterKey = string;
export type OpsFilterValue = string;
export type OpsFilterValueList = string[];
export const OpsFilterValueList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("FilterValue")),
);
export type OpsFilterOperatorType =
  | "Equal"
  | "NotEqual"
  | "BeginWith"
  | "LessThan"
  | "GreaterThan"
  | "Exists"
  | (string & {});
export const OpsFilterOperatorType = S.String;

export interface OpsFilter {
  Key: string;
  Values: string[];
  Type?: OpsFilterOperatorType;
}
export const OpsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.String,
    Values: OpsFilterValueList,
    Type: S.optional(OpsFilterOperatorType),
  }),
).annotate({ identifier: "OpsFilter" }) as any as S.Schema<OpsFilter>;
export type OpsFilterList = OpsFilter[];
export const OpsFilterList = /*@__PURE__*/ S.Array(
  OpsFilter.pipe(T.XmlName("OpsFilter")).annotate({ identifier: "OpsFilter" }),
);
export type OpsAggregatorType = string;
export type OpsDataTypeName = string;
export type OpsDataAttributeName = string;
export type OpsAggregatorValueKey = string;
export type OpsAggregatorValue = string;
export type OpsAggregatorValueMap = { [key: string]: string | undefined };
export const OpsAggregatorValueMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface OpsAggregator {
  AggregatorType?: string;
  TypeName?: string;
  AttributeName?: string;
  Values?: { [key: string]: string | undefined };
  Filters?: OpsFilter[];
  Aggregators?: OpsAggregator[];
}
export const OpsAggregator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AggregatorType: S.optional(S.String),
    TypeName: S.optional(S.String),
    AttributeName: S.optional(S.String),
    Values: S.optional(OpsAggregatorValueMap),
    Filters: S.optional(OpsFilterList),
    Aggregators: S.optional(
      S.suspend(() => OpsAggregatorList).annotate({
        identifier: "OpsAggregatorList",
      }),
    ),
  }),
).annotate({ identifier: "OpsAggregator" }) as any as S.Schema<OpsAggregator>;
export type OpsAggregatorList = OpsAggregator[];
export const OpsAggregatorList = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<OpsAggregator> => OpsAggregator)
    .annotate({ identifier: "OpsAggregator" })
    .pipe(T.XmlName("Aggregator"))
    .annotate({ identifier: "OpsAggregator" }),
) as any as S.Schema<OpsAggregatorList>;
export interface OpsResultAttribute {
  TypeName: string;
}
export const OpsResultAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TypeName: S.String }),
).annotate({
  identifier: "OpsResultAttribute",
}) as any as S.Schema<OpsResultAttribute>;
export type OpsResultAttributeList = OpsResultAttribute[];
export const OpsResultAttributeList = /*@__PURE__*/ S.Array(
  OpsResultAttribute.pipe(T.XmlName("OpsResultAttribute")).annotate({
    identifier: "OpsResultAttribute",
  }),
);
export interface GetOpsSummaryRequest {
  SyncName?: string;
  Filters?: OpsFilter[];
  Aggregators?: OpsAggregator[];
  ResultAttributes?: OpsResultAttribute[];
  NextToken?: string;
  MaxResults?: number;
}
export const GetOpsSummaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SyncName: S.optional(S.String),
    Filters: S.optional(OpsFilterList),
    Aggregators: S.optional(OpsAggregatorList),
    ResultAttributes: S.optional(OpsResultAttributeList),
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
  identifier: "GetOpsSummaryRequest",
}) as any as S.Schema<GetOpsSummaryRequest>;
export type OpsEntityId = string;
export type OpsEntityItemKey = string;
export type OpsEntityItemCaptureTime = string;
export type OpsEntityItemEntry = { [key: string]: string | undefined };
export const OpsEntityItemEntry = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type OpsEntityItemEntryList = { [key: string]: string | undefined }[];
export const OpsEntityItemEntryList = /*@__PURE__*/ S.Array(OpsEntityItemEntry);
export interface OpsEntityItem {
  CaptureTime?: string;
  Content?: { [key: string]: string | undefined }[];
}
export const OpsEntityItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CaptureTime: S.optional(S.String),
    Content: S.optional(OpsEntityItemEntryList),
  }),
).annotate({ identifier: "OpsEntityItem" }) as any as S.Schema<OpsEntityItem>;
export type OpsEntityItemMap = { [key: string]: OpsEntityItem | undefined };
export const OpsEntityItemMap = /*@__PURE__*/ S.Record(
  S.String,
  OpsEntityItem.pipe(S.optional),
);
export interface OpsEntity {
  Id?: string;
  Data?: { [key: string]: OpsEntityItem | undefined };
}
export const OpsEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String), Data: S.optional(OpsEntityItemMap) }),
).annotate({ identifier: "OpsEntity" }) as any as S.Schema<OpsEntity>;
export type OpsEntityList = OpsEntity[];
export const OpsEntityList = /*@__PURE__*/ S.Array(
  OpsEntity.pipe(T.XmlName("Entity")).annotate({ identifier: "OpsEntity" }),
);
export interface GetOpsSummaryResult {
  Entities?: OpsEntity[];
  NextToken?: string;
}
export const GetOpsSummaryResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entities: S.optional(OpsEntityList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetOpsSummaryResult",
}) as any as S.Schema<GetOpsSummaryResult>;
export interface GetParameterRequest {
  Name: string;
  WithDecryption?: boolean;
}
export const GetParameterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, WithDecryption: S.optional(S.Boolean) }).pipe(
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
  identifier: "GetParameterRequest",
}) as any as S.Schema<GetParameterRequest>;
export type PSParameterValue = string | redacted.Redacted<string>;
export type PSParameterSelector = string;
export interface Parameter {
  Name?: string;
  Type?: ParameterType;
  Value?: string | redacted.Redacted<string>;
  Version?: number;
  Selector?: string;
  SourceResult?: string;
  LastModifiedDate?: Date;
  ARN?: string;
  DataType?: string;
}
export const Parameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Type: S.optional(ParameterType),
    Value: S.optional(SensitiveString),
    Version: S.optional(S.Number),
    Selector: S.optional(S.String),
    SourceResult: S.optional(S.String),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ARN: S.optional(S.String),
    DataType: S.optional(S.String),
  }),
).annotate({ identifier: "Parameter" }) as any as S.Schema<Parameter>;
export interface GetParameterResult {
  Parameter?: Parameter;
}
export const GetParameterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Parameter: S.optional(Parameter) }).pipe(ns),
).annotate({
  identifier: "GetParameterResult",
}) as any as S.Schema<GetParameterResult>;
export interface GetParameterHistoryRequest {
  Name: string;
  WithDecryption?: boolean;
  MaxResults?: number;
  NextToken?: string;
}
export const GetParameterHistoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    WithDecryption: S.optional(S.Boolean),
    MaxResults: S.optional(S.Number),
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
  identifier: "GetParameterHistoryRequest",
}) as any as S.Schema<GetParameterHistoryRequest>;
export type ParameterLabel = string;
export type ParameterLabelList = string[];
export const ParameterLabelList = /*@__PURE__*/ S.Array(S.String);
export interface ParameterHistory {
  Name?: string;
  Type?: ParameterType;
  KeyId?: string;
  LastModifiedDate?: Date;
  LastModifiedUser?: string;
  Description?: string;
  Value?: string | redacted.Redacted<string>;
  AllowedPattern?: string;
  Version?: number;
  Labels?: string[];
  Tier?: ParameterTier;
  Policies?: ParameterInlinePolicy[];
  DataType?: string;
}
export const ParameterHistory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Type: S.optional(ParameterType),
    KeyId: S.optional(S.String),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastModifiedUser: S.optional(S.String),
    Description: S.optional(S.String),
    Value: S.optional(SensitiveString),
    AllowedPattern: S.optional(S.String),
    Version: S.optional(S.Number),
    Labels: S.optional(ParameterLabelList),
    Tier: S.optional(ParameterTier),
    Policies: S.optional(ParameterPolicyList),
    DataType: S.optional(S.String),
  }),
).annotate({
  identifier: "ParameterHistory",
}) as any as S.Schema<ParameterHistory>;
export type ParameterHistoryList = ParameterHistory[];
export const ParameterHistoryList = /*@__PURE__*/ S.Array(ParameterHistory);
export interface GetParameterHistoryResult {
  Parameters?: ParameterHistory[];
  NextToken?: string;
}
export const GetParameterHistoryResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Parameters: S.optional(ParameterHistoryList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetParameterHistoryResult",
}) as any as S.Schema<GetParameterHistoryResult>;
export interface GetParametersRequest {
  Names: string[];
  WithDecryption?: boolean;
}
export const GetParametersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Names: ParameterNameList,
    WithDecryption: S.optional(S.Boolean),
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
  identifier: "GetParametersRequest",
}) as any as S.Schema<GetParametersRequest>;
export type ParameterList = Parameter[];
export const ParameterList = /*@__PURE__*/ S.Array(Parameter);
export interface GetParametersResult {
  Parameters?: Parameter[];
  InvalidParameters?: string[];
}
export const GetParametersResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Parameters: S.optional(ParameterList),
    InvalidParameters: S.optional(ParameterNameList),
  }).pipe(ns),
).annotate({
  identifier: "GetParametersResult",
}) as any as S.Schema<GetParametersResult>;
export type GetParametersByPathMaxResults = number;
export interface GetParametersByPathRequest {
  Path: string;
  Recursive?: boolean;
  ParameterFilters?: ParameterStringFilter[];
  WithDecryption?: boolean;
  MaxResults?: number;
  NextToken?: string;
}
export const GetParametersByPathRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Path: S.String,
    Recursive: S.optional(S.Boolean),
    ParameterFilters: S.optional(ParameterStringFilterList),
    WithDecryption: S.optional(S.Boolean),
    MaxResults: S.optional(S.Number),
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
  identifier: "GetParametersByPathRequest",
}) as any as S.Schema<GetParametersByPathRequest>;
export interface GetParametersByPathResult {
  Parameters?: Parameter[];
  NextToken?: string;
}
export const GetParametersByPathResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Parameters: S.optional(ParameterList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetParametersByPathResult",
}) as any as S.Schema<GetParametersByPathResult>;
export interface GetPatchBaselineRequest {
  BaselineId: string;
}
export const GetPatchBaselineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BaselineId: S.String }).pipe(
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
  identifier: "GetPatchBaselineRequest",
}) as any as S.Schema<GetPatchBaselineRequest>;
export type PatchGroupList = string[];
export const PatchGroupList = /*@__PURE__*/ S.Array(S.String);
export interface GetPatchBaselineResult {
  BaselineId?: string;
  Name?: string;
  OperatingSystem?: OperatingSystem;
  GlobalFilters?: PatchFilterGroup;
  ApprovalRules?: PatchRuleGroup;
  ApprovedPatches?: string[];
  ApprovedPatchesComplianceLevel?: PatchComplianceLevel;
  ApprovedPatchesEnableNonSecurity?: boolean;
  RejectedPatches?: string[];
  RejectedPatchesAction?: PatchAction;
  PatchGroups?: string[];
  CreatedDate?: Date;
  ModifiedDate?: Date;
  Description?: string;
  Sources?: PatchSource[];
  AvailableSecurityUpdatesComplianceStatus?: PatchComplianceStatus;
}
export const GetPatchBaselineResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BaselineId: S.optional(S.String),
    Name: S.optional(S.String),
    OperatingSystem: S.optional(OperatingSystem),
    GlobalFilters: S.optional(PatchFilterGroup),
    ApprovalRules: S.optional(PatchRuleGroup),
    ApprovedPatches: S.optional(PatchIdList),
    ApprovedPatchesComplianceLevel: S.optional(PatchComplianceLevel),
    ApprovedPatchesEnableNonSecurity: S.optional(S.Boolean),
    RejectedPatches: S.optional(PatchIdList),
    RejectedPatchesAction: S.optional(PatchAction),
    PatchGroups: S.optional(PatchGroupList),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Description: S.optional(S.String),
    Sources: S.optional(PatchSourceList),
    AvailableSecurityUpdatesComplianceStatus: S.optional(PatchComplianceStatus),
  }).pipe(ns),
).annotate({
  identifier: "GetPatchBaselineResult",
}) as any as S.Schema<GetPatchBaselineResult>;
export interface GetPatchBaselineForPatchGroupRequest {
  PatchGroup: string;
  OperatingSystem?: OperatingSystem;
}
export const GetPatchBaselineForPatchGroupRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      PatchGroup: S.String,
      OperatingSystem: S.optional(OperatingSystem),
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
  identifier: "GetPatchBaselineForPatchGroupRequest",
}) as any as S.Schema<GetPatchBaselineForPatchGroupRequest>;
export interface GetPatchBaselineForPatchGroupResult {
  BaselineId?: string;
  PatchGroup?: string;
  OperatingSystem?: OperatingSystem;
}
export const GetPatchBaselineForPatchGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BaselineId: S.optional(S.String),
    PatchGroup: S.optional(S.String),
    OperatingSystem: S.optional(OperatingSystem),
  }).pipe(ns),
).annotate({
  identifier: "GetPatchBaselineForPatchGroupResult",
}) as any as S.Schema<GetPatchBaselineForPatchGroupResult>;
export type ResourcePolicyMaxResults = number;
export interface GetResourcePoliciesRequest {
  ResourceArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export const GetResourcePoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String,
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
  identifier: "GetResourcePoliciesRequest",
}) as any as S.Schema<GetResourcePoliciesRequest>;
export type Policy = string;
export interface GetResourcePoliciesResponseEntry {
  PolicyId?: string;
  PolicyHash?: string;
  Policy?: string;
}
export const GetResourcePoliciesResponseEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyId: S.optional(S.String),
    PolicyHash: S.optional(S.String),
    Policy: S.optional(S.String),
  }),
).annotate({
  identifier: "GetResourcePoliciesResponseEntry",
}) as any as S.Schema<GetResourcePoliciesResponseEntry>;
export type GetResourcePoliciesResponseEntries =
  GetResourcePoliciesResponseEntry[];
export const GetResourcePoliciesResponseEntries = /*@__PURE__*/ S.Array(
  GetResourcePoliciesResponseEntry,
);
export interface GetResourcePoliciesResponse {
  NextToken?: string;
  Policies?: GetResourcePoliciesResponseEntry[];
}
export const GetResourcePoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Policies: S.optional(GetResourcePoliciesResponseEntries),
  }).pipe(ns),
).annotate({
  identifier: "GetResourcePoliciesResponse",
}) as any as S.Schema<GetResourcePoliciesResponse>;
export type ServiceSettingId = string;
export interface GetServiceSettingRequest {
  SettingId: string;
}
export const GetServiceSettingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SettingId: S.String }).pipe(
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
  identifier: "GetServiceSettingRequest",
}) as any as S.Schema<GetServiceSettingRequest>;
export type ServiceSettingValue = string;
export interface ServiceSetting {
  SettingId?: string;
  SettingValue?: string;
  LastModifiedDate?: Date;
  LastModifiedUser?: string;
  ARN?: string;
  Status?: string;
}
export const ServiceSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SettingId: S.optional(S.String),
    SettingValue: S.optional(S.String),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastModifiedUser: S.optional(S.String),
    ARN: S.optional(S.String),
    Status: S.optional(S.String),
  }),
).annotate({ identifier: "ServiceSetting" }) as any as S.Schema<ServiceSetting>;
export interface GetServiceSettingResult {
  ServiceSetting?: ServiceSetting;
}
export const GetServiceSettingResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceSetting: S.optional(ServiceSetting) }).pipe(ns),
).annotate({
  identifier: "GetServiceSettingResult",
}) as any as S.Schema<GetServiceSettingResult>;
export interface LabelParameterVersionRequest {
  Name: string;
  ParameterVersion?: number;
  Labels: string[];
}
export const LabelParameterVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    ParameterVersion: S.optional(S.Number),
    Labels: ParameterLabelList,
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
  identifier: "LabelParameterVersionRequest",
}) as any as S.Schema<LabelParameterVersionRequest>;
export interface LabelParameterVersionResult {
  InvalidLabels?: string[];
  ParameterVersion?: number;
}
export const LabelParameterVersionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InvalidLabels: S.optional(ParameterLabelList),
    ParameterVersion: S.optional(S.Number),
  }).pipe(ns),
).annotate({
  identifier: "LabelParameterVersionResult",
}) as any as S.Schema<LabelParameterVersionResult>;
export type AssociationFilterKey =
  | "InstanceId"
  | "Name"
  | "AssociationId"
  | "AssociationStatusName"
  | "LastExecutedBefore"
  | "LastExecutedAfter"
  | "AssociationName"
  | "ResourceGroupName"
  | "CloudConnectorId"
  | (string & {});
export const AssociationFilterKey = S.String;

export type AssociationFilterValue = string;
export interface AssociationFilter {
  key: AssociationFilterKey;
  value: string;
}
export const AssociationFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: AssociationFilterKey, value: S.String }),
).annotate({
  identifier: "AssociationFilter",
}) as any as S.Schema<AssociationFilter>;
export type AssociationFilterList = AssociationFilter[];
export const AssociationFilterList = /*@__PURE__*/ S.Array(
  AssociationFilter.pipe(T.XmlName("AssociationFilter")).annotate({
    identifier: "AssociationFilter",
  }),
);
export interface ListAssociationsRequest {
  AssociationFilterList?: AssociationFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociationFilterList: S.optional(AssociationFilterList),
    MaxResults: S.optional(S.Number),
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
  identifier: "ListAssociationsRequest",
}) as any as S.Schema<ListAssociationsRequest>;
export interface Association {
  Name?: string;
  InstanceId?: string;
  AssociationId?: string;
  AssociationVersion?: string;
  DocumentVersion?: string;
  Targets?: Target[];
  LastExecutionDate?: Date;
  Overview?: AssociationOverview;
  ScheduleExpression?: string;
  AssociationName?: string;
  ScheduleOffset?: number;
  Duration?: number;
  TargetMaps?: { [key: string]: string[] | undefined }[];
}
export const Association = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    InstanceId: S.optional(S.String),
    AssociationId: S.optional(S.String),
    AssociationVersion: S.optional(S.String),
    DocumentVersion: S.optional(S.String),
    Targets: S.optional(Targets),
    LastExecutionDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Overview: S.optional(AssociationOverview),
    ScheduleExpression: S.optional(S.String),
    AssociationName: S.optional(S.String),
    ScheduleOffset: S.optional(S.Number),
    Duration: S.optional(S.Number),
    TargetMaps: S.optional(TargetMaps),
  }),
).annotate({ identifier: "Association" }) as any as S.Schema<Association>;
export type AssociationList = Association[];
export const AssociationList = /*@__PURE__*/ S.Array(
  Association.pipe(T.XmlName("Association")).annotate({
    identifier: "Association",
  }),
);
export interface ListAssociationsResult {
  Associations?: Association[];
  NextToken?: string;
}
export const ListAssociationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Associations: S.optional(AssociationList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListAssociationsResult",
}) as any as S.Schema<ListAssociationsResult>;
export interface ListAssociationVersionsRequest {
  AssociationId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListAssociationVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociationId: S.String,
    MaxResults: S.optional(S.Number),
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
  identifier: "ListAssociationVersionsRequest",
}) as any as S.Schema<ListAssociationVersionsRequest>;
export interface AssociationVersionInfo {
  AssociationId?: string;
  AssociationVersion?: string;
  CreatedDate?: Date;
  Name?: string;
  DocumentVersion?: string;
  Parameters?: { [key: string]: string[] | undefined };
  Targets?: Target[];
  ScheduleExpression?: string;
  OutputLocation?: InstanceAssociationOutputLocation;
  AssociationName?: string;
  MaxErrors?: string;
  MaxConcurrency?: string;
  ComplianceSeverity?: AssociationComplianceSeverity;
  SyncCompliance?: AssociationSyncCompliance;
  ApplyOnlyAtCronInterval?: boolean;
  CalendarNames?: string[];
  TargetLocations?: TargetLocation[];
  ScheduleOffset?: number;
  Duration?: number;
  TargetMaps?: { [key: string]: string[] | undefined }[];
  AssociationDispatchAssumeRole?: string;
}
export const AssociationVersionInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociationId: S.optional(S.String),
    AssociationVersion: S.optional(S.String),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Name: S.optional(S.String),
    DocumentVersion: S.optional(S.String),
    Parameters: S.optional(Parameters),
    Targets: S.optional(Targets),
    ScheduleExpression: S.optional(S.String),
    OutputLocation: S.optional(InstanceAssociationOutputLocation),
    AssociationName: S.optional(S.String),
    MaxErrors: S.optional(S.String),
    MaxConcurrency: S.optional(S.String),
    ComplianceSeverity: S.optional(AssociationComplianceSeverity),
    SyncCompliance: S.optional(AssociationSyncCompliance),
    ApplyOnlyAtCronInterval: S.optional(S.Boolean),
    CalendarNames: S.optional(CalendarNameOrARNList),
    TargetLocations: S.optional(TargetLocations),
    ScheduleOffset: S.optional(S.Number),
    Duration: S.optional(S.Number),
    TargetMaps: S.optional(TargetMaps),
    AssociationDispatchAssumeRole: S.optional(S.String),
  }),
).annotate({
  identifier: "AssociationVersionInfo",
}) as any as S.Schema<AssociationVersionInfo>;
export type AssociationVersionList = AssociationVersionInfo[];
export const AssociationVersionList = /*@__PURE__*/ S.Array(
  AssociationVersionInfo,
);
export interface ListAssociationVersionsResult {
  AssociationVersions?: AssociationVersionInfo[];
  NextToken?: string;
}
export const ListAssociationVersionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociationVersions: S.optional(AssociationVersionList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListAssociationVersionsResult",
}) as any as S.Schema<ListAssociationVersionsResult>;
export type CloudConnectorMaxResults = number;
export type CloudConnectorFilterKey =
  | "SubscriptionId"
  | "TenantId"
  | (string & {});
export const CloudConnectorFilterKey = S.String;

export type CloudConnectorFilterValue = string;
export type CloudConnectorFilterValues = string[];
export const CloudConnectorFilterValues = /*@__PURE__*/ S.Array(S.String);
export interface CloudConnectorFilter {
  FilterKey?: CloudConnectorFilterKey;
  FilterValues?: string[];
}
export const CloudConnectorFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FilterKey: S.optional(CloudConnectorFilterKey),
    FilterValues: S.optional(CloudConnectorFilterValues),
  }),
).annotate({
  identifier: "CloudConnectorFilter",
}) as any as S.Schema<CloudConnectorFilter>;
export type CloudConnectorFilterList = CloudConnectorFilter[];
export const CloudConnectorFilterList =
  /*@__PURE__*/ S.Array(CloudConnectorFilter);
export interface ListCloudConnectorsRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: CloudConnectorFilter[];
}
export const ListCloudConnectorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(CloudConnectorFilterList),
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
  identifier: "ListCloudConnectorsRequest",
}) as any as S.Schema<ListCloudConnectorsRequest>;
export interface CloudConnectorSummary {
  CloudConnectorId?: string;
  DisplayName?: string;
  Description?: string;
  RoleArn?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const CloudConnectorSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudConnectorId: S.optional(S.String),
    DisplayName: S.optional(S.String),
    Description: S.optional(S.String),
    RoleArn: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "CloudConnectorSummary",
}) as any as S.Schema<CloudConnectorSummary>;
export type CloudConnectorSummaryList = CloudConnectorSummary[];
export const CloudConnectorSummaryList = /*@__PURE__*/ S.Array(
  CloudConnectorSummary,
);
export interface ListCloudConnectorsResult {
  CloudConnectors?: CloudConnectorSummary[];
  NextToken?: string;
}
export const ListCloudConnectorsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudConnectors: S.optional(CloudConnectorSummaryList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListCloudConnectorsResult",
}) as any as S.Schema<ListCloudConnectorsResult>;
export type CommandMaxResults = number;
export type CommandFilterKey =
  | "InvokedAfter"
  | "InvokedBefore"
  | "Status"
  | "ExecutionStage"
  | "DocumentName"
  | (string & {});
export const CommandFilterKey = S.String;

export type CommandFilterValue = string;
export interface CommandFilter {
  key: CommandFilterKey;
  value: string;
}
export const CommandFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: CommandFilterKey, value: S.String }),
).annotate({ identifier: "CommandFilter" }) as any as S.Schema<CommandFilter>;
export type CommandFilterList = CommandFilter[];
export const CommandFilterList = /*@__PURE__*/ S.Array(CommandFilter);
export interface ListCommandInvocationsRequest {
  CommandId?: string;
  InstanceId?: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: CommandFilter[];
  Details?: boolean;
}
export const ListCommandInvocationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CommandId: S.optional(S.String),
    InstanceId: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(CommandFilterList),
    Details: S.optional(S.Boolean),
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
  identifier: "ListCommandInvocationsRequest",
}) as any as S.Schema<ListCommandInvocationsRequest>;
export type InstanceTagName = string;
export type InvocationTraceOutput = string;
export type CommandPluginStatus =
  | "Pending"
  | "InProgress"
  | "Success"
  | "TimedOut"
  | "Cancelled"
  | "Failed"
  | (string & {});
export const CommandPluginStatus = S.String;

export type CommandPluginOutput = string;
export interface CommandPlugin {
  Name?: string;
  Status?: CommandPluginStatus;
  StatusDetails?: string;
  ResponseCode?: number;
  ResponseStartDateTime?: Date;
  ResponseFinishDateTime?: Date;
  Output?: string;
  StandardOutputUrl?: string;
  StandardErrorUrl?: string;
  OutputS3Region?: string;
  OutputS3BucketName?: string;
  OutputS3KeyPrefix?: string;
}
export const CommandPlugin = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Status: S.optional(CommandPluginStatus),
    StatusDetails: S.optional(S.String),
    ResponseCode: S.optional(S.Number),
    ResponseStartDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ResponseFinishDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Output: S.optional(S.String),
    StandardOutputUrl: S.optional(S.String),
    StandardErrorUrl: S.optional(S.String),
    OutputS3Region: S.optional(S.String),
    OutputS3BucketName: S.optional(S.String),
    OutputS3KeyPrefix: S.optional(S.String),
  }),
).annotate({ identifier: "CommandPlugin" }) as any as S.Schema<CommandPlugin>;
export type CommandPluginList = CommandPlugin[];
export const CommandPluginList = /*@__PURE__*/ S.Array(CommandPlugin);
export interface CommandInvocation {
  CommandId?: string;
  InstanceId?: string;
  InstanceName?: string;
  Comment?: string;
  DocumentName?: string;
  DocumentVersion?: string;
  RequestedDateTime?: Date;
  Status?: CommandInvocationStatus;
  StatusDetails?: string;
  TraceOutput?: string;
  StandardOutputUrl?: string;
  StandardErrorUrl?: string;
  CommandPlugins?: CommandPlugin[];
  ServiceRole?: string;
  NotificationConfig?: NotificationConfig;
  CloudWatchOutputConfig?: CloudWatchOutputConfig;
}
export const CommandInvocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CommandId: S.optional(S.String),
    InstanceId: S.optional(S.String),
    InstanceName: S.optional(S.String),
    Comment: S.optional(S.String),
    DocumentName: S.optional(S.String),
    DocumentVersion: S.optional(S.String),
    RequestedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Status: S.optional(CommandInvocationStatus),
    StatusDetails: S.optional(S.String),
    TraceOutput: S.optional(S.String),
    StandardOutputUrl: S.optional(S.String),
    StandardErrorUrl: S.optional(S.String),
    CommandPlugins: S.optional(CommandPluginList),
    ServiceRole: S.optional(S.String),
    NotificationConfig: S.optional(NotificationConfig),
    CloudWatchOutputConfig: S.optional(CloudWatchOutputConfig),
  }),
).annotate({
  identifier: "CommandInvocation",
}) as any as S.Schema<CommandInvocation>;
export type CommandInvocationList = CommandInvocation[];
export const CommandInvocationList = /*@__PURE__*/ S.Array(CommandInvocation);
export interface ListCommandInvocationsResult {
  CommandInvocations?: CommandInvocation[];
  NextToken?: string;
}
export const ListCommandInvocationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CommandInvocations: S.optional(CommandInvocationList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListCommandInvocationsResult",
}) as any as S.Schema<ListCommandInvocationsResult>;
export interface ListCommandsRequest {
  CommandId?: string;
  InstanceId?: string;
  MaxResults?: number;
  NextToken?: string;
  Filters?: CommandFilter[];
}
export const ListCommandsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CommandId: S.optional(S.String),
    InstanceId: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(CommandFilterList),
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
  identifier: "ListCommandsRequest",
}) as any as S.Schema<ListCommandsRequest>;
export type CommandStatus =
  | "Pending"
  | "InProgress"
  | "Success"
  | "Cancelled"
  | "Failed"
  | "TimedOut"
  | "Cancelling"
  | (string & {});
export const CommandStatus = S.String;

export type TargetCount = number;
export type CompletedCount = number;
export type ErrorCount = number;
export type DeliveryTimedOutCount = number;
export interface Command {
  CommandId?: string;
  DocumentName?: string;
  DocumentVersion?: string;
  Comment?: string;
  ExpiresAfter?: Date;
  Parameters?: { [key: string]: string[] | undefined };
  InstanceIds?: string[];
  Targets?: Target[];
  RequestedDateTime?: Date;
  Status?: CommandStatus;
  StatusDetails?: string;
  OutputS3Region?: string;
  OutputS3BucketName?: string;
  OutputS3KeyPrefix?: string;
  MaxConcurrency?: string;
  MaxErrors?: string;
  TargetCount?: number;
  CompletedCount?: number;
  ErrorCount?: number;
  DeliveryTimedOutCount?: number;
  ServiceRole?: string;
  NotificationConfig?: NotificationConfig;
  CloudWatchOutputConfig?: CloudWatchOutputConfig;
  TimeoutSeconds?: number;
  AlarmConfiguration?: AlarmConfiguration;
  TriggeredAlarms?: AlarmStateInformation[];
}
export const Command = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CommandId: S.optional(S.String),
    DocumentName: S.optional(S.String),
    DocumentVersion: S.optional(S.String),
    Comment: S.optional(S.String),
    ExpiresAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Parameters: S.optional(Parameters),
    InstanceIds: S.optional(InstanceIdList),
    Targets: S.optional(Targets),
    RequestedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Status: S.optional(CommandStatus),
    StatusDetails: S.optional(S.String),
    OutputS3Region: S.optional(S.String),
    OutputS3BucketName: S.optional(S.String),
    OutputS3KeyPrefix: S.optional(S.String),
    MaxConcurrency: S.optional(S.String),
    MaxErrors: S.optional(S.String),
    TargetCount: S.optional(S.Number),
    CompletedCount: S.optional(S.Number),
    ErrorCount: S.optional(S.Number),
    DeliveryTimedOutCount: S.optional(S.Number),
    ServiceRole: S.optional(S.String),
    NotificationConfig: S.optional(NotificationConfig),
    CloudWatchOutputConfig: S.optional(CloudWatchOutputConfig),
    TimeoutSeconds: S.optional(S.Number),
    AlarmConfiguration: S.optional(AlarmConfiguration),
    TriggeredAlarms: S.optional(AlarmStateInformationList),
  }),
).annotate({ identifier: "Command" }) as any as S.Schema<Command>;
export type CommandList = Command[];
export const CommandList = /*@__PURE__*/ S.Array(Command);
export interface ListCommandsResult {
  Commands?: Command[];
  NextToken?: string;
}
export const ListCommandsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Commands: S.optional(CommandList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListCommandsResult",
}) as any as S.Schema<ListCommandsResult>;
export type ComplianceStringFilterKey = string;
export type ComplianceFilterValue = string;
export type ComplianceStringFilterValueList = string[];
export const ComplianceStringFilterValueList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("FilterValue")),
);
export type ComplianceQueryOperatorType =
  | "EQUAL"
  | "NOT_EQUAL"
  | "BEGIN_WITH"
  | "LESS_THAN"
  | "GREATER_THAN"
  | (string & {});
export const ComplianceQueryOperatorType = S.String;

export interface ComplianceStringFilter {
  Key?: string;
  Values?: string[];
  Type?: ComplianceQueryOperatorType;
}
export const ComplianceStringFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(S.String),
    Values: S.optional(ComplianceStringFilterValueList),
    Type: S.optional(ComplianceQueryOperatorType),
  }),
).annotate({
  identifier: "ComplianceStringFilter",
}) as any as S.Schema<ComplianceStringFilter>;
export type ComplianceStringFilterList = ComplianceStringFilter[];
export const ComplianceStringFilterList = /*@__PURE__*/ S.Array(
  ComplianceStringFilter.pipe(T.XmlName("ComplianceFilter")).annotate({
    identifier: "ComplianceStringFilter",
  }),
);
export type ComplianceResourceId = string;
export type ComplianceResourceIdList = string[];
export const ComplianceResourceIdList = /*@__PURE__*/ S.Array(S.String);
export type ComplianceResourceType = string;
export type ComplianceResourceTypeList = string[];
export const ComplianceResourceTypeList = /*@__PURE__*/ S.Array(S.String);
export interface ListComplianceItemsRequest {
  Filters?: ComplianceStringFilter[];
  ResourceIds?: string[];
  ResourceTypes?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListComplianceItemsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(ComplianceStringFilterList),
    ResourceIds: S.optional(ComplianceResourceIdList),
    ResourceTypes: S.optional(ComplianceResourceTypeList),
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
  identifier: "ListComplianceItemsRequest",
}) as any as S.Schema<ListComplianceItemsRequest>;
export type ComplianceTypeName = string;
export type ComplianceItemId = string;
export type ComplianceItemTitle = string;
export type ComplianceStatus = "COMPLIANT" | "NON_COMPLIANT" | (string & {});
export const ComplianceStatus = S.String;

export type ComplianceSeverity =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "INFORMATIONAL"
  | "UNSPECIFIED"
  | (string & {});
export const ComplianceSeverity = S.String;

export type ComplianceExecutionId = string;
export type ComplianceExecutionType = string;
export interface ComplianceExecutionSummary {
  ExecutionTime: Date;
  ExecutionId?: string;
  ExecutionType?: string;
}
export const ComplianceExecutionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExecutionTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ExecutionId: S.optional(S.String),
    ExecutionType: S.optional(S.String),
  }),
).annotate({
  identifier: "ComplianceExecutionSummary",
}) as any as S.Schema<ComplianceExecutionSummary>;
export type ComplianceItemDetails = { [key: string]: string | undefined };
export const ComplianceItemDetails = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ComplianceItem {
  ComplianceType?: string;
  ResourceType?: string;
  ResourceId?: string;
  Id?: string;
  Title?: string;
  Status?: ComplianceStatus;
  Severity?: ComplianceSeverity;
  ExecutionSummary?: ComplianceExecutionSummary;
  Details?: { [key: string]: string | undefined };
}
export const ComplianceItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ComplianceType: S.optional(S.String),
    ResourceType: S.optional(S.String),
    ResourceId: S.optional(S.String),
    Id: S.optional(S.String),
    Title: S.optional(S.String),
    Status: S.optional(ComplianceStatus),
    Severity: S.optional(ComplianceSeverity),
    ExecutionSummary: S.optional(ComplianceExecutionSummary),
    Details: S.optional(ComplianceItemDetails),
  }),
).annotate({ identifier: "ComplianceItem" }) as any as S.Schema<ComplianceItem>;
export type ComplianceItemList = ComplianceItem[];
export const ComplianceItemList = /*@__PURE__*/ S.Array(
  ComplianceItem.pipe(T.XmlName("Item")).annotate({
    identifier: "ComplianceItem",
  }),
);
export interface ListComplianceItemsResult {
  ComplianceItems?: ComplianceItem[];
  NextToken?: string;
}
export const ListComplianceItemsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ComplianceItems: S.optional(ComplianceItemList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListComplianceItemsResult",
}) as any as S.Schema<ListComplianceItemsResult>;
export interface ListComplianceSummariesRequest {
  Filters?: ComplianceStringFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListComplianceSummariesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(ComplianceStringFilterList),
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
  identifier: "ListComplianceSummariesRequest",
}) as any as S.Schema<ListComplianceSummariesRequest>;
export type ComplianceSummaryCount = number;
export interface SeveritySummary {
  CriticalCount?: number;
  HighCount?: number;
  MediumCount?: number;
  LowCount?: number;
  InformationalCount?: number;
  UnspecifiedCount?: number;
}
export const SeveritySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CriticalCount: S.optional(S.Number),
    HighCount: S.optional(S.Number),
    MediumCount: S.optional(S.Number),
    LowCount: S.optional(S.Number),
    InformationalCount: S.optional(S.Number),
    UnspecifiedCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "SeveritySummary",
}) as any as S.Schema<SeveritySummary>;
export interface CompliantSummary {
  CompliantCount?: number;
  SeveritySummary?: SeveritySummary;
}
export const CompliantSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CompliantCount: S.optional(S.Number),
    SeveritySummary: S.optional(SeveritySummary),
  }),
).annotate({
  identifier: "CompliantSummary",
}) as any as S.Schema<CompliantSummary>;
export interface NonCompliantSummary {
  NonCompliantCount?: number;
  SeveritySummary?: SeveritySummary;
}
export const NonCompliantSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NonCompliantCount: S.optional(S.Number),
    SeveritySummary: S.optional(SeveritySummary),
  }),
).annotate({
  identifier: "NonCompliantSummary",
}) as any as S.Schema<NonCompliantSummary>;
export interface ComplianceSummaryItem {
  ComplianceType?: string;
  CompliantSummary?: CompliantSummary;
  NonCompliantSummary?: NonCompliantSummary;
}
export const ComplianceSummaryItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ComplianceType: S.optional(S.String),
    CompliantSummary: S.optional(CompliantSummary),
    NonCompliantSummary: S.optional(NonCompliantSummary),
  }),
).annotate({
  identifier: "ComplianceSummaryItem",
}) as any as S.Schema<ComplianceSummaryItem>;
export type ComplianceSummaryItemList = ComplianceSummaryItem[];
export const ComplianceSummaryItemList = /*@__PURE__*/ S.Array(
  ComplianceSummaryItem.pipe(T.XmlName("Item")).annotate({
    identifier: "ComplianceSummaryItem",
  }),
);
export interface ListComplianceSummariesResult {
  ComplianceSummaryItems?: ComplianceSummaryItem[];
  NextToken?: string;
}
export const ListComplianceSummariesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ComplianceSummaryItems: S.optional(ComplianceSummaryItemList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListComplianceSummariesResult",
}) as any as S.Schema<ListComplianceSummariesResult>;
export type DocumentMetadataEnum = "DocumentReviews" | (string & {});
export const DocumentMetadataEnum = S.String;

export interface ListDocumentMetadataHistoryRequest {
  Name: string;
  DocumentVersion?: string;
  Metadata: DocumentMetadataEnum;
  NextToken?: string;
  MaxResults?: number;
}
export const ListDocumentMetadataHistoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    DocumentVersion: S.optional(S.String),
    Metadata: DocumentMetadataEnum,
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
  identifier: "ListDocumentMetadataHistoryRequest",
}) as any as S.Schema<ListDocumentMetadataHistoryRequest>;
export type DocumentReviewCommentType = "Comment" | (string & {});
export const DocumentReviewCommentType = S.String;

export type DocumentReviewComment = string;
export interface DocumentReviewCommentSource {
  Type?: DocumentReviewCommentType;
  Content?: string;
}
export const DocumentReviewCommentSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(DocumentReviewCommentType),
    Content: S.optional(S.String),
  }),
).annotate({
  identifier: "DocumentReviewCommentSource",
}) as any as S.Schema<DocumentReviewCommentSource>;
export type DocumentReviewCommentList = DocumentReviewCommentSource[];
export const DocumentReviewCommentList = /*@__PURE__*/ S.Array(
  DocumentReviewCommentSource,
);
export interface DocumentReviewerResponseSource {
  CreateTime?: Date;
  UpdatedTime?: Date;
  ReviewStatus?: ReviewStatus;
  Comment?: DocumentReviewCommentSource[];
  Reviewer?: string;
}
export const DocumentReviewerResponseSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ReviewStatus: S.optional(ReviewStatus),
    Comment: S.optional(DocumentReviewCommentList),
    Reviewer: S.optional(S.String),
  }),
).annotate({
  identifier: "DocumentReviewerResponseSource",
}) as any as S.Schema<DocumentReviewerResponseSource>;
export type DocumentReviewerResponseList = DocumentReviewerResponseSource[];
export const DocumentReviewerResponseList = /*@__PURE__*/ S.Array(
  DocumentReviewerResponseSource,
);
export interface DocumentMetadataResponseInfo {
  ReviewerResponse?: DocumentReviewerResponseSource[];
}
export const DocumentMetadataResponseInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReviewerResponse: S.optional(DocumentReviewerResponseList) }),
).annotate({
  identifier: "DocumentMetadataResponseInfo",
}) as any as S.Schema<DocumentMetadataResponseInfo>;
export interface ListDocumentMetadataHistoryResponse {
  Name?: string;
  DocumentVersion?: string;
  Author?: string;
  Metadata?: DocumentMetadataResponseInfo;
  NextToken?: string;
}
export const ListDocumentMetadataHistoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    DocumentVersion: S.optional(S.String),
    Author: S.optional(S.String),
    Metadata: S.optional(DocumentMetadataResponseInfo),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDocumentMetadataHistoryResponse",
}) as any as S.Schema<ListDocumentMetadataHistoryResponse>;
export type DocumentFilterKey =
  | "Name"
  | "Owner"
  | "PlatformTypes"
  | "DocumentType"
  | (string & {});
export const DocumentFilterKey = S.String;

export type DocumentFilterValue = string;
export interface DocumentFilter {
  key: DocumentFilterKey;
  value: string;
}
export const DocumentFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: DocumentFilterKey, value: S.String }),
).annotate({ identifier: "DocumentFilter" }) as any as S.Schema<DocumentFilter>;
export type DocumentFilterList = DocumentFilter[];
export const DocumentFilterList = /*@__PURE__*/ S.Array(
  DocumentFilter.pipe(T.XmlName("DocumentFilter")).annotate({
    identifier: "DocumentFilter",
  }),
);
export type DocumentKeyValuesFilterKey = string;
export type DocumentKeyValuesFilterValue = string;
export type DocumentKeyValuesFilterValues = string[];
export const DocumentKeyValuesFilterValues = /*@__PURE__*/ S.Array(S.String);
export interface DocumentKeyValuesFilter {
  Key?: string;
  Values?: string[];
}
export const DocumentKeyValuesFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(S.String),
    Values: S.optional(DocumentKeyValuesFilterValues),
  }),
).annotate({
  identifier: "DocumentKeyValuesFilter",
}) as any as S.Schema<DocumentKeyValuesFilter>;
export type DocumentKeyValuesFilterList = DocumentKeyValuesFilter[];
export const DocumentKeyValuesFilterList = /*@__PURE__*/ S.Array(
  DocumentKeyValuesFilter,
);
export interface ListDocumentsRequest {
  DocumentFilterList?: DocumentFilter[];
  Filters?: DocumentKeyValuesFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListDocumentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DocumentFilterList: S.optional(DocumentFilterList),
    Filters: S.optional(DocumentKeyValuesFilterList),
    MaxResults: S.optional(S.Number),
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
  identifier: "ListDocumentsRequest",
}) as any as S.Schema<ListDocumentsRequest>;
export interface DocumentIdentifier {
  Name?: string;
  CreatedDate?: Date;
  DisplayName?: string;
  Owner?: string;
  VersionName?: string;
  PlatformTypes?: PlatformType[];
  DocumentVersion?: string;
  DocumentType?: DocumentType;
  SchemaVersion?: string;
  DocumentFormat?: DocumentFormat;
  TargetType?: string;
  Tags?: Tag[];
  Requires?: DocumentRequires[];
  ReviewStatus?: ReviewStatus;
  Author?: string;
}
export const DocumentIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DisplayName: S.optional(S.String),
    Owner: S.optional(S.String),
    VersionName: S.optional(S.String),
    PlatformTypes: S.optional(PlatformTypeList),
    DocumentVersion: S.optional(S.String),
    DocumentType: S.optional(DocumentType),
    SchemaVersion: S.optional(S.String),
    DocumentFormat: S.optional(DocumentFormat),
    TargetType: S.optional(S.String),
    Tags: S.optional(TagList),
    Requires: S.optional(DocumentRequiresList),
    ReviewStatus: S.optional(ReviewStatus),
    Author: S.optional(S.String),
  }),
).annotate({
  identifier: "DocumentIdentifier",
}) as any as S.Schema<DocumentIdentifier>;
export type DocumentIdentifierList = DocumentIdentifier[];
export const DocumentIdentifierList = /*@__PURE__*/ S.Array(
  DocumentIdentifier.pipe(T.XmlName("DocumentIdentifier")).annotate({
    identifier: "DocumentIdentifier",
  }),
);
export interface ListDocumentsResult {
  DocumentIdentifiers?: DocumentIdentifier[];
  NextToken?: string;
}
export const ListDocumentsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DocumentIdentifiers: S.optional(DocumentIdentifierList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDocumentsResult",
}) as any as S.Schema<ListDocumentsResult>;
export interface ListDocumentVersionsRequest {
  Name: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListDocumentVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    MaxResults: S.optional(S.Number),
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
  identifier: "ListDocumentVersionsRequest",
}) as any as S.Schema<ListDocumentVersionsRequest>;
export interface DocumentVersionInfo {
  Name?: string;
  DisplayName?: string;
  DocumentVersion?: string;
  VersionName?: string;
  CreatedDate?: Date;
  IsDefaultVersion?: boolean;
  DocumentFormat?: DocumentFormat;
  Status?: DocumentStatus;
  StatusInformation?: string;
  ReviewStatus?: ReviewStatus;
}
export const DocumentVersionInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    DisplayName: S.optional(S.String),
    DocumentVersion: S.optional(S.String),
    VersionName: S.optional(S.String),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IsDefaultVersion: S.optional(S.Boolean),
    DocumentFormat: S.optional(DocumentFormat),
    Status: S.optional(DocumentStatus),
    StatusInformation: S.optional(S.String),
    ReviewStatus: S.optional(ReviewStatus),
  }),
).annotate({
  identifier: "DocumentVersionInfo",
}) as any as S.Schema<DocumentVersionInfo>;
export type DocumentVersionList = DocumentVersionInfo[];
export const DocumentVersionList = /*@__PURE__*/ S.Array(DocumentVersionInfo);
export interface ListDocumentVersionsResult {
  DocumentVersions?: DocumentVersionInfo[];
  NextToken?: string;
}
export const ListDocumentVersionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DocumentVersions: S.optional(DocumentVersionList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDocumentVersionsResult",
}) as any as S.Schema<ListDocumentVersionsResult>;
export interface ListInventoryEntriesRequest {
  InstanceId: string;
  TypeName: string;
  Filters?: InventoryFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListInventoryEntriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceId: S.String,
    TypeName: S.String,
    Filters: S.optional(InventoryFilterList),
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
  identifier: "ListInventoryEntriesRequest",
}) as any as S.Schema<ListInventoryEntriesRequest>;
export interface ListInventoryEntriesResult {
  TypeName?: string;
  InstanceId?: string;
  SchemaVersion?: string;
  CaptureTime?: string;
  Entries?: { [key: string]: string | undefined }[];
  NextToken?: string;
}
export const ListInventoryEntriesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TypeName: S.optional(S.String),
    InstanceId: S.optional(S.String),
    SchemaVersion: S.optional(S.String),
    CaptureTime: S.optional(S.String),
    Entries: S.optional(InventoryItemEntryList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListInventoryEntriesResult",
}) as any as S.Schema<ListInventoryEntriesResult>;
export type NodeFilterKey =
  | "AgentType"
  | "AgentVersion"
  | "ComputerName"
  | "InstanceId"
  | "InstanceStatus"
  | "IpAddress"
  | "ManagedStatus"
  | "PlatformName"
  | "PlatformType"
  | "PlatformVersion"
  | "ResourceType"
  | "OrganizationalUnitId"
  | "OrganizationalUnitPath"
  | "Region"
  | "AccountId"
  | "SourceType"
  | "SourceId"
  | "SourceLocation"
  | "AvailabilityZone"
  | "AvailabilityZoneId"
  | (string & {});
export const NodeFilterKey = S.String;

export type NodeFilterValue = string;
export type NodeFilterValueList = string[];
export const NodeFilterValueList = /*@__PURE__*/ S.Array(
  S.String.pipe(T.XmlName("FilterValue")),
);
export type NodeFilterOperatorType =
  | "Equal"
  | "NotEqual"
  | "BeginWith"
  | (string & {});
export const NodeFilterOperatorType = S.String;

export interface NodeFilter {
  Key: NodeFilterKey;
  Values: string[];
  Type?: NodeFilterOperatorType;
}
export const NodeFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: NodeFilterKey,
    Values: NodeFilterValueList,
    Type: S.optional(NodeFilterOperatorType),
  }),
).annotate({ identifier: "NodeFilter" }) as any as S.Schema<NodeFilter>;
export type NodeFilterList = NodeFilter[];
export const NodeFilterList = /*@__PURE__*/ S.Array(
  NodeFilter.pipe(T.XmlName("NodeFilter")).annotate({
    identifier: "NodeFilter",
  }),
);
export interface ListNodesRequest {
  SyncName?: string;
  Filters?: NodeFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListNodesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SyncName: S.optional(S.String),
    Filters: S.optional(NodeFilterList),
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
  identifier: "ListNodesRequest",
}) as any as S.Schema<ListNodesRequest>;
export type NodeCaptureTime = Date;
export type NodeId = string;
export type NodeAccountId = string;
export type NodeOrganizationalUnitId = string;
export type NodeOrganizationalUnitPath = string;
export interface NodeOwnerInfo {
  AccountId?: string;
  OrganizationalUnitId?: string;
  OrganizationalUnitPath?: string;
}
export const NodeOwnerInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    OrganizationalUnitId: S.optional(S.String),
    OrganizationalUnitPath: S.optional(S.String),
  }),
).annotate({ identifier: "NodeOwnerInfo" }) as any as S.Schema<NodeOwnerInfo>;
export type NodeRegion = string;
export type AgentType = string;
export type AgentVersion = string;
export type InstanceStatus = string;
export type ManagedStatus = "All" | "Managed" | "Unmanaged" | (string & {});
export const ManagedStatus = S.String;

export type NodeName = string;
export type AvailabilityZoneId = string;
export interface InstanceInfo {
  AgentType?: string;
  AgentVersion?: string;
  ComputerName?: string;
  InstanceStatus?: string;
  IpAddress?: string | redacted.Redacted<string>;
  ManagedStatus?: ManagedStatus;
  Name?: string;
  PlatformType?: PlatformType;
  PlatformName?: string;
  PlatformVersion?: string;
  ResourceType?: ResourceType;
  SourceType?: SourceType;
  SourceId?: string;
  SourceLocation?: string;
  AvailabilityZone?: string;
  AvailabilityZoneId?: string;
}
export const InstanceInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AgentType: S.optional(S.String),
    AgentVersion: S.optional(S.String),
    ComputerName: S.optional(S.String),
    InstanceStatus: S.optional(S.String),
    IpAddress: S.optional(SensitiveString),
    ManagedStatus: S.optional(ManagedStatus),
    Name: S.optional(S.String),
    PlatformType: S.optional(PlatformType),
    PlatformName: S.optional(S.String),
    PlatformVersion: S.optional(S.String),
    ResourceType: S.optional(ResourceType),
    SourceType: S.optional(SourceType),
    SourceId: S.optional(S.String),
    SourceLocation: S.optional(S.String),
    AvailabilityZone: S.optional(S.String),
    AvailabilityZoneId: S.optional(S.String),
  }),
).annotate({ identifier: "InstanceInfo" }) as any as S.Schema<InstanceInfo>;
export type NodeType = { Instance: InstanceInfo };
export const NodeType = /*@__PURE__*/ S.Union([
  S.Struct({ Instance: InstanceInfo }),
]);
export interface Node {
  CaptureTime?: Date;
  Id?: string;
  Owner?: NodeOwnerInfo;
  Region?: string;
  NodeType?: NodeType;
}
export const Node = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CaptureTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Id: S.optional(S.String),
    Owner: S.optional(NodeOwnerInfo),
    Region: S.optional(S.String),
    NodeType: S.optional(NodeType),
  }),
).annotate({ identifier: "Node" }) as any as S.Schema<Node>;
export type NodeList = Node[];
export const NodeList = /*@__PURE__*/ S.Array(Node);
export interface ListNodesResult {
  Nodes?: Node[];
  NextToken?: string;
}
export const ListNodesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Nodes: S.optional(NodeList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListNodesResult",
}) as any as S.Schema<ListNodesResult>;
export type NodeAggregatorType = "Count" | (string & {});
export const NodeAggregatorType = S.String;

export type NodeTypeName = "Instance" | (string & {});
export const NodeTypeName = S.String;

export type NodeAttributeName =
  | "AgentVersion"
  | "PlatformName"
  | "PlatformType"
  | "PlatformVersion"
  | "Region"
  | "ResourceType"
  | "SourceType"
  | "AvailabilityZone"
  | (string & {});
export const NodeAttributeName = S.String;

export interface NodeAggregator {
  AggregatorType: NodeAggregatorType;
  TypeName: NodeTypeName;
  AttributeName: NodeAttributeName;
  Aggregators?: NodeAggregator[];
}
export const NodeAggregator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AggregatorType: NodeAggregatorType,
    TypeName: NodeTypeName,
    AttributeName: NodeAttributeName,
    Aggregators: S.optional(
      S.suspend(() => NodeAggregatorList).annotate({
        identifier: "NodeAggregatorList",
      }),
    ),
  }),
).annotate({ identifier: "NodeAggregator" }) as any as S.Schema<NodeAggregator>;
export type NodeAggregatorList = NodeAggregator[];
export const NodeAggregatorList = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<NodeAggregator> => NodeAggregator)
    .annotate({ identifier: "NodeAggregator" })
    .pipe(T.XmlName("NodeAggregator"))
    .annotate({ identifier: "NodeAggregator" }),
) as any as S.Schema<NodeAggregatorList>;
export interface ListNodesSummaryRequest {
  SyncName?: string;
  Filters?: NodeFilter[];
  Aggregators: NodeAggregator[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListNodesSummaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SyncName: S.optional(S.String),
    Filters: S.optional(NodeFilterList),
    Aggregators: NodeAggregatorList,
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
  identifier: "ListNodesSummaryRequest",
}) as any as S.Schema<ListNodesSummaryRequest>;
export type NodeSummary = { [key: string]: string | undefined };
export const NodeSummary = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type NodeSummaryList = { [key: string]: string | undefined }[];
export const NodeSummaryList = /*@__PURE__*/ S.Array(NodeSummary);
export interface ListNodesSummaryResult {
  Summary?: { [key: string]: string | undefined }[];
  NextToken?: string;
}
export const ListNodesSummaryResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Summary: S.optional(NodeSummaryList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListNodesSummaryResult",
}) as any as S.Schema<ListNodesSummaryResult>;
export type OpsItemEventFilterKey = "OpsItemId" | (string & {});
export const OpsItemEventFilterKey = S.String;

export type OpsItemEventFilterValue = string;
export type OpsItemEventFilterValues = string[];
export const OpsItemEventFilterValues = /*@__PURE__*/ S.Array(S.String);
export type OpsItemEventFilterOperator = "Equal" | (string & {});
export const OpsItemEventFilterOperator = S.String;

export interface OpsItemEventFilter {
  Key: OpsItemEventFilterKey;
  Values: string[];
  Operator: OpsItemEventFilterOperator;
}
export const OpsItemEventFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: OpsItemEventFilterKey,
    Values: OpsItemEventFilterValues,
    Operator: OpsItemEventFilterOperator,
  }),
).annotate({
  identifier: "OpsItemEventFilter",
}) as any as S.Schema<OpsItemEventFilter>;
export type OpsItemEventFilters = OpsItemEventFilter[];
export const OpsItemEventFilters = /*@__PURE__*/ S.Array(OpsItemEventFilter);
export type OpsItemEventMaxResults = number;
export interface ListOpsItemEventsRequest {
  Filters?: OpsItemEventFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListOpsItemEventsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(OpsItemEventFilters),
    MaxResults: S.optional(S.Number),
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
  identifier: "ListOpsItemEventsRequest",
}) as any as S.Schema<ListOpsItemEventsRequest>;
export interface OpsItemIdentity {
  Arn?: string;
}
export const OpsItemIdentity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }),
).annotate({
  identifier: "OpsItemIdentity",
}) as any as S.Schema<OpsItemIdentity>;
export interface OpsItemEventSummary {
  OpsItemId?: string;
  EventId?: string;
  Source?: string;
  DetailType?: string;
  Detail?: string;
  CreatedBy?: OpsItemIdentity;
  CreatedTime?: Date;
}
export const OpsItemEventSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OpsItemId: S.optional(S.String),
    EventId: S.optional(S.String),
    Source: S.optional(S.String),
    DetailType: S.optional(S.String),
    Detail: S.optional(S.String),
    CreatedBy: S.optional(OpsItemIdentity),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "OpsItemEventSummary",
}) as any as S.Schema<OpsItemEventSummary>;
export type OpsItemEventSummaries = OpsItemEventSummary[];
export const OpsItemEventSummaries = /*@__PURE__*/ S.Array(OpsItemEventSummary);
export interface ListOpsItemEventsResponse {
  NextToken?: string;
  Summaries?: OpsItemEventSummary[];
}
export const ListOpsItemEventsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Summaries: S.optional(OpsItemEventSummaries),
  }).pipe(ns),
).annotate({
  identifier: "ListOpsItemEventsResponse",
}) as any as S.Schema<ListOpsItemEventsResponse>;
export type OpsItemRelatedItemsFilterKey =
  | "ResourceType"
  | "AssociationId"
  | "ResourceUri"
  | (string & {});
export const OpsItemRelatedItemsFilterKey = S.String;

export type OpsItemRelatedItemsFilterValue = string;
export type OpsItemRelatedItemsFilterValues = string[];
export const OpsItemRelatedItemsFilterValues = /*@__PURE__*/ S.Array(S.String);
export type OpsItemRelatedItemsFilterOperator = "Equal" | (string & {});
export const OpsItemRelatedItemsFilterOperator = S.String;

export interface OpsItemRelatedItemsFilter {
  Key: OpsItemRelatedItemsFilterKey;
  Values: string[];
  Operator: OpsItemRelatedItemsFilterOperator;
}
export const OpsItemRelatedItemsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: OpsItemRelatedItemsFilterKey,
    Values: OpsItemRelatedItemsFilterValues,
    Operator: OpsItemRelatedItemsFilterOperator,
  }),
).annotate({
  identifier: "OpsItemRelatedItemsFilter",
}) as any as S.Schema<OpsItemRelatedItemsFilter>;
export type OpsItemRelatedItemsFilters = OpsItemRelatedItemsFilter[];
export const OpsItemRelatedItemsFilters = /*@__PURE__*/ S.Array(
  OpsItemRelatedItemsFilter,
);
export type OpsItemRelatedItemsMaxResults = number;
export interface ListOpsItemRelatedItemsRequest {
  OpsItemId?: string;
  Filters?: OpsItemRelatedItemsFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListOpsItemRelatedItemsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OpsItemId: S.optional(S.String),
    Filters: S.optional(OpsItemRelatedItemsFilters),
    MaxResults: S.optional(S.Number),
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
  identifier: "ListOpsItemRelatedItemsRequest",
}) as any as S.Schema<ListOpsItemRelatedItemsRequest>;
export interface OpsItemRelatedItemSummary {
  OpsItemId?: string;
  AssociationId?: string;
  ResourceType?: string;
  AssociationType?: string;
  ResourceUri?: string;
  CreatedBy?: OpsItemIdentity;
  CreatedTime?: Date;
  LastModifiedBy?: OpsItemIdentity;
  LastModifiedTime?: Date;
}
export const OpsItemRelatedItemSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OpsItemId: S.optional(S.String),
    AssociationId: S.optional(S.String),
    ResourceType: S.optional(S.String),
    AssociationType: S.optional(S.String),
    ResourceUri: S.optional(S.String),
    CreatedBy: S.optional(OpsItemIdentity),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedBy: S.optional(OpsItemIdentity),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "OpsItemRelatedItemSummary",
}) as any as S.Schema<OpsItemRelatedItemSummary>;
export type OpsItemRelatedItemSummaries = OpsItemRelatedItemSummary[];
export const OpsItemRelatedItemSummaries = /*@__PURE__*/ S.Array(
  OpsItemRelatedItemSummary,
);
export interface ListOpsItemRelatedItemsResponse {
  NextToken?: string;
  Summaries?: OpsItemRelatedItemSummary[];
}
export const ListOpsItemRelatedItemsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Summaries: S.optional(OpsItemRelatedItemSummaries),
  }).pipe(ns),
).annotate({
  identifier: "ListOpsItemRelatedItemsResponse",
}) as any as S.Schema<ListOpsItemRelatedItemsResponse>;
export type OpsMetadataFilterKey = string;
export type OpsMetadataFilterValue = string;
export type OpsMetadataFilterValueList = string[];
export const OpsMetadataFilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface OpsMetadataFilter {
  Key: string;
  Values: string[];
}
export const OpsMetadataFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Values: OpsMetadataFilterValueList }),
).annotate({
  identifier: "OpsMetadataFilter",
}) as any as S.Schema<OpsMetadataFilter>;
export type OpsMetadataFilterList = OpsMetadataFilter[];
export const OpsMetadataFilterList = /*@__PURE__*/ S.Array(OpsMetadataFilter);
export type ListOpsMetadataMaxResults = number;
export interface ListOpsMetadataRequest {
  Filters?: OpsMetadataFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListOpsMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(OpsMetadataFilterList),
    MaxResults: S.optional(S.Number),
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
  identifier: "ListOpsMetadataRequest",
}) as any as S.Schema<ListOpsMetadataRequest>;
export interface OpsMetadata {
  ResourceId?: string;
  OpsMetadataArn?: string;
  LastModifiedDate?: Date;
  LastModifiedUser?: string;
  CreationDate?: Date;
}
export const OpsMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.optional(S.String),
    OpsMetadataArn: S.optional(S.String),
    LastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastModifiedUser: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "OpsMetadata" }) as any as S.Schema<OpsMetadata>;
export type OpsMetadataList = OpsMetadata[];
export const OpsMetadataList = /*@__PURE__*/ S.Array(OpsMetadata);
export interface ListOpsMetadataResult {
  OpsMetadataList?: OpsMetadata[];
  NextToken?: string;
}
export const ListOpsMetadataResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OpsMetadataList: S.optional(OpsMetadataList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListOpsMetadataResult",
}) as any as S.Schema<ListOpsMetadataResult>;
export interface ListResourceComplianceSummariesRequest {
  Filters?: ComplianceStringFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListResourceComplianceSummariesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Filters: S.optional(ComplianceStringFilterList),
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
  identifier: "ListResourceComplianceSummariesRequest",
}) as any as S.Schema<ListResourceComplianceSummariesRequest>;
export interface ResourceComplianceSummaryItem {
  ComplianceType?: string;
  ResourceType?: string;
  ResourceId?: string;
  Status?: ComplianceStatus;
  OverallSeverity?: ComplianceSeverity;
  ExecutionSummary?: ComplianceExecutionSummary;
  CompliantSummary?: CompliantSummary;
  NonCompliantSummary?: NonCompliantSummary;
}
export const ResourceComplianceSummaryItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ComplianceType: S.optional(S.String),
    ResourceType: S.optional(S.String),
    ResourceId: S.optional(S.String),
    Status: S.optional(ComplianceStatus),
    OverallSeverity: S.optional(ComplianceSeverity),
    ExecutionSummary: S.optional(ComplianceExecutionSummary),
    CompliantSummary: S.optional(CompliantSummary),
    NonCompliantSummary: S.optional(NonCompliantSummary),
  }),
).annotate({
  identifier: "ResourceComplianceSummaryItem",
}) as any as S.Schema<ResourceComplianceSummaryItem>;
export type ResourceComplianceSummaryItemList = ResourceComplianceSummaryItem[];
export const ResourceComplianceSummaryItemList = /*@__PURE__*/ S.Array(
  ResourceComplianceSummaryItem.pipe(T.XmlName("Item")).annotate({
    identifier: "ResourceComplianceSummaryItem",
  }),
);
export interface ListResourceComplianceSummariesResult {
  ResourceComplianceSummaryItems?: ResourceComplianceSummaryItem[];
  NextToken?: string;
}
export const ListResourceComplianceSummariesResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ResourceComplianceSummaryItems: S.optional(
        ResourceComplianceSummaryItemList,
      ),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListResourceComplianceSummariesResult",
}) as any as S.Schema<ListResourceComplianceSummariesResult>;
export interface ListResourceDataSyncRequest {
  SyncType?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListResourceDataSyncRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SyncType: S.optional(S.String),
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
  identifier: "ListResourceDataSyncRequest",
}) as any as S.Schema<ListResourceDataSyncRequest>;
export type ResourceDataSyncState = string;
export interface ResourceDataSyncSourceWithState {
  SourceType?: string;
  AwsOrganizationsSource?: ResourceDataSyncAwsOrganizationsSource;
  SourceRegions?: string[];
  IncludeFutureRegions?: boolean;
  State?: string;
  EnableAllOpsDataSources?: boolean;
}
export const ResourceDataSyncSourceWithState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceType: S.optional(S.String),
    AwsOrganizationsSource: S.optional(ResourceDataSyncAwsOrganizationsSource),
    SourceRegions: S.optional(ResourceDataSyncSourceRegionList),
    IncludeFutureRegions: S.optional(S.Boolean),
    State: S.optional(S.String),
    EnableAllOpsDataSources: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ResourceDataSyncSourceWithState",
}) as any as S.Schema<ResourceDataSyncSourceWithState>;
export type LastResourceDataSyncTime = Date;
export type LastSuccessfulResourceDataSyncTime = Date;
export type ResourceDataSyncLastModifiedTime = Date;
export type LastResourceDataSyncStatus =
  | "Successful"
  | "Failed"
  | "InProgress"
  | (string & {});
export const LastResourceDataSyncStatus = S.String;

export type ResourceDataSyncCreatedTime = Date;
export type LastResourceDataSyncMessage = string;
export interface ResourceDataSyncItem {
  SyncName?: string;
  SyncType?: string;
  SyncSource?: ResourceDataSyncSourceWithState;
  S3Destination?: ResourceDataSyncS3Destination;
  LastSyncTime?: Date;
  LastSuccessfulSyncTime?: Date;
  SyncLastModifiedTime?: Date;
  LastStatus?: LastResourceDataSyncStatus;
  SyncCreatedTime?: Date;
  LastSyncStatusMessage?: string;
}
export const ResourceDataSyncItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SyncName: S.optional(S.String),
    SyncType: S.optional(S.String),
    SyncSource: S.optional(ResourceDataSyncSourceWithState),
    S3Destination: S.optional(ResourceDataSyncS3Destination),
    LastSyncTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastSuccessfulSyncTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SyncLastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastStatus: S.optional(LastResourceDataSyncStatus),
    SyncCreatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastSyncStatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "ResourceDataSyncItem",
}) as any as S.Schema<ResourceDataSyncItem>;
export type ResourceDataSyncItemList = ResourceDataSyncItem[];
export const ResourceDataSyncItemList =
  /*@__PURE__*/ S.Array(ResourceDataSyncItem);
export interface ListResourceDataSyncResult {
  ResourceDataSyncItems?: ResourceDataSyncItem[];
  NextToken?: string;
}
export const ListResourceDataSyncResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceDataSyncItems: S.optional(ResourceDataSyncItemList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListResourceDataSyncResult",
}) as any as S.Schema<ListResourceDataSyncResult>;
export interface ListTagsForResourceRequest {
  ResourceType: ResourceTypeForTagging;
  ResourceId: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceType: ResourceTypeForTagging, ResourceId: S.String }).pipe(
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
export interface ListTagsForResourceResult {
  TagList?: Tag[];
}
export const ListTagsForResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TagList: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceResult",
}) as any as S.Schema<ListTagsForResourceResult>;
export interface ModifyDocumentPermissionRequest {
  Name: string;
  PermissionType: DocumentPermissionType;
  AccountIdsToAdd?: string[];
  AccountIdsToRemove?: string[];
  SharedDocumentVersion?: string;
}
export const ModifyDocumentPermissionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    PermissionType: DocumentPermissionType,
    AccountIdsToAdd: S.optional(AccountIdList),
    AccountIdsToRemove: S.optional(AccountIdList),
    SharedDocumentVersion: S.optional(S.String),
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
  identifier: "ModifyDocumentPermissionRequest",
}) as any as S.Schema<ModifyDocumentPermissionRequest>;
export interface ModifyDocumentPermissionResponse {}
export const ModifyDocumentPermissionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ModifyDocumentPermissionResponse",
}) as any as S.Schema<ModifyDocumentPermissionResponse>;
export interface ComplianceItemEntry {
  Id?: string;
  Title?: string;
  Severity: ComplianceSeverity;
  Status: ComplianceStatus;
  Details?: { [key: string]: string | undefined };
}
export const ComplianceItemEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Title: S.optional(S.String),
    Severity: ComplianceSeverity,
    Status: ComplianceStatus,
    Details: S.optional(ComplianceItemDetails),
  }),
).annotate({
  identifier: "ComplianceItemEntry",
}) as any as S.Schema<ComplianceItemEntry>;
export type ComplianceItemEntryList = ComplianceItemEntry[];
export const ComplianceItemEntryList =
  /*@__PURE__*/ S.Array(ComplianceItemEntry);
export type ComplianceItemContentHash = string;
export type ComplianceUploadType = "COMPLETE" | "PARTIAL" | (string & {});
export const ComplianceUploadType = S.String;

export interface PutComplianceItemsRequest {
  ResourceId: string;
  ResourceType: string;
  ComplianceType: string;
  ExecutionSummary: ComplianceExecutionSummary;
  Items: ComplianceItemEntry[];
  ItemContentHash?: string;
  UploadType?: ComplianceUploadType;
}
export const PutComplianceItemsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.String,
    ResourceType: S.String,
    ComplianceType: S.String,
    ExecutionSummary: ComplianceExecutionSummary,
    Items: ComplianceItemEntryList,
    ItemContentHash: S.optional(S.String),
    UploadType: S.optional(ComplianceUploadType),
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
  identifier: "PutComplianceItemsRequest",
}) as any as S.Schema<PutComplianceItemsRequest>;
export interface PutComplianceItemsResult {}
export const PutComplianceItemsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutComplianceItemsResult",
}) as any as S.Schema<PutComplianceItemsResult>;
export type InventoryItemContentContext = { [key: string]: string | undefined };
export const InventoryItemContentContext = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface InventoryItem {
  TypeName: string;
  SchemaVersion: string;
  CaptureTime: string;
  ContentHash?: string;
  Content?: { [key: string]: string | undefined }[];
  Context?: { [key: string]: string | undefined };
}
export const InventoryItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TypeName: S.String,
    SchemaVersion: S.String,
    CaptureTime: S.String,
    ContentHash: S.optional(S.String),
    Content: S.optional(InventoryItemEntryList),
    Context: S.optional(InventoryItemContentContext),
  }),
).annotate({ identifier: "InventoryItem" }) as any as S.Schema<InventoryItem>;
export type InventoryItemList = InventoryItem[];
export const InventoryItemList = /*@__PURE__*/ S.Array(
  InventoryItem.pipe(T.XmlName("Item")).annotate({
    identifier: "InventoryItem",
  }),
);
export interface PutInventoryRequest {
  InstanceId: string;
  Items: InventoryItem[];
}
export const PutInventoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstanceId: S.String, Items: InventoryItemList }).pipe(
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
  identifier: "PutInventoryRequest",
}) as any as S.Schema<PutInventoryRequest>;
export type PutInventoryMessage = string;
export interface PutInventoryResult {
  Message?: string;
}
export const PutInventoryResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "PutInventoryResult",
}) as any as S.Schema<PutInventoryResult>;
export type ParameterPolicies = string;
export interface PutParameterRequest {
  Name: string;
  Description?: string;
  Value: string | redacted.Redacted<string>;
  Type?: ParameterType;
  KeyId?: string;
  Overwrite?: boolean;
  AllowedPattern?: string;
  Tags?: Tag[];
  Tier?: ParameterTier;
  Policies?: string;
  DataType?: string;
}
export const PutParameterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    Value: SensitiveString,
    Type: S.optional(ParameterType),
    KeyId: S.optional(S.String),
    Overwrite: S.optional(S.Boolean),
    AllowedPattern: S.optional(S.String),
    Tags: S.optional(TagList),
    Tier: S.optional(ParameterTier),
    Policies: S.optional(S.String),
    DataType: S.optional(S.String),
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
  identifier: "PutParameterRequest",
}) as any as S.Schema<PutParameterRequest>;
export interface PutParameterResult {
  Version?: number;
  Tier?: ParameterTier;
}
export const PutParameterResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Version: S.optional(S.Number),
    Tier: S.optional(ParameterTier),
  }).pipe(ns),
).annotate({
  identifier: "PutParameterResult",
}) as any as S.Schema<PutParameterResult>;
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  Policy: string;
  PolicyId?: string;
  PolicyHash?: string;
}
export const PutResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String,
    Policy: S.String,
    PolicyId: S.optional(S.String),
    PolicyHash: S.optional(S.String),
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
  identifier: "PutResourcePolicyRequest",
}) as any as S.Schema<PutResourcePolicyRequest>;
export interface PutResourcePolicyResponse {
  PolicyId?: string;
  PolicyHash?: string;
}
export const PutResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyId: S.optional(S.String),
    PolicyHash: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "PutResourcePolicyResponse",
}) as any as S.Schema<PutResourcePolicyResponse>;
export interface RegisterDefaultPatchBaselineRequest {
  BaselineId: string;
}
export const RegisterDefaultPatchBaselineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BaselineId: S.String }).pipe(
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
  identifier: "RegisterDefaultPatchBaselineRequest",
}) as any as S.Schema<RegisterDefaultPatchBaselineRequest>;
export interface RegisterDefaultPatchBaselineResult {
  BaselineId?: string;
}
export const RegisterDefaultPatchBaselineResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BaselineId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "RegisterDefaultPatchBaselineResult",
}) as any as S.Schema<RegisterDefaultPatchBaselineResult>;
export interface RegisterPatchBaselineForPatchGroupRequest {
  BaselineId: string;
  PatchGroup: string;
}
export const RegisterPatchBaselineForPatchGroupRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ BaselineId: S.String, PatchGroup: S.String }).pipe(
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
    identifier: "RegisterPatchBaselineForPatchGroupRequest",
  }) as any as S.Schema<RegisterPatchBaselineForPatchGroupRequest>;
export interface RegisterPatchBaselineForPatchGroupResult {
  BaselineId?: string;
  PatchGroup?: string;
}
export const RegisterPatchBaselineForPatchGroupResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      BaselineId: S.optional(S.String),
      PatchGroup: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "RegisterPatchBaselineForPatchGroupResult",
}) as any as S.Schema<RegisterPatchBaselineForPatchGroupResult>;
export interface RegisterTargetWithMaintenanceWindowRequest {
  WindowId: string;
  ResourceType: MaintenanceWindowResourceType;
  Targets: Target[];
  OwnerInformation?: string | redacted.Redacted<string>;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  ClientToken?: string;
}
export const RegisterTargetWithMaintenanceWindowRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      WindowId: S.String,
      ResourceType: MaintenanceWindowResourceType,
      Targets: Targets,
      OwnerInformation: S.optional(SensitiveString),
      Name: S.optional(S.String),
      Description: S.optional(SensitiveString),
      ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
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
    identifier: "RegisterTargetWithMaintenanceWindowRequest",
  }) as any as S.Schema<RegisterTargetWithMaintenanceWindowRequest>;
export interface RegisterTargetWithMaintenanceWindowResult {
  WindowTargetId?: string;
}
export const RegisterTargetWithMaintenanceWindowResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ WindowTargetId: S.optional(S.String) }).pipe(ns),
  ).annotate({
    identifier: "RegisterTargetWithMaintenanceWindowResult",
  }) as any as S.Schema<RegisterTargetWithMaintenanceWindowResult>;
export interface RegisterTaskWithMaintenanceWindowRequest {
  WindowId: string;
  Targets?: Target[];
  TaskArn: string;
  ServiceRoleArn?: string;
  TaskType: MaintenanceWindowTaskType;
  TaskParameters?: {
    [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined;
  };
  TaskInvocationParameters?: MaintenanceWindowTaskInvocationParameters;
  Priority?: number;
  MaxConcurrency?: string;
  MaxErrors?: string;
  LoggingInfo?: LoggingInfo;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  ClientToken?: string;
  CutoffBehavior?: MaintenanceWindowTaskCutoffBehavior;
  AlarmConfiguration?: AlarmConfiguration;
}
export const RegisterTaskWithMaintenanceWindowRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      WindowId: S.String,
      Targets: S.optional(Targets),
      TaskArn: S.String,
      ServiceRoleArn: S.optional(S.String),
      TaskType: MaintenanceWindowTaskType,
      TaskParameters: S.optional(MaintenanceWindowTaskParameters),
      TaskInvocationParameters: S.optional(
        MaintenanceWindowTaskInvocationParameters,
      ),
      Priority: S.optional(S.Number),
      MaxConcurrency: S.optional(S.String),
      MaxErrors: S.optional(S.String),
      LoggingInfo: S.optional(LoggingInfo),
      Name: S.optional(S.String),
      Description: S.optional(SensitiveString),
      ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      CutoffBehavior: S.optional(MaintenanceWindowTaskCutoffBehavior),
      AlarmConfiguration: S.optional(AlarmConfiguration),
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
  identifier: "RegisterTaskWithMaintenanceWindowRequest",
}) as any as S.Schema<RegisterTaskWithMaintenanceWindowRequest>;
export interface RegisterTaskWithMaintenanceWindowResult {
  WindowTaskId?: string;
}
export const RegisterTaskWithMaintenanceWindowResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ WindowTaskId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "RegisterTaskWithMaintenanceWindowResult",
}) as any as S.Schema<RegisterTaskWithMaintenanceWindowResult>;
export type KeyList = string[];
export const KeyList = /*@__PURE__*/ S.Array(S.String);
export interface RemoveTagsFromResourceRequest {
  ResourceType: ResourceTypeForTagging;
  ResourceId: string;
  TagKeys: string[];
}
export const RemoveTagsFromResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceType: ResourceTypeForTagging,
    ResourceId: S.String,
    TagKeys: KeyList,
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
  identifier: "RemoveTagsFromResourceRequest",
}) as any as S.Schema<RemoveTagsFromResourceRequest>;
export interface RemoveTagsFromResourceResult {}
export const RemoveTagsFromResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RemoveTagsFromResourceResult",
}) as any as S.Schema<RemoveTagsFromResourceResult>;
export interface ResetServiceSettingRequest {
  SettingId: string;
}
export const ResetServiceSettingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SettingId: S.String }).pipe(
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
  identifier: "ResetServiceSettingRequest",
}) as any as S.Schema<ResetServiceSettingRequest>;
export interface ResetServiceSettingResult {
  ServiceSetting?: ServiceSetting;
}
export const ResetServiceSettingResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceSetting: S.optional(ServiceSetting) }).pipe(ns),
).annotate({
  identifier: "ResetServiceSettingResult",
}) as any as S.Schema<ResetServiceSettingResult>;
export interface ResumeSessionRequest {
  SessionId: string;
}
export const ResumeSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SessionId: S.String }).pipe(
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
  identifier: "ResumeSessionRequest",
}) as any as S.Schema<ResumeSessionRequest>;
export type TokenValue = string;
export type StreamUrl = string;
export interface ResumeSessionResponse {
  SessionId?: string;
  TokenValue?: string;
  StreamUrl?: string;
}
export const ResumeSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionId: S.optional(S.String),
    TokenValue: S.optional(S.String),
    StreamUrl: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ResumeSessionResponse",
}) as any as S.Schema<ResumeSessionResponse>;
export type SignalType =
  | "Approve"
  | "Reject"
  | "StartStep"
  | "StopStep"
  | "Resume"
  | "Revoke"
  | (string & {});
export const SignalType = S.String;

export interface SendAutomationSignalRequest {
  AutomationExecutionId: string;
  SignalType: SignalType;
  Payload?: { [key: string]: string[] | undefined };
}
export const SendAutomationSignalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutomationExecutionId: S.String,
    SignalType: SignalType,
    Payload: S.optional(AutomationParameterMap),
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
  identifier: "SendAutomationSignalRequest",
}) as any as S.Schema<SendAutomationSignalRequest>;
export interface SendAutomationSignalResult {}
export const SendAutomationSignalResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "SendAutomationSignalResult",
}) as any as S.Schema<SendAutomationSignalResult>;
export interface SendCommandRequest {
  InstanceIds?: string[];
  Targets?: Target[];
  DocumentName: string;
  DocumentVersion?: string;
  DocumentHash?: string;
  DocumentHashType?: DocumentHashType;
  TimeoutSeconds?: number;
  Comment?: string;
  Parameters?: { [key: string]: string[] | undefined };
  OutputS3Region?: string;
  OutputS3BucketName?: string;
  OutputS3KeyPrefix?: string;
  MaxConcurrency?: string;
  MaxErrors?: string;
  ServiceRoleArn?: string;
  NotificationConfig?: NotificationConfig;
  CloudWatchOutputConfig?: CloudWatchOutputConfig;
  AlarmConfiguration?: AlarmConfiguration;
}
export const SendCommandRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceIds: S.optional(InstanceIdList),
    Targets: S.optional(Targets),
    DocumentName: S.String,
    DocumentVersion: S.optional(S.String),
    DocumentHash: S.optional(S.String),
    DocumentHashType: S.optional(DocumentHashType),
    TimeoutSeconds: S.optional(S.Number),
    Comment: S.optional(S.String),
    Parameters: S.optional(Parameters),
    OutputS3Region: S.optional(S.String),
    OutputS3BucketName: S.optional(S.String),
    OutputS3KeyPrefix: S.optional(S.String),
    MaxConcurrency: S.optional(S.String),
    MaxErrors: S.optional(S.String),
    ServiceRoleArn: S.optional(S.String),
    NotificationConfig: S.optional(NotificationConfig),
    CloudWatchOutputConfig: S.optional(CloudWatchOutputConfig),
    AlarmConfiguration: S.optional(AlarmConfiguration),
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
  identifier: "SendCommandRequest",
}) as any as S.Schema<SendCommandRequest>;
export interface SendCommandResult {
  Command?: Command;
}
export const SendCommandResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Command: S.optional(Command) }).pipe(ns),
).annotate({
  identifier: "SendCommandResult",
}) as any as S.Schema<SendCommandResult>;
export type String1to256 = string;
export interface StartAccessRequestRequest {
  Reason: string;
  Targets: Target[];
  Tags?: Tag[];
}
export const StartAccessRequestRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Reason: S.String,
    Targets: Targets,
    Tags: S.optional(TagList),
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
  identifier: "StartAccessRequestRequest",
}) as any as S.Schema<StartAccessRequestRequest>;
export interface StartAccessRequestResponse {
  AccessRequestId?: string;
}
export const StartAccessRequestResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccessRequestId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StartAccessRequestResponse",
}) as any as S.Schema<StartAccessRequestResponse>;
export type AssociationIdList = string[];
export const AssociationIdList = /*@__PURE__*/ S.Array(S.String);
export interface StartAssociationsOnceRequest {
  AssociationIds: string[];
}
export const StartAssociationsOnceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AssociationIds: AssociationIdList }).pipe(
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
  identifier: "StartAssociationsOnceRequest",
}) as any as S.Schema<StartAssociationsOnceRequest>;
export interface StartAssociationsOnceResult {}
export const StartAssociationsOnceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "StartAssociationsOnceResult",
}) as any as S.Schema<StartAssociationsOnceResult>;
export type IdempotencyToken = string;
export interface StartAutomationExecutionRequest {
  DocumentName: string;
  DocumentVersion?: string;
  Parameters?: { [key: string]: string[] | undefined };
  ClientToken?: string;
  Mode?: ExecutionMode;
  TargetParameterName?: string;
  Targets?: Target[];
  TargetMaps?: { [key: string]: string[] | undefined }[];
  MaxConcurrency?: string;
  MaxErrors?: string;
  TargetLocations?: TargetLocation[];
  Tags?: Tag[];
  AlarmConfiguration?: AlarmConfiguration;
  TargetLocationsURL?: string;
}
export const StartAutomationExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DocumentName: S.String,
    DocumentVersion: S.optional(S.String),
    Parameters: S.optional(AutomationParameterMap),
    ClientToken: S.optional(S.String),
    Mode: S.optional(ExecutionMode),
    TargetParameterName: S.optional(S.String),
    Targets: S.optional(AutomationTargets),
    TargetMaps: S.optional(TargetMaps),
    MaxConcurrency: S.optional(S.String),
    MaxErrors: S.optional(S.String),
    TargetLocations: S.optional(TargetLocations),
    Tags: S.optional(TagList),
    AlarmConfiguration: S.optional(AlarmConfiguration),
    TargetLocationsURL: S.optional(S.String),
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
  identifier: "StartAutomationExecutionRequest",
}) as any as S.Schema<StartAutomationExecutionRequest>;
export interface StartAutomationExecutionResult {
  AutomationExecutionId?: string;
}
export const StartAutomationExecutionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AutomationExecutionId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StartAutomationExecutionResult",
}) as any as S.Schema<StartAutomationExecutionResult>;
export type ChangeDetailsValue = string;
export interface StartChangeRequestExecutionRequest {
  ScheduledTime?: Date;
  DocumentName: string;
  DocumentVersion?: string;
  Parameters?: { [key: string]: string[] | undefined };
  ChangeRequestName?: string;
  ClientToken?: string;
  AutoApprove?: boolean;
  Runbooks: Runbook[];
  Tags?: Tag[];
  ScheduledEndTime?: Date;
  ChangeDetails?: string;
}
export const StartChangeRequestExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScheduledTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DocumentName: S.String,
    DocumentVersion: S.optional(S.String),
    Parameters: S.optional(AutomationParameterMap),
    ChangeRequestName: S.optional(S.String),
    ClientToken: S.optional(S.String),
    AutoApprove: S.optional(S.Boolean),
    Runbooks: Runbooks,
    Tags: S.optional(TagList),
    ScheduledEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ChangeDetails: S.optional(S.String),
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
  identifier: "StartChangeRequestExecutionRequest",
}) as any as S.Schema<StartChangeRequestExecutionRequest>;
export interface StartChangeRequestExecutionResult {
  AutomationExecutionId?: string;
}
export const StartChangeRequestExecutionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AutomationExecutionId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StartChangeRequestExecutionResult",
}) as any as S.Schema<StartChangeRequestExecutionResult>;
export interface AutomationExecutionInputs {
  Parameters?: { [key: string]: string[] | undefined };
  TargetParameterName?: string;
  Targets?: Target[];
  TargetMaps?: { [key: string]: string[] | undefined }[];
  TargetLocations?: TargetLocation[];
  TargetLocationsURL?: string;
}
export const AutomationExecutionInputs = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Parameters: S.optional(AutomationParameterMap),
    TargetParameterName: S.optional(S.String),
    Targets: S.optional(AutomationTargets),
    TargetMaps: S.optional(TargetMaps),
    TargetLocations: S.optional(TargetLocations),
    TargetLocationsURL: S.optional(S.String),
  }),
).annotate({
  identifier: "AutomationExecutionInputs",
}) as any as S.Schema<AutomationExecutionInputs>;
export type ExecutionInputs = { Automation: AutomationExecutionInputs };
export const ExecutionInputs = /*@__PURE__*/ S.Union([
  S.Struct({ Automation: AutomationExecutionInputs }),
]);
export interface StartExecutionPreviewRequest {
  DocumentName: string;
  DocumentVersion?: string;
  ExecutionInputs?: ExecutionInputs;
}
export const StartExecutionPreviewRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DocumentName: S.String,
    DocumentVersion: S.optional(S.String),
    ExecutionInputs: S.optional(ExecutionInputs),
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
  identifier: "StartExecutionPreviewRequest",
}) as any as S.Schema<StartExecutionPreviewRequest>;
export interface StartExecutionPreviewResponse {
  ExecutionPreviewId?: string;
}
export const StartExecutionPreviewResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExecutionPreviewId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "StartExecutionPreviewResponse",
}) as any as S.Schema<StartExecutionPreviewResponse>;
export type SessionManagerParameterName = string;
export type SessionManagerParameterValue = string;
export type SessionManagerParameterValueList = string[];
export const SessionManagerParameterValueList = /*@__PURE__*/ S.Array(S.String);
export type SessionManagerParameters = { [key: string]: string[] | undefined };
export const SessionManagerParameters = /*@__PURE__*/ S.Record(
  S.String,
  SessionManagerParameterValueList.pipe(S.optional),
);
export interface StartSessionRequest {
  Target: string;
  DocumentName?: string;
  Reason?: string;
  Parameters?: { [key: string]: string[] | undefined };
}
export const StartSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Target: S.String,
    DocumentName: S.optional(S.String),
    Reason: S.optional(S.String),
    Parameters: S.optional(SessionManagerParameters),
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
  identifier: "StartSessionRequest",
}) as any as S.Schema<StartSessionRequest>;
export interface StartSessionResponse {
  SessionId?: string;
  TokenValue?: string;
  StreamUrl?: string;
}
export const StartSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionId: S.optional(S.String),
    TokenValue: S.optional(S.String),
    StreamUrl: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "StartSessionResponse",
}) as any as S.Schema<StartSessionResponse>;
export type StopType = "Complete" | "Cancel" | (string & {});
export const StopType = S.String;

export interface StopAutomationExecutionRequest {
  AutomationExecutionId: string;
  Type?: StopType;
}
export const StopAutomationExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutomationExecutionId: S.String,
    Type: S.optional(StopType),
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
  identifier: "StopAutomationExecutionRequest",
}) as any as S.Schema<StopAutomationExecutionRequest>;
export interface StopAutomationExecutionResult {}
export const StopAutomationExecutionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "StopAutomationExecutionResult",
}) as any as S.Schema<StopAutomationExecutionResult>;
export interface TerminateSessionRequest {
  SessionId: string;
}
export const TerminateSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SessionId: S.String }).pipe(
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
  identifier: "TerminateSessionRequest",
}) as any as S.Schema<TerminateSessionRequest>;
export interface TerminateSessionResponse {
  SessionId?: string;
}
export const TerminateSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SessionId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "TerminateSessionResponse",
}) as any as S.Schema<TerminateSessionResponse>;
export interface UnlabelParameterVersionRequest {
  Name: string;
  ParameterVersion: number;
  Labels: string[];
}
export const UnlabelParameterVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    ParameterVersion: S.Number,
    Labels: ParameterLabelList,
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
  identifier: "UnlabelParameterVersionRequest",
}) as any as S.Schema<UnlabelParameterVersionRequest>;
export interface UnlabelParameterVersionResult {
  RemovedLabels?: string[];
  InvalidLabels?: string[];
}
export const UnlabelParameterVersionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RemovedLabels: S.optional(ParameterLabelList),
    InvalidLabels: S.optional(ParameterLabelList),
  }).pipe(ns),
).annotate({
  identifier: "UnlabelParameterVersionResult",
}) as any as S.Schema<UnlabelParameterVersionResult>;
export interface UpdateAssociationRequest {
  AssociationId: string;
  Parameters?: { [key: string]: string[] | undefined };
  DocumentVersion?: string;
  ScheduleExpression?: string;
  OutputLocation?: InstanceAssociationOutputLocation;
  Name?: string;
  Targets?: Target[];
  AssociationName?: string;
  AssociationVersion?: string;
  AutomationTargetParameterName?: string;
  MaxErrors?: string;
  MaxConcurrency?: string;
  ComplianceSeverity?: AssociationComplianceSeverity;
  SyncCompliance?: AssociationSyncCompliance;
  ApplyOnlyAtCronInterval?: boolean;
  CalendarNames?: string[];
  TargetLocations?: TargetLocation[];
  ScheduleOffset?: number;
  Duration?: number;
  TargetMaps?: { [key: string]: string[] | undefined }[];
  AlarmConfiguration?: AlarmConfiguration;
  AssociationDispatchAssumeRole?: string;
}
export const UpdateAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssociationId: S.String,
    Parameters: S.optional(Parameters),
    DocumentVersion: S.optional(S.String),
    ScheduleExpression: S.optional(S.String),
    OutputLocation: S.optional(InstanceAssociationOutputLocation),
    Name: S.optional(S.String),
    Targets: S.optional(Targets),
    AssociationName: S.optional(S.String),
    AssociationVersion: S.optional(S.String),
    AutomationTargetParameterName: S.optional(S.String),
    MaxErrors: S.optional(S.String),
    MaxConcurrency: S.optional(S.String),
    ComplianceSeverity: S.optional(AssociationComplianceSeverity),
    SyncCompliance: S.optional(AssociationSyncCompliance),
    ApplyOnlyAtCronInterval: S.optional(S.Boolean),
    CalendarNames: S.optional(CalendarNameOrARNList),
    TargetLocations: S.optional(TargetLocations),
    ScheduleOffset: S.optional(S.Number),
    Duration: S.optional(S.Number),
    TargetMaps: S.optional(TargetMaps),
    AlarmConfiguration: S.optional(AlarmConfiguration),
    AssociationDispatchAssumeRole: S.optional(S.String),
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
  identifier: "UpdateAssociationRequest",
}) as any as S.Schema<UpdateAssociationRequest>;
export interface UpdateAssociationResult {
  AssociationDescription?: AssociationDescription;
}
export const UpdateAssociationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AssociationDescription: S.optional(AssociationDescription) }).pipe(
    ns,
  ),
).annotate({
  identifier: "UpdateAssociationResult",
}) as any as S.Schema<UpdateAssociationResult>;
export interface UpdateAssociationStatusRequest {
  Name: string;
  InstanceId: string;
  AssociationStatus: AssociationStatus;
}
export const UpdateAssociationStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    InstanceId: S.String,
    AssociationStatus: AssociationStatus,
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
  identifier: "UpdateAssociationStatusRequest",
}) as any as S.Schema<UpdateAssociationStatusRequest>;
export interface UpdateAssociationStatusResult {
  AssociationDescription?: AssociationDescription;
}
export const UpdateAssociationStatusResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AssociationDescription: S.optional(AssociationDescription) }).pipe(
    ns,
  ),
).annotate({
  identifier: "UpdateAssociationStatusResult",
}) as any as S.Schema<UpdateAssociationStatusResult>;
export interface UpdateCloudConnectorRequest {
  CloudConnectorId: string;
  DisplayName?: string;
  Configuration?: CloudConnectorConfiguration;
  Description?: string;
}
export const UpdateCloudConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudConnectorId: S.String,
    DisplayName: S.optional(S.String),
    Configuration: S.optional(CloudConnectorConfiguration),
    Description: S.optional(S.String),
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
  identifier: "UpdateCloudConnectorRequest",
}) as any as S.Schema<UpdateCloudConnectorRequest>;
export interface UpdateCloudConnectorResult {
  CloudConnectorId?: string;
}
export const UpdateCloudConnectorResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CloudConnectorId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateCloudConnectorResult",
}) as any as S.Schema<UpdateCloudConnectorResult>;
export interface UpdateDocumentRequest {
  Content: string;
  Attachments?: AttachmentsSource[];
  Name: string;
  DisplayName?: string;
  VersionName?: string;
  DocumentVersion?: string;
  DocumentFormat?: DocumentFormat;
  TargetType?: string;
}
export const UpdateDocumentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Content: S.String,
    Attachments: S.optional(AttachmentsSourceList),
    Name: S.String,
    DisplayName: S.optional(S.String),
    VersionName: S.optional(S.String),
    DocumentVersion: S.optional(S.String),
    DocumentFormat: S.optional(DocumentFormat),
    TargetType: S.optional(S.String),
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
  identifier: "UpdateDocumentRequest",
}) as any as S.Schema<UpdateDocumentRequest>;
export interface UpdateDocumentResult {
  DocumentDescription?: DocumentDescription;
}
export const UpdateDocumentResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DocumentDescription: S.optional(DocumentDescription) }).pipe(ns),
).annotate({
  identifier: "UpdateDocumentResult",
}) as any as S.Schema<UpdateDocumentResult>;
export type DocumentVersionNumber = string;
export interface UpdateDocumentDefaultVersionRequest {
  Name: string;
  DocumentVersion: string;
}
export const UpdateDocumentDefaultVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, DocumentVersion: S.String }).pipe(
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
  identifier: "UpdateDocumentDefaultVersionRequest",
}) as any as S.Schema<UpdateDocumentDefaultVersionRequest>;
export interface DocumentDefaultVersionDescription {
  Name?: string;
  DefaultVersion?: string;
  DefaultVersionName?: string;
}
export const DocumentDefaultVersionDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    DefaultVersion: S.optional(S.String),
    DefaultVersionName: S.optional(S.String),
  }),
).annotate({
  identifier: "DocumentDefaultVersionDescription",
}) as any as S.Schema<DocumentDefaultVersionDescription>;
export interface UpdateDocumentDefaultVersionResult {
  Description?: DocumentDefaultVersionDescription;
}
export const UpdateDocumentDefaultVersionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Description: S.optional(DocumentDefaultVersionDescription) }).pipe(
    ns,
  ),
).annotate({
  identifier: "UpdateDocumentDefaultVersionResult",
}) as any as S.Schema<UpdateDocumentDefaultVersionResult>;
export type DocumentReviewAction =
  | "SendForReview"
  | "UpdateReview"
  | "Approve"
  | "Reject"
  | (string & {});
export const DocumentReviewAction = S.String;

export interface DocumentReviews {
  Action: DocumentReviewAction;
  Comment?: DocumentReviewCommentSource[];
}
export const DocumentReviews = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: DocumentReviewAction,
    Comment: S.optional(DocumentReviewCommentList),
  }),
).annotate({
  identifier: "DocumentReviews",
}) as any as S.Schema<DocumentReviews>;
export interface UpdateDocumentMetadataRequest {
  Name: string;
  DocumentVersion?: string;
  DocumentReviews: DocumentReviews;
}
export const UpdateDocumentMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    DocumentVersion: S.optional(S.String),
    DocumentReviews: DocumentReviews,
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
  identifier: "UpdateDocumentMetadataRequest",
}) as any as S.Schema<UpdateDocumentMetadataRequest>;
export interface UpdateDocumentMetadataResponse {}
export const UpdateDocumentMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateDocumentMetadataResponse",
}) as any as S.Schema<UpdateDocumentMetadataResponse>;
export interface UpdateMaintenanceWindowRequest {
  WindowId: string;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  StartDate?: string;
  EndDate?: string;
  Schedule?: string;
  ScheduleTimezone?: string;
  ScheduleOffset?: number;
  Duration?: number;
  Cutoff?: number;
  AllowUnassociatedTargets?: boolean;
  Enabled?: boolean;
  Replace?: boolean;
}
export const UpdateMaintenanceWindowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WindowId: S.String,
    Name: S.optional(S.String),
    Description: S.optional(SensitiveString),
    StartDate: S.optional(S.String),
    EndDate: S.optional(S.String),
    Schedule: S.optional(S.String),
    ScheduleTimezone: S.optional(S.String),
    ScheduleOffset: S.optional(S.Number),
    Duration: S.optional(S.Number),
    Cutoff: S.optional(S.Number),
    AllowUnassociatedTargets: S.optional(S.Boolean),
    Enabled: S.optional(S.Boolean),
    Replace: S.optional(S.Boolean),
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
  identifier: "UpdateMaintenanceWindowRequest",
}) as any as S.Schema<UpdateMaintenanceWindowRequest>;
export interface UpdateMaintenanceWindowResult {
  WindowId?: string;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  StartDate?: string;
  EndDate?: string;
  Schedule?: string;
  ScheduleTimezone?: string;
  ScheduleOffset?: number;
  Duration?: number;
  Cutoff?: number;
  AllowUnassociatedTargets?: boolean;
  Enabled?: boolean;
}
export const UpdateMaintenanceWindowResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WindowId: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(SensitiveString),
    StartDate: S.optional(S.String),
    EndDate: S.optional(S.String),
    Schedule: S.optional(S.String),
    ScheduleTimezone: S.optional(S.String),
    ScheduleOffset: S.optional(S.Number),
    Duration: S.optional(S.Number),
    Cutoff: S.optional(S.Number),
    AllowUnassociatedTargets: S.optional(S.Boolean),
    Enabled: S.optional(S.Boolean),
  }).pipe(ns),
).annotate({
  identifier: "UpdateMaintenanceWindowResult",
}) as any as S.Schema<UpdateMaintenanceWindowResult>;
export interface UpdateMaintenanceWindowTargetRequest {
  WindowId: string;
  WindowTargetId: string;
  Targets?: Target[];
  OwnerInformation?: string | redacted.Redacted<string>;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  Replace?: boolean;
}
export const UpdateMaintenanceWindowTargetRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      WindowId: S.String,
      WindowTargetId: S.String,
      Targets: S.optional(Targets),
      OwnerInformation: S.optional(SensitiveString),
      Name: S.optional(S.String),
      Description: S.optional(SensitiveString),
      Replace: S.optional(S.Boolean),
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
  identifier: "UpdateMaintenanceWindowTargetRequest",
}) as any as S.Schema<UpdateMaintenanceWindowTargetRequest>;
export interface UpdateMaintenanceWindowTargetResult {
  WindowId?: string;
  WindowTargetId?: string;
  Targets?: Target[];
  OwnerInformation?: string | redacted.Redacted<string>;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
}
export const UpdateMaintenanceWindowTargetResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WindowId: S.optional(S.String),
    WindowTargetId: S.optional(S.String),
    Targets: S.optional(Targets),
    OwnerInformation: S.optional(SensitiveString),
    Name: S.optional(S.String),
    Description: S.optional(SensitiveString),
  }).pipe(ns),
).annotate({
  identifier: "UpdateMaintenanceWindowTargetResult",
}) as any as S.Schema<UpdateMaintenanceWindowTargetResult>;
export interface UpdateMaintenanceWindowTaskRequest {
  WindowId: string;
  WindowTaskId: string;
  Targets?: Target[];
  TaskArn?: string;
  ServiceRoleArn?: string;
  TaskParameters?: {
    [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined;
  };
  TaskInvocationParameters?: MaintenanceWindowTaskInvocationParameters;
  Priority?: number;
  MaxConcurrency?: string;
  MaxErrors?: string;
  LoggingInfo?: LoggingInfo;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  Replace?: boolean;
  CutoffBehavior?: MaintenanceWindowTaskCutoffBehavior;
  AlarmConfiguration?: AlarmConfiguration;
}
export const UpdateMaintenanceWindowTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WindowId: S.String,
    WindowTaskId: S.String,
    Targets: S.optional(Targets),
    TaskArn: S.optional(S.String),
    ServiceRoleArn: S.optional(S.String),
    TaskParameters: S.optional(MaintenanceWindowTaskParameters),
    TaskInvocationParameters: S.optional(
      MaintenanceWindowTaskInvocationParameters,
    ),
    Priority: S.optional(S.Number),
    MaxConcurrency: S.optional(S.String),
    MaxErrors: S.optional(S.String),
    LoggingInfo: S.optional(LoggingInfo),
    Name: S.optional(S.String),
    Description: S.optional(SensitiveString),
    Replace: S.optional(S.Boolean),
    CutoffBehavior: S.optional(MaintenanceWindowTaskCutoffBehavior),
    AlarmConfiguration: S.optional(AlarmConfiguration),
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
  identifier: "UpdateMaintenanceWindowTaskRequest",
}) as any as S.Schema<UpdateMaintenanceWindowTaskRequest>;
export interface UpdateMaintenanceWindowTaskResult {
  WindowId?: string;
  WindowTaskId?: string;
  Targets?: Target[];
  TaskArn?: string;
  ServiceRoleArn?: string;
  TaskParameters?: {
    [key: string]: MaintenanceWindowTaskParameterValueExpression | undefined;
  };
  TaskInvocationParameters?: MaintenanceWindowTaskInvocationParameters;
  Priority?: number;
  MaxConcurrency?: string;
  MaxErrors?: string;
  LoggingInfo?: LoggingInfo;
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  CutoffBehavior?: MaintenanceWindowTaskCutoffBehavior;
  AlarmConfiguration?: AlarmConfiguration;
}
export const UpdateMaintenanceWindowTaskResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WindowId: S.optional(S.String),
    WindowTaskId: S.optional(S.String),
    Targets: S.optional(Targets),
    TaskArn: S.optional(S.String),
    ServiceRoleArn: S.optional(S.String),
    TaskParameters: S.optional(MaintenanceWindowTaskParameters),
    TaskInvocationParameters: S.optional(
      MaintenanceWindowTaskInvocationParameters,
    ),
    Priority: S.optional(S.Number),
    MaxConcurrency: S.optional(S.String),
    MaxErrors: S.optional(S.String),
    LoggingInfo: S.optional(LoggingInfo),
    Name: S.optional(S.String),
    Description: S.optional(SensitiveString),
    CutoffBehavior: S.optional(MaintenanceWindowTaskCutoffBehavior),
    AlarmConfiguration: S.optional(AlarmConfiguration),
  }).pipe(ns),
).annotate({
  identifier: "UpdateMaintenanceWindowTaskResult",
}) as any as S.Schema<UpdateMaintenanceWindowTaskResult>;
export interface UpdateManagedInstanceRoleRequest {
  InstanceId: string;
  IamRole: string;
}
export const UpdateManagedInstanceRoleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstanceId: S.String, IamRole: S.String }).pipe(
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
  identifier: "UpdateManagedInstanceRoleRequest",
}) as any as S.Schema<UpdateManagedInstanceRoleRequest>;
export interface UpdateManagedInstanceRoleResult {}
export const UpdateManagedInstanceRoleResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateManagedInstanceRoleResult",
}) as any as S.Schema<UpdateManagedInstanceRoleResult>;
export type OpsItemOpsDataKeysList = string[];
export const OpsItemOpsDataKeysList = /*@__PURE__*/ S.Array(S.String);
export interface UpdateOpsItemRequest {
  Description?: string;
  OperationalData?: { [key: string]: OpsItemDataValue | undefined };
  OperationalDataToDelete?: string[];
  Notifications?: OpsItemNotification[];
  Priority?: number;
  RelatedOpsItems?: RelatedOpsItem[];
  Status?: OpsItemStatus;
  OpsItemId: string;
  Title?: string;
  Category?: string;
  Severity?: string;
  ActualStartTime?: Date;
  ActualEndTime?: Date;
  PlannedStartTime?: Date;
  PlannedEndTime?: Date;
  OpsItemArn?: string;
}
export const UpdateOpsItemRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    OperationalData: S.optional(OpsItemOperationalData),
    OperationalDataToDelete: S.optional(OpsItemOpsDataKeysList),
    Notifications: S.optional(OpsItemNotifications),
    Priority: S.optional(S.Number),
    RelatedOpsItems: S.optional(RelatedOpsItems),
    Status: S.optional(OpsItemStatus),
    OpsItemId: S.String,
    Title: S.optional(S.String),
    Category: S.optional(S.String),
    Severity: S.optional(S.String),
    ActualStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ActualEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    PlannedStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    PlannedEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    OpsItemArn: S.optional(S.String),
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
  identifier: "UpdateOpsItemRequest",
}) as any as S.Schema<UpdateOpsItemRequest>;
export interface UpdateOpsItemResponse {}
export const UpdateOpsItemResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateOpsItemResponse",
}) as any as S.Schema<UpdateOpsItemResponse>;
export type MetadataKeysToDeleteList = string[];
export const MetadataKeysToDeleteList = /*@__PURE__*/ S.Array(S.String);
export interface UpdateOpsMetadataRequest {
  OpsMetadataArn: string;
  MetadataToUpdate?: { [key: string]: MetadataValue | undefined };
  KeysToDelete?: string[];
}
export const UpdateOpsMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OpsMetadataArn: S.String,
    MetadataToUpdate: S.optional(MetadataMap),
    KeysToDelete: S.optional(MetadataKeysToDeleteList),
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
  identifier: "UpdateOpsMetadataRequest",
}) as any as S.Schema<UpdateOpsMetadataRequest>;
export interface UpdateOpsMetadataResult {
  OpsMetadataArn?: string;
}
export const UpdateOpsMetadataResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OpsMetadataArn: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "UpdateOpsMetadataResult",
}) as any as S.Schema<UpdateOpsMetadataResult>;
export interface UpdatePatchBaselineRequest {
  BaselineId: string;
  Name?: string;
  GlobalFilters?: PatchFilterGroup;
  ApprovalRules?: PatchRuleGroup;
  ApprovedPatches?: string[];
  ApprovedPatchesComplianceLevel?: PatchComplianceLevel;
  ApprovedPatchesEnableNonSecurity?: boolean;
  RejectedPatches?: string[];
  RejectedPatchesAction?: PatchAction;
  Description?: string;
  Sources?: PatchSource[];
  AvailableSecurityUpdatesComplianceStatus?: PatchComplianceStatus;
  Replace?: boolean;
}
export const UpdatePatchBaselineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BaselineId: S.String,
    Name: S.optional(S.String),
    GlobalFilters: S.optional(PatchFilterGroup),
    ApprovalRules: S.optional(PatchRuleGroup),
    ApprovedPatches: S.optional(PatchIdList),
    ApprovedPatchesComplianceLevel: S.optional(PatchComplianceLevel),
    ApprovedPatchesEnableNonSecurity: S.optional(S.Boolean),
    RejectedPatches: S.optional(PatchIdList),
    RejectedPatchesAction: S.optional(PatchAction),
    Description: S.optional(S.String),
    Sources: S.optional(PatchSourceList),
    AvailableSecurityUpdatesComplianceStatus: S.optional(PatchComplianceStatus),
    Replace: S.optional(S.Boolean),
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
  identifier: "UpdatePatchBaselineRequest",
}) as any as S.Schema<UpdatePatchBaselineRequest>;
export interface UpdatePatchBaselineResult {
  BaselineId?: string;
  Name?: string;
  OperatingSystem?: OperatingSystem;
  GlobalFilters?: PatchFilterGroup;
  ApprovalRules?: PatchRuleGroup;
  ApprovedPatches?: string[];
  ApprovedPatchesComplianceLevel?: PatchComplianceLevel;
  ApprovedPatchesEnableNonSecurity?: boolean;
  RejectedPatches?: string[];
  RejectedPatchesAction?: PatchAction;
  CreatedDate?: Date;
  ModifiedDate?: Date;
  Description?: string;
  Sources?: PatchSource[];
  AvailableSecurityUpdatesComplianceStatus?: PatchComplianceStatus;
}
export const UpdatePatchBaselineResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BaselineId: S.optional(S.String),
    Name: S.optional(S.String),
    OperatingSystem: S.optional(OperatingSystem),
    GlobalFilters: S.optional(PatchFilterGroup),
    ApprovalRules: S.optional(PatchRuleGroup),
    ApprovedPatches: S.optional(PatchIdList),
    ApprovedPatchesComplianceLevel: S.optional(PatchComplianceLevel),
    ApprovedPatchesEnableNonSecurity: S.optional(S.Boolean),
    RejectedPatches: S.optional(PatchIdList),
    RejectedPatchesAction: S.optional(PatchAction),
    CreatedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ModifiedDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Description: S.optional(S.String),
    Sources: S.optional(PatchSourceList),
    AvailableSecurityUpdatesComplianceStatus: S.optional(PatchComplianceStatus),
  }).pipe(ns),
).annotate({
  identifier: "UpdatePatchBaselineResult",
}) as any as S.Schema<UpdatePatchBaselineResult>;
export interface UpdateResourceDataSyncRequest {
  SyncName: string;
  SyncType: string;
  SyncSource: ResourceDataSyncSource;
}
export const UpdateResourceDataSyncRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SyncName: S.String,
    SyncType: S.String,
    SyncSource: ResourceDataSyncSource,
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
  identifier: "UpdateResourceDataSyncRequest",
}) as any as S.Schema<UpdateResourceDataSyncRequest>;
export interface UpdateResourceDataSyncResult {}
export const UpdateResourceDataSyncResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateResourceDataSyncResult",
}) as any as S.Schema<UpdateResourceDataSyncResult>;
export interface UpdateServiceSettingRequest {
  SettingId: string;
  SettingValue: string;
}
export const UpdateServiceSettingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SettingId: S.String, SettingValue: S.String }).pipe(
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
  identifier: "UpdateServiceSettingRequest",
}) as any as S.Schema<UpdateServiceSettingRequest>;
export interface UpdateServiceSettingResult {}
export const UpdateServiceSettingResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateServiceSettingResult",
}) as any as S.Schema<UpdateServiceSettingResult>;
export type ValidateCloudConnectorMaxResults = number;
export interface ValidateCloudConnectorRequest {
  CloudConnectorId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ValidateCloudConnectorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudConnectorId: S.String,
    MaxResults: S.optional(S.Number),
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
  identifier: "ValidateCloudConnectorRequest",
}) as any as S.Schema<ValidateCloudConnectorRequest>;
export type ValidationFindingType = "INFO" | "WARN" | "ERROR" | (string & {});
export const ValidationFindingType = S.String;

export type ValidationFindingCode =
  | "TargetInaccessible"
  | "TargetUnusable"
  | "TargetStateWarning"
  | "AwsRoleAssumptionFailed"
  | "WebIdentityTokenFailed"
  | "OutboundWebIdentityFederationDisabled"
  | "ProviderCredentialCreationFailed"
  | "TenantSummary"
  | "SubscriptionAccessible"
  | (string & {});
export const ValidationFindingCode = S.String;

export type ValidationFindingScopeType =
  | "azure:tenant"
  | "azure:subscription"
  | (string & {});
export const ValidationFindingScopeType = S.String;

export interface ValidationFindingScope {
  Type?: ValidationFindingScopeType;
  Id?: string;
}
export const ValidationFindingScope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(ValidationFindingScopeType),
    Id: S.optional(S.String),
  }),
).annotate({
  identifier: "ValidationFindingScope",
}) as any as S.Schema<ValidationFindingScope>;
export interface ValidationFinding {
  Type?: ValidationFindingType;
  Code?: ValidationFindingCode;
  Message?: string;
  ProviderMessage?: string;
  Scope?: ValidationFindingScope;
}
export const ValidationFinding = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(ValidationFindingType),
    Code: S.optional(ValidationFindingCode),
    Message: S.optional(S.String),
    ProviderMessage: S.optional(S.String),
    Scope: S.optional(ValidationFindingScope),
  }),
).annotate({
  identifier: "ValidationFinding",
}) as any as S.Schema<ValidationFinding>;
export type ValidationFindingList = ValidationFinding[];
export const ValidationFindingList = /*@__PURE__*/ S.Array(ValidationFinding);
export interface ValidateCloudConnectorResult {
  ValidationFindings?: ValidationFinding[];
  NextToken?: string;
}
export const ValidateCloudConnectorResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ValidationFindings: S.optional(ValidationFindingList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ValidateCloudConnectorResult",
}) as any as S.Schema<ValidateCloudConnectorResult>;
export type OpsItemParameterNamesList = string[];
export const OpsItemParameterNamesList = /*@__PURE__*/ S.Array(S.String);
export type ResourcePolicyParameterNamesList = string[];
export const ResourcePolicyParameterNamesList = /*@__PURE__*/ S.Array(S.String);
export type AddTagsToResourceError =
  | InternalServerError
  | InvalidResourceId
  | InvalidResourceType
  | TooManyTagsError
  | TooManyUpdates
  | CommonErrors;
/**
 * Adds or overwrites one or more tags for the specified resource. *Tags*
 * are metadata that you can assign to your automations, documents, managed nodes, maintenance
 * windows, Parameter Store parameters, and patch baselines. Tags enable you to categorize your
 * resources in different ways, for example, by purpose, owner, or environment. Each tag consists of
 * a key and an optional value, both of which you define. For example, you could define a set of
 * tags for your account's managed nodes that helps you track each node's owner and stack level. For
 * example:
 *
 * - `Key=Owner,Value=DbAdmin`
 *
 * - `Key=Owner,Value=SysAdmin`
 *
 * - `Key=Owner,Value=Dev`
 *
 * - `Key=Stack,Value=Production`
 *
 * - `Key=Stack,Value=Pre-Production`
 *
 * - `Key=Stack,Value=Test`
 *
 * Most resources can have a maximum of 50 tags. Automations can have a maximum of 5
 * tags.
 *
 * We recommend that you devise a set of tag keys that meets your needs for each resource type.
 * Using a consistent set of tag keys makes it easier for you to manage your resources. You can
 * search and filter the resources based on the tags you add. Tags don't have any semantic meaning
 * to and are interpreted strictly as a string of characters.
 *
 * For more information about using tags with Amazon Elastic Compute Cloud (Amazon EC2) instances, see Tag your Amazon EC2
 * resources in the *Amazon EC2 User Guide*.
 */
export const addTagsToResource: API.OperationMethod<
  AddTagsToResourceRequest,
  AddTagsToResourceResult,
  AddTagsToResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddTagsToResourceRequest,
  output: AddTagsToResourceResult,
  errors: [
    InternalServerError,
    InvalidResourceId,
    InvalidResourceType,
    TooManyTagsError,
    TooManyUpdates,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTagsToResource",
}));

export type AssociateOpsItemRelatedItemError =
  | InternalServerError
  | OpsItemConflictException
  | OpsItemInvalidParameterException
  | OpsItemLimitExceededException
  | OpsItemNotFoundException
  | OpsItemRelatedItemAlreadyExistsException
  | CommonErrors;
/**
 * Associates a related item to a Systems Manager OpsCenter OpsItem. For example, you can associate an
 * Incident Manager incident or analysis with an OpsItem. Incident Manager and OpsCenter are tools in
 * Amazon Web Services Systems Manager.
 */
export const associateOpsItemRelatedItem: API.OperationMethod<
  AssociateOpsItemRelatedItemRequest,
  AssociateOpsItemRelatedItemResponse,
  AssociateOpsItemRelatedItemError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateOpsItemRelatedItemRequest,
  output: AssociateOpsItemRelatedItemResponse,
  errors: [
    InternalServerError,
    OpsItemConflictException,
    OpsItemInvalidParameterException,
    OpsItemLimitExceededException,
    OpsItemNotFoundException,
    OpsItemRelatedItemAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateOpsItemRelatedItem",
}));

export type CancelCommandError =
  | DuplicateInstanceId
  | InternalServerError
  | InvalidCommandId
  | InvalidInstanceId
  | CommonErrors;
/**
 * Attempts to cancel the command specified by the Command ID. There is no guarantee that the
 * command will be terminated and the underlying process stopped.
 */
export const cancelCommand: API.OperationMethod<
  CancelCommandRequest,
  CancelCommandResult,
  CancelCommandError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelCommandRequest,
  output: CancelCommandResult,
  errors: [
    DuplicateInstanceId,
    InternalServerError,
    InvalidCommandId,
    InvalidInstanceId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelCommand",
}));

export type CancelMaintenanceWindowExecutionError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Stops a maintenance window execution that is already in progress and cancels any tasks in
 * the window that haven't already starting running. Tasks already in progress will continue to
 * completion.
 */
export const cancelMaintenanceWindowExecution: API.OperationMethod<
  CancelMaintenanceWindowExecutionRequest,
  CancelMaintenanceWindowExecutionResult,
  CancelMaintenanceWindowExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelMaintenanceWindowExecutionRequest,
  output: CancelMaintenanceWindowExecutionResult,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMaintenanceWindowExecution",
}));

export type CreateActivationError =
  | InternalServerError
  | InvalidParameters
  | CommonErrors;
/**
 * Generates an activation code and activation ID you can use to register your on-premises
 * servers, edge devices, or virtual machine (VM) with Amazon Web Services Systems Manager. Registering these machines with
 * Systems Manager makes it possible to manage them using Systems Manager tools. You use the activation code and ID when
 * installing SSM Agent on machines in your hybrid environment. For more information about
 * requirements for managing on-premises machines using Systems Manager, see Using Amazon Web Services Systems Manager in
 * hybrid and multicloud environments in the *Amazon Web Services Systems Manager User Guide*.
 *
 * Amazon Elastic Compute Cloud (Amazon EC2) instances, edge devices, and on-premises servers and VMs that are
 * configured for Systems Manager are all called *managed nodes*.
 */
export const createActivation: API.OperationMethod<
  CreateActivationRequest,
  CreateActivationResult,
  CreateActivationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateActivationRequest,
  output: CreateActivationResult,
  errors: [InternalServerError, InvalidParameters],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateActivation",
}));

export type CreateAssociationError =
  | AssociationAlreadyExists
  | AssociationLimitExceeded
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentVersion
  | InvalidInstanceId
  | InvalidOutputLocation
  | InvalidParameters
  | InvalidSchedule
  | InvalidTag
  | InvalidTarget
  | InvalidTargetMaps
  | UnsupportedPlatformType
  | CommonErrors;
/**
 * A State Manager association defines the state that you want to maintain on your managed
 * nodes. For example, an association can specify that anti-virus software must be installed and
 * running on your managed nodes, or that certain ports must be closed. For static targets, the
 * association specifies a schedule for when the configuration is reapplied. For dynamic targets,
 * such as an Amazon Web Services resource group or an Amazon Web Services autoscaling group, State Manager, a tool in Amazon Web Services Systems Manager
 * applies the configuration when new managed nodes are added to the group. The association also
 * specifies actions to take when applying the configuration. For example, an association for
 * anti-virus software might run once a day. If the software isn't installed, then State Manager
 * installs it. If the software is installed, but the service isn't running, then the association
 * might instruct State Manager to start the service.
 */
export const createAssociation: API.OperationMethod<
  CreateAssociationRequest,
  CreateAssociationResult,
  CreateAssociationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAssociationRequest,
  output: CreateAssociationResult,
  errors: [
    AssociationAlreadyExists,
    AssociationLimitExceeded,
    InternalServerError,
    InvalidDocument,
    InvalidDocumentVersion,
    InvalidInstanceId,
    InvalidOutputLocation,
    InvalidParameters,
    InvalidSchedule,
    InvalidTag,
    InvalidTarget,
    InvalidTargetMaps,
    UnsupportedPlatformType,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssociation",
}));

export type CreateAssociationBatchError =
  | AssociationLimitExceeded
  | DuplicateInstanceId
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentVersion
  | InvalidInstanceId
  | InvalidOutputLocation
  | InvalidParameters
  | InvalidSchedule
  | InvalidTarget
  | InvalidTargetMaps
  | UnsupportedPlatformType
  | CommonErrors;
/**
 * Associates the specified Amazon Web Services Systems Manager document (SSM document) with the specified managed nodes
 * or targets.
 *
 * When you associate a document with one or more managed nodes using IDs or tags, Amazon Web Services Systems Manager
 * Agent (SSM Agent) running on the managed node processes the document and configures the node as
 * specified.
 *
 * If you associate a document with a managed node that already has an associated document, the
 * system returns the AssociationAlreadyExists exception.
 */
export const createAssociationBatch: API.OperationMethod<
  CreateAssociationBatchRequest,
  CreateAssociationBatchResult,
  CreateAssociationBatchError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAssociationBatchRequest,
  output: CreateAssociationBatchResult,
  errors: [
    AssociationLimitExceeded,
    DuplicateInstanceId,
    InternalServerError,
    InvalidDocument,
    InvalidDocumentVersion,
    InvalidInstanceId,
    InvalidOutputLocation,
    InvalidParameters,
    InvalidSchedule,
    InvalidTarget,
    InvalidTargetMaps,
    UnsupportedPlatformType,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssociationBatch",
}));

export type CreateCloudConnectorError =
  | ConflictException
  | InternalServerError
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates a cloud connector that establishes a connection between Systems Manager and a third-party
 * cloud environment.
 */
export const createCloudConnector: API.OperationMethod<
  CreateCloudConnectorRequest,
  CreateCloudConnectorResult,
  CreateCloudConnectorError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCloudConnectorRequest,
  output: CreateCloudConnectorResult,
  errors: [
    ConflictException,
    InternalServerError,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCloudConnector",
}));

export type CreateDocumentError =
  | DocumentAlreadyExists
  | DocumentLimitExceeded
  | InternalServerError
  | InvalidDocumentContent
  | InvalidDocumentSchemaVersion
  | MaxDocumentSizeExceeded
  | NoLongerSupportedException
  | TooManyUpdates
  | CommonErrors;
/**
 * Creates a Amazon Web Services Systems Manager (SSM document). An SSM document defines the actions that Systems Manager performs
 * on your managed nodes. For more information about SSM documents, including information about
 * supported schemas, features, and syntax, see Amazon Web Services Systems Manager Documents in the
 * *Amazon Web Services Systems Manager User Guide*.
 */
export const createDocument: API.OperationMethod<
  CreateDocumentRequest,
  CreateDocumentResult,
  CreateDocumentError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDocumentRequest,
  output: CreateDocumentResult,
  errors: [
    DocumentAlreadyExists,
    DocumentLimitExceeded,
    InternalServerError,
    InvalidDocumentContent,
    InvalidDocumentSchemaVersion,
    MaxDocumentSizeExceeded,
    NoLongerSupportedException,
    TooManyUpdates,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDocument",
}));

export type CreateMaintenanceWindowError =
  | IdempotentParameterMismatch
  | InternalServerError
  | ResourceLimitExceededException
  | CommonErrors;
/**
 * Creates a new maintenance window.
 *
 * The value you specify for `Duration` determines the specific end time for the
 * maintenance window based on the time it begins. No maintenance window tasks are permitted to
 * start after the resulting endtime minus the number of hours you specify for `Cutoff`.
 * For example, if the maintenance window starts at 3 PM, the duration is three hours, and the
 * value you specify for `Cutoff` is one hour, no maintenance window tasks can start
 * after 5 PM.
 */
export const createMaintenanceWindow: API.OperationMethod<
  CreateMaintenanceWindowRequest,
  CreateMaintenanceWindowResult,
  CreateMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMaintenanceWindowRequest,
  output: CreateMaintenanceWindowResult,
  errors: [
    IdempotentParameterMismatch,
    InternalServerError,
    ResourceLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMaintenanceWindow",
}));

export type CreateOpsItemError =
  | InternalServerError
  | OpsItemAccessDeniedException
  | OpsItemAlreadyExistsException
  | OpsItemInvalidParameterException
  | OpsItemLimitExceededException
  | CommonErrors;
/**
 * Creates a new OpsItem. You must have permission in Identity and Access Management (IAM) to create a new OpsItem. For more information, see Set up OpsCenter in the
 * *Amazon Web Services Systems Manager User Guide*.
 *
 * Operations engineers and IT professionals use Amazon Web Services Systems Manager OpsCenter to view, investigate, and
 * remediate operational issues impacting the performance and health of their Amazon Web Services resources. For
 * more information, see Amazon Web Services Systems Manager OpsCenter in the
 * *Amazon Web Services Systems Manager User Guide*.
 */
export const createOpsItem: API.OperationMethod<
  CreateOpsItemRequest,
  CreateOpsItemResponse,
  CreateOpsItemError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateOpsItemRequest,
  output: CreateOpsItemResponse,
  errors: [
    InternalServerError,
    OpsItemAccessDeniedException,
    OpsItemAlreadyExistsException,
    OpsItemInvalidParameterException,
    OpsItemLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOpsItem",
}));

export type CreateOpsMetadataError =
  | InternalServerError
  | OpsMetadataAlreadyExistsException
  | OpsMetadataInvalidArgumentException
  | OpsMetadataLimitExceededException
  | OpsMetadataTooManyUpdatesException
  | CommonErrors;
/**
 * If you create a new application in Application Manager, Amazon Web Services Systems Manager calls this API operation to specify
 * information about the new application, including the application type.
 */
export const createOpsMetadata: API.OperationMethod<
  CreateOpsMetadataRequest,
  CreateOpsMetadataResult,
  CreateOpsMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateOpsMetadataRequest,
  output: CreateOpsMetadataResult,
  errors: [
    InternalServerError,
    OpsMetadataAlreadyExistsException,
    OpsMetadataInvalidArgumentException,
    OpsMetadataLimitExceededException,
    OpsMetadataTooManyUpdatesException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOpsMetadata",
}));

export type CreatePatchBaselineError =
  | IdempotentParameterMismatch
  | InternalServerError
  | ResourceLimitExceededException
  | CommonErrors;
/**
 * Creates a patch baseline.
 *
 * For information about valid key-value pairs in `PatchFilters` for each supported
 * operating system type, see PatchFilter.
 */
export const createPatchBaseline: API.OperationMethod<
  CreatePatchBaselineRequest,
  CreatePatchBaselineResult,
  CreatePatchBaselineError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePatchBaselineRequest,
  output: CreatePatchBaselineResult,
  errors: [
    IdempotentParameterMismatch,
    InternalServerError,
    ResourceLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePatchBaseline",
}));

export type CreateResourceDataSyncError =
  | InternalServerError
  | ResourceDataSyncAlreadyExistsException
  | ResourceDataSyncCountExceededException
  | ResourceDataSyncInvalidConfigurationException
  | CommonErrors;
/**
 * A resource data sync helps you view data from multiple sources in a single location.
 * Amazon Web Services Systems Manager offers two types of resource data sync: `SyncToDestination` and
 * `SyncFromSource`.
 *
 * You can configure Systems Manager Inventory to use the `SyncToDestination` type to
 * synchronize Inventory data from multiple Amazon Web Services Regions to a single Amazon Simple Storage Service (Amazon S3) bucket. For more information, see Creating a
 * resource data sync for Inventory in the *Amazon Web Services Systems Manager User Guide*.
 *
 * You can configure Systems Manager Explorer to use the `SyncFromSource` type to synchronize
 * operational work items (OpsItems) and operational data (OpsData) from multiple Amazon Web Services Regions to a
 * single Amazon S3 bucket. This type can synchronize OpsItems and OpsData from multiple
 * Amazon Web Services accounts and Amazon Web Services Regions or `EntireOrganization` by using Organizations. For more
 * information, see Setting up Systems Manager
 * Explorer to display data from multiple accounts and Regions in the
 * *Amazon Web Services Systems Manager User Guide*.
 *
 * A resource data sync is an asynchronous operation that returns immediately. After a
 * successful initial sync is completed, the system continuously syncs data. To check the status of
 * a sync, use the ListResourceDataSync.
 *
 * By default, data isn't encrypted in Amazon S3. We strongly recommend that you
 * enable encryption in Amazon S3 to ensure secure data storage. We also recommend that you
 * secure access to the Amazon S3 bucket by creating a restrictive bucket policy.
 */
export const createResourceDataSync: API.OperationMethod<
  CreateResourceDataSyncRequest,
  CreateResourceDataSyncResult,
  CreateResourceDataSyncError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateResourceDataSyncRequest,
  output: CreateResourceDataSyncResult,
  errors: [
    InternalServerError,
    ResourceDataSyncAlreadyExistsException,
    ResourceDataSyncCountExceededException,
    ResourceDataSyncInvalidConfigurationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceDataSync",
}));

export type DeleteActivationError =
  | InternalServerError
  | InvalidActivation
  | InvalidActivationId
  | TooManyUpdates
  | CommonErrors;
/**
 * Deletes an activation. You aren't required to delete an activation. If you delete an
 * activation, you can no longer use it to register additional managed nodes. Deleting an activation
 * doesn't de-register managed nodes. You must manually de-register managed nodes.
 */
export const deleteActivation: API.OperationMethod<
  DeleteActivationRequest,
  DeleteActivationResult,
  DeleteActivationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteActivationRequest,
  output: DeleteActivationResult,
  errors: [
    InternalServerError,
    InvalidActivation,
    InvalidActivationId,
    TooManyUpdates,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteActivation",
}));

export type DeleteAssociationError =
  | AssociationDoesNotExist
  | InternalServerError
  | InvalidDocument
  | InvalidInstanceId
  | TooManyUpdates
  | CommonErrors;
/**
 * Disassociates the specified Amazon Web Services Systems Manager document (SSM document) from the specified managed
 * node. If you created the association by using the `Targets` parameter, then you must
 * delete the association by using the association ID.
 *
 * When you disassociate a document from a managed node, it doesn't change the configuration of
 * the node. To change the configuration state of a managed node after you disassociate a document,
 * you must create a new document with the desired configuration and associate it with the
 * node.
 */
export const deleteAssociation: API.OperationMethod<
  DeleteAssociationRequest,
  DeleteAssociationResult,
  DeleteAssociationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAssociationRequest,
  output: DeleteAssociationResult,
  errors: [
    AssociationDoesNotExist,
    InternalServerError,
    InvalidDocument,
    InvalidInstanceId,
    TooManyUpdates,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssociation",
}));

export type DeleteCloudConnectorError =
  | ConflictException
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a cloud connector.
 */
export const deleteCloudConnector: API.OperationMethod<
  DeleteCloudConnectorRequest,
  DeleteCloudConnectorResult,
  DeleteCloudConnectorError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCloudConnectorRequest,
  output: DeleteCloudConnectorResult,
  errors: [ConflictException, InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCloudConnector",
}));

export type DeleteDocumentError =
  | AssociatedInstances
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentOperation
  | TooManyUpdates
  | CommonErrors;
/**
 * Deletes the Amazon Web Services Systems Manager document (SSM document) and all managed node associations to the
 * document.
 *
 * Before you delete the document, we recommend that you use DeleteAssociation to disassociate all managed nodes that are associated with the document.
 */
export const deleteDocument: API.OperationMethod<
  DeleteDocumentRequest,
  DeleteDocumentResult,
  DeleteDocumentError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDocumentRequest,
  output: DeleteDocumentResult,
  errors: [
    AssociatedInstances,
    InternalServerError,
    InvalidDocument,
    InvalidDocumentOperation,
    TooManyUpdates,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDocument",
}));

export type DeleteInventoryError =
  | InternalServerError
  | InvalidDeleteInventoryParametersException
  | InvalidInventoryRequestException
  | InvalidOptionException
  | InvalidTypeNameException
  | CommonErrors;
/**
 * Delete a custom inventory type or the data associated with a custom Inventory type. Deleting
 * a custom inventory type is also referred to as deleting a custom inventory schema.
 */
export const deleteInventory: API.OperationMethod<
  DeleteInventoryRequest,
  DeleteInventoryResult,
  DeleteInventoryError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInventoryRequest,
  output: DeleteInventoryResult,
  errors: [
    InternalServerError,
    InvalidDeleteInventoryParametersException,
    InvalidInventoryRequestException,
    InvalidOptionException,
    InvalidTypeNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInventory",
}));

export type DeleteMaintenanceWindowError = InternalServerError | CommonErrors;
/**
 * Deletes a maintenance window.
 */
export const deleteMaintenanceWindow: API.OperationMethod<
  DeleteMaintenanceWindowRequest,
  DeleteMaintenanceWindowResult,
  DeleteMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMaintenanceWindowRequest,
  output: DeleteMaintenanceWindowResult,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMaintenanceWindow",
}));

export type DeleteOpsItemError =
  | InternalServerError
  | OpsItemInvalidParameterException
  | CommonErrors;
/**
 * Delete an OpsItem. You must have permission in Identity and Access Management (IAM) to
 * delete an OpsItem.
 *
 * Note the following important information about this operation.
 *
 * - Deleting an OpsItem is irreversible. You can't restore a deleted OpsItem.
 *
 * - This operation uses an *eventual consistency model*, which means the
 * system can take a few minutes to complete this operation. If you delete an OpsItem and
 * immediately call, for example, GetOpsItem, the deleted OpsItem might still
 * appear in the response.
 *
 * - This operation is idempotent. The system doesn't throw an exception if you repeatedly
 * call this operation for the same OpsItem. If the first call is successful, all additional calls
 * return the same successful response as the first call.
 *
 * - This operation doesn't support cross-account calls. A delegated administrator or
 * management account can't delete OpsItems in other accounts, even if OpsCenter has been set up for
 * cross-account administration. For more information about cross-account administration, see
 * Setting up
 * OpsCenter to centrally manage OpsItems across accounts in the *Systems Manager User Guide*.
 */
export const deleteOpsItem: API.OperationMethod<
  DeleteOpsItemRequest,
  DeleteOpsItemResponse,
  DeleteOpsItemError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteOpsItemRequest,
  output: DeleteOpsItemResponse,
  errors: [InternalServerError, OpsItemInvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOpsItem",
}));

export type DeleteOpsMetadataError =
  | InternalServerError
  | OpsMetadataInvalidArgumentException
  | OpsMetadataNotFoundException
  | CommonErrors;
/**
 * Delete OpsMetadata related to an application.
 */
export const deleteOpsMetadata: API.OperationMethod<
  DeleteOpsMetadataRequest,
  DeleteOpsMetadataResult,
  DeleteOpsMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteOpsMetadataRequest,
  output: DeleteOpsMetadataResult,
  errors: [
    InternalServerError,
    OpsMetadataInvalidArgumentException,
    OpsMetadataNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOpsMetadata",
}));

export type DeleteParameterError =
  | InternalServerError
  | ParameterNotFound
  | CommonErrors;
/**
 * Delete a parameter from the system. After deleting a parameter, wait for at least 30 seconds
 * to create a parameter with the same name.
 */
export const deleteParameter: API.OperationMethod<
  DeleteParameterRequest,
  DeleteParameterResult,
  DeleteParameterError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteParameterRequest,
  output: DeleteParameterResult,
  errors: [InternalServerError, ParameterNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteParameter",
}));

export type DeleteParametersError = InternalServerError | CommonErrors;
/**
 * Delete a list of parameters. After deleting a parameter, wait for at least 30 seconds to
 * create a parameter with the same name.
 */
export const deleteParameters: API.OperationMethod<
  DeleteParametersRequest,
  DeleteParametersResult,
  DeleteParametersError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteParametersRequest,
  output: DeleteParametersResult,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteParameters",
}));

export type DeletePatchBaselineError =
  | InternalServerError
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes a patch baseline.
 */
export const deletePatchBaseline: API.OperationMethod<
  DeletePatchBaselineRequest,
  DeletePatchBaselineResult,
  DeletePatchBaselineError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePatchBaselineRequest,
  output: DeletePatchBaselineResult,
  errors: [InternalServerError, ResourceInUseException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePatchBaseline",
}));

export type DeleteResourceDataSyncError =
  | InternalServerError
  | ResourceDataSyncInvalidConfigurationException
  | ResourceDataSyncNotFoundException
  | CommonErrors;
/**
 * Deletes a resource data sync configuration. After the configuration is deleted, changes to
 * data on managed nodes are no longer synced to or from the target. Deleting a sync configuration
 * doesn't delete data.
 */
export const deleteResourceDataSync: API.OperationMethod<
  DeleteResourceDataSyncRequest,
  DeleteResourceDataSyncResult,
  DeleteResourceDataSyncError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourceDataSyncRequest,
  output: DeleteResourceDataSyncResult,
  errors: [
    InternalServerError,
    ResourceDataSyncInvalidConfigurationException,
    ResourceDataSyncNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceDataSync",
}));

export type DeleteResourcePolicyError =
  | InternalServerError
  | MalformedResourcePolicyDocumentException
  | ResourceNotFoundException
  | ResourcePolicyConflictException
  | ResourcePolicyInvalidParameterException
  | ResourcePolicyNotFoundException
  | CommonErrors;
/**
 * Deletes a Systems Manager resource policy. A resource policy helps you to define the IAM entity (for example, an Amazon Web Services account) that can manage your Systems Manager resources. The following
 * resources support Systems Manager resource policies.
 *
 * - `OpsItemGroup` - The resource policy for `OpsItemGroup` enables
 * Amazon Web Services accounts to view and interact with OpsCenter operational work items (OpsItems).
 *
 * - `Parameter` - The resource policy is used to share a parameter with other
 * accounts using Resource Access Manager (RAM). For more information about
 * cross-account sharing of parameters, see Working with
 * shared parameters in the *Amazon Web Services Systems Manager User Guide*.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourcePolicyRequest,
  output: DeleteResourcePolicyResponse,
  errors: [
    InternalServerError,
    MalformedResourcePolicyDocumentException,
    ResourceNotFoundException,
    ResourcePolicyConflictException,
    ResourcePolicyInvalidParameterException,
    ResourcePolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DeregisterManagedInstanceError =
  | InternalServerError
  | InvalidInstanceId
  | CommonErrors;
/**
 * Removes the server or virtual machine from the list of registered servers.
 *
 * If you want to reregister an on-premises server, edge device, or VM, you must use a
 * different Activation Code and Activation ID than used to register the machine previously. The
 * Activation Code and Activation ID must not have already been used on the maximum number of
 * activations specified when they were created. For more information, see Deregistering
 * managed nodes in a hybrid and multicloud environment in the
 * *Amazon Web Services Systems Manager User Guide*.
 */
export const deregisterManagedInstance: API.OperationMethod<
  DeregisterManagedInstanceRequest,
  DeregisterManagedInstanceResult,
  DeregisterManagedInstanceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterManagedInstanceRequest,
  output: DeregisterManagedInstanceResult,
  errors: [InternalServerError, InvalidInstanceId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterManagedInstance",
}));

export type DeregisterPatchBaselineForPatchGroupError =
  | InternalServerError
  | InvalidResourceId
  | CommonErrors;
/**
 * Removes a patch group from a patch baseline.
 */
export const deregisterPatchBaselineForPatchGroup: API.OperationMethod<
  DeregisterPatchBaselineForPatchGroupRequest,
  DeregisterPatchBaselineForPatchGroupResult,
  DeregisterPatchBaselineForPatchGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterPatchBaselineForPatchGroupRequest,
  output: DeregisterPatchBaselineForPatchGroupResult,
  errors: [InternalServerError, InvalidResourceId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterPatchBaselineForPatchGroup",
}));

export type DeregisterTargetFromMaintenanceWindowError =
  | DoesNotExistException
  | InternalServerError
  | TargetInUseException
  | CommonErrors;
/**
 * Removes a target from a maintenance window.
 */
export const deregisterTargetFromMaintenanceWindow: API.OperationMethod<
  DeregisterTargetFromMaintenanceWindowRequest,
  DeregisterTargetFromMaintenanceWindowResult,
  DeregisterTargetFromMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterTargetFromMaintenanceWindowRequest,
  output: DeregisterTargetFromMaintenanceWindowResult,
  errors: [DoesNotExistException, InternalServerError, TargetInUseException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterTargetFromMaintenanceWindow",
}));

export type DeregisterTaskFromMaintenanceWindowError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Removes a task from a maintenance window.
 */
export const deregisterTaskFromMaintenanceWindow: API.OperationMethod<
  DeregisterTaskFromMaintenanceWindowRequest,
  DeregisterTaskFromMaintenanceWindowResult,
  DeregisterTaskFromMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterTaskFromMaintenanceWindowRequest,
  output: DeregisterTaskFromMaintenanceWindowResult,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterTaskFromMaintenanceWindow",
}));

export type DescribeActivationsError =
  | InternalServerError
  | InvalidFilter
  | InvalidNextToken
  | CommonErrors;
/**
 * Describes details about the activation, such as the date and time the activation was
 * created, its expiration date, the Identity and Access Management (IAM) role assigned to
 * the managed nodes in the activation, and the number of nodes registered by using this
 * activation.
 */
export const describeActivations: API.PaginatedOperationMethod<
  DescribeActivationsRequest,
  DescribeActivationsResult,
  DescribeActivationsError,
  Creds | HttpClient.HttpClient,
  Activation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeActivationsRequest,
  output: DescribeActivationsResult,
  errors: [InternalServerError, InvalidFilter, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeActivations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ActivationList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeAssociationError =
  | AssociationDoesNotExist
  | InternalServerError
  | InvalidAssociationVersion
  | InvalidDocument
  | InvalidInstanceId
  | CommonErrors;
/**
 * Describes the association for the specified target or managed node. If you created the
 * association by using the `Targets` parameter, then you must retrieve the association
 * by using the association ID.
 */
export const describeAssociation: API.OperationMethod<
  DescribeAssociationRequest,
  DescribeAssociationResult,
  DescribeAssociationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAssociationRequest,
  output: DescribeAssociationResult,
  errors: [
    AssociationDoesNotExist,
    InternalServerError,
    InvalidAssociationVersion,
    InvalidDocument,
    InvalidInstanceId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssociation",
}));

export type DescribeAssociationExecutionsError =
  | AssociationDoesNotExist
  | InternalServerError
  | InvalidNextToken
  | CommonErrors;
/**
 * Views all executions for a specific association ID.
 */
export const describeAssociationExecutions: API.PaginatedOperationMethod<
  DescribeAssociationExecutionsRequest,
  DescribeAssociationExecutionsResult,
  DescribeAssociationExecutionsError,
  Creds | HttpClient.HttpClient,
  AssociationExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeAssociationExecutionsRequest,
  output: DescribeAssociationExecutionsResult,
  errors: [AssociationDoesNotExist, InternalServerError, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssociationExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AssociationExecutions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeAssociationExecutionTargetsError =
  | AssociationDoesNotExist
  | AssociationExecutionDoesNotExist
  | InternalServerError
  | InvalidNextToken
  | CommonErrors;
/**
 * Views information about a specific execution of a specific association.
 */
export const describeAssociationExecutionTargets: API.PaginatedOperationMethod<
  DescribeAssociationExecutionTargetsRequest,
  DescribeAssociationExecutionTargetsResult,
  DescribeAssociationExecutionTargetsError,
  Creds | HttpClient.HttpClient,
  AssociationExecutionTarget
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeAssociationExecutionTargetsRequest,
  output: DescribeAssociationExecutionTargetsResult,
  errors: [
    AssociationDoesNotExist,
    AssociationExecutionDoesNotExist,
    InternalServerError,
    InvalidNextToken,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAssociationExecutionTargets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AssociationExecutionTargets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeAutomationExecutionsError =
  | InternalServerError
  | InvalidFilterKey
  | InvalidFilterValue
  | InvalidNextToken
  | CommonErrors;
/**
 * Provides details about all active and terminated Automation executions.
 */
export const describeAutomationExecutions: API.PaginatedOperationMethod<
  DescribeAutomationExecutionsRequest,
  DescribeAutomationExecutionsResult,
  DescribeAutomationExecutionsError,
  Creds | HttpClient.HttpClient,
  AutomationExecutionMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeAutomationExecutionsRequest,
  output: DescribeAutomationExecutionsResult,
  errors: [
    InternalServerError,
    InvalidFilterKey,
    InvalidFilterValue,
    InvalidNextToken,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAutomationExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AutomationExecutionMetadataList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeAutomationStepExecutionsError =
  | AutomationExecutionNotFoundException
  | InternalServerError
  | InvalidFilterKey
  | InvalidFilterValue
  | InvalidNextToken
  | CommonErrors;
/**
 * Information about all active and terminated step executions in an Automation
 * workflow.
 */
export const describeAutomationStepExecutions: API.PaginatedOperationMethod<
  DescribeAutomationStepExecutionsRequest,
  DescribeAutomationStepExecutionsResult,
  DescribeAutomationStepExecutionsError,
  Creds | HttpClient.HttpClient,
  StepExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeAutomationStepExecutionsRequest,
  output: DescribeAutomationStepExecutionsResult,
  errors: [
    AutomationExecutionNotFoundException,
    InternalServerError,
    InvalidFilterKey,
    InvalidFilterValue,
    InvalidNextToken,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAutomationStepExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StepExecutions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeAvailablePatchesError = InternalServerError | CommonErrors;
/**
 * Lists all patches eligible to be included in a patch baseline.
 *
 * Currently, `DescribeAvailablePatches` supports only the Amazon Linux 1, Amazon
 * Linux 2, and Windows Server operating systems.
 */
export const describeAvailablePatches: API.PaginatedOperationMethod<
  DescribeAvailablePatchesRequest,
  DescribeAvailablePatchesResult,
  DescribeAvailablePatchesError,
  Creds | HttpClient.HttpClient,
  Patch
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeAvailablePatchesRequest,
  output: DescribeAvailablePatchesResult,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAvailablePatches",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Patches",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeDocumentError =
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentVersion
  | CommonErrors;
/**
 * Describes the specified Amazon Web Services Systems Manager document (SSM document).
 */
export const describeDocument: API.OperationMethod<
  DescribeDocumentRequest,
  DescribeDocumentResult,
  DescribeDocumentError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDocumentRequest,
  output: DescribeDocumentResult,
  errors: [InternalServerError, InvalidDocument, InvalidDocumentVersion],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDocument",
}));

export type DescribeDocumentPermissionError =
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentOperation
  | InvalidNextToken
  | InvalidPermissionType
  | CommonErrors;
/**
 * Describes the permissions for a Amazon Web Services Systems Manager document (SSM document). If you created the
 * document, you are the owner. If a document is shared, it can either be shared privately (by
 * specifying a user's Amazon Web Services account ID) or publicly (*All*).
 */
export const describeDocumentPermission: API.OperationMethod<
  DescribeDocumentPermissionRequest,
  DescribeDocumentPermissionResponse,
  DescribeDocumentPermissionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDocumentPermissionRequest,
  output: DescribeDocumentPermissionResponse,
  errors: [
    InternalServerError,
    InvalidDocument,
    InvalidDocumentOperation,
    InvalidNextToken,
    InvalidPermissionType,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDocumentPermission",
}));

export type DescribeEffectiveInstanceAssociationsError =
  | InternalServerError
  | InvalidInstanceId
  | InvalidNextToken
  | CommonErrors;
/**
 * All associations for the managed nodes.
 */
export const describeEffectiveInstanceAssociations: API.PaginatedOperationMethod<
  DescribeEffectiveInstanceAssociationsRequest,
  DescribeEffectiveInstanceAssociationsResult,
  DescribeEffectiveInstanceAssociationsError,
  Creds | HttpClient.HttpClient,
  InstanceAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeEffectiveInstanceAssociationsRequest,
  output: DescribeEffectiveInstanceAssociationsResult,
  errors: [InternalServerError, InvalidInstanceId, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEffectiveInstanceAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Associations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeEffectivePatchesForPatchBaselineError =
  | DoesNotExistException
  | InternalServerError
  | InvalidResourceId
  | UnsupportedOperatingSystem
  | CommonErrors;
/**
 * Retrieves the current effective patches (the patch and the approval state) for the specified
 * patch baseline. Applies to patch baselines for Windows only.
 */
export const describeEffectivePatchesForPatchBaseline: API.PaginatedOperationMethod<
  DescribeEffectivePatchesForPatchBaselineRequest,
  DescribeEffectivePatchesForPatchBaselineResult,
  DescribeEffectivePatchesForPatchBaselineError,
  Creds | HttpClient.HttpClient,
  EffectivePatch
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeEffectivePatchesForPatchBaselineRequest,
  output: DescribeEffectivePatchesForPatchBaselineResult,
  errors: [
    DoesNotExistException,
    InternalServerError,
    InvalidResourceId,
    UnsupportedOperatingSystem,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEffectivePatchesForPatchBaseline",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EffectivePatches",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeInstanceAssociationsStatusError =
  | InternalServerError
  | InvalidInstanceId
  | InvalidNextToken
  | CommonErrors;
/**
 * The status of the associations for the managed nodes.
 */
export const describeInstanceAssociationsStatus: API.PaginatedOperationMethod<
  DescribeInstanceAssociationsStatusRequest,
  DescribeInstanceAssociationsStatusResult,
  DescribeInstanceAssociationsStatusError,
  Creds | HttpClient.HttpClient,
  InstanceAssociationStatusInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeInstanceAssociationsStatusRequest,
  output: DescribeInstanceAssociationsStatusResult,
  errors: [InternalServerError, InvalidInstanceId, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstanceAssociationsStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstanceAssociationStatusInfos",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeInstanceInformationError =
  | InternalServerError
  | InvalidFilterKey
  | InvalidInstanceId
  | InvalidInstanceInformationFilterValue
  | InvalidNextToken
  | CommonErrors;
/**
 * Provides information about one or more of your managed nodes, including the operating system
 * platform, SSM Agent version, association status, and IP address. This operation does not return
 * information for nodes that are either Stopped or Terminated.
 *
 * If you specify one or more node IDs, the operation returns information for those managed
 * nodes. If you don't specify node IDs, it returns information for all your managed nodes. If you
 * specify a node ID that isn't valid or a node that you don't own, you receive an error.
 *
 * The `IamRole` field returned for this API operation is the role assigned to an
 * Amazon EC2 instance configured with a Systems Manager Quick Setup host management configuration or
 * the role assigned to an on-premises managed node.
 */
export const describeInstanceInformation: API.PaginatedOperationMethod<
  DescribeInstanceInformationRequest,
  DescribeInstanceInformationResult,
  DescribeInstanceInformationError,
  Creds | HttpClient.HttpClient,
  InstanceInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeInstanceInformationRequest,
  output: DescribeInstanceInformationResult,
  errors: [
    InternalServerError,
    InvalidFilterKey,
    InvalidInstanceId,
    InvalidInstanceInformationFilterValue,
    InvalidNextToken,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstanceInformation",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstanceInformationList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeInstancePatchesError =
  | InternalServerError
  | InvalidFilter
  | InvalidInstanceId
  | InvalidNextToken
  | CommonErrors;
/**
 * Retrieves information about the patches on the specified managed node and their state
 * relative to the patch baseline being used for the node.
 */
export const describeInstancePatches: API.PaginatedOperationMethod<
  DescribeInstancePatchesRequest,
  DescribeInstancePatchesResult,
  DescribeInstancePatchesError,
  Creds | HttpClient.HttpClient,
  PatchComplianceData
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeInstancePatchesRequest,
  output: DescribeInstancePatchesResult,
  errors: [
    InternalServerError,
    InvalidFilter,
    InvalidInstanceId,
    InvalidNextToken,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstancePatches",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Patches",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeInstancePatchStatesError =
  | InternalServerError
  | InvalidNextToken
  | CommonErrors;
/**
 * Retrieves the high-level patch state of one or more managed nodes.
 */
export const describeInstancePatchStates: API.PaginatedOperationMethod<
  DescribeInstancePatchStatesRequest,
  DescribeInstancePatchStatesResult,
  DescribeInstancePatchStatesError,
  Creds | HttpClient.HttpClient,
  InstancePatchState
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeInstancePatchStatesRequest,
  output: DescribeInstancePatchStatesResult,
  errors: [InternalServerError, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstancePatchStates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstancePatchStates",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeInstancePatchStatesForPatchGroupError =
  | InternalServerError
  | InvalidFilter
  | InvalidNextToken
  | CommonErrors;
/**
 * Retrieves the high-level patch state for the managed nodes in the specified patch
 * group.
 */
export const describeInstancePatchStatesForPatchGroup: API.PaginatedOperationMethod<
  DescribeInstancePatchStatesForPatchGroupRequest,
  DescribeInstancePatchStatesForPatchGroupResult,
  DescribeInstancePatchStatesForPatchGroupError,
  Creds | HttpClient.HttpClient,
  InstancePatchState
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeInstancePatchStatesForPatchGroupRequest,
  output: DescribeInstancePatchStatesForPatchGroupResult,
  errors: [InternalServerError, InvalidFilter, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstancePatchStatesForPatchGroup",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstancePatchStates",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeInstancePropertiesError =
  | InternalServerError
  | InvalidActivationId
  | InvalidDocument
  | InvalidFilterKey
  | InvalidInstanceId
  | InvalidInstancePropertyFilterValue
  | InvalidNextToken
  | CommonErrors;
/**
 * An API operation used by the Systems Manager console to display information about Systems Manager managed
 * nodes.
 */
export const describeInstanceProperties: API.PaginatedOperationMethod<
  DescribeInstancePropertiesRequest,
  DescribeInstancePropertiesResult,
  DescribeInstancePropertiesError,
  Creds | HttpClient.HttpClient,
  InstanceProperty
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeInstancePropertiesRequest,
  output: DescribeInstancePropertiesResult,
  errors: [
    InternalServerError,
    InvalidActivationId,
    InvalidDocument,
    InvalidFilterKey,
    InvalidInstanceId,
    InvalidInstancePropertyFilterValue,
    InvalidNextToken,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstanceProperties",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InstanceProperties",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeInventoryDeletionsError =
  | InternalServerError
  | InvalidDeletionIdException
  | InvalidNextToken
  | CommonErrors;
/**
 * Describes a specific delete inventory operation.
 */
export const describeInventoryDeletions: API.PaginatedOperationMethod<
  DescribeInventoryDeletionsRequest,
  DescribeInventoryDeletionsResult,
  DescribeInventoryDeletionsError,
  Creds | HttpClient.HttpClient,
  InventoryDeletionStatusItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeInventoryDeletionsRequest,
  output: DescribeInventoryDeletionsResult,
  errors: [InternalServerError, InvalidDeletionIdException, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInventoryDeletions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InventoryDeletions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeMaintenanceWindowExecutionsError =
  | InternalServerError
  | CommonErrors;
/**
 * Lists the executions of a maintenance window. This includes information about when the
 * maintenance window was scheduled to be active, and information about tasks registered and run
 * with the maintenance window.
 */
export const describeMaintenanceWindowExecutions: API.PaginatedOperationMethod<
  DescribeMaintenanceWindowExecutionsRequest,
  DescribeMaintenanceWindowExecutionsResult,
  DescribeMaintenanceWindowExecutionsError,
  Creds | HttpClient.HttpClient,
  MaintenanceWindowExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMaintenanceWindowExecutionsRequest,
  output: DescribeMaintenanceWindowExecutionsResult,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMaintenanceWindowExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WindowExecutions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeMaintenanceWindowExecutionTaskInvocationsError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves the individual task executions (one per target) for a particular task run as part
 * of a maintenance window execution.
 */
export const describeMaintenanceWindowExecutionTaskInvocations: API.PaginatedOperationMethod<
  DescribeMaintenanceWindowExecutionTaskInvocationsRequest,
  DescribeMaintenanceWindowExecutionTaskInvocationsResult,
  DescribeMaintenanceWindowExecutionTaskInvocationsError,
  Creds | HttpClient.HttpClient,
  MaintenanceWindowExecutionTaskInvocationIdentity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMaintenanceWindowExecutionTaskInvocationsRequest,
  output: DescribeMaintenanceWindowExecutionTaskInvocationsResult,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMaintenanceWindowExecutionTaskInvocations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WindowExecutionTaskInvocationIdentities",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeMaintenanceWindowExecutionTasksError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * For a given maintenance window execution, lists the tasks that were run.
 */
export const describeMaintenanceWindowExecutionTasks: API.PaginatedOperationMethod<
  DescribeMaintenanceWindowExecutionTasksRequest,
  DescribeMaintenanceWindowExecutionTasksResult,
  DescribeMaintenanceWindowExecutionTasksError,
  Creds | HttpClient.HttpClient,
  MaintenanceWindowExecutionTaskIdentity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMaintenanceWindowExecutionTasksRequest,
  output: DescribeMaintenanceWindowExecutionTasksResult,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMaintenanceWindowExecutionTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WindowExecutionTaskIdentities",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeMaintenanceWindowsError =
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves the maintenance windows in an Amazon Web Services account.
 */
export const describeMaintenanceWindows: API.PaginatedOperationMethod<
  DescribeMaintenanceWindowsRequest,
  DescribeMaintenanceWindowsResult,
  DescribeMaintenanceWindowsError,
  Creds | HttpClient.HttpClient,
  MaintenanceWindowIdentity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMaintenanceWindowsRequest,
  output: DescribeMaintenanceWindowsResult,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMaintenanceWindows",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WindowIdentities",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeMaintenanceWindowScheduleError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves information about upcoming executions of a maintenance window.
 */
export const describeMaintenanceWindowSchedule: API.PaginatedOperationMethod<
  DescribeMaintenanceWindowScheduleRequest,
  DescribeMaintenanceWindowScheduleResult,
  DescribeMaintenanceWindowScheduleError,
  Creds | HttpClient.HttpClient,
  ScheduledWindowExecution
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMaintenanceWindowScheduleRequest,
  output: DescribeMaintenanceWindowScheduleResult,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMaintenanceWindowSchedule",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScheduledWindowExecutions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeMaintenanceWindowsForTargetError =
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves information about the maintenance window targets or tasks that a managed node is
 * associated with.
 */
export const describeMaintenanceWindowsForTarget: API.PaginatedOperationMethod<
  DescribeMaintenanceWindowsForTargetRequest,
  DescribeMaintenanceWindowsForTargetResult,
  DescribeMaintenanceWindowsForTargetError,
  Creds | HttpClient.HttpClient,
  MaintenanceWindowIdentityForTarget
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMaintenanceWindowsForTargetRequest,
  output: DescribeMaintenanceWindowsForTargetResult,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMaintenanceWindowsForTarget",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WindowIdentities",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeMaintenanceWindowTargetsError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Lists the targets registered with the maintenance window.
 */
export const describeMaintenanceWindowTargets: API.PaginatedOperationMethod<
  DescribeMaintenanceWindowTargetsRequest,
  DescribeMaintenanceWindowTargetsResult,
  DescribeMaintenanceWindowTargetsError,
  Creds | HttpClient.HttpClient,
  MaintenanceWindowTarget
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMaintenanceWindowTargetsRequest,
  output: DescribeMaintenanceWindowTargetsResult,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMaintenanceWindowTargets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Targets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeMaintenanceWindowTasksError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Lists the tasks in a maintenance window.
 *
 * For maintenance window tasks without a specified target, you can't supply values for
 * `--max-errors` and `--max-concurrency`. Instead, the system inserts a
 * placeholder value of `1`, which may be reported in the response to this command.
 * These values don't affect the running of your task and can be ignored.
 */
export const describeMaintenanceWindowTasks: API.PaginatedOperationMethod<
  DescribeMaintenanceWindowTasksRequest,
  DescribeMaintenanceWindowTasksResult,
  DescribeMaintenanceWindowTasksError,
  Creds | HttpClient.HttpClient,
  MaintenanceWindowTask
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMaintenanceWindowTasksRequest,
  output: DescribeMaintenanceWindowTasksResult,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMaintenanceWindowTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tasks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeOpsItemsError = InternalServerError | CommonErrors;
/**
 * Query a set of OpsItems. You must have permission in Identity and Access Management (IAM) to query a list of OpsItems. For more information, see Set up OpsCenter in the
 * *Amazon Web Services Systems Manager User Guide*.
 *
 * Operations engineers and IT professionals use Amazon Web Services Systems Manager OpsCenter to view, investigate, and
 * remediate operational issues impacting the performance and health of their Amazon Web Services resources. For
 * more information, see Amazon Web Services Systems Manager OpsCenter in the
 * *Amazon Web Services Systems Manager User Guide*.
 */
export const describeOpsItems: API.PaginatedOperationMethod<
  DescribeOpsItemsRequest,
  DescribeOpsItemsResponse,
  DescribeOpsItemsError,
  Creds | HttpClient.HttpClient,
  OpsItemSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeOpsItemsRequest,
  output: DescribeOpsItemsResponse,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOpsItems",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OpsItemSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeParametersError =
  | InternalServerError
  | InvalidFilterKey
  | InvalidFilterOption
  | InvalidFilterValue
  | InvalidNextToken
  | CommonErrors;
/**
 * Lists the parameters in your Amazon Web Services account or the parameters shared with you when you enable
 * the Shared option.
 *
 * Request results are returned on a best-effort basis. If you specify `MaxResults`
 * in the request, the response includes information up to the limit specified. The number of items
 * returned, however, can be between zero and the value of `MaxResults`. If the service
 * reaches an internal limit while processing the results, it stops the operation and returns the
 * matching values up to that point and a `NextToken`. You can specify the
 * `NextToken` in a subsequent call to get the next set of results.
 *
 * Parameter names can't contain spaces. The service removes any spaces specified for the
 * beginning or end of a parameter name. If the specified name for a parameter contains spaces
 * between characters, the request fails with a `ValidationException` error.
 *
 * If you change the KMS key alias for the KMS key used to encrypt a parameter,
 * then you must also update the key alias the parameter uses to reference KMS. Otherwise,
 * `DescribeParameters` retrieves whatever the original key alias was
 * referencing.
 */
export const describeParameters: API.PaginatedOperationMethod<
  DescribeParametersRequest,
  DescribeParametersResult,
  DescribeParametersError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeParametersRequest,
  output: DescribeParametersResult,
  errors: [
    InternalServerError,
    InvalidFilterKey,
    InvalidFilterOption,
    InvalidFilterValue,
    InvalidNextToken,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeParameters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribePatchBaselinesError = InternalServerError | CommonErrors;
/**
 * Lists the patch baselines in your Amazon Web Services account.
 */
export const describePatchBaselines: API.PaginatedOperationMethod<
  DescribePatchBaselinesRequest,
  DescribePatchBaselinesResult,
  DescribePatchBaselinesError,
  Creds | HttpClient.HttpClient,
  PatchBaselineIdentity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribePatchBaselinesRequest,
  output: DescribePatchBaselinesResult,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePatchBaselines",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BaselineIdentities",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribePatchGroupsError = InternalServerError | CommonErrors;
/**
 * Lists all patch groups that have been registered with patch baselines.
 */
export const describePatchGroups: API.PaginatedOperationMethod<
  DescribePatchGroupsRequest,
  DescribePatchGroupsResult,
  DescribePatchGroupsError,
  Creds | HttpClient.HttpClient,
  PatchGroupPatchBaselineMapping
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribePatchGroupsRequest,
  output: DescribePatchGroupsResult,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePatchGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Mappings",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribePatchGroupStateError =
  | InternalServerError
  | InvalidNextToken
  | CommonErrors;
/**
 * Returns high-level aggregated patch compliance state information for a patch group.
 */
export const describePatchGroupState: API.OperationMethod<
  DescribePatchGroupStateRequest,
  DescribePatchGroupStateResult,
  DescribePatchGroupStateError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePatchGroupStateRequest,
  output: DescribePatchGroupStateResult,
  errors: [InternalServerError, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePatchGroupState",
}));

export type DescribePatchPropertiesError = InternalServerError | CommonErrors;
/**
 * Lists the properties of available patches organized by product, product family,
 * classification, severity, and other properties of available patches. You can use the reported
 * properties in the filters you specify in requests for operations such as CreatePatchBaseline, UpdatePatchBaseline, DescribeAvailablePatches, and DescribePatchBaselines.
 *
 * The following section lists the properties that can be used in filters for each major
 * operating system type:
 *
 * ### AMAZON_LINUX
 *
 * Valid properties: `PRODUCT` | `CLASSIFICATION` |
 * `SEVERITY`
 *
 * ### AMAZON_LINUX_2
 *
 * Valid properties: `PRODUCT` | `CLASSIFICATION` |
 * `SEVERITY`
 *
 * ### AMAZON_LINUX_2023
 *
 * Valid properties: `PRODUCT` | `CLASSIFICATION` |
 * `SEVERITY`
 *
 * ### CENTOS
 *
 * Valid properties: `PRODUCT` | `CLASSIFICATION` |
 * `SEVERITY`
 *
 * ### DEBIAN
 *
 * Valid properties: `PRODUCT` | `PRIORITY`
 *
 * ### MACOS
 *
 * Valid properties: `PRODUCT` | `CLASSIFICATION`
 *
 * ### ORACLE_LINUX
 *
 * Valid properties: `PRODUCT` | `CLASSIFICATION` |
 * `SEVERITY`
 *
 * ### REDHAT_ENTERPRISE_LINUX
 *
 * Valid properties: `PRODUCT` | `CLASSIFICATION` |
 * `SEVERITY`
 *
 * ### SUSE
 *
 * Valid properties: `PRODUCT` | `CLASSIFICATION` |
 * `SEVERITY`
 *
 * ### UBUNTU
 *
 * Valid properties: `PRODUCT` | `PRIORITY`
 *
 * ### WINDOWS
 *
 * Valid properties: `PRODUCT` | `PRODUCT_FAMILY` |
 * `CLASSIFICATION` | `MSRC_SEVERITY`
 */
export const describePatchProperties: API.PaginatedOperationMethod<
  DescribePatchPropertiesRequest,
  DescribePatchPropertiesResult,
  DescribePatchPropertiesError,
  Creds | HttpClient.HttpClient,
  { [key: string]: string | undefined }
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribePatchPropertiesRequest,
  output: DescribePatchPropertiesResult,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePatchProperties",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Properties",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSessionsError =
  | InternalServerError
  | InvalidFilterKey
  | InvalidNextToken
  | CommonErrors;
/**
 * Retrieves a list of all active sessions (both connected and disconnected) or terminated
 * sessions from the past 30 days.
 */
export const describeSessions: API.PaginatedOperationMethod<
  DescribeSessionsRequest,
  DescribeSessionsResponse,
  DescribeSessionsError,
  Creds | HttpClient.HttpClient,
  Session
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeSessionsRequest,
  output: DescribeSessionsResponse,
  errors: [InternalServerError, InvalidFilterKey, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSessions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Sessions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DisassociateOpsItemRelatedItemError =
  | InternalServerError
  | OpsItemConflictException
  | OpsItemInvalidParameterException
  | OpsItemNotFoundException
  | OpsItemRelatedItemAssociationNotFoundException
  | CommonErrors;
/**
 * Deletes the association between an OpsItem and a related item. For example, this API
 * operation can delete an Incident Manager incident from an OpsItem. Incident Manager is a tool in
 * Amazon Web Services Systems Manager.
 */
export const disassociateOpsItemRelatedItem: API.OperationMethod<
  DisassociateOpsItemRelatedItemRequest,
  DisassociateOpsItemRelatedItemResponse,
  DisassociateOpsItemRelatedItemError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateOpsItemRelatedItemRequest,
  output: DisassociateOpsItemRelatedItemResponse,
  errors: [
    InternalServerError,
    OpsItemConflictException,
    OpsItemInvalidParameterException,
    OpsItemNotFoundException,
    OpsItemRelatedItemAssociationNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateOpsItemRelatedItem",
}));

export type GetAccessTokenError =
  | AccessDeniedException
  | InternalServerError
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a credentials set to be used with just-in-time node access.
 */
export const getAccessToken: API.OperationMethod<
  GetAccessTokenRequest,
  GetAccessTokenResponse,
  GetAccessTokenError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccessTokenRequest,
  output: GetAccessTokenResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessToken",
}));

export type GetAutomationExecutionError =
  | AutomationExecutionNotFoundException
  | InternalServerError
  | CommonErrors;
/**
 * Get detailed information about a particular Automation execution.
 */
export const getAutomationExecution: API.OperationMethod<
  GetAutomationExecutionRequest,
  GetAutomationExecutionResult,
  GetAutomationExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAutomationExecutionRequest,
  output: GetAutomationExecutionResult,
  errors: [AutomationExecutionNotFoundException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomationExecution",
}));

export type GetCalendarStateError =
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentType
  | UnsupportedCalendarException
  | CommonErrors;
/**
 * Gets the state of a Amazon Web Services Systems Manager change calendar at the current time or a specified time. If
 * you specify a time, `GetCalendarState` returns the state of the calendar at that
 * specific time, and returns the next time that the change calendar state will transition. If you
 * don't specify a time, `GetCalendarState` uses the current time. Change Calendar
 * entries have two possible states: `OPEN` or `CLOSED`.
 *
 * If you specify more than one calendar in a request, the command returns the status of
 * `OPEN` only if all calendars in the request are open. If one or more calendars in the
 * request are closed, the status returned is `CLOSED`.
 *
 * For more information about Change Calendar, a tool in Amazon Web Services Systems Manager, see Amazon Web Services Systems Manager Change Calendar in the *Amazon Web Services Systems Manager User Guide*.
 */
export const getCalendarState: API.OperationMethod<
  GetCalendarStateRequest,
  GetCalendarStateResponse,
  GetCalendarStateError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCalendarStateRequest,
  output: GetCalendarStateResponse,
  errors: [
    InternalServerError,
    InvalidDocument,
    InvalidDocumentType,
    UnsupportedCalendarException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCalendarState",
}));

export type GetCloudConnectorError =
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns detailed information about a cloud connector.
 */
export const getCloudConnector: API.OperationMethod<
  GetCloudConnectorRequest,
  GetCloudConnectorResult,
  GetCloudConnectorError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCloudConnectorRequest,
  output: GetCloudConnectorResult,
  errors: [InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudConnector",
}));

export type GetCommandInvocationError =
  | InternalServerError
  | InvalidCommandId
  | InvalidInstanceId
  | InvalidPluginName
  | InvocationDoesNotExist
  | CommonErrors;
/**
 * Returns detailed information about command execution for an invocation or plugin. The Run
 * Command API follows an eventual consistency model, due to the distributed nature of the system
 * supporting the API. This means that the result of an API command you run that affects your
 * resources might not be immediately visible to all subsequent commands you run. You should keep
 * this in mind when you carry out an API command that immediately follows a previous API
 * command.
 *
 * `GetCommandInvocation` only gives the execution status of a plugin in a document.
 * To get the command execution status on a specific managed node, use ListCommandInvocations. To get the command execution status across managed nodes,
 * use ListCommands.
 */
export const getCommandInvocation: API.OperationMethod<
  GetCommandInvocationRequest,
  GetCommandInvocationResult,
  GetCommandInvocationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCommandInvocationRequest,
  output: GetCommandInvocationResult,
  errors: [
    InternalServerError,
    InvalidCommandId,
    InvalidInstanceId,
    InvalidPluginName,
    InvocationDoesNotExist,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCommandInvocation",
}));

export type GetConnectionStatusError = InternalServerError | CommonErrors;
/**
 * Retrieves the Session Manager connection status for a managed node to determine whether it is running
 * and ready to receive Session Manager connections.
 */
export const getConnectionStatus: API.OperationMethod<
  GetConnectionStatusRequest,
  GetConnectionStatusResponse,
  GetConnectionStatusError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConnectionStatusRequest,
  output: GetConnectionStatusResponse,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectionStatus",
}));

export type GetDefaultPatchBaselineError = InternalServerError | CommonErrors;
/**
 * Retrieves the default patch baseline. Amazon Web Services Systems Manager supports creating multiple default patch
 * baselines. For example, you can create a default patch baseline for each operating system.
 *
 * If you don't specify an operating system value, the default patch baseline for Windows is
 * returned.
 */
export const getDefaultPatchBaseline: API.OperationMethod<
  GetDefaultPatchBaselineRequest,
  GetDefaultPatchBaselineResult,
  GetDefaultPatchBaselineError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDefaultPatchBaselineRequest,
  output: GetDefaultPatchBaselineResult,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDefaultPatchBaseline",
}));

export type GetDeployablePatchSnapshotForInstanceError =
  | InternalServerError
  | UnsupportedFeatureRequiredException
  | UnsupportedOperatingSystem
  | CommonErrors;
/**
 * Retrieves the current snapshot for the patch baseline the managed node uses. This API is
 * primarily used by the `AWS-RunPatchBaseline` Systems Manager document (SSM document).
 *
 * If you run the command locally, such as with the Command Line Interface (CLI), the system attempts to use your local Amazon Web Services credentials and the operation fails. To avoid
 * this, you can run the command in the Amazon Web Services Systems Manager console. Use Run Command, a tool in Amazon Web Services Systems Manager,
 * with an SSM document that enables you to target a managed node with a script or command. For
 * example, run the command using the `AWS-RunShellScript` document or the
 * `AWS-RunPowerShellScript` document.
 */
export const getDeployablePatchSnapshotForInstance: API.OperationMethod<
  GetDeployablePatchSnapshotForInstanceRequest,
  GetDeployablePatchSnapshotForInstanceResult,
  GetDeployablePatchSnapshotForInstanceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeployablePatchSnapshotForInstanceRequest,
  output: GetDeployablePatchSnapshotForInstanceResult,
  errors: [
    InternalServerError,
    UnsupportedFeatureRequiredException,
    UnsupportedOperatingSystem,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployablePatchSnapshotForInstance",
}));

export type GetDocumentError =
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentVersion
  | CommonErrors;
/**
 * Gets the contents of the specified Amazon Web Services Systems Manager document (SSM document).
 */
export const getDocument: API.OperationMethod<
  GetDocumentRequest,
  GetDocumentResult,
  GetDocumentError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDocumentRequest,
  output: GetDocumentResult,
  errors: [InternalServerError, InvalidDocument, InvalidDocumentVersion],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDocument",
}));

export type GetExecutionPreviewError =
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Initiates the process of retrieving an existing preview that shows the effects that running
 * a specified Automation runbook would have on the targeted resources.
 */
export const getExecutionPreview: API.OperationMethod<
  GetExecutionPreviewRequest,
  GetExecutionPreviewResponse,
  GetExecutionPreviewError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetExecutionPreviewRequest,
  output: GetExecutionPreviewResponse,
  errors: [InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExecutionPreview",
}));

export type GetInventoryError =
  | InternalServerError
  | InvalidAggregatorException
  | InvalidFilter
  | InvalidInventoryGroupException
  | InvalidNextToken
  | InvalidResultAttributeException
  | InvalidTypeNameException
  | CommonErrors;
/**
 * Query inventory information. This includes managed node status, such as `Stopped`
 * or `Terminated`.
 */
export const getInventory: API.PaginatedOperationMethod<
  GetInventoryRequest,
  GetInventoryResult,
  GetInventoryError,
  Creds | HttpClient.HttpClient,
  InventoryResultEntity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetInventoryRequest,
  output: GetInventoryResult,
  errors: [
    InternalServerError,
    InvalidAggregatorException,
    InvalidFilter,
    InvalidInventoryGroupException,
    InvalidNextToken,
    InvalidResultAttributeException,
    InvalidTypeNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInventory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entities",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetInventorySchemaError =
  | InternalServerError
  | InvalidNextToken
  | InvalidTypeNameException
  | CommonErrors;
/**
 * Return a list of inventory type names for the account, or return a list of attribute names
 * for a specific Inventory item type.
 */
export const getInventorySchema: API.PaginatedOperationMethod<
  GetInventorySchemaRequest,
  GetInventorySchemaResult,
  GetInventorySchemaError,
  Creds | HttpClient.HttpClient,
  InventoryItemSchema
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetInventorySchemaRequest,
  output: GetInventorySchemaResult,
  errors: [InternalServerError, InvalidNextToken, InvalidTypeNameException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInventorySchema",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Schemas",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetMaintenanceWindowError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves a maintenance window.
 */
export const getMaintenanceWindow: API.OperationMethod<
  GetMaintenanceWindowRequest,
  GetMaintenanceWindowResult,
  GetMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMaintenanceWindowRequest,
  output: GetMaintenanceWindowResult,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMaintenanceWindow",
}));

export type GetMaintenanceWindowExecutionError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves details about a specific a maintenance window execution.
 */
export const getMaintenanceWindowExecution: API.OperationMethod<
  GetMaintenanceWindowExecutionRequest,
  GetMaintenanceWindowExecutionResult,
  GetMaintenanceWindowExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMaintenanceWindowExecutionRequest,
  output: GetMaintenanceWindowExecutionResult,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMaintenanceWindowExecution",
}));

export type GetMaintenanceWindowExecutionTaskError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves the details about a specific task run as part of a maintenance window
 * execution.
 */
export const getMaintenanceWindowExecutionTask: API.OperationMethod<
  GetMaintenanceWindowExecutionTaskRequest,
  GetMaintenanceWindowExecutionTaskResult,
  GetMaintenanceWindowExecutionTaskError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMaintenanceWindowExecutionTaskRequest,
  output: GetMaintenanceWindowExecutionTaskResult,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMaintenanceWindowExecutionTask",
}));

export type GetMaintenanceWindowExecutionTaskInvocationError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves information about a specific task running on a specific target.
 */
export const getMaintenanceWindowExecutionTaskInvocation: API.OperationMethod<
  GetMaintenanceWindowExecutionTaskInvocationRequest,
  GetMaintenanceWindowExecutionTaskInvocationResult,
  GetMaintenanceWindowExecutionTaskInvocationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMaintenanceWindowExecutionTaskInvocationRequest,
  output: GetMaintenanceWindowExecutionTaskInvocationResult,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMaintenanceWindowExecutionTaskInvocation",
}));

export type GetMaintenanceWindowTaskError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves the details of a maintenance window task.
 *
 * For maintenance window tasks without a specified target, you can't supply values for
 * `--max-errors` and `--max-concurrency`. Instead, the system inserts a
 * placeholder value of `1`, which may be reported in the response to this command.
 * These values don't affect the running of your task and can be ignored.
 *
 * To retrieve a list of tasks in a maintenance window, instead use the DescribeMaintenanceWindowTasks command.
 */
export const getMaintenanceWindowTask: API.OperationMethod<
  GetMaintenanceWindowTaskRequest,
  GetMaintenanceWindowTaskResult,
  GetMaintenanceWindowTaskError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMaintenanceWindowTaskRequest,
  output: GetMaintenanceWindowTaskResult,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMaintenanceWindowTask",
}));

export type GetOpsItemError =
  | InternalServerError
  | OpsItemAccessDeniedException
  | OpsItemNotFoundException
  | CommonErrors;
/**
 * Get information about an OpsItem by using the ID. You must have permission in Identity and Access Management (IAM) to view information about an OpsItem. For more information,
 * see Set
 * up OpsCenter in the *Amazon Web Services Systems Manager User Guide*.
 *
 * Operations engineers and IT professionals use Amazon Web Services Systems Manager OpsCenter to view, investigate, and
 * remediate operational issues impacting the performance and health of their Amazon Web Services resources. For
 * more information, see Amazon Web Services Systems Manager OpsCenter in the
 * *Amazon Web Services Systems Manager User Guide*.
 */
export const getOpsItem: API.OperationMethod<
  GetOpsItemRequest,
  GetOpsItemResponse,
  GetOpsItemError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOpsItemRequest,
  output: GetOpsItemResponse,
  errors: [
    InternalServerError,
    OpsItemAccessDeniedException,
    OpsItemNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOpsItem",
}));

export type GetOpsMetadataError =
  | InternalServerError
  | OpsMetadataInvalidArgumentException
  | OpsMetadataNotFoundException
  | CommonErrors;
/**
 * View operational metadata related to an application in Application Manager.
 */
export const getOpsMetadata: API.OperationMethod<
  GetOpsMetadataRequest,
  GetOpsMetadataResult,
  GetOpsMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOpsMetadataRequest,
  output: GetOpsMetadataResult,
  errors: [
    InternalServerError,
    OpsMetadataInvalidArgumentException,
    OpsMetadataNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOpsMetadata",
}));

export type GetOpsSummaryError =
  | InternalServerError
  | InvalidAggregatorException
  | InvalidFilter
  | InvalidNextToken
  | InvalidTypeNameException
  | ResourceDataSyncNotFoundException
  | CommonErrors;
/**
 * View a summary of operations metadata (OpsData) based on specified filters and aggregators.
 * OpsData can include information about Amazon Web Services Systems Manager OpsCenter operational workitems (OpsItems) as
 * well as information about any Amazon Web Services resource or service configured to report OpsData to Amazon Web Services Systems Manager
 * Explorer.
 */
export const getOpsSummary: API.PaginatedOperationMethod<
  GetOpsSummaryRequest,
  GetOpsSummaryResult,
  GetOpsSummaryError,
  Creds | HttpClient.HttpClient,
  OpsEntity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetOpsSummaryRequest,
  output: GetOpsSummaryResult,
  errors: [
    InternalServerError,
    InvalidAggregatorException,
    InvalidFilter,
    InvalidNextToken,
    InvalidTypeNameException,
    ResourceDataSyncNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOpsSummary",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entities",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetParameterError =
  | InternalServerError
  | InvalidKeyId
  | ParameterNotFound
  | ParameterVersionNotFound
  | CommonErrors;
/**
 * Get information about a single parameter by specifying the parameter name.
 *
 * Parameter names can't contain spaces. The service removes any spaces specified for the
 * beginning or end of a parameter name. If the specified name for a parameter contains spaces
 * between characters, the request fails with a `ValidationException` error.
 *
 * To get information about more than one parameter at a time, use the GetParameters operation.
 *
 * Parameter Store throughput defines the number of API transactions per second (TPS) that
 * Systems Manager can process. This applies to `GetParameter`,
 * `GetParameters`, and `PutParameter` API calls for your Amazon Web Services account and
 * Amazon Web Services Region. By default, Parameter Store is configured with a standard throughput quota suitable
 * for low- to moderate-volume workloads. Applications that retrieve configuration data infrequently
 * or operate at smaller scale can use this default setting without additional cost.
 *
 * For higher-volume workloads, you can enable higher throughput. This increases the maximum
 * number of supported transactions per second for your account and Region. Increased throughput
 * supports applications and workloads that need concurrent access to multiple parameters. If you
 * experience `ThrottlingException: Rate exceeded` errors, enable higher throughput. For
 * more information, see Changing Parameter Store
 * throughput.
 */
export const getParameter: API.OperationMethod<
  GetParameterRequest,
  GetParameterResult,
  GetParameterError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetParameterRequest,
  output: GetParameterResult,
  errors: [
    InternalServerError,
    InvalidKeyId,
    ParameterNotFound,
    ParameterVersionNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetParameter",
}));

export type GetParameterHistoryError =
  | InternalServerError
  | InvalidKeyId
  | InvalidNextToken
  | ParameterNotFound
  | CommonErrors;
/**
 * Retrieves the history of all changes to a parameter.
 *
 * Parameter names can't contain spaces. The service removes any spaces specified for the
 * beginning or end of a parameter name. If the specified name for a parameter contains spaces
 * between characters, the request fails with a `ValidationException` error.
 *
 * If you change the KMS key alias for the KMS key used to encrypt a parameter,
 * then you must also update the key alias the parameter uses to reference KMS. Otherwise,
 * `GetParameterHistory` retrieves whatever the original key alias was
 * referencing.
 */
export const getParameterHistory: API.PaginatedOperationMethod<
  GetParameterHistoryRequest,
  GetParameterHistoryResult,
  GetParameterHistoryError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetParameterHistoryRequest,
  output: GetParameterHistoryResult,
  errors: [
    InternalServerError,
    InvalidKeyId,
    InvalidNextToken,
    ParameterNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetParameterHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetParametersError =
  | InternalServerError
  | InvalidKeyId
  | CommonErrors;
/**
 * Get information about one or more parameters by specifying multiple parameter names.
 *
 * To get information about a single parameter, you can use the GetParameter
 * operation instead.
 *
 * Parameter names can't contain spaces. The service removes any spaces specified for the
 * beginning or end of a parameter name. If the specified name for a parameter contains spaces
 * between characters, the request fails with a `ValidationException` error.
 *
 * Parameter Store throughput defines the number of API transactions per second (TPS) that
 * Systems Manager can process. This applies to `GetParameter`,
 * `GetParameters`, and `PutParameter` API calls for your Amazon Web Services account and
 * Amazon Web Services Region. By default, Parameter Store is configured with a standard throughput quota suitable
 * for low- to moderate-volume workloads. Applications that retrieve configuration data infrequently
 * or operate at smaller scale can use this default setting without additional cost.
 *
 * For higher-volume workloads, you can enable higher throughput. This increases the maximum
 * number of supported transactions per second for your account and Region. Increased throughput
 * supports applications and workloads that need concurrent access to multiple parameters. If you
 * experience `ThrottlingException: Rate exceeded` errors, enable higher throughput. For
 * more information, see Changing Parameter Store
 * throughput.
 */
export const getParameters: API.OperationMethod<
  GetParametersRequest,
  GetParametersResult,
  GetParametersError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetParametersRequest,
  output: GetParametersResult,
  errors: [InternalServerError, InvalidKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetParameters",
}));

export type GetParametersByPathError =
  | InternalServerError
  | InvalidFilterKey
  | InvalidFilterOption
  | InvalidFilterValue
  | InvalidKeyId
  | InvalidNextToken
  | CommonErrors;
/**
 * Retrieve information about one or more parameters under a specified level in a hierarchy.
 *
 * Request results are returned on a best-effort basis. If you specify `MaxResults`
 * in the request, the response includes information up to the limit specified. The number of items
 * returned, however, can be between zero and the value of `MaxResults`. If the service
 * reaches an internal limit while processing the results, it stops the operation and returns the
 * matching values up to that point and a `NextToken`. You can specify the
 * `NextToken` in a subsequent call to get the next set of results.
 *
 * Parameter names can't contain spaces. The service removes any spaces specified for the
 * beginning or end of a parameter name. If the specified name for a parameter contains spaces
 * between characters, the request fails with a `ValidationException` error.
 */
export const getParametersByPath: API.PaginatedOperationMethod<
  GetParametersByPathRequest,
  GetParametersByPathResult,
  GetParametersByPathError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetParametersByPathRequest,
  output: GetParametersByPathResult,
  errors: [
    InternalServerError,
    InvalidFilterKey,
    InvalidFilterOption,
    InvalidFilterValue,
    InvalidKeyId,
    InvalidNextToken,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetParametersByPath",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetPatchBaselineError =
  | DoesNotExistException
  | InternalServerError
  | InvalidResourceId
  | CommonErrors;
/**
 * Retrieves information about a patch baseline.
 */
export const getPatchBaseline: API.OperationMethod<
  GetPatchBaselineRequest,
  GetPatchBaselineResult,
  GetPatchBaselineError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPatchBaselineRequest,
  output: GetPatchBaselineResult,
  errors: [DoesNotExistException, InternalServerError, InvalidResourceId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPatchBaseline",
}));

export type GetPatchBaselineForPatchGroupError =
  | InternalServerError
  | CommonErrors;
/**
 * Retrieves the patch baseline that should be used for the specified patch group.
 */
export const getPatchBaselineForPatchGroup: API.OperationMethod<
  GetPatchBaselineForPatchGroupRequest,
  GetPatchBaselineForPatchGroupResult,
  GetPatchBaselineForPatchGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPatchBaselineForPatchGroupRequest,
  output: GetPatchBaselineForPatchGroupResult,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPatchBaselineForPatchGroup",
}));

export type GetResourcePoliciesError =
  | InternalServerError
  | ResourceNotFoundException
  | ResourcePolicyInvalidParameterException
  | CommonErrors;
/**
 * Returns an array of the `Policy` object.
 */
export const getResourcePolicies: API.PaginatedOperationMethod<
  GetResourcePoliciesRequest,
  GetResourcePoliciesResponse,
  GetResourcePoliciesError,
  Creds | HttpClient.HttpClient,
  GetResourcePoliciesResponseEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetResourcePoliciesRequest,
  output: GetResourcePoliciesResponse,
  errors: [
    InternalServerError,
    ResourceNotFoundException,
    ResourcePolicyInvalidParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Policies",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetServiceSettingError =
  | InternalServerError
  | ServiceSettingNotFound
  | CommonErrors;
/**
 * `ServiceSetting` is an account-level setting for an Amazon Web Services service. This setting
 * defines how a user interacts with or uses a service or a feature of a service. For example, if an
 * Amazon Web Services service charges money to the account based on feature or service usage, then the Amazon Web Services
 * service team might create a default setting of `false`. This means the user can't use
 * this feature unless they change the setting to `true` and intentionally opt in for a
 * paid feature.
 *
 * Services map a `SettingId` object to a setting value. Amazon Web Services services teams define
 * the default value for a `SettingId`. You can't create a new `SettingId`,
 * but you can overwrite the default value if you have the `ssm:UpdateServiceSetting`
 * permission for the setting. Use the UpdateServiceSetting API operation to
 * change the default setting. Or use the ResetServiceSetting to change the value
 * back to the original value defined by the Amazon Web Services service team.
 *
 * Query the current service setting for the Amazon Web Services account.
 */
export const getServiceSetting: API.OperationMethod<
  GetServiceSettingRequest,
  GetServiceSettingResult,
  GetServiceSettingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServiceSettingRequest,
  output: GetServiceSettingResult,
  errors: [InternalServerError, ServiceSettingNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceSetting",
}));

export type LabelParameterVersionError =
  | InternalServerError
  | ParameterNotFound
  | ParameterVersionLabelLimitExceeded
  | ParameterVersionNotFound
  | TooManyUpdates
  | CommonErrors;
/**
 * A parameter label is a user-defined alias to help you manage different versions of a
 * parameter. When you modify a parameter, Amazon Web Services Systems Manager automatically saves a new version and
 * increments the version number by one. A label can help you remember the purpose of a parameter
 * when there are multiple versions.
 *
 * Parameter labels have the following requirements and restrictions.
 *
 * - A version of a parameter can have a maximum of 10 labels.
 *
 * - You can't attach the same label to different versions of the same parameter. For example,
 * if version 1 has the label Production, then you can't attach Production to version 2.
 *
 * - You can move a label from one version of a parameter to another.
 *
 * - You can't create a label when you create a new parameter. You must attach a label to a
 * specific version of a parameter.
 *
 * - If you no longer want to use a parameter label, then you can either delete it or move it
 * to a different version of a parameter.
 *
 * - A label can have a maximum of 100 characters.
 *
 * - Labels can contain letters (case sensitive), numbers, periods (.), hyphens (-), or
 * underscores (_).
 *
 * - Labels can't begin with a number, "`aws`" or "`ssm`" (not case
 * sensitive). If a label fails to meet these requirements, then the label isn't associated with a
 * parameter and the system displays it in the list of InvalidLabels.
 *
 * - Parameter names can't contain spaces. The service removes any spaces specified for
 * the beginning or end of a parameter name. If the specified name for a parameter contains spaces
 * between characters, the request fails with a `ValidationException` error.
 */
export const labelParameterVersion: API.OperationMethod<
  LabelParameterVersionRequest,
  LabelParameterVersionResult,
  LabelParameterVersionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: LabelParameterVersionRequest,
  output: LabelParameterVersionResult,
  errors: [
    InternalServerError,
    ParameterNotFound,
    ParameterVersionLabelLimitExceeded,
    ParameterVersionNotFound,
    TooManyUpdates,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "LabelParameterVersion",
}));

export type ListAssociationsError =
  | InternalServerError
  | InvalidNextToken
  | CommonErrors;
/**
 * Returns all State Manager associations in the current Amazon Web Services account and Amazon Web Services Region. You
 * can limit the results to a specific State Manager association document or managed node by
 * specifying a filter. State Manager is a tool in Amazon Web Services Systems Manager.
 */
export const listAssociations: API.PaginatedOperationMethod<
  ListAssociationsRequest,
  ListAssociationsResult,
  ListAssociationsError,
  Creds | HttpClient.HttpClient,
  Association
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssociationsRequest,
  output: ListAssociationsResult,
  errors: [InternalServerError, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Associations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAssociationVersionsError =
  | AssociationDoesNotExist
  | InternalServerError
  | InvalidNextToken
  | CommonErrors;
/**
 * Retrieves all versions of an association for a specific association ID.
 */
export const listAssociationVersions: API.PaginatedOperationMethod<
  ListAssociationVersionsRequest,
  ListAssociationVersionsResult,
  ListAssociationVersionsError,
  Creds | HttpClient.HttpClient,
  AssociationVersionInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssociationVersionsRequest,
  output: ListAssociationVersionsResult,
  errors: [AssociationDoesNotExist, InternalServerError, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociationVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AssociationVersions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCloudConnectorsError = InternalServerError | CommonErrors;
/**
 * Returns a list of cloud connectors in the current Amazon Web Services account and Amazon Web Services Region.
 */
export const listCloudConnectors: API.PaginatedOperationMethod<
  ListCloudConnectorsRequest,
  ListCloudConnectorsResult,
  ListCloudConnectorsError,
  Creds | HttpClient.HttpClient,
  CloudConnectorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCloudConnectorsRequest,
  output: ListCloudConnectorsResult,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCloudConnectors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CloudConnectors",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCommandInvocationsError =
  | InternalServerError
  | InvalidCommandId
  | InvalidFilterKey
  | InvalidInstanceId
  | InvalidNextToken
  | CommonErrors;
/**
 * An invocation is copy of a command sent to a specific managed node. A command can apply to
 * one or more managed nodes. A command invocation applies to one managed node. For example, if a
 * user runs `SendCommand` against three managed nodes, then a command invocation is
 * created for each requested managed node ID. `ListCommandInvocations` provide status
 * about command execution.
 */
export const listCommandInvocations: API.PaginatedOperationMethod<
  ListCommandInvocationsRequest,
  ListCommandInvocationsResult,
  ListCommandInvocationsError,
  Creds | HttpClient.HttpClient,
  CommandInvocation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCommandInvocationsRequest,
  output: ListCommandInvocationsResult,
  errors: [
    InternalServerError,
    InvalidCommandId,
    InvalidFilterKey,
    InvalidInstanceId,
    InvalidNextToken,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCommandInvocations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CommandInvocations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCommandsError =
  | InternalServerError
  | InvalidCommandId
  | InvalidFilterKey
  | InvalidInstanceId
  | InvalidNextToken
  | CommonErrors;
/**
 * Lists the commands requested by users of the Amazon Web Services account.
 */
export const listCommands: API.PaginatedOperationMethod<
  ListCommandsRequest,
  ListCommandsResult,
  ListCommandsError,
  Creds | HttpClient.HttpClient,
  Command
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCommandsRequest,
  output: ListCommandsResult,
  errors: [
    InternalServerError,
    InvalidCommandId,
    InvalidFilterKey,
    InvalidInstanceId,
    InvalidNextToken,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCommands",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Commands",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListComplianceItemsError =
  | InternalServerError
  | InvalidFilter
  | InvalidNextToken
  | InvalidResourceId
  | InvalidResourceType
  | CommonErrors;
/**
 * For a specified resource ID, this API operation returns a list of compliance statuses for
 * different resource types. Currently, you can only specify one resource ID per call. List results
 * depend on the criteria specified in the filter.
 */
export const listComplianceItems: API.PaginatedOperationMethod<
  ListComplianceItemsRequest,
  ListComplianceItemsResult,
  ListComplianceItemsError,
  Creds | HttpClient.HttpClient,
  ComplianceItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListComplianceItemsRequest,
  output: ListComplianceItemsResult,
  errors: [
    InternalServerError,
    InvalidFilter,
    InvalidNextToken,
    InvalidResourceId,
    InvalidResourceType,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComplianceItems",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ComplianceItems",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListComplianceSummariesError =
  | InternalServerError
  | InvalidFilter
  | InvalidNextToken
  | CommonErrors;
/**
 * Returns a summary count of compliant and non-compliant resources for a compliance type. For
 * example, this call can return State Manager associations, patches, or custom compliance types
 * according to the filter criteria that you specify.
 */
export const listComplianceSummaries: API.PaginatedOperationMethod<
  ListComplianceSummariesRequest,
  ListComplianceSummariesResult,
  ListComplianceSummariesError,
  Creds | HttpClient.HttpClient,
  ComplianceSummaryItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListComplianceSummariesRequest,
  output: ListComplianceSummariesResult,
  errors: [InternalServerError, InvalidFilter, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComplianceSummaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ComplianceSummaryItems",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDocumentMetadataHistoryError =
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentVersion
  | InvalidNextToken
  | CommonErrors;
/**
 * Amazon Web Services Systems Manager Change Manager is no longer open to new customers. Existing customers can
 * continue to use the service as normal. For more information, see
 * Amazon Web Services Systems Manager Change Manager availability change.
 *
 * Information about approval reviews for a version of a change template in Change Manager.
 */
export const listDocumentMetadataHistory: API.OperationMethod<
  ListDocumentMetadataHistoryRequest,
  ListDocumentMetadataHistoryResponse,
  ListDocumentMetadataHistoryError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListDocumentMetadataHistoryRequest,
  output: ListDocumentMetadataHistoryResponse,
  errors: [
    InternalServerError,
    InvalidDocument,
    InvalidDocumentVersion,
    InvalidNextToken,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDocumentMetadataHistory",
}));

export type ListDocumentsError =
  | InternalServerError
  | InvalidFilterKey
  | InvalidNextToken
  | CommonErrors;
/**
 * Returns all Systems Manager (SSM) documents in the current Amazon Web Services account and Amazon Web Services Region. You can
 * limit the results of this request by using a filter.
 */
export const listDocuments: API.PaginatedOperationMethod<
  ListDocumentsRequest,
  ListDocumentsResult,
  ListDocumentsError,
  Creds | HttpClient.HttpClient,
  DocumentIdentifier
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDocumentsRequest,
  output: ListDocumentsResult,
  errors: [InternalServerError, InvalidFilterKey, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDocuments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DocumentIdentifiers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDocumentVersionsError =
  | InternalServerError
  | InvalidDocument
  | InvalidNextToken
  | CommonErrors;
/**
 * List all versions for a document.
 */
export const listDocumentVersions: API.PaginatedOperationMethod<
  ListDocumentVersionsRequest,
  ListDocumentVersionsResult,
  ListDocumentVersionsError,
  Creds | HttpClient.HttpClient,
  DocumentVersionInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDocumentVersionsRequest,
  output: ListDocumentVersionsResult,
  errors: [InternalServerError, InvalidDocument, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDocumentVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DocumentVersions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInventoryEntriesError =
  | InternalServerError
  | InvalidFilter
  | InvalidInstanceId
  | InvalidNextToken
  | InvalidTypeNameException
  | CommonErrors;
/**
 * A list of inventory items returned by the request.
 */
export const listInventoryEntries: API.OperationMethod<
  ListInventoryEntriesRequest,
  ListInventoryEntriesResult,
  ListInventoryEntriesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListInventoryEntriesRequest,
  output: ListInventoryEntriesResult,
  errors: [
    InternalServerError,
    InvalidFilter,
    InvalidInstanceId,
    InvalidNextToken,
    InvalidTypeNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInventoryEntries",
}));

export type ListNodesError =
  | InternalServerError
  | InvalidFilter
  | InvalidNextToken
  | ResourceDataSyncNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Takes in filters and returns a list of managed nodes matching the filter criteria.
 */
export const listNodes: API.PaginatedOperationMethod<
  ListNodesRequest,
  ListNodesResult,
  ListNodesError,
  Creds | HttpClient.HttpClient,
  Node
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNodesRequest,
  output: ListNodesResult,
  errors: [
    InternalServerError,
    InvalidFilter,
    InvalidNextToken,
    ResourceDataSyncNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNodes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Nodes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNodesSummaryError =
  | InternalServerError
  | InvalidAggregatorException
  | InvalidFilter
  | InvalidNextToken
  | ResourceDataSyncNotFoundException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Generates a summary of managed instance/node metadata based on the filters and aggregators
 * you specify. Results are grouped by the input aggregator you specify.
 */
export const listNodesSummary: API.PaginatedOperationMethod<
  ListNodesSummaryRequest,
  ListNodesSummaryResult,
  ListNodesSummaryError,
  Creds | HttpClient.HttpClient,
  { [key: string]: string | undefined }
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNodesSummaryRequest,
  output: ListNodesSummaryResult,
  errors: [
    InternalServerError,
    InvalidAggregatorException,
    InvalidFilter,
    InvalidNextToken,
    ResourceDataSyncNotFoundException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNodesSummary",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Summary",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOpsItemEventsError =
  | InternalServerError
  | OpsItemInvalidParameterException
  | OpsItemLimitExceededException
  | OpsItemNotFoundException
  | CommonErrors;
/**
 * Returns a list of all OpsItem events in the current Amazon Web Services Region and Amazon Web Services account. You can
 * limit the results to events associated with specific OpsItems by specifying a filter.
 */
export const listOpsItemEvents: API.PaginatedOperationMethod<
  ListOpsItemEventsRequest,
  ListOpsItemEventsResponse,
  ListOpsItemEventsError,
  Creds | HttpClient.HttpClient,
  OpsItemEventSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOpsItemEventsRequest,
  output: ListOpsItemEventsResponse,
  errors: [
    InternalServerError,
    OpsItemInvalidParameterException,
    OpsItemLimitExceededException,
    OpsItemNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOpsItemEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Summaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOpsItemRelatedItemsError =
  | InternalServerError
  | OpsItemInvalidParameterException
  | CommonErrors;
/**
 * Lists all related-item resources associated with a Systems Manager OpsCenter OpsItem. OpsCenter is a
 * tool in Amazon Web Services Systems Manager.
 */
export const listOpsItemRelatedItems: API.PaginatedOperationMethod<
  ListOpsItemRelatedItemsRequest,
  ListOpsItemRelatedItemsResponse,
  ListOpsItemRelatedItemsError,
  Creds | HttpClient.HttpClient,
  OpsItemRelatedItemSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOpsItemRelatedItemsRequest,
  output: ListOpsItemRelatedItemsResponse,
  errors: [InternalServerError, OpsItemInvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOpsItemRelatedItems",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Summaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOpsMetadataError =
  | InternalServerError
  | OpsMetadataInvalidArgumentException
  | CommonErrors;
/**
 * Amazon Web Services Systems Manager calls this API operation when displaying all Application Manager OpsMetadata objects or
 * blobs.
 */
export const listOpsMetadata: API.PaginatedOperationMethod<
  ListOpsMetadataRequest,
  ListOpsMetadataResult,
  ListOpsMetadataError,
  Creds | HttpClient.HttpClient,
  OpsMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOpsMetadataRequest,
  output: ListOpsMetadataResult,
  errors: [InternalServerError, OpsMetadataInvalidArgumentException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOpsMetadata",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OpsMetadataList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceComplianceSummariesError =
  | InternalServerError
  | InvalidFilter
  | InvalidNextToken
  | CommonErrors;
/**
 * Returns a resource-level summary count. The summary includes information about compliant and
 * non-compliant statuses and detailed compliance-item severity counts, according to the filter
 * criteria you specify.
 */
export const listResourceComplianceSummaries: API.PaginatedOperationMethod<
  ListResourceComplianceSummariesRequest,
  ListResourceComplianceSummariesResult,
  ListResourceComplianceSummariesError,
  Creds | HttpClient.HttpClient,
  ResourceComplianceSummaryItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourceComplianceSummariesRequest,
  output: ListResourceComplianceSummariesResult,
  errors: [InternalServerError, InvalidFilter, InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceComplianceSummaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceComplianceSummaryItems",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceDataSyncError =
  | InternalServerError
  | InvalidNextToken
  | ResourceDataSyncInvalidConfigurationException
  | CommonErrors;
/**
 * Lists your resource data sync configurations. Includes information about the last time a
 * sync attempted to start, the last sync status, and the last time a sync successfully
 * completed.
 *
 * The number of sync configurations might be too large to return using a single call to
 * `ListResourceDataSync`. You can limit the number of sync configurations returned by
 * using the `MaxResults` parameter. To determine whether there are more sync
 * configurations to list, check the value of `NextToken` in the output. If there are
 * more sync configurations to list, you can request them by specifying the `NextToken`
 * returned in the call to the parameter of a subsequent call.
 */
export const listResourceDataSync: API.PaginatedOperationMethod<
  ListResourceDataSyncRequest,
  ListResourceDataSyncResult,
  ListResourceDataSyncError,
  Creds | HttpClient.HttpClient,
  ResourceDataSyncItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourceDataSyncRequest,
  output: ListResourceDataSyncResult,
  errors: [
    InternalServerError,
    InvalidNextToken,
    ResourceDataSyncInvalidConfigurationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceDataSync",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceDataSyncItems",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerError
  | InvalidResourceId
  | InvalidResourceType
  | CommonErrors;
/**
 * Returns a list of the tags assigned to the specified resource.
 *
 * For information about the ID format for each supported resource type, see AddTagsToResource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResult,
  ListTagsForResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResult,
  errors: [InternalServerError, InvalidResourceId, InvalidResourceType],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ModifyDocumentPermissionError =
  | DocumentLimitExceeded
  | DocumentPermissionLimit
  | InternalServerError
  | InvalidDocument
  | InvalidPermissionType
  | CommonErrors;
/**
 * Shares a Amazon Web Services Systems Manager document (SSM document)publicly or privately. If you share a document
 * privately, you must specify the Amazon Web Services user IDs for those people who can use the document. If
 * you share a document publicly, you must specify *All* as the account
 * ID.
 */
export const modifyDocumentPermission: API.OperationMethod<
  ModifyDocumentPermissionRequest,
  ModifyDocumentPermissionResponse,
  ModifyDocumentPermissionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyDocumentPermissionRequest,
  output: ModifyDocumentPermissionResponse,
  errors: [
    DocumentLimitExceeded,
    DocumentPermissionLimit,
    InternalServerError,
    InvalidDocument,
    InvalidPermissionType,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyDocumentPermission",
}));

export type PutComplianceItemsError =
  | ComplianceTypeCountLimitExceededException
  | InternalServerError
  | InvalidItemContentException
  | InvalidResourceId
  | InvalidResourceType
  | ItemSizeLimitExceededException
  | TotalSizeLimitExceededException
  | CommonErrors;
/**
 * Registers a compliance type and other compliance details on a designated resource. This
 * operation lets you register custom compliance details with a resource. This call overwrites
 * existing compliance information on the resource, so you must provide a full list of compliance
 * items each time that you send the request.
 *
 * ComplianceType can be one of the following:
 *
 * - ExecutionId: The execution ID when the patch, association, or custom compliance item was
 * applied.
 *
 * - ExecutionType: Specify patch, association, or Custom:`string`.
 *
 * - ExecutionTime. The time the patch, association, or custom compliance item was applied to
 * the managed node.
 *
 * For State Manager associations, this represents the time when compliance status was
 * captured by the Systems Manager service during its internal compliance aggregation workflow, not
 * necessarily when the association was executed on the managed node. State Manager updates
 * compliance information for all associations on an instance whenever any association executes,
 * which may result in multiple associations showing the same execution time.
 *
 * - Id: The patch, association, or custom compliance ID.
 *
 * - Title: A title.
 *
 * - Status: The status of the compliance item. For example, `approved` for patches,
 * or `Failed` for associations.
 *
 * - Severity: A patch severity. For example, `Critical`.
 *
 * - DocumentName: An SSM document name. For example, `AWS-RunPatchBaseline`.
 *
 * - DocumentVersion: An SSM document version number. For example, 4.
 *
 * - Classification: A patch classification. For example, `security updates`.
 *
 * - PatchBaselineId: A patch baseline ID.
 *
 * - PatchSeverity: A patch severity. For example, `Critical`.
 *
 * - PatchState: A patch state. For example, `InstancesWithFailedPatches`.
 *
 * - PatchGroup: The name of a patch group.
 *
 * - InstalledTime: The time the association, patch, or custom compliance item was applied to
 * the resource. Specify the time by using the following format:
 * `yyyy-MM-dd'T'HH:mm:ss'Z'`
 */
export const putComplianceItems: API.OperationMethod<
  PutComplianceItemsRequest,
  PutComplianceItemsResult,
  PutComplianceItemsError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutComplianceItemsRequest,
  output: PutComplianceItemsResult,
  errors: [
    ComplianceTypeCountLimitExceededException,
    InternalServerError,
    InvalidItemContentException,
    InvalidResourceId,
    InvalidResourceType,
    ItemSizeLimitExceededException,
    TotalSizeLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutComplianceItems",
}));

export type PutInventoryError =
  | CustomSchemaCountLimitExceededException
  | InternalServerError
  | InvalidInstanceId
  | InvalidInventoryItemContextException
  | InvalidItemContentException
  | InvalidTypeNameException
  | ItemContentMismatchException
  | ItemSizeLimitExceededException
  | SubTypeCountLimitExceededException
  | TotalSizeLimitExceededException
  | UnsupportedInventoryItemContextException
  | UnsupportedInventorySchemaVersionException
  | CommonErrors;
/**
 * Bulk update custom inventory items on one or more managed nodes. The request adds an
 * inventory item, if it doesn't already exist, or updates an inventory item, if it does
 * exist.
 */
export const putInventory: API.OperationMethod<
  PutInventoryRequest,
  PutInventoryResult,
  PutInventoryError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutInventoryRequest,
  output: PutInventoryResult,
  errors: [
    CustomSchemaCountLimitExceededException,
    InternalServerError,
    InvalidInstanceId,
    InvalidInventoryItemContextException,
    InvalidItemContentException,
    InvalidTypeNameException,
    ItemContentMismatchException,
    ItemSizeLimitExceededException,
    SubTypeCountLimitExceededException,
    TotalSizeLimitExceededException,
    UnsupportedInventoryItemContextException,
    UnsupportedInventorySchemaVersionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutInventory",
}));

export type PutParameterError =
  | HierarchyLevelLimitExceededException
  | HierarchyTypeMismatchException
  | IncompatiblePolicyException
  | InternalServerError
  | InvalidAllowedPatternException
  | InvalidKeyId
  | InvalidPolicyAttributeException
  | InvalidPolicyTypeException
  | ParameterAlreadyExists
  | ParameterLimitExceeded
  | ParameterMaxVersionLimitExceeded
  | ParameterPatternMismatchException
  | PoliciesLimitExceededException
  | TooManyUpdates
  | UnsupportedParameterType
  | CommonErrors;
/**
 * Create or update a parameter in Parameter Store.
 *
 * Parameter Store throughput defines the number of API transactions per second (TPS) that
 * Systems Manager can process. This applies to `GetParameter`,
 * `GetParameters`, and `PutParameter` API calls for your Amazon Web Services account and
 * Amazon Web Services Region. By default, Parameter Store is configured with a standard throughput quota suitable
 * for low- to moderate-volume workloads. Applications that retrieve configuration data infrequently
 * or operate at smaller scale can use this default setting without additional cost.
 *
 * For higher-volume workloads, you can enable higher throughput. This increases the maximum
 * number of supported transactions per second for your account and Region. Increased throughput
 * supports applications and workloads that need concurrent access to multiple parameters. If you
 * experience `ThrottlingException: Rate exceeded` errors, enable higher throughput. For
 * more information, see Changing Parameter Store
 * throughput.
 */
export const putParameter: API.OperationMethod<
  PutParameterRequest,
  PutParameterResult,
  PutParameterError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutParameterRequest,
  output: PutParameterResult,
  errors: [
    HierarchyLevelLimitExceededException,
    HierarchyTypeMismatchException,
    IncompatiblePolicyException,
    InternalServerError,
    InvalidAllowedPatternException,
    InvalidKeyId,
    InvalidPolicyAttributeException,
    InvalidPolicyTypeException,
    ParameterAlreadyExists,
    ParameterLimitExceeded,
    ParameterMaxVersionLimitExceeded,
    ParameterPatternMismatchException,
    PoliciesLimitExceededException,
    TooManyUpdates,
    UnsupportedParameterType,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutParameter",
}));

export type PutResourcePolicyError =
  | InternalServerError
  | MalformedResourcePolicyDocumentException
  | ResourceNotFoundException
  | ResourcePolicyConflictException
  | ResourcePolicyInvalidParameterException
  | ResourcePolicyLimitExceededException
  | ResourcePolicyNotFoundException
  | CommonErrors;
/**
 * Creates or updates a Systems Manager resource policy. A resource policy helps you to define the
 * IAM entity (for example, an Amazon Web Services account) that can manage your Systems Manager resources.
 * The following resources support Systems Manager resource policies.
 *
 * - `OpsItemGroup` - The resource policy for `OpsItemGroup` enables
 * Amazon Web Services accounts to view and interact with OpsCenter operational work items (OpsItems).
 *
 * - `Parameter` - The resource policy is used to share a parameter with other
 * accounts using Resource Access Manager (RAM).
 *
 * To share a parameter, it must be in the advanced parameter tier. For information about
 * parameter tiers, see Managing
 * parameter tiers. For information about changing an existing standard parameter to an
 * advanced parameter, see Changing a standard parameter to an advanced parameter.
 *
 * To share a `SecureString` parameter, it must be encrypted with a customer managed key, and you must share the key separately through Key Management Service. Amazon Web Services managed keys cannot be shared. Parameters encrypted with the default Amazon Web Services managed key can be updated to use a customer managed key instead. For KMS key definitions, see KMS concepts in the
 * *Key Management Service Developer Guide*.
 *
 * While you can share a parameter using the Systems Manager `PutResourcePolicy` operation,
 * we recommend using Resource Access Manager (RAM) instead. This is because using
 * `PutResourcePolicy` requires the extra step of promoting the parameter to a
 * standard RAM Resource Share using the RAM
 * PromoteResourceShareCreatedFromPolicy API operation. Otherwise, the parameter won't
 * be returned by the Systems Manager DescribeParameters API operation using the `--shared` option.
 *
 * For more information, see Sharing a
 * parameter in the *Amazon Web Services Systems Manager User Guide*
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutResourcePolicyRequest,
  output: PutResourcePolicyResponse,
  errors: [
    InternalServerError,
    MalformedResourcePolicyDocumentException,
    ResourceNotFoundException,
    ResourcePolicyConflictException,
    ResourcePolicyInvalidParameterException,
    ResourcePolicyLimitExceededException,
    ResourcePolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type RegisterDefaultPatchBaselineError =
  | DoesNotExistException
  | InternalServerError
  | InvalidResourceId
  | CommonErrors;
/**
 * Defines the default patch baseline for the relevant operating system.
 *
 * To reset the Amazon Web Services-predefined patch baseline as the default, specify the full patch baseline
 * Amazon Resource Name (ARN) as the baseline ID value. For example, for CentOS, specify
 * `arn:aws:ssm:us-east-2:733109147000:patchbaseline/pb-0574b43a65ea646ed` instead of
 * `pb-0574b43a65ea646ed`.
 */
export const registerDefaultPatchBaseline: API.OperationMethod<
  RegisterDefaultPatchBaselineRequest,
  RegisterDefaultPatchBaselineResult,
  RegisterDefaultPatchBaselineError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterDefaultPatchBaselineRequest,
  output: RegisterDefaultPatchBaselineResult,
  errors: [DoesNotExistException, InternalServerError, InvalidResourceId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterDefaultPatchBaseline",
}));

export type RegisterPatchBaselineForPatchGroupError =
  | AlreadyExistsException
  | DoesNotExistException
  | InternalServerError
  | InvalidResourceId
  | ResourceLimitExceededException
  | CommonErrors;
/**
 * Registers a patch baseline for a patch group.
 */
export const registerPatchBaselineForPatchGroup: API.OperationMethod<
  RegisterPatchBaselineForPatchGroupRequest,
  RegisterPatchBaselineForPatchGroupResult,
  RegisterPatchBaselineForPatchGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterPatchBaselineForPatchGroupRequest,
  output: RegisterPatchBaselineForPatchGroupResult,
  errors: [
    AlreadyExistsException,
    DoesNotExistException,
    InternalServerError,
    InvalidResourceId,
    ResourceLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterPatchBaselineForPatchGroup",
}));

export type RegisterTargetWithMaintenanceWindowError =
  | DoesNotExistException
  | IdempotentParameterMismatch
  | InternalServerError
  | ResourceLimitExceededException
  | CommonErrors;
/**
 * Registers a target with a maintenance window.
 */
export const registerTargetWithMaintenanceWindow: API.OperationMethod<
  RegisterTargetWithMaintenanceWindowRequest,
  RegisterTargetWithMaintenanceWindowResult,
  RegisterTargetWithMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterTargetWithMaintenanceWindowRequest,
  output: RegisterTargetWithMaintenanceWindowResult,
  errors: [
    DoesNotExistException,
    IdempotentParameterMismatch,
    InternalServerError,
    ResourceLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterTargetWithMaintenanceWindow",
}));

export type RegisterTaskWithMaintenanceWindowError =
  | DoesNotExistException
  | FeatureNotAvailableException
  | IdempotentParameterMismatch
  | InternalServerError
  | ResourceLimitExceededException
  | CommonErrors;
/**
 * Adds a new task to a maintenance window.
 */
export const registerTaskWithMaintenanceWindow: API.OperationMethod<
  RegisterTaskWithMaintenanceWindowRequest,
  RegisterTaskWithMaintenanceWindowResult,
  RegisterTaskWithMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterTaskWithMaintenanceWindowRequest,
  output: RegisterTaskWithMaintenanceWindowResult,
  errors: [
    DoesNotExistException,
    FeatureNotAvailableException,
    IdempotentParameterMismatch,
    InternalServerError,
    ResourceLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterTaskWithMaintenanceWindow",
}));

export type RemoveTagsFromResourceError =
  | InternalServerError
  | InvalidResourceId
  | InvalidResourceType
  | TooManyUpdates
  | CommonErrors;
/**
 * Removes tag keys from the specified resource.
 */
export const removeTagsFromResource: API.OperationMethod<
  RemoveTagsFromResourceRequest,
  RemoveTagsFromResourceResult,
  RemoveTagsFromResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveTagsFromResourceRequest,
  output: RemoveTagsFromResourceResult,
  errors: [
    InternalServerError,
    InvalidResourceId,
    InvalidResourceType,
    TooManyUpdates,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTagsFromResource",
}));

export type ResetServiceSettingError =
  | InternalServerError
  | ServiceSettingNotFound
  | TooManyUpdates
  | CommonErrors;
/**
 * `ServiceSetting` is an account-level setting for an Amazon Web Services service. This setting
 * defines how a user interacts with or uses a service or a feature of a service. For example, if an
 * Amazon Web Services service charges money to the account based on feature or service usage, then the Amazon Web Services
 * service team might create a default setting of "false". This means the user can't use this
 * feature unless they change the setting to "true" and intentionally opt in for a paid
 * feature.
 *
 * Services map a `SettingId` object to a setting value. Amazon Web Services services teams define
 * the default value for a `SettingId`. You can't create a new `SettingId`,
 * but you can overwrite the default value if you have the `ssm:UpdateServiceSetting`
 * permission for the setting. Use the GetServiceSetting API operation to view the
 * current value. Use the UpdateServiceSetting API operation to change the default
 * setting.
 *
 * Reset the service setting for the account to the default value as provisioned by the Amazon Web Services
 * service team.
 */
export const resetServiceSetting: API.OperationMethod<
  ResetServiceSettingRequest,
  ResetServiceSettingResult,
  ResetServiceSettingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResetServiceSettingRequest,
  output: ResetServiceSettingResult,
  errors: [InternalServerError, ServiceSettingNotFound, TooManyUpdates],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetServiceSetting",
}));

export type ResumeSessionError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Reconnects a session to a managed node after it has been disconnected. Connections can be
 * resumed for disconnected sessions, but not terminated sessions.
 *
 * This command is primarily for use by client machines to automatically reconnect during
 * intermittent network issues. It isn't intended for any other use.
 */
export const resumeSession: API.OperationMethod<
  ResumeSessionRequest,
  ResumeSessionResponse,
  ResumeSessionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResumeSessionRequest,
  output: ResumeSessionResponse,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeSession",
}));

export type SendAutomationSignalError =
  | AutomationExecutionNotFoundException
  | AutomationStepNotFoundException
  | InternalServerError
  | InvalidAutomationSignalException
  | CommonErrors;
/**
 * Sends a signal to an Automation execution to change the current behavior or status of the
 * execution.
 */
export const sendAutomationSignal: API.OperationMethod<
  SendAutomationSignalRequest,
  SendAutomationSignalResult,
  SendAutomationSignalError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendAutomationSignalRequest,
  output: SendAutomationSignalResult,
  errors: [
    AutomationExecutionNotFoundException,
    AutomationStepNotFoundException,
    InternalServerError,
    InvalidAutomationSignalException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendAutomationSignal",
}));

export type SendCommandError =
  | DuplicateInstanceId
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentVersion
  | InvalidInstanceId
  | InvalidNotificationConfig
  | InvalidOutputFolder
  | InvalidParameters
  | InvalidRole
  | MaxDocumentSizeExceeded
  | UnsupportedPlatformType
  | CommonErrors;
/**
 * Runs commands on one or more managed nodes.
 */
export const sendCommand: API.OperationMethod<
  SendCommandRequest,
  SendCommandResult,
  SendCommandError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendCommandRequest,
  output: SendCommandResult,
  errors: [
    DuplicateInstanceId,
    InternalServerError,
    InvalidDocument,
    InvalidDocumentVersion,
    InvalidInstanceId,
    InvalidNotificationConfig,
    InvalidOutputFolder,
    InvalidParameters,
    InvalidRole,
    MaxDocumentSizeExceeded,
    UnsupportedPlatformType,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendCommand",
}));

export type StartAccessRequestError =
  | AccessDeniedException
  | InternalServerError
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the workflow for just-in-time node access sessions.
 */
export const startAccessRequest: API.OperationMethod<
  StartAccessRequestRequest,
  StartAccessRequestResponse,
  StartAccessRequestError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartAccessRequestRequest,
  output: StartAccessRequestResponse,
  errors: [
    AccessDeniedException,
    InternalServerError,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAccessRequest",
}));

export type StartAssociationsOnceError =
  | AssociationDoesNotExist
  | InvalidAssociation
  | CommonErrors;
/**
 * Runs an association immediately and only one time. This operation can be helpful when
 * troubleshooting associations.
 */
export const startAssociationsOnce: API.OperationMethod<
  StartAssociationsOnceRequest,
  StartAssociationsOnceResult,
  StartAssociationsOnceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartAssociationsOnceRequest,
  output: StartAssociationsOnceResult,
  errors: [AssociationDoesNotExist, InvalidAssociation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAssociationsOnce",
}));

export type StartAutomationExecutionError =
  | AutomationDefinitionNotFoundException
  | AutomationDefinitionVersionNotFoundException
  | AutomationExecutionLimitExceededException
  | IdempotentParameterMismatch
  | InternalServerError
  | InvalidAutomationExecutionParametersException
  | InvalidTarget
  | CommonErrors;
/**
 * Initiates execution of an Automation runbook.
 */
export const startAutomationExecution: API.OperationMethod<
  StartAutomationExecutionRequest,
  StartAutomationExecutionResult,
  StartAutomationExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartAutomationExecutionRequest,
  output: StartAutomationExecutionResult,
  errors: [
    AutomationDefinitionNotFoundException,
    AutomationDefinitionVersionNotFoundException,
    AutomationExecutionLimitExceededException,
    IdempotentParameterMismatch,
    InternalServerError,
    InvalidAutomationExecutionParametersException,
    InvalidTarget,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAutomationExecution",
}));

export type StartChangeRequestExecutionError =
  | AutomationDefinitionNotApprovedException
  | AutomationDefinitionNotFoundException
  | AutomationDefinitionVersionNotFoundException
  | AutomationExecutionLimitExceededException
  | IdempotentParameterMismatch
  | InternalServerError
  | InvalidAutomationExecutionParametersException
  | NoLongerSupportedException
  | CommonErrors;
/**
 * Amazon Web Services Systems Manager Change Manager is no longer open to new customers. Existing customers can
 * continue to use the service as normal. For more information, see
 * Amazon Web Services Systems Manager Change Manager availability change.
 *
 * Creates a change request for Change Manager. The Automation runbooks specified in the
 * change request run only after all required approvals for the change request have been
 * received.
 */
export const startChangeRequestExecution: API.OperationMethod<
  StartChangeRequestExecutionRequest,
  StartChangeRequestExecutionResult,
  StartChangeRequestExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartChangeRequestExecutionRequest,
  output: StartChangeRequestExecutionResult,
  errors: [
    AutomationDefinitionNotApprovedException,
    AutomationDefinitionNotFoundException,
    AutomationDefinitionVersionNotFoundException,
    AutomationExecutionLimitExceededException,
    IdempotentParameterMismatch,
    InternalServerError,
    InvalidAutomationExecutionParametersException,
    NoLongerSupportedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartChangeRequestExecution",
}));

export type StartExecutionPreviewError =
  | InternalServerError
  | ValidationException
  | CommonErrors;
/**
 * Initiates the process of creating a preview showing the effects that running a specified
 * Automation runbook would have on the targeted resources.
 */
export const startExecutionPreview: API.OperationMethod<
  StartExecutionPreviewRequest,
  StartExecutionPreviewResponse,
  StartExecutionPreviewError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartExecutionPreviewRequest,
  output: StartExecutionPreviewResponse,
  errors: [InternalServerError, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExecutionPreview",
}));

export type StartSessionError =
  | InternalServerError
  | InvalidDocument
  | TargetNotConnected
  | CommonErrors;
/**
 * Initiates a connection to a target (for example, a managed node) for a Session Manager session.
 * Returns a URL and token that can be used to open a WebSocket connection for sending input and
 * receiving outputs.
 *
 * Amazon Web Services CLI usage: `start-session` is an interactive command that requires the Session Manager
 * plugin to be installed on the client machine making the call. For information, see Install
 * the Session Manager plugin for the Amazon Web Services CLI in the *Amazon Web Services Systems Manager User Guide*.
 *
 * Amazon Web Services Tools for PowerShell usage: Start-SSMSession isn't currently supported by Amazon Web Services Tools
 * for PowerShell on Windows local machines.
 */
export const startSession: API.OperationMethod<
  StartSessionRequest,
  StartSessionResponse,
  StartSessionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartSessionRequest,
  output: StartSessionResponse,
  errors: [InternalServerError, InvalidDocument, TargetNotConnected],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSession",
}));

export type StopAutomationExecutionError =
  | AutomationExecutionNotFoundException
  | InternalServerError
  | InvalidAutomationStatusUpdateException
  | CommonErrors;
/**
 * Stop an Automation that is currently running.
 */
export const stopAutomationExecution: API.OperationMethod<
  StopAutomationExecutionRequest,
  StopAutomationExecutionResult,
  StopAutomationExecutionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopAutomationExecutionRequest,
  output: StopAutomationExecutionResult,
  errors: [
    AutomationExecutionNotFoundException,
    InternalServerError,
    InvalidAutomationStatusUpdateException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopAutomationExecution",
}));

export type TerminateSessionError = InternalServerError | CommonErrors;
/**
 * Permanently ends a session and closes the data connection between the Session Manager client and
 * SSM Agent on the managed node. A terminated session can't be resumed.
 */
export const terminateSession: API.OperationMethod<
  TerminateSessionRequest,
  TerminateSessionResponse,
  TerminateSessionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TerminateSessionRequest,
  output: TerminateSessionResponse,
  errors: [InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateSession",
}));

export type UnlabelParameterVersionError =
  | InternalServerError
  | ParameterNotFound
  | ParameterVersionNotFound
  | TooManyUpdates
  | CommonErrors;
/**
 * Remove a label or labels from a parameter.
 *
 * Parameter names can't contain spaces. The service removes any spaces specified for the
 * beginning or end of a parameter name. If the specified name for a parameter contains spaces
 * between characters, the request fails with a `ValidationException` error.
 */
export const unlabelParameterVersion: API.OperationMethod<
  UnlabelParameterVersionRequest,
  UnlabelParameterVersionResult,
  UnlabelParameterVersionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UnlabelParameterVersionRequest,
  output: UnlabelParameterVersionResult,
  errors: [
    InternalServerError,
    ParameterNotFound,
    ParameterVersionNotFound,
    TooManyUpdates,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnlabelParameterVersion",
}));

export type UpdateAssociationError =
  | AssociationDoesNotExist
  | AssociationVersionLimitExceeded
  | InternalServerError
  | InvalidAssociationVersion
  | InvalidDocument
  | InvalidDocumentVersion
  | InvalidOutputLocation
  | InvalidParameters
  | InvalidSchedule
  | InvalidTarget
  | InvalidTargetMaps
  | InvalidUpdate
  | TooManyUpdates
  | CommonErrors;
/**
 * Updates an association. You can update the association name and version, the document
 * version, schedule, parameters, and Amazon Simple Storage Service (Amazon S3) output. When you
 * call `UpdateAssociation`, the system removes all optional parameters from the request
 * and overwrites the association with null values for those parameters. This is by design. You must
 * specify all optional parameters in the call, even if you are not changing the parameters. This
 * includes the `Name` parameter. Before calling this API action, we recommend that you
 * call the DescribeAssociation API operation and make a note of all optional
 * parameters required for your `UpdateAssociation` call.
 *
 * In order to call this API operation, a user, group, or role must be granted permission to
 * call the DescribeAssociation API operation. If you don't have permission to
 * call `DescribeAssociation`, then you receive the following error: An error
 * occurred (AccessDeniedException) when calling the UpdateAssociation operation: User:
 * isn't authorized to perform: ssm:DescribeAssociation on resource:
 *
 * When you update an association, the association immediately runs against the specified
 * targets. You can add the `ApplyOnlyAtCronInterval` parameter to run the association
 * during the next schedule run.
 */
export const updateAssociation: API.OperationMethod<
  UpdateAssociationRequest,
  UpdateAssociationResult,
  UpdateAssociationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAssociationRequest,
  output: UpdateAssociationResult,
  errors: [
    AssociationDoesNotExist,
    AssociationVersionLimitExceeded,
    InternalServerError,
    InvalidAssociationVersion,
    InvalidDocument,
    InvalidDocumentVersion,
    InvalidOutputLocation,
    InvalidParameters,
    InvalidSchedule,
    InvalidTarget,
    InvalidTargetMaps,
    InvalidUpdate,
    TooManyUpdates,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssociation",
}));

export type UpdateAssociationStatusError =
  | AssociationDoesNotExist
  | InternalServerError
  | InvalidDocument
  | InvalidInstanceId
  | StatusUnchanged
  | TooManyUpdates
  | CommonErrors;
/**
 * Updates the status of the Amazon Web Services Systems Manager document (SSM document) associated with the specified
 * managed node.
 *
 * `UpdateAssociationStatus` is primarily used by the Amazon Web Services Systems Manager Agent (SSM Agent) to
 * report status updates about your associations and is only used for associations created with the
 * `InstanceId` legacy parameter.
 */
export const updateAssociationStatus: API.OperationMethod<
  UpdateAssociationStatusRequest,
  UpdateAssociationStatusResult,
  UpdateAssociationStatusError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAssociationStatusRequest,
  output: UpdateAssociationStatusResult,
  errors: [
    AssociationDoesNotExist,
    InternalServerError,
    InvalidDocument,
    InvalidInstanceId,
    StatusUnchanged,
    TooManyUpdates,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssociationStatus",
}));

export type UpdateCloudConnectorError =
  | ConflictException
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates an existing cloud connector with new configuration details.
 */
export const updateCloudConnector: API.OperationMethod<
  UpdateCloudConnectorRequest,
  UpdateCloudConnectorResult,
  UpdateCloudConnectorError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCloudConnectorRequest,
  output: UpdateCloudConnectorResult,
  errors: [ConflictException, InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCloudConnector",
}));

export type UpdateDocumentError =
  | DocumentVersionLimitExceeded
  | DuplicateDocumentContent
  | DuplicateDocumentVersionName
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentContent
  | InvalidDocumentOperation
  | InvalidDocumentSchemaVersion
  | InvalidDocumentVersion
  | MaxDocumentSizeExceeded
  | CommonErrors;
/**
 * Updates one or more values for an SSM document.
 */
export const updateDocument: API.OperationMethod<
  UpdateDocumentRequest,
  UpdateDocumentResult,
  UpdateDocumentError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDocumentRequest,
  output: UpdateDocumentResult,
  errors: [
    DocumentVersionLimitExceeded,
    DuplicateDocumentContent,
    DuplicateDocumentVersionName,
    InternalServerError,
    InvalidDocument,
    InvalidDocumentContent,
    InvalidDocumentOperation,
    InvalidDocumentSchemaVersion,
    InvalidDocumentVersion,
    MaxDocumentSizeExceeded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDocument",
}));

export type UpdateDocumentDefaultVersionError =
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentSchemaVersion
  | InvalidDocumentVersion
  | CommonErrors;
/**
 * Set the default version of a document.
 *
 * If you change a document version for a State Manager association, Systems Manager immediately runs
 * the association unless you previously specifed the `apply-only-at-cron-interval`
 * parameter.
 */
export const updateDocumentDefaultVersion: API.OperationMethod<
  UpdateDocumentDefaultVersionRequest,
  UpdateDocumentDefaultVersionResult,
  UpdateDocumentDefaultVersionError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDocumentDefaultVersionRequest,
  output: UpdateDocumentDefaultVersionResult,
  errors: [
    InternalServerError,
    InvalidDocument,
    InvalidDocumentSchemaVersion,
    InvalidDocumentVersion,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDocumentDefaultVersion",
}));

export type UpdateDocumentMetadataError =
  | InternalServerError
  | InvalidDocument
  | InvalidDocumentOperation
  | InvalidDocumentVersion
  | TooManyUpdates
  | CommonErrors;
/**
 * Amazon Web Services Systems Manager Change Manager is no longer open to new customers. Existing customers can
 * continue to use the service as normal. For more information, see
 * Amazon Web Services Systems Manager Change Manager availability change.
 *
 * Updates information related to approval reviews for a specific version of a change template
 * in Change Manager.
 */
export const updateDocumentMetadata: API.OperationMethod<
  UpdateDocumentMetadataRequest,
  UpdateDocumentMetadataResponse,
  UpdateDocumentMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDocumentMetadataRequest,
  output: UpdateDocumentMetadataResponse,
  errors: [
    InternalServerError,
    InvalidDocument,
    InvalidDocumentOperation,
    InvalidDocumentVersion,
    TooManyUpdates,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDocumentMetadata",
}));

export type UpdateMaintenanceWindowError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Updates an existing maintenance window. Only specified parameters are modified.
 *
 * The value you specify for `Duration` determines the specific end time for the
 * maintenance window based on the time it begins. No maintenance window tasks are permitted to
 * start after the resulting endtime minus the number of hours you specify for `Cutoff`.
 * For example, if the maintenance window starts at 3 PM, the duration is three hours, and the
 * value you specify for `Cutoff` is one hour, no maintenance window tasks can start
 * after 5 PM.
 */
export const updateMaintenanceWindow: API.OperationMethod<
  UpdateMaintenanceWindowRequest,
  UpdateMaintenanceWindowResult,
  UpdateMaintenanceWindowError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMaintenanceWindowRequest,
  output: UpdateMaintenanceWindowResult,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMaintenanceWindow",
}));

export type UpdateMaintenanceWindowTargetError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Modifies the target of an existing maintenance window. You
 * can change the following:
 *
 * - Name
 *
 * - Description
 *
 * - Owner
 *
 * - IDs for an ID target
 *
 * - Tags for a Tag target
 *
 * - From any supported tag type to another. The three supported tag types are ID target, Tag
 * target, and resource group. For more information, see Target.
 *
 * If a parameter is null, then the corresponding field isn't modified.
 */
export const updateMaintenanceWindowTarget: API.OperationMethod<
  UpdateMaintenanceWindowTargetRequest,
  UpdateMaintenanceWindowTargetResult,
  UpdateMaintenanceWindowTargetError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMaintenanceWindowTargetRequest,
  output: UpdateMaintenanceWindowTargetResult,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMaintenanceWindowTarget",
}));

export type UpdateMaintenanceWindowTaskError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Modifies a task assigned to a maintenance window. You can't change the task type, but you
 * can change the following values:
 *
 * - `TaskARN`. For example, you can change a `RUN_COMMAND` task from
 * `AWS-RunPowerShellScript` to `AWS-RunShellScript`.
 *
 * - `ServiceRoleArn`
 *
 * - `TaskInvocationParameters`
 *
 * - `Priority`
 *
 * - `MaxConcurrency`
 *
 * - `MaxErrors`
 *
 * One or more targets must be specified for maintenance window Run Command-type tasks.
 * Depending on the task, targets are optional for other maintenance window task types (Automation,
 * Lambda, and Step Functions). For more information about running tasks
 * that don't specify targets, see Registering
 * maintenance window tasks without targets in the
 * *Amazon Web Services Systems Manager User Guide*.
 *
 * If the value for a parameter in `UpdateMaintenanceWindowTask` is null, then the
 * corresponding field isn't modified. If you set `Replace` to true, then all fields
 * required by the RegisterTaskWithMaintenanceWindow operation are required for
 * this request. Optional fields that aren't specified are set to null.
 *
 * When you update a maintenance window task that has options specified in
 * `TaskInvocationParameters`, you must provide again all the
 * `TaskInvocationParameters` values that you want to retain. The values you don't
 * specify again are removed. For example, suppose that when you registered a Run Command task, you
 * specified `TaskInvocationParameters` values for `Comment`,
 * `NotificationConfig`, and `OutputS3BucketName`. If you update the
 * maintenance window task and specify only a different `OutputS3BucketName` value, the
 * values for `Comment` and `NotificationConfig` are removed.
 */
export const updateMaintenanceWindowTask: API.OperationMethod<
  UpdateMaintenanceWindowTaskRequest,
  UpdateMaintenanceWindowTaskResult,
  UpdateMaintenanceWindowTaskError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMaintenanceWindowTaskRequest,
  output: UpdateMaintenanceWindowTaskResult,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMaintenanceWindowTask",
}));

export type UpdateManagedInstanceRoleError =
  | InternalServerError
  | InvalidInstanceId
  | CommonErrors;
/**
 * Changes the Identity and Access Management (IAM) role that is assigned to the
 * on-premises server, edge device, or virtual machines (VM). IAM roles are first
 * assigned to these hybrid nodes during the activation process. For more information, see CreateActivation.
 */
export const updateManagedInstanceRole: API.OperationMethod<
  UpdateManagedInstanceRoleRequest,
  UpdateManagedInstanceRoleResult,
  UpdateManagedInstanceRoleError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateManagedInstanceRoleRequest,
  output: UpdateManagedInstanceRoleResult,
  errors: [InternalServerError, InvalidInstanceId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateManagedInstanceRole",
}));

export type UpdateOpsItemError =
  | InternalServerError
  | OpsItemAccessDeniedException
  | OpsItemAlreadyExistsException
  | OpsItemConflictException
  | OpsItemInvalidParameterException
  | OpsItemLimitExceededException
  | OpsItemNotFoundException
  | CommonErrors;
/**
 * Edit or change an OpsItem. You must have permission in Identity and Access Management (IAM) to update an OpsItem. For more information, see Set up OpsCenter in the
 * *Amazon Web Services Systems Manager User Guide*.
 *
 * Operations engineers and IT professionals use Amazon Web Services Systems Manager OpsCenter to view, investigate, and
 * remediate operational issues impacting the performance and health of their Amazon Web Services resources. For
 * more information, see Amazon Web Services Systems Manager OpsCenter in the
 * *Amazon Web Services Systems Manager User Guide*.
 */
export const updateOpsItem: API.OperationMethod<
  UpdateOpsItemRequest,
  UpdateOpsItemResponse,
  UpdateOpsItemError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateOpsItemRequest,
  output: UpdateOpsItemResponse,
  errors: [
    InternalServerError,
    OpsItemAccessDeniedException,
    OpsItemAlreadyExistsException,
    OpsItemConflictException,
    OpsItemInvalidParameterException,
    OpsItemLimitExceededException,
    OpsItemNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOpsItem",
}));

export type UpdateOpsMetadataError =
  | InternalServerError
  | OpsMetadataInvalidArgumentException
  | OpsMetadataKeyLimitExceededException
  | OpsMetadataNotFoundException
  | OpsMetadataTooManyUpdatesException
  | CommonErrors;
/**
 * Amazon Web Services Systems Manager calls this API operation when you edit OpsMetadata in Application Manager.
 */
export const updateOpsMetadata: API.OperationMethod<
  UpdateOpsMetadataRequest,
  UpdateOpsMetadataResult,
  UpdateOpsMetadataError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateOpsMetadataRequest,
  output: UpdateOpsMetadataResult,
  errors: [
    InternalServerError,
    OpsMetadataInvalidArgumentException,
    OpsMetadataKeyLimitExceededException,
    OpsMetadataNotFoundException,
    OpsMetadataTooManyUpdatesException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOpsMetadata",
}));

export type UpdatePatchBaselineError =
  | DoesNotExistException
  | InternalServerError
  | CommonErrors;
/**
 * Modifies an existing patch baseline. Fields not specified in the request are left
 * unchanged.
 *
 * For information about valid key-value pairs in `PatchFilters` for each supported
 * operating system type, see PatchFilter.
 */
export const updatePatchBaseline: API.OperationMethod<
  UpdatePatchBaselineRequest,
  UpdatePatchBaselineResult,
  UpdatePatchBaselineError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePatchBaselineRequest,
  output: UpdatePatchBaselineResult,
  errors: [DoesNotExistException, InternalServerError],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePatchBaseline",
}));

export type UpdateResourceDataSyncError =
  | InternalServerError
  | ResourceDataSyncConflictException
  | ResourceDataSyncInvalidConfigurationException
  | ResourceDataSyncNotFoundException
  | CommonErrors;
/**
 * Update a resource data sync. After you create a resource data sync for a Region, you can't
 * change the account options for that sync. For example, if you create a sync in the us-east-2
 * (Ohio) Region and you choose the `Include only the current account` option, you can't
 * edit that sync later and choose the Include all accounts from my Organizations
 * configuration option. Instead, you must delete the first resource data sync, and create a
 * new one.
 *
 * This API operation only supports a resource data sync that was created with a
 * SyncFromSource `SyncType`.
 */
export const updateResourceDataSync: API.OperationMethod<
  UpdateResourceDataSyncRequest,
  UpdateResourceDataSyncResult,
  UpdateResourceDataSyncError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateResourceDataSyncRequest,
  output: UpdateResourceDataSyncResult,
  errors: [
    InternalServerError,
    ResourceDataSyncConflictException,
    ResourceDataSyncInvalidConfigurationException,
    ResourceDataSyncNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResourceDataSync",
}));

export type UpdateServiceSettingError =
  | InternalServerError
  | ServiceSettingNotFound
  | TooManyUpdates
  | CommonErrors;
/**
 * `ServiceSetting` is an account-level setting for an Amazon Web Services service. This setting
 * defines how a user interacts with or uses a service or a feature of a service. For example, if an
 * Amazon Web Services service charges money to the account based on feature or service usage, then the Amazon Web Services
 * service team might create a default setting of "false". This means the user can't use this
 * feature unless they change the setting to "true" and intentionally opt in for a paid
 * feature.
 *
 * Services map a `SettingId` object to a setting value. Amazon Web Services services teams define
 * the default value for a `SettingId`. You can't create a new `SettingId`,
 * but you can overwrite the default value if you have the `ssm:UpdateServiceSetting`
 * permission for the setting. Use the GetServiceSetting API operation to view the
 * current value. Or, use the ResetServiceSetting to change the value back to the
 * original value defined by the Amazon Web Services service team.
 *
 * Update the service setting for the account.
 */
export const updateServiceSetting: API.OperationMethod<
  UpdateServiceSettingRequest,
  UpdateServiceSettingResult,
  UpdateServiceSettingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServiceSettingRequest,
  output: UpdateServiceSettingResult,
  errors: [InternalServerError, ServiceSettingNotFound, TooManyUpdates],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceSetting",
}));

export type ValidateCloudConnectorError =
  | InternalServerError
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Validates the configuration and connectivity of a cloud connector.
 */
export const validateCloudConnector: API.PaginatedOperationMethod<
  ValidateCloudConnectorRequest,
  ValidateCloudConnectorResult,
  ValidateCloudConnectorError,
  Creds | HttpClient.HttpClient,
  ValidationFinding
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ValidateCloudConnectorRequest,
  output: ValidateCloudConnectorResult,
  errors: [InternalServerError, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateCloudConnector",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ValidationFindings",
    pageSize: "MaxResults",
  } as const,
})) as any;
