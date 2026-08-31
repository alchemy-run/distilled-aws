/**
 * Squarespace pagination — hand-written.
 *
 * Squarespace's paginated list operations are cursor-mode (`cursor` in,
 * `pagination.nextPageCursor` out); generated operations pass core's
 * {@link paginateCursor} strategy to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
