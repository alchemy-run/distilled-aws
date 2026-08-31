/**
 * Datadog pagination — hand-written.
 *
 * Generated operations that the converter stamps as cursor-paginated pass
 * core's {@link paginateCursor} strategy to `API.makePaginated`. Many
 * Datadog list endpoints use `page[number]` / `page[size]` or `page[cursor]`
 * query parameters without an in-body next-page token; those stay plain
 * inputs.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
