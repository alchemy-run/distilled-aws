# manual-specs

Hand-authored Smithy models for AWS APIs that `specs/api-models-aws` does
not cover. They are **models, not modules**: `scripts/generate.ts` compiles
them through the identical path as every published model — same `awsSpec`,
same patch chain (`patches/<sdkId>.json`), same emitter — so the resulting
`src/services/<sdkId>.ts` is generated output like any other and is
regenerated on every run.

A file here whose name collides with a directory in
`specs/api-models-aws/models` fails the run: if AWS publishes the model,
delete the manual one rather than shadowing it.

| Model          | Why it is here                                                                                                                                                                                 |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `simpledb.json` | Classic Amazon SimpleDB (2009-04-15) predates Smithy and AWS never published a model for it — it survives only in botocore/SDK v2. The published `simpledbv2` model covers only the domain-export migration API, not domain or item operations. |
