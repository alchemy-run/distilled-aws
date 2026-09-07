import * as ini from "@smithy/shared-ini-file-loader";
import * as Console from "effect/Console";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Option from "effect/Option";
import * as Path from "effect/Path";
import * as Redacted from "effect/Redacted";
import * as HttpClient from "effect/unstable/http/HttpClient";
import { createHash } from "node:crypto";
import {
  Auth,
  type AwsProfileConfig,
  type SsoProfileConfig,
  type SSOToken,
} from "./auth.browser.ts";
import {
  ConflictingSSORegion,
  ConflictingSSOStartUrl,
  ExpiredSSOToken,
  InvalidSSOProfile,
  InvalidSSOToken,
  ProfileNotFound,
  regionFromEnv,
  SsoPortalError,
  SsoRegion,
  SsoStartUrl,
  type ResolvedCredentials,
} from "./credentials.ts";
import { parseIni, parseSSOSessionData } from "./util/parse-ini.ts";

export * from "./auth.browser.ts";

/**
 * The time window (5 mins) that SDK will treat the SSO token expires in before the defined expiration date in token.
 * This is needed because server side may have invalidated the token before the defined expiration date.
 */
const EXPIRE_WINDOW_MS = 5 * 60 * 1000;

const REFRESH_MESSAGE = `To refresh this SSO session run 'aws sso login' with the corresponding profile.`;

export const Default = Effect.serviceOption(Auth).pipe(
  Effect.map(Option.getOrUndefined),
  Effect.flatMap((c) => (c ? Effect.succeed(c) : makeAuthService())),
);

export const loadProfile = (profile: string) =>
  Effect.flatMap(Default, (auth) => auth.loadProfile(profile));

export const loadProfileCredentials = (profile: string) =>
  Effect.flatMap(Default, (auth) => auth.loadProfileCredentials(profile));

export const makeAuthService = () =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const client = yield* HttpClient.HttpClient;

    const loadProfile = Effect.fn(function* (profileName: string) {
      const profiles: {
        [profileName: string]: AwsProfileConfig;
      } = yield* Effect.promise(() =>
        ini.parseKnownFiles({ profile: profileName }),
      );

      const profile = profiles[profileName];

      if (!profile) {
        return yield* new ProfileNotFound({
          message: `Profile ${profileName} not found`,
          profile: profileName,
        });
      }

      const awsDir = path.join(ini.getHomeDir(), ".aws");
      const configPath = path.join(awsDir, "config");

      // A profile is an SSO profile in one of two config formats:
      //   - modern: `sso_session = <name>` referencing an `[sso-session <name>]`
      //     section that holds `sso_start_url` / `sso_region`.
      //   - legacy inline: `sso_start_url` (and `sso_region`) set directly on the
      //     profile, with no `sso_session`.
      // Only the modern format needs the session lookup; both then validate the
      // required SSO fields. (Legacy inline is still emitted by older `aws configure
      // sso` runs and remains valid, so treat it as an SSO profile rather than
      // reporting the profile as not found.)
      if (profile.sso_session || profile.sso_start_url) {
        if (profile.sso_session) {
          const ssoRegion = Option.getOrUndefined(
            yield* Effect.serviceOption(SsoRegion),
          );
          const ssoStartUrl = Option.getOrElse(
            yield* Effect.serviceOption(SsoStartUrl),
            () => profile.sso_start_url,
          );

          const ssoSessions = yield* fs.readFileString(configPath).pipe(
            Effect.flatMap((config) =>
              Effect.promise(async () => parseIni(config)),
            ),
            Effect.map(parseSSOSessionData),
          );
          const session = ssoSessions[profile.sso_session];
          if (ssoRegion && ssoRegion !== session.sso_region) {
            return yield* new ConflictingSSORegion({
              message: `Conflicting SSO region`,
              ssoRegion: ssoRegion,
              profile: profile.sso_session,
            });
          }
          if (ssoStartUrl && ssoStartUrl !== session.sso_start_url) {
            return yield* new ConflictingSSOStartUrl({
              message: `Conflicting SSO start url`,
              ssoStartUrl: ssoStartUrl,
              profile: profile.sso_session,
            });
          }
          profile.sso_region = session.sso_region;
          profile.sso_start_url = session.sso_start_url;
        }

        const ssoFields = [
          "sso_start_url",
          "sso_account_id",
          "sso_region",
          "sso_role_name",
        ] as const satisfies (keyof SsoProfileConfig)[];
        const missingFields = ssoFields.filter((field) => !profile[field]);
        if (missingFields.length > 0) {
          yield* new InvalidSSOProfile({
            profile: profileName,
            missingFields,
            message:
              `Profile is configured with invalid SSO credentials. Required parameters "sso_account_id", ` +
              `"sso_region", "sso_role_name", "sso_start_url". Got ${Object.keys(
                profile,
              ).join(
                ", ",
              )}\nReference: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html`,
          });
        }
        return profile;
      }

      return yield* new ProfileNotFound({
        message: `Profile ${profileName} not found`,
        profile: profileName,
      });
    });

    const loadProfileCredentials = Effect.fn(function* (profileName: string) {
      const awsDir = path.join(ini.getHomeDir(), ".aws");
      const cachePath = path.join(awsDir, "sso", "cache");

      const profile = yield* loadProfile(profileName);

      // The region these credentials belong to. An SSO profile always
      // configures one (`sso_region` is required); `region` overrides it when
      // the profile calls a different region than its SSO portal lives in.
      // The environment is the last resort, for a profile carrying neither.
      const region =
        profile.region ?? profile.sso_region ?? (yield* regionFromEnv);

      // Both SSO formats cache the access token under sha1 of the cache key: the
      // `sso_session` name (modern) or the `sso_start_url` (legacy inline format).
      const ssoCacheKey = profile.sso_session ?? profile.sso_start_url;
      if (ssoCacheKey) {
        const hasher = createHash("sha1");
        const cacheName = hasher.update(ssoCacheKey).digest("hex");
        const ssoTokenFilepath = path.join(cachePath, `${cacheName}.json`);
        const cachedCredsFilePath = path.join(
          cachePath,
          `${cacheName}.credentials.json`,
        );

        // `Effect.try` so a `JSON.parse` throw on an empty/partial file
        // (a brief race window when another process is rewriting the
        // SSO cache) becomes a typed error and is caught below — without
        // the wrap it surfaces as a fiber defect that blows past
        // `Effect.catch`.
        const cachedCreds = yield* fs.readFileString(cachedCredsFilePath).pipe(
          Effect.flatMap((text) =>
            Effect.try({
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              try: (): any => JSON.parse(text),
              catch: (cause) => cause,
            }),
          ),
          Effect.catch(() => Effect.void),
        );

        const isExpired = (expiry: number | string | undefined) => {
          return (
            expiry === undefined ||
            new Date(expiry).getTime() - Date.now() <= EXPIRE_WINDOW_MS
          );
        };

        if (cachedCreds && !isExpired(cachedCreds.expiry)) {
          return {
            accessKeyId: Redacted.make(cachedCreds.accessKeyId),
            secretAccessKey: Redacted.make(cachedCreds.secretAccessKey),
            sessionToken: cachedCreds.sessionToken
              ? Redacted.make(cachedCreds.sessionToken)
              : undefined,
            region,
            expiration: cachedCreds.expiry,
          } satisfies ResolvedCredentials;
        }

        const ssoToken = yield* fs.readFileString(ssoTokenFilepath).pipe(
          // `Effect.try` so a `JSON.parse` throw on an empty/partial
          // token file (a brief race window when another process is
          // refreshing the cache) becomes a typed error and is caught
          // below — without the wrap it surfaces as a fiber defect.
          Effect.flatMap((text) =>
            Effect.try({
              try: () => JSON.parse(text) as SSOToken,
              catch: (cause) => cause,
            }),
          ),
          Effect.catch(
            () =>
              new InvalidSSOToken({
                message: `The SSO session token associated with profile=${profileName} was not found or is invalid. ${REFRESH_MESSAGE}`,
                sso_session: ssoCacheKey,
              }),
          ),
        );

        if (isExpired(ssoToken.expiresAt)) {
          yield* Console.log(
            `The SSO session token associated with profile=${profileName} was not found or is invalid. ${REFRESH_MESSAGE}`,
          );
          return yield* new ExpiredSSOToken({
            message: `The SSO session token associated with profile=${profileName} was not found or is invalid. ${REFRESH_MESSAGE}`,
            profile: profileName,
          });
        }

        const response = yield* client.get(
          `https://portal.sso.${profile.sso_region}.amazonaws.com/federation/credentials?account_id=${profile.sso_account_id}&role_name=${profile.sso_role_name}`,
          {
            headers: {
              "User-Agent": "alchemy.run",
              "Content-Type": "application/json",
              "x-amz-sso_bearer_token": ssoToken.accessToken,
            },
          },
        );

        const body = (yield* response.json) as {
          roleCredentials?: {
            accessKeyId: string;
            secretAccessKey: string;
            sessionToken: string;
            expiration: number;
          };
          message?: string;
          __type?: string;
        };

        // On non-200 responses (e.g. ForbiddenException when an IAM Identity
        // Center role assignment is in a stale state) the portal returns a
        // body without `roleCredentials`. Surface the real error instead of
        // letting `.accessKeyId` throw `undefined is not an object`.
        if (!body.roleCredentials) {
          return yield* new SsoPortalError({
            message: `AWS SSO portal did not return roleCredentials for profile=${profileName} (account=${profile.sso_account_id} role=${profile.sso_role_name}, status=${response.status}${body.message ? `, ${body.message}` : ""}${body.__type ? `, ${body.__type}` : ""}). ${REFRESH_MESSAGE}`,
            profile: profileName,
            account_id: profile.sso_account_id,
            role_name: profile.sso_role_name,
            status: response.status,
          });
        }
        const credentials = body.roleCredentials;

        yield* fs.writeFileString(
          cachedCredsFilePath,
          JSON.stringify({
            accessKeyId: credentials.accessKeyId,
            secretAccessKey: credentials.secretAccessKey,
            sessionToken: credentials.sessionToken,
            expiry: credentials.expiration,
          }),
        );

        return {
          accessKeyId: Redacted.make(credentials.accessKeyId),
          secretAccessKey: Redacted.make(credentials.secretAccessKey),
          sessionToken: Redacted.make(credentials.sessionToken),
          region,
          expiration: credentials.expiration,
        } satisfies ResolvedCredentials;
      }

      return yield* new ProfileNotFound({
        message: `Profile ${profileName} not found`,
        profile: profileName,
      });
    });

    return Auth.of({
      loadProfile,
      loadProfileCredentials,
    });
  });
