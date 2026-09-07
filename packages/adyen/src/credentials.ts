/**
 * Adyen credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber). Checkout API requests are signed with an API key
 * sent as the `X-API-Key` header.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/** Checkout API v72 test endpoint (version is a path suffix). */
export const DEFAULT_API_BASE_URL = "https://checkout-test.adyen.com/v72";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("AdyenCredentials") {}

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

/** Reads ADYEN_API_KEY (required) and ADYEN_API_BASE_URL (optional). */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey = process.env.ADYEN_API_KEY;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "ADYEN_API_KEY environment variable is required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: process.env.ADYEN_API_BASE_URL ?? DEFAULT_API_BASE_URL,
    };
  }).pipe(Effect.orDie),
);
