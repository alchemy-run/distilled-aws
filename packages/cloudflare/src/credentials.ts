/**
 * Cloudflare credentials — hand-written.
 *
 * API-compatible port of the distilled repo's cloudflare credentials module:
 * the `Credentials` service holds an *effect* that resolves the current
 * credentials (apiToken / apiKey+email / OAuth with refresh) on every
 * request, so rotating or refreshing tokens Just Works. The protocol layer
 * resolves it per request and formats the auth headers via
 * {@link formatHeaders}.
 */
import * as Config from "effect/Config";
import * as Context from "effect/Context";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

export const DEFAULT_API_BASE_URL = "https://api.cloudflare.com/client/v4";

const CREDENTIAL_REFRESH_WINDOW_MS = 5 * 60 * 1000;

export interface ApiTokenConfig {
  readonly apiToken: string;
  readonly apiBaseUrl?: string;
}

export interface ApiKeyConfig {
  readonly apiKey: string;
  readonly email: string;
  readonly apiBaseUrl?: string;
}

export interface OAuthConfig {
  readonly accessToken: string;
  readonly refreshToken?: string;
  readonly expiresAt?: number;
}

export interface OAuthProvider {
  readonly load: Effect.Effect<OAuthConfig, unknown>;
  readonly refresh: (
    credentials: OAuthConfig,
  ) => Effect.Effect<OAuthConfig, unknown>;
  readonly apiBaseUrl?: string;
}

export interface ApiTokenCredentials {
  readonly type: "apiToken";
  readonly apiToken: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export interface ApiKeyCredentials {
  readonly type: "apiKey";
  readonly apiKey: Redacted.Redacted<string>;
  readonly email: string;
  readonly apiBaseUrl: string;
}

export interface OAuthCredentials {
  readonly type: "oauth";
  readonly accessToken: Redacted.Redacted<string>;
  readonly refreshToken: Redacted.Redacted<string> | undefined;
  readonly expiresAt?: number;
  readonly apiBaseUrl: string;
}

export type ResolvedCredentials =
  | ApiTokenCredentials
  | ApiKeyCredentials
  | OAuthCredentials;

export class OAuthRefreshError extends Data.TaggedError(
  "CloudflareOAuthRefreshError",
)<{
  message: string;
  cause?: unknown;
}> {}

export type CredentialsError = ConfigError | OAuthRefreshError;

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<ResolvedCredentials, CredentialsError, never>
>()("CloudflareCredentials") {}

const resolveApiBaseUrl = (apiBaseUrl?: string): string =>
  apiBaseUrl ?? DEFAULT_API_BASE_URL;

export const apiTokenCredentials = (
  config: ApiTokenConfig,
): ApiTokenCredentials => ({
  type: "apiToken",
  apiToken: Redacted.make(config.apiToken),
  apiBaseUrl: resolveApiBaseUrl(config.apiBaseUrl),
});

export const apiKeyCredentials = (config: ApiKeyConfig): ApiKeyCredentials => ({
  type: "apiKey",
  apiKey: Redacted.make(config.apiKey),
  email: config.email,
  apiBaseUrl: resolveApiBaseUrl(config.apiBaseUrl),
});

export const oauthCredentials = (
  config: OAuthConfig,
  apiBaseUrl?: string,
): OAuthCredentials => ({
  type: "oauth",
  accessToken: Redacted.make(config.accessToken),
  refreshToken: config.refreshToken
    ? Redacted.make(config.refreshToken)
    : undefined,
  expiresAt: config.expiresAt,
  apiBaseUrl: resolveApiBaseUrl(apiBaseUrl),
});

const getRefreshAt = (credentials: ResolvedCredentials): number => {
  if (credentials.type !== "oauth" || credentials.expiresAt === undefined) {
    return Number.POSITIVE_INFINITY;
  }
  return credentials.expiresAt <= Date.now() + CREDENTIAL_REFRESH_WINDOW_MS
    ? credentials.expiresAt
    : credentials.expiresAt - CREDENTIAL_REFRESH_WINDOW_MS;
};

const isExpired = (expiresAt?: number): boolean =>
  expiresAt !== undefined &&
  Date.now() >= expiresAt - CREDENTIAL_REFRESH_WINDOW_MS;

const createCachedCredentialsEffect = <E>(
  resolve: Effect.Effect<ResolvedCredentials, E>,
): Effect.Effect<ResolvedCredentials, E> => {
  let cachedCreds: ResolvedCredentials | undefined;
  let refreshAt = 0;

  return Effect.suspend(() => {
    const now = Date.now();
    if (cachedCreds && now < refreshAt) {
      return Effect.succeed(cachedCreds);
    }

    return Effect.map(resolve, (credentials) => {
      cachedCreds = credentials;
      refreshAt = getRefreshAt(credentials);
      return credentials;
    });
  });
};

const wrapOAuthError = <A>(
  message: string,
  effect: Effect.Effect<A, unknown>,
): Effect.Effect<A, OAuthRefreshError> =>
  effect.pipe(
    Effect.mapError(
      (cause) =>
        new OAuthRefreshError({
          message,
          cause,
        }),
    ),
  );

export const fromApiToken = (
  config: ApiTokenConfig,
): Layer.Layer<Credentials> =>
  Layer.succeed(Credentials, Effect.succeed(apiTokenCredentials(config)));

export const fromApiKey = (config: ApiKeyConfig): Layer.Layer<Credentials> =>
  Layer.succeed(Credentials, Effect.succeed(apiKeyCredentials(config)));

export const fromOAuth = (
  provider: OAuthProvider,
): Layer.Layer<Credentials> => {
  let currentCredentials: OAuthConfig | undefined;

  const resolve = Effect.gen(function* () {
    const loadedCredentials =
      currentCredentials ??
      (yield* wrapOAuthError(
        "Failed to load Cloudflare OAuth credentials.",
        provider.load,
      ));

    const credentials = isExpired(loadedCredentials.expiresAt)
      ? yield* wrapOAuthError(
          "Failed to refresh Cloudflare OAuth credentials.",
          provider.refresh(loadedCredentials),
        )
      : loadedCredentials;

    currentCredentials = credentials;
    return oauthCredentials(credentials, provider.apiBaseUrl);
  });

  return Layer.succeed(Credentials, createCachedCredentialsEffect(resolve));
};

const fromConfigError = (message: string) => () =>
  new ConfigError({
    message,
  });

const envConfig = Config.all({
  apiToken: Config.option(Config.string("CLOUDFLARE_API_TOKEN")),
  apiKey: Config.option(Config.string("CLOUDFLARE_API_KEY")),
  email: Config.option(Config.string("CLOUDFLARE_EMAIL")),
  apiBaseUrl: Config.string("CLOUDFLARE_API_BASE_URL").pipe(
    Config.withDefault(DEFAULT_API_BASE_URL),
  ),
});

export const resolveFromEnv: Effect.Effect<ResolvedCredentials, ConfigError> =
  Effect.gen(function* () {
    const config = yield* envConfig.pipe(
      Effect.mapError(
        fromConfigError("Failed to load Cloudflare credentials from config"),
      ),
    );
    const apiToken = Option.getOrUndefined(config.apiToken);
    const apiKey = Option.getOrUndefined(config.apiKey);
    const email = Option.getOrUndefined(config.email);
    const apiBaseUrl = config.apiBaseUrl;

    if (apiToken) {
      return apiTokenCredentials({ apiToken, apiBaseUrl });
    }

    if (apiKey && email) {
      return apiKeyCredentials({ apiKey, email, apiBaseUrl });
    }

    if (apiKey && !email) {
      return yield* new ConfigError({
        message:
          "CLOUDFLARE_EMAIL environment variable is required when using CLOUDFLARE_API_KEY",
      });
    }

    if (!apiKey && email) {
      return yield* new ConfigError({
        message:
          "CLOUDFLARE_API_KEY environment variable is required when using CLOUDFLARE_EMAIL",
      });
    }

    return yield* new ConfigError({
      message:
        "Either CLOUDFLARE_API_TOKEN or CLOUDFLARE_API_KEY+CLOUDFLARE_EMAIL environment variables are required",
    });
  });

export const fromEnv = (): Layer.Layer<Credentials> =>
  Layer.succeed(Credentials, resolveFromEnv);

export const CredentialsFromEnv = fromEnv();

export const formatHeaders = (
  credentials: ResolvedCredentials,
): Record<string, string> => {
  switch (credentials.type) {
    case "apiKey":
      return {
        "X-Auth-Key": Redacted.value(credentials.apiKey),
        "X-Auth-Email": credentials.email,
      };
    case "apiToken":
      return {
        Authorization: `Bearer ${Redacted.value(credentials.apiToken)}`,
      };
    case "oauth":
      return {
        Authorization: `Bearer ${Redacted.value(credentials.accessToken)}`,
      };
  }
};

/**
 * Convenience layer from a plain token + optional base URL (kept for local
 * tests; distilled's equivalent is `fromApiToken`).
 */
export const credentials = (config: {
  readonly apiToken: string;
  readonly baseUrl?: string;
}): Layer.Layer<Credentials> =>
  fromApiToken({ apiToken: config.apiToken, apiBaseUrl: config.baseUrl });
