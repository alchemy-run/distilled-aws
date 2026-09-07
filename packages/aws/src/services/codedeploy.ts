import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace("http://codedeploy.amazonaws.com/doc/2014-10-06/");
const svc = T.AwsApiService({
  sdkId: "CodeDeploy",
  serviceShapeName: "CodeDeploy_20141006",
});
const auth = T.AwsAuthSigv4({ name: "codedeploy" });
const ver = T.ServiceVersion("2014-10-06");
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
              `https://codedeploy-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://codedeploy-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://codedeploy.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://codedeploy.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AlarmsLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<AlarmsLimitExceededException>()(
    "AlarmsLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ApplicationAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ApplicationAlreadyExistsException>()(
    "ApplicationAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class ApplicationDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<ApplicationDoesNotExistException>()(
    "ApplicationDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ApplicationLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ApplicationLimitExceededException>()(
    "ApplicationLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ApplicationNameRequiredException
  extends /*@__PURE__*/ S.TaggedError<ApplicationNameRequiredException>()(
    "ApplicationNameRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ArnNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<ArnNotSupportedException>()(
    "ArnNotSupportedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class BatchLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<BatchLimitExceededException>()(
    "BatchLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class BucketNameFilterRequiredException
  extends /*@__PURE__*/ S.TaggedError<BucketNameFilterRequiredException>()(
    "BucketNameFilterRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DeploymentAlreadyCompletedException
  extends /*@__PURE__*/ S.TaggedError<DeploymentAlreadyCompletedException>()(
    "DeploymentAlreadyCompletedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DeploymentConfigAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<DeploymentConfigAlreadyExistsException>()(
    "DeploymentConfigAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class DeploymentConfigDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<DeploymentConfigDoesNotExistException>()(
    "DeploymentConfigDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DeploymentConfigInUseException
  extends /*@__PURE__*/ S.TaggedError<DeploymentConfigInUseException>()(
    "DeploymentConfigInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DeploymentConfigLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<DeploymentConfigLimitExceededException>()(
    "DeploymentConfigLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DeploymentConfigNameRequiredException
  extends /*@__PURE__*/ S.TaggedError<DeploymentConfigNameRequiredException>()(
    "DeploymentConfigNameRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DeploymentDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<DeploymentDoesNotExistException>()(
    "DeploymentDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DeploymentGroupAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<DeploymentGroupAlreadyExistsException>()(
    "DeploymentGroupAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class DeploymentGroupDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<DeploymentGroupDoesNotExistException>()(
    "DeploymentGroupDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DeploymentGroupLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<DeploymentGroupLimitExceededException>()(
    "DeploymentGroupLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DeploymentGroupNameRequiredException
  extends /*@__PURE__*/ S.TaggedError<DeploymentGroupNameRequiredException>()(
    "DeploymentGroupNameRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DeploymentIdRequiredException
  extends /*@__PURE__*/ S.TaggedError<DeploymentIdRequiredException>()(
    "DeploymentIdRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DeploymentIsNotInReadyStateException
  extends /*@__PURE__*/ S.TaggedError<DeploymentIsNotInReadyStateException>()(
    "DeploymentIsNotInReadyStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DeploymentLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<DeploymentLimitExceededException>()(
    "DeploymentLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DeploymentNotStartedException
  extends /*@__PURE__*/ S.TaggedError<DeploymentNotStartedException>()(
    "DeploymentNotStartedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DeploymentTargetDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<DeploymentTargetDoesNotExistException>()(
    "DeploymentTargetDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DeploymentTargetIdRequiredException
  extends /*@__PURE__*/ S.TaggedError<DeploymentTargetIdRequiredException>()(
    "DeploymentTargetIdRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DeploymentTargetListSizeExceededException
  extends /*@__PURE__*/ S.TaggedError<DeploymentTargetListSizeExceededException>()(
    "DeploymentTargetListSizeExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DescriptionTooLongException
  extends /*@__PURE__*/ S.TaggedError<DescriptionTooLongException>()(
    "DescriptionTooLongException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ECSServiceMappingLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ECSServiceMappingLimitExceededException>()(
    "ECSServiceMappingLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class GitHubAccountTokenDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<GitHubAccountTokenDoesNotExistException>()(
    "GitHubAccountTokenDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class GitHubAccountTokenNameRequiredException
  extends /*@__PURE__*/ S.TaggedError<GitHubAccountTokenNameRequiredException>()(
    "GitHubAccountTokenNameRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class IamArnRequiredException
  extends /*@__PURE__*/ S.TaggedError<IamArnRequiredException>()(
    "IamArnRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class IamSessionArnAlreadyRegisteredException
  extends /*@__PURE__*/ S.TaggedError<IamSessionArnAlreadyRegisteredException>()(
    "IamSessionArnAlreadyRegisteredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class IamUserArnAlreadyRegisteredException
  extends /*@__PURE__*/ S.TaggedError<IamUserArnAlreadyRegisteredException>()(
    "IamUserArnAlreadyRegisteredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class IamUserArnRequiredException
  extends /*@__PURE__*/ S.TaggedError<IamUserArnRequiredException>()(
    "IamUserArnRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InstanceDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<InstanceDoesNotExistException>()(
    "InstanceDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InstanceIdRequiredException
  extends /*@__PURE__*/ S.TaggedError<InstanceIdRequiredException>()(
    "InstanceIdRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InstanceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<InstanceLimitExceededException>()(
    "InstanceLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InstanceNameAlreadyRegisteredException
  extends /*@__PURE__*/ S.TaggedError<InstanceNameAlreadyRegisteredException>()(
    "InstanceNameAlreadyRegisteredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InstanceNameRequiredException
  extends /*@__PURE__*/ S.TaggedError<InstanceNameRequiredException>()(
    "InstanceNameRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InstanceNotRegisteredException
  extends /*@__PURE__*/ S.TaggedError<InstanceNotRegisteredException>()(
    "InstanceNotRegisteredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidAlarmConfigException
  extends /*@__PURE__*/ S.TaggedError<InvalidAlarmConfigException>()(
    "InvalidAlarmConfigException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidApplicationNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidApplicationNameException>()(
    "InvalidApplicationNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidArnException>()(
    "InvalidArnException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidAutoRollbackConfigException
  extends /*@__PURE__*/ S.TaggedError<InvalidAutoRollbackConfigException>()(
    "InvalidAutoRollbackConfigException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidAutoScalingGroupException
  extends /*@__PURE__*/ S.TaggedError<InvalidAutoScalingGroupException>()(
    "InvalidAutoScalingGroupException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidBlueGreenDeploymentConfigurationException
  extends /*@__PURE__*/ S.TaggedError<InvalidBlueGreenDeploymentConfigurationException>()(
    "InvalidBlueGreenDeploymentConfigurationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidBucketNameFilterException
  extends /*@__PURE__*/ S.TaggedError<InvalidBucketNameFilterException>()(
    "InvalidBucketNameFilterException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidComputePlatformException
  extends /*@__PURE__*/ S.TaggedError<InvalidComputePlatformException>()(
    "InvalidComputePlatformException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidDeployedStateFilterException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeployedStateFilterException>()(
    "InvalidDeployedStateFilterException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidDeploymentConfigNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeploymentConfigNameException>()(
    "InvalidDeploymentConfigNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidDeploymentGroupNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeploymentGroupNameException>()(
    "InvalidDeploymentGroupNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidDeploymentIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeploymentIdException>()(
    "InvalidDeploymentIdException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidDeploymentInstanceTypeException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeploymentInstanceTypeException>()(
    "InvalidDeploymentInstanceTypeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidDeploymentStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeploymentStatusException>()(
    "InvalidDeploymentStatusException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidDeploymentStyleException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeploymentStyleException>()(
    "InvalidDeploymentStyleException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidDeploymentTargetIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeploymentTargetIdException>()(
    "InvalidDeploymentTargetIdException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidDeploymentWaitTypeException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeploymentWaitTypeException>()(
    "InvalidDeploymentWaitTypeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidEC2TagCombinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidEC2TagCombinationException>()(
    "InvalidEC2TagCombinationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidEC2TagException
  extends /*@__PURE__*/ S.TaggedError<InvalidEC2TagException>()(
    "InvalidEC2TagException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidECSServiceException
  extends /*@__PURE__*/ S.TaggedError<InvalidECSServiceException>()(
    "InvalidECSServiceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidExternalIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidExternalIdException>()(
    "InvalidExternalIdException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidFileExistsBehaviorException
  extends /*@__PURE__*/ S.TaggedError<InvalidFileExistsBehaviorException>()(
    "InvalidFileExistsBehaviorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidGitHubAccountTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidGitHubAccountTokenException>()(
    "InvalidGitHubAccountTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidGitHubAccountTokenNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidGitHubAccountTokenNameException>()(
    "InvalidGitHubAccountTokenNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidIamSessionArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidIamSessionArnException>()(
    "InvalidIamSessionArnException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidIamUserArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidIamUserArnException>()(
    "InvalidIamUserArnException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidIgnoreApplicationStopFailuresValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidIgnoreApplicationStopFailuresValueException>()(
    "InvalidIgnoreApplicationStopFailuresValueException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidInstanceNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidInstanceNameException>()(
    "InvalidInstanceNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidInstanceStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidInstanceStatusException>()(
    "InvalidInstanceStatusException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidInstanceTypeException
  extends /*@__PURE__*/ S.TaggedError<InvalidInstanceTypeException>()(
    "InvalidInstanceTypeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidKeyPrefixFilterException
  extends /*@__PURE__*/ S.TaggedError<InvalidKeyPrefixFilterException>()(
    "InvalidKeyPrefixFilterException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidLifecycleEventHookExecutionIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidLifecycleEventHookExecutionIdException>()(
    "InvalidLifecycleEventHookExecutionIdException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidLifecycleEventHookExecutionStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidLifecycleEventHookExecutionStatusException>()(
    "InvalidLifecycleEventHookExecutionStatusException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidLoadBalancerInfoException
  extends /*@__PURE__*/ S.TaggedError<InvalidLoadBalancerInfoException>()(
    "InvalidLoadBalancerInfoException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidMinimumHealthyHostValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidMinimumHealthyHostValueException>()(
    "InvalidMinimumHealthyHostValueException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidOnPremisesTagCombinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidOnPremisesTagCombinationException>()(
    "InvalidOnPremisesTagCombinationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidOperationException
  extends /*@__PURE__*/ S.TaggedError<InvalidOperationException>()(
    "InvalidOperationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidRegistrationStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidRegistrationStatusException>()(
    "InvalidRegistrationStatusException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidRevisionException
  extends /*@__PURE__*/ S.TaggedError<InvalidRevisionException>()(
    "InvalidRevisionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidRoleException
  extends /*@__PURE__*/ S.TaggedError<InvalidRoleException>()(
    "InvalidRoleException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidSortByException
  extends /*@__PURE__*/ S.TaggedError<InvalidSortByException>()(
    "InvalidSortByException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidSortOrderException
  extends /*@__PURE__*/ S.TaggedError<InvalidSortOrderException>()(
    "InvalidSortOrderException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidTagException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagException>()(
    "InvalidTagException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidTagFilterException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagFilterException>()(
    "InvalidTagFilterException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidTagsToAddException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagsToAddException>()(
    "InvalidTagsToAddException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidTargetFilterNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidTargetFilterNameException>()(
    "InvalidTargetFilterNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidTargetGroupPairException
  extends /*@__PURE__*/ S.TaggedError<InvalidTargetGroupPairException>()(
    "InvalidTargetGroupPairException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidTargetInstancesException
  extends /*@__PURE__*/ S.TaggedError<InvalidTargetInstancesException>()(
    "InvalidTargetInstancesException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidTimeRangeException
  extends /*@__PURE__*/ S.TaggedError<InvalidTimeRangeException>()(
    "InvalidTimeRangeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidTrafficRoutingConfigurationException
  extends /*@__PURE__*/ S.TaggedError<InvalidTrafficRoutingConfigurationException>()(
    "InvalidTrafficRoutingConfigurationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidTriggerConfigException
  extends /*@__PURE__*/ S.TaggedError<InvalidTriggerConfigException>()(
    "InvalidTriggerConfigException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidUpdateOutdatedInstancesOnlyValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidUpdateOutdatedInstancesOnlyValueException>()(
    "InvalidUpdateOutdatedInstancesOnlyValueException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidZonalDeploymentConfigurationException
  extends /*@__PURE__*/ S.TaggedError<InvalidZonalDeploymentConfigurationException>()(
    "InvalidZonalDeploymentConfigurationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class LifecycleEventAlreadyCompletedException
  extends /*@__PURE__*/ S.TaggedError<LifecycleEventAlreadyCompletedException>()(
    "LifecycleEventAlreadyCompletedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class LifecycleHookLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LifecycleHookLimitExceededException>()(
    "LifecycleHookLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MultipleIamArnsProvidedException
  extends /*@__PURE__*/ S.TaggedError<MultipleIamArnsProvidedException>()(
    "MultipleIamArnsProvidedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class OperationNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<OperationNotSupportedException>()(
    "OperationNotSupportedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceArnRequiredException
  extends /*@__PURE__*/ S.TaggedError<ResourceArnRequiredException>()(
    "ResourceArnRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceValidationException
  extends /*@__PURE__*/ S.TaggedError<ResourceValidationException>()(
    "ResourceValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RevisionDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<RevisionDoesNotExistException>()(
    "RevisionDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RevisionRequiredException
  extends /*@__PURE__*/ S.TaggedError<RevisionRequiredException>()(
    "RevisionRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RoleRequiredException
  extends /*@__PURE__*/ S.TaggedError<RoleRequiredException>()(
    "RoleRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TagLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<TagLimitExceededException>()(
    "TagLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TagRequiredException
  extends /*@__PURE__*/ S.TaggedError<TagRequiredException>()(
    "TagRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TagSetListLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<TagSetListLimitExceededException>()(
    "TagSetListLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TriggerTargetsLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<TriggerTargetsLimitExceededException>()(
    "TriggerTargetsLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class UnsupportedActionForDeploymentTypeException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedActionForDeploymentTypeException>()(
    "UnsupportedActionForDeploymentTypeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type Key = string;
export type Value = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export type InstanceName = string;
export type InstanceNameList = string[];
export const InstanceNameList = /*@__PURE__*/ S.Array(S.String);
export interface AddTagsToOnPremisesInstancesInput {
  tags: Tag[];
  instanceNames: string[];
}
export const AddTagsToOnPremisesInstancesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: TagList, instanceNames: InstanceNameList }).pipe(
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
  identifier: "AddTagsToOnPremisesInstancesInput",
}) as any as S.Schema<AddTagsToOnPremisesInstancesInput>;
export interface AddTagsToOnPremisesInstancesResponse {}
export const AddTagsToOnPremisesInstancesResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "AddTagsToOnPremisesInstancesResponse",
}) as any as S.Schema<AddTagsToOnPremisesInstancesResponse>;
export type ApplicationName = string;
export type RevisionLocationType =
  | "S3"
  | "GitHub"
  | "String"
  | "AppSpecContent"
  | (string & {});
export const RevisionLocationType = /*@__PURE__*/ S.String;

export type S3Bucket = string;
export type S3Key = string;
export type BundleType =
  | "tar"
  | "tgz"
  | "zip"
  | "YAML"
  | "JSON"
  | (string & {});
export const BundleType = /*@__PURE__*/ S.String;

export type VersionId = string;
export type ETag = string;
export interface S3Location {
  bucket?: string;
  key?: string;
  bundleType?: BundleType;
  version?: string;
  eTag?: string;
}
export const S3Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bucket: S.optional(S.String),
    key: S.optional(S.String),
    bundleType: S.optional(BundleType),
    version: S.optional(S.String),
    eTag: S.optional(S.String),
  }),
).annotate({ identifier: "S3Location" }) as any as S.Schema<S3Location>;
export type Repository = string;
export type CommitId = string;
export interface GitHubLocation {
  repository?: string;
  commitId?: string;
}
export const GitHubLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repository: S.optional(S.String),
    commitId: S.optional(S.String),
  }),
).annotate({ identifier: "GitHubLocation" }) as any as S.Schema<GitHubLocation>;
export type RawStringContent = string;
export type RawStringSha256 = string;
export interface RawString {
  content?: string;
  sha256?: string;
}
export const RawString = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ content: S.optional(S.String), sha256: S.optional(S.String) }),
).annotate({ identifier: "RawString" }) as any as S.Schema<RawString>;
export interface AppSpecContent {
  content?: string;
  sha256?: string;
}
export const AppSpecContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ content: S.optional(S.String), sha256: S.optional(S.String) }),
).annotate({ identifier: "AppSpecContent" }) as any as S.Schema<AppSpecContent>;
export interface RevisionLocation {
  revisionType?: RevisionLocationType;
  s3Location?: S3Location;
  gitHubLocation?: GitHubLocation;
  string?: RawString;
  appSpecContent?: AppSpecContent;
}
export const RevisionLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    revisionType: S.optional(RevisionLocationType),
    s3Location: S.optional(S3Location),
    gitHubLocation: S.optional(GitHubLocation),
    string: S.optional(RawString),
    appSpecContent: S.optional(AppSpecContent),
  }),
).annotate({
  identifier: "RevisionLocation",
}) as any as S.Schema<RevisionLocation>;
export type RevisionLocationList = RevisionLocation[];
export const RevisionLocationList = /*@__PURE__*/ S.Array(RevisionLocation);
export interface BatchGetApplicationRevisionsInput {
  applicationName: string;
  revisions: RevisionLocation[];
}
export const BatchGetApplicationRevisionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationName: S.String, revisions: RevisionLocationList }).pipe(
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
  identifier: "BatchGetApplicationRevisionsInput",
}) as any as S.Schema<BatchGetApplicationRevisionsInput>;
export type ErrorMessage = string;
export type Description = string;
export type DeploymentGroupName = string;
export type DeploymentGroupsList = string[];
export const DeploymentGroupsList = /*@__PURE__*/ S.Array(S.String);
export interface GenericRevisionInfo {
  description?: string;
  deploymentGroups?: string[];
  firstUsedTime?: Date;
  lastUsedTime?: Date;
  registerTime?: Date;
}
export const GenericRevisionInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    description: S.optional(S.String),
    deploymentGroups: S.optional(DeploymentGroupsList),
    firstUsedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUsedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    registerTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GenericRevisionInfo",
}) as any as S.Schema<GenericRevisionInfo>;
export interface RevisionInfo {
  revisionLocation?: RevisionLocation;
  genericRevisionInfo?: GenericRevisionInfo;
}
export const RevisionInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    revisionLocation: S.optional(RevisionLocation),
    genericRevisionInfo: S.optional(GenericRevisionInfo),
  }),
).annotate({ identifier: "RevisionInfo" }) as any as S.Schema<RevisionInfo>;
export type RevisionInfoList = RevisionInfo[];
export const RevisionInfoList = /*@__PURE__*/ S.Array(RevisionInfo);
export interface BatchGetApplicationRevisionsOutput {
  applicationName?: string;
  errorMessage?: string;
  revisions?: RevisionInfo[];
}
export const BatchGetApplicationRevisionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationName: S.optional(S.String),
    errorMessage: S.optional(S.String),
    revisions: S.optional(RevisionInfoList),
  }).pipe(ns),
).annotate({
  identifier: "BatchGetApplicationRevisionsOutput",
}) as any as S.Schema<BatchGetApplicationRevisionsOutput>;
export type ApplicationsList = string[];
export const ApplicationsList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetApplicationsInput {
  applicationNames: string[];
}
export const BatchGetApplicationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationNames: ApplicationsList }).pipe(
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
  identifier: "BatchGetApplicationsInput",
}) as any as S.Schema<BatchGetApplicationsInput>;
export type ApplicationId = string;
export type GitHubAccountTokenName = string;
export type ComputePlatform = "Server" | "Lambda" | "ECS" | (string & {});
export const ComputePlatform = /*@__PURE__*/ S.String;

export interface ApplicationInfo {
  applicationId?: string;
  applicationName?: string;
  createTime?: Date;
  linkedToGitHub?: boolean;
  gitHubAccountName?: string;
  computePlatform?: ComputePlatform;
}
export const ApplicationInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationId: S.optional(S.String),
    applicationName: S.optional(S.String),
    createTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    linkedToGitHub: S.optional(S.Boolean),
    gitHubAccountName: S.optional(S.String),
    computePlatform: S.optional(ComputePlatform),
  }),
).annotate({
  identifier: "ApplicationInfo",
}) as any as S.Schema<ApplicationInfo>;
export type ApplicationsInfoList = ApplicationInfo[];
export const ApplicationsInfoList = /*@__PURE__*/ S.Array(ApplicationInfo);
export interface BatchGetApplicationsOutput {
  applicationsInfo?: ApplicationInfo[];
}
export const BatchGetApplicationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationsInfo: S.optional(ApplicationsInfoList) }).pipe(ns),
).annotate({
  identifier: "BatchGetApplicationsOutput",
}) as any as S.Schema<BatchGetApplicationsOutput>;
export interface BatchGetDeploymentGroupsInput {
  applicationName: string;
  deploymentGroupNames: string[];
}
export const BatchGetDeploymentGroupsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationName: S.String,
    deploymentGroupNames: DeploymentGroupsList,
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
  identifier: "BatchGetDeploymentGroupsInput",
}) as any as S.Schema<BatchGetDeploymentGroupsInput>;
export type DeploymentGroupId = string;
export type DeploymentConfigName = string;
export type EC2TagFilterType =
  | "KEY_ONLY"
  | "VALUE_ONLY"
  | "KEY_AND_VALUE"
  | (string & {});
export const EC2TagFilterType = /*@__PURE__*/ S.String;

export interface EC2TagFilter {
  Key?: string;
  Value?: string;
  Type?: EC2TagFilterType;
}
export const EC2TagFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(S.String),
    Value: S.optional(S.String),
    Type: S.optional(EC2TagFilterType),
  }),
).annotate({ identifier: "EC2TagFilter" }) as any as S.Schema<EC2TagFilter>;
export type EC2TagFilterList = EC2TagFilter[];
export const EC2TagFilterList = /*@__PURE__*/ S.Array(EC2TagFilter);
export type TagFilterType =
  | "KEY_ONLY"
  | "VALUE_ONLY"
  | "KEY_AND_VALUE"
  | (string & {});
export const TagFilterType = /*@__PURE__*/ S.String;

export interface TagFilter {
  Key?: string;
  Value?: string;
  Type?: TagFilterType;
}
export const TagFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(S.String),
    Value: S.optional(S.String),
    Type: S.optional(TagFilterType),
  }),
).annotate({ identifier: "TagFilter" }) as any as S.Schema<TagFilter>;
export type TagFilterList = TagFilter[];
export const TagFilterList = /*@__PURE__*/ S.Array(TagFilter);
export type AutoScalingGroupName = string;
export type AutoScalingGroupHook = string;
export interface AutoScalingGroup {
  name?: string;
  hook?: string;
  terminationHook?: string;
}
export const AutoScalingGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    hook: S.optional(S.String),
    terminationHook: S.optional(S.String),
  }),
).annotate({
  identifier: "AutoScalingGroup",
}) as any as S.Schema<AutoScalingGroup>;
export type AutoScalingGroupList = AutoScalingGroup[];
export const AutoScalingGroupList = /*@__PURE__*/ S.Array(AutoScalingGroup);
export type Role = string;
export type TriggerName = string;
export type TriggerTargetArn = string;
export type TriggerEventType =
  | "DeploymentStart"
  | "DeploymentSuccess"
  | "DeploymentFailure"
  | "DeploymentStop"
  | "DeploymentRollback"
  | "DeploymentReady"
  | "InstanceStart"
  | "InstanceSuccess"
  | "InstanceFailure"
  | "InstanceReady"
  | (string & {});
export const TriggerEventType = /*@__PURE__*/ S.String;

export type TriggerEventTypeList = TriggerEventType[];
export const TriggerEventTypeList = /*@__PURE__*/ S.Array(TriggerEventType);
export interface TriggerConfig {
  triggerName?: string;
  triggerTargetArn?: string;
  triggerEvents?: TriggerEventType[];
}
export const TriggerConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    triggerName: S.optional(S.String),
    triggerTargetArn: S.optional(S.String),
    triggerEvents: S.optional(TriggerEventTypeList),
  }),
).annotate({ identifier: "TriggerConfig" }) as any as S.Schema<TriggerConfig>;
export type TriggerConfigList = TriggerConfig[];
export const TriggerConfigList = /*@__PURE__*/ S.Array(TriggerConfig);
export type AlarmName = string;
export interface Alarm {
  name?: string;
}
export const Alarm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String) }),
).annotate({ identifier: "Alarm" }) as any as S.Schema<Alarm>;
export type AlarmList = Alarm[];
export const AlarmList = /*@__PURE__*/ S.Array(Alarm);
export interface AlarmConfiguration {
  enabled?: boolean;
  ignorePollAlarmFailure?: boolean;
  alarms?: Alarm[];
}
export const AlarmConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.optional(S.Boolean),
    ignorePollAlarmFailure: S.optional(S.Boolean),
    alarms: S.optional(AlarmList),
  }),
).annotate({
  identifier: "AlarmConfiguration",
}) as any as S.Schema<AlarmConfiguration>;
export type AutoRollbackEvent =
  | "DEPLOYMENT_FAILURE"
  | "DEPLOYMENT_STOP_ON_ALARM"
  | "DEPLOYMENT_STOP_ON_REQUEST"
  | (string & {});
export const AutoRollbackEvent = /*@__PURE__*/ S.String;

export type AutoRollbackEventsList = AutoRollbackEvent[];
export const AutoRollbackEventsList = /*@__PURE__*/ S.Array(AutoRollbackEvent);
export interface AutoRollbackConfiguration {
  enabled?: boolean;
  events?: AutoRollbackEvent[];
}
export const AutoRollbackConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.optional(S.Boolean),
    events: S.optional(AutoRollbackEventsList),
  }),
).annotate({
  identifier: "AutoRollbackConfiguration",
}) as any as S.Schema<AutoRollbackConfiguration>;
export type DeploymentType = "IN_PLACE" | "BLUE_GREEN" | (string & {});
export const DeploymentType = /*@__PURE__*/ S.String;

export type DeploymentOption =
  | "WITH_TRAFFIC_CONTROL"
  | "WITHOUT_TRAFFIC_CONTROL"
  | (string & {});
export const DeploymentOption = /*@__PURE__*/ S.String;

export interface DeploymentStyle {
  deploymentType?: DeploymentType;
  deploymentOption?: DeploymentOption;
}
export const DeploymentStyle = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentType: S.optional(DeploymentType),
    deploymentOption: S.optional(DeploymentOption),
  }),
).annotate({
  identifier: "DeploymentStyle",
}) as any as S.Schema<DeploymentStyle>;
export type OutdatedInstancesStrategy = "UPDATE" | "IGNORE" | (string & {});
export const OutdatedInstancesStrategy = /*@__PURE__*/ S.String;

export type InstanceAction = "TERMINATE" | "KEEP_ALIVE" | (string & {});
export const InstanceAction = /*@__PURE__*/ S.String;

export type Duration = number;
export interface BlueInstanceTerminationOption {
  action?: InstanceAction;
  terminationWaitTimeInMinutes?: number;
}
export const BlueInstanceTerminationOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    action: S.optional(InstanceAction),
    terminationWaitTimeInMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "BlueInstanceTerminationOption",
}) as any as S.Schema<BlueInstanceTerminationOption>;
export type DeploymentReadyAction =
  | "CONTINUE_DEPLOYMENT"
  | "STOP_DEPLOYMENT"
  | (string & {});
export const DeploymentReadyAction = /*@__PURE__*/ S.String;

export interface DeploymentReadyOption {
  actionOnTimeout?: DeploymentReadyAction;
  waitTimeInMinutes?: number;
}
export const DeploymentReadyOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    actionOnTimeout: S.optional(DeploymentReadyAction),
    waitTimeInMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "DeploymentReadyOption",
}) as any as S.Schema<DeploymentReadyOption>;
export type GreenFleetProvisioningAction =
  | "DISCOVER_EXISTING"
  | "COPY_AUTO_SCALING_GROUP"
  | (string & {});
export const GreenFleetProvisioningAction = /*@__PURE__*/ S.String;

export interface GreenFleetProvisioningOption {
  action?: GreenFleetProvisioningAction;
}
export const GreenFleetProvisioningOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ action: S.optional(GreenFleetProvisioningAction) }),
).annotate({
  identifier: "GreenFleetProvisioningOption",
}) as any as S.Schema<GreenFleetProvisioningOption>;
export interface BlueGreenDeploymentConfiguration {
  terminateBlueInstancesOnDeploymentSuccess?: BlueInstanceTerminationOption;
  deploymentReadyOption?: DeploymentReadyOption;
  greenFleetProvisioningOption?: GreenFleetProvisioningOption;
}
export const BlueGreenDeploymentConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    terminateBlueInstancesOnDeploymentSuccess: S.optional(
      BlueInstanceTerminationOption,
    ),
    deploymentReadyOption: S.optional(DeploymentReadyOption),
    greenFleetProvisioningOption: S.optional(GreenFleetProvisioningOption),
  }),
).annotate({
  identifier: "BlueGreenDeploymentConfiguration",
}) as any as S.Schema<BlueGreenDeploymentConfiguration>;
export type ELBName = string;
export interface ELBInfo {
  name?: string;
}
export const ELBInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String) }),
).annotate({ identifier: "ELBInfo" }) as any as S.Schema<ELBInfo>;
export type ELBInfoList = ELBInfo[];
export const ELBInfoList = /*@__PURE__*/ S.Array(ELBInfo);
export type TargetGroupName = string;
export interface TargetGroupInfo {
  name?: string;
}
export const TargetGroupInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String) }),
).annotate({
  identifier: "TargetGroupInfo",
}) as any as S.Schema<TargetGroupInfo>;
export type TargetGroupInfoList = TargetGroupInfo[];
export const TargetGroupInfoList = /*@__PURE__*/ S.Array(TargetGroupInfo);
export type ListenerArn = string;
export type ListenerArnList = string[];
export const ListenerArnList = /*@__PURE__*/ S.Array(S.String);
export interface TrafficRoute {
  listenerArns?: string[];
}
export const TrafficRoute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ listenerArns: S.optional(ListenerArnList) }),
).annotate({ identifier: "TrafficRoute" }) as any as S.Schema<TrafficRoute>;
export interface TargetGroupPairInfo {
  targetGroups?: TargetGroupInfo[];
  prodTrafficRoute?: TrafficRoute;
  testTrafficRoute?: TrafficRoute;
}
export const TargetGroupPairInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetGroups: S.optional(TargetGroupInfoList),
    prodTrafficRoute: S.optional(TrafficRoute),
    testTrafficRoute: S.optional(TrafficRoute),
  }),
).annotate({
  identifier: "TargetGroupPairInfo",
}) as any as S.Schema<TargetGroupPairInfo>;
export type TargetGroupPairInfoList = TargetGroupPairInfo[];
export const TargetGroupPairInfoList =
  /*@__PURE__*/ S.Array(TargetGroupPairInfo);
export interface LoadBalancerInfo {
  elbInfoList?: ELBInfo[];
  targetGroupInfoList?: TargetGroupInfo[];
  targetGroupPairInfoList?: TargetGroupPairInfo[];
}
export const LoadBalancerInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    elbInfoList: S.optional(ELBInfoList),
    targetGroupInfoList: S.optional(TargetGroupInfoList),
    targetGroupPairInfoList: S.optional(TargetGroupPairInfoList),
  }),
).annotate({
  identifier: "LoadBalancerInfo",
}) as any as S.Schema<LoadBalancerInfo>;
export type DeploymentId = string;
export type DeploymentStatus =
  | "Created"
  | "Queued"
  | "InProgress"
  | "Baking"
  | "Succeeded"
  | "Failed"
  | "Stopped"
  | "Ready"
  | (string & {});
export const DeploymentStatus = /*@__PURE__*/ S.String;

export interface LastDeploymentInfo {
  deploymentId?: string;
  status?: DeploymentStatus;
  endTime?: Date;
  createTime?: Date;
}
export const LastDeploymentInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.optional(S.String),
    status: S.optional(DeploymentStatus),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    createTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "LastDeploymentInfo",
}) as any as S.Schema<LastDeploymentInfo>;
export type EC2TagSetList = EC2TagFilter[][];
export const EC2TagSetList = /*@__PURE__*/ S.Array(EC2TagFilterList);
export interface EC2TagSet {
  ec2TagSetList?: EC2TagFilter[][];
}
export const EC2TagSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ec2TagSetList: S.optional(EC2TagSetList) }),
).annotate({ identifier: "EC2TagSet" }) as any as S.Schema<EC2TagSet>;
export type OnPremisesTagSetList = TagFilter[][];
export const OnPremisesTagSetList = /*@__PURE__*/ S.Array(TagFilterList);
export interface OnPremisesTagSet {
  onPremisesTagSetList?: TagFilter[][];
}
export const OnPremisesTagSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ onPremisesTagSetList: S.optional(OnPremisesTagSetList) }),
).annotate({
  identifier: "OnPremisesTagSet",
}) as any as S.Schema<OnPremisesTagSet>;
export type ECSServiceName = string;
export type ECSClusterName = string;
export interface ECSService {
  serviceName?: string;
  clusterName?: string;
}
export const ECSService = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    serviceName: S.optional(S.String),
    clusterName: S.optional(S.String),
  }),
).annotate({ identifier: "ECSService" }) as any as S.Schema<ECSService>;
export type ECSServiceList = ECSService[];
export const ECSServiceList = /*@__PURE__*/ S.Array(ECSService);
export interface DeploymentGroupInfo {
  applicationName?: string;
  deploymentGroupId?: string;
  deploymentGroupName?: string;
  deploymentConfigName?: string;
  ec2TagFilters?: EC2TagFilter[];
  onPremisesInstanceTagFilters?: TagFilter[];
  autoScalingGroups?: AutoScalingGroup[];
  serviceRoleArn?: string;
  targetRevision?: RevisionLocation;
  triggerConfigurations?: TriggerConfig[];
  alarmConfiguration?: AlarmConfiguration;
  autoRollbackConfiguration?: AutoRollbackConfiguration;
  deploymentStyle?: DeploymentStyle;
  outdatedInstancesStrategy?: OutdatedInstancesStrategy;
  blueGreenDeploymentConfiguration?: BlueGreenDeploymentConfiguration;
  loadBalancerInfo?: LoadBalancerInfo;
  lastSuccessfulDeployment?: LastDeploymentInfo;
  lastAttemptedDeployment?: LastDeploymentInfo;
  ec2TagSet?: EC2TagSet;
  onPremisesTagSet?: OnPremisesTagSet;
  computePlatform?: ComputePlatform;
  ecsServices?: ECSService[];
  terminationHookEnabled?: boolean;
}
export const DeploymentGroupInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationName: S.optional(S.String),
    deploymentGroupId: S.optional(S.String),
    deploymentGroupName: S.optional(S.String),
    deploymentConfigName: S.optional(S.String),
    ec2TagFilters: S.optional(EC2TagFilterList),
    onPremisesInstanceTagFilters: S.optional(TagFilterList),
    autoScalingGroups: S.optional(AutoScalingGroupList),
    serviceRoleArn: S.optional(S.String),
    targetRevision: S.optional(RevisionLocation),
    triggerConfigurations: S.optional(TriggerConfigList),
    alarmConfiguration: S.optional(AlarmConfiguration),
    autoRollbackConfiguration: S.optional(AutoRollbackConfiguration),
    deploymentStyle: S.optional(DeploymentStyle),
    outdatedInstancesStrategy: S.optional(OutdatedInstancesStrategy),
    blueGreenDeploymentConfiguration: S.optional(
      BlueGreenDeploymentConfiguration,
    ),
    loadBalancerInfo: S.optional(LoadBalancerInfo),
    lastSuccessfulDeployment: S.optional(LastDeploymentInfo),
    lastAttemptedDeployment: S.optional(LastDeploymentInfo),
    ec2TagSet: S.optional(EC2TagSet),
    onPremisesTagSet: S.optional(OnPremisesTagSet),
    computePlatform: S.optional(ComputePlatform),
    ecsServices: S.optional(ECSServiceList),
    terminationHookEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DeploymentGroupInfo",
}) as any as S.Schema<DeploymentGroupInfo>;
export type DeploymentGroupInfoList = DeploymentGroupInfo[];
export const DeploymentGroupInfoList =
  /*@__PURE__*/ S.Array(DeploymentGroupInfo);
export interface BatchGetDeploymentGroupsOutput {
  deploymentGroupsInfo?: DeploymentGroupInfo[];
  errorMessage?: string;
}
export const BatchGetDeploymentGroupsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentGroupsInfo: S.optional(DeploymentGroupInfoList),
    errorMessage: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "BatchGetDeploymentGroupsOutput",
}) as any as S.Schema<BatchGetDeploymentGroupsOutput>;
export type InstanceId = string;
export type InstancesList = string[];
export const InstancesList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetDeploymentInstancesInput {
  deploymentId: string;
  instanceIds: string[];
}
export const BatchGetDeploymentInstancesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentId: S.String, instanceIds: InstancesList }).pipe(
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
  identifier: "BatchGetDeploymentInstancesInput",
}) as any as S.Schema<BatchGetDeploymentInstancesInput>;
export type InstanceStatus =
  | "Pending"
  | "InProgress"
  | "Succeeded"
  | "Failed"
  | "Skipped"
  | "Unknown"
  | "Ready"
  | (string & {});
export const InstanceStatus = /*@__PURE__*/ S.String;

export type LifecycleEventName = string;
export type LifecycleErrorCode =
  | "Success"
  | "ScriptMissing"
  | "ScriptNotExecutable"
  | "ScriptTimedOut"
  | "ScriptFailed"
  | "UnknownError"
  | (string & {});
export const LifecycleErrorCode = /*@__PURE__*/ S.String;

export type ScriptName = string;
export type LifecycleMessage = string;
export type LogTail = string;
export interface Diagnostics {
  errorCode?: LifecycleErrorCode;
  scriptName?: string;
  message?: string;
  logTail?: string;
}
export const Diagnostics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    errorCode: S.optional(LifecycleErrorCode),
    scriptName: S.optional(S.String),
    message: S.optional(S.String),
    logTail: S.optional(S.String),
  }),
).annotate({ identifier: "Diagnostics" }) as any as S.Schema<Diagnostics>;
export type LifecycleEventStatus =
  | "Pending"
  | "InProgress"
  | "Succeeded"
  | "Failed"
  | "Skipped"
  | "Unknown"
  | (string & {});
export const LifecycleEventStatus = /*@__PURE__*/ S.String;

export interface LifecycleEvent {
  lifecycleEventName?: string;
  diagnostics?: Diagnostics;
  startTime?: Date;
  endTime?: Date;
  status?: LifecycleEventStatus;
}
export const LifecycleEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    lifecycleEventName: S.optional(S.String),
    diagnostics: S.optional(Diagnostics),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    status: S.optional(LifecycleEventStatus),
  }),
).annotate({ identifier: "LifecycleEvent" }) as any as S.Schema<LifecycleEvent>;
export type LifecycleEventList = LifecycleEvent[];
export const LifecycleEventList = /*@__PURE__*/ S.Array(LifecycleEvent);
export type InstanceType = "Blue" | "Green" | (string & {});
export const InstanceType = /*@__PURE__*/ S.String;

export interface InstanceSummary {
  deploymentId?: string;
  instanceId?: string;
  status?: InstanceStatus;
  lastUpdatedAt?: Date;
  lifecycleEvents?: LifecycleEvent[];
  instanceType?: InstanceType;
}
export const InstanceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.optional(S.String),
    instanceId: S.optional(S.String),
    status: S.optional(InstanceStatus),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lifecycleEvents: S.optional(LifecycleEventList),
    instanceType: S.optional(InstanceType),
  }),
).annotate({
  identifier: "InstanceSummary",
}) as any as S.Schema<InstanceSummary>;
export type InstanceSummaryList = InstanceSummary[];
export const InstanceSummaryList = /*@__PURE__*/ S.Array(InstanceSummary);
export interface BatchGetDeploymentInstancesOutput {
  instancesSummary?: InstanceSummary[];
  errorMessage?: string;
}
export const BatchGetDeploymentInstancesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instancesSummary: S.optional(InstanceSummaryList),
    errorMessage: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "BatchGetDeploymentInstancesOutput",
}) as any as S.Schema<BatchGetDeploymentInstancesOutput>;
export type DeploymentsList = string[];
export const DeploymentsList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetDeploymentsInput {
  deploymentIds: string[];
}
export const BatchGetDeploymentsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentIds: DeploymentsList }).pipe(
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
  identifier: "BatchGetDeploymentsInput",
}) as any as S.Schema<BatchGetDeploymentsInput>;
export type ErrorCode =
  | "AGENT_ISSUE"
  | "ALARM_ACTIVE"
  | "APPLICATION_MISSING"
  | "AUTOSCALING_VALIDATION_ERROR"
  | "AUTO_SCALING_CONFIGURATION"
  | "AUTO_SCALING_IAM_ROLE_PERMISSIONS"
  | "CODEDEPLOY_RESOURCE_CANNOT_BE_FOUND"
  | "CUSTOMER_APPLICATION_UNHEALTHY"
  | "DEPLOYMENT_GROUP_MISSING"
  | "ECS_UPDATE_ERROR"
  | "ELASTIC_LOAD_BALANCING_INVALID"
  | "ELB_INVALID_INSTANCE"
  | "HEALTH_CONSTRAINTS"
  | "HEALTH_CONSTRAINTS_INVALID"
  | "HOOK_EXECUTION_FAILURE"
  | "IAM_ROLE_MISSING"
  | "IAM_ROLE_PERMISSIONS"
  | "INTERNAL_ERROR"
  | "INVALID_ECS_SERVICE"
  | "INVALID_LAMBDA_CONFIGURATION"
  | "INVALID_LAMBDA_FUNCTION"
  | "INVALID_REVISION"
  | "MANUAL_STOP"
  | "MISSING_BLUE_GREEN_DEPLOYMENT_CONFIGURATION"
  | "MISSING_ELB_INFORMATION"
  | "MISSING_GITHUB_TOKEN"
  | "NO_EC2_SUBSCRIPTION"
  | "NO_INSTANCES"
  | "OVER_MAX_INSTANCES"
  | "RESOURCE_LIMIT_EXCEEDED"
  | "REVISION_MISSING"
  | "THROTTLED"
  | "TIMEOUT"
  | "CLOUDFORMATION_STACK_FAILURE"
  | (string & {});
export const ErrorCode = /*@__PURE__*/ S.String;

export interface ErrorInformation {
  code?: ErrorCode;
  message?: string;
}
export const ErrorInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: S.optional(ErrorCode), message: S.optional(S.String) }),
).annotate({
  identifier: "ErrorInformation",
}) as any as S.Schema<ErrorInformation>;
export type InstanceCount = number;
export interface DeploymentOverview {
  Pending?: number;
  InProgress?: number;
  Succeeded?: number;
  Failed?: number;
  Skipped?: number;
  Ready?: number;
}
export const DeploymentOverview = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Pending: S.optional(S.Number),
    InProgress: S.optional(S.Number),
    Succeeded: S.optional(S.Number),
    Failed: S.optional(S.Number),
    Skipped: S.optional(S.Number),
    Ready: S.optional(S.Number),
  }),
).annotate({
  identifier: "DeploymentOverview",
}) as any as S.Schema<DeploymentOverview>;
export type DeploymentCreator =
  | "user"
  | "autoscaling"
  | "codeDeployRollback"
  | "CodeDeploy"
  | "CodeDeployAutoUpdate"
  | "CloudFormation"
  | "CloudFormationRollback"
  | "autoscalingTermination"
  | (string & {});
export const DeploymentCreator = /*@__PURE__*/ S.String;

export interface RollbackInfo {
  rollbackDeploymentId?: string;
  rollbackTriggeringDeploymentId?: string;
  rollbackMessage?: string;
}
export const RollbackInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    rollbackDeploymentId: S.optional(S.String),
    rollbackTriggeringDeploymentId: S.optional(S.String),
    rollbackMessage: S.optional(S.String),
  }),
).annotate({ identifier: "RollbackInfo" }) as any as S.Schema<RollbackInfo>;
export type AutoScalingGroupNameList = string[];
export const AutoScalingGroupNameList = /*@__PURE__*/ S.Array(S.String);
export interface TargetInstances {
  tagFilters?: EC2TagFilter[];
  autoScalingGroups?: string[];
  ec2TagSet?: EC2TagSet;
}
export const TargetInstances = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tagFilters: S.optional(EC2TagFilterList),
    autoScalingGroups: S.optional(AutoScalingGroupNameList),
    ec2TagSet: S.optional(EC2TagSet),
  }),
).annotate({
  identifier: "TargetInstances",
}) as any as S.Schema<TargetInstances>;
export type AdditionalDeploymentStatusInfo = string;
export type FileExistsBehavior =
  | "DISALLOW"
  | "OVERWRITE"
  | "RETAIN"
  | (string & {});
export const FileExistsBehavior = /*@__PURE__*/ S.String;

export type DeploymentStatusMessageList = string[];
export const DeploymentStatusMessageList = /*@__PURE__*/ S.Array(S.String);
export type ExternalId = string;
export interface RelatedDeployments {
  autoUpdateOutdatedInstancesRootDeploymentId?: string;
  autoUpdateOutdatedInstancesDeploymentIds?: string[];
}
export const RelatedDeployments = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    autoUpdateOutdatedInstancesRootDeploymentId: S.optional(S.String),
    autoUpdateOutdatedInstancesDeploymentIds: S.optional(DeploymentsList),
  }),
).annotate({
  identifier: "RelatedDeployments",
}) as any as S.Schema<RelatedDeployments>;
export interface DeploymentInfo {
  applicationName?: string;
  deploymentGroupName?: string;
  deploymentConfigName?: string;
  deploymentId?: string;
  previousRevision?: RevisionLocation;
  revision?: RevisionLocation;
  status?: DeploymentStatus;
  errorInformation?: ErrorInformation;
  createTime?: Date;
  startTime?: Date;
  completeTime?: Date;
  deploymentOverview?: DeploymentOverview;
  description?: string;
  creator?: DeploymentCreator;
  ignoreApplicationStopFailures?: boolean;
  autoRollbackConfiguration?: AutoRollbackConfiguration;
  updateOutdatedInstancesOnly?: boolean;
  rollbackInfo?: RollbackInfo;
  deploymentStyle?: DeploymentStyle;
  targetInstances?: TargetInstances;
  instanceTerminationWaitTimeStarted?: boolean;
  blueGreenDeploymentConfiguration?: BlueGreenDeploymentConfiguration;
  loadBalancerInfo?: LoadBalancerInfo;
  additionalDeploymentStatusInfo?: string;
  fileExistsBehavior?: FileExistsBehavior;
  deploymentStatusMessages?: string[];
  computePlatform?: ComputePlatform;
  externalId?: string;
  relatedDeployments?: RelatedDeployments;
  overrideAlarmConfiguration?: AlarmConfiguration;
}
export const DeploymentInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationName: S.optional(S.String),
    deploymentGroupName: S.optional(S.String),
    deploymentConfigName: S.optional(S.String),
    deploymentId: S.optional(S.String),
    previousRevision: S.optional(RevisionLocation),
    revision: S.optional(RevisionLocation),
    status: S.optional(DeploymentStatus),
    errorInformation: S.optional(ErrorInformation),
    createTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    completeTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    deploymentOverview: S.optional(DeploymentOverview),
    description: S.optional(S.String),
    creator: S.optional(DeploymentCreator),
    ignoreApplicationStopFailures: S.optional(S.Boolean),
    autoRollbackConfiguration: S.optional(AutoRollbackConfiguration),
    updateOutdatedInstancesOnly: S.optional(S.Boolean),
    rollbackInfo: S.optional(RollbackInfo),
    deploymentStyle: S.optional(DeploymentStyle),
    targetInstances: S.optional(TargetInstances),
    instanceTerminationWaitTimeStarted: S.optional(S.Boolean),
    blueGreenDeploymentConfiguration: S.optional(
      BlueGreenDeploymentConfiguration,
    ),
    loadBalancerInfo: S.optional(LoadBalancerInfo),
    additionalDeploymentStatusInfo: S.optional(S.String),
    fileExistsBehavior: S.optional(FileExistsBehavior),
    deploymentStatusMessages: S.optional(DeploymentStatusMessageList),
    computePlatform: S.optional(ComputePlatform),
    externalId: S.optional(S.String),
    relatedDeployments: S.optional(RelatedDeployments),
    overrideAlarmConfiguration: S.optional(AlarmConfiguration),
  }),
).annotate({ identifier: "DeploymentInfo" }) as any as S.Schema<DeploymentInfo>;
export type DeploymentsInfoList = DeploymentInfo[];
export const DeploymentsInfoList = /*@__PURE__*/ S.Array(DeploymentInfo);
export interface BatchGetDeploymentsOutput {
  deploymentsInfo?: DeploymentInfo[];
}
export const BatchGetDeploymentsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentsInfo: S.optional(DeploymentsInfoList) }).pipe(ns),
).annotate({
  identifier: "BatchGetDeploymentsOutput",
}) as any as S.Schema<BatchGetDeploymentsOutput>;
export type TargetId = string;
export type TargetIdList = string[];
export const TargetIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetDeploymentTargetsInput {
  deploymentId: string;
  targetIds: string[];
}
export const BatchGetDeploymentTargetsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentId: S.String, targetIds: TargetIdList }).pipe(
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
  identifier: "BatchGetDeploymentTargetsInput",
}) as any as S.Schema<BatchGetDeploymentTargetsInput>;
export type DeploymentTargetType =
  | "InstanceTarget"
  | "LambdaTarget"
  | "ECSTarget"
  | "CloudFormationTarget"
  | (string & {});
export const DeploymentTargetType = /*@__PURE__*/ S.String;

export type TargetArn = string;
export type TargetStatus =
  | "Pending"
  | "InProgress"
  | "Succeeded"
  | "Failed"
  | "Skipped"
  | "Unknown"
  | "Ready"
  | (string & {});
export const TargetStatus = /*@__PURE__*/ S.String;

export type TargetLabel = "Blue" | "Green" | (string & {});
export const TargetLabel = /*@__PURE__*/ S.String;

export interface InstanceTarget {
  deploymentId?: string;
  targetId?: string;
  targetArn?: string;
  status?: TargetStatus;
  lastUpdatedAt?: Date;
  lifecycleEvents?: LifecycleEvent[];
  instanceLabel?: TargetLabel;
}
export const InstanceTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.optional(S.String),
    targetId: S.optional(S.String),
    targetArn: S.optional(S.String),
    status: S.optional(TargetStatus),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lifecycleEvents: S.optional(LifecycleEventList),
    instanceLabel: S.optional(TargetLabel),
  }),
).annotate({ identifier: "InstanceTarget" }) as any as S.Schema<InstanceTarget>;
export type LambdaFunctionName = string;
export type LambdaFunctionAlias = string;
export type Version = string;
export type TrafficWeight = number;
export interface LambdaFunctionInfo {
  functionName?: string;
  functionAlias?: string;
  currentVersion?: string;
  targetVersion?: string;
  targetVersionWeight?: number;
}
export const LambdaFunctionInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    functionName: S.optional(S.String),
    functionAlias: S.optional(S.String),
    currentVersion: S.optional(S.String),
    targetVersion: S.optional(S.String),
    targetVersionWeight: S.optional(S.Number),
  }),
).annotate({
  identifier: "LambdaFunctionInfo",
}) as any as S.Schema<LambdaFunctionInfo>;
export interface LambdaTarget {
  deploymentId?: string;
  targetId?: string;
  targetArn?: string;
  status?: TargetStatus;
  lastUpdatedAt?: Date;
  lifecycleEvents?: LifecycleEvent[];
  lambdaFunctionInfo?: LambdaFunctionInfo;
}
export const LambdaTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.optional(S.String),
    targetId: S.optional(S.String),
    targetArn: S.optional(S.String),
    status: S.optional(TargetStatus),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lifecycleEvents: S.optional(LifecycleEventList),
    lambdaFunctionInfo: S.optional(LambdaFunctionInfo),
  }),
).annotate({ identifier: "LambdaTarget" }) as any as S.Schema<LambdaTarget>;
export type ECSTaskSetIdentifier = string;
export type ECSTaskSetCount = number;
export type ECSTaskSetStatus = string;
export interface ECSTaskSet {
  identifer?: string;
  desiredCount?: number;
  pendingCount?: number;
  runningCount?: number;
  status?: string;
  trafficWeight?: number;
  targetGroup?: TargetGroupInfo;
  taskSetLabel?: TargetLabel;
}
export const ECSTaskSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    identifer: S.optional(S.String),
    desiredCount: S.optional(S.Number),
    pendingCount: S.optional(S.Number),
    runningCount: S.optional(S.Number),
    status: S.optional(S.String),
    trafficWeight: S.optional(S.Number),
    targetGroup: S.optional(TargetGroupInfo),
    taskSetLabel: S.optional(TargetLabel),
  }),
).annotate({ identifier: "ECSTaskSet" }) as any as S.Schema<ECSTaskSet>;
export type ECSTaskSetList = ECSTaskSet[];
export const ECSTaskSetList = /*@__PURE__*/ S.Array(ECSTaskSet);
export interface ECSTarget {
  deploymentId?: string;
  targetId?: string;
  targetArn?: string;
  lastUpdatedAt?: Date;
  lifecycleEvents?: LifecycleEvent[];
  status?: TargetStatus;
  taskSetsInfo?: ECSTaskSet[];
}
export const ECSTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.optional(S.String),
    targetId: S.optional(S.String),
    targetArn: S.optional(S.String),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lifecycleEvents: S.optional(LifecycleEventList),
    status: S.optional(TargetStatus),
    taskSetsInfo: S.optional(ECSTaskSetList),
  }),
).annotate({ identifier: "ECSTarget" }) as any as S.Schema<ECSTarget>;
export type CloudFormationResourceType = string;
export interface CloudFormationTarget {
  deploymentId?: string;
  targetId?: string;
  lastUpdatedAt?: Date;
  lifecycleEvents?: LifecycleEvent[];
  status?: TargetStatus;
  resourceType?: string;
  targetVersionWeight?: number;
}
export const CloudFormationTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.optional(S.String),
    targetId: S.optional(S.String),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lifecycleEvents: S.optional(LifecycleEventList),
    status: S.optional(TargetStatus),
    resourceType: S.optional(S.String),
    targetVersionWeight: S.optional(S.Number),
  }),
).annotate({
  identifier: "CloudFormationTarget",
}) as any as S.Schema<CloudFormationTarget>;
export interface DeploymentTarget {
  deploymentTargetType?: DeploymentTargetType;
  instanceTarget?: InstanceTarget;
  lambdaTarget?: LambdaTarget;
  ecsTarget?: ECSTarget;
  cloudFormationTarget?: CloudFormationTarget;
}
export const DeploymentTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentTargetType: S.optional(DeploymentTargetType),
    instanceTarget: S.optional(InstanceTarget),
    lambdaTarget: S.optional(LambdaTarget),
    ecsTarget: S.optional(ECSTarget),
    cloudFormationTarget: S.optional(CloudFormationTarget),
  }),
).annotate({
  identifier: "DeploymentTarget",
}) as any as S.Schema<DeploymentTarget>;
export type DeploymentTargetList = DeploymentTarget[];
export const DeploymentTargetList = /*@__PURE__*/ S.Array(DeploymentTarget);
export interface BatchGetDeploymentTargetsOutput {
  deploymentTargets?: DeploymentTarget[];
}
export const BatchGetDeploymentTargetsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentTargets: S.optional(DeploymentTargetList) }).pipe(ns),
).annotate({
  identifier: "BatchGetDeploymentTargetsOutput",
}) as any as S.Schema<BatchGetDeploymentTargetsOutput>;
export interface BatchGetOnPremisesInstancesInput {
  instanceNames: string[];
}
export const BatchGetOnPremisesInstancesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceNames: InstanceNameList }).pipe(
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
  identifier: "BatchGetOnPremisesInstancesInput",
}) as any as S.Schema<BatchGetOnPremisesInstancesInput>;
export type IamSessionArn = string;
export type IamUserArn = string;
export type InstanceArn = string;
export interface InstanceInfo {
  instanceName?: string;
  iamSessionArn?: string;
  iamUserArn?: string;
  instanceArn?: string;
  registerTime?: Date;
  deregisterTime?: Date;
  tags?: Tag[];
}
export const InstanceInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceName: S.optional(S.String),
    iamSessionArn: S.optional(S.String),
    iamUserArn: S.optional(S.String),
    instanceArn: S.optional(S.String),
    registerTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    deregisterTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(TagList),
  }),
).annotate({ identifier: "InstanceInfo" }) as any as S.Schema<InstanceInfo>;
export type InstanceInfoList = InstanceInfo[];
export const InstanceInfoList = /*@__PURE__*/ S.Array(InstanceInfo);
export interface BatchGetOnPremisesInstancesOutput {
  instanceInfos?: InstanceInfo[];
}
export const BatchGetOnPremisesInstancesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceInfos: S.optional(InstanceInfoList) }).pipe(ns),
).annotate({
  identifier: "BatchGetOnPremisesInstancesOutput",
}) as any as S.Schema<BatchGetOnPremisesInstancesOutput>;
export type DeploymentWaitType =
  | "READY_WAIT"
  | "TERMINATION_WAIT"
  | (string & {});
export const DeploymentWaitType = /*@__PURE__*/ S.String;

export interface ContinueDeploymentInput {
  deploymentId?: string;
  deploymentWaitType?: DeploymentWaitType;
}
export const ContinueDeploymentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.optional(S.String),
    deploymentWaitType: S.optional(DeploymentWaitType),
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
  identifier: "ContinueDeploymentInput",
}) as any as S.Schema<ContinueDeploymentInput>;
export interface ContinueDeploymentResponse {}
export const ContinueDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ContinueDeploymentResponse",
}) as any as S.Schema<ContinueDeploymentResponse>;
export interface CreateApplicationInput {
  applicationName: string;
  computePlatform?: ComputePlatform;
  tags?: Tag[];
}
export const CreateApplicationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationName: S.String,
    computePlatform: S.optional(ComputePlatform),
    tags: S.optional(TagList),
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
  identifier: "CreateApplicationInput",
}) as any as S.Schema<CreateApplicationInput>;
export interface CreateApplicationOutput {
  applicationId?: string;
}
export const CreateApplicationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateApplicationOutput",
}) as any as S.Schema<CreateApplicationOutput>;
export interface CreateDeploymentInput {
  applicationName: string;
  deploymentGroupName?: string;
  revision?: RevisionLocation;
  deploymentConfigName?: string;
  description?: string;
  ignoreApplicationStopFailures?: boolean;
  targetInstances?: TargetInstances;
  autoRollbackConfiguration?: AutoRollbackConfiguration;
  updateOutdatedInstancesOnly?: boolean;
  fileExistsBehavior?: FileExistsBehavior;
  overrideAlarmConfiguration?: AlarmConfiguration;
}
export const CreateDeploymentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationName: S.String,
    deploymentGroupName: S.optional(S.String),
    revision: S.optional(RevisionLocation),
    deploymentConfigName: S.optional(S.String),
    description: S.optional(S.String),
    ignoreApplicationStopFailures: S.optional(S.Boolean),
    targetInstances: S.optional(TargetInstances),
    autoRollbackConfiguration: S.optional(AutoRollbackConfiguration),
    updateOutdatedInstancesOnly: S.optional(S.Boolean),
    fileExistsBehavior: S.optional(FileExistsBehavior),
    overrideAlarmConfiguration: S.optional(AlarmConfiguration),
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
  identifier: "CreateDeploymentInput",
}) as any as S.Schema<CreateDeploymentInput>;
export interface CreateDeploymentOutput {
  deploymentId?: string;
}
export const CreateDeploymentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateDeploymentOutput",
}) as any as S.Schema<CreateDeploymentOutput>;
export type MinimumHealthyHostsType =
  | "HOST_COUNT"
  | "FLEET_PERCENT"
  | (string & {});
export const MinimumHealthyHostsType = /*@__PURE__*/ S.String;

export type MinimumHealthyHostsValue = number;
export interface MinimumHealthyHosts {
  type?: MinimumHealthyHostsType;
  value?: number;
}
export const MinimumHealthyHosts = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(MinimumHealthyHostsType),
    value: S.optional(S.Number),
  }),
).annotate({
  identifier: "MinimumHealthyHosts",
}) as any as S.Schema<MinimumHealthyHosts>;
export type TrafficRoutingType =
  | "TimeBasedCanary"
  | "TimeBasedLinear"
  | "AllAtOnce"
  | (string & {});
export const TrafficRoutingType = /*@__PURE__*/ S.String;

export type Percentage = number;
export type WaitTimeInMins = number;
export interface TimeBasedCanary {
  canaryPercentage?: number;
  canaryInterval?: number;
}
export const TimeBasedCanary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    canaryPercentage: S.optional(S.Number),
    canaryInterval: S.optional(S.Number),
  }),
).annotate({
  identifier: "TimeBasedCanary",
}) as any as S.Schema<TimeBasedCanary>;
export interface TimeBasedLinear {
  linearPercentage?: number;
  linearInterval?: number;
}
export const TimeBasedLinear = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    linearPercentage: S.optional(S.Number),
    linearInterval: S.optional(S.Number),
  }),
).annotate({
  identifier: "TimeBasedLinear",
}) as any as S.Schema<TimeBasedLinear>;
export interface TrafficRoutingConfig {
  type?: TrafficRoutingType;
  timeBasedCanary?: TimeBasedCanary;
  timeBasedLinear?: TimeBasedLinear;
}
export const TrafficRoutingConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(TrafficRoutingType),
    timeBasedCanary: S.optional(TimeBasedCanary),
    timeBasedLinear: S.optional(TimeBasedLinear),
  }),
).annotate({
  identifier: "TrafficRoutingConfig",
}) as any as S.Schema<TrafficRoutingConfig>;
export type WaitTimeInSeconds = number;
export type MinimumHealthyHostsPerZoneType =
  | "HOST_COUNT"
  | "FLEET_PERCENT"
  | (string & {});
export const MinimumHealthyHostsPerZoneType = /*@__PURE__*/ S.String;

export type MinimumHealthyHostsPerZoneValue = number;
export interface MinimumHealthyHostsPerZone {
  type?: MinimumHealthyHostsPerZoneType;
  value?: number;
}
export const MinimumHealthyHostsPerZone = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(MinimumHealthyHostsPerZoneType),
    value: S.optional(S.Number),
  }),
).annotate({
  identifier: "MinimumHealthyHostsPerZone",
}) as any as S.Schema<MinimumHealthyHostsPerZone>;
export interface ZonalConfig {
  firstZoneMonitorDurationInSeconds?: number;
  monitorDurationInSeconds?: number;
  minimumHealthyHostsPerZone?: MinimumHealthyHostsPerZone;
}
export const ZonalConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    firstZoneMonitorDurationInSeconds: S.optional(S.Number),
    monitorDurationInSeconds: S.optional(S.Number),
    minimumHealthyHostsPerZone: S.optional(MinimumHealthyHostsPerZone),
  }),
).annotate({ identifier: "ZonalConfig" }) as any as S.Schema<ZonalConfig>;
export interface CreateDeploymentConfigInput {
  deploymentConfigName: string;
  minimumHealthyHosts?: MinimumHealthyHosts;
  trafficRoutingConfig?: TrafficRoutingConfig;
  computePlatform?: ComputePlatform;
  zonalConfig?: ZonalConfig;
}
export const CreateDeploymentConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentConfigName: S.String,
    minimumHealthyHosts: S.optional(MinimumHealthyHosts),
    trafficRoutingConfig: S.optional(TrafficRoutingConfig),
    computePlatform: S.optional(ComputePlatform),
    zonalConfig: S.optional(ZonalConfig),
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
  identifier: "CreateDeploymentConfigInput",
}) as any as S.Schema<CreateDeploymentConfigInput>;
export type DeploymentConfigId = string;
export interface CreateDeploymentConfigOutput {
  deploymentConfigId?: string;
}
export const CreateDeploymentConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentConfigId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateDeploymentConfigOutput",
}) as any as S.Schema<CreateDeploymentConfigOutput>;
export interface CreateDeploymentGroupInput {
  applicationName: string;
  deploymentGroupName: string;
  deploymentConfigName?: string;
  ec2TagFilters?: EC2TagFilter[];
  onPremisesInstanceTagFilters?: TagFilter[];
  autoScalingGroups?: string[];
  serviceRoleArn: string;
  triggerConfigurations?: TriggerConfig[];
  alarmConfiguration?: AlarmConfiguration;
  autoRollbackConfiguration?: AutoRollbackConfiguration;
  outdatedInstancesStrategy?: OutdatedInstancesStrategy;
  deploymentStyle?: DeploymentStyle;
  blueGreenDeploymentConfiguration?: BlueGreenDeploymentConfiguration;
  loadBalancerInfo?: LoadBalancerInfo;
  ec2TagSet?: EC2TagSet;
  ecsServices?: ECSService[];
  onPremisesTagSet?: OnPremisesTagSet;
  tags?: Tag[];
  terminationHookEnabled?: boolean;
}
export const CreateDeploymentGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationName: S.String,
    deploymentGroupName: S.String,
    deploymentConfigName: S.optional(S.String),
    ec2TagFilters: S.optional(EC2TagFilterList),
    onPremisesInstanceTagFilters: S.optional(TagFilterList),
    autoScalingGroups: S.optional(AutoScalingGroupNameList),
    serviceRoleArn: S.String,
    triggerConfigurations: S.optional(TriggerConfigList),
    alarmConfiguration: S.optional(AlarmConfiguration),
    autoRollbackConfiguration: S.optional(AutoRollbackConfiguration),
    outdatedInstancesStrategy: S.optional(OutdatedInstancesStrategy),
    deploymentStyle: S.optional(DeploymentStyle),
    blueGreenDeploymentConfiguration: S.optional(
      BlueGreenDeploymentConfiguration,
    ),
    loadBalancerInfo: S.optional(LoadBalancerInfo),
    ec2TagSet: S.optional(EC2TagSet),
    ecsServices: S.optional(ECSServiceList),
    onPremisesTagSet: S.optional(OnPremisesTagSet),
    tags: S.optional(TagList),
    terminationHookEnabled: S.optional(S.Boolean),
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
  identifier: "CreateDeploymentGroupInput",
}) as any as S.Schema<CreateDeploymentGroupInput>;
export interface CreateDeploymentGroupOutput {
  deploymentGroupId?: string;
}
export const CreateDeploymentGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentGroupId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateDeploymentGroupOutput",
}) as any as S.Schema<CreateDeploymentGroupOutput>;
export interface DeleteApplicationInput {
  applicationName: string;
}
export const DeleteApplicationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationName: S.String }).pipe(
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
  identifier: "DeleteApplicationInput",
}) as any as S.Schema<DeleteApplicationInput>;
export interface DeleteApplicationResponse {}
export const DeleteApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteApplicationResponse",
}) as any as S.Schema<DeleteApplicationResponse>;
export interface DeleteDeploymentConfigInput {
  deploymentConfigName: string;
}
export const DeleteDeploymentConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentConfigName: S.String }).pipe(
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
  identifier: "DeleteDeploymentConfigInput",
}) as any as S.Schema<DeleteDeploymentConfigInput>;
export interface DeleteDeploymentConfigResponse {}
export const DeleteDeploymentConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteDeploymentConfigResponse",
}) as any as S.Schema<DeleteDeploymentConfigResponse>;
export interface DeleteDeploymentGroupInput {
  applicationName: string;
  deploymentGroupName: string;
}
export const DeleteDeploymentGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationName: S.String, deploymentGroupName: S.String }).pipe(
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
  identifier: "DeleteDeploymentGroupInput",
}) as any as S.Schema<DeleteDeploymentGroupInput>;
export interface DeleteDeploymentGroupOutput {
  hooksNotCleanedUp?: AutoScalingGroup[];
}
export const DeleteDeploymentGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ hooksNotCleanedUp: S.optional(AutoScalingGroupList) }).pipe(ns),
).annotate({
  identifier: "DeleteDeploymentGroupOutput",
}) as any as S.Schema<DeleteDeploymentGroupOutput>;
export interface DeleteGitHubAccountTokenInput {
  tokenName?: string;
}
export const DeleteGitHubAccountTokenInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tokenName: S.optional(S.String) }).pipe(
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
  identifier: "DeleteGitHubAccountTokenInput",
}) as any as S.Schema<DeleteGitHubAccountTokenInput>;
export interface DeleteGitHubAccountTokenOutput {
  tokenName?: string;
}
export const DeleteGitHubAccountTokenOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tokenName: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteGitHubAccountTokenOutput",
}) as any as S.Schema<DeleteGitHubAccountTokenOutput>;
export interface DeleteResourcesByExternalIdInput {
  externalId?: string;
}
export const DeleteResourcesByExternalIdInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ externalId: S.optional(S.String) }).pipe(
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
  identifier: "DeleteResourcesByExternalIdInput",
}) as any as S.Schema<DeleteResourcesByExternalIdInput>;
export interface DeleteResourcesByExternalIdOutput {}
export const DeleteResourcesByExternalIdOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteResourcesByExternalIdOutput",
}) as any as S.Schema<DeleteResourcesByExternalIdOutput>;
export interface DeregisterOnPremisesInstanceInput {
  instanceName: string;
}
export const DeregisterOnPremisesInstanceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceName: S.String }).pipe(
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
  identifier: "DeregisterOnPremisesInstanceInput",
}) as any as S.Schema<DeregisterOnPremisesInstanceInput>;
export interface DeregisterOnPremisesInstanceResponse {}
export const DeregisterOnPremisesInstanceResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeregisterOnPremisesInstanceResponse",
}) as any as S.Schema<DeregisterOnPremisesInstanceResponse>;
export interface GetApplicationInput {
  applicationName: string;
}
export const GetApplicationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationName: S.String }).pipe(
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
  identifier: "GetApplicationInput",
}) as any as S.Schema<GetApplicationInput>;
export interface GetApplicationOutput {
  application?: ApplicationInfo;
}
export const GetApplicationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ application: S.optional(ApplicationInfo) }).pipe(ns),
).annotate({
  identifier: "GetApplicationOutput",
}) as any as S.Schema<GetApplicationOutput>;
export interface GetApplicationRevisionInput {
  applicationName: string;
  revision: RevisionLocation;
}
export const GetApplicationRevisionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationName: S.String, revision: RevisionLocation }).pipe(
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
  identifier: "GetApplicationRevisionInput",
}) as any as S.Schema<GetApplicationRevisionInput>;
export interface GetApplicationRevisionOutput {
  applicationName?: string;
  revision?: RevisionLocation;
  revisionInfo?: GenericRevisionInfo;
}
export const GetApplicationRevisionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationName: S.optional(S.String),
    revision: S.optional(RevisionLocation),
    revisionInfo: S.optional(GenericRevisionInfo),
  }).pipe(ns),
).annotate({
  identifier: "GetApplicationRevisionOutput",
}) as any as S.Schema<GetApplicationRevisionOutput>;
export interface GetDeploymentInput {
  deploymentId: string;
}
export const GetDeploymentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentId: S.String }).pipe(
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
  identifier: "GetDeploymentInput",
}) as any as S.Schema<GetDeploymentInput>;
export interface GetDeploymentOutput {
  deploymentInfo?: DeploymentInfo;
}
export const GetDeploymentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentInfo: S.optional(DeploymentInfo) }).pipe(ns),
).annotate({
  identifier: "GetDeploymentOutput",
}) as any as S.Schema<GetDeploymentOutput>;
export interface GetDeploymentConfigInput {
  deploymentConfigName: string;
}
export const GetDeploymentConfigInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentConfigName: S.String }).pipe(
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
  identifier: "GetDeploymentConfigInput",
}) as any as S.Schema<GetDeploymentConfigInput>;
export interface DeploymentConfigInfo {
  deploymentConfigId?: string;
  deploymentConfigName?: string;
  minimumHealthyHosts?: MinimumHealthyHosts;
  createTime?: Date;
  computePlatform?: ComputePlatform;
  trafficRoutingConfig?: TrafficRoutingConfig;
  zonalConfig?: ZonalConfig;
}
export const DeploymentConfigInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentConfigId: S.optional(S.String),
    deploymentConfigName: S.optional(S.String),
    minimumHealthyHosts: S.optional(MinimumHealthyHosts),
    createTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    computePlatform: S.optional(ComputePlatform),
    trafficRoutingConfig: S.optional(TrafficRoutingConfig),
    zonalConfig: S.optional(ZonalConfig),
  }),
).annotate({
  identifier: "DeploymentConfigInfo",
}) as any as S.Schema<DeploymentConfigInfo>;
export interface GetDeploymentConfigOutput {
  deploymentConfigInfo?: DeploymentConfigInfo;
}
export const GetDeploymentConfigOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentConfigInfo: S.optional(DeploymentConfigInfo) }).pipe(ns),
).annotate({
  identifier: "GetDeploymentConfigOutput",
}) as any as S.Schema<GetDeploymentConfigOutput>;
export interface GetDeploymentGroupInput {
  applicationName: string;
  deploymentGroupName: string;
}
export const GetDeploymentGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationName: S.String, deploymentGroupName: S.String }).pipe(
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
  identifier: "GetDeploymentGroupInput",
}) as any as S.Schema<GetDeploymentGroupInput>;
export interface GetDeploymentGroupOutput {
  deploymentGroupInfo?: DeploymentGroupInfo;
}
export const GetDeploymentGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentGroupInfo: S.optional(DeploymentGroupInfo) }).pipe(ns),
).annotate({
  identifier: "GetDeploymentGroupOutput",
}) as any as S.Schema<GetDeploymentGroupOutput>;
export interface GetDeploymentInstanceInput {
  deploymentId: string;
  instanceId: string;
}
export const GetDeploymentInstanceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentId: S.String, instanceId: S.String }).pipe(
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
  identifier: "GetDeploymentInstanceInput",
}) as any as S.Schema<GetDeploymentInstanceInput>;
export interface GetDeploymentInstanceOutput {
  instanceSummary?: InstanceSummary;
}
export const GetDeploymentInstanceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceSummary: S.optional(InstanceSummary) }).pipe(ns),
).annotate({
  identifier: "GetDeploymentInstanceOutput",
}) as any as S.Schema<GetDeploymentInstanceOutput>;
export interface GetDeploymentTargetInput {
  deploymentId: string;
  targetId: string;
}
export const GetDeploymentTargetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentId: S.String, targetId: S.String }).pipe(
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
  identifier: "GetDeploymentTargetInput",
}) as any as S.Schema<GetDeploymentTargetInput>;
export interface GetDeploymentTargetOutput {
  deploymentTarget?: DeploymentTarget;
}
export const GetDeploymentTargetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deploymentTarget: S.optional(DeploymentTarget) }).pipe(ns),
).annotate({
  identifier: "GetDeploymentTargetOutput",
}) as any as S.Schema<GetDeploymentTargetOutput>;
export interface GetOnPremisesInstanceInput {
  instanceName: string;
}
export const GetOnPremisesInstanceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceName: S.String }).pipe(
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
  identifier: "GetOnPremisesInstanceInput",
}) as any as S.Schema<GetOnPremisesInstanceInput>;
export interface GetOnPremisesInstanceOutput {
  instanceInfo?: InstanceInfo;
}
export const GetOnPremisesInstanceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceInfo: S.optional(InstanceInfo) }).pipe(ns),
).annotate({
  identifier: "GetOnPremisesInstanceOutput",
}) as any as S.Schema<GetOnPremisesInstanceOutput>;
export type ApplicationRevisionSortBy =
  | "registerTime"
  | "firstUsedTime"
  | "lastUsedTime"
  | (string & {});
export const ApplicationRevisionSortBy = /*@__PURE__*/ S.String;

export type SortOrder = "ascending" | "descending" | (string & {});
export const SortOrder = /*@__PURE__*/ S.String;

export type ListStateFilterAction =
  | "include"
  | "exclude"
  | "ignore"
  | (string & {});
export const ListStateFilterAction = /*@__PURE__*/ S.String;

export type NextToken = string;
export interface ListApplicationRevisionsInput {
  applicationName: string;
  sortBy?: ApplicationRevisionSortBy;
  sortOrder?: SortOrder;
  s3Bucket?: string;
  s3KeyPrefix?: string;
  deployed?: ListStateFilterAction;
  nextToken?: string;
}
export const ListApplicationRevisionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationName: S.String,
    sortBy: S.optional(ApplicationRevisionSortBy),
    sortOrder: S.optional(SortOrder),
    s3Bucket: S.optional(S.String),
    s3KeyPrefix: S.optional(S.String),
    deployed: S.optional(ListStateFilterAction),
    nextToken: S.optional(S.String),
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
  identifier: "ListApplicationRevisionsInput",
}) as any as S.Schema<ListApplicationRevisionsInput>;
export interface ListApplicationRevisionsOutput {
  revisions?: RevisionLocation[];
  nextToken?: string;
}
export const ListApplicationRevisionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    revisions: S.optional(RevisionLocationList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListApplicationRevisionsOutput",
}) as any as S.Schema<ListApplicationRevisionsOutput>;
export interface ListApplicationsInput {
  nextToken?: string;
}
export const ListApplicationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String) }).pipe(
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
  identifier: "ListApplicationsInput",
}) as any as S.Schema<ListApplicationsInput>;
export interface ListApplicationsOutput {
  applications?: string[];
  nextToken?: string;
}
export const ListApplicationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applications: S.optional(ApplicationsList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListApplicationsOutput",
}) as any as S.Schema<ListApplicationsOutput>;
export interface ListDeploymentConfigsInput {
  nextToken?: string;
}
export const ListDeploymentConfigsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String) }).pipe(
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
  identifier: "ListDeploymentConfigsInput",
}) as any as S.Schema<ListDeploymentConfigsInput>;
export type DeploymentConfigsList = string[];
export const DeploymentConfigsList = /*@__PURE__*/ S.Array(S.String);
export interface ListDeploymentConfigsOutput {
  deploymentConfigsList?: string[];
  nextToken?: string;
}
export const ListDeploymentConfigsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentConfigsList: S.optional(DeploymentConfigsList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDeploymentConfigsOutput",
}) as any as S.Schema<ListDeploymentConfigsOutput>;
export interface ListDeploymentGroupsInput {
  applicationName: string;
  nextToken?: string;
}
export const ListDeploymentGroupsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ applicationName: S.String, nextToken: S.optional(S.String) }).pipe(
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
  identifier: "ListDeploymentGroupsInput",
}) as any as S.Schema<ListDeploymentGroupsInput>;
export interface ListDeploymentGroupsOutput {
  applicationName?: string;
  deploymentGroups?: string[];
  nextToken?: string;
}
export const ListDeploymentGroupsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationName: S.optional(S.String),
    deploymentGroups: S.optional(DeploymentGroupsList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDeploymentGroupsOutput",
}) as any as S.Schema<ListDeploymentGroupsOutput>;
export type InstanceStatusList = InstanceStatus[];
export const InstanceStatusList = /*@__PURE__*/ S.Array(InstanceStatus);
export type InstanceTypeList = InstanceType[];
export const InstanceTypeList = /*@__PURE__*/ S.Array(InstanceType);
export interface ListDeploymentInstancesInput {
  deploymentId: string;
  nextToken?: string;
  instanceStatusFilter?: InstanceStatus[];
  instanceTypeFilter?: InstanceType[];
}
export const ListDeploymentInstancesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.String,
    nextToken: S.optional(S.String),
    instanceStatusFilter: S.optional(InstanceStatusList),
    instanceTypeFilter: S.optional(InstanceTypeList),
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
  identifier: "ListDeploymentInstancesInput",
}) as any as S.Schema<ListDeploymentInstancesInput>;
export interface ListDeploymentInstancesOutput {
  instancesList?: string[];
  nextToken?: string;
}
export const ListDeploymentInstancesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instancesList: S.optional(InstancesList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDeploymentInstancesOutput",
}) as any as S.Schema<ListDeploymentInstancesOutput>;
export type DeploymentStatusList = DeploymentStatus[];
export const DeploymentStatusList = /*@__PURE__*/ S.Array(DeploymentStatus);
export interface TimeRange {
  start?: Date;
  end?: Date;
}
export const TimeRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    start: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    end: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "TimeRange" }) as any as S.Schema<TimeRange>;
export interface ListDeploymentsInput {
  applicationName?: string;
  deploymentGroupName?: string;
  externalId?: string;
  includeOnlyStatuses?: DeploymentStatus[];
  createTimeRange?: TimeRange;
  nextToken?: string;
}
export const ListDeploymentsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationName: S.optional(S.String),
    deploymentGroupName: S.optional(S.String),
    externalId: S.optional(S.String),
    includeOnlyStatuses: S.optional(DeploymentStatusList),
    createTimeRange: S.optional(TimeRange),
    nextToken: S.optional(S.String),
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
  identifier: "ListDeploymentsInput",
}) as any as S.Schema<ListDeploymentsInput>;
export interface ListDeploymentsOutput {
  deployments?: string[];
  nextToken?: string;
}
export const ListDeploymentsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deployments: S.optional(DeploymentsList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDeploymentsOutput",
}) as any as S.Schema<ListDeploymentsOutput>;
export type TargetFilterName =
  | "TargetStatus"
  | "ServerInstanceLabel"
  | (string & {});
export const TargetFilterName = /*@__PURE__*/ S.String;

export type FilterValue = string;
export type FilterValueList = string[];
export const FilterValueList = /*@__PURE__*/ S.Array(S.String);
export type TargetFilters = { [key in TargetFilterName]?: string[] };
export const TargetFilters = /*@__PURE__*/ S.Record(
  TargetFilterName,
  FilterValueList.pipe(S.optional),
);
export interface ListDeploymentTargetsInput {
  deploymentId: string;
  nextToken?: string;
  targetFilters?: { [key: string]: string[] | undefined };
}
export const ListDeploymentTargetsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.String,
    nextToken: S.optional(S.String),
    targetFilters: S.optional(TargetFilters),
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
  identifier: "ListDeploymentTargetsInput",
}) as any as S.Schema<ListDeploymentTargetsInput>;
export interface ListDeploymentTargetsOutput {
  targetIds?: string[];
  nextToken?: string;
}
export const ListDeploymentTargetsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetIds: S.optional(TargetIdList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDeploymentTargetsOutput",
}) as any as S.Schema<ListDeploymentTargetsOutput>;
export interface ListGitHubAccountTokenNamesInput {
  nextToken?: string;
}
export const ListGitHubAccountTokenNamesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String) }).pipe(
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
  identifier: "ListGitHubAccountTokenNamesInput",
}) as any as S.Schema<ListGitHubAccountTokenNamesInput>;
export type GitHubAccountTokenNameList = string[];
export const GitHubAccountTokenNameList = /*@__PURE__*/ S.Array(S.String);
export interface ListGitHubAccountTokenNamesOutput {
  tokenNameList?: string[];
  nextToken?: string;
}
export const ListGitHubAccountTokenNamesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tokenNameList: S.optional(GitHubAccountTokenNameList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListGitHubAccountTokenNamesOutput",
}) as any as S.Schema<ListGitHubAccountTokenNamesOutput>;
export type RegistrationStatus = "Registered" | "Deregistered" | (string & {});
export const RegistrationStatus = /*@__PURE__*/ S.String;

export interface ListOnPremisesInstancesInput {
  registrationStatus?: RegistrationStatus;
  tagFilters?: TagFilter[];
  nextToken?: string;
}
export const ListOnPremisesInstancesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    registrationStatus: S.optional(RegistrationStatus),
    tagFilters: S.optional(TagFilterList),
    nextToken: S.optional(S.String),
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
  identifier: "ListOnPremisesInstancesInput",
}) as any as S.Schema<ListOnPremisesInstancesInput>;
export interface ListOnPremisesInstancesOutput {
  instanceNames?: string[];
  nextToken?: string;
}
export const ListOnPremisesInstancesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceNames: S.optional(InstanceNameList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListOnPremisesInstancesOutput",
}) as any as S.Schema<ListOnPremisesInstancesOutput>;
export type Arn = string;
export interface ListTagsForResourceInput {
  ResourceArn: string;
  NextToken?: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, NextToken: S.optional(S.String) }).pipe(
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
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  Tags?: Tag[];
  NextToken?: string;
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList), NextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export type LifecycleEventHookExecutionId = string;
export interface PutLifecycleEventHookExecutionStatusInput {
  deploymentId?: string;
  lifecycleEventHookExecutionId?: string;
  status?: LifecycleEventStatus;
}
export const PutLifecycleEventHookExecutionStatusInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      deploymentId: S.optional(S.String),
      lifecycleEventHookExecutionId: S.optional(S.String),
      status: S.optional(LifecycleEventStatus),
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
    identifier: "PutLifecycleEventHookExecutionStatusInput",
  }) as any as S.Schema<PutLifecycleEventHookExecutionStatusInput>;
export interface PutLifecycleEventHookExecutionStatusOutput {
  lifecycleEventHookExecutionId?: string;
}
export const PutLifecycleEventHookExecutionStatusOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ lifecycleEventHookExecutionId: S.optional(S.String) }).pipe(ns),
  ).annotate({
    identifier: "PutLifecycleEventHookExecutionStatusOutput",
  }) as any as S.Schema<PutLifecycleEventHookExecutionStatusOutput>;
export interface RegisterApplicationRevisionInput {
  applicationName: string;
  description?: string;
  revision: RevisionLocation;
}
export const RegisterApplicationRevisionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationName: S.String,
    description: S.optional(S.String),
    revision: RevisionLocation,
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
  identifier: "RegisterApplicationRevisionInput",
}) as any as S.Schema<RegisterApplicationRevisionInput>;
export interface RegisterApplicationRevisionResponse {}
export const RegisterApplicationRevisionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RegisterApplicationRevisionResponse",
}) as any as S.Schema<RegisterApplicationRevisionResponse>;
export interface RegisterOnPremisesInstanceInput {
  instanceName: string;
  iamSessionArn?: string;
  iamUserArn?: string;
}
export const RegisterOnPremisesInstanceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    instanceName: S.String,
    iamSessionArn: S.optional(S.String),
    iamUserArn: S.optional(S.String),
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
  identifier: "RegisterOnPremisesInstanceInput",
}) as any as S.Schema<RegisterOnPremisesInstanceInput>;
export interface RegisterOnPremisesInstanceResponse {}
export const RegisterOnPremisesInstanceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "RegisterOnPremisesInstanceResponse",
}) as any as S.Schema<RegisterOnPremisesInstanceResponse>;
export interface RemoveTagsFromOnPremisesInstancesInput {
  tags: Tag[];
  instanceNames: string[];
}
export const RemoveTagsFromOnPremisesInstancesInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ tags: TagList, instanceNames: InstanceNameList }).pipe(
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
  identifier: "RemoveTagsFromOnPremisesInstancesInput",
}) as any as S.Schema<RemoveTagsFromOnPremisesInstancesInput>;
export interface RemoveTagsFromOnPremisesInstancesResponse {}
export const RemoveTagsFromOnPremisesInstancesResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "RemoveTagsFromOnPremisesInstancesResponse",
  }) as any as S.Schema<RemoveTagsFromOnPremisesInstancesResponse>;
export interface SkipWaitTimeForInstanceTerminationInput {
  deploymentId?: string;
}
export const SkipWaitTimeForInstanceTerminationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ deploymentId: S.optional(S.String) }).pipe(
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
  identifier: "SkipWaitTimeForInstanceTerminationInput",
}) as any as S.Schema<SkipWaitTimeForInstanceTerminationInput>;
export interface SkipWaitTimeForInstanceTerminationResponse {}
export const SkipWaitTimeForInstanceTerminationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "SkipWaitTimeForInstanceTerminationResponse",
  }) as any as S.Schema<SkipWaitTimeForInstanceTerminationResponse>;
export interface StopDeploymentInput {
  deploymentId: string;
  autoRollbackEnabled?: boolean;
}
export const StopDeploymentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.String,
    autoRollbackEnabled: S.optional(S.Boolean),
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
  identifier: "StopDeploymentInput",
}) as any as S.Schema<StopDeploymentInput>;
export type StopStatus = "Pending" | "Succeeded" | (string & {});
export const StopStatus = /*@__PURE__*/ S.String;

export type Message = string;
export interface StopDeploymentOutput {
  status?: StopStatus;
  statusMessage?: string;
}
export const StopDeploymentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: S.optional(StopStatus),
    statusMessage: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "StopDeploymentOutput",
}) as any as S.Schema<StopDeploymentOutput>;
export interface TagResourceInput {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: TagList }).pipe(
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
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {}
export const TagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagKeys: TagKeyList }).pipe(
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
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export interface UpdateApplicationInput {
  applicationName?: string;
  newApplicationName?: string;
}
export const UpdateApplicationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationName: S.optional(S.String),
    newApplicationName: S.optional(S.String),
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
  identifier: "UpdateApplicationInput",
}) as any as S.Schema<UpdateApplicationInput>;
export interface UpdateApplicationResponse {}
export const UpdateApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateApplicationResponse",
}) as any as S.Schema<UpdateApplicationResponse>;
export interface UpdateDeploymentGroupInput {
  applicationName: string;
  currentDeploymentGroupName: string;
  newDeploymentGroupName?: string;
  deploymentConfigName?: string;
  ec2TagFilters?: EC2TagFilter[];
  onPremisesInstanceTagFilters?: TagFilter[];
  autoScalingGroups?: string[];
  serviceRoleArn?: string;
  triggerConfigurations?: TriggerConfig[];
  alarmConfiguration?: AlarmConfiguration;
  autoRollbackConfiguration?: AutoRollbackConfiguration;
  outdatedInstancesStrategy?: OutdatedInstancesStrategy;
  deploymentStyle?: DeploymentStyle;
  blueGreenDeploymentConfiguration?: BlueGreenDeploymentConfiguration;
  loadBalancerInfo?: LoadBalancerInfo;
  ec2TagSet?: EC2TagSet;
  ecsServices?: ECSService[];
  onPremisesTagSet?: OnPremisesTagSet;
  terminationHookEnabled?: boolean;
}
export const UpdateDeploymentGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    applicationName: S.String,
    currentDeploymentGroupName: S.String,
    newDeploymentGroupName: S.optional(S.String),
    deploymentConfigName: S.optional(S.String),
    ec2TagFilters: S.optional(EC2TagFilterList),
    onPremisesInstanceTagFilters: S.optional(TagFilterList),
    autoScalingGroups: S.optional(AutoScalingGroupNameList),
    serviceRoleArn: S.optional(S.String),
    triggerConfigurations: S.optional(TriggerConfigList),
    alarmConfiguration: S.optional(AlarmConfiguration),
    autoRollbackConfiguration: S.optional(AutoRollbackConfiguration),
    outdatedInstancesStrategy: S.optional(OutdatedInstancesStrategy),
    deploymentStyle: S.optional(DeploymentStyle),
    blueGreenDeploymentConfiguration: S.optional(
      BlueGreenDeploymentConfiguration,
    ),
    loadBalancerInfo: S.optional(LoadBalancerInfo),
    ec2TagSet: S.optional(EC2TagSet),
    ecsServices: S.optional(ECSServiceList),
    onPremisesTagSet: S.optional(OnPremisesTagSet),
    terminationHookEnabled: S.optional(S.Boolean),
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
  identifier: "UpdateDeploymentGroupInput",
}) as any as S.Schema<UpdateDeploymentGroupInput>;
export interface UpdateDeploymentGroupOutput {
  hooksNotCleanedUp?: AutoScalingGroup[];
}
export const UpdateDeploymentGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ hooksNotCleanedUp: S.optional(AutoScalingGroupList) }).pipe(ns),
).annotate({
  identifier: "UpdateDeploymentGroupOutput",
}) as any as S.Schema<UpdateDeploymentGroupOutput>;
export type AddTagsToOnPremisesInstancesError =
  | InstanceLimitExceededException
  | InstanceNameRequiredException
  | InstanceNotRegisteredException
  | InvalidInstanceNameException
  | InvalidTagException
  | TagLimitExceededException
  | TagRequiredException
  | CommonErrors;
/**
 * Adds tags to on-premises instances.
 */
export const addTagsToOnPremisesInstances: API.OperationMethod<
  AddTagsToOnPremisesInstancesInput,
  AddTagsToOnPremisesInstancesResponse,
  AddTagsToOnPremisesInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddTagsToOnPremisesInstancesInput,
  output: AddTagsToOnPremisesInstancesResponse,
  errors: [
    InstanceLimitExceededException,
    InstanceNameRequiredException,
    InstanceNotRegisteredException,
    InvalidInstanceNameException,
    InvalidTagException,
    TagLimitExceededException,
    TagRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTagsToOnPremisesInstances",
}));

export type BatchGetApplicationRevisionsError =
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | BatchLimitExceededException
  | InvalidApplicationNameException
  | InvalidRevisionException
  | RevisionRequiredException
  | CommonErrors;
/**
 * Gets information about one or more application revisions. The maximum number of
 * application revisions that can be returned is 25.
 */
export const batchGetApplicationRevisions: API.OperationMethod<
  BatchGetApplicationRevisionsInput,
  BatchGetApplicationRevisionsOutput,
  BatchGetApplicationRevisionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetApplicationRevisionsInput,
  output: BatchGetApplicationRevisionsOutput,
  errors: [
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    BatchLimitExceededException,
    InvalidApplicationNameException,
    InvalidRevisionException,
    RevisionRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetApplicationRevisions",
}));

export type BatchGetApplicationsError =
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | BatchLimitExceededException
  | InvalidApplicationNameException
  | CommonErrors;
/**
 * Gets information about one or more applications. The maximum number of applications
 * that can be returned is 100.
 */
export const batchGetApplications: API.OperationMethod<
  BatchGetApplicationsInput,
  BatchGetApplicationsOutput,
  BatchGetApplicationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetApplicationsInput,
  output: BatchGetApplicationsOutput,
  errors: [
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    BatchLimitExceededException,
    InvalidApplicationNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetApplications",
}));

export type BatchGetDeploymentGroupsError =
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | BatchLimitExceededException
  | DeploymentConfigDoesNotExistException
  | DeploymentGroupNameRequiredException
  | InvalidApplicationNameException
  | InvalidDeploymentGroupNameException
  | CommonErrors;
/**
 * Gets information about one or more deployment groups.
 */
export const batchGetDeploymentGroups: API.OperationMethod<
  BatchGetDeploymentGroupsInput,
  BatchGetDeploymentGroupsOutput,
  BatchGetDeploymentGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetDeploymentGroupsInput,
  output: BatchGetDeploymentGroupsOutput,
  errors: [
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    BatchLimitExceededException,
    DeploymentConfigDoesNotExistException,
    DeploymentGroupNameRequiredException,
    InvalidApplicationNameException,
    InvalidDeploymentGroupNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetDeploymentGroups",
}));

export type BatchGetDeploymentInstancesError =
  | BatchLimitExceededException
  | DeploymentDoesNotExistException
  | DeploymentIdRequiredException
  | InstanceIdRequiredException
  | InvalidComputePlatformException
  | InvalidDeploymentIdException
  | InvalidInstanceNameException
  | CommonErrors;
/**
 * This method works, but is deprecated. Use `BatchGetDeploymentTargets`
 * instead.
 *
 * Returns an array of one or more instances associated with a deployment. This method
 * works with EC2/On-premises and Lambda compute platforms. The newer
 * `BatchGetDeploymentTargets` works with all compute platforms. The maximum
 * number of instances that can be returned is 25.
 */
export const batchGetDeploymentInstances: API.OperationMethod<
  BatchGetDeploymentInstancesInput,
  BatchGetDeploymentInstancesOutput,
  BatchGetDeploymentInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetDeploymentInstancesInput,
  output: BatchGetDeploymentInstancesOutput,
  errors: [
    BatchLimitExceededException,
    DeploymentDoesNotExistException,
    DeploymentIdRequiredException,
    InstanceIdRequiredException,
    InvalidComputePlatformException,
    InvalidDeploymentIdException,
    InvalidInstanceNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetDeploymentInstances",
}));

export type BatchGetDeploymentsError =
  | BatchLimitExceededException
  | DeploymentIdRequiredException
  | InvalidDeploymentIdException
  | CommonErrors;
/**
 * Gets information about one or more deployments. The maximum number of deployments that
 * can be returned is 25.
 */
export const batchGetDeployments: API.OperationMethod<
  BatchGetDeploymentsInput,
  BatchGetDeploymentsOutput,
  BatchGetDeploymentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetDeploymentsInput,
  output: BatchGetDeploymentsOutput,
  errors: [
    BatchLimitExceededException,
    DeploymentIdRequiredException,
    InvalidDeploymentIdException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetDeployments",
}));

export type BatchGetDeploymentTargetsError =
  | DeploymentDoesNotExistException
  | DeploymentIdRequiredException
  | DeploymentNotStartedException
  | DeploymentTargetDoesNotExistException
  | DeploymentTargetIdRequiredException
  | DeploymentTargetListSizeExceededException
  | InstanceDoesNotExistException
  | InvalidDeploymentIdException
  | InvalidDeploymentTargetIdException
  | CommonErrors;
/**
 * Returns an array of one or more targets associated with a deployment. This method
 * works with all compute types and should be used instead of the deprecated
 * `BatchGetDeploymentInstances`. The maximum number of targets that can be
 * returned is 25.
 *
 * The type of targets returned depends on the deployment's compute platform or
 * deployment method:
 *
 * - **EC2/On-premises**: Information about Amazon EC2 instance targets.
 *
 * - **Lambda**: Information about
 * Lambda functions targets.
 *
 * - **Amazon ECS**: Information about Amazon ECS service targets.
 *
 * - **CloudFormation**: Information about
 * targets of blue/green deployments initiated by a CloudFormation stack
 * update.
 */
export const batchGetDeploymentTargets: API.OperationMethod<
  BatchGetDeploymentTargetsInput,
  BatchGetDeploymentTargetsOutput,
  BatchGetDeploymentTargetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetDeploymentTargetsInput,
  output: BatchGetDeploymentTargetsOutput,
  errors: [
    DeploymentDoesNotExistException,
    DeploymentIdRequiredException,
    DeploymentNotStartedException,
    DeploymentTargetDoesNotExistException,
    DeploymentTargetIdRequiredException,
    DeploymentTargetListSizeExceededException,
    InstanceDoesNotExistException,
    InvalidDeploymentIdException,
    InvalidDeploymentTargetIdException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetDeploymentTargets",
}));

export type BatchGetOnPremisesInstancesError =
  | BatchLimitExceededException
  | InstanceNameRequiredException
  | InvalidInstanceNameException
  | CommonErrors;
/**
 * Gets information about one or more on-premises instances. The maximum number of
 * on-premises instances that can be returned is 25.
 */
export const batchGetOnPremisesInstances: API.OperationMethod<
  BatchGetOnPremisesInstancesInput,
  BatchGetOnPremisesInstancesOutput,
  BatchGetOnPremisesInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetOnPremisesInstancesInput,
  output: BatchGetOnPremisesInstancesOutput,
  errors: [
    BatchLimitExceededException,
    InstanceNameRequiredException,
    InvalidInstanceNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetOnPremisesInstances",
}));

export type ContinueDeploymentError =
  | DeploymentAlreadyCompletedException
  | DeploymentDoesNotExistException
  | DeploymentIdRequiredException
  | DeploymentIsNotInReadyStateException
  | InvalidDeploymentIdException
  | InvalidDeploymentStatusException
  | InvalidDeploymentWaitTypeException
  | UnsupportedActionForDeploymentTypeException
  | CommonErrors;
/**
 * For a blue/green deployment, starts the process of rerouting traffic from instances in
 * the original environment to instances in the replacement environment without waiting for
 * a specified wait time to elapse. (Traffic rerouting, which is achieved by registering
 * instances in the replacement environment with the load balancer, can start as soon as
 * all instances have a status of Ready.)
 */
export const continueDeployment: API.OperationMethod<
  ContinueDeploymentInput,
  ContinueDeploymentResponse,
  ContinueDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ContinueDeploymentInput,
  output: ContinueDeploymentResponse,
  errors: [
    DeploymentAlreadyCompletedException,
    DeploymentDoesNotExistException,
    DeploymentIdRequiredException,
    DeploymentIsNotInReadyStateException,
    InvalidDeploymentIdException,
    InvalidDeploymentStatusException,
    InvalidDeploymentWaitTypeException,
    UnsupportedActionForDeploymentTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ContinueDeployment",
}));

export type CreateApplicationError =
  | ApplicationAlreadyExistsException
  | ApplicationLimitExceededException
  | ApplicationNameRequiredException
  | InvalidApplicationNameException
  | InvalidComputePlatformException
  | InvalidTagsToAddException
  | CommonErrors;
/**
 * Creates an application.
 */
export const createApplication: API.OperationMethod<
  CreateApplicationInput,
  CreateApplicationOutput,
  CreateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApplicationInput,
  output: CreateApplicationOutput,
  errors: [
    ApplicationAlreadyExistsException,
    ApplicationLimitExceededException,
    ApplicationNameRequiredException,
    InvalidApplicationNameException,
    InvalidComputePlatformException,
    InvalidTagsToAddException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApplication",
}));

export type CreateDeploymentError =
  | AlarmsLimitExceededException
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | DeploymentConfigDoesNotExistException
  | DeploymentGroupDoesNotExistException
  | DeploymentGroupNameRequiredException
  | DeploymentLimitExceededException
  | DescriptionTooLongException
  | InvalidAlarmConfigException
  | InvalidApplicationNameException
  | InvalidAutoRollbackConfigException
  | InvalidAutoScalingGroupException
  | InvalidDeploymentConfigNameException
  | InvalidDeploymentGroupNameException
  | InvalidFileExistsBehaviorException
  | InvalidGitHubAccountTokenException
  | InvalidIgnoreApplicationStopFailuresValueException
  | InvalidLoadBalancerInfoException
  | InvalidRevisionException
  | InvalidRoleException
  | InvalidTargetInstancesException
  | InvalidTrafficRoutingConfigurationException
  | InvalidUpdateOutdatedInstancesOnlyValueException
  | RevisionDoesNotExistException
  | RevisionRequiredException
  | ThrottlingException
  | CommonErrors;
/**
 * Deploys an application revision through the specified deployment group.
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
    AlarmsLimitExceededException,
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    DeploymentConfigDoesNotExistException,
    DeploymentGroupDoesNotExistException,
    DeploymentGroupNameRequiredException,
    DeploymentLimitExceededException,
    DescriptionTooLongException,
    InvalidAlarmConfigException,
    InvalidApplicationNameException,
    InvalidAutoRollbackConfigException,
    InvalidAutoScalingGroupException,
    InvalidDeploymentConfigNameException,
    InvalidDeploymentGroupNameException,
    InvalidFileExistsBehaviorException,
    InvalidGitHubAccountTokenException,
    InvalidIgnoreApplicationStopFailuresValueException,
    InvalidLoadBalancerInfoException,
    InvalidRevisionException,
    InvalidRoleException,
    InvalidTargetInstancesException,
    InvalidTrafficRoutingConfigurationException,
    InvalidUpdateOutdatedInstancesOnlyValueException,
    RevisionDoesNotExistException,
    RevisionRequiredException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeployment",
}));

export type CreateDeploymentConfigError =
  | DeploymentConfigAlreadyExistsException
  | DeploymentConfigLimitExceededException
  | DeploymentConfigNameRequiredException
  | InvalidComputePlatformException
  | InvalidDeploymentConfigNameException
  | InvalidMinimumHealthyHostValueException
  | InvalidTrafficRoutingConfigurationException
  | InvalidZonalDeploymentConfigurationException
  | CommonErrors;
/**
 * Creates a deployment configuration.
 */
export const createDeploymentConfig: API.OperationMethod<
  CreateDeploymentConfigInput,
  CreateDeploymentConfigOutput,
  CreateDeploymentConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDeploymentConfigInput,
  output: CreateDeploymentConfigOutput,
  errors: [
    DeploymentConfigAlreadyExistsException,
    DeploymentConfigLimitExceededException,
    DeploymentConfigNameRequiredException,
    InvalidComputePlatformException,
    InvalidDeploymentConfigNameException,
    InvalidMinimumHealthyHostValueException,
    InvalidTrafficRoutingConfigurationException,
    InvalidZonalDeploymentConfigurationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeploymentConfig",
}));

export type CreateDeploymentGroupError =
  | AlarmsLimitExceededException
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | DeploymentConfigDoesNotExistException
  | DeploymentGroupAlreadyExistsException
  | DeploymentGroupLimitExceededException
  | DeploymentGroupNameRequiredException
  | ECSServiceMappingLimitExceededException
  | InvalidAlarmConfigException
  | InvalidApplicationNameException
  | InvalidAutoRollbackConfigException
  | InvalidAutoScalingGroupException
  | InvalidBlueGreenDeploymentConfigurationException
  | InvalidDeploymentConfigNameException
  | InvalidDeploymentGroupNameException
  | InvalidDeploymentStyleException
  | InvalidEC2TagCombinationException
  | InvalidEC2TagException
  | InvalidECSServiceException
  | InvalidInputException
  | InvalidLoadBalancerInfoException
  | InvalidOnPremisesTagCombinationException
  | InvalidRoleException
  | InvalidTagException
  | InvalidTagsToAddException
  | InvalidTargetGroupPairException
  | InvalidTrafficRoutingConfigurationException
  | InvalidTriggerConfigException
  | LifecycleHookLimitExceededException
  | RoleRequiredException
  | TagSetListLimitExceededException
  | ThrottlingException
  | TriggerTargetsLimitExceededException
  | CommonErrors;
/**
 * Creates a deployment group to which application revisions are deployed.
 */
export const createDeploymentGroup: API.OperationMethod<
  CreateDeploymentGroupInput,
  CreateDeploymentGroupOutput,
  CreateDeploymentGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDeploymentGroupInput,
  output: CreateDeploymentGroupOutput,
  errors: [
    AlarmsLimitExceededException,
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    DeploymentConfigDoesNotExistException,
    DeploymentGroupAlreadyExistsException,
    DeploymentGroupLimitExceededException,
    DeploymentGroupNameRequiredException,
    ECSServiceMappingLimitExceededException,
    InvalidAlarmConfigException,
    InvalidApplicationNameException,
    InvalidAutoRollbackConfigException,
    InvalidAutoScalingGroupException,
    InvalidBlueGreenDeploymentConfigurationException,
    InvalidDeploymentConfigNameException,
    InvalidDeploymentGroupNameException,
    InvalidDeploymentStyleException,
    InvalidEC2TagCombinationException,
    InvalidEC2TagException,
    InvalidECSServiceException,
    InvalidInputException,
    InvalidLoadBalancerInfoException,
    InvalidOnPremisesTagCombinationException,
    InvalidRoleException,
    InvalidTagException,
    InvalidTagsToAddException,
    InvalidTargetGroupPairException,
    InvalidTrafficRoutingConfigurationException,
    InvalidTriggerConfigException,
    LifecycleHookLimitExceededException,
    RoleRequiredException,
    TagSetListLimitExceededException,
    ThrottlingException,
    TriggerTargetsLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeploymentGroup",
}));

export type DeleteApplicationError =
  | ApplicationNameRequiredException
  | InvalidApplicationNameException
  | InvalidRoleException
  | CommonErrors;
/**
 * Deletes an application.
 */
export const deleteApplication: API.OperationMethod<
  DeleteApplicationInput,
  DeleteApplicationResponse,
  DeleteApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApplicationInput,
  output: DeleteApplicationResponse,
  errors: [
    ApplicationNameRequiredException,
    InvalidApplicationNameException,
    InvalidRoleException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApplication",
}));

export type DeleteDeploymentConfigError =
  | DeploymentConfigInUseException
  | DeploymentConfigNameRequiredException
  | InvalidDeploymentConfigNameException
  | InvalidOperationException
  | CommonErrors;
/**
 * Deletes a deployment configuration.
 *
 * A deployment configuration cannot be deleted if it is currently in use. Predefined
 * configurations cannot be deleted.
 */
export const deleteDeploymentConfig: API.OperationMethod<
  DeleteDeploymentConfigInput,
  DeleteDeploymentConfigResponse,
  DeleteDeploymentConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDeploymentConfigInput,
  output: DeleteDeploymentConfigResponse,
  errors: [
    DeploymentConfigInUseException,
    DeploymentConfigNameRequiredException,
    InvalidDeploymentConfigNameException,
    InvalidOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeploymentConfig",
}));

export type DeleteDeploymentGroupError =
  | ApplicationNameRequiredException
  | DeploymentGroupNameRequiredException
  | InvalidApplicationNameException
  | InvalidDeploymentGroupNameException
  | InvalidRoleException
  | CommonErrors;
/**
 * Deletes a deployment group.
 */
export const deleteDeploymentGroup: API.OperationMethod<
  DeleteDeploymentGroupInput,
  DeleteDeploymentGroupOutput,
  DeleteDeploymentGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDeploymentGroupInput,
  output: DeleteDeploymentGroupOutput,
  errors: [
    ApplicationNameRequiredException,
    DeploymentGroupNameRequiredException,
    InvalidApplicationNameException,
    InvalidDeploymentGroupNameException,
    InvalidRoleException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeploymentGroup",
}));

export type DeleteGitHubAccountTokenError =
  | GitHubAccountTokenDoesNotExistException
  | GitHubAccountTokenNameRequiredException
  | InvalidGitHubAccountTokenNameException
  | OperationNotSupportedException
  | ResourceValidationException
  | CommonErrors;
/**
 * Deletes a GitHub account connection.
 */
export const deleteGitHubAccountToken: API.OperationMethod<
  DeleteGitHubAccountTokenInput,
  DeleteGitHubAccountTokenOutput,
  DeleteGitHubAccountTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGitHubAccountTokenInput,
  output: DeleteGitHubAccountTokenOutput,
  errors: [
    GitHubAccountTokenDoesNotExistException,
    GitHubAccountTokenNameRequiredException,
    InvalidGitHubAccountTokenNameException,
    OperationNotSupportedException,
    ResourceValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGitHubAccountToken",
}));

export type DeleteResourcesByExternalIdError = CommonErrors;
/**
 * Deletes resources linked to an external ID. This action only applies if you have
 * configured blue/green deployments through CloudFormation.
 *
 * It is not necessary to call this action directly. CloudFormation calls it
 * on your behalf when it needs to delete stack resources. This action is offered
 * publicly in case you need to delete resources to comply with General Data Protection
 * Regulation (GDPR) requirements.
 */
export const deleteResourcesByExternalId: API.OperationMethod<
  DeleteResourcesByExternalIdInput,
  DeleteResourcesByExternalIdOutput,
  DeleteResourcesByExternalIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourcesByExternalIdInput,
  output: DeleteResourcesByExternalIdOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcesByExternalId",
}));

export type DeregisterOnPremisesInstanceError =
  | InstanceNameRequiredException
  | InvalidInstanceNameException
  | CommonErrors;
/**
 * Deregisters an on-premises instance.
 */
export const deregisterOnPremisesInstance: API.OperationMethod<
  DeregisterOnPremisesInstanceInput,
  DeregisterOnPremisesInstanceResponse,
  DeregisterOnPremisesInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterOnPremisesInstanceInput,
  output: DeregisterOnPremisesInstanceResponse,
  errors: [InstanceNameRequiredException, InvalidInstanceNameException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterOnPremisesInstance",
}));

export type GetApplicationError =
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | InvalidApplicationNameException
  | CommonErrors;
/**
 * Gets information about an application.
 */
export const getApplication: API.OperationMethod<
  GetApplicationInput,
  GetApplicationOutput,
  GetApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApplicationInput,
  output: GetApplicationOutput,
  errors: [
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    InvalidApplicationNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplication",
}));

export type GetApplicationRevisionError =
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | InvalidApplicationNameException
  | InvalidRevisionException
  | RevisionDoesNotExistException
  | RevisionRequiredException
  | CommonErrors;
/**
 * Gets information about an application revision.
 */
export const getApplicationRevision: API.OperationMethod<
  GetApplicationRevisionInput,
  GetApplicationRevisionOutput,
  GetApplicationRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApplicationRevisionInput,
  output: GetApplicationRevisionOutput,
  errors: [
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    InvalidApplicationNameException,
    InvalidRevisionException,
    RevisionDoesNotExistException,
    RevisionRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplicationRevision",
}));

export type GetDeploymentError =
  | DeploymentDoesNotExistException
  | DeploymentIdRequiredException
  | InvalidDeploymentIdException
  | CommonErrors;
/**
 * Gets information about a deployment.
 *
 * The `content` property of the `appSpecContent` object in
 * the returned revision is always null. Use `GetApplicationRevision` and
 * the `sha256` property of the returned `appSpecContent` object
 * to get the content of the deployment’s AppSpec file.
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
    DeploymentDoesNotExistException,
    DeploymentIdRequiredException,
    InvalidDeploymentIdException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployment",
}));

export type GetDeploymentConfigError =
  | DeploymentConfigDoesNotExistException
  | DeploymentConfigNameRequiredException
  | InvalidComputePlatformException
  | InvalidDeploymentConfigNameException
  | CommonErrors;
/**
 * Gets information about a deployment configuration.
 */
export const getDeploymentConfig: API.OperationMethod<
  GetDeploymentConfigInput,
  GetDeploymentConfigOutput,
  GetDeploymentConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeploymentConfigInput,
  output: GetDeploymentConfigOutput,
  errors: [
    DeploymentConfigDoesNotExistException,
    DeploymentConfigNameRequiredException,
    InvalidComputePlatformException,
    InvalidDeploymentConfigNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeploymentConfig",
}));

export type GetDeploymentGroupError =
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | DeploymentConfigDoesNotExistException
  | DeploymentGroupDoesNotExistException
  | DeploymentGroupNameRequiredException
  | InvalidApplicationNameException
  | InvalidDeploymentGroupNameException
  | CommonErrors;
/**
 * Gets information about a deployment group.
 */
export const getDeploymentGroup: API.OperationMethod<
  GetDeploymentGroupInput,
  GetDeploymentGroupOutput,
  GetDeploymentGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeploymentGroupInput,
  output: GetDeploymentGroupOutput,
  errors: [
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    DeploymentConfigDoesNotExistException,
    DeploymentGroupDoesNotExistException,
    DeploymentGroupNameRequiredException,
    InvalidApplicationNameException,
    InvalidDeploymentGroupNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeploymentGroup",
}));

export type GetDeploymentInstanceError =
  | DeploymentDoesNotExistException
  | DeploymentIdRequiredException
  | InstanceDoesNotExistException
  | InstanceIdRequiredException
  | InvalidComputePlatformException
  | InvalidDeploymentIdException
  | InvalidInstanceNameException
  | CommonErrors;
/**
 * Gets information about an instance as part of a deployment.
 */
export const getDeploymentInstance: API.OperationMethod<
  GetDeploymentInstanceInput,
  GetDeploymentInstanceOutput,
  GetDeploymentInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeploymentInstanceInput,
  output: GetDeploymentInstanceOutput,
  errors: [
    DeploymentDoesNotExistException,
    DeploymentIdRequiredException,
    InstanceDoesNotExistException,
    InstanceIdRequiredException,
    InvalidComputePlatformException,
    InvalidDeploymentIdException,
    InvalidInstanceNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeploymentInstance",
}));

export type GetDeploymentTargetError =
  | DeploymentDoesNotExistException
  | DeploymentIdRequiredException
  | DeploymentNotStartedException
  | DeploymentTargetDoesNotExistException
  | DeploymentTargetIdRequiredException
  | InvalidDeploymentIdException
  | InvalidDeploymentTargetIdException
  | InvalidInstanceNameException
  | CommonErrors;
/**
 * Returns information about a deployment target.
 */
export const getDeploymentTarget: API.OperationMethod<
  GetDeploymentTargetInput,
  GetDeploymentTargetOutput,
  GetDeploymentTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeploymentTargetInput,
  output: GetDeploymentTargetOutput,
  errors: [
    DeploymentDoesNotExistException,
    DeploymentIdRequiredException,
    DeploymentNotStartedException,
    DeploymentTargetDoesNotExistException,
    DeploymentTargetIdRequiredException,
    InvalidDeploymentIdException,
    InvalidDeploymentTargetIdException,
    InvalidInstanceNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeploymentTarget",
}));

export type GetOnPremisesInstanceError =
  | InstanceNameRequiredException
  | InstanceNotRegisteredException
  | InvalidInstanceNameException
  | CommonErrors;
/**
 * Gets information about an on-premises instance.
 */
export const getOnPremisesInstance: API.OperationMethod<
  GetOnPremisesInstanceInput,
  GetOnPremisesInstanceOutput,
  GetOnPremisesInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOnPremisesInstanceInput,
  output: GetOnPremisesInstanceOutput,
  errors: [
    InstanceNameRequiredException,
    InstanceNotRegisteredException,
    InvalidInstanceNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOnPremisesInstance",
}));

export type ListApplicationRevisionsError =
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | BucketNameFilterRequiredException
  | InvalidApplicationNameException
  | InvalidBucketNameFilterException
  | InvalidDeployedStateFilterException
  | InvalidKeyPrefixFilterException
  | InvalidNextTokenException
  | InvalidSortByException
  | InvalidSortOrderException
  | CommonErrors;
/**
 * Lists information about revisions for an application.
 */
export const listApplicationRevisions: API.PaginatedOperationMethod<
  ListApplicationRevisionsInput,
  ListApplicationRevisionsOutput,
  ListApplicationRevisionsError,
  Credentials | HttpClient.HttpClient,
  RevisionLocation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationRevisionsInput,
  output: ListApplicationRevisionsOutput,
  errors: [
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    BucketNameFilterRequiredException,
    InvalidApplicationNameException,
    InvalidBucketNameFilterException,
    InvalidDeployedStateFilterException,
    InvalidKeyPrefixFilterException,
    InvalidNextTokenException,
    InvalidSortByException,
    InvalidSortOrderException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationRevisions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "revisions",
  } as const,
})) as any;

export type ListApplicationsError = InvalidNextTokenException | CommonErrors;
/**
 * Lists the applications registered with the user or Amazon Web Services account.
 */
export const listApplications: API.PaginatedOperationMethod<
  ListApplicationsInput,
  ListApplicationsOutput,
  ListApplicationsError,
  Credentials | HttpClient.HttpClient,
  ApplicationName
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationsInput,
  output: ListApplicationsOutput,
  errors: [InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "applications",
  } as const,
})) as any;

export type ListDeploymentConfigsError =
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Lists the deployment configurations with the user or Amazon Web Services account.
 */
export const listDeploymentConfigs: API.PaginatedOperationMethod<
  ListDeploymentConfigsInput,
  ListDeploymentConfigsOutput,
  ListDeploymentConfigsError,
  Credentials | HttpClient.HttpClient,
  DeploymentConfigName
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDeploymentConfigsInput,
  output: ListDeploymentConfigsOutput,
  errors: [InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeploymentConfigs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deploymentConfigsList",
  } as const,
})) as any;

export type ListDeploymentGroupsError =
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | InvalidApplicationNameException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Lists the deployment groups for an application registered with the Amazon Web Services
 * user or Amazon Web Services account.
 */
export const listDeploymentGroups: API.PaginatedOperationMethod<
  ListDeploymentGroupsInput,
  ListDeploymentGroupsOutput,
  ListDeploymentGroupsError,
  Credentials | HttpClient.HttpClient,
  DeploymentGroupName
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDeploymentGroupsInput,
  output: ListDeploymentGroupsOutput,
  errors: [
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    InvalidApplicationNameException,
    InvalidNextTokenException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeploymentGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deploymentGroups",
  } as const,
})) as any;

export type ListDeploymentInstancesError =
  | DeploymentDoesNotExistException
  | DeploymentIdRequiredException
  | DeploymentNotStartedException
  | InvalidComputePlatformException
  | InvalidDeploymentIdException
  | InvalidDeploymentInstanceTypeException
  | InvalidInstanceStatusException
  | InvalidInstanceTypeException
  | InvalidNextTokenException
  | InvalidTargetFilterNameException
  | CommonErrors;
/**
 * The newer `BatchGetDeploymentTargets` should be used instead because
 * it works with all compute types. `ListDeploymentInstances` throws an
 * exception if it is used with a compute platform other than EC2/On-premises or
 * Lambda.
 *
 * Lists the instance for a deployment associated with the user or Amazon Web Services account.
 */
export const listDeploymentInstances: API.PaginatedOperationMethod<
  ListDeploymentInstancesInput,
  ListDeploymentInstancesOutput,
  ListDeploymentInstancesError,
  Credentials | HttpClient.HttpClient,
  InstanceId
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDeploymentInstancesInput,
  output: ListDeploymentInstancesOutput,
  errors: [
    DeploymentDoesNotExistException,
    DeploymentIdRequiredException,
    DeploymentNotStartedException,
    InvalidComputePlatformException,
    InvalidDeploymentIdException,
    InvalidDeploymentInstanceTypeException,
    InvalidInstanceStatusException,
    InvalidInstanceTypeException,
    InvalidNextTokenException,
    InvalidTargetFilterNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeploymentInstances",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "instancesList",
  } as const,
})) as any;

export type ListDeploymentsError =
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | DeploymentGroupDoesNotExistException
  | DeploymentGroupNameRequiredException
  | InvalidApplicationNameException
  | InvalidDeploymentGroupNameException
  | InvalidDeploymentStatusException
  | InvalidExternalIdException
  | InvalidInputException
  | InvalidNextTokenException
  | InvalidTimeRangeException
  | CommonErrors;
/**
 * Lists the deployments in a deployment group for an application registered with the
 * user or Amazon Web Services account.
 */
export const listDeployments: API.PaginatedOperationMethod<
  ListDeploymentsInput,
  ListDeploymentsOutput,
  ListDeploymentsError,
  Credentials | HttpClient.HttpClient,
  DeploymentId
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDeploymentsInput,
  output: ListDeploymentsOutput,
  errors: [
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    DeploymentGroupDoesNotExistException,
    DeploymentGroupNameRequiredException,
    InvalidApplicationNameException,
    InvalidDeploymentGroupNameException,
    InvalidDeploymentStatusException,
    InvalidExternalIdException,
    InvalidInputException,
    InvalidNextTokenException,
    InvalidTimeRangeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeployments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deployments",
  } as const,
})) as any;

export type ListDeploymentTargetsError =
  | DeploymentDoesNotExistException
  | DeploymentIdRequiredException
  | DeploymentNotStartedException
  | InvalidDeploymentIdException
  | InvalidDeploymentInstanceTypeException
  | InvalidInstanceStatusException
  | InvalidInstanceTypeException
  | InvalidNextTokenException
  | InvalidTargetFilterNameException
  | CommonErrors;
/**
 * Returns an array of target IDs that are associated a deployment.
 */
export const listDeploymentTargets: API.OperationMethod<
  ListDeploymentTargetsInput,
  ListDeploymentTargetsOutput,
  ListDeploymentTargetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListDeploymentTargetsInput,
  output: ListDeploymentTargetsOutput,
  errors: [
    DeploymentDoesNotExistException,
    DeploymentIdRequiredException,
    DeploymentNotStartedException,
    InvalidDeploymentIdException,
    InvalidDeploymentInstanceTypeException,
    InvalidInstanceStatusException,
    InvalidInstanceTypeException,
    InvalidNextTokenException,
    InvalidTargetFilterNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeploymentTargets",
}));

export type ListGitHubAccountTokenNamesError =
  | InvalidNextTokenException
  | OperationNotSupportedException
  | ResourceValidationException
  | CommonErrors;
/**
 * Lists the names of stored connections to GitHub accounts.
 */
export const listGitHubAccountTokenNames: API.OperationMethod<
  ListGitHubAccountTokenNamesInput,
  ListGitHubAccountTokenNamesOutput,
  ListGitHubAccountTokenNamesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListGitHubAccountTokenNamesInput,
  output: ListGitHubAccountTokenNamesOutput,
  errors: [
    InvalidNextTokenException,
    OperationNotSupportedException,
    ResourceValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGitHubAccountTokenNames",
}));

export type ListOnPremisesInstancesError =
  | InvalidNextTokenException
  | InvalidRegistrationStatusException
  | InvalidTagFilterException
  | CommonErrors;
/**
 * Gets a list of names for one or more on-premises instances.
 *
 * Unless otherwise specified, both registered and deregistered on-premises instance
 * names are listed. To list only registered or deregistered on-premises instance names,
 * use the registration status parameter.
 */
export const listOnPremisesInstances: API.OperationMethod<
  ListOnPremisesInstancesInput,
  ListOnPremisesInstancesOutput,
  ListOnPremisesInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListOnPremisesInstancesInput,
  output: ListOnPremisesInstancesOutput,
  errors: [
    InvalidNextTokenException,
    InvalidRegistrationStatusException,
    InvalidTagFilterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOnPremisesInstances",
}));

export type ListTagsForResourceError =
  | ArnNotSupportedException
  | InvalidArnException
  | ResourceArnRequiredException
  | CommonErrors;
/**
 * Returns a list of tags for the resource identified by a specified Amazon Resource
 * Name (ARN). Tags are used to organize and categorize your CodeDeploy resources.
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
    ArnNotSupportedException,
    InvalidArnException,
    ResourceArnRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutLifecycleEventHookExecutionStatusError =
  | DeploymentDoesNotExistException
  | DeploymentIdRequiredException
  | InvalidDeploymentIdException
  | InvalidLifecycleEventHookExecutionIdException
  | InvalidLifecycleEventHookExecutionStatusException
  | LifecycleEventAlreadyCompletedException
  | UnsupportedActionForDeploymentTypeException
  | CommonErrors;
/**
 * Sets the result of a Lambda validation function. The function validates
 * lifecycle hooks during a deployment that uses the Lambda or Amazon ECS compute platform. For Lambda deployments, the available
 * lifecycle hooks are `BeforeAllowTraffic` and `AfterAllowTraffic`.
 * For Amazon ECS deployments, the available lifecycle hooks are
 * `BeforeInstall`, `AfterInstall`,
 * `AfterAllowTestTraffic`, `BeforeAllowTraffic`, and
 * `AfterAllowTraffic`. Lambda validation functions return
 * `Succeeded` or `Failed`. For more information, see AppSpec 'hooks' Section for an Lambda Deployment and
 * AppSpec 'hooks' Section for an Amazon ECS Deployment.
 */
export const putLifecycleEventHookExecutionStatus: API.OperationMethod<
  PutLifecycleEventHookExecutionStatusInput,
  PutLifecycleEventHookExecutionStatusOutput,
  PutLifecycleEventHookExecutionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutLifecycleEventHookExecutionStatusInput,
  output: PutLifecycleEventHookExecutionStatusOutput,
  errors: [
    DeploymentDoesNotExistException,
    DeploymentIdRequiredException,
    InvalidDeploymentIdException,
    InvalidLifecycleEventHookExecutionIdException,
    InvalidLifecycleEventHookExecutionStatusException,
    LifecycleEventAlreadyCompletedException,
    UnsupportedActionForDeploymentTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLifecycleEventHookExecutionStatus",
}));

export type RegisterApplicationRevisionError =
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | DescriptionTooLongException
  | InvalidApplicationNameException
  | InvalidRevisionException
  | RevisionRequiredException
  | CommonErrors;
/**
 * Registers with CodeDeploy a revision for the specified application.
 */
export const registerApplicationRevision: API.OperationMethod<
  RegisterApplicationRevisionInput,
  RegisterApplicationRevisionResponse,
  RegisterApplicationRevisionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterApplicationRevisionInput,
  output: RegisterApplicationRevisionResponse,
  errors: [
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    DescriptionTooLongException,
    InvalidApplicationNameException,
    InvalidRevisionException,
    RevisionRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterApplicationRevision",
}));

export type RegisterOnPremisesInstanceError =
  | IamArnRequiredException
  | IamSessionArnAlreadyRegisteredException
  | IamUserArnAlreadyRegisteredException
  | IamUserArnRequiredException
  | InstanceNameAlreadyRegisteredException
  | InstanceNameRequiredException
  | InvalidIamSessionArnException
  | InvalidIamUserArnException
  | InvalidInstanceNameException
  | MultipleIamArnsProvidedException
  | CommonErrors;
/**
 * Registers an on-premises instance.
 *
 * Only one IAM ARN (an IAM session ARN or IAM user ARN) is supported in the request. You cannot use both.
 */
export const registerOnPremisesInstance: API.OperationMethod<
  RegisterOnPremisesInstanceInput,
  RegisterOnPremisesInstanceResponse,
  RegisterOnPremisesInstanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterOnPremisesInstanceInput,
  output: RegisterOnPremisesInstanceResponse,
  errors: [
    IamArnRequiredException,
    IamSessionArnAlreadyRegisteredException,
    IamUserArnAlreadyRegisteredException,
    IamUserArnRequiredException,
    InstanceNameAlreadyRegisteredException,
    InstanceNameRequiredException,
    InvalidIamSessionArnException,
    InvalidIamUserArnException,
    InvalidInstanceNameException,
    MultipleIamArnsProvidedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterOnPremisesInstance",
}));

export type RemoveTagsFromOnPremisesInstancesError =
  | InstanceLimitExceededException
  | InstanceNameRequiredException
  | InstanceNotRegisteredException
  | InvalidInstanceNameException
  | InvalidTagException
  | TagLimitExceededException
  | TagRequiredException
  | CommonErrors;
/**
 * Removes one or more tags from one or more on-premises instances.
 */
export const removeTagsFromOnPremisesInstances: API.OperationMethod<
  RemoveTagsFromOnPremisesInstancesInput,
  RemoveTagsFromOnPremisesInstancesResponse,
  RemoveTagsFromOnPremisesInstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveTagsFromOnPremisesInstancesInput,
  output: RemoveTagsFromOnPremisesInstancesResponse,
  errors: [
    InstanceLimitExceededException,
    InstanceNameRequiredException,
    InstanceNotRegisteredException,
    InvalidInstanceNameException,
    InvalidTagException,
    TagLimitExceededException,
    TagRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTagsFromOnPremisesInstances",
}));

export type SkipWaitTimeForInstanceTerminationError =
  | DeploymentAlreadyCompletedException
  | DeploymentDoesNotExistException
  | DeploymentIdRequiredException
  | DeploymentNotStartedException
  | InvalidDeploymentIdException
  | UnsupportedActionForDeploymentTypeException
  | CommonErrors;
/**
 * In a blue/green deployment, overrides any specified wait time and starts terminating
 * instances immediately after the traffic routing is complete.
 */
export const skipWaitTimeForInstanceTermination: API.OperationMethod<
  SkipWaitTimeForInstanceTerminationInput,
  SkipWaitTimeForInstanceTerminationResponse,
  SkipWaitTimeForInstanceTerminationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SkipWaitTimeForInstanceTerminationInput,
  output: SkipWaitTimeForInstanceTerminationResponse,
  errors: [
    DeploymentAlreadyCompletedException,
    DeploymentDoesNotExistException,
    DeploymentIdRequiredException,
    DeploymentNotStartedException,
    InvalidDeploymentIdException,
    UnsupportedActionForDeploymentTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SkipWaitTimeForInstanceTermination",
}));

export type StopDeploymentError =
  | DeploymentAlreadyCompletedException
  | DeploymentDoesNotExistException
  | DeploymentGroupDoesNotExistException
  | DeploymentIdRequiredException
  | InvalidDeploymentIdException
  | UnsupportedActionForDeploymentTypeException
  | CommonErrors;
/**
 * Attempts to stop an ongoing deployment.
 */
export const stopDeployment: API.OperationMethod<
  StopDeploymentInput,
  StopDeploymentOutput,
  StopDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopDeploymentInput,
  output: StopDeploymentOutput,
  errors: [
    DeploymentAlreadyCompletedException,
    DeploymentDoesNotExistException,
    DeploymentGroupDoesNotExistException,
    DeploymentIdRequiredException,
    InvalidDeploymentIdException,
    UnsupportedActionForDeploymentTypeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopDeployment",
}));

export type TagResourceError =
  | ApplicationDoesNotExistException
  | ArnNotSupportedException
  | DeploymentConfigDoesNotExistException
  | DeploymentGroupDoesNotExistException
  | InvalidArnException
  | InvalidTagsToAddException
  | ResourceArnRequiredException
  | TagRequiredException
  | CommonErrors;
/**
 * Associates the list of tags in the input `Tags` parameter with the
 * resource identified by the `ResourceArn` input parameter.
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
    ApplicationDoesNotExistException,
    ArnNotSupportedException,
    DeploymentConfigDoesNotExistException,
    DeploymentGroupDoesNotExistException,
    InvalidArnException,
    InvalidTagsToAddException,
    ResourceArnRequiredException,
    TagRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ApplicationDoesNotExistException
  | ArnNotSupportedException
  | DeploymentConfigDoesNotExistException
  | DeploymentGroupDoesNotExistException
  | InvalidArnException
  | InvalidTagsToAddException
  | ResourceArnRequiredException
  | TagRequiredException
  | CommonErrors;
/**
 * Disassociates a resource from a list of tags. The resource is identified by the
 * `ResourceArn` input parameter. The tags are identified by the list of
 * keys in the `TagKeys` input parameter.
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
    ApplicationDoesNotExistException,
    ArnNotSupportedException,
    DeploymentConfigDoesNotExistException,
    DeploymentGroupDoesNotExistException,
    InvalidArnException,
    InvalidTagsToAddException,
    ResourceArnRequiredException,
    TagRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateApplicationError =
  | ApplicationAlreadyExistsException
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | InvalidApplicationNameException
  | CommonErrors;
/**
 * Changes the name of an application.
 */
export const updateApplication: API.OperationMethod<
  UpdateApplicationInput,
  UpdateApplicationResponse,
  UpdateApplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApplicationInput,
  output: UpdateApplicationResponse,
  errors: [
    ApplicationAlreadyExistsException,
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    InvalidApplicationNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplication",
}));

export type UpdateDeploymentGroupError =
  | AlarmsLimitExceededException
  | ApplicationDoesNotExistException
  | ApplicationNameRequiredException
  | DeploymentConfigDoesNotExistException
  | DeploymentGroupAlreadyExistsException
  | DeploymentGroupDoesNotExistException
  | DeploymentGroupNameRequiredException
  | ECSServiceMappingLimitExceededException
  | InvalidAlarmConfigException
  | InvalidApplicationNameException
  | InvalidAutoRollbackConfigException
  | InvalidAutoScalingGroupException
  | InvalidBlueGreenDeploymentConfigurationException
  | InvalidDeploymentConfigNameException
  | InvalidDeploymentGroupNameException
  | InvalidDeploymentStyleException
  | InvalidEC2TagCombinationException
  | InvalidEC2TagException
  | InvalidECSServiceException
  | InvalidInputException
  | InvalidLoadBalancerInfoException
  | InvalidOnPremisesTagCombinationException
  | InvalidRoleException
  | InvalidTagException
  | InvalidTargetGroupPairException
  | InvalidTrafficRoutingConfigurationException
  | InvalidTriggerConfigException
  | LifecycleHookLimitExceededException
  | TagSetListLimitExceededException
  | ThrottlingException
  | TriggerTargetsLimitExceededException
  | CommonErrors;
/**
 * Changes information about a deployment group.
 */
export const updateDeploymentGroup: API.OperationMethod<
  UpdateDeploymentGroupInput,
  UpdateDeploymentGroupOutput,
  UpdateDeploymentGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDeploymentGroupInput,
  output: UpdateDeploymentGroupOutput,
  errors: [
    AlarmsLimitExceededException,
    ApplicationDoesNotExistException,
    ApplicationNameRequiredException,
    DeploymentConfigDoesNotExistException,
    DeploymentGroupAlreadyExistsException,
    DeploymentGroupDoesNotExistException,
    DeploymentGroupNameRequiredException,
    ECSServiceMappingLimitExceededException,
    InvalidAlarmConfigException,
    InvalidApplicationNameException,
    InvalidAutoRollbackConfigException,
    InvalidAutoScalingGroupException,
    InvalidBlueGreenDeploymentConfigurationException,
    InvalidDeploymentConfigNameException,
    InvalidDeploymentGroupNameException,
    InvalidDeploymentStyleException,
    InvalidEC2TagCombinationException,
    InvalidEC2TagException,
    InvalidECSServiceException,
    InvalidInputException,
    InvalidLoadBalancerInfoException,
    InvalidOnPremisesTagCombinationException,
    InvalidRoleException,
    InvalidTagException,
    InvalidTargetGroupPairException,
    InvalidTrafficRoutingConfigurationException,
    InvalidTriggerConfigException,
    LifecycleHookLimitExceededException,
    TagSetListLimitExceededException,
    ThrottlingException,
    TriggerTargetsLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDeploymentGroup",
}));
