/**
 * StripeProtocol — hand-written.
 *
 * Speaks Stripe's REST protocol. The generic trait helpers live in
 * `@distilled.cloud/core/protocol-http`; this module supplies what is
 * Stripe's own (ported from the distilled v0 stripe client):
 *
 *   request:  credentials → `Authorization: Bearer <apiKey>` + API base URL;
 *             per-call {@link StripeRequestOptions} (resolved from the
 *             calling fiber via {@link RequestOptions}) → Idempotency-Key /
 *             Stripe-Account / Stripe-Context / Stripe-Version headers;
 *             GET inputs flatten body-bound members into the query string
 *             with Stripe bracket notation (`created[gte]`, `expand[]`);
 *             non-GET bodies encode as `application/x-www-form-urlencoded`
 *             with Stripe deepObject bracket expansion (`shipping[address]
 *             [city]=SF`, `expand[0]=data`) when the operation's `T.Http`
 *             trait says `contentType: "form-urlencoded"` (every /v1 op),
 *             as JSON otherwise (the /v2 ops), and as multipart form-data
 *             for `contentType: "multipart"` (POST /v1/files)
 *
 *   response: 2xx JSON is the payload (no envelope) → wire→TS key mapping →
 *             Redacted wrapping of sensitive members; failures parse the
 *             `{ error: { type, code, message, … } }` envelope and dispatch
 *             by `error.type` first (card_error → CardError,
 *             idempotency_error → IdempotencyError, invalid_request_error →
 *             InvalidRequestError, api_error → ApiError), then the
 *             Stripe-specific status map (402 → PaymentError, 424 →
 *             ExternalDependencyFailed), then core's HTTP status map (with
 *             retryAfter hints), then UnknownStripeError.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import type * as AST from "effect/SchemaAST";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import * as HttpBody from "effect/unstable/http/HttpBody";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import * as API from "@distilled.cloud/core/api";
import {
  buildRequest,
  getAnn,
  getProps,
  hasPropAnn,
  mapKeys,
  nameOf,
} from "@distilled.cloud/core/protocol-http";
import {
  unwrapRedactedDeep,
  wrapSensitive,
} from "@distilled.cloud/core/protocol-rest";
import {
  ConfigError,
  HTTP_STATUS_MAP,
  InternalServerError,
  type DefaultErrors as CoreDefaultErrors,
  BadRequest,
  Conflict,
  Forbidden,
  Locked,
  NotFound,
  UnprocessableEntity,
} from "@distilled.cloud/core/errors";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import { Credentials, type Config } from "./credentials.ts";
import {
  ApiError,
  CardError,
  ExternalDependencyFailed,
  IdempotencyError,
  InvalidRequestError,
  PaymentError,
  STRIPE_HTTP_STATUS_MAP,
  StripeParseError,
  UnknownStripeError,
} from "./errors.ts";
import {
  bodySymbol,
  headerSymbol,
  httpSymbol,
  labelSymbol,
  querySymbol,
  type HttpTrait,
} from "./traits.ts";

// =============================================================================
// Per-call request options (v0's StripeRequestOptions, fiber-context style)
// =============================================================================

type StripeConnectRequestOptions =
  | {
      readonly stripeAccount?: string | undefined;
      readonly stripeContext?: never;
    }
  | {
      readonly stripeAccount?: never;
      readonly stripeContext?: string | undefined;
    };

export type StripeRequestOptions = {
  readonly idempotencyKey?: string | undefined;
  readonly apiVersion?: string | undefined;
} & StripeConnectRequestOptions;

/**
 * Per-call request options service. distilled v0 passed these as a second
 * call argument; v1 operations take only their input, so options travel on
 * the calling fiber's context instead — see {@link withRequestOptions}.
 */
export class RequestOptions extends Context.Service<
  RequestOptions,
  StripeRequestOptions
>()("StripeRequestOptions") {}

/**
 * Provide {@link StripeRequestOptions} to every Stripe API call below it.
 *
 * @example
 * ```ts
 * yield* PostCharges({ amount: 2000, currency: "usd" }).pipe(
 *   Stripe.withRequestOptions({ idempotencyKey: "ch-create-1" }),
 * );
 * ```
 */
export const withRequestOptions = (options: StripeRequestOptions) =>
  Effect.provide(Layer.succeed(RequestOptions, options));

const stripeRequestHeaders = (
  options: StripeRequestOptions | undefined,
): Record<string, string> => {
  const headers: Record<string, string> = {};
  if (options?.idempotencyKey !== undefined) {
    headers["Idempotency-Key"] = options.idempotencyKey;
  }
  if (options?.stripeAccount !== undefined) {
    headers["Stripe-Account"] = options.stripeAccount;
  }
  if (options?.stripeContext !== undefined) {
    headers["Stripe-Context"] = options.stripeContext;
  }
  if (options?.apiVersion !== undefined) {
    headers["Stripe-Version"] = options.apiVersion;
  }
  return headers;
};

// =============================================================================
// Operation error/context types
// =============================================================================

/**
 * Error channel shared by every generated Stripe operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * StripeOpError, StripeOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type StripeOpError =
  | CardError
  | IdempotencyError
  | InvalidRequestError
  | ApiError
  | PaymentError
  | ExternalDependencyFailed
  | UnknownStripeError
  | StripeParseError
  | BadRequest
  | Forbidden
  | NotFound
  | Conflict
  | UnprocessableEntity
  | Locked
  | CoreDefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Stripe operation. */
export type StripeOpContext = Credentials | HttpClient.HttpClient;

// Bridge: Protocol.decode is typed as Effect<unknown> (no error channel), but
// Stripe failures are real typed errors that an operation re-surfaces via its
// `errors: [...]` list / StripeOpError annotation. Fail with the instance and
// erase the error type here; the generated annotations reintroduce it.
const fail = (e: unknown): Effect.Effect<never> =>
  Effect.fail(e) as Effect.Effect<never>;

// =============================================================================
// Stripe query / form encoding (ported from distilled v0)
// =============================================================================

const BODYLESS = new Set(["GET", "HEAD"]);

const appendQueryValue = (
  query: URLSearchParams,
  key: string,
  value: unknown,
): void => {
  if (value === undefined || value === null) return;
  query.append(
    key,
    typeof value === "boolean" ? (value ? "true" : "false") : String(value),
  );
};

/**
 * Stripe GET-query bracket expansion (v0's `appendStripeQuery`): arrays as
 * repeated `key[]` entries, nested objects as `key[nested]`, recursively.
 */
const appendStripeQuery = (
  query: URLSearchParams,
  key: string,
  value: unknown,
): void => {
  if (value === undefined || value === null) return;
  if (Array.isArray(value)) {
    for (const item of value) appendQueryValue(query, `${key}[]`, item);
    return;
  }
  if (typeof value === "object" && !(value instanceof Date)) {
    for (const [nestedKey, nestedValue] of Object.entries(
      value as Record<string, unknown>,
    )) {
      appendStripeQuery(query, `${key}[${nestedKey}]`, nestedValue);
    }
    return;
  }
  appendQueryValue(query, key, value);
};

/**
 * Recursively flatten a nested object into Stripe-style bracket notation
 * for application/x-www-form-urlencoded encoding (v0's `flattenToFormPairs`).
 *
 * Examples:
 *   { amount: 2000 } -> "amount=2000"
 *   { shipping: { address: { city: "SF" } } } -> "shipping[address][city]=SF"
 *   { expand: ["data"] } -> "expand[0]=data"
 *   { metadata: { key: "val" } } -> "metadata[key]=val"
 */
const flattenToFormPairs = (
  obj: Record<string, unknown>,
  prefix: string = "",
): Array<[string, string]> => {
  const pairs: Array<[string, string]> = [];

  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue;

    const fullKey = prefix ? `${prefix}[${key}]` : key;

    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        if (
          item !== null &&
          item !== undefined &&
          typeof item === "object" &&
          !Array.isArray(item)
        ) {
          pairs.push(
            ...flattenToFormPairs(
              item as Record<string, unknown>,
              `${fullKey}[${i}]`,
            ),
          );
        } else if (item !== undefined && item !== null) {
          pairs.push([`${fullKey}[${i}]`, String(item)]);
        }
      }
    } else if (typeof value === "object") {
      pairs.push(
        ...flattenToFormPairs(value as Record<string, unknown>, fullKey),
      );
    } else if (typeof value === "boolean") {
      pairs.push([fullKey, value ? "true" : "false"]);
    } else {
      pairs.push([fullKey, String(value)]);
    }
  }

  return pairs;
};

/** Build the urlencoded body from a nested object (Stripe deepObject style). */
const buildFormUrlEncoded = (body: Record<string, unknown>): string => {
  const params = new URLSearchParams();
  for (const [key, value] of flattenToFormPairs(body)) {
    params.append(key, value);
  }
  return params.toString();
};

// =============================================================================
// Request building
// =============================================================================

// The protocol layer is memoized per process by `API.make`, so the build
// must not capture credentials — `encode` resolves Credentials (and the
// per-call RequestOptions) from the calling fiber's context on every
// request. The requirement is erased at this boundary and reintroduced for
// callers by the generated `StripeOpContext` annotations.
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
    const options = Option.getOrUndefined(
      yield* Effect.serviceOption(RequestOptions),
    );

    const http = getAnn(inputAst, httpSymbol) as HttpTrait | undefined;
    if (!http) {
      throw new Error("operation input is missing the Http() trait");
    }

    const baseHeaders: Record<string, string> = {
      Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
      ...stripeRequestHeaders(options),
      Accept: "application/json",
    };

    // Multipart (POST /v1/files): core's buildRequest speaks multipart
    // form-data (file parts + JSON-encoded object parts) — same behavior as
    // v0's buildFormData.
    if (http.contentType === "multipart") {
      return buildRequest({
        input: unwrapRedactedDeep(input),
        inputAst,
        baseUrl: creds.apiBaseUrl,
        headers: baseHeaders,
      });
    }

    const inputObj = (unwrapRedactedDeep(input) ?? {}) as Record<
      string,
      unknown
    >;
    const headers: Record<string, string> = { ...baseHeaders };
    const body: Record<string, unknown> = {};
    const query = new URLSearchParams();
    let uri = http.uri;
    const consumed = new Set<string>();

    for (const prop of getProps(inputAst)) {
      const key = String(prop.name);
      consumed.add(key);
      const value = inputObj[key];
      if (value === undefined) continue;

      if (hasPropAnn(prop, labelSymbol)) {
        const token = nameOf(prop, labelSymbol);
        uri = uri.replace(`{${token}}`, encodeURIComponent(String(value)));
      } else if (hasPropAnn(prop, headerSymbol)) {
        headers[nameOf(prop, headerSymbol).toLowerCase()] = String(value);
      } else if (hasPropAnn(prop, querySymbol)) {
        // Stripe bracket expansion, not dotted params (`created[gte]=1`).
        appendStripeQuery(query, nameOf(prop, querySymbol), value);
      } else {
        body[nameOf(prop, bodySymbol)] = mapKeys(prop.type, value, "encode");
      }
    }

    // Input keys the schema doesn't know pass through as body fields — the
    // generated schemas can lag the real API, and silently dropping them
    // would break working callers.
    for (const [key, value] of Object.entries(inputObj)) {
      if (consumed.has(key) || value === undefined) continue;
      body[key] = value;
    }

    // v0's normalizeStripeGetQuery: GET inputs carry no body — flatten the
    // body-bound members into the query string with bracket notation.
    if (BODYLESS.has(http.method)) {
      for (const [key, value] of Object.entries(body)) {
        appendStripeQuery(query, key, value);
      }
    }

    const qs = query.toString();
    const url = `${creds.apiBaseUrl}${uri}${qs ? `?${qs}` : ""}`;
    if (process.env.DISTILLED_DEBUG_HTTP) {
      console.error(
        `[distilled] ${http.method} ${url}` +
          (Object.keys(body).length && !BODYLESS.has(http.method)
            ? ` body=${JSON.stringify(body).slice(0, 400)}`
            : ""),
      );
    }

    let request = HttpClientRequest.make(http.method)(url).pipe(
      HttpClientRequest.setHeaders(headers),
    );
    if (!BODYLESS.has(http.method) && Object.keys(body).length > 0) {
      request =
        http.contentType === "form-urlencoded"
          ? request.pipe(
              HttpClientRequest.setBody(
                HttpBody.text(
                  buildFormUrlEncoded(body),
                  "application/x-www-form-urlencoded",
                ),
              ),
            )
          : // The /v2/* operations are plain JSON.
            request.pipe(HttpClientRequest.bodyJsonUnsafe(body));
    }
    return request;
  });

// =============================================================================
// Response decoding / error matching (ported from v0's matchError)
// =============================================================================

const str = (v: unknown): string | undefined =>
  typeof v === "string" ? v : undefined;

// Structural views of the status maps for numeric lookup (the const objects'
// per-status class types don't unify without widening the constructor).
const stripeStatusMap: Readonly<
  Record<number, (new (args: any) => unknown) | undefined>
> = STRIPE_HTTP_STATUS_MAP;
const coreStatusMap: Readonly<
  Record<number, (new (args: any) => unknown) | undefined>
> = HTTP_STATUS_MAP;

/**
 * Match a Stripe API error response to the appropriate error class.
 *
 * Stripe dispatches errors by:
 * 1. The `error.type` field (card_error, idempotency_error,
 *    invalid_request_error, api_error)
 * 2. HTTP status code (402/424 Stripe-specific, then the core status map)
 */
const matchStripeError = (
  status: number,
  errorBody: unknown,
  headers: Record<string, string | undefined>,
): unknown => {
  const envelope =
    errorBody !== null && typeof errorBody === "object"
      ? (errorBody as Record<string, unknown>).error
      : undefined;
  const err =
    envelope !== null && typeof envelope === "object"
      ? (envelope as Record<string, unknown>)
      : undefined;
  // v0 parity: an unparseable envelope (no `error.type` string) is an
  // UnknownStripeError carrying the raw body.
  if (!err || typeof err.type !== "string") {
    return new UnknownStripeError({ body: errorBody });
  }

  const common = {
    message: str(err.message),
    code: str(err.code),
    doc_url: str(err.doc_url),
    request_log_url: str(err.request_log_url),
  };

  // Match by Stripe error type first for richer error info.
  switch (err.type) {
    case "card_error":
      return new CardError({
        ...common,
        decline_code: str(err.decline_code),
        charge: str(err.charge),
        param: str(err.param),
        advice_code: str(err.advice_code),
        network_advice_code: str(err.network_advice_code),
        network_decline_code: str(err.network_decline_code),
        payment_method_type: str(err.payment_method_type),
      });
    case "idempotency_error":
      return new IdempotencyError(common);
    case "invalid_request_error":
      return new InvalidRequestError({ ...common, param: str(err.param) });
    case "api_error":
      return new ApiError({ ...common, param: str(err.param) });
  }

  // Fall back to Stripe-specific HTTP status codes (402, 424).
  const StripeErrorClass = stripeStatusMap[status];
  if (StripeErrorClass) {
    return new StripeErrorClass({
      message: common.message,
      code: common.code,
      ...(str(err.decline_code) !== undefined
        ? { decline_code: str(err.decline_code) }
        : {}),
      ...(str(err.charge) !== undefined ? { charge: str(err.charge) } : {}),
      ...(str(err.param) !== undefined ? { param: str(err.param) } : {}),
      ...(common.doc_url !== undefined ? { doc_url: common.doc_url } : {}),
      ...(common.request_log_url !== undefined
        ? { request_log_url: common.request_log_url }
        : {}),
    });
  }

  // Fall back to standard HTTP status errors (400, 401, 403, 404, …).
  const CoreErrorClass = coreStatusMap[status];
  if (CoreErrorClass) {
    return new CoreErrorClass({
      message: common.message ?? "",
      retryAfter: parseRetryAfterForStatus(status, headers),
    } as any);
  }

  // Unmapped 5xx (e.g. proxy statuses) → retryable server error (v1
  // convention; v0 fell through to UnknownStripeError here).
  if (status >= 500) {
    return new InternalServerError({
      message: common.message ?? `HTTP ${status}`,
      retryAfter: parseRetryAfterForStatus(status, headers),
    });
  }

  return new UnknownStripeError({
    type: str(err.type),
    code: common.code,
    message: common.message,
    param: str(err.param),
    body: errorBody,
  });
};

const decode = ({
  response,
  outputAst,
}: {
  readonly response: HttpClientResponse.HttpClientResponse;
  readonly outputAst: AST.AST;
  readonly errors: ReadonlyArray<unknown>;
}) =>
  Effect.gen(function* () {
    // Read as text and parse tolerantly — error pages can be non-JSON.
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
      return yield* fail(
        matchStripeError(status, nonJson ? text : json, headers),
      );
    }

    // 2xx: the response body IS the payload (no envelope). Wire→TS key
    // mapping is schema-driven; sensitive members come back Redacted.
    const body: unknown = nonJson ? text : (json ?? {});
    return wrapSensitive(outputAst, mapKeys(outputAst, body, "decode"));
  });

export const StripeProtocol: Layer.Layer<API.Protocol> = Layer.succeed(
  API.Protocol,
  API.Protocol.of({
    // Erase encode's Credentials requirement (see comment above).
    encode: (args) =>
      encode(args) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
    decode,
  }),
);
