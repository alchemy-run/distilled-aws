/**
 * MongoDB Atlas credentials — hand-written.
 *
 * Port of the distilled v0 Atlas credentials module: an OAuth2
 * client_credentials service-account flow. `MONGODB_ATLAS_CLIENT_ID` +
 * `MONGODB_ATLAS_CLIENT_SECRET` are exchanged for a bearer access token via
 * a Basic-auth POST to `{base}/api/oauth/token` (grant_type =
 * client_credentials).
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials; the protocol layer resolves it per request on the calling
 * fiber. Unlike v0 (which fetched once and ignored `expires_in`), the token
 * is cached and transparently re-fetched shortly before expiry, so
 * long-running programs keep working past the ~1h token lifetime.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

export const DEFAULT_API_BASE_URL = "https://cloud.mongodb.com";

/** Refresh this long before the token's reported expiry. */
const TOKEN_REFRESH_WINDOW_MS = 60_000;
/** Assumed lifetime when the token response omits `expires_in`. */
const DEFAULT_TOKEN_TTL_SECONDS = 3600;

export interface Config {
  readonly accessToken: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config, ConfigError>
>()("Mongodb-atlasCredentials") {}

export interface ClientCredentialsConfig {
  readonly clientId: string;
  readonly clientSecret: string;
  readonly apiBaseUrl?: string;
}

/** Exchange service-account credentials for an OAuth2 access token. */
const exchangeToken = (
  config: Required<ClientCredentialsConfig>,
): Effect.Effect<
  { accessToken: string; expiresInSeconds: number },
  ConfigError
> =>
  Effect.gen(function* () {
    const res = yield* Effect.tryPromise(() =>
      fetch(`${config.apiBaseUrl}/api/oauth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${config.clientId}:${config.clientSecret}`)}`,
        },
        body: "grant_type=client_credentials",
      }),
    ).pipe(
      Effect.mapError(
        (cause) =>
          new ConfigError({
            message: `OAuth2 token exchange request failed: ${String(cause)}`,
          }),
      ),
    );

    if (!res.ok) {
      const text = yield* Effect.tryPromise(() => res.text()).pipe(
        Effect.orElseSucceed(() => ""),
      );
      return yield* new ConfigError({
        message: `OAuth2 token exchange failed: ${res.status} ${text}`,
      });
    }

    const data = (yield* Effect.tryPromise(() => res.json()).pipe(
      Effect.mapError(
        () =>
          new ConfigError({
            message: "OAuth2 token exchange returned a non-JSON response",
          }),
      ),
    )) as { access_token?: string; expires_in?: number };

    if (typeof data.access_token !== "string") {
      return yield* new ConfigError({
        message: "OAuth2 token exchange response is missing access_token",
      });
    }

    return {
      accessToken: data.access_token,
      expiresInSeconds:
        typeof data.expires_in === "number" && data.expires_in > 0
          ? data.expires_in
          : DEFAULT_TOKEN_TTL_SECONDS,
    };
  });

/**
 * A per-layer cached resolver: exchanges once, reuses the token until
 * shortly before expiry, then re-exchanges.
 */
const cachedTokenEffect = (
  load: Effect.Effect<Required<ClientCredentialsConfig>, ConfigError>,
): Effect.Effect<Config, ConfigError> => {
  let cached: Config | undefined;
  let refreshAt = 0;

  return Effect.suspend(() => {
    if (cached !== undefined && Date.now() < refreshAt) {
      return Effect.succeed(cached);
    }
    return Effect.gen(function* () {
      const config = yield* load;
      const token = yield* exchangeToken(config);
      cached = {
        accessToken: Redacted.make(token.accessToken),
        apiBaseUrl: config.apiBaseUrl,
      };
      refreshAt =
        Date.now() +
        Math.max(
          token.expiresInSeconds * 1000 - TOKEN_REFRESH_WINDOW_MS,
          TOKEN_REFRESH_WINDOW_MS,
        );
      return cached;
    });
  });
};

/** Layer from service-account client credentials (OAuth2 client_credentials). */
export const fromClientCredentials = (
  config: ClientCredentialsConfig,
): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    cachedTokenEffect(
      Effect.succeed({
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      }),
    ),
  );

/** Layer from an already-obtained bearer access token. */
export const fromAccessToken = (config: {
  readonly accessToken: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      accessToken: Redacted.make(config.accessToken),
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );

/**
 * Reads MONGODB_ATLAS_CLIENT_ID + MONGODB_ATLAS_CLIENT_SECRET (required) and
 * MONGODB_ATLAS_API_BASE_URL (optional), exchanging them for a cached OAuth2
 * access token on first use.
 */
export const fromEnv = (): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    cachedTokenEffect(
      Effect.suspend(() => {
        const clientId = process.env.MONGODB_ATLAS_CLIENT_ID;
        const clientSecret = process.env.MONGODB_ATLAS_CLIENT_SECRET;
        if (!clientId || !clientSecret) {
          return Effect.fail(
            new ConfigError({
              message:
                "MONGODB_ATLAS_CLIENT_ID and MONGODB_ATLAS_CLIENT_SECRET environment variables are required",
            }),
          );
        }
        return Effect.succeed({
          clientId,
          clientSecret,
          apiBaseUrl:
            process.env.MONGODB_ATLAS_API_BASE_URL ?? DEFAULT_API_BASE_URL,
        });
      }),
    ),
  );

export const CredentialsFromEnv: Layer.Layer<Credentials> = fromEnv();
