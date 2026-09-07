/**
 * WorkOS credentials — hand-written.
 *
 * Port of the distilled v0 workos credentials module: the `Credentials`
 * service resolves `{ apiKey, apiBaseUrl }` per request; the protocol layer
 * formats the `Authorization: Bearer <apiKey>` header from it.
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/**
 * WorkOS production API base URL.
 *
 * The staging environment is reachable at https://api.workos-test.com — set
 * the `WORKOS_API_URL` environment variable to override the default.
 */
export const DEFAULT_API_BASE_URL = "https://api.workos.com";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("WorkosCredentials") {}

const envConfig = EffectConfig.all({
  apiKey: EffectConfig.string("WORKOS_API_KEY"),
  apiBaseUrl: EffectConfig.string("WORKOS_API_URL").pipe(
    EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message: "WORKOS_API_KEY environment variable is required",
        }),
    ),
    Effect.map(({ apiKey, apiBaseUrl }) => ({
      apiKey: Redacted.make(apiKey),
      apiBaseUrl,
    })),
    Effect.orDie,
  ),
);

/** Convenience layer from a plain API key + optional base URL. */
export const credentials = (config: {
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
