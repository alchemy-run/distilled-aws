#!/usr/bin/env bun
/**
 * generate-all — regenerate every SDK in the monorepo, then format.
 *
 * For each packages/<p> with a `generate` script: runs `convert` first when
 * the package has one (openapi/discovery/graphql providers convert their
 * spec submodule into .generated-specs), then `generate` (the shared
 * smithy→SDK compiler). Packages run through a small pool; a single
 * repo-wide `oxfmt` pass runs at the end (generated output is committed
 * formatted — never diff regeneration results before formatting).
 *
 * Usage: bun run generate            # all packages
 *        bun run generate neon aws   # just these packages
 */
import { readdirSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dir, "..");
const only = new Set(process.argv.slice(2));

interface Job {
  name: string;
  steps: string[]; // package.json script names, in order
}

const jobs: Job[] = [];
for (const name of readdirSync(join(root, "packages")).sort()) {
  if (only.size && !only.has(name)) continue;
  const pkgJson = join(root, "packages", name, "package.json");
  if (!existsSync(pkgJson)) continue;
  const scripts = JSON.parse(readFileSync(pkgJson, "utf8")).scripts ?? {};
  if (!scripts.generate) continue;
  const steps = ["convert", "generate"].filter((s) => scripts[s]);
  jobs.push({ name, steps });
}

if (jobs.length === 0) {
  console.error(
    only.size
      ? `no matching packages: ${[...only].join(", ")}`
      : "no packages with a generate script",
  );
  process.exit(1);
}

console.log(
  `generating ${jobs.length} package(s): ${jobs.map((j) => j.name).join(", ")}`,
);

const CONCURRENCY = 4;
const failures: string[] = [];
const queue = [...jobs];

const runJob = async (job: Job) => {
  const t0 = performance.now();
  for (const step of job.steps) {
    const proc = Bun.spawn(["bun", "run", step], {
      cwd: join(root, "packages", job.name),
      stdout: "pipe",
      stderr: "pipe",
    });
    const [out, err, code] = await Promise.all([
      new Response(proc.stdout).text(),
      new Response(proc.stderr).text(),
      proc.exited,
    ]);
    if (code !== 0) {
      failures.push(job.name);
      console.error(
        `❌ ${job.name} ${step} (exit ${code})\n${(out + err).split("\n").slice(-15).join("\n")}`,
      );
      return;
    }
  }
  console.log(
    `✅ ${job.name} (${job.steps.join("+")}, ${((performance.now() - t0) / 1000).toFixed(1)}s)`,
  );
};

await Promise.all(
  Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
    for (let job = queue.shift(); job; job = queue.shift()) await runJob(job);
  }),
);

if (failures.length) {
  console.error(
    `\n${failures.length} package(s) failed: ${failures.join(", ")}`,
  );
  process.exit(1);
}

console.log("\nformatting…");
const fmt = Bun.spawn(["bun", "run", "format"], {
  cwd: root,
  stdout: "inherit",
  stderr: "inherit",
});
process.exit(await fmt.exited);
