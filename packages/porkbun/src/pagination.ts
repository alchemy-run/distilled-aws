/**
 * Porkbun pagination — hand-written.
 *
 * Porkbun list operations are typically single-page responses; generated
 * operations that the converter stamps as cursor-mode pass core's
 * {@link paginateCursor} strategy to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
