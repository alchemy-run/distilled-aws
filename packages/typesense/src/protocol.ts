/**
 * TypesenseProtocol — the shared bearer/header-auth REST factory from core,
 * instantiated with Typesense's specifics:
 *
 *   request:  base URL from the caller's credentials (Typesense has no fixed
 *             default — self-hosted servers and per-cluster Cloud URLs), auth
 *             via the `X-TYPESENSE-API-KEY` header
 *
 *   response: plain JSON, no envelope. Non-2xx bodies decode against
 *             Typesense's ApiResponse (`{ message }`) via the factory's
 *             default envelope reader; per-op typed errors match first, then
 *             the shared HTTP status map, then UnknownTypesenseError.
 */
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as API from "@distilled.cloud/core/api";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
import type { ConfigError } from "@distilled.cloud/core/errors";
import { type Config, Credentials, formatHeaders } from "./credentials.ts";
import { type DefaultErrors, UnknownTypesenseError } from "./errors.ts";

/**
 * Error channel shared by every generated Typesense operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * TypesenseOpError, TypesenseOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type TypesenseOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Typesense operation. */
export type TypesenseOpContext = Credentials | HttpClient.HttpClient;

export const TypesenseProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // Resolved on the calling fiber, per request — the Credentials service
    // holds an effect, so lazily-resolved keys Just Work.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: formatHeaders,
    // Typesense's ApiResponse error body is `{ message }` — covered by the
    // factory's default envelope reader.
    unknownError: ({ message, body }) =>
      new UnknownTypesenseError({ message, body }),
  });
