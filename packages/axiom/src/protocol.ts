/**
 * AxiomProtocol — hand-written.
 *
 * Axiom speaks plain bearer-authenticated JSON REST (no response envelope),
 * so the whole protocol is one `makeRestProtocol` call from
 * `core/protocol-rest`:
 *
 *   request:  credentials → `Authorization: Bearer <apiKey>` (+ optional
 *             `X-Axiom-Org-ID` for Personal Access Tokens) + base URL
 *             (default https://api.axiom.co), resolved from the calling
 *             fiber on every request
 *
 *   response: 2xx JSON is the payload, with explicit JSON `null` properties
 *             recursively dropped first ({@link stripNulls} — Axiom's Go
 *             backend serializes nil slices/omitted optionals as `null`);
 *             non-2xx bodies map to the operation's typed error classes by
 *             status, then the shared HTTP-status classes, then
 *             {@link UnknownAxiomError}. Axiom returns two error envelope
 *             shapes — `{ code, message }` (control-plane / edge-ingest) and
 *             `{ error, message }` (edge-query) — unified by a lenient
 *             extractor; the HTTP status stays the authoritative signal.
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
import { UnknownAxiomError } from "./errors.ts";

/**
 * Error channel shared by every generated Axiom operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, AxiomOpError,
 * AxiomOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type AxiomOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownAxiomError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Axiom operation. */
export type AxiomOpContext = Credentials | HttpClient.HttpClient;

/**
 * Axiom's backend (Go) serializes nil slices and omitted optional fields as
 * JSON `null`. The generated output schemas model these as optional members
 * (value or absent), so `null` trips decoding. Recursively drop explicit
 * `null` properties before decoding so optional fields are treated as
 * absent. Keys that are genuinely nullable in the API are patched to
 * nullable in the spec — this hook exists for the far more common "Go nil
 * slice" case.
 */
export const stripNulls = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(stripNulls);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v === null) continue;
      out[k] = stripNulls(v);
    }
    return out;
  }
  return value;
};

/**
 * Unify Axiom's two error envelope shapes (`{ code, message }` and
 * `{ error, message }`, some endpoints plain `{ message }`) into one
 * `{ code?, message? }` pair — v0 semantics: `message ?? error`,
 * `code ?? error`.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const error = typeof b.error === "string" ? b.error : undefined;
  const code =
    typeof b.code === "string" || typeof b.code === "number" ? b.code : error;
  const message = typeof b.message === "string" ? b.message : error;
  return { code, message };
};

export const AxiomProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // The Credentials service holds an effect — resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
      ...(creds.orgId ? { "X-Axiom-Org-ID": creds.orgId } : {}),
    }),
    errorEnvelope,
    transformResponse: stripNulls,
    unknownError: ({ code, message, body }) =>
      new UnknownAxiomError({
        code: typeof code === "number" ? String(code) : code,
        message,
        body,
      }),
  });
