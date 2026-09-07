/**
 * The canonical-message trait.
 *
 * Lives in its own leaf module rather than in `traits.ts` because `errors.ts`
 * needs it at module-init time to build the common error classes, and
 * `traits.ts` imports every protocol, each of which imports `errors.ts` — so
 * pulling it from there would leave the annotation undefined by the time
 * `errors.ts` evaluated. This module depends only on the core trait
 * primitive, so it is safe from either direction. `traits.ts` re-exports it,
 * which is how generated services reach it as `T.ErrorMessage`, and defines
 * the `hasErrorMessage` lookup alongside the other annotation getters.
 */
import { makeAnnotation } from "@distilled.cloud/core/trait";

/**
 * distilled trait - marks the member of an error shape that carries the
 * service's human-readable failure text.
 *
 * AWS spells this member inconsistently across services (`message` in most,
 * `Message` in the XML-era ones) and omits it entirely from some models —
 * every ec2 error shape declares no members at all. Without a marker the
 * response parser has to guess by spelling, and a shape that declares no
 * message member at all silently drops the text on decode, leaving callers a
 * typed error with nothing in it (distilled #160).
 *
 * The generator guarantees exactly one tagged member per error class and
 * normalizes its name to `message`, so `Error.message` is always the real
 * message and consumers never have to know which spelling a service used.
 */
export const errorMessageSymbol = "distilled-aws/error-message" as const;
export const ErrorMessage = () => makeAnnotation(errorMessageSymbol, true);
