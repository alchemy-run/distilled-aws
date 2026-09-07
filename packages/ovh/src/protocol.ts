/**
 * OvhProtocol — hand-written.
 *
 * OVH speaks bearer-authenticated JSON REST (no response envelope), so the
 * whole protocol is one `makeRestProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials → `Authorization: Bearer <access_token>` + base URL
 *             (default https://eu.api.ovh.com/1.0), resolved from the calling
 *             fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ message, errorCode? | class? }` bodies
 *             map to the operation's typed error classes by status, then the
 *             shared HTTP-status classes, then {@link UnknownOvhError}.
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
import { UnknownOvhError } from "./errors.ts";

/**
 * Error channel shared by every generated OVH operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, OvhOpError,
 * OvhOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type OvhOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownOvhError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated OVH operation. */
export type OvhOpContext = Credentials | HttpClient.HttpClient;

/**
 * OVH error bodies are `{ message, errorCode? }` or `{ class, message }`.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const message = typeof b.message === "string" ? b.message : undefined;
  const code =
    typeof b.errorCode === "string" || typeof b.errorCode === "number"
      ? b.errorCode
      : typeof b.class === "string"
        ? b.class
        : typeof b.code === "string" || typeof b.code === "number"
          ? b.code
          : undefined;
  return { code, message };
};

export const OvhProtocol: Layer.Layer<API.Protocol> = makeRestProtocol<Config>({
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
    new UnknownOvhError({
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
