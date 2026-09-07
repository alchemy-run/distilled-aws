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
  sdkId: "ManagedBlockchain Query",
  serviceShapeName: "TietonChainQueryService",
});
const auth = T.AwsAuthSigv4({ name: "managedblockchain-query" });
const ver = T.ServiceVersion("2023-05-04");
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
              `https://managedblockchain-query-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://managedblockchain-query-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://managedblockchain-query.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://managedblockchain-query.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      serviceCode: S.String,
      quotaCode: S.String,
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
    },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.String,
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type QueryNetwork = string;
export type ChainAddress = string;
export type QueryTokenId = string;
export interface TokenIdentifier {
  network: string;
  contractAddress?: string;
  tokenId?: string;
}
export const TokenIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    network: S.String,
    contractAddress: S.optional(S.String),
    tokenId: S.optional(S.String),
  }),
).annotate({
  identifier: "TokenIdentifier",
}) as any as S.Schema<TokenIdentifier>;
export interface OwnerIdentifier {
  address: string;
}
export const OwnerIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ address: S.String }),
).annotate({
  identifier: "OwnerIdentifier",
}) as any as S.Schema<OwnerIdentifier>;
export interface BlockchainInstant {
  time?: Date;
}
export const BlockchainInstant = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    time: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "BlockchainInstant",
}) as any as S.Schema<BlockchainInstant>;
export interface BatchGetTokenBalanceInputItem {
  tokenIdentifier: TokenIdentifier;
  ownerIdentifier: OwnerIdentifier;
  atBlockchainInstant?: BlockchainInstant;
}
export const BatchGetTokenBalanceInputItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tokenIdentifier: TokenIdentifier,
    ownerIdentifier: OwnerIdentifier,
    atBlockchainInstant: S.optional(BlockchainInstant),
  }),
).annotate({
  identifier: "BatchGetTokenBalanceInputItem",
}) as any as S.Schema<BatchGetTokenBalanceInputItem>;
export type GetTokenBalanceInputList = BatchGetTokenBalanceInputItem[];
export const GetTokenBalanceInputList = /*@__PURE__*/ S.Array(
  BatchGetTokenBalanceInputItem,
);
export interface BatchGetTokenBalanceInput {
  getTokenBalanceInputs?: BatchGetTokenBalanceInputItem[];
}
export const BatchGetTokenBalanceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    getTokenBalanceInputs: S.optional(GetTokenBalanceInputList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/batch-get-token-balance" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetTokenBalanceInput",
}) as any as S.Schema<BatchGetTokenBalanceInput>;
export interface BatchGetTokenBalanceOutputItem {
  ownerIdentifier?: OwnerIdentifier;
  tokenIdentifier?: TokenIdentifier;
  balance: string;
  atBlockchainInstant: BlockchainInstant;
  lastUpdatedTime?: BlockchainInstant;
}
export const BatchGetTokenBalanceOutputItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ownerIdentifier: S.optional(OwnerIdentifier),
    tokenIdentifier: S.optional(TokenIdentifier),
    balance: S.String,
    atBlockchainInstant: BlockchainInstant,
    lastUpdatedTime: S.optional(BlockchainInstant),
  }),
).annotate({
  identifier: "BatchGetTokenBalanceOutputItem",
}) as any as S.Schema<BatchGetTokenBalanceOutputItem>;
export type BatchGetTokenBalanceOutputList = BatchGetTokenBalanceOutputItem[];
export const BatchGetTokenBalanceOutputList = /*@__PURE__*/ S.Array(
  BatchGetTokenBalanceOutputItem,
);
export type ErrorType = string;
export interface BatchGetTokenBalanceErrorItem {
  tokenIdentifier?: TokenIdentifier;
  ownerIdentifier?: OwnerIdentifier;
  atBlockchainInstant?: BlockchainInstant;
  errorCode: string;
  errorMessage: string;
  errorType: string;
}
export const BatchGetTokenBalanceErrorItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tokenIdentifier: S.optional(TokenIdentifier),
    ownerIdentifier: S.optional(OwnerIdentifier),
    atBlockchainInstant: S.optional(BlockchainInstant),
    errorCode: S.String,
    errorMessage: S.String,
    errorType: S.String,
  }),
).annotate({
  identifier: "BatchGetTokenBalanceErrorItem",
}) as any as S.Schema<BatchGetTokenBalanceErrorItem>;
export type BatchGetTokenBalanceErrors = BatchGetTokenBalanceErrorItem[];
export const BatchGetTokenBalanceErrors = /*@__PURE__*/ S.Array(
  BatchGetTokenBalanceErrorItem,
);
export interface BatchGetTokenBalanceOutput {
  tokenBalances: BatchGetTokenBalanceOutputItem[];
  errors: BatchGetTokenBalanceErrorItem[];
}
export const BatchGetTokenBalanceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tokenBalances: BatchGetTokenBalanceOutputList,
    errors: BatchGetTokenBalanceErrors,
  }),
).annotate({
  identifier: "BatchGetTokenBalanceOutput",
}) as any as S.Schema<BatchGetTokenBalanceOutput>;
export interface ContractIdentifier {
  network: string;
  contractAddress: string;
}
export const ContractIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ network: S.String, contractAddress: S.String }),
).annotate({
  identifier: "ContractIdentifier",
}) as any as S.Schema<ContractIdentifier>;
export interface GetAssetContractInput {
  contractIdentifier: ContractIdentifier;
}
export const GetAssetContractInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ contractIdentifier: ContractIdentifier }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-asset-contract" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAssetContractInput",
}) as any as S.Schema<GetAssetContractInput>;
export type QueryTokenStandard = string;
export interface ContractMetadata {
  name?: string;
  symbol?: string;
  decimals?: number;
}
export const ContractMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    symbol: S.optional(S.String),
    decimals: S.optional(S.Number),
  }),
).annotate({
  identifier: "ContractMetadata",
}) as any as S.Schema<ContractMetadata>;
export interface GetAssetContractOutput {
  contractIdentifier: ContractIdentifier;
  tokenStandard: string;
  deployerAddress: string;
  metadata?: ContractMetadata;
}
export const GetAssetContractOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contractIdentifier: ContractIdentifier,
    tokenStandard: S.String,
    deployerAddress: S.String,
    metadata: S.optional(ContractMetadata),
  }),
).annotate({
  identifier: "GetAssetContractOutput",
}) as any as S.Schema<GetAssetContractOutput>;
export interface GetTokenBalanceInput {
  tokenIdentifier: TokenIdentifier;
  ownerIdentifier: OwnerIdentifier;
  atBlockchainInstant?: BlockchainInstant;
}
export const GetTokenBalanceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tokenIdentifier: TokenIdentifier,
    ownerIdentifier: OwnerIdentifier,
    atBlockchainInstant: S.optional(BlockchainInstant),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-token-balance" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTokenBalanceInput",
}) as any as S.Schema<GetTokenBalanceInput>;
export interface GetTokenBalanceOutput {
  ownerIdentifier?: OwnerIdentifier;
  tokenIdentifier?: TokenIdentifier;
  balance: string;
  atBlockchainInstant: BlockchainInstant;
  lastUpdatedTime?: BlockchainInstant;
}
export const GetTokenBalanceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ownerIdentifier: S.optional(OwnerIdentifier),
    tokenIdentifier: S.optional(TokenIdentifier),
    balance: S.String,
    atBlockchainInstant: BlockchainInstant,
    lastUpdatedTime: S.optional(BlockchainInstant),
  }),
).annotate({
  identifier: "GetTokenBalanceOutput",
}) as any as S.Schema<GetTokenBalanceOutput>;
export type QueryTransactionHash = string;
export type QueryTransactionId = string;
export interface GetTransactionInput {
  transactionHash?: string;
  transactionId?: string;
  network: string;
}
export const GetTransactionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    transactionHash: S.optional(S.String),
    transactionId: S.optional(S.String),
    network: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/get-transaction" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTransactionInput",
}) as any as S.Schema<GetTransactionInput>;
export type BlockHash = string;
export type ConfirmationStatus = string;
export type ExecutionStatus = string;
export interface Transaction {
  network: string;
  blockHash?: string;
  transactionHash: string;
  blockNumber?: string;
  transactionTimestamp: Date;
  transactionIndex: number;
  numberOfTransactions: number;
  to: string;
  from?: string;
  contractAddress?: string;
  gasUsed?: string;
  cumulativeGasUsed?: string;
  effectiveGasPrice?: string;
  signatureV?: number;
  signatureR?: string;
  signatureS?: string;
  transactionFee?: string;
  transactionId?: string;
  confirmationStatus?: string;
  executionStatus?: string;
}
export const Transaction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    network: S.String,
    blockHash: S.optional(S.String),
    transactionHash: S.String,
    blockNumber: S.optional(S.String),
    transactionTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    transactionIndex: S.Number,
    numberOfTransactions: S.Number,
    to: S.String,
    from: S.optional(S.String),
    contractAddress: S.optional(S.String),
    gasUsed: S.optional(S.String),
    cumulativeGasUsed: S.optional(S.String),
    effectiveGasPrice: S.optional(S.String),
    signatureV: S.optional(S.Number),
    signatureR: S.optional(S.String),
    signatureS: S.optional(S.String),
    transactionFee: S.optional(S.String),
    transactionId: S.optional(S.String),
    confirmationStatus: S.optional(S.String),
    executionStatus: S.optional(S.String),
  }),
).annotate({ identifier: "Transaction" }) as any as S.Schema<Transaction>;
export interface GetTransactionOutput {
  transaction: Transaction;
}
export const GetTransactionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ transaction: Transaction }),
).annotate({
  identifier: "GetTransactionOutput",
}) as any as S.Schema<GetTransactionOutput>;
export interface ContractFilter {
  network: string;
  tokenStandard: string;
  deployerAddress: string;
}
export const ContractFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    network: S.String,
    tokenStandard: S.String,
    deployerAddress: S.String,
  }),
).annotate({ identifier: "ContractFilter" }) as any as S.Schema<ContractFilter>;
export type NextToken = string;
export interface ListAssetContractsInput {
  contractFilter: ContractFilter;
  nextToken?: string;
  maxResults?: number;
}
export const ListAssetContractsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contractFilter: ContractFilter,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-asset-contracts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssetContractsInput",
}) as any as S.Schema<ListAssetContractsInput>;
export interface AssetContract {
  contractIdentifier: ContractIdentifier;
  tokenStandard: string;
  deployerAddress: string;
}
export const AssetContract = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contractIdentifier: ContractIdentifier,
    tokenStandard: S.String,
    deployerAddress: S.String,
  }),
).annotate({ identifier: "AssetContract" }) as any as S.Schema<AssetContract>;
export type AssetContractList = AssetContract[];
export const AssetContractList = /*@__PURE__*/ S.Array(AssetContract);
export interface ListAssetContractsOutput {
  contracts: AssetContract[];
  nextToken?: string;
}
export const ListAssetContractsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ contracts: AssetContractList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListAssetContractsOutput",
}) as any as S.Schema<ListAssetContractsOutput>;
export type ChainAddresses = string[];
export const ChainAddresses = /*@__PURE__*/ S.Array(S.String);
export interface AddressIdentifierFilter {
  transactionEventToAddress: string[];
}
export const AddressIdentifierFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ transactionEventToAddress: ChainAddresses }),
).annotate({
  identifier: "AddressIdentifierFilter",
}) as any as S.Schema<AddressIdentifierFilter>;
export interface TimeFilter {
  from?: BlockchainInstant;
  to?: BlockchainInstant;
}
export const TimeFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    from: S.optional(BlockchainInstant),
    to: S.optional(BlockchainInstant),
  }),
).annotate({ identifier: "TimeFilter" }) as any as S.Schema<TimeFilter>;
export interface VoutFilter {
  voutSpent: boolean;
}
export const VoutFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ voutSpent: S.Boolean }),
).annotate({ identifier: "VoutFilter" }) as any as S.Schema<VoutFilter>;
export type ConfirmationStatusIncludeList = string[];
export const ConfirmationStatusIncludeList = /*@__PURE__*/ S.Array(S.String);
export interface ConfirmationStatusFilter {
  include: string[];
}
export const ConfirmationStatusFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ include: ConfirmationStatusIncludeList }),
).annotate({
  identifier: "ConfirmationStatusFilter",
}) as any as S.Schema<ConfirmationStatusFilter>;
export type ListFilteredTransactionEventsSortBy = string;
export type SortOrder = string;
export interface ListFilteredTransactionEventsSort {
  sortBy?: string;
  sortOrder?: string;
}
export const ListFilteredTransactionEventsSort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sortBy: S.optional(S.String), sortOrder: S.optional(S.String) }),
).annotate({
  identifier: "ListFilteredTransactionEventsSort",
}) as any as S.Schema<ListFilteredTransactionEventsSort>;
export interface ListFilteredTransactionEventsInput {
  network: string;
  addressIdentifierFilter: AddressIdentifierFilter;
  timeFilter?: TimeFilter;
  voutFilter?: VoutFilter;
  confirmationStatusFilter?: ConfirmationStatusFilter;
  sort?: ListFilteredTransactionEventsSort;
  nextToken?: string;
  maxResults?: number;
}
export const ListFilteredTransactionEventsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    network: S.String,
    addressIdentifierFilter: AddressIdentifierFilter,
    timeFilter: S.optional(TimeFilter),
    voutFilter: S.optional(VoutFilter),
    confirmationStatusFilter: S.optional(ConfirmationStatusFilter),
    sort: S.optional(ListFilteredTransactionEventsSort),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-filtered-transaction-events" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFilteredTransactionEventsInput",
}) as any as S.Schema<ListFilteredTransactionEventsInput>;
export type QueryTransactionEventType = string;
export interface TransactionEvent {
  network: string;
  transactionHash: string;
  eventType: string;
  from?: string;
  to?: string;
  value?: string;
  contractAddress?: string;
  tokenId?: string;
  transactionId?: string;
  voutIndex?: number;
  voutSpent?: boolean;
  spentVoutTransactionId?: string;
  spentVoutTransactionHash?: string;
  spentVoutIndex?: number;
  blockchainInstant?: BlockchainInstant;
  confirmationStatus?: string;
}
export const TransactionEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    network: S.String,
    transactionHash: S.String,
    eventType: S.String,
    from: S.optional(S.String),
    to: S.optional(S.String),
    value: S.optional(S.String),
    contractAddress: S.optional(S.String),
    tokenId: S.optional(S.String),
    transactionId: S.optional(S.String),
    voutIndex: S.optional(S.Number),
    voutSpent: S.optional(S.Boolean),
    spentVoutTransactionId: S.optional(S.String),
    spentVoutTransactionHash: S.optional(S.String),
    spentVoutIndex: S.optional(S.Number),
    blockchainInstant: S.optional(BlockchainInstant),
    confirmationStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "TransactionEvent",
}) as any as S.Schema<TransactionEvent>;
export type TransactionEventList = TransactionEvent[];
export const TransactionEventList = /*@__PURE__*/ S.Array(TransactionEvent);
export interface ListFilteredTransactionEventsOutput {
  events: TransactionEvent[];
  nextToken?: string;
}
export const ListFilteredTransactionEventsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ events: TransactionEventList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListFilteredTransactionEventsOutput",
}) as any as S.Schema<ListFilteredTransactionEventsOutput>;
export interface OwnerFilter {
  address: string;
}
export const OwnerFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ address: S.String }),
).annotate({ identifier: "OwnerFilter" }) as any as S.Schema<OwnerFilter>;
export interface TokenFilter {
  network: string;
  contractAddress?: string;
  tokenId?: string;
}
export const TokenFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    network: S.String,
    contractAddress: S.optional(S.String),
    tokenId: S.optional(S.String),
  }),
).annotate({ identifier: "TokenFilter" }) as any as S.Schema<TokenFilter>;
export interface ListTokenBalancesInput {
  ownerFilter?: OwnerFilter;
  tokenFilter: TokenFilter;
  nextToken?: string;
  maxResults?: number;
}
export const ListTokenBalancesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ownerFilter: S.optional(OwnerFilter),
    tokenFilter: TokenFilter,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-token-balances" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTokenBalancesInput",
}) as any as S.Schema<ListTokenBalancesInput>;
export interface TokenBalance {
  ownerIdentifier?: OwnerIdentifier;
  tokenIdentifier?: TokenIdentifier;
  balance: string;
  atBlockchainInstant: BlockchainInstant;
  lastUpdatedTime?: BlockchainInstant;
}
export const TokenBalance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ownerIdentifier: S.optional(OwnerIdentifier),
    tokenIdentifier: S.optional(TokenIdentifier),
    balance: S.String,
    atBlockchainInstant: BlockchainInstant,
    lastUpdatedTime: S.optional(BlockchainInstant),
  }),
).annotate({ identifier: "TokenBalance" }) as any as S.Schema<TokenBalance>;
export type TokenBalanceList = TokenBalance[];
export const TokenBalanceList = /*@__PURE__*/ S.Array(TokenBalance);
export interface ListTokenBalancesOutput {
  tokenBalances: TokenBalance[];
  nextToken?: string;
}
export const ListTokenBalancesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    tokenBalances: TokenBalanceList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTokenBalancesOutput",
}) as any as S.Schema<ListTokenBalancesOutput>;
export interface ListTransactionEventsInput {
  transactionHash?: string;
  transactionId?: string;
  network: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListTransactionEventsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    transactionHash: S.optional(S.String),
    transactionId: S.optional(S.String),
    network: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-transaction-events" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTransactionEventsInput",
}) as any as S.Schema<ListTransactionEventsInput>;
export interface ListTransactionEventsOutput {
  events: TransactionEvent[];
  nextToken?: string;
}
export const ListTransactionEventsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ events: TransactionEventList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTransactionEventsOutput",
}) as any as S.Schema<ListTransactionEventsOutput>;
export type ListTransactionsSortBy = string;
export interface ListTransactionsSort {
  sortBy?: string;
  sortOrder?: string;
}
export const ListTransactionsSort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sortBy: S.optional(S.String), sortOrder: S.optional(S.String) }),
).annotate({
  identifier: "ListTransactionsSort",
}) as any as S.Schema<ListTransactionsSort>;
export interface ListTransactionsInput {
  address: string;
  network: string;
  fromBlockchainInstant?: BlockchainInstant;
  toBlockchainInstant?: BlockchainInstant;
  sort?: ListTransactionsSort;
  nextToken?: string;
  maxResults?: number;
  confirmationStatusFilter?: ConfirmationStatusFilter;
}
export const ListTransactionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    address: S.String,
    network: S.String,
    fromBlockchainInstant: S.optional(BlockchainInstant),
    toBlockchainInstant: S.optional(BlockchainInstant),
    sort: S.optional(ListTransactionsSort),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    confirmationStatusFilter: S.optional(ConfirmationStatusFilter),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/list-transactions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTransactionsInput",
}) as any as S.Schema<ListTransactionsInput>;
export interface TransactionOutputItem {
  transactionHash: string;
  transactionId?: string;
  network: string;
  transactionTimestamp: Date;
  confirmationStatus?: string;
}
export const TransactionOutputItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    transactionHash: S.String,
    transactionId: S.optional(S.String),
    network: S.String,
    transactionTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    confirmationStatus: S.optional(S.String),
  }),
).annotate({
  identifier: "TransactionOutputItem",
}) as any as S.Schema<TransactionOutputItem>;
export type TransactionOutputList = TransactionOutputItem[];
export const TransactionOutputList = /*@__PURE__*/ S.Array(
  TransactionOutputItem,
);
export interface ListTransactionsOutput {
  transactions: TransactionOutputItem[];
  nextToken?: string;
}
export const ListTransactionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    transactions: TransactionOutputList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTransactionsOutput",
}) as any as S.Schema<ListTransactionsOutput>;
export type ExceptionMessage = string;
export type ResourceId = string;
export type ResourceType = string;
export type ServiceCode = string;
export type QuotaCode = string;
export type ValidationExceptionReason = string;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type BatchGetTokenBalanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the token balance for a batch of tokens by using the `BatchGetTokenBalance`
 * action for every token in the request.
 *
 * Only the native tokens BTC and ETH, and the ERC-20,
 * ERC-721, and ERC 1155 token standards are supported.
 */
export const batchGetTokenBalance: API.OperationMethod<
  BatchGetTokenBalanceInput,
  BatchGetTokenBalanceOutput,
  BatchGetTokenBalanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetTokenBalanceInput,
  output: BatchGetTokenBalanceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetTokenBalance",
}));

export type GetAssetContractError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the information about a specific contract deployed on the blockchain.
 *
 * - The Bitcoin blockchain networks do not support this
 * operation.
 *
 * - Metadata is currently only available for some `ERC-20` contracts.
 * Metadata will be available for additional contracts in the future.
 */
export const getAssetContract: API.OperationMethod<
  GetAssetContractInput,
  GetAssetContractOutput,
  GetAssetContractError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAssetContractInput,
  output: GetAssetContractOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssetContract",
}));

export type GetTokenBalanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the balance of a specific token, including native tokens, for a given address (wallet or contract) on the blockchain.
 *
 * Only the native tokens BTC and ETH, and the ERC-20,
 * ERC-721, and ERC 1155 token standards are supported.
 */
export const getTokenBalance: API.OperationMethod<
  GetTokenBalanceInput,
  GetTokenBalanceOutput,
  GetTokenBalanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTokenBalanceInput,
  output: GetTokenBalanceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTokenBalance",
}));

export type GetTransactionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of a transaction.
 *
 * This action will return transaction details for all transactions
 * that are *confirmed* on the blockchain, even if they have not reached
 * finality.
 */
export const getTransaction: API.OperationMethod<
  GetTransactionInput,
  GetTransactionOutput,
  GetTransactionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTransactionInput,
  output: GetTransactionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTransaction",
}));

export type ListAssetContractsError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the contracts for a given contract type deployed by an address
 * (either a contract address or a wallet address).
 *
 * The Bitcoin blockchain networks do not support this
 * operation.
 */
export const listAssetContracts: API.PaginatedOperationMethod<
  ListAssetContractsInput,
  ListAssetContractsOutput,
  ListAssetContractsError,
  Credentials | HttpClient.HttpClient,
  AssetContract
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssetContractsInput,
  output: ListAssetContractsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetContracts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "contracts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFilteredTransactionEventsError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the transaction events for an address on the blockchain.
 *
 * This operation is only supported on the Bitcoin networks.
 */
export const listFilteredTransactionEvents: API.PaginatedOperationMethod<
  ListFilteredTransactionEventsInput,
  ListFilteredTransactionEventsOutput,
  ListFilteredTransactionEventsError,
  Credentials | HttpClient.HttpClient,
  TransactionEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFilteredTransactionEventsInput,
  output: ListFilteredTransactionEventsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFilteredTransactionEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "events",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTokenBalancesError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * This action returns the following for a given blockchain network:
 *
 * - Lists all token balances owned by an address (either a contract
 * address or a wallet address).
 *
 * - Lists all token balances for all tokens created by a contract.
 *
 * - Lists all token balances for a given token.
 *
 * You must always specify the network property of
 * the `tokenFilter` when using this operation.
 */
export const listTokenBalances: API.PaginatedOperationMethod<
  ListTokenBalancesInput,
  ListTokenBalancesOutput,
  ListTokenBalancesError,
  Credentials | HttpClient.HttpClient,
  TokenBalance
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTokenBalancesInput,
  output: ListTokenBalancesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTokenBalances",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tokenBalances",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTransactionEventsError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the transaction events for a transaction
 *
 * This action will return transaction details for all transactions
 * that are *confirmed* on the blockchain, even if they have not reached
 * finality.
 */
export const listTransactionEvents: API.PaginatedOperationMethod<
  ListTransactionEventsInput,
  ListTransactionEventsOutput,
  ListTransactionEventsError,
  Credentials | HttpClient.HttpClient,
  TransactionEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTransactionEventsInput,
  output: ListTransactionEventsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTransactionEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "events",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTransactionsError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the transaction events for a transaction.
 */
export const listTransactions: API.PaginatedOperationMethod<
  ListTransactionsInput,
  ListTransactionsOutput,
  ListTransactionsError,
  Credentials | HttpClient.HttpClient,
  TransactionOutputItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTransactionsInput,
  output: ListTransactionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTransactions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "transactions",
    pageSize: "maxResults",
  } as const,
})) as any;
