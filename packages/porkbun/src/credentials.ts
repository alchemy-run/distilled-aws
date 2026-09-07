/**
 * Porkbun credentials — hand-written.
 *
 * Porkbun authenticates with a public API key and a secret API key, sent as
 * `X-API-Key` / `X-Secret-API-Key` (header auth; the JSON-body form is
 * equivalent). The `Credentials` service holds an *effect* that resolves the
 * current credentials on every request (the protocol layer resolves it per
 * request on the calling fiber).
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

export const DEFAULT_API_BASE_URL = "https://api.porkbun.com/api/json/v3";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly secretApiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("PorkbunCredentials") {}

/** Auth headers for a resolved credentials config. */
export const formatHeaders = (config: Config): Record<string, string> => ({
  "X-API-Key": Redacted.value(config.apiKey),
  "X-Secret-API-Key": Redacted.value(config.secretApiKey),
});

/** Layer from a plain API key pair + optional base URL. */
export const fromApiKey = (config: {
  readonly apiKey: string;
  readonly secretApiKey: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: Redacted.make(config.apiKey),
      secretApiKey: Redacted.make(config.secretApiKey),
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );

/**
 * Reads PORKBUN_API_KEY and PORKBUN_SECRET_API_KEY (required) and
 * PORKBUN_API_BASE_URL (optional).
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey = process.env.PORKBUN_API_KEY;
    const secretApiKey = process.env.PORKBUN_SECRET_API_KEY;

    if (!apiKey || !secretApiKey) {
      return yield* new ConfigError({
        message:
          "PORKBUN_API_KEY and PORKBUN_SECRET_API_KEY environment variables are required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      secretApiKey: Redacted.make(secretApiKey),
      apiBaseUrl: process.env.PORKBUN_API_BASE_URL ?? DEFAULT_API_BASE_URL,
    };
  }).pipe(Effect.orDie),
);
