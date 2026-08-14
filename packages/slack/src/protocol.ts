/**
 * SlackProtocol — hand-written.
 *
 * Speaks the Slack Web API convention. The generic request/response machinery
 * (trait-driven request building, recursive wire-name mapping, typed-error
 * matcher evaluation) lives in `@distilled.cloud/core/protocol-http`; this
 * module supplies what is Slack's own:
 *
 *   request:  credentials → `Authorization: Bearer <token>` (omitted for an
 *             empty token — the OAuth exchange methods authenticate with
 *             `client_id`/`client_secret` args instead), and array-valued
 *             query args joined with commas (`channel_ids=C1,C2` — Slack
 *             reads comma-separated lists, not repeated params)
 *
 *   response: `{ "ok": true, …payload }` — the payload shares the envelope's
 *             level, so a successful body maps onto the output schema
 *             directly (`ok` is a modeled member).
 *             `{ "ok": false, "error": "<slug>" }` — usually WITH HTTP 200 —
 *             becomes a typed error: per-op matcher classes first, then the
 *             infrastructure slugs (auth → Unauthorized, throttling →
 *             SlackRateLimited, server hiccups → retryable 5xx classes),
 *             then {@link SlackError} carrying the slug.
 *             A successful NON-JSON body is returned as raw bytes — the one
 *             method that answers this way (`admin.analytics.getFile`) sends
 *             a gzipped NDJSON file.
 */
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import type * as AST from "effect/SchemaAST";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import * as Redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import {
  httpSymbol,
  querySymbol,
  type HttpTrait,
} from "@distilled.cloud/core/trait";
import {
  buildRequest,
  getAnn,
  getProps,
  hasPropAnn,
  mapKeys,
  matchTypedError,
} from "@distilled.cloud/core/protocol-http";
import {
  unwrapRedactedDeep,
  wrapSensitive,
} from "@distilled.cloud/core/protocol-rest";
import {
  ConfigError,
  GatewayTimeout,
  HTTP_STATUS_MAP,
  InternalServerError,
  ServiceUnavailable,
  Unauthorized,
} from "@distilled.cloud/core/errors";
import {
  parseRetryAfterForStatus,
  parseServerRetryHint,
} from "@distilled.cloud/core/retry-after";
import { Credentials, type Config } from "./credentials.ts";
import {
  type DefaultErrors,
  SlackError,
  SlackHttpError,
  SlackRateLimited,
} from "./errors.ts";

/**
 * Error channel shared by every generated Slack operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, SlackOpError,
 * SlackOpContext>` explicitly so the compiler never infers these back out of
 * the schema generics.
 */
export type SlackOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Slack operation. */
export type SlackOpContext = Credentials | HttpClient.HttpClient;

// Bridge: Protocol.decode is typed as Effect<unknown> (no error channel), but
// Slack failures are real typed errors that an operation re-surfaces via its
// `errors: [...]` list. Fail with the instance and erase the error type here;
// `API.make`'s signature reintroduces it for callers.
const fail = (e: unknown): Effect.Effect<never> =>
  Effect.fail(e) as Effect.Effect<never>;

/**
 * Envelope slugs that mean "the token is no good" on ANY method — mapped to
 * the shared Unauthorized class so one catch handles credential problems
 * across the SDK. Permission-shaped slugs (`missing_scope`, `no_permission`,
 * `access_denied`, …) stay {@link SlackError}: they carry method-specific
 * detail (`needed`/`provided`) the shared class would drop.
 */
const AUTH_SLUGS = new Set([
  "not_authed",
  "invalid_auth",
  "account_inactive",
  "token_revoked",
  "token_expired",
]);

/** Envelope slugs that are Slack-side hiccups — retryable server errors. */
const SERVER_SLUGS: Record<string, (message: string) => unknown> = {
  internal_error: (message) => new InternalServerError({ message }),
  fatal_error: (message) => new InternalServerError({ message }),
  service_unavailable: (message) => new ServiceUnavailable({ message }),
  request_timeout: (message) => new GatewayTimeout({ message }),
};

/**
 * Serialize input members the way Slack's wire wants them, before the
 * generic request builder runs:
 *
 *   • Array-valued QUERY args join with commas (`channel_ids=C1,C2`) —
 *     core's default would repeat the param instead.
 *   • On form-urlencoded operations, every non-scalar body member is
 *     flattened to the string Slack's form convention reads: ID lists
 *     comma-joined, rich values (blocks, barrier subjects, datastore items)
 *     JSON-encoded — core's default is Stripe-style bracket notation, which
 *     Slack does not speak.
 */
const serializeForWire = (input: unknown, inputAst: AST.AST): unknown => {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    return input;
  }
  const isForm =
    (getAnn(inputAst, httpSymbol) as HttpTrait | undefined)?.contentType ===
    "form-urlencoded";
  const props = getProps(inputAst);
  if (props.length === 0) return input;
  let out: Record<string, unknown> | undefined;
  for (const prop of props) {
    const key = String(prop.name);
    const value = (input as Record<string, unknown>)[key];
    if (value === null || typeof value !== "object") continue;
    const isQuery = hasPropAnn(prop, querySymbol);
    if (Array.isArray(value) && (isQuery || isForm)) {
      out ??= { ...(input as Record<string, unknown>) };
      out[key] = value.every((v) => typeof v !== "object" || v === null)
        ? value.join(",")
        : JSON.stringify(value);
    } else if (isForm && !isQuery) {
      out ??= { ...(input as Record<string, unknown>) };
      out[key] = JSON.stringify(value);
    }
  }
  return out ?? input;
};

// The protocol layer is memoized per process by `API.make` (see
// `OperationConfig.protocol`), so the build must not capture credentials —
// `encode` resolves Credentials from the calling fiber's context on every
// request instead. Like the error channel above, the requirement is erased at
// this boundary (Protocol effects are typed with no requirements) and
// reintroduced for callers by the generated `SlackOpContext` annotations.
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
    const token = Redacted.value(creds.token);
    return buildRequest({
      input: serializeForWire(unwrapRedactedDeep(input), inputAst),
      inputAst,
      baseUrl: creds.apiBaseUrl,
      // An empty token means a credential-less call (the OAuth exchange
      // methods) — no Authorization header at all.
      headers: token === "" ? {} : { authorization: `Bearer ${token}` },
    });
  });

const decode = ({
  response,
  outputAst,
  errors: errorClasses,
}: {
  readonly response: HttpClientResponse.HttpClientResponse;
  readonly outputAst: AST.AST;
  readonly errors: ReadonlyArray<unknown>;
}) =>
  Effect.gen(function* () {
    // Read as BYTES first: the analytics export answers a successful call
    // with a gzipped file, which a text read would corrupt. Everything else
    // decodes from the same buffer.
    const bytes = new Uint8Array(
      yield* response.arrayBuffer.pipe(Effect.orDie),
    );
    const text = new TextDecoder().decode(bytes);
    if (process.env.DISTILLED_DEBUG_HTTP) {
      console.error(`[distilled] <- ${response.status} ${text.slice(0, 400)}`);
    }

    let json: Record<string, unknown> | undefined;
    if (text.trim().length > 0) {
      try {
        const parsed = JSON.parse(text);
        if (parsed !== null && typeof parsed === "object") {
          json = parsed as Record<string, unknown>;
        }
      } catch {
        // non-JSON — a binary success payload or an HTML error page
      }
    }
    const status = response.status;
    const headers = response.headers as Record<string, string | undefined>;

    // Slack reports failures as `ok: false`, usually WITH HTTP 200 — a
    // non-2xx status without an envelope (proxy pages) is also a failure.
    const failed = status >= 400 || json?.ok === false;
    if (failed) {
      const slug = typeof json?.error === "string" ? json.error : undefined;
      // `response_metadata.messages` carries per-field validation detail
      // (e.g. `invalid_arguments`); some envelopes use a bare `errors` list.
      const detailMessages = (
        [
          ...((json?.response_metadata as { messages?: unknown[] } | undefined)
            ?.messages ?? []),
          ...((Array.isArray(json?.errors) ? json.errors : []) as unknown[]),
        ] as unknown[]
      ).filter((m): m is string => typeof m === "string");
      const message =
        detailMessages[0] ??
        slug ??
        (json === undefined && text.trim() ? text.trim() : `HTTP ${status}`);

      // 1. Per-operation typed error (matcher metadata on the class — none
      //    are generated today, but model patches can add them). Slack's
      //    error codes are string slugs, and matcher `code`s are numeric —
      //    a patch-declared class matches on `status`/`message` instead
      //    (`message` is the slug when the envelope carries no detail).
      const typed = matchTypedError(errorClasses, status, [{ message }]);
      if (typed !== undefined) return yield* fail(typed);

      // 2. Throttling — the 429 or its envelope spellings.
      if (status === 429 || slug === "rate_limited" || slug === "ratelimited") {
        return yield* fail(
          new SlackRateLimited({
            code: slug ?? "rate_limited",
            message,
            retryAfter: parseServerRetryHint(headers),
          }),
        );
      }

      // 3. Infrastructure slugs: credential problems and Slack-side hiccups.
      if (slug !== undefined && AUTH_SLUGS.has(slug)) {
        return yield* fail(new Unauthorized({ message: slug }));
      }
      if (slug !== undefined && slug in SERVER_SLUGS) {
        return yield* fail(SERVER_SLUGS[slug]!(message));
      }

      // 4. Any other envelope slug → SlackError, the slug preserved.
      if (slug !== undefined) {
        return yield* fail(
          new SlackError({
            code: slug,
            ...(message !== slug ? { message } : {}),
            ...(typeof json?.needed === "string"
              ? { needed: json.needed }
              : {}),
            ...(typeof json?.provided === "string"
              ? { provided: json.provided }
              : {}),
            ...(detailMessages.length > 0 ? { messages: detailMessages } : {}),
          }),
        );
      }

      // 5. No envelope at all: HTTP-status classes / retryable 5xx / raw.
      const StatusErrorClass =
        HTTP_STATUS_MAP[status as keyof typeof HTTP_STATUS_MAP];
      if (StatusErrorClass) {
        return yield* fail(
          new StatusErrorClass({
            message,
            retryAfter: parseRetryAfterForStatus(status, headers),
          } as any),
        );
      }
      if (status >= 500) {
        return yield* fail(
          new InternalServerError({
            message,
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        );
      }
      return yield* fail(
        new SlackHttpError({ status, message, body: text.slice(0, 2000) }),
      );
    }

    // Successful non-JSON body: raw bytes (the analytics file download —
    // modeled as a Document output, so the bytes pass through verbatim).
    if (json === undefined) {
      return bytes;
    }

    // 2xx envelope: the body IS the payload (`ok` rides along as a modeled
    // member). Wire→TS key mapping is schema-driven; sensitive members
    // (OAuth access/refresh tokens) wrap in Redacted.
    return wrapSensitive(outputAst, mapKeys(outputAst, json, "decode"));
  });

export const SlackProtocol: Layer.Layer<API.Protocol> = Layer.succeed(
  API.Protocol,
  API.Protocol.of({
    // Erase encode's Credentials requirement (see comment above).
    encode: (args) =>
      encode(args) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
    decode,
  }),
);
