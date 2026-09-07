/**
 * Fly.io SDK trait surface — hand-written.
 *
 * Re-exports the generic protocol traits from core so generated operations
 * import everything from one place. REST services use the bare-payload and
 * sensitive-value traits; GraphQL add-ons add the operation/response-path
 * envelope traits.
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

export {
  RawResponse,
  RawResponseRoot,
  SensitiveValue,
  rawResponseSymbol,
  rawResponseRootSymbol,
  sensitiveValueSymbol,
} from "@distilled.cloud/core/protocol-rest";

/**
 * The baked GraphQL document for one add-on operation. The protocol wraps
 * the operation's input as `{ query, operationName, variables }`.
 */
export interface GraphQLOpTrait {
  readonly query: string;
  readonly operationName: string;
  readonly type: "query" | "mutation";
}

export const graphqlOpSymbol = Symbol.for("@distilled.cloud/fly-io/graphql-op");

/** Marks an operation input with its GraphQL document (`com.flyio.graphql#operation`). */
export const GraphQLOp = (op: GraphQLOpTrait) =>
  makeAnnotation(graphqlOpSymbol, op);

export const responsePathSymbol = Symbol.for(
  "@distilled.cloud/fly-io/graphql-response-path",
);

/** Dotted path under GraphQL `data` (`com.flyio.graphql#responsePath`). */
export const ResponsePath = (path: string) =>
  makeAnnotation(responsePathSymbol, path);

export const graphqlPayloadRootSymbol = Symbol.for(
  "@distilled.cloud/fly-io/graphql-payload-root",
);

/** Marks a response whose entire value is `data.<responsePath>`. */
export const GraphQLPayloadRoot = () =>
  makeAnnotation(graphqlPayloadRootSymbol, true);
