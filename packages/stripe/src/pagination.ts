/**
 * Stripe pagination — hand-written.
 *
 * Only the GET …/search operations paginate (v0 parity): the converter
 * detects them as `mode: "page"` (inputToken `page`, outputToken
 * `next_page`, items `data`), but Stripe's `page` parameter is an OPAQUE
 * CURSOR — `next_page` is the next cursor string, not a page number — so
 * "page" mode traverses by following the cursor, exactly core's
 * `paginateCursor` semantics.
 *
 * Stripe's regular list endpoints (starting_after / ending_before +
 * has_more) are plain operations without the paginated surface, mirroring
 * distilled v0.
 */
import * as Pagination from "@distilled.cloud/core/pagination";

/** Dispatch on the operation's pagination mode, Stripe-style. */
export const stripeSearchPaginate: Pagination.PaginationStrategy = (
  operation,
  input,
  pagination,
) => {
  switch (pagination.mode) {
    case "page":
      // Stripe search: `page` is a cursor, `next_page` the next cursor.
      return Pagination.paginateCursor(operation, input, pagination);
    case "single":
      return Pagination.paginateSingle(operation, input, pagination);
    default:
      return Pagination.paginateWithDefaults(operation, input, pagination);
  }
};
