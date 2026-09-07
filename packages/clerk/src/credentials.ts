/**
 * Clerk credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol layer resolves it per request
 * on the calling fiber). Clerk authenticates Backend API calls with a
 * secret key as `Authorization: Bearer <secret>` and versions the API with
 * the `Clerk-API-Version` header.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { ConfigError } from "@distilled.cloud/core/errors";

export const DEFAULT_API_BASE_URL = "https://api.clerk.com/v1";
/** Dated Backend API version this package is generated against. */
export const DEFAULT_API_VERSION = "2026-05-12";

export interface Config {
  readonly apiKey: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  readonly apiVersion: string;
}

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<Config>
>()("ClerkCredentials") {}

/** Layer from a plain secret key + optional base URL and API version. */
export const fromApiKey = (config: {
  readonly apiKey: string;
  readonly apiBaseUrl?: string;
  readonly apiVersion?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: Redacted.make(config.apiKey),
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      apiVersion: config.apiVersion ?? DEFAULT_API_VERSION,
    }),
  );

/** Reads CLERK_SECRET_KEY (required), CLERK_API_BASE_URL, CLERK_API_VERSION. */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.gen(function* () {
    const apiKey = process.env.CLERK_SECRET_KEY;

    if (!apiKey) {
      return yield* new ConfigError({
        message: "CLERK_SECRET_KEY environment variable is required",
      });
    }

    return {
      apiKey: Redacted.make(apiKey),
      apiBaseUrl: process.env.CLERK_API_BASE_URL ?? DEFAULT_API_BASE_URL,
      apiVersion: process.env.CLERK_API_VERSION ?? DEFAULT_API_VERSION,
    };
  }).pipe(Effect.orDie),
);
