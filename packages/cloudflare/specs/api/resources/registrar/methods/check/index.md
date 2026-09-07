## Check domain availability

**post** `/accounts/{account_id}/registrar/domain-check`

Performs real-time, authoritative availability checks directly against domain
registries. Use this endpoint to verify a domain is available before attempting
registration via `POST /registrations`.

**Important:** Unlike the Search endpoint, these results are authoritative and
reflect current registry status. Always check availability immediately before
registration as domain status can change rapidly.

**Note:** This endpoint uses POST to accept a list of domains in the request
body. It is a read-only operation — it does not create, modify, or reserve
any domains.

### Extension support

Only domains on extensions supported for programmatic registration by this API
can be registered. If you check a domain on an unsupported extension, the response
will include `registrable: false` with a `reason` field explaining why:

- `extension_not_supported_via_api` — Cloudflare Registrar supports this extension
  in the dashboard, but it is not yet available for programmatic registration via
  this API. Register via `https://dash.cloudflare.com/{account_id}/domains/registrations` instead.
- `extension_not_supported` — This extension is not supported by Cloudflare
  Registrar.
- `extension_disallows_registration` — The extension's registry has temporarily
  or permanently frozen new registrations. No registrar can register domains on
  this extension at this time.
- `domain_premium` — The domain is premium priced. Premium registration is not
  currently supported by this API.
- `domain_unavailable` — The domain is already registered, reserved, or otherwise
  not available for registration on a supported extension.

The `reason` field is only present when `registrable` is `false`.

### Behavior

- Maximum 20 domains per request
- Pricing is only returned for domains where `registrable: true`
- Results are not cached; each request queries the registry

### Workflow

1. Call this endpoint with domains the user wants to register.
1. For each domain where `registrable: true`, present pricing to the user.
1. If `tier: premium`, note that premium registration is not currently
   supported by this API and do not proceed to `POST /registrations`.
1. Proceed to `POST /registrations` only for supported non-premium domains.

### Path Parameters

- `account_id: string`

  Identifier

### Body Parameters

- `domains: array of string`

  List of fully qualified domain names (FQDNs) to check for availability. Each domain must include the extension.

  - Minimum: 1 domain
  - Maximum: 20 domains per request
  - Domains on unsupported extensions are returned with `registrable: false` and a `reason` field
  - Malformed domain names (e.g., missing extension) may be omitted from the response

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: object { domains }`

  Contains the availability check results.

  - `domains: array of object { name, registrable, pricing, 2 more }`

    Array of domain availability results. Domains on unsupported
    extensions are included with `registrable: false` and a `reason`
    field. Malformed domain names may be omitted.

    - `name: string`

      The fully qualified domain name (FQDN) in punycode format for internationalized domain names (IDNs).

    - `registrable: boolean`

      Indicates whether this domain can be registered programmatically through this API based on a real-time registry check.

      - `true`: Domain is available for registration. The `pricing` object will be included.
      - `false`: Domain is not available. See the `reason` field for why. `tier` may still be present on some non-registrable results, such as premium domains.

    - `pricing: optional object { currency, registration_cost, renewal_cost }`

      Annual pricing information for a registrable domain. This object is only
      present when `registrable` is `true`. All prices are per year and returned
      as strings to preserve decimal precision.

      `registration_cost` and `renewal_cost` are frequently the same value, but
      may differ — especially for premium domains where registries set different
      rates for initial registration vs. renewal. For a multi-year registration
      (e.g., 4 years), the first year is charged at `registration_cost` and each
      subsequent year at `renewal_cost`. Registry pricing may change over time;
      the values returned here reflect the current registry rate. Premium pricing
      may be surfaced by Search and Check, but premium registration is not currently
      supported by this API.

      - `currency: string`

        ISO-4217 currency code for the prices (e.g., "USD", "EUR", "GBP").

      - `registration_cost: string`

        The first-year cost to register this domain. For premium domains
        (`tier: premium`), this price is set by the registry and may be
        significantly higher than standard pricing. For multi-year
        registrations, this cost applies to the first year only; subsequent
        years are charged at `renewal_cost`.

      - `renewal_cost: string`

        Per-year renewal cost for this domain. Applied to each year beyond
        the first year of a multi-year registration, and to each annual
        auto-renewal thereafter. May differ from `registration_cost`,
        especially for premium domains where initial registration often
        costs more than renewals.

    - `reason: optional "extension_not_supported_via_api" or "extension_not_supported" or "extension_disallows_registration" or 2 more`

      Present only when `registrable` is `false`. Explains why the domain cannot be registered via this API.

      - `extension_not_supported_via_api`: Cloudflare Registrar supports this extension in the dashboard but it is not yet available for programmatic registration via this API. The user can register via `https://dash.cloudflare.com/{account_id}/domains/registrations`.
      - `extension_not_supported`: This extension is not supported by Cloudflare Registrar at all.
      - `extension_disallows_registration`: The extension's registry has temporarily or permanently frozen new registrations. No registrar can register domains on this extension at this time.
      - `domain_premium`: The domain is premium priced. Premium registration is not currently supported by this API.
      - `domain_unavailable`: The domain is already registered, reserved, or otherwise not available on a supported extension.

      - `"extension_not_supported_via_api"`

      - `"extension_not_supported"`

      - `"extension_disallows_registration"`

      - `"domain_premium"`

      - `"domain_unavailable"`

    - `tier: optional "standard" or "premium"`

      The pricing tier for this domain. Always present when `registrable` is `true`; defaults to `standard` for most domains. May be absent when `registrable` is `false`.

      - `standard`: Standard registry pricing
      - `premium`: Premium domain with higher pricing set by the registry

      - `"standard"`

      - `"premium"`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/domain-check \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "domains": [
            "myawesomebrand.com",
            "myawesomebrand.net",
            "myawesomebrand.org",
            "myawesomebrand.app",
            "myawesomebrand.dev"
          ]
        }'
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "domains": [
      {
        "name": "xq7mz9brand.com",
        "pricing": {
          "currency": "USD",
          "registration_cost": "8.57",
          "renewal_cost": "8.57"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "xq7mz9brand.net",
        "pricing": {
          "currency": "USD",
          "registration_cost": "9.95",
          "renewal_cost": "9.95"
        },
        "registrable": true,
        "tier": "standard"
      }
    ]
  },
  "success": true
}
```
