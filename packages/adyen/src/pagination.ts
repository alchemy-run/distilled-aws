/**
 * Adyen pagination — hand-written.
 *
 * Checkout list-style endpoints are not cursor-paginated; this re-export is
 * kept so generated operations can pass core's {@link paginateCursor}
 * strategy to `API.makePaginated` if a later spec adds one.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
