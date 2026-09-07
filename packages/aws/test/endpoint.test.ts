import { describe, expect, it } from "bun:test";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";

import * as Credentials from "../src/credentials.browser.ts";
import * as Endpoint from "../src/endpoint.ts";
import * as Presign from "../src/presign.ts";
import * as Region from "../src/region.ts";
import * as SESv2 from "../src/services/sesv2.ts";

describe("service endpoint resolution", () => {
  /**
   * Routes a couple of services at dedicated addresses and everything else
   * at a catch-all — the shape a local emulator or a private endpoint fleet
   * takes. Keys are SDK service IDs verbatim (`aws.api#service` sdkId), so
   * SES and SESv2 stay independently routable even though both sign as
   * `ses`.
   */
  const perService: Record<string, string> = {
    SESv2: "http://service-a.test:4600",
    DynamoDB: "http://service-b.test:8000",
  };
  const catchAll = "http://catch-all.test:4566";

  const endpoints = {
    resolve: (service: string) => perService[service] ?? catchAll,
  } satisfies Endpoint.ServiceEndpointResolver;

  it("routes every service through the resolver", async () => {
    await Effect.runPromise(
      Effect.gen(function* () {
        for (const [service, endpoint] of Object.entries(perService)) {
          expect(yield* Endpoint.resolve(service)).toBe(endpoint);
        }
        // SES (v1) is NOT routed with SESv2: the key is the SDK service ID,
        // not the shared `ses` signing name.
        for (const service of ["SES", "S3", "not-routed-anywhere"]) {
          expect(yield* Endpoint.resolve(service)).toBe(catchAll);
        }
      }).pipe(Effect.provideService(Endpoint.ServiceEndpoint, endpoints)),
    );
  });

  it("keeps an explicit operation endpoint authoritative", async () => {
    await Effect.runPromise(
      Effect.gen(function* () {
        expect(yield* Endpoint.resolve("SESv2")).toBe("http://operation.test");
        expect(yield* Endpoint.resolve("SQS")).toBe("http://operation.test");
      }).pipe(
        Effect.provideService(Endpoint.ServiceEndpoint, endpoints),
        Effect.provideService(
          Endpoint.Endpoint,
          Effect.succeed("http://operation.test"),
        ),
      ),
    );
  });

  it("falls back to the resolver when the override resolves undefined", async () => {
    await Effect.runPromise(
      Effect.gen(function* () {
        expect(yield* Endpoint.resolve("SESv2")).toBe(
          "http://service-a.test:4600",
        );
      }).pipe(
        Effect.provideService(Endpoint.ServiceEndpoint, endpoints),
        Effect.provideService(Endpoint.Endpoint, Effect.succeed(undefined)),
      ),
    );
  });

  it("leaves cloud endpoint selection available without a resolver", async () => {
    await Effect.runPromise(
      Effect.gen(function* () {
        expect(yield* Endpoint.resolve("SESv2")).toBeUndefined();
      }),
    );
  });

  it("routes generated operations by SDK service ID", async () => {
    let requested: URL | undefined;
    const client = HttpClient.make((request, url) => {
      requested = url;
      return Effect.succeed(
        HttpClientResponse.fromWeb(
          request,
          new Response("{}", {
            status: 200,
            headers: { "content-type": "application/json" },
          }),
        ),
      );
    });

    await Effect.runPromise(
      SESv2.getAccount({}).pipe(
        Effect.provideService(Endpoint.ServiceEndpoint, {
          resolve: (service) =>
            service === "SESv2" ? "http://ses-local.test:4600" : undefined,
        }),
        Effect.provideService(HttpClient.HttpClient, client),
        Effect.provide(Credentials.mock),
      ),
    );

    expect(requested?.origin).toBe("http://ses-local.test:4600");
  });

  it("falls through to generated endpoint rules", async () => {
    let requested: URL | undefined;
    const client = HttpClient.make((request, url) => {
      requested = url;
      return Effect.succeed(
        HttpClientResponse.fromWeb(
          request,
          new Response("{}", {
            status: 200,
            headers: { "content-type": "application/json" },
          }),
        ),
      );
    });

    await Effect.runPromise(
      SESv2.getAccount({}).pipe(
        Effect.provideService(HttpClient.HttpClient, client),
        Effect.provide(Credentials.mock),
      ),
    );

    expect(requested?.origin).toBe("https://email.us-east-1.amazonaws.com");
  });

  it("uses the S3 service endpoint when presigning", async () => {
    const url = await Effect.runPromise(
      Presign.presignS3Url({
        bucket: "uploads",
        key: "reports/quarter 1.csv",
        region: "us-east-1",
        datetime: "20260824T000000Z",
      }).pipe(
        Effect.provideService(Endpoint.ServiceEndpoint, {
          resolve: (service) =>
            service === "S3" ? "http://s3-local.test:9000" : undefined,
        }),
        Effect.provide(Credentials.mock),
        Effect.provide(Region.of("us-east-1")),
      ),
    );

    const presigned = new URL(url);
    expect(presigned.origin).toBe("http://s3-local.test:9000");
    expect(presigned.pathname).toBe("/uploads/reports/quarter%201.csv");
    expect(presigned.searchParams.get("X-Amz-Credential")).toContain(
      "/s3/aws4_request",
    );
  });
});
