/**
 * Shared naming utilities for the SDK generators (dev-time only — imported by
 * `packages/<sdk>/scripts/generate.ts`, never by runtime code).
 */

/** JSON-string-quote a value for emission into generated source. */
export const q = (s: string): string => JSON.stringify(s);

/** Smithy shape id → local name (`ns#Shape` → `Shape`). */
export const local = (id: string): string => id.split("#")[1] ?? id;

/** Whether a shape id is a smithy prelude shape (`smithy.api#…`). */
export const isPrelude = (id: string): boolean => id.startsWith("smithy.api#");

const IDENT = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/** Emit a TS object key: bare when a valid identifier, quoted otherwise. */
export const tsKey = (s: string): string => (IDENT.test(s) ? s : q(s));

/** snake_case / kebab-case wire name → camelCase TS-facing name. */
export const camel = (s: string): string =>
  s.replace(/[_-]+([A-Za-z0-9])/g, (_, c: string) => c.toUpperCase());

/** Reserved words that can't be `const` names. */
export const RESERVED = new Set([
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "import",
  "in",
  "instanceof",
  "let",
  "new",
  "null",
  "package",
  "return",
  "static",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield",
]);

/**
 * Lower-case the first character for an exported operation name — unless the
 * result is a reserved word, in which case the original casing is kept.
 */
export const lowerFirst = (s: string): string => {
  const lowered = s.charAt(0).toLowerCase() + s.slice(1);
  return RESERVED.has(lowered) ? s : lowered;
};

/** Upper-case the first character. */
export const upperFirst = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Collapse a smithy documentation string to a single safe line for a
 * `/** … *​/` comment.
 */
export const oneLine = (s: string | undefined): string | undefined =>
  s ? s.replace(/\s+/g, " ").replace(/\*\//g, "*\\/").trim() : undefined;
