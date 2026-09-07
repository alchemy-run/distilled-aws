/**
 * Flat operation surface — v0 parity.
 *
 * The distilled v0 SDK exposed every operation from
 * `@distilled.cloud/planetscale/Operations`; alchemy imports it heavily.
 * The generated service module lives under `./services/planetscale.ts`
 * (single-service model), so the flat re-export is exact.
 */
export * from "./services/planetscale.ts";
