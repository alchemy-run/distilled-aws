export const annotationMetaSymbol = Symbol.for(
  "@distilled.cloud/core/annotation-meta",
);

type Annotatable = {
  annotate(annotations: any): Annotatable;
};

export interface Annotation {
  <A extends Annotatable>(schema: A): A;
  readonly [annotationMetaSymbol]: Array<{
    symbol: symbol | string;
    value: unknown;
  }>;
  readonly [key: symbol]: unknown;
  readonly [key: string]: unknown;
}

/**
 * Build a pipeable schema annotation carrying `value` under `sym`. Exported
 * so SDK packages can define their own protocol traits (e.g. cloudflare's
 * envelope traits, aws's smithy traits) with the same mechanics as the
 * generic ones here. Keys may be symbols or plain strings — effect Schema
 * annotation dictionaries accept both.
 */
export function makeAnnotation<T>(sym: symbol | string, value: T): Annotation {
  const fn = <A extends Annotatable>(schema: A): A =>
    schema.annotate({ [sym]: value }) as A;
  (fn as any)[annotationMetaSymbol] = [{ symbol: sym, value }];
  (fn as any)[sym] = value;
  return fn as Annotation;
}

/**
 * Combine several annotations into one — needed where only a single
 * annotations object can be supplied (e.g. the second argument of
 * `S.Class`).
 */
export function all(...annotations: Annotation[]): Annotation {
  const entries: Array<{ symbol: symbol | string; value: unknown }> = [];
  const raw: Record<symbol | string, unknown> = {};
  for (const a of annotations) {
    for (const entry of a[annotationMetaSymbol]) {
      entries.push(entry);
      raw[entry.symbol] = entry.value;
    }
  }
  const fn = <A extends Annotatable>(schema: A): A => schema.annotate(raw) as A;
  (fn as any)[annotationMetaSymbol] = entries;
  for (const { symbol: sym, value } of entries) {
    (fn as any)[sym] = value;
  }
  return fn as Annotation;
}

//#region Generic Operation traits
//#endregion

//#region Generic Http traits

export interface HttpTrait {
  readonly method:
    | "GET"
    | "POST"
    | "PUT"
    | "PATCH"
    | "DELETE"
    | "HEAD"
    | "OPTIONS";
  /** URI template relative to the service base URL, e.g. `/accounts/{account_id}/foo`. */
  readonly uri: string;
  /** Default success status code (a `ResponseCode()` member can still read the actual code). */
  readonly code?: number;
  /**
   * Request body encoding. Default is JSON; `"multipart"` sends
   * multipart/form-data — body members become form parts (objects
   * JSON-encoded) and members marked `FormDataFile()` append their files.
   * `"form-urlencoded"` sends application/x-www-form-urlencoded with
   * Stripe-style bracket notation for nested objects and arrays (see
   * `buildRequest`).
   */
  readonly contentType?: "multipart" | "form-urlencoded";
  /**
   * Explicit `Content-Type` for a whole-body (`HttpBody()`) member carrying a
   * preserialized payload, when the API requires a specific media type rather
   * than JSON (e.g. `application/x-ndjson` for Vectorize insert/upsert). The
   * member value is sent verbatim (string/bytes) under this media type.
   */
  readonly bodyMediaType?: string;
  /**
   * Explicit `Accept` for the operation, when the API serves more than one
   * response media type. Atlas pins an API version this way (e.g.
   * `application/vnd.atlas.2024-05-30+json` — `application/json` alone is a
   * 406). Protocols that don't read it fall back to their own default.
   */
  readonly accept?: string;
}

export const httpSymbol = Symbol.for("@distilled.cloud/core/http");
/**
 * Operation-level HTTP binding: the request method + URI template. Stamped on
 * the input schema so the protocol can build the request line. URI `{labels}`
 * are filled from members marked with `Label()`.
 */
export const Http = (trait: HttpTrait) => makeAnnotation(httpSymbol, trait);

export const labelSymbol = Symbol.for("@distilled.cloud/core/http/label");
/** Bind a member to a `{name}` placeholder in the operation's URI template. */
export const Label = (name?: string) =>
  makeAnnotation(labelSymbol, name ?? true);

export const responseCodeSymbol = Symbol.for(
  "@distilled.cloud/core/http/response-code",
);
export const ResponseCode = () => makeAnnotation(responseCodeSymbol, true);

export const headerSymbol = Symbol.for("@distilled.cloud/core/http/header");
export const Header = (name?: string) =>
  makeAnnotation(headerSymbol, name ?? true);

export const bodySymbol = Symbol.for("@distilled.cloud/core/http/body");
export const Body = (name?: string) => makeAnnotation(bodySymbol, name ?? true);

export const querySymbol = Symbol.for("@distilled.cloud/core/http/query");
export const Query = (name?: string) =>
  makeAnnotation(querySymbol, name ?? true);

export const deepQuerySymbol = Symbol.for(
  "@distilled.cloud/core/http/deep-query",
);
/**
 * Binds a struct-valued input member to a family of DOTTED query parameters:
 * `{ account: { id, name } }` with `DeepQuery("account")` serializes as
 * `?account.id=…&account.name=…` (null/undefined entries skipped). This is
 * how several list endpoints model their filters on the wire (e.g.
 * Cloudflare zones list `account.id` / `account.name`) while the TS surface
 * keeps the nested-object shape (v0 parity).
 */
export const DeepQuery = (name?: string) =>
  makeAnnotation(deepQuerySymbol, name ?? true);

export const httpBodySymbol = Symbol.for("@distilled.cloud/core/http-body");
/**
 * Marks the input member whose value IS the entire request body (raw arrays/
 * scalars — e.g. endpoints that POST a bare JSON array). Mirrors
 * `smithy.api#httpPayload`.
 */
export const HttpBody = () => makeAnnotation(httpBodySymbol, true);

export const formDataFileSymbol = Symbol.for(
  "@distilled.cloud/core/form-data-file",
);
/**
 * Marks an input member holding `File`/`Blob` parts for a multipart upload
 * (`Http({ contentType: "multipart" })`). Each file is appended to the form
 * under its own filename.
 */
export const FormDataFile = () => makeAnnotation(formDataFileSymbol, true);
//#endregion

//#region Generic JSON traits

export const keyDictionarySymbol = Symbol.for(
  "@distilled.cloud/core/key-dictionary",
);
/**
 * Deep TS-name→wire-name key dictionary for members whose full structure is
 * not modeled (opaque `Document` content). The protocol renames any matching
 * key at any depth on encode (and the reverse on decode); keys not in the
 * dictionary pass through verbatim.
 *
 * A value may be an array of wire names when the API itself is inconsistent
 * (e.g. queues consumer responses name the worker script `script_name` on
 * create/update but `script` on get/list): the first entry is the canonical
 * wire name used on encode; decode maps every listed spelling back to the
 * TS name.
 */
export type KeyDictionaryEntries = Record<
  string,
  string | ReadonlyArray<string>
>;

export const KeyDictionary = (dict: KeyDictionaryEntries) =>
  makeAnnotation(keyDictionarySymbol, dict);

export const unionCasesSymbol = Symbol.for("@distilled.cloud/core/union-cases");
/**
 * Marks an opaque schema standing in for a discriminated union of object
 * cases, carrying each case's TS-facing key set. For APIs that return every
 * case's keys with `null` for the inactive ones, the protocol uses these key
 * sets to pick the active case and drop the others, so consumers' `"key" in
 * value` discrimination works.
 */
export const UnionCases = (cases: ReadonlyArray<ReadonlyArray<string>>) =>
  makeAnnotation(unionCasesSymbol, cases);
//#endregion

//#region Error matcher traits

export const errorMatchersSymbol = Symbol.for(
  "@distilled.cloud/core/error-matchers",
);

/**
 * One wire-matching rule for a typed error class. A matcher matches a wire
 * failure when every present field matches: `code` equals the wire error's
 * code, `status` equals the HTTP status, and `message` either equals the
 * error message (string form) or satisfies `includes` (substring) /
 * `matches` (regex). A matcher with no fields matches nothing.
 */
export interface ErrorMatcher {
  readonly code?: number;
  readonly status?: number;
  readonly message?:
    | string
    | { readonly includes?: string; readonly matches?: string };
}

/**
 * Stamp wire-matching rules onto a generated error class. Protocols consult
 * these to decide which of an operation's declared error classes a failed
 * response should surface as (most specific matcher wins; ties break by
 * declaration order — see `matchTypedError` in `core/protocol-http`).
 */
export const applyErrorMatchers = <C>(
  cls: C,
  matchers: ReadonlyArray<ErrorMatcher>,
): C => {
  (cls as any)[errorMatchersSymbol] = matchers;
  return cls;
};

/** Read the matchers stamped on an error class, if any. */
export const getErrorMatchers = (
  cls: unknown,
): ReadonlyArray<ErrorMatcher> | undefined =>
  (cls as any)?.[errorMatchersSymbol];
//#endregion
