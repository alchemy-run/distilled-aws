/**
 * DigitalOcean credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber). A Personal Access Token is sent as
 * `Authorization: Bearer <apiKey>`.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

export const DEFAULT_API_BASE_URL = "https://api.digitalocean.com";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("DigitalOceanCredentials") {}

/** Layer from a plain API token + optional base URL. */
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

/**
 * Reads DIGITALOCEAN_ACCESS_TOKEN or DIGITALOCEAN_API_KEY (required) and
 * DIGITALOCEAN_API_BASE_URL (optional). `doctl` uses DIGITALOCEAN_ACCESS_TOKEN.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey =
      process.env.DIGITALOCEAN_ACCESS_TOKEN ?? process.env.DIGITALOCEAN_API_KEY;

    if (!apiKey) {
      return yield* new ConfigError({
        message:
          "DIGITALOCEAN_ACCESS_TOKEN or DIGITALOCEAN_API_KEY environment variable is required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: process.env.DIGITALOCEAN_API_BASE_URL ?? DEFAULT_API_BASE_URL,
    };
  }).pipe(Effect.orDie),
);
