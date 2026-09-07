/**
 * Slack credentials — hand-written.
 *
 * The `Credentials` service resolves `{ token, apiBaseUrl }` per request; the
 * protocol layer formats the `Authorization: Bearer <token>` header from it.
 *
 * Slack authorizes Web API calls with one bearer token, and the token's
 * PREFIX carries its kind (https://docs.slack.dev/authentication/tokens):
 *   • `xoxb-…` — a bot token (what almost every integration uses)
 *   • `xoxp-…` — a user token, for calls made on behalf of a user
 *   • `xoxe.xoxb-…` / `xoxe.xoxp-…` — rotating (expiring) variants
 *   • `xapp-…` — an app-level token (Socket Mode / `apps.connections.open`)
 * The header is the same for all of them, so there is no token-type knob.
 *
 * The OAuth exchange methods (`oauth.v2.access`, `openid.connect.token`, …)
 * authenticate with `client_id`/`client_secret` args instead of a token — for
 * those, an empty-string token is allowed and the protocol simply omits the
 * Authorization header.
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/**
 * Slack Web API base URL. Every method is `POST/GET <base>/<method>`.
 * Override via `SLACK_API_URL` only to point at a proxy or a mock.
 */
export const DEFAULT_API_BASE_URL = "https://slack.com/api";

export interface Config {
  readonly token: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("SlackCredentials") {}

const envConfig = EffectConfig.all({
  // SLACK_BOT_TOKEN is the spelling Bolt and most hosting platforms use;
  // SLACK_TOKEN is the fallback (the node SDK's CLI convention).
  token: EffectConfig.string("SLACK_BOT_TOKEN").pipe(
    EffectConfig.orElse(() => EffectConfig.string("SLACK_TOKEN")),
  ),
  apiBaseUrl: EffectConfig.string("SLACK_API_URL").pipe(
    EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message:
            "SLACK_BOT_TOKEN (or SLACK_TOKEN) environment variable is required",
        }),
    ),
    Effect.map(({ token, apiBaseUrl }) => ({
      token: Redacted.make(token),
      apiBaseUrl,
    })),
    Effect.orDie,
  ),
);

/**
 * Convenience layer from a plain token + optional base URL. Pass an empty
 * token (`""`) for the credential-less OAuth exchange methods.
 */
export const credentials = (config: {
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
