/**
 * JSON Patch (RFC 6902) Implementation
 *
 * Provides a unified spec patching system for all SDKs. Patches are applied to
 * generated intermediary specs (Smithy models, OpenAPI docs, …) before code
 * generation to add typed error shapes, rename operations, mark nullable
 * fields, etc. Ported from the distilled repo's `core/json-patch`.
 *
 * Pure functions only — callers load patch files themselves (the generators
 * use Effect's FileSystem) and hand the parsed operations to `applyPatch`.
 */

// ============================================================================
// Types
// ============================================================================

export interface JsonPatchOperation {
  op: "add" | "remove" | "replace" | "move" | "copy" | "test";
  path: string;
  value?: unknown;
  from?: string;
}

export type JsonPatch = JsonPatchOperation[];

export interface PatchFile {
  description?: string;
  patches: JsonPatch;
}

// ============================================================================
// JSON Pointer (RFC 6901)
// ============================================================================

/** Parse a JSON Pointer (RFC 6901) path into segments. */
export function parseJsonPointer(pointer: string): string[] {
  if (pointer === "") return [];
  if (!pointer.startsWith("/")) {
    throw new Error(`Invalid JSON Pointer: ${pointer}`);
  }
  return pointer
    .slice(1)
    .split("/")
    .map((segment) => segment.replace(/~1/g, "/").replace(/~0/g, "~"));
}

/** Get a value at a JSON Pointer path. */
export function getValueAtPath(obj: unknown, pointer: string): unknown {
  const segments = parseJsonPointer(pointer);
  let current: unknown = obj;

  for (const segment of segments) {
    if (current === null || typeof current !== "object") {
      throw new Error(`Cannot traverse path ${pointer}: not an object`);
    }
    if (Array.isArray(current)) {
      const index = segment === "-" ? current.length : parseInt(segment, 10);
      current = current[index];
    } else {
      current = (current as Record<string, unknown>)[segment];
    }
  }

  return current;
}

/** Set a value at a JSON Pointer path. */
export function setValueAtPath(
  obj: unknown,
  pointer: string,
  value: unknown,
): void {
  const segments = parseJsonPointer(pointer);
  if (segments.length === 0) {
    throw new Error("Cannot set value at root path");
  }

  let current: unknown = obj;

  for (let i = 0; i < segments.length - 1; i++) {
    const segment = segments[i]!;
    if (current === null || typeof current !== "object") {
      throw new Error(`Cannot traverse path ${pointer}: not an object`);
    }
    if (Array.isArray(current)) {
      current = current[parseInt(segment, 10)];
    } else {
      current = (current as Record<string, unknown>)[segment];
    }
  }

  const lastSegment = segments[segments.length - 1]!;
  if (current === null || typeof current !== "object") {
    throw new Error(
      `Cannot set value at path ${pointer}: parent is not an object`,
    );
  }

  if (Array.isArray(current)) {
    if (lastSegment === "-") {
      current.push(value);
    } else {
      current[parseInt(lastSegment, 10)] = value;
    }
  } else {
    (current as Record<string, unknown>)[lastSegment] = value;
  }
}

/** Remove a value at a JSON Pointer path. */
export function removeValueAtPath(obj: unknown, pointer: string): void {
  const segments = parseJsonPointer(pointer);
  if (segments.length === 0) {
    throw new Error("Cannot remove root");
  }

  let current: unknown = obj;

  for (let i = 0; i < segments.length - 1; i++) {
    const segment = segments[i]!;
    if (current === null || typeof current !== "object") {
      throw new Error(`Cannot traverse path ${pointer}: not an object`);
    }
    if (Array.isArray(current)) {
      current = current[parseInt(segment, 10)];
    } else {
      current = (current as Record<string, unknown>)[segment];
    }
  }

  const lastSegment = segments[segments.length - 1]!;
  if (current === null || typeof current !== "object") {
    throw new Error(
      `Cannot remove at path ${pointer}: parent is not an object`,
    );
  }

  if (Array.isArray(current)) {
    current.splice(parseInt(lastSegment, 10), 1);
  } else {
    delete (current as Record<string, unknown>)[lastSegment];
  }
}

// ============================================================================
// Patch Operations
// ============================================================================

/** Apply a single JSON Patch operation (mutates `obj` in place). */
export function applyOperation(
  obj: unknown,
  operation: JsonPatchOperation,
): void {
  switch (operation.op) {
    case "add":
      setValueAtPath(obj, operation.path, operation.value);
      break;
    case "remove":
      removeValueAtPath(obj, operation.path);
      break;
    case "replace":
      // For replace, the path must exist
      getValueAtPath(obj, operation.path); // throws if doesn't exist
      setValueAtPath(obj, operation.path, operation.value);
      break;
    case "move": {
      if (!operation.from) throw new Error("move operation requires 'from'");
      const moveValue = getValueAtPath(obj, operation.from);
      if (moveValue === undefined) {
        throw new Error(
          `Cannot move from path ${operation.from}: not an object`,
        );
      }
      removeValueAtPath(obj, operation.from);
      setValueAtPath(obj, operation.path, moveValue);
      break;
    }
    case "copy": {
      if (!operation.from) throw new Error("copy operation requires 'from'");
      const copyValue = getValueAtPath(obj, operation.from);
      setValueAtPath(
        obj,
        operation.path,
        JSON.parse(JSON.stringify(copyValue)),
      );
      break;
    }
    case "test": {
      const testValue = getValueAtPath(obj, operation.path);
      if (JSON.stringify(testValue) !== JSON.stringify(operation.value)) {
        throw new Error(
          `Test operation failed at ${operation.path}: expected ${JSON.stringify(operation.value)}, got ${JSON.stringify(testValue)}`,
        );
      }
      break;
    }
    default:
      throw new Error(`Unknown operation: ${(operation as { op: string }).op}`);
  }
}

/** Apply a JSON Patch to an object (mutates in place). */
export function applyPatch(obj: unknown, patch: JsonPatch): void {
  for (const operation of patch) {
    applyOperation(obj, operation);
  }
}

/**
 * Whether a per-operation failure is caused by the target location being
 * absent from the spec (i.e. spec drift — the operation/shape the patch
 * targets was renamed or removed upstream) as opposed to a malformed patch.
 * Stale targets should be skipped with a warning rather than aborting the
 * whole generate; a patch that only adds an error to an operation that no
 * longer exists is harmless to drop.
 */
export function isStaleTargetError(message: string): boolean {
  return (
    message.includes("not an object") ||
    message.includes("parent is not an object")
  );
}
