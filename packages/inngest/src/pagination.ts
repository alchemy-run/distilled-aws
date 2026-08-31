/**
 * Inngest pagination — hand-written.
 *
 * Inngest's paginated list operations are all cursor-mode (`cursor` in,
 * `page.cursor` out, items under `data`); generated operations pass
 * core's {@link paginateCursor} strategy to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
