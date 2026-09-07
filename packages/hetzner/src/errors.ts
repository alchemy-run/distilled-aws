/**
 * Hetzner Cloud-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the three statuses
 * Hetzner's documented error table uses that core's shared map has no entry
 * for, plus the unknown-error and parse-error wrappers.
 *
 * Hetzner pairs every status with a machine-readable `code` (`locked`,
 * `uniqueness_error`, `resource_limit_exceeded`, …) that is finer-grained
 * than the status itself. The spec declares failures only as the `4xx`/`5xx`
 * wildcards — no operation says which codes it can produce — so the SDK
 * dispatches on the status (the classes here) and carries the code through
 * on {@link UnknownHetznerError} for the statuses nothing else maps. The
 * human-readable `message` is preserved verbatim on every class.
 */
export {
  BadGateway,
  BadRequest,
  Conflict,
  ConfigError,
  Forbidden,
  GatewayTimeout,
  InternalServerError,
  Locked,
  NotFound,
  ServiceUnavailable,
  TooManyRequests,
  Unauthorized,
  UnprocessableEntity,
  HTTP_STATUS_MAP,
  DEFAULT_ERRORS,
  API_ERRORS,
} from "@distilled.cloud/core/errors";
import type {
  BadRequest as CoreBadRequest,
  Conflict as CoreConflict,
  DefaultErrors as CoreDefaultErrors,
  Forbidden as CoreForbidden,
  Locked as CoreLocked,
  NotFound as CoreNotFound,
  UnprocessableEntity as CoreUnprocessableEntity,
} from "@distilled.cloud/core/errors";

import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/core/category";

/**
 * HTTP 405 — `method_not_allowed`: the route exists but not for this method.
 * In practice this means the SDK and the API disagree about a route, so it
 * is a bug report rather than something to branch on.
 */
export class MethodNotAllowed extends Schema.TaggedError<MethodNotAllowed>()(
  "MethodNotAllowed",
  {
    message: Schema.String,
  },
).pipe(Category.withBadRequestError) {}

/**
 * HTTP 410 — `deprecated_api_endpoint`: the endpoint's functionality was
 * REMOVED, not merely marked deprecated. Hetzner announces removals with a
 * date and the spec keeps flagging an endpoint `deprecated: true` until then
 * (those are skipped at generation time), so a 410 from a generated
 * operation means the pinned spec has fallen behind and needs a
 * regeneration. The error `details` carry a changelog link.
 */
export class Gone extends Schema.TaggedError<Gone>()("Gone", {
  message: Schema.String,
}).pipe(Category.withNotFoundError) {}

/**
 * HTTP 412 — `resource_unavailable`: the resource itself is fine, but what
 * you asked for is not currently orderable — a Server type sold out in the
 * chosen Location, an Image not offered there. Retrying the same request
 * unchanged will keep failing until Hetzner has capacity again, so it is NOT
 * marked retryable; a different Location or Server type is the fix.
 */
export class PreconditionFailed extends Schema.TaggedError<PreconditionFailed>()(
  "PreconditionFailed",
  {
    message: Schema.String,
  },
).pipe(Category.withConflictError) {}

/**
 * Unknown Hetzner error — returned when a failed response's HTTP status has
 * no mapped error class. `code` is Hetzner's own error code (the
 * machine-parsable half of its error envelope) and `details` the
 * code-dependent detail object — the offending fields for `invalid_input`
 * and `uniqueness_error`, the exceeded limits for
 * `resource_limit_exceeded`. See
 * https://docs.hetzner.cloud/reference/cloud#errors.
 */
export class UnknownHetznerError extends Schema.TaggedError<UnknownHetznerError>()(
  "UnknownHetznerError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    details: Schema.optional(Schema.Unknown),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class HetznerParseError extends Schema.TaggedError<HetznerParseError>()(
  "HetznerParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Errors any Hetzner operation may surface in addition to the shared HTTP
 * status errors.
 */
export type ClientErrors =
  | UnknownHetznerError
  | HetznerParseError
  | MethodNotAllowed
  | Gone
  | PreconditionFailed;

/**
 * Default Hetzner operation errors.
 *
 * EVERY operation carries the whole set: the spec types no failure per
 * operation (see the module docs), so any of the statuses Hetzner documents
 * can come back from any call and the error channel says so rather than
 * pretending a `404` is impossible on a route that never declared one.
 */
export type DefaultErrors =
  | CoreDefaultErrors
  | CoreBadRequest
  | CoreForbidden
  | CoreNotFound
  | CoreConflict
  | CoreUnprocessableEntity
  | CoreLocked
  | ClientErrors;
