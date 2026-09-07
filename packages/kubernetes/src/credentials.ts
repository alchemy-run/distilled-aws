/**
 * Kubernetes credentials — hand-written.
 *
 * API-compatible port of the distilled v0 Kubernetes credentials module: the
 * `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber).
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

export interface Config {
  /**
   * Bearer token for authenticating to the Kubernetes API server.
   * This can be a service account token, an OIDC token, an EKS
   * presigned STS token, or any token accepted by the cluster's
   * authentication layer.
   */
  readonly token: Redacted.Redacted<string>;

  /**
   * Base URL of the Kubernetes API server.
   *
   * There is no default — the URL must always be provided explicitly
   * because it varies per cluster (e.g. EKS endpoint, GKE endpoint,
   * `https://localhost:6443`, etc.).
   */
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("KubernetesCredentials") {}

/** Layer from a plain bearer token + API server URL. */
export const fromToken = (config: {
  readonly token: string;
  readonly apiBaseUrl: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      token: Redacted.make(config.token),
      apiBaseUrl: config.apiBaseUrl,
    }),
  );

/**
 * Build a credentials layer from environment variables.
 *
 * | Variable | Required | Description |
 * |---|---|---|
 * | `KUBERNETES_TOKEN` | yes | Bearer token for authentication |
 * | `KUBERNETES_API_URL` | yes | API server URL (e.g. from `kubectl cluster-info`) |
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const token = process.env.KUBERNETES_TOKEN;
    const apiBaseUrl = process.env.KUBERNETES_API_URL;

    if (!token || !apiBaseUrl) {
      return yield* new ConfigError({
        message:
          "KUBERNETES_TOKEN and KUBERNETES_API_URL environment variables are required. " +
          "Set KUBERNETES_TOKEN to a bearer token for your Kubernetes cluster, " +
          "and KUBERNETES_API_URL to the API server URL (e.g. from `kubectl cluster-info` " +
          "or the EKS cluster endpoint).",
      });
    }

    return {
      token: Redacted.make(token),
      apiBaseUrl,
    };
  }).pipe(Effect.orDie),
);
