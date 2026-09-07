/**
 * ChronosphereProtocol — hand-written.
 *
 * Chronosphere speaks token-authenticated JSON REST (no response envelope),
 * so the whole protocol is one `makeRestProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials → `API-Token` + `Authorization: Bearer <apiKey>`
 *             + optional `Chronosphere-Actor`, resolved from the calling
 *             fiber on every request. The instance origin is tenant-specific
 *             (`https://<instance>.chronosphere.io`).
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ code?, message }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownChronosphereError}.
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
import { UnknownChronosphereError } from "./errors.ts";

/**
 * Error channel shared by every generated Chronosphere operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * ChronosphereOpError, ChronosphereOpContext>` explicitly so the compiler
 * never infers these back out of the schema generics.
 */
export type ChronosphereOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownChronosphereError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Chronosphere operation. */
export type ChronosphereOpContext = Credentials | HttpClient.HttpClient;

export const ChronosphereProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // The Credentials service holds an effect — resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => {
      const token = Redacted.value(creds.apiKey);
      const headers: Record<string, string> = {
        "API-Token": token,
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };
      if (creds.actor) headers["Chronosphere-Actor"] = creds.actor;
      return headers;
    },
    unknownError: ({ code, message, body }) =>
      new UnknownChronosphereError({
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
