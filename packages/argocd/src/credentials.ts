/**
 * Argo CD credentials — hand-written.
 *
 * API-compatible port of the distilled v0 credentials module: the
 * `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber).
 *
 * Argo CD authenticates HTTP API requests with a bearer token
 * (`Authorization: Bearer <token>`), typically obtained from
 * `POST /api/v1/session`. Paths in the published Swagger document already
 * include the `/api/v1` prefix, so `apiBaseUrl` is the instance origin.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/** Common local Argo CD listen address (the instance origin, not `/api/v1`). */
export const DEFAULT_API_BASE_URL = "https://localhost:8080";

export interface Config {
  readonly token: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("ArgocdCredentials") {}

/** Layer from a plain bearer token + optional instance URL. */
export const fromToken = (config: {
  readonly token: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      token: Redacted.make(config.token),
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );

/**
 * Reads ARGOCD_TOKEN (required) and ARGOCD_SERVER (optional instance origin).
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const token = process.env.ARGOCD_TOKEN;

    if (!token) {
      return yield* new ConfigError({
        message: "ARGOCD_TOKEN environment variable is required",
      });
    }

    return {
      token: Redacted.make(token),
      apiBaseUrl: process.env.ARGOCD_SERVER ?? DEFAULT_API_BASE_URL,
    };
  }).pipe(Effect.orDie),
);
