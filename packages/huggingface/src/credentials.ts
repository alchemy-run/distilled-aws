/**
 * Hugging Face credentials — hand-written.
 *
 * The `Credentials` service resolves `{ token, apiBaseUrl }` per request; the
 * protocol layer formats the `Authorization: Bearer <token>` header from it.
 * The token is a Hub access token (`hf_…` — fine-grained, read, or write) or
 * an OAuth access token; the API accepts all of them as bearer tokens.
 *
 * Many read endpoints (public models, datasets, papers) work without a token
 * at all, but the SDK always sends one: anonymous calls get much lower rate
 * limits and gated/private repos 404.
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/** The Hub's API root — API paths live under `/api` on the main host. */
export const DEFAULT_API_BASE_URL = "https://huggingface.co";

export interface Config {
  readonly token: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("HuggingFaceCredentials") {}

const envConfig = EffectConfig.all({
  // `HF_TOKEN` is what huggingface_hub, huggingface.js and the hf CLI read.
  token: EffectConfig.string("HF_TOKEN"),
  apiBaseUrl: EffectConfig.string("HF_API_URL").pipe(
    EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message: "HF_TOKEN environment variable is required",
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
