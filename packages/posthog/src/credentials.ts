/**
 * PostHog credentials — hand-written.
 *
 * API-compatible port of the distilled repo's posthog credentials module:
 * the `Credentials` service holds an *effect* that resolves the current
 * credentials on every request. The protocol layer resolves it per request
 * and formats the `Authorization: Bearer <key>` header.
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

/**
 * Default PostHog API host (US Cloud).
 *
 * Override per-region by setting `POSTHOG_HOST` (e.g. `https://eu.posthog.com`
 * for EU Cloud, or your self-hosted instance URL). Operation paths in the spec
 * already include the `/api/...` prefix, so the host should NOT include it.
 */
export const DEFAULT_API_BASE_URL = "https://us.posthog.com";

export interface Config {
  /** PostHog Personal API key (sent as `Authorization: Bearer <key>`). */
  readonly apiKey: string;
  /** Base host URL, e.g. `https://us.posthog.com`. */
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("PosthogCredentials") {}

const envConfig = EffectConfig.all({
  apiKey: EffectConfig.string("POSTHOG_API_KEY"),
  apiBaseUrl: EffectConfig.string("POSTHOG_HOST").pipe(
    EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message: "POSTHOG_API_KEY environment variable is required",
        }),
    ),
    Effect.orDie,
  ),
);

/** Convenience layer from a plain key + optional host override. */
export const credentials = (config: {
  readonly apiKey: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: config.apiKey,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );
