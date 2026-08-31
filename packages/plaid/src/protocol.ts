/**
 * PlaidProtocol — hand-written.
 *
 * Plaid speaks header-authenticated JSON REST (no response envelope), so
 * the whole protocol is one `makeRestProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials → `PLAID-CLIENT-ID` / `PLAID-SECRET` /
 *             `Plaid-Version` + base URL (default
 *             https://sandbox.plaid.com), resolved from the calling fiber
 *             on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ error_code?, error_message }` bodies
 *             map to the operation's typed error classes by status, then
 *             the shared HTTP-status classes, then {@link UnknownPlaidError}.
 */
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as API from "@distilled.cloud/core/api";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
import type { API_ERRORS, ConfigError } from "@distilled.cloud/core/errors";
import { Credentials, formatHeaders, type Config } from "./credentials.ts";
import { UnknownPlaidError } from "./errors.ts";

/**
 * Error channel shared by every generated Plaid operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, PlaidOpError,
 * PlaidOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type PlaidOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownPlaidError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Plaid operation. */
export type PlaidOpContext = Credentials | HttpClient.HttpClient;

export const PlaidProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // The Credentials service holds an effect — resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => formatHeaders(creds),
    // Plaid's error body is `{ error_type, error_code, error_message }`.
    errorEnvelope: (body) => {
      if (body === null || typeof body !== "object") return undefined;
      const b = body as Record<string, unknown>;
      const code =
        typeof b.error_code === "string" || typeof b.error_code === "number"
          ? b.error_code
          : typeof b.code === "string" || typeof b.code === "number"
            ? b.code
            : undefined;
      const message =
        typeof b.error_message === "string"
          ? b.error_message
          : typeof b.message === "string"
            ? b.message
            : undefined;
      return { code, message };
    },
    unknownError: ({ code, message, body }) =>
      new UnknownPlaidError({
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
