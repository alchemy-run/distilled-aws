/**
 * Railway pagination — hand-written.
 *
 * Every paginated Railway operation is a Relay connection: `after` / `first`
 * go in, `{ edges { cursor node }, pageInfo { endCursor hasNextPage } }`
 * comes back. Generated operations pass core's {@link paginateRelay} strategy
 * to `API.makePaginated`, which follows `pageInfo.endCursor` for as long as
 * `pageInfo.hasNextPage` holds.
 *
 * `.pages(input)` streams whole connections; `.items(input)` streams the
 * **nodes** — the pagination trait's items path (`edges.node`) reaches
 * through the edge wrappers, so callers never handle edges unless they want
 * the cursors.
 *
 * @example
 * ```ts
 * import * as Stream from "effect/Stream";
 * import { projects } from "@distilled.cloud/railway";
 *
 * // every project across every page, one at a time
 * yield* projects.items({ first: 50 }).pipe(
 *   Stream.runForEach((project) => Console.log(project.name)),
 * );
 * ```
 */
export {
  paginateRelay,
  extractItems,
  getItems,
  getPath,
  type PaginatedTrait,
  type PaginationStrategy,
} from "@distilled.cloud/core/pagination";
