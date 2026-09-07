/**
 * Squarespace credentials — hand-written.
 *
 * API-compatible port of the distilled v0-style credentials module: the
 * `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber).
 *
 * Commerce APIs accept an API key or OAuth access token as
 * `Authorization: Bearer …`. Requests without a User-Agent are rejected.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

export const DEFAULT_API_BASE_URL = "https://api.squarespace.com";

/**
 * Squarespace rejects requests without a User-Agent and rate-limits
 * generic client defaults more strictly.
 */
export const DEFAULT_USER_AGENT = "distilled.cloud-squarespace";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  readonly userAgent: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("SquarespaceCredentials") {}

/** Layer from a plain API key + optional base URL / User-Agent. */
export const fromApiKey = (config: {
  readonly apiKey: string;
  readonly apiBaseUrl?: string;
  readonly userAgent?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: Redacted.make(config.apiKey),
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      userAgent: config.userAgent ?? DEFAULT_USER_AGENT,
    }),
  );

/** Reads SQUARESPACE_API_KEY (required) and optional base URL / User-Agent. */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey = process.env.SQUARESPACE_API_KEY;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "SQUARESPACE_API_KEY environment variable is required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: process.env.SQUARESPACE_API_BASE_URL ?? DEFAULT_API_BASE_URL,
      userAgent: process.env.SQUARESPACE_USER_AGENT ?? DEFAULT_USER_AGENT,
    };
  }).pipe(Effect.orDie),
);
