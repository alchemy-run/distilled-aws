/**
 * PlanetScale credentials — hand-written.
 *
 * API-compatible port of the distilled repo's planetscale credentials module.
 * Dual-mode: service tokens (PlanetScale's non-standard
 * `Authorization: <tokenId>:<token>` scheme) and OAuth access tokens
 * (`Authorization: Bearer <accessToken>`). The `Credentials` service holds an
 * *effect* that resolves the current credentials, so callers that rotate or
 * refresh tokens (e.g. alchemy's AuthProvider) Just Work — the protocol
 * resolves it per request.
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

export const DEFAULT_API_BASE_URL = "https://api.planetscale.com/v1";

/**
 * Service-token credentials. Sent as `Authorization: <tokenId>:<token>`.
 *
 * `type` is optional and defaults to `"serviceToken"` so existing callers
 * that construct a bare `{ tokenId, token, organization, apiBaseUrl }`
 * continue to work unchanged.
 */
export interface ServiceTokenConfig {
  readonly type?: "serviceToken";
  readonly tokenId: Redacted.Redacted<string>;
  readonly token: Redacted.Redacted<string>;
  readonly organization: string;
  readonly apiBaseUrl: string;
}

/**
 * OAuth credentials. Sent as `Authorization: Bearer <accessToken>`.
 *
 * PlanetScale OAuth has no PKCE flow and refreshes require the app's
 * client_secret, so refresh is handled by the caller (e.g. Alchemy's
 * AuthProvider) rather than here — this config only carries the resolved
 * access token used to authenticate API requests.
 */
export interface OAuthConfig {
  readonly type: "oauth";
  readonly accessToken: Redacted.Redacted<string>;
  readonly organization: string;
  readonly apiBaseUrl: string;
}

export type Config = ServiceTokenConfig | OAuthConfig;

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("PlanetScaleCredentials") {}

/**
 * Build the `Authorization` header for a resolved set of credentials.
 * Service tokens use PlanetScale's `<id>:<secret>` scheme; OAuth access
 * tokens use standard `Bearer`.
 */
export const formatHeaders = (config: Config): Record<string, string> =>
  config.type === "oauth"
    ? { Authorization: `Bearer ${Redacted.value(config.accessToken)}` }
    : {
        Authorization: `${Redacted.value(config.tokenId)}:${Redacted.value(config.token)}`,
      };

/**
 * Build a `Credentials` Layer from an OAuth access token.
 */
export const fromOAuth = (input: {
  accessToken: string | Redacted.Redacted<string>;
  organization: string;
  apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      type: "oauth",
      accessToken:
        typeof input.accessToken === "string"
          ? Redacted.make(input.accessToken)
          : input.accessToken,
      organization: input.organization,
      apiBaseUrl: input.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );

const envConfig = EffectConfig.all({
  tokenId: EffectConfig.string("PLANETSCALE_API_TOKEN_ID"),
  token: EffectConfig.string("PLANETSCALE_API_TOKEN"),
  organization: EffectConfig.string("PLANETSCALE_ORGANIZATION"),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig
    .pipe(
      Effect.mapError(
        () =>
          new ConfigError({
            message:
              "PLANETSCALE_API_TOKEN_ID, PLANETSCALE_API_TOKEN, and PLANETSCALE_ORGANIZATION environment variables are required",
          }),
      ),
      Effect.map(({ tokenId, token, organization }) => ({
        tokenId: Redacted.make(tokenId),
        token: Redacted.make(token),
        organization,
        apiBaseUrl: DEFAULT_API_BASE_URL,
      })),
    )
    .pipe(Effect.orDie),
);
