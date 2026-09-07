/**
 * Modrinth pagination — hand-written.
 *
 * Search uses `offset`/`limit`/`total_hits` on the wire; those stay plain
 * input fields unless a generated operation is stamped `smithy.api#paginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
