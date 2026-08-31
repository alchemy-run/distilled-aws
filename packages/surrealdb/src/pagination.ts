/**
 * SurrealDB pagination — hand-written.
 *
 * Generated operations pass core's {@link paginateCursor} strategy to
 * `API.makePaginated` when the spec marks an op paginated. Most HTTP table
 * list endpoints use `limit`/`start` query params instead and stay as
 * plain operations.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
