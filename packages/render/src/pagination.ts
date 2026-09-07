/**
 * Render pagination — hand-written.
 *
 * Render's list operations are cursor-mode (`cursor`/`limit` in). Most lists
 * return a bare array of `{ cursor, <resource> }` objects; the next page is
 * requested with the last item's `cursor`. The converter does not stamp
 * those lists as paginated (that would un-collapse the raw-array wrapper),
 * so {@link paginateRender} is for callers that walk the cursor by hand.
 */
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";
import * as Pagination from "@distilled.cloud/core/pagination";

export { paginateCursor } from "@distilled.cloud/core/pagination";

/**
 * Walk forward with `cursor` set to the last item's `cursor` until a page
 * comes back empty or the cursor does not advance.
 */
export const paginateRender: Pagination.PaginationStrategy = (
  operation,
  input,
  pagination,
) => {
  const inputToken = pagination.inputToken;
  if (!inputToken) {
    return Stream.die(
      new Error("Render cursor pagination requires inputToken"),
    );
  }
  const itemsPath = pagination.items ?? "body";

  type State = { cursor: string | undefined; done: boolean };
  const startCursor =
    typeof input[inputToken] === "string"
      ? (input[inputToken] as string)
      : undefined;

  return Stream.unfold({ cursor: startCursor, done: false } as State, (state) =>
    Effect.gen(function* () {
      if (state.done) return undefined;

      const requestPayload = {
        ...input,
        ...(state.cursor ? { [inputToken]: state.cursor } : {}),
      } as typeof input;
      const response = yield* operation(requestPayload);
      const items = Array.isArray(response)
        ? response
        : Pagination.getItems(response, itemsPath);
      const last = items.at(-1) as { cursor?: unknown } | undefined;
      const nextCursor =
        typeof last?.cursor === "string" ? last.cursor : undefined;
      const stuckCursor =
        state.cursor !== undefined && nextCursor === state.cursor;

      return [
        response,
        {
          cursor: nextCursor,
          done: items.length === 0 || nextCursor === undefined || stuckCursor,
        },
      ] as const;
    }),
  );
};
