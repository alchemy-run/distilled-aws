/**
 * ModrinthProtocol — hand-written.
 *
 * Modrinth (Labrinth) speaks plain JSON REST (no response envelope):
 *
 *   request:  credentials → optional `Authorization: <apiKey>` (no Bearer)
 *             + `User-Agent` + base URL (default
 *             https://api.modrinth.com/v2), resolved from the calling fiber
 *             on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ error?, description? }` bodies map to
 *             the operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownModrinthError}.
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
import { UnknownModrinthError } from "./errors.ts";

/**
 * Error channel shared by every generated Modrinth operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * ModrinthOpError, ModrinthOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type ModrinthOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownModrinthError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Modrinth operation. */
export type ModrinthOpContext = Credentials | HttpClient.HttpClient;

/**
 * Labrinth error bodies are typically `{ error, description }`. Fall back
 * to `message` when present.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const message =
    typeof b.description === "string"
      ? b.description
      : typeof b.message === "string"
        ? b.message
        : undefined;
  const code =
    typeof b.error === "string"
      ? b.error
      : typeof b.code === "string" || typeof b.code === "number"
        ? b.code
        : undefined;
  if (code === undefined && message === undefined) return undefined;
  return { code, message };
};

export const ModrinthProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // The Credentials service holds an effect — resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      "User-Agent": creds.userAgent,
      ...(creds.apiKey ? { Authorization: Redacted.value(creds.apiKey) } : {}),
    }),
    errorEnvelope,
    unknownError: ({ code, message, body }) =>
      new UnknownModrinthError({
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
