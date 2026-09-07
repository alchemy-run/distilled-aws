/**
 * Railway credentials — hand-written.
 *
 * Railway's public API is a single GraphQL endpoint. It accepts two kinds of
 * token, and they go in *different headers*:
 *
 *   • account / team tokens → `Authorization: Bearer <token>`
 *   • project tokens        → `Project-Access-Token: <token>`
 *
 * A project token is scoped to one environment of one project and is what CI
 * usually gets; sending it as a Bearer token fails to authenticate, so the
 * token *kind* is part of the credential rather than something the protocol
 * guesses from the value.
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";

/** Default Railway backboard host. The endpoint path is set per operation. */
export const DEFAULT_API_BASE_URL = "https://backboard.railway.com";

/**
 * Which header carries the token.
 *
 * - `"account"` — `Authorization: Bearer <token>`; personal, team, and
 *   workspace tokens from https://railway.com/account/tokens
 * - `"project"` — `Project-Access-Token: <token>`; a token scoped to a single
 *   project environment
 */
export type TokenKind = "account" | "project";

export interface Config {
  readonly token: Redacted.Redacted<string>;
  readonly tokenKind: TokenKind;
  readonly apiBaseUrl: string;
}

/**
 * Build a {@link Config} from a raw token string. Always wraps with this
 * package's `Redacted` so protocol-side `Redacted.value` works even when
 * the caller lives in a different `effect` install (nested distilled vs
 * alchemy workspace).
 */
export const toConfig = (config: {
  readonly token: string;
  readonly tokenKind?: TokenKind;
  readonly apiBaseUrl?: string;
}): Config => ({
  token: Redacted.make(config.token),
  tokenKind: config.tokenKind ?? "account",
  apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
});

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("RailwayCredentials") {}

/** Build {@link Credentials} from an explicit token. */
export const CredentialsFromToken = (config: {
  readonly token: string | Redacted.Redacted<string>;
  /** Defaults to `"account"` (the `Authorization: Bearer` header). */
  readonly tokenKind?: TokenKind;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed(
      toConfig({
        token: Redacted.isRedacted(config.token)
          ? Redacted.value(config.token)
          : config.token,
        tokenKind: config.tokenKind,
        apiBaseUrl: config.apiBaseUrl,
      }),
    ),
  );

const envConfig = EffectConfig.all({
  apiToken: EffectConfig.option(EffectConfig.string("RAILWAY_API_TOKEN")),
  railwayToken: EffectConfig.option(EffectConfig.string("RAILWAY_TOKEN")),
  projectToken: EffectConfig.option(
    EffectConfig.string("RAILWAY_PROJECT_TOKEN"),
  ),
  apiBaseUrl: EffectConfig.string("RAILWAY_API_URL").pipe(
    EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

const MISSING_TOKEN =
  "RAILWAY_API_TOKEN (or RAILWAY_TOKEN / RAILWAY_PROJECT_TOKEN) environment variable is required";

/**
 * Build {@link Credentials} from environment variables.
 *
 * - `RAILWAY_API_TOKEN` or `RAILWAY_TOKEN` — an account/team token, sent as
 *   `Authorization: Bearer`. (`RAILWAY_TOKEN` is the name the Railway CLI
 *   uses.)
 * - `RAILWAY_PROJECT_TOKEN` — a project-scoped token, sent as
 *   `Project-Access-Token`.
 * - `RAILWAY_API_URL` (optional) — override the host. Defaults to
 *   `https://backboard.railway.com`.
 *
 * An account token wins when both kinds are set: it is the broader
 * credential, so preferring it keeps every operation reachable instead of
 * silently confining the client to one project environment.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const config = yield* envConfig.pipe(
      Effect.mapError(() => new ConfigError({ message: MISSING_TOKEN })),
    );

    const account =
      Option.getOrUndefined(config.apiToken) ??
      Option.getOrUndefined(config.railwayToken);
    const project = Option.getOrUndefined(config.projectToken);
    const token = account ?? project;

    if (!token) {
      return yield* new ConfigError({ message: MISSING_TOKEN });
    }

    return {
      token: Redacted.make(token),
      tokenKind: account !== undefined ? "account" : "project",
      apiBaseUrl: config.apiBaseUrl,
    } satisfies Config;
  }).pipe(Effect.orDie),
);
