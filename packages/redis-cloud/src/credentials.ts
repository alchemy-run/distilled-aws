/**
 * Redis Cloud credentials — hand-written.
 *
 * Every REST request authenticates with two API keys (and optionally an SSO
 * token), sent as headers:
 *
 *   x-api-key         — account key (identifies the Redis Cloud account)
 *   x-api-secret-key  — user key (identifies the caller)
 *   x-auth-token      — optional SSO token
 *
 * See https://redis.io/docs/latest/operate/rc/api/get-started/manage-api-keys/
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber).
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/**
 * Redis Cloud API root. Operation paths already include `/v1/…`, so the
 * version is not part of the base URL.
 */
export const DEFAULT_API_BASE_URL = "https://api.redislabs.com";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiSecretKey: Redacted.Redacted<string>;
  readonly authToken?: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("RedisCloudCredentials") {}

/** Auth headers for a resolved credentials config. */
export const formatHeaders = (config: Config): Record<string, string> => {
  const headers: Record<string, string> = {
    "x-api-key": Redacted.value(config.apiKey),
    "x-api-secret-key": Redacted.value(config.apiSecretKey),
  };
  if (config.authToken !== undefined) {
    headers["x-auth-token"] = Redacted.value(config.authToken);
  }
  return headers;
};

/** Layer from a plain account key + user secret + optional base URL. */
export const fromApiKey = (config: {
  readonly apiKey: string;
  readonly apiSecretKey: string;
  readonly authToken?: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: Redacted.make(config.apiKey),
      apiSecretKey: Redacted.make(config.apiSecretKey),
      authToken:
        config.authToken !== undefined
          ? Redacted.make(config.authToken)
          : undefined,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );

/**
 * Reads REDIS_CLOUD_API_KEY and REDIS_CLOUD_API_SECRET_KEY (required),
 * REDIS_CLOUD_AUTH_TOKEN and REDIS_CLOUD_API_BASE_URL (optional).
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey = process.env.REDIS_CLOUD_API_KEY;
    const apiSecretKey = process.env.REDIS_CLOUD_API_SECRET_KEY;

    if (!apiKey || !apiSecretKey) {
      return yield* new ConfigError({
        message:
          "REDIS_CLOUD_API_KEY and REDIS_CLOUD_API_SECRET_KEY environment variables are required",
      });
    }

    const authToken = process.env.REDIS_CLOUD_AUTH_TOKEN;
    return {
      apiKey: Redacted.make(apiKey),
      apiSecretKey: Redacted.make(apiSecretKey),
      authToken: authToken !== undefined ? Redacted.make(authToken) : undefined,
      apiBaseUrl: process.env.REDIS_CLOUD_API_BASE_URL ?? DEFAULT_API_BASE_URL,
    };
  }).pipe(Effect.orDie),
);
