/**
 * Azure SDK trait surface — hand-written.
 *
 * Re-exports the generic protocol traits from core (so generated operations
 * import everything from one place) and widens `Http` with Azure's baked
 * `apiVersion` field.
 *
 * ARM requires `?api-version=<date>` on every call. At generation time the
 * resolved stable api-version of each spec is folded into the operation's
 * `T.Http` trait (`apiVersion`); the protocol appends the query parameter at
 * request time (see `protocol.ts`). This mirrors distilled v0, where the
 * shared client injected the query param from `httpTrait.apiVersion`.
 */
import {
  type HttpTrait as CoreHttpTrait,
  httpSymbol,
  makeAnnotation,
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
 * Core's HTTP trait plus the Azure ARM `apiVersion` baked in at generation
 * time. The protocol turns it into an `api-version` query parameter on every
 * request (an explicit `api-version` already present in the URL wins).
 */
export interface HttpTrait extends CoreHttpTrait {
  readonly apiVersion?: string;
}

/**
 * Operation-level HTTP binding (method + URI template + Azure `apiVersion`).
 * Same annotation symbol as core's `Http`, so the shared request builder
 * keeps working untouched.
 */
export const Http = (trait: HttpTrait) => makeAnnotation(httpSymbol, trait);
