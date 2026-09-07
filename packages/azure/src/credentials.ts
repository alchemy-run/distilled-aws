/**
 * Azure credentials — hand-written.
 *
 * API-compatible port of the distilled v0 Azure credentials module: the
 * `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber). The user supplies a pre-acquired OAuth2 bearer
 * token — there is no token-acquisition flow (v0 parity).
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

/**
 * Default base URL for the Azure Resource Manager (ARM) API.
 */
export const DEFAULT_API_BASE_URL = "https://management.azure.com";

export interface Config {
  /** OAuth2 Bearer token for authenticating with Azure. */
  readonly bearerToken: Redacted.Redacted<string>;
  /** Azure subscription ID used as a path parameter in most ARM operations. */
  readonly subscriptionId: string;
  /** Azure tenant (directory) ID. Required for some management plane operations. */
  readonly tenantId?: string;
  /** Base URL for the Azure API (defaults to management.azure.com). */
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("AzureCredentials") {}

const envConfig = EffectConfig.all({
  bearerToken: EffectConfig.string("AZURE_BEARER_TOKEN"),
  subscriptionId: EffectConfig.string("AZURE_SUBSCRIPTION_ID"),
  tenantId: EffectConfig.option(EffectConfig.string("AZURE_TENANT_ID")),
  apiBaseUrl: EffectConfig.string("AZURE_API_BASE_URL").pipe(
    EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

/**
 * Reads Azure credentials from environment variables:
 *
 * - `AZURE_BEARER_TOKEN` — OAuth2 bearer token (required)
 * - `AZURE_SUBSCRIPTION_ID` — Azure subscription ID (required)
 * - `AZURE_TENANT_ID` — Azure tenant/directory ID (optional)
 * - `AZURE_API_BASE_URL` — Optional override for the API base URL
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message:
            "AZURE_BEARER_TOKEN and AZURE_SUBSCRIPTION_ID environment variables are required",
        }),
    ),
    Effect.map(({ bearerToken, subscriptionId, tenantId, apiBaseUrl }) => ({
      bearerToken: Redacted.make(bearerToken),
      subscriptionId,
      tenantId: Option.getOrUndefined(tenantId),
      apiBaseUrl,
    })),
    Effect.orDie,
  ),
);
