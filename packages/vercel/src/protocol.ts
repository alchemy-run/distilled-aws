/**
 * VercelProtocol — the shared bearer-REST protocol instantiated for Vercel.
 *
 * Vercel speaks plain JSON with no success envelope: a list endpoint returns
 * its collection object (`{ projects: [...], pagination: {...} }`), a single
 * resource returns the object itself. FAILURES are enveloped, and uniformly
 * so — `{ "error": { "code": "forbidden", "message": "Not authorized" } }` —
 * with `code` a machine-readable string that error matchers can key on.
 *
 * The API version is part of the PATH (`/v9/projects`, `/v5/domains`), not a
 * header, so each generated operation carries the version it was generated
 * from; a retired version answers 410 (see `Gone` in errors.ts).
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
import {
  Gone,
  PaymentRequired,
  UnknownVercelError,
  type DefaultErrors,
} from "./errors.ts";

/**
 * Error channel shared by every generated Vercel operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, VercelOpError,
 * VercelOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type VercelOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Vercel operation. */
export type VercelOpContext = Credentials | HttpClient.HttpClient;

/**
 * Vercel error bodies nest under `error`: `{ error: { code, message } }`.
 * A handful of edge paths (proxy 502s, HTML error pages) answer without that
 * envelope — those fall through to the protocol's `HTTP <status>` default.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const err = (body as Record<string, unknown>).error;
  if (err === null || typeof err !== "object") return undefined;
  const e = err as Record<string, unknown>;
  return {
    code: typeof e.code === "string" ? e.code : undefined,
    message: typeof e.message === "string" ? e.message : undefined,
  };
};

export const VercelProtocol: Layer.Layer<API.Protocol> =
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
      Authorization: `Bearer ${Redacted.value(creds.token)}`,
    }),
    errorEnvelope,
    // Core's shared map plus the two statuses Vercel uses that it doesn't
    // cover: 402 (billing) and 410 (retired path version). Both are declared
    // so broadly in the spec that leaving them unmapped would funnel routine
    // failures into UnknownVercelError.
    statusMap: {
      ...HTTP_STATUS_MAP,
      402: PaymentRequired,
      410: Gone,
    },
    unknownError: ({ code, message, body }) =>
      new UnknownVercelError({
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
