/**
 * Apache Superset credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber).
 *
 * Superset authenticates HTTP API requests with a JWT access token
 * (`Authorization: Bearer <token>`), typically obtained from
 * `POST /api/v1/security/login`. Spec paths already include `/api/v1`, so
 * `apiBaseUrl` is the instance origin.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/** Common local Superset listen address (the instance origin, not `/api/v1`). */
export const DEFAULT_API_BASE_URL = "http://localhost:8088";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("ApacheSupersetCredentials") {}

/** Layer from a JWT access token + optional instance URL. */
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
 * Reads SUPERSET_ACCESS_TOKEN (required) and SUPERSET_URL (optional instance
 * origin).
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey = process.env.SUPERSET_ACCESS_TOKEN;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "SUPERSET_ACCESS_TOKEN environment variable is required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: process.env.SUPERSET_URL ?? DEFAULT_API_BASE_URL,
    };
  }).pipe(Effect.orDie),
);
