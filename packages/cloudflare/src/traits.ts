/**
 * Cloudflare SDK trait surface — hand-written.
 *
 * Re-exports the generic protocol traits from core (so generated operations
 * import everything from one place) and adds the Cloudflare-specific traits
 * tied to the v4 response envelope.
 *
 * Generic traits (Body / Header / Query / DeepQuery / Label / Http / ResponseCode /
 * HttpBody / FormDataFile / KeyDictionary / UnionCases / error matchers)
 * live in `@distilled.cloud/core/trait` because any REST protocol reuses
 * them. Anything tied to Cloudflare's response envelope lives here.
 */
import { makeAnnotation } from "@distilled.cloud/core/trait";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as Stream from "effect/Stream";

export {
  Body,
  Header,
  Query,
  DeepQuery,
  Label,
  Http,
  ResponseCode,
  HttpBody,
  FormDataFile,
  KeyDictionary,
  UnionCases,
  applyErrorMatchers,
  getErrorMatchers,
  type HttpTrait,
  type ErrorMatcher,
  bodySymbol,
  headerSymbol,
  querySymbol,
  deepQuerySymbol,
  labelSymbol,
  httpSymbol,
  responseCodeSymbol,
  httpBodySymbol,
  formDataFileSymbol,
  keyDictionarySymbol,
  unionCasesSymbol,
  errorMatchersSymbol,
} from "@distilled.cloud/core/trait";

// =============================================================================
// Cloudflare v4 envelope traits
// =============================================================================

export const envelopePayloadRootSymbol = Symbol.for(
  "@distilled.cloud/cloudflare/envelope-payload-root",
);

/**
 * Marks a response schema whose ENTIRE value is the envelope's `result`
 * payload (used when `result` is an array or scalar — e.g. worker script
 * search returns a bare array). The protocol returns `result` directly
 * instead of wrapping it in `{ result: ... }`, matching how distilled types
 * these responses.
 */
export const EnvelopePayloadRoot = () =>
  makeAnnotation(envelopePayloadRootSymbol, true);

export const resultInfoSymbol = Symbol.for(
  "@distilled.cloud/cloudflare/result-info",
);

/**
 * Marks the output member that receives the envelope's top-level
 * `result_info` block (camelCased). Only honored by
 * `CloudflarePaginatedProtocol` — pagination-specific by design.
 */
export const ResultInfo = () => makeAnnotation(resultInfoSymbol, true);

export const envelopePayloadSymbol = Symbol.for(
  "@distilled.cloud/cloudflare/envelope-payload",
);

/**
 * Marks the single output member that receives the envelope's `result` value
 * wholesale, used when `result` is an array or scalar rather than an object.
 *
 * When an operation's `result` is an object, the response struct inlines its
 * fields directly (each mapped from `result.<field>`). When `result` is a list
 * or scalar there are no fields to inline, so the response struct has one member
 * tagged with `EnvelopePayload()` and the protocol assigns the whole `result`
 * to it. This mirrors `com.cloudflare.protocols#envelopePayload` in the Smithy
 * models.
 */
export const EnvelopePayload = () =>
  makeAnnotation(envelopePayloadSymbol, true);

export const binaryResponseBodySymbol = Symbol.for(
  "@distilled.cloud/cloudflare/binary-response-body",
);

/**
 * Marks the output member that receives the raw HTTP response body as a
 * lazy byte stream (raw object GETs — no envelope, no JSON). A response
 * with a member carrying this trait is decoded from the response's
 * headers and stream without consuming the body as text; error statuses
 * still take the normal envelope/error path. This mirrors
 * `com.cloudflare.protocols#binaryResponseBody` in the Smithy models.
 */
export const BinaryResponseBody = () =>
  makeAnnotation(binaryResponseBodySymbol, true);

/** The TS type of a `BinaryResponseBody()` member. */
export type BinaryResponseBody = Stream.Stream<
  Uint8Array,
  HttpClientError.HttpClientError
>;
