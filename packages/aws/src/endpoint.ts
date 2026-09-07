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

/**
 * Resolves an endpoint for one AWS service, keyed by the service's SDK
 * service ID exactly as it appears in the model's `aws.api#service` trait —
 * e.g. `"S3"`, `"DynamoDB"`, `"SESv2"`, `"S3 Control"`. This is the
 * identifier AWS's service-specific endpoint configuration
 * (`AWS_ENDPOINT_URL_<SERVICE>`, the `services` sections of `~/.aws/config`)
 * is derived from, and unlike the SigV4 signing name it never collides
 * (SES and SESv2 both sign as `ses` but keep distinct SDK IDs).
 *
 * This is deliberately separate from {@link Endpoint}: providing
 * `Endpoint` around an individual operation is an explicit override and must
 * take precedence over a process-wide service policy.
 */
export interface ServiceEndpointResolver {
  readonly resolve: (service: string) => string | undefined;
}

export class ServiceEndpoint extends Context.Service<
  ServiceEndpoint,
  ServiceEndpointResolver
>()("AWS::ServiceEndpoint") {}

/**
 * Resolve the endpoint for one AWS service, keyed by its SDK service ID
 * (see {@link ServiceEndpointResolver}). An explicit operation-scoped
 * {@link Endpoint} wins, followed by the optional service resolver. Returning
 * `undefined` lets the generated Smithy endpoint rules select AWS normally.
 */
export const resolve = Effect.fnUntraced(function* (service: string) {
  const explicit = yield* yield* Effect.serviceOption(Endpoint).pipe(
    Effect.map(Option.getOrElse(() => Effect.undefined)),
  );
  if (explicit !== undefined) return explicit;

  const resolver = yield* Effect.serviceOption(ServiceEndpoint).pipe(
    Effect.map(Option.getOrUndefined),
  );
  return resolver?.resolve(service);
});
