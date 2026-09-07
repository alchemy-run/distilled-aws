/**
 * PosthogProtocol — hand-written.
 *
 * PostHog speaks plain bearer-auth JSON REST, so this is a thin
 * `makeRestProtocol` instantiation (see `@distilled.cloud/core/protocol-rest`
 * for the generic machinery). What is PostHog's own:
 *
 *   request:  `Authorization: Bearer <personal API key>` from the
 *             Credentials service (resolved per request), base URL from
 *             `POSTHOG_HOST` / the US-cloud default — operation paths
 *             already carry the `/api/...` prefix.
 *
 *   response: non-2xx bodies are Django REST Framework style
 *             `{ type, code, detail, attr }` envelopes (some endpoints use
 *             `{ error }` or `{ message }` instead — all three accepted,
 *             mirroring distilled v0's matchError). Failures map to the
 *             per-operation typed errors (status matchers), then the shared
 *             HTTP-status classes (with retryAfter on retryable statuses),
 *             falling back to `UnknownPosthogError`.
 */
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import type * as API from "@distilled.cloud/core/api";
import {
  makeRestProtocol,
  type RestErrorEnvelope,
} from "@distilled.cloud/core/protocol-rest";
import type { ConfigError } from "@distilled.cloud/core/errors";
import { Credentials, type Config } from "./credentials.ts";
import { type DefaultErrors, UnknownPosthogError } from "./errors.ts";

/**
 * Error channel shared by every generated PostHog operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * PosthogOpError, PosthogOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type PosthogOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated PostHog operation. */
export type PosthogOpContext = Credentials | HttpClient.HttpClient;

/**
 * PostHog returns Django REST Framework style errors:
 *   { "type": "authentication_error",
 *     "code": "not_authenticated",
 *     "detail": "Authentication credentials were not provided.",
 *     "attr": null }
 *
 * The OpenAPI spec also documents a simpler `{ error: string }` shape used
 * by some endpoints, and server errors may return `{ message: string }`.
 * Accept any of these (v0 parity).
 */
const drfErrorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const code =
    typeof b.code === "string"
      ? b.code
      : typeof b.type === "string"
        ? b.type
        : undefined;
  const message =
    typeof b.detail === "string"
      ? b.detail
      : typeof b.message === "string"
        ? b.message
        : typeof b.error === "string"
          ? b.error
          : undefined;
  return { code, message };
};

export const PosthogProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // The Credentials service holds an effect — resolving it here (per
    // request) picks up rotations. Its ConfigError channel is erased at the
    // protocol boundary; PosthogOpError reintroduces it for callers.
    credentials: Effect.flatMap(Credentials, (resolve) => resolve),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({ Authorization: `Bearer ${creds.apiKey}` }),
    errorEnvelope: drfErrorEnvelope,
    unknownError: ({ code, message, body }) =>
      new UnknownPosthogError({
        code: typeof code === "string" ? code : undefined,
        message,
        body,
      }),
  });
