/**
 * Intercom pagination — hand-written.
 *
 * Intercom's paginated list operations are cursor-mode (`starting_after` in,
 * `pages.next.starting_after` out); generated operations pass core's
 * {@link paginateCursor} strategy to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
