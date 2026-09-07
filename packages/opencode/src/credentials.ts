/**
 * OpenCode credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber). `opencode serve` defaults to an unauthenticated
 * local HTTP server; set `OPENCODE_SERVER_PASSWORD` to protect it with HTTP
 * basic auth (username defaults to `opencode`).
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

export const DEFAULT_API_BASE_URL = "http://127.0.0.1:4096";
export const DEFAULT_USERNAME = "opencode";

export interface Config {
  readonly username: string;
  readonly password?: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("OpencodeCredentials") {}

/** Layer from an optional password + optional base URL. */
export const fromPassword = (config: {
  readonly password?: string;
  readonly username?: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      username: config.username ?? DEFAULT_USERNAME,
      password:
        config.password !== undefined
          ? Redacted.make(config.password)
          : undefined,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );

/**
 * Reads OPENCODE_SERVER_PASSWORD (optional), OPENCODE_SERVER_USERNAME
 * (optional, default {@link DEFAULT_USERNAME}), and OPENCODE_API_BASE_URL
 * (optional). Defaults to {@link DEFAULT_API_BASE_URL} with no
 * Authorization header.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.succeed({
    username: process.env.OPENCODE_SERVER_USERNAME ?? DEFAULT_USERNAME,
    password: process.env.OPENCODE_SERVER_PASSWORD
      ? Redacted.make(process.env.OPENCODE_SERVER_PASSWORD)
      : undefined,
    apiBaseUrl: process.env.OPENCODE_API_BASE_URL ?? DEFAULT_API_BASE_URL,
  }),
);
