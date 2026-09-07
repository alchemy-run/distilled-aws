/**
 * Coinbase retry configuration.
 *
 * Defines the per-SDK `Retry` Context.Service tag that generated operations
 * wire into `API.make({ retry: Retry.Retry })`. Callers can install a
 * blanket retry policy at the layer level and have every Coinbase API call
 * below it pick it up:
 *
 * @example
 * ```ts
 * import * as Coinbase from "@distilled.cloud/coinbase";
 *
 * myEffect.pipe(Coinbase.Retry.transient);
 * Effect.provide(myEffect, Layer.succeed(Coinbase.Retry.Retry, customPolicy));
 * ```
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import {
  type Policy,
  throttlingFactory,
  transientFactory,
} from "@distilled.cloud/core/retry";

export {
  type Options,
  type Factory,
  type Policy,
  makeDefault,
  jittered,
  capped,
  throttlingOptions,
  transientOptions,
  throttlingFactory,
  transientFactory,
} from "@distilled.cloud/core/retry";

/** Context tag for configuring retry behavior of Coinbase API calls. */
export class Retry extends Context.Service<Retry, Policy>()("CoinbaseRetry") {}

/** Provides a custom retry policy to every Coinbase API call below it. */
export const policy = (optionsOrFactory: Policy) =>
  Effect.provide(Layer.succeed(Retry, optionsOrFactory));

/** Disables all automatic retries. */
export const none = Effect.provide(
  Layer.succeed(Retry, { while: () => false }),
);

/** Apply the throttling retry policy (retries throttling errors indefinitely). */
export const throttling = policy(throttlingFactory);

/** Apply the transient retry policy (retries all transient errors indefinitely). */
export const transient = policy(transientFactory);
