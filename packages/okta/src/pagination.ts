/**
 * Okta pagination — hand-written.
 *
 * List operations that the converter stamps as paginated are cursor-mode
 * (`after` in). Generated operations pass core's {@link paginateCursor}
 * strategy to `API.makePaginated`. Endpoints that only advertise the `Link`
 * response header stay plain operations.
 */
export { paginateCursor } from "@distilled.cloud/core/pagination";
