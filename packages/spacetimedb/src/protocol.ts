/**
 * SpacetimeDBProtocol — hand-written.
 *
 * SpacetimeDB speaks bearer-authenticated JSON REST (no response envelope),
 * with optional anonymous access when no token is configured:
 *
 *   request:  credentials → `Authorization: Bearer <token>` when the token
 *             is non-empty + base URL (default
 *             https://maincloud.spacetimedb.com), resolved from the calling
 *             fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-JSON 2xx (logs, PEM, identity hex) is the
 *             raw text; non-2xx bodies map to the operation's typed error
 *             classes by status, then the shared HTTP-status classes, then
 *             {@link UnknownSpacetimeDBError}.
 */
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as API from "@distilled.cloud/core/api";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
import type { API_ERRORS, ConfigError } from "@distilled.cloud/core/errors";
import { Credentials, type Config } from "./credentials.ts";
import { UnknownSpacetimeDBError } from "./errors.ts";

/**
 * Error channel shared by every generated SpacetimeDB operation. Generated
 * service files annotate operations with
 * `API.OperationMethod<I, O, SpacetimeDBOpError, SpacetimeDBOpContext>`
 * explicitly so the compiler never infers these back out of the schema
 * generics.
 */
export type SpacetimeDBOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownSpacetimeDBError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated SpacetimeDB operation. */
export type SpacetimeDBOpContext = Credentials | HttpClient.HttpClient;

export const SpacetimeDBProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds): Record<string, string> => {
      const headers: Record<string, string> = {};
      const token = Redacted.value(creds.apiKey);
      if (token !== "") {
        headers.Authorization = `Bearer ${token}`;
      }
      return headers;
    },
    unknownError: ({ code, message, body }) =>
      new UnknownSpacetimeDBError({
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
