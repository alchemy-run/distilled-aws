/**
 * Supabase SDK trait surface — hand-written.
 *
 * Re-exports the generic protocol traits from core so generated operations
 * import everything from one place. Supabase's REST protocol needs no
 * provider-specific traits (no response envelope, no pagination); the
 * OpenAPI-sourced extras (sensitive values, bare-payload responses) come
 * from `core/protocol-rest`.
 */
import type * as Redacted from "effect/Redacted";
import {
  makeAnnotation,
  httpSymbol,
  type HttpTrait as CoreHttpTrait,
} from "@distilled.cloud/core/trait";

export {
  Body,
  Header,
  Query,
  Label,
  ResponseCode,
  HttpBody,
  FormDataFile,
  KeyDictionary,
  UnionCases,
  applyErrorMatchers,
  getErrorMatchers,
  type ErrorMatcher,
  bodySymbol,
  headerSymbol,
  querySymbol,
  labelSymbol,
  httpSymbol,
  responseCodeSymbol,
  httpBodySymbol,
  formDataFileSymbol,
  keyDictionarySymbol,
  unionCasesSymbol,
  errorMatchersSymbol,
} from "@distilled.cloud/core/trait";

export {
  SensitiveValue,
  RawResponse,
  RawResponseRoot,
  sensitiveValueSymbol,
  rawResponseSymbol,
  rawResponseRootSymbol,
} from "@distilled.cloud/core/protocol-rest";

/**
 * TS-facing type of a sensitive string member: decoded values arrive as
 * `Redacted`, inputs accept either form (unwrapped before serialization).
 */
export type Sensitive = string | Redacted.Redacted<string>;

/**
 * Core's `HttpTrait` widened with `"form-urlencoded"`: core `buildRequest`
 * only understands `"multipart"`; the urlencoded re-encode is Supabase's
 * protocol concern (`v1ExchangeOauthToken` — see src/protocol.ts).
 */
export interface HttpTrait extends Omit<CoreHttpTrait, "contentType"> {
  readonly contentType?: "multipart" | "form-urlencoded";
}

/** Operation-level HTTP binding (same annotation symbol as core's `Http`). */
export const Http = (trait: HttpTrait) => makeAnnotation(httpSymbol, trait);
