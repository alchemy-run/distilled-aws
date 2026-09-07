/**
 * LaunchDarkly pagination — hand-written.
 *
 * LaunchDarkly paginated list operations use `limit`/`offset` on the wire;
 * generated operations that the converter stamps as cursor-mode pass core's
 * {@link paginateCursor} strategy to `API.makePaginated`.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
