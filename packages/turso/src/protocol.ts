/**
 * TursoProtocol — hand-written.
 *
 * Turso's platform API is plain bearer-REST JSON (`Authorization: Bearer
 * <apiKey>`, no response envelope), so the protocol is a direct
 * `makeRestProtocol` instantiation from `core/protocol-rest`:
 *
 *   request:  credentials resolved per request from the Credentials service,
 *             bearer auth header, base URL from `creds.apiBaseUrl`
 *
 *   response: non-2xx → typed error matched like the distilled turso client:
 *             per-op matcher classes first, then the shared HTTP status map
 *             (`{ error: string, code?: string }` bodies parsed leniently,
 *             `retryAfter` hints stamped on retryable statuses), unmapped
 *             failures fall back to `UnknownTursoError`.
 */
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as API from "@distilled.cloud/core/api";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
import type { ConfigError } from "@distilled.cloud/core/errors";
import { Credentials, type Config } from "./credentials.ts";
import { UnknownTursoError, type DefaultErrors } from "./errors.ts";

/**
 * Error channel shared by every generated Turso operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, TursoOpError,
 * TursoOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type TursoOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Turso operation. */
export type TursoOpContext = Credentials | HttpClient.HttpClient;

export const TursoProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // The Credentials service holds an effect — resolving it here (per
    // request) picks up rotations. Its error channel is erased at the protocol
    // boundary; TursoOpError reintroduces it for callers.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    }),
    // Turso error bodies are `{ error: string, code?: string }` — covered by
    // the default lenient envelope (message ?? error, string codes kept).
    unknownError: ({ code, message, body }) =>
      new UnknownTursoError({
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
