/**
 * RedisCloudProtocol — hand-written.
 *
 * Redis Cloud speaks plain JSON REST (no response envelope), authenticated
 * with account + user API key headers, so the whole protocol is one
 * `makeRestProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials → `x-api-key` + `x-api-secret-key` (+ optional
 *             `x-auth-token`) + base URL (default https://api.redislabs.com),
 *             resolved from the calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ error?, message? }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownRedisCloudError}.
 */
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as API from "@distilled.cloud/core/api";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
import type { API_ERRORS, ConfigError } from "@distilled.cloud/core/errors";
import { Credentials, formatHeaders, type Config } from "./credentials.ts";
import { UnknownRedisCloudError } from "./errors.ts";

/**
 * Error channel shared by every generated Redis Cloud operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * RedisCloudOpError, RedisCloudOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type RedisCloudOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownRedisCloudError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Redis Cloud operation. */
export type RedisCloudOpContext = Credentials | HttpClient.HttpClient;

export const RedisCloudProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // The Credentials service holds an effect — resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => formatHeaders(creds),
    unknownError: ({ code, message, body }) =>
      new UnknownRedisCloudError({
        code:
          typeof code === "string"
            ? code
            : code !== undefined
              ? String(code)
              : undefined,
        message,
        body,
      }),
  });
