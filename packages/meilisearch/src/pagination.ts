/**
 * Meilisearch pagination — hand-written.
 *
 * Meilisearch's task/batch list operations are cursor-mode (`from` in,
 * `next` out); generated operations pass core's {@link paginateCursor}
 * strategy to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
