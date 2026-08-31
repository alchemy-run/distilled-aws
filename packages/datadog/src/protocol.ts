/**
 * DatadogProtocol — hand-written.
 *
 * Datadog speaks plain JSON REST (no response envelope), so the whole
 * protocol is one `makeRestProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials → `DD-API-KEY` + optional `DD-APPLICATION-KEY` +
 *             base URL (default https://api.datadoghq.com), resolved from
 *             the calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ errors: string[] | object[] }` bodies
 *             map to the operation's typed error classes by status, then the
 *             shared HTTP-status classes, then {@link UnknownDatadogError}.
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
import { UnknownDatadogError } from "./errors.ts";

/**
 * Error channel shared by every generated Datadog operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * DatadogOpError, DatadogOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type DatadogOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownDatadogError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Datadog operation. */
export type DatadogOpContext = Credentials | HttpClient.HttpClient;

/**
 * Datadog error bodies are typically `{ errors: string[] }` or JSON:API
 * `{ errors: [{ title?, detail?, status? }] }`. Surface the first entry as
 * `message` so status matchers and logs have something to key on.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const first = Array.isArray(b.errors) ? b.errors[0] : undefined;
  if (typeof first === "string") {
    return { message: first };
  }
  if (first !== null && typeof first === "object") {
    const e = first as Record<string, unknown>;
    const message =
      typeof e.detail === "string"
        ? e.detail
        : typeof e.title === "string"
          ? e.title
          : typeof b.message === "string"
            ? b.message
            : undefined;
    const code =
      typeof e.code === "string"
        ? e.code
        : typeof e.status === "string"
          ? e.status
          : undefined;
    return { code, message };
  }
  const message = typeof b.message === "string" ? b.message : undefined;
  const code =
    typeof b.code === "string" || typeof b.code === "number"
      ? b.code
      : undefined;
  return message !== undefined || code !== undefined
    ? { code, message }
    : undefined;
};

export const DatadogProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // The Credentials service holds an effect — resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => {
      const headers: Record<string, string> = {
        "DD-API-KEY": Redacted.value(creds.apiKey),
        Accept: "application/json",
      };
      if (creds.applicationKey !== undefined) {
        headers["DD-APPLICATION-KEY"] = Redacted.value(creds.applicationKey);
      }
      return headers;
    },
    errorEnvelope,
    unknownError: ({ code, message, body }) =>
      new UnknownDatadogError({
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
