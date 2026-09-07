import * as S from "effect/Schema";
import type { PaginatedTrait } from "../traits.ts";

export declare namespace Operation {
  export type Input<Op extends Operation> = S.Schema.Type<Op["input"]>;
  export type Output<Op extends Operation> = S.Schema.Type<Op["output"]>;
  export type Error<Op extends Operation> = Instance<Op["errors"][number]>;
}

type Instance<T> = T extends new (...args: any) => infer U ? U : T;

export interface Operation<
  Input extends S.Top = S.Any,
  Output extends S.Top = S.Top,
  Error = any,
> {
  input: Input;
  output: Output;
  errors: Error[];
  /**
   * The Smithy operation name (e.g. "DescribeAutoScalingGroups"). Used as the
   * wire `Action` / `X-Amz-Target` operation. When absent, protocols fall back
   * to deriving it from the input schema identifier by stripping a
   * Request/Input/Message suffix — which is wrong for services whose input
   * shapes are not named after the operation (e.g. AutoScaling's
   * `AutoScalingGroupNamesType`).
   */
  operationName?: string;
  /**
   * The Smithy `smithy.api#endpoint` trait's `hostPrefix` (e.g. `"sync-"` on
   * Step Functions' `StartSyncExecution`, which must target
   * `sync-states.{region}` instead of `states.{region}`). Applied to the
   * resolved endpoint's host unless a custom `Endpoint` service is provided.
   * May contain `{memberName}` labels substituted from the operation input.
   */
  endpointHostPrefix?: string;
  /** Pagination metadata for paginated operations */
  pagination?: PaginatedTrait;
}
