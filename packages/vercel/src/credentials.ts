/**
 * Vercel credentials — hand-written.
 *
 * The `Credentials` service resolves `{ token, apiBaseUrl }` per request; the
 * protocol layer formats the `Authorization: Bearer <token>` header from it.
 * The token is a Vercel access token — personal, team, or an OAuth
 * integration's — the REST API accepts all of them as bearer tokens.
 *
 * Vercel scopes most requests to a team via the `teamId`/`slug` QUERY
 * parameters, which the spec declares per operation; they stay ordinary input
 * fields rather than credential state, because a single token routinely spans
 * several teams.
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/** Vercel's REST API root. */
export const DEFAULT_API_BASE_URL = "https://api.vercel.com";

export interface Config {
  readonly token: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("VercelCredentials") {}

const envConfig = EffectConfig.all({
  // `VERCEL_TOKEN` is what the Vercel CLI and the official SDK read.
  token: EffectConfig.string("VERCEL_TOKEN"),
  apiBaseUrl: EffectConfig.string("VERCEL_API_URL").pipe(
    EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message: "VERCEL_TOKEN environment variable is required",
        }),
    ),
    Effect.map(({ token, apiBaseUrl }) => ({
      token: Redacted.make(token),
      apiBaseUrl,
    })),
    Effect.orDie,
  ),
);

/** Convenience layer from a plain token + optional base URL. */
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
