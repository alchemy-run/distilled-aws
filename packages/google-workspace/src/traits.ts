/**
 * Google Workspace SDK trait surface — hand-written.
 *
 * Re-exports the generic protocol traits from core (so generated services
 * import everything from one place) and extends the `Http` trait with the
 * per-service base URL: every Google service has its own `rootUrl` +
 * `servicePath` (from its discovery document), which `scripts/generate.ts`
 * bakes into each operation's `T.Http({ ... baseUrl })` pipe.
 */
import {
  httpSymbol,
  makeAnnotation,
  type HttpTrait,
} from "@distilled.cloud/core/trait";

export {
  Body,
  Header,
  Query,
  Label,
  HttpBody,
  applyErrorMatchers,
  getErrorMatchers,
  makeAnnotation,
  type ErrorMatcher,
  type HttpTrait,
  bodySymbol,
  headerSymbol,
  querySymbol,
  labelSymbol,
  httpSymbol,
  httpBodySymbol,
  errorMatchersSymbol,
} from "@distilled.cloud/core/trait";

/**
 * Core `HttpTrait` plus the service base URL from the discovery document.
 *
 * `baseUrl` is `rootUrl + servicePath` (always ends with `/`); the
 * operation's `uri` is the discovery method `path` (no leading slash,
 * possibly containing RFC 6570 reserved-expansion `{+param}` tokens) and is
 * appended verbatim by the protocol.
 */
export interface GoogleWorkspaceHttpTrait extends HttpTrait {
  readonly baseUrl: string;
}

/** Operation-level HTTP binding carrying the Google Workspace per-service base URL. */
export const Http = (trait: GoogleWorkspaceHttpTrait) =>
  makeAnnotation(httpSymbol, trait);
