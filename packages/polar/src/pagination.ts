/**
 * Polar pagination — hand-written.
 *
 * Polar's paginated list operations are page-number mode (`page`/`limit`
 * in, `pagination.max_page` out, items under `items`). `max_page` is the
 * last page index, not the next page, so generated operations pass
 * {@link paginatePolar} rather than core's paginatePageNumber.
 */
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";
import * as Pagination from "@distilled.cloud/core/pagination";

/**
 * Increment `page` from 1 until it reaches `pagination.max_page` (or a page
 * comes back with no items).
 */
export const paginatePolar: Pagination.PaginationStrategy = (
  operation,
  input,
  pagination,
) => {
  const inputToken = pagination.inputToken;
  const outputToken = pagination.outputToken;
  if (!inputToken || !outputToken) {
    return Stream.die(
      new Error("Polar page pagination requires inputToken and outputToken"),
    );
  }

  type State = { page: number; done: boolean };
  const startPage =
    typeof input[inputToken] === "number" ? (input[inputToken] as number) : 1;

  return Stream.unfold({ page: startPage, done: false } as State, (state) =>
    Effect.gen(function* () {
      if (state.done) return undefined;

      const requestPayload = {
        ...input,
        [inputToken]: state.page,
      } as typeof input;
      const response = yield* operation(requestPayload);
      const maxPage = Pagination.getPath(response, outputToken) as
        | number
        | null
        | undefined;
      const items = pagination.items
        ? (Pagination.getPath(response, pagination.items) as
            | readonly unknown[]
            | undefined)
        : undefined;

      return [
        response,
        {
          page: state.page + 1,
          done:
            (typeof maxPage === "number" && state.page >= maxPage) ||
            maxPage === null ||
            maxPage === undefined ||
            (items !== undefined && items.length === 0),
        },
      ] as const;
    }),
  );
};
