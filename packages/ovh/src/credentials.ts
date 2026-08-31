/**
 * OVH credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber). OVH REST accepts an OAuth2 access token as
 * `Authorization: Bearer <token>` (`OVH_ACCESS_TOKEN`); callers hand an
 * already-fetched token. Application-key request signing is not modelled
 * here — `makeRestProtocol` injects static headers only.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/** OVH Europe API root (v1 / 1.0). Override for CA/US or v2 APIs. */
export const DEFAULT_API_BASE_URL = "https://eu.api.ovh.com/1.0";

/** Named regional endpoints the official clients recognise. */
export const ENDPOINTS = {
  "ovh-eu": "https://eu.api.ovh.com/1.0",
  "ovh-us": "https://api.us.ovhcloud.com/1.0",
  "ovh-ca": "https://ca.api.ovh.com/1.0",
} as const;

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("OvhCredentials") {}

const baseUrlFromEnv = (): string => {
  const explicit = process.env.OVH_API_BASE_URL;
  if (explicit) return explicit;
  const endpoint = process.env.OVH_ENDPOINT;
  if (endpoint && endpoint in ENDPOINTS) {
    return ENDPOINTS[endpoint as keyof typeof ENDPOINTS];
  }
  return DEFAULT_API_BASE_URL;
};

/** Layer from a plain access token + optional base URL. */
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

/** Reads OVH_ACCESS_TOKEN (required) and OVH_API_BASE_URL / OVH_ENDPOINT. */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey = process.env.OVH_ACCESS_TOKEN;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "OVH_ACCESS_TOKEN environment variable is required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: baseUrlFromEnv(),
    };
  }).pipe(Effect.orDie),
);
