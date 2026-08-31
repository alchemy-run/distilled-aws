/**
 * Zendesk credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber).
 *
 * Zendesk Support authenticates as HTTP Basic with `{email}/token:{apiToken}`
 * or as `Authorization: Bearer <oauth access token>`. Paths in the published
 * OpenAPI document already include the `/api/v2` prefix, so `apiBaseUrl` is
 * the account origin (`https://{subdomain}.zendesk.com`).
 *
 * @see https://developer.zendesk.com/api-reference/introduction/security-and-auth/
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

export interface Config {
  readonly authorization: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("ZendeskCredentials") {}

const stripTrailingSlash = (url: string): string => url.replace(/\/+$/, "");

/** Account origin from a subdomain (`acme`) or host (`acme.zendesk.com`). */
export const originFromSubdomain = (subdomain: string): string => {
  const host = subdomain
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/+$/, "");
  if (host.includes(".")) return `https://${host}`;
  return `https://${host}.zendesk.com`;
};

const basicToken = (email: string, apiToken: string): string =>
  `Basic ${btoa(`${email}/token:${apiToken}`)}`;

const resolveBaseUrl = (config: {
  readonly subdomain?: string;
  readonly apiBaseUrl?: string;
}): string => {
  if (config.apiBaseUrl) return stripTrailingSlash(config.apiBaseUrl);
  if (config.subdomain) return originFromSubdomain(config.subdomain);
  throw new Error("subdomain or apiBaseUrl is required");
};

/** Layer from an API token (`{email}/token`) + subdomain. */
export const fromApiToken = (config: {
  readonly email: string;
  readonly apiToken: string;
  readonly subdomain?: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      authorization: Redacted.make(basicToken(config.email, config.apiToken)),
      apiBaseUrl: resolveBaseUrl(config),
    }),
  );

/** Layer from an OAuth access token + subdomain. */
export const fromAccessToken = (config: {
  readonly accessToken: string;
  readonly subdomain?: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      authorization: Redacted.make(`Bearer ${config.accessToken}`),
      apiBaseUrl: resolveBaseUrl(config),
    }),
  );

/**
 * Reads ZENDESK_SUBDOMAIN (or ZENDESK_API_BASE_URL) plus either
 * ZENDESK_EMAIL + ZENDESK_API_TOKEN or ZENDESK_ACCESS_TOKEN.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const subdomain = process.env.ZENDESK_SUBDOMAIN;
    const apiBaseUrl = process.env.ZENDESK_API_BASE_URL;
    const email = process.env.ZENDESK_EMAIL;
    const apiToken = process.env.ZENDESK_API_TOKEN;
    const accessToken = process.env.ZENDESK_ACCESS_TOKEN;

    if (!subdomain && !apiBaseUrl) {
      return yield* new ConfigError({
        message:
          "ZENDESK_SUBDOMAIN (or ZENDESK_API_BASE_URL) environment variable is required",
      });
    }

    const origin = apiBaseUrl
      ? stripTrailingSlash(apiBaseUrl)
      : originFromSubdomain(subdomain!);

    if (accessToken) {
      return {
        authorization: Redacted.make(`Bearer ${accessToken}`),
        apiBaseUrl: origin,
      };
    }

    if (!email || !apiToken) {
      return yield* new ConfigError({
        message:
          "ZENDESK_EMAIL and ZENDESK_API_TOKEN (or ZENDESK_ACCESS_TOKEN) environment variables are required",
      });
    }

    return {
      authorization: Redacted.make(basicToken(email, apiToken)),
      apiBaseUrl: origin,
    };
  }).pipe(Effect.orDie),
);
