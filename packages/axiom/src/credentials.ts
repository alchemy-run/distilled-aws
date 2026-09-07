/**
 * Axiom credentials — hand-written.
 *
 * API-compatible port of the distilled v0 axiom credentials module: the
 * `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber).
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/** Default base URL for Axiom Cloud. Self-hosted users can override via AXIOM_URL. */
export const DEFAULT_API_BASE_URL = "https://api.axiom.co";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  /**
   * Optional organization ID. Required when authenticating with a Personal
   * Access Token (PAT); optional for API tokens scoped to a single org.
   * Sent on every request as the `X-Axiom-Org-ID` header when set.
   */
  readonly orgId?: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("AxiomCredentials") {}

/** Layer from a plain API token + optional base URL / org ID. */
export const fromApiKey = (config: {
  readonly apiKey: string | Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
  readonly orgId?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: Redacted.isRedacted(config.apiKey)
        ? config.apiKey
        : Redacted.make(config.apiKey),
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      orgId: config.orgId,
    }),
  );

const envConfig = EffectConfig.all({
  apiToken: EffectConfig.option(EffectConfig.string("AXIOM_TOKEN")),
  apiKey: EffectConfig.option(EffectConfig.string("AXIOM_API_KEY")),
  apiBaseUrl: EffectConfig.string("AXIOM_URL").pipe(
    EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
  orgId: EffectConfig.option(EffectConfig.string("AXIOM_ORG_ID")),
});

/**
 * Build {@link Credentials} from environment variables.
 *
 * - `AXIOM_TOKEN` or `AXIOM_API_KEY` (required) — Axiom API token or PAT.
 * - `AXIOM_URL` (optional) — override the API base URL (for self-hosted or
 *   regional edge deployments). Defaults to `https://api.axiom.co`.
 * - `AXIOM_ORG_ID` (optional) — organization ID, required for PATs.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const config = yield* envConfig.pipe(
      Effect.mapError(
        () =>
          new ConfigError({
            message:
              "AXIOM_TOKEN (or AXIOM_API_KEY) environment variable is required",
          }),
      ),
    );
    const apiKey =
      Option.getOrUndefined(config.apiToken) ??
      Option.getOrUndefined(config.apiKey);

    if (!apiKey) {
      return yield* new ConfigError({
        message:
          "AXIOM_TOKEN (or AXIOM_API_KEY) environment variable is required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: config.apiBaseUrl,
      orgId: Option.getOrUndefined(config.orgId),
    };
  }).pipe(Effect.orDie),
);
