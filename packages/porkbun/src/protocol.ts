/**
 * PorkbunProtocol — hand-written.
 *
 * Porkbun speaks JSON REST authenticated with `X-API-Key` /
 * `X-Secret-API-Key` (no success envelope), so the whole protocol is one
 * `makeRestProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials → `X-API-Key` + `X-Secret-API-Key` + base URL
 *             (default https://api.porkbun.com/api/json/v3), resolved from
 *             the calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ status: "ERROR", code?, message }`
 *             bodies map to the operation's typed error classes by status,
 *             then the shared HTTP-status classes, then
 *             {@link UnknownPorkbunError}.
 */
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as API from "@distilled.cloud/core/api";
import {
  makeRestProtocol,
  type RestErrorEnvelope,
} from "@distilled.cloud/core/protocol-rest";
import type { API_ERRORS, ConfigError } from "@distilled.cloud/core/errors";
import { Credentials, formatHeaders, type Config } from "./credentials.ts";
import { UnknownPorkbunError } from "./errors.ts";

/**
 * Error channel shared by every generated Porkbun operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * PorkbunOpError, PorkbunOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type PorkbunOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownPorkbunError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Porkbun operation. */
export type PorkbunOpContext = Credentials | HttpClient.HttpClient;

/**
 * Porkbun error bodies are `{ status: "ERROR", message, code?, next_action? }`.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const obj = body as Record<string, unknown>;
  const code = obj.code;
  const message = obj.message;
  if (typeof code !== "string" && typeof message !== "string") return undefined;
  return {
    code: typeof code === "string" ? code : undefined,
    message: typeof message === "string" ? message : undefined,
  };
};

export const PorkbunProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // The Credentials service holds an effect — resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => formatHeaders(creds),
    errorEnvelope,
    unknownError: ({ code, message, body }) =>
      new UnknownPorkbunError({
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
