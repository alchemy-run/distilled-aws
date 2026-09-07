/**
 * turbopuffer credentials — hand-written.
 *
 * API-compatible port of the distilled Neon credentials module: the
 * `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber).
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/** Default public cluster used throughout turbopuffer's own docs. */
export const DEFAULT_API_BASE_URL = "https://gcp-us-central1.turbopuffer.com";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("TurbopufferCredentials") {}

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

/** Reads TURBOPUFFER_API_KEY (required) and TURBOPUFFER_API_BASE_URL (optional). */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey = process.env.TURBOPUFFER_API_KEY;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "TURBOPUFFER_API_KEY environment variable is required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: process.env.TURBOPUFFER_API_BASE_URL ?? DEFAULT_API_BASE_URL,
    };
  }).pipe(Effect.orDie),
);
