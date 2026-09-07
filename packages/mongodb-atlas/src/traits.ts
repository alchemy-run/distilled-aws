/**
 * MongoDB Atlas SDK trait surface — hand-written.
 *
 * Re-exports the generic protocol traits from core (so generated operations
 * import everything from one place). Atlas has no envelope of its own; the
 * REST-protocol traits (SensitiveValue / RawResponse) come from
 * `core/protocol-rest`. Atlas's date-versioned `Accept` media types ride on
 * the core `Http` trait's `accept` field (stamped by scripts/convert.ts,
 * read by src/protocol.ts).
 */
export {
  Http,
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
  type HttpTrait,
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
