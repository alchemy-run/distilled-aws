## Search for available domains

**get** `/accounts/{account_id}/registrar/domain-search`

Searches for domain name suggestions based on a keyword, phrase, or partial domain name.
Returns a list of potentially available domains with pricing information.

**Important:** Results are non-authoritative and based on cached data. Always use the
`/domain-check` endpoint to verify real-time availability before attempting registration.

Suggestions are scoped to extensions supported for programmatic registration
via this API (`POST /registrations`). Domains on unsupported extensions will
not appear in results, even if they are available at the registry level.

### Use cases

- Brand name discovery (e.g., "acme corp" → acmecorp.com, acmecorp.dev)
- Keyword-based suggestions (e.g., "coffee shop" → coffeeshop.com, mycoffeeshop.net)
- Alternative extension discovery (e.g., "example.com" → example.com, example.app, example.xyz)

### Workflow

1. Call this endpoint with a keyword or domain name.
1. Present suggestions to the user.
1. Call `/domain-check` with the user's chosen domains to confirm real-time availability and pricing.
1. Proceed to `POST /registrations` only for supported non-premium domains
   where the Check response returns `registrable: true`.

**Note:** Searching with just a domain extension (e.g., "com" or ".app") is not supported. Provide a keyword or domain name.

### Path Parameters

- `account_id: string`

  Identifier

### Query Parameters

- `q: string`

  The search term to find domain suggestions. Accepts keywords, phrases, or full domain names.

  - Phrases: "coffee shop" returns coffeeshop.com, mycoffeeshop.net, etc.
  - Domain names: "example.com" returns example.com and variations across extensions

- `extensions: optional array of string`

  Limits results to specific domain extensions from the supported set. If not specified,
  returns results across all supported extensions. Extensions not in the supported
  set are silently ignored.

- `limit: optional number`

  Maximum number of domain suggestions to return. Defaults to 20 if not specified.

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

  Contains the search results.

  - `domains: array of object { name, registrable, pricing, 2 more }`

    Array of domain suggestions sorted by relevance. May be empty if no domains match the search criteria.

    - `name: string`

      The fully qualified domain name (FQDN) in punycode format for internationalized domain names (IDNs).

    - `registrable: boolean`

      Indicates whether this domain appears available based on search data. Search results are non-authoritative and may be stale. - `true`: The domain appears available. Use POST /domain-check to confirm before registration.

      - `false`: The domain does not appear available in search results.

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

      Present only when `registrable` is `false` on search results. Explains why the domain does not appear registrable through this API. These values are advisory; use POST /domain-check for authoritative status.

      - `extension_not_supported_via_api`: Cloudflare Registrar supports this extension in the dashboard but it is not yet available for programmatic registration via this API.
      - `extension_not_supported`: This extension is not supported by Cloudflare Registrar at all.
      - `extension_disallows_registration`: The extension's registry has temporarily or permanently frozen new registrations.
      - `domain_premium`: The domain is premium priced. Premium registration is not currently supported by this API.
      - `domain_unavailable`: The domain appears unavailable.

      - `"extension_not_supported_via_api"`

      - `"extension_not_supported"`

      - `"extension_disallows_registration"`

      - `"domain_premium"`

      - `"domain_unavailable"`

    - `tier: optional "standard" or "premium"`

      The pricing tier for this domain. Always present when `registrable` is `true`;
      defaults to `standard` for most domains. May be absent when `registrable`
      is `false`.

      - `standard`: Standard registry pricing
      - `premium`: Premium domain with higher pricing set by the registry

      - `"standard"`

      - `"premium"`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/domain-search \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "domains": [
      {
        "name": "acmecorp.com",
        "pricing": {
          "currency": "USD",
          "registration_cost": "8.57",
          "renewal_cost": "8.57"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "acmecorp.dev",
        "pricing": {
          "currency": "USD",
          "registration_cost": "10.11",
          "renewal_cost": "10.11"
        },
        "registrable": true,
        "tier": "standard"
      },
      {
        "name": "acmecorp.app",
        "pricing": {
          "currency": "USD",
          "registration_cost": "11.00",
          "renewal_cost": "11.00"
        },
        "registrable": true,
        "tier": "standard"
      }
    ]
  },
  "success": true
}
```
