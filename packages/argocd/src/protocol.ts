/**
 * ArgocdProtocol — hand-written.
 *
 * Argo CD speaks plain bearer-authenticated JSON REST (no response envelope),
 * so the whole protocol is one `makeRestProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials → `Authorization: Bearer <token>` + instance origin
 *             (default https://localhost:8080), resolved from the calling
 *             fiber on every request. Spec paths already include `/api/v1`.
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ code?, message, error? }` bodies map to
 *             the operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownArgocdError}.
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
import { UnknownArgocdError } from "./errors.ts";

/**
 * Error channel shared by every generated Argo CD operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * ArgocdOpError, ArgocdOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type ArgocdOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownArgocdError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Argo CD operation. */
export type ArgocdOpContext = Credentials | HttpClient.HttpClient;

export const ArgocdProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // The Credentials service holds an effect — resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.token)}`,
    }),
    // grpc-gateway error body is `{ code?: number|string, message, error? }`
    // — the factory's default lenient envelope covers it.
    unknownError: ({ code, message, body }) =>
      new UnknownArgocdError({
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
