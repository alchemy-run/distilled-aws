/**
 * Plaid credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber). Plaid authenticates with `PLAID-CLIENT-ID`,
 * `PLAID-SECRET`, and `Plaid-Version` headers.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

export const DEFAULT_API_BASE_URL = "https://sandbox.plaid.com";
export const DEFAULT_PLAID_VERSION = "2020-09-14";

const ENV_BASE_URLS: Record<string, string> = {
  sandbox: "https://sandbox.plaid.com",
  development: "https://development.plaid.com",
  production: "https://production.plaid.com",
};

export interface Config {
  readonly clientId: string;
  readonly secret: Redacted.Redacted<string>;
  readonly plaidVersion: string;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("PlaidCredentials") {}

const resolveBaseUrl = (config: {
  readonly apiBaseUrl?: string;
  readonly env?: string;
}): string => {
  if (config.apiBaseUrl !== undefined) return config.apiBaseUrl;
  if (config.env !== undefined) {
    return ENV_BASE_URLS[config.env] ?? DEFAULT_API_BASE_URL;
  }
  return DEFAULT_API_BASE_URL;
};

/** Layer from a client id + secret + optional version/base URL/env. */
export const fromApiKey = (config: {
  readonly clientId: string;
  readonly secret: string;
  readonly plaidVersion?: string;
  readonly apiBaseUrl?: string;
  readonly env?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      clientId: config.clientId,
      secret: Redacted.make(config.secret),
      plaidVersion: config.plaidVersion ?? DEFAULT_PLAID_VERSION,
      apiBaseUrl: resolveBaseUrl(config),
    }),
  );

/** Reads PLAID_CLIENT_ID, PLAID_SECRET, and optional PLAID_VERSION / env URL. */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const clientId = process.env.PLAID_CLIENT_ID;
    const secret = process.env.PLAID_SECRET;

    if (!clientId || !secret) {
      return yield* new ConfigError({
        message:
          "PLAID_CLIENT_ID and PLAID_SECRET environment variables are required",
      });
    }

    return {
      clientId,
      secret: Redacted.make(secret),
      plaidVersion: process.env.PLAID_VERSION ?? DEFAULT_PLAID_VERSION,
      apiBaseUrl: resolveBaseUrl({
        apiBaseUrl: process.env.PLAID_API_BASE_URL,
        env: process.env.PLAID_ENV,
      }),
    };
  }).pipe(Effect.orDie),
);

/** Auth headers for a resolved credentials config. */
export const formatHeaders = (config: Config): Record<string, string> => ({
  "PLAID-CLIENT-ID": config.clientId,
  "PLAID-SECRET": Redacted.value(config.secret),
  "Plaid-Version": config.plaidVersion,
});
