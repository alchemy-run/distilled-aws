/**
 * 1Password Connect credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber). Auth is a Connect access token sent as
 * `Authorization: Bearer <token>`. Self-hosted Connect servers override the
 * default base URL (`http://localhost:8080/v1`).
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

export const DEFAULT_API_BASE_URL = "http://localhost:8080/v1";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("OnepasswordCredentials") {}

/** Layer from a Connect token + optional base URL. */
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

const connectHostToBaseUrl = (host: string): string => {
  const trimmed = host.replace(/\/+$/, "");
  return /\/v1$/i.test(trimmed) ? trimmed : `${trimmed}/v1`;
};

/**
 * Reads OP_CONNECT_TOKEN (required) and OP_CONNECT_API_BASE_URL or
 * OP_CONNECT_HOST (optional). `OP_CONNECT_HOST` is the official Connect
 * host (no `/v1` suffix); `/v1` is appended when missing.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey = process.env.OP_CONNECT_TOKEN;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "OP_CONNECT_TOKEN environment variable is required",
      });
    }

    const explicitBase = process.env.OP_CONNECT_API_BASE_URL;
    const host = process.env.OP_CONNECT_HOST;

    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl:
        explicitBase ??
        (host !== undefined
          ? connectHostToBaseUrl(host)
          : DEFAULT_API_BASE_URL),
    };
  }).pipe(Effect.orDie),
);
