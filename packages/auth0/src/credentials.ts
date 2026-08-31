/**
 * Auth0 credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber). Management API auth is a bearer token sent as
 * `Authorization: Bearer <token>` against `https://{domain}/api/v2`.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/** Build the Management API base URL for a tenant domain. */
export const apiBaseUrlForDomain = (domain: string): string => {
  const host = domain.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  return `https://${host}/api/v2`;
};

export interface Config {
  readonly token: Redacted.Redacted<string>;
  readonly domain: string;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("Auth0Credentials") {}

/** Layer from a Management API token + tenant domain. */
export const fromToken = (config: {
  readonly token: string;
  readonly domain: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      token: Redacted.make(config.token),
      domain: config.domain,
      apiBaseUrl: config.apiBaseUrl ?? apiBaseUrlForDomain(config.domain),
    }),
  );

/**
 * Reads AUTH0_DOMAIN and AUTH0_MANAGEMENT_TOKEN (required) and
 * AUTH0_API_BASE_URL (optional override of `https://{domain}/api/v2`).
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const domain = process.env.AUTH0_DOMAIN;
    const token = process.env.AUTH0_MANAGEMENT_TOKEN;

    if (!domain || !token) {
      return yield* new ConfigError({
        message:
          "AUTH0_DOMAIN and AUTH0_MANAGEMENT_TOKEN environment variables are required",
      });
    }

    return {
      token: Redacted.make(token),
      domain,
      apiBaseUrl: process.env.AUTH0_API_BASE_URL ?? apiBaseUrlForDomain(domain),
    };
  }).pipe(Effect.orDie),
);
