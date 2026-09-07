/**
 * Forgejo credentials — hand-written.
 *
 * The `Credentials` service resolves `{ token, apiBaseUrl }` per request; the
 * protocol layer formats the `Authorization: token <token>` header from it.
 *
 * Forgejo is self-hosted, so — unlike a single-tenant SaaS — there is no
 * default API root: the instance URL is part of the credential. The token is
 * an access token generated under Settings → Applications → Access Tokens on
 * the instance (a `write:admin`-scoped one for the `/admin` endpoints).
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/**
 * Path prefix of the Forgejo REST API, relative to the instance origin. The
 * version is a PATH segment rather than a header, so it belongs to the base
 * URL: the generated operations carry prefix-less routes (`/user/repos`,
 * `/repos/{owner}/{repo}`).
 */
export const API_PATH = "/api/v1";

/**
 * Normalize an instance origin (or an already-complete API root) into the
 * API v1 base URL: trailing slashes are dropped and {@link API_PATH} is
 * appended exactly once.
 */
export const normalizeBaseUrl = (baseUrl: string): string => {
  const trimmed = baseUrl.replace(/\/+$/, "");
  return trimmed.endsWith(API_PATH) ? trimmed : `${trimmed}${API_PATH}`;
};

export interface Config {
  readonly token: Redacted.Redacted<string>;
  /** Fully-qualified API root, e.g. `https://git.example.com/api/v1`. */
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("ForgejoCredentials") {}

const envConfig = EffectConfig.all({
  // `FORGEJO_URL` / `FORGEJO_TOKEN` are the names Forgejo's own Actions
  // runner and the Terraform/OpenTofu providers read.
  token: EffectConfig.string("FORGEJO_TOKEN"),
  baseUrl: EffectConfig.string("FORGEJO_URL"),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message:
            "FORGEJO_URL and FORGEJO_TOKEN environment variables are required",
        }),
    ),
    Effect.map(({ token, baseUrl }) => ({
      token: Redacted.make(token),
      apiBaseUrl: normalizeBaseUrl(baseUrl),
    })),
    Effect.orDie,
  ),
);

/**
 * Convenience layer from a plain token and the instance origin (or API root).
 */
export const credentials = (config: {
  readonly token: string | Redacted.Redacted<string>;
  readonly baseUrl: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      token:
        typeof config.token === "string"
          ? Redacted.make(config.token)
          : config.token,
      apiBaseUrl: normalizeBaseUrl(config.baseUrl),
    }),
  );
