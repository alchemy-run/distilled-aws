/**
 * Auth0 pagination — hand-written.
 *
 * Auth0's paginated list operations are typically page-number mode (`page`
 * / `per_page` in); some endpoints also use checkpoint/cursor style
 * (`from` / `take`). Generated operations pass the matching core strategy
 * to `API.makePaginated`.
 */
export {
  paginateCursor,
  paginatePageNumber,
} from "@distilled.cloud/core/pagination";
