/**
 * Chronosphere credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber).
 *
 * Chronosphere authenticates Config API requests with an API token
 * (`API-Token` header, also accepted as `Authorization: Bearer`). The
 * instance origin is tenant-specific (`https://<instance>.chronosphere.io`).
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  /**
   * Optional actor shown in version history on config-mutating APIs
   * (`Chronosphere-Actor` header).
   */
  readonly actor?: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("ChronosphereCredentials") {}

/** Turn a domain or origin into `https://<host>`. */
const originFrom = (value: string): string => {
  const trimmed = value.replace(/\/+$/, "");
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return trimmed.includes(".")
    ? `https://${trimmed}`
    : `https://${trimmed}.chronosphere.io`;
};

/** Layer from a plain API token + instance origin. */
export const fromApiKey = (config: {
  readonly apiKey: string;
  readonly apiBaseUrl: string;
  readonly actor?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: Redacted.make(config.apiKey),
      apiBaseUrl: originFrom(config.apiBaseUrl),
      actor: config.actor,
    }),
  );

/**
 * Reads CHRONOSPHERE_API_TOKEN (required) and either
 * CHRONOSPHERE_API_BASE_URL or CHRONOSPHERE_DOMAIN (required).
 * CHRONOSPHERE_ACTOR is optional.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey = process.env.CHRONOSPHERE_API_TOKEN;
    const domain =
      process.env.CHRONOSPHERE_API_BASE_URL ?? process.env.CHRONOSPHERE_DOMAIN;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "CHRONOSPHERE_API_TOKEN environment variable is required",
      });
    }
    if (!domain) {
      return yield* new ConfigError({
        message:
          "CHRONOSPHERE_API_BASE_URL or CHRONOSPHERE_DOMAIN environment variable is required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: originFrom(domain),
      actor: process.env.CHRONOSPHERE_ACTOR,
    };
  }).pipe(Effect.orDie),
);
