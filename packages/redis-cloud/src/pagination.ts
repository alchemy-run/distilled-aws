/**
 * Redis Cloud pagination — hand-written.
 *
 * A few list operations take `offset`/`limit` query parameters; they stay
 * ordinary optional input fields (the spec does not declare a next-page
 * token). Core's {@link paginateCursor} is re-exported for callers that
 * assemble their own loops.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
