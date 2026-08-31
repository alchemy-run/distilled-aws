#!/usr/bin/env bun
/**
 * convert — turn PayPal's OpenAPI specs into Smithy 2.0 JSON models.
 *
 * Input:  specs/spec-mirror-paypal/specs/<file>.json  (spec submodule)
 *         patches/<name>/*.patch.json  (RFC-6902 patches to the OpenAPI
 *         document)
 * Output: .generated-specs/<name>.json  (one model per spec file)
 *
 * PayPal publishes ~13 OpenAPI 3.0 documents in
 * paypal/paypal-rest-api-specifications — one per REST API (Orders, Payments,
 * Subscriptions, …). Each file becomes one service module. `scripts/generate.ts`
 * compiles the models into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

const root = path.resolve(import.meta.dir, "..");

/**
 * Filenames under specs/spec-mirror-paypal/specs/. The hyphen in
 * `payment-experience_…` is folded to `_` for the model / module name.
 */
const SPEC_FILES = [
  "billing_subscriptions_v1.json",
  "catalogs_products_v1.json",
  "checkout_orders_v2.json",
  "customer_disputes_v1.json",
  "customer_partner_referrals_v2.json",
  "invoicing_v2.json",
  "notifications_webhooks_v1.json",
  "payment-experience_web_experience_profiles_v1.json",
  "payments_payment_v2.json",
  "payments_payouts_batch_v1.json",
  "reporting_transactions_v1.json",
  "shipping_shipment_tracking_v1.json",
  "vault_payment_tokens_v3.json",
] as const;

const toSlug = (file: string): string =>
  file
    .replace(/\.json$/, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();

const toPascal = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/**
 * PayPal declares `Authorization` as an operation header. The protocol injects
 * `Bearer <access_token>` from credentials, so the parameter is dropped before
 * conversion. Other headers (`PayPal-Request-Id`, `Prefer`, partner ids) stay
 * as per-call inputs (`headerParams: true`).
 */
const dropAuthorizationHeaders = (spec: any): void => {
  const isAuthHeader = (p: unknown): boolean =>
    !!p &&
    typeof p === "object" &&
    (p as { in?: unknown; name?: unknown }).in === "header" &&
    (p as { name?: unknown }).name === "Authorization";

  const filterList = (params: unknown): unknown =>
    Array.isArray(params) ? params.filter((p) => !isAuthHeader(p)) : params;

  if (spec.components?.parameters) {
    for (const [key, p] of Object.entries(spec.components.parameters)) {
      if (isAuthHeader(p)) delete spec.components.parameters[key];
    }
  }

  for (const pathItem of Object.values<any>(spec.paths ?? {})) {
    if (!pathItem || typeof pathItem !== "object") continue;
    if (Array.isArray(pathItem.parameters)) {
      pathItem.parameters = filterList(pathItem.parameters);
    }
    for (const method of HTTP_METHODS) {
      const op = pathItem[method];
      if (!op || typeof op !== "object") continue;
      if (Array.isArray(op.parameters)) {
        op.parameters = filterList(op.parameters);
      }
    }
  }
};

await runOpenApiConvert({
  root,
  specs: SPEC_FILES.map((file) => {
    const slug = toSlug(file);
    return {
      name: slug,
      specPath: `specs/spec-mirror-paypal/specs/${file}`,
      preprocess: dropAuthorizationHeaders,
      options: {
        namespace: `com.paypal.${slug}`,
        serviceName: toPascal(slug),
      },
    };
  }),
  // OpenAPI-document patches: patches/<name>/*.patch.json. The smithy-model
  // patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.paypal.api",
    serviceName: "Paypal",
    skipDeprecated: true,
    // PayPal-Request-Id / Prefer / partner attribution are real per-call
    // inputs, not protocol boilerplate.
    headerParams: true,
  },
});
