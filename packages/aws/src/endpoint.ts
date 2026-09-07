import * as Config from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";

export class Endpoint extends Context.Service<
  Endpoint,
  Effect.Effect<string | undefined>
>()("AWS::Endpoint") {}

/**
 * `AWS_ENDPOINT_URL` — the LocalStack-standard endpoint override that local
 * emulators (floci, LocalStack) inject into runtime environments (e.g.
 * Lambda containers). Resolves `undefined` when unset, so the SDK's
 * default endpoint resolver runs.
 */
export const fromEnvironment = Config.string("AWS_ENDPOINT_URL").pipe(
  Config.option,
  Effect.map(Option.getOrUndefined),
);

/** Override the endpoint with whatever the environment names, if anything. */
export const fromEnv = () =>
  Layer.succeed(Endpoint, fromEnvironment.pipe(Effect.orDie));

/** Override the endpoint for a scope, e.g. `Endpoint.of("http://localhost:4566")`. */
export const of = (endpoint: string) =>
  Layer.succeed(Endpoint, Effect.succeed(endpoint));
