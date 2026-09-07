/**
 * Temporal pagination — hand-written.
 *
 * Temporal's paginated list operations are cursor-mode (`nextPageToken` in
 * and out); generated operations pass core's {@link paginateCursor} strategy
 * to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
