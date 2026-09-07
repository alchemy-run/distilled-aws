/**
 * Vanta credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber). Vanta authenticates with OAuth 2.0 bearer tokens:
 * callers hand an already-fetched access token; the protocol sends it as
 * `Authorization: Bearer <token>`.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/** Vanta commercial API root. Use {@link GOV_API_BASE_URL} for Vanta Gov. */
export const DEFAULT_API_BASE_URL = "https://api.vanta.com";

/** Vanta Gov (FedRAMP) API root. */
export const GOV_API_BASE_URL = "https://api.vanta-gov.com";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("VantaCredentials") {}

/** Layer from a plain access token + optional base URL. */
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

/** Reads VANTA_ACCESS_TOKEN (required) and VANTA_API_BASE_URL (optional). */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey = process.env.VANTA_ACCESS_TOKEN;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "VANTA_ACCESS_TOKEN environment variable is required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: process.env.VANTA_API_BASE_URL ?? DEFAULT_API_BASE_URL,
    };
  }).pipe(Effect.orDie),
);
