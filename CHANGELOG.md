## v1.0.0-rc.8

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- Upgrade to effect rc 112 &nbsp;-&nbsp; by **Sam Goodwin** [<samp>(809f3)</samp>](https://github.com/alchemy-run/distilled/commit/809f3d85e)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.7...HEAD)

---

## v1.0.0-rc.7

### &nbsp;&nbsp;&nbsp;🚀 Features

- **cloudflare**:
  - **email_routing**: Type WorkerScriptNotFound on rule writes &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/476 [<samp>(57e90)</samp>](https://github.com/alchemy-run/distilled/commit/57e9053f5)
- **fly-io,hetzner,railway**:
  - MachineIdentity, tagged createServer errors, slim GraphQL &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/477 [<samp>(e7f12)</samp>](https://github.com/alchemy-run/distilled/commit/e7f12dd80)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **cloudflare**: Unwrap single-type envelope wrappers in spec conversion &nbsp;-&nbsp; by **Rahul Mishra** and **Claude Fable 5** in https://github.com/alchemy-run/distilled/issues/473 [<samp>(8a55e)</samp>](https://github.com/alchemy-run/distilled/commit/8a55e2b13)
- **deps**: Update to effect 4.0.0-rc.111 &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/474 [<samp>(651cd)</samp>](https://github.com/alchemy-run/distilled/commit/651cde92e)
- **railway**: SDK DX, tcpProxyCreate, and error tags for alchemy &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/472 [<samp>(db3a1)</samp>](https://github.com/alchemy-run/distilled/commit/db3a1b539)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.6...HEAD)

---

## v1.0.0-rc.6

### &nbsp;&nbsp;&nbsp;🚀 Features

- **fly-io**: Machines patches plus Sprites, MPG, and GraphQL add-ons &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/466 [<samp>(e9427)</samp>](https://github.com/alchemy-run/distilled/commit/e9427740c)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **fly-io**: Deploy-token response and base64 PetSem payloads &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/471 [<samp>(182d3)</samp>](https://github.com/alchemy-run/distilled/commit/182d343e5)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.5...HEAD)

---

## v1.0.0-rc.5

### &nbsp;&nbsp;&nbsp;🚀 Features

- **aws**: Endpoint.fromEnv — resolve the AWS_ENDPOINT_URL override &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/451 [<samp>(45e3d)</samp>](https://github.com/alchemy-run/distilled/commit/45e3d861f)
- **hetzner**: Add the Hetzner Cloud SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/464 [<samp>(5fa46)</samp>](https://github.com/alchemy-run/distilled/commit/5fa4677b4)
- **huggingface**: Add the Hugging Face Hub API SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/449 [<samp>(4916c)</samp>](https://github.com/alchemy-run/distilled/commit/4916c3c61)
- **vercel**: Add the Vercel REST SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/446 [<samp>(05b44)</samp>](https://github.com/alchemy-run/distilled/commit/05b444fa8)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **aws**:
  - **cloudwatch**: Type UnsupportedOperation on describeInsightRules &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/450 [<samp>(e2f14)</samp>](https://github.com/alchemy-run/distilled/commit/e2f141df6)
- **cloudflare**:
  - **r2**:
    - Type the non-empty bucket rejection on deleteBucket &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/462 [<samp>(34ba2)</samp>](https://github.com/alchemy-run/distilled/commit/34ba21a5a)
    - Type the object-plane missing-bucket / missing-key rejections &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/463 [<samp>(f1218)</samp>](https://github.com/alchemy-run/distilled/commit/f1218aa53)
  - **zero_trust**:
    - Access application typed errors + inline policies on self-hosted apps &nbsp;-&nbsp; by **Michael K**, **Maximilian Schwarzmüller** and **sam** in https://github.com/alchemy-run/distilled/issues/460 [<samp>(9c978)</samp>](https://github.com/alchemy-run/distilled/commit/9c9789ee9)
- **core,aws**:
  - Honor per-call context overrides in yield-first ops; parse X-Amz-Errortype &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/467 [<samp>(8fce7)</samp>](https://github.com/alchemy-run/distilled/commit/8fce771ec)
- **deps**:
  - Update to effect 4.0.0-rc.110 &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/459 [<samp>(2627d)</samp>](https://github.com/alchemy-run/distilled/commit/2627ddaf9)
- **hetzner**:
  - Type errors and schema gaps for alchemy &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/465 [<samp>(e70eb)</samp>](https://github.com/alchemy-run/distilled/commit/e70eb61de)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.4...v1.0.0-rc.5)

---

## v1.0.0-rc.4

### &nbsp;&nbsp;&nbsp;🚨 Breaking Changes

- **deps**: Update to effect 4.0.0-beta.104 &nbsp;-&nbsp; by **Michael K** [<samp>(9fe73)</samp>](https://github.com/alchemy-run/distilled/commit/9fe73ad02)

### &nbsp;&nbsp;&nbsp;🚀 Features

- **discord**: Add the Discord HTTP API v10 SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/434 [<samp>(06fb0)</samp>](https://github.com/alchemy-run/distilled/commit/06fb03036)
- **github**: Add the GitHub REST SDK &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/435 [<samp>(280d0)</samp>](https://github.com/alchemy-run/distilled/commit/280d0a741)
- **railway**: Add the Railway SDK on shared GraphQL→Smithy tooling &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/438 [<samp>(27cd2)</samp>](https://github.com/alchemy-run/distilled/commit/27cd2f886)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **cloudflare**:
  - **queues**:
    - Type deleteQueue 11005 + surface producer scriptName &nbsp;-&nbsp; by **Sam Goodwin** in https://github.com/alchemy-run/distilled/issues/432 [<samp>(6b15a)</samp>](https://github.com/alchemy-run/distilled/commit/6b15a47e9)
    - Regenerate for the effect-105 generator surface &nbsp;-&nbsp; by **Sam Goodwin** in https://github.com/alchemy-run/distilled/issues/433 [<samp>(545b2)</samp>](https://github.com/alchemy-run/distilled/commit/545b26012)
  - **zero-trust**:
    - Type Access exclude/require rules like include &nbsp;-&nbsp; by **Sam Goodwin** in https://github.com/alchemy-run/distilled/issues/430 [<samp>(d784f)</samp>](https://github.com/alchemy-run/distilled/commit/d784fd034)
- **core**:
  - Send a body on GET when the schema declares one &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/429 [<samp>(26852)</samp>](https://github.com/alchemy-run/distilled/commit/26852f05d)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.3...HEAD)

---

## v1.0.0-rc.3

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **cloudflare**:
  - Read union arm keys the docs state inline &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/424 [<samp>(26cfb)</samp>](https://github.com/alchemy-run/distilled/commit/26cfb3e6b)
  - Declare each error once per resource, not per operation &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/428 [<samp>(9cc96)</samp>](https://github.com/alchemy-run/distilled/commit/9cc967140)
- **packages**:
  - Effect is a peer, platform-bun is dev-only &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/425 [<samp>(0f46a)</samp>](https://github.com/alchemy-run/distilled/commit/0f46afa17)

### &nbsp;&nbsp;&nbsp;🏎 Performance

- Cut the cloudflare package from 94 MB to 75 MB &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/427 [<samp>(f7153)</samp>](https://github.com/alchemy-run/distilled/commit/f71532e05)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.2...HEAD)

---

## v1.0.0-rc.2

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **release**: Ship lib from the packages that never published &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/423 [<samp>(87ea4)</samp>](https://github.com/alchemy-run/distilled/commit/87ea4dda0)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v1.0.0-rc.1...HEAD)

---

## v1.0.0-rc.1

### &nbsp;&nbsp;&nbsp;🚀 Features

- Refactor to use single Smithy pipeline and re-write all SDKs &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/390 [<samp>(c7395)</samp>](https://github.com/alchemy-run/distilled/commit/c73953df0)
- Point worker export condition at src .ts &nbsp;-&nbsp; by **sam** [<samp>(338c5)</samp>](https://github.com/alchemy-run/distilled/commit/338c5fab5)
- **aws**:
  - Generate simpledb from a manual spec &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/401 [<samp>(d5500)</samp>](https://github.com/alchemy-run/distilled/commit/d55002ca3)
  - Make Region optional, defaulting to the authenticated one &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/409 [<samp>(26b99)</samp>](https://github.com/alchemy-run/distilled/commit/26b9901a0)
- **cloudflare**:
  - Restore the two missing edge-preview routes + catch the class of gap that hid them &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/400 [<samp>(21f57)</samp>](https://github.com/alchemy-run/distilled/commit/21f57e5c6)
  - Workerd export condition resolves from src &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/418 [<samp>(0c91c)</samp>](https://github.com/alchemy-run/distilled/commit/0c91c17fd)
  - **workers**:
    - Stream binding kind on script-upload metadata &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/397 [<samp>(8d4ce)</samp>](https://github.com/alchemy-run/distilled/commit/8d4ced3f8)
    - Streaming_tail_consumers on script-upload metadata &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/398 [<samp>(d9c54)</samp>](https://github.com/alchemy-run/distilled/commit/d9c542cbc)
- **codegen**:
  - Let any model give an error a category &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/413 [<samp>(2a544)</samp>](https://github.com/alchemy-run/distilled/commit/2a54440c0)

### &nbsp;&nbsp;&nbsp;🐞 Bug Fixes

- **aws**:
  - Make `message` the canonical field on every error class &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/407 [<samp>(6ae24)</samp>](https://github.com/alchemy-run/distilled/commit/6ae24a0f1)
  - **scheduler**: Type ExecutionRoleNotAssumable on create/updateSchedule &nbsp;-&nbsp; by **sam** and **Claude Fable 5** [<samp>(f396b)</samp>](https://github.com/alchemy-run/distilled/commit/f396b012b)
- **cloudflare**:
  - Correct getCrawl's response schema &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/410 [<samp>(5d24b)</samp>](https://github.com/alchemy-run/distilled/commit/5d24b25ca)
  - **turnstile**: Tag a bare 404 as WidgetNotFound &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/402 [<samp>(d3a40)</samp>](https://github.com/alchemy-run/distilled/commit/d3a4017ff)
  - **workers**: Type WorkerHasNoVersions on getScript &nbsp;-&nbsp; by **sam** in https://github.com/alchemy-run/distilled/issues/414 [<samp>(1c7e3)</samp>](https://github.com/alchemy-run/distilled/commit/1c7e3d293)
- **codegen**:
  - PURE-mark generated error classes so they tree-shake &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/403 [<samp>(7822b)</samp>](https://github.com/alchemy-run/distilled/commit/7822b37f8)
  - Give `.items()` a real element type &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/404 [<samp>(c5e3b)</samp>](https://github.com/alchemy-run/distilled/commit/c5e3b2b48)
  - Stop a filtered generate from truncating the barrel &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/411 [<samp>(a9dc4)</samp>](https://github.com/alchemy-run/distilled/commit/a9dc4fbfd)
- **core**:
  - Keep `.pages`/`.items` on a yielded paginated operation &nbsp;-&nbsp; by **Michael K** in https://github.com/alchemy-run/distilled/issues/405 [<samp>(dc4a1)</samp>](https://github.com/alchemy-run/distilled/commit/dc4a159ed)

##### &nbsp;&nbsp;&nbsp;&nbsp;[View changes on GitHub](https://github.com/alchemy-run/distilled/compare/v0.30.3...HEAD)

---

