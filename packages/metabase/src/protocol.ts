/**
 * MetabaseProtocol — hand-written.
 *
 * Metabase speaks API-key-authenticated JSON REST (no response envelope),
 * so the whole protocol is one `makeRestProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials → `X-API-Key: <apiKey>` + base URL
 *             (default http://localhost:3000), resolved from the calling
 *             fiber on every request. Paths in the spec already include
 *             `/api`, so the instance origin is used as-is.
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ message? }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownMetabaseError}.
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
import { UnknownMetabaseError } from "./errors.ts";

/**
 * Error channel shared by every generated Metabase operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * MetabaseOpError, MetabaseOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type MetabaseOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownMetabaseError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Metabase operation. */
export type MetabaseOpContext = Credentials | HttpClient.HttpClient;

export const MetabaseProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // The Credentials service holds an effect — resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      "X-API-Key": Redacted.value(creds.apiKey),
    }),
    // Metabase's error body is typically `{ message?: string }` — the
    // factory's default lenient envelope covers it.
    unknownError: ({ code, message, body }) =>
      new UnknownMetabaseError({
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
