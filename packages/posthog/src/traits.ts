/**
 * PostHog SDK trait surface — hand-written.
 *
 * Re-exports the generic protocol traits from core so generated service
 * modules import everything from one place. PostHog's wire needs nothing
 * bespoke: bearer auth + plain JSON bodies, so the generic REST vocabulary
 * (Body / Header / Query / Label / Http / HttpBody / error matchers) plus
 * the shared REST-protocol traits (SensitiveValue / RawResponse /
 * RawResponseRoot) cover the whole surface.
 */
export {
  Body,
  Header,
  Query,
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
