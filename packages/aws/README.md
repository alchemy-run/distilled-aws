# @distilled.cloud/aws

Effect-native AWS SDK generated from [Smithy](https://smithy.io) models with full protocol support. Covers S3, Lambda, DynamoDB, SQS, IAM, EC2, and 200+ services with exhaustive error typing.

## Installation

```bash
npm install @distilled.cloud/aws effect
```

## Quick Start

```typescript
import { Effect, Layer } from "effect";
import * as Stream from "effect/Stream";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as Lambda from "@distilled.cloud/aws/lambda";
import * as S3 from "@distilled.cloud/aws/s3";
import { Credentials, Region } from "@distilled.cloud/aws";

const program = Effect.gen(function* () {
  yield* S3.putObject({
    Bucket: "my-bucket",
    Key: "hello.txt",
    Body: "Hello, World!",
  });

  const result = yield* S3.getObject({
    Bucket: "my-bucket",
    Key: "hello.txt",
  });

  const functions = yield* Lambda.listFunctions
    .items({})
    .pipe(Stream.take(10), Stream.runCollect);

  return result.ContentType;
});

const AwsLive = Layer.mergeAll(
  FetchHttpClient.layer,
  Region.fromEnv(),
  Credentials.fromChain(),
);

program.pipe(Effect.provide(AwsLive), Effect.runPromise);
```

## Configuration

### Region

`Region.fromEnv()` reads from the `AWS_REGION` environment variable (falls back to `AWS_DEFAULT_REGION`):

```bash
AWS_REGION=us-east-1
```

### Credentials

`Credentials.fromChain()` uses the standard AWS credential provider chain, which tries each source in order until one succeeds:

1. **Environment variables** — `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and optionally `AWS_SESSION_TOKEN`
2. **Shared credentials file** — `~/.aws/credentials` (supports multiple profiles via `AWS_PROFILE`)
3. **SSO** — `aws sso login --profile your-profile` (reads cached SSO tokens)
4. **Container metadata** — ECS task role credentials
5. **EC2 instance metadata** — IMDS instance profile credentials
6. **Token file** — `AWS_WEB_IDENTITY_TOKEN_FILE` for OIDC federation (EKS)

You can also use a specific provider directly:

```typescript
// Environment variables only
Credentials.fromEnv()

// SSO profile (run `aws sso login` first)
Credentials.fromSSO("my-profile")

// Shared credentials file (~/.aws/credentials)
Credentials.fromIni()

// Static credentials
Credentials.fromCredentials({
  accessKeyId: "AKIA...",
  secretAccessKey: "...",
})
```

Credentials are cached and automatically refreshed 5 minutes before expiration.

## Error Handling

All operations return typed errors for pattern matching:

```typescript
S3.getObject({ Bucket: "my-bucket", Key: "missing.txt" }).pipe(
  Effect.catchTags({
    NoSuchKey: () => Effect.succeed(null),
    AccessDenied: (e) => Effect.fail(new Error(`Access denied: ${e.message}`)),
  }),
);
```

## Protocols

Supports all AWS protocols: REST-XML (S3), REST-JSON (Lambda), AWS JSON 1.0/1.1 (DynamoDB, KMS), AWS Query (IAM, STS), and EC2 Query.

## License

MIT
