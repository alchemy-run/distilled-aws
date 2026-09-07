/**
 * Sentry pagination — hand-written.
 *
 * Sentry's paginated list operations take a `cursor` query parameter;
 * generated operations pass core's {@link paginateCursor} strategy to
 * `API.makePaginated`. The next cursor is typically delivered in the
 * `Link` response header rather than the JSON body.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
