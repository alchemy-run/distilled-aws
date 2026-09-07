/**
 * Gusto credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber). Gusto authenticates REST calls with an access
 * token as `Authorization: Bearer <token>` and versions the API with the
 * `X-Gusto-API-Version` header.
 *
 * Demo traffic uses `https://api.gusto-demo.com`; production uses
 * `https://api.gusto.com`.
 *
 * @see https://docs.gusto.com/app-integrations/docs/authentication
 * @see https://docs.gusto.com/app-integrations/docs/api-versioning
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

export const DEFAULT_API_BASE_URL = "https://api.gusto.com";
/** Dated REST API version this package is generated against. */
export const DEFAULT_API_VERSION = "2026-06-15";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  readonly apiVersion: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("GustoCredentials") {}

/** Layer from a plain access token + optional base URL and API version. */
export const fromApiKey = (config: {
  readonly apiKey: string;
  readonly apiBaseUrl?: string;
  readonly apiVersion?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: Redacted.make(config.apiKey),
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      apiVersion: config.apiVersion ?? DEFAULT_API_VERSION,
    }),
  );

/**
 * Reads GUSTO_ACCESS_TOKEN (or GUSTO_API_TOKEN / GUSTO_API_KEY),
 * GUSTO_API_BASE_URL, and GUSTO_API_VERSION.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey =
      process.env.GUSTO_ACCESS_TOKEN ??
      process.env.GUSTO_API_TOKEN ??
      process.env.GUSTO_API_KEY;

    if (!apiKey) {
      return yield* new ConfigError({
        message:
          "GUSTO_ACCESS_TOKEN (or GUSTO_API_TOKEN / GUSTO_API_KEY) environment variable is required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: process.env.GUSTO_API_BASE_URL ?? DEFAULT_API_BASE_URL,
      apiVersion: process.env.GUSTO_API_VERSION ?? DEFAULT_API_VERSION,
    };
  }).pipe(Effect.orDie),
);
