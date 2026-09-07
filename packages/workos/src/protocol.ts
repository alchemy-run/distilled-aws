/**
 * WorkosProtocol — the shared bearer-REST protocol instantiated for WorkOS.
 *
 * WorkOS speaks plain JSON with no response envelope; list endpoints return
 * `{ object, data[], list_metadata }` verbatim (no unwrapping — v0 parity).
 * Failures map like distilled v0's `matchError`: the body's
 * `message`/`error_description`/`error` string (in that order) plus optional
 * string `code`, then the shared HTTP status map (with `retryAfter` stamped
 * on retryable statuses), then {@link UnknownWorkosError} for anything with
 * no mapped status.
 */
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as API from "@distilled.cloud/core/api";
import type { ConfigError } from "@distilled.cloud/core/errors";
import {
  makeRestProtocol,
  type RestErrorEnvelope,
} from "@distilled.cloud/core/protocol-rest";
import { Credentials, type Config } from "./credentials.ts";
import { UnknownWorkosError, type DefaultErrors } from "./errors.ts";

/**
 * Error channel shared by every generated WorkOS operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, WorkosOpError,
 * WorkosOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type WorkosOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated WorkOS operation. */
export type WorkosOpContext = Credentials | HttpClient.HttpClient;

/**
 * The WorkOS API returns errors with a human-readable `message` field; some
 * endpoints instead carry `error` / `error_description` (OAuth-style), and
 * some add a string `code`.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const message =
    typeof b.message === "string"
      ? b.message
      : typeof b.error_description === "string"
        ? b.error_description
        : typeof b.error === "string"
          ? b.error
          : undefined;
  const code =
    typeof b.code === "string" || typeof b.code === "number"
      ? b.code
      : undefined;
  return { code, message };
};

export const WorkosProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // Resolved on the CALLING fiber per request (the layer is memoized per
    // process); the Credentials service holds an effect so rotating keys
    // Just Work.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    }),
    errorEnvelope,
    unknownError: ({ status: _status, code, message, body }) =>
      new UnknownWorkosError({
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
