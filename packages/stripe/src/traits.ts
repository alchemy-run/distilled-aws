/**
 * Stripe SDK trait surface — hand-written.
 *
 * Re-exports the generic protocol traits from core (so generated operations
 * import everything from one place). The only Stripe-specific piece is the
 * widened `Http` trait: nearly every Stripe operation's request body is
 * `application/x-www-form-urlencoded` (with Stripe's deep bracket
 * expansion), which core's `HttpTrait` doesn't model — the Stripe protocol
 * keys its body encoding on `contentType: "form-urlencoded"`.
 */
import {
  Http as CoreHttp,
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
} from "@distilled.cloud/core/trait";

export {
  RawResponse,
  RawResponseRoot,
  SensitiveValue,
  rawResponseSymbol,
  rawResponseRootSymbol,
  sensitiveValueSymbol,
} from "@distilled.cloud/core/protocol-rest";

/**
 * Core's `HttpTrait` widened with Stripe's `"form-urlencoded"` body
 * encoding (core itself only models `"multipart"`).
 */
export interface HttpTrait extends Omit<CoreHttpTrait, "contentType"> {
  readonly contentType?: "form-urlencoded" | "multipart";
}

/** Operation-level HTTP binding (see {@link HttpTrait}). */
export const Http = (trait: HttpTrait) => CoreHttp(trait as CoreHttpTrait);
