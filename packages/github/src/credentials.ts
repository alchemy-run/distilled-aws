/**
 * GitHub credentials — hand-written.
 *
 * The `Credentials` service resolves `{ token, apiBaseUrl, userAgent }` per
 * request; the protocol layer formats the `Authorization: Bearer <token>`
 * header from it.
 *
 * The token may be a personal access token (classic or fine-grained), a
 * GitHub App installation token, or the `GITHUB_TOKEN` an Actions run is
 * handed — the REST API accepts all of them as bearer tokens.
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/** github.com's REST API root. */
export const DEFAULT_API_BASE_URL = "https://api.github.com";

/**
 * GitHub requires every request to carry a User-Agent and rejects those
 * that don't (403). Callers on GitHub Enterprise Server point
 * `apiBaseUrl` at `https://HOSTNAME/api/v3`.
 */
export const DEFAULT_USER_AGENT = "distilled.cloud-github";

export interface Config {
  readonly token: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  readonly userAgent: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("GithubCredentials") {}

const envConfig = EffectConfig.all({
  // `GITHUB_TOKEN` is what Actions injects; `GH_TOKEN` is the gh CLI's
  // spelling. Either works, GITHUB_TOKEN first.
  token: EffectConfig.string("GITHUB_TOKEN").pipe(
    EffectConfig.orElse(() => EffectConfig.string("GH_TOKEN")),
  ),
  // Actions sets GITHUB_API_URL; GHES runners set it to their own host.
  apiBaseUrl: EffectConfig.string("GITHUB_API_URL").pipe(
    EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
  userAgent: EffectConfig.string("GITHUB_USER_AGENT").pipe(
    EffectConfig.withDefault(DEFAULT_USER_AGENT),
  ),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message:
            "GITHUB_TOKEN (or GH_TOKEN) environment variable is required",
        }),
    ),
    Effect.map(({ token, apiBaseUrl, userAgent }) => ({
      token: Redacted.make(token),
      apiBaseUrl,
      userAgent,
    })),
    Effect.orDie,
  ),
);

/** Convenience layer from a plain token + optional base URL / User-Agent. */
export const credentials = (config: {
  readonly token: string;
  readonly apiBaseUrl?: string;
  readonly userAgent?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      token: Redacted.make(config.token),
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      userAgent: config.userAgent ?? DEFAULT_USER_AGENT,
    }),
  );
