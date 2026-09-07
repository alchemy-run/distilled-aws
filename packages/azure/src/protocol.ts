/**
 * AzureProtocol — hand-written.
 *
 * Speaks Azure Resource Manager's bearer-authenticated JSON REST protocol.
 * The generic request/response machinery lives in
 * `@distilled.cloud/core/protocol-http`; this module supplies what is
 * Azure's own (which is why this is a bespoke protocol rather than a
 * `makeRestProtocol` instantiation):
 *
 *   request:  credentials → `Authorization: Bearer <token>` + base URL
 *             (default https://management.azure.com), resolved from the
 *             calling fiber on every request; a `{subscriptionId}` path
 *             placeholder the caller didn't fill is injected from
 *             credentials; the operation's baked `apiVersion` (see
 *             `traits.ts`) is appended as `?api-version=` — ARM requires it
 *             on every call
 *
 *   response: 2xx JSON is the payload (no envelope; sensitive members
 *             delivered as `Redacted`); errors are matched like distilled
 *             v0's Azure client:
 *               1. ARM envelope `{ error: { code, message, target } }` (flat
 *                  `{ code, message }` fallback) → `AZURE_ERROR_CODE_MAP`
 *                  dispatch on `error.code` (~35 codes → ~20 typed classes)
 *               2. core `HTTP_STATUS_MAP` by status (Retry-After honored via
 *                  `parseRetryAfterForStatus`)
 *               3. unmapped 5xx → retryable `InternalServerError`
 *               4. `UnknownAzureError` catch-all
 */
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as AST from "effect/SchemaAST";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import * as API from "@distilled.cloud/core/api";
import { httpSymbol } from "@distilled.cloud/core/trait";
import {
  buildRequest,
  getAnn,
  mapKeys,
} from "@distilled.cloud/core/protocol-http";
import {
  unwrapRedactedDeep,
  wrapSensitive,
} from "@distilled.cloud/core/protocol-rest";
import {
  type ConfigError,
  HTTP_STATUS_MAP,
  InternalServerError,
  type API_ERRORS,
} from "@distilled.cloud/core/errors";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import { Credentials, type Config } from "./credentials.ts";
import {
  AZURE_ERROR_CODE_MAP,
  type AzureApiError,
  UnknownAzureError,
} from "./errors.ts";
import type { HttpTrait } from "./traits.ts";

/**
 * Error channel shared by every generated Azure operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, AzureOpError,
 * AzureOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics. Errors are entirely client-level (v0 parity:
 * `includeOperationErrors=false` — generated ops carry no per-op unions).
 */
export type AzureOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | AzureApiError
  | UnknownAzureError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Azure operation. */
export type AzureOpContext = Credentials | HttpClient.HttpClient;

// Bridge: Protocol.decode is typed as Effect<unknown> (no error channel),
// but Azure failures are real typed errors surfaced through AzureOpError.
// Fail with the instance and erase the type here; the generated operation
// annotations reintroduce it for callers.
const fail = (e: unknown): Effect.Effect<never> =>
  Effect.fail(e) as Effect.Effect<never>;

// ---------------------------------------------------------------------------
// Error-body parsing
// ---------------------------------------------------------------------------

interface ArmError {
  code?: string;
  message?: string;
  target?: string;
}

/**
 * Extract `{ code, message, target }` from an ARM error body: the
 * `{ error: { code, message, target } }` envelope first, the flat
 * `{ code, message }` shape as a fallback (v0 parity).
 */
const parseArmError = (body: unknown): ArmError | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const inner =
    b.error !== null && typeof b.error === "object"
      ? (b.error as Record<string, unknown>)
      : b;
  const code = typeof inner.code === "string" ? inner.code : undefined;
  const message = typeof inner.message === "string" ? inner.message : undefined;
  const target = typeof inner.target === "string" ? inner.target : undefined;
  if (code === undefined && message === undefined) return undefined;
  return { code, message, target };
};

// ---------------------------------------------------------------------------
// Encode
// ---------------------------------------------------------------------------

// The protocol layer is memoized per process by `API.make`, so the build
// must not capture credentials — `encode` resolves Credentials from the
// calling fiber's context on every request instead. Its ConfigError channel
// is erased at this boundary (Protocol effects carry none) and reintroduced
// for callers by the generated AzureOpError annotations.
const encode = ({
  input,
  inputAst,
}: {
  readonly input: unknown;
  readonly inputAst: AST.AST;
}) =>
  Effect.gen(function* () {
    const resolveCredentials = yield* Credentials;
    const creds = yield* resolveCredentials as Effect.Effect<Config>;
    let request = buildRequest({
      input: unwrapRedactedDeep(input),
      inputAst,
      baseUrl: creds.apiBaseUrl,
      headers: {
        Authorization: `Bearer ${Redacted.value(creds.bearerToken)}`,
      },
    });

    // Azure-specific URL rewrites, applied to the built request:
    //  1. `{subscriptionId}` left unfilled by the caller is injected from
    //     credentials (v0 parity: users set AZURE_SUBSCRIPTION_ID once and
    //     individual operations pick it up automatically).
    //  2. ARM requires `api-version` on every call — the version baked into
    //     the operation's Http trait at generation time is appended unless
    //     the URL already carries one.
    const http = getAnn(inputAst, httpSymbol) as HttpTrait | undefined;
    let url = request.url;
    if (url.includes("{subscriptionId}")) {
      url = url
        .split("{subscriptionId}")
        .join(encodeURIComponent(creds.subscriptionId));
    }
    if (http?.apiVersion && !/[?&]api-version=/.test(url)) {
      url += `${url.includes("?") ? "&" : "?"}api-version=${encodeURIComponent(http.apiVersion)}`;
    }
    if (url !== request.url) {
      request = HttpClientRequest.setUrl(request, url);
    }
    return request;
  });

// ---------------------------------------------------------------------------
// Decode
// ---------------------------------------------------------------------------

const decode = ({
  response,
  outputAst,
}: {
  readonly response: HttpClientResponse.HttpClientResponse;
  readonly outputAst: AST.AST;
  readonly errors: ReadonlyArray<unknown>;
}) =>
  Effect.gen(function* () {
    // Read as text and parse tolerantly — error pages are often non-JSON.
    const text = (yield* response.text.pipe(Effect.orDie)) ?? "";
    if (process.env.DISTILLED_DEBUG_HTTP) {
      console.error(`[distilled] <- ${response.status} ${text.slice(0, 400)}`);
    }
    let json: unknown;
    let nonJson = false;
    if (text.trim().length > 0) {
      try {
        json = JSON.parse(text);
      } catch {
        nonJson = true;
      }
    }
    const status = response.status;
    const headers = response.headers as Record<string, string | undefined>;

    if (status >= 400) {
      const body = nonJson ? text : json;
      const arm = nonJson ? undefined : parseArmError(json);

      // 1. Match by Azure error code first for richer typed errors.
      const AzureErrorClass =
        arm?.code !== undefined ? AZURE_ERROR_CODE_MAP[arm.code] : undefined;
      if (AzureErrorClass) {
        return yield* fail(
          new AzureErrorClass({
            message: arm!.message,
            code: arm!.code,
            target: arm!.target,
          }),
        );
      }

      // 2. Fall back to standard HTTP status errors (Retry-After honored on
      //    retryable statuses).
      const StatusErrorClass =
        HTTP_STATUS_MAP[status as keyof typeof HTTP_STATUS_MAP];
      if (StatusErrorClass) {
        return yield* fail(
          new StatusErrorClass({
            message:
              arm?.message ?? (nonJson && text.trim() ? text.trim() : ""),
            retryAfter: parseRetryAfterForStatus(status, headers),
          } as any),
        );
      }

      // 3. Unmapped 5xx → retryable server error.
      if (status >= 500) {
        return yield* fail(
          new InternalServerError({
            message: arm?.message ?? `HTTP ${status}`,
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        );
      }

      // 4. Unknown Azure error.
      return yield* fail(
        new UnknownAzureError({
          code: arm?.code,
          message: arm?.message,
          target: arm?.target,
          body,
        }),
      );
    }

    // 2xx: the response body IS the payload (ARM has no success envelope).
    // Wire→TS key mapping is schema-driven; `RawResponseRoot` responses are
    // the body verbatim (mapKeys handles arrays/scalars structurally either
    // way). Sensitive members are delivered as `Redacted`.
    const body: unknown = nonJson ? text : (json ?? {});
    return wrapSensitive(outputAst, mapKeys(outputAst, body, "decode"));
  });

export const AzureProtocol: Layer.Layer<API.Protocol> = Layer.succeed(
  API.Protocol,
  API.Protocol.of({
    // Erase encode's Credentials requirement (resolved on the calling
    // fiber; see the note above `encode`).
    encode: (args) =>
      encode(args) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
    decode,
  }),
);
