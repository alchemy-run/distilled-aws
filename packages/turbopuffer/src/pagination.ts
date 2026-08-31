/**
 * turbopuffer pagination — hand-written.
 *
 * List-namespace operations are cursor-mode (`cursor` in, `next_cursor`
 * out when the spec is annotated); generated operations pass core's
 * {@link paginateCursor} strategy to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
