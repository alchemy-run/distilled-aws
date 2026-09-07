# spec-mirror-ovh

A git mirror of OVHcloud's [OpenAPI schemas](https://github.com/ovh/ovhcloud-cli/tree/main/internal/assets/api-schemas), reduced to exactly the files the
[`@distilled.cloud/ovh`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/baremetal.json`
- `specs/cloud.json`
- `specs/cloud_v2.json`
- `specs/dedicatedceph.json`
- `specs/dedicatednasha.json`
- `specs/domain.json`
- `specs/emaildomain.json`
- `specs/emailmxplan.json`
- `specs/emailpro.json`
- `specs/hostingprivatedatabase.json`
- `specs/iam.json`
- `specs/ip.json`
- `specs/iploadbalancing.json`
- `specs/ldp.json`
- `specs/me.json`
- `specs/overthebox.json`
- `specs/ovhcloudconnect.json`
- `specs/packxdsl.json`
- `specs/sms.json`
- `specs/sslgateway.json`
- `specs/storagenetapp.json`
- `specs/support.json`
- `specs/telephony.json`
- `specs/vmwareclouddirectorbackup.json`
- `specs/vmwareclouddirectororganization.json`
- `specs/vps.json`
- `specs/vrack.json`
- `specs/vrackservices.json`
- `specs/webhosting.json`
- `specs/xdsl.json`

Vendor docs are snapshotted under `specs/docs/` so convert never crawls
[docs.ovhcloud.com](https://docs.ovhcloud.com/) or the live API console.

Nothing else from `ovh/ovhcloud-cli` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-ovh.git
```

## Updating specs

From `.meta/`:

```sh
bun install
bun run fetch-specs
```

---

This repository is managed by the `distilled-submodules` Alchemy stack in
[alchemy-run/distilled](https://github.com/alchemy-run/distilled) (`stacks/distilled-submodules`).
Its scaffolding is generated — edit it there, not here.
