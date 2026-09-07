/**
 * CoinbaseProtocol — hand-written.
 *
 * Speaks the Coinbase CDP JSON protocol. The generic request/response
 * machinery (trait-driven request building, recursive wire-name mapping)
 * lives in `@distilled.cloud/core/protocol-http`; this module supplies what
 * is Coinbase's own:
 *
 * ## Authentication
 *
 * The Coinbase CDP API uses per-request JWT bearer tokens. The JWT is signed
 * with your CDP API Key Secret (ES256 or Ed25519) and includes:
 *
 * - `sub`: Your CDP API Key ID
 * - `iss`: "cdp"
 * - `aud`: ["cdp_service"]
 * - `exp`: Current time + 120 seconds
 * - `uri`: "METHOD host/path"
 *
 * Some sensitive wallet operations additionally document an `X-Wallet-Auth`
 * header signed with your Wallet Secret (`Config.walletSecret`); like the
 * distilled v0 client, this module does not generate that header.
 *
 * ## Error Handling
 *
 * Coinbase CDP errors have the shape:
 * ```json
 * {
 *   "errorType": "invalid_request",
 *   "errorMessage": "Invalid request.",
 *   "correlationId": "41deb8d59a9dc9a7-IAD",
 *   "errorLink": "https://docs.cdp.coinbase.com/api-reference/v2/errors#invalid-request"
 * }
 * ```
 *
 * Errors are handled globally (no per-operation error lists), dispatched
 * first by `errorType`, then by HTTP status code.
 */
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import type * as AST from "effect/SchemaAST";
import * as crypto from "node:crypto";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import * as API from "@distilled.cloud/core/api";
import { buildRequest, mapKeys } from "@distilled.cloud/core/protocol-http";
import {
  unwrapRedactedDeep,
  wrapSensitive,
} from "@distilled.cloud/core/protocol-rest";
import {
  type ConfigError,
  HTTP_STATUS_MAP,
} from "@distilled.cloud/core/errors";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import type { Config } from "./credentials.ts";
import { Credentials } from "./credentials.ts";
import {
  COINBASE_HTTP_STATUS_MAP,
  type DefaultErrors,
  ERROR_TYPE_MAP,
  STANDARD_ERROR_TYPE_MAP,
  UnknownCoinbaseError,
} from "./errors.ts";

/**
 * Error channel shared by every generated Coinbase operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * CoinbaseOpError, CoinbaseOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type CoinbaseOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Coinbase operation. */
export type CoinbaseOpContext = Credentials | HttpClient.HttpClient;

// Bridge: Protocol.decode is typed as Effect<unknown> (no error channel), but
// Coinbase failures are real typed errors that the operation's explicit
// `CoinbaseOpError` annotation re-surfaces. Fail with the instance and erase
// the error type here.
const fail = (e: unknown): Effect.Effect<never> =>
  Effect.fail(e) as Effect.Effect<never>;

// ============================================================================
// JWT generation for Coinbase CDP API authentication
// ============================================================================

/**
 * Base64url-encode a buffer.
 */
const base64url = (buf: Buffer | Uint8Array): string =>
  Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

/**
 * Generate a random hex nonce.
 */
const randomNonce = (): string => crypto.randomBytes(16).toString("hex");

/**
 * Detect key type and return the appropriate signing algorithm and key object.
 */
const resolveSigningKey = (
  apiKeySecret: string,
): { algorithm: string; jwsAlg: string; key: crypto.KeyObject } => {
  // Try EC (ES256) first — PEM format
  if (apiKeySecret.includes("-----BEGIN")) {
    return {
      algorithm: "ES256",
      jwsAlg: "ES256",
      key: crypto.createPrivateKey(apiKeySecret),
    };
  }

  // Ed25519 — base64 encoded 64-byte key (32 seed + 32 public)
  const keyBytes = Buffer.from(apiKeySecret, "base64");
  if (keyBytes.length === 64) {
    // Extract the 32-byte seed (private key)
    const seed = keyBytes.subarray(0, 32);
    // Import as Ed25519 private key using PKCS8 DER wrapping
    // Ed25519 PKCS8 prefix: 302e020100300506032b657004220420
    const pkcs8Prefix = Buffer.from("302e020100300506032b657004220420", "hex");
    const pkcs8Der = Buffer.concat([pkcs8Prefix, seed]);
    return {
      algorithm: "EdDSA",
      jwsAlg: "EdDSA",
      key: crypto.createPrivateKey({
        key: pkcs8Der,
        format: "der",
        type: "pkcs8",
      }),
    };
  }

  throw new Error(
    "Unsupported CDP API Key Secret format. Expected EC PEM or Ed25519 base64.",
  );
};

/**
 * Generate a JWT bearer token for Coinbase CDP API authentication.
 *
 * The JWT includes:
 * - header: { alg, kid, typ: "JWT", nonce }
 * - payload: { sub, iss: "cdp", aud, nbf, exp, uri }
 */
const generateJwt = (
  apiKeyId: string,
  apiKeySecret: string,
  method: string,
  uri: string,
): string => {
  const { jwsAlg, key } = resolveSigningKey(apiKeySecret);

  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: jwsAlg,
    kid: apiKeyId,
    typ: "JWT",
    nonce: randomNonce(),
  };
  const payload = {
    sub: apiKeyId,
    iss: "cdp",
    aud: ["cdp_service"],
    nbf: now,
    exp: now + 120,
    uri: `${method} ${uri}`,
  };

  const headerB64 = base64url(Buffer.from(JSON.stringify(header)));
  const payloadB64 = base64url(Buffer.from(JSON.stringify(payload)));
  const signingInput = `${headerB64}.${payloadB64}`;

  let signature: Buffer;
  if (jwsAlg === "ES256") {
    // ES256 uses SHA-256 with ECDSA, needs IEEE P1363 format (not DER)
    const sign = crypto.createSign("SHA256");
    sign.update(signingInput);
    const derSig = sign.sign(key);
    // Convert DER signature to IEEE P1363 (raw r||s) format
    signature = derToP1363(derSig, 32);
  } else {
    // EdDSA (Ed25519) uses sign directly
    signature = Buffer.from(crypto.sign(null, Buffer.from(signingInput), key));
  }

  return `${signingInput}.${base64url(signature)}`;
};

/**
 * Convert a DER-encoded ECDSA signature to IEEE P1363 (raw r||s) format.
 * JWS requires P1363 format for ES256.
 */
const derToP1363 = (derSig: Buffer, componentLength: number): Buffer => {
  // DER format: 30 <len> 02 <rLen> <r> 02 <sLen> <s>
  let offset = 2; // skip 30 <len>
  if (derSig[1]! & 0x80) offset += derSig[1]! & 0x7f;

  // Read r
  offset++; // skip 02
  const rLen = derSig[offset++]!;
  const r = derSig.subarray(offset, offset + rLen);
  offset += rLen;

  // Read s
  offset++; // skip 02
  const sLen = derSig[offset++]!;
  const s = derSig.subarray(offset, offset + sLen);

  // Pad or trim to componentLength
  const result = Buffer.alloc(componentLength * 2);
  const rPadded =
    r.length > componentLength ? r.subarray(r.length - componentLength) : r;
  const sPadded =
    s.length > componentLength ? s.subarray(s.length - componentLength) : s;
  rPadded.copy(result, componentLength - rPadded.length);
  sPadded.copy(result, componentLength * 2 - sPadded.length);
  return result;
};

// ============================================================================
// Error response parsing
// ============================================================================

/**
 * Coinbase CDP API Error Response Schema.
 *
 * All Coinbase CDP errors have the same envelope:
 * { errorType, errorMessage, correlationId?, errorLink? }
 */
const CoinbaseErrorResponse = Schema.Struct({
  errorType: Schema.String,
  errorMessage: Schema.String,
  correlationId: Schema.optional(Schema.String),
  errorLink: Schema.optional(Schema.String),
});

/**
 * Match a Coinbase CDP API error response to the appropriate typed error
 * class. Ported from the distilled v0 client's `matchError`.
 *
 * Dispatches errors by:
 * 1. The `errorType` field for Coinbase-specific errors (e.g., "already_exists", "policy_violation")
 * 2. The `errorType` field for standard errors mapped to core classes (e.g., "not_found" → NotFound)
 * 3. Standard HTTP status codes mapped from core (400, 401, 403, 404, etc.)
 * 4. Coinbase-specific HTTP status codes (402)
 * 5. Falls back to UnknownCoinbaseError for unrecognized errors
 *
 * Error bodies carrying `isValid`/`success` keys are policy-validation
 * results delivered with an error status — treated as success values
 * (`Effect.succeed`) like the v0 client did.
 */
const matchError = (
  status: number,
  errorBody: unknown,
  headers?: Record<string, string | undefined>,
): Effect.Effect<unknown> => {
  if (
    errorBody &&
    typeof errorBody === "object" &&
    ("isValid" in errorBody || "success" in errorBody)
  ) {
    return Effect.succeed(errorBody);
  }

  try {
    const parsed = Schema.decodeUnknownSync(CoinbaseErrorResponse)(errorBody);
    const errorProps = {
      errorType: parsed.errorType,
      errorMessage: parsed.errorMessage,
      correlationId: parsed.correlationId,
      errorLink: parsed.errorLink,
    };

    // 1. Match by Coinbase-specific error type first
    const TypedErrorClass = ERROR_TYPE_MAP[parsed.errorType];
    if (TypedErrorClass) {
      return fail(new TypedErrorClass(errorProps));
    }

    // 2. Match standard error types to core HTTP error classes
    // Maps error types like "not_found", "forbidden", "unauthorized",
    // "invalid_request", "rate_limit_exceeded", "internal_server_error",
    // "bad_gateway", "service_unavailable" to core HTTP error classes.
    const StandardErrorClass = STANDARD_ERROR_TYPE_MAP[parsed.errorType];
    if (StandardErrorClass) {
      return fail(
        new StandardErrorClass({
          message: parsed.errorMessage ?? "",
          retryAfter: parseRetryAfterForStatus(status, headers),
        }),
      );
    }

    // 3. Fall back to HTTP status code mapping from core
    const CoreErrorClass = (HTTP_STATUS_MAP as any)[status];
    if (CoreErrorClass) {
      return fail(
        new CoreErrorClass({
          message: parsed.errorMessage ?? "",
          retryAfter: parseRetryAfterForStatus(status, headers),
        }),
      );
    }

    // 4. Coinbase-specific HTTP status codes (402)
    const CoinbaseErrorClass = (COINBASE_HTTP_STATUS_MAP as any)[status];
    if (CoinbaseErrorClass) {
      return fail(new CoinbaseErrorClass(errorProps));
    }

    // 5. Fall back to unknown error
    return fail(
      new UnknownCoinbaseError({
        ...errorProps,
        body: errorBody,
      }),
    );
  } catch {
    return fail(new UnknownCoinbaseError({ body: errorBody }));
  }
};

// ============================================================================
// Protocol
// ============================================================================

// The protocol layer is memoized per process by `API.make`, so the build must
// not capture credentials — `encode` resolves Credentials from the calling
// fiber's context on every request instead. Like the error channel above,
// the requirement is erased at this boundary (Protocol effects are typed with
// no requirements) and reintroduced for callers by the generated
// `CoinbaseOpContext` annotations.
const encode = ({
  input,
  inputAst,
}: {
  readonly input: unknown;
  readonly inputAst: AST.AST;
}) =>
  Effect.gen(function* () {
    // The Credentials service holds an effect — resolving it here (per
    // request) picks up rotations. Its error channel is erased at this
    // boundary; CoinbaseOpError reintroduces it for callers.
    const resolveCredentials = yield* Credentials;
    const creds =
      (yield* resolveCredentials as Effect.Effect<Config>) as Config;

    // Sensitive input members accept string | Redacted<string>; the wire
    // wants the raw string.
    const request = buildRequest({
      input: unwrapRedactedDeep(input),
      inputAst,
      baseUrl: creds.apiBaseUrl,
    });

    // JWT `uri` claim: "METHOD host/path" — label-substituted path, no query
    // string (matches the v0 client: baseUrl.host + baseUrl.pathname +
    // parts.path).
    const url = new URL(request.url);
    const jwt = generateJwt(
      creds.apiKeyId,
      Redacted.value(creds.apiKeySecret),
      request.method,
      `${url.host}${url.pathname}`,
    );
    return request.pipe(
      HttpClientRequest.setHeader("Authorization", `Bearer ${jwt}`),
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
    let json: unknown;
    if (text.trim().length > 0) {
      try {
        json = JSON.parse(text);
      } catch {
        json = text;
      }
    }
    const status = response.status;
    const headers = response.headers as Record<string, string | undefined>;

    if (status >= 400) {
      const result = yield* matchError(status, json, headers);
      // isValid/success bodies are success values delivered with an error
      // status — map them onto the output schema like a normal response.
      return wrapSensitive(outputAst, mapKeys(outputAst, result, "decode"));
    }

    // No envelope: the response body IS the payload, mapped onto the output
    // schema (wire names → TS names), with members marked T.SensitiveValue
    // delivered as Redacted.
    const body = json === undefined ? {} : json;
    return wrapSensitive(outputAst, mapKeys(outputAst, body, "decode"));
  });

/**
 * Coinbase CDP protocol layer.
 *
 * Uses JWT bearer token authentication signed per request with your CDP API
 * Key Secret.
 */
export const CoinbaseProtocol: Layer.Layer<API.Protocol> = Layer.succeed(
  API.Protocol,
  API.Protocol.of({
    // Erase encode's Credentials requirement (see comment above).
    encode: (args) =>
      encode(args) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
    decode,
  }),
);
