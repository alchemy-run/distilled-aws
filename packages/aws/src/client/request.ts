/**
 * A protocol-agnostic HTTP request representation.
 * This is what the protocol serializer produces.
 */
export interface Request {
  /** HTTP method (GET, POST, PUT, DELETE, etc.) */
  method: string;
  /** Request path (e.g., "/{Bucket}/{Key+}") */
  path: string;
  /** Query string parameters (arrays for repeated params like tagKeys=A&tagKeys=B) */
  query: Record<string, string | string[]>;
  /** HTTP headers */
  headers: Record<string, string>;
  /** Request body (undefined for GET/HEAD/DELETE without body) */
  body?: string | Uint8Array | ReadableStream;
  /**
   * True when the operation's input declares a streaming payload member
   * (smithy `@streaming` blob). Streaming-input operations must be signed
   * with `x-amz-content-sha256: UNSIGNED-PAYLOAD` (matching botocore's
   * `has_streaming_input` behavior) — services like Lex Runtime V2 reject a
   * payload-hash signature on these routes even when the payload is a
   * buffered `Uint8Array`.
   */
  hasStreamingInput?: boolean;
}
