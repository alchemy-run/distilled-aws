/**
 * OpenCode pagination — hand-written.
 *
 * Paginated list operations use cursor-mode (`cursor` in, `pagination.cursor`
 * out); generated operations pass core's {@link paginateCursor} strategy to
 * `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
