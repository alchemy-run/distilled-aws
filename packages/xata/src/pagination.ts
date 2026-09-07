/**
 * Xata pagination — hand-written.
 *
 * Xata's paginated list operations use cursor-mode (`cursor` in); generated
 * operations pass core's {@link paginateCursor} strategy to
 * `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
