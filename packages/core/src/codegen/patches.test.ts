import { describe, expect, test } from "bun:test";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  FINALIZED_KEY,
  danglingTargets,
  finalizeConvert,
  syncServiceOperations,
} from "./patches.ts";

const model = () => ({
  smithy: "2.0",
  shapes: {
    "ns#Svc": {
      type: "service",
      operations: [{ target: "ns#AppsList" }, { target: "ns#AppsGet" }],
    },
    "ns#AppsList": {
      type: "operation",
      input: { target: "ns#AppsListRequest" },
      output: { target: "smithy.api#Unit" },
    },
    "ns#AppsListRequest": { type: "structure", members: {} },
    "ns#AppsGet": {
      type: "operation",
      input: { target: "smithy.api#Unit" },
      output: { target: "smithy.api#Unit" },
    },
  },
});

const scaffold = (patches?: Record<string, unknown>) => {
  const root = mkdtempSync(join(tmpdir(), "finalize-"));
  mkdirSync(join(root, ".generated-specs"));
  writeFileSync(
    join(root, ".generated-specs", "svc.json"),
    JSON.stringify(model()),
  );
  if (patches) {
    mkdirSync(join(root, "patches", "svc"), { recursive: true });
    writeFileSync(
      join(root, "patches", "svc", "a.json"),
      JSON.stringify(patches),
    );
  }
  return root;
};

const read = (root: string) =>
  JSON.parse(readFileSync(join(root, ".generated-specs", "svc.json"), "utf8"));

describe("finalizeConvert", () => {
  test("renames, syncs the service list, stamps the marker", async () => {
    const root = scaffold();
    await finalizeConvert({ root });
    const m = read(root);
    expect(Object.keys(m.shapes).sort()).toEqual(
      ["ns#Svc", "ns#ListApps", "ns#ListAppsRequest", "ns#GetApp"].sort(),
    );
    expect(m.shapes["ns#Svc"].operations).toEqual([
      { target: "ns#ListApps" },
      { target: "ns#GetApp" },
    ]);
    expect(m.metadata[FINALIZED_KEY]).toBe(true);
  });

  test("refuses a second pass", async () => {
    const root = scaffold();
    await finalizeConvert({ root });
    await expect(finalizeConvert({ root })).rejects.toThrow(
      /already finalized/,
    );
  });

  test("applies Smithy patches and repairs the service list after a move", async () => {
    const root = scaffold({
      patches: [
        { op: "move", from: "/shapes/ns#AppsGet", path: "/shapes/ns#FetchApp" },
      ],
    });
    await finalizeConvert({ root });
    const m = read(root);
    expect(m.shapes["ns#FetchApp"]).toBeDefined();
    expect(m.shapes["ns#Svc"].operations.map((o: any) => o.target)).toEqual([
      "ns#ListApps",
      "ns#FetchApp",
    ]);
  });

  test("fails on a stale patch pointer by default", async () => {
    const root = scaffold({
      patches: [{ op: "remove", path: "/shapes/ns#Missing" }],
    });
    await expect(finalizeConvert({ root })).rejects.toThrow(/failed/);
  });

  test("fails on dangling targets and leaves the model unstamped", async () => {
    const root = scaffold({
      patches: [
        {
          op: "replace",
          path: "/shapes/ns#AppsList/output/target",
          value: "ns#Nope",
        },
      ],
    });
    await expect(finalizeConvert({ root })).rejects.toThrow(/do not exist/);
    expect(read(root).metadata?.[FINALIZED_KEY]).toBeUndefined();
  });
});

describe("danglingTargets", () => {
  test("ignores prelude ids", () => {
    expect(danglingTargets(model())).toEqual([]);
  });
});

describe("syncServiceOperations", () => {
  test("drops missing and appends unlisted, keeping order", () => {
    const m = model();
    delete (m.shapes as any)["ns#AppsGet"];
    (m.shapes as any)["ns#Zed"] = { type: "operation" };
    expect(syncServiceOperations(m)).toBe(1);
    expect((m.shapes as any)["ns#Svc"].operations).toEqual([
      { target: "ns#AppsList" },
      { target: "ns#Zed" },
    ]);
  });
});
