/**
 * Retry Policy System
 *
 * Provides configurable retry policies for API operations.
 * Each SDK creates its own `Retry` Context.Service tag (via
 * `makeRetryService`) and threads it into `makeAPI({ retry: <SDK>.Retry })`
 * so that callers can install a blanket retry policy at the layer level
 * for that SDK without wrapping every call with `Effect.retry`.
 */
import * as Config from "effect/Config";
import * as Context from "effect/Context";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import { pipe } from "effect/Function";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Ref from "effect/Ref";
import * as Schedule from "effect/Schedule";
import { isThrottling, isTransientError } from "./category.ts";

// ============================================================================
// Retry Policy Types
// ============================================================================

/**
 * Retry policy options that match the Effect.retry contract.
 */
export interface Options {
  /**
   * Predicate to determine if an error should trigger a retry.
   */
  readonly while?: (error: unknown) => boolean;
  /**
   * The schedule to use for retrying.
   */
  readonly schedule?: Schedule.Schedule<unknown>;
}

/**
 * A factory function that creates retry policy options with access to the last error ref.
 * This allows dynamic policies that can inspect the last error for retry-after headers, etc.
 */
export type Factory = (lastError: Ref.Ref<unknown>) => Options;

/**
 * A retry policy can be either static options or a factory that receives the last error ref.
 */
export type Policy = Options | Factory;

// ============================================================================
// Retry Service Factory
// ============================================================================

/**
 * Create a typed Retry service class for an SDK.
 * Each SDK creates its own Retry service using this factory; the SDK's
 * client wraps `makeAPI` with `retry: <SDK>.Retry` so the policy applies
 * to every API call below it.
 *
 * @example
 * ```ts
 * // packages/<sdk>/src/retry.ts
 * export class Retry extends makeRetryService("PlanetScaleRetry") {}
 * ```
 */
export const makeRetryService = (name: string) =>
  Context.Service<any, Policy>()(name);

// ============================================================================
// Retry Schedule Utilities
// ============================================================================

/**
 * Custom jittered schedule helper.
 * Adds random jitter between 0-50ms to avoid thundering herd.
 */
export const jittered = Schedule.addDelay(() =>
  Effect.succeed(Duration.millis(Math.random() * 50)),
);

/**
 * Cap delay at a maximum duration.
 */
export const capped = (max: Duration.Duration) =>
  Schedule.modifyDelay(({ duration }) =>
    Effect.succeed(Duration.isGreaterThan(duration, max) ? max : duration),
  );

// ============================================================================
// Server Hint Helpers
// ============================================================================

/**
 * Default cap (milliseconds) on how long we'll honor a server-provided
 * `Retry-After` / `RateLimit` hint. A misbehaving server can otherwise park
 * us forever.
 */
export const DEFAULT_SERVER_RETRY_HINT_CAP_MS = 60_000;

const ENV_SERVER_RETRY_HINT_CAP_MS = "DISTILLED_SERVER_RETRY_HINT_CAP_MS";

/**
 * Optional override for the server-hint cap, in milliseconds. When provided
 * via `Layer.succeed(ServerRetryHintCapMs, n)`, that value wins over the
 * environment.
 *
 * @example
 * ```ts
 * Effect.retry(op, policy).pipe(
 *   Effect.provide(serverRetryHintCapLayer(120_000)),
 * )
 * ```
 */
export const ServerRetryHintCapMs = Context.Service<number>(
  "@distilled.cloud/core/ServerRetryHintCapMs",
);

/**
 * Layer that pins the server `retryAfter` cap to a fixed value (milliseconds).
 */
export const serverRetryHintCapLayer = (capMs: number) =>
  Layer.succeed(ServerRetryHintCapMs, capMs);

const serverRetryHintCapMsConfig: Config.Config<number> = Config.string(
  ENV_SERVER_RETRY_HINT_CAP_MS,
).pipe(
  Config.map((raw) => {
    if (raw === "") return DEFAULT_SERVER_RETRY_HINT_CAP_MS;
    const n = Number(raw);
    if (!Number.isFinite(n) || n < 0) return DEFAULT_SERVER_RETRY_HINT_CAP_MS;
    return Math.trunc(n);
  }),
  Config.withDefault(DEFAULT_SERVER_RETRY_HINT_CAP_MS),
);

/**
 * Effective cap when neither {@link ServerRetryHintCapMs} nor
 * `DISTILLED_SERVER_RETRY_HINT_CAP_MS` is set: {@link DEFAULT_SERVER_RETRY_HINT_CAP_MS}.
 *
 * Reads the `DISTILLED_SERVER_RETRY_HINT_CAP_MS` environment variable via
 * Effect's {@link Config} (must be a non-negative finite number; invalid
 * values fall back to the default).
 */
export const readServerRetryHintCapMsFromEnv = (): number =>
  Effect.runSync(
    serverRetryHintCapMsConfig.pipe(
      Effect.orElseSucceed(() => DEFAULT_SERVER_RETRY_HINT_CAP_MS),
    ),
  );

const resolveServerRetryHintCapMs = (): Effect.Effect<number, never, never> =>
  Effect.gen(function* () {
    const fromLayer = yield* Effect.serviceOption(ServerRetryHintCapMs);
    if (Option.isSome(fromLayer)) {
      const n = fromLayer.value;
      if (Number.isFinite(n) && n >= 0) return Math.trunc(n);
    }
    return yield* serverRetryHintCapMsConfig.pipe(
      Effect.orElseSucceed(() => DEFAULT_SERVER_RETRY_HINT_CAP_MS),
    );
  });

/**
 * Extract a server-provided retry hint (in milliseconds) from an error's
 * optional `retryAfter` field, capped by the effective server-hint cap
 * (see {@link ServerRetryHintCapMs} and {@link readServerRetryHintCapMsFromEnv}).
 *
 * Returns `undefined` when the error doesn't carry a hint.
 */
const serverHintMillis = (
  error: unknown,
  capMs: number,
): number | undefined => {
  const hint = (error as { retryAfter?: unknown } | null | undefined)
    ?.retryAfter;
  if (!Duration.isDuration(hint)) return undefined;
  return Math.min(Duration.toMillis(hint), capMs);
};

/**
 * Schedule modifier that honors `error.retryAfter` (set by the SDK's
 * `matchError` from `Retry-After` / `RateLimit` headers) with precedence
 * over the input delay. Falls back to the original delay when no hint is
 * present.
 */
const honorServerHint = (
  lastError: Ref.Ref<unknown>,
  baseline?: (duration: Duration.Duration, error: unknown) => Duration.Duration,
) =>
  Schedule.modifyDelay(
    Effect.fnUntraced(function* ({ duration }) {
      const capMs = yield* resolveServerRetryHintCapMs();
      const error = yield* Ref.get(lastError);
      const hint = serverHintMillis(error, capMs);
      if (hint !== undefined) return hint;
      const adjusted = baseline ? baseline(duration, error) : duration;
      return Duration.toMillis(adjusted);
    }),
  );

// ============================================================================
// Default Retry Policies
// ============================================================================

/**
 * Creates the default retry policy.
 *
 * This policy:
 * - Retries transient errors (throttling, server, network, locked errors)
 * - Honors `error.retryAfter` (server-provided hint) with precedence, capped
 *   by {@link DEFAULT_SERVER_RETRY_HINT_CAP_MS} by default; override with
 *   `DISTILLED_SERVER_RETRY_HINT_CAP_MS` or {@link ServerRetryHintCapMs}
 * - Otherwise uses exponential backoff starting at 250ms with a factor of 2,
 *   capped at 5s per delay
 * - Ensures at least 500ms delay for throttling errors
 * - Limits to 8 retry attempts
 * - Applies jitter to avoid thundering herd
 *
 * The 250ms/5s-cap/8-attempt shape (~20s of total patience) comes from
 * alchemy's Cloudflare provider suite, where transient auth blips under
 * high request concurrency routinely outlast a short 5-attempt/3s policy
 * while a genuinely broken credential still fails within seconds.
 */
export const makeDefault: Factory = (lastError) => ({
  while: (error) => isTransientError(error),
  // The 5s cap applies to the exponential backoff BEFORE the server hint is
  // considered, so a server-provided retryAfter longer than 5s is honored in
  // full (bounded only by the 60s hint cap inside honorServerHint). Capping
  // after the hint would silently clamp e.g. a Retry-After: 30 to 5s.
  schedule: Schedule.max([
    pipe(
      Schedule.exponential(250, 2),
      capped(Duration.seconds(5)),
      honorServerHint(lastError, (duration, error) => {
        if (isThrottling(error) && Duration.toMillis(duration) < 500) {
          return Duration.millis(500);
        }
        return duration;
      }),
      jittered,
    ),
    Schedule.recurs(8),
  ]),
});

/**
 * Factory for the throttling-only retry policy. Honors server hints when
 * present so callers using `<SDK>.Retry.throttling` get correct backoff.
 */
export const throttlingFactory: Factory = (lastError) => ({
  while: (error) => isThrottling(error),
  schedule: pipe(
    Schedule.exponential(1000, 2),
    capped(Duration.seconds(5)),
    honorServerHint(lastError),
    jittered,
  ),
});

/**
 * Retry options that retries all throttling errors indefinitely.
 *
 * Note: prefer {@link throttlingFactory} when you want server-hint honoring.
 * This static `Options` form does not have access to `lastError` and so
 * cannot read `error.retryAfter`.
 */
export const throttlingOptions: Options = {
  while: (error) => isThrottling(error),
  schedule: pipe(
    Schedule.exponential(1000, 2),
    capped(Duration.seconds(5)),
    jittered,
  ),
};

/**
 * Factory for the transient retry policy. Honors server hints when present
 * so callers using `<SDK>.Retry.transient` get correct backoff.
 */
export const transientFactory: Factory = (lastError) => ({
  while: isTransientError,
  schedule: pipe(
    Schedule.exponential(1000, 2),
    capped(Duration.seconds(5)),
    honorServerHint(lastError),
    jittered,
  ),
});

/**
 * Retry options that retries all transient errors indefinitely.
 *
 * This includes:
 * 1. Throttling errors
 * 2. Server errors
 * 3. Network errors
 * 4. Locked errors (423)
 *
 * Note: prefer {@link transientFactory} when you want server-hint honoring.
 */
export const transientOptions: Options = {
  while: isTransientError,
  schedule: pipe(
    Schedule.exponential(1000, 2),
    capped(Duration.seconds(5)),
    jittered,
  ),
};
