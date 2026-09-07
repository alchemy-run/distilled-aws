/**
 * GustoProtocol — hand-written.
 *
 * Gusto speaks bearer-authenticated JSON REST (no response envelope), so
 * the protocol is one `makeRestProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials → `Authorization: Bearer <access token>` +
 *             `X-Gusto-API-Version` + base URL (default
 *             https://api.gusto.com), resolved from the calling fiber on
 *             every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ errors: [{ error_key, category,
 *             message }] }` bodies map to the operation's typed error
 *             classes by status, then the shared HTTP-status classes, then
 *             {@link UnknownGustoError}.
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
import { UnknownGustoError } from "./errors.ts";

/**
 * Error channel shared by every generated Gusto operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * GustoOpError, GustoOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type GustoOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownGustoError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Gusto operation. */
export type GustoOpContext = Credentials | HttpClient.HttpClient;

/**
 * Gusto's error body is `{ errors: [{ error_key, category, message }] }`.
 * Take the first error's category/message when present.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const errors = Array.isArray(b.errors) ? b.errors : undefined;
  const first =
    errors !== undefined && errors.length > 0 && typeof errors[0] === "object"
      ? (errors[0] as Record<string, unknown>)
      : undefined;
  const message =
    typeof first?.message === "string"
      ? first.message
      : typeof b.message === "string"
        ? b.message
        : undefined;
  const code =
    typeof first?.category === "string"
      ? first.category
      : typeof first?.error_key === "string"
        ? first.error_key
        : typeof b.code === "string" || typeof b.code === "number"
          ? b.code
          : undefined;
  return { code, message };
};

export const GustoProtocol: Layer.Layer<API.Protocol> =
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
      "X-Gusto-API-Version": creds.apiVersion,
    }),
    errorEnvelope,
    unknownError: ({ code, message, body }) =>
      new UnknownGustoError({
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
