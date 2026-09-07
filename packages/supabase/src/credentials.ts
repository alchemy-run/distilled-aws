/**
 * Supabase credentials — hand-written.
 *
 * API-compatible port of the distilled repo's supabase credentials module:
 * the `Credentials` service holds an *effect* that resolves the current
 * credentials on every request. Auth is a plain personal access token sent
 * as `Authorization: Bearer <token>`; `CredentialsFromEnv` reads
 * `SUPABASE_ACCESS_TOKEN`.
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

export const DEFAULT_API_BASE_URL = "https://api.supabase.com";

export interface Config {
  readonly accessToken: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("SupabaseCredentials") {}

const envConfig = EffectConfig.all({
  accessToken: EffectConfig.string("SUPABASE_ACCESS_TOKEN"),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message: "SUPABASE_ACCESS_TOKEN environment variable is required",
        }),
    ),
    Effect.map(({ accessToken }) => ({
      accessToken: Redacted.make(accessToken),
      apiBaseUrl: DEFAULT_API_BASE_URL,
    })),
    Effect.orDie,
  ),
);

/**
 * Convenience layer from a plain token + optional base URL.
 */
export const credentials = (config: {
  readonly accessToken: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      accessToken: Redacted.make(config.accessToken),
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );

/** Auth headers for a resolved credential config. */
export const formatHeaders = (config: Config): Record<string, string> => ({
  Authorization: `Bearer ${Redacted.value(config.accessToken)}`,
});
