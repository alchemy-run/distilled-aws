/**
 * GcpProtocol — hand-written.
 *
 * Speaks Google's JSON REST protocol as the distilled gcp client did. The
 * generic trait helpers live in `@distilled.cloud/core/protocol-http`; this
 * module supplies what is GCP's own:
 *
 *   request:  credentials → `Authorization: Bearer <access token>`; the
 *             per-service base URL (rootUrl + servicePath) read from the
 *             extended `T.Http({ ... baseUrl })` trait; RFC 6570
 *             reserved-expansion for `{+param}` path tokens (Google
 *             discovery paths like `v1/{+name}` carry multi-segment
 *             resource names whose `/` must NOT be percent-encoded);
 *             query params (arrays as repeated `k=v`); a single
 *             `HttpBody()` member as the whole JSON request body.
 *
 *   response: 2xx JSON body returned as-is (GCP wire names are already the
 *             TS-facing names). Failures carry the standard GCP error
 *             envelope `{ error: { code, message, status, details } }` —
 *             dispatch is purely by HTTP status via core's
 *             `HTTP_STATUS_MAP` (mirroring the distilled gcp client), with
 *             the envelope's gRPC-style `status` string and `details[]`
 *             tacked onto the instance so the per-service error classes'
 *             declared fields are populated at catch sites. Unmatched
 *             statuses → `UnknownGCPError`.
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
import {
  getAnn,
  getProps,
  hasPropAnn,
  nameOf,
} from "@distilled.cloud/core/protocol-http";
import {
  bodySymbol,
  headerSymbol,
  httpBodySymbol,
  httpSymbol,
  labelSymbol,
  querySymbol,
} from "@distilled.cloud/core/trait";
import { HTTP_STATUS_MAP } from "@distilled.cloud/core/errors";
import type { DefaultErrors } from "@distilled.cloud/core/errors";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import { Credentials, type Config } from "./credentials.ts";
import { GCPParseError, UnknownGCPError } from "./errors.ts";
import type { GcpHttpTrait } from "./traits.ts";

/**
 * Error channel shared by every generated GCP operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, <Op>Error,
 * GcpOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type GcpOpError =
  | DefaultErrors
  | UnknownGCPError
  | GCPParseError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated GCP operation. */
export type GcpOpContext = Credentials | HttpClient.HttpClient;

// Bridge: Protocol.decode is typed as Effect<unknown> (no error channel), but
// GCP failures are real typed errors that an operation re-surfaces via its
// `errors: [...]` list. Fail with the instance and erase the error type here;
// `API.make`'s signature reintroduces it for callers.
const fail = (e: unknown): Effect.Effect<never> =>
  Effect.fail(e) as Effect.Effect<never>;

/**
 * RFC 6570 §3.2.3 reserved-expansion: encode everything outside the RFC
 * 3986 unreserved (`A-Za-z0-9-._~`) and reserved (`:/?#[]@!$&'()*+,;=`)
 * sets. Used for `{+param}` path tokens (ported from the distilled core).
 */
const RFC3986_NEEDS_ENCODING = /[^A-Za-z0-9\-._~:/?#\[\]@!$&'()*+,;=]/g;
const encodeReserved = (v: string): string =>
  v.replace(RFC3986_NEEDS_ENCODING, encodeURIComponent);

/** Serialize one query member: arrays as repeated `k=v`, scalars stringified. */
const appendQuery = (
  query: URLSearchParams,
  name: string,
  value: unknown,
): void => {
  if (Array.isArray(value)) {
    for (const v of value) appendQuery(query, name, v);
  } else if (value !== undefined && value !== null) {
    query.append(name, String(value));
  }
};

/**
 * Shape of GCP's standard error envelope as documented at
 * <https://cloud.google.com/apis/design/errors>:
 *
 * ```json
 * { "error": { "code": 400, "message": "…", "status": "FAILED_PRECONDITION",
 *   "details": [{ "@type": "type.googleapis.com/google.rpc.QuotaFailure", … }] } }
 * ```
 */
const extractGCPErrorEnvelope = (
  errorBody: unknown,
): {
  code: number | undefined;
  message: string | undefined;
  status: string | undefined;
  details: ReadonlyArray<unknown> | undefined;
} => {
  const none = {
    code: undefined,
    message: undefined,
    status: undefined,
    details: undefined,
  };
  if (
    typeof errorBody !== "object" ||
    errorBody === null ||
    !("error" in errorBody)
  ) {
    return none;
  }
  const err = (errorBody as { error?: unknown }).error;
  if (typeof err !== "object" || err === null) return none;
  const e = err as {
    code?: unknown;
    message?: unknown;
    status?: unknown;
    details?: unknown;
  };
  return {
    code: typeof e.code === "number" ? e.code : undefined,
    message: typeof e.message === "string" ? e.message : undefined,
    status: typeof e.status === "string" ? e.status : undefined,
    details: Array.isArray(e.details) ? e.details : undefined,
  };
};

/**
 * The envelope fields the per-service error classes declare but the core
 * `HTTP_STATUS_MAP` classes don't. `Effect.catchTag` matches by `_tag`
 * (string) and the runtime instance built here shares a tag with the
 * per-service class, so tacking the structured envelope fields onto the
 * instance after construction makes them visible at the per-service
 * narrowed type — core stays untouched (mirrors the distilled gcp client).
 */
type EnvelopeAddenda = {
  status?: string;
  details?: ReadonlyArray<unknown>;
};

// The protocol layer is memoized per process by `API.make`, so the build
// must not capture credentials — `encode` resolves Credentials from the
// calling fiber's context on every request. The requirement is erased at
// this boundary (Protocol effects are typed with no requirements) and
// reintroduced for callers by the generated `GcpOpContext` annotations.
const encode = ({
  input,
  inputAst,
}: {
  readonly input: unknown;
  readonly inputAst: AST.AST;
}) =>
  Effect.gen(function* () {
    // The Credentials service holds an effect — resolving it here (per
    // request) picks up externally-rotated tokens.
    const resolveCredentials = yield* Credentials;
    const creds: Config = yield* resolveCredentials;

    const http = getAnn(inputAst, httpSymbol) as GcpHttpTrait | undefined;
    if (!http) {
      throw new Error("operation input is missing the Http() trait");
    }
    const inputObj = (input ?? {}) as Record<string, unknown>;

    const headers: Record<string, string> = {
      Authorization: `Bearer ${Redacted.value(creds.accessToken)}`,
    };
    const query = new URLSearchParams();
    let uri = http.uri;
    let rawBody: unknown;
    const bodyBag: Record<string, unknown> = {};
    let hasBodyBag = false;

    for (const prop of getProps(inputAst)) {
      const value = inputObj[String(prop.name)];
      if (value === undefined) continue;

      if (hasPropAnn(prop, labelSymbol)) {
        const token = nameOf(prop, labelSymbol);
        // Discovery paths use RFC 6570 reserved expansion (`{+name}`) for
        // multi-segment resource names; plain `{name}` is fully encoded.
        uri = uri.includes(`{+${token}}`)
          ? uri.replace(`{+${token}}`, encodeReserved(String(value)))
          : uri.replace(`{${token}}`, encodeURIComponent(String(value)));
      } else if (hasPropAnn(prop, querySymbol)) {
        appendQuery(query, nameOf(prop, querySymbol), value);
      } else if (hasPropAnn(prop, headerSymbol)) {
        headers[nameOf(prop, headerSymbol).toLowerCase()] = String(value);
      } else if (hasPropAnn(prop, httpBodySymbol)) {
        // The generated `body` member IS the whole JSON request body.
        rawBody = value;
      } else {
        // Plain members (patch-introduced) become JSON body fields.
        bodyBag[nameOf(prop, bodySymbol)] = value;
        hasBodyBag = true;
      }
    }

    const qs = query.toString();
    const url = `${http.baseUrl}${uri}${qs ? `?${qs}` : ""}`;
    if (process.env.DISTILLED_DEBUG_HTTP) {
      console.error(`[distilled] ${http.method} ${url}`);
    }

    let request = HttpClientRequest.make(http.method)(url).pipe(
      HttpClientRequest.setHeaders(headers),
    );
    const body =
      rawBody !== undefined ? rawBody : hasBodyBag ? bodyBag : undefined;
    if (body !== undefined && http.method !== "GET" && http.method !== "HEAD") {
      request = request.pipe(HttpClientRequest.bodyJsonUnsafe(body));
    }
    return request;
  });

const decode = ({
  response,
}: {
  readonly response: HttpClientResponse.HttpClientResponse;
  readonly outputAst: AST.AST;
  readonly errors: ReadonlyArray<unknown>;
}) =>
  Effect.gen(function* () {
    // Read as text and parse tolerantly — some error responses (proxies,
    // HTML error pages) carry non-JSON bodies.
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

    if (status >= 400) {
      const headers = response.headers as Record<string, string | undefined>;
      const envelope = extractGCPErrorEnvelope(json);
      const message =
        envelope.message ?? (nonJson && text ? text : String(status));

      // Status-map dispatch, exactly like the distilled gcp client: the
      // constructed instance shares its `_tag` with the per-service typed
      // error classes (NotFound/Forbidden/BadRequest/Conflict/…), and the
      // envelope's `status` / `details` are tacked on so the per-service
      // narrowed type sees them.
      const ErrorClass =
        HTTP_STATUS_MAP[status as keyof typeof HTTP_STATUS_MAP];
      if (ErrorClass) {
        const instance = new ErrorClass({
          message,
          retryAfter: parseRetryAfterForStatus(status, headers),
        } as any);
        const tackOn = instance as unknown as EnvelopeAddenda;
        if (envelope.status !== undefined) tackOn.status = envelope.status;
        if (envelope.details !== undefined) tackOn.details = envelope.details;
        return yield* fail(instance);
      }

      const unknownInstance = new UnknownGCPError({
        code: envelope.code ?? status,
        message,
        body: json ?? text,
      });
      const tackOnUnknown = unknownInstance as unknown as EnvelopeAddenda;
      if (envelope.status !== undefined) {
        tackOnUnknown.status = envelope.status;
      }
      return yield* fail(unknownInstance);
    }

    // Success: the JSON body is the payload verbatim (GCP wire names are
    // already the TS-facing names). Empty bodies (204 / empty 200) decode
    // to an empty object so `<Op>Response {}` outputs stay well-typed.
    if (nonJson) return text;
    return json ?? {};
  });

export const GcpProtocol: Layer.Layer<API.Protocol> = Layer.succeed(
  API.Protocol,
  API.Protocol.of({
    // Erase encode's Credentials requirement (see comment above).
    encode: (args) =>
      encode(args) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
    decode,
  }),
);
