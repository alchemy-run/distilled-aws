/**
 * OpencodeProtocol — hand-written.
 *
 * OpenCode speaks plain JSON REST (no response envelope), so the whole
 * protocol is one `makeRestProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials → optional `Authorization: Basic <user:pass>` +
 *             base URL (default http://127.0.0.1:4096), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ code?, message }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownOpencodeError}.
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
import { UnknownOpencodeError } from "./errors.ts";

/**
 * Error channel shared by every generated OpenCode operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * OpencodeOpError, OpencodeOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type OpencodeOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownOpencodeError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated OpenCode operation. */
export type OpencodeOpContext = Credentials | HttpClient.HttpClient;

export const OpencodeProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // The Credentials service holds an effect — resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds): Record<string, string> => {
      const headers: Record<string, string> = {};
      if (creds.password !== undefined) {
        headers.Authorization = `Basic ${btoa(`${creds.username}:${Redacted.value(creds.password)}`)}`;
      }
      return headers;
    },
    // OpenCode's error body is `{ name?, message }` — the factory's default
    // lenient envelope covers it.
    unknownError: ({ code, message, body }) =>
      new UnknownOpencodeError({
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
