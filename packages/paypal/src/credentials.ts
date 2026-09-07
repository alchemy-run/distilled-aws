/**
 * PayPal credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber). PayPal REST is OAuth 2.0 client-credentials: callers
 * hand an already-fetched access token; the protocol sends it as
 * `Authorization: Bearer <token>`.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/** PayPal live REST API root. Use `https://api-m.sandbox.paypal.com` for sandbox. */
export const DEFAULT_API_BASE_URL = "https://api-m.paypal.com";

export const SANDBOX_API_BASE_URL = "https://api-m.sandbox.paypal.com";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("PaypalCredentials") {}

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

/** Reads PAYPAL_ACCESS_TOKEN (required) and PAYPAL_API_BASE_URL (optional). */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey = process.env.PAYPAL_ACCESS_TOKEN;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "PAYPAL_ACCESS_TOKEN environment variable is required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: process.env.PAYPAL_API_BASE_URL ?? DEFAULT_API_BASE_URL,
    };
  }).pipe(Effect.orDie),
);
