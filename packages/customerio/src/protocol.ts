/**
 * CustomerioProtocol — hand-written.
 *
 * Customer.io's Journeys App API speaks bearer-authenticated JSON REST (no
 * response envelope), so the protocol is one `makeRestProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials → `Authorization: Bearer <apiKey>` + base URL
 *             (default https://api.customer.io; EU is
 *             https://api-eu.customer.io), resolved from the calling fiber
 *             on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ errors: [{ detail }] }` /
 *             `{ meta: { errors } }` bodies map to the operation's typed
 *             error classes by status, then the shared HTTP-status classes,
 *             then {@link UnknownCustomerioError}.
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
import { UnknownCustomerioError } from "./errors.ts";

/**
 * Error channel shared by every generated Customer.io operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * CustomerioOpError, CustomerioOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type CustomerioOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownCustomerioError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Customer.io operation. */
export type CustomerioOpContext = Credentials | HttpClient.HttpClient;

/**
 * Customer.io error bodies are one of:
 *   `{ errors: [{ detail, status, meta? }] }`
 *   `{ meta: { errors: string[] } }`
 *   `{ message }` / `{ error }`
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const errors = Array.isArray(b.errors) ? b.errors : undefined;
  const first =
    errors !== undefined && errors.length > 0 && typeof errors[0] === "object"
      ? (errors[0] as Record<string, unknown>)
      : undefined;
  const meta =
    b.meta !== null && typeof b.meta === "object"
      ? (b.meta as Record<string, unknown>)
      : undefined;
  const metaErrors = Array.isArray(meta?.errors) ? meta.errors : undefined;
  const message =
    typeof first?.detail === "string"
      ? first.detail
      : typeof first?.message === "string"
        ? first.message
        : typeof metaErrors?.[0] === "string"
          ? metaErrors[0]
          : typeof b.message === "string"
            ? b.message
            : typeof b.error === "string"
              ? b.error
              : undefined;
  const code =
    typeof first?.status === "number" || typeof first?.status === "string"
      ? first.status
      : typeof first?.code === "string" || typeof first?.code === "number"
        ? first.code
        : typeof b.code === "string" || typeof b.code === "number"
          ? b.code
          : undefined;
  return { code, message };
};

export const CustomerioProtocol: Layer.Layer<API.Protocol> =
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
      new UnknownCustomerioError({
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
