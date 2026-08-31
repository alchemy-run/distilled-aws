/**
 * Google Workspace credentials — hand-written.
 *
 * API-compatible port of the distilled gcp credentials module: a
 * plain externally-supplied OAuth2 bearer access token (no ADC, no
 * service-account signing, no refresh flow — the token is minted outside
 * the SDK, e.g. `gcloud auth print-access-token`).
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";

export interface Config {
  readonly accessToken: Redacted.Redacted<string>;
  readonly project?: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("GoogleWorkspaceCredentials") {}

const envConfig = EffectConfig.all({
  accessToken: EffectConfig.string("GOOGLE_ACCESS_TOKEN"),
  project: EffectConfig.option(EffectConfig.string("GOOGLE_PROJECT_ID")),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message: "GOOGLE_ACCESS_TOKEN environment variable is required",
        }),
    ),
    Effect.map(({ accessToken, project }) => ({
      accessToken: Redacted.make(accessToken),
      project: Option.getOrUndefined(project),
    })),
    Effect.orDie,
  ),
);

/** Convenience layer from a plain access token (+ optional project id). */
export const fromAccessToken = (config: {
  readonly accessToken: string;
  readonly project?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      accessToken: Redacted.make(config.accessToken),
      project: config.project,
    }),
  );
