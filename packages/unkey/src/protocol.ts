/**
 * UnkeyProtocol — hand-written.
 *
 * Unkey speaks bearer-authenticated JSON REST. Success bodies keep the
 * `{ meta, data, pagination? }` envelope the OpenAPI document describes.
 * Failures nest under `{ error: { detail, status, title, type } }`.
 *
 *   request:  credentials → `Authorization: Bearer <rootKey>` + base URL
 *             (default https://api.unkey.com), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ error: { detail, title, type } }`
 *             bodies map to the operation's typed error classes by status,
 *             then the shared HTTP-status classes, then
 *             {@link UnknownUnkeyError}.
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
import { UnknownUnkeyError } from "./errors.ts";

/**
 * Error channel shared by every generated Unkey operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, UnkeyOpError,
 * UnkeyOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type UnkeyOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownUnkeyError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Unkey operation. */
export type UnkeyOpContext = Credentials | HttpClient.HttpClient;

/**
 * Unkey wraps failures as `{ error: { detail, status, title, type } }`.
 * `detail` is the human-readable message; `type` is the machine-readable
 * error URL (e.g. `https://unkey.com/docs/errors/unkey/authorization/forbidden`).
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const rec = body as Record<string, unknown>;
  const nested =
    rec.error !== null && typeof rec.error === "object"
      ? (rec.error as Record<string, unknown>)
      : rec;
  const message =
    typeof nested.detail === "string"
      ? nested.detail
      : typeof nested.title === "string"
        ? nested.title
        : typeof nested.message === "string"
          ? nested.message
          : undefined;
  const code =
    typeof nested.type === "string"
      ? nested.type
      : typeof nested.code === "string" || typeof nested.code === "number"
        ? nested.code
        : undefined;
  if (code === undefined && message === undefined) return undefined;
  return { code, message };
};

export const UnkeyProtocol: Layer.Layer<API.Protocol> =
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
      new UnknownUnkeyError({
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
