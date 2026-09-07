/**
 * Kubernetes-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the Kubernetes
 * fallback errors. Kubernetes API errors follow the `v1.Status` schema and
 * include a `reason` field (e.g. "NotFound", "AlreadyExists", "Forbidden")
 * that maps to HTTP status codes; the status code is the canonical
 * discriminator used to select the error class.
 *
 * Note the generated service modules additionally define their own
 * per-status matcher classes (NotFound/Conflict/UnprocessableEntity) for the
 * statuses each operation declares — those share `_tag`s with the core
 * classes here, so `catchTag` works against either.
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
export type { DefaultErrors } from "@distilled.cloud/core/errors";

import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/core/category";

/**
 * Returned when the Kubernetes API returns an error that does not
 * map to a known HTTP status class. The `reason` field mirrors the
 * `reason` from the Kubernetes `v1.Status` object.
 */
export class UnknownKubernetesError extends Schema.TaggedError<UnknownKubernetesError>()(
  "UnknownKubernetesError",
  {
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/**
 * Returned when a Kubernetes API response cannot be decoded
 * against the expected schema (kept for v0 surface parity).
 */
export class KubernetesParseError extends Schema.TaggedError<KubernetesParseError>()(
  "KubernetesParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}
