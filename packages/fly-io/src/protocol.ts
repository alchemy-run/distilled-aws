/**
 * Fly.io protocols — Machines REST, UI-EX REST (MPG), GraphQL add-ons, and
 * Sprites REST.
 *
 * Machines (`FlyIoProtocol`) is a plain bearer-token JSON API at
 * `api.machines.dev/v1`. MPG (`FlyApiProtocol`) is the same token against
 * `https://api.fly.io`. GraphQL add-ons (`FlyGraphqlProtocol`) POST
 * `{ query, operationName, variables }` to `https://api.fly.io/graphql`.
 *
 * Sprites (`SpritesProtocol`) also resolve `FLY_API_TOKEN` (same
 * {@link Credentials} as Machines). Sprite CRUD rejects a Fly macaroon as
 * Bearer, so the protocol mints a Sprites bearer once:
 *
 *   POST https://api.sprites.dev/v1/organizations/{org}/tokens
 *   Authorization: FlyV1 {FLY_API_TOKEN}
 *
 * Org slug comes from Machines `GET /tokens/current` (GraphQL fallback).
 * The minted token is cached process-wide, then sent as
 * `Authorization: Bearer` on sprite ops. There is no `SPRITES_TOKEN`.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import type * as AST from "effect/SchemaAST";
import * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import * as API from "@distilled.cloud/core/api";
import {
  makeRestProtocol,
  unwrapRedactedDeep,
  wrapSensitive,
} from "@distilled.cloud/core/protocol-rest";
import {
  buildRequest,
  getAnn,
  mapKeys,
  matchTypedError,
} from "@distilled.cloud/core/protocol-http";
import {
  HTTP_STATUS_MAP,
  InternalServerError,
  type ConfigError,
} from "@distilled.cloud/core/errors";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import {
  Credentials,
  DEFAULT_FLY_API_BASE_URL,
  DEFAULT_SPRITES_API_BASE_URL,
  type Config,
} from "./credentials.ts";
import {
  ConfigError as FlyConfigError,
  FlyIoParseError,
  CreateExtensionTosAgreementNotAuthorized,
  SpritesNotEnabled,
  UnknownFlyIoError,
  type DefaultErrors,
} from "./errors.ts";
import {
  graphqlOpSymbol,
  type GraphQLOpTrait,
  httpSymbol,
  type HttpTrait,
  responsePathSymbol,
} from "./traits.ts";

/**
 * Error channel shared by every generated Fly.io operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * FlyIoOpError, FlyIoOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type FlyIoOpError =
  | DefaultErrors
  | ConfigError
  | CreateExtensionTosAgreementNotAuthorized
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by Machines / MPG / GraphQL operations. */
export type FlyIoOpContext = Credentials | HttpClient.HttpClient;

/**
 * Sprites operations resolve {@link Credentials} (`FLY_API_TOKEN`) and mint
 * a Sprites bearer. {@link SpritesNotEnabled} surfaces from that mint.
 */
export type SpritesOpError = FlyIoOpError | SpritesNotEnabled;
export type SpritesOpContext = FlyIoOpContext;

const flyErrorEnvelope = (body: unknown) => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const errors = b.errors as Record<string, unknown> | undefined;
  const detail =
    errors && typeof errors.detail === "string" ? errors.detail : undefined;
  return {
    message:
      typeof b.error === "string"
        ? b.error
        : typeof b.message === "string"
          ? b.message
          : detail,
  };
};

/** Sprites prefers `message` when the body carries both `error` (code) and `message`. */
const spritesErrorEnvelope = (body: unknown) => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const message =
    typeof b.message === "string"
      ? b.message
      : typeof b.error === "string"
        ? b.error
        : undefined;
  const code =
    typeof b.error === "string" && typeof b.message === "string"
      ? b.error
      : undefined;
  return { message, code };
};

const resolveFlyCreds = Effect.gen(function* () {
  const resolve = yield* Credentials;
  return yield* resolve;
});

/**
 * Per-call signal that this Machines request is the Fly Machine itself
 * (unix socket `/.fly/api`). Org tokens stay on {@link Credentials} for
 * GetSecret in the same process; this service only changes headers:
 * omit `Authorization`, send `Connection: close`.
 */
export class MachineIdentity extends Context.Service<MachineIdentity, true>()(
  "FlyIoMachineIdentity",
) {}

const FlyIoProtocolRest: Layer.Layer<API.Protocol> = makeRestProtocol<Config>({
  credentials: resolveFlyCreds,
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
  }),
  errorEnvelope: flyErrorEnvelope,
  unknownError: ({ message, body }) => new UnknownFlyIoError({ message, body }),
});

export const FlyIoProtocol: Layer.Layer<API.Protocol> = Layer.effect(
  API.Protocol,
  Effect.gen(function* () {
    const rest = yield* API.Protocol;
    return API.Protocol.of({
      encode: (args) =>
        Effect.gen(function* () {
          const request = yield* rest.encode(args);
          const machine = yield* Effect.serviceOption(MachineIdentity);
          if (Option.isNone(machine)) return request;
          return request.pipe(
            HttpClientRequest.removeHeader("authorization"),
            HttpClientRequest.setHeader("connection", "close"),
          );
        }),
      decode: rest.decode,
    });
  }),
).pipe(Layer.provide(FlyIoProtocolRest));

/** MPG UI-EX REST at `https://api.fly.io` with the Machines bearer token. */
export const FlyApiProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    credentials: resolveFlyCreds,
    baseUrl: () => DEFAULT_FLY_API_BASE_URL,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
    }),
    errorEnvelope: flyErrorEnvelope,
    unknownError: ({ message, body }) =>
      new UnknownFlyIoError({ message, body }),
  });

const parseMaybeNdjson = (body: unknown): unknown => {
  if (typeof body !== "string") return body;
  const lines = body
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  if (lines.length === 0) return body;
  try {
    return lines.map((l) => JSON.parse(l) as unknown);
  } catch {
    return body;
  }
};

/**
 * HTTP exec (`POST /sprites/{name}/exec`) returns `application/octet-stream`
 * frames: 1-byte stream id + payload. Ids: 1 stdout, 2 stderr, 3 exit
 * (payload is a single exit-code byte). HTTP may coalesce chunks; for a
 * complete body the exit frame is the last two bytes when present.
 */
const parseSpritesExecFrames = (
  bytes: Uint8Array,
): { stdout: string; stderr: string; exit_code: number } | undefined => {
  if (bytes.length === 0) return undefined;
  const first = bytes[0]!;
  if (first > 3) return undefined;
  let end = bytes.length;
  let exit_code = 0;
  if (end >= 2 && bytes[end - 2] === 3) {
    exit_code = bytes[end - 1]!;
    end -= 2;
  }
  let stdout = "";
  let stderr = "";
  if (end > 0) {
    const decoder = new TextDecoder();
    const id = bytes[0]!;
    const payload = decoder.decode(bytes.subarray(1, end));
    if (id === 2) stderr = payload;
    else stdout = payload;
  }
  return { stdout, stderr, exit_code };
};

const fail = (e: unknown): Effect.Effect<never> =>
  Effect.fail(e) as Effect.Effect<never>;

/** Strip a leading `FlyV1` / `Bearer` scheme so we can re-prefix `FlyV1`. */
const stripFlyAuthScheme = (token: string): string => {
  const trimmed = token.trim();
  const space = trimmed.indexOf(" ");
  if (space === -1) return trimmed;
  const scheme = trimmed.slice(0, space).toLowerCase();
  if (scheme === "flyv1" || scheme === "bearer") {
    return trimmed.slice(space + 1).trim();
  }
  return trimmed;
};

const isMintOp = (http: HttpTrait | undefined): boolean =>
  http !== undefined &&
  http.method === "POST" &&
  /\/organizations\/\{[^}]+}\/tokens$/.test(http.uri);

const SPRITES_NOT_ENABLED = /sprites not enabled/i;

const readResponseText = (
  response: HttpClientResponse.HttpClientResponse,
): Effect.Effect<string> =>
  response.text.pipe(
    Effect.orDie,
    Effect.map((text) => text ?? ""),
  );

const parseJson = (text: string): unknown => {
  if (text.trim().length === 0) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
};

const haystackOf = (body: unknown, text: string): string => {
  const parts: string[] = [text];
  if (body !== null && typeof body === "object") {
    const b = body as Record<string, unknown>;
    if (typeof b.message === "string") parts.push(b.message);
    if (typeof b.error === "string") parts.push(b.error);
  }
  return parts.join(" ");
};

const errorEnv = (body: unknown): { message?: string; code?: string } =>
  spritesErrorEnvelope(body) ?? flyErrorEnvelope(body) ?? {};

const failHttp = (
  status: number,
  body: unknown,
  text: string,
  headers: Record<string, string | undefined>,
): Effect.Effect<never> => {
  const env = errorEnv(body);
  const message =
    env.message ?? (text.trim().length > 0 ? text.trim() : `HTTP ${status}`);
  if (status === 401 && SPRITES_NOT_ENABLED.test(haystackOf(body, message))) {
    return fail(new SpritesNotEnabled({ message }));
  }
  const StatusClass = (HTTP_STATUS_MAP as Record<number, unknown>)[status] as
    | (new (args: {
        message: string;
        retryAfter?: ReturnType<typeof parseRetryAfterForStatus>;
      }) => unknown)
    | undefined;
  if (StatusClass && status >= 400) {
    return fail(
      new StatusClass({
        message,
        retryAfter: parseRetryAfterForStatus(status, headers),
      }),
    );
  }
  return fail(new UnknownFlyIoError({ message, body: body ?? text }));
};

const orgFromTokensCurrent = (body: unknown): string | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const tokens = (body as { tokens?: unknown }).tokens;
  if (!Array.isArray(tokens) || tokens.length === 0) return undefined;
  const first = tokens[0] as { org_slug?: unknown; organization?: unknown };
  if (typeof first.org_slug === "string" && first.org_slug.length > 0) {
    return first.org_slug;
  }
  if (typeof first.organization === "string" && first.organization.length > 0) {
    return first.organization;
  }
  return undefined;
};

const orgFromGraphql = (body: unknown): string | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const data = (body as { data?: unknown }).data;
  if (data === null || typeof data !== "object") return undefined;
  const viewer = (data as { viewer?: unknown }).viewer;
  const root = viewer !== null && typeof viewer === "object" ? viewer : data;
  const personal = (root as { personalOrganization?: { slug?: unknown } })
    .personalOrganization;
  if (typeof personal?.slug === "string" && personal.slug.length > 0) {
    return personal.slug;
  }
  const nodes = (root as { organizations?: { nodes?: unknown } }).organizations
    ?.nodes;
  if (Array.isArray(nodes)) {
    for (const node of nodes) {
      if (
        node !== null &&
        typeof node === "object" &&
        typeof (node as { slug?: unknown }).slug === "string" &&
        (node as { slug: string }).slug.length > 0
      ) {
        return (node as { slug: string }).slug;
      }
    }
  }
  return undefined;
};

const discoverOrgSlug = (fly: Config) =>
  Effect.gen(function* () {
    const http = yield* HttpClient.HttpClient;
    const token = Redacted.value(fly.apiKey);
    const machinesRoot = fly.apiBaseUrl.replace(/\/+$/, "");
    const currentReq = HttpClientRequest.make("GET")(
      `${machinesRoot}/tokens/current`,
    ).pipe(
      HttpClientRequest.setHeaders({
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      }),
    );
    const currentRes = yield* http.execute(currentReq);
    const currentText = yield* readResponseText(currentRes);
    const currentJson = parseJson(currentText);
    if (currentRes.status < 400) {
      const slug = orgFromTokensCurrent(currentJson);
      if (slug !== undefined) return slug;
    }

    const gqlReq = HttpClientRequest.make("POST")(
      `${DEFAULT_FLY_API_BASE_URL}/graphql`,
    ).pipe(
      HttpClientRequest.setHeaders({
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      }),
      HttpClientRequest.bodyJsonUnsafe({
        query:
          "{ viewer { personalOrganization { slug } organizations { nodes { slug } } } }",
      }),
    );
    const gqlRes = yield* http.execute(gqlReq);
    const gqlText = yield* readResponseText(gqlRes);
    const gqlJson = parseJson(gqlText);
    if (gqlRes.status < 400) {
      const slug = orgFromGraphql(gqlJson);
      if (slug !== undefined) return slug;
    }

    return yield* new FlyConfigError({
      message:
        "Could not discover a Fly organization slug from /tokens/current or GraphQL",
    });
  });

const mintOnce = (fly: Config) =>
  Effect.gen(function* () {
    const http = yield* HttpClient.HttpClient;
    const orgSlug = yield* discoverOrgSlug(fly);
    const macaroon = stripFlyAuthScheme(Redacted.value(fly.apiKey));
    const request = HttpClientRequest.make("POST")(
      `${DEFAULT_SPRITES_API_BASE_URL}/organizations/${encodeURIComponent(orgSlug)}/tokens`,
    ).pipe(
      HttpClientRequest.setHeaders({
        Authorization: `FlyV1 ${macaroon}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      HttpClientRequest.bodyJsonUnsafe({
        description: "Alchemy Sprites token",
      }),
    );
    const response = yield* http.execute(request);
    const text = yield* readResponseText(response);
    const json = parseJson(text);
    const headers = response.headers as Record<string, string | undefined>;
    if (response.status >= 400) {
      return yield* failHttp(response.status, json, text, headers);
    }
    const token =
      json !== null && typeof json === "object"
        ? (json as { token?: unknown }).token
        : undefined;
    if (typeof token !== "string" || token.length === 0) {
      return yield* fail(
        new FlyIoParseError({
          body: json ?? text,
          cause: "mint response missing token",
        }),
      );
    }
    // Cache the raw string — Effect.cached must not hold a Redacted (the
    // registry entry is not restored from a memoized Exit).
    return token;
  });

const mintedTokens = new Map<string, string>();
const mintInFlight = new Map<string, ReturnType<typeof mintOnce>>();

/** Mint (and process-wide cache) a Sprites bearer from `FLY_API_TOKEN`. */
const mintSpritesToken = (fly: Config) =>
  Effect.gen(function* () {
    const key = Redacted.value(fly.apiKey);
    const hit = mintedTokens.get(key);
    if (hit !== undefined) return hit;
    const pending = mintInFlight.get(key);
    if (pending !== undefined) return yield* pending;
    const run = mintOnce(fly).pipe(
      Effect.tap((token) =>
        Effect.sync(() => {
          mintedTokens.set(key, token);
          mintInFlight.delete(key);
        }),
      ),
      Effect.tapError(() => Effect.sync(() => mintInFlight.delete(key))),
    );
    mintInFlight.set(key, run);
    return yield* run;
  });

const encodeSpritesRequest = ({
  input,
  inputAst,
}: {
  readonly input: unknown;
  readonly inputAst: AST.AST;
}) =>
  Effect.gen(function* () {
    const fly = yield* resolveFlyCreds;
    const http = getAnn(inputAst, httpSymbol) as HttpTrait | undefined;
    const mint = isMintOp(http);
    let authorization: string;
    if (mint) {
      authorization = `FlyV1 ${stripFlyAuthScheme(Redacted.value(fly.apiKey))}`;
    } else {
      const token = yield* mintSpritesToken(fly);
      authorization = `Bearer ${token}`;
    }
    return buildRequest({
      input: unwrapRedactedDeep(input),
      inputAst,
      baseUrl: DEFAULT_SPRITES_API_BASE_URL,
      headers: {
        Authorization: authorization,
        Accept: "application/json",
      },
    });
  });

const decodeSpritesResponse = ({
  response,
  outputAst,
  errors: errorClasses,
}: {
  readonly response: HttpClientResponse.HttpClientResponse;
  readonly outputAst: AST.AST;
  readonly errors: ReadonlyArray<unknown>;
}) =>
  Effect.gen(function* () {
    const buffer = yield* response.arrayBuffer.pipe(
      Effect.map((bytes) => new Uint8Array(bytes)),
    );
    const text = new TextDecoder().decode(buffer);
    const execFrames = parseSpritesExecFrames(buffer);
    let json: unknown;
    let nonJson = false;
    if (execFrames === undefined && text.trim().length > 0) {
      try {
        json = JSON.parse(text);
      } catch {
        nonJson = true;
      }
    }
    const status = response.status;
    const headers = response.headers as Record<string, string | undefined>;

    if (status >= 400) {
      const env = nonJson ? {} : errorEnv(json);
      const message =
        env.message ??
        (nonJson && text.trim() ? text.trim() : `HTTP ${status}`);
      if (
        SPRITES_NOT_ENABLED.test(haystackOf(nonJson ? text : json, message))
      ) {
        return yield* fail(new SpritesNotEnabled({ message }));
      }
      const typed = matchTypedError(errorClasses, status, [
        {
          code: typeof env.code === "number" ? env.code : undefined,
          message,
        },
      ]);
      if (typed !== undefined) return yield* fail(typed);

      const StatusErrorClass = (HTTP_STATUS_MAP as Record<number, unknown>)[
        status
      ] as
        | (new (args: {
            message: string;
            retryAfter?: ReturnType<typeof parseRetryAfterForStatus>;
          }) => unknown)
        | undefined;
      if (StatusErrorClass) {
        return yield* fail(
          new StatusErrorClass({
            message,
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
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
        new UnknownFlyIoError({
          message,
          body: nonJson ? text : json,
        }),
      );
    }

    if (execFrames !== undefined) {
      return wrapSensitive(outputAst, mapKeys(outputAst, execFrames, "decode"));
    }

    let body: unknown = nonJson ? text : (json ?? {});
    body = parseMaybeNdjson(body);
    return wrapSensitive(outputAst, mapKeys(outputAst, body, "decode"));
  });

/** Sprites REST at `https://api.sprites.dev/v1`, minted from `FLY_API_TOKEN`. */
export const SpritesProtocol: Layer.Layer<API.Protocol> = Layer.succeed(
  API.Protocol,
  API.Protocol.of({
    encode: (args) =>
      encodeSpritesRequest(
        args,
      ) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
    decode: (args) => decodeSpritesResponse(args) as Effect.Effect<unknown>,
  }),
);

// =============================================================================
// GraphQL add-ons (Tigris, Redis) — POST https://api.fly.io/graphql
// =============================================================================

const GraphQLError = Schema.Struct({
  message: Schema.String,
  path: Schema.optional(Schema.Array(Schema.Unknown)),
  extensions: Schema.optional(
    Schema.Struct({
      code: Schema.optional(Schema.String),
    }),
  ),
});

const GraphQLEnvelope = Schema.Struct({
  data: Schema.optional(Schema.NullOr(Schema.Unknown)),
  errors: Schema.optional(Schema.Array(GraphQLError)),
});

const decodeEnvelope = Schema.decodeUnknownOption(GraphQLEnvelope);

const matchGraphqlError = (
  status: number,
  errorBody: unknown,
  headers: Record<string, string | undefined> | undefined,
  errorClasses: ReadonlyArray<unknown>,
): Effect.Effect<never> => {
  const envelope = decodeEnvelope(errorBody);
  if (envelope._tag === "Some" && envelope.value.errors?.length) {
    const first = envelope.value.errors[0]!;
    const message = first.message;
    const typed = matchTypedError(errorClasses, status, [{ message }]);
    if (typed !== undefined) return fail(typed);
    if (
      /not authorized to access this createextensiontosagreement/i.test(message)
    ) {
      return fail(new CreateExtensionTosAgreementNotAuthorized({ message }));
    }
    const StatusClass = (HTTP_STATUS_MAP as Record<number, unknown>)[status] as
      | (new (args: {
          message: string;
          retryAfter?: ReturnType<typeof parseRetryAfterForStatus>;
        }) => unknown)
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
      new UnknownFlyIoError({
        code: first.extensions?.code,
        message,
        body: errorBody,
      }),
    );
  }

  const StatusClass = (HTTP_STATUS_MAP as Record<number, unknown>)[status] as
    | (new (args: {
        message: string;
        retryAfter?: ReturnType<typeof parseRetryAfterForStatus>;
      }) => unknown)
    | undefined;
  if (StatusClass && status >= 400) {
    return fail(
      new StatusClass({
        message: `HTTP ${status}`,
        retryAfter: parseRetryAfterForStatus(status, headers),
      }),
    );
  }
  return fail(new UnknownFlyIoError({ body: errorBody }));
};

const graphqlEncode = ({
  input,
  inputAst,
}: {
  readonly input: unknown;
  readonly inputAst: AST.AST;
}) =>
  Effect.gen(function* () {
    const resolveCredentials = yield* Credentials;
    const creds = yield* resolveCredentials as Effect.Effect<Config>;
    const op = getAnn(inputAst, graphqlOpSymbol) as GraphQLOpTrait | undefined;
    if (!op) {
      throw new Error("operation input is missing the GraphQLOp() trait");
    }
    const http = getAnn(inputAst, httpSymbol) as HttpTrait | undefined;
    const variables: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(
      (input ?? {}) as Record<string, unknown>,
    )) {
      if (v !== undefined) variables[k] = v;
    }
    const url = `${DEFAULT_FLY_API_BASE_URL}${http?.uri ?? "/graphql"}`;
    return HttpClientRequest.make("POST")(url).pipe(
      HttpClientRequest.setHeaders({
        Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
        Accept: "application/json",
      }),
      HttpClientRequest.bodyJsonUnsafe({
        query: op.query,
        operationName: op.operationName,
        variables,
      }),
    );
  });

const graphqlDecode = ({
  response,
  outputAst,
  errors,
}: {
  readonly response: HttpClientResponse.HttpClientResponse;
  readonly outputAst: AST.AST;
  readonly errors: ReadonlyArray<unknown>;
}) =>
  Effect.gen(function* () {
    const text = (yield* response.text.pipe(Effect.orDie)) ?? "";
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

    if (!parsed) {
      if (status >= 400) {
        return yield* matchGraphqlError(status, text, headers, errors);
      }
      return yield* fail(
        new FlyIoParseError({
          body: text,
          cause: "response body is not valid JSON",
        }),
      );
    }

    const envelope = json as { data?: unknown; errors?: unknown[] } | null;
    const hasGraphQLErrors =
      envelope !== null &&
      typeof envelope === "object" &&
      Array.isArray(envelope.errors) &&
      envelope.errors.length > 0;
    if (hasGraphQLErrors || status >= 400) {
      return yield* matchGraphqlError(status, json, headers, errors);
    }

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

export const FlyGraphqlProtocol: Layer.Layer<API.Protocol> = Layer.succeed(
  API.Protocol,
  API.Protocol.of({
    encode: (args) =>
      graphqlEncode(args) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
    decode: graphqlDecode,
  }),
);
