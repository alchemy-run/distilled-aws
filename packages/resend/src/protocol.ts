/**
 * ResendProtocol — hand-written.
 *
 * Resend speaks plain bearer-authenticated JSON REST (no response envelope),
 * so the whole protocol is one `makeRestProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials → `Authorization: Bearer <apiKey>` + base URL
 *             (default https://api.resend.com), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ name?, message, statusCode? }` bodies
 *             map to the operation's typed error classes by status, then the
 *             shared HTTP-status classes, then {@link UnknownResendError}.
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
import { UnknownResendError } from "./errors.ts";

/**
 * Error channel shared by every generated Resend operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, ResendOpError,
 * ResendOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type ResendOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownResendError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Resend operation. */
export type ResendOpContext = Credentials | HttpClient.HttpClient;

export const ResendProtocol: Layer.Layer<API.Protocol> =
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
    // Resend's error body is `{ name?: string, message: string, statusCode?: number }`.
    // The factory's default lenient envelope covers `{ code, message }`; `name`
    // is the machine-readable code Resend actually sends.
    errorEnvelope: (body) => {
      if (body === null || typeof body !== "object") return undefined;
      const rec = body as Record<string, unknown>;
      const code =
        typeof rec.name === "string"
          ? rec.name
          : typeof rec.code === "string"
            ? rec.code
            : undefined;
      const message = typeof rec.message === "string" ? rec.message : undefined;
      if (code === undefined && message === undefined) return undefined;
      return { code, message };
    },
    unknownError: ({ code, message, body }) =>
      new UnknownResendError({
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
