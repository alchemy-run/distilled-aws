/**
 * Docker credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber). The Engine API is typically unauthenticated over a
 * local socket or TCP port; an optional bearer token covers TLS-proxied
 * remotes. Registry auth is a per-call `X-Registry-Auth` header, not a
 * credential here.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

export const DEFAULT_API_BASE_URL = "http://localhost/v1.56";

export interface Config {
  readonly apiKey?: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("DockerCredentials") {}

/** Layer from an optional API key + optional base URL. */
export const fromApiKey = (config: {
  readonly apiKey?: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey:
        config.apiKey !== undefined ? Redacted.make(config.apiKey) : undefined,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );

/**
 * Reads DOCKER_API_KEY (optional) and DOCKER_API_BASE_URL (optional).
 * Defaults to {@link DEFAULT_API_BASE_URL} with no Authorization header.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.succeed({
    apiKey: process.env.DOCKER_API_KEY
      ? Redacted.make(process.env.DOCKER_API_KEY)
      : undefined,
    apiBaseUrl: process.env.DOCKER_API_BASE_URL ?? DEFAULT_API_BASE_URL,
  }),
);
