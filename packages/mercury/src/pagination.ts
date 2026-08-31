/**
 * Mercury pagination — hand-written.
 *
 * Mercury's paginated list operations are cursor-mode (`start_after` in,
 * `page.nextPage` out); generated operations pass core's
 * {@link paginateCursor} strategy to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
