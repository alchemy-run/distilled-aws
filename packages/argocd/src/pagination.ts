/**
 * Argo CD pagination — hand-written.
 *
 * Generated operations that stamp `smithy.api#paginated` pass core's
 * {@link paginateCursor} strategy to `API.makePaginated`. List endpoints
 * without an in-body next-page token stay plain operations.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
