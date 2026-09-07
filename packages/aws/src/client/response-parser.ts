/**
 * Response Parser - wraps Protocol to parse responses.
 *
 * This layer:
 * 1. Uses the Protocol to deserialize the response
 * 2. Applies schema decoding/validation
 * 3. Handles error responses
 * 4. Delegates event stream parsing to stream-parser.ts
 *
 * This is independently testable without making HTTP requests.
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import * as SchemaIssue from "effect/SchemaIssue";
import {
  COMMON_ERRORS,
  InternalError,
  ParseError,
  UnknownAwsError,
} from "../errors.ts";
import {
  getAwsQueryError,
  getHttpError,
  getHttpHeader,
  getProtocol,
  getSyntheticError,
  hasErrorMessage,
  type SyntheticErrorTrait,
} from "../traits.ts";
import {
  getIdentifier,
  getPropertySignatures,
  isBooleanAST,
  isNumberAST,
} from "../util/ast.ts";
import type { Operation } from "./operation.ts";
import type { Protocol, ProtocolHandler } from "./protocol.ts";
import type { Response } from "./response.ts";
import { makeStreamParser } from "./stream-parser.ts";

export interface ResponseParserOptions {
  /** Override the protocol (otherwise discovered from schema annotations) */
  protocol?: Protocol;
  /** Skip schema validation - returns raw deserialized response */
  skipValidation?: boolean;
  /**
   * Hard-fail on output shape mismatches. Off by default: decode runs for
   * its transformations but mismatches fall back to the raw response.
   */
  validate?: boolean;
  /** AWS service SDK ID for error context (e.g., "S3", "DynamoDB") */
  service?: string;
  /** Operation name for error context (e.g., "createBucket", "putObject") */
  operation?: string;
}

export type ResponseParser<A, R> = (
  response: Response,
) => Effect.Effect<A, SchemaIssue.Issue, R>;

/**
 * Strip the conventional Exception/Error suffix from a wire error code so
 * synthetic `from` codes match both the full shape name and the short form.
 */
const stripErrorSuffix = (code: string): string => {
  for (const suffix of ["Exception", "Error"]) {
    if (code.endsWith(suffix)) return code.slice(0, -suffix.length);
  }
  return code;
};

const wireCodeMatches = (from: string, errorCode: string): boolean =>
  from === errorCode || stripErrorSuffix(from) === stripErrorSuffix(errorCode);

/**
 * Evaluate a synthetic error's message predicate. A plain string is an exact
 * match; the object form supports substring (`includes`) and regex
 * (`matches`) predicates. An empty object predicate would match every error
 * — reject it.
 */
const matchesMessage = (
  matcher: SyntheticErrorTrait["message"],
  message: string,
): boolean => {
  if (typeof matcher === "string") return matcher === message;
  const { includes, matches } = matcher;
  if (includes === undefined && matches === undefined) return false;
  if (includes !== undefined && !message.includes(includes)) return false;
  if (matches !== undefined && !new RegExp(matches).test(message)) return false;
  return true;
};

/**
 * Create a response parser for a given operation.
 *
 * Expensive work (protocol discovery, preprocessing) is done once at creation time.
 *
 * @param operation - The operation (with input/output schemas and protocol annotations)
 * @param options - Optional overrides
 * @returns A function that parses responses
 */
export const makeResponseParser = <A>(
  operation: Operation<any, any, any>,
  options?: ResponseParserOptions,
): ((response: Response) => Effect.Effect<any, never, never>) => {
  const inputAst = operation.input.ast;
  const outputSchema = operation.output;
  const outputAst = outputSchema.ast;

  // Discover protocol factory from annotations or use override (done once)
  const protocolFactory = options?.protocol ?? getProtocol(inputAst);
  if (!protocolFactory) {
    throw new Error("No protocol found on input schema");
  }

  // Create the protocol handler (preprocessing done once)
  const protocol: ProtocolHandler = protocolFactory(operation as Operation);

  // Pre-create the decoder (done once, unless skipping validation)
  const decode = options?.skipValidation
    ? undefined
    : Schema.decodeUnknownEffect(outputSchema);
  const lenient = !options?.validate;

  // Create stream parser if output has event stream member (done once)
  const streamParser = makeStreamParser(outputAst);

  // Build error schema map: errorCode -> Schema (done once)
  // We register errors by multiple keys to handle AWS wire format variations:
  // 1. Schema identifier (e.g., "EntityAlreadyExistsException")
  // 2. awsQueryError code if present (e.g., "EntityAlreadyExists")
  // 3. Short form without Exception/Error suffix (for services that return short codes)
  const errorSchemas = new Map<string, Schema.Top>();

  const registerError = (err: Schema.Top) => {
    const tag = getIdentifier(err.ast);
    if (tag) {
      errorSchemas.set(tag, err);
      // Also register short form (strip Exception/Error suffix)
      for (const suffix of ["Exception", "Error"]) {
        if (tag.endsWith(suffix)) {
          errorSchemas.set(tag.slice(0, -suffix.length), err);
          break;
        }
      }
    }
    // Also register by awsQueryError code if present (for aws-query/ec2-query protocols)
    const queryError = getAwsQueryError(err.ast);
    if (queryError?.code) errorSchemas.set(queryError.code, err);
  };

  // Register common errors first, then operation-specific errors so that a
  // service-specific schema (e.g. scheduler's `ValidationException` with a
  // `Message` field) takes precedence over the field-less common error of the
  // same name. Otherwise the common error would clobber the specific one in
  // the map and the decoded error would drop its message/data.
  // Synthetic errors (from spec patches) carve a new tag out of an existing
  // wire error using a message predicate. They are matched BEFORE the plain
  // wire-code lookup so the synthetic tag specializes the base error, and
  // are intentionally NOT registered by wire code (the wire never returns
  // the synthetic tag).
  const syntheticErrors: Array<{
    schema: Schema.Top;
    trait: SyntheticErrorTrait;
  }> = [];

  for (const err of COMMON_ERRORS) {
    registerError(err);
  }
  for (const err of operation.errors ?? []) {
    const synthetic = getSyntheticError(err.ast);
    if (synthetic) {
      syntheticErrors.push({ schema: err, trait: synthetic });
    } else {
      registerError(err);
    }
  }

  // Return a function that parses responses
  // @ts-expect-error
  return Effect.fn(function* (response: Response) {
    // Success path
    if (response.status >= 200 && response.status < 300) {
      const deserialized = (yield* protocol.deserializeResponse(response)) as
        | Record<string, unknown>
        | undefined;

      // If the output has an event stream member, parse and decode it
      const stream = streamParser?.(deserialized);
      if (stream) {
        return stream as A;
      }

      // Skip validation if requested - return raw deserialized response
      if (!decode) {
        return deserialized as A;
      }

      // Decode applies the schema's transformations (timestamp -> Date,
      // sensitive -> Redacted). A shape mismatch is NOT a failure: fall back
      // to the raw deserialized response (DISTILLED_AWS_VALIDATE=1 restores
      // hard-failing validation).
      if (lenient) {
        return yield* decode(deserialized).pipe(
          Effect.catch(() => Effect.succeed(deserialized as A)),
        );
      }
      return yield* decode(deserialized);
    }

    // Error path
    const { errorCode, data } = yield* protocol.deserializeError(response);

    // Fold the XML-style `Message` wire key onto `message`. AWS XML protocols
    // send <Message> while JS expects .message, and the generator names every
    // error class's canonical message member `message` regardless of which
    // spelling the service model used — so this is what lets a `Message` wire
    // key reach the renamed member during decode.
    if (
      data &&
      typeof (data as Record<string, unknown>).Message === "string" &&
      (data as Record<string, unknown>).message === undefined
    ) {
      (data as Record<string, unknown>).message = (
        data as Record<string, unknown>
      ).Message;
    }

    // Synthetic errors specialize the base wire error. An exact-message
    // matcher outranks a predicate matcher; ties resolve to declaration
    // order (first registered wins).
    const errorMessage =
      data && typeof (data as Record<string, unknown>).message === "string"
        ? ((data as Record<string, unknown>).message as string)
        : "";
    let errorSchema: Schema.Top | undefined;
    let bestScore = 0;
    for (const { schema, trait } of syntheticErrors) {
      if (!wireCodeMatches(trait.from, errorCode)) continue;
      if (!matchesMessage(trait.message, errorMessage)) continue;
      const score = typeof trait.message === "string" ? 2 : 1;
      if (score > bestScore) {
        bestScore = score;
        errorSchema = schema;
      }
    }
    errorSchema ??= errorSchemas.get(errorCode);

    // Status-based fallback: rest-json returns an empty error code when the
    // response carries none (no X-Amzn-Errortype header, no __type/code body
    // field — e.g. IoT Managed Integrations). Match the operation's declared
    // errors by their smithy.api#httpError status, but only when exactly one
    // declared error carries the response status.
    if (errorSchema === undefined && errorCode === "") {
      const statusMatches = (operation.errors ?? []).filter(
        (err) => getHttpError(err.ast) === response.status,
      );
      if (statusMatches.length === 1) {
        errorSchema = statusMatches[0];
      } else if (response.status >= 500) {
        // A code-less 5xx (e.g. a raw "502 Bad Gateway" HTML page from an
        // AWS front-end proxy) is a transient server fault, not a client
        // parse bug. Surface it as the ServerError-categorized
        // InternalError so the default retry policy treats it as transient
        // instead of failing fast with an unretryable ParseError.
        return yield* new InternalError();
      } else {
        return yield* new ParseError({
          message: `No error code found in response and ${statusMatches.length} declared errors match status ${response.status}. Data: ${JSON.stringify(data)}`,
        });
      }
    }

    if (errorSchema) {
      // Extract headers for error members with HttpHeader traits
      // This handles error fields not in the body (e.g., x-amz-bucket-region)
      const errorProps = getPropertySignatures(errorSchema.ast);
      for (const prop of errorProps) {
        const headerName = getHttpHeader(prop);
        if (headerName) {
          const headerValue = response.headers[headerName.toLowerCase()];
          if (headerValue !== undefined) {
            // Coerce string header values to the member's declared type —
            // e.g. ThrottlingException.retryAfterSeconds (S.Number) bound to
            // the Retry-After header. Without coercion the decode fails and
            // the error degrades to a plain object, losing its error class
            // and retry/throttling categorization.
            (data as Record<string, unknown>)[String(prop.name)] = isNumberAST(
              prop.type,
            )
              ? Number(headerValue)
              : isBooleanAST(prop.type)
                ? headerValue === "true"
                : headerValue;
          }
        }
      }

      // REST-JSON services with jsonName-renamed error members (e.g.
      // MediaLive) send camelCase wire keys ("message", "validationErrors")
      // while the generated error class declares the Smithy member names
      // ("Message", "ValidationErrors") without a key mapping. Backfill the
      // schema-cased key from its camelCase wire twin so the decode keeps
      // the payload instead of silently dropping every field.
      for (const prop of errorProps) {
        const name = String(prop.name);
        const record = data as Record<string, unknown>;
        if (record[name] === undefined) {
          const wireName = name.charAt(0).toLowerCase() + name.slice(1);
          if (wireName !== name && record[wireName] !== undefined) {
            record[name] = record[wireName];
          }
        }
      }

      // Get the schema identifier to use as _tag (may differ from wire errorCode)
      // e.g., wire code "EntityAlreadyExists" maps to schema tag "EntityAlreadyExistsException"
      const schemaTag = getIdentifier(errorSchema.ast) ?? errorCode;
      // Add _tag to data for TaggedError decoding
      const dataWithTag = { _tag: schemaTag, ...data };
      const decoded = yield* Schema.decodeUnknownEffect(errorSchema)(
        dataWithTag,
      ).pipe(Effect.catch(() => Effect.succeed(dataWithTag)));
      // Ensure the JS `Error.message` carries the service's message. The
      // generator tags exactly one member per error class as the canonical
      // message (T.ErrorMessage) and normalizes its name to `message`, so
      // this reads the tag rather than guessing by spelling the way the old
      // `Message`-only fallback did. Without it an error whose class carries
      // the text in a field the Error constructor didn't pick up stringifies
      // as a bare tag, which is what made a typed error less useful than the
      // UnknownAwsError it replaced (distilled #160).
      if (decoded instanceof Error && !decoded.message) {
        const record = decoded as unknown as Record<string, unknown>;
        const canonical = errorProps.find(hasErrorMessage);
        const value = canonical ? record[String(canonical.name)] : undefined;
        if (typeof value === "string" && value !== "") {
          decoded.message = value;
        }
      }
      return yield* Effect.fail(decoded);
    }

    return yield* new UnknownAwsError({
      errorTag: errorCode,
      errorData: data,
      service: options?.service,
      operation: options?.operation,
      message: typeof data?.message === "string" ? data.message : errorCode,
    });
  });
};
