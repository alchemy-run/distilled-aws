import { fromHttp as _fromHttp } from "@aws-sdk/credential-providers";

import {
  type AwsCredentialIdentity,
  type AwsCredentialIdentityProvider,
} from "@smithy/types";
import * as Context from "effect/Context";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import type { PlatformError } from "effect/PlatformError";
import * as Redacted from "effect/Redacted";
import type { HttpClientError } from "effect/unstable/http/HttpClientError";
import { fromEnvironment as regionFromEnvironment } from "./region.ts";
import type { RegionName } from "./region.ts";
export * as AWSTypes from "@aws-sdk/types";

export interface AwsCredentials {
  readonly accessKeyId: string;
  readonly secretAccessKey: string;
  readonly sessionToken?: string;
}

/**
 * Resolved credential values ready for request signing.
 *
 * `region` is not optional. Authenticating always establishes one — from the
 * environment, the profile, or the SSO session — and carrying it here is what
 * lets operations drop `Region` from their requirements: the region an
 * operation uses is the one its credentials came with, unless a `Region`
 * override says otherwise.
 */
export interface ResolvedCredentials {
  readonly accessKeyId: Redacted.Redacted<string>;
  readonly secretAccessKey: Redacted.Redacted<string>;
  readonly sessionToken: Redacted.Redacted<string> | undefined;
  readonly region: RegionName;
  readonly expiration?: number;
}

/**
 * The requirements for resolving credentials (HttpClient for SSO, FileSystem for cache).
 */

/**
 * Error types that can occur during credential resolution.
 */
export type CredentialsError =
  | AwsCredentialProviderError
  | MissingRegion
  | ProfileNotFound
  | InvalidSSOProfile
  | InvalidSSOToken
  | ExpiredSSOToken
  | ConflictingSSORegion
  | ConflictingSSOStartUrl
  | SsoPortalError
  | HttpClientError
  | PlatformError;

export class Credentials extends Context.Service<
  Credentials,
  Effect.Effect<ResolvedCredentials, CredentialsError>
>()("AWS::Credentials") {}

export const mock = Layer.succeed(
  Credentials,
  Effect.succeed({
    accessKeyId: Redacted.make("test"),
    secretAccessKey: Redacted.make("test"),
    sessionToken: Redacted.make("test"),
    region: "us-east-1" as RegionName,
  }),
);

/**
 * Create resolved credentials from an AWS credential identity.
 *
 * The identity carries no region — `AwsCredentialIdentity` never has one —
 * so the provider that resolved it supplies the region it authenticated
 * against.
 */
export const fromAwsCredentialIdentity = (
  identity: AwsCredentialIdentity,
  region: RegionName,
): ResolvedCredentials => ({
  accessKeyId: Redacted.make(identity.accessKeyId),
  secretAccessKey: Redacted.make(identity.secretAccessKey),
  sessionToken: identity.sessionToken
    ? Redacted.make(identity.sessionToken)
    : undefined,
  region,
  expiration: identity.expiration?.getTime(),
});

/**
 * A credentials layer resolved a set of credentials but could not determine
 * which region they belong to.
 *
 * A credential-resolution failure like any other, rather than a defect: the
 * caller's fix is the same shape as for a missing key — configure the
 * environment, the profile, or pass it explicitly.
 */
export class MissingRegion extends Data.TaggedError(
  "Alchemy::AWS::MissingRegion",
)<{
  message: string;
  hints?: ReadonlyArray<string>;
}> {}

/**
 * The region a credentials provider authenticated against, from the
 * environment. Node providers that read a profile override this with the
 * profile's own region.
 */
export const regionFromEnv = regionFromEnvironment.pipe(
  Effect.catchCause(
    () =>
      new MissingRegion({
        message: "Resolved credentials, but no region is configured.",
        hints: [
          "Set AWS_REGION (or AWS_DEFAULT_REGION).",
          'Or provide one explicitly with Region.of("us-east-1").',
        ],
      }),
  ),
);

type ProviderName =
  | "env"
  | "ini"
  | "chain"
  | "container"
  | "http"
  | "process"
  | "token-file";

export const providerHints = (
  provider: ProviderName,
): ReadonlyArray<string> | undefined => {
  switch (provider) {
    case "env":
      return [
        "Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY (and AWS_SESSION_TOKEN if needed).",
      ];
    case "ini":
      return ["Check ~/.aws/credentials and ~/.aws/config for the profile."];
    case "chain":
      return [
        "Configure at least one credential source for the default chain.",
        "If using SSO, run `aws sso login` for the profile.",
      ];
    case "container":
      return ["Ensure a container credential endpoint is available."];
    case "http":
      return ["Ensure the configured credential endpoint is reachable."];
    case "process":
      return [
        "Set AWS_CREDENTIAL_PROCESS to a valid command and ensure it exits successfully.",
      ];
    case "token-file":
      return [
        "Set AWS_WEB_IDENTITY_TOKEN_FILE and ensure the file is readable.",
      ];
    default:
      return;
  }
};

/**
 * Time window (5 mins) to refresh credentials before they actually expire.
 * This prevents using credentials that are about to expire.
 */
const CREDENTIAL_REFRESH_WINDOW_MS = 5 * 60 * 1000;

/**
 * Create a credentials effect with lazy resolution and expiration-aware caching.
 * Uses Effect.cachedWithTTL where the TTL is computed from the credentials' expiration.
 */
export const createCachedCredentialsEffect = <E, R>(
  resolve: Effect.Effect<ResolvedCredentials, E, R>,
): Effect.Effect<ResolvedCredentials, E, R> => {
  let cachedCreds: ResolvedCredentials | undefined;
  let expiresAt: number | undefined;

  return Effect.suspend(() => {
    const now = Date.now();
    if (cachedCreds && expiresAt && now < expiresAt) {
      return Effect.succeed(cachedCreds);
    }
    return Effect.map(resolve, (creds) => {
      cachedCreds = creds;
      expiresAt = creds.expiration
        ? creds.expiration - CREDENTIAL_REFRESH_WINDOW_MS
        : undefined;
      return creds;
    });
  });
};

/**
 * Create a lazy, cached credentials provider from an AWS SDK credential provider.
 * Credentials are resolved on first access and cached based on their expiration time.
 */
export const createLazyProvider = (
  provider: (config: {}) => AwsCredentialIdentityProvider,
  providerName: ProviderName,
  /**
   * Where this provider's region comes from. Defaults to the environment;
   * providers that read a profile pass the profile's region instead.
   */
  region: Effect.Effect<RegionName, CredentialsError> = regionFromEnv,
): Layer.Layer<Credentials> => {
  const resolve = Effect.gen(function* () {
    const hints = providerHints(providerName);
    const identity = yield* Effect.tryPromise({
      try: () => provider({})(),
      catch: (cause) =>
        new AwsCredentialProviderError({
          message: `Failed to resolve credentials from ${providerName}.`,
          provider: providerName,
          cause,
          hints,
        }),
    });
    return fromAwsCredentialIdentity(identity, yield* region);
  });

  return Layer.succeed(Credentials, createCachedCredentialsEffect(resolve));
};

/**
 * Create a credentials provider from static credentials.
 * No lazy loading or caching needed since credentials are already available.
 */
export const fromCredentials = (
  credentials: AwsCredentialIdentity,
  /** Defaults to the environment, like every other provider. */
  region?: RegionName,
): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.map(
      region === undefined ? regionFromEnv : Effect.succeed(region),
      (resolved) => fromAwsCredentialIdentity(credentials, resolved),
    ),
  );

export const fromHttp = () => createLazyProvider(_fromHttp, "http");

export const ssoRegion = (region: string) => Layer.succeed(SsoRegion, region);

export class SsoRegion extends Context.Service<SsoRegion, string>()(
  "AWS::SsoRegion",
) {}
export class SsoStartUrl extends Context.Service<SsoStartUrl, string>()(
  "AWS::SsoStartUrl",
) {}

export class ProfileNotFound extends Data.TaggedError(
  "Alchemy::AWS::ProfileNotFound",
)<{
  message: string;
  profile: string;
}> {}

export class ConflictingSSORegion extends Data.TaggedError(
  "Alchemy::AWS::ConflictingSSORegion",
)<{
  message: string;
  ssoRegion: string;
  profile: string;
}> {}

export class ConflictingSSOStartUrl extends Data.TaggedError(
  "Alchemy::AWS::ConflictingSSOStartUrl",
)<{
  message: string;
  ssoStartUrl: string;
  profile: string;
}> {}

export class InvalidSSOProfile extends Data.TaggedError(
  "Alchemy::AWS::InvalidSSOProfile",
)<{
  message: string;
  profile: string;
  missingFields: string[];
}> {}

export class InvalidSSOToken extends Data.TaggedError(
  "Alchemy::AWS::InvalidSSOToken",
)<{
  message: string;
  sso_session: string;
}> {}

export class ExpiredSSOToken extends Data.TaggedError(
  "Alchemy::AWS::ExpiredSSOToken",
)<{
  message: string;
  profile: string;
}> {}

export class AwsCredentialProviderError extends Data.TaggedError(
  "AWS::CredentialProviderError",
)<{
  message: string;
  provider: string;
  cause?: unknown;
  hints?: ReadonlyArray<string>;
}> {}

/**
 * The AWS SSO portal returned a response with no `roleCredentials`, e.g. a
 * `ForbiddenException` when an IAM Identity Center role assignment is in a
 * stale state.
 */
export class SsoPortalError extends Data.TaggedError(
  "Alchemy::AWS::SsoPortalError",
)<{
  message: string;
  profile: string;
  account_id?: string;
  role_name?: string;
  status?: number;
}> {}
