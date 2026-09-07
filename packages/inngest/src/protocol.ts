/**
 * InngestProtocol — hand-written.
 *
 * Inngest speaks bearer-authenticated JSON REST. Success bodies keep the
 * `{ data, metadata, page? }` envelope the OpenAPI document describes.
 * Failures nest under `{ errors: [{ code, message }] }`.
 *
 *   request:  credentials → `Authorization: Bearer <apiKey>` + base URL
 *             (default https://api.inngest.com/v2), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ errors: [{ code, message }] }`
 *             bodies map to the operation's typed error classes by status,
 *             then the shared HTTP-status classes, then
 *             {@link UnknownInngestError}.
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
import { UnknownInngestError } from "./errors.ts";

/**
 * Error channel shared by every generated Inngest operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, InngestOpError,
 * InngestOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type InngestOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownInngestError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Inngest operation. */
export type InngestOpContext = Credentials | HttpClient.HttpClient;

/**
 * Inngest wraps failures as `{ errors: [{ code, message }] }`. Some 401
 * examples are a bare string (`"Authentication failed"`).
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (typeof body === "string") return { message: body };
  if (body === null || typeof body !== "object") return undefined;
  const rec = body as Record<string, unknown>;
  if (Array.isArray(rec.errors) && rec.errors.length > 0) {
    const first = rec.errors[0];
    if (first !== null && typeof first === "object") {
      const err = first as Record<string, unknown>;
      const message = typeof err.message === "string" ? err.message : undefined;
      const code =
        typeof err.code === "string" || typeof err.code === "number"
          ? err.code
          : undefined;
      if (code !== undefined || message !== undefined) {
        return { code, message };
      }
    }
  }
  const message =
    typeof rec.message === "string"
      ? rec.message
      : typeof rec.error === "string"
        ? rec.error
        : undefined;
  const code =
    typeof rec.code === "string" || typeof rec.code === "number"
      ? rec.code
      : undefined;
  if (code === undefined && message === undefined) return undefined;
  return { code, message };
};

export const InngestProtocol: Layer.Layer<API.Protocol> =
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
      new UnknownInngestError({
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
