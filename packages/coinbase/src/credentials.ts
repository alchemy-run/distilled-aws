/**
 * Coinbase CDP credentials — hand-written.
 *
 * API-compatible port of the distilled repo's coinbase credentials module:
 * the `Credentials` service holds an *effect* that resolves the current
 * credentials on every request. The protocol layer resolves it per request
 * and signs a fresh JWT bearer token from the API Key Secret.
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";

export const DEFAULT_API_BASE_URL = "https://api.cdp.coinbase.com/platform";

export interface Config {
  /**
   * CDP API Key ID (UUID format or legacy `organizations/.../apiKeys/...` format).
   */
  readonly apiKeyId: string;

  /**
   * CDP API Key Secret (Ed25519 base64 or EC PEM private key).
   * Used to sign JWT bearer tokens for API authentication.
   */
  readonly apiKeySecret: Redacted.Redacted<string>;

  /**
   * CDP Wallet Secret (base64-encoded DER EC private key).
   * Required only for sensitive wallet operations (POST/DELETE/PUT to account endpoints).
   * If not provided, wallet-auth-requiring operations will fail.
   */
  readonly walletSecret?: Redacted.Redacted<string> | undefined;

  /**
   * Base URL for the Coinbase CDP API.
   * @default "https://api.cdp.coinbase.com/platform"
   */
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("CoinbaseCredentials") {}

const envConfig = EffectConfig.all({
  apiKeyId: EffectConfig.option(EffectConfig.string("CDP_API_KEY_ID")),
  apiKeyName: EffectConfig.option(EffectConfig.string("CDP_API_KEY_NAME")),
  apiKeySecret: EffectConfig.string("CDP_API_KEY_SECRET"),
  walletSecret: EffectConfig.option(EffectConfig.string("CDP_WALLET_SECRET")),
});

export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const config = yield* envConfig.pipe(
      Effect.mapError(
        () =>
          new ConfigError({
            message: "CDP_API_KEY_SECRET environment variable is required",
          }),
      ),
    );

    const apiKeyId =
      Option.getOrUndefined(config.apiKeyId) ??
      Option.getOrUndefined(config.apiKeyName);

    if (!apiKeyId) {
      return yield* new ConfigError({
        message:
          "CDP_API_KEY_ID (or CDP_API_KEY_NAME) environment variable is required",
      });
    }

    const walletSecret = Option.getOrUndefined(config.walletSecret);

    return {
      apiKeyId,
      apiKeySecret: Redacted.make(config.apiKeySecret),
      walletSecret: walletSecret ? Redacted.make(walletSecret) : undefined,
      apiBaseUrl: DEFAULT_API_BASE_URL,
    };
  }).pipe(Effect.orDie),
);
