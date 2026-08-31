/**
 * Sentry credentials — hand-written.
 *
 * API-compatible port of the distilled v0 Neon credentials module: the
 * `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber).
 *
 * Sentry authenticates HTTP API requests with an auth token
 * (`Authorization: Bearer <token>`). Paths in the published OpenAPI document
 * already include the `/api/0` prefix, so `apiBaseUrl` is the instance origin
 * (`https://sentry.io`, a regional host like `https://us.sentry.io`, or a
 * self-hosted Sentry URL).
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

export const DEFAULT_API_BASE_URL = "https://sentry.io";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("SentryCredentials") {}

/** Layer from a plain auth token + optional base URL. */
export const fromApiKey = (config: {
  readonly apiKey: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: Redacted.make(config.apiKey),
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );

/** Reads SENTRY_AUTH_TOKEN (required) and SENTRY_URL (optional). */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey = process.env.SENTRY_AUTH_TOKEN ?? process.env.SENTRY_API_KEY;

    if (!apiKey) {
      return yield* new ConfigError({
        message:
          "SENTRY_AUTH_TOKEN (or SENTRY_API_KEY) environment variable is required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl:
        process.env.SENTRY_URL ??
        process.env.SENTRY_API_BASE_URL ??
        DEFAULT_API_BASE_URL,
    };
  }).pipe(Effect.orDie),
);
