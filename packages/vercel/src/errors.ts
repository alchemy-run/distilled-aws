/**
 * Vercel-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the two statuses
 * Vercel uses that core's shared map has no entry for, plus the
 * unknown-error and parse-error wrappers.
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
import type { DefaultErrors as CoreDefaultErrors } from "@distilled.cloud/core/errors";

import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/core/category";

/**
 * HTTP 402 — the account cannot be billed for the request: a missing payment
 * method, an unpaid invoice, or a spend cap the team has already hit (Vercel
 * pauses the account at the cap until an owner disables it). Declared on the
 * ~95 operations that provision billable resources; the rest reach it through
 * the protocol's status map.
 */
export class PaymentRequired extends Schema.TaggedError<PaymentRequired>()(
  "PaymentRequired",
  {
    message: Schema.String,
  },
).pipe(Category.withQuotaError) {}

/**
 * HTTP 410 — Vercel's "Invalid API version": the versioned path segment
 * (`/v5/domains`, `/v9/projects`) is no longer served. The spec declares it on
 * nearly every operation as boilerplate, so it rides the common error channel
 * instead of every generated operation's error list — a 410 means the SDK's
 * pinned path version was retired and needs a regeneration, not something a
 * caller can branch on per operation.
 */
export class Gone extends Schema.TaggedError<Gone>()("Gone", {
  message: Schema.String,
}).pipe(Category.withNotFoundError) {}

/**
 * Unknown Vercel error — returned when a failed response's HTTP status has no
 * mapped error class. Carries the raw body for later cataloging.
 */
export class UnknownVercelError extends Schema.TaggedError<UnknownVercelError>()(
  "UnknownVercelError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class VercelParseError extends Schema.TaggedError<VercelParseError>()(
  "VercelParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Errors any Vercel operation may surface in addition to the per-operation
 * typed status errors.
 */
export type ClientErrors =
  | UnknownVercelError
  | VercelParseError
  | PaymentRequired
  | Gone;

/**
 * Default Vercel operation errors: the shared HTTP status errors from core
 * plus the client-level fallback/decode errors.
 */
export type DefaultErrors = CoreDefaultErrors | ClientErrors;
