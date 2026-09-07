/**
 * DiscordProtocol — the shared bearer-REST protocol instantiated for Discord.
 *
 * Discord speaks plain JSON with no response envelope: successful responses
 * are the resource (or a bare array) verbatim. Failures carry
 * `{ code, message, errors? }` where `code` is Discord's own numeric JSON
 * error code — the shared HTTP status map turns the status into the error
 * class, and anything unmapped becomes {@link UnknownDiscordError} with the
 * code and per-field `errors` detail preserved.
 *
 * Rate limits (429) arrive as `TooManyRequests` with `retryAfter` read from
 * the `Retry-After` header, so the default retry policy honors Discord's
 * bucket hints without extra configuration.
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
import { UnknownDiscordError, type DefaultErrors } from "./errors.ts";

/**
 * Error channel shared by every generated Discord operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * DiscordOpError, DiscordOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type DiscordOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Discord operation. */
export type DiscordOpContext = Credentials | HttpClient.HttpClient;

/**
 * Discord's error body is `{ code: <numeric JSON error code>, message }`.
 * The OAuth2 token endpoints answer in the OAuth style instead
 * (`{ error, error_description }`), so both spellings are read here.
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
    typeof b.code === "number" || typeof b.code === "string"
      ? b.code
      : undefined;
  return { code, message };
};

/** Discord's `errors` object: per-field validation detail on 400s. */
const errorDetails = (body: unknown): unknown => {
  if (body === null || typeof body !== "object") return undefined;
  return (body as Record<string, unknown>).errors;
};

/**
 * Discord's JSON error code as a number. The OAuth2 endpoints answer with a
 * string `error` slug instead of a numeric `code` — those carry no numeric
 * code at all, so anything unparseable is dropped rather than surfaced as
 * NaN.
 */
const numericCode = (code: string | number | undefined): number | undefined => {
  if (typeof code === "number") return Number.isFinite(code) ? code : undefined;
  if (typeof code !== "string" || code.trim() === "") return undefined;
  const n = Number(code);
  return Number.isFinite(n) ? n : undefined;
};

export const DiscordProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // Resolved on the CALLING fiber per request (the layer is memoized per
    // process); the Credentials service holds an effect so rotating tokens
    // Just Work.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `${creds.tokenType} ${Redacted.value(creds.token)}`,
    }),
    errorEnvelope,
    unknownError: ({ code, message, body }) =>
      new UnknownDiscordError({
        code: numericCode(code),
        message,
        errors: errorDetails(body),
        body,
      }),
  });
