/**
 * Slack-specific error types.
 *
 * Slack reports failures as `{ "ok": false, "error": "<slug>" }` — usually
 * with HTTP 200 — so the interesting field is the machine-readable `error`
 * slug, not the status. The protocol maps the well-known infrastructure
 * slugs (auth, throttling, server hiccups) onto core's shared HTTP error
 * classes and surfaces everything else as {@link SlackError} with the slug
 * preserved for branching. Each generated operation's doc comment lists the
 * slugs that method can produce.
 */
export {
  BadGateway,
  BadRequest,
  Conflict,
  ConfigError,
  Forbidden,
  GatewayTimeout,
  InternalServerError,
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
import { withCategory } from "@distilled.cloud/core/error-category";
import { DurationSchema, RETRYABLE } from "@distilled.cloud/core/errors";

/**
 * A Slack API error envelope: `ok: false` with a machine-readable slug.
 * `code` is the slug (`channel_not_found`, `invalid_blocks`, …) — the field
 * to branch on; the per-method slugs are listed in each operation's doc
 * comment. `needed`/`provided` carry scope detail on `missing_scope`;
 * `messages` carries the envelope's `response_metadata.messages` (per-field
 * validation detail on `invalid_arguments`).
 */
export class SlackError extends Schema.TaggedError<SlackError>()("SlackError", {
  code: Schema.String,
  message: Schema.optional(Schema.String),
  needed: Schema.optional(Schema.String),
  provided: Schema.optional(Schema.String),
  messages: Schema.optional(Schema.Array(Schema.String)),
}) {}

/**
 * Slack rate limit — a 429 or the `rate_limited`/`ratelimited` slug. Slack
 * answers with a `Retry-After` header the default retry policy honors.
 */
export class SlackRateLimited extends Schema.TaggedError<SlackRateLimited>()(
  "SlackRateLimited",
  {
    code: Schema.String,
    message: Schema.optional(Schema.String),
    retryAfter: Schema.optional(DurationSchema),
  },
).pipe(withCategory(RETRYABLE), Category.withThrottlingError) {}

/**
 * HTTP error — a non-2xx response without a parseable Slack error envelope
 * (proxy pages, HTML 5xx bodies).
 */
export class SlackHttpError extends Schema.TaggedError<SlackHttpError>()(
  "SlackHttpError",
  {
    status: Schema.Number,
    message: Schema.String,
    body: Schema.optional(Schema.String),
  },
) {}

/** Schema parse error wrapper. */
export class SlackParseError extends Schema.TaggedError<SlackParseError>()(
  "SlackParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Errors any Slack operation may surface in addition to the shared HTTP
 * status errors.
 */
export type ClientErrors =
  | SlackError
  | SlackRateLimited
  | SlackHttpError
  | SlackParseError;

/**
 * Default Slack operation errors: the shared HTTP status errors from core
 * plus the client-level envelope/decode errors.
 */
export type DefaultErrors = CoreDefaultErrors | ClientErrors;
