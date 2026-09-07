/**
 * PlanetScale pagination — hand-written.
 *
 * PlanetScale's paginated list operations are all page-number mode (`page`
 * in, `next_page` out, items under `data`); generated operations pass
 * core's {@link paginatePageNumber} strategy to `API.makePaginated`.
 */
export { paginatePageNumber } from "@distilled.cloud/core/pagination";
