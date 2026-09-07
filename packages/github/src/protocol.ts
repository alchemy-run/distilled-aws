/**
 * GithubProtocol — the shared bearer-REST protocol instantiated for GitHub.
 *
 * GitHub speaks plain JSON with no response envelope: list endpoints return a
 * bare array, single resources return the object itself. Failures carry
 * `{ message, documentation_url, status?, errors? }`; the `errors[]` entries
 * (validation failures on 422) carry their own `code`, which is the closest
 * thing the API has to a machine-readable error code — the envelope surfaces
 * the first one so error matchers can key on it.
 *
 * Every request sends the version-pinned `Accept` and `X-GitHub-Api-Version`
 * headers plus a User-Agent, which GitHub rejects requests without.
 */
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as API from "@distilled.cloud/core/api";
import type { ConfigError } from "@distilled.cloud/core/errors";
import { HTTP_STATUS_MAP } from "@distilled.cloud/core/errors";
import {
  makeRestProtocol,
  type RestErrorEnvelope,
} from "@distilled.cloud/core/protocol-rest";
import { Credentials, type Config } from "./credentials.ts";
import { Gone, UnknownGithubError, type DefaultErrors } from "./errors.ts";

/**
 * The REST API version the generated services were built from — sent on
 * every request so GitHub never silently serves a newer, differently-shaped
 * payload. Bump it together with a regeneration.
 */
export const API_VERSION = "2022-11-28";

/**
 * Error channel shared by every generated GitHub operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, GithubOpError,
 * GithubOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type GithubOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated GitHub operation. */
export type GithubOpContext = Credentials | HttpClient.HttpClient;

/**
 * GitHub error bodies are `{ message, documentation_url }`, optionally with
 * an `errors` array whose entries carry a string `code` (e.g. `"missing"`,
 * `"already_exists"`) — the only machine-readable code the API offers.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const message = typeof b.message === "string" ? b.message : undefined;
  const first = Array.isArray(b.errors) ? b.errors[0] : undefined;
  const code =
    first !== null && typeof first === "object"
      ? typeof (first as Record<string, unknown>).code === "string"
        ? ((first as Record<string, unknown>).code as string)
        : undefined
      : undefined;
  return { code, message };
};

export const GithubProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // Resolved on the CALLING fiber per request (the layer is memoized per
    // process); the Credentials service holds an effect so rotating tokens
    // (GitHub App installation tokens expire hourly) Just Work.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.token)}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": API_VERSION,
      "User-Agent": creds.userAgent,
    }),
    errorEnvelope,
    // Core's shared map plus 410 — GitHub uses Gone far more than most APIs
    // (issues disabled, deleted migration archives), and an op that doesn't
    // declare a 410 response would otherwise land in UnknownGithubError.
    statusMap: { ...HTTP_STATUS_MAP, 410: Gone },
    unknownError: ({ code, message, body }) =>
      new UnknownGithubError({
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
