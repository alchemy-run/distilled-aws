/**
 * KubernetesProtocol — hand-written.
 *
 * The Kubernetes API server speaks plain bearer-authenticated JSON REST (no
 * response envelope), so the whole protocol is one `makeRestProtocol` call
 * from `core/protocol-rest`:
 *
 *   request:  credentials → `Authorization: Bearer <token>` + per-cluster
 *             base URL (mandatory — EKS/GKE endpoint, https://localhost:6443,
 *             …), resolved from the calling fiber on every request
 *
 *   response: 2xx JSON is the resource object itself; non-2xx bodies follow
 *             the `v1.Status` schema (`{ kind, status, message, reason,
 *             code, details }`) and map to the operation's typed error
 *             classes by status, then the shared HTTP-status classes, then
 *             {@link UnknownKubernetesError} (carrying the `reason`).
 *
 * Streaming caveat (mirrors distilled v0): connect* (exec/attach/
 * portforward/proxy), log, and watch* operations are generated as ordinary
 * request/response JSON operations — there is no WebSocket/SPDY/chunked-watch
 * support, so they will not behave like `kubectl exec` / `kubectl watch`.
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
import { UnknownKubernetesError } from "./errors.ts";

/**
 * Error channel shared by every generated Kubernetes operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * KubernetesOpError, KubernetesOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type KubernetesOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownKubernetesError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Kubernetes operation. */
export type KubernetesOpContext = Credentials | HttpClient.HttpClient;

/** `reason` from a `v1.Status` error body, when present. */
const statusReason = (body: unknown): string | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const reason = (body as Record<string, unknown>).reason;
  return typeof reason === "string" ? reason : undefined;
};

export const KubernetesProtocol: Layer.Layer<API.Protocol> =
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
    // The k8s error body is `v1.Status` — `{ message, reason, code }`. The
    // factory's default lenient envelope reads `message`/`code`; `reason` is
    // recovered from the raw body for the unknown fallback below.
    unknownError: ({ message, body }) =>
      new UnknownKubernetesError({
        reason: statusReason(body),
        message,
        body,
      }),
  });
