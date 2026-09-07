/**
 * AdyenProtocol — hand-written.
 *
 * Adyen Checkout speaks JSON REST authenticated with `X-API-Key` (no
 * response envelope), so the whole protocol is one `makeRestProtocol` call
 * from `core/protocol-rest`:
 *
 *   request:  credentials → `X-API-Key: <apiKey>` + base URL
 *             (default https://checkout-test.adyen.com/v72), resolved from the
 *             calling fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ errorCode?, message }` bodies map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownAdyenError}.
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
import { UnknownAdyenError } from "./errors.ts";

/**
 * Error channel shared by every generated Adyen operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, AdyenOpError,
 * AdyenOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type AdyenOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownAdyenError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Adyen operation. */
export type AdyenOpContext = Credentials | HttpClient.HttpClient;

/**
 * Adyen Checkout errors are a flat `ServiceError`:
 * `{ status?, errorCode?, message?, errorType?, pspReference? }`.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const obj = body as Record<string, unknown>;
  const code = obj.errorCode;
  const message = obj.message;
  if (typeof code !== "string" && typeof message !== "string") return undefined;
  return {
    code: typeof code === "string" ? code : undefined,
    message: typeof message === "string" ? message : undefined,
  };
};

export const AdyenProtocol: Layer.Layer<API.Protocol> =
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
    errorEnvelope,
    unknownError: ({ code, message, body }) =>
      new UnknownAdyenError({
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
