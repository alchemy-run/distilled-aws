/**
 * AwsProtocol — AWS's implementation of `@distilled.cloud/core`'s Protocol
 * seam.
 *
 * Generated operations are plain `API.make(() => ({ input, output, errors,
 * protocol: AwsProtocol, retry: Retry.Retry, operationName }))` calls; this
 * layer supplies everything AWS-specific per request:
 *
 *   encode:  idempotency-token fill → wire-family serializer (awsJson 1.0/1.1,
 *            awsQuery, ec2Query, restJson1, restXml — discovered from the
 *            input schema's protocol trait) → annotation middleware
 *            (checksums, streaming bodies) → endpoint resolution (custom
 *            Endpoint service, compiled Smithy endpoint rules, or the
 *            `https://{service}.{region}.amazonaws.com` fallback) → SigV4
 *            signing with per-request lazy Credentials/Region.
 *
 *   decode:  wire-family deserializer → event-stream parsing → output schema
 *            decode; error responses map wire codes onto the operation's
 *            typed error classes (plus the shared COMMON_ERRORS), stamping
 *            server `retryAfterSeconds` hints as the `retryAfter` Duration
 *            core's default retry policy honors.
 *
 * Per-operation preprocessing (serializer construction, error maps, endpoint
 * rules) is keyed off the operation config's identity, which `API.make`
 * memoizes — so it runs once per operation per process.
 */
import { AwsV4Signer } from "aws4fetch";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import { pipe } from "effect/Function";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";
import * as HttpBody from "effect/unstable/http/HttpBody";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import * as API from "@distilled.cloud/core/api";

import type { Operation } from "./client/operation.ts";
import { makeRequestBuilder } from "./client/request-builder.ts";
import type { Request } from "./client/request.ts";
import { makeResponseParser } from "./client/response-parser.ts";
import * as Credentials from "./credentials.browser.ts";
import * as Endpoint from "./endpoint.ts";
import * as Region from "./region.ts";
import { makeEndpointResolver } from "./rules-engine/endpoint-resolver.ts";
import {
  getAwsApiService,
  getAwsAuthSigv2,
  getAwsAuthSigv4,
} from "./traits.ts";
import { getIdentifier } from "./util/ast.ts";

/**
 * Context (requirements) shared by every generated AWS operation.
 *
 * `Region` is deliberately absent: it is an override read with
 * `Effect.serviceOption` (see `region.ts`), falling back to the environment,
 * so callers who already configured a region for their credentials don't
 * have to state it again.
 */
export type AwsOpContext = Credentials.Credentials | HttpClient.HttpClient;

interface Prepared {
  readonly buildRequest: (input: unknown) => Effect.Effect<Request, any, any>;
  readonly parseResponse: (response: {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: string | ReadableStream<Uint8Array>;
  }) => Effect.Effect<any, any, any>;
  readonly sigv4: { name: string } | undefined;
  /** Legacy SigV2 (SimpleDB only) — signs via body parameters, no header. */
  readonly sigv2: unknown;
  readonly serviceSdkId: string | undefined;
  readonly resolveEndpoint: ReturnType<typeof makeEndpointResolver>;
}

// Keyed by the operation config object, which API.make memoizes per
// operation — one entry per operation per process.
const preparedOps = new WeakMap<API.ProtocolOperationConfig, Prepared>();

const prepare = (config: API.ProtocolOperationConfig): Prepared => {
  const cached = preparedOps.get(config);
  if (cached) return cached;

  // The wire machinery predates the core seam and is typed against the v0
  // Operation shape; the config carries the same information.
  const op: Operation = {
    input: config.input as any,
    output: config.output as any,
    errors: [...(config.errors ?? [])] as any[],
    operationName: config.operationName,
    pagination: config.pagination as Operation["pagination"],
  };
  const inputAst = op.input.ast;
  const serviceSdkId = getAwsApiService(inputAst)?.sdkId;
  const operationName =
    config.operationName ??
    getIdentifier(inputAst)?.replace(/(?:Request|Input|Message)$/, "");

  const prepared: Prepared = {
    buildRequest: makeRequestBuilder(op),
    parseResponse: makeResponseParser(op, {
      service: serviceSdkId,
      operation: operationName,
      // Responses are not schema-validated by default (matching every other
      // distilled SDK): decode still runs for its transformations
      // (timestamps -> Date, sensitive -> Redacted) but a shape mismatch
      // falls back to the raw response instead of failing the call.
      // DISTILLED_AWS_VALIDATE=1 restores hard-failing validation (the seed
      // of a future strict mode).
      validate:
        typeof process !== "undefined" && !!process.env?.DISTILLED_AWS_VALIDATE,
    }),
    sigv4: getAwsAuthSigv4(inputAst),
    sigv2: getAwsAuthSigv2(inputAst),
    serviceSdkId,
    resolveEndpoint: makeEndpointResolver(op),
  };
  preparedOps.set(config, prepared);
  return prepared;
};

// The protocol layer is memoized per process by `API.make` (see
// `OperationConfig.protocol`), so the build must not capture credentials —
// `encode` resolves Credentials/Region/Endpoint from the calling fiber's
// context on every request instead (credentials are lazy: the service holds
// an effect, so refreshes are picked up per call). The requirements and
// error channels are erased at this boundary (Protocol effects are typed
// with no requirements) and reintroduced for callers by the generated
// operation type annotations.
const encode = ({
  input,
  config,
}: {
  readonly input: unknown;
  readonly config: API.ProtocolOperationConfig;
}) =>
  Effect.gen(function* () {
    const {
      buildRequest,
      sigv4,
      sigv2,
      serviceSdkId,
      resolveEndpoint: rulesResolver,
    } = prepare(config);

    yield* Effect.logDebug("Payload", input);

    // Serialize the input (protocol serializer + annotation middleware)
    const request = yield* buildRequest(input);

    yield* Effect.logDebug("Built Request", request);

    const credentials = yield* yield* Credentials.Credentials;
    // The region the credentials authenticated against, unless this scope
    // provides a `Region` override. `Region` is optional — it isn't in any
    // operation's requirements — so it's read with `serviceOption`.
    const regionOverride = yield* Effect.serviceOption(Region.Region);
    const region = Option.isSome(regionOverride)
      ? yield* regionOverride.value
      : credentials.region;
    const serviceName = sigv4?.name ?? "s3";

    // Resolve endpoint and adjust request path if needed
    let endpoint: string;
    let resolvedRequest = request;
    let signingRegion = region; // Default to context region
    let signingServiceName = serviceName; // Default to service name from sigv4 trait
    const customEndpoint = yield* yield* Effect.serviceOption(
      Endpoint.Endpoint,
    ).pipe(Effect.map(Option.getOrElse(() => Effect.undefined)));

    if (customEndpoint) {
      // User provided a custom endpoint - use it directly
      endpoint = customEndpoint;
    } else if (rulesResolver) {
      // Use the rules resolver - it handles endpoint resolution AND path adjustment
      const resolved = yield* rulesResolver({
        input,
        region,
        request,
      });
      endpoint = resolved.endpoint.url;
      resolvedRequest = resolved.request;

      // Extract signing region from endpoint authSchemes if present
      // Global services like IAM return a specific signingRegion (e.g., us-east-1)
      const authSchemes = resolved.endpoint.properties?.authSchemes as
        | Array<{
            name?: string;
            signingName?: string;
            signingRegion?: string;
          }>
        | undefined;
      if (authSchemes?.[0]?.signingRegion) {
        signingRegion = authSchemes[0].signingRegion;
      }
      if (authSchemes?.[0]?.signingName) {
        signingServiceName = authSchemes[0].signingName;
      }
    } else {
      // Fallback to static endpoint
      endpoint = `https://${serviceName}.${region}.amazonaws.com`;
    }

    // Apply the Smithy `smithy.api#endpoint` hostPrefix (e.g. "sync-" for
    // Step Functions StartSyncExecution -> sync-states.{region}). Skipped for
    // custom endpoints, matching official AWS SDK behavior. Labels of the
    // form {memberName} are substituted from the operation input.
    if (config.endpointHostPrefix !== undefined && !customEndpoint) {
      const resolvedPrefix = config.endpointHostPrefix.replace(
        /\{(\w+)\}/g,
        (_, member: string) =>
          String((input as Record<string, unknown>)?.[member] ?? ""),
      );
      // The endpoint rules engine may already have baked the same label into
      // the host (e.g. S3 Control resolves `{AccountId}.s3-control.{region}`
      // from the AccountId context param, and the operations ALSO carry the
      // `{AccountId}.` hostPrefix trait). Only prepend when the resolved
      // endpoint does not already start with the prefix, else the label is
      // applied twice and TLS fails on the doubled host.
      const hostStart = endpoint.indexOf("://") + 3;
      if (!endpoint.startsWith(resolvedPrefix, hostStart)) {
        endpoint = endpoint.replace("://", `://${resolvedPrefix}`);
      }
    }

    // Build full URL with query string
    const queryString = Object.entries(resolvedRequest.query)
      .filter(([_, v]) => v !== undefined)
      .flatMap(([k, v]) => {
        // Handle arrays as repeated query parameters (e.g., tagKeys=A&tagKeys=B)
        if (Array.isArray(v)) {
          return v.map((item) =>
            item
              ? `${encodeURIComponent(k)}=${encodeURIComponent(item)}`
              : encodeURIComponent(k),
          );
        }
        return v
          ? `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
          : encodeURIComponent(k);
      })
      .join("&");

    const fullPath = queryString
      ? `${resolvedRequest.path}?${queryString}`
      : resolvedRequest.path;

    // Legacy Signature Version 2 (SimpleDB is the sole remaining SigV2-only
    // service). The signature is an HMAC-SHA256 over the sorted,
    // RFC3986-encoded form parameters and travels IN the form-encoded body —
    // there is no Authorization header. The classic endpoint rejects SigV4
    // with `AuthFailure: access credentials are missing`.
    if (sigv2) {
      const rfc3986 = (s: string) =>
        encodeURIComponent(s).replace(
          /[!'()*]/g,
          (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase(),
        );
      const pairs: Array<[string, string]> = [];
      const bodyStr =
        typeof resolvedRequest.body === "string" ? resolvedRequest.body : "";
      for (const part of bodyStr.split("&")) {
        if (!part) continue;
        const eq = part.indexOf("=");
        pairs.push([
          decodeURIComponent(eq === -1 ? part : part.slice(0, eq)),
          eq === -1 ? "" : decodeURIComponent(part.slice(eq + 1)),
        ]);
      }
      pairs.push(
        ["AWSAccessKeyId", Redacted.value(credentials.accessKeyId)],
        ["SignatureVersion", "2"],
        ["SignatureMethod", "HmacSHA256"],
        ["Timestamp", new Date().toISOString().replace(/\.\d{3}/, "")],
      );
      if (credentials.sessionToken) {
        pairs.push(["SecurityToken", Redacted.value(credentials.sessionToken)]);
      }
      const canonical = pairs
        .map(([k, v]) => [rfc3986(k), rfc3986(v)] as const)
        .sort(([a, av], [b, bv]) =>
          a < b ? -1 : a > b ? 1 : av < bv ? -1 : av > bv ? 1 : 0,
        )
        .map(([k, v]) => `${k}=${v}`)
        .join("&");
      const requestUrl = new URL(`${endpoint}${fullPath}`);
      const stringToSign = [
        resolvedRequest.method,
        requestUrl.host,
        requestUrl.pathname || "/",
        canonical,
      ].join("\n");
      const signatureBytes = yield* Effect.promise(async () => {
        const key = await crypto.subtle.importKey(
          "raw",
          new TextEncoder().encode(Redacted.value(credentials.secretAccessKey)),
          { name: "HMAC", hash: "SHA-256" },
          false,
          ["sign"],
        );
        return crypto.subtle.sign(
          "HMAC",
          key,
          new TextEncoder().encode(stringToSign),
        );
      });
      const signature = Buffer.from(signatureBytes).toString("base64");
      const signedBody = `${canonical}&Signature=${rfc3986(signature)}`;
      const contentTypeV2 =
        resolvedRequest.headers["Content-Type"] ??
        resolvedRequest.headers["content-type"] ??
        "application/x-www-form-urlencoded";

      return pipe(
        HttpClientRequest.make(
          resolvedRequest.method as "GET" | "POST" | "PUT" | "DELETE",
        )(requestUrl.toString()),
        HttpClientRequest.setHeaders(resolvedRequest.headers),
        HttpClientRequest.setBody(HttpBody.text(signedBody, contentTypeV2)),
      );
    }

    // For streaming bodies (ReadableStream), we can't compute a hash
    // so we use UNSIGNED-PAYLOAD and don't pass the body to the signer
    const isStreamingBody = resolvedRequest.body instanceof ReadableStream;
    // Check if content-sha256 header is already set (e.g., by checksum middleware)
    const hasContentSha256 = Object.keys(resolvedRequest.headers).some(
      (k) => k.toLowerCase() === "x-amz-content-sha256",
    );
    // Check if service provides its own checksum (e.g., EBS x-amz-Checksum header)
    // In this case, the body should not be included in SigV4 signing
    const hasServiceChecksum = Object.keys(resolvedRequest.headers).some(
      (k) => k.toLowerCase() === "x-amz-checksum",
    );
    // Check if there's a body to sign
    const hasBody = resolvedRequest.body !== undefined;
    // Operations with a streaming input payload (smithy `@streaming` blob)
    // sign as UNSIGNED-PAYLOAD even when the caller supplied a buffered
    // value — except for services that reject it and require the real
    // payload hash (they reconstruct the canonical request from the body):
    // Glacier, SageMaker Runtime, AppConfig, API Gateway Management,
    // Bedrock Runtime, IoT Data Plane, IoT Wireless, and Lambda.
    const hasStreamingInput =
      resolvedRequest.hasStreamingInput === true &&
      serviceSdkId !== "Glacier" &&
      serviceSdkId !== "SageMaker Runtime" &&
      serviceSdkId !== "AppConfig" &&
      serviceSdkId !== "ApiGatewayManagementApi" &&
      serviceSdkId !== "Bedrock Runtime" &&
      serviceSdkId !== "IoT Data Plane" &&
      serviceSdkId !== "IoT Wireless" &&
      serviceSdkId !== "Lambda";
    // Use unsigned payload for streaming bodies OR streaming-input
    // operations OR when service provides checksum with body
    const useUnsignedPayload =
      (isStreamingBody ||
        hasStreamingInput ||
        (hasServiceChecksum && hasBody)) &&
      !hasContentSha256;
    let signingHeaders = useUnsignedPayload
      ? {
          ...resolvedRequest.headers,
          "X-Amz-Content-Sha256": "UNSIGNED-PAYLOAD",
        }
      : resolvedRequest.headers;

    // S3 Control rejects UNSIGNED-PAYLOAD on several routes (access point
    // operations fail with `InvalidRequest: "Request body cannot be
    // unsigned"`). aws4fetch injects UNSIGNED-PAYLOAD for any service signing
    // as "s3" when the header is absent, so pre-compute the real payload
    // SHA-256 here (matching the official SDK's applyChecksum behavior).
    // Glacier likewise REQUIRES the x-amz-content-sha256 header on
    // payload-bearing requests (UploadArchive / UploadMultipartPart) — the
    // service reconstructs the canonical request from that header, so
    // omitting it fails with InvalidSignatureException (the official SDK's
    // addChecksumHeaders middleware always sets it).
    if (
      (serviceSdkId === "S3 Control" || serviceSdkId === "Glacier") &&
      !useUnsignedPayload &&
      !hasContentSha256 &&
      !isStreamingBody
    ) {
      const bodyBytes =
        resolvedRequest.body === undefined
          ? new Uint8Array(0)
          : resolvedRequest.body instanceof Uint8Array
            ? resolvedRequest.body
            : new TextEncoder().encode(String(resolvedRequest.body));
      const digest = yield* Effect.promise(() =>
        crypto.subtle.digest(
          "SHA-256",
          // copy into a fresh ArrayBuffer-backed view for the DOM typings
          bodyBytes.slice(),
        ),
      );
      const payloadHash = Array.from(new Uint8Array(digest))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
      signingHeaders = {
        ...signingHeaders,
        "X-Amz-Content-Sha256": payloadHash,
      };
    }

    const signer = new AwsV4Signer({
      method: resolvedRequest.method,
      url: `${endpoint}${fullPath}`,
      headers: signingHeaders,
      // Don't pass body to signer when using unsigned payload
      body: useUnsignedPayload
        ? undefined
        : resolvedRequest.body instanceof Uint8Array
          ? Buffer.from(resolvedRequest.body)
          : resolvedRequest.body,
      accessKeyId: Redacted.value(credentials.accessKeyId),
      secretAccessKey: Redacted.value(credentials.secretAccessKey),
      sessionToken: credentials.sessionToken
        ? Redacted.value(credentials.sessionToken)
        : undefined,
      service: signingServiceName,
      region: signingRegion,
    });
    const signedRequest = yield* Effect.promise(() => signer.sign());

    // Build headers object from signed request
    const signedHeaders: Record<string, string> = {};
    signedRequest.headers.forEach((value, key) => {
      signedHeaders[key] = value;
    });

    // Get content type from signed headers for body constructor
    const contentType = signedHeaders["content-type"];

    // Build HttpBody based on body type
    // We must pass the content type to avoid HttpBody overriding the signed Content-Type header
    let httpBody: HttpBody.HttpBody;
    if (isStreamingBody) {
      // Convert ReadableStream to Effect Stream for HttpClient
      const effectStream = Stream.fromReadableStream({
        evaluate: () => resolvedRequest.body as ReadableStream<Uint8Array>,
        onError: (error) => new Error(String(error)),
      });
      httpBody = HttpBody.stream(effectStream, contentType);
    } else if (resolvedRequest.body === undefined) {
      httpBody = HttpBody.empty;
    } else if (typeof resolvedRequest.body === "string") {
      httpBody = HttpBody.text(resolvedRequest.body, contentType);
    } else if (resolvedRequest.body instanceof Uint8Array) {
      httpBody = HttpBody.uint8Array(resolvedRequest.body, contentType);
    } else {
      httpBody = HttpBody.empty;
    }

    // Build HttpClientRequest
    // Note: setBody must come after setHeaders because setBody adds content-type/content-length
    // from the HttpBody, which should match our signed headers
    return pipe(
      HttpClientRequest.make(
        resolvedRequest.method as
          | "GET"
          | "POST"
          | "PUT"
          | "DELETE"
          | "PATCH"
          | "HEAD"
          | "OPTIONS",
      )(signedRequest.url),
      HttpClientRequest.setHeaders(signedHeaders),
      HttpClientRequest.setBody(httpBody),
    );
  });

/**
 * Stamp a server-provided `retryAfterSeconds` hint (modeled on several AWS
 * throttling errors) as the `retryAfter` Duration that core's default retry
 * policy honors with precedence over its backoff.
 */
const stampRetryAfter = (error: unknown): void => {
  if (typeof error !== "object" || error === null) return;
  const e = error as Record<string, unknown>;
  if (e.retryAfter !== undefined) return;
  const seconds = Number(e.retryAfterSeconds ?? e.RetryAfterSeconds ?? NaN);
  if (Number.isFinite(seconds) && seconds >= 0) {
    e.retryAfter = Duration.seconds(seconds);
  }
};

const decode = ({
  response,
  config,
}: {
  readonly response: HttpClientResponse.HttpClientResponse;
  readonly config: API.ProtocolOperationConfig;
}) =>
  Effect.gen(function* () {
    const { parseResponse } = prepare(config);

    yield* Effect.logDebug("Raw Response Status", response.status);

    const responseHeaders = response.headers as Record<string, string>;

    // Create response body stream. HEAD requests never have a body, and some
    // responses have no body (204, etc.) — Effect's HttpClientResponse.stream
    // raises on empty bodies, so detect those up front.
    const contentLength = responseHeaders["content-length"];
    const isEmptyBody =
      response.request.method === "HEAD" ||
      contentLength === "0" ||
      response.status === 204;
    const responseBody = isEmptyBody
      ? new ReadableStream<Uint8Array>({ start: (c) => c.close() })
      : yield* Stream.toReadableStreamEffect(response.stream);

    // Parse the response: success → protocol deserialization + schema
    // decoding (+ event streams); error → typed error matching.
    const parsed = yield* parseResponse({
      status: response.status,
      statusText: "OK",
      headers: responseHeaders,
      body: responseBody,
    }).pipe(
      Effect.tapError((error) => {
        stampRetryAfter(error);
        return Effect.void;
      }),
    );

    yield* Effect.logDebug("Parsed Response", parsed);

    return parsed;
  });

/**
 * The Protocol layer every generated AWS operation references. Failure and
 * requirement channels are erased at this boundary (see the note on
 * `encode`); the generated operation types reintroduce them.
 */
export const AwsProtocol: Layer.Layer<API.Protocol> = Layer.succeed(
  API.Protocol,
  API.Protocol.of({
    encode: (args) =>
      encode(args) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
    decode: (args) => decode(args) as Effect.Effect<unknown>,
  }),
);
