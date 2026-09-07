/**
 * Spec path resolution — the seam between a production spec mirror and a
 * local working copy of one (dev-time only).
 *
 * Every SDK package reads its specs from `packages/<pkg>/specs/`. In
 * production that directory holds a submodule of the package's mirror
 * repository, `distilled-mirror/spec-mirror-<pkg>`, whose layout is fixed:
 *
 *   packages/<pkg>/specs/spec-mirror-<pkg>/
 *   ├── .meta/          fetch-specs.ts + its package.json
 *   └── specs/          what the generator reads
 *
 * A contributor adding a provider cannot create that repository — it lives in
 * an org they have no write access to, and it is only created once the
 * `distilled-submodules` stack deploys on merge to main. So `pnpm specs:local
 * <pkg>` runs the same `fetch-specs.ts` into a gitignored directory shaped
 * exactly like the mirror:
 *
 *   packages/<pkg>/specs/.local/
 *   ├── .meta/
 *   └── specs/
 *
 * Setting {@link LOCAL_ENV} then re-roots every spec read into it. Nothing in
 * the package's source changes — the `specPath` a `convert.ts` declares stays
 * the production one — so there is no `.local` reference that could be
 * committed by accident, and the switch is impossible to leave on: it lives
 * in the environment of one command, never in a file.
 *
 * The opt-in is deliberate rather than a fallback-when-missing. A silent
 * fallback would regenerate an SDK from a stale `.local` copy the moment a
 * submodule failed to check out, and the result — committed, formatted,
 * plausible — would be indistinguishable from a real regeneration.
 */
import * as fs from "node:fs";
import * as path from "node:path";

/** Set to a non-empty value to read specs from `specs/.local` instead. */
export const LOCAL_ENV = "DISTILLED_SPECS_LOCAL";

/** The local working copy of a mirror, relative to a package root. */
export const LOCAL_DIR = path.join("specs", ".local");

/** Repository name of the mirror feeding `packages/<pkg>`. */
export const mirrorRepositoryName = (pkg: string) => `spec-mirror-${pkg}`;

/** Whether this process reads specs from `specs/.local`. */
export const isLocalSpecs = (): boolean =>
  (process.env[LOCAL_ENV] ?? "").trim() !== "";

let announced = false;

/**
 * The path within a mirror's `specs/` directory that `specPath` names.
 *
 * Spec paths take one of two shapes — `specs/<mirror>/specs/<tail>` for a
 * submodule and `specs/<tail>` for a committed file — and in both the tail is
 * everything after the LAST `specs` segment. That one rule covers the
 * submodule form, the committed form, the nested forms
 * (`specs/<mirror>/specs/models/<service>/...`) and the directory form
 * (`specs/<mirror>/specs`, whose tail is empty — the mirror's `specs/`
 * directory itself) without needing to know which it was handed.
 *
 * `undefined` means there is no `specs` segment at all, which local mode
 * cannot interpret.
 */
const tailWithinSpecs = (specPath: string): string | undefined => {
  const segments = specPath.split(/[/\\]/).filter((s) => s !== "" && s !== ".");
  const last = segments.lastIndexOf("specs");
  if (last === -1) return undefined;
  return segments.slice(last + 1).join(path.sep);
};

/**
 * Resolve a package-relative spec path to an absolute one.
 *
 * @param root      absolute package root (`path.resolve(import.meta.dir, "..")`)
 * @param specPath  the production path, relative to `root` (or absolute)
 */
export const resolveSpecPath = (root: string, specPath: string): string => {
  const production = path.resolve(root, specPath);
  if (!isLocalSpecs() || path.isAbsolute(specPath)) return production;

  const tail = tailWithinSpecs(specPath);
  if (tail === undefined) {
    throw new Error(
      `${LOCAL_ENV} is set, but "${specPath}" has no \`specs/\` segment to ` +
        `re-root. Local mode only understands paths under the package's ` +
        `specs/ directory.`,
    );
  }

  if (!announced) {
    announced = true;
    // stderr, not stdout: generate-all captures stdout per package and only
    // prints it on failure, and this is exactly the line you need to see on
    // a run that succeeded against the wrong specs.
    console.error(
      `⚠  ${LOCAL_ENV} — reading specs from ${LOCAL_DIR}, not the mirror submodule.`,
    );
  }

  const local = path.join(root, LOCAL_DIR, "specs", tail);
  if (!fs.existsSync(local)) {
    // A missing local spec is a setup mistake, not a generator bug, and the
    // ENOENT the caller would otherwise raise names a path nobody recognises.
    throw new Error(
      `${local} does not exist. Materialise this package's mirror first:\n` +
        `  pnpm specs:local ${path.basename(root)}\n` +
        `If that succeeds and this path is still missing, the package's ` +
        `declared spec path (${specPath}) is not mirror-shaped yet — it must ` +
        `read \`specs/<mirror>/specs/<file>\` for local mode to find it.`,
    );
  }
  return local;
};
