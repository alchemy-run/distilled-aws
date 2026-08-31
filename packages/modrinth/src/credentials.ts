/**
 * Modrinth credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber).
 *
 * Most Labrinth endpoints are public. Authenticated calls send the token as
 * `Authorization: {token}` (no Bearer prefix) — personal access tokens and
 * OAuth access tokens are both accepted. Requests without a uniquely
 * identifying User-Agent are rejected.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

export const DEFAULT_API_BASE_URL = "https://api.modrinth.com/v2";

/**
 * Modrinth requires a uniquely-identifying User-Agent and is more likely
 * to block generic HTTP-client defaults.
 */
export const DEFAULT_USER_AGENT = "distilled.cloud-modrinth";

export interface Config {
  readonly apiKey?: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  readonly userAgent: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("ModrinthCredentials") {}

/** Layer from an optional API token + optional base URL / User-Agent. */
export const fromApiKey = (config: {
  readonly apiKey?: string;
  readonly apiBaseUrl?: string;
  readonly userAgent?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey:
        config.apiKey !== undefined ? Redacted.make(config.apiKey) : undefined,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      userAgent: config.userAgent ?? DEFAULT_USER_AGENT,
    }),
  );

/**
 * Reads MODRINTH_API_KEY (optional), MODRINTH_API_BASE_URL (optional),
 * and MODRINTH_USER_AGENT (optional). Public endpoints work with no key.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.succeed({
    apiKey: process.env.MODRINTH_API_KEY
      ? Redacted.make(process.env.MODRINTH_API_KEY)
      : undefined,
    apiBaseUrl: process.env.MODRINTH_API_BASE_URL ?? DEFAULT_API_BASE_URL,
    userAgent: process.env.MODRINTH_USER_AGENT ?? DEFAULT_USER_AGENT,
  }),
);
