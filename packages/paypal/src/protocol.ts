/**
 * PaypalProtocol — hand-written.
 *
 * PayPal speaks bearer-authenticated JSON REST (no response envelope), so the
 * whole protocol is one `makeRestProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials → `Authorization: Bearer <access_token>` + base URL
 *             (default https://api-m.paypal.com), resolved from the calling
 *             fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ name, message, debug_id }` bodies map
 *             to the operation's typed error classes by status, then the
 *             shared HTTP-status classes, then {@link UnknownPaypalError}.
 */
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as API from "@distilled.cloud/core/api";
import {
  makeRestProtocol,
  type RestErrorEnvelope,
} from "@distilled.cloud/core/protocol-rest";
import type { API_ERRORS, ConfigError } from "@distilled.cloud/core/errors";
import { Credentials, type Config } from "./credentials.ts";
import { UnknownPaypalError } from "./errors.ts";

/**
 * Error channel shared by every generated PayPal operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, PaypalOpError,
 * PaypalOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type PaypalOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownPaypalError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated PayPal operation. */
export type PaypalOpContext = Credentials | HttpClient.HttpClient;

/**
 * PayPal error bodies are `{ name, message, debug_id, details?, links? }`.
 * `name` is the machine-readable code (`INVALID_REQUEST`, `RESOURCE_NOT_FOUND`).
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const message = typeof b.message === "string" ? b.message : undefined;
  const code =
    typeof b.name === "string"
      ? b.name
      : typeof b.code === "string" || typeof b.code === "number"
        ? b.code
        : undefined;
  return { code, message };
};

export const PaypalProtocol: Layer.Layer<API.Protocol> =
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
    errorEnvelope,
    unknownError: ({ code, message, body }) =>
      new UnknownPaypalError({
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
