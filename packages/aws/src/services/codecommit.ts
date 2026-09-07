import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace("http://codecommit.amazonaws.com/doc/2015-04-13");
const svc = T.AwsApiService({
  sdkId: "CodeCommit",
  serviceShapeName: "CodeCommit_20150413",
});
const auth = T.AwsAuthSigv4({ name: "codecommit" });
const ver = T.ServiceVersion("2015-04-13");
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
              `https://codecommit-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://codecommit-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://codecommit.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://codecommit.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ActorDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<ActorDoesNotExistException>()(
    "ActorDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ApprovalRuleContentRequiredException
  extends /*@__PURE__*/ S.TaggedError<ApprovalRuleContentRequiredException>()(
    "ApprovalRuleContentRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ApprovalRuleDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<ApprovalRuleDoesNotExistException>()(
    "ApprovalRuleDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ApprovalRuleNameAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ApprovalRuleNameAlreadyExistsException>()(
    "ApprovalRuleNameAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class ApprovalRuleNameRequiredException
  extends /*@__PURE__*/ S.TaggedError<ApprovalRuleNameRequiredException>()(
    "ApprovalRuleNameRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ApprovalRuleTemplateContentRequiredException
  extends /*@__PURE__*/ S.TaggedError<ApprovalRuleTemplateContentRequiredException>()(
    "ApprovalRuleTemplateContentRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ApprovalRuleTemplateDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<ApprovalRuleTemplateDoesNotExistException>()(
    "ApprovalRuleTemplateDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ApprovalRuleTemplateInUseException
  extends /*@__PURE__*/ S.TaggedError<ApprovalRuleTemplateInUseException>()(
    "ApprovalRuleTemplateInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ApprovalRuleTemplateNameAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ApprovalRuleTemplateNameAlreadyExistsException>()(
    "ApprovalRuleTemplateNameAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class ApprovalRuleTemplateNameRequiredException
  extends /*@__PURE__*/ S.TaggedError<ApprovalRuleTemplateNameRequiredException>()(
    "ApprovalRuleTemplateNameRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ApprovalStateRequiredException
  extends /*@__PURE__*/ S.TaggedError<ApprovalStateRequiredException>()(
    "ApprovalStateRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class AuthorDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<AuthorDoesNotExistException>()(
    "AuthorDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class BeforeCommitIdAndAfterCommitIdAreSameException
  extends /*@__PURE__*/ S.TaggedError<BeforeCommitIdAndAfterCommitIdAreSameException>()(
    "BeforeCommitIdAndAfterCommitIdAreSameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class BlobIdDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<BlobIdDoesNotExistException>()(
    "BlobIdDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class BlobIdRequiredException
  extends /*@__PURE__*/ S.TaggedError<BlobIdRequiredException>()(
    "BlobIdRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class BranchDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<BranchDoesNotExistException>()(
    "BranchDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class BranchNameExistsException
  extends /*@__PURE__*/ S.TaggedError<BranchNameExistsException>()(
    "BranchNameExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class BranchNameIsTagNameException
  extends /*@__PURE__*/ S.TaggedError<BranchNameIsTagNameException>()(
    "BranchNameIsTagNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class BranchNameRequiredException
  extends /*@__PURE__*/ S.TaggedError<BranchNameRequiredException>()(
    "BranchNameRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CannotDeleteApprovalRuleFromTemplateException
  extends /*@__PURE__*/ S.TaggedError<CannotDeleteApprovalRuleFromTemplateException>()(
    "CannotDeleteApprovalRuleFromTemplateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CannotModifyApprovalRuleFromTemplateException
  extends /*@__PURE__*/ S.TaggedError<CannotModifyApprovalRuleFromTemplateException>()(
    "CannotModifyApprovalRuleFromTemplateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ClientRequestTokenRequiredException
  extends /*@__PURE__*/ S.TaggedError<ClientRequestTokenRequiredException>()(
    "ClientRequestTokenRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CommentContentRequiredException
  extends /*@__PURE__*/ S.TaggedError<CommentContentRequiredException>()(
    "CommentContentRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CommentContentSizeLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<CommentContentSizeLimitExceededException>()(
    "CommentContentSizeLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CommentDeletedException
  extends /*@__PURE__*/ S.TaggedError<CommentDeletedException>()(
    "CommentDeletedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CommentDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<CommentDoesNotExistException>()(
    "CommentDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CommentIdRequiredException
  extends /*@__PURE__*/ S.TaggedError<CommentIdRequiredException>()(
    "CommentIdRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CommentNotCreatedByCallerException
  extends /*@__PURE__*/ S.TaggedError<CommentNotCreatedByCallerException>()(
    "CommentNotCreatedByCallerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CommitDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<CommitDoesNotExistException>()(
    "CommitDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CommitIdDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<CommitIdDoesNotExistException>()(
    "CommitIdDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CommitIdRequiredException
  extends /*@__PURE__*/ S.TaggedError<CommitIdRequiredException>()(
    "CommitIdRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CommitIdsLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<CommitIdsLimitExceededException>()(
    "CommitIdsLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CommitIdsListRequiredException
  extends /*@__PURE__*/ S.TaggedError<CommitIdsListRequiredException>()(
    "CommitIdsListRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CommitMessageLengthExceededException
  extends /*@__PURE__*/ S.TaggedError<CommitMessageLengthExceededException>()(
    "CommitMessageLengthExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CommitRequiredException
  extends /*@__PURE__*/ S.TaggedError<CommitRequiredException>()(
    "CommitRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ConcurrentReferenceUpdateException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentReferenceUpdateException>()(
    "ConcurrentReferenceUpdateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DefaultBranchCannotBeDeletedException
  extends /*@__PURE__*/ S.TaggedError<DefaultBranchCannotBeDeletedException>()(
    "DefaultBranchCannotBeDeletedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DirectoryNameConflictsWithFileNameException
  extends /*@__PURE__*/ S.TaggedError<DirectoryNameConflictsWithFileNameException>()(
    "DirectoryNameConflictsWithFileNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class EncryptionIntegrityChecksFailedException
  extends /*@__PURE__*/ S.TaggedError<EncryptionIntegrityChecksFailedException>()(
    "EncryptionIntegrityChecksFailedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class EncryptionKeyAccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<EncryptionKeyAccessDeniedException>()(
    "EncryptionKeyAccessDeniedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAuthError) {}
export class EncryptionKeyDisabledException
  extends /*@__PURE__*/ S.TaggedError<EncryptionKeyDisabledException>()(
    "EncryptionKeyDisabledException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class EncryptionKeyInvalidIdException
  extends /*@__PURE__*/ S.TaggedError<EncryptionKeyInvalidIdException>()(
    "EncryptionKeyInvalidIdException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class EncryptionKeyInvalidUsageException
  extends /*@__PURE__*/ S.TaggedError<EncryptionKeyInvalidUsageException>()(
    "EncryptionKeyInvalidUsageException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class EncryptionKeyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<EncryptionKeyNotFoundException>()(
    "EncryptionKeyNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class EncryptionKeyRequiredException
  extends /*@__PURE__*/ S.TaggedError<EncryptionKeyRequiredException>()(
    "EncryptionKeyRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class EncryptionKeyUnavailableException
  extends /*@__PURE__*/ S.TaggedError<EncryptionKeyUnavailableException>()(
    "EncryptionKeyUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class FileContentAndSourceFileSpecifiedException
  extends /*@__PURE__*/ S.TaggedError<FileContentAndSourceFileSpecifiedException>()(
    "FileContentAndSourceFileSpecifiedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class FileContentRequiredException
  extends /*@__PURE__*/ S.TaggedError<FileContentRequiredException>()(
    "FileContentRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class FileContentSizeLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<FileContentSizeLimitExceededException>()(
    "FileContentSizeLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class FileDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<FileDoesNotExistException>()(
    "FileDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class FileEntryRequiredException
  extends /*@__PURE__*/ S.TaggedError<FileEntryRequiredException>()(
    "FileEntryRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class FileModeRequiredException
  extends /*@__PURE__*/ S.TaggedError<FileModeRequiredException>()(
    "FileModeRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class FileNameConflictsWithDirectoryNameException
  extends /*@__PURE__*/ S.TaggedError<FileNameConflictsWithDirectoryNameException>()(
    "FileNameConflictsWithDirectoryNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class FilePathConflictsWithSubmodulePathException
  extends /*@__PURE__*/ S.TaggedError<FilePathConflictsWithSubmodulePathException>()(
    "FilePathConflictsWithSubmodulePathException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class FileTooLargeException
  extends /*@__PURE__*/ S.TaggedError<FileTooLargeException>()(
    "FileTooLargeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class FolderContentSizeLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<FolderContentSizeLimitExceededException>()(
    "FolderContentSizeLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class FolderDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<FolderDoesNotExistException>()(
    "FolderDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class IdempotencyParameterMismatchException
  extends /*@__PURE__*/ S.TaggedError<IdempotencyParameterMismatchException>()(
    "IdempotencyParameterMismatchException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidActorArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidActorArnException>()(
    "InvalidActorArnException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidApprovalRuleContentException
  extends /*@__PURE__*/ S.TaggedError<InvalidApprovalRuleContentException>()(
    "InvalidApprovalRuleContentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidApprovalRuleNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidApprovalRuleNameException>()(
    "InvalidApprovalRuleNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidApprovalRuleTemplateContentException
  extends /*@__PURE__*/ S.TaggedError<InvalidApprovalRuleTemplateContentException>()(
    "InvalidApprovalRuleTemplateContentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidApprovalRuleTemplateDescriptionException
  extends /*@__PURE__*/ S.TaggedError<InvalidApprovalRuleTemplateDescriptionException>()(
    "InvalidApprovalRuleTemplateDescriptionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidApprovalRuleTemplateNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidApprovalRuleTemplateNameException>()(
    "InvalidApprovalRuleTemplateNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidApprovalStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidApprovalStateException>()(
    "InvalidApprovalStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidAuthorArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidAuthorArnException>()(
    "InvalidAuthorArnException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidBlobIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidBlobIdException>()(
    "InvalidBlobIdException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidBranchNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidBranchNameException>()(
    "InvalidBranchNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidClientRequestTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidClientRequestTokenException>()(
    "InvalidClientRequestTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidCommentIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidCommentIdException>()(
    "InvalidCommentIdException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidCommitException
  extends /*@__PURE__*/ S.TaggedError<InvalidCommitException>()(
    "InvalidCommitException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidCommitIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidCommitIdException>()(
    "InvalidCommitIdException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidConflictDetailLevelException
  extends /*@__PURE__*/ S.TaggedError<InvalidConflictDetailLevelException>()(
    "InvalidConflictDetailLevelException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidConflictResolutionException
  extends /*@__PURE__*/ S.TaggedError<InvalidConflictResolutionException>()(
    "InvalidConflictResolutionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidConflictResolutionStrategyException
  extends /*@__PURE__*/ S.TaggedError<InvalidConflictResolutionStrategyException>()(
    "InvalidConflictResolutionStrategyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidContinuationTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidContinuationTokenException>()(
    "InvalidContinuationTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidDeletionParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeletionParameterException>()(
    "InvalidDeletionParameterException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidDescriptionException
  extends /*@__PURE__*/ S.TaggedError<InvalidDescriptionException>()(
    "InvalidDescriptionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidDestinationCommitSpecifierException
  extends /*@__PURE__*/ S.TaggedError<InvalidDestinationCommitSpecifierException>()(
    "InvalidDestinationCommitSpecifierException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidEmailException
  extends /*@__PURE__*/ S.TaggedError<InvalidEmailException>()(
    "InvalidEmailException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidFileLocationException
  extends /*@__PURE__*/ S.TaggedError<InvalidFileLocationException>()(
    "InvalidFileLocationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidFileModeException
  extends /*@__PURE__*/ S.TaggedError<InvalidFileModeException>()(
    "InvalidFileModeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidFilePositionException
  extends /*@__PURE__*/ S.TaggedError<InvalidFilePositionException>()(
    "InvalidFilePositionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidMaxConflictFilesException
  extends /*@__PURE__*/ S.TaggedError<InvalidMaxConflictFilesException>()(
    "InvalidMaxConflictFilesException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidMaxMergeHunksException
  extends /*@__PURE__*/ S.TaggedError<InvalidMaxMergeHunksException>()(
    "InvalidMaxMergeHunksException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidMaxResultsException
  extends /*@__PURE__*/ S.TaggedError<InvalidMaxResultsException>()(
    "InvalidMaxResultsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidMergeOptionException
  extends /*@__PURE__*/ S.TaggedError<InvalidMergeOptionException>()(
    "InvalidMergeOptionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidOrderException
  extends /*@__PURE__*/ S.TaggedError<InvalidOrderException>()(
    "InvalidOrderException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidOverrideStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidOverrideStatusException>()(
    "InvalidOverrideStatusException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidParentCommitIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidParentCommitIdException>()(
    "InvalidParentCommitIdException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidPathException
  extends /*@__PURE__*/ S.TaggedError<InvalidPathException>()(
    "InvalidPathException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidPullRequestEventTypeException
  extends /*@__PURE__*/ S.TaggedError<InvalidPullRequestEventTypeException>()(
    "InvalidPullRequestEventTypeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidPullRequestIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidPullRequestIdException>()(
    "InvalidPullRequestIdException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidPullRequestStatusException
  extends /*@__PURE__*/ S.TaggedError<InvalidPullRequestStatusException>()(
    "InvalidPullRequestStatusException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidPullRequestStatusUpdateException
  extends /*@__PURE__*/ S.TaggedError<InvalidPullRequestStatusUpdateException>()(
    "InvalidPullRequestStatusUpdateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidReactionUserArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidReactionUserArnException>()(
    "InvalidReactionUserArnException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidReactionValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidReactionValueException>()(
    "InvalidReactionValueException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidReferenceNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidReferenceNameException>()(
    "InvalidReferenceNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidRelativeFileVersionEnumException
  extends /*@__PURE__*/ S.TaggedError<InvalidRelativeFileVersionEnumException>()(
    "InvalidRelativeFileVersionEnumException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidReplacementContentException
  extends /*@__PURE__*/ S.TaggedError<InvalidReplacementContentException>()(
    "InvalidReplacementContentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidReplacementTypeException
  extends /*@__PURE__*/ S.TaggedError<InvalidReplacementTypeException>()(
    "InvalidReplacementTypeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidRepositoryDescriptionException
  extends /*@__PURE__*/ S.TaggedError<InvalidRepositoryDescriptionException>()(
    "InvalidRepositoryDescriptionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidRepositoryNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidRepositoryNameException>()(
    "InvalidRepositoryNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidRepositoryTriggerBranchNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidRepositoryTriggerBranchNameException>()(
    "InvalidRepositoryTriggerBranchNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidRepositoryTriggerCustomDataException
  extends /*@__PURE__*/ S.TaggedError<InvalidRepositoryTriggerCustomDataException>()(
    "InvalidRepositoryTriggerCustomDataException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidRepositoryTriggerDestinationArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidRepositoryTriggerDestinationArnException>()(
    "InvalidRepositoryTriggerDestinationArnException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidRepositoryTriggerEventsException
  extends /*@__PURE__*/ S.TaggedError<InvalidRepositoryTriggerEventsException>()(
    "InvalidRepositoryTriggerEventsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidRepositoryTriggerNameException
  extends /*@__PURE__*/ S.TaggedError<InvalidRepositoryTriggerNameException>()(
    "InvalidRepositoryTriggerNameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidRepositoryTriggerRegionException
  extends /*@__PURE__*/ S.TaggedError<InvalidRepositoryTriggerRegionException>()(
    "InvalidRepositoryTriggerRegionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidResourceArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceArnException>()(
    "InvalidResourceArnException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidRevisionIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidRevisionIdException>()(
    "InvalidRevisionIdException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidRuleContentSha256Exception
  extends /*@__PURE__*/ S.TaggedError<InvalidRuleContentSha256Exception>()(
    "InvalidRuleContentSha256Exception",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidSortByException
  extends /*@__PURE__*/ S.TaggedError<InvalidSortByException>()(
    "InvalidSortByException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidSourceCommitSpecifierException
  extends /*@__PURE__*/ S.TaggedError<InvalidSourceCommitSpecifierException>()(
    "InvalidSourceCommitSpecifierException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidSystemTagUsageException
  extends /*@__PURE__*/ S.TaggedError<InvalidSystemTagUsageException>()(
    "InvalidSystemTagUsageException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidTagKeysListException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagKeysListException>()(
    "InvalidTagKeysListException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidTagsMapException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagsMapException>()(
    "InvalidTagsMapException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidTargetBranchException
  extends /*@__PURE__*/ S.TaggedError<InvalidTargetBranchException>()(
    "InvalidTargetBranchException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidTargetException
  extends /*@__PURE__*/ S.TaggedError<InvalidTargetException>()(
    "InvalidTargetException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidTargetsException
  extends /*@__PURE__*/ S.TaggedError<InvalidTargetsException>()(
    "InvalidTargetsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidTitleException
  extends /*@__PURE__*/ S.TaggedError<InvalidTitleException>()(
    "InvalidTitleException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ManualMergeRequiredException
  extends /*@__PURE__*/ S.TaggedError<ManualMergeRequiredException>()(
    "ManualMergeRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MaximumBranchesExceededException
  extends /*@__PURE__*/ S.TaggedError<MaximumBranchesExceededException>()(
    "MaximumBranchesExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MaximumConflictResolutionEntriesExceededException
  extends /*@__PURE__*/ S.TaggedError<MaximumConflictResolutionEntriesExceededException>()(
    "MaximumConflictResolutionEntriesExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MaximumFileContentToLoadExceededException
  extends /*@__PURE__*/ S.TaggedError<MaximumFileContentToLoadExceededException>()(
    "MaximumFileContentToLoadExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MaximumFileEntriesExceededException
  extends /*@__PURE__*/ S.TaggedError<MaximumFileEntriesExceededException>()(
    "MaximumFileEntriesExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MaximumItemsToCompareExceededException
  extends /*@__PURE__*/ S.TaggedError<MaximumItemsToCompareExceededException>()(
    "MaximumItemsToCompareExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MaximumNumberOfApprovalsExceededException
  extends /*@__PURE__*/ S.TaggedError<MaximumNumberOfApprovalsExceededException>()(
    "MaximumNumberOfApprovalsExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MaximumOpenPullRequestsExceededException
  extends /*@__PURE__*/ S.TaggedError<MaximumOpenPullRequestsExceededException>()(
    "MaximumOpenPullRequestsExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MaximumRepositoryNamesExceededException
  extends /*@__PURE__*/ S.TaggedError<MaximumRepositoryNamesExceededException>()(
    "MaximumRepositoryNamesExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MaximumRepositoryTriggersExceededException
  extends /*@__PURE__*/ S.TaggedError<MaximumRepositoryTriggersExceededException>()(
    "MaximumRepositoryTriggersExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MaximumRuleTemplatesAssociatedWithRepositoryException
  extends /*@__PURE__*/ S.TaggedError<MaximumRuleTemplatesAssociatedWithRepositoryException>()(
    "MaximumRuleTemplatesAssociatedWithRepositoryException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MergeOptionRequiredException
  extends /*@__PURE__*/ S.TaggedError<MergeOptionRequiredException>()(
    "MergeOptionRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MultipleConflictResolutionEntriesException
  extends /*@__PURE__*/ S.TaggedError<MultipleConflictResolutionEntriesException>()(
    "MultipleConflictResolutionEntriesException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MultipleRepositoriesInPullRequestException
  extends /*@__PURE__*/ S.TaggedError<MultipleRepositoriesInPullRequestException>()(
    "MultipleRepositoriesInPullRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class NameLengthExceededException
  extends /*@__PURE__*/ S.TaggedError<NameLengthExceededException>()(
    "NameLengthExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class NoChangeException
  extends /*@__PURE__*/ S.TaggedError<NoChangeException>()(
    "NoChangeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class NumberOfRulesExceededException
  extends /*@__PURE__*/ S.TaggedError<NumberOfRulesExceededException>()(
    "NumberOfRulesExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class NumberOfRuleTemplatesExceededException
  extends /*@__PURE__*/ S.TaggedError<NumberOfRuleTemplatesExceededException>()(
    "NumberOfRuleTemplatesExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class OperationNotAllowedException
  extends /*@__PURE__*/ S.TaggedError<OperationNotAllowedException>()(
    "OperationNotAllowedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class OverrideAlreadySetException
  extends /*@__PURE__*/ S.TaggedError<OverrideAlreadySetException>()(
    "OverrideAlreadySetException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class OverrideStatusRequiredException
  extends /*@__PURE__*/ S.TaggedError<OverrideStatusRequiredException>()(
    "OverrideStatusRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ParentCommitDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<ParentCommitDoesNotExistException>()(
    "ParentCommitDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ParentCommitIdOutdatedException
  extends /*@__PURE__*/ S.TaggedError<ParentCommitIdOutdatedException>()(
    "ParentCommitIdOutdatedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ParentCommitIdRequiredException
  extends /*@__PURE__*/ S.TaggedError<ParentCommitIdRequiredException>()(
    "ParentCommitIdRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class PathDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<PathDoesNotExistException>()(
    "PathDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class PathRequiredException
  extends /*@__PURE__*/ S.TaggedError<PathRequiredException>()(
    "PathRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class PullRequestAlreadyClosedException
  extends /*@__PURE__*/ S.TaggedError<PullRequestAlreadyClosedException>()(
    "PullRequestAlreadyClosedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class PullRequestApprovalRulesNotSatisfiedException
  extends /*@__PURE__*/ S.TaggedError<PullRequestApprovalRulesNotSatisfiedException>()(
    "PullRequestApprovalRulesNotSatisfiedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class PullRequestCannotBeApprovedByAuthorException
  extends /*@__PURE__*/ S.TaggedError<PullRequestCannotBeApprovedByAuthorException>()(
    "PullRequestCannotBeApprovedByAuthorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class PullRequestDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<PullRequestDoesNotExistException>()(
    "PullRequestDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class PullRequestIdRequiredException
  extends /*@__PURE__*/ S.TaggedError<PullRequestIdRequiredException>()(
    "PullRequestIdRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class PullRequestStatusRequiredException
  extends /*@__PURE__*/ S.TaggedError<PullRequestStatusRequiredException>()(
    "PullRequestStatusRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class PutFileEntryConflictException
  extends /*@__PURE__*/ S.TaggedError<PutFileEntryConflictException>()(
    "PutFileEntryConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ReactionLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ReactionLimitExceededException>()(
    "ReactionLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ReactionValueRequiredException
  extends /*@__PURE__*/ S.TaggedError<ReactionValueRequiredException>()(
    "ReactionValueRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ReferenceDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<ReferenceDoesNotExistException>()(
    "ReferenceDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ReferenceNameRequiredException
  extends /*@__PURE__*/ S.TaggedError<ReferenceNameRequiredException>()(
    "ReferenceNameRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ReferenceTypeNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<ReferenceTypeNotSupportedException>()(
    "ReferenceTypeNotSupportedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ReplacementContentRequiredException
  extends /*@__PURE__*/ S.TaggedError<ReplacementContentRequiredException>()(
    "ReplacementContentRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ReplacementTypeRequiredException
  extends /*@__PURE__*/ S.TaggedError<ReplacementTypeRequiredException>()(
    "ReplacementTypeRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RepositoryDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<RepositoryDoesNotExistException>()(
    "RepositoryDoesNotExistException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RepositoryLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<RepositoryLimitExceededException>()(
    "RepositoryLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RepositoryNameExistsException
  extends /*@__PURE__*/ S.TaggedError<RepositoryNameExistsException>()(
    "RepositoryNameExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RepositoryNameRequiredException
  extends /*@__PURE__*/ S.TaggedError<RepositoryNameRequiredException>()(
    "RepositoryNameRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RepositoryNamesRequiredException
  extends /*@__PURE__*/ S.TaggedError<RepositoryNamesRequiredException>()(
    "RepositoryNamesRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RepositoryNotAssociatedWithPullRequestException
  extends /*@__PURE__*/ S.TaggedError<RepositoryNotAssociatedWithPullRequestException>()(
    "RepositoryNotAssociatedWithPullRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RepositoryTriggerBranchNameListRequiredException
  extends /*@__PURE__*/ S.TaggedError<RepositoryTriggerBranchNameListRequiredException>()(
    "RepositoryTriggerBranchNameListRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RepositoryTriggerDestinationArnRequiredException
  extends /*@__PURE__*/ S.TaggedError<RepositoryTriggerDestinationArnRequiredException>()(
    "RepositoryTriggerDestinationArnRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RepositoryTriggerEventsListRequiredException
  extends /*@__PURE__*/ S.TaggedError<RepositoryTriggerEventsListRequiredException>()(
    "RepositoryTriggerEventsListRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RepositoryTriggerNameRequiredException
  extends /*@__PURE__*/ S.TaggedError<RepositoryTriggerNameRequiredException>()(
    "RepositoryTriggerNameRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RepositoryTriggersListRequiredException
  extends /*@__PURE__*/ S.TaggedError<RepositoryTriggersListRequiredException>()(
    "RepositoryTriggersListRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceArnRequiredException
  extends /*@__PURE__*/ S.TaggedError<ResourceArnRequiredException>()(
    "ResourceArnRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RestrictedSourceFileException
  extends /*@__PURE__*/ S.TaggedError<RestrictedSourceFileException>()(
    "RestrictedSourceFileException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RevisionIdRequiredException
  extends /*@__PURE__*/ S.TaggedError<RevisionIdRequiredException>()(
    "RevisionIdRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RevisionNotCurrentException
  extends /*@__PURE__*/ S.TaggedError<RevisionNotCurrentException>()(
    "RevisionNotCurrentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class SameFileContentException
  extends /*@__PURE__*/ S.TaggedError<SameFileContentException>()(
    "SameFileContentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class SamePathRequestException
  extends /*@__PURE__*/ S.TaggedError<SamePathRequestException>()(
    "SamePathRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class SourceAndDestinationAreSameException
  extends /*@__PURE__*/ S.TaggedError<SourceAndDestinationAreSameException>()(
    "SourceAndDestinationAreSameException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class SourceFileOrContentRequiredException
  extends /*@__PURE__*/ S.TaggedError<SourceFileOrContentRequiredException>()(
    "SourceFileOrContentRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TagKeysListRequiredException
  extends /*@__PURE__*/ S.TaggedError<TagKeysListRequiredException>()(
    "TagKeysListRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TagPolicyException
  extends /*@__PURE__*/ S.TaggedError<TagPolicyException>()(
    "TagPolicyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TagsMapRequiredException
  extends /*@__PURE__*/ S.TaggedError<TagsMapRequiredException>()(
    "TagsMapRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TargetRequiredException
  extends /*@__PURE__*/ S.TaggedError<TargetRequiredException>()(
    "TargetRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TargetsRequiredException
  extends /*@__PURE__*/ S.TaggedError<TargetsRequiredException>()(
    "TargetsRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TipOfSourceReferenceIsDifferentException
  extends /*@__PURE__*/ S.TaggedError<TipOfSourceReferenceIsDifferentException>()(
    "TipOfSourceReferenceIsDifferentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TipsDivergenceExceededException
  extends /*@__PURE__*/ S.TaggedError<TipsDivergenceExceededException>()(
    "TipsDivergenceExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TitleRequiredException
  extends /*@__PURE__*/ S.TaggedError<TitleRequiredException>()(
    "TitleRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type ApprovalRuleTemplateName = string;
export type RepositoryName = string;
export interface AssociateApprovalRuleTemplateWithRepositoryInput {
  approvalRuleTemplateName: string;
  repositoryName: string;
}
export const AssociateApprovalRuleTemplateWithRepositoryInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      approvalRuleTemplateName: S.String,
      repositoryName: S.String,
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
    identifier: "AssociateApprovalRuleTemplateWithRepositoryInput",
  }) as any as S.Schema<AssociateApprovalRuleTemplateWithRepositoryInput>;
export interface AssociateApprovalRuleTemplateWithRepositoryResponse {}
export const AssociateApprovalRuleTemplateWithRepositoryResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "AssociateApprovalRuleTemplateWithRepositoryResponse",
  }) as any as S.Schema<AssociateApprovalRuleTemplateWithRepositoryResponse>;
export type RepositoryNameList = string[];
export const RepositoryNameList = /*@__PURE__*/ S.Array(S.String);
export interface BatchAssociateApprovalRuleTemplateWithRepositoriesInput {
  approvalRuleTemplateName: string;
  repositoryNames: string[];
}
export const BatchAssociateApprovalRuleTemplateWithRepositoriesInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      approvalRuleTemplateName: S.String,
      repositoryNames: RepositoryNameList,
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
    identifier: "BatchAssociateApprovalRuleTemplateWithRepositoriesInput",
  }) as any as S.Schema<BatchAssociateApprovalRuleTemplateWithRepositoriesInput>;
export type ErrorCode = string;
export type ErrorMessage = string;
export interface BatchAssociateApprovalRuleTemplateWithRepositoriesError_ {
  repositoryName?: string;
  errorCode?: string;
  errorMessage?: string;
}
export const BatchAssociateApprovalRuleTemplateWithRepositoriesError_ =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      repositoryName: S.optional(S.String),
      errorCode: S.optional(S.String),
      errorMessage: S.optional(S.String),
    }),
  ).annotate({
    identifier: "BatchAssociateApprovalRuleTemplateWithRepositoriesError",
  }) as any as S.Schema<BatchAssociateApprovalRuleTemplateWithRepositoriesError_>;
export type BatchAssociateApprovalRuleTemplateWithRepositoriesErrorsList =
  BatchAssociateApprovalRuleTemplateWithRepositoriesError_[];
export const BatchAssociateApprovalRuleTemplateWithRepositoriesErrorsList =
  /*@__PURE__*/ S.Array(
    BatchAssociateApprovalRuleTemplateWithRepositoriesError_,
  );
export interface BatchAssociateApprovalRuleTemplateWithRepositoriesOutput {
  associatedRepositoryNames: string[];
  errors: BatchAssociateApprovalRuleTemplateWithRepositoriesError_[];
}
export const BatchAssociateApprovalRuleTemplateWithRepositoriesOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      associatedRepositoryNames: RepositoryNameList,
      errors: BatchAssociateApprovalRuleTemplateWithRepositoriesErrorsList,
    }).pipe(ns),
  ).annotate({
    identifier: "BatchAssociateApprovalRuleTemplateWithRepositoriesOutput",
  }) as any as S.Schema<BatchAssociateApprovalRuleTemplateWithRepositoriesOutput>;
export type CommitName = string;
export type MergeOptionTypeEnum =
  | "FAST_FORWARD_MERGE"
  | "SQUASH_MERGE"
  | "THREE_WAY_MERGE"
  | (string & {});
export const MergeOptionTypeEnum = S.String;

export type MaxResults = number;
export type Path = string;
export type FilePaths = string[];
export const FilePaths = /*@__PURE__*/ S.Array(S.String);
export type ConflictDetailLevelTypeEnum =
  | "FILE_LEVEL"
  | "LINE_LEVEL"
  | (string & {});
export const ConflictDetailLevelTypeEnum = S.String;

export type ConflictResolutionStrategyTypeEnum =
  | "NONE"
  | "ACCEPT_SOURCE"
  | "ACCEPT_DESTINATION"
  | "AUTOMERGE"
  | (string & {});
export const ConflictResolutionStrategyTypeEnum = S.String;

export type NextToken = string;
export interface BatchDescribeMergeConflictsInput {
  repositoryName: string;
  destinationCommitSpecifier: string;
  sourceCommitSpecifier: string;
  mergeOption: MergeOptionTypeEnum;
  maxMergeHunks?: number;
  maxConflictFiles?: number;
  filePaths?: string[];
  conflictDetailLevel?: ConflictDetailLevelTypeEnum;
  conflictResolutionStrategy?: ConflictResolutionStrategyTypeEnum;
  nextToken?: string;
}
export const BatchDescribeMergeConflictsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    destinationCommitSpecifier: S.String,
    sourceCommitSpecifier: S.String,
    mergeOption: MergeOptionTypeEnum,
    maxMergeHunks: S.optional(S.Number),
    maxConflictFiles: S.optional(S.Number),
    filePaths: S.optional(FilePaths),
    conflictDetailLevel: S.optional(ConflictDetailLevelTypeEnum),
    conflictResolutionStrategy: S.optional(ConflictResolutionStrategyTypeEnum),
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
  identifier: "BatchDescribeMergeConflictsInput",
}) as any as S.Schema<BatchDescribeMergeConflictsInput>;
export type FileSize = number;
export interface FileSizes {
  source?: number;
  destination?: number;
  base?: number;
}
export const FileSizes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    source: S.optional(S.Number),
    destination: S.optional(S.Number),
    base: S.optional(S.Number),
  }),
).annotate({ identifier: "FileSizes" }) as any as S.Schema<FileSizes>;
export type FileModeTypeEnum =
  | "EXECUTABLE"
  | "NORMAL"
  | "SYMLINK"
  | (string & {});
export const FileModeTypeEnum = S.String;

export interface FileModes {
  source?: FileModeTypeEnum;
  destination?: FileModeTypeEnum;
  base?: FileModeTypeEnum;
}
export const FileModes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    source: S.optional(FileModeTypeEnum),
    destination: S.optional(FileModeTypeEnum),
    base: S.optional(FileModeTypeEnum),
  }),
).annotate({ identifier: "FileModes" }) as any as S.Schema<FileModes>;
export type ObjectTypeEnum =
  | "FILE"
  | "DIRECTORY"
  | "GIT_LINK"
  | "SYMBOLIC_LINK"
  | (string & {});
export const ObjectTypeEnum = S.String;

export interface ObjectTypes {
  source?: ObjectTypeEnum;
  destination?: ObjectTypeEnum;
  base?: ObjectTypeEnum;
}
export const ObjectTypes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    source: S.optional(ObjectTypeEnum),
    destination: S.optional(ObjectTypeEnum),
    base: S.optional(ObjectTypeEnum),
  }),
).annotate({ identifier: "ObjectTypes" }) as any as S.Schema<ObjectTypes>;
export type NumberOfConflicts = number;
export type CapitalBoolean = boolean;
export interface IsBinaryFile {
  source?: boolean;
  destination?: boolean;
  base?: boolean;
}
export const IsBinaryFile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    source: S.optional(S.Boolean),
    destination: S.optional(S.Boolean),
    base: S.optional(S.Boolean),
  }),
).annotate({ identifier: "IsBinaryFile" }) as any as S.Schema<IsBinaryFile>;
export type IsContentConflict = boolean;
export type IsFileModeConflict = boolean;
export type IsObjectTypeConflict = boolean;
export type ChangeTypeEnum = "A" | "M" | "D" | (string & {});
export const ChangeTypeEnum = S.String;

export interface MergeOperations {
  source?: ChangeTypeEnum;
  destination?: ChangeTypeEnum;
}
export const MergeOperations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    source: S.optional(ChangeTypeEnum),
    destination: S.optional(ChangeTypeEnum),
  }),
).annotate({
  identifier: "MergeOperations",
}) as any as S.Schema<MergeOperations>;
export interface ConflictMetadata {
  filePath?: string;
  fileSizes?: FileSizes;
  fileModes?: FileModes;
  objectTypes?: ObjectTypes;
  numberOfConflicts?: number;
  isBinaryFile?: IsBinaryFile;
  contentConflict?: boolean;
  fileModeConflict?: boolean;
  objectTypeConflict?: boolean;
  mergeOperations?: MergeOperations;
}
export const ConflictMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filePath: S.optional(S.String),
    fileSizes: S.optional(FileSizes),
    fileModes: S.optional(FileModes),
    objectTypes: S.optional(ObjectTypes),
    numberOfConflicts: S.optional(S.Number),
    isBinaryFile: S.optional(IsBinaryFile),
    contentConflict: S.optional(S.Boolean),
    fileModeConflict: S.optional(S.Boolean),
    objectTypeConflict: S.optional(S.Boolean),
    mergeOperations: S.optional(MergeOperations),
  }),
).annotate({
  identifier: "ConflictMetadata",
}) as any as S.Schema<ConflictMetadata>;
export type IsHunkConflict = boolean;
export type LineNumber = number;
export type HunkContent = string;
export interface MergeHunkDetail {
  startLine?: number;
  endLine?: number;
  hunkContent?: string;
}
export const MergeHunkDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startLine: S.optional(S.Number),
    endLine: S.optional(S.Number),
    hunkContent: S.optional(S.String),
  }),
).annotate({
  identifier: "MergeHunkDetail",
}) as any as S.Schema<MergeHunkDetail>;
export interface MergeHunk {
  isConflict?: boolean;
  source?: MergeHunkDetail;
  destination?: MergeHunkDetail;
  base?: MergeHunkDetail;
}
export const MergeHunk = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    isConflict: S.optional(S.Boolean),
    source: S.optional(MergeHunkDetail),
    destination: S.optional(MergeHunkDetail),
    base: S.optional(MergeHunkDetail),
  }),
).annotate({ identifier: "MergeHunk" }) as any as S.Schema<MergeHunk>;
export type MergeHunks = MergeHunk[];
export const MergeHunks = /*@__PURE__*/ S.Array(MergeHunk);
export interface Conflict {
  conflictMetadata?: ConflictMetadata;
  mergeHunks?: MergeHunk[];
}
export const Conflict = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    conflictMetadata: S.optional(ConflictMetadata),
    mergeHunks: S.optional(MergeHunks),
  }),
).annotate({ identifier: "Conflict" }) as any as S.Schema<Conflict>;
export type Conflicts = Conflict[];
export const Conflicts = /*@__PURE__*/ S.Array(Conflict);
export type ExceptionName = string;
export type Message = string;
export interface BatchDescribeMergeConflictsError_ {
  filePath: string;
  exceptionName: string;
  message: string;
}
export const BatchDescribeMergeConflictsError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ filePath: S.String, exceptionName: S.String, message: S.String }),
).annotate({
  identifier: "BatchDescribeMergeConflictsError",
}) as any as S.Schema<BatchDescribeMergeConflictsError_>;
export type BatchDescribeMergeConflictsErrors =
  BatchDescribeMergeConflictsError_[];
export const BatchDescribeMergeConflictsErrors = /*@__PURE__*/ S.Array(
  BatchDescribeMergeConflictsError_,
);
export type ObjectId = string;
export interface BatchDescribeMergeConflictsOutput {
  conflicts: Conflict[];
  nextToken?: string;
  errors?: BatchDescribeMergeConflictsError_[];
  destinationCommitId: string;
  sourceCommitId: string;
  baseCommitId?: string;
}
export const BatchDescribeMergeConflictsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    conflicts: Conflicts,
    nextToken: S.optional(S.String),
    errors: S.optional(BatchDescribeMergeConflictsErrors),
    destinationCommitId: S.String,
    sourceCommitId: S.String,
    baseCommitId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "BatchDescribeMergeConflictsOutput",
}) as any as S.Schema<BatchDescribeMergeConflictsOutput>;
export interface BatchDisassociateApprovalRuleTemplateFromRepositoriesInput {
  approvalRuleTemplateName: string;
  repositoryNames: string[];
}
export const BatchDisassociateApprovalRuleTemplateFromRepositoriesInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      approvalRuleTemplateName: S.String,
      repositoryNames: RepositoryNameList,
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
    identifier: "BatchDisassociateApprovalRuleTemplateFromRepositoriesInput",
  }) as any as S.Schema<BatchDisassociateApprovalRuleTemplateFromRepositoriesInput>;
export interface BatchDisassociateApprovalRuleTemplateFromRepositoriesError_ {
  repositoryName?: string;
  errorCode?: string;
  errorMessage?: string;
}
export const BatchDisassociateApprovalRuleTemplateFromRepositoriesError_ =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      repositoryName: S.optional(S.String),
      errorCode: S.optional(S.String),
      errorMessage: S.optional(S.String),
    }),
  ).annotate({
    identifier: "BatchDisassociateApprovalRuleTemplateFromRepositoriesError",
  }) as any as S.Schema<BatchDisassociateApprovalRuleTemplateFromRepositoriesError_>;
export type BatchDisassociateApprovalRuleTemplateFromRepositoriesErrorsList =
  BatchDisassociateApprovalRuleTemplateFromRepositoriesError_[];
export const BatchDisassociateApprovalRuleTemplateFromRepositoriesErrorsList =
  /*@__PURE__*/ S.Array(
    BatchDisassociateApprovalRuleTemplateFromRepositoriesError_,
  );
export interface BatchDisassociateApprovalRuleTemplateFromRepositoriesOutput {
  disassociatedRepositoryNames: string[];
  errors: BatchDisassociateApprovalRuleTemplateFromRepositoriesError_[];
}
export const BatchDisassociateApprovalRuleTemplateFromRepositoriesOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      disassociatedRepositoryNames: RepositoryNameList,
      errors: BatchDisassociateApprovalRuleTemplateFromRepositoriesErrorsList,
    }).pipe(ns),
  ).annotate({
    identifier: "BatchDisassociateApprovalRuleTemplateFromRepositoriesOutput",
  }) as any as S.Schema<BatchDisassociateApprovalRuleTemplateFromRepositoriesOutput>;
export type CommitIdsInputList = string[];
export const CommitIdsInputList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetCommitsInput {
  commitIds: string[];
  repositoryName: string;
}
export const BatchGetCommitsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ commitIds: CommitIdsInputList, repositoryName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetCommitsInput",
}) as any as S.Schema<BatchGetCommitsInput>;
export type ParentList = string[];
export const ParentList = /*@__PURE__*/ S.Array(S.String);
export type Name = string;
export type Email = string;
export interface UserInfo {
  name?: string;
  email?: string;
  date?: string;
}
export const UserInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    email: S.optional(S.String),
    date: S.optional(S.String),
  }),
).annotate({ identifier: "UserInfo" }) as any as S.Schema<UserInfo>;
export type AdditionalData = string;
export interface Commit {
  commitId?: string;
  treeId?: string;
  parents?: string[];
  message?: string;
  author?: UserInfo;
  committer?: UserInfo;
  additionalData?: string;
}
export const Commit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commitId: S.optional(S.String),
    treeId: S.optional(S.String),
    parents: S.optional(ParentList),
    message: S.optional(S.String),
    author: S.optional(UserInfo),
    committer: S.optional(UserInfo),
    additionalData: S.optional(S.String),
  }),
).annotate({ identifier: "Commit" }) as any as S.Schema<Commit>;
export type CommitObjectsList = Commit[];
export const CommitObjectsList = /*@__PURE__*/ S.Array(Commit);
export interface BatchGetCommitsError_ {
  commitId?: string;
  errorCode?: string;
  errorMessage?: string;
}
export const BatchGetCommitsError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commitId: S.optional(S.String),
    errorCode: S.optional(S.String),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchGetCommitsError",
}) as any as S.Schema<BatchGetCommitsError_>;
export type BatchGetCommitsErrorsList = BatchGetCommitsError_[];
export const BatchGetCommitsErrorsList = /*@__PURE__*/ S.Array(
  BatchGetCommitsError_,
);
export interface BatchGetCommitsOutput {
  commits?: Commit[];
  errors?: BatchGetCommitsError_[];
}
export const BatchGetCommitsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commits: S.optional(CommitObjectsList),
    errors: S.optional(BatchGetCommitsErrorsList),
  }).pipe(ns),
).annotate({
  identifier: "BatchGetCommitsOutput",
}) as any as S.Schema<BatchGetCommitsOutput>;
export interface BatchGetRepositoriesInput {
  repositoryNames: string[];
}
export const BatchGetRepositoriesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repositoryNames: RepositoryNameList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetRepositoriesInput",
}) as any as S.Schema<BatchGetRepositoriesInput>;
export type AccountId = string;
export type RepositoryId = string;
export type RepositoryDescription = string;
export type BranchName = string;
export type LastModifiedDate = Date;
export type CreationDate = Date;
export type CloneUrlHttp = string;
export type CloneUrlSsh = string;
export type Arn = string;
export type KmsKeyId = string;
export interface RepositoryMetadata {
  accountId?: string;
  repositoryId?: string;
  repositoryName?: string;
  repositoryDescription?: string;
  defaultBranch?: string;
  lastModifiedDate?: Date;
  creationDate?: Date;
  cloneUrlHttp?: string;
  cloneUrlSsh?: string;
  Arn?: string;
  kmsKeyId?: string;
}
export const RepositoryMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.optional(S.String),
    repositoryId: S.optional(S.String),
    repositoryName: S.optional(S.String),
    repositoryDescription: S.optional(S.String),
    defaultBranch: S.optional(S.String),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    cloneUrlHttp: S.optional(S.String),
    cloneUrlSsh: S.optional(S.String),
    Arn: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "RepositoryMetadata",
}) as any as S.Schema<RepositoryMetadata>;
export type RepositoryMetadataList = RepositoryMetadata[];
export const RepositoryMetadataList = /*@__PURE__*/ S.Array(RepositoryMetadata);
export type RepositoryNotFoundList = string[];
export const RepositoryNotFoundList = /*@__PURE__*/ S.Array(S.String);
export type BatchGetRepositoriesErrorCodeEnum =
  | "EncryptionIntegrityChecksFailedException"
  | "EncryptionKeyAccessDeniedException"
  | "EncryptionKeyDisabledException"
  | "EncryptionKeyNotFoundException"
  | "EncryptionKeyUnavailableException"
  | "RepositoryDoesNotExistException"
  | (string & {});
export const BatchGetRepositoriesErrorCodeEnum = S.String;

export interface BatchGetRepositoriesError_ {
  repositoryId?: string;
  repositoryName?: string;
  errorCode?: BatchGetRepositoriesErrorCodeEnum;
  errorMessage?: string;
}
export const BatchGetRepositoriesError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryId: S.optional(S.String),
    repositoryName: S.optional(S.String),
    errorCode: S.optional(BatchGetRepositoriesErrorCodeEnum),
    errorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchGetRepositoriesError",
}) as any as S.Schema<BatchGetRepositoriesError_>;
export type BatchGetRepositoriesErrorsList = BatchGetRepositoriesError_[];
export const BatchGetRepositoriesErrorsList = /*@__PURE__*/ S.Array(
  BatchGetRepositoriesError_,
);
export interface BatchGetRepositoriesOutput {
  repositories?: RepositoryMetadata[];
  repositoriesNotFound?: string[];
  errors?: BatchGetRepositoriesError_[];
}
export const BatchGetRepositoriesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositories: S.optional(RepositoryMetadataList),
    repositoriesNotFound: S.optional(RepositoryNotFoundList),
    errors: S.optional(BatchGetRepositoriesErrorsList),
  }).pipe(ns),
).annotate({
  identifier: "BatchGetRepositoriesOutput",
}) as any as S.Schema<BatchGetRepositoriesOutput>;
export type ApprovalRuleTemplateContent = string;
export type ApprovalRuleTemplateDescription = string;
export interface CreateApprovalRuleTemplateInput {
  approvalRuleTemplateName: string;
  approvalRuleTemplateContent: string;
  approvalRuleTemplateDescription?: string;
}
export const CreateApprovalRuleTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    approvalRuleTemplateName: S.String,
    approvalRuleTemplateContent: S.String,
    approvalRuleTemplateDescription: S.optional(S.String),
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
  identifier: "CreateApprovalRuleTemplateInput",
}) as any as S.Schema<CreateApprovalRuleTemplateInput>;
export type ApprovalRuleTemplateId = string;
export type RuleContentSha256 = string;
export interface ApprovalRuleTemplate {
  approvalRuleTemplateId?: string;
  approvalRuleTemplateName?: string;
  approvalRuleTemplateDescription?: string;
  approvalRuleTemplateContent?: string;
  ruleContentSha256?: string;
  lastModifiedDate?: Date;
  creationDate?: Date;
  lastModifiedUser?: string;
}
export const ApprovalRuleTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    approvalRuleTemplateId: S.optional(S.String),
    approvalRuleTemplateName: S.optional(S.String),
    approvalRuleTemplateDescription: S.optional(S.String),
    approvalRuleTemplateContent: S.optional(S.String),
    ruleContentSha256: S.optional(S.String),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedUser: S.optional(S.String),
  }),
).annotate({
  identifier: "ApprovalRuleTemplate",
}) as any as S.Schema<ApprovalRuleTemplate>;
export interface CreateApprovalRuleTemplateOutput {
  approvalRuleTemplate: ApprovalRuleTemplate;
}
export const CreateApprovalRuleTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ approvalRuleTemplate: ApprovalRuleTemplate }).pipe(ns),
).annotate({
  identifier: "CreateApprovalRuleTemplateOutput",
}) as any as S.Schema<CreateApprovalRuleTemplateOutput>;
export type CommitId = string;
export interface CreateBranchInput {
  repositoryName: string;
  branchName: string;
  commitId: string;
}
export const CreateBranchInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    branchName: S.String,
    commitId: S.String,
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
  identifier: "CreateBranchInput",
}) as any as S.Schema<CreateBranchInput>;
export interface CreateBranchResponse {}
export const CreateBranchResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateBranchResponse",
}) as any as S.Schema<CreateBranchResponse>;
export type KeepEmptyFolders = boolean;
export type FileContent = Uint8Array;
export type IsMove = boolean;
export interface SourceFileSpecifier {
  filePath: string;
  isMove?: boolean;
}
export const SourceFileSpecifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ filePath: S.String, isMove: S.optional(S.Boolean) }),
).annotate({
  identifier: "SourceFileSpecifier",
}) as any as S.Schema<SourceFileSpecifier>;
export interface PutFileEntry {
  filePath: string;
  fileMode?: FileModeTypeEnum;
  fileContent?: Uint8Array;
  sourceFile?: SourceFileSpecifier;
}
export const PutFileEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filePath: S.String,
    fileMode: S.optional(FileModeTypeEnum),
    fileContent: S.optional(T.Blob),
    sourceFile: S.optional(SourceFileSpecifier),
  }),
).annotate({ identifier: "PutFileEntry" }) as any as S.Schema<PutFileEntry>;
export type PutFileEntries = PutFileEntry[];
export const PutFileEntries = /*@__PURE__*/ S.Array(PutFileEntry);
export interface DeleteFileEntry {
  filePath: string;
}
export const DeleteFileEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ filePath: S.String }),
).annotate({
  identifier: "DeleteFileEntry",
}) as any as S.Schema<DeleteFileEntry>;
export type DeleteFileEntries = DeleteFileEntry[];
export const DeleteFileEntries = /*@__PURE__*/ S.Array(DeleteFileEntry);
export interface SetFileModeEntry {
  filePath: string;
  fileMode: FileModeTypeEnum;
}
export const SetFileModeEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ filePath: S.String, fileMode: FileModeTypeEnum }),
).annotate({
  identifier: "SetFileModeEntry",
}) as any as S.Schema<SetFileModeEntry>;
export type SetFileModeEntries = SetFileModeEntry[];
export const SetFileModeEntries = /*@__PURE__*/ S.Array(SetFileModeEntry);
export interface CreateCommitInput {
  repositoryName: string;
  branchName: string;
  parentCommitId?: string;
  authorName?: string;
  email?: string;
  commitMessage?: string;
  keepEmptyFolders?: boolean;
  putFiles?: PutFileEntry[];
  deleteFiles?: DeleteFileEntry[];
  setFileModes?: SetFileModeEntry[];
}
export const CreateCommitInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    branchName: S.String,
    parentCommitId: S.optional(S.String),
    authorName: S.optional(S.String),
    email: S.optional(S.String),
    commitMessage: S.optional(S.String),
    keepEmptyFolders: S.optional(S.Boolean),
    putFiles: S.optional(PutFileEntries),
    deleteFiles: S.optional(DeleteFileEntries),
    setFileModes: S.optional(SetFileModeEntries),
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
  identifier: "CreateCommitInput",
}) as any as S.Schema<CreateCommitInput>;
export interface FileMetadata {
  absolutePath?: string;
  blobId?: string;
  fileMode?: FileModeTypeEnum;
}
export const FileMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    absolutePath: S.optional(S.String),
    blobId: S.optional(S.String),
    fileMode: S.optional(FileModeTypeEnum),
  }),
).annotate({ identifier: "FileMetadata" }) as any as S.Schema<FileMetadata>;
export type FilesMetadata = FileMetadata[];
export const FilesMetadata = /*@__PURE__*/ S.Array(FileMetadata);
export interface CreateCommitOutput {
  commitId?: string;
  treeId?: string;
  filesAdded?: FileMetadata[];
  filesUpdated?: FileMetadata[];
  filesDeleted?: FileMetadata[];
}
export const CreateCommitOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commitId: S.optional(S.String),
    treeId: S.optional(S.String),
    filesAdded: S.optional(FilesMetadata),
    filesUpdated: S.optional(FilesMetadata),
    filesDeleted: S.optional(FilesMetadata),
  }).pipe(ns),
).annotate({
  identifier: "CreateCommitOutput",
}) as any as S.Schema<CreateCommitOutput>;
export type Title = string;
export type Description = string;
export type ReferenceName = string;
export interface Target {
  repositoryName: string;
  sourceReference: string;
  destinationReference?: string;
}
export const Target = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    sourceReference: S.String,
    destinationReference: S.optional(S.String),
  }),
).annotate({ identifier: "Target" }) as any as S.Schema<Target>;
export type TargetList = Target[];
export const TargetList = /*@__PURE__*/ S.Array(Target);
export type ClientRequestToken = string;
export interface CreatePullRequestInput {
  title: string;
  description?: string;
  targets: Target[];
  clientRequestToken?: string;
}
export const CreatePullRequestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.String,
    description: S.optional(S.String),
    targets: TargetList,
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
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
  identifier: "CreatePullRequestInput",
}) as any as S.Schema<CreatePullRequestInput>;
export type PullRequestId = string;
export type PullRequestStatusEnum = "OPEN" | "CLOSED" | (string & {});
export const PullRequestStatusEnum = S.String;

export type IsMerged = boolean;
export interface MergeMetadata {
  isMerged?: boolean;
  mergedBy?: string;
  mergeCommitId?: string;
  mergeOption?: MergeOptionTypeEnum;
}
export const MergeMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    isMerged: S.optional(S.Boolean),
    mergedBy: S.optional(S.String),
    mergeCommitId: S.optional(S.String),
    mergeOption: S.optional(MergeOptionTypeEnum),
  }),
).annotate({ identifier: "MergeMetadata" }) as any as S.Schema<MergeMetadata>;
export interface PullRequestTarget {
  repositoryName?: string;
  sourceReference?: string;
  destinationReference?: string;
  destinationCommit?: string;
  sourceCommit?: string;
  mergeBase?: string;
  mergeMetadata?: MergeMetadata;
}
export const PullRequestTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.optional(S.String),
    sourceReference: S.optional(S.String),
    destinationReference: S.optional(S.String),
    destinationCommit: S.optional(S.String),
    sourceCommit: S.optional(S.String),
    mergeBase: S.optional(S.String),
    mergeMetadata: S.optional(MergeMetadata),
  }),
).annotate({
  identifier: "PullRequestTarget",
}) as any as S.Schema<PullRequestTarget>;
export type PullRequestTargetList = PullRequestTarget[];
export const PullRequestTargetList = /*@__PURE__*/ S.Array(PullRequestTarget);
export type RevisionId = string;
export type ApprovalRuleId = string;
export type ApprovalRuleName = string;
export type ApprovalRuleContent = string;
export interface OriginApprovalRuleTemplate {
  approvalRuleTemplateId?: string;
  approvalRuleTemplateName?: string;
}
export const OriginApprovalRuleTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    approvalRuleTemplateId: S.optional(S.String),
    approvalRuleTemplateName: S.optional(S.String),
  }),
).annotate({
  identifier: "OriginApprovalRuleTemplate",
}) as any as S.Schema<OriginApprovalRuleTemplate>;
export interface ApprovalRule {
  approvalRuleId?: string;
  approvalRuleName?: string;
  approvalRuleContent?: string;
  ruleContentSha256?: string;
  lastModifiedDate?: Date;
  creationDate?: Date;
  lastModifiedUser?: string;
  originApprovalRuleTemplate?: OriginApprovalRuleTemplate;
}
export const ApprovalRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    approvalRuleId: S.optional(S.String),
    approvalRuleName: S.optional(S.String),
    approvalRuleContent: S.optional(S.String),
    ruleContentSha256: S.optional(S.String),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedUser: S.optional(S.String),
    originApprovalRuleTemplate: S.optional(OriginApprovalRuleTemplate),
  }),
).annotate({ identifier: "ApprovalRule" }) as any as S.Schema<ApprovalRule>;
export type ApprovalRulesList = ApprovalRule[];
export const ApprovalRulesList = /*@__PURE__*/ S.Array(ApprovalRule);
export interface PullRequest {
  pullRequestId?: string;
  title?: string;
  description?: string;
  lastActivityDate?: Date;
  creationDate?: Date;
  pullRequestStatus?: PullRequestStatusEnum;
  authorArn?: string;
  pullRequestTargets?: PullRequestTarget[];
  clientRequestToken?: string;
  revisionId?: string;
  approvalRules?: ApprovalRule[];
}
export const PullRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pullRequestId: S.optional(S.String),
    title: S.optional(S.String),
    description: S.optional(S.String),
    lastActivityDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    pullRequestStatus: S.optional(PullRequestStatusEnum),
    authorArn: S.optional(S.String),
    pullRequestTargets: S.optional(PullRequestTargetList),
    clientRequestToken: S.optional(S.String),
    revisionId: S.optional(S.String),
    approvalRules: S.optional(ApprovalRulesList),
  }),
).annotate({ identifier: "PullRequest" }) as any as S.Schema<PullRequest>;
export interface CreatePullRequestOutput {
  pullRequest: PullRequest;
}
export const CreatePullRequestOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pullRequest: PullRequest }).pipe(ns),
).annotate({
  identifier: "CreatePullRequestOutput",
}) as any as S.Schema<CreatePullRequestOutput>;
export interface CreatePullRequestApprovalRuleInput {
  pullRequestId: string;
  approvalRuleName: string;
  approvalRuleContent: string;
}
export const CreatePullRequestApprovalRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pullRequestId: S.String,
    approvalRuleName: S.String,
    approvalRuleContent: S.String,
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
  identifier: "CreatePullRequestApprovalRuleInput",
}) as any as S.Schema<CreatePullRequestApprovalRuleInput>;
export interface CreatePullRequestApprovalRuleOutput {
  approvalRule: ApprovalRule;
}
export const CreatePullRequestApprovalRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ approvalRule: ApprovalRule }).pipe(ns),
).annotate({
  identifier: "CreatePullRequestApprovalRuleOutput",
}) as any as S.Schema<CreatePullRequestApprovalRuleOutput>;
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export const TagsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateRepositoryInput {
  repositoryName: string;
  repositoryDescription?: string;
  tags?: { [key: string]: string | undefined };
  kmsKeyId?: string;
}
export const CreateRepositoryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    repositoryDescription: S.optional(S.String),
    tags: S.optional(TagsMap),
    kmsKeyId: S.optional(S.String),
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
  identifier: "CreateRepositoryInput",
}) as any as S.Schema<CreateRepositoryInput>;
export interface CreateRepositoryOutput {
  repositoryMetadata?: RepositoryMetadata;
}
export const CreateRepositoryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repositoryMetadata: S.optional(RepositoryMetadata) }).pipe(ns),
).annotate({
  identifier: "CreateRepositoryOutput",
}) as any as S.Schema<CreateRepositoryOutput>;
export type ReplacementTypeEnum =
  | "KEEP_BASE"
  | "KEEP_SOURCE"
  | "KEEP_DESTINATION"
  | "USE_NEW_CONTENT"
  | (string & {});
export const ReplacementTypeEnum = S.String;

export interface ReplaceContentEntry {
  filePath: string;
  replacementType: ReplacementTypeEnum;
  content?: Uint8Array;
  fileMode?: FileModeTypeEnum;
}
export const ReplaceContentEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filePath: S.String,
    replacementType: ReplacementTypeEnum,
    content: S.optional(T.Blob),
    fileMode: S.optional(FileModeTypeEnum),
  }),
).annotate({
  identifier: "ReplaceContentEntry",
}) as any as S.Schema<ReplaceContentEntry>;
export type ReplaceContentEntries = ReplaceContentEntry[];
export const ReplaceContentEntries = /*@__PURE__*/ S.Array(ReplaceContentEntry);
export interface ConflictResolution {
  replaceContents?: ReplaceContentEntry[];
  deleteFiles?: DeleteFileEntry[];
  setFileModes?: SetFileModeEntry[];
}
export const ConflictResolution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    replaceContents: S.optional(ReplaceContentEntries),
    deleteFiles: S.optional(DeleteFileEntries),
    setFileModes: S.optional(SetFileModeEntries),
  }),
).annotate({
  identifier: "ConflictResolution",
}) as any as S.Schema<ConflictResolution>;
export interface CreateUnreferencedMergeCommitInput {
  repositoryName: string;
  sourceCommitSpecifier: string;
  destinationCommitSpecifier: string;
  mergeOption: MergeOptionTypeEnum;
  conflictDetailLevel?: ConflictDetailLevelTypeEnum;
  conflictResolutionStrategy?: ConflictResolutionStrategyTypeEnum;
  authorName?: string;
  email?: string;
  commitMessage?: string;
  keepEmptyFolders?: boolean;
  conflictResolution?: ConflictResolution;
}
export const CreateUnreferencedMergeCommitInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    sourceCommitSpecifier: S.String,
    destinationCommitSpecifier: S.String,
    mergeOption: MergeOptionTypeEnum,
    conflictDetailLevel: S.optional(ConflictDetailLevelTypeEnum),
    conflictResolutionStrategy: S.optional(ConflictResolutionStrategyTypeEnum),
    authorName: S.optional(S.String),
    email: S.optional(S.String),
    commitMessage: S.optional(S.String),
    keepEmptyFolders: S.optional(S.Boolean),
    conflictResolution: S.optional(ConflictResolution),
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
  identifier: "CreateUnreferencedMergeCommitInput",
}) as any as S.Schema<CreateUnreferencedMergeCommitInput>;
export interface CreateUnreferencedMergeCommitOutput {
  commitId?: string;
  treeId?: string;
}
export const CreateUnreferencedMergeCommitOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commitId: S.optional(S.String),
    treeId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "CreateUnreferencedMergeCommitOutput",
}) as any as S.Schema<CreateUnreferencedMergeCommitOutput>;
export interface DeleteApprovalRuleTemplateInput {
  approvalRuleTemplateName: string;
}
export const DeleteApprovalRuleTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ approvalRuleTemplateName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteApprovalRuleTemplateInput",
}) as any as S.Schema<DeleteApprovalRuleTemplateInput>;
export interface DeleteApprovalRuleTemplateOutput {
  approvalRuleTemplateId: string;
}
export const DeleteApprovalRuleTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ approvalRuleTemplateId: S.String }).pipe(ns),
).annotate({
  identifier: "DeleteApprovalRuleTemplateOutput",
}) as any as S.Schema<DeleteApprovalRuleTemplateOutput>;
export interface DeleteBranchInput {
  repositoryName: string;
  branchName: string;
}
export const DeleteBranchInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repositoryName: S.String, branchName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBranchInput",
}) as any as S.Schema<DeleteBranchInput>;
export interface BranchInfo {
  branchName?: string;
  commitId?: string;
}
export const BranchInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    branchName: S.optional(S.String),
    commitId: S.optional(S.String),
  }),
).annotate({ identifier: "BranchInfo" }) as any as S.Schema<BranchInfo>;
export interface DeleteBranchOutput {
  deletedBranch?: BranchInfo;
}
export const DeleteBranchOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deletedBranch: S.optional(BranchInfo) }).pipe(ns),
).annotate({
  identifier: "DeleteBranchOutput",
}) as any as S.Schema<DeleteBranchOutput>;
export type CommentId = string;
export interface DeleteCommentContentInput {
  commentId: string;
}
export const DeleteCommentContentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ commentId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCommentContentInput",
}) as any as S.Schema<DeleteCommentContentInput>;
export type Content = string;
export type IsCommentDeleted = boolean;
export type ReactionValue = string;
export type CallerReactions = string[];
export const CallerReactions = /*@__PURE__*/ S.Array(S.String);
export type Count = number;
export type ReactionCountsMap = { [key: string]: number | undefined };
export const ReactionCountsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export interface Comment {
  commentId?: string;
  content?: string;
  inReplyTo?: string;
  creationDate?: Date;
  lastModifiedDate?: Date;
  authorArn?: string;
  deleted?: boolean;
  clientRequestToken?: string;
  callerReactions?: string[];
  reactionCounts?: { [key: string]: number | undefined };
}
export const Comment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commentId: S.optional(S.String),
    content: S.optional(S.String),
    inReplyTo: S.optional(S.String),
    creationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastModifiedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    authorArn: S.optional(S.String),
    deleted: S.optional(S.Boolean),
    clientRequestToken: S.optional(S.String),
    callerReactions: S.optional(CallerReactions),
    reactionCounts: S.optional(ReactionCountsMap),
  }),
).annotate({ identifier: "Comment" }) as any as S.Schema<Comment>;
export interface DeleteCommentContentOutput {
  comment?: Comment;
}
export const DeleteCommentContentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ comment: S.optional(Comment) }).pipe(ns),
).annotate({
  identifier: "DeleteCommentContentOutput",
}) as any as S.Schema<DeleteCommentContentOutput>;
export interface DeleteFileInput {
  repositoryName: string;
  branchName: string;
  filePath: string;
  parentCommitId: string;
  keepEmptyFolders?: boolean;
  commitMessage?: string;
  name?: string;
  email?: string;
}
export const DeleteFileInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    branchName: S.String,
    filePath: S.String,
    parentCommitId: S.String,
    keepEmptyFolders: S.optional(S.Boolean),
    commitMessage: S.optional(S.String),
    name: S.optional(S.String),
    email: S.optional(S.String),
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
  identifier: "DeleteFileInput",
}) as any as S.Schema<DeleteFileInput>;
export interface DeleteFileOutput {
  commitId: string;
  blobId: string;
  treeId: string;
  filePath: string;
}
export const DeleteFileOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commitId: S.String,
    blobId: S.String,
    treeId: S.String,
    filePath: S.String,
  }).pipe(ns),
).annotate({
  identifier: "DeleteFileOutput",
}) as any as S.Schema<DeleteFileOutput>;
export interface DeletePullRequestApprovalRuleInput {
  pullRequestId: string;
  approvalRuleName: string;
}
export const DeletePullRequestApprovalRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pullRequestId: S.String, approvalRuleName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePullRequestApprovalRuleInput",
}) as any as S.Schema<DeletePullRequestApprovalRuleInput>;
export interface DeletePullRequestApprovalRuleOutput {
  approvalRuleId: string;
}
export const DeletePullRequestApprovalRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ approvalRuleId: S.String }).pipe(ns),
).annotate({
  identifier: "DeletePullRequestApprovalRuleOutput",
}) as any as S.Schema<DeletePullRequestApprovalRuleOutput>;
export interface DeleteRepositoryInput {
  repositoryName: string;
}
export const DeleteRepositoryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repositoryName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteRepositoryInput",
}) as any as S.Schema<DeleteRepositoryInput>;
export interface DeleteRepositoryOutput {
  repositoryId?: string;
}
export const DeleteRepositoryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repositoryId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "DeleteRepositoryOutput",
}) as any as S.Schema<DeleteRepositoryOutput>;
export interface DescribeMergeConflictsInput {
  repositoryName: string;
  destinationCommitSpecifier: string;
  sourceCommitSpecifier: string;
  mergeOption: MergeOptionTypeEnum;
  maxMergeHunks?: number;
  filePath: string;
  conflictDetailLevel?: ConflictDetailLevelTypeEnum;
  conflictResolutionStrategy?: ConflictResolutionStrategyTypeEnum;
  nextToken?: string;
}
export const DescribeMergeConflictsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    destinationCommitSpecifier: S.String,
    sourceCommitSpecifier: S.String,
    mergeOption: MergeOptionTypeEnum,
    maxMergeHunks: S.optional(S.Number),
    filePath: S.String,
    conflictDetailLevel: S.optional(ConflictDetailLevelTypeEnum),
    conflictResolutionStrategy: S.optional(ConflictResolutionStrategyTypeEnum),
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
  identifier: "DescribeMergeConflictsInput",
}) as any as S.Schema<DescribeMergeConflictsInput>;
export interface DescribeMergeConflictsOutput {
  conflictMetadata: ConflictMetadata;
  mergeHunks: MergeHunk[];
  nextToken?: string;
  destinationCommitId: string;
  sourceCommitId: string;
  baseCommitId?: string;
}
export const DescribeMergeConflictsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    conflictMetadata: ConflictMetadata,
    mergeHunks: MergeHunks,
    nextToken: S.optional(S.String),
    destinationCommitId: S.String,
    sourceCommitId: S.String,
    baseCommitId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeMergeConflictsOutput",
}) as any as S.Schema<DescribeMergeConflictsOutput>;
export type PullRequestEventType =
  | "PULL_REQUEST_CREATED"
  | "PULL_REQUEST_STATUS_CHANGED"
  | "PULL_REQUEST_SOURCE_REFERENCE_UPDATED"
  | "PULL_REQUEST_MERGE_STATE_CHANGED"
  | "PULL_REQUEST_APPROVAL_RULE_CREATED"
  | "PULL_REQUEST_APPROVAL_RULE_UPDATED"
  | "PULL_REQUEST_APPROVAL_RULE_DELETED"
  | "PULL_REQUEST_APPROVAL_RULE_OVERRIDDEN"
  | "PULL_REQUEST_APPROVAL_STATE_CHANGED"
  | (string & {});
export const PullRequestEventType = S.String;

export interface DescribePullRequestEventsInput {
  pullRequestId: string;
  pullRequestEventType?: PullRequestEventType;
  actorArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const DescribePullRequestEventsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pullRequestId: S.String,
    pullRequestEventType: S.optional(PullRequestEventType),
    actorArn: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "DescribePullRequestEventsInput",
}) as any as S.Schema<DescribePullRequestEventsInput>;
export type EventDate = Date;
export interface PullRequestCreatedEventMetadata {
  repositoryName?: string;
  sourceCommitId?: string;
  destinationCommitId?: string;
  mergeBase?: string;
}
export const PullRequestCreatedEventMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.optional(S.String),
    sourceCommitId: S.optional(S.String),
    destinationCommitId: S.optional(S.String),
    mergeBase: S.optional(S.String),
  }),
).annotate({
  identifier: "PullRequestCreatedEventMetadata",
}) as any as S.Schema<PullRequestCreatedEventMetadata>;
export interface PullRequestStatusChangedEventMetadata {
  pullRequestStatus?: PullRequestStatusEnum;
}
export const PullRequestStatusChangedEventMetadata = /*@__PURE__*/ S.suspend(
  () => S.Struct({ pullRequestStatus: S.optional(PullRequestStatusEnum) }),
).annotate({
  identifier: "PullRequestStatusChangedEventMetadata",
}) as any as S.Schema<PullRequestStatusChangedEventMetadata>;
export interface PullRequestSourceReferenceUpdatedEventMetadata {
  repositoryName?: string;
  beforeCommitId?: string;
  afterCommitId?: string;
  mergeBase?: string;
}
export const PullRequestSourceReferenceUpdatedEventMetadata =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      repositoryName: S.optional(S.String),
      beforeCommitId: S.optional(S.String),
      afterCommitId: S.optional(S.String),
      mergeBase: S.optional(S.String),
    }),
  ).annotate({
    identifier: "PullRequestSourceReferenceUpdatedEventMetadata",
  }) as any as S.Schema<PullRequestSourceReferenceUpdatedEventMetadata>;
export interface PullRequestMergedStateChangedEventMetadata {
  repositoryName?: string;
  destinationReference?: string;
  mergeMetadata?: MergeMetadata;
}
export const PullRequestMergedStateChangedEventMetadata =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      repositoryName: S.optional(S.String),
      destinationReference: S.optional(S.String),
      mergeMetadata: S.optional(MergeMetadata),
    }),
  ).annotate({
    identifier: "PullRequestMergedStateChangedEventMetadata",
  }) as any as S.Schema<PullRequestMergedStateChangedEventMetadata>;
export interface ApprovalRuleEventMetadata {
  approvalRuleName?: string;
  approvalRuleId?: string;
  approvalRuleContent?: string;
}
export const ApprovalRuleEventMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    approvalRuleName: S.optional(S.String),
    approvalRuleId: S.optional(S.String),
    approvalRuleContent: S.optional(S.String),
  }),
).annotate({
  identifier: "ApprovalRuleEventMetadata",
}) as any as S.Schema<ApprovalRuleEventMetadata>;
export type ApprovalState = "APPROVE" | "REVOKE" | (string & {});
export const ApprovalState = S.String;

export interface ApprovalStateChangedEventMetadata {
  revisionId?: string;
  approvalStatus?: ApprovalState;
}
export const ApprovalStateChangedEventMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    revisionId: S.optional(S.String),
    approvalStatus: S.optional(ApprovalState),
  }),
).annotate({
  identifier: "ApprovalStateChangedEventMetadata",
}) as any as S.Schema<ApprovalStateChangedEventMetadata>;
export type OverrideStatus = "OVERRIDE" | "REVOKE" | (string & {});
export const OverrideStatus = S.String;

export interface ApprovalRuleOverriddenEventMetadata {
  revisionId?: string;
  overrideStatus?: OverrideStatus;
}
export const ApprovalRuleOverriddenEventMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    revisionId: S.optional(S.String),
    overrideStatus: S.optional(OverrideStatus),
  }),
).annotate({
  identifier: "ApprovalRuleOverriddenEventMetadata",
}) as any as S.Schema<ApprovalRuleOverriddenEventMetadata>;
export interface PullRequestEvent {
  pullRequestId?: string;
  eventDate?: Date;
  pullRequestEventType?: PullRequestEventType;
  actorArn?: string;
  pullRequestCreatedEventMetadata?: PullRequestCreatedEventMetadata;
  pullRequestStatusChangedEventMetadata?: PullRequestStatusChangedEventMetadata;
  pullRequestSourceReferenceUpdatedEventMetadata?: PullRequestSourceReferenceUpdatedEventMetadata;
  pullRequestMergedStateChangedEventMetadata?: PullRequestMergedStateChangedEventMetadata;
  approvalRuleEventMetadata?: ApprovalRuleEventMetadata;
  approvalStateChangedEventMetadata?: ApprovalStateChangedEventMetadata;
  approvalRuleOverriddenEventMetadata?: ApprovalRuleOverriddenEventMetadata;
}
export const PullRequestEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pullRequestId: S.optional(S.String),
    eventDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    pullRequestEventType: S.optional(PullRequestEventType),
    actorArn: S.optional(S.String),
    pullRequestCreatedEventMetadata: S.optional(
      PullRequestCreatedEventMetadata,
    ),
    pullRequestStatusChangedEventMetadata: S.optional(
      PullRequestStatusChangedEventMetadata,
    ),
    pullRequestSourceReferenceUpdatedEventMetadata: S.optional(
      PullRequestSourceReferenceUpdatedEventMetadata,
    ),
    pullRequestMergedStateChangedEventMetadata: S.optional(
      PullRequestMergedStateChangedEventMetadata,
    ),
    approvalRuleEventMetadata: S.optional(ApprovalRuleEventMetadata),
    approvalStateChangedEventMetadata: S.optional(
      ApprovalStateChangedEventMetadata,
    ),
    approvalRuleOverriddenEventMetadata: S.optional(
      ApprovalRuleOverriddenEventMetadata,
    ),
  }),
).annotate({
  identifier: "PullRequestEvent",
}) as any as S.Schema<PullRequestEvent>;
export type PullRequestEventList = PullRequestEvent[];
export const PullRequestEventList = /*@__PURE__*/ S.Array(PullRequestEvent);
export interface DescribePullRequestEventsOutput {
  pullRequestEvents: PullRequestEvent[];
  nextToken?: string;
}
export const DescribePullRequestEventsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pullRequestEvents: PullRequestEventList,
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribePullRequestEventsOutput",
}) as any as S.Schema<DescribePullRequestEventsOutput>;
export interface DisassociateApprovalRuleTemplateFromRepositoryInput {
  approvalRuleTemplateName: string;
  repositoryName: string;
}
export const DisassociateApprovalRuleTemplateFromRepositoryInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      approvalRuleTemplateName: S.String,
      repositoryName: S.String,
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
    identifier: "DisassociateApprovalRuleTemplateFromRepositoryInput",
  }) as any as S.Schema<DisassociateApprovalRuleTemplateFromRepositoryInput>;
export interface DisassociateApprovalRuleTemplateFromRepositoryResponse {}
export const DisassociateApprovalRuleTemplateFromRepositoryResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "DisassociateApprovalRuleTemplateFromRepositoryResponse",
  }) as any as S.Schema<DisassociateApprovalRuleTemplateFromRepositoryResponse>;
export interface EvaluatePullRequestApprovalRulesInput {
  pullRequestId: string;
  revisionId: string;
}
export const EvaluatePullRequestApprovalRulesInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ pullRequestId: S.String, revisionId: S.String }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "EvaluatePullRequestApprovalRulesInput",
}) as any as S.Schema<EvaluatePullRequestApprovalRulesInput>;
export type Approved = boolean;
export type Overridden = boolean;
export type ApprovalRulesSatisfiedList = string[];
export const ApprovalRulesSatisfiedList = /*@__PURE__*/ S.Array(S.String);
export type ApprovalRulesNotSatisfiedList = string[];
export const ApprovalRulesNotSatisfiedList = /*@__PURE__*/ S.Array(S.String);
export interface Evaluation {
  approved?: boolean;
  overridden?: boolean;
  approvalRulesSatisfied?: string[];
  approvalRulesNotSatisfied?: string[];
}
export const Evaluation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    approved: S.optional(S.Boolean),
    overridden: S.optional(S.Boolean),
    approvalRulesSatisfied: S.optional(ApprovalRulesSatisfiedList),
    approvalRulesNotSatisfied: S.optional(ApprovalRulesNotSatisfiedList),
  }),
).annotate({ identifier: "Evaluation" }) as any as S.Schema<Evaluation>;
export interface EvaluatePullRequestApprovalRulesOutput {
  evaluation: Evaluation;
}
export const EvaluatePullRequestApprovalRulesOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ evaluation: Evaluation }).pipe(ns),
).annotate({
  identifier: "EvaluatePullRequestApprovalRulesOutput",
}) as any as S.Schema<EvaluatePullRequestApprovalRulesOutput>;
export interface GetApprovalRuleTemplateInput {
  approvalRuleTemplateName: string;
}
export const GetApprovalRuleTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ approvalRuleTemplateName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApprovalRuleTemplateInput",
}) as any as S.Schema<GetApprovalRuleTemplateInput>;
export interface GetApprovalRuleTemplateOutput {
  approvalRuleTemplate: ApprovalRuleTemplate;
}
export const GetApprovalRuleTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ approvalRuleTemplate: ApprovalRuleTemplate }).pipe(ns),
).annotate({
  identifier: "GetApprovalRuleTemplateOutput",
}) as any as S.Schema<GetApprovalRuleTemplateOutput>;
export interface GetBlobInput {
  repositoryName: string;
  blobId: string;
}
export const GetBlobInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repositoryName: S.String, blobId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetBlobInput" }) as any as S.Schema<GetBlobInput>;
export interface GetBlobOutput {
  content: Uint8Array;
}
export const GetBlobOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ content: T.Blob }).pipe(ns),
).annotate({ identifier: "GetBlobOutput" }) as any as S.Schema<GetBlobOutput>;
export type DiffContext = number;
export type IgnoreWhiteSpaces = boolean;
export type Limit = number;
export interface GetBlobDifferencesInput {
  repositoryName: string;
  afterBlobId: string;
  beforeBlobId?: string;
  contextLines?: number;
  ignoreWhitespace?: boolean;
  MaxResults?: number;
  NextToken?: string;
}
export const GetBlobDifferencesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    afterBlobId: S.String,
    beforeBlobId: S.optional(S.String),
    contextLines: S.optional(S.Number),
    ignoreWhitespace: S.optional(S.Boolean),
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
  identifier: "GetBlobDifferencesInput",
}) as any as S.Schema<GetBlobDifferencesInput>;
export type DiffChangeType = "CONTEXT" | "ADD" | "DELETE" | (string & {});
export const DiffChangeType = S.String;

export type LineContent = string;
export interface DiffChange {
  type?: DiffChangeType;
  beforeLineNumber?: number;
  afterLineNumber?: number;
  content?: string;
}
export const DiffChange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(DiffChangeType),
    beforeLineNumber: S.optional(S.Number),
    afterLineNumber: S.optional(S.Number),
    content: S.optional(S.String),
  }),
).annotate({ identifier: "DiffChange" }) as any as S.Schema<DiffChange>;
export type DiffChangeList = DiffChange[];
export const DiffChangeList = /*@__PURE__*/ S.Array(DiffChange);
export interface DiffHunk {
  beforeStartLine?: number;
  beforeLineCount?: number;
  afterStartLine?: number;
  afterLineCount?: number;
  changes?: DiffChange[];
}
export const DiffHunk = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    beforeStartLine: S.optional(S.Number),
    beforeLineCount: S.optional(S.Number),
    afterStartLine: S.optional(S.Number),
    afterLineCount: S.optional(S.Number),
    changes: S.optional(DiffChangeList),
  }),
).annotate({ identifier: "DiffHunk" }) as any as S.Schema<DiffHunk>;
export type DiffHunkList = DiffHunk[];
export const DiffHunkList = /*@__PURE__*/ S.Array(DiffHunk);
export type ObjectSize = number;
export interface GetBlobDifferencesOutput {
  hunks: DiffHunk[];
  isBinary: boolean;
  beforeBlobSize?: number;
  afterBlobSize: number;
  NextToken?: string;
}
export const GetBlobDifferencesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hunks: DiffHunkList,
    isBinary: S.Boolean,
    beforeBlobSize: S.optional(S.Number),
    afterBlobSize: S.Number,
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetBlobDifferencesOutput",
}) as any as S.Schema<GetBlobDifferencesOutput>;
export interface GetBranchInput {
  repositoryName?: string;
  branchName?: string;
}
export const GetBranchInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.optional(S.String),
    branchName: S.optional(S.String),
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
).annotate({ identifier: "GetBranchInput" }) as any as S.Schema<GetBranchInput>;
export interface GetBranchOutput {
  branch?: BranchInfo;
}
export const GetBranchOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ branch: S.optional(BranchInfo) }).pipe(ns),
).annotate({
  identifier: "GetBranchOutput",
}) as any as S.Schema<GetBranchOutput>;
export interface GetCommentInput {
  commentId: string;
}
export const GetCommentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ commentId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCommentInput",
}) as any as S.Schema<GetCommentInput>;
export interface GetCommentOutput {
  comment?: Comment;
}
export const GetCommentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ comment: S.optional(Comment) }).pipe(ns),
).annotate({
  identifier: "GetCommentOutput",
}) as any as S.Schema<GetCommentOutput>;
export interface GetCommentReactionsInput {
  commentId: string;
  reactionUserArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetCommentReactionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commentId: S.String,
    reactionUserArn: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "GetCommentReactionsInput",
}) as any as S.Schema<GetCommentReactionsInput>;
export type ReactionEmoji = string;
export type ReactionShortCode = string;
export type ReactionUnicode = string;
export interface ReactionValueFormats {
  emoji?: string;
  shortCode?: string;
  unicode?: string;
}
export const ReactionValueFormats = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    emoji: S.optional(S.String),
    shortCode: S.optional(S.String),
    unicode: S.optional(S.String),
  }),
).annotate({
  identifier: "ReactionValueFormats",
}) as any as S.Schema<ReactionValueFormats>;
export type ReactionUsersList = string[];
export const ReactionUsersList = /*@__PURE__*/ S.Array(S.String);
export interface ReactionForComment {
  reaction?: ReactionValueFormats;
  reactionUsers?: string[];
  reactionsFromDeletedUsersCount?: number;
}
export const ReactionForComment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reaction: S.optional(ReactionValueFormats),
    reactionUsers: S.optional(ReactionUsersList),
    reactionsFromDeletedUsersCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ReactionForComment",
}) as any as S.Schema<ReactionForComment>;
export type ReactionsForCommentList = ReactionForComment[];
export const ReactionsForCommentList =
  /*@__PURE__*/ S.Array(ReactionForComment);
export interface GetCommentReactionsOutput {
  reactionsForComment: ReactionForComment[];
  nextToken?: string;
}
export const GetCommentReactionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    reactionsForComment: ReactionsForCommentList,
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetCommentReactionsOutput",
}) as any as S.Schema<GetCommentReactionsOutput>;
export interface GetCommentsForComparedCommitInput {
  repositoryName: string;
  beforeCommitId?: string;
  afterCommitId: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetCommentsForComparedCommitInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    beforeCommitId: S.optional(S.String),
    afterCommitId: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "GetCommentsForComparedCommitInput",
}) as any as S.Schema<GetCommentsForComparedCommitInput>;
export type Position = number;
export type RelativeFileVersionEnum = "BEFORE" | "AFTER" | (string & {});
export const RelativeFileVersionEnum = S.String;

export interface Location {
  filePath?: string;
  filePosition?: number;
  relativeFileVersion?: RelativeFileVersionEnum;
}
export const Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filePath: S.optional(S.String),
    filePosition: S.optional(S.Number),
    relativeFileVersion: S.optional(RelativeFileVersionEnum),
  }),
).annotate({ identifier: "Location" }) as any as S.Schema<Location>;
export type Comments = Comment[];
export const Comments = /*@__PURE__*/ S.Array(Comment);
export interface CommentsForComparedCommit {
  repositoryName?: string;
  beforeCommitId?: string;
  afterCommitId?: string;
  beforeBlobId?: string;
  afterBlobId?: string;
  location?: Location;
  comments?: Comment[];
}
export const CommentsForComparedCommit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.optional(S.String),
    beforeCommitId: S.optional(S.String),
    afterCommitId: S.optional(S.String),
    beforeBlobId: S.optional(S.String),
    afterBlobId: S.optional(S.String),
    location: S.optional(Location),
    comments: S.optional(Comments),
  }),
).annotate({
  identifier: "CommentsForComparedCommit",
}) as any as S.Schema<CommentsForComparedCommit>;
export type CommentsForComparedCommitData = CommentsForComparedCommit[];
export const CommentsForComparedCommitData = /*@__PURE__*/ S.Array(
  CommentsForComparedCommit,
);
export interface GetCommentsForComparedCommitOutput {
  commentsForComparedCommitData?: CommentsForComparedCommit[];
  nextToken?: string;
}
export const GetCommentsForComparedCommitOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commentsForComparedCommitData: S.optional(CommentsForComparedCommitData),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetCommentsForComparedCommitOutput",
}) as any as S.Schema<GetCommentsForComparedCommitOutput>;
export interface GetCommentsForPullRequestInput {
  pullRequestId: string;
  repositoryName?: string;
  beforeCommitId?: string;
  afterCommitId?: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetCommentsForPullRequestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pullRequestId: S.String,
    repositoryName: S.optional(S.String),
    beforeCommitId: S.optional(S.String),
    afterCommitId: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "GetCommentsForPullRequestInput",
}) as any as S.Schema<GetCommentsForPullRequestInput>;
export interface CommentsForPullRequest {
  pullRequestId?: string;
  repositoryName?: string;
  beforeCommitId?: string;
  afterCommitId?: string;
  beforeBlobId?: string;
  afterBlobId?: string;
  location?: Location;
  comments?: Comment[];
}
export const CommentsForPullRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pullRequestId: S.optional(S.String),
    repositoryName: S.optional(S.String),
    beforeCommitId: S.optional(S.String),
    afterCommitId: S.optional(S.String),
    beforeBlobId: S.optional(S.String),
    afterBlobId: S.optional(S.String),
    location: S.optional(Location),
    comments: S.optional(Comments),
  }),
).annotate({
  identifier: "CommentsForPullRequest",
}) as any as S.Schema<CommentsForPullRequest>;
export type CommentsForPullRequestData = CommentsForPullRequest[];
export const CommentsForPullRequestData = /*@__PURE__*/ S.Array(
  CommentsForPullRequest,
);
export interface GetCommentsForPullRequestOutput {
  commentsForPullRequestData?: CommentsForPullRequest[];
  nextToken?: string;
}
export const GetCommentsForPullRequestOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commentsForPullRequestData: S.optional(CommentsForPullRequestData),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetCommentsForPullRequestOutput",
}) as any as S.Schema<GetCommentsForPullRequestOutput>;
export interface GetCommitInput {
  repositoryName: string;
  commitId: string;
}
export const GetCommitInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repositoryName: S.String, commitId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetCommitInput" }) as any as S.Schema<GetCommitInput>;
export interface GetCommitOutput {
  commit: Commit;
}
export const GetCommitOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ commit: Commit }).pipe(ns),
).annotate({
  identifier: "GetCommitOutput",
}) as any as S.Schema<GetCommitOutput>;
export interface GetDifferencesInput {
  repositoryName: string;
  beforeCommitSpecifier?: string;
  afterCommitSpecifier: string;
  beforePath?: string;
  afterPath?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const GetDifferencesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    beforeCommitSpecifier: S.optional(S.String),
    afterCommitSpecifier: S.String,
    beforePath: S.optional(S.String),
    afterPath: S.optional(S.String),
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
  identifier: "GetDifferencesInput",
}) as any as S.Schema<GetDifferencesInput>;
export type Mode = string;
export interface BlobMetadata {
  blobId?: string;
  path?: string;
  mode?: string;
}
export const BlobMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    blobId: S.optional(S.String),
    path: S.optional(S.String),
    mode: S.optional(S.String),
  }),
).annotate({ identifier: "BlobMetadata" }) as any as S.Schema<BlobMetadata>;
export interface Difference {
  beforeBlob?: BlobMetadata;
  afterBlob?: BlobMetadata;
  changeType?: ChangeTypeEnum;
}
export const Difference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    beforeBlob: S.optional(BlobMetadata),
    afterBlob: S.optional(BlobMetadata),
    changeType: S.optional(ChangeTypeEnum),
  }),
).annotate({ identifier: "Difference" }) as any as S.Schema<Difference>;
export type DifferenceList = Difference[];
export const DifferenceList = /*@__PURE__*/ S.Array(Difference);
export interface GetDifferencesOutput {
  differences?: Difference[];
  NextToken?: string;
}
export const GetDifferencesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    differences: S.optional(DifferenceList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetDifferencesOutput",
}) as any as S.Schema<GetDifferencesOutput>;
export interface GetFileInput {
  repositoryName: string;
  commitSpecifier?: string;
  filePath: string;
}
export const GetFileInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    commitSpecifier: S.optional(S.String),
    filePath: S.String,
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
).annotate({ identifier: "GetFileInput" }) as any as S.Schema<GetFileInput>;
export interface GetFileOutput {
  commitId: string;
  blobId: string;
  filePath: string;
  fileMode: FileModeTypeEnum;
  fileSize: number;
  fileContent: Uint8Array;
}
export const GetFileOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commitId: S.String,
    blobId: S.String,
    filePath: S.String,
    fileMode: FileModeTypeEnum,
    fileSize: S.Number,
    fileContent: T.Blob,
  }).pipe(ns),
).annotate({ identifier: "GetFileOutput" }) as any as S.Schema<GetFileOutput>;
export interface GetFolderInput {
  repositoryName: string;
  commitSpecifier?: string;
  folderPath: string;
}
export const GetFolderInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    commitSpecifier: S.optional(S.String),
    folderPath: S.String,
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
).annotate({ identifier: "GetFolderInput" }) as any as S.Schema<GetFolderInput>;
export interface Folder {
  treeId?: string;
  absolutePath?: string;
  relativePath?: string;
}
export const Folder = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    treeId: S.optional(S.String),
    absolutePath: S.optional(S.String),
    relativePath: S.optional(S.String),
  }),
).annotate({ identifier: "Folder" }) as any as S.Schema<Folder>;
export type FolderList = Folder[];
export const FolderList = /*@__PURE__*/ S.Array(Folder);
export interface File {
  blobId?: string;
  absolutePath?: string;
  relativePath?: string;
  fileMode?: FileModeTypeEnum;
}
export const File = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    blobId: S.optional(S.String),
    absolutePath: S.optional(S.String),
    relativePath: S.optional(S.String),
    fileMode: S.optional(FileModeTypeEnum),
  }),
).annotate({ identifier: "File" }) as any as S.Schema<File>;
export type FileList = File[];
export const FileList = /*@__PURE__*/ S.Array(File);
export interface SymbolicLink {
  blobId?: string;
  absolutePath?: string;
  relativePath?: string;
  fileMode?: FileModeTypeEnum;
}
export const SymbolicLink = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    blobId: S.optional(S.String),
    absolutePath: S.optional(S.String),
    relativePath: S.optional(S.String),
    fileMode: S.optional(FileModeTypeEnum),
  }),
).annotate({ identifier: "SymbolicLink" }) as any as S.Schema<SymbolicLink>;
export type SymbolicLinkList = SymbolicLink[];
export const SymbolicLinkList = /*@__PURE__*/ S.Array(SymbolicLink);
export interface SubModule {
  commitId?: string;
  absolutePath?: string;
  relativePath?: string;
}
export const SubModule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commitId: S.optional(S.String),
    absolutePath: S.optional(S.String),
    relativePath: S.optional(S.String),
  }),
).annotate({ identifier: "SubModule" }) as any as S.Schema<SubModule>;
export type SubModuleList = SubModule[];
export const SubModuleList = /*@__PURE__*/ S.Array(SubModule);
export interface GetFolderOutput {
  commitId: string;
  folderPath: string;
  treeId?: string;
  subFolders?: Folder[];
  files?: File[];
  symbolicLinks?: SymbolicLink[];
  subModules?: SubModule[];
}
export const GetFolderOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commitId: S.String,
    folderPath: S.String,
    treeId: S.optional(S.String),
    subFolders: S.optional(FolderList),
    files: S.optional(FileList),
    symbolicLinks: S.optional(SymbolicLinkList),
    subModules: S.optional(SubModuleList),
  }).pipe(ns),
).annotate({
  identifier: "GetFolderOutput",
}) as any as S.Schema<GetFolderOutput>;
export interface GetMergeCommitInput {
  repositoryName: string;
  sourceCommitSpecifier: string;
  destinationCommitSpecifier: string;
  conflictDetailLevel?: ConflictDetailLevelTypeEnum;
  conflictResolutionStrategy?: ConflictResolutionStrategyTypeEnum;
}
export const GetMergeCommitInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    sourceCommitSpecifier: S.String,
    destinationCommitSpecifier: S.String,
    conflictDetailLevel: S.optional(ConflictDetailLevelTypeEnum),
    conflictResolutionStrategy: S.optional(ConflictResolutionStrategyTypeEnum),
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
  identifier: "GetMergeCommitInput",
}) as any as S.Schema<GetMergeCommitInput>;
export interface GetMergeCommitOutput {
  sourceCommitId?: string;
  destinationCommitId?: string;
  baseCommitId?: string;
  mergedCommitId?: string;
}
export const GetMergeCommitOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceCommitId: S.optional(S.String),
    destinationCommitId: S.optional(S.String),
    baseCommitId: S.optional(S.String),
    mergedCommitId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetMergeCommitOutput",
}) as any as S.Schema<GetMergeCommitOutput>;
export interface GetMergeConflictsInput {
  repositoryName: string;
  destinationCommitSpecifier: string;
  sourceCommitSpecifier: string;
  mergeOption: MergeOptionTypeEnum;
  conflictDetailLevel?: ConflictDetailLevelTypeEnum;
  maxConflictFiles?: number;
  conflictResolutionStrategy?: ConflictResolutionStrategyTypeEnum;
  nextToken?: string;
}
export const GetMergeConflictsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    destinationCommitSpecifier: S.String,
    sourceCommitSpecifier: S.String,
    mergeOption: MergeOptionTypeEnum,
    conflictDetailLevel: S.optional(ConflictDetailLevelTypeEnum),
    maxConflictFiles: S.optional(S.Number),
    conflictResolutionStrategy: S.optional(ConflictResolutionStrategyTypeEnum),
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
  identifier: "GetMergeConflictsInput",
}) as any as S.Schema<GetMergeConflictsInput>;
export type IsMergeable = boolean;
export type ConflictMetadataList = ConflictMetadata[];
export const ConflictMetadataList = /*@__PURE__*/ S.Array(ConflictMetadata);
export interface GetMergeConflictsOutput {
  mergeable: boolean;
  destinationCommitId: string;
  sourceCommitId: string;
  baseCommitId?: string;
  conflictMetadataList: ConflictMetadata[];
  nextToken?: string;
}
export const GetMergeConflictsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mergeable: S.Boolean,
    destinationCommitId: S.String,
    sourceCommitId: S.String,
    baseCommitId: S.optional(S.String),
    conflictMetadataList: ConflictMetadataList,
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetMergeConflictsOutput",
}) as any as S.Schema<GetMergeConflictsOutput>;
export interface GetMergeOptionsInput {
  repositoryName: string;
  sourceCommitSpecifier: string;
  destinationCommitSpecifier: string;
  conflictDetailLevel?: ConflictDetailLevelTypeEnum;
  conflictResolutionStrategy?: ConflictResolutionStrategyTypeEnum;
}
export const GetMergeOptionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    sourceCommitSpecifier: S.String,
    destinationCommitSpecifier: S.String,
    conflictDetailLevel: S.optional(ConflictDetailLevelTypeEnum),
    conflictResolutionStrategy: S.optional(ConflictResolutionStrategyTypeEnum),
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
  identifier: "GetMergeOptionsInput",
}) as any as S.Schema<GetMergeOptionsInput>;
export type MergeOptions = MergeOptionTypeEnum[];
export const MergeOptions = /*@__PURE__*/ S.Array(MergeOptionTypeEnum);
export interface GetMergeOptionsOutput {
  mergeOptions: MergeOptionTypeEnum[];
  sourceCommitId: string;
  destinationCommitId: string;
  baseCommitId: string;
}
export const GetMergeOptionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    mergeOptions: MergeOptions,
    sourceCommitId: S.String,
    destinationCommitId: S.String,
    baseCommitId: S.String,
  }).pipe(ns),
).annotate({
  identifier: "GetMergeOptionsOutput",
}) as any as S.Schema<GetMergeOptionsOutput>;
export interface GetPullRequestInput {
  pullRequestId: string;
}
export const GetPullRequestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pullRequestId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPullRequestInput",
}) as any as S.Schema<GetPullRequestInput>;
export interface GetPullRequestOutput {
  pullRequest: PullRequest;
}
export const GetPullRequestOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pullRequest: PullRequest }).pipe(ns),
).annotate({
  identifier: "GetPullRequestOutput",
}) as any as S.Schema<GetPullRequestOutput>;
export interface GetPullRequestApprovalStatesInput {
  pullRequestId: string;
  revisionId: string;
}
export const GetPullRequestApprovalStatesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pullRequestId: S.String, revisionId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPullRequestApprovalStatesInput",
}) as any as S.Schema<GetPullRequestApprovalStatesInput>;
export interface Approval {
  userArn?: string;
  approvalState?: ApprovalState;
}
export const Approval = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    userArn: S.optional(S.String),
    approvalState: S.optional(ApprovalState),
  }),
).annotate({ identifier: "Approval" }) as any as S.Schema<Approval>;
export type ApprovalList = Approval[];
export const ApprovalList = /*@__PURE__*/ S.Array(Approval);
export interface GetPullRequestApprovalStatesOutput {
  approvals?: Approval[];
}
export const GetPullRequestApprovalStatesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ approvals: S.optional(ApprovalList) }).pipe(ns),
).annotate({
  identifier: "GetPullRequestApprovalStatesOutput",
}) as any as S.Schema<GetPullRequestApprovalStatesOutput>;
export interface GetPullRequestOverrideStateInput {
  pullRequestId: string;
  revisionId: string;
}
export const GetPullRequestOverrideStateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pullRequestId: S.String, revisionId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPullRequestOverrideStateInput",
}) as any as S.Schema<GetPullRequestOverrideStateInput>;
export interface GetPullRequestOverrideStateOutput {
  overridden?: boolean;
  overrider?: string;
}
export const GetPullRequestOverrideStateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    overridden: S.optional(S.Boolean),
    overrider: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetPullRequestOverrideStateOutput",
}) as any as S.Schema<GetPullRequestOverrideStateOutput>;
export interface GetRepositoryInput {
  repositoryName: string;
}
export const GetRepositoryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repositoryName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRepositoryInput",
}) as any as S.Schema<GetRepositoryInput>;
export interface GetRepositoryOutput {
  repositoryMetadata?: RepositoryMetadata;
}
export const GetRepositoryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repositoryMetadata: S.optional(RepositoryMetadata) }).pipe(ns),
).annotate({
  identifier: "GetRepositoryOutput",
}) as any as S.Schema<GetRepositoryOutput>;
export interface GetRepositoryTriggersInput {
  repositoryName: string;
}
export const GetRepositoryTriggersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repositoryName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRepositoryTriggersInput",
}) as any as S.Schema<GetRepositoryTriggersInput>;
export type RepositoryTriggersConfigurationId = string;
export type RepositoryTriggerName = string;
export type RepositoryTriggerCustomData = string;
export type BranchNameList = string[];
export const BranchNameList = /*@__PURE__*/ S.Array(S.String);
export type RepositoryTriggerEventEnum =
  | "all"
  | "updateReference"
  | "createReference"
  | "deleteReference"
  | (string & {});
export const RepositoryTriggerEventEnum = S.String;

export type RepositoryTriggerEventList = RepositoryTriggerEventEnum[];
export const RepositoryTriggerEventList = /*@__PURE__*/ S.Array(
  RepositoryTriggerEventEnum,
);
export interface RepositoryTrigger {
  name: string;
  destinationArn: string;
  customData?: string;
  branches?: string[];
  events: RepositoryTriggerEventEnum[];
}
export const RepositoryTrigger = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    destinationArn: S.String,
    customData: S.optional(S.String),
    branches: S.optional(BranchNameList),
    events: RepositoryTriggerEventList,
  }),
).annotate({
  identifier: "RepositoryTrigger",
}) as any as S.Schema<RepositoryTrigger>;
export type RepositoryTriggersList = RepositoryTrigger[];
export const RepositoryTriggersList = /*@__PURE__*/ S.Array(RepositoryTrigger);
export interface GetRepositoryTriggersOutput {
  configurationId?: string;
  triggers?: RepositoryTrigger[];
}
export const GetRepositoryTriggersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configurationId: S.optional(S.String),
    triggers: S.optional(RepositoryTriggersList),
  }).pipe(ns),
).annotate({
  identifier: "GetRepositoryTriggersOutput",
}) as any as S.Schema<GetRepositoryTriggersOutput>;
export interface ListApprovalRuleTemplatesInput {
  nextToken?: string;
  maxResults?: number;
}
export const ListApprovalRuleTemplatesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "ListApprovalRuleTemplatesInput",
}) as any as S.Schema<ListApprovalRuleTemplatesInput>;
export type ApprovalRuleTemplateNameList = string[];
export const ApprovalRuleTemplateNameList = /*@__PURE__*/ S.Array(S.String);
export interface ListApprovalRuleTemplatesOutput {
  approvalRuleTemplateNames?: string[];
  nextToken?: string;
}
export const ListApprovalRuleTemplatesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    approvalRuleTemplateNames: S.optional(ApprovalRuleTemplateNameList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListApprovalRuleTemplatesOutput",
}) as any as S.Schema<ListApprovalRuleTemplatesOutput>;
export interface ListAssociatedApprovalRuleTemplatesForRepositoryInput {
  repositoryName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListAssociatedApprovalRuleTemplatesForRepositoryInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      repositoryName: S.String,
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
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
    identifier: "ListAssociatedApprovalRuleTemplatesForRepositoryInput",
  }) as any as S.Schema<ListAssociatedApprovalRuleTemplatesForRepositoryInput>;
export interface ListAssociatedApprovalRuleTemplatesForRepositoryOutput {
  approvalRuleTemplateNames?: string[];
  nextToken?: string;
}
export const ListAssociatedApprovalRuleTemplatesForRepositoryOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      approvalRuleTemplateNames: S.optional(ApprovalRuleTemplateNameList),
      nextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "ListAssociatedApprovalRuleTemplatesForRepositoryOutput",
  }) as any as S.Schema<ListAssociatedApprovalRuleTemplatesForRepositoryOutput>;
export interface ListBranchesInput {
  repositoryName: string;
  nextToken?: string;
}
export const ListBranchesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repositoryName: S.String, nextToken: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBranchesInput",
}) as any as S.Schema<ListBranchesInput>;
export interface ListBranchesOutput {
  branches?: string[];
  nextToken?: string;
}
export const ListBranchesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    branches: S.optional(BranchNameList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListBranchesOutput",
}) as any as S.Schema<ListBranchesOutput>;
export interface ListFileCommitHistoryRequest {
  repositoryName: string;
  commitSpecifier?: string;
  filePath: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListFileCommitHistoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    commitSpecifier: S.optional(S.String),
    filePath: S.String,
    maxResults: S.optional(S.Number),
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
  identifier: "ListFileCommitHistoryRequest",
}) as any as S.Schema<ListFileCommitHistoryRequest>;
export type RevisionChildren = string[];
export const RevisionChildren = /*@__PURE__*/ S.Array(S.String);
export interface FileVersion {
  commit?: Commit;
  blobId?: string;
  path?: string;
  revisionChildren?: string[];
}
export const FileVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commit: S.optional(Commit),
    blobId: S.optional(S.String),
    path: S.optional(S.String),
    revisionChildren: S.optional(RevisionChildren),
  }),
).annotate({ identifier: "FileVersion" }) as any as S.Schema<FileVersion>;
export type RevisionDag = FileVersion[];
export const RevisionDag = /*@__PURE__*/ S.Array(FileVersion);
export interface ListFileCommitHistoryResponse {
  revisionDag: FileVersion[];
  nextToken?: string;
}
export const ListFileCommitHistoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ revisionDag: RevisionDag, nextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ListFileCommitHistoryResponse",
}) as any as S.Schema<ListFileCommitHistoryResponse>;
export interface ListPullRequestsInput {
  repositoryName: string;
  authorArn?: string;
  pullRequestStatus?: PullRequestStatusEnum;
  nextToken?: string;
  maxResults?: number;
}
export const ListPullRequestsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    authorArn: S.optional(S.String),
    pullRequestStatus: S.optional(PullRequestStatusEnum),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
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
  identifier: "ListPullRequestsInput",
}) as any as S.Schema<ListPullRequestsInput>;
export type PullRequestIdList = string[];
export const PullRequestIdList = /*@__PURE__*/ S.Array(S.String);
export interface ListPullRequestsOutput {
  pullRequestIds: string[];
  nextToken?: string;
}
export const ListPullRequestsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pullRequestIds: PullRequestIdList,
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListPullRequestsOutput",
}) as any as S.Schema<ListPullRequestsOutput>;
export type SortByEnum = "repositoryName" | "lastModifiedDate" | (string & {});
export const SortByEnum = S.String;

export type OrderEnum = "ascending" | "descending" | (string & {});
export const OrderEnum = S.String;

export interface ListRepositoriesInput {
  nextToken?: string;
  sortBy?: SortByEnum;
  order?: OrderEnum;
}
export const ListRepositoriesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    sortBy: S.optional(SortByEnum),
    order: S.optional(OrderEnum),
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
  identifier: "ListRepositoriesInput",
}) as any as S.Schema<ListRepositoriesInput>;
export interface RepositoryNameIdPair {
  repositoryName?: string;
  repositoryId?: string;
}
export const RepositoryNameIdPair = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.optional(S.String),
    repositoryId: S.optional(S.String),
  }),
).annotate({
  identifier: "RepositoryNameIdPair",
}) as any as S.Schema<RepositoryNameIdPair>;
export type RepositoryNameIdPairList = RepositoryNameIdPair[];
export const RepositoryNameIdPairList =
  /*@__PURE__*/ S.Array(RepositoryNameIdPair);
export interface ListRepositoriesOutput {
  repositories?: RepositoryNameIdPair[];
  nextToken?: string;
}
export const ListRepositoriesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositories: S.optional(RepositoryNameIdPairList),
    nextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListRepositoriesOutput",
}) as any as S.Schema<ListRepositoriesOutput>;
export interface ListRepositoriesForApprovalRuleTemplateInput {
  approvalRuleTemplateName: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListRepositoriesForApprovalRuleTemplateInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      approvalRuleTemplateName: S.String,
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
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
    identifier: "ListRepositoriesForApprovalRuleTemplateInput",
  }) as any as S.Schema<ListRepositoriesForApprovalRuleTemplateInput>;
export interface ListRepositoriesForApprovalRuleTemplateOutput {
  repositoryNames?: string[];
  nextToken?: string;
}
export const ListRepositoriesForApprovalRuleTemplateOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      repositoryNames: S.optional(RepositoryNameList),
      nextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "ListRepositoriesForApprovalRuleTemplateOutput",
  }) as any as S.Schema<ListRepositoriesForApprovalRuleTemplateOutput>;
export type ResourceArn = string;
export interface ListTagsForResourceInput {
  resourceArn: string;
  nextToken?: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, nextToken: S.optional(S.String) }).pipe(
    T.all(
      ns,
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
  tags?: { [key: string]: string | undefined };
  nextToken?: string;
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagsMap), nextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface MergeBranchesByFastForwardInput {
  repositoryName: string;
  sourceCommitSpecifier: string;
  destinationCommitSpecifier: string;
  targetBranch?: string;
}
export const MergeBranchesByFastForwardInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    sourceCommitSpecifier: S.String,
    destinationCommitSpecifier: S.String,
    targetBranch: S.optional(S.String),
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
  identifier: "MergeBranchesByFastForwardInput",
}) as any as S.Schema<MergeBranchesByFastForwardInput>;
export interface MergeBranchesByFastForwardOutput {
  commitId?: string;
  treeId?: string;
}
export const MergeBranchesByFastForwardOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commitId: S.optional(S.String),
    treeId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "MergeBranchesByFastForwardOutput",
}) as any as S.Schema<MergeBranchesByFastForwardOutput>;
export interface MergeBranchesBySquashInput {
  repositoryName: string;
  sourceCommitSpecifier: string;
  destinationCommitSpecifier: string;
  targetBranch?: string;
  conflictDetailLevel?: ConflictDetailLevelTypeEnum;
  conflictResolutionStrategy?: ConflictResolutionStrategyTypeEnum;
  authorName?: string;
  email?: string;
  commitMessage?: string;
  keepEmptyFolders?: boolean;
  conflictResolution?: ConflictResolution;
}
export const MergeBranchesBySquashInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    sourceCommitSpecifier: S.String,
    destinationCommitSpecifier: S.String,
    targetBranch: S.optional(S.String),
    conflictDetailLevel: S.optional(ConflictDetailLevelTypeEnum),
    conflictResolutionStrategy: S.optional(ConflictResolutionStrategyTypeEnum),
    authorName: S.optional(S.String),
    email: S.optional(S.String),
    commitMessage: S.optional(S.String),
    keepEmptyFolders: S.optional(S.Boolean),
    conflictResolution: S.optional(ConflictResolution),
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
  identifier: "MergeBranchesBySquashInput",
}) as any as S.Schema<MergeBranchesBySquashInput>;
export interface MergeBranchesBySquashOutput {
  commitId?: string;
  treeId?: string;
}
export const MergeBranchesBySquashOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commitId: S.optional(S.String),
    treeId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "MergeBranchesBySquashOutput",
}) as any as S.Schema<MergeBranchesBySquashOutput>;
export interface MergeBranchesByThreeWayInput {
  repositoryName: string;
  sourceCommitSpecifier: string;
  destinationCommitSpecifier: string;
  targetBranch?: string;
  conflictDetailLevel?: ConflictDetailLevelTypeEnum;
  conflictResolutionStrategy?: ConflictResolutionStrategyTypeEnum;
  authorName?: string;
  email?: string;
  commitMessage?: string;
  keepEmptyFolders?: boolean;
  conflictResolution?: ConflictResolution;
}
export const MergeBranchesByThreeWayInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    sourceCommitSpecifier: S.String,
    destinationCommitSpecifier: S.String,
    targetBranch: S.optional(S.String),
    conflictDetailLevel: S.optional(ConflictDetailLevelTypeEnum),
    conflictResolutionStrategy: S.optional(ConflictResolutionStrategyTypeEnum),
    authorName: S.optional(S.String),
    email: S.optional(S.String),
    commitMessage: S.optional(S.String),
    keepEmptyFolders: S.optional(S.Boolean),
    conflictResolution: S.optional(ConflictResolution),
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
  identifier: "MergeBranchesByThreeWayInput",
}) as any as S.Schema<MergeBranchesByThreeWayInput>;
export interface MergeBranchesByThreeWayOutput {
  commitId?: string;
  treeId?: string;
}
export const MergeBranchesByThreeWayOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    commitId: S.optional(S.String),
    treeId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "MergeBranchesByThreeWayOutput",
}) as any as S.Schema<MergeBranchesByThreeWayOutput>;
export interface MergePullRequestByFastForwardInput {
  pullRequestId: string;
  repositoryName: string;
  sourceCommitId?: string;
}
export const MergePullRequestByFastForwardInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pullRequestId: S.String,
    repositoryName: S.String,
    sourceCommitId: S.optional(S.String),
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
  identifier: "MergePullRequestByFastForwardInput",
}) as any as S.Schema<MergePullRequestByFastForwardInput>;
export interface MergePullRequestByFastForwardOutput {
  pullRequest?: PullRequest;
}
export const MergePullRequestByFastForwardOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pullRequest: S.optional(PullRequest) }).pipe(ns),
).annotate({
  identifier: "MergePullRequestByFastForwardOutput",
}) as any as S.Schema<MergePullRequestByFastForwardOutput>;
export interface MergePullRequestBySquashInput {
  pullRequestId: string;
  repositoryName: string;
  sourceCommitId?: string;
  conflictDetailLevel?: ConflictDetailLevelTypeEnum;
  conflictResolutionStrategy?: ConflictResolutionStrategyTypeEnum;
  commitMessage?: string;
  authorName?: string;
  email?: string;
  keepEmptyFolders?: boolean;
  conflictResolution?: ConflictResolution;
}
export const MergePullRequestBySquashInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pullRequestId: S.String,
    repositoryName: S.String,
    sourceCommitId: S.optional(S.String),
    conflictDetailLevel: S.optional(ConflictDetailLevelTypeEnum),
    conflictResolutionStrategy: S.optional(ConflictResolutionStrategyTypeEnum),
    commitMessage: S.optional(S.String),
    authorName: S.optional(S.String),
    email: S.optional(S.String),
    keepEmptyFolders: S.optional(S.Boolean),
    conflictResolution: S.optional(ConflictResolution),
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
  identifier: "MergePullRequestBySquashInput",
}) as any as S.Schema<MergePullRequestBySquashInput>;
export interface MergePullRequestBySquashOutput {
  pullRequest?: PullRequest;
}
export const MergePullRequestBySquashOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pullRequest: S.optional(PullRequest) }).pipe(ns),
).annotate({
  identifier: "MergePullRequestBySquashOutput",
}) as any as S.Schema<MergePullRequestBySquashOutput>;
export interface MergePullRequestByThreeWayInput {
  pullRequestId: string;
  repositoryName: string;
  sourceCommitId?: string;
  conflictDetailLevel?: ConflictDetailLevelTypeEnum;
  conflictResolutionStrategy?: ConflictResolutionStrategyTypeEnum;
  commitMessage?: string;
  authorName?: string;
  email?: string;
  keepEmptyFolders?: boolean;
  conflictResolution?: ConflictResolution;
}
export const MergePullRequestByThreeWayInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pullRequestId: S.String,
    repositoryName: S.String,
    sourceCommitId: S.optional(S.String),
    conflictDetailLevel: S.optional(ConflictDetailLevelTypeEnum),
    conflictResolutionStrategy: S.optional(ConflictResolutionStrategyTypeEnum),
    commitMessage: S.optional(S.String),
    authorName: S.optional(S.String),
    email: S.optional(S.String),
    keepEmptyFolders: S.optional(S.Boolean),
    conflictResolution: S.optional(ConflictResolution),
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
  identifier: "MergePullRequestByThreeWayInput",
}) as any as S.Schema<MergePullRequestByThreeWayInput>;
export interface MergePullRequestByThreeWayOutput {
  pullRequest?: PullRequest;
}
export const MergePullRequestByThreeWayOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pullRequest: S.optional(PullRequest) }).pipe(ns),
).annotate({
  identifier: "MergePullRequestByThreeWayOutput",
}) as any as S.Schema<MergePullRequestByThreeWayOutput>;
export interface OverridePullRequestApprovalRulesInput {
  pullRequestId: string;
  revisionId: string;
  overrideStatus: OverrideStatus;
}
export const OverridePullRequestApprovalRulesInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      pullRequestId: S.String,
      revisionId: S.String,
      overrideStatus: OverrideStatus,
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
  identifier: "OverridePullRequestApprovalRulesInput",
}) as any as S.Schema<OverridePullRequestApprovalRulesInput>;
export interface OverridePullRequestApprovalRulesResponse {}
export const OverridePullRequestApprovalRulesResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "OverridePullRequestApprovalRulesResponse",
}) as any as S.Schema<OverridePullRequestApprovalRulesResponse>;
export interface PostCommentForComparedCommitInput {
  repositoryName: string;
  beforeCommitId?: string;
  afterCommitId: string;
  location?: Location;
  content: string;
  clientRequestToken?: string;
}
export const PostCommentForComparedCommitInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    beforeCommitId: S.optional(S.String),
    afterCommitId: S.String,
    location: S.optional(Location),
    content: S.String,
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
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
  identifier: "PostCommentForComparedCommitInput",
}) as any as S.Schema<PostCommentForComparedCommitInput>;
export interface PostCommentForComparedCommitOutput {
  repositoryName?: string;
  beforeCommitId?: string;
  afterCommitId?: string;
  beforeBlobId?: string;
  afterBlobId?: string;
  location?: Location;
  comment?: Comment;
}
export const PostCommentForComparedCommitOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.optional(S.String),
    beforeCommitId: S.optional(S.String),
    afterCommitId: S.optional(S.String),
    beforeBlobId: S.optional(S.String),
    afterBlobId: S.optional(S.String),
    location: S.optional(Location),
    comment: S.optional(Comment),
  }).pipe(ns),
).annotate({
  identifier: "PostCommentForComparedCommitOutput",
}) as any as S.Schema<PostCommentForComparedCommitOutput>;
export interface PostCommentForPullRequestInput {
  pullRequestId: string;
  repositoryName: string;
  beforeCommitId: string;
  afterCommitId: string;
  location?: Location;
  content: string;
  clientRequestToken?: string;
}
export const PostCommentForPullRequestInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pullRequestId: S.String,
    repositoryName: S.String,
    beforeCommitId: S.String,
    afterCommitId: S.String,
    location: S.optional(Location),
    content: S.String,
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
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
  identifier: "PostCommentForPullRequestInput",
}) as any as S.Schema<PostCommentForPullRequestInput>;
export interface PostCommentForPullRequestOutput {
  repositoryName?: string;
  pullRequestId?: string;
  beforeCommitId?: string;
  afterCommitId?: string;
  beforeBlobId?: string;
  afterBlobId?: string;
  location?: Location;
  comment?: Comment;
}
export const PostCommentForPullRequestOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.optional(S.String),
    pullRequestId: S.optional(S.String),
    beforeCommitId: S.optional(S.String),
    afterCommitId: S.optional(S.String),
    beforeBlobId: S.optional(S.String),
    afterBlobId: S.optional(S.String),
    location: S.optional(Location),
    comment: S.optional(Comment),
  }).pipe(ns),
).annotate({
  identifier: "PostCommentForPullRequestOutput",
}) as any as S.Schema<PostCommentForPullRequestOutput>;
export interface PostCommentReplyInput {
  inReplyTo: string;
  clientRequestToken?: string;
  content: string;
}
export const PostCommentReplyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    inReplyTo: S.String,
    clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    content: S.String,
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
  identifier: "PostCommentReplyInput",
}) as any as S.Schema<PostCommentReplyInput>;
export interface PostCommentReplyOutput {
  comment?: Comment;
}
export const PostCommentReplyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ comment: S.optional(Comment) }).pipe(ns),
).annotate({
  identifier: "PostCommentReplyOutput",
}) as any as S.Schema<PostCommentReplyOutput>;
export interface PutCommentReactionInput {
  commentId: string;
  reactionValue: string;
}
export const PutCommentReactionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ commentId: S.String, reactionValue: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutCommentReactionInput",
}) as any as S.Schema<PutCommentReactionInput>;
export interface PutCommentReactionResponse {}
export const PutCommentReactionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutCommentReactionResponse",
}) as any as S.Schema<PutCommentReactionResponse>;
export interface PutFileInput {
  repositoryName: string;
  branchName: string;
  fileContent: Uint8Array;
  filePath: string;
  fileMode?: FileModeTypeEnum;
  parentCommitId?: string;
  commitMessage?: string;
  name?: string;
  email?: string;
}
export const PutFileInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    branchName: S.String,
    fileContent: T.Blob,
    filePath: S.String,
    fileMode: S.optional(FileModeTypeEnum),
    parentCommitId: S.optional(S.String),
    commitMessage: S.optional(S.String),
    name: S.optional(S.String),
    email: S.optional(S.String),
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
).annotate({ identifier: "PutFileInput" }) as any as S.Schema<PutFileInput>;
export interface PutFileOutput {
  commitId: string;
  blobId: string;
  treeId: string;
}
export const PutFileOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ commitId: S.String, blobId: S.String, treeId: S.String }).pipe(ns),
).annotate({ identifier: "PutFileOutput" }) as any as S.Schema<PutFileOutput>;
export interface PutRepositoryTriggersInput {
  repositoryName: string;
  triggers: RepositoryTrigger[];
}
export const PutRepositoryTriggersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repositoryName: S.String, triggers: RepositoryTriggersList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutRepositoryTriggersInput",
}) as any as S.Schema<PutRepositoryTriggersInput>;
export interface PutRepositoryTriggersOutput {
  configurationId?: string;
}
export const PutRepositoryTriggersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ configurationId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "PutRepositoryTriggersOutput",
}) as any as S.Schema<PutRepositoryTriggersOutput>;
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tags: TagsMap }).pipe(
    T.all(
      ns,
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
export interface TagResourceResponse {}
export const TagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export interface TestRepositoryTriggersInput {
  repositoryName: string;
  triggers: RepositoryTrigger[];
}
export const TestRepositoryTriggersInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repositoryName: S.String, triggers: RepositoryTriggersList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TestRepositoryTriggersInput",
}) as any as S.Schema<TestRepositoryTriggersInput>;
export type RepositoryTriggerNameList = string[];
export const RepositoryTriggerNameList = /*@__PURE__*/ S.Array(S.String);
export type RepositoryTriggerExecutionFailureMessage = string;
export interface RepositoryTriggerExecutionFailure {
  trigger?: string;
  failureMessage?: string;
}
export const RepositoryTriggerExecutionFailure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    trigger: S.optional(S.String),
    failureMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "RepositoryTriggerExecutionFailure",
}) as any as S.Schema<RepositoryTriggerExecutionFailure>;
export type RepositoryTriggerExecutionFailureList =
  RepositoryTriggerExecutionFailure[];
export const RepositoryTriggerExecutionFailureList = /*@__PURE__*/ S.Array(
  RepositoryTriggerExecutionFailure,
);
export interface TestRepositoryTriggersOutput {
  successfulExecutions?: string[];
  failedExecutions?: RepositoryTriggerExecutionFailure[];
}
export const TestRepositoryTriggersOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    successfulExecutions: S.optional(RepositoryTriggerNameList),
    failedExecutions: S.optional(RepositoryTriggerExecutionFailureList),
  }).pipe(ns),
).annotate({
  identifier: "TestRepositoryTriggersOutput",
}) as any as S.Schema<TestRepositoryTriggersOutput>;
export type TagKeysList = string[];
export const TagKeysList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String, tagKeys: TagKeysList }).pipe(
    T.all(
      ns,
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
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateApprovalRuleTemplateContentInput {
  approvalRuleTemplateName: string;
  newRuleContent: string;
  existingRuleContentSha256?: string;
}
export const UpdateApprovalRuleTemplateContentInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      approvalRuleTemplateName: S.String,
      newRuleContent: S.String,
      existingRuleContentSha256: S.optional(S.String),
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
  identifier: "UpdateApprovalRuleTemplateContentInput",
}) as any as S.Schema<UpdateApprovalRuleTemplateContentInput>;
export interface UpdateApprovalRuleTemplateContentOutput {
  approvalRuleTemplate: ApprovalRuleTemplate;
}
export const UpdateApprovalRuleTemplateContentOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ approvalRuleTemplate: ApprovalRuleTemplate }).pipe(ns),
).annotate({
  identifier: "UpdateApprovalRuleTemplateContentOutput",
}) as any as S.Schema<UpdateApprovalRuleTemplateContentOutput>;
export interface UpdateApprovalRuleTemplateDescriptionInput {
  approvalRuleTemplateName: string;
  approvalRuleTemplateDescription: string;
}
export const UpdateApprovalRuleTemplateDescriptionInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      approvalRuleTemplateName: S.String,
      approvalRuleTemplateDescription: S.String,
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
    identifier: "UpdateApprovalRuleTemplateDescriptionInput",
  }) as any as S.Schema<UpdateApprovalRuleTemplateDescriptionInput>;
export interface UpdateApprovalRuleTemplateDescriptionOutput {
  approvalRuleTemplate: ApprovalRuleTemplate;
}
export const UpdateApprovalRuleTemplateDescriptionOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ approvalRuleTemplate: ApprovalRuleTemplate }).pipe(ns),
  ).annotate({
    identifier: "UpdateApprovalRuleTemplateDescriptionOutput",
  }) as any as S.Schema<UpdateApprovalRuleTemplateDescriptionOutput>;
export interface UpdateApprovalRuleTemplateNameInput {
  oldApprovalRuleTemplateName: string;
  newApprovalRuleTemplateName: string;
}
export const UpdateApprovalRuleTemplateNameInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    oldApprovalRuleTemplateName: S.String,
    newApprovalRuleTemplateName: S.String,
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
  identifier: "UpdateApprovalRuleTemplateNameInput",
}) as any as S.Schema<UpdateApprovalRuleTemplateNameInput>;
export interface UpdateApprovalRuleTemplateNameOutput {
  approvalRuleTemplate: ApprovalRuleTemplate;
}
export const UpdateApprovalRuleTemplateNameOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({ approvalRuleTemplate: ApprovalRuleTemplate }).pipe(ns),
).annotate({
  identifier: "UpdateApprovalRuleTemplateNameOutput",
}) as any as S.Schema<UpdateApprovalRuleTemplateNameOutput>;
export interface UpdateCommentInput {
  commentId: string;
  content: string;
}
export const UpdateCommentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ commentId: S.String, content: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCommentInput",
}) as any as S.Schema<UpdateCommentInput>;
export interface UpdateCommentOutput {
  comment?: Comment;
}
export const UpdateCommentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ comment: S.optional(Comment) }).pipe(ns),
).annotate({
  identifier: "UpdateCommentOutput",
}) as any as S.Schema<UpdateCommentOutput>;
export interface UpdateDefaultBranchInput {
  repositoryName: string;
  defaultBranchName: string;
}
export const UpdateDefaultBranchInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repositoryName: S.String, defaultBranchName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDefaultBranchInput",
}) as any as S.Schema<UpdateDefaultBranchInput>;
export interface UpdateDefaultBranchResponse {}
export const UpdateDefaultBranchResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateDefaultBranchResponse",
}) as any as S.Schema<UpdateDefaultBranchResponse>;
export interface UpdatePullRequestApprovalRuleContentInput {
  pullRequestId: string;
  approvalRuleName: string;
  existingRuleContentSha256?: string;
  newRuleContent: string;
}
export const UpdatePullRequestApprovalRuleContentInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      pullRequestId: S.String,
      approvalRuleName: S.String,
      existingRuleContentSha256: S.optional(S.String),
      newRuleContent: S.String,
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
    identifier: "UpdatePullRequestApprovalRuleContentInput",
  }) as any as S.Schema<UpdatePullRequestApprovalRuleContentInput>;
export interface UpdatePullRequestApprovalRuleContentOutput {
  approvalRule: ApprovalRule;
}
export const UpdatePullRequestApprovalRuleContentOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ approvalRule: ApprovalRule }).pipe(ns),
  ).annotate({
    identifier: "UpdatePullRequestApprovalRuleContentOutput",
  }) as any as S.Schema<UpdatePullRequestApprovalRuleContentOutput>;
export interface UpdatePullRequestApprovalStateInput {
  pullRequestId: string;
  revisionId: string;
  approvalState: ApprovalState;
}
export const UpdatePullRequestApprovalStateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pullRequestId: S.String,
    revisionId: S.String,
    approvalState: ApprovalState,
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
  identifier: "UpdatePullRequestApprovalStateInput",
}) as any as S.Schema<UpdatePullRequestApprovalStateInput>;
export interface UpdatePullRequestApprovalStateResponse {}
export const UpdatePullRequestApprovalStateResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdatePullRequestApprovalStateResponse",
}) as any as S.Schema<UpdatePullRequestApprovalStateResponse>;
export interface UpdatePullRequestDescriptionInput {
  pullRequestId: string;
  description: string;
}
export const UpdatePullRequestDescriptionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pullRequestId: S.String, description: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePullRequestDescriptionInput",
}) as any as S.Schema<UpdatePullRequestDescriptionInput>;
export interface UpdatePullRequestDescriptionOutput {
  pullRequest: PullRequest;
}
export const UpdatePullRequestDescriptionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pullRequest: PullRequest }).pipe(ns),
).annotate({
  identifier: "UpdatePullRequestDescriptionOutput",
}) as any as S.Schema<UpdatePullRequestDescriptionOutput>;
export interface UpdatePullRequestStatusInput {
  pullRequestId: string;
  pullRequestStatus: PullRequestStatusEnum;
}
export const UpdatePullRequestStatusInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    pullRequestId: S.String,
    pullRequestStatus: PullRequestStatusEnum,
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
  identifier: "UpdatePullRequestStatusInput",
}) as any as S.Schema<UpdatePullRequestStatusInput>;
export interface UpdatePullRequestStatusOutput {
  pullRequest: PullRequest;
}
export const UpdatePullRequestStatusOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pullRequest: PullRequest }).pipe(ns),
).annotate({
  identifier: "UpdatePullRequestStatusOutput",
}) as any as S.Schema<UpdatePullRequestStatusOutput>;
export interface UpdatePullRequestTitleInput {
  pullRequestId: string;
  title: string;
}
export const UpdatePullRequestTitleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pullRequestId: S.String, title: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePullRequestTitleInput",
}) as any as S.Schema<UpdatePullRequestTitleInput>;
export interface UpdatePullRequestTitleOutput {
  pullRequest: PullRequest;
}
export const UpdatePullRequestTitleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pullRequest: PullRequest }).pipe(ns),
).annotate({
  identifier: "UpdatePullRequestTitleOutput",
}) as any as S.Schema<UpdatePullRequestTitleOutput>;
export interface UpdateRepositoryDescriptionInput {
  repositoryName: string;
  repositoryDescription?: string;
}
export const UpdateRepositoryDescriptionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryName: S.String,
    repositoryDescription: S.optional(S.String),
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
  identifier: "UpdateRepositoryDescriptionInput",
}) as any as S.Schema<UpdateRepositoryDescriptionInput>;
export interface UpdateRepositoryDescriptionResponse {}
export const UpdateRepositoryDescriptionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateRepositoryDescriptionResponse",
}) as any as S.Schema<UpdateRepositoryDescriptionResponse>;
export interface UpdateRepositoryEncryptionKeyInput {
  repositoryName: string;
  kmsKeyId: string;
}
export const UpdateRepositoryEncryptionKeyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ repositoryName: S.String, kmsKeyId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRepositoryEncryptionKeyInput",
}) as any as S.Schema<UpdateRepositoryEncryptionKeyInput>;
export interface UpdateRepositoryEncryptionKeyOutput {
  repositoryId?: string;
  kmsKeyId?: string;
  originalKmsKeyId?: string;
}
export const UpdateRepositoryEncryptionKeyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    repositoryId: S.optional(S.String),
    kmsKeyId: S.optional(S.String),
    originalKmsKeyId: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "UpdateRepositoryEncryptionKeyOutput",
}) as any as S.Schema<UpdateRepositoryEncryptionKeyOutput>;
export interface UpdateRepositoryNameInput {
  oldName: string;
  newName: string;
}
export const UpdateRepositoryNameInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ oldName: S.String, newName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateRepositoryNameInput",
}) as any as S.Schema<UpdateRepositoryNameInput>;
export interface UpdateRepositoryNameResponse {}
export const UpdateRepositoryNameResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateRepositoryNameResponse",
}) as any as S.Schema<UpdateRepositoryNameResponse>;
export type AssociateApprovalRuleTemplateWithRepositoryError =
  | ApprovalRuleTemplateDoesNotExistException
  | ApprovalRuleTemplateNameRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidApprovalRuleTemplateNameException
  | InvalidRepositoryNameException
  | MaximumRuleTemplatesAssociatedWithRepositoryException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Creates an association between an approval rule template and a specified repository.
 * Then, the next time a pull request is created in the repository where the destination
 * reference (if specified) matches the destination reference (branch) for the pull
 * request, an approval rule that matches the template conditions is automatically created
 * for that pull request. If no destination references are specified in the template, an
 * approval rule that matches the template contents is created for all pull requests in
 * that repository.
 */
export const associateApprovalRuleTemplateWithRepository: API.OperationMethod<
  AssociateApprovalRuleTemplateWithRepositoryInput,
  AssociateApprovalRuleTemplateWithRepositoryResponse,
  AssociateApprovalRuleTemplateWithRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateApprovalRuleTemplateWithRepositoryInput,
  output: AssociateApprovalRuleTemplateWithRepositoryResponse,
  errors: [
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidApprovalRuleTemplateNameException,
    InvalidRepositoryNameException,
    MaximumRuleTemplatesAssociatedWithRepositoryException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateApprovalRuleTemplateWithRepository",
}));

export type BatchAssociateApprovalRuleTemplateWithRepositoriesError =
  | ApprovalRuleTemplateDoesNotExistException
  | ApprovalRuleTemplateNameRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidApprovalRuleTemplateNameException
  | MaximumRepositoryNamesExceededException
  | RepositoryNamesRequiredException
  | CommonErrors;
/**
 * Creates an association between an approval rule template and one or more specified repositories.
 */
export const batchAssociateApprovalRuleTemplateWithRepositories: API.OperationMethod<
  BatchAssociateApprovalRuleTemplateWithRepositoriesInput,
  BatchAssociateApprovalRuleTemplateWithRepositoriesOutput,
  BatchAssociateApprovalRuleTemplateWithRepositoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchAssociateApprovalRuleTemplateWithRepositoriesInput,
  output: BatchAssociateApprovalRuleTemplateWithRepositoriesOutput,
  errors: [
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidApprovalRuleTemplateNameException,
    MaximumRepositoryNamesExceededException,
    RepositoryNamesRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAssociateApprovalRuleTemplateWithRepositories",
}));

export type BatchDescribeMergeConflictsError =
  | CommitDoesNotExistException
  | CommitRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommitException
  | InvalidConflictDetailLevelException
  | InvalidConflictResolutionStrategyException
  | InvalidContinuationTokenException
  | InvalidMaxConflictFilesException
  | InvalidMaxMergeHunksException
  | InvalidMergeOptionException
  | InvalidRepositoryNameException
  | MaximumFileContentToLoadExceededException
  | MaximumItemsToCompareExceededException
  | MergeOptionRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | TipsDivergenceExceededException
  | CommonErrors;
/**
 * Returns information about one or more merge conflicts in the attempted merge of two commit specifiers using the squash or three-way merge strategy.
 */
export const batchDescribeMergeConflicts: API.OperationMethod<
  BatchDescribeMergeConflictsInput,
  BatchDescribeMergeConflictsOutput,
  BatchDescribeMergeConflictsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDescribeMergeConflictsInput,
  output: BatchDescribeMergeConflictsOutput,
  errors: [
    CommitDoesNotExistException,
    CommitRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidCommitException,
    InvalidConflictDetailLevelException,
    InvalidConflictResolutionStrategyException,
    InvalidContinuationTokenException,
    InvalidMaxConflictFilesException,
    InvalidMaxMergeHunksException,
    InvalidMergeOptionException,
    InvalidRepositoryNameException,
    MaximumFileContentToLoadExceededException,
    MaximumItemsToCompareExceededException,
    MergeOptionRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    TipsDivergenceExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDescribeMergeConflicts",
}));

export type BatchDisassociateApprovalRuleTemplateFromRepositoriesError =
  | ApprovalRuleTemplateDoesNotExistException
  | ApprovalRuleTemplateNameRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidApprovalRuleTemplateNameException
  | MaximumRepositoryNamesExceededException
  | RepositoryNamesRequiredException
  | CommonErrors;
/**
 * Removes the association between an approval rule template and one or more specified repositories.
 */
export const batchDisassociateApprovalRuleTemplateFromRepositories: API.OperationMethod<
  BatchDisassociateApprovalRuleTemplateFromRepositoriesInput,
  BatchDisassociateApprovalRuleTemplateFromRepositoriesOutput,
  BatchDisassociateApprovalRuleTemplateFromRepositoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDisassociateApprovalRuleTemplateFromRepositoriesInput,
  output: BatchDisassociateApprovalRuleTemplateFromRepositoriesOutput,
  errors: [
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidApprovalRuleTemplateNameException,
    MaximumRepositoryNamesExceededException,
    RepositoryNamesRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDisassociateApprovalRuleTemplateFromRepositories",
}));

export type BatchGetCommitsError =
  | CommitIdsLimitExceededException
  | CommitIdsListRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Returns information about the contents of one or more commits in a repository.
 */
export const batchGetCommits: API.OperationMethod<
  BatchGetCommitsInput,
  BatchGetCommitsOutput,
  BatchGetCommitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetCommitsInput,
  output: BatchGetCommitsOutput,
  errors: [
    CommitIdsLimitExceededException,
    CommitIdsListRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCommits",
}));

export type BatchGetRepositoriesError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryNameException
  | MaximumRepositoryNamesExceededException
  | RepositoryNamesRequiredException
  | CommonErrors;
/**
 * Returns information about one or more repositories.
 *
 * The description field for a repository accepts all HTML characters and all valid
 * Unicode characters. Applications that do not HTML-encode the description and display
 * it in a webpage can expose users to potentially malicious code. Make sure that you
 * HTML-encode the description field in any application that uses this API to display
 * the repository description on a webpage.
 */
export const batchGetRepositories: API.OperationMethod<
  BatchGetRepositoriesInput,
  BatchGetRepositoriesOutput,
  BatchGetRepositoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetRepositoriesInput,
  output: BatchGetRepositoriesOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidRepositoryNameException,
    MaximumRepositoryNamesExceededException,
    RepositoryNamesRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetRepositories",
}));

export type CreateApprovalRuleTemplateError =
  | ApprovalRuleTemplateContentRequiredException
  | ApprovalRuleTemplateNameAlreadyExistsException
  | ApprovalRuleTemplateNameRequiredException
  | InvalidApprovalRuleTemplateContentException
  | InvalidApprovalRuleTemplateDescriptionException
  | InvalidApprovalRuleTemplateNameException
  | NumberOfRuleTemplatesExceededException
  | CommonErrors;
/**
 * Creates a template for approval rules that can then be associated with one or more
 * repositories in your Amazon Web Services account. When you associate a template with a repository,
 * CodeCommit creates an approval rule that matches the conditions of the template for all
 * pull requests that meet the conditions of the template. For more information, see
 * AssociateApprovalRuleTemplateWithRepository.
 */
export const createApprovalRuleTemplate: API.OperationMethod<
  CreateApprovalRuleTemplateInput,
  CreateApprovalRuleTemplateOutput,
  CreateApprovalRuleTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateApprovalRuleTemplateInput,
  output: CreateApprovalRuleTemplateOutput,
  errors: [
    ApprovalRuleTemplateContentRequiredException,
    ApprovalRuleTemplateNameAlreadyExistsException,
    ApprovalRuleTemplateNameRequiredException,
    InvalidApprovalRuleTemplateContentException,
    InvalidApprovalRuleTemplateDescriptionException,
    InvalidApprovalRuleTemplateNameException,
    NumberOfRuleTemplatesExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApprovalRuleTemplate",
}));

export type CreateBranchError =
  | BranchNameExistsException
  | BranchNameRequiredException
  | CommitDoesNotExistException
  | CommitIdRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidBranchNameException
  | InvalidCommitIdException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Creates a branch in a repository and points the branch to a commit.
 *
 * Calling the create branch operation does not set a repository's default branch. To do this, call the update default branch operation.
 */
export const createBranch: API.OperationMethod<
  CreateBranchInput,
  CreateBranchResponse,
  CreateBranchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBranchInput,
  output: CreateBranchResponse,
  errors: [
    BranchNameExistsException,
    BranchNameRequiredException,
    CommitDoesNotExistException,
    CommitIdRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidBranchNameException,
    InvalidCommitIdException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBranch",
}));

export type CreateCommitError =
  | BranchDoesNotExistException
  | BranchNameIsTagNameException
  | BranchNameRequiredException
  | CommitMessageLengthExceededException
  | DirectoryNameConflictsWithFileNameException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileContentAndSourceFileSpecifiedException
  | FileContentSizeLimitExceededException
  | FileDoesNotExistException
  | FileEntryRequiredException
  | FileModeRequiredException
  | FileNameConflictsWithDirectoryNameException
  | FilePathConflictsWithSubmodulePathException
  | FolderContentSizeLimitExceededException
  | InvalidBranchNameException
  | InvalidDeletionParameterException
  | InvalidEmailException
  | InvalidFileModeException
  | InvalidParentCommitIdException
  | InvalidPathException
  | InvalidRepositoryNameException
  | MaximumFileEntriesExceededException
  | NameLengthExceededException
  | NoChangeException
  | ParentCommitDoesNotExistException
  | ParentCommitIdOutdatedException
  | ParentCommitIdRequiredException
  | PathRequiredException
  | PutFileEntryConflictException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | RestrictedSourceFileException
  | SamePathRequestException
  | SourceFileOrContentRequiredException
  | CommonErrors;
/**
 * Creates a commit for a repository on the tip of a specified branch.
 */
export const createCommit: API.OperationMethod<
  CreateCommitInput,
  CreateCommitOutput,
  CreateCommitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCommitInput,
  output: CreateCommitOutput,
  errors: [
    BranchDoesNotExistException,
    BranchNameIsTagNameException,
    BranchNameRequiredException,
    CommitMessageLengthExceededException,
    DirectoryNameConflictsWithFileNameException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileContentAndSourceFileSpecifiedException,
    FileContentSizeLimitExceededException,
    FileDoesNotExistException,
    FileEntryRequiredException,
    FileModeRequiredException,
    FileNameConflictsWithDirectoryNameException,
    FilePathConflictsWithSubmodulePathException,
    FolderContentSizeLimitExceededException,
    InvalidBranchNameException,
    InvalidDeletionParameterException,
    InvalidEmailException,
    InvalidFileModeException,
    InvalidParentCommitIdException,
    InvalidPathException,
    InvalidRepositoryNameException,
    MaximumFileEntriesExceededException,
    NameLengthExceededException,
    NoChangeException,
    ParentCommitDoesNotExistException,
    ParentCommitIdOutdatedException,
    ParentCommitIdRequiredException,
    PathRequiredException,
    PutFileEntryConflictException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    RestrictedSourceFileException,
    SamePathRequestException,
    SourceFileOrContentRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCommit",
}));

export type CreatePullRequestError =
  | ClientRequestTokenRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | IdempotencyParameterMismatchException
  | InvalidClientRequestTokenException
  | InvalidDescriptionException
  | InvalidReferenceNameException
  | InvalidRepositoryNameException
  | InvalidTargetException
  | InvalidTargetsException
  | InvalidTitleException
  | MaximumOpenPullRequestsExceededException
  | MultipleRepositoriesInPullRequestException
  | ReferenceDoesNotExistException
  | ReferenceNameRequiredException
  | ReferenceTypeNotSupportedException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | SourceAndDestinationAreSameException
  | TargetRequiredException
  | TargetsRequiredException
  | TitleRequiredException
  | CommonErrors;
/**
 * Creates a pull request in the specified repository.
 */
export const createPullRequest: API.OperationMethod<
  CreatePullRequestInput,
  CreatePullRequestOutput,
  CreatePullRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePullRequestInput,
  output: CreatePullRequestOutput,
  errors: [
    ClientRequestTokenRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    IdempotencyParameterMismatchException,
    InvalidClientRequestTokenException,
    InvalidDescriptionException,
    InvalidReferenceNameException,
    InvalidRepositoryNameException,
    InvalidTargetException,
    InvalidTargetsException,
    InvalidTitleException,
    MaximumOpenPullRequestsExceededException,
    MultipleRepositoriesInPullRequestException,
    ReferenceDoesNotExistException,
    ReferenceNameRequiredException,
    ReferenceTypeNotSupportedException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    SourceAndDestinationAreSameException,
    TargetRequiredException,
    TargetsRequiredException,
    TitleRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePullRequest",
}));

export type CreatePullRequestApprovalRuleError =
  | ApprovalRuleContentRequiredException
  | ApprovalRuleNameAlreadyExistsException
  | ApprovalRuleNameRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidApprovalRuleContentException
  | InvalidApprovalRuleNameException
  | InvalidPullRequestIdException
  | NumberOfRulesExceededException
  | PullRequestAlreadyClosedException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | CommonErrors;
/**
 * Creates an approval rule for a pull request.
 */
export const createPullRequestApprovalRule: API.OperationMethod<
  CreatePullRequestApprovalRuleInput,
  CreatePullRequestApprovalRuleOutput,
  CreatePullRequestApprovalRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePullRequestApprovalRuleInput,
  output: CreatePullRequestApprovalRuleOutput,
  errors: [
    ApprovalRuleContentRequiredException,
    ApprovalRuleNameAlreadyExistsException,
    ApprovalRuleNameRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidApprovalRuleContentException,
    InvalidApprovalRuleNameException,
    InvalidPullRequestIdException,
    NumberOfRulesExceededException,
    PullRequestAlreadyClosedException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePullRequestApprovalRule",
}));

export type CreateRepositoryError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyInvalidIdException
  | EncryptionKeyInvalidUsageException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryDescriptionException
  | InvalidRepositoryNameException
  | InvalidSystemTagUsageException
  | InvalidTagsMapException
  | OperationNotAllowedException
  | RepositoryLimitExceededException
  | RepositoryNameExistsException
  | RepositoryNameRequiredException
  | TagPolicyException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a new, empty repository.
 */
export const createRepository: API.OperationMethod<
  CreateRepositoryInput,
  CreateRepositoryOutput,
  CreateRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRepositoryInput,
  output: CreateRepositoryOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyInvalidIdException,
    EncryptionKeyInvalidUsageException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidRepositoryDescriptionException,
    InvalidRepositoryNameException,
    InvalidSystemTagUsageException,
    InvalidTagsMapException,
    OperationNotAllowedException,
    RepositoryLimitExceededException,
    RepositoryNameExistsException,
    RepositoryNameRequiredException,
    TagPolicyException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRepository",
}));

export type CreateUnreferencedMergeCommitError =
  | CommitDoesNotExistException
  | CommitMessageLengthExceededException
  | CommitRequiredException
  | ConcurrentReferenceUpdateException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileContentSizeLimitExceededException
  | FileModeRequiredException
  | FolderContentSizeLimitExceededException
  | InvalidCommitException
  | InvalidConflictDetailLevelException
  | InvalidConflictResolutionException
  | InvalidConflictResolutionStrategyException
  | InvalidEmailException
  | InvalidFileModeException
  | InvalidMergeOptionException
  | InvalidPathException
  | InvalidReplacementContentException
  | InvalidReplacementTypeException
  | InvalidRepositoryNameException
  | ManualMergeRequiredException
  | MaximumConflictResolutionEntriesExceededException
  | MaximumFileContentToLoadExceededException
  | MaximumItemsToCompareExceededException
  | MergeOptionRequiredException
  | MultipleConflictResolutionEntriesException
  | NameLengthExceededException
  | PathRequiredException
  | ReplacementContentRequiredException
  | ReplacementTypeRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | TipsDivergenceExceededException
  | CommonErrors;
/**
 * Creates an unreferenced commit that represents the result of merging two branches
 * using a specified merge strategy. This can help you determine the outcome of a potential
 * merge. This API cannot be used with the fast-forward merge strategy because that
 * strategy does not create a merge commit.
 *
 * This unreferenced merge commit
 * can only be accessed using the GetCommit API or through git commands such as git fetch. To retrieve this commit, you must specify its commit ID or otherwise reference it.
 */
export const createUnreferencedMergeCommit: API.OperationMethod<
  CreateUnreferencedMergeCommitInput,
  CreateUnreferencedMergeCommitOutput,
  CreateUnreferencedMergeCommitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUnreferencedMergeCommitInput,
  output: CreateUnreferencedMergeCommitOutput,
  errors: [
    CommitDoesNotExistException,
    CommitMessageLengthExceededException,
    CommitRequiredException,
    ConcurrentReferenceUpdateException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileContentSizeLimitExceededException,
    FileModeRequiredException,
    FolderContentSizeLimitExceededException,
    InvalidCommitException,
    InvalidConflictDetailLevelException,
    InvalidConflictResolutionException,
    InvalidConflictResolutionStrategyException,
    InvalidEmailException,
    InvalidFileModeException,
    InvalidMergeOptionException,
    InvalidPathException,
    InvalidReplacementContentException,
    InvalidReplacementTypeException,
    InvalidRepositoryNameException,
    ManualMergeRequiredException,
    MaximumConflictResolutionEntriesExceededException,
    MaximumFileContentToLoadExceededException,
    MaximumItemsToCompareExceededException,
    MergeOptionRequiredException,
    MultipleConflictResolutionEntriesException,
    NameLengthExceededException,
    PathRequiredException,
    ReplacementContentRequiredException,
    ReplacementTypeRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    TipsDivergenceExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUnreferencedMergeCommit",
}));

export type DeleteApprovalRuleTemplateError =
  | ApprovalRuleTemplateInUseException
  | ApprovalRuleTemplateNameRequiredException
  | InvalidApprovalRuleTemplateNameException
  | CommonErrors;
/**
 * Deletes a specified approval rule template. Deleting a template does not remove approval rules on pull requests already created with the template.
 */
export const deleteApprovalRuleTemplate: API.OperationMethod<
  DeleteApprovalRuleTemplateInput,
  DeleteApprovalRuleTemplateOutput,
  DeleteApprovalRuleTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApprovalRuleTemplateInput,
  output: DeleteApprovalRuleTemplateOutput,
  errors: [
    ApprovalRuleTemplateInUseException,
    ApprovalRuleTemplateNameRequiredException,
    InvalidApprovalRuleTemplateNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApprovalRuleTemplate",
}));

export type DeleteBranchError =
  | BranchNameRequiredException
  | DefaultBranchCannotBeDeletedException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidBranchNameException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Deletes a branch from a repository, unless that branch is the default branch for the repository.
 */
export const deleteBranch: API.OperationMethod<
  DeleteBranchInput,
  DeleteBranchOutput,
  DeleteBranchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBranchInput,
  output: DeleteBranchOutput,
  errors: [
    BranchNameRequiredException,
    DefaultBranchCannotBeDeletedException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidBranchNameException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBranch",
}));

export type DeleteCommentContentError =
  | CommentDeletedException
  | CommentDoesNotExistException
  | CommentIdRequiredException
  | InvalidCommentIdException
  | CommonErrors;
/**
 * Deletes the content of a comment made on a change, file, or commit in a repository.
 */
export const deleteCommentContent: API.OperationMethod<
  DeleteCommentContentInput,
  DeleteCommentContentOutput,
  DeleteCommentContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCommentContentInput,
  output: DeleteCommentContentOutput,
  errors: [
    CommentDeletedException,
    CommentDoesNotExistException,
    CommentIdRequiredException,
    InvalidCommentIdException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCommentContent",
}));

export type DeleteFileError =
  | BranchDoesNotExistException
  | BranchNameIsTagNameException
  | BranchNameRequiredException
  | CommitMessageLengthExceededException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileDoesNotExistException
  | InvalidBranchNameException
  | InvalidEmailException
  | InvalidParentCommitIdException
  | InvalidPathException
  | InvalidRepositoryNameException
  | NameLengthExceededException
  | ParentCommitDoesNotExistException
  | ParentCommitIdOutdatedException
  | ParentCommitIdRequiredException
  | PathRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Deletes a specified file from a specified branch. A commit is created on the branch
 * that contains the revision. The file still exists in the commits earlier to the commit
 * that contains the deletion.
 */
export const deleteFile: API.OperationMethod<
  DeleteFileInput,
  DeleteFileOutput,
  DeleteFileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFileInput,
  output: DeleteFileOutput,
  errors: [
    BranchDoesNotExistException,
    BranchNameIsTagNameException,
    BranchNameRequiredException,
    CommitMessageLengthExceededException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileDoesNotExistException,
    InvalidBranchNameException,
    InvalidEmailException,
    InvalidParentCommitIdException,
    InvalidPathException,
    InvalidRepositoryNameException,
    NameLengthExceededException,
    ParentCommitDoesNotExistException,
    ParentCommitIdOutdatedException,
    ParentCommitIdRequiredException,
    PathRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFile",
}));

export type DeletePullRequestApprovalRuleError =
  | ApprovalRuleNameRequiredException
  | CannotDeleteApprovalRuleFromTemplateException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidApprovalRuleNameException
  | InvalidPullRequestIdException
  | PullRequestAlreadyClosedException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | CommonErrors;
/**
 * Deletes an approval rule from a specified pull request. Approval rules can be deleted from a pull request only if the pull request is open, and if the
 * approval rule was created specifically for a pull request and not generated from an approval rule template associated with the repository where the
 * pull request was created. You cannot delete an approval rule from a merged or closed pull request.
 */
export const deletePullRequestApprovalRule: API.OperationMethod<
  DeletePullRequestApprovalRuleInput,
  DeletePullRequestApprovalRuleOutput,
  DeletePullRequestApprovalRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePullRequestApprovalRuleInput,
  output: DeletePullRequestApprovalRuleOutput,
  errors: [
    ApprovalRuleNameRequiredException,
    CannotDeleteApprovalRuleFromTemplateException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidApprovalRuleNameException,
    InvalidPullRequestIdException,
    PullRequestAlreadyClosedException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePullRequestApprovalRule",
}));

export type DeleteRepositoryError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryNameException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Deletes a repository. If a specified repository was already deleted, a null repository
 * ID is returned.
 *
 * Deleting a repository also deletes all associated objects and metadata. After a repository is
 * deleted, all future push calls to the deleted repository fail.
 */
export const deleteRepository: API.OperationMethod<
  DeleteRepositoryInput,
  DeleteRepositoryOutput,
  DeleteRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRepositoryInput,
  output: DeleteRepositoryOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidRepositoryNameException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRepository",
}));

export type DescribeMergeConflictsError =
  | CommitDoesNotExistException
  | CommitRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileDoesNotExistException
  | InvalidCommitException
  | InvalidConflictDetailLevelException
  | InvalidConflictResolutionStrategyException
  | InvalidContinuationTokenException
  | InvalidMaxMergeHunksException
  | InvalidMergeOptionException
  | InvalidPathException
  | InvalidRepositoryNameException
  | MaximumFileContentToLoadExceededException
  | MaximumItemsToCompareExceededException
  | MergeOptionRequiredException
  | PathRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | TipsDivergenceExceededException
  | CommonErrors;
/**
 * Returns information about one or more merge conflicts in the attempted merge of two
 * commit specifiers using the squash or three-way merge strategy. If the merge option for
 * the attempted merge is specified as FAST_FORWARD_MERGE, an exception is thrown.
 */
export const describeMergeConflicts: API.PaginatedOperationMethod<
  DescribeMergeConflictsInput,
  DescribeMergeConflictsOutput,
  DescribeMergeConflictsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMergeConflictsInput,
  output: DescribeMergeConflictsOutput,
  errors: [
    CommitDoesNotExistException,
    CommitRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileDoesNotExistException,
    InvalidCommitException,
    InvalidConflictDetailLevelException,
    InvalidConflictResolutionStrategyException,
    InvalidContinuationTokenException,
    InvalidMaxMergeHunksException,
    InvalidMergeOptionException,
    InvalidPathException,
    InvalidRepositoryNameException,
    MaximumFileContentToLoadExceededException,
    MaximumItemsToCompareExceededException,
    MergeOptionRequiredException,
    PathRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    TipsDivergenceExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMergeConflicts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxMergeHunks",
  } as const,
})) as any;

export type DescribePullRequestEventsError =
  | ActorDoesNotExistException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidActorArnException
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | InvalidPullRequestEventTypeException
  | InvalidPullRequestIdException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | CommonErrors;
/**
 * Returns information about one or more pull request events.
 */
export const describePullRequestEvents: API.PaginatedOperationMethod<
  DescribePullRequestEventsInput,
  DescribePullRequestEventsOutput,
  DescribePullRequestEventsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribePullRequestEventsInput,
  output: DescribePullRequestEventsOutput,
  errors: [
    ActorDoesNotExistException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidActorArnException,
    InvalidContinuationTokenException,
    InvalidMaxResultsException,
    InvalidPullRequestEventTypeException,
    InvalidPullRequestIdException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePullRequestEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DisassociateApprovalRuleTemplateFromRepositoryError =
  | ApprovalRuleTemplateDoesNotExistException
  | ApprovalRuleTemplateNameRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidApprovalRuleTemplateNameException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Removes the association between a template and a repository so that approval rules
 * based on the template are not automatically created when pull requests are created in
 * the specified repository. This does not delete any approval rules previously created for
 * pull requests through the template association.
 */
export const disassociateApprovalRuleTemplateFromRepository: API.OperationMethod<
  DisassociateApprovalRuleTemplateFromRepositoryInput,
  DisassociateApprovalRuleTemplateFromRepositoryResponse,
  DisassociateApprovalRuleTemplateFromRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateApprovalRuleTemplateFromRepositoryInput,
  output: DisassociateApprovalRuleTemplateFromRepositoryResponse,
  errors: [
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidApprovalRuleTemplateNameException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateApprovalRuleTemplateFromRepository",
}));

export type EvaluatePullRequestApprovalRulesError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidPullRequestIdException
  | InvalidRevisionIdException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | RevisionIdRequiredException
  | RevisionNotCurrentException
  | CommonErrors;
/**
 * Evaluates whether a pull request has met all the conditions specified in its associated approval rules.
 */
export const evaluatePullRequestApprovalRules: API.OperationMethod<
  EvaluatePullRequestApprovalRulesInput,
  EvaluatePullRequestApprovalRulesOutput,
  EvaluatePullRequestApprovalRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EvaluatePullRequestApprovalRulesInput,
  output: EvaluatePullRequestApprovalRulesOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidPullRequestIdException,
    InvalidRevisionIdException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    RevisionIdRequiredException,
    RevisionNotCurrentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EvaluatePullRequestApprovalRules",
}));

export type GetApprovalRuleTemplateError =
  | ApprovalRuleTemplateDoesNotExistException
  | ApprovalRuleTemplateNameRequiredException
  | InvalidApprovalRuleTemplateNameException
  | CommonErrors;
/**
 * Returns information about a specified approval rule template.
 */
export const getApprovalRuleTemplate: API.OperationMethod<
  GetApprovalRuleTemplateInput,
  GetApprovalRuleTemplateOutput,
  GetApprovalRuleTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApprovalRuleTemplateInput,
  output: GetApprovalRuleTemplateOutput,
  errors: [
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameRequiredException,
    InvalidApprovalRuleTemplateNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApprovalRuleTemplate",
}));

export type GetBlobError =
  | BlobIdDoesNotExistException
  | BlobIdRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileTooLargeException
  | InvalidBlobIdException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Returns the base-64 encoded content of an individual blob in a repository.
 */
export const getBlob: API.OperationMethod<
  GetBlobInput,
  GetBlobOutput,
  GetBlobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBlobInput,
  output: GetBlobOutput,
  errors: [
    BlobIdDoesNotExistException,
    BlobIdRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileTooLargeException,
    InvalidBlobIdException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlob",
}));

export type GetBlobDifferencesError =
  | BlobIdDoesNotExistException
  | BlobIdRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileTooLargeException
  | InvalidBlobIdException
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | ValidationException
  | CommonErrors;
/**
 * Returns a structured, line-level diff between two blob versions in a repository. The
 * diff is returned as an ordered list of hunks, where each hunk represents a contiguous
 * run of changed lines together with any surrounding unchanged context lines.
 *
 * Results are paginated. Use `MaxResults` and `NextToken` to
 * retrieve additional pages.
 *
 * For the typical usage workflow, see GetDifferences.
 */
export const getBlobDifferences: API.PaginatedOperationMethod<
  GetBlobDifferencesInput,
  GetBlobDifferencesOutput,
  GetBlobDifferencesError,
  Credentials | HttpClient.HttpClient,
  DiffHunk
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetBlobDifferencesInput,
  output: GetBlobDifferencesOutput,
  errors: [
    BlobIdDoesNotExistException,
    BlobIdRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileTooLargeException,
    InvalidBlobIdException,
    InvalidContinuationTokenException,
    InvalidMaxResultsException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlobDifferences",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "hunks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetBranchError =
  | BranchDoesNotExistException
  | BranchNameRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidBranchNameException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Returns information about a repository branch, including its name and the last commit ID.
 */
export const getBranch: API.OperationMethod<
  GetBranchInput,
  GetBranchOutput,
  GetBranchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBranchInput,
  output: GetBranchOutput,
  errors: [
    BranchDoesNotExistException,
    BranchNameRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidBranchNameException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBranch",
}));

export type GetCommentError =
  | CommentDeletedException
  | CommentDoesNotExistException
  | CommentIdRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommentIdException
  | CommonErrors;
/**
 * Returns the content of a comment made on a change, file, or commit in a repository.
 *
 * Reaction counts might include numbers from user identities who were deleted after the reaction was made. For a count of
 * reactions from active identities, use GetCommentReactions.
 */
export const getComment: API.OperationMethod<
  GetCommentInput,
  GetCommentOutput,
  GetCommentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCommentInput,
  output: GetCommentOutput,
  errors: [
    CommentDeletedException,
    CommentDoesNotExistException,
    CommentIdRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidCommentIdException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComment",
}));

export type GetCommentReactionsError =
  | CommentDeletedException
  | CommentDoesNotExistException
  | CommentIdRequiredException
  | InvalidCommentIdException
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | InvalidReactionUserArnException
  | CommonErrors;
/**
 * Returns information about reactions to a specified comment ID. Reactions from users who have been deleted will not be included in the count.
 */
export const getCommentReactions: API.PaginatedOperationMethod<
  GetCommentReactionsInput,
  GetCommentReactionsOutput,
  GetCommentReactionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetCommentReactionsInput,
  output: GetCommentReactionsOutput,
  errors: [
    CommentDeletedException,
    CommentDoesNotExistException,
    CommentIdRequiredException,
    InvalidCommentIdException,
    InvalidContinuationTokenException,
    InvalidMaxResultsException,
    InvalidReactionUserArnException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCommentReactions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetCommentsForComparedCommitError =
  | CommitDoesNotExistException
  | CommitIdRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommitIdException
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Returns information about comments made on the comparison between two commits.
 *
 * Reaction counts might include numbers from user identities who were deleted after the reaction was made. For a count of
 * reactions from active identities, use GetCommentReactions.
 */
export const getCommentsForComparedCommit: API.PaginatedOperationMethod<
  GetCommentsForComparedCommitInput,
  GetCommentsForComparedCommitOutput,
  GetCommentsForComparedCommitError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetCommentsForComparedCommitInput,
  output: GetCommentsForComparedCommitOutput,
  errors: [
    CommitDoesNotExistException,
    CommitIdRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidCommitIdException,
    InvalidContinuationTokenException,
    InvalidMaxResultsException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCommentsForComparedCommit",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetCommentsForPullRequestError =
  | CommitDoesNotExistException
  | CommitIdRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommitIdException
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | InvalidPullRequestIdException
  | InvalidRepositoryNameException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | RepositoryNotAssociatedWithPullRequestException
  | CommonErrors;
/**
 * Returns comments made on a pull request.
 *
 * Reaction counts might include numbers from user identities who were deleted after the reaction was made. For a count of
 * reactions from active identities, use GetCommentReactions.
 */
export const getCommentsForPullRequest: API.PaginatedOperationMethod<
  GetCommentsForPullRequestInput,
  GetCommentsForPullRequestOutput,
  GetCommentsForPullRequestError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetCommentsForPullRequestInput,
  output: GetCommentsForPullRequestOutput,
  errors: [
    CommitDoesNotExistException,
    CommitIdRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidCommitIdException,
    InvalidContinuationTokenException,
    InvalidMaxResultsException,
    InvalidPullRequestIdException,
    InvalidRepositoryNameException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    RepositoryNotAssociatedWithPullRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCommentsForPullRequest",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetCommitError =
  | CommitIdDoesNotExistException
  | CommitIdRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommitIdException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Returns information about a commit, including commit message and committer information.
 */
export const getCommit: API.OperationMethod<
  GetCommitInput,
  GetCommitOutput,
  GetCommitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCommitInput,
  output: GetCommitOutput,
  errors: [
    CommitIdDoesNotExistException,
    CommitIdRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidCommitIdException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCommit",
}));

export type GetDifferencesError =
  | CommitDoesNotExistException
  | CommitRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommitException
  | InvalidCommitIdException
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | InvalidPathException
  | InvalidRepositoryNameException
  | PathDoesNotExistException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Returns information about the differences in a valid commit specifier (such as a
 * branch, tag, HEAD, commit ID, or other fully qualified reference). Results can be
 * limited to a specified path.
 *
 * For line-level diff details, pass the `beforeBlob.blobId` and
 * `afterBlob.blobId` values from a `Difference` object to GetBlobDifferences.
 */
export const getDifferences: API.PaginatedOperationMethod<
  GetDifferencesInput,
  GetDifferencesOutput,
  GetDifferencesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetDifferencesInput,
  output: GetDifferencesOutput,
  errors: [
    CommitDoesNotExistException,
    CommitRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidCommitException,
    InvalidCommitIdException,
    InvalidContinuationTokenException,
    InvalidMaxResultsException,
    InvalidPathException,
    InvalidRepositoryNameException,
    PathDoesNotExistException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDifferences",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetFileError =
  | CommitDoesNotExistException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileDoesNotExistException
  | FileTooLargeException
  | InvalidCommitException
  | InvalidPathException
  | InvalidRepositoryNameException
  | PathRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Returns the base-64 encoded contents of a specified file and its metadata.
 */
export const getFile: API.OperationMethod<
  GetFileInput,
  GetFileOutput,
  GetFileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFileInput,
  output: GetFileOutput,
  errors: [
    CommitDoesNotExistException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileDoesNotExistException,
    FileTooLargeException,
    InvalidCommitException,
    InvalidPathException,
    InvalidRepositoryNameException,
    PathRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFile",
}));

export type GetFolderError =
  | CommitDoesNotExistException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FolderDoesNotExistException
  | InvalidCommitException
  | InvalidPathException
  | InvalidRepositoryNameException
  | PathRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Returns the contents of a specified folder in a repository.
 */
export const getFolder: API.OperationMethod<
  GetFolderInput,
  GetFolderOutput,
  GetFolderError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFolderInput,
  output: GetFolderOutput,
  errors: [
    CommitDoesNotExistException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FolderDoesNotExistException,
    InvalidCommitException,
    InvalidPathException,
    InvalidRepositoryNameException,
    PathRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFolder",
}));

export type GetMergeCommitError =
  | CommitDoesNotExistException
  | CommitRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommitException
  | InvalidConflictDetailLevelException
  | InvalidConflictResolutionStrategyException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Returns information about a specified merge commit.
 */
export const getMergeCommit: API.OperationMethod<
  GetMergeCommitInput,
  GetMergeCommitOutput,
  GetMergeCommitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMergeCommitInput,
  output: GetMergeCommitOutput,
  errors: [
    CommitDoesNotExistException,
    CommitRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidCommitException,
    InvalidConflictDetailLevelException,
    InvalidConflictResolutionStrategyException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMergeCommit",
}));

export type GetMergeConflictsError =
  | CommitDoesNotExistException
  | CommitRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommitException
  | InvalidConflictDetailLevelException
  | InvalidConflictResolutionStrategyException
  | InvalidContinuationTokenException
  | InvalidDestinationCommitSpecifierException
  | InvalidMaxConflictFilesException
  | InvalidMergeOptionException
  | InvalidRepositoryNameException
  | InvalidSourceCommitSpecifierException
  | MaximumFileContentToLoadExceededException
  | MaximumItemsToCompareExceededException
  | MergeOptionRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | TipsDivergenceExceededException
  | CommonErrors;
/**
 * Returns information about merge conflicts between the before and after commit IDs for a pull request in a repository.
 */
export const getMergeConflicts: API.PaginatedOperationMethod<
  GetMergeConflictsInput,
  GetMergeConflictsOutput,
  GetMergeConflictsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetMergeConflictsInput,
  output: GetMergeConflictsOutput,
  errors: [
    CommitDoesNotExistException,
    CommitRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidCommitException,
    InvalidConflictDetailLevelException,
    InvalidConflictResolutionStrategyException,
    InvalidContinuationTokenException,
    InvalidDestinationCommitSpecifierException,
    InvalidMaxConflictFilesException,
    InvalidMergeOptionException,
    InvalidRepositoryNameException,
    InvalidSourceCommitSpecifierException,
    MaximumFileContentToLoadExceededException,
    MaximumItemsToCompareExceededException,
    MergeOptionRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    TipsDivergenceExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMergeConflicts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxConflictFiles",
  } as const,
})) as any;

export type GetMergeOptionsError =
  | CommitDoesNotExistException
  | CommitRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommitException
  | InvalidConflictDetailLevelException
  | InvalidConflictResolutionStrategyException
  | InvalidRepositoryNameException
  | MaximumFileContentToLoadExceededException
  | MaximumItemsToCompareExceededException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | TipsDivergenceExceededException
  | CommonErrors;
/**
 * Returns information about the merge options available for merging two specified
 * branches. For details about why a merge option is not available, use GetMergeConflicts
 * or DescribeMergeConflicts.
 */
export const getMergeOptions: API.OperationMethod<
  GetMergeOptionsInput,
  GetMergeOptionsOutput,
  GetMergeOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMergeOptionsInput,
  output: GetMergeOptionsOutput,
  errors: [
    CommitDoesNotExistException,
    CommitRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidCommitException,
    InvalidConflictDetailLevelException,
    InvalidConflictResolutionStrategyException,
    InvalidRepositoryNameException,
    MaximumFileContentToLoadExceededException,
    MaximumItemsToCompareExceededException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    TipsDivergenceExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMergeOptions",
}));

export type GetPullRequestError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidPullRequestIdException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | CommonErrors;
/**
 * Gets information about a pull request in a specified repository.
 */
export const getPullRequest: API.OperationMethod<
  GetPullRequestInput,
  GetPullRequestOutput,
  GetPullRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPullRequestInput,
  output: GetPullRequestOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidPullRequestIdException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPullRequest",
}));

export type GetPullRequestApprovalStatesError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidPullRequestIdException
  | InvalidRevisionIdException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | RevisionIdRequiredException
  | CommonErrors;
/**
 * Gets information about the approval states for a specified pull request. Approval states only apply to pull requests that have one or more
 * approval rules applied to them.
 */
export const getPullRequestApprovalStates: API.OperationMethod<
  GetPullRequestApprovalStatesInput,
  GetPullRequestApprovalStatesOutput,
  GetPullRequestApprovalStatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPullRequestApprovalStatesInput,
  output: GetPullRequestApprovalStatesOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidPullRequestIdException,
    InvalidRevisionIdException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    RevisionIdRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPullRequestApprovalStates",
}));

export type GetPullRequestOverrideStateError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidPullRequestIdException
  | InvalidRevisionIdException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | RevisionIdRequiredException
  | CommonErrors;
/**
 * Returns information about whether approval rules have been set aside (overridden) for a
 * pull request, and if so, the Amazon Resource Name (ARN) of the user or identity that overrode the rules and their requirements for the pull request.
 */
export const getPullRequestOverrideState: API.OperationMethod<
  GetPullRequestOverrideStateInput,
  GetPullRequestOverrideStateOutput,
  GetPullRequestOverrideStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPullRequestOverrideStateInput,
  output: GetPullRequestOverrideStateOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidPullRequestIdException,
    InvalidRevisionIdException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    RevisionIdRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPullRequestOverrideState",
}));

export type GetRepositoryError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Returns information about a repository.
 *
 * The description field for a repository accepts all HTML characters and all valid
 * Unicode characters. Applications that do not HTML-encode the description and display
 * it in a webpage can expose users to potentially malicious code. Make sure that you
 * HTML-encode the description field in any application that uses this API to display
 * the repository description on a webpage.
 */
export const getRepository: API.OperationMethod<
  GetRepositoryInput,
  GetRepositoryOutput,
  GetRepositoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRepositoryInput,
  output: GetRepositoryOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRepository",
}));

export type GetRepositoryTriggersError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Gets information about triggers configured for a repository.
 */
export const getRepositoryTriggers: API.OperationMethod<
  GetRepositoryTriggersInput,
  GetRepositoryTriggersOutput,
  GetRepositoryTriggersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRepositoryTriggersInput,
  output: GetRepositoryTriggersOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRepositoryTriggers",
}));

export type ListApprovalRuleTemplatesError =
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | CommonErrors;
/**
 * Lists all approval rule templates in the specified Amazon Web Services Region in your Amazon Web Services account. If
 * an Amazon Web Services Region is not specified, the Amazon Web Services Region where you are signed in is used.
 */
export const listApprovalRuleTemplates: API.PaginatedOperationMethod<
  ListApprovalRuleTemplatesInput,
  ListApprovalRuleTemplatesOutput,
  ListApprovalRuleTemplatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApprovalRuleTemplatesInput,
  output: ListApprovalRuleTemplatesOutput,
  errors: [InvalidContinuationTokenException, InvalidMaxResultsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApprovalRuleTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssociatedApprovalRuleTemplatesForRepositoryError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Lists all approval rule templates that are associated with a specified repository.
 */
export const listAssociatedApprovalRuleTemplatesForRepository: API.PaginatedOperationMethod<
  ListAssociatedApprovalRuleTemplatesForRepositoryInput,
  ListAssociatedApprovalRuleTemplatesForRepositoryOutput,
  ListAssociatedApprovalRuleTemplatesForRepositoryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssociatedApprovalRuleTemplatesForRepositoryInput,
  output: ListAssociatedApprovalRuleTemplatesForRepositoryOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidContinuationTokenException,
    InvalidMaxResultsException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociatedApprovalRuleTemplatesForRepository",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBranchesError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidContinuationTokenException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Gets information about one or more branches in a repository.
 */
export const listBranches: API.PaginatedOperationMethod<
  ListBranchesInput,
  ListBranchesOutput,
  ListBranchesError,
  Credentials | HttpClient.HttpClient,
  BranchName
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBranchesInput,
  output: ListBranchesOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidContinuationTokenException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBranches",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "branches",
  } as const,
})) as any;

export type ListFileCommitHistoryError =
  | CommitDoesNotExistException
  | CommitRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommitException
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | TipsDivergenceExceededException
  | CommonErrors;
/**
 * Retrieves a list of commits and changes to a specified file.
 */
export const listFileCommitHistory: API.PaginatedOperationMethod<
  ListFileCommitHistoryRequest,
  ListFileCommitHistoryResponse,
  ListFileCommitHistoryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFileCommitHistoryRequest,
  output: ListFileCommitHistoryResponse,
  errors: [
    CommitDoesNotExistException,
    CommitRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidCommitException,
    InvalidContinuationTokenException,
    InvalidMaxResultsException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    TipsDivergenceExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFileCommitHistory",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPullRequestsError =
  | AuthorDoesNotExistException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidAuthorArnException
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | InvalidPullRequestStatusException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Returns a list of pull requests for a specified repository. The return list can be refined by pull request
 * status or pull request author ARN.
 */
export const listPullRequests: API.PaginatedOperationMethod<
  ListPullRequestsInput,
  ListPullRequestsOutput,
  ListPullRequestsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPullRequestsInput,
  output: ListPullRequestsOutput,
  errors: [
    AuthorDoesNotExistException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidAuthorArnException,
    InvalidContinuationTokenException,
    InvalidMaxResultsException,
    InvalidPullRequestStatusException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPullRequests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRepositoriesError =
  | InvalidContinuationTokenException
  | InvalidOrderException
  | InvalidSortByException
  | CommonErrors;
/**
 * Gets information about one or more repositories.
 */
export const listRepositories: API.PaginatedOperationMethod<
  ListRepositoriesInput,
  ListRepositoriesOutput,
  ListRepositoriesError,
  Credentials | HttpClient.HttpClient,
  RepositoryNameIdPair
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRepositoriesInput,
  output: ListRepositoriesOutput,
  errors: [
    InvalidContinuationTokenException,
    InvalidOrderException,
    InvalidSortByException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRepositories",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "repositories",
  } as const,
})) as any;

export type ListRepositoriesForApprovalRuleTemplateError =
  | ApprovalRuleTemplateDoesNotExistException
  | ApprovalRuleTemplateNameRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidApprovalRuleTemplateNameException
  | InvalidContinuationTokenException
  | InvalidMaxResultsException
  | CommonErrors;
/**
 * Lists all repositories associated with the specified approval rule template.
 */
export const listRepositoriesForApprovalRuleTemplate: API.PaginatedOperationMethod<
  ListRepositoriesForApprovalRuleTemplateInput,
  ListRepositoriesForApprovalRuleTemplateOutput,
  ListRepositoriesForApprovalRuleTemplateError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRepositoriesForApprovalRuleTemplateInput,
  output: ListRepositoriesForApprovalRuleTemplateOutput,
  errors: [
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidApprovalRuleTemplateNameException,
    InvalidContinuationTokenException,
    InvalidMaxResultsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRepositoriesForApprovalRuleTemplate",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InvalidRepositoryNameException
  | InvalidResourceArnException
  | RepositoryDoesNotExistException
  | ResourceArnRequiredException
  | CommonErrors;
/**
 * Gets information about Amazon Web Servicestags for a specified Amazon Resource Name (ARN) in CodeCommit. For a list of valid resources in CodeCommit, see CodeCommit Resources and Operations in the CodeCommit User
 * Guide.
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
    InvalidRepositoryNameException,
    InvalidResourceArnException,
    RepositoryDoesNotExistException,
    ResourceArnRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type MergeBranchesByFastForwardError =
  | BranchDoesNotExistException
  | BranchNameIsTagNameException
  | BranchNameRequiredException
  | CommitDoesNotExistException
  | CommitRequiredException
  | ConcurrentReferenceUpdateException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidBranchNameException
  | InvalidCommitException
  | InvalidRepositoryNameException
  | InvalidTargetBranchException
  | ManualMergeRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | TipsDivergenceExceededException
  | CommonErrors;
/**
 * Merges two branches using the fast-forward merge strategy.
 */
export const mergeBranchesByFastForward: API.OperationMethod<
  MergeBranchesByFastForwardInput,
  MergeBranchesByFastForwardOutput,
  MergeBranchesByFastForwardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: MergeBranchesByFastForwardInput,
  output: MergeBranchesByFastForwardOutput,
  errors: [
    BranchDoesNotExistException,
    BranchNameIsTagNameException,
    BranchNameRequiredException,
    CommitDoesNotExistException,
    CommitRequiredException,
    ConcurrentReferenceUpdateException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidBranchNameException,
    InvalidCommitException,
    InvalidRepositoryNameException,
    InvalidTargetBranchException,
    ManualMergeRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    TipsDivergenceExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MergeBranchesByFastForward",
}));

export type MergeBranchesBySquashError =
  | BranchDoesNotExistException
  | BranchNameIsTagNameException
  | BranchNameRequiredException
  | CommitDoesNotExistException
  | CommitMessageLengthExceededException
  | CommitRequiredException
  | ConcurrentReferenceUpdateException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileContentSizeLimitExceededException
  | FileModeRequiredException
  | FolderContentSizeLimitExceededException
  | InvalidBranchNameException
  | InvalidCommitException
  | InvalidConflictDetailLevelException
  | InvalidConflictResolutionException
  | InvalidConflictResolutionStrategyException
  | InvalidEmailException
  | InvalidFileModeException
  | InvalidPathException
  | InvalidReplacementContentException
  | InvalidReplacementTypeException
  | InvalidRepositoryNameException
  | InvalidTargetBranchException
  | ManualMergeRequiredException
  | MaximumConflictResolutionEntriesExceededException
  | MaximumFileContentToLoadExceededException
  | MaximumItemsToCompareExceededException
  | MultipleConflictResolutionEntriesException
  | NameLengthExceededException
  | PathRequiredException
  | ReplacementContentRequiredException
  | ReplacementTypeRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | TipsDivergenceExceededException
  | CommonErrors;
/**
 * Merges two branches using the squash merge strategy.
 */
export const mergeBranchesBySquash: API.OperationMethod<
  MergeBranchesBySquashInput,
  MergeBranchesBySquashOutput,
  MergeBranchesBySquashError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: MergeBranchesBySquashInput,
  output: MergeBranchesBySquashOutput,
  errors: [
    BranchDoesNotExistException,
    BranchNameIsTagNameException,
    BranchNameRequiredException,
    CommitDoesNotExistException,
    CommitMessageLengthExceededException,
    CommitRequiredException,
    ConcurrentReferenceUpdateException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileContentSizeLimitExceededException,
    FileModeRequiredException,
    FolderContentSizeLimitExceededException,
    InvalidBranchNameException,
    InvalidCommitException,
    InvalidConflictDetailLevelException,
    InvalidConflictResolutionException,
    InvalidConflictResolutionStrategyException,
    InvalidEmailException,
    InvalidFileModeException,
    InvalidPathException,
    InvalidReplacementContentException,
    InvalidReplacementTypeException,
    InvalidRepositoryNameException,
    InvalidTargetBranchException,
    ManualMergeRequiredException,
    MaximumConflictResolutionEntriesExceededException,
    MaximumFileContentToLoadExceededException,
    MaximumItemsToCompareExceededException,
    MultipleConflictResolutionEntriesException,
    NameLengthExceededException,
    PathRequiredException,
    ReplacementContentRequiredException,
    ReplacementTypeRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    TipsDivergenceExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MergeBranchesBySquash",
}));

export type MergeBranchesByThreeWayError =
  | BranchDoesNotExistException
  | BranchNameIsTagNameException
  | BranchNameRequiredException
  | CommitDoesNotExistException
  | CommitMessageLengthExceededException
  | CommitRequiredException
  | ConcurrentReferenceUpdateException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileContentSizeLimitExceededException
  | FileModeRequiredException
  | FolderContentSizeLimitExceededException
  | InvalidBranchNameException
  | InvalidCommitException
  | InvalidConflictDetailLevelException
  | InvalidConflictResolutionException
  | InvalidConflictResolutionStrategyException
  | InvalidEmailException
  | InvalidFileModeException
  | InvalidPathException
  | InvalidReplacementContentException
  | InvalidReplacementTypeException
  | InvalidRepositoryNameException
  | InvalidTargetBranchException
  | ManualMergeRequiredException
  | MaximumConflictResolutionEntriesExceededException
  | MaximumFileContentToLoadExceededException
  | MaximumItemsToCompareExceededException
  | MultipleConflictResolutionEntriesException
  | NameLengthExceededException
  | PathRequiredException
  | ReplacementContentRequiredException
  | ReplacementTypeRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | TipsDivergenceExceededException
  | CommonErrors;
/**
 * Merges two specified branches using the three-way merge strategy.
 */
export const mergeBranchesByThreeWay: API.OperationMethod<
  MergeBranchesByThreeWayInput,
  MergeBranchesByThreeWayOutput,
  MergeBranchesByThreeWayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: MergeBranchesByThreeWayInput,
  output: MergeBranchesByThreeWayOutput,
  errors: [
    BranchDoesNotExistException,
    BranchNameIsTagNameException,
    BranchNameRequiredException,
    CommitDoesNotExistException,
    CommitMessageLengthExceededException,
    CommitRequiredException,
    ConcurrentReferenceUpdateException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileContentSizeLimitExceededException,
    FileModeRequiredException,
    FolderContentSizeLimitExceededException,
    InvalidBranchNameException,
    InvalidCommitException,
    InvalidConflictDetailLevelException,
    InvalidConflictResolutionException,
    InvalidConflictResolutionStrategyException,
    InvalidEmailException,
    InvalidFileModeException,
    InvalidPathException,
    InvalidReplacementContentException,
    InvalidReplacementTypeException,
    InvalidRepositoryNameException,
    InvalidTargetBranchException,
    ManualMergeRequiredException,
    MaximumConflictResolutionEntriesExceededException,
    MaximumFileContentToLoadExceededException,
    MaximumItemsToCompareExceededException,
    MultipleConflictResolutionEntriesException,
    NameLengthExceededException,
    PathRequiredException,
    ReplacementContentRequiredException,
    ReplacementTypeRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    TipsDivergenceExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MergeBranchesByThreeWay",
}));

export type MergePullRequestByFastForwardError =
  | ConcurrentReferenceUpdateException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidCommitIdException
  | InvalidPullRequestIdException
  | InvalidRepositoryNameException
  | ManualMergeRequiredException
  | PullRequestAlreadyClosedException
  | PullRequestApprovalRulesNotSatisfiedException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | ReferenceDoesNotExistException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | RepositoryNotAssociatedWithPullRequestException
  | TipOfSourceReferenceIsDifferentException
  | CommonErrors;
/**
 * Attempts to merge the source commit of a pull request into the specified destination
 * branch for that pull request at the specified commit using the fast-forward merge strategy. If the merge is successful, it closes the pull request.
 */
export const mergePullRequestByFastForward: API.OperationMethod<
  MergePullRequestByFastForwardInput,
  MergePullRequestByFastForwardOutput,
  MergePullRequestByFastForwardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: MergePullRequestByFastForwardInput,
  output: MergePullRequestByFastForwardOutput,
  errors: [
    ConcurrentReferenceUpdateException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidCommitIdException,
    InvalidPullRequestIdException,
    InvalidRepositoryNameException,
    ManualMergeRequiredException,
    PullRequestAlreadyClosedException,
    PullRequestApprovalRulesNotSatisfiedException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    ReferenceDoesNotExistException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    RepositoryNotAssociatedWithPullRequestException,
    TipOfSourceReferenceIsDifferentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MergePullRequestByFastForward",
}));

export type MergePullRequestBySquashError =
  | CommitMessageLengthExceededException
  | ConcurrentReferenceUpdateException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileContentSizeLimitExceededException
  | FolderContentSizeLimitExceededException
  | InvalidCommitIdException
  | InvalidConflictDetailLevelException
  | InvalidConflictResolutionException
  | InvalidConflictResolutionStrategyException
  | InvalidEmailException
  | InvalidFileModeException
  | InvalidPathException
  | InvalidPullRequestIdException
  | InvalidReplacementContentException
  | InvalidReplacementTypeException
  | InvalidRepositoryNameException
  | ManualMergeRequiredException
  | MaximumConflictResolutionEntriesExceededException
  | MaximumFileContentToLoadExceededException
  | MaximumItemsToCompareExceededException
  | MultipleConflictResolutionEntriesException
  | NameLengthExceededException
  | PathRequiredException
  | PullRequestAlreadyClosedException
  | PullRequestApprovalRulesNotSatisfiedException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | ReplacementContentRequiredException
  | ReplacementTypeRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | RepositoryNotAssociatedWithPullRequestException
  | TipOfSourceReferenceIsDifferentException
  | TipsDivergenceExceededException
  | CommonErrors;
/**
 * Attempts to merge the source commit of a pull request into the specified destination
 * branch for that pull request at the specified commit using the squash merge strategy. If the merge is successful, it closes the pull request.
 */
export const mergePullRequestBySquash: API.OperationMethod<
  MergePullRequestBySquashInput,
  MergePullRequestBySquashOutput,
  MergePullRequestBySquashError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: MergePullRequestBySquashInput,
  output: MergePullRequestBySquashOutput,
  errors: [
    CommitMessageLengthExceededException,
    ConcurrentReferenceUpdateException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileContentSizeLimitExceededException,
    FolderContentSizeLimitExceededException,
    InvalidCommitIdException,
    InvalidConflictDetailLevelException,
    InvalidConflictResolutionException,
    InvalidConflictResolutionStrategyException,
    InvalidEmailException,
    InvalidFileModeException,
    InvalidPathException,
    InvalidPullRequestIdException,
    InvalidReplacementContentException,
    InvalidReplacementTypeException,
    InvalidRepositoryNameException,
    ManualMergeRequiredException,
    MaximumConflictResolutionEntriesExceededException,
    MaximumFileContentToLoadExceededException,
    MaximumItemsToCompareExceededException,
    MultipleConflictResolutionEntriesException,
    NameLengthExceededException,
    PathRequiredException,
    PullRequestAlreadyClosedException,
    PullRequestApprovalRulesNotSatisfiedException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    ReplacementContentRequiredException,
    ReplacementTypeRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    RepositoryNotAssociatedWithPullRequestException,
    TipOfSourceReferenceIsDifferentException,
    TipsDivergenceExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MergePullRequestBySquash",
}));

export type MergePullRequestByThreeWayError =
  | CommitMessageLengthExceededException
  | ConcurrentReferenceUpdateException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileContentSizeLimitExceededException
  | FolderContentSizeLimitExceededException
  | InvalidCommitIdException
  | InvalidConflictDetailLevelException
  | InvalidConflictResolutionException
  | InvalidConflictResolutionStrategyException
  | InvalidEmailException
  | InvalidFileModeException
  | InvalidPathException
  | InvalidPullRequestIdException
  | InvalidReplacementContentException
  | InvalidReplacementTypeException
  | InvalidRepositoryNameException
  | ManualMergeRequiredException
  | MaximumConflictResolutionEntriesExceededException
  | MaximumFileContentToLoadExceededException
  | MaximumItemsToCompareExceededException
  | MultipleConflictResolutionEntriesException
  | NameLengthExceededException
  | PathRequiredException
  | PullRequestAlreadyClosedException
  | PullRequestApprovalRulesNotSatisfiedException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | ReplacementContentRequiredException
  | ReplacementTypeRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | RepositoryNotAssociatedWithPullRequestException
  | TipOfSourceReferenceIsDifferentException
  | TipsDivergenceExceededException
  | CommonErrors;
/**
 * Attempts to merge the source commit of a pull request into the specified destination
 * branch for that pull request at the specified commit using the three-way merge strategy. If the merge is successful, it closes the pull request.
 */
export const mergePullRequestByThreeWay: API.OperationMethod<
  MergePullRequestByThreeWayInput,
  MergePullRequestByThreeWayOutput,
  MergePullRequestByThreeWayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: MergePullRequestByThreeWayInput,
  output: MergePullRequestByThreeWayOutput,
  errors: [
    CommitMessageLengthExceededException,
    ConcurrentReferenceUpdateException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileContentSizeLimitExceededException,
    FolderContentSizeLimitExceededException,
    InvalidCommitIdException,
    InvalidConflictDetailLevelException,
    InvalidConflictResolutionException,
    InvalidConflictResolutionStrategyException,
    InvalidEmailException,
    InvalidFileModeException,
    InvalidPathException,
    InvalidPullRequestIdException,
    InvalidReplacementContentException,
    InvalidReplacementTypeException,
    InvalidRepositoryNameException,
    ManualMergeRequiredException,
    MaximumConflictResolutionEntriesExceededException,
    MaximumFileContentToLoadExceededException,
    MaximumItemsToCompareExceededException,
    MultipleConflictResolutionEntriesException,
    NameLengthExceededException,
    PathRequiredException,
    PullRequestAlreadyClosedException,
    PullRequestApprovalRulesNotSatisfiedException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    ReplacementContentRequiredException,
    ReplacementTypeRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    RepositoryNotAssociatedWithPullRequestException,
    TipOfSourceReferenceIsDifferentException,
    TipsDivergenceExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MergePullRequestByThreeWay",
}));

export type OverridePullRequestApprovalRulesError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidOverrideStatusException
  | InvalidPullRequestIdException
  | InvalidRevisionIdException
  | OverrideAlreadySetException
  | OverrideStatusRequiredException
  | PullRequestAlreadyClosedException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | RevisionIdRequiredException
  | RevisionNotCurrentException
  | CommonErrors;
/**
 * Sets aside (overrides) all approval rule requirements for a specified pull request.
 */
export const overridePullRequestApprovalRules: API.OperationMethod<
  OverridePullRequestApprovalRulesInput,
  OverridePullRequestApprovalRulesResponse,
  OverridePullRequestApprovalRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: OverridePullRequestApprovalRulesInput,
  output: OverridePullRequestApprovalRulesResponse,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidOverrideStatusException,
    InvalidPullRequestIdException,
    InvalidRevisionIdException,
    OverrideAlreadySetException,
    OverrideStatusRequiredException,
    PullRequestAlreadyClosedException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    RevisionIdRequiredException,
    RevisionNotCurrentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "OverridePullRequestApprovalRules",
}));

export type PostCommentForComparedCommitError =
  | BeforeCommitIdAndAfterCommitIdAreSameException
  | ClientRequestTokenRequiredException
  | CommentContentRequiredException
  | CommentContentSizeLimitExceededException
  | CommitDoesNotExistException
  | CommitIdRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | IdempotencyParameterMismatchException
  | InvalidClientRequestTokenException
  | InvalidCommitIdException
  | InvalidFileLocationException
  | InvalidFilePositionException
  | InvalidPathException
  | InvalidRelativeFileVersionEnumException
  | InvalidRepositoryNameException
  | PathDoesNotExistException
  | PathRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Posts a comment on the comparison between two commits.
 */
export const postCommentForComparedCommit: API.OperationMethod<
  PostCommentForComparedCommitInput,
  PostCommentForComparedCommitOutput,
  PostCommentForComparedCommitError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PostCommentForComparedCommitInput,
  output: PostCommentForComparedCommitOutput,
  errors: [
    BeforeCommitIdAndAfterCommitIdAreSameException,
    ClientRequestTokenRequiredException,
    CommentContentRequiredException,
    CommentContentSizeLimitExceededException,
    CommitDoesNotExistException,
    CommitIdRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    IdempotencyParameterMismatchException,
    InvalidClientRequestTokenException,
    InvalidCommitIdException,
    InvalidFileLocationException,
    InvalidFilePositionException,
    InvalidPathException,
    InvalidRelativeFileVersionEnumException,
    InvalidRepositoryNameException,
    PathDoesNotExistException,
    PathRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PostCommentForComparedCommit",
}));

export type PostCommentForPullRequestError =
  | BeforeCommitIdAndAfterCommitIdAreSameException
  | ClientRequestTokenRequiredException
  | CommentContentRequiredException
  | CommentContentSizeLimitExceededException
  | CommitDoesNotExistException
  | CommitIdRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | IdempotencyParameterMismatchException
  | InvalidClientRequestTokenException
  | InvalidCommitIdException
  | InvalidFileLocationException
  | InvalidFilePositionException
  | InvalidPathException
  | InvalidPullRequestIdException
  | InvalidRelativeFileVersionEnumException
  | InvalidRepositoryNameException
  | PathDoesNotExistException
  | PathRequiredException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | RepositoryNotAssociatedWithPullRequestException
  | CommonErrors;
/**
 * Posts a comment on a pull request.
 */
export const postCommentForPullRequest: API.OperationMethod<
  PostCommentForPullRequestInput,
  PostCommentForPullRequestOutput,
  PostCommentForPullRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PostCommentForPullRequestInput,
  output: PostCommentForPullRequestOutput,
  errors: [
    BeforeCommitIdAndAfterCommitIdAreSameException,
    ClientRequestTokenRequiredException,
    CommentContentRequiredException,
    CommentContentSizeLimitExceededException,
    CommitDoesNotExistException,
    CommitIdRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    IdempotencyParameterMismatchException,
    InvalidClientRequestTokenException,
    InvalidCommitIdException,
    InvalidFileLocationException,
    InvalidFilePositionException,
    InvalidPathException,
    InvalidPullRequestIdException,
    InvalidRelativeFileVersionEnumException,
    InvalidRepositoryNameException,
    PathDoesNotExistException,
    PathRequiredException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    RepositoryNotAssociatedWithPullRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PostCommentForPullRequest",
}));

export type PostCommentReplyError =
  | ClientRequestTokenRequiredException
  | CommentContentRequiredException
  | CommentContentSizeLimitExceededException
  | CommentDoesNotExistException
  | CommentIdRequiredException
  | IdempotencyParameterMismatchException
  | InvalidClientRequestTokenException
  | InvalidCommentIdException
  | CommonErrors;
/**
 * Posts a comment in reply to an existing comment on a comparison between commits or a pull request.
 */
export const postCommentReply: API.OperationMethod<
  PostCommentReplyInput,
  PostCommentReplyOutput,
  PostCommentReplyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PostCommentReplyInput,
  output: PostCommentReplyOutput,
  errors: [
    ClientRequestTokenRequiredException,
    CommentContentRequiredException,
    CommentContentSizeLimitExceededException,
    CommentDoesNotExistException,
    CommentIdRequiredException,
    IdempotencyParameterMismatchException,
    InvalidClientRequestTokenException,
    InvalidCommentIdException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PostCommentReply",
}));

export type PutCommentReactionError =
  | CommentDeletedException
  | CommentDoesNotExistException
  | CommentIdRequiredException
  | InvalidCommentIdException
  | InvalidReactionValueException
  | ReactionLimitExceededException
  | ReactionValueRequiredException
  | CommonErrors;
/**
 * Adds or updates a reaction to a specified comment for the user whose identity is used to make the request. You can only add or
 * update a reaction for yourself. You cannot add, modify, or delete a reaction for another user.
 */
export const putCommentReaction: API.OperationMethod<
  PutCommentReactionInput,
  PutCommentReactionResponse,
  PutCommentReactionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutCommentReactionInput,
  output: PutCommentReactionResponse,
  errors: [
    CommentDeletedException,
    CommentDoesNotExistException,
    CommentIdRequiredException,
    InvalidCommentIdException,
    InvalidReactionValueException,
    ReactionLimitExceededException,
    ReactionValueRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutCommentReaction",
}));

export type PutFileError =
  | BranchDoesNotExistException
  | BranchNameIsTagNameException
  | BranchNameRequiredException
  | CommitMessageLengthExceededException
  | DirectoryNameConflictsWithFileNameException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | FileContentRequiredException
  | FileContentSizeLimitExceededException
  | FileNameConflictsWithDirectoryNameException
  | FilePathConflictsWithSubmodulePathException
  | FolderContentSizeLimitExceededException
  | InvalidBranchNameException
  | InvalidDeletionParameterException
  | InvalidEmailException
  | InvalidFileModeException
  | InvalidParentCommitIdException
  | InvalidPathException
  | InvalidRepositoryNameException
  | NameLengthExceededException
  | ParentCommitDoesNotExistException
  | ParentCommitIdOutdatedException
  | ParentCommitIdRequiredException
  | PathRequiredException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | SameFileContentException
  | CommonErrors;
/**
 * Adds or updates a file in a branch in an CodeCommit repository, and generates a commit for the addition in the specified branch.
 */
export const putFile: API.OperationMethod<
  PutFileInput,
  PutFileOutput,
  PutFileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutFileInput,
  output: PutFileOutput,
  errors: [
    BranchDoesNotExistException,
    BranchNameIsTagNameException,
    BranchNameRequiredException,
    CommitMessageLengthExceededException,
    DirectoryNameConflictsWithFileNameException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    FileContentRequiredException,
    FileContentSizeLimitExceededException,
    FileNameConflictsWithDirectoryNameException,
    FilePathConflictsWithSubmodulePathException,
    FolderContentSizeLimitExceededException,
    InvalidBranchNameException,
    InvalidDeletionParameterException,
    InvalidEmailException,
    InvalidFileModeException,
    InvalidParentCommitIdException,
    InvalidPathException,
    InvalidRepositoryNameException,
    NameLengthExceededException,
    ParentCommitDoesNotExistException,
    ParentCommitIdOutdatedException,
    ParentCommitIdRequiredException,
    PathRequiredException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    SameFileContentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFile",
}));

export type PutRepositoryTriggersError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryNameException
  | InvalidRepositoryTriggerBranchNameException
  | InvalidRepositoryTriggerCustomDataException
  | InvalidRepositoryTriggerDestinationArnException
  | InvalidRepositoryTriggerEventsException
  | InvalidRepositoryTriggerNameException
  | InvalidRepositoryTriggerRegionException
  | MaximumBranchesExceededException
  | MaximumRepositoryTriggersExceededException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | RepositoryTriggerBranchNameListRequiredException
  | RepositoryTriggerDestinationArnRequiredException
  | RepositoryTriggerEventsListRequiredException
  | RepositoryTriggerNameRequiredException
  | RepositoryTriggersListRequiredException
  | CommonErrors;
/**
 * Replaces all triggers for a repository. Used to create or delete triggers.
 */
export const putRepositoryTriggers: API.OperationMethod<
  PutRepositoryTriggersInput,
  PutRepositoryTriggersOutput,
  PutRepositoryTriggersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutRepositoryTriggersInput,
  output: PutRepositoryTriggersOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidRepositoryNameException,
    InvalidRepositoryTriggerBranchNameException,
    InvalidRepositoryTriggerCustomDataException,
    InvalidRepositoryTriggerDestinationArnException,
    InvalidRepositoryTriggerEventsException,
    InvalidRepositoryTriggerNameException,
    InvalidRepositoryTriggerRegionException,
    MaximumBranchesExceededException,
    MaximumRepositoryTriggersExceededException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    RepositoryTriggerBranchNameListRequiredException,
    RepositoryTriggerDestinationArnRequiredException,
    RepositoryTriggerEventsListRequiredException,
    RepositoryTriggerNameRequiredException,
    RepositoryTriggersListRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRepositoryTriggers",
}));

export type TagResourceError =
  | InvalidRepositoryNameException
  | InvalidResourceArnException
  | InvalidSystemTagUsageException
  | InvalidTagsMapException
  | RepositoryDoesNotExistException
  | ResourceArnRequiredException
  | TagPolicyException
  | TagsMapRequiredException
  | TooManyTagsException
  | CommonErrors;
/**
 * Adds or updates tags for a resource in CodeCommit. For a list of valid resources
 * in CodeCommit, see CodeCommit Resources and Operations in the CodeCommit User
 * Guide.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceResponse,
  errors: [
    InvalidRepositoryNameException,
    InvalidResourceArnException,
    InvalidSystemTagUsageException,
    InvalidTagsMapException,
    RepositoryDoesNotExistException,
    ResourceArnRequiredException,
    TagPolicyException,
    TagsMapRequiredException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TestRepositoryTriggersError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryNameException
  | InvalidRepositoryTriggerBranchNameException
  | InvalidRepositoryTriggerCustomDataException
  | InvalidRepositoryTriggerDestinationArnException
  | InvalidRepositoryTriggerEventsException
  | InvalidRepositoryTriggerNameException
  | InvalidRepositoryTriggerRegionException
  | MaximumBranchesExceededException
  | MaximumRepositoryTriggersExceededException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | RepositoryTriggerBranchNameListRequiredException
  | RepositoryTriggerDestinationArnRequiredException
  | RepositoryTriggerEventsListRequiredException
  | RepositoryTriggerNameRequiredException
  | RepositoryTriggersListRequiredException
  | CommonErrors;
/**
 * Tests the functionality of repository triggers by sending information to the trigger
 * target. If real data is available in the repository, the test sends data from the last
 * commit. If no data is available, sample data is generated.
 */
export const testRepositoryTriggers: API.OperationMethod<
  TestRepositoryTriggersInput,
  TestRepositoryTriggersOutput,
  TestRepositoryTriggersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TestRepositoryTriggersInput,
  output: TestRepositoryTriggersOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidRepositoryNameException,
    InvalidRepositoryTriggerBranchNameException,
    InvalidRepositoryTriggerCustomDataException,
    InvalidRepositoryTriggerDestinationArnException,
    InvalidRepositoryTriggerEventsException,
    InvalidRepositoryTriggerNameException,
    InvalidRepositoryTriggerRegionException,
    MaximumBranchesExceededException,
    MaximumRepositoryTriggersExceededException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
    RepositoryTriggerBranchNameListRequiredException,
    RepositoryTriggerDestinationArnRequiredException,
    RepositoryTriggerEventsListRequiredException,
    RepositoryTriggerNameRequiredException,
    RepositoryTriggersListRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestRepositoryTriggers",
}));

export type UntagResourceError =
  | InvalidRepositoryNameException
  | InvalidResourceArnException
  | InvalidSystemTagUsageException
  | InvalidTagKeysListException
  | RepositoryDoesNotExistException
  | ResourceArnRequiredException
  | TagKeysListRequiredException
  | TagPolicyException
  | TooManyTagsException
  | CommonErrors;
/**
 * Removes tags for a resource in CodeCommit. For a list of valid resources in CodeCommit, see CodeCommit Resources and Operations in the CodeCommit User
 * Guide.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceResponse,
  errors: [
    InvalidRepositoryNameException,
    InvalidResourceArnException,
    InvalidSystemTagUsageException,
    InvalidTagKeysListException,
    RepositoryDoesNotExistException,
    ResourceArnRequiredException,
    TagKeysListRequiredException,
    TagPolicyException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateApprovalRuleTemplateContentError =
  | ApprovalRuleTemplateContentRequiredException
  | ApprovalRuleTemplateDoesNotExistException
  | ApprovalRuleTemplateNameRequiredException
  | InvalidApprovalRuleTemplateContentException
  | InvalidApprovalRuleTemplateNameException
  | InvalidRuleContentSha256Exception
  | CommonErrors;
/**
 * Updates the content of an approval rule template. You can change the number of
 * required approvals, the membership of the approval rule, and whether an approval pool is
 * defined.
 */
export const updateApprovalRuleTemplateContent: API.OperationMethod<
  UpdateApprovalRuleTemplateContentInput,
  UpdateApprovalRuleTemplateContentOutput,
  UpdateApprovalRuleTemplateContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApprovalRuleTemplateContentInput,
  output: UpdateApprovalRuleTemplateContentOutput,
  errors: [
    ApprovalRuleTemplateContentRequiredException,
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameRequiredException,
    InvalidApprovalRuleTemplateContentException,
    InvalidApprovalRuleTemplateNameException,
    InvalidRuleContentSha256Exception,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApprovalRuleTemplateContent",
}));

export type UpdateApprovalRuleTemplateDescriptionError =
  | ApprovalRuleTemplateDoesNotExistException
  | ApprovalRuleTemplateNameRequiredException
  | InvalidApprovalRuleTemplateDescriptionException
  | InvalidApprovalRuleTemplateNameException
  | CommonErrors;
/**
 * Updates the description for a specified approval rule template.
 */
export const updateApprovalRuleTemplateDescription: API.OperationMethod<
  UpdateApprovalRuleTemplateDescriptionInput,
  UpdateApprovalRuleTemplateDescriptionOutput,
  UpdateApprovalRuleTemplateDescriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApprovalRuleTemplateDescriptionInput,
  output: UpdateApprovalRuleTemplateDescriptionOutput,
  errors: [
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameRequiredException,
    InvalidApprovalRuleTemplateDescriptionException,
    InvalidApprovalRuleTemplateNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApprovalRuleTemplateDescription",
}));

export type UpdateApprovalRuleTemplateNameError =
  | ApprovalRuleTemplateDoesNotExistException
  | ApprovalRuleTemplateNameAlreadyExistsException
  | ApprovalRuleTemplateNameRequiredException
  | InvalidApprovalRuleTemplateNameException
  | CommonErrors;
/**
 * Updates the name of a specified approval rule template.
 */
export const updateApprovalRuleTemplateName: API.OperationMethod<
  UpdateApprovalRuleTemplateNameInput,
  UpdateApprovalRuleTemplateNameOutput,
  UpdateApprovalRuleTemplateNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApprovalRuleTemplateNameInput,
  output: UpdateApprovalRuleTemplateNameOutput,
  errors: [
    ApprovalRuleTemplateDoesNotExistException,
    ApprovalRuleTemplateNameAlreadyExistsException,
    ApprovalRuleTemplateNameRequiredException,
    InvalidApprovalRuleTemplateNameException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApprovalRuleTemplateName",
}));

export type UpdateCommentError =
  | CommentContentRequiredException
  | CommentContentSizeLimitExceededException
  | CommentDeletedException
  | CommentDoesNotExistException
  | CommentIdRequiredException
  | CommentNotCreatedByCallerException
  | InvalidCommentIdException
  | CommonErrors;
/**
 * Replaces the contents of a comment.
 */
export const updateComment: API.OperationMethod<
  UpdateCommentInput,
  UpdateCommentOutput,
  UpdateCommentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCommentInput,
  output: UpdateCommentOutput,
  errors: [
    CommentContentRequiredException,
    CommentContentSizeLimitExceededException,
    CommentDeletedException,
    CommentDoesNotExistException,
    CommentIdRequiredException,
    CommentNotCreatedByCallerException,
    InvalidCommentIdException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateComment",
}));

export type UpdateDefaultBranchError =
  | BranchDoesNotExistException
  | BranchNameRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidBranchNameException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Sets or changes the default branch name for the specified repository.
 *
 * If you use this operation to change the default branch name to the current default branch name, a success message is returned even though the default branch did not change.
 */
export const updateDefaultBranch: API.OperationMethod<
  UpdateDefaultBranchInput,
  UpdateDefaultBranchResponse,
  UpdateDefaultBranchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDefaultBranchInput,
  output: UpdateDefaultBranchResponse,
  errors: [
    BranchDoesNotExistException,
    BranchNameRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidBranchNameException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDefaultBranch",
}));

export type UpdatePullRequestApprovalRuleContentError =
  | ApprovalRuleContentRequiredException
  | ApprovalRuleDoesNotExistException
  | ApprovalRuleNameRequiredException
  | CannotModifyApprovalRuleFromTemplateException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidApprovalRuleContentException
  | InvalidApprovalRuleNameException
  | InvalidPullRequestIdException
  | InvalidRuleContentSha256Exception
  | PullRequestAlreadyClosedException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | CommonErrors;
/**
 * Updates the structure of an approval rule created specifically for a pull request. For example, you can change the number of required approvers and
 * the approval pool for approvers.
 */
export const updatePullRequestApprovalRuleContent: API.OperationMethod<
  UpdatePullRequestApprovalRuleContentInput,
  UpdatePullRequestApprovalRuleContentOutput,
  UpdatePullRequestApprovalRuleContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePullRequestApprovalRuleContentInput,
  output: UpdatePullRequestApprovalRuleContentOutput,
  errors: [
    ApprovalRuleContentRequiredException,
    ApprovalRuleDoesNotExistException,
    ApprovalRuleNameRequiredException,
    CannotModifyApprovalRuleFromTemplateException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidApprovalRuleContentException,
    InvalidApprovalRuleNameException,
    InvalidPullRequestIdException,
    InvalidRuleContentSha256Exception,
    PullRequestAlreadyClosedException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePullRequestApprovalRuleContent",
}));

export type UpdatePullRequestApprovalStateError =
  | ApprovalStateRequiredException
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidApprovalStateException
  | InvalidPullRequestIdException
  | InvalidRevisionIdException
  | MaximumNumberOfApprovalsExceededException
  | PullRequestAlreadyClosedException
  | PullRequestCannotBeApprovedByAuthorException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | RevisionIdRequiredException
  | RevisionNotCurrentException
  | CommonErrors;
/**
 * Updates the state of a user's approval on a pull request. The user is derived from the signed-in account when the request is made.
 */
export const updatePullRequestApprovalState: API.OperationMethod<
  UpdatePullRequestApprovalStateInput,
  UpdatePullRequestApprovalStateResponse,
  UpdatePullRequestApprovalStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePullRequestApprovalStateInput,
  output: UpdatePullRequestApprovalStateResponse,
  errors: [
    ApprovalStateRequiredException,
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidApprovalStateException,
    InvalidPullRequestIdException,
    InvalidRevisionIdException,
    MaximumNumberOfApprovalsExceededException,
    PullRequestAlreadyClosedException,
    PullRequestCannotBeApprovedByAuthorException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    RevisionIdRequiredException,
    RevisionNotCurrentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePullRequestApprovalState",
}));

export type UpdatePullRequestDescriptionError =
  | InvalidDescriptionException
  | InvalidPullRequestIdException
  | PullRequestAlreadyClosedException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | CommonErrors;
/**
 * Replaces the contents of the description of a pull request.
 */
export const updatePullRequestDescription: API.OperationMethod<
  UpdatePullRequestDescriptionInput,
  UpdatePullRequestDescriptionOutput,
  UpdatePullRequestDescriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePullRequestDescriptionInput,
  output: UpdatePullRequestDescriptionOutput,
  errors: [
    InvalidDescriptionException,
    InvalidPullRequestIdException,
    PullRequestAlreadyClosedException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePullRequestDescription",
}));

export type UpdatePullRequestStatusError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidPullRequestIdException
  | InvalidPullRequestStatusException
  | InvalidPullRequestStatusUpdateException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | PullRequestStatusRequiredException
  | CommonErrors;
/**
 * Updates the status of a pull request.
 */
export const updatePullRequestStatus: API.OperationMethod<
  UpdatePullRequestStatusInput,
  UpdatePullRequestStatusOutput,
  UpdatePullRequestStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePullRequestStatusInput,
  output: UpdatePullRequestStatusOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidPullRequestIdException,
    InvalidPullRequestStatusException,
    InvalidPullRequestStatusUpdateException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    PullRequestStatusRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePullRequestStatus",
}));

export type UpdatePullRequestTitleError =
  | InvalidPullRequestIdException
  | InvalidTitleException
  | PullRequestAlreadyClosedException
  | PullRequestDoesNotExistException
  | PullRequestIdRequiredException
  | TitleRequiredException
  | CommonErrors;
/**
 * Replaces the title of a pull request.
 */
export const updatePullRequestTitle: API.OperationMethod<
  UpdatePullRequestTitleInput,
  UpdatePullRequestTitleOutput,
  UpdatePullRequestTitleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePullRequestTitleInput,
  output: UpdatePullRequestTitleOutput,
  errors: [
    InvalidPullRequestIdException,
    InvalidTitleException,
    PullRequestAlreadyClosedException,
    PullRequestDoesNotExistException,
    PullRequestIdRequiredException,
    TitleRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePullRequestTitle",
}));

export type UpdateRepositoryDescriptionError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyNotFoundException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryDescriptionException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Sets or changes the comment or description for a repository.
 *
 * The description field for a repository accepts all HTML characters and all valid
 * Unicode characters. Applications that do not HTML-encode the description and display
 * it in a webpage can expose users to potentially malicious code. Make sure that you
 * HTML-encode the description field in any application that uses this API to display
 * the repository description on a webpage.
 */
export const updateRepositoryDescription: API.OperationMethod<
  UpdateRepositoryDescriptionInput,
  UpdateRepositoryDescriptionResponse,
  UpdateRepositoryDescriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRepositoryDescriptionInput,
  output: UpdateRepositoryDescriptionResponse,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyNotFoundException,
    EncryptionKeyUnavailableException,
    InvalidRepositoryDescriptionException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRepositoryDescription",
}));

export type UpdateRepositoryEncryptionKeyError =
  | EncryptionIntegrityChecksFailedException
  | EncryptionKeyAccessDeniedException
  | EncryptionKeyDisabledException
  | EncryptionKeyInvalidIdException
  | EncryptionKeyInvalidUsageException
  | EncryptionKeyNotFoundException
  | EncryptionKeyRequiredException
  | EncryptionKeyUnavailableException
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Updates the Key Management Service encryption key used to encrypt and decrypt a CodeCommit repository.
 */
export const updateRepositoryEncryptionKey: API.OperationMethod<
  UpdateRepositoryEncryptionKeyInput,
  UpdateRepositoryEncryptionKeyOutput,
  UpdateRepositoryEncryptionKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRepositoryEncryptionKeyInput,
  output: UpdateRepositoryEncryptionKeyOutput,
  errors: [
    EncryptionIntegrityChecksFailedException,
    EncryptionKeyAccessDeniedException,
    EncryptionKeyDisabledException,
    EncryptionKeyInvalidIdException,
    EncryptionKeyInvalidUsageException,
    EncryptionKeyNotFoundException,
    EncryptionKeyRequiredException,
    EncryptionKeyUnavailableException,
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRepositoryEncryptionKey",
}));

export type UpdateRepositoryNameError =
  | InvalidRepositoryNameException
  | RepositoryDoesNotExistException
  | RepositoryNameExistsException
  | RepositoryNameRequiredException
  | CommonErrors;
/**
 * Renames a repository. The repository name must be unique across the calling Amazon Web Services account.
 * Repository names are limited to 100 alphanumeric, dash, and underscore
 * characters, and cannot include certain characters. The suffix .git is prohibited. For
 * more information about the limits on repository names, see Quotas in the CodeCommit
 * User Guide.
 */
export const updateRepositoryName: API.OperationMethod<
  UpdateRepositoryNameInput,
  UpdateRepositoryNameResponse,
  UpdateRepositoryNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRepositoryNameInput,
  output: UpdateRepositoryNameResponse,
  errors: [
    InvalidRepositoryNameException,
    RepositoryDoesNotExistException,
    RepositoryNameExistsException,
    RepositoryNameRequiredException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRepositoryName",
}));
