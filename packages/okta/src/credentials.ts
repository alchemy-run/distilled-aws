/**
 * Okta credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber). Dual-mode auth:
 *
 *   SSWS API token → `Authorization: SSWS <apiToken>`
 *   OAuth access token → `Authorization: Bearer <apiToken>`
 *
 * There is no global Okta host — every org has its own domain
 * (`https://dev-123456.okta.com`, a custom domain, …), so `apiBaseUrl` is
 * required.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/** Okta Management API token schemes. */
export type AuthScheme = "SSWS" | "Bearer";

export interface Config {
  readonly apiToken: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  readonly authScheme: AuthScheme;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("OktaCredentials") {}

const stripTrailingSlash = (url: string): string => url.replace(/\/+$/, "");

/** Layer from an SSWS API token + org base URL. */
export const fromApiToken = (config: {
  readonly apiToken: string;
  readonly apiBaseUrl: string;
  readonly authScheme?: AuthScheme;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiToken: Redacted.make(config.apiToken),
      apiBaseUrl: stripTrailingSlash(config.apiBaseUrl),
      authScheme: config.authScheme ?? "SSWS",
    }),
  );

/** Layer from an OAuth 2.0 access token + org base URL. */
export const fromAccessToken = (config: {
  readonly accessToken: string;
  readonly apiBaseUrl: string;
}): Layer.Layer<Credentials> =>
  fromApiToken({
    apiToken: config.accessToken,
    apiBaseUrl: config.apiBaseUrl,
    authScheme: "Bearer",
  });

/**
 * Reads OKTA_API_TOKEN + OKTA_ORG_URL (required) and OKTA_AUTH_SCHEME
 * (optional, `SSWS` or `Bearer`; default SSWS).
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiToken = process.env.OKTA_API_TOKEN;
    const apiBaseUrl = process.env.OKTA_ORG_URL;
    const scheme = process.env.OKTA_AUTH_SCHEME;

    if (!apiToken || !apiBaseUrl) {
      return yield* new ConfigError({
        message:
          "OKTA_API_TOKEN and OKTA_ORG_URL environment variables are required",
      });
    }

    const authScheme: AuthScheme =
      scheme === "Bearer" || scheme === "SSWS" ? scheme : "SSWS";

    return {
      apiToken: Redacted.make(apiToken),
      apiBaseUrl: stripTrailingSlash(apiBaseUrl),
      authScheme,
    };
  }).pipe(Effect.orDie),
);

/** Auth headers for a resolved credentials config. */
export const formatHeaders = (config: Config): Record<string, string> => ({
  Authorization: `${config.authScheme} ${Redacted.value(config.apiToken)}`,
  Accept: "application/json",
});
