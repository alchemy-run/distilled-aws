/**
 * Chronosphere pagination — hand-written.
 *
 * Chronosphere's paginated list operations are cursor-mode (`page.token` in,
 * `page.next_token` out); generated operations pass core's
 * {@link paginateCursor} strategy to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
