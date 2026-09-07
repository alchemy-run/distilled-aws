/**
 * Temporal credentials — hand-written.
 *
 * API-compatible port of the distilled v0 credentials module: the
 * `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber).
 *
 * Temporal Cloud and JWT-configured self-hosted servers accept
 * `Authorization: Bearer <apiKey>`. Paths in the published OpenAPI document
 * already include `/api/v1`, so `apiBaseUrl` is the frontend HTTP origin
 * (default `http://localhost:7243`).
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/** Default Temporal frontend HTTP listen address (`grpcPort + 10`). */
export const DEFAULT_API_BASE_URL = "http://localhost:7243";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("TemporalCredentials") {}

/** Layer from a plain API key + optional base URL. */
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

/** Reads TEMPORAL_API_KEY (required) and TEMPORAL_API_BASE_URL (optional). */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey = process.env.TEMPORAL_API_KEY;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "TEMPORAL_API_KEY environment variable is required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: process.env.TEMPORAL_API_BASE_URL ?? DEFAULT_API_BASE_URL,
    };
  }).pipe(Effect.orDie),
);
