/**
 * Expo EAS SDK trait surface — hand-written.
 *
 * Re-exports the generic protocol traits from core (so generated operations
 * import everything from one place) and adds the GraphQL-specific traits
 * tied to the `{ query, operationName, variables }` request envelope and
 * `{ data, errors }` response envelope.
 */
import { makeAnnotation } from "@distilled.cloud/core/trait";

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

// =============================================================================
// GraphQL envelope traits
// =============================================================================

/**
 * The baked GraphQL document for one operation: the full query/mutation
 * text, the operation name, and whether it is a query or a mutation. The
 * protocol wraps the operation's input as
 * `{ query, operationName, variables }`.
 */
export interface GraphQLOpTrait {
  readonly query: string;
  readonly operationName: string;
  readonly type: "query" | "mutation";
}

export const graphqlOpSymbol = Symbol.for(
  "@distilled.cloud/expo-eas/graphql-op",
);

/**
 * Marks an operation's input schema with its GraphQL document. Mirrors
 * `com.expo.graphql#operation` in the Smithy model.
 */
export const GraphQLOp = (op: GraphQLOpTrait) =>
  makeAnnotation(graphqlOpSymbol, op);

export const responsePathSymbol = Symbol.for(
  "@distilled.cloud/expo-eas/response-path",
);

/**
 * The dotted path under the GraphQL `data` envelope that holds this
 * operation's result (e.g. `"account.byId"`). The protocol walks it on
 * decode and returns the value found there. Mirrors
 * `com.expo.graphql#responsePath` in the Smithy model.
 */
export const ResponsePath = (path: string) =>
  makeAnnotation(responsePathSymbol, path);

export const graphqlPayloadRootSymbol = Symbol.for(
  "@distilled.cloud/expo-eas/graphql-payload-root",
);

/**
 * Marks a response schema whose ENTIRE value is `data.<responsePath>` (used
 * when the GraphQL leaf returns a list/scalar rather than an object — e.g.
 * `runtimes` returns a bare connection-less array). Documentation-only at
 * runtime: the protocol always returns `data.<responsePath>` verbatim.
 */
export const GraphQLPayloadRoot = () =>
  makeAnnotation(graphqlPayloadRootSymbol, true);
