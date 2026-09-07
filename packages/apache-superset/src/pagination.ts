/**
 * Apache Superset pagination — hand-written.
 *
 * List operations that stamp `smithy.api#paginated` are traversed by core's
 * {@link paginateCursor}. Other list endpoints leave page/limit as plain
 * inputs.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
