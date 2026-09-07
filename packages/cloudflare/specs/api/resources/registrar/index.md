# Registrar

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

## Domain Types

### Registration

- `Registration object { auto_renew, created_at, domain_name, 4 more }`

  A domain registration resource representing the current state of a registered domain.

  - `auto_renew: boolean`

    Whether the domain will be automatically renewed before expiration.

  - `created_at: string`

    When the domain was registered. Present when the registration resource exists.

  - `domain_name: string`

    Fully qualified domain name (FQDN) including the extension
    (e.g., `example.com`, `mybrand.app`). The domain name uniquely
    identifies a registration — the same domain cannot be registered
    twice, making it a natural idempotency key for registration requests.

  - `expires_at: string`

    When the domain registration expires. Present when the registration is ready; may be null only while `status` is `registration_pending`.

  - `locked: boolean`

    Whether the domain is locked for transfer.

  - `privacy_mode: "redaction"`

    Current WHOIS privacy mode for the registration.

    - `"redaction"`

  - `status: "active" or "registration_pending" or "expired" or 3 more`

    Current registration status.

    - `active`: Domain is registered and operational
    - `registration_pending`: Registration is in progress
    - `expired`: Domain has expired
    - `suspended`: Domain is suspended by the registry
    - `redemption_period`: Domain is in the redemption grace period
    - `pending_delete`: Domain is pending deletion by the registry

    - `"active"`

    - `"registration_pending"`

    - `"expired"`

    - `"suspended"`

    - `"redemption_period"`

    - `"pending_delete"`

### Workflow Status

- `WorkflowStatus object { completed, created_at, links, 4 more }`

  Status of an async registration workflow.

  - `completed: boolean`

    Whether the workflow has reached a terminal state. `true` when
    `state` is `succeeded` or `failed`. `false` for `pending`,
    `in_progress`, `action_required`, and `blocked`.

  - `created_at: string`

  - `links: object { self, resource }`

    - `self: string`

      URL to this status resource.

    - `resource: optional string`

      URL to the domain resource.

  - `state: "pending" or "in_progress" or "action_required" or 3 more`

    Workflow lifecycle state.

    - `pending`: Workflow has been created but not yet started processing.
    - `in_progress`: Actively processing. Continue polling `links.self`.
      The workflow has an internal deadline and will not remain in this
      state indefinitely.
    - `action_required`: Paused — requires action by the user (not the
      system). See `context.action` for what is needed. An automated
      polling loop must break on this state; it will not resolve on its
      own without user intervention.
    - `blocked`: The workflow cannot make progress due to a third party
      such as the domain extension's registry or a losing registrar.
      No user action will help. Continue polling — the block may resolve
      when the third party responds.
    - `succeeded`: Terminal. The operation completed successfully.
      `completed` will be `true`. For registrations, `context.registration`
      contains the resulting registration resource.
    - `failed`: Terminal. The operation failed. `completed` will be `true`.
      See `error.code` and `error.message` for the reason. Do not
      auto-retry without user review.

    - `"pending"`

    - `"in_progress"`

    - `"action_required"`

    - `"blocked"`

    - `"succeeded"`

    - `"failed"`

  - `updated_at: string`

  - `context: optional map[unknown]`

    Workflow-specific data for this workflow.

    The workflow subject is identified by `context.domain_name` for
    domain-centric workflows.

  - `error: optional object { code, message }`

    Error details when a workflow reaches the `failed` state. The specific
    error codes and messages depend on the workflow type (registration,
    update, etc.) and the underlying registry response. These workflow
    error codes are separate from immediate HTTP error `errors[].code`
    values returned by non-2xx responses. Surface
    `error.message` to the user for context.

    - `code: string`

      Machine-readable error code identifying the failure reason.

    - `message: string`

      Human-readable explanation of the failure. May include registry-specific details.

### Registrar Search Response

- `RegistrarSearchResponse object { domains }`

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

### Registrar Check Response

- `RegistrarCheckResponse object { domains }`

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

# Domains

## List domains

**get** `/accounts/{account_id}/registrar/domains`

List domains handled by Registrar.

### Path Parameters

- `account_id: string`

  Identifier

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

- `result: array of Domain`

  - `id: optional string`

    Domain identifier.

  - `available: optional boolean`

    Shows if a domain is available for transferring into Cloudflare Registrar.

  - `can_register: optional boolean`

    Indicates if the domain can be registered as a new domain.

  - `created_at: optional string`

    Shows time of creation.

  - `current_registrar: optional string`

    Shows name of current registrar.

  - `expires_at: optional string`

    Shows when domain name registration expires.

  - `locked: optional boolean`

    Shows whether a registrar lock is in place for a domain.

  - `registrant_contact: optional object { address, city, country, 10 more }`

    Shows contact information for domain registrant.

    - `address: string`

      Address.

    - `city: string`

      City.

    - `country: string`

      The country in which the user lives.

    - `first_name: string`

      User's first name

    - `last_name: string`

      User's last name

    - `organization: string`

      Name of organization.

    - `phone: string`

      User's telephone number

    - `state: string`

      State.

    - `zip: string`

      The zipcode or postal code where the user lives.

    - `id: optional string`

      Contact Identifier.

    - `address2: optional string`

      Optional address line for unit, floor, suite, etc.

    - `email: optional string`

      The contact email address of the user.

    - `fax: optional string`

      Contact fax number.

  - `registry_statuses: optional string`

    A comma-separated list of registry status codes. A full list of status codes can be found at [EPP Status Codes](https://www.icann.org/resources/pages/epp-status-codes-2014-06-16-en).

  - `supported_tld: optional boolean`

    Whether a particular TLD is currently supported by Cloudflare Registrar. Refer to [TLD Policies](https://www.cloudflare.com/tld-policies/) for a list of supported TLDs.

  - `transfer_in: optional object { accept_foa, approve_transfer, can_cancel_transfer, 3 more }`

    Statuses for domain transfers into Cloudflare Registrar.

    - `accept_foa: optional "needed" or "ok"`

      Form of authorization has been accepted by the registrant.

      - `"needed"`

      - `"ok"`

    - `approve_transfer: optional "needed" or "ok" or "pending" or 3 more`

      Shows transfer status with the registry.

      - `"needed"`

      - `"ok"`

      - `"pending"`

      - `"trying"`

      - `"rejected"`

      - `"unknown"`

    - `can_cancel_transfer: optional boolean`

      Indicates if cancellation is still possible.

    - `disable_privacy: optional "needed" or "ok" or "unknown"`

      Privacy guards are disabled at the foreign registrar.

      - `"needed"`

      - `"ok"`

      - `"unknown"`

    - `enter_auth_code: optional "needed" or "ok" or "pending" or 2 more`

      Auth code has been entered and verified.

      - `"needed"`

      - `"ok"`

      - `"pending"`

      - `"trying"`

      - `"rejected"`

    - `unlock_domain: optional "needed" or "ok" or "pending" or 2 more`

      Domain is unlocked at the foreign registrar.

      - `"needed"`

      - `"ok"`

      - `"pending"`

      - `"trying"`

      - `"unknown"`

  - `updated_at: optional string`

    Last updated.

- `success: true`

  Whether the API call was successful

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/domains \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": [
    {
      "id": "ea95132c15732412d22c1476fa83f27a",
      "available": false,
      "can_register": false,
      "created_at": "2018-08-28T17:26:26Z",
      "current_registrar": "Cloudflare",
      "expires_at": "2019-08-28T23:59:59Z",
      "locked": false,
      "registrant_contact": {
        "address": "123 Sesame St.",
        "city": "Austin",
        "country": "US",
        "first_name": "John",
        "last_name": "Appleseed",
        "organization": "Cloudflare, Inc.",
        "phone": "+1 123-123-1234",
        "state": "TX",
        "zip": "12345",
        "id": "ea95132c15732412d22c1476fa83f27a",
        "address2": "Suite 430",
        "email": "user@example.com",
        "fax": "123-867-5309"
      },
      "registry_statuses": "ok,serverTransferProhibited",
      "supported_tld": true,
      "transfer_in": {
        "accept_foa": "needed",
        "approve_transfer": "unknown",
        "can_cancel_transfer": true,
        "disable_privacy": "ok",
        "enter_auth_code": "needed",
        "unlock_domain": "ok"
      },
      "updated_at": "2018-08-28T17:26:26Z"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get domain

**get** `/accounts/{account_id}/registrar/domains/{domain_name}`

Show individual domain.

### Path Parameters

- `account_id: string`

  Identifier

- `domain_name: string`

  Fully qualified domain name (FQDN) including the extension
  (e.g., `example.com`, `mybrand.app`). The domain name uniquely
  identifies a registration — the same domain cannot be registered
  twice, making it a natural idempotency key for registration requests.

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

- `result: unknown`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/domains/$DOMAIN_NAME \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {},
  "success": true
}
```

## Update domain

**put** `/accounts/{account_id}/registrar/domains/{domain_name}`

Update individual domain.

### Path Parameters

- `account_id: string`

  Identifier

- `domain_name: string`

  Fully qualified domain name (FQDN) including the extension
  (e.g., `example.com`, `mybrand.app`). The domain name uniquely
  identifies a registration — the same domain cannot be registered
  twice, making it a natural idempotency key for registration requests.

### Body Parameters

- `auto_renew: optional boolean`

  Auto-renew controls whether subscription is automatically renewed upon domain expiration.

- `locked: optional boolean`

  Shows whether a registrar lock is in place for a domain.

- `privacy: optional boolean`

  Privacy option controls redacting WHOIS information.

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

- `result: unknown`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/domains/$DOMAIN_NAME \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "auto_renew": true,
          "privacy": true
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {},
  "success": true
}
```

## Domain Types

### Domain

- `Domain object { id, available, can_register, 9 more }`

  - `id: optional string`

    Domain identifier.

  - `available: optional boolean`

    Shows if a domain is available for transferring into Cloudflare Registrar.

  - `can_register: optional boolean`

    Indicates if the domain can be registered as a new domain.

  - `created_at: optional string`

    Shows time of creation.

  - `current_registrar: optional string`

    Shows name of current registrar.

  - `expires_at: optional string`

    Shows when domain name registration expires.

  - `locked: optional boolean`

    Shows whether a registrar lock is in place for a domain.

  - `registrant_contact: optional object { address, city, country, 10 more }`

    Shows contact information for domain registrant.

    - `address: string`

      Address.

    - `city: string`

      City.

    - `country: string`

      The country in which the user lives.

    - `first_name: string`

      User's first name

    - `last_name: string`

      User's last name

    - `organization: string`

      Name of organization.

    - `phone: string`

      User's telephone number

    - `state: string`

      State.

    - `zip: string`

      The zipcode or postal code where the user lives.

    - `id: optional string`

      Contact Identifier.

    - `address2: optional string`

      Optional address line for unit, floor, suite, etc.

    - `email: optional string`

      The contact email address of the user.

    - `fax: optional string`

      Contact fax number.

  - `registry_statuses: optional string`

    A comma-separated list of registry status codes. A full list of status codes can be found at [EPP Status Codes](https://www.icann.org/resources/pages/epp-status-codes-2014-06-16-en).

  - `supported_tld: optional boolean`

    Whether a particular TLD is currently supported by Cloudflare Registrar. Refer to [TLD Policies](https://www.cloudflare.com/tld-policies/) for a list of supported TLDs.

  - `transfer_in: optional object { accept_foa, approve_transfer, can_cancel_transfer, 3 more }`

    Statuses for domain transfers into Cloudflare Registrar.

    - `accept_foa: optional "needed" or "ok"`

      Form of authorization has been accepted by the registrant.

      - `"needed"`

      - `"ok"`

    - `approve_transfer: optional "needed" or "ok" or "pending" or 3 more`

      Shows transfer status with the registry.

      - `"needed"`

      - `"ok"`

      - `"pending"`

      - `"trying"`

      - `"rejected"`

      - `"unknown"`

    - `can_cancel_transfer: optional boolean`

      Indicates if cancellation is still possible.

    - `disable_privacy: optional "needed" or "ok" or "unknown"`

      Privacy guards are disabled at the foreign registrar.

      - `"needed"`

      - `"ok"`

      - `"unknown"`

    - `enter_auth_code: optional "needed" or "ok" or "pending" or 2 more`

      Auth code has been entered and verified.

      - `"needed"`

      - `"ok"`

      - `"pending"`

      - `"trying"`

      - `"rejected"`

    - `unlock_domain: optional "needed" or "ok" or "pending" or 2 more`

      Domain is unlocked at the foreign registrar.

      - `"needed"`

      - `"ok"`

      - `"pending"`

      - `"trying"`

      - `"unknown"`

  - `updated_at: optional string`

    Last updated.

### Domain Get Response

- `DomainGetResponse = unknown`

### Domain Update Response

- `DomainUpdateResponse = unknown`

# Registrations

## Create Registration

**post** `/accounts/{account_id}/registrar/registrations`

Starts a domain registration workflow. This is a billable operation — successful
registration charges the account's default payment method. All successful
domain registrations are non-refundable — once the workflow completes with
`state: succeeded`, the charge cannot be reversed.

### Prerequisites

- The account must have a billing profile with a valid default payment method.
  Set this up at `https://dash.cloudflare.com/{account_id}/billing/payment-info`.
- The account must not already be at the maximum supported domain limit.
  A single account may own up to 100 domains in total across registrations
  created through either the dashboard or this API.
- The domain must be on a supported extension for programmatic registration.
- Use `POST /domain-check` immediately before calling this endpoint to confirm
  real-time availability and pricing.

### Supported extensions

In this API, "extension" means the full registrable suffix after the domain
label. For example, in `example.co.uk`, the extension is `co.uk`.

Programmatic registration is currently supported for:

`com`, `org`, `net`, `app`, `dev`, `cc`, `xyz`, `info`, `cloud`, `studio`,
`live`, `link`, `pro`, `tech`, `fyi`, `shop`, `online`, `tools`, `run`,
`games`, `build`, `systems`, `world`, `news`, `site`, `network`, `chat`,
`space`, `family`, `page`, `life`, `group`, `email`, `solutions`, `day`,
`blog`, `ing`, `icu`, `academy`, `today`

Cloudflare Registrar supports 400+ extensions in the dashboard. Extensions
not listed above can still be registered at
`https://dash.cloudflare.com/{account_id}/domains/registrations`.

### Express mode

The only required field is `domain_name`. If `contacts` is omitted, the system
uses the account's default address book entry as the registrant. If no default
exists and no contact is provided, the request fails. Set up a default address
book entry and accept the required agreement at
`https://dash.cloudflare.com/{account_id}/domains/registrations`.

### Defaults

- `years`: defaults to the extension's minimum registration period (1 year for
  most extensions, but varies — for example, `.ai` (if supported) requires a minimum of 2 years).
- `auto_renew`: defaults to `false`. Setting it to `true` is an explicit
  opt-in authorizing Cloudflare to charge the account's default payment
  method up to 30 days before domain expiry to renew the registration.
  Renewal pricing may change over time based on registry pricing.
- `privacy_mode`: defaults to `redaction`.

### Premium domains

Premium domain registration is not currently supported by this API.
If `POST /domain-check` returns `tier: premium`, do not call this
endpoint for that domain.

### Response behavior

By default, the server holds the connection for a bounded, server-defined
amount of time while the registration completes. Most registrations finish
within this window and return `201 Created` with a completed workflow status.

If the registration is still processing after this synchronous wait window,
the server returns `202 Accepted`. Poll the URL in `links.self` to track progress.

To skip the wait and receive an immediate `202`, send `Prefer: respond-async`.

### Path Parameters

- `account_id: string`

  Identifier

### Header Parameters

- `Prefer: optional string`

### Body Parameters

- `domain_name: string`

  Fully qualified domain name (FQDN) including the extension
  (e.g., `example.com`, `mybrand.app`). The domain name uniquely
  identifies a registration — the same domain cannot be registered
  twice, making it a natural idempotency key for registration requests.

- `auto_renew: optional boolean`

  Enable or disable automatic renewal. Defaults to `false` if omitted.
  Setting this field to `true` is an explicit opt-in authorizing
  Cloudflare to charge the account's default payment method up to 30
  days before domain expiry to renew the domain automatically.
  Renewal pricing may change over time based on registry pricing.

- `contacts: optional object { registrant }`

  Contact data for the registration request.

  If the `contacts` object is omitted entirely from the request, or if
  `contacts.registrant` is not provided, the system will use the account's
  default address book entry as the registrant contact. This default must be
  pre-configured by the account owner at
  `https://dash.cloudflare.com/{account_id}/domains/registrations`, where
  they can create or update the address book entry and accept the required
  agreement. No API exists for managing address book entries at this time.

  If no default address book entry exists and no registrant contact is
  provided, the registration request will fail with a validation error.

  - `registrant: optional object { email, phone, postal_info, fax }`

    Registrant contact data for the domain registration. This information
    is submitted to the domain registry and, depending on extension and
    privacy settings, may appear in public WHOIS records.

    - `email: string`

      Email address for the registrant. Used for domain-related
      communications from the registry, including ownership verification
      and renewal notices.

    - `phone: string`

      Phone number in E.164 format: `+{country_code}.{number}` with no
      spaces or dashes. Examples: `+1.5555555555` (US), `+44.2071234567`
      (UK), `+81.312345678` (Japan).

    - `postal_info: object { address, name, organization }`

      Postal/mailing information for the registrant contact.

      - `address: object { city, country_code, postal_code, 2 more }`

        Physical mailing address for the registrant contact.

        - `city: string`

          City or locality name.

        - `country_code: string`

          Two-letter country code per ISO 3166-1 alpha-2 (e.g., `US`, `GB`, `CA`, `DE`).

        - `postal_code: string`

          Postal or ZIP code.

        - `state: string`

          State, province, or region. Use the standard abbreviation where applicable (e.g., `TX` for Texas, `ON` for Ontario).

        - `street: string`

          Street address including building/suite number.

      - `name: string`

        Full legal name of the registrant (individual or authorized representative).

      - `organization: optional string`

        Organization or company name. Optional for individual registrants.

    - `fax: optional string`

      Fax number in E.164 format (e.g., `+1.5555555555`). Optional.
      Most registrations do not require a fax number.

- `privacy_mode: optional "redaction"`

  WHOIS privacy mode for the registration. Defaults to `redaction`.

  - `off`: Do not request WHOIS privacy.
  - `redaction`: Request WHOIS redaction where supported by the extension.
    Some extensions do not support privacy/redaction.

  - `"redaction"`

- `years: optional number`

  Number of years to register (1–10). If omitted, defaults to the
  minimum registration period required by the registry for this
  extension. For most extensions this is 1 year, but some extensions
  require longer minimum terms (e.g., `.ai` requires a minimum of
  2 years).

  The registry for each extension may also enforce its own maximum
  registration term. If the requested value exceeds the registry's
  maximum, the registration will be rejected. When in doubt, use the
  default by omitting this field.

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

- `result: WorkflowStatus`

  Status of an async registration workflow.

  - `completed: boolean`

    Whether the workflow has reached a terminal state. `true` when
    `state` is `succeeded` or `failed`. `false` for `pending`,
    `in_progress`, `action_required`, and `blocked`.

  - `created_at: string`

  - `links: object { self, resource }`

    - `self: string`

      URL to this status resource.

    - `resource: optional string`

      URL to the domain resource.

  - `state: "pending" or "in_progress" or "action_required" or 3 more`

    Workflow lifecycle state.

    - `pending`: Workflow has been created but not yet started processing.
    - `in_progress`: Actively processing. Continue polling `links.self`.
      The workflow has an internal deadline and will not remain in this
      state indefinitely.
    - `action_required`: Paused — requires action by the user (not the
      system). See `context.action` for what is needed. An automated
      polling loop must break on this state; it will not resolve on its
      own without user intervention.
    - `blocked`: The workflow cannot make progress due to a third party
      such as the domain extension's registry or a losing registrar.
      No user action will help. Continue polling — the block may resolve
      when the third party responds.
    - `succeeded`: Terminal. The operation completed successfully.
      `completed` will be `true`. For registrations, `context.registration`
      contains the resulting registration resource.
    - `failed`: Terminal. The operation failed. `completed` will be `true`.
      See `error.code` and `error.message` for the reason. Do not
      auto-retry without user review.

    - `"pending"`

    - `"in_progress"`

    - `"action_required"`

    - `"blocked"`

    - `"succeeded"`

    - `"failed"`

  - `updated_at: string`

  - `context: optional map[unknown]`

    Workflow-specific data for this workflow.

    The workflow subject is identified by `context.domain_name` for
    domain-centric workflows.

  - `error: optional object { code, message }`

    Error details when a workflow reaches the `failed` state. The specific
    error codes and messages depend on the workflow type (registration,
    update, etc.) and the underlying registry response. These workflow
    error codes are separate from immediate HTTP error `errors[].code`
    values returned by non-2xx responses. Surface
    `error.message` to the user for context.

    - `code: string`

      Machine-readable error code identifying the failure reason.

    - `message: string`

      Human-readable explanation of the failure. May include registry-specific details.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/registrations \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "domain_name": "my-new-startup.com",
          "privacy_mode": "redaction",
          "years": 1
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "completed": false,
    "created_at": "2019-12-27T18:11:19.117Z",
    "links": {
      "self": "/accounts/{account_id}/registrar/registrations/example.com/registration-status",
      "resource": "/accounts/{account_id}/registrar/registrations/example.com"
    },
    "state": "in_progress",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "context": {
      "foo": "bar"
    },
    "error": {
      "code": "registry_rejected",
      "message": "Registry rejected the request."
    }
  },
  "success": true
}
```

## List Registrations

**get** `/accounts/{account_id}/registrar/registrations`

Returns a paginated list of domain registrations owned by the account.

This endpoint uses cursor-based pagination. Results are ordered by registration
date by default. To fetch the next page, pass the `cursor` value from the
`result_info` object in the response as the `cursor` query parameter in
your next request. An empty `cursor` string indicates there are no more
pages.

### Path Parameters

- `account_id: string`

  Identifier

### Query Parameters

- `cursor: optional string`

  Opaque token from a previous response's `result_info.cursor`.
  Pass this value to fetch the next page of results. Omit (or
  pass an empty string) for the first page.

- `direction: optional "asc" or "desc"`

  Sort direction for results. Defaults to ascending order.

  - `"asc"`

  - `"desc"`

- `per_page: optional number`

  Number of items to return per page.

- `sort_by: optional "registry_created_at" or "registry_expires_at" or "name"`

  Column to sort results by. Defaults to registration date
  (`registry_created_at`) when omitted.

  - `"registry_created_at"`

  - `"registry_expires_at"`

  - `"name"`

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

- `result: array of Registration`

  - `auto_renew: boolean`

    Whether the domain will be automatically renewed before expiration.

  - `created_at: string`

    When the domain was registered. Present when the registration resource exists.

  - `domain_name: string`

    Fully qualified domain name (FQDN) including the extension
    (e.g., `example.com`, `mybrand.app`). The domain name uniquely
    identifies a registration — the same domain cannot be registered
    twice, making it a natural idempotency key for registration requests.

  - `expires_at: string`

    When the domain registration expires. Present when the registration is ready; may be null only while `status` is `registration_pending`.

  - `locked: boolean`

    Whether the domain is locked for transfer.

  - `privacy_mode: "redaction"`

    Current WHOIS privacy mode for the registration.

    - `"redaction"`

  - `status: "active" or "registration_pending" or "expired" or 3 more`

    Current registration status.

    - `active`: Domain is registered and operational
    - `registration_pending`: Registration is in progress
    - `expired`: Domain has expired
    - `suspended`: Domain is suspended by the registry
    - `redemption_period`: Domain is in the redemption grace period
    - `pending_delete`: Domain is pending deletion by the registry

    - `"active"`

    - `"registration_pending"`

    - `"expired"`

    - `"suspended"`

    - `"redemption_period"`

    - `"pending_delete"`

- `result_info: object { count, cursor, per_page }`

  Cursor-based pagination metadata. Used by list endpoints that support
  cursor pagination. Pass the `cursor` value as a query parameter in the
  next request to fetch the next page. An empty string indicates there
  are no more pages.

  - `count: number`

    Number of items in the current result set.

  - `cursor: string`

    Opaque cursor for fetching the next page. Pass this value as the
    `cursor` query parameter in a subsequent request. An empty string
    indicates there are no more pages.

  - `per_page: number`

    Maximum number of items per page.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/registrations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": [],
  "result_info": {
    "count": 0,
    "cursor": "",
    "per_page": 20
  },
  "success": true
}
```

## Get Registration

**get** `/accounts/{account_id}/registrar/registrations/{domain_name}`

Returns the current state of a domain registration.

This is the canonical read endpoint for a domain you own. It returns
the full registration resource including current settings and expiration.
When the registration resource is ready, both `created_at` and `expires_at`
are present in the response.

### Path Parameters

- `account_id: string`

  Identifier

- `domain_name: string`

  Fully qualified domain name (FQDN) including the extension
  (e.g., `example.com`, `mybrand.app`). The domain name uniquely
  identifies a registration — the same domain cannot be registered
  twice, making it a natural idempotency key for registration requests.

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

- `result: Registration`

  A domain registration resource representing the current state of a registered domain.

  - `auto_renew: boolean`

    Whether the domain will be automatically renewed before expiration.

  - `created_at: string`

    When the domain was registered. Present when the registration resource exists.

  - `domain_name: string`

    Fully qualified domain name (FQDN) including the extension
    (e.g., `example.com`, `mybrand.app`). The domain name uniquely
    identifies a registration — the same domain cannot be registered
    twice, making it a natural idempotency key for registration requests.

  - `expires_at: string`

    When the domain registration expires. Present when the registration is ready; may be null only while `status` is `registration_pending`.

  - `locked: boolean`

    Whether the domain is locked for transfer.

  - `privacy_mode: "redaction"`

    Current WHOIS privacy mode for the registration.

    - `"redaction"`

  - `status: "active" or "registration_pending" or "expired" or 3 more`

    Current registration status.

    - `active`: Domain is registered and operational
    - `registration_pending`: Registration is in progress
    - `expired`: Domain has expired
    - `suspended`: Domain is suspended by the registry
    - `redemption_period`: Domain is in the redemption grace period
    - `pending_delete`: Domain is pending deletion by the registry

    - `"active"`

    - `"registration_pending"`

    - `"expired"`

    - `"suspended"`

    - `"redemption_period"`

    - `"pending_delete"`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/registrations/$DOMAIN_NAME \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "auto_renew": true,
    "created_at": "2025-01-15T10:00:00Z",
    "domain_name": "example.com",
    "expires_at": "2026-01-15T10:00:00Z",
    "locked": true,
    "privacy_mode": "redaction",
    "status": "active"
  },
  "success": true
}
```

## Update Registration

**patch** `/accounts/{account_id}/registrar/registrations/{domain_name}`

Updates an existing domain registration.

By default, the server holds the connection for a bounded, server-defined
amount of time while the update completes. Most updates finish within this
window and return `200 OK` with a completed workflow status.

If the update is still processing after this synchronous wait window, the
server returns `202 Accepted`. Poll the URL in `links.self` to track progress.

To skip the wait and receive an immediate `202`, send `Prefer: respond-async`.

This endpoint currently supports updating `auto_renew` only.

### Path Parameters

- `account_id: string`

  Identifier

- `domain_name: string`

  Fully qualified domain name (FQDN) including the extension
  (e.g., `example.com`, `mybrand.app`). The domain name uniquely
  identifies a registration — the same domain cannot be registered
  twice, making it a natural idempotency key for registration requests.

### Header Parameters

- `Prefer: optional "respond-async"`

  - `"respond-async"`

### Body Parameters

- `auto_renew: optional boolean`

  Enable or disable automatic renewal.
  Setting this field to `true` authorizes Cloudflare to charge the
  account's default payment method up to 30 days before domain expiry
  to renew the domain automatically. Renewal pricing may change over
  time based on registry pricing.

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

- `result: WorkflowStatus`

  Status of an async registration workflow.

  - `completed: boolean`

    Whether the workflow has reached a terminal state. `true` when
    `state` is `succeeded` or `failed`. `false` for `pending`,
    `in_progress`, `action_required`, and `blocked`.

  - `created_at: string`

  - `links: object { self, resource }`

    - `self: string`

      URL to this status resource.

    - `resource: optional string`

      URL to the domain resource.

  - `state: "pending" or "in_progress" or "action_required" or 3 more`

    Workflow lifecycle state.

    - `pending`: Workflow has been created but not yet started processing.
    - `in_progress`: Actively processing. Continue polling `links.self`.
      The workflow has an internal deadline and will not remain in this
      state indefinitely.
    - `action_required`: Paused — requires action by the user (not the
      system). See `context.action` for what is needed. An automated
      polling loop must break on this state; it will not resolve on its
      own without user intervention.
    - `blocked`: The workflow cannot make progress due to a third party
      such as the domain extension's registry or a losing registrar.
      No user action will help. Continue polling — the block may resolve
      when the third party responds.
    - `succeeded`: Terminal. The operation completed successfully.
      `completed` will be `true`. For registrations, `context.registration`
      contains the resulting registration resource.
    - `failed`: Terminal. The operation failed. `completed` will be `true`.
      See `error.code` and `error.message` for the reason. Do not
      auto-retry without user review.

    - `"pending"`

    - `"in_progress"`

    - `"action_required"`

    - `"blocked"`

    - `"succeeded"`

    - `"failed"`

  - `updated_at: string`

  - `context: optional map[unknown]`

    Workflow-specific data for this workflow.

    The workflow subject is identified by `context.domain_name` for
    domain-centric workflows.

  - `error: optional object { code, message }`

    Error details when a workflow reaches the `failed` state. The specific
    error codes and messages depend on the workflow type (registration,
    update, etc.) and the underlying registry response. These workflow
    error codes are separate from immediate HTTP error `errors[].code`
    values returned by non-2xx responses. Surface
    `error.message` to the user for context.

    - `code: string`

      Machine-readable error code identifying the failure reason.

    - `message: string`

      Human-readable explanation of the failure. May include registry-specific details.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/registrations/$DOMAIN_NAME \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "auto_renew": false
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "completed": false,
    "created_at": "2019-12-27T18:11:19.117Z",
    "links": {
      "self": "/accounts/{account_id}/registrar/registrations/example.com/registration-status",
      "resource": "/accounts/{account_id}/registrar/registrations/example.com"
    },
    "state": "in_progress",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "context": {
      "foo": "bar"
    },
    "error": {
      "code": "registry_rejected",
      "message": "Registry rejected the request."
    }
  },
  "success": true
}
```

# Registration Status

## Get Registration Status

**get** `/accounts/{account_id}/registrar/registrations/{domain_name}/registration-status`

Returns the current status of a domain registration workflow.

Use this endpoint to poll for completion when the POST response
returned `202 Accepted`. The URL is provided in the `links.self`
field of the workflow status response.

Poll this endpoint until the workflow reaches a terminal state or a
state that requires user attention.

**Terminal states:** `succeeded` and `failed` are terminal and always
have `completed: true`.

**Non-terminal states:**

- `action_required` has `completed: false` and will not resolve on its
  own. The workflow is paused pending user intervention.
- `blocked` has `completed: false` and indicates the workflow is waiting
  on a third party such as the extension registry or losing registrar.
  Continue polling while informing the user of the delay.

Use increasing backoff between polls. When `state: blocked`, use a
longer polling interval and do not poll indefinitely.

A naive polling loop that only checks `completed` can run indefinitely
when `state: action_required`. Break explicitly on `action_required`:

```js
let status;
do {
  await new Promise(r => setTimeout(r, 2000));
  status = await cloudflare.request({
    method: 'GET',
    path: reg.result.links.self,
  });
} while (
  !status.result.completed &&
  status.result.state !== 'action_required'
);

if (status.result.state === 'action_required') {
  // Surface context.action and context.confirmation_sent_to to the user.
  // Do not re-submit the registration request.
}
```

### Path Parameters

- `account_id: string`

  Identifier

- `domain_name: string`

  Fully qualified domain name (FQDN) including the extension
  (e.g., `example.com`, `mybrand.app`). The domain name uniquely
  identifies a registration — the same domain cannot be registered
  twice, making it a natural idempotency key for registration requests.

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

- `result: WorkflowStatus`

  Status of an async registration workflow.

  - `completed: boolean`

    Whether the workflow has reached a terminal state. `true` when
    `state` is `succeeded` or `failed`. `false` for `pending`,
    `in_progress`, `action_required`, and `blocked`.

  - `created_at: string`

  - `links: object { self, resource }`

    - `self: string`

      URL to this status resource.

    - `resource: optional string`

      URL to the domain resource.

  - `state: "pending" or "in_progress" or "action_required" or 3 more`

    Workflow lifecycle state.

    - `pending`: Workflow has been created but not yet started processing.
    - `in_progress`: Actively processing. Continue polling `links.self`.
      The workflow has an internal deadline and will not remain in this
      state indefinitely.
    - `action_required`: Paused — requires action by the user (not the
      system). See `context.action` for what is needed. An automated
      polling loop must break on this state; it will not resolve on its
      own without user intervention.
    - `blocked`: The workflow cannot make progress due to a third party
      such as the domain extension's registry or a losing registrar.
      No user action will help. Continue polling — the block may resolve
      when the third party responds.
    - `succeeded`: Terminal. The operation completed successfully.
      `completed` will be `true`. For registrations, `context.registration`
      contains the resulting registration resource.
    - `failed`: Terminal. The operation failed. `completed` will be `true`.
      See `error.code` and `error.message` for the reason. Do not
      auto-retry without user review.

    - `"pending"`

    - `"in_progress"`

    - `"action_required"`

    - `"blocked"`

    - `"succeeded"`

    - `"failed"`

  - `updated_at: string`

  - `context: optional map[unknown]`

    Workflow-specific data for this workflow.

    The workflow subject is identified by `context.domain_name` for
    domain-centric workflows.

  - `error: optional object { code, message }`

    Error details when a workflow reaches the `failed` state. The specific
    error codes and messages depend on the workflow type (registration,
    update, etc.) and the underlying registry response. These workflow
    error codes are separate from immediate HTTP error `errors[].code`
    values returned by non-2xx responses. Surface
    `error.message` to the user for context.

    - `code: string`

      Machine-readable error code identifying the failure reason.

    - `message: string`

      Human-readable explanation of the failure. May include registry-specific details.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/registrations/$DOMAIN_NAME/registration-status \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "completed": false,
    "created_at": "2019-12-27T18:11:19.117Z",
    "links": {
      "self": "/accounts/{account_id}/registrar/registrations/example.com/registration-status",
      "resource": "/accounts/{account_id}/registrar/registrations/example.com"
    },
    "state": "in_progress",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "context": {
      "foo": "bar"
    },
    "error": {
      "code": "registry_rejected",
      "message": "Registry rejected the request."
    }
  },
  "success": true
}
```

# Update Status

## Get Update Status

**get** `/accounts/{account_id}/registrar/registrations/{domain_name}/update-status`

Returns the current status of a domain update workflow.

Use this endpoint to poll for completion when the PATCH response
returned `202 Accepted`. The URL is provided in the `links.self`
field of the workflow status response.

Poll this endpoint until the workflow reaches a terminal state or a
state that requires user attention.

Use increasing backoff between polls. When the workflow remains blocked
on a third party, use a longer polling interval and do not poll indefinitely.

### Path Parameters

- `account_id: string`

  Identifier

- `domain_name: string`

  Fully qualified domain name (FQDN) including the extension
  (e.g., `example.com`, `mybrand.app`). The domain name uniquely
  identifies a registration — the same domain cannot be registered
  twice, making it a natural idempotency key for registration requests.

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

- `result: WorkflowStatus`

  Status of an async registration workflow.

  - `completed: boolean`

    Whether the workflow has reached a terminal state. `true` when
    `state` is `succeeded` or `failed`. `false` for `pending`,
    `in_progress`, `action_required`, and `blocked`.

  - `created_at: string`

  - `links: object { self, resource }`

    - `self: string`

      URL to this status resource.

    - `resource: optional string`

      URL to the domain resource.

  - `state: "pending" or "in_progress" or "action_required" or 3 more`

    Workflow lifecycle state.

    - `pending`: Workflow has been created but not yet started processing.
    - `in_progress`: Actively processing. Continue polling `links.self`.
      The workflow has an internal deadline and will not remain in this
      state indefinitely.
    - `action_required`: Paused — requires action by the user (not the
      system). See `context.action` for what is needed. An automated
      polling loop must break on this state; it will not resolve on its
      own without user intervention.
    - `blocked`: The workflow cannot make progress due to a third party
      such as the domain extension's registry or a losing registrar.
      No user action will help. Continue polling — the block may resolve
      when the third party responds.
    - `succeeded`: Terminal. The operation completed successfully.
      `completed` will be `true`. For registrations, `context.registration`
      contains the resulting registration resource.
    - `failed`: Terminal. The operation failed. `completed` will be `true`.
      See `error.code` and `error.message` for the reason. Do not
      auto-retry without user review.

    - `"pending"`

    - `"in_progress"`

    - `"action_required"`

    - `"blocked"`

    - `"succeeded"`

    - `"failed"`

  - `updated_at: string`

  - `context: optional map[unknown]`

    Workflow-specific data for this workflow.

    The workflow subject is identified by `context.domain_name` for
    domain-centric workflows.

  - `error: optional object { code, message }`

    Error details when a workflow reaches the `failed` state. The specific
    error codes and messages depend on the workflow type (registration,
    update, etc.) and the underlying registry response. These workflow
    error codes are separate from immediate HTTP error `errors[].code`
    values returned by non-2xx responses. Surface
    `error.message` to the user for context.

    - `code: string`

      Machine-readable error code identifying the failure reason.

    - `message: string`

      Human-readable explanation of the failure. May include registry-specific details.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar/registrations/$DOMAIN_NAME/update-status \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "completed": false,
    "created_at": "2019-12-27T18:11:19.117Z",
    "links": {
      "self": "/accounts/{account_id}/registrar/registrations/example.com/registration-status",
      "resource": "/accounts/{account_id}/registrar/registrations/example.com"
    },
    "state": "in_progress",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "context": {
      "foo": "bar"
    },
    "error": {
      "code": "registry_rejected",
      "message": "Registry rejected the request."
    }
  },
  "success": true
}
```
