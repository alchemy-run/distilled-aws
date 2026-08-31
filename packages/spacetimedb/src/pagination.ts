/**
 * SpacetimeDB pagination — hand-written.
 *
 * The HTTP management API is not cursor-paginated; this re-export is kept so
 * the runtime surface matches the other REST SDKs.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
