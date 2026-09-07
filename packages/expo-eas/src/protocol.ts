/**
 * ExpoGraphqlProtocol — hand-written.
 *
 * Speaks the EAS GraphQL protocol: every operation is
 * `POST ${apiBaseUrl}/graphql` with a `{ query, operationName, variables }`
 * envelope (api.expo.dev or staging-api.expo.dev), answered by a
 * `{ data, errors }` envelope.
 *
 *   request:  credentials → `Authorization: Bearer <EXPO_TOKEN>` + base URL;
 *             the operation's input IS the GraphQL variables object; the
 *             baked document travels on the input schema via `T.GraphQLOp`.
 *
 *   response: errors come back two ways (ported from distilled v0's
 *             `matchError`):
 *             1. HTTP 200 with `{ errors: [...] }` (GraphQL validation /
 *                business errors). Each error carries `message` and
 *                `extensions.errorCode` — matched against the typed
 *                `EAS_ERROR_CODE_MAP`, then the HTTP status map, then
 *                `UnknownEasError`.
 *             2. HTTP status >= 400 (network/auth/proxy errors) — body
 *                usually `{ message }` or a plain `{ errors: [...] }`
 *                envelope; mapped via the status map with retry-after
 *                parsing.
 *             On success the value of `data.<responsePath>` (see
 *             `T.ResponsePath`) is returned verbatim.
 */
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
  EAS_ERROR_CODE_MAP,
  EasParseError,
  UnknownEasError,
} from "./errors.ts";
import {
  graphqlOpSymbol,
  type GraphQLOpTrait,
  httpSymbol,
  type HttpTrait,
  responsePathSymbol,
} from "./traits.ts";

/**
 * Error channel shared by every generated EAS operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O, ExpoEasOpError,
 * ExpoEasOpContext>` explicitly so the compiler never infers these back out
 * of the schema generics.
 *
 * Errors are client-wide (no per-operation unions), mirroring distilled v0:
 * the GraphQL `errors[]` envelope is matched against `EAS_ERROR_CODE_MAP`
 * regardless of which operation was called.
 */
export type ExpoEasOpError = DefaultErrors | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated EAS operation. */
export type ExpoEasOpContext = Credentials | HttpClient.HttpClient;

// Bridge: Protocol.decode is typed as Effect<unknown> (no error channel), but
// EAS failures are real typed errors that the operation's explicit
// `ExpoEasOpError` annotation re-surfaces. Fail with the instance and erase
// the error type here.
const fail = (e: unknown): Effect.Effect<never> =>
  Effect.fail(e) as Effect.Effect<never>;

// ============================================================================
// Error envelope parsing (ported from distilled v0's client.ts)
// ============================================================================

/**
 * Single GraphQL error in the `errors[]` array of a response envelope.
 * Mirrors the shape produced by graphql-js and used by api.expo.dev.
 */
const GraphQLError = Schema.Struct({
  message: Schema.String,
  path: Schema.optional(Schema.Array(Schema.Unknown)),
  locations: Schema.optional(Schema.Array(Schema.Unknown)),
  extensions: Schema.optional(
    Schema.Struct({
      errorCode: Schema.optional(Schema.String),
      code: Schema.optional(Schema.String),
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

type StatusClass = new (args: {
  message: string;
  retryAfter?: ReturnType<typeof parseRetryAfterForStatus>;
}) => unknown;

/**
 * Match an EAS error response (GraphQL envelope or HTTP-level body) to the
 * appropriate error class. Ported from distilled v0's `matchError`:
 * typed `extensions.errorCode` classes first, then the shared HTTP status
 * map, then `UnknownEasError`.
 */
const matchError = (
  status: number,
  errorBody: unknown,
  headers?: Record<string, string | undefined>,
): Effect.Effect<never> => {
  // Try the GraphQL envelope first — works for both HTTP 200 with errors[]
  // and HTTP 400 responses returned by the GraphQL gateway.
  const envelope = decodeEnvelope(errorBody);
  if (envelope._tag === "Some" && envelope.value.errors?.length) {
    const first = envelope.value.errors[0]!;
    const code = first.extensions?.errorCode ?? first.extensions?.code;
    const message = first.message;

    if (code) {
      const TypedClass = EAS_ERROR_CODE_MAP[code];
      if (TypedClass) {
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

    return fail(
      new UnknownEasError({
        code,
        message,
        body: errorBody,
      }),
    );
  }

  // Plain REST-ish error body
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
      new UnknownEasError({
        code: rest.value.code,
        message: rest.value.message,
        body: errorBody,
      }),
    );
  }

  return fail(new UnknownEasError({ body: errorBody }));
};

// ============================================================================
// Protocol
// ============================================================================

// The protocol layer is memoized per process by `API.make`, so the build must
// not capture credentials — `encode` resolves Credentials from the calling
// fiber's context on every request instead. The requirement is erased at this
// boundary (Protocol effects are typed with no requirements) and reintroduced
// for callers by the generated `ExpoEasOpContext` annotations.
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

    const url = `${creds.apiBaseUrl}${http?.uri ?? "/graphql"}`;
    if (process.env.DISTILLED_DEBUG_HTTP) {
      console.error(
        `[distilled] POST ${url} op=${op.operationName} variables=${JSON.stringify(variables).slice(0, 400)}`,
      );
    }
    return HttpClientRequest.make("POST")(url).pipe(
      HttpClientRequest.setHeaders({
        Authorization: `Bearer ${Redacted.value(creds.accessToken)}`,
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

    // Non-JSON bodies: an HTTP-level failure surfaces through the status
    // map; a non-JSON "success" is a broken response.
    if (!parsed) {
      if (status >= 400) {
        return yield* matchError(status, text, headers);
      }
      return yield* fail(
        new EasParseError({
          body: text,
          cause: "response body is not valid JSON",
        }),
      );
    }

    // GraphQL errors[] (even on HTTP 200) or HTTP-level failure → typed
    // error via the ported v0 matcher.
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
 * EAS GraphQL protocol layer.
 */
export const ExpoGraphqlProtocol: Layer.Layer<API.Protocol> = Layer.succeed(
  API.Protocol,
  API.Protocol.of({
    // Erase encode's Credentials requirement (see comment above).
    encode: (args) =>
      encode(args) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
    decode,
  }),
);
