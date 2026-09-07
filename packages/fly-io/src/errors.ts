/**
 * Fly.io-specific error types.
 *
 * Re-exports common HTTP errors from sdk-core and adds the Fly.io-specific
 * fallback/parse error types. Fly.io's error model is a pure HTTP-status
 * map: the API answers failures with `{ "error": "..." }` and the protocol
 * maps the status onto the shared core classes (BadRequest / Forbidden /
 * NotFound / Conflict / UnprocessableEntity / ...).
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
import { applyErrorMatchers } from "@distilled.cloud/core/trait";

/**
 * Unknown Fly.io error — returned when a failure matches no status-mapped
 * error class. Carries the raw body for later cataloging.
 */
export class UnknownFlyIoError extends Schema.TaggedError<UnknownFlyIoError>()(
  "UnknownFlyIoError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class FlyIoParseError extends Schema.TaggedError<FlyIoParseError>()(
  "FlyIoParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Sprites is not enabled for the Fly organization that owns `FLY_API_TOKEN`.
 *
 * Returned by `POST /v1/organizations/{org}/tokens` as HTTP 401 with a
 * message matching `sprites not enabled`. Sprite CRUD never sees a
 * `SPRITES_TOKEN` — this is the mint-time entitlement signal.
 */
export class SpritesNotEnabled extends Schema.TaggedError<SpritesNotEnabled>()(
  "SpritesNotEnabled",
  {
    code: Schema.optional(Schema.Int),
    message: Schema.optional(Schema.String),
  },
).pipe(Category.withAuthError) {}
applyErrorMatchers(SpritesNotEnabled, [
  { status: 401, message: { matches: "[Ss]prites not enabled" } },
]);

/**
 * The Fly token cannot record add-on provider ToS agreement
 * (`createExtensionTosAgreement`). GraphQL returns this as a 200
 * with `Not authorized to access this createextensiontosagreement`.
 */
export class CreateExtensionTosAgreementNotAuthorized extends Schema.TaggedError<CreateExtensionTosAgreementNotAuthorized>()(
  "CreateExtensionTosAgreementNotAuthorized",
  {
    code: Schema.optional(Schema.Int),
    message: Schema.optional(Schema.String),
  },
).pipe(Category.withAuthError) {}
applyErrorMatchers(CreateExtensionTosAgreementNotAuthorized, [
  {
    message: {
      matches: "[Nn]ot authorized to access this createextensiontosagreement",
    },
  },
]);

/**
 * Errors any Fly.io operation may surface in addition to the status-mapped
 * per-operation errors.
 */
export type ClientErrors = UnknownFlyIoError | FlyIoParseError;

/**
 * Default Fly.io operation errors: the shared HTTP status errors from core
 * plus the client-level fallback/decode errors.
 */
export type DefaultErrors = CoreDefaultErrors | ClientErrors;
