/**
 * RailwayGraphqlProtocol — hand-written.
 *
 * Speaks Railway's public GraphQL API: every operation is
 * `POST ${apiBaseUrl}/graphql/v2` with a `{ query, operationName, variables }`
 * envelope, answered by a `{ data, errors }` envelope.
 *
 *   request:  credentials → `Authorization: Bearer <token>` for account/team
 *             tokens, or `Project-Access-Token: <token>` for project-scoped
 *             ones (see `credentials.ts`). The operation's input IS the
 *             GraphQL variables object; the baked document travels on the
 *             input schema via `T.GraphQLOp`.
 *
 *   response: errors arrive two ways:
 *             1. HTTP 200 with `{ errors: [...] }` — the normal path for
 *                business failures. Each entry carries `message` and an
 *                Apollo-style `extensions.code`, matched against
 *                `RAILWAY_ERROR_CODE_MAP`, then the HTTP status map, then
 *                `UnknownRailwayError`.
 *             2. HTTP status >= 400 — transport/auth/proxy failures that
 *                never reached the GraphQL layer; body is usually
 *                `{ message }` or a plain errors envelope. Mapped via the
 *                shared status map with retry-after parsing.
 *             On success the value of `data.<responsePath>` (see
 *             `T.ResponsePath`) is returned verbatim.
 */
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import type * as AST from "effect/SchemaAST";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import * as API from "@distilled.cloud/core/api";
import { getAnn } from "@distilled.cloud/core/protocol-http";
import { HTTP_STATUS_MAP } from "@distilled.cloud/core/errors";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import { type Config, Credentials } from "./credentials.ts";
import {
  type DefaultErrors,
  RAILWAY_ERROR_CODE_MAP,
  RAILWAY_ERROR_MATCHERS,
  RailwayParseError,
  RailwayRateLimited,
  UnknownRailwayError,
} from "./errors.ts";
import {
  graphqlOpSymbol,
  type GraphQLOpTrait,
  httpSymbol,
  type HttpTrait,
  responsePathSymbol,
} from "./traits.ts";

/**
 * Error channel shared by every generated Railway operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * RailwayOpError, RailwayOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 *
 * Errors are client-wide (no per-operation unions): the GraphQL `errors[]`
 * envelope is matched against `RAILWAY_ERROR_CODE_MAP` regardless of which
 * operation was called, because GraphQL has no per-field error contract.
 */
export type RailwayOpError = DefaultErrors | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Railway operation. */
export type RailwayOpContext = Credentials | HttpClient.HttpClient;

// Bridge: Protocol.decode is typed as Effect<unknown> (no error channel), but
// Railway failures are real typed errors that the operation's explicit
// `RailwayOpError` annotation re-surfaces. Fail with the instance and erase
// the error type here.
const fail = (e: unknown): Effect.Effect<never> =>
  Effect.fail(e) as Effect.Effect<never>;

// ============================================================================
// Error envelope parsing
// ============================================================================

/** Single GraphQL error in the `errors[]` array of a response envelope. */
const GraphQLError = Schema.Struct({
  message: Schema.String,
  path: Schema.optional(Schema.Array(Schema.Unknown)),
  locations: Schema.optional(Schema.Array(Schema.Unknown)),
  extensions: Schema.optional(
    Schema.Struct({
      code: Schema.optional(Schema.String),
      errorCode: Schema.optional(Schema.String),
    }),
  ),
});

/** Top-level GraphQL envelope for an error response. */
const GraphQLEnvelope = Schema.Struct({
  data: Schema.optional(Schema.NullOr(Schema.Unknown)),
  errors: Schema.optional(Schema.Array(GraphQLError)),
});

/** Plain REST-ish error body, returned for some HTTP-level failures. */
const RestErrorResponse = Schema.Struct({
  message: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
});

const decodeEnvelope = Schema.decodeUnknownOption(GraphQLEnvelope);
const decodeRest = Schema.decodeUnknownOption(RestErrorResponse);

/** GraphQL rate limits often arrive as HTTP 200 with no Retry-After header. */
const retryAfterForRateLimit = (
  message: string,
  headers?: Record<string, string | undefined>,
) => {
  const fromHeader = parseRetryAfterForStatus(429, headers);
  if (fromHeader !== undefined) return fromHeader;
  const match =
    /per (\d+) seconds/.exec(message) ?? /every (\d+)\s*s/.exec(message);
  if (match !== null) {
    return Duration.seconds(Number(match[1]) + 1);
  }
  return Duration.seconds(31);
};

type StatusClass = new (args: {
  message: string;
  retryAfter?: ReturnType<typeof parseRetryAfterForStatus>;
}) => unknown;

/**
 * Match a Railway error response (GraphQL envelope or HTTP-level body) to the
 * appropriate error class: typed `extensions.code` classes first, then the
 * shared HTTP status map, then `UnknownRailwayError`.
 */
const matchError = (
  status: number,
  errorBody: unknown,
  headers?: Record<string, string | undefined>,
): Effect.Effect<never> => {
  // Try the GraphQL envelope first — it covers both HTTP 200 with errors[]
  // (the common case) and 4xx responses from the GraphQL gateway itself.
  const envelope = decodeEnvelope(errorBody);
  if (envelope._tag === "Some" && envelope.value.errors?.length) {
    const first = envelope.value.errors[0]!;
    const code = first.extensions?.code ?? first.extensions?.errorCode;
    const message = first.message;

    const matcher = RAILWAY_ERROR_MATCHERS.find((entry) => {
      if (entry.code !== undefined && entry.code !== code) return false;
      if (
        entry.messageIncludes !== undefined &&
        !message.includes(entry.messageIncludes)
      ) {
        return false;
      }
      return true;
    });
    if (matcher) {
      if (matcher.error === RailwayRateLimited) {
        const retryAfter = retryAfterForRateLimit(message, headers);
        return fail(new RailwayRateLimited({ message, retryAfter }));
      }
      return fail(new matcher.error({ message }));
    }

    if (code) {
      const TypedClass = RAILWAY_ERROR_CODE_MAP[code];
      if (TypedClass) {
        // Rate-limit errors carry a retry hint when the gateway sent one.
        if (TypedClass === RailwayRateLimited) {
          const retryAfter = retryAfterForRateLimit(message, headers);
          return fail(new RailwayRateLimited({ message, retryAfter }));
        }
        return fail(new TypedClass({ message }));
      }
    }

    const StatusClass = (HTTP_STATUS_MAP as Record<number, unknown>)[status] as
      | StatusClass
      | undefined;
    if (StatusClass && status >= 400) {
      return fail(
        new StatusClass({
          message,
          retryAfter: parseRetryAfterForStatus(status, headers),
        }),
      );
    }

    return fail(new UnknownRailwayError({ code, message, body: errorBody }));
  }

  // Plain REST-ish error body (proxies, gateway timeouts, auth rejections).
  const rest = decodeRest(errorBody);
  if (rest._tag === "Some") {
    const StatusClass = (HTTP_STATUS_MAP as Record<number, unknown>)[status] as
      | StatusClass
      | undefined;
    if (StatusClass) {
      return fail(
        new StatusClass({
          message: rest.value.message ?? "",
          retryAfter: parseRetryAfterForStatus(status, headers),
        }),
      );
    }
    return fail(
      new UnknownRailwayError({
        code: rest.value.code,
        message: rest.value.message,
        body: errorBody,
      }),
    );
  }

  const StatusClass = (HTTP_STATUS_MAP as Record<number, unknown>)[status] as
    | StatusClass
    | undefined;
  if (StatusClass && status >= 400) {
    const message =
      typeof errorBody === "string" && errorBody.trim().length > 0
        ? errorBody
        : `HTTP ${status}`;
    return fail(
      new StatusClass({
        message,
        retryAfter: parseRetryAfterForStatus(status, headers),
      }),
    );
  }

  return fail(new UnknownRailwayError({ body: errorBody }));
};

/** Cloudflare's public GraphQL edge is 10 RPS; `source=` is an identified client. */
const withClientSource = (url: string) => {
  if (/[?&]source=/.test(url)) return url;
  return url.includes("?") ? `${url}&source=alchemy` : `${url}?source=alchemy`;
};

// ============================================================================
// Protocol
// ============================================================================

// The protocol layer is memoized per process by `API.make`, so the build must
// not capture credentials — `encode` resolves Credentials from the calling
// fiber's context on every request instead. The requirement is erased at this
// boundary (Protocol effects are typed with no requirements) and reintroduced
// for callers by the generated `RailwayOpContext` annotations.
const encode = ({
  input,
  inputAst,
}: {
  readonly input: unknown;
  readonly inputAst: AST.AST;
}) =>
  Effect.gen(function* () {
    // The Credentials service holds an effect — resolving it here (per
    // request) picks up rotations.
    const resolveCredentials = yield* Credentials;
    const creds = yield* resolveCredentials as Effect.Effect<Config>;

    const op = getAnn(inputAst, graphqlOpSymbol) as GraphQLOpTrait | undefined;
    if (!op) {
      // A codegen bug — surfaced as a defect by the calling Effect context.
      throw new Error("operation input is missing the GraphQLOp() trait");
    }
    const http = getAnn(inputAst, httpSymbol) as HttpTrait | undefined;

    // The operation's input IS the GraphQL variables object (variable names
    // are emitted verbatim — no wire renames).
    const variables: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(
      (input ?? {}) as Record<string, unknown>,
    )) {
      if (v !== undefined) variables[k] = v;
    }

    const token = Redacted.value(creds.token).trim();
    // Public mutations (loginSessionCreate / verify / consume / cancel)
    // run before the user has a token. An empty credential must not send a
    // bogus `Authorization: Bearer ` header — Railway rejects that as
    // UNAUTHENTICATED even for otherwise-unauthenticated fields.
    const auth =
      token.length === 0
        ? {}
        : creds.tokenKind === "project"
          ? { "Project-Access-Token": token }
          : { Authorization: `Bearer ${token}` };

    // Terraform's Railway provider hits
    // `.../graphql/v2?source=terraform_provider_railway` so Cloudflare's
    // 10 RPS edge limit on anonymous GraphQL does not apply. Same shape.
    const url = withClientSource(
      `${creds.apiBaseUrl}${http?.uri ?? "/graphql/v2"}`,
    );
    if (process.env.DISTILLED_DEBUG_HTTP) {
      console.error(
        `[distilled] POST ${url} op=${op.operationName} variables=${JSON.stringify(variables).slice(0, 400)}`,
      );
    }
    return HttpClientRequest.make("POST")(url).pipe(
      HttpClientRequest.setHeaders({
        ...auth,
        Accept: "application/json",
      }),
      HttpClientRequest.bodyJsonUnsafe({
        query: op.query,
        operationName: op.operationName,
        variables,
      }),
    );
  });

const decode = ({
  response,
  outputAst,
}: {
  readonly response: HttpClientResponse.HttpClientResponse;
  readonly outputAst: AST.AST;
  readonly errors: ReadonlyArray<unknown>;
}) =>
  Effect.gen(function* () {
    const text = (yield* response.text.pipe(Effect.orDie)) ?? "";
    if (process.env.DISTILLED_DEBUG_HTTP) {
      console.error(`[distilled] <- ${response.status} ${text.slice(0, 400)}`);
    }
    const status = response.status;
    const headers = response.headers as Record<string, string | undefined>;

    let json: unknown;
    let parsed = false;
    if (text.trim().length > 0) {
      try {
        json = JSON.parse(text);
        parsed = true;
      } catch {
        parsed = false;
      }
    }

    // Non-JSON bodies: an HTTP-level failure surfaces through the status map;
    // a non-JSON "success" is a broken response.
    if (!parsed) {
      if (status >= 400) {
        return yield* matchError(status, text, headers);
      }
      return yield* fail(
        new RailwayParseError({
          body: text,
          cause: "response body is not valid JSON",
        }),
      );
    }

    // GraphQL errors[] (even on HTTP 200) or an HTTP-level failure → typed
    // error.
    const envelope = json as { data?: unknown; errors?: unknown[] } | null;
    const hasGraphQLErrors =
      envelope !== null &&
      typeof envelope === "object" &&
      Array.isArray(envelope.errors) &&
      envelope.errors.length > 0;
    if (hasGraphQLErrors || status >= 400) {
      return yield* matchError(status, json, headers);
    }

    // Success: unwrap `data.<responsePath>` and return it verbatim (member
    // names are GraphQL field names — no wire renames).
    const path = getAnn(outputAst, responsePathSymbol) as string | undefined;
    let payload: unknown =
      envelope !== null && typeof envelope === "object"
        ? envelope.data
        : undefined;
    if (path !== undefined) {
      for (const seg of path.split(".")) {
        payload =
          payload !== null && typeof payload === "object"
            ? (payload as Record<string, unknown>)[seg]
            : undefined;
      }
    }
    return payload === undefined ? null : payload;
  });

/**
 * Railway GraphQL protocol layer.
 */
export const RailwayGraphqlProtocol: Layer.Layer<API.Protocol> = Layer.succeed(
  API.Protocol,
  API.Protocol.of({
    // Erase encode's Credentials requirement (see comment above).
    encode: (args) =>
      encode(args) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
    decode,
  }),
);
