/**
 * DopplerProtocol — hand-written.
 *
 * Doppler speaks plain bearer-authenticated JSON REST (no response envelope),
 * so the whole protocol is one `makeRestProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials → `Authorization: Bearer <token>` + base URL
 *             (default https://api.doppler.com), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ messages?: string[], message? }`
 *             bodies map to the operation's typed error classes by status,
 *             then the shared HTTP-status classes, then
 *             {@link UnknownDopplerError}.
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
import { UnknownDopplerError } from "./errors.ts";

/**
 * Error channel shared by every generated Doppler operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * DopplerOpError, DopplerOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type DopplerOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownDopplerError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Doppler operation. */
export type DopplerOpContext = Credentials | HttpClient.HttpClient;

export const DopplerProtocol: Layer.Layer<API.Protocol> =
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
    // Doppler's error body is `{ messages?: string[], message?: string,
    // success?: boolean }`. The factory's default envelope covers `message`;
    // `messages[0]` is the form most endpoints actually send.
    errorEnvelope: (body) => {
      if (body === null || typeof body !== "object") return undefined;
      const rec = body as Record<string, unknown>;
      const code =
        typeof rec.code === "string"
          ? rec.code
          : typeof rec.error === "string"
            ? rec.error
            : undefined;
      const fromMessages = Array.isArray(rec.messages)
        ? rec.messages.find((m) => typeof m === "string")
        : undefined;
      const message =
        typeof rec.message === "string"
          ? rec.message
          : typeof fromMessages === "string"
            ? fromMessages
            : undefined;
      if (code === undefined && message === undefined) return undefined;
      return { code, message };
    },
    unknownError: ({ code, message, body }) =>
      new UnknownDopplerError({
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
