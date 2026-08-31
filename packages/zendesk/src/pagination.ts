/**
 * Zendesk pagination — hand-written.
 *
 * Zendesk list operations page with offset (`page` / `per_page`, `next_page`
 * URL out) and cursor (`page[after]` / `links`). Generated operations that
 * the converter stamps as paginated pass core's {@link paginateCursor} or
 * {@link paginatePageNumber} strategy to `API.makePaginated`.
 */
export {
  paginateCursor,
  paginatePageNumber,
} from "@distilled.cloud/core/pagination";
