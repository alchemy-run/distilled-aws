/**
 * AWS restJson1 Protocol Implementation
 *
 * https://smithy.io/2.0/aws/protocols/aws-restjson1-protocol.html
 *
 * Key characteristics:
 * - JSON payloads with HTTP binding traits
 * - jsonName trait for custom property names
 * - Default timestamp format is epoch-seconds
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import * as AST from "effect/SchemaAST";
import type * as Stream from "effect/Stream";
import type { Operation } from "../client/operation.ts";
import type { Protocol, ProtocolHandler } from "../client/protocol.ts";
import type { Request } from "../client/request.ts";
import type { Response } from "../client/response.ts";
import {
  applyApiGatewayCustomizations,
  isApiGateway,
} from "../customizations/api-gateway.ts";
import {
  applyGlacierCustomizations,
  isGlacier,
} from "../customizations/glacier.ts";
import { ParseError } from "../errors.ts";
import { parseEventStreamToUnion } from "../eventstream/parser.ts";
import {
  serializeInputEventStream,
  serializeInputEventStreamWithPayloads,
  type InputEvent,
} from "../eventstream/serializer.ts";
import {
  getAwsApiService,
  getEventPayloadMap,
  getEventSchema,
  getHttpHeader,
  getOutputEventPayloadMap,
  getHttpPrefixHeaders,
  getHttpQuery,
  getPropAnnotations,
  getServiceVersion,
  hasHttpLabel,
  hasHttpPayload,
  hasHttpQueryParams,
  isInputEventStream,
  isOutputEventStream,
  isStreamingType,
  type StreamingInputBody,
} from "../traits.ts";
import {
  getEncodedPropertySignatures,
  getIdentifier,
  isBooleanAST,
  isNumberAST,
} from "../util/ast.ts";
import {
  extractJsonErrorCode,
  extractJsonErrorData,
  sanitizeErrorCode,
} from "../util/error.ts";
import { extractStaticQueryParams } from "../util/query-params.ts";
import { applyHttpTrait, bindInputToRequest } from "../util/serialize-input.ts";
import {
  convertStreamingInput,
  isEffectStream,
  readableToEffectStream,
  readStreamAsBytes,
  readStreamAsText,
} from "../util/stream.ts";

export const restJson1Protocol: Protocol = (
  operation: Operation,
): ProtocolHandler => {
  const inputSchema = operation.input;
  const outputSchema = operation.output;
  const inputAst = inputSchema.ast;
  const outputAst = outputSchema.ast;

  // Pre-compute encoder (done once at init)
  const encodeInput = Schema.encodeEffect(inputSchema);

  // Check for service-specific customizations (done once at init)
  const serviceInfo = getAwsApiService(inputAst);
  const isApiGatewayService = isApiGateway(serviceInfo?.sdkId);
  const isGlacierService = isGlacier(serviceInfo?.sdkId);
  const serviceVersion = getServiceVersion(inputAst);

  // Pre-classify output properties by their HTTP binding (done once at init)
  type HeaderProp = {
    name: string;
    header: string;
    headerLower: string;
    isNumber: boolean;
    isBoolean: boolean;
  };
  type PrefixHeaderProp = { name: string; prefix: string };
  type PayloadProp = {
    name: string;
    isStreaming: boolean;
    isRaw: boolean;
    isBlob: boolean;
    isEventStream: boolean;
    eventSchema?: Schema.Schema<unknown>;
    /** event type → `eventPayload` member name (raw-bytes events). */
    eventPayloadMap?: Record<string, string>;
  };

  const headerProps: HeaderProp[] = [];
  const prefixHeaderProps: PrefixHeaderProp[] = [];
  let outputPayloadProp: PayloadProp | undefined;
  let responseCodePropName: string | undefined;

  for (const prop of getEncodedPropertySignatures(outputAst)) {
    const name = String(prop.name);
    const header = getHttpHeader(prop);
    const prefix = getHttpPrefixHeaders(prop);
    const annotations = getPropAnnotations(prop);

    if (annotations.responseCode) {
      // Property bound to HTTP response status code
      responseCodePropName = name;
    } else if (header) {
      headerProps.push({
        name,
        header,
        headerLower: header.toLowerCase(),
        isNumber: isNumberAST(prop.type),
        isBoolean: isBooleanAST(prop.type),
      });
    } else if (prefix) {
      prefixHeaderProps.push({ name, prefix: prefix.toLowerCase() });
    } else if (hasHttpPayload(prop)) {
      const isEventStream = isOutputEventStream(prop.type);
      const eventSchema = isEventStream ? getEventSchema(prop.type) : undefined;
      outputPayloadProp = {
        name,
        isStreaming: isStreamingType(prop.type),
        isRaw: isRawPayload(prop.type),
        isBlob: isBlobPayload(prop.type),
        isEventStream,
        eventSchema,
        eventPayloadMap: eventSchema
          ? getOutputEventPayloadMap(eventSchema)
          : undefined,
      };
    } else if (isStreamingType(prop.type)) {
      // Streaming members (including event streams) implicitly become the payload
      const isEventStream = isOutputEventStream(prop.type);
      const eventSchema = isEventStream ? getEventSchema(prop.type) : undefined;
      outputPayloadProp = {
        name,
        isStreaming: true,
        isRaw: false,
        isBlob: false,
        isEventStream,
        eventSchema,
        eventPayloadMap: eventSchema
          ? getOutputEventPayloadMap(eventSchema)
          : undefined,
      };
    }
  }

  // restJson1 sends an explicit empty JSON document (`{}`) whenever the
  // input shape has at least one member bound to the body but none were
  // set (matching the AWS SDK v3 / botocore behavior — see
  // AwsRestJsonProtocol.serializeRequest + ProtocolLib.resolveRestContentType
  // in aws-sdk-js-v3). Several services reject an absent body outright:
  // resource-explorer-2's ListIndexes/ListViews return
  // `ValidationException: Invalid request body` when called with no body.
  // Unit inputs (zero members) and inputs whose members are all bound to
  // labels/query/headers keep an empty body.
  const hasBodyCapableInputMembers = getEncodedPropertySignatures(
    inputAst,
  ).some(
    (prop) =>
      getHttpHeader(prop) === undefined &&
      !hasHttpLabel(prop) &&
      getHttpQuery(prop) === undefined &&
      !hasHttpQueryParams(prop) &&
      getHttpPrefixHeaders(prop) === undefined &&
      !hasHttpPayload(prop),
  );

  return {
    serializeRequest: Effect.fn(function* (input: unknown) {
      const encoded = yield* encodeInput(input).pipe(
        Effect.mapError((err) => new ParseError({ message: err.message })),
      );

      // Start without Content-Type - we'll set it based on the body type
      // unless user explicitly provides one via httpHeader binding
      let request: Request = {
        method: "POST",
        path: "/",
        query: {},
        headers: {},
      };

      applyHttpTrait(inputAst, request);
      const { payloadValue, payloadAst, bodyMembers, hasBodyMembers } =
        bindInputToRequest(
          inputAst,
          encoded as Record<string, unknown>,
          request,
        );
      extractStaticQueryParams(request);

      // Track if user set Content-Type explicitly via httpHeader binding
      const userSetContentType = request.headers["Content-Type"] !== undefined;

      // Serialize body
      if (payloadValue !== undefined && payloadAst !== undefined) {
        // Check for input event stream - only when the schema explicitly marks it as an event stream
        // (not for regular streaming blobs like S3 putObject or EBS putSnapshotBlock)
        const isInputEventStreamPayload =
          isInputEventStream(payloadAst) && isEffectStream(payloadValue);

        if (isInputEventStreamPayload) {
          // Input event stream - serialize each event to wire format
          const eventPayloadMap = getEventPayloadMap(payloadAst);
          if (eventPayloadMap && Object.keys(eventPayloadMap).length > 0) {
            request.body = serializeInputEventStreamWithPayloads(
              payloadValue as Stream.Stream<InputEvent, unknown>,
              eventPayloadMap,
            );
          } else {
            request.body = serializeInputEventStream(
              payloadValue as Stream.Stream<InputEvent, unknown>,
            );
          }
          // Set content type for event streams (always override)
          request.headers["Content-Type"] =
            "application/vnd.amazon.eventstream";
        } else if (isStreamingType(payloadAst)) {
          request.body = convertStreamingInput(
            payloadValue as StreamingInputBody,
          );
          // Streaming-input operations are signed UNSIGNED-PAYLOAD (see
          // Request.hasStreamingInput) — some services (Lex Runtime V2)
          // reject payload-hash signatures on these routes.
          request.hasStreamingInput = true;
          // Default to octet-stream for streaming payloads, unless user set explicitly
          if (!userSetContentType) {
            request.headers["Content-Type"] = "application/octet-stream";
          }
        } else if (isRawPayload(payloadAst)) {
          request.body = payloadValue as string;
          // Default to JSON for raw payloads unless user set explicitly
          if (!userSetContentType) {
            request.headers["Content-Type"] = "application/json";
          }
        } else {
          request.body = JSON.stringify(payloadValue);
          // Default to JSON for structured payloads
          if (!userSetContentType) {
            request.headers["Content-Type"] = "application/json";
          }
        }
      } else if (hasBodyMembers) {
        request.body = JSON.stringify(bodyMembers);
        // Default to JSON for body members
        if (!userSetContentType) {
          request.headers["Content-Type"] = "application/json";
        }
      } else {
        if (hasBodyCapableInputMembers) {
          // Body-capable members exist but none were set: send an explicit
          // empty JSON document, matching AWS SDK v3 / botocore.
          request.body = "{}";
        }
        // No body members set - default JSON content type for consistency
        if (!userSetContentType) {
          request.headers["Content-Type"] = "application/json";
        }
      }

      // Apply API Gateway customizations
      if (isApiGatewayService) {
        request = applyApiGatewayCustomizations(request);
      }

      // Apply Glacier customizations
      if (isGlacierService && serviceVersion) {
        request = applyGlacierCustomizations(request, serviceVersion);
      }

      return request;
    }),

    deserializeResponse: Effect.fn(function* (response: Response) {
      const result: Record<string, unknown> = {};

      // Extract HTTP response status code if bound to a property
      if (responseCodePropName) {
        result[responseCodePropName] = response.status;
      }

      // Extract header-bound properties using pre-computed metadata
      for (const hp of headerProps) {
        const v =
          response.headers[hp.headerLower] ?? response.headers[hp.header];
        if (v !== undefined) {
          // Convert string header values to appropriate types
          result[hp.name] = hp.isNumber
            ? Number(v)
            : hp.isBoolean
              ? v === "true"
              : v;
        }
      }

      // Extract prefix header properties
      for (const php of prefixHeaderProps) {
        const prefixed: Record<string, string> = {};
        for (const [k, v] of Object.entries(response.headers)) {
          if (k.toLowerCase().startsWith(php.prefix)) {
            prefixed[k.slice(php.prefix.length)] = v;
          }
        }
        if (Object.keys(prefixed).length) result[php.name] = prefixed;
      }

      // Handle streaming output payload - return early
      if (outputPayloadProp?.isStreaming) {
        if (outputPayloadProp.isEventStream && response.body) {
          // Parse event stream - converts raw bytes to typed union events,
          // decoded through the event schema so blob/timestamp members match
          // the generated types
          result[outputPayloadProp.name] = parseEventStreamToUnion(
            response.body as ReadableStream<Uint8Array>,
            undefined,
            outputPayloadProp.eventSchema,
            outputPayloadProp.eventPayloadMap,
          );
        } else {
          // Raw streaming output (blob)
          result[outputPayloadProp.name] = readableToEffectStream(
            response.body,
          );
        }
        return result;
      }

      // Non-streaming blob payload (e.g. geo-maps GetTile / GetStaticMap):
      // the raw body bytes ARE the payload. Read them as bytes and re-encode
      // to the wire (base64 string) form the Blob schema decodes from.
      // The body is binary, not a JSON document, so JSON parsing is skipped.
      if (outputPayloadProp?.isBlob) {
        const bytes = yield* readStreamAsBytes(response.body);
        if (bytes.byteLength > 0) {
          result[outputPayloadProp.name] = bytesToBase64(bytes);
        }
        return result;
      }

      // Non-streaming response - read body as text
      const bodyText = yield* readStreamAsText(response.body);

      // Handle httpPayload with raw body
      if (outputPayloadProp?.isRaw && bodyText) {
        result[outputPayloadProp.name] = bodyText;
      }

      // Parse JSON body (reviver converts null → undefined since AWS returns null for absent fields)
      if (bodyText) {
        try {
          const parsed = JSON.parse(bodyText, (_, v) =>
            v === null ? undefined : v,
          );
          if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
            Object.assign(result, parsed);
          }
        } catch {
          return yield* new ParseError({
            message: `Failed to parse JSON body: ${bodyText}`,
          });
        }
      }

      return result;
    }),

    deserializeError: Effect.fn(function* (response: Response) {
      // Read body as text
      const bodyText = yield* readStreamAsText(response.body);

      // Parse JSON body (reviver converts null → undefined)
      let body: Record<string, unknown> = {};
      if (bodyText) {
        try {
          const parsed = JSON.parse(bodyText, (_, v) =>
            v === null ? undefined : v,
          );
          if (parsed && typeof parsed === "object") {
            body = parsed as Record<string, unknown>;
          }
        } catch {
          // Some API Gateway-fronted services (e.g. FinSpace Data) return
          // plain-text error bodies ("Failed to retrieve environment").
          // Treat the text as the error message and fall back to matching
          // the operation's declared errors by httpError status instead of
          // failing the deserializer.
          return { errorCode: "", data: { message: bodyText } };
        }
      }

      // Extract error code: X-Amzn-Errortype first (Smithy restJson1), then
      // the Coral X-Amz-Errortype spelling, then body fields.
      const rawErrorCode =
        response.headers["x-amzn-errortype"] ??
        response.headers["X-Amzn-Errortype"] ??
        response.headers["x-amz-errortype"] ??
        response.headers["X-Amz-Errortype"] ??
        extractJsonErrorCode(body);

      if (!rawErrorCode) {
        // Some services (API Gateway-fronted, e.g. IoT Managed Integrations)
        // return error responses with no error code at all — no
        // X-Amzn-Errortype header and no __type/code body field. Return an
        // empty error code so the response parser can fall back to matching
        // the operation's declared errors by smithy.api#httpError status.
        return { errorCode: "", data: extractJsonErrorData(body) };
      }

      // Sanitize the error code
      const errorCode = sanitizeErrorCode(rawErrorCode);

      // Extract data (remove __type and code fields)
      // Note: Error shapes can have HTTP bindings (httpHeader, etc.) but we extract
      // those in the response-parser when matching against error schemas
      const data = extractJsonErrorData(body);

      return { errorCode, data };
    }),
  };
};

/** Check if AST represents a raw payload type (string, blob, stream) */
function isRawPayload(ast: AST.AST): boolean {
  if (isStreamingType(ast)) return true;
  if (ast._tag === "String") return true;
  if (AST.isUnion(ast)) return ast.types.some(isRawPayload);
  return false;
}

/**
 * Check if AST represents a non-streaming blob payload (T.Blob — decoded
 * Uint8Array with a base64-string wire form). For httpPayload bindings the
 * HTTP body carries the raw bytes directly, so the deserializer must read
 * bytes instead of JSON-parsing the body.
 */
function isBlobPayload(ast: AST.AST): boolean {
  if (AST.isUnion(ast)) return ast.types.some(isBlobPayload);
  return getIdentifier(ast) === "Blob";
}

/** Base64-encode bytes without blowing the stack on large payloads. */
function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x2000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}
