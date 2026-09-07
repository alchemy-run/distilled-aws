#!/usr/bin/env bun
/**
 * Fetches Forgejo's Swagger 2.0 API description to ../specs/.
 *
 * Forgejo publishes no standalone spec artefact. Every running instance
 * serves the document describing ITS version at `/swagger.v1.json`, and the
 * source of that document is a Go template checked into the Forgejo
 * repository at `templates/swagger/v1_json.tmpl` — plain JSON apart from two
 * placeholders the server fills in at request time (`{{AppVer | JSEscape}}`
 * in `info.version`, `{{AppSubUrl | JSEscape}}` in `basePath`).
 *
 * The mirror snapshots that template at a RELEASE TAG, so the spec is pinned
 * to a version rather than to whatever a public instance happens to be
 * running (Codeberg serves nightly builds). The placeholders are substituted
 * the way the server renders them for a root-mounted instance: the version
 * becomes the tag without its `v`, and the sub-URL is empty so `basePath` is
 * `/api/v1`. Bump FORGEJO_VERSION to move the SDK to a newer release.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * The spec is saved to:
 *   ../specs/forgejo.spec.json
 */

const FORGEJO_VERSION = "v16.0.3";
const TEMPLATE_URL = `https://codeberg.org/forgejo/forgejo/raw/tag/${FORGEJO_VERSION}/templates/swagger/v1_json.tmpl`;
const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/forgejo.spec.json`;

import { existsSync, mkdirSync } from "fs";

// Ensure the specs directory exists
if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

async function main() {
  console.log(
    `Fetching Forgejo ${FORGEJO_VERSION} swagger template from ${TEMPLATE_URL}...`,
  );

  const response = await fetch(TEMPLATE_URL, {
    headers: {
      accept: "application/json",
      "user-agent": "distilled.cloud-forgejo-spec-mirror",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch swagger template: ${response.status} ${response.statusText}`,
    );
  }

  const rendered = (await response.text())
    .replaceAll("{{AppVer | JSEscape}}", FORGEJO_VERSION.replace(/^v/, ""))
    .replaceAll("{{AppSubUrl | JSEscape}}", "");

  const spec = JSON.parse(rendered) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still valid JSON, but it is not a Swagger document.
  if (spec.swagger !== "2.0" || spec.paths === undefined) {
    throw new Error(
      `${TEMPLATE_URL} returned JSON without \`swagger: "2.0"\`/\`paths\` — not a Forgejo Swagger document`,
    );
  }

  console.log(`Writing spec to ${OUTPUT_PATH}...`);
  // 2-space indent + trailing newline, so a whitespace-only change upstream
  // produces no diff.
  await Bun.write(OUTPUT_PATH, JSON.stringify(spec, null, 2) + "\n");

  const info = spec.info as { version?: string } | undefined;
  console.log(
    `Done! Forgejo ${info?.version ?? "?"} — ${Object.keys(spec.paths as object).length} paths`,
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
