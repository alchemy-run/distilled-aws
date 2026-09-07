/**
 * Typesense credentials — hand-written.
 *
 * API-compatible port of the distilled repo's typesense credentials module:
 * a static API key sent as the `X-TYPESENSE-API-KEY` header plus a
 * caller-supplied base URL. The `Credentials` service holds an *effect* so
 * layers may resolve the key lazily (env, vaults, …).
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

/**
 * Typesense has no fixed default base URL — users run their own server
 * (e.g. http://localhost:8108) or use Typesense Cloud (per-cluster URLs
 * like https://xxx.a1.typesense.net). Users must supply TYPESENSE_API_URL.
 */
export const DEFAULT_API_BASE_URL = "";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("TypesenseCredentials") {}

const envConfig = EffectConfig.all({
  apiKey: EffectConfig.string("TYPESENSE_API_KEY"),
  apiBaseUrl: EffectConfig.string("TYPESENSE_API_URL"),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message:
            "TYPESENSE_API_KEY and TYPESENSE_API_URL environment variables are required",
        }),
    ),
    Effect.map(({ apiKey, apiBaseUrl }) => ({
      apiKey: Redacted.make(apiKey),
      apiBaseUrl,
    })),
    Effect.orDie,
  ),
);

/** Convenience layer from a plain key + base URL (kept for local tests). */
export const credentials = (config: {
  readonly apiKey: string;
  readonly apiBaseUrl: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: Redacted.make(config.apiKey),
      apiBaseUrl: config.apiBaseUrl,
    }),
  );

/** Auth headers for a resolved credentials config. */
export const formatHeaders = (config: Config): Record<string, string> => ({
  "X-TYPESENSE-API-KEY": Redacted.value(config.apiKey),
});
