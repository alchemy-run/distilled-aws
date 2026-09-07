/**
 * SurrealdbProtocol — hand-written.
 *
 * SurrealDB speaks bearer-authenticated JSON REST (no response envelope),
 * so the whole protocol is one `makeRestProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials → `Authorization: Bearer <apiKey>` +
 *             `Accept: application/json` + base URL (default
 *             http://127.0.0.1:8000), resolved from the calling fiber on
 *             every request. Namespace/database selection is per-call via
 *             the `NS` / `DB` headers on the generated operations.
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ code?, message }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownSurrealdbError}.
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
import { UnknownSurrealdbError } from "./errors.ts";

/**
 * Error channel shared by every generated SurrealDB operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * SurrealdbOpError, SurrealdbOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type SurrealdbOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownSurrealdbError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated SurrealDB operation. */
export type SurrealdbOpContext = Credentials | HttpClient.HttpClient;

export const SurrealdbProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // The Credentials service holds an effect — resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Accept: "application/json",
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    }),
    // SurrealDB's error body is `{ code?: string, details?: string,
    // description?: string, information?: string }` — the factory's default
    // lenient envelope covers `message`/`error`/`details`.
    unknownError: ({ code, message, body }) =>
      new UnknownSurrealdbError({
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
