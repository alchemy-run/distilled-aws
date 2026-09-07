/**
 * Plaid pagination — hand-written.
 *
 * Plaid's paginated list operations are cursor-mode (`cursor` in,
 * `pagination.cursor` out); generated operations pass core's
 * {@link paginateCursor} strategy to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
