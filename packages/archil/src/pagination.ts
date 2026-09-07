/**
 * Archil pagination — hand-written.
 *
 * Archil's paginated list operations are cursor-mode (`cursor` in, `limit`
 * page size); generated operations pass core's {@link paginateCursor}
 * strategy to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
