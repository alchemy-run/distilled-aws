/**
 * LaunchDarkly credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber).
 *
 * LaunchDarkly authenticates REST API calls with a personal or service access
 * token as the `Authorization` header value (not a Bearer scheme). Paths in
 * the published OpenAPI document already include the `/api/v2` prefix, so
 * `apiBaseUrl` is the instance origin (`https://app.launchdarkly.com`, the
 * federal host `https://app.launchdarkly.us`, or the EU host
 * `https://app.eu.launchdarkly.com`). Dated API versions are selected with
 * the `LD-API-Version` header.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

export const DEFAULT_API_BASE_URL = "https://app.launchdarkly.com";
/** Dated REST API version this package is generated against. */
export const DEFAULT_API_VERSION = "20240415";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  readonly apiVersion: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("LaunchDarklyCredentials") {}

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
 * Reads LAUNCHDARKLY_ACCESS_TOKEN or LAUNCHDARKLY_API_KEY (required),
 * LAUNCHDARKLY_API_BASE_URL, and LAUNCHDARKLY_API_VERSION.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey =
      process.env.LAUNCHDARKLY_ACCESS_TOKEN ?? process.env.LAUNCHDARKLY_API_KEY;

    if (!apiKey) {
      return yield* new ConfigError({
        message:
          "LAUNCHDARKLY_ACCESS_TOKEN (or LAUNCHDARKLY_API_KEY) environment variable is required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: process.env.LAUNCHDARKLY_API_BASE_URL ?? DEFAULT_API_BASE_URL,
      apiVersion: process.env.LAUNCHDARKLY_API_VERSION ?? DEFAULT_API_VERSION,
    };
  }).pipe(Effect.orDie),
);
