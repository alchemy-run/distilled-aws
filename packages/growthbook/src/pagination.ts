/**
 * GrowthBook pagination — hand-written.
 *
 * GrowthBook's paginated list operations are offset/limit (`offset`/`limit`
 * in, `nextOffset` out). Generated operations pass core's
 * {@link paginateToken} strategy to `API.makePaginated`, feeding
 * `nextOffset` back as the next `offset` until it comes back null.
 */
export { paginateToken } from "@distilled.cloud/core/pagination";
