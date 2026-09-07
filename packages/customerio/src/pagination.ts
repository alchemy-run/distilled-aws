/**
 * Customer.io pagination — hand-written.
 *
 * Paginated list operations that the converter stamps as cursor-mode
 * (`cursor` in, `pagination.cursor` out) pass core's {@link paginateCursor}
 * strategy to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
