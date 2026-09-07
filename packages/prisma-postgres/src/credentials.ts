/**
 * Prisma Postgres credentials — hand-written.
 *
 * API-compatible port of the distilled repo's prisma-postgres credentials
 * module: the `Credentials` service holds an *effect* that resolves the
 * current credentials on every request. Auth is a single bearer token
 * (`Authorization: Bearer <apiToken>`) against `https://api.prisma.io`.
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

export const DEFAULT_API_BASE_URL = "https://api.prisma.io";

export interface Config {
  readonly apiToken: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config, ConfigError, never>
>()("PrismaPostgresCredentials") {}

/** Layer from a plain token + optional base URL. */
export const fromApiToken = (config: {
  readonly apiToken: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiToken: Redacted.make(config.apiToken),
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
    }),
  );

const envConfig = EffectConfig.all({
  apiToken: EffectConfig.string("PRISMA_POSTGRES_API_TOKEN"),
});

/**
 * Layer resolving credentials from the environment: `PRISMA_POSTGRES_API_TOKEN`
 * (required). The base URL is fixed to {@link DEFAULT_API_BASE_URL}, matching
 * the distilled v0 SDK.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message: "PRISMA_POSTGRES_API_TOKEN environment variable is required",
        }),
    ),
    Effect.map(({ apiToken }) => ({
      apiToken: Redacted.make(apiToken),
      apiBaseUrl: DEFAULT_API_BASE_URL,
    })),
  ),
);
