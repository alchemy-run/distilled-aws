/**
 * Gusto pagination — hand-written.
 *
 * Some Gusto list operations are cursor-mode (`starting_after_uuid` in);
 * generated operations that the converter marks paginated pass core's
 * {@link paginateCursor} strategy to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
