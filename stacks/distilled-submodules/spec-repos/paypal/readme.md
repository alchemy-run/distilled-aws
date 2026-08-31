# spec-mirror-paypal

A git mirror of PayPal's [REST API specifications](https://github.com/paypal/paypal-rest-api-specifications), reduced to exactly the OpenAPI documents the
[`@distilled.cloud/paypal`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/billing_subscriptions_v1.json`
- `specs/catalogs_products_v1.json`
- `specs/checkout_orders_v2.json`
- `specs/customer_disputes_v1.json`
- `specs/customer_partner_referrals_v2.json`
- `specs/invoicing_v2.json`
- `specs/notifications_webhooks_v1.json`
- `specs/payment-experience_web_experience_profiles_v1.json`
- `specs/payments_payment_v2.json`
- `specs/payments_payouts_batch_v1.json`
- `specs/reporting_transactions_v1.json`
- `specs/shipping_shipment_tracking_v1.json`
- `specs/vault_payment_tokens_v3.json`

Vendor docs are snapshotted under `specs/docs/` so convert never crawls
[developer.paypal.com](https://developer.paypal.com/api/rest/).

Nothing else from `paypal/paypal-rest-api-specifications` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-paypal.git
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
