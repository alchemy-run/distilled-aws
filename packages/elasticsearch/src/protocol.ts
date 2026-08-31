/**
 * ElasticsearchProtocol — hand-written.
 *
 * Elasticsearch speaks API-key-authenticated JSON REST (no response
 * envelope), so the whole protocol is one `makeRestProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials → `Authorization: ApiKey <apiKey>` + base URL
 *             (default http://localhost:9200), resolved from the calling
 *             fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ error?: { type, reason }, status? }`
 *             bodies map to the operation's typed error classes by status,
 *             then the shared HTTP-status classes, then
 *             {@link UnknownElasticsearchError}.
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
import { UnknownElasticsearchError } from "./errors.ts";

/**
 * Error channel shared by every generated Elasticsearch operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * ElasticsearchOpError, ElasticsearchOpContext>` explicitly so the compiler
 * never infers these back out of the schema generics.
 */
export type ElasticsearchOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownElasticsearchError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Elasticsearch operation. */
export type ElasticsearchOpContext = Credentials | HttpClient.HttpClient;

export const ElasticsearchProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // The Credentials service holds an effect — resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `ApiKey ${Redacted.value(creds.apiKey)}`,
    }),
    // Elasticsearch's error body is `{ error?: { type, reason }, status? }`
    // — the factory's default lenient envelope covers `message`/`reason`.
    unknownError: ({ code, message, body }) =>
      new UnknownElasticsearchError({
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
