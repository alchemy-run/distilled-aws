/**
 * DigitalOcean pagination — hand-written.
 *
 * List operations that the converter stamps as paginated are either
 * page-number mode (`page` in, `next_page` out) or cursor mode (`cursor`
 * in, `pagination.cursor` out). Generated operations pass the matching
 * core strategy to `API.makePaginated`.
 */
export {
  paginateCursor,
  paginatePageNumber,
} from "@distilled.cloud/core/pagination";
