/**
 * Resend pagination — hand-written.
 *
 * Resend's paginated list operations are cursor-mode (`after`/`limit` in,
 * `has_more` + last `data[].id` out). There is no next-cursor field on the
 * response — the docs say to pass the last item's `id` as `after` — so
 * generated operations pass {@link paginateResend} rather than core's
 * paginateCursor.
 */
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";
import * as Pagination from "@distilled.cloud/core/pagination";

/**
 * Walk forward with `after` set to the last item's `id` while `has_more` is
 * true. An empty page or a repeated cursor terminates even if `has_more`
 * claims otherwise.
 */
export const paginateResend: Pagination.PaginationStrategy = (
  operation,
  input,
  pagination,
) => {
  const inputToken = pagination.inputToken;
  if (!inputToken) {
    return Stream.die(
      new Error("Resend cursor pagination requires inputToken"),
    );
  }
  const hasNextPath = pagination.hasNextPage ?? "has_more";
  const itemsPath = pagination.items ?? "data";

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
      const items = Pagination.getItems(response, itemsPath);
      const last = items.at(-1) as { id?: unknown } | undefined;
      const nextCursor = typeof last?.id === "string" ? last.id : undefined;
      const hasNext = Pagination.getPath(response, hasNextPath) === true;
      const stuckCursor =
        state.cursor !== undefined && nextCursor === state.cursor;

      return [
        response,
        {
          cursor: nextCursor,
          done: !hasNext || nextCursor === undefined || stuckCursor,
        },
      ] as const;
    }),
  );
};
