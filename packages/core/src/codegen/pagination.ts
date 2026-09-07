/**
 * Shared pagination-trait handling for the SDK generators (dev-time only).
 *
 * Both SDKs source `smithy.api#paginated`; AWS merges operation-level
 * config over service-level defaults, cloudflare validates the trait
 * against the operation's actual members (degrading to a plain op when it
 * can't work). Both behaviors live here.
 */
import type { PaginatedTrait } from "../pagination.ts";

/**
 * Merge an operation-level paginated trait over service-level defaults
 * (Smithy semantics: operations may specify partial pagination and inherit
 * the rest from the service).
 */
export const mergePaginated = (
  op: Partial<PaginatedTrait> | undefined,
  service: Partial<PaginatedTrait> | undefined,
): PaginatedTrait | undefined => {
  if (!op) return undefined;
  const merged = {
    mode: op.mode ?? service?.mode,
    inputToken: op.inputToken ?? service?.inputToken,
    outputToken: op.outputToken ?? service?.outputToken,
    items: op.items ?? service?.items,
    pageSize: op.pageSize ?? service?.pageSize,
  };
  return Object.fromEntries(
    Object.entries(merged).filter(([, v]) => v !== undefined),
  ) as PaginatedTrait;
};

export interface ValidatePaginatedOptions {
  readonly trait: Partial<PaginatedTrait>;
  /** TS-facing member names of the operation input shape. */
  readonly inputNames: ReadonlySet<string>;
  /** TS-facing member names of the operation output shape. */
  readonly outputNames: ReadonlySet<string>;
  /** Items path fallback when the trait omits `items` (e.g. `"result"`). */
  readonly itemsFallback?: string;
  /** Output names accepted even when not modeled (e.g. `"resultInfo"`). */
  readonly syntheticOutputs?: ReadonlySet<string>;
}

export interface ValidatedPagination {
  readonly ok: boolean;
  /** Root member of the items path (`"result.items"` → `"result"`). */
  readonly itemsRoot: string;
}

/**
 * A paginated op must actually carry its page/cursor token on the input
 * and its items member on the output — otherwise `.pages()` would loop or
 * yield nothing. Returns the items-path root for emitters that promote it
 * to required.
 */
export const validatePaginated = (
  o: ValidatePaginatedOptions,
): ValidatedPagination => {
  const itemsRoot = String(o.trait.items ?? o.itemsFallback ?? "").split(
    ".",
  )[0];
  const tokenOk =
    o.trait.mode === "single" ||
    (typeof o.trait.inputToken === "string" &&
      o.inputNames.has(o.trait.inputToken));
  const itemsOk =
    o.outputNames.has(itemsRoot) ||
    (o.syntheticOutputs?.has(itemsRoot) ?? false);
  return { ok: tokenOk && itemsOk, itemsRoot };
};
