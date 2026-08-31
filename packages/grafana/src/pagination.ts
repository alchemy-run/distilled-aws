/**
 * Grafana pagination — hand-written.
 *
 * Grafana list endpoints mix `page`/`limit`/`perpage` query parameters and
 * rarely return an in-body next-page token; generated operations that do
 * not stamp `smithy.api#paginated` leave those fields as plain inputs.
 * {@link paginateCursor} is re-exported for callers that want to drive a
 * cursor loop themselves.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
