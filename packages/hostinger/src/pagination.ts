/**
 * Hostinger pagination — hand-written.
 *
 * Hostinger's paginated list operations are page-number mode (`page` /
 * `per_page` in, `{ data, meta: { current_page, per_page, total } }` out).
 * Generated operations that the converter stamps as paginated pass core's
 * {@link paginatePageNumber} or {@link paginateCursor} strategy to
 * `API.makePaginated`.
 */
export {
  paginateCursor,
  paginatePageNumber,
} from "@distilled.cloud/core/pagination";
