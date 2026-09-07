/**
 * Event Stream Parser
 *
 * Converts a ReadableStream of bytes into an Effect Stream of typed events.
 * Handles message framing, CRC validation, and event parsing.
 */

import * as Effect from "effect/Effect";
import * as Ref from "effect/Ref";
import * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";
import {
  decodeMessage,
  EventParseError,
  EventStreamDecodeError,
  getMessageLength,
  parseEvent,
  type StreamEvent,
} from "./codec.ts";

// ============================================================================
// Parser Types
// ============================================================================

/** Errors that can occur during event stream parsing */
export type EventStreamParseError = EventStreamDecodeError | EventParseError;

// ============================================================================
// Stream Parser
// ============================================================================

/**
 * Parse a ReadableStream of bytes into an Effect Stream of events.
 *
 * This handles:
 * - Buffering partial messages
 * - Message framing and CRC validation
 * - Event type parsing
 */
export const parseEventStream = (
  input: ReadableStream<Uint8Array>,
): Stream.Stream<StreamEvent, EventStreamParseError> => {
  // Convert ReadableStream to Effect Stream of chunks
  const chunkStream: Stream.Stream<Uint8Array, EventStreamDecodeError> =
    Stream.unfold(input.getReader(), (reader) =>
      Effect.tryPromise({
        try: () => reader.read(),
        catch: (e) =>
          new EventStreamDecodeError({
            message: `Failed to read from stream: ${e}`,
          }),
      }).pipe(
        Effect.map((result) =>
          result.done ? undefined : ([result.value, reader] as const),
        ),
      ),
    );

  // Process chunks with buffering to extract complete messages
  return Stream.unwrap(
    Effect.gen(function* () {
      // Create a mutable buffer ref
      const bufferRef = yield* Ref.make(new Uint8Array(0));

      return chunkStream.pipe(
        // Append each chunk to the buffer and extract complete messages
        Stream.mapEffect((chunk: Uint8Array) =>
          Effect.gen(function* () {
            // Append chunk to buffer
            const currentBuffer = yield* Ref.get(bufferRef);
            const newBuffer = new Uint8Array(
              currentBuffer.length + chunk.length,
            );
            newBuffer.set(currentBuffer);
            newBuffer.set(chunk, currentBuffer.length);
            yield* Ref.set(bufferRef, newBuffer);

            // Extract all complete messages
            const events: StreamEvent[] = [];
            let buffer = yield* Ref.get(bufferRef);

            while (true) {
              const messageLength = getMessageLength(buffer);
              if (messageLength === 0) {
                break;
              }

              // Extract and decode the message
              const messageData = buffer.subarray(0, messageLength);
              const [message] = yield* decodeMessage(messageData);

              // Parse the message into a typed event
              const event = yield* parseEvent(message);
              events.push(event);

              // Remove processed message from buffer
              buffer = buffer.subarray(messageLength);
            }

            // Update buffer with remaining data
            yield* Ref.set(bufferRef, buffer);

            return events;
          }),
        ),
        // Flatten the arrays of events
        Stream.flatMap((events) => Stream.fromIterable(events)),
        // Add finalizer to check for incomplete data
        Stream.concat(
          Stream.unwrap(
            Effect.gen(function* () {
              const remainingBuffer = yield* Ref.get(bufferRef);
              if (remainingBuffer.length > 0) {
                return Stream.fail(
                  new EventStreamDecodeError({
                    message: `Stream ended with ${remainingBuffer.length} bytes of incomplete message data`,
                  }),
                );
              }
              return Stream.empty;
            }),
          ),
        ),
      );
    }),
  );
};

// ============================================================================
// Event Stream to Union Transformation
// ============================================================================

/**
 * Parsed event in tagged union format: { EventType: payload }
 */
export type ParsedEvent = Record<string, unknown>;

/**
 * Payload parser function - protocol-specific (JSON, XML, etc.)
 */
export type PayloadParser = (payload: Uint8Array) => unknown;

/**
 * Raw text payload parser - returns payload as { payload: string }
 * Useful when caller wants to handle parsing themselves
 */
export const rawPayloadParser: PayloadParser = (payload: Uint8Array) => {
  const text = new TextDecoder().decode(payload);
  return text ? { payload: text } : {};
};

/** Encode raw event payload bytes to the base64 wire form blob schemas decode from. */
const uint8ToBase64 = (bytes: Uint8Array): string => {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
};

/**
 * Default JSON payload parser
 */
export const jsonPayloadParser: PayloadParser = (payload: Uint8Array) => {
  const text = new TextDecoder().decode(payload);
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    // If payload isn't valid JSON, return as raw text
    return { payload: text };
  }
};

/**
 * Transform a stream of StreamEvents into typed union members.
 *
 * Converts internal event types to the Smithy union format:
 * - MessageEvent → { eventType: parsedPayload }
 * - ExceptionEvent → { exceptionType: parsedPayload }
 * - ErrorEvent → { UnmodeledError: { errorCode, errorMessage } }
 *
 * @param eventStream - Stream of raw StreamEvents from parseEventStream
 * @param payloadParser - Function to parse the payload bytes (default: JSON)
 */
export const transformEventStreamToUnion = (
  eventStream: Stream.Stream<StreamEvent, EventStreamParseError>,
  payloadParser: PayloadParser = jsonPayloadParser,
  eventPayloadMap?: Record<string, string>,
): Stream.Stream<ParsedEvent, EventStreamParseError> =>
  eventStream.pipe(
    Stream.map((streamEvent) => {
      if (streamEvent._tag === "MessageEvent") {
        // Normal message event - parse payload and wrap in tagged union
        const eventType = streamEvent.eventType;
        // Smithy `eventPayload` member: the raw wire payload IS that single
        // member's value (a blob), not a JSON document of the event struct.
        // Bind the bytes to the member in wire (base64) form so the event
        // schema decode produces the generated type (Uint8Array / Redacted).
        const payloadMember = eventPayloadMap?.[eventType];
        if (payloadMember !== undefined) {
          return {
            [eventType]: {
              [payloadMember]: uint8ToBase64(streamEvent.payload),
            },
          };
        }
        const payload = payloadParser(streamEvent.payload);
        return { [eventType]: payload };
      } else if (streamEvent._tag === "ExceptionEvent") {
        // Modeled exception - parse payload and wrap in tagged union
        const errorType = streamEvent.exceptionType;
        const payload = payloadParser(streamEvent.payload);
        return { [errorType]: payload };
      } else {
        // ErrorEvent - unmodeled error, use standard structure
        return {
          UnmodeledError: {
            errorCode: streamEvent.errorCode,
            errorMessage: streamEvent.errorMessage,
          },
        };
      }
    }),
  );

/**
 * Decode each parsed union event through the operation's event schema (the
 * Smithy union of event types). The payload parser alone only produces plain
 * JSON/XML values — member transformations declared on the schema never run,
 * so blob members stay base64 strings (instead of `Uint8Array` /
 * `Redacted<Uint8Array>` for sensitive blobs) and timestamps stay numbers.
 * Running the schema decode makes the runtime values match the generated
 * types (e.g. Bedrock `InvokeModelWithResponseStream`'s `chunk.bytes`).
 *
 * An event that fails to decode is passed through raw so unmodeled events
 * (`UnmodeledError`) and exception events keep flowing.
 */
export const decodeEventStreamUnion = (
  eventStream: Stream.Stream<ParsedEvent, EventStreamParseError>,
  eventSchema: Schema.Schema<unknown> | undefined,
): Stream.Stream<ParsedEvent, EventStreamParseError> => {
  if (!eventSchema) return eventStream;
  const decode = Schema.decodeUnknownEffect(eventSchema);
  return Stream.mapEffect(
    eventStream,
    (event) =>
      decode(event).pipe(
        Effect.map((decoded) => decoded as ParsedEvent),
        Effect.catch(() => Effect.succeed(event)),
        // The schema arrives via untyped AST annotations as `Schema<unknown>`,
        // whose decoding-services slot is `unknown`; generated event schemas
        // are plain data codecs with no decode services, so the effect is
        // service-free at runtime.
      ) as Effect.Effect<ParsedEvent, never>,
  );
};

/**
 * Parse a ReadableStream of bytes into a Stream of typed union events.
 *
 * This is the high-level API that combines:
 * 1. parseEventStream - decode wire format to StreamEvents
 * 2. transformEventStreamToUnion - convert to typed union members
 * 3. decodeEventStreamUnion - run the event schema so runtime values match
 *    the generated types (blobs → Uint8Array, sensitive blobs → Redacted)
 *
 * @param input - ReadableStream of event stream bytes
 * @param payloadParser - Function to parse event payloads (default: JSON)
 * @param eventSchema - The Smithy union schema for the stream's events
 */
export const parseEventStreamToUnion = (
  input: ReadableStream<Uint8Array>,
  payloadParser: PayloadParser = jsonPayloadParser,
  eventSchema?: Schema.Schema<unknown>,
  eventPayloadMap?: Record<string, string>,
): Stream.Stream<ParsedEvent, EventStreamParseError> =>
  decodeEventStreamUnion(
    transformEventStreamToUnion(
      parseEventStream(input),
      payloadParser,
      eventPayloadMap,
    ),
    eventSchema,
  );
