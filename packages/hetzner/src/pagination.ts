/**
 * Hetzner Cloud pagination — hand-written.
 *
 * Every paginated Hetzner list operation is page-number mode: `page` and
 * `per_page` in, and a root object carrying
 * `meta.pagination.next_page` — `null` once the last page is reached.
 * Generated operations pass core's {@link paginatePageNumber} strategy to
 * `API.makePaginated`, with the items path pointing at the collection key
 * beside `meta` (`servers`, `ssh_keys`, `actions`, …).
 */
export { paginatePageNumber } from "@distilled.cloud/core/pagination";
