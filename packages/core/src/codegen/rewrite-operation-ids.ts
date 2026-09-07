/**
 * Operation naming (dev-time only).
 *
 * Distilled SDK operations are verbNoun (`listApps`, `getApp`,
 * `createMachine`). Upstream ids come in a handful of shapes and
 * {@link toVerbNoun} only reorders the ones it can recognise with confidence:
 *
 *   - go-swagger `Resource_action` / `Resource_Sub_action` (`Apps_list`)
 *   - REST `NounsAction` with a trailing CRUD verb (`ConfigsList`,
 *     `ContainerCreate`, `ServiceMembers_getMetrics`)
 *   - GraphQL `nounAction` (`projectCreate`)
 *   - `show` → `get`, `index` → `list`, `retrieve` → `get`
 *
 * Anything else is left as-is (lowerFirst only). Reordering a verb out of
 * the middle of an id (`WatchCoreV1PodList` → `listWatch…`) produced worse
 * names than the input, so it is not attempted; per-package
 * {@link OperationIdRewrite} maps cover the tail.
 *
 * RFC-6902 patches that target `/paths/~1foo/get/operationId` break the
 * moment upstream prefixes paths. Naming is a convert policy, not a patch.
 */
export interface OperationIdContext {
  readonly path: string;
  readonly method: string;
}

/**
 * Return the new operation name, or `undefined` to leave the current value.
 * A `Record` is looked up by `"METHOD path"` first, then the spec's
 * `operationId` — same id on PUT vs PATCH needs the path key.
 */
export type OperationIdRewrite =
  | Readonly<Record<string, string>>
  | ((operationId: string, ctx: OperationIdContext) => string | undefined);

/** Verb spellings normalised on the way out. */
const VERB_ALIAS: Readonly<Record<string, string>> = {
  show: "get",
  index: "list",
  retrieve: "get",
};

/**
 * Unambiguous verbs. An id that STARTS with one is already verb-first and
 * is never reordered (`WatchPodList`, `InsertCalendarList`,
 * `BulkDeleteMessages`); one found in the middle of a resource name
 * (`Apps_getOrCreate`) marks the id as a compound we leave alone.
 */
const STRONG_VERBS = new Set([
  "get",
  "list",
  "create",
  "delete",
  "update",
  "patch",
  "put",
  "post",
  "show",
  "index",
  "retrieve",
  "watch",
  "read",
  "replace",
  "connect",
  "disconnect",
  "insert",
  "mutate",
  "fetch",
  "remove",
  "add",
  "upload",
  "download",
  "send",
  "resend",
  "validate",
  "verify",
  "enable",
  "disable",
  "start",
  "stop",
  "restart",
  "cancel",
  "search",
  "purge",
  "revoke",
  "approve",
  "reject",
  "accept",
  "invoke",
  "trigger",
  "deploy",
  "redeploy",
  "describe",
  "generate",
  "regenerate",
  "rotate",
  "restore",
  "suspend",
  "resume",
  "activate",
  "deactivate",
  "archive",
  "unarchive",
  "publish",
  "unpublish",
  "subscribe",
  "unsubscribe",
  "register",
  "unregister",
  "authenticate",
  "authorize",
  "deauthorize",
  "attach",
  "detach",
  "assign",
  "unassign",
  "import",
  "export",
  "copy",
  "move",
  "rename",
  "retry",
  "reset",
  "refresh",
  "encrypt",
  "decrypt",
  "sign",
  "edit",
  "bulk",
  "execute",
  "submit",
  "apply",
  "undelete",
  "redeliver",
  "invalidate",
  "upsert",
  "cordon",
  "uncordon",
  "exec",
  "reclaim",
  "modify",
  "install",
  "uninstall",
  "migrate",
  "terminate",
  "reboot",
  "rebuild",
  "resize",
  "clone",
  "duplicate",
  "acknowledge",
  "unpause",
  "unblock",
  "unlink",
  "unpin",
  "unmute",
  "unhide",
  "unstar",
  "unfollow",
  "unshare",
  "unban",
  "unlock",
  "unflag",
  "unclaim",
]);

/**
 * Words that act as the verb when they TRAIL a resource (`MachinesStart`,
 * `SecretkeysSet`, `JobsRun`) but are ordinary nouns when they lead
 * (`ReleaseGet`, `RequestGet`, `SetGet`, `CheckRunsList`). Includes every
 * strong verb.
 */
const TRAILING_VERBS = new Set([
  ...STRONG_VERBS,
  "set",
  "check",
  "run",
  "wait",
  "signal",
  "fork",
  "extend",
  "test",
  "sync",
  "review",
  "invite",
  "join",
  "leave",
  "capture",
  "refund",
  "settle",
  "void",
  "preview",
  "complete",
  "confirm",
  "abort",
  "kill",
  "scale",
  "promote",
  "demote",
  "renew",
  "recover",
  "reveal",
  "presign",
  "provision",
  "trim",
  "vacuum",
  "compact",
  "flush",
  "merge",
  "dispatch",
  "notify",
  "poll",
  "redeem",
  "claim",
  "lint",
  "toggle",
  "pin",
  "mute",
  "hide",
  "ban",
  "block",
  "lock",
  "share",
  "follow",
  "star",
  "pause",
  "finalize",
  "transfer",
  "lookup",
  "clear",
  "convert",
  "dismiss",
  "reply",
  "squash",
  "commit",
  "swap",
  "recreate",
  "seal",
  "ping",
  "login",
  "logout",
]);

/**
 * Leading tokens that are verbs often enough that an id starting with one
 * is left as-is unless a STRONG verb trails it (`QueryCreate` →
 * `createQuery`, but `QueryRun` stays).
 */
const WEAK_LEADING_VERBS = new Set([
  ...TRAILING_VERBS,
  "request",
  "release",
  "report",
  "query",
  "stream",
  "open",
  "close",
  "head",
  "options",
  "compute",
  "batch",
  "count",
  "link",
  "mark",
  "grant",
  "aggregate",
  "skip",
  "filter",
  "change",
  "vote",
  "debug",
  "expire",
  "issue",
  "process",
  "redirect",
  "estimate",
  "calculate",
  "evaluate",
  "resolve",
  "load",
  "unload",
  "backup",
  "snapshot",
  "rollback",
  "flag",
  "certify",
  "checkout",
  "checkin",
  "suggest",
  "predict",
  "analyze",
  "annotate",
  "translate",
  "recognize",
  "detect",
  "classify",
  "simulate",
  "take",
  "end",
  "reassign",
  "consume",
  "prepare",
  "action",
  "act",
  "ask",
  "answer",
  "handle",
  "trace",
  "track",
  "log",
]);

/** Compound tokens the naive split would leave as `Secretkeys`. */
const TOKEN_ALIAS: Readonly<Record<string, string>> = {
  secretkeys: "SecretKeys",
  secretkey: "SecretKey",
};

const IRREGULAR_SINGULAR: Readonly<Record<string, string>> = {
  processes: "process",
  statuses: "status",
  addresses: "address",
  aliases: "alias",
  indexes: "index",
  indices: "index",
  matrices: "matrix",
  vertices: "vertex",
  analyses: "analysis",
  bases: "base",
  cases: "case",
  databases: "database",
  releases: "release",
  responses: "response",
  licenses: "license",
  courses: "course",
  purchases: "purchase",
  phases: "phase",
  leases: "lease",
  clauses: "clause",
  causes: "cause",
  pauses: "pause",
  houses: "house",
  children: "child",
  people: "person",
  media: "media",
  data: "data",
  metadata: "metadata",
  schemas: "schema",
  criteria: "criterion",
  feet: "foot",
  teeth: "tooth",
  mice: "mouse",
  geese: "goose",
};

/**
 * Nouns whose plural and singular coincide, or product names that end in
 * `s`. Never trimmed.
 */
const UNCOUNTABLE = new Set([
  "postgres",
  "redis",
  "kubernetes",
  "ios",
  "macos",
  "windows",
  "dns",
  "tls",
  "https",
  "sms",
  "cors",
  "oidc",
  "sso",
  "saas",
  "aws",
  "gcs",
  "ecs",
  "eks",
  "rds",
  "sqs",
  "sns",
  "kms",
  "ses",
  "efs",
  "ebs",
  "status",
  "series",
  "timeseries",
  "analytics",
  "metrics",
  "settings",
  "credentials",
  "permissions",
  "news",
  "canvas",
  "lens",
  "bonus",
  "campus",
  "census",
  "focus",
  "virus",
  "corpus",
  "chorus",
  "genus",
  "radius",
  "consensus",
  "apparatus",
  "bus",
  "gas",
  "plus",
  "minus",
  "nexus",
  "prometheus",
  "chaos",
  "cosmos",
  "ethos",
  "pathos",
  "atlas",
  "bias",
  "gps",
  "cds",
  "css",
  "sass",
  "less",
  "js",
  "ts",
  "os",
  "fs",
  "vs",
  "as",
  "is",
  "has",
  "was",
  "this",
  "always",
  "sis",
  "axis",
  "basis",
  "crisis",
  "thesis",
  "diagnosis",
  "synthesis",
  "emphasis",
  "hypothesis",
  "oasis",
  "iris",
  "tennis",
  "chassis",
  "debris",
  "physics",
  "ethics",
  "economics",
  "logistics",
  "mathematics",
  "politics",
  "statistics",
  "dynamics",
  "graphics",
  "robotics",
  "genetics",
  "linguistics",
  "means",
  "species",
  "sheep",
  "fish",
  "deer",
  "aircraft",
  "software",
  "hardware",
  "firmware",
  "middleware",
  "access",
  "address",
  "progress",
  "success",
  "process",
  "business",
  "ingress",
  "egress",
  "express",
  "compress",
  "stress",
  "witness",
  "fitness",
  "wellness",
  "readiness",
  "liveness",
  "awareness",
  "class",
  "pass",
  "mass",
  "glass",
  "grass",
  "bypass",
  "compass",
  "kms",
  "eos",
  "nas",
  "ras",
  "sas",
  "das",
  "pas",
  "s3",
  "k8s",
  "kubeadm",
]);

/** Certificate variants that sit in front of the resource noun. */
const QUALIFIERS = new Set(["acme", "custom"]);

export const operationNameKey = (ctx: OperationIdContext): string =>
  `${ctx.method.toUpperCase()} ${ctx.path}`;

/** Resolve {@link OperationIdRewrite} against method+path, then operationId. */
export const resolveOperationName = (
  rewrite: OperationIdRewrite,
  operationId: string,
  ctx: OperationIdContext,
): string | undefined => {
  if (typeof rewrite === "function") return rewrite(operationId, ctx);
  return rewrite[operationNameKey(ctx)] ?? rewrite[operationId];
};

/** `foo` → `Foo`; all-caps tokens (`CSI`, `API`) keep their casing. */
const pascalToken = (raw: string): string => {
  const alias = TOKEN_ALIAS[raw.toLowerCase()];
  if (alias !== undefined) return alias;
  return raw.charAt(0).toUpperCase() + raw.slice(1);
};

/**
 * Conservative singular. Only strips a trailing `s` when the word is a
 * regular plural we are confident about; anything ambiguous is returned
 * unchanged, because `getAlia` is worse than `getAliases`.
 */
export const singularize = (raw: string): string => {
  const lower = raw.toLowerCase();
  const keepCase = (s: string): string =>
    raw[0] === raw[0]?.toUpperCase()
      ? s.charAt(0).toUpperCase() + s.slice(1)
      : s;
  const alias = TOKEN_ALIAS[lower];
  if (alias !== undefined) {
    return alias.endsWith("s") ? alias.slice(0, -1) : alias;
  }
  const irregular = IRREGULAR_SINGULAR[lower];
  if (irregular !== undefined) return keepCase(irregular);
  if (UNCOUNTABLE.has(lower)) return raw;
  // All-caps acronyms (`IPs`, `CIDRs`, `DNS`) — only trim a lowercase `s`
  // after an acronym.
  if (/^[A-Z0-9]+s$/.test(raw)) return raw.slice(0, -1);
  if (raw !== lower && raw.toUpperCase() === raw) return raw;
  if (lower.length <= 3) return raw;
  if (!lower.endsWith("s")) return raw;
  // Vowel + `ys` is a regular plural (`keys`, `days`); consonant + `ys` is not.
  if (/(?:ss|us|is|os|as|[^aeiou]ys)$/.test(lower)) return raw;
  if (lower.endsWith("ies") && lower.length > 4) return `${raw.slice(0, -3)}y`;
  if (/(?:ches|shes|xes|zes|sses)$/.test(lower)) return raw.slice(0, -2);
  if (lower.endsWith("oes") && lower.length > 4) return raw.slice(0, -2);
  // `-ses` after a vowel is usually a regular `-se` noun (`Response`,
  // `Release`, `Database`), not an `-s` + `es` plural.
  if (/[aeiou]ses$/.test(lower)) return raw.slice(0, -1);
  if (lower.endsWith("ses")) return raw.slice(0, -2);
  return raw.slice(0, -1);
};

const lowerFirst = (s: string): string =>
  s.length === 0 ? s : s.charAt(0).toLowerCase() + s.slice(1);

/**
 * Split on `_`, `-`, `/` and camel boundaries. Acronym runs stay together
 * (`CSIDriver` → `CSI`, `Driver`; `APIGroup` → `API`, `Group`).
 */
const splitIdent = (s: string): string[] => {
  const parts: string[] = [];
  for (const chunk of s.split(/[_/\-.\s]+/).filter(Boolean)) {
    const split = chunk
      .replace(/([a-z0-9])([A-Z])/g, "$1\0$2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1\0$2");
    for (const p of split.split("\0")) {
      if (p) parts.push(p);
    }
  }
  return parts;
};

const isStrongVerb = (raw: string): boolean =>
  STRONG_VERBS.has(raw.toLowerCase());
const isTrailingVerb = (raw: string): boolean =>
  TRAILING_VERBS.has(raw.toLowerCase());
const isWeakLeadingVerb = (raw: string): boolean =>
  WEAK_LEADING_VERBS.has(raw.toLowerCase());

const alias = (raw: string): string =>
  VERB_ALIAS[raw.toLowerCase()] ?? raw.toLowerCase();

/** `version`-like tokens (`V1`, `v1beta1`, `V2`) are never nouns to singularise. */
const isVersionToken = (raw: string): boolean => /^[vV]\d/.test(raw);

/** Adverbs that sit between resource and verb: `HoldoutsPartialUpdate`. */
const MODIFIERS = new Set(["partial", "bulk", "batch", "all", "many"]);

/**
 * `verb + Resource + Object`. Only the resource (last noun before the verb)
 * is singularised, and only for non-list verbs (`getApp`, `listApps`,
 * `listMachineEvents`). Parent tokens keep their spelling.
 */
const assemble = (
  verb: string,
  nouns: readonly string[],
  tail: readonly string[] = [],
): string => {
  // `App_Certificates_acme_create`: the qualifier trails the resource in
  // the id but reads better in front of it (`createAppAcmeCertificate`).
  let ordered = [...nouns];
  if (ordered.length >= 2 && QUALIFIERS.has(ordered.at(-1)!.toLowerCase())) {
    const q = ordered.pop()!;
    ordered.splice(ordered.length - 1, 0, q);
  }
  const shaped = ordered.map((p, i) => {
    const isLast = i === ordered.length - 1;
    if (!isLast || isVersionToken(p)) return pascalToken(p);
    if (verb === "list" && tail.length === 0) return pascalToken(p);
    return pascalToken(singularize(p));
  });
  return verb + shaped.join("") + tail.map(pascalToken).join("");
};

/**
 * Distilled SDK names are verbNoun (`listApps`, `getApp`, `createMachine`).
 *
 * - Already verb-first (`listSprites`, `GetObject`, `showContact`,
 *   `WatchPodList`) stays, with `show`/`index`/`retrieve` aliased.
 * - Trailing action (`ConfigsList`, `PlansGet`, `ContainerCreate`,
 *   `VirtualMachinesStart`, `ReleaseGet`) moves the verb first and
 *   singularises the resource for non-list verbs.
 * - go-swagger / autorest `Apps_list`, `App_Certificates_show`,
 *   `Machines_list_events`, `ServiceMembers_getMetrics`: the verb heads the
 *   first `_` segment after the resource.
 * - Anything else (`AppGetOrCreate`, `VirtualMachines_createOrUpdate`,
 *   `DnsRecordsBatch`, `accountById`) is returned unchanged apart from
 *   lowerFirst. Use {@link OperationIdRewrite} for those.
 */
export const toVerbNoun = (operationId: string): string => {
  const trimmed = operationId.trim();
  if (trimmed === "") return trimmed;

  const segments = trimmed.split(/[_/]+/).filter(Boolean);
  if (segments.length >= 2) {
    // snake_case verb-first (`get_apps`, `list_all_users`): join.
    const lead = splitIdent(segments[0]!);
    if (lead.length === 1 && isStrongVerb(lead[0]!)) {
      const rest = segments.slice(1).flatMap(splitIdent);
      return alias(lead[0]!) + rest.map(pascalToken).join("");
    }
    // Segments before the verb are the resource by construction, so a
    // verb-looking token inside them (`OpenIdConnectProvider_get`) is a
    // noun. Only the object after the verb can make this a compound.
    const verbSeg = segments.findIndex(
      (seg, i) => i > 0 && isTrailingVerb(splitIdent(seg)[0] ?? ""),
    );
    if (verbSeg > 0) {
      const head = segments.slice(0, verbSeg).flatMap(splitIdent);
      const [verb, ...objectHere] = splitIdent(segments[verbSeg]!);
      const object = [
        ...objectHere,
        ...segments.slice(verbSeg + 1).flatMap(splitIdent),
      ];
      const compound = object.some(
        (t) => isStrongVerb(t) || /^(or|and)$/i.test(t),
      );
      if (!compound) return assemble(alias(verb!), head, object);
    }
    return lowerFirst(trimmed);
  }

  const parts = splitIdent(trimmed);
  if (parts.length <= 1) {
    return parts.length === 1 && isTrailingVerb(parts[0]!)
      ? alias(parts[0]!)
      : lowerFirst(trimmed);
  }

  const first = parts[0]!;
  const last = parts.at(-1)!;

  if (isStrongVerb(first)) {
    return alias(first) + parts.slice(1).map(pascalToken).join("");
  }
  if (parts.some((p) => /^(or|and)$/i.test(p))) return lowerFirst(trimmed);

  const reorder = isWeakLeadingVerb(first)
    ? isStrongVerb(last)
    : isTrailingVerb(last);
  if (!reorder) {
    return isWeakLeadingVerb(first)
      ? alias(first) + parts.slice(1).map(pascalToken).join("")
      : lowerFirst(trimmed);
  }

  const nouns = parts.slice(0, -1);
  if (nouns.slice(1).some(isStrongVerb)) return lowerFirst(trimmed);
  const modifier = nouns.at(-1);
  if (
    nouns.length > 1 &&
    modifier !== undefined &&
    MODIFIERS.has(modifier.toLowerCase())
  ) {
    return assemble(alias(last), nouns.slice(0, -1), [modifier]);
  }
  return assemble(alias(last), nouns);
};

const COMPANION_SUFFIXES = [
  "Request",
  "Response",
  "Input",
  "Output",
  "Error",
  "Result",
] as const;

const remapTargets = (
  node: unknown,
  mapping: ReadonlyMap<string, string>,
): unknown => {
  if (Array.isArray(node)) {
    return node.map((item) => remapTargets(item, mapping));
  }
  if (node === null || typeof node !== "object") return node;
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
    if (key === "target" && typeof value === "string") {
      out[key] = mapping.get(value) ?? value;
    } else {
      out[key] = remapTargets(value, mapping);
    }
  }
  return out;
};

/** Version prefixes and API roots that carry no meaning in a name. */
const NOISE_SEGMENTS = new Set(["api", "rest", "v", "public"]);
const isNoiseSegment = (seg: string): boolean => {
  const lower = seg.toLowerCase();
  return NOISE_SEGMENTS.has(lower) || /^v\d+(\.\d+)*$/.test(lower);
};

const HTTP_METHOD_ID =
  /^(get|post|put|patch|delete|head|options)(?=$|[-_./]|[A-Z0-9])/i;

/**
 * Whether an OpenAPI `operationId` carries no information beyond the
 * method and path: absent, or a mechanical restatement of the route such
 * as `get-api-card`, `post_v1_users_id`, `getApiV1AnnotationLayer`. A
 * hand-chosen id that merely starts with the method (`delete-artifact` for
 * `/repos/{owner}/{repo}/actions/artifacts/{id}`) is NOT mechanical — it
 * names a subset of the route on purpose — so the id must cover every
 * literal path segment, and every id token must come from the route.
 */
/**
 * A stricter subclass of mechanical ids: nothing in the id was chosen by
 * a person. Either there is no id, or the id is the route spelled out —
 * `postV1AppsByAppIdPromote`, `get_v1_users_id`, `get-api-card`,
 * `getCustomerById`. Such names are derived from the route alone.
 *
 * A `By…` clause counts as verbatim only when it names a whole parameter
 * (`ByAppId` for `{appId}`) or is a bare `ById`. `get_webhook_by_token`
 * for `/webhooks/{webhook_id}/{webhook_token}` is a chosen
 * disambiguation, so its nouns are kept; likewise `deleteScheduledJob`.
 */
export const isVerbatimRouteId = (
  operationId: string | undefined,
  ctx: OperationIdContext,
): boolean => {
  if (!operationId) return true;
  if (!isMechanicalOperationId(operationId, ctx)) return false;
  const id = stripTag(operationId);
  const m = HTTP_METHOD_ID.exec(id);
  const norm = (t: string) => singularize(t.toLowerCase()).toLowerCase();
  const idTokens = splitIdent(id.slice(m ? m[0].length : 0)).map(norm);
  const literal = new Set<string>();
  const params: string[][] = [];
  for (const seg of ctx.path.split(/[?#]/)[0]!.split("/")) {
    for (const mm of seg.matchAll(/\{([^}]+)\}/g)) {
      params.push(splitIdent(mm[1]!).map(norm));
    }
    for (const t of splitIdent(seg.replace(/\{[^}]*\}/g, " ")).map(norm)) {
      literal.add(t);
    }
  }
  const paramTokens = new Set(params.flat());
  const clauses: string[][] = [[]];
  for (const t of idTokens) {
    if (t === "by") clauses.push([]);
    else clauses.at(-1)!.push(t);
  }
  const [head, ...byClauses] = clauses;
  if (!head!.every((t) => literal.has(t) || paramTokens.has(t))) return false;
  // `ByAppIdPromote`: a whole parameter, then route literals.
  return byClauses.every((c) => {
    const lengths = [
      ...params
        .filter((p) => p.every((t, i) => t === c[i]))
        .map((p) => p.length),
      ...(c[0] === "id" ? [1] : []),
    ];
    return lengths.some(
      (n) => n <= c.length && c.slice(n).every((t) => literal.has(t)),
    );
  });
};

/** `activity/get-feeds` → `get-feeds`: a tag prefix is not part of the name. */
const stripTag = (operationId: string): string =>
  operationId.includes("/")
    ? operationId.slice(operationId.lastIndexOf("/") + 1)
    : operationId;

export const isMechanicalOperationId = (
  operationId: string | undefined,
  ctx: OperationIdContext,
): boolean => {
  if (!operationId) return true;
  const id = stripTag(operationId);
  const m = HTTP_METHOD_ID.exec(id);
  if (!m || m[1]!.toLowerCase() !== ctx.method.toLowerCase()) return false;
  const norm = (t: string) => singularize(t.toLowerCase()).toLowerCase();
  const joiners = new Set(["by", "for", "of", "in", "with", "and", "to"]);
  const idTokens = splitIdent(id.slice(m[0].length))
    .map(norm)
    .filter((t) => !joiners.has(t));
  const segments = ctx.path.split(/[?#]/)[0]!.split("/").filter(Boolean);
  // Route tokens in order; literals are required, params and `/api`,
  // `/v2` roots are optional (`getApiV1Foo` and `getFoo` both count).
  const route: Array<{ token: string; required: boolean }> = [];
  for (const seg of segments) {
    const param = /^\{(.*)\}$/.exec(seg);
    const required = param === null && !isNoiseSegment(seg);
    for (const t of splitIdent(param ? param[1]! : seg).map(norm)) {
      route.push({ token: t, required });
    }
  }
  if (idTokens.length === 0) return !route.some((r) => r.required);
  // The id must read the route left to right, skipping only optional
  // tokens. `delete-package-for-org` on /orgs/{org}/packages/… reads
  // `package, org` — out of order — and stays a hand-written name.
  let i = 0;
  for (const r of route) {
    if (i < idTokens.length && idTokens[i] === r.token) {
      i++;
    } else if (r.required) {
      return false;
    }
  }
  return i === idTokens.length;
};

/**
 * Derive `verbNoun` from `METHOD /path` for operations whose operationId
 * is missing or mechanical:
 *
 *   GET    /users            → listUsers       (when the 200 body is a
 *                                               collection; else getUsers)
 *   GET    /users/{id}       → getUser
 *   POST   /users            → createUser
 *   POST   /users/{id}       → updateUser      (Stripe-style POST-to-update)
 *   PUT    /users/{id}       → putUser         (replace semantics kept)
 *   PATCH  /users/{id}       → updateUser
 *   DELETE /users/{id}       → deleteUser
 *   POST   /users/{id}/reset → resetUser       (trailing action segment)
 *   GET    /orgs/{o}/repos   → listOrgRepos    (parents, singular, keep order)
 *
 * `/api`, `/v1`-style roots are dropped. Path parameters contribute nothing
 * to the name; only literal segments do.
 */
export interface PathNamingHints {
  /**
   * Whether the success response is a collection (array body, or an
   * object whose only/primary member is an array). Decides `list` vs
   * `get` for a GET on a route with no trailing parameter.
   */
  readonly returnsCollection?: boolean;
  /**
   * A mechanical operationId (`get-feeds`, `delete_v1_users_id`) whose
   * noun tokens, after the method, should be used verbatim instead of
   * being re-derived (and re-singularised) from the route.
   */
  readonly nouns?: string;
  /**
   * `nouns` is the route spelled out (`postV1AppsByAppIdPromote`), so
   * parameter tokens embedded without a `By` (`get_v1_users_id`) and
   * every `By…` clause are dropped, and the resource is singularised
   * when a parameter follows it.
   */
  readonly verbatim?: boolean;
}

export const pathToVerbNoun = (
  ctx: OperationIdContext,
  hints: PathNamingHints = {},
): string => {
  const method = ctx.method.toLowerCase();
  const segments = ctx.path.split(/[?#]/)[0]!.split("/").filter(Boolean);
  const literal: string[] = [];
  // `{id}`, `:id`, and composite segments such as `{slug}-{id}`.
  const isParam = (seg: string) => /\{[^}]*\}/.test(seg) || seg.startsWith(":");
  let endsWithParam = false;
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i]!;
    if (isParam(seg)) {
      endsWithParam = i === segments.length - 1;
      continue;
    }
    endsWithParam = false;
    if (isNoiseSegment(seg)) continue;
    literal.push(seg);
  }
  if (literal.length === 0) return lowerFirst(method + "Root");

  if (hints.nouns !== undefined) {
    // `activity/get-feeds`: a tag prefix before the method is not a noun.
    const id = hints.nouns.includes("/")
      ? hints.nouns.slice(hints.nouns.lastIndexOf("/") + 1)
      : hints.nouns;
    const m = HTTP_METHOD_ID.exec(id);
    const rest = m ? id.slice(m[0].length) : id;
    // Route literals, both as written and singularised, so a parameter
    // that echoes a literal (`{team}` under `/teams/`) is not mistaken
    // for a parameter token.
    const literal = new Set(
      segments
        .filter((seg) => !isParam(seg))
        .flatMap((seg) => splitIdent(seg))
        .flatMap((t) => [t.toLowerCase(), singularize(t).toLowerCase()]),
    );
    const routeNoise = new Set(
      segments
        .filter((seg) => !isParam(seg) && isNoiseSegment(seg))
        .flatMap((seg) => splitIdent(seg).map((t) => t.toLowerCase())),
    );
    /** Whole parameter names as token lists (`{appId}` → ["app","id"]). */
    const params = segments
      .flatMap((seg) => [...seg.matchAll(/\{([^}]+)\}/g)])
      .map((mm) => splitIdent(mm[1]!).map((t) => t.toLowerCase()));
    const raw = splitIdent(rest);
    /** Longest whole parameter name starting at raw[at], else 0. */
    const matchParam = (at: number): number => {
      let best = 0;
      for (const prm of params) {
        if (
          prm.length > best &&
          prm.every((t, k) => raw[at + k]?.toLowerCase() === t)
        ) {
          best = prm.length;
        }
      }
      if (best === 0 && raw[at]?.toLowerCase() === "id") best = 1;
      return best;
    };
    const tokens: string[] = [];
    /** Index in `tokens` of a noun that a parameter immediately follows. */
    const followedByParam = new Set<number>();
    for (let i = 0; i < raw.length; i++) {
      const t = raw[i]!;
      const lower = t.toLowerCase();
      // `getApiV1Foo` → drop the api/version root the id copied from the
      // route; a token the route does not have (`…DataAPI`) is kept.
      if (isNoiseSegment(t) && routeNoise.has(lower)) continue;
      let n = 0;
      let skip = 0;
      if (/^(by|for|of|in|with|and|to)$/.test(lower)) {
        n = matchParam(i + 1);
        skip = n + 1;
        // Non-verbatim ids only drop a TRAILING `ById`; a `By` in the
        // middle (`getBalanceByAsset`) is part of the chosen name.
        if (n > 0 && !hints.verbatim && i + skip !== raw.length) n = 0;
      } else if (hints.verbatim && i > 0) {
        // `get_v1_users_id`, `GetAccountsAccount`: a whole parameter name
        // with no `By`. When the parameter echoes the resource it follows
        // (`/accounts/{account}`, `/teams/{team}`) the previous token has
        // to be that resource; otherwise (`deleteProjectBranchCustomDomain`
        // on `/custom-domains/{domain}`) it is the literal.
        n = matchParam(i);
        skip = n;
        const echoes = raw
          .slice(i, i + n)
          .some((x) => literal.has(x.toLowerCase()));
        const prev = tokens.at(-1)?.toLowerCase();
        const prevIsResource =
          prev !== undefined &&
          raw
            .slice(i, i + n)
            .some(
              (x) =>
                singularize(prev) === singularize(x.toLowerCase()) ||
                prev === x.toLowerCase(),
            );
        if (echoes && !prevIsResource) n = 0;
      }
      if (n > 0) {
        if (tokens.length) followedByParam.add(tokens.length - 1);
        i += skip - 1;
        continue;
      }
      tokens.push(t);
    }
    if (hints.verbatim) {
      for (const i of followedByParam) tokens[i] = singularize(tokens[i]!);
      // `PostAccounts` → createAccount: a create makes one member.
      if (method === "post" && !endsWithParam && tokens.length > 0) {
        tokens[tokens.length - 1] = singularize(tokens.at(-1)!);
      }
    }
    if (tokens.length > 0) {
      // A POST that addresses one member (`POST /accounts/{account}`,
      // Stripe-style) updates it; a POST on a collection creates.
      const verb =
        method === "get"
          ? !endsWithParam && hints.returnsCollection === true
            ? "list"
            : "get"
          : method === "post"
            ? endsWithParam
              ? "update"
              : "create"
            : method === "patch"
              ? "update"
              : method;
      return verb + tokens.map(pascalToken).join("");
    }
  }

  const tokens = literal.map((seg) => splitIdent(seg));
  const lastTokens = tokens.at(-1)!;
  const lastIsVerb =
    lastTokens.length > 0 &&
    (isTrailingVerb(lastTokens[0]!) || isStrongVerb(lastTokens[0]!)) &&
    !endsWithParam &&
    method === "post";

  // POST /things/{id}/publish → publishThing; POST /login → login.
  if (lastIsVerb) {
    const [verb, ...rest] = lastTokens;
    const parents = tokens.slice(0, -1);
    const nouns = parents.map((t, i) =>
      i === parents.length - 1
        ? t.map((x, j) => (j === t.length - 1 ? singularize(x) : x))
        : t,
    );
    return (
      alias(verb!) +
      nouns.flat().map(pascalToken).join("") +
      rest.map(pascalToken).join("")
    );
  }

  // GET is `list` only when the body is known to be a collection; an
  // unknown or non-JSON body (`/zen`, `/octocat`) is a plain `get`.
  const verb =
    method === "get"
      ? !endsWithParam && hints.returnsCollection === true
        ? "list"
        : "get"
      : method === "post"
        ? endsWithParam
          ? "update"
          : "create"
        : method === "patch"
          ? "update"
          : method === "put"
            ? "put"
            : method === "delete"
              ? "delete"
              : method;
  // A GET/DELETE/PATCH/PUT on a collection route (no trailing parameter)
  // addresses the collection itself — keep its plural. With a trailing
  // parameter the route addresses one member, and `create` always makes
  // one — singular.
  const plural = !endsWithParam && verb !== "create";
  const shaped = tokens.map((t, i) => {
    const isResource = i === tokens.length - 1;
    return t.map((x, j) => {
      const last = j === t.length - 1;
      if (!last) return pascalToken(x);
      // Parents are singular (`Org` in listOrgRepos).
      if (!isResource || !plural) return pascalToken(singularize(x));
      return pascalToken(x);
    });
  });
  return verb + shaped.flat().join("");
};

/**
 * Rename operations (and every shape whose name starts with the operation
 * name — `FooRequest`, `FooResponse`, `FooRequestBody`, `FooResponseItemsList`)
 * in a Smithy model to verbNoun PascalCase. Mutates `model.shapes`.
 * Colliding names keep the original id and are reported.
 */
export const verbNounSmithyModel = (model: {
  shapes?: Record<string, any>;
}): { renamed: number; collisions: string[] } => {
  const shapes = model.shapes ?? {};
  const mapping = new Map<string, string>();
  const collisions: string[] = [];
  const taken = new Set(Object.keys(shapes));

  const ops = Object.entries(shapes).filter(
    ([, def]) => def?.type === "operation",
  );
  const opLocals = new Set<string>();
  for (const [id] of ops) {
    const hash = id.indexOf("#");
    opLocals.add(hash >= 0 ? id.slice(hash + 1) : id);
  }

  for (const [id] of ops) {
    const hash = id.indexOf("#");
    const ns = hash >= 0 ? id.slice(0, hash) : "";
    const local = hash >= 0 ? id.slice(hash + 1) : id;
    const camel = toVerbNoun(local);
    const nextLocal = camel.charAt(0).toUpperCase() + camel.slice(1);
    if (nextLocal === local) continue;
    const nextId = ns ? `${ns}#${nextLocal}` : nextLocal;
    if (taken.has(nextId) && !mapping.has(nextId)) {
      collisions.push(`${local} → ${nextLocal}`);
      continue;
    }
    if ([...mapping.values()].includes(nextId)) {
      collisions.push(`${local} → ${nextLocal}`);
      continue;
    }
    mapping.set(id, nextId);
    taken.add(nextId);

    // Companions: `<Op>Request`, `<Op>Response…`, and anything derived
    // from them by the converters' `${opName}Request${Member}` naming.
    // Skip prefixes that are themselves another operation's name
    // (`Get` vs `GetObject`) — only exact suffix matches count there.
    for (const candidate of Object.keys(shapes)) {
      if (candidate === id || mapping.has(candidate)) continue;
      const cHash = candidate.indexOf("#");
      const cNs = cHash >= 0 ? candidate.slice(0, cHash) : "";
      const cLocal = cHash >= 0 ? candidate.slice(cHash + 1) : candidate;
      if (cNs !== ns || !cLocal.startsWith(local)) continue;
      const tail = cLocal.slice(local.length);
      if (tail === "") continue;
      const suffixed = COMPANION_SUFFIXES.some((s) => tail.startsWith(s));
      if (!suffixed) continue;
      // `ListAppsRequest` vs op `List` + `AppsRequest`: require the tail to
      // start with a companion suffix immediately after the op name.
      const to = ns ? `${ns}#${nextLocal}${tail}` : `${nextLocal}${tail}`;
      if (taken.has(to)) continue;
      mapping.set(candidate, to);
      taken.add(to);
    }
  }

  if (mapping.size === 0) return { renamed: 0, collisions };

  const nextShapes: Record<string, any> = {};
  for (const [id, def] of Object.entries(shapes)) {
    const newId = mapping.get(id) ?? id;
    nextShapes[newId] = remapTargets(def, mapping);
  }
  model.shapes = nextShapes;
  return {
    renamed: ops.filter(([opId]) => mapping.has(opId)).length,
    collisions,
  };
};
