/**
 * Slack pagination — hand-written.
 *
 * Slack's cursor convention: pass `cursor` (from the previous response's
 * `response_metadata.next_cursor`), and an EMPTY `next_cursor` means the
 * last page — which is exactly core's cursor traversal (`isTerminalToken`
 * treats `""` as terminal). Paginated operations are compiled with this
 * strategy by scripts/generate.ts from the `smithy.api#paginated` traits the
 * converter stamps.
 *
 * @example
 * ```ts
 * import * as Effect from "effect/Effect";
 * import * as Stream from "effect/Stream";
 * import * as Users from "@distilled.cloud/slack/users";
 *
 * // Every member, cursors followed automatically:
 * const members = Users.list.items({ limit: 200 }).pipe(
 *   Stream.runCollect,
 * );
 * // Or page by page:
 * const pages = Users.list.pages({ limit: 200 });
 * ```
 */
import * as Pagination from "@distilled.cloud/core/pagination";

/**
 * Cursor traversal for Slack: follow `response_metadata.next_cursor` until
 * it comes back empty/absent.
 */
export const slackPaginate: Pagination.PaginationStrategy = (
  operation,
  input,
  pagination,
) => Pagination.paginateCursor(operation, input, pagination);
