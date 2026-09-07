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
