/**
 * Clerk pagination — hand-written.
 *
 * List operations that the converter marks as cursor-paginated are traversed
 * by core's {@link paginateCursor}. Clerk's typical list shape is
 * `limit`/`offset`; those stay plain input fields unless the spec stamps a
 * pagination trait.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
