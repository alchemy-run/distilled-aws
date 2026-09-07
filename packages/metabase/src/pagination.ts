/**
 * Metabase pagination — hand-written.
 *
 * Metabase list endpoints do not declare a shared next-page token in the
 * published OpenAPI document; generated operations that do not stamp
 * `smithy.api#paginated` leave paging fields as plain inputs.
 * {@link paginateCursor} is re-exported for callers that want to drive a
 * cursor loop themselves.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
