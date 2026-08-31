/**
 * Grafana credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber).
 *
 * Grafana authenticates HTTP API requests with a service account token
 * (`Authorization: Bearer <token>`). The optional `X-Grafana-Org-Id` header
 * selects the organization the action applies to.
 *
 * The published OpenAPI document's server URL is `/api` and every path is
 * relative to that prefix, so the protocol appends `/api` to the instance
 * origin (`apiBaseUrl`).
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/** Grafana OSS default listen address (the instance origin, not `/api`). */
export const DEFAULT_API_BASE_URL = "http://localhost:3000";

export interface Config {
  readonly token: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  readonly orgId?: number | string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("GrafanaCredentials") {}

/** Layer from a plain service-account token + optional instance URL / org. */
export const fromApiKey = (config: {
  readonly apiKey: string;
  readonly apiBaseUrl?: string;
  readonly orgId?: number | string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      token: Redacted.make(config.apiKey),
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      orgId: config.orgId,
    }),
  );

/**
 * Reads GRAFANA_TOKEN (required), GRAFANA_URL (optional instance origin),
 * and GRAFANA_ORG_ID (optional).
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const token = process.env.GRAFANA_TOKEN;

    if (!token) {
      return yield* new ConfigError({
        message: "GRAFANA_TOKEN environment variable is required",
      });
    }

    return {
      token: Redacted.make(token),
      apiBaseUrl: process.env.GRAFANA_URL ?? DEFAULT_API_BASE_URL,
      orgId: process.env.GRAFANA_ORG_ID,
    };
  }).pipe(Effect.orDie),
);
