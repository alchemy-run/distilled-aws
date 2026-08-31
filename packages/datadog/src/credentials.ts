/**
 * Datadog credentials — hand-written.
 *
 * API-compatible port of the distilled v0 Neon credentials module, adapted
 * for Datadog's dual-header auth (`DD-API-KEY` + optional
 * `DD-APPLICATION-KEY`) and regional sites. The `Credentials` service holds
 * an *effect* that resolves the current credentials on every request (the
 * protocol layer resolves it per request on the calling fiber).
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/** Default Datadog site (US1). */
export const DEFAULT_SITE = "datadoghq.com";

/** US1 REST API root — `https://api.${DEFAULT_SITE}`. */
export const DEFAULT_API_BASE_URL = "https://api.datadoghq.com";

/** Map a Datadog site (`datadoghq.eu`, `us3.datadoghq.com`, …) to its API origin. */
export const apiBaseUrlForSite = (site: string): string =>
  `https://api.${site}`;

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly applicationKey?: Redacted.Redacted<string>;
  readonly site: string;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("DatadogCredentials") {}

/** Layer from a plain API key + optional application key / site / base URL. */
export const fromApiKey = (config: {
  readonly apiKey: string;
  readonly applicationKey?: string;
  readonly site?: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> => {
  const site = config.site ?? DEFAULT_SITE;
  return Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: Redacted.make(config.apiKey),
      applicationKey:
        config.applicationKey !== undefined
          ? Redacted.make(config.applicationKey)
          : undefined,
      site,
      apiBaseUrl: config.apiBaseUrl ?? apiBaseUrlForSite(site),
    }),
  );
};

/**
 * Reads DD_API_KEY (required), DD_APP_KEY (optional), DD_SITE (optional)
 * and DD_API_BASE_URL (optional override of `https://api.${site}`).
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey = process.env.DD_API_KEY;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "DD_API_KEY environment variable is required",
      });
    }

    const site = process.env.DD_SITE ?? DEFAULT_SITE;
    const applicationKey = process.env.DD_APP_KEY;

    return {
      apiKey: Redacted.make(apiKey),
      applicationKey:
        applicationKey !== undefined
          ? Redacted.make(applicationKey)
          : undefined,
      site,
      apiBaseUrl: process.env.DD_API_BASE_URL ?? apiBaseUrlForSite(site),
    };
  }).pipe(Effect.orDie),
);
