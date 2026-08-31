/**
 * ArchilProtocol — hand-written.
 *
 * Archil speaks API-key authenticated JSON REST. Success and error bodies
 * use a consistent envelope (`{ success, data }` / `{ success, error }`):
 *
 *   request:  credentials → `Authorization: <apiKey>` + base URL
 *             (default https://control.green.us-east-1.aws.prod.archil.com),
 *             resolved from the calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ error?: string }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownArchilError}.
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
import { UnknownArchilError } from "./errors.ts";

/**
 * Error channel shared by every generated Archil operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, ArchilOpError,
 * ArchilOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type ArchilOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownArchilError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Archil operation. */
export type ArchilOpContext = Credentials | HttpClient.HttpClient;

export const ArchilProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // The Credentials service holds an effect — resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    // Archil's control plane authenticates with the raw API key, not Bearer.
    headers: (creds) => ({
      Authorization: Redacted.value(creds.apiKey),
    }),
    // Archil's error body is `{ success: false, error: string }` — map
    // `error` onto the unknown-error message when `message` is absent.
    unknownError: ({ code, message, body }) =>
      new UnknownArchilError({
        code:
          typeof code === "string"
            ? code
            : code !== undefined
              ? String(code)
              : undefined,
        message:
          message ??
          (body !== null &&
          typeof body === "object" &&
          "error" in body &&
          typeof (body as { error: unknown }).error === "string"
            ? (body as { error: string }).error
            : undefined),
        body,
      }),
  });
