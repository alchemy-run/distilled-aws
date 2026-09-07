/**
 * ForgejoProtocol — the shared bearer-REST protocol instantiated for Forgejo.
 *
 * Forgejo speaks plain JSON with no response envelope: list endpoints return
 * a bare array, single resources return the object itself, and many
 * mutations answer `204 No Content`. Failures carry `{ message, url }`; the
 * message is the only signal, so typed errors beyond the status-derived ones
 * (see `patches/`) match on it.
 *
 * Authentication is the `token` scheme (`Authorization: token <token>`),
 * which Forgejo accepts for access tokens; `Bearer` is only honoured for
 * OAuth2 tokens.
 *
 * Pagination is by page number (`page`/`limit`) with the total reported in
 * an `X-Total-Count` response header and no in-body token, so no pagination
 * trait is stamped on list operations — callers advance `page` until an
 * empty page comes back. See `scripts/generate.ts`.
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
import { UnknownForgejoError, type DefaultErrors } from "./errors.ts";

/**
 * Error channel shared by every generated Forgejo operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * ForgejoOpError, ForgejoOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type ForgejoOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Forgejo operation. */
export type ForgejoOpContext = Credentials | HttpClient.HttpClient;

/**
 * Forgejo error bodies are `{ message, url }`. A response that arrives
 * without that envelope (a proxy 502, an HTML error page) falls through to
 * the protocol's raw-text / `HTTP <status>` default.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  return {
    message: typeof b.message === "string" ? b.message : undefined,
  };
};

export const ForgejoProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // Resolved on the CALLING fiber per request (the layer is memoized per
    // process); the Credentials service holds an effect, so a token rotated
    // between calls is picked up without rebuilding the layer.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `token ${Redacted.value(creds.token)}`,
      Accept: "application/json",
    }),
    errorEnvelope,
    unknownError: ({ code, message, body }) =>
      new UnknownForgejoError({
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
