/**
 * Hetzner Cloud credentials — hand-written.
 *
 * The `Credentials` service resolves `{ token, apiBaseUrl }` per request; the
 * protocol layer formats the `Authorization: Bearer <token>` header from it.
 * The token is a Hetzner Cloud API token, created per PROJECT in the Cloud
 * Console — there is no account-wide token, so a token IS the project scope
 * and no project/tenant field rides on the requests.
 *
 * A token is issued read-write or read-only; a read-only token answers any
 * non-GET request with `403 token_readonly` (surfaced as `Forbidden`).
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/**
 * Hetzner Cloud's API root. The version is a PATH segment rather than a
 * header, so it belongs to the base URL: the generated operations carry
 * version-less routes (`/servers`, `/volumes/{id}`).
 */
export const DEFAULT_API_BASE_URL = "https://api.hetzner.cloud/v1";

export interface Config {
  readonly token: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("HetznerCredentials") {}

const envConfig = EffectConfig.all({
  // `HCLOUD_TOKEN` / `HCLOUD_ENDPOINT` are what the `hcloud` CLI, the
  // Terraform provider and the official Go library read.
  token: EffectConfig.string("HCLOUD_TOKEN"),
  apiBaseUrl: EffectConfig.string("HCLOUD_ENDPOINT").pipe(
    EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message: "HCLOUD_TOKEN environment variable is required",
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
