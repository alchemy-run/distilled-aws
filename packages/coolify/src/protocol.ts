/**
 * CoolifyProtocol — hand-written.
 *
 * Coolify speaks plain bearer-authenticated JSON REST (no response envelope),
 * so the whole protocol is one `makeRestProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials → `Authorization: Bearer <apiKey>` + base URL
 *             (default https://app.coolify.io/api/v1), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ message }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownCoolifyError}.
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
import { UnknownCoolifyError } from "./errors.ts";

/**
 * Error channel shared by every generated Coolify operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * CoolifyOpError, CoolifyOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type CoolifyOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownCoolifyError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Coolify operation. */
export type CoolifyOpContext = Credentials | HttpClient.HttpClient;

export const CoolifyProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // The Credentials service holds an effect — resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    }),
    // Coolify's error body is `{ message: string }` — the factory's default
    // lenient envelope covers it.
    unknownError: ({ code, message, body }) =>
      new UnknownCoolifyError({
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
