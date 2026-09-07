/**
 * Discord credentials — hand-written.
 *
 * The `Credentials` service resolves `{ token, tokenType, apiBaseUrl }` per
 * request; the protocol layer formats the `Authorization: <tokenType> <token>`
 * header from it.
 *
 * Discord authorizes HTTP API calls two ways, distinguished by the token
 * prefix (https://discord.com/developers/docs/reference#authentication):
 *   • `Bot <token>` — a bot token from the application's Bot page (the
 *     default; what almost every server-side integration uses)
 *   • `Bearer <token>` — an OAuth2 access token, for calls made on behalf of
 *     a user (`/users/@me`, `/users/@me/guilds`, …)
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/**
 * Discord HTTP API base URL. The trailing `/v10` is the API version the spec
 * submodule describes — override via `DISCORD_API_URL` only to point at a
 * proxy, not to change versions (the generated operations are v10-shaped).
 */
export const DEFAULT_API_BASE_URL = "https://discord.com/api/v10";

/** Authorization header prefix — see the module doc. */
export type TokenType = "Bot" | "Bearer";

export interface Config {
  readonly token: Redacted.Redacted<string>;
  readonly tokenType: TokenType;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("DiscordCredentials") {}

const envConfig = EffectConfig.all({
  // DISCORD_BOT_TOKEN is the spelling discord.js and most hosting platforms
  // use; DISCORD_TOKEN is the fallback.
  token: EffectConfig.string("DISCORD_BOT_TOKEN").pipe(
    EffectConfig.orElse(() => EffectConfig.string("DISCORD_TOKEN")),
  ),
  tokenType: EffectConfig.string("DISCORD_TOKEN_TYPE").pipe(
    EffectConfig.withDefault("Bot"),
  ),
  apiBaseUrl: EffectConfig.string("DISCORD_API_URL").pipe(
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
            "DISCORD_BOT_TOKEN (or DISCORD_TOKEN) environment variable is required",
        }),
    ),
    Effect.map(({ token, tokenType, apiBaseUrl }) => ({
      token: Redacted.make(token),
      // Anything but an explicit `Bearer` means a bot token — the OAuth2
      // flavor is the opt-in.
      tokenType: (tokenType.toLowerCase() === "bearer"
        ? "Bearer"
        : "Bot") as TokenType,
      apiBaseUrl,
    })),
    Effect.orDie,
  ),
);

/** Convenience layer from a plain token + optional token type / base URL. */
export const credentials = (config: {
  readonly token: string;
  readonly tokenType?: TokenType;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      token: Redacted.make(config.token),
      tokenType: config.tokenType ?? "Bot",
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );
