#!/usr/bin/env bun
/**
 * Fetches Google Workspace API discovery documents (all versions) to ../specs/.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Source: Google's API Discovery Service
 *   https://www.googleapis.com/discovery/v1/apis
 *
 * The directory lists every Google API. This script keeps only the names on
 * https://developers.google.com/workspace/guides/enable-apis (plus
 * workspaceevents, which is first-party Workspace and listed in discovery).
 *
 * Discovery docs are saved to:
 *   ../specs/{name}-{version}.json
 *
 * Also saves:
 *   ../specs/_directory.json   – filtered directory listing
 *   ../specs/_manifest.json    – manifest of successfully fetched specs
 */

import { mkdirSync } from "fs";

const DISCOVERY_URL = "https://www.googleapis.com/discovery/v1/apis";
const SPECS_DIR = "../specs";

mkdirSync(SPECS_DIR, { recursive: true });

/**
 * Discovery `name` values for Google Workspace APIs. Drawn from the product
 * table at https://developers.google.com/workspace/guides/enable-apis
 * (admin.googleapis.com → `admin`, calendar-json.googleapis.com → `calendar`,
 * …). Names not present in the directory are simply skipped.
 */
const WORKSPACE_NAMES = new Set([
  "admin",
  "alertcenter",
  "appsmarket",
  "calendar",
  "chat",
  "classroom",
  "cloudidentity",
  "cloudsearch",
  "docs",
  "drive",
  "driveactivity",
  "drivelabels",
  "forms",
  "gmail",
  "gmailpostmastertools",
  "groupsmigration",
  "groupssettings",
  "gsuiteaddons",
  "keep",
  "licensing",
  "meet",
  "people",
  "reseller",
  "script",
  "sheets",
  "slides",
  "tasks",
  "vault",
  "workspaceevents",
]);

interface DirectoryItem {
  kind: string;
  id: string;
  name: string;
  version: string;
  title: string;
  description: string;
  discoveryRestUrl: string;
  preferred: boolean;
}

interface DirectoryResponse {
  kind: string;
  discoveryVersion: string;
  items: DirectoryItem[];
}

interface DiscoveryDoc {
  kind?: string;
  name?: string;
  version?: string;
  resources?: unknown;
  methods?: unknown;
}

const isDiscoveryDoc = (doc: unknown): doc is DiscoveryDoc => {
  if (typeof doc !== "object" || doc === null) return false;
  const d = doc as DiscoveryDoc;
  return (
    d.kind === "discovery#restDescription" &&
    typeof d.name === "string" &&
    typeof d.version === "string" &&
    (d.resources !== undefined || d.methods !== undefined)
  );
};

const writeJson = async (filepath: string, value: unknown): Promise<void> => {
  await Bun.write(filepath, JSON.stringify(value, null, 2) + "\n");
};

const concurrency = 20;

async function main() {
  console.log("Fetching Google API directory...");

  const dirResponse = await fetch(DISCOVERY_URL);
  if (!dirResponse.ok) {
    throw new Error(
      `Failed to fetch directory: ${dirResponse.status} ${dirResponse.statusText}`,
    );
  }
  const directory: DirectoryResponse = await dirResponse.json();
  if (!Array.isArray(directory.items)) {
    throw new Error("Discovery directory response is missing items[]");
  }

  const items = directory.items
    .filter((item) => WORKSPACE_NAMES.has(item.name))
    .sort((a, b) =>
      `${a.name}:${a.version}`.localeCompare(`${b.name}:${b.version}`),
    );

  const filteredDirectory: DirectoryResponse = {
    kind: directory.kind,
    discoveryVersion: directory.discoveryVersion,
    items,
  };
  await writeJson(`${SPECS_DIR}/_directory.json`, filteredDirectory);

  console.log(
    `Found ${directory.items.length} API entries; keeping ${items.length} Workspace APIs`,
  );
  console.log(`Fetching ${items.length} discovery documents...`);

  let fetched = 0;
  let failed = 0;
  const errors: string[] = [];

  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    await Promise.allSettled(
      batch.map(async (item) => {
        const filename = `${item.name}-${item.version}.json`;
        const filepath = `${SPECS_DIR}/${filename}`;

        try {
          const response = await fetch(item.discoveryRestUrl);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          const doc: unknown = await response.json();
          if (!isDiscoveryDoc(doc)) {
            throw new Error(
              "response is not a discovery#restDescription with resources/methods",
            );
          }
          await writeJson(filepath, doc);
          fetched++;
        } catch (err) {
          failed++;
          errors.push(`Failed: ${item.name}@${item.version}: ${err}`);
        }
      }),
    );

    const pct = Math.round(((i + batch.length) / items.length) * 100);
    process.stdout.write(
      `\r  Progress: ${fetched + failed}/${items.length} (${pct}%) - ${fetched} ok, ${failed} failed`,
    );
  }

  console.log();

  if (errors.length > 0) {
    console.log("\nFailed fetches:");
    for (const err of errors) {
      console.log(`  ${err}`);
    }
  }

  const manifest = items
    .filter((item) => {
      try {
        return (
          Bun.file(`${SPECS_DIR}/${item.name}-${item.version}.json`).size > 0
        );
      } catch {
        return false;
      }
    })
    .map((item) => ({
      name: item.name,
      version: item.version,
      title: item.title,
      preferred: item.preferred,
      filename: `${item.name}-${item.version}.json`,
    }));

  await writeJson(`${SPECS_DIR}/_manifest.json`, manifest);

  console.log(`\nDone! ${fetched} specs saved to specs/, ${failed} failed.`);
  console.log(`Manifest: ${SPECS_DIR}/_manifest.json`);

  if (fetched === 0) {
    throw new Error("no Workspace discovery documents were written");
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
