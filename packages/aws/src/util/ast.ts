import type * as AST from "effect/SchemaAST";
import { xmlNamespaceSymbol, xmlNameSymbol } from "../traits.ts";

/**
 * Unwrap Union types to get to the actual type (handles S.optional)
 * Does NOT unwrap Suspend - callers should handle Suspend separately to preserve annotations
 */
export function unwrapUnion(ast: AST.AST): AST.AST {
  if (ast._tag === "Union") {
    const nonNullish = ast.types.filter(
      (t) =>
        t._tag !== "Undefined" && !(t._tag === "Literal" && t.literal === null),
    );
    if (nonNullish.length === 1) {
      return unwrapUnion(nonNullish[0]);
    }
  }
  return ast;
}

/**
 * Get the identifier (class name) from an AST node
 */
export function getIdentifier(ast: AST.AST): string | undefined {
  const directId = ast.annotations?.identifier;
  if (typeof directId === "string") return directId;

  if (ast._tag === "Suspend") {
    return getIdentifier(ast.thunk());
  }

  const unwrapped = unwrapUnion(ast);
  if (unwrapped !== ast) return getIdentifier(unwrapped);

  if (unwrapped._tag === "Declaration") {
    const declId = unwrapped.annotations?.identifier;
    if (typeof declId === "string") return declId;
    const enc = unwrapped.encoding;
    if (enc && enc.length > 0) {
      const toId = enc[0].to?.annotations?.identifier;
      if (typeof toId === "string") return toId;
    }
  }

  if (unwrapped.encoding && unwrapped.encoding.length > 0) {
    const toId = unwrapped.encoding[0].to?.annotations?.identifier;
    if (typeof toId === "string") return toId;
  }

  return undefined;
}

/**
 * Get property signatures from a schema AST (the "type" / decoded side)
 */
export function getPropertySignatures(
  ast: AST.AST,
): readonly AST.PropertySignature[] {
  const unwrapped = unwrapUnion(ast);
  if (unwrapped !== ast) return getPropertySignatures(unwrapped);

  if (unwrapped._tag === "Suspend") {
    return getPropertySignatures(unwrapped.thunk());
  }

  if (unwrapped._tag === "Objects") {
    return unwrapped.propertySignatures;
  }

  if (unwrapped._tag === "Declaration") {
    const enc = unwrapped.encoding;
    if (enc && enc.length > 0 && enc[0].to?._tag === "Objects") {
      return enc[0].to.propertySignatures;
    }
  }

  return [];
}

/**
 * Recursively find the Objects AST on the encoded (wire) side.
 * In v4, encoding chains replace the old Transformation node.
 */
function findEncodedObjects(ast: AST.AST): AST.Objects | undefined {
  if (ast._tag === "Suspend") {
    return findEncodedObjects(ast.thunk());
  }

  // Follow encoding chain to the leaf (wire-format) Objects
  if (ast.encoding && ast.encoding.length > 0) {
    let current = ast as AST.AST;
    while (current.encoding && current.encoding.length > 0) {
      current = current.encoding[0].to;
    }
    if (current._tag === "Objects") return current as AST.Objects;
  }

  if (ast._tag === "Objects") return ast as AST.Objects;

  if (ast._tag === "Declaration") {
    const enc = ast.encoding;
    if (enc && enc.length > 0) {
      return findEncodedObjects(enc[0].to);
    }
  }

  return undefined;
}

/**
 * Get encoded property signatures (wire-format side)
 */
export function getEncodedPropertySignatures(
  ast: AST.AST,
): readonly AST.PropertySignature[] {
  const unwrapped = unwrapUnion(ast);
  if (unwrapped !== ast) return getEncodedPropertySignatures(unwrapped);

  const objects = findEncodedObjects(unwrapped);
  if (objects) {
    return objects.propertySignatures;
  }
  return getPropertySignatures(unwrapped);
}

/**
 * Get element AST from array type.
 * In v4, Arrays has rest elements directly as AST nodes (not wrapped in { type }).
 */
export function getArrayElementAST(ast: AST.AST): AST.AST | undefined {
  const unwrapped = unwrapUnion(ast);
  if (unwrapped !== ast) return getArrayElementAST(unwrapped);

  if (unwrapped._tag === "Arrays" && unwrapped.rest?.[0]) {
    return unwrapped.rest[0];
  }

  if (unwrapped.encoding && unwrapped.encoding.length > 0) {
    return getArrayElementAST(unwrapped.encoding[0].to);
  }

  return undefined;
}

/**
 * Check if AST represents an array type
 */
export function isArrayAST(ast: AST.AST): boolean {
  const unwrapped = unwrapUnion(ast);
  if (unwrapped !== ast) return isArrayAST(unwrapped);

  if (unwrapped._tag === "Arrays" && unwrapped.rest?.[0]) return true;

  if (unwrapped.encoding && unwrapped.encoding.length > 0) {
    return isArrayAST(unwrapped.encoding[0].to);
  }
  return false;
}

/**
 * Check if AST represents a string type (including encoded strings like enums)
 */
export function isStringAST(ast: AST.AST): boolean {
  const unwrapped = unwrapUnion(ast);
  if (unwrapped !== ast) return isStringAST(unwrapped);

  if (unwrapped._tag === "String" || unwrapped._tag === "Enum") return true;

  if (unwrapped.encoding && unwrapped.encoding.length > 0) {
    return isStringAST(unwrapped.encoding[0].to);
  }
  return false;
}

/**
 * Check if AST represents a number type
 */
export function isNumberAST(ast: AST.AST): boolean {
  const unwrapped = unwrapUnion(ast);
  if (unwrapped !== ast) return isNumberAST(unwrapped);

  if (unwrapped._tag === "Number") return true;

  if (unwrapped.encoding && unwrapped.encoding.length > 0) {
    return isNumberAST(unwrapped.encoding[0].to);
  }
  return false;
}

/**
 * Check if AST represents a boolean type
 */
export function isBooleanAST(ast: AST.AST): boolean {
  const unwrapped = unwrapUnion(ast);
  if (unwrapped !== ast) return isBooleanAST(unwrapped);

  if (unwrapped._tag === "Boolean") return true;

  if (unwrapped.encoding && unwrapped.encoding.length > 0) {
    return isBooleanAST(unwrapped.encoding[0].to);
  }
  return false;
}

/**
 * Check if AST represents a Date type
 */
export function isDateAST(ast: AST.AST): boolean {
  const unwrapped = unwrapUnion(ast);
  if (unwrapped !== ast) return isDateAST(unwrapped);

  if (unwrapped._tag === "Declaration") {
    const tc = unwrapped.annotations?.typeConstructor as
      | { _tag?: string }
      | undefined;
    if (tc?._tag === "Date") return true;
    const id = unwrapped.annotations?.identifier;
    if (id === "Date" || id === "DateFromSelf") return true;
  }

  if (unwrapped.encoding && unwrapped.encoding.length > 0) {
    return isDateAST(unwrapped.encoding[0].to);
  }

  return false;
}

/**
 * Get xmlNamespace annotation from AST
 */
export function getXmlNamespace(ast: AST.AST): string | undefined {
  const directNs = ast.annotations?.[xmlNamespaceSymbol] as string | undefined;
  if (directNs) return directNs;

  if (ast._tag === "Suspend") {
    return getXmlNamespace(ast.thunk());
  }

  const unwrapped = unwrapUnion(ast);
  if (unwrapped !== ast) return getXmlNamespace(unwrapped);

  if (unwrapped._tag === "Declaration" && unwrapped.encoding?.length) {
    const ns = unwrapped.encoding[0].to?.annotations?.[xmlNamespaceSymbol] as
      | string
      | undefined;
    if (ns) return ns;
  }

  if (unwrapped.encoding && unwrapped.encoding.length > 0) {
    const ns = unwrapped.encoding[0].to?.annotations?.[xmlNamespaceSymbol] as
      | string
      | undefined;
    if (ns) return ns;
  }

  return unwrapped.annotations?.[xmlNamespaceSymbol] as string | undefined;
}

/**
 * Get xmlName annotation from AST (class-level)
 */
export function getXmlNameFromAST(ast: AST.AST): string | undefined {
  const directName = ast.annotations?.[xmlNameSymbol] as string | undefined;
  if (directName) return directName;

  if (ast._tag === "Suspend") {
    return getXmlNameFromAST(ast.thunk());
  }

  const unwrapped = unwrapUnion(ast);
  if (unwrapped !== ast) return getXmlNameFromAST(unwrapped);

  if (unwrapped._tag === "Declaration" && unwrapped.encoding?.length) {
    const name = unwrapped.encoding[0].to?.annotations?.[xmlNameSymbol] as
      | string
      | undefined;
    if (name) return name;
  }

  if (unwrapped.encoding && unwrapped.encoding.length > 0) {
    const name = unwrapped.encoding[0].to?.annotations?.[xmlNameSymbol] as
      | string
      | undefined;
    if (name) return name;
  }

  return unwrapped.annotations?.[xmlNameSymbol] as string | undefined;
}

/**
 * Check if AST represents a map/record type
 */
export function isMapAST(ast: AST.AST): boolean {
  const unwrapped = unwrapUnion(ast);
  if (unwrapped !== ast) return isMapAST(unwrapped);

  if (unwrapped._tag === "Objects" && unwrapped.indexSignatures?.length > 0)
    return true;

  if (unwrapped.encoding && unwrapped.encoding.length > 0) {
    return isMapAST(unwrapped.encoding[0].to);
  }
  return false;
}

/**
 * Get key and value AST from map/record type
 */
export function getMapKeyValueAST(
  ast: AST.AST,
): { keyAST: AST.AST; valueAST: AST.AST } | undefined {
  const unwrapped = unwrapUnion(ast);
  if (unwrapped !== ast) return getMapKeyValueAST(unwrapped);

  if (unwrapped._tag === "Objects" && unwrapped.indexSignatures?.length > 0) {
    const indexSig = unwrapped.indexSignatures[0];
    return {
      keyAST: indexSig.parameter,
      valueAST: indexSig.type,
    };
  }

  if (unwrapped.encoding && unwrapped.encoding.length > 0) {
    return getMapKeyValueAST(unwrapped.encoding[0].to);
  }
  return undefined;
}
