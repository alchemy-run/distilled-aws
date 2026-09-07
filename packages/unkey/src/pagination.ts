/**
 * Unkey pagination — hand-written.
 *
 * Unkey's paginated list operations are all cursor-mode (`cursor` in,
 * `pagination.cursor` out, items under `data`); generated operations pass
 * core's {@link paginateCursor} strategy to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
